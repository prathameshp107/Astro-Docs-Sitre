---
title: "Standalone Components"
description: "Creating standalone components."
sidebar:
  order: 1
---

## Introduction
Standalone components (standalone: true) don't need NgModules. They import dependencies directly.

## Example

```typescript
@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `...`
})
export class UserCardComponent { }
```

## Summary
Standalone components simplify Angular development by removing NgModule boilerplate."
