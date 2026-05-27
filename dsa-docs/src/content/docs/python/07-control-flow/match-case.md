---
title: Pattern Matching (match/case)
description: Learn Python 3.10+ structural pattern matching with match and case statements.
sidebar:
  order: 3
---

# Pattern Matching (match/case)

## Introduction

Introduced in **Python 3.10**, `match/case` provides powerful **structural pattern matching** — like a `switch` statement on steroids.

## Basic Syntax

```python
value = 2

match value:
    case 1:
        print("One")
    case 2:
        print("Two")
    case 3:
        print("Three")
    case _:
        print("Other")  # _ is wildcard (default)
```

## Matching Against Literals

```python
command = "quit"

match command:
    case "quit" | "exit" | "q":
        print("Exiting...")
    case "help" | "?":
        print("Available commands: ...")
    case "save":
        print("Saving...")
    case _:
        print(f"Unknown command: {command}")
```

## Matching Against Objects

```python
def process_point(point):
    match point:
        case (0, 0):
            print("Origin")
        case (0, y):
            print(f"Y-axis at y={y}")
        case (x, 0):
            print(f"X-axis at x={x}")
        case (x, y):
            print(f"Point at ({x}, {y})")
        case _:
            print("Not a point")
```

## Matching with Guards

```python
def categorize_number(n):
    match n:
        case x if x < 0:
            print("Negative")
        case 0:
            print("Zero")
        case x if x % 2 == 0:
            print(f"Positive even: {x}")
        case _:
            print(f"Positive odd: {n}")
```

## Matching Class Instances

```python
from dataclasses import dataclass

@dataclass
class Rectangle:
    width: float
    height: float

@dataclass
class Circle:
    radius: float

def area(shape):
    match shape:
        case Rectangle(width=w, height=h):
            return w * h
        case Circle(radius=r):
            return 3.14159 * r ** 2
        case _:
            raise ValueError("Unknown shape")
```

## Best Practices

1. **Always include a `case _:` default** to handle unexpected values
2. **Use guards** when you need additional conditions beyond the pattern
3. **Match against classes** for clean polymorphic behavior
4. **Don't overuse match** — simple if/elif is often more readable for simple checks

## Practice Exercises

**Exercise 1:** Write a match statement that categorizes HTTP status codes (1xx, 2xx, 3xx, 4xx, 5xx).

**Exercise 2:** Create a simple expression evaluator using match on nested tuples like ('add', ('num', 1), ('num', 2)).
