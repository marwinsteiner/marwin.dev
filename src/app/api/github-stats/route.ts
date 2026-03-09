import { NextResponse } from "next/server";

const GITHUB_USER = "marwinsteiner";

interface GitHubEvent {
  type: string;
  created_at: string;
  payload: {
    commits?: unknown[];
    size?: number;
  };
  repo: { name: string };
}

export interface GithubStats {
  totalEvents: number;
  totalCommits: number;
  activeRepos: number;
  periodStart: string;
  periodEnd: string;
  byDayOfWeek: number[];
  byHour: number[];
  heatmap: number[][];
  heatmapWeekStartDates: string[];
  topRepos: { name: string; events: number }[];
  eventTypes: { type: string; count: number }[];
  currentStreak: number;
  longestStreak: number;
  publicRepos: number;
  followers: number;
}

function processEvents(
  events: GitHubEvent[],
  profile: { public_repos: number; followers: number },
): GithubStats {
  const byDayOfWeek = new Array(7).fill(0);
  const byHour = new Array(24).fill(0);
  const repoCount: Record<string, number> = {};
  const eventTypeCount: Record<string, number> = {};
  const dailyActivity: Record<string, number> = {};
  let totalCommits = 0;

  for (const event of events) {
    const date = new Date(event.created_at);
    const dow = date.getUTCDay();
    const hour = date.getUTCHours();
    const dateStr = event.created_at.slice(0, 10);

    byDayOfWeek[dow]++;
    byHour[hour]++;
    dailyActivity[dateStr] = (dailyActivity[dateStr] || 0) + 1;

    if (event.type === "PushEvent") {
      // Public events API strips commit details; count each push as at least 1 commit
      totalCommits += event.payload.size || event.payload.commits?.length || 1;
    }

    const repoName = event.repo.name.replace(`${GITHUB_USER}/`, "");
    repoCount[repoName] = (repoCount[repoName] || 0) + 1;
    eventTypeCount[event.type] = (eventTypeCount[event.type] || 0) + 1;
  }

  // Build heatmap: 7 rows (Mon-Sun) × 13 columns (weeks)
  const now = new Date();
  const todayDow = now.getUTCDay();
  // Align to the most recent Sunday to end the heatmap
  const endSunday = new Date(now);
  endSunday.setUTCDate(endSunday.getUTCDate() + (7 - todayDow) % 7);
  endSunday.setUTCHours(0, 0, 0, 0);

  const numWeeks = 13;
  const heatmap: number[][] = Array.from({ length: 7 }, () =>
    new Array(numWeeks).fill(0),
  );
  const heatmapWeekStartDates: string[] = [];

  const startDate = new Date(endSunday);
  startDate.setUTCDate(startDate.getUTCDate() - numWeeks * 7);

  for (let w = 0; w < numWeeks; w++) {
    const weekStart = new Date(startDate);
    weekStart.setUTCDate(weekStart.getUTCDate() + w * 7);
    heatmapWeekStartDates.push(weekStart.toISOString().slice(0, 10));

    for (let d = 0; d < 7; d++) {
      const day = new Date(weekStart);
      day.setUTCDate(day.getUTCDate() + d);
      const ds = day.toISOString().slice(0, 10);
      if (day <= now) {
        heatmap[d][w] = dailyActivity[ds] || 0;
      } else {
        heatmap[d][w] = -1; // future
      }
    }
  }

  // Top repos
  const topRepos = Object.entries(repoCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, count]) => ({ name, events: count }));

  // Event types
  const eventTypes = Object.entries(eventTypeCount)
    .sort((a, b) => b[1] - a[1])
    .map(([type, count]) => ({ type: type.replace("Event", ""), count }));

  // Streaks
  const sortedDates = Object.keys(dailyActivity).sort();
  let currentStreak = 0;
  let longestStreak = 0;

  // Current streak: walk backwards from today
  const cursor = new Date(now);
  for (let i = 0; i < 120; i++) {
    const ds = cursor.toISOString().slice(0, 10);
    if (dailyActivity[ds]) {
      currentStreak++;
      cursor.setUTCDate(cursor.getUTCDate() - 1);
    } else if (i === 0) {
      // today might not have activity yet
      cursor.setUTCDate(cursor.getUTCDate() - 1);
    } else {
      break;
    }
  }

  // Longest streak
  if (sortedDates.length > 0) {
    let streak = 1;
    longestStreak = 1;
    for (let i = 1; i < sortedDates.length; i++) {
      const prev = new Date(sortedDates[i - 1]);
      const curr = new Date(sortedDates[i]);
      const diff = Math.round(
        (curr.getTime() - prev.getTime()) / (86400 * 1000),
      );
      if (diff === 1) {
        streak++;
        longestStreak = Math.max(longestStreak, streak);
      } else {
        streak = 1;
      }
    }
  }

  const periodStart = sortedDates[0] || now.toISOString().slice(0, 10);
  const periodEnd =
    sortedDates[sortedDates.length - 1] || now.toISOString().slice(0, 10);

  return {
    totalEvents: events.length,
    totalCommits,
    activeRepos: Object.keys(repoCount).length,
    periodStart,
    periodEnd,
    byDayOfWeek,
    byHour,
    heatmap,
    heatmapWeekStartDates,
    topRepos,
    eventTypes,
    currentStreak,
    longestStreak,
    publicRepos: profile.public_repos,
    followers: profile.followers,
  };
}

export async function GET() {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "marwin.dev",
  };

  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `token ${process.env.GITHUB_TOKEN}`;
  }

  try {
    // Fetch profile and events in parallel
    const [profileRes, ...eventPages] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USER}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      ...Array.from({ length: 3 }, (_, i) =>
        fetch(
          `https://api.github.com/users/${GITHUB_USER}/events/public?per_page=100&page=${i + 1}`,
          { headers, next: { revalidate: 3600 } },
        ),
      ),
    ]);

    const profile = profileRes.ok
      ? await profileRes.json()
      : { public_repos: 37, followers: 37 };

    const events: GitHubEvent[] = [];
    for (const res of eventPages) {
      if (!res.ok) break;
      const data = await res.json();
      if (data.length === 0) break;
      events.push(...data);
    }

    const stats = processEvents(events, profile);

    return NextResponse.json(stats, {
      headers: {
        "Cache-Control":
          "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500 },
    );
  }
}
