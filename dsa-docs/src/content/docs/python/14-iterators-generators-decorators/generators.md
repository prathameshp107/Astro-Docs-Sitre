---
title: Generators in Python
description: Learn about generator functions, generator expressions, yield vs return, and pipeline patterns.
sidebar:
  order: 2
---

# Generators

## Introduction

A **generator** is a function that produces a sequence of values lazily using `yield` instead of `return`. Generators are memory-efficient because they produce values on demand.

### Generator Lazy Evaluation

```mermaid
flowchart TB
    Start["def countdown(n):
while n > 0:"] --> Yield["⏸️ yield n
Pause and return n"]
    Yield -->|"next() called"| Resume["▶️ Resume from yield
n -= 1
continue loop"]
    Resume -->|"n > 0"| Yield
    Resume -->|"n == 0"| Stop["⛔ StopIteration
Generator exhausted"]

    subgraph Memory["Memory Efficient"
        Mem["🧠 Only stores current state
not the entire sequence!
List: O(n) memory
Generator: O(1) memory"]
    end

    style Start fill:#7c3aed,color:#fff
    style Yield fill:#f59e0b,color:#000
    style Resume fill:#4f46e5,color:#fff
    style Stop fill:#dc2626,color:#fff
    style Mem fill:#059669,color:#fff
    style Memory fill:#1e1b4b,color:#e0e7ff
```

## Generator Functions

```python
def countdown(n):
    while n > 0:
        yield n
        n -= 1

for num in countdown(5):
    print(num)  # 5, 4, 3, 2, 1

# Generator objects
gen = countdown(3)
print(next(gen))  # 3
print(next(gen))  # 2
print(next(gen))  # 1
# print(next(gen))  # StopIteration
```

## Generator Expressions

```python
# List comprehension (eager — creates full list)
squares_list = [x ** 2 for x in range(10)]

# Generator expression (lazy — produces on demand)
squares_gen = (x ** 2 for x in range(10))

print(squares_gen)       # <generator object <genexpr> at 0x...>
print(next(squares_gen)) # 0
print(next(squares_gen)) # 1
print(list(squares_gen)) # [4, 9, 16, 25, 36, 49, 64, 81]

# Memory comparison
import sys
list_comp = [x for x in range(1000000)]
gen_expr = (x for x in range(1000000))
print(sys.getsizeof(list_comp))  # ~8 MB
print(sys.getsizeof(gen_expr))   # ~200 bytes!
```

## yield from

```python
def chain(*iterables):
    for iterable in iterables:
        yield from iterable  # Delegate to another iterable

result = list(chain([1, 2, 3], "abc", range(4, 7)))
print(result)  # [1, 2, 3, 'a', 'b', 'c', 4, 5, 6]

# Without yield from
def chain_manual(*iterables):
    for iterable in iterables:
        for item in iterable:
            yield item
```

## Generator Pipelines

```python
def read_lines(filename):
    with open(filename) as f:
        for line in f:
            yield line.strip()

def filter_lines(lines, pattern):
    for line in lines:
        if pattern in line:
            yield line

def transform_lines(lines):
    for line in lines:
        yield line.upper()

# Pipeline
lines = read_lines("data.txt")
filtered = filter_lines(lines, "ERROR")
transformed = transform_lines(filtered)

for line in transformed:
    print(line)

# All processing is lazy — one line at a time!
```

## Infinite Generators

```python
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

# Take what you need
from itertools import islice
print(list(islice(fibonacci(), 10)))
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

## send() and Generator Coroutines

```python
def accumulator():
    total = 0
    while True:
        value = yield total  # Receive value via send()
        total += value

acc = accumulator()
next(acc)                     # Prime the generator
print(acc.send(10))           # 10
print(acc.send(20))           # 30
print(acc.send(30))           # 60
```

## Best Practices

1. **Use generators for large/infinite sequences** — save memory
2. **Use generator expressions** for simple lazy iterations
3. **Use `yield from`** to delegate to sub-generators
4. **Build generator pipelines** for data processing chains
5. **Know when to use list vs generator** — generators are single-use!

## Practice Exercises

**Exercise 1:** Write a generator that yields all prime numbers indefinitely.

**Exercise 2:** Create a log file parser pipeline: read lines → filter ERROR → extract timestamps.

**Exercise 3:** Implement a generator that reads a large CSV file in chunks and yields batches of rows.
