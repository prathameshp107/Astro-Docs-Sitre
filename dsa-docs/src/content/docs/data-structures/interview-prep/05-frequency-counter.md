---
title: "Frequency Counter"
description: "Frequency counter pattern with examples: valid anagram, same frequency, unique occurrences, array comparison."
sidebar:
  order: 6
---

# Frequency Counter

## Overview

The **Frequency Counter** pattern uses objects/maps to collect frequencies of values. This avoids the need for nested loops (O(n²)) and makes the solution O(n).

## Classic Pattern

```javascript
function frequencyCounter(arr) {
    const freq = new Map();

    for (const item of arr) {
        freq.set(item, (freq.get(item) || 0) + 1);
    }

    return freq;
}

// Pattern: Compare two frequency maps
function sameFrequency(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;

    const freq1 = new Map();
    const freq2 = new Map();

    for (const val of arr1) freq1.set(val, (freq1.get(val) || 0) + 1);
    for (const val of arr2) freq2.set(val, (freq2.get(val) || 0) + 1);

    for (const [key, count] of freq1) {
        if (freq2.get(key) !== count) return false;
    }

    return true;
}

console.log(sameFrequency([1, 2, 3], [3, 1, 2])); // true
console.log(sameFrequency([1, 2, 3], [1, 2, 4])); // false
```

## Valid Anagram

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;

    const freq = new Map();

    // Count characters in s
    for (const ch of s) {
        freq.set(ch, (freq.get(ch) || 0) + 1);
    }

    // Subtract characters in t
    for (const ch of t) {
        if (!freq.has(ch)) return false;  // Extra character

        const count = freq.get(ch) - 1;
        if (count === 0) {
            freq.delete(ch);
        } else {
            freq.set(ch, count);
        }
    }

    return freq.size === 0;
}

console.log(isAnagram("anagram", "nagaram"));  // true
console.log(isAnagram("rat", "car"));          // false
```

## Unique Number of Occurrences

```javascript
/**
 * Check if each value in the array has a unique frequency.
 * Input: [1,2,2,3,3,3] → 1 appears 1x, 2 appears 2x, 3 appears 3x → true
 * Input: [1,2,2,3,3] → 1 appears 1x, 2 appears 2x, 3 appears 2x → false
 */
function uniqueOccurrences(arr) {
    const freq = new Map();

    for (const num of arr) {
        freq.set(num, (freq.get(num) || 0) + 1);
    }

    const occurrences = new Set(freq.values());
    return occurrences.size === freq.size;
}

console.log(uniqueOccurrences([1, 2, 2, 3, 3, 3])); // true
console.log(uniqueOccurrences([1, 2, 2, 3, 3]));    // false
```

## Array Squared Check

```javascript
/**
 * Check if arr2 contains the squares of arr1 with same frequencies.
 * Input: [1, 2, 3], [1, 4, 9] → true
 * Input: [1, 2, 2], [1, 4, 4] → true
 * Input: [1, 2, 3], [1, 4] → false (missing 9)
 */
function sameSquared(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;

    const freq1 = new Map();
    const freq2 = new Map();

    for (const val of arr1) freq1.set(val, (freq1.get(val) || 0) + 1);
    for (const val of arr2) freq2.set(val, (freq2.get(val) || 0) + 1);

    for (const [key, count] of freq1) {
        const squared = key ** 2;
        if (freq2.get(squared) !== count) return false;
    }

    return true;
}

console.log(sameSquared([1, 2, 3], [1, 4, 9]));    // true
console.log(sameSquared([1, 2, 2], [4, 1, 4]));    // true
```

## Group Anagrams

```javascript
/**
 * Group strings that are anagrams of each other.
 * Input: ["eat","tea","tan","ate","nat","bat"]
 * Output: [["eat","tea","ate"], ["tan","nat"], ["bat"]]
 *
 * Strategy: Sort each string → use as key in Map.
 */
function groupAnagrams(strs) {
    const map = new Map();

    for (const str of strs) {
        const sorted = str.split('').sort().join('');
        if (!map.has(sorted)) {
            map.set(sorted, []);
        }
        map.get(sorted).push(str);
    }

    return [...map.values()];
}

console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]));
// [["eat","tea","ate"],["tan","nat"],["bat"]]
```

## When to Use Frequency Counter

| Signal | Example Problem | Data Structure |
|--------|----------------|----------------|
| **Count occurrences** | Character frequency | Map |
| **Compare two collections** | Anagram check | Map comparing counts |
| **Missing/extra elements** | Find the difference | Map with ± counts |
| **Group by property** | Group anagrams | Map of arrays |
| **Check uniqueness** | Unique occurrences | Map + Set |
| **Duplicate detection** | Contains duplicate | Set |

## Complexity

| Problem | Without Counter | With Counter | Improvement |
|---------|----------------|-------------|-------------|
| Valid Anagram | O(n²) (nested loop) | O(n) | From quadratic to linear |
| Same Squared | O(n²) | O(n) | From quadratic to linear |
| Group Anagrams | O(n²·k log k) | O(n·k log k) | Simpler with hash map |
| Duplicate Check | O(n²) | O(n) | Set gives O(1) lookup |

---

**Next:** [Recursion & Backtracking](/DSA-Notes-Problems/data-structures/interview-prep/06-recursion-backtracking) →
