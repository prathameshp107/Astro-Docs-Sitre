---
title: "Binary Search"
description: "Master binary search — from fundamentals to advanced patterns, classic problems, and interview preparation."
sidebar:
  order: 0
---

# 🔍 Binary Search

Welcome to the **Binary Search** section. This module covers everything from the core algorithm to advanced applications and interview-ready patterns.

---

## 🎯 What is Binary Search?

Binary search is a **divide-and-conquer** search algorithm that finds a target in a **sorted** collection by repeatedly halving the search space.

Instead of checking every element one-by-one (O(n)), binary search eliminates **half** of the remaining candidates on every step — achieving **O(log n)** time.

```
Searching for 35 in a sorted array of 1,000,000 elements:

Linear Search:  up to 1,000,000 comparisons
Binary Search:  at most 20 comparisons   (log₂ 1,000,000 ≈ 20)
```

That is the power of logarithmic time.

---

## 📖 Topics Covered

### 🎯 Introduction
- [Binary Search — Introduction](/DSA-Notes-Problems/data-structures/binary-search/01-introduction) — What it is, prerequisites, ASCII walkthrough, iterative vs recursive, off-by-one bugs

### 🔹 Patterns
- [Binary Search Patterns](/DSA-Notes-Problems/data-structures/binary-search/02-patterns) — Classic, first/last occurrence, search on answer space, rotated array, monotonic function

### 💻 Problems
- [Binary Search Problems](/DSA-Notes-Problems/data-structures/binary-search/03-problems) — 10 classic LeetCode problems with full JavaScript solutions

### 🚀 Advanced
- [Advanced Applications](/DSA-Notes-Problems/data-structures/binary-search/04-advanced) — Floating-point search, BST search, exponential search, min/max answer problems

### 🧠 Interview Prep
- [Interview Questions](/DSA-Notes-Problems/data-structures/binary-search/05-interview-questions) — 12+ common questions with detailed answers

---

## 📚 Recommended Learning Path

| Step | Focus | Topic |
|------|-------|-------|
| 1 | **Understand** | [Introduction](/DSA-Notes-Problems/data-structures/binary-search/01-introduction) — algorithm walkthrough and complexity |
| 2 | **Patterns** | [Patterns](/DSA-Notes-Problems/data-structures/binary-search/02-patterns) — learn the 5 core templates |
| 3 | **Practice** | [Problems](/DSA-Notes-Problems/data-structures/binary-search/03-problems) — solve 10 classic problems |
| 4 | **Deepen** | [Advanced](/DSA-Notes-Problems/data-structures/binary-search/04-advanced) — floating-point, BST, exponential search |
| 5 | **Prepare** | [Interview Questions](/DSA-Notes-Problems/data-structures/binary-search/05-interview-questions) — nail the verbal explanations |

---

## 🧩 When Does Binary Search Apply?

Binary search is not limited to searching in sorted arrays. It applies **whenever the search space can be halved** at each step:

| Scenario | Example |
|----------|---------|
| Sorted array | Find a value, find first/last occurrence |
| Rotated sorted array | Find value after rotation |
| Monotonic function | Find where `f(x)` crosses a threshold |
| Answer space | "Find minimum X such that condition(X) is true" |
| 2D matrix with sorted rows | Search in row-major sorted grid |
| Floating-point precision | Find square root, cube root |
| BST | Search, insert, delete in O(log n) |

**The golden rule:** If you can say *"I can eliminate half the candidates"* after one comparison, binary search applies.

---

## ⚡ Quick Complexity Reference

| Operation | Time | Space |
|-----------|------|-------|
| Classic binary search | O(log n) | O(1) iterative / O(log n) recursive |
| Find first / last occurrence | O(log n) | O(1) |
| Binary search on answer | O(log(range) × cost of check) | O(1) |
| Exponential search | O(log n) | O(1) |

---

## 🔗 Related Topics

- [Arrays](/DSA-Notes-Problems/data-structures/arrays/arrays) — Binary search operates on arrays
- [Trees — BST](/DSA-Notes-Problems/data-structures/trees/08-bst) — BST is binary search on a tree structure
- [Recursion](/DSA-Notes-Problems/data-structures/recursion/01-introduction) — Recursive binary search and divide-and-conquer
- [Interview Prep](/DSA-Notes-Problems/data-structures/interview-prep/) — General patterns and coding strategies
