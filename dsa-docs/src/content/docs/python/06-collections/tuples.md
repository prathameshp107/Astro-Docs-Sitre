---
title: Tuples in Python
description: Learn about tuples — immutable sequences, packing/unpacking, named tuples, and when to use them.
sidebar:
  order: 2
---

# Tuples in Python

## Introduction

A tuple is an **immutable, ordered sequence** — like a list that can never be changed. This immutability makes tuples faster, hashable, and semantically meaningful.

## Creating Tuples

```python
empty = ()
point = (3, 4)
person = ("Alice", 30, "Engineer")

# Parentheses optional
coords = 10, 20

# Single element tuple NEEDS comma
single  = (42,)       # Tuple
not_tuple = (42)      # Just integer 42!
```

## Packing & Unpacking

```python
point = 3, 4      # Packing
x, y = point      # Unpacking
print(x, y)       # 3 4

# Extended unpacking
first, *rest = (1, 2, 3, 4, 5)
print(rest)   # [2, 3, 4, 5] (rest is list!)

# Swap
x, y = 10, 20
x, y = y, x
```

## Tuple Methods

```python
t = (3, 1, 4, 1, 5, 9, 2, 6, 5)

print(t.count(1))     # 2
print(t.index(5))     # 4
print(5 in t)         # True
```

## Named Tuples

```python
from collections import namedtuple

Point = namedtuple("Point", ["x", "y"])
p = Point(3, 4)
print(p.x)     # 3 — clear!
print(p.y)     # 4
print(p[0])    # 3 — still supports indexing

# From typing (Python 3.6+)
from typing import NamedTuple

class Point3D(NamedTuple):
    x: float
    y: float
    z: float = 0.0
```

## Tuple vs List

| Feature | Tuple | List |
|---------|-------|------|
| Mutability | Immutable | Mutable |
| Memory | Smaller (~33% less) | More |
| Hashable | Yes (dict key) | No |
| Methods | 2 (count, index) | 11+ |
| Creation | Faster (~5x) | Slower |

## Why It Matters

Tuples are ideal for fixed data (coordinates, RGB colors, database records) and as dictionary keys.

## Interview Questions

**Q1: Why are tuples faster than lists?**

A: Tuples are stored more compactly with no over-allocation. Constant tuples can be reused. Iteration is optimized in CPython.

**Q2: Can a tuple contain mutable elements?**

A: Yes! A tuple with a list inside can have that list modified: `t = ([1,2], 3); t[0].append(4)` — this works!

## Practice Exercises

1. Create a named tuple for 2D coordinates and calculate distance.
2. Demonstrate the difference between `==` and `is` with tuples.
3. Compare memory usage of a tuple vs list with the same data.
