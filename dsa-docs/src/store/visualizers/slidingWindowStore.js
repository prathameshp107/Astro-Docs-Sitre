import { create } from 'zustand';

// 1. INTRO STEPS: Fixed Window K=3 (Granular 8-Step Trace)
const INTRO_STEPS = [
  {
    activeLine: 1,
    left: 0,
    right: null,
    k: 3,
    windowSum: 0,
    maxSum: 0,
    state: { keyInsight: 'Recompute window sum in O(1) by adding incoming and subtracting outgoing element.', L: 0, R: 'None', status: 'Step 1: Initialize Left boundary L = 0' },
    desc: '💡 Key insight: Recompute sliding window sum in O(1) time by adding the incoming right element and subtracting the outgoing left element, avoiding expensive O(K) re-summing.',
  },
  {
    activeLine: 1,
    left: 0,
    right: 0,
    k: 3,
    windowSum: 2,
    maxSum: 0,
    state: { L: 0, R: 0, val: 2, windowSum: 2, windowSize: 1, targetK: 3 },
    desc: 'Step 2: Initialize Right boundary R = 0. Add arr[0] (2) to window. Current windowSum = 2 (Window size 1 < K=3).',
  },
  {
    activeLine: 1,
    left: 0,
    right: 1,
    k: 3,
    windowSum: 3,
    maxSum: 0,
    state: { L: 0, R: 1, val: 1, windowSum: 3, windowSize: 2, targetK: 3 },
    desc: 'Step 3: Expand R to index 1 (val 1). Add arr[1] to window. Current windowSum = 2 + 1 = 3 (Window size 2 < K=3).',
  },
  {
    activeLine: 1,
    left: 0,
    right: 2,
    k: 3,
    windowSum: 8,
    maxSum: 8,
    state: { L: 0, R: 2, val: 5, windowSum: 8, windowSize: 3, maxSum: 8, status: 'WINDOW OF SIZE K=3 READY 🎉' },
    desc: 'Step 4: Expand R to index 2 (val 5). Add arr[2] to window. Initial window [2, 1, 5] complete! windowSum = 8. Set initial maxSum = 8.',
  },
  {
    activeLine: 3,
    left: 1,
    right: 3,
    k: 3,
    windowSum: 7,
    maxSum: 8,
    state: { L: 1, R: 3, outgoing: 'arr[0]=2', incoming: 'arr[3]=1', windowSum: '8 - 2 + 1 = 7', maxSum: 8 },
    desc: 'Step 5: Slide window right (L=1, R=3). Subtract outgoing arr[0]=2, add incoming arr[3]=1. New windowSum = 7. maxSum remains 8.',
  },
  {
    activeLine: 3,
    left: 2,
    right: 4,
    k: 3,
    windowSum: 9,
    maxSum: 9,
    state: { L: 2, R: 4, outgoing: 'arr[1]=1', incoming: 'arr[4]=3', windowSum: '7 - 1 + 3 = 9', maxSum: 9 },
    desc: 'Step 6: Slide window right (L=2, R=4). Subtract outgoing arr[1]=1, add incoming arr[4]=3. New windowSum = 9. Updated maxSum = 9! 🎉',
  },
  {
    activeLine: 3,
    left: 3,
    right: 5,
    k: 3,
    windowSum: 6,
    maxSum: 9,
    state: { L: 3, R: 5, outgoing: 'arr[2]=5', incoming: 'arr[5]=2', windowSum: '9 - 5 + 2 = 6', maxSum: 9 },
    desc: 'Step 7: Slide window right (L=3, R=5). Subtract outgoing arr[2]=5, add incoming arr[5]=2. New windowSum = 6. maxSum remains 9.',
  },
  {
    activeLine: 5,
    left: 2,
    right: 4,
    k: 3,
    windowSum: 9,
    maxSum: 9,
    isMatch: true,
    state: { result: 9, optimalWindow: '[5, 1, 3] at indices 2..4', status: 'COMPLETED 🎉' },
    desc: 'Step 8: Scanned entire array! Maximum subarray sum of size K=3 is 9 (indices 2 to 4). Time complexity O(N). 🎉',
  },
];

// 2. MAX SUM SUBARRAY OF SIZE K=3 STEPS (Granular 8-Step Trace)
const MAX_SUM_STEPS = [
  {
    activeLine: 1,
    left: 0,
    right: null,
    k: 3,
    windowSum: 0,
    maxSum: 0,
    state: { keyInsight: 'Maintain a fixed-size window of width K. Slide it while tracking max sum.', L: 0, R: 'None', status: 'Step 1: Initialize L = 0' },
    desc: '💡 Key insight: Maintain a fixed-size window of width K. Expand right pointer until size reaches K, then slide by incrementing both L and R.',
  },
  {
    activeLine: 1,
    left: 0,
    right: 0,
    k: 3,
    windowSum: 2,
    maxSum: 0,
    state: { L: 0, R: 0, val: 2, windowSum: 2, size: 1 },
    desc: 'Step 2: Initialize R = 0. Add arr[0] (2) to windowSum = 2.',
  },
  {
    activeLine: 2,
    left: 0,
    right: 1,
    k: 3,
    windowSum: 3,
    maxSum: 0,
    state: { L: 0, R: 1, val: 1, windowSum: 3, size: 2 },
    desc: 'Step 3: Expand window to R = 1. Add arr[1] (1). windowSum = 3.',
  },
  {
    activeLine: 2,
    left: 0,
    right: 2,
    k: 3,
    windowSum: 8,
    maxSum: 8,
    state: { L: 0, R: 2, val: 5, windowSum: 8, 'Window Complete': 'Size 3 reached!', maxSum: 8 },
    desc: 'Step 4: Expand window to R = 2. Add arr[2] (5). Window size K=3 reached! Initial maxSum = 8.',
  },
  {
    activeLine: 4,
    left: 1,
    right: 3,
    k: 3,
    windowSum: 7,
    maxSum: 8,
    state: { L: 1, R: 3, Outgoing: 'arr[0]=2', Incoming: 'arr[3]=1', windowSum: 7, maxSum: 8 },
    desc: 'Step 5: Slide R=3, L=1. Subtract 2, add 1. windowSum = 7. maxSum remains 8.',
  },
  {
    activeLine: 4,
    left: 2,
    right: 4,
    k: 3,
    windowSum: 9,
    maxSum: 9,
    state: { L: 2, R: 4, Outgoing: 'arr[1]=1', Incoming: 'arr[4]=3', windowSum: 9, maxSum: 9 },
    desc: 'Step 6: Slide R=4, L=2. Subtract 1, add 3. windowSum = 9. Updated maxSum = 9! 🎉',
  },
  {
    activeLine: 4,
    left: 3,
    right: 5,
    k: 3,
    windowSum: 6,
    maxSum: 9,
    state: { L: 3, R: 5, Outgoing: 'arr[2]=5', Incoming: 'arr[5]=2', windowSum: 6, maxSum: 9 },
    desc: 'Step 7: Slide R=5, L=3. Subtract 5, add 2. windowSum = 6. maxSum remains 9.',
  },
  {
    activeLine: 6,
    left: 2,
    right: 4,
    k: 3,
    windowSum: 9,
    maxSum: 9,
    isMatch: true,
    state: { Answer: 9, status: 'COMPLETED 🎉' },
    desc: 'Step 8: Algorithm finished. Return max sum = 9. 🎉',
  },
];

// 3. LONGEST SUBSTRING WITHOUT REPEATING CHARACTERS ("abcabcbb") (Granular 9-Step Trace)
const LONGEST_SUBSTRING_STEPS = [
  {
    activeLine: 1,
    left: 0,
    right: null,
    maxLen: 0,
    freqMap: {},
    state: { keyInsight: 'Expand R to include characters. When duplicate arrives, shrink L until unique.', L: 0, R: 'None', status: 'Step 1: Initialize L = 0' },
    desc: '💡 Key insight: Expand right pointer R to include characters into window. When a duplicate character is encountered, shrink left pointer L until the window becomes unique again.',
  },
  {
    activeLine: 1,
    left: 0,
    right: 0,
    maxLen: 1,
    freqMap: { a: 1 },
    state: { L: 0, R: 0, char: 'a', seen: "{'a'}", maxLen: 1 },
    desc: 'Step 2: Initialize R = 0. Add s[0]="a" to window. Unique chars! maxLen = 1.',
  },
  {
    activeLine: 2,
    left: 0,
    right: 1,
    maxLen: 2,
    freqMap: { a: 1, b: 1 },
    state: { L: 0, R: 1, char: 'b', seen: "{'a', 'b'}", maxLen: 2 },
    desc: 'Step 3: Expand R = 1 (char "b"). No duplicate. Substring "ab" is valid! maxLen = 2.',
  },
  {
    activeLine: 2,
    left: 0,
    right: 2,
    maxLen: 3,
    freqMap: { a: 1, b: 1, c: 1 },
    state: { L: 0, R: 2, char: 'c', seen: "{'a', 'b', 'c'}", maxLen: 3 },
    desc: 'Step 4: Expand R = 2 (char "c"). No duplicate. Substring "abc" is valid! maxLen = 3.',
  },
  {
    activeLine: 4,
    left: 0,
    right: 3,
    maxLen: 3,
    freqMap: { a: 2, b: 1, c: 1 },
    state: { L: 0, R: 3, duplicate: "'a'", action: 'Duplicate detected! Must shrink L', maxLen: 3 },
    desc: 'Step 5: Expand R = 3 (char "a"). Duplicate character "a" detected in window! Must shrink L.',
  },
  {
    activeLine: 4,
    left: 1,
    right: 3,
    maxLen: 3,
    freqMap: { b: 1, c: 1, a: 1 },
    state: { L: 1, R: 3, removed: "'a' at index 0", window: '"bca"', status: 'Valid again!' },
    desc: 'Step 6: Shrink L to index 1 (remove "a" at index 0). Window "bca" is valid! maxLen remains 3.',
  },
  {
    activeLine: 4,
    left: 1,
    right: 4,
    maxLen: 3,
    freqMap: { b: 2, c: 1, a: 1 },
    state: { L: 1, R: 4, duplicate: "'b'", action: 'Duplicate detected! Must shrink L' },
    desc: 'Step 7: Expand R = 4 (char "b"). Duplicate "b" detected! Must shrink L pointer.',
  },
  {
    activeLine: 4,
    left: 2,
    right: 4,
    maxLen: 3,
    freqMap: { c: 1, a: 1, b: 1 },
    state: { L: 2, R: 4, removed: "'b' at index 1", window: '"cab"', status: 'Valid again!' },
    desc: 'Step 8: Shrink L to index 2 (remove "b" at index 1). Window "cab" is valid! maxLen remains 3.',
  },
  {
    activeLine: 5,
    left: 0,
    right: 2,
    maxLen: 3,
    isMatch: true,
    freqMap: { a: 1, b: 1, c: 1 },
    state: { maxLen: 3, optimalSubstring: '"abc"', status: 'LONGEST SUBSTRING FOUND 🎉' },
    desc: 'Step 9: Traversal complete! Longest substring without repeating characters is "abc" with length 3. 🎉',
  },
];

// 4. MINIMUM SIZE SUBARRAY SUM (Target = 7, arr = [2, 3, 1, 2, 4, 3]) (Granular 12-Step Trace)
const MIN_SUBARRAY_SUM_STEPS = [
  {
    activeLine: 1,
    left: 0,
    right: null,
    minLen: Infinity,
    windowSum: 0,
    state: { keyInsight: 'Dynamic window! Expand R until sum >= target, then aggressively shrink L.', L: 0, R: 'None', status: 'Step 1: Initialize L = 0' },
    desc: '💡 Key insight: Dynamic window approach. Expand R to add elements until sum >= target (7). Then shrink L as much as possible to minimize window length while keeping sum >= target.',
  },
  {
    activeLine: 1,
    left: 0,
    right: 0,
    minLen: Infinity,
    windowSum: 2,
    state: { L: 0, R: 0, sum: 2, target: 7, status: '2 < 7 ➔ Expand R' },
    desc: 'Step 2: Expand R to index 0 (val 2). windowSum = 2 < 7. Need to expand R.',
  },
  {
    activeLine: 1,
    left: 0,
    right: 1,
    minLen: Infinity,
    windowSum: 5,
    state: { L: 0, R: 1, sum: 5, target: 7, status: '5 < 7 ➔ Expand R' },
    desc: 'Step 3: Expand R to index 1 (val 3). windowSum = 2+3 = 5 < 7. Need to expand R.',
  },
  {
    activeLine: 1,
    left: 0,
    right: 2,
    minLen: Infinity,
    windowSum: 6,
    state: { L: 0, R: 2, sum: 6, target: 7, status: '6 < 7 ➔ Expand R' },
    desc: 'Step 4: Expand R to index 2 (val 1). windowSum = 5+1 = 6 < 7. Need to expand R.',
  },
  {
    activeLine: 1,
    left: 0,
    right: 3,
    minLen: 4,
    windowSum: 8,
    state: { L: 0, R: 3, windowSum: 8, target: 7, windowLen: 4, minLen: 4, status: '8 >= 7 ✅ Valid!' },
    desc: 'Step 5: Expand R to index 3 (val 2). windowSum = 6+2 = 8 >= 7! Valid window [2, 3, 1, 2] of length 4 found! Set minLen = 4.',
  },
  {
    activeLine: 3,
    left: 1,
    right: 3,
    minLen: 4,
    windowSum: 6,
    state: { L: 1, R: 3, windowSum: 6, target: 7, status: '6 < 7 ➔ Stop shrinking' },
    desc: 'Step 6: Shrink L to 1. Subtract arr[0]=2. windowSum = 6 < 7. Cannot shrink further! Must expand R.',
  },
  {
    activeLine: 1,
    left: 1,
    right: 4,
    minLen: 4,
    windowSum: 10,
    state: { L: 1, R: 4, windowSum: 10, target: 7, windowLen: 4, minLen: 4, status: '10 >= 7 ✅ Valid!' },
    desc: 'Step 7: Expand R to index 4 (val 4). windowSum = 6+4 = 10 >= 7! Valid window [3, 1, 2, 4] of length 4.',
  },
  {
    activeLine: 3,
    left: 2,
    right: 4,
    minLen: 3,
    windowSum: 7,
    state: { L: 2, R: 4, windowSum: 7, target: 7, windowLen: 3, minLen: 3, status: '7 >= 7 ✅ UPDATED MIN LEN!' },
    desc: 'Step 8: Shrink L to 2. Subtract arr[1]=3. windowSum = 7 >= 7! Valid window [1, 2, 4] of length 3! Updated minLen = 3! 🎉',
  },
  {
    activeLine: 3,
    left: 3,
    right: 4,
    minLen: 3,
    windowSum: 6,
    state: { L: 3, R: 4, windowSum: 6, target: 7, status: '6 < 7 ➔ Stop shrinking' },
    desc: 'Step 9: Shrink L to 3. Subtract arr[2]=1. windowSum = 6 < 7. Stop shrinking!',
  },
  {
    activeLine: 1,
    left: 3,
    right: 5,
    minLen: 3,
    windowSum: 9,
    state: { L: 3, R: 5, windowSum: 9, target: 7, windowLen: 3, minLen: 3, status: '9 >= 7 ✅ Valid!' },
    desc: 'Step 10: Expand R to index 5 (val 3). windowSum = 6+3 = 9 >= 7! Valid window [2, 4, 3] of length 3.',
  },
  {
    activeLine: 3,
    left: 4,
    right: 5,
    minLen: 2,
    windowSum: 7,
    isMatch: true,
    state: { L: 4, R: 5, windowSum: 7, target: 7, windowLen: 2, minLen: 2, status: 'MINIMAL WINDOW FOUND 🎉' },
    desc: 'Step 11: Shrink L to 4. Subtract arr[3]=2. Window [4, 3] sum = 7 >= 7! Minimal length = 2! 🎉',
  },
  {
    activeLine: 5,
    left: 4,
    right: 5,
    minLen: 2,
    isMatch: true,
    state: { minLen: 2, optimalWindow: '[4, 3]', status: 'COMPLETED 🎉' },
    desc: 'Step 12: Scanned array! Minimum size subarray with sum >= 7 has length 2 (subarray [4, 3]). 🎉',
  },
];

// 5. FRUIT INTO BASKETS (At most 2 distinct fruits) (Granular 9-Step Trace)
const FRUIT_BASKETS_STEPS = [
  {
    activeLine: 1,
    left: 0,
    right: null,
    maxFruits: 0,
    baskets: {},
    state: { keyInsight: 'Maintain a HashMap of fruit counts. Shrink L when distinct fruits > 2.', L: 0, R: 'None', status: 'Step 1: Initialize L = 0' },
    desc: '💡 Key insight: Represent baskets as a HashMap of fruit counts. Expand R to add fruits. When distinct keys > 2, shrink L until distinct keys <= 2.',
  },
  {
    activeLine: 1,
    left: 0,
    right: 0,
    maxFruits: 1,
    baskets: { 1: 1 },
    state: { L: 0, R: 0, baskets: '{1: 1}', distinctTypes: 1, maxFruits: 1 },
    desc: 'Step 2: Initialize R = 0. Collect fruit type 1. Baskets hold type 1 (1 fruit). maxFruits = 1.',
  },
  {
    activeLine: 1,
    left: 0,
    right: 1,
    maxFruits: 2,
    baskets: { 1: 1, 2: 1 },
    state: { L: 0, R: 1, baskets: '{1: 1, 2: 1}', distinctTypes: 2, maxFruits: 2 },
    desc: 'Step 3: Expand R = 1. Collect fruit type 2. Baskets hold types 1 and 2 (2 fruits). maxFruits = 2.',
  },
  {
    activeLine: 1,
    left: 0,
    right: 2,
    maxFruits: 3,
    baskets: { 1: 1, 2: 2 },
    state: { L: 0, R: 2, baskets: '{1: 1, 2: 2}', distinctTypes: 2, maxFruits: 3 },
    desc: 'Step 4: Expand R = 2. Collect another fruit type 2. Baskets hold types 1 and 2 (3 fruits total). Update maxFruits = 3! 🎉',
  },
  {
    activeLine: 3,
    left: 0,
    right: 3,
    maxFruits: 3,
    baskets: { 1: 1, 2: 2, 3: 1 },
    state: { L: 0, R: 3, baskets: '{1: 1, 2: 2, 3: 1}', distinctTypes: 3, status: 'Invalid: 3 fruit types!' },
    desc: 'Step 5: Expand R = 3. Fruit type 3 collected! 3 distinct fruit types in baskets (> 2 allowed). Must shrink L.',
  },
  {
    activeLine: 4,
    left: 1,
    right: 3,
    maxFruits: 3,
    baskets: { 2: 2, 3: 1 },
    state: { L: 1, R: 3, baskets: '{2: 2, 3: 1}', distinctTypes: 2, currentFruits: 3, maxFruits: 3 },
    desc: 'Step 6: Shrink L to 1. Removed fruit type 1. Baskets hold types 2 and 3 (3 fruits total). Valid again!',
  },
  {
    activeLine: 5,
    left: 1,
    right: 4,
    maxFruits: 4,
    baskets: { 2: 3, 3: 1 },
    state: { L: 1, R: 4, baskets: '{2: 3, 3: 1}', distinctTypes: 2, maxFruits: 4 },
    desc: 'Step 7: Expand R = 4 (fruit type 2). Baskets hold types 2 and 3 (4 fruits total). Update maxFruits = 4! 🎉',
  },
  {
    activeLine: 5,
    left: 1,
    right: 5,
    maxFruits: 5,
    isMatch: true,
    baskets: { 2: 4, 3: 1 },
    state: { L: 1, R: 5, baskets: '{2: 4, 3: 1}', distinctTypes: 2, maxFruits: 5, status: 'MAX FRUITS FOUND 🎉' },
    desc: 'Step 8: Expand R = 5 (fruit type 2). Baskets hold types 2 and 3 (5 fruits total)! Max fruits = 5! 🎉',
  },
  {
    activeLine: 6,
    left: 1,
    right: 5,
    maxFruits: 5,
    isMatch: true,
    state: { maxFruits: 5, optimalWindow: 'Indices 1..5', status: 'COMPLETED 🎉' },
    desc: 'Step 9: Traversal complete! Maximum number of fruits collected in 2 baskets is 5 (subarray [2, 2, 3, 2, 2]). 🎉',
  },
];

const TRACK_ARRAYS = {
  intro: [2, 1, 5, 1, 3, 2],
  'max-sum-subarray': [2, 1, 5, 1, 3, 2],
  'longest-substring': ['a', 'b', 'c', 'a', 'b', 'c', 'b', 'b'],
  'min-subarray-sum': [2, 3, 1, 2, 4, 3],
  'fruit-into-baskets': [1, 2, 2, 3, 2, 2],
};

export const useSlidingWindowStore = create((set, get) => ({
  track: 'intro',
  array: TRACK_ARRAYS['intro'],
  steps: INTRO_STEPS,
  currentStep: 0,
  isPlaying: false,
  speed: 1,
  practiceMode: false,
  userCode: `// Sliding Window Template\nfunction maxSubarraySum(arr, k) {\n  let windowSum = 0;\n  let maxSum = 0;\n  for (let i = 0; i < k; i++) windowSum += arr[i];\n  maxSum = windowSum;\n  for (let i = k; i < arr.length; i++) {\n    windowSum += arr[i] - arr[i - k];\n    maxSum = Math.max(maxSum, windowSum);\n  }\n  return maxSum;\n}`,

  setTrack: (trackKey) => {
    let steps = INTRO_STEPS;
    let array = TRACK_ARRAYS['intro'];

    if (trackKey === 'max-sum-subarray') {
      steps = MAX_SUM_STEPS;
      array = TRACK_ARRAYS['max-sum-subarray'];
    } else if (trackKey === 'longest-substring') {
      steps = LONGEST_SUBSTRING_STEPS;
      array = TRACK_ARRAYS['longest-substring'];
    } else if (trackKey === 'min-subarray-sum') {
      steps = MIN_SUBARRAY_SUM_STEPS;
      array = TRACK_ARRAYS['min-subarray-sum'];
    } else if (trackKey === 'fruit-into-baskets') {
      steps = FRUIT_BASKETS_STEPS;
      array = TRACK_ARRAYS['fruit-into-baskets'];
    }

    set({ track: trackKey, array, steps, currentStep: 0, isPlaying: false });
  },

  setCurrentStep: (step) => {
    const { steps } = get();
    if (step >= 0 && step < steps.length) {
      set({ currentStep: step });
    }
  },

  nextStep: () => {
    const { currentStep, steps } = get();
    if (currentStep < steps.length - 1) {
      set({ currentStep: currentStep + 1 });
    } else {
      set({ isPlaying: false });
    }
  },

  prevStep: () => {
    const { currentStep } = get();
    if (currentStep > 0) {
      set({ currentStep: currentStep - 1 });
    }
  },

  restart: () => {
    set({ currentStep: 0, isPlaying: false });
  },

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setSpeed: (s) => set({ speed: s }),
  togglePracticeMode: () => set((state) => ({ practiceMode: !state.practiceMode })),
  setUserCode: (code) => set({ userCode: code }),
}));
