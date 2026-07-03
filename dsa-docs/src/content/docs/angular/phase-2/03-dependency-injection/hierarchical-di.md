---
title: "Hierarchical DI"
description: "Understanding the hierarchical injector tree."
sidebar:
  order: 4
---

## Introduction
Angular's DI system is hierarchical. Each component can have its own injector, creating a tree that mirrors the component structure.

## Key Points

- Services provided at a component level create a new instance for each component
- Child injectors inherit from parent injectors
- A child can override a parent's provider
- @Optional() and @SkipSelf() decorators control resolution behavior

## Example

```typescript
@Component({
  providers: [LocalService]  // New instance per component
})
export class ChildComponent {
  // Gets its own LocalService, inherits root ser
