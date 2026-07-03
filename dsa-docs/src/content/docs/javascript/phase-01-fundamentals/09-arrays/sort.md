---
title: sort()
description: Sorting arrays with sort() — default behavior and custom comparators
sidebar:
  order: 11
---

# sort()

## Introduction

`sort()` sorts elements **in place** and returns the sorted array. By default, it converts elements to strings and sorts lexicographically.

## Default Sort (String Order)

```javascript
[3, 30, 1, 100].sort();
// [1, 100, 3, 30] — string order!
```

## Custom Comparator

```javascript
// Numeric ascending
[3, 30, 1, 100].sort((a, b) => a - b);
// [1, 3, 30, 100]

// Numeric descending
[3, 30, 1, 100].sort((a, b) => b - a);
// [100, 30, 3, 1]
```

## Objects

```javascript
const users = [
  { name: 'Charlie', age: 30 },
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 35 }
];

users.sort((a, b) => a.name.localeCompare(b.name));
users.sort((a, b) => a.age - b.age);
```

## Summary

- Default sort is lexicographic (string-based)
- Always provide a comparator function for numbers
- Mutates the original array — copy first if needed

## Further Reading

- [MDN: Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
