---
title: "Preview Mode"
description: "Preview User Flow: ----------------- [Editor] → Request /blog/post-1?preview=true&previewData=... ↓ [Next.js Server detects preview mode] ↓ [Bypass static"
---

# Preview Mode

## Introduction
Preview Mode is a Next.js feature that allows you to view unpublished or draft content without rebuilding your site. It enables content editors and writers to preview changes in real-time using your Next.js application while keeping the production build serving only published content.

## Why do we need this?
In content-driven applications, writers and editors need to see how their unpublished changes will look before publishing. Traditional approaches require either:
1. Rebuilding the entire site to see changes (slow and disruptive)
2. Using a separate preview environment (inconsistent with production)
3. Showing raw, unstyled data (poor user experience)
Preview Mode solves this by letting you preview draft content in the exact same environment as your production site.

## Problem Statement
Content management systems often decouple content authoring from content delivery. When using Static Generation (SSG) or Incremental Static Regeneration (ISR), previewing content requires either rebuilding (losing the performance benefits of static generation) or building a separate preview system (increasing complexity and maintenance burden).

## Real World Story
Imagine you're running a news website where journalists write articles throughout the day. Before publishing an article, the journalist wants to see how it will look on the actual website with all the styling, layout, and related content. Without Preview Mode, they would have to either:
1. Wait for the next site rebuild (could be hours)
2. See a raw JSON view of their article
3. Use a separate staging environment that might differ from production
With Preview Mode, journalists can click a "Preview" button in their CMS and instantly see exactly how the article will appear on the live site.

## Real World Analogy
Think of Preview Mode like a restaurant's "chef's special" board:
- The regular menu (production site) shows only confirmed, published dishes
- The chef's special board (preview mode) shows experimental dishes being tested
- Customers can see both the regular menu and the specials
- The kitchen can test new recipes without disrupting the regular service
- Once a special is proven, it moves to the regular menu
- If it doesn't work out, it's removed from the specials board without affecting the regular menu

## Visual Explanation
```
Normal User Flow:
-----------------
[User] → Request /blog/post-1 → [Next.js Server]
                             ↓
                    [Check for published content]
                             ↓
               [Serve static HTML from CDN/cache]
                             ↓
                    [Browser] → [Hydrate] → [Interactive Page]

Preview User Flow:
-----------------
[Editor] → Request /blog/post-1?preview=true&previewData=... 
                             ↓
                    [Next.js Server detects preview mode]
                             ↓
         [Bypass static cache] → [Call getServerSideProps/getStaticProps]
                             ↓
                    [Fetch draft data from CMS]
                             ↓
               [Render HTML with draft content]
                             ↓
                    [Browser] → [Hydrate] → [Interactive Preview Page]

Preview Activation:
-----------------
[Editor] → [CMS] → [Click "Preview" button] 
                             ↓
          [CMS] → [Redirect to /api/preview?slug=post-1&secret=...]
                             ↓
     [API Route] → [Set preview cookies] → [Redirect to /blog/post-1]
                             ↓
               [Browser] → [Request with preview cookies] 
                             ↓
          [Next.js Server] → [Enable preview mode] → [Fetch draft data]
```

## Technical Explanation
### How Preview Mode Works
1. **Activation**: User visits a special API route (usually `/api/preview`) that sets preview cookies
2. **Cookie Setting**: The API route sets `prismic-preview` (or custom) cookies that indicate preview mode
3. **Request Handling**: On subsequent requests, Next.js detects these cookies
4. **Mode Switch**: Instead of serving static files, Next.js runs data fetching functions
5. **Data Fetching**: 
   - For SSG pages: Runs `getStaticProps`/`getStaticPaths` on request (like SSR)
   - For ISR pages: Ignores revalidation and runs data fetching on request
   - For SSR pages: Behaves normally (already runs on request)
6. **Content Delivery**: Returns HTML with draft/unpublished content
7. **Expiration**: Preview mode lasts until cookies expire or are cleared

### Preview Mode Mechanics
- **Cookies**: Uses `pr-preview` (legacy) or `prismic-preview` cookies by default
- **Customization**: Can customize cookie name and preview data handling
- **Duration**: Preview state persists as long as cookies are present
- **Scope**: Affects all pages in the Next.js application
- **Fallback**: If no preview data provided, falls back to regular data fetching

## Example: Basic Preview Setup
1. Create a preview API route at `/api/preview.js`:
```jsx
export default function handler(req, res) {
  // Check for secret to prevent abuse
  if (req.query.secret !== process.env.PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  // Check for document ID to preview
  if (!req.query.slug) {
    return res.status(400).json({ message: 'Missing slug' })
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({})

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerability
  res.writeHead(307, { Location: `/posts/${req.query.slug}` })
  res.end()
}
```

2. Create a page that supports preview mode at `/posts/[slug].js`:
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

// This function will be called in both static generation and preview mode
export async function getStaticProps({ params }) {
  const { slug } = params
  
  // In preview mode, we can fetch draft posts
  const isPreview = !!req.preview
  
  const post = await getPostBySlug(slug, { 
    preview: isPreview, 
    previewData: req.previewData 
  })
  
  if (!post) {
    return { notFound: true }
  }
  
  return {
    props: { post },
    // Only enable revalidation if we're not in preview mode
    // Preview mode should always show the latest draft
    ...(!isPreview && { revalidate: 600 }) // 10 minutes
  }
}

// Required for dynamic routes
export async function getStaticPaths() {
  // Return all possible slugs from published posts
  // In preview mode, we'll still be able to view drafts
  const slugs = await getAllPostSlugs({ preview: false })
  
  return {
    paths: slugs.map(slug => ({
      params: { slug }
    })),
    fallback: false // Not needed for preview mode but required
  }
}
```

3. Create a way to enter preview mode from your CMS:
```jsx
// In your CMS or admin interface
function handlePreviewClick(post) {
  const previewUrl = `/api/preview?slug=${post.slug}&secret=${process.env.PREVIEW_SECRET}`
  window.open(previewUrl, '_blank')
}
```

## Example: Preview Mode with Data
Sometimes you need to pass preview data directly rather than fetching it:

1. Create a preview API route that accepts data:
```jsx
export default function handler(req, res) {
  // Check for secret to prevent abuse
  if (req.query.secret !== process.env.PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  // Check for required fields
  if (!req.query.slug || !req.query.title) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  // Enable Preview Mode with custom data
  res.setPreviewData({
    slug: req.query.slug,
    title: req.query.title,
    content: req.query.content || ''
  })

  // Redirect to the correct path
  res.writeHead(307, { Location: `/posts/${req.query.slug}` })
  res.end()
}
```

2. Create a page that uses preview data:
```jsx
import { notFound } from 'next/navigation';

export default function Post({ post }) {
  if (!post) {
    notFound();
  }
  
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

// This will receive either static data or preview data
export async function getStaticProps({ params, previewData, preview }) {
  // In preview mode, use the provided data
  if (preview && previewData) {
    return {
      props: {
        post: {
          title: previewData.title,
          content: previewData.content,
          date: new Date().toISOString() // Preview shows as "just now"
        }
      }
    }
  }
  
  // In static mode, fetch from database
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    return { notFound: true }
  }
  
  return {
    props: { post },
    // Enable ISR for production
    revalidate: 600
  }
}

export async function getStaticPaths() {
  return {
    paths: [], // We'll rely on preview data for now
    fallback: true // Show fallback and generate on demand
  }
}
```

## Example: Preview Mode with MicroCMS
1. Install MicroCMS JS SDK: `npm install @microcms/js-sdk`
2. Create a         `
3. Create `/lib/microcms.js`:
```jsx
import { createClient } from 'https://esm.sh/@microcms/js-sdk'

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
})
```

4. Create preview API route:
```jsx
import { client } from '@/lib/microcms'

export default function handler(req, res) {
  // Check for secret
  if (req.query.secret !== process.env.PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  // Check for ID
  if (!req.query.id) {
    return res.status(400).json({ message: 'Missing ID' })
  }

  // Enable Preview Mode
  res.setPreviewData({})

  // Fetch the draft content
  try {
    const content = await client.get({
      endpoint: 'blogs',
      contentId: req.query.id,
      queries: { previewDepth: 1, previewSecret: process.env.MICROCMS_PREVIEW_SECRET }
    })
    
    // Redirect to the blog post
    res.writeHead(307, { Location: `/blogs/${content.slug}` })
    res.end()
  } catch (error) {
    console.error('Preview error:', error)
    return res.status(404).json({ message: 'Content not found' })
  }
}
```

5. Create a blog post page:
```jsx
import { notFound } from 'next/navigation'
import { client } from '@/lib/microcms'

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

export async function getStaticProps({ params, previewData, preview }) {
  // Determine if we're in preview mode
  const isPreview = !!preview
  
  try {
    // In preview mode, fetch draft content
    // In production mode, fetch published content
    const post = await client.get({
      endpoint: 'blogs',
      contentId: params.slug,
      // Only use preview secret in preview mode
      queries: isPreview ? { 
        previewDepth: 1, 
        previewSecret: process.env.MICROCMS_PREVIEW_SECRET 
      } : {}
    })
    
    if (!post) {
      return { notFound: true }
    }
    
    return {
      props: { post },
      // Only enable revalidation in production mode
      ...(!isPreview && { revalidate: 600 })
    }
  } catch (error) {
    console.error('Error fetching post:', error)
    return { notFound: true }
  }
}

export async function getStaticPaths() {
  // Get all published blog posts for static generation
  try {
    const posts = await client.get({
      endpoint: 'blogs',
      queries: { limit: 1000 } // Adjust based on your needs
    })
    
    return {
      paths: posts.map(post => ({
        params: { slug: post.slug }
      })),
      fallback: false
    }
  } catch (error) {
    console.error('Error fetching posts for static generation:', error)
    return {
      paths: [],
      fallback: false
    }
  }
}
```

## Example: Preview Mode with Contentful
1. Install Contentful SDK: `npm install contentful`
2. Create `/lib/contentful.js`:
```jsx
import { createClient } from 'contentful'

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
})
```

3. Create preview API route:
```jsx
import { client } from '@/lib/contentful'

export default function handler(req, res) {
  // Check for secret
  if (req.query.secret !== process.env.PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  // Check for ID
  if (!req.query.id) {
    return res.status(400).json({ message: 'Missing ID' })
  }

  // Enable Preview Mode
  res.setPreviewData({})

  try {
    // Get the space
    const space = await client.getSpace()
    
    // Get the environment for preview
    const environment = await space.getEnvironment(
      process.env.CONTENTFUL_ENVIRONMENT || 'master'
    )
    
    // Get the draft content
    const entry = await environment.getEntry(req.query.id, {
      preview: true
    })
    
    // Redirect to the content page
    res.writeHead(307, { Location: `/posts/${entry.fields.slug}` })
    res.end()
  } catch (error) {
    console.error('Preview error:', error)
    return res.status(404).json({ message: 'Content not found' })
  }
}
```

4. Create a content page:
```jsx
import { notFound } from 'next/navigation'
import { client } from '@/lib/contentful'

export default function Post({ post }) {
  if (!post) {
    notFound();
  }
  
  return (
    <article>
      <h1>{post.title}</h1>
      <time>{post.date}</time>
      <div dangerouslySetInnerHTML={{ __html: post.body }} />
    </article>
  );
}

export async function getStaticProps({ params, previewData, preview }) {
  const isPreview = !!preview
  
  try {
    // Get the space
    const space = await client.getSpace()
    
    // Get the appropriate environment
    const environment = await space.getEnvironment(
      process.env.CONTENTFUL_ENVIRONMENT || 'master'
    )
    
    // Fetch content based on mode
    const entry = await environment.getEntry(params.slug, {
      preview: isPreview
    })
    
    if (!entry) {
      return { notFound: true }
    }
    
    return {
      props: {
        post: {
          title: entry.fields.title,
          date: entry.fields.date?.toISOString() || new Date().toISOString(),
          body: entry.fields.body || ''
        }
      }
    },
    # Enable revalidation only in production mode
    ...(!isPreview && { revalidate: 600 })
  }
  catch (error) {
    console.error('Error fetching post:', error)
    return { notFound: true }
  }
}

export async function getStaticPaths() {
  try {
    // Get the space
    const space = await client.getSpace()
    
    # Get the published environment
    const environment = await space.getEnvironment(
      process.env.CONTENTFUL_ENVIRONMENT || 'master'
    )
    
    # Get all published content
    const entries = await environment.getEntries({
      'content_type': 'blogPost',
      'limit': 1000
    })
    
    return {
      paths: entries.map(entry => ({
        params: { slug: entry.fields.slug }
      })),
      fallback: false
    }
  } catch (error) {
    console.error('Error fetching entries for static generation:', error)
    return {
      paths: [],
      fallback: false
    }
  }
}
```

## Production Example
In production, Preview Mode works as follows:
- **Activation**: 
  - User visits `/api/preview?secret=TOKEN&slug=POST-SLUG`
  - API route validates secret and sets preview cookies
  - User redirects to target page with preview cookies
- **Request Processing**:
  - Next.js detects preview cookies on incoming request
  - Bypasses static file serving (even if file exists)
  - Runs data fetching functions (`getStaticProps`/`getServerSideProps`)
  - In preview mode, treats SSG pages like SSR (runs on request)
  - Provides access to `preview` and `previewData` in context
- **Data Fetching**:
  - Functions can check `context.preview` to enable draft fetching
  - Can use `context.previewData` for directly passed preview data
  - Should disable `revalidate` in preview mode to always show latest
- **Response Delivery**:
  - Returns HTML with preview/unpublished content
  - Includes necessary JavaScript for hydration
  - Behaves identically to normal request for SSR pages
- **Duration**: 
  - Preview state lasts as long as cookies are present
  - Cookies typically expire after browser session ends
  - Can be manually cleared by visiting `/api/preview?secret=TOKEN`
- **Scaling**:
  - Preview mode increases server load (like SSR)
  - Consider rate limiting the preview API endpoint
  - Preview traffic is typically low compared to production
- **Security**:
  - Always validate the preview secret to prevent abuse
  - Consider using HTTP-only cookies for preview tokens
  - Limit preview data size to prevent cookie overflow
  - Log preview access for audit trail
- **Integration**: 
  - Works with any headless CMS (Contentful, Sanity, Prismic, etc.)
  - Can be used with REST APIs, GraphQL, or direct database query
  - Compatible with Incremental Static Regeneration (ISR)
  - Functions correctly with dynamic routes and catch-all routes

## Folder Structure Context
Preview Mode affects the entire application but requires specific files:
```
pages/
├── api/
│   └── preview.js            # Preview activation endpoint
├── posts/
│   └── [slug].js             # Page that supports preview mode
├── index.js                  # Can also support preview mode
└── about.js                  # Can also support preview mode
lib/
└── cms.js                    # CMS client with preview support
components/
└── PreviewButton.js          # Optional: UI component to trigger preview
public/
└── ...                       # Static assets (unaffected)
```

## Best Practices
1. **Secure the Preview Endpoint**:
   - Always validate a secret token to prevent abuse
   - Use environment variables for secrets (never hardcode)
   - Consider rate limiting to prevent denial of service
   - Use HTTPS in production to prevent token interception
2. **Handle Preview Data Properly**:
   - Check `context.preview` to detect preview mode
   - Use `context.previewData` for directly passed data
   - Disable `revalidate` in preview mode to show latest draft
   - Fall back to regular data fetching when not in preview
3. **Consistent User Experience**:
   - Preview mode should look identical to production
   - Same layouts, styles, and interactions
   - Only difference is the content being displayed
   - Consider adding a visual indicator (banner, badge) for preview
4. **Clear Exit Path**:
   - Provide way to exit preview mode (clear cookies)
   - Consider adding a "Return to production" link
   - Preview mode should not interfere with normal navigation
5. **Performance Considerations**:
   - Preview mode increases server load (use SSR-like performance)
   - Monitor preview usage to prevent unexpected load spikes
   - Consider caching preview responses briefly if appropriate
   - Remember preview is for authors, not end users
6. **Error Handling**:
   - Gracefully handle missing preview data
   - Provide meaningful error messages for invalid secrets
   - Log preview access for security and debugging
   - Consider fallback to published content on preview errors
7. **Content Flexibility**:
   - Design data fetching functions to handle both published and draft data
   - Consider versioning or status fields in your content model
   - Test preview mode with various content states (draft, scheduled, published)
8. **Testing**:
   - Test preview mode with various content types
   - Verify that cookies are properly set and cleared
   - Test edge cases (missing data, invalid secrets, etc.)
   - Ensure preview mode works with all routing patterns (dynamic, catch-all, etc.)

## Common Mistakes
1. **Missing Secret Validation**: Leads to open preview endpoint that anyone can abuse
2. **Forgetting to Set Cookies**: Using `res.setPreviewData()` incorrectly or forgetting it entirely
3. **Incorrect Redirect**: Redirecting to wrong URL after setting preview cookies
4. **Ignoring Preview Flag**: Not checking `context.preview` in data fetching functions
5. **Not Disabling Revalidation**: Forgetting to disable `revalidate` in preview mode
6. **Hardcoding Secrets**: Putting preview secrets in source code instead of environment variables
7. **Infinite Redirect Loops**: Misconfigured preview API causing redirect loops
8. **Cookie Domain Issues**: Preview cookies not being sent due to domain/path mismatches
9. **Overlooking SSR Pages**: Assuming preview mode only affects SSG pages (it affects all)
10. **Poor Error Handling**: Exposing stack traces or internal errors to users during preview

## Performance Notes
- **Preview Mode Activation**:
  - API request to set cookies: ~50-150ms
  - Redirect to target page: Additional network round trip
- **Preview Mode Request**:
  - Similar to SSR performance: 100-500ms+ TTFB
  - Includes data fetching and server-side rendering
  - No benefit from static file caching
  - Scales linearly with preview traffic
- **Regular User Impact**:
  - Zero effect on normal site visitors
  - Preview mode only active when cookies present
  - Production CDN caching unaffected
- **Resource Usage**:
  - Memory: Similar to SSR during preview requests
  - CPU: Similar to SSR during preview requests
  - Network: Standard HTML + JS delivery
- **Caching Considerations**:
  - Preview responses typically not cached (or cached very briefly)
  - Prevents showing stale preview content
  - Normal production caching remains unaffected
- **Scalability**:
  - Preview traffic typically << production traffic
  - Design preview system for expected author load, not user load
  - Consider separate preview infrastructure for high-author environments
  - Monitor and optimize preview-specific code paths

## Security Notes
- **Authentication**:
  - Preview secret acts as authentication token
  - Treat preview secret like any other API secret
  - Rotate preview secrets periodically
  - Consider using short-lived tokens for high-security environments
- **Authorization**:
  - Preview mode typically shows all accessible content
  - Consider implementing additional checks in preview mode
  - Preview access should align with CMS permissions
  - Preview of unpublished content should require appropriate permissions
- **Input Validation**:
  - Validate all preview parameters (secret, slug, id, etc.)
  - Sanitize redirect targets to prevent open redirect attacks
  - Validate preview data size to prevent cookie overflow attacks
  - Implement rate limiting on preview endpoint
- **Output Protection**:
  - Preview content should undergo same sanitization as published content
  - Apply same CSP headers to preview and production
  - Consider adding visual watermark to preview content (optional)
  - Ensure preview mode doesn't bypass security middleware
- **Data Protection**:
  - Same data protection rules apply in preview and production
  - Preview of sensitive data should require appropriate authorization
  - Consider masking sensitive data in preview (PII, payment info, etc.)
  - Audit preview access for compliance requirements
- **Session Security**:
  - Preview cookies should have appropriate security flags
  - Use Secure flag in production (HTTPS only)
  - Consider HttpOnly flag if no JS needs to read preview cookie
  - Set appropriate expiration times for preview cookies

## SEO Considerations
- **Preview Mode and SEO**:
  - Preview mode content is NOT indexed by search engines
  - Preview requests typically blocked by robots.txt or meta tags
  - Prevents duplicate content issues from draft versions
  - Ensures only published content appears in search results
- **Preventing Indexing**:
  - Next.js automatically sets appropriate headers to discourage indexing
  - Custom implementations should follow same pattern
  - Consider adding `X-Robots-Tag: noindex` to preview responses
  - Preview mode should not affect sitemap generation
- **Content Consistency**:
  - Published and previewed content should follow same SEO best practices
  - Meta tags, structured data, and heading structure should be consistent
  - Canonical URLs should point to published versions, not preview
- **Crawl Budget Protection**:
  - Prevents wasting search engine crawl budget on drafts
  - Ensures preview content doesn't appear in search results
  - Maintains clean separation between draft and published content
- **Transparency**:
  - Consider adding preview mode detection for debugging
  - Preview mode should not interfere with SEO tools
  - Clear documentation helps SEO specialists understand behavior
- **Edge Cases**:
  - Handle preview mode in custom servers or proxies correctly
  - Ensure preview cookies don't leak to unrelated subdomains
  - Consider preview mode in AMP or PWA implementations

## Interview Questions
1. What is Preview Mode in Next.js and what problem does it solve?
2. How do you enable Preview Mode in a Next.js application?
3. What cookies are used by Preview Mode and what do they do?
4. How does Preview Mode affect `getStaticProps` and `getServerSideProps`?
5. How do you create a preview API route in Next.js?
6. How do you pass preview data to pages in Preview Mode?
7. How do you disable Preview Mode or clear preview cookies?
8. What security considerations should you keep in mind when implementing Preview Mode?
9. How does Preview Mode affect SEO and search engine indexing?
10. What are the performance implications of using Preview Mode?

## MCQs
1. Which function is used to enable Preview Mode in an API route?
   a) `res.setPreview()`
   b) `res.setPreviewData()`
   c) `res.previewEnable()`
   d) `res.cookie('preview', true)`
   <details>
   <summary>Answer</b) `res.setPreviewData()`
   </details>

2. How do you access preview data in a page's data fetching function?
   a) `context.previewData`
   b) `context.data.preview`
   c) `context.preview.data`
   d) `context.getPreviewData()`
   <details>
   <summary>Answer</a) `context.previewData`
   </details>

3. How do you check if a request is in Preview Mode?
   a) `context.mode === 'preview'`
   b) `context.isPreview === true`
   c) `!!context.preview`
   d) `context.previewEnabled`
   <details>
   <summary>Answer</c) `!!context.preview`
   </details>

4. What should you do with the `revalidate` option in `getStaticProps` when using Preview Mode?
   a) Set it to 0
   b) Set it to false
   c) Omit it or set it to false in preview mode
   d) Keep it unchanged for consistency
   <details>
   <summary>Answer</c) Omit it or set it to false in preview mode
   </details>

5. Which of the following is TRUE about Preview Mode and SEO?
   a) Preview mode content is indexed by search engines
   b) Preview mode improves search engine rankings
   c) Preview mode content is typically blocked from indexing
   d) Preview mode requires special SEO configuration
   <details>
   <summary>Answer</c) Preview mode content is typically blocked from indexing
   </details>

## Practice Exercise
1. Create a new Next.js project called `preview-mode-exercise`
2. Set up a mock CMS using JSON files in `public/content/`:
   - Create published content in `public/content/published/`
   - Create draft content in `public/content/draft/`
3. Create a preview API route at `/api/preview` that:
   - Validates a secret token from environment variables
   - Sets preview cookies using `res.setPreviewData()`
   - Redirects to the requested content page
4. Create a blog post page at `/posts/[slug].js` that:
   - Uses `getStaticProps` to fetch content
   - Checks for preview mode using `context.preview`
   - Fetches from draft content when in preview mode
   - Fetches from published content when in production mode
   - Disables `revalidate` in preview mode
5. Create a way to enter preview mode from a mock admin interface:
   - Simple page with input for post slug and "Preview" button
   - Button redirects to `/api/preview?slug=...&secret=...`
6. Style the application using CSS Modules
7. Test preview mode by:
   - Viewing a post in normal mode (published content)
   - Entering preview mode for the same post
   - Verifying you see draft content instead of published
   - Exiting preview mode and verifying you see published content again
8. Verify that normal site visitors are unaffected by preview mode

## Mini Project
Build a blogging platform with Preview Mode integration:
1. Create a Next.js blog with:
   - Homepage showing list of recent posts
   - Individual post pages at `/posts/[slug]`
   - Admin interface for creating/editing posts
   - Integration with a headless CMS (use JSON files as mock CMS)
2. Implement Preview Mode:
   - Create `/api/preview` endpoint with secret validation
   - Modify `getStaticProps` in post page to handle preview mode
   - Add preview functionality to admin interface
   - Ensure preview shows draft/unpublished content
   - Ensure normal mode shows only published content
3. Add features to enhance the preview experience:
   - Visual indicator showing "PREVIEW MODE" when active
   - "Return to published version" link in preview mode
   - Preview of related content (tags, authors, etc.)
   - Preview of SEO meta tags and structured data
4. Implement proper security:
   - Environment variable for preview secret
   - Rate limiting on preview endpoint
   - Input validation for all parameters
   - Error handling without leaking internal details
5. Add content management features:
   - Create, edit, delete posts in admin interface
   - Publish/unpublish posts
   - Schedule posts for future publication
   - Upload and manage images/assets
6. Optimize for performance:
   - Efficient data fetching in both modes
   - Proper caching for published content
   - Minimize preview mode overhead
7. Test thoroughly:
   - Preview mode with various content states (draft, scheduled, published)
   - Normal mode behavior and SEO-friendliness
   - Transition between preview and normal modes
   - Error cases (invalid secrets, missing content, etc.)
8. Deploy to Vercel and test in production environment:
   - Verify preview mode works in production
   - Test with real headless CMS if possible (Contentful, Sanity, etc.)
   - Monitor for any issues or unexpected behavior
9. Gather feedback from content editors and iterate on the preview experience
10. Document the preview flow in a `PREVIEW.md` file for your team