---
title: "Tips & Common Mistakes"
description: "Expert tips, common pitfalls, optimization tricks, and edge cases for graph problems."
sidebar:
  order: 10
practice:
  visualizer: /visualizer/graphs
---

# Tips & Common Mistakes

> Expert advice to help you write correct, efficient graph code and avoid common pitfalls.

---

## ✅ Best Practices

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

---

## ❌ Common Mistakes

| Mistake | Why It's Wrong | Fix |
|---------|---------------|-----|
| Not checking grid bounds | ArrayIndexOutOfBounds / wrong answers | Always check `r >= 0 && r < rows && c >= 0 && c < cols` |
| Forgetting to mark visited | Infinite loops in cyclic graphs | Mark visited immediately on discover |
| Using DFS for shortest path | DFS doesn't guarantee shortest path | Use BFS for unweighted shortest path |
| Using Dijkstra with negative weights | Gives wrong answers | Use Bellman-Ford for negative weights |
| Off-by-one in topological sort | Missing last node, wrong order | Ensure all V nodes are in result |
| Modifying graph while iterating | Undefined behavior | Work on a copy or use separate visited |
| Wrong base case in recursion | Stack overflow or wrong answer | Always have clear termination conditions |

---

## 🚀 Optimization Tricks

### 1. Bidirectional BFS

Search from both source and target simultaneously. Reduces complexity from O(b^d) to O(b^(d/2)).

```
Normal BFS:             Bidirectional BFS:
Source → → → → Target   Source → → | ← ← Target
  Queue size grows        Two smaller queues meet in middle
  exponentially!          50%+ reduction in explored nodes
```

**Use for:** Word Ladder, shortest path problems with known source AND target.

```javascript
function bidirectionalBFS(graph, start, end) {
  if (start === end) return 0;
  
  let queueStart = new Set([start]);
  let queueEnd = new Set([end]);
  const visitedStart = new Set([start]);
  const visitedEnd = new Set([end]);
  let distance = 1;

  while (queueStart.size > 0 && queueEnd.size > 0) {
    // Always expand the smaller queue
    if (queueStart.size > queueEnd.size) {
      [queueStart, queueEnd] = [queueEnd, queueStart];
      [visitedStart, visitedEnd] = [visitedEnd, visitedStart];
    }

    const nextQueue = new Set();
    for (const node of queueStart) {
      for (const neighbor of graph[node] || []) {
        if (visitedEnd.has(neighbor)) return distance;
        if (!visitedStart.has(neighbor)) {
          visitedStart.add(neighbor);
          nextQueue.add(neighbor);
        }
      }
    }
    queueStart = nextQueue;
    distance++;
  }
  return -1;
}
```

### 2. Early Termination in BFS

Return as soon as target is found. Don't continue BFS after finding the destination!

### 3. Visited Set vs Visited Array

- **Array:** O(1) lookup, but needs integer node IDs
- **Set:** O(1) average, works with any hashable node
- **For grids:** Encode (r,c) as `r * cols + c` for O(1) array lookup

### 4. Graph Building

Build adjacency list as you read input — don't rebuild later.

### 5. Priority Queue

Use a proper **min-heap** for Dijkstra (not `array.sort()` inside the loop).
In JS, implement with a binary heap or use a library.

### 6. Path Reconstruction

Store parent pointers during BFS/Dijkstra to trace back the path.

```javascript
parent[neighbor] = current; // Store how we reached each node
// Then trace: end → parent[end] → ... → start
```

---

## Edge Cases to Always Consider

| Edge Case | Why It Matters |
|-----------|---------------|
| **Empty graph** (no nodes/edges) | BFS/DFS from one node won't reach all! |
| **Single node** (self-loop?) | Check if self-loops are allowed |
| **Disconnected graph** | BFS/DFS from one node won't reach all components |
| **All nodes isolated** | Each node is its own component |
| **Negative weight cycles** | Bellman-Ford detects these |
| **Dense vs sparse graph** | Choose representation wisely |
| **Grid with all 0s or all 1s** | Test extreme grid configurations |
| **Source == Destination** | Distance = 0, return immediately |
| **Multiple valid answers** | Topological sort, MST may have multiple valid solutions |

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

## Next Steps

Explore [Real-World Applications](/DSA-Notes-Problems/data-structures/graphs/11-applications) of graphs to deepen your understanding.

---

## Related Topics

- [Interview Questions](/DSA-Notes-Problems/data-structures/graphs/09-interview-questions) — Apply these tips while solving problems
- [Problem-Solving Approach](/DSA-Notes-Problems/data-structures/graphs/07-problem-solving) — Systematic approach to graph problems
