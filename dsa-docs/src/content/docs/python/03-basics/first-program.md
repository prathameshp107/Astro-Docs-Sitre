---
title: First Python Program
description: Write and run your first Python program, understand the print() function and comments.
sidebar:
  order: 1
---

# First Python Program

## Introduction

The tradition is "Hello, World!" — the simplest program that verifies your environment works.

## Hello, World!

```python
print("Hello, World!")
```

**Output:**
```
Hello, World!
```

## A More Meaningful First Program

```python
name = input("What's your name? ")
age = int(input("How old are you? "))
print(f"\nHello, {name}!")
print(f"In 10 years, you'll be {age + 10} years old.")
```

## print() Function Deep Dive

```python
print(*objects, sep=' ', end='\n', file=sys.stdout, flush=False)

# sep — separator
print("a", "b", "c", sep="-")    # a-b-c

# end — what to print at end
print("Hello", end="")            # No newline

# file — output to file
with open("output.txt", "w") as f:
    print("To file", file=f)
```

## Why It Matters

Your first program establishes that your development environment is correctly set up, and introduces the most basic input/output operations.

## Interview Questions

**Q1: What does `print("a", "b", "c", sep="-")` output?**

A: `a-b-c`. The `sep` parameter controls how multiple arguments are separated.

**Q2: How do you print without a newline?**

A: `print("text", end="")` — set the `end` parameter to an empty string.

## Practice Exercises

1. Print your name, age, and city using a single print statement.
2. Create a program that asks for your favorite color and prints a message.
3. Use `print()` with different `sep` and `end` combinations.
