---
title: "Redis Lists"
description: "A Redis List is an ordered collection of strings. You can add elements to the left (head) or right (tail) of the list. It is essentially a doubly linked li"
---

## 7. Redis Lists

### What is a Redis List?

A Redis List is an **ordered collection of strings**. You can add elements to the **left** (head) or **right** (tail) of the list. It is essentially a **doubly linked list** internally.

> **Analogy:** A ticket queue at a counter. New people join at the back (right), and the counter serves from the front (left).

---

### Core Commands

```bash
# Push to the RIGHT end (tail) — queue-like
RPUSH tasks "send-email" "process-payment" "generate-report"

# Push to the LEFT end (head)
LPUSH tasks "urgent-task"

# List all items (0 = first, -1 = last/end)
LRANGE tasks 0 -1
# Output:
# 1) "urgent-task"
# 2) "send-email"
# 3) "process-payment"
# 4) "generate-report"

# Get length of list
LLEN tasks
# Output: (integer) 4

# Pop from the LEFT (dequeue)
LPOP tasks
# Output: "urgent-task"

# Pop from the RIGHT (stack pop)
RPOP tasks
# Output: "generate-report"

# Peek at specific index (0-based)
LINDEX tasks 0
# Output: "send-email"
```

---

### Queue vs Stack Implementation

| Pattern | Push | Pop | Use Case |
|---|---|---|---|
| **Queue (FIFO)** | `RPUSH` | `LPOP` | Task queue, job processing |
| **Stack (LIFO)** | `LPUSH` | `LPOP` | Browser history, undo operations |

---

### Real-World Examples

**Example 1: Notification Queue**
```bash
# Producer: add notifications
RPUSH notifications:user:42 "You have a new message"
RPUSH notifications:user:42 "Your order has shipped"

# Consumer: process notifications one by one
LPOP notifications:user:42
# Output: "You have a new message"
```

**Example 2: Recent Activity Feed**
```bash
# Add recent actions (trim to last 10 items)
LPUSH feed:user:42 "Liked post #101"
LTRIM feed:user:42 0 9   # Keep only last 10

# Get activity feed
LRANGE feed:user:42 0 -1
```

**Example 3: Background Job Queue**
```bash
# Worker 1 adds a job
RPUSH job:queue '{"type":"email","to":"user@example.com"}'

# Worker 2 picks up the job (blocks if empty — BLPOP)
BLPOP job:queue 30
# Blocks for up to 30 seconds waiting for a new job
```

---
