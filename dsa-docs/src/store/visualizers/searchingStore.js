import { create } from 'zustand';

export const useSearchingStore = create((set, get) => ({
  array: [3, 8, 12, 17, 22, 29, 35, 42, 50, 57, 63, 71, 78, 84, 91],
  steps: [],
  currentStep: -1,
  result: null,
  isAnimating: false,
  searchType: 'linear',

  setSearchType: (type) => set({ searchType: type, steps: [], currentStep: -1, result: null, isAnimating: false }),

  runLinearSearch: (target) => {
    const { array } = get();
    const steps = [];
    for (let i = 0; i < array.length; i++) {
      steps.push({ index: i, value: array[i], comparing: true, desc: `Checking index ${i}: value ${array[i]} ${array[i] === target ? '=== FOUND!' : `!== ${target}`}` });
      if (array[i] === target) {
        steps.push({ index: i, value: array[i], comparing: false, found: true, desc: `Found ${target} at index ${i}!` });
        break;
      }
    }
    if (!steps.some(s => s.found)) {
      steps.push({ index: -1, value: null, comparing: false, found: false, desc: `${target} not found in array` });
    }
    set({ steps, currentStep: -1, result: steps.some(s => s.found) });
    return steps;
  },

  runBinarySearch: (target) => {
    const { array } = get();
    const steps = [];
    let left = 0, right = array.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      steps.push({ index: mid, value: array[mid], comparing: true, left, right, mid, desc: `Searching [${left}..${right}], mid=${mid}: value ${array[mid]} ${array[mid] === target ? '=== FOUND!' : array[mid] < target ? `< ${target} → go right` : `> ${target} → go left`}` });
      if (array[mid] === target) {
        steps.push({ index: mid, value: array[mid], comparing: false, found: true, left, right, mid, desc: `Found ${target} at index ${mid}!` });
        break;
      } else if (array[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    if (!steps.some(s => s.found)) {
      steps.push({ index: -1, value: null, comparing: false, found: false, desc: `${target} not found in array` });
    }
    set({ steps, currentStep: -1, result: steps.some(s => s.found) });
    return steps;
  },

  runSearch: (target) => {
    const { searchType } = get();
    const steps = searchType === 'linear' ? get().runLinearSearch(target) : get().runBinarySearch(target);
    set({ isAnimating: true, currentStep: -1 });
    return steps;
  },

  nextStep: () => {
    const { currentStep, steps } = get();
    if (currentStep < steps.length - 1) {
      set({ currentStep: currentStep + 1 });
    } else {
      set({ isAnimating: false });
    }
  },

  resetSearch: () => set({ steps: [], currentStep: -1, result: null, isAnimating: false }),

  randomArray: () => {
    const arr = Array.from({ length: 15 }, () => Math.floor(Math.random() * 90) + 5);
    arr.sort((a, b) => a - b);
    set({ array: arr, steps: [], currentStep: -1, result: null, isAnimating: false });
  },
}));
