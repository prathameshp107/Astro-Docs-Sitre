---
title: Marks & Measures
description: Using performance.mark() and performance.measure() for custom profiling
sidebar:
  order: 2
---

# Marks & Measures

## Introduction

The **User Timing API** lets you mark specific points in time with `performance.mark()` and measure the duration between marks with `performance.measure()`.

## Marking Points

```javascript
// Mark the start of an operation
performance.mark('fetch-start');

await fetch('/api/data');

// Mark the end
performance.mark('fetch-end');

// Measure the duration
performance.measure('data-fetch', 'fetch-start', 'fetch-end');

// Get the measurement
const measures = performance.getEntriesByName('data-fetch');
console.log(`Fetch took ${measures[0].duration}ms`);
```

## Multiple Measurements

```javascript
async function loadApp() {
  performance.mark('app-start');

  performance.mark('data-start');
  const data = await fetchData();
  performance.mark('data-end');
  performance.measure('data-load', 'data-start', 'data-end');

  performance.mark('render-start');
  renderData(data);
  performance.mark('render-end');
  performance.measure('render-time', 'render-start', 'render-end');

  performance.mark('app-end');
  performance.measure('total-load', 'app-start', 'app-end');

  // Log all measurements
  performance.getEntriesByType('measure').forEach(m => {
    console.log(`${m.name}: ${m.duration.toFixed(2)}ms`);
  });
}
```

## Named Marks

```javascript
performance.mark('step-1');
// ... do work ...
performance.mark('step-2');
// ... do more work ...
performance.mark('step-3');

performance.measure('phase-1', 'step-1', 'step-2');
performance.measure('phase-2', 'step-2', 'step-3');
```

## Cleaning Up

```javascript
// Clear specific marks
performance.clearMarks('fetch-start');

// Clear all marks
performance.clearMarks();

// Clear specific measures
performance.clearMeasures('data-fetch');

// Clear all measures
performance.clearMeasures();
```

## Getting All Entries

```javascript
// All marks
const marks = performance.getEntriesByType('mark');

// All measures
const measures = performance.getEntriesByType('measure');

// Named entries
const specific = performance.getEntriesByName('data-fetch');
```

## Summary

- `performance.mark(name)` — timestamp a point
- `performance.measure(name, startMark, endMark)` — measure duration
- `getEntriesByType('measure')` — retrieve measurements
- `clearMarks()` / `clearMeasures()` — clean up

## Further Reading

- [MDN: User Timing API](https://developer.mozilla.org/en-US/docs/Web/API/User_Timing_API)
