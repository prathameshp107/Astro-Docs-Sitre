export const twoPointersLogic = {
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
  }
};
