import { useState } from "react";
import {
  Check,
  CheckCircle2,
  Clock,
  Cpu,
  Filter,
  Lightbulb,
  Search,
  Sparkles,
  Tag,
  Zap,
} from "lucide-react";
import { Pill, SectionHead, Window } from "./primitives";

const dsaProblems = [
  {
    id: "two-sum",
    name: "Two Sum",
    level: "Easy",
    acceptance: "94.2%",
    tags: ["Array", "Hash Map"],
    companies: "Google · Amazon",
    input: "nums = [2,7,11,15], target = 9",
    output: "[0,1]",
    time: "O(N)",
    space: "O(N)",
    runtime: "41ms",
    memory: "44.2MB",
  },
  {
    id: "longest-substring",
    name: "Longest Substring Without Repeat",
    level: "Medium",
    acceptance: "38.7%",
    tags: ["Sliding Window", "String"],
    companies: "Meta · Uber",
    input: 's = "abcabcbb"',
    output: '3 (substring "abc")',
    time: "O(N)",
    space: "O(Min(N, M))",
    runtime: "58ms",
    memory: "46.1MB",
  },
  {
    id: "course-schedule",
    name: "Course Schedule",
    level: "Medium",
    acceptance: "46.1%",
    tags: ["Graph", "Topo Sort"],
    companies: "Microsoft · Stripe",
    input: "numCourses = 2, prerequisites = [[1,0]]",
    output: "true",
    time: "O(V + E)",
    space: "O(V + E)",
    runtime: "64ms",
    memory: "48.5MB",
  },
  {
    id: "merge-k-lists",
    name: "Merge k Sorted Lists",
    level: "Hard",
    acceptance: "51.4%",
    tags: ["Heap", "Linked List"],
    companies: "Amazon · Netflix",
    input: "lists = [[1,4,5],[1,3,4],[2,6]]",
    output: "[1,1,2,3,4,5,6]",
    time: "O(N log K)",
    space: "O(K)",
    runtime: "82ms",
    memory: "51.0MB",
  },
  {
    id: "word-ladder",
    name: "Word Ladder",
    level: "Hard",
    acceptance: "37.9%",
    tags: ["BFS", "Graph"],
    companies: "Google · Adobe",
    input: 'beginWord = "hit", endWord = "cog"',
    output: "5",
    time: "O(M² × N)",
    space: "O(M² × N)",
    runtime: "95ms",
    memory: "54.8MB",
  },
];

const toneFor: Record<string, "success" | "warning" | "accent"> = {
  Easy: "success",
  Medium: "warning",
  Hard: "accent",
};

// 18 weeks × 7 days deterministic activity heatmap
const heat = Array.from({ length: 126 }, (_, i) => (i * 37) % 5);

export function Dsa() {
  const [selectedId, setSelectedId] = useState("two-sum");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"All" | "Attempted" | "Solved">("All");

  const activeProblem =
    dsaProblems.find((p) => p.id === selectedId) || dsaProblems[0];

  const filteredProblems = dsaProblems.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <section id="dsa" className="border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-24 md:py-28">
        <SectionHead
          index="04"
          kicker="DSA playground"
          title="150 problems, chosen for coverage — not volume"
          lede="Filter by difficulty, company or pattern. Every problem ships with constraints, staged hints, an editorial, four language runtimes, submission history and a complexity report on each run."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {/* Left Main Table View */}
          <div className="reveal lg:col-span-7">
            <Window
              label="playground / problems"
              tabs={["All", "Attempted", "Solved"]}
              activeTab={["All", "Attempted", "Solved"].indexOf(activeTab)}
              onTabChange={(t) => setActiveTab(t as any)}
            >
              {/* Search Bar */}
              <div className="flex items-center gap-2 border-b border-border/70 bg-surface/80 px-3.5 py-2">
                <Search className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                <input
                  type="text"
                  placeholder="Filter by title, topic (Array, Graph, Heap)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent font-mono text-[11px] text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>

              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border/80 bg-surface/50 font-mono text-[10px] text-muted-foreground uppercase">
                    <th className="px-4 py-2.5 font-normal">Problem</th>
                    <th className="px-2 py-2.5 font-normal">Level</th>
                    <th className="hidden px-2 py-2.5 font-normal sm:table-cell">Accepted</th>
                    <th className="hidden px-4 py-2.5 font-normal md:table-cell">Companies</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProblems.map((p) => {
                    const isSelected = p.id === selectedId;
                    return (
                      <tr
                        key={p.id}
                        onClick={() => setSelectedId(p.id)}
                        className={`cursor-pointer border-b border-border/60 transition-colors last:border-0 ${
                          isSelected
                            ? "bg-accent/10 font-medium"
                            : "hover:bg-surface/70"
                        }`}
                      >
                        <td className="px-4 py-3">
                          <p className={`text-[13px] font-medium ${isSelected ? "text-accent" : "text-foreground"}`}>
                            {p.name}
                          </p>
                          <p className="mt-1 flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
                            <Tag className="h-2.5 w-2.5 text-accent" aria-hidden="true" />
                            {p.tags.join(" · ")}
                          </p>
                        </td>
                        <td className="px-2 py-3">
                          <Pill tone={toneFor[p.level]}>{p.level}</Pill>
                        </td>
                        <td className="hidden px-2 py-3 font-mono text-[11px] text-muted-foreground sm:table-cell">
                          {p.acceptance}
                        </td>
                        <td className="hidden px-4 py-3 font-mono text-[10px] text-muted-foreground md:table-cell">
                          {p.companies}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Live Telemetry Bar */}
              <div className="flex flex-wrap items-center justify-between border-t border-border/80 bg-surface/90 px-4 py-2.5 font-mono text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1.5 text-warning font-medium">
                  <Lightbulb className="h-3.5 w-3.5" aria-hidden="true" /> 3 staged hints
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {activeProblem.runtime} runtime
                </span>
                <span className="flex items-center gap-1.5 text-accent font-medium">
                  <Cpu className="h-3.5 w-3.5" aria-hidden="true" /> {activeProblem.memory} memory
                </span>
              </div>
            </Window>
          </div>

          {/* Right Column: Heatmap, Stats & Active Problem Console */}
          <div className="reveal space-y-6 lg:col-span-5">
            {/* 126 Day Activity Heatmap */}
            <div className="rounded-xl border border-border/80 bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-sm font-semibold text-foreground">
                  Submission Heatmap
                </h3>
                <span className="font-mono text-[10px] font-semibold text-accent">18 Weeks</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                126 days of telemetry. Consistency compounds over time.
              </p>
              <div className="mt-4 grid grid-flow-col grid-rows-7 gap-1">
                {heat.map((v, i) => (
                  <span
                    key={i}
                    className="h-2.5 w-2.5 rounded-[3px] transition-transform hover:scale-125"
                    style={{
                      background:
                        v === 0
                          ? "var(--color-muted)"
                          : `color-mix(in oklab, var(--color-accent) ${v * 24}%, var(--color-muted))`,
                    }}
                  />
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
                <span>126 active days</span>
                <span className="text-accent font-semibold">412 total submissions</span>
              </div>
            </div>

            {/* Solved Progress Bar Metrics */}
            <div className="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-border/80 bg-border">
              {[
                { label: "Easy solved", count: "68", pct: "92%", color: "bg-emerald-400" },
                { label: "Medium solved", count: "54", pct: "74%", color: "bg-amber-400" },
                { label: "Hard solved", count: "19", pct: "34%", color: "bg-accent" },
              ].map((m) => (
                <div key={m.label} className="bg-card p-4">
                  <p className="font-display text-xl font-bold text-foreground">{m.count}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">{m.label}</p>
                  <span className="mt-3 block h-1 overflow-hidden rounded-full bg-muted">
                    <span
                      className={`block h-full rounded-full ${m.color}`}
                      style={{ width: m.pct }}
                    />
                  </span>
                </div>
              ))}
            </div>

            {/* Active Output Console */}
            <div className="rounded-xl border border-border/80 bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between border-b border-border/60 pb-2 mb-3 font-mono text-[10px]">
                <span className="font-semibold text-foreground">
                  Active Execution Console · {activeProblem.name}
                </span>
                <span className="text-emerald-400 font-semibold">✓ 100% Accepted</span>
              </div>
              <pre className="overflow-x-auto rounded-lg bg-surface/90 p-3 font-mono text-[11px] leading-relaxed text-muted-foreground">
{`> input:    ${activeProblem.input}
> output:   ${activeProblem.output}
> time:     ${activeProblem.time}
> space:    ${activeProblem.space}
✓ Verified · ${activeProblem.runtime} · ${activeProblem.memory}`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
