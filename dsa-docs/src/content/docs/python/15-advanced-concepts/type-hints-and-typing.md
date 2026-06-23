---
title: "Type Hints & the typing Module"
description: "How type hints work in Python — annotations, list[int], Optional, Union, Callable, and why they help your code."
sidebar:
  order: 3
---

# Type Hints & the typing Module

## Simple Analogy 🏷️

Imagine a mailbox labeled "Letters Only" — anyone who posts a package knows not to put it there. **Type hints** are like labels on your code that tell readers (and tools) what kind of data to expect.

---

## Why Type Hints?

Python is dynamically typed — variables can hold any type. Type hints add **optional** annotations that:

1. **Make code self-documenting** — you know what a function expects and returns
2. **Enable editor autocomplete** — VS Code, PyCharm suggest correct methods
3. **Catch bugs early** — `mypy` finds type errors before runtime
4. **Help teammates** — clear contracts for what functions do

---

## Basic Annotations

```python
# Variable annotations
name: str = "Alice"
age: int = 30
is_active: bool = True
pi: float = 3.14159

# Function annotations
def greet(name: str) -> str:
    return f"Hello, {name}!"
```

---

## Collections

```python
from typing import List, Dict, Tuple, Set

# Python 3.9+ — use built-ins directly
numbers: list[int] = [1, 2, 3]
user_map: dict[str, int] = {"Alice": 30, "Bob": 25}
coords: tuple[float, float] = (40.7128, -74.006)
unique: set[str] = {"apple", "banana"}

# Python 3.8 and below — use typing module
numbers: List[int] = [1, 2, 3]
user_map: Dict[str, int] = {"Alice": 30}
```

---

## Optional and Union

```python
from typing import Optional, Union

# Optional = the value can be None
def find_user(user_id: int) -> Optional[str]:
    """Returns None if user not found."""
    if user_id == 1:
        return "Alice"
    return None  # ✅ Allowed

# Union = multiple possible types
def process_value(value: Union[int, str]) -> str:
    if isinstance(value, int):
        return f"Number: {value}"
    return f"Text: {value}"

# Python 3.10+ shorthand
def process(value: int | str) -> str: ...
def find(user_id: int) -> str | None: ...
```

---

## Callable (Functions as Arguments)

```python
from typing import Callable

# A function that takes an int and returns a str
Formatter = Callable[[int], str]

def apply_formatter(value: int, formatter: Formatter) -> str:
    return formatter(value)

def format_as_currency(n: int) -> str:
    return f"${n:,}"

print(apply_formatter(1000, format_as_currency))  # $1,000
```

---

## Custom Types with TypeAlias

```python
from typing import TypeAlias

# Give a meaningful name to a complex type
UserId: TypeAlias = int
UserData: TypeAlias = dict[str, Union[str, int, list[str]]]

def get_user(user_id: UserId) -> UserData:
    return {"name": "Alice", "age": 30, "tags": ["admin"]}
```

---

## Running mypy

```bash
# Install
pip install mypy

# Check a file
mypy myfile.py

# Strict mode — catches more issues
mypy --strict myfile.py
```

```python
# mypy catches this:
def add(a: int, b: int) -> int:
    return a + b

add("hello", 5)  # ❌ mypy: Argument 1 has incompatible type "str"
```

---

## 🧠 In Simple Words

- **Type hints** are optional labels that describe what types a variable/function expects
- Use `list[int]`, `dict[str, int]` for collections (Python 3.9+)
- **`Optional[x]`** = the value can be `x` or `None`
- **`Union[x, y]`** = the value can be `x` or `y`
- **`Callable[[ArgType], ReturnType]`** = describes a function signature
- Run **`mypy`** to catch type errors before the code runs
