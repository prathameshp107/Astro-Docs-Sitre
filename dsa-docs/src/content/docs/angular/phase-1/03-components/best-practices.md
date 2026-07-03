---
title: "Component Best Practices"
description: "Best practices for building maintainable, performant Angular components."
sidebar:
  order: 5
---

## Introduction

Following best practices ensures your Angular components are maintainable, performant, and scalable. These guidelines are battle-tested in enterprise applications.

## Best Practices

### 1. Single Responsibility
Each component should do one thing and do it well. If a component grows too large, break it into smaller components.

### 2. OnPush Change Detection
```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

### 3. Smart vs Dumb Components
- Smart components: connect to services/store, orchestrate data
- Dumb components: @Input/@Output only, pure UI

### 4. Use trackBy with *ngFor
```typescript
trackByFn(index: number, item: any) {
  return item.id;
}
```

### 5. Unsubscribe in ngOnDestroy
```typescript
ngOnDestroy() {
  this.subscription?.unsubscribe();
}
```

### 6. Keep Templates Simple
Move complex logic to the component class or extract into pipes/services.

### 7. Use Immutable Data
Always return new object references for @Input properties.

## Summary

Following these best practices keeps your Angular codebase clean, performant, and maintainable as it grows."
