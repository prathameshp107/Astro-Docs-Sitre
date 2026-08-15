---
title: "2D DP Problems"
description: "Two-dimensional dynamic programming problems with the pattern: dp[i][j] depends on previous rows/columns."
sidebar:
  order: 0
practice:
  visualizer: /visualizer/dp
---

# 2D DP Problems

Two-dimensional DP problems have **two state variables** — typically representing indices into two arrays/dimensions. The DP table is a 2D matrix `dp[i][j]`.

---

## 📋 Problems

| # | Problem | Pattern | Difficulty |
|---|---------|---------|------------|
| 1 | [Unique Paths](/DSA-Notes-Problems/data-structures/dynamic-programming/05-2d-dp/01-unique-paths) | Grid traversal | Medium |
| 2 | [0/1 Knapsack](/DSA-Notes-Problems/data-structures/dynamic-programming/05-2d-dp/02-knapsack) | Take/skip items | Medium |
| 3 | [Longest Common Subsequence](/DSA-Notes-Problems/data-structures/dynamic-programming/05-2d-dp/03-longest-common-subsequence) | String alignment | Medium |
| 4 | [Edit Distance](/DSA-Notes-Problems/data-structures/dynamic-programming/05-2d-dp/04-edit-distance) | String transformation | Hard |

---

## ⚡ Quick Recurrence Reference

```text
Unique Paths:   dp[i][j] = dp[i-1][j] + dp[i][j-1]             (sum of paths)
Knapsack:       dp[i][w] = max(dp[i-1][w], dp[i-1][w-wt] + val) (skip or take)
LCS:            match? dp[i-1][j-1]+1 : max(dp[i-1][j], dp[i][j-1]) (match or skip)
Edit Distance:  match? dp[i-1][j-1] : 1+min(delete, insert, replace) (3 ops)
```

*Start with [Unique Paths](/DSA-Notes-Problems/data-structures/dynamic-programming/05-2d-dp/01-unique-paths) →*
