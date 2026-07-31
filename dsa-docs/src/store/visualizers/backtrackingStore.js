import { create } from 'zustand';

// 1. N-QUEENS (4x4) EXHAUSTIVE STEP TRACE
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
    state: { row: 0, col: 'None', queensPlaced: 0, solutionsFound: 0 },
    desc: 'Step 1: Start solveNQueens(row 0). Initialize empty 4x4 chessboard.'
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
    desc: 'Step 2: Try placing Queen at (0, 0). Valid! Recurse to row 1.'
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
    desc: 'Step 3: Try (1, 0). CONFLICT! Same column as Queen at (0, 0).'
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
    desc: 'Step 4: Try (1, 1). CONFLICT! Diagonal attack from Queen at (0, 0).'
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
    desc: 'Step 5: Try (1, 2). Valid! Place Queen at (1, 2) and recurse to row 2.'
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
    state: { row: 2, col: 0, isValid: 'FALSE ❌ (Col Conflict)' },
    desc: 'Step 6: Try (2, 0). Conflict with Queen at (0, 0).'
  },
  {
    activeLine: 3,
    row: 2,
    col: 1,
    board: [
      [1, 0, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    conflictCell: [2, 1],
    state: { row: 2, col: 1, isValid: 'FALSE ❌ (Diagonal Conflict)' },
    desc: 'Step 7: Try (2, 1). Conflict with Queen at (1, 2).'
  },
  {
    activeLine: 3,
    row: 2,
    col: 2,
    board: [
      [1, 0, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    conflictCell: [2, 2],
    state: { row: 2, col: 2, isValid: 'FALSE ❌ (Col Conflict)' },
    desc: 'Step 8: Try (2, 2). Conflict with Queen at (1, 2).'
  },
  {
    activeLine: 3,
    row: 2,
    col: 3,
    board: [
      [1, 0, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    conflictCell: [2, 3],
    state: { row: 2, col: 3, isValid: 'FALSE ❌ (Diagonal Conflict)' },
    desc: 'Step 9: Try (2, 3). Conflict with Queen at (1, 2).'
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
    desc: 'Step 10: Row 2 has no valid columns! ⏪ BACKTRACK to Row 1, remove Queen at (1, 2).'
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
    desc: 'Step 11: Try (1, 3). Valid! Place Queen at (1, 3) and recurse to row 2.'
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
    desc: 'Step 12: Try (2, 1). Valid! Place Queen at (2, 1) and recurse to row 3.'
  },
  {
    activeLine: 3,
    row: 3,
    col: 0,
    board: [
      [1, 0, 0, 0],
      [0, 0, 0, 1],
      [0, 1, 0, 0],
      [0, 0, 0, 0]
    ],
    conflictCell: [3, 0],
    state: { row: 3, col: 0, isValid: 'FALSE ❌ (Col Conflict)' },
    desc: 'Step 13: Try (3, 0). Conflict with Queen at (0, 0).'
  },
  {
    activeLine: 3,
    row: 3,
    col: 1,
    board: [
      [1, 0, 0, 0],
      [0, 0, 0, 1],
      [0, 1, 0, 0],
      [0, 0, 0, 0]
    ],
    conflictCell: [3, 1],
    state: { row: 3, col: 1, isValid: 'FALSE ❌ (Col Conflict)' },
    desc: 'Step 14: Try (3, 1). Conflict with Queen at (2, 1).'
  },
  {
    activeLine: 3,
    row: 3,
    col: 2,
    board: [
      [1, 0, 0, 0],
      [0, 0, 0, 1],
      [0, 1, 0, 0],
      [0, 0, 0, 0]
    ],
    conflictCell: [3, 2],
    state: { row: 3, col: 2, isValid: 'FALSE ❌ (Diagonal Conflict)' },
    desc: 'Step 15: Try (3, 2). Conflict with Queen at (2, 1).'
  },
  {
    activeLine: 3,
    row: 3,
    col: 3,
    board: [
      [1, 0, 0, 0],
      [0, 0, 0, 1],
      [0, 1, 0, 0],
      [0, 0, 0, 0]
    ],
    conflictCell: [3, 3],
    state: { row: 3, col: 3, isValid: 'FALSE ❌ (Col Conflict)' },
    desc: 'Step 16: Try (3, 3). Conflict with Queen at (1, 3).'
  },
  {
    activeLine: 7,
    row: 0,
    col: 0,
    board: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    state: { row: 0, action: '⏪ BACKTRACK ALL THE WAY TO ROW 0!' },
    desc: 'Step 17: Entire sub-tree under Queen at (0, 0) failed! ⏪ BACKTRACK to Row 0. Try (0, 1).'
  },
  {
    activeLine: 3,
    row: 0,
    col: 1,
    board: [
      [0, 1, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    state: { row: 0, col: 1, isValid: 'TRUE ✅', queensPlaced: 1 },
    desc: 'Step 18: Try (0, 1). Valid! Place Queen at (0, 1) and recurse to row 1.'
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
    desc: 'Step 19: Try (1, 3). Valid! Place Queen at (1, 3) and recurse to row 2.'
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
    desc: 'Step 20: Try (2, 0). Valid! Place Queen at (2, 0) and recurse to row 3.'
  },
  {
    activeLine: 3,
    row: 3,
    col: 2,
    board: [
      [0, 1, 0, 0],
      [0, 0, 0, 1],
      [1, 0, 0, 0],
      [0, 0, 1, 0]
    ],
    state: { row: 3, col: 2, isValid: 'TRUE ✅', queensPlaced: 4, solutionsFound: 1 },
    desc: 'Step 21: Try (3, 2). Valid! Place Queen at (3, 2). Row 4 reached!'
  },
  {
    activeLine: 2,
    row: 4,
    col: null,
    board: [
      [0, 1, 0, 0],
      [0, 0, 0, 1],
      [1, 0, 0, 0],
      [0, 0, 1, 0]
    ],
    state: { queensPlaced: 4, solutionsFound: 1, Solution_1: '[(0,1), (1,3), (2,0), (3,2)]' },
    desc: 'Step 22: 🎉 SOLUTION 1 FOUND! Queens placed at (0,1), (1,3), (2,0), (3,2). All 4 queens non-attacking!'
  },
  {
    activeLine: 7,
    row: 0,
    col: 2,
    board: [
      [0, 0, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    state: { row: 0, col: 2, action: 'Backtrack to find Solution 2', queensPlaced: 1 },
    desc: 'Step 23: Continue search. Try placing Queen at (0, 2) in Row 0.'
  },
  {
    activeLine: 3,
    row: 1,
    col: 0,
    board: [
      [0, 0, 1, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    state: { row: 1, col: 0, isValid: 'TRUE ✅', queensPlaced: 2 },
    desc: 'Step 24: Place Queen at (1, 0). Valid! Recurse to row 2.'
  },
  {
    activeLine: 3,
    row: 2,
    col: 3,
    board: [
      [0, 0, 1, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 1],
      [0, 0, 0, 0]
    ],
    state: { row: 2, col: 3, isValid: 'TRUE ✅', queensPlaced: 3 },
    desc: 'Step 25: Place Queen at (2, 3). Valid! Recurse to row 3.'
  },
  {
    activeLine: 3,
    row: 3,
    col: 1,
    board: [
      [0, 0, 1, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 1],
      [0, 1, 0, 0]
    ],
    state: { row: 3, col: 1, isValid: 'TRUE ✅', queensPlaced: 4, solutionsFound: 2 },
    desc: 'Step 26: Place Queen at (3, 1). Valid! Row 4 reached!'
  },
  {
    activeLine: 2,
    row: 4,
    col: null,
    board: [
      [0, 0, 1, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 1],
      [0, 1, 0, 0]
    ],
    state: { queensPlaced: 4, solutionsFound: 2, Solution_2: '[(0,2), (1,0), (2,3), (3,1)]' },
    desc: 'Step 27: 🎉 SOLUTION 2 FOUND! Queens placed at (0,2), (1,0), (2,3), (3,1).'
  },
  {
    activeLine: 2,
    row: 4,
    col: null,
    board: [
      [0, 1, 0, 0],
      [0, 0, 0, 1],
      [1, 0, 0, 0],
      [0, 0, 1, 0]
    ],
    state: { TotalSolutions: 2, Result: 'N-Queens 4x4 completed!' },
    desc: 'Step 28: Algorithm Completed! Found all 2 total non-attacking arrangements for 4x4 N-Queens.'
  }
];

// 2. SUDOKU SOLVER (4x4 Mini Sudoku) EXHAUSTIVE STEP TRACE
const SUDOKU_STEPS = [
  {
    activeLine: 1,
    board: [
      [1, 0, 0, 4],
      [0, 0, 2, 0],
      [0, 3, 0, 0],
      [2, 0, 0, 1]
    ],
    state: { row: 0, col: 1, emptyCell: '(0, 1)' },
    desc: 'Step 1: Start solveSudoku(). Find first empty cell at row 0, col 1.'
  },
  {
    activeLine: 3,
    board: [
      [1, 1, 0, 4],
      [0, 0, 2, 0],
      [0, 3, 0, 0],
      [2, 0, 0, 1]
    ],
    conflictCell: [0, 1],
    state: { row: 0, col: 1, num: 1, isValid: 'FALSE ❌ (Row 0 already contains 1)' },
    desc: 'Step 2: Try num=1 at (0, 1). CONFLICT! Row 0 already has num=1.'
  },
  {
    activeLine: 4,
    board: [
      [1, 2, 0, 4],
      [0, 0, 2, 0],
      [0, 3, 0, 0],
      [2, 0, 0, 1]
    ],
    state: { row: 0, col: 1, num: 2, isValid: 'TRUE ✅' },
    desc: 'Step 3: Try num=2 at (0, 1). Check Row, Col, 2x2 Box. Valid! Place 2.'
  },
  {
    activeLine: 1,
    board: [
      [1, 2, 0, 4],
      [0, 0, 2, 0],
      [0, 3, 0, 0],
      [2, 0, 0, 1]
    ],
    state: { row: 0, col: 2, emptyCell: '(0, 2)' },
    desc: 'Step 4: Find next empty cell at (0, 2).'
  },
  {
    activeLine: 4,
    board: [
      [1, 2, 3, 4],
      [0, 0, 2, 0],
      [0, 3, 0, 0],
      [2, 0, 0, 1]
    ],
    state: { row: 0, col: 2, num: 3, isValid: 'TRUE ✅' },
    desc: 'Step 5: Try num=3 at (0, 2). Valid! Row 0 completed: [1, 2, 3, 4].'
  },
  {
    activeLine: 1,
    board: [
      [1, 2, 3, 4],
      [0, 0, 2, 0],
      [0, 3, 0, 0],
      [2, 0, 0, 1]
    ],
    state: { row: 1, col: 0, emptyCell: '(1, 0)' },
    desc: 'Step 6: Move to Row 1. Next empty cell is (1, 0).'
  },
  {
    activeLine: 3,
    board: [
      [1, 2, 3, 4],
      [1, 0, 2, 0],
      [0, 3, 0, 0],
      [2, 0, 0, 1]
    ],
    conflictCell: [1, 0],
    state: { row: 1, col: 0, num: 1, isValid: 'FALSE ❌ (Col 0 conflict)' },
    desc: 'Step 7: Try num=1 at (1, 0). Conflict! Col 0 has num=1.'
  },
  {
    activeLine: 3,
    board: [
      [1, 2, 3, 4],
      [2, 0, 2, 0],
      [0, 3, 0, 0],
      [2, 0, 0, 1]
    ],
    conflictCell: [1, 0],
    state: { row: 1, col: 0, num: 2, isValid: 'FALSE ❌ (Col 0 conflict)' },
    desc: 'Step 8: Try num=2 at (1, 0). Conflict! Col 0 has num=2 at (3, 0).'
  },
  {
    activeLine: 4,
    board: [
      [1, 2, 3, 4],
      [3, 0, 2, 0],
      [0, 3, 0, 0],
      [2, 0, 0, 1]
    ],
    state: { row: 1, col: 0, num: 3, isValid: 'TRUE ✅' },
    desc: 'Step 9: Try num=3 at (1, 0). Valid! Place 3 at (1, 0).'
  },
  {
    activeLine: 4,
    board: [
      [1, 2, 3, 4],
      [3, 4, 2, 0],
      [0, 3, 0, 0],
      [2, 0, 0, 1]
    ],
    state: { row: 1, col: 1, num: 4, isValid: 'TRUE ✅' },
    desc: 'Step 10: At (1, 1), place num=4. Valid!'
  },
  {
    activeLine: 4,
    board: [
      [1, 2, 3, 4],
      [3, 4, 2, 1],
      [0, 3, 0, 0],
      [2, 0, 0, 1]
    ],
    state: { row: 1, col: 3, num: 1, isValid: 'TRUE ✅' },
    desc: 'Step 11: At (1, 3), place num=1. Row 1 completed: [3, 4, 2, 1].'
  },
  {
    activeLine: 4,
    board: [
      [1, 2, 3, 4],
      [3, 4, 2, 1],
      [4, 3, 1, 2],
      [2, 0, 0, 1]
    ],
    state: { row: 2, status: 'Row 2 Filled [4, 3, 1, 2]' },
    desc: 'Step 12: Fill Row 2 cells: (2,0)=4, (2,1)=3, (2,2)=1, (2,3)=2. Valid!'
  },
  {
    activeLine: 4,
    board: [
      [1, 2, 3, 4],
      [3, 4, 2, 1],
      [4, 3, 1, 2],
      [2, 1, 4, 3]
    ],
    state: { row: 3, status: 'Row 3 Filled [2, 1, 4, 3]' },
    desc: 'Step 13: Fill Row 3 cells: (3,1)=1, (3,2)=4, (3,3)=3. Valid!'
  },
  {
    activeLine: 6,
    board: [
      [1, 2, 3, 4],
      [3, 4, 2, 1],
      [4, 3, 1, 2],
      [2, 1, 4, 3]
    ],
    state: { Status: 'SOLVED 🎉', Result: 'Full grid valid!' },
    desc: 'Step 14: 🎉 Sudoku Solved! All 16 cells filled. Every row, col, and 2x2 box contains numbers 1-4 without repetition.'
  }
];

// 3. SUBSETS (Power Set of [1, 2, 3]) EXHAUSTIVE STEP TRACE
const SUBSETS_STEPS = [
  { activeLine: 1, index: 0, currentPath: [], subsets: [[]], state: { index: 0, path: '[]', totalSubsets: 1 }, desc: 'Step 1: Start generateSubsets(index 0, path []). Add empty set [] to result.' },
  { activeLine: 3, index: 1, currentPath: [1], subsets: [[], [1]], state: { Decision: 'INCLUDE arr[0]=1', path: '[1]' }, desc: 'Step 2: Decision 1: INCLUDE arr[0]=1. Path = [1]. Add [1] to result.' },
  { activeLine: 3, index: 2, currentPath: [1, 2], subsets: [[], [1], [1, 2]], state: { Decision: 'INCLUDE arr[1]=2', path: '[1, 2]' }, desc: 'Step 3: Decision 2: INCLUDE arr[1]=2. Path = [1, 2]. Add [1, 2] to result.' },
  { activeLine: 3, index: 3, currentPath: [1, 2, 3], subsets: [[], [1], [1, 2], [1, 2, 3]], state: { Decision: 'INCLUDE arr[2]=3', path: '[1, 2, 3]' }, desc: 'Step 4: Decision 3: INCLUDE arr[2]=3. Path = [1, 2, 3]. Leaf reached!' },
  { activeLine: 5, index: 2, currentPath: [1, 2], subsets: [[], [1], [1, 2], [1, 2, 3]], state: { Decision: 'EXCLUDE 3 (Pop 3)', path: '[1, 2]' }, desc: 'Step 5: ⏪ Backtrack! Pop 3 from path.' },
  { activeLine: 5, index: 1, currentPath: [1], subsets: [[], [1], [1, 2], [1, 2, 3]], state: { Decision: 'EXCLUDE 2 (Pop 2)', path: '[1]' }, desc: 'Step 6: ⏪ Backtrack! Pop 2 from path.' },
  { activeLine: 3, index: 3, currentPath: [1, 3], subsets: [[], [1], [1, 2], [1, 2, 3], [1, 3]], state: { Decision: 'INCLUDE 3 (from [1])', path: '[1, 3]' }, desc: 'Step 7: Branch right: INCLUDE 3. Path = [1, 3]. Add [1, 3] to result.' },
  { activeLine: 5, index: 0, currentPath: [], subsets: [[], [1], [1, 2], [1, 2, 3], [1, 3]], state: { Decision: 'EXCLUDE 1 (Pop 1)', path: '[]' }, desc: 'Step 8: ⏪ Backtrack! Pop 1. Path = []. Now explore subsets without element 1.' },
  { activeLine: 3, index: 2, currentPath: [2], subsets: [[], [1], [1, 2], [1, 2, 3], [1, 3], [2]], state: { Decision: 'INCLUDE arr[1]=2', path: '[2]' }, desc: 'Step 9: Decision: INCLUDE arr[1]=2. Path = [2]. Add [2] to result.' },
  { activeLine: 3, index: 3, currentPath: [2, 3], subsets: [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3]], state: { Decision: 'INCLUDE arr[2]=3', path: '[2, 3]' }, desc: 'Step 10: Decision: INCLUDE arr[2]=3. Path = [2, 3]. Add [2, 3] to result.' },
  { activeLine: 5, index: 1, currentPath: [], subsets: [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3]], state: { Decision: 'EXCLUDE 2 (Pop 2)', path: '[]' }, desc: 'Step 11: ⏪ Backtrack! Pop 2.' },
  { activeLine: 3, index: 3, currentPath: [3], subsets: [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]], state: { Decision: 'INCLUDE arr[2]=3', path: '[3]' }, desc: 'Step 12: Decision: INCLUDE arr[2]=3. Path = [3]. Add [3] to result.' },
  { activeLine: 2, index: 3, currentPath: [], subsets: [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]], state: { TotalSubsets: 8, Result: 'Power Set Complete!' }, desc: 'Step 13: 🎉 Power Set Complete! Generated all 2³ = 8 subsets: [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]].' }
];

export const useBacktrackingStore = create((set, get) => ({
  track: 'n-queens',
  boardSize: 4,
  steps: NQUEENS_STEPS,
  currentStep: 0,
  isPlaying: false,
  speed: 1,
  practiceMode: false,
  userCode: `// N-Queens Backtracking Template\nfunction solveNQueens(n) {\n  let board = Array(n).fill().map(() => Array(n).fill('.'));\n  let res = [];\n  function backtrack(row) {\n    if (row === n) {\n      res.push(board.map(r => r.join('')));\n      return;\n    }\n    for (let col = 0; col < n; col++) {\n      if (isValid(board, row, col)) {\n        board[row][col] = 'Q';\n        backtrack(row + 1);\n        board[row][col] = '.'; // Backtrack\n      }\n    }\n  }\n  backtrack(0);\n  return res;\n}`,

  setTrack: (track) => {
    if (track === 'n-queens') {
      set({ track: 'n-queens', boardSize: 4, steps: NQUEENS_STEPS, currentStep: 0, isPlaying: false });
    } else if (track === 'sudoku') {
      set({ track: 'sudoku', boardSize: 4, steps: SUDOKU_STEPS, currentStep: 0, isPlaying: false });
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
