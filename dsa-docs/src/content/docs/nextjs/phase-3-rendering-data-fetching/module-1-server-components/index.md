# Module 1: React Server Components (RSC)

## Introduction
React Server Components (RSC) are the foundation of the App Router rendering model. They allow components to run exclusively on the server, generating HTML and a special RSC payload that the client uses to reconcile the component tree. Server Components reduce client-side JavaScript, enable direct server-side data access (databases, files, APIs), and improve initial page load performance.

## Why do we need this?
Traditional React applications send all component code to the browser, even if the component only renders on the server. This increases bundle size, slows down initial loads, and makes data fetching more complex (you need API endpoints, client-side fetching, loading states, etc.). Server Components solve these problems by executing on the server, sending only the rendered result to the client.

## Learning objectives
By the end of this module, you will be able to:
- Understand what React Server Components are and how they work
- Differentiate between Server and Client Components
- Build component trees mixing both types
- Know when to use `"use client"` and when to keep components on the server
- Optimize performance by moving code to the server

## Prerequisites
- Completed Phase 1 and Phase 2
- Understanding of React component concepts

## Learning roadmap
1. What are React Server Components?
2. Server Components vs Client Components
3. Component Trees and Nesting Rules
4. When to Use "use client"

## Topics covered
- RSC architecture and the server/client boundary
- Benefits of Server Components (zero client JS, direct data access)
- Client Component restrictions and the `"use client"` directive
- Nesting rules: Server in Client, Client in Server
- Passing props across the server/client boundary
- Serialization limitations
- Performance implications of each component type

## Estimated learning time
8-10 hours to complete all topics and exercises.

## Real-world applications
- Any page that fetches data from a database
- Pages with heavy npm dependencies (markdown parsers, date libraries)
- Applications needing better Core Web Vitals
- SEO-critical pages that need fast initial render

## Practice exercises
- Convert a client-side React app to use Server Components
- Build a page with mixed Server and Client Components
- Optimize bundle size by moving code to the server

## Mini Projects
- **Blog with Server Components**: Fetch and render blog posts entirely on the server
- **Dashboard with mixed components**: Server-rendered data table with client-side interactivity
