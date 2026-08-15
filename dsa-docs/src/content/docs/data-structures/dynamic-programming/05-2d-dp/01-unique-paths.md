---
title: "Unique Paths"
description: "Detailed walkthrough of Unique Paths — grid DP, 2D tabulation, 1D space optimization, and obstacles variation."
sidebar:
  order: 1
practice:
  visualizer: /visualizer/dp
---

# Unique Paths

## 🎯 Problem Statement

A robot is located at the **top-left corner** of an `m × n` grid. It can only move **down** or **right** at any point. How many possible **unique paths** are there to the **bottom-right corner**?

**Example:**
```
Input:  m = 3, n = 7
Output: 28

Explanation: There are exactly 28 unique paths in a 3×7 grid.
```

---

## 🧠 Step 1: Identify the State

```
dp[i][j] = number of unique paths to reach cell (i, j)
```

The state has two dimensions: row index `i` and column index `j`.

---

## 🔗 Step 2: Write the Recurrence

```
dp[i][j] = dp[i-1][j] + dp[i][j-1]

You can reach cell (i, j) from either:
- ABOVE:  (i-1, j) by moving DOWN
- LEFT:   (i, j-1) by moving RIGHT

The total paths = paths from above + paths from left.
```

---

## 🏁 Step 3: Define Base Cases

```
dp[0][j] = 1 for all j    (first row — only 1 way: keep moving right)
dp[i][0] = 1 for all i    (first column — only 1 way: keep moving down)
```

---

## 💻 Approach 1: 2D Tabulation — O(m × n) time, O(m × n) space

```javascript
function uniquePaths(m, n) {
    const dp = Array.from({ length: m }, () => new Array(n).fill(1));

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }

    return dp[m - 1][n - 1];
}

console.log(uniquePaths(3, 7));   // 28
console.log(uniquePaths(3, 2));   // 3
```

### Table Walkthrough (3×3 grid)

```text
        j=0   j=1   j=2
i=0:     1     1     1       ← base (only right moves)
i=1:     1     2     3       ← dp[1][1]=1+1=2, dp[1][2]=1+2=3
i=2:     1     3     6       ← dp[2][1]=1+2=3, dp[2][2]=3+3=6
                     ↑
               Answer: 6
```

---

## 💻 Approach 2: Space-Optimized (1D Array) — O(m × n) time, O(n) space

```javascript
function uniquePaths(m, n) {
    const dp = new Array(n).fill(1);

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[j] += dp[j - 1];  // dp[j] = dp[j] (above) + dp[j-1] (left)
        }
    }

    return dp[n - 1];
}
```

**Why this works:**
```text
At row i, iteration j:
  dp[j] currently holds the value for row i-1, column j (from above)
  dp[j-1] was just updated to hold row i, column j-1 (from left)
  So dp[j] = old dp[j] (above) + dp[j-1] (left) is correct!
```

---

## 💻 Approach 3: Mathematical (Combinatorics) — O(min(m,n)) time, O(1) space

```javascript
function uniquePaths(m, n) {
    // In an m×n grid, we need to make (m-1) down moves and (n-1) right moves
    // Total moves = (m-1) + (n-1) = m+n-2
    // Choose positions for down moves: C(m+n-2, m-1)
    const total = m + n - 2;
    const k = Math.min(m - 1, n - 1);

    let result = 1;
    for (let i = 1; i <= k; i++) {
        result = result * (total - k + i) / i;
    }

    return Math.round(result);
}

console.log(uniquePaths(3, 7));   // 28
```

**Why this works:**
```text
We need m-1 down moves and n-1 right moves.
Total steps = m+n-2.
We choose which m-1 of those steps are down: C(m+n-2, m-1).
The rest are automatically right moves.
```

---

## 🎯 Variation: Unique Paths with Obstacles

**Problem:** Some cells are obstacles (1), robot cannot pass through them. Find number of paths.

```javascript
function uniquePathsWithObstacles(obstacleGrid) {
    const m = obstacleGrid.length;
    const n = obstacleGrid[0].length;

    // If start or end has obstacle → 0 paths
    if (obstacleGrid[0][0] === 1 || obstacleGrid[m - 1][n - 1] === 1) return 0;

    const dp = Array.from({ length: m }, () => new Array(n).fill(0));

    // First cell
    dp[0][0] = 1;

    // First column: if no obstacle, same as above
    for (let i = 1; i < m; i++) {
        dp[i][0] = (obstacleGrid[i][0] === 1) ? 0 : dp[i - 1][0];
    }

    // First row: if no obstacle, same as left
    for (let j = 1; j < n; j++) {
        dp[0][j] = (obstacleGrid[0][j] === 1) ? 0 : dp[0][j - 1];
    }

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (obstacleGrid[i][j] === 1) {
                dp[i][j] = 0;  // Obstacle — can't be reached
            } else {
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
            }
        }
    }

    return dp[m - 1][n - 1];
}

console.log(uniquePathsWithObstacles([[0,0,0],[0,1,0],[0,0,0]])); // 2
```

```text
Grid:
  S  .  .
  .  X  .
  .  .  E

Paths:
  1. Right → Down → Down → Right
  2. Down → Right → Down → Right
```

---

## 📊 Complexity Summary

| Approach | Time | Space | Notes |
|----------|------|-------|-------|
| 2D Tabulation | O(m×n) | O(m×n) | Full table, easy to understand |
| **1D Array** | **O(m×n)** | **O(n)** | ✅ **Best practical** |
| Combinatorics | O(min(m,n)) | O(1) | Fastest, but only works without obstacles |

---

## 🔑 Key Takeaways

- **Grid DP pattern:** `dp[i][j]` depends on `dp[i-1][j]` (above) and `dp[i][j-1]` (left)
- **Space optimization:** Since each cell only needs the cell above and to its left, a 1D array suffices
- **Base cases:** First row (only right moves) and first column (only down moves) are always 1
- **With obstacles:** Set blocked cells to 0 — they naturally contribute nothing to the sum
- **Combinatorics:** For an unobstructed m×n grid, the answer is C(m+n-2, m-1)

**Next:** [0/1 Knapsack](/DSA-Notes-Problems/data-structures/dynamic-programming/05-2d-dp/02-knapsack) →
