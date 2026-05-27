---
title: "Time & Space Complexity"
description: "Time and space complexity analysis for tree operations, traversals, BST, balanced trees, and heaps."
sidebar:
  order: 5
---

# Time & Space Complexity

---

## Traversal Complexities

| Operation        | Time Complexity | Space Complexity          |
|------------------|-----------------|---------------------------|
| Any DFS Traversal | O(N)           | O(H) — call stack (H = height) |
| BFS (Level Order) | O(N)           | O(W) — W = max width of tree   |

- Best case (balanced): Space = O(log N)
- Worst case (skewed): Space = O(N)

---

## BST Operations

| Operation | Average (Balanced) | Worst (Skewed) |
|-----------|--------------------|----------------|
| Search    | O(log N)           | O(N)           |
| Insert    | O(log N)           | O(N)           |
| Delete    | O(log N)           | O(N)           |

---

## Balanced Tree Operations (AVL / Red-Black)

| Operation | Time Complexity | Notes                          |
|-----------|-----------------|--------------------------------|
| Search    | O(log N)        | Guaranteed due to balance       |
| Insert    | O(log N)        | Plus O(log N) rotations         |
| Delete    | O(log N)        | Plus O(log N) rotations         |

---

## Heap Operations

| Operation     | Time Complexity | Notes                           |
|---------------|-----------------|---------------------------------|
| Insert        | O(log N)        | Bubble up (sift up)              |
| Delete Min/Max| O(log N)        | Heapify down (sift down)         |
| Peek Min/Max  | O(1)            | Root always holds min/max        |
| Build Heap    | O(N)            | Not O(N log N) — mathematical proof |

---

## Quick Reference

```
┌─────────────────────────────────────────────┐
│              TREE COMPLEXITY CHEAT SHEET     │
├──────────────────────┬──────────┬────────────┤
│ Operation            │ BST (avg)│ Balanced   │
├──────────────────────┼──────────┼────────────┤
│ Search               │ O(log N) │ O(log N)   │
│ Insert               │ O(log N) │ O(log N)   │
│ Delete               │ O(log N) │ O(log N)   │
│ Min / Max            │ O(H)     │ O(log N)   │
└──────────────────────┴──────────┴────────────┘
```

---

## Related

- [Tree Traversals](/DSA-Notes-Problems/data-structures/trees/06-traversals) — DFS & BFS algorithms
- [BST Operations](/DSA-Notes-Problems/data-structures/trees/08-bst) — Search, Insert, Delete
- [Heap Operations](/DSA-Notes-Problems/data-structures/trees/09-heap) — Insert, Delete, Heapify
