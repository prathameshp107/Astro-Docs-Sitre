---
title: "Time & Space Complexity"
description: "How to analyze time and space complexity of recursive algorithms with common patterns."
sidebar:
  order: 11
practice:
  visualizer: /visualizer/recursion
---

# Time & Space Complexity

## How to Analyze Recursive Time Complexity

The time complexity of a recursive function depends on:
1. **Number of recursive calls** per function invocation
2. **Work done per call** (excluding recursive calls)
3. **Depth of recursion**

```
Total work = (Number of nodes in recursion tree) × (Work per node)
```

## Common Patterns

| Pattern | Recurrence | Complexity | Example |
|---------|-----------|------------|---------|
| Linear | T(n) = T(n-1) + O(1) | **O(n)** | Factorial, linear search |
| Linear with work | T(n) = T(n-1) + O(n) | **O(n²)** | Selection sort |
| Divide by 2 | T(n) = T(n/2) + O(1) | **O(log n)** | Binary search |
| Divide & Conquer | T(n) = 2T(n/2) + O(n) | **O(n log n)** | Merge sort |
| Binary tree | T(n) = 2T(n-1) + O(1) | **O(2ⁿ)** | Fibonacci (naive), subsets |
| Permutations | T(n) = n × T(n-1) | **O(n!)** | Permutations |

## Exponential Growth Explained

```
Why 2ⁿ grows so fast:

n       2ⁿ         Visual
─────────────────────────────
1       2           ██
2       4           ████
3       8           ████████
4       16          ████████████████
5       32          ████████████████████████████████
10      1,024       (fills the screen)
20      1,048,576   (over a million)
30      ~1 billion  (impractical)
40      ~1 trillion (impossible)

This is why:
  - Subsets: 2ⁿ subsets → array of 20 elements has ~1M subsets
  - Permutations: n! → 10 elements have 3,628,800 permutations
  - Fibonacci (naive): 2ⁿ → fib(40) makes ~1 billion calls!
```

## Space Complexity

For recursive functions, space = max depth of call stack + any data structures used.

```
Linear recursion:   O(n) stack depth
Binary recursion:   O(n) stack depth (tree has depth n, not 2ⁿ)
                    Even though there are 2ⁿ nodes, at any point
                    only O(n) are on the stack simultaneously.

Remember: Stack depth = longest path from root to leaf in recursion tree
```

```
Recursion tree for fib(5):

                        fib(5)     ← depth 0
                       /     \
                  fib(4)    fib(3)  ← depth 1
                 /    \     /    \
             fib(3) fib(2) fib(2) fib(1)  ← depth 2
            ...

Maximum depth = n = 5
Even though total nodes ≈ 2^5 = 32,
only 5 frames are on the stack at any time.

Space = O(n), NOT O(2ⁿ)
```

## Backtracking Complexity

| Problem | Time Complexity | Space Complexity | Notes |
|---------|----------------|-----------------|-------|
| Subsets | O(2ⁿ) | O(n) | Every subset visited once |
| Subsets + pruning | O(2ⁿ) worst, faster in practice | O(n) | Pruning helps but doesn't change worst-case |
| Permutations | O(n!) | O(n) | n! permutations of n elements |
| N-Queens | O(n!) | O(n²) | Queen placements: first row has n choices |
| Sudoku | O(9^empty) | O(81) | Great pruning makes it fast in practice |
| Combination Sum | O(2^(t/min)) | O(t/min) | t = target, min = smallest candidate |

## Optimization Impact

| Optimization | Before | After | Problem |
|-------------|--------|-------|---------|
| Memoization | O(2ⁿ) | O(n) | Fibonacci |
| Pruning (break) | O(2ⁿ) | Much faster | Combination Sum (sorted) |
| Bitmask | O(n × 2ⁿ) | O(2ⁿ) | DP over subsets |
| Iterative DP | O(n) stack | O(1) | Factorial, sum |

---

**Next:** [Code Examples](/DSA-Notes-Problems/data-structures/recursion/11-code-examples) →
