import { useEffect } from 'react';
import { useGraphStore } from '../../store/visualizers/graphStore';

const BFS_CODE = [
  { line: 1, text: 'queue.enqueue(start), visited.add(start)' },
  { line: 2, text: 'while queue is not empty:' },
  { line: 3, text: '    node ← queue.dequeue()' },
  { line: 4, text: '    process(node)' },
  { line: 5, text: '    for neighbor in adj[node]:' },
  { line: 6, text: '        if neighbor not in visited:' },
  { line: 7, text: '            visited.add(neighbor), queue.enqueue(neighbor)' },
];

const DFS_CODE = [
  { line: 1, text: 'if node in visited: return' },
  { line: 2, text: 'visited.add(node)' },
  { line: 3, text: 'process(node)' },
  { line: 4, text: 'for neighbor in adj[node]:' },
  { line: 5, text: '    dfs(neighbor)' },
];

const CYCLE_CODE = [
  { line: 1, text: 'visited.add(node)' },
  { line: 2, text: 'for neighbor in adj[node]:' },
  { line: 3, text: '    if neighbor in visited and neighbor != parent:' },
  { line: 4, text: '        return true // Cycle detected! ⚠️' },
  { line: 5, text: 'return false' },
];

const DIJKSTRA_CODE = [
  { line: 1, text: 'dist[start] ← 0, dist[others] ← ∞' },
  { line: 2, text: 'while unvisited nodes exist:' },
  { line: 3, text: '    u ← min_dist_unvisited_node()' },
  { line: 4, text: '    for (v, weight) in adj[u]:' },
  { line: 5, text: '        if dist[u] + weight < dist[v]:' },
  { line: 6, text: '            dist[v] ← dist[u] + weight' },
];

const TRACK_TITLES = {
  bfs: '1. Breadth-First Search (BFS)',
  dfs: '2. Depth-First Search (DFS)',
  'cycle-detection': '3. Cycle Detection in Undirected Graph',
  dijkstra: '4. Dijkstra Shortest Path Algorithm',
};

const EXPECTED_OUTPUTS = {
  bfs: '[0, 1, 2, 3, 4, 5] (Level-by-level Queue Order)',
  dfs: '[0, 1, 3, 5, 4, 2] (Deep-first Stack Order)',
  'cycle-detection': 'Cycle Found: 1 - 3 - 4 - 1 ⚠️',
  dijkstra: 'Shortest Distances from 0: [0, 4, 2, 7, 5, 8]',
};

// BFS Tree Levels per Node (from source node 0)
const NODE_LEVELS = {
  0: 'L0 (Start)',
  1: 'L1',
  2: 'L1',
  3: 'L2',
  4: 'L2',
  5: 'L3',
};

// 6 Graph Node Coordinates for SVG Canvas
const GRAPH_NODES = [
  { id: 0, label: '0', x: 250, y: 40 },
  { id: 1, label: '1', x: 120, y: 120 },
  { id: 2, label: '2', x: 380, y: 120 },
  { id: 3, label: '3', x: 120, y: 220 },
  { id: 4, label: '4', x: 380, y: 220 },
  { id: 5, label: '5', x: 250, y: 280 },
];

// Undirected Graph Edges
const GRAPH_EDGES = [
  { from: 0, to: 1, weight: 4 },
  { from: 0, to: 2, weight: 2 },
  { from: 1, to: 3, weight: 3 },
  { from: 1, to: 4, weight: 1 },
  { from: 2, to: 4, weight: 3 },
  { from: 3, to: 5, weight: 2 },
  { from: 4, to: 5, weight: 3 },
];

// Adjacency List for Display
const ADJACENCY_LIST = {
  0: [1, 2],
  1: [0, 3, 4],
  2: [0, 4],
  3: [1, 5],
  4: [1, 2, 5],
  5: [3, 4],
};

export default function GraphVisualizer() {
  const {
    track,
    steps,
    currentStep,
    isPlaying,
    speed,
    setCurrentStep,
    nextStep,
    prevStep,
    restart,
    togglePlay,
    setSpeed,
  } = useGraphStore();

  const step = steps[currentStep] || steps[0];
  const isCompleted = currentStep === steps.length - 1;

  // Auto-play stepping timer loop with comfortable 2.2s base delay
  useEffect(() => {
    if (!isPlaying) return;
    if (currentStep >= steps.length - 1) {
      useGraphStore.setState({ isPlaying: false });
      return;
    }
    const delay = 2200 / speed;
    const timeout = setTimeout(() => {
      nextStep();
    }, delay);
    return () => clearTimeout(timeout);
  }, [isPlaying, currentStep, speed, steps.length, nextStep]);

  const activeCode =
    track === 'bfs'
      ? BFS_CODE
      : track === 'dfs'
      ? DFS_CODE
      : track === 'cycle-detection'
      ? CYCLE_CODE
      : DIJKSTRA_CODE;

  const trackLabel = TRACK_TITLES[track] || 'Graph Algorithm';
  const expectedOutput = EXPECTED_OUTPUTS[track] || 'Expected Output';

  const visitedSet = new Set(step.visited || []);
  const inQueueSet = new Set(step.queue || []);
  const activeNodeId = step.currNode;
  const activeEdge = step.activeEdge;

  // Extract currently inspected neighbor from edge
  const activeNeighbor = activeEdge
    ? activeEdge.from === activeNodeId
      ? activeEdge.to
      : activeEdge.from
    : null;

  return (
    <div className="sketch-container font-sketch space-y-5">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--sketch-border)] pb-4">
        <div>
          <div className="text-xs uppercase tracking-wider text-[var(--sketch-accent-orange)] font-mono mb-1 font-bold">
            ALGORITHM PATTERN
          </div>
          <h2 className="text-3xl font-bold font-header flex items-center gap-3">
            Graphs
            <span className="text-sm px-3 py-0.5 rounded-full sketch-border-soft text-[var(--sketch-accent-orange)] font-sketch">
              {trackLabel}
            </span>
          </h2>
        </div>

        {/* Expected Output Card */}
        <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-xl font-mono text-xs text-amber-300 shadow-sm">
          <span className="text-amber-400 font-bold font-header text-sm">🎯 Expected:</span>
          <span>{expectedOutput}</span>
        </div>
      </div>

      {/* Progress Milestone Dots */}
      <div className="flex items-center gap-2 text-xs text-[var(--sketch-text-muted)]">
        <span>Milestones:</span>
        <div className="sketch-milestones">
          {steps.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrentStep(i)}
              className={`sketch-milestone-dot cursor-pointer ${i <= currentStep ? 'active' : ''}`}
              title={`Step ${i + 1}`}
            />
          ))}
        </div>
        <span className="font-mono ml-2">step {currentStep + 1} / {steps.length}</span>
      </div>

      {/* Main Canvas + Debugger Row */}
      <div className="sketch-canvas-row">
        {/* Visualization Canvas */}
        <div className="sketch-canvas-box sketch-border relative flex flex-col justify-between p-4 min-h-[420px]">
          {/* Renamed Canvas Header */}
          <div className="w-full flex items-center justify-between text-xs font-mono text-[var(--sketch-text-muted)] border-b border-white/10 pb-2 mb-2">
            <span className="font-bold text-amber-400">Graph Traversal Canvas</span>
            {/* Color Legend (Gray: Unvisited, Blue: Queue, Yellow: Active, Green: Visited) */}
            <div className="flex items-center gap-3 text-[10px]">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-slate-500"></span> Unvisited</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span> In Queue</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Active</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> Visited</span>
            </div>
          </div>

          {/* SVG Graph Canvas */}
          <div className="relative w-full max-w-[500px] h-[310px] my-auto">
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {GRAPH_EDGES.map((edge) => {
                const nodeA = GRAPH_NODES.find((n) => n.id === edge.from);
                const nodeB = GRAPH_NODES.find((n) => n.id === edge.to);
                if (!nodeA || !nodeB) return null;

                const isEdgeHighlighted =
                  activeEdge &&
                  ((activeEdge.from === edge.from && activeEdge.to === edge.to) ||
                    (activeEdge.from === edge.to && activeEdge.to === edge.from));

                const isVisitedEdge = visitedSet.has(edge.from) && visitedSet.has(edge.to);

                return (
                  <g key={`${edge.from}-${edge.to}`}>
                    <line
                      x1={nodeA.x}
                      y1={nodeA.y}
                      x2={nodeB.x}
                      y2={nodeB.y}
                      stroke={isEdgeHighlighted ? '#f43f5e' : isVisitedEdge ? '#f59e0b' : 'var(--sketch-border)'}
                      strokeWidth={isEdgeHighlighted ? '4' : isVisitedEdge ? '2.5' : '1.5'}
                      strokeDasharray={isEdgeHighlighted ? 'none' : isVisitedEdge ? 'none' : '4 2'}
                    />
                    {/* Edge Weight label for Dijkstra */}
                    {track === 'dijkstra' && (
                      <text
                        x={(nodeA.x + nodeB.x) / 2}
                        y={(nodeA.y + nodeB.y) / 2 - 4}
                        fill="#f59e0b"
                        fontSize="11"
                        fontFamily="monospace"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        w={edge.weight}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Graph Node Circles */}
            {GRAPH_NODES.map((node) => {
              const isActive = activeNodeId === node.id;
              const isVisited = visitedSet.has(node.id);
              const isInQueue = inQueueSet.has(node.id);
              const isCycleFound = track === 'cycle-detection' && step.state?.status?.includes('CYCLE');

              return (
                <div
                  key={node.id}
                  style={{ left: `${node.x - 22}px`, top: `${node.y - 22}px` }}
                  className="absolute flex flex-col items-center"
                >
                  {/* Floating Action Badge */}
                  {isCompleted && isVisited && node.id === activeNodeId && (
                    <div className="absolute -top-6 z-20 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-mono text-[10px] font-bold shadow-lg shadow-emerald-500/50 whitespace-nowrap">
                      ✔ Visited Complete!
                    </div>
                  )}
                  {!isCompleted && isCycleFound && isActive && (
                    <div className="absolute -top-6 z-20 px-2.5 py-0.5 rounded-full bg-rose-500 text-white font-mono text-[10px] font-bold shadow-lg shadow-rose-500/50 whitespace-nowrap">
                      ⚠️ Cycle Found!
                    </div>
                  )}
                  {!isCompleted && isActive && activeNeighbor !== null && (
                    <div className="absolute -top-6 z-20 px-2.5 py-0.5 rounded-full bg-amber-500 text-black font-mono text-[10px] font-bold shadow-md shadow-amber-500/30 whitespace-nowrap">
                      🔍 Node {node.id} → Inspecting {activeNeighbor}
                    </div>
                  )}
                  {!isCompleted && isActive && activeNeighbor === null && (
                    <div className="absolute -top-6 z-20 px-2 py-0.5 rounded-full bg-amber-500 text-black font-mono text-[10px] font-bold shadow-md shadow-amber-500/30 whitespace-nowrap">
                      🔍 Active Node {node.id}
                    </div>
                  )}
                  {!isCompleted && !isActive && isInQueue && (
                    <div className="absolute -top-6 z-20 px-2 py-0.5 rounded-full bg-cyan-500 text-white font-mono text-[10px] font-bold shadow-md shadow-cyan-500/30 whitespace-nowrap">
                      📥 In Queue
                    </div>
                  )}

                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center font-header font-bold text-xl border-2 shadow-md transition-all relative ${
                      isCycleFound && isActive
                        ? '!border-rose-400 !bg-rose-500/30 text-rose-400 ring-4 ring-rose-400/50 shadow-rose-500/50'
                        : isCompleted && isVisited
                        ? '!border-emerald-400 !bg-emerald-500/30 text-emerald-300 ring-2 ring-emerald-400/50 shadow-emerald-500/40'
                        : isActive
                        ? '!border-amber-400 !bg-amber-500/30 text-amber-300 ring-4 ring-amber-400/50 shadow-amber-500/50'
                        : isInQueue
                        ? '!border-cyan-400 !bg-cyan-500/20 text-cyan-300 ring-2 ring-cyan-400/40 shadow-cyan-500/30'
                        : isVisited
                        ? '!border-emerald-400/80 !bg-emerald-500/20 text-emerald-300 shadow-emerald-500/30'
                        : 'border-[var(--sketch-border)] bg-[var(--sketch-bg-dim)] text-slate-400'
                    }`}
                  >
                    {node.label}
                  </div>

                  {/* Level Tag underneath Node */}
                  <span className="text-[9px] font-mono font-bold text-amber-400/90 mt-0.5">
                    {NODE_LEVELS[node.id]}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Completion Summary Banner (Shows on Last Step) */}
          {isCompleted && (
            <div className="mt-3 p-4 bg-emerald-950/40 border-2 border-emerald-400/60 rounded-2xl shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-emerald-500/30 pb-2">
                <div className="flex items-center gap-2 text-emerald-300 font-header font-extrabold text-base md:text-lg">
                  <span>🎉</span>
                  <span>{trackLabel} Traversal Complete!</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-mono text-xs font-bold">
                  ✔ SUCCESS
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">VISITED NODES</span>
                  <span className="text-emerald-300 font-extrabold text-sm">{visitedSet.size} / 6 (100%)</span>
                </div>
                <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">QUEUE STATUS</span>
                  <span className="text-emerald-300 font-extrabold text-sm">✓ Exhausted</span>
                </div>
                <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">TIME COMPLEXITY</span>
                  <span className="text-amber-300 font-extrabold text-sm">O(V + E)</span>
                </div>
                <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">SPACE COMPLEXITY</span>
                  <span className="text-amber-300 font-extrabold text-sm">O(V)</span>
                </div>
              </div>
            </div>
          )}

          {/* Visited Sequence Bar */}
          {!isCompleted && (
            <div className="mt-3 w-full flex items-center justify-between font-mono text-xs text-[var(--sketch-text-muted)] bg-[var(--sketch-bg-dim)] px-4 py-2 rounded-xl border border-[var(--sketch-border)]">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">Traversal Order:</span>
                <div className="flex items-center gap-1.5">
                  {step.visited?.map((v, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                      #{i + 1}: Node {v}
                    </span>
                  ))}
                </div>
              </div>
              <span className="text-[10px] text-[var(--sketch-text-muted)] font-mono">
                Visited: {step.visited?.length || 0} / 6
              </span>
            </div>
          )}
        </div>

        {/* Debug Panel (Code & State) */}
        <div className="sketch-debug-panel">
          {/* Pseudocode Box */}
          <div className="sketch-panel-box sketch-border">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[var(--sketch-border)]">
              <span className="font-header font-bold text-lg">Concept Code</span>
            </div>

            <div className="space-y-0.5">
                {activeCode.map((c) => {
                  const isActive = step.activeLine === c.line;
                  return (
                    <div
                      key={c.line}
                      className={`sketch-code-line gap-3 ${isActive ? 'active !border-amber-400/60 !bg-amber-500/10 font-bold' : ''}`}
                    >
                      <span className="w-6 shrink-0 text-[var(--sketch-text-muted)] select-none font-mono">{c.line}</span>
                      <span className="whitespace-pre font-mono flex-1">{c.text}</span>
                    </div>
                  );
                })}
              </div>
          </div>

          {/* Adjacency List & Queue/Stack Inspector */}
          <div className="sketch-panel-box sketch-border space-y-3">
            <div className="font-header font-bold text-lg pb-1 border-b border-[var(--sketch-border)] flex items-center justify-between">
              <span>{track === 'bfs' ? 'BFS Queue (FIFO)' : track === 'dijkstra' ? 'Distance Table' : 'DFS Stack (LIFO)'}</span>
            </div>

            {/* Queue Data Structure Pill List for BFS */}
            {track === 'bfs' && (
              <div className="flex items-center gap-1.5 bg-black/30 p-2.5 rounded-xl border border-white/10">
                <span className="text-[10px] font-mono text-cyan-400 font-bold">FRONT ↑</span>
                {step.queue?.length > 0 ? (
                  step.queue.map((node, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 font-mono text-xs border border-cyan-500/40 font-extrabold shadow-sm">
                      [{node}]
                    </span>
                  ))
                ) : (
                  <span className="text-xs font-mono text-emerald-400 font-bold italic">
                    ✓ Queue Exhausted (All Vertices Processed)
                  </span>
                )}
                <span className="text-[10px] font-mono text-amber-400 font-bold ml-auto">REAR ↑</span>
              </div>
            )}

            {/* DFS Stack Frame List */}
            {track === 'dfs' && (
              <div className="flex flex-wrap gap-1.5">
                {step.stack?.map((fn, idx) => (
                  <span key={idx} className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                    {fn}
                  </span>
                ))}
              </div>
            )}

            {/* Dijkstra Distance Table */}
            {track === 'dijkstra' && (
              <div className="grid grid-cols-3 gap-1.5">
                {Object.entries(step.distances || {}).map(([node, dist]) => (
                  <div key={node} className="bg-white/5 p-1.5 rounded-lg text-center border border-white/10 font-mono text-xs">
                    <div className="text-[10px] text-[var(--sketch-text-muted)]">Node {node}</div>
                    <div className="font-bold text-amber-300">{dist}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Adjacency List Inspector */}
            <div className="font-header font-bold text-sm pt-2 pb-1 border-t border-[var(--sketch-border)] flex items-center justify-between">
              <span>Adjacency List</span>
              <span className="text-[10px] font-mono text-white/40">adj[node]</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {Object.entries(ADJACENCY_LIST).map(([node, neighbors]) => {
                const isCurrentRow = Number(node) === activeNodeId;
                return (
                  <div
                    key={node}
                    className={`font-mono text-[10px] px-2.5 py-1 rounded-lg border transition-all ${
                      isCurrentRow
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 font-bold ring-1 ring-amber-400/40'
                        : 'bg-white/5 text-[var(--sketch-text-muted)] border-white/10'
                    }`}
                  >
                    <span className="text-white font-bold">{node}:</span> [{neighbors.join(', ')}]
                  </div>
                );
              })}
            </div>

            {/* State Variables Inspector */}
            <div className="font-header font-bold text-sm pt-2 pb-1 border-t border-[var(--sketch-border)]">
              State Variables
            </div>
            <div className="space-y-1">
              {Object.entries(step.state || {}).map(([key, value]) => (
                <div key={key} className="sketch-state-var">
                  <span className="text-[var(--sketch-text-muted)]">{key}</span>
                  <span className="font-bold text-[var(--sketch-accent-orange)]">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Explanation Banner */}
      <div className="sketch-explanation-bar sketch-border">
        <span className="text-xl select-none">✏️</span>
        <div className="flex-1 text-sm md:text-base leading-relaxed">
          <span className="font-mono text-xs px-2 py-0.5 rounded sketch-border-soft mr-2 text-[var(--sketch-accent-orange)] font-bold">
            line {step.activeLine}
          </span>
          {step.desc}
        </div>
      </div>

      {/* Bottom Playback Controls Bar */}
      <div className="sketch-playback-bar sketch-border">
        <div className="flex items-center gap-2">
          <button
            onClick={restart}
            className="sketch-button px-3 py-1.5"
            title="Restart"
          >
            ↺
          </button>
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="sketch-button px-3 py-1.5"
            title="Previous step"
          >
            |◀
          </button>
          <button
            onClick={togglePlay}
            className="sketch-button px-4 py-1.5 font-bold bg-amber-500/20 border-amber-500 text-amber-300"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button
            onClick={nextStep}
            disabled={currentStep >= steps.length - 1}
            className="sketch-button px-3 py-1.5"
            title="Next step"
          >
            ▶|
          </button>
        </div>

        {/* Scrubber Timeline */}
        <div className="flex-1 flex items-center gap-3">
          <input
            type="range"
            min="0"
            max={steps.length - 1}
            value={currentStep}
            onChange={(e) => setCurrentStep(Number(e.target.value))}
            className="sketch-scrubber"
          />
        </div>

        {/* Speed Multiplier Pills */}
        <div className="flex items-center gap-1">
          {[0.5, 1, 1.5, 2].map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`px-2.5 py-0.5 text-xs sketch-button ${speed === s ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold' : ''}`}
            >
              {s === 0.5 ? '0.5x (Slow)' : `${s}x`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
