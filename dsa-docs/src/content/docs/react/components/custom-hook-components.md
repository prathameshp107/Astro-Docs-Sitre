---
title: "Custom Hook Components"
description: "Components that reuse logic through custom React Hooks."
---
# Custom Hook Components
Custom Hooks are reusable functions that share stateful logic between components.
```jsx
function useCounter() {
 const [count, setCount] = React.useState(0);
 return { count, setCount };
}
function Counter() {
 const { count, setCount } = useCounter();
 return (
 <button onClick={() => setCount(count + 1)}>
 {count}
 </button>
 );
}
```
## Why Use Custom Hooks
- Reuse logic without duplicating code
- Keep components smaller
- Share stateful behavior cleanly
- Replace many older HOC use cases