---
title: "Module 2: Data Fetching Patterns"
description: "Study notes and interview preparation material for Module 2: Data Fetching Patterns."
---

# Module 2: Data Fetching Patterns

## Introduction
Data fetching in the App Router is fundamentally different from the Pages Router. Server Components can fetch data directly using `fetch()` or database clients, without needing API routes. This module covers patterns for fetching data efficiently — parallel fetching, sequential fetching, streaming, error handling, and revalidation strategies.

## Why do we need this?
Efficient data fetching is critical for application performance. Poor patterns lead to:
- **Waterfall requests** — Data fetching one after another instead of in parallel
- **Over-fetching** — Fetching more data than needed
- **Loading states** — Multiple spinners instead of progressive loading
- **Cache misses** — Data fetched repeatedly instead of reused

## Learning objectives
By the end of this module, you will be able to:
- Fetch data directly in Server Components using `fetch` and database clients
- Implement parallel and sequential data fetching patterns
- Handle loading states, errors, and empty states
- Use Route Handlers for data fetching in Client Components
- Implement client-side data fetching with SWR and TanStack Query

## Topics covered
- Fetching data in Server Components
- Parallel and sequential data fetching
- Error handling and revalidation
- Client-side data fetching patterns

## Estimated learning time
8-10 hours
