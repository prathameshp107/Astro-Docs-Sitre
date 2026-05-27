---
title: Recursion in Python
description: Learn about recursive functions, base cases, recursion depth, and when to use recursion.
sidebar:
  order: 5
---

# Recursion in Python

## Introduction

**Recursion** is a technique where a function calls itself to solve a problem by breaking it into smaller subproblems.

<img src="/DSA-Notes-Problems/assets/python/function-call-flow.svg" alt="Function Call Flow — Call Stack Diagram" width="700" />

## Structure of a Recursive Function

```python
def recursive_function(params):
    # 1. Base case — stops recursion
    if base_case_condition:
        return base_value
    
    # 2. Recursive case — call with modified params
    return recursive_function(modified_params)
```

## Classic Examples

### Factorial

```python
def factorial(n):
    # Base case
    if n <= 1:
        return 1
    # Recursive case
    return n * factorial(n - 1)

print(factorial(5))  # 120
```

### Fibonacci

```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# Inefficient for large n — use memoization!

from functools import lru_cache

@lru_cache(maxsize=None)
def fib_memoized(n):
    if n <= 1:
        return n
    return fib_memoized(n - 1) + fib_memoized(n - 2)
```

### Binary Search

```python
def binary_search(arr, target, left=0, right=None):
    if right is None:
        right = len(arr) - 1
    
    if left > right:
        return -1  # Base case: not found
    
    mid = (left + right) // 2
    
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search(arr, target, mid + 1, right)
    else:
        return binary_search(arr, target, left, mid - 1)
```

## Recursion Depth

```python
import sys

# Default recursion limit
print(sys.getrecursionlimit())  # 1000

# Increase limit (use with caution!)
sys.setrecursionlimit(10000)

# For very deep recursion, consider iterative approach
def factorial_iterative(n):
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result
```

## Tail Recursion

Python does **not** optimize tail recursion. Even tail-recursive calls consume stack frames.

```python
# This still uses O(n) stack space
def factorial_tail(n, accumulator=1):
    if n <= 1:
        return accumulator
    return factorial_tail(n - 1, n * accumulator)  # Not optimized!

# Prefer iterative for very deep recursion
```

## When to Use Recursion

| Use Recursion | Avoid Recursion |
|--------------|-----------------|
| Tree traversal | Very deep recursion (>1000 levels) |
| Divide-and-conquer algorithms | Simple loops |
| Backtracking problems | Performance-critical code |
| Problems with recursive definition | When iterative solution is clearer |

## Practice Exercises

**Exercise 1:** Implement `tower_of_hanoi(n, source, target, auxiliary)` that prints the moves.

**Exercise 2:** Write a recursive function to flatten a nested list `[1, [2, [3, 4]], 5]`.

**Exercise 3:** Implement a recursive directory tree printer that shows file indentation.
