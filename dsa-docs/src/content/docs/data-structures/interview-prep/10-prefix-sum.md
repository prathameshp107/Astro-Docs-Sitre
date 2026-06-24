---
title: "Prefix Sum Pattern"
description: "Precompute running totals to answer range sum queries in O(1) time."
sidebar:
  order: 10
---

# Prefix Sum

> A **prefix sum** array stores the running total of elements from index 0 to i. It turns "sum of subarray" questions into a single subtraction.

---

## When to Spot This Pattern

- "Find subarray sum equals K"
- "Range sum query"
- "Subarray with given sum"
- "Product of array except self" (prefix product)

---

## Core Idea

```
Original:  [1, 2, 3, 4, 5]
Prefix:    [1, 3, 6, 10, 15]

Sum of subarray [2..4] = prefix[4] - prefix[1] = 15 - 3 = 12 ✓
```

---

## Implementation

```javascript
function prefixSum(arr) {
  const prefix = [];
  let running = 0;
  for (const num of arr) {
    running += num;
    prefix.push(running);
  }
  return prefix;
}

// Range sum query
function rangeSum(prefix, l, r) {
  if (l === 0) return prefix[r];
  return prefix[r] - prefix[l - 1];
}
```

---

## Example Problems

### Subarray Sum Equals K

**Problem:** Count subarrays whose sum equals K.

**Idea:** Use a hash map of prefix sum → frequency. If `currentSum - K` exists in the map, those subarrays sum to K.

```javascript
function subarraySum(nums, k) {
  const map = new Map();
  map.set(0, 1); // empty subarray
  let count = 0, sum = 0;

  for (const num of nums) {
    sum += num;
    if (map.has(sum - k)) count += map.get(sum - k);
    map.set(sum, (map.get(sum) || 0) + 1);
  }

  return count;
}

// nums = [1, 2, 3, -2, 5], k = 5
// subarrays: [2,3], [5], [3,-2,5] → 3
```

**Time:** O(N) · **Space:** O(N)

### Product of Array Except Self

**Problem:** Return an array where `answer[i]` = product of all elements except `nums[i]`.

**Idea:** Prefix product × suffix product.

```javascript
function productExceptSelf(nums) {
  const n = nums.length;
  const result = new Array(n).fill(1);

  // Prefix product
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    result[i] = prefix;
    prefix *= nums[i];
  }

  // Suffix product
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= suffix;
    suffix *= nums[i];
  }

  return result;
}

// nums = [1, 2, 3, 4]
// Output: [24, 12, 8, 6]
```

**Time:** O(N) · **Space:** O(1) (excluding output)

---

## In Simple Words

- Prefix sum = running total. Range sum = `prefix[r] - prefix[l-1]`.
- Combine with a hash map for "subarray sum equals K" problems.
- For products, do prefix product × suffix product to exclude self.
