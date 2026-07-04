---
title: "Route Data"
description: "Pass static data and configuration through routes."
sidebar:
  order: 6
---

## Introduction
Route data allows passing static configuration to components through the route definition.

## Example

```typescript
{
  path: 'products',
  component: ProductListComponent,
  data: { title: 'Products', roles: ['admin', 'user'] }
}

// Component
this.route.snapshot.data['title'];
```

## Summary
Route data provides a clean way to pass configuration to routed components."
