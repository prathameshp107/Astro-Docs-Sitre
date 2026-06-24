---
title: "Transitions & Animations"
description: "CSS transitions and animations make elements change smoothly over time — hover effects, keyframes, and performance tips."
sidebar:
  order: 1
---

## Transitions & Animations

### 🤔 What Are CSS Transitions?

A **transition** smoothly changes a property value over time, instead of instantly.

Think of it like a **light with a dimmer switch** instead of an on/off switch:
- Without transition: instant on/off
- With transition: smooth fade

```css
.button {
  background-color: blue;
  color: white;
  padding: 12px 24px;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: darkblue;
}
```

> **Result:** When you hover over the button, the background smoothly fades from blue to dark blue over 0.3 seconds.

---

### 🎬 Transition Properties

```css
.element {
  /* Shorthand */
  transition: all 0.3s ease;
  
  /* Longhand */
  transition-property: transform, opacity;  /* which properties */
  transition-duration: 0.3s;                /* how long */
  transition-timing-function: ease;          /* the curve */
  transition-delay: 0s;                      /* delay before starting */
}
```

**Timing functions (the curve of the animation):**
```css
transition-timing-function: ease;         /* slow start, fast middle, slow end */
transition-timing-function: linear;       /* constant speed */
transition-timing-function: ease-in;      /* slow start, fast end */
transition-timing-function: ease-out;     /* fast start, slow end */
transition-timing-function: ease-in-out;  /* slow start and end */
transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1); /* custom */
```

> **Result:** `ease` is natural-looking. `linear` is mechanical. Custom cubic-bezier creates unique motion curves.

---

### 🔄 Practical Transition Examples

```css
/* Scale on hover */
.card {
  transition: transform 0.2s ease;
}
.card:hover {
  transform: scale(1.05);  /* gently grows */
}

/* Rotate icon */
.icon {
  transition: transform 0.3s ease;
}
.icon:hover {
  transform: rotate(180deg);
}

/* Fade in */
.overlay {
  opacity: 0;
  transition: opacity 0.3s ease;
}
.container:hover .overlay {
  opacity: 1;
}

/* Multiple properties */
.box {
  background: blue;
  width: 100px;
  transition: background 0.3s, width 0.5s ease-out;
}
.box:hover {
  background: red;
  width: 200px;
}
```

> **Result:** Cards gently grow on hover. Icons rotate smoothly. Overlays fade in. Multiple properties can transition at different speeds.

---

### 🤔 What Are CSS Animations?

Animations go beyond transitions. They can have **multiple steps** (keyframes), **loop**, and **run automatically** (no hover needed).

```css
@keyframes bounce {
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-20px); }
  100% { transform: translateY(0); }
}

.bouncing-ball {
  animation: bounce 1s ease-in-out infinite;
}
```

> **Result:** The element bounces up and down continuously.

---

### 🎬 Animation Properties

```css
.element {
  /* Shorthand */
  animation: slideIn 0.5s ease-out forwards;
  
  /* Longhand */
  animation-name: slideIn;           /* @keyframes name */
  animation-duration: 0.5s;          /* how long */
  animation-timing-function: ease-out;
  animation-delay: 0s;
  animation-iteration-count: 1;      /* number or infinite */
  animation-direction: normal;       /* normal | reverse | alternate */
  animation-fill-mode: forwards;     /* keeps the final state */
}
```

**Keyframe example with multiple steps:**
```css
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Or with percentages for more control */
@keyframes pulse {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.1); }
  100% { transform: scale(1); }
}
```

---

### 🎨 Common Animation Examples

```css
/* Fade in when page loads */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.hero-text {
  animation: fadeIn 1s ease-out;
}

/* Spinner */
@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  animation: spin 1s linear infinite;
}

/* Shake for errors */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25%      { transform: translateX(-5px); }
  75%      { transform: translateX(5px); }
}

.error {
  animation: shake 0.3s ease-in-out;
}
```

---

### ⚡ Performance Tips

**Which properties to animate:**
```
✅ transform (position, scale, rotate) — smooth (60fps)
✅ opacity — smooth (60fps)
❌ width, height — causes layout reflow (janky)
❌ left, top, margin — causes layout reflow (janky)
```

**Use `transform` instead of layout properties:**
```css
/* ❌ Bad — triggers reflow */
.sidebar {
  left: -200px;
  transition: left 0.3s;
}
.sidebar.open {
  left: 0;
}

/* ✅ Good — uses GPU, smooth */
.sidebar {
  transform: translateX(-200px);
  transition: transform 0.3s;
}
.sidebar.open {
  transform: translateX(0);
}
```

> **Result:** Transform and opacity animate at 60fps on the GPU. Layout properties (width, height, left) trigger expensive reflows.

---

### In Simple Words

- **Transitions** animate from one state to another (usually on hover/focus)
- **Animations** use `@keyframes` for multi-step, looping, or automatic motion
- Shorthand: `transition: property duration timing-function`
- `transform` and `opacity` are the smoothest properties to animate (GPU-accelerated)
- Use `transform: translateX()` instead of `left` for smooth, performant motion
- `animation: name duration timing-function infinite` for looping effects
