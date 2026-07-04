---
title: FPS-Independent Animation
description: Frame-rate independent movement with delta time
sidebar:
  order: 2
---

# FPS-Independent Animation

## Introduction

FPS-independent animation uses **delta time** (the time difference between frames) to ensure consistent movement regardless of frame rate.

## The Problem

```javascript
// ❌ Frame-rate dependent — moves faster on high-refresh screens
function animate() {
  position += 2; // Same increment regardless of frame rate
  element.style.transform = `translateX(${position}px)`;
  requestAnimationFrame(animate);
}
// On 60fps: moves 120px/second
// On 120fps: moves 240px/second (faster!)
```

## The Solution

```javascript
let lastTime = 0;
let position = 0;

function animate(timestamp) {
  // Calculate time difference since last frame
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  // Move at 100px per second (frame-rate independent)
  position += (100 * deltaTime) / 1000;
  element.style.transform = `translateX(${position}px)`;

  if (position < 500) {
    requestAnimationFrame(animate);
  }
}

requestAnimationFrame(animate);
```

## Summary

- Always use delta time for smooth animation
- Delta time = time difference between frames (ms)
- Speed = (pixelsPerSecond × deltaTime) / 1000
- Ensures consistent movement across different frame rates

## Further Reading

- [MDN: Animation timing](https://developer.mozilla.org/en-US/docs/Web/API/AnimationFrameProvider/requestAnimationFrame)
