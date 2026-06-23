---
title: "Metadata & SEO"
description: "How to use the Metadata API in Next.js for SEO — generateMetadata, dynamic metadata, Open Graph, sitemaps, and robots.txt."
sidebar:
  order: 3
---

# Metadata & SEO

## Simple Analogy 🏷️

Think of metadata as a **product label** on a package:
- **Title** = The product name (what shows up in search results)
- **Description** = What's inside (the summary under the title)
- **Open Graph** = The social media preview (what shows when you share on Twitter/Facebook)
- **Keywords** = Search terms (less important now, but still used)

---

## Static Metadata

Export a `metadata` object from any `page.tsx` or `layout.tsx`:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | MyApp",
  description: "Learn about our mission, team, and values.",
  keywords: ["about", "company", "team"],
};
```

## Dynamic Metadata with `generateMetadata`

For pages with dynamic content (blog posts, products, user profiles):

```tsx
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

// Fetch data and generate metadata dynamically
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetch(`https://api.example.com/posts/${slug}`)
    .then((r) => r.json());

  return {
    title: `${post.title} | My Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await fetch(`https://api.example.com/posts/${slug}`)
    .then((r) => r.json());

  return <article>{post.content}</article>;
}
```

---

## Metadata Fields (Most Important)

| Field | Purpose | Example |
|-------|---------|---------|
| `title` | Page title (shows in browser tab + search results) | `"Blog | MyApp"` |
| `description` | Search result snippet | `"Read our latest articles..."` |
| `openGraph` | Social media preview (Facebook, Twitter) | Title, description, image |
| `robots` | Control indexing | `{ index: true, follow: true }` |
| `alternates` | Canonical URL + language variants | `{ canonical: "/blog/post" }` |

### Open Graph (Social Media Preview)

```tsx
export const metadata: Metadata = {
  openGraph: {
    title: "Amazing Blog Post",
    description: "You won't believe this...",
    url: "https://myapp.com/blog/post",
    siteName: "MyApp",
    images: [
      {
        url: "https://myapp.com/og-image.png",
        width: 1200,
        height: 630,  // Standard OG image size
      },
    ],
    locale: "en_US",
    type: "website",
  },
};
```

### Title Templates

Set a template in the root layout — every page's title gets wrapped automatically:

```tsx
// app/layout.tsx
export const metadata: Metadata = {
  title: {
    template: "%s | MyApp",  // %s is the page title
    default: "MyApp",         // Fallback when no page title is set
  },
};

// In any page:
export const metadata = { title: "Blog" };
// → Renders as: "Blog | MyApp"
```

---

## Sitemap & Robots

### `sitemap.ts`

```tsx
// app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://myapp.com",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://myapp.com/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
```

### `robots.ts`

```tsx
// app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"],
    },
    sitemap: "https://myapp.com/sitemap.xml",
  };
}
```

---

## 🧠 In Simple Words

- **Static metadata** = export a `metadata` object (for simple, unchanging pages)
- **Dynamic metadata** = use `generateMetadata` (for blog posts, products, user profiles)
- **Open Graph** = controls how your page looks when shared on social media (set title, description, image)
- **Title templates** = set a pattern in layout (`"%s | MyApp"`) and each page just sets its own title
- **Sitemap + robots** = help search engines find and index your pages correctly
