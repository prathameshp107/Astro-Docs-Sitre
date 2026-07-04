---
title: "Route Guards"
description: "Protect routes with Angular route guards."
sidebar:
  order: 4
---

## Introduction
Route guards control whether a user can navigate to or away from a route. They're essential for authentication, authorization, and data protection.

## Types of Guards

- **CanActivate**: Can user enter this route?
- **CanDeactivate**: Can user leave this route? (unsaved changes)
- **CanMatch**: Should this route match?
- **CanActivateChild**: Protect all child routes

## Example

```typescript
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) return true;
  return router.createUrlTree(['/login']);
};
```

## Summary
Guards are essential for controlling navigation access in Angular applications."
