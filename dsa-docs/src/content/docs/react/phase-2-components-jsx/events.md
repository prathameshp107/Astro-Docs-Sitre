---
title: "React Events"
description: "React event handling, synthetic events, bubbling, and preventDefault."
---

# React Events


##  What are React Events?

In **React**:

> 👉 Events are actions that happen in the UI
> (like click, typing, submit, hover)

React lets you **listen to these events and run code**.

---

##  Simple Idea

> User does something -> React catches it -> your function runs

---

##  Basic Example

```jsx
function App() {
  function handleClick() {
    alert("Button clicked!");
  }

  return <button onClick={handleClick}>Click Me</button>;
}
```

👉 Flow:

```txt
User clicks -> onClick -> handleClick() runs
```

---

## Warning: Important Syntax Difference (HTML vs React)

###  HTML

```html
<button onclick="handleClick()">Click</button>
```

---

###  React

```jsx
<button onClick={handleClick}>Click</button>
```

👉 Differences:

* CamelCase (`onClick`)
* Pass function, don't call it

---

##  Common React Events

##  Mouse Events

* `onClick`
* `onDoubleClick`
* `onMouseEnter`
* `onMouseLeave`

---

##  Keyboard Events

* `onKeyDown`
* `onKeyUp`

---

##  Form Events

* `onChange`
* `onSubmit`
* `onFocus`
* `onBlur`

---

##  Example: Input Event

```jsx
function App() {
  const [value, setValue] = React.useState("");

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
```

👉 User types -> event -> state updates -> UI updates

---

##  What is Event Object?

Every event gives an object:

```jsx
function handleClick(e) {
  console.log(e);
}
```

👉 `e` = event object

---

##  Example

```jsx
function App() {
  function handleChange(e) {
    console.log(e.target.value);
  }

  return <input onChange={handleChange} />;
}
```

👉 `e.target.value` = input value

---

##  Synthetic Events (Important)

React uses:

> 👉 **Synthetic Events** (wrapper around browser events)

👉 Why?

* Cross-browser compatibility
* Same behavior everywhere

---

##  Passing Arguments to Events

###  Wrong

```jsx
<button onClick={handleClick(5)}>Click</button>
```

👉 This runs immediately

---

###  Correct

```jsx
<button onClick={() => handleClick(5)}>Click</button>
```

---

#  Prevent Default Behavior

Example: form submit reloads page

```jsx
function handleSubmit(e) {
  e.preventDefault();
  console.log("Form submitted");
}
```

---

#  Event Bubbling (Important Concept)

👉 Events move from child -> parent

```jsx
<div onClick={() => console.log("Parent")}>
  <button onClick={() => console.log("Child")}>
    Click
  </button>
</div>
```

👉 Output:

```
Child
Parent
```

---

##  Stop Bubbling

```jsx
function handleClick(e) {
  e.stopPropagation();
}
```

---

#  Real Example (Everything Together)

```jsx
function Form() {
  const [name, setName] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    alert(name);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```
---

#  Final Mental Model

> Event = user action -> React handler -> state update -> UI update

---

#  One-Line Summary

> React events connect **user actions -> your logic -> UI updates**

---
