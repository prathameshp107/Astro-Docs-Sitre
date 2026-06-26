---
title: "Higher-Order Components"
description: "React HOC pattern — wrapping a component with reusable behavior, now often replaced by custom Hooks."
---
# Higher-Order Components
A higher-order component is a function that takes a component and returns an enhanced component.

> 📖 The **canonical HOC page** is here. The old `data-binding/higher-order-components.md` now redirects here.

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