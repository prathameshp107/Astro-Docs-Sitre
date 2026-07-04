---
title: "OnPush Change Detection"
description: "Optimize with OnPush change detection strategy."
sidebar:
  order: 1
---

## Introduction
OnPush reduces the number of change detection cycles by only checking components when specific conditions are met.

## When OnPush Triggers

1. @Input reference changes
2. Event originates inside component
3. async pipe emits new value
4. markForCheck() called manually

## Example

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {
  @Input() product: Product;
}
```

## Summary
OnPush is the standard strategy for production Angular apps."
