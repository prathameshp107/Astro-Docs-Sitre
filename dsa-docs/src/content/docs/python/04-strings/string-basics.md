---
title: String Basics
description: Learn about Python strings, indexing, slicing, immutability, and essential methods.
sidebar:
  order: 1
---

# String Basics

## Introduction

A string is an **immutable sequence of Unicode characters**. In Python 3, all strings are Unicode by default.

## Creating Strings

```python
s1 = 'Hello'           # Single quotes
s2 = "World"           # Double quotes
s3 = '''Triple single''' # Multi-line
s4 = """Triple double""" # Multi-line

# String repetition
print("Ha" * 3)   # HaHaHa
print(len("Hello"))   # 5
```

## Indexing

```python
s = "Python"

# Positive indexing
print(s[0])   # P
print(s[5])   # n

# Negative indexing
print(s[-1])   # n (last character)
print(s[-6])   # P
```

## Slicing

```python
s = "Hello, World!"

print(s[0:5])    # Hello
print(s[7:12])   # World
print(s[:5])     # Hello (start defaults to 0)
print(s[7:])     # World! (stop defaults to end)
print(s[::2])    # Hlo ol! (every 2nd character)
print(s[::-1])   # Reverse!
```

## Immutability

```python
s = "Hello"
# s[0] = "J"  # TypeError! Strings can't be modified

# Create new string instead
s = "J" + s[1:]   # "Jello"
```

## String Methods

```python
s = "  Hello, World!  "

# Case methods
print(s.upper())          # "  HELLO, WORLD!  "
print(s.lower())          # "  hello, world!  "
print(s.title())          # "  Hello, World!  "
print(s.strip())          # "Hello, World!"

# Finding
print(s.find("World"))    # 7
print(s.find("xyz"))      # -1 (not found)
print(s.count("l"))       # 3

# Replacing
print(s.replace("World", "Python"))  # "Hello, Python!"

# Splitting and Joining
words = s.split(",")      # ['  Hello', ' World!  ']
print("-".join(["a", "b", "c"]))  # a-b-c

# Checking
print("hello123".isalnum())    # True
print("hello".isalpha())       # True
print("123".isdigit())         # True
```

## Why It Matters

Strings are the most common data type in programming — used for text processing, user interaction, data parsing, and more.

## Interview Questions

**Q1: What is string immutability and why does it matter?**

A: Strings cannot be modified after creation. This makes them hashable (dict keys), thread-safe, and allows Python to intern them for efficiency.

**Q2: What's the difference between `find()` and `index()`?**

A: `find()` returns -1 if not found; `index()` raises `ValueError`.

## Practice Exercises

1. Reverse a string without using `[::-1]`.
2. Check if a string is a palindrome.
3. Count character frequency in a string.
