---
title: "Redis Strings"
description: "A String in Redis is the most basic type. Despite the name, it can hold: - Plain text: \"Hello, World!\" - Integers: 42 - Floats: 3.14 - Binary data: images,"
---

## 6. Redis Strings

### What is a String?

A String in Redis is the most basic type. Despite the name, it can hold:
- Plain text: `"Hello, World!"`
- Integers: `42`
- Floats: `3.14`
- Binary data: images, serialized objects (up to **512 MB**)

> **Analogy:** A String is like a labeled jar — the label is the key, and whatever you put inside is the value.

---

### Core Commands

```bash
# Set a key
SET username "prathamesh"

# Get a key
GET username
# Output: "prathamesh"

# Set with expiry (in seconds)
SET session:user123 "token_abc" EX 3600

# Set multiple keys at once
MSET name "Alice" age "30" city "Pune"

# Get multiple keys at once
MGET name age city
# Output: 1) "Alice" 2) "30" 3) "Pune"

# Check if a key exists
EXISTS username
# Output: 1 (exists) or 0 (not found)

# Delete a key
DEL username

# Append to existing value
SET greeting "Hello"
APPEND greeting ", World!"
GET greeting
# Output: "Hello, World!"
```

---

### Counters — Increment & Decrement

Redis Strings can store integers and perform atomic increment/decrement operations.

```bash
# Initialize a counter
SET page:views:homepage 0

# Increment by 1 (atomic operation)
INCR page:views:homepage
# Output: (integer) 1

INCR page:views:homepage
# Output: (integer) 2

# Increment by a specific amount
INCRBY page:views:homepage 100
# Output: (integer) 102

# Decrement
DECR page:views:homepage
# Output: (integer) 101

DECRBY page:views:homepage 50
# Output: (integer) 51
```

> **Why is INCR useful?** Because `INCR` is **atomic**. Even if 1,000 concurrent clients call `INCR` at the same time, each increment is applied correctly. No race conditions.

---

### Real-World Examples

**Example 1: Page Visit Counter**
```bash
# Every time a user visits the homepage
INCR visits:homepage

# Get total visit count
GET visits:homepage
```

**Example 2: User Session Storage**
```bash
# Store session token with 30-minute expiry
SET session:user:42 "eyJhbGciOiJIUzI1NiJ9..." EX 1800

# Validate session
GET session:user:42
# Returns token if valid, nil if expired
```

**Example 3: Rate Limiting**
```bash
# Track API calls per minute per user
SET ratelimit:user:42 0 EX 60
INCR ratelimit:user:42

# If value > 100, reject the request
GET ratelimit:user:42
```

---

### Advantages of Redis Strings

- Simple and fast
- Atomic counter operations
- Supports TTL natively
- Binary-safe (can store any data)

### Limitations

- Maximum value size is 512 MB
- Not suitable for structured or relational data

---
