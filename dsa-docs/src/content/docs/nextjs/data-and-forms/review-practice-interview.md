---
title: "Data & Forms Review, Practice & Interview Prep"
description: "- User auth (login/register) - Create/edit/delete posts (rich text) - Tags (many-to-many relationship) - Comments with nested replies - Pagination and sear"
---

# Summary

## Key Takeaways

### Section 13 — Database Integration
- Next.js accesses databases **only from the server** (Server Components, Route Handlers, Server Actions)
- Use **Prisma** for type-safe relational databases (PostgreSQL, MySQL); use **Mongoose** for MongoDB; use **Drizzle** for lightweight SQL
- Always use a **singleton client** — never instantiate `PrismaClient` per request
- **Store credentials** in `.env.local`, never in code
- Use **transactions** for operations that must succeed or fail together
- **Index** columns you filter or sort by frequently
- Always **paginate** queries — never fetch all records

### Section 14 — State Management
- **Local state** (`useState`, `useReducer`) for component-level concerns
- **Context API** for small-medium global state (theme, auth) — but split contexts by update frequency
- **Redux Toolkit** for large-scale apps needing DevTools, time-travel, and team-friendly patterns
- **Zustand** for simple, boilerplate-free global state
- **TanStack Query** for all server/async data — it handles caching, deduplication, background refetching automatically
- Don't put server data in Redux — use TanStack Query instead

### Section 15 — Forms & Validation
- **React Hook Form** + **Zod** is the modern standard for form handling in Next.js
- Always **validate on both client AND server**
- Share Zod schemas between client and server for a single source of truth
- Use **Server Actions** with `useActionState` for progressive enhancement
- Never trust client-provided file types — validate on the server
- Always consider **accessibility** (labels, aria-*, role="alert")

---

# Practice Exercises

## Beginner
1. Build a contact form with React Hook Form + Zod validation (name, email, message)
2. Create a theme switcher using Context API (light/dark)
3. Connect to MongoDB and create a User model with Mongoose
4. Build a simple Todo CRUD with Prisma + PostgreSQL

## Intermediate
1. Build a shopping cart with Zustand that persists to localStorage
2. Create a paginated list of blog posts fetched with TanStack Query
3. Build a multi-step registration form (3 steps) with React Hook Form
4. Implement file upload with validation (type + size) on both client and server

## Advanced
1. Build an authentication system with JWT + Prisma (login, register, refresh tokens)
2. Implement optimistic updates in a todo app with TanStack Query
3. Create a normalized Redux state for a social feed (users, posts, likes)
4. Build a product management form with image upload, tags (many-to-many), and full server-side validation

---

# Mini Project Ideas

## 1. Blog Application
**Covers:** Prisma + PostgreSQL, TanStack Query, React Hook Form

- User auth (login/register)
- Create/edit/delete posts (rich text)
- Tags (many-to-many relationship)
- Comments with nested replies
- Pagination and search
- Admin dashboard for content moderation

## 2. Task Management App
**Covers:** Zustand or Redux Toolkit, Prisma, Multi-step forms

- Drag-and-drop Kanban board
- Task CRUD with priorities and due dates
- Team collaboration (share boards)
- File attachments
- Real-time updates with TanStack Query polling
- Statistics dashboard

## 3. E-Commerce Backend
**Covers:** PostgreSQL + Prisma, complex schema design, transactions

- Product catalog with categories and variants
- Inventory management
- Shopping cart with Zustand
- Order processing with database transactions
- Payment webhook handling
- Admin product management forms with image upload

## 4. Admin Dashboard
**Covers:** All three sections combined

- Data tables with server-side pagination/sorting/filtering
- Charts with TanStack Query for live data
- Role-based access control (RBAC) with Prisma
- Bulk operations with transactions
- Export (CSV/PDF) functionality
- Complex filter forms with many fields

---

# Interview Preparation

## Beginner Questions
1. What is an ORM and why would you use one?
2. What is the difference between `useState` and `useReducer`?
3. What is controlled vs uncontrolled form input in React?
4. How do you connect a Next.js app to MongoDB?
5. What is Context API and when would you use it?
6. What is Zod and how does it help with validation?
7. Why should you validate form data on the server?

## Intermediate Questions
1. Explain the N+1 query problem and how to solve it with Prisma
2. How does Redux Toolkit differ from traditional Redux?
3. What is connection pooling and why is it important?
4. How do React Hook Form and Zod work together?
5. When would you choose TanStack Query over Redux for data fetching?
6. Explain database transactions and give an example use case
7. How do you implement pagination in Prisma?
8. What is `persist` middleware in Zustand?

## Advanced Questions
1. How would you design a scalable database schema for a multi-tenant SaaS app?
2. What are the tradeoffs between Context API and state management libraries?
3. How do you prevent race conditions in concurrent form submissions?
4. Explain database indexing strategies and their performance implications
5. How would you implement real-time data sync in a Next.js + database app?
6. Describe how you'd handle optimistic UI updates with rollback on error
7. How do Server Actions change the way we handle forms compared to API routes?
8. What is state normalization and when is it necessary?
9. How would you design an audit log system using database transactions?
10. Explain how TanStack Query handles cache invalidation and stale data

---

> **Next Up:** Part 4 — Authentication, Deployment, Performance Optimization, and Testing  
> **Previous:** Part 3A — API Routes, Middleware, and Authentication Basics

---

*Documentation by Next.js Deep Dive Series | Last updated: 2024 | Next.js 14+ App Router*
