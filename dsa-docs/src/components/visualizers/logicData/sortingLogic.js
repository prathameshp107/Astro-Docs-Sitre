export const sortingLogic = {
  'sorting': {
    title: 'Sorting Algorithms Suite',
    input: 'Unsorted Array = [5, 2, 8, 1, 4]',
    goal: 'Sort elements in non-decreasing order using comparison & divide-and-conquer algorithms.',
    terms: {
      'Adjacent Swap': 'Swapping neighboring out-of-order elements in Bubble Sort.',
      'Min Index': 'Tracking minimum element position in Selection Sort.',
      'Key Insertion': 'Shifting larger elements right to insert key into sorted prefix.'
    },
    array: [5, 2, 8, 1, 4],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Pass 1 (i=0, j=0) - Compare arr[0](5) > arr[1](2)',
        left: 0,
        right: 1,
        array: [5, 2, 8, 1, 4],
        computation: '5 > 2 ➔ True (Swap Required)',
        comparison: 'Out of Order ❌',
        action: 'Swap 5 and 2',
        desc: 'Pass 1 (i=0, j=0). Compare arr[0]=5 with arr[1]=2. Since 5 > 2, swap is required!'
      },
      {
        stepNum: 2,
        title: 'Step 2: Swap arr[0](5) & arr[1](2) ➔ [2, 5, 8, 1, 4]',
        left: 0,
        right: 1,
        array: [2, 5, 8, 1, 4],
        computation: 'Swap 5 ↔ 2',
        comparison: 'Array [2, 5, 8, 1, 4]',
        action: 'Advance j to 1',
        desc: 'Swap elements 5 and 2. Array transforms to [2, 5, 8, 1, 4].'
      },
      {
        stepNum: 3,
        title: 'Step 3: Advance j=1 - Compare arr[1](5) < arr[2](8)',
        left: 1,
        right: 2,
        array: [2, 5, 8, 1, 4],
        computation: '5 < 8 ➔ False (No Swap)',
        comparison: 'In Order ✅',
        action: 'Advance j to 2',
        desc: 'Advance j to 1. Compare arr[1]=5 with arr[2]=8. Since 5 < 8, elements are in order.'
      },
      {
        stepNum: 4,
        title: 'Step 4: Advance j=2 - Compare arr[2](8) > arr[3](1)',
        left: 2,
        right: 3,
        array: [2, 5, 8, 1, 4],
        computation: '8 > 1 ➔ True (Swap Required)',
        comparison: 'Out of Order ❌',
        action: 'Swap 8 and 1',
        desc: 'Advance j to 2. Compare arr[2]=8 with arr[3]=1. Since 8 > 1, swap is required!'
      },
      {
        stepNum: 5,
        title: 'Step 5: Swap arr[2](8) & arr[3](1) ➔ [2, 5, 1, 8, 4]',
        left: 2,
        right: 3,
        array: [2, 5, 1, 8, 4],
        computation: 'Swap 8 ↔ 1',
        comparison: 'Array [2, 5, 1, 8, 4]',
        action: 'Advance j to 3',
        desc: 'Swap elements 8 and 1. Array transforms to [2, 5, 1, 8, 4].'
      },
      {
        stepNum: 6,
        title: 'Step 6: Advance j=3 - Compare arr[3](8) > arr[4](4)',
        left: 3,
        right: 4,
        array: [2, 5, 1, 8, 4],
        computation: '8 > 4 ➔ True (Swap Required)',
        comparison: 'Out of Order ❌',
        action: 'Swap 8 and 4',
        desc: 'Advance j to 3. Compare arr[3]=8 with arr[4]=4. Since 8 > 4, swap is required!'
      },
      {
        stepNum: 7,
        title: 'Step 7: Swap arr[3](8) & arr[4](4) ➔ Pass 1 Complete',
        left: 3,
        right: 4,
        array: [2, 5, 1, 4, 8],
        computation: 'Swap 8 ↔ 4',
        comparison: 'Pass 1 Complete: 8 placed at end',
        action: 'Lock Element 8',
        desc: 'Swap 8 and 4. Pass 1 complete! Maximum element 8 is bubbled to index 4.'
      },
      {
        stepNum: 8,
        title: 'Step 8: Pass 2 (i=1) - Swap 5 ↔ 1 ➔ [2, 1, 5, 4, 8]',
        left: 1,
        right: 2,
        array: [2, 1, 5, 4, 8],
        computation: 'Swap 5 ↔ 1',
        comparison: 'Pass 2 Progress',
        action: 'Advance j to 2',
        desc: 'Pass 2 (i=1). Compare and swap arr[1]=5 with arr[2]=1. Array becomes [2, 1, 5, 4, 8].'
      },
      {
        stepNum: 9,
        title: 'Step 9: Pass 2 (j=2) - Swap 5 ↔ 4 ➔ [2, 1, 4, 5, 8]',
        left: 2,
        right: 3,
        array: [2, 1, 4, 5, 8],
        computation: 'Swap 5 ↔ 4',
        comparison: 'Pass 2 Complete: 5 placed',
        action: 'Lock Element 5',
        desc: 'Compare arr[2]=5 > arr[3]=4. Swap 5 and 4. Array transforms to [2, 1, 4, 5, 8]. Element 5 locked.'
      },
      {
        stepNum: 10,
        title: 'Step 10: Pass 3 (i=2) - Swap 2 ↔ 1 ➔ [1, 2, 4, 5, 8]',
        left: 0,
        right: 1,
        array: [1, 2, 4, 5, 8],
        computation: 'Swap 2 ↔ 1',
        comparison: 'Pass 3 Complete',
        action: 'Verify Sorted State',
        desc: 'Pass 3 (i=2). Compare arr[0]=2 > arr[1]=1. Swap 2 and 1. Array becomes [1, 2, 4, 5, 8].'
      },
      {
        stepNum: 11,
        title: 'Step 11: Pass 4 (i=3) - Zero Swaps ➔ Fully Sorted! 🎉',
        left: 0,
        right: 4,
        array: [1, 2, 4, 5, 8],
        computation: 'Array = [1, 2, 4, 5, 8]',
        comparison: 'FULLY SORTED 🎉',
        action: 'Return Array',
        isMatch: true,
        desc: 'Pass 4 (i=3). Zero swaps performed. Array [1, 2, 4, 5, 8] is fully sorted! 🎉'
      }
    ]
  },

  'sorting-bubble-sort': {
    title: 'Bubble Sort O(N^2)',
    input: 'Array = [5, 2, 8, 1, 4]',
    goal: 'Bubble largest elements to end via adjacent swaps in O(N^2) time.',
    terms: {
      'j (scan pointer)': 'Left element of comparison window [j, j+1]. Scans 0 to n-i-2 in each pass.',
      'j+1': 'Right element of comparison window adjacent to j.',
      'Swap Condition': 'arr[j] > arr[j+1] triggers in-place swap.'
    },
    array: [5, 2, 8, 1, 4],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Pass 1 (i=0, j=0) — Compare arr[j](5) > arr[j+1](2)',
        left: 0, right: 1,
        leftLabel: 'j', rightLabel: 'j+1',
        array: [5, 2, 8, 1, 4],
        computation: 'arr[j](5) > arr[j+1](2) ➔ Swap Required',
        comparison: 'Out of Order ❌',
        action: 'Swap 5 ↔ 2',
        desc: 'Pass 1 (i=0, j=0). Compare arr[0]=5 with arr[1]=2. Since 5 > 2, swap is required!'
      },
      {
        stepNum: 2,
        title: 'Step 2: Swap arr[0](5) & arr[1](2) ➔ Array becomes [2, 5, 8, 1, 4]',
        left: 0, right: 1,
        leftLabel: 'j', rightLabel: 'j+1',
        array: [2, 5, 8, 1, 4],
        computation: 'Swap arr[0] ↔ arr[1]',
        comparison: 'Elements Swapped',
        action: 'Advance j++',
        desc: 'Swap elements at indices 0 and 1. Array becomes [2, 5, 8, 1, 4].'
      },
      {
        stepNum: 3,
        title: 'Step 3: Pass 1 (j=1) — Compare arr[1](5) < arr[2](8) (No Swap)',
        left: 1, right: 2,
        leftLabel: 'j', rightLabel: 'j+1',
        array: [2, 5, 8, 1, 4],
        computation: '5 < 8 ➔ In Order',
        comparison: 'In Order ✅',
        action: 'Advance j++',
        desc: 'Compare arr[1]=5 with arr[2]=8. Since 5 < 8, no swap needed.'
      },
      {
        stepNum: 4,
        title: 'Step 4: Pass 1 (j=2) — Swap arr[2](8) & arr[3](1) ➔ [2, 5, 1, 8, 4]',
        left: 2, right: 3,
        leftLabel: 'j', rightLabel: 'j+1',
        array: [2, 5, 1, 8, 4],
        computation: 'Swap 8 ↔ 1',
        comparison: 'Out of Order ❌',
        action: 'Swap 8 ↔ 1',
        desc: 'Compare arr[2]=8 with arr[3]=1. Swap 8 and 1. Array becomes [2, 5, 1, 8, 4].'
      },
      {
        stepNum: 5,
        title: 'Step 5: Pass 1 (j=3) — Swap arr[3](8) & arr[4](4) ➔ 8 Locked at End!',
        left: 3, right: 4,
        leftLabel: 'j', rightLabel: 'j+1',
        array: [2, 5, 1, 4, 8],
        computation: 'Swap 8 ↔ 4',
        comparison: 'Max Element 8 Bubbled',
        action: 'Lock Element 8',
        desc: 'Compare arr[3]=8 with arr[4]=4. Swap 8 and 4. Element 8 bubbled to final position!'
      },
      {
        stepNum: 6,
        title: 'Step 6: Bubble Sort Complete ➔ Sorted Array = [1, 2, 4, 5, 8] 🎉',
        left: 0, right: 4,
        leftLabel: 'start', rightLabel: 'end',
        array: [1, 2, 4, 5, 8],
        computation: 'Array = [1, 2, 4, 5, 8]',
        comparison: 'FULLY SORTED IN O(N^2) TIME 🎉',
        action: 'Return Sorted Array',
        isMatch: true,
        desc: 'All passes complete! Array fully sorted to [1, 2, 4, 5, 8] in O(N^2) time! 🎉'
      }
    ]
  },

  'sorting-selection-sort': {
    title: 'Selection Sort O(N^2)',
    input: 'Array = [5, 2, 8, 1, 4]',
    goal: 'Repeatedly find minimum element from unsorted portion and swap it into position.',
    terms: {
      'i (sorted boundary)': 'Current boundary of sorted sub-array. Swapped with min_idx at end of pass.',
      'min_idx': 'Index of smallest element found in unsorted portion [i..N-1].',
      'j (scan pointer)': 'Scans unsorted portion to update min_idx.'
    },
    array: [5, 2, 8, 1, 4],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Pass 1 (i=0) — Init min_idx = 0 (val 5)',
        left: 0, right: 0,
        leftLabel: 'i/min', rightLabel: 'i/min',
        array: [5, 2, 8, 1, 4],
        computation: 'min_idx = 0 (val 5)',
        comparison: 'Scan Unsorted Portion',
        action: 'Init Pass 1',
        desc: 'Pass 1 (i=0). Set min_idx = 0 (val 5). Scan remaining elements to find absolute minimum.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Find Absolute Minimum val 1 at Index 3',
        left: 0, right: 3,
        leftLabel: 'i=0', rightLabel: 'min_idx=3',
        array: [5, 2, 8, 1, 4],
        computation: 'min(5, 2, 8, 1, 4) = 1 at index 3',
        comparison: 'Minimum 1 Found',
        action: 'Swap arr[0] ↔ arr[3]',
        desc: 'Scan unsorted elements: 1 at index 3 is smallest! Set min_idx = 3.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Swap arr[0](5) & arr[3](1) ➔ [1, 2, 8, 5, 4]',
        left: 0, right: 3,
        leftLabel: 'sorted 1', rightLabel: 'swapped 5',
        array: [1, 2, 8, 5, 4],
        computation: 'Swap arr[0] (5) ↔ arr[3] (1)',
        comparison: 'Index 0 Sorted',
        action: 'Lock Index 0',
        desc: 'Swap arr[0] (5) with min element arr[3] (1). Index 0 (val 1) is now permanently sorted!'
      },
      {
        stepNum: 4,
        title: 'Step 4: Selection Sort Complete ➔ Sorted Array = [1, 2, 4, 5, 8] 🎉',
        left: 0, right: 4,
        leftLabel: 'start', rightLabel: 'end',
        array: [1, 2, 4, 5, 8],
        computation: 'Array = [1, 2, 4, 5, 8]',
        comparison: 'SORTED IN O(N^2) TIME 🎉',
        action: 'Return Sorted Array',
        isMatch: true,
        desc: 'Selection Sort complete! Array fully sorted to [1, 2, 4, 5, 8] in O(N^2) comparisons! 🎉'
      }
    ]
  },

  'sorting-insertion-sort': {
    title: 'Insertion Sort O(N^2)',
    input: 'Array = [5, 2, 8, 1, 4]',
    goal: 'Build sorted array one element at a time by inserting key into correct position in sorted prefix.',
    terms: {
      'key': 'Current element being inserted into sorted prefix [0..i-1].',
      'i': 'Current key index from 1 to N-1.',
      'j': 'Pointer scanning sorted prefix right-to-left, shifting elements > key.'
    },
    array: [5, 2, 8, 1, 4],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Pick Key arr[1] = 2 ➔ Compare with arr[0] = 5',
        left: 0, right: 1,
        leftLabel: 'j=0', rightLabel: 'key=2',
        array: [5, 2, 8, 1, 4],
        computation: 'key = 2, arr[0] = 5 > 2',
        comparison: '5 > 2 (Shift 5 Right)',
        action: 'Shift 5 to Index 1',
        desc: 'Pick key = arr[1] (2). Compare with sorted prefix element arr[0]=5. Since 5 > 2, shift 5 to index 1.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Insert Key 2 at Index 0 ➔ Prefix = [2, 5]',
        left: 0, right: 1,
        leftLabel: 'inserted 2', rightLabel: 'shifted 5',
        array: [2, 5, 8, 1, 4],
        computation: 'arr[0] = key (2)',
        comparison: 'Prefix [2, 5] Sorted',
        action: 'Advance Key to i=2',
        desc: 'Insert key 2 into index 0. Sorted prefix becomes [2, 5]. Advance to next key i=2.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Insertion Sort Complete ➔ [1, 2, 4, 5, 8] 🎉',
        left: 0, right: 4,
        leftLabel: 'start', rightLabel: 'end',
        array: [1, 2, 4, 5, 8],
        computation: 'Array = [1, 2, 4, 5, 8]',
        comparison: 'INSERTION SORT COMPLETE 🎉',
        action: 'Return Array',
        isMatch: true,
        desc: 'All keys inserted into sorted prefix! Final array: [1, 2, 4, 5, 8] in O(N^2) worst case, O(N) best case! 🎉'
      }
    ]
  },

  'sorting-merge-sort': {
    title: 'Merge Sort O(N log N)',
    input: 'Array = [5, 2, 8, 1, 4]',
    goal: 'Divide array into halves recursively, then merge sorted halves in O(N log N) time.',
    terms: {
      'low / high': 'Subarray boundaries.',
      'mid': 'Midpoint floor((low + high) / 2).',
      'merge()': 'Combines two sorted subarrays into single sorted array using O(N) space.'
    },
    array: [1, 2, 4, 5, 8],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Divide Array [5, 2, 8, 1, 4] at mid = 2',
        left: 0, mid: 2, right: 4,
        leftLabel: 'low', midLabel: 'mid', rightLabel: 'high',
        array: [5, 2, 8, 1, 4],
        computation: 'Left = [5, 2, 8], Right = [1, 4]',
        comparison: 'Divide Phase',
        action: 'Recurse Halves',
        desc: 'Divide array at mid = 2 into Left [5, 2, 8] and Right [1, 4].'
      },
      {
        stepNum: 2,
        title: 'Step 2: Merge Sort Complete ➔ Sorted Array = [1, 2, 4, 5, 8] 🎉',
        left: 0, right: 4,
        leftLabel: 'start', rightLabel: 'end',
        array: [1, 2, 4, 5, 8],
        computation: 'Merged = [1, 2, 4, 5, 8]',
        comparison: 'SORTED IN O(N log N) TIME 🎉',
        action: 'Return Sorted Array',
        isMatch: true,
        desc: 'Merge Sort complete! Array sorted to [1, 2, 4, 5, 8] in O(N log N) time! 🎉'
      }
    ]
  },

  'sorting-quick-sort': {
    title: 'Quick Sort O(N log N)',
    input: 'Array = [5, 2, 8, 1, 4], Pivot = 4',
    goal: 'Partition array around a pivot element such that left <= pivot and right >= pivot.',
    terms: {
      'Pivot': 'Element chosen to partition array (e.g. last element 4).',
      'i (partition pointer)': 'Tracks boundary of elements <= pivot.',
      'j (scan pointer)': 'Scans array elements to compare against pivot.'
    },
    array: [1, 2, 4, 5, 8],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Choose Pivot = arr[4] (4)',
        left: 0, right: 4,
        leftLabel: 'low', rightLabel: 'pivot',
        array: [5, 2, 8, 1, 4],
        computation: 'Pivot = 4 at index 4',
        comparison: 'Partition Phase',
        action: 'Init Scan j=0',
        desc: 'Pick last element 4 as Pivot. Partition remaining elements around 4.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Quick Sort Complete ➔ Sorted Array = [1, 2, 4, 5, 8] 🎉',
        left: 0, right: 4,
        leftLabel: 'start', rightLabel: 'end',
        array: [1, 2, 4, 5, 8],
        computation: 'Array = [1, 2, 4, 5, 8]',
        comparison: 'QUICK SORT COMPLETE 🎉',
        action: 'Return Sorted Array',
        isMatch: true,
        desc: 'Quick Sort complete! Array partitioned and sorted in-place in average O(N log N) time! 🎉'
      }
    ]
  }
};
