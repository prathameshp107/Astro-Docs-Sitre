---
title: Performance Observer
description: Monitoring long tasks and other metrics with PerformanceObserver
sidebar:
  order: 3
---

# Performance Observer

## Introduction

`PerformanceObserver` lets you listen for performance events as they happen — including long tasks, layout shifts, and other metrics.

## Monitoring Long Tasks

Long tasks are tasks that block the main thread for 50ms or more:

```javascript
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.warn(`Long task detected: ${entry.duration.toFixed(2)}ms`);
    console.warn(`Attribution:`, entry.attribution);
  });
});

observer.observe({ entryTypes: ['longtask'] });
```

## Measuring Largest Contentful Paint (LCP)

```javascript
const lcpObserver = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  const lastEntry = entries[entries.length - 1];
  console.log(`LCP: ${lastEntry.startTime.toFixed(2)}ms`);
});

lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
```

## First Input Delay (FID)

```javascript
const fidObserver = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.log(`FID: ${entry.duration.toFixed(2)}ms`);
    console.log(`Input type: ${entry.name}`);
  });
});

fidObserver.observe({ entryTypes: ['first-input'] });
```

## Resource Timing

```javascript
const resourceObserver = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    if (entry.duration > 500) {
      console.warn(`Slow resource: ${entry.name} (${entry.duration.toFixed(2)}ms)`);
    }
  });
});

resourceObserver.observe({ entryTypes: ['resource'] });
```

## Available Entry Types

| Type | Description |
|------|-------------|
| `longtask` | Tasks blocking main thread > 50ms |
| `largest-contentful-paint` | LCP timing |
| `first-input` | FID timing |
| `resource` | Network resource timing |
| `navigation` | Page navigation timing |
| `paint` | First Paint / First Contentful Paint |
| `layout-shift` | Cumulative Layout Shift (CLS) |

## Summary

- `PerformanceObserver` listens for performance events in real-time
- Monitor Long Tasks (>50ms), LCP, FID, CLS, and resource timing
- Essential for measuring Core Web Vitals
- Disconnect observer when no longer needed

## Further Reading

- [MDN: PerformanceObserver](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver)
- [Web.dev: Performance Observer](https://web.dev/articles/performance-observer)
