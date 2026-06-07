---
title: "Coin Change"
description: "Detailed walkthrough of Coin Change — minimum coins, number of combinations, number of permutations, and the critical loop-order insight."
sidebar:
  order: 3
---

# Coin Change

## 🎯 Problem Statement — Minimum Coins

You are given an array `coins` representing denominations and an integer `amount`. Find the **minimum number of coins** needed to make that amount. If impossible, return `-1`. You may use each coin **unlimited times** (unbounded knapsack).

**Example:**
```
Input:  coins = [1, 2, 5], amount = 11
Output: 3

Explanation: 11 = 5 + 5 + 1 (3 coins)
```

```
Input:  coins = [2], amount = 3
Output: -1

Explanation: Impossible to make amount 3 with only coin 2.
```

---

## 🧠 Step 1: Identify the State

```
dp[a] = minimum coins needed to make amount a
```

The state is the **remaining amount** we need to make. We try each coin denomination.

---

## 🔗 Step 2: Write the Recurrence

```
For each coin c:
  dp[a] = min(dp[a], dp[a - c] + 1)

To make amount a, try using coin c:
  1. Use 1 coin of denomination c
  2. We now need to make amount (a - c) using any coins
  3. The total coins = 1 + dp[a - c]
  4. Take the minimum across all coin choices
```

---

## 🏁 Step 3: Define Base Cases

```
dp[0] = 0                 (0 coins needed to make amount 0)
dp[a] = Infinity          (all others start as "impossible")
```

---

## 💻 Approach 1: Tabulation — O(amount × coins) time, O(amount) space

```javascript
function coinChange(coins, amount) {
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

console.log(coinChange([1, 2, 5], 11));   // 3
console.log(coinChange([2], 3));           // -1
console.log(coinChange([1], 0));           // 0
```

### DP Table Walkthrough: coins=[1,2,5], amount=6

```text
dp[0] = 0  (base)

Amount 1: try 1→ dp[0]+1=1,  try 2→skip,  try 5→skip → dp[1]=1
Amount 2: try 1→ dp[1]+1=2,  try 2→dp[0]+1=1,  try 5→skip → dp[2]=1
Amount 3: try 1→ dp[2]+1=2,  try 2→dp[1]+1=2,  try 5→skip → dp[3]=2
Amount 4: try 1→ dp[3]+1=3,  try 2→dp[2]+1=2,  try 5→skip → dp[4]=2
Amount 5: try 1→ dp[4]+1=3,  try 2→dp[3]+1=3,  try 5→dp[0]+1=1 → dp[5]=1
Amount 6: try 1→ dp[5]+1=2,  try 2→dp[4]+1=3,  try 5→dp[1]+1=2 → dp[6]=2

Answer: dp[6] = 2 (5+1)
```

---

## 💻 Approach 2: Memoization — O(amount × coins) time, O(amount) space

```javascript
function coinChange(coins, amount) {
    const memo = new Map();

    function dp(remaining) {
        // Base cases
        if (remaining === 0) return 0;
        if (remaining < 0) return Infinity;

        // Cache check
        if (memo.has(remaining)) return memo.get(remaining);

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
```

---

## 🎯 Variation 1: Number of Combinations (Not Minimum)

**Problem:** Count the number of **combinations** of coins that sum to `amount`. Order doesn't matter (1+2 and 2+1 count as the same combination).

```javascript
function coinChangeCombinations(coins, amount) {
    const dp = new Array(amount + 1).fill(0);
    dp[0] = 1;  // 1 way to make amount 0 (use no coins)

    for (const coin of coins) {            // ← Coins OUTER loop
        for (let a = coin; a <= amount; a++) {  // Amount INNER loop
            dp[a] += dp[a - coin];
        }
    }

    return dp[amount];
}

console.log(coinChangeCombinations([1, 2, 5], 5)); // 4
// Ways: 5, 2+2+1, 2+1+1+1, 1+1+1+1+1
```

### Key Insight: Why Coins Outer?

```text
Coins OUTER loop:
  Process each coin ONCE — prevents counting 1+2 and 2+1 as different.
  
Step 1: Process coin=1
  dp[1]=1, dp[2]=1, dp[3]=1, dp[4]=1, dp[5]=1
  → Only using coin 1: [1], [1,1], [1,1,1], ...

Step 2: Process coin=2
  dp[2] += dp[0] = 1 (new: [2])
  dp[3] += dp[1] = 1 (new: [2,1])
  dp[4] += dp[2] = 2 (new: [2,2], [2,1,1])
  dp[5] += dp[3] = 2 (new: [2,2,1], [2,1,1,1])

Step 3: Process coin=5
  dp[5] += dp[0] = 1 (new: [5])
  → dp[5] = 4 total
```

---

## 🎯 Variation 2: Number of Permutations (Order Matters)

**Problem:** Count the number of **permutations** of coins that sum to `amount`. Order matters (1+2 and 2+1 count separately).

```javascript
function coinChangePermutations(coins, amount) {
    const dp = new Array(amount + 1).fill(0);
    dp[0] = 1;

    for (let a = 1; a <= amount; a++) {     // ← Amount OUTER loop
        for (const coin of coins) {          // ← Coins INNER loop
            if (coin <= a) {
                dp[a] += dp[a - coin];
            }
        }
    }

    return dp[amount];
}

console.log(coinChangePermutations([1, 2, 5], 5)); // 9
// Ways: 5, 2+2+1, 2+1+2, 1+2+2, 2+1+1+1, 1+2+1+1, 1+1+2+1, 1+1+1+2, 1+1+1+1+1
```

### Loop Order Cheat Sheet

```text
MINIMUM coins:    Amount outer, Coins inner  →  dp[a] = min(dp[a], dp[a-c] + 1)
COMBINATIONS:     Coins outer, Amount inner  →  dp[a] += dp[a-c]   (each coin group used once)
PERMUTATIONS:     Amount outer, Coins inner  →  dp[a] += dp[a-c]   (all orderings counted)
```

---

## 🎯 Variation 3: Perfect Squares

**Problem:** Given an integer `n`, return the least number of perfect square numbers (1, 4, 9, 16, ...) that sum to `n`.

This is Coin Change with perfect squares as the "coins".

```javascript
function numSquares(n) {
    const squares = [];
    for (let i = 1; i * i <= n; i++) {
        squares.push(i * i);
    }

    const dp = new Array(n + 1).fill(Infinity);
    dp[0] = 0;

    for (let a = 1; a <= n; a++) {
        for (const sq of squares) {
            if (sq <= a) {
                dp[a] = Math.min(dp[a], dp[a - sq] + 1);
            }
        }
    }

    return dp[n];
}

console.log(numSquares(12));  // 3 (4+4+4)
console.log(numSquares(13));  // 2 (4+9)
```

---

## 📊 Complexity Summary

| Problem | Time | Space | Loop Order |
|---------|------|-------|------------|
| Min Coins | O(amount × coins) | O(amount) | Amount outer, Coins inner |
| Combinations | O(amount × coins) | O(amount) | **Coins outer**, Amount inner |
| Permutations | O(amount × coins) | O(amount) | Amount outer, Coins inner |
| Perfect Squares | O(n × √n) | O(n) | Same as min coins |

---

## 🔑 Key Takeaways

- **Unbounded Knapsack:** Each coin can be used unlimited times — iterate amount **forward**
- **Loop order matters:** Min coins vs combinations vs permutations use different loop orders
- **Min vs Count:** Both use the same table shape but different operations (min vs sum)
- **Infinity sentinel:** Always start with `Infinity` for minimization problems (never `0`)
- **Check feasibility:** If dp[amount] stays Infinity, return -1

**Next:** [Kadane's Algorithm](/DSA-Notes-Problems/data-structures/dynamic-programming/04-1d-dp/04-kadanes-algorithm) →
