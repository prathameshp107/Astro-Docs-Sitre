import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLinkedListStore } from '../../store/visualizers/linkedListStore';

const SINGLY_TRAVERSAL_CODE = [
  { line: 1, text: 'curr ← head' },
  { line: 2, text: 'while curr != null:' },
  { line: 3, text: '    process(curr.val)' },
  { line: 4, text: '    curr ← curr.next' },
];

const INSERT_HEAD_CODE = [
  { line: 1, text: 'newNode ← Node(val)' },
  { line: 2, text: 'newNode.next ← head' },
  { line: 3, text: 'head ← newNode' },
];

const DELETE_NODE_CODE = [
  { line: 1, text: 'curr ← head, prev ← null' },
  { line: 2, text: 'while curr.val != target: prev ← curr, curr ← curr.next' },
  { line: 3, text: 'prev.next ← curr.next' },
];

const REVERSE_LIST_CODE = [
  { line: 1, text: 'prev ← null, curr ← head' },
  { line: 2, text: 'while curr != null:' },
  { line: 3, text: '    next ← curr.next' },
  { line: 4, text: '    curr.next ← prev' },
  { line: 5, text: '    prev ← curr' },
  { line: 6, text: '    curr ← next' },
  { line: 7, text: 'return prev' },
];

const TRACK_TITLES = {
  'singly-ll': '1. Singly Traversal',
  'insert-head': '2. Insertion at Head',
  'delete-node': '3. Deletion by Value',
  'reverse-ll': '4. Reverse Linked List',
};

const EXPECTED_OUTPUTS = {
  'singly-ll': 'Processed all 4 nodes: 10 → 20 → 30 → 40',
  'insert-head': '5 → 10 → 20 → 30 → NULL (5 is new head)',
  'delete-node': '10 → 30 → 40 → NULL (Node 20 deleted)',
  'reverse-ll': '40 → 30 → 20 → 10 → NULL (Head is now 40)',
};

// Simulated memory hex addresses for realistic struct visualisation
const MEMORY_ADDRESSES = ['0x100', '0x104', '0x108', '0x10C', '0x110'];

export default function LinkedListVisualizer() {
  const {
    track,
    nodes,
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
  } = useLinkedListStore();

  const step = steps[currentStep] || steps[0];

  // Auto-play stepping timer loop with comfortable 2.2s base delay
  useEffect(() => {
    if (!isPlaying) return;
    if (currentStep >= steps.length - 1) {
      useLinkedListStore.setState({ isPlaying: false });
      return;
    }
    const delay = 2200 / speed;
    const timeout = setTimeout(() => {
      nextStep();
    }, delay);
    return () => clearTimeout(timeout);
  }, [isPlaying, currentStep, speed, steps.length, nextStep]);

  const activeCode =
    track === 'singly-ll'
      ? SINGLY_TRAVERSAL_CODE
      : track === 'insert-head'
      ? INSERT_HEAD_CODE
      : track === 'delete-node'
      ? DELETE_NODE_CODE
      : REVERSE_LIST_CODE;

  const trackLabel = TRACK_TITLES[track] || 'Linked List Operation';
  const expectedOutput = EXPECTED_OUTPUTS[track] || 'Resulting List';

  return (
    <div className="sketch-container font-sketch">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--sketch-border)] pb-4 mb-4">
        <div>
          <div className="text-xs uppercase tracking-wider text-[var(--sketch-accent-orange)] font-mono mb-1 font-bold">
            DATA STRUCTURE PATTERN
          </div>
          <h2 className="text-3xl font-bold font-header flex items-center gap-3">
            Linked List
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
        <div className="sketch-canvas-box sketch-border relative flex flex-col justify-between p-4 min-h-[380px]">
          <div className="w-full flex items-center justify-between text-xs font-mono text-[var(--sketch-text-muted)] border-b border-white/10 pb-2 mb-2">
            <span>Dynamic Memory Node Pointer Canvas</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Active Node</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> Prev Pointer</span>
            </div>
          </div>

          {/* Linked List Nodes Container */}
          <div className="flex items-center gap-3 md:gap-5 my-auto relative pt-6 pb-20 px-4 overflow-x-auto sketch-no-scrollbar w-full justify-center">
            {nodes.map((val, idx) => {
              const isHead = step.head === idx || (idx === 0 && step.head === undefined);
              const isTail = idx === nodes.length - 1;
              const isCurr = step.curr === idx;
              const isPrev = step.prev === idx;
              const isNext = step.next === idx;

              const isBothPrevCurr = isPrev && isCurr;
              const isBothCurrNext = isCurr && isNext;

              const isHighlighted = isCurr || isPrev || isNext || isHead;

              const isReversingPointer = track === 'reverse-ll' && step.activeLine === 4 && isCurr;
              const isInsertingHead = track === 'insert-head' && step.activeLine === 2 && idx === 0;
              const isDeleting = track === 'delete-node' && step.activeLine === 3 && val === 20;

              const memAddr = MEMORY_ADDRESSES[idx % MEMORY_ADDRESSES.length];
              const nextMemAddr = idx < nodes.length - 1 ? MEMORY_ADDRESSES[(idx + 1) % MEMORY_ADDRESSES.length] : 'NULL';

              return (
                <div key={idx} className="flex items-center gap-3 md:gap-5">
                  <div className="relative flex flex-col items-center">
                    {/* Top Node Header Bar (Memory Address + HEAD/TAIL Badge) */}
                    <div className="w-full flex items-center justify-between text-[10px] font-mono mb-1.5 px-0.5 min-h-[18px]">
                      <span className="text-white/40 tracking-wider font-bold">{memAddr}</span>
                      {isHead && (
                        <span className="bg-amber-500 text-black font-bold text-[9px] px-1.5 py-0.2 rounded shadow select-none">
                          HEAD
                        </span>
                      )}
                      {isTail && !isHead && (
                        <span className="bg-white/20 text-white font-bold text-[9px] px-1.5 py-0.2 rounded border border-white/20 shadow select-none">
                          TAIL
                        </span>
                      )}
                    </div>

                    {/* Floating Action Badge */}
                    <AnimatePresence>
                      {isReversingPointer && (
                        <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: -26 }} exit={{ opacity: 0 }} className="absolute -top-6 z-20 px-2 py-0.5 rounded-full bg-rose-500 text-white font-mono text-[10px] font-bold animate-bounce shadow-md whitespace-nowrap">
                          ⇄ Reversing Link
                        </motion.div>
                      )}
                      {isInsertingHead && (
                        <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: -26 }} exit={{ opacity: 0 }} className="absolute -top-6 z-20 px-2 py-0.5 rounded-full bg-emerald-500 text-white font-mono text-[10px] font-bold animate-bounce shadow-md whitespace-nowrap">
                          + New Head
                        </motion.div>
                      )}
                      {isDeleting && (
                        <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: -26 }} exit={{ opacity: 0 }} className="absolute -top-6 z-20 px-2 py-0.5 rounded-full bg-rose-500 text-white font-mono text-[10px] font-bold animate-bounce shadow-md whitespace-nowrap">
                          ✂️ Unlinking Node
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Clean Node Card (without internal next field) */}
                    <motion.div
                      animate={{
                        scale: (isReversingPointer || isInsertingHead || isDeleting) ? 1.15 : isHighlighted ? 1.08 : 1,
                        y: (isReversingPointer || isInsertingHead || isDeleting) ? -10 : isHighlighted ? -6 : 0,
                      }}
                      transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                      className={`sketch-card ${
                        isReversingPointer || isDeleting
                          ? '!border-rose-400 !bg-rose-500/20 shadow-lg ring-2 ring-rose-400'
                          : isBothPrevCurr || isBothCurrNext
                          ? 'border-purple-400 bg-purple-500/20 ring-1 ring-purple-400'
                          : isCurr
                          ? 'active-orange'
                          : isPrev
                          ? 'border-emerald-400 shadow-emerald-400/20'
                          : isNext
                          ? 'border-cyan-400 shadow-cyan-400/20'
                          : ''
                      }`}
                    >
                      {val}
                      <div className="sketch-card-index">[{idx}]</div>
                    </motion.div>

                    {/* Combined prev, curr Pointer */}
                    <AnimatePresence>
                      {isBothPrevCurr && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="sketch-pointer text-purple-300 font-bold bg-purple-500/20 px-2 py-0.5 rounded-md border border-purple-400/40 shadow-sm">
                          <div className="text-xs">prev, curr</div>
                          <div className="text-xs leading-none">▲</div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Combined curr, next Pointer */}
                    <AnimatePresence>
                      {isBothCurrNext && !isBothPrevCurr && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="sketch-pointer text-purple-300 font-bold bg-purple-500/20 px-2 py-0.5 rounded-md border border-purple-400/40 shadow-sm">
                          <div className="text-xs">curr, next</div>
                          <div className="text-xs leading-none">▲</div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Single prev Pointer */}
                    <AnimatePresence>
                      {isPrev && !isBothPrevCurr && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="sketch-pointer text-emerald-400 font-bold">
                          <div>prev</div>
                          <div className="text-xs leading-none">▲</div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Single curr Pointer */}
                    <AnimatePresence>
                      {isCurr && !isBothPrevCurr && !isBothCurrNext && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="sketch-pointer sketch-pointer-orange">
                          <div>curr</div>
                          <div className="text-xs leading-none">▲</div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Single next Pointer */}
                    <AnimatePresence>
                      {isNext && !isBothCurrNext && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="sketch-pointer text-cyan-400 font-bold">
                          <div>next</div>
                          <div className="text-xs leading-none">▲</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Next Link Arrow Connector */}
                  <div className="flex items-center gap-1 text-[var(--sketch-accent-orange)] font-bold text-xl select-none">
                    <span>{isReversingPointer ? '←' : '→'}</span>
                  </div>
                </div>
              );
            })}

            {/* NULL End Badge */}
            <div className="flex flex-col items-center">
              <div className="text-[10px] font-mono text-white/40 mb-1 tracking-wider opacity-0">0x000</div>
              <div className="flex items-center px-3 py-3 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-300 font-mono text-xs font-bold shadow-sm">
                NULL
              </div>
            </div>
          </div>

          {/* List Status Summary Bar */}
          <div className="mt-3 w-full flex items-center justify-between font-mono text-xs text-[var(--sketch-text-muted)] bg-black/30 px-4 py-2 rounded-xl border border-white/10">
            <span className="text-amber-400 font-bold">Node Sequence: [{nodes.join(' → ')}]</span>
            <span>Length: {nodes.length} nodes</span>
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

          {/* State Variable Box */}
          <div className="sketch-panel-box sketch-border">
            <div className="font-header font-bold text-lg mb-2 pb-1 border-b border-[var(--sketch-border)]">
              State
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
