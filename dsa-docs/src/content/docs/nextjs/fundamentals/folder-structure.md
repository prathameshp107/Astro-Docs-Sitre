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

![SVG: Folder Relationships diagram](/DSA-Notes-Problems/assets/nextjs/fundamentals-folder-structure-svg-folder-relationships.svg)

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
