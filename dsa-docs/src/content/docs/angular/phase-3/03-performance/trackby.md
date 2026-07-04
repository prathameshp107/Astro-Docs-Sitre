---
title: "trackBy"
description: "Optimize *ngFor with trackBy."
sidebar:
  order: 2
---

## Introduction
Without trackBy, Angular destroys and recreates all DOM nodes when the array reference changes. trackBy identifies items by a stable key.

## Example

```typescript
@Component({
  template: `
    <li *ngFor="let user of users; trackBy: trackByUserId">
      {{ user.name }}
    </li>
  `
})
export class UsersComponent {
  trackByUserId(index: number, user: User): number {
    return user.id;
  }
}
```

## Summary
Always use trackBy with *ngFor for lists with more than a few items."
