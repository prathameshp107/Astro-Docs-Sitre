---
title: Cookies vs Web Storage
description: When to use cookies vs localStorage/sessionStorage
sidebar:
  order: 4
---

# Cookies vs Web Storage

## Introduction

Cookies and Web Storage serve different purposes. Choosing the right one depends on your use case.

## Comparison Table

| Feature | Cookies | Web Storage |
|---------|---------|-------------|
| Capacity | ~4KB | ~5-10MB |
| Sent to server | ✅ Yes (auto) | ❌ No |
| Expiration | Manual | localStorage: manual, sessionStorage: on close |
| Access | Client & server | Client only |
| API | `document.cookie` (string) | `.getItem()` / `.setItem()` (simple) |

## When to Use Each

```javascript
// Use cookies for:
// - Authentication tokens (sent automatically with requests)
// - Session IDs
// - Server-side preferences

// Use Web Storage for:
// - Large client-side data (user preferences, drafts)
// - Application state
// - Cached API responses
```

## Security Considerations

| Storage Type | XSS Vulnerable | CSRF Vulnerable |
|-------------|---------------|-----------------|
| localStorage | ✅ Yes (JS access) | ❌ No |
| sessionStorage | ✅ Yes (JS access) | ❌ No |
| Cookies (HttpOnly) | ❌ No | ✅ Yes |
| Cookies (SameSite) | ❌ No | ❌ No (with SameSite=Strict) |

## Summary

- Cookies: ~4KB, auto-sent to server, best for auth
- Web Storage: ~5-10MB, client-only, best for app data
- Use HttpOnly cookies for auth tokens
- Use Web Storage for everything else

## Further Reading

- [MDN: HTTP Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
