---
title: Custom Iterables
description: Creating custom iterables with Symbol.iterator and generator functions
sidebar:
  order: 2
---

# Custom Iterables

## Introduction

You can make **any object iterable** by implementing the `[Symbol.iterator]()` method. This allows `for...of`, spread, and destructuring to work with your custom objects.

## Manual Implementation

```javascript
class Range {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
  
  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;
    
    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false };
        }
        return { value: undefined, done: true };
      }
    };
  }
}

for (const num of new Range(1, 5)) {
  console.log(num); // 1, 2, 3, 4, 5
}

console.log([...new Range(3, 7)]); // [3, 4, 5, 6, 7]
```

## Making Objects Iterable

```javascript
const user = {
  name: 'Alice',
  age: 25,
  skills: ['JS', 'React'],
  
  [Symbol.iterator]() {
    const entries = Object.entries(this);
    let index = 0;
    
    return {
      next() {
        if (index < entries.length) {
          return { value: entries[index++], done: false };
        }
        return { value: undefined, done: true };
      }
    };
  }
};

for (const [key, value] of user) {
  console.log(key, value);
  // name Alice
  // age 25
  // skills ['JS', 'React']
}
```

## With Generator Functions (Simpler)

```javascript
class Range {
  constructor(start, end) { this.start = start; this.end = end; }
  
  *[Symbol.iterator]() {
    for (let i = this.start; i <= this.end; i++) {
      yield i;
    }
  }
}
```

## Returning from an Iterator

```javascript
class Sequence {
  constructor(max) { this.max = max; }
  
  [Symbol.iterator]() {
    let i = 0;
    const max = this.max;
    return {
      next() {
        if (i < max) {
          return { value: i++, done: false };
        }
        return { value: 'done', done: true };
      }
    };
  }
}
```

## Summary

- Implement `[Symbol.iterator]()` to make objects iterable
- Return an iterator object with a `next()` method
- Generators simplify custom iterables
- `for...of`, spread, and destructuring all use iteration

## Further Reading

- [MDN: Iteration Protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)
- [Previous: Iteration Protocol](./iteration-protocol)
