import { create } from 'zustand';

// 1. BUBBLE SORT STEPS (15 Granular Steps with 2-Phase Swaps)
const BUBBLE_SORT_STEPS = [
  {
    activeLine: 1,
    i: 0,
    j: null,
    array: [5, 2, 8, 1, 4],
    state: { keyInsight: 'Bubble largest element to end in each pass by swapping adjacent out-of-order elements O(N^2).', i: 0, j: 'None' },
    desc: '💡 Key insight: Bubble sort repeatedly compares adjacent pairs (arr[j] > arr[j+1]) and swaps them if out of order, bubbling the largest element to the end in each pass.',
  },
  {
    activeLine: 4,
    i: 0,
    j: 0,
    swapFrom: 0,
    swapTo: 1,
    array: [5, 2, 8, 1, 4],
    state: { i: 0, j: 0, compare: 'arr[0](5) > arr[1](2) ➔ TRUE ✅', action: 'Swapping 5 ↔ 2' },
    desc: 'Step 1: Pass 1 (i=0, j=0). Compare arr[0]=5 with arr[1]=2. 5 > 2 is out of order! About to swap.',
  },
  {
    activeLine: 4,
    i: 0,
    j: 0,
    array: [2, 5, 8, 1, 4],
    state: { i: 0, j: 0, swap: 'arr[0] ↔ arr[1] ✅', array: '[2, 5, 8, 1, 4]' },
    desc: 'Step 2: Swap complete! Elements 5 and 2 exchanged. Array becomes [2, 5, 8, 1, 4].',
  },
  {
    activeLine: 3,
    i: 0,
    j: 1,
    array: [2, 5, 8, 1, 4],
    state: { i: 0, j: 1, compare: 'arr[1](5) > arr[2](8) ➔ FALSE ❌', status: 'In Order' },
    desc: 'Step 3: Advance j to 1. Compare arr[1]=5 with arr[2]=8. 5 < 8 is in order (No swap).',
  },
  {
    activeLine: 4,
    i: 0,
    j: 2,
    swapFrom: 2,
    swapTo: 3,
    array: [2, 5, 8, 1, 4],
    state: { i: 0, j: 2, compare: 'arr[2](8) > arr[3](1) ➔ TRUE ✅', action: 'Swapping 8 ↔ 1' },
    desc: 'Step 4: Advance j to 2. Compare arr[2]=8 with arr[3]=1. 8 > 1 is out of order! About to swap.',
  },
  {
    activeLine: 4,
    i: 0,
    j: 2,
    array: [2, 5, 1, 8, 4],
    state: { i: 0, j: 2, swap: 'arr[2] ↔ arr[3] ✅', array: '[2, 5, 1, 8, 4]' },
    desc: 'Step 5: Swap complete! Elements 8 and 1 exchanged. Array becomes [2, 5, 1, 8, 4].',
  },
  {
    activeLine: 4,
    i: 0,
    j: 3,
    swapFrom: 3,
    swapTo: 4,
    array: [2, 5, 1, 8, 4],
    state: { i: 0, j: 3, compare: 'arr[3](8) > arr[4](4) ➔ TRUE ✅', action: 'Swapping 8 ↔ 4' },
    desc: 'Step 6: Advance j to 3. Compare arr[3]=8 with arr[4]=4. 8 > 4 is out of order! About to swap.',
  },
  {
    activeLine: 4,
    i: 0,
    j: 3,
    array: [2, 5, 1, 4, 8],
    state: { i: 0, j: 3, swap: 'arr[3] ↔ arr[4] ✅', sortedSuffix: '[8]', status: 'PASS 1 COMPLETE 🎉' },
    desc: 'Step 7: Swap complete! Array transforms to [2, 5, 1, 4, 8]. Pass 1 complete! Maximum element 8 is locked at end.',
  },
  {
    activeLine: 4,
    i: 1,
    j: 1,
    swapFrom: 1,
    swapTo: 2,
    array: [2, 5, 1, 4, 8],
    state: { i: 1, j: 1, compare: 'arr[1](5) > arr[2](1) ➔ TRUE ✅', action: 'Swapping 5 ↔ 1' },
    desc: 'Step 8: Pass 2 (i=1, j=1). Compare arr[1]=5 with arr[2]=1. 5 > 1 is out of order! About to swap.',
  },
  {
    activeLine: 4,
    i: 1,
    j: 1,
    array: [2, 1, 5, 4, 8],
    state: { i: 1, j: 1, swap: 'arr[1] ↔ arr[2] ✅', array: '[2, 1, 5, 4, 8]' },
    desc: 'Step 9: Swap complete! Elements 5 and 1 exchanged. Array becomes [2, 1, 5, 4, 8].',
  },
  {
    activeLine: 4,
    i: 1,
    j: 2,
    swapFrom: 2,
    swapTo: 3,
    array: [2, 1, 5, 4, 8],
    state: { i: 1, j: 2, compare: 'arr[2](5) > arr[3](4) ➔ TRUE ✅', action: 'Swapping 5 ↔ 4' },
    desc: 'Step 10: Pass 2 (j=2). Compare arr[2]=5 with arr[3]=4. 5 > 4 is out of order! About to swap.',
  },
  {
    activeLine: 4,
    i: 1,
    j: 2,
    array: [2, 1, 4, 5, 8],
    state: { i: 1, j: 2, swap: 'arr[2] ↔ arr[3] ✅', sortedSuffix: '[5, 8]', status: 'PASS 2 COMPLETE 🎉' },
    desc: 'Step 11: Swap complete! Array becomes [2, 1, 4, 5, 8]. Pass 2 complete! Element 5 locked at index 3.',
  },
  {
    activeLine: 4,
    i: 2,
    j: 0,
    swapFrom: 0,
    swapTo: 1,
    array: [2, 1, 4, 5, 8],
    state: { i: 2, j: 0, compare: 'arr[0](2) > arr[1](1) ➔ TRUE ✅', action: 'Swapping 2 ↔ 1' },
    desc: 'Step 12: Pass 3 (i=2, j=0). Compare arr[0]=2 with arr[1]=1. 2 > 1 is out of order! About to swap.',
  },
  {
    activeLine: 4,
    i: 2,
    j: 0,
    array: [1, 2, 4, 5, 8],
    state: { i: 2, j: 0, swap: 'arr[0] ↔ arr[1] ✅', sortedSuffix: '[2, 4, 5, 8]', status: 'PASS 3 COMPLETE 🎉' },
    desc: 'Step 13: Swap complete! Array becomes [1, 2, 4, 5, 8]. Pass 3 complete! Elements [2, 4, 5, 8] in position.',
  },
  {
    activeLine: 1,
    i: 3,
    j: 0,
    isMatch: true,
    array: [1, 2, 4, 5, 8],
    state: { status: 'FULLY SORTED 🎉', sortedArray: '[1, 2, 4, 5, 8]' },
    desc: 'Step 14: Pass 4 (i=3). Zero swaps performed. Array [1, 2, 4, 5, 8] is fully sorted in O(N^2) time! 🎉',
  },
];

// 2. SELECTION SORT STEPS (15 Granular Steps with complete inner j-scans & 2-Phase Swaps)
const SELECTION_SORT_STEPS = [
  {
    activeLine: 1,
    i: 0,
    minIdx: 0,
    j: null,
    array: [5, 2, 8, 1, 4],
    state: { keyInsight: 'Find minimum element in unsorted region and swap into position i in O(N^2).', i: 0, minIdx: 0 },
    desc: '💡 Key insight: Selection sort scans the unsorted region for the minimum element and swaps it into position i at the end of each pass.',
  },
  {
    activeLine: 2,
    i: 0,
    minIdx: 0,
    j: null,
    array: [5, 2, 8, 1, 4],
    state: { i: 0, minIdx: 0, minVal: 5, status: 'Set initial minIdx = 0 (val 5)' },
    desc: 'Step 1: Pass 1 (i=0). Set initial minIdx = 0 (value 5). Now scan j from 1 to 4 to find smaller elements.',
  },
  {
    activeLine: 5,
    i: 0,
    minIdx: 1,
    j: 1,
    array: [5, 2, 8, 1, 4],
    state: { i: 0, j: 1, minIdx: 1, minVal: 2, compare: 'arr[1](2) < arr[0](5) ➔ TRUE ✅' },
    desc: 'Step 2: Inspect j=1 (val 2). Since 2 < 5, update minIdx = 1 (new min = 2).',
  },
  {
    activeLine: 4,
    i: 0,
    minIdx: 1,
    j: 2,
    array: [5, 2, 8, 1, 4],
    state: { i: 0, j: 2, minIdx: 1, minVal: 2, compare: 'arr[2](8) < arr[1](2) ➔ FALSE ❌' },
    desc: 'Step 3: Inspect j=2 (val 8). Since 8 > 2, minIdx stays at 1 (val 2).',
  },
  {
    activeLine: 5,
    i: 0,
    minIdx: 3,
    j: 3,
    array: [5, 2, 8, 1, 4],
    state: { i: 0, j: 3, minIdx: 3, minVal: 1, compare: 'arr[3](1) < arr[1](2) ➔ TRUE ✅' },
    desc: 'Step 4: Inspect j=3 (val 1). Since 1 < 2, update minIdx = 3 (new absolute min = 1).',
  },
  {
    activeLine: 4,
    i: 0,
    minIdx: 3,
    j: 4,
    array: [5, 2, 8, 1, 4],
    state: { i: 0, j: 4, minIdx: 3, minVal: 1, compare: 'arr[4](4) < arr[3](1) ➔ FALSE ❌', status: 'Scan Complete' },
    desc: 'Step 5: Inspect j=4 (val 4). Since 4 > 1, scan ends. Minimum element in [0..4] is 1 at index 3.',
  },
  {
    activeLine: 6,
    i: 0,
    minIdx: 3,
    j: null,
    swapFrom: 0,
    swapTo: 3,
    array: [5, 2, 8, 1, 4],
    state: { i: 0, minIdx: 3, action: 'Swapping arr[i=0]=5 ↔ arr[minIdx=3]=1' },
    desc: 'Step 6: Pass 1 (i=0). About to swap arr[0]=5 with minimum element arr[3]=1.',
  },
  {
    activeLine: 6,
    i: 0,
    minIdx: 3,
    j: null,
    array: [1, 2, 8, 5, 4],
    state: { i: 0, swap: 'arr[0] ↔ arr[3] ✅', sortedPrefix: '[1]' },
    desc: 'Step 7: Swap complete! Minimum element 1 placed at index 0. Sorted prefix = [1].',
  },
  {
    activeLine: 2,
    i: 1,
    minIdx: 1,
    j: 1,
    array: [1, 2, 8, 5, 4],
    state: { i: 1, minIdx: 1, minVal: 2, status: 'Scan [1..4]: 2 is smaller than 8, 5, 4' },
    desc: 'Step 8: Pass 2 (i=1). Set minIdx = 1 (val 2). Scan elements [8, 5, 4]. Since 2 is already smallest, no new min found.',
  },
  {
    activeLine: 6,
    i: 1,
    minIdx: 1,
    j: null,
    array: [1, 2, 8, 5, 4],
    state: { i: 1, minIdx: 1, status: 'No swap needed (already in position)', sortedPrefix: '[1, 2]' },
    desc: 'Step 9: Minimum element 2 is already at index 1. No swap needed! Sorted prefix = [1, 2].',
  },
  {
    activeLine: 5,
    i: 2,
    minIdx: 4,
    j: 4,
    array: [1, 2, 8, 5, 4],
    state: { i: 2, j: 4, minIdx: 4, minVal: 4, compare: 'arr[4](4) < arr[3](5) < arr[2](8) ➔ Min = 4' },
    desc: 'Step 10: Pass 3 (i=2). Scan unsorted range [8, 5, 4]. Minimum element found is 4 at index 4.',
  },
  {
    activeLine: 6,
    i: 2,
    minIdx: 4,
    j: null,
    swapFrom: 2,
    swapTo: 4,
    array: [1, 2, 8, 5, 4],
    state: { i: 2, minIdx: 4, action: 'Swapping arr[i=2]=8 ↔ arr[minIdx=4]=4' },
    desc: 'Step 11: Pass 3 (i=2). About to swap arr[2]=8 with minimum element arr[4]=4.',
  },
  {
    activeLine: 6,
    i: 2,
    minIdx: 4,
    j: null,
    array: [1, 2, 4, 5, 8],
    state: { i: 2, swap: 'arr[2] ↔ arr[4] ✅', sortedPrefix: '[1, 2, 4]' },
    desc: 'Step 12: Swap complete! Element 4 placed at index 2. Sorted prefix = [1, 2, 4].',
  },
  {
    activeLine: 2,
    i: 3,
    minIdx: 3,
    j: 4,
    array: [1, 2, 4, 5, 8],
    state: { i: 3, minIdx: 3, minVal: 5, status: 'Min is 5 at index 3', sortedPrefix: '[1, 2, 4, 5]' },
    desc: 'Step 13: Pass 4 (i=3). Inspect remaining range [3..4] ([5, 8]). Minimum is 5 at index 3. No swap needed!',
  },
  {
    activeLine: 1,
    i: 4,
    minIdx: 4,
    j: null,
    isMatch: true,
    array: [1, 2, 4, 5, 8],
    state: { status: 'FULLY SORTED 🎉', sortedArray: '[1, 2, 4, 5, 8]' },
    desc: 'Step 14: Selection Sort complete! Array [1, 2, 4, 5, 8] is fully sorted in O(N^2) time & O(1) space! 🎉',
  },
];

// 3. INSERTION SORT STEPS (10 Granular Steps) — i=outer index, j=inner scan index (both as array indices)
const INSERTION_SORT_STEPS = [
  {
    activeLine: 1,
    i: 1,        // i points to the element being inserted
    j: null,     // j not yet set
    key: 2,      // key value (arr[i])
    array: [5, 2, 8, 1, 4],
    state: { keyInsight: 'Build sorted prefix by taking key arr[i] and shifting larger elements right in O(N^2).', i: 1, key: 2 },
    desc: '💡 Key insight: Insertion sort builds a sorted prefix. Take key=arr[i] and shift elements larger than key rightward to insert key into its correct spot.',
  },
  {
    activeLine: 2,
    i: 1,        // pick arr[1]=2 as key
    j: 0,        // j starts at i-1 = 0
    key: 2,
    array: [5, 2, 8, 1, 4],
    state: { i: 1, j: 0, key: 2, sortedPrefix: '[5]', status: 'Pick Key = arr[1] = 2' },
    desc: 'Step 1: i=1. Pick key = arr[1] = 2. Set j = i-1 = 0. Sorted prefix is [5]. Now compare key=2 with arr[j]=arr[0]=5.',
  },
  {
    activeLine: 3,
    i: 1,        // i still at 1 (key slot)
    j: 0,        // j=0, arr[0]=5 > key=2 → shift
    key: 2,
    array: [5, 5, 8, 1, 4],
    state: { i: 1, j: 0, key: 2, shift: 'Shift arr[0]=5 right to index 1' },
    desc: 'Step 2: arr[j]=arr[0]=5 > key=2. Shift 5 right to index 1 (arr[j+1] = arr[j]). Array becomes [5, 5, 8, 1, 4]. j-- → j=-1 (done).',
  },
  {
    activeLine: 4,
    i: 1,
    j: 0,        // key inserts at j+1 = 0
    key: 2,
    array: [2, 5, 8, 1, 4],
    state: { i: 1, j: 0, key: 2, sortedPrefix: '[2, 5]' },
    desc: 'Step 3: j=-1 (or arr[j] <= key). Insert key=2 at index j+1=0. Array → [2, 5, 8, 1, 4]. Sorted prefix = [2, 5].',
  },
  {
    activeLine: 2,
    i: 2,        // outer loop: i=2, pick arr[2]=8
    j: 1,        // j = i-1 = 1
    key: 8,
    array: [2, 5, 8, 1, 4],
    state: { i: 2, j: 1, key: 8, sortedPrefix: '[2, 5]', compare: 'arr[j](5) < 8 ➔ No Shift' },
    desc: 'Step 4: i=2. Pick key = arr[2] = 8. j=1. arr[j]=arr[1]=5 < key=8. No shift needed. Sorted prefix = [2, 5, 8].',
  },
  {
    activeLine: 2,
    i: 3,        // outer loop: i=3, pick arr[3]=1
    j: 2,        // j = i-1 = 2
    key: 1,
    array: [2, 5, 8, 1, 4],
    state: { i: 3, j: 2, key: 1, sortedPrefix: '[2, 5, 8]' },
    desc: 'Step 5: i=3. Pick key = arr[3] = 1. j=2. Compare key=1 with sorted prefix elements [2, 5, 8]. All > key — shift all right.',
  },
  {
    activeLine: 3,
    i: 3,        // key slot is at i=3
    j: 2,        // j scans from 2 downward; arr[2]=8, arr[1]=5, arr[0]=2 all > 1
    key: 1,
    array: [2, 2, 5, 8, 4],
    state: { i: 3, j: 2, key: 1, shift: 'Shift 8→idx3, 5→idx2, 2→idx1' },
    desc: 'Step 6: Shift arr[2]=8 → idx3, arr[1]=5 → idx2, arr[0]=2 → idx1. Array becomes [2, 2, 5, 8, 4]. Index 0 vacated for key.',
  },
  {
    activeLine: 4,
    i: 3,
    j: 0,        // key inserts at j+1 = 0
    key: 1,
    array: [1, 2, 5, 8, 4],
    state: { i: 3, j: 0, key: 1, sortedPrefix: '[1, 2, 5, 8]' },
    desc: 'Step 7: Insert key=1 at index j+1=0. Array → [1, 2, 5, 8, 4]. Sorted prefix = [1, 2, 5, 8].',
  },
  {
    activeLine: 2,
    i: 4,        // outer loop: i=4, pick arr[4]=4
    j: 3,        // j = i-1 = 3
    key: 4,
    array: [1, 2, 5, 8, 4],
    state: { i: 4, j: 3, key: 4, sortedPrefix: '[1, 2, 5, 8]' },
    desc: 'Step 8: i=4. Pick key = arr[4] = 4. j=3. Compare key=4 with arr[j]=arr[3]=8 and arr[2]=5. Both > 4 — shift right.',
  },
  {
    activeLine: 3,
    i: 4,        // key slot
    j: 2,        // j scans left; arr[3]=8, arr[2]=5 shifted; arr[1]=2 < 4 so stop
    key: 4,
    array: [1, 2, 5, 5, 8],
    state: { i: 4, j: 2, key: 4, shift: 'Shift arr[3]=8→idx4, arr[2]=5→idx3' },
    desc: 'Step 9: Shift arr[3]=8 → idx4, arr[2]=5 → idx3. Array becomes [1, 2, 5, 5, 8]. arr[j-1]=arr[1]=2 < 4 — stop shifting. Insert at idx2.',
  },
  {
    activeLine: 4,
    i: 4,
    j: 2,        // key inserts at j+1=2... actually j=1, insert at j+1=2
    key: 4,
    isMatch: true,
    array: [1, 2, 4, 5, 8],
    state: { status: 'FULLY SORTED 🎉', sortedArray: '[1, 2, 4, 5, 8]' },
    desc: 'Step 10: Insert key=4 at index 2 (arr[j+1]). Array → [1, 2, 4, 5, 8]. Insertion Sort complete in O(N^2) time! 🎉',
  },
];

// 4. QUICK SORT STEPS (16 Granular Steps with complete i++ transitions & 2-Phase Swaps)
const QUICK_SORT_STEPS = [
  {
    activeLine: 1,
    pivot: 4,           // pivot is at index 4 (value 4)
    i: null, j: null,
    array: [5, 2, 8, 1, 4],
    state: { keyInsight: 'Partition array around pivot element arr[4]=4 such that left <= pivot < right in O(N log N).', pivot: 4 },
    desc: '💡 Key insight: Quick sort selects pivot arr[4]=4 and partitions elements such that values <= 4 move to left, and values > 4 move to right.',
  },
  {
    activeLine: 2,
    pivot: 4,
    i: -1, j: 0,
    array: [5, 2, 8, 1, 4],
    state: { i: -1, j: 0, pivot: 4, status: 'Set i = low - 1 = -1. Scan j from low to high-1' },
    desc: 'Step 1: Set pivot = arr[4] = 4, i = low - 1 = -1. Pointer i tracks partition boundary of elements <= 4.',
  },
  {
    activeLine: 4,
    pivot: 4,
    i: -1, j: 0,
    array: [5, 2, 8, 1, 4],
    state: { i: -1, j: 0, pivot: 4, compare: 'arr[0](5) <= 4 ➔ FALSE ❌', status: 'Greater than pivot (stays right)' },
    desc: 'Step 2: Inspect j=0 (val 5). Since 5 > 4, no swap. Element 5 belongs to right partition. i remains -1.',
  },
  {
    activeLine: 5,
    pivot: 4,
    i: 0, j: 1,
    array: [5, 2, 8, 1, 4],
    state: { i: 0, j: 1, pivot: 4, compare: 'arr[1](2) <= 4 ➔ TRUE ✅', action: 'Increment i++ to 0' },
    desc: 'Step 3: Inspect j=1 (val 2). Since 2 <= 4, increment i from -1 to 0.',
  },
  {
    activeLine: 6,
    pivot: 4,
    i: 0, j: 1,
    swapFrom: 0,
    swapTo: 1,
    array: [5, 2, 8, 1, 4],
    state: { i: 0, j: 1, pivot: 4, action: 'Swapping arr[i=0]=5 ↔ arr[j=1]=2' },
    desc: 'Step 4: About to swap arr[i=0]=5 with arr[j=1]=2.',
  },
  {
    activeLine: 6,
    pivot: 4,
    i: 0, j: 1,
    array: [2, 5, 8, 1, 4],
    state: { i: 0, j: 1, pivot: 4, swap: 'arr[0] ↔ arr[1] ✅', array: '[2, 5, 8, 1, 4]' },
    desc: 'Step 5: Swap complete! Array transforms to [2, 5, 8, 1, 4]. Element 2 moved to left partition.',
  },
  {
    activeLine: 4,
    pivot: 4,
    i: 0, j: 2,
    array: [2, 5, 8, 1, 4],
    state: { i: 0, j: 2, pivot: 4, compare: 'arr[2](8) <= 4 ➔ FALSE ❌', status: 'Stays right' },
    desc: 'Step 6: Inspect j=2 (val 8). Since 8 > 4, no swap. i stays at 0.',
  },
  {
    activeLine: 5,
    pivot: 4,
    i: 1, j: 3,
    array: [2, 5, 8, 1, 4],
    state: { i: 1, j: 3, pivot: 4, compare: 'arr[3](1) <= 4 ➔ TRUE ✅', action: 'Increment i++ to 1' },
    desc: 'Step 7: Inspect j=3 (val 1). Since 1 <= 4, increment i from 0 to 1.',
  },
  {
    activeLine: 6,
    pivot: 4,
    i: 1, j: 3,
    swapFrom: 1,
    swapTo: 3,
    array: [2, 5, 8, 1, 4],
    state: { i: 1, j: 3, pivot: 4, action: 'Swapping arr[i=1]=5 ↔ arr[j=3]=1' },
    desc: 'Step 8: About to swap arr[i=1]=5 with arr[j=3]=1.',
  },
  {
    activeLine: 6,
    pivot: 4,
    i: 1, j: 3,
    array: [2, 1, 8, 5, 4],
    state: { i: 1, j: 3, pivot: 4, swap: 'arr[1] ↔ arr[3] ✅', array: '[2, 1, 8, 5, 4]' },
    desc: 'Step 9: Swap complete! Array transforms to [2, 1, 8, 5, 4]. Partition scan finished.',
  },
  {
    activeLine: 7,
    pivot: 4,
    i: 1, j: null,
    swapFrom: 2,
    swapTo: 4,
    array: [2, 1, 8, 5, 4],
    state: { i: 1, pivot: 4, action: 'Swapping arr[i+1=2]=8 ↔ arr[high=4]=4' },
    desc: 'Step 10: Partition loop ended. About to swap pivot arr[4]=4 with arr[i+1=2]=8 to lock pivot into its partition boundary.',
  },
  {
    activeLine: 8,
    pivot: 2,
    i: 2, j: null,
    array: [2, 1, 4, 5, 8],
    state: { pivotPlaced: 4, pivotIndex: 2, leftSubarray: '[2, 1]', rightSubarray: '[5, 8]' },
    desc: 'Step 11: Pivot 4 locked at index 2! Left subarray [2, 1] <= 4 and right subarray [5, 8] > 4.',
  },
  {
    activeLine: 6,
    pivot: 1,
    i: 0, j: 1,
    swapFrom: 0,
    swapTo: 1,
    array: [2, 1, 4, 5, 8],
    state: { leftSubarray: '[2, 1]', pivot: 1, action: 'Swapping arr[0]=2 ↔ arr[1]=1' },
    desc: 'Step 12: Recurse on left subarray [2, 1]. Pick pivot=1. About to swap arr[0]=2 with arr[1]=1.',
  },
  {
    activeLine: 8,
    pivot: 2,
    i: 0, j: 1,
    array: [1, 2, 4, 5, 8],
    state: { leftSorted: '[1, 2]', pivot: 4, rightSubarray: '[5, 8]' },
    desc: 'Step 13: Left partition [1, 2] sorted in-place! Array is [1, 2, 4, 5, 8].',
  },
  {
    activeLine: 4,
    pivot: 4,
    i: 3, j: 3,
    array: [1, 2, 4, 5, 8],
    state: { rightSubarray: '[5, 8]', pivot: 8, status: '5 <= 8 (Already sorted)' },
    desc: 'Step 14: Recurse on right subarray [5, 8]. Pivot=8. 5 <= 8 is already in order. Right partition [5, 8] sorted in-place.',
  },
  {
    activeLine: 8,
    pivot: null, i: null, j: null,
    isMatch: true,
    array: [1, 2, 4, 5, 8],
    state: { status: 'FULLY SORTED 🎉', sortedArray: '[1, 2, 4, 5, 8]' },
    desc: 'Step 15: Divide & conquer complete! Array [1, 2, 4, 5, 8] is fully sorted in O(N log N) average time! 🎉',
  },
];

// 5. MERGE SORT STEPS (10 Granular Steps) — with low/mid/high for pointer badges
const MERGE_SORT_STEPS = [
  {
    activeLine: 1,
    array: [5, 2, 8, 1, 4],
    low: 0, mid: null, high: 4,
    state: { keyInsight: 'Divide array into halves, recursively sort halves, and merge sorted lists in O(N log N).', array: '[5, 2, 8, 1, 4]' },
    desc: '💡 Key insight: Merge sort recursively divides array into halves until base cases (size 1) are reached, then merges sorted sub-lists.',
  },
  {
    activeLine: 2,
    array: [5, 2, 8, 1, 4],
    low: 0, mid: 2, high: 4,
    state: { leftHalf: '[5, 2, 8]', rightHalf: '[1, 4]', status: 'Divide at Mid = 2' },
    desc: 'Step 1: Divide array [5, 2, 8, 1, 4] at mid index 2 into Left [5, 2, 8] (low=0, mid=2) and Right [1, 4] (mid+1=3, high=4).',
  },
  {
    activeLine: 3,
    array: [5, 2, 8, 1, 4],
    low: 0, mid: 1, high: 2,
    state: { leftLeft: '[5, 2]', leftRight: '[8]', status: 'Recurse Left: mergeSort(arr, 0, 2)' },
    desc: 'Step 2: Recurse on Left subarray [5, 2, 8] — low=0, mid=1, high=2. Next divide into [5, 2] and [8].',
  },
  {
    activeLine: 3,
    array: [5, 2, 8, 1, 4],
    low: 0, mid: 0, high: 1,
    state: { status: 'Recurse Left-Left: mergeSort(arr, 0, 1) → Divide [5, 2]' },
    desc: 'Step 3: Recurse on [5, 2] — low=0, mid=0, high=1. Divide into single elements [5] and [2].',
  },
  {
    activeLine: 5,
    array: [2, 5, 8, 1, 4],
    low: 0, mid: 0, high: 1,
    state: { merged: '[2, 5]', status: 'Merge [5] and [2] ➔ [2, 5]' },
    desc: 'Step 4: Merge [5] and [2] — low=0, mid=0, high=1. Compare 5 vs 2 ➔ Merged sorted pair [2, 5].',
  },
  {
    activeLine: 5,
    array: [2, 5, 8, 1, 4],
    low: 0, mid: 1, high: 2,
    state: { mergedLeft: '[2, 5, 8]', status: 'Merge [2, 5] and [8] ➔ [2, 5, 8]' },
    desc: 'Step 5: Merge [2, 5] with [8] — low=0, mid=1, high=2. Sorted Left subarray becomes [2, 5, 8].',
  },
  {
    activeLine: 4,
    array: [2, 5, 8, 1, 4],
    low: 3, mid: 3, high: 4,
    state: { rightLeft: '[1]', rightRight: '[4]', status: 'Recurse Right: mergeSort(arr, 3, 4)' },
    desc: 'Step 6: Recurse on Right subarray [1, 4] — low=3, mid=3, high=4. Divide into single elements [1] and [4].',
  },
  {
    activeLine: 5,
    array: [2, 5, 8, 1, 4],
    low: 3, mid: 3, high: 4,
    state: { mergedRight: '[1, 4]', status: 'Merge [1] and [4] ➔ [1, 4]' },
    desc: 'Step 7: Merge [1] and [4] — low=3, mid=3, high=4. Sorted Right subarray becomes [1, 4].',
  },
  {
    activeLine: 5,
    array: [1, 2, 4, 5, 8],
    low: 0, mid: 2, high: 4,
    state: { status: 'Merging Left [2, 5, 8] and Right [1, 4]...' },
    desc: 'Step 8: Final Merge — low=0, mid=2, high=4. Compare head elements of Left [2, 5, 8] and Right [1, 4]. Pick 1, then 2, 4, 5, 8.',
  },
  {
    activeLine: 5,
    array: [1, 2, 4, 5, 8],
    low: 0, mid: 2, high: 4,
    state: { status: 'Final Merge Complete ✅' },
    desc: 'Step 9: All elements merged in sorted order: [1, 2, 4, 5, 8]. low=0, high=4.',
  },
  {
    activeLine: 5,
    isMatch: true,
    array: [1, 2, 4, 5, 8],
    low: 0, mid: 2, high: 4,
    state: { status: 'FULLY SORTED 🎉', sortedArray: '[1, 2, 4, 5, 8]' },
    desc: 'Step 10: Array [1, 2, 4, 5, 8] fully sorted via Stable Merge Sort O(N log N)! 🎉',
  },
];

const SORT_ARRAYS = {
  'bubble-sort': [5, 2, 8, 1, 4],
  'selection-sort': [5, 2, 8, 1, 4],
  'insertion-sort': [5, 2, 8, 1, 4],
  'quick-sort': [5, 2, 8, 1, 4],
  'merge-sort': [5, 2, 8, 1, 4],
};

export const useSortingStore = create((set, get) => ({
  track: 'bubble-sort',
  array: SORT_ARRAYS['bubble-sort'],
  steps: BUBBLE_SORT_STEPS,
  currentStep: 0,
  isPlaying: false,
  speed: 1,
  practiceMode: false,
  userCode: `// Sorting Template\nfunction bubbleSort(arr) {\n  let n = arr.length;\n  for (let i = 0; i < n - 1; i++) {\n    for (let j = 0; j < n - i - 1; j++) {\n      if (arr[j] > arr[j + 1]) {\n        let temp = arr[j];\n        arr[j] = arr[j + 1];\n        arr[j + 1] = temp;\n      }\n    }\n  }\n  return arr;\n}`,

  setTrack: (trackKey) => {
    let steps = BUBBLE_SORT_STEPS;
    let array = SORT_ARRAYS['bubble-sort'];

    if (trackKey === 'selection-sort') {
      steps = SELECTION_SORT_STEPS;
      array = SORT_ARRAYS['selection-sort'];
    } else if (trackKey === 'insertion-sort') {
      steps = INSERTION_SORT_STEPS;
      array = SORT_ARRAYS['insertion-sort'];
    } else if (trackKey === 'quick-sort' || trackKey === 'quick') {
      steps = QUICK_SORT_STEPS;
      array = SORT_ARRAYS['quick-sort'];
    } else if (trackKey === 'merge-sort' || trackKey === 'merge') {
      steps = MERGE_SORT_STEPS;
      array = SORT_ARRAYS['merge-sort'];
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
