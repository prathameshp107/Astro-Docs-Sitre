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
        computation: 'L = 0, R = 4, L < R holds true',
        comparison: 'Condition L < R (0 < 4)',
        action: 'Swap arr[0] ↔ arr[4]',
        desc: 'Initialize Left pointer L = 0 (val 1) and Right pointer R = 4 (val 5). Check condition L < R (0 < 4 holds true).'
      },
      {
        stepNum: 2,
        title: 'Step 2: Verify Condition L < R (0 < 4 ✅)',
        left: 0, right: 4,
        array: [1, 2, 3, 4, 5],
        computation: '0 < 4 ➔ True',
        comparison: 'Loop Condition Holds',
        action: 'Swap arr[0] ↔ arr[4]',
        desc: 'Check condition L < R (0 < 4 holds true). Prepare to swap outer elements at indices 0 and 4.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Swap arr[0] (1) and arr[4] (5)',
        left: 0, right: 4,
        array: [5, 2, 3, 4, 1],
        computation: 'Swap arr[0] ↔ arr[4]',
        comparison: 'Outer Elements Swapped',
        action: 'Advance L++, R--',
        desc: 'Swap arr[0] (1) and arr[4] (5). Array becomes [5, 2, 3, 4, 1].'
      },
      {
        stepNum: 4,
        title: 'Step 4: Advance Pointers (L=1, R=3)',
        left: 1, right: 3,
        array: [5, 2, 3, 4, 1],
        computation: 'L = 1, R = 3',
        comparison: 'Pointers Converged',
        action: 'Check Condition',
        desc: 'Advance pointers: Increment L to 1, decrement R to 3.'
      },
      {
        stepNum: 5,
        title: 'Step 5: Verify Condition L < R (1 < 3 ✅)',
        left: 1, right: 3,
        array: [5, 2, 3, 4, 1],
        computation: '1 < 3 ➔ True',
        comparison: 'Loop Condition Holds',
        action: 'Swap arr[1] ↔ arr[3]',
        desc: 'Inspect pointers L = 1 (val 2) and R = 3 (val 4). Check condition L < R (1 < 3 holds true).'
      },
      {
        stepNum: 6,
        title: 'Step 6: Swap arr[1] (2) and arr[3] (4)',
        left: 1, right: 3,
        array: [5, 4, 3, 2, 1],
        computation: 'Swap arr[1] ↔ arr[3]',
        comparison: 'Inner Elements Swapped',
        action: 'Advance L++, R--',
        desc: 'Swap arr[1] (2) and arr[3] (4). Array becomes [5, 4, 3, 2, 1].'
      },
      {
        stepNum: 7,
        title: 'Step 7: Advance Pointers (L=2, R=2)',
        left: 2, right: 2,
        array: [5, 4, 3, 2, 1],
        computation: 'L = 2, R = 2',
        comparison: 'Pointers Meet at Center',
        action: 'Check Termination',
        desc: 'Advance pointers: Increment L to 2, decrement R to 2.'
      },
      {
        stepNum: 8,
        title: 'Step 8: Verify Condition L < R (2 < 2 ❌ STOP)',
        left: 2, right: 2,
        array: [5, 4, 3, 2, 1],
        computation: 'L >= R (2 >= 2)',
        comparison: 'Loop Condition False ❌',
        action: 'Terminate Loop',
        desc: 'Pointers meet at center index L = 2, R = 2. Condition L < R evaluates to False. Loop terminates.'
      },
      {
        stepNum: 9,
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
  }
};
