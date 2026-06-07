---
title: "Theory & Fundamentals"
description: "Core binary search theory — O(log n) complexity, prerequisites, loop invariants, edge cases, and implementation gotchas."
sidebar:
  order: 1
---

# Theory & Fundamentals

---

## Q1: Explain O(log n) Complexity of Binary Search

**Answer:** Binary search halves the search space with each comparison.

```text
After 1 comparison: n/2 elements remain
After 2 comparisons: n/4 elements remain
After k comparisons: n/2^k elements remain

We stop when 1 element remains:
  n/2^k = 1
  k = log₂(n)

So at most log₂(n) comparisons for an array of size n.
For n = 1,000,000 → at most 20 comparisons.
```

**Why it matters:** Linear search on the same data would take up to 1,000,000 comparisons. Binary search achieves this with just 20 — a **50,000x improvement**.

---

## Q2: What is the Prerequisite for Binary Search?

**Answer:** The data must be **sorted** (or have a **monotonic property**).

Sorted doesn't just mean numeric order. It means there is a **consistent ordering** that allows elimination of half the search space:

```
✅ Sorted numbers:     [1, 3, 5, 7, 9, 11]
✅ Sorted strings:     ["apple", "banana", "cherry", "date"]
✅ Monotonic function: f(x) = x² (increasing for x ≥ 0)
✅ Boolean sequence:   [false, false, false, true, true]
❌ Unsorted:           [5, 3, 8, 1, 9, 2] — linear search only
```

**Follow-up:** Can you binary search on an unsorted array?

**No** — unless you're willing to sort first (which takes O(n log n)), negating the benefit.

**Follow-up:** Can you always binary search on a sorted array?

**Yes**, provided you have **random access** (like an array). For linked lists, binary search is O(n) because accessing the middle element takes O(n) time.

---

## Q3: Iterative vs Recursive Binary Search — Which is Better?

| Aspect | Iterative | Recursive |
|--------|-----------|-----------|
| Time | O(log n) | O(log n) |
| Space | **O(1)** | O(log n) call stack |
| Stack overflow | Never | Possible for very large n |
| Readability | More verbose | Cleaner |
| Interview preference | **Preferred** | Acceptable |

```javascript
// Iterative (preferred in interviews)
function binarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}

// Recursive
function binarySearchRecursive(arr, target, lo = 0, hi = arr.length - 1) {
  if (lo > hi) return -1;
  const mid = lo + Math.floor((hi - lo) / 2);
  if (arr[mid] === target) return mid;
  if (arr[mid] < target) return binarySearchRecursive(arr, target, mid + 1, hi);
  return binarySearchRecursive(arr, target, lo, mid - 1);
}
```

**Rule:** Use iterative by default. Mention recursive if asked, note the O(log n) space cost.

---

## Q4: What Are the Loop Invariants in Binary Search?

**Answer:** The invariant that binary search maintains is:

> **If the target exists, it must be at an index in [lo, hi].**

```text
Initial: lo = 0, hi = n-1  → target, if present, is somewhere in the array
Each step: We check arr[mid] and eliminate half:
  - If arr[mid] === target → found (invariant satisfied)
  - If arr[mid] < target → target must be in (mid, hi] → lo = mid + 1
  - If arr[mid] > target → target must be in [lo, mid) → hi = mid - 1
After loop: lo > hi → search space empty → target does not exist
```

The invariant guarantees correctness **as long as the array is sorted**.

---

## Q5: Edge Cases to Watch For

### Empty Array
```javascript
binarySearch([], 5); // Returns -1
```

### Single Element
```javascript
binarySearch([5], 5); // Returns 0
binarySearch([5], 3); // Returns -1
```

### Duplicates
```javascript
// Classic BS returns ANY match, not necessarily the first
binarySearch([1, 2, 2, 2, 3], 2); // Could return 1, 2, or 3
// Use Pattern 2 for first/last
```

### Extremely Large Arrays
```javascript
// Use safe midpoint: lo + (hi - lo) / 2
// Avoid: (lo + hi) / 2  — overflow in fixed-size integer languages
```

### Negative Numbers
```javascript
binarySearch([-10, -5, 0, 3, 7], -5); // Returns 1 — works fine
```

---

## Q6: Can Binary Search Be Applied to a 2D Matrix?

**Yes, if the matrix is sorted row-wise and row-to-row:**

```javascript
function searchMatrix(matrix, target) {
  const m = matrix.length, n = matrix[0].length;
  let lo = 0, hi = m * n - 1;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    const row = Math.floor(mid / n);
    const col = mid % n;
    if (matrix[row][col] === target) return true;
    if (matrix[row][col] < target) lo = mid + 1;
    else hi = mid - 1;
  }

  return false;
}
```

**Key:** Flatten the 2D array to 1D using `row = mid / n`, `col = mid % n`.

---

## Q7: What if the Array Contains Duplicates?

Classic binary search still works but returns **any** matching index, not the first or last.

```javascript
// For first/last occurrence, modify the match behavior:
function findFirst(arr, target) {
  let lo = 0, hi = arr.length - 1, result = -1;
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (arr[mid] === target) {
      result = mid;
      hi = mid - 1; // Continue searching left
    } else if (arr[mid] < target) {
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  return result;
}
```

---

## 🔑 Key Takeaways for Interviews

1. **Start with the template** — `while (lo <= hi)`, `lo + (hi-lo)/2`, `lo=mid+1`, `hi=mid-1`
2. **Explain the invariant** — "target must be in [lo, hi]"
3. **Mention safe midpoint** — without prompting
4. **Handle edge cases** — empty, single element, duplicates, not found
5. **Discuss the tradeoffs** — iterative vs recursive, sorted requirement

---

## 🔗 Related

- [Pattern Recognition →](/DSA-Notes-Problems/data-structures/binary-search/05-interview-questions/02-pattern-recognition)
- [Back to Interview Index](/DSA-Notes-Problems/data-structures/binary-search/05-interview-questions)
