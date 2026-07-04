---
title: "ComponentStore"
description: "Local state management with @ngrx/component-store."
sidebar:
  order: 5
---

## Introduction
ComponentStore provides local state management without the boilerplate of global NgRx. It's lifecycle-bound to the component.

## Example

```typescript
@Injectable()
export class ProductsStore extends ComponentStore<ProductsState> {
  constructor() {
    super({ products: [], loading: false });
  }

  readonly products$ = this.select(state => state.products);
  readonly loading$ = this.select(state => state.loading);

  readonly loadProducts = this.effect(load$ =>
    load$.pipe(
      switchMap(() => this.productService.getAll().pipe(
        tap(products => this.patchState({ products, loading: false }))
      ))
    )
  );
}
```

## Summary
ComponentStore is ideal for complex component-level state management."
