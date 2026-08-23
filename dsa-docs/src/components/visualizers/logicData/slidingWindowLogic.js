export const slidingWindowLogic = {
  'sliding-window-intro': {
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

  'sliding-window-max-sum-subarray': {
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

  'sliding-window-longest-substring': {
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

  'sliding-window-min-subarray-sum': {
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

  'sliding-window-fruit-into-baskets': {
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
  }
};
