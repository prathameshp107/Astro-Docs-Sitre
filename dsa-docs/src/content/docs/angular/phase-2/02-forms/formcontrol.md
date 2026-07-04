---
title: "FormControl"
description: "Individual form field tracking and validation."
sidebar:
  order: 5
---

## Introduction
FormControl tracks the value and validation state of an individual form field.

## States
- **valid/invalid**: Passes validators?
- **pristine/dirty**: Has user interacted?
- **touched/untouched**: Has user blurred?
- **pending**: Async validator running?

```typescript
const email = new FormControl('', [Validators.required, Validators.email]);
console.log(email.value);    // ''
console.log(email.valid);    // false
```

## Summary
FormControl is the building block of reactive forms."
