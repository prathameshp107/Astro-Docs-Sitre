---
title: Lambda Functions
description: Learn about anonymous lambda functions, map, filter, reduce, and when to use them.
sidebar:
  order: 3
---

# Lambda Functions

## Introduction

A **lambda** is a small, anonymous function defined with the `lambda` keyword. It can take any number of arguments but returns only one expression.

## Syntax

```python
lambda arguments: expression
```

## Basic Examples

```python
# Regular function vs lambda
def square(x):
    return x ** 2

square_lambda = lambda x: x ** 2

print(square(5))        # 25
print(square_lambda(5)) # 25
```

## Common Use Cases

### With map()

```python
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x ** 2, numbers))
print(squared)  # [1, 4, 9, 16, 25]
```

### With filter()

```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8]
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)  # [2, 4, 6, 8]
```

### With sorted()

```python
students = [
    {"name": "Alice", "grade": 85},
    {"name": "Bob", "grade": 72},
    {"name": "Charlie", "grade": 95},
]

sorted_students = sorted(students, key=lambda s: s["grade"], reverse=True)
print(sorted_students)
# [{'name': 'Charlie', 'grade': 95}, {'name': 'Alice', 'grade': 85}, {'name': 'Bob', 'grade': 72}]
```

### reduce()

```python
from functools import reduce

numbers = [1, 2, 3, 4, 5]
product = reduce(lambda x, y: x * y, numbers)
print(product)  # 120
```

## When Lambdas Make Sense

```python
# ✅ Good: Simple operation for a sorting key
data.sort(key=lambda x: x["timestamp"])

# ✅ Good: Short callback or event handler
button.on_click(lambda: print("Clicked!"))

# ❌ Bad: Complex logic in a lambda
# Don't do this:
process = lambda x: x ** 2 if x > 0 else (abs(x) if x < 0 else 0)

# Do this instead:
def process(x):
    if x > 0:
        return x ** 2
    elif x < 0:
        return abs(x)
    return 0
```

## Limitations

- Can only contain **expressions**, not statements
- No `return`, `if/elif/else` (only ternary expressions), loops, or `try/except`
- No annotations/type hints
- Less readable for complex operations

## Best Practices

1. **Use lambdas for simple operations only** — one line, no side effects
2. **Prefer regular functions** for anything complex or reusable
3. **Use list comprehensions** instead of `map()`/`filter()` with lambdas when possible
4. **Don't assign lambdas to variables** — use `def` instead

## Practice Exercises

**Exercise 1:** Use a lambda with `sorted()` to sort a list of tuples by the second element.

**Exercise 2:** Use `map()` and a lambda to convert a list of Celsius temperatures to Fahrenheit.

**Exercise 3:** Use `filter()` and a lambda to extract all words longer than 5 characters from a list.
