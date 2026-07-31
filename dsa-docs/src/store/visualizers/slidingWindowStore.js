import { create } from 'zustand';

// 1. INTRO STEPS: Fixed Window K=3
const INTRO_STEPS = [
  {
    activeLine: 1,
    left: 0,
    right: 2,
    k: 3,
    windowSum: 8,
    maxSum: 8,
    state: { L: 0, R: 2, K: 3, 'window[0..2]': '[2, 1, 5]', windowSum: 8 },
    desc: 'Step 1: Compute initial window sum for first K=3 elements: arr[0..2] = 2 + 1 + 5 = 8. Initialize maxSum = 8.',
  },
  {
    activeLine: 3,
    left: 1,
    right: 3,
    k: 3,
    windowSum: 7,
    maxSum: 8,
    state: { L: 1, R: 3, outgoing: 'arr[0]=2', incoming: 'arr[3]=1', windowSum: '8 - 2 + 1 = 7', maxSum: 8 },
    desc: 'Step 2: Slide window right (L=1, R=3). Subtract outgoing arr[0]=2, add incoming arr[3]=1. New windowSum = 7. maxSum remains 8.',
  },
  {
    activeLine: 3,
    left: 2,
    right: 4,
    k: 3,
    windowSum: 9,
    maxSum: 9,
    state: { L: 2, R: 4, outgoing: 'arr[1]=1', incoming: 'arr[4]=3', windowSum: '7 - 1 + 3 = 9', maxSum: 9 },
    desc: 'Step 3: Slide window right (L=2, R=4). Subtract outgoing arr[1]=1, add incoming arr[4]=3. New windowSum = 9. Updated maxSum = 9! 🎉',
  },
  {
    activeLine: 3,
    left: 3,
    right: 5,
    k: 3,
    windowSum: 6,
    maxSum: 9,
    state: { L: 3, R: 5, outgoing: 'arr[2]=5', incoming: 'arr[5]=2', windowSum: '9 - 5 + 2 = 6', maxSum: 9 },
    desc: 'Step 4: Slide window right (L=3, R=5). Subtract outgoing arr[2]=5, add incoming arr[5]=2. New windowSum = 6. maxSum remains 9.',
  },
  {
    activeLine: 5,
    left: 2,
    right: 4,
    k: 3,
    windowSum: 9,
    maxSum: 9,
    state: { result: 9, optimalWindow: '[5, 1, 3] at indices 2..4' },
    desc: 'Step 5: Scanned entire array! Maximum subarray sum of size K=3 is 9 (indices 2 to 4). Time complexity O(N).',
  },
];

// 2. MAX SUM SUBARRAY OF SIZE K=3 STEPS
const MAX_SUM_STEPS = [
  {
    activeLine: 1,
    left: 0,
    right: 0,
    k: 3,
    windowSum: 2,
    maxSum: 0,
    state: { L: 0, R: 0, val: 2, windowSum: 2 },
    desc: 'Line 1-2: Add arr[0]=2 to windowSum.',
  },
  {
    activeLine: 2,
    left: 0,
    right: 1,
    k: 3,
    windowSum: 3,
    maxSum: 0,
    state: { L: 0, R: 1, val: 1, windowSum: 3 },
    desc: 'Line 2: Expand window to R=1. Add arr[1]=1. windowSum = 3.',
  },
  {
    activeLine: 2,
    left: 0,
    right: 2,
    k: 3,
    windowSum: 8,
    maxSum: 8,
    state: { L: 0, R: 2, val: 5, windowSum: 8, 'Window Complete': 'Size 3 reached!' },
    desc: 'Line 2: Expand window to R=2. Add arr[2]=5. Window size is now K=3. Set maxSum = 8.',
  },
  {
    activeLine: 4,
    left: 1,
    right: 3,
    k: 3,
    windowSum: 7,
    maxSum: 8,
    state: { L: 1, R: 3, Outgoing: 'arr[0]=2', Incoming: 'arr[3]=1', windowSum: 7, maxSum: 8 },
    desc: 'Line 4: Expand R=3, shrink L=1. Subtract 2, add 1. windowSum = 7. maxSum remains 8.',
  },
  {
    activeLine: 4,
    left: 2,
    right: 4,
    k: 3,
    windowSum: 9,
    maxSum: 9,
    state: { L: 2, R: 4, Outgoing: 'arr[1]=1', Incoming: 'arr[4]=3', windowSum: 9, maxSum: 9 },
    desc: 'Line 4: Expand R=4, shrink L=2. Subtract 1, add 3. windowSum = 9. Updated maxSum = 9!',
  },
  {
    activeLine: 4,
    left: 3,
    right: 5,
    k: 3,
    windowSum: 6,
    maxSum: 9,
    state: { L: 3, R: 5, Outgoing: 'arr[2]=5', Incoming: 'arr[5]=2', windowSum: 6, maxSum: 9 },
    desc: 'Line 4: Expand R=5, shrink L=3. Subtract 5, add 2. windowSum = 6. maxSum remains 9.',
  },
  {
    activeLine: 6,
    left: 2,
    right: 4,
    k: 3,
    windowSum: 9,
    maxSum: 9,
    state: { Answer: 9 },
    desc: 'Line 6: Algorithm finished. Return max sum = 9.',
  },
];

// 3. LONGEST SUBSTRING WITHOUT REPEATING CHARACTERS ("abcabcbb")
const LONGEST_SUBSTRING_STEPS = [
  {
    activeLine: 1,
    left: 0,
    right: 0,
    maxLen: 1,
    freqMap: { a: 1 },
    state: { L: 0, R: 0, char: 'a', seen: "{'a'}", maxLen: 1 },
    desc: 'Add s[0]="a" to window. Unique chars! maxLen = 1.',
  },
  {
    activeLine: 2,
    left: 0,
    right: 1,
    maxLen: 2,
    freqMap: { a: 1, b: 1 },
    state: { L: 0, R: 1, char: 'b', seen: "{'a', 'b'}", maxLen: 2 },
    desc: 'Expand R=1 (char "b"). No duplicate. Substring "ab" is valid! maxLen = 2.',
  },
  {
    activeLine: 2,
    left: 0,
    right: 2,
    maxLen: 3,
    freqMap: { a: 1, b: 1, c: 1 },
    state: { L: 0, R: 2, char: 'c', seen: "{'a', 'b', 'c'}", maxLen: 3 },
    desc: 'Expand R=2 (char "c"). Substring "abc" is valid! Updated maxLen = 3.',
  },
  {
    activeLine: 3,
    left: 0,
    right: 3,
    maxLen: 3,
    freqMap: { a: 2, b: 1, c: 1 },
    state: { L: 0, R: 3, char: 'a', Duplicate: 'arr[3]="a" already in window!' },
    desc: 'Expand R=3 (char "a"). DUPLICATE "a" detected! Window invalid ("abca"). Need to shrink L.',
  },
  {
    activeLine: 4,
    left: 1,
    right: 3,
    maxLen: 3,
    freqMap: { a: 1, b: 1, c: 1 },
    state: { L: 1, R: 3, Removed: 's[0]="a"', Window: '"bca"', maxLen: 3 },
    desc: 'Shrink L to index 1. Removed s[0]="a". Window "bca" is valid again! maxLen stays 3.',
  },
  {
    activeLine: 3,
    left: 1,
    right: 4,
    maxLen: 3,
    freqMap: { a: 1, b: 2, c: 1 },
    state: { L: 1, R: 4, char: 'b', Duplicate: 'arr[4]="b" already in window!' },
    desc: 'Expand R=4 (char "b"). DUPLICATE "b" detected! Window invalid ("bcab"). Shrink L.',
  },
  {
    activeLine: 4,
    left: 2,
    right: 4,
    maxLen: 3,
    freqMap: { a: 1, b: 1, c: 1 },
    state: { L: 2, R: 4, Removed: 's[1]="b"', Window: '"cab"', maxLen: 3 },
    desc: 'Shrink L to index 2. Removed s[1]="b". Window "cab" is valid again! maxLen stays 3.',
  },
  {
    activeLine: 3,
    left: 2,
    right: 5,
    maxLen: 3,
    freqMap: { a: 1, b: 1, c: 2 },
    state: { L: 2, R: 5, char: 'c', Duplicate: 'arr[5]="c" already in window!' },
    desc: 'Expand R=5 (char "c"). DUPLICATE "c" detected! Window invalid ("cabc"). Shrink L.',
  },
  {
    activeLine: 4,
    left: 3,
    right: 5,
    maxLen: 3,
    freqMap: { a: 1, b: 1, c: 1 },
    state: { L: 3, R: 5, Removed: 's[2]="c"', Window: '"abc"', maxLen: 3 },
    desc: 'Shrink L to index 3. Removed s[2]="c". Window "abc" is valid again!',
  },
  {
    activeLine: 5,
    left: 3,
    right: 5,
    maxLen: 3,
    freqMap: { a: 1, b: 1, c: 1 },
    state: { Result: 3, Substrings: '"abc", "bca", "cab"' },
    desc: 'Scanned string! Longest non-repeating substring length is 3 ("abc").',
  },
];

// 4. MINIMUM SIZE SUBARRAY SUM (Target=7) [2, 3, 1, 2, 4, 3]
const MIN_SUBARRAY_SUM_STEPS = [
  { activeLine: 1, left: 0, right: 0, windowSum: 2, minLen: Infinity, state: { L: 0, R: 0, windowSum: 2, target: 7, minLen: '∞' }, desc: 'Expand R=0: arr[0]=2. windowSum=2 < target(7).' },
  { activeLine: 1, left: 0, right: 1, windowSum: 5, minLen: Infinity, state: { L: 0, R: 1, windowSum: 5, target: 7, minLen: '∞' }, desc: 'Expand R=1: arr[1]=3. windowSum=5 < target(7).' },
  { activeLine: 1, left: 0, right: 2, windowSum: 6, minLen: Infinity, state: { L: 0, R: 2, windowSum: 6, target: 7, minLen: '∞' }, desc: 'Expand R=2: arr[2]=1. windowSum=6 < target(7).' },
  { activeLine: 2, left: 0, right: 3, windowSum: 8, minLen: 4, state: { L: 0, R: 3, windowSum: 8, target: 7, 'Target Met!': '8 >= 7', minLen: 4 }, desc: 'Expand R=3: arr[3]=2. windowSum=8 >= 7! Target met! Length = 4. Set minLen = 4.' },
  { activeLine: 3, left: 1, right: 3, windowSum: 6, minLen: 4, state: { L: 1, R: 3, Removed: 'arr[0]=2', windowSum: 6, 'Target Met?': '6 < 7 (No)' }, desc: 'Shrink L to index 1. Subtract arr[0]=2. windowSum=6 < 7. Continue expanding.' },
  { activeLine: 2, left: 1, right: 4, windowSum: 10, minLen: 4, state: { L: 1, R: 4, windowSum: 10, target: 7, 'Target Met!': '10 >= 7', minLen: 4 }, desc: 'Expand R=4: arr[4]=4. windowSum=10 >= 7! Target met! Length = 4.' },
  { activeLine: 3, left: 2, right: 4, windowSum: 7, minLen: 3, state: { L: 2, R: 4, Removed: 'arr[1]=3', windowSum: 7, 'Target Met!': '7 >= 7', minLen: 3 }, desc: 'Shrink L to index 2. Subtract arr[2]=3. windowSum=7 >= 7! Target STILL met! Updated minLen = 3! 🎉' },
  { activeLine: 3, left: 3, right: 4, windowSum: 6, minLen: 3, state: { L: 3, R: 4, Removed: 'arr[2]=1', windowSum: 6, 'Target Met?': '6 < 7 (No)' }, desc: 'Shrink L to index 3. Subtract arr[2]=1. windowSum=6 < 7. Continue expanding.' },
  { activeLine: 2, left: 3, right: 5, windowSum: 9, minLen: 3, state: { L: 3, R: 5, windowSum: 9, target: 7, 'Target Met!': '9 >= 7', minLen: 3 }, desc: 'Expand R=5: arr[5]=3. windowSum=9 >= 7! Target met! Length = 3.' },
  { activeLine: 3, left: 4, right: 5, windowSum: 7, minLen: 2, state: { L: 4, R: 5, Removed: 'arr[3]=2', windowSum: 7, 'Target Met!': '7 >= 7', minLen: 2 }, desc: 'Shrink L to index 4. Subtract arr[3]=2. windowSum=7 >= 7! Target met! Updated minLen = 2! 🎉 ([4, 3])' },
  { activeLine: 4, left: 4, right: 5, windowSum: 7, minLen: 2, state: { Result: 2, Subarray: '[4, 3]' }, desc: 'Finished! Minimum subarray length with sum >= 7 is 2 (subarray [4, 3]).' },
];

// 5. FRUIT INTO BASKETS (Max 2 distinct types) [1, 2, 1, 2, 3, 2, 2]
const FRUIT_BASKETS_STEPS = [
  { activeLine: 1, left: 0, right: 0, maxLen: 1, freqMap: { 1: 1 }, state: { L: 0, R: 0, Baskets: '{1: 1}', Distinct: 1, maxLen: 1 }, desc: 'Add Fruit 1 at index 0. Baskets contain {1: 1}. Distinct fruits = 1 <= 2. maxLen = 1.' },
  { activeLine: 1, left: 0, right: 1, maxLen: 2, freqMap: { 1: 1, 2: 1 }, state: { L: 0, R: 1, Baskets: '{1: 1, 2: 1}', Distinct: 2, maxLen: 2 }, desc: 'Add Fruit 2 at index 1. Baskets contain {1: 1, 2: 1}. Distinct fruits = 2 <= 2. maxLen = 2.' },
  { activeLine: 1, left: 0, right: 2, maxLen: 3, freqMap: { 1: 2, 2: 1 }, state: { L: 0, R: 2, Baskets: '{1: 2, 2: 1}', Distinct: 2, maxLen: 3 }, desc: 'Add Fruit 1 at index 2. Baskets contain {1: 2, 2: 1}. Distinct fruits = 2 <= 2. maxLen = 3.' },
  { activeLine: 1, left: 0, right: 3, maxLen: 4, freqMap: { 1: 2, 2: 2 }, state: { L: 0, R: 3, Baskets: '{1: 2, 2: 2}', Distinct: 2, maxLen: 4 }, desc: 'Add Fruit 2 at index 3. Baskets contain {1: 2, 2: 2}. Distinct fruits = 2 <= 2. Updated maxLen = 4! 🎉' },
  { activeLine: 2, left: 0, right: 4, maxLen: 4, freqMap: { 1: 2, 2: 2, 3: 1 }, state: { L: 0, R: 4, Baskets: '{1:2, 2:2, 3:1}', Distinct: 3, 'Invalid!': '3 > 2 distinct fruits' }, desc: 'Add Fruit 3 at index 4. Baskets contain 3 distinct fruits (1, 2, 3)! Exceeds 2 baskets limit! Must shrink L.' },
  { activeLine: 3, left: 3, right: 6, maxLen: 4, freqMap: { 2: 3, 3: 1 }, state: { L: 3, R: 6, Baskets: '{2: 3, 3: 1}', Distinct: 2, maxLen: 4 }, desc: 'After shrinking L to index 3 (removing all 1s), window [2, 3, 2, 2] is valid again. maxLen = 4.' },
  { activeLine: 4, left: 3, right: 6, maxLen: 4, freqMap: { 2: 3, 3: 1 }, state: { Result: 4, Subarray: '[1, 2, 1, 2]' }, desc: 'Finished! Maximum fruits collected is 4.' },
];

export const useSlidingWindowStore = create((set, get) => ({
  track: 'intro',
  array: [2, 1, 5, 1, 3, 2],
  stringArray: ['a', 'b', 'c', 'a', 'b', 'c', 'b', 'b'],
  steps: INTRO_STEPS,
  currentStep: 0,
  isPlaying: false,
  speed: 1,
  practiceMode: false,
  windowSizeK: 3,
  targetValue: 7,
  userCode: `// Sliding Window Template\nfunction slidingWindow(arr, k) {\n  let windowSum = 0, maxSum = 0;\n  let left = 0;\n  for (let right = 0; right < arr.length; right++) {\n    windowSum += arr[right];\n    if (right >= k - 1) {\n      maxSum = Math.max(maxSum, windowSum);\n      windowSum -= arr[left];\n      left++;\n    }\n  }\n  return maxSum;\n}`,

  setTrack: (track) => {
    if (track === 'intro') {
      set({ track: 'intro', array: [2, 1, 5, 1, 3, 2], steps: INTRO_STEPS, currentStep: 0, isPlaying: false, windowSizeK: 3 });
    } else if (track === 'max-sum-subarray') {
      set({ track: 'max-sum-subarray', array: [2, 1, 5, 1, 3, 2], steps: MAX_SUM_STEPS, currentStep: 0, isPlaying: false, windowSizeK: 3 });
    } else if (track === 'longest-substring') {
      set({ track: 'longest-substring', array: ['a', 'b', 'c', 'a', 'b', 'c', 'b', 'b'], steps: LONGEST_SUBSTRING_STEPS, currentStep: 0, isPlaying: false });
    } else if (track === 'min-subarray-sum') {
      set({ track: 'min-subarray-sum', array: [2, 3, 1, 2, 4, 3], steps: MIN_SUBARRAY_SUM_STEPS, currentStep: 0, isPlaying: false, targetValue: 7 });
    } else if (track === 'fruit-into-baskets') {
      set({ track: 'fruit-into-baskets', array: [1, 2, 1, 2, 3, 2, 2], steps: FRUIT_BASKETS_STEPS, currentStep: 0, isPlaying: false });
    }
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
