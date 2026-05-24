---
title: "Routing in Next.js"
description: "Next.js App Router uses the file system as the router. Every folder inside app/ that contains a page.tsx file becomes a route."
---

# 4. Routing in Next.js

## How File-Based Routing Works

Next.js App Router uses the **file system as the router**. Every folder inside `app/` that contains a `page.tsx` file becomes a route.

```
app/
├── page.tsx          →  /
├── about/
│   └── page.tsx      →  /about
├── blog/
│   ├── page.tsx      →  /blog
│   └── post/
│       └── page.tsx  →  /blog/post
```

> **Analogy**: Think of your `app/` folder as a filing cabinet. Each drawer (folder) is a URL segment, and the `page.tsx` inside is the actual page.

---

## Route File Conventions

| File | Purpose | URL |
|---|---|---|
| `page.tsx` | The page UI | `/route` |
| `layout.tsx` | Shared UI wrapper | Wraps children |
| `loading.tsx` | Loading skeleton | Shows while page loads |
| `error.tsx` | Error boundary | Shows on error |
| `not-found.tsx` | 404 page | When route not found |
| `route.ts` | API endpoint | REST API handler |
| `template.tsx` | Re-renders on nav | Like layout, but fresh each time |
| `default.tsx` | Fallback for parallel routes | Default slot content |

---

## Basic Routes

```typescript
// app/page.tsx — renders at /
export default function HomePage() {
  return <h1>Welcome Home</h1>;
}

// app/about/page.tsx — renders at /about
export default function AboutPage() {
  return <h1>About Us</h1>;
}

// app/blog/page.tsx — renders at /blog
export default function BlogPage() {
  return <h1>Blog</h1>;
}
```

---

## Nested Routes

```
app/
└── dashboard/
    ├── page.tsx         →  /dashboard
    ├── analytics/
    │   └── page.tsx     →  /dashboard/analytics
    └── settings/
        └── page.tsx     →  /dashboard/settings
```

Each segment maps directly to a URL path.

---

## Dynamic Routes

Use square brackets `[param]` to create dynamic segments:

```
app/
├── blog/
│   └── [slug]/
│       └── page.tsx     →  /blog/hello-world
│                        →  /blog/nextjs-guide
└── users/
    └── [id]/
        └── page.tsx     →  /users/123
```

```typescript
// app/blog/[slug]/page.tsx
interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;

  // Fetch post data using the slug
  const post = await getPost(slug);

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
```

---

## Catch-All Routes

Use `[...slug]` to match multiple URL segments:

```
app/
└── docs/
    └── [...slug]/
        └── page.tsx
```

| URL | `params.slug` |
|---|---|
| `/docs/intro` | `['intro']` |
| `/docs/guide/setup` | `['guide', 'setup']` |
| `/docs/a/b/c` | `['a', 'b', 'c']` |

```typescript
// app/docs/[...slug]/page.tsx
interface Props {
  params: Promise<{ slug: string[] }>;
}

export default async function DocsPage({ params }: Props) {
  const { slug } = await params;
  const path = slug.join('/'); // e.g., "guide/setup"

  return <div>Docs: {path}</div>;
}
```

---

## Optional Catch-All Routes

Use `[[...slug]]` (double brackets) to also match the base path:

```
app/
└── shop/
    └── [[...categories]]/
        └── page.tsx
```

| URL | `params.categories` |
|---|---|
| `/shop` | `undefined` |
| `/shop/clothing` | `['clothing']` |
| `/shop/clothing/shirts` | `['clothing', 'shirts']` |

---

## Route Groups

Wrap a folder in parentheses `(group)` to organize routes **without affecting the URL**:

```
app/
├── (marketing)/
│   ├── page.tsx         →  /
│   ├── about/page.tsx   →  /about
│   └── pricing/page.tsx →  /pricing
└── (dashboard)/
    ├── layout.tsx        ← Dashboard layout (only for these routes)
    └── dashboard/page.tsx →  /dashboard
```

Route groups are perfect for:
- Applying different layouts to groups of routes
- Organizing code without changing URLs
- Separating marketing pages from app pages

---

## Parallel Routes

Render multiple pages simultaneously in the same layout using `@slot` syntax:

```
app/
└── dashboard/
    ├── layout.tsx
    ├── page.tsx
    ├── @analytics/
    │   └── page.tsx      ← analytics slot
    └── @notifications/
        └── page.tsx      ← notifications slot
```

```typescript
// app/dashboard/layout.tsx
interface Props {
  children: React.ReactNode;
  analytics: React.ReactNode;    // @analytics slot
  notifications: React.ReactNode; // @notifications slot
}

export default function DashboardLayout({
  children,
  analytics,
  notifications,
}: Props) {
  return (
    <div className="dashboard">
      <main>{children}</main>
      <aside>
        {analytics}
        {notifications}
      </aside>
    </div>
  );
}
```

---

## Intercepting Routes

Intercept routes to show content in a modal while the URL changes, but show the full page on direct navigation:

```
app/
├── feed/
│   └── page.tsx
├── photos/
│   └── [id]/
│       └── page.tsx          ← Full photo page
└── (.)photos/
    └── [id]/
        └── page.tsx          ← Modal version (intercepted)
```

| Convention | Matches |
|---|---|
| `(.)` | Same level |
| `(..)` | One level up |
| `(..)(..)` | Two levels up |
| `(...)` | Root `app/` directory |

---

## Linking Between Pages

### `<Link>` Component

Always prefer `<Link>` over `<a>` for internal navigation:

```typescript
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>

      {/* Dynamic route */}
      <Link href={`/blog/${post.slug}`}>
        {post.title}
      </Link>

      {/* With query params */}
      <Link href={{ pathname: '/search', query: { q: 'nextjs' } }}>
        Search
      </Link>

      {/* Replace instead of push to history */}
      <Link href="/dashboard" replace>
        Dashboard
      </Link>

      {/* Prefetch control */}
      <Link href="/about" prefetch={false}>
        About (no prefetch)
      </Link>
    </nav>
  );
}
```

### `useRouter()` Hook

Use for **programmatic navigation** in Client Components:

```typescript
'use client';

import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();

  async function handleLogin() {
    const success = await loginUser();

    if (success) {
      router.push('/dashboard');      // Navigate
      // router.replace('/dashboard') // Navigate without history
      // router.back()                // Go back
      // router.refresh()             // Re-fetch server data
    }
  }

  return <button onClick={handleLogin}>Login</button>;
}
```

### `redirect()` Function

Use in **Server Components** to redirect:

```typescript
import { redirect } from 'next/navigation';

export default async function ProtectedPage() {
  const session = await getSession();

  // Redirects and stops execution
  if (!session) {
    redirect('/login');
  }

  return <div>Protected Content</div>;
}
```

### `notFound()` Function

Trigger the `not-found.tsx` page:

```typescript
import { notFound } from 'next/navigation';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound(); // Renders not-found.tsx
  }

  return <div>{product.name}</div>;
}
```

---

## SVG: Routing Flow Diagram

```txt
<svg viewBox="0 0 760 320" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="11">
  <rect width="760" height="320" fill="#0f172a" rx="10"/>
  <text x="380" y="25" text-anchor="middle" fill="#94a3b8" font-size="13" font-weight="bold">Next.js App Router — Routing Flow</text>

  <!-- URL input -->
  <rect x="300" y="45" width="160" height="40" fill="#1e3a5f" rx="6" stroke="#3b82f6" stroke-width="2"/>
  <text x="380" y="65" text-anchor="middle" fill="#93c5fd">URL Request</text>
  <text x="380" y="79" text-anchor="middle" fill="#60a5fa" font-size="10">/dashboard/settings</text>

  <!-- Middleware -->
  <line x1="380" y1="85" x2="380" y2="105" stroke="#475569" stroke-width="1.5"/>
  <rect x="305" y="105" width="150" height="38" fill="#1e293b" rx="6" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="380" y="122" text-anchor="middle" fill="#fcd34d">middleware.ts</text>
  <text x="380" y="136" text-anchor="middle" fill="#fbbf24" font-size="10">Auth check, rewrites</text>

  <!-- Branch: Auth fail -->
  <line x1="305" y1="124" x2="200" y2="124" stroke="#ef4444" stroke-width="1" stroke-dasharray="4,3"/>
  <rect x="60" y="108" width="140" height="32" fill="#450a0a" rx="5" stroke="#991b1b" stroke-width="1"/>
  <text x="130" y="128" text-anchor="middle" fill="#fca5a5">redirect('/login')</text>

  <!-- App Router -->
  <line x1="380" y1="143" x2="380" y2="163" stroke="#475569" stroke-width="1.5"/>
  <rect x="280" y="163" width="200" height="38" fill="#1e293b" rx="6" stroke="#8b5cf6" stroke-width="1.5"/>
  <text x="380" y="180" text-anchor="middle" fill="#c4b5fd">App Router Matches</text>
  <text x="380" y="194" text-anchor="middle" fill="#a78bfa" font-size="10">app/dashboard/settings/page.tsx</text>

  <!-- Layout tree -->
  <line x1="380" y1="201" x2="380" y2="221" stroke="#475569" stroke-width="1.5"/>
  <rect x="270" y="221" width="220" height="55" fill="#1e293b" rx="6" stroke="#22c55e" stroke-width="1.5"/>
  <text x="380" y="238" text-anchor="middle" fill="#86efac">Layout Hierarchy</text>
  <text x="380" y="252" text-anchor="middle" fill="#4ade80" font-size="10">app/layout.tsx (root)</text>
  <text x="380" y="265" text-anchor="middle" fill="#4ade80" font-size="10">app/dashboard/layout.tsx</text>

  <!-- Page render -->
  <line x1="380" y1="276" x2="380" y2="296" stroke="#475569" stroke-width="1.5"/>
  <rect x="295" y="296" width="170" height="18" fill="#052e16" rx="4" stroke="#166534" stroke-width="1"/>
  <text x="380" y="309" text-anchor="middle" fill="#86efac">Page Component Renders</text>
</svg>
```

---

## SVG: URL Mapping Diagram

```txt
<svg viewBox="0 0 760 280" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="11">
  <rect width="760" height="280" fill="#0f172a" rx="10"/>
  <text x="380" y="24" text-anchor="middle" fill="#94a3b8" font-size="13" font-weight="bold">File System → URL Mapping</text>

  <!-- Headers -->
  <text x="190" y="48" text-anchor="middle" fill="#64748b" font-size="12">File Path</text>
  <text x="570" y="48" text-anchor="middle" fill="#64748b" font-size="12">URL Route</text>
  <line x1="380" y1="35" x2="380" y2="270" stroke="#1e293b" stroke-width="1.5"/>

  <!-- Rows -->
  <text x="190" y="75" text-anchor="middle" fill="#93c5fd">app/page.tsx</text>
  <text x="570" y="75" text-anchor="middle" fill="#86efac">/</text>
  <line x1="20" y1="83" x2="740" y2="83" stroke="#1e293b" stroke-width="1"/>

  <text x="190" y="105" text-anchor="middle" fill="#93c5fd">app/about/page.tsx</text>
  <text x="570" y="105" text-anchor="middle" fill="#86efac">/about</text>
  <line x1="20" y1="113" x2="740" y2="113" stroke="#1e293b" stroke-width="1"/>

  <text x="190" y="135" text-anchor="middle" fill="#93c5fd">app/blog/[slug]/page.tsx</text>
  <text x="570" y="135" text-anchor="middle" fill="#86efac">/blog/:slug</text>
  <line x1="20" y1="143" x2="740" y2="143" stroke="#1e293b" stroke-width="1"/>

  <text x="190" y="165" text-anchor="middle" fill="#93c5fd">app/docs/[...slug]/page.tsx</text>
  <text x="570" y="165" text-anchor="middle" fill="#86efac">/docs/*</text>
  <line x1="20" y1="173" x2="740" y2="173" stroke="#1e293b" stroke-width="1"/>

  <text x="190" y="195" text-anchor="middle" fill="#93c5fd">app/(auth)/login/page.tsx</text>
  <text x="570" y="195" text-anchor="middle" fill="#86efac">/login</text>
  <line x1="20" y1="203" x2="740" y2="203" stroke="#1e293b" stroke-width="1"/>

  <text x="190" y="225" text-anchor="middle" fill="#93c5fd">app/api/users/route.ts</text>
  <text x="570" y="225" text-anchor="middle" fill="#fcd34d">GET /api/users</text>
  <line x1="20" y1="233" x2="740" y2="233" stroke="#1e293b" stroke-width="1"/>

  <text x="190" y="258" text-anchor="middle" fill="#93c5fd">app/blog/[[...cat]]/page.tsx</text>
  <text x="570" y="258" text-anchor="middle" fill="#86efac">/blog or /blog/*</text>
</svg>
```

---

## SEO Benefits of Routing

- Each page has a unique URL → indexable by search engines
- Server-rendered pages mean bots see full HTML content
- `layout.tsx` + Metadata API let you set `<title>` and `<meta>` per route
- Loading states prevent layout shift (better Core Web Vitals)

---

## Common Routing Mistakes ❌

```
❌ Using <a href="/about"> instead of <Link href="/about">
   (causes full page reload instead of client-side navigation)

❌ Calling useRouter() in a Server Component
   (only works in Client Components)

❌ Forgetting to add 'use client' when using useRouter
   (will throw an error)

❌ Not handling the case when a dynamic param doesn't exist
   (always use notFound() when data is null)

❌ Creating deeply nested routes unnecessarily
   (use route groups to organize without deep nesting)

✅ Always use <Link> for internal navigation
✅ Use redirect() in Server Components, useRouter() in Client
✅ Always handle notFound() for dynamic routes
✅ Use route groups () to organize without changing URLs
```

---

## 📝 Interview Questions — Section 4

**Beginner:**
1. How does file-based routing work in Next.js?
2. What is the difference between `<Link>` and `<a>` in Next.js?
3. How do you create a dynamic route in Next.js?

**Intermediate:**
4. What is the difference between `[slug]`, `[...slug]`, and `[[...slug]]`?
5. What are route groups and when would you use them?
6. Explain parallel routes and give a real-world use case.

**Advanced:**
7. How do intercepting routes work and when would you use them (e.g., photo modal)?
8. Explain the difference between `redirect()` (Server Component) and `router.push()` (Client Component) in terms of performance.
9. How does prefetching work with `<Link>` and how would you disable it?

---
