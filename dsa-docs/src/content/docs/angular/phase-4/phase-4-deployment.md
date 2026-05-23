---
title: "5. Deployment"
description: "// src/environments/environment.prod.ts export const environment = { production: true, apiUrl: 'https://api.mycompany.com/api', sentryDsn: 'https://abc@sen"
sidebar:
  order: 5
---

## 5. Deployment

### Environment Files

```typescript
// src/environments/environment.ts (development)
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  sentryDsn: '',
  featureFlags: { newCheckout: true, betaSearch: false }
};

// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.mycompany.com/api',
  sentryDsn: 'https://abc@sentry.io/12345',
  featureFlags: { newCheckout: true, betaSearch: false }
};
```

### Production Build

```bash
ng build --configuration production

# Analyze bundle
ng build --configuration production --stats-json
npx webpack-bundle-analyzer dist/my-app/stats.json
```

### Docker — Multi-Stage Build

```dockerfile
# Stage 1: Build Angular
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --silent
COPY . .
RUN npm run build -- --configuration production

# Stage 2: Nginx to serve
FROM nginx:1.25-alpine AS runtime
COPY --from=builder /app/dist/my-app /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Nginx — Critical SPA Config

```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Content-Security-Policy "default-src 'self';" always;

    # Gzip
    gzip on;
    gzip_types text/plain application/javascript text/css;

    # Cache hashed assets aggressively
    location ~* \.(js|css|png|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # CRITICAL: Angular SPA routing — ALL routes serve index.html
    # Without this, direct links (e.g. /products/123) return 404
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Never cache index.html
    location = /index.html {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }
}
```

### CI/CD Pipeline (GitHub Actions)

```yaml
name: Build, Test & Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm run lint
      - run: npm run test -- --watch=false --browsers=ChromeHeadless

  build-and-deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm run build -- --configuration production
      - name: Build & push Docker image
        run: |
          docker build -t registry.example.com/myapp:${{ github.sha }} .
          docker push registry.example.com/myapp:${{ github.sha }}
      - name: Deploy to Kubernetes
        run: |
          kubectl set image deployment/angular-app \
            angular-app=registry.example.com/myapp:${{ github.sha }}
          kubectl rollout status deployment/angular-app
```

---
