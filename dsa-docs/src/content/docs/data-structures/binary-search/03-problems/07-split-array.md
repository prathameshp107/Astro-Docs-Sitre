---
title: "Problem 7 — Split Array Largest Sum"
description: "LeetCode 410 — Split the array into k subarrays to minimize the largest subarray sum using binary search."
sidebar:
  order: 7
practice:
  visualizer: /visualizer/searching
---

# Problem 7 — Split Array Largest Sum

**LeetCode 410** | Difficulty: 🔴 Hard

---

## 🎯 Problem Statement

Given an integer array `nums` and an integer `k`, split `nums` into `k` **non-empty contiguous subarrays** such that the **largest sum** among them is **minimized**.

Return the minimized largest sum.

```
Input:  nums = [7, 2, 5, 10, 8], k = 2
Output: 18

Explanation: Optimal split is [7, 2, 5] and [10, 8]
Largest sum = max(14, 18) = 18
```

---

## 🧠 Pattern: Answer Space Search (Pattern 3)

This is **exactly the same problem** as Ship Packages — the check function is identical.

**Answer space:** `max(nums)` to `sum(nums)`
- **Min sum:** must accommodate the largest element
- **Max sum:** entire array as one subarray

---

## 💻 Solution

```javascript
function splitArray(nums, k) {
  function canSplit(maxSum) {
    let subarrays = 1;
    let currentSum = 0;

    for (const num of nums) {
      if (currentSum + num > maxSum) {
        subarrays++;
        currentSum = 0;
      }
      currentSum += num;
    }

    return subarrays <= k;
  }

  let lo = Math.max(...nums);
  let hi = nums.reduce((a, b) => a + b, 0);
  let result = hi;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);

    if (canSplit(mid)) {
      result = mid; // maxSum works — try smaller
      hi = mid - 1;
    } else {
      lo = mid + 1; // maxSum too small — try larger
    }
  }

  return result;
}

console.log(splitArray([7, 2, 5, 10, 8], 2)); // 18
console.log(splitArray([1, 2, 3, 4, 5], 2));  // 9
console.log(splitArray([1, 4, 4], 3));         // 4
```

---

## 🧪 Walkthrough

```
nums = [7, 2, 5, 10, 8], k = 2

lo = 10 (max), hi = 32 (sum)

Step 1: mid=21 → canSplit(21)=?
  [7+2+5=14 ≤ 21], [10+8=18 ≤ 21] → 2 subarrays ≤ 2 ✓ → result=21, hi=20

Step 2: mid=15 → canSplit(15)=?
  [7+2+5=14 ≤ 15], [10+8=18 > 15 → new] → [10 ≤ 15], [8] → 3 subarrays > 2 ✗
  lo=16

Step 3: mid=18 → canSplit(18)=?
  [7+2+5=14 ≤ 18], [10+8=18 ≤ 18] → 2 subarrays ≤ 2 ✓ → result=18, hi=17

Step 4: lo=18, hi=17 → loop exits

Return: 18 ✓
```

---

## 📊 Complexity

| Metric | Value |
|--------|-------|
| Time | **O(n × log(sum(nums)))** |
| Space | **O(1)** |

---

## 🎯 Variations

### Variation: Book Allocation Problem

Exactly the same problem — allocate `k` books to `k` students, minimizing max pages per student.

```javascript
function allocateBooks(pages, students) {
  // Identical to splitArray(pages, students)
  return splitArray(pages, students);
}

console.log(allocateBooks([12, 34, 67, 90], 2)); // 113
```

---

## 🔑 Key Takeaways

- **LeetCode 410** is the "hard" version of the same pattern as Ship Packages
- **Same check function** — greedy contiguous partition
- Don't be intimidated by the "Hard" label — the logic is identical to Medium problems
- The check function runs in O(n), binary search adds log(sum) factor

---

## 🔗 Related

- [Problem 6 — Ship Packages](/DSA-Notes-Problems/data-structures/binary-search/03-problems/06-ship-packages) (same pattern, easier)
- [Pattern 3 — Search on Answer](/DSA-Notes-Problems/data-structures/binary-search/02-patterns/03-search-on-answer)
- [Back to Problems Index](/DSA-Notes-Problems/data-structures/binary-search/03-problems)
