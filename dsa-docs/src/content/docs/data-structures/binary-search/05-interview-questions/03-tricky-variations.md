---
title: "Tricky Variations"
description: "Hard binary search edge cases, infinite loop debugging, and real interview scenarios that test your understanding."
sidebar:
  order: 3
practice:
  visualizer: /visualizer/searching
---

# Tricky Variations

---

## Q1: Infinite Loop — How to Debug

The most common interview mistake: **getting stuck in an infinite loop**.

### Scenario 1: Using `lo = mid` Instead of `lo = mid + 1`

```javascript
// ❌ INFINITE LOOP
function badBinarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) lo = mid;  // ❌ Should be mid + 1
    else hi = mid - 1;
  }
  return -1;
}
```

**Problem:** When `lo === hi === mid` and `arr[mid] < target`, `lo = mid` sets `lo = lo` — no progress!

**Fix:** Always use `lo = mid + 1` and `hi = mid - 1` for classic search.

### Scenario 2: Wrong Loop Condition With `hi = mid`

```javascript
// ❌ INFINITE LOOP
function findFirst(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (arr[mid] === target) {
      hi = mid;  // Should be mid - 1
    } else if (arr[mid] < target) {
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  return lo;
}
```

**Problem:** `lo <= hi` with `hi = mid` doesn't converge properly. Use `lo < hi` when doing boundary search.

### Debugging Checklist

```text
Is your binary search stuck? Check:

□ Loop condition: lo <= hi or lo < hi?
□ Update lo: mid + 1 or mid? 
□ Update hi: mid - 1 or mid?
□ Does the range always shrink?
□ What happens when lo === hi?
□ Edge case: 2 elements left? 1 element?
```

---

## Q2: Floor vs Ceiling — Subtle Differences

```javascript
// Floor: Largest index where arr[index] <= target
function findFloor(arr, target) {
  let lo = 0, hi = arr.length - 1;
  let result = -1;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (arr[mid] <= target) {
      result = mid;  // mid works, try larger
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  return result;
}

// Ceiling: Smallest index where arr[index] >= target
function findCeiling(arr, target) {
  let lo = 0, hi = arr.length - 1;
  let result = -1;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (arr[mid] >= target) {
      result = mid;  // mid works, try smaller
      hi = mid - 1;
    } else {
      lo = mid + 1;
    }
  }

  return result;
}

console.log(findFloor([1, 3, 5, 6], 4));  // 1 (value 3)
console.log(findCeiling([1, 3, 5, 6], 4)); // 2 (value 5)
```

**Key difference:** Floor finds the largest value ≤ target. Ceiling finds the smallest value ≥ target. They're mirror images of each other.

---

## Q3: Kth Smallest Element in a Sorted Matrix

**LeetCode 378** | Binary search on **value range**, not indices:

```javascript
function kthSmallest(matrix, k) {
  const n = matrix.length;
  let lo = matrix[0][0];
  let hi = matrix[n - 1][n - 1];

  function countLessOrEqual(mid) {
    let count = 0;
    let row = n - 1, col = 0;

    while (row >= 0 && col < n) {
      if (matrix[row][col] <= mid) {
        count += row + 1; // All elements in this column up to row are ≤ mid
        col++;
      } else {
        row--;
      }
    }

    return count;
  }

  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    const count = countLessOrEqual(mid);

    if (count >= k) {
      hi = mid; // kth smallest is ≤ mid
    } else {
      lo = mid + 1; // kth smallest is > mid
    }
  }

  return lo; // lo === hi === kth smallest element
}

const matrix = [
  [1,  5,  9],
  [10, 11, 13],
  [12, 13, 15]
];
console.log(kthSmallest(matrix, 8)); // 13
```

**Key insight:** Binary search on the **value** (not index). The count function uses the sorted property of the matrix.

---

## Q4: Find Duplicate Number (LeetCode 287)

Find the repeated number in an array of size n+1 with values in [1, n].

```javascript
function findDuplicate(nums) {
  let lo = 1, hi = nums.length - 1;
  let result = -1;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    let count = 0;

    // Count numbers ≤ mid
    for (const num of nums) {
      if (num <= mid) count++;
    }

    if (count > mid) {
      result = mid;  // Duplicate is ≤ mid
      hi = mid - 1;
    } else {
      lo = mid + 1;
    }
  }

  return result;
}

console.log(findDuplicate([1, 3, 4, 2, 2])); // 2
console.log(findDuplicate([3, 1, 3, 4, 2])); // 3
```

**Key insight:** Use pigeonhole principle — if count of numbers ≤ mid exceeds mid, then the duplicate must be in [1, mid].

---

## Q5: Search in an Almost Sorted Array

An array where every element is at most `k` positions away from its sorted position:

```javascript
function searchAlmostSorted(arr, target, k) {
  let lo = 0, hi = arr.length - 1;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);

    // Check mid and its k neighbors
    for (let i = Math.max(0, mid - k); i <= Math.min(arr.length - 1, mid + k); i++) {
      if (arr[i] === target) return i;
    }

    // Decide direction based on mid
    if (arr[mid] < target) {
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  return -1;
}

const almostSorted = [2, 1, 3, 5, 4, 7, 6]; // k=1
console.log(searchAlmostSorted(almostSorted, 4, 1)); // 4
```

---

## Q6: Minimum in Bitonic Array

A bitonic array is strictly increasing then strictly decreasing. Find the minimum:

```javascript
function findMinBitonic(arr) {
  // The minimum is at either end of the array
  return Math.min(arr[0], arr[arr.length - 1]);
}

// Or find the peak first, then min is on ends
function findPeakBitonic(arr) {
  let lo = 0, hi = arr.length - 1;

  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (arr[mid] > arr[mid + 1]) {
      hi = mid; // Peak is at mid or left
    } else {
      lo = mid + 1; // Peak is to the right
    }
  }

  return lo; // Index of peak
}

console.log(findMinBitonic([1, 3, 5, 7, 6, 4, 2])); // 1
console.log(findPeakBitonic([1, 3, 5, 7, 6, 4, 2])); // 3
```

---

## 🔑 Key Takeaways

- **Always watch for infinite loops** — the most common binary search bug
- **Floor vs Ceiling** — know which direction to continue after a match
- **Value-based BS** — Some problems search on values, not indices (Kth Smallest, Duplicate)
- **Almost sorted + bitonic** — real interview scenarios that test understanding
- **Debug systematically** — check loop condition, update rules, and the 1-2 element case

---

## 🔗 Related

- [Back to Interview Index](/DSA-Notes-Problems/data-structures/binary-search/05-interview-questions)
- [Theory & Fundamentals](/DSA-Notes-Problems/data-structures/binary-search/05-interview-questions/01-theory-fundamentals)
