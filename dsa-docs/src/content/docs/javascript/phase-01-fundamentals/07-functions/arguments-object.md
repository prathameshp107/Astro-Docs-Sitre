---
title: arguments Object
description: The arguments object — accessing all function arguments in older JavaScript
sidebar:
  order: 13
---

# arguments Object

## Introduction

The `arguments` object is an **array-like object** accessible inside functions that contains all arguments passed to the function. It's available in regular functions (not arrow functions).

## Example

```javascript
function sum() {
  let total = 0;
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}

console.log(sum(1, 2, 3, 4)); // 10
```

## Array-like, Not an Array

```javascript
function test() {
  console.log(arguments.length); // 3
  console.log(arguments[0]); // 'a'
  console.log(arguments[1]); // 'b'
  
  // ❌ arguments.map is not a function
  // ✅ Convert to array
  const args = Array.from(arguments);
  // or
  const args = [...arguments];
}

test('a', 'b', 'c');
```

## Not Available in Arrow Functions

```javascript
const arrowFn = () => {
  console.log(arguments); // ReferenceError
};
```

## Summary

- `arguments` contains all passed arguments
- It's array-like (has length, indexed), not a real array
- NOT available in arrow functions
- Prefer rest parameters `...args` in modern code

## Further Reading

- [MDN: arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments)
