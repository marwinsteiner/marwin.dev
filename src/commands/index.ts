import { repos, repoCategories, Repo } from "@/data/repos";
import { cvPublic, cvExtended, CVSection } from "@/data/cv";

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

function formatCV(sections: CVSection[], full: boolean): CommandResult {
  const lines: CommandResult = [blank()];
  if (full) {
    lines.push(amber("  ┌──────────────────────────────────────────┐"));
    lines.push(amber("  │  FULL CV — BIOMETRIC ACCESS GRANTED      │"));
    lines.push(amber("  └──────────────────────────────────────────┘"));
    lines.push(blank());
  }
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
      if (full && item.extended) {
        for (const ext of item.extended) {
          lines.push(dim(`    ◦ ${ext}`));
        }
      }
      lines.push(blank());
    }
  }
  if (!full) {
    lines.push(dim('  ─── Abbreviated CV. Run "auth" to unlock the full version. ───'));
    lines.push(blank());
  }
  return lines;
}

function cvCommand(authenticated: boolean): CommandResult {
  if (authenticated) {
    return formatCV(cvExtended, true);
  }
  return formatCV(cvPublic, false);
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
  "repos",
  "cat",
  "cv",
  "auth",
  "future",
  "links",
  "clear",
  "banner",
];

export function executeCommand(
  input: string,
  isAuthenticated: boolean,
): { result: CommandResult; special?: "clear" | "auth" | "banner" | "stats" } {
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
    case "sudo":
      return {
        result: [
          error("  marwin is not in the sudoers file. This incident will be reported."),
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
    default:
      return { result: notFoundCommand(cmd) };
  }
}

export { BANNER };
