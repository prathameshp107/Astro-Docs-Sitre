import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, Shuffle, Zap } from "lucide-react";
import { SectionHead, Window } from "./primitives";

const algorithms = [
  { name: "Merge Sort", complexity: "O(N log N)", space: "O(N)", type: "Sorting" },
  { name: "Quick Sort", complexity: "O(N log N)", space: "O(log N)", type: "Sorting" },
  { name: "Bubble Sort", complexity: "O(N²)", space: "O(1)", type: "Sorting" },
  { name: "Heap Sort", complexity: "O(N log N)", space: "O(1)", type: "Sorting" },
  { name: "BFS Traversal", complexity: "O(V + E)", space: "O(V)", type: "Graph" },
  { name: "DFS Traversal", complexity: "O(V + E)", space: "O(V)", type: "Graph" },
  { name: "Binary Tree Search", complexity: "O(log N)", space: "O(H)", type: "Tree" },
  { name: "Trie Lookup", complexity: "O(L)", space: "O(N × L)", type: "Tree" },
  { name: "Sliding Window", complexity: "O(N)", space: "O(1)", type: "Pattern" },
  { name: "Dynamic Programming", complexity: "O(N × K)", space: "O(N)", type: "DP" },
];

const nodes = [
  { id: "A", x: 60, y: 40 },
  { id: "B", x: 160, y: 20 },
  { id: "C", x: 160, y: 90 },
  { id: "D", x: 260, y: 20 },
  { id: "E", x: 260, y: 90 },
  { id: "F", x: 350, y: 55 },
];

const edges: [string, string][] = [
  ["A", "B"],
  ["A", "C"],
  ["B", "D"],
  ["C", "E"],
  ["D", "F"],
  ["E", "F"],
];

export function Visualizers() {
  const [activeAlgoName, setActiveAlgoName] = useState("Merge Sort");
  const [playing, setPlaying] = useState(true);
  const [step, setStep] = useState(3);
  const [bars, setBars] = useState([34, 58, 22, 71, 46, 88, 15, 63, 39, 77, 51, 29]);
  const [speed, setSpeed] = useState(1.6);

  const activeAlgo = algorithms.find((a) => a.name === activeAlgoName) || algorithms[0];

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 8);
    }, Math.max(300, 1000 / speed));
    return () => clearInterval(interval);
  }, [playing, speed]);

  const handleRandomize = () => {
    const newBars = Array.from({ length: 12 }, () => Math.floor(Math.random() * 75) + 15);
    setBars(newBars);
  };

  return (
    <section id="visualizers" className="border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-24 md:py-28">
        <SectionHead
          index="05"
          kicker="Algorithm visualizers"
          title="Watch the algorithm think, one frame at a time"
          lede="Scrub, step, replay and race algorithms side by side. Every frame highlights the matching pseudocode line and the live state of your queue, stack or pointer window."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {/* Main Visualizer Window */}
          <div className="reveal lg:col-span-8">
            <Window label={`visualizer / ${activeAlgo.name.toLowerCase().replace(/ /g, "-")}`}>
              <div className="grid grid-cols-12">
                {/* Left: Array Bar Visualizer */}
                <div className="col-span-12 border-b border-border/80 p-6 sm:col-span-7 sm:border-r sm:border-b-0">
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className="text-muted-foreground uppercase">
                      Array Partition · Step {step + 1}/8
                    </span>
                    <span className="text-accent font-semibold">{activeAlgo.complexity} Time</span>
                  </div>

                  <div className="mt-6 flex h-40 items-end gap-1.5 rounded-lg border border-border/50 bg-card/60 p-3">
                    {bars.map((b, i) => {
                      const isHighlighted = (i + step) % 4 === 0 || (i + step) % 5 === 0;
                      return (
                        <span
                          key={i}
                          className="flex-1 origin-bottom rounded-t-[3px] transition-all duration-300"
                          style={{
                            height: `${b}%`,
                            background: isHighlighted
                              ? "var(--color-accent)"
                              : "color-mix(in oklab, var(--color-foreground) 20%, transparent)",
                          }}
                        />
                      );
                    })}
                  </div>

                  <div className="mt-4 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
                    <span>Partition [{step * 2}..{step * 2 + 3}]</span>
                    <span>Comparisons: {27 + step * 3} · Swaps: {14 + step}</span>
                  </div>
                </div>

                {/* Right: Graph Traversal / Queue State */}
                <div className="col-span-12 p-6 sm:col-span-5">
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className="text-muted-foreground uppercase">Graph Execution</span>
                    <span className="text-emerald-400 font-semibold">{activeAlgo.space} Space</span>
                  </div>

                  <svg viewBox="0 0 400 120" className="mt-4 w-full" role="img" aria-label="Graph Traversal">
                    {edges.map(([a, b]) => {
                      const na = nodes.find((n) => n.id === a)!;
                      const nb = nodes.find((n) => n.id === b)!;
                      const activeEdge = step % 2 === 0 && (a === "A" || a === "B" || a === "C");
                      return (
                        <line
                          key={a + b}
                          x1={na.x}
                          y1={na.y}
                          x2={nb.x}
                          y2={nb.y}
                          stroke={activeEdge ? "var(--color-accent)" : "var(--color-border-strong)"}
                          strokeWidth="1.5"
                          className={activeEdge ? "dash-flow" : ""}
                        />
                      );
                    })}
                    {nodes.map((n, i) => {
                      const isVisited = i <= (step % 6);
                      return (
                        <g key={n.id} style={{ transformOrigin: `${n.x}px ${n.y}px` }}>
                          <circle
                            cx={n.x}
                            cy={n.y}
                            r="15"
                            fill={isVisited ? "var(--color-accent)" : "var(--color-card)"}
                            stroke={isVisited ? "var(--color-accent)" : "var(--color-border-strong)"}
                          />
                          <text
                            x={n.x}
                            y={n.y + 4}
                            textAnchor="middle"
                            fontSize="10"
                            className="font-mono font-bold"
                            fill={isVisited ? "var(--color-accent-foreground)" : "var(--color-muted-foreground)"}
                          >
                            {n.id}
                          </text>
                        </g>
                      );
                    })}
                  </svg>

                  <pre className="mt-4 rounded-lg border border-border/60 bg-surface/80 p-3 font-mono text-[10px] leading-relaxed text-muted-foreground">
{`queue   → [${nodes[(step + 1) % 6].id}, ${nodes[(step + 2) % 6].id}]
visited → {${nodes.slice(0, (step % 6) + 1).map((n) => n.id).join(", ")}}
depth   → ${Math.floor(step / 2) + 1}`}
                  </pre>
                </div>
              </div>

              {/* Control Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/80 bg-surface/90 px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setStep((s) => (s > 0 ? s - 1 : 7))}
                    aria-label="Previous step"
                    className="rounded-md border border-border bg-card p-1.5 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPlaying((p) => !p)}
                    aria-label={playing ? "Pause" : "Play"}
                    className="rounded-md bg-accent p-1.5 text-accent-foreground shadow-sm transition-opacity hover:opacity-90"
                  >
                    {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep((s) => (s + 1) % 8)}
                    aria-label="Next step"
                    className="rounded-md border border-border bg-card p-1.5 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleRandomize}
                    aria-label="Randomize input"
                    className="ml-1 rounded-md border border-border bg-card p-1.5 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Shuffle className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
                  <span>speed:</span>
                  <input
                    type="range"
                    min="0.5"
                    max="3.0"
                    step="0.1"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="w-24 accent-accent"
                  />
                  <span className="font-semibold text-foreground">{speed.toFixed(1)}×</span>
                </div>
              </div>
            </Window>
          </div>

          {/* Right Column: Pick an Algorithm */}
          <div className="reveal lg:col-span-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-sm font-semibold tracking-wide uppercase text-foreground">
                Pick an algorithm
              </h3>
              <span className="font-mono text-[10px] text-accent font-semibold">22 Algorithms</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              Select an algorithm to watch real-time partitioning, comparisons, and memory pointer shifts.
            </p>

            <ul className="mt-4 grid grid-cols-2 gap-2">
              {algorithms.map((a) => {
                const isSelected = a.name === activeAlgoName;
                return (
                  <li key={a.name}>
                    <button
                      type="button"
                      onClick={() => setActiveAlgoName(a.name)}
                      className={`w-full rounded-lg border px-3 py-2.5 text-left transition-all duration-200 ${
                        isSelected
                          ? "border-accent bg-accent/15 text-accent font-semibold shadow-xs"
                          : "border-border/80 bg-card text-muted-foreground hover:border-border hover:text-foreground"
                      }`}
                    >
                      <div className="truncate text-xs">{a.name}</div>
                      <div className="mt-0.5 font-mono text-[9px] text-muted-foreground">
                        {a.complexity}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-5 rounded-xl border border-border/80 bg-card p-4">
              <div className="flex items-center gap-2 font-mono text-[11px] font-semibold text-accent">
                <Zap className="h-3.5 w-3.5" /> Performance Insight
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Compare algorithm time complexities to see why O(N log N) sorts beat O(N²) quadratic algorithms when dataset N reaches 10,000+.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
