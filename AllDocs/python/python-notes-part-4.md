# 🐍 Python Notes — Part 4: Advanced Python Mastery

> **Author:** Senior Python Engineer & Technical Mentor | **Level:** Beginner to Advanced | **Version:** Python 3.10+

---

## 📋 Table of Contents

- [16. Iterators, Generators & Decorators](#16-iterators-generators--decorators)
  - [Iterators](#iterators)
  - [Generators](#generators)
  - [Decorators](#decorators)
- [17. Advanced Python Concepts](#17-advanced-python-concepts)
  - [Functional Programming](#functional-programming)
  - [Comprehensions](#comprehensions)
  - [Memory Management](#memory-management)
  - [Copying Objects](#copying-objects)
  - [Context Managers](#context-managers)
- [18. Multithreading, Multiprocessing & Async](#18-multithreading-multiprocessing--async-programming)
  - [Multithreading](#multithreading)
  - [Multiprocessing](#multiprocessing)
  - [Async Programming](#async-programming)
  - [GIL](#gil-global-interpreter-lock)
- [19. Database Programming in Python](#19-database-programming-in-python)
  - [SQL Databases](#sql-databases)
  - [ORM Concepts](#orm-concepts)
  - [NoSQL Introduction](#nosql-introduction)
- [20. Testing in Python](#20-testing-in-python)
  - [Unit Testing](#unit-testing)
  - [Pytest](#pytest)
  - [Test Concepts](#test-concepts)

---

# 16. Iterators, Generators & Decorators

---

## Iterators

### 🔍 What Are Iterators?

**Simple Explanation:**
An **iterator** is an object that lets you go through a collection one item at a time — like reading a book one page at a time, without loading every page into your head at once.

**Advanced Explanation:**
An iterator in Python is any object that implements two special methods:
- `__iter__()` — returns the iterator object itself
- `__next__()` — returns the next value in the sequence and raises `StopIteration` when exhausted

This is the **Iterator Protocol** — the foundation of Python's `for` loop, comprehensions, and many built-in functions.

---

### 📌 Iterable vs Iterator

| Feature | Iterable | Iterator |
|---|---|---|
| Definition | Object you can loop over | Object that tracks current position |
| Method | `__iter__()` | `__iter__()` + `__next__()` |
| Examples | `list`, `str`, `tuple`, `dict` | `iter(list)`, file objects, generators |
| Can reset? | ✅ Yes (create new iterator) | ❌ No (one-time use) |
| Memory | Stores all data | Stores only current state |

```python
# Iterable: a list
my_list = [1, 2, 3]
print(type(my_list))          # <class 'list'>
print(hasattr(my_list, '__iter__'))   # True
print(hasattr(my_list, '__next__'))   # False → NOT an iterator

# Iterator: result of iter()
my_iter = iter(my_list)
print(type(my_iter))          # <class 'list_iterator'>
print(hasattr(my_iter, '__iter__'))   # True
print(hasattr(my_iter, '__next__'))   # True → IS an iterator
```

---

### 🔧 `iter()` and `next()`

```python
fruits = ["apple", "banana", "cherry"]

# Create an iterator from the list
it = iter(fruits)

# Manually call next()
print(next(it))    # apple
print(next(it))    # banana
print(next(it))    # cherry
print(next(it))    # ❌ Raises StopIteration

# Using default with next()
print(next(it, "No more items"))  # No more items (no error!)
```

**What happens inside a `for` loop?**

```python
for fruit in fruits:
    print(fruit)
```

Python internally does:

```python
# Python's for loop internal mechanism
_iter = iter(fruits)       # Step 1: Create iterator
while True:
    try:
        item = next(_iter)  # Step 2: Get next item
        print(item)         # Step 3: Execute body
    except StopIteration:   # Step 4: Stop when exhausted
        break
```

---

### 🔄 Internal Working — Memory Diagram

```
MEMORY LAYOUT
═══════════════════════════════════════════════════════

  fruits = ["apple", "banana", "cherry"]
  ┌─────────────────────────────────────┐
  │  list object                        │
  │  [0] → "apple"                      │
  │  [1] → "banana"                     │
  │  [2] → "cherry"                     │
  └─────────────────────────────────────┘

  it = iter(fruits)
  ┌──────────────────┐
  │  list_iterator   │
  │  ref → fruits    │  ← Points to the list
  │  index = 0       │  ← Tracks current position
  └──────────────────┘

  next(it) → "apple"   → index becomes 1
  next(it) → "banana"  → index becomes 2
  next(it) → "cherry"  → index becomes 3
  next(it) → StopIteration raised!
```

---

### 🛑 StopIteration Exception

```python
it = iter([10, 20])

try:
    while True:
        val = next(it)
        print(val)
except StopIteration:
    print("Iterator exhausted!")

# Output:
# 10
# 20
# Iterator exhausted!
```

> ⚠️ **Common Mistake:** Calling `next()` on an exhausted iterator without handling `StopIteration` causes an unhandled exception crash.

---

### 🏗️ Custom Iterators

**Real-World Example: A Countdown Timer**

```python
class Countdown:
    """Custom iterator that counts down from n to 0."""
    
    def __init__(self, start):
        self.current = start
    
    def __iter__(self):
        return self        # The iterator IS itself
    
    def __next__(self):
        if self.current < 0:
            raise StopIteration
        value = self.current
        self.current -= 1
        return value


# Usage
timer = Countdown(5)

for t in timer:
    print(f"⏱️  {t}")

# Output:
# ⏱️  5
# ⏱️  4
# ⏱️  3
# ⏱️  2
# ⏱️  1
# ⏱️  0
```

**Real-World Example: Reading a Large File Line by Line**

```python
class FileLineIterator:
    """Memory-efficient file reader — loads one line at a time."""
    
    def __init__(self, filepath):
        self.filepath = filepath
        self.file = None
    
    def __iter__(self):
        self.file = open(self.filepath, 'r')
        return self
    
    def __next__(self):
        line = self.file.readline()
        if line == '':
            self.file.close()
            raise StopIteration
        return line.strip()


# Usage — reads a 10GB log file without loading it all into RAM
for line in FileLineIterator("access.log"):
    if "ERROR" in line:
        print(line)
```

**Example: Infinite Counter Iterator**

```python
class InfiniteCounter:
    def __init__(self, start=0, step=1):
        self.value = start
        self.step = step
    
    def __iter__(self):
        return self
    
    def __next__(self):
        current = self.value
        self.value += self.step
        return current

# Only take first 5 values using islice
from itertools import islice

counter = InfiniteCounter(start=10, step=5)
print(list(islice(counter, 5)))   # [10, 15, 20, 25, 30]
```

---

### 🔁 Flow Visualization

```
for item in iterable:
       │
       ▼
   iter(iterable)     ← Calls __iter__()
       │
       ▼
   iterator object    ← Has __next__() method
       │
   ┌───▼─────────────────────┐
   │   next(iterator)         │◄── Loop back here
   │   calls __next__()       │
   └───┬──────────┬──────────┘
       │          │
       ▼          ▼
   Returns     StopIteration
    value          raised
       │            │
   Execute       Break loop
   loop body
```

---

### ✅ Interview Questions — Iterators

1. **What is the difference between an iterable and an iterator?**
   > An iterable has `__iter__()` and can produce an iterator. An iterator has both `__iter__()` and `__next__()` and maintains state.

2. **Can an iterator be its own iterable?**
   > Yes — when `__iter__()` returns `self`. This is the most common pattern.

3. **What happens when you call `iter()` on an iterator?**
   > It returns the iterator itself — calling `iter()` twice on the same iterator doesn't reset it.

4. **Why doesn't calling `iter()` twice on a list give the same position?**
   > Because lists are **iterables**, not iterators. Each `iter()` call creates a fresh iterator with position 0.

---

## Generators

### 🔍 What Are Generators?

**Simple Explanation:**
A generator is a special function that pauses itself and remembers where it stopped. Instead of returning all results at once, it yields one result at a time, on demand — like a waiter taking orders one dish at a time instead of dumping the whole kitchen on your table.

**Advanced Explanation:**
Generators are a memory-efficient way to produce sequences. They implement the iterator protocol automatically using the `yield` keyword. When Python sees `yield` in a function, it transforms the function into a **generator function** that returns a **generator object** instead of executing immediately.

---

### ⚡ `yield` Keyword

```python
# Normal function — computes ALL values, stores in memory
def get_squares_list(n):
    result = []
    for i in range(n):
        result.append(i ** 2)
    return result  # Returns full list at once

# Generator function — computes ONE value at a time
def get_squares_gen(n):
    for i in range(n):
        yield i ** 2   # Pauses here, remembers state

# Using them
squares_list = get_squares_list(5)   # [0, 1, 4, 9, 16] — all in memory
squares_gen  = get_squares_gen(5)    # <generator object> — nothing computed yet

print(next(squares_gen))  # 0  (computed now)
print(next(squares_gen))  # 1  (computed now)
print(next(squares_gen))  # 4  (computed now)
```

**Execution Flow of a Generator:**

```
def squares(n):          ← Generator function defined
    for i in range(n):
        yield i ** 2

gen = squares(3)         ← Generator object created; NO code runs yet

next(gen)                ← Code runs until first "yield"
                            yields 0, then PAUSES

next(gen)                ← Resumes from after yield
                            yields 1, then PAUSES

next(gen)                ← Resumes again
                            yields 4, then PAUSES

next(gen)                ← Function ends → StopIteration raised
```

---

### 💾 Memory Optimization Comparison

```python
import sys

# List approach: stores ALL numbers in memory
big_list = [i * 2 for i in range(1_000_000)]
print(f"List size: {sys.getsizeof(big_list):,} bytes")  # ~8,697,456 bytes (~8.3 MB)

# Generator approach: stores only the generator state
def big_gen(n):
    for i in range(n):
        yield i * 2

gen = big_gen(1_000_000)
print(f"Generator size: {sys.getsizeof(gen):,} bytes")  # 112 bytes
```

| Approach | 1M Items Memory | Creation Time |
|---|---|---|
| List Comprehension | ~8.3 MB | Immediate (blocks) |
| Generator | ~112 bytes | Instant (lazy) |
| Tuple | ~8 MB | Immediate |

---

### 🏭 Generator Functions — Real-World Examples

**Example 1: Reading Large Files (Log Processing)**

```python
def read_large_log(filepath, filter_keyword=None):
    """Memory-efficient log reader — never loads entire file."""
    with open(filepath, 'r') as f:
        for line_number, line in enumerate(f, start=1):
            if filter_keyword is None or filter_keyword in line:
                yield line_number, line.strip()

# Process a 50GB log file — uses only ~112 bytes for the generator
for line_num, line in read_large_log("server.log", "ERROR"):
    print(f"Line {line_num}: {line}")
```

**Example 2: Data Pipeline (ETL)**

```python
def extract_data(source):
    """Extract rows from a data source."""
    for row in source:
        yield row

def transform(rows, multiplier=1.1):
    """Apply price increase transformation."""
    for row in rows:
        yield {**row, 'price': round(row['price'] * multiplier, 2)}

def load(rows, target_list):
    """Load into destination."""
    for row in rows:
        target_list.append(row)
        yield row

# Chain generators into a pipeline
source_data = [
    {"product": "Laptop", "price": 1000},
    {"product": "Phone",  "price": 500},
]

output = []
pipeline = load(transform(extract_data(source_data)), output)

for item in pipeline:
    print(f"Processed: {item}")

# Output:
# Processed: {'product': 'Laptop', 'price': 1100.0}
# Processed: {'product': 'Phone', 'price': 550.0}
```

---

### 🔁 Generator Expressions

Generator expressions are like list comprehensions but use `()` instead of `[]`.

```python
# List comprehension — computes everything immediately
squares_list = [x**2 for x in range(10)]
# [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# Generator expression — lazy, one at a time
squares_gen = (x**2 for x in range(10))
# <generator object <genexpr> at 0x...>

# Use in functions that accept iterables
total = sum(x**2 for x in range(1_000_000))   # ✅ Memory efficient
print(total)   # 333332833333500000

# Chaining generator expressions
data = range(1_000_000)
evens = (x for x in data if x % 2 == 0)
squares = (x**2 for x in evens)
big_squares = (x for x in squares if x > 1000)

# Nothing has been computed yet! Just pipeline definitions.
first_five = [next(big_squares) for _ in range(5)]
print(first_five)   # [1024, 1156, 1296, 1444, 1600]
```

---

### ♾️ Infinite Generators

```python
def fibonacci():
    """Generates infinite Fibonacci numbers."""
    a, b = 0, 1
    while True:         # Infinite loop — that's fine for generators!
        yield a
        a, b = b, a + b

# Use with islice to take only what you need
from itertools import islice, takewhile

fib = fibonacci()
print(list(islice(fib, 10)))
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

# All Fibonacci numbers below 100
fib2 = fibonacci()
below_100 = list(takewhile(lambda x: x < 100, fib2))
print(below_100)
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]
```

```python
def natural_numbers(start=1):
    """Infinite counter from start."""
    n = start
    while True:
        yield n
        n += 1

def primes():
    """Infinite prime number generator using Sieve of Eratosthenes style."""
    composites = {}
    n = 2
    while True:
        if n not in composites:
            yield n
            composites[n * n] = [n]
        else:
            for p in composites[n]:
                composites.setdefault(p + n, []).append(p)
            del composites[n]
        n += 1

# First 10 primes
from itertools import islice
print(list(islice(primes(), 10)))
# [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
```

---

### 📨 `send()` — Two-Way Communication

Generators aren't just one-way data producers — you can also **send data back into** a generator using `send()`.

```python
def accumulator():
    """Generator that accumulates values sent to it."""
    total = 0
    while True:
        value = yield total   # yield sends out total; receives value via send()
        if value is None:
            break
        total += value

acc = accumulator()
next(acc)               # Prime the generator (must call next() first!)

print(acc.send(10))     # 10   (total becomes 10)
print(acc.send(25))     # 35   (total becomes 35)
print(acc.send(5))      # 40   (total becomes 40)
```

**Real-World Use: Coroutine-Style Data Processor**

```python
def logger(prefix="LOG"):
    """Receives messages and formats them."""
    while True:
        message = yield
        print(f"[{prefix}] {message}")

log = logger("INFO")
next(log)               # Prime it

log.send("User logged in")       # [INFO] User logged in
log.send("Request processed")    # [INFO] Request processed
```

---

### 🔒 `close()` — Shutting Down a Generator

```python
def countdown(n):
    try:
        while n >= 0:
            yield n
            n -= 1
    except GeneratorExit:
        print("Generator closed! Cleanup done.")

gen = countdown(10)
print(next(gen))   # 10
print(next(gen))   # 9
gen.close()        # Generator closed! Cleanup done.
# next(gen)        # ❌ Would raise StopIteration
```

---

### 💥 `throw()` — Injecting Exceptions

```python
def safe_divider():
    """Generator that handles injected errors."""
    while True:
        try:
            value = yield
            print(f"Result: {10 / value}")
        except ZeroDivisionError:
            print("Cannot divide by zero!")

div = safe_divider()
next(div)

div.send(2)                            # Result: 5.0
div.send(5)                            # Result: 2.0
div.throw(ZeroDivisionError)           # Cannot divide by zero!
```

---

### 📊 Generator vs List Comparison

| Feature | Generator | List |
|---|---|---|
| Memory Usage | O(1) — constant | O(n) — grows with data |
| Speed (first item) | Instant | Depends on full computation |
| Speed (all items) | Slower (overhead per yield) | Fast (cache-friendly) |
| Re-usable? | ❌ One-time use | ✅ Multiple iterations |
| Indexing? | ❌ Not supported | ✅ `lst[3]` |
| Infinite sequences? | ✅ Yes | ❌ No |
| Best for | Large/infinite data, pipelines | Small data, random access |

---

### 🧠 Interview Questions — Generators

1. **What is lazy evaluation?**
   > Values are computed only when needed. Generators produce values on demand instead of all upfront.

2. **Why use generators over lists?**
   > Memory efficiency — especially for large datasets, infinite sequences, or data pipelines.

3. **What does `yield from` do?**

```python
def chain(*iterables):
    for it in iterables:
        yield from it   # Delegates to sub-iterator

print(list(chain([1,2], [3,4], [5,6])))
# [1, 2, 3, 4, 5, 6]
```

4. **Can a generator have a return statement?**
   > Yes. `return` in a generator raises `StopIteration` with the value as the exception's value attribute.

---

## Decorators

### 🔍 What Are Decorators?

**Simple Explanation:**
A decorator is a wrapper around a function — like putting a gift in a box. The gift (original function) is still inside, but you've added wrapping paper (extra behavior) around it. The decorator lets you add functionality without modifying the original function.

**Advanced Explanation:**
A decorator is a higher-order function that takes a function as input, adds behavior, and returns a new function. This pattern leverages Python's first-class functions — functions can be passed as arguments, returned from other functions, and stored in variables.

**Why Decorators Exist:**
- **DRY Principle** — Don't Repeat Yourself. Add logging, timing, auth checks, retry logic to multiple functions without copy-pasting code.
- **Separation of Concerns** — Keep business logic clean; put cross-cutting concerns (logging, auth) in decorators.
- **AOP** — Aspect-Oriented Programming pattern.

---

### 🏗️ Building Up to Decorators

**Step 1: Functions are First-Class Objects**

```python
def greet():
    return "Hello!"

# Assign to variable
say_hi = greet
print(say_hi())   # Hello!

# Pass as argument
def run(func):
    return func()

print(run(greet))   # Hello!
```

**Step 2: Nested Functions (Inner Functions)**

```python
def outer():
    def inner():      # inner is defined inside outer
        return "I'm inner!"
    return inner      # Return the function itself (not its result)

get_inner = outer()   # outer() returns inner function
print(get_inner())    # I'm inner!
```

**Step 3: Closures**

```python
def make_multiplier(factor):
    def multiply(number):
        return number * factor    # Uses "factor" from outer scope
    return multiply

double = make_multiplier(2)
triple = make_multiplier(3)

print(double(10))   # 20
print(triple(10))   # 30
```

> `double` and `triple` are **closures** — they "close over" the variable `factor` from their enclosing scope.

**Step 4: A Manual Decorator (Before Syntax Sugar)**

```python
def timer(func):
    """Measures execution time of any function."""
    import time
    
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)  # Call original function
        end = time.time()
        print(f"⏱️  {func.__name__} took {end - start:.4f} seconds")
        return result
    
    return wrapper


def slow_function():
    import time
    time.sleep(0.5)
    return "Done!"

# Manual decoration
slow_function = timer(slow_function)
print(slow_function())

# Output:
# ⏱️  slow_function took 0.5001 seconds
# Done!
```

**Step 5: The `@` Syntax Sugar**

```python
@timer                    # ← This is equivalent to: slow_function = timer(slow_function)
def slow_function():
    import time
    time.sleep(0.5)
    return "Done!"

print(slow_function())
```

---

### ✅ Complete Decorator Pattern with `functools.wraps`

```python
import functools

def my_decorator(func):
    @functools.wraps(func)   # Preserves original function's metadata
    def wrapper(*args, **kwargs):
        # Code BEFORE the function
        print(f"🔵 Calling {func.__name__}")
        
        result = func(*args, **kwargs)   # Call the original function
        
        # Code AFTER the function
        print(f"🟢 {func.__name__} completed")
        
        return result
    
    return wrapper


@my_decorator
def add(a, b):
    """Adds two numbers."""
    return a + b


print(add(3, 5))
print(add.__name__)   # add (preserved by @functools.wraps)
print(add.__doc__)    # Adds two numbers. (preserved)

# Output:
# 🔵 Calling add
# 🟢 add completed
# 8
```

> ⚠️ **Common Mistake:** Forgetting `@functools.wraps`. Without it, `func.__name__` returns `"wrapper"` instead of the original name, breaking introspection and debugging.

---

### 🌍 Real-World Decorator Examples

**1. Logging Decorator (Used in APIs)**

```python
import functools
import logging

logging.basicConfig(level=logging.INFO)

def log_calls(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        logging.info(f"Calling {func.__name__} with args={args} kwargs={kwargs}")
        result = func(*args, **kwargs)
        logging.info(f"{func.__name__} returned {result}")
        return result
    return wrapper


@log_calls
def create_user(username, email):
    return {"id": 1, "username": username, "email": email}

create_user("alice", email="alice@example.com")
# INFO:root:Calling create_user with args=('alice',) kwargs={'email': 'alice@example.com'}
# INFO:root:create_user returned {'id': 1, 'username': 'alice', 'email': 'alice@example.com'}
```

**2. Authentication Decorator (Used in Flask/FastAPI)**

```python
import functools

def require_auth(func):
    @functools.wraps(func)
    def wrapper(request, *args, **kwargs):
        if not request.get("authenticated"):
            return {"error": "401 Unauthorized"}
        return func(request, *args, **kwargs)
    return wrapper


@require_auth
def get_dashboard(request):
    return {"data": "Your secret dashboard"}


# Simulate requests
print(get_dashboard({"authenticated": False}))  # {'error': '401 Unauthorized'}
print(get_dashboard({"authenticated": True}))   # {'data': 'Your secret dashboard'}
```

**3. Retry Decorator (Used in Microservices)**

```python
import functools
import time
import random

def retry(max_attempts=3, delay=1.0, exceptions=(Exception,)):
    """Retry decorator with configurable attempts and delay."""
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            last_exception = None
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except exceptions as e:
                    last_exception = e
                    print(f"⚠️ Attempt {attempt} failed: {e}. Retrying in {delay}s...")
                    time.sleep(delay)
            raise last_exception
        return wrapper
    return decorator


@retry(max_attempts=3, delay=0.5, exceptions=(ConnectionError,))
def call_external_api():
    if random.random() < 0.7:   # 70% chance of failure
        raise ConnectionError("API unreachable")
    return {"status": "success"}

try:
    result = call_external_api()
    print(result)
except ConnectionError:
    print("❌ All retry attempts failed")
```

**4. Cache/Memoization Decorator**

```python
import functools

def memoize(func):
    cache = {}
    
    @functools.wraps(func)
    def wrapper(*args):
        if args not in cache:
            cache[args] = func(*args)
        return cache[args]
    
    return wrapper


@memoize
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)


print(fibonacci(35))   # Instant! (vs seconds without memoization)

# Python's built-in version:
from functools import lru_cache

@lru_cache(maxsize=128)
def fibonacci_builtin(n):
    if n <= 1:
        return n
    return fibonacci_builtin(n - 1) + fibonacci_builtin(n - 2)
```

---

### 🔗 Decorator Chaining

Multiple decorators stack like layers — applied **bottom-up** but **executed top-down**.

```python
import functools

def bold(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        return f"<b>{func(*args, **kwargs)}</b>"
    return wrapper

def italic(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        return f"<i>{func(*args, **kwargs)}</i>"
    return wrapper

def uppercase(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs).upper()
    return wrapper


@bold       # Applied 3rd (outermost)
@italic     # Applied 2nd
@uppercase  # Applied 1st (innermost)
def greet(name):
    return f"hello, {name}"


print(greet("Alice"))
# <b><i>HELLO, ALICE</i></b>

# Equivalent to:
# bold(italic(uppercase(greet)))("Alice")
```

**Execution Flow Diagram:**

```
greet("Alice")
      │
      ▼
  bold.wrapper called
      │  calls italic.wrapper
      ▼
  italic.wrapper called
      │  calls uppercase.wrapper
      ▼
  uppercase.wrapper called
      │  calls original greet("Alice")
      ▼
  "hello, alice"   ← original return
      │
  uppercase: "HELLO, ALICE"
      │
  italic: "<i>HELLO, ALICE</i>"
      │
  bold: "<b><i>HELLO, ALICE</i></b>"
      │
  Final result returned to caller
```

---

### 🎛️ Decorators with Arguments

When your decorator itself needs arguments, you add one more layer of nesting.

```python
import functools
import time

def rate_limit(calls_per_second=1):
    """Decorator with argument: limits how often a function can be called."""
    min_interval = 1.0 / calls_per_second
    last_called = [0.0]   # Use list for mutable closure variable
    
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            now = time.time()
            elapsed = now - last_called[0]
            
            if elapsed < min_interval:
                time.sleep(min_interval - elapsed)
            
            last_called[0] = time.time()
            return func(*args, **kwargs)
        
        return wrapper
    return decorator


@rate_limit(calls_per_second=2)   # Max 2 calls per second
def send_notification(message):
    print(f"📨 Sent: {message}")


for i in range(5):
    send_notification(f"Message {i}")
```

---

### 🏛️ Class Decorators

Classes can be used as decorators. They're useful when the decorator needs to maintain state across calls.

```python
import functools

class CallCounter:
    """Counts how many times a function has been called."""
    
    def __init__(self, func):
        functools.update_wrapper(self, func)
        self.func = func
        self.count = 0
    
    def __call__(self, *args, **kwargs):
        self.count += 1
        print(f"📊 {self.func.__name__} called {self.count} time(s)")
        return self.func(*args, **kwargs)


@CallCounter
def process_order(order_id):
    return f"Processing order #{order_id}"


process_order(101)    # 📊 process_order called 1 time(s)
process_order(102)    # 📊 process_order called 2 time(s)
process_order(103)    # 📊 process_order called 3 time(s)

print(f"Total calls: {process_order.count}")   # Total calls: 3
```

---

### 🏷️ Built-in Decorators

#### `@property`

Turns a method into a "computed attribute" — accessed like a variable but computed like a function.

```python
class Circle:
    def __init__(self, radius):
        self._radius = radius    # Private attribute
    
    @property
    def radius(self):
        """Getter — access like circle.radius"""
        return self._radius
    
    @radius.setter
    def radius(self, value):
        """Setter — validates before setting"""
        if value < 0:
            raise ValueError("Radius cannot be negative!")
        self._radius = value
    
    @radius.deleter
    def radius(self):
        """Deleter"""
        print("Deleting radius!")
        del self._radius
    
    @property
    def area(self):
        """Computed property — no setter needed"""
        import math
        return round(math.pi * self._radius ** 2, 2)
    
    @property
    def circumference(self):
        import math
        return round(2 * math.pi * self._radius, 2)


c = Circle(5)
print(c.radius)        # 5          (calls getter)
print(c.area)          # 78.54      (computed, no parentheses!)
print(c.circumference) # 31.42

c.radius = 10          # Calls setter (validates)
print(c.area)          # 314.16

c.radius = -1          # ❌ ValueError: Radius cannot be negative!
```

#### `@staticmethod`

A method that belongs to the class but doesn't need access to `self` or `cls`. Like a regular function that lives in the class namespace.

```python
class MathUtils:
    @staticmethod
    def add(a, b):
        return a + b
    
    @staticmethod
    def is_prime(n):
        if n < 2:
            return False
        for i in range(2, int(n**0.5) + 1):
            if n % i == 0:
                return False
        return True


# Call without creating an instance
print(MathUtils.add(3, 5))       # 8
print(MathUtils.is_prime(17))    # True
print(MathUtils.is_prime(20))    # False

# Can also call on an instance (but not recommended)
utils = MathUtils()
print(utils.add(10, 20))         # 30
```

#### `@classmethod`

A method that receives the **class** (`cls`) as its first argument — not an instance. Commonly used as alternative constructors.

```python
class User:
    def __init__(self, name, email, age):
        self.name = name
        self.email = email
        self.age = age
    
    @classmethod
    def from_dict(cls, data: dict):
        """Alternative constructor from dictionary."""
        return cls(data['name'], data['email'], data['age'])
    
    @classmethod
    def from_string(cls, user_string: str):
        """Alternative constructor from 'name:email:age' string."""
        name, email, age = user_string.split(':')
        return cls(name, email, int(age))
    
    def __repr__(self):
        return f"User({self.name}, {self.email}, {self.age})"


# Multiple ways to create users
u1 = User("Alice", "alice@example.com", 30)
u2 = User.from_dict({"name": "Bob", "email": "bob@example.com", "age": 25})
u3 = User.from_string("Charlie:charlie@example.com:35")

print(u1)   # User(Alice, alice@example.com, 30)
print(u2)   # User(Bob, bob@example.com, 25)
print(u3)   # User(Charlie, charlie@example.com, 35)
```

| Decorator | First Arg | Access to instance? | Access to class? | Common Use |
|---|---|---|---|---|
| (normal method) | `self` | ✅ Yes | ✅ Via `self.__class__` | Instance operations |
| `@classmethod` | `cls` | ❌ No | ✅ Yes | Alternative constructors, factory methods |
| `@staticmethod` | (none) | ❌ No | ❌ No | Utility functions related to class |

---

### 🧠 Interview Questions — Decorators

1. **What is a closure and why do decorators need it?**
   > A closure is a function that "remembers" variables from its enclosing scope. Decorators use closures to wrap the original function and preserve access to it inside the wrapper.

2. **Why use `@functools.wraps`?**
   > Without it, the wrapped function loses its `__name__`, `__doc__`, and `__module__`. This breaks introspection, logging, and documentation tools.

3. **What is the difference between `@staticmethod` and `@classmethod`?**
   > `@staticmethod` gets no implicit first argument; `@classmethod` gets `cls` (the class). Use `@classmethod` when you need to create instances or access class-level data.

---

# 17. Advanced Python Concepts

---

## Functional Programming

Functional programming treats computation as the evaluation of mathematical functions. Python supports FP through higher-order functions.

### 🗺️ `map()`

Applies a function to every item in an iterable. Returns a **lazy iterator**.

```python
# Syntax: map(function, iterable)

numbers = [1, 2, 3, 4, 5]

# Using map with a regular function
def square(x):
    return x ** 2

squared = map(square, numbers)
print(list(squared))   # [1, 4, 9, 16, 25]

# Using map with lambda
doubled = map(lambda x: x * 2, numbers)
print(list(doubled))   # [2, 4, 6, 8, 10]

# map() with multiple iterables
a = [1, 2, 3]
b = [10, 20, 30]
sums = map(lambda x, y: x + y, a, b)
print(list(sums))   # [11, 22, 33]

# Real-world: Normalize API response fields
users = [{"name": "alice", "age": "25"}, {"name": "BOB", "age": "30"}]
normalized = map(lambda u: {
    "name": u["name"].title(),
    "age": int(u["age"])
}, users)
print(list(normalized))
# [{'name': 'Alice', 'age': 25}, {'name': 'Bob', 'age': 30}]
```

---

### 🔽 `filter()`

Filters items based on a condition. Returns a lazy iterator of items where the function returns `True`.

```python
numbers = range(-5, 6)   # -5 to 5

# Filter positive numbers
positives = filter(lambda x: x > 0, numbers)
print(list(positives))   # [1, 2, 3, 4, 5]

# Filter None values (pass None as function)
data = [1, None, 2, None, 3, 0, False, "hello"]
truthy = filter(None, data)   # Keeps only truthy values
print(list(truthy))   # [1, 2, 3, 'hello']

# Real-world: Filter active users
users = [
    {"name": "Alice", "active": True},
    {"name": "Bob", "active": False},
    {"name": "Charlie", "active": True},
]
active_users = filter(lambda u: u["active"], users)
print(list(active_users))
# [{'name': 'Alice', 'active': True}, {'name': 'Charlie', 'active': True}]
```

---

### ➕ `reduce()`

Applies a function cumulatively to items in a sequence, reducing them to a single value.

```python
from functools import reduce

numbers = [1, 2, 3, 4, 5]

# Sum (equivalent to sum())
total = reduce(lambda acc, x: acc + x, numbers)
print(total)   # 15

# Step-by-step:
# ((((1 + 2) + 3) + 4) + 5) = 15

# Product of all numbers
product = reduce(lambda acc, x: acc * x, numbers)
print(product)   # 120

# Find maximum (equivalent to max())
maximum = reduce(lambda a, b: a if a > b else b, numbers)
print(maximum)   # 5

# With initial value
total_with_init = reduce(lambda acc, x: acc + x, numbers, 100)
print(total_with_init)   # 115 (starts from 100)

# Real-world: Flatten nested list
nested = [[1, 2], [3, 4], [5, 6]]
flat = reduce(lambda acc, lst: acc + lst, nested)
print(flat)   # [1, 2, 3, 4, 5, 6]
```

---

### 🤐 `zip()`

Pairs up elements from multiple iterables into tuples.

```python
names = ["Alice", "Bob", "Charlie"]
scores = [95, 87, 92]
grades = ["A", "B", "A"]

# Zip two
for name, score in zip(names, scores):
    print(f"{name}: {score}")
# Alice: 95
# Bob: 87
# Charlie: 92

# Zip three
combined = list(zip(names, scores, grades))
print(combined)
# [('Alice', 95, 'A'), ('Bob', 87, 'B'), ('Charlie', 92, 'A')]

# Unzip (transpose)
pairs = [(1, 'a'), (2, 'b'), (3, 'c')]
numbers, letters = zip(*pairs)
print(numbers)   # (1, 2, 3)
print(letters)   # ('a', 'b', 'c')

# zip stops at shortest iterable
short = [1, 2]
long = [10, 20, 30, 40]
print(list(zip(short, long)))   # [(1, 10), (2, 20)]

# zip_longest fills missing values
from itertools import zip_longest
print(list(zip_longest(short, long, fillvalue=0)))
# [(1, 10), (2, 20), (0, 30), (0, 40)]

# Real-world: Create dict from two lists
keys = ["name", "age", "city"]
values = ["Alice", 30, "Mumbai"]
user = dict(zip(keys, values))
print(user)   # {'name': 'Alice', 'age': 30, 'city': 'Mumbai'}
```

---

### 🔢 `enumerate()`

Returns `(index, value)` pairs from an iterable. Eliminates manual counter management.

```python
fruits = ["apple", "banana", "cherry"]

# Without enumerate (bad practice)
i = 0
for fruit in fruits:
    print(f"{i}: {fruit}")
    i += 1

# With enumerate (Pythonic!)
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

# Custom start index
for index, fruit in enumerate(fruits, start=1):
    print(f"{index}. {fruit}")
# 1. apple
# 2. banana
# 3. cherry

# Real-world: Display menu
def show_menu(options):
    for i, option in enumerate(options, start=1):
        print(f"  [{i}] {option}")

show_menu(["View Profile", "Edit Settings", "Logout"])
# [1] View Profile
# [2] Edit Settings
# [3] Logout
```

---

### ✅ `any()` and `all()`

```python
numbers = [0, 1, 2, 3]

# any() — True if AT LEAST ONE item is truthy
print(any(numbers))             # True (1, 2, 3 are truthy)
print(any(x > 5 for x in numbers))  # False (no number > 5)
print(any([0, False, None, ""]))    # False (all falsy)

# all() — True if ALL items are truthy
print(all(numbers))              # False (0 is falsy)
print(all(x >= 0 for x in numbers))  # True (all ≥ 0)
print(all([1, 2, 3]))            # True

# Real-world: Validate form fields
def validate_form(data: dict) -> bool:
    required_fields = ["name", "email", "age"]
    return all(data.get(field) for field in required_fields)

print(validate_form({"name": "Alice", "email": "a@b.com", "age": 25}))  # True
print(validate_form({"name": "Alice", "email": ""}))                      # False

# Check if any user has admin role
users = [{"name": "Alice", "role": "user"}, {"name": "Bob", "role": "admin"}]
print(any(u["role"] == "admin" for u in users))   # True
```

---

## Comprehensions

### 📋 List Comprehension

```python
# Syntax: [expression for item in iterable if condition]

# Basic
squares = [x**2 for x in range(10)]
print(squares)   # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# With condition
evens = [x for x in range(20) if x % 2 == 0]
print(evens)   # [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# With if-else (ternary inside comprehension)
labels = ["even" if x % 2 == 0 else "odd" for x in range(6)]
print(labels)   # ['even', 'odd', 'even', 'odd', 'even', 'odd']

# Nested loops in comprehension
matrix = [[1,2,3], [4,5,6], [7,8,9]]
flat = [num for row in matrix for num in row]
print(flat)   # [1, 2, 3, 4, 5, 6, 7, 8, 9]

# Nested list comprehension (matrix transposition)
transposed = [[row[i] for row in matrix] for i in range(3)]
print(transposed)   # [[1, 4, 7], [2, 5, 8], [3, 6, 9]]

# Real-world: Extract emails from user list
users = [
    {"name": "Alice", "email": "alice@co.com", "active": True},
    {"name": "Bob", "email": "bob@co.com", "active": False},
    {"name": "Charlie", "email": "charlie@co.com", "active": True},
]
active_emails = [u["email"] for u in users if u["active"]]
print(active_emails)   # ['alice@co.com', 'charlie@co.com']
```

---

### 🔵 Set Comprehension

```python
# Syntax: {expression for item in iterable if condition}

numbers = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]

# Deduplicate automatically
unique_squares = {x**2 for x in numbers}
print(unique_squares)   # {1, 4, 9, 16} (no duplicates, unordered)

# Real-world: Unique domains from emails
emails = ["alice@gmail.com", "bob@yahoo.com", "charlie@gmail.com", "dave@hotmail.com"]
domains = {email.split("@")[1] for email in emails}
print(domains)   # {'gmail.com', 'yahoo.com', 'hotmail.com'}
```

---

### 📖 Dictionary Comprehension

```python
# Syntax: {key_expr: value_expr for item in iterable if condition}

# Basic
squares_dict = {x: x**2 for x in range(6)}
print(squares_dict)   # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# Invert a dictionary
original = {"a": 1, "b": 2, "c": 3}
inverted = {v: k for k, v in original.items()}
print(inverted)   # {1: 'a', 2: 'b', 3: 'c'}

# Filter and transform
prices = {"apple": 1.5, "banana": 0.5, "cherry": 3.0, "grape": 2.5}
expensive = {item: price for item, price in prices.items() if price > 1.0}
print(expensive)   # {'apple': 1.5, 'cherry': 3.0, 'grape': 2.5}

# Real-world: Create user index from list
users = [
    {"id": 1, "name": "Alice"},
    {"id": 2, "name": "Bob"},
    {"id": 3, "name": "Charlie"}
]
user_index = {u["id"]: u["name"] for u in users}
print(user_index)   # {1: 'Alice', 2: 'Bob', 3: 'Charlie'}
print(user_index[2])  # Bob — O(1) lookup!
```

---

### ⚙️ Generator Comprehension (Expression)

```python
# Syntax: (expression for item in iterable if condition)
# Note: uses () — returns a generator, NOT a tuple

gen = (x**2 for x in range(10))
print(type(gen))    # <class 'generator'>
print(next(gen))    # 0
print(next(gen))    # 1

# Most efficient: pass directly to functions
total = sum(x**2 for x in range(1_000_000))   # No intermediate list!
maximum = max(x**3 for x in range(100) if x % 7 == 0)
```

**Comparison Table:**

| Type | Syntax | Result | Memory | Re-usable |
|---|---|---|---|---|
| List | `[x for x in ...]` | `list` | O(n) | ✅ |
| Set | `{x for x in ...}` | `set` | O(n) | ✅ |
| Dict | `{k:v for k,v in ...}` | `dict` | O(n) | ✅ |
| Generator | `(x for x in ...)` | `generator` | O(1) | ❌ |

---

## Memory Management

### 🧱 Stack vs Heap

```
MEMORY ARCHITECTURE
═══════════════════════════════════════════════════

  STACK                           HEAP
  (function call frames)          (actual objects)
  ┌──────────────┐                ┌───────────────────┐
  │ main()       │                │  str object       │
  │  x ──────────┼───────────────►│  "Hello, World!"  │
  │  y ──────────┼──────┐        └───────────────────┘
  └──────────────┘      │        ┌───────────────────┐
  ┌──────────────┐      └───────►│  int object       │
  │ greet()      │               │  42               │
  │  name ───────┼──────────────►│  (cached -5..256) │
  └──────────────┘               └───────────────────┘

Stack: Fast, small, auto-managed (function lifetime)
Heap:  Slower, large, garbage collected (object lifetime)
```

```python
x = 42           # Stack: variable 'x', Heap: int object 42
y = "hello"      # Stack: variable 'y', Heap: str object "hello"
lst = [1, 2, 3]  # Stack: variable 'lst', Heap: list object + int objects

def func():
    local_var = 100   # Stack frame created; auto-cleaned when func() returns
    return local_var

# Stack frame destroyed when func() returns
# local_var object on heap gets reference count decremented
```

---

### 🔢 Reference Counting

Python's primary memory management mechanism. Every object has a reference count (`ob_refcnt`). When it reaches 0, the memory is freed immediately.

```python
import sys

# Reference counting demonstration
x = [1, 2, 3]
print(sys.getrefcount(x))   # 2 (x + getrefcount's argument)

y = x                        # Another reference
print(sys.getrefcount(x))   # 3

z = x
print(sys.getrefcount(x))   # 4

del z                        # Remove one reference
print(sys.getrefcount(x))   # 3

y = None                     # Remove another reference
print(sys.getrefcount(x))   # 2

# When count reaches 0, memory is freed
del x                        # Remaining reference (y was None, so count was 2 → 1 now)
# Actually deleting x here reduces to 1 (the local variable)
# Once this scope ends, the list gets freed
```

**How Reference Counting Works Internally:**

```
x = [1, 2, 3]
                    ┌─────────────────────┐
  x ──────────────►│  list object        │
                   │  ob_refcnt = 1       │
                   │  data: [1, 2, 3]     │
                   └─────────────────────┘

y = x              ← ob_refcnt becomes 2
del y              ← ob_refcnt becomes 1
del x              ← ob_refcnt becomes 0 → FREED
```

---

### ♻️ Garbage Collection

Reference counting can't handle **circular references**. Python's `gc` module handles those.

```python
# Circular reference — reference counting can't free this!
class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

a = Node(1)
b = Node(2)
a.next = b    # a → b
b.next = a    # b → a ← CIRCULAR!

# Even after del, refcounts don't reach 0
del a
del b
# Both objects still alive! Refcounts: 1 each (pointing to each other)
# Python's garbage collector detects and cleans this up
```

```python
import gc

# Force garbage collection
collected = gc.collect()
print(f"Collected {collected} objects")

# Get garbage collector stats
print(gc.get_count())      # (objects in gen 0, gen 1, gen 2)
print(gc.get_threshold())  # (700, 10, 10) — when each generation triggers

# Generational GC:
# Generation 0: Young objects — collected frequently (threshold: 700)
# Generation 1: Survived one collection — collected less often
# Generation 2: Long-lived objects — collected rarely
```

---

### 🗑️ `del` Keyword

```python
# del removes a NAME (reference), not necessarily the object
x = [1, 2, 3]
y = x           # Same object, two names

del x           # Removes name 'x', but object still alive (y points to it)
print(y)        # [1, 2, 3] — still accessible!

del y           # Now no references → object freed

# del with list items
lst = [10, 20, 30, 40, 50]
del lst[2]          # Remove index 2
print(lst)          # [10, 20, 40, 50]

del lst[1:3]        # Remove slice
print(lst)          # [10, 50]

# del with dict keys
d = {"a": 1, "b": 2, "c": 3}
del d["b"]
print(d)            # {'a': 1, 'c': 3}
```

---

## Copying Objects

### 📋 Assignment vs Copy

```python
# Assignment: SAME object, new name
original = [1, 2, [3, 4]]
reference = original    # No copy! Both point to same list

reference.append(99)
print(original)     # [1, 2, [3, 4], 99]  ← CHANGED!
```

### 📦 Shallow Copy

Copies the container structure but **not the nested objects** — nested objects are still shared.

```python
import copy

original = [1, 2, [3, 4]]

# Shallow copy — three ways
shallow1 = original.copy()           # list.copy()
shallow2 = original[:]               # slicing
shallow3 = copy.copy(original)       # copy module
shallow4 = list(original)            # list constructor

# Modify outer list
shallow1.append(99)
print(original)    # [1, 2, [3, 4]]   ← NOT affected (different container)
print(shallow1)    # [1, 2, [3, 4], 99]

# Modify nested object
shallow1[2].append(999)
print(original)    # [1, 2, [3, 4, 999]]   ← AFFECTED! (shared nested list)
print(shallow1)    # [1, 2, [3, 4, 999], 99]
```

**Shallow Copy Memory Diagram:**

```
original = [1, 2, [3, 4]]
shallow  = original.copy()

  original                shallow
  ┌────┐                  ┌────┐
  │ 1  │                  │ 1  │
  │ 2  │                  │ 2  │
  │ ───┼──────┐   ┌───────┼────│
  └────┘      │   │       └────┘
              ▼   ▼
            ┌────────┐
            │  [3,4] │  ← SAME OBJECT (shared!)
            └────────┘
```

### 🔬 Deep Copy

Creates a completely independent copy — including all nested objects.

```python
import copy

original = [1, 2, [3, 4, {"key": "value"}]]

deep = copy.deepcopy(original)

# Modify nested structure
deep[2].append(999)
deep[2][2]["new_key"] = "new_value"

print(original)  # [1, 2, [3, 4, {'key': 'value'}]]       ← NOT affected
print(deep)      # [1, 2, [3, 4, {'key': 'value', 'new_key': 'new_value'}, 999]]
```

**Deep Copy Memory Diagram:**

```
original = [1, 2, [3, 4]]
deep     = copy.deepcopy(original)

  original                deep
  ┌────┐                  ┌────┐
  │ 1  │                  │ 1  │  ← New int objects
  │ 2  │                  │ 2  │
  │ ───┼──►[3,4]          │ ───┼──►[3,4]  ← Completely new list
  └────┘                  └────┘          and new int objects
```

**When to Use Each:**

| Scenario | Copy Type |
|---|---|
| Simple flat list/dict | `shallow copy` |
| Nested mutable objects you need to modify | `deep copy` |
| Just another name | assignment |
| Config objects with nested dicts | `deep copy` |
| DataFrame operations | shallow (usually) |

---

## Context Managers

### 🔍 What Are Context Managers?

Context managers manage **setup and teardown** automatically. The canonical example: opening a file. Even if an exception occurs, the file is always properly closed.

**The Problem Without Context Managers:**

```python
# ❌ Bad: File might not get closed if exception occurs
f = open("data.txt", "r")
data = f.read()     # What if this raises an exception?
f.close()           # Never reached if exception above!
```

**The Solution — `with` Statement:**

```python
# ✅ Good: File is ALWAYS closed, even if exception occurs
with open("data.txt", "r") as f:
    data = f.read()    # Exception here? File still gets closed!
# f is automatically closed here
```

---

### 🏗️ `__enter__` and `__exit__`

```python
class DatabaseConnection:
    """Custom context manager for database connections."""
    
    def __init__(self, host, port):
        self.host = host
        self.port = port
        self.connection = None
    
    def __enter__(self):
        """Called when 'with' block starts."""
        print(f"🔌 Connecting to {self.host}:{self.port}")
        self.connection = f"conn_{self.host}"   # Simulate connection
        return self.connection   # This becomes the 'as' variable
    
    def __exit__(self, exc_type, exc_value, traceback):
        """Called when 'with' block ends (even on exception).
        
        Args:
            exc_type:   Exception class (None if no exception)
            exc_value:  Exception instance (None if no exception)
            traceback:  Traceback object (None if no exception)
        
        Returns:
            True to suppress exception, False/None to propagate
        """
        if exc_type:
            print(f"❌ Exception occurred: {exc_value}")
            print("🔄 Rolling back transaction...")
        else:
            print("✅ Committing transaction...")
        
        print(f"🔌 Disconnecting from {self.host}")
        self.connection = None
        
        return False   # Don't suppress exceptions


# Usage
with DatabaseConnection("localhost", 5432) as conn:
    print(f"Using connection: {conn}")
    # Do database work
    query_result = "data"

print()

# With exception
with DatabaseConnection("localhost", 5432) as conn:
    raise ValueError("Query failed!")

# Output:
# 🔌 Connecting to localhost:5432
# Using connection: conn_localhost
# ✅ Committing transaction...
# 🔌 Disconnecting from localhost
#
# 🔌 Connecting to localhost:5432
# ❌ Exception occurred: Query failed!
# 🔄 Rolling back transaction...
# 🔌 Disconnecting from localhost
# ValueError: Query failed!   ← Re-raised (return False)
```

---

### 🛠️ `contextlib` Module

The `contextlib` module provides utilities for creating context managers without writing a full class.

```python
from contextlib import contextmanager, suppress, nullcontext
import time

# @contextmanager — turn a generator into a context manager
@contextmanager
def timer(label=""):
    """Context manager that measures execution time."""
    start = time.perf_counter()
    try:
        yield   # Code in 'with' block runs here
    finally:
        elapsed = time.perf_counter() - start
        print(f"⏱️  {label}: {elapsed:.4f}s")


with timer("Matrix multiplication"):
    result = sum(i * j for i in range(1000) for j in range(1000))

# ⏱️  Matrix multiplication: 0.1234s


# suppress — suppress specific exceptions silently
with suppress(FileNotFoundError):
    open("nonexistent_file.txt")   # No error raised!
print("Continued after suppressed exception")


# Practical context manager: temporary directory
import tempfile, os, shutil

@contextmanager
def temp_directory():
    """Creates a temp dir and cleans it up automatically."""
    tmpdir = tempfile.mkdtemp()
    try:
        print(f"📁 Created temp dir: {tmpdir}")
        yield tmpdir
    finally:
        shutil.rmtree(tmpdir)
        print(f"🗑️  Cleaned up: {tmpdir}")


with temp_directory() as tmpdir:
    # Work with temporary files
    filepath = os.path.join(tmpdir, "test.txt")
    with open(filepath, "w") as f:
        f.write("Temporary data")
    print(f"📝 Wrote to {filepath}")
# Directory is automatically deleted!
```

---

### 🔗 Nesting and Combining Context Managers

```python
# Multiple context managers in one with statement
with open("input.txt") as infile, open("output.txt", "w") as outfile:
    for line in infile:
        outfile.write(line.upper())

# Equivalent to (but cleaner than):
with open("input.txt") as infile:
    with open("output.txt", "w") as outfile:
        for line in infile:
            outfile.write(line.upper())
```

---

# 18. Multithreading, Multiprocessing & Async Programming

---

## Multithreading

### 🔍 What Is Multithreading?

**Simple Explanation:**
Multithreading is like having multiple workers in the same kitchen. They share the same space, tools, and ingredients. This works great for waiting tasks (waiting for delivery) but can cause problems if two workers grab the same knife at once.

**Technical Definition:**
Threads are the smallest unit of execution within a process. All threads in a process share the same memory space (heap), making communication easy but requiring synchronization to avoid race conditions.

**When to Use Threads:**
- I/O-bound tasks: network requests, file operations, database queries
- Tasks with lots of waiting time
- Concurrent web scraping
- Background tasks (logging, monitoring)

**When NOT to Use Threads:**
- CPU-bound tasks (mathematical computation, image processing) — use Multiprocessing instead

---

### 🔄 Thread Lifecycle

```
NEW ──► RUNNABLE ──► RUNNING ──► TERMINATED
             │           │
             │      BLOCKED/WAITING
             │     (I/O, sleep, lock)
             └──────────────────
```

---

### 🚀 Creating Threads

```python
import threading
import time

# Method 1: Using threading.Thread directly
def download_file(filename, duration):
    """Simulates downloading a file."""
    print(f"⬇️  Starting download: {filename}")
    time.sleep(duration)    # Simulate I/O wait
    print(f"✅ Completed: {filename}")

# Without threading (sequential — takes 6 seconds total)
start = time.time()
download_file("report.pdf", 2)
download_file("image.jpg", 2)
download_file("video.mp4", 2)
print(f"Sequential time: {time.time() - start:.2f}s")  # ~6s


# With threading (concurrent — takes ~2 seconds)
start = time.time()

threads = [
    threading.Thread(target=download_file, args=("report.pdf", 2)),
    threading.Thread(target=download_file, args=("image.jpg", 2)),
    threading.Thread(target=download_file, args=("video.mp4", 2)),
]

for t in threads:
    t.start()     # Start all threads

for t in threads:
    t.join()      # Wait for all to complete

print(f"Concurrent time: {time.time() - start:.2f}s")  # ~2s
```

```python
# Method 2: Subclassing Thread
class WorkerThread(threading.Thread):
    def __init__(self, task_id, data):
        super().__init__()
        self.task_id = task_id
        self.data = data
        self.result = None
    
    def run(self):
        """This method runs in the new thread."""
        print(f"Thread {self.task_id} processing {len(self.data)} items")
        time.sleep(0.1)
        self.result = sum(self.data)


workers = [WorkerThread(i, range(i*100, (i+1)*100)) for i in range(5)]

for w in workers:
    w.start()

for w in workers:
    w.join()
    print(f"Thread {w.task_id} result: {w.result}")
```

---

### 🔒 Thread Synchronization — Locks

Without synchronization, threads can corrupt shared data:

```python
import threading

# ❌ Race condition — unsynchronized access
counter = 0

def increment_unsafe():
    global counter
    for _ in range(100_000):
        counter += 1    # NOT atomic! Read → Modify → Write

threads = [threading.Thread(target=increment_unsafe) for _ in range(5)]
for t in threads:
    t.start()
for t in threads:
    t.join()

print(f"Expected: 500000, Got: {counter}")  # Random! < 500000 due to race condition
```

```python
# ✅ Thread-safe with Lock
counter = 0
lock = threading.Lock()

def increment_safe():
    global counter
    for _ in range(100_000):
        with lock:          # Acquire lock → only one thread enters at a time
            counter += 1   # Critical section — safe!
        # Lock automatically released here

threads = [threading.Thread(target=increment_safe) for _ in range(5)]
for t in threads:
    t.start()
for t in threads:
    t.join()

print(f"Expected: 500000, Got: {counter}")  # Always 500000 ✅
```

---

### 🔄 RLocks (Reentrant Locks)

A regular Lock will **deadlock** if the same thread tries to acquire it twice. RLock allows the same thread to acquire it multiple times.

```python
import threading

rlock = threading.RLock()

def recursive_function(depth):
    with rlock:    # Same thread can acquire this multiple times
        print(f"  Depth {depth}")
        if depth > 0:
            recursive_function(depth - 1)

t = threading.Thread(target=recursive_function, args=(3,))
t.start()
t.join()
# Depth 3
# Depth 2
# Depth 1
# Depth 0
```

---

### 🚦 Semaphores

Semaphores limit the number of threads accessing a resource simultaneously.

```python
import threading
import time
import random

# Database connection pool — allow max 3 simultaneous connections
db_semaphore = threading.Semaphore(3)

def access_database(worker_id):
    print(f"Worker {worker_id}: Waiting for DB connection...")
    with db_semaphore:    # Block until a "slot" is available
        print(f"Worker {worker_id}: Connected to DB ✅")
        time.sleep(random.uniform(0.5, 1.5))  # Simulate query
        print(f"Worker {worker_id}: Released DB connection 🔓")


threads = [threading.Thread(target=access_database, args=(i,)) for i in range(8)]
for t in threads:
    t.start()
for t in threads:
    t.join()
# Max 3 workers in DB at any time!
```

---

### ☠️ Deadlocks

A deadlock occurs when two or more threads are stuck waiting for each other's locks.

```python
import threading
import time

lock_a = threading.Lock()
lock_b = threading.Lock()

def thread1():
    with lock_a:
        print("Thread 1: Acquired lock_a, waiting for lock_b...")
        time.sleep(0.1)
        with lock_b:    # ← Deadlock: Thread 2 holds lock_b
            print("Thread 1: Acquired both locks")

def thread2():
    with lock_b:
        print("Thread 2: Acquired lock_b, waiting for lock_a...")
        time.sleep(0.1)
        with lock_a:    # ← Deadlock: Thread 1 holds lock_a
            print("Thread 2: Acquired both locks")


t1 = threading.Thread(target=thread1)
t2 = threading.Thread(target=thread2)
t1.start(); t2.start()
t1.join(); t2.join()   # This will hang forever! (deadlock)

# ✅ Solution: Always acquire locks in the same order
def thread1_safe():
    with lock_a:
        with lock_b:      # Consistent order: A → B
            print("Thread 1: Done")

def thread2_safe():
    with lock_a:          # Same order: A → B (not B → A!)
        with lock_b:
            print("Thread 2: Done")
```

---

### 🎯 ThreadPoolExecutor (Modern Approach)

```python
from concurrent.futures import ThreadPoolExecutor, as_completed
import time

def fetch_url(url):
    """Simulates an HTTP request."""
    time.sleep(0.5)    # Simulate network delay
    return f"Data from {url}"

urls = [f"https://api.example.com/item/{i}" for i in range(10)]

# Sequential — takes 5 seconds
# Concurrent — takes ~0.5 seconds

with ThreadPoolExecutor(max_workers=5) as executor:
    # Submit all tasks
    futures = {executor.submit(fetch_url, url): url for url in urls}
    
    # Process results as they complete
    for future in as_completed(futures):
        url = futures[future]
        result = future.result()
        print(f"✅ {result}")
```

---

## Multiprocessing

### 🔍 What Is Multiprocessing?

Each process has its **own memory space**. Unlike threads, processes don't share memory — they communicate through pipes, queues, or shared memory. This bypasses the GIL, making it ideal for CPU-bound tasks.

```
MULTITHREADING                MULTIPROCESSING
One process                   Multiple processes
Shared memory                 Separate memory
GIL limited                   True parallelism
Good for I/O                  Good for CPU
```

---

### 🚀 Creating Processes

```python
import multiprocessing
import os
import time

def cpu_intensive_task(n, results, index):
    """CPU-bound: compute sum of squares."""
    print(f"Process {os.getpid()} working on {n}")
    result = sum(i**2 for i in range(n))
    results[index] = result

if __name__ == "__main__":    # ← CRITICAL: Required on Windows/macOS
    # Sequential
    start = time.time()
    results = [0, 0, 0, 0]
    for i in range(4):
        cpu_intensive_task(5_000_000, results, i)
    print(f"Sequential: {time.time() - start:.2f}s")

    # Parallel with processes
    start = time.time()
    manager = multiprocessing.Manager()
    results = manager.list([0, 0, 0, 0])
    
    processes = [
        multiprocessing.Process(target=cpu_intensive_task, args=(5_000_000, results, i))
        for i in range(4)
    ]
    
    for p in processes:
        p.start()
    
    for p in processes:
        p.join()
    
    print(f"Parallel: {time.time() - start:.2f}s")
    print(f"Results: {list(results)}")
```

---

### 🏊 Process Pools

```python
from multiprocessing import Pool
import time

def square(n):
    return n ** 2

def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

if __name__ == "__main__":
    numbers = list(range(1_000_000))
    
    # map() — applies function to all items in parallel
    with Pool(processes=4) as pool:
        squares = pool.map(square, range(100))
        print(squares[:10])   # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
    
    # starmap() — for functions with multiple arguments
    with Pool() as pool:
        results = pool.starmap(pow, [(2, 10), (3, 5), (5, 3)])
        print(results)   # [1024, 243, 125]
    
    # imap() — lazy version (good for huge data)
    with Pool(4) as pool:
        for result in pool.imap(is_prime, range(100), chunksize=10):
            pass   # Process results as they arrive
```

---

### 📨 Inter-Process Communication

```python
from multiprocessing import Process, Queue, Pipe

# Queue — safe communication between processes
def producer(queue):
    for i in range(5):
        queue.put(f"item_{i}")
        print(f"Produced: item_{i}")
    queue.put(None)   # Sentinel to signal done

def consumer(queue):
    while True:
        item = queue.get()
        if item is None:
            break
        print(f"Consumed: {item}")

if __name__ == "__main__":
    q = Queue()
    p = Process(target=producer, args=(q,))
    c = Process(target=consumer, args=(q,))
    
    p.start(); c.start()
    p.join(); c.join()


# Pipe — direct two-way communication
def sender(conn):
    conn.send({"type": "request", "data": "Hello!"})
    response = conn.recv()
    print(f"Sender got: {response}")
    conn.close()

def receiver(conn):
    message = conn.recv()
    print(f"Receiver got: {message}")
    conn.send({"type": "response", "data": "World!"})
    conn.close()

if __name__ == "__main__":
    parent_conn, child_conn = Pipe()
    p1 = Process(target=sender, args=(parent_conn,))
    p2 = Process(target=receiver, args=(child_conn,))
    p1.start(); p2.start()
    p1.join(); p2.join()
```

---

## Async Programming

### 🔍 What Is Async Programming?

**Simple Explanation:**
Imagine a waiter at a restaurant. A bad waiter (synchronous) takes one table's order, goes to the kitchen, waits until the food is ready, brings it back, and only THEN takes the next table's order. A good waiter (async) takes all orders, submits them to the kitchen, and serves food as it's ready — all while taking new orders.

**Technical Definition:**
Async programming uses a **single thread** with an **event loop** to handle many I/O operations concurrently. Instead of blocking while waiting for I/O, the program "suspends" that task and works on others.

**Key Insight:** Async is NOT the same as threading or multiprocessing. It's a single-threaded, cooperative multitasking system.

---

### ⚡ `async` and `await`

```python
import asyncio
import time

# Synchronous (blocking)
def sync_fetch(url):
    time.sleep(2)   # Blocks! Nothing else can run.
    return f"Data from {url}"

# Asynchronous (non-blocking)
async def async_fetch(url):
    await asyncio.sleep(2)   # Suspends here; event loop runs other coroutines
    return f"Data from {url}"


# Running async code
async def main():
    print("Starting...")
    
    # Sequential async (still 4 seconds total — waiting one at a time)
    result1 = await async_fetch("https://api1.com")
    result2 = await async_fetch("https://api2.com")
    print(result1, result2)
    
    # Concurrent async (only 2 seconds — both run simultaneously!)
    results = await asyncio.gather(
        async_fetch("https://api1.com"),
        async_fetch("https://api2.com"),
        async_fetch("https://api3.com"),
    )
    for r in results:
        print(r)

asyncio.run(main())
```

---

### 🔄 Coroutines

A coroutine is a function defined with `async def`. Calling it returns a coroutine object — it doesn't run until awaited.

```python
import asyncio

async def greet(name, delay):
    await asyncio.sleep(delay)
    return f"Hello, {name}!"

# This creates a coroutine object (doesn't run!)
coro = greet("Alice", 1)
print(type(coro))   # <class 'coroutine'>

# This runs it:
result = asyncio.run(greet("Alice", 1))
print(result)   # Hello, Alice!
```

---

### 🎯 Tasks — Concurrent Execution

```python
import asyncio
import time

async def download_file(name, duration):
    print(f"⬇️  Starting: {name}")
    await asyncio.sleep(duration)
    print(f"✅ Done: {name}")
    return name

async def main():
    start = time.time()
    
    # Create Tasks — schedule for concurrent execution
    task1 = asyncio.create_task(download_file("report.pdf", 2))
    task2 = asyncio.create_task(download_file("image.jpg", 1))
    task3 = asyncio.create_task(download_file("video.mp4", 3))
    
    # Wait for all tasks
    results = await asyncio.gather(task1, task2, task3)
    
    print(f"\nAll done! Took {time.time()-start:.2f}s")
    print(f"Files: {results}")

asyncio.run(main())

# Output:
# ⬇️  Starting: report.pdf
# ⬇️  Starting: image.jpg
# ⬇️  Starting: video.mp4
# ✅ Done: image.jpg       (after 1s)
# ✅ Done: report.pdf      (after 2s)
# ✅ Done: video.mp4       (after 3s)
# All done! Took 3.00s     (NOT 6s!)
```

---

### 🌐 Real-World Async: HTTP Client

```python
import asyncio
import aiohttp   # pip install aiohttp

async def fetch(session, url):
    async with session.get(url) as response:
        return await response.json()

async def fetch_all(urls):
    async with aiohttp.ClientSession() as session:
        tasks = [fetch(session, url) for url in urls]
        return await asyncio.gather(*tasks, return_exceptions=True)

async def main():
    urls = [
        "https://jsonplaceholder.typicode.com/posts/1",
        "https://jsonplaceholder.typicode.com/posts/2",
        "https://jsonplaceholder.typicode.com/posts/3",
    ]
    results = await fetch_all(urls)
    for r in results:
        print(r.get("title"))

asyncio.run(main())
```

---

### 🔁 Event Loop

```
EVENT LOOP INTERNALS
══════════════════════════════════════════════

  Coroutines / Tasks
  ┌────────────────────────────────────────┐
  │                                        │
  │  Task A: fetch("url1")                 │
  │    await asyncio.sleep(2)  ──────────►│ SUSPENDED
  │                                        │
  │  Task B: fetch("url2")    ◄────────── │ RESUMED
  │    await asyncio.sleep(1)  ──────────►│ SUSPENDED
  │                                        │
  │  Task C: compute()                     │ RUNNING
  │    (no await — runs to completion)     │
  │                                        │
  └────────────────────────────────────────┘
                   │
              EVENT LOOP
         (scheduler, dispatcher)
                   │
          I/O Callbacks (OS)
          Timers, Signals
```

```python
# Accessing the event loop
import asyncio

async def main():
    loop = asyncio.get_event_loop()
    print(f"Running: {loop.is_running()}")   # True
    
    # Schedule a coroutine to run "soon"
    asyncio.ensure_future(some_coroutine())

# Running with custom event loop policy
# asyncio.set_event_loop_policy(uvloop.EventLoopPolicy())  # Even faster!
```

---

### ⚡ Async Generators and Context Managers

```python
import asyncio

# Async generator
async def async_range(start, stop):
    for i in range(start, stop):
        await asyncio.sleep(0.01)
        yield i

async def main():
    async for num in async_range(1, 6):
        print(num)   # 1, 2, 3, 4, 5


# Async context manager
class AsyncDBConnection:
    async def __aenter__(self):
        print("🔌 Connecting...")
        await asyncio.sleep(0.1)   # Async connection
        return self
    
    async def __aexit__(self, *args):
        await asyncio.sleep(0.05)  # Async cleanup
        print("🔌 Disconnected")
    
    async def query(self, sql):
        await asyncio.sleep(0.1)
        return [{"id": 1, "name": "Alice"}]


async def main():
    async with AsyncDBConnection() as db:
        results = await db.query("SELECT * FROM users")
        print(results)

asyncio.run(main())
```

---

## GIL (Global Interpreter Lock)

### 🔍 What Is the GIL?

The **Global Interpreter Lock** is a mutex in CPython that allows only **one thread to execute Python bytecode at a time** — even on multi-core processors.

**Why Does Python Have the GIL?**
CPython's memory management (reference counting) is not thread-safe. The GIL was added to protect Python's internal data structures from concurrent modification. It was a pragmatic design decision that simplified the C implementation.

```
WITHOUT GIL (what we'd want):
Core 1: Thread 1 ──────────────────────────────►
Core 2: Thread 2 ──────────────────────────────►
Both truly parallel!

WITH GIL (what CPython does):
Core 1: Thread 1 ──► [GIL] ──► Thread 1 ──► ...
Core 2:              (idle)   Thread 2 ──► ...
Threads take turns; only one runs at a time!
```

---

### 🚧 GIL Limitations

```python
import threading
import time

def cpu_task(n):
    """Pure CPU computation — GIL severely limits this."""
    while n > 0:
        n -= 1

# Single thread: 1 CPU core
start = time.time()
cpu_task(100_000_000)
print(f"Single thread: {time.time()-start:.2f}s")    # ~2.0s

# Two threads: still only 1 CPU core (GIL!)
start = time.time()
t1 = threading.Thread(target=cpu_task, args=(50_000_000,))
t2 = threading.Thread(target=cpu_task, args=(50_000_000,))
t1.start(); t2.start()
t1.join(); t2.join()
print(f"Two threads: {time.time()-start:.2f}s")     # ~2.1s (NO improvement, even worse!)
```

---

### 🔓 GIL Workarounds

| Workaround | When to Use |
|---|---|
| `multiprocessing` | CPU-bound tasks — each process has its own GIL |
| `concurrent.futures.ProcessPoolExecutor` | Modern API for multiprocessing |
| `NumPy/Pandas` (C extensions) | Release GIL during heavy math |
| `Cython` | Compile Python to C, explicitly release GIL |
| `PyPy` | Alternative Python implementation (different GIL story) |
| Async / Coroutines | I/O-bound tasks — no GIL involvement needed |

```python
# GIL is released during I/O! That's why threading works for I/O tasks.
import threading, time, requests

def fetch(url):
    response = requests.get(url)  # GIL released during network wait!
    return len(response.content)

# Threading DOES help for I/O!
urls = ["https://httpbin.org/get"] * 5
threads = [threading.Thread(target=fetch, args=(url,)) for url in urls]
for t in threads: t.start()
for t in threads: t.join()
```

```python
# ProcessPoolExecutor for CPU-bound — bypasses GIL completely
from concurrent.futures import ProcessPoolExecutor
import time

def compute(n):
    return sum(i**2 for i in range(n))

if __name__ == "__main__":
    nums = [1_000_000] * 8

    # Threading (GIL bottleneck)
    start = time.time()
    with __import__("concurrent.futures").ThreadPoolExecutor(8) as ex:
        list(ex.map(compute, nums))
    print(f"ThreadPool: {time.time()-start:.2f}s")

    # Multiprocessing (no GIL)
    start = time.time()
    with ProcessPoolExecutor(8) as ex:
        list(ex.map(compute, nums))
    print(f"ProcessPool: {time.time()-start:.2f}s")
    # ProcessPool is ~4-8x faster on 8 cores!
```

---

### 📊 Performance Comparison: Thread vs Process vs Async

| Scenario | Best Choice | Why |
|---|---|---|
| Web scraping 1000 URLs | `asyncio` + `aiohttp` | Pure I/O wait; single-threaded |
| Image processing (CPU) | `ProcessPoolExecutor` | True parallelism, bypasses GIL |
| Database queries | `asyncio` or threads | I/O bound, GIL released |
| File reading | `asyncio` or threads | I/O bound |
| ML model training | `multiprocessing` or GPU | CPU/memory intensive |
| Real-time chat server | `asyncio` | Many concurrent connections, I/O |

---

# 19. Database Programming in Python

---

## SQL Databases

### 🗄️ `sqlite3` Module

SQLite is a lightweight, serverless SQL database built into Python's standard library. Perfect for development, testing, and small applications.

```python
import sqlite3

# Connect (creates file if not exists)
conn = sqlite3.connect("myapp.db")
# For in-memory (testing):
# conn = sqlite3.connect(":memory:")

cursor = conn.cursor()
```

---

### 📋 CRUD Operations

```python
import sqlite3
from datetime import datetime

def get_connection():
    conn = sqlite3.connect("ecommerce.db")
    conn.row_factory = sqlite3.Row    # Access columns by name!
    return conn

# CREATE — Define schema
def setup_database():
    with get_connection() as conn:
        conn.executescript("""
            CREATE TABLE IF NOT EXISTS users (
                id          INTEGER PRIMARY KEY AUTOINCREMENT,
                username    TEXT NOT NULL UNIQUE,
                email       TEXT NOT NULL,
                created_at  TEXT DEFAULT (datetime('now')),
                is_active   INTEGER DEFAULT 1
            );
            
            CREATE TABLE IF NOT EXISTS orders (
                id          INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id     INTEGER NOT NULL,
                total       REAL NOT NULL,
                status      TEXT DEFAULT 'pending',
                created_at  TEXT DEFAULT (datetime('now')),
                FOREIGN KEY (user_id) REFERENCES users(id)
            );
        """)
    print("✅ Database setup complete")

# INSERT — Create records
def create_user(username, email):
    with get_connection() as conn:
        try:
            cursor = conn.execute(
                "INSERT INTO users (username, email) VALUES (?, ?)",
                (username, email)   # ✅ Parameterized — prevents SQL injection!
            )
            conn.commit()
            print(f"✅ Created user {username} with ID {cursor.lastrowid}")
            return cursor.lastrowid
        except sqlite3.IntegrityError as e:
            print(f"❌ Error: {e}")
            return None

# SELECT — Read records
def get_user(user_id):
    with get_connection() as conn:
        row = conn.execute(
            "SELECT * FROM users WHERE id = ?", (user_id,)
        ).fetchone()
        
        if row:
            return dict(row)   # Convert Row to dict
        return None

def get_all_active_users():
    with get_connection() as conn:
        rows = conn.execute(
            "SELECT * FROM users WHERE is_active = 1 ORDER BY created_at DESC"
        ).fetchall()
        return [dict(row) for row in rows]

# UPDATE — Modify records
def update_user_email(user_id, new_email):
    with get_connection() as conn:
        cursor = conn.execute(
            "UPDATE users SET email = ? WHERE id = ?",
            (new_email, user_id)
        )
        conn.commit()
        print(f"✅ Updated {cursor.rowcount} row(s)")

# DELETE — Remove records
def delete_user(user_id):
    with get_connection() as conn:
        cursor = conn.execute(
            "DELETE FROM users WHERE id = ?", (user_id,)
        )
        conn.commit()
        print(f"🗑️  Deleted {cursor.rowcount} row(s)")

# Demo
setup_database()
user_id = create_user("alice", "alice@example.com")
create_user("bob", "bob@example.com")

user = get_user(user_id)
print(f"Found: {user}")

update_user_email(user_id, "newalice@example.com")
print(f"Updated: {get_user(user_id)}")
```

---

### 💾 Transactions

```python
import sqlite3

def transfer_funds(from_account_id, to_account_id, amount):
    """Transfer money between accounts — must be atomic!"""
    conn = sqlite3.connect("bank.db")
    
    try:
        conn.execute("BEGIN")   # Start transaction
        
        # Check sender has enough balance
        balance = conn.execute(
            "SELECT balance FROM accounts WHERE id = ?",
            (from_account_id,)
        ).fetchone()[0]
        
        if balance < amount:
            raise ValueError(f"Insufficient funds: {balance}")
        
        # Debit sender
        conn.execute(
            "UPDATE accounts SET balance = balance - ? WHERE id = ?",
            (amount, from_account_id)
        )
        
        # Credit receiver
        conn.execute(
            "UPDATE accounts SET balance = balance + ? WHERE id = ?",
            (amount, to_account_id)
        )
        
        conn.commit()    # ✅ Both succeed together
        print(f"✅ Transferred ${amount}")
        
    except Exception as e:
        conn.rollback()  # ❌ Both fail together (atomicity)
        print(f"❌ Transfer failed, rolled back: {e}")
        raise
    
    finally:
        conn.close()
```

---

## ORM Concepts

### 🔍 What Is ORM?

**Object-Relational Mapping** maps database tables to Python classes. Instead of writing raw SQL, you work with Python objects.

| Raw SQL | ORM |
|---|---|
| `SELECT * FROM users WHERE id = 1` | `User.query.get(1)` |
| `INSERT INTO users VALUES (...)` | `db.session.add(User(...))` |
| Returns tuples | Returns objects |
| Database-specific syntax | Database-agnostic |
| Manual schema | Auto-generated from class |

---

### 🏗️ SQLAlchemy Basics

```python
# pip install sqlalchemy

from sqlalchemy import create_engine, Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime

# Setup
engine = create_engine(
    "sqlite:///ecommerce.db",
    echo=True   # Print SQL statements (for debugging)
)
Base = declarative_base()
Session = sessionmaker(bind=engine)


# Models — Python classes that map to tables
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationship — access user's orders via user.orders
    orders = relationship("Order", back_populates="user", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<User(id={self.id}, username={self.username!r})>"


class Product(Base):
    __tablename__ = "products"
    
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    price = Column(Float, nullable=False)
    stock = Column(Integer, default=0)
    
    def __repr__(self):
        return f"<Product(name={self.name!r}, price={self.price})>"


class Order(Base):
    __tablename__ = "orders"
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    total = Column(Float, nullable=False)
    status = Column(String(20), default="pending")
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="orders")


# Create all tables
Base.metadata.create_all(engine)


# CRUD with SQLAlchemy ORM
session = Session()

# CREATE
user1 = User(username="alice", email="alice@example.com")
user2 = User(username="bob", email="bob@example.com")
product1 = Product(name="Laptop", price=999.99, stock=10)

session.add_all([user1, user2, product1])
session.commit()

print(f"Created user with ID: {user1.id}")

# READ — Various query methods
all_users = session.query(User).all()
alice = session.query(User).filter(User.username == "alice").first()
users_page = session.query(User).order_by(User.id).offset(0).limit(10).all()

# UPDATE
alice.email = "newalice@example.com"
session.commit()

# DELETE
user_to_delete = session.query(User).get(2)
session.delete(user_to_delete)
session.commit()


# Advanced queries
from sqlalchemy import and_, or_, desc

# WHERE clause
expensive_products = (session.query(Product)
    .filter(Product.price > 500)
    .order_by(desc(Product.price))
    .all())

# JOIN
from sqlalchemy import join
user_orders = (session.query(User, Order)
    .join(Order, User.id == Order.user_id)
    .filter(User.username == "alice")
    .all())

session.close()
```

---

## NoSQL Introduction

### 🍃 MongoDB Basics

MongoDB is a document-oriented NoSQL database. Instead of tables and rows, it uses **collections** and **documents** (JSON-like BSON).

```python
# pip install pymongo

from pymongo import MongoClient
from datetime import datetime
from bson import ObjectId

# Connect
client = MongoClient("mongodb://localhost:27017/")
db = client["ecommerce"]
users_col = db["users"]
products_col = db["products"]


# INSERT — Create documents
user = {
    "username": "alice",
    "email": "alice@example.com",
    "address": {               # Nested document
        "street": "123 Main St",
        "city": "Mumbai",
        "country": "India"
    },
    "tags": ["premium", "early_adopter"],   # Array field
    "created_at": datetime.utcnow()
}

result = users_col.insert_one(user)
print(f"Inserted ID: {result.inserted_id}")

# Bulk insert
products = [
    {"name": "Laptop", "price": 999.99, "category": "Electronics", "stock": 50},
    {"name": "Phone", "price": 499.99, "category": "Electronics", "stock": 100},
    {"name": "Book", "price": 19.99, "category": "Education", "stock": 200},
]
users_col.insert_many(products)


# SELECT — Find documents
# Find one
alice = users_col.find_one({"username": "alice"})
print(alice)

# Find all matching
electronics = list(products_col.find({"category": "Electronics"}))

# Find with projection (select specific fields)
names_only = list(users_col.find({}, {"username": 1, "email": 1, "_id": 0}))

# Comparison operators
expensive = list(products_col.find({"price": {"$gt": 100}}))   # price > 100
mid_range = list(products_col.find({"price": {"$gte": 20, "$lte": 500}}))

# Logical operators
query = {"$or": [{"category": "Electronics"}, {"price": {"$lt": 25}}]}
result = list(products_col.find(query))

# Nested document query
mumbai_users = list(users_col.find({"address.city": "Mumbai"}))

# Array contains
premium_users = list(users_col.find({"tags": "premium"}))


# UPDATE — Modify documents
# Update one field
users_col.update_one(
    {"username": "alice"},
    {"$set": {"email": "newalice@example.com"}}
)

# Increment a value
products_col.update_one(
    {"name": "Laptop"},
    {"$inc": {"stock": -1}}   # Decrease stock by 1
)

# Push to array
users_col.update_one(
    {"username": "alice"},
    {"$push": {"tags": "vip"}}
)

# Update many
products_col.update_many(
    {"category": "Electronics"},
    {"$set": {"featured": True}}
)


# DELETE
users_col.delete_one({"username": "bob"})
products_col.delete_many({"stock": {"$eq": 0}})


# AGGREGATION PIPELINE
pipeline = [
    {"$match": {"category": "Electronics"}},           # Filter
    {"$group": {                                        # Group + aggregate
        "_id": "$category",
        "total_products": {"$sum": 1},
        "avg_price": {"$avg": "$price"},
        "max_price": {"$max": "$price"}
    }},
    {"$sort": {"avg_price": -1}},                     # Sort descending
    {"$project": {                                     # Shape output
        "category": "$_id",
        "count": "$total_products",
        "avg_price": {"$round": ["$avg_price", 2]},
        "_id": 0
    }}
]

results = list(products_col.aggregate(pipeline))
for r in results:
    print(r)

client.close()
```

---

# 20. Testing in Python

---

## Unit Testing

### 🔍 Why Test?

Testing ensures code works correctly, prevents regressions, enables refactoring with confidence, and documents expected behavior.

**Testing Pyramid:**

```
         /\
        /E2E\          (Few, slow, expensive)
       /──────\
      / Integ. \       (Some, moderate)
     /──────────\
    / Unit Tests \     (Many, fast, cheap)
   /______________\
```

---

### 🧪 `unittest` Module

```python
# calculator.py
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

def multiply(a, b):
    return a * b
```

```python
# test_calculator.py
import unittest
from calculator import add, subtract, divide, multiply

class TestCalculator(unittest.TestCase):
    
    # setUp runs BEFORE each test method
    def setUp(self):
        print("\n🔧 Setting up test...")
        self.x = 10
        self.y = 5
    
    # tearDown runs AFTER each test method
    def tearDown(self):
        print("🧹 Tearing down test...")
    
    # Test methods MUST start with "test_"
    def test_add_positive_numbers(self):
        result = add(3, 5)
        self.assertEqual(result, 8)
    
    def test_add_negative_numbers(self):
        self.assertEqual(add(-3, -5), -8)
    
    def test_add_zero(self):
        self.assertEqual(add(0, 5), 5)
        self.assertEqual(add(5, 0), 5)
    
    def test_subtract(self):
        self.assertEqual(subtract(self.x, self.y), 5)
        self.assertGreater(subtract(10, 3), 0)
    
    def test_multiply(self):
        self.assertEqual(multiply(4, 5), 20)
        self.assertNotEqual(multiply(3, 3), 10)
    
    def test_divide_normal(self):
        self.assertAlmostEqual(divide(10, 3), 3.333, places=2)
    
    def test_divide_by_zero(self):
        # Test that exception IS raised
        with self.assertRaises(ValueError) as context:
            divide(10, 0)
        self.assertIn("zero", str(context.exception).lower())
    
    def test_add_returns_correct_type(self):
        result = add(1, 2)
        self.assertIsInstance(result, int)
    
    def test_list_operations(self):
        result_list = [add(i, 1) for i in range(5)]
        self.assertListEqual(result_list, [1, 2, 3, 4, 5])
        self.assertIn(3, result_list)
        self.assertEqual(len(result_list), 5)


class TestCalculatorEdgeCases(unittest.TestCase):
    
    @unittest.skip("Feature not implemented yet")
    def test_complex_numbers(self):
        self.assertEqual(add(1+2j, 3+4j), 4+6j)
    
    @unittest.expectedFailure
    def test_expected_to_fail(self):
        self.assertEqual(1, 2)   # We know this fails


# Assertion cheat sheet
class TestAssertions(unittest.TestCase):
    def test_all_assertions(self):
        self.assertEqual(1 + 1, 2)            # a == b
        self.assertNotEqual(1, 2)             # a != b
        self.assertTrue(5 > 3)               # bool(x) is True
        self.assertFalse(5 < 3)              # bool(x) is False
        self.assertIsNone(None)              # x is None
        self.assertIsNotNone(42)             # x is not None
        self.assertIn(3, [1, 2, 3])          # a in b
        self.assertNotIn(5, [1, 2, 3])       # a not in b
        self.assertGreater(5, 3)             # a > b
        self.assertGreaterEqual(5, 5)        # a >= b
        self.assertLess(3, 5)               # a < b
        self.assertAlmostEqual(3.1415, 3.14, places=2)  # round(a-b, places) == 0
        self.assertIsInstance("hello", str)  # isinstance(a, b)
        self.assertRaises(ValueError, int, "abc")  # function raises exception


if __name__ == "__main__":
    unittest.main(verbosity=2)
```

---

## Pytest

### 🚀 Pytest — The Modern Standard

Pytest is simpler, more powerful, and more Pythonic than `unittest`.

```bash
# Install
pip install pytest pytest-cov

# Run tests
pytest                          # Find and run all tests
pytest test_calculator.py       # Specific file
pytest -v                       # Verbose output
pytest -k "test_add"           # Run tests matching pattern
pytest --tb=short              # Shorter tracebacks
```

---

### ✍️ Writing Pytest Tests

```python
# test_calculator_pytest.py
# No class needed! Just functions starting with test_
import pytest
from calculator import add, subtract, divide

# Simple test functions
def test_add():
    assert add(3, 5) == 8

def test_add_negative():
    assert add(-1, -1) == -2

def test_divide_by_zero():
    with pytest.raises(ValueError, match="Cannot divide by zero"):
        divide(10, 0)

def test_divide_result():
    result = divide(10, 4)
    assert result == pytest.approx(2.5)   # Floating point comparison!
```

---

### 🔧 Fixtures

Fixtures are pytest's way to set up and tear down test state. They're more flexible than `setUp/tearDown`.

```python
import pytest
import sqlite3

# fixtures/db.py

@pytest.fixture
def sample_data():
    """Provides sample test data."""
    return {
        "users": [
            {"id": 1, "name": "Alice", "email": "alice@test.com"},
            {"id": 2, "name": "Bob", "email": "bob@test.com"},
        ]
    }

@pytest.fixture
def in_memory_db():
    """Creates a fresh in-memory database for each test."""
    conn = sqlite3.connect(":memory:")
    conn.execute("""
        CREATE TABLE users (
            id INTEGER PRIMARY KEY,
            name TEXT,
            email TEXT
        )
    """)
    conn.execute("INSERT INTO users VALUES (1, 'Alice', 'alice@test.com')")
    conn.execute("INSERT INTO users VALUES (2, 'Bob', 'bob@test.com')")
    conn.commit()
    
    yield conn    # Test runs here!
    
    conn.close()  # Teardown (runs even if test fails)

@pytest.fixture(scope="module")   # Runs once per module (not per test)
def expensive_setup():
    print("⚙️  Expensive setup (runs once)")
    data = {"config": "production", "version": "1.0"}
    yield data
    print("🧹 Expensive teardown")


# Tests that use fixtures
def test_user_count(in_memory_db):
    cursor = in_memory_db.execute("SELECT COUNT(*) FROM users")
    count = cursor.fetchone()[0]
    assert count == 2

def test_find_alice(in_memory_db):
    cursor = in_memory_db.execute("SELECT * FROM users WHERE name = 'Alice'")
    user = cursor.fetchone()
    assert user is not None
    assert user[2] == "alice@test.com"

def test_with_sample_data(sample_data):
    assert len(sample_data["users"]) == 2
    assert sample_data["users"][0]["name"] == "Alice"
```

---

### 🔢 Parametrization

Run the same test with multiple inputs automatically:

```python
import pytest

@pytest.mark.parametrize("a, b, expected", [
    (1, 2, 3),
    (0, 0, 0),
    (-1, 1, 0),
    (100, -100, 0),
    (3.5, 1.5, 5.0),
])
def test_add_parametrized(a, b, expected):
    assert add(a, b) == expected


# Test multiple scenarios for exceptions
@pytest.mark.parametrize("value, expected_error", [
    ("abc", ValueError),
    (None, TypeError),
    ([], TypeError),
])
def test_invalid_inputs(value, expected_error):
    with pytest.raises(expected_error):
        divide(10, value)
```

---

### 🎭 Mocking

Mocking replaces real dependencies (API calls, database, file system) with fake objects you control.

```python
from unittest.mock import MagicMock, patch, call
import pytest

# The function we want to test
def get_user_profile(user_id, api_client):
    """Fetches user from API and enriches data."""
    user = api_client.get_user(user_id)
    if user is None:
        raise ValueError(f"User {user_id} not found")
    
    orders = api_client.get_orders(user_id)
    user["order_count"] = len(orders)
    return user


# Test with mocked API client
def test_get_user_profile():
    # Create a mock object
    mock_api = MagicMock()
    
    # Configure what the mock returns
    mock_api.get_user.return_value = {"id": 1, "name": "Alice"}
    mock_api.get_orders.return_value = [{"id": 1}, {"id": 2}, {"id": 3}]
    
    result = get_user_profile(1, mock_api)
    
    # Assert result
    assert result["name"] == "Alice"
    assert result["order_count"] == 3
    
    # Assert the mock was called correctly
    mock_api.get_user.assert_called_once_with(1)
    mock_api.get_orders.assert_called_once_with(1)


def test_user_not_found():
    mock_api = MagicMock()
    mock_api.get_user.return_value = None
    
    with pytest.raises(ValueError, match="not found"):
        get_user_profile(999, mock_api)


# Patching — replace real objects at import time
def send_welcome_email(user_email):
    import smtplib
    # ...email logic...
    return True

@patch("smtplib.SMTP")
def test_send_email(mock_smtp):
    """Test email sending without actually sending emails."""
    mock_smtp_instance = mock_smtp.return_value.__enter__.return_value
    
    result = send_welcome_email("test@example.com")
    
    assert result is True
    # Verify SMTP was used
    mock_smtp.assert_called_once()
```

---

## Test Concepts

### 📁 Project Test Structure

```
myproject/
├── src/
│   └── myapp/
│       ├── __init__.py
│       ├── models.py
│       ├── services.py
│       └── api.py
├── tests/
│   ├── __init__.py
│   ├── conftest.py          ← Shared fixtures
│   ├── unit/
│   │   ├── test_models.py
│   │   └── test_services.py
│   ├── integration/
│   │   └── test_api.py
│   └── e2e/
│       └── test_user_flow.py
├── pytest.ini               ← Pytest configuration
└── requirements-test.txt
```

```ini
# pytest.ini
[pytest]
testpaths = tests
python_files = test_*.py
python_classes = Test*
python_functions = test_*
addopts = -v --tb=short
markers =
    slow: marks tests as slow
    integration: marks as integration tests
```

---

### 📊 Test Coverage

```bash
# Install
pip install pytest-cov

# Run with coverage
pytest --cov=src --cov-report=html --cov-report=term

# Output:
# ---------- coverage: platform linux, python 3.11 ----------
# Name                    Stmts   Miss  Cover
# -------------------------------------------
# src/myapp/models.py       120     12    90%
# src/myapp/services.py      85      5    94%
# src/myapp/api.py           60      0   100%
# -------------------------------------------
# TOTAL                     265     17    94%
```

```python
# conftest.py — shared fixtures across all tests
import pytest
import sqlite3

@pytest.fixture(scope="session")
def db_engine():
    """Session-scoped database — created once for all tests."""
    conn = sqlite3.connect(":memory:")
    yield conn
    conn.close()

@pytest.fixture(autouse=True)
def reset_db(db_engine):
    """Automatically reset DB state before each test."""
    db_engine.execute("DELETE FROM users")
    db_engine.commit()
    yield
    # No teardown needed — next test's autouse fixture cleans up
```

---

### 🔄 TDD — Test-Driven Development

```
TDD CYCLE (Red → Green → Refactor)
═══════════════════════════════════

  1. RED   → Write a failing test for new feature
       │
       ▼
  2. GREEN → Write MINIMUM code to make test pass
       │
       ▼
  3. REFACTOR → Clean up code while keeping tests green
       │
       └──────────────────────────► Repeat
```

```python
# TDD Example: Building a shopping cart

# STEP 1: Write the test FIRST (RED — will fail)
def test_add_item_to_cart():
    cart = ShoppingCart()
    cart.add_item("Laptop", price=999.99, quantity=1)
    
    assert len(cart.items) == 1
    assert cart.total == 999.99


# STEP 2: Write minimum code (GREEN — make it pass)
class ShoppingCart:
    def __init__(self):
        self.items = []
    
    def add_item(self, name, price, quantity):
        self.items.append({"name": name, "price": price, "quantity": quantity})
    
    @property
    def total(self):
        return sum(item["price"] * item["quantity"] for item in self.items)

# Test passes!

# STEP 3: Add more tests, then more implementation
def test_remove_item():
    cart = ShoppingCart()
    cart.add_item("Laptop", 999.99, 1)
    cart.add_item("Mouse", 29.99, 2)
    cart.remove_item("Mouse")
    
    assert len(cart.items) == 1
    assert cart.total == 999.99


def test_apply_discount():
    cart = ShoppingCart()
    cart.add_item("Laptop", 1000.00, 1)
    cart.apply_discount(10)   # 10% discount
    
    assert cart.total == 900.00


# Implement to make tests pass, then refactor
```

---

### 🔗 Integration Testing Example

```python
# tests/integration/test_api.py
import pytest
from fastapi.testclient import TestClient
from main import app   # Your FastAPI app

@pytest.fixture
def client():
    with TestClient(app) as c:
        yield c

@pytest.fixture
def auth_headers(client):
    """Log in and return auth headers."""
    response = client.post("/auth/login", json={
        "username": "testuser",
        "password": "testpass"
    })
    token = response.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}


def test_get_users_requires_auth(client):
    response = client.get("/users")
    assert response.status_code == 401

def test_get_users_authenticated(client, auth_headers):
    response = client.get("/users", headers=auth_headers)
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_create_user_flow(client, auth_headers):
    # Create
    response = client.post("/users", headers=auth_headers, json={
        "username": "newuser",
        "email": "new@test.com"
    })
    assert response.status_code == 201
    user_id = response.json()["id"]
    
    # Read
    response = client.get(f"/users/{user_id}", headers=auth_headers)
    assert response.status_code == 200
    assert response.json()["username"] == "newuser"
    
    # Update
    response = client.patch(f"/users/{user_id}", headers=auth_headers, json={
        "email": "updated@test.com"
    })
    assert response.status_code == 200
    
    # Delete
    response = client.delete(f"/users/{user_id}", headers=auth_headers)
    assert response.status_code == 204
```

---

## 🎯 Interview Questions — All Topics

### Iterators & Generators

1. What's the difference between `__iter__` and `__next__`?
2. How does a `for` loop work internally in Python?
3. Why are generators more memory-efficient than lists?
4. What does `yield from` do in a generator?
5. Explain the difference between `send()`, `throw()`, and `close()` in generators.

### Decorators

1. What is a closure and how does it relate to decorators?
2. Why do we use `@functools.wraps`?
3. How do you create a decorator that accepts arguments?
4. Explain the difference between `@staticmethod` and `@classmethod`.
5. How does decorator chaining work — in what order are decorators applied?

### Multithreading & Async

1. What is the GIL and when does it matter?
2. When would you use `threading` vs `multiprocessing` vs `asyncio`?
3. What is a deadlock and how do you prevent it?
4. How does `asyncio.gather()` work?
5. What's the difference between a coroutine and a thread?

### Database

1. What is SQL injection and how does parameterized queries prevent it?
2. What is a transaction and why is ACID important?
3. When would you use NoSQL over SQL?
4. What are the advantages of using an ORM?

### Testing

1. What is the difference between unit and integration testing?
2. What is mocking and when should you use it?
3. Explain the TDD cycle.
4. What are pytest fixtures and how do they differ from `setUp`?

---

## 🏋️ Practice Exercises

### Section 16 — Iterators & Generators

1. **Easy:** Create a custom iterator that generates the powers of 2 (1, 2, 4, 8, 16...) up to a given limit.

2. **Medium:** Write a generator that reads a large CSV file line by line, parses each row into a dictionary, and applies a filter function. Test it with a 100MB CSV without loading it into memory.

3. **Hard:** Implement a `@memoize` decorator from scratch using a closure and dictionary cache. Then extend it to support a TTL (Time To Live) — cache entries expire after N seconds.

### Section 17 — Advanced Concepts

4. **Easy:** Use list/dict/set comprehensions to transform a list of product dictionaries: filter those in stock, normalize names to title case, and build a price lookup dictionary.

5. **Medium:** Implement a `DeepCopyTracker` class that counts how many times each object is deep-copied. Use the `gc` module to track object references.

6. **Hard:** Create a context manager that (a) starts a timer, (b) captures all print statements to a buffer, (c) on exit prints the summary including elapsed time and captured output.

### Section 18 — Concurrency

7. **Easy:** Write an async function that fetches 20 URLs concurrently using `asyncio.gather()` and returns which ones responded successfully.

8. **Medium:** Implement a thread-safe, bounded queue (max N items) using `threading.Lock` and `threading.Condition` — block producers when full, block consumers when empty.

9. **Hard:** Build a web crawler that uses `asyncio` + `aiohttp` to crawl a website up to depth 3, collecting all URLs. Use a semaphore to limit concurrent connections to 10.

### Section 19 — Databases

10. **Easy:** Create a SQLite database with a `books` table. Write CRUD functions. Add a search function using LIKE.

11. **Medium:** Build a SQLAlchemy ORM model for a blog (Users, Posts, Comments, Tags with many-to-many). Write a query that returns the 5 most commented posts from the last 30 days.

12. **Hard:** Implement a simple connection pool for SQLite (max 5 connections) using threading. The pool should block when all connections are in use and release them properly even when exceptions occur.

### Section 20 — Testing

13. **Easy:** Write unittest test cases for a `BankAccount` class with `deposit`, `withdraw`, and `balance` properties. Include tests for edge cases and invalid inputs.

14. **Medium:** Using pytest fixtures, write integration tests for a REST API CRUD endpoint. Mock the database using an in-memory SQLite and test all status codes.

15. **Hard:** Practice TDD: write tests FIRST for a `RateLimiter` class (max N calls per minute per user_id), then implement it to pass all tests. Use `unittest.mock.patch` to mock `time.time()`.

---

## 🐛 Common Debugging Tips

```python
# 1. Generator already exhausted
gen = (x for x in range(5))
list(gen)     # [0, 1, 2, 3, 4]
list(gen)     # []  ← EMPTY! Generator is exhausted
# Fix: Recreate the generator each time

# 2. Missing functools.wraps
def bad_decorator(func):
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper

@bad_decorator
def my_func():
    """My docstring"""
    pass

print(my_func.__name__)   # 'wrapper' ← WRONG!
print(my_func.__doc__)    # None ← WRONG!
# Fix: Add @functools.wraps(func) to wrapper

# 3. Thread safety with global variables
counter = 0   # ← Shared, mutable state
def bad_increment():
    global counter
    counter += 1   # NOT atomic!
# Fix: Use threading.Lock()

# 4. Missing if __name__ == "__main__" for multiprocessing
import multiprocessing
# This WILL cause issues on Windows/macOS without __main__ guard:
p = multiprocessing.Process(target=some_func)  # Spawns new process
# Fix: Wrap in if __name__ == "__main__":

# 5. SQL Injection vulnerability
username = "admin'; DROP TABLE users; --"
# ❌ NEVER do this:
query = f"SELECT * FROM users WHERE username = '{username}'"
# ✅ Always use parameterized queries:
query = "SELECT * FROM users WHERE username = ?"
cursor.execute(query, (username,))

# 6. pytest — test function not discovered
def my_test():   # ← Missing "test_" prefix!
    assert 1 == 1
# Fix: Rename to test_my_test()
```

---

## 📚 Best Practices Summary

| Topic | Best Practice |
|---|---|
| Iterators | Always implement both `__iter__` and `__next__` |
| Generators | Use for large datasets, streaming, and pipelines |
| Decorators | Always use `@functools.wraps` to preserve metadata |
| Functional | Prefer comprehensions over `map`/`filter` for readability |
| Memory | Use generators for large data; deep copy only when necessary |
| Context Managers | Use for any resource that needs cleanup |
| Threading | Only for I/O-bound tasks; use locks for shared state |
| Multiprocessing | For CPU-bound tasks; use `if __name__ == "__main__"` guard |
| Async | Use `asyncio` for I/O-bound concurrent workloads |
| Database | Always use parameterized queries; use transactions for atomicity |
| Testing | Write tests first (TDD); mock external dependencies; aim for 80%+ coverage |

---

## ✅ Section Completion Status

| Section | Status |
|---|---|
| 16. Iterators | ✅ Complete |
| 16. Generators | ✅ Complete |
| 16. Decorators | ✅ Complete |
| 17. Functional Programming | ✅ Complete |
| 17. Comprehensions | ✅ Complete |
| 17. Memory Management | ✅ Complete |
| 17. Copying Objects | ✅ Complete |
| 17. Context Managers | ✅ Complete |
| 18. Multithreading | ✅ Complete |
| 18. Multiprocessing | ✅ Complete |
| 18. Async Programming | ✅ Complete |
| 18. GIL | ✅ Complete |
| 19. SQL Databases | ✅ Complete |
| 19. ORM (SQLAlchemy) | ✅ Complete |
| 19. NoSQL (MongoDB) | ✅ Complete |
| 20. Unit Testing | ✅ Complete |
| 20. Pytest | ✅ Complete |
| 20. Test Concepts + TDD | ✅ Complete |

---

> 🎉 **All sections of Python Notes Part 4 are complete!**
>
> **Covered Sections:** 16 (Iterators, Generators, Decorators) → 17 (Advanced Concepts) → 18 (Concurrency) → 19 (Databases) → 20 (Testing)
>
> **Suggested Next File:** `python-notes-part-5.md` — Could cover: Web Frameworks (Flask/FastAPI/Django), REST API Design, Authentication & Security, Deployment & DevOps, Design Patterns in Python, Advanced OOP, Type Hints & Dataclasses, and Performance Profiling.
