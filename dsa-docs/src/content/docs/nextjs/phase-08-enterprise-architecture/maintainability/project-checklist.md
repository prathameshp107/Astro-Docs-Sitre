---
title: "Project Checklist"
description: "A practical checklist to ensure your Next.js project is well-organized, maintainable, and ready for production."
---

# Project Checklist

## Introduction

This checklist brings together everything from this phase into a practical reference. Use it when starting a new project, reviewing an existing one, or preparing for a production launch. Not every item applies to every project — adapt it to your needs.

## 🏗️ Project Structure

- [ ] Project root has a clear, descriptive `README.md`
- [ ] `src/` directory is used for application code
- [ ] Feature-based folders for routes and components
- [ ] Shared components are in a `components/` or `components/ui/` directory
- [ ] Utility functions are organized by domain (`lib/auth.ts`, `lib/db.ts`, etc.)
- [ ] Configuration files are at the root level (`next.config.ts`, `tailwind.config.ts`)
- [ ] Types are defined close to where they're used or in a shared `types/` directory
- [ ] Environment variables use `.env.local` (local) and `.env.example` (template)

## 🧩 Components

- [ ] Components use Server Components by default
- [ ] Client Components have a clear `'use client'` directive
- [ ] Reusable UI components accept consistent props
- [ ] Components are small (under 200 lines)
- [ ] Large components are split into smaller pieces
- [ ] No inline styles — use Tailwind, CSS Modules, or CSS-in-JS
- [ ] Loading states (loading.tsx) for pages with data fetching
- [ ] Error boundaries (error.tsx) for page-level error handling

## 🔐 Security

- [ ] Environment variables use the correct prefix (`NEXT_PUBLIC_` for client)
- [ ] API routes validate input (Zod, Yup, or similar)
- [ ] No sensitive data exposed in client components
- [ ] Rate limiting on public API routes
- [ ] Authentication checks on protected routes (middleware)
- [ ] Authorization checks on API routes (ownership/role verification)
- [ ] CORS configured if API is accessed from external domains

## 📡 Data Fetching

- [ ] Server Components used for initial data fetching
- [ ] Appropriate caching strategy for each data source
- [ ] Error handling for failed fetches
- [ ] Loading states for slow data
- [ ] Revalidation strategy (ISR, revalidatePath, revalidateTag)
- [ ] No duplicate fetches (deduplication via caching)

## 📝 Code Quality

- [ ] TypeScript enabled with strict mode
- [ ] ESLint configured and running
- [ ] Prettier configured for consistent formatting
- [ ] No `any` types (except for truly dynamic data)
- [ ] No console.log in production-ready code (use a proper logger)
- [ ] Dead code and unused imports removed
- [ ] Meaningful variable and function names

## 🧪 Testing

- [ ] Critical utility functions have unit tests
- [ ] API routes have integration tests
- [ ] Key user flows have E2E tests
- [ ] Tests run in CI/CD pipeline
- [ ] Tests are reliable (no flaky tests)

## 🚀 Performance

- [ ] Images use `next/image` with proper sizing
- [ ] Fonts use `next/font` for optimized loading
- [ ] Third-party scripts use `next/script` with appropriate strategy
- [ ] Large components are lazy-loaded with `next/dynamic`
- [ ] Bundle size is monitored with `@next/bundle-analyzer`
- [ ] Core Web Vitals are within acceptable ranges
- [ ] API responses are paginated for large datasets

## 📦 Deployment

- [ ] Environment variables configured in Vercel/dashboard
- [ ] Production build passes without errors
- [ ] Database migrations run before deployment
- [ ] Static assets are cached (CDN)
- [ ] Error monitoring is configured (Sentry, etc.)
- [ ] Analytics is configured
- [ ] Deployment checklist verified

## 📋 Maintenance

- [ ] Dependencies are regularly updated
- [ ] Deprecated packages are replaced
- [ ] Security vulnerabilities are addressed promptly
- [ ] Codebase is regularly refactored in small increments
- [ ] Documentation is kept up to date
- [ ] Team has a defined code review process

## Continuous Improvement

Use this checklist:

- **At project start** — Set up good habits from day one
- **Before major releases** — Catch issues before they reach production
- **During code review** — Reference specific items in your feedback
- **Quarterly** — Review and improve your project's health

## Summary

This checklist is a living document. Add items that are specific to your project, remove ones that don't apply, and revisit it regularly. The goal isn't perfection — it's continuous improvement.

## Related Topics

- [Clean Code](./clean-code)
- [Documentation](./documentation)
- [Code Review](./code-review)
- [Refactoring](./refactoring)
- [All Project Structure Topics](../project-structure/)
- [All Code Organization Topics](../code-organization/)
