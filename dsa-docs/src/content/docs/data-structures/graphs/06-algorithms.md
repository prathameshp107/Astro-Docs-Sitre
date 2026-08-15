---
title: "Key Graph Algorithms"
description: "Dijkstra, Bellman-Ford, Floyd-Warshall, Kruskal, and Prim algorithms — now each on their own dedicated page."
sidebar:
  order: 6
practice:
  visualizer: /visualizer/graphs
---

# Key Algorithms on Graphs

> Essential graph algorithms for shortest paths, minimum spanning trees, and more. Each major algorithm now has its own detailed page.

---

## Dedicated Pages

Each algorithm is explained in depth on its own page:

| Algorithm | Page | Best For |
|-----------|------|----------|
| **Dijkstra** | [Dijkstra's Algorithm →](/DSA-Notes-Problems/data-structures/graphs/12-dijkstra) | Shortest path, non-negative weights |
| **Bellman-Ford** | [Bellman-Ford Algorithm →](/DSA-Notes-Problems/data-structures/graphs/13-bellman-ford) | Shortest path, handles negative weights |
| **Floyd-Warshall** | [Floyd-Warshall Algorithm →](/DSA-Notes-Problems/data-structures/graphs/14-floyd-warshall) | All-pairs shortest path |
| **Topological Sort** | [Topological Sort →](/DSA-Notes-Problems/data-structures/graphs/15-topological-sort) | Ordering DAGs (dependencies, build systems) |
| **Union-Find (DSU)** | [Union-Find (Disjoint Set) →](/DSA-Notes-Problems/data-structures/graphs/16-union-find-dsu) | Track connected components, detect cycles |
| **MST (Kruskal & Prim)** | [Minimum Spanning Tree →](/DSA-Notes-Problems/data-structures/graphs/17-mst-kruskal-prim) | Kruskal vs Prim for MST |
| **Cycle Detection** | [Cycle Detection →](/DSA-Notes-Problems/data-structures/graphs/18-cycle-detection) | Detect cycles in directed/undirected graphs |

---

## Choosing the Right Algorithm

```mermaid
flowchart TD
    Q1{What problem?}
    Q1 --> SP[Shortest Path]
    Q1 --> MST[Minimum Spanning Tree]
    Q1 --> Other[Structure / Order]

    SP --> SP1{Edge weights?}
    SP1 -->|Unweighted| BFS["BFS O(V+E)"]
    SP1 -->|Non-negative| DIJK["Dijkstra O((V+E) log V)"]
    SP1 -->|Negative edges| BF["Bellman-Ford O(V×E)"]
    SP1 -->|All pairs| FW["Floyd-Warshall O(V³)"]

    MST --> MST1{Graph density?}
    MST1 -->|Sparse| KRUS["Kruskal's O(E log E)"]
    MST1 -->|Dense| PRIM["Prim's O((V+E) log V)"]

    Other --> O1{Detect cycles?}
    Other --> O2{Order dependencies?}
    Other --> O3{Connected components?}
    O1 --> CYCLE["Cycle Detection →"]
    O2 --> TOPO["Topological Sort →"]
    O3 --> UF["Union-Find (DSU) →"]

    style BFS fill:#4f46e5,color:#fff
    style DIJK fill:#7c3aed,color:#fff
    style BF fill:#4f46e5,color:#fff
    style FW fill:#6366f1,color:#fff
    style KRUS fill:#059669,color:#fff
    style PRIM fill:#059669,color:#fff
    style CYCLE fill:#dc2626,color:#fff
    style TOPO fill:#dc2626,color:#fff
    style UF fill:#dc2626,color:#fff
```

---

## Next Steps

Apply these algorithms using our [Problem-Solving Approach](/DSA-Notes-Problems/data-structures/graphs/07-problem-solving) and check the [Code Examples](/DSA-Notes-Problems/data-structures/graphs/08-code-examples) for implementations.

---

## Related Topics

- [Tree Algorithms](/DSA-Notes-Problems/data-structures/trees/06-traversals) — Compare tree and graph traversal approaches
