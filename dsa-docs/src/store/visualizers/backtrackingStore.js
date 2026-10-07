import { create } from 'zustand';

// 1. N-QUEENS (4x4) EXHAUSTIVE STEP TRACE WITH KEY INSIGHTS
const NQUEENS_STEPS = [
  {
    activeLine: 1,
    row: 0,
    col: null,
    board: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    state: { keyInsight: 'DFS Depth-First Search with backtracking: prune invalid paths early.', row: 0, col: 'None', queensPlaced: 0 },
    desc: '💡 Key insight: N-Queens uses recursive DFS with pruning. At each row, try placing a Queen in columns 0..3. If a conflict occurs, prune the branch and backtrack immediately.'
  },
  {
    activeLine: 3,
    row: 0,
    col: 0,
    board: [
      [1, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    state: { row: 0, col: 0, isValid: 'TRUE ✅', queensPlaced: 1 },
    desc: 'Step 2: Try placing Queen at (0, 0). Valid! Place Queen at (0, 0) and recurse to Row 1.'
  },
  {
    activeLine: 3,
    row: 1,
    col: 0,
    board: [
      [1, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    conflictCell: [1, 0],
    state: { row: 1, col: 0, isValid: 'FALSE ❌ (Column Conflict with (0,0))' },
    desc: 'Step 3: Try (1, 0). CONFLICT! Same column as Queen at (0, 0). Cannot place here.'
  },
  {
    activeLine: 3,
    row: 1,
    col: 1,
    board: [
      [1, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    conflictCell: [1, 1],
    state: { row: 1, col: 1, isValid: 'FALSE ❌ (Diagonal Conflict with (0,0))' },
    desc: 'Step 4: Try (1, 1). CONFLICT! Diagonal attack from Queen at (0, 0). Cannot place here.'
  },
  {
    activeLine: 3,
    row: 1,
    col: 2,
    board: [
      [1, 0, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    state: { row: 1, col: 2, isValid: 'TRUE ✅', queensPlaced: 2 },
    desc: 'Step 5: Try (1, 2). Valid! Place Queen at (1, 2) and recurse to Row 2.'
  },
  {
    activeLine: 3,
    row: 2,
    col: 0,
    board: [
      [1, 0, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    conflictCell: [2, 0],
    state: { row: 2, col: 0, isValid: 'FALSE ❌ (Col/Diag Conflict)' },
    desc: 'Step 6: Try Row 2. (2,0) col conflict, (2,1) diag conflict, (2,2) col conflict, (2,3) diag conflict! Zero valid columns for Row 2!'
  },
  {
    activeLine: 7,
    row: 1,
    col: 2,
    board: [
      [1, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    state: { row: 1, col: 2, action: '⏪ BACKTRACK! Remove Queen from (1, 2)' },
    desc: 'Step 7: ⏪ BACKTRACK to Row 1! Remove Queen at (1, 2) and try next column (1, 3).'
  },
  {
    activeLine: 3,
    row: 1,
    col: 3,
    board: [
      [1, 0, 0, 0],
      [0, 0, 0, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    state: { row: 1, col: 3, isValid: 'TRUE ✅', queensPlaced: 2 },
    desc: 'Step 8: Try (1, 3). Valid! Place Queen at (1, 3) and recurse to Row 2.'
  },
  {
    activeLine: 3,
    row: 2,
    col: 1,
    board: [
      [1, 0, 0, 0],
      [0, 0, 0, 1],
      [0, 1, 0, 0],
      [0, 0, 0, 0]
    ],
    state: { row: 2, col: 1, isValid: 'TRUE ✅', queensPlaced: 3 },
    desc: 'Step 9: Try (2, 1). Valid! Place Queen at (2, 1) and recurse to Row 3.'
  },
  {
    activeLine: 7,
    row: 0,
    col: 1,
    board: [
      [0, 1, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    state: { row: 0, col: 1, isValid: 'TRUE ✅', queensPlaced: 1 },
    desc: 'Step 10: Row 3 dead-end! ⏪ Backtrack all the way to Row 0! Remove (0, 0) and place Queen at (0, 1).'
  },
  {
    activeLine: 3,
    row: 1,
    col: 3,
    board: [
      [0, 1, 0, 0],
      [0, 0, 0, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    state: { row: 1, col: 3, isValid: 'TRUE ✅', queensPlaced: 2 },
    desc: 'Step 11: Recurse to Row 1. Place Queen at (1, 3). Valid!'
  },
  {
    activeLine: 3,
    row: 2,
    col: 0,
    board: [
      [0, 1, 0, 0],
      [0, 0, 0, 1],
      [1, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    state: { row: 2, col: 0, isValid: 'TRUE ✅', queensPlaced: 3 },
    desc: 'Step 12: Recurse to Row 2. Place Queen at (2, 0). Valid!'
  },
  {
    activeLine: 3,
    row: 3,
    col: 2,
    isMatch: true,
    board: [
      [0, 1, 0, 0],
      [0, 0, 0, 1],
      [1, 0, 0, 0],
      [0, 0, 1, 0]
    ],
    state: { row: 3, col: 2, isValid: 'TRUE ✅', queensPlaced: 4, status: 'SOLUTION 1 FOUND 🎉' },
    desc: 'Step 13: Recurse to Row 3. Place Queen at (3, 2). All 4 Queens placed non-attacking! FIRST SOLUTION FOUND 🎉'
  }
];

// A real solver produces every state; givens are never overwritten.
export const SUDOKU_INITIAL_GRID = [
  [1, 0, 3, 0],
  [0, 0, 0, 2],
  [0, 1, 0, 0],
  [4, 0, 0, 1],
];

export function buildSudokuSteps(initialGrid = SUDOKU_INITIAL_GRID) {
  const grid = initialGrid.map(row => [...row]);
  const steps = [];
  function record(activeLine, row, col, num, action, desc, extra = {}) {
    steps.push({ activeLine, row, col, num, grid: grid.map(r => [...r]),
      state: { row, col, candidate: num ?? 'None', action }, desc, ...extra });
  }
  function conflict(row, col, num) {
    for (let i = 0; i < 4; i++) {
      if (grid[row][i] === num) return [row, i];
      if (grid[i][col] === num) return [i, col];
    }
    const r0 = Math.floor(row / 2) * 2, c0 = Math.floor(col / 2) * 2;
    for (let r = r0; r < r0 + 2; r++) {
      for (let c = c0; c < c0 + 2; c++) if (grid[r][c] === num) return [r, c];
    }
    return null;
  }
  function solve() {
    let row = -1, col = -1;
    for (let r = 0; r < 4 && row < 0; r++) {
      for (let c = 0; c < 4; c++) {
        if (grid[r][c] === 0) { row = r; col = c; break; }
      }
    }
    if (row < 0) return true;
    record(2, row, col, null, 'Find empty cell', `Inspect empty cell (${row}, ${col}). Try digits 1 through 4.`);
    for (let num = 1; num <= 4; num++) {
      const conflictCell = conflict(row, col, num);
      if (conflictCell) {
        record(4, row, col, num, 'Reject candidate', `Reject ${num} at (${row}, ${col}): conflicts with (${conflictCell[0]}, ${conflictCell[1]}) in its row, column, or box.`, { conflictCell });
        continue;
      }
      grid[row][col] = num;
      record(5, row, col, num, 'Place digit', `Place ${num} at (${row}, ${col}). Row, column, and 2×2 box remain valid.`);
      if (solve()) return true;
      grid[row][col] = 0;
      record(7, row, col, num, 'Backtrack', `No solution follows this choice. Remove ${num} from (${row}, ${col}) and try the next candidate.`);
    }
    return false;
  }
  record(1, 0, 1, null, 'Setup', 'Solve this 4×4 Sudoku using digits 1–4. Preserve the original clues and reject conflicts before placing a digit.');
  const solved = solve();
  record(6, null, null, null, solved ? 'Solved' : 'No solution', solved
    ? 'SUDOKU SOLVED: every row, column, and 2×2 box contains digits 1–4, and all original clues are preserved.'
    : 'No solution exists for these clues. All attempted choices have been undone.', { isMatch: solved });
  return steps;
}

const SUDOKU_STEPS = buildSudokuSteps();

// 3. SUBSETS / POWER SET STEP TRACE (Exhaustive 9-Step Backtracking Execution)
const SUBSETS_STEPS = [
  {
    activeLine: 1,
    index: 0,
    currentSubset: [],
    subsets: [[]],
    state: { keyInsight: 'Binary decision tree: (1) Exclude arr[i] vs (2) Include arr[i].', index: 0, subset: '[]' },
    desc: '💡 Key insight: Subsets via binary decision tree. At each element arr[i], branch into excluding vs including it, generating 2^N total subsets.'
  },
  {
    activeLine: 2,
    index: 0,
    currentSubset: [1],
    subsets: [[], [1]],
    state: { index: 0, include: 1, subset: '[1]' },
    desc: 'Step 2: Include element 1. Current subset path = [1]. Add [1] to power set.'
  },
  {
    activeLine: 2,
    index: 1,
    currentSubset: [1, 2],
    subsets: [[], [1], [1, 2]],
    state: { index: 1, include: 2, subset: '[1, 2]' },
    desc: 'Step 3: Include element 2. Current subset path = [1, 2]. Add [1, 2] to power set.'
  },
  {
    activeLine: 2,
    index: 2,
    currentSubset: [1, 2, 3],
    subsets: [[], [1], [1, 2], [1, 2, 3]],
    state: { index: 2, include: 3, subset: '[1, 2, 3]' },
    desc: 'Step 4: Include element 3. Current subset path = [1, 2, 3]. Leaf reached! Power set size = 4.'
  },
  {
    activeLine: 4,
    index: 2,
    currentSubset: [1, 2],
    subsets: [[], [1], [1, 2], [1, 2, 3]],
    state: { index: 2, action: '⏪ Backtrack element 3' },
    desc: 'Step 5: ⏪ Backtrack element 3! Return to subset path [1, 2].'
  },
  {
    activeLine: 4,
    index: 2,
    currentSubset: [1, 3],
    subsets: [[], [1], [1, 2], [1, 2, 3], [1, 3]],
    state: { index: 2, subset: '[1, 3]', action: 'Exclude 2, include 3' },
    desc: 'Step 6: Exclude 2, include 3. Current subset path = [1, 3]. Add [1, 3] to power set.'
  },
  {
    activeLine: 4,
    index: 1,
    currentSubset: [2],
    subsets: [[], [1], [1, 2], [1, 2, 3], [1, 3], [2]],
    state: { index: 1, subset: '[2]', action: 'Exclude 1, include 2' },
    desc: 'Step 7: Backtrack to root. Exclude element 1, include element 2. Current subset path = [2]. Add [2] to power set.'
  },
  {
    activeLine: 4,
    index: 2,
    currentSubset: [2, 3],
    subsets: [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3]],
    state: { index: 2, subset: '[2, 3]', action: 'Include 3' },
    desc: 'Step 8: Include element 3. Current subset path = [2, 3]. Add [2, 3] to power set.'
  },
  {
    activeLine: 5,
    index: 3,
    isMatch: true,
    currentSubset: [],
    subsets: [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]],
    state: { count: 8, status: 'POWER SET COMPLETE 🎉' },
    desc: 'Step 9: Explored all binary decision branches! All 2^3 = 8 subsets generated! 🎉'
  }
];

export const useBacktrackingStore = create((set, get) => ({
  track: 'n-queens',
  steps: NQUEENS_STEPS,
  currentStep: 0,
  isPlaying: false,
  speed: 1,
  practiceMode: false,
  userCode: `// Backtracking Template\nfunction solveNQueens(n) {\n  let board = Array(n).fill().map(() => Array(n).fill(0));\n  let solutions = [];\n  function backtrack(row) {\n    if (row === n) {\n      solutions.push(board.map(r => [...r]));\n      return;\n    }\n    for (let col = 0; col < n; col++) {\n      if (isValid(board, row, col)) {\n        board[row][col] = 1;\n        backtrack(row + 1);\n        board[row][col] = 0; // Backtrack\n      }\n    }\n  }\n  backtrack(0);\n  return solutions;\n}`,

  setTrack: (trackKey) => {
    let steps = NQUEENS_STEPS;
    if (trackKey === 'sudoku') steps = SUDOKU_STEPS;
    else if (trackKey === 'subsets') steps = SUBSETS_STEPS;

    set({ track: trackKey, steps, currentStep: 0, isPlaying: false });
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

  restart: () => set({ currentStep: 0, isPlaying: false }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setSpeed: (s) => set({ speed: s }),
  togglePracticeMode: () => set((state) => ({ practiceMode: !state.practiceMode })),
  setUserCode: (code) => set({ userCode: code }),
}));
