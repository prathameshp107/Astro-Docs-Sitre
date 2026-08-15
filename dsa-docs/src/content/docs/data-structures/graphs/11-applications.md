---
title: "Real-World Applications"
description: "How graphs are used in computer networks, maps, social networks, game AI, and more."
sidebar:
  order: 11
practice:
  visualizer: /visualizer/graphs
---

# Real-World Applications

> Graphs are everywhere — from GPS navigation to social media. Understanding these applications helps you connect algorithms to practical problems.

---

## 🌐 Computer Networks

```
Graph Model: Routers = vertices, Network links = edges, Bandwidth = weights
```

| Application | Algorithm Used | Why It Matters |
|------------|---------------|----------------|
| **Routing Protocols (OSPF)** | Dijkstra's algorithm | Routers find shortest path to forward packets |
| **Network Topology Design** | Minimum Spanning Tree (Prim's) | Minimize cable costs while keeping all nodes connected |
| **Network Loop Detection** | Cycle detection (DFS) | Prevent broadcast storms in Ethernet networks |
| **Redundant Path Planning** | MST / Spanning Tree Protocol | Ensure network survives link failures |

---

## 🗺️ Maps and Navigation

```
Graph Model: Intersections = vertices, Roads = edges, Distance/time = weights
```

| Application | Algorithm Used | Why It Matters |
|------------|---------------|----------------|
| **GPS Navigation** | Dijkstra / A* algorithm | Find fastest route between two points |
| **Google Maps** | Dijkstra with traffic as edge weights | Real-time traffic-aware routing |
| **Finding Nearby Places** | BFS (limited depth) | Find all gas stations within 5 miles |
| **Traffic Optimization** | Flow algorithms | Balance traffic across road networks |

> **Fun Fact:** A* is essentially Dijkstra + heuristic (estimated distance to goal). Google Maps uses A* with real-time traffic data.

---

## 📱 Social Networks

```
Graph Model: Users = vertices, Friendships/Follows = edges
```

| Application | Algorithm Used | Why It Matters |
|------------|---------------|----------------|
| **Friend Recommendations** | BFS (friends of friends) | "People you may know" feature |
| **Finding Influencers** | Graph centrality (PageRank) | Identify key opinion leaders |
| **Community Detection** | Connected components | Detect interest groups, echo chambers |
| **Six Degrees of Separation** | BFS shortest path | Milgram's experiment — everyone is ~6 steps away |
| **Fraud Detection** | Component analysis | Detect fake account clusters, bots |

---

## 📦 Package Managers & Build Systems

```
Graph Model: Packages/tasks = vertices, Dependencies = directed edges
```

| Application | Algorithm Used | Why It Matters |
|------------|---------------|----------------|
| **npm/yarn Dependency Resolution** | Topological Sort | Install packages in correct order |
| **Build Order (Makefiles)** | Topological Sort | Compile dependencies before dependents |
| **Circular Dependency Detection** | Cycle detection (DFS) | Prevent infinite build loops |
| **Docker Layer Ordering** | Topological Sort | Build container layers in correct sequence |

> **Every `npm install` runs a topological sort behind the scenes!**

---

## 🧬 Biology & Science

| Application | Algorithm Used |
|------------|---------------|
| **Protein Interaction Networks** | Connected components, clustering |
| **Disease Spread Modeling** | BFS from infection source (epidemic simulation) |
| **Genome Assembly** | Eulerian paths in de Bruijn graphs |
| **Phylogenetic Trees** | MST — reconstruct evolutionary relationships |

---

## 🎮 Games and AI

| Application | Algorithm Used | Why It Matters |
|------------|---------------|----------------|
| **Pathfinding in Games** | A* (Dijkstra + heuristic) | NPC movement, enemy AI pathing |
| **Dungeon Generation** | Spanning trees | Generate connected maze-like dungeons |
| **NPC Navigation** | Waypoint graphs + BFS/DFS | Characters navigate game world naturally |
| **Game State Search** | DFS / BFS | AI move evaluation in strategy games |

> **💡 Interview Context:** Game pathfinding is a common interview question framing. "Can a knight reach this square?" is really a BFS shortest-path problem.

---

## ✈️ Transportation & Logistics

| Application | Algorithm Used | Why It Matters |
|------------|---------------|----------------|
| **Flight Scheduling** | Topological Sort | Order flights respecting time constraints |
| **Airline Route Optimization** | Shortest path / MST | Minimize fuel costs, maximize connections |
| **Package Delivery Routing** | Traveling Salesman (NP-hard) | Optimal delivery routes (uses approximation) |
| **Train/Bus Network Planning** | Shortest path, flow | Plan efficient public transit networks |

---

## 💡 Other Notable Uses

| Domain | Application | Graph Concept |
|--------|-------------|---------------|
| **Web Crawling** | Internet = graph, pages = nodes, links = edges | BFS traversal |
| **Recommendation Systems** | Users and items as bipartite graph | Bipartite graph, clustering |
| **Circuit Design** | Electrical circuits as graphs | BFS/DFS for connectivity |
| **Compiler Design** | Control flow graphs, data flow analysis | DFS for dead code detection |
| **Database Query Optimization** | Query plan as a tree/graph | Directional graph traversal |
| **Fraud Detection** | Unusual connected clusters in transaction graphs | Connected components, anomaly detection |

---

## Application → Algorithm Mapping

| Real-World Problem | Graph Algorithm |
|-------------------|----------------|
| Find fastest driving route | Dijkstra / A* |
| Install software dependencies | Topological Sort (Kahn's) |
| Detect friend groups on Facebook | Connected components (DFS/UF) |
| Find shortest chain of friends | BFS (Six degrees) |
| Detect circular dependencies | Cycle detection (DFS) |
| Connect offices with minimum cable | MST (Kruskal's / Prim's) |
| Find if a network is 2-colorable | Bipartite check (BFS) |
| Model disease spreading | Multi-source BFS |
| Route internet packets | Dijkstra in OSPF protocol |

---

## Next Steps

Now review the complete [Graph section index](/DSA-Notes-Problems/data-structures/graphs) to start from the beginning, or jump to practice with [Interview Questions](/DSA-Notes-Problems/data-structures/graphs/09-interview-questions).

---

## Related Topics

- [Tree Applications](/DSA-Notes-Problems/data-structures/trees/14-applications) — Compare tree and graph applications
- [Real-World Data Structures](/DSA-Notes-Problems/data-structures) — See how all data structures connect to real problems
