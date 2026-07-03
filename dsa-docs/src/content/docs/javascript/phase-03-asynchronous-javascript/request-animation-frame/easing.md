---
title: Smooth Easing
description: Adding easing functions for natural motion
sidebar:
  order: 3
---

# Smooth Easing

## Introduction

Easing functions make animations feel more natural by varying the speed over time — accelerating, decelerating, or bouncing.

## Easing Function

```javascript
function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
```

## Complete Easing Animation

```javascript
function animateWithEasing(element, duration) {
  const start = performance.now();
  const startX = 0;
  const endX = 500;

  function frame(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOut(progress);

    element.style.transform = `translateX(${startX + (endX - startX) * easedProgress}px)`;

    if (progress < 1) {
      requestAnimationFrame(frame);
    }
  }

  requestAnimationFrame(frame);
}

animateWithEasing(element, 1000); // 1 second animation
```

## Common Easing Functions

```javascript
const easing = {
  linear: t => t,
  easeIn: t => t * t,
  easeOut: t => t * (2 - t),
  easeInOut: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  bounce: t => {
    const n = 7.5625;
    const d = 2.75;
    if (t < 1 / d) return n * t * t;
    if (t < 2 / d) return n * (t -= 1.5 / d) * t + 0.75;
    if (t < 2.5 / d) return n * (t -= 2.25 / d) * t + 0.9375;
    return n * (t -= 2.625 / d) * t + 0.984375;
  }
};
```

## Summary

- Easing makes animations feel natural
- `easeInOut` accelerates then decelerates
- `easeOut` starts fast, slows at end
- Common pattern: calculate progress (0-1), apply easing, interpolate value

## Further Reading

- [MDN: Animation timing](https://developer.mozilla.org/en-US/docs/Web/API/AnimationFrameProvider/requestAnimationFrame)
