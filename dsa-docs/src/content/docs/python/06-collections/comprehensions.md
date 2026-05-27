---
title: Comprehensions in Python
description: Master list, set, dict comprehensions and generator expressions for concise, Pythonic code.
sidebar:
  order: 5
---

# Comprehensions in Python

## Introduction

Comprehensions provide a concise way to create collections by iterating over an iterable, optionally filtering elements.

## List Comprehensions

```python
# Syntax: [expression for item in iterable if condition]

# Basic
squares = [x**2 for x in range(10)]
print(squares)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# With condition
evens = [x for x in range(20) if x % 2 == 0]

# With transformation
words = ["  hello  ", "  world  "]
cleaned = [w.strip().title() for w in words]
print(cleaned)  # ['Hello', 'World']

# Multiple for clauses (Cartesian product)
pairs = [(x, y) for x in [1,2,3] for y in ['a','b']]
# [(1,'a'),(1,'b'),(2,'a'),(2,'b'),(3,'a'),(3,'b')]

# Flatten a matrix
matrix = [[1,2,3],[4,5,6],[7,8,9]]
flat = [val for row in matrix for val in row]
# [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

## Set Comprehensions

```python
# Syntax: {expression for item in iterable if condition}

squares = {x**2 for x in range(10)}
vowels = {c for c in "hello world python" if c in "aeiou"}
# {'e', 'o'}
```

## Dict Comprehensions

```python
# Syntax: {key_expr: value_expr for item in iterable if condition}

squares = {x: x**2 for x in range(1, 6)}
# {1:1, 2:4, 3:9, 4:16, 5:25}

# Invert a dict
original = {"a": 1, "b": 2, "c": 3}
inverted = {v: k for k, v in original.items()}
# {1:'a', 2:'b', 3:'c'}

# Filter
inventory = {"apple": 50, "banana": 30, "cherry": 100}
low_stock = {item: qty for item, qty in inventory.items() if qty < 50}
# {'banana': 30}
```

## Generator Expressions

```python
# Syntax: (expression for item in iterable if condition)
# Lazy — doesn't create entire collection in memory!

squares_gen = (x**2 for x in range(1_000_000))
print(sys.getsizeof(squares_gen))  # 112 bytes — tiny!
print(sys.getsizeof(list(squares_gen)))  # ~8 MB

# Use as function arguments
sum(x**2 for x in range(10))  # 285 — no extra list created!
```

## Performance Comparison

```python
import timeit

# Loop vs Comprehension
loop_time = timeit.timeit(
    '''
result = []
for x in range(100):
    if x % 2 == 0:
        result.append(x**2)
''', number=10000
)

comp_time = timeit.timeit(
    '[x**2 for x in range(100) if x % 2 == 0]', number=10000
)

# Comprehension is typically 20-35% faster!
```

## Why It Matters

Comprehensions are more readable and often faster than equivalent for-loops. They're a hallmark of Pythonic code.

## Common Mistakes

- Using comprehension for complex logic (use a regular loop for readability)
- Using list comprehension when generator expression would save memory
- Forgetting `[]` for list, `{}` for set/dict, `()` for generator

## Interview Questions

**Q1: What's the difference between list comprehension and generator expression?**

A: List comprehension creates the entire list in memory (square brackets). Generator expression yields values lazily (parentheses), using O(1) memory.

**Q2: How do you know whether comprehensions or loops are faster?**

A: Comprehensions are typically 20-35% faster because they avoid `append()` overhead and use optimized C loops internally.

## Practice Exercises

1. Use a list comprehension to get all even numbers from 1-50 squared.
2. Use a dict comprehension to create a mapping of characters to their ASCII values.
3. Use a generator expression to sum squares of numbers 1-1000 without creating a list.
