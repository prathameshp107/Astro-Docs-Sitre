---
title: "Introduction to React"
description: "Learn what React is, how it works, and its core features like Virtual DOM and Reconciliation."
sidebar:
 order: 1
---
## What React Is
> **Key Idea: `UI = function(state)`**
> Instead of manually updating the DOM, React lets you describe **what the UI should look like** - and it handles updates efficiently.
- React is a **JavaScript library** for building user interfaces.
- It is an open-source, **component-based** library.
- Created & maintained by **Facebook**.
- Used to build **Single Page Applications (SPAs)**.
- Allows creation of **reusable UI components**.
- Uses **Virtual DOM** mechanism to fill in data (views) in HTML DOM.
### Traditional Way (Without React)
```html
<div id="app"></div>
<script>
 let count = 0;
 function updateUI() {
 document.getElementById("app").innerText = count;
 }
 function increment() {
 count++;
 updateUI();
 }
 updateUI();
</script>
```
**Problems:** Manual DOM updates, hard to scale, messy when app grows.
### The React Way
```jsx
function App() {
 const [count, setCount] = React.useState(0);
 return (
 <div>
 <h1>{count}</h1>
 <button onClick={() => setCount(count + 1)}>Click</button>
 </div>
 );
}
```
React automatically: tracks state, updates UI, and re-renders efficiently.
---
## React is NOT a Framework
> React is a library - it only takes care of the UI.
> Angular is a framework - it handles Dependency Injection, CSS encapsulation, httpClient, Form validation, routing, etc.
### Declarative vs Imperative
**Imperative (jQuery style)** - "HOW to do things":
```js
document.getElementById("title").innerText = "Hello";
```
**React (Declarative)** - "WHAT it should look like":
```jsx
<h1>Hello</h1>
```
## Framework vs Library
| Framework | Library |
|-----------|---------|
| Group of libraries to make work easier | Performs specific, well-defined operations |
| Provides ready-to-use tools, standards, templates | Provides reusable functions for code |
| Collection of libraries & APIs | Collection of helper functions, objects |
| Cannot be easily replaced | Can be easily replaced by another |
| Angular, Vue | jQuery, ReactJs, lodash, moment |
| Hospital with full of doctors | A doctor who specializes in one area |
## React vs Angular
| | React | Angular |
|--|-------|---------|
| Type | Library (2013) | Framework (2009) |
| Size | Light-weight | Heavy |
| Language | JSX + JavaScript | HTML + TypeScript |
| Data Flow | Uni-Directional | Two-way |
| DOM | Virtual DOM | Regular DOM |
| HTTP | Axios | HttpClientModule |
| DI | No | Yes |
| Form Validation | No | Yes |
| Extra Libraries | Needed | Not required |
| Focus | UI heavy | Functionality Heavy |
### Ecosystem & Flexibility
React is NOT a full framework - you choose your own stack:
- Use **Next.js** for full-stack apps
- Use libraries for state, routing, animations, etc.
---
# React Features
- **Light-weight**
- **JSX** - HTML-like syntax in JavaScript
- **Components** - easy to build, extend, reuse, loosely coupled
- **One-way Data Binding** - no watchers for bindings
- **Virtual DOM** - fast, efficient updates
- **Easy to learn** - simple design
- **High Performance**
---
## DOM and Virtual DOM
### DOM (Document Object Model)
- A tree-like structure representing the HTML of a web page.
- Allows JavaScript to interact with and modify the page's content, structure, and style.
### Why Virtual DOM?
- Frequent DOM manipulations are expensive and performance-heavy.
- Every time the DOM changes, browser recalculates CSS, runs layout, and repaints the page.
- Virtual DOM minimizes the time it takes to repaint the screen.
### What is Virtual DOM?
- A **lightweight JavaScript object** that is a copy of the real DOM.
- A node tree that lists elements, their attributes, and content as objects.
- React **never reads from real DOM, only writes to it**.
### Virtual DOM Benefits
- **Improved Performance** - Reduces the number of direct DOM manipulations.
- **Optimized Updates** - React intelligently determines the most efficient update path, minimizing costly reflows and repaints.
- **Simplified Development** - Abstracts away complexities of direct DOM manipulation.
### How React Works (Virtual DOM)
1. **Initial Render** - React creates a Virtual DOM tree based on initial JSX.
2. **State Changes** - When state changes, React generates a new Virtual DOM tree.
3. **Diffing** - React compares new Virtual DOM with previous Virtual DOM, identifying what changed.
4. **Reconciliation** - React calculates the minimal real DOM operations needed.
5. **Real DOM Update** - Only necessary changes are applied to the real DOM.
### Shadow DOM vs Virtual DOM
| | Shadow DOM | Virtual DOM |
|--|------------|-------------|
| What | Browser technology for scoping variables and CSS in web components | Concept implemented by React on top of browser APIs |
### ReactDOM
- ReactDOM is the **glue between React and the DOM**.
- React creates a Virtual DOM; ReactDOM efficiently updates the real DOM based on it.
---
## React Reconciliation
- Reconciliation is the process of syncing the Virtual DOM to the actual DOM.
- Tracks changes in component state and renders updated state to the screen.
### Fiber Reconciler (React 16+)
- Asynchronous (new reconciliation engine in React v16)
- Divides work into multiple units (incremental rendering)
- Sets priority for each work unit - can **pause, reuse, and abort** work
- Separates reconciliation into two phases:
 - **Phase 1: Render/Processing** - React creates a list of all UI changes (can be interrupted)
 - **Phase 2: Commit** - React applies the changes to the real DOM (cannot be interrupted)
---
# Virtual DOM vs Real DOM in React
A complete visual guide to how React's reconciliation engine works - from state change to screen update.
## 1. What is the Real DOM?
The **Real DOM** is the browser's live tree representation of your HTML page. Every change (even a single text update) triggers an expensive rendering pipeline:
DOM change -> Style calculation -> Layout reflow -> Repaint -> Compositing
## 2. What is the Virtual DOM?
The **Virtual DOM** is React's lightweight JavaScript copy of the UI. When state/props change, React:
- Builds a new Virtual DOM tree
- Diffs it with the previous one (Reconciliation)
- Calculates the **minimum** changes
- Applies them in **one batch** to the Real DOM
### Virtual DOM Node Example
```js
// <div className="card"><h1>Hello</h1></div> becomes:
{
 type: "div",
 props: { className: "card" },
 children: [
 { type: "h1", props: {}, children: ["Hello"] }
 ]
}
```
## 3. The Full Update Cycle
![React Reconciliation Flow - From State Change to Screen Update](/DSA-Notes-Problems/assets/react/update-cycle.svg)
## 4. The Diffing Algorithm (Reconciliation)
React uses smart heuristics for fast O(n) diffing:
- **Rule 1**: Different element types -> entire subtree is replaced (state lost)
- **Rule 2**: Same type -> only changed props/attributes are updated
- **Rule 3**: Lists must have stable `key` props for efficient add/move/remove
```jsx
// Recommended
{items.map(item => <li key={item.id}>{item.name}</li>)}
```
## 5. Mental Model
![Virtual DOM vs Real DOM - Mental Model](/DSA-Notes-Problems/assets/react/mental-model.svg)
Think of the Virtual DOM as a cheap **blueprint** and the Real DOM as the actual **building**. React only patches the necessary bricks.
## 6. Real DOM vs Virtual DOM Comparison
| Property | Real DOM | Virtual DOM |
|------------------------|-----------------------------------|--------------------------------------|
| Location | Browser memory | JavaScript memory |
| Creation | Browser HTML parser | React (`createElement`) |
| Update Cost | Expensive (reflow + repaint) | Very cheap |
| Mutation | Direct & slow | Free (old tree discarded) |
| When Updated | Immediately | After reconciliation (batched) |
## 7. Code Example
```jsx
function PriceTag({ price }) {
 return <span className="price">${price}</span>;
}
function App() {
 const [price, setPrice] = useState(10);
 return (
 <div>
 <h1>Product</h1>
 <PriceTag price={price} />
 <button onClick={() => setPrice(p => p + 1)}>
 Increase price
 </button>
 </div>
 );
}
```
Clicking the button only updates the price `<span>` in the Real DOM - everything else stays untouched.
## 8. Key Takeaways
- Real DOM mutations are expensive.
- Virtual DOM makes updates cheap and declarative.
- Reconciliation finds minimal changes.
- Always use `key` props on lists.
- Changing element type (`<div>` -> `<span>`) destroys the subtree.
- This is the foundation of React Fiber (still used in React 18+ / 19+).
**React Virtual DOM & Reconciliation Deep Dive**
---