---
title: "Coding Problems"
description: "Essential coding problems with Map, Set, and frequency counter patterns"
sidebar:
  order: 7
---

# Coding Problems

Practice these essential problems to solidify your understanding of arrays, hashmaps, and sets. Each problem demonstrates a core pattern that appears frequently in interviews.

---

## 1. Two Sum (HashMap)

**Problem:** Return indices of two numbers that sum to target.

```javascript
function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];

    if (map.has(need)) {
      return [map.get(need), i];
    }
    map.set(nums[i], i);
  }
  return [];
}
```

- **Time:** O(n) — single pass through the array
- **Space:** O(n) — stores up to n elements in the map
- **Pattern:** Complement lookup — store each element's value and index, check if the complement exists

---

## 2. Contains Duplicate (Set)

**Problem:** Check if array contains any duplicate values.

```javascript
function containsDuplicate(nums) {
  const set = new Set(nums);
  return set.size !== nums.length;
}
```

- **Time:** O(n)
- **Space:** O(n)
- **Pattern:** Deduplication check — if the set has fewer elements than the array, duplicates exist

---

## 3. First Non-Repeating Character

**Problem:** Find the first character in a string that does not repeat.

```javascript
function firstUniqueChar(s) {
  const freq = new Map();

  for (let ch of s) {
    freq.set(ch, (freq.get(ch) || 0) + 1);
  }

  for (let i = 0; i < s.length; i++) {
    if (freq.get(s[i]) === 1) return i;
  }

  return -1;
}
```

- **Time:** O(n) — two passes
- **Space:** O(k) where k ≤ 26 (lowercase letters) or O(n) in general
- **Pattern:** Frequency counter — first pass to count, second pass to check

---

## 4. Intersection of Two Arrays

**Problem:** Return unique elements common to both arrays.

```javascript
function intersection(nums1, nums2) {
  const set1 = new Set(nums1);
  const result = new Set();

  for (let num of nums2) {
    if (set1.has(num)) {
      result.add(num);
    }
  }

  return [...result];
}
```

- **Time:** O(n + m)
- **Space:** O(min(n, m))
- **Pattern:** Membership check — convert one array to a Set for O(1) lookups

---

## 5. Valid Anagram

**Problem:** Check if two strings are anagrams of each other.

```javascript
function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  const freq = new Map();

  for (let ch of s) {
    freq.set(ch, (freq.get(ch) || 0) + 1);
  }

  for (let ch of t) {
    if (!freq.has(ch)) return false;
    const count = freq.get(ch) - 1;
    if (count === 0) {
      freq.delete(ch);
    } else {
      freq.set(ch, count);
    }
  }

  return freq.size === 0;
}
```

- **Time:** O(n)
- **Space:** O(k) where k is the character set size
- **Pattern:** Frequency counter with decrement — count characters in one string, match in the other

---

## 6. Longest Consecutive Sequence

**Problem:** Find the length of the longest consecutive elements sequence.

```javascript
function longestConsecutive(nums) {
  const set = new Set(nums);
  let longest = 0;

  for (let num of set) {
    // Only start from the smallest in the sequence
    if (!set.has(num - 1)) {
      let current = num;
      let count = 1;

      while (set.has(current + 1)) {
        current++;
        count++;
      }

      longest = Math.max(longest, count);
    }
  }

  return longest;
}
```

- **Time:** O(n)
- **Space:** O(n)
- **Pattern:** Set for O(1) lookup — only iterate from sequence starters

---

## Quick Reference

| Problem | Pattern | Data Structure | Time |
|---------|---------|---------------|------|
| Two Sum | Complement lookup | Map | O(n) |
| Contains Duplicate | Deduplication check | Set | O(n) |
| First Non-Repeating | Frequency counter | Map | O(n) |
| Intersection | Membership check | Set | O(n + m) |
| Valid Anagram | Frequency counter | Map | O(n) |
| Longest Consecutive | Sequence building | Set | O(n) |

---

> **Practice tip:** Don't just memorize the solutions. Focus on explaining your thought process — interviewers care about **how** you solve more than the final answer.

---

<span class="related-topics">**Related:** [Array Methods →](/DSA-Notes-Problems/data-structures/interview-prep/01-array-methods) | [Map & Set Patterns →](/DSA-Notes-Problems/data-structures/interview-prep/02-map-set-patterns) | [Frequency Counter →](/DSA-Notes-Problems/data-structures/interview-prep/05-frequency-counter)</span>
