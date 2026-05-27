---
title: "Types of Trees"
description: "Binary Tree, BST, AVL, Red-Black, Full/Complete/Perfect, Skewed, and N-ary trees with diagrams."
sidebar:
  order: 2
---

# Types of Trees

---

## Binary Tree

A tree where each node has **at most 2 children**: left and right.

```
         [10]
        /    \
      [5]    [15]
     /  \
   [3]  [7]
```

- Most common type in interviews
- Foundation for BST, Heaps, Segment Trees

---

## Binary Search Tree (BST)

A Binary Tree with the **BST Property**:
> For every node N: all values in the **left subtree < N**, all values in the **right subtree > N**

```
         [8]
        /   \
      [3]   [10]
     /  \      \
   [1]  [6]   [14]
       /  \   /
     [4] [7] [13]
```

**BST Invariant**: Inorder traversal of a BST always gives a **sorted sequence**.
- `1, 3, 4, 6, 7, 8, 10, 13, 14` ← sorted!

---

## Balanced Trees

### AVL Tree
- A self-balancing BST where the **height difference** between left and right subtrees of any node is **at most 1**.
- **Balance Factor** = `height(left) - height(right)` ∈ `{-1, 0, 1}`.
- On insert/delete, **rotations** (LL, RR, LR, RL) restore balance.
- **Height**: O(log N) guaranteed.

```
      [30]        BF = 1-0 = 1  ✅
      /
    [20]          BF = 1-0 = 1  ✅
    /
  [10]            BF = 0       ✅
```

If we insert `[5]` without rebalancing:
```
      [30]        BF = 3  ❌  → Trigger LL Rotation
      /
    [20]
    /
  [10]
  /
[5]
```

### Red-Black Tree
- Self-balancing BST with color rules (each node is RED or BLACK).
- **Rules**:
  1. Every node is Red or Black.
  2. Root is always Black.
  3. No two consecutive Red nodes (Red's children must be Black).
  4. Every path from root to NULL leaf has the same number of Black nodes.
- Looser balancing than AVL → **faster insertions/deletions** (fewer rotations).
- Used internally by: `std::map` in C++, `TreeMap` in Java, Linux scheduler.

---

## Full, Complete, and Perfect Binary Trees

### Full Binary Tree
> Every node has **0 or 2 children** (never 1).

```
         [1]
        /   \
      [2]   [3]
     /  \
   [4]  [5]
```

### Complete Binary Tree
> All levels are **fully filled except possibly the last**, which is filled **from left to right**.

```
         [1]
        /   \
      [2]   [3]
     /  \   /
   [4] [5] [6]     ← last level fills left to right ✅
```

- **Heaps** are always complete binary trees.

### Perfect Binary Tree
> All internal nodes have **exactly 2 children** and all leaves are at the **same level**.

```
         [1]
        /   \
      [2]   [3]
     /  \  /  \
   [4][5][6]  [7]
```

- A perfect binary tree with height `h` has `2^(h+1) - 1` nodes.

---

## Skewed Trees

A tree where every node has **only one child** — essentially degenerates into a linked list.

```
Left-Skewed:          Right-Skewed:
   [10]                  [10]
   /                        \
 [8]                        [15]
 /                              \
[5]                             [20]
```

- Worst case for BST operations: O(N) instead of O(log N)
- Avoided using balanced trees (AVL, Red-Black)

---

## N-ary Trees

A tree where each node can have **at most N children**.

```
           [1]
         / | \
       [2][3][4]
      / \
    [5] [6]
```

- File systems use N-ary trees (directories with many subdirectories)
- Represented with a list of children per node

---

## Quick Comparison

| Type | Children | Use Case |
|------|----------|----------|
| Binary Tree | ≤ 2 | General purpose |
| BST | ≤ 2 (ordered) | Fast search/sort |
| AVL Tree | ≤ 2 (balanced) | Guaranteed O(log N) |
| Red-Black | ≤ 2 (balanced) | Faster inserts/deletes |
| Full Binary | 0 or 2 | Expression trees |
| Complete Binary | ≤ 2 (left-filled) | Heaps |
| Perfect Binary | Exactly 2 | Theoretical |
| N-ary | ≤ N | File systems, DOM |
| Skewed | 1 (effectively) | Degenerate case |

---

## Related

- [Special Trees](/DSA-Notes-Problems/data-structures/trees/03-special-trees) — Trie, Heap, Segment Tree
- [Tree Representation](/DSA-Notes-Problems/data-structures/trees/04-representation) — Pointer-based & array-based
- [BST Operations](/DSA-Notes-Problems/data-structures/trees/08-bst) — Search, Insert, Delete
