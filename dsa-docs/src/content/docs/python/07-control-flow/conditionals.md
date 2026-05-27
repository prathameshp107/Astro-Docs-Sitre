---
title: Conditionals (if/elif/else)
description: Learn how to control program flow with if, elif, and else statements in Python.
sidebar:
  order: 1
---

# Conditionals in Python

## Introduction

Conditionals allow your program to make decisions and execute different code paths based on conditions.

## Syntax

```python
if condition:
    # code to execute if condition is True
elif another_condition:
    # code to execute if another_condition is True
else:
    # code to execute if all conditions are False
```

## Basic Examples

```python
age = 18

if age >= 18:
    print("You can vote")
else:
    print("Too young to vote")
```

### Multiple Conditions

```python
score = 85

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

print(f"Grade: {grade}")  # Grade: B
```

### Truthiness and Falsiness

```python
# Falsy values: False, None, 0, 0.0, "", [], {}, set()
# Everything else is truthy

if []:        # ❌ — empty list is falsy
    print("Never runs")

if [1, 2]:    # ✅ — non-empty list is truthy
    print("Always runs")

if "":        # ❌ — empty string is falsy
    print("Never runs")
```

## Ternary Expression

```python
# Syntax: value_if_true if condition else value_if_false
age = 20
status = "Adult" if age >= 18 else "Minor"
print(status)  # Adult

# With functions
result = "even" if x % 2 == 0 else "odd"
```

## Nested Conditionals

```python
user = {"role": "admin", "active": True}

if user["active"]:
    if user["role"] == "admin":
        print("Full access granted")
    elif user["role"] == "editor":
        print("Edit access granted")
    else:
        print("Read-only access")
else:
    print("Account deactivated")
```

## Short-Circuit Evaluation

```python
# and — stops at first False
def expensive():
    print("Expensive function called!")
    return True

if False and expensive():  # expensive() is NEVER called
    print("Won't print")

# or — stops at first True
if True or expensive():    # expensive() is NEVER called
    print("Short-circuited!")
```

## Common Mistakes

```python
# ❌ Wrong: Assignment instead of comparison
if x = 10:     # SyntaxError!

# ✅ Correct
if x == 10:
    pass

# ❌ Wrong: Comparing boolean with ==
if is_valid == True:  # Redundant!

# ✅ Correct
if is_valid:
    pass
```

## Best Practices

1. **Avoid nesting deeper than 3 levels** — flatten with early returns
2. **Use `elif` instead of nested `if`** when conditions are mutually exclusive
3. **Prefer positive conditions** — `if active:` over `if not inactive:`
4. **Use `in` for multiple comparisons** — `if x in (1, 2, 3):` instead of `if x == 1 or x == 2 or x == 3:`
5. **Keep conditions simple** — extract complex logic into named variables

## Practice Exercises

**Exercise 1:** Write a program that checks if a number is positive, negative, or zero.

**Exercise 2:** Create a simple calculator that takes two numbers and an operator (+, -, *, /) and performs the operation.

**Exercise 3:** Build a login system that checks username and password from a dictionary.
