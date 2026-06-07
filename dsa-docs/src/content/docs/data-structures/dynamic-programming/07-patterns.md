---
title: "DP Patterns Guide"
description: "How to recognize and categorize any DP problem — pattern recognition guide with decision trees and recurrence templates."
sidebar:
  order: 7
---

# DP Patterns Guide

## 🎯 The DP Recognition Framework

When you see a problem, ask these questions in order:

```text
Step 1: Can I brute-force with recursion?
        ↓ Yes
Step 2: Do subproblems overlap? (Same inputs repeated?)
        ↓ Yes
Step 3: Does optimal substructure hold? (Best answer = best sub-answers?)
        ↓ Yes
Step 4: It's a DP problem!
        ↓
Step 5: Which pattern does it fit?
        ↓
Step 6: Apply the template
```

---

## 🔍 Pattern Recognition Decision Tree

```text
START: What's being optimized?
│
├── COUNTING problems ("how many ways...")
│   ├── Recurrence: Sum of subproblem results
│   │   └── dp[i] = dp[i-1] + dp[i-2] + ...
│   ├── Example: Climbing Stairs, Unique Paths
│   └── Template:
│       dp[0] = 1
│       for i = 1..n:
│           dp[i] = sum(dp[i - choices])
│
├── MIN/MAX problems ("minimum/maximum cost/value")
│   ├── Single array input?
│   │   ├── Can choose/not choose adjacent? ─────────→ HOUSE ROBBER PATTERN
│   │   │   dp[i] = max(dp[i-1], dp[i-2] + val[i])
│   │   ├── Can start fresh or extend? ──────────────→ KADANE'S PATTERN
│   │   │   dp[i] = max(val[i], dp[i-1] + val[i])
│   │   └── Need to try all previous splits? ─────────→ CUT/SPLIT PATTERN
│   │       dp[i] = min over j of dp[j] + cost(j+1..i)
│   │
│   ├── Two arrays/strings input?
│   │   ├── Match or skip? ──────────────────────────→ LCS PATTERN
│   │   │   if match: dp[i][j] = dp[i-1][j-1] + 1
│   │   │   else:     dp[i][j] = max(dp[i-1][j], dp[i][j-1])
│   │   └── Insert/delete/replace? ──────────────────→ EDIT DISTANCE PATTERN
│   │       if match: dp[i][j] = dp[i-1][j-1]
│   │       else: dp[i][j] = 1 + min(delete, insert, replace)
│   │
│   ├── Array + capacity/limit? ────────────────────→ KNAPSACK PATTERN
│   │   dp[i][c] = max(dp[i-1][c], dp[i-1][c-wt] + val)
│   │
│   └── Interval on array?
│       └── Solve for subarrays, combine ───────────→ INTERVAL DP PATTERN
│           dp[i][j] = max over k of dp[i][k] + dp[k][j] + cost
│
├── BOOLEAN problems ("can we achieve...")
│   ├── Subset sum / partition? ─────────────────────→ SUBSET PATTERN
│   │   dp[t] = dp[t] OR dp[t - num]
│   └── String segmentation? ───────────────────────→ WORD BREAK PATTERN
│       dp[i] = exists j where dp[j] AND s[j..i] in dict
│
└── STRING problems
    ├── Palindrome (contiguous)? ────────────────────→ EXPAND CENTER
    ├── Palindrome (subsequence)? ───────────────────→ INTERVAL DP
    └── Interleaving? ──────────────────────────────→ 2D MATCHING DP
```

---

## 🧩 The 7 DP Patterns (by Grokking)

### Pattern 1: Fibonacci Numbers

**Signature:** Each state depends on a fixed number of previous states.

| Example | Recurrence |
|---------|------------|
| Climbing Stairs | dp[i] = dp[i-1] + dp[i-2] |
| House Robber II | dp[i] = max(dp[i-1], dp[i-2] + nums[i-1]) |
| Fibonacci | dp[i] = dp[i-1] + dp[i-2] |
| Min Cost Climbing | dp[i] = cost[i] + min(dp[i-1], dp[i-2]) |

**Template:**
```javascript
// O(1) space version
let a = base1, b = base2;
for (let i = 3; i <= n; i++) {
    const c = recurrence(a, b);
    a = b;
    b = c;
}
return b;
```

---

### Pattern 2: 0/1 Knapsack

**Signature:** For each item, choose take or skip. Each item used at most once.

| Example | State |
|---------|-------|
| 0/1 Knapsack | dp[i][w] = max value using first i items, cap w |
| Subset Sum | dp[i][t] = can reach sum t using first i nums |
| Partition Equal Subset Sum | dp[t] = can reach sum t |
| Count of Subset Sum | dp[t] = number of ways to reach t |

**Template:**
```javascript
// 1D optimized
const dp = new Array(capacity + 1).fill(0);
for (const item of items) {
    for (let c = capacity; c >= item.weight; c--) {
        dp[c] = Math.max(dp[c], dp[c - item.weight] + item.value);
    }
}
```

---

### Pattern 3: Unbounded Knapsack

**Signature:** Each item can be used unlimited times.

| Example | Difference from 0/1 |
|---------|---------------------|
| Coin Change (min coins) | Iterate forward (not backward!) |
| Coin Change (combinations) | Outer loop over coins, inner loop target |
| Rod Cutting | dp[len] = max(dp[len], dp[len-cut] + price) |

**Template:**
```javascript
// Forward iteration (unbounded!)
const dp = new Array(capacity + 1).fill(0);
for (let c = 0; c <= capacity; c++) {
    for (const item of items) {
        if (item.weight <= c) {
            dp[c] = Math.max(dp[c], dp[c - item.weight] + item.value);
        }
    }
}
```

---

### Pattern 4: Palindromic Subsequence

**Signature:** Work with substrings — fill table by length, not by index.

| Example | Recurrence |
|---------|------------|
| Longest Palindromic Subsequence | match? dp[i+1][j-1] + 2 : max(dp[i+1][j], dp[i][j-1]) |
| Longest Palindromic Substring | dp[i][j] = (s[i]==s[j] && dp[i+1][j-1]) |

**Template:**
```javascript
const n = s.length;
const dp = Array.from({ length: n }, () => new Array(n).fill(false));

// All single chars are palindromes
for (let i = 0; i < n; i++) dp[i][i] = true;

// Fill by length
for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
        const j = i + len - 1;
        if (len === 2) {
            dp[i][j] = (s[i] === s[j]);
        } else {
            dp[i][j] = (s[i] === s[j] && dp[i + 1][j - 1]);
        }
    }
}
```

---

### Pattern 5: Longest Common Subsequence

**Signature:** Compare two sequences — match or skip.

**Variations:**
- **LCS**: `match? dp[i-1][j-1] + 1 : max(dp[i-1][j], dp[i][j-1])`
- **Shortest Common Supersequence**: `m + n - LCS`
- **Longest Increasing Subsequence** (not strictly DP): O(n log n) with patience sorting

---

### Pattern 6: Kadane's (Maximum Subarray)

**Signature:** Running maximum — continue or restart.

```javascript
let maxEnding = arr[0];
let maxSoFar = arr[0];
for (let i = 1; i < arr.length; i++) {
    maxEnding = Math.max(arr[i], maxEnding + arr[i]);
    maxSoFar = Math.max(maxSoFar, maxEnding);
}
return maxSoFar;
```

**Variations:**
- Maximum Subarray (standard)
- Maximum Circular Subarray
- Maximum Product Subarray (track both max and min)

**Maximum Product Subarray:**
```javascript
function maxProduct(nums) {
    let maxSoFar = nums[0];
    let maxEnding = nums[0];
    let minEnding = nums[0];  // track min too! (neg × neg = pos)

    for (let i = 1; i < nums.length; i++) {
        const temp = maxEnding;
        maxEnding = Math.max(nums[i], nums[i] * maxEnding, nums[i] * minEnding);
        minEnding = Math.min(nums[i], nums[i] * temp, nums[i] * minEnding);
        maxSoFar = Math.max(maxSoFar, maxEnding);
    }

    return maxSoFar;
}

console.log(maxProduct([2, 3, -2, 4]));  // 6 (2×3)
console.log(maxProduct([-2, 0, -1]));    // 0
```

---

### Pattern 7: Longest Increasing Subsequence (LIS)

**Signature:** Each element can extend the best previous increasing subsequence.

```javascript
function lengthOfLIS(nums) {
    const n = nums.length;
    if (n === 0) return 0;

    const dp = new Array(n).fill(1);
    let maxLen = 1;

    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        maxLen = Math.max(maxLen, dp[i]);
    }

    return maxLen;
}

// O(n log n) with patience sorting for LIS
function lengthOfLISOptimized(nums) {
    const tails = [];
    for (const num of nums) {
        let left = 0, right = tails.length;
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (tails[mid] < num) left = mid + 1;
            else right = mid;
        }
        tails[left] = num;
    }
    return tails.length;
}

console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])); // 4 (2,3,7,101)
```

---

## 🧪 Quick Identification Cheat Sheet

```text
Look at the recurrence pattern:

dp[i] = dp[i-1] + dp[i-2]              → FIBONACCI pattern (Climbing Stairs)
dp[i] = max(dp[i-1], dp[i-2] + val)    → HOUSE ROBBER pattern
dp[i] = max(val, dp[i-1] + val)        → KADANE'S pattern
dp[i] = min(dp[i-c] + 1)               → COIN CHANGE pattern
dp[i][w] = max(dp[i-1][w], +val)       → 0/1 KNAPSACK pattern
dp[i][j] = if-match: +1 else: max      → LCS pattern
dp[i][j] = 1 + min(delete, ins, rep)   → EDIT DISTANCE pattern
dp[i][j] = dp[i-1][j] + dp[i][j-1]     → UNIQUE PATHS (grid) pattern
dp[i][j] = combine intervals            → INTERVAL DP pattern
dp[t] = dp[t] OR dp[t - num]           → SUBSET SUM pattern

State dimension:
1D array → One variable (index i)
2D table → Two variables (i, j or i, w)
```

---

## 🎓 Practice: Identify the Pattern

Try to identify which DP pattern applies to each problem:

```text
A. "Given prices, find max profit from buying/selling stock with cooldown"
   → House Robber pattern (dp[i] = max(skip, buy/sell))
   
B. "Count number of ways to make change"
   → Unbounded Knapsack (combinations)

C. "Find minimum cost to split a string into valid words"
   → Word Break + min cost (1D split pattern)

D. "Find min cost to traverse a grid from top-left to bottom-right"
   → Grid DP (dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1]))

E. "Find longest chain of pairs where each pair ends before next starts"
   → LIS pattern (dp[i] = 1 + max(dp[j]) where pairs[j] fits before pairs[i])
```

---

## 🔑 Key Recognition Tricks

```
1. "How many ways..." → Counting DP (sum of choices)
2. "Min/max cost to..." → Optimization DP
3. "Two sequences/strings" → LCS or Edit Distance
4. "Items with weights/value" → Knapsack
5. "Choose or not choose" → Decision DP
6. "Split into parts" → Interval DP
7. "Grid traversal" → Grid DP
8. "House robber" = "non-adjacent elements" pattern
9. "Maximum subarray" = "Kadane's" pattern
10. "Infinite supply" = "unbounded" pattern
```

**Next:** [Complexity Analysis](/DSA-Notes-Problems/data-structures/dynamic-programming/08-complexity-analysis) →
