import { create } from 'zustand';

const ACCESS_STEPS = [
  {
    activeLine: 1,
    index: 0,
    array: [10, 25, 42, 58, 73, 89],
    state: { targetIndex: 3, index: 0, 'arr[0]': 10 },
    desc: 'Line 1: Set index = targetIndex = 3.',
  },
  {
    activeLine: 2,
    index: 3,
    array: [10, 25, 42, 58, 73, 89],
    state: { targetIndex: 3, index: 3, 'arr[3]': 58, complexity: 'O(1)' },
    desc: 'Line 2: Return arr[3] = 58 in O(1) memory lookup time! 🎉',
  },
];

const INSERT_STEPS = [
  {
    activeLine: 1,
    index: 3,
    array: [10, 20, 30, 40, null],
    state: { value: 99, insertIndex: 2, n: 4, i: 3 },
    desc: 'Line 1: Loop i from n - 1 (3) down to insertIndex (2).',
  },
  {
    activeLine: 2,
    index: 3,
    array: [10, 20, 30, 40, 40],
    state: { i: 3, shift: 'arr[4] = arr[3] (40)' },
    desc: 'Line 2: Shift arr[3]=40 right into index 4.',
  },
  {
    activeLine: 1,
    index: 2,
    array: [10, 20, 30, 40, 40],
    state: { i: 2, insertIndex: 2 },
    desc: 'Line 1: Loop i decrements to 2.',
  },
  {
    activeLine: 2,
    index: 2,
    array: [10, 20, 30, 30, 40],
    state: { i: 2, shift: 'arr[3] = arr[2] (30)' },
    desc: 'Line 2: Shift arr[2]=30 right into index 3.',
  },
  {
    activeLine: 3,
    index: 2,
    array: [10, 20, 99, 30, 40],
    state: { insertIndex: 2, 'arr[2]': 99, status: 'INSERTED ✅' },
    desc: 'Line 3: Place new value 99 into vacated index 2.',
  },
  {
    activeLine: 4,
    index: 2,
    array: [10, 20, 99, 30, 40],
    state: { newSize: 5, array: '[10, 20, 99, 30, 40]', status: 'COMPLETE 🎉' },
    desc: 'Line 4: Increment array size n to 5. O(n) insertion complete! 🎉',
  },
];

const DELETE_STEPS = [
  {
    activeLine: 1,
    index: 1,
    array: [10, 20, 99, 30, 40],
    state: { deleteIndex: 1, 'target': 20, n: 5 },
    desc: 'Line 1: Target value to delete = arr[1] = 20.',
  },
  {
    activeLine: 2,
    index: 1,
    array: [10, 20, 99, 30, 40],
    state: { i: 1, deleteIndex: 1, limit: 3 },
    desc: 'Line 2: Loop i from index 1 to n - 2 (3).',
  },
  {
    activeLine: 3,
    index: 1,
    array: [10, 99, 99, 30, 40],
    state: { i: 1, copy: 'arr[1] = arr[2] (99)' },
    desc: 'Line 3: Copy arr[2]=99 left into index 1.',
  },
  {
    activeLine: 2,
    index: 2,
    array: [10, 99, 99, 30, 40],
    state: { i: 2 },
    desc: 'Line 2: Loop i increments to 2.',
  },
  {
    activeLine: 3,
    index: 2,
    array: [10, 99, 30, 40, 40],
    state: { i: 2, copy: 'arr[2] = arr[3] (30)' },
    desc: 'Line 3: Copy arr[3]=30 left into index 2.',
  },
  {
    activeLine: 4,
    index: 3,
    array: [10, 99, 30, 40],
    state: { newSize: 4, result: '[10, 99, 30, 40]', status: 'DELETED ✅' },
    desc: 'Line 4: Decrement array size n to 4. O(n) deletion complete! 🎉',
  },
];

const SEARCH_STEPS = [
  {
    activeLine: 1,
    index: 0,
    array: [12, 45, 67, 23, 89, 34],
    state: { target: 23, i: 0, 'arr[0]': 12 },
    desc: 'Line 1: Loop i = 0. Check element at index 0.',
  },
  {
    activeLine: 2,
    index: 0,
    array: [12, 45, 67, 23, 89, 34],
    state: { target: 23, i: 0, 'arr[0]': 12, condition: '12 == 23 (FALSE ❌)' },
    desc: 'Line 2: Check if arr[0]=12 == target=23? FALSE.',
  },
  {
    activeLine: 1,
    index: 1,
    array: [12, 45, 67, 23, 89, 34],
    state: { target: 23, i: 1, 'arr[1]': 45 },
    desc: 'Line 1: Loop i increments to 1.',
  },
  {
    activeLine: 2,
    index: 1,
    array: [12, 45, 67, 23, 89, 34],
    state: { target: 23, i: 1, 'arr[1]': 45, condition: '45 == 23 (FALSE ❌)' },
    desc: 'Line 2: Check if arr[1]=45 == target=23? FALSE.',
  },
  {
    activeLine: 1,
    index: 3,
    array: [12, 45, 67, 23, 89, 34],
    state: { target: 23, i: 3, 'arr[3]': 23 },
    desc: 'Line 1: Loop i reaches 3.',
  },
  {
    activeLine: 2,
    index: 3,
    array: [12, 45, 67, 23, 89, 34],
    state: { target: 23, i: 3, 'arr[3]': 23, condition: '23 == 23 (TRUE ✅)' },
    desc: 'Line 2: Check if arr[3]=23 == target=23? TRUE ✅!',
  },
  {
    activeLine: 3,
    index: 3,
    array: [12, 45, 67, 23, 89, 34],
    state: { returnIndex: 3, status: 'MATCH FOUND ✅' },
    desc: 'Line 3: Return index 3! Target 23 found at index 3. 🎉',
  },
];

const REVERSE_STEPS = [
  {
    activeLine: 1,
    left: 0,
    right: 5,
    array: [1, 2, 3, 4, 5, 6],
    state: { left: 0, right: 5, 'arr[0]': 1, 'arr[5]': 6 },
    desc: 'Line 1: Initialize left = 0 and right = 5.',
  },
  {
    activeLine: 2,
    left: 0,
    right: 5,
    array: [1, 2, 3, 4, 5, 6],
    state: { left: 0, right: 5, 'left < right': '0 < 5 (TRUE ✅)' },
    desc: 'Line 2: Check while loop: 0 < 5 is TRUE. Enter loop.',
  },
  {
    activeLine: 3,
    left: 0,
    right: 5,
    array: [6, 2, 3, 4, 5, 1],
    state: { left: 0, right: 5, swapped: '1 ↔ 6' },
    desc: 'Line 3: Swap arr[0] (1) and arr[5] (6).',
  },
  {
    activeLine: 4,
    left: 1,
    right: 4,
    array: [6, 2, 3, 4, 5, 1],
    state: { left: 1, right: 4 },
    desc: 'Line 4: Increment left to 1, decrement right to 4.',
  },
  {
    activeLine: 2,
    left: 1,
    right: 4,
    array: [6, 2, 3, 4, 5, 1],
    state: { left: 1, right: 4, 'left < right': '1 < 4 (TRUE ✅)' },
    desc: 'Line 2: Check while loop: 1 < 4 is TRUE.',
  },
  {
    activeLine: 3,
    left: 1,
    right: 4,
    array: [6, 5, 3, 4, 2, 1],
    state: { left: 1, right: 4, swapped: '2 ↔ 5' },
    desc: 'Line 3: Swap arr[1] (2) and arr[4] (5).',
  },
  {
    activeLine: 4,
    left: 2,
    right: 3,
    array: [6, 5, 3, 4, 2, 1],
    state: { left: 2, right: 3 },
    desc: 'Line 4: Increment left to 2, decrement right to 3.',
  },
  {
    activeLine: 3,
    left: 2,
    right: 3,
    array: [6, 5, 4, 3, 2, 1],
    state: { left: 2, right: 3, swapped: '3 ↔ 4', status: 'REVERSED 🎉' },
    desc: 'Line 3: Swap arr[2] (3) and arr[3] (4). Array reversed: [6, 5, 4, 3, 2, 1]! 🎉',
  },
];

const PREFIX_SUM_STEPS = [
  {
    activeLine: 1,
    index: 0,
    array: [2, 4, 1, 3, 5],
    state: { i: 0, 'arr[0]': 2, 'prefix[0]': 2 },
    desc: 'Line 1: Initialize prefix[0] = arr[0] = 2.',
  },
  {
    activeLine: 2,
    index: 1,
    array: [2, 4, 1, 3, 5],
    state: { i: 1, 'arr[1]': 4 },
    desc: 'Line 2: Loop i = 1 to n - 1.',
  },
  {
    activeLine: 3,
    index: 1,
    array: [2, 6, 1, 3, 5],
    state: { i: 1, 'prefix[1]': 'prefix[0] + arr[1] = 2 + 4 = 6' },
    desc: 'Line 3: Calculate prefix[1] = 2 + 4 = 6.',
  },
  {
    activeLine: 2,
    index: 2,
    array: [2, 6, 1, 3, 5],
    state: { i: 2, 'arr[2]': 1 },
    desc: 'Line 2: Loop i increments to 2.',
  },
  {
    activeLine: 3,
    index: 2,
    array: [2, 6, 7, 3, 5],
    state: { i: 2, 'prefix[2]': 'prefix[1] + arr[2] = 6 + 1 = 7' },
    desc: 'Line 3: Calculate prefix[2] = 6 + 1 = 7.',
  },
  {
    activeLine: 3,
    index: 4,
    array: [2, 6, 7, 10, 15],
    state: { i: 4, result: '[2, 6, 7, 10, 15]', status: 'COMPLETE 🎉' },
    desc: 'Line 3: Prefix sum complete! Result: [2, 6, 7, 10, 15]. 🎉',
  },
];

export const useArrayStore = create((set, get) => ({
  track: 'access',
  array: [10, 25, 42, 58, 73, 89],
  steps: ACCESS_STEPS,
  currentStep: 0,
  isPlaying: false,
  speed: 1,
  practiceMode: false,
  userCode: `// Write your pseudocode or solution here\nfunction arrayOp(arr) {\n  // your logic here\n}`,

  setTrack: (track) => {
    if (track === 'access') {
      set({ track: 'access', array: [10, 25, 42, 58, 73, 89], steps: ACCESS_STEPS, currentStep: 0, isPlaying: false });
    } else if (track === 'insert') {
      set({ track: 'insert', array: [10, 20, 30, 40, null], steps: INSERT_STEPS, currentStep: 0, isPlaying: false });
    } else if (track === 'delete') {
      set({ track: 'delete', array: [10, 20, 99, 30, 40], steps: DELETE_STEPS, currentStep: 0, isPlaying: false });
    } else if (track === 'search') {
      set({ track: 'search', array: [12, 45, 67, 23, 89, 34], steps: SEARCH_STEPS, currentStep: 0, isPlaying: false });
    } else if (track === 'reverse') {
      set({ track: 'reverse', array: [1, 2, 3, 4, 5, 6], steps: REVERSE_STEPS, currentStep: 0, isPlaying: false });
    } else if (track === 'prefix-sum') {
      set({ track: 'prefix-sum', array: [2, 4, 1, 3, 5], steps: PREFIX_SUM_STEPS, currentStep: 0, isPlaying: false });
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
