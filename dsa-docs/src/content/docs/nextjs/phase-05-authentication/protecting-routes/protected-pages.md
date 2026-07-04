# Protected Pages

## Introduction

Protected pages require authentication to view. In Next.js, you protect pages by checking the session server-side with `getServerSession` and redirecting if the user isn't authenticated.

## Why Do We Need This?

Middleware catches requests at the edge, but it's not sufficient alone. A user could potentially access a protected page if middleware behaves unexpectedly. Server-side checks in the page itself provide defense in depth.

## Basic Protected Page

```tsx
// app/dashboard/page.tsx
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login?callbackUrl=/dashboard')
  }
  
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {session.user.name}</p>
    </div>
  )
}
```

## Using a Layout for Protection

To protect all pages in a folder, add the check to the layout:

```tsx
// app/dashboard/layout.tsx
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login')
  }
  
  return (
    <div className="dashboard-layout">
      <nav>Dashboard Navigation</nav>
      <main>{children}</main>
    </div>
  )
}
```

## Loading State for Client Navigation

When navigating client-side, the layout check above re-runs on the server. For smoother UX, show a loading state:

```tsx
'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProtectedContent({ children }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])
  
  if (status === 'loading') {
    return <div>Loading...</div>
  }
  
  return <>{children}</>
}
```

## Common Mistakes

- **Not redirecting after getting `session`** — If `session` is null, the page still renders. Always check and redirect.
- **Using `useSession()` in Server Components** — Use `getServerSession()` instead for server-side checks.
- **Only checking in the page, not the layout** — Each page needs its own check unless you use a shared layout.

## Best Practices

- Always check auth in both middleware and the page itself
- Use layouts to protect groups of pages
- Pass the session data to child components instead of re-fetching

## Summary

Protect pages by checking `getServerSession()` and redirecting if the user isn't authenticated. Use layouts to protect groups of pages. Combine with middleware for defense in depth.

## Related Topics

- [Middleware](./middleware.md)
- [Protected API Routes](./protected-api-routes.md)
- [Role-Based Access](./role-based-access.md)
