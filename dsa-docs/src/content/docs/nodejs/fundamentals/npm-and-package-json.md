---
title: "npm & package.json"
description: "npm, package.json fields, scripts, semver, dependencies vs devDependencies, lockfile, npx, and nvm."
sidebar:
  order: 3
---

## npm & package.json

**npm** (Node Package Manager) is the default package manager for Node.js. It installs, manages, and publishes packages. The `package.json` file is the heart of any Node.js project.

### What is `package.json`?

Every Node.js project has a `package.json` file at its root. It contains metadata about the project and its dependencies.

```json
{
  "name": "my-api",
  "version": "1.0.0",
  "description": "A REST API for managing users",
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "test": "jest",
    "lint": "eslint src/"
  },
  "keywords": ["api", "users"],
  "author": "Alice <alice@example.com>",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.6.3",
    "jsonwebtoken": "^9.0.2"
  },
  "devDependencies": {
    "jest": "^29.7.0",
    "nodemon": "^3.0.1",
    "eslint": "^8.50.0"
  }
}
```

| Field | Purpose |
|---|---|
| `name` | Package name (lowercase, no spaces) |
| `version` | Semantic version (semver) |
| `description` | Short description of the project |
| `main` | Entry point file |
| `scripts` | CLI commands you can run with `npm run` |
| `dependencies` | Packages needed in production |
| `devDependencies` | Packages needed only during development |
| `peerDependencies` | Packages your project expects the consumer to provide |
| `engines` | Node.js version requirements |

### npm Scripts

```bash
# Run a script
npm run dev
npm run test
npm run lint

# Special scripts (run automatically)
npm start      # npm run start
npm test       # npm run test
npm stop       # npm run stop
npm restart    # npm run restart
```

Scripts can be chained:

```json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/server.js",
    "dev": "npm run build && nodemon dist/server.js",
    "test": "jest --coverage",
    "lint": "eslint src/",
    "check": "npm run lint && npm run test"
  }
}
```

### Semantic Versioning (Semver)

```text
^1.2.3  → Compatible with 1.x.x (allows minor/patch updates)
~1.2.3  → Compatible with 1.2.x (allows only patch updates)
1.2.3   → Exact version only
*       → Any version (not recommended)
>=1.2.3 → Version 1.2.3 or higher
```

| Version | Meaning |
|---|---|
| **Major** (1.x.x) | Breaking changes |
| **Minor** (x.2.x) | New features, backward compatible |
| **Patch** (x.x.3) | Bug fixes, backward compatible |

### `dependencies` vs `devDependencies`

```bash
# Production dependencies
npm install express           # --save-prod (default)
npm i mongoose

# Development dependencies
npm install jest --save-dev   # or -D
npm install nodemon -D        # shorthand
```

| | `dependencies` | `devDependencies` |
|---|---|---|
| Installed in production | ✅ Yes | ❌ No |
| Examples | express, mongoose, react | jest, eslint, nodemon, typescript |
| `npm ci --production` | Included | Excluded |

### The Lockfile (`package-lock.json`)

The lockfile **locks** every dependency to an exact version, including transitive dependencies. This ensures everyone on the team (and your production server) gets **exactly the same versions**.

```bash
# Always commit package-lock.json to version control!
git add package-lock.json
```

> Without the lockfile, `npm install` might resolve different patch versions on different machines, causing "works on my machine" bugs.

### `npx` — Run Packages Without Installing

`npx` executes npm packages without permanently installing them.

```bash
# Run a one-off command
npx create-react-app my-app
npx prisma generate
npx ts-node script.ts

# Run a specific version
npx cowsay@1.5.0 "Hello!"

# Useful for generators and scaffolding tools
npx express-generator my-api --no-view
```

### `nvm` — Node Version Manager

nvm lets you install and switch between multiple Node.js versions.

```bash
# Install nvm (macOS/Linux)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install a specific Node version
nvm install 20
nvm install 18.17.0

# Use a version
nvm use 20
nvm use 18.17.0

# Set default
nvm alias default 20

# List installed versions
nvm ls

# List available versions
nvm ls-remote
```

### 🚨 Common Gotchas

```bash
# ❌ Forgetting --save-dev for dev dependencies
npm install jest  # installs as regular dependency!

# ✅ Correct
npm install jest --save-dev

# ❌ Not commiting package-lock.json
# Different developers get different versions!

# ❌ Using ^ on packages that should be exact
npm install my-lib@1.0.0  # ^1.0.0 in package.json
# Use --save-exact to pin:
npm install my-lib@1.0.0 --save-exact
```

### Key Takeaways

- `package.json` is the manifest for your Node.js project — name, version, scripts, dependencies
- Use `npm install -D` for dev-only packages (testing, linting, build tools)
- **Always commit `package-lock.json`** to ensure reproducible installs
- Semver: `^` allows minor/patch updates, `~` allows only patches
- `npx` runs packages without installing them permanently
- `nvm` manages multiple Node.js versions on your machine
- `npm ci` is faster and stricter than `npm install` — use it in CI environments
