import { create } from 'zustand';

const FACTORIAL_STEPS = [
  {
    activeLine: 1,
    callStack: [{ fn: 'fact(4)', n: 4, phase: 'winding' }],
    state: { n: 4, 'n <= 1': 'FALSE ❌', phase: 'Winding Down ⬇️' },
    desc: 'Line 1: Call fact(4). Check base case (4 <= 1): FALSE.',
  },
  {
    activeLine: 2,
    callStack: [
      { fn: 'fact(3)', n: 3, phase: 'winding' },
      { fn: 'fact(4)', n: 4, phase: 'winding' },
    ],
    state: { n: 3, action: 'Recurse: 4 * fact(3)', stackDepth: 2 },
    desc: 'Line 2: Push fact(3) onto Call Stack. Waiting for fact(3)...',
  },
  {
    activeLine: 2,
    callStack: [
      { fn: 'fact(2)', n: 2, phase: 'winding' },
      { fn: 'fact(3)', n: 3, phase: 'winding' },
      { fn: 'fact(4)', n: 4, phase: 'winding' },
    ],
    state: { n: 2, action: 'Recurse: 3 * fact(2)', stackDepth: 3 },
    desc: 'Line 2: Push fact(2) onto Call Stack. Waiting for fact(2)...',
  },
  {
    activeLine: 1,
    callStack: [
      { fn: 'fact(1)', n: 1, phase: 'winding' },
      { fn: 'fact(2)', n: 2, phase: 'winding' },
      { fn: 'fact(3)', n: 3, phase: 'winding' },
      { fn: 'fact(4)', n: 4, phase: 'winding' },
    ],
    state: { n: 1, 'n <= 1': 'TRUE ✅', phase: 'Base Case Reached! 🎯' },
    desc: 'Line 1: Call fact(1). Base case (1 <= 1) reached! Returns 1.',
  },
  {
    activeLine: 2,
    callStack: [
      { fn: 'fact(2)', n: 2, phase: 'unwinding', ret: '2 * 1 = 2' },
      { fn: 'fact(3)', n: 3, phase: 'winding' },
      { fn: 'fact(4)', n: 4, phase: 'winding' },
    ],
    state: { popped: 'fact(1) = 1', returnedTo: 'fact(2)', retVal: 2, phase: 'Unwinding Up ⬆️' },
    desc: 'Line 2: Unwind stack frame: fact(2) receives 1 → returns 2 * 1 = 2.',
  },
  {
    activeLine: 2,
    callStack: [
      { fn: 'fact(3)', n: 3, phase: 'unwinding', ret: '3 * 2 = 6' },
      { fn: 'fact(4)', n: 4, phase: 'winding' },
    ],
    state: { popped: 'fact(2) = 2', returnedTo: 'fact(3)', retVal: 6 },
    desc: 'Line 2: Unwind stack frame: fact(3) receives 2 → returns 3 * 2 = 6.',
  },
  {
    activeLine: 2,
    callStack: [
      { fn: 'fact(4)', n: 4, phase: 'unwinding', ret: '4 * 6 = 24' },
    ],
    state: { popped: 'fact(3) = 6', returnedTo: 'fact(4)', result: 24, status: 'FACTORIAL COMPLETE 🎉' },
    desc: 'Line 2: Unwind top frame: fact(4) receives 6 → returns 4 * 6 = 24! Final Answer = 24. 🎉',
  },
];

const FIBONACCI_STEPS = [
  {
    activeLine: 1,
    callStack: [{ fn: 'fib(4)', n: 4 }],
    state: { n: 4, 'n <= 1': 'FALSE ❌' },
    desc: 'Line 1: Call fib(4). Check base case (4 <= 1): FALSE.',
  },
  {
    activeLine: 2,
    callStack: [
      { fn: 'fib(3)', n: 3 },
      { fn: 'fib(4)', n: 4 },
    ],
    state: { branch: 'Left branch fib(3)' },
    desc: 'Line 2: Recurse into left child fib(3).',
  },
  {
    activeLine: 2,
    callStack: [
      { fn: 'fib(2)', n: 2 },
      { fn: 'fib(3)', n: 3 },
      { fn: 'fib(4)', n: 4 },
    ],
    state: { branch: 'Left branch fib(2)' },
    desc: 'Line 2: Recurse into left child fib(2).',
  },
  {
    activeLine: 1,
    callStack: [
      { fn: 'fib(1)', n: 1, ret: 1 },
      { fn: 'fib(2)', n: 2 },
      { fn: 'fib(3)', n: 3 },
      { fn: 'fib(4)', n: 4 },
    ],
    state: { 'fib(1)': 1, baseCase: 'TRUE ✅' },
    desc: 'Line 1: fib(1) reaches base case → returns 1.',
  },
  {
    activeLine: 1,
    callStack: [
      { fn: 'fib(0)', n: 0, ret: 0 },
      { fn: 'fib(2)', n: 2 },
      { fn: 'fib(3)', n: 3 },
      { fn: 'fib(4)', n: 4 },
    ],
    state: { 'fib(0)': 0, baseCase: 'TRUE ✅' },
    desc: 'Line 1: fib(0) reaches base case → returns 0.',
  },
  {
    activeLine: 4,
    callStack: [
      { fn: 'fib(3)', n: 3, leftRet: 1 },
      { fn: 'fib(4)', n: 4 },
    ],
    state: { 'fib(2)': '1 + 0 = 1', returnedTo: 'fib(3)' },
    desc: 'Line 4: fib(2) returns fib(1) + fib(0) = 1 + 0 = 1.',
  },
  {
    activeLine: 4,
    callStack: [{ fn: 'fib(4)', n: 4, result: 3 }],
    state: { 'fib(4)': 'fib(3) + fib(2) = 2 + 1 = 3', status: 'FIBONACCI COMPLETE 🎉' },
    desc: 'Line 4: Combine sub-results: fib(4) = fib(3) + fib(2) = 2 + 1 = 3. Final Answer = 3! 🎉',
  },
];

const TOWER_OF_HANOI_STEPS = [
  {
    activeLine: 1,
    pegs: { A: [3, 2, 1], B: [], C: [] },
    callStack: [{ fn: 'hanoi(3, A, C, B)' }],
    move: { disk: null, from: null, to: null, stepNum: 0 },
    state: { n: 3, from: 'Peg A', to: 'Peg C', aux: 'Peg B', moves: 0 },
    desc: 'Line 1: Initial state: 3 disks stacked on Peg A (Source). Goal: Move all disks to Peg C (Destination) using Peg B (Auxiliary).',
  },
  {
    activeLine: 2,
    pegs: { A: [3, 2], B: [], C: [1] },
    callStack: [{ fn: 'moveDisk(1, A → C)' }],
    move: { disk: 1, from: 'A', to: 'C', stepNum: 1 },
    state: { disk: 1, from: 'Peg A', to: 'Peg C', moveCount: '1 / 7' },
    desc: 'Line 2: Move 1: Move Disk 1 from Peg A to Peg C.',
  },
  {
    activeLine: 2,
    pegs: { A: [3], B: [2], C: [1] },
    callStack: [{ fn: 'moveDisk(2, A → B)' }],
    move: { disk: 2, from: 'A', to: 'B', stepNum: 2 },
    state: { disk: 2, from: 'Peg A', to: 'Peg B', moveCount: '2 / 7' },
    desc: 'Line 2: Move 2: Move Disk 2 from Peg A to Peg B.',
  },
  {
    activeLine: 2,
    pegs: { A: [3], B: [2, 1], C: [] },
    callStack: [{ fn: 'moveDisk(1, C → B)' }],
    move: { disk: 1, from: 'C', to: 'B', stepNum: 3 },
    state: { disk: 1, from: 'Peg C', to: 'Peg B', moveCount: '3 / 7' },
    desc: 'Line 2: Move 3: Move Disk 1 from Peg C to Peg B. Smaller disks 1 & 2 are now safely stacked on Peg B.',
  },
  {
    activeLine: 3,
    pegs: { A: [], B: [2, 1], C: [3] },
    callStack: [{ fn: 'moveDisk(3, A → C)' }],
    move: { disk: 3, from: 'A', to: 'C', stepNum: 4 },
    state: { disk: 3, from: 'Peg A', to: 'Peg C', moveCount: '4 / 7', note: 'Largest Disk 3 placed on Destination!' },
    desc: 'Line 3: Move 4: Move largest Disk 3 from Peg A directly to Peg C (Destination)!',
  },
  {
    activeLine: 4,
    pegs: { A: [1], B: [2], C: [3] },
    callStack: [{ fn: 'moveDisk(1, B → A)' }],
    move: { disk: 1, from: 'B', to: 'A', stepNum: 5 },
    state: { disk: 1, from: 'Peg B', to: 'Peg A', moveCount: '5 / 7' },
    desc: 'Line 4: Move 5: Move Disk 1 from Peg B to Peg A.',
  },
  {
    activeLine: 4,
    pegs: { A: [1], B: [], C: [3, 2] },
    callStack: [{ fn: 'moveDisk(2, B → C)' }],
    move: { disk: 2, from: 'B', to: 'C', stepNum: 6 },
    state: { disk: 2, from: 'Peg B', to: 'Peg C', moveCount: '6 / 7' },
    desc: 'Line 4: Move 6: Move Disk 2 from Peg B to Peg C on top of Disk 3.',
  },
  {
    activeLine: 4,
    pegs: { A: [], B: [], C: [3, 2, 1] },
    callStack: [{ fn: 'hanoi(3) COMPLETE' }],
    move: { disk: 1, from: 'A', to: 'C', stepNum: 7 },
    state: { disk: 1, from: 'Peg A', to: 'Peg C', moveCount: '7 / 7', status: 'TOWER OF HANOI COMPLETE 🎉' },
    desc: 'Line 4: Move 7: Move Disk 1 from Peg A to Peg C. All 3 disks transferred to Peg C in optimal 7 moves (2^3 - 1)! 🎉',
  },
];

const SUBSETS_STEPS = [
  {
    activeLine: 1,
    callStack: [{ fn: 'backtrack(idx=0, path=[])' }],
    subsets: [[]],
    currPath: [],
    currIdx: 0,
    state: { path: '[]', index: 0, subsetCount: 1 },
    desc: 'Line 1: Initial call backtrack(index=0, path=[]). Empty subset [] collected into results.',
  },
  {
    activeLine: 2,
    callStack: [{ fn: 'backtrack(idx=1, path=[1])' }],
    subsets: [[]],
    currPath: [1],
    currIdx: 1,
    state: { decision: 'Include element 1 (arr[0])', path: '[1]' },
    desc: 'Line 2: Decision at index 0: INCLUDE element 1 → path becomes [1]. Recurse to index 1.',
  },
  {
    activeLine: 2,
    callStack: [{ fn: 'backtrack(idx=2, path=[1, 2])' }],
    subsets: [[], [1, 2]],
    currPath: [1, 2],
    currIdx: 2,
    state: { decision: 'Include element 2 (arr[1])', path: '[1, 2]', subsetCount: 2 },
    desc: 'Line 2: Decision at index 1: INCLUDE element 2 → path becomes [1, 2]. Base case reached (idx == 2) → collect subset [1, 2]!',
  },
  {
    activeLine: 3,
    callStack: [{ fn: 'backtrack(idx=2, path=[1])' }],
    subsets: [[], [1, 2], [1]],
    currPath: [1],
    currIdx: 2,
    state: { decision: 'Backtrack & Exclude element 2', path: '[1]', subsetCount: 3 },
    desc: 'Line 3: Backtrack from [1, 2] → remove 2. Decision at index 1: EXCLUDE element 2 → path remains [1]. Collect subset [1]!',
  },
  {
    activeLine: 3,
    callStack: [{ fn: 'backtrack(idx=1, path=[])' }],
    subsets: [[], [1, 2], [1]],
    currPath: [],
    currIdx: 1,
    state: { decision: 'Backtrack & Exclude element 1', path: '[]' },
    desc: 'Line 3: Backtrack to root → remove 1. Decision at index 0: EXCLUDE element 1 → path becomes []. Recurse to right branch.',
  },
  {
    activeLine: 2,
    callStack: [{ fn: 'backtrack(idx=2, path=[2])' }],
    subsets: [[], [1, 2], [1], [2]],
    currPath: [2],
    currIdx: 2,
    state: { decision: 'Include element 2 (arr[1])', path: '[2]', subsetCount: 4 },
    desc: 'Line 2: Right branch decision at index 1: INCLUDE element 2 → path becomes [2]. Base case reached → collect subset [2]!',
  },
  {
    activeLine: 3,
    callStack: [{ fn: 'subsets COMPLETE' }],
    subsets: [[], [1, 2], [1], [2]],
    currPath: [],
    currIdx: 2,
    state: { subsets: '[[], [1, 2], [1], [2]]', totalSubsets: 4, status: 'SUBSETS COMPLETE 🎉' },
    desc: 'Line 3: Subsets recursion tree traversal complete! All 2^2 = 4 subsets generated: [[], [1, 2], [1], [2]]! 🎉',
  },
];

export const useRecursionStore = create((set, get) => ({
  track: 'factorial',
  steps: FACTORIAL_STEPS,
  currentStep: 0,
  isPlaying: false,
  speed: 1,
  practiceMode: false,
  userCode: `// Write your pseudocode or solution here\nfunction factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}`,

  setTrack: (track) => {
    if (track === 'factorial') {
      set({ track: 'factorial', steps: FACTORIAL_STEPS, currentStep: 0, isPlaying: false });
    } else if (track === 'fibonacci') {
      set({ track: 'fibonacci', steps: FIBONACCI_STEPS, currentStep: 0, isPlaying: false });
    } else if (track === 'tower-of-hanoi') {
      set({ track: 'tower-of-hanoi', steps: TOWER_OF_HANOI_STEPS, currentStep: 0, isPlaying: false });
    } else if (track === 'subsets') {
      set({ track: 'subsets', steps: SUBSETS_STEPS, currentStep: 0, isPlaying: false });
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
