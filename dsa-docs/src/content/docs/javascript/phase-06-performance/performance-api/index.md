---
title: Performance API
description: Measuring JavaScript performance with the Performance API
sidebar:
  order: 2
---

# Performance API

## Introduction

The **Performance API** provides tools to measure the performance of your JavaScript code with high-resolution timestamps.

## Topics Covered

- [performance.now()](./now-timing) — High-resolution timing with sub-millisecond precision
- [Marks & Measures](./marks-measures) — Using performance.mark() and performance.measure()
- [Performance Observer](./performance-observer) — Monitoring long tasks and other metrics

## performance.now()

```javascript
const start = performance.now();

// Code to measure
for (let i = 0; i < 1000000; i++) {
  Math.sqrt(i);
}

const end = performance.now();
console.log(`Took ${end - start}ms`);
```

## Performance Marks & Measures

```javascript
// Mark specific points in time
performance.mark('start');
// ... do work ...
performance.mark('end');

// Measure between marks
performance.measure('myOperation', 'start', 'end');

// Get the measurement
const measures = performance.getEntriesByType('measure');
console.log(measures[0].duration);

// Clean up
performance.clearMarks();
performance.clearMeasures();
```

## User Timing

```javascript
performance.mark('fetch-start');

await fetch('/api/data');

performance.mark('fetch-end');
performance.measure('data-fetch', 'fetch-start', 'fetch-end');

const measure = performance.getEntriesByName('data-fetch')[0];
console.log(`Fetch took ${measure.duration}ms`);
```

## Performance Observer

```javascript
// Monitor long tasks (tasks > 50ms)
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.log(`Long task detected: ${entry.duration}ms`);
  });
});

observer.observe({ entryTypes: ['longtask'] });
```

## Summary

- `performance.now()` — high-resolution timing
- `performance.mark()` / `.measure()` — custom measurements
- `PerformanceObserver` — monitor specific metrics
- Critical for finding and fixing performance bottlenecks

## Further Reading

- [MDN: Performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API)
- [MDN: Performance](https://developer.mozilla.org/en-US/docs/Web/API/Performance)
