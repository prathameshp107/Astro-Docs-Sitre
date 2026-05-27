---
title: SQL in Python (sqlite3)
description: Learn how to interact with SQL databases using Python's built-in sqlite3 module.
sidebar:
  order: 1
---

# SQL in Python

## Introduction

Python's `sqlite3` module provides a built-in SQL database engine. The same patterns apply to other databases (PostgreSQL, MySQL) through their respective drivers.

## Connecting to a Database

```python
import sqlite3

# Connect (creates file if not exists)
conn = sqlite3.connect("mydb.db")

# In-memory database
conn = sqlite3.connect(":memory:")

# Get cursor
cursor = conn.cursor()
```

## Creating Tables

```python
cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE,
        age INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
""")
conn.commit()
```

## CRUD Operations

```python
# INSERT
cursor.execute(
    "INSERT INTO users (name, email, age) VALUES (?, ?, ?)",
    ("Alice", "alice@example.com", 30)
)
conn.commit()
print(cursor.lastrowid)  # 1

# SELECT
cursor.execute("SELECT * FROM users WHERE age > ?", (25,))
rows = cursor.fetchall()  # List of tuples
for row in rows:
    print(row)

# UPDATE
cursor.execute(
    "UPDATE users SET age = ? WHERE name = ?",
    (31, "Alice")
)
conn.commit()
print(cursor.rowcount)  # Rows affected

# DELETE
cursor.execute("DELETE FROM users WHERE id = ?", (1,))
conn.commit()
```

## Using Row Factory (Dict Access)

```python
conn.row_factory = sqlite3.Row
cursor = conn.cursor()
cursor.execute("SELECT * FROM users")
for row in cursor.fetchall():
    print(row["name"], row["email"])  # Dict-like access!
```

## Parameterized Queries

```python
# ✅ Correct — parameters are properly escaped
cursor.execute("SELECT * FROM users WHERE name = ?", (name,))

# ❌ Wrong — SQL injection vulnerability!
cursor.execute(f"SELECT * FROM users WHERE name = '{name}'")
```

## Transactions

```python
try:
    conn.execute("BEGIN TRANSACTION")
    
    cursor.execute("UPDATE accounts SET balance = balance - 100 WHERE id = 1")
    cursor.execute("UPDATE accounts SET balance = balance + 100 WHERE id = 2")
    
    conn.commit()  # All or nothing
except:
    conn.rollback()  # Revert on error
```

## Connection as Context Manager

```python
from contextlib import closing

with sqlite3.connect("mydb.db") as conn:
    with closing(conn.cursor()) as cursor:
        cursor.execute("SELECT * FROM users")
        return cursor.fetchall()
```

## Practice Exercises

**Exercise 1:** Create a database for a library with tables for books, authors, and members.

**Exercise 2:** Implement a simple task manager with CRUD operations using SQLite.
