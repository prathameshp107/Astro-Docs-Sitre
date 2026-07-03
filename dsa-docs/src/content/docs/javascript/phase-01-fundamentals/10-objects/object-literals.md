---
title: Object Literals
description: Creating objects using object literal syntax in JavaScript
sidebar:
  order: 1
---

# Object Literals

## Introduction

Object literals use `{}` syntax to create objects with their properties inline. They are the most common way to create objects in JavaScript.

## Syntax

```javascript
const person = {
  name: 'Alice',
  age: 25,
  greet() {
    return `Hello, I'm ${this.name}`;
  }
};
```

## Shorthand Properties

```javascript
const name = 'Alice';
const age = 25;

const person = { name, age };
// Equivalent to: { name: name, age: age }
```

## Computed Property Names

```javascript
const key = 'dynamicField';
const obj = {
  [key]: 'value',
  ['computed_' + key]: 42
};
// { dynamicField: 'value', computed_dynamicField: 42 }
```

## Summary

- Object literals are `{}` with property:value pairs
- Use shorthand when variable name matches property name
- Use `[expression]` for dynamic property names

## Further Reading

- [MDN: Object Initializer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer)
