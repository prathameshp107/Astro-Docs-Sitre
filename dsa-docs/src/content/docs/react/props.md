---
title: "Props"
description: "Learn about React props, how to use them, and common patterns with props."
sidebar:
 order: 5
---
# What are Props?
In **React**, **props (short for properties)** are:
> 👉 Inputs passed from a parent component to a child component
They allow components to be **dynamic and reusable**.
---
## Simple Analogy
Think of a component like a function:
```js
function greet(name) {
 return "Hello " + name;
}
```
👉 `name` = input
Similarly in React:
```jsx
function Greeting(props) {
 return <h1>Hello {props.name}</h1>;
}
```
👉 `props.name` = input
---
# Basic Example
### Parent Component
```jsx
function App() {
 return <Greeting name="Prathamesh" />;
}
```
### Child Component
```jsx
function Greeting(props) {
 return <h1>Hello {props.name}</h1>;
}
```
👉 Output:
```
Hello Prathamesh
```
---
# Props Flow (VERY IMPORTANT)
👉 Props flow **one-way (top -> down)**
```
Parent -> Child -> Grandchild
```
 Child cannot directly change parent props
---
# Multiple Props
```jsx
function User({ name, age }) {
 return (
 <h1>
 {name} is {age} years old
 </h1>
 );
}
```
👉 Usage:
```jsx
<User name="Prathamesh" age={25} />
```
---
# Props with Different Types
## 1. String
```jsx
<Greeting name="John" />
```
---
## 2. Number
```jsx
<User age={25} />
```
---
## 3. Boolean
```jsx
<Button isActive={true} />
```
---
## 4. Array
```jsx
function List({ items }) {
 return (
 <ul>
 {items.map((item) => (
 <li key={item}>{item}</li>
 ))}
 </ul>
 );
}
```
👉 Usage:
```jsx
<List items={["A", "B", "C"]} />
```
---
## 5. Object
```jsx
function Profile({ user }) {
 return <h1>{user.name}</h1>;
}
```
👉 Usage:
```jsx
<Profile user={{ name: "Prathamesh" }} />
```
---
## 6. Function (VERY IMPORTANT)
👉 Used for event handling & communication
```jsx
function Button({ onClick }) {
 return <button onClick={onClick}>Click</button>;
}
```
👉 Parent:
```jsx
function App() {
 function handleClick() {
 alert("Clicked!");
 }
 return <Button onClick={handleClick} />;
}
```
---
# Props Are Read-Only (IMPORTANT)
 Wrong:
```jsx
function Greeting(props) {
 props.name = "Changed"; // not allowed
}
```
👉 Props are immutable
---
# Destructuring Props (Best Practice)
Instead of:
```jsx
function Greeting(props) {
 return <h1>{props.name}</h1>;
}
```
 Do this:
```jsx
function Greeting({ name }) {
 return <h1>{name}</h1>;
}
```
---
# Default Props
```jsx
function Greeting({ name = "Guest" }) {
 return <h1>Hello {name}</h1>;
}
```
👉 Usage:
```jsx
<Greeting />
```
👉 Output:
```
Hello Guest
```
---
# 🧒 Children Prop (VERY IMPORTANT)
Every component automatically gets a special prop:
👉 `children`
```jsx
function Card({ children }) {
 return <div className="card">{children}</div>;
}
```
👉 Usage:
```jsx
<Card>
 <h1>Title</h1>
 <p>Description</p>
</Card>
```
👉 Output:
```
Card containing Title + Description
```
---
# Props vs State (Common Confusion)
| Props | State |
| ------------------ | ------------------------ |
| Passed from parent | Managed inside component |
| Read-only | Mutable |
| External data | Internal data |
---
# Real-World Example
```jsx
function ProductCard({ name, price, onBuy }) {
 return (
 <div>
 <h2>{name}</h2>
 <p>₹{price}</p>
 <button onClick={onBuy}>Buy</button>
 </div>
 );
}
```
👉 Parent:
```jsx
function App() {
 function handleBuy() {
 alert("Purchased!");
 }
 return (
 <ProductCard
 name="Laptop"
 price={50000}
 onBuy={handleBuy}
 />
 );
}
```
---
# Warning: Common Mistakes
### Forgetting `{}` for JS
```jsx
<User age="25" /> // string
<User age={25} /> // number
```
---
### Mutating Props
Never do:
```jsx
props.value = 10;
```
---
### Overusing Props (Prop Drilling)
Passing props deeply:
```jsx
<App -> Parent -> Child -> Grandchild>
```
👉 Solution:
* Context API
* State management
---
# Advanced Concept: Props Drilling
```jsx
function App() {
 return <Parent name="Prathamesh" />;
}
function Parent({ name }) {
 return <Child name={name} />;
}
function Child({ name }) {
 return <h1>{name}</h1>;
}
```
👉 Passing through layers = prop drilling
---
# Final Mental Model
> Props = Input to component
> State = Memory inside component
---
---
# Important Concepts You MUST Understand
## 1. Props (Read-only input)
```jsx
function User({ name }) {
 return <h1>{name}</h1>;
}
```
👉 Cannot modify props inside component
---
## 2. State (Internal data)
```jsx
const [count, setCount] = React.useState(0);
```
👉 Changes trigger re-render
---
## 3. Re-rendering
Whenever:
* State changes
* Props change
👉 Component re-renders
---
# Real Example (Putting Everything Together)
```jsx
function UserCard({ name }) {
 const [likes, setLikes] = React.useState(0);
 return (
 <div>
 <h2>{name}</h2>
 <p>Likes: {likes}</p>
 <button onClick={() => setLikes(likes + 1)}>
 Like
 </button>
 </div>
 );
}
```
👉 Usage:
```jsx
<UserCard name="Prathamesh" />
```
---
# Best Practices (Senior Level)
* Keep components small
* Reuse components
* Extract logic into hooks
* Avoid prop drilling (use context)
* Separate UI & logic
---
# Final Mental Model
Think like this:
```
App
 ├── Header
 ├── Sidebar
 ├── Content
 │ ├── Card
 │ ├── Table
 │ └── Chart
 └── Footer
```
👉 Everything is a component.
---