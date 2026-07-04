---
title: "JWT Tokens"
description: "Understanding JSON Web Tokens."
sidebar:
  order: 3
---

## Introduction
JWT (JSON Web Token) is a stateless authentication format consisting of a header, payload, and signature.

## Structure

```
Header.Payload.Signature

// Decoded payload:
{
  "sub": "user-123",
  "role": "ADMIN",
  "permissions": ["products:write"],
  "exp": 1700003600,
  "iat": 1700000000
}
```

## Security Rules
- Access tokens: short-lived (15min-1hr)
- Refresh tokens: long-lived (7-30 days), httpOnly cookie
- Never store access tokens in localStorage

## Summary
JWT enables stateless authentication suitable for distributed systems."
