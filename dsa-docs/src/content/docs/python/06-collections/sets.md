---
title: Sets in Python
description: Learn about sets — unordered collections of unique elements with O(1) membership testing.
sidebar:
  order: 3
---

# Sets in Python

## Introduction

A set is an **unordered collection of unique, hashable elements**, backed by a hash table with O(1) membership testing.

## Creating Sets

```python
# Empty set — MUST use set(), not {}!
empty_set = set()
empty_dict = {}  # This is a dict!

# Set with elements
fruits = {"apple", "banana", "cherry"}

# From iterable (auto-removes duplicates)
unique = set([1, 2, 2, 3, 3, 3])
print(unique)  # {1, 2, 3}
```

## Set Methods

```python
s = {1, 2, 3, 4, 5}

# Adding/Removing
s.add(6)          # O(1)
s.remove(6)       # Raises KeyError if missing
s.discard(99)     # No error if missing! ✅
popped = s.pop()  # Remove & return ARBITRARY element

# Checking
print(3 in s)     # True — O(1)! Fast!
```

## Set Operations

```python
A = {1, 2, 3, 4, 5}
B = {4, 5, 6, 7, 8}

# Union
print(A | B)              # {1,2,3,4,5,6,7,8}
print(A.union(B))

# Intersection
print(A & B)              # {4, 5}
print(A.intersection(B))

# Difference
print(A - B)              # {1, 2, 3}
print(A.difference(B))

# Symmetric Difference
print(A ^ B)              # {1,2,3,6,7,8}

# Subset/Superset
print({1,2}.issubset(A))  # True
print(A.issuperset({1,2})) # True
```

## Frozen Sets

```python
fs = frozenset({1, 2, 3})  # Immutable set

# Can be dict key or set element!
graph = {
    frozenset({0, 1}): "edge",
    frozenset({1, 2}): "edge",
}
```

## Set Comprehension

```python
squares = {x**2 for x in range(10)}
unique_vowels = {c for c in "hello world" if c in "aeiou"}
```

## Why It Matters

Sets are essential for fast membership testing, removing duplicates, and set operations (union, intersection, difference) used in data analysis.

## Interview Questions

**Q1: Why is `x in set` O(1) but `x in list` O(n)?**

A: Sets use hash tables — `hash(x)` maps directly to a bucket (O(1)). Lists require linear search (O(n)).

**Q2: What types can be stored in a set?**

A: Only hashable types: int, float, str, tuple (of hashables), frozenset. Lists, dicts, and sets are NOT hashable.

## Practice Exercises

1. Find common elements between two lists using set intersection.
2. Remove duplicates from a list while preserving order.
3. Use `frozenset` as a dictionary key for an undirected graph.
