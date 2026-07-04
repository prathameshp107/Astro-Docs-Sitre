---
title: "Dashboard Layout"
description: "Build a responsive dashboard layout with sidebar navigation."
---

# Dashboard Layout

## Introduction

A dashboard layout is different from a public-facing layout. It needs navigation, user context, and responsive behavior. You'll create a layout that wraps all dashboard pages with a sidebar and header.

## Folder Structure

```
app/
  dashboard/
    layout.tsx      # Dashboard layout (sidebar + header)
    page.tsx        # Analytics overview
    users/
      page.tsx      # User management
    settings/
      page.tsx      # Settings page
```

## Dashboard Layout

```tsx
// app/dashboard/layout.tsx
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Sidebar from '@/components/dashboard/sidebar'
import Header from '@/components/dashboard/header'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header user={session.user} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
```

**Key points:**
- The layout checks authentication on every navigation
- Sidebar is always visible on desktop
- Header shows the current user's name
- Main content area scrolls independently

## Sidebar Component

```tsx
// components/dashboard/sidebar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/dashboard', label: 'Analytics', icon: '📊' },
  { href: '/dashboard/users', label: 'Users', icon: '👥' },
  { href: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-gray-900 text-white p-4 hidden md:block">
      <h2 className="font-bold text-lg mb-6">Dashboard</h2>
      <nav className="space-y-2">
        {links.map(link => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2 rounded ${
                isActive ? 'bg-blue-600' : 'hover:bg-gray-800'
              }`}
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
```

## Header Component

```tsx
// components/dashboard/header.tsx
'use client'

import { signOut } from 'next-auth/react'
import Image from 'next/image'

export default function Header({ user }: { user: any }) {
  return (
    <header className="flex items-center justify-between border-b px-6 py-3">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {user.image && (
            <Image
              src={user.image}
              alt={user.name}
              width={32}
              height={32}
              className="rounded-full"
            />
          )}
          <span className="text-sm">{user.name}</span>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="text-sm text-red-600 hover:underline"
        >
          Sign Out
        </button>
      </div>
    </header>
  )
}
```

## Responsive Behavior

For mobile, add a hamburger menu:

```tsx
// Add to sidebar component
const [isOpen, setIsOpen] = useState(false)

return (
  <>
    {/* Mobile menu button — visible only on small screens */}
    <button
      className="md:hidden fixed top-3 left-3 z-50 p-2"
      onClick={() => setIsOpen(!isOpen)}
    >
      {isOpen ? '✕' : '☰'}
    </button>

    {/* Sidebar — slides in on mobile, always visible on desktop */}
    <aside className={`
      fixed md:static z-40 h-full transition-transform
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      md:translate-x-0
    `}>
      {/* Sidebar content */}
    </aside>
  </>
)
```

## Best Practices

- Place auth checks in the layout (runs before any page renders)
- Keep the sidebar as a Client Component for interactivity
- Use Suspense for data-fetching page sections
- Maintain a consistent header height across all pages

## Common Mistakes

- **Not protecting the layout** — Auth check in the layout is not enough; also use middleware
- **Hardcoding navigation items** — Use a links array for easy updates
- **Ignoring mobile** — The sidebar must collapse on small screens

## Summary

The dashboard layout combines a Server Component (for auth checking) with Client Components (for sidebar interactivity). The layout wraps all dashboard pages with consistent navigation and user context.
