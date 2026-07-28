import { useState } from "react";
import {
  Check,
  CheckCircle2,
  Code2,
  Eye,
  Maximize2,
  Play,
  RefreshCw,
  Save,
  Terminal,
  Type,
  Zap,
} from "lucide-react";
import { Code, Pill, SectionHead, Window, tok } from "./primitives";

const labsData = [
  {
    id: "debounce",
    title: "Lab 07 — debounce()",
    file: "debounce.js",
    code: [
      [{ t: "// Lab 07 — debounce() implementation", c: tok.com }],
      [
        { t: "export function ", c: tok.kw },
        { t: "debounce", c: tok.fn },
        { t: "(fn, wait = ", c: tok.punc },
        { t: "300", c: tok.num },
        { t: ") {", c: tok.punc },
      ],
      [{ t: "  let ", c: tok.kw }, { t: "timerId;" }],
      [
        { t: "  return ", c: tok.kw },
        { t: "(...args) => {", c: tok.punc },
      ],
      [{ t: "    clearTimeout", c: tok.fn }, { t: "(timerId);", c: tok.punc }],
      [
        { t: "    timerId = ", c: "" },
        { t: "setTimeout", c: tok.fn },
        { t: "(() => ", c: tok.punc },
        { t: "fn", c: tok.fn },
        { t: "(...args), wait);", c: tok.punc },
      ],
      [{ t: "  };", c: tok.punc }],
      [{ t: "}", c: tok.punc }],
    ],
    testCode: [
      [{ t: "// tests.spec.js · Automated Vitest Suite", c: tok.com }],
      [
        { t: "import ", c: tok.kw },
        { t: "{ test, expect, vi } ", c: "" },
        { t: "from ", c: tok.kw },
        { t: "'vitest'", c: tok.num },
        { t: ";", c: tok.punc },
      ],
      [
        { t: "import ", c: tok.kw },
        { t: "{ debounce } ", c: "" },
        { t: "from ", c: tok.kw },
        { t: "'./debounce.js'", c: tok.num },
        { t: ";", c: tok.punc },
      ],
      [],
      [
        { t: "test", c: tok.fn },
        { t: "(", c: tok.punc },
        { t: "'fires once after quiet period'", c: tok.num },
        { t: ", () => {", c: tok.punc },
      ],
      [
        { t: "  const ", c: tok.kw },
        { t: "fn = vi.", c: "" },
        { t: "fn", c: tok.fn },
        { t: "();", c: tok.punc },
      ],
      [
        { t: "  const ", c: tok.kw },
        { t: "debounced = ", c: "" },
        { t: "debounce", c: tok.fn },
        { t: "(fn, ", c: tok.punc },
        { t: "100", c: tok.num },
        { t: ");", c: tok.punc },
      ],
      [{ t: "  expect", c: tok.fn }, { t: "(fn).", c: tok.punc }, { t: "toHaveBeenCalledTimes", c: tok.fn }, { t: "(", c: tok.punc }, { t: "1", c: tok.num }, { t: ");", c: tok.punc }],
      [{ t: "});", c: tok.punc }],
    ],
    cases: [
      { name: "fires once after quiet period", status: "pass", time: "3ms" },
      { name: "cancels pending calls", status: "pass", time: "4ms" },
      { name: "forwards latest arguments", status: "pass", time: "2ms" },
      { name: "preserves `this` binding", status: "pass", time: "3ms" },
    ],
    xp: "+80 XP",
  },
  {
    id: "useLocalStorage",
    title: "Lab 12 — useLocalStorage()",
    file: "useLocalStorage.ts",
    code: [
      [{ t: "// Lab 12 — Custom React Hook", c: tok.com }],
      [
        { t: "export function ", c: tok.kw },
        { t: "useLocalStorage", c: tok.fn },
        { t: "<T>(key: string, initialValue: T) {", c: tok.punc },
      ],
      [
        { t: "  const [value, setValue] = ", c: "" },
        { t: "useState", c: tok.fn },
        { t: "(...) ;", c: tok.punc },
      ],
      [
        { t: "  return ", c: tok.kw },
        { t: "[value, setValue] ", c: "" },
        { t: "as const;", c: tok.kw },
      ],
      [{ t: "}", c: tok.punc }],
    ],
    testCode: [
      [{ t: "// useLocalStorage.spec.ts", c: tok.com }],
      [
        { t: "test", c: tok.fn },
        { t: "(", c: tok.punc },
        { t: "'persists state changes to localStorage'", c: tok.num },
        { t: ");", c: tok.punc },
      ],
    ],
    cases: [
      { name: "initializes with default state", status: "pass", time: "2ms" },
      { name: "persists updates to localStorage", status: "pass", time: "5ms" },
      { name: "syncs state across window events", status: "pass", time: "4ms" },
    ],
    xp: "+110 XP",
  },
];

const capabilities = [
  {
    icon: Code2,
    title: "Monaco Code Editor",
    desc: "Integrated VS Code engine with autocomplete, linting and real keybindings.",
  },
  {
    icon: Terminal,
    title: "Console & Terminal Bar",
    desc: "Stream stdout, stderr, exception tracebacks and process exit codes.",
  },
  {
    icon: Eye,
    title: "DOM Live Preview",
    desc: "Interactive UI components render dynamically right beside your code.",
  },
  {
    icon: CheckCircle2,
    title: "Automated Test Runner",
    desc: "Visible & hidden test suites execute automatically on every save (⌘S).",
  },
  {
    icon: Save,
    title: "Persistent Session Autosave",
    desc: "Code drafts survive browser refreshes, tab switching, and crash recovery.",
  },
  {
    icon: Maximize2,
    title: "Zen Mode & Custom Layouts",
    desc: "Toggle split view, font sizes and full-screen focus for distraction-free coding.",
  },
];

export function Labs() {
  const [activeLabIndex, setActiveLabIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"code" | "tests" | "preview">("code");
  const [isRunning, setIsRunning] = useState(false);

  const lab = labsData[activeLabIndex];

  const handleRunSuite = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
    }, 600);
  };

  return (
    <section id="labs" className="border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-24 md:py-28">
        <SectionHead
          index="03"
          kicker="Interactive programming labs"
          title="An editor that grades you, not a video that talks at you"
          lede="Every lesson ends in a lab: a scoped file tree, a real editor, a test suite and an execution sandbox. You submit only when the suite is green — and the XP lands the moment it is."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {/* Main Interactive Lab Window */}
          <div className="reveal lg:col-span-7">
            <Window
              label={`lab / javascript / ${lab.id}`}
              tabs={[lab.file, "tests.spec.js", "preview"]}
              activeTab={activeTab === "code" ? 0 : activeTab === "tests" ? 1 : 2}
              onTabChange={(_, idx) => {
                if (idx === 0) setActiveTab("code");
                else if (idx === 1) setActiveTab("tests");
                else setActiveTab("preview");
              }}
            >
              {/* Lab Selector Header Pill */}
              <div className="flex items-center justify-between border-b border-border/70 bg-surface/90 px-3.5 py-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-semibold text-accent uppercase">
                    Active Lab:
                  </span>
                  <div className="flex items-center gap-1 font-mono text-[11px]">
                    {labsData.map((l, idx) => (
                      <button
                        key={l.id}
                        type="button"
                        onClick={() => {
                          setActiveLabIndex(idx);
                          setActiveTab("code");
                        }}
                        className={`rounded-md px-2.5 py-0.5 transition-colors ${
                          idx === activeLabIndex
                            ? "bg-card text-foreground font-semibold border border-border"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {l.id}
                      </button>
                    ))}
                  </div>
                </div>
                <span className="font-mono text-[10px] font-semibold text-emerald-400">
                  {lab.xp}
                </span>
              </div>

              {/* Editor Pane */}
              {activeTab === "preview" ? (
                <div className="p-6 text-center space-y-3 bg-surface/50 min-h-[200px] flex flex-col items-center justify-center">
                  <Eye className="h-6 w-6 text-accent animate-pulse" />
                  <p className="font-mono text-xs font-semibold text-foreground">DOM Sandbox Preview</p>
                  <p className="text-xs text-muted-foreground max-w-sm">
                    Interactive DOM component rendered live with debounce event simulation.
                  </p>
                </div>
              ) : (
                <Code
                  lines={activeTab === "code" ? lab.code : lab.testCode}
                  className="bg-transparent text-[12px] leading-relaxed"
                />
              )}

              {/* Editor Control Footer */}
              <div className="flex items-center justify-between border-t border-border/80 bg-surface/90 px-3.5 py-2">
                <div className="flex items-center gap-3 font-mono text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Save className="h-3 w-3 text-accent" aria-hidden="true" /> autosaved
                  </span>
                  <span className="flex items-center gap-1">
                    <Type className="h-3 w-3" aria-hidden="true" /> 13px
                  </span>
                  <span className="flex items-center gap-1">
                    <Maximize2 className="h-3 w-3" aria-hidden="true" /> fullscreen
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleRunSuite}
                  disabled={isRunning}
                  className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3 py-1 font-mono text-[10px] font-semibold text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  <RefreshCw className={`h-3 w-3 ${isRunning ? "animate-spin" : ""}`} />
                  {isRunning ? "Running..." : "Run Suite ⌘↵"}
                </button>
              </div>

              {/* Test Suite Results Footer */}
              <div className="border-t border-border/80 bg-card p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Pill tone="success">Accepted</Pill>
                  <Pill tone="accent">{lab.xp}</Pill>
                  <Pill>{lab.cases.length}/{lab.cases.length} Suite Passed · 12ms</Pill>
                </div>
                <ul className="space-y-1.5">
                  {lab.cases.map((c) => (
                    <li
                      key={c.name}
                      className="flex items-center justify-between font-mono text-[11px] text-muted-foreground"
                    >
                      <span className="flex items-center gap-2 text-foreground">
                        <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" aria-hidden="true" />
                        {c.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground/70">{c.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Window>
          </div>

          {/* Right Column Capabilities */}
          <div className="reveal lg:col-span-5">
            <ul className="grid gap-2">
              {capabilities.map((c) => {
                const Icon = c.icon;
                return (
                  <li
                    key={c.title}
                    className="group card-lift flex items-start gap-3 rounded-xl border border-border/80 bg-card p-4 transition-all duration-300 hover:border-accent/30 hover:bg-elevated"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-accent transition-transform duration-300 group-hover:scale-105">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-display text-sm font-semibold text-foreground">
                        {c.title}
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                        {c.desc}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
