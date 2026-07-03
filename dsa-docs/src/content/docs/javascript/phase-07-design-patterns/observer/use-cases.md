---
title: Observer Use Cases
description: Real-world applications of the Observer pattern
sidebar:
  order: 2
---

# Observer Use Cases

## Introduction

The Observer pattern is used everywhere in JavaScript — from DOM events to state management libraries.

## DOM Events

The browser's event system is an Observer implementation:

```javascript
// Native Observer pattern
element.addEventListener('click', handler);
// This is the Observer pattern in action!
```

## State Management (Redux)

```javascript
const createStore = (reducer) => {
  let state = reducer(undefined, { type: '__INIT__' });
  const listeners = [];

  return {
    getState() { return state; },
    dispatch(action) {
      state = reducer(state, action);
      listeners.forEach(fn => fn());
    },
    subscribe(fn) {
      listeners.push(fn);
      return () => {
        const index = listeners.indexOf(fn);
        listeners.splice(index, 1);
      };
    }
  };
};
```

## Summary

- DOM event listeners
- State management (Redux, MobX, Zustand)
- Custom event systems in applications
- Real-time updates (WebSocket messages)

## Further Reading

- [Refactoring Guru: Observer Use Cases](https://refactoring.guru/design-patterns/observer)
