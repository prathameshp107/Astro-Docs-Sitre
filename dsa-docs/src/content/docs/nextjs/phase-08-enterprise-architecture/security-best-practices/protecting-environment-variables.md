# Protecting Environment Variables

## Introduction

Environment variables contain secrets — database URLs, API keys, and auth tokens. If they leak, your application and users are at risk.

## Risks of Leaked Secrets

| Risk | Consequence |
|------|-------------|
| Database URL leak | Data breach, data deletion |
| API key leak | Unauthorized API usage, billing charges |
| Auth secret leak | Session forgery, account takeover |

## Best Practices

### Never Commit Secrets

```bash
# ✅ Add these to .gitignore
.env.local
.env.production
.env*.local

# ✅ Use .env.example as a template (committed)
# .env.example
DATABASE_URL=postgresql://localhost:5432/mydb
NEXTAUTH_SECRET=your-secret-here
```

### Use Environment Variables on Deployment Platforms

```bash
# Vercel: Project Settings → Environment Variables
DATABASE_URL=postgresql://prod:password@host:5432/db
NEXTAUTH_SECRET=your-production-secret

# Docker: docker-compose.yml or .env file
```

### Validate at Startup

```ts
// lib/env.ts
const required = ['DATABASE_URL', 'NEXTAUTH_SECRET']

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required env variable: ${key}`)
  }
}
```

### Avoid NEXT_PUBLIC_ for Secrets

```ts
// ❌ WRONG — This makes the secret visible in the browser
const apiKey = process.env.NEXT_PUBLIC_STRIPE_SECRET

// ✅ CORRECT — Server-only
const apiKey = process.env.STRIPE_SECRET
```

## Common Mistakes

- **Committing `.env` files to Git** — Even if you realize immediately and push a fix, the secret is in the Git history. Rotate the key.
- **Checking secrets into client code** — Anything after `NEXT_PUBLIC_` is visible in the browser. Never put server secrets here.
- **Hardcoding secrets for convenience** — "I'll fix it later" usually means it stays hardcoded forever.

## Summary

Protect environment variables by never committing them, using environment-specific files, and validating required variables at startup. Use `NEXT_PUBLIC_` only for values that should be visible in the browser.

## Related Topics

- [API Security](./api-security.md)
- [Environment Management](../code-organization/environment-management.md)
- [Common Security Mistakes](./common-security-mistakes.md)
