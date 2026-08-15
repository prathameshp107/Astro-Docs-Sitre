---
title: "Climbing Stairs"
description: "Detailed walkthrough of the Climbing Stairs problem — recursion, memoization, tabulation, space optimization, and variations."
sidebar:
  order: 1
practice:
  visualizer: /visualizer/dp
---

# Climbing Stairs

## 🎯 Problem Statement

You are climbing a staircase. It takes `n` steps to reach the top. Each time you can climb **1 or 2 steps**. In how many **distinct ways** can you climb to the top?

**Example:**
```
Input:  n = 3
Output: 3

Explanation: There are 3 ways to reach the top:
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step
```

---

## 🧠 Step 1: Identify the State

```
dp[i] = number of distinct ways to reach step i
```

The state is simply the current step number. This is a **1D DP** problem because the state has only one dimension (the step index).

---

## 🔗 Step 2: Write the Recurrence

```
dp[i] = dp[i-1] + dp[i-2]
```

**Why?** To reach step `i`, your last move was either:
- A **1-step** climb from step `i-1` → adds `dp[i-1]` ways
- A **2-step** climb from step `i-2` → adds `dp[i-2]` ways

Since these are the only two possibilities, the total is their **sum**.

---

## 🏁 Step 3: Define Base Cases

```
dp[0] = 1   (1 way to stay at ground — take no steps)
dp[1] = 1   (1 way to reach step 1 — take 1 step)
```

---

## 💻 Approach 1: Recursion (Brute Force) — O(2ⁿ)

```javascript
function climbStairs(n) {
    if (n <= 1) return 1;
    return climbStairs(n - 1) + climbStairs(n - 2);
}

console.log(climbStairs(5));  // 8
```

**Problem:** Exponential time. For `n=50`, this would take years to compute.

### Call Tree Visualization

```text
                       climb(5)
                      /        \
                 climb(4)      climb(3) 
                /        \     /       \
           climb(3)     climb(2) climb(2) climb(1)
          /       \     /     \
      climb(2) climb(1) climb(1) climb(0)
      /     \
  climb(1) climb(0)

Total calls: 15 for n=5. For n=50: ~2^50 calls.
```

---

## 💻 Approach 2: Memoization (Top-Down DP) — O(n)

```javascript
function climbStairs(n, memo = {}) {
    // Base cases
    if (n <= 1) return 1;

    // Cache check
    if (memo[n] !== undefined) return memo[n];

    // Compute and store
    memo[n] = climbStairs(n - 1, memo) + climbStairs(n - 2, memo);
    return memo[n];
}

console.log(climbStairs(5));   // 8
console.log(climbStairs(50));  // 20365011074 (instant!)
```

### How Memoization Prunes the Tree

```text
                       climb(5)                      ← computed
                      /        \
                 climb(4)      climb(3)               ← 3 cached!
                /        \
           climb(3)     climb(2)                      ← 2 cached!
          /       \
      climb(2) climb(1)                                ← 1 cached!
      /     \
  climb(1) climb(0)                                     ← base cases

Total unique calls: exactly n+1 = 6 for n=5. O(n) — linear!
```

---

## 💻 Approach 3: Tabulation (Bottom-Up DP) — O(n) time, O(n) space

```javascript
function climbStairs(n) {
    if (n <= 1) return 1;

    const dp = new Array(n + 1).fill(0);
    dp[0] = 1;  // base: ground
    dp[1] = 1;  // base: step 1

    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
}
```

### DP Table Filling (n=5)

```text
i=0: dp[0] = 1   (base)
i=1: dp[1] = 1   (base)
i=2: dp[2] = dp[1] + dp[0] = 1 + 1 = 2
i=3: dp[3] = dp[2] + dp[1] = 2 + 1 = 3
i=4: dp[4] = dp[3] + dp[2] = 3 + 2 = 5
i=5: dp[5] = dp[4] + dp[3] = 5 + 3 = 8  ← answer

Ways to climb 5 steps: 8
```

---

## 💻 Approach 4: Space-Optimized (Rolling Variables) — O(n) time, O(1) space

Since `dp[i]` only depends on `dp[i-1]` and `dp[i-2]`, we only need two variables.

```javascript
function climbStairs(n) {
    if (n <= 1) return 1;

    let prev2 = 1;  // dp[0]
    let prev1 = 1;  // dp[1]

    for (let i = 2; i <= n; i++) {
        const curr = prev1 + prev2;  // dp[i]
        prev2 = prev1;
        prev1 = curr;
    }

    return prev1;  // dp[n]
}
```

### Rolling Window Visualization (n=5)

```text
Initial: prev2=1 (dp[0]), prev1=1 (dp[1])
i=2:  curr = 1+1 = 2     → prev2=1, prev1=2
i=3:  curr = 2+1 = 3     → prev2=2, prev1=3
i=4:  curr = 3+2 = 5     → prev2=3, prev1=5
i=5:  curr = 5+3 = 8     → prev2=5, prev1=8

Only 2 variables needed → O(1) space!
```

---

## 📊 Complexity Comparison

| Approach | Time | Space | Notes |
|----------|------|-------|-------|
| Recursion (brute) | O(2ⁿ) | O(n) stack | Exponential — unusable for large n |
| Memoization | O(n) | O(n) | Recursion + cache |
| Tabulation | O(n) | O(n) | Array of size n+1 |
| **Rolling variables** | **O(n)** | **O(1)** | ✅ **Best** |

---

## 🎯 Variations of Climbing Stairs

### Variation 1: Can take 1, 2, or 3 steps

```javascript
function climbStairs3(n) {
    if (n <= 1) return 1;
    if (n === 2) return 2;

    let prev3 = 1, prev2 = 1, prev1 = 2;  // dp[0], dp[1], dp[2]
    for (let i = 3; i <= n; i++) {
        const curr = prev1 + prev2 + prev3;  // dp[i] = dp[i-1]+dp[i-2]+dp[i-3]
        prev3 = prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}

console.log(climbStairs3(4)); // 7 (ways: 1111,112,121,13,211,22,31)
```

### Variation 2: Min Cost Climbing Stairs

**Problem:** Each step has a cost. You can start from step 0 or 1. Pay the cost at each step you land on. Find minimum cost to reach the top.

```javascript
function minCostClimbingStairs(cost) {
    const n = cost.length;
    let prev2 = cost[0];  // dp[0]
    let prev1 = cost[1];  // dp[1]

    for (let i = 2; i < n; i++) {
        const curr = cost[i] + Math.min(prev2, prev1);
        prev2 = prev1;
        prev1 = curr;
    }

    return Math.min(prev2, prev1);
}

console.log(minCostClimbingStairs([10, 15, 20]));        // 15
console.log(minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])); // 6
```

### Variation 3: Count ways with step array

**Problem:** Given an array `steps` of allowed step sizes, count ways to reach step n.

```javascript
function climbStairsSteps(n, steps) {
    const dp = new Array(n + 1).fill(0);
    dp[0] = 1;  // 1 way to stay at ground

    for (let i = 1; i <= n; i++) {
        for (const step of steps) {
            if (i >= step) {
                dp[i] += dp[i - step];
            }
        }
    }

    return dp[n];
}

console.log(climbStairsSteps(5, [1, 2]));   // 8
console.log(climbStairsSteps(5, [1, 3, 5])); // 5
```

---

## 🔑 Key Takeaways

- **Climbing Stairs = Fibonacci** — the recurrence `dp[i] = dp[i-1] + dp[i-2]` is the same
- **Only needs O(1) space** — rolling variables are all you need
- **Pattern recognition:** If a problem says "how many ways to reach N" with choices, it's likely Fibonacci DP
- **Extension:** Works for any set of step sizes (just sum over valid steps)

**Next:** [House Robber](/DSA-Notes-Problems/data-structures/dynamic-programming/04-1d-dp/02-house-robber) →
