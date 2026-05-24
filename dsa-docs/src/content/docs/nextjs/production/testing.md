---
title: "Testing"
description: "Testing is the practice of verifying that your application behaves as expected under various conditions. It involves writing automated code that exercises"
---

# Section 20: Testing

## 20.1 What Is Testing?

Testing is the practice of **verifying that your application behaves as expected** under various conditions. It involves writing automated code that exercises your application and asserts specific outcomes.

> **Simple analogy:** Testing is like a pre-flight checklist for a pilot. You check each system (engine, instruments, controls) before every flight to ensure nothing is broken — even if nothing seemed wrong yesterday.

---

## 20.2 Why Testing Matters

| Benefit | Description |
|---------|-------------|
| **Confidence** | Deploy without fear of breaking things |
| **Regression prevention** | Old bugs don't come back |
| **Documentation** | Tests describe expected behavior |
| **Refactoring safety** | Change code freely with a safety net |
| **Team velocity** | Faster review, clearer contracts between components |

---

## 20.3 The Testing Pyramid

```txt
<svg viewBox="0 0 500 340" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, sans-serif">
  <rect width="500" height="340" rx="12" fill="#0f172a"/>
  <text x="250" y="28" text-anchor="middle" fill="#f1f5f9" font-size="15" font-weight="700">Testing Pyramid</text>

  <!-- E2E layer (top - small) -->
  <polygon points="250,55 175,155 325,155" fill="#7c3aed"/>
  <text x="250" y="108" text-anchor="middle" fill="#ede9fe" font-size="11" font-weight="700">E2E Tests</text>
  <text x="250" y="124" text-anchor="middle" fill="#c4b5fd" font-size="9">Cypress / Playwright</text>
  <text x="250" y="140" text-anchor="middle" fill="#c4b5fd" font-size="9">Slow · Expensive · Few</text>

  <!-- Integration layer (middle) -->
  <polygon points="175,165 100,255 400,255" fill="#1d4ed8"/>
  <text x="250" y="205" text-anchor="middle" fill="#dbeafe" font-size="11" font-weight="700">Integration Tests</text>
  <text x="250" y="220" text-anchor="middle" fill="#93c5fd" font-size="9">React Testing Library</text>
  <text x="250" y="236" text-anchor="middle" fill="#93c5fd" font-size="9">Medium speed · Medium count</text>

  <!-- Unit layer (bottom - wide) -->
  <polygon points="100,265 50,315 450,315" fill="#065f46"/>
  <text x="250" y="293" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="700">Unit Tests</text>
  <text x="250" y="308" text-anchor="middle" fill="#34d399" font-size="9">Jest · Fast · Cheap · Many</text>

  <!-- Labels right -->
  <text x="350" y="108" fill="#a78bfa" font-size="10">5–10%</text>
  <text x="418" y="210" fill="#93c5fd" font-size="10">20–30%</text>
  <text x="455" y="295" fill="#34d399" font-size="10">60–70%</text>
</svg>
```

---

## 20.4 Types of Testing

### Unit Testing
Tests **individual functions or components** in isolation.
- Fast to run
- Easy to write
- No network or database needed

### Integration Testing
Tests **how multiple units work together** — components with context, API calls, routing.
- Slower than unit tests
- More realistic
- May require mocking

### End-to-End (E2E) Testing
Tests the **entire application flow** from the user's perspective in a real browser.
- Slowest
- Most realistic
- Catches issues other tests miss

---

## 20.5 Testing Tools

| Tool | Type | Purpose |
|------|------|---------|
| **Jest** | Unit / Integration | Test runner, assertions, mocking |
| **React Testing Library** | Integration | Render and interact with React components |
| **Cypress** | E2E | Browser automation, visual testing |
| **Playwright** | E2E | Cross-browser automation by Microsoft |
| **MSW (Mock Service Worker)** | Mocking | Intercept API calls in tests |
| **Testing Library / user-event** | Integration | Simulate real user interactions |

---

## 20.6 Setting Up Jest + React Testing Library

```bash
# Install dependencies
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event ts-jest
```

```js
// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './', // Next.js project root
});

const customConfig = {
  setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
};

module.exports = createJestConfig(customConfig);
```

```ts
// jest.setup.ts
import '@testing-library/jest-dom';
```

---

## 20.7 Writing Tests: `describe`, `it`, `expect`

```tsx
// components/__tests__/Button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/Button';

// describe() groups related tests
describe('Button Component', () => {

  // it() (alias: test()) describes a single test case
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);

    // expect() makes an assertion
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn(); // Mock function

    render(<Button onClick={handleClick}>Submit</Button>);

    await user.click(screen.getByRole('button'));

    // expect().toHaveBeenCalledTimes() checks mock call count
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when the disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

---

## 20.8 Testing Async Code

```tsx
// components/__tests__/UserProfile.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { UserProfile } from '@/components/UserProfile';

// Mock the fetch globally
global.fetch = jest.fn();

describe('UserProfile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state initially', () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ name: 'Alice', email: 'alice@example.com' }),
    });

    render(<UserProfile userId="1" />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('displays user data after fetch', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ name: 'Alice', email: 'alice@example.com' }),
    });

    render(<UserProfile userId="1" />);

    // waitFor retries until assertion passes or times out
    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
    });
  });

  it('shows error when fetch fails', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    render(<UserProfile userId="1" />);

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });
});
```

---

## 20.9 Mocking APIs with MSW

```tsx
// __mocks__/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/users/:id', ({ params }) => {
    return HttpResponse.json({
      id: params.id,
      name: 'Mock User',
      email: 'mock@test.com',
    });
  }),

  http.post('/api/users', async ({ request }) => {
    const body = await request.json() as { name: string };
    return HttpResponse.json({ id: '123', ...body }, { status: 201 });
  }),
];
```

```tsx
// jest.setup.ts (add MSW setup)
import { setupServer } from 'msw/node';
import { handlers } from './__mocks__/handlers';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

---

## 20.10 Testing Forms

```tsx
// components/__tests__/LoginForm.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from '@/components/LoginForm';

describe('LoginForm', () => {
  it('shows validation error for empty email', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
  });

  it('submits form with valid credentials', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    render(<LoginForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/email/i), 'user@test.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: 'user@test.com',
        password: 'password123',
      });
    });
  });
});
```

---

## 20.11 Testing Lifecycle Diagram

```txt
<svg viewBox="0 0 700 280" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, sans-serif">
  <rect width="700" height="280" rx="14" fill="#0f172a"/>
  <text x="350" y="28" text-anchor="middle" fill="#f1f5f9" font-size="15" font-weight="700">Testing Lifecycle in Next.js</text>

  <!-- Boxes in sequence -->
  <!-- Write component -->
  <rect x="20" y="60" width="120" height="60" rx="8" fill="#1e40af"/>
  <text x="80" y="84" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">Write</text>
  <text x="80" y="100" text-anchor="middle" fill="#93c5fd" font-size="10">Component</text>
  <text x="80" y="114" text-anchor="middle" fill="#93c5fd" font-size="9">+ Logic</text>

  <line x1="140" y1="90" x2="170" y2="90" stroke="#475569" stroke-width="2" marker-end="url(#tc1)"/>

  <!-- Write test -->
  <rect x="170" y="60" width="120" height="60" rx="8" fill="#1e40af"/>
  <text x="230" y="84" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">Write Test</text>
  <text x="230" y="100" text-anchor="middle" fill="#93c5fd" font-size="10">describe()</text>
  <text x="230" y="114" text-anchor="middle" fill="#93c5fd" font-size="9">it() · expect()</text>

  <line x1="290" y1="90" x2="320" y2="90" stroke="#475569" stroke-width="2" marker-end="url(#tc1)"/>

  <!-- Run tests -->
  <rect x="320" y="60" width="120" height="60" rx="8" fill="#1e40af"/>
  <text x="380" y="84" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">Run Tests</text>
  <text x="380" y="100" text-anchor="middle" fill="#93c5fd" font-size="10">jest --watch</text>
  <text x="380" y="114" text-anchor="middle" fill="#93c5fd" font-size="9">npm test</text>

  <line x1="440" y1="90" x2="470" y2="90" stroke="#475569" stroke-width="2" marker-end="url(#tc1)"/>

  <!-- Pass/Fail -->
  <polygon points="560,65 640,90 560,115 480,90" fill="#374151" stroke="#6b7280"/>
  <text x="560" y="87" text-anchor="middle" fill="#f9fafb" font-size="10" font-weight="600">All</text>
  <text x="560" y="101" text-anchor="middle" fill="#f9fafb" font-size="10" font-weight="600">Pass?</text>

  <!-- Yes: deploy -->
  <line x1="640" y1="90" x2="670" y2="90" stroke="#34d399" stroke-width="2" marker-end="url(#tc2)"/>
  <rect x="650" y="65" width="40" height="50" rx="8" fill="#065f46"/>
  <text x="670" y="92" text-anchor="middle" fill="#6ee7b7" font-size="9">✅ CI</text>

  <!-- No: fix -->
  <line x1="560" y1="115" x2="560" y2="165" stroke="#f87171" stroke-width="2" marker-end="url(#tc3)"/>
  <rect x="480" y="165" width="160" height="50" rx="8" fill="#7f1d1d"/>
  <text x="560" y="185" text-anchor="middle" fill="#fecaca" font-size="11" font-weight="600">❌ Fix Code</text>
  <text x="560" y="201" text-anchor="middle" fill="#fca5a5" font-size="10">Debug failing test</text>

  <!-- Loop back -->
  <path d="M480 190 Q400 190 380 150" stroke="#f87171" stroke-width="1.5" fill="none" stroke-dasharray="4,3" marker-end="url(#tc3)"/>

  <!-- Bottom: coverage -->
  <rect x="130" y="235" width="440" height="35" rx="8" fill="#1e293b" stroke="#475569"/>
  <text x="350" y="249" text-anchor="middle" fill="#94a3b8" font-size="11" font-weight="600">Code Coverage Report</text>
  <text x="350" y="263" text-anchor="middle" fill="#64748b" font-size="9">Statements · Branches · Functions · Lines → jest --coverage</text>

  <defs>
    <marker id="tc1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#475569"/>
    </marker>
    <marker id="tc2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#34d399"/>
    </marker>
    <marker id="tc3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#f87171"/>
    </marker>
  </defs>
</svg>
```

---

## 20.12 End-to-End Testing with Playwright

```bash
# Install Playwright
npm install -D @playwright/test
npx playwright install
```

```ts
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

```ts
// e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('user can log in with valid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[name="email"]', 'user@test.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');

    // Wait for redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByText('Welcome back')).toBeVisible();
  });

  test('shows error for invalid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[name="email"]', 'wrong@test.com');
    await page.fill('input[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    await expect(page.getByText('Invalid credentials')).toBeVisible();
  });
});
```

---

## 20.13 Cypress vs Playwright Comparison

| Feature | Cypress | Playwright |
|---------|---------|------------|
| **Browser Support** | Chrome, Firefox, Edge | Chromium, Firefox, WebKit |
| **Language** | JS/TS | JS/TS, Python, Java, C# |
| **Speed** | Moderate | Fast |
| **Parallel execution** | Paid plan | Built-in (free) |
| **Auto-waiting** | ✅ Yes | ✅ Yes |
| **Network mocking** | ✅ Yes | ✅ Yes |
| **Mobile viewport** | ✅ Yes | ✅ Yes |
| **Screenshot/Video** | ✅ Yes | ✅ Yes |
| **Community size** | Very large | Growing fast |
| **API testing** | Limited | Built-in |
| **Best for** | Traditional SPA testing | Modern cross-browser |

---

## 20.14 Unit vs Integration Testing Comparison

| Aspect | Unit Testing | Integration Testing |
|--------|-------------|---------------------|
| **What is tested** | Single function/component | Multiple units together |
| **Speed** | Very fast (ms) | Moderate (seconds) |
| **Isolation** | Full (mocked deps) | Partial (real components) |
| **Confidence level** | Low-Medium | Medium-High |
| **Test count** | Many (hundreds) | Moderate (tens) |
| **Finds bugs** | Logic errors | Integration issues |
| **Example** | `formatDate()` function | Login form → API call |

---

## 20.15 Component Testing Workflow

```txt
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, sans-serif">
  <rect width="660" height="240" rx="12" fill="#0f172a"/>
  <text x="330" y="26" text-anchor="middle" fill="#f1f5f9" font-size="14" font-weight="700">Component Testing Workflow</text>

  <!-- render() -->
  <rect x="20" y="55" width="120" height="55" rx="8" fill="#1e40af"/>
  <text x="80" y="78" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">1. render()</text>
  <text x="80" y="95" text-anchor="middle" fill="#93c5fd" font-size="9">Mount component</text>
  <text x="80" y="108" text-anchor="middle" fill="#93c5fd" font-size="9">into DOM</text>

  <line x1="140" y1="82" x2="170" y2="82" stroke="#475569" stroke-width="2" marker-end="url(#cw1)"/>

  <!-- query DOM -->
  <rect x="170" y="55" width="120" height="55" rx="8" fill="#1e40af"/>
  <text x="230" y="78" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">2. Query DOM</text>
  <text x="230" y="95" text-anchor="middle" fill="#93c5fd" font-size="9">getByRole()</text>
  <text x="230" y="108" text-anchor="middle" fill="#93c5fd" font-size="9">getByText()</text>

  <line x1="290" y1="82" x2="320" y2="82" stroke="#475569" stroke-width="2" marker-end="url(#cw1)"/>

  <!-- user interaction -->
  <rect x="320" y="55" width="120" height="55" rx="8" fill="#1e40af"/>
  <text x="380" y="78" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">3. Interact</text>
  <text x="380" y="95" text-anchor="middle" fill="#93c5fd" font-size="9">userEvent.click()</text>
  <text x="380" y="108" text-anchor="middle" fill="#93c5fd" font-size="9">userEvent.type()</text>

  <line x1="440" y1="82" x2="470" y2="82" stroke="#475569" stroke-width="2" marker-end="url(#cw1)"/>

  <!-- Assert -->
  <rect x="470" y="55" width="160" height="55" rx="8" fill="#065f46"/>
  <text x="550" y="78" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="600">4. Assert</text>
  <text x="550" y="95" text-anchor="middle" fill="#34d399" font-size="9">expect().toBeInTheDocument()</text>
  <text x="550" y="108" text-anchor="middle" fill="#34d399" font-size="9">expect().toHaveValue()</text>

  <!-- Key principle box -->
  <rect x="100" y="150" width="460" height="70" rx="10" fill="#1e293b" stroke="#334155"/>
  <text x="330" y="172" text-anchor="middle" fill="#94a3b8" font-size="12" font-weight="700">💡 Key Principle: Test behavior, not implementation</text>
  <text x="330" y="192" text-anchor="middle" fill="#64748b" font-size="10">✅ "User sees 'Welcome Alice'" — ❌ "state.userName === 'Alice'"</text>
  <text x="330" y="208" text-anchor="middle" fill="#64748b" font-size="10">Query by role/label (a11y) — not by CSS class or internal IDs</text>

  <defs>
    <marker id="cw1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#475569"/>
    </marker>
  </defs>
</svg>
```

---

## 20.16 Best Practices for Testing

- ✅ Follow the Testing Trophy (favoring integration tests over pure unit)
- ✅ Query by accessibility attributes (`getByRole`, `getByLabelText`)
- ✅ Avoid testing implementation details (internal state, CSS classes)
- ✅ Use `userEvent` over `fireEvent` for realistic interactions
- ✅ Mock only what you must — prefer real implementations
- ✅ Keep tests close to the code they test (`__tests__` folder or `.test.tsx` alongside)
- ✅ Run tests in CI on every push
- ✅ Aim for 70–80% coverage — 100% is usually not worth the cost

---

## 20.17 Common Mistakes in Testing

| Mistake | Problem | Fix |
|---------|---------|-----|
| Testing implementation details | Tests break on refactor | Test behavior visible to users |
| Not awaiting async operations | Flaky tests | Use `waitFor`, `findBy*` |
| Over-mocking | Tests don't reflect reality | Use MSW for API mocks |
| No `act()` around state updates | Warning floods | Use RTL which handles this |
| Testing third-party libraries | Wasted effort | Trust library authors |
| Snapshot tests everywhere | Noisy diffs, brittle | Use sparingly for stable UI |

---

## 20.18 Interview Questions — Testing

**Beginner:**
1. What is the difference between unit, integration, and E2E testing?
2. Why should you query by role instead of test ID?
3. What does `jest.fn()` do?

**Intermediate:**
4. How does Mock Service Worker (MSW) differ from mocking `fetch` directly?
5. What is the `waitFor` utility and when do you use it?
6. How would you test a form with validation in React Testing Library?

**Advanced:**
7. How do you handle testing of Next.js Server Components vs Client Components?
8. What strategy would you use to achieve stable, non-flaky E2E tests?
9. How do you test custom React hooks?

---
