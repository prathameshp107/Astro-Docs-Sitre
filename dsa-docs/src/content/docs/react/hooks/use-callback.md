---
title: "useCallback"
description: "useCallback hook for memoizing functions in React."
sort: 5
---

# 🔹 5. useCallback → “Keep same function”

> Simple Explanation: Every time a component re-renders, it creates its functions from scratch. Usually, that's fine. But if you're passing a function to a child component, it might think it's getting a "new" function every time. useCallback "locks" the function so it stays the same between renders.

```jsx
const handleClick = React.useCallback(() => {
  console.log("Clicked");
}, []);
```

### 🧠 Simple idea:

> “Don’t recreate function again and again”


### 📊 How it works
 
![useCallback diagram](/DSA-Notes-Problems/assets/react/07-usecallback.svg)
---
