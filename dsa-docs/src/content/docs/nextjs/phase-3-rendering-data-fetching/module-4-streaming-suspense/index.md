---
title: "Module 4: Streaming & Suspense"
description: "Study notes and interview preparation material for Module 4: Streaming & Suspense."
---

# Module 4: Streaming & Suspense

## Introduction
Streaming allows Next.js to progressively send HTML from the server to the client as it's rendered, instead of waiting for the entire page to be ready. Combined with React Suspense boundaries, you can show loading UI for slow-loading components while faster content renders and displays immediately.

## Why do we need this?
Traditional server-side rendering sends the full HTML only after ALL data fetching completes. This means a slow database query in the footer blocks the entire page from loading. Streaming breaks this bottleneck — the header and main content render immediately while the footer loads in the background.

## Problem Statement
In a traditional SSR page, the Time to First Byte (TTFB) is determined by the slowest data source. If your page has a header (fast: 10ms), main content (medium: 200ms), and a sidebar (slow: 2s), the user sees NOTHING for 2 seconds. Streaming solves this by sending each section as it's ready.

## Real World Story
Airbnb redesigned their listing pages to use streaming. Previously, the entire page waited for all data — reviews, calendar, similar listings. With streaming, the hero image and title render in ~200ms, reviews appear at ~800ms, and similar listings stream in around 2s. Users see meaningful content much faster.

## Real World Analogy
Think of streaming like **loading a webpage on a dial-up modem** (if you remember that):
- **Without streaming**: The entire page loaded as one block. You stared at a blank screen waiting for everything.
- **With streaming**: Images appeared one by one, text showed up first, and you could start reading while images loaded.
- **Next.js streaming**: The header renders first, then main content, then sidebar — each section appears as it's ready.

## Learning objectives
By the end of this module, you will be able to:
- Implement streaming with Suspense boundaries
- Create loading UI with `loading.tsx`
- Build progressive rendering patterns
- Handle streaming errors gracefully

## Prerequisites
- Completed Phase 2 (App Router)
- Understanding of Server Components
- Basic React Suspense knowledge

## Learning roadmap
1. Streaming in the App Router
2. Suspense Boundaries and Fallbacks
3. Loading UI Patterns
4. Progressive Rendering Strategies

## Topics covered
- How streaming works in the App Router
- Suspense component boundaries
- `loading.tsx` file convention
- Fallback UI patterns (skeletons, spinners)
- Streaming with async Server Components
- Error handling in streaming boundaries
- Streaming performance metrics (LCP, TTFB)

## Estimated learning time
6-8 hours

## Real-world applications
- Social media feeds with progressive loading
- Dashboards with multiple data panels
- E-commerce product pages
- Content-heavy blog pages

## Practice exercises
- Add Suspense boundaries to a slow page
- Create custom skeleton components
- Implement streaming for a dashboard

## Mini Projects
- **Streaming Dashboard**: Dashboard panels that load progressively
- **Blog with streaming**: Blog post sections that stream as they render

## Related Topics
- Server Components (Module 1)
- Data Fetching Patterns (Module 2)
- Caching & Revalidation (Module 3)
