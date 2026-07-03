---
title: "takeUntil"
description: "Complete an observable based on a notifier."
sidebar:
  order: 10
---

## Introduction
takeUntil completes an Observable when a notifier Observable emits. It's the standard pattern for subscription cleanup.

## Example

```typescript
@Component({ ... })
export class MyComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.service.data$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => this.data = data);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

## Summary
takeUntil is the recommended pattern for preventing memory leaks."
