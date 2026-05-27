---
title: User Input and Output
description: Learn how to get input from users and display output effectively in Python.
sidebar:
  order: 5
---

# User Input and Output

## Introduction

Interacting with users through input and output is fundamental to most programs.

## User Input with `input()`

```python
name = input("Enter your name: ")
print(f"Hello, {name}!")
```

> ⚠️ `input()` always returns a **string**! Convert to the required type.

### Input with Type Conversion

```python
age = int(input("Enter your age: "))
price = float(input("Enter price: $"))
```

### Multiple Values on One Line

```python
x, y = map(int, input("Enter two numbers: ").split())
print(f"Sum: {x + y}")
```

### Input Validation

```python
while True:
    try:
        age = int(input("Enter your age: "))
        if age < 0 or age > 150:
            print("Enter a realistic age.")
            continue
        break
    except ValueError:
        print("Invalid input! Enter a number.")
```

## Output Methods

```python
# Comma-separated
print("Name:", name, "Age:", age)

# f-strings (preferred)
print(f"Name: {name}, Age: {age}")

# .format()
print("Name: {}, Age: {}".format(name, age))
```

## Production Input Sources

In real applications, you'll use:
- Command-line arguments (`argparse`, `sys.argv`)
- Environment variables (`os.environ`)
- Configuration files (`.env`, `.yaml`, `.json`)
- Web forms / API requests

## Why It Matters

Proper input handling prevents crashes and security vulnerabilities. Always validate user input!

## Common Mistakes

- Forgetting `input()` returns a string
- Not validating user input
- Using `input()` in production code (use proper argument parsing instead)

## Interview Questions

**Q1: What does `input()` return in Python?**

A: Always a string. You must convert to the required type using `int()`, `float()`, etc.

**Q2: How do you get multiple inputs on one line?**

A: Use `split()` with `map()`: `a, b = map(int, input().split())`

## Practice Exercises

1. Write a program that asks for name, age, and favorite color, then prints a summary.
2. Create a simple calculator that takes two numbers and an operator.
3. Add input validation for a number guessing game.
