---
title: "Refactoring"
description: "Improve your code structure without breaking existing functionality."
---

# Refactoring

## Introduction

Refactoring is the process of improving your code's structure without changing its behavior. Think of it as tidying up your code — rearranging, renaming, and restructuring so that it's easier to work with. In a Next.js project, regular refactoring keeps your codebase healthy and adaptable.

## Why Do We Need This?

- **Reduces technical debt**: Small problems don't become big problems
- **Improves readability**: Cleaner code is easier to understand
- **Makes changes safer**: Well-structured code is less likely to break
- **Speeds up development**: You move faster in a well-organized codebase

## Real World Analogy

Refactoring is like reorganizing your toolbox. You don't change what the tools do — you just make sure the wrench is in the wrench drawer. When you need it next time, you find it immediately instead of digging through a pile.

## When to Refactor

### The "Rule of Three"

When you've written the same pattern three times, refactor it into a reusable abstraction.

```tsx
// Before: Repeated fetch patterns
async function getUsers() {
  const res = await fetch('/api/users')
  if (!res.ok) throw new Error('Failed to fetch')
  return res.json()
}

async function getPosts() {
  const res = await fetch('/api/posts')
  if (!res.ok) throw new Error('Failed to fetch')
  return res.json()
}

// After: Reusable fetcher
async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url}`)
  return res.json()
}

const getUsers = () => fetcher<User[]>('/api/users')
const getPosts = () => fetcher<Post[]>('/api/posts')
```

### During Code Reviews

When you see patterns that could be improved, flag them in the review and plan to refactor.

### Before Adding Features

Refactoring existing code before adding new features makes the new code cleaner and easier to integrate.

## Common Refactoring Patterns

### 1. Extract Component

When a component grows too large, extract parts into smaller components.

```tsx
// Before: One big component
export default function Dashboard() {
  return (
    <div>
      {/* 50 lines of user stats */}
      {/* 30 lines of recent orders */}
      {/* 40 lines of notifications */}
    </div>
  )
}

// After: Extracted components
export default function Dashboard() {
  return (
    <div>
      <UserStats />
      <RecentOrders />
      <Notifications />
    </div>
  )
}
```

### 2. Extract Function

Move complex logic out of components.

```tsx
// Before: Logic mixed with JSX
export function OrderList({ orders }: { orders: Order[] }) {
  const filtered = orders.filter(order => {
    const daysAgo = (Date.now() - new Date(order.createdAt).getTime()) / 86400000
    return daysAgo <= 30 && order.status !== 'cancelled'
  })

  return filtered.map(order => <OrderCard key={order.id} order={order} />)
}

// After: Extracted helper
function isRecentOrder(order: Order): boolean {
  const daysAgo = (Date.now() - new Date(order.createdAt).getTime()) / 86400000
  return daysAgo <= 30 && order.status !== 'cancelled'
}

export function OrderList({ orders }: { orders: Order[] }) {
  return orders
    .filter(isRecentOrder)
    .map(order => <OrderCard key={order.id} order={order} />)
}
```

### 3. Consolidate Duplicate State

Avoid keeping the same data in multiple state variables.

```tsx
// Before: Multiple state variables that overlap
const [users, setUsers] = useState<User[]>([])
const [selectedUser, setSelectedUser] = useState<User | null>(null)
const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

// After: Derived state
const [users, setUsers] = useState<User[]>([])
const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
const selectedUser = users.find(u => u.id === selectedUserId) ?? null
```

### 4. Replace Switch with Object Map

```tsx
// Before: Long switch statement
function getStatusColor(status: string) {
  switch (status) {
    case 'active': return 'green'
    case 'pending': return 'yellow'
    case 'suspended': return 'red'
    case 'archived': return 'gray'
    default: return 'blue'
  }
}

// After: Object map
const STATUS_COLORS: Record<string, string> = {
  active: 'green',
  pending: 'yellow',
  suspended: 'red',
  archived: 'gray',
}

function getStatusColor(status: string) {
  return STATUS_COLORS[status] ?? 'blue'
}
```

## Safe Refactoring Steps

1. **Understand the code** — Read the existing code and its tests
2. **Write tests** — If there are no tests, add them first
3. **Make small changes** — One refactor at a time
4. **Run tests** — Verify nothing broke
5. **Commit** — Each refactor is a separate commit
6. **Repeat** — Incremental improvements over time

## Refactoring in Next.js

### Migrate from Pages to App Router

```
Before: pages/products/[id].tsx
After:  app/products/[id]/page.tsx
```

### Improve Data Fetching

```tsx
// Before: Client-side fetch
'use client'
export function ProductPage({ id }: { id: string }) {
  const [product, setProduct] = useState<Product | null>(null)
  
  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(setProduct)
  }, [id])
  
  if (!product) return <Loading />
  return <ProductDetail product={product} />
}

// After: Server Component
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = await getProduct(id) // Direct database call
  
  return <ProductDetail product={product} />
}
```

## Best Practices

- Refactor in **small, focused commits** — one change at a time
- **Always have tests** before refactoring
- Use your IDE's **rename symbol** feature for safe renaming
- Refactor **while the code is fresh** in your mind
- Don't refactor and add features in the same commit
- **Measure twice, cut once** — understand the code before changing it

## Common Mistakes

- **Refactoring without tests**: You won't know if you broke something
- **Over-refactoring**: Making code "perfect" instead of "good enough"
- **Changing APIs**: Refactoring internal structure is different from changing public interfaces
- **Scope creep**: Starting to refactor and ending up rewriting everything
- **Refactoring production code directly**: Always use branches and PRs

## Summary

Refactoring is an ongoing investment in your codebase's health. Small, regular improvements — extracting components, consolidating logic, and simplifying patterns — prevent technical debt from accumulating and keep your Next.js project maintainable as it grows.

## Related Topics

- [Clean Code](./clean-code)
- [Code Review](./code-review)
- [Project Checklist](./project-checklist)
