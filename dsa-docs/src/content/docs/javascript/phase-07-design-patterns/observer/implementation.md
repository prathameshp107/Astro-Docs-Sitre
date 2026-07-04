---
title: Observer Implementation
description: Implementing the subject-observer notification pattern
sidebar:
  order: 1
---

# Observer Implementation

## Introduction

The Observer pattern establishes a one-to-many relationship where a subject notifies all registered observers when its state changes.

## Basic Implementation

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

unsub1();
store.notify('More data');
// Observer 2: More data
```

## Type-Safe Observer

```javascript
class TypedSubject {
  constructor() {
    this.handlers = {};
  }

  on(event, handler) {
    if (!this.handlers[event]) this.handlers[event] = [];
    this.handlers[event].push(handler);
    return () => this.off(event, handler);
  }

  off(event, handler) {
    if (!this.handlers[event]) return;
    this.handlers[event] = this.handlers[event].filter(h => h !== handler);
  }

  emit(event, data) {
    if (!this.handlers[event]) return;
    this.handlers[event].forEach(handler => handler(data));
  }
}

const events = new TypedSubject();
const unsub = events.on('user:login', (user) => console.log(`${user.name} logged in`));
events.emit('user:login', { name: 'Alice' });
```

## Summary

- Subject maintains a list of observers
- Observers subscribe/unsubscribe to receive notifications
- Subject notifies all observers when state changes
- Loose coupling between subject and observers

## Further Reading

- [Refactoring Guru: Observer](https://refactoring.guru/design-patterns/observer)
