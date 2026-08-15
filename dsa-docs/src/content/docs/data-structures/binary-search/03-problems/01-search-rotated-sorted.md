---
title: "Problem 1 — Search in Rotated Sorted Array"
description: "LeetCode 33 — Search for a target in a rotated sorted array using binary search with O(log n) time."
sidebar:
  order: 1
practice:
  visualizer: /visualizer/searching
---

# Problem 1 — Search in Rotated Sorted Array

**LeetCode 33** | Difficulty: 🟡 Medium

---

## 🎯 Problem Statement

There is an integer array `nums` sorted in ascending order (with distinct values).

Prior to being passed to your function, `nums` is **rotated** at an unknown pivot index. Find the index of `target` or return `-1`.

```
Input:  nums = [4, 5, 6, 7, 0, 1, 2], target = 0
Output: 4

Input:  nums = [4, 5, 6, 7, 0, 1, 2], target = 3
Output: -1
```

---

## 🧠 Pattern: Rotated Array Search (Pattern 4)

**Key insight:** At any mid, **one half is always sorted**. Use the sorted half to determine where the target might be.

---

## 💻 Solution

```javascript
function search(nums, target) {
  let lo = 0, hi = nums.length - 1;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);

    if (nums[mid] === target) return mid;

    // Determine which half is sorted
    if (nums[lo] <= nums[mid]) {
      // LEFT half is sorted
      if (target >= nums[lo] && target < nums[mid]) {
        hi = mid - 1; // target in sorted left
      } else {
        lo = mid + 1; // target in right half
      }
    } else {
      // RIGHT half is sorted
      if (target > nums[mid] && target <= nums[hi]) {
        lo = mid + 1; // target in sorted right
      } else {
        hi = mid - 1; // target in left half
      }
    }
  }

  return -1;
}
```

---

## 🧪 Walkthrough

```
nums = [4, 5, 6, 7, 0, 1, 2], target = 0

Step 1: lo=0, hi=6, mid=3 → nums[3]=7
  nums[0]=4 <= nums[3]=7 → LEFT half sorted [4,5,6,7]
  target=0 NOT in [4, 7) → go RIGHT: lo=4

Step 2: lo=4, hi=6, mid=5 → nums[5]=1
  nums[4]=0 <= nums[5]=1 → LEFT half sorted [0,1]
  target=0 IS in [0, 1) → go LEFT: hi=4

Step 3: lo=4, hi=4, mid=4 → nums[4]=0 === target → return 4 ✓
```

---

## 📊 Complexity

| Metric | Value |
|--------|-------|
| Time | **O(log n)** — standard binary search |
| Space | **O(1)** — no extra memory |

---

## 🎯 Variations

### Variation: With Duplicates (LeetCode 81)

```javascript
function searchDuplicates(nums, target) {
  let lo = 0, hi = nums.length - 1;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);

    if (nums[mid] === target) return true;

    // When lo, mid, hi are all equal, can't determine
    if (nums[lo] === nums[mid] && nums[mid] === nums[hi]) {
      lo++;
      hi--;
      continue;
    }

    if (nums[lo] <= nums[mid]) {
      if (target >= nums[lo] && target < nums[mid]) hi = mid - 1;
      else lo = mid + 1;
    } else {
      if (target > nums[mid] && target <= nums[hi]) lo = mid + 1;
      else hi = mid - 1;
    }
  }

  return false;
}
```

---

## 🔑 Key Takeaways

- **Check `nums[lo] <= nums[mid]`** to identify sorted half
- **Use the sorted half's range** to decide direction
- **No duplicates** in the classic version (handle separately)
- This problem tests your understanding of **binary search invariants**

---

## 🔗 Related

- [Problem 2 — Find Minimum in Rotated Array →](/DSA-Notes-Problems/data-structures/binary-search/03-problems/02-find-min-rotated)
- [Pattern 4 — Rotated Array](/DSA-Notes-Problems/data-structures/binary-search/02-patterns/04-rotated-array)
- [Back to Problems Index](/DSA-Notes-Problems/data-structures/binary-search/03-problems)
