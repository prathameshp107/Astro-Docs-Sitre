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

## 📖 Learning Path

### 🎯 Introduction
- [Binary Search — Introduction](/DSA-Notes-Problems/data-structures/binary-search/01-introduction) — Algorithm walkthrough, iterative vs recursive, off-by-one bugs

### 🔹 5 Core Patterns
- [Patterns Overview](/DSA-Notes-Problems/data-structures/binary-search/02-patterns) — Decision flowchart to pick the right pattern
  - [Classic Search](/DSA-Notes-Problems/data-structures/binary-search/02-patterns/01-classic-search) — Find exact value in sorted array
  - [First/Last Occurrence](/DSA-Notes-Problems/data-structures/binary-search/02-patterns/02-first-last-occurrence) — Handle duplicates
  - [Search on Answer](/DSA-Notes-Problems/data-structures/binary-search/02-patterns/03-search-on-answer) — Min/max feasible value
  - [Rotated Array](/DSA-Notes-Problems/data-structures/binary-search/02-patterns/04-rotated-array) — Search in rotated sorted array
  - [Monotonic Function](/DSA-Notes-Problems/data-structures/binary-search/02-patterns/05-monotonic-function) — Boundary search

### 💻 10 Classic Problems
- [Problems Overview](/DSA-Notes-Problems/data-structures/binary-search/03-problems) — 10 problems from easy to hard
  - Search Rotated Sorted Array, Find Min Rotated, 2D Matrix, Peak Element,
    Koko Bananas, Ship Packages, Split Array, Sqrt(x), First Bad Version, Time-Based KV

### 🚀 Advanced
- [Advanced Overview](/DSA-Notes-Problems/data-structures/binary-search/04-advanced) — Beyond the basics
  - [Floating-Point Search](/DSA-Notes-Problems/data-structures/binary-search/04-advanced/01-floating-point-search) — Continuous ranges with precision
  - [Median of Two Arrays](/DSA-Notes-Problems/data-structures/binary-search/04-advanced/02-find-median) — The hardest BS problem
  - [Exponential/Interpolation](/DSA-Notes-Problems/data-structures/binary-search/04-advanced/03-exponential-interpolation) — When log n isn't enough
  - [Real-World Problems](/DSA-Notes-Problems/data-structures/binary-search/04-advanced/04-real-world-problems) — Painter, Cows, Force, Trips

### 🧠 Interview Prep
- [Interview Questions Overview](/DSA-Notes-Problems/data-structures/binary-search/05-interview-questions) — 12+ questions
  - [Theory & Fundamentals](/DSA-Notes-Problems/data-structures/binary-search/05-interview-questions/01-theory-fundamentals)
  - [Pattern Recognition](/DSA-Notes-Problems/data-structures/binary-search/05-interview-questions/02-pattern-recognition)
  - [Tricky Variations](/DSA-Notes-Problems/data-structures/binary-search/05-interview-questions/03-tricky-variations)

---

## 📚 Recommended Learning Path

| Step | Focus | Topic |
|------|-------|-------|
| 1 | **Understand** | [Introduction](/DSA-Notes-Problems/data-structures/binary-search/01-introduction) — algorithm walkthrough and complexity |
| 2 | **Learn Patterns** | [5 Patterns](/DSA-Notes-Problems/data-structures/binary-search/02-patterns) — templates for 95% of problems |
| 3 | **Practice** | [10 Problems](/DSA-Notes-Problems/data-structures/binary-search/03-problems) — apply patterns to classic problems |
| 4 | **Deepen** | [Advanced](/DSA-Notes-Problems/data-structures/binary-search/04-advanced) — floating-point, median, exponential |
| 5 | **Prepare** | [Interview Questions](/DSA-Notes-Problems/data-structures/binary-search/05-interview-questions) — nail the verbal explanations |

---

## 🧩 When Does Binary Search Apply?

| Scenario | Example |
|----------|---------|
| Sorted array | Find a value, find first/last occurrence |
| Rotated sorted array | Find value after rotation |
| Monotonic function | Find where `f(x)` crosses a threshold |
| Answer space | "Find minimum X such that condition(X) is true" |
| 2D matrix with sorted rows | Search in row-major sorted grid |
| Floating-point precision | Find square root, cube root |

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
- [Recursion](/DSA-Notes-Problems/data-structures/recursion/01-introduction) — Recursive binary search and divide-and-conquer
- [Sorting](/DSA-Notes-Problems/data-structures/sorting) — Many sorting algorithms complement binary search
