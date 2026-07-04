---
title: "End-to-End Testing"
description: "End-to-end (E2E) tests simulate real user interactions — clicking buttons, filling forms, navigating between pages. They give the highest confidence but ar"
---

# End-to-End Testing

## Introduction

End-to-end (E2E) tests simulate real user interactions — clicking buttons, filling forms, navigating between pages. They give the highest confidence but are slower to run.

## Why Do We Need This?

Unit and integration tests can't catch everything. An E2E test verifies that the complete system works — the browser, the server, the database, and external services all together.

## Playwright Setup

```bash
npm install -D @playwright/test
npx playwright install
```

```ts
// playwright.config.ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run build && npm start',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
})
```

## Basic E2E Test

```ts
// e2e/login.spec.ts
import { test, expect } from '@playwright/test'

test('user can log in', async ({ page }) => {
  await page.goto('/login')
  
  await page.fill('[name="email"]', 'user@example.com')
  await page.fill('[name="password"]', 'password123')
  await page.click('button[type="submit"]')
  
  // Wait for redirect to dashboard
  await expect(page).toHaveURL('/dashboard')
  await expect(page.locator('h1')).toContainText('Dashboard')
})
```

## Testing Common Flows

```ts
test('user can create a post', async ({ page }) => {
  // Login first
  await page.goto('/login')
  await page.fill('[name="email"]', 'admin@example.com')
  await page.fill('[name="password"]', 'admin123')
  await page.click('button[type="submit"]')
  
  // Create a post
  await page.goto('/posts/new')
  await page.fill('[name="title"]', 'My Test Post')
  await page.fill('[name="content"]', 'This is the content of my test post.')
  await page.click('button[type="submit"]')
  
  // Verify the post appears
  await expect(page.locator('text=My Test Post')).toBeVisible()
})
```

## Running E2E Tests

```bash
# Run all E2E tests
npx playwright test

# Run with UI mode
npx playwright test --ui

# Run a specific test
npx playwright test e2e/login.spec.ts

# Show report
npx playwright show-report
```

## Common Mistakes

- **Too many E2E tests** — Each E2E test takes seconds to run. Only test critical user flows. Use unit/integration tests for everything else.
- **Flaky selectors** — Use `page.getByRole()` or `page.getByText()` instead of fragile CSS selectors.
- **Not using test isolation** — Each test should be independent. Log in fresh for each test, don't share state.

## Best Practices

- Use E2E tests sparingly — only for critical user flows (login, checkout, signup)
- Keep tests independent — each test should set up its own state
- Use Playwright's test fixtures for authenticated sessions
- Run E2E tests in CI before deployment
- Use `trace: 'on-first-retry'` to debug flaky tests

## Summary

E2E tests with Playwright simulate real user interactions. Use them for critical flows only (login, checkout, signup). Keep tests independent and run them before deployment. Use the Playwright trace viewer to debug failures.

## Related Topics

- [Unit Testing](./unit-testing.md)
- [Integration Testing](./integration-testing.md)
- [Testing Best Practices](./testing-best-practices.md)
