---
title: "Problem-Solving Approach"
description: "How to identify graph problems, decision framework, and BFS vs DFS cheat sheet."
sidebar:
  order: 7
---

# Problem-Solving Approach

> A systematic approach to identify graph problems and choose the right algorithm.

---

## How to Identify Graph Problems

Look for these keywords and patterns in the problem statement:

### 🔍 Graph Keywords

| Keyword / Phrase | Likely Graph Problem |
|-----------------|---------------------|
| "nodes and connections" | General graph problem |
| "network", "circuit", "path" | Graph traversal / shortest path |
| "grid" with movement | Implicit graph (BFS/DFS) |
| "relationships", "dependencies" | Graph problem |
| "islands", "components", "groups" | Connected components (DFS/UF) |
| "shortest path", "minimum steps" | BFS / Dijkstra |
| "prerequisites", "ordering" | Topological Sort |
| "detect cycle" | Cycle detection (DFS) |
| "union", "same group" | Union-Find |
| "spanning tree", "min cost to connect" | MST (Kruskal / Prim) |

---

## Decision Framework

```
START
  │
  ├─ Unweighted graph + shortest path?
  │     └──→ BFS
  │
  ├─ Weighted graph + shortest path (no negative)?
  │     └──→ Dijkstra
  │
  ├─ Weighted graph + negative edges?
  │     └──→ Bellman-Ford
  │
  ├─ All-pairs shortest path?
  │     └──→ Floyd-Warshall
  │
  ├─ Cycle detection?
  │     ├─ Undirected → DFS with parent tracking
  │     └─ Directed  → DFS with recursion stack (or Kahn's)
  │
  ├─ Connected components / island counting?
  │     └──→ DFS or BFS or Union-Find
  │
  ├─ Task ordering / prerequisites?
  │     └──→ Topological Sort (Kahn's or DFS)
  │
  ├─ Minimum spanning tree?
  │     ├─ Sparse graph → Kruskal's
  │     └─ Dense graph  → Prim's
  │
  ├─ Dynamic connectivity / union queries?
  │     └──→ Union-Find
  │
  └─ Multiple sources, equidistant spread?
        └──→ Multi-source BFS
```

---

## BFS vs DFS Cheat Sheet

| Use BFS When | Use DFS When |
|-------------|-------------|
| Shortest path (unweighted) | Cycle detection (any path) |
| Level-by-level traversal | Topological sort |
| Minimum steps to reach goal | Connected components |
| Multi-source spreading | Backtracking problems |
| Finding nodes at distance K | Path existence check |
| Word ladder problems | Maze solving (any path) |
| **Solution is close to root** | **Solution is deep in the graph** |

---

## Step-by-Step Problem-Solving Template

### Step 1: Model the Problem

- What are the **vertices**?
- What are the **edges**?
- Is it **directed** or **undirected**?
- Is it **weighted** or **unweighted**?
- Is it a **grid** (implicit graph)?

### Step 2: Choose the Representation

```javascript
// Default: Build adjacency list
const graph = new Map();
for (const [u, v] of edges) {
  if (!graph.has(u)) graph.set(u, []);
  if (!graph.has(v)) graph.set(v, []);
  graph.get(u).push(v);
  graph.get(v).push(u); // For undirected
}
```

### Step 3: Pick the Algorithm

Use the decision framework above.

### Step 4: Handle Edge Cases

- Empty graph (no nodes/edges)
- Single node (self-loop?)
- Disconnected graph
- All nodes isolated
- Negative cycles (Bellman-Ford)
- Dense vs sparse (choose representation wisely)
- Source == Destination (distance = 0)

### Step 5: Write the Code

Use the templates and patterns from previous sections.

---

## Common Problem Categories

| Category | Typical Pattern | Example LeetCode |
|----------|----------------|-----------------|
| **Path Finding** | BFS / Dijkstra | 1971, 743 |
| **Connectivity** | DFS / Union-Find | 200, 323 |
| **Ordering** | Topological Sort | 207, 210 |
| **Grid Traversal** | BFS/DFS on grid | 733, 994 |
| **Graph Properties** | BFS/DFS analysis | 785, 261 |
| **MST** | Kruskal / Prim | 1584, 1135 |

---

## Next Steps

Now study the [Code Examples](/DSA-Notes-Problems/data-structures/graphs/08-code-examples) for full JavaScript implementations.

---

## Related Topics

- [BFS & DFS Traversals](/DSA-Notes-Problems/data-structures/graphs/04-traversals) — Master the fundamentals first
- [Graph Patterns](/DSA-Notes-Problems/data-structures/graphs/05-patterns) — Deeper dive into each pattern
