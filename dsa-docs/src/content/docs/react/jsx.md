---
title: "JSX"
description: "Learn about JSX, React's JavaScript XML syntax for writing UI components."
sidebar:
  order: 3
---

# JSX

> **JSX = JavaScript XML** — HTML-like syntax inside JavaScript.

- **JSX** (JavaScript Syntax Extension) is special syntax for React to represent UI.
- JSX allows adding elements to DOM without using `createElement()` or `appendChild()`.
- JSX looks similar to HTML but **is not HTML**.
- JSX code gets transformed into `React.createElement()` by **Babel**.
- JSX doesn't support void tags — `<img>` is invalid; use `<img />` or `<img></img>`.
- React DOM uses **camelCase** property naming: `class` → `className`, `tabindex` → `tabIndex`.

### How JSX Works Internally

This JSX:
```jsx
const element = <h1>Hello</h1>;
```
gets converted into:
```js
const element = React.createElement("h1", null, "Hello");
```

### Nested JSX Breakdown

```jsx
// JSX
const element = (
  <div>
    <h1>Hello</h1>
    <p>Welcome</p>
  </div>
);

// Converted JS (what Babel produces)
const element = React.createElement(
  "div",
  null,
  React.createElement("h1", null, "Hello"),
  React.createElement("p", null, "Welcome")
);
```

### Why JSX is Powerful

**1. Embed JavaScript inside UI:**
```jsx
const name = "Prathamesh";
<h1>Hello {name}</h1>
```

**2. Dynamic Rendering:**
```jsx
const isLoggedIn = true;
return (
  <div>
    {isLoggedIn ? <h1>Welcome</h1> : <h1>Please Login</h1>}
  </div>
);
```

**3. Lists Rendering:**
```jsx
const items = ["A", "B", "C"];
return (
  <ul>
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);
```

### JSX Rules (Important)

**1. One Parent Element:**

❌ Wrong:
```jsx
return (
  <h1>Hello</h1>
  <p>World</p>
);
```

✅ Correct:
```jsx
return (
  <div>
    <h1>Hello</h1>
    <p>World</p>
  </div>
);
// OR use Fragment
<>
  <h1>Hello</h1>
  <p>World</p>
</>
```

**2. Use `className` not `class`:**
```jsx
<div className="box"></div>
```

**3. Close all tags:**
```jsx
<img src="image.png" />
```

### React Without JSX

```js
// Syntax
React.createElement(type, [props], [...children])

// Example
React.createElement("div", { class: "test" }, "This is a div");
// is equivalent to JSX:
// <div class='test'>This is a div</div>
```

> Modern tools like **Vite** and **Babel** automatically convert JSX → JS. You never write `React.createElement` manually.

---

## React Element

- A React element is a JavaScript object with specific properties and methods.
- Created using `React.createElement()`.
- `document.createElement()` returns a **DOM element**.
- `React.createElement()` returns an **object representing the DOM element**.

```js
const hello = React.createElement(
  "H1",
  { id: "msg", className: "title" },
  "Hello React Element"
);
```

---

## Module Systems & Imports/Exports

### CommonJS
```js
module.exports = { member1, member2 };
const member1 = require('Library/file name');
```

### ECMAScript
```js
export member1;
export default member2;
import DefaultMember, { NamedMember } from 'file';
```

### Named Export vs Default Export

- Only **one default export** per file; **multiple named exports** are allowed.
- Default export can be a function, class, or object (not a variable).
- Named import must use the **same name** as the export.
- Default import can use **any name**.

```js
import MyReact, { MyComponent } from "react";
```

---
