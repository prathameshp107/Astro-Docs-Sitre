---
title: "Dynamic Programming — Introduction"
description: "What is DP, overlapping subproblems, optimal substructure, and the 3-step framework for solving any DP problem."
sidebar:
  order: 1
---

# Dynamic Programming — Introduction

## 🤔 What Is Dynamic Programming?

**Dynamic Programming** is a problem-solving technique that solves complex problems by breaking them into simpler overlapping subproblems, solving each subproblem only once, and storing the results for reuse.

The term was coined by **Richard Bellman** in the 1950s. The word "dynamic" was chosen for political reasons (it sounded impressive) — the core idea is simply **"smart recursion with memory."**

```
Without DP (naive recursion):
  Same subproblems solved MANY times  →  Exponential time

With DP (memoization or tabulation):
  Each subproblem solved ONCE         →  Polynomial time
```

---

## 🧩 Two Pillars of DP

### 1. Overlapping Subproblems

A problem has overlapping subproblems if the same smaller problems appear multiple times during recursion.

**Example: Fibonacci**
```
fib(5)
├── fib(4)
│   ├── fib(3)
│   │   ├── fib(2)   ← computed here
│   │   └── fib(1)
│   └── fib(2)       ← computed AGAIN (overlap!)
└── fib(3)           ← computed AGAIN (overlap!)
    ├── fib(2)       ← computed AGAIN (overlap!)
    └── fib(1)
```

Without DP, `fib(2)` is computed 3 times, `fib(3)` twice. For large inputs this explodes.

**Contrast — Merge Sort (NOT DP):** Each subarray is unique and never repeated, so there are no overlapping subproblems.

---

### 2. Optimal Substructure

A problem has optimal substructure if the **optimal solution to the whole problem** can be built from **optimal solutions to its subproblems**.

**Example: Shortest Path**
```
Shortest path from A → D:
  A → B → C → D
  
  Subproblem: shortest path from B → D is also B → C → D.
  The global optimum INCLUDES the local optimum.  ✓
```

**Counter-example — Longest Path (no optimal substructure):**
```
Longest path from A to D (without revisiting nodes):
  Subpaths may conflict — using the longest A→B path might
  prevent reaching D at all. Subproblems are NOT independent.
```

---

## 🆚 DP vs Recursion vs Greedy

| Approach | Strategy | Guarantees Optimal? | Speed |
|----------|----------|---------------------|-------|
| **Brute Force** | Try all possibilities | Yes | Slowest (exponential) |
| **Recursion** | Divide into sub-calls | Yes (if correct) | Slow (may repeat work) |
| **Memoized Recursion** | Recursion + cache | Yes | Fast (polynomial) |
| **DP (Tabulation)** | Build table bottom-up | Yes | Fast (polynomial) |
| **Greedy** | Always pick local best | Not always | Fastest (linear/log) |

```
When does Greedy work?
  → Only when local optimum always leads to global optimum
  → Example: Activity Selection, Huffman Coding

When does DP work but Greedy fails?
  → Example: 0/1 Knapsack, Coin Change (non-canonical denominations)
  → Greedy picks heaviest items but may miss better combinations

When to use DP over plain recursion?
  → When you notice repeated subproblems in the recursion tree
```

---

## 📐 3 Steps to Solve Any DP Problem

This is the framework to apply every single time you encounter a DP problem.

### Step 1: Identify the State

The **state** is the minimal information you need to describe a subproblem uniquely.

Ask yourself: "What varies between subproblems?"

```
Problem: Climbing stairs (how many ways to reach step n?)
State: dp[i] = number of ways to reach step i

Problem: Knapsack
State: dp[i][w] = max value using first i items with capacity w

Problem: LCS
State: dp[i][j] = length of LCS of first i chars of A and first j chars of B
```

**Tip:** The number of distinct states is your **time complexity**.

---

### Step 2: Write the Recurrence Relation

The **recurrence** defines how a state is computed from smaller states.

```
Ask: "How does the current state depend on previous states?"

Climbing stairs (can take 1 or 2 steps):
  dp[i] = dp[i-1] + dp[i-2]
  (either came from step i-1 or step i-2)

House Robber (can't rob adjacent houses):
  dp[i] = max(dp[i-1], dp[i-2] + nums[i])
  (either skip house i, or rob it and add to i-2's best)

Knapsack (item fits):
  dp[i][w] = max(dp[i-1][w], dp[i-1][w - wt[i]] + val[i])
  (skip item, or take item if it fits)
```

---

### Step 3: Define Base Cases

**Base cases** are the smallest subproblems that can be answered directly without further recursion.

```javascript
// Fibonacci
dp[0] = 0;
dp[1] = 1;

// Climbing Stairs
dp[0] = 1;  // 1 way to stay at ground (do nothing)
dp[1] = 1;  // 1 way to reach step 1

// Knapsack
// dp[0][w] = 0 for all w (0 items → 0 value)
// dp[i][0] = 0 for all i (0 capacity → 0 value)
```

---

## 🔁 DP vs Plain Recursion: A Full Comparison

### Problem: Fibonacci Number

**Pure Recursion — O(2ⁿ) time:**
```javascript
function fib(n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}
// fib(40) makes ~2 billion calls!
```

**Call tree for fib(5):**
```
                    fib(5)
                  /        \
             fib(4)         fib(3)
            /     \         /    \
        fib(3)  fib(2)  fib(2)  fib(1)
        /   \   /   \   /   \
     fib(2) fib(1) fib(1) fib(0) fib(1) fib(0)
     /   \
  fib(1) fib(0)

Total calls: 15 for fib(5). For fib(50): ~2^50 calls.
```

**Memoized Recursion — O(n) time, O(n) space:**
```javascript
function fib(n, memo = {}) {
    if (n <= 1) return n;
    if (memo[n] !== undefined) return memo[n];  // cache hit!
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
    return memo[n];
}
// fib(40) makes only 40 unique calls
```

**Pruned call tree with memo:**
```
                    fib(5)
                  /        \
             fib(4)         fib(3) ← CACHED, returns immediately
            /     \
        fib(3)  fib(2) ← CACHED
        /   \
     fib(2) fib(1)
     /   \
  fib(1) fib(0)

Total unique calls: 9 for fib(5). For fib(50): exactly 50 calls.
```

---

## 🧠 When Should You Use DP?

Look for these signals in a problem:

```
✓ "How many ways to..." (counting problems)
✓ "Minimum/maximum cost/path/value..."
✓ "Can we achieve target X?" (feasibility)
✓ "Find the longest/shortest subsequence..."
✓ "Is there a valid partition/arrangement?"

✗ NOT DP if each subproblem is completely independent
✗ NOT DP if greedy always gives the right answer
✗ NOT DP if the problem requires actual path (BFS/DFS usually)
```

**Classic recognition trick:** Try to write a brute-force recursion. If you notice the same function arguments repeating, you have overlapping subproblems — apply DP.

---

## 🎓 Worked Example: Identifying DP

**Problem:** Given `n` coins of denomination 1, 5, 10 — find minimum coins to make amount `A`.

**Step 1 — Identify State:**
```
State: dp[a] = minimum coins needed to make amount a
```

**Step 2 — Recurrence:**
```
For each coin c in [1, 5, 10]:
  If c <= a:
    dp[a] = min(dp[a], dp[a - c] + 1)

Interpretation: "To make amount a, try using coin c — 
then we need dp[a-c] more coins for the remainder."
```

**Step 3 — Base Case:**
```
dp[0] = 0  (zero coins needed to make amount 0)
dp[a] = Infinity initially for all a > 0
```

**Implementation:**
```javascript
function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;  // base case

    for (let a = 1; a <= amount; a++) {
        for (const coin of coins) {
            if (coin <= a) {
                dp[a] = Math.min(dp[a], dp[a - coin] + 1);
            }
        }
    }

    return dp[amount] === Infinity ? -1 : dp[amount];
}

console.log(coinChange([1, 5, 10], 13)); // 3 (10+2+1 or 5+5+3)
console.log(coinChange([2], 3));          // -1 (impossible)
```

---

## 🔑 Key Vocabulary

| Term | Meaning |
|------|---------|
| **State** | The parameters that uniquely define a subproblem |
| **Recurrence** | The formula relating a state to smaller states |
| **Base case** | The smallest directly-solvable subproblem |
| **Memoization** | Top-down: cache recursive results |
| **Tabulation** | Bottom-up: fill a table iteratively |
| **Overlapping subproblems** | Same subproblems solved multiple times |
| **Optimal substructure** | Optimal whole = built from optimal parts |
| **DP table** | The array/matrix storing computed subproblem answers |

---

**Next:** [Memoization (Top-Down DP)](/DSA-Notes-Problems/data-structures/dynamic-programming/02-memoization) →
