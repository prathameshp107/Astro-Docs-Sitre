---
title: Inheritance in Python
description: Learn how to create class hierarchies, method overriding, super(), and multiple inheritance in Python.
sidebar:
  order: 3
---

# Inheritance

## Introduction

**Inheritance** allows a class to inherit attributes and methods from another class, enabling code reuse and establishing hierarchical relationships.

### Class Inheritance + MRO

```mermaid
flowchart TB
    Animal["🐾 Animal
+ name
+ speak()
+ move()"]

    Dog["🐕 Dog
+ speak() → Woof"]
    Cat["🐈 Cat
+ speak() → Meow"]
    Duck["🦆 Duck
+ fly()
+ swim()
+ move() → Walk"]

    Flyable["🪽 Flyable
+ fly()
+ move()"]
    Swimmable["🏊 Swimmable
+ swim()
+ move()"]

    Animal --> Dog
    Animal --> Cat
    Animal --> Duck
    Flyable --> Duck
    Swimmable --> Duck

    style Animal fill:#7c3aed,color:#fff
    style Dog fill:#4f46e5,color:#fff
    style Cat fill:#4f46e5,color:#fff
    style Duck fill:#059669,color:#fff
    style Flyable fill:#f59e0b,color:#000
    style Swimmable fill:#dc2626,color:#fff
```

**MRO for Duck:** `Duck → Flyable → Swimmable → Animal → object`

## Basic Inheritance

```python
class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        raise NotImplementedError("Subclasses must implement speak()")
    
    def move(self):
        return f"{self.name} moves"

class Dog(Animal):
    def speak(self):
        return f"{self.name} says Woof!"

class Cat(Animal):
    def speak(self):
        return f"{self.name} says Meow!"

animals = [Dog("Max"), Cat("Luna")]
for animal in animals:
    print(animal.speak())
    print(animal.move())
```

## Method Overriding

```python
class Vehicle:
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model
    
    def start(self):
        return "Vehicle starting..."
    
    def info(self):
        return f"{self.brand} {self.model}"

class Car(Vehicle):
    def __init__(self, brand, model, doors):
        super().__init__(brand, model)  # Call parent constructor
        self.doors = doors
    
    def start(self):
        return f"Car {self.brand} {self.model} engine roaring!"
    
    def info(self):
        return f"{super().info()} ({self.doors} doors)"

car = Car("Toyota", "Camry", 4)
print(car.start())  # Car Toyota Camry engine roaring!
print(car.info())   # Toyota Camry (4 doors)
```

## super()

```python
class Base:
    def __init__(self, x):
        self.x = x
        print(f"Base.__init__({x})")

class Middle(Base):
    def __init__(self, x, y):
        super().__init__(x)  # Calls Base.__init__
        self.y = y
        print(f"Middle.__init__({x}, {y})")

class Child(Middle):
    def __init__(self, x, y, z):
        super().__init__(x, y)  # Calls Middle.__init__
        self.z = z
        print(f"Child.__init__({x}, {y}, {z})")

obj = Child(1, 2, 3)
# Base.__init__(1)
# Middle.__init__(1, 2)
# Child.__init__(1, 2, 3)
```

## Multiple Inheritance

```python
class Flyable:
    def fly(self):
        return "Flying..."
    
    def move(self):
        return "Moving through air"

class Swimmable:
    def swim(self):
        return "Swimming..."
    
    def move(self):
        return "Moving through water"

class Duck(Flyable, Swimmable):
    def move(self):
        return "Walking on land"

duck = Duck()
print(duck.fly())     # Flying...
print(duck.swim())    # Swimming...
print(duck.move())    # Walking on land (own method wins)
print(Duck.__mro__)   # Method Resolution Order
```

## isinstance() and issubclass()

```python
print(isinstance(dog, Dog))        # True
print(isinstance(dog, Animal))     # True (inheritance!)
print(issubclass(Dog, Animal))     # True
print(issubclass(Dog, object))     # True (everything is object)
```

## Best Practices

1. **Prefer composition over inheritance** — "has-a" is often better than "is-a"
2. **Keep inheritance hierarchies shallow** — avoid deep nesting
3. **Use `super()` instead of calling parent class directly**
4. **Understand MRO** when using multiple inheritance
5. **Use abstract base classes** for defining interfaces

## Practice Exercises

**Exercise 1:** Create a shape hierarchy: `Shape` → `Circle`, `Rectangle`, `Triangle` with area calculation.

**Exercise 2:** Implement a simple employee management system with `Employee` base class and `Manager`, `Developer`, `Intern` subclasses.
