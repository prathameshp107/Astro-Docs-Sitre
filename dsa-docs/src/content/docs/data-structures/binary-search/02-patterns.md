---
title: "Binary Search Patterns"
description: "5 core binary search patterns with JavaScript templates: classic search, first/last occurrence, search on answer, rotated array, and monotonic function."
sidebar:
  order: 2
---

# 🔹 Binary Search Patterns

Master these 5 patterns and you can solve **95% of binary search problems**.

---

## 🗺️ Pattern Overview

| # | Pattern | Trigger phrase | Key technique |
|---|---------|----------------|---------------|
| 1 | Classic search | "Find target in sorted array" | `lo <= hi`, return `mid` |
| 2 | First / last occurrence | "Find leftmost / rightmost" | Don't stop at match, shrink toward boundary |
| 3 | Search on answer | "Minimum / maximum feasible value" | Binary search on answer range, not array |
| 4 | Rotated sorted array | "Sorted but rotated" | Identify which half is sorted |
| 5 | Monotonic function | "Find threshold where f(x) changes" | `lo < hi`, converge to boundary |

---

## Pattern 1 — Classic Binary Search on Sorted Array

**When to use:** Find a specific value in a sorted array. Return its index or -1.

```
Sorted: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
Target: 23
```

**Template:**

```javascript
function classicBinarySearch(arr, target) {
  let lo = 0;
  let hi = arr.length - 1;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);

    if (arr[mid] === target) return mid;       // exact match
    if (arr[mid] < target)   lo = mid + 1;     // go right
    else                     hi = mid - 1;     // go left
  }

  return -1; // not found
}
```

**Key points:**
- `lo <= hi` — include the case where lo === hi (one element left to check)
- `lo = mid + 1` and `hi = mid - 1` — always move past mid (avoids infinite loop)
- Returns exact index, not just true/false

---

## Pattern 2 — Find First / Last Occurrence (Leftmost / Rightmost)

**When to use:** Array has **duplicates** and you need the first or last index of a value.

```
Array:  [1, 2, 2, 2, 2, 3, 4, 5]
Target: 2
First occurrence → index 1
Last occurrence  → index 4
```

### Find First Occurrence (Leftmost)

```javascript
function findFirst(arr, target) {
  let lo = 0;
  let hi = arr.length - 1;
  let result = -1;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);

    if (arr[mid] === target) {
      result = mid;   // Record this match...
      hi = mid - 1;  // ...but keep searching LEFT for an earlier one
    } else if (arr[mid] < target) {
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  return result;
}
```

### Find Last Occurrence (Rightmost)

```javascript
function findLast(arr, target) {
  let lo = 0;
  let hi = arr.length - 1;
  let result = -1;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);

    if (arr[mid] === target) {
      result = mid;   // Record this match...
      lo = mid + 1;  // ...but keep searching RIGHT for a later one
    } else if (arr[mid] < target) {
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  return result;
}
```

### Count Occurrences of Target

```javascript
function countOccurrences(arr, target) {
  const first = findFirst(arr, target);
  if (first === -1) return 0;
  const last = findLast(arr, target);
  return last - first + 1;
}

// Test
const arr = [1, 2, 2, 2, 2, 3, 4, 5];
console.log(findFirst(arr, 2));         // 1
console.log(findLast(arr, 2));          // 4
console.log(countOccurrences(arr, 2));  // 4
```

**Key insight:** On a match, instead of returning immediately, **record the answer and continue shrinking** toward the boundary you want.

---

## Pattern 3 — Binary Search on Answer (Search Space Is Not the Array)

**When to use:** The problem asks for the **minimum or maximum value** that satisfies some condition. The answer itself is what you binary search over — not the array indices.

**Recognition signals:**
- "Find the minimum X such that ..."
- "Find the maximum X such that ..."
- "Is it possible to achieve X?"
- The answer has a clear lower bound and upper bound
- There is a monotonic condition: if X works, X+1 also works (or vice versa)

```
Condition is TRUE for  → → → → → → | FALSE for remaining values
                                    ↑ We want the LAST TRUE  (max feasible)

Condition is FALSE for → → → → → → | TRUE for remaining values
                                    ↑ We want the FIRST TRUE (min feasible)
```

**Template (find minimum feasible answer):**

```javascript
function binarySearchOnAnswer(lo, hi, isConditionMet) {
  // lo = minimum possible answer
  // hi = maximum possible answer

  let result = hi; // default: worst case

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);

    if (isConditionMet(mid)) {
      result = mid;   // mid works — record it, try smaller
      hi = mid - 1;
    } else {
      lo = mid + 1;   // mid doesn't work — try larger
    }
  }

  return result;
}
```

**Example — Koko Eating Bananas (simplified):**

```javascript
// Can Koko eat all bananas at rate k within h hours?
function canFinish(piles, h, k) {
  let hours = 0;
  for (const pile of piles) {
    hours += Math.ceil(pile / k);
  }
  return hours <= h;
}

function minEatingSpeed(piles, h) {
  let lo = 1;
  let hi = Math.max(...piles);
  let result = hi;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (canFinish(piles, h, mid)) {
      result = mid; // rate mid works — try lower
      hi = mid - 1;
    } else {
      lo = mid + 1; // rate mid too slow — try higher
    }
  }

  return result;
}
```

---

## Pattern 4 — Rotated Sorted Array Search

**When to use:** A sorted array has been **rotated at an unknown pivot**. Find a target.

```
Original:  [1, 2, 3, 4, 5, 6, 7]
Rotated:   [4, 5, 6, 7, 1, 2, 3]   ← rotated at index 3
```

**Key insight:** Even after rotation, **one of the two halves is always sorted**. Use that to decide which half to search.

```
[4, 5, 6, 7, 1, 2, 3]
      mid = index 3 → arr[mid] = 7

Left half  [4, 5, 6, 7] is sorted  (arr[lo] <= arr[mid])
Right half [1, 2, 3]    is sorted  (arr[mid] <= arr[hi])
```

**Template:**

```javascript
function searchRotated(nums, target) {
  let lo = 0;
  let hi = nums.length - 1;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);

    if (nums[mid] === target) return mid;

    // Determine which half is sorted
    if (nums[lo] <= nums[mid]) {
      // LEFT half is sorted
      if (target >= nums[lo] && target < nums[mid]) {
        hi = mid - 1; // target is in the sorted left half
      } else {
        lo = mid + 1; // target must be in the right half
      }
    } else {
      // RIGHT half is sorted
      if (target > nums[mid] && target <= nums[hi]) {
        lo = mid + 1; // target is in the sorted right half
      } else {
        hi = mid - 1; // target must be in the left half
      }
    }
  }

  return -1;
}

// Test
console.log(searchRotated([4, 5, 6, 7, 0, 1, 2], 0)); // 4
console.log(searchRotated([4, 5, 6, 7, 0, 1, 2], 3)); // -1
```

**Walkthrough:**

```
nums = [4, 5, 6, 7, 0, 1, 2], target = 0

Step 1: lo=0, hi=6, mid=3 → nums[3]=7
  nums[0]=4 <= nums[3]=7 → left half [4,5,6,7] is sorted
  target=0 NOT in [4, 7) → go right: lo=4

Step 2: lo=4, hi=6, mid=5 → nums[5]=1
  nums[4]=0 <= nums[5]=1 → left half [0,1] is sorted
  target=0 IS in [0, 1) → go left: hi=4

Step 3: lo=4, hi=4, mid=4 → nums[4]=0 === target → return 4 ✓
```

---

## Pattern 5 — Binary Search on Monotonic Function

**When to use:** There is a function `f(x)` that is **monotonically increasing or decreasing**, and you want to find where it crosses a threshold (or the first/last x where a condition holds).

**Examples:**
- `f(x) = x²` — find integer square root
- `f(days) = total_weight_shipped` — find minimum capacity
- `f(speed) = time_to_finish` — find minimum speed

**Template (find first x where condition(x) is true):**

```javascript
function findBoundary(lo, hi, condition) {
  // Assumes: condition is false for lo..k-1 and true for k..hi
  // Returns: first k where condition(k) is true

  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);

    if (condition(mid)) {
      hi = mid;      // mid might be the answer — don't exclude it
    } else {
      lo = mid + 1;  // mid is definitely not the answer
    }
  }

  return lo; // lo === hi is the first true position
}
```

**Notice the difference from Pattern 1:**
- Loop condition is `lo < hi` (not `lo <= hi`)
- When condition is true: `hi = mid` (keep mid in range)
- When condition is false: `lo = mid + 1`
- Returns `lo` (converged answer), not `-1`

**Example — First Bad Version:**

```javascript
// isBadVersion(version) is provided by the problem
function firstBadVersion(n, isBadVersion) {
  let lo = 1;
  let hi = n;

  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (isBadVersion(mid)) {
      hi = mid;      // mid could be the first bad version
    } else {
      lo = mid + 1;  // mid is good, bad version is later
    }
  }

  return lo; // lo === hi === first bad version
}
```

---

## 📋 Pattern Quick-Reference

| Problem signals | Pattern |
|-----------------|---------|
| "Find value in sorted array" | Pattern 1 — Classic |
| "Find index of first/last X" | Pattern 2 — First/Last occurrence |
| Array has duplicates, find range | Pattern 2 — First/Last occurrence |
| "Minimum feasible X" / "Maximum X such that..." | Pattern 3 — Search on answer |
| "Allocate minimum resources to satisfy constraint" | Pattern 3 — Search on answer |
| Array is sorted but rotated | Pattern 4 — Rotated array |
| Function is monotonically increasing/decreasing | Pattern 5 — Monotonic function |
| "First version / day / point where condition changes" | Pattern 5 — Monotonic function |

---

## Related

- [Introduction](/DSA-Notes-Problems/data-structures/binary-search/01-introduction) — Core algorithm and off-by-one bugs
- [Problems](/DSA-Notes-Problems/data-structures/binary-search/03-problems) — Apply these patterns to 10 classic problems
- [Advanced](/DSA-Notes-Problems/data-structures/binary-search/04-advanced) — Floating-point and advanced variations
