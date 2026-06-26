---
title: "collections Module"
description: "Powerful data structures from Python's collections module — Counter, defaultdict, deque, namedtuple, and when each saves you work."
sidebar:
  order: 1
---

# collections Module

## Simple Analogy 🧰

The standard library is a toolbox. The `collections` module is the **specialized tools drawer** — when a regular list/dict/tuple doesn't quite fit, one of these tools will be the perfect fit.

---

## Counter — Count Everything

```python
from collections import Counter

# Count items in a list
fruits = ["apple", "banana", "apple", "orange", "banana", "apple"]
counts = Counter(fruits)
print(counts)       # Counter({'apple': 3, 'banana': 2, 'orange': 1})
print(counts["apple"])  # 3

# Most common items
print(counts.most_common(2))  # [('apple', 3), ('banana', 2)]

# Count characters in a string
letter_counts = Counter("mississippi")
print(letter_counts)  # Counter({'i': 4, 's': 4, 'p': 2, 'm': 1})

# Arithmetic with Counters
sales_week1 = Counter({"apple": 10, "banana": 5})
sales_week2 = Counter({"apple": 8, "banana": 7, "orange": 3})
total = sales_week1 + sales_week2
print(total)  # Counter({'apple': 18, 'banana': 12, 'orange': 3})
```

---

## defaultdict — Never Get KeyError

```python
from collections import defaultdict

# Regular dict — KeyError if key missing
d = {}
# d["count"] += 1  # KeyError!

# defaultdict — auto-creates missing keys with a default factory
dd = defaultdict(int)    # int() = 0
dd["count"] += 1
print(dd["count"])       # 1
print(dd["missing"])     # 0 (auto-created!)

# Common patterns
words_by_letter = defaultdict(list)
for word in ["apple", "banana", "avocado", "cherry"]:
    words_by_letter[word[0]].append(word)

print(dict(words_by_letter))
# {'a': ['apple', 'avocado'], 'b': ['banana'], 'c': ['cherry']}

# defaultdict(set) for unique collections
from collections import defaultdict
unique_tags = defaultdict(set)
unique_tags["python"].add("dynamic")
unique_tags["python"].add("versatile")
unique_tags["python"].add("dynamic")  # Duplicate! Won't be added
print(unique_tags["python"])  # {'versatile', 'dynamic'}
```

---

## deque — Fast Appends/Pops from Both Ends

```python
from collections import deque

# Regular list: popping from front is O(n)
queue = deque(["Alice", "Bob", "Charlie"])

# O(1) operations on both ends
queue.append("David")         # Add to right
queue.appendleft("Zara")      # Add to left
print(queue)  # deque(['Zara', 'Alice', 'Bob', 'Charlie', 'David'])

queue.popleft()               # Remove from left
queue.pop()                   # Remove from right
print(queue)  # deque(['Alice', 'Bob', 'Charlie'])

# Rotate — useful for circular buffers
d = deque([1, 2, 3, 4, 5])
d.rotate(2)     # [4, 5, 1, 2, 3]
d.rotate(-1)    # [5, 1, 2, 3, 4]

# Max length — drops oldest items when full
recent = deque(maxlen=3)
for i in range(10):
    recent.append(i)
print(recent)  # deque([7, 8, 9], maxlen=3)
```

---

## namedtuple — Lightweight Objects

```python
from collections import namedtuple

# Create a simple data class without defining a class
Point = namedtuple("Point", ["x", "y"])
p = Point(3, 4)
print(p.x, p.y)      # 3 4 (access by name)
print(p[0], p[1])    # 3 4 (access by index)

# More fields
Person = namedtuple("Person", ["name", "age", "email"])
alice = Person("Alice", 30, "alice@example.com")
print(alice.name)    # Alice

# Named tuples are immutable
# alice.age = 31      # AttributeError!

# Use _replace to create a modified copy
updated = alice._replace(age=31)
print(updated.age)   # 31

# Use _asdict for dict conversion
print(alice._asdict())
# {'name': 'Alice', 'age': 30, 'email': 'alice@example.com'}
```

---

## Quick Comparison

| Tool | Like | But | Best For |
|------|------|-----|----------|
| `Counter` | `dict` | Auto-counts missing items as 0 | Counting, frequency analysis |
| `defaultdict` | `dict` | Never raises KeyError | Grouping, accumulating values |
| `deque` | `list` | Fast O(1) appends/pops from both ends | Queues, stacks, sliding windows |
| `namedtuple` | `tuple` | Access fields by name AND index | Lightweight, immutable data objects |

---

## 🧠 In Simple Words

- **Counter** = count items and get most common
- **defaultdict** = dict that auto-creates missing keys (no more KeyError!)
- **deque** = double-ended queue — fast adds/removes from both ends
- **namedtuple** = tuple with named fields (like a lightweight class)
- These tools save you from writing boilerplate code — use them instead of manual if/else or loop logic
