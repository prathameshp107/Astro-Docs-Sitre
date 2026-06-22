import { create } from 'zustand';

export const useRecursionStore = create((set, get) => ({
  callStack: [],
  returnValues: [],
  highlighted: -1,
  currentExample: 'factorial',
  isAnimating: false,

  setExample: (ex) => set({ currentExample: ex, callStack: [], returnValues: [], highlighted: -1, isAnimating: false }),

  runFactorial: async (n, delay = 400) => {
    const steps = [];
    function fact(x, depth) {
      steps.push({ type: 'call', func: `fact(${x})`, depth, line: `if (${x} <= 1) return 1` });
      if (x <= 1) {
        steps.push({ type: 'return', func: `fact(${x})`, depth, value: 1, line: 'return 1' });
        return 1;
      }
      steps.push({ type: 'compute', func: `fact(${x})`, depth, line: `${x} * fact(${x - 1})` });
      const result = x * fact(x - 1, depth + 1);
      steps.push({ type: 'return', func: `fact(${x})`, depth, value: result, line: `return ${x} * ${result / x} = ${result}` });
      return result;
    }
    fact(n, 0);
    set({ isAnimating: true });
    for (let i = 0; i < steps.length; i++) {
      await new Promise(r => setTimeout(r, delay));
      if (!get().isAnimating) break;
      const step = steps[i];
      if (step.type === 'call') {
        set({ callStack: [...get().callStack, { func: step.func, depth: step.depth, line: step.line }], highlighted: i, returnValues: [...get().returnValues, ...(step.type === 'return' ? [{ func: step.func, value: step.value }] : [])] });
      } else if (step.type === 'return') {
        const stack = [...get().callStack];
        stack.pop();
        set({ callStack: stack, highlighted: i, returnValues: [...get().returnValues, { func: step.func, value: step.value }] });
      } else {
        set({ highlighted: i });
      }
    }
    set({ isAnimating: false });
  },

  runFibonacci: async (n, delay = 350) => {
    const steps = [];
    function fib(x, depth) {
      steps.push({ type: 'call', func: `fib(${x})`, depth, line: `if (${x} <= 1) return ${x}` });
      if (x <= 1) {
        steps.push({ type: 'return', func: `fib(${x})`, depth, value: x, line: `return ${x}` });
        return x;
      }
      const left = fib(x - 1, depth + 1);
      const right = fib(x - 2, depth + 1);
      steps.push({ type: 'return', func: `fib(${x})`, depth, value: left + right, line: `fib(${x}) = ${left} + ${right} = ${left + right}` });
      return left + right;
    }
    fib(n, 0);
    set({ isAnimating: true });
    for (let i = 0; i < steps.length; i++) {
      await new Promise(r => setTimeout(r, delay));
      if (!get().isAnimating) break;
      const step = steps[i];
      if (step.type === 'call') {
        set({ callStack: [...get().callStack, { func: step.func, depth: step.depth, line: step.line }], highlighted: i });
      } else {
        const stack = [...get().callStack];
        stack.pop();
        set({ callStack: stack, highlighted: i, returnValues: [...get().returnValues, { func: step.func, value: step.value }] });
      }
    }
    set({ isAnimating: false });
  },

  runHanoi: async (n, delay = 500) => {
    const steps = [];
    function hanoi(disks, from, to, aux, depth) {
      if (disks === 1) {
        steps.push({ type: 'call', func: `Move disk 1: ${from} → ${to}`, depth, line: `Move disk from ${from} to ${to}` });
        return;
      }
      steps.push({ type: 'call', func: `Move ${disks} disks: ${from} → ${to}`, depth, line: `Move ${disks - 1} disks ${from} → ${aux}` });
      hanoi(disks - 1, from, aux, to, depth + 1);
      steps.push({ type: 'call', func: `Move disk ${disks}: ${from} → ${to}`, depth, line: `Move disk from ${from} to ${to}` });
      hanoi(disks - 1, aux, to, from, depth + 1);
      steps.push({ type: 'return', func: `Done: ${from} → ${to}`, depth, value: true, line: `Moved ${disks} disks from ${from} to ${to}` });
    }
    hanoi(n, 'A', 'C', 'B', 0);
    set({ isAnimating: true, callStack: [], returnValues: [] });
    for (let i = 0; i < steps.length; i++) {
      await new Promise(r => setTimeout(r, delay));
      if (!get().isAnimating) break;
      const step = steps[i];
      if (step.type === 'call') {
        set({ callStack: [...get().callStack, { func: step.func, depth: step.depth, line: step.line }], highlighted: i });
      } else {
        const stack = [...get().callStack];
        if (stack.length > 0) stack.pop();
        set({ callStack: stack, highlighted: i });
      }
    }
    set({ isAnimating: false });
  },

  stopAnimation: () => set({ isAnimating: false, callStack: [], returnValues: [], highlighted: -1 }),
}));

// ─── DP Store ───
