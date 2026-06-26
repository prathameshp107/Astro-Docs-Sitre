---
title: "TypeScript tsconfig.json Reference"
description: "Complete reference for tsconfig.json: all compiler options explained with recommended configurations for different project types."
---

## tsconfig.json Reference

### What is tsconfig.json?

`tsconfig.json` is the configuration file for the TypeScript compiler. It controls how TypeScript compiles your code, which files are included, and what checks are performed.

### Recommended Configuration

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "sourceMap": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

### Key Options Explained

| Option | Purpose | Recommendation |
|--------|---------|---------------|
| `target` | JS output version | `ES2022` |
| `module` | Module system | `ESNext` |
| `strict` | All strict checks | `true` |
| `outDir` | Output directory | `./dist` |
| `rootDir` | Source directory | `./src` |
| `declaration` | Generate .d.ts files | `true` for libraries |

### Project-Specific Configs

**React App:**
```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "lib": ["ES2022", "DOM", "DOM.Iterable"]
  }
}
```

**Node.js App:**
```json
{
  "compilerOptions": {
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "types": ["node"]
  }
}
```

### Interview Questions

**Easy:** What is tsconfig.json used for?

**Medium:** What does `strict: true` enable?

**Hard:** How is configuration different for React vs Node.js projects?
