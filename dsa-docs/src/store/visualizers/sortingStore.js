import { create } from 'zustand';

// 1. BUBBLE SORT STEPS WITH KEY INSIGHTS
const BUBBLE_SORT_STEPS = [
  {
    activeLine: 1,
    i: 0,
    j: 0,
    array: [5, 2, 8, 1, 4],
    state: { keyInsight: 'Bubble largest element to end in each pass by swapping adjacent out-of-order elements O(N^2).', i: 0, j: 0, 'arr[0]': 5, 'arr[1]': 2 },
    desc: '💡 Key insight: Bubble sort repeatedly swaps adjacent out-of-order elements (arr[j] > arr[j+1]), bubbling the largest element to the end in each pass.',
  },
  {
    activeLine: 3,
    i: 0,
    j: 0,
    array: [2, 5, 8, 1, 4],
    state: { i: 0, j: 0, swap: '5 ↔ 2', array: '[2, 5, 8, 1, 4]' },
    desc: 'Step 2: arr[0]=5 > arr[1]=2. Swap 5 and 2! Array becomes [2, 5, 8, 1, 4].',
  },
  {
    activeLine: 2,
    i: 0,
    j: 1,
    array: [2, 5, 8, 1, 4],
    state: { i: 0, j: 1, 'arr[1]': 5, 'arr[2]': 8, compare: '5 < 8 (No Swap)' },
    desc: 'Step 3: arr[1]=5 < arr[2]=8. Already in order! No swap needed.',
  },
  {
    activeLine: 3,
    i: 0,
    j: 2,
    array: [2, 5, 1, 8, 4],
    state: { i: 0, j: 2, swap: '8 ↔ 1', array: '[2, 5, 1, 8, 4]' },
    desc: 'Step 4: arr[2]=8 > arr[3]=1. Swap 8 and 1! Array becomes [2, 5, 1, 8, 4].',
  },
  {
    activeLine: 3,
    i: 0,
    j: 3,
    array: [2, 5, 1, 4, 8],
    isMatch: true,
    state: { i: 0, j: 3, swap: '8 ↔ 4', sortedSuffix: '[8]', status: 'PASS 1 COMPLETE 🎉' },
    desc: 'Step 5: arr[3]=8 > arr[4]=4. Swap 8 and 4! Largest element 8 bubbled to end! 🎉',
  },
];

// 2. SELECTION SORT STEPS WITH KEY INSIGHTS
const SELECTION_SORT_STEPS = [
  {
    activeLine: 1,
    i: 0,
    minIdx: 0,
    array: [5, 2, 8, 1, 4],
    state: { keyInsight: 'Find minimum element in unsorted region and swap into position i in O(N^2).', i: 0, minIdx: 0 },
    desc: '💡 Key insight: Selection sort scans the unsorted region for the minimum element and swaps it into position i at the end of each pass.',
  },
  {
    activeLine: 3,
    i: 0,
    minIdx: 3,
    array: [5, 2, 8, 1, 4],
    state: { i: 0, minIdx: 3, minVal: 1 },
    desc: 'Step 2: Scan unsorted elements. Minimum element found is 1 at index 3.',
  },
  {
    activeLine: 4,
    i: 0,
    minIdx: 3,
    isMatch: true,
    array: [1, 2, 8, 5, 4],
    state: { i: 0, swap: 'arr[0](5) ↔ arr[3](1)', sortedPrefix: '[1]', status: 'PASS 1 COMPLETE 🎉' },
    desc: 'Step 3: Swap minimum element 1 at index 3 with arr[0]=5. Array becomes [1, 2, 8, 5, 4]! 🎉',
  },
];

// 3. INSERTION SORT STEPS WITH KEY INSIGHTS
const INSERTION_SORT_STEPS = [
  {
    activeLine: 1,
    i: 1,
    key: 2,
    array: [5, 2, 8, 1, 4],
    state: { keyInsight: 'Build sorted prefix by taking key arr[i] and shifting larger elements right in O(N^2).', i: 1, key: 2 },
    desc: '💡 Key insight: Insertion sort builds a sorted prefix. Take key arr[i] and shift larger elements in the prefix right to insert key into its correct spot.',
  },
  {
    activeLine: 3,
    i: 1,
    key: 2,
    isMatch: true,
    array: [2, 5, 8, 1, 4],
    state: { i: 1, key: 2, shift: 'arr[0]=5 shifted right', sortedPrefix: '[2, 5]', status: 'KEY INSERTED 🎉' },
    desc: 'Step 2: Key=2. Shift 5 right and insert 2 at index 0. Sorted prefix is now [2, 5]! 🎉',
  },
];

const SORT_ARRAYS = {
  'bubble-sort': [5, 2, 8, 1, 4],
  'selection-sort': [5, 2, 8, 1, 4],
  'insertion-sort': [5, 2, 8, 1, 4],
  'quick-sort': [5, 2, 8, 1, 4],
  'merge-sort': [5, 2, 8, 1, 4],
};

export const useSortingStore = create((set, get) => ({
  track: 'bubble-sort',
  array: SORT_ARRAYS['bubble-sort'],
  steps: BUBBLE_SORT_STEPS,
  currentStep: 0,
  isPlaying: false,
  speed: 1,
  practiceMode: false,
  userCode: `// Sorting Template\nfunction bubbleSort(arr) {\n  let n = arr.length;\n  for (let i = 0; i < n - 1; i++) {\n    for (let j = 0; j < n - i - 1; j++) {\n      if (arr[j] > arr[j + 1]) {\n        let temp = arr[j];\n        arr[j] = arr[j + 1];\n        arr[j + 1] = temp;\n      }\n    }\n  }\n  return arr;\n}`,

  setTrack: (trackKey) => {
    let steps = BUBBLE_SORT_STEPS;
    let array = SORT_ARRAYS['bubble-sort'];

    if (trackKey === 'selection-sort') {
      steps = SELECTION_SORT_STEPS;
      array = SORT_ARRAYS['selection-sort'];
    } else if (trackKey === 'insertion-sort') {
      steps = INSERTION_SORT_STEPS;
      array = SORT_ARRAYS['insertion-sort'];
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
