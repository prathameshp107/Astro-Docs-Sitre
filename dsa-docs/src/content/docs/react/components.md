---
title: "Components"
description: "Learn about React components, types of components, and component patterns."
sort: 4
---

# Components


# ⚛️ What is a Component?

In **React**, a **component is a reusable, independent piece of UI**.

👉 Think of it like:

* A function
* That returns UI (JSX)
* Based on input (props + state)

---

## 🧠 Mental Model

> Component = Function → takes input → returns UI

```jsx
function Greeting() {
  return <h1>Hello</h1>;
}
```

👉 This is a component.

---

# 🔥 Why Components Are Powerful

* Reusability
* Separation of concerns
* Easy maintenance
* Scalable architecture

---
# Compoenets Rule
- Components are the most basic UI building blocks of a React application.
- Each component outputs a small, reusable piece of HTML.
- Components are **re-usable** and can be nested.
- React requires the **first letter of a component to be capitalized** — this is how JSX tells the difference between an HTML tag and a component instance.

### Component-Based Architecture

React splits UI into reusable pieces:

```jsx
function Button() {
  return <button>Click me</button>;
}

// Reuse anywhere
<Button />
<Button />
```


---


# 🧩 Types of Components (Important)

### 2 Types of Components

| Functional Component | Class Component |
|----------------------|----------------|
| No `this` keyword | More feature-rich |
| Solution without state | Maintains own private data (state) |
| Mainly for UI | Complex UI logic |
| Stateless/dumb/Presentational | Provides lifecycle hooks |

```js
// Functional Component
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// Class Component
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

> **Note:** From React 16.8+, Hooks allow using state and lifecycle in functional components. It is always recommended to use **functional components**.


## 1. Functional Components (Modern Standard ✅)

This is what you SHOULD use in 2026.

```jsx
function Welcome() {
  return <h1>Welcome to React</h1>;
}
```

👉 Use it:

```jsx
<Welcome />
```

---

### With Props (Dynamic Component)

```jsx
function Greeting(props) {
  return <h1>Hello {props.name}</h1>;
}
```

👉 Usage:

```jsx
<Greeting name="Prathamesh" />
```

👉 Output:

```
Hello Prathamesh
```

---

### With Destructuring (Best Practice)

```jsx
function Greeting({ name }) {
  return <h1>Hello {name}</h1>;
}
```

---

## 2. Class Components (Legacy ⚠️)

Used before hooks.

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello</h1>;
  }
}
```

👉 Avoid in modern apps unless maintaining old code.

---

# 🧠 Types Based on Usage Pattern

This is where real understanding starts.

---

## 🔹 3. Presentational Components (UI Only)

👉 Only responsible for UI

```jsx
function Button({ label }) {
  return <button>{label}</button>;
}
```

👉 No logic, just display

---

## 🔹 4. Container Components (Logic Handling)

👉 Handles data & logic

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

---

## 🔹 5. Controlled Components

👉 Form elements controlled by React state

```jsx
function InputField() {
  const [value, setValue] = React.useState("");

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
```

👉 React controls the input

---

## 🔹 6. Uncontrolled Components

👉 DOM handles state

```jsx
function InputField() {
  const inputRef = React.useRef();

  function handleClick() {
    console.log(inputRef.current.value);
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>Submit</button>
    </>
  );
}
```

---

## 🔹 7. Higher-Order Components (HOC)

👉 Function that wraps another component

```jsx
function withLogger(Component) {
  return function WrappedComponent(props) {
    console.log("Rendering...");
    return <Component {...props} />;
  };
}
```

👉 Usage:

```jsx
const Enhanced = withLogger(MyComponent);
```

---

## 🔹 8. Custom Hook Components (Logic Reuse)

👉 Not UI, but reusable logic

```jsx
function useCounter() {
  const [count, setCount] = React.useState(0);
  return { count, setCount };
}
```

👉 Use inside component:

```jsx
function Counter() {
  const { count, setCount } = useCounter();

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}
```

---

## 🔹 9. Compound Components (Advanced Pattern)

👉 Components that work together

```jsx
function Card({ children }) {
  return <div className="card">{children}</div>;
}

Card.Title = function ({ children }) {
  return <h2>{children}</h2>;
};

Card.Body = function ({ children }) {
  return <p>{children}</p>;
};
```

👉 Usage:

```jsx
<Card>
  <Card.Title>Title</Card.Title>
  <Card.Body>Description</Card.Body>
</Card>
```

---

## 🔹 10. Layout Components

👉 Used for structure

```jsx
function Layout({ children }) {
  return (
    <div>
      <header>Header</header>
      <main>{children}</main>
    </div>
  );
}
```

---

# 🔄 Component Lifecycle (Functional Way)

Earlier (class):

* componentDidMount
* componentDidUpdate

Now:
👉 handled using `useEffect`

```jsx
function Example() {
  React.useEffect(() => {
    console.log("Mounted");

    return () => {
      console.log("Unmounted");
    };
  }, []);

  return <h1>Example</h1>;
}
```

---
