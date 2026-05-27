---
title: Regular Expression Syntax
description: Learn regular expression patterns, metacharacters, quantifiers, groups, and anchors in Python.
sidebar:
  order: 1
---

# Regular Expression Syntax

## Introduction

A **regular expression (regex)** is a pattern that describes a set of strings. Python's `re` module provides regex functionality.

## Literal Characters

```python
import re

pattern = r"hello"
text = "hello world"
print(re.findall(pattern, text))  # ['hello']
```

## Metacharacters

| Character | Meaning | Example |
|-----------|---------|---------|
| `.` | Any character except newline | `h.t` matches "hat", "hot" |
| `^` | Start of string | `^hello` matches "hello world" |
| `$` | End of string | `world$` matches "hello world" |
| `*` | 0 or more repetitions | `ab*c` matches "ac", "abc", "abbc" |
| `+` | 1 or more repetitions | `ab+c` matches "abc", "abbc" |
| `?` | 0 or 1 repetition | `ab?c` matches "ac", "abc" |
| `{n}` | Exactly n repetitions | `a{3}` matches "aaa" |
| `{n,}` | n or more repetitions | `a{2,}` matches "aa", "aaa" |
| `{n,m}` | n to m repetitions | `a{2,4}` matches "aa", "aaa", "aaaa" |
| `[]` | Character class | `[aeiou]` matches any vowel |
| `|` | OR | `cat|dog` matches "cat" or "dog" |
| `()` | Group | `(ab)+` matches "ab", "abab" |

## Character Classes

```python
# Pre-defined classes
# \d = digit (0-9)
# \w = word character (a-z, A-Z, 0-9, _)
# \s = whitespace (space, tab, newline)
# \b = word boundary

# Custom classes
pattern = r"[aeiou]"          # Any vowel
pattern = r"[0-9]"            # Any digit
pattern = r"[^0-9]"           # NOT a digit (negation)
pattern = r"[a-zA-Z]"         # Any letter
pattern = r"[A-Z][a-z]+"      # Capitalized word

text = "Hello World! 123"
print(re.findall(r"[A-Z][a-z]+", text))  # ['Hello', 'World']
```

## Groups and Capturing

```python
text = "John: 555-1234"

# Capturing groups
pattern = r"(\w+): (\d{3}-\d{4})"
match = re.search(pattern, text)
print(match.group(0))     # John: 555-1234 (full match)
print(match.group(1))     # John
print(match.group(2))     # 555-1234

# Named groups
pattern = r"(?P<name>\w+): (?P<phone>\d{3}-\d{4})"
print(match.group("name"))   # John

# Non-capturing groups
pattern = r"(?:\d{3}-)?\d{4}"  # ?: makes group non-capturing
```

## Lookahead and Lookbehind

```python
# Positive lookahead: x(?=y) — matches x only if followed by y
re.findall(r'\d+(?= dollars)', "100 dollars, 50 euros")
# ['100']

# Negative lookahead: x(?!y) — matches x only if NOT followed by y
re.findall(r'\d+(?! dollars)', "100 dollars, 50 euros")
# ['50']

# Positive lookbehind: (?<=y)x — matches x only if preceded by y
re.findall(r'(?<=\$)\d+', "Price: $100, Cost: 50")
# ['100']
```

## Practice Exercises

**Exercise 1:** Write a regex that matches valid email addresses.

**Exercise 2:** Write a regex that matches phone numbers in format (123) 456-7890.

**Exercise 3:** Write a regex that extracts all URLs from a block of text.
