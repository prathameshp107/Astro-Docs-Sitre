---
title: "Review, Practice & Interview"
description: "Practice exercises and interview questions for Enterprise Architecture & Best Practices."
---

# Review, Practice & Interview

## Phase Summary

This phase covered how to organize, scale, and maintain Next.js applications at an enterprise level. Here's what you learned:

| Module | Key Takeaways |
|--------|---------------|
| **Project Structure** | Feature-based architecture, shared components, reusable hooks, naming conventions |
| **Code Organization** | Separating concerns, reusable utilities, API layer, environment management |
| **Scalable Applications** | Project scaling, module organization, code splitting, lazy loading |
| **Security Best Practices** | Protecting environment variables, API security, auth best practices, common mistakes |
| **Maintainability** | Clean code, documentation, code review, refactoring |

## Practice Tasks

### Task 1: Organize a Project Structure

Given a Next.js project with the following files, reorganize them into a feature-based structure:

```
Current: 
  pages/
    login.tsx
    dashboard.tsx
    settings.tsx
  components/
    Header.tsx
    LoginForm.tsx
    DashboardChart.tsx
    SettingsForm.tsx
  utils/
    auth.ts
    api.ts
```

Create the new folder structure using `src/` directory and feature-based organization.

### Task 2: Improve Code Quality

```tsx
// Refactor this component
export default function Page({ d }: { d: any }) {
  const [s, ss] = useState(false)
  const [u, su] = useState<any[]>([])
  
  useEffect(() => {
    fetch('/api/data').then(r => r.json()).then(d => {
      su(d)
      ss(true)
    })
  }, [])
  
  if (!s) return <div>loading</div>
  
  return <div>{u.map(i => <div key={i.id}>{i.n}</div>)}</div>
}
```

- Rename variables to be meaningful
- Add proper TypeScript types
- Extract data fetching to a server component where possible

### Task 3: Add Security

Take a simple API route handler and add:
- Input validation with Zod
- Authentication check
- Authorization check (user can only access their own data)

### Task 4: Documentation Audit

Review a project and identify what documentation is missing:

- README
- Setup guide
- Component documentation for shared components
- Environment variable documentation

## Interview Questions

### Beginner

1. **What is the difference between Server Components and Client Components in Next.js?**

   Server Components run on the server and can access databases and file systems directly. Client Components run in the browser and can use hooks and browser APIs. By default, all components in the App Router are Server Components. Use `'use client'` when you need interactivity.

2. **How do you organize a Next.js project?**

   A well-organized Next.js project uses the `app/` directory for routes, feature-based folders, shared components in `components/`, utility functions in `lib/`, and types in `types/`. Configuration files stay at the root level.

3. **What is a feature-based architecture?**

   Feature-based architecture organizes code by feature rather than by type. Instead of having a `components/` folder with all components, you group files by feature — `app/products/`, `app/users/`, etc. Each feature folder contains the components, hooks, and utilities relevant to that feature.

### Intermediate

4. **Explain how you would handle authorization in a Next.js application.**

   Authorization is handled at multiple levels:
   - **Middleware**: Check user roles and redirect unauthorized users
   - **API routes**: Verify permissions before processing requests
   - **Server Components**: Conditionally render content based on user role
   - **Client Components**: Hide/show UI elements based on permissions

5. **How do you prevent sensitive data from being exposed in Client Components?**

   - Never import environment variables without `NEXT_PUBLIC_` prefix into client code
   - Use Server Components to fetch and filter data before passing to Client Components
   - Avoid placing API keys or tokens in client-side code
   - Use the `session` object to pass only necessary user data to the client

6. **What strategies would you use to scale a Next.js application?**

   - Use code splitting with dynamic imports
   - Implement lazy loading for routes and heavy components
   - Extract reusable logic into shared modules
   - Use incremental static regeneration (ISR) for content pages
   - Monitor bundle size with bundle analyzer
   - Consider micro-frontends for very large applications

### Advanced

7. **How would you design a shared component library for a large Next.js project?**

   - Create a separate package (monorepo with Turborepo or Nx)
   - Use a component documentation tool (Storybook)
   - Follow consistent prop naming and API design
   - Support server and client component usage
   - Version the package independently
   - Include TypeScript types and tests with every component

8. **What considerations would you make for a multi-team Next.js project?**

   - Establish clear code ownership through CODEOWNERS file
   - Define shared conventions and document them
   - Use feature flags to decouple deployments
   - Implement comprehensive testing and CI/CD
   - Create shared libraries for common functionality
   - Regularly review and improve the architecture

9. **How do you manage environment variables across multiple environments (dev, staging, production)?**

   - Use `.env.local` for local development (git-ignored)
   - Use `.env.development`, `.env.staging`, `.env.production` for different environments
   - Vercel provides environment variable management per project and per branch
   - Document required variables in `.env.example`
   - Validate environment variables at startup with Zod

10. **Explain your strategy for maintaining a large Next.js codebase over time.**

    - Regular dependency updates (automated with tools like Renovate or Dependabot)
    - Incremental refactoring during feature work
    - Quarterly architecture reviews
    - Clear deprecation policy for old patterns
    - Automated testing to prevent regressions
    - Documentation updates as part of every PR

## Next Steps

After mastering enterprise architecture, you're ready to build and maintain production-grade Next.js applications. Continue to:

- Apply these patterns in real projects
- Contribute to open-source Next.js projects
- Explore advanced topics like monorepos (Turborepo) and micro-frontends (Module Federation)
- Consider learning about infrastructure and DevOps for larger deployments

## Related Topics

- [Phase 5 — Authentication & Authorization](../phase-05-authentication/)
- [Phase 6 — Performance & SEO](../phase-06-performance-seo/)
- [Phase 7 — Production & Deployment](../phase-07-production/)
