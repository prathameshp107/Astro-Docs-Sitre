---
title: "Installation"
description: "Setting up Auth.js in a Next.js project takes just a few steps. This guide covers installation, environment variables, and the basic project structure."
---

# Installation

## Introduction

Setting up Auth.js in a Next.js project takes just a few steps. This guide covers installation, environment variables, and the basic project structure.

## Installation Steps

### 1. Install the Package

```bash
npm install next-auth
```

For Auth.js v5 (beta) with the new App Router syntax:

```bash
npm install next-auth@beta
```

### 2. Environment Variables

Create a `.env` file with your configuration:

```bash
# Required
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret-here

# Only needed if using OAuth providers
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

Generate a strong secret:

```bash
openssl rand -base64 32
```

### 3. Create the Auth Route Handler

```ts
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
```

### 4. Create the Auth Configuration

```ts
// lib/auth.ts
import { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
}
```

### 5. Add SessionProvider (for client components)

```tsx
// app/providers.tsx
'use client'

import { SessionProvider } from 'next-auth/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}
```

```tsx
// app/layout.tsx
import { Providers } from './providers'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

## Project Structure

```
my-app/
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts
│   ├── providers.tsx
│   └── layout.tsx
├── lib/
│   └── auth.ts
└── .env
```

## Common Mistakes

- **Forgetting `NEXTAUTH_SECRET`** — Without it, Auth.js generates a weak secret in development and throws an error in production.
- **Not wrapping the app in `SessionProvider`** — `useSession()` will fail in client components without it.
- **Missing environment variables for providers** — OAuth providers will throw errors without their client ID and secret.

## Best Practices

- Use `openssl rand -base64 32` to generate a strong `NEXTAUTH_SECRET`
- Set `NEXTAUTH_URL` to your production domain in deployment
- Store provider secrets in environment variables, not in code
- Add `.env` to `.gitignore` to prevent committing secrets

## Summary

Auth.js installs with `npm install next-auth`. Configure providers, environment variables, and the route handler. Wrap your app in `SessionProvider` to use sessions in client components.

## Related Topics

- [Introduction to Auth.js](./introduction.md)
- [Providers](./providers.md)
- [Session Management](./session-management.md)
