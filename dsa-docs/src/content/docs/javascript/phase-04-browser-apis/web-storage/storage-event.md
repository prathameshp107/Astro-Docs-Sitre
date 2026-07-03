---
title: Storage Event
description: Syncing storage changes across browser tabs
sidebar:
  order: 3
---

# Storage Event

## Introduction

The `storage` event fires when `localStorage` is modified in **another tab** of the same origin. It doesn't fire in the tab that made the change.

## Listening for Changes

```javascript
// Listen for storage changes from OTHER tabs
window.addEventListener('storage', (e) => {
  console.log(`Key "${e.key}" changed from "${e.oldValue}" to "${e.newValue}"`);

  if (e.key === 'theme') {
    applyTheme(e.newValue);
  }
});
// Note: Fires only in other tabs, not the one making the change
```

## Event Properties

| Property | Description |
|----------|-------------|
| `key` | The key that was changed (null if cleared) |
| `oldValue` | The previous value (null if new) |
| `newValue` | The new value (null if removed) |
| `url` | The URL of the page that made the change |
| `storageArea` | The storage object that was affected |

## Use Case: Theme Sync

```javascript
// Tab 1: User changes theme
localStorage.setItem('theme', 'dark');

// Tab 2: Automatically receives the update
window.addEventListener('storage', (e) => {
  if (e.key === 'theme') {
    document.documentElement.setAttribute('data-theme', e.newValue);
  }
});
```

## Summary

- Fires when localStorage changes in another tab
- Does NOT fire in the tab that made the change
- Perfect for syncing preferences across tabs
- Event contains key, oldValue, newValue, url, storageArea

## Further Reading

- [MDN: StorageEvent](https://developer.mozilla.org/en-US/docs/Web/API/StorageEvent)
