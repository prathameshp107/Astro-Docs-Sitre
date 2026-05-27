---
title: "Sliding Window"
description: "Fixed and variable sliding window patterns with examples: max sum, longest substring, and more."
sidebar:
  order: 5
---

# Sliding Window

## Overview

The **Sliding Window** technique maintains a window (contiguous segment) over a data structure, sliding it to find optimal subarrays or substrings. It reduces O(n²) brute force to O(n).

## Types of Sliding Windows

### 1. Fixed Size Window

The window has a constant size. Slide it across the array.

```javascript
/**
 * Maximum sum of any subarray of size k
 *
 * Window slides: [1,2,3] sum=6 → [2,3,4] sum=9 → [3,4,5] sum=12
 *                           │
 *                     remove1 add4 → 6 - 1 + 4 = 9 ✓
 */
function maxSumSubarray(arr, k) {
    let windowSum = 0;
    let maxSum = 0;

    // Build initial window
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    maxSum = windowSum;

    // Slide window
    for (let i = k; i < arr.length; i++) {
        windowSum += arr[i] - arr[i - k];  // Add new, remove old
        maxSum = Math.max(maxSum, windowSum);
    }

    return maxSum;
}

console.log(maxSumSubarray([2, 1, 5, 1, 3, 2], 3)); // 9 (5+1+3)
// Time: O(n), Space: O(1)
```

### 2. Variable Size Window

The window grows and shrinks as needed.

```javascript
/**
 * Smallest subarray with sum >= target
 *
 * Expand right until sum >= target, then shrink from left while maintaining condition.
 */
function minSubarrayLen(arr, target) {
    let minLen = Infinity;
    let windowSum = 0;
    let left = 0;

    for (let right = 0; right < arr.length; right++) {
        windowSum += arr[right];  // Expand window

        // Shrink window from left while condition holds
        while (windowSum >= target) {
            minLen = Math.min(minLen, right - left + 1);
            windowSum -= arr[left];  // Remove leftmost element
            left++;                   // Move left forward
        }
    }

    return minLen === Infinity ? 0 : minLen;
}

console.log(minSubarrayLen([2, 3, 1, 2, 4, 3], 7)); // 2 ([4,3])
// Time: O(n), Space: O(1)
```

```javascript
/**
 * Longest substring without repeating characters
 *
 * Use a Map to track character positions.
 * When a repeat is found, jump left to after the previous occurrence.
 */
function lengthOfLongestSubstring(s) {
    const charMap = new Map();  // character → index
    let maxLen = 0;
    let left = 0;

    for (let right = 0; right < s.length; right++) {
        const char = s[right];

        // If char already in window, move left past it
        if (charMap.has(char) && charMap.get(char) >= left) {
            left = charMap.get(char) + 1;
        }

        charMap.set(char, right);
        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
}

console.log(lengthOfLongestSubstring("abcabcbb")); // 3 ("abc")
// Time: O(n), Space: O(min(n, 26)) — 26 for alphabet
```

## When to Use Sliding Window

| Signal | Window Type | Example Problems |
|--------|-------------|-----------------|
| **Subarray with given sum** | Variable | Min size subarray sum |
| **Longest substring** | Variable | Longest without repeats |
| **Maximum of k elements** | Fixed | Max sum subarray of size k |
| **Count anagrams** | Fixed | Find all anagrams in string |
| **Fruits in basket** | Variable | Fruits into baskets |
| **Character replacement** | Variable | Longest repeating char replacement |

## Common Pitfalls

```javascript
// ❌ WRONG — Not checking if window condition holds
while (windowSum >= target) {
    minLen = Math.min(...);
    windowSum -= arr[left];
    left++;
}

// ✅ CORRECT — Always check condition before updating
while (windowSum >= target) {
    minLen = Math.min(minLen, right - left + 1);
    windowSum -= arr[left];
    left++;
}
```

## Complexity Comparison

| Problem | Brute Force | Sliding Window |
|---------|-------------|----------------|
| Max sum subarray of size k | O(n·k) | O(n) |
| Smallest subarray with sum ≥ target | O(n²) | O(n) |
| Longest substring without repeats | O(n²) | O(n) |
| Find all anagrams in string | O(n·k) | O(n) |

---

**Next:** [Frequency Counter](/DSA-Notes-Problems/data-structures/interview-prep/05-frequency-counter) →
