---
title: Lists in Python
description: Comprehensive guide to Python lists — creation, methods, slicing, comprehensions, and performance.
sidebar:
  order: 1
---

# Lists in Python

## Introduction

A list is a **mutable, ordered sequence** that can hold elements of any type. Think of it as a dynamic array that grows and shrinks as needed.

## Creating Lists

```python
empty = []
numbers = [1, 2, 3, 4, 5]
mixed   = [1, "hello", 3.14, True, None]

# From iterables
from_string = list("hello")     # ['h', 'e', 'l', 'l', 'o']
from_range  = list(range(5))    # [0, 1, 2, 3, 4]

# Repeated elements
zeros = [0] * 5              # [0, 0, 0, 0, 0]
```

## Indexing and Slicing

```python
data = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

print(data[2:5])      # [30, 40, 50]
print(data[:4])       # [10, 20, 30, 40]
print(data[6:])       # [70, 80, 90, 100]
print(data[::-1])     # Reversed
print(data[-3:])      # Last 3: [80, 90, 100]
```

## List Methods

```python
lst = [3, 1, 4, 1, 5, 9, 2, 6, 5]

# Adding
lst.append(7)          # Add to end — O(1)
lst.insert(0, 99)      # Insert at index — O(n)
lst.extend([10, 11])   # Add multiple

# Removing
popped = lst.pop()     # Remove last — O(1)
lst.remove(99)         # Remove by value — O(n)
lst.clear()            # Remove all

# Searching
print(lst.index(5))    # First occurrence index
print(lst.count(1))    # Count occurrences
print(5 in lst)        # Membership test

# Ordering
lst.sort()             # Sort in place — O(n log n)
lst.sort(reverse=True) # Descending
lst.reverse()          # Reverse in place
```

## List Comprehensions

```python
# Basic
squares = [x**2 for x in range(10)]

# With condition
evens = [x for x in range(20) if x % 2 == 0]

# Nested (flatten matrix)
matrix = [[1,2,3],[4,5,6],[7,8,9]]
flat = [val for row in matrix for val in row]
```

## Nested Lists

```python
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
print(matrix[0][1])  # 2
```

## Time Complexity

| Operation | Complexity |
|-----------|-----------|
| `append(x)` | O(1) amortized |
| `pop()` | O(1) |
| `pop(i)` | O(n) |
| `insert(i, x)` | O(n) |
| `x in list` | O(n) |
| `lst[i]` | O(1) |
| `sort()` | O(n log n) |

## Why It Matters

Lists are the most commonly used data structure in Python. Understanding their internals helps you write faster code.

## Common Mistakes

- Using `[[0]*3]*3` creates linked rows (use list comprehension instead)
- Using `pop(0)` on large lists is O(n) — use `collections.deque` for queues

## Interview Questions

**Q1: What's the difference between `append()` and `extend()`?**

A: `append()` adds one element; `extend()` unpacks an iterable and adds each item individually.

**Q2: Why does `[[0]*3]*3` create linked rows?**

A: `*` repeats the reference, not the object. All rows point to the same list. Use `[[0]*3 for _ in range(3)]`.

## Practice Exercises

1. Remove duplicates from a list while preserving order.
2. Rotate a list by k positions.
3. Find two numbers in a list that sum to a target.
