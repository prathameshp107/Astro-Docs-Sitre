---
title: "Component Lifecycle"
description: "React component lifecycle stages and the modern useEffect approach."
---

# Component Lifecycle

The component lifecycle describes the stages a component goes through.

## Main Phases

- Mounting: component appears on the screen
- Updating: state or props change
- Unmounting: component is removed from the screen

In modern React, lifecycle behavior is usually handled with `useEffect`.

```jsx
function Example() {
  React.useEffect(() => {
    console.log("Mounted");

    return () => {
      console.log("Unmounted");
    };
  }, []);

  return <h1>Example</h1>;
}
```

## Class To Hook Mapping

| Class lifecycle | Functional component |
| --- | --- |
| `componentDidMount` | `useEffect(() => {}, [])` |
| `componentDidUpdate` | `useEffect(() => {}, [deps])` |
| `componentWillUnmount` | Cleanup function inside `useEffect` |

