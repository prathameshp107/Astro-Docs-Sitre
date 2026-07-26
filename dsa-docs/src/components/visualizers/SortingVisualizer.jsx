import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSortingStore } from '../../store/visualizers/sortingStore';
import SwapArcConnector from './SwapArcConnector';

const BUBBLE_SORT_CODE = [
  { line: 1, text: 'for i from 0 to n - 1:' },
  { line: 2, text: '    for j from 0 to n - i - 2:' },
  { line: 3, text: '        if arr[j] > arr[j + 1]:' },
  { line: 4, text: '            swap(arr[j], arr[j + 1])' },
];

const SELECTION_SORT_CODE = [
  { line: 1, text: 'for i from 0 to n - 1:' },
  { line: 2, text: '    minIdx ← i' },
  { line: 3, text: '    for j from i + 1 to n - 1:' },
  { line: 4, text: '        if arr[j] < arr[minIdx]:' },
  { line: 5, text: '            minIdx ← j' },
  { line: 6, text: '    swap(arr[i], arr[minIdx])' },
];

const INSERTION_SORT_CODE = [
  { line: 1, text: 'for i from 1 to n - 1:' },
  { line: 2, text: '    key ← arr[i]' },
  { line: 3, text: '    j ← i - 1' },
  { line: 4, text: '    while j >= 0 and arr[j] > key:' },
  { line: 5, text: '        arr[j + 1] ← arr[j]' },
  { line: 6, text: '        j ← j - 1' },
  { line: 7, text: '    arr[j + 1] ← key' },
];

const QUICK_SORT_CODE = [
  { line: 1, text: 'pivot ← arr[high]' },
  { line: 2, text: 'i ← low - 1' },
  { line: 3, text: 'for j from low to high - 1:' },
  { line: 4, text: '    if arr[j] <= pivot:' },
  { line: 5, text: '        i++' },
  { line: 6, text: '        swap(arr[i], arr[j])' },
  { line: 7, text: 'swap(arr[i + 1], arr[high])' },
  { line: 8, text: 'return i + 1' },
];

const MERGE_SORT_CODE = [
  { line: 1, text: 'if low < high:' },
  { line: 2, text: '    mid ← (low + high) / 2' },
  { line: 3, text: '    mergeSort(arr, low, mid)' },
  { line: 4, text: '    mergeSort(arr, mid + 1, high)' },
  { line: 5, text: '    merge(arr, low, mid, high)' },
];

const TRACK_TITLES = {
  'bubble-sort': '1. Bubble Sort',
  'selection-sort': '2. Selection Sort',
  'insertion-sort': '3. Insertion Sort',
  'quick-sort': '4. Quick Sort',
  'merge-sort': '5. Merge Sort',
};

const EXPECTED_OUTPUTS = {
  'bubble-sort': '[10, 14, 14, 29, 37] (Sorted array)',
  'selection-sort': '[11, 12, 22, 25, 64] (Sorted array)',
  'insertion-sort': '[5, 6, 11, 12, 13] (Sorted array)',
  'quick-sort': '[10, 30, 40, 50, 70, 80, 90] (Sorted array)',
  'merge-sort': '[3, 9, 10, 27, 38, 43, 82] (Sorted array)',
};

export default function SortingVisualizer() {
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
  } = useSortingStore();

  const step = steps[currentStep] || steps[0];

  // Auto-play stepping timer loop with comfortable 2.2s base delay
  useEffect(() => {
    if (!isPlaying) return;
    if (currentStep >= steps.length - 1) {
      useSortingStore.setState({ isPlaying: false });
      return;
    }
    const delay = 2200 / speed;
    const timeout = setTimeout(() => {
      nextStep();
    }, delay);
    return () => clearTimeout(timeout);
  }, [isPlaying, currentStep, speed, steps.length, nextStep]);

  const activeCode =
    track === 'bubble-sort'
      ? BUBBLE_SORT_CODE
      : track === 'selection-sort'
      ? SELECTION_SORT_CODE
      : track === 'insertion-sort'
      ? INSERTION_SORT_CODE
      : track === 'quick-sort'
      ? QUICK_SORT_CODE
      : MERGE_SORT_CODE;

  const trackLabel = TRACK_TITLES[track] || 'Sorting Algorithm';
  const expectedOutput = EXPECTED_OUTPUTS[track] || 'Sorted Array';

  // Calculate swap pair for connector arc
  let swapFrom = null;
  let swapTo = null;

  if (track === 'bubble-sort' && step.activeLine === 4 && step.j !== null && step.j !== undefined) {
    swapFrom = step.j;
    swapTo = step.j + 1;
  } else if (track === 'selection-sort' && step.activeLine === 6 && step.i !== null && step.minIdx !== null) {
    swapFrom = step.i;
    swapTo = step.minIdx;
  } else if (track === 'quick-sort' && step.activeLine === 6 && step.i !== null && step.j !== null) {
    swapFrom = step.i;
    swapTo = step.j;
  } else if (track === 'quick-sort' && step.activeLine === 7 && step.i !== null && step.pivot !== null) {
    swapFrom = step.i + 1;
    swapTo = step.pivot;
  }

  const hasSwapArc = swapFrom !== null && swapTo !== null && swapFrom !== swapTo;

  return (
    <div className="sketch-container font-sketch">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--sketch-border)] pb-4 mb-4">
        <div>
          <div className="text-xs uppercase tracking-wider text-[var(--sketch-accent-orange)] font-mono mb-1 font-bold">
            ALGORITHM PATTERN
          </div>
          <h2 className="text-3xl font-bold font-header flex items-center gap-3">
            Sorting Algorithms
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
        <div className="sketch-canvas-box sketch-border">
          <div className="absolute top-3 left-4 text-xs font-mono text-[var(--sketch-text-muted)]">
            Sorting Step Execution Canvas
          </div>

          {/* Array Cards Container with Swap Arc Connector */}
          <div ref={containerRef} className="flex items-center gap-3 md:gap-5 my-8 relative pt-6 pb-24 px-4 overflow-x-auto w-full justify-center">
            {hasSwapArc && (
              <SwapArcConnector containerRef={containerRef} fromIndex={swapFrom} toIndex={swapTo} label="swapping" />
            )}

            {array.map((val, idx) => {
              const isI = step.i === idx;
              const isJ = step.j === idx;
              const isJPlus1 = track === 'bubble-sort' && step.j !== null && step.j + 1 === idx;
              const isMinIdx = step.minIdx === idx;
              const isPivot = step.pivot === idx;
              const isBothIJ = isI && isJ;
              const isBothIMin = isI && isMinIdx;

              const isSwapping = (idx === swapFrom || idx === swapTo);

              const isShifting = track === 'insertion-sort' && step.activeLine === 5 && isJ;

              const isComparing =
                (track === 'bubble-sort' && step.activeLine === 3 && (isJ || isJPlus1)) ||
                (track === 'selection-sort' && step.activeLine === 4 && (isJ || isMinIdx)) ||
                (track === 'insertion-sort' && step.activeLine === 4 && isJ);

              const isHighlighted = isI || isJ || isJPlus1 || isMinIdx || isPivot;

              return (
                <div key={idx} className="relative flex flex-col items-center">
                  <motion.div
                    animate={{
                      scale: isSwapping ? 1.12 : isHighlighted ? 1.08 : 1,
                      y: isSwapping ? -8 : isHighlighted ? -6 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                    className={`sketch-card ${
                      isSwapping
                        ? '!border-rose-400 !bg-rose-500/20 shadow-lg shadow-rose-500/40 ring-2 ring-rose-400'
                        : isShifting || isComparing
                        ? '!border-amber-400 !bg-amber-500/15 shadow-md shadow-amber-500/30'
                        : isPivot
                        ? 'border-rose-500 shadow-rose-500/20'
                        : isBothIMin
                        ? 'border-purple-400 bg-purple-500/20 ring-1 ring-purple-400'
                        : isMinIdx
                        ? 'border-emerald-400 shadow-emerald-400/20'
                        : isBothIJ
                        ? 'border-purple-400 bg-purple-500/15 ring-1 ring-purple-400'
                        : isJ
                        ? 'active-blue'
                        : isJPlus1
                        ? 'border-cyan-400 bg-cyan-500/10'
                        : isI
                        ? 'active-orange'
                        : ''
                    }`}
                  >
                    {val}
                    <div className="sketch-card-index">[{idx}]</div>
                  </motion.div>

                  {/* Pivot Pointer */}
                  <AnimatePresence>
                    {isPivot && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="sketch-pointer text-rose-400 font-bold"
                      >
                        <div>pivot</div>
                        <div className="text-xs leading-none">▲</div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Combined i, minIdx Pointer badge when i === minIdx */}
                  <AnimatePresence>
                    {isBothIMin && !isPivot && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="sketch-pointer text-purple-300 font-bold bg-purple-500/20 px-2 py-0.5 rounded-md border border-purple-400/40 shadow-sm"
                      >
                        <div className="text-xs">i, min</div>
                        <div className="text-xs leading-none">▲</div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Single minIdx Pointer */}
                  <AnimatePresence>
                    {isMinIdx && !isBothIMin && !isPivot && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="sketch-pointer text-emerald-400 font-bold"
                      >
                        <div>min</div>
                        <div className="text-xs leading-none">▲</div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Combined i, j Pointer badge when i === j */}
                  <AnimatePresence>
                    {isBothIJ && !isBothIMin && !isPivot && !isMinIdx && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="sketch-pointer text-purple-300 font-bold bg-purple-500/20 px-2 py-0.5 rounded-md border border-purple-400/40 shadow-sm"
                      >
                        <div className="text-xs">i, j</div>
                        <div className="text-xs leading-none">▲</div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* i Pointer when i !== j */}
                  <AnimatePresence>
                    {isI && !isBothIJ && !isBothIMin && !isPivot && !isMinIdx && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="sketch-pointer sketch-pointer-orange"
                      >
                        <div>i</div>
                        <div className="text-xs leading-none">▲</div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* j Pointer when i !== j */}
                  <AnimatePresence>
                    {isJ && !isBothIJ && !isBothIMin && !isPivot && !isMinIdx && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="sketch-pointer sketch-pointer-blue"
                      >
                        <div>j</div>
                        <div className="text-xs leading-none">▲</div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* j+1 Pointer for Bubble Sort comparison pair */}
                  <AnimatePresence>
                    {isJPlus1 && !isI && !isPivot && !isMinIdx && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="sketch-pointer text-cyan-300 font-bold text-xs"
                      >
                        <div>j+1</div>
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
