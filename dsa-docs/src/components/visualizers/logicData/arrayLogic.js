import {
  ACCESS_STEPS,
  INSERT_STEPS,
  DELETE_STEPS,
  SEARCH_STEPS,
} from '../../../store/visualizers/arrayStore.js';

/**
 * Derive logic-tab steps from a store's step array.
 *
 * The alternative is a second, hand-written copy of every step that must stay
 * 1-to-1 with the store by discipline alone — the exact drift that left
 * arrays:access / insert / delete with a blank Core Logic diagram and pointed
 * arrays:search at SEARCHING's linear-search entry instead.
 *
 * Deriving makes the counts identical by construction. Narration fields the
 * store doesn't carry (title / computation / comparison / action) are built from
 * the fields it does.
 */
function fromStoreSteps(steps, { verb }) {
  return steps.map((s, i) => {
    const entries = Object.entries(s.state || {});
    const firstLine = String(s.desc || '').split(/(?<=[.:])\s/)[0].trim();
    return {
      ...s,
      stepNum: i + 1,
      title: firstLine || `Step ${i + 1}`,
      computation: entries.length
        ? entries.slice(0, 2).map(([k, v]) => `${k} = ${v}`).join(', ')
        : `${verb} step ${i + 1}`,
      comparison: entries.length > 2 ? `${entries[2][0]}: ${entries[2][1]}` : '—',
      action: i === steps.length - 1 ? `${verb} complete` : verb,
    };
  });
}

export const arrayLogic = {

  'arrays-access': {
    title: 'Array — Access by Index',
    input: 'arr = [10, 25, 42, 58, 73, 89], target index = 3',
    goal: 'Show why indexing is O(1): the address is computed from base + index x elementSize, with no traversal.',
    terms: {
      'Contiguous memory': 'Array elements sit in one unbroken block, so an index maps to an address by arithmetic rather than traversal.',
      'O(1) access': 'Address = base + index x elementSize, so element lookup costs the same regardless of array length.',
      'Shift cascade': 'Inserting or deleting anywhere but the end moves every following element, which is the O(n) in those operations.',
    },
    array: [10, 25, 42, 58, 73, 89],
    steps: fromStoreSteps(ACCESS_STEPS, { verb: 'Access' }),
  },

  'arrays-insert': {
    title: 'Array — Insertion at Index',
    input: 'arr = [10, 25, 42, 58, 73], insert 99 at index 2',
    goal: 'Show the shift cascade: every element from the insertion point rightwards moves one slot, making this O(n).',
    terms: {
      'Contiguous memory': 'Array elements sit in one unbroken block, so an index maps to an address by arithmetic rather than traversal.',
      'O(1) access': 'Address = base + index x elementSize, so element lookup costs the same regardless of array length.',
      'Shift cascade': 'Inserting or deleting anywhere but the end moves every following element, which is the O(n) in those operations.',
    },
    array: [10, 25, 42, 58, 73],
    steps: fromStoreSteps(INSERT_STEPS, { verb: 'Insert' }),
  },

  'arrays-delete': {
    title: 'Array — Deletion by Index',
    input: 'arr = [10, 25, 42, 58, 73], delete index 1',
    goal: 'Show the reverse cascade: removing an element pulls every following element left to close the gap.',
    terms: {
      'Contiguous memory': 'Array elements sit in one unbroken block, so an index maps to an address by arithmetic rather than traversal.',
      'O(1) access': 'Address = base + index x elementSize, so element lookup costs the same regardless of array length.',
      'Shift cascade': 'Inserting or deleting anywhere but the end moves every following element, which is the O(n) in those operations.',
    },
    array: [10, 25, 42, 58, 73],
    steps: fromStoreSteps(DELETE_STEPS, { verb: 'Delete' }),
  },

  'arrays-search': {
    title: 'Array — Linear Search',
    input: 'arr = [10, 25, 42, 58, 73], find 58',
    goal: 'Scan each index until the target is found. O(n) because an unsorted array offers nothing to skip ahead on.',
    terms: {
      'Contiguous memory': 'Array elements sit in one unbroken block, so an index maps to an address by arithmetic rather than traversal.',
      'O(1) access': 'Address = base + index x elementSize, so element lookup costs the same regardless of array length.',
      'Shift cascade': 'Inserting or deleting anywhere but the end moves every following element, which is the O(n) in those operations.',
    },
    array: [10, 25, 42, 58, 73],
    steps: fromStoreSteps(SEARCH_STEPS, { verb: 'Scan' }),
  },
  'arrays': {
    title: '1. Array Operations & Memory Layout',
    input: 'Array = [10, 25, 42, 58, 73, 89]',
    goal: 'Demonstrate random memory access, insertion, and deletion in contiguous memory.',
    terms: {
      'Index (i)': 'Zero-based memory offset within contiguous memory block.',
      'Address Formula': 'base_address + index * element_size giving O(1) random access.',
      'Contiguous Memory': 'Elements stored sequentially in adjacent RAM memory addresses.'
    },
    array: [10, 25, 42, 58, 73, 89],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Inspect Memory Layout & Target Index 3',
        left: 0,
        right: 0,
        array: [10, 25, 42, 58, 73, 89],
        computation: 'Base Address = 0x1000, Target Index = 3',
        comparison: 'Contiguous RAM Allocated',
        action: 'Calculate Offset',
        desc: 'Inspect array starting at Base Address 0x1000. Each integer occupies 4 bytes of contiguous RAM. Target index to access is 3.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Verify Element Data Size (4 Bytes per Integer)',
        left: 0,
        right: 0,
        array: [10, 25, 42, 58, 73, 89],
        computation: 'arr[0] at 0x1000 (4-byte int)',
        comparison: 'RAM Address Verified',
        action: 'Bounds Check',
        desc: 'Inspect array RAM allocation starting at Base Address 0x1000. Each integer element occupies 4 bytes in RAM.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Evaluate Bounds Check (0 <= Target Index 3 < 6 ✅)',
        left: 0,
        right: 3,
        array: [10, 25, 42, 58, 73, 89],
        computation: '0 <= 3 < 6 ➔ True',
        comparison: 'Valid Index Bounds ✅',
        action: 'Compute Offset',
        desc: 'Perform bounds check for target index 3. Verify condition 0 <= 3 < 6 (Valid array index ✅).'
      },
      {
        stepNum: 4,
        title: 'Step 4: Compute Memory Offset: 3 * 4 = 12 Bytes (0x0C)',
        left: 0,
        right: 3,
        array: [10, 25, 42, 58, 73, 89],
        computation: 'Offset = 3 * 4 = 12 bytes (0x0C)',
        comparison: 'Offset Calculated',
        action: 'Add to Base',
        desc: 'Calculate Memory Offset multiplier: Offset = Target_Index * Element_Size = 3 * 4 = 12 bytes (0x0C in hex).'
      },
      {
        stepNum: 5,
        title: 'Step 5: Dereference RAM Address 0x100C ➔ Target 58 Found! 🎉',
        left: 3,
        right: 3,
        array: [10, 25, 42, 58, 73, 89],
        computation: 'Target RAM Address = 0x1000 + 12 = 0x100C ➔ Val = 58',
        comparison: 'O(1) ACCESS COMPLETE 🎉',
        action: 'Return 58',
        isMatch: true,
        desc: 'Add offset 12 bytes to Base Address 0x1000. Access RAM address 0x100C directly. Retrieve value 58 in instant O(1) constant time!'
      }
    ]
  },

  'arrays-prefix-sum': {
    title: 'Prefix Sum Array & Range Query O(1)',
    input: 'Array = [2, 4, 1, 3, 5], Range [1..3]',
    goal: 'Precompute running totals to answer any range sum query L..R in O(1) time.',
    terms: {
      'Prefix Array': 'Precomputed array where prefixSum[i] = sum(arr[0..i]).',
      'Range Query Formula': 'prefixSum[R] - prefixSum[L-1] computes range sum L..R in O(1).'
    },
    array: [2, 4, 1, 3, 5],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Initialize prefix[0] = arr[0] = 2',
        left: 0, right: 0,
        array: [2, 4, 1, 3, 5],
        computation: 'prefix[0] = 2',
        comparison: 'Prefix Init',
        action: 'Compute prefix[1]',
        desc: 'Initialize prefix[0] = arr[0] = 2. Prefix array starts as [2, 0, 0, 0, 0].'
      },
      {
        stepNum: 2,
        title: 'Step 2: Compute prefix[1] = prefix[0] + arr[1] = 6',
        left: 0, right: 1,
        array: [2, 4, 1, 3, 5],
        computation: '2 + 4 = 6',
        comparison: 'prefix[1] = 6',
        action: 'Compute prefix[2]',
        desc: 'Compute prefix[1] = prefix[0] + arr[1] = 2 + 4 = 6. Prefix array becomes [2, 6, 0, 0, 0].'
      },
      {
        stepNum: 3,
        title: 'Step 3: Compute prefix[2] = prefix[1] + arr[2] = 7',
        left: 0, right: 2,
        array: [2, 4, 1, 3, 5],
        computation: '6 + 1 = 7',
        comparison: 'prefix[2] = 7',
        action: 'Compute prefix[3]',
        desc: 'Compute prefix[2] = prefix[1] + arr[2] = 6 + 1 = 7. Prefix array becomes [2, 6, 7, 0, 0].'
      },
      {
        stepNum: 4,
        title: 'Step 4: Compute prefix[3] = prefix[2] + arr[3] = 10',
        left: 0, right: 3,
        array: [2, 4, 1, 3, 5],
        computation: '7 + 3 = 10',
        comparison: 'prefix[3] = 10',
        action: 'Compute prefix[4]',
        desc: 'Compute prefix[3] = prefix[2] + arr[3] = 7 + 3 = 10. Prefix array becomes [2, 6, 7, 10, 0].'
      },
      {
        stepNum: 5,
        title: 'Step 5: Compute prefix[4] = prefix[3] + arr[4] = 15',
        left: 0, right: 4,
        array: [2, 4, 1, 3, 5],
        computation: '10 + 5 = 15',
        comparison: 'Full Prefix Ready',
        action: 'Receive Query',
        desc: 'Compute prefix[4] = prefix[3] + arr[4] = 10 + 5 = 15. Full prefix array ready: [2, 6, 7, 10, 15].'
      },
      {
        stepNum: 6,
        title: 'Step 6: Receive Range Query sum(L=1..R=3)',
        left: 1, right: 3,
        array: [2, 4, 1, 3, 5],
        computation: 'Target Range: [1..3]',
        comparison: 'Apply O(1) Formula',
        action: 'Substitute Values',
        desc: 'Receive range sum query sum(L=1..R=3). Apply formula rangeSum = prefix[R] - prefix[L-1].'
      },
      {
        stepNum: 7,
        title: 'Step 7: Substitute prefix[3] (10) - prefix[0] (2)',
        left: 1, right: 3,
        array: [2, 4, 1, 3, 5],
        computation: '10 - 2 = 8',
        comparison: 'Formula Evaluated',
        action: 'Finalize Result',
        desc: 'Substitute prefix values: prefix[3] (10) - prefix[0] (2) = 8.'
      },
      {
        stepNum: 8,
        title: 'Step 8: Compute Final Range Sum = 8',
        left: 1, right: 3,
        array: [2, 4, 1, 3, 5],
        computation: 'rangeSum = 8',
        comparison: 'Instant O(1) Answer',
        action: 'Return 8',
        desc: 'Calculate final result: Range Sum sum(1..3) = 8.'
      },
      {
        stepNum: 9,
        title: 'Step 9: Range Sum Query Complete in O(1) Time! 🎉',
        left: 1, right: 3,
        array: [2, 4, 1, 3, 5],
        computation: 'sum(1..3) = 8',
        comparison: 'RANGE SUM COMPUTED 🎉',
        action: 'Return 8',
        isMatch: true,
        desc: 'Range sum query sum(1..3) = 8 evaluated instantaneously in O(1) time! 🎉'
      }
    ]
  },

  'arrays-reverse': {
    title: 'In-Place Array Reversal O(N)',
    input: 'Array = [1, 2, 3, 4, 5]',
    goal: 'Reverse array in-place by swapping opposite elements with two converging pointers.',
    terms: {
      'L (Left Pointer)': 'Starts at index 0. Advances right (L++).',
      'R (Right Pointer)': 'Starts at index N-1. Decrements left (R--).',
      'In-Place Swap': 'Swaps arr[L] and arr[R] without extra space.'
    },
    array: [1, 2, 3, 4, 5],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Init L=0 (val 1) and R=4 (val 5)',
        left: 0, right: 4,
        array: [1, 2, 3, 4, 5],
        computation: 'L = 0, R = 4',
        comparison: 'Condition L < R (0 < 4)',
        action: 'Check loop condition',
        desc: 'Initialize Left pointer L = 0 (val 1) and Right pointer R = 4 (val 5). Check condition L < R (0 < 4 holds true).'
      },
      {
        stepNum: 2,
        title: 'Step 2: Verify Condition L < R (0 < 4 ✅)',
        left: 0, right: 4,
        array: [1, 2, 3, 4, 5],
        computation: '0 < 4 ➔ True',
        comparison: 'Loop Condition Holds',
        action: 'Prepare swap arr[0] ↔ arr[4]',
        desc: 'Check condition L < R (0 < 4 holds true). Prepare to swap outer elements at indices 0 and 4.'
      },
      {
        stepNum: 3,
        title: 'Step 3: About to swap arr[0]=1 ↔ arr[4]=5',
        left: 0, right: 4,
        array: [1, 2, 3, 4, 5],
        computation: 'arr[0]=1, arr[4]=5 — swapping',
        comparison: '🔄 Swap in progress',
        action: 'Executing arr[0] ↔ arr[4]',
        desc: 'About to swap arr[0]=1 and arr[4]=5. The arc visualizes the two elements that will exchange positions.'
      },
      {
        stepNum: 4,
        title: 'Step 3b: Swap complete → Array is [5, 2, 3, 4, 1]',
        left: 0, right: 4,
        array: [5, 2, 3, 4, 1],
        computation: 'Swap arr[0] ↔ arr[4] ✅',
        comparison: 'Outer Elements Swapped',
        action: 'Advance L++, R--',
        desc: 'Swap complete. Array is now [5, 2, 3, 4, 1]. Advance pointers inward.'
      },
      {
        stepNum: 5,
        title: 'Step 4: Advance Pointers (L=1, R=3)',
        left: 1, right: 3,
        array: [5, 2, 3, 4, 1],
        computation: 'L = 1, R = 3',
        comparison: 'Pointers Converged',
        action: 'Check Condition',
        desc: 'Advance pointers: Increment L to 1, decrement R to 3.'
      },
      {
        stepNum: 6,
        title: 'Step 5: Verify Condition L < R (1 < 3 ✅)',
        left: 1, right: 3,
        array: [5, 2, 3, 4, 1],
        computation: '1 < 3 ➔ True',
        comparison: 'Loop Condition Holds',
        action: 'Prepare swap arr[1] ↔ arr[3]',
        desc: 'Inspect pointers L = 1 (val 2) and R = 3 (val 4). Check condition L < R (1 < 3 holds true).'
      },
      {
        stepNum: 7,
        title: 'Step 6: About to swap arr[1]=2 ↔ arr[3]=4',
        left: 1, right: 3,
        array: [5, 2, 3, 4, 1],
        computation: 'arr[1]=2, arr[3]=4 — swapping',
        comparison: '🔄 Swap in progress',
        action: 'Executing arr[1] ↔ arr[3]',
        desc: 'About to swap arr[1]=2 and arr[3]=4. The arc visualizes the two elements that will exchange positions.'
      },
      {
        stepNum: 8,
        title: 'Step 6b: Swap complete → Array is [5, 4, 3, 2, 1]',
        left: 1, right: 3,
        array: [5, 4, 3, 2, 1],
        computation: 'Swap arr[1] ↔ arr[3] ✅',
        comparison: 'Inner Elements Swapped',
        action: 'Advance L++, R--',
        desc: 'Swap complete. Array is now [5, 4, 3, 2, 1]. Advance pointers inward.'
      },
      {
        stepNum: 9,
        title: 'Step 7: Advance Pointers (L=2, R=2)',
        left: 2, right: 2,
        array: [5, 4, 3, 2, 1],
        computation: 'L = 2, R = 2',
        comparison: 'Pointers Meet at Center',
        action: 'Check Termination',
        desc: 'Advance pointers: Increment L to 2, decrement R to 2.'
      },
      {
        stepNum: 10,
        title: 'Step 8: Verify Condition L < R (2 < 2 ❌ STOP)',
        left: 2, right: 2,
        array: [5, 4, 3, 2, 1],
        computation: 'L >= R (2 >= 2)',
        comparison: 'Loop Condition False ❌',
        action: 'Terminate Loop',
        desc: 'Pointers meet at center index L = 2, R = 2. Condition L < R evaluates to False. Loop terminates.'
      },
      {
        stepNum: 11,
        title: 'Step 9: In-Place Array Reversal Complete! 🎉',
        left: 2, right: 2,
        array: [5, 4, 3, 2, 1],
        computation: 'Array = [5, 4, 3, 2, 1]',
        comparison: 'ARRAY FULLY REVERSED 🎉',
        action: 'Return Array',
        isMatch: true,
        desc: 'Array fully reversed in-place to [5, 4, 3, 2, 1] in O(N/2) swaps! 🎉'
      }
    ]
  },

  'arrays-kadane': {
    title: "7. Kadane's Algorithm — Maximum Subarray Sum",
    input: 'arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]',
    goal: 'Find the contiguous subarray with the largest sum in O(n) time and O(1) space by discarding negative prefixes.',
    terms: {
      'currentSum': 'Running sum of active subarray window [L..R]. Resets to arr[i] whenever extending previous sum is negative.',
      'maxSum': 'Global maximum contiguous subarray sum found so far across all indices.',
      'Discard Prefix': 'A negative running sum will decrease the sum of any subsequent subarray. Drop it immediately and start fresh.',
    },
    array: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    steps: [
      {
        stepNum: 1, title: 'Step 1: Init currentSum = maxSum = arr[0] = -2',
        left: 0, right: 0, index: 0,
        subStart: 0, subEnd: 0, maxStart: 0, maxEnd: 0,
        array: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
        computation: 'currentSum = -2, maxSum = -2',
        comparison: 'Initial element arr[0] = -2',
        action: 'Start Kadane loop',
        desc: 'Initialize currentSum and maxSum with the first element arr[0] = -2. Active window is [0..0] (value -2).'
      },
      {
        stepNum: 2, title: 'Step 2: i=1 (val 1) ➔ max(-2+1, 1) = 1 ➔ Discard prefix & reset window',
        left: 1, right: 1, index: 1,
        subStart: 1, subEnd: 1, maxStart: 1, maxEnd: 1,
        array: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
        computation: 'currentSum = max(-1, 1) = 1, maxSum = max(-2, 1) = 1',
        comparison: 'Previous prefix (-2) was negative ➔ DISCARD & RESET',
        action: 'Reset window [1..1] (val 1)',
        desc: 'At i=1, arr[1]=1. -2 + 1 = -1 < 1. Starting a fresh subarray at index 1 gives a higher sum. Reset window to [1..1]. New global maxSum = 1.'
      },
      {
        stepNum: 3, title: 'Step 3: i=2 (val -3) ➔ Extend window [1..2] ➔ currentSum = -2',
        left: 1, right: 2, index: 2,
        subStart: 1, subEnd: 2, maxStart: 1, maxEnd: 1,
        array: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
        computation: 'currentSum = 1 + (-3) = -2, maxSum = 1',
        comparison: 'currentSum drops to -2; maxSum remains 1',
        action: 'Extend window [1..2]',
        desc: 'At i=2, arr[2]=-3. Extend window to [1..2] (values [1, -3]). currentSum becomes -2. Best subarray remains [1..1] with sum = 1.'
      },
      {
        stepNum: 4, title: 'Step 4: i=3 (val 4) ➔ max(-2+4, 4) = 4 ➔ Discard prefix & reset window',
        left: 3, right: 3, index: 3,
        subStart: 3, subEnd: 3, maxStart: 3, maxEnd: 3,
        array: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
        computation: 'currentSum = max(2, 4) = 4, maxSum = max(1, 4) = 4',
        comparison: 'Discard negative prefix (-2) ➔ Start fresh at index 3',
        action: 'Reset window [3..3] (val 4)',
        desc: 'At i=3, arr[3]=4. Starting fresh at index 3 yields 4, beating extending -2. Reset window to [3..3]. New global maxSum = 4!'
      },
      {
        stepNum: 5, title: 'Step 5: i=4 (val -1) ➔ Extend window [3..4] ➔ currentSum = 3',
        left: 3, right: 4, index: 4,
        subStart: 3, subEnd: 4, maxStart: 3, maxEnd: 3,
        array: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
        computation: 'currentSum = 4 + (-1) = 3, maxSum = 4',
        comparison: 'currentSum (3) > 0 ➔ Keep extending window',
        action: 'Extend window [3..4]',
        desc: 'At i=4, arr[4]=-1. Extend window to [3..4] (values [4, -1]). currentSum = 3. Since currentSum > 0, we continue extending. maxSum stays 4.'
      },
      {
        stepNum: 6, title: 'Step 6: i=5 (val 2) ➔ Extend window [3..5] ➔ currentSum = 5 ➔ New Max!',
        left: 3, right: 5, index: 5,
        subStart: 3, subEnd: 5, maxStart: 3, maxEnd: 5,
        array: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
        computation: 'currentSum = 3 + 2 = 5, maxSum = max(4, 5) = 5',
        comparison: 'New peak sum: 5 (window [3..5])',
        action: 'Update maxSum = 5',
        desc: 'At i=5, arr[5]=2. Extend window to [3..5] (values [4, -1, 2]). currentSum rises to 5! New global maximum sum: 5.'
      },
      {
        stepNum: 7, title: 'Step 7: i=6 (val 1) ➔ Extend window [3..6] ➔ currentSum = 6 ➔ Peak Max!',
        left: 3, right: 6, index: 6,
        subStart: 3, subEnd: 6, maxStart: 3, maxEnd: 6,
        array: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
        computation: 'currentSum = 5 + 1 = 6, maxSum = max(5, 6) = 6',
        comparison: 'Global peak subarray sum: 6',
        action: 'Update maxSum = 6 🎉',
        isMatch: true,
        desc: 'At i=6, arr[6]=1. Extend window to [3..6] (values [4, -1, 2, 1]). currentSum reaches peak 6! Optimal subarray [4, -1, 2, 1] found!'
      },
      {
        stepNum: 8, title: 'Step 8: i=7 (val -5) ➔ Extend window [3..7] ➔ currentSum = 1',
        left: 3, right: 7, index: 7,
        subStart: 3, subEnd: 7, maxStart: 3, maxEnd: 6,
        array: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
        computation: 'currentSum = 6 + (-5) = 1, maxSum stays 6',
        comparison: 'currentSum drops to 1; global maxSum stays 6',
        action: 'Extend window [3..7]',
        desc: 'At i=7, arr[7]=-5. Extend window to [3..7]. currentSum drops to 1. Global maximum remains 6 (best window [3..6]).'
      },
      {
        stepNum: 9, title: 'Step 9: i=8 (val 4) ➔ Traversal Complete ➔ Optimal MaxSum = 6 🎉',
        left: 3, right: 6, index: 8,
        subStart: 3, subEnd: 8, maxStart: 3, maxEnd: 6,
        array: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
        computation: 'currentSum = 1 + 4 = 5 < 6, maxSum = 6',
        comparison: 'KADANE OPTIMAL SUBARRAY: [4, -1, 2, 1] 🎉',
        action: 'Return maxSum = 6',
        isMatch: true,
        desc: 'Single pass O(n) scan finished! Optimal contiguous subarray is [4, -1, 2, 1] (indices [3..6]) with maximum sum = 6! 🎉'
      }
    ]
  },

  'arrays-buy-sell-stock': {
    title: '8. Best Time to Buy and Sell Stock',
    input: 'prices = [7, 1, 5, 3, 6, 4]',
    goal: 'Find maximum single-transaction profit in O(n) time by maintaining running minPrice.',
    terms: {
      'minPrice': 'Lowest buy price seen from day 0 up to current day.',
      'profitToday': 'Profit if bought at minPrice and sold today: prices[i] - minPrice.',
      'maxProfit': 'Maximum profit recorded across all possible sell days.',
    },
    array: [7, 1, 5, 3, 6, 4],
    steps: [
      {
        stepNum: 1, title: 'Step 1: Day 0 (price 7) ➔ minPrice=7, maxProfit=0',
        index: 0,
        array: [7, 1, 5, 3, 6, 4],
        computation: 'minPrice = 7, maxProfit = 0',
        comparison: 'Initial state',
        action: 'Start daily scan',
        desc: 'Initialize minPrice = prices[0] = 7 and maxProfit = 0.'
      },
      {
        stepNum: 2, title: 'Step 2: Day 1 (price 1) ➔ New lowest buy price: minPrice=1',
        index: 1,
        array: [7, 1, 5, 3, 6, 4],
        computation: 'minPrice = min(7, 1) = 1, profit = 0',
        comparison: '1 < 7 ➔ New lowest buy day found!',
        action: 'Update minPrice = 1',
        desc: 'Price drops to 1. Best buy day shifts to Day 1. No profit yet.'
      },
      {
        stepNum: 3, title: 'Step 3: Day 2 (price 5) ➔ Profit = 5 - 1 = 4 ➔ New maxProfit=4',
        index: 2,
        array: [7, 1, 5, 3, 6, 4],
        computation: 'profit = 5 - 1 = 4, maxProfit = max(0, 4) = 4',
        comparison: 'Buy @ 1, Sell @ 5 ➔ Profit +4',
        action: 'Update maxProfit = 4',
        desc: 'Selling on Day 2 yields 5 - 1 = 4 profit. maxProfit updated to 4.'
      },
      {
        stepNum: 4, title: 'Step 4: Day 3 (price 3) ➔ Profit = 3 - 1 = 2 < 4',
        index: 3,
        array: [7, 1, 5, 3, 6, 4],
        computation: 'profit = 3 - 1 = 2, maxProfit stays 4',
        comparison: 'Profit 2 < maxProfit 4',
        action: 'Keep maxProfit = 4',
        desc: 'Selling on Day 3 yields 2 profit. maxProfit remains 4.'
      },
      {
        stepNum: 5, title: 'Step 5: Day 4 (price 6) ➔ Profit = 6 - 1 = 5 ➔ Peak maxProfit=5!',
        index: 4,
        array: [7, 1, 5, 3, 6, 4],
        computation: 'profit = 6 - 1 = 5, maxProfit = max(4, 5) = 5',
        comparison: 'Buy @ 1, Sell @ 6 ➔ Profit +5 🎉',
        action: 'Update maxProfit = 5',
        isMatch: true,
        desc: 'Selling on Day 4 yields 6 - 1 = 5 profit. Peak profit = 5!'
      },
      {
        stepNum: 6, title: 'Step 6: Day 5 (price 4) ➔ Final maxProfit = 5 🎉',
        index: 5,
        array: [7, 1, 5, 3, 6, 4],
        computation: 'profit = 4 - 1 = 3 < 5, maxProfit = 5',
        comparison: 'SCAN COMPLETE 🎉',
        action: 'Return 5',
        isMatch: true,
        desc: 'All days evaluated in O(n) single pass. Maximum profit is 5 (Buy @ 1 on Day 1, Sell @ 6 on Day 4). 🎉'
      }
    ]
  },

  'arrays-product-except-self': {
    title: '9. Product of Array Except Self',
    input: 'nums = [1, 2, 3, 4]',
    goal: 'Compute answer[i] = product of all elements except nums[i] in O(n) time without division.',
    terms: {
      'Prefix pass': 'answer[i] stores product of all elements to the left of i.',
      'Suffix multiplier': 'Running product of elements to the right of i, multiplied into answer[i] on the reverse pass.',
      'No division': 'Achieves O(n) time and O(1) auxiliary space without arithmetic division.',
    },
    array: [1, 2, 3, 4],
    steps: [
      {
        stepNum: 1, title: 'Step 1: Init answer[0] = 1, prefixProd = 1',
        index: 0,
        array: [1, 2, 3, 4],
        computation: 'answer = [1, ?, ?, ?], prefixProd = 1',
        comparison: 'Start prefix pass (left ➔ right)',
        action: 'Initialize output array',
        desc: 'Initialize answer[0] = 1 because there are no elements to the left of index 0.'
      },
      {
        stepNum: 2, title: 'Step 2: Left pass computes prefix products: [1, 1, 2, 6]',
        index: 3,
        array: [1, 2, 3, 4],
        computation: 'answer[1]=1, answer[2]=2, answer[3]=6',
        comparison: 'Left prefix products complete',
        action: 'Prepare suffix pass',
        desc: 'Prefix products: answer[0]=1, answer[1]=1, answer[2]=1*2=2, answer[3]=1*2*3=6.'
      },
      {
        stepNum: 3, title: 'Step 3: Suffix pass starts at i=3 with suffix = 1',
        index: 3,
        array: [1, 2, 3, 4],
        computation: 'answer[3] = 6 * 1 = 6, suffix = 1 * 4 = 4',
        comparison: 'Rightmost element has suffix 1',
        action: 'Update suffix = 4',
        desc: 'answer[3] = 6 * 1 = 6. Update running suffix product with nums[3]=4: suffix = 4.'
      },
      {
        stepNum: 4, title: 'Step 4: i=2 ➔ answer[2] = 2 * 4 = 8, suffix = 4 * 3 = 12',
        index: 2,
        array: [1, 2, 3, 4],
        computation: 'answer[2] = 2 * 4 = 8, suffix = 12',
        comparison: 'answer[2] gets left(2) * right(4) = 8',
        action: 'Update suffix = 12',
        desc: 'answer[2] = 2 * 4 = 8. Update suffix with nums[2]=3: suffix = 12.'
      },
      {
        stepNum: 5, title: 'Step 5: i=1 ➔ answer[1] = 1 * 12 = 12, suffix = 12 * 2 = 24',
        index: 1,
        array: [1, 2, 3, 4],
        computation: 'answer[1] = 1 * 12 = 12, suffix = 24',
        comparison: 'answer[1] gets left(1) * right(12) = 12',
        action: 'Update suffix = 24',
        desc: 'answer[1] = 1 * 12 = 12. Update suffix with nums[1]=2: suffix = 24.'
      },
      {
        stepNum: 6, title: 'Step 6: i=0 ➔ answer[0] = 1 * 24 = 24 ➔ Result: [24, 12, 8, 6] 🎉',
        index: 0,
        array: [1, 2, 3, 4],
        computation: 'answer[0] = 1 * 24 = 24 ➔ Final: [24, 12, 8, 6]',
        comparison: 'PRODUCT EXCEPT SELF COMPLETE 🎉',
        action: 'Return [24, 12, 8, 6]',
        isMatch: true,
        desc: 'All elements computed without division in two linear passes O(n). Result: [24, 12, 8, 6]. 🎉'
      }
    ]
  },

  'arrays-rotate-array': {
    title: '10. Rotate Array by K Steps',
    input: 'arr = [1, 2, 3, 4, 5, 6, 7], k = 3',
    goal: 'Rotate array right by k positions in-place in O(n) time and O(1) extra memory using the 3-reversal algorithm.',
    terms: {
      'k = k % n': 'Effective rotation steps (handles k >= array length).',
      'Stage 1 (Reverse All)': 'Reverses entire array [0..n-1] to invert global order.',
      'Stage 2 (Reverse first k)': 'Reverses [0..k-1] to restore correct order of rotated prefix.',
      'Stage 3 (Reverse rest)': 'Reverses [k..n-1] to restore correct order of suffix.',
    },
    array: [1, 2, 3, 4, 5, 6, 7],
    steps: [
      {
        stepNum: 1, title: 'Step 1: Init ➔ 3-Step Reversal Algorithm (k = 3 % 7 = 3)',
        left: 0, right: 6,
        leftLabel: 'start=0', rightLabel: 'end=6',
        array: [1, 2, 3, 4, 5, 6, 7],
        computation: 'k = 3 % 7 = 3, n = 7',
        comparison: 'Input array ready',
        action: 'Begin 3-step reversal',
        desc: 'Rotating right by K=3 in-place: (1) Reverse all [0..6] → (2) Reverse first K=3 [0..2] → (3) Reverse rest [3..6].'
      },
      {
        stepNum: 2, title: 'Step 2: Stage 1 (Reverse All) ➔ About to swap arr[0]=1 ↔ arr[6]=7',
        left: 0, right: 6,
        swapFrom: 0, swapTo: 6,
        leftLabel: 'L=0 (val 1)', rightLabel: 'R=6 (val 7)',
        array: [1, 2, 3, 4, 5, 6, 7],
        computation: 'L=0, R=6 — Stage 1 Reversal',
        comparison: 'About to swap outer pair',
        action: 'Executing arr[0] ↔ arr[6]',
        desc: 'Stage 1 (Reverse All): Left=0 (val 1) and Right=6 (val 7). About to swap arr[0] and arr[6].'
      },
      {
        stepNum: 3, title: 'Step 3: Stage 1 ➔ Swap complete ➔ [7, 2, 3, 4, 5, 6, 1]',
        left: 0, right: 6,
        leftLabel: 'L=0 (val 7)', rightLabel: 'R=6 (val 1)',
        array: [7, 2, 3, 4, 5, 6, 1],
        computation: 'Swap arr[0] ↔ arr[6] ✅',
        comparison: 'Outer elements swapped',
        action: 'Advance L++ to 1, R-- to 5',
        isMatch: true,
        desc: 'Swap complete! Array becomes [7, 2, 3, 4, 5, 6, 1]. Advance L++ and R--.'
      },
      {
        stepNum: 4, title: 'Step 4: Stage 1 ➔ About to swap arr[1]=2 ↔ arr[5]=6',
        left: 1, right: 5,
        swapFrom: 1, swapTo: 5,
        leftLabel: 'L=1 (val 2)', rightLabel: 'R=5 (val 6)',
        array: [7, 2, 3, 4, 5, 6, 1],
        computation: 'L=1, R=5 — Stage 1 Reversal',
        comparison: 'About to swap pair [1] ↔ [5]',
        action: 'Executing arr[1] ↔ arr[5]',
        desc: 'Stage 1 (Reverse All): Left=1 (val 2) and Right=5 (val 6). About to swap arr[1] and arr[5].'
      },
      {
        stepNum: 5, title: 'Step 5: Stage 1 ➔ Swap complete ➔ [7, 6, 3, 4, 5, 2, 1]',
        left: 1, right: 5,
        leftLabel: 'L=1 (val 6)', rightLabel: 'R=5 (val 2)',
        array: [7, 6, 3, 4, 5, 2, 1],
        computation: 'Swap arr[1] ↔ arr[5] ✅',
        comparison: 'Elements 2 and 6 swapped',
        action: 'Advance L++ to 2, R-- to 4',
        isMatch: true,
        desc: 'Swap complete! Array becomes [7, 6, 3, 4, 5, 2, 1]. Advance L++ and R--.'
      },
      {
        stepNum: 6, title: 'Step 6: Stage 1 ➔ About to swap arr[2]=3 ↔ arr[4]=5',
        left: 2, right: 4,
        swapFrom: 2, swapTo: 4,
        leftLabel: 'L=2 (val 3)', rightLabel: 'R=4 (val 5)',
        array: [7, 6, 3, 4, 5, 2, 1],
        computation: 'L=2, R=4 — Stage 1 Reversal',
        comparison: 'About to swap pair [2] ↔ [4]',
        action: 'Executing arr[2] ↔ arr[4]',
        desc: 'Stage 1 (Reverse All): Left=2 (val 3) and Right=4 (val 5). About to swap arr[2] and arr[4].'
      },
      {
        stepNum: 7, title: 'Step 7: Stage 1 Complete ➔ Array is [7, 6, 5, 4, 3, 2, 1]',
        left: 3, right: 3,
        leftLabel: 'center', rightLabel: 'center',
        array: [7, 6, 5, 4, 3, 2, 1],
        computation: 'reverse(arr, 0, 6) Complete ✅',
        comparison: 'All elements inverted',
        action: 'Start Stage 2: Reverse first K=3',
        isMatch: true,
        desc: 'Pointers meet at center index 3. Stage 1 Complete! Array is [7, 6, 5, 4, 3, 2, 1]. Now reverse first K=3 elements [0..2].'
      },
      {
        stepNum: 8, title: 'Step 8: Stage 2 (Reverse first K=3 [0..2]) ➔ About to swap arr[0]=7 ↔ arr[2]=5',
        left: 0, right: 2,
        swapFrom: 0, swapTo: 2,
        leftLabel: 'L=0 (val 7)', rightLabel: 'R=2 (val 5)',
        array: [7, 6, 5, 4, 3, 2, 1],
        computation: 'reverse(arr, 0, 2)',
        comparison: 'About to restore rotated prefix',
        action: 'Executing arr[0] ↔ arr[2]',
        desc: 'Stage 2 (Reverse first K=3): Left=0 (val 7) and Right=2 (val 5). About to swap arr[0] and arr[2].'
      },
      {
        stepNum: 9, title: 'Step 9: Stage 2 Complete ➔ Rotated Prefix Restored: [5, 6, 7, 4, 3, 2, 1]',
        left: 1, right: 1,
        leftLabel: 'prefix [5, 6, 7]', rightLabel: 'prefix [5, 6, 7]',
        array: [5, 6, 7, 4, 3, 2, 1],
        computation: 'reverse(arr, 0, 2) Complete ✅',
        comparison: 'Prefix [5, 6, 7] placed correctly',
        action: 'Start Stage 3: Reverse rest [3..6]',
        isMatch: true,
        desc: 'Swap complete! First 3 elements [0..2] reversed to [5, 6, 7]. Rotated prefix is now in correct order! Now reverse remaining elements [3..6].'
      },
      {
        stepNum: 10, title: 'Step 10: Stage 3 (Reverse rest [3..6]) ➔ About to swap arr[3]=4 ↔ arr[6]=1',
        left: 3, right: 6,
        swapFrom: 3, swapTo: 6,
        leftLabel: 'L=3 (val 4)', rightLabel: 'R=6 (val 1)',
        array: [5, 6, 7, 4, 3, 2, 1],
        computation: 'reverse(arr, 3, 6)',
        comparison: 'About to swap pair [3] ↔ [6]',
        action: 'Executing arr[3] ↔ arr[6]',
        desc: 'Stage 3 (Reverse remaining elements [3..6]): Left=3 (val 4) and Right=6 (val 1). About to swap arr[3] and arr[6].'
      },
      {
        stepNum: 11, title: 'Step 11: Stage 3 ➔ Swap complete ➔ [5, 6, 7, 1, 3, 2, 4]',
        left: 3, right: 6,
        leftLabel: 'L=3 (val 1)', rightLabel: 'R=6 (val 4)',
        array: [5, 6, 7, 1, 3, 2, 4],
        computation: 'Swap arr[3] ↔ arr[6] ✅',
        comparison: 'Elements 4 and 1 swapped',
        action: 'Advance L++ to 4, R-- to 5',
        isMatch: true,
        desc: 'Swap complete! Array becomes [5, 6, 7, 1, 3, 2, 4]. Advance L++ to 4, decrement R-- to 5.'
      },
      {
        stepNum: 12, title: 'Step 12: Stage 3 ➔ About to swap arr[4]=3 ↔ arr[5]=2',
        left: 4, right: 5,
        swapFrom: 4, swapTo: 5,
        leftLabel: 'L=4 (val 3)', rightLabel: 'R=5 (val 2)',
        array: [5, 6, 7, 1, 3, 2, 4],
        computation: 'reverse(arr, 3, 6)',
        comparison: 'About to swap pair [4] ↔ [5]',
        action: 'Executing arr[4] ↔ arr[5]',
        desc: 'Stage 3 (Reverse remaining elements [3..6]): Left=4 (val 3) and Right=5 (val 2). About to swap arr[4] and arr[5].'
      },
      {
        stepNum: 13, title: 'Step 13: Stage 3 Complete ➔ Suffix Restored: [5, 6, 7, 1, 2, 3, 4]',
        left: 4, right: 5,
        leftLabel: 'suffix [1, 2, 3, 4]', rightLabel: 'suffix [1, 2, 3, 4]',
        array: [5, 6, 7, 1, 2, 3, 4],
        computation: 'reverse(arr, 3, 6) Complete ✅',
        comparison: 'Suffix [1, 2, 3, 4] placed correctly',
        action: 'Complete Rotation',
        isMatch: true,
        desc: 'Swap complete! Suffix [3..6] reversed to [1, 2, 3, 4]. Array is now [5, 6, 7, 1, 2, 3, 4].'
      },
      {
        stepNum: 14, title: 'Step 14: Rotation Complete ➔ [5, 6, 7, 1, 2, 3, 4] 🎉',
        left: 0, right: 6,
        leftLabel: 'start', rightLabel: 'end',
        array: [5, 6, 7, 1, 2, 3, 4],
        computation: 'Array = [5, 6, 7, 1, 2, 3, 4]',
        comparison: 'ROTATION COMPLETE IN O(N) TIME 🎉',
        action: 'Return [5, 6, 7, 1, 2, 3, 4]',
        isMatch: true,
        desc: 'Rotate Array by K=3 complete in O(n) time and O(1) space! Final array: [5, 6, 7, 1, 2, 3, 4]! 🎉'
      }
    ]
  },

  'arrays-majority-element': {
    title: '11. Majority Element (Boyer-Moore Voting)',
    input: 'arr = [3, 2, 3, 1, 3, 2, 3]',
    goal: 'Find element occurring > n/2 times in O(n) time and O(1) space via vote cancellation.',
    terms: {
      'candidate': 'Current surviving element candidate for majority.',
      'count': 'Vote balance: increments on matching element, decrements on differing element.',
      'Boyer-Moore Invariant': 'Since majority appears > n/2 times, its count strictly exceeds all others combined and must survive.',
    },
    array: [3, 2, 3, 1, 3, 2, 3],
    steps: [
      {
        stepNum: 1, title: 'Step 1: Init candidate = arr[0] = 3, count = 1',
        index: 0,
        array: [3, 2, 3, 1, 3, 2, 3],
        computation: 'candidate = 3, count = 1',
        comparison: 'Init with first element',
        action: 'Start voting scan',
        desc: 'Set candidate = arr[0] = 3 with count = 1.'
      },
      {
        stepNum: 2, title: 'Step 2: i=1 (val 2) ≠ 3 ➔ count decrements to 0 (pair cancels)',
        index: 1,
        array: [3, 2, 3, 1, 3, 2, 3],
        computation: 'arr[1]=2 ≠ candidate(3) ➔ count = 0',
        comparison: '3 and 2 cancel each other out',
        action: 'count = 0',
        desc: 'Element 2 disagrees with candidate 3. Decrement count to 0. Pair (3, 2) cancels.'
      },
      {
        stepNum: 3, title: 'Step 3: i=2 (val 3) ➔ count was 0 ➔ New candidate = 3, count = 1',
        index: 2,
        array: [3, 2, 3, 1, 3, 2, 3],
        computation: 'count==0 ➔ candidate = 3, count = 1',
        comparison: 'New candidate elected',
        action: 'Elect candidate = 3',
        desc: 'Count was 0, so element arr[2]=3 becomes the new candidate with count = 1.'
      },
      {
        stepNum: 4, title: 'Step 4: i=3 (val 1) ≠ 3 ➔ count = 0 (pair cancels)',
        index: 3,
        array: [3, 2, 3, 1, 3, 2, 3],
        computation: 'arr[3]=1 ≠ candidate(3) ➔ count = 0',
        comparison: '3 and 1 cancel each other out',
        action: 'count = 0',
        desc: 'Element 1 disagrees with candidate 3. Decrement count to 0.'
      },
      {
        stepNum: 5, title: 'Step 5: i=4 (val 3) ➔ candidate = 3, count = 1',
        index: 4,
        array: [3, 2, 3, 1, 3, 2, 3],
        computation: 'count==0 ➔ candidate = 3, count = 1',
        comparison: 'Elect candidate = 3',
        action: 'Elect candidate = 3',
        desc: 'Count was 0. Candidate set to arr[4]=3, count = 1.'
      },
      {
        stepNum: 6, title: 'Step 6: i=5..6 ➔ Majority Element = 3 (appears 4/7 times) 🎉',
        index: 6,
        array: [3, 2, 3, 1, 3, 2, 3],
        computation: 'i=5: count=0; i=6: candidate=3, count=1',
        comparison: 'MAJORITY ELEMENT = 3 🎉',
        action: 'Return 3',
        isMatch: true,
        desc: 'Scan complete. Candidate 3 survives with positive vote balance. Majority element is 3 (appears 4 times > 7/2). 🎉'
      }
    ]
  },

  'arrays-merge-intervals': {
    title: '12. Merge Overlapping Intervals',
    input: 'intervals = [[1,3], [2,6], [8,10], [15,18]]',
    goal: 'Merge all overlapping intervals after sorting start times in O(n log n).',
    terms: {
      'Sort by start time': 'Ensures any potential overlap occurs between adjacent intervals in the sorted sequence.',
      'Overlap condition': 'next.start <= current.end ➔ Merge by extending current.end = max(current.end, next.end).',
      'No overlap': 'next.start > current.end ➔ Push current to result and start new interval with next.',
    },
    array: [1, 3, 2, 6, 8, 10, 15, 18],
    steps: [
      {
        stepNum: 1, title: 'Step 1: Sort intervals by start time ➔ [[1,3], [2,6], [8,10], [15,18]]',
        index: 0,
        array: [1, 3, 2, 6, 8, 10, 15, 18],
        computation: 'Sort by start time. current = [1,3]',
        comparison: 'Sorted sequence ready',
        action: 'Init result with [1,3]',
        desc: 'Sort intervals by start time. First interval [1,3] becomes current.'
      },
      {
        stepNum: 2, title: 'Step 2: Check [1,3] vs [2,6] ➔ 2 <= 3 ➔ OVERLAP! Merge to [1,6]',
        index: 2,
        array: [1, 3, 2, 6, 8, 10, 15, 18],
        computation: 'next.start(2) <= current.end(3) ➔ current.end = max(3, 6) = 6',
        comparison: 'Overlap detected ➔ merge',
        action: 'Extend current = [1,6]',
        desc: '2 <= 3, intervals overlap! Extend end to max(3,6)=6. Merged interval is [1,6].'
      },
      {
        stepNum: 3, title: 'Step 3: Check [1,6] vs [8,10] ➔ 8 > 6 ➔ NO OVERLAP ➔ Push [1,6]',
        index: 4,
        array: [1, 3, 2, 6, 8, 10, 15, 18],
        computation: '8 > 6 ➔ Push [1,6] to result, new current = [8,10]',
        comparison: 'Gap between 6 and 8',
        action: 'Push [1,6], current = [8,10]',
        desc: '8 > 6, no overlap. Push [1,6] to result. New interval [8,10] becomes current.'
      },
      {
        stepNum: 4, title: 'Step 4: Check [8,10] vs [15,18] ➔ 15 > 10 ➔ Push [8,10], current = [15,18]',
        index: 6,
        array: [1, 3, 2, 6, 8, 10, 15, 18],
        computation: '15 > 10 ➔ Push [8,10], current = [15,18]',
        comparison: 'Gap between 10 and 15',
        action: 'Push [8,10], current = [15,18]',
        desc: '15 > 10, no overlap. Push [8,10] to result. [15,18] becomes current.'
      },
      {
        stepNum: 5, title: 'Step 5: Push last interval [15,18] ➔ Result: [[1,6], [8,10], [15,18]] 🎉',
        index: 7,
        array: [1, 3, 2, 6, 8, 10, 15, 18],
        computation: 'result = [[1,6], [8,10], [15,18]]',
        comparison: 'MERGE INTERVALS COMPLETE 🎉',
        action: 'Return merged list',
        isMatch: true,
        desc: 'Push final interval [15,18]. Total 3 non-overlapping merged intervals produced from 4 inputs! 🎉'
      }
    ]
  },

  'arrays-find-missing': {
    title: '13. Find Missing Number (XOR Cancellation)',
    input: 'arr = [3, 0, 1], n = 3',
    goal: 'Find the single missing number from 0..n in O(n) time and O(1) space using XOR properties.',
    terms: {
      'XOR Invariant': 'a ^ a = 0 and a ^ 0 = a. XORing all array elements with all integers from 0..n cancels every present number in pairs.',
      'Missing Number': 'The only number without a duplicate pair is the missing one and remains as the final XOR value.',
      'O(1) Space': 'No extra hash table or sorting required.',
    },
    array: [3, 0, 1],
    steps: [
      {
        stepNum: 1, title: 'Step 1: Init xor = 0, array = [3, 0, 1], n = 3',
        index: 0,
        array: [3, 0, 1],
        computation: 'xor = 0, n = 3',
        comparison: 'Init XOR accumulator',
        action: 'Start XOR pass',
        desc: 'Initialize xor = 0. We will XOR every index i (0..n-1) and arr[i], then XOR n.'
      },
      {
        stepNum: 2, title: 'Step 2: i=0 ➔ xor = 0 ^ (0 ^ arr[0]) = 0 ^ 0 ^ 3 = 3',
        index: 0,
        array: [3, 0, 1],
        computation: 'xor = 0 ^ 0 ^ 3 = 3',
        comparison: 'XOR index 0 and value 3',
        action: 'Running xor = 3',
        desc: 'XOR index 0 and arr[0]=3 into accumulator: xor = 3.'
      },
      {
        stepNum: 3, title: 'Step 3: i=1 ➔ xor = 3 ^ (1 ^ arr[1]) = 3 ^ 1 ^ 0 = 2',
        index: 1,
        array: [3, 0, 1],
        computation: 'xor = 3 ^ 1 ^ 0 = 2',
        comparison: 'XOR index 1 and value 0',
        action: 'Running xor = 2',
        desc: 'XOR index 1 and arr[1]=0: 3 ^ 1 ^ 0 = 2.'
      },
      {
        stepNum: 4, title: 'Step 4: i=2 ➔ xor = 2 ^ (2 ^ arr[2]) = 2 ^ 2 ^ 1 = 1',
        index: 2,
        array: [3, 0, 1],
        computation: 'xor = 2 ^ 2 ^ 1 = 1 (2^2 cancels to 0)',
        comparison: '2 ^ 2 canceled to 0',
        action: 'Running xor = 1',
        desc: 'XOR index 2 and arr[2]=1: 2 ^ 2 ^ 1 = 1. Number 2 was paired and canceled to 0!'
      },
      {
        stepNum: 5, title: 'Step 5: XOR with n=3 ➔ xor = 1 ^ 3 = 2 ➔ Missing Number = 2! 🎉',
        index: 2,
        array: [3, 0, 1],
        computation: 'xor = 1 ^ 3 = 2 (3^3 cancels to 0)',
        comparison: 'MISSING NUMBER FOUND = 2 🎉',
        action: 'Return 2',
        isMatch: true,
        desc: 'XOR with n=3: 1 ^ 3 = 2. 3 was paired and canceled. Missing number is 2! Solved in O(n) time, O(1) space. 🎉'
      }
    ]
  }
};
