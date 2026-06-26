---
title: "The `this` Keyword"
description: "Call-site rule, implicit vs explicit binding, arrow functions, call/apply/bind, and common pitfalls."
sidebar:
  order: 18
---

## The `this` Keyword

`this` refers to the **execution context** of a function. Its value depends on **how the function is called**, not where it's defined (except arrow functions).

### The 4 Binding Rules

```javascript
// 1. Default binding — global (or undefined in strict mode)
function showThis() {
  console.log(this);
}
showThis(); // Window (browser) or global (Node)

// 2. Implicit binding — object before the dot
const user = {
  name: "Alice",
  greet() { console.log(this.name); }
};
user.greet(); // "Alice"

// 3. Explicit binding — call, apply, bind
function introduce() {
  console.log(`Hi, I'm ${this.name}`);
}
introduce.call({ name: "Bob" });  // "Hi, I'm Bob"
introduce.apply({ name: "Carol" }); // "Hi, I'm Carol"

// 4. new binding
function Person(name) {
  this.name = name;
}
const p = new Person("Dave");
p.name; // "Dave"
```

### Arrow Functions

Arrow functions **do not have their own `this`**. They inherit `this` from the enclosing lexical scope.

```javascript
const obj = {
  name: "Alice",
  regular: function() {
    console.log(this.name); // "Alice" (obj is the context)
  },
  arrow: () => {
    console.log(this.name); // undefined (inherits global)
  }
};

// Practical use: preserving this in callbacks
class Timer {
  constructor() {
    this.seconds = 0;
    // Arrow captures this from constructor scope
    setInterval(() => {
      this.seconds++; // ✅ works
    }, 1000);
  }
}
```

### `call`, `apply`, `bind`

```javascript
function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const user = { name: "Alice" };

// call — invokes immediately, args comma-separated
greet.call(user, "Hello", "!");   // "Hello, Alice!"

// apply — invokes immediately, args as array
greet.apply(user, ["Hello", "!"]); // "Hello, Alice!"

// bind — returns new function, does NOT invoke
const bound = greet.bind(user, "Hello");
bound("!"); // "Hello, Alice!"
```

### Common Pitfall: Losing `this`

```javascript
const user = {
  name: "Alice",
  greet() { console.log(this.name); }
};

const fn = user.greet;
fn(); // undefined — implicit binding is lost!

// Fix: bind
const boundFn = user.greet.bind(user);
boundFn(); // "Alice"
```

> For a comprehensive deep-dive into `this` with all edge cases, see the [Namaste JavaScript `this` keyword notes](/DSA-Notes-Problems/namaste-js/season-2/this-keyword-in-javascript).

### Key Takeaways

- `this` is determined by **how** a function is called, not where it's written
- Arrow functions inherit `this` from their surrounding scope
- `call` and `apply` invoke immediately; `bind` returns a new function
- Priority: `new` > explicit (call/apply/bind) > implicit (obj.method) > default (global)
- Be careful when passing methods as callbacks — binding is often needed
- Use arrow functions for callbacks to avoid `this` confusion
