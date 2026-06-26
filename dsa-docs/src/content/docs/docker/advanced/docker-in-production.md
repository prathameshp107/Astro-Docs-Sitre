---
title: "Docker in Production"
description: "<!-- Internet -- <ellipse cx=\"370\" cy=\"60\" rx=\"70\" ry=\"28\" fill=\"e3f2fd\" stroke=\"1565c0\" stroke-width=\"2\"/ <text x=\"370\" y=\"65\" text-anchor=\"middle\" font-s"
sidebar:
  order: 110
---

## 9. Docker in Production

### 🚀 Production Architecture Diagram

```xml
<svg viewBox="0 0 740 420" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <rect width="740" height="420" fill="#f0f4f8" rx="10"/>
  <text x="370" y="26" text-anchor="middle" font-size="14" font-weight="bold" fill="#222">Production Docker Infrastructure</text>

  <!-- Internet -->
  <ellipse cx="370" cy="60" rx="70" ry="28" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
  <text x="370" y="65" text-anchor="middle" font-size="12">🌍 Internet</text>

  <!-- Arrow down -->
  <defs><marker id="pa" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#607d8b"/></marker></defs>
  <line x1="370" y1="90" x2="370" y2="108" stroke="#607d8b" stroke-width="2" marker-end="url(#pa)"/>

  <!-- Nginx Reverse Proxy -->
  <rect x="240" y="110" width="260" height="55" rx="8" fill="#fff9c4" stroke="#f57f17" stroke-width="2"/>
  <text x="370" y="134" text-anchor="middle" font-size="12" font-weight="bold" fill="#e65100">🔀 Nginx Reverse Proxy</text>
  <text x="370" y="152" text-anchor="middle" font-size="10" fill="#777">SSL termination | Rate limiting | Load balancing</text>

  <!-- Arrows to services -->
  <line x1="290" y1="167" x2="180" y2="200" stroke="#607d8b" stroke-width="1.5" marker-end="url(#pa)"/>
  <line x1="370" y1="167" x2="370" y2="200" stroke="#607d8b" stroke-width="1.5" marker-end="url(#pa)"/>
  <line x1="450" y1="167" x2="560" y2="200" stroke="#607d8b" stroke-width="1.5" marker-end="url(#pa)"/>

  <!-- Frontend Container -->
  <rect x="50"  y="200" width="250" height="65" rx="8" fill="#c8e6c9" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="175" y="224" text-anchor="middle" font-size="12" font-weight="bold" fill="#1b5e20">⚛️ React Frontend</text>
  <text x="175" y="240" text-anchor="middle" font-size="10" fill="#555">Static files served by Nginx</text>
  <text x="175" y="255" text-anchor="middle" font-size="9" fill="#888">node:18-alpine | port 3000</text>

  <!-- API Container -->
  <rect x="245" y="200" width="250" height="65" rx="8" fill="#c8e6c9" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="370" y="224" text-anchor="middle" font-size="12" font-weight="bold" fill="#1b5e20">🟢 Express API</text>
  <text x="370" y="240" text-anchor="middle" font-size="10" fill="#555">REST API | JWT Auth</text>
  <text x="370" y="255" text-anchor="middle" font-size="9" fill="#888">node:18-alpine | port 3000</text>

  <!-- Cache Container -->
  <rect x="440" y="200" width="250" height="65" rx="8" fill="#c8e6c9" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="565" y="224" text-anchor="middle" font-size="12" font-weight="bold" fill="#1b5e20">🔴 Redis Cache</text>
  <text x="565" y="240" text-anchor="middle" font-size="10" fill="#555">Session store | Cache</text>
  <text x="565" y="255" text-anchor="middle" font-size="9" fill="#888">redis:7-alpine | port 6379</text>

  <!-- Database -->
  <line x1="370" y1="267" x2="370" y2="300" stroke="#607d8b" stroke-width="1.5" marker-end="url(#pa)"/>
  <rect x="245" y="300" width="250" height="65" rx="8" fill="#ffe0b2" stroke="#e65100" stroke-width="1.5"/>
  <text x="370" y="324" text-anchor="middle" font-size="12" font-weight="bold" fill="#bf360c">🐘 PostgreSQL</text>
  <text x="370" y="340" text-anchor="middle" font-size="10" fill="#555">Primary + Read replicas</text>
  <text x="370" y="355" text-anchor="middle" font-size="9" fill="#888">postgres:15-alpine | port 5432 (internal)</text>

  <!-- Volumes indicator -->
  <text x="370" y="395" text-anchor="middle" font-size="10" fill="#888">💾 Named volumes for DB | 🔒 Internal network for DB | 🌐 External only via Nginx</text>
</svg>
```

---

### 🔒 Nginx with SSL in Docker

```nginx
# nginx/nginx.conf
server {
    listen 80;
    server_name example.com;
    return 301 https://$host$request_uri;  # Force HTTPS
}

server {
    listen 443 ssl http2;
    server_name example.com;

    ssl_certificate     /etc/nginx/ssl/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/privkey.pem;
    ssl_protocols       TLSv1.2 TLSv1.3;
    ssl_ciphers         HIGH:!aNULL:!MD5;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000" always;
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;

    location /api/ {
        proxy_pass http://api:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }

    location / {
        proxy_pass http://frontend:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

### 🌍 Let's Encrypt with Certbot + Docker

```yaml
services:
  certbot:
    image: certbot/certbot
    volumes:
      - ./ssl:/etc/letsencrypt
      - ./certbot-www:/var/www/certbot
    command: certonly --webroot -w /var/www/certbot
             -d example.com --email admin@example.com
             --agree-tos --non-interactive
```

---

### 📦 Environment Separation

```
docker-compose.yml           # Base config (shared)
docker-compose.dev.yml       # Development overrides
docker-compose.staging.yml   # Staging overrides
docker-compose.prod.yml      # Production overrides
```

```bash
# Development
docker compose -f docker-compose.yml -f docker-compose.dev.yml up

# Production
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

---
