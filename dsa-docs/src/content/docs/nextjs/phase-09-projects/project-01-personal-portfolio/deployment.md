---
title: "Deployment"
description: "Deploy your portfolio to Vercel and set up a custom domain."
---

# Deployment

## Introduction

Your portfolio is ready — now it's time to put it on the internet. Vercel is the simplest deployment option for Next.js and offers a generous free tier perfect for portfolio sites.

## Deploying to Vercel

### Option 1: Vercel CLI (Quickest)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from your project folder
vercel

# Follow the prompts to link your project
# Deploy to production when ready
vercel --prod
```

### Option 2: GitHub Integration (Recommended)

1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign up with GitHub
3. Click **Add New → Project**
4. Import your portfolio repository
5. Vercel auto-detects Next.js — click **Deploy**
6. Every push to `main` automatically deploys

## Environment Variables

If you use any API keys (e.g., for email), add them in Vercel:

```
Dashboard → Project → Settings → Environment Variables
```

Add variables like `RESEND_API_KEY` or `CONTACT_EMAIL` here — never commit them to your repo.

## Custom Domain

1. Buy a domain (Namecheap, Google Domains, or Cloudflare)
2. In Vercel: Project → Settings → Domains → Add
3. Update your domain's DNS settings:
   - Add a CNAME record pointing `www` to `cname.vercel-dns.com`
   - Add a redirect from `yourdomain.com` to `www.yourdomain.com`

Vercel handles SSL certificates automatically.

## Post-Deployment Checklist

- [ ] All pages load without errors
- [ ] Images display correctly
- [ ] Contact form works and delivers messages
- [ ] Mobile layout looks good
- [ ] Custom domain redirects to HTTPS
- [ ] SEO metadata is set (title, description)
- [ ] Analytics is working (if configured)
- [ ] Social preview cards render correctly

## Common Mistakes

- **Committing `.env.local`** — Add it to `.gitignore`
- **Forgetting `not-found.tsx`** — Users who visit broken links see a generic error
- **Not testing the build locally** — Run `npm run build` before deploying
- **Hardcoding URLs** — Use relative paths or environment variables

## Summary

Deploy to Vercel via GitHub integration for automatic deployments. Add a custom domain for a professional touch. Always test your build locally before deploying.

## Related Topics

- [Building Pages](./building-pages)
- [Improvements](./improvements)
- [Phase 7 — Deployment](../../phase-07-production/deployment/)
