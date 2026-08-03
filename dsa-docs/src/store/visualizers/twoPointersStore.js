import { create } from 'zustand';

// 1. INTRO STEPS: Opposite-ends Two Pointers Walk with Key Insights
const INTRO_STEPS = [
  {
    activeLine: 1,
    left: 0,
    right: null,
    state: { keyInsight: 'Array is sorted. Smallest (3) & largest (30) bracket the search space.', left: 0, 'arr[0]': 3, status: 'Initializing left pointer...' },
    desc: '💡 Key insight: The array is sorted. Placing pointers at the smallest (left=0) and largest (right=6) elements brackets the exact search space. Initialize left = 0 (value 3).',
  },
  {
    activeLine: 2,
    left: 0,
    right: 6,
    state: { keyInsight: 'Smallest & largest bracket search space', left: 0, right: 6, 'arr[0]': 3, 'arr[6]': 30, status: 'Initializing right pointer...' },
    desc: 'Step 2: Initialize "right" pointer at index 6 (value 30). We now have pointers at opposite ends of the sorted array.',
  },
  {
    activeLine: 3,
    left: 0,
    right: 6,
    state: { left: 0, right: 6, 'left < right': '0 < 6 (TRUE ✅)' },
    desc: 'Step 3: Check loop condition: left (0) < right (6) is TRUE. Enter loop.',
  },
  {
    activeLine: 4,
    left: 0,
    right: 6,
    state: { left: 0, right: 6, 'arr[0]': 3, 'arr[6]': 30, pair: '(3, 30)' },
    desc: 'Step 4: Inspect elements at pointers: arr[left]=3 and arr[right]=30.',
  },
  {
    activeLine: 7,
    left: 0,
    right: 6,
    state: { left: 0, right: 6, decision: 'sum too large ➔ right--' },
    desc: 'Step 5: Sum (33) > target. Shift right pointer backward (right--).',
  },
  {
    activeLine: 8,
    left: 0,
    right: 5,
    state: { left: 0, right: 5, 'arr[0]': 3, 'arr[5]': 26 },
    desc: 'Step 6: Decrement "right" pointer from index 6 to index 5 (value 26). Search space narrowed!',
  },
  {
    activeLine: 3,
    left: 0,
    right: 5,
    state: { left: 0, right: 5, 'left < right': '0 < 5 (TRUE ✅)' },
    desc: 'Step 7: Loop condition: left (0) < right (5) is TRUE. Continue loop.',
  },
  {
    activeLine: 5,
    left: 0,
    right: 5,
    state: { left: 0, right: 5, decision: 'left++ branch' },
    desc: 'Step 8: Shift left pointer forward (left++) to increase sum.',
  },
  {
    activeLine: 6,
    left: 1,
    right: 5,
    state: { left: 1, right: 5, 'arr[1]': 8, 'arr[5]': 26 },
    desc: 'Step 9: Increment "left" pointer from index 0 to index 1 (value 8).',
  },
  {
    activeLine: 8,
    left: 1,
    right: 4,
    state: { left: 1, right: 4, 'arr[1]': 8, 'arr[4]': 21 },
    desc: 'Step 10: Shift "right" pointer backward to index 4 (value 21).',
  },
  {
    activeLine: 6,
    left: 2,
    right: 4,
    state: { left: 2, right: 4, 'arr[2]': 12, 'arr[4]': 21 },
    desc: 'Step 11: Shift "left" pointer forward to index 2 (value 12).',
  },
  {
    activeLine: 3,
    left: 3,
    right: 3,
    isMatch: true,
    state: { left: 3, right: 3, status: 'MATCH & WALK COMPLETE 🎉' },
    desc: 'Step 12: Pointers meet at index 3 (value 17)! Traversal complete! 🎉',
  },
];

// 2. TWO SUM II STEPS: Granular steps with explicit Key Insights
const TWO_SUM_STEPS = [
  {
    activeLine: 1,
    left: 0,
    right: null,
    state: { keyInsight: 'The array is sorted. Smallest (2) & largest (15) bracket the answer.', left: 0, right: 'None', 'arr[0]': 2, status: 'Initializing left pointer...' },
    desc: '💡 Key insight: The array is sorted. Placing pointers at the smallest (left=0) and largest (right=3) elements brackets the exact search space. Initialize left = 0 (value 2).',
  },
  {
    activeLine: 1,
    left: 0,
    right: 3,
    state: { keyInsight: 'Smallest (2) & largest (15) bracket the answer.', left: 0, right: 3, 'arr[0]': 2, 'arr[3]': 15, status: 'Initializing right pointer...' },
    desc: 'Step 2: Initialize "right" pointer at index 3 (value 15). We now have pointers at opposite ends of the sorted array.',
  },
  {
    activeLine: 2,
    left: 0,
    right: 3,
    state: { target: 9, left: 0, right: 3, 'left < right': '0 < 3 (TRUE ✅)', status: 'Entering search loop' },
    desc: 'Step 3: Check while loop condition: left (0) < right (3) is TRUE. Enter searching loop.',
  },
  {
    activeLine: 3,
    left: 0,
    right: 3,
    state: { target: 9, left: 0, right: 3, sum: 17, computation: '2 + 15 = 17', status: 'Evaluating current pair sum' },
    desc: 'Step 4: Compute pair sum = arr[0] + arr[3] = 2 + 15 = 17. Compare with target 9.',
  },
  {
    activeLine: 4,
    left: 0,
    right: 3,
    state: { target: 9, sum: 17, condition: '17 == 9 (FALSE ❌)' },
    desc: 'Step 5: Check if sum (17) matches target (9)? FALSE.',
  },
  {
    activeLine: 8,
    left: 0,
    right: 3,
    state: { target: 9, sum: 17, reasoning: '17 > 9 ➔ 15 paired with any number >= 2 is too big!', branch: 'else (right--)' },
    desc: 'Step 6: 💡 Key insight: Sum 17 > target 9. Since the array is sorted, 15 is too large to pair with any available element. We MUST decrement the right pointer (right--).',
  },
  {
    activeLine: 9,
    left: 0,
    right: 2,
    state: { target: 9, left: 0, right: 2, 'arr[0]': 2, 'arr[2]': 11, action: 'right--' },
    desc: 'Step 7: Decrement "right" pointer from index 3 to index 2 (value 11). Search space narrowed!',
  },
  {
    activeLine: 3,
    left: 0,
    right: 2,
    state: { target: 9, left: 0, right: 2, sum: 13, computation: '2 + 11 = 13', status: 'Evaluating new pair sum' },
    desc: 'Step 8: Compute new pair sum = arr[0] + arr[2] = 2 + 11 = 13.',
  },
  {
    activeLine: 8,
    left: 0,
    right: 2,
    state: { target: 9, sum: 13, reasoning: '13 > 9 ➔ 11 is still too big!', branch: 'else (right--)' },
    desc: 'Step 9: Sum 13 > target 9. Element 11 is still too large. Decrement right pointer again (right--).',
  },
  {
    activeLine: 9,
    left: 0,
    right: 1,
    state: { target: 9, left: 0, right: 1, 'arr[0]': 2, 'arr[1]': 7, action: 'right--' },
    desc: 'Step 10: Decrement "right" pointer from index 2 to index 1 (value 7).',
  },
  {
    activeLine: 3,
    left: 0,
    right: 1,
    state: { target: 9, left: 0, right: 1, sum: 9, computation: '2 + 7 = 9', status: 'Evaluating new pair sum' },
    desc: 'Step 11: Compute new pair sum = arr[0] + arr[1] = 2 + 7 = 9.',
  },
  {
    activeLine: 4,
    left: 0,
    right: 1,
    isMatch: true,
    state: { target: 9, sum: 9, condition: '9 == 9 (MATCHED! 🎉)', status: 'MATCH FOUND 🎉' },
    desc: 'Step 12: Check if sum (9) == target (9)? TRUE ✅! Target pair found!',
  },
  {
    activeLine: 5,
    left: 0,
    right: 1,
    isMatch: true,
    state: { target: 9, solution: '[1, 2] (1-indexed)', status: 'SOLVED 🎉' },
    desc: 'Step 13: Return 1-indexed positions [left + 1, right + 1] = [1, 2] (values 2 + 7 = 9). Solution complete in O(N) time! 🎉',
  },
];

// 3. VALID PALINDROME STEPS
const PALINDROME_STEPS = [
  {
    activeLine: 1,
    left: 0,
    right: null,
    state: { keyInsight: 'A palindrome is symmetrical. Compare outer characters moving inwards.', left: 0, 's[0]': "'r'", status: 'Initializing left pointer...' },
    desc: '💡 Key insight: A palindrome is symmetrical. Comparing outer characters from both ends moving inwards verifies symmetry in O(N) time. Initialize left = 0 (\'r\').',
  },
  {
    activeLine: 1,
    left: 0,
    right: 6,
    state: { keyInsight: 'Symmetrical character matching from outer bounds to center.', left: 0, right: 6, 's[0]': "'r'", 's[6]': "'r'", status: 'Initializing right pointer...' },
    desc: 'Step 2: Initialize "right" pointer at index 6 (\'r\'). We now have pointers at opposite outer ends of the string.',
  },
  {
    activeLine: 2,
    left: 0,
    right: 6,
    state: { left: 0, right: 6, 'left < right': '0 < 6 (TRUE ✅)' },
    desc: 'Step 3: Check loop condition: 0 < 6 is TRUE. Enter symmetry checking loop.',
  },
  {
    activeLine: 3,
    left: 0,
    right: 6,
    state: { left: 0, right: 6, 's[0]': "'r'", 's[6]': "'r'", match: 'MATCH ✅' },
    desc: 'Step 4: Compare s[0] (\'r\') with s[6] (\'r\'): Exact match! Outer layer verified.',
  },
  {
    activeLine: 5,
    left: 1,
    right: 6,
    state: { left: 1, right: 6, action: 'left++' },
    desc: 'Step 5: Increment left pointer to index 1 (\'a\').',
  },
  {
    activeLine: 6,
    left: 1,
    right: 5,
    state: { left: 1, right: 5, action: 'right--' },
    desc: 'Step 6: Decrement right pointer to index 5 (\'a\').',
  },
  {
    activeLine: 3,
    left: 1,
    right: 5,
    state: { left: 1, right: 5, 's[1]': "'a'", 's[5]': "'a'", match: 'MATCH ✅' },
    desc: 'Step 7: Compare s[1] (\'a\') with s[5] (\'a\'): Exact match! Second layer verified.',
  },
  {
    activeLine: 5,
    left: 2,
    right: 5,
    state: { left: 2, right: 5, action: 'left++' },
    desc: 'Step 8: Increment left pointer to index 2 (\'c\').',
  },
  {
    activeLine: 6,
    left: 2,
    right: 4,
    state: { left: 2, right: 4, action: 'right--' },
    desc: 'Step 9: Decrement right pointer to index 4 (\'c\').',
  },
  {
    activeLine: 3,
    left: 2,
    right: 4,
    state: { left: 2, right: 4, 's[2]': "'c'", 's[4]': "'c'", match: 'MATCH ✅' },
    desc: 'Step 10: Compare s[2] (\'c\') with s[4] (\'c\'): Exact match! Inner layer verified.',
  },
  {
    activeLine: 7,
    left: 3,
    right: 3,
    isMatch: true,
    state: { left: 3, right: 3, result: 'true', status: 'VALID PALINDROME 🎉' },
    desc: 'Step 11: Pointers meet at center index 3 (\'e\'). "racecar" is verified as a Valid Palindrome! 🎉',
  },
];

// 4. 3SUM STEPS
const THREE_SUM_STEPS = [
  {
    activeLine: 1,
    i: 0,
    left: null,
    right: null,
    state: { keyInsight: 'Sorting array allows O(N^2) 2-pointer scan & eliminates duplicates.', sorted: '[-4, -1, -1, 0, 1, 2]', status: 'Sorting input array' },
    desc: '💡 Key insight: Sorting the array first turns 3Sum into N Two-Sum-II problems in O(N^2) time while easily skipping duplicates.',
  },
  {
    activeLine: 2,
    i: 0,
    left: 1,
    right: null,
    state: { i: 0, 'nums[0]': -4, left: 1, status: 'Initializing left pointer...' },
    desc: 'Step 2: Fix outer loop i = 0 (val = -4). Initialize left = 1 (-1).',
  },
  {
    activeLine: 2,
    i: 0,
    left: 1,
    right: 5,
    state: { i: 0, 'nums[0]': -4, left: 1, right: 5, status: 'Initializing right pointer...' },
    desc: 'Step 3: Initialize right = 5 (val = 2). We now have boundaries for fixed i=0.',
  },
  {
    activeLine: 5,
    i: 0,
    left: 1,
    right: 5,
    state: { i: 0, left: 1, right: 5, sum: -3, target: 0, computation: '-4 + (-1) + 2 = -3' },
    desc: 'Step 4: Calculate 3Sum = (-4) + (-1) + 2 = -3. Compare with 0.',
  },
  {
    activeLine: 9,
    i: 0,
    left: 2,
    right: 5,
    state: { i: 0, left: 2, right: 5, action: 'sum -3 < 0 ➔ left++' },
    desc: 'Step 5: Sum (-3) < 0. Increment left pointer to index 2 (-1).',
  },
  {
    activeLine: 2,
    i: 1,
    left: 2,
    right: null,
    state: { i: 1, 'nums[1]': -1, left: 2, status: 'Advancing outer loop to i=1' },
    desc: 'Step 6: Advance outer loop to i = 1 (val = -1). Set left = 2 (-1).',
  },
  {
    activeLine: 2,
    i: 1,
    left: 2,
    right: 5,
    state: { i: 1, 'nums[1]': -1, left: 2, right: 5, status: 'Setting right boundary' },
    desc: 'Step 7: Set right = 5 (val = 2). Evaluate 3Sum for fixed i=1.',
  },
  {
    activeLine: 5,
    i: 1,
    left: 2,
    right: 5,
    state: { i: 1, left: 2, right: 5, sum: 0, computation: '-1 + (-1) + 2 = 0' },
    desc: 'Step 8: Calculate 3Sum = (-1) + (-1) + 2 = 0.',
  },
  {
    activeLine: 7,
    i: 1,
    left: 2,
    right: 5,
    isMatch: true,
    state: { triplet: '[-1, -1, 2]', triplets: '[ [-1, -1, 2] ]', status: 'MATCH FOUND 🎉' },
    desc: 'Step 9: Sum == 0! Record triplet [-1, -1, 2]! 🎉',
  },
  {
    activeLine: 7,
    i: 1,
    left: 3,
    right: 4,
    isMatch: true,
    state: { triplet: '[-1, 0, 1]', triplets: '[ [-1, -1, 2], [-1, 0, 1] ]', status: 'MATCH FOUND 🎉' },
    desc: 'Step 10: Move pointers to left = 3 (0), right = 4 (1). Sum = 0! Record triplet [-1, 0, 1]! 🎉',
  },
];

// 5. CONTAINER WITH MOST WATER STEPS
const CONTAINER_WATER_STEPS = [
  {
    activeLine: 1,
    left: 0,
    right: null,
    state: { keyInsight: 'Area is bounded by shorter height. Moving shorter line inward might increase height.', left: 0, 'h[0]': 1, maxArea: 0, status: 'Initializing left boundary...' },
    desc: '💡 Key insight: Container area = width * min(height[left], height[right]). Moving the taller line inward can NEVER increase area (width decreases, height is still bottlenecked by shorter line). ALWAYS move the shorter line inward!',
  },
  {
    activeLine: 1,
    left: 0,
    right: 7,
    state: { keyInsight: 'Always shift shorter line inward to find larger height bottlenecks.', left: 0, right: 7, 'h[0]': 1, 'h[7]': 3, maxArea: 0, status: 'Initializing right boundary...' },
    desc: 'Step 2: Initialize "right" pointer at index 7 (height 3). We now have pointers at maximum width.',
  },
  {
    activeLine: 3,
    left: 0,
    right: 7,
    state: { left: 0, right: 7, minHeight: 1, width: 7, currentArea: 7, maxArea: 7 },
    desc: 'Step 3: Calculate Area = min(1, 3) * (7 - 0) = 1 * 7 = 7. Set maxArea = 7.',
  },
  {
    activeLine: 5,
    left: 1,
    right: 7,
    state: { left: 1, right: 7, 'h[1]': 8, action: 'shorter line left(1) < right(3) ➔ left++' },
    desc: 'Step 4: Left height (1) < Right height (3). Move shorter left line inward to index 1 (height 8).',
  },
  {
    activeLine: 3,
    left: 1,
    right: 7,
    state: { left: 1, right: 7, minHeight: 3, width: 6, currentArea: 18, maxArea: 18 },
    desc: 'Step 5: Calculate Area = min(8, 3) * (7 - 1) = 3 * 6 = 18. Update maxArea = 18.',
  },
  {
    activeLine: 7,
    left: 1,
    right: 6,
    state: { left: 1, right: 6, 'h[6]': 8, action: 'shorter line right(3) < left(8) ➔ right--' },
    desc: 'Step 6: Right height (3) < Left height (8). Move shorter right line inward to index 6 (height 8).',
  },
  {
    activeLine: 3,
    left: 1,
    right: 6,
    isMatch: true,
    state: { left: 1, right: 6, minHeight: 8, width: 5, currentArea: 40, maxArea: 40, status: 'MAX AREA FOUND 🎉' },
    desc: 'Step 7: Calculate Area = min(8, 8) * (6 - 1) = 8 * 5 = 40! Maximum water area found! 🎉',
  },
];

// 6. MOVE ZEROES STEPS
const MOVE_ZEROES_STEPS = [
  {
    activeLine: 1,
    slow: 0,
    fast: null,
    array: [0, 1, 0, 3, 12],
    state: { keyInsight: 'Fast pointer finds non-zeroes; Slow pointer tracks next placement position.', slow: 0, fast: 'None', 'arr[0]': 0, status: 'Initializing slow pointer...' },
    desc: '💡 Key insight: Slow pointer points to next available 0-slot; Fast pointer scans for non-zero elements to swap into place in O(N) time.',
  },
  {
    activeLine: 1,
    slow: 0,
    fast: 0,
    array: [0, 1, 0, 3, 12],
    state: { slow: 0, fast: 0, 'arr[0]': 0, status: 'Initializing fast pointer at 0' },
    desc: 'Step 2: Initialize fast = 0. Element arr[0] is 0, so advance fast.',
  },
  {
    activeLine: 2,
    slow: 0,
    fast: 1,
    array: [0, 1, 0, 3, 12],
    state: { slow: 0, fast: 1, 'arr[1]': 1, status: 'Encountered non-zero 1' },
    desc: 'Step 3: Fast advances to index 1 (val 1). Non-zero element found!',
  },
  {
    activeLine: 3,
    slow: 1,
    fast: 1,
    isMatch: true,
    array: [1, 0, 0, 3, 12],
    state: { slow: 1, fast: 1, swap: 'arr[0] ↔ arr[1]', array: '[1, 0, 0, 3, 12]' },
    desc: 'Step 4: Swap arr[0] and arr[1]. Non-zero 1 moved to index 0! Advance slow to 1.',
  },
  {
    activeLine: 2,
    slow: 1,
    fast: 3,
    array: [1, 0, 0, 3, 12],
    state: { slow: 1, fast: 3, 'arr[3]': 3, status: 'Encountered non-zero 3' },
    desc: 'Step 5: Fast advances past zero to index 3 (val 3).',
  },
  {
    activeLine: 3,
    slow: 2,
    fast: 3,
    isMatch: true,
    array: [1, 3, 0, 0, 12],
    state: { slow: 2, fast: 3, swap: 'arr[1] ↔ arr[3]', array: '[1, 3, 0, 0, 12]' },
    desc: 'Step 6: Swap arr[1] and arr[3]. Non-zero 3 moved to index 1! Advance slow to 2.',
  },
  {
    activeLine: 3,
    slow: 3,
    fast: 4,
    isMatch: true,
    array: [1, 3, 12, 0, 0],
    state: { slow: 3, fast: 4, swap: 'arr[2] ↔ arr[4]', array: '[1, 3, 12, 0, 0]', status: 'COMPLETE 🎉' },
    desc: 'Step 7: Swap arr[2] and arr[4]. Non-zero 12 moved to index 2! Move Zeroes complete! 🎉',
  },
];

// 7. REMOVE DUPLICATES STEPS
const REMOVE_DUPLICATES_STEPS = [
  {
    activeLine: 1,
    slow: 0,
    fast: null,
    array: [1, 1, 2, 2, 3, 4],
    state: { keyInsight: 'Fast pointer finds unique elements; Slow pointer overwrites in-place.', slow: 0, fast: 'None', k: 1 },
    desc: '💡 Key insight: Array is sorted! Whenever fast finds an element different from slow, increment slow and overwrite in-place.',
  },
  {
    activeLine: 1,
    slow: 0,
    fast: 0,
    array: [1, 1, 2, 2, 3, 4],
    state: { slow: 0, fast: 0, k: 1 },
    desc: 'Step 2: Initialize fast = 0. First element (1) is unique.',
  },
  {
    activeLine: 2,
    slow: 0,
    fast: 1,
    array: [1, 1, 2, 2, 3, 4],
    state: { slow: 0, fast: 1, 'arr[1]': 1, status: 'Duplicate 1 detected ➔ Skip' },
    desc: 'Step 3: Fast advances to 1 (val 1). Duplicate element detected! Skip.',
  },
  {
    activeLine: 3,
    slow: 1,
    fast: 2,
    isMatch: true,
    array: [1, 2, 2, 2, 3, 4],
    state: { slow: 1, fast: 2, overwrite: 'arr[1] = 2', k: 2 },
    desc: 'Step 4: Fast sees new unique 2 at index 2. Increment slow to 1, overwrite arr[1] = 2.',
  },
  {
    activeLine: 3,
    slow: 2,
    fast: 4,
    isMatch: true,
    array: [1, 2, 3, 2, 3, 4],
    state: { slow: 2, fast: 4, overwrite: 'arr[2] = 3', k: 3 },
    desc: 'Step 5: Fast sees unique 3 at index 4. Increment slow to 2, overwrite arr[2] = 3.',
  },
  {
    activeLine: 3,
    slow: 3,
    fast: 5,
    isMatch: true,
    array: [1, 2, 3, 4, 3, 4],
    state: { slow: 3, fast: 5, overwrite: 'arr[3] = 4', k: 4, status: 'COMPLETE 🎉' },
    desc: 'Step 6: Fast sees unique 4 at index 5. Overwrite arr[3] = 4. Return K = 4 unique elements! 🎉',
  },
];

// 8. SORT COLORS STEPS
const SORT_COLORS_STEPS = [
  {
    activeLine: 1,
    low: 0,
    mid: 0,
    high: null,
    array: [2, 0, 2, 1, 1, 0],
    state: { keyInsight: 'Dutch National Flag algorithm: low tracks 0s, mid scans, high tracks 2s.', low: 0, mid: 0, high: 'None' },
    desc: '💡 Key insight: Dutch National Flag 3-pointer partition sorts 0s, 1s, and 2s in a single pass O(N) without built-in sort.',
  },
  {
    activeLine: 1,
    low: 0,
    mid: 0,
    high: 5,
    array: [2, 0, 2, 1, 1, 0],
    state: { low: 0, mid: 0, high: 5, 'arr[0]': 2 },
    desc: 'Step 2: Initialize high = 5. All three pointers ready.',
  },
  {
    activeLine: 4,
    low: 0,
    mid: 0,
    high: 4,
    array: [0, 0, 2, 1, 1, 2],
    state: { low: 0, mid: 0, high: 4, swap: 'arr[0] ↔ arr[5]' },
    desc: 'Step 3: Mid sees 2. Swap arr[0] and arr[5]. High decrements to 4.',
  },
  {
    activeLine: 2,
    low: 1,
    mid: 1,
    high: 4,
    isMatch: true,
    array: [0, 0, 2, 1, 1, 2],
    state: { low: 1, mid: 1, high: 4 },
    desc: 'Step 4: Mid sees 0. Swap arr[0] and arr[0]. Increment low to 1 and mid to 1.',
  },
  {
    activeLine: 2,
    low: 2,
    mid: 2,
    high: 4,
    isMatch: true,
    array: [0, 0, 2, 1, 1, 2],
    state: { low: 2, mid: 2, high: 4 },
    desc: 'Step 5: Mid sees 0. Swap arr[1] and arr[1]. Increment low to 2 and mid to 2.',
  },
  {
    activeLine: 5,
    low: 2,
    mid: 4,
    high: 2,
    isMatch: true,
    array: [0, 0, 1, 1, 2, 2],
    state: { low: 2, mid: 4, high: 2, status: 'SORTED 🎉' },
    desc: 'Step 6: Partition complete! Array sorted to [0, 0, 1, 1, 2, 2] in single pass! 🎉',
  },
];

const TRACK_ARRAYS = {
  intro: [3, 8, 12, 17, 21, 26, 30],
  'two-sum-ii': [2, 7, 11, 15],
  'valid-palindrome': ['r', 'a', 'c', 'e', 'c', 'a', 'r'],
  'three-sum': [-4, -1, -1, 0, 1, 2],
  'container-water': [1, 8, 6, 2, 5, 4, 8, 3, 7],
  'move-zeroes': [0, 1, 0, 3, 12],
  'remove-duplicates': [1, 1, 2, 2, 3, 4],
  'sort-colors': [2, 0, 2, 1, 1, 0],
};

export const useTwoPointersStore = create((set, get) => ({
  track: 'intro',
  array: TRACK_ARRAYS['intro'],
  steps: INTRO_STEPS,
  currentStep: 0,
  isPlaying: false,
  speed: 1,
  practiceMode: false,
  userCode: `// Two Pointers Template\nfunction twoPointerSearch(arr, target) {\n  let left = 0;\n  let right = arr.length - 1;\n  while (left < right) {\n    let sum = arr[left] + arr[right];\n    if (sum === target) return [left + 1, right + 1];\n    else if (sum < target) left++;\n    else right--;\n  }\n  return [];\n}`,

  setTrack: (trackKey) => {
    let steps = INTRO_STEPS;
    let array = TRACK_ARRAYS['intro'];

    if (trackKey === 'two-sum-ii') {
      steps = TWO_SUM_STEPS;
      array = TRACK_ARRAYS['two-sum-ii'];
    } else if (trackKey === 'valid-palindrome') {
      steps = PALINDROME_STEPS;
      array = TRACK_ARRAYS['valid-palindrome'];
    } else if (trackKey === 'three-sum') {
      steps = THREE_SUM_STEPS;
      array = TRACK_ARRAYS['three-sum'];
    } else if (trackKey === 'container-water') {
      steps = CONTAINER_WATER_STEPS;
      array = TRACK_ARRAYS['container-water'];
    } else if (trackKey === 'move-zeroes') {
      steps = MOVE_ZEROES_STEPS;
      array = TRACK_ARRAYS['move-zeroes'];
    } else if (trackKey === 'remove-duplicates') {
      steps = REMOVE_DUPLICATES_STEPS;
      array = TRACK_ARRAYS['remove-duplicates'];
    } else if (trackKey === 'sort-colors') {
      steps = SORT_COLORS_STEPS;
      array = TRACK_ARRAYS['sort-colors'];
    }

    set({ track: trackKey, array, steps, currentStep: 0, isPlaying: false });
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
