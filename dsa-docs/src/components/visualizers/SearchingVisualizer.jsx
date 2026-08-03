import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchingStore } from '../../store/visualizers/searchingStore';

const LINEAR_SEARCH_CODE = [
  { line: 1, text: 'for i from 0 to n - 1:' },
  { line: 2, text: '    if arr[i] == target:' },
  { line: 3, text: '        return i' },
  { line: 4, text: 'return -1' },
];

const BINARY_SEARCH_CODE = [
  { line: 1, text: 'low ← 0, high ← n - 1' },
  { line: 2, text: 'while low <= high:' },
  { line: 3, text: '    mid ← low + (high - low) / 2' },
  { line: 4, text: '    if arr[mid] == target:' },
  { line: 5, text: '        return mid' },
  { line: 6, text: '    else if arr[mid] < target:' },
  { line: 7, text: '        low ← mid + 1' },
  { line: 8, text: '    else:' },
  { line: 9, text: '        high ← mid - 1' },
  { line: 10, text: 'return -1' },
];

const TRACK_TITLES = {
  'linear-search': '1. Linear Search',
  'binary-search': '2. Binary Search',
};

const EXPECTED_OUTPUTS = {
  'linear-search': 'Index 3 (Value 23 found)',
  'binary-search': 'Index 5 (Value 23 found in O(log n))',
};

export default function SearchingVisualizer() {
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
  } = useSearchingStore();

  const step = steps[currentStep] || steps[0];

  // Auto-play stepping timer loop with comfortable 2.2s base delay
  useEffect(() => {
    if (!isPlaying) return;
    if (currentStep >= steps.length - 1) {
      useSearchingStore.setState({ isPlaying: false });
      return;
    }
    const delay = 2200 / speed;
    const timeout = setTimeout(() => {
      nextStep();
    }, delay);
    return () => clearTimeout(timeout);
  }, [isPlaying, currentStep, speed, steps.length, nextStep]);

  const activeCode = track === 'linear-search' ? LINEAR_SEARCH_CODE : BINARY_SEARCH_CODE;
  const trackLabel = TRACK_TITLES[track] || 'Searching Algorithm';
  const expectedOutput = EXPECTED_OUTPUTS[track] || 'Target Index';

  return (
    <div className="sketch-container font-sketch">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--sketch-border)] pb-4 mb-4">
        <div>
          <div className="text-xs uppercase tracking-wider text-[var(--sketch-accent-orange)] font-mono mb-1 font-bold">
            ALGORITHM PATTERN
          </div>
          <h2 className="text-3xl font-bold font-header flex items-center gap-3">
            Searching Algorithms
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
        <div className="sketch-canvas-box sketch-border relative p-6 pt-6 pb-20 min-h-[260px] flex flex-col items-center justify-center overflow-x-hidden overflow-y-visible">
          <div className="absolute top-3 left-4 text-xs font-mono text-[var(--sketch-text-muted)]">
            Step Execution Canvas
          </div>

          {/* Array Cards Container */}
          <div className="flex items-start gap-3 md:gap-4 my-4 relative pt-14 pb-20 px-4 overflow-x-auto overflow-y-visible w-full justify-center">
            {array.map((val, idx) => {
              const isI = step.i === idx;
              const isLow = step.low === idx;
              const isMid = step.mid === idx;
              const isHigh = step.high === idx;

              const isBothLowMid = isLow && isMid;
              const isBothMidHigh = isMid && isHigh;

              const isHighlighted = isI || isLow || isMid || isHigh;

              const isFound =
                (track === 'linear-search' && step.activeLine === 3 && isI) ||
                (track === 'binary-search' && step.activeLine === 5 && isMid);

              const isInspecting =
                (track === 'linear-search' && step.activeLine === 2 && isI) ||
                (track === 'binary-search' && step.activeLine === 4 && isMid);

              const isInSearchRange =
                track === 'binary-search' && step.low !== null && step.high !== null && idx >= step.low && idx <= step.high;

              return (
                <div key={idx} className="relative flex flex-col items-center">
                  {/* Floating Action Badge */}
                  <AnimatePresence>
                    {isFound && (
                      <motion.div
                        initial={{ opacity: 0, y: -5, scale: 0.8 }}
                        animate={{ opacity: 1, y: -26, scale: 1 }}
                        exit={{ opacity: 0, y: -5, scale: 0.8 }}
                        className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-mono text-[10px] font-bold shadow-lg shadow-emerald-500/50 whitespace-nowrap animate-bounce"
                      >
                        🎯 Target Found!
                      </motion.div>
                    )}
                    {isInspecting && !isFound && (
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
                      scale: isFound ? 1.15 : isHighlighted ? 1.08 : 1,
                      y: isFound ? -10 : isHighlighted ? -6 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                    className={`sketch-card ${
                      isFound
                        ? '!border-emerald-400 !bg-emerald-500/20 shadow-lg ring-2 ring-emerald-400'
                        : isMid
                        ? 'border-amber-400 bg-amber-500/15 shadow-md shadow-amber-500/30'
                        : isBothLowMid || isBothMidHigh
                        ? 'border-purple-400 bg-purple-500/20'
                        : isLow
                        ? 'border-emerald-400 shadow-emerald-400/20'
                        : isHigh
                        ? 'border-rose-500 shadow-rose-500/20'
                        : isI
                        ? 'active-orange'
                        : isInSearchRange
                        ? 'border-white/30 bg-white/5'
                        : 'opacity-40'
                    }`}
                  >
                    {val}
                    <div className="sketch-card-index">[{idx}]</div>
                  </motion.div>

                  {/* Combined low, mid Pointer */}
                  <AnimatePresence>
                    {isBothLowMid && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="sketch-pointer text-purple-300 font-bold bg-purple-500/20 px-2 py-0.5 rounded-md border border-purple-400/40 shadow-sm"
                      >
                        <div className="text-xs">low, mid</div>
                        <div className="text-xs leading-none">▲</div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Combined mid, high Pointer */}
                  <AnimatePresence>
                    {isBothMidHigh && !isBothLowMid && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="sketch-pointer text-purple-300 font-bold bg-purple-500/20 px-2 py-0.5 rounded-md border border-purple-400/40 shadow-sm"
                      >
                        <div className="text-xs">mid, high</div>
                        <div className="text-xs leading-none">▲</div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Single low Pointer */}
                  <AnimatePresence>
                    {isLow && !isBothLowMid && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="sketch-pointer text-emerald-400 font-bold"
                      >
                        <div>low</div>
                        <div className="text-xs leading-none">▲</div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Single mid Pointer */}
                  <AnimatePresence>
                    {isMid && !isBothLowMid && !isBothMidHigh && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="sketch-pointer text-amber-400 font-bold"
                      >
                        <div>mid</div>
                        <div className="text-xs leading-none">▲</div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Single high Pointer */}
                  <AnimatePresence>
                    {isHigh && !isBothMidHigh && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="sketch-pointer text-rose-400 font-bold"
                      >
                        <div>high</div>
                        <div className="text-xs leading-none">▲</div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Single i Pointer for Linear Search */}
                  <AnimatePresence>
                    {isI && (
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
