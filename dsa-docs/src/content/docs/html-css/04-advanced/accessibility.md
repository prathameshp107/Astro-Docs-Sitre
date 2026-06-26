---
title: "Accessibility (a11y)"
description: "Web accessibility ensures websites work for everyone — alt text, ARIA, keyboard navigation, color contrast, and semantic HTML."
sidebar:
  order: 3
---

## Accessibility (a11y)

### 🤔 What is Web Accessibility?

Web accessibility (a11y) means designing websites that **everyone can use**, including people with disabilities.

Think of it like a **building with ramps**:
- Stairs work for most people, but exclude wheelchair users
- A ramp helps everyone — parents with strollers, delivery workers, etc.
- Accessible websites work for screen readers, keyboard-only users, people with low vision, and more

---

### ♿ Why Accessibility Matters

**1. Legal requirement** — Many countries have laws requiring web accessibility (ADA, WCAG)
**2. More users** — ~15% of the world's population has some disability
**3. Better for everyone** — Captions help in noisy environments, high contrast helps in sunlight
**4. SEO boost** — Accessible code is cleaner and search engines understand it better

---

### 🖼️ Alt Text on Images

```html
<!-- ❌ Bad — no alt text -->
<img src="chart.png">

<!-- ✅ Good — describes the image -->
<img src="chart.png" alt="Bar chart showing sales grew 40% in Q3">

<!-- ✅ Decorative image — empty alt tells screen readers to skip it -->
<img src="decoration.png" alt="" role="presentation">
```

**Rules for alt text:**
- Describe the **content and function** of the image
- Be concise but descriptive
- Use `alt=""` for decorative images (screen readers ignore them)
- Never use "image of" or "picture of" — screen readers already announce it's an image

> **Result:** Screen readers read the alt text aloud. If the image fails to load, the alt text is displayed instead.

---

### 🧩 ARIA Basics

ARIA (Accessible Rich Internet Applications) adds accessibility info when HTML semantics aren't enough:

```html
<!-- ARIA labels for icons -->
<button aria-label="Close dialog">
  <span aria-hidden="true">✕</span>
</button>

<!-- ARIA live region — announces dynamic updates -->
<div aria-live="polite" id="status-message">
  Item added to cart!
</div>

<!-- ARIA roles describe the purpose of an element -->
<div role="navigation" aria-label="Main navigation">
  <a href="/">Home</a>
  <a href="/about">About</a>
</div>
```

**When to use ARIA:**
- ✅ When HTML semantics aren't enough (custom controls)
- ✅ For dynamic content updates (loading, errors)
- ❌ **Don't** use ARIA when a semantic HTML element already works (`<nav>` instead of `role="navigation"`)

> **Result:** Screen readers announce "Close dialog" when focusing the button, and read updates in the live region.

---

### ⌨️ Keyboard Navigation

Every interactive element must be reachable and usable with the keyboard:

```css
/* Always show focus indicators for keyboard users */
:focus-visible {
  outline: 3px solid #7c3aed;
  outline-offset: 2px;
}

/* ❌ Never do this — hides focus from keyboard users */
:focus { outline: none; }
```

**Tab order:**
```html
<!-- Tab order follows the DOM — no need for tabindex usually -->

<!-- tabindex="-1" makes it focusable by script but not tab -->
<div tabindex="-1" id="modal">Modal content</div>

<!-- tabindex="0" adds it to the natural tab order -->
<span tabindex="0" role="button">Custom button</span>
```

> **Result:** Users can Tab through all interactive elements and see a clear focus indicator.

---

### 🎨 Color Contrast

Text must have enough contrast against its background:

```css
/* ❌ Bad — light gray text on white */
.light-text {
  color: #cccccc;  /* contrast ratio ~1.5:1 — unreadable */
  background: white;
}

/* ✅ Good — dark text on white */
.normal-text {
  color: #333333;  /* contrast ratio ~12:1 — very readable */
  background: white;
}
```

**WCAG minimum contrast ratios:**
| Level | Normal text | Large text (18px+ bold / 24px+) |
|-------|-------------|----------------------------------|
| AA | 4.5:1 | 3:1 |
| AAA | 7:1 | 4.5:1 |

**Tools:** Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) to verify your colors.

---

### 📋 Practical Accessibility Checklist

```html
<!-- 1. Use semantic HTML -->
<nav>...</nav>
<main>...</main>
<button>Click Me</button>  <!-- instead of <div role="button"> -->

<!-- 2. Always label inputs -->
<label for="email">Email:</label>
<input type="email" id="email">

<!-- 3. Include skip-to-content link -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- 4. Use descriptive link text -->
<!-- ❌ Bad -->
<a href="/article/123">Click here</a>
<!-- ✅ Good -->
<a href="/article/123">Read more about web accessibility</a>

<!-- 5. Announce status changes -->
<div aria-live="assertive" aria-atomic="true">
  {{errorMessage}}
</div>
```

---

### In Simple Words

- **Accessibility** = making websites usable by everyone, including people with disabilities
- **Alt text** on images describes what's shown — use `alt=""` for decorative images
- **ARIA** adds accessibility info when HTML isn't enough (but prefer semantic HTML first)
- Always show a **focus indicator** for keyboard users — never hide `:focus`
- **Color contrast** must be at least 4.5:1 for normal text (WCAG AA)
- Use semantic HTML, label inputs, and provide descriptive link text
