---
title: "Dynamic Programming — Interview Questions"
description: "15+ interview questions on dynamic programming covering concepts, pattern recognition, problem-solving, and coding with detailed answers."
sidebar:
  order: 9
---

# Dynamic Programming — Interview Questions

## 📋 Quick Reference

| # | Question | Pattern | Difficulty |
|---|----------|---------|------------|
| 1 | [What is DP? When do you use it?](#q1-what-is-dynamic-programming-and-when-do-you-use-it) | Concept | Easy |
| 2 | [Memoization vs Tabulation](#q2-what-is-the-difference-between-memoization-and-tabulation) | Concept | Easy |
| 3 | [Overlapping Subproblems vs Optimal Substructure](#q3-explain-overlapping-subproblems-and-optimal-substructure-with-examples) | Concept | Medium |
| 4 | [3 steps to solve any DP problem](#q4-what-are-the-3-steps-to-solve-any-dp-problem) | Framework | Easy |
| 5 | [Climbing Stairs variations](#q5-solve-climbing-stairs-and-its-variations) | Fibonacci | Easy |
| 6 | [House Robber with circular houses](#q6-solve-house-robber-with-houses-in-a-circle) | House Robber | Medium |
| 7 | [Explain Kadane's Algorithm](#q7-explain-kadanes-algorithm-with-an-example) | Kadane's | Medium |
| 8 | [Coin Change — min vs number of ways](#q8-whats-the-difference-between-coin-change-minimum-coins-and-coin-change-combinations) | Unbounded Knapsack | Medium |
| 9 | [0/1 Knapsack and its space optimization](#q9-explain-the-01-knapsack-problem-and-how-to-optimize-its-space) | Knapsack | Medium |
| 10 | [LCS and Edit Distance similarity](#q10-how-is-lcs-related-to-edit-distance) | String DP | Hard |
| 11 | [Why is building a DP table O(n) for some problems but O(n²) for others?](#q11-why-is-some-dp-on-and-other-dp-on²) | Complexity | Medium |
| 12 | [DP vs Greedy vs Divide & Conquer](#q12-when-would-you-use-dp-instead-of-greedy-or-divide-and-conquer) | Comparison | Medium |
| 13 | [Word Break II (return all sentences)](#q13-solve-word-break-ii-return-all-possible-sentences) | String DP | Hard |
| 14 | [Partition Equal Subset Sum](#q14-solve-partition-equal-subset-sum) | Knapsack | Medium |
| 15 | [Maximum Product Subarray](#q15-solve-maximum-product-subarray) | Kadane's | Medium |
| 16 | [Egg Dropping Problem](#q16-solve-the-egg-dropping-problem) | 2D DP | Hard |
| 17 | [How to identify DP in an interview?](#q17-how-do-you-quickly-identify-that-a-problem-can-be-solved-with-dp) | Strategy | Easy |

---

## Q1: What Is Dynamic Programming and When Do You Use It?

**Question:** Define Dynamic Programming and explain when you would choose to use it.

**Answer:** Dynamic Programming is a technique that solves complex problems by breaking them into overlapping subproblems, solving each subproblem only once, and storing the results for later reuse.

**Use DP when the problem has both:**
1. **Overlapping subproblems** — same subproblems are solved repeatedly
2. **Optimal substructure** — the optimal solution can be built from optimal solutions to subproblems

**Signals that suggest DP:**
- "How many ways to..." (counting)
- "Minimum/maximum cost to..." (optimization)
- "Can we achieve..." (feasibility)
- "Longest/shortest subsequence"
- Decision choices at each step (take/skip, left/right)

**Anti-patterns (NOT DP):**
- Subproblems are independent → use Divide & Conquer
- Greedy always works → greedy is faster
- Problem involves finding actual path (BFS/DFS instead)
- Input is very small (brute force is sufficient)

---

## Q2: What Is the Difference Between Memoization and Tabulation?

**Question:** Compare and contrast top-down (memoization) and bottom-up (tabulation) DP approaches.

**Answer:**

| Aspect | Memoization (Top-Down) | Tabulation (Bottom-Up) |
|--------|------------------------|------------------------|
| **Direction** | Big → small | Small → big |
| **Implementation** | Recursion + cache | Iterative loops + table |
| **Subproblems solved** | Only needed ones | ALL subproblems |
| **Stack overflow risk** | Yes (deep recursion) | No |
| **Space optimization** | Harder | Easy (rolling arrays) |
| **Performance** | Slightly slower (hash lookups) | Faster (direct array access) |
| **Debugging** | Easier to trace | Harder to trace |
| **Choose when** | Sparse subproblem graph | Dense/all subproblems needed |

**Example — Fibonacci:**

```javascript
// Memoization (top-down)
function fibMemo(n, memo = {}) {
    if (n <= 1) return n;
    if (memo[n] !== undefined) return memo[n];
    memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
    return memo[n];
}

// Tabulation (bottom-up)
function fibTab(n) {
    if (n <= 1) return n;
    const dp = new Array(n + 1);
    dp[0] = 0; dp[1] = 1;
    for (let i = 2; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2];
    return dp[n];
}
```

---

## Q3: Explain Overlapping Subproblems and Optimal Substructure with Examples

**Question:** What are overlapping subproblems and optimal substructure? Give examples of problems that have these properties and one that doesn't.

**Answer:**

### Overlapping Subproblems

Same subproblem is solved multiple times during recursion.

**✅ Fibonacci (overlapping):**
```text
fib(5) calls fib(4) and fib(3)
  fib(4) calls fib(3) and fib(2)  → fib(3) called AGAIN!
```
`fib(3)` is computed twice — overlapping!

**❌ Binary Search (NOT overlapping):**
```text
binarySearch(arr, 5, 0, 9)
  → binarySearch(arr, 5, 0, 4)   // search left half
  → binarySearch(arr, 5, 6, 9)   // search right half
```
Each subarray is unique — no overlap.

### Optimal Substructure

The optimal solution of the whole problem includes optimal solutions to subproblems.

**✅ Shortest Path (has optimal substructure):**
```text
If the shortest path from A to D is A→B→C→D,
then the shortest path from B to D is B→C→D.
The subpath of an optimal path is ALSO optimal. ✓
```

**❌ Longest Simple Path (NOT optimal substructure):**
```text
D → C → B → A (longest path from D to A going only right)
The subpath from D to B is D→C→B, but the longest path 
from D to B might be D→E→F→B — completely different!
```

---

## Q4: What Are the 3 Steps to Solve Any DP Problem?

**Question:** Describe the 3-step framework for solving DP problems.

**Answer:**

```text
Step 1: IDENTIFY THE STATE
  - What information uniquely describes a subproblem?
  - Ask: "What varies between function calls?"
  - Examples: dp[i], dp[i][j], dp[i][w], dp[l][r]

Step 2: WRITE THE RECURRENCE
  - How does the answer for state X depend on smaller states?
  - Ask: "What choices do I have at each step?"
  - Examples: dp[i] = dp[i-1] + dp[i-2], dp[i] = max(dp[i-1], dp[i-2] + val)

Step 3: DEFINE BASE CASES
  - What are the smallest, trivially solvable subproblems?
  - Examples: dp[0] = 0, dp[1] = 1, dp[i][0] = 0
```

**Pro tip:** The number of state variables = number of nested loops = dimension of DP table.

---

## Q5: Solve Climbing Stairs and Its Variations

**Question:** You can climb 1 or 2 steps. Find ways to reach step n. Now extend: what if you could take 1, 2, or 3 steps? What about minimum cost to reach the top where each step has a cost?

**Answer:**

### Basic version (1 or 2 steps): Fibonacci pattern

```javascript
function climbStairs(n) {
    if (n <= 2) return n;
    let a = 1, b = 2;
    for (let i = 3; i <= n; i++) {
        [a, b] = [b, a + b];
    }
    return b;
}
```

### Variation 1: Can take 1, 2, or 3 steps

```javascript
function climbStairs3(n) {
    if (n <= 1) return 1;
    if (n === 2) return 2;
    let a = 1, b = 1, c = 2;  // dp[0], dp[1], dp[2]
    for (let i = 3; i <= n; i++) {
        const curr = a + b + c;  // dp[i] = dp[i-1] + dp[i-2] + dp[i-3]
        a = b;
        b = c;
        c = curr;
    }
    return c;
}
```

### Variation 2: Min Cost Climbing Stairs

```javascript
function minCostClimbingStairs(cost) {
    const n = cost.length;
    let a = cost[0], b = cost[1];  // dp[0], dp[1]
    for (let i = 2; i < n; i++) {
        const c = cost[i] + Math.min(a, b);
        a = b;
        b = c;
    }
    return Math.min(a, b);
}

console.log(minCostClimbingStairs([10, 15, 20]));       // 15
console.log(minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])); // 6
```

---

## Q6: Solve House Robber with Houses in a Circle

**Question:** Houses are arranged in a circle (first and last are adjacent). Find max amount to rob without alerting police.

**Answer:**

```javascript
function rob(nums) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];

    // Helper: standard House Robber on linear array
    function robLinear(arr) {
        let prev2 = 0, prev1 = 0;
        for (const num of arr) {
            const curr = Math.max(prev1, prev2 + num);
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }

    // Case 1: Rob houses 0 to n-2 (exclude last)
    // Case 2: Rob houses 1 to n-1 (exclude first)
    return Math.max(
        robLinear(nums.slice(0, nums.length - 1)),
        robLinear(nums.slice(1))
    );
}

console.log(rob([2, 3, 2]));       // 3 (rob house 1 only)
console.log(rob([1, 2, 3, 1]));   // 4 (rob houses 0 and 2 = 1+3)
```

**Key insight:** Since house 0 and house n-1 are adjacent (circular), we solve it twice: once excluding the last house, once excluding the first. Take the max.

---

## Q7: Explain Kadane's Algorithm with an Example

**Question:** Explain Kadane's Algorithm for the Maximum Subarray problem.

**Answer:**

```javascript
function maxSubArray(nums) {
    let maxEnding = nums[0];  // Best sum ending at current position
    let maxSoFar = nums[0];   // Best sum seen overall

    for (let i = 1; i < nums.length; i++) {
        // Either extend current subarray, or start fresh from here
        maxEnding = Math.max(nums[i], maxEnding + nums[i]);
        maxSoFar = Math.max(maxSoFar, maxEnding);
    }

    return maxSoFar;
}
```

**Walkthrough:** `[-2, 1, -3, 4, -1, 2, 1, -5, 4]`

```text
i=0: maxEnding=-2, maxSoFar=-2
i=1: maxEnding=max(1, -2+1)=1,         maxSoFar=max(-2,1)=1
i=2: maxEnding=max(-3, 1-3)=-2,        maxSoFar=max(1,-2)=1
i=3: maxEnding=max(4, -2+4)=4,         maxSoFar=max(1,4)=4
i=4: maxEnding=max(-1, 4-1)=3,         maxSoFar=max(4,3)=4
i=5: maxEnding=max(2, 3+2)=5,          maxSoFar=max(4,5)=5
i=6: maxEnding=max(1, 5+1)=6,          maxSoFar=max(5,6)=6  ← answer
i=7: maxEnding=max(-5, 6-5)=1,         maxSoFar=max(6,1)=6
i=8: maxEnding=max(4, 1+4)=5,          maxSoFar=max(6,5)=6

Answer: 6 (subarray [4, -1, 2, 1])
```

**Why it's DP:** `dp[i] = max(nums[i], dp[i-1] + nums[i])` — either start a new subarray at i, or extend the previous best.

**Time:** O(n) | **Space:** O(1)

---

## Q8: What's the Difference Between Coin Change (Minimum Coins) and Coin Change (Combinations)?

**Question:** Compare the two Coin Change variants — minimum coins vs number of combinations.

**Answer:**

### Minimum Coins (Unbounded Knapsack — Min)

```javascript
function coinChangeMin(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    for (let a = 1; a <= amount; a++) {
        for (const coin of coins) {
            if (coin <= a) {
                dp[a] = Math.min(dp[a], dp[a - coin] + 1);
            }
        }
    }

    return dp[amount] === Infinity ? -1 : dp[amount];
}
```

**Order of loops:** Amount-outer, coins-inner (tries all orders)

### Number of Combinations (Unbounded Knapsack — Count)

```javascript
function coinChangeCombinations(coins, amount) {
    const dp = new Array(amount + 1).fill(0);
    dp[0] = 1;

    for (const coin of coins) {           // ← Different order!
        for (let a = coin; a <= amount; a++) {
            dp[a] += dp[a - coin];
        }
    }

    return dp[amount];
}
```

**Order of loops:** Coins-outer, amount-inner (each coin considered once, avoiding duplicates like 1+2 vs 2+1)

### Key Difference

```text
Min coins:  amount=5, coins=[1,2,5]
  dp[1]=1, dp[2]=1, dp[3]=2, dp[4]=2, dp[5]=1
  Answer: dp[5] = 1 (just [5])

Combinations: amount=5, coins=[1,2,5]
  dp[1]=1, dp[2]=2, dp[3]=2, dp[4]=3, dp[5]=4
  Answer: dp[5] = 4 (ways: [5], [2,2,1], [2,1,1,1], [1,1,1,1,1])

The loop order controls whether permutations are counted separately!
```

---

## Q9: Explain the 0/1 Knapsack Problem and How to Optimize its Space

**Question:** Explain 0/1 Knapsack and how to reduce space from O(n×W) to O(W).

**Answer:**

```javascript
function knapsack(values, weights, W) {
    const dp = new Array(W + 1).fill(0);

    for (let i = 0; i < values.length; i++) {
        // Iterate W BACKWARDS to avoid reusing the same item
        for (let w = W; w >= weights[i]; w--) {
            dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
        }
    }

    return dp[W];
}
```

**Why backwards?**
```text
dp[w] depends on dp[w - weight[i]] from the PREVIOUS row.
If we go forward:
  dp[3] updates using dp[3-2] = dp[1] which was UPDATED this iteration
  → item is counted twice! (0/1 violated)

If we go backward:
  dp[8] uses dp[8-5] = dp[3] which hasn't been updated yet
  → correctly uses previous row's value ✓
```

---

## Q10: How Is LCS Related to Edit Distance?

**Question:** Explain the relationship between Longest Common Subsequence (LCS) and Edit Distance.

**Answer:**

Both use a 2D DP table with the same structure. Edit Distance is a generalization of LCS.

```text
LCS:  if chars match: dp[i-1][j-1] + 1
      else:           max(dp[i-1][j], dp[i][j-1])

Edit Distance:  if chars match: dp[i-1][j-1]
                else:           1 + min(delete, insert, replace)
```

**Relationship:** For two strings of length m and n:
- LCS = longest common subsequence length
- Edit Distance = (m + n - 2 × LCS) if only insert/delete allowed (no replace)

**Proof:** To convert A to B with only insert/delete:
1. Keep the LCS (don't modify those characters)
2. Delete the (m - LCS) characters from A not in LCS
3. Insert the (n - LCS) characters to B not in LCS
4. Total = m + n - 2 × LCS

---

## Q11: Why Is Some DP O(n) and Other DP O(n²)?

**Question:** Why do some DP problems run in O(n) while others are O(n²)?

**Answer:** The time complexity equals **number of states × work per state**.

```text
O(n) DP examples:
  Fibonacci:      n states, O(1) work per state
  House Robber:   n states, O(1) work per state
  Kadane's:       n states, O(1) work per state
  → Only 1 loop, each step is O(1)

O(n²) DP examples:
  LIS:            n states, O(n) work per state (check all previous)
  Longest Palindrome: n² states, O(1) work per state
  Word Break:     n states, O(n) work per state (check all splits)
  → Either 2 nested loops, or 1 loop with O(n) inner work

O(n³) DP examples:
  Matrix Chain:   n² states, O(n) work per state (try all split points)
  → 3 nested loops
```

---

## Q12: When Would You Use DP Instead of Greedy or Divide and Conquer?

**Question:** Compare DP, Greedy, and Divide & Conquer. When would you choose each?

**Answer:**

| Criteria | DP | Greedy | Divide & Conquer |
|----------|-----|--------|-----------------|
| **Overlapping subproblems** | ✅ Yes | ❌ No | ❌ No |
| **Optimal substructure** | ✅ Yes | ✅ Yes (local = global) | ✅ Yes |
| **Guarantees optimal?** | ✅ Always | ❌ Not always | ✅ Always |
| **Time complexity** | Polynomial | Linear/Log | Polynomial |
| **When to use** | Overlapping subproblems | Local choice → global optimum | Independent subproblems |

**Examples:**
- **DP:** Knapsack, LCS, Edit Distance (local choices are uncertain, need to try all)
- **Greedy:** Activity Selection, Huffman Coding, Dijkstra's (local choice is always safe)
- **Divide & Conquer:** Merge Sort, Quick Sort, Binary Search (subproblems are independent)

---

## Q13: Solve Word Break II (Return All Possible Sentences)

**Question:** Given a string and a dictionary, return all possible sentences formed by segmenting the string with dictionary words.

**Answer:** This is Word Break + Backtracking with memoization.

```javascript
function wordBreak(s, wordDict) {
    const wordSet = new Set(wordDict);
    const memo = new Map();  // key: start index → [sentences]

    function dfs(start) {
        if (start === s.length) return [""];
        if (memo.has(start)) return memo.get(start);

        const sentences = [];

        for (let end = start + 1; end <= s.length; end++) {
            const word = s.substring(start, end);
            if (wordSet.has(word)) {
                const subSentences = dfs(end);
                for (const sub of subSentences) {
                    sentences.push(sub ? word + " " + sub : word);
                }
            }
        }

        memo.set(start, sentences);
        return sentences;
    }

    return dfs(0);
}

console.log(wordBreak("catsanddog", ["cat", "cats", "and", "sand", "dog"]));
// ["cat sand dog", "cats and dog"]

console.log(wordBreak("pineapplepenapple", ["apple", "pen", "applepen", "pine", "pineapple"]));
// ["pine apple pen apple", "pineapple pen apple", "pine applepen apple"]
```

**Time:** O(2ⁿ) worst case (exponential in number of possible segmentations) | **Space:** O(n × k) for memo

---

## Q14: Solve Partition Equal Subset Sum

**Question:** Given an integer array, return true if it can be partitioned into two subsets with equal sum.

**Answer:** This is a variant of Subset Sum (0/1 Knapsack). Total must be even, then find subset with sum = total/2.

```javascript
function canPartition(nums) {
    const total = nums.reduce((a, b) => a + b, 0);
    if (total % 2 !== 0) return false;  // Odd total can't be split equally

    const target = total / 2;
    const dp = new Array(target + 1).fill(false);
    dp[0] = true;

    for (const num of nums) {
        for (let t = target; t >= num; t--) {
            dp[t] = dp[t] || dp[t - num];
        }
    }

    return dp[target];
}

console.log(canPartition([1, 5, 11, 5]));  // true ([1,5,5] + [11])
console.log(canPartition([1, 2, 3, 5]));   // false
```

**Time:** O(n × target) where target = total/2 | **Space:** O(target)

---

## Q15: Solve Maximum Product Subarray

**Question:** Find the contiguous subarray with the largest product in an integer array.

**Answer:** Like Kadane's, but track both max and min (because a negative × negative = positive).

```javascript
function maxProduct(nums) {
    let maxSoFar = nums[0];
    let maxEnding = nums[0];
    let minEnding = nums[0];

    for (let i = 1; i < nums.length; i++) {
        const temp = maxEnding;
        maxEnding = Math.max(nums[i], nums[i] * maxEnding, nums[i] * minEnding);
        minEnding = Math.min(nums[i], nums[i] * temp, nums[i] * minEnding);
        maxSoFar = Math.max(maxSoFar, maxEnding);
    }

    return maxSoFar;
}

console.log(maxProduct([2, 3, -2, 4]));   // 6 (2×3)
console.log(maxProduct([-2, 0, -1]));     // 0
console.log(maxProduct([-2, 3, -4]));     // 24 (-2×3×-4)
```

**Time:** O(n) | **Space:** O(1)

---

## Q16: Solve the Egg Dropping Problem

**Question:** Given `k` eggs and `n` floors, find the minimum number of attempts needed in the worst case to find the critical floor (where eggs start breaking).

**Answer:**

```javascript
function eggDrop(k, n) {
    // dp[e][f] = min attempts with e eggs, f floors
    const dp = Array.from({ length: k + 1 }, () => new Array(n + 1).fill(0));

    // Base: 1 egg → need f attempts (try floor 1, 2, 3...)
    for (let f = 1; f <= n; f++) dp[1][f] = f;

    // Base: 0 or 1 floor
    for (let e = 1; e <= k; e++) {
        dp[e][0] = 0;  // 0 floors → 0 attempts
        dp[e][1] = 1;  // 1 floor  → 1 attempt
    }

    for (let e = 2; e <= k; e++) {
        for (let f = 2; f <= n; f++) {
            dp[e][f] = Infinity;

            // Try dropping from each floor x
            // If breaks: e-1 eggs, x-1 floors below
            // If doesn't: e eggs, f-x floors above
            for (let x = 1; x <= f; x++) {
                const attempts = 1 + Math.max(dp[e - 1][x - 1], dp[e][f - x]);
                dp[e][f] = Math.min(dp[e][f], attempts);
            }
        }
    }

    return dp[k][n];
}

// Example: 2 eggs, 100 floors → 14 attempts
console.log(eggDrop(2, 100));  // 14
```

**Optimization using binary search:** The inner x-loop can be replaced with binary search (O(n² log n) → O(kn log n)).

**Time:** O(k × n²) | **Space:** O(k × n)

---

## Q17: How Do You Quickly Identify That a Problem Can Be Solved with DP?

**Question:** In an interview, what's your thought process for identifying DP problems?

**Answer:**

```text
ALGORITHM TO IDENTIFY DP:

1. Can I write a brute-force recursion?
   - Try to express the problem as: solve(problem) = f(solve(smallerProblem))
   
2. Are arguments repeated?
   - Draw a small recursion tree
   - If the same calls appear multiple times → Overlapping subproblems ✓
   
3. Does the problem ask for:
   - Count of ways? → Counting DP
   - Min or max? → Optimization DP
   - Can we achieve? → Feasibility DP
   
4. What are my choices at each step?
   - Take or skip? → Knapsack
   - Which direction? → Grid DP
   - Which split point? → Interval DP
   - Extend or start fresh? → Kadane's
   - Which operation? → Edit Distance

5. Can I define the state?
   - dp[i] = answer for first i elements
   - dp[i][j] = answer for subarray i..j
   - dp[i][j] = answer for first i of A, first j of B
   
   If you can define the state → You can write the recurrence → It's DP!
```

---

## 💡 Quick Interview Cheat Sheet

```text
Must-Know Facts for DP Interviews:

1. DP = recursion with a cache (memoization) or iterative table (tabulation)
2. Two requirements: overlapping subproblems + optimal substructure
3. Time = states × work per state transition
4. Space optimization: rolling variables (O(n)→O(1)), two rows (O(mn)→O(n)), backward iteration
5. 0/1 Knapsack → iterate W backwards. Unbounded → iterate W forward.
6. Min Coin Change → amount outer, coins inner. Combinations → coins outer, amount inner.
7. LCS and Edit Distance share the same DP table structure
8. Kadane's tracks both max and min for Product Subarray
9. House Robber II (circular) = max(rob(0,n-2), rob(1,n-1))
10. Pseudo-polynomial: Knapsack and Subset Sum depend on numerical values, not just input size

Common State Dimensions:
  1D: dp[i]     → array problems (i = index)
  2D: dp[i][j]  → string/2-array problems (i, j = indices in both)
  2D: dp[l][r]  → interval problems (l = left, r = right bound)
  2D: dp[i][w]  → knapsack problems (i = items, w = capacity)
```

**Next:** Back to [DP Overview](/DSA-Notes-Problems/data-structures/dynamic-programming) →
