---
title: Basic Usage
description: Creating and using an Intersection Observer
sidebar:
  order: 1
---

# Basic Usage

## Introduction

Create an Intersection Observer with a callback and options, then observe target elements.

## Basic Setup

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('Element is visible:', entry.target);
      observer.unobserve(entry.target); // Stop observing
    }
  });
}, {
  root: null,        // Viewport (or element reference)
  threshold: 0.1,    // 10% visible before triggering
  rootMargin: '0px'  // Expand/shrink the root area
});

// Start observing
const target = document.querySelector('.lazy-image');
observer.observe(target);
```

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `root` | `null` (viewport) | Container element to check intersection against |
| `threshold` | `0` | Percentage visible (0-1) to trigger |
| `rootMargin` | `'0px'` | Expand/shrink the root bounding box |

## Observer Methods

```javascript
observer.observe(element);     // Start watching an element
observer.unobserve(element);   // Stop watching an element
observer.disconnect();         // Stop watching all elements
```

## Summary

- Create with `new IntersectionObserver(callback, options)`
- Callback receives array of IntersectionObserverEntry objects
- `entry.isIntersecting` tells if element is visible
- `observer.unobserve()` stops watching a specific element

## Further Reading

- [MDN: Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
