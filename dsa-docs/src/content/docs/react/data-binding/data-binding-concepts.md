---
title: "Data Binding Concepts"
description: "One-way and two-way data binding concepts in React."
---

# Data Binding


##  What is Data Binding?

In **React**:

> 👉 Data binding = how data moves between **UI (DOM)** and **JavaScript (state)**

---

##  Types of Data Binding

There are mainly **2 types**:

1. One-way binding
2. Two-way binding

---

##  1. One-Way Data Binding (React's Default )

> 👉 Data flows in ONE direction
> **State -> UI**

---

##  How it works

```txt
State -> UI (Render)
```

👉 React controls everything from state

---

##  Example

```jsx id="4jqek7"
function App() {
  const [name, setName] = React.useState("Prathamesh");

  return <h1>{name}</h1>;
}
```

👉 Flow:

* State = `"Prathamesh"`
* UI shows it

---

##  Key Idea

> UI is just a reflection of state

---

##  2. Two-Way Data Binding

> 👉 Data flows BOTH ways
> **State ↔ UI**

---

## Example (Conceptually)

```txt
State -> Input field  
Input change -> State update
```

---

##  React Way (Controlled Component)

React doesn't give automatic two-way binding like Angular
👉 You create it manually

---

##  Example

```jsx id="4cr3bb"
function App() {
  const [name, setName] = React.useState("");

  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
}
```

---

##  Flow Explained

```txt
State -> input value  
User types -> onChange -> updates state  
State updates -> UI updates
```

👉 Looks like two-way, but actually:

> Warning: It's still ONE-WAY + event handling

---

#  Important Insight (Very Important)

👉 React ALWAYS follows:

> **One-way data flow**

Even in "two-way binding" case:

* UI does NOT directly change state
* It sends an event -> then state updates

---

#  Visual Understanding

### One-way binding

```txt
State -> UI
```

---

### React "Two-way" (actual flow)

```txt
State -> UI  
UI -> Event -> State update -> UI
```

---

## ⚖️ React vs Angular (Quick Insight)

* Angular -> true two-way binding (automatic)
* React -> controlled, explicit binding

👉 React gives more control and predictability

---

##  Why React Uses One-Way Binding

* Easier debugging
* Predictable data flow
* Better performance
* Scalable architecture

---

#  Real Example (Putting It Together)

```jsx id="99ipfa"
function Form() {
  const [email, setEmail] = React.useState("");

  return (
    <div>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <p>Your email: {email}</p>
    </div>
  );
}
```

👉 Flow:

* Input updates state
* State updates UI

---

#  Final Understanding

> React = One-way data flow
> "Two-way binding" = manually controlled via events

---
