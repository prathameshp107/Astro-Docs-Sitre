---
title: "Problem 2 — Find Minimum in Rotated Array"
description: "LeetCode 153 — Find the minimum element in a rotated sorted array using binary search."
sidebar:
  order: 2
practice:
  visualizer: /visualizer/searching
---

# Problem 2 — Find Minimum in Rotated Sorted Array

**LeetCode 153** | Difficulty: 🟡 Medium (with distinct values)
**LeetCode 154** | Difficulty: 🔴 Hard (with duplicates)

---

## 🎯 Problem Statement

A sorted array is rotated at an unknown pivot. Find the **minimum element**.

```
Input:  nums = [3, 4, 5, 1, 2]
Output: 1

Input:  nums = [4, 5, 6, 7, 0, 1, 2]
Output: 0

Input:  nums = [11, 13, 15, 17]
Output: 11  (not rotated — first element is minimum)
```

---

## 🧠 Approach

Compare `nums[mid]` with `nums[hi]`:

- If `nums[mid] > nums[hi]` → minimum is in the **right half** (past mid)
- If `nums[mid] <= nums[hi]` → minimum is in the **left half** (including mid)

This works because:
1. The minimum is always at the rotation pivot
2. If `nums[mid] > nums[hi]`, the rotation happened after mid → minimum is to the right
3. If `nums[mid] <= nums[hi]`, the rotation happened before mid → minimum is to the left

---

## 💻 Solution

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

console.log(findMin([3, 4, 5, 1, 2]));       // 1
console.log(findMin([4, 5, 6, 7, 0, 1, 2])); // 0
console.log(findMin([11, 13, 15, 17]));      // 11
```

**Why `lo < hi` instead of `lo <= hi`?** We want to converge `lo` and `hi` to the same index (the minimum). When `lo === hi`, we've found it.

---

## 🧪 Walkthrough

```
nums = [3, 4, 5, 1, 2]

Step 1: lo=0, hi=4, mid=2 → nums[2]=5
  5 > nums[4]=2 → min in RIGHT half → lo=3

Step 2: lo=3, hi=4, mid=3 → nums[3]=1
  1 <= nums[4]=2 → min in LEFT half or at mid → hi=3

Step 3: lo=3, hi=3 → loop exits

Return: nums[3]=1 ✓
```

---

## 🧪 Solution With Duplicates (LeetCode 154)

```javascript
function findMinDuplicates(nums) {
  let lo = 0, hi = nums.length - 1;

  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);

    if (nums[mid] > nums[hi]) {
      lo = mid + 1;
    } else if (nums[mid] < nums[hi]) {
      hi = mid;
    } else {
      hi--; // nums[mid] === nums[hi] — shrink safely
    }
  }

  return nums[lo];
}

console.log(findMinDuplicates([2, 2, 2, 0, 1])); // 0
console.log(findMinDuplicates([1, 3, 3]));        // 1
```

When `nums[mid] === nums[hi]`, we can't determine which half has the minimum. Safest: shrink `hi` by 1 (the minimum is still guaranteed to be in range).

---

## 📊 Complexity

| Version | Time | Space |
|---------|------|-------|
| No duplicates | O(log n) | O(1) |
| With duplicates | O(log n) worst, O(n) when all equal | O(1) |

---

## 🔑 Key Takeaways

- **Compare with `hi`, not `lo`** — this is the key insight
- **`nums[mid] > nums[hi]`** → min is to the right
- **`lo < hi`** loop — converge to single answer
- **Duplicates** require `hi--` when values are equal
- This problem is simpler than Problem 1 (search) — only finding min, no target comparison

---

## 🔗 Related

- [Problem 1 — Search Rotated Sorted](/DSA-Notes-Problems/data-structures/binary-search/03-problems/01-search-rotated-sorted)
- [Pattern 4 — Rotated Array](/DSA-Notes-Problems/data-structures/binary-search/02-patterns/04-rotated-array)
- [Back to Problems Index](/DSA-Notes-Problems/data-structures/binary-search/03-problems)
