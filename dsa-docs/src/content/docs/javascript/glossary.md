---
title: JavaScript Glossary
description: Key JavaScript terms and definitions
sidebar:
  order: 2
---

# JavaScript Glossary

## A

- **Arrow Function**: Concise function syntax using `=>`, with lexical `this` binding.
- **AST (Abstract Syntax Tree)**: Tree representation of source code structure.
- **Async/Await**: Syntactic sugar over Promises for writing async code that looks synchronous.

## B

- **BigInt**: Numeric primitive for integers larger than 2⁵³-1.
- **Block Scope**: Variables declared with `let`/`const` are confined to `{}` blocks.
- **Bubbling**: Event propagation from target element up to the document root.

## C

- **Callback**: Function passed as an argument to be executed later.
- **Call Stack**: LIFO data structure tracking function calls.
- **Class**: ES6 syntactic sugar over prototypal inheritance.
- **Closure**: Function that retains access to its lexical scope even after the outer function returns.
- **Coercion**: Implicit type conversion by JavaScript.
- **Currying**: Transforming `f(a, b, c)` into `f(a)(b)(c)`.

## D

- **Debounce**: Rate-limiting pattern that executes after a pause.
- **Destructuring**: Extracting values from arrays/objects into variables.
- **DOM**: Document Object Model — browser's interface to HTML.
- **Dynamic Import**: `import()` for lazy-loading modules.

## E

- **Event Loop**: Mechanism enabling async concurrency in single-threaded JS.
- **Execution Context**: Environment where JavaScript code is evaluated.
- **Event Delegation**: Single parent listener handling events for multiple children.

## F

- **First-Class Functions**: Functions treated as values (assigned, passed, returned).
- **Function Expression**: Function assigned to a variable (not hoisted).

## G

- **Generator**: Function (`function*`) that can be paused and resumed with `yield`.
- **Garbage Collection**: Automatic memory reclamation (mark-and-sweep in V8).

## H

- **Hoisting**: JS behavior of moving declarations to scope top during compilation.
- **Higher-Order Function**: Function that takes or returns another function.
- **Hidden Class**: V8's internal object shape tracking for optimization.

## I

- **IIFE**: Immediately Invoked Function Expression — runs immediately after definition.
- **IndexedDB**: Client-side NoSQL database for structured data.
- **Iterable**: Object with `Symbol.iterator` method.
- **Iterator**: Object with `next()` method returning `{ value, done }`.

## J

- **JIT (Just-In-Time)**: Compilation approach combining interpretation and compilation.

## L

- **Lexical Scope**: Scope determined by code structure at author-time.
- **LocalStorage**: Persistent key-value storage (~5-10MB).

## M

- **Map**: Collection with any key types, preserves insertion order.
- **Microtask**: High-priority task (Promise callbacks) processed before the next macrotask.
- **Module**: Encapsulated file with its own scope using `import`/`export`.

## N

- **NaN**: "Not a Number" — result of invalid math operations.
- **Nullish Coalescing**: `??` — returns right side only for `null`/`undefined`.

## O

- **Optional Chaining**: `?.` — safe nested property access.
- **Prototype**: Internal reference for inheritance.

## P

- **Promise**: Object representing eventual completion/failure of async operation.
- **Pure Function**: Function with no side effects, same input → same output.

## R

- **Reflow**: Layout recalculation (expensive).
- **Repaint**: Visual update without layout changes.

## S

- **Set**: Collection of unique values.
- **Scope Chain**: Hierarchy of scopes for variable resolution.
- **Symbol**: Unique, immutable primitive for property keys.
- **SessionStorage**: Storage cleared when tab closes.

## T

- **TDZ (Temporal Dead Zone)**: Period between `let`/`const` hoisting and initialization.
- **Throttle**: Rate-limiting that executes at maximum N times per interval.
- **Tree Shaking**: Dead code elimination during bundling.

## W

- **WeakMap**: Map with weak references (keys are objects, no iteration).
- **WeakSet**: Set with weak references (objects only, no iteration).
- **Web Worker**: Background thread for parallel JavaScript execution.

## V

- **V8**: Google's open-source JavaScript engine (Chrome, Node.js).
