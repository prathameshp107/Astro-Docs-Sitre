---
title: "Open Graph"
description: "Open Graph (OG) tags control how your page appears when shared on social media platforms like Twitter, LinkedIn, Facebook, and Discord. A well-designed OG"
---

# Open Graph

## Introduction

Open Graph (OG) tags control how your page appears when shared on social media platforms like Twitter, LinkedIn, Facebook, and Discord. A well-designed OG card can significantly improve click-through rates.

## Why Do We Need This?

Without OG tags, social platforms guess what to show — often picking random text and the wrong image. With OG tags, you control exactly what users see:

```
Without OG:    [Link icon] https://myapp.com/blog/post-1
With OG:       [Featured Image]
               How to Build Fast Websites | My Blog
               Learn how to optimize your Next.js application...
               myapp.com
```

## Basic Open Graph Tags

```tsx
export const metadata: Metadata = {
  openGraph: {
    title: 'How to Build Fast Websites',
    description: 'Learn how to optimize your Next.js application.',
    url: 'https://myapp.com/blog/fast-websites',
    siteName: 'My Blog',
    images: [
      {
        url: 'https://myapp.com/og/fast-websites.png',
        width: 1200,
        height: 630,
        alt: 'How to Build Fast Websites',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}
```

## Twitter Cards

```tsx
export const metadata: Metadata = {
  twitter: {
    card: 'summary_large_image',
    title: 'How to Build Fast Websites',
    description: 'Learn how to optimize your Next.js application.',
    images: ['https://myapp.com/og/fast-websites.png'],
    // site: '@your_twitter_handle', // Twitter handle
  },
}
```

## Dynamic OG Images

For blog posts and products, generate OG images dynamically:

```tsx
// app/posts/[slug]/page.tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug)
  
  return {
    title: post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(post.title)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}
```

### OG Image API Route

```tsx
// app/api/og/route.tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || 'Default Title'
  
  return new ImageResponse(
    (
      <div style={{
        fontSize: 60,
        background: 'linear-gradient(to bottom, #1a1a2e, #16213e)',
        color: 'white',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
      }}>
        {title}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
```

## OG Image Best Practices

| Aspect | Recommendation |
|--------|---------------|
| Dimensions | 1200x630px (standard) |
| Format | PNG |
| Text | Keep it readable at small sizes |
| Branding | Include logo or site name |
| Background | High contrast for readability |

## Preventing Duplicate OG Tags

```tsx
// app/layout.tsx — set defaults in root layout
export const metadata: Metadata = {
  openGraph: {
    siteName: 'My App',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@myapp',
  },
}

// Pages only override what's specific to them
// app/posts/[slug]/page.tsx
export async function generateMetadata({ params }: Props) {
  return {
    openGraph: {
      title: post.title,       // Overrides root
      description: post.excerpt, // Overrides root
      images: [{ url: post.image }], // Overrides root
    },
  }
}
```

## Testing OG Tags

Use these tools to preview how your page will appear:

- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- [Slack unfurl preview](https://api.slack.com/docs/messages/link-unfurling)

## Common Mistakes

- **Missing OG image dimensions** — Some platforms require width and height.
- **Text too small in OG image** — Many users see OG images at thumbnail size.
- **Not setting a default OG image** — Every page should have a fallback OG image.
- **Forgetting Twitter cards** — Twitter uses `twitter:card` tags, not OG tags.

## Best Practices

- Always include at least title, description, and an image
- Use 1200x630px images for optimal display
- Add `summary_large_image` Twitter card
- Generate dynamic OG images for pages with unique content
- Validate with platform debuggers before sharing

## Summary

Open Graph tags control how your page appears on social media. Include title, description, and an image (1200x630px) for every page. Use `next/og` (Satori) to generate dynamic OG images. Always validate with platform debuggers.

## Related Topics

- [Metadata](./metadata.md)
- [SEO Best Practices](./seo-best-practices.md)
- [Sitemap](./sitemap.md)
