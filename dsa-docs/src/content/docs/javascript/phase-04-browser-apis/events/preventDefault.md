---
title: preventDefault
description: Canceling default browser behavior
sidebar:
  order: 4
---

# preventDefault

## Introduction

`preventDefault()` cancels the browser's default action for an event — like following a link or submitting a form.

## Common Use Cases

```javascript
// Prevent link navigation
document.querySelector('a').addEventListener('click', (e) => {
  e.preventDefault();
  console.log('Link clicked but navigation prevented');
});

// Prevent form submission (handle with JS instead)
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Don't reload the page
  // Handle form with JavaScript
});
```

## When to Use

| Scenario | Default Action | preventDefault |
|----------|---------------|----------------|
| Link click | Navigate to href | Handle navigation via JS (SPA) |
| Form submit | Reload page | Submit via fetch/async |
| Right-click | Context menu | Custom context menu |
| Key press | Character input | Custom input handling |

## Note on Passive Listeners

```javascript
// Warning: preventDefault has no effect on passive listeners
element.addEventListener('touchstart', handler, { passive: false });
// Set passive: false to allow preventDefault on touch/wheel events
```

## Summary

- `preventDefault()` cancels the browser's default behavior
- Does NOT stop event propagation (use `stopPropagation()` for that)
- Works on links, forms, right-clicks, and key events
- Set `{ passive: false }` for touch/wheel events

## Further Reading

- [MDN: Event.preventDefault](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
