---
title: "Project Overview"
description: "What you'll build and learn with the blog project."
---

# Project Overview

## What You'll Build

A Markdown-powered blog where you write posts in `.md` files, and Next.js renders them into a fast, SEO-optimized site. The blog includes post listing, categories, tags, and a search feature.

## Key Features

### 1. Markdown Content
All blog posts are written as Markdown files with frontmatter:

```markdown
---
title: "Getting Started with Next.js"
date: "2025-01-15"
description: "A beginner-friendly guide to Next.js"
category: "Next.js"
tags: ["react", "nextjs", "web-development"]
published: true
---

Your blog content here with **Markdown** formatting.
```

### 2. Dynamic Routes

Each post gets its own URL at `/blog/[slug]` using dynamic routing.

### 3. SEO Optimization

Every post includes:
- Unique title and meta description
- Open Graph image for social sharing
- JSON-LD structured data
- Proper heading hierarchy

### 4. Performance

- Static page generation at build time
- Incremental Static Regeneration for new posts
- Optimized images with `next/image`

## Pages

| Route | Purpose |
|-------|---------|
| `/blog` | Post listing with categories |
| `/blog/[slug]` | Individual post |
| `/blog/category/[name]` | Category filtered view |
| `/blog/tag/[tag]` | Tag filtered view |

## Learning Objectives

- Parse and render Markdown in Next.js
- Use `generateStaticParams` for dynamic static generation
- Implement `generateMetadata` for SEO
- Build a search feature with client-side filtering
- Generate RSS and sitemap from content
