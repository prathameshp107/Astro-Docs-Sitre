---
title: "Variables & Modern CSS"
description: "CSS custom properties (variables), modern functions like clamp(), and container queries for component-level responsive design."
sidebar:
  order: 2
---

## Variables & Modern CSS

### 🤔 CSS Custom Properties (Variables)

CSS variables store values that you can reuse throughout your stylesheet.

Think of it like **naming a color** so you don't have to remember the hex code:
- Define once: `--primary: #7c3aed;`
- Use everywhere: `color: var(--primary);`

```css
:root {
  --primary: #7c3aed;
  --primary-light: #a78bfa;
  --gray-100: #f3f4f6;
  --gray-900: #111827;
  --font-main: 'Inter', sans-serif;
  --spacing: 16px;
  --radius: 8px;
}
```

---

### 🎨 Defining & Using Variables

```css
:root {
  /* Colors */
  --primary: #7c3aed;
  --secondary: #f59e0b;
  --text: #1f2937;
  --bg: #ffffff;
  
  /* Spacing */
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  
  /* Typography */
  --font-size-base: 16px;
  --font-size-lg: 24px;
  
  /* Effects */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.1);
  --radius: 8px;
}

/* Using variables */
.card {
  background: var(--bg);
  color: var(--text);
  padding: var(--space-md);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
}

.button {
  background: var(--primary);
  padding: var(--space-sm) var(--space-md);
  font-size: var(--font-size-base);
  border-radius: var(--radius);
}
```

**Fallback values:**
```css
.element {
  color: var(--color, #333); /* uses #333 if --color is not defined */
}
```

> **Result:** Variables make it easy to change the entire theme by updating values in one place.

---

### 🌓 Light/Dark Theme with Variables

```css
:root {
  --bg: #ffffff;
  --text: #1f2937;
  --card: #f3f4f6;
}

[data-theme="dark"] {
  --bg: #1f2937;
  --text: #f3f4f6;
  --card: #374151;
}

body {
  background: var(--bg);
  color: var(--text);
}

.card {
  background: var(--card);
}
```

> **Result:** Switching the `data-theme` attribute on `<html>` instantly changes all colors. No extra CSS needed.

---

### 📐 Modern CSS Functions

**`clamp()` — fluid sizing between min and max:**
```css
/* Font size: min 16px, ideal 2vw, max 24px */
h1 { font-size: clamp(16px, 2vw, 24px); }

/* Padding: min 12px, ideal 3vw, max 32px */
.card { padding: clamp(12px, 3vw, 32px); }
```

**`min()` and `max()`:**
```css
.container {
  width: min(90%, 1200px);  /* 90% or 1200px — whichever is smaller */
}

.title {
  font-size: max(16px, 3vw); /* at least 16px, grows with viewport */
}
```

> **Result:** Fluid sizing without media queries. The value adapts smoothly between the min and max.

---

### 📦 Container Queries

Container queries let an element respond to its **own container's size**, not the viewport.

```css
.card-container {
  container-type: inline-size;
  container-name: card;
}

/* Styles apply when the container is wider than 400px */
@container card (min-width: 400px) {
  .card {
    display: flex;       /* horizontal layout when enough space */
    gap: 16px;
  }
}

/* Default — stacked layout */
.card {
  display: block;
}
```

> **Result:** Cards automatically switch from stacked to side-by-side based on their container width, not the viewport. This works inside any layout — sidebar, main content, or full screen.

---

### Container Queries vs Media Queries

| Feature | Media Queries | Container Queries |
|---------|--------------|-------------------|
| Responds to | Viewport size | Parent container size |
| Reusable component | No (depends on page) | **Yes!** |
| Best for | Page layout | Components, widgets |
| Browser support | All browsers | Modern browsers (2023+) |

---

### 🖌️ Other Modern CSS Features

**`aspect-ratio`:**
```css
.video {
  aspect-ratio: 16 / 9;   /* automatically sets height */
  width: 100%;
}

.avatar {
  aspect-ratio: 1;         /* perfect square */
  border-radius: 50%;
}
```

**`accent-color` (form controls):**
```css
input[type="checkbox"],
input[type="radio"],
input[type="range"] {
  accent-color: #7c3aed;  /* changes the color of the control */
}
```

**`scroll-behavior`:**
```css
html {
  scroll-behavior: smooth; /* smooth anchor scrolling */
}
```

---

### In Simple Words

- CSS **custom properties** (`--name: value`) store reusable values like colors and spacing
- Use `var(--name)` to reference them — great for **themes** (light/dark)
- **`clamp()`** creates fluid sizes that adapt between min and max (no media query needed)
- **Container queries** let elements respond to their container's size, not the viewport
- Modern CSS features like `aspect-ratio`, `accent-color`, and `scroll-behavior` replace old hacks
