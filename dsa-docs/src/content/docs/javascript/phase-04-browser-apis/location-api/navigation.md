---
title: Navigation
description: Navigating to new pages with the Location API
sidebar:
  order: 2
---

# Navigation

## Introduction

The `location` object provides methods for navigating to new URLs and reloading the page.

## Navigation Methods

```javascript
// Navigate to a new page (adds to history)
location.href = '/new-page';         // Same as setting location.href
location.assign('/new-page');        // Equivalent to setting href

// Navigate without adding to history
location.replace('/new-page');       // Replaces current history entry

// Reload
location.reload();                   // Reload from cache
location.reload(true);               // Force reload from server (deprecated)
```

## assign vs replace

```javascript
// assign — user can go back to current page
location.assign('/page1');

// replace — current page is removed from history
// User CANNOT go back
location.replace('/page2');
```

## Summary

- `location.href = url` / `location.assign(url)` — navigate (adds to history)
- `location.replace(url)` — navigate (replaces history entry)
- `location.reload()` — reload current page
- `assign` vs `replace`: replace doesn't create a back button entry

## Further Reading

- [MDN: Location](https://developer.mozilla.org/en-US/docs/Web/API/Location)
