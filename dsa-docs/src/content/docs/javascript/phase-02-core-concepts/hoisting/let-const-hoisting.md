---
title: let/const Hoisting
description: How let and const declarations are hoisted with the Temporal Dead Zone
sidebar:
  order: 3
---

# let/const Hoisting

## Introduction

`let` and `const` are **hoisted** (they do exist in memory during the creation phase), but they are **NOT initialized** until the actual declaration is reached. This period between scope entry and declaration is called the **Temporal Dead Zone (TDZ)**.

## The Key Insight

```javascript
// ❌ ReferenceError: Cannot access before initialization
console.log(myLet); 
let myLet = 10;

// myLet IS hoisted — it exists in memory
// BUT it's in the TDZ — accessing it throws an error
// This is different from var (which returns undefined)
```

## Block Scope

`let` and `const` are **block-scoped** — they only exist within the nearest `{}`:

```javascript
if (true) {
  let x = 10;
  const y = 20;
  console.log(x); // 10
  console.log(y); // 20
}
console.log(x); // ReferenceError
console.log(y); // ReferenceError
```

## TDZ in Practice

```javascript
// TDZ exists from scope start to declaration
{
  // TDZ starts here for x
  // console.log(x); — would throw ReferenceError
  let x = 10; // TDZ ends here
  console.log(x); // ✅ 10 — after TDZ
}

// typeof is also affected
{
  // console.log(typeof x); // ReferenceError!
  let x = 10;
}
```

## const Must Be Initialized

```javascript
let a; // ✅ OK — undefined
a = 10;

const b; // ❌ SyntaxError: Missing initializer
const c = 10; // ✅ OK
```

## Summary

| Aspect | let | const |
|--------|-----|-------|
| Hoisted | ✅ Yes | ✅ Yes |
| Initialized | ❌ No (TDZ) | ❌ No (TDZ) |
| Scope | Block | Block |
| Reassignment | ✅ | ❌ |
| Must initialize | ❌ | ✅ |

## Further Reading

- [MDN: let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)
- [MDN: const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
- [Previous: var Hoisting](./var-hoisting)
- [Next: Temporal Dead Zone](./temporal-dead-zone)
