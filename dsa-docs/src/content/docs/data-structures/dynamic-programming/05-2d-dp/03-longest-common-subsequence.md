---
title: "Longest Common Subsequence (LCS)"
description: "Detailed walkthrough of LCS — DP table, backtracking reconstruction, space optimization, and related variations."
sidebar:
  order: 3
practice:
  visualizer: /visualizer/dp
---

# Longest Common Subsequence (LCS)

## 🎯 Problem Statement

Given two strings `text1` and `text2`, return the **length** of their longest common subsequence. A **subsequence** is a sequence that appears in the same relative order but **not necessarily contiguously**.

**Example:**
```
Input:  text1 = "abcde", text2 = "ace"
Output: 3

Explanation: The longest common subsequence is "ace" (length 3).
             Characters a, c, e appear in both strings in order.
```

```
Input:  text1 = "abc", text2 = "def"
Output: 0

Explanation: No common characters.
```

---

## 🧠 Step 1: Identify the State

```
dp[i][j] = length of LCS of text1[0..i-1] (first i chars) and text2[0..j-1] (first j chars)
```

---

## 🔗 Step 2: Write the Recurrence

```
If text1[i-1] === text2[j-1]:
    dp[i][j] = dp[i-1][j-1] + 1      // Characters match → extend LCS by 1
Else:
    dp[i][j] = max(dp[i-1][j], dp[i][j-1])  // Take best without one char
```

**Intuition:** When characters don't match, the LCS either ignores the character in text1 or the character in text2 — take whichever gives the better result.

---

## 🏁 Step 3: Define Base Cases

```
dp[0][j] = 0 for all j    (empty string has no LCS with anything)
dp[i][0] = 0 for all i    (empty string has no LCS with anything)
```

---

## 💻 Approach 1: 2D Tabulation — O(m × n) time, O(m × n) space

```javascript
function longestCommonSubsequence(text1, text2) {
    const m = text1.length, n = text2.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp[m][n];
}

console.log(longestCommonSubsequence("abcde", "ace"));   // 3
console.log(longestCommonSubsequence("abc", "abc"));     // 3
console.log(longestCommonSubsequence("abc", "def"));     // 0
```

### DP Table Walkthrough: LCS("abcde", "ace")

```text
        ""   a   c   e
   ""    0   0   0   0     ← base row
   a     0   1   1   1     ← a matches a → dp[1][1] = dp[0][0]+1 = 1
   b     0   1   1   1     ← b≠c, b≠e → carry max from above/left
   c     0   1   2   2     ← c matches c → dp[3][2] = dp[2][1]+1 = 2
   d     0   1   2   2     ← d≠c, d≠e → carry forward
   e     0   1   2   3     ← e matches e → dp[5][3] = dp[4][2]+1 = 3
                                  ↑
                            Answer: 3

The path through the table:
  (5,3) → match 'e' → (4,2) → skip (d≠e) → (3,2) → match 'c' → (2,1) → skip → (1,1) → match 'a'
  LCS = "ace"
```

---

## 💻 Approach 2: Reconstruction (Finding the Actual LCS)

```javascript
function lcsReconstruct(text1, text2) {
    const m = text1.length, n = text2.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    // Backtrack to find the actual subsequence
    let i = m, j = n;
    const result = [];

    while (i > 0 && j > 0) {
        if (text1[i - 1] === text2[j - 1]) {
            result.push(text1[i - 1]);  // Character is part of LCS
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;  // Move up (better LCS came from above)
        } else {
            j--;  // Move left (better LCS came from left)
        }
    }

    return result.reverse().join('');
}

console.log(lcsReconstruct("abcde", "ace"));   // "ace"
console.log(lcsReconstruct("AGGTAB", "GXTXAYB")); // "GTAB"
```

---

## 💻 Approach 3: Space-Optimized (Two Rows) — O(m × n) time, O(n) space

```javascript
function lcsOptimized(text1, text2) {
    const m = text1.length, n = text2.length;
    let prev = new Array(n + 1).fill(0);  // Previous row
    let curr = new Array(n + 1).fill(0);  // Current row

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                curr[j] = prev[j - 1] + 1;
            } else {
                curr[j] = Math.max(prev[j], curr[j - 1]);
            }
        }
        [prev, curr] = [curr, prev];  // Swap rows
    }

    return prev[n];
}
```

**Why two rows suffice:**
```text
dp[i][j] depends on:
  - dp[i-1][j-1] (diagonal: prev row, prev col) → prev[j-1]
  - dp[i-1][j]   (above: prev row, same col)    → prev[j]
  - dp[i][j-1]   (left: same row, prev col)     → curr[j-1]

We only need the previous row and the current row. ✓
```

---

## 🎯 Variation 1: Longest Common Substring (Contiguous)

**Problem:** Unlike subsequence, substring requires **contiguous** characters.

```javascript
function longestCommonSubstring(s1, s2) {
    const m = s1.length, n = s2.length;
    let maxLen = 0;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s1[i - 1] === s2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;  // Only extend on match
                maxLen = Math.max(maxLen, dp[i][j]);
            }
            // No carry forward — substring must be CONTIGUOUS
        }
    }

    return maxLen;
}

console.log(longestCommonSubstring("abcdef", "zcdem")); // 3 ("cde")
```

---

## 🎯 Variation 2: Shortest Common Supersequence (SCS)

**Problem:** Find the shortest string that has both `s1` and `s2` as subsequences.

```javascript
function shortestCommonSupersequence(s1, s2) {
    const m = s1.length, n = s2.length;
    const lcsLen = longestCommonSubsequence(s1, s2);

    return m + n - lcsLen;  // Merge lengths, subtract once for shared chars
}

function longestCommonSubsequence(s1, s2) {
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s1[i - 1] === s2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
            else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    return dp[m][n];
}

console.log(shortestCommonSupersequence("abac", "cab")); // 5 ("cabac")
```

---

## 📊 Complexity Summary

| Problem | Time | Space | Notes |
|---------|------|-------|-------|
| LCS (length only) | O(m×n) | O(min(m,n)) | Two rows optimization |
| LCS (reconstruction) | O(m×n) | O(m×n) | Need full table to backtrack |
| Longest Common Substring | O(m×n) | O(m×n) | No carry — contiguous only |
| Shortest Common Supersequence | O(m×n) | O(min(m,n)) | m + n - LCS |

---

## 🔑 Key Takeaways

- **Match vs Skip:** Characters matching → extend. Not matching → take max of skipping either side
- **Subsequence vs Substring:** Subsequence allows gaps (carry forward), substring doesn't
- **Space optimization:** Only need two rows (previous and current) since LCS only looks one row back
- **Reconstruction:** Backtrack through the DP table using match/skip decisions
- **SCS formula:** `m + n - LCS` — merge both strings, LCS characters only counted once
- **Pattern:** Any "common between two sequences" problem likely uses the LCS table structure

**Next:** [Edit Distance](/DSA-Notes-Problems/data-structures/dynamic-programming/05-2d-dp/04-edit-distance) →
