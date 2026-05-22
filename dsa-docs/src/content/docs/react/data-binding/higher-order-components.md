---
title: "Higher Order Components"
description: "Higher order component notes from the React core concepts file."
---

## Higher Order Components (HOCs)

- A technique for **re-using component logic**.
- Takes one or more components as arguments and returns a **new upgraded component**.

```js
newComponent = higherOrderComponent(originalComponent);
```

**Use cases:** Authentication, Logging, Styling and Theming, Infinite scroll, Data subscription, Shared search features.

---
