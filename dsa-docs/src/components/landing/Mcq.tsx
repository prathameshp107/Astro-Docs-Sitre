import { useState } from "react";
import { Check, ChevronRight, HelpCircle, RefreshCw, Timer, Trophy, X } from "lucide-react";
import { Pill, SectionHead, Window } from "./primitives";

const mcqQuestions = [
  {
    id: 1,
    category: "JavaScript",
    question: "When does the microtask queue get drained?",
    options: [
      { key: "A", text: "It runs before every macrotask", correct: false },
      { key: "B", text: "It drains fully after each macrotask before render", correct: true },
      { key: "C", text: "It runs only on browser idle frames", correct: false },
      { key: "D", text: "It is identical to setTimeout(fn, 0)", correct: false },
    ],
    explanation:
      "The queue is drained to empty after each macrotask completes and before the next render — which is why promise chains can starve timers.",
    xp: "+25 XP",
  },
  {
    id: 2,
    category: "React",
    question: "What triggers a re-render in a component wrapped in React.memo?",
    options: [
      { key: "A", text: "Parent re-renders regardless of props", correct: false },
      { key: "B", text: "Prop reference changes or internal state/context changes", correct: true },
      { key: "C", text: "Only explicit forceUpdate() calls", correct: false },
      { key: "D", text: "Direct DOM mutations in child nodes", correct: false },
    ],
    explanation:
      "React.memo skips render if props are shallowly equal, but internal useState or useContext updates still force a re-render.",
    xp: "+30 XP",
  },
];

export function Mcq() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedKey, setSelectedKey] = useState<string | null>("B");

  const q = mcqQuestions[questionIndex];
  const r = 26;
  const c = 2 * Math.PI * r;

  return (
    <section id="mcq" className="border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-24 md:py-28">
        <SectionHead
          index="07"
          kicker="MCQ hub"
          title="Timed rounds that expose the gaps before a recruiter does"
          lede="Sixty seconds a question. Instant explanation, XP on correct answers, a review-later queue for everything you fumbled, and a weekly leaderboard if you like the pressure."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {/* Main Interactive MCQ Window */}
          <div className="reveal lg:col-span-7">
            <Window label={`mcq / ${q.category.toLowerCase()} / round-4`}>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Pill tone="info">Question {questionIndex + 1} of 15</Pill>
                    <button
                      type="button"
                      onClick={() => {
                        setQuestionIndex((prev) => (prev + 1) % mcqQuestions.length);
                        setSelectedKey(null);
                      }}
                      className="inline-flex items-center gap-1 font-mono text-[10px] text-muted-foreground hover:text-foreground"
                    >
                      <RefreshCw className="h-3 w-3" /> Next Q
                    </button>
                  </div>
                  <span className="flex items-center gap-1.5 font-mono text-[11px] text-accent font-semibold">
                    <Timer className="h-3.5 w-3.5 animate-pulse" aria-hidden="true" /> 00:42
                  </span>
                </div>

                <h3 className="mt-5 font-display text-lg font-bold text-foreground leading-snug">
                  {q.question}
                </h3>

                {/* Option List */}
                <ul className="mt-5 space-y-2">
                  {q.options.map((opt) => {
                    const isSelected = selectedKey === opt.key;
                    const isCorrect = opt.correct;
                    const showResult = selectedKey !== null;

                    let bgClass = "border-border/80 bg-card text-muted-foreground hover:border-border hover:text-foreground";
                    if (showResult && isCorrect) {
                      bgClass = "border-emerald-500/50 bg-emerald-500/10 text-foreground font-medium";
                    } else if (isSelected && !isCorrect) {
                      bgClass = "border-rose-500/50 bg-rose-500/10 text-rose-300";
                    }

                    return (
                      <li key={opt.key}>
                        <button
                          type="button"
                          onClick={() => setSelectedKey(opt.key)}
                          className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left font-mono text-xs transition-all duration-200 ${bgClass}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-[11px] text-accent">{opt.key}</span>
                            <span className="text-foreground">{opt.text}</span>
                          </div>
                          {showResult && isCorrect ? (
                            <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                          ) : isSelected && !isCorrect ? (
                            <X className="h-4 w-4 text-rose-400 shrink-0" />
                          ) : null}
                        </button>
                      </li>
                    );
                  })}
                </ul>

                {/* Explanation Block */}
                {selectedKey !== null && (
                  <div className="mt-5 rounded-xl border border-border/80 bg-surface/90 p-4">
                    <p className="font-mono text-[10px] font-semibold text-accent uppercase tracking-wider">
                      Explanation & Context
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {q.explanation}
                    </p>
                  </div>
                )}
              </div>

              {/* Window Footer */}
              <div className="flex items-center justify-between border-t border-border/80 bg-surface/90 px-4 py-3 font-mono text-[10px] text-muted-foreground">
                <span>review later · 2 queued</span>
                <span className="text-emerald-400 font-semibold">{q.xp} Earned</span>
              </div>
            </Window>
          </div>

          {/* Right Column: Accuracy & Leaderboard */}
          <div className="reveal space-y-4 lg:col-span-5">
            {/* Round Accuracy Donut */}
            <div className="flex items-center gap-6 rounded-xl border border-border/80 bg-card p-5 shadow-sm">
              <svg width="72" height="72" viewBox="0 0 72 72" aria-hidden="true" className="shrink-0">
                <circle cx="36" cy="36" r={r} fill="none" stroke="var(--color-muted)" strokeWidth="6" />
                <circle
                  cx="36"
                  cy="36"
                  r={r}
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={c}
                  strokeDashoffset={c * 0.13}
                  transform="rotate(-90 36 36)"
                  style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1)" }}
                />
              </svg>
              <div>
                <p className="font-display text-2xl font-bold text-foreground">87%</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Round accuracy · 13 of 15 correct
                </p>
              </div>
            </div>

            {/* Weekly Leaderboard */}
            <div className="rounded-xl border border-border/80 bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <h3 className="flex items-center gap-2 font-display text-sm font-semibold text-foreground">
                  <Trophy className="h-4 w-4 text-amber-400" aria-hidden="true" /> Weekly Leaderboard
                </h3>
                <span className="font-mono text-[10px] text-accent font-semibold">Global Rank</span>
              </div>
              <ol className="mt-4 space-y-2.5">
                {[
                  ["01", "sanjana.k", "4,820", false],
                  ["02", "you", "4,510", true],
                  ["03", "devraj", "4,190", false],
                  ["04", "m.okafor", "3,880", false],
                ].map(([p, n, xp, isUser]) => (
                  <li
                    key={n as string}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 font-mono text-[11px] transition-colors ${
                      isUser
                        ? "border border-accent/40 bg-accent/10 font-semibold text-accent"
                        : "bg-surface/50 text-muted-foreground"
                    }`}
                  >
                    <span>
                      {p as string} · {n as string}
                    </span>
                    <span>{xp as string} XP</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
