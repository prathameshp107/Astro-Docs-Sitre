---
title: Infinite Scroll
description: Loading more content when scrolling reaches the bottom
sidebar:
  order: 3
---

# Infinite Scroll

## Introduction

Use Intersection Observer to detect when a sentinel element at the bottom becomes visible, then load more content.

## Basic Setup

```javascript
const sentinel = document.querySelector('#scroll-sentinel');

const scrollObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    loadMoreItems();
  }
}, { threshold: 0 });

scrollObserver.observe(sentinel);
```

## Complete Example

```javascript
let page = 1;
const sentinel = document.querySelector('#scroll-sentinel');

const scrollObserver = new IntersectionObserver(async (entries) => {
  if (entries[0].isIntersecting) {
    // Show loading indicator
    sentinel.textContent = 'Loading...';

    // Load more data
    const items = await fetchMoreItems(page++);
    renderItems(items);

    // Hide loading indicator
    sentinel.textContent = '';

    if (items.length === 0) {
      scrollObserver.unobserve(sentinel); // No more items
      sentinel.textContent = 'End of content';
    }
  }
}, { threshold: 0 });

scrollObserver.observe(sentinel);
```

## Summary

- Place a sentinel element at the bottom of the list
- Observe the sentinel with Intersection Observer
- Load more items when sentinel becomes visible
- Unobserve when there are no more items
- More efficient than scroll event listeners

## Further Reading

- [MDN: Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
