import { create } from 'zustand';

const BUBBLE_SORT_STEPS = [
  {
    activeLine: 1,
    i: 0,
    j: 0,
    array: [29, 10, 14, 37, 14],
    state: { i: 0, n: 5, pass: '1 of 4' },
    desc: 'Line 1: Outer loop i = 0. Start Pass 1 to bubble the largest element to the end.',
  },
  {
    activeLine: 2,
    i: 0,
    j: 0,
    array: [29, 10, 14, 37, 14],
    state: { i: 0, j: 0, range: 'j from 0 to 3' },
    desc: 'Line 2: Inner loop j = 0. Comparing adjacent elements arr[0] and arr[1].',
  },
  {
    activeLine: 3,
    i: 0,
    j: 0,
    array: [29, 10, 14, 37, 14],
    state: { i: 0, j: 0, 'arr[0]': 29, 'arr[1]': 10, condition: '29 > 10 (TRUE ✅)' },
    desc: 'Line 3: Check condition: arr[0]=29 > arr[1]=10? TRUE (29 > 10). Enter swap branch.',
  },
  {
    activeLine: 4,
    i: 0,
    j: 0,
    array: [10, 29, 14, 37, 14],
    state: { i: 0, j: 0, swapped: '29 ↔ 10', array: '[10, 29, 14, 37, 14]' },
    desc: 'Line 4: Swap elements! 29 and 10 exchange positions. Array is now [10, 29, 14, 37, 14].',
  },
  {
    activeLine: 2,
    i: 0,
    j: 1,
    array: [10, 29, 14, 37, 14],
    state: { i: 0, j: 1, 'arr[1]': 29, 'arr[2]': 14 },
    desc: 'Line 2: Inner loop j increments to 1. Comparing arr[1] and arr[2].',
  },
  {
    activeLine: 3,
    i: 0,
    j: 1,
    array: [10, 29, 14, 37, 14],
    state: { i: 0, j: 1, 'arr[1]': 29, 'arr[2]': 14, condition: '29 > 14 (TRUE ✅)' },
    desc: 'Line 3: Check condition: arr[1]=29 > arr[2]=14? TRUE (29 > 14). Enter swap branch.',
  },
  {
    activeLine: 4,
    i: 0,
    j: 1,
    array: [10, 14, 29, 37, 14],
    state: { i: 0, j: 1, swapped: '29 ↔ 14', array: '[10, 14, 29, 37, 14]' },
    desc: 'Line 4: Swap elements! 29 and 14 exchange positions. Array is now [10, 14, 29, 37, 14].',
  },
  {
    activeLine: 2,
    i: 0,
    j: 2,
    array: [10, 14, 29, 37, 14],
    state: { i: 0, j: 2, 'arr[2]': 29, 'arr[3]': 37 },
    desc: 'Line 2: Inner loop j increments to 2. Comparing arr[2] and arr[3].',
  },
  {
    activeLine: 3,
    i: 0,
    j: 2,
    array: [10, 14, 29, 37, 14],
    state: { i: 0, j: 2, 'arr[2]': 29, 'arr[3]': 37, condition: '29 <= 37 (FALSE ❌)' },
    desc: 'Line 3: Check condition: arr[2]=29 > arr[3]=37? FALSE (29 <= 37). Skip swap branch.',
  },
  {
    activeLine: 2,
    i: 0,
    j: 3,
    array: [10, 14, 29, 37, 14],
    state: { i: 0, j: 3, 'arr[3]': 37, 'arr[4]': 14 },
    desc: 'Line 2: Inner loop j increments to 3. Comparing arr[3] and arr[4].',
  },
  {
    activeLine: 3,
    i: 0,
    j: 3,
    array: [10, 14, 29, 37, 14],
    state: { i: 0, j: 3, 'arr[3]': 37, 'arr[4]': 14, condition: '37 > 14 (TRUE ✅)' },
    desc: 'Line 3: Check condition: arr[3]=37 > arr[4]=14? TRUE (37 > 14). Enter swap branch.',
  },
  {
    activeLine: 4,
    i: 0,
    j: 3,
    array: [10, 14, 29, 14, 37],
    state: { i: 0, j: 3, swapped: '37 ↔ 14', sortedElement: 'arr[4]=37' },
    desc: 'Line 4: Swap elements! 37 reaches its final sorted position at index 4.',
  },
  {
    activeLine: 1,
    i: 1,
    j: 0,
    array: [10, 14, 29, 14, 37],
    state: { i: 1, pass: '2 of 4' },
    desc: 'Line 1: Outer loop i increments to 1. Start Pass 2.',
  },
  {
    activeLine: 2,
    i: 1,
    j: 0,
    array: [10, 14, 29, 14, 37],
    state: { i: 1, j: 0, 'arr[0]': 10, 'arr[1]': 14 },
    desc: 'Line 2: Inner loop j = 0. Comparing arr[0]=10 and arr[1]=14.',
  },
  {
    activeLine: 3,
    i: 1,
    j: 0,
    array: [10, 14, 29, 14, 37],
    state: { i: 1, j: 0, 'arr[0]': 10, 'arr[1]': 14, condition: '10 <= 14 (FALSE ❌)' },
    desc: 'Line 3: Check condition: arr[0]=10 > arr[1]=14? FALSE (10 <= 14). Skip swap.',
  },
  {
    activeLine: 2,
    i: 1,
    j: 1,
    array: [10, 14, 29, 14, 37],
    state: { i: 1, j: 1, 'arr[1]': 14, 'arr[2]': 29 },
    desc: 'Line 2: Inner loop j increments to 1. Comparing arr[1]=14 and arr[2]=29.',
  },
  {
    activeLine: 3,
    i: 1,
    j: 1,
    array: [10, 14, 29, 14, 37],
    state: { i: 1, j: 1, 'arr[1]': 14, 'arr[2]': 29, condition: '14 <= 29 (FALSE ❌)' },
    desc: 'Line 3: Check condition: arr[1]=14 > arr[2]=29? FALSE (14 <= 29). Skip swap.',
  },
  {
    activeLine: 2,
    i: 1,
    j: 2,
    array: [10, 14, 29, 14, 37],
    state: { i: 1, j: 2, 'arr[2]': 29, 'arr[3]': 14 },
    desc: 'Line 2: Inner loop j increments to 2. Comparing arr[2]=29 and arr[3]=14.',
  },
  {
    activeLine: 3,
    i: 1,
    j: 2,
    array: [10, 14, 29, 14, 37],
    state: { i: 1, j: 2, 'arr[2]': 29, 'arr[3]': 14, condition: '29 > 14 (TRUE ✅)' },
    desc: 'Line 3: Check condition: arr[2]=29 > arr[3]=14? TRUE (29 > 14). Enter swap branch.',
  },
  {
    activeLine: 4,
    i: 1,
    j: 2,
    array: [10, 14, 14, 29, 37],
    state: { i: 1, j: 2, swapped: '29 ↔ 14', result: '[10, 14, 14, 29, 37]', status: 'SORTED 🎉' },
    desc: 'Line 4: Swap elements! 29 and 14 exchange positions. Array is now fully sorted: [10, 14, 14, 29, 37]! 🎉',
  },
];

const SELECTION_SORT_STEPS = [
  {
    activeLine: 1,
    i: 0,
    minIdx: 0,
    j: 1,
    array: [64, 25, 12, 22, 11],
    state: { i: 0, minIdx: 0, 'minVal': 64, j: 1, 'arr[1]': 25 },
    desc: 'Line 1: Outer loop i = 0. Start selection pass for position 0.',
  },
  {
    activeLine: 2,
    i: 0,
    minIdx: 0,
    j: 1,
    array: [64, 25, 12, 22, 11],
    state: { i: 0, minIdx: 0, minVal: 64 },
    desc: 'Line 2: Initialize minIdx = i = 0 (value 64).',
  },
  {
    activeLine: 3,
    i: 0,
    minIdx: 0,
    j: 1,
    array: [64, 25, 12, 22, 11],
    state: { i: 0, minIdx: 0, j: 1, 'arr[1]': 25 },
    desc: 'Line 3: Inner loop j = 1 to scan unsorted elements.',
  },
  {
    activeLine: 4,
    i: 0,
    minIdx: 1,
    j: 1,
    array: [64, 25, 12, 22, 11],
    state: { i: 0, minIdx: 1, 'minVal': 25, comparison: '25 < 64 (New Min!)' },
    desc: 'Line 4: arr[1]=25 < minVal=64 → Update minIdx = 1 (value 25).',
  },
  {
    activeLine: 3,
    i: 0,
    minIdx: 1,
    j: 2,
    array: [64, 25, 12, 22, 11],
    state: { i: 0, minIdx: 1, j: 2, 'arr[2]': 12 },
    desc: 'Line 3: Inner loop j increments to 2.',
  },
  {
    activeLine: 4,
    i: 0,
    minIdx: 2,
    j: 2,
    array: [64, 25, 12, 22, 11],
    state: { i: 0, minIdx: 2, 'minVal': 12, comparison: '12 < 25 (New Min!)' },
    desc: 'Line 4: arr[2]=12 < minVal=25 → Update minIdx = 2 (value 12).',
  },
  {
    activeLine: 3,
    i: 0,
    minIdx: 2,
    j: 4,
    array: [64, 25, 12, 22, 11],
    state: { i: 0, minIdx: 2, j: 4, 'arr[4]': 11 },
    desc: 'Line 3: Inner loop j reaches 4 (value 11).',
  },
  {
    activeLine: 4,
    i: 0,
    minIdx: 4,
    j: 4,
    array: [64, 25, 12, 22, 11],
    state: { i: 0, minIdx: 4, 'minVal': 11, comparison: '11 < 12 (New Min!)' },
    desc: 'Line 4: arr[4]=11 < minVal=12 → Update minIdx = 4 (value 11).',
  },
  {
    activeLine: 6,
    i: 0,
    minIdx: 4,
    j: 4,
    array: [11, 25, 12, 22, 64],
    state: { i: 0, swapped: '64 ↔ 11', sortedPrefix: '[11]' },
    desc: 'Line 6: Swap arr[0] (64) with arr[minIdx] (11). First element 11 is now sorted!',
  },
  {
    activeLine: 6,
    i: 3,
    minIdx: 3,
    j: 4,
    array: [11, 12, 22, 25, 64],
    state: { result: '[11, 12, 22, 25, 64]', status: 'SORTED 🎉' },
    desc: 'Line 6: All selection passes complete! Array sorted: [11, 12, 22, 25, 64]! 🎉',
  },
];

const INSERTION_SORT_STEPS = [
  {
    activeLine: 1,
    i: 1,
    j: 0,
    array: [12, 11, 13, 5, 6],
    state: { i: 1, key: 11, 'arr[0]': 12, comparison: '12 > 11' },
    desc: 'Line 1: Outer loop i = 1.',
  },
  {
    activeLine: 2,
    i: 1,
    j: 0,
    array: [12, 11, 13, 5, 6],
    state: { i: 1, key: 11, j: 0 },
    desc: 'Line 2: Pick key = arr[1] = 11. Initialize j = i - 1 = 0.',
  },
  {
    activeLine: 4,
    i: 1,
    j: 0,
    array: [12, 11, 13, 5, 6],
    state: { i: 1, key: 11, j: 0, 'arr[0]': 12, condition: '12 > 11 (TRUE ✅)' },
    desc: 'Line 4: Check while loop: j >= 0 and arr[0]=12 > key=11? TRUE.',
  },
  {
    activeLine: 5,
    i: 1,
    j: 0,
    array: [12, 12, 13, 5, 6],
    state: { i: 1, j: 0, key: 11, action: 'shift 12 right' },
    desc: 'Line 5: Shift 12 right to index 1.',
  },
  {
    activeLine: 6,
    i: 1,
    j: -1,
    array: [12, 12, 13, 5, 6],
    state: { i: 1, j: -1, action: 'j decremented to -1' },
    desc: 'Line 6: Decrement j to -1. While loop terminates.',
  },
  {
    activeLine: 7,
    i: 1,
    j: -1,
    array: [11, 12, 13, 5, 6],
    state: { i: 1, key: 11, placedAt: 'arr[0]' },
    desc: 'Line 7: Insert key 11 into index 0 (j + 1). Sorted prefix: [11, 12].',
  },
  {
    activeLine: 7,
    i: 4,
    j: 0,
    array: [5, 6, 11, 12, 13],
    state: { result: '[5, 6, 11, 12, 13]', status: 'SORTED 🎉' },
    desc: 'Line 7: Insertion passes complete! Array sorted: [5, 6, 11, 12, 13]! 🎉',
  },
];

const QUICK_SORT_STEPS = [
  {
    activeLine: 1,
    pivot: 6,
    i: -1,
    j: 0,
    array: [10, 80, 30, 90, 40, 50, 70],
    state: { pivotVal: 70, pivotIdx: 6, i: -1, j: 0, 'arr[0]': 10 },
    desc: 'Line 1: Select pivot = arr[high] = 70 (index 6).',
  },
  {
    activeLine: 2,
    pivot: 6,
    i: -1,
    j: 0,
    array: [10, 80, 30, 90, 40, 50, 70],
    state: { i: -1 },
    desc: 'Line 2: Initialize i = low - 1 = -1.',
  },
  {
    activeLine: 3,
    pivot: 6,
    i: -1,
    j: 0,
    array: [10, 80, 30, 90, 40, 50, 70],
    state: { pivotVal: 70, j: 0, 'arr[0]': 10 },
    desc: 'Line 3: Loop j = 0 to scan elements relative to pivot 70.',
  },
  {
    activeLine: 4,
    pivot: 6,
    i: -1,
    j: 0,
    array: [10, 80, 30, 90, 40, 50, 70],
    state: { pivotVal: 70, j: 0, 'arr[0]': 10, condition: '10 <= 70 (TRUE ✅)' },
    desc: 'Line 4: Check if arr[0]=10 <= 70? TRUE.',
  },
  {
    activeLine: 5,
    pivot: 6,
    i: 0,
    j: 0,
    array: [10, 80, 30, 90, 40, 50, 70],
    state: { i: 0, j: 0 },
    desc: 'Line 5: Increment i to 0.',
  },
  {
    activeLine: 6,
    pivot: 6,
    i: 0,
    j: 0,
    array: [10, 80, 30, 90, 40, 50, 70],
    state: { i: 0, j: 0, swapped: 'arr[0] ↔ arr[0]' },
    desc: 'Line 6: Swap arr[i] with arr[j] (10 stays at index 0).',
  },
  {
    activeLine: 7,
    pivot: 4,
    i: 4,
    j: 6,
    array: [10, 30, 40, 50, 70, 90, 80],
    state: { pivotPlaced: '70 at index 4', result: '[10, 30, 40, 50, 70, 80, 90]', status: 'PARTITIONED 🎉' },
    desc: 'Line 7: Swap pivot 70 into correct position (index 4). Partition complete! 🎉',
  },
];

const MERGE_SORT_STEPS = [
  {
    activeLine: 1,
    left: 0,
    right: 6,
    array: [38, 27, 43, 3, 9, 82, 10],
    state: { low: 0, high: 6, condition: '0 < 6 (TRUE ✅)' },
    desc: 'Line 1: Check low < high (0 < 6 is TRUE).',
  },
  {
    activeLine: 2,
    left: 0,
    right: 6,
    array: [38, 27, 43, 3, 9, 82, 10],
    state: { low: 0, high: 6, mid: 3 },
    desc: 'Line 2: Calculate mid = (0 + 6) / 2 = 3.',
  },
  {
    activeLine: 3,
    left: 0,
    right: 3,
    array: [3, 27, 38, 43, 9, 82, 10],
    state: { leftSorted: '[3, 27, 38, 43]', rightUnsorted: '[9, 82, 10]' },
    desc: 'Line 3: Recursively sort left sub-array [0..3] → [3, 27, 38, 43].',
  },
  {
    activeLine: 4,
    left: 4,
    right: 6,
    array: [3, 27, 38, 43, 9, 10, 82],
    state: { leftSorted: '[3, 27, 38, 43]', rightSorted: '[9, 10, 82]' },
    desc: 'Line 4: Recursively sort right sub-array [4..6] → [9, 10, 82].',
  },
  {
    activeLine: 5,
    left: 0,
    right: 6,
    array: [3, 9, 10, 27, 38, 43, 82],
    state: { merged: '[3, 9, 10, 27, 38, 43, 82]', status: 'MERGE COMPLETE 🎉' },
    desc: 'Line 5: Merge sorted left and right halves into final sorted array! 🎉',
  },
];

export const useSortingStore = create((set, get) => ({
  track: 'bubble-sort',
  array: [29, 10, 14, 37, 14],
  steps: BUBBLE_SORT_STEPS,
  currentStep: 0,
  isPlaying: false,
  speed: 1,
  practiceMode: false,
  userCode: `// Write your pseudocode or solution here\nfunction sort(arr) {\n  // your sorting logic here\n}`,

  setTrack: (track) => {
    if (track === 'bubble-sort') {
      set({ track: 'bubble-sort', array: [29, 10, 14, 37, 14], steps: BUBBLE_SORT_STEPS, currentStep: 0, isPlaying: false });
    } else if (track === 'selection-sort') {
      set({ track: 'selection-sort', array: [64, 25, 12, 22, 11], steps: SELECTION_SORT_STEPS, currentStep: 0, isPlaying: false });
    } else if (track === 'insertion-sort') {
      set({ track: 'insertion-sort', array: [12, 11, 13, 5, 6], steps: INSERTION_SORT_STEPS, currentStep: 0, isPlaying: false });
    } else if (track === 'quick-sort') {
      set({ track: 'quick-sort', array: [10, 80, 30, 90, 40, 50, 70], steps: QUICK_SORT_STEPS, currentStep: 0, isPlaying: false });
    } else if (track === 'merge-sort') {
      set({ track: 'merge-sort', array: [38, 27, 43, 3, 9, 82, 10], steps: MERGE_SORT_STEPS, currentStep: 0, isPlaying: false });
    }
  },

  setCurrentStep: (step) => {
    const { steps } = get();
    if (step >= 0 && step < steps.length) {
      const targetStep = steps[step];
      const newArray = targetStep.array || get().array;
      set({ currentStep: step, array: newArray });
    }
  },

  nextStep: () => {
    const { currentStep, steps } = get();
    if (currentStep < steps.length - 1) {
      const nextIndex = currentStep + 1;
      const targetStep = steps[nextIndex];
      const newArray = targetStep.array || get().array;
      set({ currentStep: nextIndex, array: newArray });
    } else {
      set({ isPlaying: false });
    }
  },

  prevStep: () => {
    const { currentStep, steps } = get();
    if (currentStep > 0) {
      const prevIndex = currentStep - 1;
      const targetStep = steps[prevIndex];
      const newArray = targetStep.array || get().array;
      set({ currentStep: prevIndex, array: newArray });
    }
  },

  restart: () => {
    const { steps } = get();
    const initialArray = steps[0].array || get().array;
    set({ currentStep: 0, array: initialArray, isPlaying: false });
  },

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setSpeed: (s) => set({ speed: s }),
  togglePracticeMode: () => set((state) => ({ practiceMode: !state.practiceMode })),
  setUserCode: (code) => set({ userCode: code }),
}));
