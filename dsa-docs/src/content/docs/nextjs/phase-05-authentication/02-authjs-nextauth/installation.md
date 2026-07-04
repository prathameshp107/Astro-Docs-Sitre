---
title: "Installation"
description: "export default NextAuth({ / options / })"
---

# Installation

## Introduction
Setting up Auth.js in a Next.js project involves installing the package, configuring environment variables, and creating the API route handler.

## Why we need installation steps
Proper installation ensures all dependencies are correctly configured, environment variables are set, and the authentication endpoints are properly exposed.

## Problem statement
How do we integrate Auth.js into a Next.js project (both Pages and App router) while ensuring type safety and proper environment configuration?

## Real-world story
A developer spent hours debugging why authentication wasn't working only to realize they forgot to set the `NEXTAUTH_SECRET` environment variable in production.

## Real-world analogy
**Installation**: Like setting up a home security system - you need to install the hardware (package), configure the codes (environment variables), and connect it to the power (API routes).

## Visual explanation
```
Terminal: npm install next-auth
        ↓
Create .env.local with secrets
        ↓
Create /app/api/auth/[...nextauth]/route.ts
        ↓
Use auth() hook in components
```

## Mermaid Diagram 1: Installation Steps
```mermaid
flowchart LR
    A[Start] --> B[Install Package]
    B --> C[Create Environment File]
    C --> D[Set Required Variables]
    D --> E[Create API Route]
    E --> F[Configure Provider(s)]
    F --> G[Add Session Helper]
    G --> H[Use in Components]
    H --> I[End]
```

## Internal working
**What happens during installation**:
1. `next-auth` package provides React components, hooks, and API route handlers
2. Environment variables configure behavior (URL, secrets, provider keys)
3. The `[...nextauth]` route becomes a handler for all `/api/auth/*` paths
4. Client-side hooks (`useSession`, `signIn`, `signOut`) interact with the session
5. Server-side `auth()` function validates requests in API routes/getServerSideProps

## Step-by-step installation
### Step 1: Install the package
```bash
# Using npm
npm install next-auth

# Using yarn
yarn add next-auth

# Using pnpm
pnpm add next-auth
```

### Step 2: Create environment file
Create `.env.local` in project root:
```env
# Required for all instances
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-random-string-here

# Provider examples (get these from respective developer consoles)
GOOGLE_ID=your-google-client-id
GOOGLE_SECRET=your-google-client-secret
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
```

### Step 3: Generate a secure secret
```bash
# Using OpenSSL
openssl rand -base64 32

# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Using the Auth.js secret generator (online)
# Visit: https://generate-secret.vercel.app/32
```

### Step 4: Create the API route
**For Pages Router** (`pages/api/auth/[...nextauth].js`):
```javascript
import NextAuth from "next-auth"

export default NextAuth({
  /* options */
})
```

**For App Router** (`app/api/auth/[...nextauth]/route.ts`):
```typescript
import NextAuth from "next-auth"

export const { GET, POST } = NextAuth({
  /* options */
})
```

### Step 5: Add providers
In the NextAuth options object, add the providers you want to use:
```javascript
providers: [
  GoogleProvider({
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
  }),
  // ... more providers
]
```

### Step 6: Use in your application
**Client-side** (React components):
```tsx
import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session, status } = useSession()
  
  if (status === "loading") return <p>Loading...</p>
  
  return (
    <div>
      {session ? (
        <>
          <p>Signed in as {session.user.email}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <button onClick={() => signIn()}>Sign in</button>
      )}
    </div>
  )
}
```

**Server-side** (API routes, getServerSideService):
```typescript
import { auth } from "@/auth"

export async function GET(request: Request) {
  const session = await auth()
  
  if (!session) {
    return new Response("Unauthorized", { status: 401 })
  }
  
  // ... protected logic
}
```

## Folder structure after installation
```
your-project/
├── node_modules/
│   └── next-auth/
├── .env.local
├── pages/
│   └── api/
│       └── auth/
│           └── [...nextauth].js
├── app/
│   └── api/
│       └── auth/
│           └── [...nextauth]/
│               └── route.ts
├── components/
│   └── auth-related components
└── lib/
    └── auth.ts (optional helper)
```

## Best practices
- **Environment variables**: Use `.env.local` for development, platform-specific env vars for production (Vercel, Netlify, etc.)
- **Secret generation**: Use a sufficiently random string (32+ bytes) for `NEXTAUTH_SECRET`
- **URL configuration**: Set `NEXTAUTH_URL` to your production domain (include protocol)
- **TypeScript**: Create `types/next-auth.d.ts` for module augmentation if needed
- **File placement**: Put the API route in the correct location for your router (Pages vs App)
- **Provider order**: Order matters for the sign-in page (first displayed first)
- **Callbacks**: Keep callbacks pure and fast (no heavy computations)
- **Error handling**: Implement proper error pages for authentication failures

## Common mistakes
- Forgetting to restart the dev server after updating `.env.local`
- Using `NEXTAUTH_URL` without protocol (must be `http://` or `https://`)
- Setting `NEXTAUTH_SECRET` to a weak or short value
- Committing `.env.local` to version control (should be in `.gitignore`)
- Using different URLs in development vs production without conditional config
- Not handling the case where ` NEXTAUTH_URL` is behind a proxy
- Missing `api/` prefix in the route path
- Using the wrong file extension (`.ts` vs `.js`) for your router
- Forgetting to export the handler correctly in App router

## Security considerations
- **Secrets**: Never expose `NEXTAUTH_SECRET` in client-side code or logs
- **Environment**: Use different secrets for preview/deployments/staging/production
- **Headers**: When behind a proxy, configure `trustHost` option correctly
- **Cookies**: Ensure `Secure` flag is set in production (requires HTTPS)
- **CORS**: API routes automatically have appropriate CORS settings
- **Rate climbing**: Implement rate limiting on custom credentials provider
- **Dependencies**: Regularly run `npm audit` and update packages
- **Server actions**: If using React Server Components, be cautious with auth in server actions

## Performance notes
- **Bundle size**: `next-auth` adds ~50KB gzipped to your bundle (treeshakable)
- **Middleware impact**: Runs on every request; consider matcher to limit scope
- **Database queries**: Each authentication may trigger multiple DB queries
- **Token size**: JWTs can become large with many claims; monitor cookie size
- **Caching**: Session data is not cached by default; implement caching if needed
- **Edge runtime**: Works on Vercel Edge Functions with some limitations
- **Cold arms**: Minimal impact; initialization happens once per instance

## Interview questions
1. What are the two required environment variables for Auth.js?
2. Where should the Auth.js API route be placed in Pages vs App router?
3. How do you generate a secure secret for NEXTAUTH_SECRET?
4. What file should you add to `.gitignore` to protect environment variables?
5. How do you use Auth.js in a server component or route handler?
6. What's the difference between `getServerSession` and `useSession`?
7. How do you protect API routes with Auth.js?
8. Where do you configure Google OAuth credentials?
9. What happens if you forget to set NEXTAUTH_URL?
10. How do you customize the sign-in page?

## MCQs
1. Which command installs Auth.js?
   a) npm install next-auth
   b) yarn add nextjs-auth
   c) pnpm add authentication
   d) npm i authjs
   Answer: a

2. Where should the Auth.js API route be located for the Pages router?
   a) pages/api/auth/[...nextauth].js
   b) pages/auth/[...nextauth].api.js
   c) api/auth/[...nextauth].js
   d) src/pages/api/auth/[...nextauth].js
   Answer: a

3. Which environment variable is used to generate encryption keys?
   a) NEXTAUTH_URL
   b) NEXTAUTH_SECRET
   c) JWT_SECRET
   d) AUTH_SECRET
   Answer: b

4. What is the minimum recommended length for NEXTAUTH_SECRET?
   a) 16 characters
   b) 32 characters
   c) 64 characters
   d) 128 characters
   Answer: b (32 bytes = 64 hex characters)

5. How do you access the session in a server component?
   a) useSession()
   b) getSession()
   c) auth()
   d) getServerSession()
   Answer: d

## Practice exercise
1. Create a new Next.js app (if you don't have one)
2. Install next-auth
3. Create .env.local with NEXTAUTH_URL and NEXTAUTH_SECRET
4. Create the API route for authentication
5. Add a Credentials provider with dummy login
6. Use useSession hook in a component to display login/logout buttons
7. Protect an API route with the auth() function
8. Test the flow locally

## Debugging experience
"Error: Missing secret" when starting the dev server.
Check:
1. .env.local exists in project root
2. NEXTAUTH_SECRET is set to a non-empty string
3. No typos in variable name (NEXTAUTH_SECRET not NEXT_AUTH_SECRET)
4. Restarted dev server after editing .env.local
5. For Vercel: environment variables set in project settings
6. For Netlify: environment variables set in site settings
7. Using correct path for environment file (.env not .env.local in some frameworks)

## Real-world scenario
Setting up Auth.js in a monorepo:
- Shared UI library uses `useSession` hook
- API services use `auth()` middleware
- Different environments (dev/staging/prod) have separate .env files
- Docker-compose uses env_file for local development
- CI/CD pipeline injects secrets from vault (HashiCorp, AWS Secrets Manager)

## Mini project
Create an installation checklist CLI tool that:
- Validates Next.js project structure
- Checks for required dependencies
- Verifies environment variables exist
- Tests API route accessibility
- Provides a scorecard and recommendations
- Suggests fixes for common issues