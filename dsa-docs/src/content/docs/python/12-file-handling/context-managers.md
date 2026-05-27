---
title: Context Managers (with Statement)
description: Learn how to use and create context managers with the `with` statement, contextlib, and `__enter__`/`__exit__`.
sidebar:
  order: 3
---

# Context Managers

## Introduction

A **context manager** handles setup and cleanup automatically using the `with` statement. The most common use is file handling.

## Using Context Managers

```python
# File handling
with open("file.txt", "r") as f:
    content = f.read()
# File is automatically closed here

# Database connections
with db_connection() as conn:
    conn.execute("SELECT * FROM users")
# Connection is automatically closed

# Thread locks
lock = threading.Lock()
with lock:
    # Critical section
    shared_counter += 1
# Lock is automatically released
```

## Creating Context Managers

### Class-based

```python
class ManagedFile:
    def __init__(self, filename, mode="r"):
        self.filename = filename
        self.mode = mode
    
    def __enter__(self):
        print(f"Opening {self.filename}")
        self.file = open(self.filename, self.mode)
        return self.file
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        print(f"Closing {self.filename}")
        self.file.close()
        # Return False to propagate exceptions
        # Return True to suppress exceptions
        return False

with ManagedFile("test.txt", "w") as f:
    f.write("Hello, World!")
```

### Using contextlib

```python
from contextlib import contextmanager

@contextmanager
def managed_file(filename, mode="r"):
    print(f"Opening {filename}")
    file = open(filename, mode)
    try:
        yield file  # This is the value in `as`
    finally:
        print(f"Closing {filename}")
        file.close()

with managed_file("test.txt", "w") as f:
    f.write("Hello, World!")
```

## The contextlib Module

```python
from contextlib import contextmanager, suppress, redirect_stdout
import os

# Suppress specific exceptions
with suppress(FileNotFoundError):
    os.remove("nonexistent.txt")  # No error!

# Redirect stdout
with open("output.log", "w") as f:
    with redirect_stdout(f):
        print("This goes to the log file")

# Nested context managers
@contextmanager
def change_dir(path):
    old_dir = os.getcwd()
    os.chdir(path)
    try:
        yield
    finally:
        os.chdir(old_dir)

with change_dir("/tmp"):
    print(os.getcwd())  # /tmp
print(os.getcwd())      # Back to original
```

## Best Practices

1. **Always use `with` for resource management** — files, locks, connections
2. **Use `@contextmanager`** for simple context managers instead of writing a class
3. **Handle exceptions properly in `__exit__`** — return False to propagate
4. **Use `contextlib.suppress`** to ignore expected exceptions cleanly

## Practice Exercises

**Exercise 1:** Create a `Timer` context manager that measures and prints execution time.

**Exercise 2:** Create a context manager that temporarily changes environment variables and restores them on exit.
