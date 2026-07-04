---
title: "Deployment"
description: "Deploy your blog with automatic updates when you add new posts."
---

# Deployment

## Introduction

Deploying a content-driven blog is straightforward with Vercel. The key decision is how to handle new posts: rebuild the site on every push (static) or use Incremental Static Regeneration (ISR).

## Option 1: Static Export (Simplest)

If your blog content is in Markdown files committed to the repo:

```bash
# Push to GitHub — Vercel auto-deploys
git add .
git commit -m "Add new blog post"
git push
```

Every push triggers a new build. All post pages are generated at build time.

## Option 2: ISR with a Headless CMS

If you use a CMS like Sanity or Contentful, use ISR and revalidation:

```tsx
// app/blog/[slug]/page.tsx
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await fetchPostFromCMS(slug)

  return <PostContent post={post} />
}
```

## Environment Variables

If using a headless CMS:

```bash
# Vercel Dashboard → Project → Settings → Environment Variables
CMS_API_KEY=your_api_key
CMS_PROJECT_ID=your_project_id
```

## Performance Checklist

- [ ] All posts render as static HTML
- [ ] Code blocks have syntax highlighting
- [ ] Images use `next/image` with proper sizing
- [ ] Sitemap is accessible at `/sitemap.xml`
- [ ] RSS feed works at `/feed.xml`
- [ ] Open Graph images render for each post
- [ ] Build doesn't fail when adding new posts

## Summary

Deploy via GitHub for automatic production builds. Use ISR if your content comes from a CMS. Always verify that the sitemap, RSS feed, and OG images work after deployment.
