---
title: "Deployment"
description: "Deployment is the process of taking your application from development to production — making it accessible to real users on the internet. It involves build"
---

# Section 19: Deployment

## 19.1 What Is Deployment?

Deployment is the process of **taking your application from development to production** — making it accessible to real users on the internet. It involves building, configuring, hosting, and maintaining your Next.js application on a server or cloud platform.

> **Simple analogy:** Writing code is like baking a cake. Deployment is delivering it to the customer's table — packaged, fresh, and ready to be enjoyed.

---

## 19.2 Why Deployment Matters

| Aspect | Description |
|--------|-------------|
| **Availability** | Makes the app accessible 24/7 globally |
| **Performance** | Production builds are optimized (minified, tree-shaken) |
| **Security** | Enforces HTTPS, environment variable isolation |
| **Scalability** | Real hosting can scale to millions of users |
| **Monitoring** | Production environments support error tracking and analytics |

---

## 19.3 Deployment Lifecycle

![19.3 Deployment Lifecycle diagram](/DSA-Notes-Problems/assets/nextjs/production-deployment-19-3-deployment-lifecycle.svg)

---

## 19.4 Production Build Commands

```bash
# Install dependencies
npm install

# Create an optimized production build
npm run build

# Start the production server (Node.js required)
npm run start

# Inspect build output sizes
npx next build --debug
```

The `npm run build` command:
1. Compiles TypeScript
2. Bundles and minifies JavaScript
3. Optimizes images
4. Generates static pages where possible
5. Creates the `.next` directory with all output

---

## 19.5 Deployment Option: Vercel (Recommended)

Vercel is the company behind Next.js and offers **zero-config deployment**.

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from project root
vercel

# Deploy to production
vercel --prod
```

**Automatic features on Vercel:**
- Edge Network (CDN) globally
- Automatic HTTPS via Let's Encrypt
- Preview deployments on every PR
- Environment variable management
- Serverless Functions for API routes
- Image optimization via `next/image`

| Feature | Vercel Free | Vercel Pro |
|---------|-------------|------------|
| Deployments | Unlimited | Unlimited |
| Bandwidth | 100 GB/mo | 1 TB/mo |
| Serverless Functions | 100 GB-hrs | 1000 GB-hrs |
| Custom Domains | Unlimited | Unlimited |
| Team Collaboration | 1 member | Unlimited |

---

## 19.6 Deployment Option: Docker

Docker packages your app into a **portable container** that runs the same on any server.

```dockerfile
# Dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./certs:/etc/nginx/certs
    depends_on:
      - web
```

> ⚠️ Enable `output: 'standalone'` in `next.config.js` for minimal Docker images:
> ```js
> // next.config.js
> module.exports = { output: 'standalone' }
> ```

---

## 19.7 Deployment Option: AWS

```bash
# Using AWS Amplify
npm install -g @aws-amplify/cli
amplify init
amplify add hosting
amplify publish

# Using AWS EC2 (manual VPS approach)
ssh ubuntu@your-ec2-ip

# On server:
sudo apt update && sudo apt install -y nodejs npm nginx
git clone your-repo && cd your-repo
npm ci && npm run build
pm2 start npm --name "nextjs" -- start
pm2 save && pm2 startup
```

---

## 19.8 Deployment Option: VPS Server

A VPS (Virtual Private Server) gives you full control. Use **PM2** to keep Next.js running.

```bash
# Install PM2 process manager
npm install -g pm2

# Start Next.js with PM2
pm2 start npm --name "nextjs-app" -- start

# Save PM2 process list
pm2 save

# Generate startup script (survives reboots)
pm2 startup

# Monitor logs
pm2 logs nextjs-app
pm2 monit
```

---

## 19.9 Deployment Architecture Diagram

![19.9 Deployment Architecture Diagram diagram](/DSA-Notes-Problems/assets/nextjs/production-deployment-19-9-deployment-architecture-diagram-2.svg)

---

## 19.10 Environment Variables

```bash
# .env.local (never commit to git)
DATABASE_URL=postgresql://user:pass@localhost:5432/mydb
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_KEY=pk_test_...

# .env.production
NEXTAUTH_URL=https://yourdomain.com
```

| Variable Prefix | Exposed to Browser? | Use For |
|-----------------|---------------------|---------|
| `NEXT_PUBLIC_` | ✅ Yes | Public keys, feature flags |
| No prefix | ❌ No | DB URLs, secrets, API keys |

```tsx
// Accessing env vars
const dbUrl = process.env.DATABASE_URL;        // Server only
const stripeKey = process.env.NEXT_PUBLIC_STRIPE_KEY; // Client + Server
```

---

## 19.11 CI/CD Workflow

![19.11 CI/CD Workflow diagram](/DSA-Notes-Problems/assets/nextjs/production-deployment-19-11-ci-cd-workflow-3.svg)

**GitHub Actions example:**

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npx tsc --noEmit

      - name: Lint
        run: npm run lint

      - name: Run tests
        run: npm test -- --ci

      - name: Build
        run: npm run build
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 19.12 Domain, SSL & Monitoring

### Domain Configuration
1. Buy domain from Namecheap, Cloudflare, or GoDaddy
2. Add DNS A record pointing to your server IP
3. Add CNAME for `www` pointing to root domain
4. In Vercel: Settings → Domains → Add custom domain

### SSL (HTTPS)
- **Vercel:** Automatic, powered by Let's Encrypt
- **Self-hosted:** Use Certbot: `sudo certbot --nginx -d yourdomain.com`

### Monitoring Basics
```bash
# Check application health
curl https://yourdomain.com/api/health

# View PM2 logs
pm2 logs --lines 100

# Monitor resources
pm2 monit
```

```tsx
// app/api/health/route.ts
export async function GET() {
  return Response.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
}
```

---

## 19.13 Deployment Comparison Table

| Platform | Ease | Cost | Scalability | Control | Best For |
|----------|------|------|-------------|---------|---------|
| **Vercel** | ⭐⭐⭐⭐⭐ | Free → $20/mo | Auto | Low | Startups, MVP |
| **Docker + VPS** | ⭐⭐⭐ | $5–$20/mo | Manual | High | Full control |
| **AWS Amplify** | ⭐⭐⭐⭐ | Pay-per-use | Auto | Medium | AWS ecosystem |
| **Railway** | ⭐⭐⭐⭐ | $5/mo | Auto | Medium | Simplicity |
| **DigitalOcean** | ⭐⭐⭐ | $12/mo | Manual | High | VPS experience |

---

## 19.14 Best Practices for Deployment

- ✅ Use separate `.env.local`, `.env.staging`, `.env.production` files
- ✅ Never commit secrets — use CI/CD secret management
- ✅ Enable `output: 'standalone'` for Docker to minimize image size
- ✅ Run `npm ci` (not `npm install`) in CI for deterministic builds
- ✅ Set up health check endpoints for load balancers
- ✅ Use a CDN in front of your server for static assets
- ✅ Enable HTTP → HTTPS redirect
- ✅ Set `NEXT_TELEMETRY_DISABLED=1` in Docker for privacy

---

## 19.15 Common Mistakes

| Mistake | Problem | Fix |
|---------|---------|-----|
| Committing `.env` files | Secret exposure | Add to `.gitignore` |
| Using `npm install` in Docker | Non-deterministic deps | Use `npm ci` |
| Missing `NEXTAUTH_URL` in prod | Auth breaks | Set all required env vars |
| No process manager | App dies on crash | Use PM2 or systemd |
| Forgetting `output: 'standalone'` | Huge Docker images | Set in `next.config.js` |
| HTTP in production | Insecure | Always enforce HTTPS |

---

## 19.16 Interview Questions — Deployment

**Beginner:**
1. What is the difference between `npm run build` and `npm run start`?
2. What is the `.next` directory and what does it contain?
3. How do you set environment variables in Next.js?

**Intermediate:**
4. What does `output: 'standalone'` do in `next.config.js`?
5. How would you set up a CI/CD pipeline for a Next.js project?
6. What is the purpose of a load balancer in a deployment?

**Advanced:**
7. How would you deploy Next.js to a multi-region setup for global performance?
8. What strategies would you use to achieve zero-downtime deployments?
9. How do you handle database migrations in a CI/CD pipeline?

---
