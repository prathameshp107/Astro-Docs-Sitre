---
title: "HTTP Interceptors"
description: "Intercept HTTP requests and responses."
sidebar:
  order: 2
---

## Introduction
Interceptors sit between your app and the server, inspecting/modifying requests and responses.

## Common Uses

- Adding auth tokens
- Error handling
- Request/response logging
- Loading indicators
- Caching

## Example

```typescript
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).getToken();
  const cloned = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;
  return next(cloned);
};
```

## Summary
Interceptors provide centralized HTTP request/response processing."
