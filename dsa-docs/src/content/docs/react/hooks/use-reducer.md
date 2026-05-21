---
title: "useReducer"
description: "useReducer hook for complex state management."
sidebar:
  order: 7
---

# 🔹 7. useReducer → “Advanced state”

> Simple Explanation: If useState is like a simple sticky note, useReducer is like a professional office manager. Use it when you have a lot of states that change together (like a complex form or a game). Instead of saying "change this," you send an "action" (like "ADD_ITEM"), and the reducer follows a set of rules to update everything.

👉 Like `useState` but better for complex logic

```jsx
import { useReducer } from 'react';

// The "Rules": How state should change based on the "action"
function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - 1 };
    default: return state;
  }
}

function Counter() {
  // state is the data, dispatch is the function to send "orders"
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  );
}
```

### 📊 How it works
 
![useReducer diagram](/DSA-Notes-Problems/assets/react/04-usereducer.svg)

---
