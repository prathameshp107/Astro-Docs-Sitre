---
title: Functional Programming
description: Learn functional programming concepts in Python — map, filter, reduce, itertools, and functional patterns.
sidebar:
  order: 1
---

# Functional Programming

## Introduction

Python supports **functional programming** — a paradigm where computation is treated as evaluation of functions, avoiding mutable state and side effects.

## map() — Apply Function to Sequence

```python
numbers = [1, 2, 3, 4, 5]

# Doubling each number
doubled = list(map(lambda x: x * 2, numbers))
print(doubled)  # [2, 4, 6, 8, 10]

# With multiple iterables
def add(x, y):
    return x + y

result = list(map(add, [1, 2, 3], [10, 20, 30]))
print(result)  # [11, 22, 33]

# With named functions
def celsius_to_fahrenheit(c):
    return (c * 9/5) + 32

temps = [0, 10, 20, 30, 40]
print(list(map(celsius_to_fahrenheit, temps)))
```

## filter() — Filter Sequence

```python
numbers = range(-5, 6)

positives = list(filter(lambda x: x > 0, numbers))
print(positives)  # [1, 2, 3, 4, 5]

# Filter with None — removes falsy values
values = [0, 1, "", "hello", [], [1, 2], None]
truthy = list(filter(None, values))
print(truthy)  # [1, 'hello', [1, 2]]
```

## reduce() — Accumulate Sequence

```python
from functools import reduce

# Sum all numbers
total = reduce(lambda x, y: x + y, [1, 2, 3, 4, 5])
print(total)  # 15

# Max value
maximum = reduce(lambda x, y: x if x > y else y, [3, 7, 2, 9, 1])
print(maximum)  # 9

# With initial value
product = reduce(lambda x, y: x * y, [1, 2, 3, 4], 10)
print(product)  # 240 (10 * 1 * 2 * 3 * 4)
```

## itertools Module

```python
from itertools import (
    chain, cycle, repeat, accumulate, product,
    permutations, combinations, groupby, islice
)

# accumulate — running total
print(list(accumulate([1, 2, 3, 4, 5])))  # [1, 3, 6, 10, 15]

# product — Cartesian product
print(list(product([1, 2], ['a', 'b'])))
# [(1, 'a'), (1, 'b'), (2, 'a'), (2, 'b')]

# permutations
print(list(permutations('ABC', 2)))
# [('A', 'B'), ('A', 'C'), ('B', 'A'), ('B', 'C'), ('C', 'A'), ('C', 'B')]

# combinations
print(list(combinations([1, 2, 3, 4], 2)))
# [(1, 2), (1, 3), (1, 4), (2, 3), (2, 4), (3, 4)]

# groupby — needs sorted data
data = [("A", 1), ("A", 2), ("B", 3), ("B", 4)]
for key, group in groupby(data, key=lambda x: x[0]):
    print(key, list(group))
```

## Lambda vs Comprehension

```python
# Map vs Comprehension
result1 = list(map(lambda x: x ** 2, range(10)))
result2 = [x ** 2 for x in range(10)]  # ✅ More Pythonic

# Filter vs Comprehension
result1 = list(filter(lambda x: x % 2 == 0, range(20)))
result2 = [x for x in range(20) if x % 2 == 0]  # ✅ More Pythonic

# Prefer comprehensions for simple operations!
```

## Best Practices

1. **Prefer comprehensions** over `map()`/`filter()` with lambdas — they're more readable
2. **Use `reduce()` sparingly** — explicit loops are often clearer
3. **Use `itertools`** for efficient iteration patterns
4. **Avoid mixing functional and imperative styles** in the same function

## Practice Exercises

**Exercise 1:** Use `map()` and `filter()` to process a list of temperatures: convert to Fahrenheit and filter out freezing temps.

**Exercise 2:** Use `itertools.groupby()` to group a list of log entries by date.

**Exercise 3:** Use `reduce()` to find the most frequent word in a list.
