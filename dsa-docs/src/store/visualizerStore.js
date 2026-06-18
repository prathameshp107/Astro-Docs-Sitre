import { create } from 'zustand';

// ─── Progress Store ───
export const useProgressStore = create((set, get) => ({
  completedTopics: [],
  quizScores: {},
  practiceSolved: 0,
  streak: 0,
  lastActive: null,

  loadProgress: () => {
    try {
      const saved = localStorage.getItem('dsa-progress');
      if (saved) set(JSON.parse(saved));
    } catch {}
  },

  markTopicCompleted: (topicId) => {
    const state = get();
    const updated = [...new Set([...state.completedTopics, topicId])];
    const next = { ...state, completedTopics: updated };
    set(next);
    localStorage.setItem('dsa-progress', JSON.stringify(next));
  },

  updateQuizScore: (topicId, score) => {
    const state = get();
    const quizScores = { ...state.quizScores, [topicId]: score };
    const next = { ...state, quizScores };
    set(next);
    localStorage.setItem('dsa-progress', JSON.stringify(next));
  },

  incrementPractice: () => {
    const state = get();
    const streak = calculateStreak(state);
    const next = { ...state, practiceSolved: state.practiceSolved + 1, streak, lastActive: Date.now() };
    set(next);
    localStorage.setItem('dsa-progress', JSON.stringify(next));
  },

  getCompletionPercent: () => {
    const state = get();
    return Math.round((state.completedTopics.length / 12) * 100);
  },
}));

function calculateStreak(state) {
  const now = Date.now();
  const day = 86400000;
  if (!state.lastActive) return 1;
  const diff = now - state.lastActive;
  if (diff < day * 2) return state.streak + (diff > day ? 1 : 0);
  return 1;
}

// ─── Playback Store ───
export const usePlaybackStore = create((set, get) => ({
  isPlaying: false,
  currentStep: 0,
  totalSteps: 0,
  speed: 500,
  animationQueue: [],
  isAnimating: false,
  setTotalSteps: (n) => set({ totalSteps: n, currentStep: 0 }),
  setSpeed: (speed) => set({ speed }),
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  nextStep: () => {
    const s = get();
    if (s.currentStep < s.totalSteps - 1) set({ currentStep: s.currentStep + 1 });
    else set({ isPlaying: false });
  },
  prevStep: () => { const s = get(); if (s.currentStep > 0) set({ currentStep: s.currentStep - 1 }); },
  restart: () => set({ currentStep: 0, isPlaying: false }),
  setAnimationQueue: (queue) => set({ animationQueue: queue, totalSteps: queue.length, currentStep: 0 }),
  stepForward: () => { const s = get(); if (s.currentStep < s.animationQueue.length) set({ currentStep: s.currentStep + 1 }); },
}));

// ─── Array Store ───
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
export const useSortingStore = create((set, get) => ({
  array: Array.from({ length: 20 }, () => Math.floor(Math.random() * 100) + 1),
  comparing: [], swapping: [], sorted: [], isSorting: false, arraySize: 20, algorithm: 'bubble',
  setAlgorithm: (algo) => set({ algorithm: algo }),
  setArraySize: (size) => set({ array: Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1), comparing: [], swapping: [], sorted: [], isSorting: false, arraySize: size }),
  randomize: () => set({ array: Array.from({ length: get().arraySize }, () => Math.floor(Math.random() * 100) + 1), comparing: [], swapping: [], sorted: [], isSorting: false }),
  setState: (s) => set(s),
}));

// ─── Tree Store ───
export const useTreeStore = create((set, get) => ({
  nodes: [
    { id: '1', value: 50, x: 400, y: 40 },
    { id: '2', value: 30, x: 200, y: 120 },
    { id: '3', value: 70, x: 600, y: 120 },
    { id: '4', value: 20, x: 100, y: 200 },
    { id: '5', value: 40, x: 300, y: 200 },
    { id: '6', value: 60, x: 500, y: 200 },
    { id: '7', value: 80, x: 700, y: 200 },
  ],
  edges: [
    { from: '1', to: '2' }, { from: '1', to: '3' }, { from: '2', to: '4' },
    { from: '2', to: '5' }, { from: '3', to: '6' }, { from: '3', to: '7' },
  ],
  highlighted: [], traversalPath: [], traversalType: 'inorder',
  setTraversalType: (type) => set({ traversalType: type }),
  reset: () => set({ highlighted: [], traversalPath: [] }),
  generateBST: () => {
    const values = [50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45, 55, 65, 75, 90];
    const TREE_WIDTH = 600; // total horizontal space
    const LEFT_MARGIN = 80;
    const LEVEL_HEIGHT = 80;
    const TOP_OFFSET = 40;

    const nodes = values.map((v, i) => {
      const depth = Math.floor(Math.log2(i + 1));
      const nodesInLevel = Math.pow(2, depth);
      const indexInLevel = i - nodesInLevel + 1;
      const spacing = TREE_WIDTH / nodesInLevel;
      const x = LEFT_MARGIN + (indexInLevel + 0.5) * spacing;
      const y = depth * LEVEL_HEIGHT + TOP_OFFSET;
      return { id: String(i + 1), value: v, x: Math.round(x), y };
    });
    const edges = [];
    for (let i = 1; i < values.length; i++) {
      edges.push({ from: String(Math.floor((i - 1) / 2) + 1), to: String(i + 1) });
    }
    set({ nodes, edges, highlighted: [], traversalPath: [] });
  },
  traverse: (type) => {
    const { nodes, edges } = get();
    if (nodes.length === 0) return [];
    const childrenMap = {};
    nodes.forEach(n => { childrenMap[n.id] = []; });
    edges.forEach(e => childrenMap[e.from].push(e.to));
    const order = [];
    const root = nodes[0].id;
    if (type === 'levelorder') {
      const queue = [root];
      while (queue.length > 0) {
        const nodeId = queue.shift();
        order.push(nodeId);
        for (const child of childrenMap[nodeId] || []) queue.push(child);
      }
    } else {
      function dfs(nodeId) {
        const [left, right] = childrenMap[nodeId] || [];
        if (type === 'preorder') order.push(nodeId);
        if (left) dfs(left);
        if (type === 'inorder') order.push(nodeId);
        if (right) dfs(right);
        if (type === 'postorder') order.push(nodeId);
      }
      dfs(root);
    }
    set({ traversalPath: order, traversalType: type, highlighted: [] });
    return order;
  },
}));

// ─── Graph Store ───
export const useGraphStore = create((set, get) => ({
  graphType: 'undirected',
  nodes: [
    { id: '1', label: 'A' }, { id: '2', label: 'B' }, { id: '3', label: 'C' },
    { id: '4', label: 'D' }, { id: '5', label: 'E' }, { id: '6', label: 'F' },
  ],
  edges: [
    { source: '1', target: '2' }, { source: '1', target: '3' }, { source: '2', target: '4' },
    { source: '3', target: '5' }, { source: '4', target: '6' }, { source: '5', target: '6' },
    { source: '2', target: '3' },
  ],
  visited: [], queue: [], current: null, isTraversing: false,
  setGraphType: (type) => set({ graphType: type }),
  resetTraversal: () => set({ visited: [], queue: [], current: null, isTraversing: false }),
  bfs: () => {
    const { nodes, edges } = get();
    if (nodes.length === 0) return [];
    const adj = {};
    nodes.forEach(n => { adj[n.id] = []; });
    edges.forEach(e => { adj[e.source]?.push(e.target); adj[e.target]?.push(e.source); });
    const visited = new Set();
    const queue = [nodes[0].id];
    const order = [];
    visited.add(nodes[0].id);
    while (queue.length > 0) {
      const node = queue.shift();
      order.push(node);
      for (const neighbor of adj[node] || []) {
        if (!visited.has(neighbor)) { visited.add(neighbor); queue.push(neighbor); }
      }
    }
    return order;
  },
  dfs: () => {
    const { nodes, edges } = get();
    if (nodes.length === 0) return [];
    const adj = {};
    nodes.forEach(n => { adj[n.id] = []; });
    edges.forEach(e => { adj[e.source]?.push(e.target); adj[e.target]?.push(e.source); });
    const visited = new Set();
    const order = [];
    function dfsRec(node) {
      visited.add(node);
      order.push(node);
      for (const neighbor of adj[node] || []) { if (!visited.has(neighbor)) dfsRec(neighbor); }
    }
    dfsRec(nodes[0].id);
    return order;
  },
}));

// ─── Stack Store ───
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

// ─── Linked List Store ───
let llIdCounter = 0;
export const useLinkedListStore = create((set, get) => ({
  nodes: [],
  edges: [],
  highlighted: null,
  listType: 'singly',

  setListType: (type) => {
    set({ listType: type });
    get().initialize();
  },

  initialize: () => {
    llIdCounter = 0;
    const values = [10, 20, 30, 40, 50];
    const nodes = values.map((v) => ({ id: String(++llIdCounter), value: v }));
    const edges = nodes.slice(0, -1).map((n, i) => ({ from: n.id, to: nodes[i + 1].id }));
    set({ nodes, edges, highlighted: null });
  },

  insertHead: (value) => {
    const { nodes, edges } = get();
    const newNode = { id: String(++llIdCounter), value };
    const newEdges = [...edges];
    if (nodes.length > 0) newEdges.unshift({ from: newNode.id, to: nodes[0].id });
    set({ nodes: [newNode, ...nodes], edges: newEdges, highlighted: newNode.id });
    setTimeout(() => set({ highlighted: null }), 700);
  },

  insertTail: (value) => {
    const { nodes, edges } = get();
    const newNode = { id: String(++llIdCounter), value };
    const newEdges = [...edges];
    if (nodes.length > 0) newEdges.push({ from: nodes[nodes.length - 1].id, to: newNode.id });
    set({ nodes: [...nodes, newNode], edges: newEdges, highlighted: newNode.id });
    setTimeout(() => set({ highlighted: null }), 700);
  },

  deleteHead: () => {
    const { nodes, edges } = get();
    if (nodes.length === 0) return;
    const newNodes = nodes.slice(1);
    const newEdges = edges.slice(1);
    set({ nodes: newNodes, edges: newEdges, highlighted: null });
  },

  deleteTail: () => {
    const { nodes, edges } = get();
    if (nodes.length === 0) return;
    set({ nodes: nodes.slice(0, -1), edges: edges.slice(0, -1), highlighted: null });
  },

  reverse: () => {
    const { nodes } = get();
    if (nodes.length <= 1) return;
    const reversedNodes = [...nodes].reverse();
    const newEdges = reversedNodes.slice(0, -1).map((n, i) => ({ from: n.id, to: reversedNodes[i + 1].id }));
    set({ nodes: reversedNodes, edges: newEdges, highlighted: null });
  },

  deleteValue: (value) => {
    const { nodes, edges } = get();
    const idx = nodes.findIndex(n => n.value === value);
    if (idx === -1) return;
    const newNodes = nodes.filter((_, i) => i !== idx);
    const newEdges = [];
    if (idx > 0 && idx < nodes.length - 1) {
      newEdges.push({ from: nodes[idx - 1].id, to: nodes[idx + 1]?.id || '' });
    }
    edges.forEach((e, i) => {
      if (i !== idx && idx < nodes.length - 1 && !(i === idx - 1)) newEdges.push(e);
    });
    set({ nodes: newNodes, edges: newEdges.filter(e => e.to), highlighted: null });
  },
}));

// ─── Heap Store ───
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
