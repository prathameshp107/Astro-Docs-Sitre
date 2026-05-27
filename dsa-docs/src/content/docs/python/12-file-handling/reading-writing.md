---
title: Reading and Writing Files
description: Learn how to read from and write to files using Python's built-in file operations.
sidebar:
  order: 1
---

# Reading and Writing Files

## Introduction

Python provides built-in functions for working with files. The most common approach uses the `open()` function with context managers.

<img src="/DSA-Notes-Problems/assets/python/file-handling-flow.svg" alt="File Handling Flow Diagram" width="700" />

## Opening a File

```python
file = open("filename.txt", "r")  # Open for reading
content = file.read()
file.close()  # Always close!
```

## File Modes

| Mode | Description |
|------|-------------|
| `"r"` | Read (default) |
| `"w"` | Write (overwrites existing) |
| `"a"` | Append (adds to end) |
| `"x"` | Exclusive creation (fails if exists) |
| `"rb"` | Read binary |
| `"wb"` | Write binary |

## Reading Files

```python
# Method 1: Read all at once
with open("data.txt", "r") as f:
    content = f.read()

# Method 2: Read line by line (memory efficient for large files)
with open("data.txt", "r") as f:
    for line in f:
        print(line.strip())

# Method 3: Read all lines into list
with open("data.txt", "r") as f:
    lines = f.readlines()

# Method 4: Read specific number of characters
with open("data.txt", "r") as f:
    chunk = f.read(100)  # Read first 100 chars
```

## Writing Files

```python
# Write (overwrites)
with open("output.txt", "w") as f:
    f.write("Hello, World!\n")
    f.write("Second line\n")

# Append
with open("output.txt", "a") as f:
    f.write("Third line\n")

# Write multiple lines
lines = ["Line 1\n", "Line 2\n", "Line 3\n"]
with open("output.txt", "w") as f:
    f.writelines(lines)
```

## File Paths

```python
from pathlib import Path

# Modern approach using pathlib
path = Path("data/notes.txt")
content = path.read_text()
path.write_text("New content")

# Check file properties
print(path.exists())      # True/False
print(path.is_file())     # True/False
print(path.name)          # notes.txt
print(path.stem)          # notes
print(path.suffix)        # .txt
print(path.parent)        # data

# Glob pattern matching
for py_file in Path("src").glob("**/*.py"):
    print(py_file)
```

## Common Mistakes

```python
# ❌ Wrong: Not closing files
f = open("data.txt", "r")
data = f.read()
# File stays open!

# ✅ Correct: Using context manager
with open("data.txt", "r") as f:
    data = f.read()  # Auto-closed

# ❌ Wrong: Encoding issues
with open("data.txt", "r") as f:  # Uses system default encoding
    pass

# ✅ Correct: Explicit encoding
with open("data.txt", "r", encoding="utf-8") as f:
    pass
```

## Practice Exercises

**Exercise 1:** Write a program that reads a text file and counts the number of words.

**Exercise 2:** Create a simple note-taking app that saves and loads notes from a file.

**Exercise 3:** Implement a program that splits a large file into multiple smaller files.
