import { create } from 'zustand';

// 1. LINEAR SEARCH STEPS WITH KEY INSIGHTS
const LINEAR_SEARCH_STEPS = [
  {
    activeLine: 1,
    i: 0,
    array: [12, 45, 67, 23, 89, 34],
    state: { keyInsight: 'Scan unsorted elements sequentially from index 0 to N-1 in O(N) time.', target: 23, i: 0, 'arr[0]': 12 },
    desc: '💡 Key insight: Linear search sequentially inspects every element from index 0 to N-1 in O(N) time. Works on unsorted arrays!',
  },
  {
    activeLine: 2,
    i: 0,
    array: [12, 45, 67, 23, 89, 34],
    state: { target: 23, i: 0, 'arr[0]': 12, condition: '12 == 23 (FALSE ❌)' },
    desc: 'Step 2: Check condition: arr[0]=12 == target=23? FALSE. Advance to index 1.',
  },
  {
    activeLine: 1,
    i: 1,
    array: [12, 45, 67, 23, 89, 34],
    state: { target: 23, i: 1, 'arr[1]': 45 },
    desc: 'Step 3: Inspect arr[1] = 45. 45 != 23. Advance to index 2.',
  },
  {
    activeLine: 1,
    i: 3,
    array: [12, 45, 67, 23, 89, 34],
    isMatch: true,
    state: { target: 23, i: 3, 'arr[3]': 23, condition: '23 == 23 (TRUE ✅)', status: 'MATCH FOUND 🎉' },
    desc: 'Step 4: Inspect arr[3] = 23. Target 23 matched at index 3 in O(N) time! 🎉',
  },
];

// 2. BINARY SEARCH STEPS WITH KEY INSIGHTS
const BINARY_SEARCH_STEPS = [
  {
    activeLine: 1,
    low: 0,
    high: 9,
    mid: null,
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    state: { keyInsight: 'Halves search space at each step in O(log N) time on sorted array.', target: 23, low: 0, high: 9, 'arr[0]': 2, 'arr[9]': 91 },
    desc: '💡 Key insight: Binary search halves the search space at every step in O(log N) time by comparing target against the midpoint element of a sorted array.',
  },
  {
    activeLine: 3,
    low: 0,
    high: 9,
    mid: 4,
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    state: { target: 23, low: 0, high: 9, mid: 4, 'arr[4]': 16 },
    desc: 'Step 2: Calculate mid = (0 + 9) / 2 = 4. Element arr[4] = 16.',
  },
  {
    activeLine: 6,
    low: 5,
    high: 9,
    mid: 4,
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    state: { target: 23, '16 < 23': 'TRUE ➔ Shift low = mid + 1 (5)', low: 5, high: 9 },
    desc: 'Step 3: Mid element 16 < target 23. Target must lie in right half! Shift low to index 5 (val 23).',
  },
  {
    activeLine: 3,
    low: 5,
    high: 9,
    mid: 7,
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    state: { target: 23, low: 5, high: 9, mid: 7, 'arr[7]': 56 },
    desc: 'Step 4: Calculate new mid = (5 + 9) / 2 = 7. Element arr[7] = 56.',
  },
  {
    activeLine: 8,
    low: 5,
    high: 6,
    mid: 7,
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    state: { target: 23, '56 > 23': 'TRUE ➔ Shift high = mid - 1 (6)', low: 5, high: 6 },
    desc: 'Step 5: Mid element 56 > target 23. Shift high to index 6 (val 38).',
  },
  {
    activeLine: 3,
    low: 5,
    high: 6,
    mid: 5,
    isMatch: true,
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    state: { target: 23, low: 5, high: 6, mid: 5, 'arr[5]': 23, status: 'MATCH FOUND 🎉' },
    desc: 'Step 6: Mid = (5 + 6) / 2 = 5. Element arr[5] = 23 == target 23! Target found in O(log N) time! 🎉',
  },
];

const SEARCH_ARRAYS = {
  'linear-search': [12, 45, 67, 23, 89, 34],
  'binary-search': [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
};

export const useSearchingStore = create((set, get) => ({
  track: 'linear-search',
  array: SEARCH_ARRAYS['linear-search'],
  steps: LINEAR_SEARCH_STEPS,
  currentStep: 0,
  isPlaying: false,
  speed: 1,
  practiceMode: false,
  userCode: `// Searching Template\nfunction binarySearch(arr, target) {\n  let low = 0, high = arr.length - 1;\n  while (low <= high) {\n    let mid = Math.floor((low + high) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) low = mid + 1;\n    else high = mid - 1;\n  }\n  return -1;\n}`,

  setTrack: (trackKey) => {
    let steps = LINEAR_SEARCH_STEPS;
    let array = SEARCH_ARRAYS['linear-search'];

    if (trackKey === 'binary-search') {
      steps = BINARY_SEARCH_STEPS;
      array = SEARCH_ARRAYS['binary-search'];
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

  restart: () => set({ currentStep: 0, isPlaying: false }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setSpeed: (s) => set({ speed: s }),
  togglePracticeMode: () => set((state) => ({ practiceMode: !state.practiceMode })),
  setUserCode: (code) => set({ userCode: code }),
}));
