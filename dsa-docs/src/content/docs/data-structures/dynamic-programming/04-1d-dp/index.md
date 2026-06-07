---
title: "1D DP Problems"
description: "One-dimensional dynamic programming problems with the pattern: dp[i] depends on a constant number of previous states."
sidebar:
  order: 0
---

# 1D DP Problems

One-dimensional DP problems have a **single state variable** — typically the index `i` into an array. The recurrence uses `dp[i-1]`, `dp[i-2]`, or a small constant number of previous states.

---

## 📋 Problems

| # | Problem | Pattern | Difficulty |
|---|---------|---------|------------|
| 1 | [Climbing Stairs](/DSA-Notes-Problems/data-structures/dynamic-programming/04-1d-dp/01-climbing-stairs) | Fibonacci-style | Easy |
| 2 | [House Robber](/DSA-Notes-Problems/data-structures/dynamic-programming/04-1d-dp/02-house-robber) | Max with non-adjacent | Easy |
| 3 | [Coin Change](/DSA-Notes-Problems/data-structures/dynamic-programming/04-1d-dp/03-coin-change) | Min/max combinations | Medium |
| 4 | [Kadane's Algorithm](/DSA-Notes-Problems/data-structures/dynamic-programming/04-1d-dp/04-kadanes-algorithm) | Running max (Maximum Subarray) | Medium |

---

## ⚡ Quick Recurrence Reference

```text
Climbing Stairs:  dp[i] = dp[i-1] + dp[i-2]          (fibonacci sum)
House Robber:     dp[i] = max(dp[i-1], dp[i-2] + val) (max skip/rob)
Coin Change:      dp[a] = min(dp[a-c] + 1)            (min over coins)
Kadane's:         dp[i] = max(val[i], dp[i-1] + val)  (extend or restart)
```

*Start with [Climbing Stairs](/DSA-Notes-Problems/data-structures/dynamic-programming/04-1d-dp/01-climbing-stairs) →*
