---
title: Reflow Triggers
description: What causes layout recalculations and how to avoid costly reflows
sidebar:
  order: 2
---

# Reflow Triggers

## Introduction

**Reflow** (also called layout) recalculates the position and size of elements. It's the most expensive part of the rendering pipeline because changes to one element can affect the entire document.

## What Triggers Reflow

### DOM Changes

```javascript
// ❌ Adding/removing elements triggers reflow
document.body.appendChild(newElement);

// ❌ Changing element visibility
element.style.display = 'none';  // Triggers reflow
element.style.visibility = 'hidden'; // Only repaint ✓
```

### Dimension Changes

```javascript
// All of these trigger reflow
element.style.width = '100px';
element.style.height = '200px';
element.style.margin = '10px';
element.style.padding = '20px';
element.style.borderWidth = '2px';
element.style.position = 'absolute';
element.style.top = '50px';
```

### Font & Text Changes

```javascript
// Font changes recalculate all text layouts
element.style.fontSize = '16px';
element.style.fontFamily = 'Arial';
element.style.lineHeight = '1.5';
element.style.fontWeight = 'bold';
```

### Reading Layout Properties

Reading certain properties forces a **synchronous reflow** to return the correct value:

```javascript
// These force an immediate reflow (layout thrashing!)
element.offsetWidth;        // Forces layout
element.offsetHeight;       // Forces layout
element.offsetTop;          // Forces layout
element.getBoundingClientRect(); // Forces layout
element.scrollTop;          // Forces layout
element.clientWidth;        // Forces layout
window.getComputedStyle(element); // Forces layout
```

## Forced Reflow (Layout Thrashing)

Reading then writing alternately causes multiple reflows:

```javascript
// ❌ Layout thrashing - forces 3 reflows!
const h1 = element.offsetHeight;  // Read → forced layout
element.style.height = h1 + 10 + 'px'; // Write → layout
const h2 = element.offsetHeight;  // Read → forced layout again!

// ✅ Batch reads first, then writes
const height = element.offsetHeight; // Read once
elements.forEach(el => {
  el.style.height = (height / 2) + 'px'; // Write many, layout once
});
```

## Minimizing Reflow

```javascript
// 1. Use CSS classes instead of inline styles
element.classList.add('card--expanded');

// 2. Use requestAnimationFrame for visual changes
requestAnimationFrame(() => {
  element.style.transform = 'translateX(100px)';
});

// 3. Use DocumentFragment for batch inserts
const fragment = document.createDocumentFragment();
items.forEach(item => fragment.appendChild(buildElement(item)));
container.appendChild(fragment); // Single reflow

// 4. Use content-visibility for off-screen content
// CSS: content-visibility: auto; contain-intrinsic-size: 500px;

// 5. Use will-change to hint at upcoming changes
// CSS: will-change: transform, opacity;
```

## Summary

- Reflow is triggered by DOM changes, dimension changes, font changes, and reading layout properties
- Layout thrashing happens when you alternate read/write operations
- Batch reads before writes to minimize reflows
- Use `DocumentFragment`, `requestAnimationFrame`, and CSS classes for efficiency

## Further Reading

- [Web.dev: Avoid Layout Thrashing](https://web.dev/articles/avoid-large-complex-layouts-and-layout-thrashing)
