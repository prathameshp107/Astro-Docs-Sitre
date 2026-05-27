---
title: Variables and Data Types
description: Learn about Python variables, naming conventions, data types, and dynamic typing.
sidebar:
  order: 2
---

# Variables and Data Types

## Introduction

A variable is a **named reference to a value stored in memory**. Python variables are labels/pointers attached to objects, not containers.

## Variables

```python
# Simple assignment
x = 10
name = "Alice"
pi = 3.14159

# Multiple assignment
a = b = c = 0
x, y = 10, 20

# Swap variables (Pythonic!)
x, y = y, x

# Extended unpacking
first, *rest = [1, 2, 3, 4, 5]
print(first)   # 1
print(rest)    # [2, 3, 4, 5]
```

## Naming Conventions (PEP 8)

| Type | Convention | Example |
|------|-----------|---------|
| Variables | `snake_case` | `user_name` |
| Constants | `UPPER_SNAKE_CASE` | `MAX_SIZE` |
| Classes | `PascalCase` | `UserAccount` |
| Functions | `snake_case` | `calculate_tax()` |

## Data Types Overview

```python
x = 42           # int
y = 3.14         # float
s = "hello"      # str
lst = [1, 2, 3]  # list
t = (1, 2, 3)    # tuple
d = {"key": "value"}  # dict
st = {1, 2, 3}    # set
flag = True      # bool
nothing = None   # NoneType
```

## Dynamic Typing

```python
x = 5            # int
x = "hello"      # now str
x = [1, 2, 3]   # now list
```

## Type Checking

```python
# Preferred: isinstance()
print(isinstance(x, int))          # True
print(isinstance(x, (int, float))) # True — multiple types
```

## Why It Matters

Understanding Python's reference model and dynamic typing is fundamental to writing correct code and avoiding bugs.

## Common Mistakes

- Confusing `=` (assignment) with `==` (comparison)
- Not understanding that variables reference objects
- Thinking variables are boxes (they're labels!)

## Interview Questions

**Q1: What is dynamic typing in Python?**

A: Variable types are determined at runtime. A variable can reference any type of object, and you can change it at any time.

**Q2: Why does `a = [1,2,3]; b = a; b.append(4)` modify `a`?**

A: Because `b` and `a` reference the same list object. Variables are labels, not containers.

## Practice Exercises

1. Swap two variables without using a third variable.
2. Check the type of different values using `type()` and `isinstance()`.
3. Demonstrate Python's reference model with lists.
