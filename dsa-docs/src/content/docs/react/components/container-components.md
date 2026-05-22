---
title: "Container Components"
description: "Logic-focused React components that manage data and behavior."
---

# Container Components

Container components handle logic, state, data fetching, and behavior. They pass the final data to presentational components.

```jsx
function CounterContainer() {
  const [count, setCount] = React.useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}
```

## Characteristics

- Manages state
- Handles events
- Fetches or prepares data
- Connects logic to UI

This pattern helps keep complex apps easier to maintain.

