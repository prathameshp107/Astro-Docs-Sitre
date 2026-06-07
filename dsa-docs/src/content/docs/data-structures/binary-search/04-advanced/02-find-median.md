---
title: "Find Median of Two Sorted Arrays"
description: "LeetCode 4 — Find the median of two sorted arrays in O(log(min(m,n))) time using binary search."
sidebar:
  order: 2
---

# Find Median of Two Sorted Arrays

**LeetCode 4** | Difficulty: 🔴 Hard

---

## 🎯 Problem Statement

Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, **return the median** of the two sorted arrays in O(log(m+n)) time.

```
Input:  nums1 = [1, 3], nums2 = [2]
Output: 2.00000  (merged = [1, 2, 3], median = 2)

Input:  nums1 = [1, 2], nums2 = [3, 4]
Output: 2.50000  (merged = [1, 2, 3, 4], median = (2+3)/2)
```

---

## 🧠 Approach

**Key insight:** Instead of merging (O(m+n)), we **binary search on the smaller array** to find the correct partition.

The median divides the combined array into two halves of equal size where **every element in the left half ≤ every element in the right half**.

```
Partition nums1 at index i, nums2 at index j:

nums1: [a0 ... a(i-1)] | [ai ... a(m-1)]
nums2: [b0 ... b(j-1)] | [bj ... b(n-1)]

Left half: a(0..i-1) + b(0..j-1)
Right half: a(i..m-1) + b(j..n-1)

Median condition:
1. i + j = (m + n + 1) / 2  (equal halves)
2. max(left) ≤ min(right)
```

---

## 💻 Solution

```javascript
function findMedianSortedArrays(nums1, nums2) {
  // Ensure nums1 is the smaller array (for O(log(min(m,n))))
  if (nums1.length > nums2.length) {
    [nums1, nums2] = [nums2, nums1];
  }

  const m = nums1.length;
  const n = nums2.length;
  let lo = 0, hi = m;

  while (lo <= hi) {
    const i = Math.floor((lo + hi) / 2);      // Partition in nums1
    const j = Math.floor((m + n + 1) / 2) - i; // Partition in nums2

    const left1 = i === 0 ? -Infinity : nums1[i - 1];
    const right1 = i === m ? Infinity : nums1[i];
    const left2 = j === 0 ? -Infinity : nums2[j - 1];
    const right2 = j === n ? Infinity : nums2[j];

    if (left1 <= right2 && left2 <= right1) {
      // Found correct partition
      if ((m + n) % 2 === 0) {
        return (Math.max(left1, left2) + Math.min(right1, right2)) / 2;
      } else {
        return Math.max(left1, left2);
      }
    } else if (left1 > right2) {
      hi = i - 1; // i is too far right, move left
    } else {
      lo = i + 1; // i is too far left, move right
    }
  }

  return 0;
}

console.log(findMedianSortedArrays([1, 3], [2]));       // 2
console.log(findMedianSortedArrays([1, 2], [3, 4]));     // 2.5
console.log(findMedianSortedArrays([0, 0], [0, 0]));     // 0
console.log(findMedianSortedArrays([], [1]));            // 1
```

---

## 🧪 Walkthrough

```
nums1 = [1, 3], nums2 = [2]
m = 2, n = 1

Step 1: lo=0, hi=2 → i=1, j = (2+1+1)/2 - 1 = 2-1 = 1
  left1 = nums1[0] = 1, right1 = nums1[1] = 3
  left2 = nums2[0] = 2, right2 = Infinity (j === n)
  
  left1 <= right2? 1 <= 2 ✓
  left2 <= right1? 2 <= 3 ✓
  
  Correct partition! Since (m+n) = 3 (odd):
  median = max(left1, left2) = max(1, 2) = 2 ✓
```

---

## 📊 Complexity

| Metric | Value |
|--------|-------|
| Time | **O(log(min(m, n)))** — binary search on the smaller array |
| Space | **O(1)** — constant extra space |

---

## 🔑 Key Takeaways

- **Always binary search the smaller array** — this gives O(log(min(m,n)))
- **Partition formula:** `j = (m + n + 1) / 2 - i` ensures correct split
- **Use `-Infinity` / `Infinity`** for edge cases when partition is at boundary
- **Odd vs even total length:** odd → max of left, even → average of max(left) and min(right)
- This is widely considered the **hardest binary search problem** — practice the walkthrough

---

## 🔗 Related

- [Back to Advanced Index](/DSA-Notes-Problems/data-structures/binary-search/04-advanced)
- [Pattern 1 — Classic Search](/DSA-Notes-Problems/data-structures/binary-search/02-patterns/01-classic-search)
