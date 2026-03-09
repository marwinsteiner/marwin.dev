import type { GithubStats } from "@/app/api/github-stats/route";
import type { OutputLine } from "./index";

function green(text: string): OutputLine {
  return { text, className: "text-green" };
}
function amber(text: string): OutputLine {
  return { text, className: "text-amber" };
}
function dim(text: string): OutputLine {
  return { text, className: "text-dim" };
}
function bold(text: string): OutputLine {
  return { text, className: "text-green font-bold" };
}
function blank(): OutputLine {
  return { text: "" };
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function heatChar(n: number): string {
  if (n < 0) return " ";
  if (n === 0) return "·";
  if (n <= 2) return "░";
  if (n <= 5) return "▒";
  if (n <= 9) return "▓";
  return "█";
}

function barChar(filled: number, total: number): string {
  return "█".repeat(filled) + "░".repeat(total - filled);
}

function pad(s: string, len: number): string {
  return s.length >= len ? s.slice(0, len) : s + " ".repeat(len - s.length);
}

function boxLine(content: string, width: number): string {
  return `  │  ${pad(content, width)}│`;
}

function renderSummary(stats: GithubStats): OutputLine[] {
  const W = 48;
  return [
    bold("  ═══ GITHUB STATS ═══"),
    blank(),
    amber(`  ┌${"─".repeat(W + 2)}┐`),
    amber(boxLine("marwinsteiner", W)),
    amber(boxLine(
      `Repos: ${stats.publicRepos}  Followers: ${stats.followers}  Active (90d): ${stats.activeRepos}`,
      W,
    )),
    amber(boxLine(
      `Events: ${stats.totalEvents}  Pushes: ${stats.totalCommits}`,
      W,
    )),
    amber(boxLine(
      `Streak: ${stats.currentStreak}d current  ${stats.longestStreak}d longest`,
      W,
    )),
    amber(`  └${"─".repeat(W + 2)}┘`),
    blank(),
  ];
}

function renderHeatmap(stats: GithubStats): OutputLine[] {
  const lines: OutputLine[] = [];
  lines.push(bold("  ── ACTIVITY HEATMAP (last 13 weeks) ──"));
  lines.push(blank());

  // Month labels row
  let monthRow = "       ";
  for (let w = 0; w < stats.heatmapWeekStartDates.length; w++) {
    const d = new Date(stats.heatmapWeekStartDates[w]);
    const month = MONTHS[d.getUTCMonth()];
    // Show month label at the start of each month
    if (w === 0 || d.getUTCDate() <= 7) {
      monthRow += month + " ";
    } else {
      monthRow += "    ";
    }
  }
  lines.push(dim(monthRow));

  // Heatmap rows (Mon, Wed, Fri for compactness, or all 7)
  const displayDays = [1, 2, 3, 4, 5, 6, 0]; // Mon-Sun
  for (const dow of displayDays) {
    let row = `  ${DAYS[dow]}  `;
    for (let w = 0; w < 13; w++) {
      row += heatChar(stats.heatmap[dow]?.[w] ?? 0) + " ";
    }
    lines.push(dow % 2 === 1 ? green(row) : dim(row));
  }

  lines.push(blank());
  lines.push(
    dim("  · = 0  ░ = 1-2  ▒ = 3-5  ▓ = 6-9  █ = 10+"),
  );
  lines.push(blank());
  return lines;
}

function renderDayOfWeek(stats: GithubStats): OutputLine[] {
  const lines: OutputLine[] = [];
  lines.push(bold("  ── EVENTS BY DAY OF WEEK ──"));
  lines.push(blank());

  const max = Math.max(...stats.byDayOfWeek, 1);
  const barWidth = 30;
  // Display Mon-Sun
  const order = [1, 2, 3, 4, 5, 6, 0];
  for (const dow of order) {
    const count = stats.byDayOfWeek[dow];
    const filled = Math.round((count / max) * barWidth);
    const bar = barChar(filled, barWidth);
    const label = DAYS[dow];
    const countStr = String(count).padStart(4);
    lines.push(green(`  ${label}  ${bar} ${countStr}`));
  }

  lines.push(blank());
  return lines;
}

function renderHourOfDay(stats: GithubStats): OutputLine[] {
  const lines: OutputLine[] = [];
  lines.push(bold("  ── ACTIVITY BY HOUR (UTC) ──"));
  lines.push(blank());

  const max = Math.max(...stats.byHour, 1);
  const barWidth = 16;

  // Two-column layout: 0-11 on left, 12-23 on right
  for (let h = 0; h < 12; h++) {
    const h2 = h + 12;
    const c1 = stats.byHour[h];
    const c2 = stats.byHour[h2];
    const f1 = Math.round((c1 / max) * barWidth);
    const f2 = Math.round((c2 / max) * barWidth);
    const bar1 = barChar(f1, barWidth);
    const bar2 = barChar(f2, barWidth);
    const lbl1 = String(h).padStart(2, "0");
    const lbl2 = String(h2).padStart(2, "0");
    const cnt1 = String(c1).padStart(3);
    const cnt2 = String(c2).padStart(3);
    lines.push(
      green(`  ${lbl1} ${bar1}${cnt1}   ${lbl2} ${bar2}${cnt2}`),
    );
  }

  lines.push(blank());
  return lines;
}

function renderTopRepos(stats: GithubStats): OutputLine[] {
  const lines: OutputLine[] = [];
  lines.push(bold("  ── MOST ACTIVE REPOS (90d) ──"));
  lines.push(blank());

  const max = Math.max(...stats.topRepos.map((r) => r.events), 1);
  const barWidth = 24;
  const nameWidth = 22;

  for (let i = 0; i < stats.topRepos.length; i++) {
    const repo = stats.topRepos[i];
    const filled = Math.round((repo.events / max) * barWidth);
    const bar = barChar(filled, barWidth);
    const name = repo.name.padEnd(nameWidth).slice(0, nameWidth);
    const count = String(repo.events).padStart(4);
    lines.push(
      i < 3
        ? amber(`  ${name} ${bar}${count}`)
        : green(`  ${name} ${bar}${count}`),
    );
  }

  lines.push(blank());
  return lines;
}

function renderEventTypes(stats: GithubStats): OutputLine[] {
  const lines: OutputLine[] = [];
  lines.push(bold("  ── EVENT BREAKDOWN ──"));
  lines.push(blank());

  for (const et of stats.eventTypes.slice(0, 6)) {
    const name = et.type.padEnd(20);
    const count = String(et.count).padStart(4);
    lines.push(dim(`  ${name} ${count}`));
  }

  lines.push(blank());
  return lines;
}

export function renderStats(stats: GithubStats): OutputLine[] {
  return [
    blank(),
    ...renderSummary(stats),
    ...renderHeatmap(stats),
    ...renderDayOfWeek(stats),
    ...renderHourOfDay(stats),
    ...renderTopRepos(stats),
    ...renderEventTypes(stats),
    dim("  Data from GitHub Events API · Last 90 days · Cached 1h"),
    blank(),
  ];
}
