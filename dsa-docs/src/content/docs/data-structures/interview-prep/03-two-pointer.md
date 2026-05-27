---
title: "Two Pointer Technique"
description: "Two pointer technique with visual examples: reverse array, pair sum, palindrome, and container problems."
sidebar:
  order: 4
---

# Two Pointer Technique

## Overview

The **Two Pointer** technique uses two pointers (index variables) to traverse an array, typically moving toward each other or in the same direction at different speeds. It reduces time complexity from O(n²) to O(n) in many cases.

![Two Pointer Visualization](/DSA-Notes-Problems/assets/images/interview-prep/two-pointer.svg)

## Common Patterns

### 1. Pointer Moving Toward Each Other

**Use Cases:** Reverse array, palindrome check, two-sum in sorted array

```javascript
/**
 * Reverse array in-place
 * Left pointer starts at 0, right pointer at end.
 * Swap, then move L→, R← until they meet.
 */
function reverseArray(arr) {
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        // Swap
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }

    return arr;
}

console.log(reverseArray([1, 2, 3, 4, 5])); // [5, 4, 3, 2, 1]
```

```javascript
/**
 * Check if a string is a palindrome
 * Compare characters at left and right, moving inward.
 */
function isPalindrome(str) {
    let left = 0;
    let right = str.length - 1;

    while (left < right) {
        if (str[left] !== str[right]) return false;
        left++;
        right--;
    }

    return true;
}

console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello"));   // false
```

```javascript
/**
 * Two Sum in SORTED array
 * Since array is sorted, if sum > target, move right pointer left.
 * If sum < target, move left pointer right.
 */
function twoSumSorted(nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        const sum = nums[left] + nums[right];

        if (sum === target) return [left, right];
        if (sum < target) left++;
        else right--;
    }

    return [-1, -1];
}

console.log(twoSumSorted([2, 7, 11, 15], 9)); // [0, 1]
```

### 2. Fast and Slow Pointer

**Use Cases:** Cycle detection, middle of linked list

```javascript
/**
 * Find middle of an array
 * Fast pointer moves 2 steps, slow moves 1 step.
 * When fast reaches end, slow is at the middle.
 */
function findMiddle(arr) {
    let slow = 0;
    let fast = 0;

    while (fast < arr.length && fast + 1 < arr.length) {
        slow++;
        fast += 2;
    }

    return arr[slow];
}

console.log(findMiddle([1, 2, 3, 4, 5]));    // 3
console.log(findMiddle([1, 2, 3, 4, 5, 6])); // 4
```

### 3. Same Direction Pointers (Sliding Window Variation)

**Use Cases:** Removing duplicates from sorted array, in-place array operations

```javascript
/**
 * Remove duplicates from sorted array in-place
 * Slow pointer tracks unique elements position.
 * Fast pointer scans ahead for new values.
 */
function removeDuplicates(nums) {
    if (nums.length === 0) return 0;

    let slow = 0;

    for (let fast = 1; fast < nums.length; fast++) {
        if (nums[fast] !== nums[slow]) {
            slow++;
            nums[slow] = nums[fast];
        }
    }

    return slow + 1; // length of unique portion
}

console.log(removeDuplicates([1, 1, 2, 2, 3, 4, 4, 5]));
// Returns 5, array becomes [1, 2, 3, 4, 5, ...]
```

## When to Use Two Pointers

| Signal | Pattern | Example Problems |
|--------|---------|-----------------|
| **Sorted array** | Pointers toward each other | Two Sum II, Three Sum |
| **Palindrome** | Start and end compare | Valid Palindrome |
| **In-place reverse** | Swap ends | Reverse array/string |
| **Remove duplicates** | Slow/fast same direction | Remove Duplicates |
| **Find middle** | Fast/slow | Middle of Linked List |
| **Container area** | Maximize area | Container With Most Water |
| **Triplet sum** | Fix one, two-point rest | Three Sum |

## Time Complexity Analysis

| Problem | Brute Force | Two Pointer |
|---------|-------------|-------------|
| Two Sum (sorted) | O(n²) | O(n) |
| Three Sum | O(n³) | O(n²) |
| Palindrome Check | O(n²) | O(n) |
| Remove Duplicates | O(n²) | O(n) |
| Reverse Array | O(n) | O(n) — but O(1) extra space |

---

**Next:** [Sliding Window](/DSA-Notes-Problems/data-structures/interview-prep/04-sliding-window) →
