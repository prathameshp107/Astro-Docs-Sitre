---
title: requestAnimationFrame
description: Smooth visual updates with requestAnimationFrame
sidebar:
  order: 12
---

# requestAnimationFrame

## Introduction

`requestAnimationFrame` tells the browser to execute a function **before the next repaint**. It's the recommended way to create smooth animations.

## Topics Covered

- [Basic Animation](./basic-animation) — Creating simple animations with RAF
- [FPS-Independent Animation](./fps-independent) — Frame-rate independent movement
- [Smooth Easing](./easing) — Adding easing functions for natural motion
- [RAF vs setTimeout](./comparison) — Why RAF is better for animations

## Summary

- Runs before the next repaint, synced with monitor refresh rate
- Provides timestamp for frame-rate independent animation
- Automatically pauses in background tabs
- Preferred over setTimeout/setInterval for animations

## Further Reading

- [MDN: requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
