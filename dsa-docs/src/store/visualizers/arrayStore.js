import { create } from 'zustand';

// 1. ARRAY ACCESS STEPS (Exhaustive 8-Step Trace)
const ACCESS_STEPS = [
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
const INSERT_STEPS = [
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
const DELETE_STEPS = [
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
const SEARCH_STEPS = [
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
    array: [5, 2, 3, 4, 1],
    state: { L: 0, R: 4, swap: 'arr[0] ↔ arr[4]', newArr: '[5, 2, 3, 4, 1]' },
    desc: 'Step 3: Swap arr[0] (1) and arr[4] (5). Array becomes [5, 2, 3, 4, 1].',
  },
  {
    activeLine: 4,
    left: 1,
    right: 3,
    array: [5, 2, 3, 4, 1],
    state: { L: 1, R: 3, pointerStep: 'Advance L++, R--' },
    desc: 'Step 4: Advance pointers: Increment L to 1, decrement R to 3.',
  },
  {
    activeLine: 2,
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
    array: [5, 4, 3, 2, 1],
    state: { L: 1, R: 3, swap: 'arr[1] ↔ arr[3]', newArr: '[5, 4, 3, 2, 1]' },
    desc: 'Step 6: Swap arr[1] (2) and arr[3] (4). Array becomes [5, 4, 3, 2, 1].',
  },
  {
    activeLine: 4,
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
