---
title: "Dynamic Programming"
description: "Complete guide to Dynamic Programming — from fundamentals to interview-ready patterns with JavaScript examples."
sidebar:
  order: 0
---

# Dynamic Programming

Welcome to the **Dynamic Programming** section — one of the most powerful and frequently tested topics in technical interviews. This guide takes you from the core intuition of DP all the way to complex 2D and string problems.

---

## 🗺️ What Is Dynamic Programming?

**Dynamic Programming (DP)** is an optimization technique for problems that have:
1. **Overlapping subproblems** — the same smaller problems are solved repeatedly
2. **Optimal substructure** — the optimal solution is built from optimal solutions of subproblems

In plain terms: **"Remember the answers to subproblems so you never solve the same thing twice."**

```
Brute Force Recursion:
  fib(5) → fib(4) + fib(3)
           fib(4) → fib(3) + fib(2)   ← fib(3) computed TWICE!
                     fib(3) → fib(2) + fib(1)  ← fib(2) computed 3x!

Dynamic Programming:
  Compute fib(1), fib(2), fib(3)... once each → store → reuse ✓
```

---

## 📚 Learning Path

| Step | Topic | What You'll Learn |
|------|-------|-------------------|
| 1 | [Introduction to DP](/DSA-Notes-Problems/data-structures/dynamic-programming/01-introduction) | What is DP, overlapping subproblems, optimal substructure |
| 2 | [Memoization (Top-Down)](/DSA-Notes-Problems/data-structures/dynamic-programming/02-memoization) | Cache results of recursive calls, call tree pruning |
| 3 | [Tabulation (Bottom-Up)](/DSA-Notes-Problems/data-structures/dynamic-programming/03-tabulation) | Fill a DP table iteratively, space optimization |
| 4 | [1D DP Problems](/DSA-Notes-Problems/data-structures/dynamic-programming/04-1d-dp) | Climbing Stairs, House Robber, Coin Change, Kadane's |
| 5 | [2D DP Problems](/DSA-Notes-Problems/data-structures/dynamic-programming/05-2d-dp) | Unique Paths, Knapsack, LCS, Edit Distance |
| 6 | [String DP Problems](/DSA-Notes-Problems/data-structures/dynamic-programming/06-string-dp) | Palindromes, Word Break, Interleaving Strings |
| 7 | [DP Patterns Guide](/DSA-Notes-Problems/data-structures/dynamic-programming/07-patterns) | How to recognize & categorize any DP problem |
| 8 | [Complexity Analysis](/DSA-Notes-Problems/data-structures/dynamic-programming/08-complexity-analysis) | Time/space analysis, space optimization tricks |
| 9 | [Interview Questions](/DSA-Notes-Problems/data-structures/dynamic-programming/09-interview-questions) | 15+ Q&A with detailed explanations |

---

## 🔑 The Two Approaches

```
┌─────────────────────────────────────────────────────────────────┐
│                    DYNAMIC PROGRAMMING                          │
│                                                                 │
│   TOP-DOWN (Memoization)       BOTTOM-UP (Tabulation)           │
│   ─────────────────────        ──────────────────────           │
│   Start from the big           Start from the smallest          │
│   problem, recurse down,       subproblem, build up to          │
│   cache results as you go.     the final answer.                │
│                                                                 │
│   fib(5)                       dp[0] = 0                        │
│     └─ fib(4)                  dp[1] = 1                        │
│          └─ fib(3) [cached]    dp[2] = dp[1]+dp[0] = 1         │
│               └─ ...           dp[3] = dp[2]+dp[1] = 2         │
│                                dp[4] = dp[3]+dp[2] = 3         │
│                                dp[5] = dp[4]+dp[3] = 5  ✓     │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎯 3 Steps to Solve Any DP Problem

```
Step 1: IDENTIFY THE STATE
        What information do we need at each subproblem?
        (e.g., current index, remaining capacity, last char chosen)

Step 2: WRITE THE RECURRENCE
        How does the answer to state(i) relate to smaller states?
        (e.g., dp[i] = dp[i-1] + dp[i-2])

Step 3: DEFINE BASE CASES
        What are the trivially-solved smallest subproblems?
        (e.g., dp[0] = 0, dp[1] = 1)
```

---

## 📊 Problem Categories

| Category | Classic Problems | Dimension |
|----------|-----------------|-----------|
| **Linear DP** | Fibonacci, Climbing Stairs, House Robber | 1D |
| **Kadane's** | Maximum Subarray, Best Time to Buy Stock | 1D |
| **Knapsack** | 0/1 Knapsack, Subset Sum, Coin Change | 2D |
| **Grid DP** | Unique Paths, Minimum Path Sum | 2D |
| **String DP** | LCS, Edit Distance, Palindrome | 2D |
| **Interval DP** | Matrix Chain, Burst Balloons | 2D |
| **Tree DP** | House Robber III, Diameter of Tree | Tree |
| **Bitmask DP** | Travelling Salesman, Assignment | Bitmask |

---

## ⚡ Quick Reference: Most Common Recurrences

```javascript
// Fibonacci-style
dp[i] = dp[i-1] + dp[i-2]

// Max/min choice
dp[i] = Math.max(dp[i-1], dp[i-2] + val[i])

// Knapsack
dp[i][w] = Math.max(dp[i-1][w], dp[i-1][w-wt[i]] + val[i])

// LCS
dp[i][j] = (a[i] === b[j])
           ? dp[i-1][j-1] + 1
           : Math.max(dp[i-1][j], dp[i][j-1])

// Edit Distance
dp[i][j] = (a[i] === b[j])
           ? dp[i-1][j-1]
           : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
```

---

## 🔗 Related Topics

- [Recursion & Backtracking](/DSA-Notes-Problems/data-structures/recursion) — DP starts as a recursive solution before optimization
- [Graphs](/DSA-Notes-Problems/data-structures/graphs) — DP on graphs (DAG shortest path, Bellman-Ford)
- [Trees](/DSA-Notes-Problems/data-structures/trees) — Tree DP patterns like House Robber III

---

*Start with [Introduction to DP](/DSA-Notes-Problems/data-structures/dynamic-programming/01-introduction) →*
