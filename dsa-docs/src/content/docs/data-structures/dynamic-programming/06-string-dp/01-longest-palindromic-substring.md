---
title: "Longest Palindromic Substring"
description: "Detailed walkthrough of Longest Palindromic Substring — DP table, expand around center, and counting palindromes."
sidebar:
  order: 1
practice:
  visualizer: /visualizer/dp
---

# Longest Palindromic Substring

## 🎯 Problem Statement

Given a string `s`, find the **longest palindromic substring** in `s`. A palindrome reads the same forwards and backwards.

**Example:**
```
Input:  s = "babad"
Output: "bab" or "aba"  (both are valid)

Input:  s = "cbbd"
Output: "bb"
```

---

## 🧠 Approach 1: Brute Force — O(n³)

Check every possible substring `O(n²)` and test if it's a palindrome `O(n)`. Total: O(n³).

Skip this — it's too slow.

---

## 💻 Approach 2: DP — O(n²) time, O(n²) space

### Step 1: Identify State

```
dp[i][j] = true if substring s[i..j] (inclusive) is a palindrome
```

### Step 2: Recurrence

```
dp[i][j] = (s[i] === s[j]) AND dp[i+1][j-1]

A substring is a palindrome if:
1. Its first and last characters match, AND
2. The inner substring (i+1..j-1) is itself a palindrome
```

### Step 3: Base Cases

```
dp[i][i] = true                    (single character is always a palindrome)
dp[i][i+1] = (s[i] === s[i+1])     (two adjacent characters)
```

### Implementation

```javascript
function longestPalindrome(s) {
    const n = s.length;
    if (n === 0) return "";

    const dp = Array.from({ length: n }, () => new Array(n).fill(false));
    let start = 0, maxLen = 1;

    // Base: single characters
    for (let i = 0; i < n; i++) dp[i][i] = true;

    // Base: two characters
    for (let i = 0; i < n - 1; i++) {
        if (s[i] === s[i + 1]) {
            dp[i][i + 1] = true;
            start = i;
            maxLen = 2;
        }
    }

    // Fill for lengths 3+ (fill by LENGTH, not by index)
    for (let len = 3; len <= n; len++) {
        for (let i = 0; i <= n - len; i++) {
            const j = i + len - 1;

            if (s[i] === s[j] && dp[i + 1][j - 1]) {
                dp[i][j] = true;
                start = i;
                maxLen = len;
            }
        }
    }

    return s.substring(start, start + maxLen);
}

console.log(longestPalindrome("babad")); // "bab" or "aba"
console.log(longestPalindrome("cbbd"));  // "bb"
```

### DP Table Walkthrough: "babad"

```text
      0:b   1:a   2:b   3:a   4:d
0:b   T     F     T     F     F
1:a         T     F     T     F
2:b               T     F     F
3:a                     T     F
4:d                           T

Length 1: all diagonals = T
Length 2: (0,1)=F, (1,2)=F, (2,3)=F, (3,4)=F
Length 3: (0,2): b===b && dp[1][1]=T → T ✓ (maxLen=3, start=0)
          (1,3): a===a && dp[2][2]=T → T ✓ (maxLen=3, start=1)
          (2,4): b!==d → F
Length 4: (0,3): b!==a → F
          (1,4): a!==d → F
Length 5: (0,4): b!==d → F

Answer: s.substring(0, 3) = "bab" or s.substring(1, 4) = "aba"
```

**Why fill by length?** The recurrence `dp[i][j]` depends on `dp[i+1][j-1]` — shorter substrings. Filling by increasing length ensures shorter substrings are computed before longer ones.

---

## 💻 Approach 3: Expand Around Center — O(n²) time, O(1) space ✅ Best

For each position, expand outward while the characters match. Handle both odd-length and even-length palindromes.

```javascript
function longestPalindrome(s) {
    if (!s || s.length === 0) return "";

    let start = 0, maxLen = 1;

    function expandAroundCenter(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            const len = right - left + 1;
            if (len > maxLen) {
                start = left;
                maxLen = len;
            }
            left--;
            right++;
        }
    }

    for (let i = 0; i < s.length; i++) {
        expandAroundCenter(i, i);      // Odd length palindrome ("aba")
        expandAroundCenter(i, i + 1);  // Even length palindrome ("abba")
    }

    return s.substring(start, start + maxLen);
}

console.log(longestPalindrome("babad")); // "bab" or "aba"
console.log(longestPalindrome("cbbd"));  // "bb"
```

### Walkthrough: "babad"

```text
i=0 ('b'):
  odd:  "b" → len=1 (maxLen=1, start=0)
  even: (0,1) b≠a → stop

i=1 ('a'):
  odd:  "a" → "aba" → len=3 (maxLen=3, start=0) ✓
  even: (1,2) a≠b → stop

i=2 ('b'):
  odd:  "b" → "bab" → len=3 (maxLen=3, start=0) already max
  even: (2,3) b≠a → stop

i=3 ('a'):
  odd:  "a" → len=1 (not new max)
  even: (3,4) a≠d → stop

i=4 ('d'):
  odd:  "d" → len=1
  even: out of bounds

Result: "bab" (start=0, len=3)
```

### Space Optimization — Why It Works

```text
The DP approach uses O(n²) memory to store whether each substring is a palindrome.

The Expand Center approach realizes we don't need to store all those results:
we just need to FIND the longest one, which we can do by checking each center.

Each center expands outward O(n) times, and there are O(n) centers (2n-1 total:
n odd centers + n-1 even centers). Total: O(n²) time, O(1) space.
```

---

## 🎯 Variation: Count Palindromic Substrings

**Problem:** Count how many palindromic substrings exist in `s`.

```javascript
function countSubstrings(s) {
    const n = s.length;
    let count = 0;

    function expandAroundCenter(left, right) {
        while (left >= 0 && right < n && s[left] === s[right]) {
            count++;       // Found a palindrome
            left--;
            right++;
        }
    }

    for (let i = 0; i < n; i++) {
        expandAroundCenter(i, i);      // Odd length
        expandAroundCenter(i, i + 1);  // Even length
    }

    return count;
}

console.log(countSubstrings("abc"));   // 3  ("a", "b", "c")
console.log(countSubstrings("aaa"));   // 6  ("a","a","a","aa","aa","aaa")
```

**Walkthrough for "aaa":**
```text
i=0 ('a'): odd → "a"(1) → "aaa"(stop?)... actually:
  odd:  (0,0) "a" count=1, (1) no! (0, -1, 1) wait...
  
Let me trace carefully:
  i=0, odd: l=0,r=0 → "a" ✓ count=1
            l=-1,r=1 → stop (l<0)
  i=0, even: l=0,r=1 → "aa" ✓ count=2
             l=-1,r=2 → stop
  
  i=1, odd: l=1,r=1 → "a" ✓ count=3
            l=0,r=2 → "aaa" ✓ count=4
            l=-1,r=3 → stop
  i=1, even: l=1,r=2 → "aa" ✓ count=5
             l=0,r=3 → stop (l>=0, but r=3 out of bounds)
  
  i=2, odd: l=2,r=2 → "a" ✓ count=6
            l=1,r=3 → stop (r=3 out of bounds)
  i=2, even: l=2,r=3 → stop (r=3 out of bounds)

Total: 6 ✓
```

---

## 📊 Complexity Summary

| Approach | Time | Space | Notes |
|----------|------|-------|-------|
| Brute Force | O(n³) | O(1) | Slow — checks all substrings |
| DP Table | O(n²) | O(n²) | Easy to understand |
| **Expand Center** | **O(n²)** | **O(1)** | ✅ **Best** |

---

## 🔑 Key Takeaways

- **DP vs Expand Center:** DP checks O(n²) substrings with O(n²) memory; Expand Center checks O(n²) centers with O(1) memory
- **Fill by length:** When using DP for intervals, always fill by increasing length (not by index) to ensure shorter substrings are computed first
- **Two types of palindromes:** Odd length ("aba") has 1 center; even length ("abba") has 2 centers
- **2n-1 centers:** n centers for odd length + n-1 for even length = 2n-1 total expansions
- **Expand Center is superior:** Same O(n²) time, O(1) space, simpler code

**Next:** [Longest Palindromic Subsequence](/DSA-Notes-Problems/data-structures/dynamic-programming/06-string-dp/02-longest-palindromic-subsequence) →
