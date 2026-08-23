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

// ── Number of Islands ──────────────────────────────────────────────────────
// Generated rather than hand-authored. See VISUALIZERS.md -> "Or generate the
// steps instead"; trieStore.js is the reference for the pattern.

const ISLAND_GRID = [
  ['1', '1', '0', '0', '0'],
  ['1', '1', '0', '0', '0'],
  ['0', '0', '1', '0', '0'],
  ['0', '0', '0', '1', '1'],
];

const ISLANDS_CODE = [
  { line: 1, text: 'count = 0' },
  { line: 2, text: 'for each cell (r, c):' },
  { line: 3, text: '  if grid[r][c] == "1":' },
  { line: 4, text: '    count += 1' },
  { line: 5, text: '    flood(r, c)   // sink the whole island' },
  { line: 6, text: 'return count' },
];

/**
 * Cell states used by the grid renderer:
 *   water   '0'
 *   land    unvisited '1'
 *   cursor  the scan position
 *   filling currently being sunk by the flood
 *   sunk    already counted
 */
function* traceNumberOfIslands(grid) {
  const rows = grid.length, cols = grid[0].length;
  const cell = grid.map((r) => [...r]);            // mutable working copy
  const state = grid.map((r) => r.map((v) => (v === '1' ? 'land' : 'water')));
  let count = 0;

  const snap = (cursor, extra = {}) => ({
    cellGrid: state.map((row, r) => row.map((s, c) => ({ v: cell[r][c], s }))),
    cursor,
    islands: count,
    ...extra,
  });

  yield {
    activeLine: 1,
    ...snap(null),
    status: 'init',
    state: { grid: `${rows} x ${cols}`, count: 0 },
    title: 'Start with count = 0',
    computation: 'count = 0',
    comparison: 'nothing scanned yet',
    action: 'Init',
    desc: `A ${rows} x ${cols} grid where "1" is land and "0" is water. Scan every cell; each time an unvisited piece of land turns up, that is a new island — then sink all of its connected land so it is never counted twice.`,
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (state[r][c] !== 'land') continue;        // water, or already sunk

      count += 1;
      state[r][c] = 'filling';

      yield {
        activeLine: 4,
        ...snap([r, c]),
        status: 'found',
        state: { cell: `(${r}, ${c})`, value: '1', count },
        title: `New island #${count} found at (${r}, ${c})`,
        computation: `count = ${count}`,
        comparison: 'grid[r][c] == "1" ✅',
        action: `Island #${count}`,
        desc: `(${r}, ${c}) is land that has not been visited, so it belongs to an island nothing has counted yet. Increment the count to ${count}, then flood outwards to sink every cell connected to it.`,
      };

      // Iterative flood fill so the trace shows the frontier explicitly.
      const stack = [[r, c]];
      let sunk = 0;
      while (stack.length) {
        const [cr, cc] = stack.pop();
        if (cr < 0 || cc < 0 || cr >= rows || cc >= cols) continue;
        if (state[cr][cc] === 'water' || state[cr][cc] === 'sunk') continue;

        state[cr][cc] = 'sunk';
        cell[cr][cc] = '0';                        // sunk land becomes water
        sunk += 1;

        for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const nr = cr + dr, nc = cc + dc;
          if (nr >= 0 && nc >= 0 && nr < rows && nc < cols && state[nr][nc] === 'land') {
            state[nr][nc] = 'filling';
            stack.push([nr, nc]);
          }
        }

        yield {
          activeLine: 5,
          ...snap([cr, cc]),
          status: 'flood',
          state: { sinking: `(${cr}, ${cc})`, 'island size': sunk, count },
          title: `Sink (${cr}, ${cc}) — island #${count}, cell ${sunk}`,
          computation: `grid[${cr}][${cc}] = "0"`,
          comparison: `${stack.length} cell${stack.length === 1 ? '' : 's'} queued`,
          action: 'Flood',
          desc: `Mark (${cr}, ${cc}) as water so it cannot be revisited, then queue its four neighbours that are still land. Sinking as you go is what stops the same island being counted again — no separate visited set is needed.`,
        };
      }

      yield {
        activeLine: 2,
        ...snap(null),
        status: 'island-done',
        state: { 'island #': count, size: sunk, count },
        title: `Island #${count} fully sunk (${sunk} cell${sunk === 1 ? '' : 's'})`,
        computation: `island #${count} = ${sunk} cells`,
        comparison: 'flood complete',
        action: 'Resume scan',
        desc: `Island #${count} is entirely water now, so the scan can continue from where it left off without ever seeing this island again.`,
      };
    }
  }

  yield {
    activeLine: 6,
    ...snap(null),
    status: 'done',
    state: { result: count, cells: rows * cols },
    title: `NUMBER OF ISLANDS COMPLETE 🎉 — ${count}`,
    computation: `return ${count}`,
    comparison: `${count} islands found`,
    action: 'Done',
    desc: `Every cell has been visited once, so the answer is ${count}. Time is O(rows x cols) — each cell is scanned once and sunk at most once — and space is O(rows x cols) for the flood stack in the worst case.`,
  };
}

/** Exported so graphLogic can derive its steps from the same trace. */
export function buildIslandsSteps() {
  return [...traceNumberOfIslands(ISLAND_GRID)];
}

export { ISLANDS_CODE, ISLAND_GRID };

const NUMBER_OF_ISLANDS_STEPS = buildIslandsSteps();

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
    } else if (track === 'number-of-islands') {
      set({ track: 'number-of-islands', steps: NUMBER_OF_ISLANDS_STEPS, currentStep: 0, isPlaying: false });
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
