---
title: "Fundamentals Review, Practice & Interview Prep"
description: "1. Static Page: Create a Next.js app with pages: Home, About, Contact. Link them with <Link. 2. Dynamic Route: Build a /users/[id] page that displays a use"
---

# Summary & Key Takeaways

## Key Concepts Learned

| Concept | Key Point |
|---|---|
| Next.js | Full-stack React framework with SSR, routing, and more |
| SSR | Server renders HTML — fast loads and good SEO |
| App Router | File-system routing inside the `app/` folder |
| RSC | React Server Components — no JS sent for server components |
| Layouts | Persistent UI wrappers that don't re-render on navigation |
| Metadata | SEO tags managed via `metadata` export or `generateMetadata()` |
| Dynamic Routes | `[param]`, `[...param]`, `[[...param]]` |
| Route Groups | `(group)` — organize without affecting URL |

## Important Terminology

| Term | Definition |
|---|---|
| SSR | Server-Side Rendering |
| SSG | Static Site Generation |
| ISR | Incremental Static Regeneration |
| CSR | Client-Side Rendering |
| RSC | React Server Components |
| Hydration | Attaching JS interactivity to server-rendered HTML |
| Layout | Persistent UI wrapper shared across pages |
| Template | UI wrapper that re-renders on every navigation |
| Turbopack | Rust-based bundler replacing Webpack |

## Architecture Recap

```
Next.js Request Flow:
Request → CDN (cache hit?) → Middleware (auth?) →
App Router (match route) → Layout Tree → Page Component →
Fetch data (Server) → Render HTML → Stream to browser →
Hydrate (Client JS loads) → Interactive
```

---

# Practice Exercises

## Beginner Exercises

1. **Static Page**: Create a Next.js app with pages: Home, About, Contact. Link them with `<Link>`.
2. **Dynamic Route**: Build a `/users/[id]` page that displays a user's name using mock data.
3. **Layout**: Add a `Navbar` and `Footer` to the root layout so they appear on every page.
4. **Metadata**: Add unique `<title>` and `<description>` to each page using the Metadata API.
5. **Folder Structure**: Organize a project with 5 pages into a clean folder structure.

## Intermediate Exercises

6. **Route Groups**: Use route groups to apply a dashboard layout to some routes and a marketing layout to others — without changing the URLs.
7. **Catch-All**: Build a `/docs/[...slug]` route that renders docs based on the URL path.
8. **Nested Layouts**: Create a dashboard with a root layout (header), dashboard layout (sidebar), and settings layout (tabs).
9. **Protected Routes**: Implement a layout that redirects unauthenticated users to `/login`.
10. **Dynamic Metadata**: Use `generateMetadata()` to fetch a blog post and return its title/description as metadata.

## Advanced Exercises

11. **Parallel Routes**: Build a dashboard with two parallel slots — one for analytics charts, one for recent activity.
12. **Intercepting Routes**: Implement a photo gallery where clicking a photo shows it in a modal (intercepted route), but `/photos/[id]` shows it full-screen on direct navigation.
13. **E-commerce Structure**: Design a complete folder structure for an e-commerce app with products, cart, checkout, and account management.
14. **ISR with Revalidation**: Build a blog where posts are statically generated but revalidate every 60 seconds.
15. **Middleware Auth**: Write middleware that protects all `/dashboard/*` routes and redirects to `/login` if no session cookie exists.

---

# Mini Project Ideas

| Project | Description | Key Concepts Used |
|---|---|---|
| **Portfolio Website** | Personal site with projects, blog, contact | SSG, Metadata, Layouts |
| **Blog Platform** | Write and publish posts with Markdown | Dynamic routes, ISR, MDX |
| **Admin Dashboard** | Manage users and data with charts | Parallel routes, protected layouts |
| **E-commerce Frontend** | Browse products, add to cart, checkout | Dynamic routes, route groups |
| **Authentication App** | Sign up, login, protected profile page | Middleware, layouts, redirect() |
| **Documentation Site** | Multi-page docs with sidebar navigation | Catch-all routes, nested layouts |
| **Link Shortener** | Create and track short URLs | API routes, dynamic routes |

---

# Interview Preparation

## Beginner Questions

1. What is Next.js and how is it different from React?
2. What is SSR and why does it help with SEO?
3. How does file-based routing work in Next.js?
4. What is the difference between `<Link>` and `<a>` tags?
5. What does the `app/` folder contain?
6. What is a layout in Next.js?
7. How do you add a page title using Next.js?
8. What command creates a new Next.js project?
9. What is the purpose of the `public/` folder?
10. What does `npm run build` do?

## Intermediate Questions

11. Explain the difference between Server Components and Client Components.
12. What are route groups and when do you use them?
13. How do dynamic routes work? What's the difference between `[slug]` and `[...slug]`?
14. What is the difference between `layout.tsx` and `template.tsx`?
15. How do you implement protected routes in Next.js App Router?
16. What is middleware in Next.js and where does it run?
17. What is `generateMetadata()` and when do you use it over static `metadata`?
18. How does `useRouter()` differ from `redirect()`?
19. What is ISR and how does it differ from SSG?
20. How do you handle a 404 page in Next.js?

## Advanced Scenario-Based Questions

21. **Scenario**: Your Next.js app shows stale data after a database update. How would you fix this using `revalidatePath()` or `revalidateTag()`?

22. **Scenario**: You need a photo gallery where clicking a photo shows a modal without losing the background scroll position, but sharing the URL shows the full photo page. How would you implement this?
*(Answer: Intercepting routes with `(.)photos/[id]` + parallel routes)*

23. **Scenario**: You're building a multi-tenant SaaS where each company has its own subdomain with different branding. How would you architect this in Next.js?
*(Answer: Middleware to detect subdomain + tenant-specific layouts + database-driven themes)*

24. **Scenario**: Your e-commerce product pages need to be fast but also show up-to-date inventory. What rendering strategy would you use?
*(Answer: ISR with `revalidate: 60` for product info, client-side fetch for real-time inventory)*

25. **Scenario**: A client asks you to migrate a large Create React App (CRA) project to Next.js. What's your migration strategy?
*(Answer: Incremental adoption — set up Next.js, migrate pages one by one using App Router, move API calls to Server Components, add SSR/SSG where needed)*

---

> **End of Next.js Notes — Part 1**
>
> Part 2 will cover: Data Fetching, Server Actions, API Routes, Authentication, Performance Optimization, Deployment, and Advanced Patterns.
