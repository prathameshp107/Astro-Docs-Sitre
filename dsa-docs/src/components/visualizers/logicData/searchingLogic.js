export const searchingLogic = {
  'searching': {
    title: 'Searching Algorithms (Linear vs Binary Search)',
    input: 'Sorted Array = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91], Target = 23',
    goal: 'Compare linear scan O(N) versus logarithmic binary search O(log N).',
    terms: {
      'Low Pointer': 'Starts at index 0 (leftmost boundary). Moves right (Low = Mid + 1) if arr[Mid] < target.',
      'High Pointer': 'Starts at index N-1 (rightmost boundary). Moves left (High = Mid - 1) if arr[Mid] > target.',
      'Mid Pointer': 'Middle index calculated as Mid = Low + (High - Low) / 2.'
    },
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Calculate Mid = 4 (val 16)',
        left: 0, right: 9,
        array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
        computation: 'Mid = (0 + 9) / 2 = 4 (val 16)',
        comparison: '16 < 23 ➔ Eliminate left half',
        action: 'Shift Low to 5',
        desc: 'Calculate Mid = 4 (val 16). Mid value 16 < target 23. Shift Low to index 5!'
      },
      {
        stepNum: 2,
        title: 'Step 2: Target 23 Matched at Index 5! 🎉',
        left: 5, right: 6,
        array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
        computation: 'Mid = (5 + 6) / 2 = 5 (val 23)',
        comparison: '23 == 23 (MATCH FOUND! 🎉)',
        action: 'Return Index 5',
        isMatch: true,
        desc: 'Calculate new Mid = 5. arr[5] = 23 == target 23! Target found in O(log N) time! 🎉'
      }
    ]
  },

  'searching-binary-search': {
    title: 'Binary Search O(log N)',
    input: 'Sorted Array = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91], Target = 23',
    goal: 'Find target index in logarithmic O(log N) time by halving search space at each iteration.',
    terms: {
      'low': 'Start index of active search range.',
      'high': 'End index of active search range.',
      'mid': 'Midpoint index = floor((low + high) / 2).'
    },
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Iteration 1 — Search Range [0..9] ➔ Mid = 4 (val 16)',
        left: 0, right: 9, mid: 4,
        leftLabel: 'low', rightLabel: 'high', midLabel: 'mid',
        array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
        computation: 'mid = (0 + 9) / 2 = 4 (val 16)',
        comparison: '16 < 23 ➔ Shift low to mid + 1 (5)',
        action: 'Halve Search Space',
        desc: 'Iteration 1: Range [0..9]. Calculate mid = 4 (arr[4] = 16). Since 16 < target 23, target is in right half. Shift low = 5.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Iteration 2 — Search Range [5..9] ➔ Mid = 7 (val 56)',
        left: 5, right: 9, mid: 7,
        leftLabel: 'low', rightLabel: 'high', midLabel: 'mid',
        array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
        computation: 'mid = (5 + 9) / 2 = 7 (val 56)',
        comparison: '56 > 23 ➔ Shift high to mid - 1 (6)',
        action: 'Halve Search Space',
        desc: 'Iteration 2: Range [5..9]. Calculate mid = 7 (arr[7] = 56). Since 56 > target 23, target is in left half. Shift high = 6.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Iteration 3 — Search Range [5..6] ➔ Mid = 5 (val 23)',
        left: 5, right: 6, mid: 5,
        leftLabel: 'low', rightLabel: 'high', midLabel: 'mid',
        array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
        computation: 'mid = (5 + 6) / 2 = 5 (val 23)',
        comparison: '23 == 23 ➔ MATCH FOUND! 🎉',
        action: 'Return Index 5',
        isMatch: true,
        desc: 'Iteration 3: Range [5..6]. Calculate mid = 5 (arr[5] = 23). Compare 23 == 23 ✅ MATCH FOUND!'
      },
      {
        stepNum: 4,
        title: 'Step 4: Binary Search Complete ➔ Return Index 5 🎉',
        left: 5, right: 6, mid: 5,
        leftLabel: 'low', rightLabel: 'high', midLabel: 'mid',
        array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
        computation: 'Target 23 at Index 5',
        comparison: 'FOUND IN O(log N) TIME 🎉',
        action: 'Return 5',
        isMatch: true,
        desc: 'Binary Search complete! Located target 23 at index 5 in 3 comparisons (O(log N) time). 🎉'
      }
    ]
  },

  'searching-linear-search': {
    title: 'Linear Search O(N)',
    input: 'Unsorted Array = [12, 45, 67, 23, 89, 34], Target = 23',
    goal: 'Scan unsorted elements sequentially until target is found in O(N) time.',
    terms: {
      'Scan Index (i)': 'Current element index being inspected from 0 to N-1.',
      'Equality Check': 'Evaluates arr[i] === target.'
    },
    array: [12, 45, 67, 23, 89, 34],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Inspect Index 0 (val 12) — Compare 12 == 23',
        left: 0, right: 0,
        leftLabel: 'i', rightLabel: 'i',
        array: [12, 45, 67, 23, 89, 34],
        computation: 'i = 0, arr[0] = 12',
        comparison: '12 == 23 (FALSE ❌)',
        action: 'Advance i to 1',
        desc: 'Inspect index 0. Compare arr[0]=12 against target 23. Mismatch ❌! Advance pointer i to 1.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Inspect Index 1 (val 45) — Compare 45 == 23',
        left: 1, right: 1,
        leftLabel: 'i', rightLabel: 'i',
        array: [12, 45, 67, 23, 89, 34],
        computation: 'i = 1, arr[1] = 45',
        comparison: '45 == 23 (FALSE ❌)',
        action: 'Advance i to 2',
        desc: 'Inspect index 1. Compare arr[1]=45 against target 23. Mismatch ❌! Advance pointer i to 2.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Inspect Index 2 (val 67) — Compare 67 == 23',
        left: 2, right: 2,
        leftLabel: 'i', rightLabel: 'i',
        array: [12, 45, 67, 23, 89, 34],
        computation: 'i = 2, arr[2] = 67',
        comparison: '67 == 23 (FALSE ❌)',
        action: 'Advance i to 3',
        desc: 'Inspect index 2. Compare arr[2]=67 against target 23. Mismatch ❌! Advance pointer i to 3.'
      },
      {
        stepNum: 4,
        title: 'Step 4: Inspect Index 3 (val 23) — Compare 23 == 23',
        left: 3, right: 3,
        leftLabel: 'i', rightLabel: 'i',
        array: [12, 45, 67, 23, 89, 34],
        computation: 'i = 3, arr[3] = 23',
        comparison: '23 == 23 (MATCH FOUND! 🎉)',
        action: 'Return Index 3',
        isMatch: true,
        desc: 'Inspect index 3. Compare arr[3]=23 against target 23. Match found ✅! Trigger return.'
      },
      {
        stepNum: 5,
        title: 'Step 5: Linear Search Complete ➔ Return Index 3 🎉',
        left: 3, right: 3,
        leftLabel: 'i', rightLabel: 'i',
        array: [12, 45, 67, 23, 89, 34],
        computation: 'Target 23 at Index 3',
        comparison: 'FOUND IN O(N) TIME 🎉',
        action: 'Return 3',
        isMatch: true,
        desc: 'Linear search complete! Target 23 located at index 3 in 4 comparisons. 🎉'
      }
    ]
  }
};
