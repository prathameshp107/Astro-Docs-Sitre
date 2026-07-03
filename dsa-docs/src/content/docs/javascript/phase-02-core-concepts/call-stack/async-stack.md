---
title: Async Stack
description: How async operations interact with the call stack and event loop
sidebar:
  order: 3
---

# Async Stack

## Introduction

When async operations (setTimeout, fetch, Promises) are involved, the call stack works differently. The stack unwinds before async callbacks are executed.

## Sync vs Async

```javascript
// Synchronous — direct stack
console.log('Start');
function sync() { console.log('Sync'); }
sync();
console.log('End');
// Stack: Global → sync → Global
// Output: Start, Sync, End

// Asynchronous — indirect
console.log('Start');
setTimeout(() => console.log('Timeout'), 0);
console.log('End');
// Stack: Global (queue callback) → Global → (empty) → callback
// Output: Start, End, Timeout
```

## The Stack with Promises

```javascript
console.log('1'); // stack: [global]

Promise.resolve().then(() => {
  console.log('2'); // microtask: runs after stack clears
});

console.log('3'); // stack: [global]
// Output: 1, 3, 2
```

## Async/Await and the Stack

```javascript
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end'); // continues as microtask
}

async function async2() {
  console.log('async2');
}

console.log('script start');
async1();
console.log('script end');

// Output:
// script start
// async1 start
// async2
// script end
// async1 end
```

## Stack Trace in Async Code

```javascript
async function a() {
  await b();
}

async function b() {
  await c();
}

async function c() {
  throw new Error('Error!'); // May show limited stack trace
}

a().catch(e => console.log(e.stack));
// In older engines: stack trace may only show c!
// Modern V8: "async stack traces" show full chain
```

## Summary

- Async callbacks run after the current stack clears
- Promises use microtasks (higher priority than setTimeout)
- `await` pauses the async function (continues as microtask)
- Modern engines preserve async stack traces
- The call stack must be empty before async callbacks run

## Further Reading

- [MDN: Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop)
- [Previous: Stack Overflow](./stack-overflow)
