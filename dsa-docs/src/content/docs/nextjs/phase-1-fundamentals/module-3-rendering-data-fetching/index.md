# Rendering & Data Fetching

## Introduction
Next.js provides multiple data fetching methods and rendering strategies to optimize performance, SEO, and user experience. Understanding when and how to use each method is crucial for building efficient applications.

## Why do we need this?
Different applications have different data requirements. Some content is static and can be pre-rendered, while other content is personalized or frequently updated and requires server-side or client-side fetching. Choosing the wrong method can lead to poor performance, stale data, or unnecessary server load.

## Problem Statement
Without understanding the trade-offs between different rendering and data fetching methods, developers might:
- Overuse client-side rendering, hurting SEO and initial load performance
- Use server-side rendering for static content, increasing server load and cost
- Fail to implement proper caching strategies, leading to redundant data fetching
- Create poor user experiences with loading states or flickering content

## Real World Story
You're building an e-commerce site where:
- Product listings need to be SEO-friendly, prices update frequently, and user-specific data (like cart contents) must be private. By using Static Generation (SSG) for product lists with periodic revalidation, Server-Side Rendering (SSR) for price checking, and Client-Side Rendering (CSR) for cart management, you optimize for performance, freshness, and personalization.

## Real World Analogy
Think of rendering strategies like different types of newspaper printing:
- **Static Generation (SSG)**: Like printing newspapers overnight for delivery in the morning - great for content that doesn't change frequently
- **Server-Side Rendering (SSR)**: Like printing a special edition newspaper for breaking news - ensures freshness but costs more
- **Client-Side Rendering (CSR)**: Like giving readers a blank newspaper and a pen to fill in their own personalized sections - great for custom content but requires effort from the reader
- **Incremental Static Regeneration (ISR)**: Like printing most newspapers overnight but updating the front page every few hours - balances freshness with efficiency

## Visual Explanation
```
Request Flow for Different Rendering Methods:

1. Static Generation (SSG):
   User Request → CDN (pre-built HTML) → Browser
   (No server execution at request time)

2. Server-Side Rendering (SSR):
   User Request → Node.js Server (render HTML) → CDN/Browser
   (Server executes at request time)

3. Incremental Static Regeneration (ISR):
   First Request → Cache Miss → Generate → Cache → Respond
   Subsequent Requests → Cache (until revalidation) → Respond
   Background: Regenerate after timeout

4. Client-Side Rendering (CSR):
   User Request → Minimal HTML + JS → Browser (fetch data) → Render
   (Initial load shows loading state, then data fills in)
```

## Internal Working
Next.js determines the rendering strategy based on:
1. **Data fetching functions used**:
   - `getStaticProps` / `getStaticPaths` → SSG (or ISR with revalidate)
   - `getServerSideProps` → SSR
   - No data fetching function → Client-side rendering (if using useEffect/etc.)
   - `getInitialProps` → Legacy (SSR-like behavior)
2. **`revalidate` option in `getStaticProps`**:
   - No `revalidate` → Static Generation (static forever)
   - `revalidate: false` → Static Generation (static forever)
   - `revalidate: number` → Incremental Static Regeneration
3. **Exporting `config` with `runtime`** (experimental):
   - `runtime: 'experimental-edge'` → Edge Runtime

## Technical Explanation
### Rendering Strategies
1. **Static Generation (SSG)**:
   - HTML generated at build time
   - Ideal for content that doesn't change frequently
   - Can be enhanced with ISR for periodic updates
   - Fastest possible response (served from CDN)

2. **Server-Side Rendering (SSR)**:
   - HTML generated on each request
   - Ideal for frequently changing data or personalized content
   - Higher server load but always fresh data

3. **Incremental Static Regeneration (ISR)**:
   - Hybrid approach: SSG with background updates
   - First request after expiration triggers regeneration
   - Subsequent requests get cached version until regenerated
   - Configurable via `revalidate` seconds in `getStaticProps`

4. **Client-Side Rendering (CSR)**:
   - Minimal HTML sent initially
   - JavaScript fetches data and renders content
   - Good for user-specific or frequently changing data
   - Requires loading states and may impact SEO

### Data Fetching Methods
1. **`getStaticProps`**:
   - Runs at build time (for SSG) or on-demand (for ISR)
   - Must return `props` object
   - Can return `notFound: true` or `redirect`
   - Optional `revalidate` for ISR

2. **`getStaticPaths`**:
   - Required for dynamic routes using SSG
   - Returns `paths` array and `fallback` behavior
   - `fallback: false` → 404 for undefined paths
   - `fallback: true` → Serve fallback, generate in background
   - `fallback: 'blocking'` → Wait for generation before responding

3. **`getServerSideProps`**:
   - Runs on every request
   - Must return `props` object
   - Can return `notFound: true`, `redirect`, or `props`
   - Has access to `req` and `res` objects

4. **`getInitialProps`**:
   - Legacy method (avoid in new code)
   - Runs on every request (server) and navigation (client)
   - Less efficient than newer methods

5. **Client-side data fetching**:
   - Using `useEffect`, `swr`, or `react-query`
   - Runs in the browser after initial render
   - Requires handling loading/error states

## Mermaid Diagram 1: Data Fetching Flow
```mermaid
flowchart TD
    A[Request for /blog/post-1] --> B{Has getStaticProps?}
    B -->|Yes| C{Has getStaticPaths?}
    C -->|Yes| D[Check if path in getStaticPaths]
    D -->|Yes| E[Run getStaticProps at build time]
    D -->|No (fallback: true)| F[Render fallback, then generate]
    D -->|No (fallback: false)| G[Return 404]
    C -->|No| H[Run getStaticProps at request time]
    B -->|No| I{Has getServerSideProps?}
    I -->|Yes| J[Run getServerSideProps at request time]
    I -->|No| K[Render component, fetch data client-side]
    E --> L[Generate HTML]
    F --> L
    H --> L
    J --> L
    K --> L
    L --> M[Send HTML to browser]
    M --> N[Browser hydrates React]
```

## Example: Static Generation (SSG)
1. Create `pages/blog/[slug].js`:
```jsx
import { notFound } from 'next/navigation';

export default function Post({ post }) {
  if (!post) {
    notFound();
  }
  
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.date}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  
  // Fetch from external API or database
  const res = await fetch(`https://api.example.com/posts/${slug}`);
  
  if (!res.ok) {
    return { notFound: true };
  }
  
  const post = await res.json();
  
  return {
    props: {
      post
    },
    // Regenerate at most once per hour
    revalidate: 3600
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
    fallback: false // or 'blocking' for ISR
  };
}
```

## Example: Server-Side Rendering (SSR)
1. Create `pages/dashboard.js`:
```jsx
import { useRouter } from 'next/router';

export default function Dashboard({ user, stats }) {
  if (!user) {
    // Redirect to login if not authenticated
    const router = useRouter();
    router.replace('/login');
    return null;
  }
  
  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Orders Today</h3>
          <p>{stats.ordersToday}</p>
        </div>
        <div className="stat-card">
          <h3>Revenue</h3>
          <p>${stats.revenue.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h3>Conversion Rate</h3>
          <p>{stats.conversionRate}%</p>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  // Get token from cookies
  const token = req.headers.cookie
    .split('; ')
    .find(row => row.startsWith('token='))
    ?.split('=')[1];
  
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }
  
  try {
    // Fetch user data
    const userRes = await fetch(`${process.env.API_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (!userRes.ok) {
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      };
    }
    
    const user = await userRes.json();
    
    // Fetch dashboard stats
    const statsRes = await fetch(`${process.env.API_URL}/dashboard/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (!statsRes.ok) {
      return { notFound: true };
    }
    
    const stats = await statsRes.json();
    
    return {
      props: {
        user,
        stats
      }
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return {
      redirect: {
        destination: '/error',
        permanent: false
      }
    };
  }
}
```

## Example: Incremental Static Regeneration (ISR)
1. Create `pages/product/[id].js`:
```jsx
export default function Product({ product }) {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: ${product.price}</p>
      <p>{product.description}</p>
      <p>
        <small>Last updated: {new Date(product.updatedAt).toLocaleString()}</small>
      </p>
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
  
  // Regenerate at most once every 10 minutes
  return {
    props: {
      product
    },
    revalidate: 600 // 10 seconds
  };
}

export async function getStaticPaths() {
  // Get all possible product IDs from your data source
  const res = await fetch('https://api.example.com/products');
  const products = await res.json();
  
  return {
    paths: products.map(p => ({
      params: { id: p.id.toString() }
    })),
    fallback: 'blocking' // Wait for generation on first request
  };
}
```

## Example: Client-Side Data Fetching
1. Create `pages/profile.js`:
```jsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Fetch user data on client side
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/profile');
        
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
        
        const userData = await res.json();
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, []);
  
  if (loading) {
    return <div className="p-4">Loading profile...</div>;
  }
  
  if (error) {
    return (
      <div className="p-4">
        <p className="text-red-500">Error: {error}</p>
        <button onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }
  
  if (!user) {
    return <div className="p-4">No user data available</div>;
  }
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{user.name}</h1>
      <p className="text-gray-600">{user.email}</p>
      <div className="mt-4">
        <h2 className="font-semibold">Preferences</h2>
        <p>{user.preferences.theme} theme</p>
        <p>{user.preferences.notifications ? 'Notifications enabled' : 'Notifications disabled'}</p>
      </div>
    </div>
  );
}
```

## Example: Using SWR for Data Fetching
1. Install SWR: `npm install swr`
2. Create `components/posts-list.js`:
```jsx
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then(res => res.json());

export default function PostsList() {
  const { data, error, isLoading } = useSWR('/api/posts', fetcher);
  
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <ul>
      {data.posts.map(post => (
        <li key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
          <a href={`/posts/${post.id}`}>Read more</a>
        </li>
      ))}
    </ul>
  );
}
```

## Example: Mixed Strategies in One Page
1. Create `pages/dashboard.js` (SSR for user-specific data, SSG for shared data):
```jsx
import { useEffect, useState } from 'react';

export default function Dashboard({ siteStats, userNotifications }) {
  const [personalData, setPersonalData] = useState(null);
  
  useEffect(() => {
    // Fetch user-specific data on client side
    fetch('/api/user/dashboard')
      .then(res => res.json())
      .then(setPersonalData)
      .catch(err => console.error('Failed to fetch personal data:', err));
  }, []);
  
  return (
    <div>
      {/* Server-Side Rendered: Shared site stats (rarely changes) */}
      <section className="mb-6">
        <h2 className="text-xl font-bold">Site Statistics</h2>
        <p>Total Users: {siteStats.totalUsers}</p>
        <p>Active Sessions: {siteStats.activeSessions}</p>
      </section>
      
      {/* Client-Side Rendered: User notifications (frequently changes) */}
      <section className="mb-6">
        <h2 className="text-xl font-bold">Notifications</h2>
        {userNotifications.length > 0 ? (
          <ul>
            {userNotifications.map(notif => (
              <li key={notif.id} className="mb-2 p-2 bg-gray-50 rounded">
                {notif.message}
                <time>{new Date(notif.timestamp).toLocaleTimeString()}</time>
              </li>
            ))}
          </ul>
        ) : (
          <p>No new notifications</p>
        )}
      </section>
      
      {/* Client-Side Rendered: Personal data (user-specific) */}
      <section>
        <h2 className="text-xl font-bold">Your Dashboard</h2>
        {personalData ? (
          <div>
            <p>Welcome back, {personalData.name}!</p>
            <p>Your balance: ${personalData.balance}</p>
          </div>
        ) : (
          <p>Loading your personal data...</p>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  // Get site-wide stats (same for all users)
  const siteStatsRes = await fetch(`${process.env.API_URL}/stats`);
  const siteStats = await siteStatsRes.json();
  
  // Get user notifications (can be cached briefly)
  let userNotifications = [];
  try {
    const token = extractToken(req);
    if (token) {
      const notifRes = await fetch(`${process.env.API_URL}/notifications`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (notifRes.ok) {
        userNotifications = await notifRes.json();
      }
    }
  } catch (error) {
    console.warn('Could not fetch user notifications:', error);
  }
  
  return {
    props: {
      siteStats,
      userNotifications
    }
  };
}

function extractToken(req) {
  const cookie = req.headers.cookie;
  if (!cookie) return null;
  const match = cookie.match(/token=([^;]+)/);
  return match ? match[1] : null;
}
```

## Production Example: Choosing the Right Strategy
1. **Marketing Pages (Home, About, Contact)**: SSG (no `revalidate`) - content changes rarely
2. **Blog Posts**: SSG with `revalidate: 3600` (ISR) - updates hourly
3. **Product Listings**: SSG with `revalidate: 60` (ISR) - updates every minute
4. **Product Details (price, inventory)**: SSR - price and stock change frequently
5. **User Profile**: CSR with SWR - user-specific, private data
6. **Admin Dashboard**: SSR - sensitive data requiring authentication
7. **Search Results**: SSG with `revalidate: 30` (ISR) - balances freshness and performance
8. **API Responses**: SSR (always fresh) or CSR (if cacheable)

## Best Practices
1. **Prefer SSG when possible**: Fastest, cheapest, best for SEO
2. **Use ISR for semi-static content**: Balances freshness with performance
3. **Use SSR for dynamic or personalized content**: Ensures data is fresh and secure
4. **Use CSR for user-interactive data**: Reduces server load for frequent updates
5. **Implement proper error handling**: Especially for data fetching methods
6. **Leverage streaming**: With React 18, consider streaming SSR for better TTFB
7. **Optimize database queries**: Especially for SSR to reduce response time
8. **Use caching layers**: Redis, CDN, or in-memory caches for SSR endpoints
9. **Consider edge computing**: For global audiences, use Edge Runtime or middleware
10. **Monitor performance**: Track TTFB, FCP, LCP for different strategies
11. **Use HTTP caching headers**: For SSG/ISR responses to leverage CDN caching
12. **Implement request deduplication**: Prevent multiple identical requests
13. **Consider skeleton UIs**: Better UX than spinners for content loading
14. **Validate data at the edge**: Use middleware for authentication and validation
15. **Test with realistic data**: Ensure your chosen strategy works with production data volumes

## Common Mistakes
1. **Using SSR for static content**: Wastes server resources and increases costs
2. **Using CSR for SEO-critical content**: Results in poor search engine rankings
3. **Forgetting to handle loading states**: Leads to poor user experience
4. **Not implementing error boundaries**: Causes entire app to crash on data fetch errors
5. **Over-fetching data**: Requesting more data than needed increases latency and bandwidth
6. **Under-fetching data**: Requires additional requests, creating waterfalls
7. **Ignoring authentication requirements**: Exposing sensitive data in SSG endpoints
8. **Using getInitialProps unnecessarily**: Causes performance degradation
9. **Not setting proper cache headers**: Missing opportunities for CDN optimization
10. **Using ISR with very low revalidate values**: Negates benefits of static generation
11. **Forgetting to handle 404s in getStaticPaths**: Leads to unhandled promise rejections
12. **Mixing data fetching methods inappropriately**: Causing inconsistent behavior
13. **Not considering user permissions**: Displaying data users shouldn't see
14. **Overlooking build time increases**: Especially with large numbers of static paths
15. **Ignoring client-side hydration mismatches**: Causing React warnings and UI issues

## Performance Notes
- **SSG**: Fastest TTFB (Time to First Byte), ideal for CDNs
- **SSR**: Higher TTFB but consistent freshness; optimize with caching and database indexing
- **ISR**: First miss has SSR-like performance, subsequent requests are SSG-fast
- **CSR**: Fastest initial HTML (minimal) but delays content visibility (FID, LCP impacted)
- **Data fetching**: Usually the bottleneck, not the rendering itself
- **Concurrent queries**: Use `Promise.all()` for independent data fetches
- **Selective fetching**: Only request fields you need
- **Pagination**: Implement for large datasets to avoid memory issues
- **Caching**: Implement at multiple levels (database, application, CDN)
- **Preview modes**: Use Next.js preview mode for draft content
- **Feature flags**: Toggle between strategies for testing
- **Bundle size**: Client-side fetching increases JS payload slightly
- **Memory usage**: SSR requires more memory per request than SSG

## Security Notes
- **SSG**: Safe for public data; never include secrets in generated HTML
- **SSR**: Validate authentication and authorization on every request
- **CSR**: Never store secrets in client-side code; use secure HTTP-only cookies
- **API Routes**: Apply same security considerations as any backend endpoint
- **Environment Variables**: Never expose secrets to the client (only `NEXT_PUBLIC_*` variables)
- **Data Filtering**: Ensure queries only return data the user is authorized to see
- **Input Validation**: Especially important for SSR to prevent injection attacks
- **Rate Limiting**: Protect SSG/ISR endpoints from abuse (though less critical than SSR)
- **Secure Headers**: Implement via `_headers` file or middleware
- **Dependency Scanning**: Keep dependencies updated to avoid vulnerabilities
- **Error Handling**: Don't leak stack traces or internal errors to users
- **File System Access**: Be cautious with file operations in SSR (path traversal risks)
- **Third-party APIs**: Validate and sanitize data from external sources
- **CSRF Protection**: Especially important for state-changing operations in SSR

## SEO Considerations
- **SSG**: Best for SEO - fully rendered HTML available immediately
- **SSR**: Good for SEO - search engines see fully rendered content
- **ISR**: Good for SEO after initial generation; first visitor may see slight delay
- **CSR**: Poor for SEO - search engines may not execute JavaScript or see incomplete content
- **Dynamic Serving**: Consider using dynamic serving for SEO-critical user-specific content
- **Prerendering**: Use services like Prerender.io for SPA-like applications
- **Structured Data**: Include JSON-LD in SSR/SSG for rich snippets
- **Meta Tags**: Use `<Head>` to set dynamic titles and descriptions
- **Canonical URLs**: Prevent duplicate content issues
- **Pagination**: Use `rel="next"` and `rel="prev"` for paginated content
- **Internationalization**: Use hreflang tags for multi-language sites
- **Core Web Vitals**: All strategies impact LCP, FID, and CLS differently
- **Server Location**: SSR performance depends on server proximity to user
- **Edge Computing**: Consider edge strategies for global audiences
- **Fallback Content**: Ensure meaningful content is visible while loading dynamic data

## Interview Questions
1. What are the different rendering strategies available in Next.js?
2. When would you use Static Generation (SSG) versus Server-Side Rendering (SSR)?
3. What is Incremental Static Regeneration (ISR) and when would you use it?
4. How does client-side data fetching differ from server-side data fetching in Next.js?
5. What is the purpose of `getStaticProps` and `getStaticPaths`?
6. How do you implement Incremental Static Regeneration?
7. What are the advantages and disadvantages of each rendering strategy?
8. How would you choose between SSG, SSR, and CSR for a given piece of content?
9. How does Next.js handle authentication with different rendering strategies?
10. How can you optimize database queries for SSR endpoints?
11. What is the difference between `getInitialProps` and the newer data fetching methods?
12. How do you handle errors in data fetching functions?
13. How would you implement a landing page that needs to be both SEO-friendly and personalized?
14. How does Next.js handle streaming responses with React 18?
15. What are the security considerations for each rendering strategy?

## MCQs
1. Which data fetching method runs at build time for static generation?
   a) `getServerSideProps`
   b) `getStaticProps`
   c) `getInitialProps`
   d) `useEffect`
   <details>
   <summary>Answer</b) `getStaticProps`
   </details>

2. Which method would you use for a page that needs to be updated every 5 minutes?
   a) `getStaticProps` without revalidate
   b) `getStaticProps` with `revalidate: 300`
   c) `getServerSideProps`
   d) `getInitialProps`
   <details>
   <summary>Answer</b) `getStaticProps` with `revalidate: 300`
   </details>

3. Which strategy is best for frequently changing, user-specific data?
   a) Static Generation (SSG)
   b) Server-Side Rendering (SSR)
   c) Client-Side Rendering (CSR)
   d) Incremental Static Regeneration (ISR)
   <details>
   <summary>Answer</c) Client-Side Rendering (CSR)
   </details>

4. What does the `fallback: 'blocking'` option in `getStaticPaths` do?
   a) Returns 404 for paths not in the paths array
   b) Serves a fallback page and generates the requested page in the background
   c) Waits for the page to be generated before responding
   d) Disables static generation entirely
   <details>
   <summary>Answer</c) Waits for the page to be generated before responding
   </details>

5. Which method has access to `req` and `res` objects?
   a) `getStaticProps`
   b) `getServerSideProps`
   c) `getInitialProps`
   d) Both b and c
   <details>
   <![CDATA[
   <details>
   <summary>Answer</b) `getServerSideProps`
   </details>
   ]]>