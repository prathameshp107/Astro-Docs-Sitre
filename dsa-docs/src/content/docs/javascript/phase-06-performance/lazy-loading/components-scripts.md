---
title: Components & Scripts Lazy Loading
description: Lazy loading code with React.lazy and dynamic imports
sidebar:
  order: 2
---

# Components & Scripts Lazy Loading

## Introduction

Lazy loading components and scripts defers JavaScript execution until it's needed, reducing the initial bundle size and parse time.

## React.lazy & Suspense

```jsx
import React, { Suspense } from 'react';

// Dynamic import — creates a separate chunk
const Dashboard = React.lazy(() => import('./Dashboard'));
const Settings = React.lazy(() => import('./Settings'));
const UserProfile = React.lazy(() => import('./UserProfile'));

function App() {
  return (
    <Suspense fallback={<div className="spinner">Loading...</div>}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Suspense>
  );
}
```

## Dynamic Import for Any Module

```javascript
// Load a heavy chart library only on user action
button.addEventListener('click', async () => {
  const { renderChart } = await import('./heavy-chart.js');
  renderChart(data);
});

// Load a Markdown parser when needed
async function renderMarkdown(content) {
  const { marked } = await import('marked');
  return marked.parse(content);
}
```

## Conditional Library Loading

```javascript
// Only load expensive libraries when needed
async function showMap(location) {
  if (!document.querySelector('#map-container')) return;

  const L = await import('leaflet');
  const map = L.map('map-container').setView([location.lat, location.lng], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
}
```

## Script Tag with Async/Defer

```html
<!-- defer — executes after HTML is parsed, in order -->
<script defer src="non-critical.js"></script>

<!-- async — executes as soon as it's downloaded -->
<script async src="analytics.js"></script>

<!-- Dynamic script loading -->
<script>
  function loadScript(src) {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
  }

  // Load analytics only after user interaction
  button.addEventListener('click', () => loadScript('analytics.js'));
</script>
```

## Summary

- `React.lazy()` + `Suspense` for component splitting
- Dynamic `import()` for on-demand module loading
- Load heavy libraries (charts, maps, markdown) only when needed
- Use `async`/`defer` on script tags

## Further Reading

- [React: Code Splitting](https://react.dev/reference/react/lazy)
