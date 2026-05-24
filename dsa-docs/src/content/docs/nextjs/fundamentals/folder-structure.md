---
title: "Next.js Folder Structure"
description: "\"Code is read more often than it is written.\" — Guido van Rossum"
---

# 3. Next.js Folder Structure

## Why Structure Matters

> "Code is read more often than it is written." — Guido van Rossum

A well-organized folder structure:
- Makes onboarding new developers faster
- Reduces bugs from misplaced files
- Enables better team collaboration
- Scales gracefully from small to large projects

### Key Principles

| Principle | Description |
|---|---|
| Separation of Concerns | UI, business logic, and data layers separated |
| Feature Cohesion | Related files grouped together |
| Single Responsibility | Each file/folder has one clear purpose |
| Discoverability | A new developer can find anything intuitively |

---

## Beginner Project Structure

For small projects and learning:

```
my-app/
├── app/
│   ├── layout.tsx          ← Root layout
│   ├── page.tsx            ← Home page (/)
│   ├── about/
│   │   └── page.tsx        ← About page (/about)
│   └── globals.css
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── Button.tsx
├── public/
│   └── images/
│       └── logo.png
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## Intermediate Project Structure

For real applications:

```
my-app/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── settings/page.tsx
│   ├── api/
│   │   └── users/
│   │       └── route.ts
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Modal.tsx
│   └── shared/
│       ├── Navbar.tsx
│       └── Footer.tsx
├── lib/
│   ├── db.ts               ← Database connection
│   └── auth.ts             ← Auth utilities
├── hooks/
│   ├── useAuth.ts
│   └── useDebounce.ts
├── types/
│   └── index.ts            ← TypeScript interfaces
├── utils/
│   ├── format.ts
│   └── validation.ts
└── public/
    ├── images/
    └── fonts/
```

---

## Advanced Scalable Project Structure

For large teams and enterprise applications:

```
my-app/
├── app/
│   ├── (auth)/
│   │   ├── layout.tsx
│   │   ├── login/
│   │   │   ├── page.tsx
│   │   │   └── loading.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── analytics/
│   │   │   └── page.tsx
│   │   └── settings/
│   │       └── page.tsx
│   ├── api/
│   │   ├── auth/
│   │   │   └── route.ts
│   │   ├── users/
│   │   │   └── route.ts
│   │   └── products/
│   │       └── route.ts
│   ├── error.tsx
│   ├── not-found.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/                 ← Reusable design system components
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   └── index.ts
│   │   ├── Input/
│   │   └── Card/
│   ├── forms/              ← Form-specific components
│   │   ├── LoginForm.tsx
│   │   └── ProductForm.tsx
│   └── layouts/            ← Layout components
│       ├── DashboardLayout.tsx
│       └── AuthLayout.tsx
├── features/               ← Feature-based organization
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── actions.ts
│   │   └── types.ts
│   ├── products/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── types.ts
│   └── users/
│       ├── components/
│       └── types.ts
├── lib/
│   ├── db/
│   │   ├── index.ts        ← Database client (Prisma/Drizzle)
│   │   └── schema.ts
│   ├── auth/
│   │   └── index.ts
│   └── email/
│       └── index.ts
├── hooks/
│   ├── useAuth.ts
│   ├── useLocalStorage.ts
│   └── useDebounce.ts
├── services/               ← External API integrations
│   ├── stripe.ts
│   ├── sendgrid.ts
│   └── cloudinary.ts
├── store/                  ← Global state (Zustand/Redux)
│   ├── index.ts
│   └── slices/
│       └── authSlice.ts
├── types/
│   ├── index.ts            ← Shared TypeScript types
│   ├── api.ts
│   └── db.ts
├── utils/
│   ├── format.ts
│   ├── validation.ts
│   └── helpers.ts
├── config/
│   ├── constants.ts
│   └── env.ts
├── middleware.ts            ← Next.js Middleware
└── public/
    ├── images/
    ├── icons/
    └── fonts/
```

---

## Folder Purpose Reference

| Folder | Purpose | Contains |
|---|---|---|
| `app/` | Next.js App Router | Pages, layouts, API routes |
| `components/` | Reusable UI | React components |
| `lib/` | Core utilities | DB, auth, third-party setup |
| `hooks/` | Custom React hooks | `useXxx.ts` files |
| `utils/` | Pure functions | Formatters, validators |
| `services/` | External APIs | Stripe, email, storage |
| `types/` | TypeScript types | Interfaces, enums |
| `store/` | Global state | Zustand/Redux slices |
| `config/` | App configuration | Constants, env vars |
| `features/` | Feature modules | Self-contained feature code |
| `public/` | Static assets | Images, fonts, icons |
| `middleware.ts` | Edge middleware | Auth guards, redirects |

---

## SVG: Folder Relationships

```txt
<svg viewBox="0 0 760 380" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="11">
  <rect width="760" height="380" fill="#0f172a" rx="10"/>
  <text x="380" y="25" text-anchor="middle" fill="#94a3b8" font-size="13" font-weight="bold">Next.js Folder Architecture</text>

  <!-- app/ center -->
  <rect x="300" y="50" width="160" height="50" fill="#1e3a5f" rx="8" stroke="#3b82f6" stroke-width="2"/>
  <text x="380" y="73" text-anchor="middle" fill="#93c5fd" font-size="13">app/</text>
  <text x="380" y="89" text-anchor="middle" fill="#60a5fa" font-size="10">Pages + API Routes</text>

  <!-- Surrounding folders -->
  <rect x="30" y="180" width="130" height="45" fill="#1e293b" rx="6" stroke="#8b5cf6" stroke-width="1.5"/>
  <text x="95" y="200" text-anchor="middle" fill="#c4b5fd">components/</text>
  <text x="95" y="215" text-anchor="middle" fill="#a78bfa" font-size="10">UI Components</text>

  <rect x="190" y="180" width="120" height="45" fill="#1e293b" rx="6" stroke="#06b6d4" stroke-width="1.5"/>
  <text x="250" y="200" text-anchor="middle" fill="#67e8f9">lib/</text>
  <text x="250" y="215" text-anchor="middle" fill="#22d3ee" font-size="10">DB, Auth, Config</text>

  <rect x="330" y="180" width="100" height="45" fill="#1e293b" rx="6" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="380" y="200" text-anchor="middle" fill="#fcd34d">hooks/</text>
  <text x="380" y="215" text-anchor="middle" fill="#fbbf24" font-size="10">Custom Hooks</text>

  <rect x="450" y="180" width="110" height="45" fill="#1e293b" rx="6" stroke="#ec4899" stroke-width="1.5"/>
  <text x="505" y="200" text-anchor="middle" fill="#f9a8d4">services/</text>
  <text x="505" y="215" text-anchor="middle" fill="#f472b6" font-size="10">External APIs</text>

  <rect x="580" y="180" width="110" height="45" fill="#1e293b" rx="6" stroke="#22c55e" stroke-width="1.5"/>
  <text x="635" y="200" text-anchor="middle" fill="#86efac">utils/</text>
  <text x="635" y="215" text-anchor="middle" fill="#4ade80" font-size="10">Helper Functions</text>

  <!-- Bottom row -->
  <rect x="100" y="295" width="110" height="45" fill="#1e293b" rx="6" stroke="#f97316" stroke-width="1.5"/>
  <text x="155" y="315" text-anchor="middle" fill="#fed7aa">types/</text>
  <text x="155" y="330" text-anchor="middle" fill="#fb923c" font-size="10">TypeScript Types</text>

  <rect x="240" y="295" width="110" height="45" fill="#1e293b" rx="6" stroke="#a855f7" stroke-width="1.5"/>
  <text x="295" y="315" text-anchor="middle" fill="#d8b4fe">features/</text>
  <text x="295" y="330" text-anchor="middle" fill="#c084fc" font-size="10">Feature Modules</text>

  <rect x="380" y="295" width="110" height="45" fill="#1e293b" rx="6" stroke="#64748b" stroke-width="1.5"/>
  <text x="435" y="315" text-anchor="middle" fill="#cbd5e1">public/</text>
  <text x="435" y="330" text-anchor="middle" fill="#94a3b8" font-size="10">Static Assets</text>

  <rect x="520" y="295" width="130" height="45" fill="#1e293b" rx="6" stroke="#ef4444" stroke-width="1.5"/>
  <text x="585" y="315" text-anchor="middle" fill="#fca5a5">middleware.ts</text>
  <text x="585" y="330" text-anchor="middle" fill="#f87171" font-size="10">Edge Guards</text>

  <!-- Lines from app/ down -->
  <line x1="320" y1="100" x2="95" y2="180" stroke="#8b5cf6" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="350" y1="100" x2="250" y2="180" stroke="#06b6d4" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="380" y1="100" x2="380" y2="180" stroke="#f59e0b" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="410" y1="100" x2="505" y2="180" stroke="#ec4899" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="440" y1="100" x2="635" y2="180" stroke="#22c55e" stroke-width="1" stroke-dasharray="4,3"/>
</svg>
```

---

## Real-World Structure Examples

### E-commerce Project

```
ecommerce/
├── app/
│   ├── (shop)/
│   │   ├── page.tsx             ← Home / product listing
│   │   ├── products/
│   │   │   ├── page.tsx         ← All products
│   │   │   └── [slug]/page.tsx  ← Product detail
│   │   └── cart/page.tsx        ← Shopping cart
│   ├── (checkout)/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── (account)/
│   │   ├── orders/page.tsx
│   │   └── profile/page.tsx
│   └── api/
│       ├── products/route.ts
│       ├── orders/route.ts
│       └── webhooks/stripe/route.ts
├── features/
│   ├── cart/
│   ├── checkout/
│   └── products/
└── services/
    ├── stripe.ts
    └── inventory.ts
```

### SaaS Dashboard

```
saas-app/
├── app/
│   ├── (marketing)/            ← Public pages
│   │   ├── page.tsx
│   │   └── pricing/page.tsx
│   ├── (app)/                  ← Authenticated app
│   │   ├── layout.tsx          ← Dashboard layout
│   │   ├── dashboard/page.tsx
│   │   ├── projects/
│   │   └── team/
│   └── api/
│       └── webhooks/
├── features/
│   ├── projects/
│   ├── billing/
│   └── team/
└── lib/
    ├── db/
    └── stripe/
```

### Blog Application

```
blog/
├── app/
│   ├── page.tsx                ← Blog listing
│   ├── posts/
│   │   └── [slug]/
│   │       ├── page.tsx        ← Blog post
│   │       └── loading.tsx
│   ├── categories/
│   │   └── [category]/page.tsx
│   └── feed.xml/route.ts       ← RSS feed
├── lib/
│   └── mdx.ts                  ← MDX processing
└── content/
    └── posts/
        └── hello-world.mdx
```

---

## Naming Conventions

| Item | Convention | Example |
|---|---|---|
| Components | PascalCase | `UserCard.tsx` |
| Hooks | camelCase with `use` prefix | `useAuth.ts` |
| Utilities | camelCase | `formatDate.ts` |
| Types/Interfaces | PascalCase | `UserProfile` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRIES` |
| API routes | lowercase | `route.ts` |
| Page files | lowercase | `page.tsx` |
| Folders | lowercase with hyphens | `user-profile/` |

---

## Common Mistakes ❌

```
❌ Putting all components in one giant file
❌ Mixing UI logic with business logic
❌ Importing directly from deep nested paths (use barrel exports)
❌ Keeping API keys in component files (use environment variables)
❌ Not separating server and client components
❌ Creating circular imports between modules
✅ Use @/ alias instead of ../../.. relative paths
✅ Create index.ts barrel files for clean imports
```

---

## 📝 Interview Questions — Section 3

**Beginner:**
1. What is the purpose of the `public/` folder in Next.js?
2. What goes inside the `lib/` folder vs `utils/` folder?
3. Where should TypeScript interfaces be stored?

**Intermediate:**
4. What is feature-based architecture and when should you use it?
5. How do barrel files (index.ts) improve imports in large projects?
6. Explain the difference between `components/ui/` and `components/features/`.

**Advanced:**
7. How would you structure a monorepo with multiple Next.js apps sharing components?
8. Describe the Clean Architecture pattern and how it applies to Next.js.

---
