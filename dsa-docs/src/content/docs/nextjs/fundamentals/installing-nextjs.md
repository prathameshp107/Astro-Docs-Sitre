---
title: "Installing Next.js"
description: "Before installing Next.js, ensure you have:"
---

# 2. Installing Next.js

## System Requirements

Before installing Next.js, ensure you have:

| Requirement | Minimum Version | Recommended |
|---|---|---|
| Node.js | 18.17.0 | 20.x LTS or later |
| npm | 9.x | 10.x |
| OS | Windows / macOS / Linux | Any modern OS |
| RAM | 4GB | 8GB+ |
| Disk | 1GB free | 5GB+ |

Check your Node version:

```bash
node --version   # Should show v18.17.0 or higher
npm --version    # Should show 9.x or higher
```

---

## Installing Node.js

If you don't have Node.js, install it from [nodejs.org](https://nodejs.org).

**Recommended: Use a version manager**

```bash
# Install nvm (Node Version Manager) on macOS/Linux
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Install and use the latest LTS
nvm install --lts
nvm use --lts
```

```powershell
# On Windows, use nvm-windows or fnm
winget install Schniz.fnm
fnm install --lts
fnm use lts-latest
```

---

## Creating a New Next.js Project

### Using npm (default)

```bash
npx create-next-app@latest my-app
```

### Using yarn

```bash
yarn create next-app my-app
```

### Using pnpm

```bash
pnpm create next-app my-app
```

### Using bun

```bash
bunx create-next-app my-app
```

---

## Interactive Setup Prompts

When you run the command, you'll be asked:

```
What is your project named? › my-app
Would you like to use TypeScript? › Yes ✓
Would you like to use ESLint? › Yes ✓
Would you like to use Tailwind CSS? › Yes ✓
Would you like your code inside a `src/` directory? › No
Would you like to use App Router? (recommended) › Yes ✓
Would you like to use Turbopack for `next dev`? › Yes ✓
Would you like to customize the import alias (@/*)? › No
```

> **Best Practice**: Always say **Yes** to TypeScript, App Router, and ESLint for any serious project.

---

## Key Configuration Explanations

### TypeScript
Next.js has first-class TypeScript support. Choosing TypeScript generates `.tsx`/`.ts` files and a `tsconfig.json`. TypeScript catches bugs at compile time before they reach production.

### ESLint
ESLint is a linter that enforces code quality rules. Next.js ships with `eslint-config-next`, which includes rules specific to Next.js like requiring `<Image>` instead of `<img>`.

### Tailwind CSS
Tailwind is a utility-first CSS framework. Next.js sets it up with `tailwind.config.ts` and `postcss.config.js` automatically.

### App Router
The App Router (introduced in Next.js 13) uses React Server Components by default. It lives inside the `app/` folder. **Always choose App Router** for new projects — the older Pages Router is legacy.

### Turbopack
Turbopack is Next.js's new Rust-based bundler, replacing Webpack. It's significantly faster for development. Stable as of Next.js 15.

---

## Development Server

```bash
cd my-app
npm run dev      # Start dev server at http://localhost:3000
```

With Turbopack (default in v15):
```bash
npm run dev      # Automatically uses Turbopack
```

| Command | Purpose |
|---|---|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create optimized production build |
| `npm start` | Start production server (after build) |
| `npm run lint` | Run ESLint checks |

---

## Production Build

```bash
npm run build
```

This generates:
- Optimized JavaScript bundles
- Prerendered HTML for static pages
- Server bundles for dynamic routes

```bash
npm start         # Serves the production build locally
```

---

## Generated Files Explained

After running `create-next-app`, you'll see:

```
my-app/
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx       ← Root layout (wraps all pages)
│   └── page.tsx         ← Home page (renders at /)
├── public/
│   ├── next.svg
│   └── vercel.svg
├── .eslintrc.json       ← ESLint configuration
├── .gitignore           ← Git ignored files
├── next.config.ts       ← Next.js configuration
├── package.json         ← Dependencies and scripts
├── postcss.config.mjs   ← PostCSS for Tailwind
├── tailwind.config.ts   ← Tailwind configuration
└── tsconfig.json        ← TypeScript configuration
```

### `next.config.ts`

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode for catching bugs early
  reactStrictMode: true,

  // Configure allowed image domains
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
      },
    ],
  },
};

export default nextConfig;
```

### `tsconfig.json` (key parts)

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "strict": true,          // Enable all strict type checks
    "paths": {
      "@/*": ["./*"]         // Import alias: @/components = ./components
    }
  }
}
```

---

## SVG: Development Workflow

![SVG: Development Workflow diagram](/DSA-Notes-Problems/assets/nextjs/fundamentals-installing-nextjs-svg-development-workflow.svg)

---

## Package Manager Comparison

| Feature | npm | yarn | pnpm | bun |
|---|---|---|---|---|
| Speed | Moderate | Fast | Very Fast | Fastest |
| Disk Usage | High | High | Low (symlinks) | Low |
| Lockfile | package-lock.json | yarn.lock | pnpm-lock.yaml | bun.lockb |
| Workspaces | ✅ | ✅ | ✅ | ✅ |
| Stability | Most stable | Very stable | Stable | Newer |
| Recommendation | ✅ Default | Good choice | Best for monorepos | Fastest builds |

---

## Troubleshooting Common Issues

| Error | Cause | Fix |
|---|---|---|
| `Node version too old` | Node < 18.17 | Update Node.js |
| `EACCES permission denied` | Wrong npm permissions | Use nvm or fix npm permissions |
| `Port 3000 already in use` | Another process | `npx kill-port 3000` |
| `Module not found` | Missing package | `npm install` |
| `Hydration mismatch` | Server/client HTML differs | Check for browser-only APIs in RSC |
| `Cannot read properties of undefined` | Async data not awaited | Use `async/await` properly |

---

## 📝 Interview Questions — Section 2

**Beginner:**
1. What is the minimum Node.js version required for Next.js 14+?
2. What does `npm run build` do differently from `npm run dev`?
3. What is the App Router and when was it introduced?

**Intermediate:**
4. What is Turbopack and how does it differ from Webpack?
5. Explain the role of `next.config.ts` in a Next.js project.
6. What is the significance of `reactStrictMode: true`?

**Advanced:**
7. How would you configure Next.js to support multiple environments (dev/staging/prod)?
8. Explain how `tsconfig.json` path aliases improve code maintainability in large projects.

---
