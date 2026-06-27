---
title: "Python Interview Questions"
description: "150+ Python interview questions from beginner to advanced with hidden answers."
sidebar:
  order: 999
  label: "Interview Questions (150+)"
---

> **How to use:** Click any question to expand the answer.

---

## 🟢 Easy (Q1–Q50)

<details class="qa-card qa-easy">
<summary>
Q1. What is Python?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**Python** is a high-level, interpreted, general-purpose programming language created by **Guido van Rossum** in 1991. It emphasizes **readability** and simplicity with its clean syntax and indentation-based block structure.

```python
print("Hello, Python!")
```

Key traits: dynamically typed, garbage-collected, supports multiple paradigms (OO, functional, procedural), and has a massive standard library ("batteries included").

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q2. What are the key features of Python?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| Feature | Description |
|---------|-------------|
| **Interpreted** | Code runs line by line via CPython interpreter |
| **Dynamically typed** | No type declarations needed |
| **Indentation-based** | Uses whitespace for blocks (not braces) |
| **Object-oriented** | Everything is an object |
| **Batteries included** | Extensive standard library |
| **Cross-platform** | Runs on Windows, macOS, Linux, etc. |
| **Garbage collected** | Automatic memory management |
| **Large ecosystem** | PyPI has 500K+ packages |

```python
# Dynamic typing
x = 10       # int
x = "hello"  # now str — no error
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q3. What are the advantages and disadvantages of Python?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**Advantages:**
- Easy to learn and read (beginner-friendly)
- Highly productive (less code than Java/C++)
- Massive standard library and third-party packages
- Strong community and corporate support
- Great for prototyping, data science, automation, web, AI/ML

**Disadvantages:**
- **Slow** execution (interpreted, GIL-bound)
- Not ideal for mobile development
- Not suitable for memory-constrained systems
- Dynamic typing can lead to runtime bugs
- GIL limits true parallel CPU-bound execution

```python
# Python shines at: automation, data, web
# Python struggles with: game engines, mobile apps, systems programming
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q4. What is CPython?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**CPython** is the reference implementation of Python, written in **C**. When you download Python from python.org, you get CPython.

```python
import sys
print(sys.implementation.name)  # 'cpython'
print(sys.version)              # 3.12.x
```

**Other implementations:**
| Implementation | Language | Use Case |
|---------------|----------|----------|
| **CPython** | C | Default, most compatible |
| **PyPy** | RPython (JIT) | Faster for long-running apps |
| **Jython** | Java | JVM integration |
| **IronPython** | C# | .NET integration |

CPython compiles Python source to **bytecode** (`.pyc` files), which runs on the Python Virtual Machine.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q5. How does Python execute code?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Python follows this pipeline:

```
Source Code (.py) → Parser → AST → Compiler → Bytecode (.pyc) → PVM → Output
```

1. **Parser** — reads source, builds Abstract Syntax Tree (AST)
2. **Compiler** — converts AST to bytecode instructions
3. **Bytecode** — platform-independent intermediate code (stored in `__pycache__/`)
4. **PVM (Python Virtual Machine)** — executes bytecode line by line

```python
# See the bytecode
import dis

def greet(name):
    return f"Hello, {name}"

dis.dis(greet)
# Shows bytecode instructions like LOAD_FAST, FORMAT_VALUE, BUILD_STRING, RETURN_VALUE
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q6. What is PEP 8?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**PEP 8** is Python's official style guide. Key rules:

- Use 4 spaces per indentation level (no tabs)
- Maximum line length: 79 characters
- Use `snake_case` for variables and functions
- Use `UPPER_CASE` for constants
- Use `CamelCase` for classes
- Two blank lines around top-level functions/classes
- One blank line between methods

```python
# PEP 8 compliant
class UserProfile:
    """User profile class."""

    def __init__(self, name: str, age: int) -> None:
        self.name = name
        self.age = age

MAX_LOGIN_ATTEMPTS = 3

def calculate_total(items: list) -> float:
    """Calculate total price of items."""
    return sum(item.price for item in items)
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q7. What is the Zen of Python?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

The **Zen of Python** (PEP 20) is a collection of 19 guiding principles for Python design:

```python
import this
```

**Key aphorisms:**
- Beautiful is better than ugly
- Explicit is better than implicit
- Simple is better than complex
- Flat is better than nested
- Readability counts
- There should be one — and preferably only one — obvious way to do it
- If the implementation is hard to explain, it's a bad idea

These principles guide Python language design and community practices.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q8. What are Python's built-in data types?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**Numeric:**
| Type | Example | Mutable |
|------|---------|---------|
| `int` | `42`, `-5` | ❌ |
| `float` | `3.14`, `1e5` | ❌ |
| `complex` | `3+4j` | ❌ |
| `bool` | `True`, `False` | ❌ |

**Sequence:**
| Type | Example | Mutable |
|------|---------|---------|
| `str` | `"hello"` | ❌ |
| `list` | `[1, 2, 3]` | ✅ |
| `tuple` | `(1, 2, 3)` | ❌ |
| `range` | `range(10)` | ❌ |

**Mapping:**
| Type | Example | Mutable |
|------|---------|---------|
| `dict` | `{"a": 1}` | ✅ |

**Set:**
| Type | Example | Mutable |
|------|---------|---------|
| `set` | `{1, 2, 3}` | ✅ |
| `frozenset` | `frozenset({1, 2})` | ❌ |

**Binary:**
| Type | Example | Mutable |
|------|---------|---------|
| `bytes` | `b"hello"` | ❌ |
| `bytearray` | `bytearray(5)` | ✅ |

**None:**
```python
x = None  # represents absence of value
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q9. What is the difference between mutable and immutable objects?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| Mutable | Immutable |
|---------|-----------|
| Can be changed after creation | Cannot be changed after creation |
| `list`, `dict`, `set`, `bytearray` | `int`, `str`, `tuple`, `frozenset`, `bytes` |

```python
# Mutable — objects can be modified in-place
my_list = [1, 2, 3]
my_list.append(4)      # ✅ list is now [1, 2, 3, 4]

# Immutable — "modification" creates a NEW object
my_str = "hello"
my_str.upper()         # returns "HELLO" — original unchanged
print(my_str)          # "hello"

# Tuples are immutable
t = (1, 2, 3)
# t[0] = 99           # ❌ TypeError

# But they can contain mutable objects
t = ([1, 2], 3)
t[0].append(99)        # ✅ t[0] is now [1, 2, 99]
```

**Why it matters:** Immutable objects are hashable (can be dict keys), thread-safe, and can be shared safely.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q10. What is dynamic typing in Python?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**Dynamic typing** means variable types are determined at runtime, not declared in advance.

```python
# No type declarations needed
x = 10          # x is int
x = "hello"     # x is now str — no error
x = [1, 2, 3]   # x is now list

# Type can change freely
def process(value):
    if isinstance(value, int):
        return value * 2
    elif isinstance(value, str):
        return value.upper()
    return value

# Type hints are optional (Python 3.5+)
name: str = "Alice"          # hint only, not enforced
age: int = "thirty"          # no error at runtime!
```

**Pros:** Flexible, fast prototyping, less boilerplate
**Cons:** Runtime type errors, harder to refactor large codebases

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q11. What is duck typing?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**Duck typing:** "If it walks like a duck and quacks like a duck, it's a duck." An object's suitability is determined by its methods/properties, not its type.

```python
class Duck:
    def quack(self): return "Quack!"

class Person:
    def quack(self): return "I'm quacking like a duck!"

def make_it_quack(thing):
    print(thing.quack())  # ✅ Works with any object that has .quack()

make_it_quack(Duck())     # "Quack!"
make_it_quack(Person())   # "I'm quacking like a duck!"

# Python's EAFP: Easier to Ask Forgiveness than Permission
def safe_quack(thing):
    try:
        return thing.quack()
    except AttributeError:
        return "Can't quack"
```

Use `protocols` (Python 3.8+) for structural subtyping:

```python
from typing import Protocol

class Quackable(Protocol):
    def quack(self) -> str: ...
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q12. What is type conversion in Python?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

```python
# Implicit conversion (coercion) — Python auto-converts
result = 10 + 3.14     # 13.14 (int → float)

# Explicit conversion — using type constructors
int("42")              # 42
float("3.14")          # 3.14
str(42)                # "42"
bool(1)                # True
list("hello")          # ['h', 'e', 'l', 'l', 'o']
tuple([1, 2, 3])       # (1, 2, 3)
set([1, 2, 2, 3])      # {1, 2, 3}
dict([("a", 1), ("b", 2)])  # {'a': 1, 'b': 2}

# Safe conversion
def safe_int(value):
    try:
        return int(value)
    except (ValueError, TypeError):
        return None
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q13. What is None in Python?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`None` is Python's null value — it represents the **absence of a value**. It's a singleton object of type `NoneType`.

```python
x = None

# Check for None (use 'is', not '==')
if x is None:           # ✅ correct
if x is not None:       # ✅ correct
if x == None:           # ❌ works but not idiomatic

# Functions return None by default
def no_return():
    pass

result = no_return()
print(result)           # None

# Common None patterns
user = get_user(123)
if user is not None:
    print(user.name)

# Default params with None
def fetch_data(timeout=None):
    if timeout is None:
        timeout = 30  # default
    ...
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q14. What are Python's numeric types?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

```python
# int — arbitrary precision (no overflow)
x = 42
y = 10 ** 100           # huge, still an int!

# float — double-precision IEEE 754
pi = 3.14159
sci = 1.5e10            # 15000000000.0

# complex
z = 3 + 4j
print(z.real)           # 3.0
print(z.imag)           # 4.0

# bool — subclass of int
print(True + True)      # 2 (True=1, False=0)

# Division
print(5 / 2)            # 2.5  (true division)
print(5 // 2)           # 2    (floor division)
print(5 % 2)            # 1    (modulo)

# Underscores for readability
million = 1_000_000     # same as 1000000
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q15. What is the difference between / and // in Python?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| Operator | Name | Result |
|----------|------|--------|
| `/` | True division | Always returns `float` |
| `//` | Floor division | Truncates to nearest integer |

```python
# True division (/)
7 / 2     # 3.5
7 / -2    # -3.5
8 / 4     # 2.0 (always float!)

# Floor division (//)
7 // 2    # 3 (floor of 3.5)
7 // -2   # -4 (floor of -3.5 = -4)
-7 // 2   # -4

# Floor division rounds DOWN (toward negative infinity)
# Not truncation toward zero!

# Modulo follows floor division
7 % 2     # 1
7 % -2    # -1 (preserves sign of divisor)
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q16. What are Python's string types and how do you create strings?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

```python
# Single quotes
s1 = 'hello'

# Double quotes
s2 = "hello"

# Triple quotes (multi-line)
s3 = """Line 1
Line 2
Line 3"""

# Raw strings (ignore escape sequences)
path = r"C:\Users\name"     # no need to escape backslashes

# f-strings (formatted string literals)
name = "Alice"
age = 30
msg = f"{name} is {age} years old"  # "Alice is 30 years old"

# bytes
b = b"hello"                # immutable byte sequence
ba = bytearray(b"hello")    # mutable byte sequence
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q17. What are f-strings and how do you use them?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**f-strings** (Python 3.6+) embed expressions inside string literals using `{}`.

```python
name = "Alice"
age = 30

# Basic
f"Name: {name}, Age: {age}"      # "Name: Alice, Age: 30"

# Expressions
f"2 + 2 = {2 + 2}"               # "2 + 2 = 4"

# Format specifiers
price = 19.99
f"Price: ${price:.2f}"           # "Price: $19.99"
f"Hex: {255:#x}"                 # "Hex: 0xff"

# Alignment
f"{name:<10}"                    # "Alice     " (left align)
f"{name:>10}"                    # "     Alice" (right align)
f"{name:^10}"                    # "  Alice   " (center)

# Debugging (3.8+)
x = 10
f"{x = }"                        # "x = 10"
f"{x + 5 = }"                    # "x + 5 = 15"

# Nested f-strings
precision = 2
f"Pi is {3.14159:.{precision}f}" # "Pi is 3.14"
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q18. What are Python lists and how do you use them?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

A **list** is an ordered, mutable collection that can hold mixed types.

```python
# Creation
nums = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]
empty = []
list_from_range = list(range(5))  # [0, 1, 2, 3, 4]

# Indexing (0-based)
nums[0]      # 1
nums[-1]     # 5 (last element)

# Slicing [start:stop:step]
nums[1:3]    # [2, 3]
nums[:3]     # [1, 2, 3]
nums[::2]    # [1, 3, 5]
nums[::-1]   # [5, 4, 3, 2, 1] (reverse)

# Methods
nums.append(6)      # [1, 2, 3, 4, 5, 6]
nums.insert(0, 0)   # [0, 1, 2, 3, 4, 5, 6]
nums.pop()          # 6 (remove & return last)
nums.remove(3)      # remove first occurrence of 3
nums.sort()         # sort in-place
nums.reverse()      # reverse in-place
len(nums)           # number of elements

# List comprehension (idiomatic!)
squares = [x**2 for x in range(10) if x % 2 == 0]
# [0, 4, 16, 36, 64]
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q19. What are Python tuples?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

A **tuple** is an ordered, **immutable** collection. Once created, it cannot be changed.

```python
# Creation
t = (1, 2, 3)
single = (1,)          # trailing comma — required!
no_parens = 1, 2, 3    # also a tuple (tuple packing)
empty = ()

# Access (same as list)
t[0]       # 1
t[1:3]     # (2, 3)

# Immutability
# t[0] = 99            # ❌ TypeError

# But can contain mutable objects
t = ([1, 2], 3)
t[0].append(99)        # ✅ t[0] is now [1, 2, 99]

# Tuple unpacking
a, b, c = (1, 2, 3)   # a=1, b=2, c=3
a, b = b, a            # swap (needs RHS tuple)

# Return multiple values from function
def min_max(nums):
    return min(nums), max(nums)

low, high = min_max([3, 1, 4, 1, 5])  # low=1, high=5

# When to use: fixed collections, dict keys, function returns
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q20. What are Python dictionaries?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

A **dictionary** stores key-value pairs. Keys must be hashable (immutable).

```python
# Creation
user = {"name": "Alice", "age": 30, "active": True}
empty = {}
dict_from_pairs = dict([("a", 1), ("b", 2)])

# Access
user["name"]           # "Alice"
user.get("name")       # "Alice"
user.get("phone")      # None (no error!)
user.get("phone", "N/A")  # "N/A" (default)

# Key check
"name" in user         # True

# Modify
user["age"] = 31       # update
user["email"] = "a@b.com"  # add new

# Delete
del user["active"]
user.pop("age")        # 31 (remove & return)
user.pop("missing", None)  # safe removal

# Iteration
for key in user:                    # keys
for key, val in user.items():       # key-value pairs
for val in user.values():           # values

# Dict comprehension
squares = {x: x**2 for x in range(5)}  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# Merge (3.9+)
user = {"name": "Alice"} | {"age": 30}  # {'name': 'Alice', 'age': 30}
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q21. What are Python sets?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

A **set** is an unordered collection of **unique**, hashable elements.

```python
# Creation
s = {1, 2, 3, 2, 1}   # {1, 2, 3} — duplicates removed
empty_set = set()       # NOT {} — that's a dict
set_from_list = set([1, 2, 2, 3])  # {1, 2, 3}

# Basic operations
s.add(4)               # {1, 2, 3, 4}
s.remove(3)            # {1, 2, 4} — KeyError if missing
s.discard(10)          # {1, 2, 4} — no error if missing
s.pop()                # remove & return arbitrary element

# Membership (O(1) average!)
100 in s               # True/False

# Set operations
a = {1, 2, 3}
b = {3, 4, 5}

a | b                  # {1, 2, 3, 4, 5}  union
a & b                  # {3}               intersection
a - b                  # {1, 2}            difference
a ^ b                  # {1, 2, 4, 5}      symmetric diff
a <= b                 # subset check
a >= b                 # superset check

# Set comprehension
evens = {x for x in range(20) if x % 2 == 0}
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q22. What are Python operators?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

```python
# Arithmetic
+ - * / // % **        # add, sub, mul, div, floor, mod, pow

# Comparison
== != < > <= >=        # returns bool

# Logical
and or not             # short-circuit operators

# Identity
is  is not             # checks object identity (not equality)

# Membership
in  not in             # checks if element exists in collection

# Bitwise
& | ^ ~ << >>          # and, or, xor, not, shift

# Assignment
= += -= *= /= //= %= **= &= |= ^= <<= >>=

# Walrus (3.8+)
if (n := len(items)) > 10:
    print(f"Got {n} items")  # assigns AND uses in expression
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q23. What is the walrus operator (:=)?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

The **walrus operator** (`:=`) assigns a value to a variable within an expression. Python 3.8+.

```python
# Without walrus
data = fetch_data()
if data:
    process(data)

# With walrus — assign AND check in one line
if (data := fetch_data()):
    process(data)

# While loops
while (chunk := file.read(1024)):
    process(chunk)

# List comprehensions
results = [y for x in range(10) if (y := expensive(x)) > 5]
# Without walrus, expensive(x) would be called twice

# Use sparingly — can reduce readability if overused
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q24. What is operator precedence in Python?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

From highest to lowest precedence:

| Level | Operators | Associativity |
|-------|-----------|---------------|
| 1 | `(...)`, `[...]`, `{...}` | N/A |
| 2 | `x[i]`, `x.attr`, `f(...)` | Left |
| 3 | `**` | Right |
| 4 | `+x`, `-x`, `~x` | Right |
| 5 | `*`, `/`, `//`, `%` | Left |
| 6 | `+`, `-` | Left |
| 7 | `<<`, `>>` | Left |
| 8 | `&` | Left |
| 9 | `^` | Left |
| 10 | `\|` | Left |
| 11 | `in`, `not in`, `is`, `is not`, `<`, `<=`, `>`, `>=`, `!=`, `==` | Left |
| 12 | `not x` | Right |
| 13 | `and` | Left |
| 14 | `or` | Left |
| 15 | `if-else` (ternary) | Right |
| 16 | `:=` (walrus) | Right |

```python
# When in doubt, use parentheses!
result = 2 + 3 * 4      # 14 (not 20)
result = (2 + 3) * 4    # 20
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q25. What are Python's control flow statements?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

```python
# if / elif / else
score = 85
if score >= 90:
    grade = "A"
elif score >= 75:
    grade = "B"
elif score >= 60:
    grade = "C"
else:
    grade = "F"

# match-case (Python 3.10+)
def http_status(code):
    match code:
        case 200:
            return "OK"
        case 201:
            return "Created"
        case 404:
            return "Not Found"
        case _:
            return "Unknown"

# Ternary expression
status = "Adult" if age >= 18 else "Minor"

# for loop
for i in range(5):           # 0, 1, 2, 3, 4
for i, item in enumerate(items):  # with index
for a, b in zip(list1, list2):    # parallel iteration

# while loop
while condition:
    # body
    break         # exit loop
    continue      # skip to next iteration
    pass          # no-op placeholder

# Loop with else (runs if no break)
for n in range(2, 10):
    for x in range(2, n):
        if n % x == 0:
            break
    else:
        print(f"{n} is prime")
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q26. What is the match-case statement?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**match-case** (Python 3.10+) provides pattern matching, similar to switch in other languages but much more powerful.

```python
# Simple value matching
def describe(value):
    match value:
        case 0:
            return "zero"
        case 1 | 2 | 3:
            return "small"
        case _:
            return "other"

# Pattern matching with sequences
def process(point):
    match point:
        case (0, 0):
            return "origin"
        case (0, y):
            return f"x=0, y={y}"
        case (x, 0):
            return f"x={x}, y=0"
        case (x, y):
            return f"x={x}, y={y}"
        case _:
            return "not a point"

# Pattern matching with objects
class User:
    def __init__(self, name, role):
        self.name = name
        self.role = role

match user:
    case User(name="admin", role="admin"):
        return "admin user"
    case User(name=name, role="user") if name:
        return f"user: {name}"

# Matching dictionaries
match config:
    case {"method": "GET"}:
        return handle_get()
    case {"method": "POST", "data": data}:
        return handle_post(data)
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q27. How do you define functions in Python?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

```python
# Basic function
def greet(name):
    return f"Hello, {name}!"

# Type hints (optional, 3.5+)
def add(a: int, b: int) -> int:
    return a + b

# Default arguments
def power(base, exp=2):
    return base ** exp

# Keyword-only arguments
def configure(*, host, port=8080):
    print(f"{host}:{port}")

configure(host="localhost")     # ✅
# configure("localhost")        # ❌ TypeError

# Positional-only arguments (3.8+)
def divide(a, b, /):
    return a / b

divide(10, 2)   # ✅
# divide(a=10, b=2)  # ❌

# *args (variable positional)
def sum_all(*args):
    return sum(args)

# **kwargs (variable keyword)
def create_user(**kwargs):
    return kwargs

# Docstrings
def calculate(x, y):
    """Calculate something important.

    Args:
        x: First number
        y: Second number

    Returns:
        The calculated result
    """
    return x * y
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q28. What are *args and **kwargs?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`*args` captures extra **positional** arguments as a tuple. `**kwargs` captures extra **keyword** arguments as a dictionary.

```python
# *args — arbitrary positional arguments
def log_message(level, *messages):
    print(f"[{level}]", *messages)

log_message("INFO", "Server", "started", "on port 8080")
# [INFO] Server started on port 8080

# **kwargs — arbitrary keyword arguments
def create_profile(name, **details):
    profile = {"name": name}
    profile.update(details)
    return profile

p = create_profile("Alice", age=30, city="NYC", active=True)
# {'name': 'Alice', 'age': 30, 'city': 'NYC', 'active': True}

# Combined
def func(a, b, *args, **kwargs):
    pass

# Unpacking with * and **
def add(a, b, c):
    return a + b + c

nums = [1, 2, 3]
add(*nums)                  # 6 — unpack list

config = {"a": 1, "b": 2, "c": 3}
add(**config)               # 6 — unpack dict

# Merging dictionaries (3.9+)
defaults = {"host": "localhost", "port": 8080}
options = {"port": 9090}
merged = {**defaults, **options}  # {'host': 'localhost', 'port': 9090}
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q29. What are lambda functions?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

A **lambda** is a small, anonymous function defined in a single expression.

```python
# Syntax: lambda args: expression

# Simple
square = lambda x: x ** 2
square(5)           # 25

# Multiple args
add = lambda a, b: a + b
add(3, 4)           # 7

# With sorted()
users = [("Alice", 30), ("Bob", 25), ("Carol", 35)]
sorted(users, key=lambda u: u[1])  # sort by age

# With map/filter
nums = [1, 2, 3, 4, 5]
list(map(lambda x: x * 2, nums))   # [2, 4, 6, 8, 10]
list(filter(lambda x: x % 2 == 0, nums))  # [2, 4]

# With default arguments in lambda
multiply = lambda x, y=2: x * y
multiply(5)          # 10
multiply(5, 3)       # 15
```

**Limitations:** Single expression only, no statements, no annotations, limited debugging.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q30. What are list comprehensions?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**List comprehensions** provide a concise way to create lists.

```python
# Basic: [expression for item in iterable]
squares = [x**2 for x in range(10)]
# [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# With condition
evens = [x for x in range(20) if x % 2 == 0]
# [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# With if-else (different syntax!)
result = ["even" if x % 2 == 0 else "odd" for x in range(5)]
# ['even', 'odd', 'even', 'odd', 'even']

# Nested loops
pairs = [(x, y) for x in range(3) for y in range(3)]
# [(0,0), (0,1), (0,2), (1,0), (1,1), (1,2), (2,0), (2,1), (2,2)]

# With functions
items = ["  Hello  ", "World", "  Python  "]
cleaned = [item.strip().upper() for item in items if item.strip()]
# ['HELLO', 'WORLD', 'PYTHON']

# Dict and set comprehensions
squares_dict = {x: x**2 for x in range(5)}
squares_set = {x**2 for x in range(5)}
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q31. What is the difference between a list comprehension and a generator expression?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| Feature | List Comprehension | Generator Expression |
|---------|-------------------|---------------------|
| **Syntax** | `[x for x in ...]` | `(x for x in ...)` |
| **Evaluation** | Eager (creates full list) | Lazy (produces on demand) |
| **Memory** | Stores all items | One item at a time |
| **Reusable** | ✅ Yes | ❌ No (exhausted after use) |
| **Speed** | Faster for small data | Lower overhead for large data |

```python
import sys

# List comprehension — creates all items immediately
squares_list = [x**2 for x in range(1000)]
sys.getsizeof(squares_list)  # ~8KB

# Generator expression — creates items lazily
squares_gen = (x**2 for x in range(1000))
sys.getsizeof(squares_gen)   # ~112 bytes

# Use generator for large data
sum(x**2 for x in range(10_000_000))  # ✅ memory efficient

# Use list comprehension when you need
# - Multiple iterations
# - Random access (indexing)
# - Length checking
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q32. How do you handle errors in Python?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

```python
# Basic try/except
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Can't divide by zero")

# Multiple exception types
try:
    value = int(input())
    result = 100 / value
except ValueError:
    print("Not a valid number")
except ZeroDivisionError:
    print("Can't divide by zero")
except Exception as e:
    print(f"Unexpected error: {e}")

# try/except/else/finally
try:
    file = open("data.txt")
    data = file.read()
except FileNotFoundError:
    print("File not found")
else:
    print(f"Read {len(data)} characters")  # runs if no exception
finally:
    file.close()  # always runs

# Raising exceptions
def withdraw(amount, balance):
    if amount > balance:
        raise ValueError("Insufficient funds")
    return balance - amount

# Custom exceptions
class InsufficientFundsError(Exception):
    def __init__(self, balance, amount):
        self.balance = balance
        self.amount = amount
        super().__init__(f"Need {amount}, have {balance}")

# Assertions
def divide(a, b):
    assert b != 0, "Divisor cannot be zero"
    return a / b
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q33. What is the try/except/else/finally pattern?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| Block | When it runs | Use Case |
|-------|-------------|----------|
| `try` | Always | Code that may raise an exception |
| `except` | On exception | Error handling |
| `else` | If NO exception | Success path (separate from try) |
| `finally` | Always (even with return) | Cleanup (close files, release locks) |

```python
def process_file(path):
    try:
        file = open(path)
    except FileNotFoundError:
        print("File not found, using defaults")
        return default_data()
    else:
        # Only runs if file opened successfully
        data = file.read()
        return process(data)
    finally:
        # Always runs — even if return in try/except
        try:
            file.close()
        except NameError:
            pass  # file was never opened
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q34. What is the with statement in Python?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

The **`with` statement** (context manager) ensures proper resource cleanup. It calls `__enter__` on entry and `__exit__` on exit (even on exceptions).

```python
# File handling — auto-closes even on error
with open("file.txt", "r") as file:
    data = file.read()
# file is automatically closed here

# Multiple resources
with open("input.txt") as infile, open("output.txt", "w") as outfile:
    outfile.write(infile.read())

# Custom context manager (class-based)
class ManagedFile:
    def __enter__(self):
        print("Opening file")
        self.file = open("data.txt")
        return self.file

    def __exit__(self, exc_type, exc_val, exc_tb):
        print("Closing file")
        self.file.close()
        return False  # don't suppress exceptions

with ManagedFile() as f:
    data = f.read()

# Using contextlib (simpler)
from contextlib import contextmanager

@contextmanager
def managed_file(path):
    try:
        f = open(path)
        yield f
    finally:
        f.close()

with managed_file("data.txt") as f:
    data = f.read()
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q35. What are Python modules and packages?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

- A **module** is a single `.py` file
- A **package** is a directory with `__init__.py` (can be empty in 3.3+)

```python
# Importing modules
import math
from datetime import datetime, timedelta
from collections import defaultdict as dd
import numpy as np  # alias

# Package structure
# my_package/
#   __init__.py
#   module_a.py
#   sub_package/
#     __init__.py
#     module_b.py

from my_package.module_a import function_a
from my_package.sub_package import module_b

# Conditional imports
try:
    import pandas as pd
except ImportError:
    pd = None

# Module attributes
print(__name__)      # '__main__' for scripts, module name for imports
print(__file__)      # path to current file

# Running as script vs import
if __name__ == "__main__":
    # Only runs when script is executed directly
    main()
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q36. What is __name__ == "__main__"?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

The `if __name__ == "__main__":` guard prevents code from running when a module is imported.

```python
# my_script.py
def main():
    print("Running main logic")

def helper():
    print("Helper function")

if __name__ == "__main__":
    # Only runs when executing: python my_script.py
    main()

# When imported: import my_script
# helper() is available, but main() doesn't auto-run
```

```python
# __name__ values:
# - When run directly:   __name__ == "__main__"
# - When imported:       __name__ == "my_script"
```

**Best practice:** Always use this guard in reusable scripts so they're safe to import.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q37. How do you create classes in Python?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

```python
# Basic class
class Dog:
    # Class variable (shared by all instances)
    species = "Canis familiaris"

    # Constructor
    def __init__(self, name, age):
        # Instance variables
        self.name = name
        self.age = age

    # Instance method
    def bark(self):
        return f"{self.name} says Woof!"

    # String representation
    def __str__(self):
        return f"{self.name} ({self.age})"

    def __repr__(self):
        return f"Dog('{self.name}', {self.age})"

# Using the class
my_dog = Dog("Rex", 3)
print(my_dog.name)         # Rex
print(my_dog.bark())       # Rex says Woof!
print(my_dog)              # Rex (3)

# Class variable access
print(Dog.species)         # Canis familiaris
print(my_dog.species)      # Canis familiaris (inherited)
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q38. What is the difference between instance, class, and static methods?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

```python
class Example:
    class_var = "shared"

    def __init__(self, value):
        self.instance_var = value

    # Instance method — receives self (the instance)
    def instance_method(self):
        return f"Instance: {self.instance_var}"

    # Class method — receives cls (the class)
    @classmethod
    def class_method(cls):
        return f"Class: {cls.class_var}"

    # Static method — receives nothing
    @staticmethod
    def static_method(x, y):
        return x + y

obj = Example("hello")

obj.instance_method()   # "Instance: hello"
Example.class_method()  # "Class: shared"
Example.static_method(3, 4)  # 7
```

| Type | First param | Can access | When to use |
|------|------------|------------|-------------|
| **Instance method** | `self` | Instance & class vars | Most methods |
| **Class method** | `cls` | Class vars only | Factory methods, inheritance hooks |
| **Static method** | Nothing | Neither (just params) | Utility functions inside class |

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q39. What is inheritance in Python?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

```python
# Single inheritance
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "..."
    def move(self):
        return f"{self.name} moves"

class Dog(Animal):
    def speak(self):        # Override
        return "Woof!"

class Cat(Animal):
    def speak(self):
        return "Meow!"

dog = Dog("Rex")
print(dog.speak())       # Woof! (overridden)
print(dog.move())        # Rex moves (inherited)

# Using super()
class Puppy(Dog):
    def __init__(self, name, toy):
        super().__init__(name)  # Call parent constructor
        self.toy = toy

    def speak(self):
        return super().speak() + "!"  # Extend parent method

# isinstance / issubclass
isinstance(dog, Animal)    # True
issubclass(Dog, Animal)    # True
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q40. What is multiple inheritance in Python?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Python supports **multiple inheritance** — a class can inherit from multiple parent classes.

```python
class Flyer:
    def fly(self): return "Flying"

class Swimmer:
    def swim(self): return "Swimming"

class Duck(Flyer, Swimmer):
    def quack(self): return "Quack!"

d = Duck()
d.fly()        # "Flying"
d.swim()       # "Swimming"
d.quack()      # "Quack!"

# Method Resolution Order (MRO)
print(Duck.__mro__)
# (<class 'Duck'>, <class 'Flyer'>, <class 'Swimmer'>, <class 'object'>)

# Diamond problem — Python resolves via MRO (C3 linearization)
class A:
    def method(self): return "A"

class B(A):
    def method(self): return "B"

class C(A):
    def method(self): return "C"

class D(B, C):
    pass

d = D()
d.method()       # "B"
print(D.__mro__) # D → B → C → A → object
```

**MRO follows C3 linearization:** children first, then parents in order, then grandparents.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q41. What is encapsulation in Python?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**Encapsulation** hides internal state and requires all interaction through methods. Python uses naming conventions (no strict private):

```python
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner        # public
        self._balance = balance   # "protected" (convention only)
        self.__pin = "1234"       # "private" (name mangling)

    def deposit(self, amount):
        if amount > 0:
            self._balance += amount

    def withdraw(self, amount):
        if 0 < amount <= self._balance:
            self._balance -= amount
            return amount
        raise ValueError("Insufficient funds")

    def get_balance(self):
        return self._balance

# Name mangling for __double_underscore
# __pin becomes _BankAccount__pin
print(acc._BankAccount__pin)  # "1234" — still accessible but the name changes

# Properties — controlled access with attribute syntax
class Temperature:
    def __init__(self, celsius=0):
        self._celsius = celsius

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Below absolute zero")
        self._celsius = value

    @property
    def fahrenheit(self):
        return self._celsius * 9/5 + 32

t = Temperature(100)
print(t.celsius)       # 100 (getter)
t.celsius = 50         # uses setter
print(t.fahrenheit)    # 122.0 (computed property)
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q42. What are decorators in Python?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

A **decorator** is a function that takes another function and extends its behavior without modifying it.

```python
# Basic decorator
def timer(func):
    import time
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{func.__name__} took {elapsed:.4f}s")
        return result
    return wrapper

@timer               # same as: slow_function = timer(slow_function)
def slow_function():
    import time
    time.sleep(1)

slow_function()      # slow_function took 1.0002s

# Decorator with arguments
def repeat(n=2):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(n):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(n=3)
def say_hi():
    print("Hi!")

# Built-in decorators
@staticmethod
@classmethod
@property
@functools.lru_cache   # memoization
@dataclass              # auto-generates __init__, __repr__, etc.
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q43. What are generators in Python?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

A **generator** is a function that produces a sequence of values lazily using `yield`.

```python
# Generator function
def countdown(n):
    while n > 0:
        yield n           # pauses here, resumes on next next()
        n -= 1

for num in countdown(5):  # 5, 4, 3, 2, 1
    print(num)

# Generator for infinite sequences
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

fib = fibonacci()
[next(fib) for _ in range(10)]  # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

# Generator expressions
squares = (x**2 for x in range(10_000_000))  # lazy — no memory issue

# Pipelining generators
def read_large(file_path):
    with open(file_path) as f:
        for line in f:
            yield line.strip()

def filter_comments(lines):
    for line in lines:
        if not line.startswith("#"):
            yield line

def parse_csv(lines):
    for line in lines:
        yield line.split(",")

# Memory-efficient pipeline
processed = parse_csv(filter_comments(read_large("data.csv")))
for row in processed:
    process(row)

# Send values into generator (advanced)
def accumulator():
    total = 0
    while True:
        value = yield total
        if value is not None:
            total += value

acc = accumulator()
next(acc)          # 0
print(acc.send(5)) # 5
print(acc.send(3)) # 8
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q44. What is the difference between return and yield?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| Feature | `return` | `yield` |
|---------|----------|---------|
| **Function type** | Regular function | Generator function |
| **Returns** | Single value | Sequence of values |
| **Execution** | Ends function | Pauses, can resume |
| **State** | Resets | Preserved between calls |
| **Memory** | Eager | Lazy |

```python
# return — creates all values at once
def get_numbers():
    result = []
    for i in range(10):
        result.append(i)
    return result          # returns a list

# yield — produces values one at a time
def generate_numbers():
    for i in range(10):
        yield i            # pauses here

# Generator advantages:
# 1. Memory efficient (don't store all values)
# 2. Can represent infinite sequences
# 3. Can pipeline operations

# A function with both yield and return:
def get_items():
    yield 1
    yield 2
    return "done"          # stored in StopIteration.value

gen = get_items()
list(gen)                  # [1, 2]
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q45. What are iterators and iterables?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

An **iterable** is an object that can be looped over (has `__iter__()` or `__getitem__()`). An **iterator** is an object with `__next__()` that produces values.

```python
# Iterable (can be used in for loop)
my_list = [1, 2, 3]           # list is iterable
my_string = "hello"            # string is iterable

# Iterator (produces values one at a time)
iterator = iter(my_list)       # get iterator from iterable
next(iterator)                 # 1
next(iterator)                 # 2
next(iterator)                 # 3
# next(iterator)               # StopIteration

# Custom iterable
class Range:
    def __init__(self, start, end):
        self.start = start
        self.end = end

    def __iter__(self):
        return RangeIterator(self)

class RangeIterator:
    def __init__(self, range_obj):
        self.current = range_obj.start
        self.end = range_obj.end

    def __next__(self):
        if self.current >= self.end:
            raise StopIteration
        value = self.current
        self.current += 1
        return value

# Or simpler: make the class both iterable and iterator
class Range:
    def __init__(self, start, end):
        self.current = start
        self.end = end

    def __iter__(self):
        return self

    def __next__(self):
        if self.current >= self.end:
            raise StopIteration
        value = self.current
        self.current += 1
        return value

# for loop internally:
# 1. Calls iter(iterable) to get iterator
# 2. Repeatedly calls next(iterator)
# 3. Catches StopIteration
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q46. How do you read and write files in Python?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

```python
# Writing
with open("output.txt", "w") as f:     # 'w' overwrites
    f.write("Hello, World!\n")
    f.writelines(["line1\n", "line2\n"])

# Appending
with open("output.txt", "a") as f:     # 'a' appends
    f.write("Another line\n")

# Reading
with open("file.txt", "r") as f:
    content = f.read()                 # entire file
    lines = f.readlines()              # list of lines
    line = f.readline()                # single line

# Iterating over lines (memory efficient)
with open("large_file.txt") as f:
    for line in f:
        process(line)

# File modes
# 'r'  — read (default)
# 'w'  — write (overwrites)
# 'a'  — append
# 'r+' — read and write
# 'rb' — read binary
# 'wb' — write binary

# Binary files
with open("image.jpg", "rb") as f:
    data = f.read()

with open("output.bin", "wb") as f:
    f.write(data)
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q47. How do you work with JSON in Python?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

The `json` module handles JSON serialization/deserialization.

```python
import json

# Python → JSON string
data = {"name": "Alice", "age": 30, "scores": [1, 2, 3]}
json_str = json.dumps(data, indent=2)
print(json_str)

# JSON string → Python
parsed = json.loads(json_str)
parsed["name"]  # "Alice"

# Python → JSON file
with open("data.json", "w") as f:
    json.dump(data, f, indent=2)

# JSON file → Python
with open("data.json") as f:
    data = json.load(f)

# Type mapping
# Python          JSON
# dict      →     object
# list      →     array
# str       →     string
# int/float →     number
# True/False→     true/false
# None      →     null

# Custom serialization
from datetime import datetime

def json_serializer(obj):
    if isinstance(obj, datetime):
        return obj.isoformat()
    raise TypeError(f"Type {type(obj)} not serializable")

data = {"time": datetime.now()}
json.dumps(data, default=json_serializer)
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q48. How do you work with CSV files in Python?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

```python
import csv

# Reading
with open("data.csv") as f:
    reader = csv.reader(f)
    header = next(reader)   # skip header
    for row in reader:
        print(row[0], row[1])

# Reading as dictionaries (by header)
with open("data.csv") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row["name"], row["age"])

# Writing
with open("output.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["name", "age", "city"])
    writer.writerow(["Alice", 30, "NYC"])
    writer.writerows([
        ["Bob", 25, "LA"],
        ["Carol", 35, "Chicago"]
    ])

# Writing dictionaries
with open("output.csv", "w", newline="") as f:
    fieldnames = ["name", "age", "city"]
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerow({"name": "Alice", "age": 30, "city": "NYC"})
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q49. What is pip and virtual environments?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**pip** is Python's package installer. **Virtual environments** isolate project dependencies.

```bash
# pip commands
pip install requests           # install a package
pip install -r requirements.txt  # install from file
pip list                       # list installed packages
pip freeze > requirements.txt  # save dependencies

# Creating virtual environments (built-in since Python 3.3)
python -m venv venv
# Activate (Windows)
venv\Scripts\activate
# Activate (macOS/Linux)
source venv/bin/activate

# requirements.txt format
# requests==2.31.0
# numpy>=1.24.0
# flask<3.0

# Using Poetry (modern alternative)
# poetry add requests
# poetry install
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q50. What is the difference between deep copy and shallow copy?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

```python
import copy

original = {"name": "Alice", "scores": [1, 2, 3], "tags": {"a": 1}}

# Shallow copy — new object, but nested objects are shared references
shallow = copy.copy(original)
# or: shallow = dict(original)
# or: shallow = original.copy()
# or: shallow = {**original}

shallow["scores"].append(4)
print(original["scores"])   # [1, 2, 3, 4] — MUTATED! (shared reference)

# Deep copy — completely independent copy
deep = copy.deepcopy(original)
deep["scores"].append(5)
print(original["scores"])   # [1, 2, 3, 4] — unchanged ✅
print(deep["scores"])       # [1, 2, 3, 4, 5]

# When to use:
# Shallow: for flat objects, performance-critical code
# Deep: for nested structures, when full independence is needed
```

</div>
</details>

---

## 🟡 Medium (Q51–Q110)

<details class="qa-card qa-medium">
<summary>
Q51. How does Python's garbage collection work?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Python uses **reference counting** (primary) + **generational garbage collection** (for cycles).

**Reference counting:**
```python
import sys

x = []                    # refcount = 1
y = x                     # refcount = 2
print(sys.getrefcount(x)) # refcount = 3 (getrefcount adds 1)

del x                     # refcount = 1
del y                     # refcount = 0 → object collected immediately
```

**Circular references (where GC helps):**
```python
class Node:
    def __init__(self):
        self.ref = None

a = Node()
b = Node()
a.ref = b       # refcount: a=2, b=2
b.ref = a       # circular!

del a, b         # refcounts drop to 1 each (never reach 0)
# GC's cycle detector finds and collects these
```

**GC generations:**
- **Generation 0:** New objects (collected frequently)
- **Generation 1:** Survivors from Gen 0
- **Generation 2:** Survivors from Gen 1 (oldest, collected rarely)

```python
import gc

gc.get_threshold()    # (700, 10, 10) — thresholds per generation
gc.collect()          # manually trigger collection
gc.disable()          # disable GC (careful!)
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q52. What is the GIL (Global Interpreter Lock)?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

The **GIL** is a mutex that protects CPython's internal state, allowing only **one thread** to execute Python bytecode at a time (even on multi-core CPUs).

**Why it exists:**
- CPython's memory management isn't thread-safe
- Reference counting requires atomic operations
- Removing the GIL would slow single-threaded code

**Impact:**
- I/O-bound threads → work fine (GIL is released during I/O waits)
- CPU-bound threads → **no speedup** on multi-core (only one thread runs at a time)

```python
import threading
import time

def count(n):
    while n > 0:
        n -= 1

# CPU-bound: GIL prevents parallel execution
start = time.time()
t1 = threading.Thread(target=count, args=(50_000_000,))
t2 = threading.Thread(target=count, args=(50_000_000,))
t1.start(); t2.start()
t1.join(); t2.join()
print(f"Two threads: {time.time() - start:.2f}s")  # ~same as single thread

# vs multiprocessing (separate processes, separate GILs)
from multiprocessing import Process

p1 = Process(target=count, args=(50_000_000,))
p2 = Process(target=count, args=(50_000_000,))
p1.start(); p2.start()
p1.join(); p2.join()
print(f"Two processes: {time.time() - start:.2f}s")  # ~2x faster
```

**Workarounds:**
- `multiprocessing` — separate processes, separate GILs
- C extensions that release the GIL (NumPy, Cython)
- `asyncio` for I/O-bound concurrency
- `concurrent.futures.ThreadPoolExecutor` + C extensions

**Note:** CPython 3.13 adds a **free-threaded mode** (no GIL, experimental).

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q53. What is the difference between threading, multiprocessing, and asyncio?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| Feature | `threading` | `multiprocessing` | `asyncio` |
|---------|------------|-------------------|-----------|
| **Execution** | Concurrent (GIL) | Parallel (separate GILs) | Cooperative (single thread) |
| **CPU-bound** | Slow (GIL) | Fast (true parallel) | Slow (single thread) |
| **I/O-bound** | Fast | Overkill | Fastest (no OS thread cost) |
| **Memory** | Shared (race conditions!) | Separate (IPC needed) | Shared (no races) |
| **Startup** | Lightweight | Heavy (fork/spawn) | Lightest |
| **Complexity** | Medium (locks) | High (IPC/pickle) | Medium (async/await) |

```python
# When to use each:
# threading → I/O-bound with blocking calls (file, database)
# multiprocessing → CPU-bound computation (image processing, ML)
# asyncio → High-concurrency I/O (web servers, API calls)
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q54. What is asyncio and how does it work?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**asyncio** is Python's library for **async I/O** using cooperative multitasking via an event loop.

```python
import asyncio

async def fetch_data(url):
    print(f"Fetching {url}...")
    await asyncio.sleep(1)  # simulate network I/O
    return f"Data from {url}"

async def main():
    # Run tasks concurrently
    tasks = [
        fetch_data("https://api.example.com/1"),
        fetch_data("https://api.example.com/2"),
        fetch_data("https://api.example.com/3"),
    ]
    results = await asyncio.gather(*tasks)
    print(results)

# Run the event loop
asyncio.run(main())
# Total time: ~1 second (not 3!)
```

**Key concepts:**
- `async def` — defines a coroutine
- `await` — yields control back to event loop
- `asyncio.gather()` — run multiple coroutines concurrently
- Event loop — manages and schedules coroutines

**asyncio vs threading:**
- asyncio uses a **single thread** with cooperative multitasking
- No race conditions or locks needed
- Much lighter than threads (millions of coroutines vs thousands of threads)

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q55. What are context managers and how do you create custom ones?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

A **context manager** manages resources via `__enter__` and `__exit__` protocols, used with `with`.

```python
# Class-based context manager
class DatabaseConnection:
    def __enter__(self):
        self.conn = connect_to_db()
        return self.conn

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.conn.close()
        # Return True to suppress exceptions
        return False

with DatabaseConnection() as conn:
    conn.query("SELECT * FROM users")

# Using contextlib
from contextlib import contextmanager

@contextmanager
def timer():
    import time
    start = time.perf_counter()
    yield
    elapsed = time.perf_counter() - start
    print(f"Took {elapsed:.2f}s")

with timer():
    expensive_operation()

# contextlib utilities
from contextlib import suppress, closing, redirect_stdout

# Suppress specific exceptions
with suppress(FileNotFoundError):
    os.remove("temp.txt")

# Auto-close objects
with closing(open("file.txt")) as f:
    data = f.read()
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q56. What is functools and what are its key utilities?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**functools** provides higher-order functions for working with callables.

```python
import functools

# lru_cache — memoization
@functools.lru_cache(maxsize=128)
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# partial — fix arguments
def power(base, exp):
    return base ** exp

square = functools.partial(power, exp=2)
cube = functools.partial(power, exp=3)

square(5)  # 25
cube(3)    # 27

# reduce — accumulate
from functools import reduce
result = reduce(lambda a, b: a * b, [1, 2, 3, 4, 5])
# ((((1*2)*3)*4)*5) = 120

# wraps — preserve metadata in decorators
def decorator(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        """Wrapper doc"""
        return func(*args, **kwargs)
    return wrapper

@decorator
def my_func():
    """My func doc"""

print(my_func.__name__)  # 'my_func' (without wraps: 'wrapper')
print(my_func.__doc__)   # 'My func doc' (without wraps: 'Wrapper doc')

# singledispatch — single-dispatch generic functions
@functools.singledispatch
def process(arg):
    return f"Default: {arg}"

@process.register(int)
def _(arg):
    return f"Integer: {arg * 2}"

@process.register(str)
def _(arg):
    return f"String: {arg.upper()}"

print(process(42))      # "Integer: 84"
print(process("hello")) # "String: HELLO"
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q57. What is itertools and what are its key functions?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**itertools** provides iterator-building functions for efficient looping.

```python
import itertools

# count — infinite counter
for i in itertools.count(10, 2):  # 10, 12, 14, ...
    if i > 20: break

# cycle — infinitely repeat
colors = itertools.cycle(["red", "green", "blue"])
next(colors)  # 'red'
next(colors)  # 'green'

# repeat — repeat a value
list(itertools.repeat(5, 3))  # [5, 5, 5]

# chain — concatenate iterables
list(itertools.chain([1, 2], [3, 4], [5, 6]))  # [1, 2, 3, 4, 5, 6]

# product — cartesian product
list(itertools.product([1, 2], ["a", "b"]))
# [(1, 'a'), (1, 'b'), (2, 'a'), (2, 'b')]

# permutations — all orderings
list(itertools.permutations([1, 2, 3], 2))
# [(1, 2), (1, 3), (2, 1), (2, 3), (3, 1), (3, 2)]

# combinations — all combinations
list(itertools.combinations([1, 2, 3], 2))
# [(1, 2), (1, 3), (2, 3)]

# groupby — group consecutive elements
data = [("A", 1), ("A", 2), ("B", 3), ("B", 4)]
for key, group in itertools.groupby(data, key=lambda x: x[0]):
    print(key, list(group))
# A [(A,1), (A,2)]
# B [(B,3), (B,4)]

# islice — slice an iterator
list(itertools.islice(range(100), 5))  # [0, 1, 2, 3, 4]

# accumulate — running total
list(itertools.accumulate([1, 2, 3, 4, 5]))  # [1, 3, 6, 10, 15]
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q58. What is collections and what are its specialized containers?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**collections** provides specialized container datatypes.

```python
from collections import Counter, defaultdict, namedtuple, deque, OrderedDict, ChainMap

# Counter — count hashable objects
colors = ["red", "blue", "red", "green", "blue", "blue"]
count = Counter(colors)
# Counter({'blue': 3, 'red': 2, 'green': 1})
count.most_common(2)  # [('blue', 3), ('red', 2)]

# defaultdict — dict with default factory
dd = defaultdict(list)
dd["users"].append("Alice")  # no KeyError!
dd["users"].append("Bob")    # {'users': ['Alice', 'Bob']}

# namedtuple — lightweight immutable data class
Point = namedtuple("Point", ["x", "y"])
p = Point(10, 20)
p.x       # 10
p.y       # 20
x, y = p  # tuple unpacking

# deque — double-ended queue, O(1) append/pop at both ends
dq = deque([1, 2, 3])
dq.append(4)       # deque([1, 2, 3, 4])
dq.appendleft(0)   # deque([0, 1, 2, 3, 4])
dq.pop()           # 4
dq.popleft()       # 0

# OrderedDict — dict that remembers insertion order (maintained in Python 3.7+)
od = OrderedDict()
od["z"] = 1
od["a"] = 2
list(od.keys())    # ['z', 'a']

# ChainMap — combine multiple dicts
defaults = {"host": "localhost", "port": 8080}
overrides = {"port": 9090}
config = ChainMap(overrides, defaults)
config["host"]  # "localhost"
config["port"]  # 9090 (from overrides)
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q59. What are dataclasses in Python?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**dataclasses** (Python 3.7+) automatically generate `__init__`, `__repr__`, `__eq__`, and more.

```python
from dataclasses import dataclass, field, asdict

@dataclass
class User:
    name: str
    email: str
    age: int = 0
    active: bool = True
    tags: list = field(default_factory=list)  # mutable defaults need factory

# Auto-generated __init__
user = User("Alice", "alice@example.com", 30)
print(user)  # User(name='Alice', email='alice@example.com', age=30, active=True, tags=[])

# Auto-generated __eq__
user2 = User("Alice", "alice@example.com", 30)
print(user == user2)  # True

# Immutable dataclass
@dataclass(frozen=True)
class Point:
    x: float
    y: float

p = Point(1.0, 2.0)
# p.x = 3.0  # ❌ FrozenInstanceError

# Convert to dict
asdict(user)  # {'name': 'Alice', ...}

# Field metadata
@dataclass
class Product:
    name: str = field(metadata={"help": "Product name"})
    price: float = field(repr=False)  # excluded from __repr__

# Inheritance
@dataclass
class Employee(User):
    employee_id: str = ""
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q60. What are properties (@property) in Python?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**`@property`** allows defining methods that can be accessed like attributes, enabling computed attributes and controlled access.

```python
class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def radius(self):
        """Getter — called when accessing circle.radius"""
        return self._radius

    @radius.setter
    def radius(self, value):
        """Setter — called when assigning circle.radius = x"""
        if value < 0:
            raise ValueError("Radius cannot be negative")
        self._radius = value

    @radius.deleter
    def radius(self):
        """Deleter — called when del circle.radius"""
        print("Deleting radius")
        del self._radius

    @property
    def area(self):
        """Read-only computed property (no setter)"""
        return 3.14159 * self._radius ** 2

    @property
    def diameter(self):
        return self._radius * 2

c = Circle(5)
print(c.radius)     # 5 (getter)
print(c.area)       # 78.53975 (computed)
c.radius = 10       # uses setter
# c.area = 100      # ❌ AttributeError (read-only)
```

**Property vs getter/setter pattern:** Properties are Pythonic — they allow you to start with a simple attribute and later add validation without changing the interface.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q61. What are Abstract Base Classes (ABCs)?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**ABCs** define interfaces that subclasses must implement.

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self) -> float:
        pass

    @abstractmethod
    def perimeter(self) -> float:
        pass

    def description(self) -> str:
        """Concrete method — available to all shapes"""
        return f"Area: {self.area():.2f}, Perimeter: {self.perimeter():.2f}"

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self) -> float:
        return self.width * self.height

    def perimeter(self) -> float:
        return 2 * (self.width + self.height)

# s = Shape()  # ❌ TypeError (can't instantiate ABC)
r = Rectangle(3, 4)
print(r.area())           # 12
print(r.description())    # "Area: 12.00, Perimeter: 14.00"

# Abstract properties
class Drawable(ABC):
    @property
    @abstractmethod
    def color(self) -> str:
        pass

# Register external classes
import collections
collections.abc.Sequence.register(list)  # list is now a Sequence
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q62. What are magic/dunder methods in Python?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Magic methods** (double underscore methods) enable operator overloading and protocol implementation.

```python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    # String representations
    def __str__(self):           # str(), print()
        return f"({self.x}, {self.y})"
    def __repr__(self):          # repr(), debugging
        return f"Vector({self.x}, {self.y})"

    # Arithmetic
    def __add__(self, other):    # +
        return Vector(self.x + other.x, self.y + other.y)
    def __sub__(self, other):    # -
        return Vector(self.x - other.x, self.y - other.y)
    def __mul__(self, scalar):   # *
        return Vector(self.x * scalar, self.y * scalar)
    def __truediv__(self, s):    # /
        return Vector(self.x / s, self.y / s)

    # Comparison
    def __eq__(self, other):     # ==
        return self.x == other.x and self.y == other.y
    def __lt__(self, other):     # < (also enables sorted())
        return (self.x**2 + self.y**2) < (other.x**2 + other.y**2)

    # Container emulation
    def __getitem__(self, key):  # obj[key]
        return (self.x, self.y)[key]
    def __len__(self):           # len()
        return 2

    # Callable
    def __call__(self):          # obj()
        return f"Vector({self.x}, {self.y}) called!"

    # Context manager
    def __enter__(self):
        print("Entering context")
        return self
    def __exit__(self, *args):
        print("Exiting context")

v1 = Vector(1, 2)
v2 = Vector(3, 4)
print(v1 + v2)          # (4, 6)
print(v1 * 3)           # (3, 6)
print(v1 == Vector(1, 2))  # True
print(v1[0])            # 1
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q63. What is __slots__ in Python?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**`__slots__`** restricts attribute creation and reduces memory usage by eliminating the instance `__dict__`.

```python
class WithoutSlots:
    def __init__(self, x, y):
        self.x = x
        self.y = y

class WithSlots:
    __slots__ = ("x", "y")
    def __init__(self, x, y):
        self.x = x
        self.y = y

# Memory comparison
import sys
wos = WithoutSlots(1, 2)
ws = WithSlots(1, 2)
print(sys.getsizeof(wos))  # ~56 bytes (with __dict__)
print(sys.getsizeof(ws))   # ~40 bytes (without __dict__)

# WithSlots restricts attribute creation
ws.z = 3  # ❌ AttributeError: 'WithSlots' object has no attribute 'z'

# __slots__ is inherited but child classes need their own __slots__
class Child(WithSlots):
    __slots__ = ("z",)

c = Child(1, 2)
c.z = 3  # ✅
```

**When to use:** Performance-critical code creating millions of objects.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q64. What is monkey patching in Python?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Monkey patching** is dynamically modifying classes or modules at runtime.

```python
class Dog:
    def bark(self):
        return "Woof!"

# Monkey patch a method
def howl(self):
    return "Howl!"

Dog.howl = howl  # Add method to class
Dog.bark = lambda self: "Bark!"  # Replace method

d = Dog()
print(d.bark())  # "Bark!" (patched)
print(d.howl())  # "Howl!" (added)

# Monkey patch an instance
d2 = Dog()
d2.bark = lambda: "Quack!"
print(d2.bark())  # "Quack!" (only this instance)

# Real-world use: fixing library bugs at runtime
import some_library
some_library.buggy_function = fixed_function

# Use with caution — makes code harder to debug
# Better alternatives: dependency injection, subclassing, decorators
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q65. What are type hints and the typing module?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Type hints** (Python 3.5+) enable optional static type checking.

```python
from typing import List, Dict, Tuple, Optional, Union, Any, Callable, TypeVar, Generic

# Basic type hints
def greet(name: str) -> str:
    return f"Hello, {name}"

# Collections
def process(items: List[int]) -> Dict[str, int]:
    return {str(i): i for i in items}

# Optional and Union
def find_user(user_id: int) -> Optional[Dict[str, Any]]:
    # Returns None if not found
    pass

def handle(value: Union[int, str]) -> None:
    print(value)

# Callable
def apply(func: Callable[[int, int], int], a: int, b: int) -> int:
    return func(a, b)

# TypeVar — generics
T = TypeVar("T")
def first(items: List[T]) -> T:
    return items[0]

# Generic classes
class Stack(Generic[T]):
    def __init__(self):
        self._items: List[T] = []

    def push(self, item: T) -> None:
        self._items.append(item)

    def pop(self) -> T:
        return self._items.pop()

# Type aliases
Vector = List[float]
Matrix = List[Vector]

# Literal types (3.8+)
from typing import Literal
def set_mode(mode: Literal["read", "write", "append"]) -> None:
    pass

# TypedDict (3.8+)
from typing import TypedDict
class User(TypedDict):
    name: str
    age: int
    email: Optional[str]
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q66. What are regular expressions in Python?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

The **`re`** module provides regular expression operations.

```python
import re

# Matching
pattern = r"\d{3}-\d{3}-\d{4}"
text = "Call me at 555-123-4567 or 555-987-6543"

match = re.search(pattern, text)
if match:
    print(match.group())     # "555-123-4567"

# Find all matches
matches = re.findall(pattern, text)
# ['555-123-4567', '555-987-6543']

# Iterate over matches
for match in re.finditer(pattern, text):
    print(match.start(), match.end())

# Groups
pattern = r"(\d{3})-(\d{3})-(\d{4})"
match = re.search(pattern, text)
print(match.group(0))   # "555-123-4567" (full match)
print(match.group(1))   # "555" (area code)
print(match.groups())   # ('555', '123', '4567')

# Named groups
pattern = r"(?P<area>\d{3})-(?P<exchange>\d{3})-(?P<number>\d{4})"
match = re.search(pattern, text)
print(match.group("area"))  # "555"

# Substitution
result = re.sub(r"\d", "X", "Phone: 555-1234")
# "Phone: XXX-XXXX"

# Splitting
result = re.split(r"[,;]\s*", "a, b; c, d")
# ['a', 'b', 'c', 'd']

# Compilation (for performance)
phone_re = re.compile(r"\d{3}-\d{3}-\d{4}")
phone_re.findall(text)

# Common flags
# re.IGNORECASE — case insensitive
# re.MULTILINE — ^ and $ match line boundaries
# re.DOTALL — . matches newlines
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q67. How do you work with dates and times in Python?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

The **`datetime`** module provides date and time handling.

```python
from datetime import datetime, date, time, timedelta, timezone

# Current time
now = datetime.now()                    # local time
utc_now = datetime.now(timezone.utc)    # UTC time

# Creating dates
d = date(2024, 12, 25)                 # 2024-12-25
t = time(14, 30, 0)                    # 14:30:00
dt = datetime(2024, 6, 27, 14, 30, 0)  # 2024-06-27 14:30:00

# Formatting
dt.strftime("%Y-%m-%d %H:%M:%S")       # "2024-06-27 14:30:00"
dt.strftime("%A, %B %d")               # "Thursday, June 27"

# Parsing
parsed = datetime.strptime("2024-06-27", "%Y-%m-%d")

# Arithmetic
today = date.today()
yesterday = today - timedelta(days=1)
next_week = today + timedelta(weeks=1)
diff = next_week - today               # timedelta(days=7)

# Timezone handling
from zoneinfo import ZoneInfo          # Python 3.9+
ny_tz = ZoneInfo("America/New_York")
ny_time = datetime.now(ny_tz)

# Timestamps
timestamp = dt.timestamp()             # Unix timestamp
dt_from_ts = datetime.fromtimestamp(timestamp)

# ISO format
dt.isoformat()                         # "2024-06-27T14:30:00"
datetime.fromisoformat("2024-06-27T14:30:00")

# dateutil (third-party, more powerful)
# pip install python-dateutil
# from dateutil.parser import parse
# parse("June 27, 2024 2:30 PM")
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q68. What are the os and sys modules?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**`os`** — operating system interface. **`sys`** — Python interpreter interface.

```python
import os
import sys

# os module
os.getcwd()           # current working directory
os.chdir("/path")     # change directory
os.listdir(".")       # list files in directory
os.mkdir("new_dir")   # create directory
os.makedirs("a/b/c")  # create nested directories
os.remove("file.txt") # delete file
os.rename("old", "new")  # rename
os.path.exists("file.txt")  # check existence
os.path.isfile("file.txt")  # is it a file?
os.path.isdir("dir")    # is it a directory?
os.path.join("a", "b", "c")  # 'a/b/c' (platform-aware)
os.path.basename("/path/to/file.txt")  # 'file.txt'
os.path.dirname("/path/to/file.txt")   # '/path/to'
os.environ.get("HOME")  # environment variables
os.walk(".")            # recursive directory traversal

# sys module
sys.version            # Python version string
sys.platform           # 'win32', 'linux', 'darwin'
sys.argv               # command-line arguments
sys.path               # module search paths
sys.exit(0)            # exit program
sys.getsizeof(obj)     # memory size of object
sys.getrecursionlimit()  # max recursion depth
sys.setrecursionlimit(2000)  # set recursion limit
sys.stdin.readline()   # read from stdin
sys.stdout.write("hello")  # write to stdout
sys.modules            # dictionary of loaded modules
sys.implementation     # Python implementation info
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q69. What is pathlib?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**pathlib** (Python 3.4+) provides object-oriented filesystem paths.

```python
from pathlib import Path

# Create paths
p = Path("/home/user/docs/file.txt")
p = Path("docs") / "file.txt"       # path joining with /
p = Path.home() / "docs" / "file.txt"
p = Path.cwd() / "file.txt"

# Properties
p.name          # 'file.txt'
p.stem          # 'file'
p.suffix        # '.txt'
p.parent        # Path('docs')
p.parents       # all parents (generator)
p.root          # '/'
p.anchor        # '/'

# Checking
p.exists()      # True/False
p.is_file()     # True/False
p.is_dir()      # True/False
p.stat()        # file stats (size, modification time, etc.)

# Reading/Writing
p.read_text()           # read entire file as string
p.read_bytes()          # read as bytes
p.write_text("hello")   # write string
p.write_bytes(b"data")  # write bytes

# Directory operations
p.mkdir()               # create directory
p.mkdir(parents=True, exist_ok=True)  # mkdir -p
p.rmdir()               # remove empty directory
p.unlink()              # delete file
p.rename("new_name.txt")

# Iteration
for child in Path(".").iterdir():
    print(child.name)

for py_file in Path(".").glob("*.py"):
    print(py_file)

for py_file in Path(".").rglob("**/*.py"):
    print(py_file)

# Path manipulation
p.with_name("new.txt")   # change filename
p.with_suffix(".md")     # change extension
p.relative_to("/home")   # 'user/docs/file.txt'
p.resolve()              # absolute canonical path
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q70. How do you use logging in Python?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

The **`logging`** module provides a flexible logging framework.

```python
import logging

# Basic configuration
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    filename="app.log",
    filemode="a"
)

# Logging levels (increasing severity)
logging.debug("Debug message")      # 10 — diagnostic
logging.info("Info message")        # 20 — confirmation
logging.warning("Warning message")  # 30 — something unexpected
logging.error("Error message")      # 40 — serious problem
logging.critical("Critical!")      # 50 — program may crash

# Logger per module
logger = logging.getLogger(__name__)
logger.info("Module-specific log")

# Logging to both file and console
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

file_handler = logging.FileHandler("app.log")
console_handler = logging.StreamHandler()

formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
file_handler.setFormatter(formatter)
console_handler.setFormatter(formatter)

logger.addHandler(file_handler)
logger.addHandler(console_handler)

# Exception logging
try:
    1 / 0
except ZeroDivisionError:
    logger.exception("Division error occurred")  # includes traceback
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q71. What is unit testing in Python?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Python has **`unittest`** (built-in) and **`pytest`** (third-party, more popular).

```python
# unittest
import unittest

def add(a, b):
    return a + b

class TestMath(unittest.TestCase):
    def test_add(self):
        self.assertEqual(add(2, 3), 5)
        self.assertEqual(add(-1, 1), 0)

    def test_add_floats(self):
        self.assertAlmostEqual(add(0.1, 0.2), 0.3, places=5)

    def test_raises(self):
        with self.assertRaises(TypeError):
            add("a", 1)

if __name__ == "__main__":
    unittest.main()
```

```python
# pytest (more Pythonic)
# pip install pytest

def test_add():
    assert add(2, 3) == 5
    assert add(-1, 1) == 0

def test_add_floats():
    assert add(0.1, 0.2) == pytest.approx(0.3)

# Fixtures
@pytest.fixture
def user():
    return {"name": "Alice", "age": 30}

def test_user_name(user):
    assert user["name"] == "Alice"

# Parametrized tests
@pytest.mark.parametrize("a,b,expected", [
    (1, 2, 3),
    (0, 0, 0),
    (-1, 1, 0),
])
def test_add_params(a, b, expected):
    assert add(a, b) == expected

# Run: pytest test_file.py -v
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q72. What is the difference between pip freeze and pip list?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| Command | Output Format | Use Case |
|---------|--------------|----------|
| `pip list` | Table with version | Human-readable view |
| `pip freeze` | `package==version` format | For `requirements.txt` |
| `pip list --outdated` | Lists outdated packages | Updates |

```bash
# pip list — human-readable table
$ pip list
Package    Version
---------- -------
click      8.1.3
flask      2.3.0

# pip freeze — for requirements.txt
$ pip freeze
click==8.1.3
flask==2.3.0

# Save dependencies
pip freeze > requirements.txt

# Install from requirements
pip install -r requirements.txt

# pip list also shows pip, setuptools, wheel (pip freeze hides them)
# pip freeze includes dependencies installed via editable installs (-e)
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q73. What is pyproject.toml and how is it different from setup.py?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**`pyproject.toml`** (PEP 517/518/621) is the modern Python project configuration standard.

```toml
# pyproject.toml
[build-system]
requires = ["setuptools>=64", "wheel"]
build-backend = "setuptools.backends._legacy:Backend"

[project]
name = "my-package"
version = "1.0.0"
description = "My awesome package"
requires-python = ">=3.8"
dependencies = [
    "requests>=2.28",
    "click>=8.0",
]

[project.optional-dependencies]
dev = ["pytest", "black", "flake8"]
```

| Feature | `setup.py` | `pyproject.toml` |
|---------|-----------|------------------|
| **Format** | Python code | TOML (declarative) |
| **Modern** | Legacy | Current standard |
| **Executable** | Can run arbitrary code | Declarative only |
| **Tool config** | Separate files | Can include tool configs |

```python
# setup.py (legacy but still common)
from setuptools import setup

setup(
    name="my-package",
    version="1.0.0",
    install_requires=["requests>=2.28"],
)
```

**Best practice:** Use `pyproject.toml` for new projects.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q74. What is the exception hierarchy in Python?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Python's exception hierarchy:

```
BaseException
├── SystemExit
├── KeyboardInterrupt
├── GeneratorExit
└── Exception
    ├── StopIteration
    ├── ArithmeticError
    │   ├── FloatingPointError
    │   ├── OverflowError
    │   └── ZeroDivisionError
    ├── AssertionError
    ├── AttributeError
    ├── EOFError
    ├── ImportError
    │   └── ModuleNotFoundError
    ├── LookupError
    │   ├── IndexError
    │   └── KeyError
    ├── NameError
    │   └── UnboundLocalError
    ├── OSError
    │   ├── FileNotFoundError
    │   ├── PermissionError
    │   └── TimeoutError
    ├── TypeError
    ├── ValueError
    └── RuntimeError
        └── NotImplementedError
```

```python
# Catching rules
try:
    risky_operation()
except Exception:  # catches all exceptions (not SystemExit/KeyboardInterrupt)
    pass

# Order matters — more specific first
try:
    value = int("abc")
except ValueError:          # specific first
    print("Bad value")
except TypeError:           # then other specific
    print("Bad type")
except Exception:           # catch-all last
    print("Something else")
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q75. What are closures in Python?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

A **closure** is a function that retains access to variables from its enclosing scope even after that scope has finished executing.

```python
def make_multiplier(factor):
    def multiplier(x):
        return x * factor  # 'factor' is captured from outer scope
    return multiplier

double = make_multiplier(2)
triple = make_multiplier(3)

print(double(5))  # 10
print(triple(5))  # 15

# Check closure variables
print(double.__closure__[0].cell_contents)  # 2
print(triple.__closure__[0].cell_contents)  # 3

# Counter using closure
def make_counter():
    count = 0
    def counter():
        nonlocal count  # required to modify captured variable
        count += 1
        return count
    return counter

counter_a = make_counter()
counter_b = make_counter()

print(counter_a())  # 1
print(counter_a())  # 2
print(counter_b())  # 1 (independent)

# Closure conditions (all 3 required):
# 1. Nested function
# 2. References a non-global variable from enclosing scope
# 3. Enclosing function returns the nested function
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q76. What are partial functions?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**`functools.partial`** creates a new function with some arguments pre-filled.

```python
from functools import partial

# Original function
def power(base, exp):
    return base ** exp

# Create specialized functions
square = partial(power, exp=2)
cube = partial(power, exp=3)

print(square(5))  # 25
print(cube(3))    # 27

# With multiple fixed arguments
def connect(host, port, timeout, ssl):
    print(f"Connecting to {host}:{port} (timeout={timeout}, ssl={ssl})")

connect_local = partial(connect, host="localhost", timeout=30, ssl=False)
connect_local(port=8080)    # Connecting to localhost:8080 (timeout=30, ssl=False)

# Sorting with custom key
from operator import itemgetter
users = [("Alice", 30), ("Bob", 25), ("Carol", 35)]
get_age = partial(itemgetter, 1)
sorted(users, key=get_age)  # [('Bob', 25), ('Alice', 30), ('Carol', 35)]

# Preserving metadata
print(square.__name__)  # 'power' (not 'square')
print(square.func)      # original function
print(square.args)      # ()
print(square.keywords)  # {'exp': 2}
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q77. What are map, filter, and reduce?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**`map`**, **`filter`**, and **`reduce`** are functional programming tools.

```python
from functools import reduce

# map — transform each element
nums = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x ** 2, nums))
# [1, 4, 9, 16, 25]

# Multiple iterables
list(map(lambda a, b: a + b, [1, 2, 3], [10, 20, 30]))
# [11, 22, 33]

# filter — keep elements that match condition
evens = list(filter(lambda x: x % 2 == 0, nums))
# [2, 4]

# filter with None removes falsy values
list(filter(None, [0, 1, "", "hello", [], [1]]))
# [1, 'hello', [1]]

# reduce — accumulate
product = reduce(lambda a, b: a * b, nums)
# ((((1*2)*3)*4)*5) = 120

# With initial value
total = reduce(lambda a, b: a + b, nums, 0)
# 15

# Modern alternative: list comprehensions (more Pythonic)
# map → [x**2 for x in nums]
# filter → [x for x in nums if x % 2 == 0]
# reduce → sum(product(nums) for...)
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q78. What are enumerate and zip?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**`enumerate`** adds a counter to an iterable. **`zip`** combines multiple iterables.

```python
# enumerate
fruits = ["apple", "banana", "cherry"]
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")
# 0: apple
# 1: banana
# 2: cherry

# Start at different number
for i, fruit in enumerate(fruits, start=1):
    print(f"{i}. {fruit}")
# 1. apple
# 2. banana
# 3. cherry

# zip
names = ["Alice", "Bob", "Carol"]
ages = [30, 25, 35]
cities = ["NYC", "LA", "Chicago"]

for name, age, city in zip(names, ages, cities):
    print(f"{name} is {age} from {city}")
# Alice is 30 from NYC
# Bob is 25 from LA
# Carol is 35 from Chicago

# zip to dict
user_dict = dict(zip(names, ages))
# {'Alice': 30, 'Bob': 25, 'Carol': 35}

# zip with unequal lengths (stops at shortest)
list(zip([1, 2, 3], ["a", "b"]))  # [(1, 'a'), (2, 'b')]

# zip_longest (fill missing)
from itertools import zip_longest
list(zip_longest([1, 2, 3], ["a", "b"], fillvalue="?"))
# [(1, 'a'), (2, 'b'), (3, '?')]

# Unzipping
pairs = [(1, 'a'), (2, 'b'), (3, 'c')]
nums, letters = zip(*pairs)
# nums = (1, 2, 3), letters = ('a', 'b', 'c')
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q79. What are any() and all()?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**`any()`** returns `True` if at least one element is truthy. **`all()`** returns `True` if all elements are truthy.

```python
# any — at least one True
any([False, True, False])    # True
any([False, False, False])   # False
any([])                      # False (vacuously)

# all — all True
all([True, True, True])      # True
all([True, False, True])     # False
all([])                      # True (vacuously)

# Practical examples
def has_adults(ages):
    return any(age >= 18 for age in ages)

def all_positive(numbers):
    return all(x > 0 for x in numbers)

# Validation
required_fields = ["name", "email", "age"]
data = {"name": "Alice", "email": "a@b.com", "age": 30}
all(data.get(field) for field in required_fields)  # True

# Short-circuit evaluation
def expensive_check():
    print("Running expensive check")
    return True

any([False, expensive_check()])   # expensive_check runs
any([True, expensive_check()])    # expensive_check does NOT run (short-circuits)
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q80. What is the LEGB rule for variable scope?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**LEGB** defines the order Python searches for variable names:

1. **L**ocal — inside the current function
2. **E**nclosing — outer functions (if nested)
3. **G**lobal — module level
4. **B**uilt-in — Python's built-in names

```python
x = "global"        # Global scope

def outer():
    x = "enclosing"  # Enclosing scope

    def inner():
        x = "local"  # Local scope
        print(x)

    inner()
    print(x)

outer()
print(x)
# Output:
# local
# enclosing
# global

# Modifying scoped variables
count = 0           # Global

def increment():
    global count    # Must declare global to modify
    count += 1

def outer():
    x = 10

    def inner():
        nonlocal x  # Must declare nonlocal to modify enclosing
        x += 1
        return x

    return inner()

# Variable resolution
print(len("hello"))  # len is built-in, "hello" is local
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q81. What is the difference between `is` and `==`?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| Operator | Checks | Use for |
|----------|--------|---------|
| `is` | Object identity (same memory address) | Singleton comparisons |
| `==` | Value equality (via `__eq__`) | Most comparisons |

```python
# is — identity
a = [1, 2, 3]
b = [1, 2, 3]
c = a

a == b  # True (same values)
a is b  # False (different objects)
a is c  # True (same object)

# is with singletons (None, True, False)
x = None
x is None      # ✅ correct
x is not None  # ✅ correct

# Integer caching (small integers -5 to 256 are cached)
a = 256
b = 256
a is b  # True (cached)

a = 257
b = 257
a is b  # False (not cached, separate objects)

# String interning (small strings may be cached)
a = "hello_world"
b = "hello_world"
a is b  # True (Python interns some strings)

# When to use what
x == 10      # ✅ value comparison
x is None    # ✅ identity check for singleton
x == None    # ❌ works but not idiomatic
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q82. What are the different string formatting methods?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Python has four string formatting methods:

```python
name = "Alice"
age = 30
pi = 3.14159

# 1. %-formatting (old style)
"Name: %s, Age: %d" % (name, age)
"Pi: %.2f" % pi              # "Pi: 3.14"

# 2. str.format() (Python 2.6+)
"Name: {}, Age: {}".format(name, age)
"Pi: {:.2f}".format(pi)
"Name: {name}, Age: {age}".format(name="Bob", age=25)

# 3. f-strings (Python 3.6+) — RECOMMENDED
f"Name: {name}, Age: {age}"
f"Pi: {pi:.2f}"
f"Hex: {255:#x}"            # "0xff"
f"Percent: {0.85:.1%}"      # "85.0%"
f"Align: {name:>10}"        # "     Alice"

# 4. Template strings (safe for user input)
from string import Template
t = Template("Hello $name, you are $age")
t.substitute(name="Alice", age=30)
```

| Method | Readable | Safe | Modern | Performance |
|--------|----------|------|--------|-------------|
| `%` | Poor | No | Legacy | Fast |
| `.format()` | Medium | No | Old | Medium |
| **f-strings** | **Best** | No | **✅** | **Fastest** |
| `Template` | Medium | **Yes** | Niche | Slow |

**Best practice:** Use f-strings for almost everything.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q83. What is the difference between isinstance() and type()?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| Feature | `isinstance()` | `type()` |
|---------|---------------|----------|
| **Inheritance** | ✅ Considers inheritance | ❌ Exact type only |
| **Multiple types** | ✅ `isinstance(x, (A, B))` | ❌ Single type |
| **Return** | `bool` | Type object |

```python
class Animal: pass
class Dog(Animal): pass

d = Dog()

# isinstance — checks inheritance
isinstance(d, Dog)      # True
isinstance(d, Animal)   # True (inheritance!)
isinstance(d, (Animal, list))  # True (multiple types)

# type — exact match only
type(d) == Dog          # True
type(d) == Animal       # False (exact type is Dog, not Animal)

# When to use what:
# isinstance → check if object is instance of a class (polymorphism)
# type → check if object is exactly a specific type (rare)

# Edge cases
isinstance(True, int)   # True (bool is subclass of int)
type(True) == int       # False
isinstance(1, bool)     # False
type(1) == int          # True

# Best practice: prefer isinstance (handles inheritance)
def process(value):
    if isinstance(value, str):
        return value.upper()
    elif isinstance(value, (int, float)):
        return value * 2
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q84. What are eval, exec, and ast.literal_eval?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| Function | Usage | Security | Returns |
|----------|-------|----------|---------|
| `eval()` | Evaluate single expression | ❌ Dangerous | Result |
| `exec()` | Execute statements | ❌ Dangerous | `None` |
| `ast.literal_eval()` | Evaluate literals | ✅ Safe | Result |

```python
import ast

# eval — evaluates a single expression
result = eval("2 + 3 * 4")          # 14
eval("print('hello')")              # ❌ Dangerous with user input!
# eval("__import__('os').system('rm -rf /')")  # Disastrous!

# exec — executes statements
exec("x = 10\ny = 20\nz = x + y")
print(z)  # 30

# ast.literal_eval — safe, only literal values
ast.literal_eval("[1, 2, 3]")       # [1, 2, 3]
ast.literal_eval("{'a': 1, 'b': 2}")  # {'a': 1, 'b': 2}
ast.literal_eval("True")            # True
ast.literal_eval("None")            # None
# ast.literal_eval("__import__('os')")  # ❌ ValueError (safe!)

# Safe parsing of user input
def parse_user_input(text):
    try:
        return ast.literal_eval(text)
    except (ValueError, SyntaxError):
        return text  # treat as string
```

**Rule:** Never use `eval()` or `exec()` with untrusted input!

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q85. What are hasattr, getattr, and setattr?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**`getattr`**, **`setattr`**, and **`hasattr`** provide dynamic attribute access.

```python
class User:
    def __init__(self, name, age):
        self.name = name
        self.age = age

user = User("Alice", 30)

# hasattr — check if attribute exists
hasattr(user, "name")       # True
hasattr(user, "email")      # False

# getattr — get attribute value
getattr(user, "name")       # "Alice"
getattr(user, "email")      # AttributeError
getattr(user, "email", "N/A")  # "N/A" (default)

# setattr — set attribute value
setattr(user, "age", 31)
setattr(user, "email", "alice@example.com")

# Practical: serialization
def to_dict(obj):
    return {attr: getattr(obj, attr)
            for attr in dir(obj)
            if not attr.startswith("_")}

# Practical: dynamic dispatch
def call_method(obj, method_name, *args):
    if hasattr(obj, method_name):
        method = getattr(obj, method_name)
        return method(*args)
    raise AttributeError(f"No method {method_name}")

# dict-style attribute access
class Config:
    def __init__(self, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)

config = Config(host="localhost", port=8080)
print(config.host)  # "localhost"
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q86. What is __str__ vs __repr__?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| Method | For | Goal | Fallback |
|--------|-----|------|----------|
| `__repr__` | Developers | Unambiguous, detailed | — |
| `__str__` | Users | Readable, friendly | Falls back to `__repr__` |

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def __repr__(self):
        """Unambiguous — should ideally recreate the object"""
        return f"Person('{self.name}', {self.age})"

    def __str__(self):
        """Readable — for end users"""
        return f"{self.name} ({self.age} years old)"

p = Person("Alice", 30)

print(p)           # Alice (30 years old)  → __str__
print(str(p))      # Alice (30 years old)  → __str__
print(repr(p))     # Person('Alice', 30)   → __repr__
f"{p}"             # Alice (30 years old)  → __str__
f"{p!r}"           # Person('Alice', 30)   → __repr__ (forced)

# In collections
print([p])         # [Person('Alice', 30)] → uses __repr__
print({"user": p}) # {'user': Person('Alice', 30)} → uses __repr__

# Best practice: always define __repr__, then __str__ if needed
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q87. How does Python manage memory?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Python uses a **private heap** managed by the memory manager.

```python
# Stack vs Heap
def example():
    x = 42          # x is on stack (reference), 42 is on heap (object)
    y = [1, 2, 3]   # y is on stack, [1, 2, 3] is on heap
    return y

# Memory allocation
import sys

# Small objects
print(sys.getsizeof(42))          # 28 bytes
print(sys.getsizeof("hello"))     # 54 bytes

# Collections
print(sys.getsizeof([]))          # 56 bytes (overhead)
print(sys.getsizeof([1, 2, 3]))   # 88 bytes (56 + 3*8 for pointers)

# Memory pools — CPython uses arenas (256KB), pools (4KB), blocks
# Objects < 512 bytes use pre-allocated pools for speed

# Garbage collection
import gc
print(gc.get_count())     # (collection count per generation)
print(gc.get_threshold()) # when to trigger collections

# Memory optimization
# 1. Use __slots__ to reduce per-object memory
# 2. Use generators for large sequences
# 3. Use array('i') or numpy for numeric arrays
# 4. Use weakref for caches and observers

# id() — memory address (CPython)
a = [1, 2, 3]
print(id(a))  # memory address (changes between runs)
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q88. What are weak references in Python?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**`weakref`** allows referencing an object without increasing its reference count, enabling the object to be garbage collected.

```python
import weakref

class ExpensiveObject:
    def __init__(self, name):
        self.name = name
        print(f"Created {name}")

    def __del__(self):
        print(f"Destroyed {self.name}")

# Strong reference — keeps object alive
obj = ExpensiveObject("test")

# Weak reference — doesn't prevent garbage collection
weak = weakref.ref(obj)
print(weak())    # <__main__.ExpensiveObject object at ...>
print(weak() is obj)  # True

# Delete strong reference
del obj
print(weak())    # None (object was collected!)

# WeakValueDictionary — cache that doesn't prevent GC
cache = weakref.WeakValueDictionary()

class Data:
    def __init__(self, id):
        self.id = id

data = Data(42)
cache[data.id] = data
print(cache[42])  # <__main__.Data object at ...>

del data
print(42 in cache)  # False (automatically removed!)

# Use cases:
# 1. Caches (no memory leaks)
# 2. Observer pattern
# 3. Avoiding circular references
# 4. GUI widget references
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q89. What are Named Tuples and how are they different from regular tuples?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Named tuples** are immutable, lightweight data containers with field names.

```python
from collections import namedtuple

# Creating named tuple
Point = namedtuple("Point", ["x", "y"])
# or: Point = namedtuple("Point", "x y")
# or: Point = namedtuple("Point", "x, y")

p = Point(10, 20)

# Access by name
print(p.x)       # 10
print(p.y)       # 20

# Access by index (like regular tuple)
print(p[0])      # 10
print(p[1])      # 20

# Unpacking
x, y = p

# Immutability
# p.x = 30       # ❌ AttributeError

# Methods
p._asdict()             # {'x': 10, 'y': 20}
p._replace(x=30)        # Point(x=30, y=20) — returns new instance
Point._make([1, 2])     # Point(x=1, y=2) — from iterable
Point._fields           # ('x', 'y')

# Default values
Point = namedtuple("Point", ["x", "y", "z"], defaults=[0])
Point(1, 2)             # Point(x=1, y=2, z=0)

# Docstrings
Point = namedtuple("Point", ["x", "y"])
Point.__doc__ = "2D Point coordinate"
Point.x.__doc__ = "X coordinate"
```

**Named Tuple vs Dataclass:**
| Feature | Named Tuple | Dataclass |
|---------|------------|-----------|
| Mutability | Immutable | Mutable (default) |
| Memory | Lighter | Slightly heavier |
| Inheritance | No | Yes |
| Type hints | No (pre-3.6) | Yes |
| Methods | `_asdict()`, `_replace()` | `asdict()`, `replace()` (3.11+) |

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q90. What is the difference between list, array, and numpy array?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| Feature | `list` | `array.array` | `numpy.ndarray` |
|---------|--------|---------------|-----------------|
| **Types** | Mixed | Homogeneous | Homogeneous |
| **Speed** | Slow | Fast | Very fast (C) |
| **Memory** | High (pointers) | Low (compact) | Low + optimizations |
| **Operations** | Python loops | Python loops | Vectorized (C) |
| **Built-in** | ✅ Yes | ✅ Yes | ❌ Third-party |

```python
# list — flexible, mixed types
py_list = [1, "hello", 3.14]
py_list.append(True)

# array.array — typed, memory efficient
from array import array
arr = array("i", [1, 2, 3, 4, 5])  # 'i' = signed int
arr.append(6)

# numpy — vectorized operations
import numpy as np
np_arr = np.array([1, 2, 3, 4, 5])
result = np_arr * 2  # [2, 4, 6, 8, 10] — fast, C-level loop

# Performance comparison
import time

size = 10_000_000

# Python list (slow)
py_list = list(range(size))
start = time.time()
result = [x * 2 for x in py_list]
print(f"List: {time.time() - start:.2f}s")  # ~0.5s

# numpy (very fast)
np_arr = np.arange(size)
start = time.time()
result = np_arr * 2
print(f"NumPy: {time.time() - start:.2f}s")  # ~0.02s
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q91. How do you work with environment variables in Python?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

```python
import os
from dotenv import load_dotenv  # pip install python-dotenv

# Get environment variable
db_host = os.environ.get("DB_HOST")  # returns None if missing
db_port = os.environ.get("DB_PORT", "5432")  # with default

# Get with error
db_password = os.environ["DB_PASSWORD"]  # KeyError if missing

# Set environment variable
os.environ["MY_VAR"] = "value"

# Check if exists
if "DB_HOST" in os.environ:
    print("DB_HOST is set")

# List all
for key, value in os.environ.items():
    print(f"{key}={value}")

# .env file (with python-dotenv)
# .env file:
# DB_HOST=localhost
# DB_PORT=5432
# DB_PASSWORD=secret123

load_dotenv()  # loads .env file

# Delete
del os.environ["MY_VAR"]

# Typed values (all env vars are strings)
port = int(os.environ.get("PORT", 8080))
debug = os.environ.get("DEBUG", "false").lower() == "true"

# Best practices:
# 1. Use environment variables for configuration
# 2. NEVER commit secrets to version control
# 3. Use .env files locally (add to .gitignore)
# 4. Use python-dotenv for development
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q92. How do you parse command-line arguments in Python?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

```python
import sys
import argparse

# Method 1: sys.argv (basic)
script = sys.argv[0]
args = sys.argv[1:]  # list of arguments
# python script.py --name Alice --age 30

# Method 2: argparse (recommended)
import argparse

parser = argparse.ArgumentParser(description="My awesome script")

# Positional argument
parser.add_argument("input", help="Input file path")

# Optional arguments
parser.add_argument("-o", "--output", help="Output file path")
parser.add_argument("-v", "--verbose", action="store_true", help="Verbose mode")
parser.add_argument("--count", type=int, default=1, help="Number of times")
parser.add_argument("--name", choices=["Alice", "Bob"], help="Pick a name")

args = parser.parse_args()

print(args.input)     # positional
print(args.output)    # optional
print(args.verbose)   # True/False
print(args.count)     # int

# Method 3: click (third-party, popular)
# pip install click

import click

@click.command()
@click.argument("input")
@click.option("--output", "-o", help="Output file")
@click.option("--verbose", "-v", is_flag=True)
@click.option("--count", default=1, type=int)
def process(input, output, verbose, count):
    """Process INPUT file."""
    click.echo(f"Processing {input}")

if __name__ == "__main__":
    process()
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q93. What is the timeit module?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**`timeit`** measures execution time of small code snippets.

```python
import timeit

# Measure a statement
time = timeit.timeit('"-".join(str(n) for n in range(100))', number=10000)
print(f"Time: {time:.4f}s")

# Measure a function
def test():
    return sum(range(1000))

time = timeit.timeit(test, number=100000)
print(f"Time: {time:.4f}s")

# Using timeit in Jupyter/IPython:
# %timeit sum(range(1000))

# Compare approaches
setup = "nums = list(range(1000))"

list_comp = timeit.timeit("[x**2 for x in nums]", setup=setup, number=10000)
map_lambda = timeit.timeit("list(map(lambda x: x**2, nums))", setup=setup, number=10000)

print(f"List comprehension: {list_comp:.4f}s")
print(f"map + lambda: {map_lambda:.4f}s")

# repeat — multiple samples
results = timeit.repeat(
    "[x**2 for x in nums]",
    setup="nums = list(range(1000))",
    repeat=5,
    number=1000
)
print(f"Best: {min(results):.4f}s, Worst: {max(results):.4f}s")

# Cache comparison
cache_setup = """
import functools

@functools.lru_cache(maxsize=None)
def fib_cached(n):
    if n < 2: return n
    return fib_cached(n-1) + fib_cached(n-2)
"""

no_cache = timeit.timeit("fib_cached(30)", setup=cache_setup, number=100)
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q94. What is the traceback module?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

The **`traceback`** module provides utilities for working with tracebacks.

```python
import traceback
import sys

# Print current exception
try:
    1 / 0
except ZeroDivisionError:
    traceback.print_exc()  # prints to stderr
    # or: traceback.print_exc(file=sys.stdout)

# Get traceback as string
try:
    int("abc")
except ValueError:
    tb_str = traceback.format_exc()
    print(tb_str)  # string format of traceback

# Print stack (without exception)
def func_a():
    func_b()

def func_b():
    func_c()

def func_c():
    traceback.print_stack()  # prints current call stack

func_a()

# Extract and format
try:
    open("nonexistent.txt")
except FileNotFoundError:
    exc_type, exc_value, exc_tb = sys.exc_info()
    frames = traceback.extract_tb(exc_tb)
    for frame in frames:
        print(f"File: {frame.filename}, Line: {frame.lineno}, Func: {frame.name}")

# Custom traceback formatting
def format_exception(e):
    return "".join(traceback.format_exception(type(e), e, e.__traceback__))
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q95. What are Python Enums?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**`Enum`** (Python 3.4+) defines symbolic names bound to unique values.

```python
from enum import Enum, auto, IntEnum, unique

# Basic enum
class Color(Enum):
    RED = 1
    GREEN = 2
    BLUE = 3

# Access
Color.RED                # <Color.RED: 1>
Color.RED.name           # 'RED'
Color.RED.value          # 1
Color(1)                 # <Color.RED: 1> (reverse lookup)
Color["RED"]             # <Color.RED: 1>

# Iteration
for color in Color:
    print(color.name, color.value)

# Auto values
class Status(Enum):
    PENDING = auto()      # 1
    ACTIVE = auto()       # 2
    INACTIVE = auto()     # 3

# Unique values decorator
@unique
class HttpStatus(Enum):
    OK = 200
    NOT_FOUND = 404
    INTERNAL_ERROR = 500
    # CREATED = 200  # ❌ ValueError (duplicate!)

# IntEnum — behaves like int
class Priority(IntEnum):
    LOW = 1
    MEDIUM = 5
    HIGH = 10

Priority.HIGH > Priority.LOW  # True
Priority.HIGH == 10            # True

# String enum
class Direction(str, Enum):
    NORTH = "N"
    SOUTH = "S"
    EAST = "E"
    WEST = "W"

# Methods and properties
class Planet(Enum):
    MERCURY = (3.3e23, 2.4e6)
    VENUS = (4.87e24, 6.05e6)
    EARTH = (5.97e24, 6.37e6)

    def __init__(self, mass, radius):
        self.mass = mass  # in kg
        self.radius = radius  # in meters

    @property
    def surface_gravity(self):
        G = 6.674e-11
        return G * self.mass / (self.radius ** 2)

Planet.EARTH.surface_gravity  # 9.8 m/s²
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q96. What is functools.wraps and why is it important?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**`functools.wraps`** preserves metadata (name, docstring, signature) when writing decorators.

```python
from functools import wraps

# Without wraps — metadata is lost
def my_decorator(func):
    def wrapper(*args, **kwargs):
        """Wrapper function"""
        print(f"Calling {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

@my_decorator
def add(a, b):
    """Add two numbers."""
    return a + b

print(add.__name__)  # 'wrapper' (wrong!)
print(add.__doc__)   # 'Wrapper function' (wrong!)

# With wraps — metadata is preserved
def my_decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        """Wrapper function"""
        print(f"Calling {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

@my_decorator
def add(a, b):
    """Add two numbers."""
    return a + b

print(add.__name__)  # 'add' ✅
print(add.__doc__)   # 'Add two numbers.' ✅
print(add.__wrapped__)  # original function

# wraps also copies __module__, __qualname__, __annotations__, __dict__
# and updates __wrapped__ attribute

# Always use @wraps when writing decorators!
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q97. What is functools.singledispatch?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**`singledispatch`** enables generic functions that operate differently based on the **first argument's type**.

```python
from functools import singledispatch

@singledispatch
def process(value):
    """Default handler"""
    return f"Unknown type: {type(value).__name__}"

@process.register(int)
def _(value):
    return f"Integer: {value * 2}"

@process.register(str)
def _(value):
    return f"String: {value.upper()}"

@process.register(list)
def _(value):
    return f"List: {[process(item) for item in value]}"

@process.register(float)
def _(value):
    return f"Float: {value:.2f}"

@process.register(bool)  # Note: bool is subclass of int
def _(value):
    return f"Bool: {value}"

print(process(42))       # "Integer: 84"
print(process("hello"))  # "String: HELLO"
print(process([1, 2, 3]))  # "List: ['Integer: 2', 'Integer: 4', 'Integer: 6']"
print(process(3.14))     # "Float: 3.14"
print(process(True))     # "Bool: True" (more specific wins over int)

# Stacking decorators
@process.register(dict)
@process.register(tuple)
def _(value):
    return f"Container: {len(value)} items"

print(process({"a": 1}))  # "Container: 1 items"
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q98. What is the defaultdict and how is it different from regular dict?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**`defaultdict`** provides a default value for missing keys, avoiding `KeyError`.

```python
from collections import defaultdict

# Regular dict — KeyError on missing key
d = {}
# d["missing"]  # KeyError!

# defaultdict with default factory
# Most common factories:
dd = defaultdict(list)    # [] for missing keys
dd = defaultdict(int)     # 0
dd = defaultdict(set)     # set()
dd = defaultdict(str)     # ""
dd = defaultdict(dict)    # {}
dd = defaultdict(lambda: "N/A")  # custom default

# Practical examples

# Group items
words = ["apple", "banana", "apricot", "cherry", "avocado"]
by_first = defaultdict(list)
for word in words:
    by_first[word[0]].append(word)
# {'a': ['apple', 'apricot', 'avocado'], 'b': ['banana'], 'c': ['cherry']}

# Counting
data = ["red", "blue", "red", "green", "blue", "red"]
counter = defaultdict(int)
for color in data:
    counter[color] += 1
# {'red': 3, 'blue': 2, 'green': 1}

# Nested defaultdicts
nested = defaultdict(lambda: defaultdict(list))
nested["users"]["Alice"].append("item1")
nested["users"]["Bob"].append("item2")

# Tree structure
def tree():
    return defaultdict(tree)

tree = tree()
tree["path"]["to"]["value"] = 42
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q99. What is the Counter class?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**`Counter`** is a dict subclass for counting hashable objects.

```python
from collections import Counter

# Creating counters
counter = Counter(["a", "b", "c", "a", "b", "a"])
# Counter({'a': 3, 'b': 2, 'c': 1})

counter = Counter("abracadabra")
# Counter({'a': 5, 'b': 2, 'r': 2, 'c': 1, 'd': 1})

counter = Counter(a=3, b=1, c=2)

# Access
counter["a"]       # 5
counter["z"]       # 0 (no KeyError!)
counter.most_common(2)  # [('a', 5), ('b', 2)]
counter.total()         # Python 3.10+ — total count: 11

# Elements (iterator, repeats for each count)
list(Counter("aab").elements())  # ['a', 'a', 'b']

# Arithmetic
c1 = Counter(a=3, b=1)
c2 = Counter(a=1, b=2, c=1)

c1 + c2  # Counter({'a': 4, 'b': 3, 'c': 1}) — add counts
c1 - c2  # Counter({'a': 2}) — subtract (keeps positive)
c1 & c2  # Counter({'a': 1, 'b': 1}) — intersection (min)
c1 | c2  # Counter({'a': 3, 'b': 2, 'c': 1}) — union (max)

# Update
counter.update(["d", "a"])  # add counts
counter.subtract(["a", "b"])  # subtract counts

# Common patterns
def is_anagram(s1, s2):
    return Counter(s1) == Counter(s2)

# top N frequent items
from heapq import nlargest
nlargest(3, counter, key=counter.get)
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q100. What is deque and why use it?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**`deque`** (double-ended queue) provides O(1) append/pop at both ends.

```python
from collections import deque

# Creation
dq = deque([1, 2, 3])
dq = deque(maxlen=5)  # fixed-size buffer

# O(1) operations at both ends
dq.append(4)           # add to right: deque([1, 2, 3, 4])
dq.appendleft(0)       # add to left: deque([0, 1, 2, 3, 4])
dq.pop()               # 4 (from right)
dq.popleft()           # 0 (from left)

# Comparison with list
# list: pop(0) = O(n), insert(0, x) = O(n)
# deque: popleft() = O(1), appendleft(x) = O(1)

# Rotation
dq = deque([1, 2, 3, 4, 5])
dq.rotate(2)           # deque([4, 5, 1, 2, 3]) — right rotation
dq.rotate(-1)          # deque([5, 1, 2, 3, 4]) — left rotation

# Fixed-size buffer (maxlen)
buffer = deque(maxlen=3)
for i in range(10):
    buffer.append(i)
# deque([7, 8, 9], maxlen=3) — oldest items dropped automatically

# Practical uses:
# 1. Queue for BFS
# 2. Sliding window
# 3. Undo/redo operations
# 4. Round-robin scheduling
# 5. Fixed-size history

# BFS example
def bfs(graph, start):
    visited = set()
    queue = deque([start])
    visited.add(start)

    while queue:
        vertex = queue.popleft()
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q101. What are OrderedDict and ChainMap?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**`OrderedDict`** remembers insertion order. **`ChainMap`** groups multiple dictionaries.

```python
from collections import OrderedDict, ChainMap

# OrderedDict
od = OrderedDict()
od["z"] = 1
od["a"] = 2
od["c"] = 3
od["b"] = 4

list(od.keys())  # ['z', 'a', 'c', 'b'] (insertion order preserved)

# Important methods
od.move_to_end("z")      # move 'z' to end
od.move_to_end("z", last=False)  # move 'z' to beginning
od.popitem(last=True)    # LIFO (pop last)
od.popitem(last=False)   # FIFO (pop first)

# Note: Regular dicts also preserve insertion order since Python 3.7
# OrderedDict still useful for:
# - explicit ordering intent
# - move_to_end / popitem methods
# - equality checks that consider order

# ChainMap — combine multiple dicts
defaults = {"host": "localhost", "port": 8080, "debug": False}
user_config = {"port": 9090}
env_vars = {"debug": True}

# Priority: env_vars > user_config > defaults
config = ChainMap(env_vars, user_config, defaults)
print(config["host"])   # "localhost" (from defaults)
print(config["port"])   # 8080 (from... wait, env_vars doesn't have port)
                        # user_config has port=9090, but env_vars doesn't have port

# Actually let me redo:
c1 = {"a": 1, "b": 2}
c2 = {"b": 3, "c": 4}
chain = ChainMap(c1, c2)
chain["a"]  # 1 (from c1)
chain["b"]  # 3 (from c1 — first match wins!)
chain["c"]  # 4 (from c2)

# Mutation affects only the first dict
chain["d"] = 5  # adds to c1

# new_child — add a new dict at front
new_chain = chain.new_child({"e": 6})
# ChainMap({'e': 6}, {'a': 1, 'b': 3}, {'b': 3, 'c': 4})
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q102. How do you work with the json module for custom serialization?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

```python
import json
from datetime import datetime, date
from decimal import Decimal
from pathlib import Path

# Custom encoder
class CustomEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        if isinstance(obj, date):
            return obj.isoformat()
        if isinstance(obj, Decimal):
            return float(obj)
        if isinstance(obj, Path):
            return str(obj)
        if isinstance(obj, set):
            return list(obj)
        if isinstance(obj, bytes):
            return obj.decode("utf-8")
        return super().default(obj)

data = {
    "name": "Alice",
    "registered": datetime.now(),
    "birth": date(1994, 3, 15),
    "salary": Decimal("75000.50"),
    "path": Path("/home/user"),
    "tags": {"python", "developer"},
}

json_str = json.dumps(data, cls=CustomEncoder, indent=2)

# Custom decoder
def custom_decoder(dct):
    for key, value in dct.items():
        if isinstance(value, str):
            # Try to parse ISO dates
            try:
                dct[key] = datetime.fromisoformat(value)
            except (ValueError, TypeError):
                pass
    return dct

data_back = json.loads(json_str, object_hook=custom_decoder)

# JSON Lines (each line is a JSON object)
with open("data.jsonl", "w") as f:
    for item in items:
        f.write(json.dumps(item) + "\n")

with open("data.jsonl") as f:
    items = [json.loads(line) for line in f]
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q103. What is the warnings module?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

The **`warnings`** module issues non-fatal alerts to developers.

```python
import warnings

# Basic warning
warnings.warn("This function is deprecated, use new_function() instead")

# Warning categories
warnings.warn("Deprecated", DeprecationWarning)
warnings.warn("User warning", UserWarning)
warnings.warn("Syntax will change", FutureWarning)
warnings.warn("Module might not exist", ImportWarning)
warnings.warn("Internal detail", RuntimeWarning)

# In a function
def old_function():
    warnings.warn(
        "old_function() is deprecated, use new_function()",
        DeprecationWarning,
        stacklevel=2  # points to caller, not this line
    )
    return new_function()

# Filter warnings
warnings.filterwarnings("ignore")           # ignore all
warnings.filterwarnings("once")             # show each warning once
warnings.filterwarnings("error")            # treat as error
warnings.filterwarnings("default")          # reset to default

# Specific filter
warnings.filterwarnings("ignore", category=DeprecationWarning)
warnings.filterwarnings("error", message=".*specific.*")

# Context manager
with warnings.catch_warnings():
    warnings.filterwarnings("ignore")
    result = risky_function()

# Suppress third-party warnings
import urllib3
warnings.filterwarnings("ignore", category=urllib3.exceptions.InsecureRequestWarning)

# Creating custom warnings
class MyCustomWarning(UserWarning):
    pass

warnings.warn("Custom warning", MyCustomWarning)
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q104. How do you use the subprocess module?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

The **`subprocess`** module spawns new processes and connects to their I/O.

```python
import subprocess
import sys

# Run command, capture output
result = subprocess.run(
    ["echo", "Hello, World!"],
    capture_output=True,
    text=True,
    check=False
)
print(result.stdout)   # "Hello, World!\n"
print(result.returncode)  # 0

# With shell=True (caution: security risk with user input)
result = subprocess.run("echo Hello", shell=True, capture_output=True, text=True)

# Check return code (raises CalledProcessError if non-zero)
result = subprocess.run(["ls", "nonexistent"], capture_output=True, text=True, check=True)

# PIPE — stream output
result = subprocess.run(
    ["python", "-c", "print('hello')"],
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    text=True
)

# subprocess.Popen — advanced control
process = subprocess.Popen(
    ["ping", "-c", "4", "google.com"],
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    text=True
)

# Stream output line by line
for line in process.stdout:
    print(line.strip())

# Wait for completion
return_code = process.wait()

# Timeout
try:
    result = subprocess.run(["sleep", "10"], timeout=5)
except subprocess.TimeoutExpired:
    print("Command timed out")

# Environment variables
env = {"PATH": "/usr/bin", "CUSTOM_VAR": "value"}
result = subprocess.run(["echo", "$CUSTOM_VAR"], env=env, shell=True, capture_output=True, text=True)
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q105. What is the shutil module?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**`shutil`** provides high-level file operations.

```python
import shutil
import os

# Copy files
shutil.copy("source.txt", "dest.txt")           # copy file
shutil.copy2("source.txt", "dest.txt")          # copy + preserve metadata
shutil.copyfile("src.txt", "dst.txt")           # copy content only (no perms)

# Copy directories
shutil.copytree("src_dir", "dst_dir")           # recursive copy
shutil.copytree("src", "dst", ignore=shutil.ignore_patterns("*.pyc", "__pycache__"))

# Move/rename
shutil.move("source.txt", "archive/")           # move to directory
shutil.move("old.txt", "new.txt")               # rename

# Delete directories
shutil.rmtree("temp_dir")                       # remove directory tree

# Disk usage
usage = shutil.disk_usage("/")
print(f"Total: {usage.total // (1024**3)}GB")
print(f"Free: {usage.free // (1024**3)}GB")

# Archive operations
shutil.make_archive("backup", "zip", "source_dir")  # create zip
shutil.unpack_archive("backup.zip", "extract_dir")  # extract

# Find files
shutil.which("python")  # '/usr/bin/python' or None

# get_terminal_size
columns, lines = shutil.get_terminal_size()

# Chown (Unix)
# shutil.chown("file.txt", user="alice", group="staff")

# Copy with progress
def copy_with_progress(src, dst):
    total = os.path.getsize(src)
    copied = 0
    with open(src, "rb") as fin, open(dst, "wb") as fout:
        while True:
            chunk = fin.read(8192)
            if not chunk:
                break
            fout.write(chunk)
            copied += len(chunk)
            print(f"Progress: {copied/total*100:.0f}%", end="\r")
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q106. How do you work with temporary files and directories?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

The **`tempfile`** module generates temporary files and directories.

```python
import tempfile
import os

# Temporary file (auto-deleted when closed)
with tempfile.TemporaryFile(mode="w+t") as f:
    f.write("Hello, temp file!")
    f.seek(0)
    print(f.read())  # "Hello, temp file!"
# File is deleted here

# Named temporary file (visible in filesystem)
with tempfile.NamedTemporaryFile(delete=True, suffix=".txt", prefix="prefix_") as f:
    print(f.name)  # '/tmp/prefix_abc123.txt'
    f.write(b"data")
# File deleted when closed

# Keep the file after closing
with tempfile.NamedTemporaryFile(delete=False) as f:
    temp_path = f.name
    f.write(b"data")

# Manually delete later
os.unlink(temp_path)

# Temporary directory
with tempfile.TemporaryDirectory() as tmp_dir:
    print(tmp_dir)  # '/tmp/tmpabc123/'
    file_path = os.path.join(tmp_dir, "test.txt")
    with open(file_path, "w") as f:
        f.write("data")
# Directory and contents auto-deleted

# Get temp directory location
print(tempfile.gettempdir())  # '/tmp' or similar

# mkstemp — low-level, returns (fd, path)
fd, path = tempfile.mkstemp(suffix=".txt")
try:
    with os.fdopen(fd, "w") as f:
        f.write("data")
    print(path)
finally:
    os.unlink(path)
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q107. What is the hashlib module?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**`hashlib`** provides secure hash and message digest algorithms.

```python
import hashlib

# Common hash algorithms
data = b"Hello, Python!"

# SHA-256 (most common, secure)
hash_obj = hashlib.sha256(data)
print(hash_obj.hexdigest())  # 64 hex characters

# MD5 (legacy, not secure for crypto)
hash_obj = hashlib.md5(data)
print(hash_obj.hexdigest())  # 32 hex characters

# SHA-1 (legacy, not secure)
hash_obj = hashlib.sha1(data)

# Update incrementally
hash_obj = hashlib.sha256()
hash_obj.update(b"Hello, ")
hash_obj.update(b"Python!")
print(hash_obj.hexdigest())  # same as hashlib.sha256(b"Hello, Python!")

# File hashing (chunked for large files)
def hash_file(filepath, algorithm="sha256"):
    h = hashlib.new(algorithm)
    with open(filepath, "rb") as f:
        while True:
            chunk = f.read(8192)  # read in 8KB chunks
            if not chunk:
                break
            h.update(chunk)
    return h.hexdigest()

# Available algorithms
print(hashlib.algorithms_guaranteed)  # always available
print(hashlib.algorithms_available)   # available on this platform

# Password hashing (use dedicated library: bcrypt, argon2, hashlib.pbkdf2)
import os
salt = os.urandom(16)
dk = hashlib.pbkdf2_hmac("sha256", b"password", salt, 100000)
print(dk.hex())

# SHA-3 (Python 3.6+)
hash_obj = hashlib.sha3_256(data)
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q108. How do you use the socket module?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

The **`socket`** module provides low-level network communication.

```python
import socket

# TCP Client
def tcp_client():
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.connect(("example.com", 80))
    sock.send(b"GET / HTTP/1.1\r\nHost: example.com\r\n\r\n")
    response = sock.recv(4096)
    print(response.decode())
    sock.close()

# TCP Server
def tcp_server():
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    server.bind(("localhost", 8080))
    server.listen(5)
    print("Server listening on port 8080...")

    while True:
        client, addr = server.accept()
        print(f"Connected by {addr}")
        data = client.recv(1024)
        client.send(b"Hello, client!")
        client.close()

# UDP
def udp_client():
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.sendto(b"Hello", ("localhost", 9999))
    data, addr = sock.recvfrom(1024)

# DNS lookup
ip = socket.gethostbyname("google.com")
print(ip)  # "142.250.190.78"

# Host info
hostname = socket.gethostname()
print(hostname)

# Timeout
sock = socket.socket()
sock.settimeout(5)  # 5 seconds
try:
    sock.connect(("example.com", 80))
except socket.timeout:
    print("Connection timed out")

# Non-blocking
sock.setblocking(False)
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q109. How do you work with the threading module?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

The **`threading`** module provides thread-based concurrency.

```python
import threading
import time

# Creating threads
def worker(name, delay):
    print(f"Worker {name} starting")
    time.sleep(delay)
    print(f"Worker {name} done")

threads = []
for i in range(3):
    t = threading.Thread(target=worker, args=(i, i))
    threads.append(t)
    t.start()

# Wait for all threads
for t in threads:
    t.join()

print("All threads done")

# Thread with return value (use Queue)
from queue import Queue

def worker_with_result(q, name, delay):
    time.sleep(delay)
    q.put(f"Result from {name}")

q = Queue()
threads = []
for i in range(3):
    t = threading.Thread(target=worker_with_result, args=(q, i, i))
    threads.append(t)
    t.start()

for t in threads:
    t.join()

while not q.empty():
    print(q.get())

# Thread safety with Lock
counter = 0
lock = threading.Lock()

def increment():
    global counter
    for _ in range(100000):
        with lock:
            counter += 1

threads = [threading.Thread(target=increment) for _ in range(4)]
for t in threads: t.start()
for t in threads: t.join()
print(counter)  # 400000 (without lock, would be < 400000)

# RLock — reentrant lock (same thread can acquire multiple times)
rlock = threading.RLock()

# Semaphore — limit concurrent access
semaphore = threading.Semaphore(3)

def limited_worker():
    with semaphore:
        print("Working...")
        time.sleep(1)

# Event — signal between threads
event = threading.Event()

def waiter():
    print("Waiting for event...")
    event.wait()
    print("Event received!")

def signaler():
    time.sleep(1)
    event.set()

# Daemon threads — exit when main thread exits
t = threading.Thread(target=worker, args=(99, 10), daemon=True)
t.start()
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q110. What are thread-safe queues and why use them?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

The **`queue`** module provides thread-safe FIFO, LIFO, and priority queues.

```python
from queue import Queue, LifoQueue, PriorityQueue
import threading
import time

# FIFO Queue (default)
q = Queue(maxsize=10)  # maxsize=0 for unlimited

# Basic operations
q.put("item1")
q.put("item2", block=True, timeout=5)  # waits up to 5s if full
item = q.get()              # blocks if empty
item = q.get(block=False)   # raises queue.Empty if empty
item = q.get(timeout=3)     # waits up to 3s
q.task_done()               # signal task completion
q.join()                    # wait until all tasks done

# Producer-Consumer pattern
def producer(q, items):
    for item in items:
        q.put(item)
        print(f"Produced: {item}")
        time.sleep(0.1)

def consumer(q):
    while True:
        item = q.get()
        if item is None:  # sentinel to stop
            q.task_done()
            break
        print(f"Consumed: {item}")
        time.sleep(0.2)
        q.task_done()

q = Queue()
items = [f"item-{i}" for i in range(10)]

prod = threading.Thread(target=producer, args=(q, items))
cons = threading.Thread(target=consumer, args=(q,))

prod.start()
cons.start()

prod.join()
q.put(None)  # signal consumer to stop
cons.join()

# LIFO Queue (stack)
lifo = LifoQueue()
lifo.put("first")
lifo.put("second")
lifo.get()  # 'second'

# Priority Queue
pq = PriorityQueue()
pq.put((3, "low priority"))
pq.put((1, "high priority"))
pq.put((2, "medium priority"))

while not pq.empty():
    print(pq.get()[1])
# high priority → medium priority → low priority
```

</div>
</details>

---

## 🔴 Hard (Q111–Q155)

<details class="qa-card qa-hard">
<summary>
Q111. What are metaclasses in Python?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

A **metaclass** is a class of a class — it defines how a class behaves. In Python, `type` is the default metaclass.

```python
# type creates classes dynamically
MyClass = type("MyClass", (), {"attr": 42})
obj = MyClass()
print(obj.attr)  # 42

# Custom metaclass
class SingletonMeta(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]

class Singleton(metaclass=SingletonMeta):
    def __init__(self):
        print("Creating instance")

s1 = Singleton()  # "Creating instance"
s2 = Singleton()  # no print — same instance
print(s1 is s2)   # True

# Metaclass for validation
class ValidateAttributes(type):
    def __new__(mcs, name, bases, namespace):
        if name != "BaseModel":
            if "id" not in namespace and not any("id" in b.__dict__ for b in bases):
                raise TypeError(f"{name} must have an 'id' attribute")
        return super().__new__(mcs, name, bases, namespace)

class BaseModel(metaclass=ValidateAttributes):
    pass

class User(BaseModel):
    id = 1  # ✅

# class Product(BaseModel):  # ❌ TypeError — no 'id'

# Metaclass hooks:
# __new__ — called before class creation
# __init__ — called after class creation
# __call__ — called when class is instantiated

# Use cases: ORMs (SQLAlchemy), validation (Pydantic), singletons
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q112. What are descriptors in Python?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

A **descriptor** is an object that defines `__get__`, `__set__`, or `__delete__` to customize attribute access. Descriptors power `@property`, `@staticmethod`, `@classmethod`, and `__slots__`.

```python
class ValidatedAttribute:
    def __init__(self, validator):
        self.validator = validator
        self.data = {}

    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        return self.data.get(id(obj), None)

    def __set__(self, obj, value):
        self.validator(value)
        self.data[id(obj)] = value

    def __delete__(self, obj):
        del self.data[id(obj)]

def positive_number(value):
    if not isinstance(value, (int, float)) or value <= 0:
        raise ValueError("Must be a positive number")

class Product:
    price = ValidatedAttribute(positive_number)

    def __init__(self, name, price):
        self.name = name
        self.price = price  # calls descriptor __set__

p = Product("Widget", 9.99)
print(p.price)  # 9.99 (calls descriptor __get__)
# p.price = -5  # ❌ ValueError

# Descriptor types:
# 1. Data descriptor: defines __get__ AND __set__ (highest priority)
# 2. Non-data descriptor: defines __get__ only (lower priority)

# Property implementation using descriptors
class Property:
    def __init__(self, getter, setter=None):
        self.getter = getter
        self.setter = setter

    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        return self.getter(obj)

    def __set__(self, obj, value):
        if self.setter is None:
            raise AttributeError("Can't set attribute")
        self.setter(obj, value)

# The descriptor protocol: __set_name__ (Python 3.6+)
class LoggedAttribute:
    def __set_name__(self, owner, name):
        self.name = name  # captures the attribute name

    def __get__(self, obj, objtype=None):
        print(f"Accessing {self.name}")
        return obj.__dict__.get(self.name)

    def __set__(self, obj, value):
        print(f"Setting {self.name} = {value}")
        obj.__dict__[self.name] = value
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q113. How do coroutines with yield from work?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**`yield from`** (Python 3.3+) delegates to a subgenerator, allowing coroutine chaining.

```python
# Basic yield from
def subgen():
    yield 1
    yield 2
    yield 3

def main():
    yield "start"
    yield from subgen()  # delegates to subgen
    yield "end"

list(main())  # ['start', 1, 2, 3, 'end']

# Yield from with send
def accumulate():
    total = 0
    while True:
        value = yield total
        if value is not None:
            total += value

def main():
    acc = accumulate()
    yield from acc

gen = main()
next(gen)          # 0
gen.send(10)       # 10
gen.send(5)        # 15

# Yield from with return value
def subgen():
    yield 1
    yield 2
    return "done"

def main():
    result = yield from subgen()
    print(f"Subgen returned: {result}")

list(main())  # prints "Subgen returned: done"

# Use cases:
# 1. Refactoring generators
# 2. Composing generator-based coroutines
# 3. Flat iteration instead of nested loops

# Without yield from (nested loop):
def flatten_nested(nested):
    for sublist in nested:
        for item in sublist:
            yield item

# With yield from:
def flatten_nested(nested):
    for sublist in nested:
        yield from sublist
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q114. How do async generators and async comprehensions work?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Async generators** (Python 3.6+) use `async for` and `yield` together.

```python
import asyncio

# Async generator
async def async_range(n):
    for i in range(n):
        await asyncio.sleep(0.1)  # simulate async work
        yield i

async def main():
    async for num in async_range(5):
        print(num)  # 0, 1, 2, 3, 4 (with 0.1s delays)
    print("Done")

asyncio.run(main())

# Async comprehension
async def fetch_data(urls):
    async def fetch(url):
        await asyncio.sleep(0.1)
        return f"Data from {url}"

    # Async list comprehension
    results = [await fetch(url) for url in urls]  # sequential ❌
    # results = [await fetch(url) async for url in urls]  # not valid

    # Use asyncio.gather for concurrent fetching
    results = await asyncio.gather(*[fetch(url) for url in urls])
    return results

# Async generator with send
async def async_accumulator():
    total = 0
    while True:
        value = await async_receive()  # hypothetical
        total += value
        yield total

# Async generator expression
async def main():
    gen = (x * 2 async for x in async_range(5))
    async for val in gen:
        print(val)  # 0, 2, 4, 6, 8

# Async context manager in generator
class AsyncResource:
    async def __aenter__(self):
        print("Acquiring resource")
        return self

    async def __aexit__(self, *args):
        print("Releasing resource")

async def managed_generator():
    async with AsyncResource():
        for i in range(3):
            yield i
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q115. How does multiprocessing work with shared memory?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

The **`multiprocessing`** module supports shared memory via `Value`, `Array`, and `Manager`.

```python
from multiprocessing import Process, Value, Array, Manager, Pool, Queue
import time

# Shared Value
def increment(counter):
    for _ in range(1000):
        with counter.get_lock():  # thread-safe
            counter.value += 1

counter = Value("i", 0)  # 'i' = signed int
processes = [Process(target=increment, args=(counter,)) for _ in range(4)]

for p in processes: p.start()
for p in processes: p.join()
print(counter.value)  # 4000

# Shared Array
def fill_array(arr, index):
    for i in range(10):
        arr[index * 10 + i] = i ** 2

arr = Array("i", 40)  # 40 integers
processes = [Process(target=fill_array, args=(arr, i)) for i in range(4)]

for p in processes: p.start()
for p in processes: p.join()
print(list(arr))  # [0, 1, 4, 9, 16, 25, 36, 49, ...]

# Manager — shared complex objects
def worker(shared_dict, key, value):
    shared_dict[key] = value

with Manager() as manager:
    d = manager.dict()
    processes = [
        Process(target=worker, args=(d, f"key-{i}", i))
        for i in range(5)
    ]

    for p in processes: p.start()
    for p in processes: p.join()
    print(dict(d))  # {'key-0': 0, 'key-1': 1, ...}

# Pool — process pool for parallel execution
def square(x):
    return x ** 2

with Pool(4) as pool:
    results = pool.map(square, range(10))
    print(results)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

    # Parallel map with chunks
    results = pool.map(square, range(100), chunksize=10)

    # async version
    result = pool.apply_async(square, (10,))
    print(result.get(timeout=1))  # 100
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q116. What is the concurrent.futures module?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**`concurrent.futures`** provides a high-level API for async execution using threads or processes.

```python
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor, as_completed, wait
import time
import urllib.request

# ThreadPoolExecutor — for I/O-bound tasks
def fetch_url(url):
    with urllib.request.urlopen(url, timeout=5) as response:
        return len(response.read())

urls = [
    "https://python.org",
    "https://github.com",
    "https://stackoverflow.com",
]

with ThreadPoolExecutor(max_workers=5) as executor:
    # Submit individual tasks
    futures = {executor.submit(fetch_url, url): url for url in urls}

    # Process as they complete
    for future in as_completed(futures):
        url = futures[future]
        try:
            size = future.result(timeout=10)
            print(f"{url}: {size} bytes")
        except Exception as e:
            print(f"{url}: {e}")

    # Or use map (simpler, but blocks until all complete)
    sizes = list(executor.map(fetch_url, urls))
    print(sizes)

# ProcessPoolExecutor — for CPU-bound tasks
def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True

with ProcessPoolExecutor(max_workers=4) as executor:
    numbers = list(range(1, 1001))
    results = list(executor.map(is_prime, numbers))

# wait — wait for specific conditions
from concurrent.futures import FIRST_COMPLETED, ALL_COMPLETED

with ThreadPoolExecutor() as executor:
    futures = [executor.submit(fetch_url, url) for url in urls]

    # Wait for first to complete
    done, not_done = wait(futures, return_when=FIRST_COMPLETED)
    print(f"First completed: {done.pop().result()}")

    # Wait for all with timeout
    done, not_done = wait(futures, timeout=5, return_when=ALL_COMPLETED)
    print(f"{len(done)} completed, {len(not_done)} pending")
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q117. How do you profile Python code?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Profiling** measures where your code spends time, helping identify bottlenecks.

```python
import cProfile
import pstats
import io

# Profile a function
def slow_function():
    total = 0
    for i in range(10_000_000):
        total += i ** 2
    return total

# Run profiler
profiler = cProfile.Profile()
profiler.enable()
result = slow_function()
profiler.disable()

# Print stats sorted by cumulative time
s = io.StringIO()
stats = pstats.Stats(profiler, stream=s).sort_stats("cumulative")
stats.print_stats(10)  # top 10
print(s.getvalue())

# Using context manager
with cProfile.Profile() as profiler:
    result = slow_function()

stats = pstats.Stats(profiler)
stats.sort_stats("time").print_stats(10)
stats.sort_stats("calls").print_stats(10)

# Using as a command-line tool
# python -m cProfile my_script.py
# python -m cProfile -o output.prof my_script.py

# Analyzing output
# python -m pstats output.prof

# line_profiler (third-party) — line-by-line profiling
# pip install line_profiler

@profile
def slow_function():
    total = 0
    for i in range(1000):
        for j in range(1000):
            total += i * j
    return total

# Run: kernprof -l -v my_script.py

# memory_profiler
# pip install memory_profiler

from memory_profiler import profile

@profile
def memory_intensive():
    large_list = [i for i in range(1000000)]
    large_dict = {i: i ** 2 for i in range(100000)}
    return len(large_list) + len(large_dict)
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q118. How do you write C extensions for Python?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**C extensions** allow writing Python modules in C/C++ for performance.

```python
# Method 1: ctypes — call C functions from Python
import ctypes
import pathlib

# Load C library
lib = ctypes.CDLL("./mylib.so")

# Define function signature
lib.add.argtypes = (ctypes.c_int, ctypes.c_int)
lib.add.restype = ctypes.c_int

result = lib.add(3, 4)  # 7

# Working with pointers
lib.process.argtypes = (ctypes.POINTER(ctypes.c_int), ctypes.c_int)
lib.process.restype = None

data = (ctypes.c_int * 5)(1, 2, 3, 4, 5)
lib.process(data, 5)

# String handling
lib.greet.restype = ctypes.c_char_p
lib.greet.argtypes = (ctypes.c_char_p,)
result = lib.greet(b"World").decode()
```

```python
# Method 2: Cython — Python-like language that compiles to C
# mymodule.pyx
# def square(int x):
#     return x * x

# Method 3: cffi (simpler than ctypes)
# from cffi import FFI
# ffi = FFI()
# ffi.cdef("int add(int, int);")
# lib = ffi.dlopen("./mylib.so")
# print(lib.add(3, 4))

# Method 4: Python C API (most powerful, most complex)
# Write a C file, compile with distutils/setuptools
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q119. What is Cython and how does it speed up Python?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Cython** is an optimizing static compiler that translates Python-like code to C extensions.

```python
# Pure Python
def sum_of_squares(n):
    total = 0
    for i in range(n):
        total += i ** 2
    return total

# Cython version (file: fast.pyx)
# def sum_of_squares(int n):
#     cdef long long total = 0
#     cdef int i
#     for i in range(n):
#         total += i ** 2
#     return total

# setup.py
# from setuptools import setup
# from Cython.Build import cythonize
#
# setup(
#     ext_modules=cythonize("fast.pyx")
# )
#
# Build: python setup.py build_ext --inplace

# Static typing with Cython
# @cython.cfunc
# @cython.returns(cython.longlong)
# @cython.locals(n=cython.int, i=cython.int)
# def sum_of_squares(n):
#     total = 0
#     for i in range(n):
#         total += i ** 2
#     return total

# Using numpy with Cython
# from cython import boundscheck, wraparound
#
# @boundscheck(False)
# @wraparound(False)
# def fast_sum(double[:] arr):
#     cdef double total = 0
#     cdef Py_ssize_t i
#     for i in range(arr.shape[0]):
#         total += arr[i]
#     return total

# Speedup: 10-100x for numeric operations, 2-10x for general code
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q120. What are decorators with arguments and class decorators?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Decorators with arguments** are nested three levels deep. **Class decorators** decorate entire classes.

```python
from functools import wraps

# Decorator with arguments
def retry(max_attempts=3, delay=1):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            import time
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts - 1:
                        raise
                    print(f"Attempt {attempt + 1} failed: {e}")
                    time.sleep(delay)
            return None
        return wrapper
    return decorator

@retry(max_attempts=3, delay=0.5)
def unstable_network_call():
    import random
    if random.random() < 0.7:
        raise ConnectionError("Network error")
    return "Success!"

# Class decorators
def add_repr(cls):
    """Add __repr__ method to a class"""
    def __repr__(self):
        items = ", ".join(f"{k}={v!r}" for k, v in self.__dict__.items())
        return f"{cls.__name__}({items})"
    cls.__repr__ = __repr__
    return cls

def singleton(cls):
    """Make a class a singleton"""
    instances = {}
    def get_instance(*args, **kwargs):
        if cls not in instances:
            instances[cls] = cls(*args, **kwargs)
        return instances[cls]
    return get_instance  # replaces class with function

@singleton
class Database:
    def __init__(self):
        print("Connecting to database...")

@add_repr
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

p = Point(3, 4)
print(p)  # Point(x=3, y=4)
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q121. What are Protocols (structural subtyping)?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Protocols** (Python 3.8+) enable structural subtyping — objects are compatible based on their structure, not inheritance.

```python
from typing import Protocol, runtime_checkable

# Define a protocol
class Drawable(Protocol):
    def draw(self) -> str: ...

# These classes satisfy the protocol without explicit inheritance
class Circle:
    def draw(self) -> str:
        return "Drawing circle"

class Square:
    def draw(self) -> str:
        return "Drawing square"

class NotDrawable:
    pass

def render(obj: Drawable) -> None:
    print(obj.draw())

render(Circle())    # ✅ "Drawing circle"
render(Square())    # ✅ "Drawing square"
# render(NotDrawable())  # Type checker would flag this

# Runtime checking
@runtime_checkable
class HasLength(Protocol):
    def __len__(self) -> int: ...

# isinstance works with runtime_checkable protocols
isinstance("hello", HasLength)  # True
isinstance([1, 2, 3], HasLength)  # True
isinstance(42, HasLength)  # False

# Protocol with multiple methods
class Comparable(Protocol):
    def __lt__(self, other) -> bool: ...

def sort(items: list[Comparable]) -> list[Comparable]:
    return sorted(items)

# Generic protocols
from typing import TypeVar, Generic

T = TypeVar("T")

class Stack(Protocol[T]):
    def push(self, item: T) -> None: ...
    def pop(self) -> T: ...

# Protocol vs ABC:
# Protocol: structural (duck typing), no inheritance needed
# ABC: nominal (explicit inheritance), defines interface
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q122. How do TypeVar, Generic, and bound types work?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**`TypeVar`** and **`Generic`** enable type-safe generic programming.

```python
from typing import TypeVar, Generic, List, Type, Protocol, Sequence, Union
from typing import overload

# Basic TypeVar
T = TypeVar("T")

def first(items: List[T]) -> T:
    return items[0]

first([1, 2, 3])     # T inferred as int
first(["a", "b"])    # T inferred as str

# Constrained TypeVar
Number = TypeVar("Number", int, float, complex)

def add(a: Number, b: Number) -> Number:
    return a + b

add(1, 2)         # ✅ int
add(1.5, 2.5)     # ✅ float
# add("a", "b")   # ❌ type error (str not allowed)

# Bounded TypeVar (must be subclass of bound)
class Animal:
    def speak(self) -> str: ...

class Dog(Animal):
    def speak(self) -> str:
        return "Woof!"

class Cat(Animal):
    def speak(self) -> str:
        return "Meow!"

A = TypeVar("A", bound=Animal)

def make_sound(animal: A) -> str:
    return animal.speak()

# Generic classes
class Stack(Generic[T]):
    def __init__(self) -> None:
        self._items: List[T] = []

    def push(self, item: T) -> None:
        self._items.append(item)

    def pop(self) -> T:
        return self._items.pop()

    def peek(self) -> T:
        return self._items[-1]

stack = Stack[int]()
stack.push(1)
stack.push(2)
x: int = stack.pop()  # type-safe

# Multiple type variables
K = TypeVar("K")
V = TypeVar("V")

class Dictionary(Generic[K, V]):
    def __init__(self) -> None:
        self._data: dict[K, V] = {}

# Variance
from typing import Callable

# Invariant (default): Generic[T] — T must match exactly
# Covariant: Generic[T_co] — accepts subtypes
# Contravariant: Generic[T_contra] — accepts supertypes

T_co = TypeVar("T_co", covariant=True)
T_contra = TypeVar("T_contra", contravariant=True)
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q123. What is the @overload decorator?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**`@overload`** (typing module) provides type hints for functions with different signatures.

```python
from typing import overload, Union, List, Tuple

# Overloads for different input types
@overload
def process(value: int) -> str: ...

@overload
def process(value: str) -> int: ...

@overload
def process(value: List[int]) -> List[str]: ...

# Implementation (no type hints needed — this is the actual logic)
def process(value):
    if isinstance(value, int):
        return str(value)
    elif isinstance(value, str):
        return len(value)
    elif isinstance(value, list):
        return [str(x) for x in value]
    raise TypeError("Unsupported type")

# Type checker sees:
x: str = process(42)        # ✅ returns str for int input
y: int = process("hello")   # ✅ returns int for str input
z: List[str] = process([1, 2, 3])  # ✅ returns list[str] for list[int]

# Overloads with different number of arguments
@overload
def connect(host: str) -> str: ...

@overload
def connect(host: str, port: int) -> str: ...

def connect(host: str, port: int = 80) -> str:
    return f"{host}:{port}"

# Practical: function behavior depends on input
@overload
def find_user(user_id: int) -> dict: ...

@overload
def find_user(email: str) -> dict: ...

@overload
def find_user(user_id: int, include_deleted: bool) -> dict: ...

def find_user(identifier, include_deleted=False):
    if isinstance(identifier, int):
        # search by ID
        pass
    elif isinstance(identifier, str):
        # search by email
        pass
    # ...
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q124. What is Pickle and how is it different from JSON?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Pickle** is Python's serialization format (binary, Python-specific). **JSON** is a text-based, language-independent format.

```python
import pickle
import json

# Pickle — serialize any Python object
data = {
    "name": "Alice",
    "scores": [1, 2, 3],
    "nested": {"a": 1},
    "func": lambda x: x * 2,  # ❌ PickleError (lambdas can't be pickled)
}

# Serialize to bytes
pickled = pickle.dumps(data)
# b'\x80\x04\x95...'

# Deserialize
loaded = pickle.loads(pickled)

# File I/O
with open("data.pkl", "wb") as f:
    pickle.dump(data, f, protocol=pickle.HIGHEST_PROTOCOL)

with open("data.pkl", "rb") as f:
    data = pickle.load(f)

# Pickle supports complex objects (classes, functions)
class User:
    def __init__(self, name):
        self.name = name

user = User("Alice")
pickled = pickle.dumps(user)  # ✅ works
loaded = pickle.loads(pickled)

# Comparison
| Feature | Pickle | JSON |
|---------|--------|------|
| **Format** | Binary | Text |
| **Readable** | ❌ No | ✅ Yes |
| **Python-only** | ✅ Yes | ❌ No (universal) |
| **Security** | ❌ Dangerous | ✅ Safe |
| **Speed** | Fast | Slower |
| **Object types** | Any Python object | Basic types only |

# Security warning!
# NEVER unpickle data from untrusted sources
# pickle can execute arbitrary code
class Evil:
    def __reduce__(self):
        return (os.system, ("rm -rf /",))
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q125. How do you work with SQLite in Python?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**SQLite** is a built-in, zero-configuration database engine.

```python
import sqlite3
from contextlib import closing

# Connect (creates file if not exists)
conn = sqlite3.connect("database.db")
# Or in-memory database
conn = sqlite3.connect(":memory:")

# Create table
conn.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INTEGER,
        email TEXT UNIQUE
    )
""")

# Insert
conn.execute(
    "INSERT INTO users (name, age, email) VALUES (?, ?, ?)",
    ("Alice", 30, "alice@example.com")
)
conn.commit()  # must commit to persist

# Insert with context manager
with conn:
    conn.execute(
        "INSERT INTO users (name, age, email) VALUES (?, ?, ?)",
        ("Bob", 25, "bob@example.com")
    )

# Query
cursor = conn.execute("SELECT * FROM users")
for row in cursor:
    print(row)  # (1, 'Alice', 30, 'alice@example.com')

# Named placeholders
cursor = conn.execute(
    "SELECT * FROM users WHERE age > :min_age",
    {"min_age": 25}
)

# Fetch methods
cursor = conn.execute("SELECT * FROM users")
one = cursor.fetchone()        # single row or None
many = cursor.fetchmany(2)     # list of up to 2 rows
all = cursor.fetchall()         # list of all rows

# Row factory — access by name
conn.row_factory = sqlite3.Row
cursor = conn.execute("SELECT name, age FROM users")
for row in cursor:
    print(row["name"], row["age"])

# Parameterized queries (NEVER use string formatting for values!)
# ❌ Dangerous: conn.execute(f"SELECT * FROM users WHERE name = '{name}'")
# ✅ Safe: conn.execute("SELECT * FROM users WHERE name = ?", (name,))

# Transactions
try:
    conn.execute("BEGIN")
    conn.execute("UPDATE users SET age = ? WHERE id = ?", (31, 1))
    conn.execute("DELETE FROM users WHERE id = ?", (99,))
    conn.commit()
except sqlite3.Error as e:
    conn.rollback()
    print(f"Error: {e}")

# Closing
conn.close()
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q126. What are the most common Python design patterns?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Python's dynamic nature simplifies many design patterns.

```python
# 1. Singleton (using module — Python's natural singleton)
# module_a.py
class Database:
    def __init__(self):
        self.connected = False

db = Database()  # import module_a.db anywhere, same instance

# 2. Singleton (using metaclass)
class SingletonMeta(type):
    _instances = {}
    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]

class Config(metaclass=SingletonMeta):
    pass

# 3. Factory
class AnimalFactory:
    @staticmethod
    def create(animal_type):
        if animal_type == "dog":
            return Dog()
        elif animal_type == "cat":
            return Cat()
        raise ValueError(f"Unknown type: {animal_type}")

# 4. Observer
class Observer:
    def update(self, message):
        pass

class Subject:
    def __init__(self):
        self._observers = []

    def attach(self, observer):
        self._observers.append(observer)

    def notify(self, message):
        for observer in self._observers:
            observer.update(message)

# 5. Strategy
class SortStrategy:
    def sort(self, data): pass

class QuickSort(SortStrategy):
    def sort(self, data): return sorted(data)

class MergeSort(SortStrategy):
    def sort(self, data): return sorted(data)  # simplified

class Sorter:
    def __init__(self, strategy: SortStrategy):
        self.strategy = strategy

    def sort(self, data):
        return self.strategy.sort(data)

# 6. Adapter
class EuropeanSocket:
    def voltage(self): return 230
    def prongs(self): return 2

class USAdapter:
    def __init__(self, socket):
        self.socket = socket
    def voltage(self): return 110
    def prongs(self): return 2

# 7. Builder
class Computer:
    def __init__(self):
        self.cpu = None
        self.gpu = None
        self.ram = None

class ComputerBuilder:
    def __init__(self):
        self.computer = Computer()
    def with_cpu(self, cpu):
        self.computer.cpu = cpu; return self
    def with_gpu(self, gpu):
        self.computer.gpu = gpu; return self
    def build(self):
        return self.computer

builder = ComputerBuilder()
pc = builder.with_cpu("Intel i7").with_gpu("RTX 3080").build()
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q127. How do you implement the Observer pattern in Python?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

The **Observer pattern** enables one-to-many dependency where state changes in one object notify dependents.

```python
from abc import ABC, abstractmethod
from typing import List, Callable
from weakref import WeakSet

# Traditional OOP approach
class Observer(ABC):
    @abstractmethod
    def update(self, event_type: str, data: any) -> None:
        pass

class Observable:
    def __init__(self):
        self._observers: List[Observer] = []

    def attach(self, observer: Observer):
        self._observers.append(observer)

    def detach(self, observer: Observer):
        self._observers.remove(observer)

    def notify(self, event_type: str, data: any = None):
        for observer in self._observers:
            observer.update(event_type, data)

# Concrete observer
class Logger(Observer):
    def update(self, event_type, data):
        print(f"[LOG] {event_type}: {data}")

class EmailNotifier(Observer):
    def update(self, event_type, data):
        if event_type == "user_registered":
            print(f"[EMAIL] Welcome {data['name']}!")

# Concrete observable
class UserService(Observable):
    def register_user(self, name, email):
        user = {"name": name, "email": email}
        print(f"Registering {name}...")
        self.notify("user_registered", user)
        return user

# Usage
service = UserService()
service.attach(Logger())
service.attach(EmailNotifier())
service.register_user("Alice", "alice@example.com")

# Pythonic approach (using callbacks and weak references)
class EventEmitter:
    def __init__(self):
        self._handlers: dict = {}

    def on(self, event: str, handler: Callable):
        if event not in self._handlers:
            self._handlers[event] = WeakSet()
        self._handlers[event].add(handler)

    def off(self, event: str, handler: Callable):
        if event in self._handlers:
            self._handlers[event].discard(handler)

    def emit(self, event: str, *args, **kwargs):
        for handler in self._handlers.get(event, []):
            handler(*args, **kwargs)

emitter = EventEmitter()
emitter.on("user.login", lambda user: print(f"Logged in: {user}"))
emitter.emit("user.login", "Alice")

# Using properties and descriptors
class ObservableProperty:
    def __init__(self, initial=None):
        self.value = initial
        self._observers = []

    def attach(self, callback):
        self._observers.append(callback)

    def set(self, new_value):
        old_value = self.value
        self.value = new_value
        for callback in self._observers:
            callback(new_value, old_value)
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q128. How does Python handle garbage collection tuning?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Python's GC can be tuned via the **`gc`** module for performance-sensitive applications.

```python
import gc
import sys

# GC configuration
print(gc.get_threshold())   # (700, 10, 10)
# Gen 0: collect after 700 allocations
# Gen 1: collect after 10 Gen 0 collections
# Gen 2: collect after 10 Gen 1 collections

# Tuning thresholds
gc.set_threshold(1000, 15, 15)  # less frequent collections

# Manual collection
gc.collect()         # collect all generations
gc.collect(0)        # collect only generation 0
gc.collect(1)        # collect generations 0 and 1
gc.collect(2)        # collect all generations

# Disable automatic GC (for performance-critical sections)
gc.disable()
# ... performance-critical code ...
gc.enable()

# Debug GC
gc.set_debug(gc.DEBUG_LEAK)  # show objects that can't be collected
gc.set_debug(gc.DEBUG_STATS)  # show collection statistics

# Track specific objects
class Tracked:
    pass

obj = Tracked()
print(gc.is_tracked(obj))  # True (object tracked by GC)

# Get reference count
sys.getrefcount(obj)  # includes the parameter reference

# Force collection for cyclic garbage
class Node:
    def __init__(self):
        self.ref = None

a, b = Node(), Node()
a.ref = b
b.ref = a

del a, b
print(gc.collect())  # collects the cycle

# GC-free regions (Python 3.8+)
# gc.freeze() — prevent objects from being collected

# Memory leak detection
gc.set_debug(gc.DEBUG_SAVEALL)
# Objects that couldn't be freed are saved in gc.garbage

# When to tune:
# - Real-time systems: disable GC during critical paths
# - Game loops: manual collection at safe points
# - Long-running services: tune thresholds to reduce pauses
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q129. What are Python's performance optimization techniques?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Key optimization techniques for Python:

```python
# 1. Use built-in functions (C-level)
# Slow:
s = sum([x**2 for x in range(1000)])
# Fast (generator avoids list allocation):
s = sum(x**2 for x in range(1000))

# 2. Use local variables (faster than global lookups)
def process(items):
    # Local bindings for frequently used functions
    len_local = len
    range_local = range
    append_local = items.append
    result = []
    for i in range_local(len_local(items)):
        append_local(items[i] * 2)
    return result

# 3. List comprehensions vs loops
# Slow:
result = []
for i in range(1000):
    result.append(i ** 2)
# Fast (2x):
result = [i ** 2 for i in range(1000)]

# 4. Use join() for string concatenation
# Slow:
s = ""
for part in parts:
    s += part  # O(n²)
# Fast:
s = "".join(parts)  # O(n)

# 5. Dict/set membership over lists
# Slow: O(n)
if value in [1, 2, 3, 4, 5]:
# Fast: O(1)
if value in {1, 2, 3, 4, 5}:

# 6. Use local variable bindings in loops
# Slow (global lookup every iteration):
import math
for x in range(1000000):
    result = math.sqrt(x)
# Fast (local lookup):
from math import sqrt
sqrt_local = sqrt
for x in range(1000000):
    result = sqrt_local(x)

# 7. Avoid dot lookups in loops
# Slow:
for i in range(1000000):
    result = my_obj.method()
# Fast:
method = my_obj.method
for i in range(1000000):
    result = method()

# 8. Use __slots__ for memory optimization
class Point:
    __slots__ = ("x", "y")
    def __init__(self, x, y):
        self.x = x
        self.y = y

# 9. Use array module for numeric arrays
from array import array
arr = array("d", [0.0]) * 1000000  # 1M doubles

# 10. Profile first, optimize second!
# import cProfile
# cProfile.run("my_function()")
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q130. How do you implement caching strategies in Python?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Common caching strategies in Python:

```python
import functools
import time
from collections import OrderedDict

# 1. lru_cache (built-in, best for pure functions)
@functools.lru_cache(maxsize=128)
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# 2. Manual memoization
def memoize(func):
    cache = {}
    def wrapper(*args, **kwargs):
        # Create hashable key
        key = (args, tuple(sorted(kwargs.items())))
        if key not in cache:
            cache[key] = func(*args, **kwargs)
        return cache[key]
    wrapper.cache = cache
    return wrapper

@memoize
def expensive_function(x, y):
    time.sleep(1)  # simulate expensive operation
    return x * y

# 3. TTL cache (time-to-live)
class TTLCache:
    def __init__(self, ttl_seconds=60):
        self.cache = {}
        self.ttl = ttl_seconds

    def get(self, key):
        if key in self.cache:
            value, timestamp = self.cache[key]
            if time.time() - timestamp < self.ttl:
                return value
            del self.cache[key]
        return None

    def set(self, key, value):
        self.cache[key] = (value, time.time())

# 4. LRU cache (manual implementation)
class LRUCache:
    def __init__(self, capacity=100):
        self.cache = OrderedDict()
        self.capacity = capacity

    def get(self, key):
        if key not in self.cache:
            return None
        self.cache.move_to_end(key)  # mark as recently used
        return self.cache[key]

    def put(self, key, value):
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)  # remove oldest

# 5. Weak reference cache (doesn't prevent GC)
import weakref
class WeakValueCache:
    def __init__(self):
        self.cache = weakref.WeakValueDictionary()

    def get(self, key):
        return self.cache.get(key)

    def set(self, key, value):
        self.cache[key] = value
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q131. How do you create and distribute Python packages?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Creating a distributable Python package:

```python
# Project structure:
# my_package/
# ├── pyproject.toml
# ├── README.md
# ├── src/
# │   └── my_package/
# │       ├── __init__.py
# │       ├── module_a.py
# │       └── module_b.py
# └── tests/
#     └── test_module_a.py

# pyproject.toml (modern standard)
"""
[build-system]
requires = ["setuptools>=64", "wheel"]
build-backend = "setuptools.backends._legacy:Backend"

[project]
name = "my-package"
version = "1.0.0"
description = "A useful package"
readme = "README.md"
authors = [{name = "Alice", email = "alice@example.com"}]
license = {text = "MIT"}
requires-python = ">=3.8"
classifiers = [
    "Programming Language :: Python :: 3",
    "License :: OSI Approved :: MIT License",
]
dependencies = [
    "requests>=2.28",
]

[project.optional-dependencies]
dev = ["pytest>=7", "black", "flake8"]
test = ["pytest>=7", "pytest-cov"]

[project.urls]
homepage = "https://github.com/user/my-package"
repository = "https://github.com/user/my-package"

[tool.setuptools.packages.find]
where = ["src"]
"""

# Build commands:
# pip install build
# python -m build  # creates dist/*.tar.gz and dist/*.whl

# Upload to PyPI:
# pip install twine
# twine upload dist/*

# Install locally:
# pip install -e .  # editable install (development)
# pip install .     # regular install

# Versioning (PEP 440):
# 1.0.0a1  — alpha
# 1.0.0b1  — beta
# 1.0.0rc1 — release candidate
# 1.0.0    — release
# 1.0.1    — patch
# 1.1.0    — minor
# 2.0.0    — major
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q132. What are wheels and eggs in Python packaging?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Wheels** (`.whl`) and **eggs** (`.egg`) are distribution formats for Python packages.

```python
# Wheel (modern, PEP 427)
# my_package-1.0.0-py3-none-any.whl
#
# Naming: {package}-{version}-{python tag}-{abi tag}-{platform tag}.whl
# py3-none-any: Python 3, no ABI, any platform
# cp39-cp39-win_amd64: CPython 3.9, Windows 64-bit

# Egg (legacy, deprecated)
# my_package-1.0.0-py3.9.egg

| Feature | Wheel | Egg |
|---------|-------|-----|
| **Standard** | ✅ Current (PEP 427) | ❌ Legacy (deprecated) |
| **Installation** | Direct extraction (.whl = .zip) | Requires egg installation |
| **Metadata** | Separated | In the egg |
| **Build** | `python -m build` | `python setup.py bdist_egg` |

# Building a wheel
# 1. Create pyproject.toml
# 2. Install build: pip install build
# 3. Build: python -m build
#    - Creates dist/my_package-1.0.0-py3-none-any.whl
#    - Creates dist/my_package-1.0.0.tar.gz (source distribution)

# Installing from wheel
# pip install my_package-1.0.0-py3-none-any.whl

# Pre-compiled wheels (binary wheels)
# For packages with C extensions (numpy, pandas, etc.)
# Platform-specific: cp39-win_amd64, cp39-macosx_10_9_x86_64, etc.

# Manylinux — standard for Linux binary wheels
# manylinux2014, manylinux_2_17, etc.

# Pure Python vs Universal wheels
# Pure Python: py3-none-any (any Python 3)
# Universal: py2.py3-none-any (Python 2 & 3)
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q133. How does Python's import system work?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Python's import system uses **finders** and **loaders** via **`sys.meta_path`** and **`sys.path_hooks`**.

```python
import sys

# Import search path
print(sys.path)
# ['', '/usr/lib/python3.9', '/usr/lib/python3.9/site-packages', ...]

# Import hooks (finders and loaders)
print(sys.meta_path)
# [<class '_frozen_importlib.BuiltinImporter'>,
#  <class '_frozen_importlib.FrozenImporter'>,
#  <class '_frozen_importlib_external.PathFinder'>]

# Custom importer
class CustomImporter:
    """Simple importer for modules from a custom source"""

    def find_module(self, fullname, path=None):
        # Return self if we can handle this module
        if fullname.startswith("custom_"):
            return self
        return None

    def load_module(self, fullname):
        # Create and return the module
        import types
        mod = types.ModuleType(fullname)
        mod.__file__ = f"<custom-{fullname}>"
        mod.__loader__ = self
        mod.__package__ = fullname.rpartition(".")[0]

        # Add module contents
        mod.hello = lambda: f"Hello from {fullname}"

        sys.modules[fullname] = mod
        return mod

# Register custom importer
sys.meta_path.insert(0, CustomImporter())

# Import a custom module
import custom_test
print(custom_test.hello())  # "Hello from custom_test"

# Lazy imports
class LazyImport:
    def __init__(self, module_name):
        self.module_name = module_name
        self.module = None

    def __getattr__(self, name):
        if self.module is None:
            self.module = __import__(self.module_name)
        return getattr(self.module, name)

# Usage: numpy = LazyImport("numpy")
# numpy.array([1, 2, 3])  # imports only when accessed

# __import__ vs importlib
os_module = __import__("os")  # low-level

import importlib
os_module = importlib.import_module("os")  # recommended

# Reload module
import importlib
import my_module
importlib.reload(my_module)
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q134. What are Python's async context managers and async iterators?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Async context managers** (`__aenter__`/`__aexit__`) and **async iterators** (`__aiter__`/`__anext__`) enable async resource management.

```python
import asyncio

# Async context manager
class AsyncDatabase:
    async def connect(self):
        await asyncio.sleep(0.1)
        print("Connected to DB")
        return self

    async def disconnect(self):
        await asyncio.sleep(0.1)
        print("Disconnected from DB")

    async def query(self, sql):
        await asyncio.sleep(0.1)
        return f"Result of: {sql}"

    async def __aenter__(self):
        return await self.connect()

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        await self.disconnect()

# Usage
async def main():
    async with AsyncDatabase() as db:
        result = await db.query("SELECT * FROM users")
        print(result)

asyncio.run(main())

# Async iterator
class AsyncRange:
    def __init__(self, start, end, delay=0.1):
        self.current = start
        self.end = end
        self.delay = delay

    def __aiter__(self):
        return self

    async def __anext__(self):
        if self.current >= self.end:
            raise StopAsyncIteration
        await asyncio.sleep(self.delay)
        value = self.current
        self.current += 1
        return value

# Usage
async def main():
    async for num in AsyncRange(0, 5):
        print(num)  # 0, 1, 2, 3, 4 (with delay)

# Async generator (simpler)
async def async_range(start, end, delay=0.1):
    for i in range(start, end):
        await asyncio.sleep(delay)
        yield i

async def main():
    async for num in async_range(0, 5):
        print(num)  # same as above

# Manually drive async iterator
async def main():
    gen = async_range(0, 3)
    try:
        print(await gen.__anext__())  # 0
        print(await gen.__anext__())  # 1
        print(await gen.__anext__())  # 2
        print(await gen.__anext__())  # StopAsyncIteration
    except StopAsyncIteration:
        print("Done")
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q135. What is the difference between __new__ and __init__?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**`__new__`** creates the object (static method), **`__init__`** initializes it.

```python
class Example:
    def __new__(cls, *args, **kwargs):
        print(f"__new__ called: cls={cls.__name__}")
        # Must return instance
        instance = super().__new__(cls)
        return instance

    def __init__(self, value):
        print(f"__init__ called: value={value}")
        self.value = value

obj = Example(42)
# Output:
# __new__ called: cls=Example
# __init__ called: value=42

# Use case 1: Singleton
class Singleton:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self, value):
        if not hasattr(self, 'initialized'):
            self.value = value
            self.initialized = True

a = Singleton(1)
b = Singleton(2)
print(a is b)   # True
print(a.value)  # 1 (skipped init on second creation)

# Use case 2: Immutable objects (tuples, strings)
class ImmutablePoint(tuple):
    def __new__(cls, x, y):
        return super().__new__(cls, (x, y))

    # No __init__ needed — tuple handles it

p = ImmutablePoint(3, 4)
print(p[0], p[1])  # 3 4

# Use case 3: Modify class before creation
class ValidateFields:
    def __new__(cls, name, bases, namespace):
        if "required_field" not in namespace:
            raise TypeError("Missing required_field")
        return super().__new__(cls, name, bases, namespace)

# Order of operations:
# 1. __new__ (allocate memory)
# 2. __init__ (initialize attributes)
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q136. How do you use the @property decorator with caching?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Cached properties** compute once, then cache the result. Python 3.8+ has `@functools.cached_property`.

```python
import functools
import time

# cached_property (Python 3.8+)
class DataProcessor:
    def __init__(self, data):
        self.data = data

    @functools.cached_property
    def processed(self):
        """Expensive computation — runs once"""
        print("Processing data...")
        time.sleep(2)  # expensive
        return [x ** 2 for x in self.data]

dp = DataProcessor([1, 2, 3, 4, 5])
print(dp.processed)  # Processing data... [1, 4, 9, 16, 25]
print(dp.processed)  # [1, 4, 9, 16, 25] (cached, no computation)

# Manual cached property
class MyClass:
    def __init__(self):
        self._expensive = None

    @property
    def expensive(self):
        if self._expensive is None:
            self._expensive = self._compute()
        return self._expensive

    def _compute(self):
        print("Computing...")
        return 42

# Cache invalidation
class DataService:
    def __init__(self):
        self._data = None
        self._last_fetch = 0

    @property
    def data(self):
        # Re-fetch after 60 seconds
        if self._data is None or time.time() - self._last_fetch > 60:
            self._data = self._fetch_from_api()
            self._last_fetch = time.time()
        return self._data

    def _fetch_from_api(self):
        print("Fetching from API...")
        return {"value": 42}

    def invalidate_cache(self):
        """Force re-fetch on next access"""
        self._data = None

# Django-like @cached_property with invalidation
class CachedAccessor:
    def __init__(self, func):
        self.func = func
        self.name = func.__name__

    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        result = self.func(obj)
        obj.__dict__[self.name] = result  # bypass descriptor next time
        return result

# Clear cache with: del obj.__dict__[property_name]
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q137. How does Python handle function argument passing — pass-by-value or pass-by-reference?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Python uses **pass-by-assignment** ("call by object reference" or "call by sharing").

```python
# For immutable types (int, str, tuple) — behaves like pass-by-value
def modify_int(x):
    x = 10  # reassigns local x to new object
    print(f"Inner: {x}")

n = 5
modify_int(n)
print(f"Outer: {n}")
# Inner: 10
# Outer: 5  (unchanged)

# For mutable types (list, dict) — behaves like pass-by-reference
def modify_list(lst):
    lst.append(4)  # mutates the object
    lst = [10, 20, 30]  # reassigns local lst to new object
    print(f"Inner: {lst}")

my_list = [1, 2, 3]
modify_list(my_list)
print(f"Outer: {my_list}")
# Inner: [10, 20, 30]
# Outer: [1, 2, 3, 4]  (appended 4!)

# The key insight:
def reassign(lst):
    lst.append(99)  # mutates the original object
    lst = [100]     # reassigns LOCAL name to new object

items = [1, 2, 3]
reassign(items)
print(items)  # [1, 2, 3, 99] (not [100])

# Rebinding inside function
def rebind(d):
    d["new"] = "value"  # mutates original
    d = {"replaced": True}  # rebinds local name

data = {"original": True}
rebind(data)
print(data)  # {'original': True, 'new': 'value'}

# Summary:
# - You can't change what an object IS (its type/identity)
# - You CAN change what's INSIDE a mutable object
# - Assignment (=) ALWAYS rebinds the local name
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q138. What is the Global Interpreter Lock (GIL) removal in Python 3.13?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Python 3.13 introduces an **experimental free-threaded mode** (no GIL), enabled via `--disable-gil` build option.

```python
# Standard Python (with GIL)
import threading
import time

def count(n):
    while n > 0:
        n -= 1

# CPU-bound — GIL prevents parallel execution
start = time.time()
threads = [threading.Thread(target=count, args=(50_000_000,)) for _ in range(4)]
for t in threads: t.start()
for t in threads: t.join()
print(f"With GIL: {time.time() - start:.2f}s")  # ~same as single-threaded

# Free-threaded Python 3.13 (no GIL)
# Build: ./configure --disable-gil && make
# Or use: python3.13t (free-threaded binary)

# Same code with no GIL:
# start = time.time()
# threads = [threading.Thread(target=count, args=(50_000_000,)) for _ in range(4)]
# for t in threads: t.start()
# for t in threads: t.join()
# print(f"No GIL: {time.time() - start:.2f}s")  # ~4x faster on 4 cores!

# Implications:
| Aspect | With GIL | Without GIL |
|--------|----------|-------------|
| **CPU parallelism** | Single thread only | True parallel |
| **Single-thread perf** | Baseline | ~10-30% slower |
| **Thread safety** | Easier (GIL protects internals) | Need locks everywhere |
| **C extensions** | GIL protects C code | Need updating for thread safety |
| **Migration** | Existing code | opt-in, not default yet |

# Check if GIL is enabled:
import sys
print(sys._is_gil_enabled())  # True/False (Python 3.13+)

# Per-interpreter GIL (sub-interpreters)
# Python 3.12+: interpreters module allows true isolation
# import interpreters
# interp = interpreters.create()
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q139. What is the walrus operator assignment expression gotchas?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

The **walrus operator** (`:=`) has several subtle behaviors and pitfalls.

```python
# Gotcha 1: Parentheses matter!
# Without parentheses — compares, doesn't assign
# if value := len(items) > 10:  ← parsed as value := (len(items) > 10)
# value is True/False, not len(items)

# Correct:
if (n := len(items)) > 10:
    print(f"Got {n} items")  # n = len(items)

# Gotcha 2: Assignment target must be a NAME
# (x + 1 := 5)  # ❌ SyntaxError
# (x := 5)      # ✅

# Gotcha 3: Walrus in f-strings (Python 3.8-3.11)
# f"{(x := 5)}"  # SyntaxError in 3.8, allowed in 3.12+

# Gotcha 4: Walrus in comprehensions (scoping)
# The walrus variable leaks from comprehensions in Python 3.8
[x for x in range(5) if (square := x**2) > 5]
# square leaks to outer scope! (fixed in 3.12 for list comps)

# Gotcha 5: Walrus with and/or
# Unexpected:
# result = expensive() or (fallback := get_fallback())
# fallback is assigned even if expensive() returns truthy!
# Because the or evaluates both sides... actually no.
# In Python, or short-circuits, so fallback is only assigned
# if expensive() is falsy. This is actually correct behavior.

# Gotcha 6: Nested walrus
# (a := (b := 5))  # a = 5, b = 5
# Works but hurts readability

# Gotcha 7: Cannot use augmented assignment
# (x += 1)  # ❌ SyntaxError
# (x := x + 1)  # ✅

# Best practices:
# 1. Always use parentheses
# 2. Keep it simple — one walrus per expression
# 3. Use in while loops, if conditions, and comprehensions
# 4. Avoid in complex expressions
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q140. How do you implement and use positional-only parameters?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Positional-only parameters** (Python 3.8+) are defined before `/` in the parameter list.

```python
# Basic syntax
def divide(a, b, /):
    return a / b

divide(10, 2)   # ✅ 5.0
# divide(a=10, b=2)  # ❌ TypeError: got unexpected keyword arguments

# Mixed: positional-only, positional-or-keyword, keyword-only
def func(a, b, /, c, d, *, e, f):
    print(a, b, c, d, e, f)

func(1, 2, 3, 4, e=5, f=6)     # ✅
func(1, 2, c=3, d=4, e=5, f=6) # ✅
# func(a=1, b=2, c=3, d=4, e=5, f=6)  # ❌ a and b are positional-only

# Use cases:

# 1. API compatibility — allow parameter rename later
def connect(host, port, /, timeout=30):
    """host and port can be renamed without breaking callers."""
    pass

# 2. Pure mathematical functions
def pow(base, exp, /):
    return base ** exp

# 3. Avoid confusion
def greet(name, /, greeting="Hello"):
    return f"{greeting}, {name}!"

greet("Alice")          # ✅
greet("Bob", "Hi")      # ✅
# greet("Bob", greeting="Hi")  # ✅ (greeting is keyword-or-positional)

# 4. Security — prevent overriding internal parameter names
def set_password(password, /):
    """password can't be passed as keyword, preventing accidental logging."""
    # Hashing logic
    return hash_password(password)

# No keyword arguments for password means accidental exposure is harder

# Real-world examples:
# sum(iterable, /, start=0) — iterable is positional-only
# len(obj, /) — obj is positional-only
# range(stop) / range(start, stop, /, step=1)
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q141. How does structural pattern matching advanced features work?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Structural pattern matching** (Python 3.10+) has advanced features beyond basic matching.

```python
# 1. Guards (additional conditions)
def classify(value):
    match value:
        case int(x) if x < 0:
            return f"Negative: {x}"
        case int(x) if x == 0:
            return "Zero"
        case int(x) if x > 0:
            return f"Positive: {x}"
        case str(s) if len(s) > 10:
            return f"Long string: {s}"
        case _:
            return "Other"

# 2. Capturing sub-patterns
def parse_point(point):
    match point:
        case (x, y) if x == y:
            return f"On diagonal: ({x}, {y})"
        case (x, y):
            return f"Point: ({x}, {y})"
        case {"x": x, "y": y}:
            return f"Dict point: ({x}, {y})"

# 3. Matching sequences with wildcards
def process(items):
    match items:
        case []:
            return "Empty"
        case [first]:
            return f"Single: {first}"
        case [first, second]:
            return f"Two: {first}, {second}"
        case [first, *middle, last]:
            return f"First: {first}, Last: {last}, Middle: {len(middle)}"

# 4. Matching OR patterns
def describe(value):
    match value:
        case 0 | "zero" | None:
            return "Nothing"
        case 1 | "one":
            return "Single"
        case int(x) | float(x) if x > 0:
            return f"Positive number: {x}"
        case _:
            return "Other"

# 5. Matching constant values
class Colors:
    RED = "red"
    GREEN = "green"
    BLUE = "blue"

def handle_color(color):
    match color:
        case Colors.RED:
            return "Stop"
        case Colors.GREEN:
            return "Go"
        case Colors.BLUE:
            return "Water"
        case _:
            return "Unknown"

# 6. Matching named constants (use dotted name)
from enum import Enum

class Status(Enum):
    PENDING = 1
    ACTIVE = 2
    DONE = 3

def handle_status(status):
    match status:
        case Status.PENDING:
            return "Waiting..."
        case Status.ACTIVE:
            return "Processing"
        case Status.DONE:
            return "Complete"

# 7. Matching with class pattern
from dataclasses import dataclass

@dataclass
class User:
    name: str
    role: str

def greet(user):
    match user:
        case User(name="admin", role="admin"):
            return "Hello Admin!"
        case User(name=n, role="moderator"):
            return f"Hello Moderator {n}!"
        case User(name=n, role=r):
            return f"Hello {n} ({r})"
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q142. How do you work with the typing module's Literal and Final types?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**`Literal`** and **`Final`** constrain types to specific values or prevent reassignment.

```python
from typing import Literal, Final, get_args, get_origin
import sys

# Literal — specific values only
def set_mode(mode: Literal["read", "write", "append"]) -> None:
    print(f"Setting mode to {mode}")

set_mode("read")    # ✅
# set_mode("delete")  # ❌ type error (not in Literal)

# Literal with ints
def http_status(code: Literal[200, 201, 404, 500]) -> str:
    match code:
        case 200: return "OK"
        case 404: return "Not Found"

# Mixed types
def process(value: Literal[True, "auto", None]) -> None:
    pass

# Inspect Literal at runtime
def validate_mode(mode: str) -> None:
    valid_modes = get_args(Literal["read", "write", "append"])
    if mode not in valid_modes:
        raise ValueError(f"Mode must be one of {valid_modes}")

# Final — cannot be reassigned
MAX_CONNECTIONS: Final = 100
# MAX_CONNECTIONS = 200  # ❌ type error
# DEFAULT_NAME: Final[str] = "guest"

# Final on classes
from typing import final

@final
class BaseModel:
    pass

# class ExtendedModel(BaseModel):  # ❌ type error

# Final on methods
class Service:
    @final
    def process(self):
        pass

# class ExtendedService(Service):
#     def process(self):  # ❌ type error
#         pass

# Literal with boolean
def toggle(flag: Literal[True]) -> str:
    return "Enabled"

# Using TypeGuard for type narrowing
from typing import TypeGuard

def is_string_list(val: list) -> TypeGuard[list[str]]:
    return all(isinstance(x, str) for x in val)

def process_items(items: list):
    if is_string_list(items):
        # items is narrowed to list[str]
        print(" ".join(items))
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q143. How do Python's TypeVar, ParamSpec, and Concatenate work for callable types?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**`ParamSpec`** and **`Concatenate`** (Python 3.10+) enable typing decorators that preserve function signatures.

```python
from typing import TypeVar, ParamSpec, Concatenate, Callable
import functools

# TypeVar for return type
T = TypeVar("T")

# ParamSpec captures *args and **kwargs
P = ParamSpec("P")

# Decorator that preserves signature
def log_call(func: Callable[P, T]) -> Callable[P, T]:
    @functools.wraps(func)
    def wrapper(*args: P.args, **kwargs: P.kwargs) -> T:
        print(f"Calling {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

@log_call
def add(a: int, b: int) -> int:
    return a + b

# Type checker sees: add(a: int, b: int) -> int (preserved!)

# Concatenate — prepend parameters
from typing import Concatenate

def with_db(
    func: Callable[Concatenate[dict, P], T]
) -> Callable[P, T]:
    @functools.wraps(func)
    def wrapper(*args: P.args, **kwargs: P.kwargs) -> T:
        db = {"connected": True}
        return func(db, *args, **kwargs)
    return wrapper

@with_db
def get_user(db: dict, user_id: int) -> str:
    return f"User {user_id}"

# Type checker sees: get_user(user_id: int) -> str
# The db parameter is injected by the decorator

# Another example: auth decorator
def require_auth(
    func: Callable[Concatenate[str, P], T]
) -> Callable[P, T]:
    @functools.wraps(func)
    def wrapper(*args: P.args, **kwargs: P.kwargs) -> T:
        user = "authenticated_user"  # simulated
        return func(user, *args, **kwargs)
    return wrapper

@require_auth
def delete_post(user: str, post_id: int) -> bool:
    return True

# Type checker sees: delete_post(post_id: int) -> bool
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q144. How do you use Python for metaprogramming with __init_subclass__ and __set_name__?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**`__init_subclass__`** (Python 3.6+) is called when a subclass is created, enabling class hierarchy validation and configuration.

```python
# __init_subclass__ — hook when subclassing
class Base:
    def __init_subclass__(cls, required: bool = True, **kwargs):
        super().__init_subclass__(**kwargs)
        cls._required = required

        # Add validation to subclass
        if required and "name" not in cls.__dict__:
            raise TypeError(f"{cls.__name__} must define 'name'")

class ValidModel(Base, required=True):
    name = "default"

# class InvalidModel(Base, required=True):
#     pass  # ❌ TypeError: must define 'name'

class OptionalModel(Base, required=False):
    pass  # ✅

# __set_name__ — descriptor gets its attribute name
class Validated:
    def __set_name__(self, owner, name):
        self.name = name
        self.private_name = f"_{name}"

    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        return getattr(obj, self.private_name)

    def __set__(self, obj, value):
        self.validate(value)
        setattr(obj, self.private_name, value)

    def validate(self, value):
        pass

class PositiveInt(Validated):
    def validate(self, value):
        if not isinstance(value, int) or value <= 0:
            raise ValueError(f"{self.name} must be a positive int")

class Person:
    age = PositiveInt()  # __set_name__ sets self.name = "age"

    def __init__(self, name, age):
        self.name = name
        self.age = age  # calls PositiveInt.__set__

p = Person("Alice", 30)
print(p.age)  # 30
# p.age = -5   # ❌ ValueError

# Combined: registry pattern
class RegistryBase:
    registry = {}

    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        cls.registry[cls.__name__] = cls

class PluginA(RegistryBase):
    pass

class PluginB(RegistryBase):
    pass

print(RegistryBase.registry)
# {'PluginA': <class 'PluginA'>, 'PluginB': <class 'PluginB'>}
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q145. How do Python's contextlib utilities work beyond contextmanager?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

The **`contextlib`** module provides many utilities beyond `@contextmanager`.

```python
from contextlib import (
    contextmanager, suppress, redirect_stdout, redirect_stderr,
    chdir, nullcontext, ExitStack, closing, AbstractContextManager
)
import os
import sys

# suppress — ignore specific exceptions
def delete_file(path):
    with suppress(FileNotFoundError, PermissionError):
        os.remove(path)

# redirect_stdout/stderr — temporarily redirect output
def quiet_function():
    with redirect_stdout(os.devnull):
        noisy_function()

# Capture output to string
from io import StringIO
buf = StringIO()
with redirect_stdout(buf):
    print("Hello")
output = buf.getvalue()

# chdir — temporary directory change
with chdir("/tmp"):
    print(os.getcwd())  # /tmp
print(os.getcwd())  # back to original

# nullcontext — no-op context manager
def process(use_file=True):
    if use_file:
        ctx = open("data.txt")
    else:
        ctx = nullcontext("default data")
    with ctx as data:
        print(data)

# ExitStack — dynamic context manager management
def process_files(files):
    with ExitStack() as stack:
        file_objects = [
            stack.enter_context(open(f))
            for f in files if os.path.exists(f)
        ]
        # All files auto-close when exiting the with block

# Multiple resources with error handling
with ExitStack() as stack:
    resources = []
    try:
        r1 = stack.enter_context(open("file1.txt"))
        r2 = stack.enter_context(open("file2.txt"))
        resources = [r1, r2]
    except FileNotFoundError:
        # ExitStack will close any successfully opened resources
        print("Some files missing")

# closing — call .close() on exit
class Resource:
    def __init__(self):
        print("Acquiring resource")
    def close(self):
        print("Releasing resource")

with closing(Resource()) as r:
    print("Using resource")

# @contextmanager with error handling
@contextmanager
def managed_resource(*args, **kwargs):
    resource = acquire(*args, **kwargs)
    try:
        yield resource
    finally:
        resource.release()
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q146. What are coroutines vs generators vs threads in Python?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Python offers three concurrency models with different trade-offs.

```python
import asyncio
import threading
import time

# 1. Generators (coroutine-like, synchronous)
def gen_coroutine():
    """Generator-based cooperative multitasking"""
    for i in range(3):
        print(f"Gen step {i}")
        yield i

gen = gen_coroutine()
next(gen)  # Gen step 0
next(gen)  # Gen step 1
next(gen)  # Gen step 2

# 2. asyncio coroutines (async/await)
async def async_coroutine():
    """Asyncio cooperative multitasking"""
    for i in range(3):
        print(f"Async step {i}")
        await asyncio.sleep(0.1)  # yields to event loop
        yield i

async def run_async():
    async for val in async_coroutine():
        print(f"Got: {val}")

# 3. Threads (preemptive multitasking)
def thread_worker():
    """Thread-based concurrent execution"""
    for i in range(3):
        print(f"Thread step {i}")
        time.sleep(0.1)

t = threading.Thread(target=thread_worker)
t.start()
t.join()

# Comparison
| Feature | Generator | asyncio | Thread |
|---------|-----------|---------|--------|
| **Type** | Cooperative | Cooperative | Preemptive |
| **OS threads** | 1 | 1 | Multiple |
| **Concurrency** | Manual | Event loop | OS-scheduled |
| **I/O waiting** | Blocking | Non-blocking | Blocking (in thread) |
| **Complexity** | Low | Medium | High (locks) |
| **Memory** | Minimal | Low | ~8MB per thread |
| **Startup** | Instant | Instant | ~50μs |

# Hybrid approach: asyncio + threads
async def run_in_thread(blocking_func, *args):
    loop = asyncio.get_event_loop()
    return await loop.run_in_executor(None, blocking_func, *args)

# Blocking function in thread pool
def blocking_io():
    time.sleep(1)
    return "Done"

async def main():
    result = await run_in_thread(blocking_io)
    print(result)
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q147. How do you implement Python type checkers and linters configuration?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Python typing ecosystem: **mypy** (type checker), **pyright**/Pylance, and linters.

```python
# pyproject.toml — mypy configuration
"""
[tool.mypy]
python_version = "3.11"
strict = true
warn_unused_configs = true
ignore_missing_imports = false
disallow_untyped_defs = true
disallow_any_unimported = true
no_implicit_optional = true
warn_redundant_casts = true
warn_return_any = true
warn_unreachable = true

[[tool.mypy.overrides]]
module = "tests.*"
disallow_untyped_defs = false

[[tool.mypy.overrides]]
module = ["numpy", "pandas"]
ignore_missing_imports = true
"""

# .pylintrc (or pyproject.toml)
"""
[tool.pylint.MASTER]
max-line-length = 100

[tool.pylint.MESSAGES CONTROL]
disable = ["C0111", "C0103"]  # docstring, naming
"""

# ruff (fast Python linter, 2022+)
"""
[tool.ruff]
line-length = 100
target-version = "py311"

[tool.ruff.lint]
select = ["E", "F", "I", "N", "W", "UP"]
ignore = ["E501"]  # line length handled elsewhere

[tool.ruff.format]
quote-style = "double"
indent-style = "space"
"""

# Example: strict type checking
def process_users(users: list[dict]) -> list[str]:
    """Process a list of user dicts."""
    result: list[str] = []
    for user in users:
        name = user.get("name")
        if name is not None:
            result.append(str(name).upper())
    return result

# Using assert for type narrowing
from typing import assert_type

x: int = 42
assert_type(x, int)  # ✅

# Type checker directives
# type: ignore — suppress type error
# type: ignore[arg-type] — specific error code
# noqa — suppress all linting

x: int = "hello"  # type: ignore[arg-type]

# pytest + mypy
# pip install pytest-mypy-plugins
# Check types during test
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q148. How does Python's memory model work with integers and strings?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Python optimizes small integers and strings via **interning** and **caching**.

```python
import sys

# Integer caching
# Python caches integers from -5 to 256
a = 256
b = 256
print(a is b)  # True (cached)

a = 257
b = 257
print(a is b)  # False (not cached)

# But in the same compilation unit...
a, b = 257, 257
print(a is b)  # True (compiler optimization for same code block)

# String interning
a = "hello"
b = "hello"
print(a is b)  # True (interned)

# Long strings are not interned
a = "hello_world_python_3_9_example"
b = "hello_world_python_3_9_example"
print(a is b)  # False (long strings not guaranteed)

# But same compilation unit optimization applies
a, b = "hello" * 1000, "hello" * 1000
print(a is b)  # May be True or False depending on implementation

# sys.intern — force interning
a = sys.intern("long string that needs comparison")
b = sys.intern("long string that needs comparison")
print(a is b)  # True

# Benefit: faster comparison (pointer comparison vs character-by-character)
# Without intern: O(n) comparison
# With intern: O(1) comparison

# Memory optimization with __slots__
class WithDict:
    def __init__(self, x, y):
        self.x = x
        self.y = y

class WithSlots:
    __slots__ = ("x", "y")
    def __init__(self, x, y):
        self.x = x
        self.y = y

wd = WithDict(1, 2)
ws = WithSlots(1, 2)

print(sys.getsizeof(wd))  # 56 (instance) + dict overhead
print(sys.getsizeof(ws))  # 40 (no dict)
print(sys.getsizeof(wd.__dict__))  # 120+ bytes extra

# Memory usage for different types
print(sys.getsizeof(42))        # 28 bytes
print(sys.getsizeof("a"))       # 50 bytes
print(sys.getsizeof([]))        # 56 bytes
print(sys.getsizeof({}))        # 72 bytes
print(sys.getsizeof(object()))  # 16 bytes (empty object)
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q149. How do Python's bool, int, and float interact with each other?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Python's `bool` is a **subclass of `int`**, with `True=1` and `False=0`.

```python
# bool is subclass of int
print(issubclass(bool, int))  # True
print(isinstance(True, int))  # True

# Numeric behavior
print(True + True)      # 2
print(True * 5)         # 5
print(False - True)     # -1
print(True / 2)         # 0.5

# Summing booleans
print(sum([True, False, True, True]))  # 3

# Counting with bool
names = ["Alice", "", "Bob", ""]
print(sum(bool(name) for name in names))  # 2

# Type hierarchy
# object → int → bool
# object → float
# object → complex

# Numeric conversions
print(int(3.14))        # 3 (truncation)
print(float(3))         # 3.0
print(complex(3, 4))    # (3+4j)

# Float precision issues
print(0.1 + 0.2)        # 0.30000000000000004 (IEEE 754)
print(0.1 + 0.2 == 0.3) # False!

# Safe float comparison
import math
print(math.isclose(0.1 + 0.2, 0.3))  # True

# Decimal for exact decimal arithmetic
from decimal import Decimal
print(Decimal("0.1") + Decimal("0.2"))  # 0.3

# Division behavior
print(5 / 2)            # 2.5 (true division, always float)
print(5 // 2)           # 2 (floor division)
print(5 // 2.0)         # 2.0 (float floor)
print(-5 // 2)          # -3 (floor, not truncation!)

# isinstance checks
print(isinstance(True, int))    # True
print(isinstance(True, bool))   # True
print(type(True) is int)        # False (type is bool, not int)
print(type(True) is bool)       # True
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q150. How does Python handle negative indexing and slicing?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Python's **negative indexing** counts from the end. **Slicing** creates new sequences.

```python
# Negative indexing
seq = [10, 20, 30, 40, 50]
print(seq[-1])  # 50 (last element)
print(seq[-2])  # 40 (second to last)
print(seq[-5])  # 10 (first element)
# print(seq[-6])  # IndexError

# Slicing: seq[start:stop:step]
# start: inclusive (default: 0)
# stop: exclusive (default: len)
# step: stride (default: 1)

seq = [0, 1, 2, 3, 4, 5]
print(seq[1:4])     # [1, 2, 3]
print(seq[:3])      # [0, 1, 2]
print(seq[3:])      # [3, 4, 5]
print(seq[::2])     # [0, 2, 4]
print(seq[::-1])    # [5, 4, 3, 2, 1, 0] (reverse)

# Negative slice indices
print(seq[-3:])     # [3, 4, 5] (last 3)
print(seq[:-2])     # [0, 1, 2, 3] (except last 2)
print(seq[-4:-1])   # [2, 3, 4]
print(seq[::-2])    # [5, 3, 1]

# Slicing copies the list
original = [1, 2, 3]
sliced = original[:]
sliced[0] = 99
print(original)  # [1, 2, 3] (unchanged)

# Slice assignment (modifies original)
nums = [1, 2, 3, 4, 5]
nums[1:3] = [20, 30]
print(nums)  # [1, 20, 30, 4, 5]

# Slice deletion
nums = [1, 2, 3, 4, 5]
del nums[1:3]
print(nums)  # [1, 4, 5]

# Custom sequence with slicing
class MyList:
    def __init__(self, items):
        self.items = items

    def __getitem__(self, index):
        if isinstance(index, slice):
            return MyList(self.items[index])
        return self.items[index]

# __getitem__ for custom classes
class Sliceable:
    data = [0, 1, 2, 3, 4, 5]

    def __getitem__(self, key):
        if isinstance(key, slice):
            print(f"Slice: start={key.start}, stop={key.stop}, step={key.step}")
            return self.data[key]
        print(f"Index: {key}")
        return self.data[key]
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q151. What is the difference between bytes, bytearray, and memoryview?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**`bytes`**, **`bytearray`**, and **`memoryview`** handle binary data at different abstraction levels.

```python
# bytes — immutable sequence of bytes
b = b"hello"
# b[0] = 72  # ❌ TypeError (immutable)
print(b[0])      # 104 (ord('h'))
print(b[:2])     # b'he'

# bytearray — mutable sequence of bytes
ba = bytearray(b"hello")
ba[0] = 72       # ✅ mutable
ba.append(33)    # append byte
print(ba)        # bytearray(b'Hello!')

# memoryview — memory-efficient view without copying
data = bytearray(b"Hello World")
mv = memoryview(data)

# Access without copying
print(mv[0])       # 72 (no copy)
print(mv[1:5])     # <memory at 0x...> (no copy)

# Slicing returns memoryview (no copy!)
sliced = mv[0:5]
print(sliced.tobytes())  # b'Hello'

# Modifying memoryview modifies original
sliced[0] = 104  # 'h'
print(data)      # bytearray(b'hello World')

# Cast memoryview (zero-copy type conversion)
import struct
data = bytearray([0x01, 0x02, 0x03, 0x04])
mv = memoryview(data).cast('H')  # cast to unsigned short
print(mv[0])  # 0x0201 (platform-dependent endianness)

# Working with struct
import struct
# Pack/unpack binary data
packed = struct.pack("!I", 1024)     # b'\x00\x00\x04\x00' (big-endian unsigned int)
unpacked = struct.unpack("!I", packed)  # (1024,)

# memoryview with numpy
import numpy as np
arr = np.array([1, 2, 3, 4], dtype=np.int32)
mv = memoryview(arr)
print(mv.format)  # 'i'
print(mv.itemsize)  # 4

# Performance: memoryview avoids copies
# Without memoryview: slicing creates new bytes objects
# With memoryview: slicing is O(1), no copy
def parse_header(data: bytes):
    mv = memoryview(data)
    header = mv[:4]     # no copy
    version = int.from_bytes(header)
    payload = mv[4:]    # no copy
    return version, payload.tobytes()
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q152. How do Python's async features work with the event loop?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

The **event loop** is the core of asyncio — it manages and schedules coroutines.

```python
import asyncio
import time

# Getting the event loop
loop = asyncio.new_event_loop()
asyncio.set_event_loop(loop)

# Running tasks
async def say_after(delay, msg):
    await asyncio.sleep(delay)
    print(msg)

# Manually run event loop
loop.run_until_complete(say_after(1, "Hello"))
loop.close()

# Modern approach
async def main():
    # Create tasks
    task1 = asyncio.create_task(say_after(1, "World"))
    task2 = asyncio.create_task(say_after(2, "Hello"))

    # Await both
    await task1
    await task2

asyncio.run(main())  # Python 3.7+

# Event loop internals
async def show_loop():
    loop = asyncio.get_running_loop()
    print(f"Loop: {loop}")
    print(f"Time: {loop.time()}")  # monotonic clock

    # Schedule callback on next iteration
    loop.call_soon(lambda: print("Called soon"))
    loop.call_later(1, lambda: print("Called later"))

asyncio.run(show_loop())

# Custom event loop policy
class DebugLoopPolicy(asyncio.DefaultEventLoopPolicy):
    def new_event_loop(self):
        loop = super().new_event_loop()
        loop.set_debug(True)
        return loop

asyncio.set_event_loop_policy(DebugLoopPolicy())
# All new loops will be in debug mode

# Event loop with multiple callbacks
async def event_loop_demo():
    loop = asyncio.get_running_loop()

    # Schedule multiple callbacks
    loop.call_soon(lambda: print("Callback 1"))
    loop.call_soon(lambda: print("Callback 2"))
    loop.call_later(0.1, lambda: print("Delayed callback"))

    await asyncio.sleep(0.2)

# Running blocking code in executor
def blocking_work():
    time.sleep(2)
    return "Done"

async def main():
    loop = asyncio.get_running_loop()
    result = await loop.run_in_executor(None, blocking_work)
    print(result)

asyncio.run(main())
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q153. How does Python's import system handle circular imports?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Circular imports** occur when module A imports module B and module B imports module A. Python handles them via partial module loading.

```python
# Circular import example
# module_a.py
# import module_b  # ❌ Potential circular import

# def func_a():
#     return module_b.func_b()

# module_b.py
# import module_a  # ❌ Potential circular import

# def func_b():
#     return module_a.func_a()

# What happens:
# 1. module_a starts importing → creates module_a in sys.modules (partially)
# 2. module_a tries to import module_b
# 3. module_b tries to import module_a → gets PARTIAL module_a
# 4. module_b finishes loading
# 5. module_a continues loading (but module_b already has partial reference)

# If func_b references module_a.func_a at import time → AttributeError!
# If func_b references module_a.func_a at runtime → works fine (module_a loaded)

# Solutions:

# 1. Lazy import (inside function)
def func_b():
    import module_a  # import inside function, not at top
    return module_a.func_a()

# 2. Restructure — extract shared code to third module
# shared.py — common dependency
# module_a imports shared
# module_b imports shared

# 3. Import after definition
# module_a.py
def func_a():
    return "A"

import module_b  # import after func_a is defined

# 4. Use TYPE_CHECKING for type hints only
from __future__ import annotations  # PEP 563 — deferred evaluation
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    import module_b  # only for type checking, not runtime

class A:
    def get_b(self) -> "module_b.B":
        return module_b.B()

# 5. Use __init__.py for centralized imports
# __init__.py
from . import module_a
from . import module_b
# Both modules can import from package without circular deps
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q154. What are Python's security best practices?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Key security considerations when writing Python applications:

```python
# 1. Never use eval/exec with untrusted input
user_input = "__import__('os').system('rm -rf /')"
# eval(user_input)  # 💀 Disastrous!

# Use ast.literal_eval for safe parsing
import ast
try:
    result = ast.literal_eval("[1, 2, 3]")  # ✅ Safe
except (ValueError, SyntaxError):
    result = user_input  # Treat as string

# 2. Command injection
import subprocess
# ❌ Dangerous:
# subprocess.run(f"echo {user_input}", shell=True)
# ✅ Safe:
subprocess.run(["echo", user_input])  # no shell injection

# 3. SQL injection
import sqlite3
# ❌ Dangerous:
# conn.execute(f"SELECT * FROM users WHERE name = '{user_input}'")
# ✅ Safe:
conn.execute("SELECT * FROM users WHERE name = ?", (user_input,))

# 4. Pickle security
import pickle
# NEVER unpickle untrusted data
# pickle can execute arbitrary code during unpickling
class Evil:
    def __reduce__(self):
        return (os.system, ("malicious_command",))

# 5. Path traversal
import os
base_dir = "/app/data"
# ❌ Dangerous:
# path = os.path.join(base_dir, user_input)
# ✅ Safe:
user_input = user_input.strip("/")
if ".." in user_input or user_input.startswith("/"):
    raise ValueError("Invalid path")
path = os.path.join(base_dir, user_input)

# 6. Secure password handling
import hashlib, secrets

# Generate secure random token
token = secrets.token_hex(32)

# Constant-time comparison (prevent timing attacks)
def verify_password(stored, provided):
    return secrets.compare_digest(stored.encode(), provided.encode())

# 7. Input validation
import re
def validate_email(email):
    pattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    return re.match(pattern, email) is not None

# 8. HTTPS for network requests
import requests
# Always verify SSL
response = requests.get("https://api.example.com", verify=True)

# 9. Environment variables for secrets
import os
api_key = os.environ.get("API_KEY")
if not api_key:
    raise ValueError("API_KEY not set")
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q155. What are the most important Python 3.10–3.13 features?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Key features from recent Python versions:

```python
# Python 3.10 (October 2021)
# 1. Structural Pattern Matching (match-case)
def handle(value):
    match value:
        case (0, 0): return "origin"
        case (x, y): return f"({x}, {y})"

# 2. Parenthesized context managers
with (open("a.txt") as a, open("b.txt") as b):
    data = a.read() + b.read()

# 3. Type Union operator (|)
def greet(name: str | None) -> str:
    return f"Hello, {name}" if name else "Hello"

# 4. zip(strict=True)
items = [1, 2, 3]
labels = ["a", "b"]
# list(zip(items, labels, strict=True))  # ValueError: zip() argument 2 is shorter

# Python 3.11 (October 2022)
# 1. Exception Groups and except*
try:
    async with asyncio.TaskGroup() as tg:
        tg.create_task(task1())
        tg.create_task(task2())
except* ValueError as eg:
    for err in eg.exceptions:
        print(err)

# 2. Variadic Generics
from typing import TypeVarTuple

Ts = TypeVarTuple("Ts")
def first(*args: *Ts) -> Ts[0]:
    return args[0]

# 3. Self type
from typing import Self

class Builder:
    def set_name(self, name: str) -> Self:
        self.name = name
        return self

# 4. LiteralString
from typing import LiteralString
def execute(sql: LiteralString) -> None:
    pass  # safer against SQL injection

# Python 3.12 (October 2023)
# 1. Type parameter syntax
def max[T](a: T, b: T) -> T:
    return a if a > b else b

class Stack[T]:
    def push(self, item: T): ...

# 2. f-strings improvements
# Full support for quote reuse
d = {"key": "value"}
f"{d["key"]}"  # 'value' (previously SyntaxError)

# 3. perfected super()
class Base:
    def method(self): ...
class Child(Base):
    def method(self):
        super().method()  # no-arg super works in all contexts now

# Python 3.13 (October 2024)
# 1. Free-threaded CPython (no GIL, experimental)
# python3.13t --disable-gil

# 2. Improved error messages
# 1/0 → ZeroDivisionError: division by zero

# 3. JIT compiler (experimental)
# Tier 2 optimizer for hot code paths

# 4. Random docs
import random
# random.randbytes(n) — generate random bytes
# random.choice() improvements
```

</div>
</details>

---

> **💡 Tip:** Practice these questions by explaining them out loud or coding the examples. For interview prep, focus on Medium and Hard questions after mastering the Easy ones. Python's design philosophy emphasizes readability — your answers should reflect clear, Pythonic thinking.
