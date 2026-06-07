---
title: "Kadane's Algorithm"
description: "Detailed walkthrough of Kadane's Algorithm — Maximum Subarray, Maximum Product Subarray, and circular variations."
sidebar:
  order: 4
---

# Kadane's Algorithm

## 🎯 Problem Statement — Maximum Subarray

Given an integer array `nums`, find the **contiguous subarray** (containing at least one number) which has the **largest sum** and return its sum.

**Example:**
```
Input:  nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
Output: 6

Explanation: The subarray [4, -1, 2, 1] has the largest sum = 6.
```

---

## 🧠 Step 1: Identify the State

```
dp[i] = maximum subarray sum ending at index i (must include nums[i])
```

We track the **best sum ending at each position**. This is subtly different from "best sum up to position i" — by requiring the subarray to end at i, we can extend it or start fresh.

---

## 🔗 Step 2: Write the Recurrence

```
dp[i] = max(nums[i], dp[i-1] + nums[i])

At index i, we have two choices:
1. START fresh: nums[i] alone (throw away previous subarray)
2. EXTEND:      dp[i-1] + nums[i] (continue the previous best subarray)

Take whichever is larger.
```

---

## 🏁 Step 3: Define Base Cases

```
dp[0] = nums[0]     (first element is its own best subarray ending at 0)
The final answer is max(dp[0], dp[1], ..., dp[n-1])
```

---

## 💻 Approach 1: DP with Array — O(n) time, O(n) space

```javascript
function maxSubArray(nums) {
    const dp = new Array(nums.length);
    dp[0] = nums[0];
    let maxSoFar = dp[0];

    for (let i = 1; i < nums.length; i++) {
        dp[i] = Math.max(nums[i], dp[i - 1] + nums[i]);
        maxSoFar = Math.max(maxSoFar, dp[i]);
    }

    return maxSoFar;
}
```

### DP Table Walkthrough: [-2, 1, -3, 4, -1, 2, 1, -5, 4]

```text
i=0:  dp[0] = -2                   maxSoFar = -2
i=1:  dp[1] = max(1, -2+1) = 1     maxSoFar = max(-2, 1) = 1
i=2:  dp[2] = max(-3, 1-3) = -2    maxSoFar = max(1, -2) = 1
i=3:  dp[3] = max(4, -2+4) = 4     maxSoFar = max(1, 4) = 4
i=4:  dp[4] = max(-1, 4-1) = 3     maxSoFar = max(4, 3) = 4
i=5:  dp[5] = max(2, 3+2) = 5      maxSoFar = max(4, 5) = 5
i=6:  dp[6] = max(1, 5+1) = 6      maxSoFar = max(5, 6) = 6  ← MAX
i=7:  dp[7] = max(-5, 6-5) = 1     maxSoFar = max(6, 1) = 6
i=8:  dp[8] = max(4, 1+4) = 5      maxSoFar = max(6, 5) = 6

Answer: 6 (subarray [4, -1, 2, 1])
```

---

## 💻 Approach 2: Space-Optimized (Classic Kadane's) — O(n) time, O(1) space

```javascript
function maxSubArray(nums) {
    let maxEndingHere = nums[0];  // dp[i]
    let maxSoFar = nums[0];       // overall max

    for (let i = 1; i < nums.length; i++) {
        maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }

    return maxSoFar;
}

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6
console.log(maxSubArray([1]));   // 1
console.log(maxSubArray([5, 4, -1, 7, 8])); // 23
```

### Visualizing the Running Max

```text
nums:         [-2,  1, -3,  4, -1,  2,  1, -5,  4]
maxEnding:    [-2,  1, -2,  4,  3,  5,  6,  1,  5]
maxSoFar:     [-2,  1,  1,  4,  4,  5,  6,  6,  6]
                                        ↑
                                   Answer: 6
```

---

## 💻 Approach 3: Return the Subarray Itself

```javascript
function maxSubArrayWithIndices(nums) {
    let maxEndingHere = nums[0];
    let maxSoFar = nums[0];
    let start = 0, end = 0, tempStart = 0;

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > maxEndingHere + nums[i]) {
            // Start fresh — discard previous subarray
            maxEndingHere = nums[i];
            tempStart = i;
        } else {
            // Extend the previous subarray
            maxEndingHere = maxEndingHere + nums[i];
        }

        if (maxEndingHere > maxSoFar) {
            maxSoFar = maxEndingHere;
            start = tempStart;
            end = i;
        }
    }

    return { sum: maxSoFar, subarray: nums.slice(start, end + 1) };
}

console.log(maxSubArrayWithIndices([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
// { sum: 6, subarray: [4, -1, 2, 1] }
```

---

## 🎯 Variation 1: Maximum Sum Circular Subarray

**Problem:** The subarray can wrap around the end of the array.

```javascript
function maxSubarraySumCircular(nums) {
    // Case 1: max subarray without wrapping (standard Kadane's)
    // Case 2: max subarray that wraps = totalSum - minSubarray

    let maxEnding = nums[0], maxSoFar = nums[0];
    let minEnding = nums[0], minSoFar = nums[0];
    let total = nums[0];

    for (let i = 1; i < nums.length; i++) {
        maxEnding = Math.max(nums[i], maxEnding + nums[i]);
        maxSoFar = Math.max(maxSoFar, maxEnding);

        minEnding = Math.min(nums[i], minEnding + nums[i]);
        minSoFar = Math.min(minSoFar, minEnding);

        total += nums[i];
    }

    // If all numbers are negative, maxSoFar is the answer
    if (maxSoFar < 0) return maxSoFar;

    // Otherwise, take max of non-wrapping and wrapping cases
    return Math.max(maxSoFar, total - minSoFar);
}

console.log(maxSubarraySumCircular([1, -2, 3, -2]));  // 3 (subarray [3])
console.log(maxSubarraySumCircular([5, -3, 5]));      // 10 (wrap: [5,5])
```

**Why this works:**
```text
Maximum circular sum = total sum - minimum subarray sum
  (Remove the minimum interior subarray, the remaining circular portion is max)
```

---

## 🎯 Variation 2: Maximum Product Subarray

**Problem:** Find the contiguous subarray with the largest product. Since negatives can become positive when multiplied, we must track both max and min.

```javascript
function maxProduct(nums) {
    let maxSoFar = nums[0];
    let maxEnding = nums[0];  // maximum product ending at i
    let minEnding = nums[0];  // minimum product ending at i (could become max!)

    for (let i = 1; i < nums.length; i++) {
        const prevMax = maxEnding;

        // Three choices: start fresh, multiply with max, multiply with min
        maxEnding = Math.max(nums[i], nums[i] * maxEnding, nums[i] * minEnding);
        minEnding = Math.min(nums[i], nums[i] * prevMax, nums[i] * minEnding);

        maxSoFar = Math.max(maxSoFar, maxEnding);
    }

    return maxSoFar;
}

console.log(maxProduct([2, 3, -2, 4]));   // 6 (2×3)
console.log(maxProduct([-2, 0, -1]));     // 0
console.log(maxProduct([-2, 3, -4]));     // 24 (-2×3×-4)
```

### Why Track Min?

```text
nums:   [-2,  3,  -4]
max:    [-2,  3,  24]  ← -2 × 3 × -4 = 24
min:    [-2, -6, -12]  ← -2 × 3 = -6, -6 × -4 = 24 uses cached -6

At i=2 (value=-4):
  maxEnding = max(-4, -4×3=-12, -4×(-6)=24) = 24  ← from min × current!
  The negative value (-6) was the MINIMUM at i=1, but became MAXIMUM when
  multiplied by another negative.
```

---

## 📊 Complexity Summary

| Problem | Time | Space | Notes |
|---------|------|-------|-------|
| Max Subarray (Kadane's) | O(n) | O(1) | Track maxEnding, maxSoFar |
| Max Circular Subarray | O(n) | O(1) | total - minSubarray |
| Max Product Subarray | O(n) | O(1) | Track both max and min |
| Max Subarray with indices | O(n) | O(1) | Extra pointers for bounds |

---

## 🔑 Key Takeaways

- **Pattern:** "Maximum ending at i" — either extend previous or start fresh
- **Space:** O(1) — only keep running values, not the full array
- **Product vs Sum:** For products, track **both max and min** because a negative × negative = positive
- **Circular:** Max circular sum = total sum - minimum subarray
- **Greedy** works here because extending a positive prefix always helps, and a negative prefix always hurts
- **Kadane's is the simplest DP algorithm** — only 1 state variable, O(1) space, single pass

**Back to [1D DP Problems](/DSA-Notes-Problems/data-structures/dynamic-programming/04-1d-dp) →**
