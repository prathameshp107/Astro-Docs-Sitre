---
title: Function Parameters and Arguments
description: Learn about positional, keyword, default, *args, **kwargs, and parameter ordering in Python functions.
sidebar:
  order: 2
---

# Function Parameters and Arguments

## Introduction

Python offers flexible ways to pass arguments to functions. Understanding parameter types is crucial for writing clean, maintainable code.

## Parameter Types

### Positional Arguments

```python
def describe_pet(name, species, age):
    print(f"{name} is a {age}-year-old {species}")

describe_pet("Max", "dog", 3)
```

### Keyword Arguments

```python
describe_pet(age=3, name="Max", species="dog")  # Order doesn't matter
```

### Default Parameters

```python
def greet(name, greeting="Hello", punctuation="!"):
    print(f"{greeting}, {name}{punctuation}")

greet("Alice")                    # Hello, Alice!
greet("Bob", "Hi")                # Hi, Bob!
greet("Charlie", "Hey", ".")      # Hey, Charlie.
```

> ⚠️ **Mutable Defaults Gotcha:** Default arguments are evaluated once at definition time!

```python
def bad_append(item, lst=[]):   # ❌ Same list used for all calls!
    lst.append(item)
    return lst

print(bad_append(1))  # [1]
print(bad_append(2))  # [1, 2] — not [2]!

def good_append(item, lst=None):  # ✅ Correct
    if lst is None:
        lst = []
    lst.append(item)
    return lst
```

### *args — Variable Positional Arguments

```python
def sum_all(*numbers):
    total = 0
    for n in numbers:
        total += n
    return total

print(sum_all(1, 2, 3, 4, 5))  # 15

# Useful for delegation
def log(tag, *messages):
    for msg in messages:
        print(f"[{tag}] {msg}")

log("INFO", "Server started", "Port: 8080", "Ready!")
```

### **kwargs — Variable Keyword Arguments

```python
def create_profile(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

create_profile(name="Alice", age=30, city="NYC")
# name: Alice
# age: 30
# city: NYC

# Useful for configuration
def connect(**kwargs):
    config = {
        "host": "localhost",
        "port": 5432,
        "user": "admin",
        **kwargs  # Override defaults
    }
    print(f"Connecting to {config['host']}:{config['port']}")

connect(port=8080, user="root")
```

### Parameter Ordering (PEP 457)

```python
def func(pos1, pos2, /, pos_or_kwd, *, kwd1, kwd2):
    pass

# / - positional-only parameters (before /)
# * - keyword-only parameters (after *)
# Between / and *: positional or keyword
```

```python
# Keyword-only (after *)
def safe_divide(a, b, *, round_result=False):
    result = a / b
    return round(result, 2) if round_result else result

safe_divide(10, 3)                     # 3.3333333...
safe_divide(10, 3, round_result=True)  # 3.33

# Positional-only (before /)
def greet(name, /, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Alice")           # ✅ OK
greet(name="Alice")      # ❌ TypeError!
```

## Unpacking Arguments

```python
# Unpack list/tuple with *
numbers = [1, 2, 3, 4, 5]
print(*numbers)  # 1 2 3 4 5

# Unpack dict with **
config = {"host": "localhost", "port": 8080}
connect(**config)  # Same as connect(host="localhost", port=8080)
```

## Best Practices

1. **Use keyword arguments** for optional parameters to make calls more readable
2. **Avoid mutable default arguments** — use `None` instead
3. **Use `*args` and `**kwargs` sparingly** — they make function signatures less explicit
4. **Limit number of parameters** — ideally under 5; use data classes for many parameters
5. **Use positional-only parameters** when parameter names have no semantic meaning

## Practice Exercises

**Exercise 1:** Write a function `create_url` that takes a base URL and optional query parameters via `**kwargs`.

**Exercise 2:** Create a function `flexible_avg` that accepts any number of numeric arguments and returns their average.
