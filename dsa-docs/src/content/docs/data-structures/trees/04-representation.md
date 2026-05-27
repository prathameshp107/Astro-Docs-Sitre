---
title: "Tree Representation"
description: "Pointer-based and array-based representations of trees with diagrams and code."
sidebar:
  order: 4
---

# Tree Representation

---

## Pointer-Based Representation

The most natural way — each node holds data and pointers to children.

```javascript
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// Building a tree manually:
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
```

```
         [1]
        /   \
      [2]   [3]
     /
   [4]
```

| Pros | Cons |
|------|------|
| Dynamic size, easy insertion/deletion | Extra memory for pointers (~2 per node) |
| Natural for recursion | |
| Sparse trees are memory efficient | |

---

## Array-Based Representation (Heap)

A **Complete Binary Tree** can be stored in an array using index math:

```
         [1]           Index: 0
        /   \
      [2]   [3]        Index: 1, 2
     /  \  /  \
   [4] [5][6] [7]      Index: 3, 4, 5, 6

Array: [1, 2, 3, 4, 5, 6, 7]
       [0, 1, 2, 3, 4, 5, 6]
```

**Index Formulas** (0-indexed):

| Relation      | Formula             |
|---------------|---------------------|
| Left child    | `2 * i + 1`         |
| Right child   | `2 * i + 2`         |
| Parent        | `Math.floor((i-1)/2)` |

| Pros | Cons |
|------|------|
| No pointer overhead | Works best for complete/perfect trees |
| Cache-friendly | Wastes space for sparse trees |
| Simple math-based navigation | Insertion/deletion shift elements |

---

## Choosing a Representation

| Scenario | Recommended |
|----------|-------------|
| General tree problems | Pointer-based |
| Heap implementation | Array-based |
| Segment Tree | Array-based |
| Memory-constrained | Array-based |
| Dynamic insertions/deletions | Pointer-based |

---

## Related

- [Types of Trees](/DSA-Notes-Problems/data-structures/trees/02-types) — Learn about different tree structures
- [Tree Traversals](/DSA-Notes-Problems/data-structures/trees/06-traversals) — How to navigate trees
- [BST Operations](/DSA-Notes-Problems/data-structures/trees/08-bst) — Search, Insert, Delete in BST
