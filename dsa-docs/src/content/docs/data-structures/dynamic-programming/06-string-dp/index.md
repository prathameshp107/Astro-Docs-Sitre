---
title: "String DP Problems"
description: "Dynamic programming problems on strings — palindromes, word break, interleaving, and their variants."
sidebar:
  order: 0
practice:
  visualizer: /visualizer/dp
---

# String DP Problems

String DP problems involve manipulating or analyzing one or two strings. They often use **interval DP** (checking substrings) or **alignment DP** (matching characters between strings).

---

## 📋 Problems

| # | Problem | Pattern | Difficulty |
|---|---------|---------|------------|
| 1 | [Longest Palindromic Substring](/DSA-Notes-Problems/data-structures/dynamic-programming/06-string-dp/01-longest-palindromic-substring) | Expand around center / DP | Medium |
| 2 | [Longest Palindromic Subsequence](/DSA-Notes-Problems/data-structures/dynamic-programming/06-string-dp/02-longest-palindromic-subsequence) | Interval DP | Medium |
| 3 | [Word Break](/DSA-Notes-Problems/data-structures/dynamic-programming/06-string-dp/03-word-break) | String segmentation | Medium |
| 4 | [Interleaving String](/DSA-Notes-Problems/data-structures/dynamic-programming/06-string-dp/04-interleaving-string) | String merge check | Hard |

---

## ⚡ Quick Recurrence Reference

```text
Palindromic Substring:  dp[i][j] = (s[i]==s[j] && dp[i+1][j-1])     (is palindrome?)
Palindromic Subseq:     match? dp[i+1][j-1]+2 : max(dp[i+1][j], dp[i][j-1]) (LPS length)
Word Break:             dp[i] = exists j where dp[j] && s[j..i] in dict  (segmentable?)
Interleaving:           dp[i][j] = from s1[i-1] or s2[j-1] matching s3  (can interleave?)
```

*Start with [Longest Palindromic Substring](/DSA-Notes-Problems/data-structures/dynamic-programming/06-string-dp/01-longest-palindromic-substring) →*
