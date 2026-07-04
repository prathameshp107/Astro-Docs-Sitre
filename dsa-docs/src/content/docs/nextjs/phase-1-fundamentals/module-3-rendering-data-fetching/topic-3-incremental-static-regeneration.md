# Incremental Static Regeneration (ISR)

## Introduction
Incremental Static Regeneration (ISR) is a hybrid rendering strategy in Next.js that allows you to update static content after you've built your site. ISR enables you to retain the benefits of Static Generation (SSG) while still being able to update content periodically without requiring a full rebuild.

## Why do we need this?
Pure Static Generation requires a full rebuild to update content, which can be slow and costly for large sites. Client-Side Rendering or Server-Side Rendering can provide fresh content but may sacrifice performance, SEO, or increase server load. ISR offers a middle ground: serve static content for most requests while updating it in the background at specified intervals.

## Problem Statement
With traditional SSG, updating a single piece of content requires rebuilding and redeploying the entire site. This is inefficient for sites with many pages or frequent content updates. SSR provides fresh content but at the cost of higher server load and slower TTFB. ISR addresses this by allowing incremental updates.

## Real World Story
Imagine you run an e-commerce site with 10,000 product pages. Using SSG, updating the price of a single product would require rebuilding all 10,000 pages. With ISR, you can set each product page to regenerate at most once every hour. When a user requests a product page, they get the cached static version. If the last regeneration was more than an hour ago, Next.js regenerates the page in the background and serves the updated version to subsequent requests.

## Real World Analogy
Think of ISR like a newspaper that prints a daily edition:
- The morning edition (static build) is printed and distributed
- Throughout the day, if breaking news occurs, you don't wait until tomorrow's edition
- Instead, you print a special update (background regeneration) and insert it into the next few copies
- Readers who get the updated copies see the breaking news, while others still get the morning edition until they get an updated copy
- The printing press (server) only works on updates, not the entire print run every time

## Visual Explanation
```
Request 1 (within revalidate window):
------------------------------------
User Request → [CDN] → [Cached HTML] → [Browser] → [Hydration] → [Interactive Page]

Request 2 (after revalidate window):
-----------------------------------
User Request → [CDN] → [Stale HTML] → [Next.js] → [Regenerate in Background] 
                                    → [Update Cache] → [Serve Stale HTML (this request)]
                                    → [Serve Fresh HTML (next request)]

Background Regeneration:
------------------------
[Next.js] → [Fetch Data] → [Render to HTML] → [Update Cache]
```

## Internal Working
When you use `getStaticProps` with the `revalidate` option in a Next.js page:
1. During `next build`, Next.js calls `getStaticProps` to fetch data and generates HTML
2. The HTML is saved as a static file (along with necessary JavaScript for hydration)
3. On request, if the cached HTML is less than `revalidate` seconds old, serve it from cache
4. If the cached HTML is older than `revalidate` seconds, Next.js:
   - Still serves the cached HTML (stale) to the current request
   - Triggers background regeneration by calling `getStaticProps` again
   - Saves the new HTML to cache for future requests
5. Subsequent requests after regeneration get the updated HTML

## Mermaid Diagram 1: ISR Request Flow (Cache Fresh)
```mermaid
flowchart TD
    A[User requests /product/123] --> B{Is HTML < revalidate seconds old?}
    B -->|Yes| C[Serve cached HTML from CDN]
    C --> D[Browser receives HTML]
    D --> E[Hydrate React components]
    E --> F[Interactive page ready]
    B -->|No| G[Serve cached HTML (stale)]
    G --> D
    G --> H[Trigger background regeneration]
    H --> I[Call getStaticProps]
    I --> J[Fetch fresh data]
    J --> K[Render to HTML]
    K --> L[Update cache]
    L --> M[Next request gets fresh HTML]
```

## Mermaid Diagram 2: ISR with Fallback (Blocking)
```mermaid
sequenceDiagram
    participant Browser
    participant NextJS
    participant Browser->>NextJS: Request /product/999 (new product)
    alt First request (fallback: true or 'blocking')
        NextJS->>NextJS: Generate HTML now (blocking)
        NextJS-->>Browser: HTML
    else fallback: false
        NextJS-->>Browser: 404 or fallback page
    end
    Browser->>Browser: Hydrate
```

## Technical Explanation
### How ISR Works in Next.js
1. **Build-time Generation**: Like SSG, `getStaticProps` runs at build time to generate initial HTML
2. **Cache Storage**: Generated HTML is stored in Next.js cache (in-memory or filesystem)
3. **Request-time Validation**: On each request, Next.js checks if the cached HTML is fresh enough
4. **Background Regeneration**: If stale, Next.js serves stale content and regenerates in background
5. **Cache Update**: Regenerated HTML replaces the old cache entry
6. **Fallback Handling**: For new paths not generated at build time, `fallback` option controls behavior

### Key Characteristics
- **Incremental updates**: Only regenerate expired pages, not the entire site
- **Fast first request**: Stale content served immediately while regenerating in background
- **Configurable revalidation**: Set different revalidation intervals per page
- **Fall back options**: `false` (404 for new paths), `true` (serve stale then generate), `'blocking'` (generate on first request)
- **Reduced build times**: Large sites can use ISR to avoid generating all paths at build time
- **Edge-friendly**: Works well with CDN caching strategies

## Example: ISR with Time-based Revalidation
1. Create `pages/blog/[slug].js`:
```jsx
import { notFound } from 'next/navigation';

export default function Post({ post }) {
  if (!post) {
    notFound();
  }
  
  return (
    <article>
      <h1>{post.title}</h1>
      <time>{post.date}</time>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <div className="meta">
        <small>Last updated: {post.updatedAt}</small>
      </div>
    </article>
  );
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  
  // Fetch data from external source (API, CMS, filesystem)
  const res = await fetch(`https://api.example.com/posts/${slug}`);
  
  if (!res.ok) {
    return { notFound: true };
  }
  
  const post = await res.json();
  
  return {
    props: {
      post
    },
    // Regenerate at most once every hour
    revalidate: 3600 // seconds
  };
}

export async function getStaticPaths() {
  // Get all possible slugs from your data source
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();
  
  return {
    paths: posts.map(post => ({
      params: { slug: post.slug }
    })),
    fallback: false // or 'blocking' or true for ISR
  };
}
```

## Example: ISR with Fallback (true)
1. Create `pages/products/[id].js`:
```jsx
import { notFound } from 'next/navigation';

export default function Product({ product }) {
  if (!product) {
    notFound();
  }
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: ${product.price}</p>
      <p>{product.description}</p>
      <a href="/cart?add=${product.id}">Add to Cart</a>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const { id } = params;
  
  // Fetch product data
  const res = await fetch(`https://api.example.com/products/${id}`);
  
  if (!res.ok) {
    return { notFound: true };
  }
  
  const product = await res.json();
  
  return {
    props: {
      product
    },
    // Regenerate at most once every 10 minutes
    revalidate: 600
  };
}

export async function getStaticPaths() {
  // Return empty paths - we'll generate on demand with fallback
  return {
    paths: [],
    fallback: true // Serve stale (which will be empty) then generate in background
  };
}

// Optional: Generate a sitemap or list of known IDs for better UX
export async function getStaticProps({ params }) {
  // This is just an example - in reality you'd want to fetch the list of products
  // at build time to have some paths pre-generated
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
      { params: { id: '3' } }
    ],
    fallback: true
  };
}
```

## Example: ISR with Blocking Fallback
1. Create `pages/documentation/[slug].js`:
```jsx
import { notFound } from 'next/navigation';
import { remark } from 'remark';
import html from 'remark-html';

export default function Doc({ title, contentHtml }) {
  if (!title) {
    notFound();
  }
  
  return (
    <article>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </article>
  );
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  
  // Read markdown file from filesystem
  const filePath = `docs/${slug}.md`;
  const fileContents = await fs.promises.readFile(filePath, 'utf8');
  
  // Convert markdown to HTML
  const processed = await remark()
    .use(html)
    .process(fileContents);
  const contentHtml = processed.toString();
  
  // Extract metadata (simplified - in real app use gray-matter)
  const title = fileContents.match(/^# (.+)/m)?.[1] || 'Untitled';
  
  return {
    props: {
      title,
      contentHtml
    },
    // Regenerate at most once every 24 hours
    revalidate: 86400
  };
}

export async function getStaticPaths() {
  const files = await fs.promises.readdir('docs');
  
  return {
    paths: files.map(file => ({
      params: { slug: file.replace('.md', '') }
    })),
    fallback: 'blocking' // Show fallback UI while generating on first request
  };
}
```

## Example: ISR with Dynamic Revalidation Based on Data
1. Create `pages/stock/[symbol].js`:
```jsx
export default function StockQuote({ quote }) {
  if (!quote) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <h1>{quote.symbol}</h1>
      <p>Price: ${quote.price.toFixed(2)}</p>
      <p>Change: {quote.change} ({quote.changePercent}%)</p>
      <p>Updated: {new Quote.quote.lastUpdated).toLocaleTimeString()}</p>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const { symbol } = params;
  
  // Fetch stock data
  const res = await fetch(
    `https://api.example.com/stocks/${symbol}?apikey=${process.env.STOCK_API_KEY}`
  );
  
  if (!res.ok) {
    return { notFound: true };
  }
  
  const quote = await res.json();
  
  // Dynamic revalidation: more volatile stocks update more frequently
  // In reality, you might base this on volatility, market hours, etc.
  const revalidateSeconds = quote.volatile ? 30 : 300; // 30s for volatile, 5m for stable
  
  return {
    props: {
      quote
    },
    revalidate: revalidateSeconds
  };
}

export async function getStaticPaths() {
  // Get all stock symbols from your data source
  const res = await fetch('https://api.example.com/stocks/symbols');
  const symbols = await res.json();
  
  return {
    paths: symbols.map(symbol => ({
      params: { symbol }
    })),
    fallback: false
  };
}
```

## Production Example
In production, ISR pages are handled as follows:
- **Build Time**: `next build` pre-generates HTML for paths returned by `getStaticPaths`
- **Cache Storage**: HTML stored in Next.js inference cache (in-memory on serverless, or filesystem/network cache)
- **Request Handling**: 
  - If cache fresh (< revalidate seconds): serve from cache immediately
  - If cache stale: serve stale content, trigger background regeneration
  - Background regeneration: calls `getStaticProps`, updates cache with new HTML
- **Fallback Paths**: For `fallback: true` or `'blocking'`, handle paths not generated at build time
- **CDN Integration**: Works well with CDN caching; set CDN cache TTL to match or be less than revalidate time
- **Scaling**: Background regeneration spreads load over time; avoids build-time spikes
- **Cost**: Lower than SSR (only regenerate expired pages), higher than SSG (some server execution)
- **Cache Invalidation**: Can manually purge cache via `next.js` API or cache headers
- **Monitoring**: Track cache hit ratio, regeneration frequency, and background job success

## Folder Structure Context
ISR pages exist alongside other page types in the `pages/` directory:
```
pages/
├── index.js                  # Could be SSG or ISR
├── blog/
│   └── [slug].js             # ISR with revalidate
├── products/
│   └── [id].js               # ISR with fallback
├── documentation/
│   └── [slug].js             # ISR with blocking fallback
├── stock/
│   └── [symbol].js           # ISR with dynamic revalidation
├── api/
│   └── ...                   # API routes (server-only)
└── _middleware.js            # Applies to all pages and API routes
```

## Best Practices
1. **Choose appropriate revalidation time**: Balance freshness with server load
2. **Use ISR for semi-static content**: Blog posts, product listings, documentation
3. **Leverage fallback options**: 
   - `false` for known set of paths (blog with fixed posts)
   - `true` for unknown paths with acceptable stale-first experience
   - `'blocking'` for critical paths where freshness is paramount on first request
4. **Consider dynamic revalidation**: Adjust revalidation based on content volatility
5. **Optimize data fetching**: Background regeneration should be efficient
6. **Handle errors gracefully**: Return `{ notFound: true }` or fallback UI for failed regeneration
7. **Monitor cache performance**: Track hit rates and regeneration success
8. **Use with CDN**: Set CDN cache TTL to be less than or equal to revalidate time
9. **Avoid excessive regeneration**: Don't set revalidate too low (e.g., 1 second) - defeats purpose
10. **Test regeneration flow**: Verify background updates work as expected

## Common Mistakes
1. **Setting revalidate too low**: Increases server load significantly (approaching SSR costs)
2. **Forgetting to implement getStaticPaths for dynamic routes**: Causes build errors
3. **Not handling missing data in getStaticProps**: Results in 404 pages or errors
4. **Using ISR for frequently changing data**: Better suited for SSR or CSR with frequent updates
5. **Ignoring fallback behavior**: Leads to unexpected 404s or blank pages for new paths
6. **Not validating background regeneration**: Failed updates leave stale cache indefinitely
7. **Over-generating at build time**: Defeats purpose of ISR if you generate all paths
8. **Using ISR for user-specific data**: Should use SSR or CSR instead
9. **Not considering cache layers**: Forgetting that CDN/browser caches may serve older content
10. **Misunderstanding stale-while-revalidate**: Current request gets stale, next gets fresh

## Performance Notes
- **TTFB**: 
  - Cache hit: Very low (CDN/memory cache)
  - Cache miss (stale): Low (serve stale) + background regeneration cost
  - First request for new path (fallback: blocking): Higher (SSR-like) 
- **FCP**: Fast for cache hits, depends on TTFB
- **LCP**: Affected by how quickly main content appears
- **FID**: Similar to SSG/SSR
- **CLS**: Minimal if dimensions known
- **Cache Hit Ratio**: Key metric; aim for high ratio (e.g., >95%)
- **Background Load**: Spreads regeneration over time vs. build-time spike
- **Scaling Characteristics**: 
  - Read-heavy workloads excel
  - Write (regeneration) load is predictable and spreadable
- **Cost Efficiency**: 
  - Lower than SSR for read-heavy sites
  - Higher than pure SSG due to occasional regeneration

## Security Notes
- **Same as SSG/SSR**: ISR inherits security considerations from both
- **Build-time and runtime data fetching**: Both phases need input validation
- **Cache poisoning**: Ensure cache keys are secure and not guessable
- **Background regeneration**: Runs with same privileges as build process
- **Secrets management**: Only `NEXT_PUBLIC_*` variables available at build time
- **Runtime data fetching**: Can use environment variables and secrets
- **Cache isolation**: Ensure cache is not shared between sites in multi-tenant setups
- **Error handling**: Don't leak stack traces in background regeneration failures
- **Rate limiting**: Consider limiting background regeneration to prevent stampedes
- **Content validation**: Validate data before caching to prevent XSS or injection

## SEO Considerations
- **Fully rendered HTML**: Search engines see complete content immediately
- **Consistent content**: Same HTML served to users and crawlers (within revalidate window)
- **No JavaScript dependency**: Content available even if JavaScript fails
- **Meta tags**: Use `<Head>` to set dynamic titles and descriptions
- **Structured data**: Include JSON-LD for rich snippets
- **Canonical URLs**: Prevent duplicate content issues
- **Sitemap generation**: Easy to generate from known paths (getStaticPaths)
- **Crawling frequency**: Search engines may crawl less if content appears stable
- **Lastmod header**: Consider implementing for dynamic ISR content
- **Cache control**: Proper headers help crawlers understand freshness
- **Internationalization**: Compatible with Next.js i18n routing
- **Core Web Vitals**: ISR excels at LCP and FID for cache hits; TTFB varies

## Interview Questions
1. What is Incremental Static Regeneration (ISR) in Next.js?
2. How does ISR differ from Static Generation (SSG) and Server-Side Rendering (SSR)?
3. How do you implement ISR in Next.js?
4. What is the purpose of the `revalidate` option in `getStaticProps`?
5. How does the `fallback` option in `getStaticPaths` work?
6. What happens when a request comes in for an ISR page with stale cache?
7. How do you handle background regeneration failures in ISR?
8. What are the scaling benefits of ISR compared to SSR?
9. How would you choose between SSG, ISR, and SSR for a given page?
10. How can you monitor and optimize ISR performance in production?

## MCQs
1. Which data fetching method enables Incremental Static Regeneration in Next.js?
   a) `getStaticProps` without `revalidate`
   b) `getStaticProps` with `revalidate`
   c) `getServerSideProps`
   d) `getInitialProps`
   <details>
   <summary>Answer</b) `getStaticProps` with `revalidate`
   </details>

2. What does `fallback: true` do in `getStaticPaths`?
   a) Returns 404 for paths not generated at build time
   b) Serves stale content and generates in background for new paths
   c) Blocks request and generates HTML on first request for new paths
   d) Disables static generation entirely
   <details>
   <summary>Answer</b) Serves stale content and generates in background for new paths
   </details>

3. What does `fallback: 'blocking'` do in `getStaticPaths`?
   a) Returns 404 for paths not generated at build time
   b) Serves stale content and generates in background for new paths
   c) Blocks request and generates HTML on first request for new paths
   d) Disables static generation entirely
   <details>
   <summary>Answer</c) Blocks request and generates HTML on first request for new paths
   </details>

4. How does Next.js handle a request for an ISR page when the cache is stale?
   a) Waits for regeneration to complete before responding
   b) Returns a 503 error
   c) Serves the stale cache and triggers background regeneration
   d) Returns a 404 error
   <details>
   <summary>Answer</c) Serves the stale cache and triggers background regeneration
   </details>

5. What is the minimum value you can set for `revalidate` in `getStaticProps`?
   a) 0 seconds
   b) 1 second
   c) 10 seconds
   d) There is no minimum
   <details>
   <summary>Answer</b) 1 second
   </details>

## Practice Exercise
1. Create a new Next.js project called `isr-exercise`
2. Create an ISR page for news articles (`/news/[id]`):
   - Fetch news data from an API
   - Set revalidate to 30 seconds
   - Implement fallback: `true` for new articles
3. Create a page that lists all news articles (`/news`):
   - Fetch list of article IDs from API
   - Generate paths for known articles at build time
   - Set revalidate to 60 seconds
4. Add a button to manually trigger regeneration (optional, via API route that purges cache)
5. Test the regeneration behavior by updating the news API and observing updates
6. Style the pages using CSS Modules
7. Verify that old articles are served from cache while new ones generate on demand

## Mini Project
Build a documentation system with ISR and versioning:
1. Create a Next.js project for versioned documentation
2. Organize content in Markdown files in a `docs/` directory with version subdirectories:
   - `docs/v1/intro.md`
   - `docs/v2/intro.md`
   - `docs/v3/getting-started.md`
3. Create a dynamic route `docs/[version]/[slug].js` that:
   - Reads the Markdown file from `docs/${version}/${slug}.md`
   - Converts Markdown to HTML using `remark`
   - Displays the documentation with proper styling
4. Implement `getStaticProps` to fetch and convert the Markdown content
5. Implement `getStaticPaths` to return all possible documentation pages for all versions
6. Set revalidate to 1 hour for documentation content
7. Use `fallback: false` since you know all documentation paths at build time
8. Add a version picker component that allows switching between documentation versions
9. Implement search functionality that filters documentation titles (client-side)
10. Add a sitemap.xml generator that runs during build and includes all documentation paths
11. Deploy to Vercel and verify that documentation updates are reflected without full rebuilds
12. Test by updating a Markdown file and verifying the change appears after the revalidate window

## Summary
In this topic, you learned about Incremental Static Regeneration (ISR) in Next.js, how it combines the benefits of SSG and SSR, and how to implement it using `getStaticProps` with the `revalidate` option. You also learned about fallback strategies, dynamic revalidation, and production considerations for ISR.

## Cheat Sheet
```
# Basic ISR Page
export async function getStaticProps({ params }) {
  const data = await fetchData(params.id)
  return {
    props: { data },
    revalidate: 60 // seconds
  }
}

# ISR with Fallback
export async function getStaticPaths() {
  return {
    paths: [], // Generate on demand
    fallback: true // or 'blocking'
  }
}

# ISR with Dynamic Revalidation
export async function getStaticProps({ params }) {
  const data = await fetchData(params.id)
  const revalidateTime = calculateRevalidateTime(data) // e.g., based on volatility
  return {
    props: { data },
    revalidate: revalidateTime
  }
}

# ISR Error Handling
export async function getStaticProps({ params }) {
  try {
    const data = await fetchData(params.id)
    return {
      props: { data },
      revalidate: 60
    }
  } catch (error) {
    return { notFound: true }
  }
}
```

## Related Topics
- Static Generation (SSG)
- Server-Side Rendering (SSR)
- Client-Side Data Fetching
- Data Fetching with getStaticProps and getStaticPaths
- Data Fetching with getServerSideProps
- Choosing the Right Data Fetching Method
- Preview Mode
- Incremental Static Regeneration
- Authentication and Authorization
- API Routes and Middleware

## Further Reading
- [Next.js Documentation - Incremental Static Regeneration](https://nextjs.org/docs/rendering/incremental-static-regeneration)
- [Next.js Documentation - getStaticProps](https://nextjs.org/docs/data-fetching/get-static-props)
- [Next.js Documentation - getStaticPaths](https://nextjs.org/docs/data-fetching/get-static-paths)
- [Next.js Documentation - ISR Fallback](https://nextjs.org/docs/rendering/incremental-static-regeneration#fallback)
- [Next.js Documentation - ISR and Static Assets](https://nextjs.org/docs/rendering/incremental-static-regeneration#static-assets-hexo)