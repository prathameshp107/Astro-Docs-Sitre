import { useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  Compass,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";
import { Pill, SectionHead } from "./primitives";

const tracks = [
  {
    id: "frontend",
    name: "Frontend Architecture",
    weeks: "12 weeks",
    hours: "8 hrs/wk",
    xp: "+2,400 XP",
    level: "Intermediate",
    desc: "From semantic HTML and the event loop through React 19 concurrent patterns, performance budgets, WebGL rendering, and web accessibility.",
  },
  {
    id: "backend",
    name: "Backend & Systems",
    weeks: "14 weeks",
    hours: "10 hrs/wk",
    xp: "+2,800 XP",
    level: "Intermediate",
    desc: "Node.js & Go internals, database indexing, caching strategies, distributed transaction safety, and API contracts that survive spike traffic.",
  },
  {
    id: "fullstack",
    name: "Full Stack Engineer",
    weeks: "20 weeks",
    hours: "12 hrs/wk",
    xp: "+4,000 XP",
    level: "All Levels",
    desc: "One multi-tenant SaaS application built end-to-end with auth, Stripe subscriptions, real-time WebSockets, and zero-downtime CI/CD pipelines.",
  },
  {
    id: "ai",
    name: "AI & LLM Engineering",
    weeks: "10 weeks",
    hours: "8 hrs/wk",
    xp: "+2,200 XP",
    level: "Advanced",
    desc: "Prompt engineering, RAG architecture, vector databases (Pinecone/pgvector), evaluation benchmarks, and shipping agentic tool-execution sandboxes.",
  },
  {
    id: "dsa",
    name: "DSA & Problem Solving",
    weeks: "16 weeks",
    hours: "10 hrs/wk",
    xp: "+3,200 XP",
    level: "Foundational",
    desc: "Patterns-first approach — two pointers, sliding windows, graph BFS/DFS, dynamic programming — across 150 company-curated graded challenges.",
  },
  {
    id: "system-design",
    name: "System Design & HLD",
    weeks: "8 weeks",
    hours: "6 hrs/wk",
    xp: "+1,800 XP",
    level: "Senior / Lead",
    desc: "High-level and low-level architecture, rate limiters, distributed key-value stores, event streaming queues, and multi-region replication tradeoffs.",
  },
];

const stops = [
  { step: "01", name: "Documentation", note: "Deep-first concept guides and interactive reference sheets." },
  { step: "02", name: "Programming Labs", note: "Write code in a real Monaco editor with automated test suites." },
  { step: "03", name: "DSA Playground", note: "Drill pattern-based algorithm problems until it becomes muscle memory." },
  { step: "04", name: "Algorithm Visualizer", note: "Watch state changes frame-by-frame with matching pseudocode lines." },
  { step: "05", name: "MCQ Rapid Rounds", note: "Prove recall under a 60-second timer before live interviews." },
  { step: "06", name: "Interview Rehearsal", note: "Technical screens, system design loops, STAR stories & rubrics." },
  { step: "07", name: "Production Project", note: "Ship a real application that withstands code review." },
  { step: "08", name: "Track Mastery", note: "Verified track completion, ready to interview at top tech companies." },
];

export function Roadmaps() {
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(1);

  const track = tracks[activeTrackIndex];

  return (
    <section id="roadmaps" className="border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-24 md:py-28">
        <SectionHead
          index="08"
          kicker="Guided learning roadmaps"
          title="A finite path, not an infinite library"
          lede="Every track chains the same eight stops. Clear, structured guidance from your first lesson to final track mastery."
        />

        <div className="mt-14 overflow-hidden rounded-2xl border border-border/80 bg-card p-6 md:p-9 shadow-xl backdrop-blur-xl">
          {/* Track Selector Buttons */}
          <div className="flex flex-wrap gap-2">
            {tracks.map((t, i) => {
              const isSelected = i === activeTrackIndex;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setActiveTrackIndex(i);
                    setActiveStepIndex(1);
                  }}
                  className={`rounded-full border px-4 py-1.5 font-mono text-[11px] font-medium transition-all duration-200 ${
                    isSelected
                      ? "border-accent/50 bg-accent/15 text-accent shadow-xs font-semibold"
                      : "border-border/80 bg-card text-muted-foreground hover:border-border hover:text-foreground"
                  }`}
                >
                  {t.name}
                </button>
              );
            })}
          </div>

          {/* Active Track Overview Bar */}
          <div className="mt-8 rounded-xl border border-border/70 bg-surface/80 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="font-mono text-[10px] font-semibold text-accent uppercase tracking-wider">
                  Track Overview
                </span>
                <h3 className="mt-1 font-display text-xl font-bold text-foreground md:text-2xl">
                  {track.name}
                </h3>
              </div>

              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span className="rounded-md border border-border bg-card px-2.5 py-1 text-muted-foreground">
                  <Clock className="inline h-3 w-3 mr-1 text-accent" />
                  {track.weeks} · {track.hours}
                </span>
                <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-emerald-400 font-semibold">
                  {track.xp}
                </span>
              </div>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground max-w-3xl">
              {track.desc}
            </p>
          </div>

          {/* Stepper Node Pipeline Path */}
          <div className="relative mt-10">
            <div className="space-y-4">
              {stops.map((s, i) => {
                const isActiveStep = i === activeStepIndex;
                const isCompleted = i < activeStepIndex;

                return (
                  <div
                    key={s.step}
                    onClick={() => setActiveStepIndex(i)}
                    className={`cursor-pointer group flex items-start gap-4 rounded-xl border p-4 transition-all duration-200 ${
                      isActiveStep
                        ? "border-accent/60 bg-accent/10 shadow-sm"
                        : isCompleted
                          ? "border-emerald-500/30 bg-emerald-500/5"
                          : "border-border/60 bg-surface/50 hover:border-border hover:bg-card"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold transition-colors ${
                        isActiveStep
                          ? "bg-accent text-accent-foreground shadow-md"
                          : isCompleted
                            ? "border border-emerald-500/40 bg-emerald-500/20 text-emerald-400"
                            : "border border-border bg-card text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : s.step}
                    </span>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-display text-base font-semibold text-foreground">
                          {s.name}
                        </h4>
                        <span className="font-mono text-[10px] text-muted-foreground">
                          Stop {i + 1} of 8
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                        {s.note}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
