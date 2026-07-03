---
title: flat() and flatMap()
description: Flattening nested arrays with flat() and flatMap()
sidebar:
  order: 10
---

# flat() & flatMap()

## Introduction

`flat()` creates a new array with all sub-array elements concatenated up to a specified depth. `flatMap()` maps then flattens in one step.

## flat()

```javascript
[1, [2, [3]]].flat();         // [1, 2, [3]] — default depth: 1
[1, [2, [3]]].flat(2);        // [1, 2, 3]
[1, [2, [3]]].flat(Infinity); // [1, 2, 3]
```

## flatMap()

```javascript
['hello world', 'foo bar'].flatMap(str => str.split(' '));
// ['hello', 'world', 'foo', 'bar']

// Equivalent to: arr.map(...).flat()
```

## Summary

- `flat(depth)` flattens nested arrays
- `flatMap()` combines map + flat(1)
- More efficient than separate map then flat

## Further Reading

- [MDN: Array.prototype.flat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)
- [MDN: Array.prototype.flatMap()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)
