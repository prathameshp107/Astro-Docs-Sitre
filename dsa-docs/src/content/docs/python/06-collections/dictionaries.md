---
title: Dictionaries in Python
description: Comprehensive guide to dictionaries — creation, methods, iteration, nested dicts, and performance.
sidebar:
  order: 4
---

# Dictionaries in Python

## Introduction

A dictionary is a **mutable, ordered (Python 3.7+) mapping of key-value pairs**, backed by a hash table with O(1) average lookup.

## Creating Dictionaries

```python
empty = {}
person = {
    "name": "Alice",
    "age": 30,
    "email": "alice@example.com"
}

# From keyword arguments
config = dict(host="localhost", port=5432, database="mydb")

# From list of pairs
pairs = [("a", 1), ("b", 2), ("c", 3)]
d = dict(pairs)

# Dict comprehension
squares = {x: x**2 for x in range(1, 6)}
```

## Accessing Values

```python
person = {"name": "Alice", "age": 30, "city": "NYC"}

print(person["name"])              # Alice
print(person.get("phone"))         # None (safe!)
print(person.get("phone", "N/A"))  # N/A (default)

print("name" in person)       # True — checks keys
```

## Dictionary Methods

```python
d = {"a": 1, "b": 2, "c": 3}

# Adding/Updating
d["d"] = 4              # Add new
d["a"] = 99             # Update existing
d.update({"b": 20, "e": 5})  # Update multiple
d.setdefault("f", 100)  # Add only if key doesn't exist

# Removing
removed = d.pop("a")         # Remove & return
removed = d.pop("z", None)   # Safe removal
key, val = d.popitem()       # Remove last inserted

# Merging (Python 3.9+)
d1 = {"a": 1, "b": 2}
d2 = {"b": 20, "c": 3}
merged = d1 | d2        # {'a':1, 'b':20, 'c':3}
```

## Iteration

```python
for key in person:
    print(key, person[key])

for key, value in person.items():  # Preferred
    print(f"{key}: {value}")

for value in person.values():
    print(value)
```

## Specialized Dictionaries

```python
from collections import defaultdict, Counter

# defaultdict — never raises KeyError
word_count = defaultdict(int)
for word in ["the", "cat", "sat", "the", "mat"]:
    word_count[word] += 1  # No KeyError!

# Counter — count occurrences
counts = Counter(["apple", "banana", "apple", "cherry"])
print(counts.most_common(2))  # [('apple', 2), ('banana', 1)]
```

## Nested Dictionaries

```python
users = {
    "user_1": {
        "name": "Alice",
        "address": {"city": "New York", "country": "USA"},
        "skills": ["Python", "SQL"]
    }
}

print(users["user_1"]["address"]["city"])  # New York
```

## Why It Matters

Dictionaries are fundamental for representing structured data, configuration, counting, caching, and JSON processing.

## Interview Questions

**Q1: How does Python dict lookup work internally?**

A: Python computes `hash(key)` to find the bucket. If there's a collision, it probes nearby slots. Average O(1), worst-case O(n).

**Q2: How do you merge two dictionaries?**

A: `{**d1, **d2}`, `d1 | d2` (Python 3.9+), or `d1.update(d2)`. The second dict's values win on conflicts.

## Practice Exercises

1. Count word frequencies in a text.
2. Group items by category using defaultdict(list).
3. Invert a dictionary (values become keys).
