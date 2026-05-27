---
title: "Time & Space Complexity"
description: "Time and space complexity analysis of linked list operations with comparisons to arrays."
sidebar:
  order: 3
---

# Time & Space Complexity

---

## Quick Reference Table

| Operation | Singly Linked List | Why? |
|-----------|-------------------|------|
| Get the Nth item | **O(n)** | Must walk from head |
| Search for value | **O(n)** | Must check each node |
| Insert at start | **O(1)** | Just rewire head |
| Insert at end | **O(n)** | Walk to last node |
| Insert at middle | **O(n)** | Walk to position, then O(1) |
| Delete from start | **O(1)** | Just move head forward |
| Delete from end | **O(n)** | Walk to find 2nd last |
| Delete by value | **O(n)** | Search + delete |
| Reverse | **O(n)** | Single pass through list |

**Space Complexity:** O(n) for n nodes (plus O(1) extra for temporary pointers during operations).

---

## Doubly Linked List Comparison

| Operation | Doubly Linked List | Why? |
|-----------|-------------------|------|
| Insert at start | **O(1)** | Update head and prev pointers |
| Insert at end | **O(1)** (with tail pointer) | Direct access to tail |
| Delete at end | **O(1)** (with tail pointer) | Use `tail.prev` to update |
| Delete given node | **O(1)** | Node has direct access to `prev` |
| All other operations | **O(n)** | Same traversal cost |

> **Note:** Doubly linked lists use O(n) memory as well, but with roughly **2× the constant factor** due to the extra `prev` pointer per node.

---

## When to Use Which?

| Use **Linked List** when... | Use **Array** when... |
|-----------------------------|----------------------|
| You add/remove at the start a lot | You need fast random access (`arr[5]`) |
| You don't know how big it'll get | Memory matters (cache friendly) |
| You're building stacks/queues | You do lots of math/range queries |
| Memory fragmentation is okay | You need bidirectional traversal |
| You need constant-time deletions | Data size is fixed/predictable |

---

## Visual: Cost of Operations

```
              Arrays          Singly LL       Doubly LL
Access ────    O(1)     ──    O(n)     ──     O(n)
Search ────    O(n)     ──    O(n)     ──     O(n)
Ins Beg ──     O(n)     ──    O(1)     ──     O(1)
Ins End ──     O(1)*    ──    O(n)     ──     O(1)†
Del Beg ──     O(n)     ──    O(1)     ──     O(1)
Del End ──     O(1)*    ──    O(n)     ──     O(1)†

* Amortized / with capacity
† With tail pointer
```

---

## Related

- [Core Operations](/DSA-Notes-Problems/data-structures/linked-list/04-operations) — Step-by-step implementation
- [Important Patterns](/DSA-Notes-Problems/data-structures/linked-list/05-patterns) — Fast & slow pointer, reversal, etc.
- [Algorithm Basics](/DSA-Notes-Problems/data-structures/fundamentals/algorithm-basics) — Learn more about complexity analysis
