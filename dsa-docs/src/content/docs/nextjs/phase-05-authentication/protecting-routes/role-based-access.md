---
title: "Role-Based Access Control"
description: "Role-Based Access Control (RBAC) restricts access based on a user's role. Common roles include admin, editor, and user. Each role has different permissions"
---

# Role-Based Access Control

## Introduction

Role-Based Access Control (RBAC) restricts access based on a user's role. Common roles include `admin`, `editor`, and `user`. Each role has different permissions for what they can view, create, edit, or delete.

## Why Do We Need This?

Most applications have different types of users with different needs. You want admins to access settings, editors to create content, and regular users to only read content. RBAC structures this cleanly.

## Defining Roles and Permissions

```ts
// lib/permissions.ts
export type Role = 'admin' | 'editor' | 'user'
export type Permission = 'create:post' | 'edit:post' | 'delete:post' | 'manage:users'

const rolePermissions: Record<Role, Permission[]> = {
  admin: ['create:post', 'edit:post', 'delete:post', 'manage:users'],
  editor: ['create:post', 'edit:post'],
  user: [],
}

export function hasPermission(role: Role, permission: Permission): boolean {
  return rolePermissions[role]?.includes(permission) ?? false
}
```

## Checking Roles in Pages

```tsx
// app/admin/page.tsx
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) redirect('/login')
  if (session.user.role !== 'admin') redirect('/unauthorized')
  
  return <div>
    <h1>Admin Panel</h1>
    {/* Admin-only content */}
  </div>
}
```

## Checking Roles in Middleware

> **Note:** The `role` field isn't in the default Auth.js JWT. You need to add it via the `jwt` callback in your auth config (see [Session Management](../authjs/session-management.md)).

```ts
// middleware.ts
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  if (pathname.startsWith('/admin')) {
    const token = await getToken({ req: request })
    
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    
    if (token.role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
  }
  
  return NextResponse.next()
}
```

## Checking Roles in API Routes

```ts
export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  if (session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  
  // Proceed with admin-only operation
}
```

## Conditional UI

```tsx
'use client'

import { useSession } from 'next-auth/react'

export default function PostActions({ postId }) {
  const { data: session } = useSession()
  const isAdmin = session?.user?.role === 'admin'
  const isEditor = session?.user?.role === 'editor'
  
  return (
    <div className="flex gap-2">
      <button>View</button>
      
      {(isAdmin || isEditor) && <button>Edit</button>}
      
      {isAdmin && <button className="text-red-600">Delete</button>}
    </div>
  )
}
```

## Common Mistakes

- **Only hiding UI elements** — Always enforce role checks on the server too. UI hiding is just UX, not security.
- **Hardcoding role checks instead of using a permissions system** — Permissions are more flexible than roles.
- **Not checking roles in API routes** — API routes are the most common attack vector.

## Best Practices

- Define permissions for each role in a central file
- Check roles in middleware, pages, and API routes
- Use a permissions helper function instead of inline role checks
- Keep the UI consistent — hide what users can't access

## Summary

RBAC assigns permissions to roles, and roles to users. Check roles in middleware, pages, and API routes. Enforce on the server for security, and hide inaccessible UI for good UX.

## Related Topics

- [Middleware](./middleware.md)
- [Protected Pages](./protected-pages.md)
- [Protected API Routes](./protected-api-routes.md)
