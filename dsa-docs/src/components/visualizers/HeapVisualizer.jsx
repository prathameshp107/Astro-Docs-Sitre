import { useEffect } from 'react';
import { useHeapStore } from '../../store/visualizers/heapStore';

const MIN_HEAP_INSERT_CODE = [
  { line: 1, text: 'heap.push(val) // Insert at bottom-left position' },
  { line: 2, text: 'while i > 0 and heap[i] < heap[parent(i)]:' },
  { line: 3, text: '    swap(heap[i], heap[parent(i)])' },
  { line: 4, text: '    i ← parent(i)' },
];

const EXTRACT_MIN_CODE = [
  { line: 1, text: 'minVal ← heap[0]' },
  { line: 2, text: 'heap[0] ← heap.pop() // Replace root with last' },
  { line: 3, text: 'heapifyDown(0) // Bubble down root' },
  { line: 4, text: 'return minVal' },
];

const MAX_HEAPIFY_CODE = [
  { line: 1, text: 'largest ← argmax(node, left, right)' },
  { line: 2, text: 'if largest != node:' },
  { line: 3, text: '    swap(heap[node], heap[largest])' },
  { line: 4, text: '    heapifyDown(largest)' },
];

const HEAP_SORT_CODE = [
  { line: 1, text: 'buildMaxHeap(array)' },
  { line: 2, text: 'for i = n-1 down to 1:' },
  { line: 3, text: '    swap(heap[0], heap[i])' },
  { line: 4, text: '    heapifyDown(0, heapSize = i)' },
];

const TRACK_TITLES = {
  'min-heap-insert': '1. Min-Heap Insertion (Heapify Up)',
  'min-heap-extract': '2. Extract Minimum (Heapify Down)',
  'max-heapify': '3. Max-Heapify Property',
  'heap-sort': '4. Heap Sort Algorithm',
};

const EXPECTED_OUTPUTS = {
  'min-heap-insert': 'Heap Array: [5, 25, 10, 40, 35, 15] (Min at Root)',
  'min-heap-extract': 'Extracted Min: 5 → Heap Array: [10, 25, 15, 40, 35]',
  'max-heapify': 'Max Heap: [10, 5, 3, 4, 1] (Parent >= Children)',
  'heap-sort': 'Sorted Array: [1, 3, 4, 5, 10] (O(n log n))',
};

// Tree Coordinates for max 7 Heap Nodes
const HEAP_TREE_POSITIONS = [
  { id: 0, x: 250, y: 45 },
  { id: 1, x: 130, y: 115 },
  { id: 2, x: 370, y: 115 },
  { id: 3, x: 70, y: 195 },
  { id: 4, x: 190, y: 195 },
  { id: 5, x: 310, y: 195 },
  { id: 6, x: 430, y: 195 },
];

export default function HeapVisualizer() {
  const {
    track,
    steps,
    currentStep,
    isPlaying,
    speed,
    practiceMode,
    userCode,
    setCurrentStep,
    nextStep,
    prevStep,
    restart,
    togglePlay,
    setSpeed,
    togglePracticeMode,
    setUserCode,
  } = useHeapStore();

  const step = steps[currentStep] || steps[0];

  // Auto-play stepping timer loop with comfortable 2.2s base delay
  useEffect(() => {
    if (!isPlaying) return;
    if (currentStep >= steps.length - 1) {
      useHeapStore.setState({ isPlaying: false });
      return;
    }
    const delay = 2200 / speed;
    const timeout = setTimeout(() => {
      nextStep();
    }, delay);
    return () => clearTimeout(timeout);
  }, [isPlaying, currentStep, speed, steps.length, nextStep]);

  const activeCode =
    track === 'min-heap-insert'
      ? MIN_HEAP_INSERT_CODE
      : track === 'min-heap-extract'
      ? EXTRACT_MIN_CODE
      : track === 'max-heapify'
      ? MAX_HEAPIFY_CODE
      : HEAP_SORT_CODE;

  const trackLabel = TRACK_TITLES[track] || 'Heap Algorithm';
  const expectedOutput = EXPECTED_OUTPUTS[track] || 'Expected Result';

  const heapArray = step.heapArray || [];
  const activeNodeId = step.currNode;
  const swapNodes = step.swapNodes;

  const isComplete = currentStep >= steps.length - 1;

  return (
    <div className="sketch-container font-sketch">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--sketch-border)] pb-4 mb-4">
        <div>
          <div className="text-xs uppercase tracking-wider text-[var(--sketch-accent-orange)] font-mono mb-1 font-bold">
            DATA STRUCTURE PATTERN
          </div>
          <h2 className="text-3xl font-bold font-header flex items-center gap-3">
            Heaps (Priority Queue)
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
      <div className="flex items-center gap-2 text-xs text-[var(--sketch-text-muted)] mb-5">
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
        {/* Dual Visualization Canvas (Binary Tree + Flat Array) */}
        <div className="sketch-canvas-box sketch-border relative flex flex-col justify-between p-4 min-h-[420px]">
          <div className="w-full flex items-center justify-between text-xs font-mono text-[var(--sketch-text-muted)] border-b border-white/10 pb-2 mb-2">
            <span>Binary Heap Tree & Flat Array Memory Inspector</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Active Node</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span> Swapping</span>
              {isComplete && <span className="text-emerald-400 font-bold">✔ Complete</span>}
            </div>
          </div>

          {/* SVG Binary Heap Tree Container */}
          <div className="relative w-full max-w-[500px] h-[240px] mx-auto my-auto">
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {heapArray.map((_, idx) => {
                if (idx === 0) return null;
                const parentIdx = Math.floor((idx - 1) / 2);
                const posNode = HEAP_TREE_POSITIONS[idx];
                const posParent = HEAP_TREE_POSITIONS[parentIdx];
                if (!posNode || !posParent) return null;

                const isSwappingEdge =
                  swapNodes &&
                  ((swapNodes.parent === parentIdx && swapNodes.child === idx) ||
                    (swapNodes.parent === idx && swapNodes.child === parentIdx));

                return (
                  <line
                    key={`edge-${idx}`}
                    x1={posParent.x}
                    y1={posParent.y}
                    x2={posNode.x}
                    y2={posNode.y}
                    stroke={isSwappingEdge ? '#f43f5e' : 'var(--sketch-border)'}
                    strokeWidth={isSwappingEdge ? '3.5' : '2'}
                    strokeDasharray={isSwappingEdge ? 'none' : '4 2'}
                  />
                );
              })}
            </svg>

            {/* Tree Node Circles */}
            {heapArray.map((val, idx) => {
              const pos = HEAP_TREE_POSITIONS[idx];
              if (!pos) return null;

              const isActive = activeNodeId === idx;
              const isSwapping =
                swapNodes && (swapNodes.parent === idx || swapNodes.child === idx);

              return (
                <div
                  key={`node-${idx}`}
                  style={{ left: `${pos.x - 22}px`, top: `${pos.y - 22}px` }}
                  className="absolute flex flex-col items-center"
                >
                  {/* Floating Action Badge */}
                  {isSwapping && (
                    <div className="absolute -top-7 z-20 px-2 py-0.5 rounded-full bg-rose-500 text-white font-mono text-[10px] font-bold shadow-lg shadow-rose-500/50 whitespace-nowrap">
                      🔄 Swap
                    </div>
                  )}

                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center font-header font-bold text-xl border-2 shadow-md transition-all relative ${
                      isSwapping
                        ? '!border-rose-400 !bg-rose-500/30 text-rose-300 ring-4 ring-rose-400/50 shadow-rose-500/50'
                        : isActive
                        ? '!border-amber-400 !bg-amber-500/30 text-amber-300 ring-4 ring-amber-400/40 shadow-amber-500/50'
                        : 'border-[var(--sketch-border)] bg-[var(--sketch-bg-dim)] text-[var(--sketch-text)]'
                    }`}
                  >
                    {val}
                  </div>

                  {/* Node Index Tag */}
                  <span className="text-[10px] font-mono text-[var(--sketch-text-muted)] mt-0.5">[{idx}]</span>
                </div>
              );
            })}
          </div>

          {/* Underlying Flat Array Memory Inspector */}
          <div className="w-full mt-2 pt-3 border-t border-[var(--sketch-border)] flex flex-col items-center gap-1.5">
            <div className="w-full flex items-center justify-between font-mono text-[11px] text-[var(--sketch-text-muted)] px-2">
              <span className="text-amber-400 font-bold">Underlying Heap Array:</span>
              <span className="text-[var(--sketch-text-muted)] opacity-80">parent = ⌊(i-1)/2⌋ | left = 2i+1 | right = 2i+2</span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto sketch-no-scrollbar w-full justify-center py-1">
              {heapArray.map((val, idx) => {
                const isActive = activeNodeId === idx;
                const isSwapping =
                  swapNodes && (swapNodes.parent === idx || swapNodes.child === idx);

                return (
                  <div
                    key={`array-${idx}`}
                    className={`sketch-card min-w-[48px] py-1.5 px-3 flex flex-col items-center border-2 rounded-xl transition-all ${
                      isSwapping
                        ? '!border-rose-400 !bg-rose-500/20 text-rose-300 ring-2 ring-rose-400'
                        : isActive
                        ? '!border-amber-400 !bg-amber-500/20 text-amber-300'
                        : 'border-[var(--sketch-border)] bg-[var(--sketch-bg-dim)] text-[var(--sketch-text)]'
                    }`}
                  >
                    <span className="text-lg font-bold font-header">{val}</span>
                    <span className="text-[9px] font-mono text-[var(--sketch-text-muted)] mt-0.5">[{idx}]</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Completion Banner */}
          {isComplete && (
            <div className="mt-3 w-full flex items-center justify-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 rounded-xl font-mono text-xs text-emerald-300 font-bold">
              ✔ Operation Complete — {step.state?.status || 'Heap Property Satisfied'}
            </div>
          )}
        </div>

        {/* Debug Panel (Code & State) */}
        <div className="sketch-debug-panel">
          {/* Pseudocode Box */}
          <div className="sketch-panel-box sketch-border">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[var(--sketch-border)]">
              <span className="font-header font-bold text-lg">Concept Code</span>
              <button
                onClick={togglePracticeMode}
                className="px-2.5 py-1 text-xs sketch-button"
              >
                {practiceMode ? '👁️ View' : '✏️ Practice'}
              </button>
            </div>

            {practiceMode ? (
              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                rows={8}
                className="w-full bg-transparent p-2 font-mono text-xs text-[var(--sketch-text)] border border-[var(--sketch-border)] rounded focus:outline-none"
              />
            ) : (
              <div className="space-y-0.5">
                {activeCode.map((c) => {
                  const isActive = step.activeLine === c.line;
                  return (
                    <div
                      key={c.line}
                      className={`sketch-code-line gap-3 ${isActive ? 'active' : ''}`}
                    >
                      <span className="w-6 shrink-0 text-[var(--sketch-text-muted)] select-none font-mono">{c.line}</span>
                      <span className="whitespace-pre font-mono flex-1">{c.text}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* State Variable Box */}
          <div className="sketch-panel-box sketch-border">
            <div className="font-header font-bold text-lg mb-2 pb-1 border-b border-[var(--sketch-border)]">
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
          <span className="font-mono text-xs px-2 py-0.5 rounded sketch-border-soft mr-2 text-[var(--sketch-accent-orange)]">
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
            className="sketch-button px-4 py-1.5 font-bold bg-amber-500/20 border-amber-500"
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
              className={`px-2.5 py-0.5 text-xs sketch-button ${speed === s ? 'bg-amber-500/20 border-amber-500 font-bold' : ''}`}
            >
              {s === 0.5 ? '0.5x (Slow)' : `${s}x`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
