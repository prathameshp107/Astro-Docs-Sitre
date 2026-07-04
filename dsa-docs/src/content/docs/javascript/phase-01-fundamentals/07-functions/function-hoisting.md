---
title: Function Hoisting
description: How JavaScript hoists function declarations and expressions
sidebar:
  order: 14
---

# Function Hoisting

## Introduction

Function hoisting is JavaScript's behavior of moving **function declarations** to the top of their scope during the compilation phase.

## Visual Explanation

```mermaid
flowchart LR
    A["JavaScript Code"]
    B["Compilation Phase"]
    C["Execution Phase"]
    D["Function declarations are hoisted"]
    E["Function expressions remain"]
    
    A --> B
    B --> D
    B --> E
    D --> C
    E --> C
```

## How it Works

```javascript
// ✅ Works — function declaration is hoisted
sayHello(); // 'Hello!'

function sayHello() {
  console.log('Hello!');
}

// ❌ Doesn't work — function expression is NOT hoisted
sayGoodbye(); // TypeError: sayGoodbye is not a function

const sayGoodbye = function() {
  console.log('Goodbye!');
};
```

## Execution Context (Behind the Scenes)

```mermaid
flowchart TD
    A["Creation Phase"]
    B["Memory allocated for function sayHello"]
    C["Variable sayGoodbye set to undefined"]
    D["Execution Phase"]
    E["sayHello() already in memory — works"]
    F["sayGoodbye — not yet assigned"]
    
    A --> B
    A --> C
    A --> D
    D --> E
    D --> F
```

## Summary

- Function declarations are fully hoisted
- Function expressions are NOT hoisted (only variable declaration is hoisted)
- Arrow functions follow the same rules as function expressions
- Prefer function declarations if you need hoisting

## Further Reading

- [MDN: Hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting)
