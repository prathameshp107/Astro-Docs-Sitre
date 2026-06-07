---
title: "Binary Search Problems"
description: "10 classic binary search problems with full JavaScript solutions — rotated array, Koko bananas, ship packages, 2D matrix, and more."
sidebar:
  order: 3
---

# 💻 Binary Search Problems

10 classic problems, fully solved in JavaScript. Each solution includes the approach, code, and complexity analysis.

---

## Problem 1 — Search in Rotated Sorted Array

**LeetCode 33** | Difficulty: Medium

**Problem:** A sorted array was rotated at an unknown pivot. Find the index of `target`, or return `-1`.

```
Input:  nums = [4, 5, 6, 7, 0, 1, 2], target = 0
Output: 4
```

**Approach:** At any mid, one half is always sorted. Use that to decide which half contains the target.

```javascript
function search(nums, target) {
  let lo = 0, hi = nums.length - 1;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);

    if (nums[mid] === target) return mid;

    if (nums[lo] <= nums[mid]) {
      // Left half is sorted
      if (target >= nums[lo] && target < nums[mid]) {
        hi = mid - 1;
      } else {
        lo = mid + 1;
      }
    } else {
      // Right half is sorted
      if (target > nums[mid] && target <= nums[hi]) {
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
  }

  return -1;
}

console.log(search([4, 5, 6, 7, 0, 1, 2], 0)); // 4
console.log(search([4, 5, 6, 7, 0, 1, 2], 3)); // -1
```

**Time:** O(log n) | **Space:** O(1)

---

## Problem 2 — Find Minimum in Rotated Sorted Array

**LeetCode 153** | Difficulty: Medium

**Problem:** Find the minimum element in a rotated sorted array (no duplicates).

```
Input:  nums = [3, 4, 5, 1, 2]
Output: 1
```

**Approach:** The minimum is at the rotation pivot. If `nums[mid] > nums[hi]`, the pivot (minimum) is in the right half.

```javascript
function findMin(nums) {
  let lo = 0, hi = nums.length - 1;

  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);

    if (nums[mid] > nums[hi]) {
      // Min is in the right half (past mid)
      lo = mid + 1;
    } else {
      // Min is in the left half (including mid)
      hi = mid;
    }
  }

  return nums[lo]; // lo === hi === index of minimum
}

console.log(findMin([3, 4, 5, 1, 2]));    // 1
console.log(findMin([4, 5, 6, 7, 0, 1, 2])); // 0
console.log(findMin([11, 13, 15, 17]));   // 11 (not rotated)
```

**Key insight:** Compare `nums[mid]` to `nums[hi]` (NOT `nums[lo]`). If `mid > hi`, the minimum is definitely to the right of mid.

**Time:** O(log n) | **Space:** O(1)

---

## Problem 3 — Search a 2D Matrix

**LeetCode 74** | Difficulty: Medium

**Problem:** Each row is sorted left-to-right. The first integer of each row is greater than the last of the previous row. Return true if target exists.

```
Matrix:        Target: 3
[1,  3,  5, 7]
[10, 11, 16, 20]   Output: true
[23, 30, 34, 60]
```

**Approach:** Treat the matrix as a flattened sorted array. Map 1D index → 2D coordinates.

```javascript
function searchMatrix(matrix, target) {
  const m = matrix.length;
  const n = matrix[0].length;
  let lo = 0, hi = m * n - 1;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    // Convert 1D index to 2D row, col
    const row = Math.floor(mid / n);
    const col = mid % n;
    const val = matrix[row][col];

    if (val === target) return true;
    if (val < target)   lo = mid + 1;
    else                hi = mid - 1;
  }

  return false;
}

const matrix = [
  [1,  3,  5,  7],
  [10, 11, 16, 20],
  [23, 30, 34, 60]
];
console.log(searchMatrix(matrix, 3));  // true
console.log(searchMatrix(matrix, 13)); // false
```

**Coordinate mapping:**
```
1D index 5  in a 4-column matrix:
  row = Math.floor(5 / 4) = 1
  col = 5 % 4             = 1
  → matrix[1][1] = 11
```

**Time:** O(log(m × n)) | **Space:** O(1)

---

## Problem 4 — Find Peak Element

**LeetCode 162** | Difficulty: Medium

**Problem:** A peak element is greater than its neighbors. Find any peak index. Assume `nums[-1] = nums[n] = -∞`.

```
Input:  nums = [1, 2, 3, 1]
Output: 2   (nums[2] = 3 is a peak)
```

**Approach:** If `nums[mid] < nums[mid+1]`, a peak exists to the right (the slope is going up). Otherwise it exists to the left (or at mid).

```javascript
function findPeakElement(nums) {
  let lo = 0, hi = nums.length - 1;

  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);

    if (nums[mid] < nums[mid + 1]) {
      lo = mid + 1; // Peak is to the right
    } else {
      hi = mid;     // Peak is at mid or to the left
    }
  }

  return lo; // lo === hi is a peak
}

console.log(findPeakElement([1, 2, 3, 1]));       // 2
console.log(findPeakElement([1, 2, 1, 3, 5, 6, 4])); // 5 or 1
```

**Time:** O(log n) | **Space:** O(1)

---

## Problem 5 — Koko Eating Bananas

**LeetCode 875** | Difficulty: Medium

**Problem:** Koko has `piles` of bananas and `h` hours. She eats at rate `k` bananas/hour (1 pile per hour max). Find the minimum `k` to finish all piles in `h` hours.

```
Input:  piles = [3, 6, 7, 11], h = 8
Output: 4
```

**Approach:** Binary search on the answer (rate k). Range: 1 to max(piles). Check if rate k finishes in time.

```javascript
function minEatingSpeed(piles, h) {
  // Can Koko finish all piles at rate k within h hours?
  function canFinish(k) {
    let hours = 0;
    for (const pile of piles) {
      hours += Math.ceil(pile / k);
    }
    return hours <= h;
  }

  let lo = 1;
  let hi = Math.max(...piles);
  let result = hi;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (canFinish(mid)) {
      result = mid; // rate mid works — try slower
      hi = mid - 1;
    } else {
      lo = mid + 1; // rate mid too slow — try faster
    }
  }

  return result;
}

console.log(minEatingSpeed([3, 6, 7, 11], 8)); // 4
console.log(minEatingSpeed([30, 11, 23, 4, 20], 5)); // 30
```

**Time:** O(n log(max(piles))) | **Space:** O(1)

---

## Problem 6 — Capacity to Ship Packages Within D Days

**LeetCode 1011** | Difficulty: Medium

**Problem:** Ship all packages (in order) within `days` days. Find the minimum weight capacity of the ship.

```
Input:  weights = [1,2,3,4,5,6,7,8,9,10], days = 5
Output: 15
```

**Approach:** Binary search on capacity. Lower bound = max weight (must carry heaviest), upper bound = sum (carry all in one day).

```javascript
function shipWithinDays(weights, days) {
  function canShip(capacity) {
    let daysNeeded = 1;
    let currentLoad = 0;

    for (const w of weights) {
      if (currentLoad + w > capacity) {
        daysNeeded++; // Start new day
        currentLoad = 0;
      }
      currentLoad += w;
    }

    return daysNeeded <= days;
  }

  let lo = Math.max(...weights); // Min: must carry the heaviest package
  let hi = weights.reduce((a, b) => a + b, 0); // Max: carry all at once
  let result = hi;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (canShip(mid)) {
      result = mid;
      hi = mid - 1;
    } else {
      lo = mid + 1;
    }
  }

  return result;
}

console.log(shipWithinDays([1,2,3,4,5,6,7,8,9,10], 5)); // 15
console.log(shipWithinDays([3,2,2,4,1,4], 3));           // 6
```

**Time:** O(n log(sum)) | **Space:** O(1)

---

## Problem 7 — Split Array Largest Sum

**LeetCode 410** | Difficulty: Hard

**Problem:** Split `nums` into `k` non-empty subarrays (maintaining order). Minimize the maximum subarray sum.

```
Input:  nums = [7,2,5,10,8], k = 2
Output: 18   → [7,2,5] and [10,8]
```

**Approach:** Binary search on the answer (maximum allowed sum per subarray). The same pattern as Problem 6.

```javascript
function splitArray(nums, k) {
  function canSplit(maxSum) {
    let subarrays = 1;
    let currentSum = 0;

    for (const num of nums) {
      if (currentSum + num > maxSum) {
        subarrays++;       // New subarray
        currentSum = 0;
      }
      currentSum += num;
    }

    return subarrays <= k;
  }

  let lo = Math.max(...nums);  // Min: must accommodate the largest element
  let hi = nums.reduce((a, b) => a + b, 0); // Max: entire array is one subarray
  let result = hi;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (canSplit(mid)) {
      result = mid;
      hi = mid - 1;
    } else {
      lo = mid + 1;
    }
  }

  return result;
}

console.log(splitArray([7, 2, 5, 10, 8], 2)); // 18
console.log(splitArray([1, 2, 3, 4, 5], 2));  // 9
```

**Time:** O(n log(sum)) | **Space:** O(1)

---

## Problem 8 — Find Sqrt(x) (Integer Square Root)

**LeetCode 69** | Difficulty: Easy

**Problem:** Return the integer square root of `x` (floor, truncated toward zero). Do not use `Math.sqrt()`.

```
Input:  x = 8
Output: 2   (√8 ≈ 2.828, floor = 2)
```

**Approach:** Binary search on the answer. Find the largest integer `m` such that `m * m <= x`.

```javascript
function mySqrt(x) {
  if (x < 2) return x;

  let lo = 1;
  let hi = Math.floor(x / 2); // sqrt(x) <= x/2 for x >= 4
  let result = 0;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);

    if (mid * mid === x) return mid; // Perfect square
    if (mid * mid < x) {
      result = mid;    // mid might be the answer — try larger
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  return result;
}

console.log(mySqrt(4));   // 2
console.log(mySqrt(8));   // 2
console.log(mySqrt(16));  // 4
console.log(mySqrt(17));  // 4
```

**Time:** O(log x) | **Space:** O(1)

---

## Problem 9 — First Bad Version

**LeetCode 278** | Difficulty: Easy

**Problem:** Versions 1 to n. There is a first bad version, and all versions after it are also bad. Find the first bad version with minimum API calls to `isBadVersion(version)`.

```
Input:  n = 5, bad = 4
isBadVersion: 1→false, 2→false, 3→false, 4→true, 5→true
Output: 4
```

**Approach:** Pattern 5 (monotonic boundary). Find the first version where `isBadVersion` is true.

```javascript
// isBadVersion is provided by the problem environment
function solution(isBadVersion) {
  return function firstBadVersion(n) {
    let lo = 1, hi = n;

    while (lo < hi) {
      const mid = lo + Math.floor((hi - lo) / 2);

      if (isBadVersion(mid)) {
        hi = mid;      // mid might be the first bad version
      } else {
        lo = mid + 1;  // mid is good, first bad is later
      }
    }

    return lo; // lo === hi === first bad version
  };
}

// Simulation test
function test() {
  const BAD = 4;
  const isBadVersion = (v) => v >= BAD;
  const firstBadVersion = solution(isBadVersion);
  console.log(firstBadVersion(5)); // 4
  console.log(firstBadVersion(1)); // 1 (when bad = 1)
}
test();
```

**Time:** O(log n) | **Space:** O(1)

---

## Problem 10 — Time-Based Key-Value Store

**LeetCode 981** | Difficulty: Medium

**Problem:** Design a key-value store that supports:
- `set(key, value, timestamp)` — store value at timestamp
- `get(key, timestamp)` — return the value with the largest timestamp ≤ given timestamp (or `""`)

**Approach:** Store values in a sorted list per key. Use binary search to find the largest timestamp ≤ query timestamp.

```javascript
class TimeMap {
  constructor() {
    // { key: [[timestamp, value], ...] }  sorted by timestamp
    this.store = new Map();
  }

  set(key, value, timestamp) {
    if (!this.store.has(key)) {
      this.store.set(key, []);
    }
    this.store.get(key).push([timestamp, value]);
    // Timestamps arrive in increasing order per the problem guarantee
  }

  get(key, timestamp) {
    if (!this.store.has(key)) return "";

    const entries = this.store.get(key);
    let lo = 0, hi = entries.length - 1;
    let result = "";

    while (lo <= hi) {
      const mid = lo + Math.floor((hi - lo) / 2);
      const [t, v] = entries[mid];

      if (t === timestamp) {
        return v; // Exact match
      } else if (t < timestamp) {
        result = v; // This timestamp works — look for a later one
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }

    return result; // Largest t <= timestamp, or "" if none
  }
}

// Test
const tm = new TimeMap();
tm.set("foo", "bar", 1);
tm.set("foo", "bar2", 4);

console.log(tm.get("foo", 4)); // "bar2"
console.log(tm.get("foo", 3)); // "bar"   (largest t <= 3 is t=1)
console.log(tm.get("foo", 5)); // "bar2"  (largest t <= 5 is t=4)
console.log(tm.get("foo", 0)); // ""      (no t <= 0)
```

**Time:** set: O(1) | get: O(log n) | **Space:** O(n)

---

## 📊 Problems Summary

| # | Problem | Pattern | Difficulty |
|---|---------|---------|------------|
| 1 | Search in Rotated Sorted Array | Pattern 4 — Rotated | Medium |
| 2 | Find Minimum in Rotated Array | Pattern 4 — Rotated | Medium |
| 3 | Search a 2D Matrix | Pattern 1 — Classic | Medium |
| 4 | Find Peak Element | Pattern 5 — Monotonic | Medium |
| 5 | Koko Eating Bananas | Pattern 3 — Answer space | Medium |
| 6 | Capacity to Ship Packages | Pattern 3 — Answer space | Medium |
| 7 | Split Array Largest Sum | Pattern 3 — Answer space | Hard |
| 8 | Find Sqrt(x) | Pattern 3 — Answer space | Easy |
| 9 | First Bad Version | Pattern 5 — Monotonic | Easy |
| 10 | Time-Based Key-Value Store | Pattern 1 — Classic (on timestamps) | Medium |

---

## Related

- [Patterns](/DSA-Notes-Problems/data-structures/binary-search/02-patterns) — Review the 5 templates
- [Advanced](/DSA-Notes-Problems/data-structures/binary-search/04-advanced) — More complex binary search scenarios
- [Interview Questions](/DSA-Notes-Problems/data-structures/binary-search/05-interview-questions) — Verbal explanations and tricky questions
