---
title: "Code Examples"
description: "Complete JavaScript implementations of BFS, DFS, Dijkstra, Union-Find, Topological Sort, and Cycle Detection."
sidebar:
  order: 8
practice:
  visualizer: /visualizer/graphs
---

# Code Examples (JavaScript)

> Full, production-quality implementations of all key graph algorithms.

---

## BFS Implementation

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

    for (const neighbor of (graph.get(node) || [])) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
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

## DFS Implementation (Recursive + Iterative)

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
  const stack = [start];
  const result = [];

  while (stack.length > 0) {
    const node = stack.pop();
    if (visited.has(node)) continue;
    visited.add(node);
    result.push(node);

    // Push neighbors in reverse order for left-to-right traversal
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

## Dijkstra's Algorithm

```javascript
/**
 * Dijkstra's Shortest Path Algorithm
 * @param {Map<number, [number, number][]>} graph - Weighted adjacency list
 * @param {number} start - Source vertex
 * @returns {Map<number, number>} - Shortest distances from start
 */
function dijkstra(graph, start) {
  const distances = new Map();
  const visited = new Set();
  const pq = [[0, start]]; // [distance, node]

  // Initialize all distances to Infinity
  for (const node of graph.keys()) {
    distances.set(node, Infinity);
  }
  distances.set(start, 0);

  while (pq.length > 0) {
    // Get node with minimum distance
    pq.sort((a, b) => a[0] - b[0]);
    const [currDist, currNode] = pq.shift();

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

## Union-Find (Disjoint Set Union)

```javascript
/**
 * Union-Find with Path Compression + Union by Rank
 */
class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(0);
    this.components = n;
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // Path compression
    }
    return this.parent[x];
  }

  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) return false;

    // Union by rank
    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }

    this.components--;
    return true;
  }

  connected(x, y) {
    return this.find(x) === this.find(y);
  }
}

// Usage:
const uf = new UnionFind(5);
uf.union(0, 1);
uf.union(2, 3);
console.log(uf.connected(0, 1)); // true
console.log(uf.connected(0, 2)); // false
uf.union(1, 2);
console.log(uf.connected(0, 3)); // true
console.log(uf.components);      // 2
```

---

## Topological Sort (Kahn's Algorithm)

```javascript
/**
 * Topological Sort using Kahn's Algorithm (BFS-based)
 * Returns null if cycle detected
 */
function topologicalSort(numNodes, edges) {
  const graph = Array.from({ length: numNodes }, () => []);
  const inDegree = new Array(numNodes).fill(0);

  for (const [u, v] of edges) {
    graph[u].push(v);
    inDegree[v]++;
  }

  const queue = [];
  for (let i = 0; i < numNodes; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  const result = [];
  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node);
    for (const neighbor of graph[node]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) queue.push(neighbor);
    }
  }

  return result.length === numNodes ? result : null;
}

// Usage (Course Schedule):
const order = topologicalSort(4, [[1,0],[2,0],[3,1],[3,2]]);
console.log(order); // [0, 1, 2, 3] or [0, 2, 1, 3]
```

---

## Cycle Detection in Directed Graph

```javascript
/**
 * Detect cycle in a directed graph using DFS
 */
function hasCycleDirected(graph, numNodes) {
  const visited = new Set();
  const recStack = new Set();

  function dfs(node) {
    visited.add(node);
    recStack.add(node);
    for (const neighbor of (graph[node] || [])) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor)) return true;
      } else if (recStack.has(neighbor)) {
        return true; // Back edge → cycle!
      }
    }
    recStack.delete(node);
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

## Grid Traversal (Number of Islands)

```javascript
/**
 * Count connected components in a grid
 */
function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;
  let count = 0;
  const rows = grid.length, cols = grid[0].length;

  function dfs(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === '0') return;
    grid[r][c] = '0'; // Mark visited
    dfs(r + 1, c); dfs(r - 1, c);
    dfs(r, c + 1); dfs(r, c - 1);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        dfs(r, c);
        count++;
      }
    }
  }
  return count;
}
```

---

## Next Steps

Practice with the [Interview Questions](/DSA-Notes-Problems/data-structures/graphs/09-interview-questions) and review [Tips & Common Mistakes](/DSA-Notes-Problems/data-structures/graphs/10-tips).

---

## Related Topics

- [Graph Traversals](/DSA-Notes-Problems/data-structures/graphs/04-traversals) — Foundation for all algorithms
- [Graph Patterns](/DSA-Notes-Problems/data-structures/graphs/05-patterns) — Apply these patterns with the code above
