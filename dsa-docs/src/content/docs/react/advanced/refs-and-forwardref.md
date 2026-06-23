---
title: "Refs & forwardRef"
description: "Refs let you access DOM nodes directly; forwardRef passes a ref through a component to a child DOM element."
sidebar:
  order: 4
---

# Refs & forwardRef

## Simple Words First 🟡

> **Analogy:** 👉 Think of a ref as a **direct phone line** to a specific DOM element. Instead of going through the component hierarchy, you call the phone number (`.current`) and the element picks up. `forwardRef` is like the phone company wiring that line through a wrapper component.

## Basic `useRef` — Accessing a DOM Node

```jsx
import { useRef, useEffect } from 'react';

function AutoFocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    // 👇 Direct access to the DOM node — no prop drilling needed
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} placeholder="I auto-focus!" />;
}
```

## `forwardRef` — Passing Refs Through Components

React **doesn't let you** put `ref` on a function component by default. `forwardRef` wraps the component to accept a `ref`:

```jsx
import { forwardRef, useRef } from 'react';

// ✅ Correct: forwardRef passes the ref to a DOM element
const FancyInput = forwardRef(function FancyInput(props, ref) {
  return (
    <div className="fancy-wrapper">
      <input ref={ref} {...props} />
    </div>
  );
});

function Parent() {
  const inputRef = useRef(null);

  function focusInput() {
    inputRef.current.focus();
  }

  return (
    <>
      <FancyInput ref={inputRef} placeholder="Type here..." />
      <button onClick={focusInput}>Focus the input</button>
    </>
  );
}
```

## React 19 — `ref` as a Prop

In React 19, **you no longer need `forwardRef`** — `ref` can be passed as a regular prop:

```jsx
// React 19+ — no forwardRef needed!
function FancyInput({ ref, ...props }) {
  return <input ref={ref} className="fancy" {...props} />;
}

function Parent() {
  const ref = useRef(null);
  return <FancyInput ref={ref} placeholder="React 19 style" />;
}
```

## `useImperativeHandle` — Exposing a Custom API

```jsx
import { forwardRef, useImperativeHandle, useRef } from 'react';

const VideoPlayer = forwardRef(function VideoPlayer({ src }, ref) {
  const videoRef = useRef(null);

  useImperativeHandle(ref, () => ({
    play: () => videoRef.current.play(),
    pause: () => videoRef.current.pause(),
    jumpTo: (time) => { videoRef.current.currentTime = time; },
  }));

  return <video ref={videoRef} src={src} />;
});

// Parent can call: videoRef.current.play(), .pause(), .jumpTo(30)
```

## In Simple Words 🧠

- `useRef` gives you a **mutable object** (`.current`) that persists across renders without causing re-renders
- Use it to **access DOM nodes directly** (focus, measure, scroll)
- `forwardRef` passes a `ref` through a component to a child DOM element
- In **React 19**, `ref` works as a regular prop — no `forwardRef` needed
- Combine with `useImperativeHandle` to expose a limited API instead of the full DOM node
