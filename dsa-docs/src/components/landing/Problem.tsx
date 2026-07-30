import { useState, useEffect } from "react";
import {
  BookText,
  Code2,
  Cpu,
  MessagesSquare,
  Check,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Zap,
  Search,
} from "lucide-react";

const pipelineStages = [
  {
    id: "docs",
    step: "01",
    name: "Documentation",
    label: "Docs",
    icon: BookText,
    badge: "Reference",
    path: "docs / javascript / control-flow",
    title: "Sequential Control Flow",
    detail: "Read in-depth guides with inline runnable code, architecture diagrams & ⌘K search.",
    meta: "68% Guide Read · ⌘K Search",
    accentTone: "text-blue-400 border-blue-500/30 bg-blue-500/10",
  },
  {
    id: "labs",
    step: "02",
    name: "Programming Labs",
    label: "Labs",
    icon: Code2,
    badge: "Execution",
    path: "lab / javascript / debounce",
    title: "debounce.js — Vitest Suite",
    detail: "Write code in a real editor with instant automated unit test suites and XP rewards.",
    meta: "4/4 Test Suite Passed · +80 XP",
    accentTone: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
  },
  {
    id: "dsa",
    step: "03",
    name: "DSA Playground",
    label: "DSA",
    icon: Cpu,
    badge: "Optimization",
    path: "playground / problems / two-sum",
    title: "Two Sum — O(N) Hash Map",
    detail: "Solve pattern-based algorithm challenges with runtime complexity analytics.",
    meta: "41ms Runtime · 100% Accepted",
    accentTone: "text-amber-400 border-amber-500/30 bg-amber-500/10",
  },
  {
    id: "interview",
    step: "04",
    name: "Interview Rehearsal",
    label: "Rehearsal",
    icon: MessagesSquare,
    badge: "Mastery",
    path: "interview / system-design / rate-limiter",
    title: "System Design & Spoken Loop",
    detail: "Rehearse real company loops with panel rubrics and live readiness tracking.",
    meta: "94% Readiness Score · Loop Ready",
    accentTone: "text-purple-400 border-purple-500/30 bg-purple-500/10",
  },
];

export function Problem() {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % pipelineStages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = pipelineStages[activeStage];
  const ActiveIcon = current.icon;

  return (
    <section id="problem" className="relative overflow-hidden border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-24 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Content */}
          <div className="reveal lg:col-span-7">
            <div className="font-mono text-xs font-semibold tracking-wider text-purple-400 uppercase">
              THE PROBLEM · 00
            </div>

            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl leading-[1.1]">
              Traditional learning is{" "}
              <span className="font-serif italic font-normal text-muted-foreground/75">
                fragmented
              </span>
              . We built the unified kernel.
            </h2>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Stop context-switching between docs, YouTube tabs and disjointed sandboxes.
                Everything a developer needs to learn, practice, prepare and grow lives in one
                continuous environment.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                From the first line of a visualizer to the final mock interview, your progress is
                tracked inside a single persistent XP ecosystem.
              </p>
            </div>
          </div>

          {/* Right Card — Elevated Pipeline Visualizer */}
          <div className="reveal lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/95 p-6 md:p-7 shadow-2xl backdrop-blur-xl">
              {/* Header Telemetry */}
              <div className="flex items-center justify-between border-b border-border/70 pb-4">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <span className="font-mono text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                    UNIFIED KERNEL PIPELINE
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-0.5 font-mono text-[10px] font-medium text-purple-300">
                  <Sparkles className="h-3 w-3" /> Persistent XP
                </span>
              </div>

              {/* Connected Pipeline Nodes */}
              <div className="relative mt-6">
                {/* Connector line */}
                <div
                  className="absolute top-4 h-0.5 bg-border/80"
                  style={{ left: "12.5%", right: "12.5%" }}
                  aria-hidden="true"
                />
                <div
                  className="absolute top-4 h-0.5 bg-purple-500 transition-all duration-500 ease-out"
                  style={{
                    left: "12.5%",
                    width: `${(activeStage / (pipelineStages.length - 1)) * 75}%`,
                  }}
                  aria-hidden="true"
                />

                <div className="relative grid grid-cols-4 gap-2 text-center">
                  {pipelineStages.map((s, idx) => {
                    const isActive = idx === activeStage;
                    const isDone = idx < activeStage;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setActiveStage(idx)}
                        className="group flex flex-col items-center focus:outline-none"
                      >
                        <span
                          className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border text-[10px] font-mono font-bold transition-all duration-300 ${
                            isActive
                              ? "border-purple-400 bg-purple-500 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)] scale-110"
                              : isDone
                                ? "border-purple-500/50 bg-purple-500/20 text-purple-300"
                                : "border-border bg-card text-muted-foreground hover:border-border-strong hover:text-foreground"
                          }`}
                        >
                          {isDone ? <Check className="h-3.5 w-3.5" /> : s.step}
                        </span>
                        <span
                          className={`mt-2 font-display text-[10px] font-medium transition-colors ${
                            isActive ? "text-foreground font-semibold" : "text-muted-foreground"
                          }`}
                        >
                          {s.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Stage Mock Surface Preview */}
              <div className="mt-6 rounded-xl border border-border bg-surface/90 p-4 sm:p-5">
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card text-accent">
                      <ActiveIcon className="h-3.5 w-3.5" />
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {current.path}
                    </span>
                  </div>
                  <span
                    className={`rounded px-2 py-0.5 font-mono text-[9px] font-semibold border ${current.accentTone}`}
                  >
                    {current.badge}
                  </span>
                </div>

                <div className="mt-3.5">
                  <h4 className="font-display text-sm font-semibold text-foreground">
                    {current.title}
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    {current.detail}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 font-mono text-[10px]">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5" /> {current.meta}
                  </span>
                  <span className="text-muted-foreground">0ms context switch</span>
                </div>
              </div>

              {/* Bottom Telemetry Banner */}
              <div className="mt-4 flex items-center justify-between rounded-xl border border-border/60 bg-card/60 px-4 py-2.5 font-mono text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1.5 text-foreground">
                  <Zap className="h-3.5 w-3.5 text-purple-400" /> Continuous Kernel Active
                </span>
                <span className="text-purple-400 font-semibold">1 Persistent Identity →</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
