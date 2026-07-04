---
title: "Lifecycle Hooks"
description: "React lifecycle phases and useEffect lifecycle patterns."
---

# Lifecycle Hooks


##  What is React Lifecycle?

In **React**:

> 👉 Lifecycle = the different stages a component goes through from **creation -> update -> removal**

---

##  Modern React Reality (IMPORTANT)

👉 Earlier (class components):

* lifecycle methods (`componentDidMount`, etc.)

👉 Now (functional components):

* Lifecycle is handled using **Hooks (`useEffect`)**

---

##  3 Phases of React Lifecycle

```txt
1. Mounting  (component created)
2. Updating  (component changes)
3. Unmounting (component removed)
```

---

##  1. Mounting Phase (Component Creation)

> 👉 When component is first rendered on screen

> This is when a component appears on screen for the first time. React runs your component function, builds the virtual DOM, paints to the real DOM, then fires useEffect with an empty [] dependency array. This is your "componentDidMount" equivalent - perfect for fetching initial data, setting up subscriptions, or initializing third-party libraries.

---

##  What Happens Internally?

1. Function runs
2. JSX returned
3. DOM created
4. UI shown

---

##  Example

```jsx
function App() {
  React.useEffect(() => {
    console.log("Component Mounted");
  }, []);

  return <h1>Hello</h1>;
}
```

---

##  Explanation

* `useEffect(() => {}, [])`
  👉 Runs ONLY once -> after first render

---

##  Interview Line

> "Mounting is when the component is created and inserted into the DOM. In functional components, we handle it using `useEffect` with an empty dependency array."

---

##  2. Updating Phase (Re-render)

> 👉 Happens when:

> Every time state or props change, React re-runs your component function and compares (diffing) the new virtual DOM against the old one. Only the changed parts are updated in the real DOM. useEffect with dependencies fires after every relevant update - React always runs the cleanup of the previous effect before running the new one.

* State changes
* Props change

---

##  What Happens Internally?

1. State/props change
2. Component function runs again
3. React compares (Virtual DOM)
4. Updates only changed parts

---

##  Example

```jsx
function Counter() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    console.log("Component Updated");
  }, [count]);

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}
```

---

##  Explanation

* When `count` changes -> re-render
* `useEffect` runs again because `[count]` changed

---

##  Interview Line

> "Updating occurs when state or props change. React re-renders the component and updates the DOM efficiently using the Virtual DOM."

---

##  3. Unmounting Phase (Component Removal)

> 👉 When component is removed from DOM

> When a component is removed, React runs the cleanup function returned from useEffect. This is where you cancel timers, remove event listeners, or unsubscribe from streams - critical for preventing memory leaks.


---

##  What Happens?

* Cleanup runs
* Memory cleared
* Subscriptions removed

---

##  Example

```jsx
function App() {
  React.useEffect(() => {
    console.log("Mounted");

    return () => {
      console.log("Component Unmounted");
    };
  }, []);

  return <h1>Hello</h1>;
}
```

---

##  Explanation

* Return function = cleanup
* Runs when component is removed

---

##  Interview Line

> "Unmounting is when the component is removed from the DOM. Cleanup functions inside `useEffect` are used to release resources like timers or subscriptions."

---

###  How it works
 
![useReducer diagram](/DSA-Notes-Problems/assets/react/react-lifecycle-hooks.svg)

##  Full Lifecycle in One Example

```jsx
function Example({ value }) {
  const [count, setCount] = React.useState(0);

  // Mount + Update
  React.useEffect(() => {
    console.log("Mounted or Updated");

    return () => {
      console.log("Cleanup before next run or unmount");
    };
  }, [count]);

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}
```

---

##  Lifecycle Mapping (VERY IMPORTANT)

| Phase   | Hook Usage                           |
| ------- | ------------------------------------ |
| Mount   | `useEffect(() => {}, [])`            |
| Update  | `useEffect(() => {}, [deps])`        |
| Unmount | `return () => {}` inside `useEffect` |

---

##  Important Deep Concepts (Interview Level)

##  1. useEffect Runs AFTER Render

👉 React first updates UI -> then runs effect

---

##  2. Cleanup Runs BEFORE Next Effect

```txt
Old effect cleanup -> New effect runs
```

---

##  3. Multiple useEffects

```jsx
useEffect(() => {
  console.log("Effect 1");
}, []);

useEffect(() => {
  console.log("Effect 2");
}, []);
```

👉 They run independently

---

##  4. Strict Mode (Important)

In development:

👉 React may run effects twice (for safety)

---

##  Class vs Functional Lifecycle (Interview Comparison)

| Class                | Functional        |
| -------------------- | ----------------- |
| componentDidMount    | useEffect([], []) |
| componentDidUpdate   | useEffect([deps]) |
| componentWillUnmount | cleanup function  |

---

##  Real-World Example (API Call)

```jsx
function Users() {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    fetch("https://api.com/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return users.map(user => <p key={user.id}>{user.name}</p>);
}
```

👉 Mount -> fetch -> update -> render

---

##  Final Mental Model

```txt
Mount -> Show UI -> Run effect  
Update -> Re-render -> Run effect  
Unmount -> Cleanup
```

---

##  Interview-Ready Summary

> "React lifecycle has three phases: Mounting, Updating, and Unmounting. In modern React, we manage these using `useEffect`. Mounting runs once, updating runs on dependency changes, and unmounting is handled via cleanup functions."

---
