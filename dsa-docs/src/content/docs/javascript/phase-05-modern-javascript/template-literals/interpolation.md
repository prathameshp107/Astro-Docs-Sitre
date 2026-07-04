---
title: String Interpolation
description: Embedding expressions in strings with ${}
sidebar:
  order: 1
---

# String Interpolation

## Introduction

Template literals allow embedding expressions directly in strings using `${}` syntax, eliminating string concatenation.

## Basic Interpolation

```javascript
const name = 'Alice';
const age = 25;

// Old way
console.log('Hello, ' + name + '! You are ' + age + '.');

// Template literal
console.log(`Hello, ${name}! You are ${age}.`);
```

## Expressions

```javascript
const a = 10;
const b = 5;

// Any JavaScript expression works inside ${}
console.log(`${a} + ${b} = ${a + b}`); // '10 + 5 = 15'
console.log(`${a} > ${b}: ${a > b}`);   // '10 > 5: true'

// Function calls
console.log(`Upper: ${name.toUpperCase()}`); // 'Upper: ALICE'

// Ternary operator
console.log(`${age >= 18 ? 'Adult' : 'Minor'}`);
```

## Summary

- `${expression}` embeds any JavaScript expression
- Expressions can include arithmetic, function calls, ternaries
- More readable than string concatenation
- Templates can contain other template literals

## Further Reading

- [MDN: Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
