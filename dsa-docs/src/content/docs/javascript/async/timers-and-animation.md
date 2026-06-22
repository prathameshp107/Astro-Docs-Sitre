---
title: "Timers & Animation"
description: "setTimeout, setInterval, clearTimeout/clearInterval, requestAnimationFrame, and performance timing."
sidebar:
  order: 2
---

## Timers & Animation

JavaScript provides built-in functions to schedule code execution: run once after a delay, run repeatedly at an interval, or sync with the browser's paint cycle for smooth animations.

### `setTimeout` — Run Once After a Delay

```javascript
const timerId = setTimeout(() => {
  console.log("Runs after 2 seconds");
}, 2000);

// Cancel before it runs
clearTimeout(timerId);
```

### `setInterval` — Run Repeatedly

```javascript
let count = 0;
const intervalId = setInterval(() => {
  count++;
  console.log(`Tick ${count}`);
  if (count >= 5) {
    clearInterval(intervalId); // stop after 5 ticks
  }
}, 1000);
// Output: Tick 1, Tick 2, Tick 3, Tick 4, Tick 5 (each 1s apart)
```

### ⚠️ Timer Gotchas

```javascript
// Timers are MINIMUM delays, not guaranteed
setTimeout(() => console.log("2"), 0); // runs after current stack clears
console.log("1");
// Output: 1 → 2

// Delays are in milliseconds (1000ms = 1s)
// Minimum delay is 4ms (browsers clamp lower values)

// `this` in timers — regular functions lose context
class Timer {
  constructor() {
    this.count = 0;
    // ❌ loses this
    setInterval(function () {
      this.count++; // this is global/undefined
    }, 1000);
    // ✅ arrow preserves this
    setInterval(() => {
      this.count++; // correct
    }, 1000);
  }
}
```

### `requestAnimationFrame` — Smooth Animations

`requestAnimationFrame` schedules a callback before the next browser repaint (~60fps). It's the correct tool for animations.

```javascript
const box = document.querySelector("#box");
let position = 0;

function animate() {
  position += 2;
  box.style.transform = `translateX(${position}px)`;

  if (position < 500) {
    requestAnimationFrame(animate); // continue
  }
}

requestAnimationFrame(animate); // start
```

### `rAF` vs `setTimeout` for Animation

```javascript
// ❌ setTimeout — janky, runs even when tab is hidden
let pos = 0;
setInterval(() => {
  box.style.left = `${(pos += 2)}px`;
}, 16); // ~60fps

// ✅ requestAnimationFrame — smooth, pauses when tab hidden
function frame() {
  box.style.left = `${(pos += 2)}px`;
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

// Cancel rAF
const id = requestAnimationFrame(myAnimation);
cancelAnimationFrame(id);
```

### `performance.now()` — High-Resolution Timing

```javascript
const start = performance.now();

// ... some operation ...

const end = performance.now();
console.log(`Operation took ${end - start}ms`);

// More precise than Date.now()
```

### Debouncing & Throttling with Timers

```javascript
// Debounce — wait until activity stops
function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// Throttle — at most once per interval
function throttle(fn, limit = 100) {
  let inThrottle = false;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
```

### Key Takeaways

- `setTimeout` runs once; `setInterval` runs repeatedly — both are minimum delays, not exact
- Always save the timer ID and `clearTimeout`/`clearInterval` on cleanup to prevent memory leaks
- Use `requestAnimationFrame` for visual animations — it syncs with the display refresh rate
- `rAF` pauses when the tab is hidden (saves battery/CPU)
- `performance.now()` gives high-resolution timestamps for measuring code
- Debouncing and throttling are essential patterns for search inputs, scroll handlers, and resize events
- Arrow functions prevent `this`-related bugs inside timer callbacks
