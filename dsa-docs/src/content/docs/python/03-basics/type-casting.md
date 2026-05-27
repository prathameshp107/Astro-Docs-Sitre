---
title: Type Casting and Conversion
description: Learn implicit and explicit type conversion in Python, including common pitfalls.
sidebar:
  order: 4
---

# Type Casting and Conversion

## Introduction

Type conversion is the process of converting a value from one data type to another. Python supports both implicit (automatic) and explicit (manual) conversion.

## Implicit Conversion

Python automatically converts types when it makes sense:

```python
x = 5        # int
y = 2.0      # float
result = x + y  # Python converts x to float
print(result)    # 7.0 (float)

# bool + int
print(True + 5)   # 6 (True is treated as 1)
```

## Explicit Conversion

### To Integer `int()`

```python
int("42")         # 42
int(3.9)          # 3 (truncates!)
int(True)         # 1
int("0xFF", 16)   # 255 (hex to int)
```

### To Float `float()`

```python
float("3.14")     # 3.14
float(42)         # 42.0
float("inf")      # inf
```

### To String `str()`

```python
str(42)           # '42'
str(3.14)         # '3.14'
str([1,2,3])      # '[1, 2, 3]'
```

### To Boolean `bool()`

```python
bool(0)           # False
bool(1)           # True
bool("")          # False (empty string)
bool("hello")     # True
bool([])          # False (empty list)
bool(None)        # False
```

### To List/Tuple/Set

```python
list("hello")     # ['h', 'e', 'l', 'l', 'o']
tuple([1,2,3])    # (1, 2, 3)
set([1,1,2,3,3])  # {1, 2, 3} — removes duplicates
```

## Common Errors

```python
int("hello")     # ValueError: invalid literal
int("3.14")      # ValueError: can't convert float string directly
# Fix:
int(float("3.14"))  # First convert to float, then int → 3
```

## Why It Matters

Type casting is essential when handling user input (`input()` returns str), processing data from files/APIs, and ensuring correct arithmetic.

## Interview Questions

**Q1: What is the difference between implicit and explicit type conversion?**

A: Implicit conversion is automatic (e.g., `int + float` → float). Explicit requires a casting function like `int()`, `float()`, `str()`.

**Q2: What values are considered falsy in Python?**

A: `False`, `None`, `0`, `0.0`, `""`, `[]`, `()`, `{}`, `set()` — all evaluate to False in boolean context.

## Practice Exercises

1. Convert a float string "3.14" to an integer.
2. Check all falsy values using `bool()`.
3. Parse user input and perform arithmetic with type conversion.
