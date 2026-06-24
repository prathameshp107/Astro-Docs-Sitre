---
title: "Display & Positioning"
description: "CSS display modes (block, inline, inline-block) and positioning schemes (static, relative, absolute, fixed, sticky) with z-index."
sidebar:
  order: 4
---

## Display & Positioning

### 🤔 The `display` Property

The `display` property controls how an element behaves in the page flow.

**Block elements** — take full width, stack vertically:
```css
.block {
  display: block; /* default for div, h1, p */
  width: 200px;
  margin-bottom: 10px;
}
```

**Inline elements** — flow with text, don't break lines:
```css
.inline {
  display: inline; /* default for span, a, strong */
  /* Width and height are IGNORED */
}
```

**Inline-block** — inline but respects width/height:
```css
.inline-block {
  display: inline-block;
  width: 150px;    /* Works! Unlike inline */
  height: 50px;    /* Works! Unlike inline */
  margin: 5px;     /* Works too */
}
```

```html
<div>Block 1 (full width)</div>
<div>Block 2 (starts on new line)</div>
<span>Inline (sits next to)</span>
<span>next text</span>
<button style="display: inline-block;">Inline-block</button>
```

> **Result:** Block elements stack. Inline elements flow in a line. Inline-block elements sit in a line but can have custom widths.

---

### 📊 Display Comparison

| Display | New line? | Respects width/height? | Common uses |
|---------|-----------|----------------------|-------------|
| `block` | Yes | Yes | Divs, sections, paragraphs |
| `inline` | No | **No** | Spans, links, bold text |
| `inline-block` | No | Yes | Buttons, nav items, cards |
| `none` | — | — | Hides element completely |

---

### 🧭 The `position` Property

Positioning lets you break elements out of the normal flow.

**Static** (default — normal flow):
```css
.element {
  position: static; /* default — nothing special */
}
```

**Relative** — offset from its normal position:
```css
.relative-box {
  position: relative;
  top: 20px;      /* moved down 20px from where it would be */
  left: 30px;     /* moved right 30px */
}
```

> **Result:** The element shifts 20px down and 30px right from its normal spot. Other elements are not affected.

**Absolute** — positioned relative to the nearest positioned ancestor:
```css
.parent {
  position: relative; /* becomes the anchor point */
  width: 300px;
  height: 200px;
  background: lightgray;
}

.child {
  position: absolute;
  top: 10px;
  right: 10px;
  background: red;
  padding: 5px;
}
```

```html
<div class="parent">
  Parent
  <div class="child">Top-right corner</div>
</div>
```

> **Result:** The child is placed 10px from the top and 10px from the right of the parent. If no ancestor has `position: relative`, it positions relative to the page.

**Fixed** — positioned relative to the viewport (stays on scroll):
```css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

> **Result:** The navbar stays at the top of the screen, even when the user scrolls down.

**Sticky** — normal until scroll, then sticks:
```css
.section-header {
  position: sticky;
  top: 0;           /* sticks when it hits the top */
  background: white;
  z-index: 10;
}
```

> **Result:** The header scrolls normally until it reaches the top of the viewport, then sticks there.

---

### 📐 Positioning Cheatsheet

| Value | Positioned relative to | Scroll behavior |
|-------|----------------------|-----------------|
| `static` | Normal flow | Scrolls normally |
| `relative` | Itself (offset from normal position) | Scrolls normally |
| `absolute` | Nearest positioned ancestor | Scrolls with page |
| `fixed` | Viewport (browser window) | **Stays in place** |
| `sticky` | Normal flow → viewport when threshold hit | Sticks when scrolled past |

---

### 📚 The `z-index` Property

When elements overlap, `z-index` controls which one is **on top**:

```css
.box1 {
  position: absolute;
  top: 50px;
  left: 50px;
  width: 200px;
  height: 200px;
  background: red;
  z-index: 1;       /* lower number = behind */
}

.box2 {
  position: absolute;
  top: 100px;
  left: 100px;
  width: 200px;
  height: 200px;
  background: blue;
  z-index: 2;       /* higher number = in front */
}
```

> **Result:** Box2 (blue) appears on top of Box1 (red) because it has a higher `z-index`.

**Important rules:**
- `z-index` only works on **positioned** elements (not `static`)
- Higher number = closer to the user (in front)
- Default is `auto` (same as `0`)
- Negative values go behind the page content
- Each positioned parent creates a **stacking context** — z-index inside it is scoped

---

### In Simple Words

- `display: block` — full width, stacks vertically (div, h1, p)
- `display: inline` — flows with text, no width/height (span, a)
- `display: inline-block` — flows inline but respects width/height
- `position: relative` — offset from normal spot
- `position: absolute` — positioned relative to nearest positioned parent
- `position: fixed` — stays on screen while scrolling (navbars)
- `position: sticky` — scrolls then sticks when it hits the top
- `z-index` controls stacking order (higher = on top) — only works on positioned elements
