---
title: "Default Props & Destructuring"
description: "How to set default values for props and use destructuring for cleaner component code."
sidebar:
  order: 4
---

# Default Props & Destructuring

## Simple Analogy 🎭

Think of ordering coffee. If you don't specify a size, the barista gives you a **default** — a medium. Similarly, if a parent doesn't pass a prop, you can set a **default value** so the component still works.

---

## Default Props in Action

In React, you can give props a **fallback value** that gets used when the parent doesn't pass them:

```jsx
function Greeting({ name = "Guest" }) {
  return <h1>Hello {name}</h1>;
}

<Greeting />              {/* Output: Hello Guest */}
<Greeting name="Raj" />   {/* Output: Hello Raj */}
```

👉 When `name` is not passed, it defaults to `"Guest"`.

---

## Multiple Defaults

```jsx
function Button({ text = "Click Me", color = "blue", size = "md" }) {
  return (
    <button className={`btn btn-${color} btn-${size}`}>
      {text}
    </button>
  );
}

<Button />                              {/* Click Me, blue, md */}
<Button text="Save" />                  {/* Save, blue, md */}
<Button text="Delete" color="red" />    {/* Delete, red, md */}
<Button text="Submit" color="green" size="lg" />
```

---

## Default Props with Destructuring

Destructuring lets you pull out specific props by name from the `props` object — making your code cleaner and more readable.

### Without Destructuring (Messy ❌)
```jsx
function User(props) {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>{props.email}</p>
      <span>{props.age} years old</span>
    </div>
  );
}
```

### With Destructuring (Clean ✅)
```jsx
function User({ name, email, age }) {
  return (
    <div>
      <h1>{name}</h1>
      <p>{email}</p>
      <span>{age} years old</span>
    </div>
  );
}
```

### Destructuring + Defaults Together
```jsx
function User({ name = "Guest", age = 18, email = "No email" }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{email}</p>
      <p>Age: {age}</p>
    </div>
  );
}
```

---

## Rest Props Pattern

Sometimes you want to extract some props and pass the rest down to a child element:

```jsx
function Button({ children, color = "blue", ...rest }) {
  return (
    <button
      className={`btn-${color}`}
      {...rest}  {/* passes all other props to the <button> */}
    >
      {children}
    </button>
  );
}

// Now any extra props (onClick, disabled, type) pass through:
<Button color="red" onClick={handleClick} disabled={false}>
  Save
</Button>
```

---

## Before vs After

| Before (no destructuring) | After (with destructuring) |
|---------------------------|---------------------------|
| `props.name` everywhere | `{ name }` directly |
| Mixed with other `props.` calls | Clean list of expected props |
| Hard to see what props are used | All props visible in function signature |
| Can't set defaults easily | Defaults right in the params |

---

## ⚠️ Common Mistake

```jsx
// ❌ Wrong — this doesn't work with default values
function Greeting(props = { name: "Guest" }) {
  return <h1>{props.name}</h1>;
}

// ✅ Correct — destructure + default
function Greeting({ name = "Guest" }) {
  return <h1>{name}</h1>;
}
```

---

## 🧠 In Simple Words

- **Default props** give a fallback value when the parent doesn't pass that prop
- Use destructuring to **extract props by name** instead of writing `props.name`
- Combine **destructuring + defaults** in the function parameters: `{ name = "Guest" }`
- Use the **rest pattern `...rest`** to pass remaining props to a child element
- Defaults make components **more robust** — they work even without all the input
