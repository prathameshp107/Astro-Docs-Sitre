import { create } from 'zustand';

export const useHeapStore = create((set, get) => ({
  heap: [],
  heapType: 'min',
  highlighted: [],
  lastOperation: null,

  setHeapType: (type) => {
    set({ heapType: type });
    get().initialize();
  },

  initialize: () => {
    const values = [20, 35, 18, 42, 10, 27, 15, 30, 5, 22];
    let heap = [];
    values.forEach(v => {
      heap.push(v);
      let i = heap.length - 1;
      while (i > 0) {
        const parent = Math.floor((i - 1) / 2);
        if ((get().heapType === 'min' ? heap[i] < heap[parent] : heap[i] > heap[parent])) {
          [heap[i], heap[parent]] = [heap[parent], heap[i]];
          i = parent;
        } else break;
      }
    });
    set({ heap, highlighted: [], lastOperation: null });
  },

  insert: (value) => {
    const { heap, heapType } = get();
    const newHeap = [...heap, value];
    let i = newHeap.length - 1;
    const path = [i];
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (heapType === 'min' ? newHeap[i] < newHeap[parent] : newHeap[i] > newHeap[parent]) {
        [newHeap[i], newHeap[parent]] = [newHeap[parent], newHeap[i]];
        i = parent;
        path.push(i);
      } else break;
    }
    set({ heap: newHeap, highlighted: path, lastOperation: { type: 'insert', value } });
    setTimeout(() => set({ highlighted: [] }), 1000);
  },

  extract: () => {
    const { heap, heapType } = get();
    if (heap.length === 0) return null;
    if (heap.length === 1) {
      const val = heap[0];
      set({ heap: [], highlighted: [], lastOperation: { type: 'extract', value: val } });
      return val;
    }
    const root = heap[0];
    const newHeap = [heap[heap.length - 1], ...heap.slice(1, -1)];
    let i = 0;
    const path = [i];
    while (true) {
      let smallest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      if (left < newHeap.length && (heapType === 'min' ? newHeap[left] < newHeap[smallest] : newHeap[left] > newHeap[smallest])) smallest = left;
      if (right < newHeap.length && (heapType === 'min' ? newHeap[right] < newHeap[smallest] : newHeap[right] > newHeap[smallest])) smallest = right;
      if (smallest !== i) {
        [newHeap[i], newHeap[smallest]] = [newHeap[smallest], newHeap[i]];
        i = smallest;
        path.push(i);
      } else break;
    }
    set({ heap: newHeap, highlighted: path, lastOperation: { type: 'extract', value: root } });
    setTimeout(() => set({ highlighted: [] }), 1000);
    return root;
  },

  randomInsert: () => {
    const val = Math.floor(Math.random() * 50) + 1;
    get().insert(val);
  },
}));

// ─── Recursion Store ───
