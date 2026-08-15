---
title: "Memoization (Top-Down DP)"
description: "Top-down dynamic programming with memoization — how it works, when to use it, and JavaScript implementation patterns."
sidebar:
  order: 2
practice:
  visualizer: /visualizer/dp
---

# Memoization (Top-Down DP)

## 🔹 What Is Memoization?

**Memoization** is a top-down DP technique where you:
1. Write a recursive solution naturally
2. Add a **cache** (memo table) to store results
3. Before computing, **check the cache** — if the answer exists, return it immediately

The word comes from "memo" (Latin: *memorandum* — "to be remembered").

```
Naive Recursion:        Memoized Recursion:
  solve(n)               solve(n)
    └─ solve(n-1)          └─ solve(n-1)  ← compute + store
         └─ solve(n-2)          └─ solve(n-2)  ← compute + store
              └─ solve(n-1)          └─ solve(n-1)  ← CACHE HIT! ✓
                   └─ solve(n-2)
                        └─ ...
```

---

## 🗂️ The Memo Table

The memo table is usually:
- A **plain object** `{}` or `Map` for arbitrary keys
- An **array** `[]` when the state is an integer index
- A **2D array** `[][]` when state has two parameters

```javascript
// Object memo (flexible keys)
const memo = {};
memo["3,7"] = 42;

// Array memo (integer index state)
const memo = new Array(n + 1).fill(-1);
memo[5] = 8;

// 2D array memo (two-parameter state)
const memo = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(-1));
memo[2][3] = 15;
```

**Convention:** Initialize with `-1` or `undefined` to distinguish "not computed" from a valid answer of `0`.

---

## 📊 Fibonacci: Without vs With Memoization

### Without Memoization — O(2ⁿ)

```javascript
function fib(n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}
```

**Call tree for fib(6):**
```
                          fib(6)
                        /        \
                   fib(5)         fib(4)
                  /     \         /    \
              fib(4)   fib(3)  fib(3) fib(2)
             /    \    /   \   /   \
         fib(3) fib(2)fib(2)fib(1)fib(2)fib(1)
         ...

Nodes recomputed:
  fib(4): 2 times
  fib(3): 3 times
  fib(2): 5 times
  fib(1): 8 times   ← grows exponentially!

Total calls for fib(n): ~2^n
```

### With Memoization — O(n)

```javascript
function fib(n, memo = {}) {
    // Step 1: Base case
    if (n <= 1) return n;

    // Step 2: Check cache
    if (memo[n] !== undefined) return memo[n];

    // Step 3: Compute and store
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
    return memo[n];
}

console.log(fib(6));  // 8
console.log(fib(50)); // 12586269025 (instant!)
```

**Pruned call tree for fib(6) with memo:**
```
                          fib(6)
                        /        \
                   fib(5)         fib(4) ← CACHED ✓
                  /     \
              fib(4)   fib(3) ← CACHED ✓
             /    \
         fib(3)  fib(2) ← CACHED ✓
         /   \
      fib(2) fib(1)
      /   \
   fib(1) fib(0)

Each node computed exactly ONCE. Total: 11 calls vs ~25 calls without memo.
```

---

## 🛠️ JS Implementation Pattern

Every memoized solution follows this template:

```javascript
function solve(params, memo = {}) {
    // 1. Create a unique cache key from params
    const key = `${param1},${param2}`;

    // 2. Base case(s)
    if (baseCondition) return baseValue;

    // 3. Check cache
    if (memo[key] !== undefined) return memo[key];

    // 4. Compute answer recursively
    const result = /* recurrence using solve(smallerParams, memo) */;

    // 5. Store in cache before returning
    memo[key] = result;
    return result;
}
```

### Pattern with Array Memo (single integer state)

```javascript
function solve(n, memo = new Array(n + 1).fill(-1)) {
    if (n === 0) return 0;  // base case
    if (n === 1) return 1;  // base case
    if (memo[n] !== -1) return memo[n];  // cache check

    memo[n] = solve(n - 1, memo) + solve(n - 2, memo);
    return memo[n];
}
```

### Pattern with 2D Array Memo (two integer states)

```javascript
function solve(i, j, memo) {
    if (i === 0 || j === 0) return 0;  // base case
    if (memo[i][j] !== -1) return memo[i][j];

    if (a[i - 1] === b[j - 1]) {
        memo[i][j] = 1 + solve(i - 1, j - 1, memo);
    } else {
        memo[i][j] = Math.max(solve(i - 1, j, memo), solve(i, j - 1, memo));
    }
    return memo[i][j];
}

// Caller:
const m = a.length, n = b.length;
const memo = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(-1));
solve(m, n, memo);
```

---

## 🎯 Full Example: Climbing Stairs

**Problem:** You can climb 1 or 2 steps at a time. How many ways to reach step `n`?

```javascript
function climbStairs(n, memo = {}) {
    // Base cases
    if (n === 0) return 1;  // 1 way to stay at ground
    if (n < 0) return 0;    // invalid

    // Cache check
    if (memo[n] !== undefined) return memo[n];

    // Recurrence: reach n by stepping from n-1 or n-2
    memo[n] = climbStairs(n - 1, memo) + climbStairs(n - 2, memo);
    return memo[n];
}

console.log(climbStairs(5));  // 8
console.log(climbStairs(10)); // 89
```

**Call trace for climbStairs(4):**
```
climbStairs(4)
  ├── climbStairs(3)
  │     ├── climbStairs(2)
  │     │     ├── climbStairs(1)
  │     │     │     ├── climbStairs(0) → 1 [base]
  │     │     │     └── climbStairs(-1) → 0 [base]
  │     │     │     returns 1
  │     │     └── climbStairs(0) → 1 [base]
  │     │     returns 2  ← stored in memo[2]
  │     └── climbStairs(1) → 1 [memo hit!]
  │     returns 3  ← stored in memo[3]
  └── climbStairs(2) → 2 [memo hit!]
  returns 5
```

---

## 🔄 Full Example: Coin Change (Memoized)

**Problem:** Given coin denominations and target amount, find minimum coins needed.

```javascript
function coinChange(coins, amount) {
    const memo = new Map();

    function dp(remaining) {
        // Base cases
        if (remaining === 0) return 0;
        if (remaining < 0) return Infinity;

        // Cache check
        if (memo.has(remaining)) return memo.get(remaining);

        // Try each coin
        let minCoins = Infinity;
        for (const coin of coins) {
            const result = dp(remaining - coin);
            if (result !== Infinity) {
                minCoins = Math.min(minCoins, result + 1);
            }
        }

        memo.set(remaining, minCoins);
        return minCoins;
    }

    const answer = dp(amount);
    return answer === Infinity ? -1 : answer;
}

console.log(coinChange([1, 5, 6, 9], 11)); // 2 (5+6)
console.log(coinChange([2], 3));            // -1
```

---

## 📋 Memoization Complexity Analysis

| Code | States | Work per State | Total Time | Space |
|------|--------|----------------|------------|-------|
| Fibonacci | O(n) | O(1) | **O(n)** | O(n) |
| Climbing Stairs | O(n) | O(1) | **O(n)** | O(n) |
| Coin Change | O(amount) | O(coins) | **O(amount × coins)** | O(amount) |
| LCS | O(m×n) | O(1) | **O(m×n)** | O(m×n) |
| Knapsack | O(n×W) | O(1) | **O(n×W)** | O(n×W) |

**Rule of thumb:** `Time = (number of unique states) × (work per state transition)`

---

## ✅ When to Use Memoization

| Use Memoization When | Use Tabulation Instead When |
|---------------------|-----------------------------|
| Problem naturally maps to recursion | You need all subproblem values anyway |
| Not all subproblems are needed | Stack overflow risk with deep recursion |
| State transitions are complex | Space optimization (rolling array) needed |
| Easier to reason top-down | Iterative solution is simpler/cleaner |
| Tree-shaped subproblem structure | Table-like subproblem structure |

### Stack Overflow Warning

```javascript
// Deep recursion (n > 10,000) can hit JS call stack limit!
fib(100000); // RangeError: Maximum call stack size exceeded

// Fix: Use tabulation or iterative approach for large inputs
// Or use a trampoline / iterative DFS with explicit stack
```

---

## 🔑 Key Takeaways

- **Memoization = recursion + cache** — you only change ~3 lines of code from brute force
- Always check the cache **before** computing
- Always store in the cache **before** returning
- Use `-1` or `undefined` as the "not computed" sentinel (not `0` or `false`!)
- The **key** must uniquely identify every distinct subproblem state
- Time complexity = number of unique states × work per state

---

**Next:** [Tabulation (Bottom-Up DP)](/DSA-Notes-Problems/data-structures/dynamic-programming/03-tabulation) →
