---
title: "Greedy Algorithms — Introduction"
description: "What greedy means (pick the best local choice), when it works vs fails, comparison with DP, and the classic problem template."
sidebar:
  order: 1
---

# 💰 Greedy Algorithms — Introduction

## 🎯 What Is a Greedy Algorithm?

A **greedy algorithm** makes the **best choice at each step** — the locally optimal choice — hoping it leads to the globally optimal solution.

**Analogy:** Imagine hiking to a mountain summit. A greedy approach: at every fork, take the path that looks steepest upward. This often gets you to the top, but not always — you might get stuck on a small peak while a bigger peak is behind you.

---

## 🔹 The Greedy Template

```javascript
function greedyTemplate(problem) {
  let result = initialValue;

  while (notDone(problem)) {
    // 1. Choose the BEST option right now
    const bestChoice = makeLocalOptimalChoice(problem);

    // 2. Commit to it
    result = updateResult(result, bestChoice);

    // 3. Reduce the problem (move forward)
    problem = reduceProblem(problem);
  }

  return result;
}
```

---

## 🔹 When Greedy Works vs Fails

```mermaid
flowchart TB
    subgraph Works["✅ Greedy Works"]
        W1["Activity Selection: pick next earliest finish time"]
        W2["Fractional Knapsack: pick highest value/weight ratio"]
        W3["Dijkstra: pick closest unvisited vertex"]
        W4["Huffman Coding: merge two smallest frequencies"]
        W5["Coin Change (canonical coins): pick largest coin first"]
    end
    
    subgraph Fails["❌ Greedy Fails"]
        F1["0/1 Knapsack: greedy ratio doesn't guarantee optimal"]
        F2["Coin Change (non-canonical): greedy picks wrong"]
        F3["Traveling Salesman: greedy path is suboptimal"]
        F4["Graph Coloring: greedy may use more colors"]
    end
    
    Works -->|Greedy works when<br/>local optimum = global optimum| Check{Mathematical Property}
    Fails -->|Greedy fails when<br/>a local choice blocks<br/>a better global result| Check
    
    Check -->|Optimal Substructure +<br/>Greedy Choice Property| Works2[✅ Use greedy]
    Check -->|No greedy property| DP[Use DP instead]
    
    style Works fill:#c8e6c9,color:#333
    style Fails fill:#ffcdd2,color:#333
    style Works2 fill:#c8e6c9,color:#333
    style DP fill:#bbdefb,color:#333
```

---

## 🔹 Greedy vs Dynamic Programming

| Aspect | Greedy | Dynamic Programming |
|--------|--------|-------------------|
| Decision | One choice per step, never revisit | Explores all choices, uses previous results |
| Memory | O(1) or small | O(n) or O(n²) table |
| Proof needed | "Greedy choice property" + "optimal substructure" | Optimal substructure + overlapping subproblems |
| Typical time | O(n) or O(n log n) | O(n²) or more |
| Example | Activity Selection | 0/1 Knapsack |
| Analogy | Hiking straight up | Checking a map for all possible routes |

---

## 🔹 How to Spot a Greedy Problem

Ask these questions:

1. **Can I make a choice now that doesn't block future choices?** (Greedy choice property)
2. **Is the best solution made of the best solutions to subproblems?** (Optimal substructure)
3. **If I make the "best looking" choice at each step, will it produce the globally best answer?**

**Common greedy indicators:**
- "Maximum" or "minimum" of something with constraints
- Scheduling / interval problems
- Problems with a natural ordering (sort first)
- Coin change with standard coin denominations

---

## ✅ In Simple Words

- **Greedy** = pick the best thing right now, hope it works out globally.
- It works when a **locally optimal choice is also globally optimal** (greedy choice property).
- It fails when a choice now **blocks a better** result later (use DP instead).
- To prove greedy works: show the first greedy choice doesn't prevent an optimal solution.
- **Activity selection, Huffman coding, Dijkstra** are classic greedy successes.
- **0/1 Knapsack, TSP** are classic greedy failures.
