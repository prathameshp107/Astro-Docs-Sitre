---
title: "Resolvers"
description: "Pre-fetch data before activating routes."
sidebar:
  order: 5
---

## Introduction
Resolvers pre-fetch data before a route activates. The component receives data already loaded, eliminating loading states.

## Example

```typescript
export const productResolver: ResolveFn<Product> = (route) => {
  const id = route.paramMap.get('id')!;
  return inject(ProductService).getProduct(id);
};

// Route config
{
  path: 'products/:id',
  component: ProductDetailComponent,
  resolve: { product: productResolver }
}

// Component
this.route.snapshot.data['product']
```

## Summary
Resolvers improve UX by ensuring data is available before the component renders."
