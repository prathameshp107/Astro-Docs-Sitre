---
title: PopState Event
description: Responding to back/forward navigation
sidebar:
  order: 3
---

# PopState Event

## Introduction

The `popstate` event fires when the user navigates backward or forward using the browser's back/forward buttons.

## Basic Usage

```javascript
// Listen for back/forward navigation
window.addEventListener('popstate', (event) => {
  if (event.state) {
    console.log('Navigated to:', event.state);
    updateContent(event.state);
  }
});
```

## Important Note

```javascript
// pushState does NOT fire popstate
history.pushState({ page: 1 }, '', '/page1');
// No popstate event fired

// Only browser back/forward triggers popstate
// Going back: popstate fires with { page: 1 }
```

## State Object

```javascript
// The state object passed to pushState/replaceState is available in popstate
window.addEventListener('popstate', (e) => {
  const state = e.state; // null if no state was set
  if (state) {
    console.log('Page:', state.page);
  }
});
```

## Summary

- `popstate` fires on browser back/forward navigation
- Does NOT fire on `pushState()` or `replaceState()`
- Event contains the state object from the history entry
- Essential for handling SPA navigation

## Further Reading

- [MDN: Window.popstate event](https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event)
