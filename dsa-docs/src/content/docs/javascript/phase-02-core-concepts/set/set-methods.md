---
title: Set Methods
description: Core methods for working with JavaScript Set collections
sidebar:
  order: 1
---

# Set Methods

## Introduction

Set provides a simple API for adding, checking, and removing unique values.

## Basic Operations

```javascript
const set = new Set();

// Add — only adds if value doesn't exist
set.add(1);
set.add(2);
set.add(2); // ignored — already exists
set.add(3);
console.log(set); // Set(3) { 1, 2, 3 }

// Has — check if value exists
console.log(set.has(1)); // true
console.log(set.has(4)); // false

// Size — number of unique values
console.log(set.size); // 3

// Delete — remove a specific value
set.delete(2);
console.log(set.has(2)); // false
console.log(set.size);   // 2

// Clear — remove all values
set.clear();
console.log(set.size); // 0
```

## Initializing with Values

```javascript
// From array
const set = new Set([1, 2, 3, 2, 1]);
console.log([...set]); // [1, 2, 3]

// From string
const chars = new Set('hello');
console.log([...chars]); // ['h', 'e', 'l', 'o']
```

## Deduplication

```javascript
// Remove duplicates from array
const numbers = [1, 2, 2, 3, 3, 3, 4, 5, 5];
const unique = [...new Set(numbers)];
console.log(unique); // [1, 2, 3, 4, 5]

// Check if array has duplicates
function hasDuplicates(arr) {
  return new Set(arr).size !== arr.length;
}
console.log(hasDuplicates([1, 2, 3]));    // false
console.log(hasDuplicates([1, 2, 2]));    // true
```

## Iteration

```javascript
const set = new Set(['a', 'b', 'c']);

// for...of
for (const value of set) console.log(value);

// forEach
set.forEach(value => console.log(value));

// Convert to array
const arr = [...set];    // ['a', 'b', 'c']
const arr2 = Array.from(set); // ['a', 'b', 'c']
```

## Objects in Set

```javascript
const set = new Set();
const obj1 = { id: 1 };
const obj2 = { id: 2 };
const obj3 = { id: 1 }; // different reference — treated as unique!

set.add(obj1);
set.add(obj2);
set.add(obj3); // added because obj3 ≠ obj1

console.log(set.size); // 3
console.log(set.has(obj1)); // true
console.log(set.has({ id: 1 })); // false — different reference
```

## Summary

- `add()` adds if value doesn't exist
- `has()` is O(1) for lookups
- `delete()` removes a value
- `size` shows unique value count
- Great for deduplication and membership checks

## Further Reading

- [MDN: Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
- [Next: Set Operations](./set-operations)
