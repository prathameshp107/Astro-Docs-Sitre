---
title: "Sorting Algorithms"
description: "Complete guide to sorting algorithms — bubble, selection, insertion, merge, quick, and heap sort — with JavaScript implementations and interview prep."
sidebar:
  order: 0
practice:
  visualizer: /visualizer/sorting
---

# Sorting Algorithms

Welcome to the **Sorting Algorithms** section — from the simplest O(n²) sorts to efficient O(n log n) algorithms. This module covers every major sorting algorithm with visual diagrams, JavaScript implementations, complexity analysis, and interview preparation.

---

## 📚 Learning Path

| Step | Topic | What You'll Learn |
|------|-------|-------------------|
| 1 | [Introduction](/DSA-Notes-Problems/data-structures/sorting/01-introduction) | What is sorting, stable vs unstable, in-place vs out-of-place |
| 2 | [Bubble Sort](/DSA-Notes-Problems/data-structures/sorting/02-bubble-sort) | Simplest sort, optimized with early exit |
| 3 | [Selection Sort](/DSA-Notes-Problems/data-structures/sorting/03-selection-sort) | Find minimum repeatedly, place in position |
| 4 | [Insertion Sort](/DSA-Notes-Problems/data-structures/sorting/04-insertion-sort) | Playing cards analogy, great for nearly sorted data |
| 5 | [Merge Sort](/DSA-Notes-Problems/data-structures/sorting/05-merge-sort) | Divide & conquer, guaranteed O(n log n), stable |
| 6 | [Quick Sort](/DSA-Notes-Problems/data-structures/sorting/06-quick-sort) | Pivot-based partitioning, fast in practice |
| 7 | [Heap Sort](/DSA-Notes-Problems/data-structures/sorting/07-heap-sort) | Heap data structure, O(n log n) with O(1) space |
| 8 | [Complexity Comparison](/DSA-Notes-Problems/data-structures/sorting/08-complexity-comparison) | Full comparison table, when to use which |
| 9 | [Interview Questions](/DSA-Notes-Problems/data-structures/sorting/09-interview-questions) | 15+ questions with detailed answers |

---

## ⚡ Quick Complexity Reference

| Algorithm | Best | Average | Worst | Space | Stable |
|-----------|------|---------|-------|-------|--------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | ✅ Yes |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) | ❌ No |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) | ✅ Yes |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | ✅ Yes |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | ❌ No |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) | ❌ No |

---

## 🎯 When to Use Which Sort

```
Input Size?
├── Tiny (n < 20) ──────────────────────────────→ Insertion Sort
└── Larger
    ├── Nearly Sorted? ──────────────────────────→ Insertion Sort
    ├── Need Stable Sort?
    │   ├── Memory Available ─────────────────────→ Merge Sort
    │   └── Memory Constrained ──────────────────→ (no O(1) stable sort)
    ├── Need O(1) Space + O(n log n)?
    │   └── Not stable needed ────────────────────→ Heap Sort
    └── General Purpose
        ├── Average performance matters ──────────→ Quick Sort
        └── Guaranteed performance needed ────────→ Merge Sort
```

---

## 🔹 Algorithm Categories

### Simple / Quadratic Sorts — O(n²)
These are easy to understand and implement but slow for large inputs:
- **Bubble Sort** — repeatedly swap adjacent elements
- **Selection Sort** — find minimum, place at front
- **Insertion Sort** — build sorted portion one element at a time

### Efficient / Logarithmic Sorts — O(n log n)
Optimal comparison-based sorting algorithms:
- **Merge Sort** — divide, sort halves, merge back
- **Quick Sort** — partition around pivot recursively
- **Heap Sort** — use a max-heap to extract in order

---

## 🧠 Key Concepts to Know

### Stable vs Unstable Sort
A sort is **stable** if equal elements maintain their original relative order.

```
Original: [(3,a), (1,b), (3,c), (2,d)]
                    ↑           ↑
             Both have key 3

Stable result:   [(1,b), (2,d), (3,a), (3,c)]  ← a before c ✅
Unstable result: [(1,b), (2,d), (3,c), (3,a)]  ← c before a ❌
```

### In-Place vs Out-of-Place
- **In-place**: Sorts the array using O(1) extra space (Bubble, Selection, Insertion, Heap, Quick)
- **Out-of-place**: Requires extra memory (Merge Sort uses O(n) extra space)

### Comparison vs Non-Comparison
- **Comparison sorts**: Compare elements to determine order (all 6 algorithms above) — lower bound is O(n log n)
- **Non-comparison sorts**: Use element values directly (Counting Sort, Radix Sort, Bucket Sort) — can achieve O(n)

---

## 💡 Interview Quick Tips

> **"What is the best sorting algorithm?"** — There's no single answer. It depends on input size, memory constraints, stability requirements, and data distribution.

> **"Which sort does JavaScript's `.sort()` use?"** — V8 uses **TimSort** (hybrid of merge sort + insertion sort) which is stable and O(n log n).

> **"Can you sort faster than O(n log n)?"** — Yes, with non-comparison sorts like Counting Sort or Radix Sort, given constraints on the data range.

---

## Related Topics

- [Arrays](/DSA-Notes-Problems/data-structures/arrays/arrays) — Sorting operates on arrays
- [Trees / Heaps](/DSA-Notes-Problems/data-structures/trees/09-heap) — Heap Sort uses a max-heap
- [Recursion](/DSA-Notes-Problems/data-structures/recursion/01-introduction) — Merge Sort and Quick Sort use recursion

*Start with [Introduction to Sorting](/DSA-Notes-Problems/data-structures/sorting/01-introduction) →*
