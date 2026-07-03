---
title: Use Cases
description: When to use debounce vs throttle
sidebar:
  order: 4
---

# Use Cases

## Introduction

Choose debounce or throttle based on the behavior you need.

## Common Use Cases

```javascript
// Debounce: Search, form validation, resize
const search = debounce(fetchResults, 300);
input.addEventListener('input', search);

const validate = debounce(validateField, 500);
input.addEventListener('input', validate);

const resize = debounce(recalculateLayout, 200);
window.addEventListener('resize', resize);

// Throttle: Scrolling, mouse movement, game inputs
const scroll = throttle(updateProgressBar, 50);
window.addEventListener('scroll', scroll);

const mouseMove = throttle(trackMousePosition, 16); // ~60fps
document.addEventListener('mousemove', mouseMove);
```

## Decision Guide

| Scenario | Use | Why |
|----------|-----|-----|
| Search autocomplete | Debounce | Wait until user stops typing |
| Form validation | Debounce | Validate after user finishes |
| Window resize | Debounce | Recalculate after resize ends |
| Scroll position | Throttle | Update at regular intervals |
| Mouse tracking | Throttle | Sample at consistent rate |
| Game input | Throttle | Cap actions per second |
| Save button | Leading debounce | Save immediately, prevent double-save |

## Summary

- Debounce: "Wait until they stop, then act"
- Throttle: "Act at most this often"
- Leading debounce: "Act now, then wait"
- Choose based on whether you need the final result or regular updates

## Further Reading

- [web.dev: Debounce patterns](https://web.dev/articles/debounce)
