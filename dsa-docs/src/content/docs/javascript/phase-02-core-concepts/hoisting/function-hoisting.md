---
title: Function Hoisting
description: How function declarations are hoisted in JavaScript
sidebar:
  order: 1
---

# Function Hoisting

## Introduction

Function declarations are **fully hoisted** — both the name and the body are moved to the top of their scope during the creation phase.

## Fully Hoisted

```javascript
// ✅ Can call before definition
sayHello(); // 'Hello!'

function sayHello() {
  console.log('Hello!');
}

// This works because during creation phase,
// the entire function is stored in memory
```

## Not All Function Definitions are Hoisted

```javascript
// ❌ Function expressions are NOT hoisted
sayHi(); // TypeError: sayHi is not a function

var sayHi = function() {
  console.log('Hi!');
};
// var sayHi is hoisted as undefined, but the assignment doesn't happen yet

// ❌ Arrow functions are NOT hoisted
greet(); // ReferenceError: Cannot access before initialization

let greet = () => {
  console.log('Hello!');
};
// let greet is in TDZ
```

## Best Practices

- Declare functions before using them (even though declarations are hoisted)
- Use function declarations for top-level functions
- Use function expressions/arrows when hoisting is undesirable

## Summary

- `function` declarations are fully hoisted (name + body)
- Function expressions and arrow functions are NOT hoisted
- Hoisting makes code more flexible but can be confusing
- Best practice: declare before use

## Further Reading

- [MDN: Hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting)
- [Next: var Hoisting](./var-hoisting)
