---
title: Functions in Python
description: Learn how to define and use functions, return values, docstrings, and best practices.
sidebar:
  order: 1
---

# Functions in Python

## Introduction

A **function** is a reusable block of code that performs a specific task. Functions help you organize code, avoid repetition, and improve readability.

## Defining a Function

```python
def greet(name):
    """Display a greeting."""
    print(f"Hello, {name}!")
```

## Calling a Function

```python
greet("Alice")  # Hello, Alice!
```

## Return Values

```python
# Single return value
def add(a, b):
    return a + b

result = add(3, 5)  # 8

# Multiple return values (tuple)
def min_max(numbers):
    return min(numbers), max(numbers)

low, high = min_max([3, 1, 4, 1, 5])
print(low, high)  # 1 5

# Early return
def divide(a, b):
    if b == 0:
        return "Cannot divide by zero"
    return a / b
```

## Docstrings

```python
def calculate_bmi(weight: float, height: float) -> float:
    """Calculate Body Mass Index (BMI).
    
    Args:
        weight: Weight in kilograms
        height: Height in meters
    
    Returns:
        BMI value as a float
    
    Example:
        >>> calculate_bmi(70, 1.75)
        22.86
    """
    return weight / (height ** 2)
```

## Type Hints

```python
def process_data(name: str, age: int, scores: list[float]) -> dict[str, float]:
    """Process user data and return statistics."""
    return {
        "name": name,
        "average": sum(scores) / len(scores),
        "age_category": "adult" if age >= 18 else "minor"
    }
```

## Best Practices

1. **Functions should do one thing** — single responsibility principle
2. **Use descriptive names** — `calculate_total()` not `calc()`
3. **Keep functions short** — ideally under 20-30 lines
4. **Always include docstrings** for non-trivial functions
5. **Use type hints** to make code self-documenting
6. **Avoid side effects** — prefer returning values over modifying globals

## Practice Exercises

**Exercise 1:** Write a function `is_palindrome(s)` that checks if a string is a palindrome.

**Exercise 2:** Create a function that takes a list of numbers and returns the second largest number.

**Exercise 3:** Build a simple calculator with functions for each operation.
