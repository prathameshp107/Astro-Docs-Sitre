---
title: "Pattern 1 — Classic Binary Search"
description: "The foundational binary search pattern — find a target in a sorted array with O(log n) time."
sidebar:
  order: 1
---

# Pattern 1 — Classic Binary Search

## 🎯 When to Use

Find a specific value in a **sorted array**. Return its index or `-1`.

```
Sorted: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
Target: 23
Output: 5
```

---

## 🧠 The Template

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

---

## 🔑 Key Decisions Explained

### Decision 1: `lo <= hi` not `lo < hi`

| Condition | Meaning | When to Use |
|-----------|---------|-------------|
| `lo <= hi` | Stop when search space is empty | ✅ Classic search — need to check every element |
| `lo < hi` | Stop when one element remains | Pattern 5 — Boundary search |

With `lo <= hi`, when `lo === hi`, there is **1 element left** to check. The loop will run one more time and either find the target or (if not found) set `lo > hi` which exits the loop.

### Decision 2: `lo = mid + 1` and `hi = mid - 1`

Since `arr[mid] !== target`, we can **safely exclude mid** from the new search space.

```
❌ lo = mid  → if lo === mid, infinite loop!
✅ lo = mid + 1  → always makes progress
```

### Decision 3: Safe Midpoint Calculation

```javascript
// ❌ Can overflow (Java/C++ with large arrays)
const mid = Math.floor((lo + hi) / 2);

// ✅ Safe — mathematically identical
const mid = lo + Math.floor((hi - lo) / 2);
```

In JavaScript (64-bit floats), overflow is unlikely, but using the safe form is a **good interview habit** that interviewers notice.

---

## 💻 Complete Walkthrough

**Search for target = 35 in:** `[5, 10, 15, 20, 25, 30, 35, 40, 45]`

![Binary Search Overview](/DSA-Notes-Problems/assets/images/binary-search/binary-search-overview.svg)

### Step-by-Step

```
Array:   [5,  10,  15,  20,  25,  30,  35,  40,  45]
Index:    0    1    2    3    4    5    6    7    8

Step 1: lo=0, hi=8, mid=(0+8)/2=4 → arr[4]=25
        25 < 35 → target is RIGHT → lo = mid+1 = 5

Step 2: lo=5, hi=8, mid=(5+8)/2=6 → arr[6]=35
        35 === 35 → FOUND at index 6! ✓
```

Only **2 comparisons** out of 9 elements. For 1M elements, at most **20 comparisons**.

---

## 📊 Complexity

| Metric | Value |
|--------|-------|
| Time | **O(log n)** — halves the search space each iteration |
| Space | **O(1)** — iterative (recursive uses O(log n) call stack) |

**Why O(log n)?**

```
n elements  → After step 1: n/2 remain
            → After step 2: n/4 remain
            → After step k: n/2^k remain

Stop when n/2^k = 1  →  k = log₂(n)
```

| n | log₂(n) | 
|---|---------|
| 10 | ~3 |
| 1,000 | ~10 |
| 1,000,000 | ~20 |
| 1,000,000,000 | ~30 |

---

## 🧪 Test It

```javascript
const arr = [5, 10, 15, 20, 25, 30, 35, 40, 45];
console.log(classicBinarySearch(arr, 35));  // 6
console.log(classicBinarySearch(arr, 99));  // -1
console.log(classicBinarySearch(arr, 5));   // 0 (first element)
console.log(classicBinarySearch(arr, 45));  // 8 (last element)
console.log(classicBinarySearch([], 1));    // -1 (empty array)
```

---

## 🐛 Off-By-One Pitfalls

See the detailed [Off-By-One Pitfalls](/DSA-Notes-Problems/assets/images/binary-search/off-by-one-pitfalls.svg) visual guide.

| Bug | Mistake | Fix |
|-----|---------|-----|
| Wrong loop condition | `while (lo < hi)` | Use `while (lo <= hi)` for classic search |
| Not moving past mid | `lo = mid` | Use `lo = mid + 1` and `hi = mid - 1` |
| Wrong return | `return mid` after loop | `return -1` when not found |
| Overflow | `(lo + hi) / 2` | Use `lo + (hi - lo) / 2` |

---

## 🔗 Related

- [Pattern 2 — First/Last Occurrence →](/DSA-Notes-Problems/data-structures/binary-search/02-patterns/02-first-last-occurrence)
- [Back to Patterns Index](/DSA-Notes-Problems/data-structures/binary-search/02-patterns)
- [Introduction to Binary Search](/DSA-Notes-Problems/data-structures/binary-search/01-introduction)
