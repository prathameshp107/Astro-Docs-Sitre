---
title: Unicode and String Performance
description: Understand Unicode handling, encoding/decoding, and string performance optimization in Python.
sidebar:
  order: 3
---

# Unicode and String Performance

## Introduction

Python 3 strings are Unicode by default. Understanding encoding and decoding is essential for working with files, networks, and APIs.

## Unicode Basics

```python
# Every character has a Unicode code point
print(ord('A'))        # 65
print(ord('中'))       # 20013
print(ord('😀'))       # 128512

# Get character from code point
print(chr(65))         # 'A'
print(chr(128512))     # '😀'

# Python 3 strings ARE Unicode
s = "Hello 世界 🌍"
print(len(s))          # 10 (counts characters!)
```

## Encoding: String → Bytes

```python
text = "Hello, 世界!"

# UTF-8 (most common)
utf8_bytes = text.encode("utf-8")
print(utf8_bytes)       # b'Hello, \xe4\xb8\x96\xe7\x95\x8c!'
print(type(utf8_bytes)) # <class 'bytes'>

# Handle encoding errors
text.encode("ascii", errors="ignore")    # Skip non-ASCII
text.encode("ascii", errors="replace")   # Replace with ?
```

## Decoding: Bytes → String

```python
data = b"Hello, World!"
text = data.decode("utf-8")
```

## String Performance Tips

### Avoid Concatenation in Loops ❌

```python
# BAD — creates new string each time
result = ""
for i in range(10000):
    result += str(i) + ", "

# GOOD — uses join()
result = ", ".join(str(i) for i in range(10000))
```

### String Interning

```python
import sys

# Python interns short strings automatically
a = "hello"
b = "hello"
print(a is b)   # True

# Force interning for longer strings
x = sys.intern("a long string")
y = sys.intern("a long string")
print(x is y)   # True
```

## Why It Matters

Proper Unicode handling prevents data corruption, encoding errors, and security vulnerabilities. Performance optimization prevents memory issues with large text processing.

## Interview Questions

**Q1: What's the difference between encoding and decoding?**

A: Encoding converts string → bytes using a format (UTF-8, ASCII). Decoding converts bytes → string.

**Q2: Why is `"".join(list)` faster than `+=` in a loop?**

A: String concatenation creates a new string each iteration (O(n²)). `join()` pre-calculates total length, allocates once, and copies all parts (O(n)).

## Practice Exercises

1. Encode a string in UTF-8, print byte length, then decode it back.
2. Compare `join()` vs `+=` with timeit for 10,000 iterations.
3. Research the `chardet` library for auto-detecting encodings.
