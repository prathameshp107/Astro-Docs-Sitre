---
title: "Dataclasses & Enums"
description: "How @dataclass and Enum reduce boilerplate and make your Python code cleaner."
sidebar:
  order: 4
---

# Dataclasses & Enums

## Simple Analogy 🏗️

**Dataclasses** = A prefab house — you describe the rooms (fields), and the walls, doors, and plumbing (`__init__`, `__repr__`, `__eq__`) are built automatically.

**Enums** = A dropdown menu — instead of typing `"admin"`, `"user"`, `"guest"` as strings, you pick from a fixed set of named options.

---

## Dataclasses — Less Boilerplate

### Before dataclasses (lots of boilerplate):

```python
class Person:
    def __init__(self, name: str, age: int, email: str):
        self.name = name
        self.age = age
        self.email = email

    def __repr__(self):
        return f"Person(name={self.name!r}, age={self.age!r}, email={self.email!r})"

    def __eq__(self, other):
        if not isinstance(other, Person):
            return NotImplemented
        return (self.name, self.age, self.email) == (other.name, other.age, other.email)

p1 = Person("Alice", 30, "alice@example.com")
p2 = Person("Alice", 30, "alice@example.com")
print(p1)           # Person(name='Alice', age=30, email='alice@example.com')
print(p1 == p2)     # True
```

### After dataclasses (much cleaner):

```python
from dataclasses import dataclass

@dataclass
class Person:
    name: str
    age: int
    email: str

# __init__, __repr__, __eq__ are auto-generated!

p1 = Person("Alice", 30, "alice@example.com")
p2 = Person("Alice", 30, "alice@example.com")
print(p1)           # Person(name='Alice', age=30, email='alice@example.com')
print(p1 == p2)     # True
```

### More Dataclass Features

```python
from dataclasses import dataclass, field

@dataclass
class Config:
    host: str = "localhost"          # Default value
    port: int = 8080                 # Default
    debug: bool = field(default=False, repr=False)  # Hide from __repr__
    tags: list[str] = field(default_factory=list)   # Mutable defaults need factory

    def __post_init__(self):
        """Called right after __init__ — great for validation."""
        if self.port < 0 or self.port > 65535:
            raise ValueError(f"Invalid port: {self.port}")

# Frozen (immutable) dataclass
@dataclass(frozen=True)
class Point:
    x: float
    y: float

p = Point(3, 4)
# p.x = 5  # ❌ FrozenInstanceError: cannot assign to field 'x'

# Orderable dataclass
@dataclass(order=True)
class Score:
    value: int
    name: str = field(compare=False)  # Don't use name in comparisons
```

---

## Enums — Named Constants

```python
from enum import Enum, auto

class Color(Enum):
    RED = "red"
    GREEN = "green"
    BLUE = "blue"

class HttpStatus(Enum):
    OK = 200
    NOT_FOUND = 404
    INTERNAL_ERROR = 500

class Weekday(Enum):
    MONDAY = auto()    # auto() assigns 1, 2, 3...
    TUESDAY = auto()
    WEDNESDAY = auto()

# Usage
print(Color.RED)           # Color.RED
print(Color.RED.value)     # 'red'
print(Color.RED.name)      # 'RED'
print(list(Color))         # [Color.RED, Color.GREEN, Color.BLUE]
```

### Why Use Enums?

```python
# ❌ Without enum — magic strings, easy to typo
def set_role(role: str):
    if role == "admn":    # Typo! Won't catch until runtime
        ...

set_role("admn")

# ✅ With enum — autocomplete, type-safe, no typos
from enum import Enum

class Role(Enum):
    ADMIN = "admin"
    USER = "user"
    GUEST = "guest"

def set_role(role: Role):
    ...

set_role(Role.ADMIN)     # ✅ Correct
set_role("admn")          # ❌ mypy catches this!
```

---

## Dataclass + Enum Together

```python
from dataclasses import dataclass
from enum import Enum, auto

class Priority(Enum):
    LOW = auto()
    MEDIUM = auto()
    HIGH = auto()
    CRITICAL = auto()

@dataclass
class Task:
    title: str
    priority: Priority = Priority.MEDIUM
    completed: bool = False

task = Task("Fix login bug", Priority.HIGH)
print(task)  # Task(title='Fix login bug', priority=Priority.HIGH, completed=False)
```

---

## 🧠 In Simple Words

- **`@dataclass`** auto-generates `__init__`, `__repr__`, `__eq__` — write less boilerplate
- Use **`frozen=True`** for immutable objects, **`order=True`** for sortable objects
- Use **`field(default_factory=list)`** for mutable defaults (list, dict, set)
- **Enums** give you a fixed set of named constants — safer than strings
- Enums integrate with **mypy** and editors for autocomplete and type-checking
