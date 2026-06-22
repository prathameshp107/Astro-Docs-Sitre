import { create } from 'zustand';

export const useQueueStore = create((set, get) => ({
  queue: [],
  frontIdx: 0,
  operations: [],
  highlighted: -1,
  enqueue: (value) => {
    const queue = [...get().queue, value];
    const operations = [...get().operations, { type: 'enqueue', value, timestamp: Date.now() }];
    set({ queue, highlighted: queue.length - 1, operations: operations.slice(-20) });
    setTimeout(() => { const s = get(); if (s.highlighted === queue.length - 1) set({ highlighted: -1 }); }, 600);
  },
  dequeue: () => {
    const { queue, frontIdx } = get();
    if (frontIdx >= queue.length) return null;
    const value = queue[frontIdx];
    const operations = [...get().operations, { type: 'dequeue', value, timestamp: Date.now() }];
    set({ frontIdx: frontIdx + 1, highlighted: frontIdx, operations: operations.slice(-20) });
    setTimeout(() => { const s = get(); if (s.highlighted === frontIdx) set({ highlighted: -1 }); }, 600);
    return value;
  },
  peek: () => {
    const { queue, frontIdx } = get();
    if (frontIdx >= queue.length) return null;
    set({ highlighted: frontIdx });
    setTimeout(() => set({ highlighted: -1 }), 800);
    return queue[frontIdx];
  },
  clear: () => set({ queue: [], frontIdx: 0, operations: [], highlighted: -1 }),
  randomEnqueue: () => {
    const val = Math.floor(Math.random() * 90) + 10;
    get().enqueue(val);
  },
  getActiveQueue: () => get().queue.slice(get().frontIdx),
}));

