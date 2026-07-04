---
title: "Analytics"
description: "Analytics tells you how users interact with your application — which pages they visit, where they come from, and how long they stay."
---

# Analytics

## Introduction

Analytics tells you how users interact with your application — which pages they visit, where they come from, and how long they stay.

## Why Do We Need This?

Without analytics, you're making decisions based on guesses. Analytics data helps you understand what's working, what isn't, and where to focus your efforts.

## Vercel Analytics

If deployed on Vercel, enable Analytics in the dashboard for built-in visitor tracking and web vitals.

## Custom Analytics with `next/script`

```tsx
// app/layout.tsx
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </body>
    </html>
  )
}
```

## Custom Event Tracking

```ts
// lib/analytics.ts
export function trackEvent(eventName: string, properties?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  
  // Google Analytics 4
  gtag('event', eventName, properties)
  
  // Or send to your own analytics endpoint
  fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event: eventName, properties }),
  })
}

// Usage
trackEvent('button_click', { buttonName: 'signup', page: '/pricing' })
```

## Web Vitals Tracking

```tsx
// app/layout.tsx
export function reportWebVitals(metric: any) {
  // Send to analytics
  fetch('/api/analytics', {
    method: 'POST',
    body: JSON.stringify({
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      page: window.location.pathname,
    }),
  })
}
```

## Common Mistakes

- **Blocking page load with analytics** — Use `next/script` with `afterInteractive` strategy so analytics don't block rendering.
- **Not tracking meaningful events** — Page views alone aren't enough. Track conversions, sign-ups, purchases.
- **Over-tracking** — Too many events create noise. Track what you'll actually act on.

## Best Practices

- Use `next/script` with `afterInteractive` to avoid blocking page rendering
- Track meaningful events (sign-ups, purchases, feature usage)
- Use environment variables for tracking IDs to switch between environments
- Respect user privacy (consent management, cookie notices)

## Summary

Analytics tells you how users interact with your app. Use `next/script` for non-blocking analytics loading. Track both page views and meaningful user actions. Always respect user privacy with proper consent management.

## Related Topics

- [Performance Monitoring](./performance-monitoring.md)
- [Logging](./logging.md)
- [Error Monitoring](./error-monitoring.md)
