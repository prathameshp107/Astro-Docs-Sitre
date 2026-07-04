---
title: "Client-side Data Fetching Patterns"
description: "import { useEffect, useState } from 'react'"
---

# Client-side Data Fetching Patterns

## Introduction
While Server Components handle most data fetching, Client Components sometimes need to fetch data too — for real-time updates, user-specific content after login, or data that changes frequently. This topic covers client-side fetching patterns with the native `fetch` API and TanStack Query.

## Why do we need this?
Server Components fetch data once during rendering. For data that updates in real-time, depends on client-side state (search input, filters), or needs polling — you need client-side fetching.

## When to Use Client-Side Fetching

| Scenario | Approach | Example |
|----------|----------|---------|
| Real-time data | Polling / WebSockets | Live stock prices |
| User-triggered data | `useEffect` + fetch | Search results |
| After authentication | `useEffect` + fetch | User profile |
| Infinite scroll | Intersection Observer | Social feed |
| Optimistic updates | TanStack Query | Like button |

## Basic Client-Side Fetch

```tsx
'use client'

import { useEffect, useState } from 'react'

export function UserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    fetch('/api/users')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch')
        return res.json()
      })
      .then(data => {
        setUsers(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, []) // Empty deps = fetch once on mount
  
  if (loading) return <div className="skeleton" />
  if (error) return <div className="error">{error}</div>
  
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>
}
```

## With TanStack Query (Recommended)

For production apps, TanStack Query provides caching, re-fetching, loading states, and error handling out of the box:

```tsx
'use client'

import { useQuery } from '@tanstack/react-query'

function fetchUsers() {
  return fetch('/api/users').then(res => {
    if (!res.ok) throw new Error('Failed to fetch')
    return res.json()
  })
}

export function UserList() {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000, // 5 min before re-fetch
  })
  
  if (isLoading) return <div className="skeleton" />
  if (error) return <div className="error">{error.message}</div>
  
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>
}
```

## Polling for Real-Time Data

```tsx
'use client'

import { useQuery } from '@tanstack/react-query'

function fetchMetrics() {
  return fetch('/api/metrics').then(res => res.json())
}

export function LiveMetrics() {
  const { data } = useQuery({
    queryKey: ['metrics'],
    queryFn: fetchMetrics,
    refetchInterval: 5000, // Poll every 5 seconds
  })
  
  return <div>Active users: {data?.activeUsers}</div>
}
```

## Server + Client Pattern

Best practice: server fetches initial data, client handles updates:

```tsx
// Server Component (app/page.tsx)
export default async function Page() {
  const initialProducts = await fetchProducts()
  return <ProductList initialProducts={initialProducts} />
}

// Client Component
'use client'
import { useState } from 'react'

export function ProductList({ initialProducts }) {
  const [products] = useState(initialProducts) // Start with server data
  const [search, setSearch] = useState('')
  
  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  )
  
  return (
    <div>
      <input onChange={e => setSearch(e.target.value)} />
      {filtered.map(p => <div key={p.id}>{p.name}</div>)}
    </div>
  )
}
```

## Common Mistakes
- **Missing cleanup** — `useEffect` without cleanup causes memory leaks on unmount
- **Race conditions** — Multiple fast state updates can show stale data (use a cancel flag or AbortController)
- **Over-fetching** — Fetching data client-side that could be fetched on the server
- **No error handling** — Always handle fetch failures with user-friendly fallbacks

## Best Practices
1. **Start with Server Components** — Client-side fetch only when necessary
2. **Use TanStack Query** — Handles caching, loading, errors, re-fetching
3. **Combine Server + Client** — Server provides initial data, client handles interactivity
4. **Handle all states** — loading, error, empty, and success
5. **Set stale times** — Don't re-fetch data that rarely changes

## Summary
Use client-side fetching for real-time data, user interactions, and post-auth content. Prefer TanStack Query for production apps. Combine server-fetched initial data with client-side interactivity for the best UX.

## Related Topics
- [Data Fetching in Server Components](./topic-1-fetching-data-in-server-components.md)
- [Parallel & Sequential Data Fetching](./topic-2-parallel-and-sequential-data-fetching.md)
- [Streaming & Suspense (Module 4)](../module-4-streaming-suspense/)
