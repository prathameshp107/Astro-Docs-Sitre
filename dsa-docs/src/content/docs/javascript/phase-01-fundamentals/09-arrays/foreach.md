---
title: forEach()
description: The forEach() method — iterate over array elements
sidebar:
  order: 6
---

# forEach()

## Introduction

`forEach()` executes a function **for each element** in the array. It's used for side effects (logging, updating external state) rather than creating new values.

## Syntax

```javascript
array.forEach((element, index, array) => {
  // side effect
});
```

## Example

```javascript
const fruits = ['apple', 'banana', 'orange'];

fruits.forEach((fruit, index) => {
  console.log(`${index}: ${fruit}`);
});
// 0: apple
// 1: banana
// 2: orange
```

## forEach vs map

```javascript
// Use forEach for side effects
fruits.forEach(fruit => console.log(fruit));

// Use map for transformation
const lengths = fruits.map(fruit => fruit.length);
```

## Summary

- Iterates over each element
- Returns `undefined` — cannot chain
- Cannot break or continue (use for...of instead)
- Use for side effects, not transformations

## Further Reading

- [MDN: Array.prototype.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
