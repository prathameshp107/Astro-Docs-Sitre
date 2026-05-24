---
title: "Middleware & Auth Review, Practice & Interview Prep"
description: "This document covered two of the most critical concepts in modern Next.js development:"
---

# Summary

This document covered two of the most critical concepts in modern Next.js development:

**Middleware (Section 11)** runs at the Edge before any page or API route. It is the ideal place for authentication checks, redirects, URL rewrites, logging, and security headers. It uses the Edge Runtime (V8, not Node.js), which means it is extremely fast but has limited API access. The `middleware.ts` file lives at the project root and exports a `middleware` function and a `config` object for route matching.

**Authentication (Section 12)** covers the full spectrum from password hashing and JWT lifecycle to OAuth flows and session management. NextAuth.js (Auth.js) abstracts the complexity of multiple providers, CSRF protection, and session handling into a clean configuration. Proper authentication requires secure cookies, short-lived tokens, server-side session validation, and role-based access control.

---

# Key Takeaways

- Middleware runs **before** pages and API routes, at the **Edge** (not Node.js).
- Use `NextResponse.redirect()` to change the URL, `NextResponse.rewrite()` to serve different content silently.
- Always add a `config.matcher` to avoid running middleware on static files.
- Never make database calls in middleware — use JWTs for stateless auth checks.
- Authentication = "Who are you?"; Authorization = "What can you do?"
- Always hash passwords with bcrypt (cost 12+). Never store plain text.
- Store auth tokens in HttpOnly cookies, never in localStorage.
- Short-lived access tokens + long-lived refresh tokens = secure and seamless UX.
- NextAuth.js handles OAuth, CSRF, sessions, and JWTs with minimal configuration.
- Always double-check auth in Server Components/API routes — middleware is not enough alone.

---

# Practice Exercises

1. Create a `middleware.ts` that redirects all `/old-blog/:slug` paths to `/blog/:slug`.
2. Build authentication middleware that checks for a valid JWT cookie and redirects to `/login` if missing.
3. Implement a logging middleware that writes request method, path, and response time to the console.
4. Add security headers (X-Frame-Options, CSP, HSTS) via middleware.
5. Implement a registration API route (`/api/auth/register`) with bcrypt password hashing.
6. Configure NextAuth.js with a Credentials provider and connect it to a Prisma database.
7. Add Google OAuth to an existing NextAuth configuration.
8. Create a protected dashboard page using `getServerSession()`.
9. Build a role-based admin page that returns 403 for non-admin users.
10. Implement a logout button that calls `signOut()` and redirects to `/login`.

---

# Mini Project Ideas

## Login System

Build a complete login system with:
- Registration page with form validation
- Login page with email/password and Google OAuth
- Email verification flow
- Forgot password / reset password flow
- Protected dashboard showing user info
- Logout functionality

**Tech stack:** Next.js App Router, NextAuth.js, Prisma, PostgreSQL, bcrypt, Resend (email)

---

## Admin Dashboard

Build a multi-role admin dashboard with:
- Public home page
- User registration and login
- User dashboard (role: `user`)
- Editor dashboard — create/edit content (role: `editor`)
- Admin dashboard — manage users, view analytics, delete content (role: `admin`)
- Middleware protecting all `/dashboard` and `/admin` routes
- RBAC enforced both in middleware and in Server Components

**Tech stack:** Next.js App Router, NextAuth.js with role in JWT, Prisma, shadcn/ui

---

## Protected Application

Build a note-taking app where:
- Users must register/login
- Each user can only see their own notes (row-level security)
- Notes are stored in a database
- Protected by middleware (redirect to login if no session)
- API routes check session before returning data
- Refresh token rotation for long sessions

**Tech stack:** Next.js App Router, NextAuth.js, Prisma, PostgreSQL, Tailwind CSS

---

# Interview Preparation

## Beginner Questions

1. What is middleware in Next.js? Where does it run?
2. What is `middleware.ts` and where should it be placed?
3. What is the difference between `redirect()` and `rewrite()` in NextResponse?
4. What is authentication? Give a real-world analogy.
5. What is the difference between a session and a JWT?
6. Why should we use bcrypt instead of SHA256 for password hashing?
7. What is an HttpOnly cookie? Why is it more secure?
8. What does NextAuth.js do?

## Intermediate Questions

9. How do you restrict middleware to specific routes?
10. Why can't you use Node.js APIs (like `fs`) in Next.js middleware?
11. How does OAuth 2.0 work at a high level?
12. What is the difference between access tokens and refresh tokens?
13. How do you access the current user session in a Server Component?
14. What is `sameSite: 'lax'` and how does it prevent CSRF attacks?
15. How would you implement role-based access control in Next.js?
16. What is the purpose of the `jwt` and `session` callbacks in NextAuth.js?

## Advanced Questions

17. How do you verify a JWT at the Edge without Node.js crypto APIs?
18. Explain token rotation and why it matters for refresh tokens.
19. How would you implement silent token refresh in a Next.js app?
20. What are the security tradeoffs between storing JWT in localStorage vs HttpOnly cookies?
21. How does NextAuth.js protect against CSRF attacks internally?
22. How would you implement a permissions system with fine-grained controls (not just roles)?
23. Describe how you'd architect auth for a multi-tenant SaaS application in Next.js.
24. What are the performance implications of running auth checks in middleware vs Server Components?

---

> **Next Up:** Part 3B will cover Advanced Data Fetching, Caching Strategies, and Incremental Static Regeneration (ISR) in the Next.js App Router.
