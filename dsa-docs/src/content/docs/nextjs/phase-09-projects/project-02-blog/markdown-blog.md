---
title: "Markdown Blog"
description: "Set up Markdown processing and render blog posts."
---

# Markdown Blog

## Introduction

Markdown is the most common format for developer blogs. It's easy to write, version-controlled, and renders into clean HTML. Next.js gives you the tools to process Markdown at build time for maximum performance.

## Project Structure

```
content/
  blog/
    getting-started-nextjs.md
    react-hooks-guide.md
    typescript-tips.md
    ...
lib/
  posts.ts       # Post reading and parsing
components/
  post-card.tsx
  post-content.tsx
```

## Reading Markdown Files

```ts
// lib/posts.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content', 'blog')

export interface Post {
  slug: string
  title: string
  date: string
  description: string
  category: string
  tags: string[]
  content: string
}

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory)

  const posts = fileNames
    .filter(file => file.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title,
        date: data.date,
        description: data.description,
        category: data.category,
        tags: data.tags ?? [],
        content,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find(post => post.slug === slug)
}
```

## Rendering Markdown to HTML

```ts
// lib/markdown.ts
import { remark } from 'remark'
import html from 'remark-html'
import prism from 'remark-prism'

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(html)
    .use(prism) // Syntax highlighting
    .process(markdown)

  return result.toString()
}
```

## Post List Page

```tsx
// app/blog/page.tsx
import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <div className="grid gap-8">
        {posts.map(post => (
          <article key={post.slug} className="border-b pb-6">
            <time className="text-gray-500 text-sm">{post.date}</time>
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-xl font-semibold mt-1 hover:text-blue-600">
                {post.title}
              </h2>
            </Link>
            <p className="text-gray-600 mt-2">{post.description}</p>
            <div className="flex gap-2 mt-3">
              {post.tags.map(tag => (
                <span key={tag} className="bg-gray-100 px-2 py-1 rounded text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
```

## Best Practices

- Store content outside `app/` directory in a `content/` folder
- Use `gray-matter` for frontmatter parsing
- Validate frontmatter with Zod for type safety
- Sort posts by date (newest first)
- Use `remark` plugins for extended Markdown features

## Common Mistakes

- **Reading files on every request** — Read content at build time or use caching
- **Not sorting posts** — Posts should show newest first by default
- **Missing error handling for broken Markdown** — Wrap parsing in try/catch
- **Storing images in Markdown files** — Use `public/` folder and reference by path

## Summary

Markdown blogs give you full control over your content. Use `gray-matter` for metadata, `remark` for HTML rendering, and sort posts by date. Store content in a `content/` folder outside the `app/` directory.
