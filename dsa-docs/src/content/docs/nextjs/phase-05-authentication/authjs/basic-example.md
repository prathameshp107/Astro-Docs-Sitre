---
title: "Basic Example"
description: "This topic puts everything together — a complete working authentication setup with Auth.js, including a login page, protected dashboard, and sign-out butto"
---

# Basic Example

## Introduction

This topic puts everything together — a complete working authentication setup with Auth.js, including a login page, protected dashboard, and sign-out button.

## Complete Example

### 1. Auth Configuration

```ts
// lib/auth.ts
import { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.id as string
      return session
    },
  },
}
```

### 2. Route Handler

```ts
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
```

### 3. Login Page

```tsx
'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function LoginPage() {
  const [loading, setLoading] = useState<string | null>(null)

  return (
    <div className="max-w-md mx-auto mt-20 p-8 border rounded-xl">
      <h1 className="text-2xl font-bold mb-6">Sign In</h1>
      
      <div className="space-y-3">
        <button
          onClick={() => {
            setLoading('google')
            signIn('google', { callbackUrl: '/dashboard' })
          }}
          disabled={loading !== null}
          className="w-full p-3 border rounded-lg hover:bg-gray-50"
        >
          {loading === 'google' ? 'Redirecting...' : 'Sign in with Google'}
        </button>
        
        <button
          onClick={() => {
            setLoading('github')
            signIn('github', { callbackUrl: '/dashboard' })
          }}
          disabled={loading !== null}
          className="w-full p-3 border rounded-lg hover:bg-gray-100"
        >
          {loading === 'github' ? 'Redirecting...' : 'Sign in with GitHub'}
        </button>
      </div>
    </div>
  )
}
```

### 4. Protected Dashboard

```tsx
// app/dashboard/page.tsx
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import LogoutButton from './logout-button'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login')
  }
  
  return (
    <div className="max-w-2xl mx-auto mt-10 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <LogoutButton />
      </div>
      
      <div className="border rounded-xl p-6 space-y-3">
        <p><span className="font-semibold">Name:</span> {session.user?.name}</p>
        <p><span className="font-semibold">Email:</span> {session.user?.email}</p>
      </div>
    </div>
  )
}
```

### 5. Logout Button

```tsx
// app/dashboard/logout-button.tsx
'use client'

import { signOut } from 'next-auth/react'

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/login' })}
      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
    >
      Sign Out
    </button>
  )
}
```

## How It Works

1. User clicks "Sign in with Google"
2. Redirected to Google's auth page
3. User approves, Google redirects back to your app
4. Auth.js creates a JWT session
5. User lands on dashboard, session is available
6. Sign out clears the session

## Common Mistakes

- **Not calling `router.refresh()` after sign-in** — Server Components may still show the logged-out state.
- **Using `useSession()` in Server Components** — Use `getServerSession()` instead.
- **Missing `SessionProvider`** — Client components won't have access to the session.

## Best Practices

- Protect pages with `getServerSession()` in Server Components
- Use `signIn()` with `redirect: false` for custom error handling
- Call `router.refresh()` after sign-in to update Server Components

## Summary

With just a few files — auth config, route handler, login page, and dashboard — you have a fully functional authentication system. Auth.js handles the complex parts: OAuth flows, session creation, and security.

## Related Topics

- [Installation](./installation.md)
- [Providers](./providers.md)
- [Session Management](./session-management.md)
