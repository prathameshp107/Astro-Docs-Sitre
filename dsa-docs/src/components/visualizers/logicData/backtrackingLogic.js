import { buildSudokuSteps } from '../../../store/visualizers/backtrackingStore.js';

export const backtrackingLogic = {
  'backtracking': {
    title: '1. Backtracking Concept - N-Queens (4x4)',
    input: 'Board = 4x4 Chessboard, N = 4 Queens',
    goal: 'Place N non-attacking queens on N x N chessboard using DFS & backtracking.',
    terms: {
      'Row / Col': 'Board coordinates for attempting Queen placement (row 0..3, col 0..3).',
      'Conflict Check': 'Validates that no queen attacks on same column, row, or major/minor diagonals.',
      'Backtrack Action ⏪': 'Removes previously placed queen when current row encounters a dead-end with no valid columns.'
    },
    array: ['Q0', 'Q1', 'Q2', 'Q3'],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Try Placing Queen at (0, 0)',
        left: 0,
        right: 0,
        board: [
          [1, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        computation: 'Valid placement at (0, 0)',
        comparison: 'Row 0 Valid ✅',
        action: 'Recurse to Row 1',
        desc: 'Place Queen at (0, 0). Check safety against all previously placed queens: Row 0 has zero queens so far. Column 0 and both diagonal attack vectors are completely clear! Place Queen at (0, 0) and recurse to Row 1.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Try (1, 0) ➔ Column Conflict ❌',
        left: 1,
        right: 0,
        board: [
          [1, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        conflictCell: [1, 0],
        computation: 'Col 0 already occupied by Queen at (0, 0)',
        comparison: 'Column Conflict ❌',
        action: 'Try Col 1',
        desc: 'Inspect Row 1, Column 0 for candidate placement (1, 0). Check column safety: Column 0 already contains a Queen placed at (0, 0)! This triggers an immediate Column Conflict ❌. Prune this branch and advance to Column 1.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Try (1, 1) ➔ Diagonal Conflict ❌',
        left: 1,
        right: 1,
        board: [
          [1, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        conflictCell: [1, 1],
        computation: 'Major diagonal attack from Queen at (0, 0)',
        comparison: 'Diagonal Conflict ❌',
        action: 'Try Col 2',
        desc: 'Inspect Row 1, Column 1 for candidate placement (1, 1). Check diagonal safety: The cell (1, 1) lies directly on the major diagonal extending from (0, 0) since |1 - 0| === |1 - 0|! This triggers a Diagonal Conflict ❌. Prune this branch and advance to Column 2.'
      },
      {
        stepNum: 4,
        title: 'Step 4: Try (1, 2) ➔ Valid Placement ✅',
        left: 1,
        right: 2,
        board: [
          [1, 0, 0, 0],
          [0, 0, 1, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        computation: 'Valid placement at (1, 2)',
        comparison: 'Row 1 Valid ✅',
        action: 'Recurse to Row 2',
        desc: 'Inspect Row 1, Column 2 for candidate placement (1, 2). Check safety: Column 2 is unoccupied, and no diagonal alignment exists with (0, 0). Placement is Valid ✅! Place Queen at (1, 2) and recurse to Row 2.'
      },
      {
        stepNum: 5,
        title: 'Step 5: Row 2 Dead-End (No Valid Columns)',
        left: 2,
        right: 0,
        board: [
          [1, 0, 0, 0],
          [0, 0, 1, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        conflictCell: [2, 0],
        computation: 'Conflicts at (2,0), (2,1), (2,2), (2,3)',
        comparison: 'DEAD END ❌',
        action: 'Trigger Backtrack ⏪',
        desc: 'Inspect Row 2: Test candidate cells (2, 0), (2, 1), (2, 2), and (2, 3). Cell (2, 0) conflicts with col 0, (2, 1) conflicts with diagonal from (1, 2), (2, 2) conflicts with col 2, and (2, 3) conflicts with diagonal from (1, 2)! All 4 columns in Row 2 fail! DEAD END ❌ reached.'
      },
      {
        stepNum: 6,
        title: 'Step 6: Backtrack to Row 1 ⏪ (Remove Queen at (1, 2))',
        left: 1,
        right: 2,
        board: [
          [1, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        computation: 'Remove Queen from (1, 2)',
        comparison: 'Backtrack Action ⏪',
        action: 'Try Col 3',
        desc: 'Row 2 produced zero valid placements! ⏪ BACKTRACK to Row 1 by popping the stack frame. Un-place the Queen at (1, 2) by restoring cell (1, 2) to empty (0). Resume search in Row 1 starting at Column 3.'
      },
      {
        stepNum: 7,
        title: 'Step 7: Place Queen at (1, 3)',
        left: 1,
        right: 3,
        board: [
          [1, 0, 0, 0],
          [0, 0, 0, 1],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        computation: 'Valid placement at (1, 3)',
        comparison: 'Row 1 Valid ✅',
        action: 'Recurse to Row 2',
        desc: 'Inspect Row 1, Column 3 for candidate placement (1, 3). Check safety against Queen at (0, 0): Column 3 is free, and no diagonal conflict exists. Placement is Valid ✅! Place Queen at (1, 3) and recurse to Row 2.'
      },
      {
        stepNum: 8,
        title: 'Step 8: Place Queen at (2, 1)',
        left: 2,
        right: 1,
        board: [
          [1, 0, 0, 0],
          [0, 0, 0, 1],
          [0, 1, 0, 0],
          [0, 0, 0, 0]
        ],
        computation: 'Valid placement at (2, 1)',
        comparison: 'Row 2 Valid ✅',
        action: 'Recurse to Row 3',
        desc: 'Inspect Row 2, Column 1 for candidate placement (2, 1). Check safety: Column 1 is free, and diagonal checks against (0, 0) and (1, 3) both pass! Placement is Valid ✅! Place Queen at (2, 1) and recurse to Row 3.'
      },
      {
        stepNum: 9,
        title: 'Step 9: Row 3 Dead-End ➔ Backtrack to Row 0 ⏪',
        left: 0,
        right: 1,
        board: [
          [0, 1, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        computation: 'Row 3 dead-end! Backtrack to Row 0 col 1',
        comparison: 'Branch Switch ⏪',
        action: 'Place Queen at (0, 1)',
        desc: 'Row 3 fails all column checks! ⏪ Backtrack all the way back to Row 0! Remove Queen from (0, 0). Advance Row 0 to Column 1 (0, 1). Column 1 is clear! Place Queen at (0, 1) and explore the entire right decision subtree.'
      },
      {
        stepNum: 10,
        title: 'Step 10: Complete 4-Queens Solution Found! 🎉',
        left: 0,
        right: 3,
        board: [
          [0, 1, 0, 0],
          [0, 0, 0, 1],
          [1, 0, 0, 0],
          [0, 0, 1, 0]
        ],
        computation: 'Queens placed at (0,1), (1,3), (2,0), (3,2)',
        comparison: '4 QUEENS NON-ATTACKING 🎉',
        action: 'Record Solution',
        isMatch: true,
        desc: 'Recurse through rows 1..3 along the (0, 1) branch. Queens successfully placed at (0, 1), (1, 3), (2, 0), and (3, 2). All 4 Queens sit in mutually non-attacking squares! FIRST SOLUTION DISCOVERED 🎉!'
      }
    ]
  },

  'backtracking-n-queens': {
    title: 'N-Queens Solver (4x4 Chessboard)',
    input: 'Board = 4x4 Chessboard, N = 4 Queens',
    goal: 'Find all non-attacking queen configurations on N x N chessboard.',
    terms: {
      'Row / Col': 'Board coordinates for attempting Queen placement (row 0..3, col 0..3).',
      'Conflict Check': 'Validates that no queen attacks on same column, row, or major/minor diagonals.',
      'Backtrack Action ⏪': 'Removes previously placed queen when current row encounters a dead-end with no valid columns.'
    },
    array: ['Q0', 'Q1', 'Q2', 'Q3'],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Place Queen at (0, 0)',
        left: 0,
        right: 0,
        board: [
          [1, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        computation: 'Valid placement at (0, 0)',
        comparison: 'Row 0 Valid ✅',
        action: 'Recurse to Row 1',
        desc: 'Place Queen at (0, 0). Check safety against all previously placed queens: Row 0 has zero queens so far. Column 0 and both diagonal attack vectors are completely clear! Place Queen at (0, 0) and recurse to Row 1.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Try (1, 0) Column Conflict ❌',
        left: 1,
        right: 0,
        board: [
          [1, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        conflictCell: [1, 0],
        computation: 'Col 0 occupied',
        comparison: 'Column Conflict ❌',
        action: 'Try Col 1',
        desc: 'Inspect Row 1, Column 0 for candidate placement (1, 0). Check column safety: Column 0 already contains a Queen placed at (0, 0)! This triggers an immediate Column Conflict ❌. Prune this branch and advance to Column 1.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Try (1, 1) Diagonal Conflict ❌',
        left: 1,
        right: 1,
        board: [
          [1, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        conflictCell: [1, 1],
        computation: 'Diagonal attack',
        comparison: 'Diagonal Conflict ❌',
        action: 'Try Col 2',
        desc: 'Inspect Row 1, Column 1 for candidate placement (1, 1). Check diagonal safety: The cell (1, 1) lies directly on the major diagonal extending from (0, 0) since |1 - 0| === |1 - 0|! This triggers a Diagonal Conflict ❌. Prune this branch and advance to Column 2.'
      },
      {
        stepNum: 4,
        title: 'Step 4: Place Queen at (1, 2)',
        left: 1,
        right: 2,
        board: [
          [1, 0, 0, 0],
          [0, 0, 1, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        computation: 'Valid placement at (1, 2)',
        comparison: 'Row 1 Valid ✅',
        action: 'Recurse to Row 2',
        desc: 'Inspect Row 1, Column 2 for candidate placement (1, 2). Check safety: Column 2 is unoccupied, and no diagonal alignment exists with (0, 0). Placement is Valid ✅! Place Queen at (1, 2) and recurse to Row 2.'
      },
      {
        stepNum: 5,
        title: 'Step 5: Backtrack to Row 1 ⏪',
        left: 1,
        right: 2,
        board: [
          [1, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        computation: 'Row 2 dead end ➔ Remove (1, 2)',
        comparison: 'Backtrack ⏪',
        action: 'Try Col 3',
        desc: 'Row 2 produced zero valid placements! ⏪ BACKTRACK to Row 1 by popping the stack frame. Un-place the Queen at (1, 2) by restoring cell (1, 2) to empty (0). Resume search in Row 1 starting at Column 3.'
      },
      {
        stepNum: 6,
        title: 'Step 6: Solution 1 Found at (0,1), (1,3), (2,0), (3,2)! 🎉',
        left: 0,
        right: 3,
        board: [
          [0, 1, 0, 0],
          [0, 0, 0, 1],
          [1, 0, 0, 0],
          [0, 0, 1, 0]
        ],
        computation: 'Solution 1: (0,1), (1,3), (2,0), (3,2)',
        comparison: 'N-QUEENS SOLVED 🎉',
        action: 'Solution Found',
        isMatch: true,
        desc: 'Recurse through rows 1..3 along the (0, 1) branch. Queens successfully placed at (0, 1), (1, 3), (2, 0), and (3, 2). All 4 Queens sit in mutually non-attacking squares! FIRST SOLUTION DISCOVERED 🎉!'
      }
    ]
  },

  'backtracking-sudoku': {
    title: 'Sudoku Solver (4x4 Mini Grid)',
    input: 'Grid = 4x4 Mini Sudoku Grid',
    goal: 'Fill empty cells with digits 1..4 such that each row, col, and 2x2 box is unique.',
    terms: {
      'Cell (r, c)': 'Target empty grid cell coordinate.',
      'Digit Candidate': 'Digits 1..4 attempted in target cell.',
      'Subgrid Check': 'Validates digit against row, column, and 2x2 subgrid.'
    },
    array: [1, 2, 3, 4],
    steps: buildSudokuSteps().map((step, index) => ({
      ...step,
      stepNum: index + 1,
      title: `Step ${index + 1}: ${step.state.action}`,
      left: step.row,
      right: step.col,
      activeCell: step.row === null ? null : [step.row, step.col],
      computation: step.desc,
      comparison: step.conflictCell ? 'Candidate conflicts with an existing digit' : 'Grid constraints preserved',
      action: step.state.action,
    })),
  },

  'backtracking-subsets': {
    title: 'Subsets & Power Set Generator',
    input: 'Array = [1, 2, 3]',
    goal: 'Generate all 2^N possible subsets using binary decision tree.',
    terms: {
      'Include Branch': 'Decision to include arr[i] into current subset.',
      'Exclude Branch': 'Decision to skip arr[i] and leave subset unchanged.',
      'Power Set': 'Complete set of all 2^N sub-collections.'
    },
    array: [1, 2, 3],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Start Decision Tree (Empty Subset [])',
        left: 0,
        right: 0,
        currentSubset: [],
        subsets: [[]],
        computation: 'Initial state: []',
        comparison: 'Power set size = 1',
        action: 'Include 1',
        desc: 'Initialize the binary decision tree for generating power set of [1, 2, 3]. At depth 0, the current subset is empty []. Record [] as the 1st valid subset in the power set.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Include 1 ➔ Subset [1]',
        left: 0,
        right: 0,
        currentSubset: [1],
        subsets: [[], [1]],
        computation: 'Include element 1: [1]',
        comparison: 'Subset [1] generated',
        action: 'Recurse',
        desc: 'At index 0 (val 1), explore the INCLUDE branch. Append 1 to current subset ➔ [1]. Recurse to index 1. Record subset [1] into power set.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Include 2 ➔ Subset [1, 2]',
        left: 0,
        right: 1,
        currentSubset: [1, 2],
        subsets: [[], [1], [1, 2]],
        computation: 'Include element 2: [1, 2]',
        comparison: 'Subset [1, 2] generated',
        action: 'Recurse',
        desc: 'At index 1 (val 2), explore the INCLUDE branch. Append 2 to current subset ➔ [1, 2]. Recurse to index 2. Record subset [1, 2] into power set.'
      },
      {
        stepNum: 4,
        title: 'Step 4: Include 3 ➔ Subset [1, 2, 3]',
        left: 0,
        right: 2,
        currentSubset: [1, 2, 3],
        subsets: [[], [1], [1, 2], [1, 2, 3]],
        computation: 'Include element 3: [1, 2, 3]',
        comparison: 'Leaf Reached',
        action: 'Backtrack 3 ⏪',
        desc: 'At index 2 (val 3), explore the INCLUDE branch. Append 3 to current subset ➔ [1, 2, 3]. Base case depth 3 reached! Record leaf subset [1, 2, 3] into power set.'
      },
      {
        stepNum: 5,
        title: 'Step 5: Backtrack Element 3 ⏪',
        left: 0,
        right: 1,
        currentSubset: [1, 2],
        subsets: [[], [1], [1, 2], [1, 2, 3]],
        computation: 'Remove element 3 ➔ Back to [1, 2]',
        comparison: 'Backtrack Action ⏪',
        action: 'Try Exclude 2',
        desc: 'Base case finished! ⏪ BACKTRACK to depth 2 by popping element 3 from current subset [1, 2, 3] ➔ Current subset reverts to [1, 2].'
      },
      {
        stepNum: 6,
        title: 'Step 6: Exclude 2, Include 3 ➔ Subset [1, 3]',
        left: 0,
        right: 2,
        currentSubset: [1, 3],
        subsets: [[], [1], [1, 2], [1, 2, 3], [1, 3]],
        computation: 'Subset = [1, 3]',
        comparison: 'Subset [1, 3] generated',
        action: 'Recurse Right Branch',
        desc: 'At depth 2, explore the EXCLUDE branch for element 2 and INCLUDE branch for element 3. Current subset becomes [1, 3]. Record subset [1, 3] into power set.'
      },
      {
        stepNum: 7,
        title: 'Step 7: Exclude 1, Include 2 ➔ Subset [2]',
        left: 1,
        right: 1,
        currentSubset: [2],
        subsets: [[], [1], [1, 2], [1, 2, 3], [1, 3], [2]],
        computation: 'Backtrack to root: Exclude 1, Include 2',
        comparison: 'Subset [2] generated',
        action: 'Recurse',
        desc: 'Backtrack to root depth 0. Explore right branch excluding element 1 and including element 2. Current subset = [2]. Record subset [2] into power set.'
      },
      {
        stepNum: 8,
        title: 'Step 8: Include 3 ➔ Subset [2, 3]',
        left: 1,
        right: 2,
        currentSubset: [2, 3],
        subsets: [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3]],
        computation: 'Include 3: [2, 3]',
        comparison: 'Subset [2, 3] generated',
        action: 'Recurse',
        desc: 'At index 2, include element 3. Current subset = [2, 3]. Record subset [2, 3] into power set.'
      },
      {
        stepNum: 9,
        title: 'Step 9: All 8 Subsets Generated! 🎉',
        left: 0,
        right: 2,
        currentSubset: [],
        subsets: [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]],
        computation: 'Power Set: [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]',
        comparison: '2^3 = 8 SUBSETS COMPLETE 🎉',
        action: 'Return Power Set',
        isMatch: true,
        desc: 'All 2^3 = 8 binary decision branches fully traversed! Power set generation complete: [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]]. 🎉'
      }
    ]
  }
};
