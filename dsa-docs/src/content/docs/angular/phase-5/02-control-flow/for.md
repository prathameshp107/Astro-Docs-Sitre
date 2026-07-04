---
title: "@for"
description: "Iterative rendering with @for."
sidebar:
  order: 3
---

## Introduction
@for replaces *ngFor with required track and built-in @empty support.

## Example

```typescript
@for (product of products; track product.id) {
  <div>{{ product.name }}</div>
} @empty {
  <p>No products found.</p>
}

// Local variables
@for (item of items; track item.id; let i = $index, first = $first) {
  <div [class.highlight]="first">{{ i }}. {{ item.name }}</div>
}
```

## Summary
@for is faster and more explicit than *ngFor."
