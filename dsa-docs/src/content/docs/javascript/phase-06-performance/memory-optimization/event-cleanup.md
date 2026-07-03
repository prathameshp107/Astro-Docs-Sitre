---
title: Event Cleanup
description: Preventing listener leaks with proper teardown
sidebar:
  order: 3
---

# Event Cleanup

## Introduction

Event listeners that aren't properly removed are a common source of memory leaks. They keep references to DOM elements and prevent garbage collection.

## Proper Cleanup

```javascript
class Component {
  mount() {
    this.handler = () => { /* ... */ };
    window.addEventListener('resize', this.handler);
  }

  unmount() {
    window.removeEventListener('resize', this.handler); // ✅
  }
}
```

## Using AbortController

Modern browsers support `AbortController` to clean up multiple listeners:

```javascript
class CleanComponent {
  constructor() {
    this.controller = new AbortController();
    this.signal = this.controller.signal;
  }

  mount() {
    window.addEventListener('resize', this.onResize, { signal: this.signal });
    document.addEventListener('click', this.onClick, { signal: this.signal });
    document.addEventListener('keydown', this.onKeydown, { signal: this.signal });

    // All three listeners are cleaned up with one call
  }

  unmount() {
    this.controller.abort(); // Removes all listeners at once! 🎯
  }
}
```

## WeakRef for Optional Cleanup

```javascript
const listenerMap = new WeakMap();

function addManagedListener(target, event, handler) {
  target.addEventListener(event, handler);

  // Track for cleanup (uses weak reference — won't prevent GC)
  if (!listenerMap.has(target)) {
    listenerMap.set(target, []);
  }
  listenerMap.get(target).push({ event, handler });
}

function cleanupTarget(target) {
  const listeners = listenerMap.get(target);
  if (listeners) {
    listeners.forEach(({ event, handler }) => {
      target.removeEventListener(event, handler);
    });
    listenerMap.delete(target);
  }
}
```

## Summary

- Always remove event listeners when components unmount
- Use `AbortController` for bulk cleanup
- Store handler references to enable removal
- Unremoved listeners prevent DOM node GC

## Further Reading

- [MDN: AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
