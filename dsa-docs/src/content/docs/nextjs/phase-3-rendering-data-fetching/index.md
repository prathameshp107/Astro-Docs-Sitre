# Phase 3: Rendering & Data Fetching

## Introduction
Phase 3 is the heart of Next.js — understanding how rendering works and how to fetch data effectively. The App Router introduces React Server Components (RSC) as the default rendering paradigm, fundamentally changing how we think about data fetching, caching, streaming, and mutations. This phase covers everything from the basics of Server Components to advanced caching strategies, streaming patterns, and Server Actions.

## Why do we need this?
The App Router's rendering model is a paradigm shift from traditional React applications. Server Components run exclusively on the server, reducing client-side JavaScript and improving performance. Combined with streaming, Suspense, and intelligent caching, Next.js can deliver fast, dynamic, and interactive experiences. Understanding these concepts is essential for building production-ready applications.

## Learning objectives
By the end of this phase, you will be able to:
- Understand React Server Components and when to use them
- Fetch data efficiently in Server Components (parallel, sequential, streaming)
- Master Next.js caching layers and revalidation strategies
- Implement streaming with Suspense boundaries for fast page loads
- Build forms and mutations with Server Actions
- Handle loading states, errors, and optimistic updates

## Prerequisites
- Completed Phase 1: Next.js Fundamentals
- Completed Phase 2: App Router
- Understanding of React components and async/await

## Learning roadmap
1. Module 1: Server Components — The foundation of App Router rendering
2. Module 2: Data Fetching Patterns — Fetching data efficiently
3. Module 3: Caching & Revalidation — Understanding and controlling caching
4. Module 4: Streaming & Suspense — Progressive rendering for better UX
5. Module 5: Server Actions — Form handling and mutations

## Topics covered
- React Server Components (RSC) architecture
- Server vs Client Components — when to use each
- Data fetching in Server Components (async, direct DB access, fetch)
- Parallel and sequential data fetching
- Next.js caching layers (Full Route, Data, Router, React Cache)
- Incremental Static Regeneration (ISR) with App Router
- On-demand revalidation with revalidatePath and revalidateTag
- Streaming HTML with Suspense boundaries
- Loading UI patterns and skeletons
- Server Actions for form handling and mutations
- Error handling and optimistic updates

## Estimated learning time
35-40 hours to complete all modules and exercises.

## Real-world applications
- SaaS dashboards with real-time data updates
- E-commerce product pages with ISR caching
- Social media feeds with streaming content
- Blog platforms with on-demand revalidation
- Form-heavy applications using Server Actions

## Practice exercises
- Build pages with Server and Client Components
- Implement parallel data fetching patterns
- Configure caching and revalidation strategies
- Create streaming UIs with Suspense
- Build forms with Server Actions

## Mini Projects
- **Blog Platform**: Full blog with SSG, ISR, and on-demand revalidation
- **SaaS Dashboard**: Real-time dashboard with streaming data
- **E-Commerce Store**: Product pages with caching and revalidation
- **Task Manager**: Full CRUD with Server Actions

## Related Topics
- Performance Optimization (Phase 6)
- Authentication (Phase 5)
- Production Deployment (Phase 7)
