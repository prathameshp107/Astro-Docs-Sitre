---
title: "I — Interface Segregation"
description: "No client should be forced to depend on methods it does not use. Real-world examples with JavaScript."
sidebar:
  order: 4
---

## I — Interface Segregation Principle

> **No client should be forced to depend on methods it does not use.**

Instead of one big interface, create **small, focused interfaces**.

### Real-World Analogy

> A restaurant menu shouldn't force you to buy a full meal deal if you just want a drink. You should be able to order **only what you need**.

---

## ❌ Bad Example

```js
class Worker {
  work() { /* ... */ }
  eat() { /* ... */ }
  sleep() { /* ... */ }
}

class Human extends Worker {
  work() { return 'Working...'; }
  eat() { return 'Eating...'; }
  sleep() { return 'Sleeping...'; }
}

class Robot extends Worker {
  work() { return 'Working...'; }
  eat() { throw new Error("Robots don't eat!"); }
  sleep() { throw new Error("Robots don't sleep!"); }
}
```

**Why it hurts:** `Robot` is forced to implement `eat()` and `sleep()` — methods it doesn't need.

---

## ✅ Fixed Example

```js
class Workable {
  work() { /* ... */ }
}

class Eatable {
  eat() { /* ... */ }
}

class Sleepable {
  sleep() { /* ... */ }
}

class Human extends Workable {
  work() { return 'Working...'; }
}

// Mix in other behaviors as needed
Object.assign(Human.prototype, new Eatable(), new Sleepable());

class Robot extends Workable {
  work() { return 'Working...'; }
}
// Robot only gets what it needs
```

Or using composition in JavaScript:

```js
const workable = { work: () => 'Working...' };
const eatable = { eat: () => 'Eating...' };
const sleepable = { sleep: () => 'Sleeping...' };

const human = { ...workable, ...eatable, ...sleepable };
const robot = { ...workable }; // Only what it needs
```

---

## Signs of Violation

- A class has empty method stubs ("just to satisfy the interface")
- Methods throw `new Error("Not implemented")`
- You frequently check "what type" before calling a method
- Your interface name is very generic (e.g., `Handler`, `Manager`)

---

## In Simple Words

- **Don't force** a class to implement methods it doesn't need
- Prefer **many small, specific interfaces** over one big generic one
- Makes code easier to understand and change
- Think: "Does every implementer need ALL these methods?"
