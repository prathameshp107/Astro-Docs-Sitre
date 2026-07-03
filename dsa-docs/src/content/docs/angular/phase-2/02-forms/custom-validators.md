---
title: "Custom Validators"
description: "Create custom validation logic."
sidebar:
  order: 8
---

## Introduction
When built-in validators aren't enough, create custom sync or async validators.

## Sync Validator

```typescript
function noSpacesValidator(control: AbstractControl): ValidationErrors | null {
  return /\s/.test(control.value) ? { hasSpaces: true } : null;
}
```

## Async Validator

```typescript
function uniqueEmailValidator(service: UserService) {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return service.checkEmail(control.value).pipe(
      map(taken => taken ? { emailTaken: true } : null)
    );
  };
}
```

## Summary
Custom validators provide flexible, reusable validation logic."
