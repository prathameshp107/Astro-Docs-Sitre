---
title: Polymorphism and Abstract Classes
description: Learn about polymorphism, abstract base classes (ABC), duck typing, and interfaces in Python.
sidebar:
  order: 4
---

# Polymorphism and Abstract Classes

## Introduction

**Polymorphism** means "many forms" — the ability to use a unified interface to work with objects of different types.

## Duck Typing

```python
# "If it walks like a duck and quacks like a duck, it's a duck"

def make_sound(animal):
    return animal.speak()  # Just call the method — no type checking!

class Dog:
    def speak(self):
        return "Woof!"

class Cat:
    def speak(self):
        return "Meow!"

class Car:
    def speak(self):
        return "Vroom!"

for obj in [Dog(), Cat(), Car()]:
    print(make_sound(obj))  # Works for all!
```

## Abstract Base Classes (ABC)

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self) -> float:
        """Calculate area — must be implemented by subclasses."""
        pass
    
    @abstractmethod
    def perimeter(self) -> float:
        pass
    
    def describe(self):
        return f"Area: {self.area():.2f}, Perimeter: {self.perimeter():.2f}"

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        return 3.14159 * self.radius ** 2
    
    def perimeter(self):
        return 2 * 3.14159 * self.radius

# shape = Shape()  # TypeError: Can't instantiate abstract class
circle = Circle(5)
print(circle.describe())  # Area: 78.54, Perimeter: 31.42
```

## Protocol Classes (Structural Subtyping)

```python
from typing import Protocol

class Drawable(Protocol):
    def draw(self) -> str: ...

class Circle:
    def draw(self):
        return "Drawing a circle"

class Square:
    def draw(self):
        return "Drawing a square"

def render(shape: Drawable):
    print(shape.draw())

render(Circle())  # OK — Circle implements draw()
render(Square())  # OK — Square implements draw()
```

## Best Practices

1. **Prefer duck typing for flexibility** — it's the Pythonic way
2. **Use ABCs** when you need to define a formal interface
3. **Use Protocols** when you need type hints without inheritance
4. **Don't over-abstract** — simple functions are often better than complex hierarchies

## Practice Exercises

**Exercise 1:** Create a `PaymentProcessor` ABC with `process_payment(amount)` and implement `CreditCardProcessor` and `PayPalProcessor`.

**Exercise 2:** Write a function that processes a list of objects that implement a `save()` method (duck typing).
