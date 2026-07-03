---
title: Basic Animation
description: Creating simple animations with requestAnimationFrame
sidebar:
  order: 1
---

# Basic Animation

## Introduction

Use `requestAnimationFrame` to create smooth, efficient animations that sync with the browser's refresh rate.

## Visual Explanation

```mermaid
sequenceDiagram
    participant JS as JavaScript
    participant RAF as requestAnimationFrame
    participant Browser as Browser Render

    JS->>RAF: requestAnimationFrame(callback)
    Note over RAF: Waits for next frame
    RAF->>Browser: ≈16ms later (60fps)
    Browser->>JS: Execute callback
    JS->>RAF: requestAnimationFrame(nextFrame)
    RAF->>Browser: Next frame...
```

## Simple Animation Loop

```javascript
function animate() {
  // Update animation state
  element.style.transform = `translateX(${position}px)`;

  // Continue the animation
  requestAnimationFrame(animate);
}

// Start the animation
requestAnimationFrame(animate);
```

## Animation with Stopping

```javascript
let animationId;
let position = 0;

function animate() {
  position += 2;
  element.style.transform = `translateX(${position}px)`;

  // Stop after 500px
  if (position < 500) {
    animationId = requestAnimationFrame(animate);
  }
}

// Start
animationId = requestAnimationFrame(animate);

// Cancel
cancelAnimationFrame(animationId);
```

## Summary

- Call `requestAnimationFrame(callback)` to start
- Callback receives a timestamp parameter
- Return value is an ID for cancellation
- Use `cancelAnimationFrame(id)` to stop

## Further Reading

- [MDN: requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
