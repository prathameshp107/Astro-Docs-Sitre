import { useState, useRef } from "react";
import { Award, Flame, Sparkles, Target, TrendingUp, Trophy, Zap } from "lucide-react";
import { useCountUp, useInView } from "@/hooks/use-count-up";
import { SectionHead } from "./primitives";

const heat = Array.from({ length: 91 }, (_, i) => (i * 29) % 5);

const skillsData = [
  { name: "JavaScript", val: 86, category: "Languages" },
  { name: "React", val: 74, category: "Languages" },
  { name: "Node.js", val: 62, category: "Architecture" },
  { name: "DSA & Algorithms", val: 58, category: "Algorithms" },
  { name: "System Design", val: 41, category: "Architecture" },
];

export function ProgressXp() {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref);
  const xp = useCountUp(8420, seen);
  const streak = useCountUp(12, seen);
  const badges = useCountUp(27, seen);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filteredSkills = skillsData.filter(
    (s) => selectedFilter === "All" || s.category === selectedFilter
  );

  return (
    <section id="progress" className="border-b border-border bg-surface" ref={ref}>
      <div className="mx-auto max-w-6xl px-5 py-24 md:py-28">
        <SectionHead
          index="10"
          kicker="Progress & XP"
          title="Momentum you can point at"
          lede="XP, levels, streaks and goals exist for exactly one reason: to make the next session easier to start. Honest picture of readiness with real execution telemetry."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-12">
          {/* 4 Counter Cards */}
          {[
            [TrendingUp, xp.toLocaleString(), "XP Earned · Level 7", "+340 this week"],
            [Flame, `${streak} Days`, "Active Streak · Best 31", "Fire active"],
            [Trophy, `${badges}`, "Badges Unlocked", "Top 5% rank"],
            [Target, "6 / 7", "Weekly Goal Sessions", "1 session left"],
          ].map(([Icon, n, l, sub], i) => {
            const I = Icon as typeof Flame;
            return (
              <div
                key={i}
                className="reveal card-lift rounded-xl border border-border/80 bg-card p-6 shadow-sm md:col-span-3 transition-all duration-300 hover:border-accent/30 hover:bg-elevated"
              >
                <div className="flex items-center justify-between">
                  <I className="h-4 w-4 text-accent" strokeWidth={1.8} aria-hidden="true" />
                  <span className="font-mono text-[9px] font-semibold text-emerald-400">{sub as string}</span>
                </div>
                <p className="mt-4 font-display text-3xl font-bold text-foreground tabular-nums">
                  {n as string}
                </p>
                <p className="mt-1.5 text-xs text-muted-foreground">{l as string}</p>
              </div>
            );
          })}

          {/* Learning Heatmap */}
          <div className="reveal rounded-xl border border-border/80 bg-card p-6 md:col-span-7 shadow-sm">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <h3 className="font-display text-sm font-semibold text-foreground">
                91-Day Learning Activity Heatmap
              </h3>
              <span className="font-mono text-[10px] text-accent font-semibold">13 Weeks</span>
            </div>
            <div className="mt-5 grid grid-flow-col grid-rows-7 gap-1">
              {heat.map((v, i) => (
                <span
                  key={i}
                  className="h-3 w-3 rounded-[3px] transition-transform hover:scale-125"
                  style={{
                    background:
                      v === 0
                        ? "var(--color-muted)"
                        : `color-mix(in oklab, var(--color-emerald-400) ${v * 22}%, var(--color-muted))`,
                  }}
                />
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
              <span>91 active sessions</span>
              <span className="text-accent font-semibold">Current track: "Graphs — Shortest Paths"</span>
            </div>
          </div>

          {/* Interactive Skill Graph */}
          <div className="reveal rounded-xl border border-border/80 bg-card p-6 md:col-span-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <h3 className="font-display text-sm font-semibold text-foreground">Skill Radar Graph</h3>
              <div className="flex gap-1 font-mono text-[9px]">
                {["All", "Languages", "Architecture"].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedFilter(cat)}
                    className={`rounded px-1.5 py-0.5 transition-colors ${
                      selectedFilter === cat
                        ? "bg-accent/15 text-accent font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <ul className="mt-5 space-y-3.5">
              {filteredSkills.map((s) => (
                <li key={s.name}>
                  <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground">
                    <span className="text-foreground font-medium">{s.name}</span>
                    <span className="text-accent font-semibold">{s.val}%</span>
                  </div>
                  <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-muted">
                    <span
                      className="block h-full rounded-full bg-accent transition-all duration-1000"
                      style={{ width: seen ? `${s.val}%` : "0%" }}
                    />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
