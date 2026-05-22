---
title: "Presentational Components"
description: "UI-focused React components that receive data and render markup."
---

# Presentational Components

Presentational components focus on how things look. They receive data through props and render UI.

```jsx
function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}
```

## Characteristics

- Mostly UI only
- Receives data through props
- Has little or no business logic
- Easy to reuse and test

These are also called UI components or dumb components.

