---
title: Numbers in Python
description: Learn about integers, floats, complex numbers, booleans, Decimal, and Fractions in Python.
sidebar:
  order: 1
---

# Numbers in Python

## Introduction

Python provides several numeric types: integers (with unlimited precision), floats (IEEE 754 double-precision), complex numbers, booleans, and more through the standard library.

## Integers (int)

```python
x = 42
y = -100

# Arbitrary precision!
big = 2 ** 1000  # 302-digit number — no overflow!

# Different bases
binary  = 0b1010      # Binary → 10
octal   = 0o17        # Octal → 15
hex_num = 0xFF        # Hex → 255

# Readable large numbers
million = 1_000_000

# Operations
print(abs(-42))      # 42
print(pow(2, 10, 1000))  # 24 — modular exponentiation
```

## Floats

```python
pi = 3.14159
large = 1.5e10      # Scientific notation

# Special values
import math
print(float('inf'))    # inf (infinity)
print(float('nan'))    # nan (Not a Number)
```

## Complex Numbers

```python
c1 = 2 + 3j
print(c1.real)       # 2.0
print(c1.imag)       # 3.0
print(c1.conjugate()) # (2-3j)
```

## Booleans (bool)

```python
print(True)      # True
print(False)     # False
print(isinstance(True, int))   # True! bool is subclass of int
print(True + True)             # 2
```

## Decimal & Fractions

```python
from decimal import Decimal, getcontext

# Exact decimal arithmetic
a = Decimal("0.1")
b = Decimal("0.2")
print(a + b)  # 0.3 — exact!

from fractions import Fraction
a = Fraction(1, 3)
b = Fraction(1, 6)
print(a + b)  # 1/2 (exact!)
```

## Why It Matters

Choosing the right numeric type is critical for accuracy (financial calculations need Decimal) and performance (float for scientific computing).

## Common Mistakes

- Using float for financial calculations (use Decimal!)
- Expecting exact float arithmetic (`0.1 + 0.2 = 0.30000000000000004`)

## Interview Questions

**Q1: Why does `0.1 + 0.2` not equal `0.3`?**

A: Binary can't represent 0.1 exactly (repeating fraction). Use Decimal for exact decimal arithmetic.

**Q2: What is arbitrary precision in Python integers?**

A: Python 3 integers can be arbitrarily large, limited only by available memory. No overflow errors like in C/Java.

## Practice Exercises

1. Calculate compound interest using Decimal for accuracy.
2. Compare float vs Decimal for 0.1 + 0.2.
3. Convert between binary, octal, hex, and decimal.
