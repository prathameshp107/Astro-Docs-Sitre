---
title: "os, sys & pathlib"
description: "How to work with files, paths, environment variables, and command-line arguments using Python's os, sys, and pathlib modules."
sidebar:
  order: 4
---

# os, sys & pathlib

## Simple Analogy 📂

- **`os`** = Your computer's file manager — create folders, delete files, get environment variables
- **`sys`** = The Python interpreter's control panel — command-line args, exit codes, Python version
- **`pathlib`** = A modern GPS for file paths — cleaner, more intuitive than `os.path`

---

## pathlib — Modern Path Handling

Python 3.4+ introduced `pathlib` — the **modern way** to handle file paths. It's cleaner than `os.path`.

```python
from pathlib import Path

# Create a path
p = Path("documents/report.txt")
print(p)             # documents\report.txt (Windows)
                     # documents/report.txt (Mac/Linux)

# Path components
print(p.name)        # report.txt
print(p.stem)        # report (no extension)
print(p.suffix)      # .txt
print(p.parent)      # documents
print(p.parents[0])  # documents
print(p.parents[1])  # . (current dir)

# Building paths
config = Path("config") / "app" / "settings.json"
print(config)        # config/app/settings.json

# Home directory
home = Path.home()
print(home)          # C:\Users\Me or /home/me

# Current directory
cwd = Path.cwd()
print(cwd)
```

### File Operations with pathlib

```python
from pathlib import Path

# Check if exists
p = Path("data.txt")
print(p.exists())     # True/False
print(p.is_file())    # True/False
print(p.is_dir())     # True/False

# Read and write
p.write_text("Hello, World!")         # Write file
content = p.read_text()               # Read entire file
print(content)  # Hello, World!

# Binary mode
p.write_bytes(b"\x00\x01\x02")
data = p.read_bytes()

# List directory contents
for f in Path(".").iterdir():
    print(f.name)

# Glob (pattern match)
for py in Path(".").glob("**/*.py"):
    print(py)

# Create directories
Path("new_folder/subfolder").mkdir(parents=True, exist_ok=True)

# Rename
p.rename("new_name.txt")

# Delete
if p.exists():
    p.unlink()  # Delete file
```

---

## os — Operating System Interface

```python
import os

# Environment variables
print(os.environ.get("HOME"))      # /home/user
print(os.environ.get("PATH"))      # /usr/bin:/bin:...
print(os.getenv("HOME"))           # Same, but simpler

# Set environment variable
os.environ["MY_VAR"] = "hello"

# Current working directory
cwd = os.getcwd()
os.chdir("/tmp")                    # Change directory

# Files and directories
os.makedirs("a/b/c", exist_ok=True)
os.remove("file.txt")
os.rmdir("empty_folder")

# List directory
print(os.listdir("."))

# System info
print(os.name)         # 'posix' or 'nt' (Windows)
print(os.cpu_count())  # Number of CPUs
```

---

## sys — System-Specific Parameters

```python
import sys

# Command-line arguments
# Run: python script.py --verbose file.txt
print(sys.argv)
# ['script.py', '--verbose', 'file.txt']

# Exit the program
sys.exit(0)      # Success
sys.exit(1)      # Error

# Python version
print(sys.version)       # '3.12.0 (main, Oct  2 2024, ...)'
print(sys.version_info)  # sys.version_info(major=3, minor=12, micro=0)

# Module search path
print(sys.path)
# ['', '/usr/lib/python312.zip', '/usr/lib/python3.12', ...]

# Platform
print(sys.platform)  # 'win32', 'linux', 'darwin' (Mac)
```

---

## Quick Comparison: os.path vs pathlib

| Task | os.path (old) | pathlib (modern) |
|------|--------------|-----------------|
| Join paths | `os.path.join("a", "b")` | `Path("a") / "b"` |
| Get filename | `os.path.basename(path)` | `Path(path).name` |
| Get extension | `os.path.splitext(path)[1]` | `Path(path).suffix` |
| Check existence | `os.path.exists(path)` | `Path(path).exists()` |
| List directory | `os.listdir(".")` | `Path(".").iterdir()` |
| Read file | `open("f.txt").read()` | `Path("f.txt").read_text()` |

---

## 🧠 In Simple Words

- **`pathlib.Path`** is the modern way to handle file paths — more intuitive than `os.path`
- **`os`** gives you environment variables, process info, and OS operations
- **`sys`** gives you command-line args, Python version, and the module search path
- Prefer **`pathlib`** for file paths, use **`os`** only for environment variables and system info
- Use **`sys.argv`** to read command-line arguments when running scripts
