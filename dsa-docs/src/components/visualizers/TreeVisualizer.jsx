import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTreeStore } from '../../store/visualizers/treeStore';

const INORDER_CODE = [
  { line: 1, text: 'if node == null: return' },
  { line: 2, text: 'inorder(node.left)' },
  { line: 3, text: 'visit(node.val)' },
  { line: 4, text: 'inorder(node.right)' },
];

const PREORDER_CODE = [
  { line: 1, text: 'if node == null: return' },
  { line: 2, text: 'visit(node.val)' },
  { line: 3, text: 'preorder(node.left)' },
  { line: 4, text: 'preorder(node.right)' },
];

const POSTORDER_CODE = [
  { line: 1, text: 'if node == null: return' },
  { line: 2, text: 'postorder(node.left)' },
  { line: 3, text: 'postorder(node.right)' },
  { line: 4, text: 'visit(node.val)' },
];

const BST_SEARCH_CODE = [
  { line: 1, text: 'if node == null or node.val == target: return node' },
  { line: 2, text: 'if target < node.val: return search(node.left, target)' },
  { line: 3, text: 'return search(node.right, target)' },
];

const TRACK_TITLES = {
  inorder: '1. Inorder Traversal (L → Root → R)',
  preorder: '2. Preorder Traversal (Root → L → R)',
  postorder: '3. Postorder Traversal (L → R → Root)',
  'bst-search': '4. BST Search (Target = 5)',
};

const EXPECTED_OUTPUTS = {
  inorder: '[1, 2, 3, 4, 5, 6, 7] (Sorted Order)',
  preorder: '[4, 2, 1, 3, 6, 5, 7] (Root First)',
  postorder: '[1, 3, 2, 5, 7, 6, 4] (Root Last)',
  'bst-search': 'Found Node 5 at Depth 2 in O(log n)',
};

// Tree Node Positions for SVG Canvas
const TREE_NODES = [
  { id: 4, val: 4, x: 250, y: 45, role: 'ROOT', level: 0 },
  { id: 2, val: 2, x: 130, y: 130, role: null, level: 1 },
  { id: 6, val: 6, x: 370, y: 130, role: null, level: 1 },
  { id: 1, val: 1, x: 70, y: 215, role: 'LEAF', level: 2 },
  { id: 3, val: 3, x: 190, y: 215, role: 'LEAF', level: 2 },
  { id: 5, val: 5, x: 310, y: 215, role: 'LEAF', level: 2 },
  { id: 7, val: 7, x: 430, y: 215, role: 'LEAF', level: 2 },
];

const TREE_EDGES = [
  { from: 4, to: 2, dir: '↙' },
  { from: 4, to: 6, dir: '↘' },
  { from: 2, to: 1, dir: '↙' },
  { from: 2, to: 3, dir: '↘' },
  { from: 6, to: 5, dir: '↙' },
  { from: 6, to: 7, dir: '↘' },
];

export default function TreeVisualizer() {
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
  } = useTreeStore();

  const step = steps[currentStep] || steps[0];

  // Auto-play stepping timer loop with comfortable 2.2s base delay
  useEffect(() => {
    if (!isPlaying) return;
    if (currentStep >= steps.length - 1) {
      useTreeStore.setState({ isPlaying: false });
      return;
    }
    const delay = 2200 / speed;
    const timeout = setTimeout(() => {
      nextStep();
    }, delay);
    return () => clearTimeout(timeout);
  }, [isPlaying, currentStep, speed, steps.length, nextStep]);

  const activeCode =
    track === 'inorder'
      ? INORDER_CODE
      : track === 'preorder'
      ? PREORDER_CODE
      : track === 'postorder'
      ? POSTORDER_CODE
      : BST_SEARCH_CODE;

  const trackLabel = TRACK_TITLES[track] || 'Tree Algorithm';
  const expectedOutput = EXPECTED_OUTPUTS[track] || 'Expected Result';

  const visitedSet = new Set(step.visited || []);
  const activeNodeId = step.activeNode;

  return (
    <div className="sketch-container font-sketch">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--sketch-border)] pb-4 mb-4">
        <div>
          <div className="text-xs uppercase tracking-wider text-[var(--sketch-accent-orange)] font-mono mb-1 font-bold">
            DATA STRUCTURE PATTERN
          </div>
          <h2 className="text-3xl font-bold font-header flex items-center gap-3">
            Trees
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
        {/* Visualization Canvas */}
        <div className="sketch-canvas-box sketch-border relative flex flex-col items-center justify-between p-4 min-h-[380px]">
          <div className="w-full flex items-center justify-between text-xs font-mono text-[var(--sketch-text-muted)] border-b border-white/10 pb-2 mb-2">
            <span>Binary Search Tree Canvas</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Active Node</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> Visited</span>
            </div>
          </div>

          {/* Depth Level Indicators on Left */}
          <div className="absolute left-3 top-16 flex flex-col gap-14 text-[10px] font-mono text-[var(--sketch-text-muted)] opacity-60">
            <div>Level 0</div>
            <div>Level 1</div>
            <div>Level 2</div>
          </div>

          {/* SVG Tree Canvas */}
          <div className="relative w-full max-w-[500px] h-[280px] my-auto">
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {TREE_EDGES.map((edge) => {
                const parentNode = TREE_NODES.find((n) => n.id === edge.from);
                const childNode = TREE_NODES.find((n) => n.id === edge.to);
                if (!parentNode || !childNode) return null;
                const isEdgeActive =
                  (visitedSet.has(edge.from) && visitedSet.has(edge.to)) ||
                  activeNodeId === edge.to ||
                  (activeNodeId === edge.from && (step.state?.action?.includes(String(edge.to)) || step.desc?.includes(String(edge.to))));

                return (
                  <g key={`${edge.from}-${edge.to}`}>
                    <line
                      x1={parentNode.x}
                      y1={parentNode.y + 20}
                      x2={childNode.x}
                      y2={childNode.y - 20}
                      stroke={isEdgeActive ? '#f59e0b' : 'var(--sketch-border)'}
                      strokeWidth={isEdgeActive ? '3' : '2'}
                      strokeDasharray={isEdgeActive ? 'none' : '4 2'}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Tree Node Elements */}
            {TREE_NODES.map((node) => {
              const isActive = activeNodeId === node.id;
              const isVisited = visitedSet.has(node.id);
              const isJustVisited = isVisited && isActive && step.state?.visitedVal === node.val;

              return (
                <div
                  key={node.id}
                  style={{ left: `${node.x - 24}px`, top: `${node.y - 24}px` }}
                  className="absolute flex flex-col items-center"
                >
                  {/* Floating Action Badge */}
                  <AnimatePresence>
                    {isJustVisited && (
                      <motion.div
                        initial={{ opacity: 0, y: -5, scale: 0.8 }}
                        animate={{ opacity: 1, y: -26, scale: 1 }}
                        exit={{ opacity: 0, y: -5, scale: 0.8 }}
                        className="absolute -top-3 z-20 px-2 py-0.5 rounded-full bg-emerald-500 text-white font-mono text-[10px] font-bold shadow-lg shadow-emerald-500/50 whitespace-nowrap animate-bounce"
                      >
                        🎯 Visited!
                      </motion.div>
                    )}
                    {isActive && !isJustVisited && (
                      <motion.div
                        initial={{ opacity: 0, y: -5, scale: 0.8 }}
                        animate={{ opacity: 1, y: -26, scale: 1 }}
                        exit={{ opacity: 0, y: -5, scale: 0.8 }}
                        className="absolute -top-3 z-20 px-2 py-0.5 rounded-full bg-amber-500 text-white font-mono text-[10px] font-bold shadow-md shadow-amber-500/30 whitespace-nowrap"
                      >
                        🔍 Inspecting
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div
                    animate={{
                      scale: isActive ? 1.25 : 1,
                      y: isActive ? -4 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-header font-bold text-xl border-2 shadow-md transition-all relative ${
                      isActive
                        ? '!border-amber-400 !bg-amber-500/30 text-amber-500 ring-4 ring-amber-400/40 shadow-amber-500/50'
                        : isVisited
                        ? '!border-emerald-400 !bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 shadow-emerald-500/30'
                        : 'border-[var(--sketch-border)] bg-[var(--sketch-bg-dim)] text-[var(--sketch-text)]'
                    }`}
                  >
                    {node.val}

                    {/* Role Tag (ROOT / LEAF) */}
                    {node.role === 'ROOT' && (
                      <span className="absolute -top-2.5 bg-amber-500 text-black font-mono text-[9px] font-bold px-1.5 py-0.2 rounded shadow">
                        ROOT
                      </span>
                    )}
                    {node.role === 'LEAF' && (
                      <span className="absolute -bottom-2 bg-white/10 text-[var(--sketch-text-muted)] font-mono text-[8px] px-1 rounded border border-white/10">
                        LEAF
                      </span>
                    )}
                  </motion.div>

                  {/* Active Pointer Arrow */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        className="sketch-pointer sketch-pointer-orange absolute -bottom-7"
                      >
                        <div className="text-[10px]">curr</div>
                        <div className="text-[10px] leading-none">▲</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Visited Sequence Bar */}
          <div className="mt-3 w-full flex items-center gap-3 font-mono text-xs text-[var(--sketch-text-muted)] bg-[var(--sketch-bg-dim)] px-4 py-2 rounded-xl border border-[var(--sketch-border)] justify-between">
            <div className="flex items-center gap-2">
              <span className="text-amber-500 font-bold">Visited Output:</span>
              <div className="flex items-center gap-1.5">
                {step.visited?.map((v, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 font-bold">
                    #{i + 1}: {v}
                  </span>
                ))}
              </div>
            </div>
            <span className="text-[10px] text-[var(--sketch-text-muted)]">Total: {step.visited?.length || 0} / 7 nodes</span>
          </div>
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

          {/* Call Stack & State Variable Box */}
          <div className="sketch-panel-box sketch-border">
            <div className="font-header font-bold text-lg mb-2 pb-1 border-b border-[var(--sketch-border)] flex items-center justify-between">
              <span>Recursion Stack</span>
              <span className="text-xs font-mono text-[var(--sketch-accent-orange)]">
                Depth: {step.stack?.length || 0}
              </span>
            </div>

            {/* Recursion Stack Frame List */}
            <div className="space-y-1 mb-3">
              {step.stack?.length > 0 ? (
                step.stack.map((fn, idx) => (
                  <div
                    key={idx}
                    className={`text-xs font-mono px-2.5 py-1 rounded-md border flex items-center justify-between ${
                      idx === step.stack.length - 1
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                        : 'bg-white/5 text-[var(--sketch-text-muted)] border-white/10'
                    }`}
                  >
                    <span>{fn}</span>
                    <span className="text-[10px] opacity-60">frame #{idx + 1}</span>
                  </div>
                ))
              ) : (
                <div className="text-xs text-[var(--sketch-text-muted)] font-mono italic">Stack is empty</div>
              )}
            </div>

            <div className="font-header font-bold text-sm mb-1 pb-1 border-b border-[var(--sketch-border)]">
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
