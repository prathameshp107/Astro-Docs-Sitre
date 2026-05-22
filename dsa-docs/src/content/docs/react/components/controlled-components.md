---
title: "Controlled Components"
description: "Form components where React state controls the input value."
---

# Controlled Components

A controlled component is a form element whose value is controlled by React state.

```jsx
function InputField() {
  const [value, setValue] = React.useState("");

  return (
    <input
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  );
}
```

## Key Idea

React state is the source of truth.

## Use Cases

- Form validation
- Conditional submit buttons
- Formatting user input
- Keeping UI and state synchronized

