import { create } from 'zustand';

const CLIMBING_STAIRS_STEPS = [
  {
    activeLine: 1,
    dp1D: [1, null, null, null, null, null],
    activeCell: 0,
    depCells: [],
    state: { 'dp[0]': 1, note: 'Ground floor (stair 0)' },
    desc: 'Line 1: Base case dp[0] = 1 (1 way to stay at ground floor / start).',
  },
  {
    activeLine: 1,
    dp1D: [1, 1, null, null, null, null],
    activeCell: 1,
    depCells: [0],
    state: { 'dp[0]': 1, 'dp[1]': 1, note: 'Stair 1 base case' },
    desc: 'Line 1: Base case dp[1] = 1 (only 1 way to reach stair 1: take a single 1-step).',
  },
  {
    activeLine: 2,
    dp1D: [1, 1, 2, null, null, null],
    activeCell: 2,
    depCells: [0, 1],
    state: { active: 'dp[2]', formula: 'dp[1] + dp[0]', calculation: '1 + 1 = 2' },
    desc: 'Line 2: Calculate dp[2] = dp[1] + dp[0] = 1 + 1 = 2 distinct ways to reach stair 2.',
  },
  {
    activeLine: 2,
    dp1D: [1, 1, 2, 3, null, null],
    activeCell: 3,
    depCells: [1, 2],
    state: { active: 'dp[3]', formula: 'dp[2] + dp[1]', calculation: '2 + 1 = 3' },
    desc: 'Line 2: Calculate dp[3] = dp[2] + dp[1] = 2 + 1 = 3 distinct ways to reach stair 3.',
  },
  {
    activeLine: 2,
    dp1D: [1, 1, 2, 3, 5, null],
    activeCell: 4,
    depCells: [2, 3],
    state: { active: 'dp[4]', formula: 'dp[3] + dp[2]', calculation: '3 + 2 = 5' },
    desc: 'Line 2: Calculate dp[4] = dp[3] + dp[2] = 3 + 2 = 5 distinct ways to reach stair 4.',
  },
  {
    activeLine: 2,
    dp1D: [1, 1, 2, 3, 5, 8],
    activeCell: 5,
    depCells: [3, 4],
    state: { active: 'dp[5]', formula: 'dp[4] + dp[3]', calculation: '5 + 3 = 8' },
    desc: 'Line 2: Calculate dp[5] = dp[4] + dp[3] = 5 + 3 = 8 distinct ways to reach target stair 5.',
  },
  {
    activeLine: 3,
    dp1D: [1, 1, 2, 3, 5, 8],
    activeCell: 5,
    depCells: [3, 4],
    state: { result: 8, status: 'CLIMBING STAIRS COMPLETE 🎉' },
    desc: 'Line 3: Return dp[5] = 8! There are 8 distinct ways to climb 5 stairs. 🎉',
  },
];

const KNAPSACK_STEPS = [
  {
    activeLine: 1,
    dp2D: [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    items: [
      { name: 'Item 1', w: 2, v: 3 },
      { name: 'Item 2', w: 3, v: 4 },
      { name: 'Item 3', w: 4, v: 5 },
    ],
    activeCell: { r: 0, c: 0 },
    depCells: [],
    state: { row0: 'All 0s (no items available)', capacity: 5 },
    desc: 'Line 1: Initialize 2D DP Table (4 items × 6 capacity). Row 0 = 0 value for 0 items.',
  },
  {
    activeLine: 1,
    dp2D: [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 3, 3, 3, 3],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    activeCell: { r: 1, c: 2 },
    depCells: [{ r: 0, c: 0 }],
    state: { item: 'Item 1 (w=2, v=3)', cap: 2, 'take': '3 + dp[0][0] = 3', 'skip': 'dp[0][2] = 0' },
    desc: 'Line 1: Process Item 1 (wt=2, val=3). At cap=2: take item 1 → max(3, 0) = 3.',
  },
  {
    activeLine: 2,
    dp2D: [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 3, 3, 3, 3],
      [0, 0, 3, 4, 4, 7],
      [0, 0, 0, 0, 0, 0],
    ],
    activeCell: { r: 2, c: 3 },
    depCells: [{ r: 1, c: 0 }, { r: 1, c: 3 }],
    state: { item: 'Item 2 (w=3, v=4)', cap: 3, 'take': '4 + dp[1][0] = 4', 'skip': 'dp[1][3] = 3' },
    desc: 'Line 2: Process Item 2 (wt=3, val=4) at cap=3: take item 2 → max(4+0, 3) = 4.',
  },
  {
    activeLine: 2,
    dp2D: [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 3, 3, 3, 3],
      [0, 0, 3, 4, 4, 7],
      [0, 0, 0, 0, 0, 0],
    ],
    activeCell: { r: 2, c: 5 },
    depCells: [{ r: 1, c: 2 }, { r: 1, c: 5 }],
    state: { item: 'Item 2 (w=3, v=4)', cap: 5, 'take': '4 + dp[1][2] = 4 + 3 = 7', 'skip': 'dp[1][5] = 3' },
    desc: 'Line 2: Item 2 at cap=5: combine Item 1 & Item 2 → take(4+3=7) vs skip(3) → max = 7!',
  },
  {
    activeLine: 1,
    dp2D: [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 3, 3, 3, 3],
      [0, 0, 3, 4, 4, 7],
      [0, 0, 3, 4, 5, 7],
    ],
    activeCell: { r: 3, c: 4 },
    depCells: [{ r: 2, c: 0 }, { r: 2, c: 4 }],
    state: { item: 'Item 3 (w=4, v=5)', cap: 4, 'take': '5 + dp[2][0] = 5', 'skip': 'dp[2][4] = 4' },
    desc: 'Line 1: Process Item 3 (wt=4, val=5) at cap=4: take item 3 → max(5+0, 4) = 5.',
  },
  {
    activeLine: 2,
    dp2D: [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 3, 3, 3, 3],
      [0, 0, 3, 4, 4, 7],
      [0, 0, 3, 4, 5, 7],
    ],
    activeCell: { r: 3, c: 5 },
    depCells: [{ r: 2, c: 1 }, { r: 2, c: 5 }],
    state: { item: 'Item 3 (w=4, v=5)', cap: 5, 'take': '5 + dp[2][1] = 5 + 0 = 5', 'skip': 'dp[2][5] = 7' },
    desc: 'Line 2: Item 3 at cap=5: take(5+0=5) vs skip(7) → max(5, 7) = 7.',
  },
  {
    activeLine: 3,
    dp2D: [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 3, 3, 3, 3],
      [0, 0, 3, 4, 4, 7],
      [0, 0, 3, 4, 5, 7],
    ],
    activeCell: { r: 3, c: 5 },
    depCells: [{ r: 2, c: 5 }],
    state: { optimalValue: 7, itemsChosen: 'Item 1 & Item 2', status: 'KNAPSACK COMPLETE 🎉' },
    desc: 'Line 3: Knapsack calculation complete! Maximum value = 7 (Items 1 & 2 chosen). 🎉',
  },
];

const LCS_STEPS = [
  {
    activeLine: 1,
    strA: 'abcde',
    strB: 'ace',
    dp2D: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    activeCell: { r: 0, c: 0 },
    depCells: [],
    state: { str1: '"abcde"', str2: '"ace"', row0: '0s', col0: '0s' },
    desc: 'Line 1: Initialize 6x4 LCS DP table with 0s for empty string base cases.',
  },
  {
    activeLine: 1,
    strA: 'abcde',
    strB: 'ace',
    dp2D: [
      [0, 0, 0, 0],
      [0, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    activeCell: { r: 1, c: 1 },
    depCells: [{ r: 0, c: 0 }],
    state: { match: "'a' == 'a'", formula: '1 + dp[0][0]', val: '1 + 0 = 1' },
    desc: 'Line 1: Compare text1[0] ("a") and text2[0] ("a"): MATCH! dp[1][1] = 1 + dp[0][0] = 1.',
  },
  {
    activeLine: 3,
    strA: 'abcde',
    strB: 'ace',
    dp2D: [
      [0, 0, 0, 0],
      [0, 1, 1, 1],
      [0, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    activeCell: { r: 2, c: 1 },
    depCells: [{ r: 1, c: 1 }, { r: 2, c: 0 }],
    state: { mismatch: "'b' != 'a'", formula: 'max(dp[1][1], dp[2][0])', val: 'max(1, 0) = 1' },
    desc: 'Line 3: Compare text1[1] ("b") and text2[0] ("a"): MISMATCH. dp[2][1] = max(1, 0) = 1.',
  },
  {
    activeLine: 1,
    strA: 'abcde',
    strB: 'ace',
    dp2D: [
      [0, 0, 0, 0],
      [0, 1, 1, 1],
      [0, 1, 1, 1],
      [0, 1, 2, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    activeCell: { r: 3, c: 2 },
    depCells: [{ r: 2, c: 1 }],
    state: { match: "'c' == 'c'", formula: '1 + dp[2][1]', val: '1 + 1 = 2' },
    desc: 'Line 1: Compare text1[2] ("c") and text2[1] ("c"): MATCH! dp[3][2] = 1 + dp[2][1] = 2.',
  },
  {
    activeLine: 3,
    strA: 'abcde',
    strB: 'ace',
    dp2D: [
      [0, 0, 0, 0],
      [0, 1, 1, 1],
      [0, 1, 1, 1],
      [0, 1, 2, 2],
      [0, 1, 2, 2],
      [0, 0, 0, 0],
    ],
    activeCell: { r: 4, c: 2 },
    depCells: [{ r: 3, c: 2 }, { r: 4, c: 1 }],
    state: { mismatch: "'d' != 'c'", formula: 'max(dp[3][2], dp[4][1])', val: 'max(2, 1) = 2' },
    desc: 'Line 3: Compare text1[3] ("d") and text2[1] ("c"): MISMATCH. dp[4][2] = max(2, 1) = 2.',
  },
  {
    activeLine: 1,
    strA: 'abcde',
    strB: 'ace',
    dp2D: [
      [0, 0, 0, 0],
      [0, 1, 1, 1],
      [0, 1, 1, 1],
      [0, 1, 2, 2],
      [0, 1, 2, 2],
      [0, 1, 2, 3],
    ],
    activeCell: { r: 5, c: 3 },
    depCells: [{ r: 4, c: 2 }],
    state: { match: "'e' == 'e'", formula: '1 + dp[4][2]', val: '1 + 2 = 3' },
    desc: 'Line 1: Compare text1[4] ("e") and text2[2] ("e"): MATCH! dp[5][3] = 1 + dp[4][2] = 3.',
  },
  {
    activeLine: 2,
    strA: 'abcde',
    strB: 'ace',
    dp2D: [
      [0, 0, 0, 0],
      [0, 1, 1, 1],
      [0, 1, 1, 1],
      [0, 1, 2, 2],
      [0, 1, 2, 2],
      [0, 1, 2, 3],
    ],
    activeCell: { r: 5, c: 3 },
    depCells: [{ r: 4, c: 2 }],
    state: { lcsLength: 3, lcsSubsequence: '"ace"', status: 'LCS COMPLETE 🎉' },
    desc: 'Line 2: Longest Common Subsequence length = 3 ("ace"). 🎉',
  },
];

const COIN_CHANGE_STEPS = [
  {
    activeLine: 1,
    dp1D: [0, null, null, null, null, null, null, null, null, null, null, null],
    coins: [1, 2, 5],
    amount: 11,
    activeCell: 0,
    depCells: [],
    state: { 'dp[0]': 0, coins: '[1, 2, 5]', target: 11 },
    desc: 'Line 1: Base case dp[0] = 0 (0 coins needed to make amount 0). Initialize rest to ∞.',
  },
  {
    activeLine: 1,
    dp1D: [0, 1, null, null, null, null, null, null, null, null, null, null],
    coins: [1, 2, 5],
    amount: 11,
    activeCell: 1,
    depCells: [0],
    state: { amount: 1, 'use coin 1': '1 + dp[0] = 1 + 0 = 1', minCoins: 1 },
    desc: 'Line 1: Calculate amount 1: use coin 1 → dp[1] = 1 + dp[0] = 1.',
  },
  {
    activeLine: 1,
    dp1D: [0, 1, 1, null, null, null, null, null, null, null, null, null],
    coins: [1, 2, 5],
    amount: 11,
    activeCell: 2,
    depCells: [0, 1],
    state: { amount: 2, 'use coin 2': '1 + dp[0] = 1', 'use coin 1': '1 + dp[1] = 2', minCoins: 1 },
    desc: 'Line 1: Calculate amount 2: compare using coin 2 (1+0=1) vs coin 1 (1+1=2) → dp[2] = 1.',
  },
  {
    activeLine: 1,
    dp1D: [0, 1, 1, 2, null, null, null, null, null, null, null, null],
    coins: [1, 2, 5],
    amount: 11,
    activeCell: 3,
    depCells: [1, 2],
    state: { amount: 3, 'use coin 2': '1 + dp[1] = 2', 'use coin 1': '1 + dp[2] = 2', minCoins: 2 },
    desc: 'Line 1: Calculate amount 3: min(1 + dp[2], 1 + dp[1]) = 2 → dp[3] = 2 (coins: 2 + 1).',
  },
  {
    activeLine: 1,
    dp1D: [0, 1, 1, 2, 2, 1, null, null, null, null, null, null],
    coins: [1, 2, 5],
    amount: 11,
    activeCell: 5,
    depCells: [0, 3, 4],
    state: { amount: 5, 'use coin 5': '1 + dp[0] = 1', minCoins: 1 },
    desc: 'Line 1: Calculate amount 5: use single 5-coin → min(1+dp[0], 1+dp[3], 1+dp[4]) = 1.',
  },
  {
    activeLine: 1,
    dp1D: [0, 1, 1, 2, 2, 1, 2, null, null, null, null, null],
    coins: [1, 2, 5],
    amount: 11,
    activeCell: 6,
    depCells: [1, 4, 5],
    state: { amount: 6, 'use coin 5': '1 + dp[1] = 2', 'use coin 1': '1 + dp[5] = 2', minCoins: 2 },
    desc: 'Line 1: Calculate amount 6: use 5-coin + 1-coin → dp[6] = 1 + dp[1] = 2.',
  },
  {
    activeLine: 1,
    dp1D: [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, null],
    coins: [1, 2, 5],
    amount: 11,
    activeCell: 10,
    depCells: [5, 8, 9],
    state: { amount: 10, 'use coin 5': '1 + dp[5] = 1 + 1 = 2', minCoins: 2 },
    desc: 'Line 1: Calculate amount 10: use two 5-coins → dp[10] = 1 + dp[5] = 2.',
  },
  {
    activeLine: 1,
    dp1D: [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, 3],
    coins: [1, 2, 5],
    amount: 11,
    activeCell: 11,
    depCells: [6, 9, 10],
    state: { amount: 11, 'use coin 5': '1 + dp[6] = 3', 'use coin 1': '1 + dp[10] = 3', minCoins: 3 },
    desc: 'Line 1: Calculate amount 11: dp[11] = min(1+dp[10], 1+dp[9], 1+dp[6]) = 3 (coins: 5+5+1).',
  },
  {
    activeLine: 2,
    dp1D: [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, 3],
    coins: [1, 2, 5],
    amount: 11,
    activeCell: 11,
    depCells: [10, 5, 0],
    state: { amount: 11, minCoinsNeeded: 3, coinsUsed: '[5, 5, 1]', status: 'COIN CHANGE COMPLETE 🎉' },
    desc: 'Line 2: Minimum coins for amount 11 = 3 coins (5 + 5 + 1 = 11)! 🎉',
  },
];

export const useDPStore = create((set, get) => ({
  track: 'climbing-stairs',
  steps: CLIMBING_STAIRS_STEPS,
  currentStep: 0,
  isPlaying: false,
  speed: 1,
  practiceMode: false,
  userCode: `// Write your pseudocode or solution here\nfunction climbStairs(n) {\n  let dp = new Array(n + 1);\n  dp[0] = 1; dp[1] = 1;\n  for (let i = 2; i <= n; i++) {\n    dp[i] = dp[i - 1] + dp[i - 2];\n  }\n  return dp[n];\n}`,

  setTrack: (track) => {
    if (track === 'climbing-stairs') {
      set({ track: 'climbing-stairs', steps: CLIMBING_STAIRS_STEPS, currentStep: 0, isPlaying: false });
    } else if (track === 'knapsack') {
      set({ track: 'knapsack', steps: KNAPSACK_STEPS, currentStep: 0, isPlaying: false });
    } else if (track === 'lcs') {
      set({ track: 'lcs', steps: LCS_STEPS, currentStep: 0, isPlaying: false });
    } else if (track === 'coin-change') {
      set({ track: 'coin-change', steps: COIN_CHANGE_STEPS, currentStep: 0, isPlaying: false });
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
