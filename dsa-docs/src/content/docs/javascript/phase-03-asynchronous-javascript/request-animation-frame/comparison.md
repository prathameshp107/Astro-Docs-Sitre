---
title: RAF vs setTimeout
description: Why requestAnimationFrame is better for animations
sidebar:
  order: 4
---

# RAF vs setTimeout

## Introduction

While you can animate with `setTimeout`/`setInterval`, `requestAnimationFrame` provides significant advantages for visual updates.

## Comparison

```javascript
// setTimeout animation (choppy)
let pos = 0;
setInterval(() => {
  pos += 1;
  element.style.left = pos + 'px';
}, 16); // May not align with frame rate

// requestAnimationFrame (smooth)
function smoothAnimation() {
  pos += 1;
  element.style.left = pos + 'px';
  requestAnimationFrame(smoothAnimation);
}
requestAnimationFrame(smoothAnimation);
```

## Key Differences

| Feature | requestAnimationFrame | setTimeout |
|---------|---------------------|------------|
| Syncs with monitor | ✅ Yes | ❌ No |
| Pauses in background | ✅ Yes | ❌ No |
| Frame skipping | ✅ Auto-catches up | ❌ Can queue up |
| Battery friendly | ✅ Yes | ❌ No |
| Precision | ~16ms (60fps) | Minimum 4ms |

## Benefits of RAF

- ✅ Syncs with monitor refresh rate
- ✅ Pauses when tab is in background (saves battery)
- ✅ Smoother animations (no frame drops)
- ✅ Browser can batch updates for performance
- ✅ Auto-throttles to match display capabilities

## Summary

- Never use `setTimeout`/`setInterval` for animations
- `requestAnimationFrame` is purpose-built for visuals
- Automatically pauses in background tabs
- Browser optimizes for best performance

## Further Reading

- [MDN: Animation timing](https://developer.mozilla.org/en-US/docs/Web/API/AnimationFrameProvider/requestAnimationFrame)
