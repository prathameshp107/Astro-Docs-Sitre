---
title: "Production Review, Practice & Interview Prep"
description: "This document covered three essential production concerns for any Next.js application:"
---

# Summary

This document covered three essential production concerns for any Next.js application:

**Section 18 — Error Handling** teaches you to build resilient applications that catch failures gracefully using `error.tsx`, `global-error.tsx`, `not-found.tsx`, and `loading.tsx`. You learned how to log errors, build fallback UIs, and handle API errors correctly.

**Section 19 — Deployment** covers the full journey from code to production. You now understand how to deploy on Vercel, Docker, AWS, and VPS servers. You know how to manage environment variables, build production bundles, set up CI/CD pipelines, configure domains, and monitor your app.

**Section 20 — Testing** gives you the foundation to write confident code. Unit tests, integration tests, and E2E tests each serve a distinct purpose. Jest, React Testing Library, and Playwright are the industry-standard tools to master.

---

# Key Takeaways

1. **`error.tsx` must be a Client Component** — this is the most common mistake developers make
2. **`notFound()` is cleaner than returning null** — always use it for missing resources
3. **Never commit `.env` files** — use CI/CD secrets management
4. **Use `npm ci` not `npm install`** in production and CI environments
5. **Test behavior, not implementation** — query by role/label, not CSS classes
6. **E2E tests are not a replacement** for unit and integration tests — use all three layers
7. **`output: 'standalone'`** dramatically reduces Docker image size
8. **MSW is the gold standard** for mocking API calls in tests

---

# Practice Exercises

## Beginner
1. Create a route `app/products/[id]/page.tsx` that calls `notFound()` when a product doesn't exist
2. Add a `loading.tsx` skeleton to your homepage
3. Write a unit test for a `formatPrice(price: number): string` utility function

## Intermediate
4. Implement a global error boundary with Sentry logging
5. Dockerize a Next.js app with a multi-stage build
6. Write integration tests for a login form including validation states
7. Set up a GitHub Actions workflow that runs tests on every PR

## Advanced
8. Build a CI/CD pipeline that deploys to staging on PRs and production on merges to main
9. Implement exponential backoff retry logic for API calls and write tests for it
10. Write Playwright tests for an authenticated user flow including cookie handling

---

# Mini Project Ideas

## 1. Error Handling Project
**Goal:** Build a dashboard that handles all error states gracefully.
- Product listing page with `error.tsx` for failed API calls
- Individual product page with `notFound()` for missing items
- `loading.tsx` skeleton screens for all data-fetching pages
- Global error boundary with `global-error.tsx`
- Sentry integration for error logging
- Error summary page (`/admin/errors`) showing recent errors

## 2. Deploying a Blog Application
**Goal:** Take a Next.js blog from local dev to fully deployed production.
- Build with App Router, MDX for posts, Tailwind CSS
- Dockerize with `output: 'standalone'`
- Deploy to both Vercel (easy) and a VPS with Nginx + PM2
- Configure custom domain + SSL via Certbot
- Set up GitHub Actions for automated deployments
- Add an `/api/health` endpoint for uptime monitoring

## 3. Testing a Dashboard App
**Goal:** Achieve 80%+ test coverage on a metrics dashboard.
- Unit tests for all data transformation utilities
- Integration tests for dashboard components using RTL
- Mock API responses using MSW
- E2E test with Playwright covering: login → view dashboard → filter data → logout
- CI integration with coverage report on every PR

---

# Interview Preparation

## Beginner Questions

| Question | Key Points to Cover |
|----------|---------------------|
| What is the purpose of `error.tsx` in Next.js? | Client Component, receives `error` + `reset`, segment-level |
| How do you show a 404 page in Next.js? | `not-found.tsx` file + `notFound()` function |
| What is the difference between dev and production builds? | Minification, tree-shaking, optimized images, `.next` folder |
| What is `npm run build` used for? | Compiles + optimizes app, required before `npm start` |
| What does a unit test do? | Tests a single function/component in isolation |

## Intermediate Questions

| Question | Key Points to Cover |
|----------|---------------------|
| How does the `reset()` function work in error boundaries? | Re-renders the segment, does not refresh the page |
| What is the difference between Vercel and a VPS deployment? | Serverless vs persistent process, auto-scaling vs manual |
| How do you pass secrets to a Next.js app in production? | Environment variables, CI/CD secret managers |
| Why use `waitFor` in React Testing Library? | Async state updates, DOM changes after fetch |
| What is MSW and why is it better than mocking `fetch`? | Intercepts at network level, more realistic, reusable |

## Advanced Questions

| Question | Key Points to Cover |
|----------|---------------------|
| How does error boundary scoping work with nested layouts? | Each `error.tsx` catches errors in its subtree, not parent layout |
| How would you handle zero-downtime deployments? | Blue-green deployments, rolling updates, health checks |
| What is the `digest` property on server-side errors? | Hashed identifier safe to show users, maps to server logs |
| How do you test Next.js Server Components? | Different strategy — test output HTML, use `@testing-library/react` |
| How would you optimize Docker image size for Next.js? | Multi-stage builds, `output: 'standalone'`, Alpine base image |
| What metrics would you monitor in a production Next.js app? | Core Web Vitals, error rate, p95 latency, memory usage |

---

> **Next in the Series:** Part 5 will cover Advanced Topics: Middleware, Internationalization (i18n), Performance Optimization, and Building a Full-Stack Application.

---

*Last updated: May 2026 · Next.js 14+ App Router · TypeScript*
