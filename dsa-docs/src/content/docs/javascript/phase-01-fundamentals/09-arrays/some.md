---
title: some() and every()
description: Testing array conditions with some() and every()
sidebar:
  order: 8
---

# some() & every()

## Introduction

`some()` checks if **at least one** element passes a test. `every()` checks if **all** elements pass a test. Both return a boolean.

## Visual Explanation

```mermaid
flowchart TD
    A["some() — OR condition"]
    B["every() — AND condition"]
    
    A --> A1["[1, 2, 3].some(x => x > 2)"]
    A1 --> A2["true — 3 is > 2"]
    
    B --> B1["[1, 2, 3].every(x => x > 0)"]
    B1 --> B2["true — all are > 0"]
    B1 --> B3["[1, 2, 3].every(x => x > 2)"]
    B3 --> B4["false"]
```

## Examples

```javascript
const numbers = [1, 2, 3, 4, 5];

numbers.some(x => x > 4);  // true — 5 qualifies
numbers.every(x => x > 0); // true
numbers.every(x => x > 3); // false
```

## Use Cases

```javascript
// Validation
const formFields = [
  { value: 'Alice', required: true },
  { value: '', required: true },
  { value: 'alice@email.com', required: true }
];

const allFilled = formFields.every(f => f.value !== '');
const anyEmpty = formFields.some(f => f.value === '');
```

## Summary

- `some()` — at least one passes (short-circuits on true)
- `every()` — all pass (short-circuits on false)
- Both return boolean values

## Further Reading

- [MDN: Array.prototype.some()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
- [MDN: Array.prototype.every()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
