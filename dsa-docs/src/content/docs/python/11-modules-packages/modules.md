---
title: Modules and Packages
description: Learn how to organize Python code into modules and packages, import syntax, and `__init__.py`.
sidebar:
  order: 1
---

# Modules and Packages

## Introduction

A **module** is a `.py` file containing Python code. A **package** is a directory containing modules and an `__init__.py` file.

```mermaid
flowchart TB
    subgraph SysPath["sys.path (Module Search Path)"]
        direction LR
        CWD["1. Current Directory\n('')"]
        PYTHONPATH["2. PYTHONPATH\n(enviroment var)"]
        STDLIB["3. Standard Library\n(/usr/lib/python3.12/)"]
        SITEPKG["4. Site Packages\n(/usr/lib/.../site-packages/)"]
        CWD --> PYTHONPATH --> STDLIB --> SITEPKG
    end

    subgraph Resolution["Import Resolution"]
        direction TB
        REQ["import math"]
        CHECK["Check sys.modules\n(cache)"]
        FOUND["Found? 🔍"]
        CACHED["✅ Yes — use cached module"]
        NOT_FOUND["❌ No — search sys.path"]
        LOAD["Load .py file / package"]
        STORE["Store in sys.modules"]
        
        REQ --> CHECK --> FOUND
        FOUND -->|"yes"| CACHED
        FOUND -->|"no"| NOT_FOUND --> LOAD --> STORE
    end

    style SysPath fill:#1e40af,color:#fff
    style Resolution fill:#7c3aed,color:#fff
    style CWD fill:#2563eb,color:#fff
    style PYTHONPATH fill:#2563eb,color:#fff
    style STDLIB fill:#2563eb,color:#fff
    style SITEPKG fill:#2563eb,color:#fff
    style CHECK fill:#8b5cf6,color:#fff
    style FOUND fill:#d97706,color:#fff
    style CACHED fill:#059669,color:#fff
    style NOT_FOUND fill:#dc2626,color:#fff
    style LOAD fill:#8b5cf6,color:#fff
    style STORE fill:#059669,color:#fff
```

## Creating a Module

```python
# mymodule.py
def greet(name):
    return f"Hello, {name}!"

PI = 3.14159

class Calculator:
    @staticmethod
    def add(a, b):
        return a + b
```

## Importing Modules

```python
# Various import styles
import mymodule
print(mymodule.greet("Alice"))  # Hello, Alice!

from mymodule import greet, PI
print(greet("Bob"))  # Hello, Bob!

from mymodule import Calculator as Calc
print(Calc.add(3, 5))  # 8

from mymodule import *  # Not recommended!
```

## Module Search Path

```python
import sys
print(sys.path)
# ['', '/usr/lib/python312.zip', '/usr/lib/python3.12', ...]
```

## Packages

```python
# Directory structure:
# mypackage/
#     __init__.py
#     math_ops.py
#     string_ops.py

# mypackage/__init__.py
from .math_ops import add, subtract
from .string_ops import reverse, capitalize

# Usage
from mypackage import add, reverse
```

## `__name__` and `__main__`

```python
# mymodule.py
print(f"Module name: {__name__}")

if __name__ == "__main__":
    # Only runs when executed directly
    print("Running as script!")
    greet("World")
```

## Namespace Packages

```python
# Python 3.3+ — packages without __init__.py
# Allows splitting a package across multiple directories
```

## Best Practices

1. **Use explicit imports** — avoid `from module import *`
2. **Use meaningful module names** — `string_utils.py` not `str.py`
3. **Use relative imports** within packages (`from . import sibling`)
4. **Keep modules focused** — one responsibility per module
5. **Use `if __name__ == "__main__":`** for testable scripts

## Practice Exercises

**Exercise 1:** Create a `shapes` package with modules for `circle`, `rectangle`, and `triangle`.

**Exercise 2:** Create a utility package with modules for string manipulation, file operations, and math functions.
