---
title: Set Operations
description: Union, intersection, difference, and subset operations with Sets
sidebar:
  order: 2
---

# Set Operations

## Introduction

JavaScript's Set doesn't have built-in set operation methods, but you can easily implement union, intersection, and difference using array methods.

## Union

The union combines elements from both sets, removing duplicates:

```javascript
const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 4, 5, 6]);

const union = new Set([...setA, ...setB]);
console.log([...union]); // [1, 2, 3, 4, 5, 6]
```

## Intersection

The intersection returns elements that exist in **both** sets:

```javascript
const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 4, 5, 6]);

const intersection = new Set(
  [...setA].filter(x => setB.has(x))
);
console.log([...intersection]); // [3, 4]
```

## Difference

The difference returns elements in the first set that are **not** in the second:

```javascript
const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 4, 5, 6]);

const difference = new Set(
  [...setA].filter(x => !setB.has(x))
);
console.log([...difference]); // [1, 2]

// Symmetric difference (elements in either but not both)
const symmetricDiff = new Set(
  [...setA].filter(x => !setB.has(x)).concat(
    [...setB].filter(x => !setA.has(x))
  )
);
console.log([...symmetricDiff]); // [1, 2, 5, 6]
```

## Subset Check

```javascript
function isSubset(subset, superset) {
  return [...subset].every(x => superset.has(x));
}

const setA = new Set([1, 2]);
const setB = new Set([1, 2, 3, 4]);

console.log(isSubset(setA, setB)); // true
console.log(isSubset(setB, setA)); // false
```

## Practical Example

```javascript
const allUsers = new Set(['Alice', 'Bob', 'Charlie', 'Diana']);
const activeUsers = new Set(['Alice', 'Charlie', 'Eve']);
const adminUsers = new Set(['Alice', 'Diana']);

// Active admins
const activeAdmins = new Set(
  [...activeUsers].filter(u => adminUsers.has(u))
);
console.log([...activeAdmins]); // ['Alice']

// Users who are NOT active
const inactiveUsers = new Set(
  [...allUsers].filter(u => !activeUsers.has(u))
);
console.log([...inactiveUsers]); // ['Bob', 'Diana']
```

## Summary

| Operation | Code | Result |
|-----------|------|--------|
| Union | `[...setA, ...setB]` | All unique from both |
| Intersection | `[...setA].filter(x => setB.has(x))` | Common elements |
| Difference | `[...setA].filter(x => !setB.has(x))` | In A but not B |
| Symmetric Diff | Both differences combined | In A or B but not both |

## Further Reading

- [Previous: Set Methods](./set-methods)
- [Next: WeakSet](./weakset)
