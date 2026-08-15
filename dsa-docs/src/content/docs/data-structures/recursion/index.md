---
title: "Recursion & Backtracking"
description: "Comprehensive guide to recursion, backtracking, and problem-solving patterns with JavaScript examples."
sidebar:
  order: 1
practice:
  visualizer: /visualizer/recursion
---

# Recursion & Backtracking

Welcome to the **Recursion & Backtracking** section — from absolute beginner to interview-ready. This guide covers everything from the fundamentals of recursive thinking to advanced backtracking patterns.

---

## Learning Path

| Step | Topic | What You'll Learn |
|------|-------|-------------------|
| 1 | [Introduction to Recursion](/DSA-Notes-Problems/data-structures/recursion/01-introduction) | What is recursion, analogies, function structure |
| 2 | [The Call Stack](/DSA-Notes-Problems/data-structures/recursion/02-call-stack) | How recursion uses the call stack, winding/unwinding |
| 3 | [Types of Recursion](/DSA-Notes-Problems/data-structures/recursion/03-types) | Direct, indirect, tail, head, tree recursion |
| 4 | [Basic Recursion Problems](/DSA-Notes-Problems/data-structures/recursion/04-basic-problems) | Factorial, Fibonacci, sum, reverse, subsequences |
| 5 | [Recursion Patterns](/DSA-Notes-Problems/data-structures/recursion/05-patterns) | Pick/Not Pick, Divide & Conquer, Backtracking foundation |
| 6 | [Introduction to Backtracking](/DSA-Notes-Problems/data-structures/recursion/06-backtracking-intro) | What is backtracking, decision trees, universal template |
| 7 | [Backtracking Patterns](/DSA-Notes-Problems/data-structures/recursion/07-backtracking-patterns) | Subsets, permutations, combination sum |
| 8 | [Advanced Backtracking](/DSA-Notes-Problems/data-structures/recursion/08-backtracking-advanced) | N-Queens, Sudoku, palindrome partitioning, word search |
| 9 | [Problem-Solving Approach](/DSA-Notes-Problems/data-structures/recursion/09-problem-solving) | How to identify & approach recursion problems |
| 10 | [Time & Space Complexity](/DSA-Notes-Problems/data-structures/recursion/10-complexity) | Analyzing recursive algorithms |
| 11 | [Code Examples](/DSA-Notes-Problems/data-structures/recursion/11-code-examples) | Additional JavaScript implementations |
| 12 | [Interview Questions](/DSA-Notes-Problems/data-structures/recursion/12-interview-questions) | Categorized by difficulty with solutions |
| 13 | [Common Mistakes & Tips](/DSA-Notes-Problems/data-structures/recursion/13-mistakes-tips) | Debugging, optimization, best practices |
| 14 | [Real-World Applications](/DSA-Notes-Problems/data-structures/recursion/14-applications) | File systems, game AI, compilers |

---

## Quick Visual Overview

### Call Stack

```mermaid
flowchart TB
    subgraph Stack[Call Stack — Winding Phase]
        direction TB
        F1["fib(5)
    → returns 5"]
        F2["fib(4)
    → returns 3"]
        F3["fib(3)
    → returns 2"]
        F4["fib(2)
    → returns 1"]
        F51["fib(1)
    → BASE CASE
    returns 1"]
    end

    F51 --> F4 --> F3 --> F2 --> F1

    style F51 fill:#7c3aed,color:#fff
    style F4 fill:#4f46e5,color:#fff
    style F3 fill:#6366f1,color:#fff
    style F2 fill:#818cf8,color:#fff
    style F1 fill:#a5b4fc,color:#fff
    style Stack fill:#1e293b,color:#fff
```

### Recursion Tree (Fibonacci)

```mermaid
flowchart TB
    F5["fib(5)"]
    F4["fib(4)"]
    F3a["fib(3)"]
    F3b["fib(3)"]
    F2a["fib(2)"]
    F2b["fib(2)"]
    F2c["fib(2)"]
    F1a["fib(1)=1"]
    F1b["fib(1)=1"]
    F1c["fib(1)=1"]
    F0a["fib(0)=0"]
    F0b["fib(0)=0"]
    F0c["fib(0)=0"]
    F1d["fib(1)=1"]
    F1e["fib(1)=1"]

    F5 --> F4
    F5 --> F3b
    F4 --> F3a
    F4 --> F2c
    F3a --> F2a
    F3a --> F1b
    F3b --> F2b
    F3b --> F1d
    F2a --> F1a
    F2a --> F0a
    F2b --> F1c
    F2b --> F0b
    F2c --> F1e
    F2c --> F0c

    style F5 fill:#7c3aed,color:#fff
    style F4 fill:#4f46e5,color:#fff
    style F3a fill:#6366f1,color:#fff
    style F3b fill:#6366f1,color:#fff
    style F2a fill:#818cf8,color:#fff
    style F2b fill:#818cf8,color:#fff
    style F2c fill:#818cf8,color:#fff
    style F1a fill:#059669,color:#fff
    style F1b fill:#059669,color:#fff
    style F1c fill:#059669,color:#fff
    style F1d fill:#059669,color:#fff
    style F1e fill:#059669,color:#fff
    style F0a fill:#ef4444,color:#fff
    style F0b fill:#ef4444,color:#fff
    style F0c fill:#ef4444,color:#fff
```

### Backtracking Decision Tree (Subsets of [1,2])

```mermaid
flowchart TB
    Start["Start
    i=0, [ ]"]
    Pick1["Pick 1
    i=1, [1]"]
    Skip1["Skip 1
    i=1, [ ]"]
    Pick2a["Pick 2
    i=2, [1,2]"]
    Skip2a["Skip 2
    i=2, [1]"]
    Pick2b["Pick 2
    i=2, [2]"]
    Skip2b["Skip 2
    i=2, [ ]"]
    Done1["✅ [1,2]"]
    Done2["✅ [1]"]
    Done3["✅ [2]"]
    Done4["✅ [ ]"]

    Start --> Pick1
    Start --> Skip1
    Pick1 --> Pick2a
    Pick1 --> Skip2a
    Skip1 --> Pick2b
    Skip1 --> Skip2b
    Pick2a --> Done1
    Skip2a --> Done2
    Pick2b --> Done3
    Skip2b --> Done4

    style Start fill:#f59e0b,color:#fff
    style Pick1 fill:#7c3aed,color:#fff
    style Skip1 fill:#4f46e5,color:#fff
    style Pick2a fill:#6366f1,color:#fff
    style Skip2a fill:#6366f1,color:#fff
    style Pick2b fill:#6366f1,color:#fff
    style Skip2b fill:#6366f1,color:#fff
    style Done1 fill:#059669,color:#fff
    style Done2 fill:#059669,color:#fff
    style Done3 fill:#059669,color:#fff
    style Done4 fill:#059669,color:#fff
```

### Types of Recursion

```mermaid
flowchart TB
    Recursion[Recursion Types]
    
    Recursion --> Direct[Direct Recursion
    Function calls itself]
    Recursion --> Indirect[Indirect Recursion
    Function A → B → A]
    Recursion --> Tail[Tail Recursion
    Recursive call is the
    LAST operation]
    Recursion --> Head[Head Recursion
    Recursive call is the
    FIRST operation]
    Recursion --> Tree[Tree Recursion
    Function calls itself
    multiple times
    e.g. Fibonacci]

    Direct --> Eg1["factorial(n):
    n × factorial(n-1)"]
    Indirect --> Eg2["isEven(n):
    isOdd(n-1)
    isOdd(n):
    isEven(n-1)"]
    Tail --> Eg3["factorial(n, acc):
    factorial(n-1, n×acc)"]
    Head --> Eg4["print(n):
    if n>0:
    print(n-1)
    console.log(n)"]
    Tree --> Eg5["fib(n):
    fib(n-1) + fib(n-2)"]

    style Recursion fill:#f59e0b,color:#fff
    style Direct fill:#7c3aed,color:#fff
    style Indirect fill:#3b82f6,color:#fff
    style Tail fill:#059669,color:#fff
    style Head fill:#ec4899,color:#fff
    style Tree fill:#06b6d4,color:#fff
    style Eg1 fill:#a5b4fc,color:#fff
    style Eg2 fill:#93c5fd,color:#fff
    style Eg3 fill:#6ee7b7,color:#fff
    style Eg4 fill:#f9a8d4,color:#fff
    style Eg5 fill:#67e8f9,color:#fff
```

---

## Key Formulas

| Concept | Formula |
|---------|---------|
| Subsets | `O(2ⁿ)` total subsets for n elements |
| Permutations | `O(n!)` total permutations |
| Fibonacci (naive) | `T(n) = T(n-1) + T(n-2) + O(1) → O(2ⁿ)` |
| Fibonacci (memoized) | `O(n)` time, `O(n)` space |
| Divide & Conquer | `T(n) = 2T(n/2) + O(n) → O(n log n)` |

---

## Related Topics

- [Trees](/DSA-Notes-Problems/data-structures/trees) — Most tree algorithms are inherently recursive
- [Graphs](/DSA-Notes-Problems/data-structures/graphs) — DFS graph traversal uses recursion
- [Stacks & Queues](/DSA-Notes-Problems/data-structures/stacks-queues/stack-lifo) — The call stack is a LIFO structure

*Start with [Introduction to Recursion](/DSA-Notes-Problems/data-structures/recursion/01-introduction) →*
