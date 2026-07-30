// ─── React Labs — Lessons Data ───

import { testContains, testRegex } from "./validators.js";

export const REACT_LESSONS = [
  // ═════════════════════════════════════════════════
  // BEGINNER
  // ═════════════════════════════════════════════════

  {
    id: "jsx-basics",
    chapter: 1,
    title: "JSX Basics",
    level: "Beginner",
    tags: ["JSX", "Expressions", "className", "Fragments"],
    conceptExplanation: `JSX stands for JavaScript XML. It allows you to write HTML-like syntax inside JavaScript.

React converts JSX into React.createElement calls before rendering.

JSX is not HTML — there are some important differences:
• Use className instead of class
• Use htmlFor instead of for
• Self-closing tags require a closing slash: <br />
• You must return a single root element

**Expressions in JSX:**
You can embed any JavaScript expression inside JSX using curly braces {}:
• {variable} — renders a variable
• {2 + 2} — renders 4
• {condition ? "Yes" : "No"} — ternary for conditional rendering
• {object.property} — property access

**Fragments:**
When you need to return multiple elements without a wrapper div, use fragments:
• <></> — shorthand syntax
• <React.Fragment></React.Fragment> — full syntax`,
    keyRules: [
      "Use className instead of class",
      "Use {} for JavaScript expressions, not {{}}",
      "Return a single root element — use <>...</> fragments",
      "Self-closing tags require /> (e.g., <img />, <br />)",
      "JSX comments use {/* comment */} syntax",
    ],
    task: `Create an App component that renders:

1. A div wrapper with className="container"
2. An h1 with the text "Hello React"
3. A paragraph displaying the current year using a variable
4. A paragraph with className="subtitle" containing dynamic text
5. A comment inside JSX

Log your component to see it works.`,
    starterCode: `function App() {
  const year = 2026;
  const subtitle = "My first React app";

  return (
    <div>
      <h1>Hello React</h1>
      {/* TODO: Add a paragraph with the year */}
      {/* TODO: Add a paragraph with className="subtitle" */}
    </div>
  );
}

// Test
const element = App();
console.log("Component:", element);
console.log("Type:", typeof element);
console.log("Props:", element?.props);`,
    solutionCode: `function App() {
  const year = 2026;
  const subtitle = "My first React app";

  return (
    <div className="container">
      <h1>Hello React</h1>
      <p>Year: {year}</p>
      <p className="subtitle">{subtitle}</p>
    </div>
  );
}

const element = App();
console.log("Component:", element);
console.log("Type:", typeof element);
console.log("Props:", element?.props);`,
    hint: `• Use {year} inside JSX to render the variable
• Use className="subtitle" (not class=)
• Wrap everything in <div> or <> for fragments
• Comments: {/* this is a comment */}`,
    tests: [
      { name: "JSX renders content with h1", validate: testContains("<h1>") },
      { name: "JavaScript expression {year} used", validate: testContains("{year}") },
      { name: "className attribute used", validate: testContains("className=") },
      { name: "Component function defined", validate: testContains("function App") },
      { name: "JSX fragment or wrapper div used", validate: (c) => c.includes("<>") || c.includes("<div") },
    ],
  },

  {
    id: "components-props",
    chapter: 2,
    title: "Components & Props",
    level: "Beginner",
    tags: ["Components", "Props", "Reusability", "Composition"],
    conceptExplanation: `Components are the building blocks of React. They let you split the UI into independent, reusable pieces.

**Function Components:**
A component is just a JavaScript function that returns JSX:
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

**Props (Properties):**
Props are how you pass data between components:
<Welcome name="Alice" age={30} />

Props are read-only — a component must never modify its own props.
This makes React components "pure" functions.

**Default Props:**
function Card({ title = "Untitled", children }) {
  return <div className="card">{children}</div>;
}

**Children:**
The special children prop lets you pass JSX elements inside a component:
<Card>This is the children content</Card>`,
    keyRules: [
      "Component names must start with a capital letter",
      "Props are read-only — never mutate them",
      "Use destructuring to access props: function Card({ title, desc })",
      "Use children prop for nested content",
      "Each component should do one thing well (single responsibility)",
    ],
    task: `1. Create a UserCard component that accepts name, role, and avatar props
2. Create an App component that renders three UserCards with different data
3. Use destructuring in the component parameters
4. Render the component tree`,
    starterCode: `// Create a UserCard component
function UserCard({ name, role, avatar }) {
  return (
    <div className="user-card">
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
      <p>{role}</p>
    </div>
  );
}

// Create an App that renders UserCards
function App() {
  const users = [
    { name: "Alice", role: "Developer", avatar: "https://i.pravatar.cc/40?img=1" },
    { name: "Bob", role: "Designer", avatar: "https://i.pravatar.cc/40?img=2" },
    { name: "Charlie", role: "Manager", avatar: "https://i.pravatar.cc/40?img=3" },
  ];

  return (
    <div className="team">
      <h1>Our Team</h1>
      {/* TODO: Render three UserCards */}
    </div>
  );
}

console.log("App rendered:", App());`,
    solutionCode: `function UserCard({ name, role, avatar }) {
  return (
    <div className="user-card">
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
      <p>{role}</p>
    </div>
  );
}

function App() {
  const users = [
    { name: "Alice", role: "Developer", avatar: "https://i.pravatar.cc/40?img=1" },
    { name: "Bob", role: "Designer", avatar: "https://i.pravatar.cc/40?img=2" },
    { name: "Charlie", role: "Manager", avatar: "https://i.pravatar.cc/40?img=3" },
  ];

  return (
    <div className="team">
      <h1>Our Team</h1>
      {users.map(user => (
        <UserCard key={user.name} name={user.name} role={user.role} avatar={user.avatar} />
      ))}
    </div>
  );
}

console.log("App rendered:", App());`,
    hint: `• Destructure props: function Comp({ prop1, prop2 })
• Pass props like HTML attributes: <Comp name="value" />
• Use map() to render arrays of data
• Always add a key prop when rendering lists`,
    tests: [
      { name: "UserCard component defined", validate: testContains("function UserCard") },
      { name: "Props destructured in parameters", validate: testContains("{") && testContains("name") && testContains("role") },
      { name: "Multiple UserCards rendered", validate: (c) => (c.match(/UserCard/g) || []).length >= 2 },
      { name: "Component returns JSX", validate: testContains("return (") && testContains("</") },
    ],
  },

  {
    id: "state-usestate",
    chapter: 3,
    title: "State & useState",
    level: "Beginner",
    tags: ["useState", "State", "Hooks", "Re-rendering"],
    conceptExplanation: `State allows components to remember data between renders. useState is a Hook that lets you add state to function components.

**Basic Usage:**
const [count, setCount] = useState(0);
// count = current state value (0)
// setCount = function to update state

**Rules of useState:**
• Call useState only at the top level of your component
• Don't call useState inside loops, conditions, or nested functions
• State updates trigger re-renders

**Updating State:**
setCount(count + 1);       // Direct value
setCount(prev => prev + 1); // Functional update (safer for async)

**Why State Matters:**
Without state, variables in your component reset on every render.
With state, React remembers the value between renders.

**State is Immutable:**
Never mutate state directly. Always use the setter function.`,
    keyRules: [
      "Call useState at the top level of your component — not in loops or conditions",
      "Never mutate state directly — always use the setter function",
      "Use functional updates when new state depends on previous: setCount(prev => prev + 1)",
      "State updates are async — they batch and apply after the event handler completes",
      "Don't read state right after setting it — the update hasn't happened yet",
    ],
    task: `1. Create a Counter component using useState
2. Display the current count
3. Add increment, decrement, and reset buttons
4. Disable decrement at 0
5. Show a message when count reaches 10`,
    starterCode: `import { useState } from 'react';

function Counter() {
  // TODO: Add useState for count

  return (
    <div className="counter">
      <h2>Count: {/* Display count here */}</h2>
      <div className="buttons">
        <button onClick={() => {}}>+</button>
        <button onClick={() => {}}>-</button>
        <button onClick={() => {}}>Reset</button>
      </div>
      {/* Show message when count >= 10 */}
    </div>
  );
}

console.log("Counter component created");
console.log("Initial render would show count: 0");`,
    solutionCode: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter">
      <h2>Count: {count}</h2>
      <div className="buttons">
        <button onClick={() => setCount(prev => prev + 1)}>+</button>
        <button
          onClick={() => setCount(prev => prev > 0 ? prev - 1 : 0)}
          disabled={count === 0}
        >-</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
      {count >= 10 && <p className="message">Maximum count reached! 🎉</p>}
    </div>
  );
}

console.log("Counter component created");
console.log("Initial render would show count: 0");`,
    hint: `• Import: import { useState } from 'react'
• Declare: const [count, setCount] = useState(0)
• Increment: setCount(prev => prev + 1)
• Decrement with guard: setCount(prev => prev > 0 ? prev - 1 : 0)
• Conditional rendering: {condition && <Element />}`,
    tests: [
      { name: "useState hook imported and used", validate: testContains("useState") },
      { name: "Count is displayed in JSX", validate: (c) => c.includes("{count}") || c.includes("{count}") },
      { name: "Increment button uses setCount", validate: testContains("setCount") },
      { name: "Decrement has guard for 0", validate: testContains("> 0") || testContains("> 0") },
      { name: "Reset button sets to 0", validate: testContains("setCount(0)") || testContains("setCount(0") },
    ],
  },

  {
    id: "event-handling",
    chapter: 4,
    title: "Event Handling",
    level: "Beginner",
    tags: ["Events", "onClick", "onChange", "Event Object"],
    conceptExplanation: `React events are named using camelCase and are passed functions as handlers.

**Common Events:**
• onClick — Click or tap
• onChange — Input value changes
• onSubmit — Form submission
• onMouseEnter / onMouseLeave — Hover
• onKeyDown / onKeyUp — Keyboard
• onFocus / onBlur — Focus

**Event Handler Patterns:**
<button onClick={handleClick}>Click</button>
<button onClick={() => handleClick(id)}>Pass arg</button>
<input onChange={(e) => setValue(e.target.value)} />

**The Event Object:**
React's SyntheticEvent wraps the native browser event:
• e.target — The element that triggered the event
• e.target.value — For inputs
• e.preventDefault() — Stop default behavior
• e.stopPropagation() — Stop event bubbling

**Important:**
Don't call the function — pass it:
✅ onClick={handleClick}
❌ onClick={handleClick()}`,
    keyRules: [
      "Pass a function reference, not a function call: onClick={handleClick} not onClick={handleClick()}",
      "To pass arguments: onClick={() => handleClick(id)}",
      "Always call e.preventDefault() on form submissions to avoid page reload",
      "Use e.target.value to get input values",
      "Event handlers should be pure — avoid side effects in handlers",
    ],
    task: `1. Create a ClickLogger component that tracks clicks
2. Show number of times a button was clicked
3. Add a text input that shows the typed value in real-time
4. Add a form with submit handler that prevents default
5. Show all submitted values in a list`,
    starterCode: `import { useState } from 'react';

function ClickLogger() {
  const [clickCount, setClickCount] = useState(0);
  const [text, setText] = useState('');
  const [submissions, setSubmissions] = useState([]);

  // TODO: Add event handlers

  return (
    <div className="click-logger">
      <h2>Click Logger</h2>
      <button onClick={() => {}}>
        Clicked {clickCount} times
      </button>

      <h3>Live Typing</h3>
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => {}}
      />
      <p>You typed: {text}</p>

      <h3>Form Submission</h3>
      <form onSubmit={(e) => {}}>
        <input type="text" placeholder="Enter item" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {submissions.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

console.log("ClickLogger component ready");`,
    solutionCode: `import { useState } from 'react';

function ClickLogger() {
  const [clickCount, setClickCount] = useState(0);
  const [text, setText] = useState('');
  const [submissions, setSubmissions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.elements[0];
    if (input.value.trim()) {
      setSubmissions(prev => [...prev, input.value]);
      input.value = '';
    }
  };

  return (
    <div className="click-logger">
      <h2>Click Logger</h2>
      <button onClick={() => setClickCount(prev => prev + 1)}>
        Clicked {clickCount} times
      </button>

      <h3>Live Typing</h3>
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
      />
      <p>You typed: {text}</p>

      <h3>Form Submission</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter item" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {submissions.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

console.log("ClickLogger component ready");`,
    hint: `• onClick handler: onClick={() => setState(prev => prev + 1)}
• Input onChange: onChange={(e) => setValue(e.target.value)}
• Form submit: onSubmit={(e) => { e.preventDefault(); ... }}
• e.target gives you the element that triggered the event`,
    tests: [
      { name: "onClick event handler used", validate: testContains("onClick={") },
      { name: "onChange event handler used", validate: testContains("onChange={") },
      { name: "onSubmit event handler with preventDefault", validate: testContains("onSubmit={") && (testContains("preventDefault") || testContains("e.")) },
      { name: "e.target.value used for input", validate: testContains("target.value") },
      { name: "State tracking clicks and text", validate: testContains("useState") && testContains("clickCount") && testContains("setText") },
    ],
  },

  {
    id: "conditional-rendering",
    chapter: 5,
    title: "Conditional Rendering",
    level: "Beginner",
    tags: ["Conditional", "Ternary", "&&", "if/else"],
    conceptExplanation: `Conditional rendering in React works with plain JavaScript — no special syntax needed.

**Techniques:**

**1. Ternary Operator (most common):**
{isLoggedIn ? <Profile /> : <Login />}

**2. Logical && (short-circuit):**
{isAdmin && <AdminPanel />}

**3. If/else (outside JSX):**
if (loading) return <Spinner />;
return <Data />;

**4. Switch/Multiple conditions:**
{status === 'loading' && <Spinner />}
{status === 'error' && <Error />}
{status === 'success' && <Data />}

**5. IIFE (immediately invoked function expression):**
{(() => {
  if (condition) return <A />;
  return <B />;
})()}

**Best Practice:**
Keep conditional logic simple. Extract complex conditions into variables:
const isReady = user && !loading && !error;`,
    keyRules: [
      "Use ternary for if/else: {condition ? <A /> : <B />}",
      "Use && for simple show/hide: {show && <Element />}",
      "0 is falsy but renders as '0' — use !!condition or condition > 0",
      "Don't put if/else inside JSX — extract to a variable or function",
      "Use early return for loading/error states at the top of components",
    ],
    task: `1. Create a UserStatus component with isLoggedIn state
2. Show a login button when logged out
3. Show user profile with greeting when logged in
4. Add a toggle button to switch between states
5. Show different messages based on user role (admin/user)`,
    starterCode: `import { useState } from 'react';

function UserStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('user');

  return (
    <div className="user-status">
      <h2>User Status Demo</h2>

      {/* TODO: Show login/logout based on isLoggedIn */}
      <button onClick={() => setIsLoggedIn(prev => !prev)}>
        {isLoggedIn ? 'Log Out' : 'Log In'}
      </button>

      {/* TODO: Conditional content based on login state */}
      {/* {isLoggedIn ? <Profile /> : <LoginPrompt />} */}

      {/* TODO: Role-based content */}
      {/* {role === 'admin' && <AdminBadge />} */}
    </div>
  );
}

console.log("UserStatus component ready");`,
    solutionCode: `import { useState } from 'react';

function UserStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('user');

  return (
    <div className="user-status">
      <h2>User Status Demo</h2>

      <button onClick={() => setIsLoggedIn(prev => !prev)}>
        {isLoggedIn ? 'Log Out' : 'Log In'}
      </button>

      {isLoggedIn ? (
        <div className="profile">
          <h3>Welcome back, User! 👋</h3>
          {role === 'admin' && <p className="badge">⭐ Admin Access Granted</p>}
          <p>You are logged in as {role}</p>
          <button onClick={() => setRole(prev => prev === 'admin' ? 'user' : 'admin')}>
            Toggle Role: {role === 'admin' ? 'Switch to User' : 'Switch to Admin'}
          </button>
        </div>
      ) : (
        <div className="login-prompt">
          <p>Please log in to continue</p>
          <p className="hint">Click "Log In" to see conditional rendering in action</p>
        </div>
      )}
    </div>
  );
}

console.log("UserStatus component ready");`,
    hint: `• Login/logout toggle: {isLoggedIn ? "Log Out" : "Log In"}
• Show element when condition: {isAdmin && <AdminPanel />}
• Ternary for full branches: {condition ? <A /> : <B />}
• Use variables for complex conditions: const greeting = isLoggedIn ? "Hello" : "Please log in"`,
    tests: [
      { name: "State variable for login tracking", validate: testContains("isLoggedIn") || testContains("isLoggedIn") },
      { name: "Ternary operator for conditional rendering", validate: testContains("?") && testContains(":") },
      { name: "&& operator for conditional rendering", validate: testContains("&&") },
      { name: "Toggle button changes login state", validate: testContains("setIsLoggedIn") || testContains("setIsLoggedIn") },
    ],
  },

  {
    id: "lists-keys",
    chapter: 6,
    title: "Lists & Keys",
    level: "Beginner",
    tags: ["Lists", "Keys", "map", "Rendering"],
    conceptExplanation: `Rendering lists in React uses JavaScript's .map() method.

**Basic List:**
const items = ['Apple', 'Banana', 'Orange'];
return (
  <ul>
    {items.map(item => <li key={item}>{item}</li>)}
  </ul>
);

**Why Keys Matter:**
Keys help React identify which items have changed, been added, or removed.
Without keys, React re-renders the entire list — with keys, it only updates what changed.

**Good Keys:**
• Database IDs: key={user.id}
• Unique strings: key={item.slug}
• Index (last resort): key={index} — only if list is static

**Transforming Data Before Rendering:**
const todoItems = todos.map(todo => ({
  ...todo,
  isOverdue: new Date(todo.dueDate) < new Date()
}));

**Filter + Map:**
{items
  .filter(item => item.isActive)
  .map(item => <Item key={item.id} {...item} />)
}`,
    keyRules: [
      "Always use a unique key when rendering lists with map()",
      "Use stable IDs as keys — never use Math.random()",
      "Avoid using array index as key if items can be reordered",
      "Key must be unique among siblings, not globally unique",
      "Filter first, then map — don't do both in separate steps",
    ],
    task: `1. Create a TodoList component with an array of todo items
2. Render each todo using map() with proper keys
3. Highlight completed todos with a different style
4. Add a button to toggle todo completion
5. Show a count of incomplete items`,
    starterCode: `import { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn JSX', done: true },
    { id: 2, text: 'Learn Components', done: false },
    { id: 3, text: 'Learn State', done: false },
    { id: 4, text: 'Build a project', done: false },
  ]);

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  // TODO: Calculate incomplete count

  return (
    <div className="todo-list">
      <h2>My Todos</h2>
      <p>Incomplete: {/* Show count */}</p>
      <ul>
        {/* TODO: Render todos with map() */}
      </ul>
    </div>
  );
}

console.log("TodoList component ready");`,
    solutionCode: `import { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn JSX', done: true },
    { id: 2, text: 'Learn Components', done: false },
    { id: 3, text: 'Learn State', done: false },
    { id: 4, text: 'Build a project', done: false },
  ]);

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  const incompleteCount = todos.filter(t => !t.done).length;

  return (
    <div className="todo-list">
      <h2>My Todos</h2>
      <p>Incomplete: {incompleteCount}</p>
      <ul>
        {todos.map(todo => (
          <li
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            style={{
              textDecoration: todo.done ? 'line-through' : 'none',
              opacity: todo.done ? 0.6 : 1,
              cursor: 'pointer'
            }}
          >
            {todo.text} {todo.done && '✓'}
          </li>
        ))}
      </ul>
    </div>
  );
}

console.log("TodoList component ready");`,
    hint: `• Array.map(): {items.map(item => <li key={item.id}>{item}</li>)}
• Unique key: key={item.id} (not index!)
• Count incomplete: items.filter(item => !item.done).length
• Toggle with spread: { ...item, done: !item.done }`,
    tests: [
      { name: "map() used for rendering list", validate: testContains(".map(") },
      { name: "Keys used on list items", validate: testContains("key=") },
      { name: "Toggle function toggles todo state", validate: testContains("!todo.done") || testContains("!item.done") },
      { name: "Incomplete count displayed", validate: testContains("filter") || testContains("incompleteCount") || testContains("incomplete") },
    ],
  },

  // ═════════════════════════════════════════════════
  // INTERMEDIATE
  // ═════════════════════════════════════════════════

  {
    id: "forms-controlled",
    chapter: 7,
    title: "Forms & Controlled Components",
    level: "Intermediate",
    tags: ["Forms", "Controlled Components", "Inputs", "Validation"],
    conceptExplanation: `In React, form inputs are typically "controlled" — their value is controlled by React state.

**Controlled Input:**
const [name, setName] = useState('');
<input value={name} onChange={e => setName(e.target.value)} />

**Different Input Types:**
• Text: value + onChange
• Checkbox: checked + onChange
• Select: value + onChange
• Textarea: value + onChange (like input)

**Form Validation:**
function validate(values) {
  const errors = {};
  if (!values.email.includes('@')) errors.email = 'Invalid email';
  return errors;
}

**Form Submission:**
function handleSubmit(e) {
  e.preventDefault();
  // Form is valid — submit data
}

**Uncontrolled Components (alternative):**
Use refs to access DOM values directly — useful for file inputs or integrating with non-React code.`,
    keyRules: [
      "Controlled components: state drives the input value, onChange updates state",
      "Always call e.preventDefault() on form submit to prevent page reload",
      "Validate before submit — show errors for each field",
      "Use a single state object for forms with multiple fields: const [form, setForm] = useState({})",
      "Checkbox uses checked prop, not value",
    ],
    task: `1. Create a RegistrationForm component
2. Include fields: name, email, password, and acceptTerms (checkbox)
3. Validate: name required, email must include @, password 6+ chars
4. Show validation errors below each field
5. On valid submit, show a success message with the data`,
    starterCode: `import { useState } from 'react';

function RegistrationForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    acceptTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validate = () => {
    const errs = {};
    // TODO: Add validation
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="success">
        <h2>Registration Complete! 🎉</h2>
        <p>Name: {form.name}</p>
        <p>Email: {form.email}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      {/* TODO: Add form fields with validation errors */}
    </form>
  );
}

console.log("RegistrationForm ready");`,
    solutionCode: `import { useState } from 'react';

function RegistrationForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    acceptTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.includes('@')) errs.email = 'Enter a valid email';
    if (form.password.length < 6) errs.password = 'Password must be 6+ characters';
    if (!form.acceptTerms) errs.acceptTerms = 'You must accept the terms';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="success">
        <h2>Registration Complete! 🎉</h2>
        <p>Name: {form.name}</p>
        <p>Email: {form.email}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      <label>Name:</label>
      <input name="name" value={form.name} onChange={handleChange} />
      {errors.name && <p className="error">{errors.name}</p>}

      <label>Email:</label>
      <input name="email" value={form.email} onChange={handleChange} />
      {errors.email && <p className="error">{errors.email}</p>}

      <label>Password:</label>
      <input name="password" type="password" value={form.password} onChange={handleChange} />
      {errors.password && <p className="error">{errors.password}</p>}

      <label>
        <input name="acceptTerms" type="checkbox" checked={form.acceptTerms} onChange={handleChange} />
        Accept Terms
      </label>
      {errors.acceptTerms && <p className="error">{errors.acceptTerms}</p>}

      <button type="submit">Register</button>
    </form>
  );
}

console.log("RegistrationForm ready");`,
    hint: `• For checkbox: checked={state} instead of value={state}
• e.target.type === 'checkbox' to detect checkbox inputs
• Validate returns errors object — show each error under its field
• Use e.target.name to dynamically update the correct field: setForm(prev => ({ ...prev, [e.target.name]: value }))`,
    tests: [
      { name: "Form fields are controlled components", validate: testContains("value=") && testContains("onChange") },
      { name: "Form validation implemented", validate: testContains("validate") && testContains("errors") },
      { name: "Checkbox input used for terms", validate: testContains("checkbox") || testContains("checked=") },
      { name: "Form submit prevents default", validate: testContains("preventDefault") },
      { name: "Success state shown on valid submit", validate: testContains("submitted") && testContains("Complete") },
    ],
  },

  {
    id: "useEffect-lifecycle",
    chapter: 8,
    title: "useEffect & Lifecycle",
    level: "Intermediate",
    tags: ["useEffect", "Lifecycle", "Side Effects", "Cleanup"],
    conceptExplanation: `useEffect lets you perform side effects in function components.

**Basic Syntax:**
useEffect(() => {
  // Side effect code
}, [dependencies]);

**Common Use Cases:**
• Fetching data from APIs
• Setting up subscriptions or event listeners
• Manually changing the DOM
• Timers (setTimeout, setInterval)
• Logging

**Three Patterns:**

**1. Runs on every render (no dependency array):**
useEffect(() => { console.log('Rendered'); });
// Avoid unless necessary — can cause infinite loops

**2. Runs once on mount (empty dependency array):**
useEffect(() => { fetchData(); }, []);
// Like componentDidMount

**3. Runs when deps change (with dependencies):**
useEffect(() => { console.log('Count:', count); }, [count]);
// Like componentDidUpdate

**Cleanup Function:**
useEffect(() => {
  const timer = setInterval(() => setTime(new Date()), 1000);
  return () => clearInterval(timer); // Cleanup on unmount
}, []);`,
    keyRules: [
      "Always specify dependencies — empty [] for mount-only, or list what you need",
      "Return a cleanup function for subscriptions, timers, or event listeners",
      "Don't lie about dependencies — include everything the effect uses",
      "Don't put effects inside loops or conditions",
      "Use multiple useEffect calls for unrelated concerns, not one big effect",
    ],
    task: `1. Create a Timer component that shows elapsed seconds
2. Use useEffect with setInterval to update every second
3. Clean up the interval on unmount (return cleanup)
4. Add start/stop buttons to control the timer
5. Log a message when the component mounts and unmounts`,
    starterCode: `import { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // TODO: Add useEffect with setInterval
  // The interval should only run when isRunning is true

  // TODO: Add mount/unmount logging

  return (
    <div className="timer">
      <h2>Timer: {seconds}s</h2>
      <button onClick={() => setIsRunning(prev => !prev)}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <button onClick={() => { setSeconds(0); setIsRunning(false); }}>
        Reset
      </button>
    </div>
  );
}

console.log("Timer component created");`,
    solutionCode: `import { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    console.log('Timer mounted');
    return () => console.log('Timer unmounted');
  }, []);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
      console.log('Interval cleaned up');
    };
  }, [isRunning]);

  return (
    <div className="timer">
      <h2>Timer: {seconds}s</h2>
      <button onClick={() => setIsRunning(prev => !prev)}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <button onClick={() => { setSeconds(0); setIsRunning(false); }}>
        Reset
      </button>
    </div>
  );
}

console.log("Timer component created");`,
    hint: `• useEffect with cleanup: useEffect(() => { timer = setInterval(...); return () => clearInterval(timer); }, [deps])
• Only start timer when running: if (!isRunning) return;
• Dependencies array tells React when to re-run the effect
• Log on mount with useEffect(() => { console.log('mounted'); }, [])`,
    tests: [
      { name: "useEffect imported and used", validate: testContains("useEffect") },
      { name: "Cleanup function returned", validate: testContains("return") && (testContains("clearInterval") || testContains("clearTimeout")) },
      { name: "Timer with setInterval", validate: testContains("setInterval") },
      { name: "Start/stop functionality", validate: testContains("isRunning") || testContains("isRunning") },
    ],
  },

  {
    id: "context-api",
    chapter: 9,
    title: "Context API",
    level: "Intermediate",
    tags: ["Context", "createContext", "useContext", "Prop Drilling"],
    conceptExplanation: `Context provides a way to pass data through the component tree without manually passing props at every level.

**When to Use Context:**
• Theme (dark/light mode)
• User authentication data
• Language/locale preferences
• UI state (sidebar open/closed)

**The Problem (Prop Drilling):**
App → Dashboard → Settings → ThemeToggle (theme prop passed through each level)

**The Solution (Context):**
1. Create context: const ThemeContext = createContext('light')
2. Provide value: <ThemeContext.Provider value={theme}>
3. Consume value: const theme = useContext(ThemeContext)

**Steps to Use Context:**
// 1. Create
const ThemeContext = createContext('light');

// 2. Provider (wraps component tree)
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

// 3. Consumer
function Toolbar() {
  const theme = useContext(ThemeContext);
  return <div className={theme}>Toolbar</div>;
}

**Best Practice:**
Create a custom hook for each context:
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}`,
    keyRules: [
      "Create context outside of components: const MyContext = createContext(defaultValue)",
      "Provider wraps the tree that needs access to the context value",
      "useContext returns the current context value closest up the tree",
      "Context value changes trigger re-renders for all consumers",
      "Don't overuse context — it makes component reuse harder. Prefer props for simple cases.",
    ],
    task: `1. Create a ThemeContext with light/dark theme
2. Create a ThemeProvider component that manages theme state
3. Create a Toolbar component that uses the theme
4. Create a ThemeToggle button to switch themes
5. Apply theme-aware styling`,
    starterCode: `import { useState, createContext, useContext } from 'react';

// 1. Create context
const ThemeContext = createContext('light');

// 2. Provider
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    // TODO: Toggle between light/dark
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Consumer
function Toolbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={'toolbar ' + theme}>
      <h2>Current Theme: {theme}</h2>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'}
      </button>
    </div>
  );
}

// 4. App
function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <h1>Context API Demo</h1>
        <Toolbar />
      </div>
    </ThemeProvider>
  );
}

console.log("Context API demo ready");`,
    solutionCode: `import { useState, createContext, useContext } from 'react';

const ThemeContext = createContext('light');

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const styles = {
    background: theme === 'dark' ? '#1a1a2e' : '#ffffff',
    color: theme === 'dark' ? '#e0e0e0' : '#333333',
    padding: '1rem',
    borderRadius: '8px',
    border: '1px solid ' + (theme === 'dark' ? '#333' : '#ddd'),
  };

  return (
    <div style={styles}>
      <h2>Current Theme: {theme}</h2>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'}
      </button>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <h1>Context API Demo</h1>
        <Toolbar />
      </div>
    </ThemeProvider>
  );
}

console.log("Context API demo ready");`,
    hint: `• Create context: const Ctx = createContext(default)
• Provider: <Ctx.Provider value={val}>{children}</Ctx.Provider>
• Consumer: const val = useContext(Ctx)
• Toggle: setTheme(prev => prev === 'light' ? 'dark' : 'light')`,
    tests: [
      { name: "Context created with createContext", validate: testContains("createContext") },
      { name: "Provider wraps children with value", validate: testContains("Provider") && testContains("value=") },
      { name: "useContext used to consume context", validate: testContains("useContext") },
      { name: "Theme toggle functionality", validate: testContains("toggleTheme") || testContains("toggleTheme") },
    ],
  },

  {
    id: "custom-hooks",
    chapter: 10,
    title: "Custom Hooks",
    level: "Intermediate",
    tags: ["Custom Hooks", "Reusability", "Abstraction"],
    conceptExplanation: `Custom Hooks let you extract component logic into reusable functions.

**Rules for Custom Hooks:**
• Name must start with "use" (e.g., useWindowSize, useLocalStorage)
• Can call other hooks inside
• Each call creates isolated state
• Can return anything (values, functions, JSX)

**Example — useWindowSize:**
function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const handle = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handle);
    handle();
    return () => window.removeEventListener('resize', handle);
  }, []);
  return size;
}

**Example — useLocalStorage:**
function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initial;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

**Benefits:**
• Reuse logic across components
• Keep components clean and focused
• Easy to test in isolation
• Share logic without changing component hierarchy`,
    keyRules: [
      "Custom hooks must start with 'use' (e.g., useToggle, useFetch)",
      "Each instance of a custom hook has its own isolated state",
      "Custom hooks can call other hooks (useState, useEffect, etc.)",
      "Extract complex logic from components into custom hooks",
      "Return an array or object that's convenient for the consumer",
    ],
    task: `1. Create a custom hook called useToggle that manages boolean state
2. Create a custom hook called useCounter that manages counter state
3. Create a component that uses both hooks
4. Add a custom hook called useDocumentTitle that updates the page title
5. Compose hooks together`,
    starterCode: `import { useState, useEffect } from 'react';

// 1. useToggle hook
function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  // TODO: Add toggle function
  return [value, toggle];
}

// 2. useCounter hook
function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);
  // TODO: Add increment, decrement, reset
  return { count, increment, decrement, reset };
}

// 3. Component using custom hooks
function HookDemo() {
  const [isOn, toggle] = useToggle(false);
  const { count, increment, decrement, reset } = useCounter(0);

  // TODO: Add useDocumentTitle that shows "On" or "Off" based on toggle

  return (
    <div className="hook-demo">
      <h2>Custom Hooks Demo</h2>

      <div className="section">
        <h3>useToggle</h3>
        <p>Status: {isOn ? 'ON' : 'OFF'}</p>
        <button onClick={toggle}>Toggle</button>
      </div>

      <div className="section">
        <h3>useCounter</h3>
        <p>Count: {count}</p>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

console.log("HookDemo ready");`,
    solutionCode: `import { useState, useEffect } from 'react';

function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = () => setValue(prev => !prev);
  return [value, toggle];
}

function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev > 0 ? prev - 1 : 0);
  const reset = () => setCount(initial);
  return { count, increment, decrement, reset };
}

function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

function HookDemo() {
  const [isOn, toggle] = useToggle(false);
  const { count, increment, decrement, reset } = useCounter(0);
  useDocumentTitle(isOn ? 'Toggle: ON' : 'Toggle: OFF');

  return (
    <div className="hook-demo">
      <h2>Custom Hooks Demo</h2>

      <div className="section">
        <h3>useToggle</h3>
        <p>Status: {isOn ? 'ON 🔵' : 'OFF ⚪'}</p>
        <button onClick={toggle}>Toggle</button>
      </div>

      <div className="section">
        <h3>useCounter</h3>
        <p>Count: {count}</p>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

console.log("HookDemo ready");`,
    hint: `• Hook naming: function useName() { ... }
• useToggle returns: [value, toggleFunction]
• useCounter returns: { count, increment, decrement, reset }
• Custom hooks can use other hooks inside them
• useDocumentTitle: useEffect with document.title = ...`,
    tests: [
      { name: "useToggle custom hook defined", validate: testContains("function useToggle") },
      { name: "useCounter custom hook defined", validate: testContains("function useCounter") },
      { name: "Custom hooks return values", validate: testContains("return") },
      { name: "Custom hook starts with 'use'", validate: (c) => { const matches = c.match(/function use\w+/g); return matches && matches.length >= 2; } },
    ],
  },

  {
    id: "component-composition",
    chapter: 11,
    title: "Component Composition",
    level: "Intermediate",
    tags: ["Composition", "Children", "Slots", "Layout Components"],
    conceptExplanation: `Composition is the pattern of combining simple components to build complex UIs.

**The children Prop:**
function Card({ children, title }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
    </div>
  );
}
<Card title="Welcome"><p>Content here</p></Card>

**Multiple Slots (Named Children):**
function Layout({ header, sidebar, children }) {
  return (
    <div className="layout">
      <header>{header}</header>
      <aside>{sidebar}</aside>
      <main>{children}</main>
    </div>
  );
}

**Specialization:**
function PrimaryButton({ children, ...props }) {
  return <button className="btn btn-primary" {...props}>{children}</button>;
}

**Container Components:**
function List({ items, renderItem }) {
  return <ul>{items.map(renderItem)}</ul>;
}
<List items={data} renderItem={item => <li key={item.id}>{item.name}</li>} />

**Benefits of Composition:**
• Reuse: Small components can be combined in different ways
• Flexibility: Parent controls the children, not the other way around
• Separation of concerns: Layout doesn't know about content`,
    keyRules: [
      "Use children prop for nesting content inside components",
      "Use multiple props for named slots when children isn't enough",
      "Prefer composition over inheritance — React has no inheritance pattern",
      "Pass render functions (render props) for dynamic content",
      "Spread remaining props with {...props} for flexibility",
    ],
    task: `1. Create a Card component with title and children
2. Create a Badge component that wraps content with a label
3. Create a List component that uses render prop pattern
4. Create a SplitPane component with left and right slots
5. Combine them all in an App`,
    starterCode: `import { useState } from 'react';

// 1. Card component
function Card({ title, children }) {
  return (
    <div className="card">
      <div className="card-header">{title}</div>
      <div className="card-body">{children}</div>
    </div>
  );
}

// 2. Badge component
function Badge({ label, children }) {
  // TODO: Render children with a label badge
  return (
    <div className="badge-wrapper">
      {/* TODO */}
    </div>
  );
}

// 3. List with render prop
function List({ items, renderItem }) {
  // TODO: Render items using renderItem function
  return <div className="list">{/* TODO */}</div>;
}

// 4. SplitPane
function SplitPane({ left, right }) {
  // TODO: Render left and right side by side
  return (
    <div className="split-pane">
      {/* TODO */}
    </div>
  );
}

// 5. App combining everything
function App() {
  const items = ['React', 'Vue', 'Angular', 'Svelte'];

  return (
    <div className="app">
      <Card title="Framework Showcase">
        <List
          items={items}
          renderItem={(item, i) => (
            <Badge key={i} label={String(i + 1)}>
              <span>{item}</span>
            </Badge>
          )}
        />
      </Card>

      <SplitPane
        left={<Card title="Left Panel"><p>Left content</p></Card>}
        right={<Card title="Right Panel"><p>Right content</p></Card>}
      />
    </div>
  );
}

console.log("Composition demo ready");`,
    solutionCode: `import { useState } from 'react';

function Card({ title, children }) {
  return (
    <div className="card">
      <div className="card-header">{title}</div>
      <div className="card-body">{children}</div>
    </div>
  );
}

function Badge({ label, children }) {
  return (
    <div className="badge-wrapper">
      <span className="badge">{label}</span>
      {children}
    </div>
  );
}

function List({ items, renderItem }) {
  return <div className="list">{items.map(renderItem)}</div>;
}

function SplitPane({ left, right }) {
  return (
    <div className="split-pane">
      <div className="split-left">{left}</div>
      <div className="split-right">{right}</div>
    </div>
  );
}

function App() {
  const items = ['React', 'Vue', 'Angular', 'Svelte'];

  return (
    <div className="app">
      <Card title="Framework Showcase">
        <List
          items={items}
          renderItem={(item, i) => (
            <Badge key={i} label={String(i + 1)}>
              <span>{item}</span>
            </Badge>
          )}
        />
      </Card>

      <SplitPane
        left={<Card title="Left Panel"><p>Left content</p></Card>}
        right={<Card title="Right Panel"><p>Right content</p></Card>}
      />
    </div>
  );
}

console.log("Composition demo ready");`,
    hint: `• children prop: {children} in the component body
• Named slots: pass JSX as props like left={<Panel />}
• Render prop: renderItem={item => <div>{item}</div>}
• Map with renderItem: items.map(item => renderItem(item))`,
    tests: [
      { name: "Card component has children prop", validate: testContains("children") },
      { name: "List uses renderItem pattern", validate: testContains("renderItem") },
      { name: "SplitPane has left/right slots", validate: testContains("SplitPane") && (testContains("left") || testContains("right")) },
      { name: "Badge wraps content", validate: testContains("Badge") && testContains("children") },
    ],
  },

  // ═════════════════════════════════════════════════
  // ADVANCED
  // ═════════════════════════════════════════════════

  {
    id: "useref",
    chapter: 12,
    title: "useRef",
    level: "Advanced",
    tags: ["useRef", "Refs", "DOM Access", "Mutable Values"],
    conceptExplanation: `useRef provides a way to hold mutable values that don't cause re-renders when changed.

**Two Main Uses:**

**1. Accessing DOM Elements:**
const inputRef = useRef(null);
<input ref={inputRef} />
// Access: inputRef.current.focus()

**2. Storing Mutable Values (without re-render):**
const countRef = useRef(0);
countRef.current += 1; // No re-render!
// Compare to: const [count, setCount] = useState(0) -> causes re-render

**Key Differences from State:**
• Ref changes do NOT trigger re-renders
• State changes DO trigger re-renders
• Use refs for: timers, DOM elements, previous values
• Use state for: data that should appear in the UI

**Example — Tracking Previous State:**
function Counter() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef(0);

  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);

  return <p>Now: {count}, Before: {prevCountRef.current}</p>;
}

**Ref vs State:**
| Aspect        | Ref           | State         |
|---------------|---------------|---------------|
| Triggers render | No          | Yes           |
| Mutable        | Yes           | No (immutable)|
| Read/Write     | .current      | [val, setVal] |
| Sync           | Immediate     | Async (batching) |`,
    keyRules: [
      "useRef returns { current: initialValue } — mutate via .current",
      "Changing .current does NOT cause re-renders",
      "Use refs for DOM access (focus, scroll, measurements)",
      "Use refs for values that need to persist across renders but don't affect UI",
      "Don't read/write refs during rendering — do it in useEffect or event handlers",
    ],
    task: `1. Create an AutoFocusInput component that autofocuses on mount
2. Create a Stopwatch component using useRef for the interval timer
3. Track the previous count value using useRef
4. Show the number of renders using a ref counter`,
    starterCode: `import { useState, useEffect, useRef } from 'react';

// 1. AutoFocusInput
function AutoFocusInput() {
  // TODO: Add ref and focus on mount
  return <input ref={null} placeholder="I should be focused..." />;
}

// 2. Stopwatch with ref-based timer
function Stopwatch() {
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);
  const [isRunning, setIsRunning] = useState(false);

  const start = () => {
    // TODO: Start interval using ref
  };

  const stop = () => {
    // TODO: Stop interval using ref
  };

  const reset = () => {
    stop();
    setTime(0);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current); // Cleanup
  }, []);

  return (
    <div>
      <h3>Stopwatch: {time}s</h3>
      <button onClick={start} disabled={isRunning}>Start</button>
      <button onClick={stop} disabled={!isRunning}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

// 3. Render Counter
function RenderCounter() {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <p className="render-info">
      This component rendered {renderCount.current} times
    </p>
  );
}

// 4. App
function App() {
  return (
    <div>
      <AutoFocusInput />
      <Stopwatch />
      <RenderCounter />
    </div>
  );
}

console.log("useRef demo ready");`,
    solutionCode: `import { useState, useEffect, useRef } from 'react';

function AutoFocusInput() {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return <input ref={inputRef} placeholder="I should be focused..." />;
}

function Stopwatch() {
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);
  const [isRunning, setIsRunning] = useState(false);

  const start = () => {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);
  };

  const stop = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const reset = () => {
    stop();
    setTime(0);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div>
      <h3>Stopwatch: {time}s</h3>
      <button onClick={start} disabled={isRunning}>Start</button>
      <button onClick={stop} disabled={!isRunning}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

function RenderCounter() {
  const renderCount = useRef(0);
  renderCount.current += 1;
  return <p>This component rendered {renderCount.current} times</p>;
}

function App() {
  return (
    <div>
      <AutoFocusInput />
      <Stopwatch />
      <RenderCounter />
    </div>
  );
}

console.log("useRef demo ready");`,
    hint: `• Ref: const ref = useRef(initial); ref.current = newValue;
• Focus input: inputRef.current?.focus()
• Timer ref: intervalRef.current = setInterval(...); clearInterval(intervalRef.current)
• Render count: renderCount.current += 1 (no re-render!)
• Cleanup interval on unmount: return () => clearInterval(ref.current)`,
    tests: [
      { name: "useRef used for DOM access", validate: testContains("useRef") && testContains("ref=") },
      { name: "Auto-focus on mount", validate: testContains("focus(") },
      { name: "Interval stored in ref", validate: testContains("intervalRef") && testContains("setInterval") },
      { name: "Interval cleanup on unmount", validate: testContains("clearInterval") },
      { name: "Render count tracked with ref", validate: testContains("renderCount.current") },
    ],
  },

  {
    id: "usereducer",
    chapter: 13,
    title: "useReducer",
    level: "Advanced",
    tags: ["useReducer", "State Management", "Reducers", "Actions"],
    conceptExplanation: `useReducer is an alternative to useState for complex state logic that involves multiple sub-values or depends on previous state.

**When to Use useReducer:**
• State has multiple fields that change together
• State transitions are complex
• You want to centralize state logic
• You need to replace useState in a component that's getting messy

**Basic Pattern:**
const [state, dispatch] = useReducer(reducer, initialState);

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT': return { count: state.count + 1 };
    case 'DECREMENT': return { count: state.count - 1 };
    case 'SET': return { count: action.payload };
    default: return state;
  }
}

// Dispatch actions
dispatch({ type: 'INCREMENT' });
dispatch({ type: 'SET', payload: 10 });

**Benefits:**
• Predictable state updates (pure reducer function)
• Easy to test (reducer is a pure function)
• Centralized logic (all state transitions in one place)
• Works great with Context for global state

**Reducer Rules:**
• Must be a pure function (no side effects)
• Must return the new state (never mutate the previous state)
• Should return the same state for unknown action types (default)`,
    keyRules: [
      "Reducers must be pure functions — no side effects, no async, no Date.now()",
      "Always return state in the default case of your switch",
      "Never mutate state directly — return a new object",
      "Use action.type (string) to identify the action and action.payload for data",
      "Combine with Context for global state management without Redux",
    ],
    task: `1. Create a shopping cart using useReducer
2. Actions: ADD_ITEM, REMOVE_ITEM, UPDATE_QUANTITY, CLEAR_CART
3. Display cart items with quantities and total price
4. Show item count badge
5. Demonstrate each action type`,
    starterCode: `import { useReducer } from 'react';

// Initial state
const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

// Reducer
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      // TODO: Add item or increment quantity if exists
      return state;
    case 'REMOVE_ITEM':
      // TODO: Remove item by id
      return state;
    case 'CLEAR_CART':
      // TODO: Reset to initial state
      return state;
    default:
      return state;
  }
}

function ShoppingCart() {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  const products = [
    { id: 1, name: 'React T-Shirt', price: 25 },
    { id: 2, name: 'JS Mug', price: 12 },
    { id: 3, name: 'CSS Hoodie', price: 45 },
  ];

  return (
    <div className="cart-demo">
      <h2>Shopping Cart 🛒</h2>
      <p>Items in cart: {cart.totalItems}</p>
      <p>Total: \${cart.totalPrice}</p>

      <div className="products">
        <h3>Products</h3>
        {products.map(p => (
          <div key={p.id} className="product">
            <span>{p.name} - \${p.price}</span>
            <button onClick={() => dispatch({ type: 'ADD_ITEM', payload: p })}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="cart-items">
        <h3>Cart</h3>
        {/* TODO: Render cart items */}
        {cart.items.length === 0 && <p>Cart is empty</p>}
      </div>

      {cart.items.length > 0 && (
        <button onClick={() => dispatch({ type: 'CLEAR_CART' })}>
          Clear Cart
        </button>
      )}
    </div>
  );
}

console.log("ShoppingCart ready");`,
    solutionCode: `import { useReducer } from 'react';

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        const items = state.items.map(i =>
          i.id === existing.id ? { ...i, qty: i.qty + 1 } : i
        );
        return { ...state, items, totalItems: state.totalItems + 1, totalPrice: state.totalPrice + action.payload.price };
      }
      const items = [...state.items, { ...action.payload, qty: 1 }];
      return { ...state, items, totalItems: state.totalItems + 1, totalPrice: state.totalPrice + action.payload.price };
    }
    case 'REMOVE_ITEM': {
      const item = state.items.find(i => i.id === action.payload);
      if (!item) return state;
      const items = state.items.filter(i => i.id !== action.payload);
      return { ...state, items, totalItems: state.totalItems - item.qty, totalPrice: state.totalPrice - (item.price * item.qty) };
    }
    case 'CLEAR_CART':
      return initialState;
    default:
      return state;
  }
}

function ShoppingCart() {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  const products = [
    { id: 1, name: 'React T-Shirt', price: 25 },
    { id: 2, name: 'JS Mug', price: 12 },
    { id: 3, name: 'CSS Hoodie', price: 45 },
  ];

  return (
    <div className="cart-demo">
      <h2>Shopping Cart 🛒</h2>
      <p>Items in cart: {cart.totalItems}</p>
      <p>Total: \${cart.totalPrice}</p>

      <div className="products">
        <h3>Products</h3>
        {products.map(p => (
          <div key={p.id} className="product">
            <span>{p.name} - \${p.price}</span>
            <button onClick={() => dispatch({ type: 'ADD_ITEM', payload: p })}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="cart-items">
        <h3>Cart</h3>
        {cart.items.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          cart.items.map(item => (
            <div key={item.id} className="cart-item">
              <span>{item.name} x{item.qty} - \${item.price * item.qty}</span>
              <button onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}>
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {cart.items.length > 0 && (
        <button onClick={() => dispatch({ type: 'CLEAR_CART' })}>
          Clear Cart
        </button>
      )}
    </div>
  );
}

console.log("ShoppingCart ready");`,
    hint: `• useReducer(reducer, initialState) returns [state, dispatch]
• Actions: { type: 'ACTION_NAME', payload: data }
• Reducer: (state, action) => newState — must be pure
• Check if item exists before adding: state.items.find(i => i.id === id)
• Default case must return state unchanged`,
    tests: [
      { name: "useReducer imported and used", validate: testContains("useReducer") },
      { name: "Reducer function defined", validate: testContains("function cartReducer") || testContains("function reducer") },
      { name: "ADD_ITEM action handled", validate: testContains("ADD_ITEM") },
      { name: "CLEAR_CART action handled", validate: testContains("CLEAR_CART") },
      { name: "State returned in default case", validate: testContains("default") && testContains("return state") },
    ],
  },

  {
    id: "usememo-usecallback",
    chapter: 14,
    title: "useMemo & useCallback",
    level: "Advanced",
    tags: ["useMemo", "useCallback", "Memoization", "Performance"],
    conceptExplanation: `useMemo and useCallback are performance hooks that prevent unnecessary recalculations and re-renders.

**useMemo — Memoize Values:**
const expensiveResult = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

Only recalculates when dependencies [a, b] change.

**useCallback — Memoize Functions:**
const handleClick = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

Returns the same function reference as long as dependencies don't change.

**When to Use:**
• Expensive calculations (large data transformations)
• Referential equality (preventing child re-renders)
• Preventing unnecessary effect re-runs

**When NOT to Use:**
• Simple calculations (useMemo adds overhead)
• Every function (useCallback overhead isn't free)
• Premature optimization — measure first!

**useCallback + React.memo Pattern:**
const Child = React.memo(({ onClick }) => {
  // Only re-renders if onClick reference changes
  return <button onClick={onClick}>Click</button>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const stableFn = useCallback(() => console.log(count), [count]);
  return <Child onClick={stableFn} />;
}`,
    keyRules: [
      "useMemo memoizes a computed value — use for expensive calculations",
      "useCallback memoizes a function reference — use to prevent child re-renders",
      "Always provide a dependency array — empty [] means compute once",
      "Don't over-optimize — most apps don't need these until you have a performance problem",
      "Combining React.memo + useCallback is the most common performance pattern",
    ],
    task: `1. Create a component with an expensive computation (filtering items)
2. Use useMemo to cache the filtered/sorted list
3. Use useCallback for click handlers passed to child components
4. Create a child component wrapped in React.memo
5. Compare render behavior (with and without memoization)`,
    starterCode: `import { useState, useMemo, useCallback } from 'react';

// Simulate expensive computation
function filterAndSort(items, searchTerm, sortBy) {
  console.log('Filtering and sorting...');
  const filtered = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return filtered.sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return a.price - b.price;
  });
}

// Item component wrapped in React.memo
const Item = React.memo(({ item, onSelect }) => {
  console.log('Rendering:', item.name);
  return (
    <div className="item" onClick={() => onSelect(item)}>
      <span>{item.name}</span>
      <span>\${item.price}</span>
    </div>
  );
});

function ProductList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [selectedId, setSelectedId] = useState(null);

  const products = [
    { id: 1, name: 'JavaScript Course', price: 49 },
    { id: 2, name: 'React Masterclass', price: 79 },
    { id: 3, name: 'CSS Animations', price: 39 },
    { id: 4, name: 'Node.js Backend', price: 69 },
    { id: 5, name: 'TypeScript Guide', price: 59 },
  ];

  // TODO: Use useMemo to memoize filtered/sorted products
  const visibleProducts = filterAndSort(products, searchTerm, sortBy);

  // TODO: Use useCallback to memoize the handler
  const handleSelect = (item) => {
    setSelectedId(item.id);
  };

  return (
    <div className="product-list">
      <h2>Products ({products.length})</h2>

      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
        <option value="name">Sort by Name</option>
        <option value="price">Sort by Price</option>
      </select>

      <p>Selected: {selectedId ? products.find(p => p.id === selectedId)?.name : 'None'}</p>

      <div className="items">
        {visibleProducts.map(product => (
          <Item key={product.id} item={product} onSelect={handleSelect} />
        ))}
      </div>
    </div>
  );
}

console.log("ProductList ready");`,
    solutionCode: `import { useState, useMemo, useCallback } from 'react';

function filterAndSort(items, searchTerm, sortBy) {
  console.log('Filtering and sorting...');
  const filtered = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return filtered.sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return a.price - b.price;
  });
}

const Item = React.memo(({ item, onSelect }) => {
  console.log('Rendering:', item.name);
  return (
    <div className="item" onClick={() => onSelect(item)}>
      <span>{item.name}</span>
      <span>\${item.price}</span>
    </div>
  );
});

function ProductList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [selectedId, setSelectedId] = useState(null);

  const products = [
    { id: 1, name: 'JavaScript Course', price: 49 },
    { id: 2, name: 'React Masterclass', price: 79 },
    { id: 3, name: 'CSS Animations', price: 39 },
    { id: 4, name: 'Node.js Backend', price: 69 },
    { id: 5, name: 'TypeScript Guide', price: 59 },
  ];

  const visibleProducts = useMemo(
    () => filterAndSort(products, searchTerm, sortBy),
    [searchTerm, sortBy]
  );

  const handleSelect = useCallback((item) => {
    setSelectedId(item.id);
  }, []);

  return (
    <div className="product-list">
      <h2>Products ({products.length})</h2>

      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
        <option value="name">Sort by Name</option>
        <option value="price">Sort by Price</option>
      </select>

      <p>Selected: {selectedId ? products.find(p => p.id === selectedId)?.name : 'None'}</p>

      <div className="items">
        {visibleProducts.map(product => (
          <Item key={product.id} item={product} onSelect={handleSelect} />
        ))}
      </div>
    </div>
  );
}

console.log("ProductList ready");`,
    hint: `• useMemo: const val = useMemo(() => compute(a, b), [a, b])
• useCallback: const fn = useCallback(() => doSomething(a), [a])
• React.memo(Component) — only re-renders if props change
• useMemo caches values, useCallback caches functions
• Both need dependency arrays to know when to recompute`,
    tests: [
      { name: "useMemo used for value memoization", validate: testContains("useMemo") },
      { name: "useCallback used for function memoization", validate: testContains("useCallback") },
      { name: "React.memo wraps child component", validate: testContains("React.memo") },
      { name: "Dependency arrays provided", validate: (c) => { const matches = c.match(/,\s*\[/g); return matches && matches.length >= 2; } },
      { name: "Expensive function exists", validate: testContains("filterAndSort") || testContains("filter") || testContains("sort") },
    ],
  },

  {
    id: "react-memo",
    chapter: 15,
    title: "React.memo",
    level: "Advanced",
    tags: ["React.memo", "Memoization", "Re-renders", "Performance"],
    conceptExplanation: `React.memo is a higher-order component that prevents re-renders when props haven't changed.

**Basic Usage:**
const MemoizedComponent = React.memo(function MyComponent(props) {
  return <div>{props.name}</div>;
});

// Only re-renders when props.name changes

**How It Works:**
React.memo performs a shallow comparison of props.
If props are the same as the previous render, React skips re-rendering.

**Custom Comparison:**
React.memo(Component, (prevProps, nextProps) => {
  // Return true if props are equal (skip re-render)
  return prevProps.id === nextProps.id;
});

**When to Use:**
• Pure presentational components that render often
• Components at the top of a large tree (prevent cascading re-renders)
• Components receiving stable callbacks (useCallback)
• Components with expensive rendering (large lists, charts)

**When NOT to Use:**
• Components with cheap renders (the comparison also costs)
• Components that always receive different props
• Premature optimization — profile first!

**React.memo + useCallback = Best Friends:**
function Parent() {
  const [count, setCount] = useState(0);
  // useCallback keeps the function reference stable
  const increment = useCallback(() => setCount(c => c + 1), []);
  // React.memo prevents re-render if increment reference is the same
  return <Child onIncrement={increment} />;
}`,
    keyRules: [
      "React.memo is a higher-order component — it wraps another component",
      "Shallow prop comparison — objects and arrays create new references each render",
      "Combine with useCallback for function props and useMemo for object props",
      "Don't wrap every component — only components that benefit from skipping re-renders",
      "Use custom comparison for complex objects: React.memo(Comp, (prev, next) => ...)",
    ],
    task: `1. Create an ExpensiveList component that simulates slow rendering
2. Wrap it with React.memo
3. Create a parent that adds items and a separate counter
4. Show that the list only re-renders when items change, not when counter changes
5. Add a custom comparison function`,
    starterCode: `import { useState } from 'react';

// Expensive list component (simulates slow rendering)
function ExpensiveList({ items, onRemove }) {
  console.log('ExpensiveList re-rendered!');
  // Simulate expensive render
  const start = performance.now();
  while (performance.now() - start < 2) {} // 2ms delay

  return (
    <div className="expensive-list">
      <h3>Expensive List ({items.length} items)</h3>
      {items.map(item => (
        <div key={item.id} className="list-item">
          <span>{item.text}</span>
          <button onClick={() => onRemove(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

// TODO: Wrap ExpensiveList with React.memo

function App() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([
    { id: 1, text: 'Learn React.memo' },
    { id: 2, text: 'Understand re-renders' },
    { id: 3, text: 'Profile performance' },
  ]);

  const addItem = () => {
    setItems(prev => [...prev, {
      id: Date.now(),
      text: 'New Item ' + (prev.length + 1)
    }]);
  };

  // TODO: Wrap in useCallback for React.memo compatibility
  const handleRemove = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="app">
      <h2>React.memo Demo</h2>

      <div className="controls">
        <p>Counter: {count}</p>
        <button onClick={() => setCount(prev => prev + 1)}>
          Increment Counter (should NOT re-render list)
        </button>
        <button onClick={addItem}>
          Add Item (should re-render list)
        </button>
      </div>

      <ExpensiveList items={items} onRemove={handleRemove} />
    </div>
  );
}

console.log("React.memo demo ready");`,
    solutionCode: `import { useState, useCallback } from 'react';

function ExpensiveList({ items, onRemove }) {
  console.log('ExpensiveList re-rendered!');
  const start = performance.now();
  while (performance.now() - start < 2) {}

  return (
    <div className="expensive-list">
      <h3>Expensive List ({items.length} items)</h3>
      {items.map(item => (
        <div key={item.id} className="list-item">
          <span>{item.text}</span>
          <button onClick={() => onRemove(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

const MemoizedList = React.memo(ExpensiveList);

function App() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([
    { id: 1, text: 'Learn React.memo' },
    { id: 2, text: 'Understand re-renders' },
    { id: 3, text: 'Profile performance' },
  ]);

  const addItem = () => {
    setItems(prev => [...prev, {
      id: Date.now(),
      text: 'New Item ' + (prev.length + 1)
    }]);
  };

  const handleRemove = useCallback((id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  return (
    <div className="app">
      <h2>React.memo Demo</h2>

      <div className="controls">
        <p>Counter: {count}</p>
        <button onClick={() => setCount(prev => prev + 1)}>
          Increment Counter (should NOT re-render list)
        </button>
        <button onClick={addItem}>
          Add Item (should re-render list)
        </button>
      </div>

      <MemoizedList items={items} onRemove={handleRemove} />
    </div>
  );
}

console.log("React.memo demo ready");`,
    hint: `• Wrap component: const Memo = React.memo(Component)
• Only re-renders when props change (shallow comparison)
• for function props: use useCallback to keep the same reference
• for object props: use useMemo to keep the same reference
• The console log shows you when it re-renders`,
    tests: [
      { name: "React.memo used to wrap component", validate: testContains("React.memo(") },
      { name: "useCallback used for stable function reference", validate: testContains("useCallback") },
      { name: "Memoized component used in JSX", validate: (c) => c.includes("MemoizedList") || c.includes("React.memo") },
      { name: "Separate counter state that doesn't affect list", validate: testContains("count") && testContains("setCount") },
    ],
  },

  {
    id: "error-boundaries",
    chapter: 16,
    title: "Error Boundaries",
    level: "Advanced",
    tags: ["Error Boundaries", "Error Handling", "componentDidCatch"],
    conceptExplanation: `Error Boundaries are React components that catch JavaScript errors in their child component tree, log those errors, and display a fallback UI.

**The Problem:**
Without error boundaries, a JavaScript error in one component crashes the entire React app.

**The Solution:**
Wrap components in an error boundary that shows a fallback UI.

**How to Create:**
Error boundaries are still class components because there's no hook equivalent yet.

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    logErrorToService(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong</h1>;
    }
    return this.props.children;
  }
}

**Where to Place:**
• Wrap individual features — one error shouldn't crash the entire app
• Wrap the app root for last-resort protection
• Wrap async content and data-fetching components

**What Error Boundaries DON'T Catch:**
• Event handlers (use try/catch inside them instead)
• Async code (setTimeout, requestAnimationFrame)
• Server-side rendering
• Errors in the error boundary itself`,
    keyRules: [
      "Error boundaries are still class components (no hook equivalent yet)",
      "Use getDerivedStateFromError to update state and show fallback UI",
      "Use componentDidCatch to log errors to an error reporting service",
      "Place boundaries strategically — one per major feature area",
      "Event handler errors need try/catch — error boundaries don't catch them",
    ],
    task: `1. Create an ErrorBoundary class component
2. Create a BuggyComponent that throws an error on button click
3. Show a fallback UI when the error is caught
4. Add a "Try Again" button that resets the error state
5. Demonstrate that the rest of the app still works`,
    starterCode: `import { Component } from 'react';

// 1. Error Boundary (class component)
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // TODO: Update state to show fallback UI
    return null;
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error caught by boundary:', error);
    console.log('Component stack:', errorInfo?.componentStack);
  }

  handleReset = () => {
    // TODO: Reset error state
  };

  render() {
    if (this.state.hasError) {
      // TODO: Render fallback UI
      return null;
    }
    return this.props.children;
  }
}

// 2. Buggy Component
function BuggyComponent() {
  const [count, setCount] = useState(0);

  const throwError = () => {
    throw new Error('💥 Buggy component crashed!');
  };

  if (count === 5) {
    throw new Error('Count reached 5 — simulated crash!');
  }

  return (
    <div className="buggy">
      <h3>Buggy Component</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount(prev => prev + 1)}>
        Increment (crash at 5)
      </button>
      <button onClick={throwError}>
        Crash Now 💥
      </button>
    </div>
  );
}

// 3. Safe component (works alongside buggy one)
function SafeComponent() {
  const [count, setCount] = useState(0);
  return (
    <div className="safe">
      <h3>Safe Component ✅</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount(prev => prev + 1)}>
        Increment (always works)
      </button>
    </div>
  );
}

// 4. App
function App() {
  return (
    <div className="app">
      <h1>Error Boundaries Demo</h1>
      <div className="demo-layout">
        <ErrorBoundary>
          <BuggyComponent />
        </ErrorBoundary>
        <SafeComponent />
      </div>
    </div>
  );
}

console.log("Error Boundaries demo ready");`,
    solutionCode: `import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error caught by boundary:', error);
    console.log('Component stack:', errorInfo?.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>⚠️ Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <button className="retry-btn" onClick={this.handleReset}>
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function BuggyComponent() {
  const [count, setCount] = useState(0);

  const throwError = () => {
    throw new Error('💥 Buggy component crashed!');
  };

  if (count === 5) {
    throw new Error('Count reached 5 — simulated crash!');
  }

  return (
    <div className="buggy">
      <h3>Buggy Component</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount(prev => prev + 1)}>
        Increment (crash at 5)
      </button>
      <button onClick={throwError}>Crash Now 💥</button>
    </div>
  );
}

function SafeComponent() {
  const [count, setCount] = useState(0);
  return (
    <div className="safe">
      <h3>Safe Component ✅</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount(prev => prev + 1)}>
        Increment (always works)
      </button>
    </div>
  );
}

function App() {
  return (
    <div className="app">
      <h1>Error Boundaries Demo</h1>
      <div className="demo-layout">
        <ErrorBoundary>
          <BuggyComponent />
        </ErrorBoundary>
        <SafeComponent />
      </div>
    </div>
  );
}

console.log("Error Boundaries demo ready");`,
    hint: `• Error boundary: class with getDerivedStateFromError and componentDidCatch
• getDerivedStateFromError: return { hasError: true } to show fallback
• componentDidCatch: log errors here
• Render fallback UI when hasError is true
• Reset button: this.setState({ hasError: false })`,
    tests: [
      { name: "ErrorBoundary class component defined", validate: testContains("class ErrorBoundary") && testContains("extends Component") },
      { name: "getDerivedStateFromError method exists", validate: testContains("getDerivedStateFromError") },
      { name: "componentDidCatch method exists", validate: testContains("componentDidCatch") },
      { name: "Fallback UI shown on error", validate: testContains("hasError") && testContains("error") },
      { name: "Reset button restores normal state", validate: testContains("Reset") || testContains("reset") },
    ],
  },
];
