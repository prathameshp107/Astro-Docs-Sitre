export const sortingLogic = {
  'sorting': {
    title: 'Bubble Sort O(N^2)',
    input: 'Unsorted Array = [5, 2, 8, 1, 4]',
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
        title: 'Step 1: Init Pass 1 (i=0)',
        left: 0, right: 1,
        leftLabel: 'j', rightLabel: 'j+1',
        array: [5, 2, 8, 1, 4],
        computation: 'i = 0, j = 0',
        comparison: 'Start Pass 1',
        action: 'Inspect arr[0] and arr[1]',
        desc: 'Initialize Pass 1 (i=0). Scan adjacent pairs starting at index j=0.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Pass 1 (j=0) ➔ About to swap arr[0]=5 ↔ arr[1]=2',
        left: 0, right: 1,
        swapFrom: 0, swapTo: 1,
        leftLabel: 'j', rightLabel: 'j+1',
        array: [5, 2, 8, 1, 4],
        computation: 'arr[0](5) > arr[1](2) ➔ Out of order',
        comparison: '5 > 2 ➔ 🔄 Swap',
        action: 'Executing arr[0] ↔ arr[1]',
        desc: 'Compare arr[0]=5 with arr[1]=2. 5 > 2 is out of order! About to swap.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Swap complete → Array is [2, 5, 8, 1, 4]',
        left: 0, right: 1,
        leftLabel: 'j', rightLabel: 'j+1',
        array: [2, 5, 8, 1, 4],
        computation: 'Swap arr[0] ↔ arr[1] ✅',
        comparison: 'Elements 5 and 2 swapped',
        action: 'Advance j to 1',
        isMatch: true,
        desc: 'Swap complete! Array transforms to [2, 5, 8, 1, 4].'
      },
      {
        stepNum: 4,
        title: 'Step 4: Pass 1 (j=1) ➔ Compare arr[1](5) < arr[2](8) (No Swap)',
        left: 1, right: 2,
        leftLabel: 'j', rightLabel: 'j+1',
        array: [2, 5, 8, 1, 4],
        computation: 'arr[1](5) < arr[2](8)',
        comparison: 'In Order ✅',
        action: 'Advance j to 2',
        desc: 'Compare arr[1]=5 with arr[2]=8. 5 < 8 is already in order. No swap needed.'
      },
      {
        stepNum: 5,
        title: 'Step 5: Pass 1 (j=2) ➔ About to swap arr[2]=8 ↔ arr[3]=1',
        left: 2, right: 3,
        swapFrom: 2, swapTo: 3,
        leftLabel: 'j', rightLabel: 'j+1',
        array: [2, 5, 8, 1, 4],
        computation: 'arr[2](8) > arr[3](1) ➔ Out of order',
        comparison: '8 > 1 ➔ 🔄 Swap',
        action: 'Executing arr[2] ↔ arr[3]',
        desc: 'Compare arr[2]=8 with arr[3]=1. 8 > 1 is out of order! About to swap.'
      },
      {
        stepNum: 6,
        title: 'Step 6: Swap complete → Array is [2, 5, 1, 8, 4]',
        left: 2, right: 3,
        leftLabel: 'j', rightLabel: 'j+1',
        array: [2, 5, 1, 8, 4],
        computation: 'Swap arr[2] ↔ arr[3] ✅',
        comparison: 'Elements 8 and 1 swapped',
        action: 'Advance j to 3',
        isMatch: true,
        desc: 'Swap complete! Array transforms to [2, 5, 1, 8, 4].'
      },
      {
        stepNum: 7,
        title: 'Step 7: Pass 1 (j=3) ➔ About to swap arr[3]=8 ↔ arr[4]=4',
        left: 3, right: 4,
        swapFrom: 3, swapTo: 4,
        leftLabel: 'j', rightLabel: 'j+1',
        array: [2, 5, 1, 8, 4],
        computation: 'arr[3](8) > arr[4](4) ➔ Out of order',
        comparison: '8 > 4 ➔ 🔄 Swap',
        action: 'Executing arr[3] ↔ arr[4]',
        desc: 'Compare arr[3]=8 with arr[4]=4. 8 > 4 is out of order! About to swap.'
      },
      {
        stepNum: 8,
        title: 'Step 8: Pass 1 Complete ➔ Array is [2, 5, 1, 4, 8] (8 Locked)',
        left: 3, right: 4,
        leftLabel: 'j', rightLabel: 'j+1',
        array: [2, 5, 1, 4, 8],
        computation: 'Swap arr[3] ↔ arr[4] ✅',
        comparison: 'Max Element 8 Bubbled to End',
        action: 'Lock Element 8',
        isMatch: true,
        desc: 'Swap complete! Array transforms to [2, 5, 1, 4, 8]. Pass 1 complete! Maximum element 8 is locked at end.'
      },
      {
        stepNum: 9,
        title: 'Step 9: Pass 2 (j=1) ➔ About to swap arr[1]=5 ↔ arr[2]=1',
        left: 1, right: 2,
        swapFrom: 1, swapTo: 2,
        leftLabel: 'j', rightLabel: 'j+1',
        array: [2, 5, 1, 4, 8],
        computation: 'arr[1](5) > arr[2](1) ➔ Out of order',
        comparison: '5 > 1 ➔ 🔄 Swap',
        action: 'Executing arr[1] ↔ arr[2]',
        desc: 'Pass 2 (i=1, j=1). Compare arr[1]=5 with arr[2]=1. 5 > 1 is out of order! About to swap.'
      },
      {
        stepNum: 10,
        title: 'Step 10: Swap complete → Array is [2, 1, 5, 4, 8]',
        left: 1, right: 2,
        leftLabel: 'j', rightLabel: 'j+1',
        array: [2, 1, 5, 4, 8],
        computation: 'Swap arr[1] ↔ arr[2] ✅',
        comparison: 'Elements 5 and 1 swapped',
        action: 'Advance j to 2',
        isMatch: true,
        desc: 'Swap complete! Array transforms to [2, 1, 5, 4, 8].'
      },
      {
        stepNum: 11,
        title: 'Step 11: Pass 2 (j=2) ➔ About to swap arr[2]=5 ↔ arr[3]=4',
        left: 2, right: 3,
        swapFrom: 2, swapTo: 3,
        leftLabel: 'j', rightLabel: 'j+1',
        array: [2, 1, 5, 4, 8],
        computation: 'arr[2](5) > arr[3](4) ➔ Out of order',
        comparison: '5 > 4 ➔ 🔄 Swap',
        action: 'Executing arr[2] ↔ arr[3]',
        desc: 'Pass 2 (j=2). Compare arr[2]=5 with arr[3]=4. 5 > 4 is out of order! About to swap.'
      },
      {
        stepNum: 12,
        title: 'Step 12: Pass 2 Complete ➔ Array is [2, 1, 4, 5, 8] (5 Locked)',
        left: 2, right: 3,
        leftLabel: 'j', rightLabel: 'j+1',
        array: [2, 1, 4, 5, 8],
        computation: 'Swap arr[2] ↔ arr[3] ✅',
        comparison: 'Element 5 Locked at Index 3',
        action: 'Lock Element 5',
        isMatch: true,
        desc: 'Swap complete! Array transforms to [2, 1, 4, 5, 8]. Pass 2 complete! Element 5 locked at index 3.'
      },
      {
        stepNum: 13,
        title: 'Step 13: Pass 3 (j=0) ➔ About to swap arr[0]=2 ↔ arr[1]=1',
        left: 0, right: 1,
        swapFrom: 0, swapTo: 1,
        leftLabel: 'j', rightLabel: 'j+1',
        array: [2, 1, 4, 5, 8],
        computation: 'arr[0](2) > arr[1](1) ➔ Out of order',
        comparison: '2 > 1 ➔ 🔄 Swap',
        action: 'Executing arr[0] ↔ arr[1]',
        desc: 'Pass 3 (i=2, j=0). Compare arr[0]=2 with arr[1]=1. 2 > 1 is out of order! About to swap.'
      },
      {
        stepNum: 14,
        title: 'Step 14: Pass 3 Complete ➔ Array is [1, 2, 4, 5, 8]',
        left: 0, right: 1,
        leftLabel: 'j', rightLabel: 'j+1',
        array: [1, 2, 4, 5, 8],
        computation: 'Swap arr[0] ↔ arr[1] ✅',
        comparison: 'Pass 3 Complete',
        action: 'Verify Suffix',
        isMatch: true,
        desc: 'Swap complete! Array becomes [1, 2, 4, 5, 8]. Elements [2, 4, 5, 8] locked in place.'
      },
      {
        stepNum: 15,
        title: 'Step 15: Pass 4 Complete ➔ Sorted Array = [1, 2, 4, 5, 8] 🎉',
        left: 0, right: 4,
        leftLabel: 'start', rightLabel: 'end',
        array: [1, 2, 4, 5, 8],
        computation: 'Array = [1, 2, 4, 5, 8]',
        comparison: 'FULLY SORTED IN O(N^2) TIME 🎉',
        action: 'Return Sorted Array',
        isMatch: true,
        desc: 'Pass 4 completes with zero swaps. Array fully sorted to [1, 2, 4, 5, 8] in O(N^2) time! 🎉'
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
        title: 'Step 1: Init Pass 1 (i=0)',
        left: 0, right: 1,
        leftLabel: 'j', rightLabel: 'j+1',
        array: [5, 2, 8, 1, 4],
        computation: 'i = 0, j = 0',
        comparison: 'Start Pass 1',
        action: 'Inspect arr[0] and arr[1]',
        desc: 'Initialize Pass 1 (i=0). Scan adjacent pairs starting at index j=0.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Pass 1 (j=0) ➔ About to swap arr[0]=5 ↔ arr[1]=2',
        left: 0, right: 1,
        swapFrom: 0, swapTo: 1,
        leftLabel: 'j', rightLabel: 'j+1',
        array: [5, 2, 8, 1, 4],
        computation: 'arr[0](5) > arr[1](2) ➔ Out of order',
        comparison: '5 > 2 ➔ 🔄 Swap',
        action: 'Executing arr[0] ↔ arr[1]',
        desc: 'Compare arr[0]=5 with arr[1]=2. 5 > 2 is out of order! About to swap.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Swap complete → Array is [2, 5, 8, 1, 4]',
        left: 0, right: 1,
        leftLabel: 'j', rightLabel: 'j+1',
        array: [2, 5, 8, 1, 4],
        computation: 'Swap arr[0] ↔ arr[1] ✅',
        comparison: 'Elements 5 and 2 swapped',
        action: 'Advance j to 1',
        isMatch: true,
        desc: 'Swap complete! Array transforms to [2, 5, 8, 1, 4].'
      },
      {
        stepNum: 4,
        title: 'Step 4: Pass 1 (j=1) ➔ Compare arr[1](5) < arr[2](8) (No Swap)',
        left: 1, right: 2,
        leftLabel: 'j', rightLabel: 'j+1',
        array: [2, 5, 8, 1, 4],
        computation: 'arr[1](5) < arr[2](8)',
        comparison: 'In Order ✅',
        action: 'Advance j to 2',
        desc: 'Compare arr[1]=5 with arr[2]=8. 5 < 8 is already in order. No swap needed.'
      },
      {
        stepNum: 5,
        title: 'Step 5: Pass 1 (j=2) ➔ About to swap arr[2]=8 ↔ arr[3]=1',
        left: 2, right: 3,
        swapFrom: 2, swapTo: 3,
        leftLabel: 'j', rightLabel: 'j+1',
        array: [2, 5, 8, 1, 4],
        computation: 'arr[2](8) > arr[3](1) ➔ Out of order',
        comparison: '8 > 1 ➔ 🔄 Swap',
        action: 'Executing arr[2] ↔ arr[3]',
        desc: 'Compare arr[2]=8 with arr[3]=1. 8 > 1 is out of order! About to swap.'
      },
      {
        stepNum: 6,
        title: 'Step 6: Swap complete → Array is [2, 5, 1, 8, 4]',
        left: 2, right: 3,
        leftLabel: 'j', rightLabel: 'j+1',
        array: [2, 5, 1, 8, 4],
        computation: 'Swap arr[2] ↔ arr[3] ✅',
        comparison: 'Elements 8 and 1 swapped',
        action: 'Advance j to 3',
        isMatch: true,
        desc: 'Swap complete! Array transforms to [2, 5, 1, 8, 4].'
      },
      {
        stepNum: 7,
        title: 'Step 7: Pass 1 (j=3) ➔ About to swap arr[3]=8 ↔ arr[4]=4',
        left: 3, right: 4,
        swapFrom: 3, swapTo: 4,
        leftLabel: 'j', rightLabel: 'j+1',
        array: [2, 5, 1, 8, 4],
        computation: 'arr[3](8) > arr[4](4) ➔ Out of order',
        comparison: '8 > 4 ➔ 🔄 Swap',
        action: 'Executing arr[3] ↔ arr[4]',
        desc: 'Compare arr[3]=8 with arr[4]=4. 8 > 4 is out of order! About to swap.'
      },
      {
        stepNum: 8,
        title: 'Step 8: Pass 1 Complete ➔ Array is [2, 5, 1, 4, 8] (8 Locked)',
        left: 3, right: 4,
        leftLabel: 'j', rightLabel: 'j+1',
        array: [2, 5, 1, 4, 8],
        computation: 'Swap arr[3] ↔ arr[4] ✅',
        comparison: 'Max Element 8 Bubbled to End',
        action: 'Lock Element 8',
        isMatch: true,
        desc: 'Swap complete! Array transforms to [2, 5, 1, 4, 8]. Pass 1 complete! Maximum element 8 is locked at end.'
      },
      {
        stepNum: 9,
        title: 'Step 9: Pass 2 (j=1) ➔ About to swap arr[1]=5 ↔ arr[2]=1',
        left: 1, right: 2,
        swapFrom: 1, swapTo: 2,
        leftLabel: 'j', rightLabel: 'j+1',
        array: [2, 5, 1, 4, 8],
        computation: 'arr[1](5) > arr[2](1) ➔ Out of order',
        comparison: '5 > 1 ➔ 🔄 Swap',
        action: 'Executing arr[1] ↔ arr[2]',
        desc: 'Pass 2 (i=1, j=1). Compare arr[1]=5 with arr[2]=1. 5 > 1 is out of order! About to swap.'
      },
      {
        stepNum: 10,
        title: 'Step 10: Swap complete → Array is [2, 1, 5, 4, 8]',
        left: 1, right: 2,
        leftLabel: 'j', rightLabel: 'j+1',
        array: [2, 1, 5, 4, 8],
        computation: 'Swap arr[1] ↔ arr[2] ✅',
        comparison: 'Elements 5 and 1 swapped',
        action: 'Advance j to 2',
        isMatch: true,
        desc: 'Swap complete! Array transforms to [2, 1, 5, 4, 8].'
      },
      {
        stepNum: 11,
        title: 'Step 11: Pass 2 (j=2) ➔ About to swap arr[2]=5 ↔ arr[3]=4',
        left: 2, right: 3,
        swapFrom: 2, swapTo: 3,
        leftLabel: 'j', rightLabel: 'j+1',
        array: [2, 1, 5, 4, 8],
        computation: 'arr[2](5) > arr[3](4) ➔ Out of order',
        comparison: '5 > 4 ➔ 🔄 Swap',
        action: 'Executing arr[2] ↔ arr[3]',
        desc: 'Pass 2 (j=2). Compare arr[2]=5 with arr[3]=4. 5 > 4 is out of order! About to swap.'
      },
      {
        stepNum: 12,
        title: 'Step 12: Pass 2 Complete ➔ Array is [2, 1, 4, 5, 8] (5 Locked)',
        left: 2, right: 3,
        leftLabel: 'j', rightLabel: 'j+1',
        array: [2, 1, 4, 5, 8],
        computation: 'Swap arr[2] ↔ arr[3] ✅',
        comparison: 'Element 5 Locked at Index 3',
        action: 'Lock Element 5',
        isMatch: true,
        desc: 'Swap complete! Array transforms to [2, 1, 4, 5, 8]. Pass 2 complete! Element 5 locked at index 3.'
      },
      {
        stepNum: 13,
        title: 'Step 13: Pass 3 (j=0) ➔ About to swap arr[0]=2 ↔ arr[1]=1',
        left: 0, right: 1,
        swapFrom: 0, swapTo: 1,
        leftLabel: 'j', rightLabel: 'j+1',
        array: [2, 1, 4, 5, 8],
        computation: 'arr[0](2) > arr[1](1) ➔ Out of order',
        comparison: '2 > 1 ➔ 🔄 Swap',
        action: 'Executing arr[0] ↔ arr[1]',
        desc: 'Pass 3 (i=2, j=0). Compare arr[0]=2 with arr[1]=1. 2 > 1 is out of order! About to swap.'
      },
      {
        stepNum: 14,
        title: 'Step 14: Pass 3 Complete ➔ Array is [1, 2, 4, 5, 8]',
        left: 0, right: 1,
        leftLabel: 'j', rightLabel: 'j+1',
        array: [1, 2, 4, 5, 8],
        computation: 'Swap arr[0] ↔ arr[1] ✅',
        comparison: 'Pass 3 Complete',
        action: 'Verify Suffix',
        isMatch: true,
        desc: 'Swap complete! Array becomes [1, 2, 4, 5, 8]. Elements [2, 4, 5, 8] locked in place.'
      },
      {
        stepNum: 15,
        title: 'Step 15: Pass 4 Complete ➔ Sorted Array = [1, 2, 4, 5, 8] 🎉',
        left: 0, right: 4,
        leftLabel: 'start', rightLabel: 'end',
        array: [1, 2, 4, 5, 8],
        computation: 'Array = [1, 2, 4, 5, 8]',
        comparison: 'FULLY SORTED IN O(N^2) TIME 🎉',
        action: 'Return Sorted Array',
        isMatch: true,
        desc: 'Pass 4 completes with zero swaps. Array fully sorted to [1, 2, 4, 5, 8] in O(N^2) time! 🎉'
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
        title: 'Step 1: Init Pass 1 (i=0) — Set min_idx = 0',
        left: 0, right: 0,
        leftLabel: 'i', rightLabel: 'min',
        array: [5, 2, 8, 1, 4],
        computation: 'i = 0, min_idx = 0 (val 5)',
        comparison: 'Scan Unsorted [0..4]',
        action: 'Init Pass 1',
        desc: 'Pass 1 (i=0). Set initial minIdx = 0 (value 5). Now scan j from 1 to 4 to find smaller elements.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Inspect j=1 (val 2) ➔ 2 < 5 ➔ Update min_idx = 1',
        left: 0, right: 1,
        leftLabel: 'i=0', rightLabel: 'min=1 (val 2)',
        array: [5, 2, 8, 1, 4],
        computation: 'arr[1](2) < arr[0](5) ➔ TRUE ✅',
        comparison: 'New Min Found: 2',
        action: 'Update min_idx = 1',
        desc: 'Inspect j=1 (val 2). Since 2 < 5, update minIdx = 1 (new min = 2).'
      },
      {
        stepNum: 3,
        title: 'Step 3: Inspect j=2 (val 8) ➔ 8 > 2 ➔ Keep min_idx = 1',
        left: 0, right: 1,
        leftLabel: 'i=0', rightLabel: 'min=1',
        array: [5, 2, 8, 1, 4],
        computation: 'arr[2](8) < arr[1](2) ➔ FALSE ❌',
        comparison: '8 > 2 (No change)',
        action: 'Advance j to 3',
        desc: 'Inspect j=2 (val 8). Since 8 > 2, minIdx stays at 1 (val 2).'
      },
      {
        stepNum: 4,
        title: 'Step 4: Inspect j=3 (val 1) ➔ 1 < 2 ➔ Update min_idx = 3',
        left: 0, right: 3,
        leftLabel: 'i=0', rightLabel: 'min=3 (val 1)',
        array: [5, 2, 8, 1, 4],
        computation: 'arr[3](1) < arr[1](2) ➔ TRUE ✅',
        comparison: 'New Absolute Min Found: 1',
        action: 'Update min_idx = 3',
        desc: 'Inspect j=3 (val 1). Since 1 < 2, update minIdx = 3 (new absolute min = 1).'
      },
      {
        stepNum: 5,
        title: 'Step 5: Inspect j=4 (val 4) ➔ 4 > 1 ➔ Scan Complete (Min = 1 at index 3)',
        left: 0, right: 3,
        leftLabel: 'i=0', rightLabel: 'min=3',
        array: [5, 2, 8, 1, 4],
        computation: 'arr[4](4) < arr[3](1) ➔ FALSE ❌',
        comparison: 'Scan Complete',
        action: 'Prepare Swap arr[0] ↔ arr[3]',
        desc: 'Inspect j=4 (val 4). Since 4 > 1, scan ends. Minimum element in [0..4] is 1 at index 3.'
      },
      {
        stepNum: 6,
        title: 'Step 6: Pass 1 ➔ About to swap arr[0]=5 ↔ arr[3]=1',
        left: 0, right: 3,
        swapFrom: 0, swapTo: 3,
        leftLabel: 'i', rightLabel: 'min',
        array: [5, 2, 8, 1, 4],
        computation: 'arr[0]=5, arr[3]=1 — swapping',
        comparison: 'Minimum 1 ➔ 🔄 Swap to front',
        action: 'Executing arr[0] ↔ arr[3]',
        desc: 'Pass 1 (i=0). About to swap arr[0]=5 with minimum element arr[3]=1.'
      },
      {
        stepNum: 7,
        title: 'Step 7: Swap complete → Array is [1, 2, 8, 5, 4] (1 Locked)',
        left: 0, right: 3,
        leftLabel: 'i', rightLabel: 'min',
        array: [1, 2, 8, 5, 4],
        computation: 'Swap arr[0] ↔ arr[3] ✅',
        comparison: 'Sorted Prefix [1]',
        action: 'Lock Index 0',
        isMatch: true,
        desc: 'Swap complete! Minimum element 1 placed at index 0. Sorted prefix = [1].'
      },
      {
        stepNum: 8,
        title: 'Step 8: Pass 2 (i=1) ➔ Scan [1..4] ([2, 8, 5, 4])',
        left: 1, right: 1,
        leftLabel: 'i', rightLabel: 'min',
        array: [1, 2, 8, 5, 4],
        computation: 'min(2, 8, 5, 4) = 2 at index 1',
        comparison: 'Min is already at index 1',
        action: 'No Swap Needed',
        desc: 'Pass 2 (i=1). Set minIdx = 1 (val 2). Scan elements [8, 5, 4]. Since 2 is already smallest, no new min found.'
      },
      {
        stepNum: 9,
        title: 'Step 9: Pass 2 Complete ➔ Sorted Prefix [1, 2]',
        left: 1, right: 1,
        leftLabel: 'i', rightLabel: 'min',
        array: [1, 2, 8, 5, 4],
        computation: 'Element 2 In Place ✅',
        comparison: 'Sorted Prefix [1, 2]',
        action: 'Advance i to 2',
        isMatch: true,
        desc: 'Minimum element 2 is already at index 1. No swap needed! Sorted prefix = [1, 2].'
      },
      {
        stepNum: 10,
        title: 'Step 10: Pass 3 (i=2) ➔ Scan [2..4] ([8, 5, 4]) ➔ Min = 4 at Index 4',
        left: 2, right: 4,
        leftLabel: 'i', rightLabel: 'min',
        array: [1, 2, 8, 5, 4],
        computation: 'min(8, 5, 4) = 4 at index 4',
        comparison: 'Minimum 4 Found',
        action: 'Prepare Swap arr[2] ↔ arr[4]',
        desc: 'Pass 3 (i=2). Scan unsorted range [8, 5, 4]. Minimum element found is 4 at index 4.'
      },
      {
        stepNum: 11,
        title: 'Step 11: Pass 3 ➔ About to swap arr[2]=8 ↔ arr[4]=4',
        left: 2, right: 4,
        swapFrom: 2, swapTo: 4,
        leftLabel: 'i', rightLabel: 'min',
        array: [1, 2, 8, 5, 4],
        computation: 'arr[2]=8, arr[4]=4 — swapping',
        comparison: 'Minimum 4 ➔ 🔄 Swap',
        action: 'Executing arr[2] ↔ arr[4]',
        desc: 'Pass 3 (i=2). About to swap arr[2]=8 with minimum element arr[4]=4.'
      },
      {
        stepNum: 12,
        title: 'Step 12: Swap complete → Array is [1, 2, 4, 5, 8] (4 Locked)',
        left: 2, right: 4,
        leftLabel: 'i', rightLabel: 'min',
        array: [1, 2, 4, 5, 8],
        computation: 'Swap arr[2] ↔ arr[4] ✅',
        comparison: 'Sorted Prefix [1, 2, 4]',
        action: 'Lock Index 2',
        isMatch: true,
        desc: 'Swap complete! Element 4 placed at index 2. Sorted prefix = [1, 2, 4].'
      },
      {
        stepNum: 13,
        title: 'Step 13: Pass 4 (i=3) ➔ Inspect [5, 8] ➔ Min is 5 at Index 3',
        left: 3, right: 3,
        leftLabel: 'i', rightLabel: 'min',
        array: [1, 2, 4, 5, 8],
        computation: 'min(5, 8) = 5 at index 3',
        comparison: 'Min is already at index 3',
        action: 'No Swap Needed',
        isMatch: true,
        desc: 'Pass 4 (i=3). Minimum element 5 is already at index 3. No swap needed! Sorted prefix = [1, 2, 4, 5].'
      },
      {
        stepNum: 14,
        title: 'Step 14: Selection Sort Complete ➔ Sorted Array = [1, 2, 4, 5, 8] 🎉',
        left: 0, right: 4,
        leftLabel: 'start', rightLabel: 'end',
        array: [1, 2, 4, 5, 8],
        computation: 'Array = [1, 2, 4, 5, 8]',
        comparison: 'FULLY SORTED IN O(N^2) TIME 🎉',
        action: 'Return Sorted Array',
        isMatch: true,
        desc: 'Selection Sort complete! Array fully sorted to [1, 2, 4, 5, 8] in O(N^2) comparisons & O(1) auxiliary space! 🎉'
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
      'Pivot': 'Element chosen to partition array (arr[high]=4).',
      'i (boundary)': 'Tracks boundary of elements <= pivot. Increments before swap.',
      'j (scan pointer)': 'Scans from low to high-1 to compare against pivot.'
    },
    array: [5, 2, 8, 1, 4],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Init Partition ➔ Choose Pivot = arr[4] (4)',
        left: 0, right: 4,
        leftLabel: 'low=0', rightLabel: 'pivot=4',
        array: [5, 2, 8, 1, 4],
        computation: 'Pivot = 4 at index 4, i = -1',
        comparison: 'Partition Phase',
        action: 'Init Scan j=0',
        desc: 'Pick last element arr[4]=4 as Pivot. Partition elements such that <= 4 move to left, > 4 to right.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Set i = low - 1 = -1 ➔ Start Scan at j=0',
        left: 0, right: 4,
        leftLabel: 'j=0', rightLabel: 'pivot=4',
        array: [5, 2, 8, 1, 4],
        computation: 'i = -1, j = 0',
        comparison: 'Boundary Initialization',
        action: 'Inspect arr[0]',
        desc: 'Set pivot = arr[4] = 4, i = -1. Pointer i tracks partition boundary of elements <= 4.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Inspect j=0 (val 5) ➔ 5 > 4 ➔ No Swap',
        left: 0, right: 4,
        leftLabel: 'j=0 (val 5)', rightLabel: 'pivot=4',
        array: [5, 2, 8, 1, 4],
        computation: 'arr[0](5) <= 4 ➔ FALSE ❌',
        comparison: '5 > 4 (Stays right)',
        action: 'Advance j to 1',
        desc: 'Inspect j=0 (val 5). Since 5 > 4, no swap. Element 5 belongs to right partition. i remains -1.'
      },
      {
        stepNum: 4,
        title: 'Step 4: Inspect j=1 (val 2) ➔ 2 <= 4 ➔ Increment i++ to 0',
        left: 0, right: 1,
        leftLabel: 'i=0', rightLabel: 'j=1',
        array: [5, 2, 8, 1, 4],
        computation: 'arr[1](2) <= 4 ➔ TRUE ✅, i++ = 0',
        comparison: '2 <= 4 (Match!)',
        action: 'Prepare Swap arr[0] ↔ arr[1]',
        desc: 'Inspect j=1 (val 2). Since 2 <= 4, increment i from -1 to 0.'
      },
      {
        stepNum: 5,
        title: 'Step 5: About to swap arr[i=0]=5 ↔ arr[j=1]=2',
        left: 0, right: 1,
        swapFrom: 0, swapTo: 1,
        leftLabel: 'i=0', rightLabel: 'j=1',
        array: [5, 2, 8, 1, 4],
        computation: 'arr[0]=5, arr[1]=2 — swapping',
        comparison: '2 <= 4 ➔ 🔄 Swap',
        action: 'Executing arr[0] ↔ arr[1]',
        desc: 'About to swap arr[i=0]=5 with arr[j=1]=2.'
      },
      {
        stepNum: 6,
        title: 'Step 6: Swap complete → Array is [2, 5, 8, 1, 4]',
        left: 0, right: 1,
        leftLabel: 'i=0 (val 2)', rightLabel: 'j=1 (val 5)',
        array: [2, 5, 8, 1, 4],
        computation: 'Swap arr[0] ↔ arr[1] ✅',
        comparison: 'Elements 5 and 2 swapped',
        action: 'Advance j to 2',
        isMatch: true,
        desc: 'Swap complete! Array transforms to [2, 5, 8, 1, 4]. Element 2 moved to left partition.'
      },
      {
        stepNum: 7,
        title: 'Step 7: Inspect j=2 (val 8) ➔ 8 > 4 ➔ No Swap',
        left: 0, right: 2,
        leftLabel: 'i=0', rightLabel: 'j=2 (val 8)',
        array: [2, 5, 8, 1, 4],
        computation: 'arr[2](8) <= 4 ➔ FALSE ❌',
        comparison: '8 > 4 (Stays right)',
        action: 'Advance j to 3',
        desc: 'Inspect j=2 (val 8). Since 8 > 4, no swap. i stays at 0.'
      },
      {
        stepNum: 8,
        title: 'Step 8: Inspect j=3 (val 1) ➔ 1 <= 4 ➔ Increment i++ to 1',
        left: 1, right: 3,
        leftLabel: 'i=1', rightLabel: 'j=3',
        array: [2, 5, 8, 1, 4],
        computation: 'arr[3](1) <= 4 ➔ TRUE ✅, i++ = 1',
        comparison: '1 <= 4 (Match!)',
        action: 'Prepare Swap arr[1] ↔ arr[3]',
        desc: 'Inspect j=3 (val 1). Since 1 <= 4, increment i from 0 to 1.'
      },
      {
        stepNum: 9,
        title: 'Step 9: About to swap arr[i=1]=5 ↔ arr[j=3]=1',
        left: 1, right: 3,
        swapFrom: 1, swapTo: 3,
        leftLabel: 'i=1', rightLabel: 'j=3',
        array: [2, 5, 8, 1, 4],
        computation: 'arr[1]=5, arr[3]=1 — swapping',
        comparison: '1 <= 4 ➔ 🔄 Swap',
        action: 'Executing arr[1] ↔ arr[3]',
        desc: 'About to swap arr[i=1]=5 with arr[j=3]=1.'
      },
      {
        stepNum: 10,
        title: 'Step 10: Swap complete → Array is [2, 1, 8, 5, 4]',
        left: 1, right: 3,
        leftLabel: 'i=1 (val 1)', rightLabel: 'j=3 (val 5)',
        array: [2, 1, 8, 5, 4],
        computation: 'Swap arr[1] ↔ arr[3] ✅',
        comparison: 'Elements 5 and 1 swapped',
        action: 'Finish Partition Scan',
        isMatch: true,
        desc: 'Swap complete! Array transforms to [2, 1, 8, 5, 4]. Partition scan finished.'
      },
      {
        stepNum: 11,
        title: 'Step 11: Place Pivot ➔ About to swap arr[2]=8 ↔ arr[4]=4',
        left: 2, right: 4,
        swapFrom: 2, swapTo: 4,
        leftLabel: 'i+1=2', rightLabel: 'pivot=4',
        array: [2, 1, 8, 5, 4],
        computation: 'Place pivot into partition slot',
        comparison: 'Pivot Placement ➔ 🔄 Swap arr[2] ↔ arr[4]',
        action: 'Executing arr[2] ↔ arr[4]',
        desc: 'Partition loop ended. About to swap pivot arr[4]=4 with arr[i+1=2]=8 to lock pivot into its partition boundary.'
      },
      {
        stepNum: 12,
        title: 'Step 12: Pivot 4 Locked at Index 2 ➔ Array is [2, 1, 4, 5, 8]',
        left: 0, right: 4,
        leftLabel: 'left [2, 1]', rightLabel: 'right [5, 8]',
        array: [2, 1, 4, 5, 8],
        computation: 'Pivot 4 in correct final position ✅',
        comparison: 'Pivot 4 Locked at Index 2',
        action: 'Recurse on Left [2, 1]',
        isMatch: true,
        desc: 'Pivot 4 locked at index 2! Left subarray [2, 1] <= 4 and right subarray [5, 8] > 4.'
      },
      {
        stepNum: 13,
        title: 'Step 13: Recurse Left [2, 1] ➔ About to swap arr[0]=2 ↔ arr[1]=1',
        left: 0, right: 1,
        swapFrom: 0, swapTo: 1,
        leftLabel: 'arr[0]=2', rightLabel: 'pivot=1',
        array: [2, 1, 4, 5, 8],
        computation: 'Recurse left subarray [2, 1]',
        comparison: '2 > 1 ➔ 🔄 Swap arr[0] ↔ arr[1]',
        action: 'Executing arr[0] ↔ arr[1]',
        desc: 'Recurse on left subarray [2, 1]. Pick pivot=1. About to swap arr[0]=2 with arr[1]=1.'
      },
      {
        stepNum: 14,
        title: 'Step 14: Left Subarray Sorted ➔ [1, 2, 4, 5, 8]',
        left: 0, right: 1,
        leftLabel: 'sorted 1', rightLabel: 'sorted 2',
        array: [1, 2, 4, 5, 8],
        computation: 'Left partition sorted ✅',
        comparison: 'Left Partition [1, 2] Placed',
        action: 'Recurse on Right [5, 8]',
        isMatch: true,
        desc: 'Left partition [1, 2] sorted in-place! Array is [1, 2, 4, 5, 8].'
      },
      {
        stepNum: 15,
        title: 'Step 15: Recurse Right [5, 8] ➔ 5 <= 8 (Already Sorted)',
        left: 3, right: 4,
        leftLabel: 'arr[3]=5', rightLabel: 'pivot=8',
        array: [1, 2, 4, 5, 8],
        computation: '5 <= 8 ➔ In Order ✅',
        comparison: 'Right Partition [5, 8] Placed',
        action: 'Complete Sort',
        isMatch: true,
        desc: 'Recurse on right subarray [5, 8]. Pivot=8. 5 <= 8 is already in order. Right partition [5, 8] sorted in-place.'
      },
      {
        stepNum: 16,
        title: 'Step 16: Quick Sort Complete ➔ Sorted Array = [1, 2, 4, 5, 8] 🎉',
        left: 0, right: 4,
        leftLabel: 'start', rightLabel: 'end',
        array: [1, 2, 4, 5, 8],
        computation: 'Array = [1, 2, 4, 5, 8]',
        comparison: 'FULLY SORTED IN O(N log N) TIME 🎉',
        action: 'Return Sorted Array',
        isMatch: true,
        desc: 'Divide & conquer complete! Array [1, 2, 4, 5, 8] is fully sorted in O(N log N) average time! 🎉'
      }
    ]
  }
};
