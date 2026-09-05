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

const KADANE_CODE = [
  { line: 1, text: 'currentSum ← arr[0], maxSum ← arr[0]' },
  { line: 2, text: 'for i from 1 to n - 1:' },
  { line: 3, text: '    currentSum ← max(arr[i], currentSum + arr[i])' },
  { line: 4, text: '    if currentSum > maxSum: maxSum ← currentSum' },
  { line: 5, text: 'return maxSum' },
];

const BUY_SELL_CODE = [
  { line: 1, text: 'minPrice ← arr[0], maxProfit ← 0' },
  { line: 2, text: 'for i from 1 to n - 1:' },
  { line: 3, text: '    if arr[i] < minPrice: minPrice ← arr[i]' },
  { line: 4, text: '    profit ← arr[i] - minPrice' },
  { line: 5, text: '    if profit > maxProfit: maxProfit ← profit' },
  { line: 6, text: 'return maxProfit' },
];

const PRODUCT_SELF_CODE = [
  { line: 1, text: 'answer ← [1, 1, ..., 1], prefix ← 1' },
  { line: 2, text: 'for i from 0 to n - 1:' },
  { line: 3, text: '    answer[i] ← prefix; prefix *= nums[i]' },
  { line: 4, text: 'suffix ← 1' },
  { line: 5, text: 'for i from n - 1 down to 0:' },
  { line: 6, text: '    answer[i] *= suffix; suffix *= nums[i]' },
  { line: 7, text: 'return answer' },
];

const ROTATE_CODE = [
  { line: 1, text: 'k ← k % n' },
  { line: 2, text: 'reverse(arr, 0, n - 1)   // Stage 1: Reverse whole array' },
  { line: 3, text: 'reverse(arr, 0, k - 1)   // Stage 2: Reverse first k elements' },
  { line: 4, text: 'reverse(arr, k, n - 1)   // Stage 3: Reverse remaining elements' },
  { line: 5, text: 'return arr              // Rotated in-place O(1) space' },
];

const MAJORITY_CODE = [
  { line: 1, text: 'candidate ← null, count ← 0' },
  { line: 2, text: 'for each num in nums:' },
  { line: 3, text: '    if count == 0: candidate ← num, count ← 1' },
  { line: 4, text: '    count += (num == candidate) ? 1 : -1' },
  { line: 5, text: 'return candidate // Guaranteed majority (> n/2)' },
];

const MERGE_INTERVALS_CODE = [
  { line: 1, text: 'intervals.sort((a, b) => a.start - b.start) // Step 1: Sort by start time' },
  { line: 2, text: 'current ← intervals[0], merged ← []            // Step 2: Initialize active interval' },
  { line: 3, text: 'for next in intervals[1..]:                    // Step 3: Compare adjacent intervals' },
  { line: 4, text: '    if next.start <= current.end:             // Overlap! Extend current.end' },
  { line: 4, text: '        current.end ← max(current.end, next.end)' },
  { line: 5, text: '    else: merged.push(current); current ← next // Disjoint! Commit and advance' },
  { line: 6, text: 'merged.push(current); return merged          // Push final interval & return' },
];

const FIND_MISSING_CODE = [
  { line: 1, text: 'xor ← 0                                   // Step 1: Initialize XOR accumulator' },
  { line: 2, text: 'for i from 0 to n - 1:                    // Loop through all array indices' },
  { line: 3, text: '    xor ^= i ^ arr[i]                     // XOR index i and value arr[i]' },
  { line: 4, text: 'xor ^= n                                  // XOR final boundary value n' },
  { line: 5, text: 'return xor                                // Only missing number survives!' },
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
  'kadane': '7. Kadane\'s Algorithm',
  'buy-sell-stock': '8. Best Time to Buy & Sell Stock',
  'product-except-self': '9. Product Except Self',
  'rotate-array': '10. Rotate Array by K',
  'majority-element': '11. Majority Element',
  'merge-intervals': '12. Merge Intervals',
  'find-missing': '13. Find Missing Number',
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
  'kadane': '6 (Subarray [4, -1, 2, 1])',
  'buy-sell-stock': '5 (Buy @ 1, Sell @ 6)',
  'product-except-self': '[24, 12, 8, 6]',
  'rotate-array': '[5, 6, 7, 1, 2, 3, 4] (Rotated right by 3)',
  'majority-element': '3 (Appears 4/7 times)',
  'merge-intervals': '[[1,6], [8,10], [15,18]]',
  'find-missing': '2 (Missing from [3, 0, 1])',
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
    setCurrentStep,
    nextStep,
    prevStep,
    restart,
    togglePlay,
    setSpeed,
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
      : track === 'kadane'
      ? KADANE_CODE
      : track === 'buy-sell-stock'
      ? BUY_SELL_CODE
      : track === 'product-except-self'
      ? PRODUCT_SELF_CODE
      : track === 'rotate-array'
      ? ROTATE_CODE
      : track === 'majority-element'
      ? MAJORITY_CODE
      : track === 'merge-intervals'
      ? MERGE_INTERVALS_CODE
      : track === 'find-missing'
      ? FIND_MISSING_CODE
      : ACCESS_CODE;

  const trackLabel = TRACK_TITLES[track] || 'Array Operations';
  const expectedOutput = EXPECTED_OUTPUTS[track] || 'Expected Output';

  // Calculate swap pair or transaction pair for connector arc
  let swapFrom = null;
  let swapTo = null;

  if (step.swapFrom !== undefined && step.swapTo !== undefined && step.swapFrom !== null && step.swapTo !== null) {
    swapFrom = step.swapFrom;
    swapTo = step.swapTo;
  } else if ((track === 'reverse-array' || track === 'reverse') && step.activeLine === 3 && step.left !== null && step.right !== null) {
    swapFrom = step.left;
    swapTo = step.right;
  } else if (track === 'buy-sell-stock' && step.buyIndex !== undefined && step.sellIndex !== undefined && step.buyIndex !== null && step.sellIndex !== null && step.buyIndex !== step.sellIndex && (step.decision === 'new_max' || step.decision === 'peak_max' || step.isMatch)) {
    swapFrom = step.buyIndex;
    swapTo = step.sellIndex;
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

          {/* Kadane's Algorithm HUD Panel */}
          {track === 'kadane' && (
            <div className="w-full max-w-2xl mx-auto my-2 p-3 bg-[var(--sketch-bg)] border border-[var(--sketch-border)] rounded-xl shadow-md flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-extrabold">currentSum:</span>
                <span className={`px-2.5 py-1 rounded-md font-extrabold text-sm border ${
                  (step.currentSum ?? 0) < 0
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                }`}>
                  {step.currentSum !== undefined ? step.currentSum : (step.state?.currentSum ?? 0)}
                </span>
                <span className="text-[var(--sketch-text-muted)] text-[11px] hidden sm:inline">
                  (contiguous subarray sum)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-extrabold">maxSum:</span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-extrabold text-sm">
                  {step.maxSum !== undefined ? step.maxSum : (step.state?.maxSum ?? 0)}
                </span>
                <span className="text-[var(--sketch-text-muted)] text-[11px] hidden sm:inline">
                  (best subarray sum seen)
                </span>
              </div>
            </div>
          )}

          {/* Buy/Sell Stock HUD Panel */}
          {track === 'buy-sell-stock' && (
            <div className="w-full max-w-2xl mx-auto my-2 p-3 bg-[var(--sketch-bg)] border border-[var(--sketch-border)] rounded-xl shadow-md flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-sky-400 font-extrabold">minPrice (buy):</span>
                <span className="px-2.5 py-1 rounded-md bg-sky-500/20 text-sky-300 border border-sky-500/40 font-extrabold text-sm">
                  ${step.minPrice !== undefined ? step.minPrice : (step.state?.minPrice ?? 7)}
                </span>
                <span className="text-[var(--sketch-text-muted)] text-[11px] hidden sm:inline">
                  (Day {step.buyIndex ?? 0})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-extrabold">profit today:</span>
                <span className={`px-2.5 py-1 rounded-md font-extrabold text-sm border ${
                  (step.profit ?? step.state?.['profit today'] ?? 0) > 0
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-500/20 text-slate-300 border-slate-500/40'
                }`}>
                  +${step.profit !== undefined ? step.profit : (step.state?.['profit today'] ?? 0)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-extrabold">maxProfit:</span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-extrabold text-sm">
                  +${step.maxProfit !== undefined ? step.maxProfit : (step.state?.maxProfit ?? 0)}
                </span>
              </div>
            </div>
          )}

          {/* Product of Array Except Self HUD Panel */}
          {track === 'product-except-self' && (
            <div className="w-full max-w-2xl mx-auto my-2 p-3 bg-[var(--sketch-bg)] border border-[var(--sketch-border)] rounded-xl shadow-md flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-extrabold">Pass:</span>
                <span className={`px-2.5 py-1 rounded-md font-extrabold text-xs border ${
                  step.pass === 'suffix' || step.pass === 'suffix_init'
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                    : step.pass === 'complete'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                }`}>
                  {step.pass === 'suffix' || step.pass === 'suffix_init'
                    ? '➡️ Pass 2: Suffix (Right ➔ Left)'
                    : step.pass === 'complete'
                    ? '✅ Complete (No Division)'
                    : '⬅️ Pass 1: Prefix (Left ➔ Right)'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sky-400 font-extrabold">prefixProd:</span>
                <span className="px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold">
                  {step.prefixProd ?? 1}
                </span>
                <span className="text-purple-400 font-extrabold ml-2">suffix:</span>
                <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold">
                  {step.suffixProd ?? 1}
                </span>
              </div>
            </div>
          )}

          {/* Rotate Array by K Steps HUD Panel */}
          {track === 'rotate-array' && (
            <div className="w-full max-w-2xl mx-auto my-2 p-3 bg-[var(--sketch-bg)] border border-[var(--sketch-border)] rounded-xl shadow-md flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-extrabold">Stage:</span>
                <span className={`px-2.5 py-1 rounded-md font-extrabold text-xs border ${
                  step.stage === 1
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : step.stage === 2
                    ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                    : step.stage === 3
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                }`}>
                  {step.stage === 1
                    ? '🔄 Stage 1: Reverse ALL [0..n-1]'
                    : step.stage === 2
                    ? '⏪ Stage 2: Reverse First K=3 [0..k-1]'
                    : step.stage === 3
                    ? '⏩ Stage 3: Reverse Rest [k..n-1]'
                    : '🎉 Rotation Complete (k=3)'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-extrabold">k:</span>
                <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                  3 (k % 7 = 3)
                </span>
                {step.left !== null && step.left !== undefined && (
                  <span className="text-sky-300 font-bold ml-2">
                    L={step.left}, R={step.right}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Boyer-Moore Majority Element HUD Panel */}
          {track === 'majority-element' && (
            <div className="w-full max-w-2xl mx-auto my-2 p-3 bg-[var(--sketch-bg)] border border-[var(--sketch-border)] rounded-xl shadow-md flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-extrabold">👑 Candidate:</span>
                <span className={`px-2.5 py-1 rounded-md font-extrabold text-xs border ${
                  step.candidate !== null && step.candidate !== undefined
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-500/20 text-slate-300 border-slate-500/40'
                }`}>
                  {step.candidate !== null && step.candidate !== undefined ? `Element ${step.candidate}` : 'None (Open)'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-extrabold">🗳️ Vote Count:</span>
                <span className={`px-2.5 py-0.5 rounded-md font-extrabold text-xs border ${
                  (step.count ?? 0) > 0
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                }`}>
                  {step.count ?? 0}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sky-400 font-extrabold">🎯 Threshold:</span>
                <span className="px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold">
                  &gt; 3.5 (≥ 4 / 7)
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold">
                <span className={`px-2 py-0.5 rounded-md border ${
                  step.decision === 'elect'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : step.decision === 'cancel'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : step.decision === 'inspect'
                    ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                }`}>
                  {step.decision === 'elect'
                    ? '👑 Elected (+1)'
                    : step.decision === 'cancel'
                    ? '⚡ Mismatch (-1 ➔ 0)'
                    : step.decision === 'inspect'
                    ? `🔍 Inspecting arr[${step.index}]`
                    : '🏆 Winner: 3 (4/7)'}
                </span>
              </div>
            </div>
          )}

          {/* Merge Intervals HUD Panel */}
          {track === 'merge-intervals' && (
            <div className="w-full max-w-2xl mx-auto my-2 p-3 bg-[var(--sketch-bg)] border border-[var(--sketch-border)] rounded-xl shadow-md flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-extrabold">👑 Active [curr]:</span>
                <span className={`px-2.5 py-1 rounded-md font-extrabold text-xs border ${
                  step.currentInterval
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-500/20 text-slate-300 border-slate-500/40'
                }`}>
                  {step.currentInterval ? `[${step.currentInterval.join(', ')}]` : 'None'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sky-400 font-extrabold">🔍 Candidate [next]:</span>
                <span className={`px-2.5 py-1 rounded-md font-extrabold text-xs border ${
                  step.nextInterval
                    ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                    : 'bg-slate-500/20 text-slate-300 border-slate-500/40'
                }`}>
                  {step.nextInterval ? `[${step.nextInterval.join(', ')}]` : 'None'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-extrabold">📦 Merged List:</span>
                <div className="flex items-center gap-1">
                  {step.mergedList && step.mergedList.length > 0 ? (
                    step.mergedList.map((intv, k) => (
                      <span key={k} className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-xs">
                        [{intv.join(', ')}]
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-500 text-xs italic">[ Empty ]</span>
                  )}
                </div>
              </div>
              <div className="w-full flex items-center justify-between pt-1 border-t border-[var(--sketch-border)] text-[11px]">
                <span className="text-[var(--sketch-text-muted)] font-bold">Action / Check:</span>
                <span className={`px-2 py-0.5 rounded-md border font-bold ${
                  step.decision === 'compare_overlap' || step.decision === 'merge'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : step.decision === 'compare_no_overlap'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : step.decision === 'commit' || step.decision === 'push_final' || step.decision === 'complete'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                }`}>
                  {step.state?.check || step.state?.formula || step.state?.action || step.state?.keyInsight || 'Processing'}
                </span>
              </div>
            </div>
          )}

          {/* Find Missing Number HUD Panel */}
          {track === 'find-missing' && (
            <div className="w-full max-w-2xl mx-auto my-2 p-3 bg-[var(--sketch-bg)] border border-[var(--sketch-border)] rounded-xl shadow-md flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-extrabold">🔢 XOR Accumulator:</span>
                <span className="px-2.5 py-1 rounded-md font-extrabold text-xs border bg-amber-500/20 text-amber-300 border-amber-500/40">
                  {step.xorAcc !== undefined ? `${step.xorAcc} (bin: ${step.binary || '000'})` : '0'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sky-400 font-extrabold">🎯 Boundary (n):</span>
                <span className="px-2.5 py-0.5 rounded-md bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold text-xs">
                  n = 3 [0..3]
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-extrabold">⚡ Canceled:</span>
                <div className="flex items-center gap-1">
                  {step.cancelledPairs && step.cancelledPairs.length > 0 ? (
                    step.cancelledPairs.map((pair, k) => (
                      <span key={k} className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-xs">
                        {pair}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-500 text-xs italic">[ None yet ]</span>
                  )}
                </div>
              </div>
              <div className="w-full flex items-center justify-between pt-1 border-t border-[var(--sketch-border)] text-[11px]">
                <span className="text-[var(--sketch-text-muted)] font-bold">Current Calculation:</span>
                <span className={`px-2 py-0.5 rounded-md border font-bold ${
                  step.decision === 'cancel_pair' || step.decision === 'cancel_final'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : step.decision === 'xor_accumulate'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : step.decision === 'complete' || step.isMatch
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                }`}>
                  {step.formula || step.state?.calculation || step.state?.keyInsight || 'Processing'}
                </span>
              </div>
            </div>
          )}

          {/* Array Cards Container */}
          <div ref={containerRef} className="flex items-start gap-3 md:gap-5 my-4 relative pt-10 pb-16 min-h-[200px] px-4 overflow-x-auto overflow-y-visible w-full justify-center">
            {hasSwapArc && (
              <SwapArcConnector
                containerRef={containerRef}
                fromIndex={swapFrom}
                toIndex={swapTo}
                label={
                  track === 'buy-sell-stock'
                    ? `+$${step.profit || step.maxProfit} profit (Buy @ Day ${swapFrom} ➔ Sell @ Day ${swapTo})`
                    : track === 'rotate-array'
                    ? `swap arr[${swapFrom}] ↔ arr[${swapTo}]`
                    : 'swapping'
                }
              />
            )}

            {(step.array || array).map((val, i) => {
              const isIndex = step.index === i;
              const isLeft = step.left === i;
              const isRight = step.right === i;
              const isBothLeftRight = isLeft && isRight;

              // Kadane subarray highlight
              const isInKadaneWindow = track === 'kadane' && step.subStart !== undefined && i >= step.subStart && i <= step.subEnd;
              const isKadaneBest = track === 'kadane' && step.maxStart !== undefined && i >= step.maxStart && i <= step.maxEnd && (step.decision === 'peak_max' || step.isMatch);

              // Buy/Sell stock highlight & indicators
              const isStockBuyDay = track === 'buy-sell-stock' && i === step.buyIndex;
              const isStockSellDay = track === 'buy-sell-stock' && (i === step.sellIndex || (step.decision === 'peak_max' && i === step.index));
              const isStockMatch = track === 'buy-sell-stock' && step.isMatch && (i === step.buyIndex || i === step.sellIndex);

              // Product except self highlight
              const isProductPrefix = track === 'product-except-self' && isIndex && step.pass === 'prefix';
              const isProductSuffix = track === 'product-except-self' && isIndex && step.pass === 'suffix';
              const isProductDone = track === 'product-except-self' && (step.pass === 'complete' || step.isMatch);

              // Rotate array highlight & window
              const isInRotateWindow = track === 'rotate-array' && step.stageWindow && i >= step.stageWindow[0] && i <= step.stageWindow[1];
              const isRotateDone = track === 'rotate-array' && (step.stage === 'complete' || step.isMatch);

              // Majority element highlight & actions
              const isMajorityElect = track === 'majority-element' && isIndex && step.decision === 'elect';
              const isMajorityCancel = track === 'majority-element' && isIndex && step.decision === 'cancel';
              const isMajorityInspect = track === 'majority-element' && isIndex && step.decision === 'inspect';
              const isMajorityDone = track === 'majority-element' && (step.decision === 'complete' || step.isMatch);

              // Merge intervals highlight & actions
              const isMergeOverlap = track === 'merge-intervals' && step.decision === 'compare_overlap' && i === 2;
              const isMergeMerged = track === 'merge-intervals' && step.decision === 'merge' && i === 0;
              const isMergeDisjoint = track === 'merge-intervals' && step.decision === 'compare_no_overlap' && (i === 4 || i === 6) && i === step.index;
              const isMergeCommitted = track === 'merge-intervals' && step.decision === 'commit' && (i === 4 || i === 6) && i === step.index;
              const isMergePushFinal = track === 'merge-intervals' && step.decision === 'push_final' && i === 6;
              const isMergeComplete = track === 'merge-intervals' && (step.decision === 'complete' || step.isMatch) && (i === 0 || i === 4 || i === 6);

              const isMergeCurrentCard = track === 'merge-intervals' && (
                ((i === 0 || i === 1) && step.currentInterval?.[0] === 1) ||
                ((i === 4 || i === 5) && step.currentInterval?.[0] === 8) ||
                ((i === 6 || i === 7) && step.currentInterval?.[0] === 15)
              );
              const isMergeNextCard = track === 'merge-intervals' && (
                ((i === 2 || i === 3) && step.nextInterval?.[0] === 2) ||
                ((i === 4 || i === 5) && step.nextInterval?.[0] === 8) ||
                ((i === 6 || i === 7) && step.nextInterval?.[0] === 15)
              );

              // Find missing number highlight & actions
              const isMissingInspect = track === 'find-missing' && step.decision === 'inspect' && i === step.index;
              const isMissingAccumulate = track === 'find-missing' && step.decision === 'xor_accumulate' && i === step.index;
              const isMissingCancel = track === 'find-missing' && step.decision === 'cancel_pair' && i === step.index;
              const isMissingFinalCancel = track === 'find-missing' && step.decision === 'cancel_final' && i === 0;
              const isMissingDone = track === 'find-missing' && (step.decision === 'complete' || step.isMatch);

              const isHighlighted = isIndex || isLeft || isRight || isInKadaneWindow || isStockBuyDay || isStockSellDay || isProductPrefix || isProductSuffix || isInRotateWindow || isMajorityInspect || isMajorityElect || isMajorityCancel || isMergeCurrentCard || isMergeNextCard || isMissingInspect || isMissingAccumulate || isMissingCancel || isMissingFinalCancel;

              // Action badge triggers
              const isInserting = (track === 'insert' || track === 'insertion') && isIndex && (val === 99 || step.activeLine === 3);
              const isDeleting = (track === 'delete' || track === 'deletion') && isIndex && (step.activeLine === 1 || step.activeLine === 3);
              const isFound = (track === 'search' || track === 'linear-search') && isIndex && (step.isMatch || step.activeLine === 3);
              const isSwapping = i === swapFrom || i === swapTo;

              // Kadane specific badges on current index
              const isKadaneReset = track === 'kadane' && isIndex && (step.decision === 'reset_and_max' || step.decision === 'reset');
              const isKadaneNewMax = track === 'kadane' && isIndex && (step.decision === 'peak_max' || step.new_max);
              const isKadaneExtend = track === 'kadane' && isIndex && step.decision === 'extend';

              // Stock action badges
              const isStockNewMin = track === 'buy-sell-stock' && isIndex && step.decision === 'new_min';
              const isStockNewMax = track === 'buy-sell-stock' && isIndex && step.decision === 'new_max';
              const isStockPeakMax = track === 'buy-sell-stock' && isIndex && step.decision === 'peak_max';
              const isStockHold = track === 'buy-sell-stock' && isIndex && step.decision === 'hold';

              // Rotate action badges
              const isRotateSwapped = track === 'rotate-array' && (i === step.swapFrom || i === step.swapTo) && step.decision === 'swapped';
              const isRotateStage1Done = track === 'rotate-array' && i === 3 && step.decision === 'stage1_done';
              const isRotateStage2Done = track === 'rotate-array' && i === 1 && step.decision === 'stage2_done';
              const isRotateStage3Done = track === 'rotate-array' && (i === 4 || i === 5) && step.decision === 'stage3_done';
              const isRotateComplete = track === 'rotate-array' && i === 3 && (step.decision === 'complete' || step.isMatch);

              return (
                <div key={i} className="relative flex flex-col items-center">
                  {/* Floating Action Badge */}
                  <AnimatePresence>
                    {isSwapping && track !== 'buy-sell-stock' && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: -24 }} exit={{ opacity: 0 }} className="absolute -top-3 z-20 px-2 py-0.5 rounded-full bg-rose-500 text-white font-mono text-[10px] font-bold animate-bounce shadow-md whitespace-nowrap">
                        🔄 Swap
                      </motion.div>
                    )}
                    {isRotateSwapped && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: -24 }} exit={{ opacity: 0 }} className="absolute -top-3 z-20 px-2 py-0.5 rounded-full bg-emerald-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap animate-pulse">
                        ✅ Swapped!
                      </motion.div>
                    )}
                    {isMajorityElect && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: -24 }} exit={{ opacity: 0 }} className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-amber-500 text-white font-mono text-[10px] font-bold animate-pulse shadow-md whitespace-nowrap">
                        👑 Elect {val}
                      </motion.div>
                    )}
                    {isMajorityCancel && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: -24 }} exit={{ opacity: 0 }} className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-rose-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap">
                        ⚡ Mismatch (-1)
                      </motion.div>
                    )}
                    {isMajorityInspect && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: -24 }} exit={{ opacity: 0 }} className="absolute -top-3 z-20 px-2 py-0.5 rounded-full bg-sky-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap">
                        🔍 Inspect
                      </motion.div>
                    )}
                    {isMajorityDone && val === 3 && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: -24 }} exit={{ opacity: 0 }} className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap animate-bounce">
                        🏆 Majority!
                      </motion.div>
                    )}
                    {isMergeOverlap && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: -24 }} exit={{ opacity: 0 }} className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-amber-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap animate-pulse">
                        ⚡ 2 ≤ 3 (Overlap!)
                      </motion.div>
                    )}
                    {isMergeMerged && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: -24 }} exit={{ opacity: 0 }} className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap animate-pulse">
                        ✨ Merged ➔ [1, 6]
                      </motion.div>
                    )}
                    {isMergeDisjoint && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: -24 }} exit={{ opacity: 0 }} className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-rose-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap">
                        ⏹️ Gap / Disjoint
                      </motion.div>
                    )}
                    {isMergeCommitted && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: -24 }} exit={{ opacity: 0 }} className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap">
                        📦 Committed
                      </motion.div>
                    )}
                    {isMergePushFinal && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: -24 }} exit={{ opacity: 0 }} className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap animate-pulse">
                        🏁 Final Push
                      </motion.div>
                    )}
                    {isMergeComplete && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: -24 }} exit={{ opacity: 0 }} className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap animate-bounce">
                        🏆 Merged List (3)
                      </motion.div>
                    )}
                    {isMissingInspect && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: -24 }} exit={{ opacity: 0 }} className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-sky-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap">
                        🔍 i={i}, val={val}
                      </motion.div>
                    )}
                    {isMissingAccumulate && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: -24 }} exit={{ opacity: 0 }} className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-amber-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap animate-pulse">
                        🧮 xor = {step.xorAcc}
                      </motion.div>
                    )}
                    {isMissingCancel && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: -24 }} exit={{ opacity: 0 }} className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-rose-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap animate-pulse">
                        ⚡ Cancel ({val} ⊕ {val} = 0)
                      </motion.div>
                    )}
                    {isMissingFinalCancel && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: -24 }} exit={{ opacity: 0 }} className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-rose-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap animate-pulse">
                        ⚡ Cancel (3 ⊕ 3 = 0)
                      </motion.div>
                    )}
                    {isMissingDone && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: -24 }} exit={{ opacity: 0 }} className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap animate-bounce">
                        🏆 Missing = 2!
                      </motion.div>
                    )}
                    {isInserting && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: -24 }} exit={{ opacity: 0 }} className="absolute -top-3 z-20 px-2 py-0.5 rounded-full bg-emerald-500 text-white font-mono text-[10px] font-bold animate-bounce shadow-md whitespace-nowrap">
                        + Inserting
                      </motion.div>
                    )}
                    {isDeleting && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: -24 }} exit={{ opacity: 0 }} className="absolute -top-3 z-20 px-2 py-0.5 rounded-full bg-rose-500 text-white font-mono text-[10px] font-bold animate-bounce shadow-md whitespace-nowrap">
                        - Deleting
                      </motion.div>
                    )}
                    {isFound && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: -24 }} exit={{ opacity: 0 }} className="absolute -top-3 z-20 px-2 py-0.5 rounded-full bg-amber-500 text-white font-mono text-[10px] font-bold animate-bounce shadow-md whitespace-nowrap">
                        🔍 Found!
                      </motion.div>
                    )}
                    {isKadaneReset && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: -24 }} exit={{ opacity: 0 }} className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-rose-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap">
                        🔄 Reset!
                      </motion.div>
                    )}
                    {isKadaneNewMax && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: -24 }} exit={{ opacity: 0 }} className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-mono text-[10px] font-bold animate-pulse shadow-md whitespace-nowrap">
                        🏆 Max: {step.maxSum}
                      </motion.div>
                    )}
                    {isKadaneExtend && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: -24 }} exit={{ opacity: 0 }} className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-sky-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap">
                        ➕ Extend
                      </motion.div>
                    )}
                    {isStockNewMin && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: -24 }} exit={{ opacity: 0 }} className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-sky-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap">
                        🏷️ Buy @ ${val}
                      </motion.div>
                    )}
                    {isStockNewMax && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: -24 }} exit={{ opacity: 0 }} className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-mono text-[10px] font-bold animate-pulse shadow-md whitespace-nowrap">
                        📈 Profit: +${step.profit}
                      </motion.div>
                    )}
                    {isStockPeakMax && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: -24 }} exit={{ opacity: 0 }} className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-mono text-[10px] font-bold animate-bounce shadow-md whitespace-nowrap">
                        🏆 Max Profit: +${step.maxProfit}!
                      </motion.div>
                    )}
                    {isStockHold && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: -24 }} exit={{ opacity: 0 }} className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-slate-600 text-slate-200 font-mono text-[10px] font-bold shadow-md whitespace-nowrap">
                        📉 +${step.profit} (&lt; ${step.maxProfit})
                      </motion.div>
                    )}
                    {isProductPrefix && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: -24 }} exit={{ opacity: 0 }} className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-sky-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap">
                        ⬅️ ans[{i}] = {step.ansArray?.[i]}
                      </motion.div>
                    )}
                    {isProductSuffix && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: -24 }} exit={{ opacity: 0 }} className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-purple-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap animate-pulse">
                        ✨ ans[{i}] = {step.ansArray?.[i]}
                      </motion.div>
                    )}
                    {isRotateStage1Done && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: -24 }} exit={{ opacity: 0 }} className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-amber-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap animate-pulse">
                        ✅ Inverted [0..6]
                      </motion.div>
                    )}
                    {isRotateStage2Done && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: -24 }} exit={{ opacity: 0 }} className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-sky-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap animate-pulse">
                        ✨ Prefix [0..2] = [5,6,7]
                      </motion.div>
                    )}
                    {isRotateStage3Done && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: -24 }} exit={{ opacity: 0 }} className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-purple-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap animate-pulse">
                        ✨ Suffix [3..6] = [1,2,3,4]
                      </motion.div>
                    )}
                    {isRotateComplete && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: -24 }} exit={{ opacity: 0 }} className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap animate-bounce">
                        🏆 Rotated by k=3!
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div
                    animate={{
                      scale: (isInserting || isDeleting || isFound || isSwapping || isRotateSwapped || isKadaneNewMax || isStockPeakMax || isProductSuffix || isRotateDone || (isMajorityDone && val === 3) || isMajorityElect || isMajorityCancel || isMergeOverlap || isMergeMerged || isMergeCommitted || (isMergeComplete && (i === 0 || i === 4 || i === 6)) || isMissingCancel || isMissingFinalCancel || isMissingAccumulate || isMissingDone) ? 1.12 : isHighlighted ? 1.05 : 1,
                      y: (isInserting || isDeleting || isFound || isSwapping || isRotateSwapped || isKadaneNewMax || isStockPeakMax || isProductSuffix || isRotateDone || (isMajorityDone && val === 3) || isMajorityElect || isMajorityCancel || isMergeOverlap || isMergeMerged || isMergeCommitted || (isMergeComplete && (i === 0 || i === 4 || i === 6)) || isMissingCancel || isMissingFinalCancel || isMissingAccumulate || isMissingDone) ? -8 : isHighlighted ? -4 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                    className={`sketch-card ${
                      isStockMatch
                        ? (i === step.buyIndex
                            ? '!border-sky-400 !bg-sky-500/25 shadow-lg shadow-sky-500/30 ring-2 ring-sky-400'
                            : '!border-emerald-400 !bg-emerald-500/25 shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400')
                        : isKadaneBest
                        ? '!border-emerald-400 !bg-emerald-500/25 shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400'
                        : isInKadaneWindow
                        ? '!border-amber-400 !bg-amber-500/20 shadow-md ring-1 ring-amber-400/60'
                        : isProductSuffix
                        ? '!border-purple-400 !bg-purple-500/25 shadow-lg ring-2 ring-purple-400'
                        : isProductPrefix
                        ? '!border-sky-400 !bg-sky-500/25 shadow-lg ring-2 ring-sky-400'
                        : isProductDone
                        ? '!border-emerald-400 !bg-emerald-500/20 shadow-md ring-1 ring-emerald-400 text-emerald-300'
                        : isRotateDone
                        ? '!border-emerald-400 !bg-emerald-500/25 shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400 text-emerald-200 font-bold'
                        : isMajorityDone && val === 3
                        ? '!border-emerald-400 !bg-emerald-500/25 shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400 text-emerald-200 font-bold scale-105'
                        : isMajorityElect
                        ? '!border-amber-400 !bg-amber-500/25 shadow-lg shadow-amber-500/30 ring-2 ring-amber-400 text-amber-200 font-bold scale-105'
                        : isMajorityCancel
                        ? '!border-rose-400 !bg-rose-500/25 shadow-lg shadow-rose-500/30 ring-2 ring-rose-400 text-rose-200 font-bold scale-105'
                        : isMajorityInspect
                        ? '!border-sky-400 !bg-sky-500/20 ring-1 ring-sky-400/60 text-sky-200 font-bold'
                        : track === 'merge-intervals' && (step.decision === 'complete' || step.isMatch)
                        ? '!border-emerald-400 !bg-emerald-500/25 shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400 text-emerald-200 font-bold scale-105'
                        : isMergeCurrentCard
                        ? '!border-amber-400 !bg-amber-500/25 shadow-lg shadow-amber-500/30 ring-2 ring-amber-400 text-amber-200 font-bold scale-105'
                        : isMergeNextCard
                        ? '!border-sky-400 !bg-sky-500/25 shadow-lg shadow-sky-500/30 ring-2 ring-sky-400 text-sky-200 font-bold scale-105'
                        : track === 'find-missing' && (step.decision === 'complete' || step.isMatch)
                        ? '!border-emerald-400 !bg-emerald-500/25 shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400 text-emerald-200 font-bold scale-105'
                        : isMissingCancel || isMissingFinalCancel
                        ? '!border-rose-400 !bg-rose-500/25 shadow-lg shadow-rose-500/30 ring-2 ring-rose-400 text-rose-200 font-bold scale-105'
                        : isMissingAccumulate
                        ? '!border-amber-400 !bg-amber-500/25 shadow-lg shadow-amber-500/30 ring-2 ring-amber-400 text-amber-200 font-bold scale-105'
                        : isMissingInspect
                        ? '!border-sky-400 !bg-sky-500/20 ring-1 ring-sky-400/60 text-sky-200 font-bold'
                        : isSwapping && track === 'rotate-array'
                        ? '!border-rose-400 !bg-rose-500/25 shadow-lg shadow-rose-500/30 ring-2 ring-rose-400 text-rose-200 font-bold scale-105'
                        : isRotateSwapped
                        ? '!border-emerald-400 !bg-emerald-500/25 shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400 text-emerald-200 font-bold scale-105'
                        : isInRotateWindow && step.stage === 2
                        ? '!border-sky-400/80 !bg-sky-500/15 ring-1 ring-sky-400/50'
                        : isInRotateWindow && step.stage === 3
                        ? '!border-purple-400/80 !bg-purple-500/15 ring-1 ring-purple-400/50'
                        : isInRotateWindow && step.stage === 1
                        ? '!border-amber-400/80 !bg-amber-500/15 ring-1 ring-amber-400/50'
                        : isInserting || isFound
                        ? '!border-emerald-400 !bg-emerald-500/20 shadow-lg ring-2 ring-emerald-400'
                        : isDeleting || (isSwapping && track !== 'buy-sell-stock')
                        ? '!border-rose-400 !bg-rose-500/20 shadow-lg ring-2 ring-rose-400'
                        : val === null
                        ? 'border-dashed border-white/20 text-white/30'
                        : isBothLeftRight
                        ? 'border-purple-400 bg-purple-500/20 ring-1 ring-purple-400'
                        : isStockBuyDay && !isIndex
                        ? '!border-sky-400 !bg-sky-500/20 shadow-md ring-1 ring-sky-400/60'
                        : isStockSellDay && !isIndex
                        ? '!border-emerald-400 !bg-emerald-500/20 shadow-md ring-1 ring-emerald-400/60'
                        : isIndex || isLeft
                        ? 'active-orange'
                        : isRight
                        ? 'active-blue'
                        : ''
                    }`}
                  >
                    {val !== null ? (track === 'buy-sell-stock' ? `$${val}` : val) : '∅'}
                    <div className="sketch-card-index">
                      {track === 'buy-sell-stock'
                        ? `Day ${i}`
                        : track === 'merge-intervals'
                        ? `Intv ${Math.floor(i / 2)} [${i}]`
                        : `[${i}]`}
                    </div>
                  </motion.div>

                  {/* Stock Buy Day Marker */}
                  <AnimatePresence>
                    {track === 'buy-sell-stock' && isStockBuyDay && !isIndex && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="sketch-pointer text-sky-300 font-bold bg-sky-500/20 px-2 py-0.5 rounded-md border border-sky-400/40 shadow-sm"
                      >
                        <div className="text-[10px]">min buy</div>
                        <div className="text-xs leading-none">▲</div>
                      </motion.div>
                    )}
                  </AnimatePresence>

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
                        <div>{track === 'buy-sell-stock' ? `Day ${i}` : `i = ${i}`}</div>
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

          {/* Live Output Array for Product Except Self */}
          {track === 'product-except-self' && (
            <div className="w-full max-w-xl mx-auto flex flex-col items-center mt-1 mb-4 pt-3 pb-2 border-t border-[var(--sketch-border)]">
              <div className="text-xs font-mono text-amber-400 font-bold mb-2 flex items-center gap-2">
                <span>📤 Output Array: <code className="text-white">answer</code></span>
                <span className="text-[10px] text-[var(--sketch-text-muted)] font-normal">(stores prefix × suffix at each position)</span>
              </div>
              <div className="flex items-center gap-2.5 sm:gap-4">
                {(step.ansArray || [1, 1, 2, 6]).map((ansVal, aIdx) => {
                  const isCurrentAns = step.index === aIdx;
                  return (
                    <div key={aIdx} className="flex flex-col items-center">
                      <div className={`w-12 h-11 sm:w-14 sm:h-12 rounded-xl flex items-center justify-center font-mono font-extrabold text-sm sm:text-base border transition-all duration-300 ${
                        isCurrentAns
                          ? 'bg-amber-500/25 border-amber-400 text-amber-300 scale-110 shadow-lg shadow-amber-500/30 ring-2 ring-amber-400'
                          : step.isMatch || step.pass === 'complete'
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                          : ansVal !== '?'
                          ? 'bg-sky-500/15 border-sky-400/50 text-sky-200'
                          : 'bg-white/5 border-dashed border-white/20 text-white/30'
                      }`}>
                        {ansVal}
                      </div>
                      <span className="text-[10px] font-mono text-[var(--sketch-text-muted)] mt-1">ans[{aIdx}]</span>
                    </div>
                  );
                })}
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
            </div>

            <div className="space-y-0.5">
                {activeCode.map((c, idx) => {
                  const isActive = step.activeLine === c.line;
                  return (
                    <div
                      key={`${c.line}-${idx}`}
                      className={`sketch-code-line gap-3 ${isActive ? 'active' : ''}`}
                    >
                      <span className="w-6 shrink-0 text-[var(--sketch-text-muted)] select-none font-mono">{c.line}</span>
                      <span className="whitespace-pre font-mono flex-1">{c.text}</span>
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
