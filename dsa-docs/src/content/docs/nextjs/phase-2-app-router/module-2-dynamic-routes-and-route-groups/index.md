---
title: "Module 2: Dynamic Routes & Route Groups"
description: "---"
---

# Module 2: Dynamic Routes & Route Groups

## Introduction
Dynamic routes allow you to create pages that handle variable URL segments — like blog posts with different slugs, product pages with different IDs, or user profiles with different usernames. Route groups let you organize routes without affecting the URL structure. Together, they form the backbone of flexible, scalable routing in the App Router.

## Why this topic exists
Static routes (`/about`, `/contact`) are only the beginning. Real applications need dynamic content: `/blog/hello-world`, `/products/123`, `/users/jane-doe`. The App Router's dynamic route syntax (`[slug]`, `[...catchAll]`, `[[...optional]]`) handles these patterns elegantly, while route groups (`(groupName)`) keep your project organized without polluting your URL structure.

## Learning objectives
By the end of this module, you will be able to:
- Create dynamic routes using `[slug]` folder syntax
- Access route parameters in your components
- Use `generateStaticParams` for static generation with dynamic routes
- Implement catch-all and optional catch-all routes
- Organize routes using route groups without affecting URLs
- Build parallel routes and intercepting routes
- Understand when to use each routing pattern

## Prerequisites
- Completed Phase 1: Next.js Fundamentals
- Completed Module 1 of Phase 2 (Getting Started with App Router)
- Understanding of file-system routing concepts
- Basic TypeScript knowledge

## Learning roadmap
This module covers:
1. Dynamic Routes with [slug]
2. Catch-all and Optional Catch-all Routes
3. Route Groups for Organization
4. Parallel Routes
5. Intercepting Routes

## Topics covered
- `[slug]` folder syntax for dynamic segments
- Accessing `params` in page components
- `generateStaticParams` for SSG with dynamic routes
- `generateMetadata` for dynamic SEO
- Catch-all routes with `[...slug]`
- Optional catch-all with `[[...slug]]`
- Route groups `(groupName)` for organization
- Private folders `_folder` for internal code
- Parallel routes with `@slot` convention
- Intercepting routes with `(.)`, `(..)`, `(..)(..)`, `(...)` patterns

## Estimated learning time
10-12 hours to complete all topics and exercises.

## Real-world applications
- Blog platforms with post slugs
- E-commerce with product categories and product pages
- SaaS apps with organization/workspace-based URLs
- Multi-language sites with locale-based routes
- Dashboard apps with parallel views (main + modal)

## Practice exercises
- Build a blog with dynamic post routes
- Create a product catalog with categories and products
- Implement route groups to separate public and admin sections
- Build a dashboard with parallel route slots
- Create a photo gallery with intercepting route modals

## Mini Projects
- **Blog Platform**: Full blog with categories, posts, and author pages
- **E-Commerce Store**: Products by category, product details, search results
- **SaaS Dashboard**: User dashboard with settings, billing, and profile sections using route groups

## Related Topics
- Layouts and Templates (Module 1)
- Data Fetching (Phase 3)
- Route Handlers (Module 3)
- Middleware (Module 3)

---

## Topic 1: Dynamic Routes with [slug]

Create pages that respond to variable URL segments like `/blog/hello-world` or `/products/123`.

## Topic 2: Catch-all and Optional Catch-all Routes

Use `[...slug]` to capture multiple URL segments and `[[...slug]]` to make them optional.

## Topic 3: Route Groups for Organization

Use `(marketing)` and `(dashboard)` route groups to organize your project without changing URLs.

## Topic 4: Parallel Routes

Render multiple pages in the same layout simultaneously using `@modal`, `@sidebar`, etc.

## Topic 5: Intercepting Routes

Intercept navigation to show content in a modal while keeping the underlying page active.
