---
title: "Authentication Best Practices"
description: "Authentication is the first line of defense for your application. Getting it wrong can expose user accounts to attackers."
---

# Authentication Best Practices

## Introduction

Authentication is the first line of defense for your application. Getting it wrong can expose user accounts to attackers.

> **Prerequisite:** This page assumes you've already set up authentication with Auth.js. If you haven't, see [Phase 5 — Authentication & Authorization](../../phase-05-authentication/authjs/) first.

## Password Security

### Hashing

```ts
import bcrypt from 'bcryptjs'

// ✅ Correct — use bcrypt with sufficient cost
const SALT_ROUNDS = 12
const hash = await bcrypt.hash(password, SALT_ROUNDS)

// ❌ Wrong — never use MD5, SHA1, or plain text
```

### Password Requirements

- Minimum 8 characters (longer is better)
- No arbitrary complexity rules (they hurt usability more than security)
- Check against common passwords (HaveIBeenPwned API)
- Encourage password managers

## Session Security

| Practice | Why |
|----------|-----|
| Use HttpOnly cookies | Prevents JavaScript access (XSS protection) |
| Use Secure flag | Ensures HTTPS-only transmission |
| Use SameSite=Strict/Lax | Prevents CSRF attacks |
| Short session expiry | Limits damage if a session is stolen |
| Regenerate session ID after login | Prevents session fixation |

```ts
// Setting a secure auth cookie
cookies().set('session-token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 60 * 60 * 24, // 24 hours
  path: '/',
})
```

## Rate Limiting Logins

```ts
// Prevent brute force attacks
const limiter = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '15 m'), // 5 attempts per 15 min
})

const { success } = await limiter.limit(email)

if (!success) {
  return { error: 'Too many attempts. Try again later.' }
}
```

## Common Mistakes

- **Returning different errors for "user not found" vs "wrong password"** — This lets attackers discover valid emails.
- **No rate limiting on login** — Without it, attackers can try thousands of passwords.
- **Long-lived sessions without refresh** — If a session is stolen, the attacker has access for the full duration.
- **Storing tokens in localStorage** — Vulnerable to XSS. Use HttpOnly cookies.

## Summary

Secure authentication uses strong password hashing (bcrypt), secure cookies (HttpOnly, Secure, SameSite), rate limiting on login, and short session expirations. Never store tokens in localStorage and always return generic error messages.

## Related Topics

- [Authorization Best Practices](./authorization-best-practices.md)
- [API Security](./api-security.md)
- [Common Security Mistakes](./common-security-mistakes.md)
