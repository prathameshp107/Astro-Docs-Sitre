# 📊 Graph Data Structures — Complete Guide for Interview Preparation

> A comprehensive, beginner-to-advanced guide covering everything you need to master Graph DSA for technical interviews.

---

## Table of Contents

1. [Introduction to Graphs](#1-introduction-to-graphs)
2. [Graph Representations](#2-graph-representations)
3. [Time and Space Complexity](#3-time-and-space-complexity)
4. [Graph Traversal Algorithms](#4-graph-traversal-algorithms)
5. [Important Graph Patterns](#5-important-graph-patterns)
6. [Key Algorithms on Graphs](#6-key-algorithms-on-graphs)
7. [Problem-Solving Approach](#7-problem-solving-approach)
8. [Code Examples (JavaScript)](#8-code-examples-javascript)
9. [Must-Do Interview Questions](#9-must-do-interview-questions)
10. [Tips and Common Mistakes](#10-tips-and-common-mistakes)
11. [Real-World Applications](#11-real-world-applications)

---

## 1. Introduction to Graphs

### What is a Graph?

A **graph** is a non-linear data structure consisting of a set of **vertices** (nodes) connected by **edges** (links). Unlike trees (which are a special type of graph), graphs can have cycles, disconnected components, and edges pointing in any direction.

```
Visual: A simple undirected graph

    (A)-----(B)
     |     / |
     |    /  |
     |   /   |
    (C)-----(D)
         |
        (E)

Vertices: A, B, C, D, E
Edges: A-B, A-C, B-C, B-D, C-D, C-E
```

---

### Terminologies

| Term | Definition | Example |
|------|------------|---------|
| **Vertex (Node)** | A fundamental unit/point in a graph | Cities on a map |
| **Edge** | A connection between two vertices | Roads between cities |
| **Degree** | Number of edges connected to a vertex | City with 3 roads → degree 3 |
| **In-Degree** | Edges coming INTO a vertex (directed graph) | Twitter followers |
| **Out-Degree** | Edges going OUT of a vertex (directed graph) | Twitter following |
| **Path** | A sequence of vertices connected by edges | Route from A to E |
| **Simple Path** | A path with no repeated vertices | Direct route, no backtracking |
| **Cycle** | A path that starts and ends at the same vertex | A → B → C → A |
| **Self-Loop** | An edge from a vertex to itself | A → A |
| **Neighbor** | Vertex directly connected by an edge | Adjacent cities |
| **Connected** | Every vertex reachable from every other vertex | One continent |
| **Component** | A maximal connected subgraph | Islands in a sea |
| **Weight** | A value/cost assigned to an edge | Distance between cities |

---

### Types of Graphs

#### 1. Directed vs Undirected

```
Undirected Graph:          Directed Graph (Digraph):
   A --- B                    A ---> B
   |     |                    |       |
   C --- D                    v       v
                              C <--- D

Edges have no direction.    Edges have a direction (arrows).
A-B means both A→B and B→A. A→B does NOT imply B→A.
```

#### 2. Weighted vs Unweighted

```
Unweighted Graph:           Weighted Graph:
   A --- B                    A --5-- B
   |     |                    |       |
   C --- D                   10      3
                              |       |
                              C --7-- D

All edges are equal.        Each edge has a numeric cost/weight.
```

#### 3. Cyclic vs Acyclic

```
Cyclic Graph:               Acyclic Graph (DAG):
   A → B                       A → B
   ↑   ↓                       ↓   ↓
   D ← C                       C   D
                                ↓
Has at least one cycle.        E
A→B→C→D→A                 No cycle possible.
```

#### 4. Connected vs Disconnected

```
Connected Graph:            Disconnected Graph:
   A --- B                    A --- B     D --- E
   |     |                                |
   C --- D                                F
All nodes reachable         Some nodes are isolated
from every other node.      (multiple components).
```

#### 5. Special Graph Types

- **Tree**: Connected, acyclic, undirected graph with N-1 edges for N nodes
- **Forest**: Collection of disjoint trees
- **Complete Graph (Kn)**: Every pair of vertices is connected — N*(N-1)/2 edges
- **Bipartite Graph**: Vertices can be split into 2 groups; edges only between groups
- **DAG (Directed Acyclic Graph)**: Directed graph with no cycles — used in scheduling

---

## 2. Graph Representations

### 1. Adjacency Matrix

A 2D array of size V×V where `matrix[i][j] = 1` (or weight) if there's an edge from vertex i to j.

```
Graph:           Adjacency Matrix:
  0---1             0  1  2  3
  |\ |           0 [0, 1, 1, 0]
  | \|           1 [1, 0, 1, 1]
  2---3          2 [1, 1, 0, 1]
                 3 [0, 1, 1, 0]

matrix[0][1] = 1 → edge exists between 0 and 1
matrix[0][3] = 0 → no edge between 0 and 3
```

**Pros:**
- O(1) edge lookup — "Is there an edge between u and v?"
- Simple to implement
- Good for dense graphs

**Cons:**
- O(V²) space — wasteful for sparse graphs
- O(V) to find all neighbors of a vertex

---

### 2. Adjacency List

An array/map of size V, where each entry contains a list of neighbors.

```
Graph:           Adjacency List:
  0---1          0: [1, 2]
  |\ |           1: [0, 2, 3]
  | \|           2: [0, 1, 3]
  2---3          3: [1, 2]

For weighted graphs:
  0: [(1, weight=5), (2, weight=3)]
```

**Pros:**
- O(V + E) space — memory efficient for sparse graphs
- O(degree(v)) to iterate over neighbors
- Most commonly used in interview problems

**Cons:**
- O(degree(v)) edge lookup — slower than matrix for dense graphs

---

### 3. Edge List

A simple list of all edges as pairs (or triples for weighted).

```
Graph:           Edge List:
  0---1          [(0,1), (0,2), (1,2), (1,3), (2,3)]
  |\ |
  | \|           Weighted Edge List:
  2---3          [(0,1,5), (0,2,3), (1,2,2), (1,3,7), (2,3,4)]
                  (u, v, weight)
```

**Pros:**
- O(E) space
- Simple; useful for algorithms like Kruskal's (MST)

**Cons:**
- O(E) edge lookup — must scan entire list
- Not efficient for traversal

---

### Space and Time Trade-offs Summary

| Operation | Adjacency Matrix | Adjacency List | Edge List |
|-----------|-----------------|----------------|-----------|
| Space | O(V²) | O(V + E) | O(E) |
| Add Edge | O(1) | O(1) | O(1) |
| Remove Edge | O(1) | O(degree) | O(E) |
| Check Edge | O(1) | O(degree) | O(E) |
| Get Neighbors | O(V) | O(degree) | O(E) |
| Best For | Dense graphs | Sparse graphs | MST algorithms |

> **Rule of thumb**: Use **Adjacency List** for most interview problems unless the graph is dense (E ≈ V²).

---

## 3. Time and Space Complexity

### Traversal Complexity

| Algorithm | Time Complexity | Space Complexity | Notes |
|-----------|----------------|-----------------|-------|
| BFS | O(V + E) | O(V) | Queue + visited set |
| DFS | O(V + E) | O(V) | Stack/recursion + visited |
| Dijkstra | O((V + E) log V) | O(V) | With min-heap |
| Bellman-Ford | O(V × E) | O(V) | Handles negative weights |
| Floyd-Warshall | O(V³) | O(V²) | All-pairs shortest path |
| Topological Sort | O(V + E) | O(V) | BFS/DFS based |
| Union-Find | O(α(N)) ≈ O(1) | O(N) | With path compression |
| Kruskal's | O(E log E) | O(V) | Sorting edges dominates |
| Prim's | O((V + E) log V) | O(V) | With min-heap |

> **α(N)** is the inverse Ackermann function — practically constant for all realistic inputs.

### Operation Complexity by Representation

```
For a graph with V vertices and E edges:

+------------------+-----------+-----------+
| Operation        |   Matrix  |   List    |
+------------------+-----------+-----------+
| BFS/DFS          |  O(V²)    |  O(V+E)   |
| Find edge (u,v)  |  O(1)     |  O(deg)   |
| All neighbors    |  O(V)     |  O(deg)   |
| Add vertex       |  O(V²)    |  O(1)     |
| Add edge         |  O(1)     |  O(1)     |
+------------------+-----------+-----------+
```

---

## 4. Graph Traversal Algorithms

### Breadth-First Search (BFS)

BFS explores a graph **level by level** — visiting all neighbors at the current depth before moving deeper. It uses a **Queue (FIFO)**.

```
Graph:                BFS from node 1:
    1                 
   / \                Level 0: [1]
  2   3               Level 1: [2, 3]
 / \   \              Level 2: [4, 5, 6]
4   5   6
                      Visit order: 1 → 2 → 3 → 4 → 5 → 6
```

**Step-by-Step BFS:**

```
Initial: Queue = [1],  Visited = {1}

Step 1: Dequeue 1, enqueue neighbors 2, 3
        Queue = [2, 3],  Visited = {1, 2, 3}

Step 2: Dequeue 2, enqueue neighbors 4, 5
        Queue = [3, 4, 5],  Visited = {1, 2, 3, 4, 5}

Step 3: Dequeue 3, enqueue neighbor 6
        Queue = [4, 5, 6],  Visited = {1, 2, 3, 4, 5, 6}

Step 4: Dequeue 4 → no new neighbors
Step 5: Dequeue 5 → no new neighbors
Step 6: Dequeue 6 → no new neighbors
        Queue = [] → BFS complete!
```

**Key Properties:**
- Finds **shortest path** in unweighted graphs
- Explores by distance from source
- Uses O(V) space for the queue

---

### Depth-First Search (DFS)

DFS explores a graph by going as **deep as possible** before backtracking. It uses a **Stack** (or recursion).

```
Graph:                DFS from node 1:
    1                 
   / \                Go deep: 1 → 2 → 4 → backtrack
  2   3               → 5 → backtrack → backtrack
 / \   \              → 3 → 6 → done
4   5   6
                      Visit order: 1 → 2 → 4 → 5 → 3 → 6
```

**Step-by-Step DFS (Recursive):**

```
DFS(1):
  Mark 1 as visited
  For neighbor 2:
    DFS(2):
      Mark 2 as visited
      For neighbor 4:
        DFS(4):
          Mark 4 as visited
          No unvisited neighbors → return
      For neighbor 5:
        DFS(5):
          Mark 5 as visited
          No unvisited neighbors → return
  For neighbor 3:
    DFS(3):
      Mark 3 as visited
      For neighbor 6:
        DFS(6):
          Mark 6 as visited → return
```

**Key Properties:**
- Explores one path completely before backtracking
- Used for: cycle detection, topological sort, connected components
- Can be recursive or iterative (explicit stack)

---

### BFS vs DFS — When to Use Which

```
+----------------------+---------------------------+---------------------------+
|                      |         BFS               |         DFS               |
+----------------------+---------------------------+---------------------------+
| Data Structure       | Queue (FIFO)              | Stack / Recursion         |
| Path Found           | Shortest (unweighted)     | Any path (not shortest)   |
| Memory               | O(V) — can be large       | O(V) — depth of recursion |
| Best For             | Shortest path, levels     | Cycles, components, topo  |
| Graph Type           | Wide, shallow graphs      | Deep, narrow graphs       |
+----------------------+---------------------------+---------------------------+
```

---

## 5. Important Graph Patterns

### Pattern 1: BFS for Shortest Path (Unweighted Graph)

**Problem**: Find the shortest path from source to target in an unweighted graph.

**Key Insight**: BFS guarantees the first time we reach a node, it's via the shortest path.

```
Graph (unweighted):        BFS from A, find shortest path to F:
A - B - D                  
|   |   |                  A(0) → B(1), C(1)
C - E - F                  B(1) → D(2), E(2)
                           C(1) → E(2)
                           D(2) → F(3)  ← first time F reached!
                           
Shortest path: A → B → D → F (length 3)
```

**Template:**
```javascript
function bfsShortestPath(graph, start, end) {
  const queue = [[start, [start]]];  // [node, path]
  const visited = new Set([start]);
  
  while (queue.length > 0) {
    const [node, path] = queue.shift();
    if (node === end) return path;
    
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, [...path, neighbor]]);
      }
    }
  }
  return null;  // No path found
}
```

---

### Pattern 2: DFS for Connected Components / Islands

**Problem**: Count the number of connected components (islands) in a graph or grid.

**Key Insight**: Each DFS from an unvisited node explores one complete component.

```
Grid (Number of Islands problem):
1 1 0 0 0
1 1 0 0 0        Islands:
0 0 1 0 0        Island 1: (0,0)(0,1)(1,0)(1,1)
0 0 0 1 1        Island 2: (2,2)
                 Island 3: (3,3)(3,4)
Answer: 3 islands
```

**Template:**
```javascript
function countComponents(grid) {
  let count = 0;
  
  function dfs(r, c) {
    if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length) return;
    if (grid[r][c] !== 1) return;
    grid[r][c] = 0;  // Mark visited by modifying grid
    dfs(r+1, c); dfs(r-1, c);
    dfs(r, c+1); dfs(r, c-1);
  }
  
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === 1) {
        dfs(r, c);
        count++;
      }
    }
  }
  return count;
}
```

---

### Pattern 3: Cycle Detection

#### Cycle Detection in Undirected Graph (DFS)

**Key Insight**: If we visit a node that is already visited AND it's not the parent of the current node, there's a cycle.

```
Has cycle:              No cycle (tree):
  0 --- 1                 0 --- 1
  |     |                 |     |
  3 --- 2                 3     2
  
DFS from 0: 0→1→2→3→0 (0 already visited, not parent)
→ Cycle detected!
```

#### Cycle Detection in Directed Graph (DFS + Recursion Stack)

**Key Insight**: Track both `visited` (globally) and `recStack` (current DFS path). If we visit a node that's in `recStack`, there's a cycle.

```
Has cycle:             No cycle (DAG):
  0 → 1                 0 → 1
  ↑   ↓                 ↓   ↓
  3 ← 2                 2   3

recStack during DFS: {0, 1, 2, 3}
When we try to visit 0 again (from 3), it's in recStack → Cycle!
```

---

### Pattern 4: Topological Sort

Topological Sort orders vertices in a **Directed Acyclic Graph (DAG)** such that for every directed edge u→v, u comes before v.

**Use cases**: Task scheduling, build systems, course prerequisites

```
DAG:
  Course A ──→ Course C ──→ Course E
  Course B ──→ Course C
  Course B ──→ Course D ──→ Course E

Valid topological orders:
  A, B, C, D, E
  B, A, C, D, E
  B, D, A, C, E  (all valid)
```

#### Kahn's Algorithm (BFS-based)

```
1. Compute in-degree for all vertices
2. Add all 0 in-degree vertices to queue
3. Dequeue a vertex, add to result, reduce neighbor in-degrees
4. If any neighbor's in-degree becomes 0, enqueue it
5. If result length < V, cycle exists

Example:
  In-degrees: A=0, B=0, C=2, D=1, E=2
  Queue: [A, B]
  
  Dequeue A → result=[A], C.indegree=1, E.indegree stays
  Dequeue B → result=[A,B], C.indegree=0 (add to queue), D.indegree=0 (add)
  ...continues
```

#### DFS-based Topological Sort

```
1. Do DFS on all unvisited nodes
2. After ALL neighbors of a node are processed, push node to stack
3. Final result = reverse of stack

Key: Post-order DFS + reverse = topological order
```

---

### Pattern 5: Shortest Path Algorithms Overview

```
+-------------------+----------------+-------------------+-------------------+
| Algorithm         | Graph Type     | Handles Negative? | Complexity        |
+-------------------+----------------+-------------------+-------------------+
| BFS               | Unweighted     | N/A               | O(V + E)          |
| Dijkstra          | Weighted       | No                | O((V+E) log V)    |
| Bellman-Ford      | Weighted       | Yes               | O(V × E)          |
| Floyd-Warshall    | All pairs      | Yes (no neg cycle)| O(V³)             |
+-------------------+----------------+-------------------+-------------------+
```

---

### Pattern 6: Union-Find (Disjoint Set Union)

Efficiently tracks which elements belong to the same connected component.

**Operations:**
- `find(x)`: Which component does x belong to?
- `union(x, y)`: Merge the components of x and y

```
Initial:  {0} {1} {2} {3} {4}

union(0,1): {0,1} {2} {3} {4}
union(2,3): {0,1} {2,3} {4}
union(0,3): {0,1,2,3} {4}

find(1) === find(2)?  → Yes! (same component)
find(1) === find(4)?  → No!  (different component)
```

**Optimizations:**
- **Path Compression**: `find(x)` flattens the tree → O(α(N)) amortized
- **Union by Rank**: Always attach smaller tree under larger → keeps tree flat

---

### Pattern 7: Bipartite Graph Check

A graph is **bipartite** if its vertices can be colored with 2 colors such that no two adjacent vertices share the same color. Equivalently, it contains **no odd-length cycles**.

```
Bipartite:              NOT Bipartite:
  R - B - R               R - B
  |       |               |\ |
  B - R - B               B  R
  
(R=Red, B=Blue)        Triangle: R-B-R-R? Can't 2-color!
```

**Algorithm**: BFS/DFS with 2-coloring. If we ever try to assign the same color to two adjacent nodes, the graph is not bipartite.

---

### Pattern 8: Multi-Source BFS

Start BFS from **multiple sources simultaneously**. Used when you need the minimum distance from ANY of several source nodes.

```
Problem: "Rotting Oranges" — Find minimum time until all oranges are rotten.
Rotten oranges spread rot to neighbors each minute.

Grid:
  2 1 1        2 = rotten, 1 = fresh, 0 = empty
  1 1 0
  0 1 1

Solution: Add ALL rotten oranges (2s) to queue at time 0, then BFS!

Time 0: Queue = [(0,0), ...] (all initial rotten)
Time 1: Spread to all fresh neighbors of time-0 rotters
Time 2: Continue spreading...
```

**Template:**
```javascript
// Add all sources to queue at time 0
const queue = [];
for (let r = 0; r < grid.length; r++)
  for (let c = 0; c < grid[0].length; c++)
    if (grid[r][c] === 2) queue.push([r, c, 0]);  // [row, col, time]
```

---

## 6. Key Algorithms on Graphs

### Dijkstra's Algorithm

Find the **shortest path from a single source** to all other vertices in a weighted graph (non-negative weights only).

**Core Idea**: Greedily pick the unvisited vertex with the smallest known distance.

```
Graph:
     2       3
  A ──── B ──── D
  |      |      |
  1      4      1
  |      |      |
  C ──── E ──── F
     3       5

Finding shortest path from A:

Step 1: dist = {A:0, B:∞, C:∞, D:∞, E:∞, F:∞}
        MinHeap = [(0,A)]

Step 2: Pop A(0). Relax neighbors:
        B: 0+2=2, C: 0+1=1
        dist = {A:0, B:2, C:1, ...}
        MinHeap = [(1,C), (2,B)]

Step 3: Pop C(1). Relax neighbors:
        E: 1+3=4
        MinHeap = [(2,B), (4,E)]

Step 4: Pop B(2). Relax neighbors:
        D: 2+3=5, E: min(4, 2+4)=4 (no update)
        ...continues
```

**Key Properties:**
- Requires **non-negative** weights
- Time: O((V + E) log V) with min-heap
- Uses a **priority queue (min-heap)**

---

### Bellman-Ford Algorithm

Find shortest paths from a single source, handles **negative weights**, and detects **negative cycles**.

**Core Idea**: Relax ALL edges V-1 times. If we can still relax after V-1 rounds, there's a negative cycle.

```
Algorithm:
  dist[source] = 0, all others = ∞
  
  Repeat V-1 times:
    For each edge (u, v, w):
      if dist[u] + w < dist[v]:
        dist[v] = dist[u] + w
  
  // Check for negative cycles (V-th iteration)
  For each edge (u, v, w):
    if dist[u] + w < dist[v]:
      → Negative cycle detected!
```

**Why V-1 times?** A shortest path in a graph with V vertices can have at most V-1 edges.

---

### Floyd-Warshall Algorithm

Find **shortest paths between ALL pairs** of vertices.

```
dist[i][j] = shortest distance from i to j

Initialize:
  dist[i][i] = 0
  dist[i][j] = edge weight if edge exists, else ∞

For each intermediate vertex k:
  For each pair (i, j):
    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
                 └── direct path ─┘  └─── via k ────────┘
```

**Intuition**: Try every vertex as a potential "middle stop" between all pairs.

---

### Kruskal's Algorithm (Minimum Spanning Tree)

Find the **minimum spanning tree** — a subset of edges connecting all vertices with minimum total weight and no cycles.

```
Steps:
  1. Sort all edges by weight (ascending)
  2. For each edge (u, v, w) in sorted order:
     If u and v are in DIFFERENT components (use Union-Find):
       Add edge to MST
       Union(u, v)
  3. Stop when MST has V-1 edges

Example:
  Edges sorted: [(A,C,1), (A,B,2), (B,D,3), (C,E,3), (B,E,4)]
  
  (A,C,1): A and C different → Add! MST={(A,C)}
  (A,B,2): A and B different → Add! MST={(A,C),(A,B)}
  (B,D,3): B and D different → Add! MST={(A,C),(A,B),(B,D)}
  (C,E,3): C and E different → Add! MST={(A,C),(A,B),(B,D),(C,E)}
  Done! (4 edges = V-1 for 5 vertices)
```

---

### Prim's Algorithm (Minimum Spanning Tree)

Alternative MST algorithm. Grows the MST one edge at a time from a starting vertex.

```
Steps:
  1. Start with any vertex, add to MST
  2. Add all edges from MST vertices to min-heap
  3. Pop smallest edge that connects to unvisited vertex
  4. Add that vertex and its edges to the process
  5. Repeat until all vertices included

Prim's is better for DENSE graphs; Kruskal's for SPARSE graphs.
```

---

## 7. Problem-Solving Approach

### How to Identify Graph Problems

Look for these keywords and patterns:

```
🔍 GRAPH KEYWORDS:
  - "nodes and connections"           → Graph problem
  - "network", "circuit", "path"      → Graph problem
  - "grid" with movement              → Implicit graph
  - "relationships", "dependencies"   → Graph problem
  - "islands", "components", "groups" → Connected components
  - "shortest path", "minimum steps"  → BFS / Dijkstra
  - "prerequisites", "ordering"       → Topological Sort
  - "detect cycle"                    → Cycle detection (DFS)
  - "union", "same group"             → Union-Find
  - "spanning tree", "min cost to connect" → MST (Kruskal/Prim)
```

### Decision Framework

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
  └─ Multiple sources, equidistant spread?
        └──→ Multi-source BFS
```

### BFS vs DFS Cheat Sheet

| Use BFS When | Use DFS When |
|-------------|-------------|
| Shortest path (unweighted) | Cycle detection |
| Level-by-level traversal | Topological sort |
| Minimum steps to reach goal | Connected components |
| Multi-source spreading | Backtracking problems |
| Finding nodes at distance K | Path existence check |
| Word ladder problems | Maze solving (any path) |

---

## 8. Code Examples (JavaScript)

### BFS Implementation

```javascript
/**
 * Breadth-First Search
 * @param {Map<number, number[]>} graph - Adjacency list
 * @param {number} start - Starting vertex
 * @returns {number[]} - BFS traversal order
 */
function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  const result = [];

  visited.add(start);

  while (queue.length > 0) {
    const node = queue.shift(); // Dequeue from front
    result.push(node);

    // Process all unvisited neighbors
    for (const neighbor of (graph.get(node) || [])) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor); // Enqueue
      }
    }
  }

  return result;
}

// Usage:
const graph = new Map([
  [1, [2, 3]],
  [2, [4, 5]],
  [3, [6]],
  [4, []],
  [5, []],
  [6, []],
]);
console.log(bfs(graph, 1)); // [1, 2, 3, 4, 5, 6]
```

---

### DFS Implementation (Recursive + Iterative)

```javascript
/**
 * Depth-First Search — Recursive
 */
function dfsRecursive(graph, start, visited = new Set(), result = []) {
  visited.add(start);
  result.push(start);

  for (const neighbor of (graph.get(start) || [])) {
    if (!visited.has(neighbor)) {
      dfsRecursive(graph, neighbor, visited, result);
    }
  }

  return result;
}

/**
 * Depth-First Search — Iterative (using explicit stack)
 */
function dfsIterative(graph, start) {
  const visited = new Set();
  const stack = [start]; // Use stack instead of queue
  const result = [];

  while (stack.length > 0) {
    const node = stack.pop(); // Pop from top

    if (visited.has(node)) continue;
    visited.add(node);
    result.push(node);

    // Push neighbors in reverse order to maintain left-to-right traversal
    const neighbors = graph.get(node) || [];
    for (let i = neighbors.length - 1; i >= 0; i--) {
      if (!visited.has(neighbors[i])) {
        stack.push(neighbors[i]);
      }
    }
  }

  return result;
}
```

---

### Dijkstra's Algorithm

```javascript
/**
 * Dijkstra's Shortest Path Algorithm
 * @param {Map<number, [number, number][]>} graph - Adjacency list with weights: node -> [[neighbor, weight]]
 * @param {number} start - Source vertex
 * @returns {Map<number, number>} - Shortest distances from start to all nodes
 */
function dijkstra(graph, start) {
  // Min-heap: [distance, node]
  // Using a simple array as priority queue for clarity
  // In production, use a proper min-heap library
  const distances = new Map();
  const visited = new Set();
  const pq = [[0, start]]; // [distance, node]

  // Initialize all distances to Infinity
  for (const node of graph.keys()) {
    distances.set(node, Infinity);
  }
  distances.set(start, 0);

  while (pq.length > 0) {
    // Get node with minimum distance (simulate min-heap)
    pq.sort((a, b) => a[0] - b[0]);
    const [currDist, currNode] = pq.shift();

    // Skip if already processed
    if (visited.has(currNode)) continue;
    visited.add(currNode);

    // Relax edges
    for (const [neighbor, weight] of (graph.get(currNode) || [])) {
      const newDist = currDist + weight;

      if (newDist < distances.get(neighbor)) {
        distances.set(neighbor, newDist);
        pq.push([newDist, neighbor]);
      }
    }
  }

  return distances;
}

// Usage:
const weightedGraph = new Map([
  [0, [[1, 4], [2, 1]]],
  [1, [[3, 1]]],
  [2, [[1, 2], [3, 5]]],
  [3, []],
]);
const dist = dijkstra(weightedGraph, 0);
console.log(dist); // Map { 0→0, 1→3, 2→1, 3→4 }
// Shortest: 0→2(1)→1(3)→3(4)
```

---

### Union-Find (Disjoint Set Union)

```javascript
/**
 * Union-Find with Path Compression + Union by Rank
 * Efficiently manages disjoint sets
 */
class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i); // parent[i] = i initially
    this.rank = new Array(n).fill(0);                     // rank for union by rank
    this.components = n;                                   // number of components
  }

  /**
   * Find the root of element x (with path compression)
   * Path compression flattens the tree for faster future queries
   */
  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // Path compression
    }
    return this.parent[x];
  }

  /**
   * Union the sets containing x and y
   * Returns true if they were in different sets (new connection)
   */
  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) return false; // Already in same set

    // Union by rank: attach smaller tree under larger tree
    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }

    this.components--;
    return true; // Successfully unioned
  }

  /**
   * Check if x and y are in the same set
   */
  connected(x, y) {
    return this.find(x) === this.find(y);
  }
}

// Usage:
const uf = new UnionFind(5); // 5 elements: 0,1,2,3,4
uf.union(0, 1);
uf.union(2, 3);
console.log(uf.connected(0, 1)); // true
console.log(uf.connected(0, 2)); // false
uf.union(1, 2);
console.log(uf.connected(0, 3)); // true (0-1-2-3 all connected now)
console.log(uf.components);      // 2 (group {0,1,2,3} and {4})
```

---

### Topological Sort (Kahn's Algorithm)

```javascript
/**
 * Topological Sort using Kahn's Algorithm (BFS-based)
 * Returns null if cycle detected
 */
function topologicalSort(numNodes, edges) {
  // Build adjacency list and in-degree array
  const graph = Array.from({ length: numNodes }, () => []);
  const inDegree = new Array(numNodes).fill(0);

  for (const [u, v] of edges) {
    graph[u].push(v);
    inDegree[v]++;
  }

  // Start with all nodes that have no prerequisites
  const queue = [];
  for (let i = 0; i < numNodes; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  const result = [];

  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node);

    // Reduce in-degree of all neighbors
    for (const neighbor of graph[node]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor); // No more prerequisites → ready!
      }
    }
  }

  // If result doesn't contain all nodes, there's a cycle
  return result.length === numNodes ? result : null;
}

// Usage (Course Schedule problem):
// Courses 0,1,2,3. Prerequisites: [[1,0],[2,0],[3,1],[3,2]]
// Meaning: to take 1 you need 0; to take 3 you need 1 and 2
const order = topologicalSort(4, [[1,0],[2,0],[3,1],[3,2]]);
console.log(order); // [0, 1, 2, 3] or [0, 2, 1, 3]
```

---

### Cycle Detection in Directed Graph

```javascript
/**
 * Detect cycle in a directed graph using DFS
 * Uses a recursion stack to track current DFS path
 */
function hasCycleDirected(graph, numNodes) {
  const visited = new Set();
  const recStack = new Set(); // Nodes in current DFS path

  function dfs(node) {
    visited.add(node);
    recStack.add(node);

    for (const neighbor of (graph[node] || [])) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor)) return true; // Cycle found deeper
      } else if (recStack.has(neighbor)) {
        return true; // Back edge → cycle!
      }
    }

    recStack.delete(node); // Remove from current path (backtrack)
    return false;
  }

  for (let i = 0; i < numNodes; i++) {
    if (!visited.has(i)) {
      if (dfs(i)) return true;
    }
  }
  return false;
}
```

---

## 9. Must-Do Interview Questions

### 🟢 Easy

| # | Problem | Key Concept | Platform |
|---|---------|-------------|----------|
| 1 | **Find if Path Exists in Graph** | Basic BFS/DFS | LeetCode 1971 |
| 2 | **Flood Fill** | DFS on grid | LeetCode 733 |
| 3 | **Number of Islands** | DFS/BFS components | LeetCode 200 |
| 4 | **Find Center of Star Graph** | Degree counting | LeetCode 1791 |
| 5 | **Find the Town Judge** | In/Out degree | LeetCode 997 |
| 6 | **Clone Graph** | BFS + HashMap | LeetCode 133 |

---

### 🟡 Medium

| # | Problem | Key Concept | Platform |
|---|---------|-------------|----------|
| 1 | **Course Schedule** | Cycle detection (Topo Sort) | LeetCode 207 |
| 2 | **Course Schedule II** | Topological Sort (Kahn's) | LeetCode 210 |
| 3 | **Number of Connected Components** | Union-Find / DFS | LeetCode 323 |
| 4 | **Pacific Atlantic Water Flow** | Multi-source DFS/BFS | LeetCode 417 |
| 5 | **Rotting Oranges** | Multi-source BFS | LeetCode 994 |
| 6 | **Word Ladder** | BFS shortest path | LeetCode 127 |
| 7 | **Network Delay Time** | Dijkstra | LeetCode 743 |
| 8 | **Is Graph Bipartite?** | 2-coloring BFS/DFS | LeetCode 785 |
| 9 | **Surrounded Regions** | DFS from boundary | LeetCode 130 |
| 10 | **Max Area of Island** | DFS component size | LeetCode 695 |
| 11 | **01 Matrix** | Multi-source BFS | LeetCode 542 |
| 12 | **Accounts Merge** | Union-Find | LeetCode 721 |
| 13 | **Minimum Height Trees** | Topological leaf trimming | LeetCode 310 |
| 14 | **Graph Valid Tree** | Cycle detection + connectivity | LeetCode 261 |

---

### 🔴 Hard

| # | Problem | Key Concept | Platform |
|---|---------|-------------|----------|
| 1 | **Word Ladder II** | BFS + DFS backtrack | LeetCode 126 |
| 2 | **Alien Dictionary** | Topological Sort | LeetCode 269 |
| 3 | **Critical Connections in Network** | Bridges (Tarjan's algo) | LeetCode 1192 |
| 4 | **Cheapest Flights Within K Stops** | Modified Dijkstra/Bellman-Ford | LeetCode 787 |
| 5 | **Swim in Rising Water** | Binary search + BFS or Dijkstra | LeetCode 778 |
| 6 | **Bus Routes** | BFS on layered graph | LeetCode 815 |
| 7 | **Shortest Path to Get All Keys** | BFS with bitmask state | LeetCode 864 |
| 8 | **Reconstruct Itinerary** | Hierholzer's (Eulerian path) | LeetCode 332 |
| 9 | **Minimum Cost to Reach Destination** | Dijkstra with states | LeetCode 787 |
| 10 | **Strongly Connected Components** | Kosaraju's / Tarjan's | Classic CS problem |

---

## 10. Tips and Common Mistakes

### ✅ Best Practices

```
1. ALWAYS mark a node visited BEFORE enqueueing (in BFS), not after dequeuing
   ❌ Wrong:  queue.push(neighbor) → mark visited when dequeued
   ✅ Right:  mark visited + queue.push(neighbor) at same time
   
   Why? Without early marking, the same node can be enqueued multiple times
   → infinite loops or TLE!

2. For grids, define directions array outside loops:
   const dirs = [[0,1],[0,-1],[1,0],[-1,0]]; // Right, Left, Down, Up

3. Use modifying the grid itself as "visited" only if you can restore it,
   or if the problem allows mutation.

4. In Dijkstra, always check if current distance > stored distance when popping:
   if (currDist > distances.get(node)) continue; // Stale entry, skip!

5. For disconnected graphs, always loop through ALL nodes, not just from one start:
   for (let i = 0; i < n; i++) {
     if (!visited.has(i)) dfs(i); // Covers all components!
   }
```

### ❌ Common Mistakes

| Mistake | Why It's Wrong | Fix |
|---------|---------------|-----|
| Not checking grid bounds | ArrayIndexOutOfBounds / wrong answers | Always check `r >= 0 && r < rows && c >= 0 && c < cols` |
| Forgetting to mark visited | Infinite loops in cyclic graphs | Mark visited immediately on discover |
| Using DFS for shortest path | DFS doesn't guarantee shortest path | Use BFS for unweighted shortest path |
| Using Dijkstra with negative weights | Gives wrong answers | Use Bellman-Ford for negative weights |
| Off-by-one in topological sort | Missing last node, wrong order | Ensure all V nodes are in result |
| Modifying graph while iterating | Undefined behavior | Work on a copy or use separate visited |
| Wrong base case in recursion | Stack overflow or wrong answer | Always have clear termination conditions |

### 🚀 Optimization Tricks

```
1. BIDIRECTIONAL BFS: Search from both source and target simultaneously.
   Reduces complexity from O(b^d) to O(b^(d/2)) where b=branching factor.
   Use for: Word Ladder, shortest path problems with known source AND target.

2. EARLY TERMINATION in BFS: Return as soon as target is found.
   Don't continue BFS after finding the destination!

3. VISITED SET vs VISITED ARRAY:
   - Array: O(1) lookup, but needs integer node IDs
   - Set: O(1) average, works with any hashable node
   - For grids: encode (r,c) as r * cols + c for O(1) array lookup

4. GRAPH BUILDING: Build adjacency list as you read input, don't rebuild later.

5. PRIORITY QUEUE: Use a proper min-heap for Dijkstra (not array.sort).
   In JS, implement with a binary heap or use a library.

6. PATH RECONSTRUCTION: Store parent pointers during BFS/Dijkstra to trace back path.
   parent[neighbor] = current; // Store how we reached each node
```

### Edge Cases to Always Consider

```
- Empty graph (no nodes/edges)
- Single node (self-loop?)
- Disconnected graph — BFS/DFS from one node won't reach all!
- Graph with all nodes isolated
- Negative weight cycles (Bellman-Ford)
- Dense vs sparse graph (choose representation wisely)
- Grid with all 0s or all 1s
- Source == Destination (distance = 0)
- Multiple valid answers (topological sort, MST)
```

---

## 11. Real-World Applications

### 🌐 Computer Networks

```
Graph Model: Routers = vertices, Network links = edges, Bandwidth = weights

Applications:
  → Routing protocols (OSPF uses Dijkstra's!)
  → Network topology design
  → Detecting network loops (cycle detection)
  → Finding redundant paths (MST)
```

### 🗺️ Maps and Navigation

```
Graph Model: Intersections = vertices, Roads = edges, Distance/time = weights

Applications:
  → GPS navigation (Dijkstra / A* algorithm)
  → Google Maps fastest route
  → Finding nearby places (BFS)
  → Traffic optimization
```

### 📱 Social Networks

```
Graph Model: Users = vertices, Friendships/Follows = edges

Applications:
  → Friend recommendations (BFS — friends of friends)
  → Finding influencers (PageRank — graph centrality)
  → Community detection (connected components)
  → Six degrees of separation (BFS shortest path)
  → Detecting fake account clusters
```

### 📦 Package Managers & Build Systems

```
Graph Model: Packages/tasks = vertices, Dependencies = directed edges

Applications:
  → npm/yarn dependency resolution (Topological Sort)
  → Build order in Makefiles (Topological Sort)
  → Circular dependency detection (Cycle detection)
  → Docker layer ordering
```

### 🧬 Biology & Science

```
Applications:
  → Protein interaction networks
  → Disease spread modeling (BFS from infection source)
  → Genome assembly (Eulerian paths in de Bruijn graphs)
  → Phylogenetic trees (MST)
```

### 🎮 Games and AI

```
Applications:
  → Pathfinding in game worlds (A* = Dijkstra + heuristic)
  → NPC movement and navigation
  → Dungeon generation
  → Chess/Go AI move trees
```

### ✈️ Transportation & Logistics

```
Applications:
  → Flight scheduling (Topological Sort)
  → Airline route optimization (Shortest path / MST)
  → Package delivery routing (Traveling Salesman — NP-hard graph problem)
  → Train/bus network planning
```

### 💡 Other Notable Uses

```
  → Web Crawling: Internet = graph, pages = nodes, links = edges (BFS)
  → Recommendation Systems: Users and items as bipartite graphs
  → Fraud Detection: Unusual connected clusters in transaction graphs
  → Circuit Design: Electrical circuits as graphs
  → Compiler Design: Control flow graphs, data flow analysis
```

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────────────────────┐
│                    GRAPH ALGORITHMS CHEAT SHEET                  │
├──────────────────────┬──────────────────────────────────────────┤
│ PROBLEM              │ ALGORITHM                                │
├──────────────────────┼──────────────────────────────────────────┤
│ Shortest path        │ BFS (unweighted)                        │
│ (unweighted)         │                                          │
├──────────────────────┼──────────────────────────────────────────┤
│ Shortest path        │ Dijkstra (non-negative weights)         │
│ (weighted)           │ Bellman-Ford (negative weights)          │
├──────────────────────┼──────────────────────────────────────────┤
│ All-pairs shortest   │ Floyd-Warshall                          │
├──────────────────────┼──────────────────────────────────────────┤
│ Cycle detection      │ DFS (undirected: parent; directed: stack)│
├──────────────────────┼──────────────────────────────────────────┤
│ Topological order    │ Kahn's BFS or DFS post-order            │
├──────────────────────┼──────────────────────────────────────────┤
│ Components           │ DFS/BFS loop or Union-Find              │
├──────────────────────┼──────────────────────────────────────────┤
│ Minimum spanning     │ Kruskal's (sparse) / Prim's (dense)     │
│ tree                 │                                          │
├──────────────────────┼──────────────────────────────────────────┤
│ Bipartite check      │ BFS/DFS 2-coloring                      │
├──────────────────────┼──────────────────────────────────────────┤
│ Multi-source spread  │ Multi-source BFS                        │
├──────────────────────┼──────────────────────────────────────────┤
│ Dynamic connectivity │ Union-Find (DSU)                        │
└──────────────────────┴──────────────────────────────────────────┘
```

---

*Guide authored for interview preparation. Practice on LeetCode, HackerRank, and Codeforces. 
The key to mastering graphs is pattern recognition — once you see the underlying structure, the algorithm follows naturally.*