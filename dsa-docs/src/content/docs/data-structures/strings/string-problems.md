---
title: "String Problems"
description: "Classic string interview problems: anagrams, longest substring without repeat, group anagrams, string compression, with dry runs and solutions."
sidebar:
  order: 4
---

# 🧩 String Problems

---

## Problem 1: Valid Anagram

**Problem:** Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`.

```javascript
function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  const count = new Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - 97]++;
    count[t.charCodeAt(i) - 97]--;
  }

  return count.every(c => c === 0);
}

isAnagram("anagram", "nagaram");  // true
isAnagram("rat", "car");         // false
```

**Time:** O(n) | **Space:** O(1) — fixed array of 26

---

## Problem 2: Group Anagrams

**Problem:** Given an array of strings, group the anagrams together.

```javascript
function groupAnagrams(strs) {
  const map = new Map();

  for (const str of strs) {
    // Sort the string to get the group key
    const key = str.split("").sort().join("");

    if (!map.has(key)) map.set(key, []);
    map.get(key).push(str);
  }

  return Array.from(map.values());
}

groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]);
// [["eat","tea","ate"], ["tan","nat"], ["bat"]]
```

**Time:** O(n × k log k) where k is max string length | **Space:** O(n × k)

---

## Problem 3: Longest Substring Without Repeating Characters

**Problem:** Find the length of the longest substring without repeating characters.

```javascript
function lengthOfLongestSubstring(s) {
  const seen = new Map();
  let maxLen = 0;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];

    // If we've seen this char and it's within current window
    if (seen.has(ch) && seen.get(ch) >= left) {
      left = seen.get(ch) + 1;  // Move left past the duplicate
    }

    seen.set(ch, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}

lengthOfLongestSubstring("abcabcbb");  // 3 ("abc")
lengthOfLongestSubstring("bbbbb");     // 1 ("b")
lengthOfLongestSubstring("pwwkew");    // 3 ("wke")
```

**Time:** O(n) | **Space:** O(k) where k is charset size

**Dry run on "abcabcbb":**
```
left=0, right=0: seen={a:0}, len=1
left=0, right=1: seen={a:0, b:1}, len=2
left=0, right=2: seen={a:0, b:1, c:2}, len=3
left=0, right=3: a is at 0 ≥ left → left=1, seen={a:3, b:1, c:2}, len=3
left=1, right=4: b is at 1 ≥ left → left=2, seen={a:3, b:4, c:2}, len=3
...max remains 3
```

---

## Problem 4: String Compression

**Problem:** Compress a string by replacing consecutive repeated characters with count.

```javascript
function compress(s) {
  let result = "";
  let count = 1;

  for (let i = 1; i <= s.length; i++) {
    if (s[i] === s[i - 1]) {
      count++;
    } else {
      result += s[i - 1] + (count > 1 ? count : "");
      count = 1;
    }
  }

  return result;
}

compress("aabcccccaaa");  // "a2b1c5a3"
compress("abc");          // "abc" (no compression needed)

// Return the shorter of compressed vs original
function compressShorter(s) {
  const compressed = compress(s);
  return compressed.length < s.length ? compressed : s;
}
```

**Time:** O(n) | **Space:** O(n)

---

## Problem 5: First Non-Repeating Character

**Problem:** Find the first character that doesn't repeat in a string.

```javascript
function firstNonRepeating(s) {
  const freq = new Map();

  // Count frequencies
  for (const ch of s) {
    freq.set(ch, (freq.get(ch) || 0) + 1);
  }

  // Find first with count = 1
  for (let i = 0; i < s.length; i++) {
    if (freq.get(s[i]) === 1) return i;
  }

  return -1;
}

firstNonRepeating("leetcode");   // 0 (l)
firstNonRepeating("aabb");       // -1
```

**Time:** O(n) | **Space:** O(k)

---

## Problem 6: Reverse Words in a String

**Problem:** Reverse the order of words in a string.

```javascript
function reverseWords(s) {
  return s.trim().split(/\s+/).reverse().join(" ");
}

reverseWords("  hello world  ");   // "world hello"
reverseWords("a good   example");  // "example good a"
```

**Time:** O(n) | **Space:** O(n)

---

## ✅ In Simple Words

- **Anagram problems** rely on frequency counting (array of 26 for lowercase).
- **Longest substring without repeat** uses sliding window + a map of seen characters.
- **String compression** is a simple run-length encoding — count consecutive chars.
- **Group anagrams** uses sorted string as the key in a hash map.
- Most string problems boil down to: **frequency map**, **sliding window**, or **two pointers**.
