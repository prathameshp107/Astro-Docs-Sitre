---
title: "HTML & CSS Interview Questions"
description: "Common HTML and CSS interview questions with clear, beginner-friendly answers and examples."
sidebar:
  order: 1
---

## HTML & CSS Interview Questions

### HTML Questions

---

**Q: What is the difference between `div` and `span`?**

`<div>` is a **block-level** element — it takes full width and starts on a new line. `<span>` is an **inline** element — it flows with the text and doesn't break lines.

```html
<div>This takes full width</div>
<div>This goes below</div>
<span>These sit</span>
<span>next to each other</span>
```

---

**Q: What does semantic HTML mean? Give examples.**

Semantic HTML uses tags that describe the **meaning** of content, not just its appearance.

```html
<!-- Non-semantic -->
<div class="header">Site title</div>

<!-- Semantic -->
<header>Site title</header>
```

Other semantic tags: `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`. They help accessibility (screen readers) and SEO.

---

**Q: How do you make a website accessible?**

- Use **semantic HTML** elements (nav, main, button, etc.)
- Add **alt text** to images
- Use **labels** on form inputs
- Ensure sufficient **color contrast** (4.5:1 minimum)
- Support **keyboard navigation** (visible focus indicators)
- Use **ARIA** attributes when needed (`aria-label`, `aria-live`)

---

**Q: What is the difference between `href` and `src`?**

- `href` (Hypertext Reference) — used in `<a>` and `<link>` tags. The browser **does not load** the resource; it creates a link to it.
- `src` (Source) — used in `<img>`, `<script>`, `<video>` tags. The browser **loads and embeds** the resource.

```html
<a href="/page.html">Link to page</a>
<img src="photo.jpg" alt="Photo">
```

---

**Q: Explain HTML5 form validation attributes.**

| Attribute | What it does |
|-----------|-------------|
| `required` | Field must be filled |
| `min` / `max` | Number range limits |
| `minlength` / `maxlength` | Character count limits |
| `pattern` | Regex pattern (e.g., `pattern="[A-Za-z]+"`) |
| `type="email"` | Must be valid email format |
| `type="url"` | Must be valid URL format |

---

**Q: What is the `data-*` attribute used for?**

Custom data attributes store extra information in HTML that JavaScript can access:

```html
<button data-user-id="123" data-role="admin">Edit User</button>
```

```javascript
const btn = document.querySelector('button');
console.log(btn.dataset.userId); // "123"
```

---

**Q: How does the browser render a webpage?**

1. Downloads HTML, parses it → builds **DOM Tree**
2. Finds linked CSS, parses it → builds **CSSOM Tree**
3. Combines DOM + CSSOM → **Render Tree** (only visible elements)
4. Computes layout (positions and sizes) → **Layout/Reflow**
5. Paints pixels to screen → **Paint**

---

### CSS Questions

---

**Q: What is the CSS Box Model?**

Every element is a rectangular box with four layers (inside → out):
1. **Content** — the actual content (text, image)
2. **Padding** — space inside the border
3. **Border** — the visible edge
4. **Margin** — space outside the border

---

**Q: What is the difference between `box-sizing: content-box` and `border-box`?**

- **`content-box`** (default): `width` only applies to the content area. Padding and border are added **outside**.
- **`border-box`**: `width` includes content + padding + border. The content shrinks to fit.

```css
/* With content-box: total width = 200 + 20 + 20 = 240px */
.box { width: 200px; padding: 10px; border: 5px; }

/* With border-box: total width = 200px (content = 170px) */
.box { width: 200px; padding: 10px; border: 5px; box-sizing: border-box; }
```

---

**Q: Explain CSS specificity.**

Specificity determines which rule wins when multiple rules target the same element:

```
Inline styles  → 1000 points
ID selectors   →  100 points
Class selectors →   10 points
Element selectors →  1 point
```

```css
#header { color: red; }     /* 100 — wins */
.title { color: blue; }     /* 10 */
h1 { color: green; }        /* 1 */
```

---

**Q: How is Flexbox different from Grid?**

| Flexbox | Grid |
|---------|------|
| One-dimensional (row OR column) | Two-dimensional (rows AND columns) |
| Content-driven | Container-driven |
| Best for components (nav, toolbar) | Best for page layout |
| Items push against each other | Cells are independent |

---

**Q: Explain `position` values in CSS.**

| Value | Behavior |
|-------|----------|
| `static` | Default — normal document flow |
| `relative` | Offset from its normal position |
| `absolute` | Positioned relative to nearest positioned ancestor |
| `fixed` | Positioned relative to viewport (stays on scroll) |
| `sticky` | Normal flow until scroll threshold, then sticks |

---

**Q: What is the difference between `em` and `rem`?**

- **`em`** — relative to the **parent** element's font size
- **`rem`** — relative to the **root** (`html`) font size

```css
.parent { font-size: 20px; }
.child-em { font-size: 1.5em; }   /* = 30px (1.5 × 20px) */
.child-rem { font-size: 1.5rem; } /* = 24px (1.5 × 16px root default) */
```

`rem` is usually preferred because it's predictable and respects the user's browser font-size settings.

---

**Q: How do you center a div?**

**Horizontally:**
```css
/* Block element */
.center { margin: 0 auto; }

/* Flexbox */
.parent { display: flex; justify-content: center; }

/* Grid */
.parent { display: grid; place-items: center; }
```

**Vertically:**
```css
/* Flexbox */
.parent { display: flex; align-items: center; }

/* Grid */
.parent { display: grid; place-items: center; }
```

**Both (holy grail):**
```css
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
/* Or with Grid: place-items: center; */
```

---

**Q: What is a CSS pseudo-class? Give examples.**

A pseudo-class selects elements in a **specific state**:

```css
a:hover { color: red; }           /* mouse hovering */
input:focus { border-color: blue; } /* keyboard focus */
li:first-child { font-weight: bold; } /* first child */
li:nth-child(odd) { background: #f5f5f5; } /* odd items */
```

---

**Q: What are CSS custom properties (variables)?**

Variables defined with `--name` and used with `var()`:

```css
:root {
  --primary: #7c3aed;
  --spacing: 16px;
}

.button {
  background: var(--primary);
  padding: var(--spacing);
}
```

They cascade, can be changed with media queries, and are perfect for theming.

---

**Q: How do you make a website responsive?**

1. Use **fluid units** (`%`, `vw`, `rem`) instead of fixed pixels
2. Add **media queries** for different breakpoints
3. Use **Flexbox/Grid** for flexible layouts
4. Set `max-width: 100%` on images
5. Use `clamp()` for fluid typography
6. Include the **viewport meta tag**: `<meta name="viewport" content="width=device-width">`

---

**Q: What is the difference between `display: none` and `visibility: hidden`?**

- `display: none` — element is **removed** from the document flow (no space taken)
- `visibility: hidden` — element is **invisible** but still takes up space

```css
.hide { display: none; }        /* completely gone */
.invisible { visibility: hidden; } /* invisible but space remains */
```

---

**Q: Explain `z-index` and stacking context.**

`z-index` controls which element appears **on top** when they overlap:

```css
.box1 { position: absolute; z-index: 1; } /* behind */
.box2 { position: absolute; z-index: 2; } /* on top */
```

- Only works on **positioned** elements (not `static`)
- Higher number = closer to the user
- Each positioned parent creates a **stacking context** — z-index values are scoped inside it

---

### In Simple Words

- Semantic HTML, accessibility, and the box model are **core concepts** every interviewer expects
- Know the difference between **Flexbox (1D)** and **Grid (2D)**
- Understand **specificity** — inline > ID > class > element
- Practice **centering** — horizontally, vertically, and both
- Be comfortable with **responsive design** — media queries, fluid units, mobile-first
