export const twoPointersLogic = {
  // === 1. TWO POINTERS TRACKS ===
  'two-pointers-intro': {
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

  'two-pointers-two-sum-ii': {
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

  'two-pointers-valid-palindrome': {
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

  'two-pointers-three-sum': {
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

  'two-pointers-container-water': {
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

  'two-pointers-move-zeroes': {
    title: '6. Move Zeroes In-Place (Fast & Slow Pointers)',
    input: 'Array = [0, 1, 0, 3, 12]',
    goal: 'Move all zeroes to end while maintaining relative order of non-zero elements.',
    terms: {
      'Slow Pointer': 'The write pointer tracking the next available slot for placing a non-zero element. Increments (Slow++) only after a swap.',
      'Fast Pointer': 'The scan pointer traversing the entire array to locate non-zero elements to swap into the Slow slot.',
      'In-Place Swap': 'Swaps arr[Slow] and arr[Fast] when a non-zero is found, pushing zeroes rightward without extra array allocations.'
    },
    array: [0, 1, 0, 3, 12],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Init Slow=0 (Next 0-Slot)',
        left: 0,
        right: 0,
        leftLabel: 'slow',
        rightLabel: 'slow',
        array: [0, 1, 0, 3, 12],
        computation: 'Slow = 0, Fast = None',
        comparison: 'Slow tracks next placement slot',
        action: 'Initialize Pointers',
        desc: 'Initialize Slow pointer at index 0 (marking next available slot for a non-zero element) and Fast pointer to scan the array.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Fast=0 (val 0) ➔ Skip Swap',
        left: 0,
        right: 0,
        leftLabel: 'slow',
        rightLabel: 'fast',
        array: [0, 1, 0, 3, 12],
        computation: 'arr[0] == 0 (Zero)',
        comparison: 'Skip zero element',
        action: 'Advance Fast++',
        desc: 'Fast starts at index 0. Value is 0, so no swap needed. Advance Fast pointer to index 1.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Fast=1 (val 1) ➔ About to swap arr[0]=0 ↔ arr[1]=1',
        left: 0,
        right: 1,
        swapFrom: 0,
        swapTo: 1,
        leftLabel: 'slow',
        rightLabel: 'fast',
        array: [0, 1, 0, 3, 12],
        computation: 'arr[0]=0, arr[1]=1 — swapping',
        comparison: 'Non-zero 1 detected ➔ 🔄 Swap',
        action: 'Executing arr[0] ↔ arr[1]',
        desc: 'Fast reaches index 1 and sees non-zero value 1. About to swap arr[0]=0 and arr[1]=1.'
      },
      {
        stepNum: 4,
        title: 'Step 4: Swap complete → Array is [1, 0, 0, 3, 12]',
        left: 1,
        right: 1,
        leftLabel: 'slow',
        rightLabel: 'fast',
        array: [1, 0, 0, 3, 12],
        computation: 'Swap arr[0] ↔ arr[1] ✅',
        comparison: 'Non-zero 1 placed at index 0',
        action: 'Advance Slow++',
        isMatch: true,
        desc: 'Swap complete! Non-zero 1 is placed at index 0. Advance Slow pointer to index 1.'
      },
      {
        stepNum: 5,
        title: 'Step 5: Fast=2 (val 0) ➔ Skip Swap',
        left: 1,
        right: 2,
        leftLabel: 'slow',
        rightLabel: 'fast',
        array: [1, 0, 0, 3, 12],
        computation: 'arr[2] == 0 (Zero)',
        comparison: 'Skip zero element',
        action: 'Advance Fast++',
        desc: 'Fast advances to index 2 (val 0). Element is 0, so skip swap and advance Fast to index 3.'
      },
      {
        stepNum: 6,
        title: 'Step 6: Fast=3 (val 3) ➔ About to swap arr[1]=0 ↔ arr[3]=3',
        left: 1,
        right: 3,
        swapFrom: 1,
        swapTo: 3,
        leftLabel: 'slow',
        rightLabel: 'fast',
        array: [1, 0, 0, 3, 12],
        computation: 'arr[1]=0, arr[3]=3 — swapping',
        comparison: 'Non-zero 3 detected ➔ 🔄 Swap',
        action: 'Executing arr[1] ↔ arr[3]',
        desc: 'Fast reaches index 3 and sees non-zero value 3. About to swap arr[1]=0 and arr[3]=3.'
      },
      {
        stepNum: 7,
        title: 'Step 7: Swap complete → Array is [1, 3, 0, 0, 12]',
        left: 2,
        right: 3,
        leftLabel: 'slow',
        rightLabel: 'fast',
        array: [1, 3, 0, 0, 12],
        computation: 'Swap arr[1] ↔ arr[3] ✅',
        comparison: 'Non-zero 3 placed at index 1',
        action: 'Advance Slow++',
        isMatch: true,
        desc: 'Swap complete! Non-zero 3 is placed at index 1. Advance Slow pointer to index 2.'
      },
      {
        stepNum: 8,
        title: 'Step 8: Fast=4 (val 12) ➔ About to swap arr[2]=0 ↔ arr[4]=12',
        left: 2,
        right: 4,
        swapFrom: 2,
        swapTo: 4,
        leftLabel: 'slow',
        rightLabel: 'fast',
        array: [1, 3, 0, 0, 12],
        computation: 'arr[2]=0, arr[4]=12 — swapping',
        comparison: 'Non-zero 12 detected ➔ 🔄 Swap',
        action: 'Executing arr[2] ↔ arr[4]',
        desc: 'Fast reaches index 4 and sees non-zero value 12. About to swap arr[2]=0 and arr[4]=12.'
      },
      {
        stepNum: 9,
        title: 'Step 9: Swap complete → Array is [1, 3, 12, 0, 0]',
        left: 3,
        right: 4,
        leftLabel: 'slow',
        rightLabel: 'fast',
        array: [1, 3, 12, 0, 0],
        computation: 'Swap arr[2] ↔ arr[4] ✅',
        comparison: 'Non-zero 12 placed at index 2',
        action: 'Advance Slow++',
        isMatch: true,
        desc: 'Swap complete! Non-zero 12 is placed at index 2. Advance Slow pointer to index 3.'
      },
      {
        stepNum: 10,
        title: 'Step 10: Move Zeroes Complete! 🎉',
        left: 3,
        right: 4,
        leftLabel: 'slow',
        rightLabel: 'fast',
        array: [1, 3, 12, 0, 0],
        computation: 'Array = [1, 3, 12, 0, 0]',
        comparison: 'ALL ZEROES MOVED TO END 🎉',
        action: 'Return Transformed Array',
        isMatch: true,
        desc: 'Scan complete! All non-zero elements are moved to front in original order [1, 3, 12], and all zeroes are pushed to end in O(n) time & O(1) space! 🎉'
      }
    ]
  },

  'two-pointers-remove-duplicates': {
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

  'two-pointers-sort-colors': {
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
        mid: 0,
        right: 5,
        leftLabel: 'low',
        midLabel: 'mid',
        rightLabel: 'high',
        array: [2, 0, 2, 1, 1, 0],
        computation: 'Pointers initialized: Low=0, Mid=0, High=5',
        comparison: 'Initial State: arr[0] = 2',
        action: 'Inspect arr[Mid=0]',
        desc: 'Initialize Low=0 (tracks 0-region), Mid=0 (scanning pointer), High=5 (tracks 2-region). Mid inspects element at index 0 (val 2).'
      },
      {
        stepNum: 2,
        title: 'Step 2: Mid=0 (val 2) ➔ About to swap arr[0]=2 ↔ arr[5]=0',
        left: 0,
        mid: 0,
        right: 5,
        swapFrom: 0,
        swapTo: 5,
        leftLabel: 'low',
        midLabel: 'mid',
        rightLabel: 'high',
        array: [2, 0, 2, 1, 1, 0],
        computation: 'arr[0]=2 (Blue) ➔ Swap with arr[5]=0 (Red)',
        comparison: '2 detected at Mid ➔ 🔄 Swap with High',
        action: 'Executing arr[0] ↔ arr[5]',
        desc: 'Mid sees 2 at index 0. About to swap arr[0]=2 with arr[5]=0. High will decrement.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Swap complete → Array is [0, 0, 2, 1, 1, 2]',
        left: 0,
        mid: 0,
        right: 4,
        leftLabel: 'low',
        midLabel: 'mid',
        rightLabel: 'high',
        array: [0, 0, 2, 1, 1, 2],
        computation: 'Swap arr[0] ↔ arr[5] ✅',
        comparison: '2 placed in High-region',
        action: 'Decrement High--',
        isMatch: true,
        desc: 'Swap complete! 2 is locked in the right partition at index 5. Decrement High to 4. Mid stays at 0 to inspect swapped-in element.'
      },
      {
        stepNum: 4,
        title: 'Step 4: Mid=0 (val 0) ➔ In 0-region (Advance Low & Mid)',
        left: 1,
        mid: 1,
        right: 4,
        leftLabel: 'low',
        midLabel: 'mid',
        rightLabel: 'high',
        array: [0, 0, 2, 1, 1, 2],
        computation: 'arr[0] == 0 (Red) ➔ In place',
        comparison: '0 placed at start',
        action: 'Advance Low++, Mid++',
        isMatch: true,
        desc: 'Mid sees 0 at index 0. Element belongs in 0-region. Increment Low to 1 and Mid to 1.'
      },
      {
        stepNum: 5,
        title: 'Step 5: Mid=1 (val 0) ➔ In 0-region (Advance Low & Mid)',
        left: 2,
        mid: 2,
        right: 4,
        leftLabel: 'low',
        midLabel: 'mid',
        rightLabel: 'high',
        array: [0, 0, 2, 1, 1, 2],
        computation: 'arr[1] == 0 (Red) ➔ In place',
        comparison: '0 placed at index 1',
        action: 'Advance Low++, Mid++',
        isMatch: true,
        desc: 'Mid sees 0 at index 1. Element belongs in 0-region. Increment Low to 2 and Mid to 2.'
      },
      {
        stepNum: 6,
        title: 'Step 6: Mid=2 (val 2) ➔ About to swap arr[2]=2 ↔ arr[4]=1',
        left: 2,
        mid: 2,
        right: 4,
        swapFrom: 2,
        swapTo: 4,
        leftLabel: 'low',
        midLabel: 'mid',
        rightLabel: 'high',
        array: [0, 0, 2, 1, 1, 2],
        computation: 'arr[2]=2 (Blue) ➔ Swap with arr[4]=1 (White)',
        comparison: '2 detected at Mid ➔ 🔄 Swap with High',
        action: 'Executing arr[2] ↔ arr[4]',
        desc: 'Mid sees 2 at index 2. About to swap arr[2]=2 with arr[4]=1. High will decrement.'
      },
      {
        stepNum: 7,
        title: 'Step 7: Swap complete → Array is [0, 0, 1, 1, 2, 2]',
        left: 2,
        mid: 2,
        right: 3,
        leftLabel: 'low',
        midLabel: 'mid',
        rightLabel: 'high',
        array: [0, 0, 1, 1, 2, 2],
        computation: 'Swap arr[2] ↔ arr[4] ✅',
        comparison: '2 placed in High-region',
        action: 'Decrement High--',
        isMatch: true,
        desc: 'Swap complete! 2 placed at index 4. Decrement High to 3. Mid stays at 2 to evaluate newly swapped element (1).'
      },
      {
        stepNum: 8,
        title: 'Step 8: Mid=2 (val 1) ➔ In 1-region (Advance Mid)',
        left: 2,
        mid: 3,
        right: 3,
        leftLabel: 'low',
        midLabel: 'mid',
        rightLabel: 'high',
        array: [0, 0, 1, 1, 2, 2],
        computation: 'arr[2] == 1 (White) ➔ In middle region',
        comparison: '1 in correct position',
        action: 'Advance Mid++',
        desc: 'Mid sees 1 at index 2. Element belongs in middle 1-region. Increment Mid to 3.'
      },
      {
        stepNum: 9,
        title: 'Step 9: Mid=3 (val 1) ➔ In 1-region (Advance Mid)',
        left: 2,
        mid: 4,
        right: 3,
        leftLabel: 'low',
        midLabel: 'mid',
        rightLabel: 'high',
        array: [0, 0, 1, 1, 2, 2],
        computation: 'arr[3] == 1 (White) ➔ In middle region',
        comparison: '1 in correct position',
        action: 'Advance Mid++',
        desc: 'Mid sees 1 at index 3. Element belongs in middle 1-region. Increment Mid to 4.'
      },
      {
        stepNum: 10,
        title: 'Step 10: Mid > High ➔ Partition Complete! 🎉',
        left: 2,
        mid: 4,
        right: 3,
        leftLabel: 'low',
        midLabel: 'mid',
        rightLabel: 'high',
        array: [0, 0, 1, 1, 2, 2],
        computation: 'Mid (4) > High (3) ➔ Partition loop terminates',
        comparison: 'DUTCH NATIONAL FLAG SORTED! 🎉',
        action: 'Single Pass Complete',
        isMatch: true,
        desc: 'Mid pointer advances past High boundary (4 > 3). All 0s partitioned on left, 1s in middle, 2s on right in a single pass O(N) & O(1) space! Final array: [0, 0, 1, 1, 2, 2]. 🎉'
      }
    ]
  },

  'two-pointers-trap-rain-water': {
    title: '9. Trapping Rain Water',
    input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]',
    goal: 'Calculate total units of water trapped between bars using two-pointer max tracking — O(n) time, O(1) space.',
    terms: {
      'leftMax': 'Maximum bar height seen so far from the left side. Water above left pointer = leftMax - height[left].',
      'rightMax': 'Maximum bar height seen so far from the right side. Water above right pointer = rightMax - height[right].',
      'Shorter side rule': 'Process the side with the smaller max — its water is bounded by that max, regardless of what lies on the other side.',
    },
    array: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
    steps: [
      {
        stepNum: 1, title: 'Step 1: Init left=0, right=11, leftMax=0, rightMax=0, water=0',
        left: 0, right: 11,
        array: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
        computation: 'left=0, right=11, leftMax=0, rightMax=0',
        comparison: 'Pointers set at both ends',
        action: 'Start two-pointer loop',
        desc: 'Initialize two pointers at both ends. leftMax and rightMax track the tallest bars seen from each side.'
      },
      {
        stepNum: 2, title: 'Step 2: leftMax(0) < rightMax(1) → process left, water += 0',
        left: 0, right: 11,
        array: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
        computation: 'water += max(0, leftMax-h[0]) = max(0, 0-0) = 0',
        comparison: 'leftMax(0) < rightMax(1) → left side is safe to process',
        action: 'water += 0, left++',
        desc: 'leftMax < rightMax means leftMax is the true bottleneck. Water at left = leftMax - h[left] = 0. Move left pointer right.'
      },
      {
        stepNum: 3, title: 'Step 3: left=1, h=1 → update leftMax=1, water += 0',
        left: 1, right: 11,
        array: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
        computation: 'leftMax = max(1,1) = 1; water += max(0, 1-1) = 0',
        comparison: 'New leftMax bar found — no water here',
        action: 'leftMax=1, left++',
        desc: 'h[1]=1 is taller than previous leftMax. Update leftMax=1. No water trapped here since leftMax-h=0.'
      },
      {
        stepNum: 4, title: 'Step 4: left=2, h=0 → water += 1 (totalWater=1)',
        left: 2, right: 11,
        array: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
        computation: 'water += max(0, leftMax(1) - h[2](0)) = 1. totalWater=1',
        comparison: 'leftMax(1) > h[2](0) → traps water',
        action: 'water += 1, left++',
        desc: 'h[2]=0, leftMax=1. This cell traps leftMax-h = 1 unit of water. totalWater=1.'
      },
      {
        stepNum: 5, title: 'Step 5: Continuing... totalWater accumulates to 6',
        left: 5, right: 10,
        array: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
        computation: 'Cells 3–11 processed: +0+1+2+1+0+0+1+0 = 5 more units',
        comparison: 'Pointers converging toward center',
        action: 'Continue loop',
        desc: 'Each cell below its local max traps water. The two-pointer approach processes every cell exactly once.'
      },
      {
        stepNum: 6, title: 'Step 6: Pointers meet → Total water = 6 🎉',
        left: 6, right: 6,
        array: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
        computation: 'totalWater = 6 units',
        comparison: 'TRAPPING RAIN WATER COMPLETE 🎉',
        action: 'Return 6',
        isMatch: true,
        desc: 'All 6 units of water accounted for. O(n) time, O(1) space — no prefix/suffix arrays needed. Pointers meet and loop exits.'
      }
    ]
  },

  'two-pointers-four-sum': {
    title: '10. 4Sum — Quadruplets Summing to Target',
    input: 'nums = [1,0,-1,0,-2,2], target = 0',
    goal: 'Find all unique quadruplets that sum to target using sort + two outer loops + inner two-pointer — O(n³).',
    terms: {
      'Outer loops (i, j)': 'Fix two elements at positions i and j. Skip duplicates at both levels to avoid repeated quadruplets.',
      'Inner two-pointer': 'For each (i,j) pair, use left/right converging pointers on the remaining subarray to find the 4th element.',
      'Deduplication': 'Skip consecutive equal values after finding a match or advancing i/j to ensure unique results.',
    },
    array: [-2, -1, 0, 0, 1, 2],
    steps: [
      {
        stepNum: 1, title: 'Step 1: Sort → [-2,-1,0,0,1,2], fix i=0(-2)',
        left: 2, right: 5,
        array: [-2, -1, 0, 0, 1, 2],
        computation: 'Sort nums. Fix i=0 (val -2). j will iterate from i+1.',
        comparison: 'Sorted input enables two-pointer on subarray',
        action: 'Fix i=0, start j=1',
        desc: 'Sort the array first. Fix i=0 (-2). j starts at i+1=1. Inner left/right pointers will scan j+1 to end.'
      },
      {
        stepNum: 2, title: 'Step 2: i=0,j=1(-1), left=2(0), right=5(2) → sum=-1 < 0',
        left: 2, right: 5,
        array: [-2, -1, 0, 0, 1, 2],
        computation: '-2+(-1)+0+2 = -1 < 0 → left++',
        comparison: 'Sum too small → move left pointer right',
        action: 'left++ (2→3)',
        desc: 'Sum = -2-1+0+2 = -1. Less than target 0. Increment left to find a larger 3rd element.'
      },
      {
        stepNum: 3, title: 'Step 3: left=3(0), right=5(2) → sum=0 ✅ FOUND!',
        left: 3, right: 5,
        array: [-2, -1, 0, 0, 1, 2],
        computation: '-2+(-1)+0+2 = 0 ✅ Quadruplet: [-2,-1,0,2]',
        comparison: 'Sum == target → record quadruplet',
        action: 'Record [-2,-1,0,2], left++, right--',
        isMatch: true,
        desc: 'Sum = -2-1+0+2 = 0. Found quadruplet [-2,-1,0,2]. Advance both pointers and skip duplicates.'
      },
      {
        stepNum: 4, title: 'Step 4: left=4(1), right=5(2) → sum=0 ✅ [-2,-1,1,2]',
        left: 4, right: 5,
        array: [-2, -1, 0, 0, 1, 2],
        computation: '-2+(-1)+1+2 = 0 ✅ Quadruplet: [-2,-1,1,2]',
        comparison: 'Sum == target → 2nd quadruplet found',
        action: 'Record [-2,-1,1,2], left++, right--',
        isMatch: true,
        desc: '-2+(-1)+1+2 = 0. 2nd quadruplet found. Continue scanning other (i,j) pairs.'
      },
      {
        stepNum: 5, title: 'Step 5: Continue j=2, find [-2,0,0,2] and [-1,0,0,1]',
        left: 3, right: 5,
        array: [-2, -1, 0, 0, 1, 2],
        computation: 'Result: [[-2,-1,0,2],[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]',
        comparison: 'All unique quadruplets found',
        action: 'Return result',
        isMatch: true,
        desc: 'All unique quadruplets summing to 0: [[-2,-1,0,2], [-2,-1,1,2], [-2,0,0,2], [-1,0,0,1]]. O(n³) time.'
      }
    ]
  },

  'two-pointers-square-sorted': {
    title: '11. Squares of a Sorted Array',
    input: 'nums = [-4, -1, 0, 3, 10]',
    goal: 'Return sorted squares of a sorted array in O(n) time using both-ends two-pointer fill from largest to smallest.',
    terms: {
      'Both-ends pointers': 'Left starts at index 0, right at index n-1. Largest absolute value is always at one of the ends.',
      'Fill from right': 'result[] is filled from position n-1 down to 0 — largest squares placed first.',
      'Why it works': 'After squaring, the biggest values come from the most negative or most positive ends of the sorted input.',
    },
    array: [-4, -1, 0, 3, 10],
    steps: [
      {
        stepNum: 1, title: 'Step 1: Init left=0(-4), right=4(10), pos=4',
        left: 0, right: 4,
        array: [-4, -1, 0, 3, 10],
        computation: 'sq(-4)=16, sq(10)=100',
        comparison: '100 > 16 → place 100 at result[4]',
        action: 'result[4]=100, right-- (4→3)',
        desc: 'Squares of both ends: (-4)²=16 and 10²=100. 100 is larger, place it at result[4]. Move right pointer left.'
      },
      {
        stepNum: 2, title: 'Step 2: left=0(-4), right=3(3) → sq16 > sq9',
        left: 0, right: 3,
        array: [-4, -1, 0, 3, 10],
        computation: 'sq(-4)=16, sq(3)=9 → 16 > 9',
        comparison: '16 > 9 → place 16 at result[3]',
        action: 'result[3]=16, left++ (0→1)',
        desc: '(-4)²=16 > 3²=9. Place 16 at result[3]. Move left pointer right.'
      },
      {
        stepNum: 3, title: 'Step 3: left=1(-1), right=3(3) → sq1 < sq9',
        left: 1, right: 3,
        array: [-4, -1, 0, 3, 10],
        computation: 'sq(-1)=1, sq(3)=9 → 9 > 1',
        comparison: '9 > 1 → place 9 at result[2]',
        action: 'result[2]=9, right-- (3→2)',
        desc: '(-1)²=1 < 3²=9. Place 9 at result[2]. Move right pointer left.'
      },
      {
        stepNum: 4, title: 'Step 4: left=1(-1), right=2(0) → sq1 > sq0',
        left: 1, right: 2,
        array: [-4, -1, 0, 3, 10],
        computation: 'sq(-1)=1, sq(0)=0 → 1 > 0',
        comparison: '1 > 0 → place 1 at result[1]',
        action: 'result[1]=1, left++ (1→2)',
        desc: '(-1)²=1 > 0²=0. Place 1 at result[1]. Move left pointer right.'
      },
      {
        stepNum: 5, title: 'Step 5: Pointers meet → place sq(0)=0 → Done 🎉',
        left: 2, right: 2,
        array: [-4, -1, 0, 3, 10],
        computation: 'result[0]=0. Final: [0,1,9,16,100]',
        comparison: 'SQUARES SORTED 🎉',
        action: 'Return [0,1,9,16,100]',
        isMatch: true,
        desc: 'Pointers meet at index 2 (val 0). Place 0 at result[0]. Result [0,1,9,16,100] built in O(n) time! 🎉'
      }
    ]
  },

  'two-pointers-floyd-cycle': {
    title: "12. Floyd's Cycle Detection",
    input: 'Linked list with values following: 3→1→4→0→2→(cycle back to index 0)',
    goal: "Detect a cycle in O(n) time, O(1) space. Phase 2 finds the exact cycle start node.",
    terms: {
      'slow pointer': 'Moves one node at a time (slow = slow.next). Enters cycle after n/2 steps.',
      'fast pointer': 'Moves two nodes at a time (fast = fast.next.next). Laps slow inside the cycle.',
      'Phase 2': 'After slow==fast, reset slow to head. Both advance by 1. Their meeting point is the cycle entry node.',
    },
    array: [3, 1, 4, 0, 2],
    steps: [
      {
        stepNum: 1, title: 'Step 1: Init slow=head, fast=head',
        slow: 0, fast: 0,
        left: 0, right: 0,
        array: [3, 1, 4, 0, 2],
        computation: 'slow=idx0(val3), fast=idx0(val3)',
        comparison: 'Both pointers at head',
        action: 'Start Phase 1 — cycle detection',
        desc: 'Initialize both slow and fast at the head. Slow will move +1 per step, fast +2 per step.'
      },
      {
        stepNum: 2, title: 'Step 2: slow=idx1, fast=idx4 → not equal',
        slow: 1, fast: 4,
        left: 1, right: 4,
        array: [3, 1, 4, 0, 2],
        computation: 'slow=idx1(val1), fast=idx4(val2)',
        comparison: 'slow ≠ fast → continue',
        action: 'Advance both pointers',
        desc: 'After 1 round: slow moved to idx1, fast moved 2 steps to idx4. Not equal — keep going.'
      },
      {
        stepNum: 3, title: 'Step 3: slow=idx4, fast=idx4 → CYCLE DETECTED! ✅',
        slow: 4, fast: 4,
        left: 4, right: 4,
        array: [3, 1, 4, 0, 2],
        computation: 'slow=idx4, fast=idx4 → slow==fast',
        comparison: 'CYCLE CONFIRMED ✅',
        action: 'Begin Phase 2 — find cycle start',
        isMatch: true,
        desc: 'slow and fast meet at idx4. A cycle exists! Start Phase 2: reset slow to head, keep fast at meeting point.'
      },
      {
        stepNum: 4, title: 'Step 4: Reset slow=head, advance both at speed 1',
        slow: 0, fast: 4,
        left: 0, right: 4,
        array: [3, 1, 4, 0, 2],
        computation: 'slow=idx0(head), fast=idx4(meeting point)',
        comparison: 'Phase 2 started — find cycle entry',
        action: 'Move slow and fast +1 each step',
        desc: 'Reset slow to head. Both now move at speed 1. They will meet at the cycle entry node.'
      },
      {
        stepNum: 5, title: 'Step 5: slow==fast at idx3 → Cycle starts at idx3! 🎉',
        slow: 3, fast: 3,
        left: 3, right: 3,
        array: [3, 1, 4, 0, 2],
        computation: 'slow=fast=idx3 (val 0) — cycle entry found',
        comparison: 'CYCLE START = index 3 🎉',
        action: 'Return cycle start node (idx 3)',
        isMatch: true,
        desc: 'Slow and fast meet again at idx3. The cycle begins at index 3 (value 0). O(n) time, O(1) space — no HashSet needed! 🎉'
      }
    ]
  }
};
