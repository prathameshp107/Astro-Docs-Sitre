import { create } from 'zustand';

const BFS_STEPS = [
  {
    activeLine: 1,
    currNode: 0,
    visited: [0],
    queue: [0],
    activeEdge: null,
    state: { currNode: 0, queue: '[0]', visited: '[0]' },
    desc: 'Line 1: Initialize BFS. Enqueue start node 0 into Queue and mark node 0 as visited.',
  },
  {
    activeLine: 2,
    currNode: 0,
    visited: [0],
    queue: [0],
    activeEdge: null,
    state: { 'queue.isEmpty': 'FALSE ❌' },
    desc: 'Line 2: Check while loop: queue is not empty. Enter loop.',
  },
  {
    activeLine: 3,
    currNode: 0,
    visited: [0],
    queue: [],
    activeEdge: null,
    state: { dequeued: 0, queue: '[]' },
    desc: 'Line 3: Dequeue front node = 0.',
  },
  {
    activeLine: 4,
    currNode: 0,
    visited: [0],
    queue: [],
    activeEdge: null,
    state: { processVal: 0, visitedOrder: '[0]' },
    desc: 'Line 4: Process node 0. Add 0 to BFS traversal result.',
  },
  {
    activeLine: 5,
    currNode: 0,
    visited: [0],
    queue: [],
    activeEdge: { from: 0, to: 1 },
    state: { currNode: 0, neighbor: 1 },
    desc: 'Line 5: Inspect neighbors of node 0: check neighbor node 1.',
  },
  {
    activeLine: 6,
    currNode: 0,
    visited: [0],
    queue: [],
    activeEdge: { from: 0, to: 1 },
    state: { '1 in visited': 'FALSE ❌' },
    desc: 'Line 6: Check condition: node 1 not in visited? TRUE ✅.',
  },
  {
    activeLine: 7,
    currNode: 0,
    visited: [0, 1],
    queue: [1],
    activeEdge: { from: 0, to: 1 },
    state: { queue: '[1]', visited: '[0, 1]' },
    desc: 'Line 7: Mark node 1 as visited and enqueue 1 into Queue.',
  },
  {
    activeLine: 5,
    currNode: 0,
    visited: [0, 1],
    queue: [1],
    activeEdge: { from: 0, to: 2 },
    state: { currNode: 0, neighbor: 2 },
    desc: 'Line 5: Check next neighbor of node 0: node 2.',
  },
  {
    activeLine: 7,
    currNode: 0,
    visited: [0, 1, 2],
    queue: [1, 2],
    activeEdge: { from: 0, to: 2 },
    state: { queue: '[1, 2]', visited: '[0, 1, 2]' },
    desc: 'Line 7: Mark node 2 as visited and enqueue 2 into Queue.',
  },
  {
    activeLine: 3,
    currNode: 1,
    visited: [0, 1, 2],
    queue: [2],
    activeEdge: null,
    state: { dequeued: 1, queue: '[2]' },
    desc: 'Line 3: Dequeue next node from front = 1.',
  },
  {
    activeLine: 4,
    currNode: 1,
    visited: [0, 1, 2],
    queue: [2],
    activeEdge: null,
    state: { processVal: 1, visitedOrder: '[0, 1]' },
    desc: 'Line 4: Process node 1. Add 1 to BFS traversal result.',
  },
  {
    activeLine: 7,
    currNode: 1,
    visited: [0, 1, 2, 3],
    queue: [2, 3],
    activeEdge: { from: 1, to: 3 },
    state: { queue: '[2, 3]', visited: '[0, 1, 2, 3]' },
    desc: 'Line 7: Inspect neighbor 3 of node 1: mark 3 visited and enqueue into Queue.',
  },
  {
    activeLine: 7,
    currNode: 1,
    visited: [0, 1, 2, 3, 4],
    queue: [2, 3, 4],
    activeEdge: { from: 1, to: 4 },
    state: { queue: '[2, 3, 4]', visited: '[0, 1, 2, 3, 4]' },
    desc: 'Line 7: Inspect neighbor 4 of node 1: mark 4 visited and enqueue into Queue.',
  },
  {
    activeLine: 3,
    currNode: 2,
    visited: [0, 1, 2, 3, 4],
    queue: [3, 4],
    activeEdge: null,
    state: { dequeued: 2, queue: '[3, 4]' },
    desc: 'Line 3: Dequeue node 2 from Queue.',
  },
  {
    activeLine: 3,
    currNode: 3,
    visited: [0, 1, 2, 3, 4],
    queue: [4],
    activeEdge: null,
    state: { dequeued: 3, queue: '[4]' },
    desc: 'Line 3: Dequeue node 3 from Queue.',
  },
  {
    activeLine: 7,
    currNode: 3,
    visited: [0, 1, 2, 3, 4, 5],
    queue: [4, 5],
    activeEdge: { from: 3, to: 5 },
    state: { queue: '[4, 5]', visited: '[0, 1, 2, 3, 4, 5]' },
    desc: 'Line 7: Inspect neighbor 5 of node 3: mark 5 visited and enqueue into Queue.',
  },
  {
    activeLine: 3,
    currNode: 4,
    visited: [0, 1, 2, 3, 4, 5],
    queue: [5],
    activeEdge: null,
    state: { dequeued: 4, queue: '[5]' },
    desc: 'Line 3: Dequeue node 4 from Queue.',
  },
  {
    activeLine: 3,
    currNode: 5,
    visited: [0, 1, 2, 3, 4, 5],
    queue: [],
    activeEdge: null,
    state: { dequeued: 5, queue: '[]', result: '[0, 1, 2, 3, 4, 5]', status: 'BFS COMPLETE 🎉' },
    desc: 'Line 3: Dequeue node 5. Queue is now empty. BFS traversal complete: [0, 1, 2, 3, 4, 5]! 🎉',
  },
];

const DFS_STEPS = [
  {
    activeLine: 1,
    currNode: 0,
    visited: [],
    stack: ['dfs(0)'],
    activeEdge: null,
    state: { node: 0, '0 in visited': 'FALSE ❌' },
    desc: 'Line 1: Call dfs(0). Node 0 not in visited.',
  },
  {
    activeLine: 2,
    currNode: 0,
    visited: [0],
    stack: ['dfs(0)'],
    activeEdge: null,
    state: { visited: '[0]' },
    desc: 'Line 2: Mark node 0 as visited.',
  },
  {
    activeLine: 3,
    currNode: 0,
    visited: [0],
    stack: ['dfs(0)'],
    activeEdge: null,
    state: { processVal: 0, visitedOrder: '[0]' },
    desc: 'Line 3: Process node 0. Add 0 to DFS order.',
  },
  {
    activeLine: 5,
    currNode: 1,
    visited: [0, 1],
    stack: ['dfs(0)', 'dfs(1)'],
    activeEdge: { from: 0, to: 1 },
    state: { action: 'recurse deep into node 1', stackDepth: 2 },
    desc: 'Line 5: Recurse deep into first neighbor node 1.',
  },
  {
    activeLine: 5,
    currNode: 3,
    visited: [0, 1, 3],
    stack: ['dfs(0)', 'dfs(1)', 'dfs(3)'],
    activeEdge: { from: 1, to: 3 },
    state: { action: 'recurse deep into node 3', stackDepth: 3 },
    desc: 'Line 5: Recurse deep into first neighbor node 3.',
  },
  {
    activeLine: 5,
    currNode: 5,
    visited: [0, 1, 3, 5],
    stack: ['dfs(0)', 'dfs(1)', 'dfs(3)', 'dfs(5)'],
    activeEdge: { from: 3, to: 5 },
    state: { action: 'recurse deep into node 5', stackDepth: 4 },
    desc: 'Line 5: Recurse deep into neighbor node 5.',
  },
  {
    activeLine: 5,
    currNode: 4,
    visited: [0, 1, 3, 5, 4],
    stack: ['dfs(0)', 'dfs(1)', 'dfs(3)', 'dfs(5)', 'dfs(4)'],
    activeEdge: { from: 5, to: 4 },
    state: { action: 'recurse deep into node 4', stackDepth: 5 },
    desc: 'Line 5: Recurse deep into neighbor node 4.',
  },
  {
    activeLine: 5,
    currNode: 2,
    visited: [0, 1, 3, 5, 4, 2],
    stack: ['dfs(0)', 'dfs(2)'],
    activeEdge: { from: 0, to: 2 },
    state: { result: '[0, 1, 3, 5, 4, 2]', status: 'DFS COMPLETE 🎉' },
    desc: 'Line 5: Backtrack and visit node 2. DFS traversal complete: [0, 1, 3, 5, 4, 2]! 🎉',
  },
];

const CYCLE_STEPS = [
  {
    activeLine: 1,
    currNode: 0,
    visited: [0],
    stack: ['detectCycle(0)'],
    activeEdge: null,
    state: { currNode: 0, visited: '[0]' },
    desc: 'Line 1: Mark start node 0 as visited.',
  },
  {
    activeLine: 2,
    currNode: 1,
    visited: [0, 1],
    stack: ['detectCycle(0)', 'detectCycle(1)'],
    activeEdge: { from: 0, to: 1 },
    state: { currNode: 1, parent: 0 },
    desc: 'Line 2: Recurse to neighbor node 1 (parent = 0).',
  },
  {
    activeLine: 2,
    currNode: 3,
    visited: [0, 1, 3],
    stack: ['detectCycle(0)', 'detectCycle(1)', 'detectCycle(3)'],
    activeEdge: { from: 1, to: 3 },
    state: { currNode: 3, parent: 1 },
    desc: 'Line 2: Recurse to neighbor node 3 (parent = 1).',
  },
  {
    activeLine: 2,
    currNode: 4,
    visited: [0, 1, 3, 4],
    stack: ['detectCycle(0)', 'detectCycle(1)', 'detectCycle(3)', 'detectCycle(4)'],
    activeEdge: { from: 3, to: 4 },
    state: { currNode: 4, parent: 3 },
    desc: 'Line 2: Recurse to neighbor node 4 (parent = 3).',
  },
  {
    activeLine: 3,
    currNode: 4,
    visited: [0, 1, 3, 4],
    stack: ['detectCycle(4)'],
    activeEdge: { from: 4, to: 1 },
    state: { neighbor: 1, '1 in visited': 'TRUE ✅', '1 != parent(3)': 'TRUE ✅' },
    desc: 'Line 3: Inspect edge (4 → 1). Node 1 is already in visited AND 1 != parent(3)!',
  },
  {
    activeLine: 4,
    currNode: 4,
    visited: [0, 1, 3, 4],
    stack: [],
    activeEdge: { from: 4, to: 1 },
    state: { cycleEdge: '4 - 1', result: 'Cycle Detected! (1 - 3 - 4 - 1)', status: 'CYCLE FOUND ⚠️' },
    desc: 'Line 4: Back-edge found! Return true — Cycle detected in graph! ⚠️🎉',
  },
];

const DIJKSTRA_STEPS = [
  {
    activeLine: 1,
    currNode: 0,
    visited: [0],
    distances: { 0: 0, 1: '∞', 2: '∞', 3: '∞', 4: '∞', 5: '∞' },
    activeEdge: null,
    state: { startNode: 0, 'dist[0]': 0 },
    desc: 'Line 1: Initialize distance array: dist[0] = 0, all others = ∞.',
  },
  {
    activeLine: 2,
    currNode: 0,
    visited: [0],
    distances: { 0: 0, 1: 4, 2: 2, 3: '∞', 4: '∞', 5: '∞' },
    activeEdge: { from: 0, to: 2 },
    state: { currNode: 0, 'dist[1]': 4, 'dist[2]': 2 },
    desc: 'Line 2: Relax edges from 0: update dist[1] = 4, dist[2] = 2.',
  },
  {
    activeLine: 3,
    currNode: 2,
    visited: [0, 2],
    distances: { 0: 0, 1: 4, 2: 2, 3: '∞', 4: 5, 5: '∞' },
    activeEdge: { from: 2, to: 4 },
    state: { minNode: 2, 'dist[2]': 2, 'dist[4]': 5 },
    desc: 'Line 3: Extract min unvisited node = 2 (dist = 2). Relax edge (2-4): dist[4] = 2 + 3 = 5.',
  },
  {
    activeLine: 3,
    currNode: 1,
    visited: [0, 2, 1],
    distances: { 0: 0, 1: 4, 2: 2, 3: 7, 4: 5, 5: '∞' },
    activeEdge: { from: 1, to: 3 },
    state: { minNode: 1, 'dist[1]': 4, 'dist[3]': 7 },
    desc: 'Line 3: Extract min unvisited node = 1 (dist = 4). Relax edge (1-3): dist[3] = 4 + 3 = 7.',
  },
  {
    activeLine: 3,
    currNode: 4,
    visited: [0, 2, 1, 4],
    distances: { 0: 0, 1: 4, 2: 2, 3: 7, 4: 5, 5: 8 },
    activeEdge: { from: 4, to: 5 },
    state: { minNode: 4, 'dist[4]': 5, 'dist[5]': 8 },
    desc: 'Line 3: Extract min node = 4 (dist = 5). Relax edge (4-5): dist[5] = 5 + 3 = 8.',
  },
  {
    activeLine: 4,
    currNode: 5,
    visited: [0, 1, 2, 3, 4, 5],
    distances: { 0: 0, 1: 4, 2: 2, 3: 7, 4: 5, 5: 8 },
    activeEdge: null,
    state: { result: 'All shortest paths computed', status: 'DIJKSTRA COMPLETE 🎉' },
    desc: 'Line 4: All nodes visited. Final shortest distances from node 0 computed! 🎉',
  },
];

export const useGraphStore = create((set, get) => ({
  track: 'bfs',
  steps: BFS_STEPS,
  currentStep: 0,
  isPlaying: false,
  speed: 1,
  practiceMode: false,
  userCode: `// Write your pseudocode or solution here\nfunction bfs(graph, start) {\n  let queue = [start], visited = new Set([start]);\n  while (queue.length) {\n    let node = queue.shift();\n    for (let neighbor of graph[node]) {\n      if (!visited.has(neighbor)) {\n        visited.add(neighbor);\n        queue.push(neighbor);\n      }\n    }\n  }\n}`,

  setTrack: (track) => {
    if (track === 'bfs') {
      set({ track: 'bfs', steps: BFS_STEPS, currentStep: 0, isPlaying: false });
    } else if (track === 'dfs') {
      set({ track: 'dfs', steps: DFS_STEPS, currentStep: 0, isPlaying: false });
    } else if (track === 'cycle-detection') {
      set({ track: 'cycle-detection', steps: CYCLE_STEPS, currentStep: 0, isPlaying: false });
    } else if (track === 'dijkstra') {
      set({ track: 'dijkstra', steps: DIJKSTRA_STEPS, currentStep: 0, isPlaying: false });
    }
  },

  setCurrentStep: (step) => {
    const { steps } = get();
    if (step >= 0 && step < steps.length) {
      set({ currentStep: step });
    }
  },

  nextStep: () => {
    const { currentStep, steps } = get();
    if (currentStep < steps.length - 1) {
      set({ currentStep: currentStep + 1 });
    } else {
      set({ isPlaying: false });
    }
  },

  prevStep: () => {
    const { currentStep } = get();
    if (currentStep > 0) {
      set({ currentStep: currentStep - 1 });
    }
  },

  restart: () => {
    set({ currentStep: 0, isPlaying: false });
  },

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setSpeed: (s) => set({ speed: s }),
  togglePracticeMode: () => set((state) => ({ practiceMode: !state.practiceMode })),
  setUserCode: (code) => set({ userCode: code }),
}));
