// ────────────────────────────────────────────────────
// Complete DSA Patterns Reference Data (35 Core Patterns & Algorithms)
// ────────────────────────────────────────────────────

export const PATTERN_CATEGORIES = [
  { id: "all", label: "All Patterns", icon: "⚡" },
  { id: "two-pointers-window", label: "Two Pointers & Window", icon: "👆" },
  { id: "trees-graphs", label: "Trees & Graphs", icon: "🌳" },
  { id: "backtracking-dp", label: "DP & Backtracking", icon: "🧮" },
  { id: "data-structures", label: "Heap, Stack & Specialized", icon: "⛰️" },
  { id: "strings-bits", label: "Strings, Bits & Advanced", icon: "💡" },
];

export const DSA_PATTERNS = [
  {
    id: "two-pointers",
    title: "Two Pointers",
    category: "two-pointers-window",
    icon: "👆",
    difficulty: "Easy to Medium",
    description: "Use two index pointers to traverse a data structure (array, string, or linked list) from opposite ends or at different speeds.",
    whenToUse: [
      "Input is a sorted array or string",
      "Finding pairs, triplets, or sub-sequences matching a target sum/condition",
      "In-place operations requiring O(1) extra memory (e.g. reversing array, removing duplicates)",
      "Comparing characters from outer boundaries inward (e.g. Palindromes)"
    ],
    coreTrick: "Shrink or expand search space from both ends. If `sum < target`, move `left++` to increase value. If `sum > target`, move `right--` to decrease value.",
    visualDiagram: `  [ 1 ,  3 ,  5 ,  7 ,  11 ,  15 ]
    ↑                         ↑
   Left                     Right
   (sum = 16 > 12 -> move Right left ◄─)
   
  [ 1 ,  3 ,  5 ,  7 ,  11 ,  15 ]
    ↑                   ↑
   Left               Right
   (sum = 12 === 12 -> Target Found! ✓)`,
    pitfalls: [
      "Forgetting to check `left < right` loop termination condition",
      "Not handling duplicate values when finding all unique triplets/quadruplets",
      "Off-by-one errors on boundary indices"
    ],
    timeComplexity: "O(N) single pass",
    spaceComplexity: "O(1) extra space",
    templateCode: `function twoPointersPattern(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const currentSum = arr[left] + arr[right];

    if (currentSum === target) {
      return [left, right];
    } else if (currentSum < target) {
      left++;
    } else {
      right--;
    }
  }

  return [-1, -1];
}`,
    relatedProblemIds: ["two-sum-ii", "container-with-most-water", "trapping-rain-water", "valid-palindrome", "reverse-string"]
  },
  {
    id: "sliding-window",
    title: "Sliding Window",
    category: "two-pointers-window",
    icon: "🪟",
    difficulty: "Medium",
    description: "Maintain a contiguous subarray/substring window that dynamically expands or shrinks based on problem constraints.",
    whenToUse: [
      "Problem asks for longest, shortest, or optimal contiguous subarray/substring",
      "Input is an array or string and requires calculating window statistics (sum, max, min, distinct counts)",
      "Target conditions depend on contiguous range boundaries [left...right]"
    ],
    coreTrick: "Expand right pointer `right++` to add elements to window. When constraint is violated, shrink left pointer `left++` until window becomes valid again.",
    visualDiagram: `  Step 1: Expand Right ──►
  [ 2 ,  1 ,  5 ,  1 ,  3 ,  2 ]
  ├─── Window (k=3) ───┤
  Sum = 8 (Max = 8)

  Step 2: Slide Window ──►
  [ 2 ,  1 ,  5 ,  1 ,  3 ,  2 ]
       ├─── Window (k=3) ───┤
       Sum = 7 (Max = 8)`,
    pitfalls: [
      "Shrinking with `if` instead of `while` when multiple invalid steps are required",
      "Forgetting to update window state (frequency map / running sum) when `left` advances",
      "Not updating optimal result at the correct time (before vs after shrink)"
    ],
    timeComplexity: "O(N) since each pointer moves at most N times",
    spaceComplexity: "O(K) for tracking elements inside window (e.g. Map/Set)",
    templateCode: `function slidingWindowPattern(arr, k) {
  let left = 0;
  let maxLen = 0;
  const stateMap = new Map();

  for (let right = 0; right < arr.length; right++) {
    const rightVal = arr[right];
    stateMap.set(rightVal, (stateMap.get(rightVal) || 0) + 1);

    while (/* stateMap violates condition */ false) {
      const leftVal = arr[left];
      stateMap.set(leftVal, stateMap.get(leftVal) - 1);
      if (stateMap.get(leftVal) === 0) stateMap.delete(leftVal);
      left++;
    }

    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}`,
    relatedProblemIds: ["longest-repeating-character-replacement", "permutation-in-string", "minimum-window-substring", "sliding-window-maximum", "max-consecutive-ones-iii", "find-all-anagrams-in-a-string"]
  },
  {
    id: "prefix-sum-hashmap",
    title: "Prefix Sum & Hash Map",
    category: "two-pointers-window",
    icon: "➕",
    difficulty: "Medium",
    description: "Store cumulative prefix sums in a Hash Map to find contiguous subarrays whose sum equals K or matches a target modulo/remainder in O(N) time.",
    whenToUse: [
      "Finding contiguous subarray with sum equal to target K (Subarray Sum Equals K)",
      "Finding contiguous subarray with sum divisible by K",
      "Finding contiguous subarray with equal number of 0s and 1s"
    ],
    coreTrick: "If `prefixSum[i] - prefixSum[j] = K`, then the sum of elements between `j+1` and `i` is `K`. Store frequency of each `prefixSum` in Map: `map.get(currentSum - K)` gives count of matching subarrays ending at `i`.",
    visualDiagram: `  Array: [ 1 ,  1 ,  1 ] , Target K = 2
  
  i=0 (val 1): currSum = 1, need (1 - 2) = -1. Map: {0:1, 1:1}
  i=1 (val 1): currSum = 2, need (2 - 2) =  0. Map contains 0! Count += 1 ✓
  i=2 (val 1): currSum = 3, need (3 - 2) =  1. Map contains 1! Count += 1 ✓
  
  Total Subarrays Found = 2 ([1,1] at idx 0-1, [1,1] at idx 1-2)`,
    pitfalls: [
      "MUST initialize Map with `{ 0: 1 }` to handle subarrays starting at index 0",
      "Using Sliding Window on arrays with negative numbers (sliding window fails with negative numbers; Prefix Sum + Hash Map works!)"
    ],
    timeComplexity: "O(N) single pass",
    spaceComplexity: "O(N) space for Hash Map",
    templateCode: `function subarraySum(nums, k) {
  let count = 0;
  let currentSum = 0;
  // Initialize map with prefix sum 0 occurring 1 time
  const map = new Map([[0, 1]]);

  for (const num of nums) {
    currentSum += num;

    // Check if (currentSum - k) exists in map
    if (map.has(currentSum - k)) {
      count += map.get(currentSum - k);
    }

    // Update count of current prefix sum
    map.set(currentSum, (map.get(currentSum) || 0) + 1);
  }

  return count;
}`,
    relatedProblemIds: ["subarray-sum-equals-k"]
  },
  {
    id: "dutch-national-flag",
    title: "Dutch National Flag (3-Way Partitioning)",
    category: "two-pointers-window",
    icon: "🇳🇱",
    difficulty: "Medium",
    description: "Sort an array of 3 distinct values (e.g. 0s, 1s, and 2s) in a single pass in-place using 3 pointers (`low`, `mid`, `high`).",
    whenToUse: [
      "Sorting an array with 3 distinct keys/colors (Sort Colors)",
      "Partitioning array around a target range or pivot value",
      "Constraints require O(N) time and O(1) in-place memory"
    ],
    coreTrick: "`mid` pointer traverses array: if `nums[mid] === 0`, swap with `low` and increment both (`low++`, `mid++`). If `nums[mid] === 1`, `mid++`. If `nums[mid] === 2`, swap with `high` and decrement `high--`.",
    visualDiagram: `  [ 2 ,  0 ,  2 ,  1 ,  1 ,  0 ]
   L/M                       H
   
   mid=0 (val 2): Swap(mid, high) -> high--:
  [ 0 ,  0 ,  2 ,  1 ,  1 ,  2 ]
   L/M                  H
   
   mid=0 (val 0): Swap(mid, low) -> low++, mid++:
  [ 0 ,  0 ,  2 ,  1 ,  1 ,  2 ]  ◄─ Partitioned: 0s | 1s | 2s ✓`,
    pitfalls: [
      "Do NOT increment `mid` when swapping with `high` (the swapped element brought from `high` has not been inspected yet!)",
      "Loop condition MUST be `mid <= high`"
    ],
    timeComplexity: "O(N) single pass",
    spaceComplexity: "O(1) in-place pointers",
    templateCode: `function sortColors(nums) {
  let low = 0;
  let mid = 0;
  let high = nums.length - 1;

  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++;
      mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else { // nums[mid] === 2
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--; // Note: do NOT increment mid here!
    }
  }
}`,
    relatedProblemIds: ["sort-colors"]
  },
  {
    id: "boyer-moore-majority-vote",
    title: "Boyer-Moore Majority Vote",
    category: "two-pointers-window",
    icon: "🗳️",
    difficulty: "Easy to Medium",
    description: "Find the element that appears more than ⌊N/2⌋ times in an array in O(N) time and O(1) extra space.",
    whenToUse: [
      "Finding majority element appearing > N/2 times",
      "Finding elements appearing > N/3 times (using 2 candidate counters)",
      "Strict O(1) space constraint without using Hash Maps"
    ],
    coreTrick: "Maintain a `candidate` and `count`. If `count === 0`, set candidate to current element. If element matches candidate, `count++`, else `count--`.",
    visualDiagram: `  Array: [ 2 ,  2 ,  1 ,  1 ,  1 ,  2 ,  2 ]
  
  i=0: Cand=2, Count=1
  i=1: Cand=2, Count=2
  i=2: Cand=2, Count=1
  i=3: Cand=2, Count=0
  i=4: Cand=1, Count=1
  i=5: Cand=1, Count=0
  i=6: Cand=2, Count=1 ──► Candidate 2 Majority Winner! ✓`,
    pitfalls: [
      "Boyer-Moore guarantees candidate ONLY if majority element actually exists (> N/2 times). If majority is not guaranteed, verify candidate in a 2nd pass."
    ],
    timeComplexity: "O(N) linear time",
    spaceComplexity: "O(1) auxiliary space",
    templateCode: `function majorityElement(nums) {
  let candidate = null;
  let count = 0;

  for (const num of nums) {
    if (count === 0) {
      candidate = num;
    }
    count += (num === candidate) ? 1 : -1;
  }

  return candidate;
}`,
    relatedProblemIds: ["majority-element"]
  },
  {
    id: "product-except-self",
    title: "Product of Array Except Self (Prefix/Suffix Products)",
    category: "two-pointers-window",
    icon: "✖️",
    difficulty: "Medium",
    description: "Calculate an array `res` where `res[i]` is the product of all elements except `nums[i]` in O(N) time without using division.",
    whenToUse: [
      "Product of array except self without division",
      "Accumulating prefix and suffix running results for each element"
    ],
    coreTrick: "Pass 1 (Left to Right): store prefix products in `res`. Pass 2 (Right to Left): multiply `res[i]` by suffix product running variable.",
    visualDiagram: `  Array:            [ 1 ,  2 ,  3 ,  4 ]
  Prefix Products:  [ 1 ,  1 ,  2 ,  6 ] (Pass 1)
  Suffix Products:  [ 24, 12 ,  4 ,  1 ] (Pass 2)
  Final Result:     [ 24, 12 ,  8 ,  6 ] ✓`,
    pitfalls: [
      "Attempting division `totalProduct / nums[i]` (fails when array contains zeros!)",
      "Creating two separate prefix and suffix arrays (uses O(N) space instead of O(1) extra space)"
    ],
    timeComplexity: "O(N) two passes",
    spaceComplexity: "O(1) extra space (excluding output array)",
    templateCode: `function productExceptSelf(nums) {
  const n = nums.length;
  const res = new Array(n).fill(1);

  // Pass 1: Prefix products from left to right
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    res[i] = prefix;
    prefix *= nums[i];
  }

  // Pass 2: Suffix products from right to left
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    res[i] *= suffix;
    suffix *= nums[i];
  }

  return res;
}`,
    relatedProblemIds: ["product-of-array-except-self"]
  },
  {
    id: "array-reversal-algorithm",
    title: "Array Reversal & Rotation Algorithm",
    category: "two-pointers-window",
    icon: "🔄",
    difficulty: "Medium",
    description: "Rotate an array by K steps or find the next lexicographical permutation by reversing sub-sections of the array in-place.",
    whenToUse: [
      "Rotating an array to the right by K steps in O(N) time and O(1) space",
      "Next Permutation algorithm",
      "Reversing words in a string in-place"
    ],
    coreTrick: "To rotate right by K steps: 1. Reverse entire array -> 2. Reverse first K elements -> 3. Reverse remaining `N - K` elements.",
    visualDiagram: `  Array: [ 1 , 2 , 3 , 4 , 5 , 6 , 7 ] , K = 3
  
  Step 1: Reverse All:      [ 7 , 6 , 5 , 4 , 3 , 2 , 1 ]
  Step 2: Reverse 0..K-1:   [ 5 , 6 , 7 , 4 , 3 , 2 , 1 ]
  Step 3: Reverse K..N-1:   [ 5 , 6 , 7 , 1 , 2 , 3 , 4 ]  ◄─ Rotated in-place! ✓`,
    pitfalls: [
      "Not handling `k > N` (MUST do `k = k % N`)",
      "Allocating a secondary array (violates O(1) space constraint)"
    ],
    timeComplexity: "O(N) linear time",
    spaceComplexity: "O(1) in-place memory",
    templateCode: `function rotate(nums, k) {
  const n = nums.length;
  k = k % n; // Handle k larger than array length

  function reverse(l, r) {
    while (l < r) {
      [nums[l], nums[r]] = [nums[r], nums[l]];
      l++; r--;
    }
  }

  reverse(0, n - 1); // Reverse entire array
  reverse(0, k - 1); // Reverse first k elements
  reverse(k, n - 1); // Reverse remaining elements
}`,
    relatedProblemIds: ["rotate-array", "next-permutation"]
  },
  {
    id: "fast-slow-pointers",
    title: "Fast & Slow Pointers (Floyd's Cycle)",
    category: "two-pointers-window",
    icon: "🐢",
    difficulty: "Easy to Medium",
    description: "Use two pointers moving at different speeds (usually 1 step vs 2 steps) to detect cycles or find middle nodes in linked lists and arrays.",
    whenToUse: [
      "Detecting cycles in Linked Lists or Array sequence jumps",
      "Finding the middle node of a Linked List in single pass",
      "Finding the start node of a cycle",
      "Happy Number digit square sum cycle detection"
    ],
    coreTrick: "`slow` moves 1 step, `fast` moves 2 steps. If a cycle exists, `fast` will eventually overlap with `slow` (`fast === slow`).",
    visualDiagram: `  (1) ──► (2) ──► (3) ──► (4) ──┐
                   ▲            │
                   └───── (5) ◄─┘
  
  Step 0: Slow @ (1), Fast @ (1)
  Step 1: Slow @ (2), Fast @ (3)
  Step 2: Slow @ (3), Fast @ (5)
  Step 3: Slow @ (4), Fast @ (4)  ◄─ Overlap! Cycle Detected! ✓`,
    pitfalls: [
      "Null pointer errors: forgetting to check `fast !== null && fast.next !== null`",
      "Infinite loops if fast pointer is not advanced properly"
    ],
    timeComplexity: "O(N) linear scan",
    spaceComplexity: "O(1) auxiliary space",
    templateCode: `function floydCycleDetection(head) {
  if (!head || !head.next) return false;

  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;       // Moves 1 step
    fast = fast.next.next;  // Moves 2 steps

    if (slow === fast) {
      return true; // Cycle detected!
    }
  }

  return false;
}`,
    relatedProblemIds: ["linked-list-cycle", "reorder-list"]
  },
  {
    id: "cyclic-sort",
    title: "Cyclic Sort",
    category: "two-pointers-window",
    icon: "🔄",
    difficulty: "Easy to Medium",
    description: "Sort an array of numbers in the range 1 to N in O(N) time and O(1) space by placing each number at its correct index (`nums[i] - 1`).",
    whenToUse: [
      "Array contains numbers in a given continuous range (e.g. 1 to N or 0 to N)",
      "Finding missing, duplicate, or corrupted numbers in range 1 to N",
      "Constraints demand O(N) time and O(1) space"
    ],
    coreTrick: "While `nums[i]` is not at index `nums[i] - 1`, swap `nums[i]` with the element at index `nums[i] - 1`.",
    visualDiagram: `  Index:    0    1    2    3    4
  Array:  [ 3 ,  1 ,  5 ,  4 ,  2 ]
  
  i=0: 3 is not at index 2 -> Swap(nums[0], nums[2]):
  Array:  [ 5 ,  1 ,  3 ,  4 ,  2 ]
  
  i=0: 5 is not at index 4 -> Swap(nums[0], nums[4]):
  Array:  [ 2 ,  1 ,  3 ,  4 ,  5 ]
  
  i=0: 2 is not at index 1 -> Swap(nums[0], nums[1]):
  Array:  [ 1 ,  2 ,  3 ,  4 ,  5 ]  ◄─ Sorted in O(N)! ✓`,
    pitfalls: [
      "Infinite loop if swapping duplicate numbers: check `nums[i] !== nums[correctIdx]` before swapping",
      "0-indexed vs 1-indexed range off-by-one errors"
    ],
    timeComplexity: "O(N) time",
    spaceComplexity: "O(1) in-place space",
    templateCode: `function cyclicSort(nums) {
  let i = 0;
  while (i < nums.length) {
    const correctIndex = nums[i] - 1;
    if (nums[i] !== nums[correctIndex]) {
      [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]];
    } else {
      i++;
    }
  }
  return nums;
}`,
    relatedProblemIds: ["array-missing-number"]
  },
  {
    id: "in-place-linked-list-reversal",
    title: "In-place Reversal of Linked List",
    category: "two-pointers-window",
    icon: "⛓️",
    difficulty: "Easy to Medium",
    description: "Reverse pointers of a linked list in-place without creating new nodes using 3 tracking pointers: `prev`, `curr`, and `next`.",
    whenToUse: [
      "Reversing a singly linked list or a sub-segment [left...right] of a list",
      "Reversing nodes in K-group batches",
      "Checking if a linked list is a Palindrome"
    ],
    coreTrick: "Store `next = curr.next`. Redirect pointer `curr.next = prev`. Advance `prev = curr` and `curr = next`.",
    visualDiagram: `  (Prev: null)   (Curr: 1) ──► (2) ──► (3)
                      │
    Redirect: null ◄── (1)   (Prev: 1)   (Curr: 2) ──► (3)
                              │
    Redirect: null ◄── (1) ◄── (2)   (Prev: 2)   (Curr: 3)
                              │
    Final Reversed: (3) ──► (2) ──► (1) ──► null ✓`,
    pitfalls: [
      "Losing reference to remaining list: MUST snapshot `next = curr.next` before modifying `curr.next`",
      "Not returning `prev` as the new head of the reversed list"
    ],
    timeComplexity: "O(N) single pass",
    spaceComplexity: "O(1) in-place pointers",
    templateCode: `function reverseLinkedList(head) {
  let prev = null;
  let curr = head;

  while (curr !== null) {
    const nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }

  return prev;
}`,
    relatedProblemIds: ["reverse-linked-list", "reorder-list"]
  },
  {
    id: "merge-intervals",
    title: "Merge Intervals",
    category: "two-pointers-window",
    icon: "📅",
    difficulty: "Medium",
    description: "Sort overlapping intervals by start time, then merge adjacent intervals that overlap.",
    whenToUse: [
      "Input is a list of intervals `[start, end]` (e.g. meeting times, calendar slots)",
      "Finding overlapping ranges, merged schedules, or inserted time slots"
    ],
    coreTrick: "Sort intervals by `start` time: `intervals.sort((a, b) => a[0] - b[0])`. Two intervals `A` and `B` overlap if `B.start <= A.end`. Merge as `[A.start, max(A.end, B.end)]`.",
    visualDiagram: `  Interval A: [ 1 ─────────► 5 ]
  Interval B:      [ 3 ─────────► 7 ]
  Overlap?    3 <= 5 -> YES!
  Merged:     [ 1 ──────────────► 7 ]`,
    pitfalls: [
      "Forgetting to sort intervals first",
      "Comparing against original end time instead of updated merged end time",
      "Off-by-one comparison (`<` vs `<=`) depending on whether touching boundaries count as overlap"
    ],
    timeComplexity: "O(N log N) due to initial sorting step",
    spaceComplexity: "O(N) for output merged list",
    templateCode: `function mergeIntervalsPattern(intervals) {
  if (intervals.length <= 1) return intervals;
  intervals.sort((a, b) => a[0] - b[0]);

  const merged = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i];
    const lastMerged = merged[merged.length - 1];

    if (current[0] <= lastMerged[1]) {
      lastMerged[1] = Math.max(lastMerged[1], current[1]);
    } else {
      merged.push(current);
    }
  }

  return merged;
}`,
    relatedProblemIds: ["insert-interval", "merge-intervals", "meeting-rooms", "meeting-rooms-ii"]
  },
  {
    id: "kadanes-algorithm",
    title: "Kadane's Algorithm (Max Subarray Sum)",
    category: "two-pointers-window",
    icon: "📈",
    difficulty: "Medium",
    description: "Find the maximum sum of a contiguous subarray in O(N) time using DP local vs global running sum.",
    whenToUse: [
      "Maximum subarray sum problem",
      "Maximum product subarray (with track min/max state)",
      "Contiguous gain optimization"
    ],
    coreTrick: "`currentSum = Math.max(num, currentSum + num)`. Decide whether to append current element or start a fresh subarray at `num`.",
    visualDiagram: `  Array: [ -2 ,  1 , -3 ,  4 , -1 ,  2 ,  1 , -5 ,  4 ]
  
  currSum: -2 ──► 1 ──► -2 ──► 4 ──► 3 ──► 5 ──► 6 ──► 1 ──► 5
  maxSum:  -2 ──► 1 ──►  1 ──► 4 ──► 4 ──► 5 ──► 6 ──► 6 ──► 6
  
  Max Subarray: [4, -1, 2, 1] with Sum = 6 ✓`,
    pitfalls: [
      "Initializing `maxSum = 0` instead of `-Infinity` (fails when all numbers are negative)",
      "Confusing maximum contiguous sum with non-contiguous subset sum"
    ],
    timeComplexity: "O(N) single pass",
    spaceComplexity: "O(1) extra space",
    templateCode: `function maxSubArray(nums) {
  let currentSum = nums[0];
  let maxSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}`,
    relatedProblemIds: ["maximum-subarray"]
  },
  {
    id: "expand-around-center",
    title: "Expand Around Center (Palindromes)",
    category: "two-pointers-window",
    icon: "↔️",
    difficulty: "Easy to Medium",
    description: "Find palindromic substrings by expanding outward from each character (odd length) and pair of characters (even length).",
    whenToUse: [
      "Longest Palindromic Substring",
      "Counting total Palindromic Substrings",
      "In-place palindrome matching in O(1) space"
    ],
    coreTrick: "There are 2N - 1 potential centers. Expand while `s[left] === s[right]`. Move `left--` and `right++`.",
    visualDiagram: `  String: "a a a"
  Center i=1 (Odd):  s[1] = 'a' ──► expand (0,2) 'a'=='a' ──► "aaa"
  Center i=0,1 (Even): s[0..1] = "aa" ──► 'a'=='a' ──► "aa"
  
  Total Palindromes: 6 ("a","a","a","aa","aa","aaa") ✓`,
    pitfalls: [
      "Forgetting to check even-length centers `(i, i + 1)`",
      "Boundary errors on `left >= 0` and `right < s.length`"
    ],
    timeComplexity: "O(N²) time",
    spaceComplexity: "O(1) in-place space",
    templateCode: `function countSubstrings(s) {
  let count = 0;
  function expand(l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      count++; l--; r++;
    }
  }
  for (let i = 0; i < s.length; i++) {
    expand(i, i);     // Odd-length center
    expand(i, i + 1); // Even-length center
  }
  return count;
}`,
    relatedProblemIds: ["longest-palindromic-substring", "palindromic-substrings"]
  },
  {
    id: "tree-bfs",
    title: "Tree Breadth-First Search (BFS)",
    category: "trees-graphs",
    icon: "🌐",
    difficulty: "Easy to Medium",
    description: "Traverse a tree or graph level by level using a Queue (FIFO data structure).",
    whenToUse: [
      "Level-order traversal of a binary tree",
      "Finding shortest path in unweighted graphs or grids",
      "Finding minimum depth or nearest target node"
    ],
    coreTrick: "Push root to Queue. In a loop, capture `levelSize = queue.length`. Process exactly `levelSize` nodes in an inner loop to isolate level boundaries.",
    visualDiagram: `  Level 1:            (1)           ◄─ Queue: [1]
                    /     \\
  Level 2:       (2)       (3)      ◄─ Queue: [2, 3]
                /   \\        \\
  Level 3:    (4)   (5)      (6)    ◄─ Queue: [4, 5, 6]
  
  Traversal Order: 1 ──► 2, 3 ──► 4, 5, 6`,
    pitfalls: [
      "Not snapshotting `queue.length` before inner loop (causes level bleed as new children are pushed)",
      "Forgetting visited set in graphs (causes infinite loops)"
    ],
    timeComplexity: "O(V + E) for graphs, O(N) for tree nodes",
    spaceComplexity: "O(W) where W is maximum width of tree/graph level",
    templateCode: `function treeBFS(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(currentLevel);
  }

  return result;
}`,
    relatedProblemIds: ["binary-tree-level-order-traversal", "binary-tree-right-side-view", "rotting-oranges"]
  },
  {
    id: "tree-dfs",
    title: "Tree Depth-First Search (DFS)",
    category: "trees-graphs",
    icon: "🌲",
    difficulty: "Easy to Hard",
    description: "Traverse deep down a tree path before backtracking using Recursion or an explicit Stack.",
    whenToUse: [
      "Path sum problems (root to leaf or subtree path)",
      "Tree property validation (BST, Balanced, Same Tree)",
      "Subtree matching and tree transformation (Invert, Clone)"
    ],
    coreTrick: "Base case handles `null` node. Recurse on `node.left` and `node.right`. Combine results or return accumulated path state.",
    visualDiagram: `            (1) ↓  [Pre-Order Visit]
           /   \\
    ↓ (2)     (5)
      /   \\
   (3)     (4)
   
  DFS Visit Order: 1 ──► 2 ──► 3 ──► (backtrack) ──► 4 ──► (backtrack) ──► 5`,
    pitfalls: [
      "Missing null check base case `if (!node) return defaultVal`",
      "Confusing Pre-order (root first), In-order (BST sorted order), and Post-order (bottom-up aggregation)",
      "Call stack overflow on deep skewed trees"
    ],
    timeComplexity: "O(N) visiting each node once",
    spaceComplexity: "O(H) call stack where H is tree height",
    templateCode: `function treeDFS(root) {
  if (!root) return 0;
  const leftDepth = treeDFS(root.left);
  const rightDepth = treeDFS(root.right);
  return 1 + Math.max(leftDepth, rightDepth);
}`,
    relatedProblemIds: ["maximum-depth-of-binary-tree", "invert-binary-tree", "diameter-of-binary-tree", "balanced-binary-tree", "same-tree", "validate-binary-search-tree", "binary-tree-maximum-path-sum"]
  },
  {
    id: "matrix-grid-traversal",
    title: "Matrix Grid Traversal (Grid BFS/DFS)",
    category: "trees-graphs",
    icon: "🗺️",
    difficulty: "Medium",
    description: "Traverse a 2D grid/matrix using DFS or BFS with 4-directional or 8-directional cell movements.",
    whenToUse: [
      "Counting islands, connected components in grid",
      "Flood fill, maze pathing, shortest path in grid",
      "Pacific Atlantic water flow, rotting oranges"
    ],
    coreTrick: "Use direction vectors `dirs = [[0,1],[0,-1],[1,0],[-1,0]]`. Check boundary conditions `r >= 0 && r < rows && c >= 0 && c < cols`.",
    visualDiagram: `  Grid:
  [ 1 ,  1 ,  0 ]        (r-1, c)
  [ 1 ,  0 ,  0 ]    (r, c-1) ◄─ [r,c] ─► (r, c+1)
  [ 0 ,  0 ,  1 ]        (r+1, c)
  
  Islands Counted: 2 independent components ✓`,
    pitfalls: [
      "Forgetting to mark cell as visited (setting `grid[r][c] = '0'` or maintaining `visited` set) causing infinite loops",
      "Out of bounds index errors on row or column boundaries"
    ],
    timeComplexity: "O(R × C) where R is rows and C is columns",
    spaceComplexity: "O(R × C) for recursion stack or queue",
    templateCode: `function numIslands(grid) {
  if (!grid || !grid.length) return 0;
  const rows = grid.length, cols = grid[0].length;
  let count = 0;

  function dfs(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] !== '1') return;
    grid[r][c] = '0';
    dfs(r + 1, c); dfs(r - 1, c);
    dfs(r, c + 1); dfs(r, c - 1);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') { count++; dfs(r, c); }
    }
  }
  return count;
}`,
    relatedProblemIds: ["number-of-islands", "pacific-atlantic-water-flow", "rotting-oranges", "word-search"]
  },
  {
    id: "multi-source-bfs",
    title: "Multi-Source BFS",
    category: "trees-graphs",
    icon: "🌊",
    difficulty: "Medium",
    description: "Start BFS queue with ALL source nodes simultaneously to find shortest distance transform or propagation time.",
    whenToUse: [
      "Rotting Oranges (time for all fresh oranges to rot)",
      "01 Matrix (distance to nearest 0 for each cell)",
      "Multiple starting fire/water sources expanding simultaneously"
    ],
    coreTrick: "Push ALL initial sources to Queue at `t=0`. Process queue level-by-level to simulate simultaneous outward expansion.",
    visualDiagram: `  Initial Queue: All rotten oranges [(0,0), (2,2)]
  
  Time t=1: Rot neighboring fresh oranges simultaneously
  Time t=2: Rot next layer outward ──► Complete propagation!`,
    pitfalls: [
      "Starting BFS individually from each source instead of pushing all sources to initial Queue",
      "Not tracking total fresh elements to check if all were reached"
    ],
    timeComplexity: "O(R × C) single grid pass",
    spaceComplexity: "O(R × C) queue size",
    templateCode: `function orangesRotting(grid) {
  const rows = grid.length, cols = grid[0].length;
  const queue = [];
  let fresh = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 2) queue.push([r, c]);
      else if (grid[r][c] === 1) fresh++;
    }
  }

  if (fresh === 0) return 0;
  let mins = 0;
  const dirs = [[0,1],[0,-1],[1,0],[-1,0]];

  while (queue.length > 0 && fresh > 0) {
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const [r, c] = queue.shift();
      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1) {
          grid[nr][nc] = 2; fresh--;
          queue.push([nr, nc]);
        }
      }
    }
    mins++;
  }
  return fresh === 0 ? mins : -1;
}`,
    relatedProblemIds: ["rotting-oranges"]
  },
  {
    id: "dijkstras-algorithm",
    title: "Dijkstra's Algorithm (Shortest Path)",
    category: "trees-graphs",
    icon: "🧭",
    difficulty: "Medium to Hard",
    description: "Find shortest distance from source node to all other nodes in a weighted graph with non-negative edge weights.",
    whenToUse: [
      "Shortest path in weighted graph or grid with positive weights",
      "Network Delay Time, Cheapest Flights Within K Stops",
      "Swim in Rising Water (Min-Max path height)"
    ],
    coreTrick: "Maintain `dist[]` array initialized to `Infinity` and `dist[src] = 0`. Use Priority Queue (Min-Heap) to pick node `u` with minimum `dist[u]`. Relax edges: `if (dist[u] + w < dist[v]) dist[v] = dist[u] + w`.",
    visualDiagram: `  (Start K) ──(w=1)──► Node 1  ──(w=1)──► Node 4
      │                                       ▲
      └────────────────(w=4)──────────────────┘
  
  Relax Edge: dist[4] updated from 4 to min(4, 1+1) = 2! ✓`,
    pitfalls: [
      "Applying Dijkstra to graphs with negative edge weights (use Bellman-Ford instead!)",
      "Not ignoring stale Priority Queue entries (`if (d > dist[u]) continue`)"
    ],
    timeComplexity: "O(E log V) with Priority Queue / Min-Heap",
    spaceComplexity: "O(V + E) for adjacency list and dist array",
    templateCode: `function networkDelayTime(times, n, k) {
  const graph = Array.from({ length: n + 1 }, () => []);
  for (const [u, v, w] of times) graph[u].push([v, w]);

  const dist = new Array(n + 1).fill(Infinity);
  dist[k] = 0;
  const vis = new Array(n + 1).fill(false);

  for (let i = 0; i < n; i++) {
    let u = -1;
    for (let j = 1; j <= n; j++) {
      if (!vis[j] && (u === -1 || dist[j] < dist[u])) u = j;
    }
    if (dist[u] === Infinity) break;
    vis[u] = true;

    for (const [v, w] of graph[u]) {
      if (dist[u] + w < dist[v]) dist[v] = dist[u] + w;
    }
  }

  const maxDist = Math.max(...dist.slice(1));
  return maxDist === Infinity ? -1 : maxDist;
}`,
    relatedProblemIds: ["network-delay-time"]
  },
  {
    id: "floyd-warshall",
    title: "Floyd-Warshall (All-Pairs Shortest Path)",
    category: "trees-graphs",
    icon: "🌐",
    difficulty: "Hard",
    description: "Find shortest paths between ALL pairs of vertices in a weighted graph in O(V^3) time using 3D/2D DP.",
    whenToUse: [
      "Finding shortest distance between every pair of nodes",
      "Transitive closure / reachability in directed graph",
      "Graph size is small (V <= 300)"
    ],
    coreTrick: "3 nested loops `k -> i -> j`. Intermediate node `k` tests if path `i -> k -> j` is shorter than `i -> j`: `dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j])`.",
    visualDiagram: `  Loop k (intermediate node):
  dist[i][j] = Math.min( dist[i][j] , dist[i][k] + dist[k][j] )
  
  (Node i) ──────────► (Node j)
     │                   ▲
     └───► (Node k) ─────┘`,
    pitfalls: [
      "The outermost loop MUST be the intermediate node `k`! (If `k` is inner loop, optimal intermediate paths will be missed)",
      "Handling integer overflow when adding `Infinity + weight`"
    ],
    timeComplexity: "O(V³) cubic time",
    spaceComplexity: "O(V²) 2D distance matrix",
    templateCode: `function floydWarshall(n, edges) {
  const dist = Array.from({ length: n }, () => new Array(n).fill(Infinity));
  for (let i = 0; i < n; i++) dist[i][i] = 0;
  for (const [u, v, w] of edges) dist[u][v] = w;

  // Intermediate node k MUST be outer loop!
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }
  return dist;
}`,
    relatedProblemIds: ["network-delay-time"]
  },
  {
    id: "topological-sort",
    title: "Topological Sort (Kahn's Algorithm)",
    category: "trees-graphs",
    icon: "📊",
    difficulty: "Medium",
    description: "Order vertices of a Directed Acyclic Graph (DAG) such that for every directed edge u -> v, u comes before v.",
    whenToUse: [
      "Course prerequisite ordering",
      "Build dependency resolution / task scheduling",
      "Detecting cycles in a directed graph"
    ],
    coreTrick: "Build `inDegree` array for all nodes. Push all nodes with `inDegree === 0` to a Queue. Process queue: for each neighbor, decrement `inDegree`. When inDegree reaches 0, push to Queue.",
    visualDiagram: `  Course 0 ──► Course 1 ──► Course 2
                     ▲
  Course 3 ──────────┘
  
  In-Degrees:  0:0 , 1:2 , 2:1 , 3:0
  Queue Zero In-Degree: [0, 3] ──► Order: [0, 3, 1, 2]`,
    pitfalls: [
      "Applying Topological Sort to undirected graphs or graphs containing cycles",
      "Not checking if `order.length === numNodes` (if less, cycle exists!)"
    ],
    timeComplexity: "O(V + E) linear time for graphs",
    spaceComplexity: "O(V + E) for adjacency list and Queue",
    templateCode: `function topologicalSortPattern(numNodes, prerequisites) {
  const graph = Array.from({ length: numNodes }, () => []);
  const inDegree = new Array(numNodes).fill(0);

  for (const [dest, src] of prerequisites) {
    graph[src].push(dest);
    inDegree[dest]++;
  }

  const queue = [];
  for (let i = 0; i < numNodes; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  const order = [];
  while (queue.length > 0) {
    const node = queue.shift();
    order.push(node);

    for (const neighbor of graph[node]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) queue.push(neighbor);
    }
  }

  return order.length === numNodes ? order : [];
}`,
    relatedProblemIds: ["course-schedule", "alien-dictionary", "course-schedule-ii"]
  },
  {
    id: "disjoint-set-union",
    title: "Disjoint Set Union (DSU / Union-Find)",
    category: "trees-graphs",
    icon: "🔗",
    difficulty: "Medium",
    description: "Maintain a collection of disjoint sets, supporting near O(1) operations to find set representative and union two sets.",
    whenToUse: [
      "Detecting cycles in undirected graphs",
      "Connecting components (Kruskal's MST, Redundant Connection)",
      "Dynamic connectivity queries"
    ],
    coreTrick: "Path Compression (`parent[i] = find(parent[i])`) flattens tree structure during lookups, yielding near O(1) amortized inverse Ackermann time α(N).",
    visualDiagram: `  Root(1) ◄── (2)          Root(3) ◄── (4)
     └────── Union(1, 3) ─────────┘
  
  Path Compression: Point (2) and (4) directly to Root(3)!
               Root(3)
              /   |   \\
            (1)  (2)  (4)`,
    pitfalls: [
      "Forgetting Path Compression in `find()` method",
      "Confusing parent array indices with node IDs (1-indexed vs 0-indexed)"
    ],
    timeComplexity: "O(α(N)) ≈ O(1) amortized per operation",
    spaceComplexity: "O(N) for parent array",
    templateCode: `class UnionFind {
  constructor(size) {
    this.parent = Array.from({ length: size }, (_, i) => i);
  }

  find(i) {
    if (this.parent[i] === i) return i;
    return (this.parent[i] = this.find(this.parent[i]));
  }

  union(i, j) {
    const rootI = this.find(i);
    const rootJ = this.find(j);

    if (rootI !== rootJ) {
      this.parent[rootI] = rootJ;
      return true;
    }
    return false;
  }
}`,
    relatedProblemIds: ["graph-valid-tree", "redundant-connection"]
  },
  {
    id: "backtracking",
    title: "Backtracking (Decision Tree)",
    category: "backtracking-dp",
    icon: "↩️",
    difficulty: "Medium to Hard",
    description: "Explore all possible combinations/permutations by building candidate solutions incrementally and undoing choices (backtracking) when a branch fails.",
    whenToUse: [
      "Finding all combinations, permutations, subsets, or partitions",
      "Sudoku, N-Queens, Word Search grid pathing",
      "Generating all valid configurations matching constraints"
    ],
    coreTrick: "Standard 3-step loop: 1. `path.push(choice)` -> 2. `backtrack(nextState)` -> 3. `path.pop()` (undo choice).",
    visualDiagram: `                  [ Root: [] ]
                /      |      \\
            [1]       [2]       [3]
           /   \\       |
       [1,2]  [1,3]  [2,3]
       
  Action Order:  Push choice ──► Recurse ──► Pop/Undo choice ◄──`,
    pitfalls: [
      "Forgetting to push a shallow copy `[...path]` into results array",
      "Forgetting to unmark `visited` or `path.pop()` after recursive call",
      "Not pruning duplicate choices in combinations with duplicates"
    ],
    timeComplexity: "O(2^N) for subsets, O(N!) for permutations",
    spaceComplexity: "O(N) recursion stack height",
    templateCode: `function backtrackingPattern(nums) {
  const results = [];

  function backtrack(startIndex, currentPath) {
    results.push([...currentPath]);

    for (let i = startIndex; i < nums.length; i++) {
      currentPath.push(nums[i]);
      backtrack(i + 1, currentPath);
      currentPath.pop();
    }
  }

  backtrack(0, []);
  return results;
}`,
    relatedProblemIds: ["subsets", "subsets-ii", "permutations", "letter-combinations-phone", "palindrome-partitioning", "combination-sum", "n-queens", "word-search"]
  },
  {
    id: "backtracking-pruning",
    title: "Backtracking Duplicate Pruning",
    category: "backtracking-dp",
    icon: "✂️",
    difficulty: "Medium",
    description: "Prune redundant branch choices when input array contains duplicate values (e.g. Subsets II, Combination Sum II).",
    whenToUse: [
      "Input contains duplicate numbers and solution set must NOT contain duplicate subsets/combinations",
      "Generating unique permutations of array with duplicate values"
    ],
    coreTrick: "Sort input array first. In the loop, if `i > startIndex && nums[i] === nums[i - 1]`, skip with `continue`.",
    visualDiagram: `  Sorted Array: [1, 2, 2']
  
  Branch 1: Pick 2  ──► [1, 2]
  Branch 2: Pick 2' ──► Skip! (2' === 2 at same tree level) ✂️ Pruned!`,
    pitfalls: [
      "Forgetting to sort the array before backtracking",
      "Pruning with `i > 0` instead of `i > startIndex`"
    ],
    timeComplexity: "O(N log N + 2^N)",
    spaceComplexity: "O(N) stack",
    templateCode: `function subsetsWithDup(nums) {
  nums.sort((a, b) => a - b);
  const res = [];

  function bt(startIndex, path) {
    res.push([...path]);

    for (let i = startIndex; i < nums.length; i++) {
      if (i > startIndex && nums[i] === nums[i - 1]) continue;

      path.push(nums[i]);
      bt(i + 1, path);
      path.pop();
    }
  }

  bt(0, []);
  return res;
}`,
    relatedProblemIds: ["subsets-ii"]
  },
  {
    id: "dynamic-programming",
    title: "Dynamic Programming (DP)",
    category: "backtracking-dp",
    icon: "🧮",
    difficulty: "Medium to Hard",
    description: "Break complex optimization/counting problems into overlapping subproblems, storing subproblem results to eliminate redundant computation.",
    whenToUse: [
      "Maximum, minimum, longest, shortest, or total number of ways to achieve target",
      "Choices at step i depend on previous states `i - 1`, `i - 2`, etc.",
      "0/1 Knapsack, Unbounded Knapsack, Grid Paths, LIS, String Alignment"
    ],
    coreTrick: "Identify State (`dp[i]` or `dp[i][j]`), define Transition Equation (e.g. `dp[i] = Math.max(dp[i-1], dp[i-2] + val)`), and set Base Cases.",
    visualDiagram: `  dp[i] = Math.max( dp[i-1] ,  dp[i-2] + nums[i] )
  
  ┌────────┬────────┬────────┬────────┬────────┐
  │ dp[0]  │ dp[1]  │ dp[2]  │  ...   │ dp[N]  │
  └────────┴────────┴────────┴────────┴────────┘
    Base1    Base2    ▲ (reuses subproblems dp[0], dp[1])`,
    pitfalls: [
      "Incorrect iteration order (e.g. 0/1 knapsack 1D array MUST iterate target backwards to avoid reusing item)",
      "Uninitialized DP array values",
      "Out of bounds error on `dp[0]` / negative indices"
    ],
    timeComplexity: "O(N) to O(N × Target) polynomial time",
    spaceComplexity: "O(N) or O(1) with rolling variable optimization",
    templateCode: `function dynamicProgrammingPattern(nums) {
  const n = nums.length;
  if (n === 0) return 0;
  if (n === 1) return nums[0];

  const dp = new Array(n).fill(0);
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);

  for (let i = 2; i < n; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
  }

  return dp[n - 1];
}`,
    relatedProblemIds: ["maximum-subarray", "house-robber", "house-robber-ii", "unique-paths", "climbing-stairs", "coin-change", "longest-increasing-subsequence", "word-break", "decode-ways", "longest-common-subsequence", "partition-equal-subset-sum", "edit-distance", "coin-change-ii"]
  },
  {
    id: "knapsack-01",
    title: "0/1 Knapsack Pattern",
    category: "backtracking-dp",
    icon: "🎒",
    difficulty: "Medium to Hard",
    description: "Choose a subset of items each with weight and value to maximize total value without exceeding capacity W (each item used at most ONCE).",
    whenToUse: [
      "Partitioning an array into two equal sum subsets",
      "Selecting items with weight/cost constraints where each item can be picked at most 1 time",
      "Target sum formed by adding + or - signs"
    ],
    coreTrick: "When using 1D DP array, iterate capacity `w` BACKWARDS from `W` down to `weight[i]`. Reversing loop direction prevents reusing the same item multiple times.",
    visualDiagram: `  Item i (Weight = w, Value = v):
  dp[cap] = Math.max( dp[cap] ,  dp[cap - w] + v )
  
  Iterate capacity cap from W down to w: ◄─── (Backwards!)
  [ W ──► W-1 ──► ... ──► w ]`,
    pitfalls: [
      "Iterating capacity forwards in 1D array converts problem to Unbounded Knapsack (reusing items!)",
      "Off-by-one capacity bounds"
    ],
    timeComplexity: "O(N × W) pseudo-polynomial",
    spaceComplexity: "O(W) using 1D rolling array",
    templateCode: `function knapsack01(weights, values, W) {
  const dp = new Array(W + 1).fill(0);

  for (let i = 0; i < weights.length; i++) {
    const w = weights[i], v = values[i];
    for (let cap = W; cap >= w; cap--) {
      dp[cap] = Math.max(dp[cap], dp[cap - w] + v);
    }
  }

  return dp[W];
}`,
    relatedProblemIds: ["partition-equal-subset-sum"]
  },
  {
    id: "unbounded-knapsack",
    title: "Unbounded Knapsack Pattern",
    category: "backtracking-dp",
    icon: "🪙",
    difficulty: "Medium",
    description: "Select items to reach a target sum or max value where items can be reused UNLIMITED times.",
    whenToUse: [
      "Coin Change (minimum coins or number of combinations)",
      "Rod Cutting, Integer Break",
      "Items have infinite supply"
    ],
    coreTrick: "Iterate capacity `w` FORWARDS from `weight[i]` up to `W`. Forward loop allows current item to be selected multiple times.",
    visualDiagram: `  Item i (Weight = w, Value = v):
  dp[cap] += dp[cap - w]
  
  Iterate capacity cap FORWARDS from w up to W: ───► (Unlimited reuse!)
  [ w ──► w+1 ──► ... ──► W ]`,
    pitfalls: [
      "Outer loop MUST be items/coins and inner loop MUST be target if order does NOT matter (combinations)",
      "Outer loop target and inner loop items if order DOES matter (permutations)"
    ],
    timeComplexity: "O(N × W) pseudo-polynomial",
    spaceComplexity: "O(W) space",
    templateCode: `function unboundedKnapsack(coins, amount) {
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 1;

  for (const c of coins) {
    for (let cap = c; cap <= amount; cap++) {
      dp[cap] += dp[cap - c];
    }
  }

  return dp[amount];
}`,
    relatedProblemIds: ["coin-change", "coin-change-ii"]
  },
  {
    id: "lcs-string-dp",
    title: "Longest Common Subsequence (LCS)",
    category: "backtracking-dp",
    icon: "🔤",
    difficulty: "Medium to Hard",
    description: "Compare two strings `s1` and `s2` to find matching character sequences or transform distance.",
    whenToUse: [
      "Longest Common Subsequence / Substring",
      "Edit Distance / Levenshtein Distance (Insert, Delete, Replace)",
      "Interleaving Strings, Shortest Common Supersequence"
    ],
    coreTrick: "2D Grid `dp[i][j]`. If `s1[i-1] === s2[j-1]`: `dp[i][j] = 1 + dp[i-1][j-1]`. Else: `max(dp[i-1][j], dp[i][j-1])`.",
    visualDiagram: `           s2[j-1]
           'a'    'c'    'e'
  s1[i-1] ┌──────┬──────┬──────┐
   'a'    │  1   │  1   │  1   │ (Match: diagonal + 1)
          ├──────┼──────┼──────┤
   'b'    │  1   │  1   │  1   │ (Mismatch: max top/left)
          ├──────┼──────┼──────┤
   'c'    │  1   │  2   │  2   │
          └──────┴──────┴──────┘`,
    pitfalls: [
      "1-indexed DP table size `(m+1) × (n+1)` vs 0-indexed string character access `s[i-1]`",
      "Space optimization from 2D `O(M×N)` to 2 rolling rows `O(N)`"
    ],
    timeComplexity: "O(M × N) time",
    spaceComplexity: "O(M × N) grid or O(N) rolling rows",
    templateCode: `function longestCommonSubsequence(text1, text2) {
  const m = text1.length, n = text2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[m][n];
}`,
    relatedProblemIds: ["longest-common-subsequence", "edit-distance"]
  },
  {
    id: "monotonic-stack",
    title: "Monotonic Stack / Queue",
    category: "data-structures",
    icon: "📚",
    difficulty: "Medium to Hard",
    description: "Maintain elements in stack/queue in strictly increasing or decreasing order to quickly find the Next Greater or Next Smaller Element.",
    whenToUse: [
      "Next Greater Element, Next Smaller Element",
      "Daily Temperatures, Trapping Rain Water, Largest Rectangle in Histogram",
      "Sliding Window Maximum (Monotonic Queue)"
    ],
    coreTrick: "Before pushing `curr` to stack, pop all elements from stack that violate monotonicity: `while (stack.length && stack[top] < curr) stack.pop()`.",
    visualDiagram: `  Array: [ 73 , 74 , 75 , 71 , 69 , 72 ]
  
  Processing 74: Pop 73 (74 > 73) -> Next greater for 73 is 74!
  Monotonic Decreasing Stack: [ 75 , 72 ]`,
    pitfalls: [
      "Storing values instead of indices in stack (store indices so you can calculate distance `i - stack[top]`!)",
      "Confusing monotonic INCREASING vs DECREASING condition"
    ],
    timeComplexity: "O(N) total (each element pushed and popped at most once)",
    spaceComplexity: "O(N) stack size",
    templateCode: `function nextGreaterElement(nums) {
  const res = new Array(nums.length).fill(-1);
  const stack = [];

  for (let i = 0; i < nums.length; i++) {
    while (stack.length > 0 && nums[i] > nums[stack[stack.length - 1]]) {
      const idx = stack.pop();
      res[idx] = nums[i];
    }
    stack.push(i);
  }

  return res;
}`,
    relatedProblemIds: ["daily-temperatures", "car-fleet", "largest-rectangle-histogram", "trapping-rain-water", "sliding-window-maximum"]
  },
  {
    id: "top-k-heap",
    title: "Top K Elements (Heap / Priority Queue)",
    category: "data-structures",
    icon: "⛰️",
    difficulty: "Medium",
    description: "Keep track of the top K largest or smallest elements from an unsorted collection or stream.",
    whenToUse: [
      "Finding K largest or K smallest elements",
      "K most frequent words/elements",
      "Streaming data median / top elements"
    ],
    coreTrick: "To find **K largest** elements, maintain a **Min-Heap** of size K. If heap size exceeds K, pop min. Root will be K-th largest.",
    visualDiagram: `  Stream: [ 5 ,  2 ,  8 ,  10 ,  1 ]  (K = 3)
  
  Min-Heap of Size 3:
             ( 5 )   ◄─ Root = K-th Largest (5)
            /     \\
          ( 8 )   (10)
  
  New element 12 > 5 ──► Pop 5, Push 12 ──► Heap: [8, 10, 12]`,
    pitfalls: [
      "Using Max-Heap for K largest (forces storing all N elements O(N log N) instead of O(N log K))",
      "Custom comparator errors in Min-Heap insertion"
    ],
    timeComplexity: "O(N log K) time",
    spaceComplexity: "O(K) memory for heap",
    templateCode: `function findKLargest(nums, k) {
  const minHeap = [];

  for (const num of nums) {
    let l = 0, r = minHeap.length;
    while (l < r) {
      const mid = (l + r) >> 1;
      if (minHeap[mid] < num) l = mid + 1; else r = mid;
    }
    minHeap.splice(l, 0, num);

    if (minHeap.length > k) minHeap.shift();
  }

  return minHeap[0];
}`,
    relatedProblemIds: ["top-k-frequent-elements", "find-median-from-data-stream", "kth-largest-element-in-an-array"]
  },
  {
    id: "quickselect-pattern",
    title: "QuickSelect Pattern (K-th Element)",
    category: "data-structures",
    icon: "🎯",
    difficulty: "Medium",
    description: "Find the K-th smallest/largest element in an unsorted array in average O(N) linear time using QuickSort partition logic.",
    whenToUse: [
      "Finding K-th largest or K-th smallest element without fully sorting",
      "Constraints demand O(N) average time and O(1) space"
    ],
    coreTrick: "Partition array around pivot `p`. If pivot index equals target `k`, return `nums[p]`. Else recurse ONLY into the partition containing `k`.",
    visualDiagram: `  Array: [ 3 , 2 , 1 , 5 , 6 , 4 ]  (Target index: k=4)
  Pivot = 4 ──► Partition: [3, 2, 1] [4] [5, 6]
                             idx < k   idx=3   idx > k ──► Recurse right half!`,
    pitfalls: [
      "Worst-case O(N^2) time on already sorted arrays if pivot selection is poor (use random pivot or median of three)",
      "Confusing K-th largest (index `N - k`) with K-th smallest"
    ],
    timeComplexity: "O(N) average time (O(N²) worst case)",
    spaceComplexity: "O(1) in-place auxiliary space",
    templateCode: `function findKthLargestQuickSelect(nums, k) {
  const target = nums.length - k;

  function quickSelect(l, r) {
    const pivot = nums[r];
    let p = l;
    for (let i = l; i < r; i++) {
      if (nums[i] <= pivot) {
        [nums[p], nums[i]] = [nums[i], nums[p]];
        p++;
      }
    }
    [nums[p], nums[r]] = [nums[r], nums[p]];

    if (p === target) return nums[p];
    return p < target ? quickSelect(p + 1, r) : quickSelect(l, p - 1);
  }

  return quickSelect(0, nums.length - 1);
}`,
    relatedProblemIds: ["kth-largest-element-in-an-array"]
  },
  {
    id: "k-way-merge",
    title: "K-way Merge Pattern",
    category: "data-structures",
    icon: "🔀",
    difficulty: "Hard",
    description: "Merge K sorted arrays or K sorted linked lists into a single sorted list using a Min-Heap of size K.",
    whenToUse: [
      "Merge K Sorted Lists / Arrays",
      "Find K pairs with smallest sums",
      "Find smallest range covering elements from K lists"
    ],
    coreTrick: "Insert the first element of all K lists into a Min-Heap. Pop smallest, add to output, then push next element from that SAME list into Min-Heap.",
    visualDiagram: `  List 1: [1, 4, 5]
  List 2: [1, 3, 4]   ──► Min-Heap (size 3): [ (1,L1), (1,L2), (2,L3) ]
  List 3: [2, 6]
  
  Pop min (1, L1) ──► Output: [1] ──► Push next from L1 (4) to Heap!`,
    pitfalls: [
      "Tracking which list each heap entry came from (store tuples `[val, listIndex, elementIndex]` in heap)",
      "Empty list input bounds"
    ],
    timeComplexity: "O(N log K) where N is total elements and K is number of lists",
    spaceComplexity: "O(K) heap memory",
    templateCode: `function mergeKLists(lists) {
  const minHeap = [];

  for (let i = 0; i < lists.length; i++) {
    if (lists[i]) minHeap.push({ val: lists[i].val, node: lists[i] });
  }

  const sortHeap = () => minHeap.sort((a, b) => a.val - b.val);
  sortHeap();

  const dummy = { next: null };
  let curr = dummy;

  while (minHeap.length > 0) {
    const smallest = minHeap.shift();
    curr.next = smallest.node;
    curr = curr.next;

    if (smallest.node.next) {
      minHeap.push({ val: smallest.node.next.val, node: smallest.node.next });
      sortHeap();
    }
  }

  return dummy.next;
}`,
    relatedProblemIds: ["kth-largest-element-in-an-array"]
  },
  {
    id: "trie-prefix",
    title: "Trie (Prefix Tree)",
    category: "data-structures",
    icon: "🌲",
    difficulty: "Medium",
    description: "Tree structure storing characters at each node to enable fast string insertion, prefix lookup, and auto-complete.",
    whenToUse: [
      "Prefix matching and auto-complete",
      "Dictionary word validation and spell checking",
      "Word Search II (Grid matching multiple words)"
    ],
    coreTrick: "Each node has `children = {}` and boolean flag `isWord = false`. Walking down nodes performs prefix search in $O(L)$ time.",
    visualDiagram: `  Root
  ├── 'c' ──► 'a' ──► 't' (isWord: true)
  │                    └──► 's' (isWord: true)
  └── 'd' ──► 'o' ──► 'g' (isWord: true)
  
  Lookup "cat": Root ──► c ──► a ──► t (isWord: true) ✓`,
    pitfalls: [
      "Forgetting to set `isWord = true` at the end of word insertion",
      "Not handling non-lowercase characters"
    ],
    timeComplexity: "O(L) per search/insert where L is word length",
    spaceComplexity: "O(N × L) total characters in dictionary",
    templateCode: `class TrieNode {
  constructor() {
    this.children = {};
    this.isWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let curr = this.root;
    for (const ch of word) {
      if (!curr.children[ch]) curr.children[ch] = new TrieNode();
      curr = curr.children[ch];
    }
    curr.isWord = true;
  }

  startsWith(prefix) {
    let curr = this.root;
    for (const ch of prefix) {
      if (!curr.children[ch]) return false;
      curr = curr.children[ch];
    }
    return true;
  }
}`,
    relatedProblemIds: ["implement-trie", "add-and-search-word", "word-search-ii", "replace-words"]
  },
  {
    id: "kmp-algorithm",
    title: "KMP String Search (LPS Prefix Function)",
    category: "strings-bits",
    icon: "🔤",
    difficulty: "Hard",
    description: "Search for pattern P in text T in O(N + M) time using Longest Proper Prefix which is also Suffix (LPS) array to avoid redundant comparisons.",
    whenToUse: [
      "Subsequence / Substring exact matching in linear O(N + M) time",
      "Repeated Substring Pattern detection"
    ],
    coreTrick: "Precompute `lps[]` array for pattern. When a character mismatch occurs at `j`, fallback to `j = lps[j - 1]` instead of resetting pattern index `j` to 0.",
    visualDiagram: `  Text T:     [ a , b , c , a , b , a , b , c ]
  Pattern P:  [ a , b , a , b , c ]
  LPS Array:  [ 0 , 0 , 1 , 2 , 0 ]
  
  Mismatch @ P[2] 'a' != T[2] 'c' ──► Fallback j = lps[1] = 0 without re-scanning T!`,
    pitfalls: [
      "Off-by-one errors in `lps[j-1]` lookup",
      "Forgetting to check `j === pattern.length` for full match match"
    ],
    timeComplexity: "O(N + M) linear time",
    spaceComplexity: "O(M) for LPS array",
    templateCode: `function kmpSearch(text, pattern) {
  if (!pattern) return 0;
  const lps = new Array(pattern.length).fill(0);
  let j = 0;

  // Build LPS array
  for (let i = 1; i < pattern.length; i++) {
    while (j > 0 && pattern[i] !== pattern[j]) j = lps[j - 1];
    if (pattern[i] === pattern[j]) j++;
    lps[i] = j;
  }

  j = 0;
  for (let i = 0; i < text.length; i++) {
    while (j > 0 && text[i] !== pattern[j]) j = lps[j - 1];
    if (text[i] === pattern[j]) j++;
    if (j === pattern.length) return i - pattern.length + 1; // Found match!
  }
  return -1;
}`,
    relatedProblemIds: ["find-all-anagrams-in-a-string"]
  },
  {
    id: "character-frequency-map",
    title: "Character Frequency Map (Anagrams & Isomorphism)",
    category: "strings-bits",
    icon: "🔠",
    difficulty: "Easy to Medium",
    description: "Use a fixed-size frequency array of 26 integers or Hash Map to validate anagrams, isomorphic strings, and character distributions.",
    whenToUse: [
      "Valid Anagram / Group Anagrams",
      "Isomorphic Strings / Word Pattern mapping",
      "First Unique Character in a String"
    ],
    coreTrick: "Fixed frequency array `freq = new Array(26).fill(0)`. Index as `char.charCodeAt(0) - 'a'.charCodeAt(0)`. Compare counts in O(1) space.",
    visualDiagram: `  s = "anagram" , t = "nagaram"
  
  Freq Map (s):  a:3, n:1, g:1, r:1, m:1
  Freq Map (t):  a:3, n:1, g:1, r:1, m:1
  Matching Frequencies ──► Valid Anagram! ✓`,
    pitfalls: [
      "Handling upper/lowercase or non-ASCII unicode characters (use Map instead of size-26 array if non-alphabet chars exist)",
      "Checking both string lengths before frequency comparison (`s.length !== t.length` return false immediately)"
    ],
    timeComplexity: "O(N) linear scan",
    spaceComplexity: "O(1) extra space (fixed 26-char array)",
    templateCode: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  const count = new Array(26).fill(0);
  const base = 'a'.charCodeAt(0);

  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - base]++;
    count[t.charCodeAt(i) - base]--;
  }

  return count.every(val => val === 0);
}`,
    relatedProblemIds: ["valid-palindrome"]
  },
  {
    id: "rabin-karp-algorithm",
    title: "Rabin-Karp Rolling Hash Algorithm",
    category: "strings-bits",
    icon: "🔑",
    difficulty: "Hard",
    description: "Use polynomial rolling hash to search for pattern P of length M in text T of length N in average O(N + M) time.",
    whenToUse: [
      "Finding occurrences of multiple patterns in text simultaneously",
      "Longest Duplicate Substring / Repeated DNA Sequences",
      "Fast string matching without storing large arrays"
    ],
    coreTrick: "Update hash in O(1) time when sliding window: `hash = (hash - charOut * base^(M-1)) * base + charIn (mod PRIME)`.",
    visualDiagram: `  Window 0: "abc" ──► Hash("abc") = (97*31² + 98*31 + 99) % PRIME
  Slide Window: Remove 'a', Add 'd' ──► Hash("bcd") recalculated in O(1)!`,
    pitfalls: [
      "Hash collision handling: verify actual characters when hash values match",
      "Integer overflow during large power multiplication (use BigInt or MOD modulo operations at every arithmetic step)"
    ],
    timeComplexity: "O(N + M) average time",
    spaceComplexity: "O(1) space",
    templateCode: `function rabinKarpSearch(text, pattern) {
  const n = text.length, m = pattern.length;
  if (m > n) return -1;

  const BASE = 31, MOD = 1e9 + 7;
  let pHash = 0, tHash = 0, power = 1;

  for (let i = 0; i < m - 1; i++) power = (power * BASE) % MOD;

  for (let i = 0; i < m; i++) {
    pHash = (pHash * BASE + pattern.charCodeAt(i)) % MOD;
    tHash = (tHash * BASE + text.charCodeAt(i)) % MOD;
  }

  for (let i = 0; i <= n - m; i++) {
    if (pHash === tHash) {
      if (text.substring(i, i + m) === pattern) return i; // Confirmed!
    }
    if (i < n - m) {
      tHash = (tHash - text.charCodeAt(i) * power) % MOD;
      if (tHash < 0) tHash += MOD;
      tHash = (tHash * BASE + text.charCodeAt(i + m)) % MOD;
    }
  }
  return -1;
}`,
    relatedProblemIds: ["find-all-anagrams-in-a-string"]
  },
  {
    id: "string-compression-pattern",
    title: "String Compression (Run-Length Encoding)",
    category: "strings-bits",
    icon: "🗜️",
    difficulty: "Easy to Medium",
    description: "Compress consecutive identical characters in a string/array in-place by writing character followed by its frequency count.",
    whenToUse: [
      "String Compression (e.g. ['a','a','b','b','c','c','c'] -> ['a','2','b','2','c','3'])",
      "Run-Length Encoding / Decoding",
      "In-place array modification requiring O(1) space"
    ],
    coreTrick: "Maintain `write` pointer and `read` pointer. Count consecutive matching characters `while (read < len && chars[read] === currChar) read++`. Write char and digits of count.",
    visualDiagram: `  Input:  [ "a" , "a" , "b" , "b" , "c" , "c" , "c" ]
  Write:  [ "a" , "2" , "b" , "2" , "c" , "3" ]  ◄─ In-Place Compressed! ✓`,
    pitfalls: [
      "Counts >= 10 have multiple digits (e.g. 12 must be written as separate chars `'1'` and `'2'`)",
      "Count of 1 does NOT append the digit `'1'` in standard string compression!"
    ],
    timeComplexity: "O(N) single pass",
    spaceComplexity: "O(1) in-place space",
    templateCode: `function compress(chars) {
  let write = 0, read = 0;

  while (read < chars.length) {
    const char = chars[read];
    let count = 0;

    while (read < chars.length && chars[read] === char) {
      read++; count++;
    }

    chars[write++] = char;

    if (count > 1) {
      for (const digit of String(count)) {
        chars[write++] = digit;
      }
    }
  }

  return write; // New compressed length
}`,
    relatedProblemIds: ["string-compression"]
  },
  {
    id: "string-parsing-stack",
    title: "String Parsing Stack (Decode & Parentheses)",
    category: "strings-bits",
    icon: "🧮",
    difficulty: "Medium",
    description: "Use a Stack to parse nested string structures, parenthesized expressions, and multiplier strings like `3[a2[c]]`.",
    whenToUse: [
      "Decode String (e.g. `3[a2[c]]` -> `accaccacc`)",
      "Valid Parentheses / Nested bracket evaluation",
      "Basic Calculator / Expression evaluation"
    ],
    coreTrick: "When encountering `[`, push current multiplier `k` and current accumulated `str` to Stack. When encountering `]`, pop `str` and `k`, then append `prevStr + str.repeat(k)`.",
    visualDiagram: `  Input: "3[a2[c]]"
  Push 3, '[' ──► Stack: [3, ""]
  Read 'a' ──► str = "a"
  Push 2, '[' ──► Stack: [3, "a", 2, ""]
  Read 'c' ──► str = "c"
  Pop ']' ──► str = "a" + "c".repeat(2) = "acc"
  Pop ']' ──► str = "".repeat + "acc".repeat(3) = "accaccacc" ✓`,
    pitfalls: [
      "Multi-digit numbers (e.g. `10[a]`): build multiplier with `k = k * 10 + Number(ch)` until `[` is reached",
      "Resetting `currentStr = ''` and `currentK = 0` after pushing to stack"
    ],
    timeComplexity: "O(N × maxK) time",
    spaceComplexity: "O(N) stack size",
    templateCode: `function decodeString(s) {
  const countStack = [];
  const strStack = [];
  let currentStr = "";
  let k = 0;

  for (const ch of s) {
    if (!isNaN(ch)) {
      k = k * 10 + Number(ch);
    } else if (ch === '[') {
      countStack.push(k);
      strStack.push(currentStr);
      currentStr = "";
      k = 0;
    } else if (ch === ']') {
      const count = countStack.pop();
      const prevStr = strStack.pop();
      currentStr = prevStr + currentStr.repeat(count);
    } else {
      currentStr += ch;
    }
  }

  return currentStr;
}`,
    relatedProblemIds: ["valid-palindrome"]
  },
  {
    id: "bit-manipulation-tricks",
    title: "Bit Manipulation Tricks",
    category: "strings-bits",
    icon: "💡",
    difficulty: "Easy to Medium",
    description: "Utilize bitwise operators (`&`, `|`, `^`, `~`, `<<`, `>>`) for fast constant-time arithmetic and boolean logic.",
    whenToUse: [
      "Finding unique element when pairs cancel (`x ^ x = 0`)",
      "Counting set bits (`n & (n - 1)` clears lowest set bit)",
      "Checking if number is power of 2 (`(n & (n - 1)) === 0`)",
      "Bitmasking state combinations"
    ],
    coreTrick: "`n & (n - 1)` clears the rightmost set bit of `n`. `a ^ b` computes addition without carry.",
    visualDiagram: `  XOR Property:  A ^ A = 0  and  A ^ 0 = A
  [ 4 , 1 , 2 , 1 , 2 ]
  4 ^ (1 ^ 1) ^ (2 ^ 2)  =  4 ^ 0 ^ 0  =  4  ✓
  
  Clear LSB: n & (n - 1)
  n = 12 (1100) & 11 (1011) = 8 (1000) ◄─ Cleared lowest set bit!`,
    pitfalls: [
      "Operator precedence: bitwise operators (`&`, `|`, `^`) have LOWER precedence than `+` and `===` (ALWAYS use parentheses!)",
      "JS 32-bit signed integer shift bounds (`<< 31` flips sign)"
    ],
    timeComplexity: "O(1) constant time bitwise operations",
    spaceComplexity: "O(1) space",
    templateCode: `function singleNumber(nums) {
  return nums.reduce((acc, val) => acc ^ val, 0);
}

function countSetBits(n) {
  let count = 0;
  while (n > 0) {
    n = n & (n - 1);
    count++;
  }
  return count;
}

function isPowerOfTwo(n) {
  return n > 0 && (n & (n - 1)) === 0;
}`,
    relatedProblemIds: ["single-number", "number-of-1-bits", "counting-bits", "reverse-bits", "missing-number"]
  },
  {
    id: "greedy-algorithms",
    title: "Greedy Algorithms",
    category: "strings-bits",
    icon: "⚡",
    difficulty: "Medium",
    description: "Make the locally optimal choice at each step to reach a global optimum solution.",
    whenToUse: [
      "Jump Game, Gas Station, Task Scheduler",
      "Interval scheduling (pick earliest ending interval)",
      "Fractional Knapsack, Minimum Spanning Trees (Kruskal/Prim)"
    ],
    coreTrick: "Prove locally optimal choice leads to global optimum (or find a counterexample). Track running reach or maximum candidate at each step.",
    visualDiagram: `  Jump Game:
  [ 2 ,  3 ,  1 ,  1 ,  4 ]
    └──► Reach max(0+2, 1+3) = 4 ──► Reaches Last Index! ✓
  
  Gas Station:
  Whenever cumulative tank < 0, reset start to next station (start = i + 1).`,
    pitfalls: [
      "Assuming greedy works without verification (greedy fails on 0/1 Knapsack!)",
      "Not sorting inputs first (e.g. interval scheduling requires sorting by end time)"
    ],
    timeComplexity: "O(N) or O(N log N) with sorting",
    spaceComplexity: "O(1) auxiliary space",
    templateCode: `function canJump(nums) {
  let maxReach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false;
    maxReach = Math.max(maxReach, i + nums[i]);
  }
  return true;
}`,
    relatedProblemIds: ["jump-game", "jump-game-ii", "gas-station", "hand-of-straights", "task-scheduler"]
  }
];
