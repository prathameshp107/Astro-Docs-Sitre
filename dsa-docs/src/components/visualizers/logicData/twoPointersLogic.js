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
    input: 'height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]',
    goal: 'Calculate total units of water trapped between bars using two-pointer max tracking — O(n) time, O(1) space.',
    terms: {
      'leftMax': 'Maximum bar height seen so far from the left side. Water above left pointer = max(0, leftMax - height[left]).',
      'rightMax': 'Maximum bar height seen so far from the right side. Water above right pointer = max(0, rightMax - height[right]).',
      'Shorter side rule': 'Process the side with smaller max. Its trapped water is guaranteed by its boundary max regardless of the opposite side.',
    },
    array: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
    steps: [
      {
        stepNum: 1, title: 'Step 1: Init left=0, right=11, leftMax=0, rightMax=0, totalWater=0',
        left: 0, right: 11,
        array: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
        computation: 'left=0, right=11, leftMax=0, rightMax=0, totalWater=0',
        comparison: 'Pointers set at both array ends',
        action: 'Initialize boundaries and start loop',
        desc: 'Place left pointer at 0 and right pointer at n-1 (11). leftMax and rightMax track the highest elevation walls encountered from each side.'
      },
      {
        stepNum: 2, title: 'Step 2: leftMax(0) <= rightMax(0) → Process left[0]=0',
        left: 0, right: 11,
        array: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
        computation: 'leftMax=max(0,0)=0 | water += max(0, 0-0) = 0 | totalWater=0',
        comparison: 'leftMax(0) <= rightMax(0) → Left side is the bottleneck',
        action: 'water += 0, advance left: 0 → 1',
        desc: 'leftMax <= rightMax means leftMax governs this column. h[0]=0 >= leftMax(0), so leftMax stays 0. Trapped water = 0. Move left to index 1.'
      },
      {
        stepNum: 3, title: 'Step 3: leftMax(0) <= rightMax(0) → Process left[1]=1 → update leftMax=1',
        left: 1, right: 11,
        array: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
        computation: 'leftMax=max(0,1)=1 | water += max(0, 1-1) = 0 | totalWater=0',
        comparison: 'h[1]=1 > leftMax(0) → New left elevation barrier found',
        action: 'leftMax=1, advance left: 1 → 2',
        desc: 'h[1]=1 is taller than previous leftMax. Update leftMax=1. Since this bar is a boundary peak, 0 water is trapped. Move left to index 2.'
      },
      {
        stepNum: 4, title: 'Step 4: leftMax(1) > rightMax(0) → Process right[11]=1 → update rightMax=1',
        left: 2, right: 11,
        array: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
        computation: 'rightMax=max(0,1)=1 | water += max(0, 1-1) = 0 | totalWater=0',
        comparison: 'leftMax(1) > rightMax(0) → Right side is now the bottleneck',
        action: 'rightMax=1, advance right: 11 → 10',
        desc: 'leftMax(1) > rightMax(0), so we process right. h[11]=1 > rightMax(0), so update rightMax=1. No water trapped on boundary wall. Move right to index 10.'
      },
      {
        stepNum: 5, title: 'Step 5: leftMax(1) <= rightMax(1) → Process left[2]=0 → traps 1 unit 💧',
        left: 2, right: 10,
        array: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
        computation: 'water += leftMax(1) - h[2](0) = 1 unit | totalWater = 1',
        comparison: 'h[2]=0 < leftMax(1) → Valley dips below left boundary',
        action: 'totalWater += 1, advance left: 2 → 3',
        desc: 'h[2]=0 is lower than leftMax(1). The water trapped above index 2 is leftMax - h[2] = 1 - 0 = 1 unit of rain water! totalWater = 1. Advance left to 3.'
      },
      {
        stepNum: 6, title: 'Step 6: leftMax(1) <= rightMax(1) → Process left[3]=2 → update leftMax=2',
        left: 3, right: 10,
        array: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
        computation: 'leftMax=max(1,2)=2 | water += max(0, 2-2) = 0 | totalWater=1',
        comparison: 'h[3]=2 > leftMax(1) → New taller left barrier established',
        action: 'leftMax=2, advance left: 3 → 4',
        desc: 'h[3]=2 exceeds leftMax(1). Update leftMax=2. Bar forms a higher container wall so 0 water sits on it. Move left to index 4.'
      },
      {
        stepNum: 7, title: 'Step 7: leftMax(2) > rightMax(1) → Process right[10]=2 → update rightMax=2',
        left: 4, right: 10,
        array: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
        computation: 'rightMax=max(1,2)=2 | water += max(0, 2-2) = 0 | totalWater=1',
        comparison: 'leftMax(2) > rightMax(1) → Right is bottleneck, new right barrier',
        action: 'rightMax=2, advance right: 10 → 9',
        desc: 'leftMax(2) > rightMax(1) triggers right processing. h[10]=2 > rightMax(1), updating rightMax=2. No water trapped on wall. Move right to index 9.'
      },
      {
        stepNum: 8, title: 'Step 8: leftMax(2) <= rightMax(2) → Process left[4]=1 → traps 1 unit 💧',
        left: 4, right: 9,
        array: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
        computation: 'water += leftMax(2) - h[4](1) = 1 unit | totalWater = 2',
        comparison: 'h[4]=1 < leftMax(2) → Valley traps water below barrier height 2',
        action: 'totalWater += 1, advance left: 4 → 5',
        desc: 'leftMax(2) <= rightMax(2). Water trapped at index 4 is leftMax(2) - h[4](1) = 1 unit. Running totalWater reaches 2. Advance left to 5.'
      },
      {
        stepNum: 9, title: 'Step 9: leftMax(2) <= rightMax(2) → Process left[5]=0 → traps 2 units 💧💧',
        left: 5, right: 9,
        array: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
        computation: 'water += leftMax(2) - h[5](0) = 2 units | totalWater = 4',
        comparison: 'h[5]=0 < leftMax(2) → Deep basin traps 2 vertical water units',
        action: 'totalWater += 2, advance left: 5 → 6',
        desc: 'Deep basin at index 5 with height 0! Trapped water = leftMax(2) - h[5](0) = 2 units of water. Running totalWater jumps to 4. Advance left to 6.'
      },
      {
        stepNum: 10, title: 'Step 10: leftMax(2) <= rightMax(2) → Process left[6]=1 → traps 1 unit 💧',
        left: 6, right: 9,
        array: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
        computation: 'water += leftMax(2) - h[6](1) = 1 unit | totalWater = 5',
        comparison: 'h[6]=1 < leftMax(2) → Traps water below barrier height 2',
        action: 'totalWater += 1, advance left: 6 → 7',
        desc: 'h[6]=1 is lower than leftMax(2). Water trapped = 2 - 1 = 1 unit. Running totalWater reaches 5. Advance left to 7.'
      },
      {
        stepNum: 11, title: 'Step 11: leftMax(2) <= rightMax(2) → Process left[7]=3 → update leftMax=3',
        left: 7, right: 9,
        array: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
        computation: 'leftMax=max(2,3)=3 | water += max(0, 3-3) = 0 | totalWater=5',
        comparison: 'h[7]=3 > leftMax(2) → Global peak barrier discovered (height 3)',
        action: 'leftMax=3, advance left: 7 → 8',
        desc: 'h[7]=3 is the tallest peak in the entire array! leftMax updates to 3. No water sits on the peak. Advance left to 8.'
      },
      {
        stepNum: 12, title: 'Step 12: leftMax(3) > rightMax(2) → Process right[9]=1 → traps 1 unit 💧',
        left: 8, right: 9,
        array: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
        computation: 'water += rightMax(2) - h[9](1) = 1 unit | totalWater = 6',
        comparison: 'leftMax(3) > rightMax(2) → Right side is bottleneck',
        action: 'totalWater += 1, advance right: 9 → 8',
        desc: 'leftMax(3) > rightMax(2) switches control to the right pointer. h[9]=1 < rightMax(2), trapping rightMax(2) - h[9](1) = 1 unit. totalWater reaches 6! Advance right to 8.'
      },
      {
        stepNum: 13, title: 'Step 13: Pointers meet at index 8 (left=8, right=8) → Total Water = 6 🎉',
        left: 8, right: 8,
        array: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
        computation: 'left == right == 8 | totalWater = 6 units | Time: O(n), Space: O(1)',
        comparison: 'TRAPPING RAIN WATER COMPLETE 🎉',
        action: 'Return totalWater = 6',
        isMatch: true,
        desc: 'Pointers meet at index 8! Every cell has been accounted for with O(1) extra space and single O(n) pass. Total trapped rain water is 6 units. 🎉'
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
        stepNum: 1,
        title: 'Step 1: Sort → [-2,-1,0,0,1,2], fix i=0(-2), j=1(-1)',
        left: 2,
        right: 5,
        array: [-2, -1, 0, 0, 1, 2],
        computation: 'Sort nums. Fix i=0 (val -2), j=1 (val -1). left=2 (val 0), right=5 (val 2).',
        comparison: '-2 + (-1) + 0 + 2 = -1 < target 0',
        action: 'left++ (2→3)',
        desc: 'Sort the array first. Fix i=0 (-2) and j=1 (-1). Inner two pointers initialize at left=2 (0) and right=5 (2). Sum = -2-1+0+2 = -1 < 0. Advance left to index 3.'
      },
      {
        stepNum: 2,
        title: 'Step 2: i=0, j=1, left=3(0), right=5(2) → sum=-1 < 0',
        left: 3,
        right: 5,
        array: [-2, -1, 0, 0, 1, 2],
        computation: '-2 + (-1) + 0 + 2 = -1 < 0',
        comparison: 'Sum too small → move left pointer right',
        action: 'left++ (3→4)',
        desc: 'At left=3 (0) and right=5 (2), sum is still -2 + (-1) + 0 + 2 = -1 < 0. Increment left pointer to index 4 to find a larger value.'
      },
      {
        stepNum: 3,
        title: 'Step 3: i=0, j=1, left=4(1), right=5(2) → sum=0 ✅ MATCH 1',
        left: 4,
        right: 5,
        array: [-2, -1, 0, 0, 1, 2],
        computation: '-2 + (-1) + 1 + 2 = 0 ✅ Quadruplet 1: [-2,-1,1,2]',
        comparison: 'Sum == target (0 == 0) ✅',
        action: 'Record [-2,-1,1,2], left++, right--',
        isMatch: true,
        desc: 'Sum = -2 + (-1) + 1 + 2 = 0! Found 1st unique quadruplet: [-2, -1, 1, 2]. Advance both pointers (left=5, right=4). Inner loop finishes for (i=0, j=1).'
      },
      {
        stepNum: 4,
        title: 'Step 4: Advance j=2(0), left=3(0), right=5(2) → sum=0 ✅ MATCH 2',
        left: 3,
        right: 5,
        array: [-2, -1, 0, 0, 1, 2],
        computation: '-2 + 0 + 0 + 2 = 0 ✅ Quadruplet 2: [-2,0,0,2]',
        comparison: 'Sum == target (0 == 0) ✅',
        action: 'Record [-2,0,0,2], left++, right--',
        isMatch: true,
        desc: 'Advance outer loop j to index 2 (val 0). Set left=3 (0) and right=5 (2). Sum = -2 + 0 + 0 + 2 = 0! Found 2nd unique quadruplet: [-2, 0, 0, 2]. Skip duplicate j=3.'
      },
      {
        stepNum: 5,
        title: 'Step 5: Advance i=1(-1), j=2(0), left=3(0), right=5(2) → sum=1 > 0',
        left: 3,
        right: 5,
        array: [-2, -1, 0, 0, 1, 2],
        computation: '-1 + 0 + 0 + 2 = 1 > 0',
        comparison: 'Sum too large → move right pointer left',
        action: 'right-- (5→4)',
        desc: 'Advance outer loop i to 1 (-1), j to 2 (0). Inner pointers set to left=3 (0) and right=5 (2). Sum = -1 + 0 + 0 + 2 = 1 > 0. Sum is too large, decrement right to index 4.'
      },
      {
        stepNum: 6,
        title: 'Step 6: i=1, j=2, left=3(0), right=4(1) → sum=0 ✅ MATCH 3',
        left: 3,
        right: 4,
        array: [-2, -1, 0, 0, 1, 2],
        computation: '-1 + 0 + 0 + 1 = 0 ✅ Quadruplet 3: [-1,0,0,1]',
        comparison: 'Sum == target (0 == 0) ✅',
        action: 'Record [-1,0,0,1], left++, right--',
        isMatch: true,
        desc: 'At left=3 (0) and right=4 (1), sum = -1 + 0 + 0 + 1 = 0! Found 3rd unique quadruplet: [-1, 0, 0, 1]. All remaining pairs checked or skipped as duplicates.'
      },
      {
        stepNum: 7,
        title: 'Step 7: All Unique Quadruplets Found! 🎉',
        left: 3,
        right: 4,
        array: [-2, -1, 0, 0, 1, 2],
        computation: 'Result: [[-2,-1,1,2], [-2,0,0,2], [-1,0,0,1]] (Total 3)',
        comparison: '4SUM SEARCH COMPLETE 🎉',
        action: 'Return 3 unique quadruplets',
        isMatch: true,
        desc: 'All 3 unique quadruplets summing to 0 found: [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]. Time complexity: O(n³), Space complexity: O(1) auxiliary space. 🎉'
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
    input: 'Linked list: 3 → 1 → [4 → 0 → 2 → (loops back to 4)]',
    goal: "Detect cycle and find the exact cycle start node using Floyd's Tortoise and Hare algorithm — O(n) time, O(1) space.",
    terms: {
      'slow pointer': 'Moves 1 step at a time (slow = slow.next). Enters the cycle after L steps.',
      'fast pointer': 'Moves 2 steps at a time (fast = fast.next.next). Laps slow inside the cycle.',
      'Phase 2': 'After slow == fast, reset slow to head. Move both 1 step at a time. They will meet at the cycle entry.',
    },
    array: [3, 1, 4, 0, 2],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Init slow=head(idx 0), fast=head(idx 0)',
        slow: 0, fast: 0,
        left: 0, right: 0,
        array: [3, 1, 4, 0, 2],
        computation: 'slow = idx 0 (val 3), fast = idx 0 (val 3)',
        comparison: 'Both pointers start at head',
        action: 'Start Phase 1 — Cycle Detection',
        desc: 'Initialize both slow (tortoise) and fast (hare) at the list head (index 0). Slow will advance 1 step/round, fast 2 steps/round.'
      },
      {
        stepNum: 2,
        title: 'Step 2: slow moves to idx 1, fast moves to idx 2',
        slow: 1, fast: 2,
        left: 1, right: 2,
        array: [3, 1, 4, 0, 2],
        computation: 'slow: 0→1 (val 1) | fast: 0→1→2 (val 4)',
        comparison: 'slow (1) ≠ fast (2) → continue',
        action: 'Advance slow +1, fast +2',
        desc: 'Round 1: slow moves 1 step to index 1 (val 1). fast moves 2 steps to index 2 (val 4). Pointers do not match; continue search.'
      },
      {
        stepNum: 3,
        title: 'Step 3: slow moves to idx 2, fast moves to idx 4',
        slow: 2, fast: 4,
        left: 2, right: 4,
        array: [3, 1, 4, 0, 2],
        computation: 'slow: 1→2 (val 4) | fast: 2→3→4 (val 2)',
        comparison: 'slow (2) ≠ fast (4) → continue',
        action: 'Advance slow +1, fast +2',
        desc: 'Round 2: slow enters cycle at index 2 (val 4). fast moves 2 steps to index 4 (val 2). Fast is now closing in on slow.'
      },
      {
        stepNum: 4,
        title: 'Step 4: slow=idx 3, fast=idx 3 ➔ CYCLE DETECTED! ✅',
        slow: 3, fast: 3,
        left: 3, right: 3,
        array: [3, 1, 4, 0, 2],
        computation: 'slow: 2→3 (val 0) | fast: 4→2→3 (val 0)',
        comparison: 'slow == fast == index 3 ✅',
        action: 'Meeting Point Found — Start Phase 2',
        isMatch: true,
        desc: 'Round 3: fast laps slow and they meet at index 3 (val 0)! Cycle presence is confirmed. Begin Phase 2: reset slow to head.'
      },
      {
        stepNum: 5,
        title: 'Step 5: Reset slow=head(idx 0), advance both +1 step',
        slow: 1, fast: 4,
        left: 1, right: 4,
        array: [3, 1, 4, 0, 2],
        computation: 'slow: 0→1 (val 1) | fast: 3→4 (val 2)',
        comparison: 'slow (1) ≠ fast (4) → continue',
        action: 'Phase 2: Advance both at speed 1',
        desc: 'Phase 2: Reset slow to head (0) and keep fast at meeting point (3). Advance both by 1 step: slow moves to index 1, fast to index 4.'
      },
      {
        stepNum: 6,
        title: 'Step 6: slow == fast at idx 2 ➔ Cycle Entry Found! 🎉',
        slow: 2, fast: 2,
        left: 2, right: 2,
        array: [3, 1, 4, 0, 2],
        computation: 'slow: 1→2 (val 4) | fast: 4→2 (val 4)',
        comparison: 'CYCLE START = index 2 (val 4) 🎉',
        action: 'Return cycle start node (index 2)',
        isMatch: true,
        desc: 'Both pointers meet at index 2 (value 4)! The cycle begins at index 2. Solved in O(n) time and O(1) space with no HashSet! 🎉'
      }
    ]
  }
};
