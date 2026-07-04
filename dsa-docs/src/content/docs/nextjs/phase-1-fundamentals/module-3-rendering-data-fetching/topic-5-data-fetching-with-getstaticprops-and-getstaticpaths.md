# Data Fetching with getStaticProps and getStaticPaths

## Introduction
`getStaticProps` and `getStaticPaths` are Next.js data fetching methods used for Static Generation (SSG) and Incremental Static Regeneration (ISR). These functions run at build time (or on-demand for ISR) to fetch data and generate static HTML pages, resulting in excellent performance and SEO.

## Why do we need this?
Fetching data at build time rather than request time eliminates server load during user visits, provides instant content delivery via CDN, and ensures search engines can easily crawl and index your pages. This approach is ideal for content that doesn't change frequently or can be updated incrementally.

## Problem Statement
Fetching data on each request (SSR) for static or infrequently changing content wastes server resources and increases latency. Conversely, fetching data only on the client-side hurts SEO and initial load performance. We need a middleware solution that allows data fetching at build time while maintaining flexibility for updates.

## Real World Story
Imagine you're building a blog platform with hundreds of articles. Using Server-Side Rendering would require fetching each article from the database on every request, overloading your server. Using Client-Side Rendering would mean search engines see empty content initially. By using `getStaticProps` and `getStaticPaths`, you generate static HTML for each article at build time, serving instant responses from a CDN while still allowing periodic updates through Incremental Static Regeneration.

## Real World Analogy
Think of `getStaticProps` and `getStaticPaths` like printing a catalog:
- You gather all product data (fetch) once at the printing plant (build time)
- You print all catalog pages (generate HTML) with that data
- You ship the pre-printed catalogs to stores (CDN) for instant customer access
- For seasonal updates, you reprint only the changed pages (ISR) rather than the entire catalog

## Visual Explanation
```
Build Time Process:
------------------
[Developer] → [next build] → [getStaticPaths] → [Get all possible paths]
                                    ↓
                          [For each path] → [getStaticProps] → [Fetch data]
                                    ↓
                          [Generate HTML with data] → [Save to .next/]
                                    ↓
                           [Production ready static assets]

Request Time (ISR):
------------------
[User] → Request /blog/post-1 → [Check cache age]
                        ↓
           [Fresh?] → Serve cached HTML
                        ↓
           [Stale?] → Serve cached + trigger background rebuild
                        ↓
           [Background] → [getStaticProps] → [Fetch fresh data] → [Update cache]
```

## Technical Explanation
### How getStaticProps Works
1. **At Build Time**: During `next build`, Next.js calls `getStaticProps` for each path returned by `getStaticPaths`
2. **Data Fetching**: The function fetches data from APIs, databases, or file systems
3. **HTML Generation**: Received data is used to render the React component to HTML
4. **Static Output**: HTML is saved as a static file in `.next/` directory
5. **Optional Revalidation**: With `revalidate` option, enables Incremental Static Regeneration

### How getStaticPaths Works
1. **Path Enumeration**: Returns all possible paths for dynamic routes
2. **Fallback Behavior**: 
   - `false`: 404 for paths not returned
   - `true`: Serve fallback UI, generate in background
   - `'blocking'`: Wait for generation before responding
3. **Integration**: Works with `getStaticProps` to determine which pages to pre-render

## Example: Blog with getStaticProps and getStaticPaths
1. Create `pages/posts/[slug].js`:
```jsx
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPostSlugs } from '@/lib/posts';

export default function Post({ post }) {
  if (!post) {
    notFound();
  }
  
  return (
    <article>
      <h1>{post.title}</h1>
      <time>{post.date}</time>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return { notFound: true };
  }
  
  return {
    props: { post },
    // Optional: Enable ISR - revalidate at most once every hour
    revalidate: 3600
  };
}

export async function getStaticPaths() {
  const slugs = await getAllPostSlugs();
  
  return {
    paths: slugs.map(slug => ({
      params: { slug }
    })),
    fallback: false // or 'blocking' or true for ISR
  };
}
```

## Example: Product Catalog with ISR
1. Create `pages/products/[id].js`:
```jsx
import { notFound } from 'next/navigation';
import { getProductById, getAllProductIds } from '@/lib/products';

export default function Product({ product }) {
  if (!product) {
    notFound();
  }
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>${price}</p>
      <p>{description}</p>
      <button>Add to Cart</button>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const { id } = params;
  
  const product = await getProductById(id);
  
  if (!product) {
    return { notFound: true };
  }
  
  return {
    props: { product },
    // Revalidate at most once every 10 minutes
    revalidate: 600
  };
}

export async function getStaticPaths() {
  const ids = await getAllProductIds();
  
  return {
    paths: ids.map(id => ({
      params: { id }
    })),
    fallback: 'blocking' // Show loading state while generating
  };
}
```

## Example: Documentation with Fallback
1. Create `pages/docs/[slug].js`:
```jsx
import { notFound } from 'next/navigation';
import { getDocBySlug, getAllDocSlugs } from '@/lib/docs';

export default function Doc({ doc }) {
  if (!doc) {
    notFound();
  }
  
  return (
    <article>
      <h1>{doc.title}</h1>
      <nav>{doc.tableOfContents}</nav>
      <article>{doc.content}</article>
    </article>
  );
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  
  const doc = await getDocBySlug(slug);
  
  if (!doc) {
    return { notFound: true };
  }
  
  return {
    props: { doc },
    // Revalidate once every 24 hours
    revalidate: 86400
  };
}

export async function getStaticPaths() {
  const slugs = await getAllDocSlugs();
  
  return {
    paths: slugs.map(slug => ({
      params: { slug }
    })),
    fallback: true // Show stale data, generate in background for new docs
  };
}
```

## Production Example
In production, `getStaticProps` and `getStaticPaths` work as follows:
- **Build Time**: `next build` executes `getStaticPaths` to get all possible routes
- **Path Processing**: For each path, `getStaticProps` fetches data and generates HTML
- **Output**: Static HTML files are placed in `.next/server/pages/` directory
- **ISR Handling**: When `revalidate` is set, Next.js creates background revalidation workers
- **Request Handling**: 
  - Static requests served directly from CDN/cache
  - ISR requests check cache freshness, serve stale content while regenerating
  - Fallback requests handled according to `fallback` setting
- **CDN Integration**: Works seamlessly with CDN caching strategies
- **Scalability**: Build-time work can be distributed; request-time minimal for static paths
- **Cache Invalidation**: Manual cache purge possible via `next.js` API or webhooks

## Folder Structure Context
Pages using `getStaticProps` and `getStaticPaths` exist alongside other page types:
```
pages/
├── index.js                  # SSG (no data fetching)
├── about.js                  # SSG (no data fetching)
├── posts/
│   ├── [slug].js             # SSG with getStaticProps/getStaticPaths
│   └── index.js              # SSG (list of posts)
├── products/
│   ├── [id].js               # SSG/ISR with getStaticProps/getStaticPaths
│   └── index.js              # SSG (product listing)
└── docs/
    ├── [slug].js             # SSG with getStaticProps/getStaticPaths
    └── index.js              # SSG (documentation index)
```

## Best Practices
1. **Data Fetching Placement**: Keep data fetching logic in `getStaticProps`/`getStaticPaths`, not in components
2. **Error Handling**: Return `{ notFound: true }` or `{ redirect: { destination: '/', permanent: false } }` for error cases
3. **Type Safety**: Use TypeScript interfaces for data returned from these functions
4. **Efficient Queries**: Fetch only needed data; avoid over-fetching
5. **Cached Data**: Consider caching data fetching results during build to avoid rate limits
6. **Static Generation Preference**: Use SSG/ISR whenever possible for better performance
7. **Fallback Strategy**: Choose `fallback` value based on your data stability and UX requirements
8. **Build Time Optimization**: 
   - Generate only necessary paths when possible
   - Use incremental builds for large sites
   - Consider incremental static regeneration for frequently changing content
9. **SEO Optimization**: Ensure meta tags and structured data are included in generated HTML
10. **Error Logging**: Log data fetching errors during build for debugging

## Common Mistakes
1. **Missing getStaticPaths for Dynamic Routes**: Causes build errors when using `getStaticProps` with dynamic routes
2. **Incorrect Path Return Format**: Forgetting to return `{ params: { slug: 'value' } }` objects
3. **Not Handling Missing Data**: Leads to runtime errors or empty pages when data is absent
4. **Over-Fetching in getStaticProps**: Requesting unnecessary data increases build time and cost
5. **Ignoring fallback Options**: Results in unexpected 404s or poor UX for new content
6. **Using Mutable Data Sources**: Can cause inconsistent builds if data changes during build process
7. **Setting revalidate Too Low**: Increases server load significantly (approaching SSR costs)
8. **Not Validating Path Parameters**: Can lead to security vulnerabilities or unexpected behavior
9. **Forgetting to Return props Object**: Causes runtime errors when component expects props
10. **Using Browser-only APIs**: `window`, `document`, etc. aren't available during build time

## Performance Notes
- **Build Time**: Increases with number of paths; parallelized by Next.js
- **Request Time (Static)**: Near-instantaneous CDN delivery (≈10-50ms TTFB)
- **Request Time (ISR Stale)**: Fast stale serve + background generation cost
- **Request Time (ISR Fresh)**: Same as static after regeneration
- **Scalability**: Build parallelization handles large page counts efficiently
- **Cache Efficiency**: High hit rates for static content; ISR balances freshness and performance
- **Memory Usage**: Minimal runtime overhead; build-time memory scales with data size
- **CDN Benefits**: Full advantage of CDN caching, edge computing, and global distribution
- **Cost Comparison**: 
  - SSG: Lowest hosting cost (static storage only)
  - ISR: Low-Medium cost (occasional regeneration)
  - SSR: Highest cost (continuous server compute)

## Security Notes
- **Build-Time Security**: 
  - Only `NEXT_PUBLIC_*` environment variables available
  - Prevents accidental secret exposure during build
  - Use server-side secrets only in API routes or server-only code
- **Data Source Protection**:
  - Secure APIs/databases accessed during build with appropriate credentials
  - Consider using build-time only credentials with limited permissions
  - Implement rate limiting for external APIs called during build
- **Input Validation**:
  - Validate and sanitize path parameters to prevent injection
  - Sanitize any user-generated content before storing in static HTML
  - Implement proper error handling to avoid leaking stack traces
- **Content Security**:
  - Generated static HTML is immutable until rebuild
  - XSS protection depends on proper data sanitization during fetch
  - CSP headers can be added via `_headers` file or middleware
- **Build Process Security**:
  - Ensure build environment is secure and isolated
  - Audit dependencies used in data fetching scripts
  - Consider signing/verifying build outputs in high-security environments

## SEO Considerations
- **Full HTML Rendering**: Search engines get complete, indexable content immediately
- **Fast Loading**: Quick load times improve Core Web Vitals and search rankings
- **No JavaScript Dependency**: Content available even if JavaScript fails or is disabled
- **Structured Data**: Easy to include JSON-LD metadata in generated HTML
- **Meta Tags**: Dynamic titles, descriptions, and OpenGraph tags per page
- **Clean URLs**: Static files served with clean, predictable URLs
- **Sitemap Generation**: Simple to generate sitemap from `getStaticPaths` output
- **Canonical URLs**: Easy to implement canonical tags for duplicate content prevention
- **Internationalization**: Compatible with Next.js i18n routing for multi-language sites
- **Core Web Vitals**: 
  - LCP: Excellent due to pre-built HTML
  - FID: Minimal JavaScript needed for hydration
  - CLS: Low when dimensions are known in advance
- **Crawl Budget**: Efficient use due to fast response times and minimal server load

## Interview Questions
1. What is the difference between `getStaticProps` and `getServerSideProps`?
2. When would you use `getStaticPaths` in a Next.js application?
3. How does the `revalidate` option in `getStaticProps` enable Incremental Static Regeneration?
4. What are the three possible values for `fallback` in `getStaticPaths` and what do they do?
5. How do you handle 404 pages when using `getStaticProps` with dynamic routes?
6. What happens if you use `getStaticProps` without `getStaticPaths` on a dynamic route?
7. How can you prevent over-fetching data in `getStaticProps`?
8. What security considerations should you keep in mind when using `getStaticProps` at build time?
9. How does `getStaticProps` improve SEO compared to client-side data fetching?
10. What are the performance trade-offs between SSG, ISR, and SSR?

## MCQs
1. Which function is required when using `getStaticProps` with a dynamic route?
   a) `getStaticPaths`
   b) `getServerSideProps`
   c) `getInitialProps`
   d) `useEffect`
   <details>
   <summary>Answer</a) `getStaticPaths`
   </details>

2. What does `fallback: true` do in `getStaticPaths`?
   a) Returns 404 for paths not generated at build time
   b) Serves a fallback page and generates the requested path in background
   c) Blocks the request and generates the page on first visit
   d) Disables static generation entirely
   <details>
   <summary>Answer</b) Serves a fallback page and generates the requested path in background
   </details>

3. Which object must `getStaticProps` return?
   a) `{ state: data }`
   b) `{ data: data }`
   c) `{ props: data }`
   d) `{ props: { data } }`
   <details>
   <summary>Answer</c) `{ props: data }`
   </details>

4. How do you enable Incremental Static Regeneration for a page?
   a) Add `revalidate: false` to `getStaticProps`
   b) Add `revalidate: number` to `getStaticProps`
   c) Add `ssr: true` to the page config
   d) Add `csr: true` to the page config
   <details>
   <summary>Answer</b) Add `revalidate: number` to `getStaticProps`
   </details>

5. What happens if you visit a path that wasn't returned by `getStaticPaths` when `fallback: false`?
   a) You see a loading spinner
   b) You get a 404 page
   c) The page is generated on-the-fly and cached
   d) You're redirected to the homepage
   <details>
   <summary>Answer</b) You get a 404 page
   </details>

## Practice Exercise
1. Create a new Next.js project called `static-data-exercise`
2. Create a blog section with:
   - A list of all posts at `/posts`
   - Individual post pages at `/posts/[slug]`
   - Fetch post data from a JSON file in `public/posts/`
   - Implement `getStaticProps` and `getStaticPaths` for the post pages
   - Set revalidate to 60 seconds for Incremental Static Regeneration
3. Add a component that displays the last updated timestamp for each post
4. Create a custom 404 page that shows when a post doesn't exist
5. Style the blog using CSS Modules
6. Test the build process and verify static HTML generation
7. Test ISR by updating a post and verifying the change appears after the revalidate window

## Mini Project
Build a documentation website with versioning using `getStaticProps` and `getStaticPaths`:
1. Create a Next.js project for technical documentation
2. Organize content in Markdown files in a `docs/` directory with version subfolders:
   - `docs/v1/getting-started.md`
   - `docs/v2/getting-started.md`
   - `docs/v2/api-reference.md`
3. Create a dynamic route `docs/[version]/[slug].js` that:
   - Reads the Markdown file from `docs/${version}/${slug}.md`
   - Converts Markdown to HTML using `remark` and `remark-html`
   - Displays the documentation with a navigation sidebar
4. Implement `getStaticProps` to fetch and convert the Markdown content
5. Implement `getStaticPaths` to return all possible documentation versions and pages
6. Set revalidate to 1 hour for documentation content
7. Use `fallback: false` since you know all documentation paths at build time
8. Add a version selector component in the navbar
9. Implement search functionality that searches across all versions (client-side)
10. Add a dark/light mode toggle using CSS variables
11. Generate a sitemap.xml during build that includes all documentation paths
12. Deploy to Vercel and verify that documentation updates are handled through ISR
13. Test by adding a new documentation page and verifying it appears after build

## Summary
In this topic, you learned how to use `getStaticProps` and `getStaticPaths` for Static Generation and Incremental Static Regeneration in Next.js. These methods allow you to fetch data at build time to generate static HTML pages, offering excellent performance, SEO, and developer experience.

## Cheat Sheet
```
# Basic SSG with getStaticProps/getStaticPaths
export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: 'post-1' } },
      { params: { slug: 'post-2' } }
    ],
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const { slug } = params
  const post = await fetchPost(slug)
  return { props: { post } }
}

# ISR with Revalidation
export async function getStaticProps({ params }) {
  const { slug } = params
  const post = await fetchPost(slug)
  return {
    props: { post },
    revalidate: 60 // seconds
  }
}

# Error Handling
export async function getStaticProps({ params }) {
  try {
    const data = await fetchData(params.id)
    return { props: { data } }
  } catch (error) {
    return { notFound: true }
  }
}

# Dynamic Fallback
export async function getStaticPaths() {
  return {
    paths: [], // Generate on demand
    fallback: true // or 'blocking'
  }
}
```

## Related Topics
- Static Generation (SSG)
- Server-Side Rendering (SSR)
- Incremental Static Regeneration (ISR)
- Client-Side Data Fetching
- Data Fetching with getServerSideProps
- Choosing the Right Data Fetching Method
- Preview Mode
- Incremental Static Regeneration
- API Routes and Middleware

## Further Reading
- [Next.js Documentation - getStaticProps](https://nextjs.org/docs/data-fetching/get-static-props)
- [Next.js Documentation - getStaticPaths](https://nextjs.org/docs/data-fetching/get-static-paths)
- [Next.js Documentation - Incremental Static Regeneration](https://nextjs.org/docs/rendering/incremental-static-regeneration)
- [Next.js Documentation - Data Fetching](https://nextjs.org/docs/data-fetching)
- [Next.js Documentation - Dynamic Routes](https://nextjs.org/docs/routing/dynamic-routes)