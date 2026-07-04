---
title: "Controlled Components"
description: "Controlled components: React-managed form inputs where state drives the input value."
---

# Controlled Components

## Introduction

In a controlled component, form data is handled by the React component's state. The input's `value` is bound to state, and changes update state via `onChange` — React is the "single source of truth."

## Basic Example

```jsx
function NameForm() {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Hello, ${name}!`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input value={name} onChange={e => setName(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Form Elements

```jsx
// Text input
<input value={text} onChange={e => setText(e.target.value)} />

// Textarea
<textarea value={text} onChange={e => setText(e.target.value)} />

// Select
<select value={selected} onChange={e => setSelected(e.target.value)}>
  <option value="a">A</option>
  <option value="b">B</option>
</select>

// Checkbox
<input type="checkbox" checked={checked} onChange={e => setChecked(e.target.checked)} />
```

## Best Practices

💡 Controlled components give React full control over form state, making validation and dynamic forms easy.

🚀 Use controlled components for most forms. They enable instant validation, conditional fields, and submit handling.

## MCQ

1. **What controls the input value?** A) DOM  B) React state  C) Browser  D) Server → *B*
2. **What event updates state?** A) onBlur  B) onSubmit  C) onChange  D) onInput → *C*

## Summary

📖 React state is the single source of truth for form inputs. Changes flow through `onChange` → state → re-render.

## Related Topics

[Uncontrolled Components](uncontrolled-components) | [Forms](forms)
