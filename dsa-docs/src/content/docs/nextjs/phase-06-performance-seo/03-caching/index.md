---
title: "Caching"
description: "Caching is one of the most powerful performance tools in Next.js. The framework automatically caches data, rendered pages, and routes at multiple levels —"
---

# Caching

## Introduction

Caching is one of the most powerful performance tools in Next.js. The framework automatically caches data, rendered pages, and routes at multiple levels — reducing load on your database and serving content faster to users.

## Why Caching Matters

- Reduces database load by serving cached results
- Improves page load time for subsequent visits
- Lowers server costs by reducing computation
- Enables Instant Loading with ISR (Incremental Static Regeneration)

## Topics Covered

1. Introduction — What caching means for Next.js
2. Cache Overview — The four caching layers (Full Route, Data, Router Cache, React Cache)
3. Revalidation — Time-based and on-demand revalidation with `revalidatePath` and `revalidateTag`
4. Cache-Control — Using HTTP headers for CDN and browser caching
5. Practical Examples — Real-world caching patterns

## Learning Outcomes

- Understand the four caching layers in Next.js
- Use ISR for time-based revalidation
- Use `revalidatePath` and `revalidateTag` for on-demand revalidation
- Configure Cache-Control headers for CDN caching

## Related Topics

- [Performance Module](../01-performance/)
- [Phase 3: Data Fetching](../../phase-3-rendering-data-fetching/)
