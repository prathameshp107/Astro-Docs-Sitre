---
title: Observer Pattern
description: One-to-many notification when state changes
sidebar:
  order: 4
---

# Observer Pattern

## Introduction

The Observer pattern defines a **one-to-many** dependency where when one object (subject) changes state, all its dependents (observers) are notified automatically.

## Topics Covered

- [Implementation](./implementation) — Subject and observer pattern
- [Use Cases](./use-cases) — Real-world applications of Observer

## Implementation

```javascript
class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(fn) {
    this.observers.push(fn);
    return () => this.unsubscribe(fn);
  }

  unsubscribe(fn) {
    this.observers = this.observers.filter(f => f !== fn);
  }

  notify(data) {
    this.observers.forEach(fn => fn(data));
  }
}

// Usage
const store = new Subject();

const unsub1 = store.subscribe(data => console.log('Observer 1:', data));
store.subscribe(data => console.log('Observer 2:', data));

store.notify('New data!');
// Observer 1: New data!
// Observer 2: New data!

unsub1(); // Remove observer 1
store.notify('More data');
// Observer 2: More data
```

## Summary

- One-to-many notification system
- Loose coupling between subject and observers
- Used in event systems, state management (Redux, MobX)

## Further Reading

- [Refactoring Guru: Observer](https://refactoring.guru/design-patterns/observer)
