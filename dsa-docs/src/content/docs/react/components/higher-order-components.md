---
title: "Higher-Order Components"
description: "React pattern for wrapping a component with reusable behavior."
---

# Higher-Order Components

A higher-order component is a function that takes a component and returns an enhanced component.

```jsx
function withLogger(Component) {
  return function WrappedComponent(props) {
    console.log("Rendering...");
    return <Component {...props} />;
  };
}

const Enhanced = withLogger(MyComponent);
```

## Key Points

- Reuses component logic
- Wraps existing components
- Common in older React libraries
- Often replaced by custom Hooks in modern React

