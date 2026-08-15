---
title: "0/1 Knapsack"
description: "Detailed walkthrough of 0/1 Knapsack — 2D tabulation, 1D space optimization, Subset Sum, and Partition Equal Subset Sum."
sidebar:
  order: 2
practice:
  visualizer: /visualizer/dp
---

# 0/1 Knapsack

## 🎯 Problem Statement

Given `n` items, each with a **weight** `wt[i]` and **value** `val[i]`, and a knapsack of **capacity** `W`, determine the **maximum value** you can carry. You can either **take an item or leave it** (0/1 — no fractional amounts, no repeats).

**Example:**
```
Items:           Weight: [2, 3, 4, 5]
                 Value:  [3, 4, 5, 6]
Capacity: 8

Output: 10
Explanation: Take items with weight 3 (value 4) and weight 5 (value 6).
             Total weight = 8, total value = 10.
```

---

## 🧠 Step 1: Identify the State

```
dp[i][w] = maximum value achievable using first i items (0..i-1) with capacity w
```

Two dimensions: number of items considered, and remaining capacity.

---

## 🔗 Step 2: Write the Recurrence

```
For item i and capacity w:

Option 1 (SKIP): dp[i-1][w]         — same as best without item i
Option 2 (TAKE): dp[i-1][w-wt[i-1]] + val[i-1] — take item if it fits

dp[i][w] = max(dp[i-1][w], dp[i-1][w - wt[i-1]] + val[i-1])
```

---

## 🏁 Step 3: Define Base Cases

```
dp[0][w] = 0 for all w     (0 items → 0 value)
dp[i][0] = 0 for all i     (0 capacity → 0 value)
```

---

## 💻 Approach 1: 2D Tabulation — O(n × W) time, O(n × W) space

```javascript
function knapsack(weights, values, W) {
    const n = weights.length;
    const dp = Array.from({ length: n + 1 }, () => new Array(W + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= W; w++) {
            // Option 1: Don't take item i
            dp[i][w] = dp[i - 1][w];

            // Option 2: Take item i (if it fits)
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(
                    dp[i][w],
                    dp[i - 1][w - weights[i - 1]] + values[i - 1]
                );
            }
        }
    }

    return dp[n][W];
}

const weights = [2, 3, 4, 5];
const values  = [3, 4, 5, 6];
console.log(knapsack(weights, values, 8)); // 10
```

### DP Table Walkthrough

```text
        Capacity:  0   1   2   3   4   5   6   7   8
        ─────────────────────────────────────────────
Item 0 (none):    0   0   0   0   0   0   0   0   0
Item 1 (w=2,v=3): 0   0   3   3   3   3   3   3   3
Item 2 (w=3,v=4): 0   0   3   4   4   7   7   7   7
Item 3 (w=4,v=5): 0   0   3   4   5   7   8   9   9
Item 4 (w=5,v=6): 0   0   3   4   5   7   8   9  10  ← answer
```

**Reading the table:**
```
dp[4][8] = max(dp[3][8]=9, dp[3][8-5] + 6 = dp[3][3] + 6 = 4 + 6 = 10) = 10
```

---

## 💻 Approach 2: Space-Optimized (1D) — O(n × W) time, O(W) space

```javascript
function knapsack(weights, values, W) {
    const dp = new Array(W + 1).fill(0);

    for (let i = 0; i < weights.length; i++) {
        for (let w = W; w >= weights[i]; w--) {  // ← BACKWARD!
            dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
        }
    }

    return dp[W];
}
```

### Why Iterate W Backwards?

```text
dp[w] depends on dp[w - wt[i-1]] from the PREVIOUS ROW (i-1).

FORWARD:  dp[3] uses dp[3-2]=dp[1] which was ALREADY updated
          this iteration → item counted TWICE! ❌

BACKWARD: dp[8] uses dp[8-5]=dp[3] which hasn't been updated
          yet this iteration → correctly uses previous row's value ✓

Visual:
  Forward:  dp[2] ← dp[0] ✓ (fresh), dp[4] ← dp[2] ← dp[0]... item reused!
  Backward: dp[8] ← dp[3] (from previous iteration, not current)
```

---

## 🎯 Variation 1: Subset Sum

**Problem:** Determine if there exists a subset of `nums` that sums to exactly `target`.

```javascript
function subsetSum(nums, target) {
    const dp = new Array(target + 1).fill(false);
    dp[0] = true;

    for (const num of nums) {
        for (let t = target; t >= num; t--) {  // backward!
            dp[t] = dp[t] || dp[t - num];
        }
    }

    return dp[target];
}

console.log(subsetSum([3, 34, 4, 12, 5, 2], 9));   // true (4+5)
console.log(subsetSum([3, 34, 4, 12, 5, 2], 30));  // false
```

---

## 🎯 Variation 2: Partition Equal Subset Sum

**Problem:** Given an integer array, return true if it can be partitioned into two subsets with **equal sum**.

```javascript
function canPartition(nums) {
    const total = nums.reduce((a, b) => a + b, 0);
    if (total % 2 !== 0) return false;  // odd total can't be split equally

    const target = total / 2;
    const dp = new Array(target + 1).fill(false);
    dp[0] = true;

    for (const num of nums) {
        for (let t = target; t >= num; t--) {
            dp[t] = dp[t] || dp[t - num];
        }
    }

    return dp[target];
}

console.log(canPartition([1, 5, 11, 5]));   // true ([1,5,5] + [11])
console.log(canPartition([1, 2, 3, 5]));    // false
```

---

## 🎯 Variation 3: Count of Subset Sum

**Problem:** Count the number of subsets that sum to exactly `target`.

```javascript
function countSubsetSum(nums, target) {
    const dp = new Array(target + 1).fill(0);
    dp[0] = 1;

    for (const num of nums) {
        for (let t = target; t >= num; t--) {
            dp[t] += dp[t - num];
        }
    }

    return dp[target];
}

console.log(countSubsetSum([1, 2, 3, 3], 6));  // 3
// Subsets: [1,2,3], [3,3], [1,2,3] (two different 3s)
```

---

## 📊 Complexity Summary

| Problem | Time | Space | Notes |
|---------|------|-------|-------|
| 0/1 Knapsack | O(n×W) | O(W) | 1D with backward iteration |
| Subset Sum | O(n×T) | O(T) | Same pattern, boolean DP |
| Partition Equal Subset Sum | O(n×T) | O(T) | Check if total/2 reachable |
| Count Subset Sum | O(n×T) | O(T) | Same pattern, counting DP |

---

## 🔑 Key Takeaways

- **0/1 Knapsack = choose take or skip** for each item (used at most once)
- **Backward iteration** is critical for 1D space optimization — prevents reusing the same item
- **Pseudo-polynomial:** Time depends on `W` (capacity), which can be large — O(n × W) is not polynomial in the input bit-length
- **Subset Sum** is just Knapsack where values = weights
- **Partition problem** = Subset Sum with target = total/2
- **Unbounded Knapsack** (same item unlimited times) uses **forward** iteration instead

**Next:** [Longest Common Subsequence](/DSA-Notes-Problems/data-structures/dynamic-programming/05-2d-dp/03-longest-common-subsequence) →
