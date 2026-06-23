---
title: "8. PWA & Service Workers"
description: "Make an Angular app installable and work offline with Service Workers."
sidebar:
  order: 10
---

## 8. PWA & Service Workers

### Simple Words First 🟡
A **Progressive Web App (PWA)** is a website that acts like a **mobile app**. You can install it on your phone's home screen, use it offline, and get push notifications. A **Service Worker** is the magic behind this — it's a JavaScript file that runs in the background, intercepts network requests, and caches files.

Think of a Service Worker as a **helpful librarian**. When you ask for a book (request a file), the librarian first checks if it's already on the shelf (cached). If yes, hands it to you instantly. If not, goes to the store (network) to get it, but also keeps a copy for next time.

---

### Adding PWA to Your App

```bash
# Add PWA to any Angular app
ng add @angular/pwa

# This creates/updates:
# - ngsw-config.json          → Service Worker configuration
# - src/manifest.webmanifest  → App install manifest
# - src/assets/icons/         → App icons
# - Updates app.module.ts     → Registers ServiceWorker
```

### The `manifest.webmanifest`

```json
{
  "name": "My Angular App",
  "short_name": "MyApp",
  "description": "A great Angular app",
  "start_url": "/",
  "display": "standalone",           // Full-screen app, no browser chrome
  "background_color": "#ffffff",
  "theme_color": "#7c3aed",
  "icons": [
    {
      "src": "assets/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "assets/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### Configuring the Service Worker

```json
// ngsw-config.json
{
  "$schema": "./node_modules/@angular/service-worker/config/schema.json",
  "index": "/index.html",
  "assetGroups": [
    {
      "name": "app",
      "installMode": "prefetch",     // Cache all app files on install
      "updateMode": "lazy",           // Update in background
      "resources": {
        "files": [
          "/favicon.ico",
          "/index.html",
          "/main.*.js",
          "/polyfills.*.js",
          "/styles.*.css"
        ]
      }
    },
    {
      "name": "assets",
      "installMode": "lazy",          // Only cache when requested
      "updateMode": "prefetch",
      "resources": {
        "files": [
          "/assets/**"
        ]
      }
    }
  ],
  "dataGroups": [
    {
      "name": "api-cache",
      "urls": ["/api/products"],
      "cacheConfig": {
        "maxSize": 50,
        "maxAge": "1d",
        "timeout": "5s",
        "strategy": "freshness"       // Try network first, fallback to cache
      }
    }
  ]
}
```

### Checking PWA Status

```typescript
import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({ ... })
export class PwaStatusComponent {
  constructor(private swUpdate: SwUpdate) {
    // Listen for app updates
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe(event => {
        if (event.type === 'VERSION_READY') {
          // New version available — prompt user to reload
          if (confirm('A new version is available. Update now?')) {
            window.location.reload();
          }
        }
      });
    }
  }

  checkForUpdate(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.checkForUpdate();
    }
  }
}
```

### In Simple Words 🧠

- **PWA** makes your Angular app installable and work offline
- **Service Worker** caches files and intercepts network requests
- Add PWA with `ng add @angular/pwa` — sets up everything
- `manifest.webmanifest` tells the browser how your app looks when installed
- `ngsw-config.json` controls what gets cached and how
- Use `SwUpdate` service to notify users about app updates
- PWA works best for apps that don't change content frequently
