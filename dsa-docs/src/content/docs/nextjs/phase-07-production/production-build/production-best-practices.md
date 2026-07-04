# Production Best Practices

## Introduction

This topic summarizes the key practices for running Next.js applications in production.

## Configuration

```ts
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable strict mode for identifying potential issues
  reactStrictMode: true,
  
  // Output standalone for self-hosting
  output: 'standalone',
  
  // Enable gzip compression
  compress: true,
  
  // Configure image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 1080, 1920],
  },
  
  // Custom headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
```

## Performance Checklist

- [ ] Bundle size is analyzed with `@next/bundle-analyzer`
- [ ] Images use `next/image` with `priority` on above-the-fold images
- [ ] Fonts use `next/font` (no external requests)
- [ ] Scripts use `next/script` with appropriate strategy
- [ ] Heavy components are dynamically imported
- [ ] Static pages are cached with ISR where appropriate

## Security Checklist

- [ ] HTTPS is enforced
- [ ] Security headers are set
- [ ] Environment variables are not hardcoded
- [ ] API routes are protected with authentication
- [ ] User input is validated with Zod
- [ ] SQL injection is prevented (use ORM parameterized queries)

## Monitoring Checklist

- [ ] Error monitoring is configured (Sentry, or similar)
- [ ] Performance monitoring is active (Vercel Analytics, or similar)
- [ ] Logging is set up for API routes and Server Actions
- [ ] Uptime monitoring is configured

## Common Mistakes

- **Disabling React Strict Mode** — It catches bugs during development. Keep it enabled.
- **No error monitoring** — You won't know about bugs until users report them.
- **Not testing the production build** — `next dev` behaves differently from `next start`. Always test locally with `npm run build && npm start`.

## Summary

Production best practices span configuration, performance, security, and monitoring. Use the checklists above to verify your application is ready. Always test the production build locally before deploying.

## Related Topics

- [Production Build](./production-build.md)
- [Build Analysis](./build-analysis.md)
- [Deployment Checklist](../deployment/deployment-checklist.md)
