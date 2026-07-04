---
title: "Forms in React"
description: "Master forms in React: controlled and uncontrolled inputs, validation patterns, form submission, and third-party libraries."
---

# Forms in React

## Introduction

Forms are how users input data. In React, there are two approaches to handling form state: **controlled** (React manages the value) and **uncontrolled** (the DOM manages the value). Each has its place, and understanding both is essential.

---

## Controlled Components

In a controlled component, the input's `value` is bound to React state, and changes update state via `onChange`. React is the "single source of truth."

```jsx
import { useState } from 'react';

export default function ControlledForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted: ${name} (${email})`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', maxWidth: '400px' }}>
      <div style={{ marginBottom: '12px' }}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: '100%', padding: '8px' }}
        />
      </div>
      <div style={{ marginBottom: '12px' }}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '8px' }}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
```

**Explanation:** Each input's `value` comes from state. The `onChange` handler updates state on every keystroke. React re-renders the input with the new value. This gives you instant access to form data and enables real-time validation.

---

## Input Types

```jsx
// Text input
<input value={text} onChange={e => setText(e.target.value)} />

// Textarea (uses value, not children)
<textarea value={text} onChange={e => setText(e.target.value)} />

// Select dropdown
<select value={selected} onChange={e => setSelected(e.target.value)}>
  <option value="">Choose...</option>
  <option value="apple">Apple</option>
  <option value="banana">Banana</option>
</select>

// Checkbox (uses checked, not value)
<input type="checkbox" checked={isChecked} onChange={e => setChecked(e.target.checked)} />

// Radio group
<label>
  <input type="radio" name="gender" value="male" checked={gender === 'male'} onChange={e => setGender(e.target.value)} /> Male
</label>
```

---

## Inline Validation

Controlled components enable instant validation feedback:

```jsx
import { useState } from 'react';

export default function ValidatedForm() {
  const [email, setEmail] = useState('');
  const error = email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ? 'Please enter a valid email'
    : null;

  return (
    <form style={{ padding: '20px', maxWidth: '400px' }}>
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: '100%', padding: '8px',
          border: error ? '2px solid #dc2626' : '1px solid #ccc'
        }}
        aria-invalid={!!error}
      />
      {error && <p style={{ color: '#dc2626', fontSize: '14px' }} role="alert">{error}</p>}
      <button type="submit" disabled={!!error || !email}>Submit</button>
    </form>
  );
}
```

---

## Form Libraries

For complex forms with many fields, validation rules, and dynamic behaviors, consider a form library:

| Library | Pros |
|---------|------|
| **React Hook Form** | Minimal re-renders, performant, easy validation (works with Yup, Zod) |
| **Formik** | Mature, simple API, built-in validation, good for medium forms |
| **Yup / Zod** | Schema validation libraries that pair with the above |

```jsx
// React Hook Form example
import { useForm } from 'react-hook-form';

export default function HookForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', { required: 'Email is required' })} />
      {errors.email && <p>{errors.email.message}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## Common Mistakes

⚠ **Forgetting `preventDefault()`**: Without `e.preventDefault()`, submitting a form triggers a page refresh, losing all React state.

⚠ **Using `defaultValue` with Controlled Inputs**: A controlled input should use `value`, not `defaultValue`. Using both causes React to warn about switching from controlled to uncontrolled.

```jsx
// ❌ BAD — defaultValue doesn't update
<input value={name} defaultValue="test" />

// ✅ GOOD — use value for controlled
<input value={name} onChange={e => setName(e.target.value)} />
```

⚠ **Number Inputs**: Input values are always strings. Convert with `Number()` or `parseInt()`.

```jsx
<input
  type="number"
  value={age}
  onChange={(e) => setAge(Number(e.target.value))}
/>
```

---

## Summary

- **Controlled components:** React state drives the input value. Use for most forms.
- **Uncontrolled components:** DOM manages the value. Use for simple forms or file inputs.
- Always call `e.preventDefault()` on form submit.
- Use `aria-invalid` and `role="alert"` for accessible validation.
- For complex forms, consider React Hook Form or Formik.

## Related Topics

- [Controlled Components](controlled-components)
- [Uncontrolled Components](uncontrolled-components)
- [Events in React](events)

## Further Reading

- [React Docs: Forms](https://react.dev/reference/react-dom/components/input)
- [React Hook Form](https://react-hook-form.com/)
