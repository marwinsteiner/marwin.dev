"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { executeCommand, BANNER, COMMAND_NAMES, OutputLine } from "@/commands";
import { renderStats } from "@/commands/stats";
import { repos } from "@/data/repos";

const URL_REGEX = /(https?:\/\/[^\s]+)/g;

function renderTextWithLinks(text: string, className?: string) {
  if (!text || !URL_REGEX.test(text)) {
    return text || "\u00A0";
  }
  URL_REGEX.lastIndex = 0;
  const parts: (string | React.ReactElement)[] = [];
  let lastIndex = 0;
  let match;
  while ((match = URL_REGEX.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <a
        key={match.index}
        href={match[1]}
        target="_blank"
        rel="noopener noreferrer"
        className={`underline decoration-dotted hover:decoration-solid ${className || "text-green"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {match[1]}
      </a>,
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return <>{parts}</>;
}

interface HistoryEntry {
  command: string;
  output: OutputLine[];
}

const BOOT_SEQUENCE = [
  "BIOS v2.4.1 — GlassTTY VT220 Emulator",
  "Memory test... 37 repos OK",
  "Loading kernel modules...",
  "  [OK] derivatives.ko",
  "  [OK] systematic-trading.ko",
  "  [OK] volatility-surface.ko",
  "  [OK] prediction-markets.ko",
  "Mounting /dev/github... done",
  "Starting marwin.dev v1.0.0...",
  "",
];

export default function Terminal() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [authStatus, setAuthStatus] = useState<string | null>(null);
  const [booting, setBooting] = useState(true);
  const [bootLines, setBootLines] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let i = 0;
    const interval = setInterval(() => {
      if (cancelled) return;
      if (i < BOOT_SEQUENCE.length) {
        const line = BOOT_SEQUENCE[i];
        setBootLines((prev) => [...prev, line]);
        i++;
      } else {
        clearInterval(interval);
        if (!cancelled) {
          setTimeout(() => {
            if (!cancelled) setBooting(false);
          }, 300);
        }
      }
    }, 120);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const scrollToBottom = useCallback(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history, bootLines, scrollToBottom]);

  useEffect(() => {
    if (!booting) {
      inputRef.current?.focus();
    }
  }, [booting]);

  const handleAuth = useCallback(async () => {
    if (isAuthenticated) {
      setHistory((prev) => [
        ...prev,
        {
          command: "auth",
          output: [
            { text: "" },
            {
              text: "  Already authenticated. Full CV access granted.",
              className: "text-amber",
            },
            { text: '  Run "cv" to view the extended version.', className: "text-dim" },
            { text: "" },
          ],
        },
      ]);
      return;
    }

    if (!window.PublicKeyCredential) {
      setHistory((prev) => [
        ...prev,
        {
          command: "auth",
          output: [
            { text: "" },
            {
              text: "  WebAuthn not supported in this browser.",
              className: "text-red",
            },
            {
              text: "  Try Chrome, Firefox, or Safari on a device with biometrics.",
              className: "text-dim",
            },
            { text: "" },
          ],
        },
      ]);
      return;
    }

    setAuthStatus("Initiating biometric challenge...");

    try {
      const challenge = new Uint8Array(32);
      crypto.getRandomValues(challenge);

      const userId = new Uint8Array(16);
      crypto.getRandomValues(userId);

      const credential = await navigator.credentials.create({
        publicKey: {
          challenge,
          rp: {
            name: "marwin.dev",
            id: window.location.hostname,
          },
          user: {
            id: userId,
            name: "visitor",
            displayName: "Terminal Visitor",
          },
          pubKeyCredParams: [
            { alg: -7, type: "public-key" },
            { alg: -257, type: "public-key" },
          ],
          authenticatorSelection: {
            authenticatorAttachment: "platform",
            userVerification: "required",
          },
          timeout: 60000,
        },
      });

      if (credential) {
        setIsAuthenticated(true);
        setAuthStatus(null);
        setHistory((prev) => [
          ...prev,
          {
            command: "auth",
            output: [
              { text: "" },
              {
                text: "  ┌──────────────────────────────────────────┐",
                className: "text-amber",
              },
              {
                text: "  │  BIOMETRIC VERIFICATION SUCCESSFUL       │",
                className: "text-amber",
              },
              {
                text: "  │  Full CV access granted.                 │",
                className: "text-amber",
              },
              {
                text: "  └──────────────────────────────────────────┘",
                className: "text-amber",
              },
              { text: "" },
              {
                text: '  Run "cv" to view the extended version.',
                className: "text-dim",
              },
              { text: "" },
            ],
          },
        ]);
      }
    } catch (err) {
      setAuthStatus(null);
      const message =
        err instanceof Error ? err.message : "Unknown error";
      setHistory((prev) => [
        ...prev,
        {
          command: "auth",
          output: [
            { text: "" },
            {
              text: `  Authentication cancelled or failed: ${message}`,
              className: "text-red",
            },
            {
              text: "  Biometric verification is required for full CV access.",
              className: "text-dim",
            },
            { text: "" },
          ],
        },
      ]);
    }
  }, [isAuthenticated]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const input = currentInput;
      setCurrentInput("");
      setHistoryIndex(-1);

      if (input.trim()) {
        setCommandHistory((prev) => [input, ...prev]);
      }

      const { result, special } = executeCommand(input, isAuthenticated);

      if (special === "clear") {
        setHistory([]);
        setShowBanner(false);
        return;
      }

      if (special === "auth") {
        handleAuth();
        return;
      }

      if (special === "stats") {
        const loadingEntry: HistoryEntry = {
          command: input,
          output: [
            { text: "" },
            { text: "  Fetching GitHub stats...", className: "text-dim" },
            { text: "" },
          ],
        };
        setHistory((prev) => [...prev, loadingEntry]);

        fetch("/api/github-stats")
          .then((res) => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
          })
          .then((data) => {
            const output = renderStats(data);
            setHistory((prev) => {
              const updated = [...prev];
              // Replace the last entry (the loading message)
              updated[updated.length - 1] = { command: input, output };
              return updated;
            });
          })
          .catch((err) => {
            setHistory((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = {
                command: input,
                output: [
                  { text: "" },
                  {
                    text: `  Error fetching stats: ${err.message}`,
                    className: "text-red",
                  },
                  {
                    text: "  GitHub API may be rate-limited. Try again later.",
                    className: "text-dim",
                  },
                  { text: "" },
                ],
              };
              return updated;
            });
          });
        return;
      }

      if (special === "banner") {
        setHistory((prev) => [...prev, { command: input, output: result }]);
        setShowBanner(false);
        return;
      }

      setHistory((prev) => [...prev, { command: input, output: result }]);
    },
    [currentInput, isAuthenticated, handleAuth],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
          const newIndex = historyIndex + 1;
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        } else if (historyIndex === 0) {
          setHistoryIndex(-1);
          setCurrentInput("");
        }
      } else if (e.key === "Tab") {
        e.preventDefault();
        const input = currentInput.trim().toLowerCase();
        if (!input) return;

        // Handle "cat " prefix for repo autocompletion
        if (input.startsWith("cat ")) {
          const partial = input.slice(4);
          const matches = repos
            .map((r) => r.name)
            .filter((n) => n.toLowerCase().startsWith(partial));
          if (matches.length === 1) {
            setCurrentInput(`cat ${matches[0]}`);
          }
          return;
        }

        const matches = COMMAND_NAMES.filter((c) => c.startsWith(input));
        if (matches.length === 1) {
          setCurrentInput(matches[0]);
        }
      } else if (e.key === "l" && e.ctrlKey) {
        e.preventDefault();
        setHistory([]);
        setShowBanner(false);
      }
    },
    [historyIndex, commandHistory, currentInput],
  );

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  if (booting) {
    return (
      <div className="h-screen w-screen bg-[#0a0a0a] p-4 font-glasstty overflow-hidden">
        <div className="text-green max-w-3xl mx-auto">
          {bootLines.map((line, i) => (
            <div key={i} className={line.startsWith("  [OK]") ? "text-amber" : "text-green"}>
              {line || "\u00A0"}
            </div>
          ))}
          <span className="cursor-blink text-green">█</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="h-screen w-screen bg-[#0a0a0a] overflow-hidden flex flex-col cursor-text"
      onClick={focusInput}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-[#111] border-b border-[#222] shrink-0">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-dim text-sm ml-2 font-glasstty">
          marwin@london: ~{isAuthenticated ? " [authenticated]" : ""}
        </span>
      </div>

      {/* Terminal body */}
      <div
        ref={terminalRef}
        className="flex-1 min-h-0 overflow-y-auto p-4 font-glasstty"
      >
        <div className="max-w-4xl mx-auto">
          {/* Banner */}
          {showBanner &&
            BANNER.map((line, i) => (
              <div key={`banner-${i}`} className={line.className || "text-green"} style={{ whiteSpace: "pre" }}>
                {line.text || "\u00A0"}
              </div>
            ))}

          {/* Command history */}
          {history.map((entry, i) => (
            <div key={i}>
              {/* Prompt + command */}
              <div className="flex">
                <span className="text-amber shrink-0">marwin@london</span>
                <span className="text-dim shrink-0">:</span>
                <span className="text-green shrink-0">~</span>
                <span className="text-dim shrink-0">$ </span>
                <span className="text-green">{entry.command}</span>
              </div>
              {/* Output */}
              {entry.output.map((line, j) => (
                <div
                  key={j}
                  className={line.className || "text-green"}
                  style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                >
                  {renderTextWithLinks(line.text, line.className)}
                </div>
              ))}
            </div>
          ))}

          {/* Auth status */}
          {authStatus && (
            <div className="text-amber">
              {"  "}{authStatus} <span className="cursor-blink">█</span>
            </div>
          )}

          {/* Current prompt */}
          {!authStatus && (
            <form onSubmit={handleSubmit} className="flex items-center">
              <span className="text-amber shrink-0">marwin@london</span>
              <span className="text-dim shrink-0">:</span>
              <span className="text-green shrink-0">~</span>
              <span className="text-dim shrink-0">$ </span>
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-transparent text-green outline-none border-none w-full font-glasstty caret-transparent"
                  autoFocus
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                />
                {/* Custom block cursor */}
                <span
                  className="absolute top-0 pointer-events-none text-green cursor-blink"
                  style={{ left: `${currentInput.length}ch` }}
                >
                  █
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
