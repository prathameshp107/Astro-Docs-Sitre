---
title: "Deployment Checklist"
description: "Before deploying your Next.js application to production, verify these items. This checklist helps prevent common deployment issues."
---

# Deployment Checklist

## Introduction

Before deploying your Next.js application to production, verify these items. This checklist helps prevent common deployment issues.

## Pre-Deployment Checklist

### Build
- [ ] `npm run build` completes without errors
- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] No lint warnings (`npm run lint`)
- [ ] Bundle size is within acceptable limits

### Environment Variables
- [ ] All required environment variables are set on the deployment platform
- [ ] Secrets are not committed to version control
- [ ] `NEXT_PUBLIC_` prefix is used correctly for client variables
- [ ] Production database URL is configured

### Security
- [ ] HTTPS is enforced (automatic on Vercel)
- [ ] Security headers are configured
- [ ] Authentication secrets are strong and unique
- [ ] API routes are protected where needed

### Performance
- [ ] Images use `next/image` with proper dimensions
- [ ] Fonts use `next/font` (no external font requests)
- [ ] Analytics scripts use `next/script` with `afterInteractive`
- [ ] Critical pages have been tested with Lighthouse

### SEO
- [ ] Metadata is set on all pages
- [ ] `robots.txt` is configured
- [ ] Sitemap is generated
- [ ] Canonical URLs are set

## Post-Deployment Checklist

- [ ] App loads successfully at the production URL
- [ ] Login/authentication flow works end-to-end
- [ ] API routes return correct responses
- [ ] Database connections are working
- [ ] Environment variables are accessible
- [ ] Custom domain works with SSL
- [ ] Analytics are receiving data
- [ ] Error monitoring is active

## Rollback Plan

Before deploying, know how to roll back:

**Vercel:** Go to Deployments → click the three dots on a previous deployment → "Promote to Production"

**Self-hosted:** Keep the previous Docker image tagged and ready:

```bash
docker pull myapp:previous-tag
docker stop myapp
docker run -d --name myapp-rollback myapp:previous-tag
```

## Common Mistakes

- **Deploying on a Friday afternoon** — If something breaks, you'll be debugging over the weekend.
- **Not testing the production build locally** — Run `npm run build && npm start` locally before deploying.
- **Missing runtime environment variables** — Build may succeed but the app crashes on first request.

## Summary

Use the deployment checklist before and after every deployment. Test the production build locally, verify all environment variables are set, and have a rollback plan ready. Monitor the app closely after deployment.

## Related Topics

- [Vercel Deployment](./vercel-deployment.md)
- [Environment Variables](./environment-variables.md)
- [Monitoring Module](../monitoring/)
