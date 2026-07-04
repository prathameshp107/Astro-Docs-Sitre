# Static Assets

## Introduction

Static assets — images, fonts, videos, documents — are files that don't change between deployments. Next.js handles them differently depending on where they're stored.

## The Public Folder

Files in the `public/` folder are served at the root of your domain:

```
public/
├── favicon.ico         → /favicon.ico
├── robots.txt          → /robots.txt
├── og-image.png        → /og-image.png
└── uploads/
    └── photo.jpg       → /uploads/photo.jpg
```

```tsx
// Accessing files from public/
<img src="/uploads/photo.jpg" alt="Photo" />
```

## Caching Static Assets

Static assets in `public/` get optimal caching headers on Vercel:

```bash
# Hashed assets get immutable caching
Cache-Control: public, max-age=31536000, immutable

# Non-hashed assets get shorter caching
Cache-Control: public, max-age=0, must-revalidate
```

## next/image Optimizations

Images imported or referenced through `next/image` are optimized automatically:

```tsx
import logo from '@/public/logo.png'

// → Optimized to WebP, with responsive sizes
<Image src={logo} alt="Logo" />
```

## Third-Party Assets

To reference external images, configure `remotePatterns`:

```ts
// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.example.com',
      },
    ],
  },
}
```

## Common Mistakes

- **Storing user uploads in `public/`** — Build-time files in `public/` are included in the build. User uploads should go to blob storage (S3, Cloudinary).
- **Not versioning static assets** — Add content hashes to file names for cache busting (Next.js does this automatically for built assets).
- **Putting too many files in `public/`** — Everything in `public/` is copied during build. Large files increase build time.

## Best Practices

- Use `public/` for build-time assets only (favicon, OG images, robots.txt)
- Use blob storage (Uploadthing, S3, Cloudinary) for user uploads
- Let `next/image` handle image optimization automatically
- Configure `remotePatterns` for external image sources

## Summary

The `public/` folder serves static files at the root of your domain. Use it for build-time assets only. For user uploads, use blob storage. Let `next/image` handle image optimization automatically.

## Related Topics

- [Production Build](./production-build.md)
- [Production Best Practices](./production-best-practices.md)
