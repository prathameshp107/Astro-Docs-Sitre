---
title: "useImperativeHandle"
description: "Master useImperativeHandle: React's hook for customizing ref-exposed values in forwardRef components."
sidebar:
  order: 10
---

# useImperativeHandle — The Ref Customization Hook

## Introduction

`useImperativeHandle` customizes the value exposed to parent components when using `forwardRef`. Instead of exposing the entire DOM node, you expose only specific methods.

## Why do we need this?

`forwardRef` passes the ref through to a child's DOM node. But sometimes you want to expose a custom API (focus, clear, validate) rather than the full DOM element.

### Problem Statement

A custom `<FancyInput>` component should expose `focus()` and `clear()` but NOT allow direct DOM manipulation (like `value`). `useImperativeHandle` lets you define exactly what the parent can access.

## Syntax

```javascript
const Child = forwardRef((props, ref) => {
  const inputRef = useRef(null);
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    clear: () => { inputRef.current.value = ''; }
  }));
  return <input ref={inputRef} />;
});
```

## Basic Example

```jsx
import { forwardRef, useRef, useImperativeHandle } from 'react';

const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef(null);
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    clear: () => { inputRef.current.value = ''; },
    getValue: () => inputRef.current.value
  }));
  return <input ref={inputRef} {...props} style={{ padding: '8px', border: '2px solid #4f46e5' }} />;
});

export default function Form() {
  const ref = useRef(null);
  return (
    <div>
      <FancyInput ref={ref} placeholder="Type here..." />
      <button onClick={() => ref.current.focus()}>Focus</button>
      <button onClick={() => ref.current.clear()}>Clear</button>
    </div>
  );
}
```

## Best Practices

💡 Only expose what's necessary — hide internal implementation details.

🚀 Use for form inputs, modals, custom components with imperative APIs.

## MCQ

1. **What does useImperativeHandle do?** A) Creates refs  B) Customizes exposed ref value  C) Forward refs  D) Creates handles → *B*
2. **What hook must it be used with?** A) forwardRef  B) useState  C) useEffect  D) useRef → *A*

## Summary

🧠 `useImperativeHandle = Custom Door` — decide what visitors see and can touch.

📖 Customizes the ref value exposed to parents. Use with forwardRef.

## Related Topics

[useRef](use-ref) | [forwardRef Pattern](../phase-7-advanced/refs-forwardref)

## Further Reading

[React Docs: useImperativeHandle](https://react.dev/reference/react/useImperativeHandle)
