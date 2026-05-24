---
title: "Advanced Review, Practice & Interview Prep"
description: "Section 21 — Security Best Practices establishes a defense-in-depth approach for Next.js applications. The key insight is that security is not a single fea"
---

# Summary

**Section 21 — Security Best Practices** establishes a defense-in-depth approach for Next.js applications. The key insight is that security is not a single feature — it's multiple overlapping layers: HTTPS encryption, security headers, rate limiting, authentication, authorization, input validation, and proper secrets management. Each layer independently reduces risk.

**Section 22 — Advanced Next.js Concepts** covers the features that separate production-grade Next.js applications from basic ones. Server Actions transform data mutation into typesafe, boilerplate-free operations. Streaming with Suspense delivers fast perceived performance by sending HTML progressively. Edge Runtime brings sub-10ms response times globally. Parallel and Intercepting Routes enable sophisticated UI patterns like modals and split dashboards without complex state management.

---

# Key Takeaways

1. **Never trust client-side security** — always verify auth, authorization, and input on the server
2. **`httpOnly` cookies beat `localStorage`** for tokens — XSS cannot reach them
3. **Return generic error messages** to clients — detailed errors belong in server logs
4. **Server Actions are not magic** — they still need auth, validation, and error handling
5. **`'use server'` is a directive, not a location** — can be at file or function level
6. **Streaming doesn't require extra code** — wrap components in `<Suspense>` and it works
7. **Cache aggressively, invalidate precisely** — use `revalidateTag` over `revalidatePath` when possible
8. **Edge Runtime has no Node.js** — check package compatibility before opting in
9. **Parallel Routes need `default.tsx`** — without it, direct navigation returns 404
10. **`useOptimistic` beats fake loading states** — gives instant, reversible UI feedback

---

# Practice Exercises

## Beginner
1. Add a Content Security Policy header to `next.config.js` and verify it in DevTools
2. Create a Server Action that adds an item to a database and calls `revalidatePath`
3. Wrap three sections of a page in `<Suspense>` with skeleton loaders and observe the streaming

## Intermediate
4. Implement rate limiting on a login API route (5 attempts per minute per IP)
5. Build a CSRF-protected form using the CSRF token pattern shown in Section 21.5
6. Create a dashboard with three parallel data fetches using Suspense streaming
7. Implement `useOptimistic` for a like button that updates instantly

## Advanced
8. Build a complete auth flow: register → hashed password → secure session cookie → protected middleware
9. Design and implement an RBAC system with three roles (admin, editor, viewer) enforced in middleware
10. Create a photo gallery with intercepting routes — click shows modal, direct URL shows full page

---

# Mini Project Ideas

## 1. Secure Authentication App
Build a full authentication system from scratch.

**Features to implement:**
- Registration with bcrypt password hashing (cost 12)
- Login with rate limiting (5 attempts / minute)
- Secure `httpOnly` session cookie management
- Middleware-based route protection
- RBAC with three roles: admin, user, guest
- Protected admin panel with role check
- Audit log of all login events (IP, timestamp, success/fail)
- Password reset flow with time-limited tokens

**Security checklist:**
- No user enumeration on login/forgot password
- Generic error messages on all auth endpoints
- Env var validation with Zod at startup
- HTTPS enforced in production (HSTS header)

## 2. Real-time Dashboard
Build a metrics dashboard using streaming and caching.

**Features to implement:**
- Dashboard page with 4+ independent data sections
- Each section wrapped in `<Suspense>` with skeleton loaders
- Fastest sections render first (true streaming)
- Tag-based cache invalidation (`revalidateTag`)
- ISR for chart data (revalidate every 5 minutes)
- `cache: 'no-store'` for live counters only
- Server Actions for "mark as resolved" / status updates
- `useOptimistic` for instant UI on status changes

**Architecture to demonstrate:**
- Parallel data fetching within a single page
- Streaming vs static rendering side-by-side
- Edge Runtime for lightweight middleware checks

## 3. Chat Application
Build a real-time chat with Server Actions and optimistic UI.

**Features to implement:**
- Chat rooms with Parallel Routes sidebar layout
- Message sending via Server Actions (no API route)
- Optimistic message display (`useOptimistic`)
- Intercepting route for user profile preview on name click
- Rate limiting on message Server Action (1 msg/second)
- Input sanitization before DB storage
- Pagination with infinite scroll using Server Actions
- Typing indicators using optimistic state

**Advanced features:**
- Edge Runtime for message rate limiting
- Tag-based cache invalidation on new messages
- `useFormStatus` for send button pending state

---

# Interview Preparation

## Beginner Questions

| Question | Key Points |
|----------|-----------|
| What is XSS and how does React prevent it? | Auto-escaping in JSX; `dangerouslySetInnerHTML` is the risk |
| Why use `httpOnly` cookies for tokens? | JavaScript cannot read them — XSS-proof |
| What is a Server Action? | `'use server'` async function, called directly from components |
| What does `revalidatePath` do? | Purges Next.js data cache for a specific route |
| What is Suspense used for in Next.js? | Enables streaming — shows fallback while async component resolves |

## Intermediate Questions

| Question | Key Points |
|----------|-----------|
| Explain CSRF and two ways to prevent it | Forged cross-origin requests; SameSite cookies + Origin header check |
| Server Actions vs API Routes — when to use each? | SA for internal mutations; API routes for public HTTP endpoints |
| What is the difference between static and dynamic rendering? | Build-time vs request-time; triggered by `cookies()`, `headers()`, `no-store` |
| How does `revalidateTag` differ from `revalidatePath`? | Tag targets specific fetch calls; path targets all data on a route |
| When would you use Edge Runtime? | Auth, redirects, geo-routing; not DB connections or native modules |

## Advanced Scenario-Based Questions

**Scenario 1:** A penetration tester finds that your login endpoint returns "User not found" vs "Wrong password" — different error messages. What is the exact attack this enables and how do you fix it?
> **Answer:** User enumeration attack — attacker can build a list of valid email addresses. Fix: always return the same generic message ("Invalid email or password") and ensure both code paths take the same time (constant-time check).

**Scenario 2:** Your dashboard loads in 3 seconds because three slow API calls happen sequentially. How would you redesign this in Next.js?
> **Answer:** Move data fetching into individual Server Components, wrap each in `<Suspense>`, allowing them to fetch in parallel and stream progressively. The page shell renders immediately and data appears as it resolves.

**Scenario 3:** You need a product page that shows a modal when navigated from the product list, but shows a full page when accessed via direct URL. How do you implement this?
> **Answer:** Use Intercepting Routes with `(.)product/[id]` inside a `@modal` parallel route slot. The intercepting route renders the modal overlay; the original `product/[id]/page.tsx` renders the full page for direct access.

**Scenario 4:** After a Server Action saves a post, users see the old data until they refresh. What is wrong and how do you fix it?
> **Answer:** The Next.js Data Cache and Router Cache are stale. Fix: call `revalidatePath('/posts')` or `revalidateTag('posts')` at the end of the Server Action, and possibly `router.refresh()` on the client for Router Cache.

**Scenario 5:** Your security audit reveals JWTs are stored in `localStorage`. List the exact attack vectors and your remediation plan.
> **Answer:** Attack vectors: any XSS vulnerability can execute `localStorage.getItem('token')` and exfiltrate the JWT. Remediation: migrate to `httpOnly` session cookies (XSS-proof), set `secure`, `sameSite: 'lax'`, shorten JWT expiry, implement token rotation, add a CSP header to reduce XSS surface.

---

> **Next in the Series:** Part 5B will cover Internationalization (i18n), Performance Optimization, Web Vitals, and Building a Complete Full-Stack Application.

---

*Last updated: May 2026 · Next.js 14+ App Router · TypeScript*
