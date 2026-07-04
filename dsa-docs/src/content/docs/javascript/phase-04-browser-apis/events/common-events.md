---
title: Common Events
description: Mouse, keyboard, focus, form, and window events
sidebar:
  order: 3
---

# Common Events

## Introduction

Different event types fire for different user interactions. Here are the most commonly used ones.

## Mouse Events

```javascript
element.addEventListener('click', handler);       // Single click
element.addEventListener('dblclick', handler);    // Double click
element.addEventListener('mouseenter', handler);  // Hover start
element.addEventListener('mouseleave', handler);  // Hover end
element.addEventListener('mousemove', handler);   // Mouse move
element.addEventListener('contextmenu', handler); // Right click
element.addEventListener('mousedown', handler);   // Mouse button pressed
element.addEventListener('mouseup', handler);     // Mouse button released
```

## Keyboard Events

```javascript
document.addEventListener('keydown', handler);    // Key pressed
document.addEventListener('keyup', handler);      // Key released
// Note: keypress is deprecated — use keydown instead
```

## Focus Events

```javascript
input.addEventListener('focus', handler);         // Element focused
input.addEventListener('blur', handler);          // Lost focus
input.addEventListener('focusin', handler);       // Focus bubbles (unlike focus)
input.addEventListener('focusout', handler);      // Blur bubbles (unlike blur)
```

## Form and Window Events

```javascript
// Form
form.addEventListener('submit', handler);         // Form submitted
form.addEventListener('reset', handler);          // Form reset

// Window
window.addEventListener('scroll', handler);
window.addEventListener('resize', handler);
window.addEventListener('load', handler);         // Page fully loaded
window.addEventListener('DOMContentLoaded', handler); // DOM ready (before images)
```

## Summary

- Mouse: click, mouseenter, mouseleave, mousemove
- Keyboard: keydown, keyup
- Focus: focus, blur, focusin, focusout
- Form: submit, reset
- Window: scroll, resize, load, DOMContentLoaded

## Further Reading

- [MDN: Event reference](https://developer.mozilla.org/en-US/docs/Web/Events)
