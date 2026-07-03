---
title: "Async Validators"
description: "Server-side validation for forms."
sidebar:
  order: 9
---

## Introduction
Async validators call a server to validate values asynchronously. They return an Observable or Promise instead of a boolean.

## Example

```typescript
function usernameAvailable(service: UserService) {
  return (control: AbstractControl) => {
    return service.checkUsername(control.value).pipe(
      debounceTime(400),
      map(available => available ? null : { taken: true })
    );
  };
}

// Usage
new FormControl('', {
  asyncValidators: [usernameAvailable(userService)],
  updateOn: 'blur'  // or 'change' (default)
});
```

## Best Practices

- Use debounceTime to avoid excessive API calls
- Show loading state with control.pending
- Use updateOn: 'blur' for expensive validations

## Summary
Async validators enable server-side validation for real-time checks like username availability."
