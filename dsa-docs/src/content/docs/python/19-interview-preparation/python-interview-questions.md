---
title: Python Interview Questions
description: Comprehensive Python interview questions covering basics to advanced concepts with answers and explanations.
sidebar:
  order: 1
---

# Python Interview Questions

## Introduction

Here are common Python interview questions categorized by difficulty and topic, with detailed explanations and examples.

## Basic Level

### Q1. What is the difference between a list and a tuple?

**Answer:** Lists are mutable (can be modified), while tuples are immutable (cannot be changed after creation). Lists use `[]` syntax, tuples use `()`.

```python
list_example = [1, 2, 3]
list_example[0] = 99  # ✅ OK

tuple_example = (1, 2, 3)
# tuple_example[0] = 99  # ❌ TypeError!
```

### Q2. Explain Python's dynamic typing.

**Answer:** Python determines variable types at runtime, not at compile time. A variable can hold different types at different points in execution.

```python
x = 10        # int
x = "hello"   # str — no error!
x = [1, 2, 3] # list
```

### Q3. What is the difference between `==` and `is`?

**Answer:** `==` checks value equality (same content), `is` checks identity (same object in memory).

```python
a = [1, 2, 3]
b = [1, 2, 3]
c = a

print(a == b)  # True (same values)
print(a is b)  # False (different objects)
print(a is c)  # True (same object)
```

## Intermediate Level

### Q4. What are decorators and how do they work?

**Answer:** Decorators are functions that modify the behavior of other functions. They wrap the original function with additional logic.

```python
def timer(func):
    def wrapper(*args, **kwargs):
        import time
        start = time.time()
        result = func(*args, **kwargs)
        print(f"Took {time.time() - start:.2f}s")
        return result
    return wrapper

@timer
def slow_function():
    import time
    time.sleep(1)
```

### Q5. Explain the GIL (Global Interpreter Lock).

**Answer:** The GIL is a mutex that allows only one thread to execute Python bytecode at a time. This makes Python threads unsuitable for CPU-bound tasks but fine for I/O-bound tasks. Use `multiprocessing` for CPU-intensive work.

### Q6. What is the difference between `__str__` and `__repr__`?

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __str__(self):
        return f"({self.x}, {self.y})"  # For users
    
    def __repr__(self):
        return f"Point({self.x!r}, {self.y!r})"  # For developers

p = Point(3, 4)
print(p)        # (3, 4) — __str__
repr(p)         # 'Point(3, 4)' — __repr__
```

### Q7. How does Python handle memory management?

**Answer:** Python uses reference counting (each object tracks how many references point to it) and a garbage collector (handles circular references). Objects are freed when their reference count reaches zero.

## Advanced Level

### Q8. Explain Python's MRO (Method Resolution Order).

**Answer:** MRO determines the order in which classes are searched when resolving a method. Python uses C3 linearization. Use `ClassName.__mro__` to see the order.

### Q9. What are metaclasses?

**Answer:** Metaclasses are classes of classes. They control how classes are created and behave. `type` is the default metaclass.

```python
class Singleton(type):
    _instances = {}
    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]

class Database(metaclass=Singleton):
    pass
```

### Q10. Explain context managers and the `with` statement.

**Answer:** Context managers handle setup/cleanup automatically. Implement `__enter__` and `__exit__` or use `@contextmanager`.

## Coding Problems

### Q11. Reverse a string in Python.

```python
# Method 1: Slicing
s[::-1]

# Method 2: reversed()
''.join(reversed(s))

# Method 3: Loop
result = ""
for char in s:
    result = char + result
```

### Q12. Find duplicates in a list.

```python
def find_duplicates(lst):
    seen = set()
    duplicates = set()
    for item in lst:
        if item in seen:
            duplicates.add(item)
        seen.add(item)
    return list(duplicates)
```

## Best Practices for Interviews

1. **Explain your thinking** before writing code
2. **Consider edge cases** — empty input, large input, invalid input
3. **Analyze time and space complexity** after writing
4. **Write clean, readable code** with meaningful variable names
5. **Test your solution** with sample inputs mentally
