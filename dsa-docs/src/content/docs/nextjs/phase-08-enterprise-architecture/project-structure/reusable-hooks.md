# Reusable Hooks

## Introduction

Custom hooks let you extract stateful logic from components into reusable functions. They reduce duplication and make components easier to understand.

## Why Do We Need This?

Without hooks, each component would need to repeat the same logic — fetching data, handling forms, managing local storage. Hooks encapsulate this logic and share it across components.

## Common Custom Hooks

### useUser

```ts
// hooks/use-user.ts
import { useSession } from 'next-auth/react'

export function useUser() {
  const { data: session, status } = useSession()
  
  return {
    user: session?.user ?? null,
    isLoggedIn: status === 'authenticated',
    isLoading: status === 'loading',
  }
}
```

### useFetch

```ts
// hooks/use-fetch.ts
import { useState, useEffect } from 'react'

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  
  useEffect(() => {
    setLoading(true)
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [url])
  
  return { data, loading, error }
}
```

### useLocalStorage

```ts
// hooks/use-local-storage.ts
import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initial
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : initial
  })
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  
  return [value, setValue] as const
}
```

## Best Practices

- Name hooks starting with `use` for React to detect rule violations
- Keep hooks focused on a single concern
- Return stable references (avoid creating new objects on every render)
- Type hooks with TypeScript generics for reuse

## Summary

Custom hooks extract reusable stateful logic from components. They reduce duplication and encapsulate complex behavior. Keep them focused, well-typed, and composable.

## Related Topics

- [Shared Components](./shared-components.md)
- [Reusable Utilities](../code-organization/reusable-utilities.md)
- [Separating Concerns](../code-organization/separating-concerns.md)
