# Environment Variables

## Introduction

Environment variables keep configuration — API keys, database URLs, secrets — out of your code. They change per environment (development, preview, production) without changing the code.

## Why Do We Need This?

Hardcoding secrets in your code is a security risk. Environment variables let you:

- Keep API keys and secrets out of version control
- Use different values for development and production
- Change configuration without redeploying

## Using Environment Variables

### Local Development

```bash
# .env.local (not committed to git)
DATABASE_URL=postgresql://localhost:5432/mydb
NEXTAUTH_SECRET=my-dev-secret
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### In Code

```ts
// Server-side only (can't be accessed by the browser)
const dbUrl = process.env.DATABASE_URL

// Client-side (prefix with NEXT_PUBLIC_)
const apiUrl = process.env.NEXT_PUBLIC_API_URL
```

### In next.config.js

```ts
// next.config.js
module.exports = {
  env: {
    CUSTOM_KEY: 'my-value',
  },
  publicRuntimeConfig: {
    // Available on both server and client
  },
}
```

## Public vs Private Variables

| Prefix | Accessible Where | Example |
|--------|-----------------|---------|
| `NEXT_PUBLIC_` | Browser and server | `NEXT_PUBLIC_API_URL` |
| No prefix | Server only | `DATABASE_URL`, `API_SECRET` |

```ts
// ✅ Can be used in client components
const apiUrl = process.env.NEXT_PUBLIC_API_URL

// ❌ Will be undefined in client components
const dbUrl = process.env.DATABASE_URL // Server only
```

## Environment-Specific Files

| File | When It Loads | Priority |
|------|--------------|----------|
| `.env` | Always | Lowest |
| `.env.local` | Always (ignored by Git) | Overrides `.env` |
| `.env.development` | `next dev` only | Overrides `.env.local` |
| `.env.production` | `next start` only | Overrides `.env.local` |

```bash
# .env — shared defaults
DATABASE_URL=postgresql://localhost:5432/mydb

# .env.local — local overrides (not in Git)
DATABASE_URL=postgresql://localhost:5432/my-local-db

# .env.production — production overrides
DATABASE_URL=postgresql://prod-server:5432/my-prod-db
```

## Deployment Platforms

### Vercel

Set environment variables in Project Settings → Environment Variables. You can set different values for:

- Development (preview deployments)
- Preview (branch deployments)  
- Production

### Docker

```yaml
# docker-compose.yml
services:
  app:
    image: myapp
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
```

## Common Mistakes

- **Committing `.env.local` to Git** — Add `.env.local` to `.gitignore`. Only commit `.env.example` with placeholder values.
- **Using `NEXT_PUBLIC_` for secrets** — Anything prefixed with `NEXT_PUBLIC_` is visible in the browser. Never put API keys or secrets here.
- **Checking for variables at build time** — Some variables are only available at runtime. Use `process.env.X` at runtime, not build time.

## Best Practices

- Use `.env.local` for local development (not committed)
- Use `.env.example` as a template with placeholder values (committed)
- Prefix client-accessible variables with `NEXT_PUBLIC_`
- Never commit secrets to version control
- Set environment variables in your deployment platform's dashboard

## Summary

Environment variables keep configuration out of your code. Use `NEXT_PUBLIC_` prefix for browser-accessible variables. Set different values per environment using `.env.development`, `.env.production`, or your deployment platform's dashboard.

## Related Topics

- [Vercel Deployment](./vercel-deployment.md)
- [Self-Hosting](./self-hosting.md)
- [Deployment Checklist](./deployment-checklist.md)
