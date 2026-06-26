---
title: "Best Practices"
description: "HTML/CSS best practices — BEM naming, file organization, common mistakes to avoid, and writing maintainable CSS."
sidebar:
  order: 4
---

## Best Practices

### 🤔 Why Best Practices Matter

Good practices make your code:
- **Readable** — you (and others) can understand it later
- **Maintainable** — easy to change without breaking things
- **Scalable** — works for small projects and large teams
- **Performant** — loads fast and renders smoothly

---

### 🏷️ Naming Conventions — BEM

BEM (Block Element Modifier) is a naming convention that makes CSS class names predictable:

```css
/* Block — the component */
.card { }

/* Element — a part of the block (two underscores) */
.card__title { }
.card__image { }
.card__button { }

/* Modifier — a variation (two hyphens) */
.card--featured { }
.card--dark { }
```

```html
<div class="card card--featured">
  <img class="card__image" src="photo.jpg" alt="">
  <h3 class="card__title">Card Title</h3>
  <button class="card__button">Read More</button>
</div>
```

**Why BEM?**
- Prevents naming conflicts (`.title` vs `.card__title`)
- Shows the relationship between elements
- No nesting needed in CSS (flatter specificity)
- Works with any project, any framework

> **Result:** `.card__title` clearly belongs to the card component. `.card--featured` is a variation of card. No conflicts with other `.title` classes on the page.

---

### 🗂️ File Organization

```
styles/
├── base/
│   ├── reset.css        /* CSS reset / normalize */
│   └── typography.css   /* font sizes, headings */
├── components/
│   ├── button.css
│   ├── card.css
│   └── navbar.css
├── layout/
│   ├── header.css
│   ├── footer.css
│   └── grid.css
├── pages/
│   ├── home.css
│   └── about.css
└── main.css              /* imports all of the above */
```

**Using `@import` in main.css:**
```css
/* main.css */
@import 'base/reset.css';
@import 'base/typography.css';
@import 'components/button.css';
@import 'layout/header.css';
```

> **Result:** Organized files that are easy to find and maintain. Each file has a clear purpose.

---

### 🚫 Common Mistakes to Avoid

**1. Overusing `!important`:**
```css
/* ❌ Bad — breaks the cascade */
.button { background: blue !important; }
/* Now you can't override it without more !important */

/* ✅ Good — use specificity instead */
.button { background: blue; }
.button--primary { background: green; }
```

**2. Using inline styles:**
```html
<!-- ❌ Bad — hard to override, clutters HTML -->
<div style="color: red; margin: 10px;">Text</div>

<!-- ✅ Good — use classes -->
<div class="alert">Text</div>
```

**3. Deeply nested selectors (especially in preprocessors):**
```scss
/* ❌ Bad — high specificity, fragile */
body .main .content .sidebar .widget .title { color: red; }

/* ✅ Good — flat, modular */
.widget__title { color: red; }
```

**4. Not resetting browser defaults:**
```css
/* Add a CSS reset at the top */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```

**5. Using magic numbers:**
```css
/* ❌ Bad — why 17px? */
.card { margin-top: 17px; }

/* ✅ Good — named with a comment if needed */
.card { margin-top: var(--space-md); }  /* 16px — standard spacing */
```

**6. Not testing on real devices:**
- Test on actual mobile phones, not just the browser dev tools
- Test with keyboard-only navigation
- Test with a screen reader (VoiceOver, NVDA)

---

### ✅ Code Quality Checklist

```css
/* ✅ Use custom properties for values that repeat */
:root {
  --primary: #7c3aed;
  --spacing: 16px;
}

/* ✅ Keep specificity low — avoid IDs in CSS */
/* ❌ #header .nav .link a { } */
/* ✅ .nav-link { } */

/* ✅ Write mobile-first media queries */
/* Base = mobile */
@media (min-width: 768px) { /* tablet */ }

/* ✅ Group related properties */
.element {
  /* Positioning */
  position: absolute;
  top: 0;
  right: 0;
  
  /* Box model */
  width: 100px;
  padding: var(--spacing);
  
  /* Visual */
  background: var(--primary);
  border-radius: 8px;
  
  /* Typography */
  color: white;
  font-size: 16px;
}

/* ✅ Add comments for complex logic */
/* This creates a diagonal divider effect */
.section-divider {
  clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
}
```

---

### 📐 CSS Organization with Layers

```css
@layer reset, base, components, utilities;

@layer reset {
  /* Reset styles */
  *, *::before, *::after { box-sizing: border-box; }
}

@layer base {
  /* Typography, colors */
  body { font-family: system-ui, sans-serif; }
}

@layer components {
  /* Card, button, navbar */
  .card { /* ... */ }
}

@layer utilities {
  /* Small helper classes */
  .text-center { text-align: center; }
}
```

> **Result:** The `@layer` rule gives you control over the cascade order. Styles in later layers override earlier ones, regardless of specificity.

---

### In Simple Words

- Use **BEM naming** (`.block__element--modifier`) for clean, conflict-free class names
- **Organize files** by purpose — base, components, layout, pages
- **Avoid `!important`** — use specificity instead
- **Keep specificity low** — don't nest deeply, don't use IDs for styling
- **Use custom properties** for repeated values (colors, spacing)
- **Test** on real devices, with keyboard only, and with a screen reader
