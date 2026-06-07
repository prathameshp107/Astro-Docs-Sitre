---
title: "Binary Search — Introduction"
description: "What is binary search, how it works, iterative vs recursive implementations, O(log n) complexity, and common off-by-one bugs."
sidebar:
  order: 1
---

# 🔍 Binary Search — Introduction

---

## 🎯 What is Binary Search?

Binary search is an algorithm that finds a target value in a **sorted array** by repeatedly halving the search space.

**Real-life analogy — the dictionary:**

Imagine searching for the word *"mango"* in a dictionary. You don't start from page 1. You:
1. Open the **middle** page → land on *"lion"*
2. *"mango"* comes after *"lion"* → skip the **entire left half**
3. Open the middle of the right half → land on *"pepper"*
4. *"mango"* comes before *"pepper"* → skip the right half
5. Repeat until you find *"mango"*

This is exactly binary search — **each step eliminates half the remaining candidates**.

---

## 🔑 The One Prerequisite

> **The array MUST be sorted** (or the search space must be monotonically ordered).

Binary search only works when you can confidently say *"the target is definitely not in this half"* after one comparison. That guarantee only exists in sorted data.

---

## 🖼️ ASCII Walkthrough

**Search for target = 35 in:**

```
Index:  0    1    2    3    4    5    6    7    8
Array: [5,  10,  15,  20,  25,  30,  35,  40,  45]
```

**Step 1:**
```
lo=0, hi=8 → mid = (0+8)/2 = 4 → arr[4] = 25
25 < 35  →  target is in the RIGHT half
                          
[5,  10,  15,  20, |25,  30,  35,  40,  45]
 ◄─── eliminated ──►      ↑ new lo = 5
```

**Step 2:**
```
lo=5, hi=8 → mid = (5+8)/2 = 6 → arr[6] = 35
35 === 35  →  FOUND at index 6 ✓

[5,  10,  15,  20,  25,  30, |35|,  40,  45]
                               ↑ match!
```

Only **2 comparisons** to find the element in an array of 9. For 1,000 elements it takes at most 10 comparisons. For 1,000,000 elements — at most 20.

---

## 💻 Iterative Implementation

The iterative version is preferred in interviews — no call stack overhead, no risk of stack overflow.

```javascript
function binarySearch(arr, target) {
  let lo = 0;
  let hi = arr.length - 1;

  while (lo <= hi) {
    // Safe midpoint calculation (avoids integer overflow)
    const mid = lo + Math.floor((hi - lo) / 2);

    if (arr[mid] === target) {
      return mid;          // Found — return the index
    } else if (arr[mid] < target) {
      lo = mid + 1;        // Target is in the right half
    } else {
      hi = mid - 1;        // Target is in the left half
    }
  }

  return -1;               // Not found
}

// Test
const arr = [5, 10, 15, 20, 25, 30, 35, 40, 45];
console.log(binarySearch(arr, 35));  // 6
console.log(binarySearch(arr, 99));  // -1
```

---

## 💻 Recursive Implementation

```javascript
function binarySearchRecursive(arr, target, lo = 0, hi = arr.length - 1) {
  // Base case: search space is empty
  if (lo > hi) return -1;

  const mid = lo + Math.floor((hi - lo) / 2);

  if (arr[mid] === target) {
    return mid;
  } else if (arr[mid] < target) {
    return binarySearchRecursive(arr, target, mid + 1, hi);
  } else {
    return binarySearchRecursive(arr, target, lo, mid - 1);
  }
}

const arr = [5, 10, 15, 20, 25, 30, 35, 40, 45];
console.log(binarySearchRecursive(arr, 35)); // 6
```

---

## ⚖️ Iterative vs Recursive

| Aspect | Iterative | Recursive |
|--------|-----------|-----------|
| Time complexity | O(log n) | O(log n) |
| Space complexity | **O(1)** | O(log n) call stack |
| Risk of stack overflow | None | Possible on huge inputs |
| Readability | Slightly more verbose | Cleaner, closer to math |
| Interview preference | Preferred (safer) | Fine for small inputs |

**Rule of thumb:** Use iterative unless the problem naturally maps to recursion.

---

## 📐 O(log n) Complexity Explained

Binary search halves the search space on every iteration:

```
n elements  →  After step 1: n/2 remain
            →  After step 2: n/4 remain
            →  After step 3: n/8 remain
            →  After step k: n/2ᵏ remain

We stop when n/2ᵏ = 1  →  k = log₂(n)
```

| Array size (n) | Max steps (log₂ n) |
|----------------|--------------------|
| 8 | 3 |
| 16 | 4 |
| 1,024 | 10 |
| 1,000,000 | 20 |
| 1,000,000,000 | 30 |

This is why binary search is dramatically faster than linear search for large data sets.

---

## 🐛 Common Off-By-One Bugs

Off-by-one errors are the most common source of binary search bugs. Here are the key decisions and what each means:

---

### Bug 1 — Loop condition: `lo <= hi` vs `lo < hi`

```javascript
// ✅ Correct for classic "find exact match"
while (lo <= hi) { ... }
// lo === hi is still a valid 1-element search space.
// The loop exits when lo > hi (empty space).

// ⚠️ Used for "find boundary" patterns
while (lo < hi) { ... }
// Exits when lo === hi — the answer is at lo.
// Requires careful mid calculation to avoid infinite loop.
```

**Rule:** Start with `lo <= hi`. Switch to `lo < hi` only when using the boundary-finding pattern (see Patterns file).

---

### Bug 2 — Updating `lo` and `hi`

```javascript
// ✅ Correct
lo = mid + 1;   // mid is NOT the answer, move past it
hi = mid - 1;   // mid is NOT the answer, move past it

// ❌ Wrong — causes infinite loop when lo === hi
lo = mid;       // Never moves forward if arr[mid] < target and lo === mid
hi = mid;       // Never moves backward if arr[mid] > target and hi === mid
```

---

### Bug 3 — Midpoint overflow (matters in languages with fixed-size integers)

```javascript
// ❌ Can overflow in languages like Java/C++ (int overflow)
const mid = Math.floor((lo + hi) / 2);

// ✅ Safe: equivalent but avoids overflow
const mid = lo + Math.floor((hi - lo) / 2);
```

JavaScript numbers are 64-bit floats so overflow is unlikely, but using the safe form is a good habit and interviewers notice it.

---

### Bug 4 — Wrong return value

```javascript
// ❌ Returning mid after loop — mid may be stale
if (lo > hi) return mid; // WRONG

// ✅ Return -1 when not found
return -1;
```

---

## 🧠 Mental Model Summary

```
┌─────────────────────────────────────────────────────────┐
│  BINARY SEARCH MENTAL MODEL                             │
│                                                         │
│  1. Define lo = 0, hi = n-1 (or valid search range)    │
│  2. While lo <= hi:                                     │
│     a. Compute mid = lo + (hi - lo) / 2                 │
│     b. If arr[mid] === target → return mid              │
│     c. If arr[mid] < target  → lo = mid + 1 (go right) │
│     d. If arr[mid] > target  → hi = mid - 1 (go left)  │
│  3. If loop ends → return -1 (not found)                │
└─────────────────────────────────────────────────────────┘
```

---

## Next Steps

- [Binary Search Patterns](/DSA-Notes-Problems/data-structures/binary-search/02-patterns) — 5 core patterns with templates
- [Binary Search Problems](/DSA-Notes-Problems/data-structures/binary-search/03-problems) — 10 classic problems with full solutions
