import { create } from 'zustand';

const INTRO_STEPS = [
  {
    activeLine: 1,
    left: 0,
    right: null,
    state: { left: 0, n: 7 },
    desc: 'Line 1: Initialize "left" pointer at index 0 (value 3).',
  },
  {
    activeLine: 2,
    left: 0,
    right: 6,
    state: { left: 0, right: 6, 'arr[0]': 3, 'arr[6]': 30, n: 7 },
    desc: 'Line 2: Initialize "right" pointer at index 6 (value 30).',
  },
  {
    activeLine: 3,
    left: 0,
    right: 6,
    state: { left: 0, right: 6, 'left < right': '0 < 6 (TRUE ✅)' },
    desc: 'Line 3: Check loop condition: left (0) < right (6) is TRUE. Enter loop.',
  },
  {
    activeLine: 4,
    left: 0,
    right: 6,
    state: { left: 0, right: 6, 'arr[0]': 3, 'arr[6]': 30, pair: '(3, 30)' },
    desc: 'Line 4: Inspect current elements: arr[left]=3 and arr[right]=30.',
  },
  {
    activeLine: 5,
    left: 0,
    right: 6,
    state: { left: 0, right: 6, conditionMet: false },
    desc: 'Line 5: Check conditionMet: false.',
  },
  {
    activeLine: 7,
    left: 0,
    right: 6,
    state: { left: 0, right: 6, decision: 'enter else branch' },
    desc: 'Line 7: Enter else branch to shift pointer.',
  },
  {
    activeLine: 8,
    left: 0,
    right: 6,
    state: { left: 0, right: 6, decision: 'move right backward (right--)' },
    desc: 'Line 8: Decrement "right" pointer from index 6 to index 5.',
  },
  {
    activeLine: 3,
    left: 0,
    right: 5,
    state: { left: 0, right: 5, 'left < right': '0 < 5 (TRUE ✅)' },
    desc: 'Line 3: Check loop condition: left (0) < right (5) is TRUE. Loop continues.',
  },
  {
    activeLine: 4,
    left: 0,
    right: 5,
    state: { left: 0, right: 5, 'arr[0]': 3, 'arr[5]': 26 },
    desc: 'Line 4: Inspect elements: arr[0]=3 and arr[5]=26.',
  },
  {
    activeLine: 5,
    left: 0,
    right: 5,
    state: { conditionMet: true },
    desc: 'Line 5: Check conditionMet: TRUE. Enter left++ branch.',
  },
  {
    activeLine: 6,
    left: 1,
    right: 5,
    state: { left: 1, right: 5, decision: 'move left forward (left++)' },
    desc: 'Line 6: Increment "left" pointer from index 0 to index 1 (value 8).',
  },
  {
    activeLine: 3,
    left: 3,
    right: 3,
    state: { left: 3, right: 3, status: 'complete' },
    desc: 'Line 3: Loop condition left (3) < right (3) is FALSE. Pointers meet! Walk complete! 🎉',
  },
];

const TWO_SUM_STEPS = [
  {
    activeLine: 1,
    left: 0,
    right: 3,
    state: { target: 9, left: 0, right: 3, 'arr[0]': 2, 'arr[3]': 15 },
    desc: 'Line 1: Initialize left = 0 (value 2) and right = 3 (value 15).',
  },
  {
    activeLine: 2,
    left: 0,
    right: 3,
    state: { target: 9, left: 0, right: 3, 'left < right': '0 < 3 (TRUE ✅)' },
    desc: 'Line 2: Check loop condition: left (0) < right (3) is TRUE. Enter loop.',
  },
  {
    activeLine: 3,
    left: 0,
    right: 3,
    state: { target: 9, left: 0, right: 3, sum: 17 },
    desc: 'Line 3: Calculate sum = arr[0] + arr[3] = 2 + 15 = 17.',
  },
  {
    activeLine: 4,
    left: 0,
    right: 3,
    state: { target: 9, sum: 17, condition: '17 == 9 (FALSE ❌)' },
    desc: 'Line 4: Check if sum (17) == target (9)? FALSE.',
  },
  {
    activeLine: 6,
    left: 0,
    right: 3,
    state: { target: 9, sum: 17, condition: '17 < 9 (FALSE ❌)' },
    desc: 'Line 6: Check else if sum (17) < target (9)? FALSE.',
  },
  {
    activeLine: 8,
    left: 0,
    right: 3,
    state: { target: 9, sum: 17, branch: 'else (sum too large)' },
    desc: 'Line 8: Enter else branch (sum 17 > target 9).',
  },
  {
    activeLine: 9,
    left: 0,
    right: 2,
    state: { target: 9, left: 0, right: 2, 'arr[2]': 11 },
    desc: 'Line 9: Decrement right pointer from index 3 to index 2 (value 11).',
  },
  {
    activeLine: 2,
    left: 0,
    right: 2,
    state: { target: 9, left: 0, right: 2, 'left < right': '0 < 2 (TRUE ✅)' },
    desc: 'Line 2: Check loop condition: left (0) < right (2) is TRUE. Enter loop.',
  },
  {
    activeLine: 3,
    left: 0,
    right: 2,
    state: { target: 9, left: 0, right: 2, sum: 13 },
    desc: 'Line 3: Calculate sum = arr[0] + arr[2] = 2 + 11 = 13.',
  },
  {
    activeLine: 4,
    left: 0,
    right: 2,
    state: { target: 9, sum: 13, condition: '13 == 9 (FALSE ❌)' },
    desc: 'Line 4: Check if sum (13) == target (9)? FALSE.',
  },
  {
    activeLine: 6,
    left: 0,
    right: 2,
    state: { target: 9, sum: 13, condition: '13 < 9 (FALSE ❌)' },
    desc: 'Line 6: Check else if sum (13) < target (9)? FALSE.',
  },
  {
    activeLine: 8,
    left: 0,
    right: 2,
    state: { target: 9, sum: 13, branch: 'else (sum too large)' },
    desc: 'Line 8: Enter else branch (sum 13 > target 9).',
  },
  {
    activeLine: 9,
    left: 0,
    right: 1,
    state: { target: 9, left: 0, right: 1, 'arr[1]': 7 },
    desc: 'Line 9: Decrement right pointer from index 2 to index 1 (value 7).',
  },
  {
    activeLine: 2,
    left: 0,
    right: 1,
    state: { target: 9, left: 0, right: 1, 'left < right': '0 < 1 (TRUE ✅)' },
    desc: 'Line 2: Check loop condition: left (0) < right (1) is TRUE.',
  },
  {
    activeLine: 3,
    left: 0,
    right: 1,
    state: { target: 9, left: 0, right: 1, sum: 9 },
    desc: 'Line 3: Calculate sum = arr[0] + arr[1] = 2 + 7 = 9.',
  },
  {
    activeLine: 4,
    left: 0,
    right: 1,
    state: { target: 9, sum: 9, condition: '9 == 9 (TRUE ✅)' },
    desc: 'Line 4: Check if sum (9) == target (9)? TRUE ✅!',
  },
  {
    activeLine: 5,
    left: 0,
    right: 1,
    state: { target: 9, solution: '[1, 2] (1-indexed)', status: 'MATCH FOUND ✅' },
    desc: 'Line 5: Return 1-indexed positions [1, 2] (values 2 + 7 = 9). Solution complete! 🎉',
  },
];

const PALINDROME_STEPS = [
  {
    activeLine: 1,
    left: 0,
    right: 6,
    state: { left: 0, right: 6, 's[0]': "'r'", 's[6]': "'r'" },
    desc: 'Line 1: Initialize left = 0 (\'r\') and right = 6 (\'r\').',
  },
  {
    activeLine: 2,
    left: 0,
    right: 6,
    state: { left: 0, right: 6, 'left < right': '0 < 6 (TRUE ✅)' },
    desc: 'Line 2: Check loop condition: 0 < 6 is TRUE. Enter loop.',
  },
  {
    activeLine: 3,
    left: 0,
    right: 6,
    state: { left: 0, right: 6, condition: "'r' != 'r' (FALSE ❌)" },
    desc: 'Line 3: Check if s[0] (\'r\') != s[6] (\'r\')? FALSE (Characters match!).',
  },
  {
    activeLine: 5,
    left: 1,
    right: 6,
    state: { left: 1, right: 6 },
    desc: 'Line 5: Increment left pointer to index 1 (\'a\').',
  },
  {
    activeLine: 6,
    left: 1,
    right: 5,
    state: { left: 1, right: 5 },
    desc: 'Line 6: Decrement right pointer to index 5 (\'a\').',
  },
  {
    activeLine: 2,
    left: 1,
    right: 5,
    state: { left: 1, right: 5, 's[1]': "'a'", 's[5]': "'a'" },
    desc: 'Line 2: Check loop condition: 1 < 5 is TRUE.',
  },
  {
    activeLine: 3,
    left: 1,
    right: 5,
    state: { left: 1, right: 5, condition: "'a' != 'a' (FALSE ❌)" },
    desc: 'Line 3: Check if s[1] (\'a\') != s[5] (\'a\')? FALSE (Characters match!).',
  },
  {
    activeLine: 5,
    left: 2,
    right: 5,
    state: { left: 2, right: 5 },
    desc: 'Line 5: Increment left pointer to index 2 (\'c\').',
  },
  {
    activeLine: 6,
    left: 2,
    right: 4,
    state: { left: 2, right: 4 },
    desc: 'Line 6: Decrement right pointer to index 4 (\'c\').',
  },
  {
    activeLine: 7,
    left: 3,
    right: 3,
    state: { left: 3, right: 3, result: 'true', status: 'VALID PALINDROME ✅' },
    desc: 'Line 7: Pointers met at index 3 (left >= right). "racecar" is a Valid Palindrome! 🎉',
  },
];

const THREE_SUM_STEPS = [
  {
    activeLine: 1,
    i: 0,
    left: 1,
    right: 5,
    state: { sorted: '[-4, -1, -1, 0, 1, 2]' },
    desc: 'Line 1: Sort array to [-4, -1, -1, 0, 1, 2].',
  },
  {
    activeLine: 2,
    i: 0,
    left: 1,
    right: 5,
    state: { i: 0, 'nums[0]': -4 },
    desc: 'Line 2: Outer loop i = 0 (val = -4).',
  },
  {
    activeLine: 3,
    i: 0,
    left: 1,
    right: 5,
    state: { i: 0, left: 1, right: 5 },
    desc: 'Line 3: Set left = i + 1 = 1 (-1) and right = n - 1 = 5 (2).',
  },
  {
    activeLine: 4,
    i: 0,
    left: 1,
    right: 5,
    state: { i: 0, left: 1, right: 5, 'left < right': '1 < 5 (TRUE ✅)' },
    desc: 'Line 4: Check while loop: left (1) < right (5) is TRUE.',
  },
  {
    activeLine: 5,
    i: 0,
    left: 1,
    right: 5,
    state: { i: 0, left: 1, right: 5, sum: -3 },
    desc: 'Line 5: Calculate 3Sum = (-4) + (-1) + 2 = -3.',
  },
  {
    activeLine: 6,
    i: 0,
    left: 1,
    right: 5,
    state: { sum: -3, condition: '-3 == 0 (FALSE ❌)' },
    desc: 'Line 6: Check if sum (-3) == 0? FALSE.',
  },
  {
    activeLine: 8,
    i: 0,
    left: 1,
    right: 5,
    state: { sum: -3, condition: '-3 < 0 (TRUE ✅)' },
    desc: 'Line 8: Check else if sum (-3) < 0? TRUE.',
  },
  {
    activeLine: 9,
    i: 0,
    left: 2,
    right: 5,
    state: { i: 0, left: 2, right: 5 },
    desc: 'Line 9: Increment left pointer to index 2 (-1).',
  },
  {
    activeLine: 2,
    i: 1,
    left: 2,
    right: 5,
    state: { i: 1, 'nums[1]': -1, left: 2, right: 5 },
    desc: 'Line 2: Advance outer loop to i = 1 (val = -1). Set left = 2, right = 5.',
  },
  {
    activeLine: 5,
    i: 1,
    left: 2,
    right: 5,
    state: { i: 1, left: 2, right: 5, sum: 0 },
    desc: 'Line 5: Calculate 3Sum = (-1) + (-1) + 2 = 0.',
  },
  {
    activeLine: 6,
    i: 1,
    left: 2,
    right: 5,
    state: { sum: 0, condition: '0 == 0 (TRUE ✅)' },
    desc: 'Line 6: Check if sum (0) == 0? TRUE ✅!',
  },
  {
    activeLine: 7,
    i: 1,
    left: 2,
    right: 5,
    state: { triplet: '[-1, -1, 2]', triplets: '[ [-1, -1, 2] ]', status: 'MATCH FOUND ✅' },
    desc: 'Line 7: Record triplet [-1, -1, 2]! Move left++ and right--.',
  },
];

const CONTAINER_WATER_STEPS = [
  {
    activeLine: 1,
    left: 0,
    right: 8,
    state: { left: 0, right: 8, 'h[0]': 1, 'h[8]': 7, maxArea: 0 },
    desc: 'Line 1: Initialize left = 0 (h=1), right = 8 (h=7), maxArea = 0.',
  },
  {
    activeLine: 3,
    left: 0,
    right: 8,
    state: { left: 0, right: 8, minHeight: 1, width: 8, currentArea: 8 },
    desc: 'Line 3: Area = min(1, 7) * (8 - 0) = 1 * 8 = 8.',
  },
  {
    activeLine: 4,
    left: 0,
    right: 8,
    state: { maxArea: 8 },
    desc: 'Line 4: Update maxArea = max(0, 8) = 8.',
  },
  {
    activeLine: 5,
    left: 1,
    right: 8,
    state: { left: 1, right: 8, 'h[1]': 8, 'h[8]': 7 },
    desc: 'Line 5: Since h[0] (1) < h[8] (7), increment left pointer to index 1 (h=8).',
  },
  {
    activeLine: 3,
    left: 1,
    right: 8,
    state: { left: 1, right: 8, minHeight: 7, width: 7, currentArea: 49 },
    desc: 'Line 3: Area = min(8, 7) * (8 - 1) = 7 * 7 = 49.',
  },
  {
    activeLine: 4,
    left: 1,
    right: 8,
    state: { maxArea: 49, status: 'MAX AREA UPDATED 49 🔥' },
    desc: 'Line 4: Update maxArea = max(8, 49) = 49! New maximum water container capacity!',
  },
  {
    activeLine: 6,
    left: 1,
    right: 7,
    state: { left: 1, right: 7, 'h[7]': 3 },
    desc: 'Line 6: Since h[1] (8) >= h[8] (7), decrement right pointer to index 7 (h=3).',
  },
  {
    activeLine: 3,
    left: 1,
    right: 7,
    state: { left: 1, right: 7, minHeight: 3, width: 6, currentArea: 18 },
    desc: 'Line 3: Area = min(8, 3) * (7 - 1) = 3 * 6 = 18. maxArea remains 49.',
  },
  {
    activeLine: 6,
    left: 1,
    right: 6,
    state: { left: 1, right: 6, 'h[6]': 8, maxArea: 49, status: 'CONTAINER WATER COMPLETE 🎉' },
    desc: 'Line 6: Maximum container area found = 49 between index 1 (h=8) and index 8 (h=7)! 🎉',
  },
];

const MOVE_ZEROES_STEPS = [
  {
    activeLine: 1,
    slow: 0,
    fast: 0,
    state: { slow: 0, fast: 0, 'arr[0]': 0 },
    desc: 'Line 1: Initialize slow pointer = 0. Fast pointer starts at 0.',
  },
  {
    activeLine: 3,
    slow: 0,
    fast: 1,
    state: { slow: 0, fast: 1, 'arr[1]': 1, condition: '1 != 0 (TRUE ✅)' },
    desc: 'Line 3: Fast = 1 (val = 1). Non-zero found! Prepare to swap with slow index 0 (val = 0).',
  },
  {
    activeLine: 4,
    slow: 0,
    fast: 1,
    array: [1, 0, 0, 3, 12],
    state: { swapped: 'arr[0] ⇄ arr[1]', array: '[1, 0, 0, 3, 12]' },
    desc: 'Line 4: Swap arr[0] and arr[1] → [1, 0, 0, 3, 12].',
  },
  {
    activeLine: 5,
    slow: 1,
    fast: 1,
    array: [1, 0, 0, 3, 12],
    state: { slow: 1 },
    desc: 'Line 5: Increment slow pointer to index 1.',
  },
  {
    activeLine: 3,
    slow: 1,
    fast: 3,
    array: [1, 0, 0, 3, 12],
    state: { slow: 1, fast: 3, 'arr[3]': 3, condition: '3 != 0 (TRUE ✅)' },
    desc: 'Line 3: Fast = 3 (val = 3). Non-zero found! Swap with slow index 1 (val = 0).',
  },
  {
    activeLine: 4,
    slow: 1,
    fast: 3,
    array: [1, 3, 0, 0, 12],
    state: { swapped: 'arr[1] ⇄ arr[3]', array: '[1, 3, 0, 0, 12]' },
    desc: 'Line 4: Swap arr[1] and arr[3] → [1, 3, 0, 0, 12].',
  },
  {
    activeLine: 5,
    slow: 2,
    fast: 3,
    array: [1, 3, 0, 0, 12],
    state: { slow: 2 },
    desc: 'Line 5: Increment slow pointer to index 2.',
  },
  {
    activeLine: 4,
    slow: 2,
    fast: 4,
    array: [1, 3, 12, 0, 0],
    state: { swapped: 'arr[2] ⇄ arr[4]', array: '[1, 3, 12, 0, 0]', status: 'MOVE ZEROES COMPLETE 🎉' },
    desc: 'Line 4: Swap arr[2] and arr[4] → [1, 3, 12, 0, 0]. All zeroes moved to back in linear O(n) time! 🎉',
  },
];

const REMOVE_DUPLICATES_STEPS = [
  {
    activeLine: 1,
    slow: 0,
    fast: 1,
    state: { slow: 0, fast: 1, 'arr[0]': 1, 'arr[1]': 1 },
    desc: 'Line 1: Initialize slow = 0. Fast pointer starts at 1.',
  },
  {
    activeLine: 3,
    slow: 0,
    fast: 1,
    state: { slow: 0, fast: 1, 'arr[1] == arr[0]': '1 == 1 (FALSE ❌)' },
    desc: 'Line 3: Compare arr[1]=1 with arr[0]=1. Duplicate found! Skip.',
  },
  {
    activeLine: 3,
    slow: 0,
    fast: 2,
    state: { slow: 0, fast: 2, 'arr[2] != arr[0]': '2 != 1 (TRUE ✅)' },
    desc: 'Line 3: Compare arr[2]=2 with arr[0]=1. Unique element found! Enter inside loop.',
  },
  {
    activeLine: 4,
    slow: 1,
    fast: 2,
    state: { slow: 1 },
    desc: 'Line 4: Increment slow pointer to index 1.',
  },
  {
    activeLine: 5,
    slow: 1,
    fast: 2,
    array: [1, 2, 2, 2, 3, 4, 5],
    state: { 'arr[1]': 2, uniqueCount: 2 },
    desc: 'Line 5: Overwrite arr[1] = arr[2] (2). Unique count is now 2.',
  },
  {
    activeLine: 5,
    slow: 2,
    fast: 4,
    array: [1, 2, 3, 2, 3, 4, 5],
    state: { 'arr[2]': 3, uniqueCount: 3 },
    desc: 'Line 5: Overwrite arr[2] = arr[4] (3). Unique count is now 3.',
  },
  {
    activeLine: 5,
    slow: 3,
    fast: 5,
    array: [1, 2, 3, 4, 3, 4, 5],
    state: { 'arr[3]': 4, uniqueCount: 4 },
    desc: 'Line 5: Overwrite arr[3] = arr[5] (4). Unique count is now 4.',
  },
  {
    activeLine: 5,
    slow: 4,
    fast: 6,
    array: [1, 2, 3, 4, 5, 4, 5],
    state: { 'arr[4]': 5, k: 5, status: 'REMOVE DUPLICATES COMPLETE 🎉' },
    desc: 'Line 5: Overwrite arr[4] = arr[6] (5). Return k = slow + 1 = 5 unique elements! 🎉',
  },
];

const SORT_COLORS_STEPS = [
  {
    activeLine: 1,
    low: 0,
    mid: 0,
    high: 5,
    state: { low: 0, mid: 0, high: 5, 'arr[0]': 2 },
    desc: 'Line 1: Initialize 3-pointers: low = 0, mid = 0, high = 5.',
  },
  {
    activeLine: 5,
    low: 0,
    mid: 0,
    high: 5,
    state: { midVal: 2, action: 'swap(arr[0], arr[5])', 'high--': 4 },
    desc: 'Line 5: arr[mid] == 2 → Swap arr[0] (2) and arr[5] (0). High pointer moves to 4.',
  },
  {
    activeLine: 3,
    low: 0,
    mid: 0,
    high: 4,
    array: [0, 0, 2, 1, 1, 2],
    state: { midVal: 0, action: 'swap(arr[0], arr[0])', 'low++': 1, 'mid++': 1 },
    desc: 'Line 3: arr[mid] == 0 → Swap arr[low] and arr[mid]. Increment low (1) and mid (1).',
  },
  {
    activeLine: 3,
    low: 1,
    mid: 1,
    high: 4,
    array: [0, 0, 2, 1, 1, 2],
    state: { midVal: 0, 'low++': 2, 'mid++': 2 },
    desc: 'Line 3: arr[mid] == 0 → Swap arr[low] and arr[mid]. Increment low (2) and mid (2).',
  },
  {
    activeLine: 5,
    low: 2,
    mid: 2,
    high: 4,
    array: [0, 0, 2, 1, 1, 2],
    state: { midVal: 2, action: 'swap(arr[2], arr[4])', 'high--': 3 },
    desc: 'Line 5: arr[mid] == 2 → Swap arr[2] (2) and arr[4] (1). High pointer moves to 3.',
  },
  {
    activeLine: 4,
    low: 2,
    mid: 2,
    high: 3,
    array: [0, 0, 1, 1, 2, 2],
    state: { midVal: 1, 'mid++': 3 },
    desc: 'Line 4: arr[mid] == 1 → Increment mid pointer to 3.',
  },
  {
    activeLine: 4,
    low: 2,
    mid: 3,
    high: 3,
    array: [0, 0, 1, 1, 2, 2],
    state: { midVal: 1, 'mid++': 4 },
    desc: 'Line 4: arr[mid] == 1 → Increment mid pointer to 4.',
  },
  {
    activeLine: 2,
    low: 2,
    mid: 4,
    high: 3,
    array: [0, 0, 1, 1, 2, 2],
    state: { mid: 4, high: 3, status: 'SORT COLORS COMPLETE 🎉' },
    desc: 'Line 2: mid (4) > high (3). Loop finished! 3-way partitioned array: [0, 0, 1, 1, 2, 2]! 🎉',
  },
];

export const useTwoPointersStore = create((set, get) => ({
  track: 'intro',
  array: [3, 8, 12, 17, 21, 26, 30],
  steps: INTRO_STEPS,
  currentStep: 0,
  isPlaying: false,
  speed: 1,
  practiceMode: false,
  userCode: `// Write your pseudocode or solution here\nfunction twoPointers(arr) {\n  let left = 0;\n  let right = arr.length - 1;\n  while (left < right) {\n    // your logic here\n  }\n}`,

  setTrack: (track) => {
    if (track === 'intro') {
      set({ track: 'intro', array: [3, 8, 12, 17, 21, 26, 30], steps: INTRO_STEPS, currentStep: 0, isPlaying: false });
    } else if (track === 'two-sum-ii') {
      set({ track: 'two-sum-ii', array: [2, 7, 11, 15], steps: TWO_SUM_STEPS, currentStep: 0, isPlaying: false });
    } else if (track === 'valid-palindrome') {
      set({ track: 'valid-palindrome', array: ['r', 'a', 'c', 'e', 'c', 'a', 'r'], steps: PALINDROME_STEPS, currentStep: 0, isPlaying: false });
    } else if (track === 'three-sum') {
      set({ track: 'three-sum', array: [-4, -1, -1, 0, 1, 2], steps: THREE_SUM_STEPS, currentStep: 0, isPlaying: false });
    } else if (track === 'container-water') {
      set({ track: 'container-water', array: [1, 8, 6, 2, 5, 4, 8, 3, 7], steps: CONTAINER_WATER_STEPS, currentStep: 0, isPlaying: false });
    } else if (track === 'move-zeroes') {
      set({ track: 'move-zeroes', array: [0, 1, 0, 3, 12], steps: MOVE_ZEROES_STEPS, currentStep: 0, isPlaying: false });
    } else if (track === 'remove-duplicates') {
      set({ track: 'remove-duplicates', array: [1, 1, 2, 2, 3, 4, 5], steps: REMOVE_DUPLICATES_STEPS, currentStep: 0, isPlaying: false });
    } else if (track === 'sort-colors') {
      set({ track: 'sort-colors', array: [2, 0, 2, 1, 1, 0], steps: SORT_COLORS_STEPS, currentStep: 0, isPlaying: false });
    }
  },

  setCurrentStep: (step) => {
    const { steps } = get();
    if (step >= 0 && step < steps.length) {
      const targetStep = steps[step];
      const newArray = targetStep.array || get().array;
      set({ currentStep: step, array: newArray });
    }
  },

  nextStep: () => {
    const { currentStep, steps } = get();
    if (currentStep < steps.length - 1) {
      const nextIndex = currentStep + 1;
      const targetStep = steps[nextIndex];
      const newArray = targetStep.array || get().array;
      set({ currentStep: nextIndex, array: newArray });
    } else {
      set({ isPlaying: false });
    }
  },

  prevStep: () => {
    const { currentStep, steps } = get();
    if (currentStep > 0) {
      const prevIndex = currentStep - 1;
      const targetStep = steps[prevIndex];
      const newArray = targetStep.array || get().array;
      set({ currentStep: prevIndex, array: newArray });
    }
  },

  restart: () => {
    const { steps } = get();
    const initialArray = steps[0].array || get().array;
    set({ currentStep: 0, array: initialArray, isPlaying: false });
  },

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setSpeed: (s) => set({ speed: s }),
  togglePracticeMode: () => set((state) => ({ practiceMode: !state.practiceMode })),
  setUserCode: (code) => set({ userCode: code }),
}));
