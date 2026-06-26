---
title: "itertools & functools"
description: "Handy iterator tools from itertools and higher-order functions from functools — chain, groupby, reduce, lru_cache, partial, and more."
sidebar:
  order: 2
---

# itertools & functools

## Simple Analogy 🔗

**itertools** = A set of LEGO bricks for building iterators. Instead of writing loops manually, you snap together iterator tools.

**functools** = A workshop for modifying functions — caching, reducing, and fixing arguments.

---

## itertools — Iterator Tools

### Infinite Iterators

```python
from itertools import count, cycle, repeat

# count — endless numbers
for i, n in zip(range(5), count(10, 2)):
    print(n)  # 10, 12, 14, 16, 18

# cycle — repeat forever
colors = cycle(["red", "green", "blue"])
for _ in range(6):
    print(next(colors))  # red, green, blue, red, green, blue

# repeat — same value forever
for _ in range(3):
    print(next(repeat("hello")))  # hello, hello, hello
```

### Finite Iterators

```python
from itertools import chain, zip_longest, islice

# chain — combine multiple iterables
combined = chain([1, 2, 3], "abc", range(4, 7))
print(list(combined))  # [1, 2, 3, 'a', 'b', 'c', 4, 5, 6]

# zip_longest — zip, but don't stop at shortest
a = [1, 2, 3]
b = ["a", "b"]
print(list(zip_longest(a, b, fillvalue="?")))
# [(1, 'a'), (2, 'b'), (3, '?')]

# islice — slice an iterator
values = count(10)
first_five = list(islice(values, 5))
print(first_five)  # [10, 11, 12, 13, 14]
```

### Combinatoric Iterators

```python
from itertools import product, permutations, combinations

# product — Cartesian product
print(list(product([1, 2], ["a", "b"])))
# [(1, 'a'), (1, 'b'), (2, 'a'), (2, 'b')]

# permutations — all orderings (nPr)
print(list(permutations("ABC", 2)))
# [('A', 'B'), ('A', 'C'), ('B', 'A'), ('B', 'C'), ('C', 'A'), ('C', 'B')]

# combinations — all subsets (nCr)
print(list(combinations("ABC", 2)))
# [('A', 'B'), ('A', 'C'), ('B', 'C')]
```

### Grouping

```python
from itertools import groupby

# groupby — group consecutive items by a key
data = [("A", 1), ("A", 2), ("B", 3), ("B", 4), ("A", 5)]
# Sort first! groupby only groups CONSECUTIVE items
data.sort(key=lambda x: x[0])

for key, group in groupby(data, key=lambda x: x[0]):
    print(f"{key}: {list(group)}")
# A: [('A', 1), ('A', 2), ('A', 5)]
# B: [('B', 3), ('B', 4)]
```

---

## functools — Function Tools

### `@lru_cache` — Memoization

```python
from functools import lru_cache

@lru_cache(maxsize=128)
def fibonacci(n):
    """Caches results — O(n) instead of O(2^n)!"""
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(100))  # 354224848179261915075 (instantly!)
print(fibonacci.cache_info())  # CacheInfo(hits=98, misses=101, maxsize=128, currsize=101)
```

### `reduce` — Accumulate Values

```python
from functools import reduce

# Sum all numbers
total = reduce(lambda acc, x: acc + x, [1, 2, 3, 4, 5])
print(total)  # 15

# Find the maximum
max_value = reduce(lambda a, b: a if a > b else b, [3, 7, 2, 9, 1])
print(max_value)  # 9

# With initial value
result = reduce(lambda acc, x: acc + x, [1, 2, 3], 10)
print(result)  # 16
```

### `partial` — Fix Arguments

```python
from functools import partial

# Create a function with pre-filled arguments
def power(base, exponent):
    return base ** exponent

square = partial(power, exponent=2)
cube = partial(power, exponent=3)

print(square(5))   # 25
print(cube(5))     # 125

# Practical: custom print
import sys
log_error = partial(print, "[ERROR]", file=sys.stderr)
log_error("File not found")  # [ERROR] File not found (to stderr)
```

---

## 🧠 In Simple Words

- **itertools** = tools for building and combining iterators without writing loops
- **`chain()`** = concatenate multiple iterables; **`groupby()`** = group consecutive items
- **`product()`** = Cartesian product; **`permutations()`** / **`combinations()`** = combinatorics
- **functools** = tools for modifying functions
- **`@lru_cache`** = auto-caching for expensive functions (instant Fibonacci!)
- **`reduce()`** = accumulate values; **`partial()`** = fix some arguments of a function
