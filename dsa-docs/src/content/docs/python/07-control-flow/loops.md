---
title: Loops (for and while)
description: Master for and while loops, break/continue, else clauses, and looping patterns in Python.
sidebar:
  order: 2
---

# Loops in Python

## Introduction

Loops let you execute a block of code repeatedly. Python has two loop types: `for` (iterating over sequences) and `while` (condition-based).

## For Loops

```python
# Iterating over a sequence
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# Iterating over a string
for char in "Hello":
    print(char)

# Using range()
for i in range(5):        # 0, 1, 2, 3, 4
    print(i)

for i in range(2, 10, 3):  # 2, 5, 8
    print(i)
```

## While Loops

```python
count = 0
while count < 5:
    print(count)
    count += 1

# Infinite loop (use with caution!)
while True:
    user_input = input("> ")
    if user_input == "quit":
        break
```

## Break and Continue

```python
# break — exit loop entirely
for i in range(10):
    if i == 5:
        break
    print(i)  # 0, 1, 2, 3, 4

# continue — skip to next iteration
for i in range(10):
    if i % 2 == 0:
        continue
    print(i)  # 1, 3, 5, 7, 9
```

## Else Clause on Loops

```python
# else runs if loop completed normally (not via break)
for n in range(2, 10):
    for divisor in range(2, n):
        if n % divisor == 0:
            print(f"{n} is not prime")
            break
    else:
        print(f"{n} is prime!")
```

## enumerate() — Indexed Loops

```python
fruits = ["apple", "banana", "cherry"]
for i, fruit in enumerate(fruits, start=1):
    print(f"{i}. {fruit}")
# 1. apple
# 2. banana
# 3. cherry
```

## zip() — Parallel Iteration

```python
names = ["Alice", "Bob", "Charlie"]
scores = [85, 92, 78]
grades = ["B", "A", "C"]

for name, score, grade in zip(names, scores, grades):
    print(f"{name}: {score} ({grade})")
```

## Best Practices

1. **Prefer `for` over `while`** when iterating over sequences
2. **Use `enumerate()` instead of manual index tracking**
3. **Use `zip()` for parallel iteration** instead of indexing
4. **Avoid modifying a list while iterating** — iterate over a copy instead
5. **Use `else` on loops sparingly** — it's powerful but can be confusing

## Practice Exercises

**Exercise 1:** Print a multiplication table (1-10) using nested loops.

**Exercise 2:** Find all prime numbers between 1 and 100.

**Exercise 3:** Implement a simple text-based menu that keeps running until the user chooses to exit.
