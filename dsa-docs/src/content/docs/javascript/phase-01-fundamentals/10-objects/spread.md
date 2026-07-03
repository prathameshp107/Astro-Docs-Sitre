---
title: Spread Operator
description: Using the spread operator (...) with objects for copying and merging
sidebar:
  order: 5
---

# Spread Operator (...)

## Introduction

The spread operator `...` "spreads" the properties of an object into a new object. It's used for **copying** and **merging** objects.

## Copying Objects

```javascript
const original = { name: 'Alice', age: 25 };
const copy = { ...original };

console.log(copy); // { name: 'Alice', age: 25 }
console.log(copy === original); // false — different reference
```

## Merging Objects

```javascript
const user = { name: 'Alice' };
const details = { age: 25, email: 'alice@email.com' };
const preferences = { theme: 'dark' };

const merged = { ...user, ...details, ...preferences };
// { name: 'Alice', age: 25, email: 'alice@email.com', theme: 'dark' }
```

## Overriding Properties

```javascript
const defaults = { theme: 'light', fontSize: 14 };
const userSettings = { theme: 'dark' };

const settings = { ...defaults, ...userSettings };
// { theme: 'dark', fontSize: 14 } — userSettings overrides
```

## Shallow Copy Warning

```javascript
const original = { 
  name: 'Alice', 
  address: { city: 'NYC' }
};

const copy = { ...original };
copy.address.city = 'LA';

console.log(original.address.city); // 'LA' — shallow!
```

## Summary

- `...` spreads properties into a new object
- Used for copying and merging
- Later properties override earlier ones
- Only shallow copies — nested objects are shared

## Further Reading

- [MDN: Spread Syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
