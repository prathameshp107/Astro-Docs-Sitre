---
title: "Problem 4 — Find Peak Element"
description: "LeetCode 162 — Find a peak element (greater than neighbors) using binary search in O(log n) time."
sidebar:
  order: 4
---

# Problem 4 — Find Peak Element

**LeetCode 162** | Difficulty: 🟡 Medium

---

## 🎯 Problem Statement

A **peak element** is an element that is strictly greater than its neighbors. Find **any peak index**. Assume `nums[-1] = nums[n] = -∞`.

```
Input:  nums = [1, 2, 3, 1]
Output: 2   (nums[2] = 3 is a peak)

Input:  nums = [1, 2, 1, 3, 5, 6, 4]
Output: 5   (nums[5] = 6 is a peak — index 1 also works)
```

---

## 🧠 Approach: Pattern 5 (Monotonic Function)

**Key insight:** If `nums[mid] < nums[mid + 1]`, a peak must exist to the right (we're climbing uphill). Otherwise, a peak exists at mid or to the left.

```text
nums = [1, 2, 3, 1]

mid=1 → nums[1]=2 < nums[2]=3 → climbing up → peak RIGHT
mid=2 → nums[2]=3 > nums[3]=1 → peak at mid or LEFT

Peak found at index 2 ✓
```

**Why this works:** The array boundaries are `-∞`. If we always move toward the larger neighbor, we must eventually reach a peak (you can't go uphill forever).

---

## 💻 Solution

```javascript
function findPeakElement(nums) {
  let lo = 0, hi = nums.length - 1;

  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);

    if (nums[mid] < nums[mid + 1]) {
      lo = mid + 1; // Peak is to the right (climbing up)
    } else {
      hi = mid;     // Peak is at mid or to the left
    }
  }

  return lo; // lo === hi is a peak
}

console.log(findPeakElement([1, 2, 3, 1]));          // 2
console.log(findPeakElement([1, 2, 1, 3, 5, 6, 4])); // 5
console.log(findPeakElement([1, 2, 3, 4, 5]));        // 4 (strictly increasing)
console.log(findPeakElement([5, 4, 3, 2, 1]));        // 0 (strictly decreasing)
```

---

## 🧪 Walkthrough

```
nums = [1, 2, 3, 1]

Step 1: lo=0, hi=3, mid=1
  nums[1]=2 < nums[2]=3 → climbing up → peak is RIGHT
  lo = mid + 1 = 2

Step 2: lo=2, hi=3, mid=2
  nums[2]=3 > nums[3]=1 → peak at mid or LEFT
  hi = mid = 2

Step 3: lo=2, hi=2 → loop exits, return 2 ✓
```

---

## 📊 Complexity

| Metric | Value |
|--------|-------|
| Time | **O(log n)** — binary search |
| Space | **O(1)** — no extra memory |

---

## 🎯 Variations

### Variation: Find Peak in 2D Matrix (LeetCode 1901)

```javascript
function findPeakGrid(mat) {
  let lo = 0, hi = mat[0].length - 1;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);

    // Find max element in this column
    let maxRow = 0;
    for (let r = 0; r < mat.length; r++) {
      if (mat[r][mid] > mat[maxRow][mid]) maxRow = r;
    }

    const leftIsBigger = mid > 0 && mat[maxRow][mid - 1] > mat[maxRow][mid];
    const rightIsBigger = mid < mat[0].length - 1 && mat[maxRow][mid + 1] > mat[maxRow][mid];

    if (!leftIsBigger && !rightIsBigger) {
      return [maxRow, mid]; // Found a peak
    }

    if (leftIsBigger) {
      hi = mid - 1; // Peak is to the left
    } else {
      lo = mid + 1; // Peak is to the right
    }
  }

  return [-1, -1];
}
```

---

## 🔑 Key Takeaways

- **Compare with the next element** (`nums[mid] < nums[mid + 1]`)
- **`lo < hi`** — converge to the answer
- **Any peak works** — we don't need the highest peak
- The algorithm is guaranteed to find a peak because boundaries are `-∞`
- This is a **Pattern 5 (Monotonic Function)** problem disguised as array search

---

## 🔗 Related

- [Problem 9 — First Bad Version](/DSA-Notes-Problems/data-structures/binary-search/03-problems/09-first-bad-version) (same Pattern 5)
- [Pattern 5 — Monotonic Function](/DSA-Notes-Problems/data-structures/binary-search/02-patterns/05-monotonic-function)
- [Back to Problems Index](/DSA-Notes-Problems/data-structures/binary-search/03-problems)
