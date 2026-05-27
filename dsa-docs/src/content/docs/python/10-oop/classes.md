---
title: Classes and Objects
description: Learn how to define classes, create objects, use constructors, and work with instance/class/static methods.
sidebar:
  order: 1
---

# Classes and Objects

## Introduction

A **class** is a blueprint for creating objects. An **object** is an instance of a class. Python is an object-oriented language — everything is an object!

<img src="/DSA-Notes-Problems/assets/python/oop-class-vs-object.svg" alt="Class vs Object Diagram" width="700" />

## Defining a Class

```python
class Dog:
    """A simple Dog class."""
    
    # Class attribute — shared by all instances
    species = "Canis familiaris"
    
    def __init__(self, name, age):
        """Constructor — called when creating a new Dog."""
        self.name = name  # Instance attribute
        self.age = age
    
    def bark(self):
        """Instance method."""
        return f"{self.name} says Woof!"

# Creating objects
my_dog = Dog("Max", 3)
your_dog = Dog("Bella", 5)

print(my_dog.name)          # Max
print(my_dog.bark())        # Max says Woof!
print(Dog.species)          # Canis familiaris
print(my_dog.species)       # Canis familiaris
```

## Constructor (`__init__`)

```python
class Person:
    def __init__(self, name, age, email=None):
        self.name = name
        self.age = age
        self.email = email
        self.created_at = datetime.now()
```

## Instance Methods

```python
class Counter:
    def __init__(self):
        self.count = 0
    
    def increment(self, amount=1):
        self.count += amount
    
    def decrement(self, amount=1):
        self.count -= amount
    
    def reset(self):
        self.count = 0

c = Counter()
c.increment(5)
c.increment(3)
print(c.count)  # 8
```

## Class Methods and Static Methods

```python
class Date:
    def __init__(self, year, month, day):
        self.year = year
        self.month = month
        self.day = day
    
    @classmethod
    def from_string(cls, date_string):
        """Alternative constructor — creates Date from 'YYYY-MM-DD'."""
        year, month, day = map(int, date_string.split('-'))
        return cls(year, month, day)
    
    @classmethod
    def today(cls):
        """Alternative constructor — creates Date for today."""
        from datetime import date
        today = date.today()
        return cls(today.year, today.month, today.day)
    
    @staticmethod
    def is_valid_date(year, month, day):
        """Utility method — checks if date is valid."""
        try:
            from datetime import date
            date(year, month, day)
            return True
        except ValueError:
            return False

d1 = Date(2024, 1, 15)
d2 = Date.from_string("2024-06-20")
d3 = Date.today()
print(Date.is_valid_date(2024, 2, 30))  # False
```

## Dunder Methods

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __str__(self):
        """String representation for users."""
        return f"({self.x}, {self.y})"
    
    def __repr__(self):
        """String representation for developers."""
        return f"Point({self.x!r}, {self.y!r})"
    
    def __eq__(self, other):
        return self.x == other.x and self.y == other.y
    
    def __add__(self, other):
        return Point(self.x + other.x, self.y + other.y)
    
    def __len__(self):
        return int((self.x ** 2 + self.y ** 2) ** 0.5)

p1 = Point(3, 4)
p2 = Point(3, 4)
print(p1)             # (3, 4)
print(repr(p1))       # Point(3, 4)
print(p1 == p2)       # True
print(p1 + Point(1, 2))  # (4, 6)
print(len(p1))        # 5
```

## Best Practices

1. **Use classes to model real-world entities** and behaviors
2. **Keep class focused** — single responsibility principle
3. **Use `@classmethod`** for alternative constructors
4. **Use `@staticmethod`** for utility functions related to the class
5. **Implement `__str__` and `__repr__`** for better debugging

## Practice Exercises

**Exercise 1:** Create a `BankAccount` class with deposit, withdraw, and balance methods.

**Exercise 2:** Create a `Library` class that manages a collection of `Book` objects.
