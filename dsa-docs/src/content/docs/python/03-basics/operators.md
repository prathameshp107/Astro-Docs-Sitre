---
title: Operators in Python
description: Comprehensive guide to Python operators including arithmetic, comparison, logical, identity, and bitwise operators.
sidebar:
  order: 3
---

# Operators in Python

## Introduction

Operators are special symbols that perform operations on values and variables.

## Arithmetic Operators

```python
a, b = 17, 5

print(a + b)   # 22  — Addition
print(a - b)   # 12  — Subtraction
print(a * b)   # 85  — Multiplication
print(a / b)   # 3.4 — True Division (always float)
print(a // b)  # 3   — Floor Division
print(a % b)   # 2   — Modulus (remainder)
print(a ** b)  # 1419857 — Exponentiation
```

## Comparison Operators

```python
a, b = 10, 20
print(a == b)   # False
print(a != b)   # True
print(a > b)    # False
print(a < b)    # True
print(a >= b)   # False
print(a <= b)   # True

# Chaining
x = 15
print(10 < x < 20)  # True — Pythonic!
```

## Logical Operators

```python
print(True and True)   # True
print(True or False)   # True
print(not True)        # False

# Short-circuit evaluation
print(False and expensive_function())  # False — function never called!
```

## Identity Operators

```python
a = [1, 2, 3]
b = [1, 2, 3]
c = a

print(a == b)    # True — same value
print(a is b)    # False — different objects
print(a is c)    # True — same object
```

## Membership Operators

```python
fruits = ["apple", "banana", "cherry"]
print("banana" in fruits)     # True
print("mango" not in fruits)  # True
```

## Bitwise Operators

```python
a = 0b1010  # 10
b = 0b1100  # 12

print(a & b)   # 8  — AND
print(a | b)   # 14 — OR
print(a ^ b)   # 6  — XOR
print(~a)      # -11 — NOT
print(a << 1)  # 20 — Left shift
print(a >> 1)  # 5  — Right shift
```

## Operator Precedence

| Priority | Operator |
|----------|---------|
| 1 | `()` |
| 2 | `**` |
| 3 | `*`, `/`, `//`, `%` |
| 4 | `+`, `-` |
| 5 | Comparisons (`==`, `<`, `>`, `in`, `is`) |
| 6 | `not` |
| 7 | `and` |
| 8 | `or` |

## Walrus Operator (`:=`) — Python 3.8+

```python
data = [1, 2, 3, 4, 5]
if (n := len(data)) > 3:
    print(f"List has {n} elements")
```

## Why It Matters

Operators are the building blocks of all program logic. Understanding precedence and short-circuit evaluation prevents subtle bugs.

## Common Mistakes

- Using `=` instead of `==` in comparisons
- Using `is` for value comparison (use `==` instead!)
- Not understanding short-circuit evaluation

## Interview Questions

**Q1: What's the difference between `is` and `==`?**

A: `==` compares values; `is` checks object identity (same memory location).

**Q2: What is short-circuit evaluation?**

A: Python's `and`/`or` operators stop evaluating once the result is determined. `False and x` → x never evaluated.

## Practice Exercises

1. Check if a number is divisible by both 3 and 7.
2. Use bitwise operators to check if a number is even.
3. Demonstrate short-circuit evaluation.
