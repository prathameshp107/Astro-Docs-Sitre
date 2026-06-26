---
title: "Descriptors & Metaclasses"
description: "A conceptual introduction to Python's descriptor protocol and metaclasses — the deep magic behind properties, @staticmethod, and class creation."
sidebar:
  order: 6
---

# Descriptors & Metaclasses

## Simple Analogy 🪄

**Descriptors** = A smart door that automatically does something when someone walks through (like `@property`, which runs code when you access an attribute).

**Metaclasses** = A factory that builds classes instead of objects. If a class is a blueprint for objects, a metaclass is a blueprint for classes.

> ⚠️ **These are advanced topics.** You'll rarely use them in daily coding, but understanding them helps you appreciate how Python works under the hood.

---

## Descriptors

A **descriptor** is any object that implements `__get__()`, `__set__()`, or `__delete__()`. It controls what happens when an attribute is accessed on a class.

### `@property` — The Most Common Descriptor

```python
class Temperature:
    def __init__(self, celsius):
        self._celsius = celsius

    @property
    def fahrenheit(self):
        """Automatically called when you access temp.fahrenheit."""
        return (self._celsius * 9 / 5) + 32

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Temperature below absolute zero!")
        self._celsius = value

temp = Temperature(25)
print(temp.fahrenheit)  # 77.0 (computed on access)
temp.celsius = 30
print(temp.fahrenheit)  # 86.0
```

### How @staticmethod and @classmethod Work

```python
class Demo:
    @staticmethod
    def static_method():
        """Descriptor that doesn't pass self or cls."""
        return "No self or cls"

    @classmethod
    def class_method(cls):
        """Descriptor that passes the class instead of instance."""
        return f"Called on {cls.__name__}"
```

These decorators work because they're **descriptor objects** that intercept attribute access.

---

## Metaclasses

A **metaclass** is the class of a class. Just as an object is an instance of a class, a class is an instance of a metaclass.

```python
# The default metaclass is `type`
# Every class is created by type

class MyClass:
    pass

print(type(42))       # <class 'int'>
print(type(MyClass))  # <class 'type'>
```

### Creating a Simple Metaclass

```python
class UppercaseAttributes(type):
    """Metaclass that makes all attribute names uppercase."""

    def __new__(cls, name, bases, namespace):
        # Transform all attribute names to uppercase
        uppercase_ns = {
            key.upper() if not key.startswith("__") else key: value
            for key, value in namespace.items()
        }
        return super().__new__(cls, name, bases, uppercase_ns)

class MyClass(metaclass=UppercaseAttributes):
    name = "Alice"
    age = 30

obj = MyClass()
print(obj.NAME)     # "Alice" (auto-uppercased)
print(obj.AGE)      # 30
# print(obj.name)   # AttributeError!
```

### Practical Metaclass: Singleton

```python
class Singleton(type):
    """Metaclass that ensures only one instance exists."""
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]

class Database(metaclass=Singleton):
    def __init__(self):
        print("Connecting to database...")

db1 = Database()   # "Connecting to database..."
db2 = Database()   # Nothing printed — same instance!
print(db1 is db2)  # True
```

---

## When Would You Use These?

| Pattern | Frequency | Use Case |
|---------|-----------|----------|
| `@property` | ⭐⭐⭐⭐⭐ | Every day — computed attributes, validation |
| Descriptors | ⭐⭐ | Creating reusable property-like behaviors |
| Metaclasses | ⭐ | ORMs (SQLAlchemy), frameworks, rarely in app code |

---

## 🧠 In Simple Words

- **Descriptors** control what happens when you access/set an attribute — `@property` is the most common example
- **`@property`** lets you run code when an attribute is read (computed values, validation)
- **Metaclasses** are "class factories" — they control how classes are created
- You use `@property` **every day**; you'll likely **never write a metaclass** in normal app code
- Understanding these concepts helps demystify Python's "magic" — it's just protocols and conventions
