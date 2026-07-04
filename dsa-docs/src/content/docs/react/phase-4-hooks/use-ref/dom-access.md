---
title: "Accessing DOM Elements with useRef"
description: "Using useRef to access and manipulate DOM elements: focus, measurements, media playback, and Canvas."
sidebar:
  order: 1
---

# Accessing DOM Elements with useRef

## Introduction

The most common use of `useRef` is to get a direct reference to a DOM element. By passing the ref to a JSX element's `ref` attribute, React sets `ref.current` to the DOM node after rendering. This lets you call imperative DOM methods like `.focus()`, `.play()`, or `.getBoundingClientRect()`.

---

## Basic Pattern

```jsx
import { useRef, useEffect } from 'react';

export default function AutoFocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    // inputRef.current is the <input> DOM node
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} type="text" placeholder="Auto-focused..." />;
}
```

**Explanation:** `useRef(null)` creates the ref object. `ref={inputRef}` tells React to set `inputRef.current` to the DOM node. After mount, `useEffect` calls `.focus()` on it.

---

## Common DOM Access Patterns

### Measuring Element Size

```jsx
function ElementMeasurer() {
  const elementRef = useRef(null);
  const [rect, setRect] = useState(null);

  useEffect(() => {
    const el = elementRef.current;
    if (el) {
      setRect(el.getBoundingClientRect());
    }
  }, []);

  return (
    <div>
      <div ref={elementRef} style={{ padding: '20px', border: '1px solid #ccc' }}>
        Measure me!
      </div>
      {rect && (
        <p>Width: {rect.width}px, Height: {rect.height}px</p>
      )}
    </div>
  );
}
```

### Media Playback Control

```jsx
function VideoPlayer({ src }) {
  const videoRef = useRef(null);

  const play = () => videoRef.current?.play();
  const pause = () => videoRef.current?.pause();
  const skip = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  return (
    <div>
      <video ref={videoRef} src={src} style={{ width: '100%' }} />
      <button onClick={play}>▶ Play</button>
      <button onClick={pause}>⏸ Pause</button>
      <button onClick={() => skip(-10)}>⏪ -10s</button>
      <button onClick={() => skip(10)}>⏩ +10s</button>
    </div>
  );
}
```

### Canvas Drawing

```jsx
function DrawingCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#4f46e5';
    ctx.fillRect(10, 10, 100, 100);
  }, []);

  return <canvas ref={canvasRef} width={200} height={200} style={{ border: '1px solid #ccc' }} />;
}
```

---

## Integrating with Third-Party Libraries

Many DOM-based libraries (charts, maps, animations) need a DOM node to attach to:

```jsx
import { useRef, useEffect } from 'react';
import Chart from 'chart.js';

function PriceChart({ data }) {
  const chartRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    // Create chart instance on mount
    instanceRef.current = new Chart(chartRef.current, {
      type: 'line',
      data: data
    });

    // Destroy on unmount
    return () => instanceRef.current.destroy();
  }, []);

  useEffect(() => {
    // Update chart when data changes
    if (instanceRef.current) {
      instanceRef.current.data = data;
      instanceRef.current.update();
    }
  }, [data]);

  return <canvas ref={chartRef} />;
}
```

---

## When to Use Ref vs. State for DOM

| Use Case | Ref | State |
|----------|-----|-------|
| Accessing DOM node | ✅ | ❌ |
| Measuring dimensions | ✅ | ❌ |
| Managing playback | ✅ | ❌ |
| Storing interval ID | ✅ | ❌ |
| Values that affect UI | ❌ | ✅ |

---

## Summary

- Use `useRef` + `ref` attribute to access DOM elements imperatively.
- Read `ref.current` inside effects or event handlers (not during render).
- Common uses: focus, measurements, media control, Canvas API, third-party libs.
- Refs don't trigger re-renders — use `useState` when the UI needs to reflect the value.

## Related Topics

- [useRef Overview](index)
- [Storing Mutable Values](storing-values)
- [forwardRef Pattern](forward-ref)

## Further Reading

- [React Docs: Manipulating the DOM with Refs](https://react.dev/learn/manipulating-the-dom-with-refs)
- [React Docs: useRef for DOM Elements](https://react.dev/reference/react/useRef#examples-dom)
