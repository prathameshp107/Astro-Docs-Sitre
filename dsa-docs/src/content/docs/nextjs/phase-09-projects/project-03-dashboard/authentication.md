---
title: "Authentication"
description: "Set up authentication for your dashboard with Auth.js."
---

# Authentication

## Introduction

Your dashboard needs authentication to protect sensitive data. Using Auth.js (next-auth), you'll add email/password login and Google OAuth with session management.

## Setup

```bash
npm install next-auth@beta @auth/prisma-adapter
```

## Auth Configuration

```ts
// lib/auth.ts
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await db.user.findUnique({
          where: { email: credentials.email as string },
        })

        if (!user || !user.password) return null

        const valid = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!valid) return null

        return { id: user.id, email: user.email, name: user.name }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!
      }
      return session
    },
  },
})
```

## Route Handler

```ts
// app/api/auth/[...nextauth]/route.ts
import { handlers } from '@/lib/auth'

export const { GET, POST } = handlers
```

## Middleware

```ts
// middleware.ts
import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isOnDashboard = req.nextUrl.pathname.startsWith('/dashboard')

  if (isOnDashboard && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
```

## Login Page

```tsx
// app/login/page.tsx
import { LoginForm } from '@/components/login-form'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoginForm />
    </div>
  )
}
```

```tsx
// components/login-form.tsx
'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'

export function LoginForm() {
  const [loading, setLoading] = useState(false)

  return (
    <div className="w-full max-w-sm space-y-6">
      <h1 className="text-2xl font-bold text-center">Sign In</h1>
      
      <button
        onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
        className="w-full border rounded p-2 hover:bg-gray-50"
      >
        Continue with Google
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative text-center text-sm text-gray-500">
          <span className="bg-white px-2">or</span>
        </div>
      </div>

      {/* Email/password form fields here */}
    </div>
  )
}
```

## Best Practices

- Use middleware for route protection — don't rely on client-side checks alone
- Store session data securely with HttpOnly cookies
- Use PrismaAdapter for database-backed sessions
- Add rate limiting to the login endpoint

## Common Mistakes

- **Exposing the dashboard without auth** — Always protect routes via middleware
- **Not handling session expiry** — Redirect to login when session expires
- **Storing user data in localStorage** — Use server-side sessions

## Summary

Auth.js provides everything you need for dashboard authentication. Use middleware to protect routes, Google OAuth for easy sign-in, and Credentials provider for email/password login.
