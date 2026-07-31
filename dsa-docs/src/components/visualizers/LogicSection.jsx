import { useState } from 'react';
import { useTwoPointersStore } from '../../store/visualizers/twoPointersStore';
import { useSlidingWindowStore } from '../../store/visualizers/slidingWindowStore';
import { useBacktrackingStore } from '../../store/visualizers/backtrackingStore';
import { useArrayStore } from '../../store/visualizers/arrayStore';
import { useSortingStore } from '../../store/visualizers/sortingStore';
import { useSearchingStore } from '../../store/visualizers/searchingStore';
import { useLinkedListStore } from '../../store/visualizers/linkedListStore';
import { useTreeStore } from '../../store/visualizers/treeStore';
import { useGraphStore } from '../../store/visualizers/graphStore';
import { useStackStore } from '../../store/visualizers/stackStore';
import { useQueueStore } from '../../store/visualizers/queueStore';
import { useHeapStore } from '../../store/visualizers/heapStore';
import { useRecursionStore } from '../../store/visualizers/recursionStore';
import { useDPStore } from '../../store/visualizers/dpStore';
import { useHashTableStore } from '../../store/visualizers/hashTableStore';

// ALL DSA TOPIC LOGIC CURATED EXPLICITLY WITH CHALKBOARD THEMED KEY TERMINOLOGY DEFINITIONS
const SPECIFIC_PROBLEM_LOGIC = {
  // === 1. TWO POINTERS TRACKS ===
  'intro': {
    title: '1. Two Pointers Concept - Introduction',
    input: 'Array = [1, 2, 4, 6, 8, 10], Target = 10',
    goal: 'Demonstrate opposite-ends converging pointers in O(N) linear time.',
    terms: {
      'L (Left Pointer)': 'Leftmost pointer initialized to index 0 (smallest value in sorted array). Moves right (L++) when pair sum is smaller than target.',
      'R (Right Pointer)': 'Rightmost pointer initialized to index N-1 (largest value in sorted array). Moves left (R--) when pair sum exceeds target.',
      'Target': 'The required sum value (10). Checked at every step against arr[L] + arr[R] to decide which pointer to shift.'
    },
    array: [1, 2, 4, 6, 8, 10],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Initialize Outer Boundary Pointers (L=0, R=5)',
        left: 0,
        right: 5,
        array: [1, 2, 4, 6, 8, 10],
        computation: 'Sum = arr[0] + arr[5] = 1 + 10 = 11',
        comparison: '11 > 10 (Sum is too LARGE)',
        action: 'Decrement Right Pointer (R--: 5 ➔ 4)',
        desc: 'Initialize Left pointer at index 0 (val 1) and Right pointer at index 5 (val 10). Calculate current pair sum: 1 + 10 = 11. Since 11 exceeds target 10, we need a smaller sum. Because the input array is sorted in ascending order, pairing element 10 with any number at or to the right of index 0 will produce a value >= 11. Therefore, 10 can never be part of the solution pair. Decrement Right pointer R to index 4 (val 8).'
      },
      {
        stepNum: 2,
        title: 'Step 2: Evaluate New Boundary Pair (L=0, R=4)',
        left: 0,
        right: 4,
        array: [1, 2, 4, 6, 8, 10],
        computation: 'Sum = arr[0] + arr[4] = 1 + 8 = 9',
        comparison: '9 < 10 (Sum is too SMALL)',
        action: 'Increment Left Pointer (L++: 0 ➔ 1)',
        desc: 'Left is at index 0 (val 1) and Right is at index 4 (val 8). Compute pair sum: 1 + 8 = 9. Here 9 is strictly less than target 10. To increase our sum towards target 10, we must shift the Left pointer to a larger value. Increment Left pointer L to index 1 (val 2).'
      },
      {
        stepNum: 3,
        title: 'Step 3: Evaluate Converged Pair (L=1, R=4)',
        left: 1,
        right: 4,
        array: [1, 2, 4, 6, 8, 10],
        computation: 'Sum = arr[1] + arr[4] = 2 + 8 = 10',
        comparison: '10 == 10 (TARGET MATCHED! 🎉)',
        action: 'Return 1-based indices [2, 5]',
        isMatch: true,
        desc: 'Left is at index 1 (val 2) and Right is at index 4 (val 8). Calculate sum: 2 + 8 = 10. Target 10 matches exactly! Convert 0-based indices [1, 4] to 1-based indices [2, 5] and return [2, 5]. Goal achieved in linear O(N) single-pass traversal!'
      }
    ]
  },

  'two-sum-ii': {
    title: '2. Two Sum II - Input Array Is Sorted',
    input: 'Array = [2, 7, 11, 15], Target = 9',
    goal: 'Find two numbers in sorted array that add up to target 9.',
    terms: {
      'L (Left Pointer)': 'Points to candidate 1 (starts at index 0, min element). Increments (L++) whenever sum < target to increase total.',
      'R (Right Pointer)': 'Points to candidate 2 (starts at index N-1, max element). Decrements (R--) whenever sum > target to decrease total.',
      'Target Sum': 'The fixed required sum (9). Evaluated against arr[L] + arr[R] at each iteration until target is matched.'
    },
    array: [2, 7, 11, 15],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Initialize Boundary Pointers (L=0, R=3)',
        left: 0,
        right: 3,
        array: [2, 7, 11, 15],
        computation: 'Sum = arr[0] + arr[3] = 2 + 15 = 17',
        comparison: '17 > 9 (Sum is too LARGE)',
        action: 'Decrement R pointer (R--: 3 ➔ 2)',
        desc: 'Place Left pointer at index 0 (val 2) and Right pointer at index 3 (val 15). Compute current sum: 2 + 15 = 17. Compare with target 9: 17 is significantly larger than 9. Because the array is sorted, 15 is too large to pair with 2 (or any element in between). Decrement Right pointer R to index 2 (val 11).'
      },
      {
        stepNum: 2,
        title: 'Step 2: Evaluate Reduced Pair (L=0, R=2)',
        left: 0,
        right: 2,
        array: [2, 7, 11, 15],
        computation: 'Sum = arr[0] + arr[2] = 2 + 11 = 13',
        comparison: '13 > 9 (Sum is still too LARGE)',
        action: 'Decrement R pointer (R--: 2 ➔ 1)',
        desc: 'Left remains at index 0 (val 2) and Right is now at index 2 (val 11). Compute current sum: 2 + 11 = 13. 13 is still greater than target 9. To reduce the sum further, decrement Right pointer R to index 1 (val 7).'
      },
      {
        stepNum: 3,
        title: 'Step 3: Evaluate Converged Pair (L=0, R=1)',
        left: 0,
        right: 1,
        array: [2, 7, 11, 15],
        computation: 'Sum = arr[0] + arr[1] = 2 + 7 = 9',
        comparison: '9 == 9 (TARGET MATCHED! 🎉)',
        action: 'Return 1-based indices [1, 2]',
        isMatch: true,
        desc: 'Left is at index 0 (val 2) and Right is at index 1 (val 7). Compute sum: 2 + 7 = 9. Target 9 is matched! Convert 0-based indices [0, 1] to 1-based indices [1, 2] and return [1, 2]. Problem solved!'
      }
    ]
  },

  'valid-palindrome': {
    title: '3. Valid Palindrome (Converging Character Pointers)',
    input: 'String = "racecar"',
    goal: 'Verify character symmetry from both ends towards center.',
    terms: {
      'L (Left Pointer)': 'Points to leftmost character of string (starts at index 0). Advances inward (L++) after verifying outer character symmetry.',
      'R (Right Pointer)': 'Points to rightmost character of string (starts at index N-1). Decrements inward (R--) after verifying outer character symmetry.',
      'Symmetry Check': 'Validates s[L] === s[R]. If a mismatch occurs, string is immediately flagged invalid; if all match until L >= R, it is a valid palindrome.'
    },
    array: ['r', 'a', 'c', 'e', 'c', 'a', 'r'],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Compare Outermost Characters (L=0, R=6)',
        left: 0,
        right: 6,
        array: ['r', 'a', 'c', 'e', 'c', 'a', 'r'],
        computation: "s[0] = 'r', s[6] = 'r'",
        comparison: "'r' == 'r' (MATCH ✅)",
        action: 'Advance L++ (0 ➔ 1) and R-- (6 ➔ 5)',
        desc: "Start with Left pointer at index 0 (character 'r') and Right pointer at index 6 (character 'r'). Compare characters s[0] and s[6]: 'r' === 'r'. Since both characters match, the outer layer of the string is symmetrical! To check the next inner pair, increment Left (L++: 0 ➔ 1) and decrement Right (R--: 6 ➔ 5)."
      },
      {
        stepNum: 2,
        title: 'Step 2: Compare Second Pair (L=1, R=5)',
        left: 1,
        right: 5,
        array: ['r', 'a', 'c', 'e', 'c', 'a', 'r'],
        computation: "s[1] = 'a', s[5] = 'a'",
        comparison: "'a' == 'a' (MATCH ✅)",
        action: 'Advance L++ (1 ➔ 2) and R-- (5 ➔ 4)',
        desc: "Left is now at index 1 (character 'a') and Right is at index 5 (character 'a'). Compare s[1] and s[5]: 'a' === 'a'. Another exact match! This confirms symmetry for the second outer layer. Advance Left (L++: 1 ➔ 2) and Right (R--: 5 ➔ 4)."
      },
      {
        stepNum: 3,
        title: 'Step 3: Compare Third Pair (L=2, R=4)',
        left: 2,
        right: 4,
        array: ['r', 'a', 'c', 'e', 'c', 'a', 'r'],
        computation: "s[2] = 'c', s[4] = 'c'",
        comparison: "'c' == 'c' (MATCH ✅)",
        action: 'Advance L++ (2 ➔ 3) and R-- (4 ➔ 3)',
        desc: "Left moves to index 2 (character 'c') and Right moves to index 4 (character 'c'). Compare s[2] and s[4]: 'c' === 'c'. Both characters match! The string remains valid. Advance Left (L++: 2 ➔ 3) and Right (R--: 4 ➔ 3). Both pointers now converge at the middle index 3."
      },
      {
        stepNum: 4,
        title: 'Step 4: Pointers Meet at Center Character (L=3, R=3)',
        left: 3,
        right: 3,
        array: ['r', 'a', 'c', 'e', 'c', 'a', 'r'],
        computation: "s[3] = 'e' (Center element)",
        comparison: 'L == R (Symmetry Fully Verified 🎉)',
        action: 'Return TRUE',
        isMatch: true,
        desc: 'Left and Right pointers meet at index 3 (character \'e\'). In odd-length palindromes, the middle character \'e\' matches with itself by definition. Because L >= R (3 >= 3), all character pairs have been verified without a single mismatch. Return TRUE — "racecar" is verified as a valid palindrome!'
      }
    ]
  },

  'three-sum': {
    title: '4. 3Sum - Zero Sum Triplets',
    input: 'Array = [-4, -1, -1, 0, 1, 2], Target = 0',
    goal: 'Find all unique triplets [a, b, c] such that a + b + c = 0.',
    terms: {
      'i (Outer Index)': 'Fixed first element index of the triplet (0 <= i < N-2). Sorts array to eliminate duplicates and run 2-pointer scan for rest.',
      'L (Left Pointer)': 'Inner left pointer initialized to i + 1. Moves right (L++) when triplet sum < 0.',
      'R (Right Pointer)': 'Inner right pointer initialized to N - 1. Moves left (R--) when triplet sum > 0.',
      'Triplet Sum': 'Calculated as arr[i] + arr[L] + arr[R]. Recorded if equal to 0.'
    },
    array: [-4, -1, -1, 0, 1, 2],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Fix Outer Loop Index i=0 (val -4)',
        left: 1,
        right: 5,
        array: [-4, -1, -1, 0, 1, 2],
        computation: 'Fixed i=0 (-4) | L=1 (-1), R=5 (2) | Sum = -4 + -1 + 2 = -3',
        comparison: '-3 < 0 (Sum too small)',
        action: 'Increment L (L++: 1 ➔ 2)',
        desc: 'Sort the array first. Fix outer index i=0 (val -4). Place two pointers L=1 (val -1) and R=5 (val 2). Calculate triplet sum: -4 + (-1) + 2 = -3. Sum is -3 < 0. To increase the sum towards 0, increment Left pointer L to index 2 (val -1).'
      },
      {
        stepNum: 2,
        title: 'Step 2: Advance Outer Loop to i=1 (val -1)',
        left: 2,
        right: 5,
        array: [-4, -1, -1, 0, 1, 2],
        computation: 'Fixed i=1 (-1) | L=2 (-1), R=5 (2) | Sum = -1 + -1 + 2 = 0',
        comparison: '0 == 0 (FIRST TRIPLET FOUND! 🎉)',
        action: 'Record Triplet [-1, -1, 2]',
        isMatch: true,
        desc: 'Advance outer loop index to i=1 (val -1). Set two pointers L=2 (val -1) and R=5 (val 2). Calculate triplet sum: -1 + (-1) + 2 = 0. Target 0 is matched! Record triplet [-1, -1, 2].'
      },
      {
        stepNum: 3,
        title: 'Step 3: Move Pointers to Search Next Pair (L=3, R=4)',
        left: 3,
        right: 4,
        array: [-4, -1, -1, 0, 1, 2],
        computation: 'Fixed i=1 (-1) | L=3 (0), R=4 (1) | Sum = -1 + 0 + 1 = 0',
        comparison: '0 == 0 (SECOND TRIPLET FOUND! 🎉)',
        action: 'Record Triplet [-1, 0, 1]',
        isMatch: true,
        desc: 'With i=1 fixed, increment L to 3 (val 0) and decrement R to 4 (val 1). Calculate sum: -1 + 0 + 1 = 0. Target 0 is matched! Record second triplet [-1, 0, 1]. All unique triplets found!'
      }
    ]
  },

  'container-water': {
    title: '5. Container With Most Water',
    input: 'Heights = [1, 8, 6, 2, 5, 4, 8, 3]',
    goal: 'Find two lines that contain the maximum area of water.',
    terms: {
      'L (Left Wall)': 'Index of the left container boundary line (starts at 0).',
      'R (Right Wall)': 'Index of the right container boundary line (starts at N-1).',
      'Height Bottleneck': 'min(height[L], height[R]) - the limiting vertical height of water. Shifting the shorter line inward is the ONLY way to discover a taller bottleneck.',
      'Width': 'Horizontal distance between left and right walls calculated as (R - L).'
    },
    array: [1, 8, 6, 2, 5, 4, 8, 3],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Outer Boundaries (L=0, R=7)',
        left: 0,
        right: 7,
        array: [1, 8, 6, 2, 5, 4, 8, 3],
        computation: 'Width = 7 | Min Height = min(1, 3) = 1 | Area = 7 * 1 = 7',
        comparison: 'Initial Area = 7',
        action: 'Move Shorter Left Line (L++: 0 ➔ 1)',
        desc: 'Start L at index 0 (height 1) and R at index 7 (height 3). Width between them is 7 - 0 = 7. Bounding height is min(1, 3) = 1. Calculate water area: 7 * 1 = 7. Because the container height is limited by the shorter line (height 1), keeping the shorter line while shrinking width can never yield a larger area. Move shorter left line inward (L++: 0 ➔ 1).'
      },
      {
        stepNum: 2,
        title: 'Step 2: Evaluate New Boundaries (L=1, R=7)',
        left: 1,
        right: 7,
        array: [1, 8, 6, 2, 5, 4, 8, 3],
        computation: 'Width = 6 | Min Height = min(8, 3) = 3 | Area = 6 * 3 = 18',
        comparison: '18 > 7 (New Max Area = 18)',
        action: 'Move Shorter Right Line (R--: 7 ➔ 6)',
        desc: 'L is at index 1 (height 8) and R is at index 7 (height 3). Width = 6. Min height = min(8, 3) = 3. Area = 6 * 3 = 18. New max area recorded! Since right line (height 3) is now the shorter line, move right line inward (R--: 7 ➔ 6).'
      },
      {
        stepNum: 3,
        title: 'Step 3: Evaluate Optimal Container (L=1, R=6)',
        left: 1,
        right: 6,
        array: [1, 8, 6, 2, 5, 4, 8, 3],
        computation: 'Width = 5 | Min Height = min(8, 8) = 8 | Area = 5 * 8 = 40',
        comparison: '40 > 18 (MAXIMUM AREA FOUND! 🎉)',
        action: 'Max Area = 40 Recorded',
        isMatch: true,
        desc: 'L is at index 1 (height 8) and R is at index 6 (height 8). Width = 6 - 1 = 5. Min height = min(8, 8) = 8. Calculate area: 5 * 8 = 40! Maximum water area found in O(N) single pass!'
      }
    ]
  },

  'move-zeroes': {
    title: '6. Move Zeroes In-Place (Fast & Slow Pointers)',
    input: 'Array = [0, 1, 0, 3, 12]',
    goal: 'Move all zeroes to end while maintaining relative order of non-zero elements.',
    terms: {
      'Slow Pointer': 'The write pointer tracking the next available slot for placing a non-zero element. Increments (Slow++) only after a swap.',
      'Fast Pointer': 'The scan pointer traversing the entire array to locate non-zero elements to swap into the Slow slot.'
    },
    array: [0, 1, 0, 3, 12],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Slow=0, Fast=0 (Encounter Zero)',
        left: 0,
        right: 0,
        array: [0, 1, 0, 3, 12],
        computation: 'arr[0] = 0 (Zero encountered)',
        comparison: 'Slow stays at 0, Fast advances to 1',
        action: 'Advance Fast++',
        desc: 'Initialize Slow pointer at 0 (marking next available non-zero slot) and Fast pointer at 0 (scanning elements). Fast sees 0 at index 0. Since element is 0, do not swap. Advance Fast to 1.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Fast=1 (val 1) ➔ Swap arr[0] and arr[1]',
        left: 0,
        right: 1,
        array: [1, 0, 0, 3, 12],
        computation: 'Swap arr[0] and arr[1] ➔ Array becomes [1, 0, 0, 3, 12]',
        comparison: 'Non-zero 1 placed at Slow index 0',
        action: 'Swap & Increment Slow++',
        isMatch: true,
        desc: 'Fast pointer reaches index 1 and sees non-zero value 1. Swap element at Fast index 1 with element at Slow index 0. Array transforms to [1, 0, 0, 3, 12]. Increment Slow pointer to 1.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Fast=3 (val 3) ➔ Swap arr[1] and arr[3]',
        left: 1,
        right: 3,
        array: [1, 3, 0, 0, 12],
        computation: 'Swap arr[1] and arr[3] ➔ Array becomes [1, 3, 0, 0, 12]',
        comparison: 'Non-zero 3 placed at Slow index 1',
        action: 'Swap & Increment Slow++',
        isMatch: true,
        desc: 'Fast skips zero at index 2 and reaches index 3 (val 3). Swap arr[1] and arr[3]. Array becomes [1, 3, 0, 0, 12]. Increment Slow pointer to 2.'
      },
      {
        stepNum: 4,
        title: 'Step 4: Fast=4 (val 12) ➔ Swap arr[2] and arr[4]',
        left: 2,
        right: 4,
        array: [1, 3, 12, 0, 0],
        computation: 'Swap arr[2] and arr[4] ➔ Array becomes [1, 3, 12, 0, 0]',
        comparison: 'All Non-Zeroes Shifted Left! 🎉',
        action: 'Array Transformed In-Place',
        isMatch: true,
        desc: 'Fast reaches index 4 (val 12). Swap arr[2] and arr[4]. Array transforms to [1, 3, 12, 0, 0]. All non-zero elements are shifted to the front while preserving order, and all zeroes are pushed to the end in O(N) time and O(1) extra space!'
      }
    ]
  },

  'remove-duplicates': {
    title: '7. Remove Duplicates from Sorted Array',
    input: 'Array = [1, 1, 2, 2, 3, 4]',
    goal: 'Overwrite duplicate elements in-place and return total unique element count K=4.',
    terms: {
      'Slow Pointer': 'Tracks the index of the last written unique element. Overwrites arr[Slow + 1] whenever a new unique element is discovered.',
      'Fast Pointer': 'Scans array seeking new non-duplicate values (arr[Fast] !== arr[Slow]).',
      'K Count': 'Total number of unique elements placed, given by (Slow + 1).'
    },
    array: [1, 1, 2, 2, 3, 4],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Slow=0 (val 1), Fast=1 (val 1) [Duplicate]',
        left: 0,
        right: 1,
        array: [1, 1, 2, 2, 3, 4],
        computation: 'arr[0] == arr[1] == 1 (Duplicate detected)',
        comparison: 'Skip duplicate element',
        action: 'Advance Fast++',
        desc: 'Slow points to first unique element at index 0 (val 1). Fast scans index 1 and sees value 1. Since arr[0] == arr[1], this is a duplicate element. Skip it by advancing Fast to index 2.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Slow=0, Fast=2 (val 2) [Unique Element!]',
        left: 0,
        right: 2,
        array: [1, 2, 2, 2, 3, 4],
        computation: 'arr[2] = 2 != arr[0] ➔ Increment Slow to 1, Overwrite arr[1] = 2',
        comparison: 'Unique Element 2 Placed at index 1',
        action: 'Overwrite & Increment Slow++',
        isMatch: true,
        desc: 'Fast reaches index 2 and sees value 2, which is different from arr[Slow] (1). Increment Slow to 1 and overwrite arr[1] with 2. Array state becomes [1, 2, 2, 2, 3, 4].'
      },
      {
        stepNum: 3,
        title: 'Step 3: Fast=4 (val 3) [Unique Element!]',
        left: 1,
        right: 4,
        array: [1, 2, 3, 2, 3, 4],
        computation: 'arr[4] = 3 != arr[1] ➔ Increment Slow to 2, Overwrite arr[2] = 3',
        comparison: 'Unique Element 3 Placed at index 2',
        action: 'Overwrite & Increment Slow++',
        isMatch: true,
        desc: 'Fast skips duplicate 2 at index 3 and reaches index 4 (val 3). Increment Slow to 2 and overwrite arr[2] with 3. Array state becomes [1, 2, 3, 2, 3, 4].'
      },
      {
        stepNum: 4,
        title: 'Step 4: Fast=5 (val 4) [Unique Element!]',
        left: 2,
        right: 5,
        array: [1, 2, 3, 4, 3, 4],
        computation: 'arr[5] = 4 != arr[2] ➔ Increment Slow to 3, Overwrite arr[3] = 4',
        comparison: 'K = 4 Unique Elements Placed! 🎉',
        action: 'Return K = 4',
        isMatch: true,
        desc: 'Fast reaches index 5 (val 4). Increment Slow to 3 and overwrite arr[3] with 4. Array prefix [1, 2, 3, 4] contains all K=4 unique elements in-place!'
      }
    ]
  },

  'sort-colors': {
    title: '8. Sort Colors (Dutch National Flag 3-Pointer Partition)',
    input: 'Array = [2, 0, 2, 1, 1, 0] (0=Red, 1=White, 2=Blue)',
    goal: 'Sort array of 0s, 1s, 2s in-place in single pass using low, mid, high pointers.',
    terms: {
      'Low Pointer': 'Rightmost boundary for 0s (Red). Everything left of Low is guaranteed to be 0.',
      'Mid Pointer': 'Current scanning index for 1s (White). If arr[Mid] === 0, swap with Low; if arr[Mid] === 2, swap with High.',
      'High Pointer': 'Leftmost boundary for 2s (Blue). Everything right of High is guaranteed to be 2.'
    },
    array: [2, 0, 2, 1, 1, 0],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Initialize Pointers (Low=0, Mid=0, High=5)',
        left: 0,
        right: 5,
        array: [2, 0, 2, 1, 1, 0],
        computation: 'Pointers initialized: Low=0, Mid=0, High=5',
        comparison: 'Initial State: arr[0] = 2',
        action: 'Inspect arr[Mid=0]',
        desc: 'Initialize Low=0 (tracks 0-region), Mid=0 (scanning pointer), High=5 (tracks 2-region). Mid inspects element at index 0 (val 2).'
      },
      {
        stepNum: 2,
        title: 'Step 2: Mid=0 (val 2) ➔ Swap with High=5 (val 0)',
        left: 0,
        right: 5,
        array: [0, 0, 2, 1, 1, 2],
        computation: 'Swap arr[0] (2) and arr[5] (0) ➔ Array becomes [0, 0, 2, 1, 1, 2]',
        comparison: 'High-value 2 placed at end',
        action: 'Swap & Decrement High--',
        desc: 'Mid sees value 2 at index 0. Swap element at Mid (2) with element at High (0). Array transforms to [0, 0, 2, 1, 1, 2]. Decrement High pointer to 4. Mid remains at 0 to evaluate newly swapped-in element.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Mid=0 (val 0) ➔ Swap with Low=0',
        left: 0,
        right: 0,
        array: [0, 0, 2, 1, 1, 2],
        computation: 'arr[0] == 0 ➔ Swap arr[0] with arr[Low=0]',
        comparison: 'Low-value 0 placed at start',
        action: 'Increment Low++ and Mid++',
        isMatch: true,
        desc: 'Mid is at index 0 and sees value 0. Swap arr[0] with arr[Low=0]. Increment Low to 1 and Mid to 1.'
      },
      {
        stepNum: 4,
        title: 'Step 4: Mid=1 (val 0) ➔ Swap with Low=1',
        left: 1,
        right: 1,
        array: [0, 0, 2, 1, 1, 2],
        computation: 'arr[1] == 0 ➔ Swap arr[1] with arr[Low=1]',
        comparison: 'Low-value 0 placed at index 1',
        action: 'Increment Low++ and Mid++',
        isMatch: true,
        desc: 'Mid is at index 1 and sees value 0. Swap arr[1] with arr[Low=1]. Increment Low pointer to 2 and Mid pointer to 2.'
      },
      {
        stepNum: 5,
        title: 'Step 5: Mid=2 (val 2) ➔ Swap with High=4 (val 1)',
        left: 2,
        right: 4,
        array: [0, 0, 1, 1, 2, 2],
        computation: 'Swap arr[2] (2) and arr[4] (1) ➔ Array becomes [0, 0, 1, 1, 2, 2]',
        comparison: 'High-value 2 placed at index 4',
        action: 'Swap & Decrement High--',
        isMatch: true,
        desc: 'Mid is at index 2 and sees value 2. Swap arr[2] (2) with arr[4] (1). Array transforms to [0, 0, 1, 1, 2, 2]. Decrement High to 3.'
      },
      {
        stepNum: 6,
        title: 'Step 6: Mid=3 ➔ Partition Complete!',
        left: 2,
        right: 3,
        array: [0, 0, 1, 1, 2, 2],
        computation: 'Mid pointer reaches High boundary ➔ Array sorted: [0, 0, 1, 1, 2, 2]',
        comparison: 'DUTCH NATIONAL FLAG SORTED! 🎉',
        action: 'Single Pass Complete',
        isMatch: true,
        desc: 'Mid pointer advances past element 1s and reaches High boundary. All 0s are partitioned on left, 1s in middle, and 2s on right. Single pass O(N) Dutch National Flag sort completed! Final array: [0, 0, 1, 1, 2, 2].'
      }
    ]
  },

  // === 2. SLIDING WINDOW TRACKS ===
  'sliding-window': {
    title: '1. Sliding Window Concept - Introduction',
    input: 'Array = [2, 1, 5, 1, 3, 2], K = 3',
    goal: 'Find maximum sum contiguous subarray of fixed size K=3 in O(N) time.',
    terms: {
      'L (Left Window Edge)': 'Left boundary of the sliding window [L..R]. Shifts right (L++) when sliding window.',
      'R (Right Window Edge)': 'Right boundary of the sliding window [L..R]. Shifts right (R++) to include incoming element.',
      'Window Sum': 'Running sum maintained in O(1) time via windowSum += incoming - outgoing.',
      'Max Sum': 'Maximum window sum recorded across all valid windows.'
    },
    array: [2, 1, 5, 1, 3, 2],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Initialize Left Boundary (L=0)',
        left: 0,
        right: null,
        array: [2, 1, 5, 1, 3, 2],
        computation: 'L = 0, R = null, K = 3',
        comparison: 'Window setup phase',
        action: 'Init L = 0',
        desc: 'Initialize Left boundary L = 0. We will expand the Right boundary R to build the initial window of size K=3.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Initialize Right Boundary (R=0)',
        left: 0,
        right: 0,
        array: [2, 1, 5, 1, 3, 2],
        computation: 'Add arr[0] (2) ➔ Sum = 2',
        comparison: 'Window size 1 < K=3',
        action: 'Expand R',
        desc: 'Initialize Right boundary R = 0. Add arr[0] (2) to window. Current windowSum = 2 (Window size 1 < K=3).'
      },
      {
        stepNum: 3,
        title: 'Step 3: Expand Right Boundary to Index 1 (R=1)',
        left: 0,
        right: 1,
        array: [2, 1, 5, 1, 3, 2],
        computation: 'Add arr[1] (1) ➔ Sum = 2 + 1 = 3',
        comparison: 'Window size 2 < K=3',
        action: 'Expand R',
        desc: 'Expand R to index 1 (val 1). Add arr[1] to window. Current windowSum = 2 + 1 = 3 (Window size 2 < K=3).'
      },
      {
        stepNum: 4,
        title: 'Step 4: Expand R=2 ➔ Initial Window K=3 Complete! (Sum = 8)',
        left: 0,
        right: 2,
        array: [2, 1, 5, 1, 3, 2],
        computation: 'Add arr[2] (5) ➔ Sum = 3 + 5 = 8',
        comparison: 'Window size K=3 reached! Initial maxSum = 8',
        action: 'Set maxSum = 8',
        isMatch: true,
        desc: 'Expand R to index 2 (val 5). Add arr[2] to window. Initial window [2, 1, 5] complete! windowSum = 8. Set initial maxSum = 8.'
      },
      {
        stepNum: 5,
        title: 'Step 5: Slide Window Right (L=1, R=3)',
        left: 1,
        right: 3,
        array: [2, 1, 5, 1, 3, 2],
        computation: 'Outgoing arr[0]=2, Incoming arr[3]=1 ➔ Sum = 8 - 2 + 1 = 7',
        comparison: '7 < 8 (maxSum remains 8)',
        action: 'Slide Window',
        desc: 'Slide window right (L=1, R=3). Subtract outgoing arr[0]=2, add incoming arr[3]=1. New windowSum = 7. maxSum remains 8.'
      },
      {
        stepNum: 6,
        title: 'Step 6: Slide Window Right (L=2, R=4)',
        left: 2,
        right: 4,
        array: [2, 1, 5, 1, 3, 2],
        computation: 'Outgoing arr[1]=1, Incoming arr[4]=3 ➔ Sum = 7 - 1 + 3 = 9',
        comparison: '9 > 8 (NEW MAX SUM FOUND! 🎉)',
        action: 'Update maxSum = 9',
        isMatch: true,
        desc: 'Slide window right (L=2, R=4). Subtract outgoing arr[1]=1, add incoming arr[4]=3. New windowSum = 9. Updated maxSum = 9! 🎉'
      },
      {
        stepNum: 7,
        title: 'Step 7: Slide Window Right (L=3, R=5)',
        left: 3,
        right: 5,
        array: [2, 1, 5, 1, 3, 2],
        computation: 'Outgoing arr[2]=5, Incoming arr[5]=2 ➔ Sum = 9 - 5 + 2 = 6',
        comparison: '6 < 9 (maxSum remains 9)',
        action: 'Slide Window',
        desc: 'Slide window right (L=3, R=5). Subtract outgoing arr[2]=5, add incoming arr[5]=2. New windowSum = 6. maxSum remains 9.'
      },
      {
        stepNum: 8,
        title: 'Step 8: Window Traversal Complete!',
        left: 2,
        right: 4,
        array: [2, 1, 5, 1, 3, 2],
        computation: 'Optimal Subarray: [5, 1, 3] at indices 2..4',
        comparison: 'MAX SUM = 9 FOUND 🎉',
        action: 'Return 9',
        isMatch: true,
        desc: 'Scanned entire array! Maximum subarray sum of size K=3 is 9 (indices 2 to 4). Time complexity O(N). 🎉'
      }
    ]
  },

  'max-sum-subarray': {
    title: '2. Max Sum Subarray of Size K',
    input: 'Array = [2, 1, 5, 1, 3, 2], K = 3',
    goal: 'Find maximum sum of contiguous subarray of size K=3.',
    terms: {
      'L (Left Edge)': 'Left index of window. Increments once window size reaches K.',
      'R (Right Edge)': 'Right index of window. Expands by 1 at each step.',
      'Window Size (K)': 'Fixed subarray width of size 3.',
      'Max Sum': 'Highest window sum tracked across array traversal.'
    },
    array: [2, 1, 5, 1, 3, 2],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Initialize Left Boundary (L=0)',
        left: 0,
        right: null,
        array: [2, 1, 5, 1, 3, 2],
        computation: 'L = 0, R = null, K = 3',
        comparison: 'Initializing window...',
        action: 'Init L = 0',
        desc: 'Initialize L = 0. Maintain a fixed-size window of width K=3.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Initialize Right Boundary (R=0)',
        left: 0,
        right: 0,
        array: [2, 1, 5, 1, 3, 2],
        computation: 'Add arr[0] (2) ➔ Sum = 2',
        comparison: 'Size 1 < 3',
        action: 'Expand R',
        desc: 'Initialize R = 0. Add arr[0] (2) to windowSum = 2.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Expand Window to R=1',
        left: 0,
        right: 1,
        array: [2, 1, 5, 1, 3, 2],
        computation: 'Add arr[1] (1) ➔ Sum = 3',
        comparison: 'Size 2 < 3',
        action: 'Expand R',
        desc: 'Expand window to R = 1. Add arr[1] (1). windowSum = 3.'
      },
      {
        stepNum: 4,
        title: 'Step 4: Expand Window to R=2 (Window Size 3 Complete!)',
        left: 0,
        right: 2,
        array: [2, 1, 5, 1, 3, 2],
        computation: 'Add arr[2] (5) ➔ Sum = 8',
        comparison: 'Window Size 3 Reached! Initial maxSum = 8',
        action: 'Set maxSum = 8',
        isMatch: true,
        desc: 'Expand window to R = 2. Add arr[2] (5). Window size K=3 reached! Initial maxSum = 8.'
      },
      {
        stepNum: 5,
        title: 'Step 5: Slide Window to L=1, R=3',
        left: 1,
        right: 3,
        array: [2, 1, 5, 1, 3, 2],
        computation: '8 - arr[0](2) + arr[3](1) = 7',
        comparison: '7 < 8 (maxSum = 8)',
        action: 'Slide Window',
        desc: 'Slide R=3, L=1. Subtract 2, add 1. windowSum = 7. maxSum remains 8.'
      },
      {
        stepNum: 6,
        title: 'Step 6: Slide Window to L=2, R=4 (NEW MAX SUM = 9!)',
        left: 2,
        right: 4,
        array: [2, 1, 5, 1, 3, 2],
        computation: '7 - arr[1](1) + arr[4](3) = 9',
        comparison: '9 > 8 (NEW MAX SUM = 9! 🎉)',
        action: 'Update Max Sum',
        isMatch: true,
        desc: 'Slide R=4, L=2. Subtract 1, add 3. windowSum = 9. Updated maxSum = 9! 🎉'
      },
      {
        stepNum: 7,
        title: 'Step 7: Slide Window to L=3, R=5',
        left: 3,
        right: 5,
        array: [2, 1, 5, 1, 3, 2],
        computation: '9 - arr[2](5) + arr[5](2) = 6',
        comparison: '6 < 9 (maxSum = 9)',
        action: 'Slide Window',
        desc: 'Slide R=5, L=3. Subtract 5, add 2. windowSum = 6. maxSum remains 9.'
      },
      {
        stepNum: 8,
        title: 'Step 8: Return Maximum Sum',
        left: 2,
        right: 4,
        array: [2, 1, 5, 1, 3, 2],
        computation: 'Optimal Subarray: [5, 1, 3]',
        comparison: 'MAX SUM = 9 🎉',
        action: 'Return 9',
        isMatch: true,
        desc: 'Algorithm finished. Return max sum = 9. 🎉'
      }
    ]
  },

  'longest-substring': {
    title: '3. Longest Substring Without Repeating Characters',
    input: 'String = "abcabcbb"',
    goal: 'Find length of longest substring with zero duplicate characters.',
    terms: {
      'L (Left Edge)': 'Shrinks right (L++) when a duplicate character is encountered.',
      'R (Right Edge)': 'Expands right (R++) to include next character into window.',
      'Freq Set': 'HashMap / Set tracking active characters in current window [L..R].',
      'Max Length': 'Longest valid substring length (R - L + 1) observed so far.'
    },
    array: ['a', 'b', 'c', 'a', 'b', 'c', 'b', 'b'],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Initialize Left Edge (L=0)',
        left: 0,
        right: null,
        array: ['a', 'b', 'c', 'a', 'b', 'c', 'b', 'b'],
        computation: 'L = 0, Set = {}',
        comparison: 'Window setup phase',
        action: 'Init L = 0',
        desc: 'Initialize Left edge L = 0. Window set is empty.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Initialize R=0 (char "a")',
        left: 0,
        right: 0,
        array: ['a', 'b', 'c', 'a', 'b', 'c', 'b', 'b'],
        computation: "Add 'a' to Set: {'a'}",
        comparison: 'Unique chars! maxLen = 1',
        action: 'Expand R++',
        desc: 'Initialize R = 0. Add s[0]="a" to window. Unique chars! maxLen = 1.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Expand R=1 (char "b")',
        left: 0,
        right: 1,
        array: ['a', 'b', 'c', 'a', 'b', 'c', 'b', 'b'],
        computation: "Add 'b' to Set: {'a', 'b'}",
        comparison: 'Unique chars! maxLen = 2',
        action: 'Expand R++',
        desc: 'Expand R = 1 (char "b"). No duplicate. Substring "ab" is valid! maxLen = 2.'
      },
      {
        stepNum: 4,
        title: 'Step 4: Expand R=2 (char "c")',
        left: 0,
        right: 2,
        array: ['a', 'b', 'c', 'a', 'b', 'c', 'b', 'b'],
        computation: "Add 'c' to Set: {'a', 'b', 'c'}",
        comparison: 'Unique chars! maxLen = 3',
        action: 'Expand R++',
        desc: 'Expand R = 2 (char "c"). No duplicate. Substring "abc" is valid! maxLen = 3.'
      },
      {
        stepNum: 5,
        title: 'Step 5: Expand R=3 (char "a") ➔ Duplicate Detected!',
        left: 0,
        right: 3,
        array: ['a', 'b', 'c', 'a', 'b', 'c', 'b', 'b'],
        computation: "Duplicate 'a' in window {'a', 'b', 'c', 'a'}",
        comparison: 'DUPLICATE ENCOUNTERED! ❌',
        action: 'Shrink L++',
        desc: 'Expand R = 3 (char "a"). Duplicate character "a" detected in window! Must shrink L.'
      },
      {
        stepNum: 6,
        title: 'Step 6: Shrink L to Index 1 (Remove previous "a")',
        left: 1,
        right: 3,
        array: ['a', 'b', 'c', 'a', 'b', 'c', 'b', 'b'],
        computation: "Remove 'a' at index 0 ➔ Set becomes {'b', 'c', 'a'}",
        comparison: 'Window "bca" Valid ✅',
        action: 'Duplicate Resolved',
        desc: 'Shrink L to index 1 (remove "a" at index 0). Window "bca" is valid! maxLen remains 3.'
      },
      {
        stepNum: 7,
        title: 'Step 7: Expand R=4 (char "b") ➔ Duplicate "b" Detected!',
        left: 1,
        right: 4,
        array: ['a', 'b', 'c', 'a', 'b', 'c', 'b', 'b'],
        computation: "Duplicate 'b' in window {'b', 'c', 'a', 'b'}",
        comparison: 'DUPLICATE ENCOUNTERED! ❌',
        action: 'Shrink L++',
        desc: 'Expand R = 4 (char "b"). Duplicate "b" detected! Must shrink L pointer.'
      },
      {
        stepNum: 8,
        title: 'Step 8: Shrink L to Index 2 (Remove previous "b")',
        left: 2,
        right: 4,
        array: ['a', 'b', 'c', 'a', 'b', 'c', 'b', 'b'],
        computation: "Remove 'b' at index 1 ➔ Set becomes {'c', 'a', 'b'}",
        comparison: 'Window "cab" Valid ✅',
        action: 'Duplicate Resolved',
        desc: 'Shrink L to index 2 (remove "b" at index 1). Window "cab" is valid! maxLen remains 3.'
      },
      {
        stepNum: 9,
        title: 'Step 9: Traversal Complete! Return Max Length 3',
        left: 0,
        right: 2,
        array: ['a', 'b', 'c', 'a', 'b', 'c', 'b', 'b'],
        computation: 'Optimal Substring: "abc"',
        comparison: 'MAX LENGTH = 3 🎉',
        action: 'Return 3',
        isMatch: true,
        desc: 'Traversal complete! Longest substring without repeating characters is "abc" with length 3. 🎉'
      }
    ]
  },

  'min-subarray-sum': {
    title: '4. Minimum Size Subarray Sum (Target = 7)',
    input: 'Array = [2, 3, 1, 2, 4, 3], Target = 7',
    goal: 'Find minimal length of contiguous subarray whose sum is >= target 7.',
    terms: {
      'L (Left Edge)': 'Shrinks right (L++) aggressively while window sum >= target to minimize window length.',
      'R (Right Edge)': 'Expands right (R++) to add elements until window sum >= target.',
      'Window Sum': 'Running sum of current [L..R] elements.',
      'Min Length': 'Smallest valid window length (R - L + 1) observed so far.'
    },
    array: [2, 3, 1, 2, 4, 3],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Initialize Left Boundary (L=0)',
        left: 0,
        right: null,
        array: [2, 3, 1, 2, 4, 3],
        computation: 'L = 0, sum = 0, minLen = Infinity',
        comparison: 'Initializing window...',
        action: 'Init L = 0',
        desc: 'Initialize Left boundary L = 0.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Expand R=0 (val 2)',
        left: 0,
        right: 0,
        array: [2, 3, 1, 2, 4, 3],
        computation: 'windowSum = 2 < 7',
        comparison: 'Sum < Target',
        action: 'Expand R',
        desc: 'Expand R to index 0 (val 2). windowSum = 2 < 7. Need to expand R.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Expand R=1 (val 3)',
        left: 0,
        right: 1,
        array: [2, 3, 1, 2, 4, 3],
        computation: 'windowSum = 2+3 = 5 < 7',
        comparison: 'Sum < Target',
        action: 'Expand R',
        desc: 'Expand R to index 1 (val 3). windowSum = 2+3 = 5 < 7. Need to expand R.'
      },
      {
        stepNum: 4,
        title: 'Step 4: Expand R=2 (val 1)',
        left: 0,
        right: 2,
        array: [2, 3, 1, 2, 4, 3],
        computation: 'windowSum = 5+1 = 6 < 7',
        comparison: 'Sum < Target',
        action: 'Expand R',
        desc: 'Expand R to index 2 (val 1). windowSum = 5+1 = 6 < 7. Need to expand R.'
      },
      {
        stepNum: 5,
        title: 'Step 5: Expand R=3 (val 2) ➔ Sum = 8 >= 7! Valid Window!',
        left: 0,
        right: 3,
        array: [2, 3, 1, 2, 4, 3],
        computation: 'windowSum = 6+2 = 8 >= 7',
        comparison: 'Valid window! Length = 4',
        action: 'Set minLen = 4',
        isMatch: true,
        desc: 'Expand R to index 3 (val 2). windowSum = 6+2 = 8 >= 7! Valid window [2, 3, 1, 2] of length 4 found! Set minLen = 4.'
      },
      {
        stepNum: 6,
        title: 'Step 6: Shrink L to 1 (Sum = 6 < 7)',
        left: 1,
        right: 3,
        array: [2, 3, 1, 2, 4, 3],
        computation: '8 - arr[0](2) = 6 < 7',
        comparison: 'Sum < 7 (Stop shrinking)',
        action: 'Expand R++',
        desc: 'Shrink L to 1. Subtract arr[0]=2. windowSum = 6 < 7. Cannot shrink further! Must expand R.'
      },
      {
        stepNum: 7,
        title: 'Step 7: Expand R=4 (val 4) ➔ Sum = 10 >= 7!',
        left: 1,
        right: 4,
        array: [2, 3, 1, 2, 4, 3],
        computation: '6 + arr[4](4) = 10 >= 7',
        comparison: 'Valid window! Length = 4',
        action: 'Try Shrinking L++',
        desc: 'Expand R to index 4 (val 4). windowSum = 6+4 = 10 >= 7! Valid window [3, 1, 2, 4] of length 4.'
      },
      {
        stepNum: 8,
        title: 'Step 8: Shrink L to 2 ➔ Sum = 7 >= 7! UPDATED MIN LEN = 3!',
        left: 2,
        right: 4,
        array: [2, 3, 1, 2, 4, 3],
        computation: '10 - arr[1](3) = 7 >= 7',
        comparison: 'UPDATED MIN LEN = 3! 🎉',
        action: 'Update minLen = 3',
        isMatch: true,
        desc: 'Shrink L to 2. Subtract arr[1]=3. windowSum = 7 >= 7! Valid window [1, 2, 4] of length 3! Updated minLen = 3! 🎉'
      },
      {
        stepNum: 9,
        title: 'Step 9: Shrink L to 3 (Sum = 6 < 7)',
        left: 3,
        right: 4,
        array: [2, 3, 1, 2, 4, 3],
        computation: '7 - arr[2](1) = 6 < 7',
        comparison: 'Sum < 7 (Stop shrinking)',
        action: 'Expand R++',
        desc: 'Shrink L to 3. Subtract arr[2]=1. windowSum = 6 < 7. Stop shrinking!'
      },
      {
        stepNum: 10,
        title: 'Step 10: Expand R=5 (val 3) ➔ Sum = 9 >= 7!',
        left: 3,
        right: 5,
        array: [2, 3, 1, 2, 4, 3],
        computation: '6 + arr[5](3) = 9 >= 7',
        comparison: 'Valid window! Length = 3',
        action: 'Try Shrinking L++',
        desc: 'Expand R to index 5 (val 3). windowSum = 6+3 = 9 >= 7! Valid window [2, 4, 3] of length 3.'
      },
      {
        stepNum: 11,
        title: 'Step 11: Shrink L to 4 ➔ Sum = 7 >= 7! MINIMAL LENGTH = 2! 🎉',
        left: 4,
        right: 5,
        array: [2, 3, 1, 2, 4, 3],
        computation: '9 - arr[3](2) = 7 >= 7',
        comparison: 'MINIMAL LENGTH = 2 🎉',
        action: 'Update minLen = 2',
        isMatch: true,
        desc: 'Shrink L to 4. Subtract arr[3]=2. Window [4, 3] sum = 7 >= 7! Minimal length = 2! 🎉'
      },
      {
        stepNum: 12,
        title: 'Step 12: Return Minimal Window Length 2',
        left: 4,
        right: 5,
        array: [2, 3, 1, 2, 4, 3],
        computation: 'Optimal Subarray: [4, 3]',
        comparison: 'MINIMAL LENGTH = 2 🎉',
        action: 'Return 2',
        isMatch: true,
        desc: 'Scanned array! Minimum size subarray with sum >= 7 has length 2 (subarray [4, 3]). 🎉'
      }
    ]
  },

  'fruit-into-baskets': {
    title: '5. Fruit Into Baskets (At Most 2 Fruit Types)',
    input: 'Fruits = [1, 2, 2, 3, 2, 2]',
    goal: 'Find longest contiguous subarray containing at most 2 distinct fruit types.',
    terms: {
      'L (Left Edge)': 'Shrinks right (L++) when basket count exceeds 2 distinct types.',
      'R (Right Edge)': 'Expands right (R++) to collect fruits into baskets.',
      'Basket Map': 'HashMap tracking frequencies of distinct fruit types in window [L..R].',
      'Max Fruits': 'Maximum fruits collected in valid 2-basket window.'
    },
    array: [1, 2, 2, 3, 2, 2],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Initialize Left Boundary (L=0)',
        left: 0,
        right: null,
        array: [1, 2, 2, 3, 2, 2],
        computation: 'L = 0, Baskets = {}',
        comparison: 'Initializing baskets...',
        action: 'Init L = 0',
        desc: 'Initialize Left boundary L = 0.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Collect Fruit Type 1 at R=0',
        left: 0,
        right: 0,
        array: [1, 2, 2, 3, 2, 2],
        computation: 'Baskets = {1: 1} ➔ 1 fruit type',
        comparison: '1 type <= 2',
        action: 'Set maxFruits = 1',
        desc: 'Initialize R = 0. Collect fruit type 1. Baskets hold type 1 (1 fruit). maxFruits = 1.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Collect Fruit Type 2 at R=1',
        left: 0,
        right: 1,
        array: [1, 2, 2, 3, 2, 2],
        computation: 'Baskets = {1: 1, 2: 1} ➔ 2 fruit types',
        comparison: '2 types <= 2',
        action: 'Set maxFruits = 2',
        desc: 'Expand R = 1. Collect fruit type 2. Baskets hold types 1 and 2 (2 fruits). maxFruits = 2.'
      },
      {
        stepNum: 4,
        title: 'Step 4: Collect Fruit Type 2 at R=2 (3 Fruits Total!)',
        left: 0,
        right: 2,
        array: [1, 2, 2, 3, 2, 2],
        computation: 'Baskets = {1: 1, 2: 2} ➔ 3 fruits total',
        comparison: '2 types <= 2 ➔ Update maxFruits = 3!',
        action: 'Update maxFruits',
        isMatch: true,
        desc: 'Expand R = 2. Collect another fruit type 2. Baskets hold types 1 and 2 (3 fruits total). Update maxFruits = 3! 🎉'
      },
      {
        stepNum: 5,
        title: 'Step 5: Collect Fruit Type 3 at R=3 ➔ 3 Types! (INVALID)',
        left: 0,
        right: 3,
        array: [1, 2, 2, 3, 2, 2],
        computation: 'Baskets = {1: 1, 2: 2, 3: 1} ➔ 3 distinct types!',
        comparison: '3 types > 2 (INVALID BASKET COUNT)',
        action: 'Shrink L++',
        desc: 'Expand R = 3. Fruit type 3 collected! 3 distinct fruit types in baskets (> 2 allowed). Must shrink L.'
      },
      {
        stepNum: 6,
        title: 'Step 6: Shrink L to 1 (Remove Type 1)',
        left: 1,
        right: 3,
        array: [1, 2, 2, 3, 2, 2],
        computation: 'Baskets = {2: 2, 3: 1} ➔ 2 distinct types',
        comparison: '2 types <= 2 (Valid again)',
        action: 'Expand R++',
        desc: 'Shrink L to 1. Removed fruit type 1. Baskets hold types 2 and 3 (3 fruits total). Valid again!'
      },
      {
        stepNum: 7,
        title: 'Step 7: Collect Fruit Type 2 at R=4 (4 Fruits Total!)',
        left: 1,
        right: 4,
        array: [1, 2, 2, 3, 2, 2],
        computation: 'Baskets = {2: 3, 3: 1} ➔ 4 fruits total',
        comparison: '2 types <= 2 ➔ Update maxFruits = 4!',
        action: 'Update maxFruits',
        isMatch: true,
        desc: 'Expand R = 4 (fruit type 2). Baskets hold types 2 and 3 (4 fruits total). Update maxFruits = 4! 🎉'
      },
      {
        stepNum: 8,
        title: 'Step 8: Collect Fruit Type 2 at R=5 (5 Fruits Total! MAX!)',
        left: 1,
        right: 5,
        array: [1, 2, 2, 3, 2, 2],
        computation: 'Baskets = {2: 4, 3: 1} ➔ 5 fruits total',
        comparison: '2 types <= 2 ➔ MAX FRUITS = 5! 🎉',
        action: 'Update maxFruits = 5',
        isMatch: true,
        desc: 'Expand R = 5 (fruit type 2). Baskets hold types 2 and 3 (5 fruits total)! Max fruits = 5! 🎉'
      },
      {
        stepNum: 9,
        title: 'Step 9: Traversal Complete! Return 5 Fruits',
        left: 1,
        right: 5,
        array: [1, 2, 2, 3, 2, 2],
        computation: 'Optimal Subarray: [2, 2, 3, 2, 2]',
        comparison: 'MAX FRUITS = 5 🎉',
        action: 'Return 5',
        isMatch: true,
        desc: 'Traversal complete! Maximum number of fruits collected in 2 baskets is 5 (subarray [2, 2, 3, 2, 2]). 🎉'
      }
    ]
  },

  // === 3. BACKTRACKING TRACKS ===
  'backtracking': {
    title: '1. Backtracking Concept - N-Queens (4x4)',
    input: 'Board = 4x4 Chessboard, N = 4 Queens',
    goal: 'Place N non-attacking queens on N x N chessboard using DFS & backtracking.',
    terms: {
      'Row / Col': 'Board coordinates for attempting Queen placement (row 0..3, col 0..3).',
      'Conflict Check': 'Validates that no queen attacks on same column, row, or major/minor diagonals.',
      'Backtrack Action ⏪': 'Removes previously placed queen when current row encounters a dead-end with no valid columns.'
    },
    array: ['Q0', 'Q1', 'Q2', 'Q3'],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Try Placing Queen at (0, 0)',
        left: 0,
        right: 0,
        board: [
          [1, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        computation: 'Valid placement at (0, 0)',
        comparison: 'Row 0 Valid ✅',
        action: 'Recurse to Row 1',
        desc: 'Place Queen at (0, 0). Check safety against all previously placed queens: Row 0 has zero queens so far. Column 0 and both diagonal attack vectors are completely clear! Place Queen at (0, 0) and recurse to Row 1.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Try (1, 0) ➔ Column Conflict ❌',
        left: 1,
        right: 0,
        board: [
          [1, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        conflictCell: [1, 0],
        computation: 'Col 0 already occupied by Queen at (0, 0)',
        comparison: 'Column Conflict ❌',
        action: 'Try Col 1',
        desc: 'Inspect Row 1, Column 0 for candidate placement (1, 0). Check column safety: Column 0 already contains a Queen placed at (0, 0)! This triggers an immediate Column Conflict ❌. Prune this branch and advance to Column 1.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Try (1, 1) ➔ Diagonal Conflict ❌',
        left: 1,
        right: 1,
        board: [
          [1, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        conflictCell: [1, 1],
        computation: 'Major diagonal attack from Queen at (0, 0)',
        comparison: 'Diagonal Conflict ❌',
        action: 'Try Col 2',
        desc: 'Inspect Row 1, Column 1 for candidate placement (1, 1). Check diagonal safety: The cell (1, 1) lies directly on the major diagonal extending from (0, 0) since |1 - 0| === |1 - 0|! This triggers a Diagonal Conflict ❌. Prune this branch and advance to Column 2.'
      },
      {
        stepNum: 4,
        title: 'Step 4: Try (1, 2) ➔ Valid Placement ✅',
        left: 1,
        right: 2,
        board: [
          [1, 0, 0, 0],
          [0, 0, 1, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        computation: 'Valid placement at (1, 2)',
        comparison: 'Row 1 Valid ✅',
        action: 'Recurse to Row 2',
        desc: 'Inspect Row 1, Column 2 for candidate placement (1, 2). Check safety: Column 2 is unoccupied, and no diagonal alignment exists with (0, 0). Placement is Valid ✅! Place Queen at (1, 2) and recurse to Row 2.'
      },
      {
        stepNum: 5,
        title: 'Step 5: Row 2 Dead-End (No Valid Columns)',
        left: 2,
        right: 0,
        board: [
          [1, 0, 0, 0],
          [0, 0, 1, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        conflictCell: [2, 0],
        computation: 'Conflicts at (2,0), (2,1), (2,2), (2,3)',
        comparison: 'DEAD END ❌',
        action: 'Trigger Backtrack ⏪',
        desc: 'Inspect Row 2: Test candidate cells (2, 0), (2, 1), (2, 2), and (2, 3). Cell (2, 0) conflicts with col 0, (2, 1) conflicts with diagonal from (1, 2), (2, 2) conflicts with col 2, and (2, 3) conflicts with diagonal from (1, 2)! All 4 columns in Row 2 fail! DEAD END ❌ reached.'
      },
      {
        stepNum: 6,
        title: 'Step 6: Backtrack to Row 1 ⏪ (Remove Queen at (1, 2))',
        left: 1,
        right: 2,
        board: [
          [1, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        computation: 'Remove Queen from (1, 2)',
        comparison: 'Backtrack Action ⏪',
        action: 'Try Col 3',
        desc: 'Row 2 produced zero valid placements! ⏪ BACKTRACK to Row 1 by popping the stack frame. Un-place the Queen at (1, 2) by restoring cell (1, 2) to empty (0). Resume search in Row 1 starting at Column 3.'
      },
      {
        stepNum: 7,
        title: 'Step 7: Place Queen at (1, 3)',
        left: 1,
        right: 3,
        board: [
          [1, 0, 0, 0],
          [0, 0, 0, 1],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        computation: 'Valid placement at (1, 3)',
        comparison: 'Row 1 Valid ✅',
        action: 'Recurse to Row 2',
        desc: 'Inspect Row 1, Column 3 for candidate placement (1, 3). Check safety against Queen at (0, 0): Column 3 is free, and no diagonal conflict exists. Placement is Valid ✅! Place Queen at (1, 3) and recurse to Row 2.'
      },
      {
        stepNum: 8,
        title: 'Step 8: Place Queen at (2, 1)',
        left: 2,
        right: 1,
        board: [
          [1, 0, 0, 0],
          [0, 0, 0, 1],
          [0, 1, 0, 0],
          [0, 0, 0, 0]
        ],
        computation: 'Valid placement at (2, 1)',
        comparison: 'Row 2 Valid ✅',
        action: 'Recurse to Row 3',
        desc: 'Inspect Row 2, Column 1 for candidate placement (2, 1). Check safety: Column 1 is free, and diagonal checks against (0, 0) and (1, 3) both pass! Placement is Valid ✅! Place Queen at (2, 1) and recurse to Row 3.'
      },
      {
        stepNum: 9,
        title: 'Step 9: Row 3 Dead-End ➔ Backtrack to Row 0 ⏪',
        left: 0,
        right: 1,
        board: [
          [0, 1, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        computation: 'Row 3 dead-end! Backtrack to Row 0 col 1',
        comparison: 'Branch Switch ⏪',
        action: 'Place Queen at (0, 1)',
        desc: 'Row 3 fails all column checks! ⏪ Backtrack all the way back to Row 0! Remove Queen from (0, 0). Advance Row 0 to Column 1 (0, 1). Column 1 is clear! Place Queen at (0, 1) and explore the entire right decision subtree.'
      },
      {
        stepNum: 10,
        title: 'Step 10: Complete 4-Queens Solution Found! 🎉',
        left: 0,
        right: 3,
        board: [
          [0, 1, 0, 0],
          [0, 0, 0, 1],
          [1, 0, 0, 0],
          [0, 0, 1, 0]
        ],
        computation: 'Queens placed at (0,1), (1,3), (2,0), (3,2)',
        comparison: '4 QUEENS NON-ATTACKING 🎉',
        action: 'Record Solution',
        isMatch: true,
        desc: 'Recurse through rows 1..3 along the (0, 1) branch. Queens successfully placed at (0, 1), (1, 3), (2, 0), and (3, 2). All 4 Queens sit in mutually non-attacking squares! FIRST SOLUTION DISCOVERED 🎉!'
      }
    ]
  },

  'n-queens': {
    title: 'N-Queens Solver (4x4 Chessboard)',
    input: 'Board = 4x4 Chessboard, N = 4 Queens',
    goal: 'Find all non-attacking queen configurations on N x N chessboard.',
    terms: {
      'Row / Col': 'Board coordinates for attempting Queen placement (row 0..3, col 0..3).',
      'Conflict Check': 'Validates that no queen attacks on same column, row, or major/minor diagonals.',
      'Backtrack Action ⏪': 'Removes previously placed queen when current row encounters a dead-end with no valid columns.'
    },
    array: ['Q0', 'Q1', 'Q2', 'Q3'],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Place Queen at (0, 0)',
        left: 0,
        right: 0,
        board: [
          [1, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        computation: 'Valid placement at (0, 0)',
        comparison: 'Row 0 Valid ✅',
        action: 'Recurse to Row 1',
        desc: 'Place Queen at (0, 0). Check safety against all previously placed queens: Row 0 has zero queens so far. Column 0 and both diagonal attack vectors are completely clear! Place Queen at (0, 0) and recurse to Row 1.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Try (1, 0) Column Conflict ❌',
        left: 1,
        right: 0,
        board: [
          [1, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        conflictCell: [1, 0],
        computation: 'Col 0 occupied',
        comparison: 'Column Conflict ❌',
        action: 'Try Col 1',
        desc: 'Inspect Row 1, Column 0 for candidate placement (1, 0). Check column safety: Column 0 already contains a Queen placed at (0, 0)! This triggers an immediate Column Conflict ❌. Prune this branch and advance to Column 1.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Try (1, 1) Diagonal Conflict ❌',
        left: 1,
        right: 1,
        board: [
          [1, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        conflictCell: [1, 1],
        computation: 'Diagonal attack',
        comparison: 'Diagonal Conflict ❌',
        action: 'Try Col 2',
        desc: 'Inspect Row 1, Column 1 for candidate placement (1, 1). Check diagonal safety: The cell (1, 1) lies directly on the major diagonal extending from (0, 0) since |1 - 0| === |1 - 0|! This triggers a Diagonal Conflict ❌. Prune this branch and advance to Column 2.'
      },
      {
        stepNum: 4,
        title: 'Step 4: Place Queen at (1, 2)',
        left: 1,
        right: 2,
        board: [
          [1, 0, 0, 0],
          [0, 0, 1, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        computation: 'Valid placement at (1, 2)',
        comparison: 'Row 1 Valid ✅',
        action: 'Recurse to Row 2',
        desc: 'Inspect Row 1, Column 2 for candidate placement (1, 2). Check safety: Column 2 is unoccupied, and no diagonal alignment exists with (0, 0). Placement is Valid ✅! Place Queen at (1, 2) and recurse to Row 2.'
      },
      {
        stepNum: 5,
        title: 'Step 5: Backtrack to Row 1 ⏪',
        left: 1,
        right: 2,
        board: [
          [1, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        computation: 'Row 2 dead end ➔ Remove (1, 2)',
        comparison: 'Backtrack ⏪',
        action: 'Try Col 3',
        desc: 'Row 2 produced zero valid placements! ⏪ BACKTRACK to Row 1 by popping the stack frame. Un-place the Queen at (1, 2) by restoring cell (1, 2) to empty (0). Resume search in Row 1 starting at Column 3.'
      },
      {
        stepNum: 6,
        title: 'Step 6: Solution 1 Found at (0,1), (1,3), (2,0), (3,2)! 🎉',
        left: 0,
        right: 3,
        board: [
          [0, 1, 0, 0],
          [0, 0, 0, 1],
          [1, 0, 0, 0],
          [0, 0, 1, 0]
        ],
        computation: 'Solution 1: (0,1), (1,3), (2,0), (3,2)',
        comparison: 'N-QUEENS SOLVED 🎉',
        action: 'Solution Found',
        isMatch: true,
        desc: 'Recurse through rows 1..3 along the (0, 1) branch. Queens successfully placed at (0, 1), (1, 3), (2, 0), and (3, 2). All 4 Queens sit in mutually non-attacking squares! FIRST SOLUTION DISCOVERED 🎉!'
      }
    ]
  },

  'sudoku': {
    title: 'Sudoku Solver (4x4 Mini Grid)',
    input: 'Grid = 4x4 Mini Sudoku Grid',
    goal: 'Fill empty cells with digits 1..4 such that each row, col, and 2x2 box is unique.',
    terms: {
      'Cell (r, c)': 'Target empty grid cell coordinate.',
      'Digit Candidate': 'Digits 1..4 attempted in target cell.',
      'Subgrid Check': 'Validates digit against row, column, and 2x2 subgrid.'
    },
    array: [1, 2, 3, 4],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Cell (0, 1) Empty ➔ Try Digit 1 (Conflict ❌)',
        left: 0,
        right: 1,
        grid: [
          [1, 0, 3, 0],
          [0, 0, 0, 2],
          [0, 1, 0, 0],
          [4, 0, 0, 3]
        ],
        activeCell: [0, 1],
        conflictCell: [0, 0],
        computation: 'Row 0 already contains 1 at (0, 0)',
        comparison: 'Row Conflict ❌',
        action: 'Try Digit 2',
        desc: 'Inspect empty cell (0, 1). Candidate digit 1 tested: Row 0 already contains digit 1 at index (0, 0). Row constraint violated! Row Conflict ❌. Prune digit 1 and try candidate digit 2.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Try Digit 2 at (0, 1) ➔ Valid! ✅',
        left: 0,
        right: 1,
        grid: [
          [1, 2, 3, 0],
          [0, 0, 0, 2],
          [0, 1, 0, 0],
          [4, 0, 0, 3]
        ],
        activeCell: [0, 1],
        computation: 'Row/Col/Box Valid',
        comparison: 'Valid Placement ✅',
        action: 'Place 2',
        desc: 'Candidate digit 2 tested at cell (0, 1). Check Row 0, Column 1, and top-left 2x2 subgrid: No duplicate 2 exists in row, col, or box! Valid Placement ✅! Write digit 2 into cell (0, 1) and advance to next empty cell.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Fill Cell (0, 3) with Digit 4 ➔ Row 1 Complete!',
        left: 0,
        right: 3,
        grid: [
          [1, 2, 3, 4],
          [0, 0, 0, 2],
          [0, 1, 0, 0],
          [4, 0, 0, 3]
        ],
        activeCell: [0, 3],
        computation: 'Row 1 completed: [1, 2, 3, 4]',
        comparison: 'Row 1 Valid ✅',
        action: 'Recurse to Row 2',
        desc: 'Inspect empty cell (0, 3). Candidate digit 4 tested. Row 0, Column 3, and top-right 2x2 box checked: Valid! Write digit 4 into cell (0, 3). Row 1 is now fully solved: [1, 2, 3, 4]!'
      },
      {
        stepNum: 4,
        title: 'Step 4: Fill Cell (1, 0) with Digit 3',
        left: 1,
        right: 0,
        grid: [
          [1, 2, 3, 4],
          [3, 0, 0, 2],
          [0, 1, 0, 0],
          [4, 0, 0, 3]
        ],
        activeCell: [1, 0],
        computation: 'Try digit 3 at (1, 0)',
        comparison: 'Valid Placement ✅',
        action: 'Place 3',
        desc: 'Inspect empty cell (1, 0). Candidate digit 3 tested. Check Row 1, Column 0, and top-left 2x2 subgrid: No duplicate 3 found. Valid! Write 3 into cell (1, 0).'
      },
      {
        stepNum: 5,
        title: 'Step 5: Fill Cell (1, 1) with Digit 4',
        left: 1,
        right: 1,
        grid: [
          [1, 2, 3, 4],
          [3, 4, 0, 2],
          [0, 1, 0, 0],
          [4, 0, 0, 3]
        ],
        activeCell: [1, 1],
        computation: 'Try digit 4 at (1, 1)',
        comparison: 'Valid Placement ✅',
        action: 'Place 4',
        desc: 'Inspect empty cell (1, 1). Candidate digit 4 tested. Check Row 1, Column 1, and top-left 2x2 box: No duplicate 4 found. Valid! Write 4 into cell (1, 1).'
      },
      {
        stepNum: 6,
        title: 'Step 6: Fill Cell (1, 2) with Digit 1 ➔ Row 2 Complete!',
        left: 1,
        right: 2,
        grid: [
          [1, 2, 3, 4],
          [3, 4, 1, 2],
          [0, 1, 0, 0],
          [4, 0, 0, 3]
        ],
        activeCell: [1, 2],
        computation: 'Row 2 completed: [3, 4, 1, 2]',
        comparison: 'Row 2 Valid ✅',
        action: 'Recurse to Row 3',
        desc: 'Inspect empty cell (1, 2). Candidate digit 1 tested. Check Row 1, Column 2, and top-right 2x2 box: Valid! Row 2 is now fully solved: [3, 4, 1, 2]!'
      },
      {
        stepNum: 7,
        title: 'Step 7: Solve Row 3 ➔ [2, 1, 4, 3]',
        left: 2,
        right: 3,
        grid: [
          [1, 2, 3, 4],
          [3, 4, 1, 2],
          [2, 1, 4, 3],
          [4, 0, 0, 3]
        ],
        activeCell: [2, 3],
        computation: 'Row 3 completed: [2, 1, 4, 3]',
        comparison: 'Row 3 Valid ✅',
        action: 'Recurse to Row 4',
        desc: 'Recurse to Row 3 empty cells. Fill cell (2, 0) = 2, cell (2, 2) = 4, and cell (2, 3) = 3. All row, col, and subgrid constraints satisfied for Row 3: [2, 1, 4, 3]!'
      },
      {
        stepNum: 8,
        title: 'Step 8: Solve All Grid Cells ➔ Sudoku Complete! 🎉',
        left: 0,
        right: 3,
        grid: [
          [1, 2, 3, 4],
          [3, 4, 1, 2],
          [2, 1, 4, 3],
          [4, 3, 2, 1]
        ],
        activeCell: [3, 3],
        computation: 'Entire 4x4 Grid Filled',
        comparison: 'SUDOKU PUZZLE SOLVED 🎉',
        action: 'Return Grid',
        isMatch: true,
        desc: 'Recurse to Row 4 empty cells. Fill cell (3, 1) = 3, cell (3, 2) = 2, and cell (3, 3) = 1. Every single empty cell across the 4x4 grid is filled without constraint violation! SUDOKU PUZZLE SOLVED 🎉!'
      }
    ]
  },

  'subsets': {
    title: 'Subsets & Power Set Generator',
    input: 'Array = [1, 2, 3]',
    goal: 'Generate all 2^N possible subsets using binary decision tree.',
    terms: {
      'Include Branch': 'Decision to include arr[i] into current subset.',
      'Exclude Branch': 'Decision to skip arr[i] and leave subset unchanged.',
      'Power Set': 'Complete set of all 2^N sub-collections.'
    },
    array: [1, 2, 3],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Start Decision Tree (Empty Subset [])',
        left: 0,
        right: 0,
        currentSubset: [],
        subsets: [[]],
        computation: 'Initial state: []',
        comparison: 'Power set size = 1',
        action: 'Include 1',
        desc: 'Initialize the binary decision tree for generating power set of [1, 2, 3]. At depth 0, the current subset is empty []. Record [] as the 1st valid subset in the power set.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Include 1 ➔ Subset [1]',
        left: 0,
        right: 0,
        currentSubset: [1],
        subsets: [[], [1]],
        computation: 'Include element 1: [1]',
        comparison: 'Subset [1] generated',
        action: 'Recurse',
        desc: 'At index 0 (val 1), explore the INCLUDE branch. Append 1 to current subset ➔ [1]. Recurse to index 1. Record subset [1] into power set.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Include 2 ➔ Subset [1, 2]',
        left: 0,
        right: 1,
        currentSubset: [1, 2],
        subsets: [[], [1], [1, 2]],
        computation: 'Include element 2: [1, 2]',
        comparison: 'Subset [1, 2] generated',
        action: 'Recurse',
        desc: 'At index 1 (val 2), explore the INCLUDE branch. Append 2 to current subset ➔ [1, 2]. Recurse to index 2. Record subset [1, 2] into power set.'
      },
      {
        stepNum: 4,
        title: 'Step 4: Include 3 ➔ Subset [1, 2, 3]',
        left: 0,
        right: 2,
        currentSubset: [1, 2, 3],
        subsets: [[], [1], [1, 2], [1, 2, 3]],
        computation: 'Include element 3: [1, 2, 3]',
        comparison: 'Leaf Reached',
        action: 'Backtrack 3 ⏪',
        desc: 'At index 2 (val 3), explore the INCLUDE branch. Append 3 to current subset ➔ [1, 2, 3]. Base case depth 3 reached! Record leaf subset [1, 2, 3] into power set.'
      },
      {
        stepNum: 5,
        title: 'Step 5: Backtrack Element 3 ⏪',
        left: 0,
        right: 1,
        currentSubset: [1, 2],
        subsets: [[], [1], [1, 2], [1, 2, 3]],
        computation: 'Remove element 3 ➔ Back to [1, 2]',
        comparison: 'Backtrack Action ⏪',
        action: 'Try Exclude 2',
        desc: 'Base case finished! ⏪ BACKTRACK to depth 2 by popping element 3 from current subset [1, 2, 3] ➔ Current subset reverts to [1, 2].'
      },
      {
        stepNum: 6,
        title: 'Step 6: Exclude 2, Include 3 ➔ Subset [1, 3]',
        left: 0,
        right: 2,
        currentSubset: [1, 3],
        subsets: [[], [1], [1, 2], [1, 2, 3], [1, 3]],
        computation: 'Subset = [1, 3]',
        comparison: 'Subset [1, 3] generated',
        action: 'Recurse Right Branch',
        desc: 'At depth 2, explore the EXCLUDE branch for element 2 and INCLUDE branch for element 3. Current subset becomes [1, 3]. Record subset [1, 3] into power set.'
      },
      {
        stepNum: 7,
        title: 'Step 7: Exclude 1, Include 2 ➔ Subset [2]',
        left: 1,
        right: 1,
        currentSubset: [2],
        subsets: [[], [1], [1, 2], [1, 2, 3], [1, 3], [2]],
        computation: 'Backtrack to root: Exclude 1, Include 2',
        comparison: 'Subset [2] generated',
        action: 'Recurse',
        desc: 'Backtrack to root depth 0. Explore right branch excluding element 1 and including element 2. Current subset = [2]. Record subset [2] into power set.'
      },
      {
        stepNum: 8,
        title: 'Step 8: Include 3 ➔ Subset [2, 3]',
        left: 1,
        right: 2,
        currentSubset: [2, 3],
        subsets: [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3]],
        computation: 'Include 3: [2, 3]',
        comparison: 'Subset [2, 3] generated',
        action: 'Recurse',
        desc: 'At index 2, include element 3. Current subset = [2, 3]. Record subset [2, 3] into power set.'
      },
      {
        stepNum: 9,
        title: 'Step 9: All 8 Subsets Generated! 🎉',
        left: 0,
        right: 2,
        currentSubset: [],
        subsets: [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]],
        computation: 'Power Set: [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]',
        comparison: '2^3 = 8 SUBSETS COMPLETE 🎉',
        action: 'Return Power Set',
        isMatch: true,
        desc: 'All 2^3 = 8 binary decision branches fully traversed! Power set generation complete: [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]]. 🎉'
      }
    ]
  },

  // === 4. ARRAY TRACKS ===
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
        title: 'Step 5: Calculate RAM Target Address: 0x1000 + 0x0C = 0x100C',
        left: 0,
        right: 3,
        array: [10, 25, 42, 58, 73, 89],
        computation: '0x1000 + 0x0C = 0x100C',
        comparison: 'Target Address 0x100C Ready',
        action: 'Jump to Address',
        desc: 'Compute Target Memory Address: Target_Address = Base_Address + Offset = 0x1000 + 12 = 0x100C.'
      },
      {
        stepNum: 6,
        title: 'Step 6: Execute Direct O(1) Memory Jump to Address 0x100C',
        left: 3,
        right: 3,
        array: [10, 25, 42, 58, 73, 89],
        computation: 'Pointer jumps directly to Index 3 (0x100C)',
        comparison: 'O(1) Direct Lookup',
        action: 'Fetch Binary Word',
        desc: 'Jump directly to memory address 0x100C (Index 3). The CPU pointer moves to index 3 without performing linear iteration.'
      },
      {
        stepNum: 7,
        title: 'Step 7: Fetch 4-Byte Binary Word from Address 0x100C',
        left: 3,
        right: 3,
        array: [10, 25, 42, 58, 73, 89],
        computation: 'Read 0x100C ➔ 58',
        comparison: 'Zero Iterations Executed',
        action: 'Decode Value',
        desc: 'Read 4-byte integer from RAM address 0x100C: Value = 58. Zero element shifts or scans needed.'
      },
      {
        stepNum: 8,
        title: 'Step 8: Decode Value arr[3] = 58 with Zero Element Scans',
        left: 3,
        right: 3,
        array: [10, 25, 42, 58, 73, 89],
        computation: 'arr[3] = 58',
        comparison: 'Value Decoded ✅',
        action: 'Return 58',
        desc: 'Decode binary payload at address 0x100C into decimal integer 58.'
      },
      {
        stepNum: 9,
        title: 'Step 9: Direct O(1) Random Access Complete! 🎉',
        left: 3,
        right: 3,
        array: [10, 25, 42, 58, 73, 89],
        computation: 'arr[3] = 58',
        comparison: 'O(1) ACCESS SUCCESSFUL 🎉',
        action: 'Return 58',
        isMatch: true,
        desc: 'Read value stored at memory address 0x100C: arr[3] = 58. Instantaneous O(1) random access completed! 🎉'
      }
    ]
  },

  'access': {
    title: 'Array Random Access O(1)',
    input: 'Array = [10, 25, 42, 58, 73, 89], Target Index = 3',
    goal: 'Retrieve element at target index in O(1) time via direct memory offset.',
    terms: {
      'Index (i)': 'Target offset (index 3).',
      'Address Formula': 'base_address + 3 * element_bytes.',
      'O(1) Access': 'Instantaneous retrieval independent of array length.'
    },
    array: [10, 25, 42, 58, 73, 89],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Inspect Base Address (0x1000)',
        left: 0,
        right: 0,
        array: [10, 25, 42, 58, 73, 89],
        computation: 'Base_Address = 0x1000',
        comparison: 'Target Index = 3',
        action: 'Init Pointer',
        desc: 'Inspect array starting at Base Address 0x1000. Element size is 4 bytes. Target index is 3.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Inspect Memory Layout & Allocation',
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
        title: 'Step 3: Bounds Check (0 <= 3 < 6)',
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
        title: 'Step 4: Compute Offset: 3 * 4 bytes = 12 bytes (0x0C)',
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
        title: 'Step 5: Compute Target Memory Address (0x100C)',
        left: 0,
        right: 3,
        array: [10, 25, 42, 58, 73, 89],
        computation: '0x1000 + 0x0C = 0x100C',
        comparison: 'Target Address 0x100C Ready',
        action: 'Jump to Address',
        desc: 'Compute Target Memory Address: Target_Address = Base_Address + Offset = 0x1000 + 12 = 0x100C.'
      },
      {
        stepNum: 6,
        title: 'Step 6: Direct Jump to Memory Address 0x100C',
        left: 3,
        right: 3,
        array: [10, 25, 42, 58, 73, 89],
        computation: 'Jump to 0x100C',
        comparison: 'Zero Iteration Search',
        action: 'Fetch Word',
        desc: 'Jump directly to Memory Address 0x100C (Index 3). Pointer moves to index 3 without linear iteration.'
      },
      {
        stepNum: 7,
        title: 'Step 7: Read 4-Byte Integer from RAM (58)',
        left: 3,
        right: 3,
        array: [10, 25, 42, 58, 73, 89],
        computation: 'Read 0x100C ➔ 58',
        comparison: 'Zero Iterations Executed',
        action: 'Decode Value',
        desc: 'Read 4-byte integer from RAM address 0x100C: Value = 58. Zero element shifts or scans needed.'
      },
      {
        stepNum: 8,
        title: 'Step 8: Decode Binary Payload to Integer 58',
        left: 3,
        right: 3,
        array: [10, 25, 42, 58, 73, 89],
        computation: 'arr[3] = 58',
        comparison: 'Value Decoded ✅',
        action: 'Return 58',
        desc: 'Decode binary word at address 0x100C into integer 58.'
      },
      {
        stepNum: 9,
        title: 'Step 9: Read Memory Value 58 in O(1) Time',
        left: 3,
        right: 3,
        array: [10, 25, 42, 58, 73, 89],
        computation: 'arr[3] = 58',
        comparison: 'O(1) RANDOM ACCESS 🎉',
        action: 'Return 58',
        isMatch: true,
        desc: 'Read value stored at memory address 0x100C: Value = 58. Direct O(1) Memory Access complete! 🎉'
      }
    ]
  },

  'insertion': {
    title: 'Array In-Place Insertion O(N)',
    input: 'Array = [10, 20, 30, 40, null], Insert 99 at Index 2',
    goal: 'Shift elements right to vacate target slot and write new value in O(N) time.',
    terms: {
      'Insert Index': 'Target position (index 2) for writing new element.',
      'Right Shift': 'Shifting elements right from n-1 down to insert index to vacate slot.'
    },
    array: [10, 20, 30, 40, null],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Identify Target Index 2 for Insertion',
        left: 2,
        right: 2,
        array: [10, 20, 30, 40, null],
        computation: 'Insert 99 at index 2 (Current val = 30)',
        comparison: 'Target Occupied',
        action: 'Start Right Shift',
        desc: 'Target insertion index is 2. Current value at arr[2] is 30. Must shift elements right to make room.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Vacancy Check (Space Available ✅)',
        left: 2,
        right: 4,
        array: [10, 20, 30, 40, null],
        computation: 'arr[4] == null (Space available)',
        comparison: 'Capacity Check Passed',
        action: 'Init Loop Pointer i=3',
        desc: 'Inspect target index 2 (30). Vacancy check: Last slot arr[4] is null (Space available ✅).'
      },
      {
        stepNum: 3,
        title: 'Step 3: Initialize Right-Shifting Loop (i = 3)',
        left: 3,
        right: 4,
        array: [10, 20, 30, 40, null],
        computation: 'for i from 3 down to 2',
        comparison: 'Loop Initialized',
        action: 'Shift arr[3]',
        desc: 'Initialize right-shifting loop for i from N-1 (3) down to insertIndex (2). Set i = 3.'
      },
      {
        stepNum: 4,
        title: 'Step 4: Shift arr[3] (40) Right into Slot 4',
        left: 3,
        right: 4,
        array: [10, 20, 30, 40, 40],
        computation: 'arr[4] = arr[3] (40)',
        comparison: 'Element 40 Shifted',
        action: 'Decrement i to 2',
        desc: 'Shift rightmost element arr[3] (40) into empty slot arr[4]. Array becomes [10, 20, 30, 40, 40].'
      },
      {
        stepNum: 5,
        title: 'Step 5: Decrement Loop Pointer i to 2',
        left: 2,
        right: 3,
        array: [10, 20, 30, 40, 40],
        computation: 'i = 2 >= insertIndex (2)',
        comparison: 'Loop Condition Holds',
        action: 'Shift arr[2]',
        desc: 'Decrement loop index i to 2. Inspect element at i = 2 (30).'
      },
      {
        stepNum: 6,
        title: 'Step 6: Shift arr[2] (30) Right into Slot 3',
        left: 2,
        right: 3,
        array: [10, 20, 30, 30, 40],
        computation: 'arr[3] = arr[2] (30)',
        comparison: 'Element 30 Shifted',
        action: 'Vacate Index 2',
        desc: 'Shift arr[2] (30) right into slot arr[3]. Array becomes [10, 20, 30, 30, 40]. Slot at index 2 is now ready!'
      },
      {
        stepNum: 7,
        title: 'Step 7: Index 2 Safely Vacated',
        left: 2,
        right: 2,
        array: [10, 20, null, 30, 40],
        computation: 'Index 2 cleared for writing',
        comparison: 'Slot Ready',
        action: 'Write Value 99',
        desc: 'Shifting loop complete! Index 2 is now safely vacated. Previous values 30 and 40 have been shifted right.'
      },
      {
        stepNum: 8,
        title: 'Step 8: Write Value 99 into Index 2',
        left: 2,
        right: 2,
        array: [10, 20, 99, 30, 40],
        computation: 'arr[2] = 99',
        comparison: 'Value 99 Written',
        action: 'Finalize Size',
        desc: 'Write new value 99 into vacated slot at index 2. Array transforms to [10, 20, 99, 30, 40].'
      },
      {
        stepNum: 9,
        title: 'Step 9: Increment Array Size N to 5 ➔ Insertion Complete! 🎉',
        left: 2,
        right: 2,
        array: [10, 20, 99, 30, 40],
        computation: 'Array size N = 5',
        comparison: 'O(N) INSERTION COMPLETE 🎉',
        action: 'Return Array',
        isMatch: true,
        desc: 'Increment array length N to 5. Insertion complete! Total elements shifted = 2. Overall time complexity O(N)! 🎉'
      }
    ]
  },

  'deletion': {
    title: 'Array In-Place Deletion O(N)',
    input: 'Array = [10, 20, 99, 30, 40], Delete Index 2 (val 99)',
    goal: 'Overwrite deleted index by shifting all subsequent elements left in O(N) time.',
    terms: {
      'Delete Index': 'Target index (index 2) to be removed.',
      'Left Shift': 'Copying elements left by 1 position to overwrite deleted index.'
    },
    array: [10, 20, 99, 30, 40],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Identify Deletion Index 2 (val 99)',
        left: 2,
        right: 2,
        array: [10, 20, 99, 30, 40],
        computation: 'Target = arr[2] (99)',
        comparison: 'Target Identified',
        action: 'Start Left Shift',
        desc: 'Target index for removal is 2 (value 99). Elements after index 2 must be shifted left by 1 position.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Verify Bounds (0 <= 2 < 5 ✅)',
        left: 2,
        right: 2,
        array: [10, 20, 99, 30, 40],
        computation: '0 <= 2 < 5 ➔ Valid Bounds',
        comparison: 'Bounds Check Passed',
        action: 'Init Loop i=2',
        desc: 'Verify target index bounds: 0 <= 2 < 5 (Valid index ✅).'
      },
      {
        stepNum: 3,
        title: 'Step 3: Initialize Left-Shifting Loop (i = 2)',
        left: 2,
        right: 3,
        array: [10, 20, 99, 30, 40],
        computation: 'for i from 2 to 3',
        comparison: 'Loop Initialized',
        action: 'Copy arr[3] ➔ arr[2]',
        desc: 'Initialize left-shifting loop for i from deleteIndex (2) to N-2 (3). Set pointer i = 2.'
      },
      {
        stepNum: 4,
        title: 'Step 4: Shift arr[3] (30) Left Overwriting Index 2',
        left: 2,
        right: 3,
        array: [10, 20, 30, 30, 40],
        computation: 'arr[2] = arr[3] (30)',
        comparison: 'Value 99 Overwritten',
        action: 'Advance i to 3',
        desc: 'Shift arr[3] (30) left into arr[2]. Overwrites target element 99! Array becomes [10, 20, 30, 30, 40].'
      },
      {
        stepNum: 5,
        title: 'Step 5: Advance Loop Pointer i to 3',
        left: 3,
        right: 4,
        array: [10, 20, 30, 30, 40],
        computation: 'i = 3 <= N-2 (3)',
        comparison: 'Loop Condition Holds',
        action: 'Copy arr[4] ➔ arr[3]',
        desc: 'Advance loop pointer i to 3. Inspect next element arr[4] = 40.'
      },
      {
        stepNum: 6,
        title: 'Step 6: Shift arr[4] (40) Left into Index 3',
        left: 3,
        right: 4,
        array: [10, 20, 30, 40, 40],
        computation: 'arr[3] = arr[4] (40)',
        comparison: 'Element 40 Shifted',
        action: 'Complete Shifting',
        desc: 'Shift arr[4] (40) left into arr[3]. Array becomes [10, 20, 30, 40, 40].'
      },
      {
        stepNum: 7,
        title: 'Step 7: Trailing Duplicate Detected at arr[4]',
        left: 4,
        right: 4,
        array: [10, 20, 30, 40, 40],
        computation: 'arr[4] holds duplicate 40',
        comparison: 'Loop Completed',
        action: 'Clear Trailing Slot',
        desc: 'Left-shifting loop completes! Last slot arr[4] now holds duplicate value 40.'
      },
      {
        stepNum: 8,
        title: 'Step 8: Clear Trailing Duplicate Slot arr[4]',
        left: 4,
        right: 4,
        array: [10, 20, 30, 40, null],
        computation: 'arr[4] = null',
        comparison: 'Trailing Slot Cleared',
        action: 'Finalize Size',
        desc: 'Clear trailing duplicate slot arr[4] to null. Array becomes [10, 20, 30, 40, null].'
      },
      {
        stepNum: 9,
        title: 'Step 9: Decrement Array Size N from 5 to 4 ➔ Deletion Complete! 🎉',
        left: 0,
        right: 3,
        array: [10, 20, 30, 40, null],
        computation: 'Array size N = 4',
        comparison: 'O(N) DELETION COMPLETE 🎉',
        action: 'Return Array',
        isMatch: true,
        desc: 'Decrement logical array length N from 5 to 4. Deletion complete! Time complexity O(N)! 🎉'
      }
    ]
  },

  'prefix-sum': {
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
        left: 0,
        right: 0,
        array: [2, 4, 1, 3, 5],
        computation: 'prefix[0] = 2',
        comparison: 'Prefix Init',
        action: 'Compute prefix[1]',
        desc: 'Initialize prefix[0] = arr[0] = 2. Prefix array starts as [2, 0, 0, 0, 0].'
      },
      {
        stepNum: 2,
        title: 'Step 2: Compute prefix[1] = prefix[0] + arr[1] = 6',
        left: 0,
        right: 1,
        array: [2, 4, 1, 3, 5],
        computation: '2 + 4 = 6',
        comparison: 'prefix[1] = 6',
        action: 'Compute prefix[2]',
        desc: 'Compute prefix[1] = prefix[0] + arr[1] = 2 + 4 = 6. Prefix array becomes [2, 6, 0, 0, 0].'
      },
      {
        stepNum: 3,
        title: 'Step 3: Compute prefix[2] = prefix[1] + arr[2] = 7',
        left: 0,
        right: 2,
        array: [2, 4, 1, 3, 5],
        computation: '6 + 1 = 7',
        comparison: 'prefix[2] = 7',
        action: 'Compute prefix[3]',
        desc: 'Compute prefix[2] = prefix[1] + arr[2] = 6 + 1 = 7. Prefix array becomes [2, 6, 7, 0, 0].'
      },
      {
        stepNum: 4,
        title: 'Step 4: Compute prefix[3] = prefix[2] + arr[3] = 10',
        left: 0,
        right: 3,
        array: [2, 4, 1, 3, 5],
        computation: '7 + 3 = 10',
        comparison: 'prefix[3] = 10',
        action: 'Compute prefix[4]',
        desc: 'Compute prefix[3] = prefix[2] + arr[3] = 7 + 3 = 10. Prefix array becomes [2, 6, 7, 10, 0].'
      },
      {
        stepNum: 5,
        title: 'Step 5: Compute prefix[4] = prefix[3] + arr[4] = 15',
        left: 0,
        right: 4,
        array: [2, 4, 1, 3, 5],
        computation: '10 + 5 = 15',
        comparison: 'Full Prefix Ready',
        action: 'Receive Query',
        desc: 'Compute prefix[4] = prefix[3] + arr[4] = 10 + 5 = 15. Full prefix array ready: [2, 6, 7, 10, 15].'
      },
      {
        stepNum: 6,
        title: 'Step 6: Receive Range Query sum(L=1..R=3)',
        left: 1,
        right: 3,
        array: [2, 4, 1, 3, 5],
        computation: 'Target Range: [1..3]',
        comparison: 'Apply O(1) Formula',
        action: 'Substitute Values',
        desc: 'Receive range sum query sum(L=1..R=3). Apply formula rangeSum = prefix[R] - prefix[L-1].'
      },
      {
        stepNum: 7,
        title: 'Step 7: Substitute prefix[3] (10) - prefix[0] (2)',
        left: 1,
        right: 3,
        array: [2, 4, 1, 3, 5],
        computation: '10 - 2 = 8',
        comparison: 'Formula Evaluated',
        action: 'Finalize Result',
        desc: 'Substitute prefix values: prefix[3] (10) - prefix[0] (2) = 8.'
      },
      {
        stepNum: 8,
        title: 'Step 8: Compute Final Range Sum = 8',
        left: 1,
        right: 3,
        array: [2, 4, 1, 3, 5],
        computation: 'rangeSum = 8',
        comparison: 'Instant O(1) Answer',
        action: 'Return 8',
        desc: 'Calculate final result: Range Sum sum(1..3) = 8.'
      },
      {
        stepNum: 9,
        title: 'Step 9: Range Sum Query Complete in O(1) Time! 🎉',
        left: 1,
        right: 3,
        array: [2, 4, 1, 3, 5],
        computation: 'sum(1..3) = 8',
        comparison: 'RANGE SUM COMPUTED 🎉',
        action: 'Return 8',
        isMatch: true,
        desc: 'Range sum query sum(1..3) = 8 evaluated instantaneously in O(1) time! 🎉'
      }
    ]
  },

  'reverse-array': {
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
        left: 0,
        right: 4,
        array: [1, 2, 3, 4, 5],
        computation: 'L = 0, R = 4, L < R holds true',
        comparison: 'Condition L < R (0 < 4)',
        action: 'Swap arr[0] ↔ arr[4]',
        desc: 'Initialize Left pointer L = 0 (val 1) and Right pointer R = 4 (val 5). Check condition L < R (0 < 4 holds true).'
      },
      {
        stepNum: 2,
        title: 'Step 2: Verify Condition L < R (0 < 4 ✅)',
        left: 0,
        right: 4,
        array: [1, 2, 3, 4, 5],
        computation: '0 < 4 ➔ True',
        comparison: 'Loop Condition Holds',
        action: 'Swap arr[0] ↔ arr[4]',
        desc: 'Check condition L < R (0 < 4 holds true). Prepare to swap outer elements at indices 0 and 4.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Swap arr[0] (1) and arr[4] (5)',
        left: 0,
        right: 4,
        array: [5, 2, 3, 4, 1],
        computation: 'Swap arr[0] ↔ arr[4]',
        comparison: 'Outer Elements Swapped',
        action: 'Advance L++, R--',
        desc: 'Swap arr[0] (1) and arr[4] (5). Array becomes [5, 2, 3, 4, 1].'
      },
      {
        stepNum: 4,
        title: 'Step 4: Advance Pointers (L=1, R=3)',
        left: 1,
        right: 3,
        array: [5, 2, 3, 4, 1],
        computation: 'L = 1, R = 3',
        comparison: 'Pointers Converged',
        action: 'Check Condition',
        desc: 'Advance pointers: Increment L to 1, decrement R to 3.'
      },
      {
        stepNum: 5,
        title: 'Step 5: Verify Condition L < R (1 < 3 ✅)',
        left: 1,
        right: 3,
        array: [5, 2, 3, 4, 1],
        computation: '1 < 3 ➔ True',
        comparison: 'Loop Condition Holds',
        action: 'Swap arr[1] ↔ arr[3]',
        desc: 'Inspect pointers L = 1 (val 2) and R = 3 (val 4). Check condition L < R (1 < 3 holds true).'
      },
      {
        stepNum: 6,
        title: 'Step 6: Swap arr[1] (2) and arr[3] (4)',
        left: 1,
        right: 3,
        array: [5, 4, 3, 2, 1],
        computation: 'Swap arr[1] ↔ arr[3]',
        comparison: 'Inner Elements Swapped',
        action: 'Advance L++, R--',
        desc: 'Swap arr[1] (2) and arr[3] (4). Array becomes [5, 4, 3, 2, 1].'
      },
      {
        stepNum: 7,
        title: 'Step 7: Advance Pointers (L=2, R=2)',
        left: 2,
        right: 2,
        array: [5, 4, 3, 2, 1],
        computation: 'L = 2, R = 2',
        comparison: 'Pointers Meet at Center',
        action: 'Check Termination',
        desc: 'Advance pointers: Increment L to 2, decrement R to 2.'
      },
      {
        stepNum: 8,
        title: 'Step 8: Verify Condition L < R (2 < 2 ❌ STOP)',
        left: 2,
        right: 2,
        array: [5, 4, 3, 2, 1],
        computation: 'L >= R (2 >= 2)',
        comparison: 'Loop Condition False ❌',
        action: 'Terminate Loop',
        desc: 'Pointers meet at center index L = 2, R = 2. Condition L < R evaluates to False. Loop terminates.'
      },
      {
        stepNum: 9,
        title: 'Step 9: In-Place Array Reversal Complete! 🎉',
        left: 2,
        right: 2,
        array: [5, 4, 3, 2, 1],
        computation: 'Array = [5, 4, 3, 2, 1]',
        comparison: 'ARRAY FULLY REVERSED 🎉',
        action: 'Return Array',
        isMatch: true,
        desc: 'Array fully reversed in-place to [5, 4, 3, 2, 1] in O(N/2) swaps! 🎉'
      }
    ]
  },


  // === 5. SEARCHING TRACKS ===
  'searching': {
    title: 'Searching Algorithms (Linear vs Binary Search)',
    input: 'Sorted Array = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91], Target = 23',
    goal: 'Compare linear scan O(N) versus logarithmic binary search O(log N).',
    terms: {
      'Low Pointer': 'Starts at index 0 (leftmost boundary). Moves right (Low = Mid + 1) if arr[Mid] < target.',
      'High Pointer': 'Starts at index N-1 (rightmost boundary). Moves left (High = Mid - 1) if arr[Mid] > target.',
      'Mid Pointer': 'Middle index calculated as Mid = Low + (High - Low) / 2.'
    },
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Calculate Mid = 4 (val 16)',
        left: 0,
        right: 9,
        array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
        computation: 'Mid = (0 + 9) / 2 = 4 (val 16)',
        comparison: '16 < 23 ➔ Eliminate left half',
        action: 'Shift Low to 5',
        desc: 'Calculate Mid = 4 (val 16). Mid value 16 < target 23. Shift Low to index 5!'
      },
      {
        stepNum: 2,
        title: 'Step 2: Target 23 Matched at Index 5! 🎉',
        left: 5,
        right: 6,
        array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
        computation: 'Mid = (5 + 6) / 2 = 5 (val 23)',
        comparison: '23 == 23 (MATCH FOUND! 🎉)',
        action: 'Return Index 5',
        isMatch: true,
        desc: 'Calculate new Mid = 5. arr[5] = 23 == target 23! Target found in O(log N) time! 🎉'
      }
    ]
  },

  'binary-search': {
    title: 'Binary Search O(log N)',
    input: 'Sorted Array = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91], Target = 23',
    goal: 'Find target index in logarithmic O(log N) time by halving search space.',
    terms: {
      'Low Pointer': 'Leftmost search boundary index.',
      'High Pointer': 'Rightmost search boundary index.',
      'Mid Pointer': 'Midpoint index (Low + High) / 2 comparing against target.'
    },
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Initial Mid at Index 4 (val 16)',
        left: 0,
        right: 9,
        array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
        computation: 'Mid = (0 + 9) / 2 = 4 (val 16)',
        comparison: '16 < 23 ➔ Shift Low to 5',
        action: 'Halve Left Space',
        desc: 'Calculate Mid = 4 (val 16). 16 < 23. Shift Low to index 5.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Match Target at Mid Index 5! 🎉',
        left: 5,
        right: 6,
        array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
        computation: 'Mid = 5 (val 23)',
        comparison: '23 == 23 (MATCH! 🎉)',
        action: 'Return 5',
        isMatch: true,
        desc: 'New Mid = 5. arr[5] = 23 == target 23! Target found in O(log N) steps! 🎉'
      }
    ]
  },

  'linear-search': {
    title: 'Linear Search O(N)',
    input: 'Unsorted Array = [12, 45, 67, 23, 89, 34], Target = 23',
    goal: 'Scan unsorted elements sequentially until target is found in O(N) time.',
    terms: {
      'Scan Index (i)': 'Current element index being inspected from 0 to N-1.',
      'Equality Check': 'Evaluates arr[i] === target.'
    },
    array: [12, 45, 67, 23, 89, 34],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Start Linear Scan at Index 0 (val 12)',
        left: 0,
        right: 0,
        array: [12, 45, 67, 23, 89, 34],
        computation: '12 != 23',
        comparison: 'Mismatch ❌',
        action: 'Advance i to 1',
        desc: 'Start linear search at index 0. Compare arr[0] (12) against target 23. Mismatch ❌! Advance pointer i to 1.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Inspect Index 1 (val 45)',
        left: 1,
        right: 1,
        array: [12, 45, 67, 23, 89, 34],
        computation: '45 != 23',
        comparison: 'Mismatch ❌',
        action: 'Advance i to 2',
        desc: 'Inspect index 1 (val 45). Compare 45 == 23 ❌ (Mismatch). Advance index i to 2.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Inspect Index 2 (val 67)',
        left: 2,
        right: 2,
        array: [12, 45, 67, 23, 89, 34],
        computation: '67 != 23',
        comparison: 'Mismatch ❌',
        action: 'Advance i to 3',
        desc: 'Inspect index 2 (val 67). Compare 67 == 23 ❌ (Mismatch). Advance index i to 3.'
      },
      {
        stepNum: 4,
        title: 'Step 4: Inspect Index 3 (val 23)',
        left: 3,
        right: 3,
        array: [12, 45, 67, 23, 89, 34],
        computation: '23 == 23',
        comparison: 'Match Found! ✅',
        action: 'Trigger Early Exit',
        desc: 'Inspect index 3 (val 23). Compare 23 == 23 ✅ MATCH FOUND! Trigger early loop exit.'
      },
      {
        stepNum: 5,
        title: 'Step 5: Match Confirmed at Index 3',
        left: 3,
        right: 3,
        array: [12, 45, 67, 23, 89, 34],
        computation: 'arr[3] = 23',
        comparison: 'Target Confirmed',
        action: 'Count Comparisons',
        desc: 'Target value 23 successfully located at index 3.'
      },
      {
        stepNum: 6,
        title: 'Step 6: Evaluate Total Comparisons (4)',
        left: 3,
        right: 3,
        array: [12, 45, 67, 23, 89, 34],
        computation: '4 comparisons out of 6 elements',
        comparison: 'Comparisons Counted',
        action: 'Bounds Check',
        desc: 'Total comparisons made = 4 out of 6 array elements.'
      },
      {
        stepNum: 7,
        title: 'Step 7: Verify Return Index Safety (0 <= 3 < 6)',
        left: 3,
        right: 3,
        array: [12, 45, 67, 23, 89, 34],
        computation: '0 <= 3 < 6 ➔ True',
        comparison: 'Valid Index Verified',
        action: 'Prepare Return',
        desc: 'Verify return index bounds safety: 0 <= 3 < 6.'
      },
      {
        stepNum: 8,
        title: 'Step 8: Evaluate Time Complexity O(N)',
        left: 3,
        right: 3,
        array: [12, 45, 67, 23, 89, 34],
        computation: 'Worst Case O(N), Found in 4 steps',
        comparison: 'Linear Complexity Verified',
        action: 'Return Index 3',
        desc: 'Linear scan completed in 4 comparisons. Worst case complexity O(N).'
      },
      {
        stepNum: 9,
        title: 'Step 9: Linear Search Complete! 🎉',
        left: 3,
        right: 3,
        array: [12, 45, 67, 23, 89, 34],
        computation: 'Return index 3',
        comparison: 'MATCH FOUND AT INDEX 3 🎉',
        action: 'Return 3',
        isMatch: true,
        desc: 'Scan reaches index 3 (val 23). Match found! Return index 3 in O(N) time! 🎉'
      }
    ]
  },

  // === 6. SORTING TRACKS ===
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
        title: 'Step 1: Bubble Largest Element 8 to End',
        left: 0,
        right: 4,
        array: [2, 5, 1, 4, 8],
        computation: 'Swaps: 5↔2, 8↔1, 8↔4',
        comparison: 'Pass 1 Complete: 8 placed at end',
        action: 'Bubble Pass 1',
        isMatch: true,
        desc: 'Pass 1 completes! Largest element 8 bubbled to rightmost position. Array becomes [2, 5, 1, 4, 8].'
      }
    ]
  },

  'bubble-sort': {
    title: 'Bubble Sort O(N^2)',
    input: 'Array = [5, 2, 8, 1, 4]',
    goal: 'Bubble largest elements to end via adjacent swaps in O(N^2) time.',
    terms: {
      'Compare Window [j, j+1]': 'Adjacent elements being compared.',
      'Swap Condition': 'arr[j] > arr[j+1] triggers in-place swap.'
    },
    array: [5, 2, 8, 1, 4],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Pass 1 Complete ➔ [2, 5, 1, 4, 8]',
        left: 0,
        right: 4,
        array: [2, 5, 1, 4, 8],
        computation: 'Swap 5↔2, 8↔1, 8↔4',
        comparison: 'Pass 1 Complete',
        action: 'Bubble 8 to end',
        isMatch: true,
        desc: 'Pass 1: Adjacent swaps bubble largest element 8 to the end! Array becomes [2, 5, 1, 4, 8].'
      }
    ]
  },

  'selection-sort': {
    title: 'Selection Sort O(N^2)',
    input: 'Array = [5, 2, 8, 1, 4]',
    goal: 'Find minimum element in unsorted region and swap into position i in O(N^2) time.',
    terms: {
      'Min Index': 'Minimum element index in unsorted region.',
      'Prefix Swap': 'Swaps min element with element at current pass index i.'
    },
    array: [5, 2, 8, 1, 4],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Swap Minimum Element 1 with arr[0]',
        left: 0,
        right: 3,
        array: [1, 2, 8, 5, 4],
        computation: 'Min element 1 found at index 3 ➔ Swap with arr[0]',
        comparison: 'Pass 1 Complete',
        action: 'Swap min to front',
        isMatch: true,
        desc: 'Pass 1: Find minimum element 1 at index 3. Swap with arr[0]=5. Array becomes [1, 2, 8, 5, 4]! 🎉'
      }
    ]
  },

  'insertion-sort': {
    title: 'Insertion Sort O(N^2)',
    input: 'Array = [5, 2, 8, 1, 4]',
    goal: 'Build sorted prefix by shifting larger elements right and inserting key in O(N^2).',
    terms: {
      'Key Element': 'Element arr[i] being inserted into sorted prefix.',
      'Shift Right': 'Shifting elements > key right to vacate slot.'
    },
    array: [5, 2, 8, 1, 4],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Insert Key=2 into Sorted Prefix',
        left: 0,
        right: 1,
        array: [2, 5, 8, 1, 4],
        computation: 'Key 2 inserted before 5',
        comparison: 'Sorted prefix [2, 5]',
        action: 'Insert Key',
        isMatch: true,
        desc: 'Key=2. Shift 5 right and insert 2 at index 0. Sorted prefix is now [2, 5]! 🎉'
      }
    ]
  },

  // === RECURSION TRACKS ===
  'recursion': {
    title: 'Recursion & Call Stack Winding / Unwinding',
    input: 'n = 4 (Compute Factorial 4!)',
    goal: 'Demonstrate function call stack frame pushes during winding and pops during unwinding.',
    terms: {
      'Base Case': 'Termination condition (n == 1) returning 1 directly without making further recursive calls.',
      'Winding Phase': 'Pushing new stack frames onto call stack as subproblems defer computation.',
      'Unwinding Phase': 'Popping stack frames in reverse LIFO order and computing accumulated return values.'
    },
    array: ['4!', '3!', '2!', '1!'],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Push Frame factorial(4) onto Call Stack',
        left: 0,
        right: 0,
        array: ['4!', '3!', '2!', '1!'],
        computation: 'factorial(4) = 4 * factorial(3) [Winding]',
        comparison: 'n = 4 > 1 (Base Case False)',
        action: 'Push factorial(4) & Recurse to factorial(3)',
        desc: 'Call factorial(4). Check base case condition (n == 1). Evaluates to False! The function needs the result of factorial(3) before it can finish computing 4 * factorial(3). Push frame factorial(4) onto the call stack and recurse with n = 3.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Base Case Reached at factorial(1) = 1',
        left: 0,
        right: 3,
        array: ['4!', '3!', '2!', '1!'],
        computation: 'factorial(1) returns 1 (Base Case Hit! ✅)',
        comparison: 'n == 1 (BASE CASE TRUE 🎉)',
        action: 'Start Stack Unwinding & Return Values',
        isMatch: true,
        desc: 'Function calls wind down to factorial(1). Check base case condition (n == 1). Evaluates to True! Return 1 directly without making any further recursive calls. The stack winding phase is complete, and unwinding begins!'
      },
      {
        stepNum: 3,
        title: 'Step 3: Unwind Stack: 1 * 2 * 3 * 4 = 24',
        left: 0,
        right: 3,
        array: ['1', '2', '6', '24'],
        computation: 'factorial(2)=2, factorial(3)=6, factorial(4)=24',
        comparison: 'Final Result = 24',
        action: 'Pop all frames & Return 24',
        isMatch: true,
        desc: 'Unwind stack frames in reverse LIFO order: factorial(1) returns 1 ➔ factorial(2) computes 2 * 1 = 2 ➔ factorial(3) computes 3 * 2 = 6 ➔ factorial(4) computes 4 * 6 = 24! Pop all frames and return final result 24.'
      }
    ]
  }
};

export default function LogicSection({ topicId }) {
  // Read active tracks from all stores
  const twoPointerTrack = useTwoPointersStore((s) => s.track);
  const slidingWindowTrack = useSlidingWindowStore((s) => s.track);
  const backtrackingTrack = useBacktrackingStore((s) => s.track);
  const arrayTrack = useArrayStore((s) => s.track);
  const sortingTrack = useSortingStore((s) => s.track);
  const searchingTrack = useSearchingStore((s) => s.track);
  const linkedListTrack = useLinkedListStore((s) => s.track);
  const treeTrack = useTreeStore((s) => s.track);
  const graphTrack = useGraphStore((s) => s.track);
  const stackTrack = useStackStore((s) => s.track);
  const queueTrack = useQueueStore((s) => s.track);
  const heapTrack = useHeapStore((s) => s.track);
  const recursionTrack = useRecursionStore((s) => s.track);
  const dpTrack = useDPStore((s) => s.track);
  const hashTableTrack = useHashTableStore((s) => s.track);

  // Pick active track key based on topicId
  const activeTrackKey =
    topicId === 'two-pointers'
      ? twoPointerTrack
      : topicId === 'sliding-window'
      ? slidingWindowTrack
      : topicId === 'backtracking'
      ? backtrackingTrack
      : topicId === 'recursion'
      ? recursionTrack
      : topicId === 'arrays'
      ? arrayTrack
      : topicId === 'sorting'
      ? sortingTrack
      : topicId === 'searching'
      ? searchingTrack
      : topicId === 'linked-list'
      ? linkedListTrack
      : topicId === 'trees'
      ? treeTrack
      : topicId === 'graphs'
      ? graphTrack
      : topicId === 'stack'
      ? stackTrack
      : topicId === 'queue'
      ? queueTrack
      : topicId === 'heaps' || topicId === 'heap'
      ? heapTrack
      : topicId === 'dp'
      ? dpTrack
      : topicId === 'hash-table' || topicId === 'hash-tables'
      ? hashTableTrack
      : topicId;

  // Resolve track aliases for Array & Searching modules
  const resolvedTrackKey =
    activeTrackKey === 'insert' || activeTrackKey === 'insertion'
      ? 'insertion'
      : activeTrackKey === 'delete' || activeTrackKey === 'deletion'
      ? 'deletion'
      : activeTrackKey === 'search' || activeTrackKey === 'linear-search' || activeTrackKey === 'linear' || activeTrackKey === 'linear-scan'
      ? 'linear-search'
      : activeTrackKey === 'reverse' || activeTrackKey === 'reverse-array'
      ? 'reverse-array'
      : activeTrackKey;

  // Retrieve exact problem logic or generate dynamic fallback for topicId
  const problemData =
    SPECIFIC_PROBLEM_LOGIC[resolvedTrackKey] ||
    SPECIFIC_PROBLEM_LOGIC[activeTrackKey] ||
    SPECIFIC_PROBLEM_LOGIC[topicId] || {
      title: `${topicId?.toUpperCase()} Algorithm Execution Logic`,
      input: `Topic Module: ${topicId}`,
      goal: `Step-by-step state transition breakdown for ${topicId}.`,
      terms: {
        'Variable / Pointer': 'Algorithm state variable used to traverse data.',
        'Target Goal': 'Desired computational outcome for this step.'
      },
      array: [1, 2, 3, 4, 5],
      steps: [
        {
          stepNum: 1,
          title: `Step 1: Initialize ${topicId} Execution`,
          left: 0,
          right: 4,
          array: [1, 2, 3, 4, 5],
          computation: `Process input for ${topicId}`,
          comparison: 'Valid State Transition',
          action: 'Execute Step',
          isMatch: true,
          desc: `Execute step-by-step logic and state manipulation for ${topicId}.`
        }
      ]
    };

  return (
    <div className="space-y-8 font-sketch">
      {/* Header & Problem Specification */}
      <div className="sketch-border bg-[var(--sketch-bg-dim)] p-6 rounded-2xl shadow-xl space-y-5">
        <div className="flex items-center gap-3 border-b border-[var(--sketch-border)] pb-4">
          <span className="text-3xl">🧠</span>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold font-header text-[var(--sketch-accent-orange)]">
              {problemData.title} — Step-by-Step Logic
            </h2>
            <p className="text-sm text-[var(--sketch-text-muted)] font-mono">
              Curated specifically for this active problem with exact state transitions & pointer diagrams
            </p>
          </div>
        </div>

        {/* Input & Goal Details */}
        <div className="grid md:grid-cols-2 gap-5 bg-[var(--sketch-bg)] p-5 rounded-xl border border-[var(--sketch-border)] shadow-md">
          <div>
            <span className="text-sm font-mono text-amber-400 font-extrabold uppercase tracking-wider block mb-1">EXACT PROBLEM INPUT:</span>
            <span className="font-mono text-base md:text-lg text-[var(--sketch-text)] font-extrabold">{problemData.input}</span>
          </div>
          <div>
            <span className="text-sm font-mono text-emerald-400 font-extrabold uppercase tracking-wider block mb-1">TARGET GOAL:</span>
            <span className="text-base md:text-lg text-[var(--sketch-text)] font-bold leading-relaxed">{problemData.goal}</span>
          </div>
        </div>

        {/* Chalkboard Styled Key Terminology & Variable Definitions (Increased Font Weight & Size) */}
        {problemData.terms && (
          <div className="sketch-panel-box sketch-border p-6 rounded-2xl space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-xl md:text-2xl font-header font-extrabold text-[var(--sketch-accent-orange)] border-b border-[var(--sketch-border)] pb-3">
              <span className="text-2xl">🔑</span>
              <span>KEY TERMINOLOGY & POINTER DEFINITIONS</span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(problemData.terms).map(([term, def]) => (
                <div key={term} className="sketch-border bg-[var(--sketch-bg)] p-4 rounded-xl border border-[var(--sketch-border)] shadow-lg space-y-2.5 hover:border-amber-400/60 transition-all">
                  <div className="flex items-center gap-2">
                    <span className="sketch-badge font-mono text-sm md:text-base font-extrabold text-amber-300 bg-amber-500/20 border border-amber-400/50 px-3 py-1 rounded-lg shadow-sm">
                      {term}
                    </span>
                  </div>
                  <p className="text-sm md:text-base text-[var(--sketch-text)] font-semibold leading-relaxed font-sketch">
                    {def}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Step Cards */}
      <div className="space-y-6">
        <h3 className="text-2xl md:text-3xl font-bold font-header text-[var(--sketch-text)] flex items-center gap-2">
          <span>📸</span> Problem Step-by-Step Execution Breakdown
        </h3>

        {problemData.steps.map((st) => {
          const stepArray = st.array || problemData.array;

          return (
            <div
              key={st.stepNum}
              className={`sketch-border bg-[var(--sketch-bg-dim)] p-6 rounded-2xl shadow-xl transition-all ${
                st.isMatch
                  ? 'border-2 border-emerald-400/80 bg-emerald-950/20 shadow-emerald-500/20'
                  : 'hover:border-amber-500/50'
              }`}
            >
              {/* Step Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-[var(--sketch-border)] pb-3">
                <div className="flex items-center gap-3">
                  <span className={`w-10 h-10 rounded-xl font-header font-extrabold text-xl flex items-center justify-center border shadow-sm ${
                    st.isMatch ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400' : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                  }`}>
                    #{st.stepNum}
                  </span>
                  <h4 className="text-xl md:text-2xl font-bold font-header text-[var(--sketch-text)]">
                    {st.title}
                  </h4>
                </div>

                <span className={`px-3.5 py-1.5 rounded-full text-sm font-mono font-extrabold border ${
                  st.isMatch ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400' : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                }`}>
                  {st.action}
                </span>
              </div>

              {/* Visual State Diagram Render (Exact Visualizer UI Chalkboard Style with Stepwise Mutations) */}
              <div className="my-5 sketch-canvas-box sketch-border relative p-6 pt-8 pb-16 min-h-[260px] flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute top-3 left-4 text-xs font-mono text-[var(--sketch-text-muted)] font-bold">
                  Step Visual Canvas Diagram (State at Step #{st.stepNum})
                </div>

                {st.grid ? (
                  /* 1. 4x4 Sudoku Grid Diagram */
                  <div className="grid grid-cols-4 gap-2.5 my-3 bg-slate-950/90 p-4 rounded-2xl border-2 border-[var(--sketch-border)] shadow-2xl">
                    {st.grid.map((rowArr, rIdx) =>
                      rowArr.map((num, cIdx) => {
                        const isCurrentCell = st.activeCell && st.activeCell[0] === rIdx && st.activeCell[1] === cIdx;
                        const isConflict = st.conflictCell && st.conflictCell[0] === rIdx && st.conflictCell[1] === cIdx;
                        return (
                          <div
                            key={`${rIdx}-${cIdx}`}
                            className={`w-12 h-12 md:w-16 md:h-16 rounded-xl flex flex-col items-center justify-center font-mono text-lg md:text-2xl font-bold border-2 relative transition-all ${
                              isConflict
                                ? 'border-rose-400 bg-rose-500/30 text-rose-300 shadow-lg shadow-rose-500/40 ring-2 ring-rose-400'
                                : isCurrentCell
                                ? 'border-amber-400 bg-amber-500/25 text-amber-300 shadow-lg shadow-amber-500/30 ring-2 ring-amber-400'
                                : num !== 0
                                ? 'border-[var(--sketch-border)] bg-[var(--sketch-bg)] text-amber-400'
                                : 'border-dashed border-slate-700 text-slate-600 bg-[var(--sketch-bg-dim)]'
                            }`}
                          >
                            {num !== 0 ? num : ''}
                            <span className="text-[9px] text-slate-500 absolute bottom-1 right-1 font-mono">
                              {rIdx},{cIdx}
                            </span>
                          </div>
                        );
                      })
                    )}
                  </div>
                ) : st.board ? (
                  /* 2. 4x4 N-Queens Chessboard Diagram */
                  <div className="grid grid-cols-4 gap-2.5 my-3 bg-slate-950/90 p-4 rounded-2xl border-2 border-[var(--sketch-border)] shadow-2xl">
                    {st.board.map((rowArr, rIdx) =>
                      rowArr.map((cell, cIdx) => {
                        const isQueen = cell === 1;
                        const isConflict = st.conflictCell && st.conflictCell[0] === rIdx && st.conflictCell[1] === cIdx;
                        const isCurrentRowCol = st.left === rIdx && st.right === cIdx;
                        const isLightSquare = (rIdx + cIdx) % 2 === 0;

                        return (
                          <div
                            key={`${rIdx}-${cIdx}`}
                            className={`w-12 h-12 md:w-16 md:h-16 rounded-xl flex flex-col items-center justify-center font-mono text-xl md:text-2xl font-bold border-2 relative transition-all ${
                              isConflict
                                ? 'bg-rose-500/30 border-rose-400 text-rose-300 shadow-lg shadow-rose-500/40 ring-2 ring-rose-400'
                                : isQueen
                                ? 'bg-amber-500/30 border-amber-400 text-amber-300 shadow-lg shadow-amber-500/40 ring-2 ring-amber-400'
                                : isCurrentRowCol
                                ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300'
                                : isLightSquare
                                ? 'bg-[var(--sketch-bg)] border-[var(--sketch-border)] text-slate-400'
                                : 'bg-[var(--sketch-bg-dim)] border-[var(--sketch-border)] text-slate-500'
                            }`}
                          >
                            {isQueen ? '👑' : isConflict ? '❌' : ''}
                            <span className="text-[9px] text-slate-500 absolute bottom-1 right-1 font-mono">
                              {rIdx},{cIdx}
                            </span>
                          </div>
                        );
                      })
                    )}
                  </div>
                ) : st.subsets ? (
                  /* 3. Subsets Path & Power Set Diagram */
                  <div className="flex flex-col items-center gap-4 my-2">
                    <div className="sketch-border bg-[var(--sketch-bg)] p-4 rounded-2xl border border-[var(--sketch-border)] text-center shadow-lg">
                      <span className="text-xs text-[var(--sketch-text-muted)] block mb-1 font-mono font-bold">CURRENT SUBSET PATH:</span>
                      <span className="text-xl font-bold font-mono text-amber-400">
                        [{(st.currentSubset || []).join(', ')}]
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-2 max-w-lg">
                      <span className="text-xs font-mono text-[var(--sketch-text-muted)] w-full text-center font-bold">GENERATED SUBSETS IN POWER SET:</span>
                      {st.subsets.map((sub, idx) => (
                        <span key={idx} className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-xl text-xs font-mono font-bold">
                          [{sub.join(', ')}]
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* 4. 1D Array Cards Diagram (items-start top alignment so pointers hang cleanly below) */
                  <div className="flex items-start gap-3 md:gap-5 my-2 overflow-x-auto overflow-y-visible w-full justify-center pt-4 pb-16">
                    {stepArray.map((val, idx) => {
                      const isLeft = st.left === idx;
                      const isRight = st.right === idx;
                      const isBoth = isLeft && isRight;
                      const inWindow = st.left !== null && st.right !== null && idx >= st.left && idx <= st.right;

                      return (
                        <div key={idx} className="relative flex flex-col items-center">
                          <div
                            className={`sketch-card ${
                              st.isMatch && (isLeft || isRight)
                                ? '!border-emerald-400 !bg-emerald-500/20 shadow-lg shadow-emerald-500/40 ring-2 ring-emerald-400 text-emerald-200'
                                : inWindow
                                ? 'active-orange !border-amber-400 !bg-amber-500/20 shadow-lg shadow-amber-500/20 ring-2 ring-amber-400/60'
                                : ''
                            }`}
                          >
                            {val}
                            <div className="sketch-card-index">[{idx}]</div>
                          </div>

                          {/* Chalkboard Pointer Badges */}
                          {isBoth ? (
                            <div className="sketch-pointer text-purple-300 font-bold bg-purple-500/20 px-2.5 py-1 rounded-md border border-purple-400/40 shadow-sm mt-2">
                              <div className="text-sm font-bold">L, R</div>
                              <div className="text-xs leading-none">▲</div>
                            </div>
                          ) : isLeft ? (
                            <div className="sketch-pointer sketch-pointer-orange mt-2">
                              <div className="font-bold">L</div>
                              <div className="text-xs leading-none">▲</div>
                            </div>
                          ) : isRight ? (
                            <div className="sketch-pointer sketch-pointer-blue mt-2">
                              <div className="font-bold">R</div>
                              <div className="text-xs leading-none">▲</div>
                            </div>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Computation & Comparison Side-by-Side Boxes */}
              <div className="grid md:grid-cols-2 gap-4 mb-4 font-mono text-sm">
                <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 shadow-md">
                  <span className="text-slate-400 block mb-1 font-bold text-xs">COMPUTATION / STATE EVALUATION:</span>
                  <span className="text-amber-300 font-extrabold text-sm md:text-base">{st.computation}</span>
                </div>
                <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 shadow-md">
                  <span className="text-slate-400 block mb-1 font-bold text-xs">CONDITION COMPARISON:</span>
                  <span className={st.isMatch ? 'text-emerald-400 font-extrabold text-sm md:text-base' : 'text-cyan-300 font-extrabold text-sm md:text-base'}>
                    {st.comparison}
                  </span>
                </div>
              </div>

              {/* Detailed Step Rationale Explanation (Increased Font Weight & Size) */}
              <p className="text-base md:text-lg text-[var(--sketch-text)] font-semibold leading-relaxed font-sketch">
                {st.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
