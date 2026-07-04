---
title: "Token Refresh"
description: "Automatic token refresh with request queuing."
sidebar:
  order: 4
---

## Introduction
When an access token expires, the app should automatically refresh it without disrupting the user.

## Pattern

```typescript
// Auth Interceptor handles 401s
handle401Error(req, next) {
  if (this.isRefreshing) {
    // Queue concurrent requests
    return this.refreshSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap(() => next.handle(this.addAuthHeader(req)))
    );
  }

  this.isRefreshing = true;
  return this.authService.refreshToken().pipe(
    switchMap(token => {
      this.isRefreshing = false;
      this.refreshSubject.next(token);
      return next.handle(this.addAuthHeader(req));
    })
  );
}
```

## Summary
Proper token refresh handling ensures seamless authentication in Angular apps."
