# Integration Testing

## Introduction

Integration tests verify that multiple parts of your application work together — a page that fetches data, a form that submits to an API, or an API route that queries a database.

## Testing API Routes

```ts
// app/api/posts/route.ts
export async function GET() {
  const posts = await db.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    take: 10,
  })
  return NextResponse.json({ data: posts })
}
```

```ts
// tests/api/posts.test.ts
import { describe, it, expect } from 'vitest'

describe('GET /api/posts', () => {
  it('returns published posts', async () => {
    const response = await fetch('http://localhost:3000/api/posts')
    const body = await response.json()
    
    expect(response.status).toBe(200)
    expect(body.data).toBeInstanceOf(Array)
  })
})
```

## Testing Server Actions

> **Note:** Server Actions depend on the Next.js runtime (`revalidatePath`, request context). In practice, you'll either: (a) test them by making HTTP requests to a running dev server, or (b) extract business logic into separate testable functions.

```ts
// lib/user-service.ts
// Extract business logic from the Server Action
export async function createUserInDb(email: string, name: string) {
  return db.user.create({ data: { email, name } })
}
```

```ts
// tests/user-service.test.ts
import { describe, it, expect } from 'vitest'

describe('createUserInDb', () => {
  it('creates a user with valid data', async () => {
    const user = await createUserInDb('test@example.com', 'Test User')
    expect(user.id).toBeDefined()
  })
})
```

## Testing Pages

```tsx
import { render, screen } from '@testing-library/react'
import PostsPage from '@/app/posts/page'

describe('PostsPage', () => {
  it('renders the page title', async () => {
    const page = await PostsPage()
    render(page)
    expect(screen.getByText('Posts')).toBeDefined()
  })
})
```

## Common Mistakes

- **Not cleaning up test data** — Each test should start with a clean state. Use database transactions or test-specific databases.
- **Testing with production data** — Never run tests against a production database. Use a test database or mocking.
- **Flaky tests** — Tests that pass sometimes and fail other times destroy confidence. Make tests deterministic.

## Best Practices

- Use a test database or transaction rollbacks for clean state
- Mock external services (APIs, email, payments)
- Test both success and error cases
- Keep tests independent — they should be runnable in any order

## Summary

Integration tests verify that features work together — API routes, Server Actions, and pages. Use test databases for clean state and mock external services. Test both happy paths and error scenarios.

## Related Topics

- [Unit Testing](./unit-testing.md)
- [E2E Testing](./e2e-testing.md)
- [Testing Best Practices](./testing-best-practices.md)
