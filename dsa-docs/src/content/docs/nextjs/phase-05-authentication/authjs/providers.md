---
title: "Providers"
description: "Providers are the ways users can log in. Auth.js supports OAuth providers (Google, GitHub), email (magic links), and credentials (email/password). You can"
---

# Providers

## Introduction

Providers are the ways users can log in. Auth.js supports OAuth providers (Google, GitHub), email (magic links), and credentials (email/password). You can use multiple providers simultaneously.

## Why Do We Need Multiple Providers?

Users prefer different login methods. Some want the speed of social login (Google, GitHub), while others prefer email/password. Offering multiple options increases sign-up conversion.

## Provider Types

| Type | Example | Use Case |
|------|---------|----------|
| OAuth | Google, GitHub, Twitter | Social login — fastest UX |
| Email | Magic link | Passwordless auth |
| Credentials | Email + password | Custom username/password |

## OAuth Providers

### GitHub

```ts
import GitHubProvider from 'next-auth/providers/github'

providers: [
  GitHubProvider({
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  }),
]
```

### Google

```ts
import GoogleProvider from 'next-auth/providers/google'

providers: [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  }),
]
```

## Credentials Provider

For email/password authentication:

```ts
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

providers: [
  CredentialsProvider({
    name: 'credentials',
    credentials: {
      email: { label: 'Email', type: 'email' },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials) {
      const user = await db.user.findUnique({
        where: { email: credentials.email }
      })
      
      if (!user || !user.hashedPassword) return null
      
      const isValid = await bcrypt.compare(
        credentials.password,
        user.hashedPassword
      )
      
      if (!isValid) return null
      
      return { id: user.id, email: user.email, name: user.name }
    },
  }),
]
```

## Multiple Providers

```ts
providers: [
  GoogleProvider({ ... }),
  GitHubProvider({ ... }),
  CredentialsProvider({ ... }),
]
```

Users can choose any provider on the sign-in page. Auth.js handles creating and linking accounts.

## Common Mistakes

- **Missing callback URLs in OAuth provider settings** — Google and GitHub require exact callback URL configuration in their developer consoles.
- **Not handling the case where a user exists but has no password** — OAuth users won't have a password for credentials login.
- **Storing provider secrets in code** — Always use environment variables.

## Best Practices

- Start with one provider, add more as needed
- Use OAuth providers for the best user experience
- Add credentials provider when you need custom sign-up flows
- Configure callback URLs exactly in OAuth provider dashboards

## Summary

Auth.js supports OAuth, email, and credentials providers. Configure them in the `providers` array of your auth options. Use multiple providers to give users choice, and always store secrets in environment variables.

## Related Topics

- [Installation](./installation.md)
- [Session Management](./session-management.md)
- [Basic Example](./basic-example.md)
