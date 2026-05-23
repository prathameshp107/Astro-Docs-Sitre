---
title: "Multi-Stage Builds"
description: "Multi-stage builds use multiple FROM instructions in a single Dockerfile. Each FROM starts a new stage with a clean filesystem. You can selectively copy ar"
sidebar:
  order: 103
---

## 3. Multi-Stage Builds

### 🏗️ What are Multi-Stage Builds?

Multi-stage builds use multiple `FROM` instructions in a single Dockerfile. Each `FROM` starts a new stage with a clean filesystem. You can selectively **copy artifacts** from earlier stages into the final image.

**Result:** Tiny production images that contain only what's needed to run — not to build.

---

### 🗺️ Multi-Stage Workflow Diagram

```xml
<svg viewBox="0 0 720 300" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <rect width="720" height="300" fill="#f0f4f8" rx="10"/>
  <text x="360" y="26" text-anchor="middle" font-size="14" font-weight="bold" fill="#222">Multi-Stage Build Workflow</text>

  <!-- Stage 1: Builder -->
  <rect x="20" y="48" width="200" height="190" rx="10" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
  <text x="120" y="70" text-anchor="middle" font-size="12" font-weight="bold" fill="#1565c0">Stage 1: builder</text>
  <text x="120" y="86" text-anchor="middle" font-size="9" fill="#555">FROM node:18 (900MB)</text>
  <rect x="35" y="95"  width="170" height="22" rx="4" fill="#bbdefb"/>
  <text x="120" y="111" text-anchor="middle" font-size="10" fill="#1565c0">Source Code</text>
  <rect x="35" y="123" width="170" height="22" rx="4" fill="#bbdefb"/>
  <text x="120" y="139" text-anchor="middle" font-size="10" fill="#1565c0">node_modules (all)</text>
  <rect x="35" y="151" width="170" height="22" rx="4" fill="#bbdefb"/>
  <text x="120" y="167" text-anchor="middle" font-size="10" fill="#1565c0">Build Tools (tsc, webpack)</text>
  <rect x="35" y="179" width="170" height="22" rx="4" fill="#90caf9"/>
  <text x="120" y="195" text-anchor="middle" font-size="10" font-weight="bold" fill="#0d47a1">→ /app/dist (compiled)</text>
  <text x="120" y="228" text-anchor="middle" font-size="10" fill="#888">~900MB total</text>

  <!-- Arrow with COPY --from -->
  <line x1="222" y1="185" x2="310" y2="185" stroke="#e65100" stroke-width="2.5"/>
  <defs><marker id="a2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#e65100"/></marker></defs>
  <line x1="222" y1="185" x2="308" y2="185" stroke="#e65100" stroke-width="2.5" marker-end="url(#a2)"/>
  <text x="265" y="175" text-anchor="middle" font-size="9" fill="#e65100">COPY --from=builder</text>
  <text x="265" y="198" text-anchor="middle" font-size="9" fill="#e65100">/app/dist only</text>

  <!-- Stage 2: Production -->
  <rect x="312" y="48" width="200" height="190" rx="10" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2"/>
  <text x="412" y="70" text-anchor="middle" font-size="12" font-weight="bold" fill="#2e7d32">Stage 2: production</text>
  <text x="412" y="86" text-anchor="middle" font-size="9" fill="#555">FROM node:18-alpine (50MB)</text>
  <rect x="327" y="95"  width="170" height="22" rx="4" fill="#c8e6c9"/>
  <text x="412" y="111" text-anchor="middle" font-size="10" fill="#2e7d32">dist/ (compiled output)</text>
  <rect x="327" y="123" width="170" height="22" rx="4" fill="#c8e6c9"/>
  <text x="412" y="139" text-anchor="middle" font-size="10" fill="#2e7d32">node_modules (prod only)</text>
  <rect x="327" y="151" width="170" height="22" rx="4" fill="#c8e6c9"/>
  <text x="412" y="167" text-anchor="middle" font-size="10" fill="#2e7d32">Non-root user</text>
  <text x="412" y="228" text-anchor="middle" font-size="10" fill="#2e7d32">~90MB total ✅</text>

  <!-- What's excluded -->
  <rect x="540" y="48" width="160" height="190" rx="10" fill="#ffebee" stroke="#c62828" stroke-width="2"/>
  <text x="620" y="70" text-anchor="middle" font-size="12" font-weight="bold" fill="#c62828">❌ Excluded</text>
  <text x="620" y="86" text-anchor="middle" font-size="9" fill="#888">(never in final image)</text>
  <rect x="555" y="95"  width="130" height="20" rx="4" fill="#ffcdd2"/>
  <text x="620" y="110" text-anchor="middle" font-size="9" fill="#7f0000">TypeScript compiler</text>
  <rect x="555" y="121" width="130" height="20" rx="4" fill="#ffcdd2"/>
  <text x="620" y="136" text-anchor="middle" font-size="9" fill="#7f0000">webpack / vite</text>
  <rect x="555" y="147" width="130" height="20" rx="4" fill="#ffcdd2"/>
  <text x="620" y="162" text-anchor="middle" font-size="9" fill="#7f0000">devDependencies</text>
  <rect x="555" y="173" width="130" height="20" rx="4" fill="#ffcdd2"/>
  <text x="620" y="188" text-anchor="middle" font-size="9" fill="#7f0000">Source .ts files</text>
  <rect x="555" y="199" width="130" height="20" rx="4" fill="#ffcdd2"/>
  <text x="620" y="214" text-anchor="middle" font-size="9" fill="#7f0000">Test files</text>

  <text x="360" y="268" text-anchor="middle" font-size="11" fill="#555">Build stage does the heavy lifting → runtime stage gets only what's needed</text>
</svg>
```

---

### 🟢 Example 1: Node.js + TypeScript

```dockerfile
# ─── Stage 1: Build ───────────────────────────────────────────
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm ci

COPY src/ ./src/
RUN npm run build     # Compiles TypeScript → dist/

# ─── Stage 2: Production ──────────────────────────────────────
FROM node:18-alpine AS production

WORKDIR /app

# Copy only production dependencies manifest
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy compiled output from builder stage
COPY --from=builder /app/dist ./dist

# Security: non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s \
  CMD wget -qO- http://localhost:3000/health || exit 1

CMD ["node", "dist/server.js"]
```

---

### ⚛️ Example 2: React / Next.js App

```dockerfile
# ─── Stage 1: Dependencies ────────────────────────────────────
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# ─── Stage 2: Build ───────────────────────────────────────────
FROM node:18-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ─── Stage 3: Production Runtime ──────────────────────────────
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser  --system --uid 1001 nextjs

# Copy Next.js standalone output
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
```

> **💡 Tip:** Enable `output: 'standalone'` in `next.config.js` for smallest possible Next.js images.

---

### 🐹 Example 3: Go Binary (Scratch Image)

```dockerfile
# ─── Stage 1: Build Go Binary ─────────────────────────────────
FROM golang:1.21-alpine AS builder

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o api ./cmd/api

# ─── Stage 2: Minimal Runtime ─────────────────────────────────
FROM scratch

# Copy SSL certs for HTTPS calls
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/

# Copy the binary only
COPY --from=builder /app/api /api

EXPOSE 8080
ENTRYPOINT ["/api"]
# Final image: ~10MB 🚀
```

---
