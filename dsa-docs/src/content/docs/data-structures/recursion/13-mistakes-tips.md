---
title: "Common Mistakes & Tips"
description: "Common recursion mistakes, debugging tips, optimization techniques, and cheat sheet."
sidebar:
  order: 14
---

# Common Mistakes & Tips

## Missing Base Case

```javascript
// ❌ WRONG — No base case → infinite recursion
function factorial(n) {
    return n * factorial(n - 1);  // What happens when n=0? Keeps going: -1, -2, -3...
}

// ✅ CORRECT
function factorial(n) {
    if (n <= 1) return 1;  // ← BASE CASE
    return n * factorial(n - 1);
}
```

## Infinite Recursion (Not Making Progress)

```javascript
// ❌ WRONG — n never changes!
function countdown(n) {
    if (n === 0) return;
    console.log(n);
    countdown(n);  // ← Should be countdown(n - 1)!
}

// ❌ WRONG — wrong direction
function sumUpTo(n) {
    if (n === 0) return 0;
    return n + sumUpTo(n + 1);  // ← Going AWAY from base case!
}
```

## Wrong State Handling in Backtracking

```javascript
// ❌ WRONG — Forgetting to undo the choice
function subsets(nums) {
    const result = [];
    function backtrack(index, current) {
        if (index === nums.length) {
            result.push([...current]);
            return;
        }
        current.push(nums[index]);
        backtrack(index + 1, current);
        // MISSING: current.pop()   ← BUG!
        backtrack(index + 1, current);
    }
    backtrack(0, []);
    return result;
}
```

## Storing Reference Instead of Copy

```javascript
// ❌ WRONG — All entries point to the SAME array!
result.push(current);

// ✅ CORRECT — Store a COPY
result.push([...current]);       // Spread operator
result.push(current.slice());    // Alternative
```

## Off-by-One in Index

```javascript
// ❌ WRONG — Starting from 0 generates duplicates
for (let i = 0; i < nums.length; i++) { ... }

// ✅ CORRECT — Start from 'start' to maintain order
for (let i = start; i < nums.length; i++) {
    backtrack(i + 1, current);  // ← i+1, not start+1
}
```

## Optimization Techniques

### 1. Memoization (Top-Down DP)

```javascript
function fibMemo(n, memo = new Map()) {
    if (memo.has(n)) return memo.get(n);
    if (n <= 1) return n;

    const result = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
    memo.set(n, result);
    return result;
}
// O(n) vs O(2ⁿ) — dramatic improvement!
```

### 2. Tail Recursion

```javascript
// Non-tail: O(n) stack
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

// Tail: O(n) stack without TCO, but could be O(1) with TCO
function factorialTail(n, acc = 1) {
    if (n <= 1) return acc;
    return factorialTail(n - 1, n * acc);
}
```

### 3. Effective Pruning

```javascript
// Sort first for better pruning
candidates.sort((a, b) => a - b);

// Then: if candidates[i] > remaining → break (not continue!)
if (candidates[i] > remaining) break;
```

### 4. Convert to Iteration When Appropriate

```javascript
// Recursive factorial → Iterative
function factorialIterative(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
}

// Recursive Fibonacci → Bottom-up DP
function fibIterative(n) {
    if (n <= 1) return n;
    let prev2 = 0, prev1 = 1;
    for (let i = 2; i <= n; i++) {
        [prev1, prev2] = [prev1 + prev2, prev1];
    }
    return prev1;
}
// O(n) time, O(1) space — best possible!
```

## When to Convert Recursion to Iteration

| Convert to iteration when... | Keep as recursion when... |
|-----------------------------|--------------------------|
| Simple linear recursion | Tree/graph traversal |
| Risk of stack overflow (n > 10000) | Problem is naturally recursive |
| Performance is critical | Backtracking problems |
| No TCO support | Code clarity matters |

## Memoization vs Tabulation

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   MEMOIZATION (Top-Down)         TABULATION (Bottom-Up) │
│                                                         │
│   Start with the big problem     Start with base cases  │
│   Recursion + cache              Iteration + table      │
│   Lazy: only computes needed     Eager: computes all    │
│   May have stack overhead        No recursion overhead  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Cheat Sheet

```
┌────────────────────────────────────────────────────────────────────┐
│                    RECURSION CHEAT SHEET                           │
│                                                                    │
│  EVERY recursive function needs:                                   │
│    1. BASE CASE (when to stop)                                     │
│    2. RECURSIVE CASE (call self with smaller input)                │
│    3. PROGRESS toward base case                                    │
│                                                                    │
│  BACKTRACKING template:                                            │
│    for each choice:                                                │
│        if valid:                                                   │
│            MAKE choice                                             │
│            RECURSE                                                 │
│            UNDO choice ← THE KEY STEP                              │
│                                                                    │
│  COMMON PATTERNS:                                                  │
│    Pick/Not-Pick    → Subsets, Subsequences                        │
│    Loop + Recurse   → Permutations, Combinations                   │
│    Grid DFS         → Word Search, Maze, Islands                   │
│    Constraint Check → N-Queens, Sudoku                             │
│                                                                    │
│  COMPLEXITY:                                                       │
│    Subsets:       O(2ⁿ)        Permutations:   O(n!)               │
│    Combination:   O(2ᵗ)        N-Queens:       O(n!)               │
│                                                                    │
│  REMEMBER:                                                         │
│    ✓ Always store COPIES in results: [...current]                  │
│    ✓ Always UNDO after recursive call                              │
│    ✓ Trust the recursion — think about ONE level                   │
│    ✓ Draw the decision tree for clarity                            │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

---

**Next:** [Real-World Applications](/DSA-Notes-Problems/data-structures/recursion/14-applications) →
