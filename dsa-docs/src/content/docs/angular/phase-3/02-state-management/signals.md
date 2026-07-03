---
title: "Signals for State"
description: "Using Angular Signals for state management."
sidebar:
  order: 3
---

## Introduction
Angular Signals provide a reactive, efficient way to manage state without the complexity of NgRx or RxJS.

## Example

```typescript
@Injectable({ providedIn: 'root' })
export class CartService {
  private items = signal<CartItem[]>([]);
  readonly totalItems = computed(() => this.items().length);
  readonly totalPrice = computed(() =>
    this.items().reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  addItem(item: CartItem) {
    this.items.update(items => [...items, item]);
  }
}
```

## Summary
Signals offer a simpler, more performant alternative to RxJS for component state."
