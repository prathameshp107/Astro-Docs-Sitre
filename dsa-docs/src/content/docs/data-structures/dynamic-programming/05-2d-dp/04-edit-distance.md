---
title: "Edit Distance (Levenshtein Distance)"
description: "Detailed walkthrough of Edit Distance — 2D tabulation, space optimization, operation-by-operation walkthrough, and variations."
sidebar:
  order: 4
practice:
  visualizer: /visualizer/dp
---

# Edit Distance (Levenshtein Distance)

## 🎯 Problem Statement

Given two strings `word1` and `word2`, find the **minimum number of operations** required to convert `word1` into `word2`. The allowed operations are:

1. **INSERT** a character (into word1)
2. **DELETE** a character (from word1)
3. **REPLACE** a character (in word1)

**Example:**
```
Input:  word1 = "horse", word2 = "ros"
Output: 3

Explanation:
  horse → rorse (replace 'h' with 'r')
  rorse → rose  (delete 'r')
  rose  → ros   (delete 'e')
```

**Example 2:**
```
Input:  word1 = "intention", word2 = "execution"
Output: 5
```

---

## 🧠 Step 1: Identify the State

```
dp[i][j] = minimum edit distance between word1[0..i-1] (first i chars) and word2[0..j-1] (first j chars)
```

---

## 🔗 Step 2: Write the Recurrence

```
If word1[i-1] === word2[j-1]:
    dp[i][j] = dp[i-1][j-1]              // Characters match — no operation needed
Else:
    dp[i][j] = 1 + min(
        dp[i-1][j],     // DELETE: remove word1[i-1], match remaining word1[0..i-2] with word2[0..j-1]
        dp[i][j-1],     // INSERT: insert word2[j-1] into word1, match word1[0..i-1] with word2[0..j-2]
        dp[i-1][j-1]    // REPLACE: change word1[i-1] to word2[j-1], match remaining prefixes
    )
```

**Intuition for the three operations:**

```text
DELETE:  "hors" → "ros" already costs X
         "horse" → "ros" costs X + 1 (delete 'e')

INSERT:  "horse" → "ro" costs Y
         "horse" → "ros" costs Y + 1 (insert 's')

REPLACE: "hors" → "ro" costs Z
         "horse" → "ros" costs Z + 1 (replace 'e' with 's')

Take the minimum of all three.
```

---

## 🏁 Step 3: Define Base Cases

```
dp[i][0] = i    (delete all i characters from word1 to match empty string)
dp[0][j] = j    (insert all j characters into word1 to match word2)
```

---

## 💻 Approach 1: 2D Tabulation — O(m × n) time, O(m × n) space

```javascript
function minDistance(word1, word2) {
    const m = word1.length, n = word2.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

    // Base cases
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(
                    dp[i - 1][j],     // delete
                    dp[i][j - 1],     // insert
                    dp[i - 1][j - 1]  // replace
                );
            }
        }
    }

    return dp[m][n];
}

console.log(minDistance("horse", "ros"));         // 3
console.log(minDistance("intention", "execution")); // 5
```

### DP Table Walkthrough: "horse" → "ros"

```text
        ""   r    o    s
   ""    0    1    2    3
   h     1    1    2    3
   o     2    2    1    2
   r     3    2    2    2
   s     4    3    3    2
   e     5    4    4    3  ← answer

Detailed computation for key cells:

dp[1][1]: 'h' vs 'r' → 1 + min(dp[0][1]=1, dp[1][0]=1, dp[0][0]=0)
                        = 1 + min(1, 1, 0) = 1 (replace)

dp[3][2]: 'r' vs 'o' → 'r'≠'o': 1 + min(dp[2][2]=1, dp[3][1]=2, dp[2][1]=1)
                        = 1 + min(1, 2, 1) = 2

dp[3][3]: 'r' vs 's' → 'r'≠'s': 1 + min(dp[2][3]=2, dp[3][2]=2, dp[2][2]=1)
                        = 1 + min(2, 2, 1) = 2

dp[5][3]: 'e' vs 's' → 'e'≠'s': 1 + min(dp[4][3]=2, dp[5][2]=4, dp[4][2]=3)
                        = 1 + min(2, 4, 3) = 3 ← answer
```

### Tracing Back the Operations

```text
Start at (5,3): value=3

(5,3): 'e'≠'s', from dp[4][3]=2 (delete 'e') → (4,3)
(4,3): 's'='s' ✓, from dp[3][2] (diagonal, match) → (3,2)
(3,2): 'r'≠'o', from dp[2][1]=1 (how?) let's see...
Better to read the path from the table above:
  (5,3)→delete 'e'→(4,3)
  (4,3)→match 's'→(3,2)
  (3,2)→replace 'r' with 'o'→(2,1)
  (2,1)→match 'o'→(1,1)...
Actually let's read this differently:

The optimal sequence:
  horse → rorse (replace h→r):    (1,1)→(0,0) diagonal
  rorse → rose  (delete r):       (2,3)→(1,3) from above
  rose  → ros   (delete e):       (4,3)→(3,3)... 

Let me reconsider the table reading:
  dp[5][3] = 3
  dp[4][3] = 2 → delete 'e' (index 4 in horse)
  dp[3][2] = 2 → hm, this doesn't help directly
  
Better to use the backtracking approach below in Approach 2.
```

---

## 💻 Approach 2: Space-Optimized — O(m × n) time, O(n) space

```javascript
function minDistance(word1, word2) {
    const m = word1.length, n = word2.length;
    let prev = new Array(n + 1).fill(0);

    // Base case: dp[0][j] = j
    for (let j = 0; j <= n; j++) prev[j] = j;

    for (let i = 1; i <= m; i++) {
        const curr = new Array(n + 1).fill(0);
        curr[0] = i;  // Base: dp[i][0] = i

        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                curr[j] = prev[j - 1];
            } else {
                curr[j] = 1 + Math.min(
                    prev[j],       // delete (from above)
                    curr[j - 1],   // insert (from left)
                    prev[j - 1]    // replace (diagonal)
                );
            }
        }

        prev = curr;
    }

    return prev[n];
}

console.log(minDistance("horse", "ros"));         // 3
console.log(minDistance("intention", "execution")); // 5
```

---

## 💻 Approach 3: Print Operations

```javascript
function minDistanceWithOperations(word1, word2) {
    const m = word1.length, n = word2.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
            }
        }
    }

    // Backtrack to find operations
    const ops = [];
    let i = m, j = n;
    while (i > 0 || j > 0) {
        if (i > 0 && dp[i][j] === dp[i - 1][j] + 1) {
            ops.push(`Delete '${word1[i - 1]}' from position ${i - 1}`);
            i--;
        } else if (j > 0 && dp[i][j] === dp[i][j - 1] + 1) {
            ops.push(`Insert '${word2[j - 1]}' at position ${i}`);
            j--;
        } else if (i > 0 && j > 0) {
            if (word1[i - 1] !== word2[j - 1]) {
                ops.push(`Replace '${word1[i - 1]}' with '${word2[j - 1]}'`);
            }
            i--; j--;
        }
    }

    ops.reverse();
    return { distance: dp[m][n], operations: ops };
}

const result = minDistanceWithOperations("horse", "ros");
console.log(result.distance);
// 3
console.log(result.operations);
// ['Replace 'h' with 'r'', 'Delete 'r' from position 2', 'Delete 'e' from position 4']
```

---

## 🎯 Variation: One Edit Distance

**Problem:** Check if two strings are exactly **one edit** (insert, delete, replace) away.

```javascript
function isOneEditDistance(s, t) {
    const m = s.length, n = t.length;

    // If lengths differ by more than 1, impossible
    if (Math.abs(m - n) > 1) return false;

    // Ensure s is shorter/equal for simpler logic
    if (m > n) return isOneEditDistance(t, s);

    for (let i = 0; i < m; i++) {
        if (s[i] !== t[i]) {
            if (m === n) {
                // Replace: s[i] should match t[i+1..end], t[i] should match s[i+1..end]
                return s.substring(i + 1) === t.substring(i + 1);
            } else {
                // Insert: s[i..end] should match t[i+1..end]
                return s.substring(i) === t.substring(i + 1);
            }
        }
    }

    // If all characters match, check if t has one extra character
    return m + 1 === n;
}

console.log(isOneEditDistance("ab", "acb"));  // true (insert 'c')
console.log(isOneEditDistance("cab", "ad"));   // false
console.log(isOneEditDistance("1203", "1213")); // true (replace '0' with '1')
```

---

## 📊 Complexity Summary

| Approach | Time | Space | Notes |
|----------|------|-------|-------|
| 2D Tabulation | O(m×n) | O(m×n) | Full table, easy to read |
| **Two rows** | **O(m×n)** | **O(n)** | ✅ **Best** |
| With operations | O(m×n) | O(m×n) | Need full table for backtracking |
| One Edit Distance | O(n) | O(1) | Single scan |

---

## 🔑 Key Takeaways

- **3 operations:** INSERT, DELETE, REPLACE — each costs 1
- **Recurrence:** match → copy diagonal, mismatch → 1 + min(delete, insert, replace)
- **Base cases:** `dp[i][0] = i` (delete all), `dp[0][j] = j` (insert all)
- **Relationship to LCS:** Edit Distance with only insert/delete = `m + n - 2×LCS`. REPLACE adds a third option.
- **Space optimization:** Only need previous row + current row (two-row approach)
- **Path reconstruction:** Backtrack through the table to see which operations were performed
- **One edit distance:** Special case can be solved in O(n) with a simple scan

**Back to [2D DP Problems](/DSA-Notes-Problems/data-structures/dynamic-programming/05-2d-dp) →**
