import { create } from 'zustand';

export const useArrayStore = create((set, get) => ({
  array: [42, 17, 56, 3, 89, 24, 61, 8, 35, 72],
  highlighted: [],
  selected: null,
  setArray: (arr) => set({ array: arr, highlighted: [], selected: null }),
  insert: (value, index) => {
    const arr = [...get().array];
    arr.splice(index, index >= 0 ? 0 : arr.length, value);
    set({ array: arr, highlighted: [index >= 0 ? index : arr.length - 1] });
  },
  deleteAt: (index) => {
    const arr = [...get().array];
    if (index >= 0 && index < arr.length) { arr.splice(index, 1); set({ array: arr, highlighted: [] }); }
  },
  update: (index, value) => {
    const arr = [...get().array];
    if (index >= 0 && index < arr.length) { arr[index] = value; set({ array: arr, highlighted: [index] }); }
  },
  search: (value) => {
    const arr = get().array;
    const idx = arr.indexOf(value);
    set({ selected: idx, highlighted: idx >= 0 ? [idx] : [] });
    return idx;
  },
  randomize: () => set({ array: Array.from({ length: 10 }, () => Math.floor(Math.random() * 90) + 1), highlighted: [], selected: null }),
  generateSorted: () => set({ array: Array.from({ length: 10 }, (_, i) => (i + 1) * 5), highlighted: [], selected: null }),
}));

// ─── Sorting Store ───
