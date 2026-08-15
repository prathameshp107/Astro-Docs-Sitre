---
title: "Problem 9 — First Bad Version"
description: "LeetCode 278 — Find the first bad version using binary search with minimum API calls to isBadVersion()."
sidebar:
  order: 9
practice:
  visualizer: /visualizer/searching
---

# Problem 9 — First Bad Version

**LeetCode 278** | Difficulty: 🟢 Easy

---

## 🎯 Problem Statement

You are a product manager leading a team developing a product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all versions after a bad version are also bad.

Suppose you have `n` versions `[1, 2, ..., n]` and you want to find the **first bad version**. You have access to `isBadVersion(version)` API.

**Minimize the number of API calls.**

```
Input:  n = 5, bad = 4
isBadVersion: 1→false, 2→false, 3→false, 4→true, 5→true
Output: 4
```

---

## 🧠 Pattern: Monotonic Function (Pattern 5)

**Monotonic property:** Once a version is bad, all subsequent versions are also bad.

```text
Version:    1    2    3    4    5    6    7    8
isBad():    ✗    ✗    ✗    ✓    ✓    ✓    ✓    ✓
                           ↑ First bad version
```

Find the first index where `isBadVersion(mid)` becomes `true`.

---

## 💻 Solution

```javascript
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

    return lo;
  };
}

// Test simulation
const BAD = 4;
const isBadVersion = (v) => v >= BAD;
const firstBadVersion = solution(isBadVersion);

console.log(firstBadVersion(5));  // 4
console.log(firstBadVersion(10)); // 4
console.log(firstBadVersion(1));  // 1 (when bad = 1)
```

---

## 🧪 Walkthrough

```
n=5, BAD=4

lo=1, hi=5

Step 1: mid=3 → isBad(3)=false → lo=4
Step 2: lo=4, hi=5, mid=4 → isBad(4)=true → hi=4
Step 3: lo=4, hi=4 → loop exits (lo < hi is false)

Return: lo=4 ✓

API calls made: 2 (for mid=3 and mid=4)
Linear search would have taken 4 calls!
```

---

## 📊 Complexity

| Metric | Value |
|--------|-------|
| Time | **O(log n)** — binary search |
| Space | **O(1)** |
| API Calls | **~log₂(n)** — optimal |

---

## 🔑 Key Takeaways

- **Classic Pattern 5** — boundary search
- **`lo < hi`** — converge to single answer
- **`hi = mid`** — keep mid in range when true (it might be the answer)
- **`lo = mid + 1`** — exclude mid when false
- This is a **pure Pattern 5** — no array, no answer space, just a boolean function and index range

---

## 🔗 Related

- [Problem 4 — Find Peak Element](/DSA-Notes-Problems/data-structures/binary-search/03-problems/04-find-peak-element) (same Pattern 5)
- [Pattern 5 — Monotonic Function](/DSA-Notes-Problems/data-structures/binary-search/02-patterns/05-monotonic-function)
- [Back to Problems Index](/DSA-Notes-Problems/data-structures/binary-search/03-problems)
