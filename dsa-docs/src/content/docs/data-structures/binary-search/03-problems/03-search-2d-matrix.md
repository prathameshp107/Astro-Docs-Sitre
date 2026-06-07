---
title: "Problem 3 — Search a 2D Matrix"
description: "LeetCode 74 — Search for a target in a row-wise sorted matrix by treating it as a flattened 1D array."
sidebar:
  order: 3
---

# Problem 3 — Search a 2D Matrix

**LeetCode 74** | Difficulty: 🟡 Medium

---

## 🎯 Problem Statement

Write an efficient algorithm that searches for a target value in an `m x n` matrix.

**Properties:**
- Each row is sorted left to right
- The first integer of each row is greater than the last integer of the previous row

```
Matrix:
[1,   3,  5,  7]
[10, 11, 16, 20]
[23, 30, 34, 60]

Target: 3
Output: true

Target: 13
Output: false
```

---

## 🧠 Approach: Flatten to 1D Binary Search

Because the matrix is **strictly sorted row-to-row**, we can treat it as a single sorted 1D array of length `m × n`.

We use **Pattern 1 (Classic Binary Search)** and map the 1D index to 2D coordinates.

```
1D Index → 2D Coordinates:
  row = Math.floor(index / n)
  col = index % n

Example (4 columns):
  index 5 → row = 5/4 = 1, col = 5%4 = 1 → matrix[1][1] = 11
```

---

## 💻 Solution

```javascript
function searchMatrix(matrix, target) {
  const m = matrix.length;
  const n = matrix[0].length;
  let lo = 0, hi = m * n - 1;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
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

---

## 🧪 Walkthrough

```
Matrix (3×4):
  [1,   3,  5,  7]
  [10, 11, 16, 20]
  [23, 30, 34, 60]

Target: 3
Total elements: 12

Step 1: lo=0, hi=11, mid=5
  row = 5/4 = 1, col = 5%4 = 1 → matrix[1][1] = 11
  11 > 3 → go left: hi=4

Step 2: lo=0, hi=4, mid=2
  row = 2/4 = 0, col = 2%4 = 2 → matrix[0][2] = 5
  5 > 3 → go left: hi=1

Step 3: lo=0, hi=1, mid=0
  row = 0/4 = 0, col = 0%4 = 0 → matrix[0][0] = 1
  1 < 3 → go right: lo=1

Step 4: lo=1, hi=1, mid=1
  row = 1/4 = 0, col = 1%4 = 1 → matrix[0][1] = 3
  3 === 3 → return true ✓
```

---

## 📊 Complexity

| Metric | Value |
|--------|-------|
| Time | **O(log(m × n))** — binary search on m×n elements |
| Space | **O(1)** — no extra memory |

---

## 🎯 Alternative Approach: Row + Column Search

```javascript
function searchMatrix2(matrix, target) {
  let row = 0, col = matrix[0].length - 1;

  while (row < matrix.length && col >= 0) {
    if (matrix[row][col] === target) return true;
    if (matrix[row][col] < target) row++;      // Go to next row
    else col--;                                  // Go to previous column
  }

  return false;
}
```

**Time:** O(m + n) — not as fast as binary search O(log(mn)) but simpler.

---

## 🔑 Key Takeaways

- **Treat the 2D matrix as a flattened 1D sorted array**
- **Coordinate mapping:** `row = mid / n`, `col = mid % n`
- Only works because the matrix is **strictly sorted across rows**
- For "sorted row-wise but not column-wise" matrices, use the alternative O(m + n) approach

---

## 🔗 Related

- [Pattern 1 — Classic Search](/DSA-Notes-Problems/data-structures/binary-search/02-patterns/01-classic-search)
- [Back to Problems Index](/DSA-Notes-Problems/data-structures/binary-search/03-problems)
