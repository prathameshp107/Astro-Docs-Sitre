---
title: "@defer"
description: "Deferrable views for lazy loading."
sidebar:
  order: 4
---

## Introduction
@defer lazily loads components when a trigger condition is met, improving initial load performance.

## Triggers

```typescript
@defer (on idle) { <app-heavy /> }          // Browser idle
@defer (on viewport) { <app-gallery /> }      // Scroll into view
@defer (on interaction) { <app-modal /> }     // User clicks
@defer (on timer(5000)) { <app-widget /> }    // After delay
@defer (when isAdmin) { <app-admin /> }       // Condition
```

## Placeholder Blocks

```typescript
@defer {
  <app-heavy-chart />
} @placeholder {
  <div class="skeleton">Loading...</div>
} @loading {
  <p>Loading chart...</p>
} @error {
  <p>Failed to load.</p>
}
```

## Summary
@defer enables granular lazy loading for optimal initial bundle size."
