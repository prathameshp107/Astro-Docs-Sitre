---
title: "What is a Hash?"
description: "A hash is a technique that converts a key into an index using a hash function."
---

# What is a Hash?

A **hash** is a technique that converts a key into an index using a hash function.

Goal: **fast lookup (O(1) average)**

### Concept

```
key ’ hash function ’ index ’ value
```

Example idea:

```
"apple" ’ hash ’ bucket[5]
```

You dont compute this manually in JS  `Map`, `Set`, and objects handle it internally.

---