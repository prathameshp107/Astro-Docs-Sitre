---
title: Pub-Sub Pattern
description: Decoupled event-based communication
sidebar:
  order: 9
---

# Pub-Sub (Publish/Subscribe) Pattern

## Introduction

Pub-Sub is a messaging pattern where **publishers** send messages through **channels/events** without knowing who the **subscribers** are.

## Implementation

```javascript
class EventBus {
  constructor() {
    this.events = {};
  }

  subscribe(event, callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
    return () => this.unsubscribe(event, callback);
  }

  unsubscribe(event, callback) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(cb => cb !== callback);
  }

  publish(event, data) {
    if (!this.events[event]) return;
    this.events[event].forEach(cb => cb(data));
  }
}

// Usage
const bus = new EventBus();

const unsub = bus.subscribe('user:created', (user) => {
  console.log('Welcome email sent to:', user.email);
});

bus.subscribe('user:created', (user) => {
  console.log('Log: new user created:', user.name);
});

bus.publish('user:created', { name: 'Alice', email: 'alice@email.com' });
// Welcome email sent to: alice@email.com
// Log: new user created: Alice
```

## Summary

- Fully decoupled communication
- Similar to Observer but via an event channel
- Great for cross-component communication in SPAs

## Further Reading

- [MDN: Custom Events](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent)
