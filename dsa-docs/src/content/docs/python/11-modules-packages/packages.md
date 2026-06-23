---
title: "Packages in Python"
description: "How to organize Python code into packages — folders with __init__.py, importing from packages, and structuring larger projects."
sidebar:
  order: 2
---

# Packages in Python

## Simple Analogy 🗂️

If a **module** is a single file (a document), a **package** is a folder (a filing cabinet drawer) that holds multiple related documents and an index card (`__init__.py`) telling you what's inside.

---

## What is a Package?

A **package** is a directory containing modules and an `__init__.py` file:

```
myproject/
├── main.py
└── shapes/                   ← Package
    ├── __init__.py            ← Makes "shapes" a package
    ├── circle.py              ← Module
    ├── rectangle.py           ← Module
    └── triangle.py            ← Module
```

---

## The `__init__.py` File

The `__init__.py` file **makes a directory a Python package**. It runs when the package is imported and controls what gets exported.

```python
# shapes/__init__.py

# Import key classes/functions so users can do:
# from shapes import Circle  (instead of from shapes.circle import Circle)

from .circle import Circle
from .rectangle import Rectangle
from .triangle import Triangle

# Define what "from shapes import *" exports
__all__ = ["Circle", "Rectangle", "Triangle"]
```

```python
# User's code — clean imports
from shapes import Circle, Rectangle

c = Circle(5)
r = Rectangle(3, 4)
```

### Without __init__.py (Python 3.3+)

Python 3.3 introduced **namespace packages** — directories without `__init__.py` are still treated as packages, but they're "namespace" packages (used for splitting a package across multiple directories).

For normal packages, **always include an `__init__.py`**.

---

## Sub-packages

Packages can contain sub-packages:

```
myproject/
└── graphics/
    ├── __init__.py
    ├── shapes/
    │   ├── __init__.py
    │   ├── circle.py
    │   └── rectangle.py
    └── effects/
        ├── __init__.py
        ├── blur.py
        └── shadow.py
```

```python
# Importing from sub-packages
from graphics.shapes import Circle
from graphics.effects.blur import gaussian_blur
```

---

## Package Structure Best Practices

```python
# ❌ Flat structure — everything in one folder
# utils.py, helpers.py, constants.py

# ✅ Organized package
myproject/
├── __init__.py
├── config/
│   ├── __init__.py
│   ├── settings.py
│   └── constants.py
├── models/
│   ├── __init__.py
│   ├── user.py
│   └── product.py
└── services/
    ├── __init__.py
    ├── auth.py
    └── payments.py
```

---

## 🧠 In Simple Words

- A **package** = a folder with an `__init__.py` file
- **`__init__.py`** runs when the package is imported — use it to expose key names
- Sub-packages let you organize code hierarchically (e.g., `graphics.shapes.Circle`)
- Always include `__init__.py` for regular packages (even though Python 3.3+ doesn't require it)
- Good package structure keeps related code together and makes imports clean
