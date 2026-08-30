import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTwoPointersStore } from '../../store/visualizers/twoPointersStore';
import SwapArcConnector from './SwapArcConnector';

const INTRO_CODE = [
  { line: 1, text: 'left ← 0' },
  { line: 2, text: 'right ← n - 1' },
  { line: 3, text: 'while left < right:' },
  { line: 4, text: '    inspect arr[left], arr[right]' },
  { line: 5, text: '    if conditionMet:' },
  { line: 6, text: '        left++' },
  { line: 7, text: '    else:' },
  { line: 8, text: '        right--' },
];

const TWO_SUM_CODE = [
  { line: 1, text: 'left ← 0, right ← n - 1' },
  { line: 2, text: 'while left < right:' },
  { line: 3, text: '    sum ← arr[left] + arr[right]' },
  { line: 4, text: '    if sum == target:' },
  { line: 5, text: '        return [left + 1, right + 1]' },
  { line: 6, text: '    else if sum < target:' },
  { line: 7, text: '        left++' },
  { line: 8, text: '    else:' },
  { line: 9, text: '        right--' },
];

const PALINDROME_CODE = [
  { line: 1, text: 'left ← 0, right ← s.length - 1' },
  { line: 2, text: 'while left < right:' },
  { line: 3, text: '    if s[left] != s[right]:' },
  { line: 4, text: '        return false' },
  { line: 5, text: '    left++' },
  { line: 6, text: '    right--' },
  { line: 7, text: 'return true' },
];

const THREE_SUM_CODE = [
  { line: 1, text: 'sort(nums)' },
  { line: 2, text: 'for i from 0 to n - 3:' },
  { line: 3, text: '    left ← i + 1, right ← n - 1' },
  { line: 4, text: '    while left < right:' },
  { line: 5, text: '        sum ← nums[i] + nums[left] + nums[right]' },
  { line: 6, text: '        if sum == 0: record, left++, right--' },
  { line: 7, text: '        else if sum < 0: left++' },
  { line: 8, text: '        else: right--' },
];

const CONTAINER_WATER_CODE = [
  { line: 1, text: 'left ← 0, right ← n - 1, maxArea ← 0' },
  { line: 2, text: 'while left < right:' },
  { line: 3, text: '    area ← min(h[left], h[right]) * (right - left)' },
  { line: 4, text: '    maxArea ← max(maxArea, area)' },
  { line: 5, text: '    if h[left] < h[right]: left++' },
  { line: 6, text: '    else: right--' },
];

const MOVE_ZEROES_CODE = [
  { line: 1, text: 'slow ← 0' },
  { line: 2, text: 'for fast from 0 to n - 1:' },
  { line: 3, text: '    if arr[fast] != 0:' },
  { line: 4, text: '        swap(arr[slow], arr[fast])' },
  { line: 5, text: '        slow++' },
];

const REMOVE_DUPLICATES_CODE = [
  { line: 1, text: 'slow ← 0' },
  { line: 2, text: 'for fast from 1 to n - 1:' },
  { line: 3, text: '    if arr[fast] != arr[slow]:' },
  { line: 4, text: '        slow++' },
  { line: 5, text: '        arr[slow] ← arr[fast]' },
];

const SORT_COLORS_CODE = [
  { line: 1, text: 'low ← 0, mid ← 0, high ← n - 1' },
  { line: 2, text: 'while mid <= high:' },
  { line: 3, text: '    if arr[mid] == 0: swap(arr[low], arr[mid]), low++, mid++' },
  { line: 4, text: '    else if arr[mid] == 1: mid++' },
  { line: 5, text: '    else: swap(arr[mid], arr[high]), high--' },
];

const TRAP_WATER_CODE = [
  { line: 1, text: 'left ← 0, right ← n - 1, leftMax ← 0, rightMax ← 0' },
  { line: 2, text: 'while left < right:' },
  { line: 2, text: '    if leftMax < rightMax:' },
  { line: 3, text: '        water += max(0, leftMax - h[left])' },
  { line: 3, text: '        leftMax ← max(leftMax, h[left++])' },
  { line: 4, text: '    else:' },
  { line: 4, text: '        water += max(0, rightMax - h[right])' },
  { line: 4, text: '        rightMax ← max(rightMax, h[right--])' },
  { line: 5, text: 'return water' },
];

const FOUR_SUM_CODE = [
  { line: 1, text: 'sort(nums)' },
  { line: 2, text: 'for i from 0 to n - 4:' },
  { line: 3, text: '    for j from i + 1 to n - 3:' },
  { line: 3, text: '        left ← j + 1, right ← n - 1' },
  { line: 3, text: '        while left < right:' },
  { line: 3, text: '            sum ← nums[i]+nums[j]+nums[left]+nums[right]' },
  { line: 3, text: '            if sum == target: record, left++, right--' },
  { line: 3, text: '            else if sum < target: left++' },
  { line: 3, text: '            else: right--' },
  { line: 4, text: 'return result' },
];

const SQUARE_SORTED_CODE = [
  { line: 1, text: 'left ← 0, right ← n - 1, pos ← n - 1' },
  { line: 2, text: 'while left <= right:' },
  { line: 2, text: '    if |arr[left]| > |arr[right]|:' },
  { line: 2, text: '        result[pos--] ← arr[left] * arr[left], left++' },
  { line: 2, text: '    else:' },
  { line: 2, text: '        result[pos--] ← arr[right] * arr[right], right--' },
  { line: 3, text: 'return result' },
];

const FLOYD_CYCLE_CODE = [
  { line: 1, text: 'slow ← head, fast ← head' },
  { line: 2, text: 'while fast && fast.next:' },
  { line: 2, text: '    slow ← slow.next' },
  { line: 2, text: '    fast ← fast.next.next' },
  { line: 2, text: '    if slow == fast: CYCLE FOUND' },
  { line: 3, text: 'slow ← head (reset for phase 2)' },
  { line: 3, text: 'while slow != fast:' },
  { line: 3, text: '    slow ← slow.next' },
  { line: 3, text: '    fast ← fast.next' },
  { line: 4, text: 'return slow  // cycle start' },
];

const TRACK_TITLES = {
  intro: '1. Introduction Walk',
  'two-sum-ii': '2. Two Sum II',
  'valid-palindrome': '3. Valid Palindrome',
  'three-sum': '4. 3Sum',
  'container-water': '5. Container With Most Water',
  'move-zeroes': '6. Move Zeroes',
  'remove-duplicates': '7. Remove Duplicates',
  'sort-colors': '8. Sort Colors',
  'trap-rain-water': '9. Trapping Rain Water',
  'four-sum': '10. 4Sum',
  'square-sorted': '11. Squares of Sorted Array',
  'floyd-cycle': '12. Floyd\'s Cycle Detection',
};

const EXPECTED_OUTPUTS = {
  intro: 'Pointers meet at index 3 (value 17)',
  'two-sum-ii': '[1, 2] (Indices 1 & 2: 2 + 7 = 9)',
  'valid-palindrome': 'true ("racecar" is a palindrome)',
  'three-sum': '[[-1, -1, 2], [-1, 0, 1]]',
  'container-water': '49 (Max area between index 1 and 8)',
  'move-zeroes': '[1, 3, 12, 0, 0] (In-place swapped)',
  'remove-duplicates': 'k = 5 ([1, 2, 3, 4, 5])',
  'sort-colors': '[0, 0, 1, 1, 2, 2] (3-way partitioned)',
  'trap-rain-water': '6 (Total units of water trapped)',
  'four-sum': '[[-2,-1,1,2], [-2,0,0,2], [-1,0,0,1]]',
  'square-sorted': '[0, 1, 9, 16, 100]',
  'floyd-cycle': 'Cycle start at index 3 (value 0)',
};

export default function TwoPointersVisualizer() {
  const containerRef = useRef(null);
  const {
    track,
    array,
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
  } = useTwoPointersStore();

  const step = steps[currentStep] || steps[0];

  // Auto-play stepping timer loop with comfortable 2.2s base delay
  useEffect(() => {
    if (!isPlaying) return;
    if (currentStep >= steps.length - 1) {
      useTwoPointersStore.setState({ isPlaying: false });
      return;
    }
    const delay = 2200 / speed;
    const timeout = setTimeout(() => {
      nextStep();
    }, delay);
    return () => clearTimeout(timeout);
  }, [isPlaying, currentStep, speed, steps.length, nextStep]);

  const activeCode =
    track === 'intro'
      ? INTRO_CODE
      : track === 'two-sum-ii'
      ? TWO_SUM_CODE
      : track === 'valid-palindrome'
      ? PALINDROME_CODE
      : track === 'three-sum'
      ? THREE_SUM_CODE
      : track === 'container-water'
      ? CONTAINER_WATER_CODE
      : track === 'move-zeroes'
      ? MOVE_ZEROES_CODE
      : track === 'remove-duplicates'
      ? REMOVE_DUPLICATES_CODE
      : track === 'trap-rain-water'
      ? TRAP_WATER_CODE
      : track === 'four-sum'
      ? FOUR_SUM_CODE
      : track === 'square-sorted'
      ? SQUARE_SORTED_CODE
      : track === 'floyd-cycle'
      ? FLOYD_CYCLE_CODE
      : SORT_COLORS_CODE;

  const trackLabel = TRACK_TITLES[track] || 'Two Pointers Pattern';
  const expectedOutput = EXPECTED_OUTPUTS[track] || 'Expected Result';

  // Calculate swap pair
  let swapFrom = null;
  let swapTo = null;

  if (step.swapFrom !== undefined && step.swapTo !== undefined && step.swapFrom !== null && step.swapTo !== null) {
    swapFrom = step.swapFrom;
    swapTo = step.swapTo;
  } else if (track === 'move-zeroes' && step.activeLine === 4 && step.slow !== null && step.fast !== null) {
    swapFrom = step.slow;
    swapTo = step.fast;
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
            Two Pointers
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
        <div className="sketch-canvas-box sketch-border relative p-6 pt-6 pb-20 min-h-[260px] flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute top-3 left-4 text-xs font-mono text-[var(--sketch-text-muted)]">
            Step Execution Canvas
          </div>

          {/* Array Cards Container */}
          <div ref={containerRef} className="flex items-start gap-3 md:gap-5 my-4 relative pt-6 pb-20 px-4 overflow-x-auto overflow-y-visible w-full justify-center">
            {hasSwapArc && (
              <SwapArcConnector containerRef={containerRef} fromIndex={swapFrom} toIndex={swapTo} label="swapping" />
            )}

            {(step.array || array).map((val, i) => {
              const isLeft = step.left === i;
              const isRight = step.right === i;
              const isIPtr = step.i === i;
              const isLow = step.low === i;
              const isMid = step.mid === i;
              const isHigh = step.high === i;
              const isSlow = step.slow === i;
              const isFast = step.fast === i;

              const isBothLeftRight = isLeft && isRight;
              const isBothSlowFast = isSlow && isFast;

              const isSwapping = i === swapFrom || i === swapTo;

              const isHighlighted =
                isLeft || isRight || isIPtr || isLow || isMid || isHigh || isSlow || isFast;

              const isMatchStep =
                step.state?.status?.includes('MATCH') ||
                step.state?.status?.includes('PALINDROME') ||
                (step.activeLine === 4 && track === 'two-sum-ii' && step.state?.condition?.includes('TRUE'));

              return (
                <div key={i} className="relative flex flex-col items-center">
                  {/* Floating Action Badge */}
                  <AnimatePresence>
                    {isSwapping && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: -26 }}
                        exit={{ opacity: 0 }}
                        className="absolute -top-3 z-20 px-2 py-0.5 rounded-full bg-rose-500 text-white font-mono text-[10px] font-bold animate-bounce shadow-md whitespace-nowrap"
                      >
                        🔄 Swap
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div
                    animate={{
                      scale: isSwapping ? 1.15 : isMatchStep && (isLeft || isRight) ? 1.15 : isHighlighted ? 1.08 : 1,
                      y: isSwapping ? -10 : isMatchStep && (isLeft || isRight) ? -10 : isHighlighted ? -6 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                    className={`sketch-card ${
                      isSwapping
                        ? '!border-rose-400 !bg-rose-500/20 shadow-lg ring-2 ring-rose-400'
                        : isMatchStep && (isLeft || isRight)
                        ? '!border-emerald-400 !bg-emerald-500/20 shadow-lg shadow-emerald-500/40 ring-2 ring-emerald-400'
                        : val === null
                        ? 'border-dashed border-white/20 text-white/30'
                        : isBothLeftRight
                        ? 'border-purple-400 bg-purple-500/20 ring-1 ring-purple-400'
                        : isBothSlowFast
                        ? 'border-purple-400 bg-purple-500/20'
                        : isLeft
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

                  {/* Combined Slow + Fast Pointer */}
                  <AnimatePresence>
                    {isBothSlowFast && !isBothLeftRight && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="sketch-pointer text-purple-300 font-bold bg-purple-500/20 px-2 py-0.5 rounded-md border border-purple-400/40 shadow-sm"
                      >
                        <div className="text-xs">slow, fast</div>
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
                        <div>left</div>
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
                        <div>right</div>
                        <div className="text-xs leading-none">▲</div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Single Slow Pointer */}
                  <AnimatePresence>
                    {isSlow && !isBothSlowFast && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="sketch-pointer text-purple-400 font-bold"
                      >
                        <div>slow</div>
                        <div className="text-xs leading-none">▲</div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Single Fast Pointer */}
                  <AnimatePresence>
                    {isFast && !isBothSlowFast && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="sketch-pointer text-cyan-400 font-bold"
                      >
                        <div>fast</div>
                        <div className="text-xs leading-none">▲</div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Dutch National Flag Pointers (low, mid, high) */}
                  <AnimatePresence>
                    {isLow && isMid && (
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

                  <AnimatePresence>
                    {isLow && !isMid && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="sketch-pointer sketch-pointer-orange font-bold"
                      >
                        <div>low</div>
                        <div className="text-xs leading-none">▲</div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {isMid && !isLow && (
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

                  <AnimatePresence>
                    {isHigh && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="sketch-pointer sketch-pointer-blue font-bold"
                      >
                        <div>high</div>
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
            </div>

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
