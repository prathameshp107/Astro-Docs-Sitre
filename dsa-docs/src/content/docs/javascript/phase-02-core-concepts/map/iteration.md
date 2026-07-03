---
title: Map Iteration
description: Iterating over Map entries, keys, and values
sidebar:
  order: 3
---

# Map Iteration

## Introduction

Maps are **directly iterable**, which makes them more convenient to iterate than objects.

## for...of

```javascript
const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3]
]);

// Iterate entries (default)
for (const [key, value] of map) {
  console.log(key, value);
}
// a 1
// b 2
// c 3
```

## keys(), values(), entries()

```javascript
const map = new Map([['a', 1], ['b', 2], ['c', 3]]);

// Keys
for (const key of map.keys()) {
  console.log(key); // 'a', 'b', 'c'
}

// Values
for (const value of map.values()) {
  console.log(value); // 1, 2, 3
}

// Entries
for (const entry of map.entries()) {
  console.log(entry); // ['a', 1], ['b', 2], ['c', 3]
}
```

## forEach

```javascript
map.forEach((value, key, map) => {
  console.log(`${key}: ${value}`);
});
// a: 1
// b: 2
// c: 3
```

## Converting to Array

```javascript
const map = new Map([['a', 1], ['b', 2], ['c', 3]]);

const keys = [...map.keys()];       // ['a', 'b', 'c']
const values = [...map.values()];   // [1, 2, 3]
const entries = [...map.entries()]; // [['a',1], ['b',2], ['c',3]]
const asArray = [...map];           // [['a',1], ['b',2], ['c',3]]
```

## Summary

- Maps are directly iterable with `for...of`
- `keys()`, `values()`, `entries()` return iterators
- `forEach(callback)` provides value, key, and map
- Spread operator converts Map to array of entries

## Further Reading

- [MDN: Map Iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#iterating_maps)
- [Previous: Map vs Object](./map-vs-object)
- [Next: WeakMap](./weakmap)
