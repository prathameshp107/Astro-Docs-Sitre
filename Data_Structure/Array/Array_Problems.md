# Array Problems - Complete Index

This document lists all array problems from the DSA Notes & Problems repository, organized by file and difficulty level.

---

## Table of Contents

1. [Array_problems.js](#array_problemsjs)
2. [Array_problems1.js](#array_problems1js)
3. [Array_problems2.js](#array_problems2js)

---

## Array_problems.js

### Basic to Intermediate Array Problems

| # | Problem | Topics | File |
|---|---------|--------|------|
| 1 | Two Sum | Hash Map, Two Pointers | [Array_problems.js](Array_problems.js) |
| 2 | Palindrome | Two Pointers, String Reversal | [Array_problems.js](Array_problems.js) |
| 3 | Reverse String | String Manipulation, Two Pointers | [Array_problems.js](Array_problems.js) |
| 4 | Merge Sorted Array | Two Pointers, Merging | [Array_problems.js](Array_problems.js) |
| 5 | Valid Parentheses | Stack Data Structure | [Array_problems.js](Array_problems.js) |

**Key Concepts:**
- Hash Map for O(n) lookups
- Two Pointer technique
- Stack-based validation

---

## Array_problems1.js

### Array Manipulation Problems

| # | Problem | Topics | File |
|---|---------|--------|------|
| 1 | Remove Duplicates from Sorted Array | Two Pointers, In-place modification | [Array_problems1.js](Array_problems1.js) |
| 2 | Left Rotate Array by One | Array Shifting | [Array_problems1.js](Array_problems1.js) |
| 3 | Left Rotate Array by K Places | Reversal Algorithm | [Array_problems1.js](Array_problems1.js) |
| 4 | Move Zeros to End | Two Pointers | [Array_problems1.js](Array_problems1.js) |
| 5 | Rotate Array (Right Rotation) | Reversal Algorithm | [Array_problems1.js](Array_problems1.js) |

**Key Concepts:**
- In-place array manipulation
- Rotation algorithms (forward & reverse)
- Two pointer technique for reordering

---

## Array_problems2.js

### Basic Array Search Problems

| # | Problem | Topics | File |
|---|---------|--------|------|
| 1 | Find the Largest Element in Array | Linear Scan | [Array_problems2.js](Array_problems2.js) |
| 2 | Find the Minimum Element in Array | Linear Scan | [Array_problems2.js](Array_problems2.js) |
| 3 | Find the Second Largest Element | Single Pass | [Array_problems2.js](Array_problems2.js) |
| 4 | Find the Nth Largest Element | Sorting | [Array_problems2.js](Array_problems2.js) |
| 5 | Find the Nth Minimum Element | Sorting | [Array_problems2.js](Array_problems2.js) |
| 6 | Check if Array is Sorted | Linear Scan | [Array_problems2.js](Array_problems2.js) |

**Key Concepts:**
- Linear scanning techniques
- Sorting for selection problems
- Min/Max tracking patterns

---

## Complexity Cheat Sheet

### Time Complexity Summary

| Problem | Best | Average | Worst |
|---------|------|---------|-------|
| Two Sum (Hash) | O(n) | O(n) | O(n) |
| Palindrome | O(1) | O(n) | O(n) |
| Merge Sorted | O(n+m) | O(n+m) | O(n+m) |
| Remove Duplicates | O(n) | O(n) | O(n) |
| Rotate Array | O(n) | O(n) | O(n) |
| Find Largest | O(n) | O(n) | O(n) |
| Find Nth Largest | O(n) | O(n log n) | O(n log n) |

---

## Problem Difficulty Progression

### Beginner Level ⭐
- Find the Largest Element
- Find the Minimum Element
- Check if Array is Sorted

### Intermediate Level ⭐⭐
- Two Sum
- Palindrome
- Merge Sorted Array
- Remove Duplicates
- Move Zeros to End

### Advanced Level ⭐⭐⭐
- Rotate Array (K Places)
- Valid Parentheses
- Find Second Largest
- Find Nth Largest/Minimum

---

## Quick Reference: Topics Covered

- **Data Structures:** Arrays, Hash Maps, Stacks
- **Techniques:** Two Pointers, Hash Maps, Sorting, Reversal, Linear Scan
- **Concepts:** In-place modification, O(1) space complexity, O(n) time complexity
- **Patterns:** Min/Max tracking, Merging, Rotation, Validation

---

**Total Problems:** 16  
**Total Approaches Covered:** 25+  
**Recommended Practice Order:** Array_problems2.js → Array_problems.js → Array_problems1.js
