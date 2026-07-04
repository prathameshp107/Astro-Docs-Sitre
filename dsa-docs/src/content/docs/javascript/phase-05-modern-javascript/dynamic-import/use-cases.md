---
title: Dynamic Import Use Cases
description: Practical scenarios for using dynamic imports
sidebar:
  order: 2
---

# Dynamic Import Use Cases

## Introduction

Dynamic imports shine in scenarios where code doesn't need to load upfront. Here are the most common and effective use cases.

## Route-Based Splitting

Load page components only when the user navigates to them:

```javascript
// SPA Router
const routes = {
  '/': () => import('./pages/Home.js'),
  '/dashboard': () => import('./pages/Dashboard.js'),
  '/settings': () => import('./pages/Settings.js'),
};

async function navigate(path) {
  const module = await routes[path]();
  module.render();
}
```

## Conditional Loading

Load heavy libraries only when a feature is triggered:

```javascript
async function showChart(data) {
  // Chart library is large — only load when user opens chart
  const { Chart } = await import('chart.js');
  new Chart(ctx, { data });
}

async function handlePDFExport() {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF();
  doc.save('report.pdf');
}
```

## Loading Polyfills on Demand

Serve polyfills only to browsers that need them:

```javascript
if (!('IntersectionObserver' in window)) {
  const module = await import('intersection-observer');
  module.polyfill();
}

if (typeof ResizeObserver === 'undefined') {
  await import('@juggle/resize-observer');
}
```

## Internationalization (i18n)

Load locale data lazily:

```javascript
async function loadLocale(lang) {
  const messages = await import(`./locales/${lang}.js`);
  i18n.setMessages(messages);
}

// Only loads 'en' by default; user can switch to others
loadLocale('en');
```

## Dynamic Theme Loading

```javascript
async function setTheme(theme) {
  if (theme === 'dark') {
    await import('./themes/dark.css');
  } else {
    await import('./themes/light.css');
  }
}
```

## Summary

- Route-based: load page components per route
- Conditional: load heavy libs only when triggered
- Polyfills: serve only to browsers that need them
- i18n: load locale data on demand
- Themes: switch styles without initial CSS burden

## Further Reading

- [web.dev: Code Splitting](https://web.dev/articles/reduce-javascript-payloads-with-code-splitting)
