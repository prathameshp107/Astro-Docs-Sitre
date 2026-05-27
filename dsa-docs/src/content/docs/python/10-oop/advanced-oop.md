---
title: Advanced OOP Topics
description: Explore dataclasses, composition vs inheritance, descriptors, slots, and mixins in Python.
sidebar:
  order: 5
---

# Advanced OOP Topics

## Dataclasses

```python
from dataclasses import dataclass, field

@dataclass
class Person:
    name: str
    age: int
    email: str = ""
    tags: list[str] = field(default_factory=list)
    
    @property
    def is_adult(self):
        return self.age >= 18

p1 = Person("Alice", 30)
p2 = Person("Alice", 30)
print(p1 == p2)  # True (auto-generated __eq__)
print(p1)        # Person(name='Alice', age=30, email='', tags=[])
```

### Frozen (Immutable) Dataclasses

```python
@dataclass(frozen=True)
class Point:
    x: float
    y: float

p = Point(3, 4)
# p.x = 5  # FrozenInstanceError!
```

## Composition vs Inheritance

```python
# ❌ Inheritance (is-a)
class Engine:
    def start(self): return "Engine started"

class Car(Engine):  # A Car IS AN Engine? No!
    pass

# ✅ Composition (has-a)
class Car:
    def __init__(self):
        self.engine = Engine()  # A Car HAS AN Engine
    
    def start(self):
        return self.engine.start()
```

## Descriptors

```python
class PositiveNumber:
    def __set_name__(self, owner, name):
        self.name = f"_{name}"
    
    def __get__(self, obj, objtype=None):
        return getattr(obj, self.name, 0)
    
    def __set__(self, obj, value):
        if value < 0:
            raise ValueError("Must be positive")
        setattr(obj, self.name, value)

class Product:
    price = PositiveNumber()
    quantity = PositiveNumber()
    
    def __init__(self, price, quantity):
        self.price = price
        self.quantity = quantity

p = Product(10, 5)
# p.price = -5  # ValueError!
```

## Mixins

```python
class LogMixin:
    def log(self, message):
        print(f"[{self.__class__.__name__}] {message}")

class JSONMixin:
    def to_json(self):
        import json
        return json.dumps(self.__dict__)

class User(LogMixin, JSONMixin):
    def __init__(self, name, email):
        self.name = name
        self.email = email
        self.log(f"Created user: {name}")

user = User("Alice", "alice@example.com")
print(user.to_json())
```

## Slots (Memory Optimization)

```python
class Point:
    __slots__ = ('x', 'y')  # Limits attributes, saves memory
    
    def __init__(self, x, y):
        self.x = x
        self.y = y

p = Point(3, 4)
# p.z = 5  # AttributeError!
```

## Best Practices

1. **Use dataclasses** for data containers instead of manual `__init__`
2. **Prefer composition** over inheritance for code reuse
3. **Use mixins for cross-cutting concerns** like logging, serialization
4. **Use `__slots__`** only when you need to optimize memory (thousands of instances)

## Practice Exercises

**Exercise 1:** Refactor a class hierarchy into composition-based design.

**Exercise 2:** Create a `TimestampsMixin` that adds `created_at` and `updated_at` fields with auto-updating behavior.
