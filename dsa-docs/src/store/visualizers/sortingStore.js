import { create } from 'zustand';

export const useSortingStore = create((set, get) => ({
  array: Array.from({ length: 20 }, () => Math.floor(Math.random() * 100) + 1),
  comparing: [], swapping: [], sorted: [], isSorting: false, arraySize: 20, algorithm: 'bubble',
  setAlgorithm: (algo) => set({ algorithm: algo }),
  setArraySize: (size) => set({ array: Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1), comparing: [], swapping: [], sorted: [], isSorting: false, arraySize: size }),
  randomize: () => set({ array: Array.from({ length: get().arraySize }, () => Math.floor(Math.random() * 100) + 1), comparing: [], swapping: [], sorted: [], isSorting: false }),
  setState: (s) => set(s),
}));

// ─── Tree Store ───
