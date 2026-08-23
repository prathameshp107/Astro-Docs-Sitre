

export const recursionLogic = {

  'recursion': {
    title: 'Recursion & Call Stack Mechanics',
    input: 'Call fact(4) to compute 4!',
    goal: 'Demonstrate winding phase (pushing recursive frames onto call stack) and unwinding phase (popping frames and returning values).',
    terms: {
      'Base Case': 'Terminating condition that stops further recursive calls.',
      'Recursive Step': 'Function calling itself with a smaller subproblem.',
      'Winding Phase': 'Pushing stack frames onto execution call stack.',
      'Unwinding Phase': 'Evaluating returned values and popping stack frames top-down.'
    },
    array: [4, 3, 2, 1],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Initial Call — fact(4)',
        activeLine: 1,
        callStack: [{ fn: 'fact(4)', n: 4, phase: 'winding' }],
        state: { n: 4, 'n <= 1': 'FALSE ❌', phase: 'Winding Down ⬇️' },
        array: [4],
        computation: 'Call fact(4) ➔ Check base case (4 <= 1): FALSE ❌',
        comparison: 'Winding Phase ⬇️',
        action: 'Push fact(4)',
        desc: 'Line 1: Initial invocation fact(4). Check base case (4 <= 1), which evaluates to FALSE. Execution proceeds to recursive step n * fact(n-1).'
      },
      {
        stepNum: 2,
        title: 'Step 2: Winding Phase — Push fact(3) & fact(2) onto Stack',
        activeLine: 2,
        callStack: [
          { fn: 'fact(3)', n: 3, phase: 'winding' },
          { fn: 'fact(4)', n: 4, phase: 'winding' }
        ],
        state: { n: 3, action: 'Recurse: 4 * fact(3)', stackDepth: 2 },
        array: [4, 3, 2],
        computation: 'Stack: [fact(4), fact(3), fact(2)]',
        comparison: 'Stack Depth = 3',
        action: 'Push fact(3), fact(2)',
        desc: 'Line 2: Winding phase continues: fact(4) pauses at line 2 and pushes fact(3) onto the call stack. Next, fact(3) pauses and pushes fact(2).'
      },
      {
        stepNum: 3,
        title: 'Step 3: Base Case Reached — fact(1) Returns 1 🎯',
        activeLine: 1,
        callStack: [
          { fn: 'fact(1)', n: 1, phase: 'winding' },
          { fn: 'fact(2)', n: 2, phase: 'winding' },
          { fn: 'fact(3)', n: 3, phase: 'winding' },
          { fn: 'fact(4)', n: 4, phase: 'winding' }
        ],
        state: { n: 1, 'n <= 1': 'TRUE ✅', phase: 'Base Case Reached! 🎯' },
        array: [4, 3, 2, 1],
        computation: 'fact(1) returns 1 (1 <= 1 is TRUE ✅)',
        comparison: 'BASE CASE REACHED 🎯',
        action: 'Return 1',
        desc: 'Line 1: Call fact(1). Base case (1 <= 1) evaluates to TRUE ✅! Returns 1 immediately without making further recursive calls. Winding phase complete!'
      },
      {
        stepNum: 4,
        title: 'Step 4: Unwinding Phase — Evaluate Returns 1 ➔ 2 ➔ 6 ➔ 24',
        activeLine: 2,
        callStack: [
          { fn: 'fact(2)', n: 2, phase: 'unwinding', ret: '2 * 1 = 2' },
          { fn: 'fact(3)', n: 3, phase: 'winding' },
          { fn: 'fact(4)', n: 4, phase: 'winding' }
        ],
        state: { popped: 'fact(1) = 1', returnedTo: 'fact(2)', retVal: 2, phase: 'Unwinding Up ⬆️' },
        array: [24, 6, 2, 1],
        computation: 'fact(2)=2*1=2 ➔ fact(3)=3*2=6 ➔ fact(4)=4*6=24',
        comparison: 'Unwinding Phase ⬆️',
        action: 'Pop Stack Frames',
        desc: 'Line 2: Unwind stack frames: fact(2) receives 1 → computes 2 * 1 = 2. Then fact(3) receives 2 → computes 3 * 2 = 6. Finally fact(4) receives 6 → computes 4 * 6 = 24.'
      },
      {
        stepNum: 5,
        title: 'Step 5: Final Result fact(4) = 24 🎉',
        activeLine: 2,
        callStack: [
          { fn: 'fact(4)', n: 4, phase: 'unwinding', ret: '4 * 6 = 24' }
        ],
        state: { popped: 'fact(3) = 6', returnedTo: 'fact(4)', result: 24, status: 'FACTORIAL COMPLETE 🎉' },
        array: [24],
        computation: 'fact(4) = 24',
        comparison: 'RECURSION COMPLETE 🎉',
        action: 'Return 24',
        isMatch: true,
        desc: 'Line 2: Call stack fully unwound! Final result 24 returned in O(N) time and O(N) stack space! 🎉'
      }
    ]
  },

  'recursion-factorial': {
    title: 'Factorial N! Recursive Winding & Unwinding O(N)',
    input: 'n = 4',
    goal: 'Compute 4! = 4 * 3 * 2 * 1 = 24 using recursive function call stack frames.',
    terms: {
      'Base Case': 'if (n <= 1) return 1',
      'Recurrence': 'return n * fact(n - 1)'
    },
    array: [4, 3, 2, 1],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Invoke fact(4) — Check Base Case',
        activeLine: 1,
        callStack: [{ fn: 'fact(4)', n: 4, phase: 'winding' }],
        state: { n: 4, 'n <= 1': 'FALSE ❌', phase: 'Winding Down ⬇️' },
        array: [4],
        computation: 'Call fact(4). Check 4 <= 1: FALSE',
        comparison: 'Winding Phase ⬇️',
        action: 'Check Base Case',
        desc: 'Line 1: Call fact(4). Check base case (4 <= 1): FALSE. Proceed to recursive step.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Recurse into fact(3) — Stack Depth 2',
        activeLine: 2,
        callStack: [
          { fn: 'fact(3)', n: 3, phase: 'winding' },
          { fn: 'fact(4)', n: 4, phase: 'winding' }
        ],
        state: { n: 3, action: 'Recurse: 4 * fact(3)', stackDepth: 2 },
        array: [4, 3],
        computation: 'Push fact(3) onto Call Stack',
        comparison: 'Stack Depth = 2',
        action: 'Push fact(3)',
        desc: 'Line 2: Push fact(3) onto Call Stack. Waiting for fact(3)...'
      },
      {
        stepNum: 3,
        title: 'Step 3: Recurse into fact(2) — Stack Depth 3',
        activeLine: 2,
        callStack: [
          { fn: 'fact(2)', n: 2, phase: 'winding' },
          { fn: 'fact(3)', n: 3, phase: 'winding' },
          { fn: 'fact(4)', n: 4, phase: 'winding' }
        ],
        state: { n: 2, action: 'Recurse: 3 * fact(2)', stackDepth: 3 },
        array: [4, 3, 2],
        computation: 'Push fact(2) onto Call Stack',
        comparison: 'Stack Depth = 3',
        action: 'Push fact(2)',
        desc: 'Line 2: Push fact(2) onto Call Stack. Waiting for fact(2)...'
      },
      {
        stepNum: 4,
        title: 'Step 4: Reach Base Case at fact(1) ➔ Returns 1',
        activeLine: 1,
        callStack: [
          { fn: 'fact(1)', n: 1, phase: 'winding' },
          { fn: 'fact(2)', n: 2, phase: 'winding' },
          { fn: 'fact(3)', n: 3, phase: 'winding' },
          { fn: 'fact(4)', n: 4, phase: 'winding' }
        ],
        state: { n: 1, 'n <= 1': 'TRUE ✅', phase: 'Base Case Reached! 🎯' },
        array: [4, 3, 2, 1],
        computation: 'fact(1) = 1 (1 <= 1 is TRUE ✅)',
        comparison: 'BASE CASE REACHED 🎯',
        action: 'Return 1',
        desc: 'Line 1: Call fact(1). Base case (1 <= 1) reached! Returns 1.'
      },
      {
        stepNum: 5,
        title: 'Step 5: Unwind fact(2) = 2 * 1 = 2',
        activeLine: 2,
        callStack: [
          { fn: 'fact(2)', n: 2, phase: 'unwinding', ret: '2 * 1 = 2' },
          { fn: 'fact(3)', n: 3, phase: 'winding' },
          { fn: 'fact(4)', n: 4, phase: 'winding' }
        ],
        state: { popped: 'fact(1) = 1', returnedTo: 'fact(2)', retVal: 2, phase: 'Unwinding Up ⬆️' },
        array: [4, 3, 2],
        computation: 'fact(2) = 2 * 1 = 2',
        comparison: 'Pop fact(1)',
        action: 'Return 2',
        desc: 'Line 2: Unwind stack frame: fact(2) receives 1 → returns 2 * 1 = 2.'
      },
      {
        stepNum: 6,
        title: 'Step 6: Unwind fact(3) = 3 * 2 = 6',
        activeLine: 2,
        callStack: [
          { fn: 'fact(3)', n: 3, phase: 'unwinding', ret: '3 * 2 = 6' },
          { fn: 'fact(4)', n: 4, phase: 'winding' }
        ],
        state: { popped: 'fact(2) = 2', returnedTo: 'fact(3)', retVal: 6 },
        array: [4, 3],
        computation: 'fact(3) = 3 * 2 = 6',
        comparison: 'Pop fact(2)',
        action: 'Return 6',
        desc: 'Line 2: Unwind stack frame: fact(3) receives 2 → returns 3 * 2 = 6.'
      },
      {
        stepNum: 7,
        title: 'Step 7: Unwind Top Frame fact(4) = 4 * 6 = 24 🎉',
        activeLine: 2,
        callStack: [
          { fn: 'fact(4)', n: 4, phase: 'unwinding', ret: '4 * 6 = 24' }
        ],
        state: { popped: 'fact(3) = 6', returnedTo: 'fact(4)', result: 24, status: 'FACTORIAL COMPLETE 🎉' },
        array: [24],
        computation: 'fact(4) = 4 * 6 = 24',
        comparison: '4! = 24 🎉',
        action: 'Return 24',
        isMatch: true,
        desc: 'Line 2: Unwind top frame: fact(4) receives 6 → returns 4 * 6 = 24! Final Answer = 24. 🎉'
      }
    ]
  },

  'recursion-fibonacci': {
    title: 'Fibonacci Call Tree & Subproblem Overlap O(2^N)',
    input: 'n = 4',
    goal: 'Demonstrate tree of recursive calls fib(N) = fib(N-1) + fib(N-2).',
    terms: {
      'Base Cases': 'fib(0) = 0, fib(1) = 1',
      'Overlapping Subproblems': 'fib(2) is calculated multiple times redundantly.'
    },
    array: [0, 1, 1, 2, 3],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Invoke fib(4) — Check Base Case',
        activeLine: 1,
        callStack: [{ fn: 'fib(4)', n: 4 }],
        state: { n: 4, 'n <= 1': 'FALSE ❌' },
        array: [4],
        computation: 'Call fib(4). Check 4 <= 1: FALSE',
        comparison: 'Recurse Left Branch',
        action: 'Call fib(4)',
        desc: 'Line 1: Call fib(4). Check base case (4 <= 1): FALSE.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Recurse into Left Child fib(3)',
        activeLine: 2,
        callStack: [
          { fn: 'fib(3)', n: 3 },
          { fn: 'fib(4)', n: 4 }
        ],
        state: { branch: 'Left branch fib(3)' },
        array: [4, 3],
        computation: 'left = fib(3)',
        comparison: 'Recurse fib(3)',
        action: 'Call fib(3)',
        desc: 'Line 2: Recurse into left child fib(3).'
      },
      {
        stepNum: 3,
        title: 'Step 3: Recurse into Left Child fib(2)',
        activeLine: 2,
        callStack: [
          { fn: 'fib(2)', n: 2 },
          { fn: 'fib(3)', n: 3 },
          { fn: 'fib(4)', n: 4 }
        ],
        state: { branch: 'Left branch fib(2)' },
        array: [4, 3, 2],
        computation: 'left = fib(2)',
        comparison: 'Recurse fib(2)',
        action: 'Call fib(2)',
        desc: 'Line 2: Recurse into left child fib(2).'
      },
      {
        stepNum: 4,
        title: 'Step 4: Reach Base Case fib(1) ➔ Returns 1',
        activeLine: 1,
        callStack: [
          { fn: 'fib(1)', n: 1, ret: 1 },
          { fn: 'fib(2)', n: 2 },
          { fn: 'fib(3)', n: 3 },
          { fn: 'fib(4)', n: 4 }
        ],
        state: { 'fib(1)': 1, baseCase: 'TRUE ✅' },
        array: [4, 3, 2, 1],
        computation: 'fib(1) = 1 (1 <= 1 is TRUE ✅)',
        comparison: 'Base Case 1',
        action: 'Return 1',
        desc: 'Line 1: fib(1) reaches base case → returns 1.'
      },
      {
        stepNum: 5,
        title: 'Step 5: Reach Base Case fib(0) ➔ Returns 0',
        activeLine: 1,
        callStack: [
          { fn: 'fib(0)', n: 0, ret: 0 },
          { fn: 'fib(2)', n: 2 },
          { fn: 'fib(3)', n: 3 },
          { fn: 'fib(4)', n: 4 }
        ],
        state: { 'fib(0)': 0, baseCase: 'TRUE ✅' },
        array: [4, 3, 2, 0],
        computation: 'fib(0) = 0 (0 <= 1 is TRUE ✅)',
        comparison: 'Base Case 0',
        action: 'Return 0',
        desc: 'Line 1: fib(0) reaches base case → returns 0.'
      },
      {
        stepNum: 6,
        title: 'Step 6: Evaluate fib(2) = fib(1) + fib(0) = 1 + 0 = 1',
        activeLine: 4,
        callStack: [
          { fn: 'fib(3)', n: 3, leftRet: 1 },
          { fn: 'fib(4)', n: 4 }
        ],
        state: { 'fib(2)': '1 + 0 = 1', returnedTo: 'fib(3)' },
        array: [4, 3, 1],
        computation: 'fib(2) = 1 + 0 = 1',
        comparison: 'fib(2) = 1',
        action: 'Return fib(2)',
        desc: 'Line 4: fib(2) returns fib(1) + fib(0) = 1 + 0 = 1.'
      },
      {
        stepNum: 7,
        title: 'Step 7: Combine sub-results: fib(4) = fib(3) + fib(2) = 2 + 1 = 3 🎉',
        activeLine: 4,
        callStack: [{ fn: 'fib(4)', n: 4, result: 3 }],
        state: { 'fib(4)': 'fib(3) + fib(2) = 2 + 1 = 3', status: 'FIBONACCI COMPLETE 🎉' },
        array: [3],
        computation: 'fib(4) = 2 + 1 = 3',
        comparison: 'FIBONACCI COMPLETE 🎉',
        action: 'Return 3',
        isMatch: true,
        desc: 'Line 4: Combine sub-results: fib(4) = fib(3) + fib(2) = 2 + 1 = 3. Final Answer = 3! 🎉'
      }
    ]
  },

  'recursion-tower-of-hanoi': {
    title: 'Tower of Hanoi (Divide & Conquer)',
    input: 'n = 3 Disks, Transfer Peg A → Peg C',
    goal: 'Move 3 disks from Peg A to Peg C using Peg B in minimal 7 moves.',
    terms: {
      'Min Moves Formula': '2^n - 1 moves (2^3 - 1 = 7 moves)',
      'Rule 1': 'Move only one disk at a time.',
      'Rule 2': 'Never place a larger disk on top of a smaller disk.'
    },
    array: [1, 2, 3],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Init Tower of Hanoi (n = 3 Disks on Peg A)',
        activeLine: 1,
        pegs: { A: [3, 2, 1], B: [], C: [] },
        callStack: [{ fn: 'hanoi(3, A, C, B)' }],
        move: { disk: null, from: null, to: null, stepNum: 0 },
        state: { n: 3, from: 'Peg A', to: 'Peg C', aux: 'Peg B', moves: 0 },
        array: [3, 2, 1],
        computation: 'hanoi(3, A, C, B)',
        comparison: 'Init Pegs',
        action: 'Init Hanoi',
        desc: 'Line 1: Initial state: 3 disks stacked on Peg A (Source). Goal: Move all disks to Peg C (Destination) using Peg B (Auxiliary).'
      },
      {
        stepNum: 2,
        title: 'Step 2: Move 1 — Move Disk 1 from Peg A to Peg C',
        activeLine: 2,
        pegs: { A: [3, 2], B: [], C: [1] },
        callStack: [{ fn: 'moveDisk(1, A → C)' }],
        move: { disk: 1, from: 'A', to: 'C', stepNum: 1 },
        state: { disk: 1, from: 'Peg A', to: 'Peg C', moveCount: '1 / 7' },
        array: [3, 2],
        computation: 'Move Disk 1: A → C',
        comparison: 'Disk 1 Transferred',
        action: 'Move Disk 1',
        desc: 'Line 2: Move 1: Move Disk 1 from Peg A to Peg C.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Move 2 — Move Disk 2 from Peg A to Peg B',
        activeLine: 2,
        pegs: { A: [3], B: [2], C: [1] },
        callStack: [{ fn: 'moveDisk(2, A → B)' }],
        move: { disk: 2, from: 'A', to: 'B', stepNum: 2 },
        state: { disk: 2, from: 'Peg A', to: 'Peg B', moveCount: '2 / 7' },
        array: [3],
        computation: 'Move Disk 2: A → B',
        comparison: 'Disk 2 Transferred',
        action: 'Move Disk 2',
        desc: 'Line 2: Move 2: Move Disk 2 from Peg A to Peg B.'
      },
      {
        stepNum: 4,
        title: 'Step 4: Move 3 — Move Disk 1 from Peg C to Peg B',
        activeLine: 2,
        pegs: { A: [3], B: [2, 1], C: [] },
        callStack: [{ fn: 'moveDisk(1, C → B)' }],
        move: { disk: 1, from: 'C', to: 'B', stepNum: 3 },
        state: { disk: 1, from: 'Peg C', to: 'Peg B', moveCount: '3 / 7' },
        array: [3],
        computation: 'Move Disk 1: C → B',
        comparison: 'Disk 1 Transferred',
        action: 'Move Disk 1',
        desc: 'Line 2: Move 3: Move Disk 1 from Peg C to Peg B. Smaller disks 1 & 2 are now safely stacked on Peg B.'
      },
      {
        stepNum: 5,
        title: 'Step 5: Move 4 — Move Largest Disk 3 from Peg A to Peg C',
        activeLine: 3,
        pegs: { A: [], B: [2, 1], C: [3] },
        callStack: [{ fn: 'moveDisk(3, A → C)' }],
        move: { disk: 3, from: 'A', to: 'C', stepNum: 4 },
        state: { disk: 3, from: 'Peg A', to: 'Peg C', moveCount: '4 / 7', note: 'Largest Disk 3 placed on Destination!' },
        array: [3],
        computation: 'Move Disk 3: A → C',
        comparison: 'Disk 3 Transferred',
        action: 'Move Disk 3',
        desc: 'Line 3: Move 4: Move largest Disk 3 from Peg A directly to Peg C (Destination)!'
      },
      {
        stepNum: 6,
        title: 'Step 6: Move 5 — Move Disk 1 from Peg B to Peg A',
        activeLine: 4,
        pegs: { A: [1], B: [2], C: [3] },
        callStack: [{ fn: 'moveDisk(1, B → A)' }],
        move: { disk: 1, from: 'B', to: 'A', stepNum: 5 },
        state: { disk: 1, from: 'Peg B', to: 'Peg A', moveCount: '5 / 7' },
        array: [1],
        computation: 'Move Disk 1: B → A',
        comparison: 'Disk 1 Transferred',
        action: 'Move Disk 1',
        desc: 'Line 4: Move 5: Move Disk 1 from Peg B to Peg A.'
      },
      {
        stepNum: 7,
        title: 'Step 7: Move 6 — Move Disk 2 from Peg B to Peg C',
        activeLine: 4,
        pegs: { A: [1], B: [], C: [3, 2] },
        callStack: [{ fn: 'moveDisk(2, B → C)' }],
        move: { disk: 2, from: 'B', to: 'C', stepNum: 6 },
        state: { disk: 2, from: 'Peg B', to: 'Peg C', moveCount: '6 / 7' },
        array: [2],
        computation: 'Move Disk 2: B → C',
        comparison: 'Disk 2 Transferred',
        action: 'Move Disk 2',
        desc: 'Line 4: Move 6: Move Disk 2 from Peg B to Peg C on top of Disk 3.'
      },
      {
        stepNum: 8,
        title: 'Step 8: Move 7 — Move Disk 1 to Peg C ➔ Complete! 🎉',
        activeLine: 4,
        pegs: { A: [], B: [], C: [3, 2, 1] },
        callStack: [{ fn: 'hanoi(3) COMPLETE' }],
        move: { disk: 1, from: 'A', to: 'C', stepNum: 7 },
        state: { disk: 1, from: 'Peg A', to: 'Peg C', moveCount: '7 / 7', status: 'TOWER OF HANOI COMPLETE 🎉' },
        array: [3, 2, 1],
        computation: 'All Disks on Peg C',
        comparison: 'HANOI COMPLETE 🎉',
        action: 'Complete Transfer',
        isMatch: true,
        desc: 'Line 4: Move 7: Move Disk 1 from Peg A to Peg C. All 3 disks transferred to Peg C in optimal 7 moves (2^3 - 1)! 🎉'
      }
    ]
  },

  'recursion-subsets': {
    title: 'Subsets / Backtracking Recursive Generation',
    input: 'Set = [1, 2]',
    goal: 'Generate all 2^N subsets using inclusion/exclusion recursion tree.',
    terms: {
      'Include Branch': 'Include current element into subset path.',
      'Exclude Branch': 'Exclude current element and backtrack.'
    },
    array: [1, 2],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Initial Call backtrack(idx=0, path=[])',
        activeLine: 1,
        callStack: [{ fn: 'backtrack(idx=0, path=[])' }],
        subsets: [[]],
        currPath: [],
        currIdx: 0,
        state: { path: '[]', index: 0, subsetCount: 1 },
        array: [],
        computation: 'backtrack(0, [])',
        comparison: 'Init Subsets',
        action: 'Init Search',
        desc: 'Line 1: Initial call backtrack(index=0, path=[]). Empty subset [] collected into results.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Include Element 1 ➔ path = [1]',
        activeLine: 2,
        callStack: [{ fn: 'backtrack(idx=1, path=[1])' }],
        subsets: [[]],
        currPath: [1],
        currIdx: 1,
        state: { decision: 'Include element 1 (arr[0])', path: '[1]' },
        array: [1],
        computation: 'Include 1 ➔ path=[1]',
        comparison: 'Include 1',
        action: 'Include 1',
        desc: 'Line 2: Decision at index 0: INCLUDE element 1 → path becomes [1]. Recurse to index 1.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Include Element 2 ➔ path = [1, 2]',
        activeLine: 2,
        callStack: [{ fn: 'backtrack(idx=2, path=[1, 2])' }],
        subsets: [[], [1, 2]],
        currPath: [1, 2],
        currIdx: 2,
        state: { decision: 'Include element 2 (arr[1])', path: '[1, 2]', subsetCount: 2 },
        array: [1, 2],
        computation: 'Include 2 ➔ path=[1, 2]',
        comparison: 'Include 2',
        action: 'Include 2',
        desc: 'Line 2: Decision at index 1: INCLUDE element 2 → path becomes [1, 2]. Base case reached (idx == 2) → collect subset [1, 2]!'
      },
      {
        stepNum: 4,
        title: 'Step 4: Backtrack & Exclude Element 2 ➔ path = [1]',
        activeLine: 3,
        callStack: [{ fn: 'backtrack(idx=2, path=[1])' }],
        subsets: [[], [1, 2], [1]],
        currPath: [1],
        currIdx: 2,
        state: { decision: 'Backtrack & Exclude element 2', path: '[1]', subsetCount: 3 },
        array: [1],
        computation: 'Exclude 2 ➔ Backtrack',
        comparison: 'Exclude 2',
        action: 'Backtrack',
        desc: 'Line 3: Backtrack from [1, 2] → remove 2. Decision at index 1: EXCLUDE element 2 → path remains [1]. Collect subset [1]!'
      },
      {
        stepNum: 5,
        title: 'Step 5: Backtrack to Root & Exclude Element 1 ➔ path = []',
        activeLine: 3,
        callStack: [{ fn: 'backtrack(idx=1, path=[])' }],
        subsets: [[], [1, 2], [1]],
        currPath: [],
        currIdx: 1,
        state: { decision: 'Backtrack & Exclude element 1', path: '[]' },
        array: [],
        computation: 'Exclude 1 ➔ Backtrack Root',
        comparison: 'Exclude 1',
        action: 'Backtrack Root',
        desc: 'Line 3: Backtrack to root → remove 1. Decision at index 0: EXCLUDE element 1 → path becomes []. Recurse to right branch.'
      },
      {
        stepNum: 6,
        title: 'Step 6: Right Branch — Include Element 2 ➔ path = [2]',
        activeLine: 2,
        callStack: [{ fn: 'backtrack(idx=2, path=[2])' }],
        subsets: [[], [1, 2], [1], [2]],
        currPath: [2],
        currIdx: 2,
        state: { decision: 'Include element 2 (arr[1])', path: '[2]', subsetCount: 4 },
        array: [2],
        computation: 'Include 2 ➔ path=[2]',
        comparison: 'Include 2',
        action: 'Include 2',
        desc: 'Line 2: Right branch decision at index 1: INCLUDE element 2 → path becomes [2]. Base case reached → collect subset [2]!'
      },
      {
        stepNum: 7,
        title: 'Step 7: All 4 Subsets Generated 🎉',
        activeLine: 3,
        callStack: [{ fn: 'subsets COMPLETE' }],
        subsets: [[], [1, 2], [1], [2]],
        currPath: [],
        currIdx: 2,
        state: { subsets: '[[], [1, 2], [1], [2]]', totalSubsets: 4, status: 'SUBSETS COMPLETE 🎉' },
        array: [2],
        computation: 'All 4 Subsets Generated',
        comparison: 'SUBSETS COMPLETE 🎉',
        action: 'Return Subsets',
        isMatch: true,
        desc: 'Line 3: Subsets recursion tree traversal complete! All 2^2 = 4 subsets generated: [[], [1, 2], [1], [2]]! 🎉'
      }
    ]
  }
};
