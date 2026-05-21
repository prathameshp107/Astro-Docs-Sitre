---
title: "Data Binding"
description: "Learn about data binding in React, including one-way and two-way binding patterns."
sidebar:
  order: 8
---

# Data Binding


## ⚛️ What is Data Binding?

In **React**:

> 👉 Data binding = how data moves between **UI (DOM)** and **JavaScript (state)**

---

## 🔁 Types of Data Binding

There are mainly **2 types**:

1. One-way binding
2. Two-way binding

---

## 🔹 1. One-Way Data Binding (React’s Default ✅)

> 👉 Data flows in ONE direction
> **State → UI**

---

## 🧠 How it works

```txt
State → UI (Render)
```

👉 React controls everything from state

---

## ✅ Example

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

## 🧠 Key Idea

> UI is just a reflection of state

---

## 🔹 2. Two-Way Data Binding

> 👉 Data flows BOTH ways
> **State ↔ UI**

---

## Example (Conceptually)

```txt
State → Input field  
Input change → State update
```

---

## ⚛️ React Way (Controlled Component)

React doesn’t give automatic two-way binding like Angular
👉 You create it manually

---

## ✅ Example

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

## 🧠 Flow Explained

```txt
State → input value  
User types → onChange → updates state  
State updates → UI updates
```

👉 Looks like two-way, but actually:

> ⚠️ It’s still ONE-WAY + event handling

---

# 🔥 Important Insight (Very Important)

👉 React ALWAYS follows:

> **One-way data flow**

Even in “two-way binding” case:

* UI does NOT directly change state
* It sends an event → then state updates

---

# 🧠 Visual Understanding

### One-way binding

```txt
State → UI
```

---

### React “Two-way” (actual flow)

```txt
State → UI  
UI → Event → State update → UI
```

---

## ⚖️ React vs Angular (Quick Insight)

* Angular → true two-way binding (automatic)
* React → controlled, explicit binding

👉 React gives more control and predictability

---

## 🧠 Why React Uses One-Way Binding

* Easier debugging
* Predictable data flow
* Better performance
* Scalable architecture

---

# ⚡ Real Example (Putting It Together)

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

# 🧠 Final Understanding

> React = One-way data flow
> “Two-way binding” = manually controlled via events

---

## Conditional Rendering

Allows rendering different elements based on conditions.

**Use cases:** Showing/hiding elements, toggling functionality, authentication.

**Methods:**
- `if...else` Statement
- `switch` Statement
- Ternary Operator
- Logical `&&` (Short Circuit Evaluation)

```jsx
// Ternary
<div>{flag ? <h1>Hello</h1> : null}</div>

// Short Circuit
<div>{flag && <h1>Hello</h1>}</div>
```

---

## Lists and Keys

- A `key` is a special attribute required when creating list items.
- Console warning appears if key prop is missing.
- Keys give elements a **stable unique identity**.
- Helps React identify which items changed, were added, or removed.

```jsx
{EmployeeArr.map((emp, ind) => (
  <option key={ind} value={emp} />
))}
```

> **Tip:** Avoid using index as key if the list is filtered or sorted — it causes React to consider items as different elements and repaint the whole list.

> **Note:** `map()` is used instead of `forEach()` because JSX needs an array of items — `forEach()` returns `undefined`, `map()` returns an array.

### Read Data from JSON / JS File

```js
// 1. Create employees.json
// 2. Import it
import EmployeeArr from './employees.json';
// 3. Use in JSX
{EmployeeArr.map((emp, ind) => (
  <option key={ind} value={emp} />
))}
```

---

# React Events


## ⚛️ What are React Events?

In **React**:

> 👉 Events are actions that happen in the UI
> (like click, typing, submit, hover)

React lets you **listen to these events and run code**.

---

## 🧠 Simple Idea

> User does something → React catches it → your function runs

---

## 🔥 Basic Example

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
User clicks → onClick → handleClick() runs
```

---

## ⚠️ Important Syntax Difference (HTML vs React)

### ❌ HTML

```html
<button onclick="handleClick()">Click</button>
```

---

### ✅ React

```jsx
<button onClick={handleClick}>Click</button>
```

👉 Differences:

* CamelCase (`onClick`)
* Pass function, don’t call it

---

## 🧩 Common React Events

## 🔹 Mouse Events

* `onClick`
* `onDoubleClick`
* `onMouseEnter`
* `onMouseLeave`

---

## 🔹 Keyboard Events

* `onKeyDown`
* `onKeyUp`

---

## 🔹 Form Events

* `onChange`
* `onSubmit`
* `onFocus`
* `onBlur`

---

## 🧠 Example: Input Event

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

👉 User types → event → state updates → UI updates

---

## 📦 What is Event Object?

Every event gives an object:

```jsx
function handleClick(e) {
  console.log(e);
}
```

👉 `e` = event object

---

## 🔍 Example

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

## 🔥 Synthetic Events (Important)

React uses:

> 👉 **Synthetic Events** (wrapper around browser events)

👉 Why?

* Cross-browser compatibility
* Same behavior everywhere

---

## 🧠 Passing Arguments to Events

### ❌ Wrong

```jsx
<button onClick={handleClick(5)}>Click</button>
```

👉 This runs immediately

---

### ✅ Correct

```jsx
<button onClick={() => handleClick(5)}>Click</button>
```

---

# 🔁 Prevent Default Behavior

Example: form submit reloads page

```jsx
function handleSubmit(e) {
  e.preventDefault();
  console.log("Form submitted");
}
```

---

# 🔄 Event Bubbling (Important Concept)

👉 Events move from child → parent

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

## 🛑 Stop Bubbling

```jsx
function handleClick(e) {
  e.stopPropagation();
}
```

---

# 🧠 Real Example (Everything Together)

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

# 🧠 Final Mental Model

> Event = user action → React handler → state update → UI update

---

# 🔥 One-Line Summary

> React events connect **user actions → your logic → UI updates**

---

# Lifecycle Hooks


## ⚛️ What is React Lifecycle?

In **React**:

> 👉 Lifecycle = the different stages a component goes through from **creation → update → removal**

---

## 🧠 Modern React Reality (IMPORTANT)

👉 Earlier (class components):

* lifecycle methods (`componentDidMount`, etc.)

👉 Now (functional components):

* Lifecycle is handled using **Hooks (`useEffect`)**

---

## 🔥 3 Phases of React Lifecycle

```txt
1. Mounting  (component created)
2. Updating  (component changes)
3. Unmounting (component removed)
```

---

## 🟢 1. Mounting Phase (Component Creation)

> 👉 When component is first rendered on screen

> This is when a component appears on screen for the first time. React runs your component function, builds the virtual DOM, paints to the real DOM, then fires useEffect with an empty [] dependency array. This is your "componentDidMount" equivalent — perfect for fetching initial data, setting up subscriptions, or initializing third-party libraries.

---

## 🧠 What Happens Internally?

1. Function runs
2. JSX returned
3. DOM created
4. UI shown

---

## ✅ Example

```jsx
function App() {
  React.useEffect(() => {
    console.log("Component Mounted");
  }, []);

  return <h1>Hello</h1>;
}
```

---

## 🔍 Explanation

* `useEffect(() => {}, [])`
  👉 Runs ONLY once → after first render

---

## 🧠 Interview Line

> “Mounting is when the component is created and inserted into the DOM. In functional components, we handle it using `useEffect` with an empty dependency array.”

---

## 🔄 2. Updating Phase (Re-render)

> 👉 Happens when:

> Every time state or props change, React re-runs your component function and compares (diffing) the new virtual DOM against the old one. Only the changed parts are updated in the real DOM. useEffect with dependencies fires after every relevant update — React always runs the cleanup of the previous effect before running the new one.

* State changes
* Props change

---

## 🧠 What Happens Internally?

1. State/props change
2. Component function runs again
3. React compares (Virtual DOM)
4. Updates only changed parts

---

## ✅ Example

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

## 🔍 Explanation

* When `count` changes → re-render
* `useEffect` runs again because `[count]` changed

---

## 🧠 Interview Line

> “Updating occurs when state or props change. React re-renders the component and updates the DOM efficiently using the Virtual DOM.”

---

## 🔴 3. Unmounting Phase (Component Removal)

> 👉 When component is removed from DOM

> When a component is removed, React runs the cleanup function returned from useEffect. This is where you cancel timers, remove event listeners, or unsubscribe from streams — critical for preventing memory leaks.


---

## 🧠 What Happens?

* Cleanup runs
* Memory cleared
* Subscriptions removed

---

## ✅ Example

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

## 🔍 Explanation

* Return function = cleanup
* Runs when component is removed

---

## 🧠 Interview Line

> “Unmounting is when the component is removed from the DOM. Cleanup functions inside `useEffect` are used to release resources like timers or subscriptions.”

---

### 📊 How it works
 
![useReducer diagram](/DSA-Notes-Problems/assets/react/react-lifecycle-hooks.svg)

## 🔥 Full Lifecycle in One Example

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

## 🧠 Lifecycle Mapping (VERY IMPORTANT)

| Phase   | Hook Usage                           |
| ------- | ------------------------------------ |
| Mount   | `useEffect(() => {}, [])`            |
| Update  | `useEffect(() => {}, [deps])`        |
| Unmount | `return () => {}` inside `useEffect` |

---

## 🔍 Important Deep Concepts (Interview Level)

## 🔹 1. useEffect Runs AFTER Render

👉 React first updates UI → then runs effect

---

## 🔹 2. Cleanup Runs BEFORE Next Effect

```txt
Old effect cleanup → New effect runs
```

---

## 🔹 3. Multiple useEffects

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

## 🔹 4. Strict Mode (Important)

In development:

👉 React may run effects twice (for safety)

---

## ⚡ Class vs Functional Lifecycle (Interview Comparison)

| Class                | Functional        |
| -------------------- | ----------------- |
| componentDidMount    | useEffect([], []) |
| componentDidUpdate   | useEffect([deps]) |
| componentWillUnmount | cleanup function  |

---

## 🧠 Real-World Example (API Call)

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

👉 Mount → fetch → update → render

---

## 🔥 Final Mental Model

```txt
Mount → Show UI → Run effect  
Update → Re-render → Run effect  
Unmount → Cleanup
```

---

## ⚡ Interview-Ready Summary

> “React lifecycle has three phases: Mounting, Updating, and Unmounting. In modern React, we manage these using `useEffect`. Mounting runs once, updating runs on dependency changes, and unmounting is handled via cleanup functions.”

---

# Forms

- React uses forms to collect user data.
- Use `event.target.value` for field value, `event.target.name` for field name.
- Use `event.preventDefault()` to prevent page refresh on submit.

### Controlled vs Uncontrolled Components

| Feature | Uncontrolled | Controlled |
|---------|-------------|------------|
| One-time value retrieval | ✅ | ✅ |
| Validating on submit | ✅ | ✅ |
| Default value | ✅ | ✅ |
| Field-level Validation | ❌ | ✅ |
| Conditionally disabling submit | ❌ | ✅ |
| Enforcing input format | ❌ | ✅ |
| Dynamic inputs | ❌ | ✅ |

```jsx
// Controlled input
<input onChange={this.onChange} value={this.state.name} />

// Textarea in React
<textarea value={this.state.description} />

// Select in React
<select value={this.state.mycar}>
  <option value="Ford">Ford</option>
</select>
```

### NPM Libraries for Form Handling
- [react-hook-form](https://www.npmjs.com/package/react-hook-form)
- [formik](https://www.npmjs.com/package/formik)
- [yup](https://www.npmjs.com/package/yup)

---

## HTTP Methods & Axios

### HTTP Methods

| Method | Purpose | Example |
|--------|---------|---------|
| `GET` | Retrieve data from DB | Search |
| `POST` | Send data to server, create a resource | Sign up |
| `PUT` | Create or replace a resource | Update profile |
| `PATCH` | Partial update of a resource | Update password |
| `DELETE` | Remove a resource | Delete account |

### HTTP Status Codes

- `1xx` Informational: 100-Continue, 101-Switching Protocols
- `2xx` Success: 200-OK, 201-Created, 204-No Content
- `3xx` Redirection: 301-Moved Permanently, 304-Not Modified
- `4xx` Client Error: 400-Bad Request, 401-Unauthorized, 403-Forbidden, 404-Not Found
- `5xx` Server Error: 500-Internal Server Error, 502-Bad Gateway, 503-Service Unavailable

### Ways to Fetch Data in React

1. `fetch()` with `.then()`
2. `async/await` syntax
3. Axios library
4. Custom hooks

### HTTP with fetch()

```js
fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(data => console.log(data));
```

### Async/Await

```js
const fetchProducts = async function () {
  const products = await fetch("https://fakestoreapi.com/products");
  const productsJSON = await products.json();
  setProducts(productsJSON);
};
```

### HTTP with Axios

```bash
npm i axios
```

```js
import axios from 'axios';

const fetchUsers = async () => {
  const url = "https://jsonplaceholder.typicode.com/users";
  const response = await axios.get(url);
  setUsers(response.data);
};
```

### Axios vs fetch()

| Axios | fetch() |
|-------|---------|
| Built-in XSRF protection | ❌ |
| Uses `data` property | Uses `body` property (must be stringified) |
| Automatic JSON transforms | Two-step process |
| Request timeout & cancellation | ❌ |
| HTTP interceptors built-in | ❌ |
| Download progress support | No upload progress |

### Create Axios Instance

```js
// api.js
import axios from 'axios';
const client = axios.create({ baseURL: 'http://jsonplaceholder.typicode.com/' });
export default client;

// Usage
import client from 'api.js';
client.get('/users');
```

### Multiple Requests with Axios

```js
const [response1, response2] = await axios.all([
  axios.get('https://api.github.com/users/defunkt'),
  axios.get('https://api.github.com/users/evanphx')
]);
```

### HTTP Interceptors

```
HTTP Request → Interceptor → Modified Request → Server
Server → HTTP Response → Interceptor → Modified Response → Component
```

**Request Interceptor:**
```js
axios.interceptors.request.use((req) => {
  req.headers.authorization = "my secret token";
  return req;
});
```

**Response Interceptor:**
```js
axios.interceptors.response.use(
  res => res,
  err => {
    if (err.response.status === 404) {
      throw new Error(`${err.config.url} not found`);
    }
    throw err;
  }
);
```

**Remove an Interceptor:**
```js
const myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor);
```

### Fake REST APIs for Testing

1. https://jsonplaceholder.typicode.com/
2. https://reqres.in/
3. https://fakestoreapi.com/products
4. https://api.github.com/users/google
5. https://dummyjson.com/products

### Create REST API with json-server

```bash
npm install -g json-server
json-server --watch db.json --port=4000
```

Available routes: `GET /employees`, `POST /employees`, `PUT /employees/:id`, `DELETE /employees/:id`

---

## Higher Order Components (HOCs)

- A technique for **re-using component logic**.
- Takes one or more components as arguments and returns a **new upgraded component**.

```js
newComponent = higherOrderComponent(originalComponent);
```

**Use cases:** Authentication, Logging, Styling and Theming, Infinite scroll, Data subscription, Shared search features.

---

## Routing


# ⚛️ What is React Routing?

In **React**:

> 👉 Routing = showing different UI based on the URL **without reloading the page**

---

## 🧠 Simple Example

```txt
/           → Home Page
/about      → About Page
/contact    → Contact Page
```

👉 React changes components, not the whole page

---

# 🔥 Library Used

👉 Most common library:

**React Router**

---

# 🧩 Basic Setup

---

## Step 1: Install

```bash
npm install react-router-dom
```

---

## Step 2: Basic Routing Example

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Home() {
  return <h1>Home</h1>;
}

function About() {
  return <h1>About</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## 🧠 Flow

```txt
URL changes → Router matches path → renders component
```

---

# 🔗 Navigation (VERY IMPORTANT)

---

## Using Link

```jsx
import { Link } from "react-router-dom";

<Link to="/">Home</Link>
<Link to="/about">About</Link>
```

👉 Prevents page reload (SPA behavior)

---

## ❌ Avoid

```html
<a href="/about">About</a>
```

👉 Causes full page reload

---

# 🧩 Types of Routing (Important)

---

# 🔹 1. Static Routing

👉 Fixed routes

```jsx
<Route path="/about" element={<About />} />
```

---

# 🔹 2. Dynamic Routing (VERY IMPORTANT 🔥)

👉 URL with variable

```jsx
<Route path="/user/:id" element={<User />} />
```

---

## Access param

```jsx
import { useParams } from "react-router-dom";

function User() {
  const { id } = useParams();
  return <h1>User {id}</h1>;
}
```

---

# 🔹 3. Nested Routing

👉 Routes inside routes

---

## Example

```jsx
<Route path="/dashboard" element={<Dashboard />}>
  <Route path="profile" element={<Profile />} />
  <Route path="settings" element={<Settings />} />
</Route>
```

---

## Layout

```jsx
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Outlet />
    </div>
  );
}
```

---

# 🔹 4. Protected Routes (Auth)

👉 Restrict access

```jsx
function ProtectedRoute({ children }) {
  const isAuth = true;

  return isAuth ? children : <h1>Login First</h1>;
}
```

---

## Usage

```jsx
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

---

# 🔹 5. Programmatic Navigation

👉 Navigate using code

```jsx
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate("/about")}>
      Go to About
    </button>
  );
}
```

---

# 🔹 6. Query Parameters

👉 URL like:

```txt
/products?category=electronics
```

---

## Access it

```jsx
import { useSearchParams } from "react-router-dom";

function Products() {
  const [params] = useSearchParams();
  const category = params.get("category");

  return <h1>{category}</h1>;
}
```

---

# 🔹 7. Lazy Loading (Performance)

👉 Load pages only when needed

```jsx
const About = React.lazy(() => import("./About"));

<Suspense fallback={<p>Loading...</p>}>
  <About />
</Suspense>
```

---

# 🧠 Important Concepts

---

## 1. SPA (Single Page Application)

👉 React doesn’t reload page
👉 Only updates component

---

## 2. Route Matching

👉 React checks URL → finds matching route

---

## 3. Layout Pattern (VERY IMPORTANT)

```jsx
<Route path="/" element={<Layout />}>
  <Route index element={<Home />} />
  <Route path="about" element={<About />} />
</Route>
```

---

# 🔥 Real-World Example

```jsx
function Layout() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <Outlet />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<h1>Home</h1>} />
          <Route path="dashboard" element={<h1>Dashboard</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

---

# ⚡ Common Mistakes

* Using `<a>` instead of `<Link>`
* Forgetting `<Outlet />` in nested routes
* Not handling 404 page

---

# 🧠 Final Mental Model

```txt
URL → Route match → Component render → UI update
```

---

# 🔥 Interview Summary

> “React Router enables navigation in a SPA by mapping URLs to components. It supports static, dynamic, nested, and protected routes, along with programmatic navigation and query handling.”

---

# State Management in React — Redux & Zustand (Simple Guide)

---

## What Even Is "State Management"? 🤔

Imagine you have a shopping cart. The cart total needs to show in the **header**, the **checkout page**, AND the **cart icon**. If all three components each keep their own copy, they'll get out of sync instantly.

**State management = one single source of truth for your data, shared across your whole app.**

```
Without state management:        With state management:
  Header  → its own count          Header  ↘
  Cart    → its own count          Cart    → [ STORE ] ← one place
  Checkout→ its own count          Checkout↗
  (3 copies, all different 😱)      (all read from same store ✅)
```

---

## The Problem — "Prop Drilling"

Before state management, you'd pass data down through props. This gets painful fast:

![Without state management vs With state management](/DSA-Notes-Problems/assets/react/prop-drilling.svg)

**State management solves this** — any component can grab data directly from the store without passing through parents.

---

## Solution — The Store Pattern

![Store Pattern](/DSA-Notes-Problems/assets/react/store-pattern.svg)

---

# Part 1 — Redux

## The Analogy 🏦

Redux is like a **bank**. You can't just reach into the vault and take money. You must:
1. Fill out a **withdrawal form** (Action)
2. Hand it to the **teller** (Reducer)
3. The teller updates the **vault balance** (State)
4. Your **account shows the new balance** (Component re-renders)

## The 3 Core Concepts

![Redux Core Concepts](/DSA-Notes-Problems/assets/react/redux-core-concepts.svg)

## Redux Code — Step by Step

### Step 1 — Install
```bash
npm install @reduxjs/toolkit react-redux
```

### Step 2 — Create a Slice (state + actions together)
```js
// store/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], total: 0 },

  reducers: {
    // Each function here = one action you can dispatch
    addItem(state, action) {
      state.items.push(action.payload);   // RTK lets you "mutate" safely
      state.total += action.payload.price;
    },
    removeItem(state, action) {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
      state.total = 0;
    }
  }
});

// Export actions (to dispatch) and reducer (for store)
export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
```

### Step 3 — Create the Store
```js
// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,     // access via state.cart
    // user: userReducer,  // add more slices here
  }
});
```

### Step 4 — Wrap your App with Provider
```jsx
// main.jsx
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>  {/* ← makes store available everywhere */}
    <App />
  </Provider>
);
```

### Step 5 — Use in any Component
```jsx
import { useSelector, useDispatch } from 'react-redux';
import { addItem, clearCart } from '../store/cartSlice';

function CartPage() {
  // READ from store
  const { items, total } = useSelector(state => state.cart);

  // WRITE to store
  const dispatch = useDispatch();

  return (
    <div>
      <p>Total: ${total}</p>
      {items.map(item => <div key={item.id}>{item.name}</div>)}

      <button onClick={() => dispatch(addItem({ id: 1, name: 'Shoes', price: 50 }))}>
        Add Shoes
      </button>
      <button onClick={() => dispatch(clearCart())}>
        Clear Cart
      </button>
    </div>
  );
}
```

## Redux Data Flow (Visual)

![Redux Data Flow](/DSA-Notes-Problems/assets/react/redux-data-flow.svg)
---

# Part 2 — Zustand

## The Analogy ☕

If Redux is a bank with formal procedures, **Zustand is a piggy bank**. You just open it and take what you need. Way less ceremony.

```
Redux:  action → dispatch → reducer → store → selector → component
Zustand:        store → component (that's it!)
```

## Zustand Code — Step by Step

### Step 1 — Install
```bash
npm install zustand
```

### Step 2 — Create a Store (everything in one place)
```js
// store/useCartStore.js
import { create } from 'zustand';

const useCartStore = create((set) => ({
  // STATE
  items: [],
  total: 0,

  // ACTIONS (live right inside the store)
  addItem: (item) => set((state) => ({
    items: [...state.items, item],
    total: state.total + item.price
  })),

  removeItem: (id) => set((state) => ({
    items: state.items.filter(i => i.id !== id),
  })),

  clearCart: () => set({ items: [], total: 0 }),
}));

export default useCartStore;
```

### Step 3 — Use Anywhere (no Provider needed!)
```jsx
import useCartStore from '../store/useCartStore';

function CartPage() {
  // Pick exactly what you need from the store
  const items  = useCartStore(state => state.items);
  const total  = useCartStore(state => state.total);
  const addItem    = useCartStore(state => state.addItem);
  const clearCart  = useCartStore(state => state.clearCart);

  return (
    <div>
      <p>Total: ${total}</p>
      <button onClick={() => addItem({ id: 1, name: 'Shoes', price: 50 })}>
        Add Shoes
      </button>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
}
```

**That's it. No Provider, no dispatch, no actions, no reducers.** Just a hook.

---

## Redux vs Zustand — Side by Side

![Redux vs Zustand Comparison](/DSA-Notes-Problems/assets/react/redux-vs-zustand.svg)
---

## When to Use What?
![When to Use Redux or Zustand](/DSA-Notes-Problems/assets/react/when-to-use.svg)
---

## Quick Reference Cheatsheet

### Redux
| What | How |
|---|---|
| Read state | `useSelector(state => state.cart.items)` |
| Trigger action | `dispatch(addItem(payload))` |
| Define state + actions | `createSlice({ name, initialState, reducers })` |
| Create store | `configureStore({ reducer: { cart: cartReducer } })` |
| Wrap app | `<Provider store={store}>` |

### Zustand
| What | How |
|---|---|
| Create store | `create((set) => ({ state, actions }))` |
| Read state | `useStore(state => state.items)` |
| Call action | `useStore(state => state.addItem)(payload)` |
| No Provider needed | Just import and use the hook anywhere |

---

## Interview Q&A — The Ones They Always Ask

**Q: Why not just use useState everywhere?**
`useState` is local to one component. If two components need the same data, you'd have to lift state up — and that causes prop drilling. Stores keep shared data in one place.

**Q: What is a reducer?**
A pure function: `(currentState, action) => newState`. It takes the old state and a description of what happened, and returns a brand new state object. It never mutates the original state.

**Q: What does "pure function" mean in Redux?**
Same inputs always give same output. No side effects (no API calls, no Math.random). This is what makes time-travel debugging possible.

**Q: Why is Zustand simpler than Redux?**
Redux separates actions, reducers, and the store into different concepts. Zustand puts everything (state + actions) inside one `create()` call, and you access it with a single hook — no dispatch, no Provider, no selectors.

**Q: Can you use both in one app?**
Technically yes, but you wouldn't want to. Pick one pattern for sanity.

---

*Generated for interview prep — Redux Toolkit + Zustand, React 18+*
