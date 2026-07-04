---
title: "npm & package.json"
description: "npm (Node Package Manager), package.json, semantic versioning, scripts, workspaces, and publishing packages."
sidebar:
  order: 3
---

# npm & package.json

## 📖 Introduction

**npm** (Node Package Manager) is the world's largest software registry, with over **2 million packages** and **trillions of downloads per month**. It comes bundled with Node.js and is the primary way developers share, discover, and manage JavaScript code.

> 💡 **Did You Know?** npm's registry serves over **1 billion package downloads per day**. That's more than all other language package managers combined!

## 🤔 Why Do We Need This?

Writing everything from scratch is impractical. npm lets you:

| Need | Without npm | With npm |
|------|-------------|----------|
| HTTP server | Write from scratch (weeks) | `npm install express` (seconds) |
| Date formatting | Manual date parsing | `npm install date-fns` |
| Database driver | Build DB protocol parser | `npm install mongoose` |
| Authentication | Implement OAuth, JWT yourself | `npm install passport` |

## ⚠️ Problem Statement

Before package managers, sharing JavaScript code meant:

```
1. Find a cool JS library on a random blog
2. Download the .js file
3. Save it to /vendor/js/library.js
4. Include it in your HTML: <script src="/vendor/js/library.js">
5. Manually check for updates every few months
6. When updating, pray nothing breaks

😱 THIS WAS THE REALITY BEFORE npm!
```

This was called **"dependency hell"** — no versioning, no dependency resolution, no easy updates.

## 📚 Real World Story

**The Left-Pad Incident (March 2016)**

A developer named Azer Koçulu unpublished **all** of his npm packages (including a tiny 11-line package called `left-pad`). Over **500,000 projects** using left-pad suddenly broke, including major tools like Babel, React Native, and Airbnb's codebase.

The internet was broken for hours because of an 11-line package.

**Lessons learned:**
1. npm changed its policy — published packages can't be unpublished
2. The industry realized how fragile the dependency graph had become
3. `package-lock.json` became essential for reproducible builds

> *"One angry developer broke the internet for an afternoon."*

## 🍕 Real World Analogy

**A Library vs. a Package Manager**

| Concept | Without Package Manager | With npm |
|---------|------------------------|----------|
| Getting a book | Go to every bookstore, find it, copy it by hand | `npm install book` |
| Finding related books | Ask around randomly | `npm search "cooking vegan"` |
| Updating a book | Buy the new edition, manually merge changes | `npm update` |
| Recording what you own | Sticky notes on your fridge | `package.json` |
| Sharing your book list | Email a screenshot to friends | Share `package.json` |
| Reproducing your collection | Describe every edition to a friend | `npm ci` (clean install) |

## 👁️ Visual Explanation

```
BEFORE npm (Dependency Hell)
══════════════════════════════

Your App
├── jquery-1.11.js (downloaded from blog)
├── bootstrap-3.3.js (copied from CDN)
├── moment.js (emailed by coworker)
├── lodash.custom.js (modified version)
├── chart.js (outdated, no easy update)
└── ── 17 more unmanaged JS files ──

No version tracking. No updates. Conflicts everywhere.

AFTER npm
═════════

Your App → package.json → npm install
                           │
                           ▼
                    node_modules/
                    ├── express@4.18.2
                    ├── react@18.2.0
                    ├── lodash@4.17.21
                    ├── dayjs@1.11.9
                    └── 337 more (managed automatically)
                    
package-lock.json = EXACT snapshot of every dependency
```

## 📊 Mermaid Diagram 1: npm Workflow

```mermaid
flowchart LR
    subgraph Dev["👨‍💻 Developer Workflow"]
        Init["npm init\nCreate package.json"]
        Install["npm install <pkg>\nDownload dependencies"]
        Script["npm run <script>\nExecute tasks"]
        Update["npm update\nUpgrade packages"]
        Publish["npm publish\nShare your package"]
    end

    subgraph Registry["📦 npm Registry"]
        RegistryDB["registry.npmjs.org\n2M+ packages"]
        Cache["Local Cache\n~/.npm"]
    end

    subgraph Project["📁 Your Project"]
        PkgJson["package.json\n(dependencies list)"]
        LockFile["package-lock.json\n(exact versions)"]
        NodeModules["node_modules/\n(installed packages)"]
    end

    Init --> PkgJson
    Install --> RegistryDB
    RegistryDB --> NodeModules
    RegistryDB --> LockFile
    Script --> NodeModules
    Publish --> RegistryDB
    
    style Dev fill:#4f46e5,color:#fff
    style Registry fill:#059669,color:#fff
    style Project fill:#d97706,color:#fff
```

## ⚙️ Internal Working: How npm Resolves Dependencies

```mermaid
flowchart TD
    Start["npm install express"] --> ReadPkg["Read package.json\nfor existing deps"]
    ReadPkg --> CheckCache["Check local cache\n~/.npm/cacache"]
    CheckCache -->|"Cache HIT ✅"| Extract["Extract from cache"]
    CheckCache -->|"Cache MISS ❌"| Fetch["Fetch from registry\nregistry.npmjs.org"]
    Fetch --> SaveCache["Save to local cache"]
    SaveCache --> Extract
    
    Extract --> Resolve["Resolve dependencies"]
    Resolve --> Dedupe["Deduplicate (hoist)\nmove shared deps up"]
    Dedupe --> WriteLock["Generate/update\npackage-lock.json"]
    WriteLock --> Place["Place in node_modules/\nwith exact versions"]
    Place --> Done["✅ Done"]

    style Start fill:#4f46e5,color:#fff
    style Fetch fill:#6366f1,color:#fff
    style Resolve fill:#7c3aed,color:#fff
    style Dedupe fill:#059669,color:#fff
    style WriteLock fill:#d97706,color:#fff
    style Place fill:#10b981,color:#fff
    style Done fill:#10b981,color:#fff
```

## 🏗️ Architecture: npm's Dependency Resolution Strategy

npm uses a **nested** dependency tree with **hoisting** (since npm v3):

```mermaid
flowchart TB
    subgraph V2["npm v2: Nested (Deep)"]
        V2App["app/"]
        V2App --> V2Mod["node_modules/"]
        V2Mod --> V2A["dep-A@1.0"]
        V2A --> V2AMod["node_modules/"]
        V2AMod --> V2B["dep-B@1.0"]
        V2B --> V2BMod["node_modules/"]
        V2BMod --> V2C["dep-C@1.0"]
        V2C --> V2CC["node_modules/ (infinite nesting)"]
    end

    subgraph V3["npm v3+: Flat (Hoisted)"]
        V3App["app/"]
        V3App --> V3Mod["node_modules/"]
        V3Mod --> V3A["dep-A@1.0"]
        V3Mod --> V3B["dep-B@1.0"]
        V3Mod --> V3C["dep-C@1.0"]
        V3Mod --> V3B2["dep-B@2.0 (nested, different version)"]
        V3Mod --> V3Sub["dep-A/"]
        V3Sub --> V3SubMod["node_modules/"]
        V3SubMod --> V3SubB["dep-B@2.0 (nested)"]
    end

    Note["✅ npm v3+ hoists shared deps to top level\n❌ Different versions stay nested"]

    style V2 fill:#ef4444,color:#fff
    style V3 fill:#10b981,color:#fff
    style Note fill:#6366f1,color:#fff
```

## 👣 Step-by-Step Flow: Creating and Publishing an npm Package

```mermaid
sequenceDiagram
    participant Dev as Developer
    participant CLI as npm CLI
    participant Registry as npm Registry
    participant Users as Other Developers

    Dev->>CLI: npm init
    CLI->>Dev: Asks for name, version, entry point...
    Dev->>CLI: Fills in details
    CLI->>Dev: ✅ package.json created

    Dev->>Dev: Write code (index.js)
    Dev->>CLI: npm login (authenticate)
    CLI->>Registry: Verify credentials
    Registry-->>CLI: ✅ Token issued

    Dev->>CLI: npm publish
    CLI->>Registry: Upload package.tgz
    Registry-->>CLI: ✅ Published as pkg-name@1.0.0

    Users->>CLI: npm install pkg-name
    CLI->>Registry: Fetch pkg-name@1.0.0
    Registry-->>CLI: package.tgz
    CLI-->>Users: ✅ Installed in node_modules
```

## 📝 Syntax: package.json Fields

```json
{
  "name": "my-awesome-package",
  "version": "1.0.0",
  "description": "A package that does amazing things",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/server.js",
    "dev": "node --watch src/server.js",
    "test": "jest",
    "build": "tsc"
  },
  "keywords": ["awesome", "utility"],
  "author": "Jane Doe <jane@example.com>",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2",
    "lodash": "~4.17.21"
  },
  "devDependencies": {
    "jest": "^29.7.0",
    "typescript": "^5.3.0"
  },
  "peerDependencies": {
    "react": "^18.0.0"
  },
  "engines": {
    "node": ">=18.0.0"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/user/repo.git"
  },
  "bugs": {
    "url": "https://github.com/user/repo/issues"
  },
  "homepage": "https://github.com/user/repo#readme"
}
```

### Semantic Versioning (SemVer)

```
MAJOR.MINOR.PATCH
  │      │      │
  │      │      └── Bug fixes (backward compatible)
  │      └───────── New features (backward compatible)
  └──────────────── Breaking changes (not backward compatible)
```

### Version Ranges

| Notation | Range | Example |
|----------|-------|---------|
| `^1.2.3` | Compatible with major | 1.x.x (1.2.3 to <2.0.0) |
| `~1.2.3` | Approximately | 1.2.x (1.2.3 to <1.3.0) |
| `1.2.3` | Exact version | Only 1.2.3 |
| `*` | Any version | All versions |
| `>=1.2.3` | Greater or equal | 1.2.3 and above |

## 🟢 Basic Example: Setting Up a Project

```bash
# Create a new project directory
mkdir my-project
cd my-project

# Initialize package.json (answers interactive questions)
npm init

# OR skip the questions with defaults
npm init -y

# This creates:
# {
#   "name": "my-project",
#   "version": "1.0.0",
#   "main": "index.js",
#   "scripts": { "test": "echo \"Error: no test specified\" && exit 1" }
# }
```

```javascript
// index.js — Entry point
const dayjs = require('dayjs');

console.log('Today is:', dayjs().format('dddd, MMMM D, YYYY'));
```

```bash
# Install a package
npm install dayjs

# Now you can use it
node index.js
# Output: Today is: Monday, January 15, 2024
```

> 🧠 **Memory Trick:** `npm i` is shorthand for `npm install`. `npm i -S` installs to `dependencies`, `npm i -D` to `devDependencies`.

## 🟡 Intermediate Example: npm Scripts and Environment

```json
{
  "name": "api-server",
  "version": "1.0.0",
  "scripts": {
    "start": "node src/server.js",
    "dev": "node --watch src/server.js",
    "test": "jest --coverage",
    "test:watch": "jest --watch",
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix",
    "build": "rimraf dist/ && tsc",
    "deploy": "npm run build && npm run test && node scripts/deploy.js",
    "precommit": "npm run lint && npm run test"
  }
}
```

```bash
# Run scripts
npm run dev          # Development mode with auto-restart
npm run test         # Run tests with coverage
npm run build        # Build TypeScript
npm run deploy       # Build → Test → Deploy (chained)

# npm lifecycle hooks
# npm automatically runs:
#   preinstall → install → postinstall
#   pretest → test → posttest
#   prestart → start → poststart

# Example: prestart hook
npm run prestart     # Automatically runs before "npm start"
```

### Environment Variables with npm

```bash
# Set variables inline
NODE_ENV=production PORT=8080 node src/server.js

# Or use dotenv (most common approach)
# .env file
PORT=8080
DATABASE_URL=postgres://user:pass@localhost:5432/db
JWT_SECRET=your-secret-key

# .env is loaded in your code:
require('dotenv').config();
console.log(process.env.PORT); // 8080
```

## 🔴 Advanced Example: npm Workspaces (Monorepo)

```json
// package.json (root)
{
  "name": "my-monorepo",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "packages/*",
    "apps/*"
  ],
  "scripts": {
    "dev": "npm run dev --workspaces --if-present",
    "build": "npm run build --workspaces --if-present",
    "test": "npm run test --workspaces --if-present",
    "lint": "npm run lint --workspaces --if-present"
  }
}
```

```
my-monorepo/
├── package.json            ← Root workspace config
├── package-lock.json
├── apps/
│   ├── web/                ← Frontend app
│   │   ├── package.json    ← Depends on @myorg/shared
│   │   └── src/
│   └── api/                ← Backend app
│       ├── package.json    ← Depends on @myorg/shared
│       └── src/
└── packages/
    └── shared/             ← Shared library
        ├── package.json
        └── src/
            └── utils.js
```

```bash
# Install dependencies for ALL workspaces
npm install

# Run tests for a specific workspace
npm run test -w apps/api

# Run tests for ALL workspaces
npm run test --workspaces

# Add a dependency to a specific workspace
npm install lodash -w packages/shared

# Link packages locally (no need to publish!)
# @myorg/shared is automatically available to apps/web and apps/api
```

> 🚀 **Best Practice:** Use workspaces for monorepos. They're built into npm (v7+) — no need for Lerna or yarn workspaces for most projects.

## 🏭 Production Example: Publishing a Package

```javascript
// src/index.js — Your package code
/**
 * A utility that safely deep-clones objects.
 * No dependencies required!
 */
function deepClone(obj, map = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (map.has(obj)) return map.get(obj);
  
  const clone = Array.isArray(obj) ? [] : {};
  map.set(obj, clone);
  
  for (const key of Object.keys(obj)) {
    clone[key] = deepClone(obj[key], map);
  }
  return clone;
}

module.exports = { deepClone };
```

```json
// package.json
{
  "name": "@yourorg/deep-clone",
  "version": "1.0.0",
  "description": "Safe deep clone utility with circular reference handling",
  "main": "src/index.js",
  "files": ["src/"],
  "keywords": ["clone", "deep-clone", "utility"],
  "license": "MIT",
  "engines": { "node": ">=16.0.0" },
  "scripts": {
    "test": "jest --coverage",
    "prepublishOnly": "npm test",
    "postpublish": "git tag v$npm_package_version && git push --tags"
  },
  "devDependencies": {
    "jest": "^29.7.0"
  }
}
```

```bash
# Publish workflow
npm login                    # Authenticate with npm registry
npm version patch            # Bump: 1.0.0 → 1.0.1 (also creates git tag)
npm publish                  # Publish to registry
npm publish --access public  # For scoped packages (@yourorg/name)

# Update workflow
# Edit code...
npm version minor            # 1.0.1 → 1.1.0
npm publish                  # Publish v1.1.0

# Deprecate a version (warns users on install)
npm deprecate @yourorg/deep-clone@1.0.0 "Critical security fix in v1.0.1"
```

> 🔒 **Security Note:** Always run `npm audit` before publishing. Use `--ignore-scripts` when installing unfamiliar packages to prevent malicious install scripts.

## ⚙️ How It Works Internally

```
npm install express
│
├─ 1. Read package.json → read dependencies
├─ 2. Check package-lock.json
│     └─ If lock exists → use exact versions from lock
│     └─ If no lock → resolve versions from registry
├─ 3. Fetch package metadata from registry.npmjs.org
│     └─ Returns: all versions, dependencies, tarball URL
├─ 4. Build dependency tree
│     └─ Recursively resolve dependencies of dependencies
├─ 5. Deduplicate (hoist common deps to top-level)
├─ 6. Download tarballs → extract to node_modules
├─ 7. Write package-lock.json
└─ 8. Run install scripts (if any)
```

**node_modules resolution algorithm:**
```javascript
// Simplified version of how Node.js finds modules
function require(modulePath) {
  if (modulePath.startsWith('./') || modulePath.startsWith('../')) {
    // Relative path — search from current file
    return resolveFromPath(modulePath, __dirname);
  }
  
  // Core module?
  const builtins = ['fs', 'path', 'http', ...];
  if (builtins.includes(modulePath)) return loadBuiltin(modulePath);
  
  // node_modules traversal
  let dir = path.dirname(__filename);
  while (dir !== path.parse(dir).root) {
    const nodeModulesPath = path.join(dir, 'node_modules', modulePath);
    if (fs.existsSync(nodeModulesPath)) {
      return loadModule(nodeModulesPath);
    }
    dir = path.dirname(dir); // Go up one directory
  }
  
  throw new Error(`Cannot find module '${modulePath}'`);
}
```

## 📦 Performance Notes

| Command | When to Use | Why |
|---------|-------------|-----|
| `npm install` | First setup, adding/removing deps | Resolves dependencies, writes lockfile |
| `npm ci` | CI/CD pipelines, production | Faster (no resolution), uses lockfile exactly |
| `npm update` | Safe upgrades | Respects semver ranges in package.json |
| `npm outdated` | Checking available updates | Shows current/wanted/latest versions |

```bash
# npm ci vs npm install
npm ci   # 1. Deletes node_modules
         # 2. Installs EXACT versions from lockfile
         # 3. Faster (skips resolution)
         # 4. Fails if lockfile is out of sync
         
npm install  # 1. Resolves versions from registry
             # 2. Updates lockfile if needed
             # 3. Slower but more flexible
```

> 📦 **Performance Note:** `npm ci` is 2-5x faster than `npm install` and produces deterministic builds. Always use `npm ci` in CI/CD and Docker builds.

## 🔒 Security Notes

| Command | Purpose |
|---------|---------|
| `npm audit` | Scan for known vulnerabilities |
| `npm audit fix` | Auto-fix vulnerabilities (safe updates) |
| `npm audit fix --force` | Force fix (may break APIs) |
| `npm ls --depth=0` | List top-level packages |
| `npm fund` | Show funding info for dependencies |

```bash
# Security workflow
npm audit                    # Check for vulnerabilities
npm audit fix                # Auto-fix what's safe
npm audit fix --force        # Force update (may break things)
npm install --audit=false    # Skip audit (fast, but risky)
npm install --ignore-scripts # Skip install scripts (for suspicious packages)
```

> ⚠️ **Common Mistake:** Ignoring `npm audit` warnings. In 2024, the average project has 5-10 moderate vulnerabilities. Run `npm audit` weekly and patch promptly.

## ⚠️ Common Mistakes

```bash
# ❌ MISTAKE 1: Not committing package-lock.json
# package-lock.json should be COMMITTED to Git!
echo "package-lock.json" >> .gitignore  # ❌ WRONG!

# Without it, different developers get DIFFERENT versions
# With it → exact same dependencies everywhere

# ❌ MISTAKE 2: Using npm install in production
docker run my-app
  npm install   # ❌ Slow, sometimes resolves differently
  node server.js

# ✅ CORRECT: Use npm ci in production
docker run my-app
  npm ci        # ✅ Faster, deterministic, exact lockfile match
  node server.js

# ❌ MISTAKE 3: Installing global packages without need
npm install -g eslint  # ❌ Avoid global installs
npx eslint src/        # ✅ Use npx instead (downloads on the fly)

# ❌ MISTAKE 4: Not specifying exact versions in CI
# package.json: "express": "^4.18.0"
# This might resolve to 4.18.0 or 4.19.0 or 4.99.99!
# Use package-lock.json and npm ci to lock it down

# ❌ MISTAKE 5: Committing node_modules to Git
echo "node_modules/" >> .gitignore  # ✅ DO THIS
# node_modules can be gigabytes and changes constantly
```

## 🚀 Best Practices

| # | Practice | Why |
|---|----------|-----|
| 1 | **Commit `package-lock.json`** | Ensures deterministic builds across environments |
| 2 | **Use `npm ci` in CI/CD and Docker** | 5x faster, exact replicas |
| 3 | **Use `npx` instead of global installs** | Always gets latest, no version conflicts |
| 4 | **Add `.npmrc` for registry config** | `registry=https://registry.npmjs.org/` |
| 5 | **Keep dependencies up to date** | `npx npm-check-updates` for major updates |
| 6 | **Minimize dependencies** | Each dep = potential vulnerability + bloat |
| 7 | **Use workspaces for monorepos** | Built-in, no third-party tools needed |
| 8 | **Pin production dependencies** | Let devDependencies float more freely |

## 🎯 Interview Questions

**Q1: What's the difference between `npm install` and `npm ci`?**
`npm install` resolves dependencies and can update `package-lock.json`. `npm ci` (clean install) uses the exact lockfile, deletes `node_modules` first, fails if lockfile is out of sync, and is 2-5x faster.

**Q2: Explain semantic versioning (SemVer) in npm.**
MAJOR.MINOR.PATCH. MAJOR = breaking changes, MINOR = new features (backward compatible), PATCH = bug fixes (backward compatible). `^1.2.3` = compatible with major (1.x), `~1.2.3` = approximately (1.2.x).

**Q3: What is the purpose of `package-lock.json`?**
It locks the exact versions of every dependency and its transitive dependencies. This ensures reproducible builds across different machines and environments.

**Q4: What's the difference between `dependencies` and `devDependencies`?**
`dependencies` are required at runtime (express, mongoose). `devDependencies` are only needed for development (jest, eslint, typescript). Use `--save-dev` or `-D` for dev deps.

## 📝 MCQs

**1. Which command should you use in CI/CD for deterministic builds?**
- A) `npm install`
- B) `npm ci` ✅
- C) `npm update`
- D) `npm link`

**2. What does `^1.2.3` mean in a dependency version?**
- A) Exactly 1.2.3
- B) 1.2.x to <2.0.0 ✅
- C) 1.x.x to <2.0.0
- D) Any version

**3. Which file should NEVER be committed to Git?**
- A) `package.json`
- B) `package-lock.json`
- C) `node_modules/` ✅
- D) `.npmrc`

**4. What command checks for known vulnerabilities in dependencies?**
- A) `npm check`
- B) `npm security`
- C) `npm audit` ✅
- D) `npm verify`

**5. What is the purpose of npm workspaces?**
- A) Sharing code between team members
- B) Managing monorepos with multiple packages ✅
- C) Deploying to cloud servers
- D) Setting up development environments

## 💻 Coding Challenge 1: Create a CLI Tool

Create an npm package that works as a CLI tool:

```bash
mkdir weather-cli
cd weather-cli
npm init -y
```

```javascript
#!/usr/bin/env node
// bin/weather.js

const args = process.argv.slice(2);
const city = args[0] || 'London';

// Simulated weather API call
const weather = {
  London: { temp: 15, condition: 'Cloudy' },
  Tokyo: { temp: 22, condition: 'Sunny' },
  'New York': { temp: 10, condition: 'Rainy' },
};

if (weather[city]) {
  console.log(`🌡️  ${city}: ${weather[city].temp}°C, ${weather[city].condition}`);
} else {
  console.log(`❌ City "${city}" not found`);
  process.exit(1);
}
```

```json
// package.json — Add this field:
{
  "bin": {
    "weather": "./bin/weather.js"
  }
}
```

```bash
# Test it
node bin/weather.js "New York"
# Output: 🌡️  New York: 10°C, Rainy

# Link it globally (for development)
npm link
weather Tokyo
# Output: 🌡️  Tokyo: 22°C, Sunny

# Unlink when done
npm unlink
```

## 💻 Coding Challenge 2: npm Scripts Pipeline

Create a package.json with scripts that chain together:

```json
{
  "scripts": {
    "clean": "rimraf dist/",
    "lint": "eslint src/",
    "test": "jest",
    "build": "tsc",
    "validate": "npm run lint && npm run test",
    "predeploy": "npm run clean && npm run validate && npm run build",
    "deploy": "node scripts/deploy.js"
  }
}
```

Run `npm run deploy`. Does it trigger `predeploy`? What about `prepredeploy`?

## 💻 Coding Challenge 3: Monorepo Workspaces

Create a minimal monorepo with two packages:

```
my-mono/
├── package.json           ← "workspaces": ["packages/*"]
├── packages/
│   ├── math-utils/
│   │   └── package.json   ← @my/math-utils (provides add, multiply)
│   └── string-utils/
│       └── package.json   ← @my/string-utils (provides capitalize)
```

Make the root have a script that imports both packages and uses them.

## 🐛 Debugging Exercise

This project has npm-related issues. Find and fix them:

```bash
# The setup:
cat package.json
# {
#   "name": "buggy-project",
#   "version": "1.0.0",
#   "dependencies": {
#     "express": "^4.18.0",
#     "lodash": "latest"
#   }
# }

# Problem 1: Different developers get different versions
# Developer A: npm install → lodash@4.17.21
# Developer B: npm install → lodash@5.0.0  (hypothetical)

# Problem 2: The build is slow in CI

# Problem 3: npm audit shows vulnerabilities

# Problem 4: Someone committed node_modules/
```

**Fix each issue:**
1. Pin `lodash` to a specific version: `"lodash": "4.17.21"`
2. Use `npm ci` in CI instead of `npm install`
3. Run `npm audit fix` for vulnerabilities
4. Add `node_modules/` to `.gitignore` and remove from git

## 🌍 Real World Problem

**Problem:** Your team's Node.js microservice has 47 direct dependencies and 1,200+ transitive dependencies. The build is slow (3 minutes for `npm install`), and deployments are unreliable because packages resolve differently on different machines.

**Questions:**
1. How would you speed up the build?
2. How would you ensure deterministic dependencies?
3. How would you audit for security vulnerabilities?
4. How would you reduce the dependency count?
5. What tools would you use to visualize the dependency tree?

**Tools to explore:**
- `npm ls --all` — Show entire dependency tree
- `npm ls --production` — Only production deps
- `npm dedupe` — Reduce duplication
- `npx depcheck` — Find unused dependencies
- `npx npm-check` — Interactive updates

## 🏗️ Mini Project: npm Dependency Visualizer

Build a CLI tool that visualizes your project's dependency tree as ASCII art:

```javascript
#!/usr/bin/env node
// dep-tree.js

const { readFileSync, readdirSync, existsSync } = require('fs');
const path = require('path');

function readPackage(dir) {
  const pkgPath = path.join(dir, 'package.json');
  if (!existsSync(pkgPath)) return null;
  return JSON.parse(readFileSync(pkgPath, 'utf-8'));
}

function buildDependencyTree(name, version, dir, depth = 0, visited = new Set()) {
  if (depth > 3 || visited.has(name)) return;
  visited.add(name);
  
  const indent = '  '.repeat(depth);
  const marker = depth === 0 ? '📦' : '├─';
  console.log(`${indent}${marker} ${name}@${version}`);
  
  const modulePath = path.join(dir, 'node_modules', name);
  const pkg = readPackage(modulePath);
  
  if (pkg && pkg.dependencies) {
    for (const [dep, ver] of Object.entries(pkg.dependencies)) {
      const depPkg = readPackage(path.join(modulePath, 'node_modules', dep));
      buildDependencyTree(dep, depPkg?.version || ver, modulePath, depth + 1, visited);
    }
  }
}

// Run
const pkg = readPackage(process.cwd());
if (!pkg) {
  console.error('❌ No package.json found');
  process.exit(1);
}

console.log(`\n📦 Dependency Tree for ${pkg.name}@${pkg.version}\n`);
buildDependencyTree(pkg.name, pkg.version, process.cwd());
console.log();
```

```bash
# Usage
node dep-tree.js

# Output:
# 📦 my-project@1.0.0
#   ├─ express@4.18.2
#     ├─ accepts@1.3.8
#       ├─ mime-types@2.1.35
#       ├─ negotiator@0.6.3
#     ├─ body-parser@1.20.1
#     ...
```

## 📖 Summary

| Concept | Key Takeaway |
|---------|-------------|
| **npm** | Node Package Manager — world's largest code registry |
| **package.json** | Project manifest — dependencies, scripts, metadata |
| **SemVer** | MAJOR.MINOR.PATCH — breaking.feature.fix |
| **package-lock.json** | Locks exact dependency versions for reproducibility |
| **node_modules/** | Where installed packages live (never commit this) |
| **npm ci** | Fast, deterministic install for CI/CD |
| **Workspaces** | Built-in monorepo support |
| **npx** | Run packages without installing globally |

## 📋 Cheat Sheet

```bash
# ─── INITIALIZE ──────────────────────────────────────
npm init -y              # Quick init with defaults
npm init                 # Interactive init

# ─── INSTALL ─────────────────────────────────────────
npm install <pkg>        # Install to dependencies
npm i -D <pkg>           # Install to devDependencies
npm i -g <pkg>           # Global install (avoid)
npm ci                   # Clean install (CI/CD)
npx <pkg>                # Run without installing

# ─── UPDATE / REMOVE ─────────────────────────────────
npm update               # Safe updates (within semver)
npm outdated             # Check for updates
npm uninstall <pkg>      # Remove package
npm prune                # Remove unused packages

# ─── PUBLISH ─────────────────────────────────────────
npm login                # Authenticate
npm version patch        # Bump version (1.0.0 → 1.0.1)
npm publish              # Publish to registry

# ─── SECURITY ────────────────────────────────────────
npm audit                # Check vulnerabilities
npm audit fix            # Auto-fix vulnerabilities

# ─── INFO ────────────────────────────────────────────
npm ls --depth=0         # Top-level packages
npm ls --all             # Full dependency tree
npm view <pkg>           # View package info
npm home <pkg>           # Open package homepage
npm docs <pkg>           # Open package docs
npm fund                 # Show funding information
```

## 📚 Further Reading

- [npm Documentation](https://docs.npmjs.com/)
- [Semantic Versioning Specification](https://semver.org/)
- [npm Workspaces Guide](https://docs.npmjs.com/cli/v7/using-npm/workspaces)
- [The Left-Pad Incident Explained](https://blog.npmjs.org/post/141577284765/kik-left-pad-and-npm)
- [package.json Guide](https://nodejs.org/en/learn/getting-started/anatomy-of-an-http-transaction)

## 🔗 Related Topics

| Topic | Link |
|-------|------|
| Node.js Architecture | [Previous](/DSA-Notes-Problems/nodejs/fundamentals/architecture) |
| Modules: CommonJS vs ESM | [Next](/DSA-Notes-Problems/nodejs/fundamentals/modules-commonjs-vs-esm) |
| Core Built-in Modules | [Core Modules](/DSA-Notes-Problems/nodejs/fundamentals/core-modules) |
| Building & Publishing npm Packages | [Advanced Topics](/DSA-Notes-Problems/nodejs/advanced/publishing-packages) |
| Monorepos & Workspaces | [Project Architecture](/DSA-Notes-Problems/nodejs/production/project-architecture) |
