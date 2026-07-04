---
title: "forwardRef Pattern"
description: "Passing refs through component boundaries with forwardRef and useImperativeHandle."
sidebar:
  order: 3
---

# forwardRef Pattern

## Introduction

`forwardRef` lets a parent component pass a ref through to a child component's underlying DOM node. This is essential for reusable component libraries where the parent needs to focus an input, measure a node, or trigger animations inside a child component.

---

## Basic forwardRef

```jsx
import { forwardRef, useRef } from 'react';

// forwardRef wraps the component to accept a ref from the parent
const FancyInput = forwardRef(function FancyInput(props, ref) {
  return (
    <input
      ref={ref}
      {...props}
      style={{
        padding: '10px',
        border: '2px solid #6366f1',
        borderRadius: '6px',
        outline: 'none'
      }}
    />
  );
});

// Parent component uses the ref
export default function Form() {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <FancyInput ref={inputRef} placeholder="Type here..." />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
}
```

**Explanation:** `forwardRef` receives `props` and `ref` as separate arguments. It attaches the `ref` to the `<input>` element. The parent passes `ref={inputRef}` and can call `.focus()` on it.

---

## React 19: Ref as a Prop

In React 19, `forwardRef` is **no longer required**. You can pass `ref` as a regular prop:

```jsx
// React 19+ — no forwardRef needed!
function FancyInput({ ref, ...props }) {
  return (
    <input
      ref={ref}
      {...props}
      style={{ padding: '10px', border: '2px solid #6366f1', borderRadius: '6px' }}
    />
  );
}

// Usage is the same
<FancyInput ref={inputRef} placeholder="Type here..." />
```

`forwardRef` still works for backward compatibility, but in React 19, treating `ref` as a regular prop is the recommended approach.

---

## useImperativeHandle: Custom Ref API

`useImperativeHandle` customizes the value exposed to the parent. Instead of exposing the entire DOM node, you expose only specific methods.

```jsx
import { forwardRef, useRef, useImperativeHandle } from 'react';

const CustomInput = forwardRef(function CustomInput(props, ref) {
  const inputRef = useRef(null);

  // Define exactly what the parent can access
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    clear: () => { inputRef.current.value = ''; },
    getValue: () => inputRef.current.value,
    select: () => inputRef.current.select()
  }));

  return <input ref={inputRef} {...props} />;
});

// Parent — can only access the exposed methods
function Form() {
  const inputRef = useRef(null);

  const handleClear = () => {
    inputRef.current.clear(); // ✅ Available
    // inputRef.current.style = ... // ❌ Not exposed — DOM node hidden
  };

  return (
    <div>
      <CustomInput ref={inputRef} placeholder="Enter text" />
      <button onClick={() => inputRef.current.focus()}>Focus</button>
      <button onClick={handleClear}>Clear</button>
    </div>
  );
}
```

**Performance note:** Include a dependency array as the third argument to avoid recreating the imperative handle on every render:

```jsx
useImperativeHandle(ref, () => ({
  focus: () => inputRef.current.focus(),
  reset: () => resetForm()
}), [resetForm]); // Only recreate when resetForm changes
```

---

## Common Patterns

### Forwarding Multiple Refs

For complex components that need multiple internal refs, combine `forwardRef` with regular refs:

```jsx
const DateRangePicker = forwardRef(function DateRangePicker(props, ref) {
  const startRef = useRef(null);
  const endRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => startRef.current.focus(),
    getRange: () => ({
      start: startRef.current.value,
      end: endRef.current.value
    }),
    clear: () => {
      startRef.current.value = '';
      endRef.current.value = '';
    }
  }));

  return (
    <div>
      <input ref={startRef} type="date" />
      <span> to </span>
      <input ref={endRef} type="date" />
    </div>
  );
});
```

---

## Summary

- `forwardRef` passes a ref from parent to child's DOM node.
- In React 19, `ref` is a regular prop — `forwardRef` is optional.
- `useImperativeHandle` limits what the parent can access via ref.
- Use `useImperativeHandle` for form inputs, modals, and reusable library components.

## Related Topics

- [useRef Overview](index)
- [Accessing DOM Elements](dom-access)
- [useImperativeHandle Hook](../../use-imperative-handle)

## Further Reading

- [React Docs: forwardRef](https://react.dev/reference/react/forwardRef)
- [React Docs: useImperativeHandle](https://react.dev/reference/react/useImperativeHandle)
