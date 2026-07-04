---
title: "Getting Started with App Router"
description: "Study notes and interview preparation material for Getting Started with App Router."
---

# Getting Started with App Router

## Introduction
The App Router is Next.js's modern routing system, introduced as stable in Next.js 13.4. It's built on top of React Server Components, providing a powerful way to create routes using a file-system based convention. The App Router uses a special `app/` directory where folders define routes and files define UI for each route segment.

## Why this topic exists
Before you can build applications with the App Router, you need to understand its core concepts: how routes are defined, what special files like `layout.tsx` and `page.tsx` do, and how to structure your application for maximum maintainability.

## Learning objectives
By the end of this module, you will be able to:
- Understand what the App Router is and how it differs from the Pages Router
- Create routes using the `app/` directory convention
- Implement nested layouts that persist across pages
- Create loading UIs and error boundaries
- Set up custom 404 pages
- Navigate between pages using the Link component and `useRouter`

## Prerequisites
- Completed Phase 1: Next.js Fundamentals
- Basic understanding of React components and hooks
- Node.js 16.14+ installed

## Learning roadmap
1. What is the App Router?
2. Layouts and Templates
3. Page, Loading, Error, and Not Found Files
4. Linking and Navigation

## Topics covered
- App Router vs Pages Router comparison
- The `app/` directory structure
- File conventions: `layout.tsx`, `page.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`
- Nested layouts and layout composition
- Loading UI with `loading.tsx` and Suspense
- Error boundaries with `error.tsx`
- Custom 404 pages with `not-found.tsx`
- Client-side navigation with `next/link` and `useRouter`

## Estimated learning time
8-10 hours to complete all topics and exercises.

## Real-world applications
- Multi-page websites with shared navigation and footer
- Dashboards with persistent sidebars
- E-commerce sites with consistent layout across product pages
- Blog platforms with section-specific layouts
- SaaS applications with role-based layouts

## Practice exercises
1. Set up an App Router project and create your first routes
2. Build a nested layout hierarchy (root layout → section layout → page)
3. Add loading spinners for slow-loading routes
4. Implement error boundaries with fallback UI
5. Build a navigation system with active route highlighting

## Mini Project
Create a company website with:
- Root layout containing header, navigation, and footer
- A blog section with its own layout (sidebar + main content)
- Loading states for each section
- Custom error pages
- A 404 page for unknown routes
- Proper navigation using the Link component

## Related Topics
- Dynamic Routes (Module 2)
- Route Groups (Module 2)
- Data Fetching (Phase 3)
- Server Components
