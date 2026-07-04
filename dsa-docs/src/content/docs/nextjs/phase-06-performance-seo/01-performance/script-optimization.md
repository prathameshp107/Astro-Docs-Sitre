# Script Optimization

## Introduction

Third-party scripts (analytics, ads, chat widgets) are a common source of performance problems. The `next/script` component gives you control over when and how scripts load, preventing them from blocking page rendering.

## Why Do We Need This?

A typical analytics script:

```html
<script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```

Without optimization, this script blocks rendering — the page can't display content until the script downloads and executes. `next/script` lets you defer this until after the page is interactive.

## Script Loading Strategies

```tsx
import Script from 'next/script'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      
      {/* After — loads after the page is interactive (recommended) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        strategy="afterInteractive"
      />
      
      {/* Before — loads before the page is interactive (use sparingly) */}
      <Script
        src="https://cdn.example.com/critical.js"
        strategy="beforeInteractive"
      />
      
      {/* Lazy — loads when the browser is idle */}
      <Script
        src="https://cdn.example.com/chat-widget.js"
        strategy="lazyOnload"
      />
      
      {/* Worker — executes in a web worker (experimental) */}
      <Script
        src="https://cdn.example.com/heavy-task.js"
        strategy="worker"
      />
    </>
  )
}
```

## Strategy Comparison

| Strategy | When Script Loads | When It Executes | Use Case |
|----------|------------------|-----------------|----------|
| `beforeInteractive` | In the initial HTML | Before page is interactive | Critical polyfills, feature detection |
| `afterInteractive` | After page is interactive | As soon as possible | Analytics, tag managers |
| `lazyOnload` | During browser idle time | When browser is free | Chat widgets, social embeds |
| `worker` | During idle time | In a web worker | Expensive processing (Partytown) |

## Inline Scripts

```tsx
<Script id="show-banner" strategy="afterInteractive">
  {`document.getElementById('banner').classList.remove('hidden')`}
</Script>
```

Inline scripts require an `id` attribute for Next.js to track and optimize them.

## Event Handlers

```tsx
<Script
  src="https://cdn.example.com/widget.js"
  strategy="lazyOnload"
  onLoad={() => {
    console.log('Widget loaded and ready')
  }}
  onError={(e) => {
    console.error('Widget failed to load')
  }}
/>
```

## Using with Analytics

```tsx
// app/layout.tsx
import Script from 'next/script'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        
        {/* Google Analytics */}
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

## Common Mistakes

- **Using `beforeInteractive` unnecessarily** — Most scripts should use `afterInteractive`. Only use `beforeInteractive` for critical polyfills.
- **Not adding event handlers** — Track failures to know when third-party scripts break.
- **Loading scripts in child components** — Load scripts in layouts to avoid duplication on route changes.
- **Not using environment variables for IDs** — Hardcoding tracking IDs makes them harder to manage across environments.

## Best Practices

- Use `afterInteractive` for analytics and marketing scripts
- Use `lazyOnload` for non-critical scripts (chat, social widgets)
- Load scripts in the root layout to avoid duplication
- Add `onError` handlers to track script failures
- Use environment variables for API keys and tracking IDs

## Summary

`next/script` gives you control over third-party script loading. Use `afterInteractive` for analytics, `lazyOnload` for non-critical widgets, and `beforeInteractive` only when absolutely necessary. This prevents scripts from blocking page rendering and improves performance.

## Related Topics

- [Image Optimization](./image-optimization.md)
- [Font Optimization](./font-optimization.md)
- [Lazy Loading](./lazy-loading.md)
