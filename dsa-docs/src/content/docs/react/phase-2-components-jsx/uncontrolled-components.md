---
title: "Uncontrolled Components"
description: "Uncontrolled components: DOM-managed form inputs accessed via refs."
---

# Uncontrolled Components

## Introduction

In an uncontrolled component, form data is handled by the DOM itself, not React. You access values via a ref when needed — similar to traditional HTML forms.

## Basic Example

```jsx
function NameForm() {
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Hello, ${inputRef.current.value}!`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input ref={inputRef} defaultValue="Alice" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
```

## When to Use

- Integrating with non-React code
- Very simple forms (one or two fields)
- File inputs (file inputs are always uncontrolled)

## Controlled vs Uncontrolled

| Feature | Controlled | Uncontrolled |
|---------|-----------|-------------|
| Value source | React state | DOM |
| Read value | `state` | `ref.current.value` |
| Set value | `setState()` | `defaultValue` prop |
| Validation | Instant on keystroke | On submit only |

## MCQ

1. **How do you access an uncontrolled input's value?** A) State  B) Ref  C) Query selector  D) Events → *B*
2. **Which input type must be uncontrolled?** A) Text  B) File  C) Select  D) Checkbox → *B*

## Summary

📖 DOM manages the state. Access values via refs. Good for simple forms and file inputs.

## Related Topics

[Controlled Components](controlled-components) | [useRef](../phase-4-hooks/use-ref)
