---
title: "Pattern 4 — Rotated Sorted Array"
description: "Binary search pattern for searching in a sorted array that has been rotated at an unknown pivot point."
sidebar:
  order: 4
practice:
  visualizer: /visualizer/searching
---

# Pattern 4 — Rotated Sorted Array Search

## 🎯 When to Use

A **sorted array** has been **rotated at an unknown pivot**. Find a target or the minimum element.

```
Original:  [1, 2, 3, 4, 5, 6, 7]
Rotated:   [4, 5, 6, 7, 1, 2, 3]   ← rotation at index 3
```

---

## 🧠 The Key Insight

After rotation, **one of the two halves is always sorted**. Use this property to decide which half contains the target.

```text
[4, 5, 6, 7, 1, 2, 3]
      ↑mid=3 → arr[mid]=7

Left half  [4, 5, 6, 7]  → is sorted (arr[lo] <= arr[mid])
Right half [1, 2, 3]     → is sorted (arr[mid] <= arr[hi])
```

Since one half is sorted, check if the target is within the sorted half's range.

---

## 💻 Template — Search in Rotated Array

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
        hi = mid - 1; // target in sorted left half
      } else {
        lo = mid + 1; // target in right half
      }
    } else {
      // RIGHT half is sorted
      if (target > nums[mid] && target <= nums[hi]) {
        lo = mid + 1; // target in sorted right half
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
  nums[0]=4 <= nums[3]=7 → left half is sorted [4,5,6,7]
  target=0 NOT in [4, 7) → go right: lo=4

Step 2: lo=4, hi=6, mid=5 → nums[5]=1
  nums[4]=0 <= nums[5]=1 → left half is sorted [0,1]
  target=0 IS in [0, 1) → go left: hi=4

Step 3: lo=4, hi=4, mid=4 → nums[4]=0 === target → return 4 ✓
```

---

## 💻 Template — Find Minimum in Rotated Array

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

console.log(findMin([3, 4, 5, 1, 2]));     // 1
console.log(findMin([4, 5, 6, 7, 0, 1, 2])); // 0
console.log(findMin([11, 13, 15, 17]));    // 11 (not rotated)
```

**Key insight:** Compare `nums[mid]` to `nums[hi]` (NOT `nums[lo]`). If `mid > hi`, the minimum is definitely to the right of mid.

---

## 🧠 Identifying the Sorted Half

The core of this pattern is determining which half is sorted:

```javascript
// Left half sorted: all elements from lo to mid are in order
if (nums[lo] <= nums[mid]) {
  // Left half [lo...mid] is sorted
  // Right half [mid+1...hi] has the rotation
}

// Right half sorted: all elements from mid to hi are in order
if (nums[mid] <= nums[hi]) {
  // Right half [mid...hi] is sorted
  // Left half [lo...mid-1] has the rotation
}
```

**Note:** One of these conditions is **always true** after a single rotation.

---

## 📊 Complexity

| Operation | Time | Space |
|-----------|------|-------|
| Search target | O(log n) | O(1) |
| Find minimum | O(log n) | O(1) |

---

## 🎯 Variations

### With Duplicates (LeetCode 81)

When duplicates exist, `nums[lo] === nums[mid] === nums[hi]` is possible, and we can't determine which half is sorted. Solution: shrink both ends.

```javascript
function searchRotatedDuplicates(nums, target) {
  let lo = 0, hi = nums.length - 1;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);

    if (nums[mid] === target) return true;

    // When duplicates cause ambiguity, shrink search space
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

### Find Minimum With Duplicates (LeetCode 154)

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
      hi--; // nums[mid] === nums[hi], shrink safely
    }
  }

  return nums[lo];
}
```

---

## 🔑 Key Takeaways

- **One half is always sorted** — use `nums[lo] <= nums[mid]` to check
- **Compare target with sorted half's range** to decide which way to go
- **For find minimum:** compare `nums[mid]` with `nums[hi]`, not `nums[lo]`
- **Duplicates** require special handling — shrink both ends when ambiguous
- This is **not a different algorithm** — it's the same O(log n) binary search with a modified decision rule

---

## 🔗 Related

- [Pattern 1 — Classic Search](/DSA-Notes-Problems/data-structures/binary-search/02-patterns/01-classic-search)
- [Pattern 5 — Monotonic Function →](/DSA-Notes-Problems/data-structures/binary-search/02-patterns/05-monotonic-function)
- [Back to Patterns Index](/DSA-Notes-Problems/data-structures/binary-search/02-patterns)
- [Problems — Search Rotated Sorted Array](/DSA-Notes-Problems/data-structures/binary-search/03-problems/01-search-rotated-sorted)
