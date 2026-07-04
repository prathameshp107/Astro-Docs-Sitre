# API Layer

## Introduction

An API layer centralizes how your application communicates with backend services. Instead of scattering `fetch()` calls across components, you create a consistent interface for all API interactions.

## Why Do We Need This?

When `fetch()` calls are scattered across components:

- Changing an endpoint requires updating every component that uses it
- Error handling is inconsistent
- Authentication headers are added in multiple places
- Testing requires mocking fetch in every component

A centralized API layer solves all of these.

## Client-Side API Client

```ts
// lib/api-client.ts
class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
  }
}

class ApiClient {
  private baseUrl: string
  
  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api'
  }
  
  private async request<T>(path: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    })
    
    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: 'Request failed' }))
      throw new ApiError(res.status, error.message)
    }
    
    return res.json()
  }
  
  async get<T>(path: string): Promise<T> {
    return this.request<T>(path)
  }
  
  async post<T>(path: string, data: unknown): Promise<T> {
    return this.request<T>(path, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }
  
  async put<T>(path: string, data: unknown): Promise<T> {
    return this.request<T>(path, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }
  
  async delete<T>(path: string): Promise<T> {
    return this.request<T>(path, { method: 'DELETE' })
  }
}

export const api = new ApiClient()
```

```tsx
// Usage in a component
import { api } from '@/lib/api-client'
import { useQuery } from '@tanstack/react-query'

export function PostList() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: () => api.get<Post[]>('/posts'),
  })
}
```

## Server-Side Data Access

```ts
// lib/services/posts.ts
import { db } from '@/lib/db'

export async function getPublishedPosts() {
  return db.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    include: { author: { select: { name: true } } },
  })
}

export async function getPostBySlug(slug: string) {
  return db.post.findUnique({
    where: { slug },
    include: { author: true, tags: true },
  })
}
```

## Common Mistakes

- **Direct fetch calls in components** — Components should call the API client, not `fetch` directly.
- **No error handling** — Every API call should handle errors gracefully.
- **Inconsistent authentication** — Add auth headers in the API client, not in individual calls.

## Best Practices

- Create a single API client with consistent error handling
- Use TypeScript generics for typed responses
- Add authentication headers in the client (once)
- Use TanStack Query (React Query) for server state management
- Extract service functions for server-side data access

## Summary

An API layer centralizes how your app communicates with backend services. Build a typed API client with consistent error handling. Use it across all components. On the server side, use service functions for database access.

## Related Topics

- [Reusable Utilities](./reusable-utilities.md)
- [Separating Concerns](./separating-concerns.md)
- [Environment Management](./environment-management.md)
