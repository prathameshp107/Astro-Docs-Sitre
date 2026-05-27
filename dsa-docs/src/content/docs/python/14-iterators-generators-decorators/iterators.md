---
title: Iterators in Python
description: Learn about iterables, iterators, the iteration protocol, and creating custom iterators.
sidebar:
  order: 1
---

# Iterators

## Introduction

An **iterator** is an object that produces a sequence of values one at a time. Python's `for` loop works by calling `next()` on an iterator until it raises `StopIteration`.

## The Iteration Protocol

```python
# An object is iterable if it has __iter__() that returns an iterator
# An object is an iterator if it has __next__() that returns values

numbers = [1, 2, 3]
it = iter(numbers)  # Same as numbers.__iter__()

print(next(it))  # 1
print(next(it))  # 2
print(next(it))  # 3
# print(next(it))  # StopIteration!
```

## Custom Iterator

```python
class Countdown:
    def __init__(self, start):
        self.start = start
    
    def __iter__(self):
        self.current = self.start
        return self
    
    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        value = self.current
        self.current -= 1
        return value

for num in Countdown(5):
    print(num)  # 5, 4, 3, 2, 1
```

## Built-in Iterators

```python
# enumerate — indexed iteration
for i, char in enumerate("hello"):
    print(i, char)

# zip — parallel iteration
for a, b in zip([1, 2, 3], ['a', 'b', 'c']):
    print(a, b)

# reversed — reverse iteration
for char in reversed("hello"):
    print(char)

# iter with sentinel
def read_until_empty():
    while True:
        line = input("> ")
        if line == "":
            break
        yield line

# itertools module
from itertools import cycle, chain, islice, count

# Infinite cycle
colors = cycle(["red", "green", "blue"])
for _ in range(6):
    print(next(colors))  # red, green, blue, red, green, blue

# Chain iterables
combined = chain([1, 2, 3], ['a', 'b', 'c'])
print(list(combined))  # [1, 2, 3, 'a', 'b', 'c']

# Infinite count
for i in islice(count(10, 2), 5):
    print(i)  # 10, 12, 14, 16, 18
```

## Best Practices

1. **Use iterators for large datasets** — they're memory-efficient
2. **Use `iter()` and `next()`** for manual iteration control
3. **Use `itertools`** for common iteration patterns
4. **Know when an iterator is exhausted** — you can't reset it

## Practice Exercises

**Exercise 1:** Create an iterator that generates Fibonacci numbers up to a limit.

**Exercise 2:** Implement an iterator that reads a file in chunks of N bytes.
