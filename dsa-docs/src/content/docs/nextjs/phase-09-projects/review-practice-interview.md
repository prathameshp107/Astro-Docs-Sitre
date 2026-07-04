---
title: "Review, Practice & Interview"
description: "Practice exercises and interview questions for Real-World Projects."
---

# Review, Practice & Interview

## Phase Summary

This phase covered five real-world Next.js projects, progressively building up complexity:

| Project | Key Concepts | Difficulty |
|---------|--------------|------------|
| **Personal Portfolio** | Layouts, Server Components, Image Optimization, Server Actions | Beginner |
| **Developer Blog** | Markdown parsing, Dynamic routes, `generateStaticParams`, SEO, RSS | Beginner-Intermediate |
| **Admin Dashboard** | Auth.js, middleware, protected layouts, data charts, Recharts | Intermediate |
| **E-commerce Store** | State management (Zustand), Cart persistence, Data validation, Checkout flow | Intermediate |
| **AI Chat App** | AI SDK, Streaming, Server Action streams, Real-time UI | Intermediate |

## Practice Tasks

### Task 1: Portfolio Enhancement

Add a dark mode toggle to the personal portfolio project. Steps:
1. Add a `ThemeToggle` component using `'use client'`
2. Use `localStorage` for persistence
3. Configure Tailwind's `darkMode: 'class'`
4. Add a toggle button in the header
5. Style both light and dark variants of your components

### Task 2: Blog Search Feature

Add full-text search to the developer blog:
1. Add a search input to the blog listing page
2. Implement client-side filtering by title and description
3. Show "no results" state when nothing matches
4. Debounce the search input for performance

### Task 3: Dashboard User Management

Build out the users management table:
1. Add an API route for listing users with pagination
2. Create a Client Component table with sortable columns
3. Add a search input for filtering users
4. Implement a delete action with confirmation dialog

### Task 4: E-commerce Cart Persistence

Improve the shopping cart:
1. Add a server-side cart for logged-in users
2. Sync localStorage cart with the server on login
3. Show cart contents across devices
4. Handle merge conflicts when syncing

### Task 5: AI Chat Conversation Management

Add conversation management to the AI chat app:
1. Create a sidebar listing all conversations
2. Allow creating new conversations
3. Implement conversation switching
4. Add conversation delete with confirmation

## Interview Questions

### Beginner

1. **What is the difference between a Server Component and a Client Component in Next.js?**

   Server Components run on the server and can access databases, file systems, and APIs directly. They send only the rendered HTML to the browser — no JavaScript. Client Components (marked with `'use client'`) run in the browser and can use React hooks, manage state, and handle user interactions.

2. **How do you create a dynamic route in Next.js?**

   Create a folder with square brackets like `[slug]` inside your `app/` directory. For example, `app/blog/[slug]/page.tsx` creates routes like `/blog/my-post`. Access the dynamic parameter via the `params` prop.

3. **What is the purpose of `next/image`?**

   `next/image` automatically optimizes images by resizing, compressing, and converting to modern formats like WebP. It also lazy-loads images by default and provides proper responsive sizing.

### Intermediate

4. **How would you protect API routes in Next.js?**

   Use Auth.js (next-auth) to verify the session in each route handler. Check `getServerSession(authOptions)` and return 401 if there's no valid session. For role-based access, check the user's role from the session.

5. **Explain how streaming works with the Vercel AI SDK.**

   The `streamText` function sends a prompt to the AI API and returns an async iterable of text chunks. On the server, `createStreamableValue` wraps these chunks. On the client, `readStreamValue` reads the chunks and appends them to the UI in real-time, creating the typewriter effect.

6. **How do you manage state in an e-commerce cart?**

   Use Zustand with the `persist` middleware for client-side state. The cart store is a single source of truth with actions for add, remove, update quantity, and clear. The `persist` middleware saves the cart to localStorage automatically.

### Advanced

7. **How would you implement SEO for a blog with 1000+ posts?**

   Use `generateStaticParams` to generate all post pages at build time. Implement `generateMetadata` for dynamic title and description per post. Generate a sitemap via `sitemap.ts` and an RSS feed via a Route Handler. Use structured data (JSON-LD) for rich search results.

8. **How do you handle race conditions in cart state?**

   Use Zustand's built-in state updates which are synchronous within the same render cycle. For server synchronization, use optimistic updates with rollback on failure. Consider using a transaction-like pattern for multi-step cart operations.

9. **What strategies would you use to reduce AI API costs in a chat application?**

   - Use a smaller model (gpt-4o-mini) for most conversations
   - Implement conversation context windowing (only send recent messages)
   - Cache common responses
   - Add rate limiting per user
   - Set maximum response tokens
   - Use streaming to give the illusion of speed even with smaller models

## Next Steps

After completing these projects, you're ready to:

- **Build your own projects** — Apply the patterns you've learned to new ideas
- **Contribute to open source** — Find Next.js projects on GitHub and contribute
- **Explore advanced topics** — Monorepos with Turborepo, micro-frontends
- **Build a portfolio** — Use your personal portfolio project to showcase your work

## Related Topics

- [All Phases Overview](../index.md)
- [Phase 5 — Authentication & Authorization](../phase-05-authentication/)
- [Phase 6 — Performance & SEO](../phase-06-performance-seo/)
- [Phase 7 — Production & Deployment](../phase-07-production/)
- [Phase 8 — Enterprise Architecture](../phase-08-enterprise-architecture/)
