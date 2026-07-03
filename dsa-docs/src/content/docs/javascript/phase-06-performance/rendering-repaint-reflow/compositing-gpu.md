---
title: Compositing & GPU
description: Using transform and opacity for GPU-accelerated animations
sidebar:
  order: 3
---

# Compositing & GPU

## Introduction

**Compositing** is the final stage of the rendering pipeline where the browser combines painted layers into the final image. Changes that only affect compositing are the most performant because they skip layout and paint.

## What Triggers Compositing Only

The following CSS properties only trigger compositing (no layout, no paint):

```css
/* ✅ GPU-accelerated — cheapest animations */
.element {
  transform: translateX(100px);
  transform: rotate(45deg);
  transform: scale(1.5);
  opacity: 0.5;
}
```

## Comparing Animation Costs

```javascript
// ❌ Expensive — triggers reflow each frame
function animateLeft() {
  const el = document.getElementById('box');
  let left = 0;
  function frame() {
    left += 2;
    el.style.left = left + 'px';  // Triggers layout!
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

// ✅ Cheap — only compositing
function animateTransform() {
  const el = document.getElementById('box');
  let x = 0;
  function frame() {
    x += 2;
    el.style.transform = `translateX(${x}px)`;  // Compositing only 🚀
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
```

## Creating Layers with will-change

```javascript
// Hint the browser to promote to a compositor layer
// CSS
element.style.willChange = 'transform';

// Or in CSS:
// .animated {
//   will-change: transform, opacity;
// }

// OR use translate3d to force GPU layer (older trick)
element.style.transform = 'translate3d(0, 0, 0)';
```

## Compositing Triggers

Properties that promote an element to its own compositor layer:

- `transform` (3D or 2D)
- `opacity`
- `will-change`
- `filter`
- `position: fixed`
- `<video>`, `<canvas>`, `<iframe>` elements
- Elements with `mix-blend-mode`

## Creating Layers in CSS

```css
.button {
  /* Creates a compositor layer */
  transform: translateZ(0);
}

.card {
  /* Hints browser to promote to a layer */
  will-change: transform, opacity;
}

.modal {
  /* Fixed positioned elements get their own layer */
  position: fixed;
  will-change: transform;
}
```

## Summary

| Property | Layout | Paint | Composite | Best for |
|----------|--------|-------|-----------|----------|
| `left/top` | ❌ | ❌ | ✅ | Never animate |
| `width/height` | ❌ | ❌ | ✅ | Never animate |
| `color/background` | ✅ | ❌ | ✅ | Occasional |
| `transform/opacity` | ✅ | ✅ | ✅ | Animations 🚀 |

## Further Reading

- [Web.dev: Animations and Compositing](https://web.dev/articles/animations-and-compositing)
- [MDN: will-change](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change)
