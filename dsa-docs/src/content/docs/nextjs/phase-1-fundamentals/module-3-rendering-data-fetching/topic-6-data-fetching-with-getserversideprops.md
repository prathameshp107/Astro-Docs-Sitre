# Data Fetching with getServerSideProps

## Introduction
`getServerSideProps` is a Next.js data fetching method used for Server-Side Rendering (SSR). This function runs on every request (or on-demand in edge environments) to fetch data and render HTML on the server, ensuring that users always receive the most up-to-date content.

## Why do we need this?
Not all content can be pre-generated at build time. For frequently changing data, user-specific content, or pages that depend on request-time information (like cookies or headers), we need to fetch data and render HTML when the request arrives. `getServerSideProps` provides this capability while maintaining the familiar Next.js data fetching pattern.

## Problem Statement
Client-side data fetching hurts SEO and initial load performance, while Static Generation can't handle frequently changing or personalized data. We need a solution that allows data fetching at request time to ensure content freshness, while still benefiting from Next.js's optimized rendering and routing.

## Real World Story
Imagine you're building a financial trading platform where stock prices update every second. Using Static Generation would show outdated prices as soon as the page is built. Using Client-Side Rendering would mean users see a loading state and search engines might not index the content properly. By using `getServerSideProps`, you fetch the latest stock prices on every request and render the HTML server-side, ensuring users always see current prices while maintaining good SEO and fast initial render.

## Real World Analogy
Think of `getServerSideProps` like a made-to-order restaurant:
- You place your order (visit the URL)
- The kitchen (server) gathers fresh ingredients (fetches data)
- The chef prepares your meal (renders HTML) right when you order
- You receive a hot, fresh meal made exactly to your specifications
- Just as you wouldn't want yesterday's pre-made meal, you don't want stale data on frequently changing pages

## Visual Explanation
```
Request Time Process:
------------------
[User] → Request /dashboard → [Next.js Router]
                             ↓
                    [Check for getServerSideProps]
                             ↓
              [Yes] → [getServerSideProps] → [Fetch data from APIs/DB]
                             ↓
                    [Render React component with data]
                             ↓
                       [Generate HTML string]
                             ↓
                     [Send HTML + JavaScript to browser]
                             ↓
                  [Browser] → [Hydrate React components]
                             ↓
               [Interactive page ready for user]
```

## Technical Explanation
### How getServerSideProps Works
1. **At Request Time**: On every request to a page with `getServerSideProps`, Next.js calls this function
2. **Server Environment**: Runs on the server (Node.js) with access to server-only resources
3. **Request Access**: Receives `context` object containing `req`, `res`, `query`, `params`, etc.
4. **Data Fetching**: Can fetch data from APIs, databases, or file systems using server-only code
5. **HTML Generation**: Received data is used to render the React component to HTML string
6. **Response**: HTML string is sent as the response, along with necessary JavaScript for hydration

### Context Object Properties
The `context` parameter passed to `getServerSideProps` contains:
- `params`: Route parameters (for dynamic routes)
- `req`: HTTP IncomingMessage object
- `res`: HTTP ServerResponse object
- `query`: Query string parameters
- `resolvedUrl`: The resolved URL
- Additionally, in Edge Runtime: `geo`, `ip`, etc.

## Example: User Dashboard with Authentication
1. Create `pages/dashboard.js`:
```jsx
import { useRouter } from 'next/router';
import { getUserById, getUserStats } from '@/lib/user';

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
    const user = await getUserById(token);
    
    if (!user) {
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      };
    }
    
    // Fetch dashboard stats
    const stats = await getUserStats(token);
    
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

## Example: Real-time Stock Ticker
1. Create `pages/stock/[symbol].js`:
```jsx
import { useRouter } from 'next/router';
import { getStockData } from '@/lib/stock';

export default function Stock({ stockData }) {
  if (!stockData) {
    // Redirect to home if symbol not found
    const router = useRouter();
    router.push('/');
    return null;
  }
  
  return (
    <div>
      <h1>{stockData.symbol}</h1>
      <p>Price: ${stockData.price.toFixed(2)}</p>
      <p>Change: {stockData.change} ({stockData.changePercent}%)</p>
      <p>Volume: {stockData.volume.toLocaleString()}</p>
      <p>Updated: {new Date(stockData.timestamp).toLocaleTimeString()}</p>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { symbol } = params;
  
  try {
    const stockData = await getStockData(symbol.toUpperCase());
    
    if (!stockData) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      };
    }
    
    return {
      props: {
        stockData
      }
    };
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return {
      notFound: true
    };
  }
}
```

## Example: API Proxy with Rate Limiting
1. Create `pages/api/proxy/[...path].js`:
```jsx
import { rateLimit } from '@/lib/rateLimit';
import { fetchWithAuth } from '@/lib/fetchWithAuth';

export default async function handler(req, res) {
  // Apply rate limiting
  const limiter = rateLimit({
    interval: 60 * 1000, // 1 minute
    uniqueTokenPerInterval: 500, // max 500 requests per interval
  });
  
  try {
    await limiter.check(res, 10); // LIMIT_EACH - max 10 requests per minute
  } catch (error) {
    return res.status(429).json({ error: 'Rate limit exceeded' });
  }
  
  // Proxy to external API
  try {
    const externalRes = await fetchWithAuth(
      `https://external-api.com/${req.query[0]}/${req.query[1]}`,
      {
        method: req.method,
        headers: req.headers,
        body: req.body
      }
    );
    
    const data = await externalRes.json();
    return res.status(externalRes.status).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ error: 'Proxy failed' });
  }
}

// Configure this route to run getServerSideProps equivalent
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb'
    }
  }
};
```

## Example: Internationalized Page
1. Create `pages/[lang]/index.js`:
```jsx
import { useRouter } from 'next/router';
import { getTranslations } from '@/lib/i18n';

export default function Home({ translations, lang }) {
  return (
    <div>
      <h1>{translations.welcome}</h1>
      <p>{translations.description}</p>
      <Link href="/about">
        <a>{translations.about}</a>
      </Link>
    </div>
  );
}

export async function getServerSideProps({ params, req, res }) {
  const { lang } = params;
  
  // Validate language code
  const supportedLanguages = ['en', 'es', 'fr', 'de', 'ja'];
  if (!supportedLanguages.includes(lang)) {
    return {
      notFound: true
    };
  }
  
  try {
    const translations = await getTranslations(lang);
    
    return {
      props: {
        translations,
        lang
      }
    };
  } catch (error) {
    console.error('Error fetching translations:', error);
    return {
      notFound: true
    };
  }
}
```

## Production Example
In production, `getServerSideProps` works as follows:
- **Request Handling**: Each request to a page with `getServerSideProps` triggers server-side execution
- **Server Execution**: Runs on Node.js server (or Edge Function if configured)
- **Data Fetching**: Can access databases, APIs, file systems, and other server-only resources
- **HTML Generation**: Server renders React component to HTML string
- **Response**: HTML + JavaScript sent to client for hydration
- **Caching**: 
  - Automatic caching depends on deployment platform (Vercel, etc.)
  - Manual caching possible via headers or external caching layers
  - Typically not cached (or cached briefly) for truly dynamic content
- **Scaling Requirements**:
  - Horizontal scaling needed for high traffic
  - Consider caching layers (Redis, CDN) for frequently accessed data
  - Database connection pooling essential
- **Monitoring Needs**:
  - Request latency and throughput
  - Error rates and failed requests
  - Database query performance
  - Memory and CPU usage
- **Cost Considerations**:
  - Higher ongoing costs than SSG/ISR due to server compute
  - Cost scales with request volume and complexity
  - Optimize by caching frequently accessed data
  - Consider edge computing for geographic distribution

## Folder Structure Context
Pages using `getServerSideProps` exist alongside other page types:
```
pages/
├── index.js                  # SSG (no data fetching)
├── about.js                  # SSG (no data fetching)
├── dashboard.js              # SSR with getServerSideProps
├── stock/
│   └── [symbol].js           # SSR with getServerSideProps
├── api/
│   └── proxy/
│       └── [...path].js      # API route (server-only)
├── [lang]/
│   └── index.js              # SSR with getServerSideProps
└── _middleware.js            # Applies to all pages and API routes
```

## Best Practices
1. **Data Fetching Efficiency**: 
   - Fetch only needed data to minimize latency
   - Use database indexing and query optimization
   - Consider GraphQL to fetch related data in single request
2. **Error Handling**: 
   - Return appropriate status codes (404, 500, redirects)
   - Use `{ notFound: true }` for missing resources
   - Use `{ redirect: { destination: '/login', permanent: false } }` for auth
   - Log errors appropriately without exposing secrets
3. **Security**:
   - Never expose secrets in client-side code
   - Validate and sanitize all inputs (params, query, body)
   - Use environment variables for configuration and secrets
   - Implement proper authentication and authorization checks
4. **Performance Optimization**:
   - Implement caching layers (Redis, Memcached) for database queries
   - Use HTTP caching headers when appropriate (Cache-Control, ETag)
   - Consider request deduplication for identical concurrent requests
   - Monitor and optimize slow database queries
5. **Edge Computing**: 
   - Consider `runtime: 'experimental-edge'` for geographic distribution
   - Be aware of Edge Runtime limitations (no Node.js APIs)
   - Use fetch API instead of Node.js http/https modules
6. **Request Handling**:
   - Set appropriate HTTP status codes
   - Handle different HTTP methods (GET, POST, PUT, DELETE, etc.)
   - Set security headers (CSP, X-Frame-Options, etc.)
   - Implement proper CORS policies when needed
7. **Code Organization**:
   - Extract data fetching logic to reusable services/lib
   - Keep components focused on presentation
   - Use TypeScript for better development interfaces for data shape consistency

## Common Mistakes
1. **Blocking the Event Loop**: Using synchronous operations that block Node.js event loop
2. **Over-Fetching Data**: Requesting more data than needed increases latency and cost
3. **Missing Error Handling**: Leads to 500 errors or hanging requests
4. **Incorrect Redirect Usage**: Forgetting to return redirect object from getServerSideProps
5. **Exposing Secrets**: Accidentally including secrets in returned props
6. **Ignoring Request Size Limits**: Not checking for overly large request bodies
7. **Using Browser-only APIs**: `window`, `document`, etc. aren't available in getServerSideProps
8. **Not Validating Authentication**: Leads to unauthorized access to sensitive data
9. **Improper Status Codes**: Returning 200 for error conditions or vice versa
10. **Forgetting to Set Headers**: Missing Content-Type, caching, or security headers

## Performance Notes
- **Time to First Byte (TTFB)**: 
  - Includes server processing time (aim for <200ms)
  - Affected by database query speed, API latency, and server load
  - Can be improved with caching, database indexing, and geographic distribution
- **First Contentful Paint (FCP)**: Depends on TTFB and HTML size
- **Largest Contentful Paint (LCP)**: Affected by how quickly main content appears
- **First Input Delay (FID)**: Low since minimal JavaScript needed for hydration
- **Cumulative Layout Shift (CLS)**: Minimal if dimensions are known upfront
- **Scaling Characteristics**:
  - Horizontal scaling required for increased load
  - Database connection pooling essential
  - Consider read replicas for read-heavy workloads
- **Cost Factors**:
  - Server compute costs (CPU, memory, bandwidth)
  - Third-party API usage costs
  - Database read/write operations
  - Network traffic between services
- **Optimization Techniques**:
  - Query result caching (Redis, Memcached)
  - CDN for static assets
  - Request deduplication
  - Lazy loading of non-critical data

## Security Notes
- **Authentication**: 
  - Verify user identity before granting access to sensitive data
  - Use secure, HttpOnly cookies for tokens
  - Implement proper session validation and expiration
- **Authorization**:
  - Check user permissions before returning sensitive data
  - Implement role-based access control (RBAC) when appropriate
  - Use middleware for route-level protection
- **Input Validation**:
  - Validate all inputs: params, query, body, headers
  - Sanitize data to prevent injection (SQL, NoSQL, XSS)
  - Use validation libraries (Zod, Joi) for complex validation
- **Output Encoding**:
  - Escape user-generated content before inserting into HTML
  - Use dangerouslySetInnerHTML only with trusted, sanitized content
  - Implement Content Security Policy (CSP) headers
- **Data Protection**:
  - Use parameterized queries or ORM to prevent SQL injection
  - Encrypt sensitive data at rest and in transit
  - Implement proper error handling to avoid leakage
- **Secrets Management**:
  - Never hardcode secrets; use environment variables
  - Use secret management services (AWS Secrets Manager, HashiCorp Vault)
  - Rotate secrets regularly
- **Request Security**:
  - Implement rate limiting to prevent abuse
  - Validate request size to prevent DoS attacks
  - Use CSRF protection for state-changing operations
  - Set secure headers (HSTS, CSP, X-Frame-Options, etc.)

## SEO Considerations
- **Full HTML Rendering**: Search engines get complete, indexable content immediately
- **Dynamic Content Freshness**: Ensures crawlers see the same content as users
- **No JavaScript Dependency**: Content available even if JavaScript fails or is disabled
- **Meta Tags**: Dynamic titles, descriptions, and OpenGraph tags based on request data
- **Structured Data**: Easy to include JSON-LD metadata that reflects current data
- **Canonical URLs**: Prevent duplicate content issues with proper canonical tags
- **Pagination**: Use rel="next" and rel="prev" for paginated content
- **Language Tags**: Proper hreflang tags for internationalized content
- **Core Web Vitals**:
  - LCP: Depends on server response time and content optimization
  - FID: Minimal JavaScript needed for hydration
  - CLS: Low when dimensions are known and content doesn't shift
- **Crawl Efficiency**: Fast response times improve crawl budget utilization
- **Error Handling**: Proper 404/500 pages help maintain site health in search indices
- **Mobile SEO**: Ensure responsive design and proper viewport meta tag

## Interview Questions
1. What is the key difference between `getServerSideProps` and `getStaticProps`?
2. When would you choose `getServerSideProps` over Static Generation (SSG) or Incremental Static Regeneration (ISR)?
3. How do you handle authentication and authorization in `getServerSideProps`?
4. What data is available in the `context` object passed to `getServerSideProps`?
5. How do you handle errors in `getServerSideProps`?
6. What are the performance implications of using `getServerSideProps`?
7. How does `getServerSideProps` affect Time to First Byte (TTFB)?
8. How can you implement caching for `getServerSideProps` to reduce server load?
9. What security considerations should you keep in mind when using `getServerSideProps`?
10. How do you handle different HTTP methods (GET, POST, PUT, DELETE) in `getServerSideProps`?

## MCQs
1. Which function runs on every request in Next.js?
   a) `getStaticProps`
   b) `getServerSideProps`
   c) `getStaticPaths`
   d) `useEffect`
   <details>
   <summary>Answer</b) `getServerSideProps`
   </details>

2. Which object in `getServerSideProps` contains the HTTP request details?
   a) `params`
   b) `req`
   c) `res`
   d) `context`
   <details>
   <summary>Answer</b) `req`
   </details>

3. How do you redirect in `getServerSideProps`?
   a) Return `{ redirect: { destination: '/login', permanent: false } }`
   b) Call `res.redirect('/login')`
   c) Throw a redirect error
   d) Set `window.location.href` in the page component
   <details>
   <summary>Answer</a) Return `{ redirect: { destination: '/login', permanent: false } }`
   </details>

4. What happens if you throw an error in `getServerSideProps`?
   a) Next.js returns a 500 error page
   b) Next.js returns a 404 error page
   c) Next.js retries the request
   d) The error is ignored and the page renders with empty props
   <details>
   <summary>Answer</a) Next.js returns a 500 error page
   </details>

5. Which of the following is NOT available in `getServerSideProps`?
   a) `req` object
   b) `res` object
   c) `window` object
   d) `params` object
   <details>
   <summary>Answer</c) `window` object
   </details>

## Practice Exercise
1. Create a new Next.js project called `ssr-data-exercise`
2. Create a user profile page at `/profile/[id]` that:
   - Fetches user data from an external API on every request
   - Implements authentication check using HTTP-only cookies
   - Displays user information (name, email, bio, avatar)
   - Shows a loading state while fetching data
   - Handles errors gracefully with appropriate error pages
3. Create an API route at `/api/users/[id]` that:
   - Returns user data from a mock database
   - Implements basic authentication via API key header
   - Returns 404 for non-existent users
   - Returns 401 for invalid or missing API key
4. Test the profile page in development mode
5. Build for production and verify the SSR behavior
6. Test error cases (invalid ID, missing auth, etc.)

## Mini Project
Build a real-time dashboard application using `getServerSideProps`:
1. Create a Next.js project for system monitoring
2. Create the following pages:
   - `/`: Homepage with navigation links
   - `/dashboard`: Main dashboard showing system metrics
   - `/dashboard/[metric]`: Detailed view for specific metrics
   - `/login`: User authentication page
   - `/admin`: Admin-only section (protected route)
3. Implement authentication system:
   - Login/logout functionality with JWT in HTTP-only cookies
   - Middleware to protect `/admin` route
   - User roles (user, admin) stored in database
4. Fetch real-time data in `getServerSideProps`:
   - System metrics (CPU, memory, disk usage, network)
   - Application metrics (requests per second, error rates, response times)
   - User activity (active sessions, recent logins)
   - Use WebSocket or polling for updates if needed (bonus)
5. Create API routes for:
   - Authentication (`/api/auth/login`, `/api/auth/logout`)
   - Fetching system metrics (`/api/metrics`)
   - Fetching user data (`/api/users/[id]`)
   - Admin-only operations (`/api/admin/*`)
6. Implement error handling and loading states throughout
7. Add charts and visualizations using a library like Chart.js or Recharts
8. Style the application using CSS Modules or Tailwind CSS
9. Test authentication flow and role-based access control
10. Build for production and verify server-side rendering behavior
11. Deploy to Vercel and test in production environment
12. Monitor performance and error rates in production