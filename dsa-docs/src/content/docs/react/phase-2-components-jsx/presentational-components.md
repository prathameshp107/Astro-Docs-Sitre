---
title: "Presentational Components"
description: "Presentational components: UI-only components focused on appearance with no business logic."
---

# Presentational Components

## Introduction

Presentational (or "dumb") components are concerned with **how things look**. They accept data and callbacks via props, contain minimal state (usually UI state), and have no dependencies on the application's business logic.

## Characteristics

- Focus on UI rendering
- Accept data via `props`
- Call `props.onAction` for events
- Rarely use state (only UI state like toggle open/close)
- Highly reusable

## Example

```jsx
function Button({ label, variant, onClick, disabled }) {
  const styles = {
    primary: { background: '#4f46e5', color: '#fff' },
    secondary: { background: '#e5e7eb', color: '#333' }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...styles[variant] || styles.primary,
        padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer'
      }}
    >
      {label}
    </button>
  );
}
```

## Best Practices

💡 Presentational components are the building blocks of design systems.

🚀 Keep them pure — same props always render the same output. No API calls. No business logic.

## MCQ

1. **What is a presentational component concerned with?** A) Data fetching  B) UI appearance  C) Business logic  D) State management → *B*
2. **Should presentational components call APIs?** A) Yes  B) No → *B*

## Summary

📖 UI-only components focused on appearance. Accept data via props. Highly reusable.

## Related Topics

[Container Components](container-components) | [Compound Components](compound-components)
