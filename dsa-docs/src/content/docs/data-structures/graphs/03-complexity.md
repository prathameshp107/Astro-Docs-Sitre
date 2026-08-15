---
title: "Time & Space Complexity"
description: "Complexity analysis of graph algorithms and operations by representation."
sidebar:
  order: 3
practice:
  visualizer: /visualizer/graphs
---

# Time & Space Complexity

> Understanding the performance characteristics of graph algorithms is critical for choosing the right approach in interviews.

---

## Traversal & Algorithm Complexity

| Algorithm | Time Complexity | Space Complexity | Notes |
|-----------|----------------|-----------------|-------|
| **BFS** | O(V + E) | O(V) | Queue + visited set |
| **DFS** | O(V + E) | O(V) | Stack/recursion + visited |
| **Dijkstra** | O((V + E) log V) | O(V) | With min-heap |
| **Bellman-Ford** | O(V × E) | O(V) | Handles negative weights |
| **Floyd-Warshall** | O(V³) | O(V²) | All-pairs shortest path |
| **Topological Sort** | O(V + E) | O(V) | BFS/DFS based |
| **Union-Find** | O(α(N)) ≈ O(1) | O(N) | With path compression |
| **Kruskal's (MST)** | O(E log E) | O(V) | Sorting edges dominates |
| **Prim's (MST)** | O((V + E) log V) | O(V) | With min-heap |

> **α(N)** is the inverse Ackermann function — practically constant for all realistic inputs (grows so slowly that for N = 10⁶⁰⁰, α(N) ≤ 5).

---

## Complexity by Graph Representation

For a graph with **V** vertices and **E** edges:

| Operation | Adjacency Matrix | Adjacency List |
|-----------|-----------------|----------------|
| **BFS/DFS Traversal** | O(V²) | **O(V + E)** |
| **Find Edge (u, v)** | **O(1)** | O(degree(v)) |
| **All Neighbors of v** | O(V) | **O(degree(v))** |
| **Add Vertex** | O(V²) | **O(1)** |
| **Add Edge** | O(1) | O(1) |
| **Remove Edge** | **O(1)** | O(degree(v)) |
| **Space** | O(V²) | **O(V + E)** |

> **💡 Key Insight:** For most interview problems (sparse graphs with E ≈ V), the adjacency list wins on time AND space. The matrix only makes sense for dense graphs where E ≈ V².

---

## Complexity by Graph Density

```
Sparse Graph (E ≈ V):          Dense Graph (E ≈ V²):
  Memory: O(V + E) ≈ O(V)       Memory: O(V²)
  Traversal: O(V + E) ≈ O(V)    Traversal: O(V²)
  
  → Use Adjacency List           → Matrix is acceptable
```

**Real-world densities:**
| Graph Type | Typical Density | E ~ | Best Representation |
|------------|----------------|-----|-------------------|
| Social network | Very sparse | V × avg_degree | Adjacency List |
| Web graph | Sparse | V × ~50 links | Adjacency List |
| Road network | Sparse | V × ~4 neighbors | Adjacency List |
| Complete tournament | Dense | V²/2 | Adjacency Matrix |

---

## Quick Reference

```
+------------------+----------------+-------------------+
| Problem          | Best Algorithm | Complexity        |
+------------------+----------------+-------------------+
| Shortest path    | BFS            | O(V + E)          |
| (unweighted)     |                |                   |
+------------------+----------------+-------------------+
| Shortest path    | Dijkstra       | O((V+E) log V)    |
| (no neg weights) |                |                   |
+------------------+----------------+-------------------+
| Shortest path    | Bellman-Ford   | O(V × E)          |
| (neg weights)    |                |                   |
+------------------+----------------+-------------------+
| All-pairs        | Floyd-Warshall | O(V³)             |
+------------------+----------------+-------------------+
| Cycle detection  | DFS            | O(V + E)          |
+------------------+----------------+-------------------+
| Topological sort | Kahn's BFS     | O(V + E)          |
+------------------+----------------+-------------------+
| Connected comps  | DFS/BFS/UF     | O(V + E)          |
+------------------+----------------+-------------------+
| MST              | Kruskal/Prim   | O(E log E)        |
+------------------+----------------+-------------------+
```

---

## Next Steps

With a solid understanding of complexity, dive into [Graph Traversal Algorithms](/DSA-Notes-Problems/data-structures/graphs/04-traversals) — BFS and DFS.

---

## Related Topics

- [Tree Complexity](/DSA-Notes-Problems/data-structures/trees/05-complexity) — Compare with tree algorithm complexities
