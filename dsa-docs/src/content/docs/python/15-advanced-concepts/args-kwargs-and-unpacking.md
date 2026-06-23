---
title: "*args, **kwargs & Unpacking"
description: "How to use *args, **kwargs, and the * / ** unpacking operators for flexible Python functions."
sidebar:
  order: 5
---

# *args, **kwargs & Unpacking

## Simple Analogy 🎒

**`*args`** = A bag that holds any number of items (positional arguments). You dump them in, and the function picks them up as a tuple.

**`**kwargs`** = A labeled filing cabinet for named items (keyword arguments). Each item has a label (key) and a value.

---

## *args — Variable Positional Arguments

`*args` lets a function accept **any number of positional arguments**.

```python
def sum_all(*args):
    """Sum any number of arguments."""
    return sum(args)

print(sum_all(1, 2))           # 3
print(sum_all(1, 2, 3, 4, 5)) # 15
print(sum_all())               # 0

# The name "args" is convention — you can use any name
def concatenate(*strings):
    return ", ".join(strings)

print(concatenate("a", "b", "c"))  # a, b, c
```

---

## **kwargs — Variable Keyword Arguments

`**kwargs` lets a function accept **any number of keyword arguments**.

```python
def create_profile(**kwargs):
    """Accept any set of profile fields."""
    for key, value in kwargs.items():
        print(f"{key}: {value}")

create_profile(name="Alice", age=30, city="Mumbai")
# name: Alice
# age: 30
# city: Mumbai
```

---

## Combining *args and **kwargs

The full function signature pattern:

```python
def flexible_function(a, b, *args, **kwargs):
    print(f"Positional: a={a}, b={b}")
    print(f"Extra positional (*args): {args}")
    print(f"Extra keyword (**kwargs): {kwargs}")

flexible_function(1, 2, 3, 4, 5, x=10, y=20)
# Positional: a=1, b=2
# Extra positional (*args): (3, 4, 5)
# Extra keyword (**kwargs): {'x': 10, 'y': 20}
```

---

## Unpacking — The `*` and `**` Operators

### List/Tuple Unpacking (`*`)

```python
# Unpack a list into individual arguments
numbers = [1, 2, 3, 4, 5]
print(*numbers)  # 1 2 3 4 5  — same as print(1, 2, 3, 4, 5)

# Merge lists
a = [1, 2, 3]
b = [4, 5, 6]
combined = [*a, *b]  # [1, 2, 3, 4, 5, 6]

# Unpack into function arguments
def multiply(x, y, z):
    return x * y * z

values = [2, 3, 4]
print(multiply(*values))  # 24 — same as multiply(2, 3, 4)
```

### Dict Unpacking (`**`)

```python
# Merge dictionaries
defaults = {"host": "localhost", "port": 8080}
overrides = {"port": 9090, "debug": True}

config = {**defaults, **overrides}
print(config)
# {'host': 'localhost', 'port': 9090, 'debug': True}
# Later keys override earlier ones!

# Unpack into function arguments
def connect(host, port, debug=False):
    print(f"Connecting to {host}:{port} (debug={debug})")

settings = {"host": "example.com", "port": 443, "debug": True}
connect(**settings)  # Connecting to example.com:443 (debug=True)
```

---

## Extended Unpacking

```python
# Capture remaining elements with *
first, *rest = [1, 2, 3, 4, 5]
print(first)  # 1
print(rest)   # [2, 3, 4, 5]

first, *middle, last = [1, 2, 3, 4, 5]
print(first)   # 1
print(middle)  # [2, 3, 4]
print(last)    # 5

# Works with any iterable
head, *tail = "Python"
print(head)  # 'P'
print(tail)  # ['y', 't', 'h', 'o', 'n']
```

---

## Real-World Pattern: Wrapper Functions

```python
def log_call(func):
    """Decorator that logs all function calls."""
    from functools import wraps
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__} with args={args}, kwargs={kwargs}")
        return func(*args, **kwargs)
    return wrapper

@log_call
def add(a, b):
    return a + b

add(3, 5)
# Calling add with args=(3, 5), kwargs={}

add(a=10, b=20)
# Calling add with args=(), kwargs={'a': 10, 'b': 20}
```

---

## 🧠 In Simple Words

- **`*args`** = captures extra positional arguments as a tuple
- **`**kwargs`** = captures extra keyword arguments as a dict
- Use `*args` and `**kwargs` to make functions **flexible** and write **wrapper/decorator** functions
- **`*list`** (unpacking) = spreads a list into individual arguments
- **`**dict`** (unpacking) = spreads a dict into keyword arguments
- Extended unpacking (`first, *rest = items`) is great for splitting iterables
