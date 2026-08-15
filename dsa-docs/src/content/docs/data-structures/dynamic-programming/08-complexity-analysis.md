---
title: "DP — Complexity Analysis"
description: "Time and space complexity analysis for all DP problems, state-space analysis, space optimization techniques, and comparing DP vs alternative approaches."
sidebar:
  order: 8
practice:
  visualizer: /visualizer/dp
---

# DP — Complexity Analysis

## 📊 Complexity of Classic DP Problems

| Problem | States | Work per State | Total Time | Space | Optimized Space |
|---------|--------|---------------|------------|-------|-----------------|
| Fibonacci | O(n) | O(1) | O(n) | O(n) | O(1) |
| Climbing Stairs | O(n) | O(1) | O(n) | O(n) | O(1) |
| House Robber | O(n) | O(1) | O(n) | O(n) | O(1) |
| Kadane's (Max Subarray) | O(n) | O(1) | O(n) | O(n) | O(1) |
| Coin Change | O(amount) | O(coins) | O(amount × coins) | O(amount) | O(amount) |
| LIS (DP) | O(n) | O(n) | O(n²) | O(n) | O(n) |
| LIS (Patience) | O(n) | O(log n) | O(n log n) | O(n) | O(n) |
| Longest Palindromic Substring | O(n²) | O(1) | O(n²) | O(n²) | O(1) |
| Longest Palindromic Subseq | O(n²) | O(1) | O(n²) | O(n²) | O(n) |
| Word Break | O(n) | O(n) | O(n²) | O(n) | O(n) |
| Unique Paths | O(m×n) | O(1) | O(m×n) | O(m×n) | O(n) |
| 0/1 Knapsack | O(n×W) | O(1) | O(n×W) | O(n×W) | O(W) |
| Unbounded Knapsack | O(n×W) | O(1) | O(n×W) | O(W) | O(W) |
| LCS | O(m×n) | O(1) | O(m×n) | O(m×n) | O(min(m,n)) |
| Edit Distance | O(m×n) | O(1) | O(m×n) | O(m×n) | O(n) |
| Subset Sum | O(n×T) | O(1) | O(n×T) | O(T) | O(T) |
| Matrix Chain | O(n²) | O(n) | O(n³) | O(n²) | O(n²) |

---

## 🔬 The Complexity Formula

```
DP Time = Number of Unique States × Average Work per State Transition
DP Space = Number of Unique States (for the DP table)
```

### Dissecting the Formula

```javascript
// Example: Coin Change
function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    //         └──── states = amount + 1  (0..amount)
    dp[0] = 0;

    for (let a = 1; a <= amount; a++) {       // Outer: iterate all states
        for (const coin of coins) {            // Inner: work per state = O(coins)
            if (coin <= a) {
                dp[a] = Math.min(dp[a], dp[a - coin] + 1);
            }
        }
    }
    // Total = O(states × work) = O(amount × coins)
    return dp[amount];
}
```

**Key insight:** The outer loop(s) visit every unique state. The inner loop(s) do the work per state.

---

## 🚀 Space Optimization Techniques

### Technique 1: Rolling Variables (1D → O(1))

When `dp[i]` only depends on `dp[i-1]` and `dp[i-2]`:

```javascript
// Before: O(n) space
const dp = new Array(n + 1);
dp[0] = 0; dp[1] = 1;
for (let i = 2; i <= n; i++) dp[i] = dp[i-1] + dp[i-2];
return dp[n];

// After: O(1) space
let a = 0, b = 1;
for (let i = 2; i <= n; i++) {
    const c = a + b;
    a = b;
    b = c;
}
return b;
```

### Technique 2: Two Rows (2D → O(n))

When `dp[i][j]` only depends on `dp[i-1][...]` (previous row):

```javascript
// Before: O(m × n) space
const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
        dp[i][j] = recurrence(dp[i-1][j], dp[i][j-1], ...);
    }
}
return dp[m][n];

// After: O(n) space (two rows)
let prev = new Array(n + 1).fill(0);
let curr = new Array(n + 1).fill(0);
for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
        curr[j] = recurrence(prev[j], curr[j-1], prev[j-1]);
    }
    [prev, curr] = [curr, prev];  // swap rows
}
return prev[n];
```

### Technique 3: Single Array (2D → O(n) with Backward Iteration)

When `dp[i][w]` only depends on `dp[i-1][w-wt]` (previous row, smaller capacity):

```javascript
// Knapsack: O(W) space by iterating W backwards
const dp = new Array(W + 1).fill(0);
for (const item of items) {
    for (let w = W; w >= item.weight; w--) {  // ← backward!
        dp[w] = Math.max(dp[w], dp[w - item.weight] + item.value);
    }
}
return dp[W];
```

**Why backwards?** `dp[w - weight]` on the left hasn't been updated yet this iteration, so it correctly represents the previous row's value. Forward iteration would allow using the same item multiple times!

---

## ⚖️ DP vs Other Approaches

| Problem | Brute Force | Greedy | Divide & Conquer | DP |
|---------|-------------|--------|-----------------|-----|
| Fibonacci | O(2ⁿ) | ❌ | O(2ⁿ) | O(n) |
| Knapsack | O(2ⁿ) | ❌ fails | ❌ | O(n×W) |
| LCS | O(2^(m+n)) | ❌ | O(2^(m+n)) | O(m×n) |
| Climbing Stairs | O(2ⁿ) | ❌ | O(2ⁿ) | O(n) |
| Coin Change | O(coins^amt) | ❌ sometimes fails | ❌ | O(amt×coins) |
| Edit Distance | O(3^(m+n)) | ❌ | ❌ | O(m×n) |
| Matrix Chain | O(2ⁿ) | ❌ | ❌ | O(n³) |
| LIS | O(2ⁿ) | ❌ | O(2ⁿ) | O(n²) |
| Unique Paths | O(2^(m+n)) | ❌ | ❌ | O(m×n) |

---

## 🧮 When Time Complexity Can Be Deceptive

### Pseudo-Polynomial Time

Some DP algorithms have complexities that depend on **numerical values** rather than just input size:

```text
0/1 Knapsack:   O(n × W)
  - n = number of items (input size)
  - W = capacity (numerical value)
  - If W is represented in k bits, W can be up to 2^k
  - So O(n × W) = O(n × 2^k) = EXPONENTIAL in terms of bit length!
  - This is called "pseudo-polynomial" time

Subset Sum:     O(n × target)
  - Same issue — target can be exponential in bit representation
```

**Real-world implication:** These algorithms work great when W (capacity) or target sum is reasonably small, but fail for huge numeric values.

### When Not to Use DP

```text
DP is NOT suitable when:
❌ Subproblems are independent (use divide & conquer)
❌ Greedy works (use greedy — it's faster)
❌ The state space is huge (use approximation)
❌ W or target sum is astronomically large (pseudo-polynomial explosion)
❌ Input size is very small (O(n²) DP may be overkill)
```

---

## 💾 Memory Optimization Chart

```text
           Original      Optimized    Technique
           ────────      ────────     ─────────
Fibonacci    O(n)          O(1)       Rolling variables
Climbing Stairs O(n)       O(1)       Rolling variables
House Robber  O(n)         O(1)       Rolling variables
LCS          O(m×n)       O(n)        Two rows
Edit Distance O(m×n)      O(n)        Two rows
Unique Paths O(m×n)       O(n)        1D array
Knapsack     O(n×W)       O(W)        1D backward
LPS          O(n²)        O(n)        Two rows
Subset Sum   O(n×T)       O(T)        1D backward
```

---

## 🔹 Complexity by State Dimensions

```text
1D DP (single state variable)
├── Time usually: O(n) or O(n²)
├── Space usually: O(n) → O(1) possible
└── Examples: Fibonacci, Stairs, Robber, Coin Change

2D DP (two state variables)
├── Time usually: O(n×m) or O(n²) or O(n³)
├── Space usually: O(n×m) → O(m) or O(n) possible
└── Examples: LCS, Knapsack, Edit Distance, Grid DP

3D DP (three state variables — rare)
├── Time usually: O(n³) or higher
├── Space usually: O(n²) or O(n³)
└── Examples: Egg Dropping, Burst Balloons (interval dp)
```

---

## ⚡ Quick Complexity Reference Card

```text
FORMULA:
  Time  = (number of states) × (work per state transition)
  Space = size of DP table (before optimization)

RULES OF THUMB:
  n = length of input array/string
  k = number of choices at each state
  W = knapsack capacity
  T = target sum

  Iterating array once:     O(n), O(1) space
  Nested loop over array:   O(n²), O(n²) space → O(n) optimized
  Triple nested loop:       O(n³), O(n²) space → O(n²) optimized
  Loop over capacity:       pseudo-polynomial O(n×W) or O(n×T)

SPACE OPTIMIZATION:
  dp[i] depends on dp[i-1], dp[i-2]        → O(1) rolling variables
  dp[i][j] depends on previous row only    → O(n) two rows
  dp[i][w] depends on prev row + smaller w → O(W) single array (backwards)
  Need entire table for reconstruction     → Cannot optimize space
```

**Next:** [Interview Questions](/DSA-Notes-Problems/data-structures/dynamic-programming/09-interview-questions) →
