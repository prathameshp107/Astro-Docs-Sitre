---
title: Math Module
description: Learn about Python's math module for advanced mathematical operations.
sidebar:
  order: 2
---

# Math Module

## Introduction

The `math` module provides access to mathematical functions and constants beyond the basic operators.

## Constants

```python
import math

print(math.pi)    # 3.141592653589793
print(math.e)     # 2.718281828459045
print(math.inf)   # inf
print(math.nan)   # nan
print(math.tau)   # 6.283185307179586 (2*pi)
```

## Basic Functions

```python
print(math.sqrt(16))       # 4.0
print(math.isqrt(17))      # 4 (integer sqrt, returns int)
print(math.factorial(5))   # 120
print(math.gcd(12, 8))     # 4
print(math.lcm(12, 8))     # 24 (Python 3.9+)
print(math.ceil(3.2))      # 4
print(math.floor(3.8))     # 3
print(math.trunc(-3.2))    # -3 (towards zero)
```

## Trigonometric Functions

```python
print(math.sin(math.pi / 2))     # 1.0
print(math.cos(0))                # 1.0
print(math.tan(math.pi / 4))     # ~1.0
print(math.degrees(math.pi))     # 180.0
print(math.radians(180))         # ~3.14159
```

## Logarithms and Exponentials

```python
print(math.exp(1))           # e^1 = 2.718...
print(math.log(math.e))      # 1.0 (natural log)
print(math.log(100, 10))     # 2.0 (log base 10)
print(math.log2(8))          # 3.0
print(math.log10(100))       # 2.0
```

## Rounding and Comparisons

```python
print(math.isclose(0.1 + 0.2, 0.3))  # True — safe float comparison
print(math.isfinite(42))             # True
print(math.isinf(float('inf')))      # True
print(math.isnan(float('nan')))      # True
```

## Why It Matters

The math module provides fast, reliable implementations of common mathematical operations that you'd otherwise have to implement yourself.

## Interview Questions

**Q1: How do you safely compare floats in Python?**

A: Use `math.isclose(a, b)` which accounts for floating-point precision, rather than `a == b`.

**Q2: What is the difference between `math.ceil()`, `math.floor()`, and `int()`?**

A: `ceil()` rounds up, `floor()` rounds down, `int()` truncates toward zero. For -3.5: ceil = -3, floor = -4, int = -3.

## Practice Exercises

1. Calculate the area of a circle given its radius.
2. Find the GCD and LCM of two numbers.
3. Compare two floats safely using `math.isclose()`.
