---
title: The re Module
description: Learn Python's re module functions — search, match, findall, sub, split, and compilation.
sidebar:
  order: 2
---

# The re Module

## Introduction

Python's `re` module provides comprehensive regular expression support with functions for searching, matching, replacing, and splitting strings.

## Core Functions

### re.search() — Find First Match

```python
import re

text = "Contact: support@example.com or admin@test.org"
match = re.search(r"[\w.+-]+@[\w-]+\.[\w.-]+", text)
if match:
    print(match.group())        # support@example.com
    print(match.start())        # 9 (start index)
    print(match.end())          # 29 (end index)
    print(match.span())         # (9, 29)
```

### re.findall() — Find All Matches

```python
emails = re.findall(r"[\w.+-]+@[\w-]+\.[\w.-]+", text)
print(emails)  # ['support@example.com', 'admin@test.org']
```

### re.match() — Match at Start

```python
text = "Python is great"
print(re.match(r"Python", text))    # Match object
print(re.match(r"great", text))      # None (must match at start!)
```

### re.fullmatch() — Match Entire String

```python
print(re.fullmatch(r"\d{3}-\d{4}", "555-1234"))  # Match
print(re.fullmatch(r"\d{3}-\d{4}", "ext 555-1234"))  # None
```

### re.sub() — Search and Replace

```python
text = "My number is 555-1234. Call 555-5678 too."
result = re.sub(r"\d{3}-\d{4}", "[REDACTED]", text)
print(result)  # My number is [REDACTED]. Call [REDACTED] too.

# With callback
def mask_number(match):
    return "***-****"
result = re.sub(r"\d{3}-\d{4}", mask_number, text)
```

### re.split() — Split by Pattern

```python
text = "apple,banana;cherry|date"
parts = re.split(r"[,;|]", text)
print(parts)  # ['apple', 'banana', 'cherry', 'date']
```

## Compiled Patterns

```python
# Compile for reuse (faster for repeated use)
pattern = re.compile(r"\d{3}-\d{4}")

# Same methods on compiled pattern
pattern.search(text)
pattern.findall(text)
pattern.sub("[REDACTED]", text)

# Flags during compilation
pattern = re.compile(r"^hello", re.IGNORECASE)
print(pattern.search("HELLO World"))  # Match!
```

## Flags

```python
# Common flags (can be combined with |)
re.IGNORECASE     # Case-insensitive matching
re.MULTILINE      # ^ and $ match line boundaries
re.DOTALL         # . matches newlines too
re.VERBOSE        # Allow comments in patterns

# Examples
re.findall(r"^hello", "HELLO\nhello", re.IGNORECASE | re.MULTILINE)

# VERBOSE allows readable patterns
pattern = re.compile(r"""
    \b          # Word boundary
    [A-Z][a-z]+ # First name
    \s+         # Whitespace
    [A-Z][a-z]+ # Last name
    \b          # Word boundary
""", re.VERBOSE)
```

## Greedy vs Non-greedy

```python
text = "<div>Hello</div><span>World</span>"

# Greedy (default) — matches as much as possible
print(re.findall(r"<.+>", text))   # ['<div>Hello</div><span>World</span>']

# Non-greedy — matches as little as possible
print(re.findall(r"<.+?>", text))  # ['<div>', '</div>', '<span>', '</span>']
```

## Best Practices

1. **Always use raw strings `r"pattern"`** to avoid escaping issues
2. **Compile patterns** when using the same regex multiple times
3. **Use `re.VERBOSE`** for complex patterns to add comments
4. **Test your regex** with various inputs — edge cases matter!
5. **Avoid overly complex regex** — sometimes string methods are simpler

## Practice Exercises

**Exercise 1:** Write a function that validates email addresses using regex.

**Exercise 2:** Create a function that extracts all hashtags from a tweet.

**Exercise 3:** Implement a simple template engine that replaces `{{variable}}` placeholders with values from a dictionary.
