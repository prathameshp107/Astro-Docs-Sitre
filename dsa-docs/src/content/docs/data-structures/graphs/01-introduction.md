---
title: "Introduction to Graphs"
description: "What is a graph data structure? Terminologies, types, and properties of graphs."
sidebar:
  order: 1
---

# 📊 Introduction to Graphs

> A comprehensive overview of graphs — what they are, key terminologies, and the different types you'll encounter in interviews.

---

## What is a Graph?

A **graph** is a non-linear data structure consisting of a set of **vertices** (nodes) connected by **edges** (links). Unlike trees (which are a special type of graph), graphs can have cycles, disconnected components, and edges pointing in any direction.

![Graph Types](../../../../assets/images/graphs/graph-types.svg)

**Simple Example:**
```
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

## Key Terminologies

| Term | Definition | Real-World Example |
|------|------------|-------------------|
| **Vertex (Node)** | A fundamental unit/point in a graph | Cities on a map |
| **Edge** | A connection between two vertices | Roads between cities |
| **Degree** | Number of edges connected to a vertex | City with 3 roads → degree 3 |
| **In-Degree** | Edges coming INTO a vertex (directed) | Twitter followers |
| **Out-Degree** | Edges going OUT of a vertex (directed) | Twitter following |
| **Path** | A sequence of vertices connected by edges | Route from A to E |
| **Simple Path** | A path with no repeated vertices | Direct route, no backtracking |
| **Cycle** | A path that starts and ends at the same vertex | A → B → C → A |
| **Self-Loop** | An edge from a vertex to itself | A → A |
| **Neighbor** | Vertex directly connected by an edge | Adjacent cities |
| **Connected** | Every vertex reachable from every other vertex | One continent |
| **Component** | A maximal connected subgraph | Islands in a sea |
| **Weight** | A value/cost assigned to an edge | Distance in kilometers |

---

## Types of Graphs

### 1. Directed vs Undirected

| Undirected | Directed (Digraph) |
|------------|-------------------|
| Edges have **no direction** — A-B means both A→B and B→A | Edges have **direction (arrows)** — A→B does NOT imply B→A |
| Used for: social networks (friendships), road networks | Used for: web pages (hyperlinks), Twitter follows |

```mermaid
flowchart LR
    subgraph Undirected
        A1((A)) --- B1((B))
        A1 --- C1((C))
        B1 --- D1((D))
        C1 --- D1
    end
    subgraph Directed
        A2((A)) --> B2((B))
        A2 --> C2((C))
        C2 --> D2((D))
        B2 --> D2
    end

    style Undirected fill:#1e293b,color:#fff
    style Directed fill:#1e293b,color:#fff
```

```
Undirected:         Directed:
   A --- B            A ---> B
   |     |            |       |
   C --- D            v       v
                      C <--- D
```

### 2. Weighted vs Unweighted

| Unweighted | Weighted |
|------------|----------|
| All edges are equal | Each edge has a numeric cost/weight |
| Used for: hop count, simple connectivity | Used for: shortest path (distance, time, cost) |

```mermaid
flowchart LR
    subgraph Unweighted
        A1((A)) --- B1((B))
        A1 --- C1((C))
        B1 --- D1((D))
        C1 --- D1
    end
    subgraph Weighted
        A2((A)) -- 5 --- B2((B))
        A2 -- 10 --- C2((C))
        B2 -- 3 --- D2((D))
        C2 -- 7 --- D2
    end

    style Unweighted fill:#1e293b,color:#fff
    style Weighted fill:#1e293b,color:#fff
```

```
Unweighted:         Weighted:
   A --- B            A --5-- B
   |     |            |       |
   C --- D           10      3
                     |       |
                     C --7-- D
```

### 3. Cyclic vs Acyclic

| Cyclic | Acyclic (DAG) |
|--------|---------------|
| Contains at least one cycle | No cycle possible |
| Used for: detecting deadlocks | Used for: task scheduling, build systems |

```mermaid
flowchart LR
    subgraph Cyclic
        A1((A)) --> B1((B))
        B1 --> C1((C))
        C1 --> D1((D))
        D1 --> A1
    end
    subgraph DAG[Acyclic (DAG)]
        A2((A)) --> B2((B))
        A2 --> C2((C))
        B2 --> D2((D))
        C2 --> D2
        D2 --> E2((E))
    end

    style Cyclic fill:#1e293b,color:#fff
    style DAG fill:#1e293b,color:#fff
```

```
Cyclic:             Acyclic (DAG):
   A → B               A → B
   ↑   ↓               ↓   ↓
   D ← C               C   D
                        ↓
                       E
```

### 4. Connected vs Disconnected

| Connected | Disconnected |
|-----------|-------------|
| All nodes reachable from every other node | Some nodes are isolated (multiple components) |

```mermaid
flowchart LR
    subgraph Connected
        A1((A)) --- B1((B))
        A1 --- C1((C))
        B1 --- D1((D))
        C1 --- D1
    end
    subgraph Disconnected
        A2((A)) --- B2((B))
        D2((D)) --- E2((E))
        D2 --- F2((F))
    end

    style Connected fill:#1e293b,color:#fff
    style Disconnected fill:#1e293b,color:#fff
```

```
Connected:          Disconnected:
   A --- B            A --- B     D --- E
   |     |                         |
   C --- D                         F
```

### 5. Special Graph Types

| Type | Description | Edges |
|------|-------------|-------|
| **Tree** | Connected, acyclic, undirected | N-1 edges for N nodes |
| **Forest** | Collection of disjoint trees | Multiple trees |
| **Complete Graph (Kₙ)** | Every pair of vertices is connected | N×(N-1)/2 edges |
| **Bipartite Graph** | Vertices split into 2 groups; edges only between groups | No odd-length cycles |
| **DAG** | Directed graph with no cycles | Used for scheduling, dependency resolution |

```mermaid
flowchart LR
    subgraph Tree
        T1((1)) --- T2((2))
        T1 --- T3((3))
        T2 --- T4((4))
        T2 --- T5((5))
    end
    subgraph Bipartite
        B1((1)) --- B4((4))
        B1 --- B5((5))
        B2((2)) --- B4
        B3((3)) --- B5
    end

    style Tree fill:#1e293b,color:#fff
    style Bipartite fill:#1e293b,color:#fff
```

---

## Next Steps

Now that you understand what graphs are and their types, move on to learn about [Graph Representations](/DSA-Notes-Problems/data-structures/graphs/02-representations) — how to store and work with graphs in code.

---

## Related Topics

- [Tree Data Structure](/DSA-Notes-Problems/data-structures/trees) — Trees are a special case of graphs (acyclic, connected)
- [Recursion & Backtracking](/DSA-Notes-Problems/data-structures/recursion/recursion-and-backtracking) — Used in DFS traversal
