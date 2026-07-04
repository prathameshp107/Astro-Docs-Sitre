---
title: "Functional Components"
description: "Master React functional components: the modern standard for building React UIs with hooks."
---

# Functional Components

## Introduction

Functional components are the modern standard in React. They are plain JavaScript functions that accept props and return JSX. Combined with Hooks (React 16.8+), they can manage state, effects, and context — replacing class components entirely.

## Syntax

```jsx
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}
```

## Basic Example

```jsx
function Greeting({ name }) {
  return <h1>Welcome, {name}!</h1>;
}

// Usage: <Greeting name="Alice" />
```

## Intermediate Example

```jsx
function UserCard({ user, onEdit }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="card">
      <h3 onClick={() => setExpanded(!expanded)}>{user.name}</h3>
      {expanded && <p>{user.email}</p>}
      <button onClick={() => onEdit(user)}>Edit</button>
    </div>
  );
}
```

## Best Practices

💡 Use functional components for all new code. They're simpler, smaller, and support hooks.

🚀 Use destructuring for props. Use hooks for state and effects. Keep components focused.

## MCQ

1. **What is a functional component?** A) JS function returning JSX  B) Class extending Component  C) Object  D) String → *A*
2. **Can functional components use state?** A) Via hooks  B) No  C) Via class  D) Via props → *A*

## Summary

📖 Functional components are functions returning JSX. They're the modern standard, supporting hooks for all features.

## Related Topics

[Class Components](class-components) | [Props](props-index)
