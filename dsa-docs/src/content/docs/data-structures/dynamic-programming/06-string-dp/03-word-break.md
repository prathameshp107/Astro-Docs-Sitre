---
title: "Word Break"
description: "Detailed walkthrough of Word Break — DP, BFS, and Word Break II with backtracking to return all sentences."
sidebar:
  order: 3
---

# Word Break

## 🎯 Problem Statement

Given a string `s` and a dictionary of words `wordDict`, determine if `s` can be **segmented** into a space-separated sequence of dictionary words. You may reuse dictionary words multiple times.

**Example:**
```
Input:  s = "leetcode", wordDict = ["leet", "code"]
Output: true

Explanation: "leetcode" can be segmented as "leet code".
```

```
Input:  s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
Output: false

Explanation: No valid segmentation exists.
```

---

## 🧠 Step 1: Identify the State

```
dp[i] = true if s[0..i-1] (prefix of length i) can be segmented into valid words
```

We process the string left to right, checking whether each prefix is segmentable.

---

## 🔗 Step 2: Write the Recurrence

```
dp[i] = true if there exists j < i such that:
  - dp[j] is true (prefix s[0..j-1] is segmentable), AND
  - s[j..i-1] is a valid word in the dictionary
```

**Intuition:** If we can segment the prefix up to position `j`, and the substring from `j` to `i` is a dictionary word, then we can segment up to `i`.

---

## 🏁 Step 3: Define Base Cases

```
dp[0] = true    (empty string is always segmentable — vacuously true)
```

---

## 💻 Approach 1: DP — O(n²) time, O(n) space

```javascript
function wordBreak(s, wordDict) {
    const n = s.length;
    const wordSet = new Set(wordDict);
    const dp = new Array(n + 1).fill(false);
    dp[0] = true;  // Empty string is segmentable

    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] && wordSet.has(s.substring(j, i))) {
                dp[i] = true;
                break;  // Found a valid segmentation — no need to check further
            }
        }
    }

    return dp[n];
}

console.log(wordBreak("leetcode", ["leet", "code"]));           // true
console.log(wordBreak("applepenapple", ["apple", "pen"]));      // true
console.log(wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"])); // false
```

### DP Table Walkthrough: "leetcode"

```text
s = "leetcode"
wordSet = {"leet", "code"}

dp[0] = true

i=1: "l" → not in dict → dp[1] = false
i=2: "le" → not in dict → dp[2] = false
i=3: "lee" → not in dict → dp[3] = false
i=4: j=0: dp[0]=T, "leet" in dict → dp[4] = true ✅

i=5: j=4: dp[4]=T, "c" not in dict
     others: no match → dp[5] = false

i=6: j=4: dp[4]=T, "co" not in dict
     others: no match → dp[6] = false

i=7: j=4: dp[4]=T, "cod" not in dict
     others: no match → dp[7] = false

i=8: j=4: dp[4]=T, "code" in dict → dp[8] = true ✅

Answer: true
```

---

## 💻 Approach 2: DP Optimized (Start from Matching Words) — O(n × k) where k = max word length

Instead of iterating all `j < i`, only check positions `j` that correspond to dictionary word lengths:

```javascript
function wordBreak(s, wordDict) {
    const n = s.length;
    const wordSet = new Set(wordDict);
    const dp = new Array(n + 1).fill(false);
    dp[0] = true;

    for (let i = 1; i <= n; i++) {
        for (const word of wordDict) {
            const len = word.length;
            if (i >= len && dp[i - len] && s.substring(i - len, i) === word) {
                dp[i] = true;
                break;
            }
        }
    }

    return dp[n];
}
```

**Performance improvement:** Instead of checking every possible `j` (O(n) per `i`), we only check dictionary word lengths (O(k) per `i` where k = number of words).

---

## 💻 Approach 3: BFS (Graph Traversal)

Think of this as a graph problem: each index in the string is a node, and an edge exists from `j` to `i` if `s[j..i-1]` is a dictionary word. Find if there's a path from 0 to n.

```javascript
function wordBreakBFS(s, wordDict) {
    const wordSet = new Set(wordDict);
    const n = s.length;
    const visited = new Array(n).fill(false);
    const queue = [0];

    while (queue.length > 0) {
        const start = queue.shift();

        if (start === n) return true;  // Reached the end

        if (visited[start]) continue;
        visited[start] = true;

        for (let end = start + 1; end <= n; end++) {
            if (wordSet.has(s.substring(start, end))) {
                queue.push(end);  // Found a valid word ending at 'end'
            }
        }
    }

    return false;
}

console.log(wordBreakBFS("leetcode", ["leet", "code"]));  // true
```

---

## 🎯 Variation: Word Break II — Return All Sentences

**Problem:** Return ALL possible sentences formed by segmenting `s` with dictionary words.

```javascript
function wordBreak(s, wordDict) {
    const wordSet = new Set(wordDict);
    const memo = new Map();  // key: start index → [sentences]

    function dfs(start) {
        if (start === s.length) return [""];  // Base: empty suffix
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

**Memoization walkthrough for "catsanddog":**

```text
dfs(0) → tries:
  "cat" at (0,3): dfs(3) → returns ["sand dog"]
    → "cat sand dog"
  "cats" at (0,4): dfs(4) → returns ["and dog"]
    → "cats and dog"
  → returns ["cat sand dog", "cats and dog"]

dfs(3) → tries:
  "sand" at (3,7): dfs(7) → returns ["dog"]
    → "sand dog"
  → returns ["sand dog"]

dfs(4) → tries:
  "and" at (4,7): dfs(7) → returns ["dog"]
    → "and dog"
  → returns ["and dog"]

dfs(7) → tries:
  "dog" at (7,10): dfs(10) → returns [""]
    → "dog"
  → returns ["dog"]

dfs(10) → returns [""] (base case)
```

---

## 📊 Complexity Summary

| Approach | Time | Space | Notes |
|----------|------|-------|-------|
| DP (basic) | O(n²) | O(n) | Checks all j < i |
| DP (optimized) | O(n × k) | O(n) | Only checks word lengths |
| BFS | O(n²) | O(n) | Graph traversal view |
| Word Break II | O(2ⁿ) worst | O(n × sentences) | Can be exponential in output size |

---

## 🔑 Key Takeaways

- **Word Break = 1D DP:** The state is just the prefix length `i`
- **Recurrence:** `dp[i]` is true if there exists a split point `j` where the prefix is valid AND the suffix is a word
- **Optimization:** Instead of checking all `j < i`, only check positions based on dictionary word lengths
- **BFS:** The problem can be viewed as finding a path from index 0 to index n in a graph
- **Word Break II:** Use memoized DFS to reconstruct all sentences — cache results by start index to avoid exponential recomputation
- **Set lookup:** Always use a `Set` for the dictionary — O(1) lookup vs O(k) for array

**Next:** [Interleaving String](/DSA-Notes-Problems/data-structures/dynamic-programming/06-string-dp/04-interleaving-string) →
