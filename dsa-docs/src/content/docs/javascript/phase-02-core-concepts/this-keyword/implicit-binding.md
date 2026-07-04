---
title: Implicit Binding
description: The implicit binding rule for JavaScript's this keyword — method calls
sidebar:
  order: 2
---

# Implicit Binding

## Introduction

**Implicit binding** applies when you call a function as a **method of an object** — using the dot notation `obj.method()`. In this case, `this` refers to the **object before the dot**.

## How It Works

```javascript
const user = {
  name: 'Alice',
  greet() {
    console.log(`Hello, I'm ${this.name}`);
  }
};

user.greet(); 
// "Hello, I'm Alice"
// this = the object before the dot (user)
```

## The Key Insight

The value of `this` is determined by **how** the function is called, not **where** it's defined:

```javascript
function greet() {
  console.log(`Hello, I'm ${this.name}`);
}

const user1 = { name: 'Alice', greet };
const user2 = { name: 'Bob', greet };

user1.greet(); // "Hello, I'm Alice" — this = user1
user2.greet(); // "Hello, I'm Bob" — this = user2
```

## Nested Object Context

`this` refers to the **immediate** object before the dot, not the parent:

```javascript
const obj = {
  outer: 'outer',
  inner: {
    inner: 'inner',
    method() {
      console.log(this.inner); // 'inner' (not 'outer')
    }
  }
};

obj.inner.method(); // this = obj.inner
```

## Common Pitfall — Losing Implicit Binding

When you **extract** a method from its object, it loses its implicit binding:

```javascript
const user = {
  name: 'Alice',
  greet() {
    console.log(`Hi, ${this.name}`);
  }
};

const extracted = user.greet; // extracting the method
extracted(); // "Hi, undefined" — this = global/undefined
// Because extracted() is a standalone call → default binding!
```

## Best Practices

- Always use dot notation to preserve implicit binding
- Be careful when passing methods as callbacks
- Use `bind()` to fix extracted methods

## Summary

- Implicit binding: `obj.method()` → `this` = `obj`
- Only the **immediate** object before the dot matters
- Extracting a method loses implicit binding
- Most common and intuitive binding rule

## Further Reading

- [MDN: this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
- [Next: Explicit Binding](./explicit-binding)
