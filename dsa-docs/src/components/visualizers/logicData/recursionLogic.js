export const recursionLogic = {
  'recursion': {
    title: 'Recursion & Call Stack Mechanics',
    input: 'Call fact(4)',
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
        left: 0, right: 0,
        leftLabel: 'fact(4)', rightLabel: 'fact(4)',
        array: [4],
        computation: 'Call fact(4) ➔ Check base case (4 <= 1): FALSE ❌',
        comparison: 'Winding Phase ⬇️',
        action: 'Push fact(4)',
        desc: 'Call fact(4). Base case 4 <= 1 is FALSE. Proceed to recursive step 4 * fact(3).'
      },
      {
        stepNum: 2,
        title: 'Step 2: Winding Phase — Push fact(3) & fact(2) onto Stack',
        left: 0, right: 2,
        leftLabel: 'fact(4)', rightLabel: 'fact(2)',
        array: [4, 3, 2],
        computation: 'Stack: [fact(4), fact(3), fact(2)]',
        comparison: 'Stack Depth = 3',
        action: 'Push fact(3), fact(2)',
        desc: 'Winding phase continues: push fact(3) and fact(2) onto call stack.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Base Case Reached — fact(1) Returns 1 🎯',
        left: 0, right: 3,
        leftLabel: 'fact(4)', rightLabel: 'fact(1)',
        array: [4, 3, 2, 1],
        computation: 'fact(1) returns 1 (1 <= 1 is TRUE ✅)',
        comparison: 'BASE CASE REACHED 🎯',
        action: 'Return 1',
        desc: 'Call fact(1). Base case (1 <= 1) reached! Returns 1. Winding phase complete, unwinding begins!'
      },
      {
        stepNum: 4,
        title: 'Step 4: Unwinding Phase — Evaluate Returns 1 ➔ 2 ➔ 6 ➔ 24',
        left: 0, right: 3,
        leftLabel: 'fact(4)', rightLabel: 'fact(1)',
        array: [24, 6, 2, 1],
        computation: 'fact(2)=2*1=2 ➔ fact(3)=3*2=6 ➔ fact(4)=4*6=24',
        comparison: 'Unwinding Phase ⬆️',
        action: 'Pop Stack Frames',
        desc: 'Unwind stack: fact(2) receives 1 → 2. fact(3) receives 2 → 6. fact(4) receives 6 → 24.'
      },
      {
        stepNum: 5,
        title: 'Step 5: Final Result fact(4) = 24 🎉',
        left: 0, right: 0,
        leftLabel: 'result', rightLabel: 'result',
        array: [24],
        computation: 'fact(4) = 24',
        comparison: 'RECURSION COMPLETE 🎉',
        action: 'Return 24',
        isMatch: true,
        desc: 'Call stack fully unwound! Final result 24 returned in O(N) time and O(N) space! 🎉'
      }
    ]
  },

  'factorial': {
    title: 'Factorial N! Recursive Winding & Unwinding O(N)',
    input: 'n = 4',
    goal: 'Compute 4! = 4 * 3 * 2 * 1 = 24 using recursive function calls.',
    terms: {
      'Base Case': 'if (n <= 1) return 1',
      'Recurrence': 'return n * fact(n - 1)'
    },
    array: [4, 3, 2, 1],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Start fact(4) ➔ Recurse Down to Base Case',
        left: 0, right: 3,
        leftLabel: 'fact(4)', rightLabel: 'fact(1)',
        array: [4, 3, 2, 1],
        computation: 'Stack depth 4: [fact(4), fact(3), fact(2), fact(1)]',
        comparison: 'Winding Phase ⬇️',
        action: 'Push Stack Frames',
        desc: 'Call fact(4), fact(3), fact(2), fact(1). Push 4 call frames onto stack.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Base Case hit at fact(1) ➔ Returns 1',
        left: 3, right: 3,
        leftLabel: 'base case', rightLabel: 'base case',
        array: [4, 3, 2, 1],
        computation: 'fact(1) = 1',
        comparison: '1 <= 1 (TRUE ✅)',
        action: 'Return 1',
        desc: 'fact(1) hits base case and returns 1.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Unwind fact(2) = 2 * 1 = 2',
        left: 2, right: 2,
        leftLabel: 'fact(2)', rightLabel: 'fact(2)',
        array: [4, 3, 2, 1],
        computation: 'fact(2) = 2 * 1 = 2',
        comparison: 'Pop fact(1)',
        action: 'Return 2',
        desc: 'fact(2) receives 1 from fact(1), computes 2 * 1 = 2, pops frame.'
      },
      {
        stepNum: 4,
        title: 'Step 4: Unwind fact(3) = 3 * 2 = 6',
        left: 1, right: 1,
        leftLabel: 'fact(3)', rightLabel: 'fact(3)',
        array: [4, 3, 2, 1],
        computation: 'fact(3) = 3 * 2 = 6',
        comparison: 'Pop fact(2)',
        action: 'Return 6',
        desc: 'fact(3) receives 2 from fact(2), computes 3 * 2 = 6, pops frame.'
      },
      {
        stepNum: 5,
        title: 'Step 5: Unwind fact(4) = 4 * 6 = 24 ➔ Complete 🎉',
        left: 0, right: 0,
        leftLabel: 'result', rightLabel: 'result',
        array: [24],
        computation: 'fact(4) = 4 * 6 = 24',
        comparison: '4! = 24 🎉',
        action: 'Return 24',
        isMatch: true,
        desc: 'fact(4) receives 6, computes 4 * 6 = 24. Factorial complete! 🎉'
      }
    ]
  },

  'fibonacci': {
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
        title: 'Step 1: Call fib(4) ➔ Branch into fib(3) and fib(2)',
        left: 0, right: 1,
        leftLabel: 'fib(4)', rightLabel: 'branches',
        array: [4, 3, 2],
        computation: 'fib(4) = fib(3) + fib(2)',
        comparison: 'Recurse Left Branch',
        action: 'Call fib(3)',
        desc: 'Call fib(4). Recurse left branch to compute fib(3).'
      },
      {
        stepNum: 2,
        title: 'Step 2: Evaluate Left Branch fib(3) = fib(2) + fib(1) = 2',
        left: 1, right: 2,
        leftLabel: 'fib(3)', rightLabel: 'val 2',
        array: [3, 2, 1],
        computation: 'fib(3) = 2',
        comparison: 'fib(3) = 2',
        action: 'Return fib(3)',
        desc: 'Evaluate fib(3): computes fib(2)=1 + fib(1)=1 = 2.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Evaluate Right Branch fib(2) = fib(1) + fib(0) = 1',
        left: 2, right: 2,
        leftLabel: 'fib(2)', rightLabel: 'val 1',
        array: [2, 1, 0],
        computation: 'fib(2) = 1',
        comparison: 'fib(2) = 1',
        action: 'Return fib(2)',
        desc: 'Evaluate right branch fib(2) = 1 + 0 = 1.'
      },
      {
        stepNum: 4,
        title: 'Step 4: Combine fib(3) + fib(2) ➔ fib(4) = 3 🎉',
        left: 0, right: 4,
        leftLabel: 'start', rightLabel: 'end',
        array: [0, 1, 1, 2, 3],
        computation: 'fib(4) = 2 + 1 = 3',
        comparison: 'FIB(4) = 3 🎉',
        action: 'Return 3',
        isMatch: true,
        desc: 'Combine left (2) and right (1): fib(4) = 3! 🎉'
      }
    ]
  }
};
