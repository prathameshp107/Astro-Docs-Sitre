---
title: "Plugins & Best Practices"
description: "Official Tailwind plugins, common mistakes, and best practices for clean, maintainable code."
sidebar:
  order: 3
---

## Plugins & Best Practices

Tailwind has official plugins, and there are well-established best practices for keeping your code clean, performant, and maintainable.

> **Analogy:** Plugins are like power tools for a workshop — they extend what you can build. Best practices are the safety rules that keep the workshop running smoothly.

---

### Official Plugins

**1. `@tailwindcss/forms`** — Better form element defaults
```bash
npm install @tailwindcss/forms
```

```javascript
// tailwind.config.js
plugins: [require('@tailwindcss/forms')],
```

```html
<!-- Now inputs look consistent across browsers without extra classes -->
<input type="text" class="rounded-md border-gray-300" />
<select class="rounded-md border-gray-300"></select>
```

**2. `@tailwindcss/typography`** — Beautiful prose styles
```bash
npm install @tailwindcss/typography
```

```javascript
// tailwind.config.js
plugins: [require('@tailwindcss/typography')],
```

```html
<!-- Prose class for markdown/blog content -->
<article class="prose prose-lg prose-blue max-w-none">
  <h1>Blog Title</h1>
  <p>This content gets beautiful typography automatically.</p>
  <blockquote>Blockquotes look great.</blockquote>
  <code>Code blocks too</code>
</article>
```

**3. `@tailwindcss/aspect-ratio`** — Aspect ratio containers
```bash
npm install @tailwindcss/aspect-ratio
```

```html
<div class="aspect-video">
  <iframe class="w-full h-full" src="video.mp4"></iframe>
</div>
```

**4. `@tailwindcss/container-queries`** — Container-based responsive design
```bash
npm install @tailwindcss/container-queries
```

```html
<div class="@container">
  <div class="@lg:grid-cols-2 grid grid-cols-1">
    Responds to container width, not viewport
  </div>
</div>
```

---

### Best Practices

#### 1. Keep Your Config Clean

```javascript
// ✅ Good: well-organized config
theme: {
  extend: {
    colors: {
      brand: { ... },      // Brand colors grouped
      semantic: { ... },   // Semantic colors
    },
    spacing: { ... },      // Custom spacing grouped
  },
}

// ❌ Bad: scattered arbitrary values everywhere
// <div class="bg-[#6366f1] text-[#ffffff] p-[13px]">
```

#### 2. Establish a Class Order Convention

```html
<!-- ✅ Consistent ordering: layout → spacing → visual → typography → variants -->
<button class="
  flex items-center justify-center   /* 1. Layout (display, flex, grid) */
  px-6 py-3 mx-auto                  /* 2. Spacing (margin, padding) */
  bg-blue-600 text-white rounded-lg  /* 3. Visual (bg, color, border, shadow) */
  font-semibold text-base            /* 4. Typography */
  hover:bg-blue-700 focus:ring-2     /* 5. Variants */
">
  Click
</button>
```

#### 3. Use a Formatter

```bash
# Install Prettier with Tailwind plugin
npm install -D prettier prettier-plugin-tailwindcss
```

```json
// .prettierrc
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

The plugin **automatically sorts** Tailwind classes in the recommended order!

#### 4. Responsive Design — Mobile First

```html
<!-- ✅ Good: mobile first, add breakpoints to enhance -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

<!-- ❌ Bad: desktop first with lots of overrides -->
<div class="grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1">
```

#### 5. Keep Components Small

```html
<!-- ✅ Good: small focused components -->
<Button variant="primary" size="lg">Submit</Button>
<Card>
  <CardTitle>Title</CardTitle>
</Card>

<!-- ❌ Bad: huge monolithic templates with 50+ classes -->
<div class="...40 classes...">
  <div class="...30 classes...">
```

---

### Common Mistakes

| Mistake | Why It's a Problem | Fix |
|---------|-------------------|-----|
| **Overusing arbitrary values** | Breaks design consistency | Add repeated values to config |
| **No Prettier plugin** | Messy class ordering | Use `prettier-plugin-tailwindcss` |
| **Deep nesting with `@apply`** | Hard to debug | Keep `@apply` shallow |
| **Forgetting `content` paths** | Build generates no CSS | Check `content` array in config |
| **Not purging in production** | CSS file is huge | Tailwind purges by default — don't disable |
| **Overriding everything** | Losing Tailwind's consistency | Use `extend` instead of replacing |
| **Ignoring mobile-first** | Complex responsive code | Start with mobile, add breakpoints |
| **Too many variants** | Hard-to-read HTML | Keep 2-3 variants per element max |

---

### Build Performance Tips

```mermaid
flowchart TB
    Start["Tailwind Build"] -> Check{"Large project<br/>(1000s of files)?"}
    Check -->|No| Normal["Default build<br/>Fast enough"]
    Check -->|Yes| Optimize["Optimize build"]
    
    Optimize --> Tips1["1. Narrow content paths<br/>content: ['./src/**/*.html']"]
    Optimize --> Tips2["2. Disable JIT if needed<br/>(rarely)"]
    Optimize --> Tips3["3. Use --minify in production<br/>tailwindcss -o output.css --minify"]

    style Start fill:#7c3aed,color:#fff
    style Normal fill:#059669,color:#fff
    style Optimize fill:#f59e0b,color:#fff
```

---

### In Simple Words

- Official plugins: **forms**, **typography**, **aspect-ratio**, **container-queries**
- **Sort classes** consistently: layout → spacing → visual → typography → variants
- Use **Prettier** with `prettier-plugin-tailwindcss` for automatic sorting
- **Mobile-first** — start with small screens, add breakpoints to enhance
- **Extract components** for repeated patterns; keep base utilities inline
- Use `extend` in config to add to defaults; avoid arbitrary values for repeated styles
- Keep **content paths narrow** for faster builds
