---
title: Arrow Functions and this
description: How arrow functions handle this differently — lexical scoping with no own this
sidebar:
  order: 5
---

# Arrow Functions and this

## Introduction

Arrow functions **do not have their own `this`**. Instead, they **inherit `this` from the surrounding (lexical) scope** — wherever the arrow function is defined, not where it's called.

## The Key Difference

```javascript
const obj = {
  name: 'Alice',
  
  // Regular function: this = obj (implicit binding)
  regularFunc: function() {
    console.log(this.name); // 'Alice'
  },
  
  // Arrow function: this = surrounding scope (not obj!)
  arrowFunc: () => {
    console.log(this.name); // undefined — inherits from global
  }
};

obj.regularFunc(); // 'Alice'
obj.arrowFunc();   // undefined
```

## Practical Benefit — Preserving this in Callbacks

The most common use case: arrow functions inside regular methods:

```javascript
const user = {
  name: 'Alice',
  
  // ❌ Regular function loses this
  greetBad: function() {
    setTimeout(function() {
      console.log(`Hi, I'm ${this.name}`); // undefined — this = window
    }, 100);
  },
  
  // ✅ Arrow function preserves this
  greetGood: function() {
    setTimeout(() => {
      console.log(`Hi, I'm ${this.name}`); // 'Alice' — inherits from greetGood
    }, 100);
  }
};

user.greetBad(); // "Hi, I'm undefined"
user.greetGood(); // "Hi, I'm Alice"
```

## Why This Works

```javascript
function outer() {
  // Regular function creates its own this
  // Arrow function inherits this from outer
  
  const regular = function() {
    console.log(this);
  };
  
  const arrow = () => {
    console.log(this);
  };
  
  regular.call('regular'); // 'regular'
  arrow.call('arrow');     // whatever this is in outer (ignores call!)
}
```

## Arrow Functions Cannot Be Bound

```javascript
const arrow = () => console.log(this);

const obj = { name: 'obj' };

// These do NOT change this in arrow functions:
arrow.call(obj);   // this = global/undefined
arrow.apply(obj);  // this = global/undefined
const bound = arrow.bind(obj);
bound();           // this = global/undefined
```

## Arrow Functions and new

Arrow functions **cannot be used as constructors**:

```javascript
const MyClass = () => {
  this.name = 'test';
};

// ❌ TypeError: MyClass is not a constructor
const obj = new MyClass();
```

## When to Use Each

| Scenario | Use Regular Function | Use Arrow Function |
|----------|-------------------|-------------------|
| Object method | ✅ | ❌ (inherits wrong this) |
| Callback/promise | ⚠️ (need `.bind()`) | ✅ (lexical this) |
| Constructor | ✅ | ❌ |
| Event handler | ⚠️ (this = element) | ✅ (inherits context) |
| Array method (map/filter) | ⚠️ (needs context) | ✅ (concise + lexical) |

## Summary

- Arrow functions inherit `this` from their lexical scope
- Cannot rebind `this` with `call`, `apply`, or `bind`
- Cannot be used as constructors with `new`
- Perfect for callbacks to preserve enclosing context
- Avoid arrow functions for object methods (use regular functions)

## Further Reading

- [MDN: Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- [Previous: new Binding](./new-binding)
- [Next: Common Pitfalls](./common-pitfalls)
