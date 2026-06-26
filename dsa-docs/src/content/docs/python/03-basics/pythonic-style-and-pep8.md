---
title: "Pythonic Style & PEP 8"
description: "How to write clean, readable Python code — naming conventions, code layout, and the Zen of Python."
sidebar:
  order: 6
---

# Pythonic Style & PEP 8

## Simple Analogy 🏠

Think of writing code like organizing a kitchen. If every chef follows the same rules (knives here, spices there, pots below), anyone can walk in and cook. **PEP 8** is the rulebook for making Python code consistent and readable across the entire community.

---

## The Zen of Python

Type `import this` in a Python REPL. It reveals the guiding principles:

```
Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Flat is better than nested.
Readability counts.
```

---

## PEP 8 — Python's Style Guide

### Naming Conventions

| What | Convention | Example |
|------|-----------|---------|
| Variables / functions | `snake_case` | `user_name`, `calculate_total()` |
| Constants | `UPPER_SNAKE_CASE` | `MAX_SIZE`, `DEFAULT_TIMEOUT` |
| Classes | `PascalCase` | `UserAccount`, `HttpClient` |
| Private (by convention) | `_leading_underscore` | `_internal_helper()` |
| Dunder (magic methods) | `__double_underscore__` | `__init__`, `__str__` |

### Code Layout

```python
# ✅ GOOD — Follows PEP 8

# Two blank lines between top-level definitions
def function_one():
    pass


def function_two():
    pass


class MyClass:
    # One blank line between methods
    def method_one(self):
        pass

    def method_two(self):
        pass
```

### Line Length

```python
# Keep lines under 79 characters for code, 72 for docstrings

# ✅ GOOD — break long lines
total = (price * quantity
         + tax
         - discount)

# ❌ BAD — too long
total = price * quantity + tax - discount + shipping
```

### Imports — Order Matters

```python
# ✅ GOOD — three groups, separated by blank lines
# 1. Standard library
import os
import sys
from datetime import datetime

# 2. Third-party packages
import requests
import pandas as pd

# 3. Local application modules
from mypackage import mymodule
```

---

## Pythonic Idioms

```python
# Swap variables — no temp variable needed!
a, b = b, a

# Check if a list is empty
if not items:          # ✅ Pythonic
if len(items) == 0:    # ❌ Unnecessary

# Loop with index
for i, item in enumerate(items):
    print(i, item)

# Combine conditions
if 0 < x < 10:          # ✅ Pythonic
if x > 0 and x < 10:    # ❌ Overly verbose

# Default values
def greet(name="Guest"):     # ✅ Pythonic
def greet(name=None):
    if name is None:
        name = "Guest"       # ❌ Unnecessary

# File handling
with open("file.txt") as f:  # ✅ Pythonic — auto-closes
    content = f.read()

f = open("file.txt")         # ❌ Must remember to close
content = f.read()
f.close()

# String joining
result = ", ".join(items)            # ✅ Pythonic
result = items[0] + ", " + items[1]  # ❌ Painful
```

---

## Linters and Formatters

| Tool | What It Does | Example |
|------|-------------|---------|
| **black** | Auto-formats code (opinionated) | `black myfile.py` |
| **ruff** | Fast linter + formatter (replaces flake8, isort) | `ruff check .` |
| **mypy** | Static type checker | `mypy myfile.py` |
| **pylint** | Analyzes code for errors + style | `pylint myfile.py` |

```bash
# Install
pip install black ruff mypy

# Format your code automatically
black myfile.py

# Check for issues
ruff check myfile.py
```

---

## 🧠 In Simple Words

- **PEP 8** is Python's official style guide — follow it so your code looks like everyone else's
- Use **`snake_case`** for variables/functions, **`PascalCase`** for classes
- Keep lines **under 79 characters**, use **meaningful names**, organize imports properly
- Write **Pythonic code** — use idioms like `enumerate()`, `with` statements, `if not list`
- Use **linters** (ruff, black) to automatically enforce style — no memorizing needed
