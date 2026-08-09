import { useState } from "react";
import { Award, CheckCircle2, MessageCircle, Sparkles, Users } from "lucide-react";
import { SectionHead } from "./primitives";

const GithubIcon = ({ className = "h-4 w-4" }: { className?: string; strokeWidth?: number }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const badges = [
  { title: "Graph Whisperer", desc: "Solved every graph problem in the core curriculum.", icon: "🌌", unlocked: true },
  { title: "Thirty Days Streak", desc: "A full month without breaking daily learning goals.", icon: "🔥", unlocked: true },
  { title: "Editorial Mastery", desc: "Read official staff editorials after 50 accepted runs.", icon: "📖", unlocked: true },
  { title: "Mock Loop Ready", desc: "Cleared five timed mock interview panels with green scores.", icon: "⚡", unlocked: false },
];

export function Community() {
  const [activeBadgeIndex, setActiveBadgeIndex] = useState(0);

  return (
    <section id="community" className="border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-24 md:py-28">
        <SectionHead
          index="11"
          kicker="Community & achievements"
          title="Nobody clears a loop alone"
          lede="Discussion threads on every problem, peer solution reviews, weekly cohort rounds and verifiable certificates when a track is finished."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {/* Left Grid: Badges */}
          <div className="reveal grid gap-3 sm:grid-cols-2 lg:col-span-7">
            {badges.map((b, idx) => {
              const isSelected = idx === activeBadgeIndex;
              return (
                <article
                  key={b.title}
                  onClick={() => setActiveBadgeIndex(idx)}
                  className={`cursor-pointer card-lift rounded-xl border p-5 transition-all duration-300 ${
                    isSelected
                      ? "border-accent/60 bg-accent/10 shadow-sm"
                      : "border-border/80 bg-card hover:border-border hover:bg-elevated"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl">{b.icon}</span>
                    {b.unlocked ? (
                      <span className="flex items-center gap-1 font-mono text-[9px] font-semibold text-emerald-400">
                        <CheckCircle2 className="h-3 w-3" /> Unlocked
                      </span>
                    ) : (
                      <span className="font-mono text-[9px] text-muted-foreground">In Progress</span>
                    )}
                  </div>
                  <h3 className="mt-3 font-display text-sm font-semibold text-foreground">{b.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{b.desc}</p>
                </article>
              );
            })}
          </div>

          {/* Right Column: Community Telemetry */}
          <div className="reveal grid content-start gap-4 lg:col-span-5">
            {[
              [Users, "48,000 active developers", "Reading, solving, and reviewing code every month."],
              [MessageCircle, "12,400 discussion threads", "Alternative solutions, edge-case debates, and follow-ups."],
              [Sparkles, "Comprehensive curriculum", "Docs and problem sets continuously refined for interview prep."],
            ].map(([Icon, t, d], i) => {
              const I = Icon as typeof Users;
              return (
                <article
                  key={i}
                  className="card-lift flex gap-4 rounded-xl border border-border/80 bg-card p-5 transition-all duration-300 hover:border-accent/30 hover:bg-elevated"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-accent">
                    <I className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-sm font-semibold text-foreground">{t as string}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{d as string}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
