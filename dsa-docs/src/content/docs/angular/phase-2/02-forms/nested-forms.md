---
title: "Nested Forms"
description: "Complex form structures with nested groups and arrays."
sidebar:
  order: 11
---

## Introduction
Nested forms use FormGroup within FormGroup to create hierarchical form structures.

## Example

```typescript
this.userForm = this.fb.group({
  personal: this.fb.group({
    firstName: [''],
    lastName: [''],
    address: this.fb.group({
      street: [''],
      city: [''],
      zip: ['']
    })
  }),
  preferences: this.fb.group({
    newsletter: [false],
    theme: ['light']
  })
});
```

## Summary
Nested forms organize complex data into logical hierarchies."
