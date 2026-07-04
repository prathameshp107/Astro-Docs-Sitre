---
title: "Session Management"
description: "Auth.js supports two session strategies: JWT (stateless) and database (stateful). Each has tradeoffs for security, scalability, and complexity."
---

# Session Management

## Introduction

Auth.js supports two session strategies: JWT (stateless) and database (stateful). Each has tradeoffs for security, scalability, and complexity.

## Session Strategies

### JWT Strategy (Default)

With JWT strategy, user data is encoded in a signed token and stored in a cookie. The server doesn't store anything — it verifies the signature on each request.

```ts
session: {
  strategy: 'jwt',
  maxAge: 30 * 24 * 60 * 60, // 30 days
}
```

**Pros:** No database lookups, works at the edge, easy to scale
**Cons:** Hard to revoke before expiry, token size adds to request headers

### Database Strategy

Session data is stored in your database. The cookie only contains a session ID, and the server looks up the session data on each request.

```ts
import { PrismaAdapter } from '@next-auth/prisma-adapter'

export const authOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'database',
    maxAge: 30 * 24 * 60 * 60,
  },
}
```

**Pros:** Easy to revoke (delete from DB), more control, smaller cookies
**Cons:** Database lookup per request, more complex setup

## Session Callbacks

Callbacks let you customize the JWT and session objects:

```ts
callbacks: {
  async jwt({ token, user }) {
    // Add custom fields to JWT on sign in
    if (user) {
      token.role = user.role
      token.id = user.id
    }
    return token
  },
  async session({ session, token }) {
    // Pass JWT data to session (available in components)
    session.user.role = token.role
    session.user.id = token.id
    return session
  },
}
```

## Reading the Session

### In Server Components

```tsx
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) return <p>Not logged in</p>
  
  return <p>Welcome, {session.user.name}</p>
}
```

### In Client Components

```tsx
'use client'

import { useSession } from 'next-auth/react'

export default function ProfileButton() {
  const { data: session, status } = useSession()
  
  if (status === 'loading') return <p>Loading...</p>
  if (!session) return <p>Not signed in</p>
  
  return <p>Signed in as {session.user.email}</p>
}
```

## Related Topics

- [Providers](./providers.md)
- [Installation](./installation.md)
- [Basic Example](./basic-example.md)
