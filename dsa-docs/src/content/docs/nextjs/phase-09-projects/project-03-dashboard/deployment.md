---
title: "Deployment"
description: "Deploy your dashboard with authentication and database."
---

# Deployment

## Introduction

Deploying a dashboard is more involved than a static site. You need a database, environment variables for auth, and proper session configuration.

## Database Setup

```bash
# 1. Push schema to production database
npx prisma migrate deploy

# 2. (Optional) If using Vercel Postgres
# Create database in Vercel dashboard, then
npx prisma db push
```

## Environment Variables

Add these to your Vercel project:

```
AUTH_SECRET=your_generated_secret
AUTH_URL=https://yourdomain.com
GOOGLE_CLIENT_ID=your_google_id
GOOGLE_CLIENT_SECRET=your_google_secret
DATABASE_URL=your_production_db_url
```

Generate `AUTH_SECRET`:

```bash
npx auth secret
```

## Auth Configuration

For Google OAuth to work in production, add the callback URL to your Google Cloud Console:

```
https://yourdomain.com/api/auth/callback/google
```

## Deployment Checklist

- [ ] Database migrations have run
- [ ] Environment variables are configured
- [ ] Google OAuth callback URL is updated
- [ ] Session cookies use Secure flag in production
- [ ] Protected routes redirect to login when unauthenticated
- [ ] API routes check for authentication
- [ ] Loading states work correctly
- [ ] Charts render with real data

## Summary

Deploying an authenticated dashboard requires database setup, environment variables, and OAuth configuration. Run migrations, configure auth callbacks, and test the full login flow after deployment.
