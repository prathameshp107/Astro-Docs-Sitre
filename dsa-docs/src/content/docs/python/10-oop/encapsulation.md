---
title: Encapsulation and Properties
description: Learn about access modifiers, property decorators, getters/setters, and data hiding in Python.
sidebar:
  order: 2
---

# Encapsulation and Properties

## Introduction

**Encapsulation** bundles data and methods together and restricts direct access to internal state. Python uses naming conventions and properties instead of traditional access modifiers.

## Name Mangling (Private Attributes)

```python
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner          # Public
        self._balance = balance     # "Protected" (convention)
        self.__pin = "1234"         # Name mangling (truly private-ish)
    
    def deposit(self, amount):
        if amount > 0:
            self._balance += amount
    
    def withdraw(self, amount, pin):
        if pin != self.__pin:
            raise ValueError("Invalid PIN")
        if 0 < amount <= self._balance:
            self._balance -= amount

# Name mangling: _ClassName__attribute
# print(acc.__pin)            # AttributeError!
print(acc._BankAccount__pin)  # '1234' — but don't do this!
```

## Properties with @property

```python
class Temperature:
    def __init__(self, celsius=0):
        self._celsius = celsius
    
    @property
    def celsius(self):
        """Getter — accessed as temp.celsius"""
        return self._celsius
    
    @celsius.setter
    def celsius(self, value):
        """Setter — validates before setting"""
        if value < -273.15:
            raise ValueError("Temperature below absolute zero!")
        self._celsius = value
    
    @property
    def fahrenheit(self):
        """Computed property (no setter = read-only)"""
        return (self._celsius * 9/5) + 32
    
    @fahrenheit.setter
    def fahrenheit(self, value):
        self._celsius = (value - 32) * 5/9

temp = Temperature(25)
print(temp.celsius)        # 25
print(temp.fahrenheit)     # 77.0
temp.celsius = 30          # Uses setter
temp.fahrenheit = 100      # Uses fahrenheit setter
print(temp.celsius)        # 37.78
# temp.celsius = -300      # ValueError!
```

## Why Properties Over Getters/Setters?

```python
# Without properties (Java-style)
class OldWay:
    def __init__(self, name):
        self._name = name
    
    def get_name(self):         # Verbose!
        return self._name
    
    def set_name(self, value):  # Verbose!
        if not value:
            raise ValueError("Name cannot be empty")
        self._name = value

# With properties (Pythonic)
class NewWay:
    def __init__(self, name):
        self.name = name  # Uses setter!
    
    @property
    def name(self):
        return self._name
    
    @name.setter
    def name(self, value):
        if not value:
            raise ValueError("Name cannot be empty")
        self._name = value

obj = NewWay("Alice")
print(obj.name)   # Clean attribute access
obj.name = "Bob"  # Clean attribute assignment
```

## Best Practices

1. **Use `_prefix` for "protected" attributes** (convention, not enforced)
2. **Use `__prefix` only to avoid name collisions** in subclasses
3. **Start with simple attributes** — refactor to `@property` when validation is needed
4. **Keep properties lightweight** — no expensive operations or side effects
5. **Don't create properties for trivial get/set** — use plain attributes

## Practice Exercises

**Exercise 1:** Create a `User` class with a password property that validates minimum length.

**Exercise 2:** Create a `Rectangle` class with width, height properties and a computed area property.
