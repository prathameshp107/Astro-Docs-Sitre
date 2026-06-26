---
title: "useState"
description: "useState hook for managing state in React components."
sidebar:
 order: 1
---
# 1. useState -> "Memory"
> *Simple Explanation*: 👉 Normally, a function forgets everything once it finishes running. useState gives your component a memory. It lets you create a variable that React will remember, and when you update that variable, React automatically updates the screen to show the new value.
Example: A simple click counter.
👉 Used to store data
```jsx
import { useState } from 'react';
function Counter() {
 // We create a piece of memory called "count", starting at 0.
 // "setCount" is the special tool we use to update "count".
 const [count, setCount] = useState(0);
 return (
 <div>
 <p>You clicked {count} times</p>
 {/* When the button is clicked, we tell React to update the memory */}
 <button onClick={() => setCount(count + 1)}>
 Click me
 </button>
 </div>
 );
}
```
### State Update → Re-render Cycle

```mermaid
flowchart LR
    Event["User clicks\nsetCount(count + 1)"] --> State["State update\ncount: 0 → 1"]
    State --> ReRender["React schedules\na re-render"]
    ReRender --> VDOM["New Virtual DOM\ncreated"]
    VDOM --> Diff["Diff with\nold VDOM"]
    Diff --> DOM["Real DOM\nupdated"]

    style Event fill:#4f46e5,color:#fff
    style State fill:#dc2626,color:#fff
    style ReRender fill:#d97706,color:#fff
    style VDOM fill:#6366f1,color:#fff
    style Diff fill:#f59e0b,color:#fff
    style DOM fill:#059669,color:#fff
```

### Simple idea:
* `count` -> value
* `setCount` -> update value
👉 When you update -> React re-renders
---