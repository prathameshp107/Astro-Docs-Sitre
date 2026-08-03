import { create } from 'zustand';

// 1. LINEAR SEARCH STEPS WITH KEY INSIGHTS (10 Granular Steps)
const LINEAR_SEARCH_STEPS = [
  {
    activeLine: 1,
    i: 0,
    array: [12, 45, 67, 23, 89, 34],
    state: { keyInsight: 'Scan unsorted elements sequentially from index 0 to N-1 in O(N) time.', target: 23, i: 0, 'arr[0]': 12 },
    desc: '💡 Key insight: Linear search sequentially inspects every element from index 0 to N-1 in O(N) time. Target = 23.',
  },
  {
    activeLine: 2,
    i: 0,
    array: [12, 45, 67, 23, 89, 34],
    state: { target: 23, i: 0, 'arr[0]': 12, condition: '12 == 23 (FALSE ❌)' },
    desc: 'Step 1: Check condition: arr[0]=12 == target=23? FALSE ❌. Mismatch at index 0.',
  },
  {
    activeLine: 1,
    i: 1,
    array: [12, 45, 67, 23, 89, 34],
    state: { target: 23, i: 1, 'arr[1]': 45 },
    desc: 'Step 2: Advance pointer i to 1. Inspect arr[1] = 45.',
  },
  {
    activeLine: 2,
    i: 1,
    array: [12, 45, 67, 23, 89, 34],
    state: { target: 23, i: 1, 'arr[1]': 45, condition: '45 == 23 (FALSE ❌)' },
    desc: 'Step 3: Check condition: arr[1]=45 == target=23? FALSE ❌. Mismatch at index 1.',
  },
  {
    activeLine: 1,
    i: 2,
    array: [12, 45, 67, 23, 89, 34],
    state: { target: 23, i: 2, 'arr[2]': 67 },
    desc: 'Step 4: Advance pointer i to 2. Inspect arr[2] = 67.',
  },
  {
    activeLine: 2,
    i: 2,
    array: [12, 45, 67, 23, 89, 34],
    state: { target: 23, i: 2, 'arr[2]': 67, condition: '67 == 23 (FALSE ❌)' },
    desc: 'Step 5: Check condition: arr[2]=67 == target=23? FALSE ❌. Mismatch at index 2.',
  },
  {
    activeLine: 1,
    i: 3,
    array: [12, 45, 67, 23, 89, 34],
    state: { target: 23, i: 3, 'arr[3]': 23 },
    desc: 'Step 6: Advance pointer i to 3. Inspect arr[3] = 23.',
  },
  {
    activeLine: 2,
    i: 3,
    array: [12, 45, 67, 23, 89, 34],
    state: { target: 23, i: 3, 'arr[3]': 23, condition: '23 == 23 (TRUE ✅)', status: 'MATCH FOUND 🎉' },
    desc: 'Step 7: Check condition: arr[3]=23 == target=23? TRUE ✅! Target element matched at index 3!',
  },
  {
    activeLine: 3,
    i: 3,
    array: [12, 45, 67, 23, 89, 34],
    state: { target: 23, returnIndex: 3, status: 'Return Index 3' },
    desc: 'Step 8: Execute `return 3`. Target 23 successfully located at index 3 after 4 comparisons.',
  },
  {
    activeLine: 3,
    i: 3,
    isMatch: true,
    array: [12, 45, 67, 23, 89, 34],
    state: { status: 'SUCCESS 🎉', result: 'Index 3', complexity: 'O(N) Time' },
    desc: 'Step 9: Linear Search Complete! Target 23 found at index 3 in O(N) time! 🎉',
  },
  {
    activeLine: 3,
    i: 3,
    isMatch: true,
    array: [12, 45, 67, 23, 89, 34],
    state: { status: 'FULLY VERIFIED 🎉', target: 23, foundAtIndex: 3 },
    desc: 'Step 10: Linear search complete! Target 23 verified at index 3. 🎉',
  },
];

// 2. BINARY SEARCH STEPS WITH KEY INSIGHTS (11 Granular Steps)
const BINARY_SEARCH_STEPS = [
  {
    activeLine: 1,
    low: 0,
    high: 9,
    mid: null,
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    state: { keyInsight: 'Halves search space at each step in O(log N) time on sorted array.', target: 23, low: 0, high: 9 },
    desc: '💡 Key insight: Binary search halves search space in O(log N) time on sorted array. Target = 23.',
  },
  {
    activeLine: 2,
    low: 0,
    high: 9,
    mid: null,
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    state: { target: 23, low: 0, high: 9, condition: '0 <= 9 (TRUE ✅)' },
    desc: 'Step 1: Check while condition: low=0 <= high=9? TRUE ✅. Enter loop for search space [0..9].',
  },
  {
    activeLine: 3,
    low: 0,
    high: 9,
    mid: 4,
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    state: { target: 23, low: 0, high: 9, mid: 4, 'arr[4]': 16 },
    desc: 'Step 2: Calculate mid = low + (high - low)/2 = 0 + (9-0)/2 = 4. Element arr[4] = 16.',
  },
  {
    activeLine: 6,
    low: 0,
    high: 9,
    mid: 4,
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    state: { target: 23, mid: 4, 'arr[4]': 16, compare: '16 < 23 ➔ TRUE' },
    desc: 'Step 3: Compare arr[mid]=16 < target=23? TRUE ✅. Target lies in right half [5..9].',
  },
  {
    activeLine: 7,
    low: 5,
    high: 9,
    mid: 4,
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    state: { target: 23, low: 5, high: 9, action: 'Shift low = mid + 1 = 5' },
    desc: 'Step 4: Update low = mid + 1 = 5. Search space narrowed to range [5..9].',
  },
  {
    activeLine: 2,
    low: 5,
    high: 9,
    mid: null,
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    state: { target: 23, low: 5, high: 9, condition: '5 <= 9 (TRUE ✅)' },
    desc: 'Step 5: Iteration 2: Check low=5 <= high=9? TRUE ✅. Continue search in [5..9].',
  },
  {
    activeLine: 3,
    low: 5,
    high: 9,
    mid: 7,
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    state: { target: 23, low: 5, high: 9, mid: 7, 'arr[7]': 56 },
    desc: 'Step 6: Calculate mid = 5 + (9-5)/2 = 7. Element arr[7] = 56.',
  },
  {
    activeLine: 8,
    low: 5,
    high: 9,
    mid: 7,
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    state: { target: 23, mid: 7, 'arr[7]': 56, compare: '56 > 23 ➔ TRUE' },
    desc: 'Step 7: Compare arr[mid]=56 > target=23? TRUE ✅. Target lies in left half [5..6].',
  },
  {
    activeLine: 9,
    low: 5,
    high: 6,
    mid: 7,
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    state: { target: 23, low: 5, high: 6, action: 'Shift high = mid - 1 = 6' },
    desc: 'Step 8: Update high = mid - 1 = 6. Search space narrowed to range [5..6].',
  },
  {
    activeLine: 3,
    low: 5,
    high: 6,
    mid: 5,
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    state: { target: 23, low: 5, high: 6, mid: 5, 'arr[5]': 23 },
    desc: 'Step 9: Iteration 3: Calculate mid = 5 + (6-5)/2 = 5. Element arr[5] = 23.',
  },
  {
    activeLine: 5,
    low: 5,
    high: 6,
    mid: 5,
    isMatch: true,
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    state: { target: 23, low: 5, high: 6, mid: 5, 'arr[5]': 23, status: 'MATCH FOUND 🎉' },
    desc: 'Step 10: Check arr[mid]=23 == target=23? TRUE ✅! Target found at index 5 in O(log N) steps! 🎉',
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
