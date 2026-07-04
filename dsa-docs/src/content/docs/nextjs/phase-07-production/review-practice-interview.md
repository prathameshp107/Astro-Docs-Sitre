# Review, Practice & Interview Prep

## Phase Summary

Phase 7 covered production-deploying and maintaining Next.js applications:

**Deployment**: Vercel (automatic, preview deployments), self-hosting (Docker, Nginx), environment variables, and a deployment checklist.

**Production Build**: Build process, bundle analysis with `@next/bundle-analyzer`, static assets, and production best practices.

**Monitoring**: Logging with structured logs, error monitoring with Sentry, analytics with Google Analytics, and performance monitoring (Core Web Vitals).

**Testing**: Unit tests (Vitest, Testing Library), integration tests for API routes and Server Actions, E2E tests with Playwright, and testing best practices.

**Maintenance**: Updating dependencies safely, upgrading Next.js, applying security updates, and a maintenance checklist.

## Practice Tasks

### Deployment
1. Deploy a Next.js app to Vercel from a GitHub repository
2. Set up a custom domain with automatic SSL
3. Create a `vercel.json` with custom region settings
4. Configure environment variables for development, preview, and production

### Production Build
1. Run `ANALYZE=true npm run build` and identify the largest dependencies
2. Replace a large library (e.g., Moment.js) with a tree-shakeable alternative
3. Enable `output: 'standalone'` and compare the output size

### Monitoring
1. Set up Sentry error monitoring on both client and server
2. Configure structured logging in a Server Action
3. Track a custom event (button click, form submission) with analytics

### Testing
1. Write a unit test for a utility function
2. Write an integration test for an API route
3. Write an E2E test for the login flow with Playwright

### Maintenance
1. Run `npm audit` and fix vulnerabilities
2. Check for outdated dependencies with `npm outdated`
3. Set up Dependabot for automated security updates

## Common Interview Questions

**Q: How do you deploy a Next.js app to production?**
A: The recommended way is Vercel — connect your Git repository, and deployment is automatic. For self-hosting, use `output: 'standalone'` and run `next start` behind a reverse proxy like Nginx.

**Q: What's the difference between static and dynamic rendering?**
A: Static rendering generates HTML at build time (faster, cached). Dynamic rendering generates HTML on each request (slower but always fresh). Next.js automatically chooses based on the features used in each page.

**Q: How do you monitor errors in a Next.js production app?**
A: Use Sentry (`@sentry/nextjs`) for both client and server error monitoring. Configure API route logging with structured logs. Use Vercel Analytics or Google Analytics for performance monitoring.

**Q: How do you write tests for Next.js?**
A: Use Vitest with Testing Library for unit and integration tests. Use Playwright for E2E tests. Test API routes, Server Actions, and components. Run tests in CI on every commit.

**Q: How do you handle environment variables in production?**
A: Set them in your deployment platform's dashboard (Vercel, Docker). Use `.env.local` for local development (not committed). Never commit secrets to version control. Use `NEXT_PUBLIC_` prefix for client-accessible variables.

**Q: What is the deployment checklist before going live?**
A: Verify the build succeeds, all environment variables are set, security headers are configured, error monitoring is active, SSL is enabled, and there's a rollback plan.

## Related Topics

- [Phase 6: Performance & SEO](../phase-06-performance-seo/)
- [Deployment Module](./deployment/)
- [Production Build Module](./production-build/)
- [Monitoring Module](./monitoring/)
- [Testing Module](./testing/)
- [Maintenance Module](./maintenance/)
