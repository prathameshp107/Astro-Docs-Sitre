import { useState } from "react";
import {
  Brain,
  Building2,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  MessagesSquare,
  Network,
  Sparkles,
  Star,
  Award,
} from "lucide-react";
import { Pill, SectionHead, Window } from "./primitives";

const filters = ["JavaScript", "React", "Node.js", "System Design", "Behavioral", "SQL"];

const interviewQuestions: Record<string, any> = {
  JavaScript: {
    title: "Explain how the event loop schedules microtasks against macrotasks.",
    level: "Medium",
    companies: "Google · Uber",
    round: "technical screen",
    path: "prep / javascript / event-loop",
    modelAnswer:
      "The loop drains the entire microtask queue (Promise.then, queueMicrotask, MutationObserver) after every single macrotask before rendering. An unbounded microtask chain will starve setTimeout(fn, 0) indefinitely.",
    followUps: [
      "Where does requestAnimationFrame sit in that execution order?",
      "How would you yield to the browser thread inside a heavy calculation loop?",
      "What is the difference between process.nextTick and queueMicrotask in Node.js?",
    ],
    rubric: [
      { aspect: "Problem Solving", score: "9/10", note: "Correctly identifies queue draining order." },
      { aspect: "Communication", score: "9.5/10", note: "Uses precise CS terminology." },
      { aspect: "Production Risk", score: "8.5/10", note: "Warns about thread starvation." },
    ],
    readiness: "78%",
  },
  React: {
    title: "How does React Fiber reconciliation handle async rendering and priority lanes?",
    level: "Hard",
    companies: "Meta · Netflix",
    round: "technical screen",
    path: "prep / react / fiber-reconciliation",
    modelAnswer:
      "Fiber splits reconciliation into incremental work units. High-priority updates (user input) interrupt lower-priority render passes (offscreen data fetching) via lane bitmasks.",
    followUps: [
      "Why is the render phase required to be pure and side-effect free?",
      "How does useTransition trigger non-blocking concurrent rendering?",
    ],
    rubric: [
      { aspect: "React Architecture", score: "9/10", note: "Deep grasp of scheduler lanes." },
      { aspect: "State Management", score: "9/10", note: "Understands purity constraints." },
    ],
    readiness: "84%",
  },
  "System Design": {
    title: "Design a Distributed Rate Limiter for 10M Requests/Second",
    level: "Hard",
    companies: "Stripe · Amazon",
    round: "system design",
    path: "prep / system-design / rate-limiter",
    modelAnswer:
      "Use a sliding window log or token bucket with Redis Cluster. Execute atomic Lua scripts on edge proxies (Envoy/Cloudflare) with local in-memory fallback for high availability.",
    followUps: [
      "How do you handle Redis cluster partition failures under load?",
      "How do you prevent cascading failure when thousands of clients get 429 retries?",
    ],
    rubric: [
      { aspect: "Scalability", score: "9.5/10", note: "Atomic Redis Lua + Edge caching." },
      { aspect: "Resilience", score: "9/10", note: "Exponential backoff + jitter mitigation." },
    ],
    readiness: "88%",
  },
};

const rounds = [
  {
    icon: Brain,
    name: "Technical screen",
    desc: "One coding problem, 45 minutes, live narration expected.",
    count: "320 questions",
  },
  {
    icon: Network,
    name: "System design",
    desc: "HLD and LLD prompts with reference architectures and trade-off tables.",
    count: "48 prompts",
  },
  {
    icon: MessagesSquare,
    name: "Behavioral",
    desc: "STAR-structured answers with the follow-ups interviewers actually ask.",
    count: "120 stories",
  },
  {
    icon: Building2,
    name: "Hiring manager",
    desc: "Scope, ownership and impact questions, mapped to each level.",
    count: "62 questions",
  },
];

export function Interview() {
  const [activeFilter, setActiveFilter] = useState("JavaScript");
  const [tabIndex, setTabIndex] = useState<"Question" | "Model Answer" | "Follow-ups" | "Rubric">("Question");

  const q = interviewQuestions[activeFilter] || interviewQuestions.JavaScript;

  return (
    <section id="interview" className="border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-24 md:py-28">
        <SectionHead
          index="06"
          kicker="Interview preparation"
          title="Rehearse the whole loop, round by round"
          lede="Filter by stack, difficulty and company. Each question ships with a model answer, the follow-up chain, a cheat sheet and a readiness score that updates as you rehearse."
        />

        {/* Category Filter Pills */}
        <div className="mt-10 flex flex-wrap gap-2">
          {filters.map((f) => {
            const isSelected = f === activeFilter;
            return (
              <button
                key={f}
                type="button"
                onClick={() => {
                  setActiveFilter(f);
                  setTabIndex("Question");
                }}
                className={`rounded-full border px-4 py-1.5 font-mono text-[11px] font-medium transition-all duration-200 ${
                  isSelected
                    ? "border-accent/50 bg-accent/15 text-accent shadow-xs font-semibold"
                    : "border-border/80 bg-card text-muted-foreground hover:border-border hover:text-foreground"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          {/* Main Question & Answer Window */}
          <div className="reveal lg:col-span-7">
            <Window
              label={q.path}
              tabs={["Question", "Model Answer", "Follow-ups", "Rubric"]}
              activeTab={["Question", "Model Answer", "Follow-ups", "Rubric"].indexOf(tabIndex)}
              onTabChange={(t) => setTabIndex(t as any)}
            >
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Pill tone={q.level === "Hard" ? "accent" : "warning"}>{q.level}</Pill>
                  <Pill>asked at {q.companies}</Pill>
                  <Pill tone="info">{q.round}</Pill>
                </div>

                <h3 className="mt-5 font-display text-lg font-bold text-foreground leading-snug">
                  {q.title}
                </h3>

                {tabIndex === "Question" && (
                  <div className="mt-5 space-y-3">
                    <div className="rounded-lg border border-border/80 bg-card p-4">
                      <p className="font-mono text-[10px] font-semibold text-accent uppercase tracking-wider">
                        Core Evaluation Focus
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        Interviewers assess structured thinking, edge case awareness, and clear narration under pressure.
                      </p>
                    </div>
                  </div>
                )}

                {tabIndex === "Model Answer" && (
                  <div className="mt-4 rounded-lg border border-border/80 bg-surface/90 p-4">
                    <p className="font-mono text-[10px] font-semibold text-accent uppercase tracking-wider">
                      Staff Engineer Model Answer
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-foreground font-medium">
                      {q.modelAnswer}
                    </p>
                  </div>
                )}

                {tabIndex === "Follow-ups" && (
                  <div className="mt-4 space-y-2">
                    <p className="font-mono text-[10px] font-semibold text-accent uppercase tracking-wider">
                      Likely Interviewer Follow-ups
                    </p>
                    {q.followUps.map((item: string) => (
                      <div
                        key={item}
                        className="flex items-start gap-2 rounded-lg border border-border/60 bg-card p-3 text-xs text-muted-foreground"
                      >
                        <ChevronRight className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}

                {tabIndex === "Rubric" && (
                  <div className="mt-4 space-y-2">
                    <p className="font-mono text-[10px] font-semibold text-accent uppercase tracking-wider">
                      Panel Evaluation Rubric
                    </p>
                    {q.rubric.map((r: any) => (
                      <div
                        key={r.aspect}
                        className="flex items-center justify-between rounded-lg border border-border/60 bg-card p-3 font-mono text-[11px]"
                      >
                        <div>
                          <span className="font-semibold text-foreground">{r.aspect}</span>
                          <span className="ml-2 text-muted-foreground text-[10px]">{r.note}</span>
                        </div>
                        <span className="text-emerald-400 font-bold">{r.score}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Readiness Meter */}
              <div className="flex items-center justify-between border-t border-border/80 bg-surface/90 px-4 py-3">
                <span className="font-mono text-[10px] text-muted-foreground font-medium">
                  Readiness · {activeFilter}
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-32 overflow-hidden rounded-full bg-muted">
                    <span
                      className="block h-full rounded-full bg-emerald-400 transition-all duration-700"
                      style={{ width: q.readiness }}
                    />
                  </span>
                  <span className="font-mono text-[10px] font-semibold text-emerald-400">
                    {q.readiness}
                  </span>
                </span>
              </div>
            </Window>
          </div>

          {/* Right Column: Round Types */}
          <div className="reveal grid gap-3 lg:col-span-5">
            {rounds.map(({ icon: Icon, ...r }) => (
              <article
                key={r.name}
                className="card-lift flex gap-4 rounded-xl border border-border/80 bg-card p-4.5 transition-all duration-300 hover:border-accent/30 hover:bg-elevated"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-accent">
                  <Icon className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <div>
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-sm font-semibold text-foreground">{r.name}</h3>
                    <span className="font-mono text-[10px] text-muted-foreground font-medium">{r.count}</span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{r.desc}</p>
                </div>
              </article>
            ))}
            <p className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground pt-1">
              <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
              Mock interviews run on a timer with an automated panel debrief.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
