---
title: Intersection Observer for Lazy Loading
description: Custom lazy loading control using IntersectionObserver
sidebar:
  order: 3
---

# Intersection Observer for Lazy Loading

## Introduction

`IntersectionObserver` provides fine-grained control over when resources load by detecting when elements enter the viewport.

## Basic Observer Setup

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      loadResource(el);
      observer.unobserve(el); // Stop observing once loaded
    }
  });
}, {
  rootMargin: '200px',   // Start loading 200px before visible
  threshold: 0.1          // Trigger when 10% visible
});
```

## Lazy Loading Any Element

```javascript
function lazyLoad(element) {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      // Trigger loading
      element.classList.add('visible');
      element.src = element.dataset.src;
      observer.disconnect();
    }
  }, { rootMargin: '100px' });

  observer.observe(element);
}

// Usage
document.querySelectorAll('[data-lazy]').forEach(lazyLoad);
```

## Infinite Scroll

```javascript
const sentinel = document.querySelector('#scroll-sentinel');

const observer = new IntersectionObserver(async ([entry]) => {
  if (entry.isIntersecting) {
    const items = await fetchMoreItems();
    appendItems(items);
  }
}, { rootMargin: '400px' });

observer.observe(sentinel);
```

## Performance Tips

- Use `rootMargin` to start loading before the element is visible
- Call `unobserve()` or `disconnect()` after loading to stop observing
- Set appropriate `threshold` values — 0 is often best
- Avoid observing hundreds of elements simultaneously

## Summary

- `IntersectionObserver` provides custom control over lazy loading
- Use `rootMargin` to preload before visibility
- Always unobserve/disconnect after loading
- Great for infinite scroll, image loading, and ad loading

## Further Reading

- [MDN: IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)
