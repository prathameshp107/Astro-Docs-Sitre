# Canonical URLs

## Introduction

A canonical URL tells search engines which version of a page is the "official" one. This prevents duplicate content issues when the same content is accessible from multiple URLs.

## Why Do We Need This?

Duplicate content confuses search engines. Consider these URLs that all show the same product:

- `https://shop.com/products/123`
- `https://shop.com/products/123?ref=homepage`
- `https://shop.com/products/123?color=red`
- `https://shop.com/en/products/123`

Without a canonical URL, search engines see four different pages with the same content. They may split ranking signals across all four, or pick the wrong one. The canonical URL tells them which one to treat as the original.

## Setting Canonical URLs

```tsx
// app/products/[slug]/page.tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.slug)
  
  return {
    title: product.title,
    alternates: {
      canonical: `https://shop.com/products/${product.slug}`,
    },
  }
}
```

## Canonical URL with Query Parameters

```tsx
// app/products/[slug]/page.tsx
export async function generateMetadata(
  { params, searchParams }: Props
): Promise<Metadata> {
  return {
    alternates: {
      // Always point to the base URL without query parameters
      canonical: `https://shop.com/products/${params.slug}`,
    },
  }
}
```

## When to Use Canonical URLs

| Scenario | Canonical URL |
|----------|--------------|
| Same content, different URLs | Point to the main URL |
| Query parameter variations (sort, filter) | Point to the base page |
| www vs non-www | Choose one and set it as canonical |
| HTTP vs HTTPS | Use the HTTPS version |
| Paginated content | Each page is its own canonical |
| Syndicated content | Point back to the original source |

## Pagination Example

```tsx
// app/blog/page/[page]/page.tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    alternates: {
      canonical: `https://myblog.com/blog/page/${params.page}`,
    },
  }
}
```

## Common Mistakes

- **Not setting canonical URLs** — Every page with multiple access paths needs a canonical.
- **Setting different canonical URLs for the same content** — Be consistent.
- **Canonical to non-existent pages** — The canonical URL must resolve to a real page.
- **Forgetting about query parameters** — Tracking params (utm_source, ref) create duplicate URLs.

## Best Practices

- Every page should have a self-referencing canonical URL
- Use `alternates.canonical` in the Metadata API
- Strip query parameters from the canonical URL
- Be consistent across your entire site
- Test with Google's URL Inspection tool

## Summary

Canonical URLs prevent duplicate content issues by telling search engines which version of a page is the official one. Set them via the Metadata API's `alternates.canonical` and always point to the cleanest version of the URL without tracking parameters.

## Related Topics

- [robots.txt](./robots-txt.md)
- [Sitemap](./sitemap.md)
- [SEO Best Practices](./seo-best-practices.md)
