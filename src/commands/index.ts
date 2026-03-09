import { repos, repoCategories, Repo } from "@/data/repos";
import { cvExtended, CVSection } from "@/data/cv";

export interface OutputLine {
  text: string;
  className?: string;
}

export type CommandResult = OutputLine[];

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
function error(text: string): OutputLine {
  return { text, className: "text-red" };
}

const BANNER: CommandResult = [
  green(""),
  amber("  ███╗   ███╗ █████╗ ██████╗ ██╗    ██╗██╗███╗   ██╗"),
  amber("  ████╗ ████║██╔══██╗██╔══██╗██║    ██║██║████╗  ██║"),
  amber("  ██╔████╔██║███████║██████╔╝██║ █╗ ██║██║██╔██╗ ██║"),
  amber("  ██║╚██╔╝██║██╔══██║██╔══██╗██║███╗██║██║██║╚██╗██║"),
  amber("  ██║ ╚═╝ ██║██║  ██║██║  ██║╚███╔███╔╝██║██║ ╚████║"),
  amber("  ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚══╝╚══╝ ╚═╝╚═╝  ╚═══╝"),
  green(""),
  green("  Marwin Steiner — London"),
  dim("  Aspiring Quant | Co-Founder @ Datex | Ex-Swiss Re"),
  green(""),
  dim("  Derivatives pricing · Systematic trading · Event-driven markets"),
  dim("  Volatility surfaces · Prediction markets · Multi-asset strategies"),
  green(""),
  dim('  Type "help" to see available commands.'),
  green(""),
];

function helpCommand(): CommandResult {
  return [
    blank(),
    bold("  AVAILABLE COMMANDS"),
    blank(),
    green("  whoami          ─  about marwin"),
    green("  neofetch        ─  system info (the fun one)"),
    green("  stats           ─  github activity charts"),
    green("  volsurf         ─  3D implied volatility surface"),
    green("  repos           ─  list all repositories"),
    green("  repos -c        ─  list repositories by category"),
    green("  cat <repo>      ─  detailed view of a repository"),
    green("  cv              ─  view curriculum vitae"),
    green("  auth            ─  authenticate with biometrics for full CV"),
    green("  future          ─  what comes next"),
    green("  links           ─  find me elsewhere"),
    green("  clear           ─  clear terminal"),
    green("  help            ─  show this message"),
    green("  banner          ─  show welcome banner"),
    blank(),
    blank(),
    bold("  EASTER EGGS"),
    blank(),
    green("  top             ─  what's running in my head"),
    green("  fortune         ─  quant wisdom"),
    green("  cowsay <msg>    ─  moo"),
    green("  ping            ─  reach me"),
    blank(),
    dim("  Tab to autocomplete · ↑↓ for history · Ctrl+L to clear"),
    blank(),
  ];
}

function whoamiCommand(): CommandResult {
  return [
    blank(),
    bold("  MARWIN STEINER"),
    dim("  London, United Kingdom"),
    blank(),
    green("  I'm a finance graduate from Bayes Business School (First Class,"),
    green("  Top Decile) with a deep interest in derivatives pricing,"),
    green("  systematic trading, and building things that work."),
    blank(),
    green("  Previously, I was a Data Engineer at Swiss Re, where I built"),
    green("  PySpark pipelines on Palantir Foundry processing reinsurance"),
    green("  data at scale. Before that, I interned at Swiss Life Asset"),
    green("  Managers in Zurich."),
    blank(),
    green("  Now I'm co-founding Datex — building data infrastructure and"),
    green("  analytics products — while pursuing my real obsession:"),
    green("  quantitative trading and volatility research."),
    blank(),
    green("  I write Python and C++ for pricing models, TypeScript for"),
    green("  web applications, and SQL for everything in between. I have"),
    green("  37 public repositories on GitHub, most of them exploring"),
    green("  derivatives, systematic strategies, and prediction markets."),
    blank(),
    dim("  My terminal is always open. My curiosity never closes."),
    blank(),
  ];
}

function neofetchCommand(): CommandResult {
  return [
    blank(),
    amber("        ██████╗         marwin@london"),
    amber("       ██╔═══██╗        ──────────────────────"),
    amber("       ██║   ██║        OS:      Human 1.0 (London build)"),
    amber("       ██║   ██║        Kernel:  BSc Inv. & Financial Risk Mgmt"),
    amber("       ██║   ██║        Uptime:  since Mar 2020 on GitHub"),
    amber("       ██╔═══██║        Shell:   Python / C++ / TypeScript"),
    amber("       ╚██████╔╝        DE:      Palantir Foundry → Datex"),
    amber("        ╚═════╝         WM:      Vim motions"),
    green("                        Terminal: GlassTTY VT220"),
    green("                        CPU:     Caffeinated"),
    green("                        Memory:  37 public repos"),
    green("                        Disk:    Options data (lots of it)"),
    blank(),
    dim("                        Interests:"),
    dim("                         ├─ Derivatives pricing"),
    dim("                         ├─ Volatility surface calibration"),
    dim("                         ├─ Systematic trading"),
    dim("                         ├─ Prediction markets"),
    dim("                         ├─ HK horse racing analytics"),
    dim("                         └─ Building things that work"),
    blank(),
    amber("        ████████████████████████"),
    green("        ████████████████████████"),
    blank(),
  ];
}

function reposCommand(): CommandResult {
  const lines: CommandResult = [
    blank(),
    bold("  PUBLIC REPOSITORIES (37)"),
    blank(),
  ];
  for (const repo of repos) {
    const stars = repo.stars > 0 ? ` ★${repo.stars}` : "";
    const lang = repo.language ? ` [${repo.language}]` : "";
    const featured = repo.featured ? " ◆" : "";
    lines.push(
      green(`  ${repo.name}${featured}${lang}${stars}`),
    );
    lines.push(dim(`    ${repo.description}`));
  }
  lines.push(blank());
  lines.push(dim('  ◆ = featured · Use "cat <repo-name>" for details'));
  lines.push(blank());
  return lines;
}

function reposByCategoryCommand(): CommandResult {
  const lines: CommandResult = [
    blank(),
    bold("  REPOSITORIES BY CATEGORY"),
    blank(),
  ];
  for (const [category, repoNames] of Object.entries(repoCategories)) {
    lines.push(amber(`  ┌─ ${category}`));
    for (let i = 0; i < repoNames.length; i++) {
      const repo = repos.find((r) => r.name === repoNames[i]);
      const connector = i === repoNames.length - 1 ? "└" : "├";
      if (repo) {
        lines.push(green(`  ${connector}── ${repo.name}`));
        lines.push(dim(`  │   ${repo.description}`));
      }
    }
    lines.push(blank());
  }
  lines.push(dim('  Use "cat <repo-name>" for a detailed view'));
  lines.push(blank());
  return lines;
}

function catRepoCommand(name: string): CommandResult {
  const repo = repos.find(
    (r) => r.name.toLowerCase() === name.toLowerCase(),
  );
  if (!repo) {
    return [
      error(`  cat: ${name}: No such repository`),
      dim(`  Try "repos" to list all repositories.`),
    ];
  }
  const lines: CommandResult = [
    blank(),
    bold(`  ${repo.name}`),
    repo.language ? amber(`  Language: ${repo.language}`) : blank(),
    repo.stars > 0 ? amber(`  Stars: ${repo.stars}`) : blank(),
    green(`  URL: ${repo.url}`),
    blank(),
    green(`  ${repo.description}`),
    blank(),
  ];
  // Word-wrap the detail text
  const words = repo.detail.split(" ");
  let line = "  ";
  for (const word of words) {
    if (line.length + word.length + 1 > 72) {
      lines.push(dim(line));
      line = "  " + word;
    } else {
      line += (line.trim() === "" ? "" : " ") + word;
    }
  }
  if (line.trim()) lines.push(dim(line));
  lines.push(blank());
  if (repo.tags.length > 0) {
    lines.push(dim(`  Tags: ${repo.tags.join(" · ")}`));
    lines.push(blank());
  }
  return lines.filter((l) => l.text !== "" || l.className === undefined);
}

function formatCV(sections: CVSection[]): CommandResult {
  const lines: CommandResult = [blank()];
  lines.push(amber("  ┌──────────────────────────────────────────┐"));
  lines.push(amber("  │  FULL CV — BIOMETRIC ACCESS GRANTED      │"));
  lines.push(amber("  └──────────────────────────────────────────┘"));
  lines.push(blank());
  for (const section of sections) {
    lines.push(bold(`  ═══ ${section.title} ═══`));
    lines.push(blank());
    for (const item of section.items) {
      lines.push(green(`  ${item.heading}`));
      if (item.subheading) lines.push(amber(`  ${item.subheading}`));
      if (item.period) lines.push(dim(`  ${item.period}`));
      lines.push(blank());
      for (const bullet of item.bullets) {
        lines.push(green(`    • ${bullet}`));
      }
      if (item.extended) {
        for (const ext of item.extended) {
          lines.push(dim(`    ◦ ${ext}`));
        }
      }
      lines.push(blank());
    }
  }
  return lines;
}

function cvCommand(authenticated: boolean): CommandResult {
  if (!authenticated) {
    return [
      blank(),
      error("  ACCESS DENIED"),
      blank(),
      dim("  CV requires biometric verification."),
      dim('  Run "auth" to authenticate, then try again.'),
      blank(),
    ];
  }
  return formatCV(cvExtended);
}

function futureCommand(): CommandResult {
  return [
    blank(),
    bold("  ═══ WHAT COMES NEXT ═══"),
    blank(),
    amber("  ┌─ Quantitative Trading"),
    green("  │"),
    green("  │  The endgame is a seat at a quantitative trading firm —"),
    green("  │  ideally working on volatility strategies, options market"),
    green("  │  making, or systematic macro. I want to be the person"),
    green("  │  who builds the models AND understands the plumbing."),
    green("  │"),
    green("  │  I've spent years building the toolkit: derivatives"),
    green("  │  pricing in Python and C++, volatility surface calibration,"),
    green("  │  systematic strategy research, risk measurement. Every"),
    green("  │  repo on my GitHub is a brick in this foundation."),
    green("  │"),
    dim("  │  The 0DTE gamma work, the SVI calibration library, the"),
    dim("  │  multi-asset long-short framework — these aren't academic"),
    dim("  │  exercises. They're proof that I can think about markets"),
    dim("  │  quantitatively and implement those ideas in production code."),
    green("  │"),
    green("  └──────────────────────────────────────────────────────"),
    blank(),
    amber("  ┌─ Technology"),
    green("  │"),
    green("  │  Technology isn't separate from trading — it IS trading."),
    green("  │  The firms that win are engineering organizations that"),
    green("  │  happen to operate in financial markets."),
    green("  │"),
    green("  │  I want to operate at the intersection: writing"),
    green("  │  latency-sensitive C++ for execution, Python for"),
    green("  │  research and signal generation, and building the"),
    green("  │  data infrastructure that connects them."),
    green("  │"),
    dim("  │  Datex has taught me what it means to ship products"),
    dim("  │  end-to-end. Swiss Re taught me what enterprise-grade"),
    dim("  │  data engineering looks like. The next chapter combines"),
    dim("  │  both: building trading systems where every microsecond"),
    dim("  │  and every basis point matters."),
    green("  │"),
    green("  └──────────────────────────────────────────────────────"),
    blank(),
    amber("  ┌─ The Bigger Picture"),
    green("  │"),
    green("  │  Markets are the most complex adaptive systems humans"),
    green("  │  have built. Understanding them requires physics-level"),
    green("  │  rigor applied to a system that constantly evolves."),
    green("  │"),
    green("  │  That's the challenge I want. Not just making money —"),
    green("  │  though that's nice — but understanding how markets"),
    green("  │  actually work, at the deepest level I can reach."),
    green("  │"),
    green("  │  The tools change. The math endures. The curiosity"),
    green("  │  is non-negotiable."),
    green("  │"),
    green("  └──────────────────────────────────────────────────────"),
    blank(),
  ];
}

function linksCommand(): CommandResult {
  return [
    blank(),
    bold("  LINKS"),
    blank(),
    green("  GitHub     https://github.com/marwinsteiner"),
    green("  Twitter    https://twitter.com/steiner_marwin"),
    green("  Datex      https://datex-web.vercel.app"),
    blank(),
  ];
}

function notFoundCommand(cmd: string): CommandResult {
  return [
    error(`  command not found: ${cmd}`),
    dim('  Type "help" for available commands.'),
  ];
}

export const COMMAND_NAMES = [
  "help",
  "whoami",
  "neofetch",
  "stats",
  "volsurf",
  "repos",
  "cat",
  "cv",
  "auth",
  "future",
  "links",
  "top",
  "fortune",
  "cowsay",
  "ping",
  "clear",
  "banner",
];

export function executeCommand(
  input: string,
  isAuthenticated: boolean,
): { result: CommandResult; special?: "clear" | "auth" | "banner" | "stats" | "volsurf" | "ping" } {
  const trimmed = input.trim();
  const parts = trimmed.split(/\s+/);
  const cmd = parts[0]?.toLowerCase() || "";
  const args = parts.slice(1);

  switch (cmd) {
    case "":
      return { result: [] };
    case "help":
      return { result: helpCommand() };
    case "whoami":
      return { result: whoamiCommand() };
    case "neofetch":
      return { result: neofetchCommand() };
    case "repos":
    case "ls":
      if (args.includes("-c") || args.includes("--category")) {
        return { result: reposByCategoryCommand() };
      }
      return { result: reposCommand() };
    case "cat":
      if (args.length === 0) {
        return { result: [error("  usage: cat <repo-name>")] };
      }
      if (args[0] === "cv" || args[0] === "cv.txt") {
        return { result: cvCommand(isAuthenticated) };
      }
      if (args[0] === "future" || args[0] === "future.txt") {
        return { result: futureCommand() };
      }
      return { result: catRepoCommand(args[0]) };
    case "stats":
      return { result: [], special: "stats" };
    case "volsurf":
      return { result: [], special: "volsurf" };
    case "cv":
      return { result: cvCommand(isAuthenticated) };
    case "auth":
    case "login":
    case "sudo":
      return { result: [], special: "auth" };
    case "future":
      return { result: futureCommand() };
    case "links":
    case "socials":
    case "contact":
      return { result: linksCommand() };
    case "clear":
      return { result: [], special: "clear" };
    case "banner":
      return { result: BANNER, special: "banner" };
    case "ping":
      return { result: [], special: "ping" };
    case "top":
    case "htop":
      return { result: topCommand() };
    case "fortune":
      return { result: fortuneCommand() };
    case "cowsay":
      return { result: cowsayCommand(args.join(" ")) };
    case "exit":
    case "quit":
      return {
        result: [
          blank(),
          dim("  There is no escape. You're already here."),
          dim("  (But seriously, thanks for visiting.)"),
          blank(),
        ],
      };
    case "rm":
      return {
        result: [
          error("  nice try."),
        ],
      };
    case "vim":
    case "emacs":
    case "nano":
      return {
        result: [
          dim(`  ${cmd}: I appreciate the enthusiasm, but this is a read-only terminal.`),
        ],
      };
    case "pip":
      if (args.join(" ").includes("install")) {
        const pkg = args.slice(1).join(" ") || "edge";
        return {
          result: [
            error(`  ERROR: No matching distribution found for ${pkg}`),
            dim("  (alpha can't be pip installed. believe me, I've tried.)"),
          ],
        };
      }
      return { result: notFoundCommand(cmd) };
    case "cd":
      return {
        result: [dim("  You're already where you need to be.")],
      };
    case "id":
      return {
        result: [green("  uid=0(quant) gid=100(builders) groups=100(builders),42(derivatives),7(vol-traders)")],
      };
    default:
      return { result: notFoundCommand(cmd) };
  }
}

// --- Easter egg commands ---

const FORTUNES = [
  "The market can stay irrational longer than you can stay solvent. — John Maynard Keynes",
  "In theory, there is no difference between theory and practice. In practice, there is. — Yogi Berra",
  "Risk comes from not knowing what you're doing. — Warren Buffett",
  "The four most dangerous words in investing: 'This time it's different.' — Sir John Templeton",
  "There are two kinds of forecasters: those who don't know, and those who don't know they don't know. — J.K. Galbraith",
  "Beware of geeks bearing formulas. — Warren Buffett",
  "The only function of economic forecasting is to make astrology look respectable. — J.K. Galbraith",
  "It's not whether you're right or wrong, but how much money you make when you're right. — George Soros",
  "An investment in knowledge pays the best interest. — Benjamin Franklin",
  "Buy when there's blood in the streets, even if the blood is your own. — Baron Rothschild",
  "The stock market is a device for transferring money from the impatient to the patient. — Warren Buffett",
  "The best time to buy is when blood is running in the streets. The second best time is now.",
  "Never confuse a bull market with brains.",
  "If you torture the data long enough, it will confess to anything. — Ronald Coase",
  "All models are wrong, but some are useful. — George Box",
  "Volatility is not risk. Permanent loss of capital is risk.",
  "The trend is your friend, until the bend at the end.",
  "Past performance is not indicative of future results, but it's all we've got.",
  "I can calculate the motions of heavenly bodies, but not the madness of people. — Isaac Newton",
  "The market is a voting machine in the short run, and a weighing machine in the long run. — Benjamin Graham",
];

function fortuneCommand(): CommandResult {
  const fortune = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
  return [
    blank(),
    green(`  ${fortune}`),
    blank(),
  ];
}

function cowsayCommand(message: string): CommandResult {
  const msg = message || "moo. also, have you looked at the vol surface today?";
  const maxWidth = 52;

  // Word wrap
  const words = msg.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    if (line.length + word.length + 1 > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line += (line ? " " : "") + word;
    }
  }
  if (line) lines.push(line);

  const width = Math.min(maxWidth, Math.max(...lines.map((l) => l.length)));
  const border = "-".repeat(width + 2);
  const result: CommandResult = [blank()];
  result.push(green(`   ${border}`));
  if (lines.length === 1) {
    result.push(green(`  < ${lines[0].padEnd(width)} >`));
  } else {
    lines.forEach((l, i) => {
      const left = i === 0 ? "/" : i === lines.length - 1 ? "\\" : "|";
      const right = i === 0 ? "\\" : i === lines.length - 1 ? "/" : "|";
      result.push(green(`  ${left} ${l.padEnd(width)} ${right}`));
    });
  }
  result.push(green(`   ${border}`));
  result.push(green("          \\   ^__^"));
  result.push(green("           \\  (oo)\\_______"));
  result.push(green("              (__)\\       )\\/\\"));
  result.push(green("                  ||----w |"));
  result.push(green("                  ||     ||"));
  result.push(blank());
  return result;
}

function topCommand(): CommandResult {
  const now = new Date();
  const uptime = `${Math.floor(Math.random() * 200 + 100)}d ${Math.floor(Math.random() * 24)}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`;
  return [
    blank(),
    amber(`  top - ${now.toTimeString().slice(0, 8)} up ${uptime},  1 user,  load avg: 0.87, 0.42, 0.31`),
    amber("  Tasks:  12 total,   3 running,   9 sleeping,   0 stopped"),
    amber("  %Cpu:  73.2 us,   4.1 sy,   0.0 ni,  22.7 id"),
    amber("  MiB Mem:  16384.0 total,   2048.0 free,  12288.0 used,   2048.0 cache"),
    blank(),
    bold("  PID   USER      %CPU  %MEM  TIME+     COMMAND"),
    green("  1     marwin    42.0  18.2  9999:59   vol-surface-calibrator"),
    green("  2     marwin    18.7  12.4  7234:11   alpha-seeker"),
    green("  3     marwin    12.3   8.1  4521:33   systematic-backtester"),
    dim("  4     marwin     8.4   6.2  3102:07   options-pricer-cpp"),
    dim("  5     marwin     5.1   4.8  2841:22   pyspark-pipeline"),
    dim("  6     marwin     3.2   3.1  1923:45   polymarket-watcher"),
    dim("  7     marwin     2.8   2.4  1644:18   hkjc-data-scraper"),
    dim("  8     marwin     1.9   1.8   982:30   coffee-daemon"),
    dim("  9     marwin     0.7   1.2   441:12   git-push-loop"),
    dim("  10    marwin     0.4   0.8   203:55   linkedin-ignore"),
    dim("  11    marwin     0.2   0.4    47:33   sleep-scheduler"),
    dim("  12    marwin     0.0   0.1     0:01   impostor-syndrome"),
    blank(),
  ];
}

export { BANNER };
