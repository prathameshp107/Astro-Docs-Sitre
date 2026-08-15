---
title: "Types of Trees"
description: "Binary Tree, BST, AVL, Red-Black, Full/Complete/Perfect, Skewed, and N-ary trees with diagrams."
sidebar:
  order: 2
practice:
  visualizer: /visualizer/trees
---

# Types of Trees

---

## Binary Tree

A tree where each node has **at most 2 children**: left and right.

```mermaid
flowchart TD
    R[10] --> L[5]
    R --> R2[15]
    L --> LL[3]
    L --> LR[7]

    style R fill:#7c3aed,color:#fff
    style L fill:#4f46e5,color:#fff
    style R2 fill:#4f46e5,color:#fff
    style LL fill:#6366f1,color:#fff
    style LR fill:#6366f1,color:#fff
```

- Most common type in interviews
- Foundation for BST, Heaps, Segment Trees

---

## Binary Search Tree (BST)

A Binary Tree with the **BST Property**:
> For every node N: all values in the **left subtree < N**, all values in the **right subtree > N**

```mermaid
flowchart TD
    R[8] --> L[3]
    R --> R2[10]
    L --> LL[1]
    L --> LR[6]
    LR --> LRL[4]
    LR --> LRR[7]
    R2 --> R2L[NULL]
    R2 --> R2R[14]
    R2R --> R2RL[13]
    R2R --> R2RR[NULL]

    style R fill:#7c3aed,color:#fff
    style L fill:#4f46e5,color:#fff
    style R2 fill:#4f46e5,color:#fff
    style LL fill:#6366f1,color:#fff
    style LR fill:#6366f1,color:#fff
    style LRL fill:#6366f1,color:#fff
    style LRR fill:#6366f1,color:#fff
    style R2R fill:#4f46e5,color:#fff
    style R2RL fill:#6366f1,color:#fff
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

```mermaid
flowchart TD
    subgraph Balanced[Balanced AVL ✅]
        B1[30
BF=1] --> B2[20
BF=1]
        B2 --> B3[10
BF=0]
    end
    
    subgraph Unbalanced[Unbalanced ❌ triggers LL rotation]
        U1[30
BF=3] --> U2[20
BF=2]
        U2 --> U3[10
BF=1]
        U3 --> U4[5
BF=0]
    end
    
    style Balanced fill:#059669,color:#fff
    style Unbalanced fill:#ef4444,color:#fff
    style B1 fill:#059669,color:#fff
    style B2 fill:#059669,color:#fff
    style B3 fill:#059669,color:#fff
    style U1 fill:#ef4444,color:#fff
    style U2 fill:#ef4444,color:#fff
    style U3 fill:#ef4444,color:#fff
    style U4 fill:#ef4444,color:#fff
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

```mermaid
flowchart TB
    subgraph Full[Full Binary Tree
Every node has 0 or 2 children]
        F1[1] --> F2[2]
        F1 --> F3[3]
        F2 --> F4[4]
        F2 --> F5[5]
    end
    
    subgraph Complete[Complete Binary Tree
Last level fills left to right]
        C1[1] --> C2[2]
        C1 --> C3[3]
        C2 --> C4[4]
        C2 --> C5[5]
        C3 --> C6[6]
    end
    
    subgraph Perfect[Perfect Binary Tree
All leaves at same level]
        P1[1] --> P2[2]
        P1 --> P3[3]
        P2 --> P4[4]
        P2 --> P5[5]
        P3 --> P6[6]
        P3 --> P7[7]
    end
    
    style Full fill:#7c3aed,color:#fff
    style Complete fill:#3b82f6,color:#fff
    style Perfect fill:#059669,color:#fff
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
