import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useArrayStore } from '../../store/visualizers/arrayStore';
import SwapArcConnector from './SwapArcConnector';

const ACCESS_CODE = [
  { line: 1, text: 'index ← targetIndex' },
  { line: 2, text: 'return arr[index]' },
];

const INSERT_CODE = [
  { line: 1, text: 'for i from n - 1 down to index:' },
  { line: 2, text: '    arr[i + 1] ← arr[i]' },
  { line: 3, text: 'arr[index] ← newValue' },
  { line: 4, text: 'n ← n + 1' },
];

const DELETE_CODE = [
  { line: 1, text: 'target ← arr[index]' },
  { line: 2, text: 'for i from index to n - 2:' },
  { line: 3, text: '    arr[i] ← arr[i + 1]' },
  { line: 4, text: 'n ← n - 1' },
];

const SEARCH_CODE = [
  { line: 1, text: 'for i from 0 to n - 1:' },
  { line: 2, text: '    if arr[i] == target:' },
  { line: 3, text: '        return i' },
  { line: 4, text: 'return -1' },
];

const REVERSE_CODE = [
  { line: 1, text: 'left ← 0, right ← n - 1' },
  { line: 2, text: 'while left < right:' },
  { line: 3, text: '    swap(arr[left], arr[right])' },
  { line: 4, text: '    left++, right--' },
];

const PREFIX_SUM_CODE = [
  { line: 1, text: 'prefix[0] ← arr[0]' },
  { line: 2, text: 'for i from 1 to n - 1:' },
  { line: 3, text: '    prefix[i] ← prefix[i - 1] + arr[i]' },
];

const TRACK_TITLES = {
  access: '1. Access by Index',
  insertion: '2. Insertion at Index',
  insert: '2. Insertion at Index',
  deletion: '3. Deletion by Index',
  delete: '3. Deletion by Index',
  'linear-search': '4. Linear Search',
  search: '4. Linear Search',
  'reverse-array': '5. Reverse Array',
  reverse: '5. Reverse Array',
  'prefix-sum': '6. Prefix Sum Array',
};

const EXPECTED_OUTPUTS = {
  access: '58 (Direct O(1) Memory Lookup)',
  insertion: '[10, 20, 99, 30, 40] (99 inserted at index 2)',
  insert: '[10, 20, 99, 30, 40] (99 inserted at index 2)',
  deletion: '[10, 20, 30, 40] (Index 2 deleted)',
  delete: '[10, 20, 30, 40] (Index 2 deleted)',
  'linear-search': 'Index 5 (Target 23 found)',
  search: 'Index 5 (Target 23 found)',
  'reverse-array': '[5, 4, 3, 2, 1]',
  reverse: '[5, 4, 3, 2, 1]',
  'prefix-sum': '[2, 6, 7, 10, 15]',
};

export default function ArrayVisualizer() {
  const containerRef = useRef(null);
  const {
    track,
    array,
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
  } = useArrayStore();

  const step = steps[currentStep] || steps[0];

  // Auto-play stepping timer loop with comfortable 2.2s base delay
  useEffect(() => {
    if (!isPlaying) return;
    if (currentStep >= steps.length - 1) {
      useArrayStore.setState({ isPlaying: false });
      return;
    }
    const delay = 2200 / speed;
    const timeout = setTimeout(() => {
      nextStep();
    }, delay);
    return () => clearTimeout(timeout);
  }, [isPlaying, currentStep, speed, steps.length, nextStep]);

  const activeCode =
    track === 'insertion' || track === 'insert'
      ? INSERT_CODE
      : track === 'deletion' || track === 'delete'
      ? DELETE_CODE
      : track === 'linear-search' || track === 'search'
      ? SEARCH_CODE
      : track === 'reverse-array' || track === 'reverse'
      ? REVERSE_CODE
      : track === 'prefix-sum'
      ? PREFIX_SUM_CODE
      : ACCESS_CODE;

  const trackLabel = TRACK_TITLES[track] || 'Array Operations';
  const expectedOutput = EXPECTED_OUTPUTS[track] || 'Expected Output';

  // Calculate swap pair for connector arc
  let swapFrom = null;
  let swapTo = null;

  if (track === 'reverse' && step.activeLine === 3 && step.left !== null && step.right !== null) {
    swapFrom = step.left;
    swapTo = step.right;
  }

  const hasSwapArc = swapFrom !== null && swapTo !== null && swapFrom !== swapTo;

  return (
    <div className="sketch-container font-sketch">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--sketch-border)] pb-4 mb-4">
        <div>
          <div className="text-xs uppercase tracking-wider text-[var(--sketch-accent-orange)] font-mono mb-1 font-bold">
            DATA STRUCTURE PATTERN
          </div>
          <h2 className="text-3xl font-bold font-header flex items-center gap-3">
            Array Operations
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
        <div className="sketch-canvas-box sketch-border overflow-hidden">
          <div className="absolute top-3 left-4 text-xs font-mono text-[var(--sketch-text-muted)]">
            Step Execution Canvas
          </div>

          {/* Array Cards Container */}
          <div ref={containerRef} className="flex items-start gap-3 md:gap-5 my-4 relative pt-6 pb-16 min-h-[220px] px-4 overflow-x-auto overflow-y-hidden w-full justify-center">
            {hasSwapArc && (
              <SwapArcConnector containerRef={containerRef} fromIndex={swapFrom} toIndex={swapTo} label="swapping" />
            )}

            {(step.array || array).map((val, i) => {
              const isIndex = step.index === i;
              const isLeft = step.left === i;
              const isRight = step.right === i;
              const isBothLeftRight = isLeft && isRight;

              const isHighlighted = isIndex || isLeft || isRight;

              // Action badge triggers
              const isInserting = (track === 'insert' || track === 'insertion') && isIndex && (val === 99 || step.activeLine === 3);
              const isDeleting = (track === 'delete' || track === 'deletion') && isIndex && (step.activeLine === 1 || step.activeLine === 3);
              const isFound = (track === 'search' || track === 'linear-search') && isIndex && (step.isMatch || step.activeLine === 3);
              const isSwapping = i === swapFrom || i === swapTo;

              return (
                <div key={i} className="relative flex flex-col items-center">
                  {/* Floating Action Badge */}
                  <AnimatePresence>
                    {isInserting && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: -26 }} exit={{ opacity: 0 }} className="absolute -top-3 z-20 px-2 py-0.5 rounded-full bg-emerald-500 text-white font-mono text-[10px] font-bold animate-bounce shadow-md">
                        + Inserting
                      </motion.div>
                    )}
                    {isDeleting && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: -26 }} exit={{ opacity: 0 }} className="absolute -top-3 z-20 px-2 py-0.5 rounded-full bg-rose-500 text-white font-mono text-[10px] font-bold animate-bounce shadow-md">
                        - Deleting
                      </motion.div>
                    )}
                    {isFound && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: -26 }} exit={{ opacity: 0 }} className="absolute -top-3 z-20 px-2 py-0.5 rounded-full bg-amber-500 text-white font-mono text-[10px] font-bold animate-bounce shadow-md">
                        🔍 Found!
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div
                    animate={{
                      scale: (isInserting || isDeleting || isFound || isSwapping) ? 1.15 : isHighlighted ? 1.08 : 1,
                      y: (isInserting || isDeleting || isFound || isSwapping) ? -10 : isHighlighted ? -6 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                    className={`sketch-card ${
                      isInserting || isFound
                        ? '!border-emerald-400 !bg-emerald-500/20 shadow-lg ring-2 ring-emerald-400'
                        : isDeleting || isSwapping
                        ? '!border-rose-400 !bg-rose-500/20 shadow-lg ring-2 ring-rose-400'
                        : val === null
                        ? 'border-dashed border-white/20 text-white/30'
                        : isBothLeftRight
                        ? 'border-purple-400 bg-purple-500/20 ring-1 ring-purple-400'
                        : isIndex || isLeft
                        ? 'active-orange'
                        : isRight
                        ? 'active-blue'
                        : ''
                    }`}
                  >
                    {val !== null ? val : '∅'}
                    <div className="sketch-card-index">[{i}]</div>
                  </motion.div>

                  {/* Combined Left + Right Pointer */}
                  <AnimatePresence>
                    {isBothLeftRight && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="sketch-pointer text-purple-300 font-bold bg-purple-500/20 px-2 py-0.5 rounded-md border border-purple-400/40 shadow-sm"
                      >
                        <div className="text-xs">left, right</div>
                        <div className="text-xs leading-none">▲</div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Index Pointer Arrow */}
                  <AnimatePresence>
                    {isIndex && !isLeft && !isRight && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="sketch-pointer sketch-pointer-orange"
                      >
                        <div>index</div>
                        <div className="text-xs leading-none">▲</div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Left Pointer Arrow */}
                  <AnimatePresence>
                    {isLeft && !isBothLeftRight && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="sketch-pointer sketch-pointer-orange"
                      >
                        <div>left</div>
                        <div className="text-xs leading-none">▲</div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Right Pointer Arrow */}
                  <AnimatePresence>
                    {isRight && !isBothLeftRight && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="sketch-pointer sketch-pointer-blue"
                      >
                        <div>right</div>
                        <div className="text-xs leading-none">▲</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
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
