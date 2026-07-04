---
title: "Clean Code"
description: "Write readable, maintainable code that your team will thank you for."
---

# Clean Code

## Introduction

Clean code is code that is easy to read, understand, and change. It doesn't mean "fancy" or "clever" — in fact, the cleanest code is often the simplest. In a Next.js project, clean code practices help you avoid common pitfalls like deeply nested components, confusing state management, and hard-to-find bugs.

## Why Do We Need This?

- **Readability**: Code is read far more often than it's written
- **Team collaboration**: Clean code reduces review cycles and misunderstandings
- **Debugging**: Clear code makes bugs easier to find and fix
- **Onboarding**: New team members can contribute faster

## Real World Analogy

Clean code is like a well-organized kitchen. When everything has its place and tools are labeled clearly, you can cook a meal efficiently. A messy kitchen with unlabeled containers and scattered tools makes every dish harder to prepare. Your codebase is the same — organization saves time and frustration.

## Key Principles

### 1. Name Things Clearly

Bad names are the most common source of confusion.

**Avoid:**

```tsx
// What is `d`? What does `x` represent?
const d = new Date()
const x = users.filter(u => u.a)

return x.map(u => <Card data={u} />)
```

**Better:**

```tsx
const today = new Date()
const activeUsers = users.filter(user => user.isActive)

return activeUsers.map(user => <Card user={user} />)
```

### 2. Keep Functions Small

A function should do one thing and do it well.

**Avoid:**

```tsx
async function handleUserAction(userId: string) {
  const user = await db.user.findUnique({ where: { id: userId } })
  if (!user) throw new Error('User not found')
  
  const posts = await db.post.findMany({ where: { authorId: userId } })
  const totalViews = posts.reduce((sum, p) => sum + p.views, 0)
  
  await sendEmail(user.email, `Your posts have ${totalViews} views`)
  
  return { user, posts, totalViews }
}
```

**Better:**

```tsx
async function getUser(id: string) { ... }
async function getPostsByAuthor(authorId: string) { ... }
function calculateTotalViews(posts: Post[]) { ... }
async function notifyUser(email: string, message: string) { ... }
```

### 3. Avoid Deep Nesting

Deeply nested code is hard to follow. Return early instead.

**Avoid:**

```tsx
if (user) {
  if (user.isActive) {
    if (user.subscription) {
      // 3 levels deep
    }
  }
}
```

**Better:**

```tsx
if (!user) return null
if (!user.isActive) return <InactiveNotice />
if (!user.subscription) return <SubscribePrompt />

// Main content here
```

### 4. Use Meaningful Comments

Comments should explain **why**, not **what**. The code itself should communicate the "what."

**Avoid:**

```tsx
// Increment counter by 1
count += 1

// Loop through users
users.forEach(user => { ... })
```

**Better:**

```tsx
// Retry because the API sometimes returns 503 temporarily
const MAX_RETRIES = 3

// The free tier shows ads after the first 5 items
const FREE_TIER_LIMIT = 5
```

### 5. Consistent Formatting

Use a formatter (Prettier) and linter (ESLint) to enforce consistency automatically.

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all"
}
```

## Clean Code in Next.js

### Server Components

Server Components should stay focused on data fetching and rendering. Keep them clean by extracting complex logic.

```tsx
// ✅ Clean: Page handles data, UI is extracted
export default async function DashboardPage() {
  const stats = await getDashboardStats()
  const recentOrders = await getRecentOrders()
  
  return (
    <div>
      <DashboardHeader />
      <StatsGrid stats={stats} />
      <RecentOrdersTable orders={recentOrders} />
    </div>
  )
}
```

### Client Components

Client Components should handle interaction, not business logic.

```tsx
// ✅ Clean: Component handles UI, logic is extracted
'use client'

import { useForm } from 'react-hook-form'
import { createUser } from './actions'

export function UserForm() {
  const { register, handleSubmit } = useForm()
  
  return (
    <form onSubmit={handleSubmit(createUser)}>
      <input {...register('name')} />
      <button type="submit">Create User</button>
    </form>
  )
}
```

## Best Practices

- Write code for humans first, computers second
- Follow the **DRY** (Don't Repeat Yourself) principle, but don't over-abstract
- Use TypeScript to make your intentions clear
- Keep components under 200 lines — split them if they grow larger
- Extract repeated JSX into small components
- Use meaningful variable names even in short-lived scopes

## Common Mistakes

- **Over-engineering**: Adding abstraction before you need it
- **Magic numbers**: Using raw numbers without named constants
- **Too many comments**: Letting comments replace clean code instead of supplementing it
- **Inconsistent patterns**: Using different approaches for the same thing in different parts of the project

## Summary

Clean code is a practice, not a destination. Small, consistent habits — better naming, smaller functions, early returns, and extracted logic — compound over time into a codebase that's a pleasure to work with.

## Related Topics

- [Documentation](./documentation)
- [Code Review](./code-review)
- [Refactoring](./refactoring)
- [Naming Conventions](../project-structure/naming-conventions)
