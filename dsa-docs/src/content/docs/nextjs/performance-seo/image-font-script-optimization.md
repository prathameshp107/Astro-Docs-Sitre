---
title: "Image, Font & Script Optimization"
description: "How to use next/image, next/font, and next/script for automatic optimization of images, fonts, and third-party scripts."
sidebar:
  order: 2
---

# Image, Font & Script Optimization

## Simple Analogy 📸

Imagine packing for a trip:
- **Images** = Your luggage — you want it as small and light as possible (compressed, right size)
- **Fonts** = Your outfit — it should look good and not wrinkle (no flash of unstyled text)
- **Scripts** = Your electronics — only bring what you need, charge them when needed (load on demand)

---

## next/image — Automatic Image Optimization

The `<Image />` component is one of Next.js's most powerful features. It handles optimization **automatically**:

| Feature | What it does |
|---------|-------------|
| **Format conversion** | Converts to WebP/AVIF (30% smaller than JPEG) |
| **Responsive sizes** | Generates multiple sizes for different screens |
| **Lazy loading** | Loads images only when near viewport |
| **Blur placeholder** | Shows blurred preview while loading |
| **Prevents CLS** | Requires width/height to reserve space |

```tsx
import Image from "next/image";

export default function ProductPage() {
  return (
    <article>
      {/* Hero — above the fold, load immediately */}
      <Image
        src="/hero.jpg"
        alt="Product hero"
        width={1200}
        height={630}
        priority                    // Preload — this is the LCP element
        sizes="100vw"               // Takes full viewport width
      />

      {/* Gallery — below fold, lazy load */}
      <Image
        src="/product.jpg"
        alt="Product photo"
        width={400}
        height={400}
        placeholder="blur"          // Show blurred preview while loading
        blurDataURL="data:image/jpeg;base64,..."
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </article>
  );
}
```

### Remote Images

```tsx
// External domain — configure in next.config.ts
<Image
  src="https://cdn.example.com/photo.jpg"
  alt="External image"
  fill                     // Fills parent container
  style={{ objectFit: "cover" }}
/>
```

```ts
// next.config.ts
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.example.com",
        pathname: "/**",
      },
    ],
  },
};
```

---

## next/font — Font Optimization

`next/font` downloads font files at **build time** and hosts them on your server — no external requests, no layout shift.

```tsx
// app/layout.tsx
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

// Google Font — self-hosted at build time
const inter = Inter({
  subsets: ["latin"],
  display: "swap",         // Show fallback until font loads (prevents FOIT)
  variable: "--font-inter", // Expose as CSS variable
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],   // Only load needed weights
  variable: "--font-playfair",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

// Local custom font
const brandFont = localFont({
  src: "../public/fonts/brand.woff2",
  variable: "--font-brand",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

```css
h1, h2 { font-family: var(--font-playfair); }
code { font-family: var(--font-mono); }
```

---

## next/script — Script Optimization

Controls **when** third-party scripts load so they don't block the page:

```tsx
import Script from "next/script";

export default function AnalyticsPage() {
  return (
    <>
      {/* Load after page is interactive — default for analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        strategy="afterInteractive"
      />

      {/* Load when browser is idle — lowest priority */}
      <Script
        src="https://example.com/chat-widget.js"
        strategy="lazyOnload"
      />

      {/* Load before any other code (use sparingly) */}
      <Script
        src="https://example.com/critical.js"
        strategy="beforeInteractive"
      />
    </>
  );
}
```

| Strategy | When it loads | Use case |
|----------|--------------|----------|
| `beforeInteractive` | Before page hydrates | Critical polyfills |
| `afterInteractive` | After page hydrates (default) | Analytics, tag managers |
| `lazyOnload` | When browser is idle | Chat widgets, non-critical |

---

## 🧠 In Simple Words

- **`next/image`** = automatic image optimization (format, size, lazy loading), just add `priority` to hero images
- **`next/font`** = self-hosts fonts at build time, no external requests, no layout shift
- **`next/script`** = controls when third-party scripts load — use `afterInteractive` for analytics, `lazyOnload` for chat widgets
- Always use these built-in components instead of manual `<img>`, `<link>`, or `<script>` tags for best performance
