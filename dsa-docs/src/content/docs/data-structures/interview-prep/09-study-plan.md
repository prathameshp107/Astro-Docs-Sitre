---
title: "Study Plan & Cheat Sheet"
description: "Prioritized topics, quick reference, and recommended learning path"
sidebar:
  order: 9
---

# Study Plan & Cheat Sheet

## Priority List — If You Must Prioritize

Master these array methods in order. They dominate interviews:

1. **map** — Transform every element in an array
2. **filter** — Select elements that pass a condition
3. **reduce** — Accumulate values into any result
4. **splice vs slice** — Very common interview question (mutating vs non-mutating)
5. **sort with comparator** — Custom sorting logic
6. **find vs filter** — Single result vs all matches
7. **some vs every** — Short-circuit boolean checks

---

## Quick Reference — Array Methods

### Non-Mutating Methods (Return New Value)

| Method | Returns | Use Case |
|--------|---------|----------|
| `map()` | New array | Transform each element |
| `filter()` | New array | Select matching elements |
| `reduce()` | Single value | Aggregate data |
| `slice()` | New array | Extract a portion (shallow copy) |
| `concat()` | New array | Merge arrays |
| `includes()` | Boolean | Check if value exists |
| `find()` | Element | Get first match |
| `findIndex()` | Number | Get index of first match |
| `some()` | Boolean | Any element passes? |
| `every()` | Boolean | All elements pass? |
| `flat()` | New array | Flatten nested arrays |
| `flatMap()` | New array | Map then flatten |

### Mutating Methods (⚠️ Changes Original)

| Method | Effect |
|--------|--------|
| `push()` | Add to end |
| `pop()` | Remove from end |
| `shift()` | Remove from start |
| `unshift()` | Add to start |
| `splice()` | Add/remove at index |
| `reverse()` | Reverse order |
| `sort()` | Sort in place |

> **⚠️ Important:** `sort()` converts elements to strings by default — always provide a comparator: `arr.sort((a, b) => a - b)`.

---

## Learning Path — Recommended Next Topics

After mastering **arrays + hash maps + two pointers**, study in this order:

### Phase 1: Core Data Structures
1. **Linked Lists** — Pointer manipulation, fast & slow technique
2. **Trees** — BFS/DFS traversals, BST operations, recursion
3. **Graphs** — Adjacency lists, connected components, shortest paths

### Phase 2: Advanced Techniques
4. **Recursion & Backtracking** — Subsets, permutations, combinations
5. **Sliding Window** — Subarray/substring problems (fixed & variable size)
6. **Dynamic Programming** — Memoization, tabulation, classic patterns

---

## Weekly Study Schedule

| Day | Focus | Practice |
|-----|-------|----------|
| Mon | Arrays + Methods | 2–3 easy problems |
| Tue | Hash Maps + Sets | 2 medium problems |
| Wed | Two Pointers | 2 medium problems |
| Thu | Sliding Window | 2 medium problems |
| Fri | Recursion / Backtracking | 2 problems |
| Sat | Review + Mock Interview | 4–5 problems from the week |
| Sun | Rest / New Topic Exploration | — |

---

## Before the Interview — Quick Checklist

- [ ] Review **Map vs Set** usage (frequency counter vs membership)
- [ ] Know **mutating vs non-mutating** methods by heart
- [ ] Practice **Two Sum** in 3 different ways
- [ ] Review **time & space complexity** for all patterns
- [ ] Prepare **questions for the interviewer** (system design, team culture)
- [ ] **Talk through** your solution before writing code

---

<span class="related-topics">**Related:** [Array Methods →](/DSA-Notes-Problems/data-structures/interview-prep/01-array-methods) | [Pro Tips →](/DSA-Notes-Problems/data-structures/interview-prep/08-pro-tips) | [Recursion Section →](/DSA-Notes-Problems/data-structures/recursion)</span>
