---
title: Python REPL
description: Learn how to use Python's interactive shell for experimentation and debugging.
sidebar:
  order: 2
---

# Python REPL

## Introduction

**REPL = Read → Evaluate → Print → Loop**

It's an interactive shell where you type Python code and see results immediately.

## Starting the REPL

```bash
python3          # Linux/macOS
python           # Windows
```

You'll see:
```
Python 3.12.0 (main, ...)
Type "help", "copyright", "credits" or "license" for more information.
>>>
```

## REPL Examples

```python
>>> 2 + 3
5
>>> name = "Alice"
>>> f"Hello, {name}!"
'Hello, Alice!'
>>> [x**2 for x in range(5)]
[0, 1, 4, 9, 16]
>>> import math
>>> math.pi
3.141592653589793
```

## Special Commands

```python
>>> help(str)           # Get help for str class
>>> dir(str)            # List all methods of str
>>> type(42)            # Check type
<class 'int'>
>>> _                   # Last result
>>> quit() or exit()    # Exit REPL
```

## IPython: Enhanced REPL

```bash
pip install ipython
ipython
```

Features: tab completion, syntax highlighting, magic commands, better errors.

```python
In [1]: %timeit [x**2 for x in range(1000)]
# 78.8 µs ± 1.42 µs per loop
```

## Why It Matters

The REPL is perfect for experimenting, testing snippets, learning, and debugging.

## Practice Exercises

1. Use the REPL to calculate compound interest for a $10,000 investment at 7% for 10 years.
2. Explore the `math` module using `dir(math)` and `help(math.sqrt)`.
3. Install IPython and use `%timeit` to compare two different approaches to a problem.
