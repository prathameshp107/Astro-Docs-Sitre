---
title: Lazy Loading
description: Loading images when they become visible
sidebar:
  order: 2
---

# Lazy Loading

## Introduction

Use Intersection Observer to defer loading images until they're about to enter the viewport, saving bandwidth and improving initial page load.

## Image Lazy Loading

```javascript
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;    // Set real image URL
      img.removeAttribute('data-src');
      imageObserver.unobserve(img);
    }
  });
}, { rootMargin: '200px' }); // Start loading 200px before visible

document.querySelectorAll('img[data-src]').forEach(img => {
  imageObserver.observe(img);
});
```

## HTML Setup

```html
<!-- Use data-src instead of src to prevent loading -->
<img data-src="real-image.jpg" alt="Lazy loaded image" class="lazy">

<!-- Or use native lazy loading for modern browsers -->
<img src="real-image.jpg" loading="lazy" alt="Native lazy loading">
```

## Summary

- Use `data-src` attribute for real image URL
- Swap `data-src` to `src` when element is near viewport
- Use `rootMargin: '200px'` to load images before they're visible
- Unobserve after loading to prevent re-triggering

## Further Reading

- [MDN: Lazy loading](https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading)
