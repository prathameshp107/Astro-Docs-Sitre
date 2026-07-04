# Phase 2: App Router

## Introduction
The App Router is the modern routing paradigm introduced in Next.js 13.4+. It represents a fundamental shift from the Pages Router, offering a new way to build applications using React's latest features like Server Components, streaming, and Suspense. The App Router provides a more intuitive file-system based routing mechanism with built-in support for layouts, loading states, error boundaries, and more.

## Why this topic exists
The App Router is the future of Next.js development. Understanding it is essential for building modern, performant, and scalable applications. Unlike the Pages Router, the App Router leverages React Server Components by default, enabling better performance through reduced client-side JavaScript, automatic code splitting, and improved data fetching patterns.

## Learning objectives
By the end of this phase, you will be able to:
- Understand the App Router architecture and its advantages over the Pages Router
- Create layouts, pages, loading states, and error boundaries using special files
- Implement dynamic routes, catch-all segments, and route groups
- Use Link and useRouter for client-side navigation
- Create and consume route handlers (API endpoints)
- Implement middleware for authentication, redirects, and geo-detection
- Organize large projects using route groups and project conventions

## Prerequisites
- Completed Phase 1: Next.js Fundamentals
- Understanding of React components and hooks
- Basic knowledge of file-system routing from Phase 1
- Familiarity with TypeScript (recommended but not required)

## Learning roadmap
This phase is structured into the following modules:
1. Getting Started with App Router
2. Dynamic Routes & Route Groups
3. Route Handlers & Middleware

## Topics covered
- What is the App Router and why it exists
- Layouts, templates, and nesting
- Special files: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`
- Linking and navigation with Next.js Link component
- Dynamic routes with `[slug]` and catch-all segments
- Route groups for project organization
- Route Handlers for API endpoints
- Middleware for request interception
- Project folder conventions and best practices

## Estimated learning time
25-30 hours to complete all modules and exercises.

## Real-world applications
- E-commerce platforms using product pages, categories, and checkout flows
- SaaS dashboards with complex nested layouts
- Multi-tenant applications using route groups
- Content-driven sites with dynamic routing
- API backends using Route Handlers

## Practice exercises
- After each topic, complete coding exercises to reinforce understanding
- Build nested layouts for a dashboard application
- Implement dynamic routes for a blog
- Create middleware for authentication checks
- Build a REST API using Route Handlers

## Mini Projects
- **Blog Platform**: Build a blog with nested layouts, dynamic post routes, and loading states
- **Dashboard**: Create an admin dashboard with route groups for different user roles
- **E-Commerce Store**: Implement product listing, categories, and cart using App Router patterns

## Related Topics
- React Server Components
- Data Fetching in App Router (Phase 3)
- Streaming and Suspense
- Performance Optimization (Phase 6)

---
## Module 1: Getting Started with App Router

### Introduction
This module introduces the App Router, the modern routing system in Next.js. You'll learn what makes the App Router different, how to create layouts and pages, and how to handle loading states and errors gracefully.

### Why do we need this?
Before building complex applications with the App Router, you need a solid understanding of its core concepts: the special file conventions, layout nesting, and the component hierarchy that makes the App Router so powerful.

### Problem Statement
Traditional React applications require manual routing configuration, separate state management for loading and error states, and complex patterns for sharing layouts across pages. The App Router solves all of these issues with a convention-based approach.

### Real World Story
Imagine you're building a social media dashboard. You want the sidebar navigation to persist across pages, show loading spinners while data loads, and gracefully handle errors when the API fails. With the Pages Router, you'd need to manually implement each of these. With the App Router, they're built-in features.

### Real World Analogy
Think of the App Router as a well-organized office building:
- `layout.tsx` is the building's structure (walls, floors, elevators) that stays consistent
- `page.tsx` is the furniture in each room that changes per visit
- `loading.tsx` is the "Please wait while we prepare your room" sign
- `error.tsx` is the emergency exit and first-aid kit
- `not-found.tsx` is the "Room doesn't exist" directory

## Learning roadmap
1. What is the App Router?
2. Layouts and Templates
3. Page, Loading, Error, and Not Found Files
4. Linking and Navigation

## Topics covered
- Understanding the App Router vs Pages Router
- The special file convention: `layout.tsx`, `page.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`
- Nested layouts and layout inheritance
- Loading UI with Suspense
- Error boundaries in the App Router
- Client-side navigation with `next/link` and `useRouter`

## Estimated learning time
8-10 hours to complete all topics and exercises.

## Practice exercises
1. Create a root layout with navigation and footer
2. Implement nested layouts for a dashboard section
3. Add loading states for slow-loading pages
4. Create error boundaries for each section
5. Build a navigation menu with active link highlighting

## Mini Project
Build a multi-page website with:
- Root layout with header and footer
- Nested layouts for a blog section (sidebar + content)
- Loading spinners for data-fetching pages
- Custom error pages for different sections
- Proper navigation using the Link component

## Related Topics
- React Server Components
- Data Fetching (Phase 3)
- Streaming and Suspense
