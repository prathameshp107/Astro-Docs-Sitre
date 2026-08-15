---
title: "House Robber"
description: "Detailed walkthrough of House Robber — including circular houses, tree version, and space-optimized DP."
sidebar:
  order: 2
practice:
  visualizer: /visualizer/dp
---

# House Robber

## 🎯 Problem Statement

You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. **Adjacent houses have security systems** that alert police if two adjacent houses are broken into on the same night.

Given an array `nums` representing money in each house, return the **maximum amount** you can rob **without alerting police**.

**Example:**
```
Input:  nums = [1, 2, 3, 1]
Output: 4

Explanation: Rob house 1 (money=1) and house 3 (money=3).
Total = 1 + 3 = 4. (Can't rob house 2 because house 1 & 3 are adjacent!)
```

```
Input:  nums = [2, 7, 9, 3, 1]
Output: 12

Explanation: Rob house 1 (2), house 3 (9), house 5 (1) = 12.
Or: house 2 (7) + house 5 (1) = 8. Better: 2 + 9 + 1 = 12.
```

---

## 🧠 Step 1: Identify the State

```
dp[i] = maximum money that can be robbed considering houses 0 through i-1 (first i houses)
```

We track the **best possible outcome up to each house**. At each step, we decide whether to rob the current house or skip it.

---

## 🔗 Step 2: Write the Recurrence

```
At house i (0-indexed), you have two choices:

1. SKIP the house:   dp[i-1]                  (same as best for i-1 houses)
2. ROB the house:    dp[i-2] + nums[i-1]      (must skip i-1, add current)

dp[i] = max(dp[i-1], dp[i-2] + nums[i-1])
```

**Key insight:** If you rob house `i`, you **cannot** rob house `i-1`, so you must add the best from house `i-2` or earlier.

---

## 🏁 Step 3: Define Base Cases

```
dp[0] = 0          (0 houses → 0 money)
dp[1] = nums[0]    (1 house → rob it, it's the only option)
```

---

## 💻 Approach 1: Tabulation — O(n) time, O(n) space

```javascript
function rob(nums) {
    const n = nums.length;
    if (n === 0) return 0;
    if (n === 1) return nums[0];

    const dp = new Array(n + 1).fill(0);
    dp[0] = 0;          // 0 houses
    dp[1] = nums[0];    // 1 house

    for (let i = 2; i <= n; i++) {
        dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 1]);
    }

    return dp[n];
}
```

### DP Table Walkthrough: [2, 7, 9, 3, 1]

```text
dp[0] = 0                           (base)
dp[1] = nums[0] = 2                 (base — only house 0)

i=2:  skip house 1 → dp[1]=2
      rob  house 1 → dp[0] + nums[1] = 0 + 7 = 7
      dp[2] = max(2, 7) = 7

i=3:  skip house 2 → dp[2]=7
      rob  house 2 → dp[1] + nums[2] = 2 + 9 = 11
      dp[3] = max(7, 11) = 11

i=4:  skip house 3 → dp[3]=11
      rob  house 3 → dp[2] + nums[3] = 7 + 3 = 10
      dp[4] = max(11, 10) = 11

i=5:  skip house 4 → dp[4]=11
      rob  house 4 → dp[3] + nums[4] = 11 + 1 = 12
      dp[5] = max(11, 12) = 12  ← answer

Answer: 12
```

---

## 💻 Approach 2: Space-Optimized — O(n) time, O(1) space

```javascript
function rob(nums) {
    let prev2 = 0;      // dp[i-2]
    let prev1 = 0;      // dp[i-1]

    for (const num of nums) {
        const curr = Math.max(prev1, prev2 + num);
        prev2 = prev1;
        prev1 = curr;
    }

    return prev1;
}

console.log(rob([1, 2, 3, 1]));   // 4
console.log(rob([2, 7, 9, 3, 1])); // 12
```

---

## 🎯 Variation 1: House Robber II (Circular Houses)

**Problem:** Houses are arranged in a **circle**. The first and last houses are now adjacent. Same rules otherwise.

```javascript
function rob(nums) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];

    function robLinear(arr) {
        let prev2 = 0, prev1 = 0;
        for (const num of arr) {
            const curr = Math.max(prev1, prev2 + num);
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }

    // Case 1: Exclude last house, rob houses 0..n-2
    // Case 2: Exclude first house, rob houses 1..n-1
    return Math.max(
        robLinear(nums.slice(0, nums.length - 1)),
        robLinear(nums.slice(1))
    );
}

console.log(rob([2, 3, 2]));      // 3 (rob house 1 only)
console.log(rob([1, 2, 3, 1]));  // 4 (rob houses 0 and 2)
```

**Why this works:**
```text
Since house 0 and house n-1 are now adjacent (circular):
- Either don't rob house n-1 → rob houses 0..n-2 freely (linear)
- Or don't rob house 0     → rob houses 1..n-1 freely (linear)
Take the max of both scenarios.
```

---

## 🎯 Variation 2: House Robber III (Binary Tree)

**Problem:** Houses are arranged in a binary tree. If you rob a node, you cannot rob its direct children. Find max.

```javascript
function rob(root) {
    // Returns [robThisNode, skipThisNode]
    function dfs(node) {
        if (!node) return [0, 0];

        const left = dfs(node.left);
        const right = dfs(node.right);

        // If we rob this node, skip children
        const rob = node.val + left[1] + right[1];

        // If we skip this node, take max of each child
        const skip = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);

        return [rob, skip];
    }

    const result = dfs(root);
    return Math.max(result[0], result[1]);
}

// Tree:
//       3
//      / \
//     2   3
//      \   \
//       3   1
// Max: 3 + 3 + 1 = 7
```

---

## 🎯 Variation 3: Delete and Earn

**Problem:** You can pick any number `nums[i]` and earn `nums[i]` points, but you must delete all `nums[i]-1` and `nums[i]+1` values. Maximize points.

This is **House Robber in disguise** — group values by count, then solve House Robber on the distinct values.

```javascript
function deleteAndEarn(nums) {
    const maxVal = Math.max(...nums);
    const points = new Array(maxVal + 1).fill(0);

    // Group totals: points[x] = sum of all occurrences of x
    for (const num of nums) {
        points[num] += num;
    }

    // Now it's House Robber on 'points' array
    // Can't take adjacent values (x and x+1)
    let prev2 = 0, prev1 = 0;
    for (const p of points) {
        const curr = Math.max(prev1, prev2 + p);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}

console.log(deleteAndEarn([3, 4, 2]));        // 6
console.log(deleteAndEarn([2, 2, 3, 3, 3, 4])); // 9
```

---

## 📊 Complexity Summary

| Approach | Time | Space | Notes |
|----------|------|-------|-------|
| Tabulation (array) | O(n) | O(n) | Easy to understand |
| **Rolling variables** | **O(n)** | **O(1)** | ✅ **Best** |
| Robber II (circular) | O(n) | O(1) | Two linear calls |
| Robber III (tree) | O(n) | O(h) | Tree DFS |

---

## 🔑 Key Takeaways

- **Pattern recognition:** "Can't pick adjacent elements" = House Robber pattern
- **Recurrence:** `dp[i] = max(dp[i-1], dp[i-2] + nums[i-1])` — skip or rob
- **Space optimization:** Only need 2 variables since we only look back 2 steps
- **Circular:** Break the circle by considering two linear cases
- **On trees:** Return pair [rob, skip] from each node
- **In disguise:** Delete and Earn, Paint House, Maximum Sum with Non-Adjacent are all House Robber

**Next:** [Coin Change](/DSA-Notes-Problems/data-structures/dynamic-programming/04-1d-dp/03-coin-change) →
