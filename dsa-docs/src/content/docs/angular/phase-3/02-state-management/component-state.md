---
title: "Component State"
description: "Local state management within components."
sidebar:
  order: 1
---

## Introduction
Component state is the simplest form of state management — state that's only relevant to one component and its children.

## Example

```typescript
@Component({
  template: `
    <button (click)="toggle()">{{ isOpen ? 'Close' : 'Open' }}</button>
  `
})
export class DropdownComponent {
  isOpen = false;
  toggle() { this.isOpen = !this.isOpen; }
}
```

## When to Use
- UI state (dropdowns, modals, toggles)
- Form state
- Any state scoped to a single component

## Summary
Keep state as local as possible. Only elevate state when multiple components need it."
