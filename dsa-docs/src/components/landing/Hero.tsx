import { useEffect, useRef, useState } from "react";
import { ArrowDown, Check, Play, RefreshCw, Terminal } from "lucide-react";
import { Code, Pill, tok } from "./primitives";

const base = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');

const codeLines = [
  [{ t: "// twoSum.ts · O(n) Time · O(n) Space", c: tok.com }],
  [
    { t: "export function ", c: tok.kw },
    { t: "twoSum", c: tok.fn },
    { t: "(nums: number[], target: number) {", c: tok.punc },
  ],
  [
    { t: "  const ", c: tok.kw },
    { t: "seen = " },
    { t: "new ", c: tok.kw },
    { t: "Map", c: tok.fn },
    { t: "<number, number>();", c: tok.punc },
  ],
  [
    { t: "  for ", c: tok.kw },
    { t: "(", c: tok.punc },
    { t: "let ", c: tok.kw },
    { t: "i = " },
    { t: "0", c: tok.num },
    { t: "; i < nums.length; i++) {", c: tok.punc },
  ],
  [
    { t: "    const ", c: tok.kw },
    { t: "need = target - nums[i];" },
  ],
  [
    { t: "    if ", c: tok.kw },
    { t: "(seen.", c: tok.punc },
    { t: "has", c: tok.fn },
    { t: "(need)) ", c: tok.punc },
    { t: "return ", c: tok.kw },
    { t: "[seen.", c: tok.punc },
    { t: "get", c: tok.fn },
    { t: "(need)!, i];", c: tok.punc },
  ],
  [
    { t: "    seen." },
    { t: "set", c: tok.fn },
    { t: "(nums[i], i);", c: tok.punc },
  ],
  [{ t: "  }", c: tok.punc }],
  [{ t: "}", c: tok.punc }],
];

const testCodeLines = [
  [{ t: "// twoSum.spec.ts · Automated Suite", c: tok.com }],
  [
    { t: "import ", c: tok.kw },
    { t: "{ test, expect } ", c: "" },
    { t: "from ", c: tok.kw },
    { t: "'vitest'", c: tok.num },
    { t: ";", c: tok.punc },
  ],
  [
    { t: "import ", c: tok.kw },
    { t: "{ twoSum } ", c: "" },
    { t: "from ", c: tok.kw },
    { t: "'./twoSum'", c: tok.num },
    { t: ";", c: tok.punc },
  ],
  [],
  [
    { t: "test", c: tok.fn },
    { t: "(", c: tok.punc },
    { t: "'returns indices of matching pair'", c: tok.num },
    { t: ", () => {", c: tok.punc },
  ],
  [
    { t: "  expect", c: tok.fn },
    { t: "(", c: tok.punc },
    { t: "twoSum", c: tok.fn },
    { t: "([", c: tok.punc },
    { t: "2, 7, 11, 15", c: tok.num },
    { t: "], ", c: tok.punc },
    { t: "9", c: tok.num },
    { t: ")).toEqual([", c: tok.punc },
    { t: "0, 1", c: tok.num },
    { t: "]);", c: tok.punc },
  ],
  [{ t: "});", c: tok.punc }],
];

const terminalScript = [
  "$ ipd test twoSum.spec.ts",
  "› compiling TypeScript 5.4…",
  "› running 47 test assertions…",
  "✓ 47/47 Passed · 41ms · +120 XP",
];

function Particles() {
  const dots = Array.from({ length: 22 }, (_, i) => ({
    left: `${(i * 37) % 100}%`,
    top: `${(i * 61) % 100}%`,
    delay: `${(i % 7) * 0.9}s`,
    size: i % 3 === 0 ? 2 : 1,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {dots.map((d, i) => (
        <span
          key={i}
          className="float-slow absolute rounded-full bg-accent/40"
          style={{
            left: d.left,
            top: d.top,
            width: d.size * 3,
            height: d.size * 3,
            animationDelay: d.delay,
          }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [typed, setTyped] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"code" | "tests">("code");
  const [isRunning, setIsRunning] = useState(false);

  const runTerminalAnimation = () => {
    setIsRunning(true);
    setTyped([]);
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setTyped(terminalScript.slice(0, i));
      if (i >= terminalScript.length) {
        window.clearInterval(id);
        setIsRunning(false);
      }
    }, 700);
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(terminalScript);
      return;
    }
    runTerminalAnimation();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      setTilt({ x, y });
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section id="top" ref={ref} className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 grid-drift opacity-[0.55]" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(600px circle at var(--mx, 70%) var(--my, 10%), color-mix(in oklab, var(--color-accent) 10%, transparent), transparent 60%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        aria-hidden="true"
        style={{ background: "linear-gradient(to top, var(--color-background), transparent)" }}
      />
      <Particles />

      {/* SVG connector paths */}
      <svg
        className="pointer-events-none absolute top-24 right-0 hidden h-[420px] w-[520px] text-border-strong lg:block"
        viewBox="0 0 520 420"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M20 380 C 180 380 180 220 300 220 S 440 60 500 60"
          stroke="currentColor"
          strokeWidth="1"
          className="draw-path"
        />
        <path
          d="M0 300 C 160 300 200 140 360 140 L 520 140"
          stroke="var(--color-accent)"
          strokeWidth="1"
          className="dash-flow"
          opacity="0.5"
        />
      </svg>

      <div className="relative mx-auto max-w-6xl px-5 pt-20 pb-16 md:pt-28">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left Column */}
          <div className="lg:col-span-6">
            <p className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3.5 py-1 font-mono text-[11px] tracking-tight text-muted-foreground backdrop-blur-md">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              v3.0 — The Developer Learning Operating System
            </p>
            <h1 className="text-[2.8rem] leading-[1.02] font-bold tracking-[-0.04em] text-balance sm:text-6xl md:text-[4.5rem]">
              From code to{" "}
              <span className="relative inline-block whitespace-nowrap">
                <span className="relative z-10 font-serif italic font-normal text-muted-foreground/75">
                  Mastery
                </span>
                <span className="absolute inset-x-0 bottom-2 z-0 h-3 rounded-full bg-accent/20 blur-[1px]" />
              </span>
              .
            </h1>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-muted-foreground md:text-[17px]">
              Documentation, interactive labs, DSA playground, algorithm visualizers, MCQ
              rounds and company-specific interview prep — unified into one continuous system instead of
              scattered tabs.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={`${base}dsa/problems`}
                className="group inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-all duration-200 hover:opacity-90"
              >
                <Play className="h-3.5 w-3.5 fill-current transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                Start Learning
              </a>
              <a
                href={`${base}overview/`}
                className="rounded-lg border border-border bg-card px-5 py-3 text-sm font-medium transition-colors hover:bg-elevated text-foreground"
              >
                Explore Docs
              </a>
            </div>
            <dl className="mt-12 grid max-w-md grid-cols-3 gap-3 border-t border-border pt-7">
              {[
                ["650+", "Interview questions"],
                ["150", "DSA problems"],
                ["48k", "Monthly developers"],
              ].map(([n, label]) => (
                <div key={label} className="rounded-xl border border-border/70 bg-card/60 p-3.5 transition-colors hover:bg-elevated">
                  <dt className="font-display text-2xl font-bold text-foreground md:text-[26px]">{n}</dt>
                  <dd className="mt-1 text-[11px] leading-snug text-muted-foreground">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right Column — Sleek Dark IDE */}
          <div className="relative lg:col-span-6">
            <div
              className="relative transition-transform duration-500 [transform-style:preserve-3d]"
              style={{
                transform: `perspective(1400px) rotateY(${tilt.x * 3}deg) rotateX(${-tilt.y * 3}deg)`,
              }}
            >
              <div className="overflow-hidden rounded-2xl border border-border/80 bg-card/95 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                {/* Header Bar */}
                <div className="flex items-center justify-between border-b border-border/70 bg-surface/70 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="h-3 w-3 rounded-full bg-[#FF5F56]/80" />
                      <span className="h-3 w-3 rounded-full bg-[#FFBD2E]/80" />
                      <span className="h-3 w-3 rounded-full bg-[#27C93F]/80" />
                    </div>
                    {/* Interactive File Tabs */}
                    <div className="flex items-center gap-1 font-mono text-[11px]">
                      <button
                        type="button"
                        onClick={() => setActiveTab("code")}
                        className={`rounded-md px-2.5 py-1 transition-colors ${
                          activeTab === "code"
                            ? "bg-card text-foreground font-medium border border-border"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        twoSum.ts
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab("tests")}
                        className={`rounded-md px-2.5 py-1 transition-colors ${
                          activeTab === "tests"
                            ? "bg-card text-foreground font-medium border border-border"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        twoSum.spec.ts
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={runTerminalAnimation}
                      disabled={isRunning}
                      className="inline-flex items-center gap-1.5 rounded-md border border-accent/40 bg-accent/10 px-2.5 py-1 font-mono text-[10px] font-semibold text-accent transition-all hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
                    >
                      <RefreshCw className={`h-3 w-3 ${isRunning ? "animate-spin" : ""}`} />
                      {isRunning ? "Running..." : "Run Test"}
                    </button>
                  </div>
                </div>

                {/* Editor Code Body */}
                <div className="p-4 sm:p-5">
                  <Code
                    lines={activeTab === "code" ? codeLines : testCodeLines}
                    className="bg-transparent text-[12px] leading-relaxed"
                  />
                </div>

                {/* Integrated Terminal Footer */}
                <div className="border-t border-border/80 bg-surface/90 p-4">
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Terminal className="h-3.5 w-3.5 text-accent" />
                      $ ipd test twoSum.spec.ts
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <Check className="h-3.5 w-3.5" /> 47/47 Passed · 41ms
                    </span>
                  </div>

                  <div className="mt-3 space-y-1.5 border-t border-border/50 pt-3 font-mono text-[11px]">
                    {typed.map((l, i) => (
                      <p
                        key={l}
                        className={
                          i === terminalScript.length - 1
                            ? "text-emerald-400 font-medium"
                            : i === 0
                              ? "text-foreground font-medium"
                              : "text-muted-foreground"
                        }
                      >
                        {l}
                      </p>
                    ))}
                    <span className="caret-blink inline-block h-3.5 w-1.5 bg-accent align-middle" />
                  </div>
                </div>
              </div>

              {/* Status Chip */}
              <div className="absolute -bottom-4 right-4 hidden rounded-xl border border-border/80 bg-card/95 px-3.5 py-2 shadow-lg backdrop-blur-md sm:flex items-center gap-3 font-mono text-[11px]">
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <Check className="h-3.5 w-3.5" /> Accepted
                </span>
                <span className="text-border">|</span>
                <span className="text-accent font-semibold">+120 XP</span>
                <span className="text-border">|</span>
                <span className="text-muted-foreground">12 day streak</span>
              </div>
            </div>
          </div>
        </div>

        <a
          href="#ecosystem"
          className="mt-16 flex items-center justify-center gap-2 font-mono text-[11px] tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground"
        >
          Scroll to explore
          <ArrowDown className="h-3.5 w-3.5 animate-bounce" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
