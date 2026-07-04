---
title: "inject() Function"
description: "Using the inject() function for dependency injection."
sidebar:
  order: 3
---

## Introduction
Angular 14+ introduced the inject() function as an alternative to constructor-based injection. It works in components, directives, pipes, guards, and resolvers.

## Example

```typescript
import { inject } from '@angular/core';

@Component({ ... })
export class UserComponent {
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  
  // No constructor needed!
}
```

## Benefits
- Cleaner class definitions
- Works in functional guards
- Reduces boilerplate

## Summary
The inject() function provides a cleaner, more flexible injection mechanism."
