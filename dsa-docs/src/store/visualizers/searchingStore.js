import { create } from 'zustand';

const LINEAR_SEARCH_STEPS = [
  {
    activeLine: 1,
    i: 0,
    array: [12, 45, 67, 23, 89, 34],
    state: { target: 23, i: 0, 'arr[0]': 12 },
    desc: 'Line 1: Loop i = 0. Inspect first element arr[0] = 12.',
  },
  {
    activeLine: 2,
    i: 0,
    array: [12, 45, 67, 23, 89, 34],
    state: { target: 23, i: 0, 'arr[0]': 12, condition: '12 == 23 (FALSE ❌)' },
    desc: 'Line 2: Check condition: arr[0]=12 == target=23? FALSE. Skip return branch.',
  },
  {
    activeLine: 1,
    i: 1,
    array: [12, 45, 67, 23, 89, 34],
    state: { target: 23, i: 1, 'arr[1]': 45 },
    desc: 'Line 1: Loop i increments to 1. Inspect arr[1] = 45.',
  },
  {
    activeLine: 2,
    i: 1,
    array: [12, 45, 67, 23, 89, 34],
    state: { target: 23, i: 1, 'arr[1]': 45, condition: '45 == 23 (FALSE ❌)' },
    desc: 'Line 2: Check condition: arr[1]=45 == target=23? FALSE. Skip return branch.',
  },
  {
    activeLine: 1,
    i: 2,
    array: [12, 45, 67, 23, 89, 34],
    state: { target: 23, i: 2, 'arr[2]': 67 },
    desc: 'Line 1: Loop i increments to 2. Inspect arr[2] = 67.',
  },
  {
    activeLine: 2,
    i: 2,
    array: [12, 45, 67, 23, 89, 34],
    state: { target: 23, i: 2, 'arr[2]': 67, condition: '67 == 23 (FALSE ❌)' },
    desc: 'Line 2: Check condition: arr[2]=67 == target=23? FALSE. Skip return branch.',
  },
  {
    activeLine: 1,
    i: 3,
    array: [12, 45, 67, 23, 89, 34],
    state: { target: 23, i: 3, 'arr[3]': 23 },
    desc: 'Line 1: Loop i increments to 3. Inspect arr[3] = 23.',
  },
  {
    activeLine: 2,
    i: 3,
    array: [12, 45, 67, 23, 89, 34],
    state: { target: 23, i: 3, 'arr[3]': 23, condition: '23 == 23 (TRUE ✅)' },
    desc: 'Line 2: Check condition: arr[3]=23 == target=23? TRUE ✅! Enter return branch.',
  },
  {
    activeLine: 3,
    i: 3,
    array: [12, 45, 67, 23, 89, 34],
    state: { target: 23, foundIndex: 3, status: 'MATCH FOUND ✅' },
    desc: 'Line 3: Return index 3! Target 23 found at index 3 in O(n) time. 🎉',
  },
];

const BINARY_SEARCH_STEPS = [
  {
    activeLine: 1,
    low: 0,
    high: 9,
    mid: null,
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    state: { target: 23, low: 0, high: 9, 'arr[0]': 2, 'arr[9]': 91 },
    desc: 'Line 1: Initialize low = 0 (value 2) and high = 9 (value 91).',
  },
  {
    activeLine: 2,
    low: 0,
    high: 9,
    mid: null,
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    state: { target: 23, low: 0, high: 9, condition: '0 <= 9 (TRUE ✅)' },
    desc: 'Line 2: Check while loop: low (0) <= high (9) is TRUE. Enter loop.',
  },
  {
    activeLine: 3,
    low: 0,
    high: 9,
    mid: 4,
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    state: { target: 23, low: 0, high: 9, mid: 4, 'arr[4]': 16 },
    desc: 'Line 3: Calculate mid = 0 + (9 - 0) / 2 = 4 (value 16).',
  },
  {
    activeLine: 4,
    low: 0,
    high: 9,
    mid: 4,
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    state: { target: 23, mid: 4, 'arr[4]': 16, condition: '16 == 23 (FALSE ❌)' },
    desc: 'Line 4: Check if arr[mid]=16 == target=23? FALSE.',
  },
  {
    activeLine: 6,
    low: 0,
    high: 9,
    mid: 4,
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    state: { target: 23, mid: 4, 'arr[4]': 16, condition: '16 < 23 (TRUE ✅)' },
    desc: 'Line 6: Check else if arr[mid]=16 < target=23? TRUE (Target is in right half).',
  },
  {
    activeLine: 7,
    low: 5,
    high: 9,
    mid: 4,
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    state: { target: 23, low: 5, high: 9, action: 'low = mid + 1 = 5' },
    desc: 'Line 7: Shift search boundary right: low = mid + 1 = 5 (value 23).',
  },
  {
    activeLine: 2,
    low: 5,
    high: 9,
    mid: null,
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    state: { target: 23, low: 5, high: 9, condition: '5 <= 9 (TRUE ✅)' },
    desc: 'Line 2: Check while loop: low (5) <= high (9) is TRUE.',
  },
  {
    activeLine: 3,
    low: 5,
    high: 9,
    mid: 7,
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    state: { target: 23, low: 5, high: 9, mid: 7, 'arr[7]': 56 },
    desc: 'Line 3: Calculate mid = 5 + (9 - 5) / 2 = 7 (value 56).',
  },
  {
    activeLine: 4,
    low: 5,
    high: 9,
    mid: 7,
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    state: { target: 23, mid: 7, 'arr[7]': 56, condition: '56 == 23 (FALSE ❌)' },
    desc: 'Line 4: Check if arr[mid]=56 == target=23? FALSE.',
  },
  {
    activeLine: 6,
    low: 5,
    high: 9,
    mid: 7,
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    state: { target: 23, mid: 7, 'arr[7]': 56, condition: '56 < 23 (FALSE ❌)' },
    desc: 'Line 6: Check else if arr[mid]=56 < target=23? FALSE.',
  },
  {
    activeLine: 8,
    low: 5,
    high: 9,
    mid: 7,
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    state: { target: 23, branch: 'else (56 > 23)' },
    desc: 'Line 8: Enter else branch (target is in left sub-half).',
  },
  {
    activeLine: 9,
    low: 5,
    high: 6,
    mid: 7,
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    state: { target: 23, low: 5, high: 6, action: 'high = mid - 1 = 6' },
    desc: 'Line 9: Shift search boundary left: high = mid - 1 = 6 (value 38).',
  },
  {
    activeLine: 2,
    low: 5,
    high: 6,
    mid: null,
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    state: { target: 23, low: 5, high: 6, condition: '5 <= 6 (TRUE ✅)' },
    desc: 'Line 2: Check while loop: low (5) <= high (6) is TRUE.',
  },
  {
    activeLine: 3,
    low: 5,
    high: 6,
    mid: 5,
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    state: { target: 23, low: 5, high: 6, mid: 5, 'arr[5]': 23 },
    desc: 'Line 3: Calculate mid = 5 + (6 - 5) / 2 = 5 (value 23).',
  },
  {
    activeLine: 4,
    low: 5,
    high: 6,
    mid: 5,
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    state: { target: 23, mid: 5, 'arr[5]': 23, condition: '23 == 23 (TRUE ✅)' },
    desc: 'Line 4: Check if arr[mid]=23 == target=23? TRUE ✅!',
  },
  {
    activeLine: 5,
    low: 5,
    high: 6,
    mid: 5,
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    state: { target: 23, foundIndex: 5, status: 'MATCH FOUND ✅' },
    desc: 'Line 5: Return index 5! Target 23 found in O(log n) time. 🎉',
  },
];

export const useSearchingStore = create((set, get) => ({
  track: 'linear-search',
  array: [12, 45, 67, 23, 89, 34],
  steps: LINEAR_SEARCH_STEPS,
  currentStep: 0,
  isPlaying: false,
  speed: 1,
  practiceMode: false,
  userCode: `// Write your pseudocode or solution here\nfunction search(arr, target) {\n  // your search logic here\n}`,

  setTrack: (track) => {
    if (track === 'linear-search') {
      set({ track: 'linear-search', array: [12, 45, 67, 23, 89, 34], steps: LINEAR_SEARCH_STEPS, currentStep: 0, isPlaying: false });
    } else if (track === 'binary-search') {
      set({ track: 'binary-search', array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91], steps: BINARY_SEARCH_STEPS, currentStep: 0, isPlaying: false });
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
