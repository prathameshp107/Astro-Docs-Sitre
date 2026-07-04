# Environment Management

## Introduction

Applications run in multiple environments — local development, preview/staging, and production. Each environment has different configuration, databases, and API keys.

## Environment Types

| Environment | Purpose | Database | API Keys |
|-------------|---------|----------|----------|
| Development | Local coding | Local DB | Test keys |
| Preview | Testing changes | Staging DB | Staging keys |
| Production | Live users | Production DB | Production keys |

## Managing Environment Variables

```bash
# .env (committed — shared defaults)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# .env.local (not committed — local overrides)
DATABASE_URL=postgresql://localhost:5432/myapp-dev
NEXTAUTH_SECRET=local-dev-secret

# .env.production (not committed — production values)
DATABASE_URL=postgresql://prod-server:5432/myapp
NEXTAUTH_SECRET=prod-secret
```

## Environment Validation

```ts
// lib/env.ts
function getEnvVar(key: string, required = true): string {
  const value = process.env[key]
  
  if (!value && required) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
  
  return value ?? ''
}

export const env = {
  databaseUrl: getEnvVar('DATABASE_URL'),
  nextAuthSecret: getEnvVar('NEXTAUTH_SECRET'),
  nextAuthUrl: getEnvVar('NEXTAUTH_URL'),
  siteUrl: getEnvVar('NEXT_PUBLIC_SITE_URL', false) || 'http://localhost:3000',
}
```

## Environment-Specific Configuration

```ts
// config/env.ts
export const isProduction = process.env.NODE_ENV === 'production'
export const isDevelopment = process.env.NODE_ENV === 'development'
export const isTest = process.env.NODE_ENV === 'test'

// Feature flags per environment
export const features = {
  enableDebugTools: !isProduction,
  enableAnalytics: isProduction,
  logApiErrors: !isProduction,
}
```

## Common Mistakes

- **Missing environment variables at runtime** — Always validate required variables at startup.
- **Committing production secrets** — Add `.env.local` and `.env.production` to `.gitignore`.
- **Confusing build-time vs runtime variables** — `NEXT_PUBLIC_` variables are inlined at build time. Non-prefixed variables are only available on the server at runtime.

## Best Practices

- Validate required environment variables at application startup
- Use `env.ts` to centralize and type all environment variables
- Keep `.env.example` with placeholder values (committed to Git)
- Never commit `.env.local`, `.env.development`, or `.env.production`
- Use platform-specific settings (Vercel dashboard, Docker Compose) for deployment

## Summary

Manage environment variables through different `.env` files for development, preview, and production. Validate required variables at startup and centralize access through a typed `env.ts` module. Never commit secrets to version control.

## Related Topics

- [Constants and Config](./constants-and-config.md)
- [Environment Variables (Phase 7)](../../phase-07-production/deployment/environment-variables.md)
- [Protecting Environment Variables](../security-best-practices/protecting-environment-variables.md)
