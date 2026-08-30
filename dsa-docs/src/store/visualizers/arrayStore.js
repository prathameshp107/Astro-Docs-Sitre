import { create } from 'zustand';

// 1. ARRAY ACCESS STEPS (Exhaustive 8-Step Trace)
export const ACCESS_STEPS = [
  {
    activeLine: 1,
    index: 0,
    array: [10, 25, 42, 58, 73, 89],
    state: { keyInsight: 'Direct memory calculation base_addr + index * element_size gives O(1) access time.', targetIndex: 3, index: 0, 'arr[0]': 10 },
    desc: '💡 Key insight: Direct memory address calculation index * element_size provides instantaneous O(1) random access time in contiguous memory.',
  },
  {
    activeLine: 1,
    index: 0,
    array: [10, 25, 42, 58, 73, 89],
    state: { targetIndex: 3, index: 0, baseAddress: '0x1000', elementSize: '4 bytes' },
    desc: 'Step 2: Inspect array RAM allocation starting at Base Address 0x1000. Each integer element occupies 4 bytes in RAM.',
  },
  {
    activeLine: 1,
    index: 0,
    array: [10, 25, 42, 58, 73, 89],
    state: { targetIndex: 3, boundsCheck: '0 <= 3 < 6 (Valid Bounds ✅)' },
    desc: 'Step 3: Perform bounds check for target index 3. Verify condition 0 <= 3 < 6 (Valid array index ✅).',
  },
  {
    activeLine: 1,
    index: 1,
    array: [10, 25, 42, 58, 73, 89],
    state: { targetIndex: 3, offsetMultiplier: '3 * 4 bytes = 12 bytes (0x0C)' },
    desc: 'Step 4: Calculate Memory Offset multiplier: Offset = Target_Index * Element_Size = 3 * 4 = 12 bytes (0x0C in hex).',
  },
  {
    activeLine: 1,
    index: 2,
    array: [10, 25, 42, 58, 73, 89],
    state: { targetIndex: 3, formula: '0x1000 + 0x0C = 0x100C' },
    desc: 'Step 5: Compute Target Memory Address: Target_Address = Base_Address + Offset = 0x1000 + 12 = 0x100C.',
  },
  {
    activeLine: 2,
    index: 3,
    array: [10, 25, 42, 58, 73, 89],
    state: { targetIndex: 3, index: 3, memoryAddress: '0x100C' },
    desc: 'Step 6: Perform Instantaneous Direct Jump to Memory Address 0x100C (Index 3). Pointer moves to index 3 without linear iteration.',
  },
  {
    activeLine: 2,
    index: 3,
    array: [10, 25, 42, 58, 73, 89],
    state: { targetIndex: 3, index: 3, readVal: 58 },
    desc: 'Step 7: Read 4-byte integer from RAM address 0x100C: Value = 58. Zero element shifts or scans needed.',
  },
  {
    activeLine: 2,
    index: 3,
    array: [10, 25, 42, 58, 73, 89],
    isMatch: true,
    state: { targetIndex: 3, index: 3, 'arr[3]': 58, complexity: 'O(1)', status: 'ACCESSED 🎉' },
    desc: 'Step 8: Direct O(1) Memory Access complete! Value 58 retrieved in O(1) time! 🎉',
  },
];

// 2. ARRAY INSERTION STEPS (Exhaustive 9-Step Trace)
export const INSERT_STEPS = [
  {
    activeLine: 1,
    index: null,
    array: [10, 20, 30, 40, null],
    state: { keyInsight: 'Shift all elements right from insert index to vacate spot in O(N) time.', value: 99, insertIndex: 2, n: 4 },
    desc: '💡 Key insight: To insert at index 2, shift all elements from index 2 to end right by 1 position (O(N) time) before writing new value.',
  },
  {
    activeLine: 1,
    index: 2,
    array: [10, 20, 30, 40, null],
    state: { value: 99, insertIndex: 2, currentValAtTarget: 30 },
    desc: 'Step 2: Target insertion index is 2. Current value at arr[2] is 30. Last slot arr[4] is null (Space available ✅).',
  },
  {
    activeLine: 1,
    index: 3,
    array: [10, 20, 30, 40, null],
    state: { i: 3, loopRange: 'for i from 3 down to 2' },
    desc: 'Step 3: Start right-shifting loop. Set pointer i = 3 (rightmost existing element).',
  },
  {
    activeLine: 2,
    index: 3,
    array: [10, 20, 30, 40, 40],
    state: { i: 3, shift: 'arr[4] = arr[3] (40)' },
    desc: 'Step 4: Shift arr[3] (40) right by 1 position into empty slot arr[4]. Array becomes [10, 20, 30, 40, 40].',
  },
  {
    activeLine: 1,
    index: 2,
    array: [10, 20, 30, 40, 40],
    state: { i: 2, loopNext: 'Decrement i to 2' },
    desc: 'Step 5: Decrement loop pointer i to 2. Inspect element arr[2] = 30.',
  },
  {
    activeLine: 2,
    index: 2,
    array: [10, 20, 30, 30, 40],
    state: { i: 2, shift: 'arr[3] = arr[2] (30)' },
    desc: 'Step 6: Shift arr[2] (30) right into slot arr[3]. Array becomes [10, 20, 30, 30, 40]. Slot at index 2 is now ready!',
  },
  {
    activeLine: 2,
    index: 2,
    array: [10, 20, null, 30, 40],
    state: { insertIndex: 2, status: 'Index 2 Vacated' },
    desc: 'Step 7: Shifting loop complete! Index 2 is now safely vacated for writing.',
  },
  {
    activeLine: 3,
    index: 2,
    array: [10, 20, 99, 30, 40],
    state: { insertIndex: 2, writeVal: 99 },
    desc: 'Step 8: Write new value 99 into vacated slot at index 2. Array transforms to [10, 20, 99, 30, 40].',
  },
  {
    activeLine: 4,
    index: 2,
    isMatch: true,
    array: [10, 20, 99, 30, 40],
    state: { insertIndex: 2, 'arr[2]': 99, newSize: 5, status: 'INSERTED 🎉' },
    desc: 'Step 9: Increment array length N to 5. Insertion complete! Total elements shifted = 2. Overall time complexity O(N)! 🎉',
  },
];

// 3. ARRAY DELETION STEPS (Exhaustive 9-Step Trace)
export const DELETE_STEPS = [
  {
    activeLine: 1,
    index: 2,
    array: [10, 20, 99, 30, 40],
    state: { keyInsight: 'Overwrite target element by shifting all subsequent elements left by 1 position in O(N) time.', deleteIndex: 2, target: 99 },
    desc: '💡 Key insight: To delete element at index 2, overwrite it by shifting all subsequent elements left by 1 position in O(N) time.',
  },
  {
    activeLine: 1,
    index: 2,
    array: [10, 20, 99, 30, 40],
    state: { deleteIndex: 2, targetVal: 99 },
    desc: 'Step 2: Target index for removal is 2 (value 99). Verify bounds 0 <= 2 < 5 (Valid index ✅).',
  },
  {
    activeLine: 2,
    index: 2,
    array: [10, 20, 99, 30, 40],
    state: { i: 2, loopRange: 'for i from 2 to 3' },
    desc: 'Step 3: Start left-shifting loop. Set pointer i = 2 (deletion target index).',
  },
  {
    activeLine: 3,
    index: 2,
    array: [10, 20, 30, 30, 40],
    state: { i: 2, copy: 'arr[2] = arr[3] (30)' },
    desc: 'Step 4: Shift arr[3] (30) left into arr[2]. Overwrites target element 99! Array becomes [10, 20, 30, 30, 40].',
  },
  {
    activeLine: 2,
    index: 3,
    array: [10, 20, 30, 30, 40],
    state: { i: 3, loopNext: 'Advance i to 3' },
    desc: 'Step 5: Advance loop pointer i to 3. Inspect next element arr[4] = 40.',
  },
  {
    activeLine: 3,
    index: 3,
    array: [10, 20, 30, 40, 40],
    state: { i: 3, copy: 'arr[3] = arr[4] (40)' },
    desc: 'Step 6: Shift arr[4] (40) left into arr[3]. Array becomes [10, 20, 30, 40, 40].',
  },
  {
    activeLine: 3,
    index: 4,
    array: [10, 20, 30, 40, 40],
    state: { i: 4, trailingDuplicate: 'arr[4] holds duplicate 40' },
    desc: 'Step 7: Left-shifting loop completes! Last slot arr[4] now holds duplicate value 40.',
  },
  {
    activeLine: 4,
    index: 4,
    array: [10, 20, 30, 40, null],
    state: { i: 4, clear: 'arr[4] = null' },
    desc: 'Step 8: Clear trailing duplicate slot arr[4] to null. Array becomes [10, 20, 30, 40, null].',
  },
  {
    activeLine: 4,
    index: 3,
    isMatch: true,
    array: [10, 20, 30, 40, null],
    state: { deleteIndex: 2, newLength: 4, status: 'DELETED 🎉' },
    desc: 'Step 9: Decrement logical array length N from 5 to 4. Deletion complete! Time complexity O(N)! 🎉',
  },
];

// 4. LINEAR SEARCH STEPS (Exhaustive 9-Step Trace)
export const SEARCH_STEPS = [
  {
    activeLine: 1,
    index: 0,
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    state: { keyInsight: 'Linear search inspects array element-by-element from index 0 to N-1 in O(N) time.', target: 23, i: 0 },
    desc: '💡 Key insight: Linear search sequentially inspects each element from left to right until the target value is found or array ends (O(N) worst case).',
  },
  {
    activeLine: 1,
    index: 0,
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    state: { target: 23, index: 0, val: 2, match: '2 != 23 ❌' },
    desc: 'Step 2: Inspect index 0 (val 2). Compare 2 == 23 ❌ (Mismatch). Advance index i to 1.',
  },
  {
    activeLine: 1,
    index: 1,
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    state: { target: 23, index: 1, val: 5, match: '5 != 23 ❌' },
    desc: 'Step 3: Inspect index 1 (val 5). Compare 5 == 23 ❌ (Mismatch). Advance index i to 2.',
  },
  {
    activeLine: 1,
    index: 2,
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    state: { target: 23, index: 2, val: 8, match: '8 != 23 ❌' },
    desc: 'Step 4: Inspect index 2 (val 8). Compare 8 == 23 ❌ (Mismatch). Advance index i to 3.',
  },
  {
    activeLine: 1,
    index: 3,
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    state: { target: 23, index: 3, val: 12, match: '12 != 23 ❌' },
    desc: 'Step 5: Inspect index 3 (val 12). Compare 12 == 23 ❌ (Mismatch). Advance index i to 4.',
  },
  {
    activeLine: 1,
    index: 4,
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    state: { target: 23, index: 4, val: 16, match: '16 != 23 ❌' },
    desc: 'Step 6: Inspect index 4 (val 16). Compare 16 == 23 ❌ (Mismatch). Advance index i to 5.',
  },
  {
    activeLine: 2,
    index: 5,
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    state: { target: 23, index: 5, val: 23, match: '23 == 23 ✅ MATCH FOUND!' },
    desc: 'Step 7: Inspect index 5 (val 23). Compare 23 == 23 ✅ MATCH FOUND! Trigger early loop exit.',
  },
  {
    activeLine: 3,
    index: 5,
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    state: { target: 23, index: 5, totalComparisons: 6 },
    desc: 'Step 8: Target value 23 successfully located at index 5. Total comparisons made = 6.',
  },
  {
    activeLine: 3,
    index: 5,
    isMatch: true,
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    state: { target: 23, index: 5, val: 23, status: 'FOUND AT INDEX 5 🎉' },
    desc: 'Step 9: Return index 5. Linear search complete in O(N) time! 🎉',
  },
];

// 5. PREFIX SUM STEPS (Exhaustive 9-Step Trace)
const PREFIX_SUM_STEPS = [
  {
    activeLine: 1,
    index: 0,
    array: [2, 4, 1, 3, 5],
    prefixArray: [2, 6, 7, 10, 15],
    state: { keyInsight: 'Precompute prefixSum[i] = prefixSum[i-1] + arr[i]. Range sum L..R in O(1) time.', L: 1, R: 3 },
    desc: '💡 Key insight: Precompute prefix sums in O(N). Any subsequent range sum query [L..R] is computed in O(1) via prefixSum[R] - prefixSum[L-1].',
  },
  {
    activeLine: 1,
    index: 0,
    array: [2, 4, 1, 3, 5],
    prefixArray: [2, 0, 0, 0, 0],
    state: { index: 0, val: 2, prefix0: 2 },
    desc: 'Step 2: Initialize prefix[0] = arr[0] = 2. Prefix array starts as [2, 0, 0, 0, 0].',
  },
  {
    activeLine: 2,
    index: 1,
    array: [2, 4, 1, 3, 5],
    prefixArray: [2, 6, 0, 0, 0],
    state: { index: 1, formula: '2 + 4 = 6', prefix1: 6 },
    desc: 'Step 3: Compute prefix[1] = prefix[0] + arr[1] = 2 + 4 = 6. Prefix array becomes [2, 6, 0, 0, 0].',
  },
  {
    activeLine: 2,
    index: 2,
    array: [2, 4, 1, 3, 5],
    prefixArray: [2, 6, 7, 0, 0],
    state: { index: 2, formula: '6 + 1 = 7', prefix2: 7 },
    desc: 'Step 4: Compute prefix[2] = prefix[1] + arr[2] = 6 + 1 = 7. Prefix array becomes [2, 6, 7, 0, 0].',
  },
  {
    activeLine: 2,
    index: 3,
    array: [2, 4, 1, 3, 5],
    prefixArray: [2, 6, 7, 10, 0],
    state: { index: 3, formula: '7 + 3 = 10', prefix3: 10 },
    desc: 'Step 5: Compute prefix[3] = prefix[2] + arr[3] = 7 + 3 = 10. Prefix array becomes [2, 6, 7, 10, 0].',
  },
  {
    activeLine: 2,
    index: 4,
    array: [2, 4, 1, 3, 5],
    prefixArray: [2, 6, 7, 10, 15],
    state: { index: 4, formula: '10 + 5 = 15', prefix4: 15 },
    desc: 'Step 6: Compute prefix[4] = prefix[3] + arr[4] = 10 + 5 = 15. Full prefix array ready: [2, 6, 7, 10, 15].',
  },
  {
    activeLine: 3,
    index: 3,
    array: [2, 4, 1, 3, 5],
    prefixArray: [2, 6, 7, 10, 15],
    state: { L: 1, R: 3, rangeQuery: 'sum(L=1..R=3)' },
    desc: 'Step 7: Receive range sum query sum(L=1..R=3). Apply formula rangeSum = prefix[3] - prefix[0].',
  },
  {
    activeLine: 3,
    index: 3,
    array: [2, 4, 1, 3, 5],
    prefixArray: [2, 6, 7, 10, 15],
    state: { L: 1, R: 3, formula: 'prefix[3] - prefix[0] = 10 - 2 = 8' },
    desc: 'Step 8: Substitute prefix values: prefix[3] (10) - prefix[0] (2) = 8.',
  },
  {
    activeLine: 3,
    index: 3,
    isMatch: true,
    array: [2, 4, 1, 3, 5],
    prefixArray: [2, 6, 7, 10, 15],
    state: { L: 1, R: 3, rangeSum: 8, status: 'RANGE SUM COMPUTED 🎉' },
    desc: 'Step 9: Range sum query sum(1..3) = 8 evaluated instantaneously in O(1) time! 🎉',
  },
];

// 6. REVERSE ARRAY STEPS (Exhaustive 9-Step Trace)
const REVERSE_ARRAY_STEPS = [
  {
    activeLine: 1,
    left: 0,
    right: 4,
    array: [1, 2, 3, 4, 5],
    state: { keyInsight: 'Two pointers at L=0 & R=N-1 swap elements while converging to center.', L: 0, R: 4 },
    desc: '💡 Key insight: Reverse array in-place by placing two pointers at L=0 and R=N-1 and swapping elements while converging inward.',
  },
  {
    activeLine: 1,
    left: 0,
    right: 4,
    array: [1, 2, 3, 4, 5],
    state: { L: 0, R: 4, valL: 1, valR: 5, condition: 'L < R (0 < 4)' },
    desc: 'Step 2: Initialize Left pointer L = 0 (val 1) and Right pointer R = 4 (val 5). Check condition L < R (0 < 4 holds true).',
  },
  {
    activeLine: 3,
    left: 0,
    right: 4,
    array: [1, 2, 3, 4, 5],
    state: { L: 0, R: 4, action: 'Swapping arr[0] ↔ arr[4]', valL: 1, valR: 5 },
    desc: 'Step 3: About to swap arr[0]=1 and arr[4]=5. The arc shows the two elements that will be exchanged.',
  },
  {
    activeLine: 4,
    left: 0,
    right: 4,
    array: [5, 2, 3, 4, 1],
    state: { L: 0, R: 4, swap: 'arr[0] ↔ arr[4] ✅', newArr: '[5, 2, 3, 4, 1]' },
    desc: 'Step 3b: Swap complete! Array is now [5, 2, 3, 4, 1]. Advance L++ and R--.',
  },
  {
    activeLine: 1,
    left: 1,
    right: 3,
    array: [5, 2, 3, 4, 1],
    state: { L: 1, R: 3, pointerStep: 'Advance L++, R--' },
    desc: 'Step 4: Advance pointers: Increment L to 1, decrement R to 3.',
  },
  {
    activeLine: 1,
    left: 1,
    right: 3,
    array: [5, 2, 3, 4, 1],
    state: { L: 1, R: 3, valL: 2, valR: 4, condition: 'L < R (1 < 3)' },
    desc: 'Step 5: Inspect pointers L = 1 (val 2) and R = 3 (val 4). Check condition L < R (1 < 3 holds true).',
  },
  {
    activeLine: 3,
    left: 1,
    right: 3,
    array: [5, 2, 3, 4, 1],
    state: { L: 1, R: 3, action: 'Swapping arr[1] ↔ arr[3]', valL: 2, valR: 4 },
    desc: 'Step 6: About to swap arr[1]=2 and arr[3]=4. The arc shows the two elements that will be exchanged.',
  },
  {
    activeLine: 4,
    left: 1,
    right: 3,
    array: [5, 4, 3, 2, 1],
    state: { L: 1, R: 3, swap: 'arr[1] ↔ arr[3] ✅', newArr: '[5, 4, 3, 2, 1]' },
    desc: 'Step 6b: Swap complete! Array is now [5, 4, 3, 2, 1]. Advance L++ and R--.',
  },
  {
    activeLine: 1,
    left: 2,
    right: 2,
    array: [5, 4, 3, 2, 1],
    state: { L: 2, R: 2, pointerStep: 'Advance L++, R--' },
    desc: 'Step 7: Advance pointers: Increment L to 2, decrement R to 2.',
  },
  {
    activeLine: 2,
    left: 2,
    right: 2,
    array: [5, 4, 3, 2, 1],
    state: { L: 2, R: 2, condition: 'L >= R (2 >= 2) ➔ STOP' },
    desc: 'Step 8: Pointers meet at center index L = 2, R = 2. Condition L < R evaluates to False. Loop terminates.',
  },
  {
    activeLine: 4,
    left: 2,
    right: 2,
    isMatch: true,
    array: [5, 4, 3, 2, 1],
    state: { L: 2, R: 2, status: 'REVERSED 🎉' },
    desc: 'Step 9: Array fully reversed in-place to [5, 4, 3, 2, 1] in O(N/2) swaps! 🎉',
  },
];

// ─── 7. KADANE'S ALGORITHM — Max Subarray Sum ───────────────────────────────
export const KADANE_STEPS = [
  {
    activeLine: 1,
    index: 0,
    subStart: 0,
    subEnd: 0,
    maxStart: 0,
    maxEnd: 0,
    currentSum: -2,
    maxSum: -2,
    decision: 'init',
    array: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    state: { keyInsight: 'If currentSum goes negative, discard the prefix and start a fresh subarray window.', currentSum: -2, maxSum: -2, window: '[-2]', bestWindow: '[-2]' },
    desc: '💡 Key insight: A negative running sum hurts any future extension. Initialize currentSum = arr[0] = -2, maxSum = -2.',
  },
  {
    activeLine: 2,
    index: 1,
    subStart: 1,
    subEnd: 1,
    maxStart: 1,
    maxEnd: 1,
    currentSum: 1,
    maxSum: 1,
    decision: 'reset_and_max',
    array: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    state: { i: 1, 'arr[1]': 1, formula: 'max(-2+1, 1) = 1', currentSum: 1, maxSum: 1, action: 'RESET ➔ Start fresh at index 1' },
    desc: 'Step 2: i=1 (val 1). -2 + 1 = -1 < 1. Previous prefix was negative, so discard it! Start a fresh subarray [1]. New maxSum = 1.',
  },
  {
    activeLine: 2,
    index: 2,
    subStart: 1,
    subEnd: 2,
    maxStart: 1,
    maxEnd: 1,
    currentSum: -2,
    maxSum: 1,
    decision: 'extend',
    array: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    state: { i: 2, 'arr[2]': -3, formula: '1 + (-3) = -2', currentSum: -2, maxSum: 1, window: '[1, -3]' },
    desc: 'Step 3: i=2 (val -3). Extend window to [1, -3]. currentSum becomes -2. Global maxSum remains 1 (best window: [1]).',
  },
  {
    activeLine: 2,
    index: 3,
    subStart: 3,
    subEnd: 3,
    maxStart: 3,
    maxEnd: 3,
    currentSum: 4,
    maxSum: 4,
    decision: 'reset_and_max',
    array: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    state: { i: 3, 'arr[3]': 4, formula: 'max(-2+4, 4) = 4', currentSum: 4, maxSum: 4, action: 'RESET ➔ Start fresh at index 3' },
    desc: 'Step 4: i=3 (val 4). Previous prefix sum was -2. Discard it! Start fresh window at [4]. New global maxSum = 4!',
  },
  {
    activeLine: 2,
    index: 4,
    subStart: 3,
    subEnd: 4,
    maxStart: 3,
    maxEnd: 3,
    currentSum: 3,
    maxSum: 4,
    decision: 'extend',
    array: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    state: { i: 4, 'arr[4]': -1, formula: '4 + (-1) = 3', currentSum: 3, maxSum: 4, window: '[4, -1]' },
    desc: 'Step 5: i=4 (val -1). Extend window to [4, -1]. currentSum = 3. Since currentSum > 0, keep extending. maxSum stays 4.',
  },
  {
    activeLine: 2,
    index: 5,
    subStart: 3,
    subEnd: 5,
    maxStart: 3,
    maxEnd: 5,
    currentSum: 5,
    maxSum: 5,
    decision: 'new_max',
    array: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    state: { i: 5, 'arr[5]': 2, formula: '3 + 2 = 5', currentSum: 5, maxSum: 5, window: '[4, -1, 2]' },
    desc: 'Step 6: i=5 (val 2). Extend window to [4, -1, 2]. currentSum rises to 5! New global maximum sum: 5 (window: [4, -1, 2]).',
  },
  {
    activeLine: 2,
    index: 6,
    subStart: 3,
    subEnd: 6,
    maxStart: 3,
    maxEnd: 6,
    currentSum: 6,
    maxSum: 6,
    decision: 'peak_max',
    array: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    state: { i: 6, 'arr[6]': 1, formula: '5 + 1 = 6', currentSum: 6, maxSum: 6, window: '[4, -1, 2, 1]', status: 'PEAK MAX 🎉' },
    desc: 'Step 7: i=6 (val 1). Extend window to [4, -1, 2, 1]. currentSum rises to 6! Peak global maximum sum = 6!',
  },
  {
    activeLine: 2,
    index: 7,
    subStart: 3,
    subEnd: 7,
    maxStart: 3,
    maxEnd: 6,
    currentSum: 1,
    maxSum: 6,
    decision: 'extend',
    array: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    state: { i: 7, 'arr[7]': -5, formula: '6 + (-5) = 1', currentSum: 1, maxSum: 6, window: '[4, -1, 2, 1, -5]' },
    desc: 'Step 8: i=7 (val -5). Extend window to [4, -1, 2, 1, -5]. currentSum drops to 1. Global maxSum remains 6 (window: [4, -1, 2, 1]).',
  },
  {
    activeLine: 3,
    index: 8,
    subStart: 3,
    subEnd: 8,
    maxStart: 3,
    maxEnd: 6,
    currentSum: 5,
    maxSum: 6,
    decision: 'final',
    isMatch: true,
    array: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    state: { i: 8, 'arr[8]': 4, currentSum: 5, maxSum: 6, optimalSubarray: '[4, -1, 2, 1]', status: 'OPTIMAL MAX = 6 🎉' },
    desc: 'Step 9: i=8 (val 4). currentSum = 5. Traversal complete! Optimal contiguous subarray is [4, -1, 2, 1] with maxSum = 6! 🎉',
  },
];

// ─── 8. BEST TIME TO BUY & SELL STOCK ───────────────────────────────────────
export const BUY_SELL_STEPS = [
  {
    activeLine: 1,
    index: 0,
    array: [7, 1, 5, 3, 6, 4],
    state: { keyInsight: 'Track the minimum price seen so far — today\'s profit is price - minPrice.', minPrice: 7, maxProfit: 0, i: 0 },
    desc: '💡 Key insight: For every day, compute profit if sold today = price - minPriceSoFar. Track the running minimum to always buy at the lowest.',
  },
  {
    activeLine: 2,
    index: 1,
    array: [7, 1, 5, 3, 6, 4],
    state: { i: 1, price: 1, minPrice: 1, 'profit today': 0, maxProfit: 0 },
    desc: 'Step 2: Day 1, price=1. New minimum found! minPrice=1. Profit = 1-1 = 0. maxProfit stays 0.',
  },
  {
    activeLine: 2,
    index: 2,
    array: [7, 1, 5, 3, 6, 4],
    state: { i: 2, price: 5, minPrice: 1, 'profit today': 4, maxProfit: 4 },
    desc: 'Step 3: Day 2, price=5. Profit = 5-1 = 4. New maxProfit = 4! (Buy day 1 @ 1, sell day 2 @ 5)',
  },
  {
    activeLine: 2,
    index: 3,
    array: [7, 1, 5, 3, 6, 4],
    state: { i: 3, price: 3, minPrice: 1, 'profit today': 2, maxProfit: 4 },
    desc: 'Step 4: Day 3, price=3. Profit = 3-1 = 2. maxProfit stays 4.',
  },
  {
    activeLine: 2,
    index: 4,
    array: [7, 1, 5, 3, 6, 4],
    state: { i: 4, price: 6, minPrice: 1, 'profit today': 5, maxProfit: 5 },
    desc: 'Step 5: Day 4, price=6. Profit = 6-1 = 5. New maxProfit = 5! (Buy day 1 @ 1, sell day 4 @ 6)',
  },
  {
    activeLine: 3,
    index: 5,
    isMatch: true,
    array: [7, 1, 5, 3, 6, 4],
    state: { i: 5, price: 4, minPrice: 1, 'profit today': 3, maxProfit: 5, status: 'DONE 🎉' },
    desc: 'Step 6: Day 5, price=4. Profit = 4-1 = 3. maxProfit stays 5. Final answer: maxProfit = 5 (buy@1, sell@6). 🎉',
  },
];

// ─── 9. PRODUCT OF ARRAY EXCEPT SELF ────────────────────────────────────────
export const PRODUCT_EXCEPT_SELF_STEPS = [
  {
    activeLine: 1,
    index: 0,
    array: [1, 2, 3, 4],
    state: { keyInsight: 'Build prefix products left→right, then multiply suffix products right→left. No division needed!', prefix: '[1,?,?,?]', suffix: 'TBD' },
    desc: '💡 Key insight: For each index i, answer[i] = (product of all elements left of i) × (product of all elements right of i). Use two passes without division.',
  },
  {
    activeLine: 2,
    index: 0,
    array: [1, 2, 3, 4],
    state: { pass: 'Left prefix', i: 0, prefix: '[1, ?, ?, ?]', prefixProd: 1 },
    desc: 'Step 2: Left pass. answer[0] = 1 (no elements to the left). prefixProd = 1.',
  },
  {
    activeLine: 2,
    index: 1,
    array: [1, 2, 3, 4],
    state: { pass: 'Left prefix', i: 1, prefix: '[1, 1, ?, ?]', prefixProd: 1 },
    desc: 'Step 3: answer[1] = prefixProd = 1 (product of arr[0]=1). prefixProd *= arr[1] = 2 → prefixProd = 2.',
  },
  {
    activeLine: 2,
    index: 2,
    array: [1, 2, 3, 4],
    state: { pass: 'Left prefix', i: 2, prefix: '[1, 1, 2, ?]', prefixProd: 2 },
    desc: 'Step 4: answer[2] = prefixProd = 2 (product of 1×2). prefixProd *= arr[2]=3 → prefixProd=6.',
  },
  {
    activeLine: 2,
    index: 3,
    array: [1, 2, 3, 4],
    state: { pass: 'Left prefix', i: 3, prefix: '[1, 1, 2, 6]', prefixProd: 6 },
    desc: 'Step 5: answer[3] = prefixProd = 6 (product of 1×2×3). Left pass complete: [1, 1, 2, 6].',
  },
  {
    activeLine: 3,
    index: 3,
    array: [1, 2, 3, 4],
    state: { pass: 'Right suffix', i: 3, suffix: 1, answer: '[1, 1, 2, 6]' },
    desc: 'Step 6: Right pass. suffix = 1. answer[3] *= 1 = 6 (nothing to the right). suffix *= arr[3]=4 → suffix=4.',
  },
  {
    activeLine: 3,
    index: 2,
    array: [1, 2, 3, 4],
    state: { pass: 'Right suffix', i: 2, suffix: 4, answer: '[1, 1, 8, 6]' },
    desc: 'Step 7: answer[2] *= suffix=4 → 2×4 = 8. suffix *= arr[2]=3 → suffix=12.',
  },
  {
    activeLine: 3,
    index: 1,
    array: [1, 2, 3, 4],
    state: { pass: 'Right suffix', i: 1, suffix: 12, answer: '[1, 12, 8, 6]' },
    desc: 'Step 8: answer[1] *= suffix=12 → 1×12 = 12. suffix *= arr[1]=2 → suffix=24.',
  },
  {
    activeLine: 4,
    index: 0,
    isMatch: true,
    array: [1, 2, 3, 4],
    state: { pass: 'Done!', suffix: 24, answer: '[24, 12, 8, 6]', status: 'DONE 🎉' },
    desc: 'Step 9: answer[0] *= suffix=24 → 1×24 = 24. Final answer: [24, 12, 8, 6] in O(n) time, O(1) extra space! 🎉',
  },
];

// ─── 10. ROTATE ARRAY BY K STEPS ────────────────────────────────────────────
export const ROTATE_ARRAY_STEPS = [
  {
    activeLine: 1,
    array: [1, 2, 3, 4, 5, 6, 7],
    left: null,
    right: null,
    state: { keyInsight: '3-Step Reversal: (1) Reverse ALL [0..n-1], (2) Reverse first K [0..k-1], (3) Reverse rest [k..n-1].', k: 3 },
    desc: '💡 Key insight: Rotating right by K=3 in-place: Reverse all elements [0..6] → Reverse first K=3 [0..2] → Reverse remaining [3..6].',
  },
  {
    activeLine: 1,
    array: [1, 2, 3, 4, 5, 6, 7],
    left: 0,
    right: 6,
    swapFrom: 0,
    swapTo: 6,
    state: { pass: 'Stage 1: Reverse ALL [0..6]', L: 0, R: 6, action: 'Swapping arr[0]=1 ↔ arr[6]=7' },
    desc: 'Stage 1 (Reverse All): Left=0 (val 1) and Right=6 (val 7). About to swap arr[0] and arr[6].',
  },
  {
    activeLine: 1,
    array: [7, 2, 3, 4, 5, 6, 1],
    left: 0,
    right: 6,
    state: { pass: 'Stage 1: Reverse ALL [0..6]', L: 0, R: 6, swap: 'arr[0] ↔ arr[6] ✅', array: '[7, 2, 3, 4, 5, 6, 1]' },
    desc: 'Swap complete! Array becomes [7, 2, 3, 4, 5, 6, 1]. Advance L++ and R--.',
  },
  {
    activeLine: 1,
    array: [7, 2, 3, 4, 5, 6, 1],
    left: 1,
    right: 5,
    swapFrom: 1,
    swapTo: 5,
    state: { pass: 'Stage 1: Reverse ALL [0..6]', L: 1, R: 5, action: 'Swapping arr[1]=2 ↔ arr[5]=6' },
    desc: 'Stage 1 (Reverse All): Left=1 (val 2) and Right=5 (val 6). About to swap arr[1] and arr[5].',
  },
  {
    activeLine: 1,
    array: [7, 6, 3, 4, 5, 2, 1],
    left: 1,
    right: 5,
    state: { pass: 'Stage 1: Reverse ALL [0..6]', L: 1, R: 5, swap: 'arr[1] ↔ arr[5] ✅', array: '[7, 6, 3, 4, 5, 2, 1]' },
    desc: 'Swap complete! Array becomes [7, 6, 3, 4, 5, 2, 1]. Advance L++ and R--.',
  },
  {
    activeLine: 1,
    array: [7, 6, 3, 4, 5, 2, 1],
    left: 2,
    right: 4,
    swapFrom: 2,
    swapTo: 4,
    state: { pass: 'Stage 1: Reverse ALL [0..6]', L: 2, R: 4, action: 'Swapping arr[2]=3 ↔ arr[4]=5' },
    desc: 'Stage 1 (Reverse All): Left=2 (val 3) and Right=4 (val 5). About to swap arr[2] and arr[4].',
  },
  {
    activeLine: 1,
    array: [7, 6, 5, 4, 3, 2, 1],
    left: 3,
    right: 3,
    state: { pass: 'Stage 1 COMPLETE', array: '[7, 6, 5, 4, 3, 2, 1]', status: 'Stage 1 Done (All Inverted)' },
    desc: 'Pointers meet at index 3. Stage 1 Complete! Array is [7, 6, 5, 4, 3, 2, 1]. Now reverse first K=3 elements [0..2].',
  },
  {
    activeLine: 2,
    array: [7, 6, 5, 4, 3, 2, 1],
    left: 0,
    right: 2,
    swapFrom: 0,
    swapTo: 2,
    state: { pass: 'Stage 2: Reverse first K=3 [0..2]', L: 0, R: 2, action: 'Swapping arr[0]=7 ↔ arr[2]=5' },
    desc: 'Stage 2 (Reverse first K=3): Left=0 (val 7) and Right=2 (val 5). About to swap arr[0] and arr[2].',
  },
  {
    activeLine: 2,
    array: [5, 6, 7, 4, 3, 2, 1],
    left: 1,
    right: 1,
    state: { pass: 'Stage 2 COMPLETE', rotatedPrefix: '[5, 6, 7]', array: '[5, 6, 7, 4, 3, 2, 1]' },
    desc: 'Swap complete! First 3 elements [0..2] reversed to [5, 6, 7]. Rotated prefix is now in correct order! Now reverse remaining elements [3..6].',
  },
  {
    activeLine: 3,
    array: [5, 6, 7, 4, 3, 2, 1],
    left: 3,
    right: 6,
    swapFrom: 3,
    swapTo: 6,
    state: { pass: 'Stage 3: Reverse remaining [3..6]', L: 3, R: 6, action: 'Swapping arr[3]=4 ↔ arr[6]=1' },
    desc: 'Stage 3 (Reverse remaining elements [3..6]): Left=3 (val 4) and Right=6 (val 1). About to swap arr[3] and arr[6].',
  },
  {
    activeLine: 3,
    array: [5, 6, 7, 1, 3, 2, 4],
    left: 3,
    right: 6,
    state: { pass: 'Stage 3: Reverse remaining [3..6]', L: 3, R: 6, swap: 'arr[3] ↔ arr[6] ✅', array: '[5, 6, 7, 1, 3, 2, 4]' },
    desc: 'Swap complete! Array becomes [5, 6, 7, 1, 3, 2, 4]. Advance L++ to 4, decrement R-- to 5.',
  },
  {
    activeLine: 3,
    array: [5, 6, 7, 1, 3, 2, 4],
    left: 4,
    right: 5,
    swapFrom: 4,
    swapTo: 5,
    state: { pass: 'Stage 3: Reverse remaining [3..6]', L: 4, R: 5, action: 'Swapping arr[4]=3 ↔ arr[5]=2' },
    desc: 'Stage 3 (Reverse remaining elements [3..6]): Left=4 (val 3) and Right=5 (val 2). About to swap arr[4] and arr[5].',
  },
  {
    activeLine: 3,
    array: [5, 6, 7, 1, 2, 3, 4],
    left: 4,
    right: 5,
    state: { pass: 'Stage 3 COMPLETE', suffixRestored: '[1, 2, 3, 4]', array: '[5, 6, 7, 1, 2, 3, 4]' },
    desc: 'Swap complete! Suffix [3..6] reversed to [1, 2, 3, 4]. Array is now [5, 6, 7, 1, 2, 3, 4].',
  },
  {
    activeLine: 3,
    array: [5, 6, 7, 1, 2, 3, 4],
    left: null,
    right: null,
    isMatch: true,
    state: { status: 'ROTATION COMPLETE 🎉', finalArray: '[5, 6, 7, 1, 2, 3, 4]' },
    desc: 'Rotate Array by K=3 complete in O(n) time and O(1) space! Final array: [5, 6, 7, 1, 2, 3, 4]. 🎉',
  },
];

// ─── 11. MAJORITY ELEMENT (Boyer-Moore Voting) ───────────────────────────────
export const MAJORITY_ELEMENT_STEPS = [
  {
    activeLine: 1,
    index: 0,
    array: [3, 2, 3, 1, 3, 2, 3],
    state: { keyInsight: 'Majority element (appears > n/2 times) survives vote cancellation. Each mismatch cancels one pair.', candidate: 3, count: 1, i: 0 },
    desc: '💡 Key insight: Every mismatched pair cancels out. The element that survives is the majority (> n/2 occurrences). Init candidate=arr[0]=3, count=1.',
  },
  {
    activeLine: 2,
    index: 1,
    array: [3, 2, 3, 1, 3, 2, 3],
    state: { i: 1, 'arr[1]': 2, candidate: 3, count: 0, decision: '2 ≠ 3 → count--' },
    desc: 'Step 2: arr[1]=2 ≠ candidate(3). Decrement count: count = 0. Pair (3,2) cancels out.',
  },
  {
    activeLine: 2,
    index: 2,
    array: [3, 2, 3, 1, 3, 2, 3],
    state: { i: 2, 'arr[2]': 3, candidate: 3, count: 1, decision: 'count=0 → new candidate' },
    desc: 'Step 3: count was 0. Set candidate = arr[2] = 3, count = 1. New candidate!',
  },
  {
    activeLine: 2,
    index: 3,
    array: [3, 2, 3, 1, 3, 2, 3],
    state: { i: 3, 'arr[3]': 1, candidate: 3, count: 0, decision: '1 ≠ 3 → count--' },
    desc: 'Step 4: arr[3]=1 ≠ candidate(3). count-- → count=0. Pair (3,1) cancels.',
  },
  {
    activeLine: 2,
    index: 4,
    array: [3, 2, 3, 1, 3, 2, 3],
    state: { i: 4, 'arr[4]': 3, candidate: 3, count: 1, decision: 'count=0 → new candidate' },
    desc: 'Step 5: count was 0. Set candidate = arr[4] = 3, count = 1.',
  },
  {
    activeLine: 2,
    index: 5,
    array: [3, 2, 3, 1, 3, 2, 3],
    state: { i: 5, 'arr[5]': 2, candidate: 3, count: 0, decision: '2 ≠ 3 → count--' },
    desc: 'Step 6: arr[5]=2 ≠ candidate(3). count-- → count=0. Pair cancels.',
  },
  {
    activeLine: 3,
    index: 6,
    isMatch: true,
    array: [3, 2, 3, 1, 3, 2, 3],
    state: { i: 6, 'arr[6]': 3, candidate: 3, count: 1, status: 'FOUND 🎉' },
    desc: 'Step 7: count=0, set candidate=arr[6]=3, count=1. Scan complete. Majority element = 3 (appears 4/7 times > n/2). 🎉',
  },
];

// ─── 12. MERGE INTERVALS ─────────────────────────────────────────────────────
export const MERGE_INTERVALS_STEPS = [
  {
    activeLine: 1,
    index: 0,
    array: [1, 3, 2, 6, 8, 10, 15, 18],
    state: { keyInsight: 'Sort by start time. Extend current interval if next start ≤ current end. Otherwise push and start new interval.', step: 'Sort intervals', sorted: '[[1,3],[2,6],[8,10],[15,18]]' },
    desc: '💡 Key insight: After sorting by start time, two intervals overlap when next.start ≤ current.end. Extend the current end to max(current.end, next.end).',
  },
  {
    activeLine: 2,
    index: 0,
    array: [1, 3, 2, 6, 8, 10, 15, 18],
    state: { current: '[1,3]', next: '[2,6]', '2 ≤ 3?': 'YES → merge', merged: '[1,6]' },
    desc: 'Step 2: Check [1,3] vs [2,6]. next.start(2) ≤ current.end(3) → OVERLAP! Extend end: max(3,6)=6. Merged: [1,6].',
  },
  {
    activeLine: 2,
    index: 2,
    array: [1, 3, 2, 6, 8, 10, 15, 18],
    state: { current: '[1,6]', next: '[8,10]', '8 ≤ 6?': 'NO → push & move', result: '[[1,6]]' },
    desc: 'Step 3: Check [1,6] vs [8,10]. next.start(8) > current.end(6) → NO OVERLAP. Push [1,6] to result. New current = [8,10].',
  },
  {
    activeLine: 2,
    index: 4,
    array: [1, 3, 2, 6, 8, 10, 15, 18],
    state: { current: '[8,10]', next: '[15,18]', '15 ≤ 10?': 'NO → push & move', result: '[[1,6],[8,10]]' },
    desc: 'Step 4: Check [8,10] vs [15,18]. next.start(15) > current.end(10) → NO OVERLAP. Push [8,10]. New current = [15,18].',
  },
  {
    activeLine: 3,
    index: 6,
    isMatch: true,
    array: [1, 3, 2, 6, 8, 10, 15, 18],
    state: { result: '[[1,6],[8,10],[15,18]]', count: 3, status: 'DONE 🎉' },
    desc: 'Step 5: Push last interval [15,18]. Final merged intervals: [[1,6], [8,10], [15,18]]. 3 intervals from 4 inputs! 🎉',
  },
];

// ─── 13. FIND MISSING NUMBER ─────────────────────────────────────────────────
export const FIND_MISSING_STEPS = [
  {
    activeLine: 1,
    index: 0,
    array: [3, 0, 1],
    state: { keyInsight: 'XOR of 0..n with all elements cancels paired numbers. Only the missing number survives!', n: 3, xor: 0, step: 'Init' },
    desc: '💡 Key insight: XOR(0..n) XOR all arr[i] = missing number. Paired values cancel to 0. Array [3,0,1] is missing 2 (n=3).',
  },
  {
    activeLine: 2,
    index: 0,
    array: [3, 0, 1],
    state: { i: 0, xor: '0 XOR 0 XOR 3 = 3', 'index XOR': '0^0=0', 'arr[0] XOR': '0^3=3', running: 3 },
    desc: 'Step 2: XOR index 0 and arr[0]=3 into result. xor = 0^0^3 = 3.',
  },
  {
    activeLine: 2,
    index: 1,
    array: [3, 0, 1],
    state: { i: 1, 'xor before': 3, 'XOR with': '1 and 0', running: '3^1^0 = 2' },
    desc: 'Step 3: XOR index 1 and arr[1]=0. xor = 3^1^0 = 2.',
  },
  {
    activeLine: 2,
    index: 2,
    array: [3, 0, 1],
    state: { i: 2, 'xor before': 2, 'XOR with': '2 and 1', running: '2^2^1 = 1' },
    desc: 'Step 4: XOR index 2 and arr[2]=1. xor = 2^2^1 = 1.',
  },
  {
    activeLine: 3,
    index: 2,
    array: [3, 0, 1],
    state: { i: 3, 'XOR with n=3': '1^3 = 2', result: 2 },
    desc: 'Step 5: XOR with n=3. xor = 1^3 = 2.',
  },
  {
    activeLine: 4,
    isMatch: true,
    array: [3, 0, 1],
    state: { missingNumber: 2, status: 'FOUND 🎉', complexity: 'O(n) time, O(1) space' },
    desc: 'Step 6: All paired numbers cancelled out. Missing number = 2 ✅. XOR trick gives O(n) time and O(1) space — no sorting needed! 🎉',
  },
];

const TRACK_ARRAYS = {
  access: [10, 25, 42, 58, 73, 89],
  insertion: [10, 20, 30, 40, null],
  insert: [10, 20, 30, 40, null],
  deletion: [10, 20, 99, 30, 40],
  delete: [10, 20, 99, 30, 40],
  'prefix-sum': [2, 4, 1, 3, 5],
  'reverse-array': [1, 2, 3, 4, 5],
  reverse: [1, 2, 3, 4, 5],
  'linear-search': [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
  search: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
  'kadane': [-2, 1, -3, 4, -1, 2, 1, -5, 4],
  'buy-sell-stock': [7, 1, 5, 3, 6, 4],
  'product-except-self': [1, 2, 3, 4],
  'rotate-array': [1, 2, 3, 4, 5, 6, 7],
  'majority-element': [3, 2, 3, 1, 3, 2, 3],
  'merge-intervals': [1, 3, 2, 6, 8, 10, 15, 18],
  'find-missing': [3, 0, 1],
};

export const useArrayStore = create((set, get) => ({
  track: 'access',
  array: TRACK_ARRAYS['access'],
  steps: ACCESS_STEPS,
  currentStep: 0,
  isPlaying: false,
  speed: 1,
  practiceMode: false,
  userCode: `// Array Operations Template\nfunction insertAt(arr, index, val) {\n  for (let i = arr.length - 1; i > index; i--) {\n    arr[i] = arr[i - 1];\n  }\n  arr[index] = val;\n  return arr;\n}`,

  setTrack: (trackKey) => {
    let steps = ACCESS_STEPS;
    let array = TRACK_ARRAYS['access'];

    if (trackKey === 'insertion' || trackKey === 'insert') {
      steps = INSERT_STEPS;
      array = TRACK_ARRAYS['insertion'];
    } else if (trackKey === 'deletion' || trackKey === 'delete') {
      steps = DELETE_STEPS;
      array = TRACK_ARRAYS['deletion'];
    } else if (trackKey === 'linear-search' || trackKey === 'search') {
      steps = SEARCH_STEPS;
      array = TRACK_ARRAYS['linear-search'];
    } else if (trackKey === 'prefix-sum') {
      steps = PREFIX_SUM_STEPS;
      array = TRACK_ARRAYS['prefix-sum'];
    } else if (trackKey === 'reverse-array' || trackKey === 'reverse') {
      steps = REVERSE_ARRAY_STEPS;
      array = TRACK_ARRAYS['reverse-array'];
    } else if (trackKey === 'kadane') {
      steps = KADANE_STEPS;
      array = TRACK_ARRAYS['kadane'];
    } else if (trackKey === 'buy-sell-stock') {
      steps = BUY_SELL_STEPS;
      array = TRACK_ARRAYS['buy-sell-stock'];
    } else if (trackKey === 'product-except-self') {
      steps = PRODUCT_EXCEPT_SELF_STEPS;
      array = TRACK_ARRAYS['product-except-self'];
    } else if (trackKey === 'rotate-array') {
      steps = ROTATE_ARRAY_STEPS;
      array = TRACK_ARRAYS['rotate-array'];
    } else if (trackKey === 'majority-element') {
      steps = MAJORITY_ELEMENT_STEPS;
      array = TRACK_ARRAYS['majority-element'];
    } else if (trackKey === 'merge-intervals') {
      steps = MERGE_INTERVALS_STEPS;
      array = TRACK_ARRAYS['merge-intervals'];
    } else if (trackKey === 'find-missing') {
      steps = FIND_MISSING_STEPS;
      array = TRACK_ARRAYS['find-missing'];
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

  restart: () => set({ currentStep: 0, isPlaying: false }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setSpeed: (s) => set({ speed: s }),
  togglePracticeMode: () => set((state) => ({ practiceMode: !state.practiceMode })),
  setUserCode: (code) => set({ userCode: code }),
}));
