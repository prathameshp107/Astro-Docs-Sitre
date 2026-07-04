---
title: Basic Usage
description: Creating and using a Resize Observer
sidebar:
  order: 1
---

# Basic Usage

## Introduction

Create a Resize Observer with a callback that receives entries containing the element's new dimensions.

## Basic Setup

```javascript
const element = document.querySelector('.responsive-box');

const observer = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const { width, height } = entry.contentRect;
    console.log(`Element size: ${width} × ${height}`);

    // React to size changes
    if (width < 400) {
      element.classList.add('compact');
    } else {
      element.classList.remove('compact');
    }
  }
});

observer.observe(element);
```

## Content Rect Properties

```javascript
const { width, height, left, top, x, y } = entry.contentRect;
// width, height — element's content box dimensions
// left, top — distance from element's left/top edge to its content area
```

## Summary

- Create with `new ResizeObserver(callback)`
- Callback receives array of ResizeObserverEntry objects
- `entry.contentRect` contains new dimensions
- `observer.observe(element)` to start watching

## Further Reading

- [MDN: ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)
