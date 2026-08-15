---
title: "Interview Questions"
description: "Must-do graph interview questions categorized by difficulty and key concept."
sidebar:
  order: 9
practice:
  visualizer: /visualizer/graphs
---

# Must-Do Interview Questions

> Categorized by difficulty with key concepts. Practice in order: Easy → Medium → Hard.

---

## 🟢 Easy

| # | Problem | Key Concept | Platform |
|---|---------|-------------|----------|
| 1 | **Find if Path Exists in Graph** | Basic BFS/DFS | LeetCode 1971 |
| 2 | **Flood Fill** | DFS on grid | LeetCode 733 |
| 3 | **Number of Islands** | DFS/BFS components | LeetCode 200 |
| 4 | **Find Center of Star Graph** | Degree counting | LeetCode 1791 |
| 5 | **Find the Town Judge** | In/Out degree | LeetCode 997 |
| 6 | **Clone Graph** | BFS + HashMap | LeetCode 133 |

---

## 🟡 Medium

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

## 🔴 Hard

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
| 9 | **Strongly Connected Components** | Kosaraju's / Tarjan's | Classic CS problem |

---

## Practice Strategy

| Level | Goal | Suggested Problems | Target Time |
|-------|------|-------------------|-------------|
| 🟢 Easy | Build fundamentals, understand graph traversal | All 6 | 2-3 days |
| 🟡 Medium | Master core patterns, apply to grid + graph | First 7 | 5-7 days |
| 🟡 Medium+ | Advanced patterns (Union-Find, Dijkstra) | All 14 | 7-10 days |
| 🔴 Hard | Multi-algorithm, state-based problems | First 5 | Extra practice |

> **💡 Tip:** Focus on the **Medium** problems — they cover 90% of interview graph questions. Hard problems are more common at top-tier companies.

---

## Next Steps

Before attempting the problems, review [Tips & Common Mistakes](/DSA-Notes-Problems/data-structures/graphs/10-tips) to avoid pitfalls.

---

## Related Topics

- [Graph Patterns](/DSA-Notes-Problems/data-structures/graphs/05-patterns) — Review the patterns before solving problems
- [Code Examples](/DSA-Notes-Problems/data-structures/graphs/08-code-examples) — Reuse these templates while practicing
