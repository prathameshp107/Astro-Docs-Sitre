import { create } from 'zustand';

export const useDPStore = create((set, get) => ({
  table: [],
  highlighted: [],
  steps: [],
  currentExample: 'fibonacci',
  isAnimating: false,
  result: null,

  setExample: (ex) => set({ currentExample: ex, table: [], highlighted: [], steps: [], isAnimating: false, result: null }),

  runFibonacci: async (n, delay = 500) => {
    const table = new Array(n + 1).fill(0);
    const steps = [];
    table[0] = 0;
    if (n >= 1) table[1] = 1;      steps.push({ table: [...table], highlight: [0, 1], desc: 'Base cases: fib(0) = 0, fib(1) = 1' });
    for (let i = 2; i <= n; i++) {
      table[i] = table[i - 1] + table[i - 2];
      steps.push({ table: [...table], highlight: [i, i - 1, i - 2], desc: `fib(${i}) = fib(${i - 1}) + fib(${i - 2}) = ${table[i - 1]} + ${table[i - 2]} = ${table[i]}` });
    }
    set({ isAnimating: true, result: table[n] });
    for (let i = 0; i < steps.length; i++) {
      if (!get().isAnimating) break;
      await new Promise(r => setTimeout(r, delay));
      set({ table: steps[i].table, highlighted: steps[i].highlight, currentStep: i + 1, desc: steps[i].desc });
    }
    set({ isAnimating: false, highlighted: [] });
  },

  runKnapsack: async (capacity, delay = 100) => {
    const weights = [2, 3, 4, 5];
    const values = [3, 4, 5, 6];
    const n = weights.length;
    const table = Array.from({ length: n + 1 }, () => new Array(capacity + 1).fill(0));
    const steps = [];
    for (let i = 1; i <= n; i++) {
      for (let w = 0; w <= capacity; w++) {
        if (weights[i - 1] <= w) {
          table[i][w] = Math.max(values[i - 1] + table[i - 1][w - weights[i - 1]], table[i - 1][w]);
        } else {
          table[i][w] = table[i - 1][w];
        }
        steps.push({ table: table.map(r => [...r]), highlight: [i, w], desc: `Item ${i} (w=${weights[i - 1]}, v=${values[i - 1]}), cap=${w}: max = ${table[i][w]}` });
      }
    }
    set({ isAnimating: true, result: table[n][capacity] });
    for (let i = 0; i < steps.length; i++) {
      if (!get().isAnimating) break;
      await new Promise(r => setTimeout(r, delay));
      set({ table: steps[i].table, highlighted: steps[i].highlight, currentStep: i + 1, desc: steps[i].desc });
    }
    set({ isAnimating: false, highlighted: [] });
  },

  runLCS: async (delay = 80) => {
    const str1 = 'ABCDEF';
    const str2 = 'ACBEDF';
    const m = str1.length, n = str2.length;
    const table = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    const steps = [];
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (str1[i - 1] === str2[j - 1]) {
          table[i][j] = table[i - 1][j - 1] + 1;
        } else {
          table[i][j] = Math.max(table[i - 1][j], table[i][j - 1]);
        }
        steps.push({ table: table.map(r => [...r]), highlight: [i, j], desc: `Comparing '${str1[i - 1]}' vs '${str2[j - 1]}': table[${i}][${j}] = ${table[i][j]}` });
      }
    }
    set({ isAnimating: true, result: table[m][n] });
    for (let i = 0; i < steps.length; i++) {
      if (!get().isAnimating) break;
      await new Promise(r => setTimeout(r, delay));
      set({ table: steps[i].table, highlighted: steps[i].highlight, currentStep: i + 1, desc: steps[i].desc });
    }
    set({ isAnimating: false, highlighted: [] });
  },

  runCoinChange: async (amount, delay = 200) => {
    const coins = [1, 2, 5, 10];
    const table = new Array(amount + 1).fill(Infinity);
    table[0] = 0;
    const steps = [];
    for (let i = 1; i <= amount; i++) {
      for (const coin of coins) {
        if (coin <= i) {
          table[i] = Math.min(table[i], 1 + table[i - coin]);
        }
      }
      steps.push({ table: [...table], highlight: [i], desc: `Amount ${i}: min coins = ${table[i]}` });
    }
    set({ isAnimating: true, result: table[amount] === Infinity ? -1 : table[amount] });
    for (let i = 0; i < steps.length; i++) {
      if (!get().isAnimating) break;
      await new Promise(r => setTimeout(r, delay));
      set({ table: steps[i].table, highlighted: steps[i].highlight, currentStep: i + 1, desc: steps[i].desc });
    }
    set({ isAnimating: false, highlighted: [] });
  },

  stopAnimation: () => set({ isAnimating: false, highlighted: [], currentStep: 0 }),
}));

// ─── Searching Store ───
