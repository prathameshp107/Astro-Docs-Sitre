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

```txt
<svg viewBox="0 0 740 130" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, sans-serif">
  <rect width="740" height="130" rx="12" fill="#0f172a"/>
  <text x="370" y="24" text-anchor="middle" fill="#f1f5f9" font-size="14" font-weight="700">Next.js Deployment Lifecycle</text>

  <!-- Stages -->
  <!-- 1 -->
  <rect x="20" y="45" width="100" height="55" rx="8" fill="#1e40af"/>
  <text x="70" y="66" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">Code</text>
  <text x="70" y="82" text-anchor="middle" fill="#93c5fd" font-size="10">Write &amp;</text>
  <text x="70" y="96" text-anchor="middle" fill="#93c5fd" font-size="10">Commit</text>

  <line x1="120" y1="72" x2="155" y2="72" stroke="#475569" stroke-width="2" marker-end="url(#dp1)"/>

  <!-- 2 -->
  <rect x="155" y="45" width="100" height="55" rx="8" fill="#1e40af"/>
  <text x="205" y="66" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">CI/CD</text>
  <text x="205" y="82" text-anchor="middle" fill="#93c5fd" font-size="10">Test &amp;</text>
  <text x="205" y="96" text-anchor="middle" fill="#93c5fd" font-size="10">Lint</text>

  <line x1="255" y1="72" x2="290" y2="72" stroke="#475569" stroke-width="2" marker-end="url(#dp1)"/>

  <!-- 3 -->
  <rect x="290" y="45" width="100" height="55" rx="8" fill="#1e40af"/>
  <text x="340" y="66" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">Build</text>
  <text x="340" y="82" text-anchor="middle" fill="#93c5fd" font-size="10">next build</text>
  <text x="340" y="96" text-anchor="middle" fill="#93c5fd" font-size="10">Optimize</text>

  <line x1="390" y1="72" x2="425" y2="72" stroke="#475569" stroke-width="2" marker-end="url(#dp1)"/>

  <!-- 4 -->
  <rect x="425" y="45" width="100" height="55" rx="8" fill="#1e40af"/>
  <text x="475" y="66" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">Deploy</text>
  <text x="475" y="82" text-anchor="middle" fill="#93c5fd" font-size="10">Push to</text>
  <text x="475" y="96" text-anchor="middle" fill="#93c5fd" font-size="10">Host</text>

  <line x1="525" y1="72" x2="560" y2="72" stroke="#475569" stroke-width="2" marker-end="url(#dp1)"/>

  <!-- 5 -->
  <rect x="560" y="45" width="100" height="55" rx="8" fill="#065f46"/>
  <text x="610" y="66" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="600">Monitor</text>
  <text x="610" y="82" text-anchor="middle" fill="#34d399" font-size="10">Logs &amp;</text>
  <text x="610" y="96" text-anchor="middle" fill="#34d399" font-size="10">Alerts</text>

  <!-- Feedback loop -->
  <path d="M610 100 Q610 118 370 118 Q130 118 70 100" stroke="#a78bfa" stroke-width="1.5" fill="none" stroke-dasharray="4,3" marker-end="url(#dp2)"/>

  <defs>
    <marker id="dp1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#475569"/>
    </marker>
    <marker id="dp2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#a78bfa"/>
    </marker>
  </defs>
</svg>
```

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

```txt
<svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, sans-serif">
  <rect width="700" height="400" rx="14" fill="#0f172a"/>
  <text x="350" y="28" text-anchor="middle" fill="#f1f5f9" font-size="15" font-weight="700">Next.js Production Deployment Architecture</text>

  <!-- Internet / User -->
  <rect x="280" y="50" width="140" height="44" rx="8" fill="#1e3a5f"/>
  <text x="350" y="68" text-anchor="middle" fill="#bfdbfe" font-size="12" font-weight="600">🌐 User Browser</text>
  <text x="350" y="85" text-anchor="middle" fill="#93c5fd" font-size="10">Internet</text>

  <line x1="350" y1="94" x2="350" y2="120" stroke="#475569" stroke-width="2" marker-end="url(#dp3)"/>

  <!-- CDN Layer -->
  <rect x="180" y="120" width="340" height="44" rx="8" fill="#065f46"/>
  <text x="350" y="138" text-anchor="middle" fill="#6ee7b7" font-size="12" font-weight="600">☁️ CDN / Edge Network</text>
  <text x="350" y="155" text-anchor="middle" fill="#34d399" font-size="10">Static assets · Caching · SSL termination</text>

  <line x1="350" y1="164" x2="350" y2="190" stroke="#475569" stroke-width="2" marker-end="url(#dp3)"/>

  <!-- Load Balancer -->
  <rect x="230" y="190" width="240" height="44" rx="8" fill="#1e40af"/>
  <text x="350" y="208" text-anchor="middle" fill="#bfdbfe" font-size="12" font-weight="600">⚖️ Load Balancer</text>
  <text x="350" y="225" text-anchor="middle" fill="#93c5fd" font-size="10">Nginx · Route traffic</text>

  <!-- Distribute to instances -->
  <line x1="280" y1="234" x2="160" y2="265" stroke="#475569" stroke-width="1.5" marker-end="url(#dp3)"/>
  <line x1="350" y1="234" x2="350" y2="265" stroke="#475569" stroke-width="1.5" marker-end="url(#dp3)"/>
  <line x1="420" y1="234" x2="540" y2="265" stroke="#475569" stroke-width="1.5" marker-end="url(#dp3)"/>

  <!-- App instances -->
  <rect x="80" y="265" width="140" height="50" rx="8" fill="#1e3a5f"/>
  <text x="150" y="285" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">Next.js Instance 1</text>
  <text x="150" y="301" text-anchor="middle" fill="#93c5fd" font-size="10">Port 3000</text>

  <rect x="270" y="265" width="160" height="50" rx="8" fill="#1e3a5f"/>
  <text x="350" y="285" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">Next.js Instance 2</text>
  <text x="350" y="301" text-anchor="middle" fill="#93c5fd" font-size="10">Port 3001</text>

  <rect x="480" y="265" width="140" height="50" rx="8" fill="#1e3a5f"/>
  <text x="550" y="285" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">Next.js Instance 3</text>
  <text x="550" y="301" text-anchor="middle" fill="#93c5fd" font-size="10">Port 3002</text>

  <!-- Database layer -->
  <line x1="350" y1="315" x2="350" y2="345" stroke="#475569" stroke-width="1.5" marker-end="url(#dp3)"/>
  <rect x="180" y="345" width="140" height="40" rx="8" fill="#312e81"/>
  <text x="250" y="361" text-anchor="middle" fill="#c4b5fd" font-size="11" font-weight="600">🗄️ Database</text>
  <text x="250" y="377" text-anchor="middle" fill="#a78bfa" font-size="10">PostgreSQL / MongoDB</text>

  <rect x="380" y="345" width="140" height="40" rx="8" fill="#312e81"/>
  <text x="450" y="361" text-anchor="middle" fill="#c4b5fd" font-size="11" font-weight="600">⚡ Redis Cache</text>
  <text x="450" y="377" text-anchor="middle" fill="#a78bfa" font-size="10">Session / Cache</text>

  <defs>
    <marker id="dp3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#475569"/>
    </marker>
  </defs>
</svg>
```

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

```txt
<svg viewBox="0 0 720 200" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, sans-serif">
  <rect width="720" height="200" rx="12" fill="#0f172a"/>
  <text x="360" y="26" text-anchor="middle" fill="#f1f5f9" font-size="14" font-weight="700">CI/CD Pipeline (GitHub Actions)</text>

  <!-- Steps -->
  <rect x="20" y="50" width="90" height="90" rx="8" fill="#1e40af"/>
  <text x="65" y="88" text-anchor="middle" fill="#bfdbfe" font-size="22">📝</text>
  <text x="65" y="110" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">Push Code</text>
  <text x="65" y="126" text-anchor="middle" fill="#93c5fd" font-size="9">git push</text>

  <line x1="110" y1="95" x2="135" y2="95" stroke="#475569" stroke-width="2" marker-end="url(#ci1)"/>

  <rect x="135" y="50" width="90" height="90" rx="8" fill="#1e40af"/>
  <text x="180" y="88" text-anchor="middle" fill="#bfdbfe" font-size="22">🔍</text>
  <text x="180" y="110" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">Lint &amp; Type</text>
  <text x="180" y="126" text-anchor="middle" fill="#93c5fd" font-size="9">ESLint + tsc</text>

  <line x1="225" y1="95" x2="250" y2="95" stroke="#475569" stroke-width="2" marker-end="url(#ci1)"/>

  <rect x="250" y="50" width="90" height="90" rx="8" fill="#1e40af"/>
  <text x="295" y="88" text-anchor="middle" fill="#bfdbfe" font-size="22">🧪</text>
  <text x="295" y="110" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">Run Tests</text>
  <text x="295" y="126" text-anchor="middle" fill="#93c5fd" font-size="9">Jest + Playwright</text>

  <line x1="340" y1="95" x2="365" y2="95" stroke="#475569" stroke-width="2" marker-end="url(#ci1)"/>

  <rect x="365" y="50" width="90" height="90" rx="8" fill="#1e40af"/>
  <text x="410" y="88" text-anchor="middle" fill="#bfdbfe" font-size="22">🏗️</text>
  <text x="410" y="110" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">Build</text>
  <text x="410" y="126" text-anchor="middle" fill="#93c5fd" font-size="9">next build</text>

  <line x1="455" y1="95" x2="480" y2="95" stroke="#475569" stroke-width="2" marker-end="url(#ci1)"/>

  <rect x="480" y="50" width="90" height="90" rx="8" fill="#1e40af"/>
  <text x="525" y="88" text-anchor="middle" fill="#bfdbfe" font-size="22">🚀</text>
  <text x="525" y="110" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">Deploy</text>
  <text x="525" y="126" text-anchor="middle" fill="#93c5fd" font-size="9">Vercel / AWS</text>

  <line x1="570" y1="95" x2="595" y2="95" stroke="#475569" stroke-width="2" marker-end="url(#ci1)"/>

  <rect x="595" y="50" width="100" height="90" rx="8" fill="#065f46"/>
  <text x="645" y="88" text-anchor="middle" fill="#6ee7b7" font-size="22">✅</text>
  <text x="645" y="110" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="600">Live!</text>
  <text x="645" y="126" text-anchor="middle" fill="#34d399" font-size="9">Monitor</text>

  <!-- Fail arrow -->
  <path d="M295 140 Q295 175 180 175 Q65 175 65 140" stroke="#f87171" stroke-width="1.5" fill="none" stroke-dasharray="4,3" marker-end="url(#ci2)"/>
  <text x="180" y="172" text-anchor="middle" fill="#fca5a5" font-size="9">❌ Tests fail → Notify developer</text>

  <defs>
    <marker id="ci1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#475569"/>
    </marker>
    <marker id="ci2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#f87171"/>
    </marker>
  </defs>
</svg>
```

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
