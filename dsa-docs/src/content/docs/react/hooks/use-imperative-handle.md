---
title: "useImperativeHandle"
description: "useImperativeHandle lets you customize the ref handle exposed by a parent — only expose what's needed."
sidebar:
  order: 11
---

# useImperativeHandle -> "Controlled ref exposure"

> **Simple Explanation:** 👉 Imagine you have a TV remote that has 50 buttons, but you only give your kid 3 buttons (volume, channel, power). `useImperativeHandle` is how you give only certain methods to the parent component — hiding the rest.

## When to Use It

- Exposing a **focused set of methods** from a child to its parent
- Building **library components** (inputs, modals, custom players) where you want a clean API
- Avoiding direct access to the entire inner component

## Example — Custom Input with Focus/Reset

```jsx
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

// Child component
const CustomInput = forwardRef(function CustomInput(props, ref) {
  const inputRef = useRef(null);
  const [value, setValue] = useState('');

  // Expose only what we want the parent to access
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    reset: () => setValue(''),
    getValue: () => value,
    // 👆 Parent can ONLY call .focus(), .reset(), .getValue()
    // It CANNOT access inputRef directly
  }), [value]);

  return (
    <input
      ref={inputRef}
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder="Type here..."
    />
  );
});

// Parent component
function Form() {
  const inputRef = useRef(null);

  function handleClear() {
    inputRef.current.reset();
    inputRef.current.focus();
  }

  function handleSubmit() {
    console.log('Value:', inputRef.current.getValue());
  }

  return (
    <div>
      <CustomInput ref={inputRef} />
      <button onClick={handleClear}>Clear & Focus</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
```

## In Simple Words 🧠

- Use `useImperativeHandle` with `forwardRef` to expose a **controlled API** from child to parent
- Only expose **what the parent actually needs** — keep internals private
- The third argument is a dependency array (re-creates the handle when dependencies change)
- Great for building reusable component libraries with clean public APIs
- Without it, `ref` gives the parent the whole DOM element — with it, you control the interface
