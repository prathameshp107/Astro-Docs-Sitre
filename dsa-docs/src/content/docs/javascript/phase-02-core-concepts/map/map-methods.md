---
title: Map Methods
description: Core methods for working with JavaScript Map collections
sidebar:
  order: 1
---

# Map Methods

## Introduction

Map provides a clean API for adding, retrieving, and removing key-value pairs.

## Basic Operations

```javascript
const map = new Map();

// Set — add or update a key-value pair
map.set('name', 'Alice');
map.set(42, 'answer');
map.set({ id: 1 }, 'user');

// Get — retrieve a value by key
console.log(map.get('name')); // 'Alice'
console.log(map.get(42));     // 'answer'

// Has — check if key exists
console.log(map.has('name')); // true
console.log(map.has('age'));  // false

// Size — number of entries
console.log(map.size); // 3

// Delete — remove an entry
map.delete(42);
console.log(map.has(42)); // false
console.log(map.size);    // 2

// Clear — remove all entries
map.clear();
console.log(map.size); // 0
```

## Chaining set()

```javascript
const map = new Map();
map.set('a', 1)
   .set('b', 2)
   .set('c', 3);
// Map(3) { 'a' => 1, 'b' => 2, 'c' => 3 }
```

## Initializing with Entries

```javascript
const map = new Map([
  ['name', 'Alice'],
  ['age', 30],
  ['city', 'Mumbai']
]);

console.log(map.get('name')); // 'Alice'
console.log(map.size);        // 3
```

## Object Keys

```javascript
const user1 = { name: 'Alice' };
const user2 = { name: 'Bob' };

const scores = new Map();
scores.set(user1, 95);
scores.set(user2, 87);

console.log(scores.get(user1)); // 95
console.log(scores.get({ name: 'Alice' })); // undefined — different reference!
```

## NaN as Key

```javascript
const map = new Map();
map.set(NaN, 'not a number');
console.log(map.get(NaN)); // 'not a number' — NaN works as a key
```

## Summary

- `set()` adds/updates entries
- `get()` retrieves values
- `has()` checks existence
- `delete()` removes single entry
- `clear()` removes all entries
- `size` property shows entry count

## Further Reading

- [MDN: Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [Next: Map vs Object](./map-vs-object)
