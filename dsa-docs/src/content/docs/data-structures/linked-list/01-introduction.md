---
title: "What is a Linked List?"
description: "Introduction to linked lists — definition, real-life analogy, arrays vs linked lists, and memory model."
sidebar:
  order: 1
---

# 🔗 What is a Linked List?

---

## 🎯 Real-Life Analogy

Imagine a **treasure hunt** 🗺️:

- You find clue #1 in your mailbox. It says: *"Go check under the doormat."*
- Under the doormat is clue #2: *"Look in the kitchen drawer."*
- In the kitchen drawer is clue #3: *"Treasure is in the garage!"*

Each clue **holds a value AND tells you where to go next**. That's exactly a Linked List!

---

## 🔹 Definition

A **Linked List** is a chain of **nodes**, where each node has:

1. **Data** — the value (like the clue)
2. **Next** — the address of the next node (like "go to kitchen")

```mermaid
flowchart LR
    HEAD["HEAD"] --> N1["Node 1
Data: 10"]
    N1 --> N2["Node 2
Data: 20"]
    N2 --> N3["Node 3
Data: 30"]
    N3 --> N4["Node 4
Data: 40"]
    N4 --> NULL["NULL
(end)"]

    style HEAD fill:#7c3aed,color:#fff
    style N1 fill:#4f46e5,color:#fff
    style N2 fill:#4f46e5,color:#fff
    style N3 fill:#4f46e5,color:#fff
    style N4 fill:#4f46e5,color:#fff
    style NULL fill:#dc2626,color:#fff
```

```
HEAD
 │
 ▼
┌─────┬───┐    ┌─────┬───┐    ┌─────┬───┐    ┌─────┬──────┐
│  10 │ ●─┼──▶ │  20 │ ●─┼──▶│  30 │ ●─┼──▶ │  40 │ NULL │
└─────┴───┘    └─────┴───┘    └─────┴───┘    └─────┴──────┘
  Node 1         Node 2         Node 3         Node 4
```

- **HEAD** = pointer to the first node (entry point)
- **NULL** = means "end of list" (no next node)

---

## 🤔 Why Not Just Use Arrays?

Think of an **array** like a row of seats in a movie theater — all glued together. If you want to add a seat in the middle, you have to **move everyone**.

A **linked list** is like friends holding hands in a line. To add someone in the middle, two people just **let go and grab the new person's hand**. Nobody else moves!

### Arrays vs Linked Lists

| What you want to do | Array | Linked List |
|---------------------|-------|-------------|
| Get the 5th item | ⚡ Instant (O(1)) | 🐢 Walk to it (O(n)) |
| Add item at start | 🐢 Shift everyone (O(n)) | ⚡ Instant (O(1)) |
| Add item at end | ⚡ Fast | 🐢 Walk to end |
| Memory used | Less | More (extra "next" pointer) |
| Fixed size? | Often yes | No, grows freely |

---

## 🔹 How It Looks in Memory

**Array** — items sit next to each other:
```
[10][20][30][40]   ← all in one block
```

**Linked List** — items can be anywhere in memory, connected by arrows:
```
[10] ──▶ (somewhere far) [20] ──▶ (another place) [30] ──▶ NULL
```

---

## Next Steps

- [Types of Linked Lists](/DSA-Notes-Problems/data-structures/linked-list/02-types) — Singly, Doubly, and Circular
- [Time & Space Complexity](/DSA-Notes-Problems/data-structures/linked-list/03-complexity) — Performance analysis
- [Core Operations](/DSA-Notes-Problems/data-structures/linked-list/04-operations) — Insert, delete, traverse, search
