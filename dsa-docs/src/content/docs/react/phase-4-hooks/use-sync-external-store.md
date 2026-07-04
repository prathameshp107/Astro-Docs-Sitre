---
title: "useSyncExternalStore"
description: "Master useSyncExternalStore: React's hook for subscribing to external stores with built-in tearing prevention for concurrent rendering."
sidebar:
  order: 14
---

# useSyncExternalStore — The External Store Hook

## Introduction

`useSyncExternalStore` is React's hook for reading from and subscribing to **external data sources** (Redux, Zustand, browser APIs, global state). It prevents "tearing" issues during concurrent rendering.

## Why do we need this?

External stores (like browser `navigator.onLine` or third-party state) can change outside of React. In concurrent rendering, different renders could see different store values — called "tearing."

### Problem Statement

A component reads `navigator.onLine`. During concurrent rendering, one render sees `true`, another sees `false`. The UI becomes inconsistent. `useSyncExternalStore` forces all renders to see the same value.

## Syntax

```javascript
const state = useSyncExternalStore(
  subscribe,    // (callback) => unsubscribe function
  getSnapshot,  // () => current value (client)
  getServerSnapshot? // () => value for SSR
);
```

## Basic Example

```jsx
import { useSyncExternalStore } from 'react';

function subscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

function getSnapshot() {
  return navigator.onLine;
}

export default function OnlineStatus() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot);
  return <p>Status: {isOnline ? 'Online' : 'Offline'}</p>;
}
```

## Advanced Example

External store integration:

```jsx
const store = {
  state: { count: 0 },
  listeners: new Set(),
  getState() { return this.state; },
  setState(fn) { this.state = fn(this.state); this.listeners.forEach(l => l()); },
  subscribe(listener) { this.listeners.add(listener); return () => this.listeners.delete(listener); }
};

function Counter() {
  const state = useSyncExternalStore(
    (cb) => store.subscribe(cb),
    () => store.getState()
  );
  return <p>{state.count}</p>;
}
```

## Best Practices

💡 `useSyncExternalStore` replaced `useMutableSource` (deprecated).

🚀 Use for browser APIs, third-party stores, and any non-React state sources.

## MCQ

1. **What does useSyncExternalStore prevent?** A) Memory leaks  B) Tearing in concurrent rendering  C) Infinite loops  D) Batching → *B*
2. **What does subscribe return?** A) State  B) Unsubscribe function  C) A ref  D) Promise → *B*
3. **What does getSnapshot do?** A) Updates state  B) Returns current value  C) Subscribes  D) Cleans up → *B*

## Summary

📖 Subscribe to external stores with concurrent-safe tearing prevention.

## Related Topics

[useEffect](use-effect) | [useRef](use-ref)

## Further Reading

[React Docs: useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore)
