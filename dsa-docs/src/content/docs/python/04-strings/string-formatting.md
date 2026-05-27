---
title: String Formatting
description: Learn all three ways to format strings in Python with f-strings, .format(), and % formatting.
sidebar:
  order: 2
---

# String Formatting

## Introduction

Python offers three ways to format strings. **f-strings (Python 3.6+)** are the preferred approach.

## f-strings (Preferred ✅)

```python
name = "Alice"
age = 30
score = 98.765

# Basic
print(f"Name: {name}, Age: {age}")

# Expressions
print(f"In 10 years: {age + 10}")
print(f"Upper: {name.upper()}")

# Format specs
print(f"Score: {score:.2f}")       # 98.77
print(f"Score: {score:10.2f}")     # Right-aligned
print(f"Millions: {1_000_000:,}")  # 1,000,000

# Debugging (Python 3.8+)
x = 42
print(f"{x=}")     # x=42
```

## `.format()` Method (Python 3.0+)

```python
name = "Alice"
age = 30

print("Name: {}, Age: {}".format(name, age))
print("{0} is {1} years old".format(name, age))
print("{name} is {age} years old".format(name="Bob", age=25))

print("{:b}".format(255))          # 11111111 (binary)
print("{:x}".format(255))          # ff (hex)
print("{:e}".format(0.001234))     # 1.234000e-03
```

## `%` Formatting (Old Style)

```python
name = "Alice"
age = 30
score = 98.765

print("Name: %s, Age: %d, Score: %.2f" % (name, age, score))
```

## Format Specification Mini-Language

```python
# [[fill]align][sign][width][.precision][type]

print(f"{'hi':*^10}")    # '****hi****'
print(f"{42:+}")         # '+42'
print(f"{3.14159:.3f}")  # '3.142'
print(f"{255:b}")        # '11111111'
print(f"{1000000:,}")   # '1,000,000'
```

## Why It Matters

Proper string formatting is essential for creating readable logs, user-facing messages, and data reports.

## Interview Questions

**Q1: Why are f-strings preferred over `.format()` and `%` formatting?**

A: f-strings are more readable (inline expressions), faster (compile-time evaluation), and support any Python expression inside `{}`.

**Q2: How do you round a float to 2 decimal places in an f-string?**

A: `f"{value:.2f}"` — the `.2f` format specifier rounds to 2 decimal places.

## Practice Exercises

1. Format a number as currency with commas and 2 decimal places.
2. Create a formatted table of student names and scores.
3. Use f-string debugging to print variable names and values.
