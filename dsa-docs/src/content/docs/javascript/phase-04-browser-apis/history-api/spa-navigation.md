---
title: SPA Navigation
description: Building single-page app navigation with History API
sidebar:
  order: 4
---

# SPA Navigation

## Introduction

Single-page applications use the History API to create smooth, client-side navigation without full page reloads.

## Basic SPA Navigation

```javascript
function navigate(url, state = {}) {
  history.pushState(state, '', url);
  render(url); // Update page content
}

window.addEventListener('popstate', () => {
  render(window.location.pathname);
});
```

## Full SPA Example

```javascript
const routes = {
  '/': () => import('./pages/home.js'),
  '/about': () => import('./pages/about.js'),
  '/contact': () => import('./pages/contact.js')
};

// Navigate without page reload
document.querySelectorAll('a[data-link]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const url = link.getAttribute('href');
    navigate(url);
  });
});

async function navigate(url) {
  history.pushState({ url }, '', url);
  const page = routes[url];
  if (page) {
    const module = await page();
    module.render();
  }
}

// Handle back/forward
window.addEventListener('popstate', () => {
  navigate(window.location.pathname);
});
```

## Summary

- Use `pushState` to navigate without page reload
- Update page content based on the URL
- Listen for `popstate` to handle back/forward
- Lazy-load page modules with dynamic imports for performance

## Further Reading

- [MDN: History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)
