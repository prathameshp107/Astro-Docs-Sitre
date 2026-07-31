import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSlidingWindowStore } from '../../store/visualizers/slidingWindowStore';

const INTRO_CODE = [
  { line: 1, text: 'windowSum ← initial sum arr[0..K-1]' },
  { line: 2, text: 'maxSum ← windowSum, L ← 0' },
  { line: 3, text: 'for R from K to N - 1:' },
  { line: 4, text: '    windowSum += arr[R] - arr[L]' },
  { line: 5, text: '    L++, maxSum ← max(maxSum, windowSum)' },
  { line: 6, text: 'return maxSum' },
];

const MAX_SUM_CODE = [
  { line: 1, text: 'windowSum ← 0, maxSum ← 0, L ← 0' },
  { line: 2, text: 'for R from 0 to N - 1:' },
  { line: 3, text: '    windowSum += arr[R]' },
  { line: 4, text: '    if R >= K - 1:' },
  { line: 5, text: '        maxSum ← max(maxSum, windowSum)' },
  { line: 6, text: '        windowSum -= arr[L], L++' },
];

const LONGEST_SUBSTRING_CODE = [
  { line: 1, text: 'L ← 0, maxLen ← 0, seenSet ← {}' },
  { line: 2, text: 'for R from 0 to N - 1:' },
  { line: 3, text: '    while s[R] in seenSet:' },
  { line: 4, text: '        seenSet.remove(s[L]), L++' },
  { line: 5, text: '    seenSet.add(s[R])' },
  { line: 6, text: '    maxLen ← max(maxLen, R - L + 1)' },
];

const MIN_SUBARRAY_SUM_CODE = [
  { line: 1, text: 'L ← 0, sum ← 0, minLen ← ∞' },
  { line: 2, text: 'for R from 0 to N - 1:' },
  { line: 3, text: '    sum += arr[R]' },
  { line: 4, text: '    while sum >= target:' },
  { line: 5, text: '        minLen ← min(minLen, R - L + 1)' },
  { line: 6, text: '        sum -= arr[L], L++' },
];

const FRUIT_BASKETS_CODE = [
  { line: 1, text: 'L ← 0, maxLen ← 0, map ← {}' },
  { line: 2, text: 'for R from 0 to N - 1:' },
  { line: 3, text: '    map[arr[R]]++' },
  { line: 4, text: '    while size(map) > 2:' },
  { line: 5, text: '        map[arr[L]]--, if 0 delete, L++' },
  { line: 6, text: '    maxLen ← max(maxLen, R - L + 1)' },
];

const CODE_MAP = {
  'intro': INTRO_CODE,
  'max-sum-subarray': MAX_SUM_CODE,
  'longest-substring': LONGEST_SUBSTRING_CODE,
  'min-subarray-sum': MIN_SUBARRAY_SUM_CODE,
  'fruit-into-baskets': FRUIT_BASKETS_CODE,
};

const TRACK_TITLES = {
  'intro': '1. Fixed Window Concept (K=3)',
  'max-sum-subarray': '2. Max Sum Subarray of Size K',
  'longest-substring': '3. Longest Substring Without Repeats',
  'min-subarray-sum': '4. Minimum Size Subarray Sum',
  'fruit-into-baskets': '5. Fruit Into Baskets (Max 2 Types)',
};

const EXPECTED_OUTPUTS = {
  'intro': 'Max Sum = 9 (sub: [5, 1, 3])',
  'max-sum-subarray': 'Max Sum = 9',
  'longest-substring': 'Max Length = 3 ("abc")',
  'min-subarray-sum': 'Min Length = 2 ([4, 3])',
  'fruit-into-baskets': 'Max Fruits = 4 ([1, 2, 1, 2])',
};

export default function SlidingWindowVisualizer() {
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
  } = useSlidingWindowStore();

  const containerRef = useRef(null);
  const step = steps[currentStep] || steps[0];
  const activeCode = CODE_MAP[track] || INTRO_CODE;

  // Autoplay timer
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        nextStep();
      }, 1500 / speed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, speed, nextStep]);

  const trackLabel = TRACK_TITLES[track] || 'Sliding Window Pattern';
  const expectedOutput = EXPECTED_OUTPUTS[track] || 'Optimal Window';

  return (
    <div className="sketch-container font-sketch">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--sketch-border)] pb-4 mb-4">
        <div>
          <div className="text-xs uppercase tracking-wider text-[var(--sketch-accent-orange)] font-mono mb-1 font-bold">
            ALGORITHM PATTERN
          </div>
          <h2 className="text-3xl font-bold font-header flex items-center gap-3">
            Sliding Window
            <span className="text-sm px-3 py-0.5 rounded-full sketch-border-soft text-[var(--sketch-accent-orange)] font-sketch">
              {trackLabel}
            </span>
          </h2>
        </div>

        {/* Expected Output Card */}
        <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-xl font-mono text-xs text-amber-300 shadow-sm">
          <span className="text-amber-400 font-bold font-header text-sm">🎯 Target:</span>
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
            Step Execution Canvas
          </div>

          {/* Array Cards Container */}
          <div ref={containerRef} className="flex items-center gap-3 md:gap-5 my-8 relative pt-6 pb-24 px-4 overflow-x-auto w-full justify-center">
            {array.map((val, i) => {
              const isLeft = step.left === i;
              const isRight = step.right === i;
              const isBothLeftRight = isLeft && isRight;

              const inWindow = step.left !== null && step.right !== null && i >= step.left && i <= step.right;

              return (
                <div key={i} className="relative flex flex-col items-center">
                  <motion.div
                    animate={{
                      scale: inWindow ? 1.08 : 1,
                      y: inWindow ? -6 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                    className={`sketch-card ${
                      inWindow
                        ? 'active-orange !border-amber-400 !bg-amber-500/20 shadow-lg shadow-amber-500/20 ring-2 ring-amber-400/60'
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
                        <div className="text-xs">L, R</div>
                        <div className="text-xs leading-none">▲</div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Single Left Pointer */}
                  <AnimatePresence>
                    {isLeft && !isBothLeftRight && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="sketch-pointer sketch-pointer-orange"
                      >
                        <div>L</div>
                        <div className="text-xs leading-none">▲</div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Single Right Pointer */}
                  <AnimatePresence>
                    {isRight && !isBothLeftRight && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="sketch-pointer sketch-pointer-blue"
                      >
                        <div>R</div>
                        <div className="text-xs leading-none">▲</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Active Window Subarray Banner */}
          {step.left !== null && step.right !== null && (
            <div className="flex items-center justify-center gap-3 mt-2 mb-4 font-sketch">
              <div className="bg-amber-500/10 border border-amber-500/40 px-4 py-2 rounded-xl font-mono text-xs text-amber-300 flex flex-wrap items-center justify-center gap-3 shadow-md">
                <span className="font-bold text-amber-400 flex items-center gap-1.5">
                  <span>🪟</span> Active Subarray:
                </span>
                <span className="bg-amber-500/25 border border-amber-500/50 px-2.5 py-0.5 rounded-lg font-bold text-amber-200 text-sm">
                  [{array.slice(step.left, step.right + 1).map(x => (typeof x === 'string' ? `'${x}'` : x)).join(', ')}]
                </span>
                <span className="text-slate-500">|</span>
                <span className="text-amber-300 font-bold">
                  Window Size: {step.right - step.left + 1}
                </span>
              </div>
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
                rows={9}
                className="w-full bg-transparent p-2 font-mono text-xs text-[var(--sketch-text)] border border-[var(--sketch-border)] rounded focus:outline-none"
              />
            ) : (
              <div className="space-y-0.5">
                {activeCode.map((c) => {
                  const isActive = step.activeLine === c.line;
                  return (
                    <div
                      key={c.line}
                      className={`sketch-code-line ${isActive ? 'active' : ''}`}
                    >
                      <span className="w-6 text-[var(--sketch-text-muted)] select-none">{c.line}</span>
                      <span className="whitespace-pre">{c.text}</span>
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
        <div className="flex-1 text-sm md:text-base leading-relaxed font-sketch">
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
