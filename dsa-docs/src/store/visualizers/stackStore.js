import { create } from 'zustand';

export const useStackStore = create((set, get) => ({
  stack: [],
  operations: [],
  highlighted: -1,
  push: (value) => {
    const stack = [...get().stack, value];
    const operations = [...get().operations, { type: 'push', value, timestamp: Date.now() }];
    set({ stack, highlighted: stack.length - 1, operations: operations.slice(-20) });
  },
  pop: () => {
    const stack = [...get().stack];
    if (stack.length === 0) return null;
    const value = stack.pop();
    const operations = [...get().operations, { type: 'pop', value, timestamp: Date.now() }];
    set({ stack, highlighted: -1, operations: operations.slice(-20) });
    return value;
  },
  peek: () => {
    const stack = get().stack;
    if (stack.length === 0) return null;
    set({ highlighted: stack.length - 1 });
    setTimeout(() => set({ highlighted: -1 }), 800);
    return stack[stack.length - 1];
  },
  clear: () => set({ stack: [], operations: [], highlighted: -1 }),
  randomPush: () => {
    const val = Math.floor(Math.random() * 90) + 10;
    get().push(val);
  },
}));

// ─── Queue Store ───
