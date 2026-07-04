---
title: "FormGroup"
description: "Group related form controls together."
sidebar:
  order: 4
---

## Introduction
FormGroup aggregates multiple FormControls into a single unit, enabling validation at the group level and nested form structures.

## Example

```typescript
this.profileForm = new FormGroup({
  firstName: new FormControl(''),
  lastName: new FormControl(''),
  address: new FormGroup({
    street: new FormControl(''),
    city: new FormControl('')
  })
});
```

## Summary
FormGroup organizes related controls and enables cross-field validation."
