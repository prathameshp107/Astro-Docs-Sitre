---
title: "Colors, Units & Typography"
description: "CSS colors, sizing units (px/em/rem/%), fonts, and text styling properties."
sidebar:
  order: 2
---

## Colors, Units & Typography

### 🤔 CSS Colors

There are several ways to specify colors in CSS:

```css
/* Named colors */
color: red;
color: darkblue;
color: tomato;

/* Hex codes (most common) */
color: #ff0000;   /* red */
color: #00ff00;   /* green */
color: #0000ff;   /* blue */
color: #333;      /* dark gray (shorthand — 3 chars) */
color: #ff000080; /* red at 50% opacity (8-digit hex) */

/* RGB / RGBA */
color: rgb(255, 0, 0);           /* red */
color: rgba(255, 0, 0, 0.5);     /* red at 50% opacity */

/* HSL / HSLA */
color: hsl(0, 100%, 50%);        /* red */
color: hsla(0, 100%, 50%, 0.5);  /* red at 50% opacity */
```

| Method | When to use |
|--------|-------------|
| Hex `#ff0000` | Quick and common |
| RGBA `rgba(r,g,b,a)` | Need opacity (transparency) |
| HSL `hsl(hue, sat, light)` | Easy to tweak shades manually |
| Named `tomato` | Simple prototyping |

> **Result:** All methods produce the same color. RGBA/HSLA allow transparency.

---

### 📏 CSS Units

**Absolute units** (fixed size):
```css
p { font-size: 16px; }   /* pixels — most common for screens */
```

**Relative units** (based on something else):
```css
/* Relative to font size */
p { font-size: 1.5em; }    /* 1.5× the parent's font size */
p { font-size: 1.5rem; }   /* 1.5× the root (html) font size */

/* Relative to viewport */
div { width: 50vw; }       /* 50% of viewport width */
div { height: 50vh; }      /* 50% of viewport height */

/* Percentage */
div { width: 50%; }        /* 50% of the parent element's width */
```

```css
/* Real-world example */
html { font-size: 16px; }  /* default */

.parent { font-size: 20px; }
.parent p { font-size: 2em; }  /* = 40px (2 × 20px parent) */

.child p { font-size: 2rem; }  /* = 32px (2 × 16px root) */
```

> **Result:** `em` scales with the parent, `rem` scales with the root. `vw`/`vh` adapt to screen size.

---

### How to Choose a Unit

| Unit | Best for |
|------|----------|
| `px` | Borders, shadows, small precise values |
| `rem` | Font sizes (accessible — respects user's browser settings) |
| `em` | Padding/margin on components (scales with font size) |
| `%` | Widths, heights of containers |
| `vw` / `vh` | Full-screen sections, hero images |

---

### 🔤 Fonts & Typography

**Basic font properties:**
```css
body {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  font-weight: normal;   /* normal, bold, 100-900 */
  font-style: normal;     /* normal, italic */
  line-height: 1.6;       /* 1.6× the font size (good for readability) */
}
```

**System font stacks:**
```css
/* Safe fallback chain */
body {
  font-family: -apple-system, BlinkMacSystemFont, 
    "Segoe UI", Roboto, Oxygen, Ubuntu, 
    "Helvetica Neue", Arial, sans-serif;
}
```

**Text alignment & decoration:**
```css
h1 {
  text-align: center;    /* left, center, right, justify */
  text-transform: uppercase; /* uppercase, lowercase, capitalize */
  text-decoration: underline; /* underline, line-through, none */
  letter-spacing: 2px;   /* space between characters */
  word-spacing: 4px;     /* space between words */
}
```

> **Result:** The text will be centered, uppercase, underlined with 2px letter spacing.

---

### 🖋️ Google Fonts

```html
<!-- In <head> of HTML -->
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
```

```css
body {
  font-family: 'Roboto', sans-serif;
}
```

> **Result:** The browser downloads Roboto font and renders text with it instead of the default font.

---

### In Simple Words

- Colors use **hex** (`#ff0000`), **RGBA** (with opacity), or **named** colors
- **`px`** is absolute; **`rem`** scales with root font (best for accessibility)
- **`em`** scales with parent font; **`%`** , **`vw`** , **`vh`** are relative to parent or viewport
- Use `font-family`, `font-size`, `font-weight`, and `line-height` for typography
- Always provide **fallback fonts** (`font-family: Roboto, Arial, sans-serif`)
