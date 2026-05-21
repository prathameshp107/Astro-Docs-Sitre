---
title: "Fragments"
description: "Learn about React Fragments and how to group elements without adding extra DOM nodes."
sort: 7
---

# Fragments

Let’s understand **React Fragments** in a **simple but deep way** 👇

---

# ⚛️ What are React Fragments?

In **React**:

> 👉 A Fragment lets you group multiple elements **without adding an extra DOM node**

---

## 🧠 Why Fragments Exist

React components must return **one parent element**.

### ❌ Without Fragment (Error)

```jsx
function App() {
  return (
    <h1>Hello</h1>
    <p>Welcome</p>
  );
}
```

👉 ❌ This will break because React expects a single root.

---

## ✅ Fix Using `<div>` (Old Way)

```jsx
function App() {
  return (
    <div>
      <h1>Hello</h1>
      <p>Welcome</p>
    </div>
  );
}
```

👉 Works, but:

* Adds **extra div in DOM**
* Can break layout / CSS

---

# 🔥 Solution → Fragment

---

## ✅ Using Fragment

```jsx
function App() {
  return (
    <React.Fragment>
      <h1>Hello</h1>
      <p>Welcome</p>
    </React.Fragment>
  );
}
```

👉 No extra DOM element created ✅

---

## ✨ Short Syntax (Most Common)

```jsx
function App() {
  return (
    <>
      <h1>Hello</h1>
      <p>Welcome</p>
    </>
  );
}
```

👉 This is the same as `React.Fragment`

---

# 🔍 What Happens in DOM?

### With `<div>`

```html
<div>
  <h1>Hello</h1>
  <p>Welcome</p>
</div>
```

---

### With Fragment

```html
<h1>Hello</h1>
<p>Welcome</p>
```

👉 Cleaner DOM

---

## 🧠 When to Use Fragments

## ✅ 1. Avoid unnecessary wrapper

```jsx
<>
  <Header />
  <Main />
  <Footer />
</>
```

---

## 🧠 Final Mental Model

> Fragment = invisible wrapper

---

## 🔥 One-Line Summary

> Use Fragment when you need a wrapper in React, but **don’t want it in the DOM**


---
