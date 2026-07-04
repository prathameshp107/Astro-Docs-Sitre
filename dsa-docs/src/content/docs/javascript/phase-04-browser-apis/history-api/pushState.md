---
title: pushState & replaceState
description: Modifying the browser history stack
sidebar:
  order: 2
---

# pushState & replaceState

## Introduction

`pushState` adds a new entry to the history stack, while `replaceState` modifies the current entry without adding a new one.

## pushState

```javascript
// Add new history entry
history.pushState({ page: 1 }, 'Page 1', '/page1');

// Arguments:
// { page: 1 } — state object (can be retrieved later)
// 'Page 1'    — title (mostly ignored by browsers)
// '/page1'    — URL to display in address bar (must be same origin)
```

## replaceState

```javascript
// Replace current history entry (doesn't add to stack)
history.replaceState({ page: 2 }, 'Page 2', '/page2');
```

## Key Notes

- `pushState` does NOT fire `popstate` event
- `pushState` does NOT actually load the new URL
- The URL must be same-origin (can't push cross-origin URLs)
- State objects can be retrieved via the `popstate` event

## Summary

- `pushState()` — adds a new history entry
- `replaceState()` — modifies the current entry
- Both accept state, title, and URL
- Neither actually loads the new page (ideal for SPAs)

## Further Reading

- [MDN: History.pushState](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState)
