---
title: "useMemo"
description: "useMemo hook for caching calculations in React."
sidebar:
  order: 4
---

# 🔹 4. useMemo → “Cache calculation”

> Simple Explanation: Imagine a math problem that takes 10 seconds to solve. You don't want to re-solve it every time the screen blinks. useMemo solves it once, "remembers" the answer, and only re-calculates if the input numbers change. It's for performance.

👉 Avoid re-running heavy code

```jsx
const result = React.useMemo(() => {
  return num * 2;
}, [num]);
```

### 🧠 Simple idea:

> “Only recalculate when needed”

### 📊 How it works
 
![useMemo diagram](/DSA-Notes-Problems/assets/react/06-usememo.svg)

---
