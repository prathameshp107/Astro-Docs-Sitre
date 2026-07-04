# Unit Testing

## Introduction

Unit tests verify individual functions, utilities, and components in isolation. They're fast to run and easy to write.

## Testing Utilities

```ts
// lib/format.ts
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
```

```ts
// tests/format.test.ts
import { describe, it, expect } from 'vitest'
import { formatDate, capitalize } from '@/lib/format'

describe('formatDate', () => {
  it('formats a date correctly', () => {
    const date = new Date('2024-01-15')
    expect(formatDate(date)).toBe('January 15, 2024')
  })
})

describe('capitalize', () => {
  it('capitalizes the first letter', () => {
    expect(capitalize('hello')).toBe('Hello')
  })

  it('handles empty strings', () => {
    expect(capitalize('')).toBe('')
  })
})
```

## Testing Components

```tsx
// components/Greeting.tsx
export function Greeting({ name }: { name: string }) {
  return <h1>Hello, {name}!</h1>
}
```

```tsx
// tests/Greeting.test.tsx
import { render, screen } from '@testing-library/react'
import { Greeting } from '@/components/Greeting'

describe('Greeting', () => {
  it('renders the name', () => {
    render(<Greeting name="Alice" />)
    expect(screen.getByText('Hello, Alice!')).toBeDefined()
  })
})
```

## Running Tests

```bash
# Run all tests
npx vitest

# Run with watch mode
npx vitest --watch

# Run once (CI)
npx vitest run

# Check coverage
npx vitest run --coverage
```

## Common Mistakes

- **Testing implementation details** — Test behavior, not internal state or methods.
- **Too many mocks** — If you need to mock everything, the code might be too coupled.
- **Not testing edge cases** — Empty strings, null values, error states.

## Best Practices

- Test behavior, not implementation
- One assertion per test (or a few related ones)
- Use descriptive test names that explain the expected behavior
- Run tests on every commit (pre-commit hook or CI)

## Summary

Unit tests verify individual functions and components. They're fast and should run on every commit. Test behavior, not implementation. Cover edge cases and error states.

## Related Topics

- [Integration Testing](./integration-testing.md)
- [E2E Testing](./e2e-testing.md)
- [Testing Best Practices](./testing-best-practices.md)
