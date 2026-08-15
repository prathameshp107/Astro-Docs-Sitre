---
title: "Tabulation (Bottom-Up DP)"
description: "Bottom-up dynamic programming with tabulation — filling the DP table iteratively, space optimization, and comparison with memoization."
sidebar:
  order: 3
practice:
  visualizer: /visualizer/dp
---

# Tabulation (Bottom-Up DP)

## 🔹 What Is Tabulation?

**Tabulation** is a bottom-up DP technique where you:
1. Create a DP table (array or 2D array) initialized with base case values
2. Fill the table **iteratively**, from smallest subproblems up to the answer
3. Return the final cell as the answer

The name comes from filling a **table** — you literally fill row by row, column by column.

```
Bottom-Up Process:
  Start: fill base cases  →  dp[0], dp[1]
  Build: fill each cell    →  dp[2] = dp[0] + dp[1]
                           →  dp[3] = dp[1] + dp[2]
                           →  ...
  End:   read final answer →  dp[n]
```

---

## 📊 Fibonacci: Tabulation Step by Step

### Filling the Table

```javascript
function fib(n) {
    if (n <= 1) return n;

    const dp = new Array(n + 1).fill(0);

    // Base cases
    dp[0] = 0;
    dp[1] = 1;

    // Fill table bottom-up
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];  // recurrence
    }

    return dp[n];
}

console.log(fib(10)); // 55
```

**Table filling for fib(8):**
```
Index:  0   1   2   3   4   5   6   7   8
        ─────────────────────────────────
dp:    [0,  1,  1,  2,  3,  5,  8, 13, 21]
        ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑
       base base  i=2 i=3 i=4 i=5 i=6 i=7 i=8

dp[2] = dp[1] + dp[0] = 1 + 0 = 1
dp[3] = dp[2] + dp[1] = 1 + 1 = 2
dp[4] = dp[3] + dp[2] = 2 + 1 = 3
dp[5] = dp[4] + dp[3] = 3 + 2 = 5
dp[6] = dp[5] + dp[4] = 5 + 3 = 8
dp[7] = dp[6] + dp[5] = 8 + 5 = 13
dp[8] = dp[7] + dp[6] = 13 + 8 = 21  ← answer
```

---

## 💡 Space Optimization: The Rolling Variable Trick

For many DP problems, `dp[i]` only depends on `dp[i-1]` and `dp[i-2]`. You don't need the whole array — just the last two values.

### Fibonacci with O(1) Space

```javascript
function fib(n) {
    if (n <= 1) return n;

    let prev2 = 0;  // dp[i-2]
    let prev1 = 1;  // dp[i-1]

    for (let i = 2; i <= n; i++) {
        const curr = prev1 + prev2;  // dp[i]
        prev2 = prev1;               // slide window
        prev1 = curr;
    }

    return prev1;
}
```

**Visualization of the rolling window:**
```
i=2:  prev2=0, prev1=1  →  curr=1   →  prev2=1, prev1=1
i=3:  prev2=1, prev1=1  →  curr=2   →  prev2=1, prev1=2
i=4:  prev2=1, prev1=2  →  curr=3   →  prev2=2, prev1=3
i=5:  prev2=2, prev1=3  →  curr=5   →  prev2=3, prev1=5
i=6:  prev2=3, prev1=5  →  curr=8   →  prev2=5, prev1=8

Only 2 variables needed at any time → O(1) space!
```

---

## 🛠️ Tabulation Template

### 1D Tabulation

```javascript
function solve(n) {
    // Initialize DP array
    const dp = new Array(n + 1).fill(0);

    // Base cases
    dp[0] = baseValue0;
    dp[1] = baseValue1;

    // Fill table
    for (let i = 2; i <= n; i++) {
        dp[i] = recurrence(dp[i-1], dp[i-2], ...);
    }

    return dp[n];
}
```

### 2D Tabulation

```javascript
function solve(a, b) {
    const m = a.length, n = b.length;

    // Initialize 2D DP table
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

    // Base cases (row 0 and column 0 usually = 0)
    for (let i = 0; i <= m; i++) dp[i][0] = 0;
    for (let j = 0; j <= n; j++) dp[0][j] = 0;

    // Fill table (note: starting from 1 because base cases cover 0)
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            dp[i][j] = recurrence(dp[i-1][j], dp[i][j-1], dp[i-1][j-1], ...);
        }
    }

    return dp[m][n];
}
```

---

## 🎯 Full Example: Climbing Stairs (Tabulation)

```javascript
function climbStairs(n) {
    if (n <= 2) return n;

    const dp = new Array(n + 1).fill(0);
    dp[1] = 1;  // 1 way to reach step 1
    dp[2] = 2;  // 2 ways to reach step 2: (1+1) or (2)

    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
}

// Space-optimized version:
function climbStairsOptimized(n) {
    if (n <= 2) return n;
    let a = 1, b = 2;
    for (let i = 3; i <= n; i++) {
        [a, b] = [b, a + b];
    }
    return b;
}
```

---

## 🎯 Full Example: Knapsack (2D Tabulation)

**Problem:** Given items with weights and values, and a knapsack of capacity W, maximize value.

```javascript
function knapsack(weights, values, W) {
    const n = weights.length;

    // dp[i][w] = max value using first i items, capacity w
    const dp = Array.from({ length: n + 1 }, () => new Array(W + 1).fill(0));

    // Base cases: dp[0][w] = 0 (no items), dp[i][0] = 0 (no capacity)
    // Already filled by .fill(0) above

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

**DP Table for knapsack example (W=8, n=4):**
```
      W:  0  1  2  3  4  5  6  7  8
item 0:  [0, 0, 0, 0, 0, 0, 0, 0, 0]
item 1:  [0, 0, 3, 3, 3, 3, 3, 3, 3]   ← wt=2, val=3
item 2:  [0, 0, 3, 4, 4, 7, 7, 7, 7]   ← wt=3, val=4
item 3:  [0, 0, 3, 4, 5, 7, 8, 9, 9]   ← wt=4, val=5
item 4:  [0, 0, 3, 4, 5, 7, 8, 9,10]   ← wt=5, val=6

Answer: dp[4][8] = 10 ✓
```

---

## ⚖️ Tabulation vs Memoization: Full Comparison

| Aspect | Memoization (Top-Down) | Tabulation (Bottom-Up) |
|--------|------------------------|------------------------|
| **Direction** | Big → small (recurse down) | Small → big (iterate up) |
| **Implementation** | Recursion + cache | Loops + table |
| **Code style** | Intuitive, mirrors problem | Requires ordering insight |
| **Stack overflow** | Risk with deep recursion | No recursion, no risk |
| **Subproblems** | Only solves needed ones | Solves ALL subproblems |
| **Space optimization** | Harder | Easy with rolling arrays |
| **Cache lookup** | Hash map (slightly slower) | Direct array access (fast) |
| **Debugging** | Easier to trace | Harder to trace |
| **Best for** | Sparse subproblem graphs | Dense/all subproblems needed |

### When to Prefer Each

```
Use Memoization when:
  ✓ Not all subproblems are needed (e.g., game tree search)
  ✓ State space is sparse
  ✓ Natural recursive structure is clearer

Use Tabulation when:
  ✓ All subproblems need to be computed
  ✓ Space optimization is required
  ✓ Deep recursion would overflow
  ✓ Constant-factor performance matters
```

---

## 🚀 Space Optimization: From 2D to 1D

Many 2D DP problems can be reduced to 1D by observing that `dp[i][w]` only depends on the previous row `dp[i-1][...]`.

### Knapsack: O(n×W) → O(W)

```javascript
function knapsackOptimized(weights, values, W) {
    const n = weights.length;
    const dp = new Array(W + 1).fill(0);  // Only 1D!

    for (let i = 0; i < n; i++) {
        // IMPORTANT: iterate W backwards to avoid using item twice
        for (let w = W; w >= weights[i]; w--) {
            dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
        }
    }

    return dp[W];
}
```

**Why iterate backwards?**
```
If we go forward:  dp[w] might use dp[w-wt] which was ALREADY updated
                   this iteration → item counted more than once!

If we go backward: dp[w-wt] hasn't been updated yet this iteration
                   → correctly reflects "previous row" values ✓
```

### LCS: O(m×n) → O(n)

```javascript
function lcs(a, b) {
    const m = a.length, n = b.length;
    let prev = new Array(n + 1).fill(0);
    let curr = new Array(n + 1).fill(0);

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (a[i - 1] === b[j - 1]) {
                curr[j] = prev[j - 1] + 1;
            } else {
                curr[j] = Math.max(prev[j], curr[j - 1]);
            }
        }
        [prev, curr] = [curr, prev];  // swap rows
    }

    return prev[n];
}
```

---

## 📋 Summary: Tabulation Steps

```
1. Define dp[i] or dp[i][j] clearly (what does it represent?)
2. Initialize the table size: n+1 or (m+1)×(n+1)
3. Fill base cases (row 0, col 0, dp[0], dp[1])
4. Write nested loops in the correct ORDER
5. At each cell, apply the recurrence
6. Return dp[n] or dp[m][n]
7. (Optional) Apply space optimization
```

---

**Next:** [1D DP Problems](/DSA-Notes-Problems/data-structures/dynamic-programming/04-1d-dp-problems) →
