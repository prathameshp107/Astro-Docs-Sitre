---
title: "When to Use Map vs Object"
description: "keys are not strings need guaranteed insertion order frequent additions/deletions want better performance semantics"
sidebar:
  order: 28
---

# When to Use Map vs Object

## Use Map when:

* keys are not strings
* need guaranteed insertion order
* frequent additions/deletions
* want better performance semantics

## Use Object when:

* simple JSON-like data
* keys are strings only

---

| Feature         | Object                                        | Map                                          |
| --------------- | --------------------------------------------- | -------------------------------------------- |
| Key types       | Strings or Symbols                            | Any type (objects, numbers, functions, etc.) |
| Order preserved | ❌ Not guaranteed (older JS)                   | ✅ Preserves insertion order                  |
| Size property   | ❌ No direct property (`Object.keys().length`) | ✅ `map.size`                                 |
| Performance     | Good for small data                           | Better for large datasets                    |
| Iteration       | Less clean (`for...in`, `Object.keys`)        | Cleaner (`for...of`, `map.forEach`)          |

---