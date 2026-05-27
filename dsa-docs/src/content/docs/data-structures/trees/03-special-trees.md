---
title: "Special Trees"
description: "Trie (Prefix Tree), Heap (Min/Max), and Segment Tree — advanced tree data structures."
sidebar:
  order: 3
---

# Special Trees

---

## Trie (Prefix Tree)

A tree used for **storing strings** where each node represents a character. Commonly used for autocomplete.

```
Inserting: "cat", "car", "card", "care", "bat"

           root
          /    \
        [c]    [b]
         |      |
        [a]    [a]
       /   \    |
     [t]  [r]  [t]
           |
          [d]  [e]
```

### Key Points
- Each root-to-leaf path represents a word.
- `isEndOfWord` flag marks complete words.
- **Search/Insert**: O(L) where L = length of the string.
- Common prefixes share memory (space efficient for dictionaries).

### Use Cases
- Autocomplete / predictive text
- Spell checkers
- IP routing (longest prefix matching)
- Word games (Boggle solver)

---

## Heap (Min Heap & Max Heap)

A **Complete Binary Tree** satisfying the **Heap Property**:

### Max Heap
> Parent is always **greater than or equal to** its children.

```
         [50]
        /    \
      [30]  [40]
     /   \  /
   [10] [20][35]
```

### Min Heap
> Parent is always **less than or equal to** its children.

```
         [10]
        /    \
      [20]  [15]
     /   \
   [40] [50]
```

### Key Properties
- Root of Min Heap = minimum element
- Root of Max Heap = maximum element
- **Peek**: O(1)
- **Insert/Delete**: O(log N)
- **Build Heap**: O(N) (not O(N log N))

### Use Cases
- Priority Queues
- Dijkstra's Algorithm
- Heap Sort
- Median finding (two heaps pattern)

---

## Segment Tree (Basic Overview)

A tree used to answer **range queries** efficiently (e.g., range sum, range minimum).

```
Array: [1, 3, 5, 7, 9, 11]

Segment Tree (Sum):
             [36]        (sum of [0..5])
            /    \
         [9]     [27]    ([0..2], [3..5])
        /   \   /   \
      [4] [5] [16] [11]  ([0..1],[2..2],[3..4],[5..5])
      / \
    [1] [3]
```

### Operations
| Operation | Time Complexity |
|-----------|----------------|
| Build     | O(N)           |
| Query     | O(log N)       |
| Update    | O(log N)       |

### Use Cases
- Range sum / range minimum queries
- Range updates (lazy propagation)
- Competitive programming problems

---

## Comparison

| Tree | Structure | Key Operation | Time | Use Case |
|------|-----------|--------------|------|----------|
| Trie | N-ary tree per char | Search string | O(L) | Autocomplete |
| Heap | Complete binary tree | Get min/max | O(1) peek | Priority queue |
| Segment Tree | Binary tree on ranges | Range query | O(log N) | Range sums/min |

---

## Related

- [Heap Operations](/DSA-Notes-Problems/data-structures/trees/09-heap) — Insert, Delete, Heapify
- [Types of Trees](/DSA-Notes-Problems/data-structures/trees/02-types) — Standard tree types
- [Tree Traversals](/DSA-Notes-Problems/data-structures/trees/06-traversals) — DFS & BFS
