---
title: "Improvements"
description: "Ideas and guidance for taking your portfolio to the next level."
---

# Improvements

## Introduction

Your portfolio is a living project. As you learn new skills, your portfolio should grow with you. This guide covers enhancements you can add to make your portfolio stand out.

## Add Dark Mode

```tsx
// components/theme-toggle.tsx
'use client'

import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark'
    setDark(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  function toggle() {
    const next = !dark
    setDark(next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', next)
  }

  return (
    <button onClick={toggle} aria-label="Toggle dark mode">
      {dark ? '☀️' : '🌙'}
    </button>
  )
}
```

Configure Tailwind's dark mode in `tailwind.config.ts`:

```ts
export default {
  darkMode: 'class',
  // ...
}
```

## Add Animations

Use Framer Motion for page transitions and scroll animations:

```bash
npm install framer-motion
```

```tsx
'use client'

import { motion } from 'framer-motion'

export default function AnimatedSection({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}
```

## Add a Blog

Turn the optional blog section into a full Markdown blog:

1. Create `content/blog/` folder with `.md` files
2. Read and parse them with `gray-matter` and `remark`
3. Display posts with syntax highlighting via `rehype-highlight`

## Integrate a CMS

Use Sanity or Contentful to manage your portfolio content:

- **Sanity**: Real-time editing with a visual editor
- **Contentful**: Headless CMS with a generous free tier
- **Notion**: Use Notion as a CMS with `@notionhq/client`

## Add Performance Monitoring

```bash
npm install @vercel/speed-insights @vercel/analytics
```

```tsx
// app/layout.tsx
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
```

## Project Ideas for Your Portfolio

| Project | Skills Demonstrated | Difficulty |
|---------|-------------------|------------|
| SaaS landing page | Marketing, conversion optimization | Easy |
| Real-time chat app | WebSockets, state management | Medium |
| Weather dashboard | Third-party APIs, data visualization | Medium |
| Markdown note app | CRUD, persistence, markdown parsing | Medium |
| URL shortener | Database, redirects, analytics | Medium |

## Best Practices for Portfolio Growth

- **Keep it updated** — Add new projects as you build them
- **Remove outdated work** — Replace early projects with stronger ones
- **Show process** — Include "what I learned" sections in project descriptions
- **Link to live demos** — Deploy every project so visitors can interact with them

## Summary

Your portfolio is never truly done. Add dark mode, animations, a blog, or CMS integration as you grow. The best portfolios are those that reflect the developer's current skill level and interests.

## Related Topics

- [Building Pages](./building-pages)
- [Deployment](./deployment)
- [Phase 6 — Performance & SEO](../../phase-06-performance-seo/)
