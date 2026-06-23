---
title: "logging Module"
description: "How to use Python's logging module instead of print — log levels, basicConfig, file handlers, and best practices."
sidebar:
  order: 5
---

# logging Module

## Simple Analogy 📢

Imagine you're a pilot. You don't just shout "We're low on fuel!" — you have different communication levels:
- **DEBUG** = "The coffee machine light is flickering" (ignore normally)
- **INFO** = "Cruising at 35,000 feet" (normal updates)
- **WARNING** = "We might encounter turbulence ahead" (potential issue)
- **ERROR** = "Engine 2 is failing" (serious problem)
- **CRITICAL** = "We're going down!" (catastrophe)

`print()` is like shouting everything at the same volume. **`logging`** lets you control what gets said and where it's recorded.

---

## Why logging > print

| Feature | print() | logging |
|---------|---------|---------|
| **Levels** | ❌ All messages equal | ✅ DEBUG → CRITICAL |
| **Disable** | ❌ Comment/uncomment | ✅ Set level once |
| **Output** | ❌ Only stdout | ✅ File, console, network |
| **Formats** | ❌ Manual work | ✅ Timestamps, module names |
| **Production** | ❌ Manual removal | ✅ Leave in place, adjust level |

---

## Basic Setup

```python
import logging

# Simple setup
logging.basicConfig(
    level=logging.INFO,           # Show INFO and above
    format="%(asctime)s - %(levelname)s - %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)

logging.debug("This won't show (below INFO level)")
logging.info("Application started")
logging.warning("Low disk space")
logging.error("Failed to connect to database")
logging.critical("System crashed!")

# Output:
# 2025-06-23 10:30:00 - INFO - Application started
# 2025-06-23 10:30:00 - WARNING - Low disk space
# 2025-06-23 10:30:00 - ERROR - Failed to connect to database
# 2025-06-23 10:30:00 - CRITICAL - System crashed!
```

---

## Logging to a File

```python
import logging

# Log to a file
logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    filename="app.log",
    filemode="a",                  # Append (default: 'a')
)

# Now all logs go to app.log instead of console
logging.info("This goes to the file")

# Log to both file AND console
file_handler = logging.FileHandler("app.log")
console_handler = logging.StreamHandler()

logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[file_handler, console_handler],
)
```

---

## Module-Level Loggers

Best practice: create a logger per module using `__name__`:

```python
# In each module:
import logging

logger = logging.getLogger(__name__)

def do_something():
    logger.info("Doing something...")
    logger.debug("Detailed info for debugging")
```

```python
# In main.py (configure once):
import logging

logging.basicConfig(level=logging.DEBUG)

# Now all modules inherit this configuration
import mymodule
mymodule.do_something()
```

---

## Advanced Configuration

```python
import logging

# Create a custom logger
logger = logging.getLogger("myapp")
logger.setLevel(logging.DEBUG)

# Create handlers
console = logging.StreamHandler()
console.setLevel(logging.INFO)

file = logging.FileHandler("app.log")
file.setLevel(logging.DEBUG)

# Create formatters
console_format = logging.Formatter("%(levelname)s: %(message)s")
file_format = logging.Formatter(
    "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)

# Attach formatters to handlers
console.setFormatter(console_format)
file.setFormatter(file_format)

# Attach handlers to logger
logger.addHandler(console)
logger.addHandler(file)

# Use it
logger.debug("This goes to file only")
logger.info("This goes to both console and file")
```

---

## 🧠 In Simple Words

- Use **`logging`** instead of `print()` for any serious application
- **Levels**: `DEBUG` < `INFO` < `WARNING` < `ERROR` < `CRITICAL`
- Set the level once — messages below that level are hidden
- Use **`basicConfig()`** for quick setup, module-level loggers (`getLogger(__name__)`) for production
- Log to **file** for persistence, **console** for development, or **both**
- Use `%s` formatting for structured logs — don't use f-strings in log messages
