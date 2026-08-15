---
title: "Special Trees"
description: "Trie (Prefix Tree), Heap (Min/Max), and Segment Tree — now each on its own dedicated page."
sidebar:
  order: 3
practice:
  visualizer: /visualizer/trees
---

# Special Trees

> Advanced tree data structures — each now has its own detailed page with implementations, Mermaid diagrams, and practice problems.

---

## Dedicated Pages

Each special tree is now explained in depth on its own page:

| Tree | Dedicated Page | Key Operation | Time | Use Case |
|------|---------------|---------------|:----:|----------|
| **Trie** | [Trie (Prefix Tree) →](/DSA-Notes-Problems/data-structures/trees/15-trie) | Search string | O(L) | Autocomplete, spell check |
| **Heap** | [Priority Queue & Heap →](/DSA-Notes-Problems/data-structures/stacks-queues/priority-queue-and-heap) | Get min/max | O(1) peek | Priority queue, Dijkstra |
| **Segment Tree** | [Segment Tree →](/DSA-Notes-Problems/data-structures/trees/18-segment-tree) | Range query | O(log N) | Range sums, min, max |
| **Fenwick Tree** | [Fenwick Tree (BIT) →](/DSA-Notes-Problems/data-structures/trees/19-fenwick-bit) | Prefix sum | O(log N) | Range sums, counting |
| **AVL Tree** | [AVL Tree →](/DSA-Notes-Problems/data-structures/trees/16-avl-tree) | Self-balancing | O(log N) | Balanced BST |
| **Red-Black Tree** | [Red-Black Tree →](/DSA-Notes-Problems/data-structures/trees/17-red-black-tree) | Self-balancing | O(log N) | TreeMap, std::map |

---

## Quick Comparison

| Tree | Structure | Key Operation | Time | Use Case |
|------|-----------|--------------|:----:|----------|
| Trie | N-ary tree per char | Search string | O(L) | Autocomplete |
| Heap | Complete binary tree | Get min/max | O(1) peek | Priority queue |
| Segment Tree | Binary tree on ranges | Range query | O(log N) | Range sums/min |
| Fenwick Tree | Binary indexed | Prefix sum | O(log N) | Prefix sums |
| AVL Tree | Self-balancing BST | Search / Insert | O(log N) | Balanced BST |
| Red-Black | Self-balancing BST | Search / Insert | O(log N) | TreeMap, std::map |

---

## Related

- [Heap Operations](/DSA-Notes-Problems/data-structures/trees/09-heap) — Insert, Delete, Heapify
- [Types of Trees](/DSA-Notes-Problems/data-structures/trees/02-types) — Standard tree types
- [Tree Traversals](/DSA-Notes-Problems/data-structures/trees/06-traversals) — DFS & BFS
