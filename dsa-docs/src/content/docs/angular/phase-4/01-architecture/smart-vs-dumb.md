---
title: "Smart vs Dumb Components"
description: "Separate presentation from business logic."
sidebar:
  order: 1
---

## Introduction
Smart (container) components handle data and state. Dumb (presentational) components only receive @Input() and emit @Output().

## Smart Component
```typescript
@Component({
  template: `<app-product-list [products]="products$ | async" (addToCart)="onAdd($event)"></app-product-list>`
})
export class ProductListPageComponent {
  products$ = this.store.select(selectAllProducts);
  constructor(private store: Store) { this.store.dispatch(loadProducts()); }
  onAdd(product: Product) { this.store.dispatch(addToCart({ product })); }
}
```

## Dumb Component
```typescript
@Component({
  selector: 'app-product-list',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  @Input() products: Product[];
  @Output() addToCart = new EventEmitter<Product>();
}
```

## Summary
This separation makes dumb components reusable and trivially testable."
