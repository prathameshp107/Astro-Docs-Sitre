---
title: "useRef"
description: "useRef hook for storing values without re-render and accessing DOM."
sort: 3
---

# 🔹 3. useRef → “Store value without re-render”

> Explanation: 👉 useRef is like a sticky note that your component can write on. You can use it for two main things:  
>To grab a direct reference to an actual HTML element (like an input box) so you can force it to do something, like be clicked or typed into.
>To remember a value that changes, but without forcing React to redraw the screen (unlike useState).

Example: Automatically focusing an input box when the page loads.

👉 Like a hidden box

```jsx
function App() {
  const ref = React.useRef(0);

  function increase() {
    ref.current++;
    console.log(ref.current);
  }

  return <button onClick={increase}>Click</button>;
}
```

### 🧠 Simple idea:

> Value changes, but UI does NOT update

### 📊 How it works
 
![useRef diagram](/DSA-Notes-Problems/assets/react/05-useref.svg)

---
