// ─── Next.js Interview Questions (200) ──────────────────────────────────
export const NEXT_QUESTIONS = [
  ["What is Next.js and how does it differ from plain React?", "easy", "Next.js is a React framework providing server-side rendering (SSR), static site generation (SSG), file-based routing, API routes, image optimization, and more. Plain React is a client-side library — you need to configure bundlers (Vite/Webpack), routing (React Router), data fetching, and SEO manually. Next.js gives these out-of-the-box with conventions like pages/ or app/ directories. Next.js also enables streaming, server components, and partial prerendering (PPR) that plain React doesn't provide directly."],
  ["What is the difference between pages router and app router?", "med", "Pages Router (legacy, Next.js 9-12): file-based routing in /pages, uses getServerSideProps/getStaticProps for data fetching, _app.js and _document.js for customization, limited to page-level layouts. App Router (Next.js 13+, stable in 14): routes in /app directory with folder-based routing, supports React Server Components by default, nested layouts (layout.js), streaming (loading.js), error boundaries (error.js), Server Actions, and more granular caching. App Router is the recommended approach for new projects."],
  ["What is file-based routing in Next.js?", "easy", "Next.js uses the file system as the routing API. A file placed at pages/about.js becomes /about. For App Router: app/about/page.js becomes /about. Nested folders create nested routes: app/blog/[slug]/page.js handles /blog/:slug. Dynamic segments use [param] syntax, catch-all uses [...param], optional catch-all uses [[...param]]. No need to configure route tables — routes are automatically derived from the file structure."],
  ["What is getStaticProps and when do you use it?", "med", "getStaticProps (Pages Router) fetches data at build time and passes it as props to the page component. The page is pre-rendered as static HTML. Use it for: CMS content (blogs, docs), marketing pages, product listings — any data that doesn't change frequently. Supports revalidate for ISR. getStaticProps runs server-side only, never in the browser. It is not available in the App Router (use Server Components with fetch + revalidate instead)."],
  ["What is getServerSideProps and when do you use it?", "med", "getServerSideProps (Pages Router) fetches data on every request and pre-renders the page server-side. Use it for: personalized/dynamic data (dashboards, user profiles), authenticated pages, real-time data. Returns context object with params, req, res, query, etc. Slower TTFB than static pages (wait for data fetch + render). In App Router, use async Server Components with dynamic rendering instead of getServerSideProps."],
  ["What is getStaticPaths?", "med", "getStaticPaths (Pages Router) defines which dynamic paths to pre-render at build time for static generation with dynamic routes. Returns paths array (with params) and fallback option. fallback: false = 404 for unlisted paths; fallback: true = generate on-demand, serve fallback page first; fallback: 'blocking' = generate on-demand, wait for completion. In App Router, use generateStaticParams instead."],
  ["What is Incremental Static Regeneration (ISR)?", "hard", "ISR allows static pages to be updated after build without rebuilding the entire site. Set revalidate in seconds: getStaticProps revalidate: 60 regenerates the page at most once every 60 seconds (stale-while-revalidate). On-demand ISR: revalidatePath('/blog/post') or revalidateTag('posts') in App Router triggers immediate regeneration. ISR combines the speed of static with freshness of dynamic. Drawback: the first request after revalidate triggers server build (may be slow for complex pages)."],
  ["What are Server Components in Next.js App Router?", "hard", "React Server Components (RSC) render exclusively on the server and send a special serialized payload (RSC payload) to the client — not standard HTML or JS. They can directly access databases, file systems, and backend services, reducing client bundle size. They cannot use hooks, event handlers, or browser APIs. All components in App Router are Server Components by default. Benefits: smaller JS bundles, direct backend access, automatic code splitting, better SEO and initial load performance."],
  ["What are Client Components and when do you need them?", "med", "Client Components are rendered on both server (for initial HTML) and client (for hydration/interactivity). Marked with 'use client' directive at top of file. Use them when you need: useState, useEffect, useReducer, event handlers (onClick, onSubmit), browser-only APIs (localStorage, window), or custom hooks. Client Components still hydrate on first load — add 'use client' only where interactivity is needed, keeping as many components server-side as possible."],
  ["What is the difference between 'use client' and 'use server' directives?", "hard", "'use client' marks the file as a Client Component (runs on server for SSR + client for hydration). 'use server' marks a function as a Server Action (async function callable from client but executes on server). 'use client' is about rendering location; 'use server' is about function execution boundary. A file can have both: React Server Component 'use server' actions, or 'use client' component that imports server actions. They serve different purposes: rendering vs data mutation."],
  ["What are Server Actions in Next.js?", "hard", "Server Actions are async functions marked with 'use server' that run on the server but can be called from the client (directly from form actions or programmatically). They can read/write databases, revalidate caches, and redirect. Integrated with forms: <form action={myAction}> invokes the server action on submission. Use useActionState for pending/error states. Server Actions are POST endpoints under the hood but with automatic CSRF protection, progressive enhancement, and type safety."],
  ["What is the layout.js file in App Router?", "med", "layout.js defines a shared UI wrapper for a route segment and its children. Unlike pages, layouts persist across navigations (preserve state, don't remount). Can be nested (one layout per route segment). Takes a children prop and renders it where needed. The root layout (app/layout.js) is required and wraps the entire app — it sets <html>, <body>, fonts, and global metadata. Layouts can fetch data (unlike Pages Router _app.js which couldn't use getInitialProps)."],
  ["What is loading.js and how does it enable streaming?", "hard", "loading.js creates a Suspense boundary for a route segment. When the segment's content is loading (e.g., data fetching), Next.js streams the loading UI (usually a skeleton/spinner) immediately while the actual content renders on the server. This enables instant navigation feedback and progressive rendering. Multiple loading.js files at different route levels create nested Suspense boundaries, allowing granular streaming. loading.js does NOT need 'use client' — can be a Server Component (static loading UI)."],
  ["What is error.js in Next.js?", "med", "error.js creates an error boundary (React error boundary + Next.js handling) for a route segment. It receives 'error' and 'reset' props. The reset function attempts to re-render the segment. error.js catches errors in Server Components, but since it itself must be a Client Component (needs 'use client'), it can show interactive error UIs with retry buttons. Nested error.js files isolate errors to specific segments — a crash in one section doesn't break the whole page."],
  ["What is not-found.js?", "easy", "not-found.js renders when a notFound() function is called (e.g., in generateStaticParams for a missing slug) or when a route is not found. It's a convenience file: create app/not-found.js for a custom 404 page. Segment-level not-found.js (e.g., app/blog/not-found.js) shows a scoped 404 for that route segment. Unlike error.js, not-found.js can be a Server Component (no 'use client' needed)."],
  ["What is the template.js file?", "hard", "template.js is similar to layout.js but creates a new instance for each child on navigation (unlike layout.js which persists). Use template.js when: you need useEffect on navigation (e.g., page view tracking), want to reset state between navigations, or need entry/exit animations. template.js also wraps layout.js children. Layout: persistent across navigation. Template: remounts on each navigation. Useful for analytics, conditional UI, or animations per route."],
  ["How does Next.js handle metadata (SEO)?", "med", "App Router: export const metadata = { title, description, openGraph, robots, etc. } in layout.js or page.js (Server Component). generateMetadata function for dynamic metadata from params. Convenient API: metadata.title.template for template strings. Head tags: <link>, <meta> for SEO are automatically generated. Pages Router: use next/head component or custom _document.js. Next.js also supports sitemap.ts, robots.ts, and opengraph-image.tsx files in app directory for advanced SEO."],
  ["What is the next/image component and its benefits?", "med", "Next.js Image component extends HTML <img> with: automatic optimization (WebP/AVIF format, responsive sizes), lazy loading (loading='lazy' by default), CLS prevention (requires width/height or fill), placeholder blur-up or blur-data-url, priority attribute for LCP images (adds preload hint), remote images allowed via remotePatterns in config. Images are optimized on-the-fly during build or at request time (if not pre-built). Reduces image payload by ~30-50% on average."],
  ["What is the next/link component?", "easy", "next/link enables client-side navigation with prefetching. <Link href='/about'>About</Link>. Prefetches the linked page in the background (links visible in viewport). Supports soft navigation (no full page reload). Pass dynamic params via href={{ pathname: '/blog/[slug]', query: { slug: 'post' } }}. replace prop replaces current history entry. scroll={false} disables scroll-to-top on navigation. prefetch={false} to disable prefetching for out-of-view or non-critical links."],
  ["What is the next/font system?", "med", "next/font automatically optimizes fonts with: self-hosting (no external requests, better privacy), automatic subsetting (only loads characters used), CSS size-adjust for cumulative layout shift (CLS) prevention, font loading strategies (swap, optional). Usage: import { Inter } from 'next/font/google' or local fonts from next/font/local. Fonts can be configured globally in layout.js or per-page. Variable fonts supported. Reduces font-related network requests to zero."],
  ["What is the next/script component?", "med", "next/script extends HTML <script> with strategy options: beforeInteractive (load before page is interactive — critical scripts), afterInteractive (default, load after page is interactive — analytics), lazyOnload (load when browser is idle — low-priority scripts), worker (offload to Web Worker — experimental). Inline scripts via dangerouslySetInnerHTML. onLoad, onReady, onError callbacks. Strategy optimization improves performance by prioritizing critical vs non-critical scripts."],
  ["How does Next.js handle environment variables?", "med", ".env.local (local only), .env (committed defaults), .env.development, .env.production. Prefix with NEXT_PUBLIC_ to expose to browser (e.g., NEXT_PUBLIC_API_URL). Non-prefixed vars only available server-side (Server Components, API routes, getServerSideProps, etc.). Variable expansion: NEXT_PUBLIC_API_URL=$API_URL in .env files. Runtime env vars (Next.js 14+): supported with special setup. At build time, env vars are inlined. At runtime, process.env works server-side."],
  ["What is the public directory in Next.js?", "easy", "The public/ folder serves static assets (images, fonts, robots.txt, favicon.ico) at the root URL path. /public/my-image.png is served at /my-image.png. Files are not processed by Next.js (no optimization, versioning, or bundling). Use for: static assets that don't need optimization, legacy files, or files referenced from CMS. For optimized images, use next/image with src in public/ or remote URLs."],
  ["What is the next.config.js file?", "med", "next.config.js is the configuration file for Next.js (export default object). Key options: images (remotePatterns, formats, deviceSizes), redirects/rewrites/headers (async functions returning arrays), webpack (custom webpack config), output (standalone, export), experimental (serverActions, ppr, turbo), env (build-time env), i18n, basePath, trailingSlash, reactStrictMode, poweredByHeader, compress, generateEtags, and more. For ESM, use next.config.mjs extension."],
  ["How do you create API routes in Next.js?", "med", "Pages Router: files in pages/api/*.ts export default handler(req, res). Supports all HTTP methods. No CORS by default — add manually. Built-in body parsing (req.body), query parsing (req.query). Example: pages/api/hello.ts exports (req, res) => res.json({ hello: 'world' }). API routes don't increase client bundle size. For App Router: use Route Handlers (route.ts) instead."],
  ["What is Route Handlers in App Router (route.ts)?", "med", "Route Handlers (app/api/route.ts) replace API Routes for App Router. Export named async functions for each HTTP method: GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD. Accept NextRequest, return NextResponse. Support: streaming (Response), dynamic segments (app/api/[id]/route.ts), middleware, caching (export const dynamic = 'force-static'), revalidation via revalidatePath/revalidateTag. Route Handlers run server-side only. They can read cookies(), headers() from next/headers."],
  ["What is middleware in Next.js?", "hard", "middleware.ts (in project root or src/) runs before every request, at the Edge Runtime. It can: redirect users (to /login if unauthenticated), rewrite URLs (A/B testing, i18n), set headers (security, cookies), add response headers. Uses NextResponse.rewrite(), NextResponse.redirect(), NextResponse.next(). Config: export const config = { matcher: ['/dashboard/:path*'] } to run on specific paths only. Middleware does NOT have access to Node.js APIs (no fs, no DB). Keep it fast — it blocks rendering."],
  ["How does Next.js handle authentication?", "hard", "Next.js supports multiple auth strategies: middleware-based (check session cookie/token, redirect if invalid), Server Component auth (call auth() in layout/page, redirect on miss), API Route auth (validate JWT in Route Handler), Server Action auth (check session before mutation). Libraries: NextAuth.js (Auth.js), Clerk, Lucia, Supabase Auth, Firebase Auth. Best practice: check auth in middleware for broad protection, and in Server Components/actions for granular checks. Avoid client-only auth (flash of unauthenticated content)."],
  ["What is NextAuth.js?", "med", "NextAuth.js (now Auth.js v5) is an authentication library for Next.js. Provides: built-in providers (Google, GitHub, credentials, email magic link, ~80+ OAuth providers), session management (JWT or database sessions), middleware integration, App Router support (auth() helper, middleware, Server Actions), database adapters (Prisma, Drizzle, Mongoose), CSR/SSR protection via auth() in Server Components. Auth.js v5 is framework-agnostic but has first-class Next.js support with route handlers."],
  ["What is the difference between static and dynamic rendering in Next.js?", "hard", "Static rendering: page HTML is generated at build time (or on-demand via ISR). Fastest — serves pre-built HTML, no per-request computation. Dynamic rendering: page is rendered per-request. In App Router, a route is dynamic if it uses: cookies(), headers(), searchParams access, dynamic functions like noStore(), or fetch with cache: 'no-store'. Dynamic rendering has higher server cost but serves fresh data per request. Next.js automatically chooses based on APIs used."],
  ["What is Partial Prerendering (PPR)?", "hard", "PPR (Next.js 14+ experimental) combines static and dynamic rendering in the same page. The static shell (navigation, header, footer) is prerendered. Dynamic holes (user-specific content, real-time data) wrapped in Suspense are streamed on request. PPR gives static-level speed with dynamic freshness. File: a static outer shell + Suspense boundaries for dynamic parts. Currently experimental in Next.js 15 with ppr: 'incremental' config."],
  ["What is Streaming in Next.js and how does Suspense enable it?", "hard", "Streaming sends the page HTML incrementally as it's ready, rather than waiting for the entire page. Suspense boundaries define streaming chunks: <Suspense fallback={<Skeleton />}> renders the skeleton immediately, while the lazy component renders server-side and streams in. loading.js creates Suspense boundaries per route segment. Benefits: faster TTFB (first byte), perceived performance (users see content sooner), progressive loading of slow components without blocking fast ones."],
  ["What is the fetch() caching behavior in Next.js App Router?", "hard", "Next.js extends fetch with caching options. Next 14: fetch defaults to cache: 'force-cache' (cached indefinitely). Next 15: fetch defaults to cache: 'no-store' (no caching by default). Options: cache: 'force-cache' (cache until revalidated), cache: 'no-store' (never cache), next: { revalidate: 60 } (ISR-style caching), next: { tags: ['posts'] } (tag-based on-demand revalidation). Data Cache persists across deployments (on shared storage like Vercel's KV or filesystem)."],
  ["What are cache tags and revalidation in Next.js?", "hard", "Cache tags label fetch responses for targeted revalidation. Tag a fetch: fetch(url, { next: { tags: ['posts'] } }). Revalidate by tag: revalidateTag('posts') clears all cache entries with that tag. Tags allow granular cache invalidation — update only the cache entries related to a specific entity. Revalidate by path: revalidatePath('/blog') clears the Router Cache for that route. Combine: revalidatePath with revalidateTag for full cache control."],
  ["What is the revalidatePath and revalidateTag function?", "hard", "revalidatePath(path, type) purges the Full Route Cache and Data Cache for a specific URL path. type can be 'page' or 'layout'. revalidateTag(tag) purges the entire Data Cache entries tagged with that tag (any fetch with that tag on any route). Use cases: after a mutation in a Server Action (create post → revalidateTag('posts')), after CMS webhook (revalidatePath('/blog')). Both are available in Server Components (as side-effect) and Route Handlers."],
  ["What is unstable_cache in Next.js?", "hard", "unstable_cache (next/cache) is a low-level caching API for memoizing arbitrary data (not just fetch). It wraps a function and caches its return value with optional tags and revalidation. Useful for caching database queries, file reads, or computed values. Accepts: a callback function, a cache key array, and options: { tags, revalidate }. Returns a cached promise. Named 'unstable' because its API may change — but it's widely used in production. In Next 15+, consider 'use cache' directive as alternative."],
  ["How does Next.js handle redirects and rewrites?", "med", "Redirects (next.config.js or middleware): server-side redirects (301/302/307/308) — browser URL changes. Rewrites: proxy URLs to another destination without changing browser URL — useful for API proxying, A/B testing, multi-zone setups. Configure in next.config.js: async redirects()/rewrites() returning arrays of { source, destination, permanent }. In App Router: redirect() function from next/navigation for programmatic redirect in Server Components/actions."],
  ["What are dynamic routes in Next.js?", "med", "Dynamic routes use [param] in filename: app/blog/[slug]/page.js matches /blog/hello, /blog/world-2024. Access params via: export default function Page({ params }: { params: { slug: string } }). Nested dynamic params: app/[category]/[product]/page.js captures both. Static generation with dynamic routes uses generateStaticParams to list all paths. Dynamic routes work in both Pages and App Router."],
  ["What are catch-all routes ([...slug])?", "med", "Catch-all routes capture all path segments: app/blog/[...slug]/page.js matches /blog/a, /blog/a/b, /blog/a/b/c. params.slug is an array: for /blog/a/b/c, slug = ['a', 'b', 'c']. /blog alone does NOT match (must have at least one segment). Useful for: docs with nested sections, category trees, multi-level breadcrumbs."],
  ["What are optional catch-all routes ([[...slug]])?", "hard", "Optional catch-all routes [[...slug]] match routes with or without the dynamic segment. app/[[...slug]]/page.js matches /, /about, /about/team, etc. params.slug is undefined for /, and an array for multi-segment paths. Use for: root-level catch-all pages, optional routing patterns, legacy URL migrations. Without double brackets, catch-all requires at least one segment. With double brackets, the segment is entirely optional."],
  ["What are parallel routes in Next.js?", "hard", "Parallel routes render multiple pages in the same layout using named slots (@folder convention). app/layout.tsx with @team and @analytics folders renders both slots independently. Slots support independent loading, error, and not-found states. Perfect for dashboards, complex layouts with independent sections. The parent layout provides layout.tsx that renders the slot content. Slots are regular route segments but scoped to their slot namespace."],
  ["What are intercepting routes?", "hard", "Intercepting routes allow rendering a route from another route in the current layout context. Use (.) prefix to intercept routes at the current level: app/feed/(.)photo/[id] intercepts /feed/photo/123 when navigated from /feed. (..) for one level up. For modals: gallery page at /gallery, (.)photo/[id] intercepts /photo/123 to show modal overlay while keeping /gallery in background. Hard refresh navigates directly to the route without interception."],
  ["What is the @folder convention in App Router?", "hard", "The @folder convention defines named slots for parallel routes. Each @folder is a route segment that renders independently within the parent layout. Example: app/layout.js with @team and @analytics folders allows the layout to render both slots. Slots are NOT URL segments — they don't affect the path. They share the same URL as the parent. @default folder acts as fallback when no other slot renders. Slots are keyed by folder name and rendered via props in layout."],
  ["How do you implement internationalization (i18n) in Next.js?", "hard", "Two approaches: 1) next.config.js i18n (legacy Pages Router): locales, defaultLocale. 2) App Router (custom): middleware rewrites /en/about to /about, sets cookie/header for locale detection. Use params: export default Page({ params: { locale } }). Libraries: next-intl (most popular), react-intl, i18next. middleware.ts reads Accept-Language header, cookie, or URL to determine locale, rewrites to correct path. Store translations in JSON, import in Server Components for zero client overhead."],
  ["What is the next/navigation vs next/router?", "med", "next/navigation (App Router) replaces next/router (Pages Router). next/navigation exports: useRouter (with push, replace, back), usePathname, useSearchParams, useParams, redirect(), permanentRedirect(), notFound(). next/router exports: useRouter with push, replace, query, pathname (class-based object). next/navigation hooks can only be used in Client Components (they use React hooks). redirect() can be used in Server Components and Server Actions."],
  ["What are the useRouter, usePathname, useSearchParams hooks?", "med", "useRouter (next/navigation): { push(url), replace(url), back(), forward(), refresh() } for programmatic navigation. usePathname: returns current URL pathname string ('/blog/post'). useSearchParams: returns URLSearchParams object for query string (useSearchParams().get('q')). All three are Client Component hooks. useSearchParams requires Suspense boundary (Next.js 15 warns if not wrapped). useRouter.refresh() triggers a re-render of Server Components without full reload."],
  ["How do you persist state across navigation in Next.js?", "hard", "Options: 1) URL state (searchParams): persists in URL, shareable, bookmarkable. 2) Cookies: for server-accessible state (auth tokens, preferences). 3) Global state (React Context, Zustand, Jotai): persists in JS memory but lost on hard refresh. 4) localStorage/sessionStorage: persists client-side, accessible browser-only. 5) Server state (database): persists across sessions, shared across devices. In App Router, the Router Cache preserves layout state across soft navigations automatically."],
  ["What is the Link prefetching behavior?", "med", "next/link prefetches linked page data in the background. For static routes: prefetches full RSC payload. For dynamic routes: prefetches the static shell. Prefetching happens when the link enters the viewport (Intersection Observer) or on hover. Prefetched data is cached in the Router Cache for ~30 seconds. prefetch={false} disables prefetching. Prefetching improves navigation speed by loading data before the user clicks. In production, prefetch links are prefetched in batches during idle time."],
  ["How do you handle 404 and 500 errors in Next.js?", "med", "Custom 404: app/not-found.js. Trigger programmatically with notFound() function. Custom 500: app/global-error.js (catches errors in root layout). Route segment error handling: error.js (error boundary per segment). For missing data: check if record exists, call notFound(). For server errors: throw error in Server Component, caught by nearest error.js boundary. Pages Router: pages/404.js, pages/500.js, pages/_error.js. Always provide meaningful fallback UIs for better UX."],
  ["What is Next.js middleware and how does it run at the edge?", "hard", "Next.js middleware.ts runs in the Edge Runtime (Vercel Edge Functions or Node.js Edge-like runtime). It executes before every request, can inspect/modify request/response, is deployed globally on CDN edge nodes for low latency. Limited runtime: no Node.js APIs (fs, child_process), no heavy computation. Uses Web API standards: Request, Response, URL, Headers. Configurable via matcher: export const config = { matcher: ['/dashboard/:path*', '/api/:path*'] }. Middleware runs for every matched request type, including API calls and static assets."],
  ["What is the Edge Runtime in Next.js?", "hard", "Edge Runtime is a lightweight JavaScript runtime based on Web APIs (similar to Cloudflare Workers, Deno). It runs at the edge (CDN nodes) for low-latency responses. Used by: middleware, Edge Functions, some Route Handlers (export const runtime = 'edge'). Limitations: no Node.js builtins (fs, crypto full, streams), smaller memory/CPU limits, shorter execution timeout. Benefits: global deployment, sub-ms cold starts, no server management. Not suitable for heavy computation or database querying."],
  ["What is the Node.js Runtime vs Edge Runtime?", "hard", "Node.js Runtime: full Node.js API access (fs, path, crypto, child_process), database drivers, ORMs, long-running tasks. Default for Route Handlers and Server Components. Higher cold start latency (seconds). Edge Runtime: Web API subset, no Node.js APIs, faster cold starts (sub-ms), globally distributed. Choose Node Runtime when: using databases, file system, ORMs, heavy computation. Choose Edge Runtime when: simple transforms, redirects, authentication checks, geolocation-based logic. Mix both in the same app."],
  ["What is Turbopack and how does it compare to Webpack?", "hard", "Turbopack is an incremental JavaScript bundler written in Rust, developed by Vercel. Used as the dev server in Next.js 14+ (next dev --turbo). Significantly faster than Webpack (10-100x for large projects) due to Rust-based parallel computation, incremental computation, function-level caching. Not yet production-ready for builds (falls back to Webpack for next build). Webpack is fully customizable (loaders, plugins); Turbopack is less extensible but offers best-in-class dev experience. Eventually aims to replace Webpack entirely in Next.js."],
  ["How does Next.js optimize images automatically?", "med", "next/image provides: automatic format conversion (WebP, AVIF based on browser support), responsive sizes (srcSet generation for different viewports), lazy loading (native lazy loading + blur placeholder), CLS prevention (requires width/height or fill to reserve space), image optimization via Sharp library (self-hosted) or Vercel Edge (cloud). Configure allowed image domains/patterns in next.config.js. Images can be optimized on-demand or at build time."],
  ["What is the Vercel Image Optimization API?", "med", "Vercel's Image Optimization API (/vercel/image URL path) automatically optimizes images on the edge: resizes to requested dimensions, converts to optimal format (WebP/AVIF), applies quality settings. Billed by source image count (not transformations). Works with any image source (not just Vercel-hosted). Self-hosted alternative: install sharp, configure images provider. No additional setup — next/image on Vercel uses this by default."],
  ["How do you deploy Next.js outside of Vercel?", "med", "Options: 1) Node.js server: next start with output: 'standalone' (includes minimal node_modules). 2) Docker: build standalone, package in Node.js Docker image. 3) Serverless: output: 'standalone' + serverless adapter (AWS Lambda via @slad NextJS adapter, Netlify, Cloudflare Pages via @cloudflare/next-on-pages). 4) Static: output: 'export' for fully static sites (no SSR, no API routes). 5) Self-managed: PM2, Nginx proxy to Node server. Standalone mode reduces deployment size from hundreds of MB to ~10-20MB."],
  ["What is the output: 'export' option in Next.js?", "med", "output: 'export' in next.config.js generates a fully static site (HTML/CSS/JS only). No Node.js server, no API routes, no ISR, no middleware (Edge or otherwise). All pages must be static (no getServerSideProps, no dynamic functions). Supports static export to any host (S3, Nginx, GitHub Pages). Image optimization disabled (use unoptimized images). Not suitable for sites needing dynamic rendering. Good for: documentation, marketing sites, portfolio sites."],
  ["What is output: 'standalone' mode?", "hard", "output: 'standalone' in next.config.js creates a minimal production build with only necessary files (node_modules, pruned via trace). Output in .next/standalone/. Run with node server.js from that directory. Reduces deployment size dramatically (from 300MB to ~30MB for a typical app). Includes public/ and .next/static copy. Supports Node.js only (not serverless). Ideal for Docker deployments and self-hosted Node.js servers."],
  ["How do you implement dark mode in Next.js?", "med", "Client-side approach: store preference in localStorage + cookie, use next-themes (wrapper) for React Context, apply dark class to <html>. Server-side approach: read theme cookie in middleware, set class on <html> via root layout. Prevents flash of wrong theme (FART). With next-themes: ThemeProvider wraps app, useTheme gives theme/setTheme. Support prefers-color-scheme media query for system default. Persist choice in localStorage or cookie."],
  ["What is the cookies() and headers() API in App Router?", "hard", "cookies() from 'next/headers' read/write cookies in Server Components and Route Handlers. Returns a promise (await in Next 15+): (await cookies()).get('session'), (await cookies()).set('theme', 'dark'). headers() returns request headers: (await headers()).get('user-agent'). Both are dynamic APIs — using them in a page forces dynamic rendering. Can also be used in middleware (NextRequest.cookies, NextResponse.cookies())."],
  ["What is the connection() function in Next.js 15?", "hard", "connection() from 'next/server' is a utility for checking connectivity state. Replaces navigator.onLine with a more robust API for detecting online/offline transitions. Used with useNetworkState for monitoring connection quality. Introduced alongside improvements to Server Components for offline-aware patterns. Not widely adopted yet — check latest docs for exact API surface."],
  ["What are React cache() and use() in Next.js context?", "hard", "React cache() wraps an async function to deduplicate calls within the same render pass. Useful for deduplicating database queries when the same data is needed in multiple Server Components in the same request. Example: const getUser = cache((id) => db.user.findUnique(id)). React use() unwraps promises (alternative to await): const data = use(fetchUserPromise). In Next.js, use() works in Server Components and integrates with Suspense boundaries for streaming."],
  ["How do you implement search params in App Router?", "med", "Two approaches: 1) Page receives searchParams as prop: export default function Page({ searchParams }: { searchParams: Promise<{ q?: string }> }) (Next 15+ uses Promise). 2) useSearchParams() in Client Component. Reading searchParams in a Server Component forces dynamic rendering. Update search params: useRouter.push with query string, or <Link href={{ query: { q: 'term' } }}>. For client-side: useSearchParams + useRouter.push to update URL without full reload."],
  ["What is the difference between searchParams prop and useSearchParams?", "hard", "searchParams prop (page.tsx): available in Server Components, forces dynamic rendering, accessible directly from props. useSearchParams(): available only in Client Components ('use client'), allows reactive updates and subscriptions. searchParams is a one-time snapshot (current URL on render). useSearchParams() updates when URL changes. searchParams can be read synchronously; useSearchParams() needs Suspense boundary in Next 15+. Use searchParams for initial data fetching; useSearchParams for client-side reactive UI."],
  ["How do you handle form submissions with Server Actions?", "hard", "Server Actions integrate with HTML forms: <form action={myAction}>. The action is an async 'use server' function. It receives FormData, can validate (Zod), interact with database, revalidate caches, and redirect. useActionState (React 19) manages form state: const [state, formAction, isPending] = useActionState(myAction, initialState). useFormStatus provides pending state for submit buttons (must be in a Client Component inside the form). Benefits: works without JS (progressive enhancement), CSRF-protected, type-safe."],
  ["What is useFormState and useFormStatus?", "hard", "useFormState (React 19): accepts a Server Action and initial state. Returns [state, formAction, isPending]. The Server Action receives previous state as first argument. Useful for returning validation errors or success messages. useFormStatus (React 19): returns { pending, data, method, action } for the parent form. Use in a submit button component to show loading state. Both require 'use client'. useFormState renamed to useActionState in React 19 stable."],
  ["What is the optimistic UI pattern with useOptimistic?", "hard", "useOptimistic (React 19) enables optimistic UI updates: immediately show the expected result of an action while the server processes it, then reconcile with actual server response. Pattern: const [optimisticState, addOptimistic] = useOptimistic(state, (current, optimisticValue) => merged). Call addOptimistic before Server Action. If Server Action succeeds, the optimistic state is confirmed. If it fails, the state reverts. Great for likes, comments, messages — any mutation where instant feedback improves UX."],
  ["How do you implement file uploads in Next.js?", "hard", "Two approaches: 1) FormData with Server Actions: const formData = new FormData(e.target), formData.append('file', file). Server Action receives FormData, extracts file with formData.get('file'), writes to filesystem or uploads to S3 using a library like formidable or busboy. 2) Route Handler: POST endpoint reads file from req, uploads to storage. For large files: use streaming uploads, chunked transfer. For client: use <input type='file'>, preview with URL.createObjectURL. Consider uploadthing or UploadThing for managed uploads."],
  ["What is the Next.js instrumentation.ts file?", "hard", "instrumentation.ts (or .js) in project root registers observability hooks. Export register() function that runs once per server instance on startup. Used for: OpenTelemetry initialization, Sentry SDK setup, Datadog tracing, custom logging configuration. Runs on both Vercel and self-hosted. Useful for setting up monitoring, performance tracing, and error tracking early in the boot process. Next 15+ also supports onRequestError hook for request-level error tracking."],
  ["What is OpenTelemetry support in Next.js?", "hard", "Next.js has built-in OpenTelemetry instrumentation for tracing requests, spans for Server Component renders, data fetching, route handlers, and middleware. Configure in next.config.js: experimental: { instrumentationHook: true }. Uses instrumentation.ts to configure exporter: import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node'; provider.register(). Traces can be exported to Jaeger, Zipkin, Datadog, or any OTel-compatible backend. Useful for performance analysis, distributed tracing, bottleneck identification."],
  ["How do you configure Content Security Policy in Next.js?", "hard", "Add CSP headers via: 1) middleware.ts: NextResponse.next() with Content-Security-Policy header. 2) next.config.js headers(). 3) Root layout <meta http-equiv>. Required for nonce-based CSP: generate nonce in middleware, pass to layout via header (x-nonce). Configure script-src, style-src, img-src, font-src, connect-src, frame-src. For next/script with nonce: set nonce prop. For Server Components with inline styles: they're hashed automatically. CSP prevents XSS and data injection attacks."],
  ["How does Next.js handle TypeScript configuration?", "med", "Next.js includes TypeScript support out-of-the-box. tsconfig.json at project root. Strict mode recommended: strict: true. Path aliases via paths: { '@/*': ['./src/*'] } — Next.js automatically syncs to webpack config. Plugins: next.config.js with transpilePackages for monorepo TS packages. Type checking: next build runs type-checking. For faster dev type-checking: use experimental: { typedRoutes: true } for type-safe Link hrefs."],
  ["What is the tsconfig paths alias in Next.js?", "med", "Path aliases simplify imports: `{ \"compilerOptions\": { \"baseUrl\": \".\", \"paths\": { \"@/*\": [\"./src/*\"] } } }` in tsconfig.json. Then import '@/components/Header' instead of '../../components/Header'. Next.js automatically configures webpack to resolve these aliases. Also supports multiple aliases: \"@components/*\": [\"./src/components/*\"], \"@utils/*\": [\"./src/utils/*\"]. Must restart dev server after changes."],
  ["How do you use CSS Modules in Next.js?", "easy", "Name files *.module.css: import styles from './Button.module.css'. Then className={styles.primary}. CSS Modules scope styles locally (generates unique class names). Works in both Pages and App Router. Supports composition (composes: base). Compatible with Sass/SCSS (*.module.scss). No configuration needed — built-in. CSS Modules are ideal for component-scoped styles without naming conflicts."],
  ["How do you use Tailwind CSS in Next.js?", "easy", "Install: npm install -D tailwindcss postcss autoprefixer, npx tailwindcss init. Configure content paths in tailwind.config.js: content: ['./src/**/*.{js,ts,jsx,tsx}']. Add @tailwind directives in global CSS. Use utility classes: className='text-lg font-bold text-gray-900 dark:text-white'. Tailwind + Next.js is the recommended styling approach. Works with both Server and Client Components. Purges unused CSS automatically in production builds."],
  ["What is the global CSS file in Next.js?", "easy", "App Router: app/globals.css imported in root layout (import './globals.css'). Global CSS affects all routes. Pages Router: pages/_app.js imports global CSS. App Router only allows global CSS imports in root layout.js — other layouts/components must use CSS Modules or Tailwind. Global CSS is for: Tailwind directives, reset styles, CSS custom properties (design tokens), font-face declarations."],
  ["How do you use Sass in Next.js?", "easy", "Install: npm install sass. Name files *.scss (or *.module.scss for CSS Modules). Global SCSS: import './styles/variables.scss' in root layout. Variables: use Sass variables, mixins, nesting, and partials. Next.js supports Sass out-of-the-box after installing the sass package. Configure additional Sass options via next.config.js: sassOptions: { includePaths: ['./src/styles'] } for cleaner imports."],
  ["What is the React Server Component payload?", "hard", "The RSC payload is a serialized representation of Server Component output sent from server to client. It's NOT HTML — it's a special format that includes: component tree structure, props (serialized), client component references (module IDs), promises for streaming data. The client reconstructs the React tree from this payload without sending the server component code to the browser. Format: a stream of chunks with JSON-like tuples (type markers, references, props). The payload is highly optimized (no hydration scripts for server components)."],
  ["How does the App Router handle data mutations?", "hard", "Mutations in App Router use Server Actions ('use server'). Pattern: form submission → Server Action validates (Zod) → reads/writes database → revalidates cache (revalidatePath/revalidateTag) → optionally redirects. For non-form mutations: invoke server action programmatically with startTransition. Benefits: progressive enhancement (works without JS), automatic CSRF protection, type safety between client and server. Avoid manual fetch POST calls to API routes for mutations — use Server Actions instead."],
  ["What is the difference between push() and replace() in useRouter?", "med", "push(url) navigates to a new URL, adding a new entry to the browser history stack (user can go back). replace(url) navigates to a new URL, replacing the current history entry (user cannot go back to previous page). Use push for: normal navigation, multi-step flows where back is expected. Use replace for: redirect traffic after login, suppressing back-navigation to auth pages, form submissions that shouldn't be resubmitted on back."],
  ["What is next/dynamic?", "med", "next/dynamic is a React.lazy wrapper that enables dynamic imports (code splitting) for Client Components and third-party libraries. Usage: const DynamicChart = dynamic(() => import('../components/Chart'), { loading: () => <Skeleton />, ssr: false }). Options: loading (fallback UI during load), ssr: false (skip server rendering — client-only component), suspense (wrap in Suspense for streaming). Dynamic components are not included in the initial bundle — loaded on demand. Reduces initial JS bundle size."],
  ["When would you use dynamic() over React.lazy()?", "hard", "next/dynamic extends React.lazy with Next.js-specific features: ssr: false (skip server-side rendering for client-only components like charts/maps), loading state directly in options (built-in Suspense integration), SSR hydration control (no flicker for pure client components). React.lazy is more generic but requires manual Suspense wrapping. Use next/dynamic in Next.js apps — it's the framework-aware version. React.lazy is useful in custom setups without Next.js."],
  ["How do you implement a loading skeleton in Next.js?", "med", "Create loading.js in route segment (app/dashboard/loading.js). Export a default component with skeleton UI: pulsing placeholders, shimmer animation, or spinner. loading.js uses Suspense automatically. For granular skeletons: wrap specific components in <Suspense fallback={<Skeleton />}> directly. Skeleton can be a Server Component (no 'use client' needed for static skeleton). Use CSS animation or Tailwind animate-pulse. Example: <div className='animate-pulse bg-gray-200 h-48 rounded' />."],
  ["What is the next.config.js headers() function?", "med", "headers() in next.config.js returns an array of header rules: { source: '/:path*', headers: [{ key: 'X-Frame-Options', value: 'DENY' }] }. Used for: security headers (CSP, HSTS, X-Frame-Options), CORS headers for API routes, custom headers per route pattern. source supports path patterns (/:param*, /api/:path*). headers() runs for every matching request. For dynamic headers: use middleware instead."],
  ["What is Multi-Zone architecture in Next.js?", "hard", "Multi-Zone splits a large Next.js application into multiple independent Next.js apps (zones), each deployed separately, accessed under the same domain. Each zone has its own build process, dependencies, and deployment. Zones communicate via rewrites (app A rewrites /blog/* to app B). Benefits: independent deployments, smaller builds, team autonomy. Trade-offs: shared state, shared design system consistency, more complex routing. Useful for large enterprise apps with multiple teams."],
  ["What is the _app.js equivalent in App Router?", "med", "_app.js (Pages Router) wraps all pages (global providers, global CSS, layout). App Router replaces this with: root layout.js (app/layout.js) — required, wraps all routes, provides <html>/<body>, global providers, fonts. No _app.js equivalent needed — layout.js is simpler and more powerful (per-segment layouts, server component support, streaming). For global providers (ThemeProvider, AuthProvider), wrap children in root layout."],
  ["What is a root layout in Next.js?", "med", "The root layout (app/layout.js) is a required file that wraps the entire application. It defines: <html> tag (with lang attribute), <body> tag, global CSS imports, font imports (next/font), metadata defaults (title, description, viewport). Root layout replaces _app.js and _document.js from Pages Router. It's a Server Component by default. Must accept children prop and render it. Only one root layout per app."],
  ["What is a nested layout and how does it improve performance?", "hard", "Nested layouts (layout.js in each route segment) wrap only their segment's children. They persist across navigations within that segment (don't remount, preserve state). The parent layout doesn't re-render when navigating between child pages — only the page content changes. This reduces DOM updates, preserves scroll position, and improves navigation performance. Example: /dashboard/layout.js persists sidebar while /dashboard/analytics and /dashboard/settings swap main content."],
  ["How do you measure Core Web Vitals in Next.js?", "hard", "Next.js provides built-in Core Web Vitals reporting via the 'use reportWebVitals' hook (Pages Router: _app.js, App Router: useReportWebVitals in a Client Component wrapper). Metrics reported: LCP, FID/INP, CLS, FCP, TTFB. Export to analytics: sendToAnalytics({ id, name, value }). For real user monitoring: use Vercel Analytics, Google Analytics 4, or self-hosted analytics. Lab data: use Lighthouse, PageSpeed Insights, WebPageTest. Next.js automatically optimizes for good Core Web Vitals with its built-in features."],
  ["What is next/analytics?", "med", "next/analytics is Vercel's built-in analytics integration (formerly @vercel/analytics). Provides: real user monitoring, Core Web Vitals tracking, page views, geolocation, device/traffic source data. No external scripts or cookie banners needed (Vercel handles it). Lightweight: ~1KB bundle. Setup: import { Analytics } from '@vercel/analytics/react'; <Analytics /> in root layout. Works only on Vercel deployment."],
  ["What changed in Next.js 13 vs 14?", "hard", "Next.js 13 (Oct 2022): introduced App Router (beta), Turbopack (alpha), Server Components, next/font, next/image (new), metadata API. Next.js 14 (Oct 2023): App Router stable, Server Actions (stable), Partial Prerendering (preview), Turbopack improvements (50% faster local dev), no behavior-breaking changes from 13.4+. Key: 14 made App Router production-ready with stable APIs. Migration from Pages to App Router became the recommended path."],
  ["What is new in Next.js 15?", "hard", "Next.js 15 (Oct 2024): React 19 support, React Compiler (experimental), form actions with useActionState stable, 'use cache' directive for fine-grained caching, cacheTag/cacheLife functions, connection() API, Turbopack stable for dev (--turbo), @next/codemod for upgrades, async request APIs (params, searchParams are Promises), middleware stable, instrumentation.js stable, Partial Prerendering incremental adoption."],
  ["What is the use of generateStaticParams?", "med", "generateStaticParams (App Router) replaces getStaticPaths from Pages Router. It's an async function exported from a dynamic route page that returns an array of param objects. Example: export async function generateStaticParams() { const posts = await db.post.findMany(); return posts.map(p => ({ slug: p.slug })); }. Combined with fetch revalidate or ISR, it pre-renders specified paths. Supports fallback behavior via dynamicParams: true (default, tries to generate on-demand) or false (404)."],
  ["How do you cache database queries in Next.js?", "hard", "Options: 1) React cache() wraps DB calls for per-request deduplication: const getUser = cache(async (id) => db.user.findUnique(id)). 2) Data Cache via fetch: if your DB is behind an HTTP API, use fetch with next: { revalidate: 60 }. 3) unstable_cache for arbitrary async functions: const getUser = unstable_cache((id) => db.user.findUnique(id), ['user'], { tags: ['users'] }). 4) 'use cache' directive (Next 15+): automatically caches component output. 5) External cache: Redis for distributed caching (Store the query result in Redis with TTL)."],
  ["What is the draftMode() API in Next.js?", "hard", "draftMode() enables preview mode for headless CMS content. Enable: draftMode().enable() in a Route Handler (called from CMS preview button). Creates a cookie that Server Components can check: const { isEnabled } = draftMode(). When enabled, bypasses caching, fetches draft/unpublished content. Disable: draftMode().disable(). Use for: previewing blog posts before publishing, testing content changes, CMS preview integration. Replaces the getInitialProps-based preview from Pages Router."],
  ["How do you implement rate limiting in Next.js middleware?", "hard", "Rate limiting in middleware (Edge): track request counts per IP in an in-memory Map (simple, resets on each cold start) or use Vercel KV (Redis) for persistent counters. Pattern: read client IP from request headers, fetch count from KV, if > limit return 429 response. For Vercel: use @upstash/ratelimit + Vercel KV (Redis). For self-hosted: in-memory LRU cache (limited to single instance) or Redis. Middleware is ideal because it runs before the request reaches your app, reducing server load."],
  ["What is the forbidden() and unauthorized() response in Next.js 15?", "hard", "forbidden() (next/navigation) throws a FORBIDDEN error, caught by forbidden.js error boundary (similar to not-found.js). unauthorized() throws UNAUTHORIZED, caught by unauthorized.js. These simplify auth error handling: instead of manual redirects, just call forbidden() in Server Components or Server Actions. Each renders a designated error boundary file. More declarative than redirect('/403'). Standardizes HTTP error handling in the App Router."],
  ["How do you test Next.js applications?", "hard", "Testing stack: Vitest/Jest for unit tests (next/jest config), React Testing Library for component tests, Playwright for E2E tests. Component testing: mount Server Components (with data mocking), test Client Components with RTL. E2E: Playwright with next start (production build). Integration tests for API routes: supertest + Route Handler. MSW for API mocking. Testing Server Actions: call them directly with mocked DB. Next.js provides @next/testing utilities for configuration."],
  ["What is Playwright vs Cypress for Next.js E2E tests?", "med", "Playwright: multi-browser (Chromium, Firefox, WebKit), parallel execution, network interception, mobile emulation, API testing, trace viewer. Better performance, richer debugging. Cypress: developer-friendly API, time-travel debugging, automatic waiting, real-time reloads. Smaller browser support (Chromium-based). For Next.js: Playwright is more popular due to better Edge Runtime compatibility, multi-browser support, and Vercel's recommendation. Both work well; Playwright has edge for cross-browser and performance."],

  // ── Conceptual / Modern (current industry questions) ──────────────────────
  ["Why are Server Components the default in the App Router?", "hard", "Server Components reduce client-side JavaScript: only interactive components are sent to the browser. They directly access databases, APIs, and file systems without exposing sensitive logic to the client. Automatic code splitting: framework decides what to send based on component boundaries. Better initial page load (no hydration needed for static content). Making them default encourages a server-first mindset — add 'use client' only where interactivity is required, minimizing the client bundle."],
  ["How does the App Router decide between static and dynamic rendering at build time?", "hard", "Next.js analyzes exported APIs used in the route. If route uses no dynamic APIs (cookies, headers, searchParams, dynamic functions) and fetch calls are cacheable, it's statically rendered at build time. If route uses any dynamic API or uncached fetch, it's dynamically rendered per request. Dynamic rendering can be forced: export const dynamic = 'force-dynamic'. Static rendering forced with export const dynamic = 'force-static' (may cause errors if dynamic APIs accessed)."],
  ["What makes a route opt into dynamic rendering automatically?", "hard", "Using any of these in a route forces dynamic rendering: 1) cookies() or headers() from 'next/headers', 2) reading searchParams prop, 3) fetch with cache: 'no-store', 4) fetch with next: { revalidate: 0 }, 5) calling noStore() from 'next/cache', 6) using export const dynamic = 'force-dynamic', 7) calling draftMode(). The entire route becomes dynamic — parent layouts and nested segments are also dynamic (unless they have their own static boundaries via Suspense/PPR)."],
  ["How do cookies(), headers(), and searchParams force dynamic rendering?", "hard", "These functions read request-time data (cookies, headers, URL query params). Since their values aren't known until the actual request, the page cannot be pre-rendered at build time. Next.js marks routes using these APIs as 'dynamic' — they'll render on each request. In Next 15, these are async (Promise): const searchParams = await props.searchParams. The dynamic status propagates to parent layouts — using searchParams in page.tsx also makes layout.js dynamic (unless layout itself is cached separately)."],
  ["What is the default fetch caching behavior in Next.js 15 vs Next.js 14?", "hard", "Next.js 14: fetch() defaults to cache: 'force-cache' (cached indefinitely unless revalidated). Many developers unknowingly cached data that should be fresh. Next.js 15: fetch() defaults to cache: 'no-store' (no caching). This was a breaking change — data is fresh by default, caching is opt-in. To cache in Next 15: fetch(url, { next: { revalidate: 60 } }) or fetch(url, { cache: 'force-cache' }). The change surprised teams upgrading — review all fetch calls for expected caching behavior."],
  ["How do you opt a fetch into caching with the cache and next options?", "hard", "To cache a fetch: fetch(url, { cache: 'force-cache' }) — cache until revalidated. For time-based ISR: fetch(url, { next: { revalidate: 3600 } }) — revalidate at most once per hour. For tag-based revalidation: fetch(url, { next: { tags: ['posts'] } }) — invalidate on demand with revalidateTag('posts'). To disable cache: fetch(url, { cache: 'no-store' }) or fetch(url, { next: { revalidate: 0 } }). Options are mutually exclusive: use either cache or next, not both."],
  ["What is the difference between revalidatePath and revalidateTag?", "hard", "revalidatePath purges the Data Cache AND the Router Cache for a specific path. revalidateTag purges only the Data Cache entries with that tag (any fetch with that tag on any route). Use revalidatePath when: you know exactly which URL to refresh (e.g., after updating a blog post, revalidate /blog/post-1). Use revalidateTag when: a change affects multiple pages (e.g., updating a product name needs to refresh product page + category page + search). In practice, Server Actions often call both."],
  ["When does on-demand revalidation differ from time-based ISR?", "hard", "Time-based ISR (revalidate: 60) refreshes the page at most once per 60 seconds after the first request in that window. The page may serve stale data for up to 60s after an update. On-demand revalidation (revalidatePath/revalidateTag) refreshes immediately when triggered (from CMS webhook, admin action, etc.). Always fresh data after invalidation. Use time-based for: data that changes predictably (hourly stats). Use on-demand for: user-triggered changes (admin updates, content publishing)."],
  ["How does the Next.js Router Cache differ from the Full Route Cache?", "hard", "Router Cache (client-side): stores RSC payloads in the browser's memory (~5min or 30s for dynamic). Enables instant back/forward navigation. Full Route Cache (server-side): stores static HTML/RSC payloads on the server (persists across deployments). Used for statically generated routes. Router Cache is per-session; Full Route Cache is shared across all users. On mutation, revalidatePath clears Router Cache for that route; Full Route Cache is cleared on next build or on-demand revalidation."],
  ["What is the Data Cache and how long does it persist?", "hard", "The Data Cache (server-side) stores fetch responses and unstable_cache outputs. It persists: across requests (serves cached data until revalidated or evicted). On Vercel: persists across deployments (KV-backed, shared storage). On self-hosted: persists on filesystem (.next/cache). Eviction: LRU when memory/disk limit reached, or on-demand via revalidation. Next 15: fetch defaults to cache: 'no-store' (data cache not used by default). Data Cache lifetime is controlled by revalidation frequency."],
  ["Why might stale data appear after a mutation and how do you fix it?", "hard", "Stale data appears when: 1) you forgot to call revalidatePath/revalidateTag after mutation, 2) Router Cache still has old data (happens with client navigation after Server Action), 3) ISR hasn't revalidated yet (time-based window). Fix: always call revalidatePath or revalidateTag in your Server Action. For stubborn Router Cache: use router.refresh() on the client. For ISR: use on-demand revalidation instead of time-based."],
  ["How do Server Actions integrate with revalidation after a mutation?", "hard", "Server Actions should call revalidation after successful mutations. Pattern: async function createPost(formData) { 'use server'; await db.post.create(data); revalidateTag('posts'); // clears Data Cache for 'posts' tag. revalidatePath('/blog'); // clears Router Cache for /blog. redirect('/blog/new-post'); }. Multiple revalidations can be called in one action. Without revalidation, the user won't see the new data until the Router Cache expires or hard refresh."],
  ["What security considerations apply to Server Actions exposed as endpoints?", "hard", "Server Actions are POST endpoints accessible by anyone who knows the action ID. Security measures: 1) Authentication: check user session inside the action (don't trust client), 2) Authorization: verify user can perform the action (admin-only, ownership), 3) Input validation: validate all form data (Zod), 4) CSRF protection: built-in via SameSite cookies + cryptographic action tokens, 5) Rate limiting: prevent abuse, 6) Don't expose sensitive operations without auth, 7) Server Actions bypass your middleware — implement auth inside the action."],
  ["How does Partial Prerendering combine a static shell with dynamic holes?", "hard", "PPR prerenders the page shell (navigation, sidebar, footer) as static HTML at build time. Dynamic parts wrapped in Suspense are marked as 'holes'. On request: the static shell serves instantly, while dynamic holes stream in as they render. The static shell has full interactivity hydration. Suspense boundaries define each hole. Files: the page file defines both static parts (outside Suspense) and dynamic parts (inside Suspense). Config: experimental: { ppr: 'incremental' } in Next.js 15."],
  ["What role does Suspense play in enabling Partial Prerendering?", "hard", "Suspense boundaries define the split between static and dynamic in PPR. Everything outside Suspense is prerendered statically. Everything inside Suspense boundaries can be either: dynamically rendered on demand (if using dynamic APIs) or statically prerendered (if data is cacheable). Suspense also enables streaming — each boundary streams its content as it becomes ready. The fallback prop of Suspense becomes part of the static shell. Suspense is the building block for both streaming and PPR."],
  ["How does streaming with loading.js improve perceived performance?", "hard", "loading.js provides an immediate loading UI (skeleton) while the page content streams from the server. Users see something happening instantly — perceived load time drops from page-level wait (entire content) to segment-level wait (first chunk). Parts of the page become interactive as they load (progressive hydration). Works best with Suspense boundaries at natural visual breakpoints (header, main content, sidebar). Without streaming, users wait for all data fetching to complete before seeing anything."],
  ["When should you choose a Route Handler over a Server Action?", "hard", "Route Handlers (route.ts) for: 1) GET endpoints — Server Actions don't support GET, 2) External API consumption (your Next.js app being called by another service), 3) Webhook receivers (Stripe, Clerk, etc.), 4) File downloads (streaming large files), 5) Caching responses (Route Handlers support static rendering), 6) Server Actions for mutations within the same app. Rule of thumb: GET → Route Handler. Mutations triggered from forms → Server Action. External API → Route Handler."],
  ["Why can you not use Server Actions for GET-style data fetching?", "hard", "Server Actions are designed for mutations (POST semantics). They require a form submission or programmatic invocation. They can't be called directly from a URL or <Link>. For data fetching: use Server Components (async components that fetch directly) or Route Handlers (GET endpoints). Server Actions can return data, but it's an anti-pattern — they're for side effects (create, update, delete), not queries. Using actions for data fetching breaks browser caching, history, and shareable URLs."],
  ["How does Next.js dedupe identical fetch calls during one render pass?", "hard", "Next.js automatically deduplicates fetch requests with the same URL and options within a single render pass. If two Server Components (or one Server Component and a nested Server Component) both fetch the same URL, only one request is made. This happens automatically — no cache() wrapper needed for fetch. The deduplication is per-request (across all Server Components rendering in that request). React's cache() extends this to any async function (DB queries, file reads)."],
  ["What is React cache() used for in Server Components data access?", "hard", "React cache() wraps async functions (database queries, file reads) to deduplicate calls within the same render pass. Example: const getUser = cache(async (id) => await db.user.findUnique({ where: { id } })). When getUser(1) is called in multiple components during the same request, the DB query runs only once. cache() is per render pass — not across requests. Next.js adds fetch deduplication automatically; cache() is needed for non-fetch async operations (direct DB calls, SDK calls)."],
  ["How do parallel routes let you render multiple pages in one layout?", "hard", "Parallel routes use @folder slots: app/layout.tsx renders @team and @analytics slots independently. Each slot can have its own loading.js, error.js, not-found.js. The parent layout receives slot components as props: export default function Layout({ children, team, analytics }) { return <div>{team}{analytics}</div> }. Slots share the parent URL but not routing state — they navigate independently. Use for: dashboards (team panel + analytics panel), multi-column layouts, split views."],
  ["What problem do intercepting routes solve for modal flows?", "hard", "Intercepting routes solve the URL-incoherence problem in modal patterns. Example: user visits /gallery (photo grid), clicks photo, sees modal at /photo/123 (URL changes), shares URL — the modal should render as standalone page when accessed directly (without gallery context). Intercepting routes: app/feed/(.)photo/[id] makes navigation from /feed show modal; direct URL visit to /photo/123 shows full page. Pattern: intercept at current level for modal, hard refresh/reload shows the actual route."],
  ["Why does a Client Component boundary include its imported children as client code?", "hard", "When a file has 'use client', all components imported by that file (directly or transitively) are treated as Client Components. This is because the client bundle is a JavaScript chunk — the server can't split it at module boundaries once 'use client' is encountered. Solution: pass Server Components as props (children, slots) to Client Components — children remain server-side. Move 'use client' as deep as possible to minimize the client bundle. Any component imported by a client file is bundled for the browser."],
  ["How do you pass a Server Component as a child into a Client Component?", "hard", "Pass a Server Component as a prop (usually children) to a Client Component. The Server Component renders on the server, and its output is passed as props to the Client Component. The Client Component receives the pre-rendered content without needing to re-execute it on the client. Pattern: // In a Server Component page — <ClientWrapper><ServerContent /></ClientWrapper>. ClientWrapper (client) renders {children} — it gets the server-rendered content as a prop. The RSC payload embeds the Server Component output within the Client Component's props."],
  ["What is the RSC payload and how is it streamed to the browser?", "hard", "The RSC (React Server Component) payload is a stream of chunks encoding the rendered Server Component tree. Format: each chunk is a JSON-like array with type markers ('T' for text, 'I' for element, 'S' for Suspense, 'P' for promise pending, 'D' for data resolved). The payload is streamed via HTTP chunked transfer encoding or the Web Streams API. The client-side React reconciler reads this stream, builds a virtual tree, and patches it into the client tree (merging with client-only components)."],
  ["How does the Edge Runtime differ from Node for available APIs?", "hard", "Edge Runtime: Web API subset (fetch, Request, Response, URL, URLSearchParams, Headers, TextEncoder, crypto.subtle, WebSocket). No: Node.js builtins (fs, path, child_process, stream, http), CommonJS (ESM only), synchronous APIs, process (limited: process.env works), setTimeout/setInterval (limited). No: database drivers (unless they support Edge/Web Streams). Yes: Vercel Edge-specific APIs (geolocation, ipAddress). Runtime detection: typeof EdgeRuntime !== 'undefined'."],
  ["What are the limitations of running middleware at the edge?", "hard", "Middleware runs in Edge Runtime: no Node.js APIs (fs, child_process, database drivers), limited execution time (Vercel: 30s, but recommended <1ms), limited memory (128MB), no long-running connections, no file system writes. Cannot: query databases directly, use ORMs, read/write filesystem, make blocking I/O calls that take >1ms. Should: check auth tokens, read cookies, geo-redirects, simple header manipulation, URL rewrites. For complex logic: move to Server Components or Route Handlers."],
  ["Why should middleware avoid heavy computation or database calls?", "hard", "Middleware blocks every request — it runs before the page renders. If middleware takes 500ms to query a database, every request (including static assets, API calls, and page navigations) is delayed by 500ms. Middleware runs on every matched route, including prefetches. Keep middleware fast (<1ms) — just read headers, cookies, and URL, then redirect/rewrite as needed. For heavy auth: check JWT signature (fast) in middleware, verify database state in the Server Component (only for the specific page)."],
  ["How does generateStaticParams enable static generation of dynamic routes?", "med", "generateStaticParams returns an array of param objects. Next.js pre-renders each returned param set at build time. Example: for /blog/[slug]/page.js, generating params [{slug:'hello'},{slug:'world'}] creates /blog/hello (static HTML) and /blog/world (static HTML). Combined with fetch revalidation (ISR), these pages can be updated after build. dynamicParams: true (default) also generates unlisted paths on-demand (with ISR). dynamicParams: false returns 404 for unlisted paths. Use for: blogs, docs, product pages with known content."],
  ["What does dynamicParams = false do for unlisted dynamic segments?", "hard", "dynamicParams = false in a generateStaticParams page returns 404 for any dynamic segment not listed in the returned params. Example: generateStaticParams returns only [{slug:'hello'}]; /blog/world returns 404. This is useful for: sites where content is known at build time (docs, marketing sites), SSG-only deployments (no server needed). dynamicParams = true (default) tries to generate the page on demand (ISR/SSR). Dynamic params value is available in params — only the route level param is populated."],
  ["How do nested layouts preserve state across navigations?", "hard", "Layout components in Next.js App Router are preserved across navigations within their segment. Example: app/dashboard/layout.js renders sidebar and nav. Navigating from /dashboard/analytics to /dashboard/settings keeps the layout mounted (no remount, React state preserved). Only the page component (in layout's children slot) changes. This works because Next.js renders layout outside the page's Suspense boundary — layout is part of the root tree that persists. The Router Cache stores layout state across soft navigations."],
  ["What is the difference between a hard navigation and a soft navigation?", "med", "Hard navigation: full page reload (browser refresh, URL bar enter, external link). Clears all React state, re-fetches layout data, reinitializes components. Soft navigation: client-side navigation (Link click, router.push). Preserves layout state, re-renders only the page component (and its child tree). The Router Cache serves prefetched data. Soft navigation is faster but may show stale data if cache isn't invalidated. Next.js uses soft navigation by default for internal links."],
  ["How does Link prefetching behave for static vs dynamic routes?", "hard", "Static routes: Link prefetches the full RSC payload (entire page content) in the background. When clicked, navigation is instant — no loading state. Dynamic routes (using cookies, headers, searchParams, or fetch with no-store): Link prefetches only the static shell (layout, loading states). The dynamic data is fetched on click. This balances prefetching speed with fresh dynamic data. Prefetching happens when Link enters viewport or on hover (in dev). Production: prefetch on hover is more aggressive."],
  ["Why does moving 'use client' lower in the tree reduce client bundle size?", "hard", "Every file marked 'use client' and all its imports are bundled for the browser. If you put 'use client' in a parent component that wraps many children, all children (even non-interactive ones) become client code. Moving 'use client' to only the interactive leaf components means: server components stay on the server, their code is not sent to the browser, only the small interactive leaf and its imports are client-bundled. Example: a page with a 'use client' wrapper around 20MB of chart code — moving 'use client' to just the chart component saves 20MB from the initial bundle."],
  ["What changed about caching defaults that surprised teams upgrading to Next 15?", "hard", "Next.js 15 made fetch() default to cache: 'no-store' (no caching) instead of cache: 'force-cache' (cached by default). This was the biggest surprise — teams found their data fetching wasn't cached anymore. Pages that relied on automatic caching showed degraded performance. Fix: explicitly add cache: 'force-cache' or next: { revalidate } where caching is desired. Many apps had fetch calls that never intended to cache (user data, live content) — they actually benefited from the fix."],

  // ── Code / Implementation ─────────────────────────────────────────────────
  [`Write a Server Action that creates a record and calls revalidatePath afterward.`, "hard", `// app/actions.ts
'use server';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { z } from 'zod';

const schema = z.object({ title: z.string().min(1), content: z.string() });

export async function createPost(formData: FormData) {
  const data = schema.parse({ title: formData.get('title'), content: formData.get('content') });
  const post = await db.post.create({ data });
  revalidatePath('/blog');          // clears Router Cache
  revalidateTag('posts');           // clears Data Cache for 'posts' tag
  redirect(\`/blog/\${post.slug}\`);
}`],
  [`Implement a Route Handler in route.ts that returns JSON for a GET request.`, "med", `// app/api/hello/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Hello from Next.js!' }, { status: 200 });
}

// With cache control:
export const dynamic = 'force-static'; // cache at build time
// Or ISR-style: fetch-based or revalidateTag`],
  [`Write a Route Handler that reads the request body for a POST.`, "med", `// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const post = await db.post.create({ data: body });
  return NextResponse.json(post, { status: 201 });
}

// With validation:
export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = z.object({ title: z.string(), content: z.string() }).safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error }, { status: 400 });
  const post = await db.post.create({ data: parsed.data });
  return NextResponse.json(post, { status: 201 });
}`],
  [`Implement middleware that redirects unauthenticated users to /login.`, "hard", `// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  if (!session) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};`],
  [`Write middleware that rewrites a path based on a geo header.`, "hard", `// middleware.ts (Vercel-specific geo headers)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const country = request.geo?.country || 'US';
  const locale = request.headers.get('accept-language')?.split(',')[0]?.split('-')[0] || 'en';
  const url = new URL(request.url);
  url.pathname = \`/\${country.toLowerCase()}/\${url.pathname.slice(1)}\`;
  return NextResponse.rewrite(url);
}

export const config = { matcher: ['/((?!api|_next|.*\\\\..*).*)'] };`],
  [`Implement generateStaticParams for a /blog/[slug] route from a list of slugs.`, "med", `// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts').then(r => r.json());
  return posts.map((post: { slug: string }) => ({ slug: post.slug }));
}

// Or with database:
export async function generateStaticParams() {
  const posts = await db.post.findMany({ select: { slug: true } });
  return posts.map(({ slug }) => ({ slug }));
}

// Page component receives params:
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await db.post.findUnique({ where: { slug } });
  if (!post) notFound();
  return <article>{post.title}</article>;
}`],
  [`Write a generateMetadata function that sets a dynamic title from params.`, "med", `// app/blog/[slug]/page.tsx
import type { Metadata } from 'next';
import { db } from '@/lib/db';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await db.post.findUnique({ where: { slug }, select: { title: true, excerpt: true } });
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: 'article' },
  };
}`],
  [`Implement a fetch with next: { revalidate: 60 } in a Server Component.`, "med", `// app/posts/page.tsx
export default async function PostsPage() {
  const res = await fetch('https://api.example.com/posts', {
    next: { revalidate: 60 } // ISR: revalidate at most every 60 seconds
  });
  const posts = await res.json();
  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
}`],
  [`Write a fetch tagged with next: { tags: ['posts'] } and revalidate it from an action.`, "hard", `// app/posts/page.tsx — tagged fetch
export default async function PostsPage() {
  const res = await fetch('https://api.example.com/posts', {
    next: { tags: ['posts'] }
  });
  const posts = await res.json();
  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
}

// app/actions.ts — on-demand revalidation
'use server';
import { revalidateTag } from 'next/cache';
export async function updatePost() {
  await db.post.update(...);
  revalidateTag('posts'); // clears ALL fetch calls with 'posts' tag
  revalidatePath('/posts'); // clears Router Cache for /posts
}`],
  [`Implement a form using useActionState bound to a Server Action.`, "hard", `// app/posts/new/page.tsx
'use client';
import { useActionState } from 'react';
import { createPost } from '@/app/actions';

export default function NewPostPage() {
  const [state, formAction, isPending] = useActionState(createPost, { errors: {} });
  return (
    <form action={formAction}>
      <input name="title" defaultValue={state?.title} />
      {state?.errors?.title && <p className="error">{state.errors.title}</p>}
      <textarea name="content" />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Creating...' : 'Create Post'}
      </button>
      {state?.success && <p>Post created!</p>}
    </form>
  );
}`],
  [`Build a submit button that shows pending state with useFormStatus.`, "hard", `// app/components/SubmitButton.tsx
'use client';
import { useFormStatus } from 'react';

export function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn btn-primary">
      {pending ? <span className="spinner" /> : children}
    </button>
  );
}

// Usage: <form action={myAction}><SubmitButton>Save</SubmitButton></form>`],
  [`Implement optimistic comment posting with useOptimistic and a Server Action.`, "hard", `'use client';
import { useOptimistic, useRef } from 'react';
import { addComment } from '@/app/actions';

type Comment = { id: string; text: string; pending?: boolean };

export function CommentSection({ comments: initial }: { comments: Comment[] }) {
  const [optimisticComments, addOptimistic] = useOptimistic(
    initial,
    (state: Comment[], newComment: Comment) => [...state, newComment]
  );
  const formRef = useRef<HTMLFormElement>(null);

  async function formAction(formData: FormData) {
    const text = formData.get('text') as string;
    addOptimistic({ id: 'temp', text, pending: true });
    formRef.current?.reset();
    await addComment(formData); // Server Action
  }

  return (
    <form action={formAction} ref={formRef}>
      <input name="text" required />
      <button type="submit">Comment</button>
      <ul>{optimisticComments.map(c => <li key={c.id} className={c.pending ? 'opacity-50' : ''}>{c.text}</li>)}</ul>
    </form>
  );
}`],
  [`Write a loading.js skeleton for a slow dashboard route.`, "med", `// app/dashboard/loading.tsx
export default function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-4 p-6">
      <div className="h-8 bg-gray-200 rounded w-1/3" />
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-32 bg-gray-200 rounded" />
        ))}
      </div>
      <div className="h-64 bg-gray-200 rounded" />
    </div>
  );
}`],
  [`Implement an error.js boundary with a reset button for a route segment.`, "med", `// app/dashboard/error.tsx
'use client';
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="error-container p-6 text-center">
      <h2 className="text-xl font-bold text-red-600">Something went wrong!</h2>
      <p className="text-gray-600 mt-2">{error.message}</p>
      <button onClick={() => reset()} className="btn btn-primary mt-4">
        Try again
      </button>
    </div>
  );
}`],
  [`Build a not-found.js page and trigger it from notFound() in a server function.`, "med", `// app/not-found.tsx
import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h2 className="text-4xl font-bold">404</h2>
      <p className="text-gray-600 mt-4">Page not found</p>
      <Link href="/" className="btn btn-primary mt-6">Go Home</Link>
    </div>
  );
}

// Trigger: app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const post = await db.post.findUnique({ where: { slug } });
  if (!post) notFound();
  return <article>{post.title}</article>;
}`],
  [`Implement a catch-all route [...slug] that renders breadcrumbs from the segments.`, "hard", `// app/docs/[...slug]/page.tsx
import Link from 'next/link';

export default async function DocPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const slug = (await params).slug; // ['guide', 'getting-started']
  const content = await getDoc(slug.join('/'));
  if (!content) notFound();
  return (
    <div>
      <nav className="breadcrumbs text-sm text-gray-500 mb-4">
        <Link href="/">Home</Link>
        {slug.map((segment, i) => (
          <span key={segment}>
            {' / '}
            {i === slug.length - 1 ? (
              <span className="font-medium">{segment}</span>
            ) : (
              <Link href={\`/docs/\${slug.slice(0, i + 1).join('/')}\`}>{segment}</Link>
            )}
          </span>
        ))}
      </nav>
      <article>{content.body}</article>
    </div>
  );
}`],
  [`Write a parallel route layout with @team and @analytics slots.`, "hard", `// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
  team,
  analytics,
}: {
  children: React.ReactNode;
  team: React.ReactNode;
  analytics: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[1fr_3fr] gap-6 p-6">
      <aside className="space-y-4">
        <div className="bg-white rounded shadow p-4">{team}</div>
        <div className="bg-white rounded shadow p-4">{analytics}</div>
      </aside>
      <main className="bg-white rounded shadow p-6">{children}</main>
    </div>
  );
}

// Files: app/dashboard/@team/page.tsx, app/dashboard/@analytics/page.tsx`],
  [`Implement an intercepting route (.)photo for a modal over a gallery.`, "hard", `// app/gallery/page.tsx — gallery list page
// app/gallery/(.)photo/[id]/page.tsx — intercepts /photo/[id] from /gallery

// Intercepting route handler:
export default async function PhotoModal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const photo = await getPhoto(id);
  return (
    <div className="modal-overlay fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="modal-content bg-white rounded-lg p-6 max-w-2xl">
        <button onClick={() => router.back()} className="float-right">&times;</button>
        <img src={photo.url} alt={photo.title} className="w-full" />
      </div>
    </div>
  );
}

// Direct access /photo/[id]/page.tsx — full page for share/refresh`],
  [`Write a cookies()-based theme reader in a Server Component.`, "hard", `// app/layout.tsx (or any Server Component)
import { cookies } from 'next/headers';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = (await cookies()).get('theme')?.value || 'light';
  return (
    <html lang="en" className={theme}>
      <body>{children}</body>
    </html>
  );
}`],
  [`Implement a Route Handler that sets a cookie in the response.`, "med", `// app/api/set-theme/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { theme } = await request.json();
  const response = NextResponse.json({ success: true });
  response.cookies.set('theme', theme, { maxAge: 60 * 60 * 24 * 365, path: '/' });
  return response;
}`],
  [`Build a streaming page wrapping a slow component in Suspense with a fallback.`, "hard", `// app/dashboard/page.tsx
import { Suspense } from 'react';
import { SlowAnalyticsChart } from '@/components/SlowAnalyticsChart';
import { AnalyticsSkeleton } from '@/components/AnalyticsSkeleton';
import { FastStats } from '@/components/FastStats';

export default function DashboardPage() {
  return (
    <div className="space-y-6 p-6">
      <FastStats /> {/* Renders immediately — no Suspense */}
      <Suspense fallback={<AnalyticsSkeleton />}>
        <SlowAnalyticsChart /> {/* Streams in when data ready */}
      </Suspense>
    </div>
  );
}

// SlowAnalyticsChart is a Server Component that fetches and renders:
export async function SlowAnalyticsChart() {
  const data = await fetch('https://slow-api.example.com/chart', { cache: 'no-store' });
  const chart = await data.json();
  return <ChartComponent data={chart} />;
}`],
  [`Implement draftMode() to preview unpublished CMS content.`, "hard", `// app/api/draft/route.ts — CMS preview endpoint
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const secret = searchParams.get('secret');
  if (secret !== process.env.PREVIEW_SECRET) return new Response('Invalid token', { status: 401 });
  if (!slug) return new Response('Missing slug', { status: 400 });
  (await draftMode()).enable();
  redirect(\`/blog/\${slug}\`);
}

// In page.tsx — check draft mode:
export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { isEnabled } = draftMode();
  const post = isEnabled
    ? await getDraftPost(slug)   // Include unpublished content
    : await getPublishedPost(slug); // Only published content
  // ... render
}`],
  [`Write a next/image usage with fill, sizes, and priority for an LCP image.`, "med", `import Image from 'next/image';
export default function Hero() {
  return (
    <div className="relative w-full h-[500px]">
      <Image
        src="/hero.jpg"
        alt="Hero banner"
        fill
        sizes="100vw"
        priority
        className="object-cover"
      />
    </div>
  );
}
// fill: stretches to parent container
// sizes: informs browser of display size (100vw = full viewport width)
// priority: adds preload hint, disables lazy loading (use for LCP images)`],
  [`Implement dynamic import of a heavy chart with next/dynamic and ssr: false.`, "med", `import dynamic from 'next/dynamic';

const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  ssr: false, // Skip server render — browser-only
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded" />,
});

export default function AnalyticsPage() {
  return <HeavyChart />;
}`],
  [`Write a next.config.js with a custom headers() adding security headers.`, "med", `// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
    ];
  },
};
module.exports = nextConfig;`],
  [`Implement a rewrite in next.config.js to proxy /api to an external host.`, "med", `// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.example.com/:path*', // Proxies to external API
      },
    ];
  },
};
module.exports = nextConfig;`],
  [`Build a sitemap.ts that generates URLs from your content.`, "med", `// app/sitemap.ts
import { db } from '@/lib/db';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://example.com';
  const posts = await db.post.findMany({ select: { slug: true, updatedAt: true } });
  const postUrls = posts.map(post => ({
    url: \`\${baseUrl}/blog/\${post.slug}\`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: \`\${baseUrl}/blog\`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    ...postUrls,
  ];
}`],
  [`Implement robots.ts to control crawler access.`, "easy", `// app/robots.ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/dashboard/'],
    },
    sitemap: 'https://example.com/sitemap.xml',
  };
}`],
  [`Write an opengraph-image.tsx using ImageResponse for a dynamic OG image.`, "hard", `// app/blog/[slug]/opengraph-image.tsx
import { ImageResponse } from 'next/og';
import { db } from '@/lib/db';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await db.post.findUnique({ where: { slug } });
  return new ImageResponse(
    (
      <div style={{ fontSize: 64, background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <h1>{post?.title || 'Not Found'}</h1>
      </div>
    ),
    { ...size }
  );
}`],
  [`Implement rate limiting in middleware using an in-memory or KV counter.`, "hard", `// middleware.ts — Upstash Ratelimit + Vercel KV
import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(10, '10 s'), // 10 requests per 10 seconds
});

export async function middleware(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ?? request.ip ?? 'anonymous';
  const { success, remaining } = await ratelimit.limit(ip);
  if (!success) return new NextResponse('Too many requests', { status: 429 });
  return NextResponse.next();
}

export const config = { matcher: '/api/:path*' };`],
  [`Write a React cache()-wrapped getUser function to dedupe DB calls per request.`, "hard", `// lib/user.ts
import { cache } from 'react';
import { db } from './db';

export const getUser = cache(async (id: string) => {
  console.log('Fetching user', id); // Only logs once per ID per render pass
  return db.user.findUnique({ where: { id }, include: { posts: true } });
});

// Usage in multiple Server Components — deduped automatically:
// Component A: const user = await getUser('1');
// Component B: const user = await getUser('1'); // Same render pass — cached!`],
  [`Implement instrumentation.ts to register an observability hook.`, "hard", `// instrumentation.ts (project root)
import { registerOTel } from '@vercel/otel';

export function register() {
  registerOTel({ serviceName: 'my-next-app' });
}

// For custom OpenTelemetry setup:
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { NodeTracerProvider } = await import('@opentelemetry/sdk-trace-node');
    const { BatchSpanProcessor } = await import('@opentelemetry/sdk-trace-base');
    const { OTLPTraceExporter } = await import('@opentelemetry/exporter-trace-otlp-http');
    const provider = new NodeTracerProvider();
    provider.addSpanProcessor(new BatchSpanProcessor(new OTLPTraceExporter()));
    provider.register();
  }
}`],
  [`Build a protected layout that calls auth() and redirects if no session.`, "hard", `// app/dashboard/layout.tsx
import { auth } from '@/lib/auth'; // e.g., Auth.js
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect('/login?error=unauthorized');
  return (
    <div className="dashboard-layout">
      <header>Welcome, {session.user.name}</header>
      <main>{children}</main>
    </div>
  );
}`],
  [`Implement searchParams-driven filtering on a server-rendered list page.`, "med", `// app/posts/page.tsx
export default async function PostsPage({ searchParams }: { searchParams: Promise<{ q?: string; sort?: string }> }) {
  const { q, sort } = await searchParams;
  const posts = await db.post.findMany({
    where: q ? { title: { contains: q } } : {},
    orderBy: sort === 'asc' ? { title: 'asc' } : { createdAt: 'desc' },
  });

  return (
    <div>
      <form>
        <input name="q" defaultValue={q} placeholder="Search posts..." />
        <select name="sort" defaultValue={sort}>
          <option value="desc">Newest</option>
          <option value="asc">A-Z</option>
        </select>
      </form>
      <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>
    </div>
  );
}`],
  [`Write a Server Action that returns validation errors back to useActionState.`, "hard", `// app/actions.ts
'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const schema = z.object({
  email: z.string().email('Invalid email'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

export async function createUser(prevState: { errors?: Record<string, string>; success?: boolean }, formData: FormData) {
  const parsed = schema.safeParse({
    email: formData.get('email'),
    name: formData.get('name'),
  });
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    parsed.error.issues.forEach(issue => { errors[issue.path[0] as string] = issue.message; });
    return { errors, success: false };
  }
  await db.user.create({ data: parsed.data });
  revalidatePath('/users');
  return { success: true };
}

// In Client Component: const [state, formAction, isPending] = useActionState(createUser, {})`],

  // ── Tricky output / behavior ──────────────────────────────────────────────
  [`What renders if you use useState in a Server Component without 'use client'?`, "hard", "Next.js throws a compile-time error: 'You're importing a component that needs useState. This React hook only works in a Client Component.' Server Components cannot use hooks (useState, useEffect, useContext, etc.). Add 'use client' at the top of the file to convert it to a Client Component. The error is caught at build time, not runtime."],
  [`Why does importing a Client Component into a Server Component still work, but not the reverse?`, "hard", "Server Components can import and render Client Components — the Server Component renders first (on server), and the Client Component is hydrated on the client. Reverse (Client Component importing Server Component) doesn't work because Server Components are not included in the client bundle. Client Components import Server Components only by passing them as children (prop drilling pattern) or using the wrapper pattern."],
  [`What happens to fetch caching if you read cookies() before the fetch in Next 14?`, "hard", "In Next.js 14, if you read cookies() or headers() in a layout or page, the entire route becomes dynamic (no static rendering). This CANCELED any fetch caching in that route — fetch calls would not be cached even with cache: 'force-cache'. Order matters: calling a dynamic API before fetch would turn the fetch dynamic as well. In Next.js 15, this behavior is more explicit — each API independently controls its segment's rendering mode."],
  [`Does a fetch with no cache option get cached by default in Next 15?`, "hard", "No. Next.js 15 changed the default from cache: 'force-cache' to cache: 'no-store'. A fetch with no cache option is NOT cached by default — data is fetched fresh on every request. To cache, explicitly set cache: 'force-cache' or next: { revalidate: ... } or next: { tags: [...] }. This was a breaking change from Next.js 14."],
  [`What is logged on the server vs the client for a console.log in a Server Component?`, "med", "Server Components only run on the server, so console.log appears in the server terminal (Node.js stdout), NOT in the browser console. During dev mode (next dev), server logs appear in the terminal where you ran next dev. In production, server logs go to your hosting platform's log stream. If you see a console.log in the browser, that component is a Client Component or was hydrated on the client."],
  [`Why does data appear stale after a mutation if you forget revalidatePath?`, "hard", "The Router Cache (client-side) stores RSC payloads for ~30 seconds (dynamic) or 5 minutes (static). Without revalidatePath, the client cache still holds old data after a mutation. The user sees stale content until the cache expires or they do a hard refresh. RevalidatePath clears the Router Cache for that path, forcing a fresh server fetch. Always call revalidatePath or revalidateTag after mutations."],
  [`What happens if a Server Action throws and there is no error boundary?`, "hard", "If a Server Action throws an uncaught error: the error propagates to the nearest error.js boundary. If no error.js exists, Next.js shows a default error page (white screen with 'Application error'). The form submission fails, and the user sees an error state. Always wrap Server Action logic in try/catch and return meaningful error state (useActionState). Uncaught errors in production should be monitored (Sentry, OpenTelemetry)."],
  [`Why does navigating back show cached content instead of fresh data?`, "hard", "The Router Cache persists RSC payloads for back/forward navigation. When a user navigates back, Next.js restores the cached RSC payload (instant navigation) instead of fetching fresh data. This is intentional — it provides instant back navigation. The cache persists for ~5 minutes (static) or ~30 seconds (dynamic). To force fresh data: use router.refresh() or disable cache with cache: 'no-store' in the fetched data."],
  [`What renders during the gap before a Suspense fallback resolves with streaming?`, "med", "The Suspense fallback (loading UI) renders immediately. This could be: a skeleton component, a spinner, or a shimmer effect. Once the Suspense-wrapped component finishes rendering on the server, its content streams in and replaces the fallback. The fallback is part of the initial static shell — it renders before any streaming data arrives."],
  [`Why does a dynamic function in a layout make all child routes dynamic?`, "hard", "Layouts wrap their children — they're part of the route group. If a layout uses cookies() or headers(), it forces dynamic rendering for itself AND all child pages. This is because the layout renders on every request (dynamic), and children inherit the parent's rendering mode. To isolate: keep dynamic functions in the page, not the layout, or use PPR (Partial Prerendering) with Suspense boundaries."],
  [`What happens if generateStaticParams returns an empty array?`, "med", "If generateStaticParams returns [], no pages are pre-rendered at build time. With dynamicParams: true (default), paths are generated on first access (on-demand ISR/SSR). With dynamicParams: false, all non-pre-rendered paths return 404. An empty array is valid — use it when no content exists yet (new site, staging environment)."],
  [`Why does using new Date() in a Server Component change build vs request output?`, "hard", "If the page is statically rendered (no dynamic APIs), new Date() captures the build time. The static HTML has the build date baked in. On request, the same HTML is served with the old date. To get the current date on each request: use dynamic rendering (cache: 'no-store', cookies(), headers(), or export const dynamic = 'force-dynamic'). In SSR: new Date() returns the per-request time."],
  [`What error appears if you pass an event handler prop into a Server Component?`, "hard", "Next.js throws: 'Event handlers cannot be passed to Client Component props. Functions are not valid as React child.' Event handlers (onClick, onSubmit) are functions — they can't be serialized and sent from Server to Client. Only Client Components can pass event handlers, and only to other Client Components. To fix: add 'use client' to the component that needs event handlers, or pass the handler in a Client Component wrapper."],
  [`Why does a 'use client' file still run on the server during SSR first render?`, "hard", "Client Components are first rendered on the server (SSR) to generate initial HTML for fast first paint and SEO. The server output is HTML (not interactive). On the client, React hydrates the HTML with JS (event handlers, state). So a 'use client' component runs on BOTH server and client. Code in it should be universal (no browser-only APIs without checks like typeof window !== 'undefined')."],
  [`What happens if two fetches to the same URL run in one render with default dedupe?`, "hard", "Next.js and React automatically deduplicate identical fetch requests (same URL + options) within a single render pass. Only one actual network request is made. Both fetches resolve to the same data. This is built-in — no special configuration needed. For non-fetch async functions, use React cache() for deduplication."],
  [`Why might process.env.SECRET be undefined in the browser bundle?`, "med", "Environment variables without NEXT_PUBLIC_ prefix are server-side only. They are not included in the client bundle. If you reference process.env.SECRET in a Client Component, it will be undefined at runtime in the browser. Only NEXT_PUBLIC_ prefixed variables are inlined into the client bundle. If you need a secret in a Client Component, expose it through a Server Component or Route Handler."],
  [`What is the difference in output between redirect() and returning a Response redirect?`, "hard", "redirect() from 'next/navigation' throws a NEXT_REDIRECT error that triggers Next.js's routing system — it's caught by the framework and properly handles the redirect. Returning NextResponse.redirect() (Route Handler) returns an HTTP redirect response (302/307). In Server Components: use redirect() (it throws). In Route Handlers: use NextResponse.redirect(). redirect() in Server Actions also supports revalidate and other framework integrations."],
  [`Why does middleware run on every matched request including prefetches?`, "hard", "Middleware is defined to run on every request matching its matcher config. Prefetches are still HTTP requests — the middleware runs on them too. This is why middleware should be extremely fast (sub-ms). Heavy work in middleware blocks both actual navigations and prefetches. To reduce middleware impact: minimize matcher patterns, avoid DB calls, keep logic lightweight."],
  [`What happens if you call notFound() inside a try/catch block?`, "hard", "notFound() throws a NEXT_NOT_FOUND error. If called inside a try/catch, the catch block catches it. The not-found.js boundary won't render — the catch block handles it instead. Always call notFound() outside try/catch, or re-throw the not-found error: catch (e) { if (e instanceof Error && e.message.includes('NEXT_NOT_FOUND')) throw e; }."],
  [`Why does revalidateTag have no effect if no fetch used that tag?`, "hard", "revalidateTag purges the Data Cache entries tagged with that tag. If no fetch call has next: { tags: ['posts'] }, there's nothing to purge. The Data Cache only stores entries tagged via fetch or unstable_cache. If you're fetching directly from the database (not through fetch), revalidateTag does nothing. Use revalidatePath for route-level cache clearing, or ensure your data fetching uses tagged fetch calls."],
  [`What renders if a page is both statically generated and reads searchParams?`, "hard", "Reading searchParams forces dynamic rendering — the page cannot be fully static. Next.js detects the dynamic API usage and switches to dynamic rendering. If you force static with export const dynamic = 'force-static', searchParams will be an empty object at build time (static export) or undefined. The page will be static with no search parameters available."],
  [`Why does the Router Cache sometimes serve old segments after a deploy in dev vs prod?`, "hard", "In development, the Router Cache is less aggressive (cleared on file changes). In production, the Router Cache persists across navigations for a period (~5 minutes static, ~30s dynamic). After a deploy, the client's Router Cache may still serve the old RSC payload until expiration or hard refresh. The Full Route Cache is cleared on deploy (new build), but the client-side Router Cache doesn't know about the deploy. Hard refresh clears it."],
  [`What happens to layout state when navigating between two pages sharing that layout?`, "med", "Layout state is preserved across navigations. If layout.js uses useState for a sidebar toggle, navigating from /dashboard/analytics to /dashboard/settings keeps the sidebar state. Only the page component (children) re-renders. This is the key benefit of layouts — they persist across navigations within their segment. The layout unmounts only when navigating outside its route segment."],
  [`Why does next/image throw if you omit width and height without fill?`, "med", "next/image requires explicit width and height (or fill prop) to prevent Cumulative Layout Shift (CLS). Without dimensions, the browser can't allocate space before the image loads. Use fill prop when dimensions are unknown (container-based sizing) with a parent that has position: relative, or provide explicit width/height matching the image aspect ratio. The fill prop uses CSS object-fit for sizing behavior."],
  [`What is the effect of export const dynamic = 'force-static' on a route using cookies()?`, "hard", "force-static tells Next.js to statically render the route even if it uses dynamic APIs. If the route reads cookies() or headers(), those values will be empty at build time (no request). The page renders with default/empty values and is cached as static HTML. At runtime, the static version is served regardless of cookies/headers. Use force-static carefully — only when the dynamic parts are non-essential or handled client-side."],
  [`Why does a Client Component lose its server-fetched data on hard refresh if not passed as props?`, "hard", "Client Components can't directly fetch on the server (they run on client during hydration). If a Client Component fetches data itself (useEffect + fetch), that data is fetched client-side only. On hard refresh, the component remounts and fetches again client-side. If data is fetched in a parent Server Component and passed as props to the Client Component, it survives hard refresh because it's part of the server-rendered HTML and hydration."],
  [`What happens if you await a promise in a Server Component versus passing it to use()?`, "hard", "await blocks the component from rendering until the promise resolves (synchronous-looking suspend at the component level). use(promise) (React 19) integrates with Suspense — the component suspends, the fallback renders, and streaming streams in the content when ready. use() enables streaming with Suspense boundaries. await works but doesn't enable streaming for that specific component — the entire component must resolve before any of it renders."],
  [`Why does revalidate: 0 effectively disable the data cache for that fetch?`, "hard", "revalidate: 0 means 'revalidate instantly — never consider cached data as fresh'. When the first request comes in, fetch completes normally and caches the result. But the cache entry is immediately stale (0 seconds fresh). Every subsequent request skips the cache and fetches fresh data, then writes to cache again with 0 TTL. Effectively cache: 'no-store' with the overhead of writing to cache each time. Use cache: 'no-store' instead for truly uncached fetches."],
  [`What renders first: the layout, the template, or the page on navigation?`, "med", "On initial load: layout renders first (outermost to innermost), then template, then page. On navigation: layout re-uses existing instance (doesn't remount), template remounts, page remounts. So the order is: layout (existing) → template (new) → page (new). Template remounting makes it useful for animations and analytics that need to fire on each navigation."],
  [`Why does a template.js remount its children on every navigation but layout.js does not?`, "hard", "Layouts are designed for persistent UI (sidebars, headers, navigation). They mount once when first visited and persist across navigations within the segment. Templates are designed for per-navigation effects (animations, page transitions, analytics). They create a new component instance for each navigation. This is enforced by Next.js's routing system — layout is cached in the router tree, template is not."],
  ["How does the 'use cache' directive and cacheLife/cacheTag change data caching in recent Next.js versions?", "hard", "The 'use cache' directive (Next 15+ experimental) is a simpler caching API at the component/function level. Usage: export default async function Page() { 'use cache'; ... } — caches the entire component output. cacheLife('days') or cacheLife({ stale: 3600, revalidate: 86400 }) sets cache duration. cacheTag('posts') adds tags for on-demand revalidation. This replaces manual fetch caching and unstable_cache with a unified declarative API. 'use cache' works with any component, not just fetch calls. The Data Cache persists the rendered component output, reducing server computation."],
];
