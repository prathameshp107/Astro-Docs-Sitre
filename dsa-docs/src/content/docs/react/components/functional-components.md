---
title: "Functional Components"
description: "Modern React components written as JavaScript functions."
---
# Functional Components
Functional components are the modern standard in React. They are JavaScript functions that return JSX.
```jsx
function Welcome() {
 return <h1>Welcome to React</h1>;
}
```
Use them like custom HTML tags:
```jsx
<Welcome />
```
## With Props
Props make a component dynamic.
```jsx
function Greeting({ name }) {
 return <h1>Hello {name}</h1>;
}
<Greeting name="Prathamesh" />
```
## Why Use Them
- Simple syntax
- Works with Hooks
- Easy to reuse
- Recommended for new React apps