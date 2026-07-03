---
title: Lazy Loading
description: Deferring non-critical resources with lazy loading
sidebar:
  order: 4
---

# Lazy Loading

## Introduction

**Lazy loading** defers loading of resources (images, scripts, components) until they're actually needed — typically when they become visible or when user interaction requires them.

## Topics Covered

- [Images & Media](./images-media) — Native lazy loading and IntersectionObserver for images
- [Components & Scripts](./components-scripts) — Lazy loading code with React.lazy and dynamic imports
- [Intersection Observer](./intersection-observer-usage) — Custom lazy loading control

## Why Do We Need This?

Lazy loading reduces initial page load time, saves bandwidth, and improves performance for users who may never interact with certain content.

## Image Lazy Loading

```html
<!-- Native lazy loading (modern browsers) -->
<img src="image.jpg" loading="lazy" alt="Lazy loaded image">

<!-- Intersection Observer for custom control -->
<img data-src="image.jpg" alt="Lazy loaded" class="lazy">
```

```javascript
// Intersection Observer for images
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.add('loaded');
      imageObserver.unobserve(img);
    }
  });
}, { rootMargin: '200px' });

document.querySelectorAll('img[data-src]').forEach(img => {
  imageObserver.observe(img);
});
```

## Component Lazy Loading

```javascript
// React: React.lazy + Suspense
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

<Suspense fallback={<Spinner />}>
  <HeavyComponent />
</Suspense>;

// Dynamic import for any module
button.addEventListener('click', async () => {
  const { renderChart } = await import('./heavy-chart.js');
  renderChart();
});
```

## Summary

- Defer non-critical resources until needed
- Native `loading="lazy"` for images
- Intersection Observer for custom control
- `React.lazy()` / dynamic `import()` for code splitting
- Reduces initial bundle size and improves load time

## Further Reading

- [MDN: Lazy Loading](https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading)
- [Web.dev: Lazy Loading Images](https://web.dev/articles/lazy-loading-images)
