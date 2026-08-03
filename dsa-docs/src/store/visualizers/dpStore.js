import { create } from 'zustand';

const CLIMBING_STAIRS_STEPS = [
  {
    activeLine: 1,
    dp1D: [null, null, null, null, null, null],
    activeCell: null,
    depCells: [],
    state: { problem: 'Climbing Stairs', n: 5, approach: 'Bottom-Up 1D DP Tabulation' },
    desc: 'Line 1: Problem Setup — We need to find how many distinct ways to climb N=5 stairs, taking 1 or 2 steps at a time. We create a DP array dp[0..5] of size N+1. The recurrence is dp[i] = dp[i-1] + dp[i-2] (Fibonacci-like). We will fill from base cases upward.',
  },
  {
    activeLine: 1,
    dp1D: [1, null, null, null, null, null],
    activeCell: 0,
    depCells: [],
    state: { 'dp[0]': 1, note: 'Ground floor — 1 way to stay' },
    desc: 'Line 1: Base case dp[0] = 1. There is exactly 1 way to be at the ground floor (stair 0) — by doing nothing. This serves as the foundation for building all subsequent values.',
  },
  {
    activeLine: 1,
    dp1D: [1, 1, null, null, null, null],
    activeCell: 1,
    depCells: [0],
    state: { 'dp[0]': 1, 'dp[1]': 1, note: 'Stair 1 — only 1 step possible' },
    desc: 'Line 1: Base case dp[1] = 1. There is only 1 way to reach stair 1: take a single 1-step from the ground. We cannot take a 2-step here since stair 1 is too low.',
  },
  {
    activeLine: 2,
    dp1D: [1, 1, 2, null, null, null],
    activeCell: 2,
    depCells: [0, 1],
    state: { i: 2, formula: 'dp[i] = dp[i-1] + dp[i-2]', calculation: 'dp[2] = dp[1] + dp[0] = 1 + 1 = 2' },
    desc: 'Line 2: Loop i=2 — Apply recurrence dp[2] = dp[1] + dp[0] = 1 + 1 = 2. The 2 ways are: {1+1} or {2}. We take either one 2-step or two 1-steps. Both predecessors dp[0] and dp[1] are highlighted as dependencies.',
  },
  {
    activeLine: 2,
    dp1D: [1, 1, 2, 3, null, null],
    activeCell: 3,
    depCells: [1, 2],
    state: { i: 3, formula: 'dp[3] = dp[2] + dp[1]', calculation: '2 + 1 = 3' },
    desc: 'Line 2: Loop i=3 — dp[3] = dp[2] + dp[1] = 2 + 1 = 3 distinct ways. The 3 ways are: {1+1+1}, {1+2}, {2+1}. We arrive at stair 3 by stepping from stair 2 (1-step) or stair 1 (2-step).',
  },
  {
    activeLine: 2,
    dp1D: [1, 1, 2, 3, 5, null],
    activeCell: 4,
    depCells: [2, 3],
    state: { i: 4, formula: 'dp[4] = dp[3] + dp[2]', calculation: '3 + 2 = 5' },
    desc: 'Line 2: Loop i=4 — dp[4] = dp[3] + dp[2] = 3 + 2 = 5 distinct ways. The 5 ways are: {1+1+1+1}, {1+1+2}, {1+2+1}, {2+1+1}, {2+2}. Pattern follows the Fibonacci sequence.',
  },
  {
    activeLine: 2,
    dp1D: [1, 1, 2, 3, 5, 8],
    activeCell: 5,
    depCells: [3, 4],
    state: { i: 5, formula: 'dp[5] = dp[4] + dp[3]', calculation: '5 + 3 = 8' },
    desc: 'Line 2: Loop i=5 (target!) — dp[5] = dp[4] + dp[3] = 5 + 3 = 8 distinct ways. We have reached our target stair. The DP table is now fully computed from bottom-up.',
  },
  {
    activeLine: 3,
    dp1D: [1, 1, 2, 3, 5, 8],
    activeCell: 5,
    depCells: [],
    state: { result: 'dp[5] = 8', complexity: 'O(N) time, O(N) space' },
    desc: 'Line 3: Verify result — dp[5] = 8. The entire DP array is [1, 1, 2, 3, 5, 8], matching the Fibonacci sequence. Time complexity is O(N) with a single pass, space O(N) for the DP array.',
  },
  {
    activeLine: 3,
    dp1D: [1, 1, 2, 3, 5, 8],
    activeCell: 5,
    depCells: [3, 4],
    state: { result: 8, totalWays: '8 distinct paths', status: 'CLIMBING STAIRS COMPLETE 🎉' },
    desc: 'Line 3: Return dp[5] = 8! There are 8 distinct ways to climb 5 stairs: {1+1+1+1+1}, {1+1+1+2}, {1+1+2+1}, {1+2+1+1}, {2+1+1+1}, {1+2+2}, {2+1+2}, {2+2+1}. 🎉',
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
    state: { problem: '0/1 Knapsack', capacity: 5, items: '3 items', approach: 'Bottom-Up 2D Table' },
    desc: 'Line 1: Problem Setup — Initialize a 2D DP table of size (items+1) × (capacity+1) = 4×6. Row 0 represents "0 items available" and column 0 represents "0 capacity" — all zeroes as base cases. Items: [wt=2,val=3], [wt=3,val=4], [wt=4,val=5]. Capacity W=5.',
  },
  {
    activeLine: 1,
    dp2D: [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    activeCell: { r: 1, c: 1 },
    depCells: [{ r: 0, c: 1 }],
    state: { item: 'Item 1 (w=2, v=3)', cap: 1, decision: 'SKIP (wt 2 > cap 1)' },
    desc: 'Line 1: Process Item 1 (wt=2, val=3) at capacity w=1. Since wt[0]=2 > w=1, we CANNOT include this item. dp[1][1] = dp[0][1] = 0 (inherit from row above — skip the item).',
  },
  {
    activeLine: 2,
    dp2D: [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 3, 3, 3, 3],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    activeCell: { r: 1, c: 2 },
    depCells: [{ r: 0, c: 0 }, { r: 0, c: 2 }],
    state: { item: 'Item 1 (w=2, v=3)', cap: 2, take: '3 + dp[0][0] = 3', skip: 'dp[0][2] = 0', decision: 'max(3, 0) = 3 → TAKE' },
    desc: 'Line 2: Item 1 at cap=2: wt=2 ≤ 2, so we CAN include it. Take: val=3 + dp[0][2-2]=dp[0][0]=0 → 3. Skip: dp[0][2]=0. dp[1][2] = max(3, 0) = 3. Fill rest of row 1: dp[1][3..5] = 3 (item 1 fits in all higher capacities).',
  },
  {
    activeLine: 1,
    dp2D: [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 3, 3, 3, 3],
      [0, 0, 3, 3, 3, 3],
      [0, 0, 0, 0, 0, 0],
    ],
    activeCell: { r: 2, c: 2 },
    depCells: [{ r: 1, c: 2 }],
    state: { item: 'Item 2 (w=3, v=4)', cap: 2, decision: 'SKIP (wt 3 > cap 2)' },
    desc: 'Line 1: Process Item 2 (wt=3, val=4) at cap=2. Since wt=3 > 2, we cannot include Item 2. dp[2][2] = dp[1][2] = 3. The best value with items {1,2} at capacity 2 is still just Item 1 alone.',
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
    state: { item: 'Item 2 (w=3, v=4)', cap: 3, take: '4 + dp[1][0] = 4', skip: 'dp[1][3] = 3', decision: 'max(4, 3) = 4 → TAKE' },
    desc: 'Line 2: Item 2 at cap=3: wt=3 ≤ 3, CAN include. Take: val=4 + dp[1][3-3]=dp[1][0]=0 → 4. Skip: dp[1][3]=3. dp[2][3] = max(4, 3) = 4. Item 2 alone is better than Item 1 at this capacity.',
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
    state: { item: 'Item 2 (w=3, v=4)', cap: 5, take: '4 + dp[1][2] = 4 + 3 = 7', skip: 'dp[1][5] = 3', decision: 'max(7, 3) = 7 → TAKE BOTH!' },
    desc: 'Line 2: Item 2 at cap=5: Take: val=4 + dp[1][5-3]=dp[1][2]=3 → 7 (Items 1 & 2 combined!). Skip: dp[1][5]=3. dp[2][5] = max(7, 3) = 7. With capacity 5, we can fit BOTH items 1+2 for maximum value 7!',
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
    state: { item: 'Item 3 (w=4, v=5)', cap: 4, take: '5 + dp[2][0] = 5', skip: 'dp[2][4] = 4', decision: 'max(5, 4) = 5 → TAKE' },
    desc: 'Line 1: Process Item 3 (wt=4, val=5) at cap=4: Take: val=5 + dp[2][4-4]=dp[2][0]=0 → 5. Skip: dp[2][4]=4. dp[3][4] = max(5, 4) = 5. Item 3 alone beats the combination of Items 1+2 at this capacity!',
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
    state: { item: 'Item 3 (w=4, v=5)', cap: 5, take: '5 + dp[2][1] = 5', skip: 'dp[2][5] = 7', decision: 'max(5, 7) = 7 → SKIP' },
    desc: 'Line 2: Item 3 at cap=5: Take: val=5 + dp[2][5-4]=dp[2][1]=0 → 5. Skip: dp[2][5]=7 (Items 1+2). dp[3][5] = max(5, 7) = 7. Skipping Item 3 is better! Items 1+2 at total weight 5 give value 7, beating Item 3 alone.',
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
    depCells: [],
    state: { optimalValue: 7, itemsChosen: 'Item 1 (w=2,v=3) + Item 2 (w=3,v=4)', totalWeight: '2+3=5', complexity: 'O(N×W)' },
    desc: 'Line 3: Traceback — dp[3][5] = 7. Compare dp[3][5] vs dp[2][5]: both are 7, so Item 3 was NOT chosen. Compare dp[2][5] vs dp[1][5]: 7 > 3, so Item 2 WAS chosen. Remaining capacity = 5-3=2. dp[1][2]=3 > dp[0][2]=0, so Item 1 WAS chosen. Selected: {Item1, Item2}.',
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
    desc: 'Line 3: Knapsack calculation complete! Maximum value = 7 achieved by selecting Item 1 (wt=2,val=3) and Item 2 (wt=3,val=4) with total weight 5 ≤ W=5. Time O(N×W), Space O(N×W). 🎉',
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
    state: { str1: '"abcde" (len=5)', str2: '"ace" (len=3)', tableSize: '6×4', approach: 'Bottom-Up 2D Table' },
    desc: 'Line 1: Problem Setup — Find the Longest Common Subsequence of text1="abcde" and text2="ace". Create a (5+1)×(3+1) = 6×4 DP table. Row 0 and column 0 are base cases (empty string matches) = 0.',
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
    state: { compare: 'text1[0]="a" vs text2[0]="a"', result: 'MATCH ✅', formula: '1 + dp[0][0] = 1' },
    desc: 'Line 1: Compare text1[0]="a" and text2[0]="a": MATCH! When characters match, dp[i][j] = 1 + dp[i-1][j-1]. So dp[1][1] = 1 + dp[0][0] = 1 + 0 = 1. Fill rest of row 1: dp[1][2]=max(1,0)=1, dp[1][3]=1.',
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
    state: { compare: 'text1[1]="b" vs text2[0]="a"', result: 'MISMATCH ❌', formula: 'max(dp[1][1], dp[2][0]) = max(1, 0) = 1' },
    desc: 'Line 3: Compare text1[1]="b" and text2[0]="a": MISMATCH. When characters don\'t match, dp[i][j] = max(dp[i-1][j], dp[i][j-1]). dp[2][1] = max(dp[1][1], dp[2][0]) = max(1, 0) = 1. We carry forward the best LCS found so far.',
  },
  {
    activeLine: 3,
    strA: 'abcde',
    strB: 'ace',
    dp2D: [
      [0, 0, 0, 0],
      [0, 1, 1, 1],
      [0, 1, 1, 1],
      [0, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    activeCell: { r: 3, c: 1 },
    depCells: [{ r: 2, c: 1 }, { r: 3, c: 0 }],
    state: { compare: 'text1[2]="c" vs text2[0]="a"', result: 'MISMATCH ❌', formula: 'max(dp[2][1], dp[3][0]) = max(1, 0) = 1' },
    desc: 'Line 3: Compare text1[2]="c" vs text2[0]="a": MISMATCH. dp[3][1] = max(dp[2][1], dp[3][0]) = max(1, 0) = 1. Character "c" doesn\'t match "a" so we inherit the best previous subsequence length.',
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
    state: { compare: 'text1[2]="c" vs text2[1]="c"', result: 'MATCH ✅', formula: '1 + dp[2][1] = 1 + 1 = 2' },
    desc: 'Line 1: Compare text1[2]="c" and text2[1]="c": MATCH! dp[3][2] = 1 + dp[2][1] = 1 + 1 = 2. The subsequence "ac" is now found with length 2. This extends the previous "a" match by appending "c".',
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
    activeCell: { r: 4, c: 1 },
    depCells: [{ r: 3, c: 1 }, { r: 4, c: 0 }],
    state: { compare: 'text1[3]="d" vs text2[0]="a"', result: 'MISMATCH ❌', formula: 'max(dp[3][1], dp[4][0]) = 1' },
    desc: 'Line 3: Compare text1[3]="d" vs text2[0]="a": MISMATCH. dp[4][1] = max(dp[3][1], dp[4][0]) = max(1, 0) = 1. Character "d" is not in text2, so it doesn\'t contribute to any subsequence.',
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
    state: { compare: 'text1[3]="d" vs text2[1]="c"', result: 'MISMATCH ❌', formula: 'max(dp[3][2], dp[4][1]) = max(2, 1) = 2' },
    desc: 'Line 3: Compare text1[3]="d" vs text2[1]="c": MISMATCH. dp[4][2] = max(dp[3][2], dp[4][1]) = max(2, 1) = 2. The best subsequence length through row 4, column 2 remains 2 ("ac").',
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
    state: { compare: 'text1[4]="e" vs text2[2]="e"', result: 'MATCH ✅', formula: '1 + dp[4][2] = 1 + 2 = 3' },
    desc: 'Line 1: Compare text1[4]="e" and text2[2]="e": MATCH! dp[5][3] = 1 + dp[4][2] = 1 + 2 = 3. The full subsequence "ace" is now found with length 3! This extends "ac" by appending the final "e".',
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
    depCells: [],
    state: { lcsLength: 3, lcsSubsequence: '"ace"', complexity: 'O(M×N) time, O(M×N) space' },
    desc: 'Line 2: Traceback — Starting from dp[5][3]=3, trace back: dp[5][3] came from diagonal (match "e"), dp[4][2]=2 came from dp[3][2]=2 (match "c" at dp[3][2] via dp[2][1]), and dp[2][1]=1 came from match "a". LCS = "ace".',
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
    desc: 'Line 2: Longest Common Subsequence of "abcde" and "ace" is "ace" with length 3. Characters "b" and "d" from text1 are not in the LCS since they don\'t appear in text2. Time O(M×N), Space O(M×N). 🎉',
  },
];

const COIN_CHANGE_STEPS = [
  {
    activeLine: 1,
    dp1D: [0, null, null, null, null, null, null, null, null, null, null, null],
    coins: [1, 2, 5],
    amount: 11,
    activeCell: null,
    depCells: [],
    state: { problem: 'Coin Change', coins: '[1, 2, 5]', target: 11, approach: 'Bottom-Up 1D DP' },
    desc: 'Line 1: Problem Setup — Find minimum coins from denominations [1, 2, 5] to make amount 11. Create dp[0..11] array. dp[0]=0 (0 coins for amount 0). Initialize dp[1..11] with Infinity (∞) meaning "not yet reachable".',
  },
  {
    activeLine: 1,
    dp1D: [0, null, null, null, null, null, null, null, null, null, null, null],
    coins: [1, 2, 5],
    amount: 11,
    activeCell: 0,
    depCells: [],
    state: { 'dp[0]': 0, note: 'Base case — 0 coins for amount 0' },
    desc: 'Line 1: Base case dp[0] = 0. Zero coins are needed to make amount 0. This is the foundation — every other amount builds upon this by adding one coin at a time.',
  },
  {
    activeLine: 1,
    dp1D: [0, 1, null, null, null, null, null, null, null, null, null, null],
    coins: [1, 2, 5],
    amount: 11,
    activeCell: 1,
    depCells: [0],
    state: { amount: 1, tryCoin1: '1 + dp[0] = 1', tryCoin2: 'N/A (2>1)', tryCoin5: 'N/A (5>1)', minCoins: 1 },
    desc: 'Line 1: Calculate amount=1: Only coin 1 fits (2>1, 5>1). dp[1] = min(∞, 1+dp[1-1]) = 1+dp[0] = 1+0 = 1. One coin of denomination 1 is needed.',
  },
  {
    activeLine: 1,
    dp1D: [0, 1, 1, null, null, null, null, null, null, null, null, null],
    coins: [1, 2, 5],
    amount: 11,
    activeCell: 2,
    depCells: [0, 1],
    state: { amount: 2, tryCoin1: '1 + dp[1] = 2', tryCoin2: '1 + dp[0] = 1', tryCoin5: 'N/A', minCoins: 1 },
    desc: 'Line 1: Calculate amount=2: Try coin 1: 1+dp[1]=2. Try coin 2: 1+dp[0]=1. dp[2] = min(2, 1) = 1. Using a single coin of 2 is optimal (1 coin instead of two 1-coins).',
  },
  {
    activeLine: 1,
    dp1D: [0, 1, 1, 2, 2, null, null, null, null, null, null, null],
    coins: [1, 2, 5],
    amount: 11,
    activeCell: 3,
    depCells: [1, 2],
    state: { amount: 3, tryCoin1: '1 + dp[2] = 2', tryCoin2: '1 + dp[1] = 2', tryCoin5: 'N/A', minCoins: 2 },
    desc: 'Line 1: Calculate amount=3: Try coin 1: 1+dp[2]=2. Try coin 2: 1+dp[1]=2. Both give 2. dp[3]=2 (use coins 2+1 or 1+2). Also dp[4]: coin 2: 1+dp[2]=2, coin 1: 1+dp[3]=3 → dp[4]=2 (use 2+2).',
  },
  {
    activeLine: 1,
    dp1D: [0, 1, 1, 2, 2, 1, null, null, null, null, null, null],
    coins: [1, 2, 5],
    amount: 11,
    activeCell: 5,
    depCells: [0, 3, 4],
    state: { amount: 5, tryCoin1: '1 + dp[4] = 3', tryCoin2: '1 + dp[3] = 3', tryCoin5: '1 + dp[0] = 1', minCoins: 1 },
    desc: 'Line 1: Calculate amount=5: Try coin 5: 1+dp[0]=1 (just one 5-coin!). Try coin 2: 1+dp[3]=3. Try coin 1: 1+dp[4]=3. dp[5] = min(1, 3, 3) = 1. The coin denomination 5 perfectly matches this amount!',
  },
  {
    activeLine: 1,
    dp1D: [0, 1, 1, 2, 2, 1, 2, 2, null, null, null, null],
    coins: [1, 2, 5],
    amount: 11,
    activeCell: 6,
    depCells: [1, 4, 5],
    state: { amount: 6, tryCoin1: '1 + dp[5] = 2', tryCoin2: '1 + dp[4] = 3', tryCoin5: '1 + dp[1] = 2', minCoins: 2 },
    desc: 'Line 1: Calculate amount=6: Try coin 5: 1+dp[1]=2. Try coin 2: 1+dp[4]=3. Try coin 1: 1+dp[5]=2. dp[6]=2 (use 5+1). Similarly dp[7]: coin 5: 1+dp[2]=2, dp[7]=2 (use 5+2).',
  },
  {
    activeLine: 1,
    dp1D: [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, null, null],
    coins: [1, 2, 5],
    amount: 11,
    activeCell: 8,
    depCells: [3, 6, 7],
    state: { amount: 8, tryCoin1: '1 + dp[7] = 3', tryCoin2: '1 + dp[6] = 3', tryCoin5: '1 + dp[3] = 3', minCoins: 3 },
    desc: 'Line 1: Calculate amount=8: Try coin 5: 1+dp[3]=3. Try coin 2: 1+dp[6]=3. Try coin 1: 1+dp[7]=3. dp[8]=3 (e.g. 5+2+1). Similarly dp[9]=3 (5+2+2).',
  },
  {
    activeLine: 1,
    dp1D: [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, null],
    coins: [1, 2, 5],
    amount: 11,
    activeCell: 10,
    depCells: [5, 8, 9],
    state: { amount: 10, tryCoin5: '1 + dp[5] = 1 + 1 = 2', tryCoin2: '1 + dp[8] = 4', tryCoin1: '1 + dp[9] = 4', minCoins: 2 },
    desc: 'Line 1: Calculate amount=10: Try coin 5: 1+dp[5]=1+1=2 (two 5-coins!). Try coin 2: 1+dp[8]=4. Try coin 1: 1+dp[9]=4. dp[10] = min(2, 4, 4) = 2. Two 5-coins make 10 perfectly.',
  },
  {
    activeLine: 1,
    dp1D: [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, 3],
    coins: [1, 2, 5],
    amount: 11,
    activeCell: 11,
    depCells: [6, 9, 10],
    state: { amount: 11, tryCoin5: '1 + dp[6] = 3', tryCoin2: '1 + dp[9] = 4', tryCoin1: '1 + dp[10] = 3', minCoins: 3 },
    desc: 'Line 1: Calculate amount=11 (TARGET!): Try coin 5: 1+dp[6]=1+2=3. Try coin 2: 1+dp[9]=1+3=4. Try coin 1: 1+dp[10]=1+2=3. dp[11] = min(3, 4, 3) = 3. The optimal solution uses 3 coins.',
  },
  {
    activeLine: 2,
    dp1D: [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, 3],
    coins: [1, 2, 5],
    amount: 11,
    activeCell: 11,
    depCells: [],
    state: { result: 'dp[11] = 3', coinsUsed: '[5, 5, 1]', verification: '5 + 5 + 1 = 11 ✅', complexity: 'O(Amount × Coins)' },
    desc: 'Line 2: Verify — dp[11]=3. Traceback: dp[11] was updated by coin 5 (dp[6]+1=3), dp[6] was updated by coin 5 (dp[1]+1=2), dp[1] was updated by coin 1 (dp[0]+1=1). Coins used: [5, 5, 1]. Sum: 5+5+1=11 ✅.',
  },
  {
    activeLine: 2,
    dp1D: [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, 3],
    coins: [1, 2, 5],
    amount: 11,
    activeCell: 11,
    depCells: [10, 5, 0],
    state: { amount: 11, minCoinsNeeded: 3, coinsUsed: '[5, 5, 1]', status: 'COIN CHANGE COMPLETE 🎉' },
    desc: 'Line 2: Minimum coins for amount 11 = 3 coins (5 + 5 + 1 = 11). The greedy approach (take largest coin first) also works here, but DP guarantees optimality for ALL coin denominations. Time O(Amount × |Coins|), Space O(Amount). 🎉',
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
