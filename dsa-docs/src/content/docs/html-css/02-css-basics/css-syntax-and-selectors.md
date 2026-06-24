---
title: "CSS Syntax & Selectors"
description: "CSS rules, selectors, specificity, and the cascade — how styles are applied to HTML elements."
sidebar:
  order: 1
---

## CSS Syntax & Selectors

### 🤔 What is CSS?

CSS stands for **Cascading Style Sheets**. It controls how HTML elements look — colors, sizes, spacing, layout, and more.

Think of CSS like **painting and decorating a house**:
- HTML is the skeleton (walls, rooms)
- CSS is the paint, wallpaper, curtains, and furniture arrangement

```css
/* This is a CSS rule */
h1 {
  color: blue;
  font-size: 32px;
}
```

A CSS rule has three parts:
- **Selector** — which HTML element to style (`h1`)
- **Property** — what aspect to change (`color`)
- **Value** — how to change it (`blue`)

---

### 📝 CSS Syntax

```css
selector {
  property: value;
  property: value;
}
```

Example:
```css
p {
  color: #333;
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 10px;
}
```

> **Result:** All `<p>` elements on the page will have dark gray text, 16px size, 1.5 line height, and 10px bottom margin.

---

### 🔍 Basic Selectors

```css
/* Element selector — targets all <h2> elements */
h2 {
  color: purple;
}

/* Class selector — targets elements with class="highlight" */
.highlight {
  background-color: yellow;
}

/* ID selector — targets the element with id="banner" */
#banner {
  background-color: navy;
  color: white;
}

/* Universal selector — targets EVERY element */
* {
  margin: 0;
  padding: 0;
}

/* Group selector — targets multiple elements */
h1, h2, h3 {
  font-family: Arial, sans-serif;
}
```

```html
<h2>This is purple</h2>
<p class="highlight">This has a yellow background</p>
<div id="banner">White text on navy background</div>
```

> **Result:** Each element is styled according to its selector. Classes can be reused, IDs are unique.

---

### 🧩 Combinators

Select elements based on their relationship in the HTML tree:

```css
/* Descendant — all <a> inside <nav> (any depth) */
nav a {
  text-decoration: none;
}

/* Child — direct children only */
ul > li {
  list-style: square;
}

/* Adjacent sibling — element immediately after */
h2 + p {
  font-weight: bold;
}

/* General sibling — all siblings after */
h2 ~ p {
  color: gray;
}
```

```html
<nav>
  <a href="#">Link</a>          <!-- styled: descendant -->
  <div>
    <a href="#">Deep link</a>    <!-- styled: descendant (any depth) -->
  </div>
</nav>
<ul>
  <li>Item</li>                  <!-- styled: child only -->
</ul>
```

> **Result:** Combinators let you style elements based on where they appear in the structure.

---

### ⚖️ Specificity

When multiple CSS rules target the same element, **specificity** decides which wins.

**Specificity weight (from strongest to weakest):**

```mermaid
flowchart TB
    subgraph Weights
        Inline[Inline Styles<br/>style=\"...\"] 
        ID[ID Selectors<br/>#header]
        Class[Class / Attribute / Pseudo-class<br/>.nav, [type], :hover]
        Element[Element / Pseudo-element<br/>div, ::before]
    end
    
    Inline --> |1000 points| Winner[Wins! 🏆]
    ID --> |100 points| Winner
    Class --> |10 points| Maybe
    Element --> |1 point| Maybe
    
    style Inline fill:#ef4444,color:#fff
    style ID fill:#f59e0b,color:#fff
    style Class fill:#3b82f6,color:#fff
    style Element fill:#10b981,color:#fff
    style Winner fill:#7c3aed,color:#fff
```

**Example:**
```css
/* Specificity: 0,0,1,1 */
.nav a { color: blue; }

/* Specificity: 0,1,0,0 — wins! */
#header { color: red; }
```

```html
<div id="header">
  <a class="nav" href="#">What color?</a> <!-- Red — ID wins -->
</div>
```

> **Result:** The link will be red because `#header` (ID = 100 points) beats `.nav a` (class + element = 11 points).

---

### 🌊 The Cascade

CSS stands for **Cascading** Style Sheets. The cascade is the set of rules that determines which style wins when there are conflicts.

**Order of priority (highest to lowest):**

1. **Importance** — `!important` (avoid this!)
2. **Specificity** — more specific selector wins
3. **Source order** — later rules override earlier ones (if specificity is equal)

```css
/* Both have the same specificity (0,0,1,0) */
.highlight { background: yellow; }
.highlight { background: orange; }  /* Wins — comes later */
```

```html
<p class="highlight">This will be orange, not yellow.</p>
```

> **Result:** Orange wins because it appears later in the stylesheet with equal specificity.

---

### 📌 Pseudo-classes & Pseudo-elements

**Pseudo-classes** style elements in a specific state:
```css
/* User interaction states */
a:hover { color: red; }         /* Mouse hovering */
a:focus { outline: 2px solid; } /* Keyboard focus */
a:active { color: green; }      /* Being clicked */
a:visited { color: purple; }    /* Already visited */

/* Structural states */
li:first-child { font-weight: bold; }
li:last-child { border-bottom: none; }
li:nth-child(odd) { background: #f5f5f5; }
```

**Pseudo-elements** style parts of an element:
```css
/* First line or first letter */
p::first-line { font-variant: small-caps; }
p::first-letter { font-size: 2em; }

/* Before/after content */
.note::before { content: "📝 "; }
.price::after { content: " USD"; }
```

> **Result:** `:hover` changes link color on mouse-over, `::before` inserts content before an element.

---

### In Simple Words

- CSS rules = **selector** + **properties** + **values**
- **Selectors** target elements by tag, class (`.`), or ID (`#`)
- **Specificity** decides which rule wins: inline > ID > class > element
- **Cascade** uses importance, specificity, then source order
- **Pseudo-classes** (`:hover`, `:first-child`) style states; **pseudo-elements** (`::before`, `::after`) style parts or insert content
