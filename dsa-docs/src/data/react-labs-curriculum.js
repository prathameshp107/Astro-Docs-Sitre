// ───────────────────────────────────────────────────
// React Labs — Complete Curriculum Data
// 16 Lessons · 16 Bug Challenges · 8 Mini Projects
// ───────────────────────────────────────────────────

// ─── HELPERS ───

function testContains(pattern) {
  return (code) => code.includes(pattern);
}

function testRegex(regex) {
  return (code) => regex.test(code);
}

// ─── LESSONS ───

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

// ─── BUG CHALLENGES ───

export const REACT_BUG_CHALLENGES = [
  {
    id: "bug-frozen-counter",
    title: "1. The Frozen Counter",
    problem: "The counter never updates when the button is clicked. The display stays at 0.",
    learningGoal: "Understand that state must be updated with the setter function, not by mutating the variable directly.",
    brokenCode: `import { useState } from 'react';

function Counter() {
  let count = 0;

  function increment() {
    count = count + 1;
    console.log('Count is now:', count);
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
    </div>
  );
}

console.log("Counter created");`,
    expectedResult: "Counter should increment by one each time the button is clicked.",
    solution: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(prev => prev + 1);
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
    </div>
  );
}`,
    hint: "Is count declared with useState? Are you using the setter function to update it?",
    tests: [
      { name: "useState used for count", validate: testContains("useState") },
      { name: "setCount used to update", validate: testContains("setCount") || testContains("setCount") },
      { name: "Count displayed in JSX", validate: testContains("{count}") },
    ],
  },
  {
    id: "bug-infinite-loop",
    title: "2. The Infinite Loop",
    problem: "The component crashes because it triggers an infinite re-render loop.",
    learningGoal: "Understand that setting state directly inside the component body causes infinite re-renders.",
    brokenCode: `import { useState } from 'react';

function Timer() {
  const [count, setCount] = useState(0);
  setCount(count + 1);

  return (
    <div>
      <p>Count: {count}</p>
    </div>
  );
}

console.log("Timer created");`,
    expectedResult: "State should only be updated in event handlers or useEffect, not directly in the component body.",
    solution: `import { useState, useEffect } from 'react';

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
    </div>
  );
}`,
    hint: "Where is setCount being called? Is it inside a useEffect or an event handler, or directly in the render?",
    tests: [
      { name: "State update not in component body", validate: (c) => !c.includes("setCount(count") || c.includes("useEffect") },
      { name: "useEffect used for side effects", validate: testContains("useEffect") },
    ],
  },
  {
    id: "bug-stale-closure",
    title: "3. The Stale Closure",
    problem: "The counter always increments by 1, no matter how many times you click it quickly.",
    learningGoal: "Understand stale closures and the functional update pattern.",
    brokenCode: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>+3</button>
    </div>
  );
}

console.log("Counter created");`,
    expectedResult: "Each click should increment by 3. Currently it only increments by 1.",
    solution: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>+3</button>
    </div>
  );
}`,
    hint: "When you call setCount(count + 1) three times, does count change between calls? What does 'prev' give you?",
    tests: [
      { name: "Functional update pattern used", validate: testContains("prev =>") || testContains("prev =>") },
    ],
  },
  {
    id: "bug-disappearing-list",
    title: "4. The Disappearing List",
    problem: "Adding a new item to the list causes the entire list to disappear.",
    learningGoal: "Understand array mutations and immutable state updates with spread operator.",
    brokenCode: `import { useState } from 'react';

function TodoList() {
  const [items, setItems] = useState(['Learn React', 'Build App']);

  function addItem() {
    items.push('New Item');
    setItems(items);
  }

  return (
    <div>
      <ul>
        {items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
      <button onClick={addItem}>Add Item</button>
    </div>
  );
}

console.log("TodoList created");`,
    expectedResult: "Items should be added without mutating the original array. Use spread operator.",
    solution: `import { useState } from 'react';

function TodoList() {
  const [items, setItems] = useState(['Learn React', 'Build App']);

  function addItem() {
    setItems(prev => [...prev, 'New Item']);
  }

  return (
    <div>
      <ul>
        {items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
      <button onClick={addItem}>Add Item</button>
    </div>
  );
}`,
    hint: "What's wrong with mutating items directly with push()? How can you create a new array instead?",
    tests: [
      { name: "Spread operator used for immutable update", validate: testContains("...") },
      { name: "No direct mutation of state", validate: !testContains(".push(") || testContains("...") },
    ],
  },
  {
    id: "bug-instant-fire",
    title: "5. The Instant Fire",
    problem: "The effect fires immediately on every keystroke, causing too many API calls.",
    learningGoal: "Understand useEffect dependencies and preventing unnecessary effects.",
    brokenCode: `import { useState, useEffect } from 'react';

function Search() {
  const [query, setQuery] = useState('');

  useEffect(() => {
    console.log('Fetching results for:', query);
    // Simulate API call
  });

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <p>Searching for: {query}</p>
    </div>
  );
}

console.log("Search created");`,
    expectedResult: "The effect should only fire when query changes, not on every render.",
    solution: `import { useState, useEffect } from 'react';

function Search() {
  const [query, setQuery] = useState('');

  useEffect(() => {
    console.log('Fetching results for:', query);
  }, [query]);

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <p>Searching for: {query}</p>
    </div>
  );
}`,
    hint: "What's missing from the useEffect call? What does the dependency array do?",
    tests: [
      { name: "Dependency array added to useEffect", validate: testContains("[query]") || testContains("[query]") },
    ],
  },
  {
    id: "bug-mutant-array",
    title: "6. The Mutant Array",
    problem: "The mutation bug: toggling a todo also toggles another todo with the same text.",
    learningGoal: "Understand reference equality and immutable updates with nested state.",
    brokenCode: `import { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', done: false },
    { id: 2, text: 'Build project', done: false },
  ]);

  const toggleTodo = (id) => {
    const todo = todos.find(t => t.id === id);
    todo.done = !todo.done;
    setTodos(todos);
  };

  return (
    <ul>
      {todos.map(t => (
        <li key={t.id} onClick={() => toggleTodo(t.id)} style={{ textDecoration: t.done ? 'line-through' : 'none' }}>
          {t.text}
        </li>
      ))}
    </ul>
  );
}

console.log("App created");`,
    expectedResult: "Toggling should not mutate state directly. Use map to create updated copies.",
    solution: `import { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', done: false },
    { id: 2, text: 'Build project', done: false },
  ]);

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  return (
    <ul>
      {todos.map(t => (
        <li key={t.id} onClick={() => toggleTodo(t.id)} style={{ textDecoration: t.done ? 'line-through' : 'none' }}>
          {t.text}
        </li>
      ))}
    </ul>
  );
}`,
    hint: "What does .find() return? A copy or the original reference? How can you create a new object instead of mutating?",
    tests: [
      { name: "Immutable update with spread", validate: testContains("...todo") || testContains("...item") },
      { name: "map() used for transformation", validate: testContains(".map(") },
    ],
  },
  {
    id: "bug-missing-cleanup",
    title: "7. The Missing Cleanup",
    problem: "The interval keeps running even after the component is removed, causing memory leaks.",
    learningGoal: "Always return cleanup functions from useEffect to prevent memory leaks.",
    brokenCode: `import { useState, useEffect } from 'react';

function Timer() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setTime(prev => prev + 1);
      console.log('Tick:', time);
    }, 1000);
  }, []);

  return <div>Time: {time}s</div>;
}

function App() {
  const [show, setShow] = useState(true);

  return (
    <div>
      <button onClick={() => setShow(prev => !prev)}>
        {show ? 'Hide Timer' : 'Show Timer'}
      </button>
      {show && <Timer />}
    </div>
  );
}

console.log("App created");`,
    expectedResult: "The interval should be cleared when the component unmounts.",
    solution: `import { useState, useEffect } from 'react';

function Timer() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
      console.log('Timer cleaned up');
    };
  }, []);

  return <div>Time: {time}s</div>;
}

function App() {
  const [show, setShow] = useState(true);
  return (
    <div>
      <button onClick={() => setShow(prev => !prev)}>
        {show ? 'Hide Timer' : 'Show Timer'}
      </button>
      {show && <Timer />}
    </div>
  );
}`,
    hint: "What does the useEffect return? React will call the returned function when the component unmounts.",
    tests: [
      { name: "Cleanup function returned from useEffect", validate: testContains("return") && (testContains("clearInterval") || testContains("() =>")) },
    ],
  },
  {
    id: "bug-conditional-hook",
    title: "8. The Conditional Hook",
    problem: "The app crashes with 'Rendered more hooks than during the previous render' error.",
    learningGoal: "Hooks must be called unconditionally at the top level of the component.",
    brokenCode: `import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  if (userId) {
    const [user, setUser] = useState(null);
    useEffect(() => {
      setUser({ id: userId, name: 'User ' + userId });
    }, [userId]);
  }

  return <div>{userId ? 'Loading...' : 'No user selected'}</div>;
}

console.log("UserProfile created");`,
    expectedResult: "Move useState and useEffect outside the conditional block.",
    solution: `import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userId) {
      setUser({ id: userId, name: 'User ' + userId });
    }
  }, [userId]);

  return <div>{user ? user.name : 'No user selected'}</div>;
}`,
    hint: "Is the useState inside an if statement? Hooks must always be called in the same order on every render.",
    tests: [
      { name: "Hooks called at top level, not in conditionals", validate: (c) => {
        const useStateIdx = c.indexOf("useState");
        const ifIdx = c.indexOf("if (");
        return useStateIdx < ifIdx || ifIdx === -1;
      }},
    ],
  },
  {
    id: "bug-slow-reply",
    title: "9. The Slow Reply",
    problem: "The search input feels laggy and slow to respond to typing.",
    learningGoal: "Use useMemo and useCallback to optimize expensive operations.",
    brokenCode: `import { useState } from 'react';

function ExpensiveSearch() {
  const [query, setQuery] = useState('');
  const [results] = useState(generateItems());

  function generateItems() {
    console.log('Generating 10000 items...');
    const items = [];
    for (let i = 0; i < 10000; i++) {
      items.push({ id: i, name: 'Item ' + i, category: i % 3 === 0 ? 'a' : i % 3 === 1 ? 'b' : 'c' });
    }
    return items;
  }

  const filtered = results.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <p>{filtered.length} results</p>
    </div>
  );
}

console.log("ExpensiveSearch created");`,
    expectedResult: "Use useMemo to prevent expensive calculations on every render.",
    solution: `import { useState, useMemo } from 'react';

function ExpensiveSearch() {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    console.log('Generating 10000 items...');
    const items = [];
    for (let i = 0; i < 10000; i++) {
      items.push({ id: i, name: 'Item ' + i, category: i % 3 === 0 ? 'a' : i % 3 === 1 ? 'b' : 'c' });
    }
    return items;
  }, []);

  const filtered = useMemo(() =>
    results.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    ),
    [results, query]
  );

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <p>{filtered.length} results</p>
    </div>
  );
}`,
    hint: "What's wrong with generating items directly in useState initializer? How can useMemo help?",
    tests: [
      { name: "useMemo used for expensive computation", validate: testContains("useMemo") },
      { name: "Filter function not re-running on every render", validate: (c) => c.includes("useMemo") },
    ],
  },
  {
    id: "bug-wandering-edit",
    title: "10. The Wandering Edit",
    problem: "When editing a todo, the cursor jumps to the end of the input on every keystroke.",
    learningGoal: "Understand controlled component behavior and key prop importance in lists.",
    brokenCode: `import { useState } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React' },
    { id: 2, text: 'Build App' },
  ]);

  const updateTodo = (id, text) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, text } : t));
  };

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <input
            value={todo.text}
            onChange={e => updateTodo(todo.id, e.target.value)}
          />
        </li>
      ))}
    </ul>
  );
}

console.log("TodoApp created");`,
    expectedResult: "The cursor jumping is caused by incorrect key usage or re-rendering. The key should be stable.",
    solution: `import { useState } from 'react';

function TodoItem({ todo, onUpdate }) {
  return (
    <li>
      <input
        value={todo.text}
        onChange={e => onUpdate(todo.id, e.target.value)}
      />
    </li>
  );
}

function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React' },
    { id: 2, text: 'Build App' },
  ]);

  const updateTodo = (id, text) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, text } : t));
  };

  return (
    <ul>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onUpdate={updateTodo} />
      ))}
    </ul>
  );
}`,
    hint: "What happens when the parent re-renders? Are the inputs losing focus? How can you isolate each todo's state?",
    tests: [
      { name: "Todo input uses stable key", validate: testContains("key=") },
      { name: "Input value controlled correctly", validate: testContains("value=") && testContains("onChange") },
    ],
  },
  {
    id: "bug-lost-increment",
    title: "11. The Lost Increment",
    problem: "Double-clicking the increment button only increments once.",
    learningGoal: "Understand React batching and the importance of functional updates.",
    brokenCode: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  function doubleIncrement() {
    setCount(count + 1);
    setCount(count + 1);
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={doubleIncrement}>+2</button>
    </div>
  );
}

console.log("Counter created");`,
    expectedResult: "Each click should increment by 2. Both setCount calls use the stale count value.",
    solution: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  function doubleIncrement() {
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={doubleIncrement}>+2</button>
    </div>
  );
}`,
    hint: "What value does 'count' have when the second setCount runs? Use the functional update form.",
    tests: [
      { name: "Functional update pattern used", validate: (c) => { const matches = c.match(/prev\s*=>/g); return matches && matches.length >= 2; } },
    ],
  },
  {
    id: "bug-dropped-prop",
    title: "12. The Dropped Prop",
    problem: "The child component receives undefined for a required prop.",
    learningGoal: "Ensure all required props are passed and consider default values.",
    brokenCode: `import { useState } from 'react';

function Avatar({ src, alt, size }) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      style={{ borderRadius: '50%' }}
    />
  );
}

function Profile() {
  const [user] = useState({
    name: 'Alice',
    avatar: 'https://i.pravatar.cc/100'
  });

  return (
    <div>
      <Avatar src={user.avatar} alt={user.name} />
      <h2>{user.name}</h2>
    </div>
  );
}

console.log("Profile created");`,
    expectedResult: "Add a default value for the size prop or pass it explicitly. Avatar needs a size prop.",
    solution: `import { useState } from 'react';

function Avatar({ src, alt, size = 60 }) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      style={{ borderRadius: '50%' }}
    />
  );
}

function Profile() {
  const [user] = useState({
    name: 'Alice',
    avatar: 'https://i.pravatar.cc/100'
  });

  return (
    <div>
      <Avatar src={user.avatar} alt={user.name} size={60} />
      <h2>{user.name}</h2>
    </div>
  );
}`,
    hint: "What happens when size is undefined? Where should you define the default value?",
    tests: [
      { name: "Default value for size prop", validate: testContains("size =") || testContains("size=") },
    ],
  },
  {
    id: "bug-readonly-input",
    title: "13. The Read-Only Input",
    problem: "The input field doesn't respond to typing — it stays as an empty string.",
    learningGoal: "Controlled inputs need an onChange handler to update the state.",
    brokenCode: `import { useState } from 'react';

function Form() {
  const [name, setName] = useState('');

  return (
    <div>
      <input value={name} />
      <p>Hello, {name || 'Stranger'}!</p>
    </div>
  );
}

console.log("Form created");`,
    expectedResult: "The input needs an onChange handler that calls setName with the new value.",
    solution: `import { useState } from 'react';

function Form() {
  const [name, setName] = useState('');

  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <p>Hello, {name || 'Stranger'}!</p>
    </div>
  );
}`,
    hint: "What's missing from the input element? How does React know to update the state?",
    tests: [
      { name: "onChange handler on input", validate: testContains("onChange") },
      { name: "setName called with e.target.value", validate: testContains("setName") && testContains("target.value") },
    ],
  },
  {
    id: "bug-restless-effect",
    title: "14. The Restless Effect",
    problem: "The effect runs in an infinite loop, logging repeatedly.",
    learningGoal: "Always specify the correct dependency array for useEffect to avoid loops.",
    brokenCode: `import { useState, useEffect } from 'react';

function Logger() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Count changed:', count);
    setCount(count + 1);
  });

  return <div>Count: {count}</div>;
}

console.log("Logger created");`,
    expectedResult: "The effect should not set state that triggers a re-render in the same effect cycle without dependencies.",
    solution: `import { useState, useEffect } from 'react';

function Logger() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Count changed:', count);
  }, [count]);

  return <div>Count: {count}</div>;
}`,
    hint: "What happens when the effect runs, updates state, and the update causes a re-render which runs the effect again?",
    tests: [
      { name: "Dependency array prevents infinite loop", validate: testContains("[count]") || testContains("[count]") },
      { name: "No state update inside useEffect causing loop", validate: !testContains("setCount(count") || testContains("[") },
    ],
  },
  {
    id: "bug-page-reload",
    title: "15. The Page Reload",
    problem: "Clicking the submit button causes the page to reload instead of updating state.",
    learningGoal: "Always call e.preventDefault() on form submissions in React.",
    brokenCode: `import { useState } from 'react';

function LoginForm() {
  const [form, setForm] = useState({ email: '', password: '' });

  function handleSubmit() {
    console.log('Form submitted:', form);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" value={form.email} onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))} />
      <input name="password" type="password" value={form.password} onChange={e => setForm(prev => ({ ...prev, password: e.target.value }))} />
      <button type="submit">Login</button>
    </form>
  );
}

console.log("LoginForm created");`,
    expectedResult: "Add e.preventDefault() to the submit handler.",
    solution: `import { useState } from 'react';

function LoginForm() {
  const [form, setForm] = useState({ email: '', password: '' });

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Form submitted:', form);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" value={form.email} onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))} />
      <input name="password" type="password" value={form.password} onChange={e => setForm(prev => ({ ...prev, password: e.target.value }))} />
      <button type="submit">Login</button>
    </form>
  );
}`,
    hint: "What does a form do by default when submitted? How do you stop it?",
    tests: [
      { name: "preventDefault called in submit handler", validate: testContains("preventDefault") },
    ],
  },
  {
    id: "bug-lost-this",
    title: "16. The Lost This",
    problem: "The class component's method loses the 'this' context when passed as a callback.",
    learningGoal: "Understand how to bind 'this' in class components.",
    brokenCode: `import { Component } from 'react';

class Counter extends Component {
  state = { count: 0 };

  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    );
  }
}

console.log("Counter created");`,
    expectedResult: "Use an arrow function or bind the method in the constructor.",
    solution: `import { Component } from 'react';

class Counter extends Component {
  state = { count: 0 };

  handleClick = () => {
    this.setState(prev => ({ count: prev.count + 1 }));
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    );
  }
}`,
    hint: "When onClick calls handleClick, what is 'this' referring to? How can you fix it?",
    tests: [
      { name: "Arrow function used for class method", validate: testContains("handleClick =") && testContains("=>") },
      { name: "setState called with proper this context", validate: testContains("this.setState") },
    ],
  },
];

// ─── MINI PROJECTS ───

export const REACT_MINI_PROJECTS = [
  {
    id: "react-project-todo",
    title: "1. Todo App",
    overview: "A full-featured todo application with add, complete, delete, and filter functionality.",
    why: "Todo apps teach CRUD operations, state management, and component composition — the foundation of most applications.",
    concepts: ["useState", "Controlled Inputs", "List Rendering", "Event Handling", "Filtering"],
    checklist: [
      { text: "Add new todo items", done: false },
      { text: "Toggle todo completion", done: false },
      { text: "Delete todo items", done: false },
      { text: "Filter by all/active/completed", done: false },
      { text: "Show remaining count", done: false },
      { text: "Clear completed todos", done: false },
    ],
    starterCode: `import { useState } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', done: true },
    { id: 2, text: 'Build a project', done: false },
  ]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');

  const addTodo = () => {
    // TODO: Add new todo
  };

  const toggleTodo = (id) => {
    // TODO: Toggle done status
  };

  const deleteTodo = (id) => {
    // TODO: Remove todo by id
  };

  const clearCompleted = () => {
    // TODO: Remove all done todos
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.done;
    if (filter === 'completed') return todo.done;
    return true;
  });

  const remaining = todos.filter(t => !t.done).length;

  return (
    <div className="todo-app">
      <h1>📝 Todo App</h1>

      <div className="add-todo">
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Add a new todo..." />
        <button onClick={addTodo}>Add</button>
      </div>

      <div className="filters">
        {['all', 'active', 'completed'].map(f => (
          <button key={f} className={filter === f ? 'active' : ''} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <ul className="todo-list">
        {filteredTodos.map(todo => (
          <li key={todo.id} className={todo.done ? 'done' : ''}>
            <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>✕</button>
          </li>
        ))}
      </ul>

      <div className="footer">
        <span>{remaining} items left</span>
        {todos.some(t => t.done) && (
          <button onClick={clearCompleted}>Clear completed</button>
        )}
      </div>
    </div>
  );
}

console.log("TodoApp ready");`,
    milestones: [
      { title: "Add Todo", task: "Implement addTodo to create new todo items" },
      { title: "Toggle & Delete", task: "Implement toggleTodo and deleteTodo" },
      { title: "Filtering", task: "Implement filter buttons and clearCompleted" },
    ],
    solution: `import { useState } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', done: true },
    { id: 2, text: 'Build a project', done: false },
  ]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos(prev => [...prev, { id: Date.now(), text: input, done: false }]);
    setInput('');
  };

  const toggleTodo = (id) => setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const deleteTodo = (id) => setTodos(prev => prev.filter(t => t.id !== id));
  const clearCompleted = () => setTodos(prev => prev.filter(t => !t.done));

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.done;
    if (filter === 'completed') return todo.done;
    return true;
  });

  const remaining = todos.filter(t => !t.done).length;

  return (
    <div className="todo-app">
      <h1>📝 Todo App</h1>
      <div className="add-todo">
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTodo()} placeholder="Add a new todo..." />
        <button onClick={addTodo}>Add</button>
      </div>
      <div className="filters">
        {['all', 'active', 'completed'].map(f => (
          <button key={f} className={filter === f ? 'active' : ''} onClick={() => setFilter(f)}>{f.charAt(0).toUpperCase() + f.slice(1)}</button>
        ))}
      </div>
      <ul className="todo-list">
        {filteredTodos.map(todo => (
          <li key={todo.id} className={todo.done ? 'done' : ''}>
            <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>✕</button>
          </li>
        ))}
      </ul>
      <div className="footer">
        <span>{remaining} items left</span>
        {todos.some(t => t.done) && <button onClick={clearCompleted}>Clear completed</button>}
      </div>
    </div>
  );
}`,
    tests: [
      { name: "addTodo creates new todo items", validate: testContains("push") || testContains("...prev") },
      { name: "toggleTodo changes done status", validate: testContains("!t.done") || testContains("!todo.done") },
      { name: "deleteTodo removes items", validate: testContains("filter") },
      { name: "Filter buttons change displayed items", validate: testContains("filter") && testContains("setFilter") },
      { name: "Clear completed removes done items", validate: testContains("clearCompleted") || testContains("Clear completed") },
    ],
  },
  {
    id: "react-project-user-directory",
    title: "2. User Directory",
    overview: "A searchable user directory that fetches and displays user cards with role filtering.",
    why: "User directories teach data fetching, search/filter patterns, and responsive card layouts.",
    concepts: ["useState", "useEffect", "Search", "Filtering", "Data Fetching"],
    checklist: [
      { text: "Display user cards with avatar and info", done: false },
      { text: "Search users by name", done: false },
      { text: "Filter by role", done: false },
      { text: "Show loading state", done: false },
      { text: "Show empty state when no results", done: false },
    ],
    starterCode: `import { useState, useEffect } from 'react';

const MOCK_USERS = [
  { id: 1, name: 'Alice Johnson', role: 'Developer', avatar: 'https://i.pravatar.cc/60?img=1', email: 'alice@example.com' },
  { id: 2, name: 'Bob Smith', role: 'Designer', avatar: 'https://i.pravatar.cc/60?img=2', email: 'bob@example.com' },
  { id: 3, name: 'Charlie Brown', role: 'Manager', avatar: 'https://i.pravatar.cc/60?img=3', email: 'charlie@example.com' },
  { id: 4, name: 'Diana Ross', role: 'Developer', avatar: 'https://i.pravatar.cc/60?img=4', email: 'diana@example.com' },
  { id: 5, name: 'Eve Wilson', role: 'Designer', avatar: 'https://i.pravatar.cc/60?img=5', email: 'eve@example.com' },
  { id: 6, name: 'Frank Miller', role: 'Developer', avatar: 'https://i.pravatar.cc/60?img=6', email: 'frank@example.com' },
];

function UserDirectory() {
  const [users] = useState(MOCK_USERS);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  // TODO: Filter users by search term and role

  const filteredUsers = users;

  const roles = [...new Set(users.map(u => u.role))];

  return (
    <div className="user-directory">
      <h1>👥 User Directory</h1>

      <div className="search-bar">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..." />
        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
          <option value="all">All Roles</option>
          {roles.map(role => <option key={role} value={role}>{role}</option>)}
        </select>
      </div>

      <div className="user-grid">
        {/* TODO: Render filtered user cards */}
      </div>

      {filteredUsers.length === 0 && (
        <div className="empty">No users found</div>
      )}
    </div>
  );
}

console.log("UserDirectory ready");`,
    milestones: [
      { title: "Display Users", task: "Render user cards with avatar, name, role, and email" },
      { title: "Search & Filter", task: "Implement search by name and filter by role" },
      { title: "States", task: "Handle loading, empty, and error states" },
    ],
    solution: `import { useState, useEffect } from 'react';

const MOCK_USERS = [
  { id: 1, name: 'Alice Johnson', role: 'Developer', avatar: 'https://i.pravatar.cc/60?img=1', email: 'alice@example.com' },
  { id: 2, name: 'Bob Smith', role: 'Designer', avatar: 'https://i.pravatar.cc/60?img=2', email: 'bob@example.com' },
  { id: 3, name: 'Charlie Brown', role: 'Manager', avatar: 'https://i.pravatar.cc/60?img=3', email: 'charlie@example.com' },
  { id: 4, name: 'Diana Ross', role: 'Developer', avatar: 'https://i.pravatar.cc/60?img=4', email: 'diana@example.com' },
  { id: 5, name: 'Eve Wilson', role: 'Designer', avatar: 'https://i.pravatar.cc/60?img=5', email: 'eve@example.com' },
  { id: 6, name: 'Frank Miller', role: 'Developer', avatar: 'https://i.pravatar.cc/60?img=6', email: 'frank@example.com' },
];

function UserCard({ user }) {
  return (
    <div className="user-card">
      <img src={user.avatar} alt={user.name} className="avatar" />
      <h3>{user.name}</h3>
      <p className="role">{user.role}</p>
      <p className="email">{user.email}</p>
    </div>
  );
}

function UserDirectory() {
  const [users] = useState(MOCK_USERS);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const roles = [...new Set(users.map(u => u.role))];

  return (
    <div className="user-directory">
      <h1>👥 User Directory</h1>

      <div className="search-bar">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..." />
        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
          <option value="all">All Roles</option>
          {roles.map(role => <option key={role} value={role}>{role}</option>)}
        </select>
        <span className="count">{filteredUsers.length} users</span>
      </div>

      <div className="user-grid">
        {filteredUsers.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="empty">No users found. Try a different search.</div>
      )}
    </div>
  );
}`,
    tests: [
      { name: "User cards rendered with map()", validate: testContains(".map(") },
      { name: "Search input filters by name", validate: testContains("includes") && testContains("toLowerCase") },
      { name: "Role filter dropdown used", validate: testContains("roleFilter") && testContains("select") },
      { name: "UserCard component extracted", validate: testContains("UserCard") },
      { name: "Empty state displayed when no results", validate: testContains("No users") || testContains("empty") },
    ],
  },
  {
    id: "react-project-form-wizard",
    title: "3. Form Wizard",
    overview: "A multi-step form wizard with validation, progress tracking, and data review.",
    why: "Multi-step forms are common in checkout, registration, and survey applications.",
    concepts: ["useState", "Multi-step Logic", "Validation", "Form State Management"],
    checklist: [
      { text: "Multi-step navigation (Previous/Next)", done: false },
      { text: "Step progress indicator", done: false },
      { text: "Form validation per step", done: false },
      { text: "Review step before submission", done: false },
      { text: "Success state after completion", done: false },
    ],
    starterCode: `import { useState } from 'react';

const STEPS = ['Personal Info', 'Account Setup', 'Preferences', 'Review'];

function FormWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '', email: '', age: '',
    username: '', password: '',
    newsletter: false, theme: 'light',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    // TODO: Add validation per step
    return errs;
  };

  const nextStep = () => {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      if (step < STEPS.length - 1) setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="success">
        <h2>🎉 Registration Complete!</h2>
        <p>Welcome, {form.name}!</p>
        <p>Check your email at {form.email} to verify your account.</p>
      </div>
    );
  }

  return (
    <div className="form-wizard">
      <h1>📋 Registration Wizard</h1>

      <div className="steps">
        {STEPS.map((s, i) => (
          <div key={s} className={'step ' + (i <= step ? 'active' : '') + (i < step ? 'done' : '')}>
            <div className="step-num">{i < step ? '✓' : i + 1}</div>
            <span>{s}</span>
          </div>
        ))}
      </div>

      <div className="form-step">
        {/* Step 0: Personal Info */}
        {step === 0 && (
          <div>
            <h2>Personal Information</h2>
            <label>Name: <input name="name" value={form.name} onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))} /></label>
            <label>Email: <input name="email" value={form.email} onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))} /></label>
            <label>Age: <input name="age" type="number" value={form.age} onChange={e => setForm(prev => ({ ...prev, age: e.target.value }))} /></label>
          </div>
        )}

        {/* Step 1: Account Setup */}
        {step === 1 && (
          <div>
            <h2>Account Setup</h2>
            <label>Username: <input name="username" value={form.username} onChange={e => setForm(prev => ({ ...prev, username: e.target.value }))} /></label>
            <label>Password: <input name="password" type="password" value={form.password} onChange={e => setForm(prev => ({ ...prev, password: e.target.value }))} /></label>
          </div>
        )}

        {/* Step 2: Preferences */}
        {step === 2 && (
          <div>
            <h2>Preferences</h2>
            <label><input type="checkbox" checked={form.newsletter} onChange={e => setForm(prev => ({ ...prev, newsletter: e.target.checked }))} /> Subscribe to newsletter</label>
            <label>Theme:
              <select value={form.theme} onChange={e => setForm(prev => ({ ...prev, theme: e.target.value }))}>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </label>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div className="review">
            <h2>Review Your Information</h2>
            <div><strong>Name:</strong> {form.name}</div>
            <div><strong>Email:</strong> {form.email}</div>
            <div><strong>Age:</strong> {form.age}</div>
            <div><strong>Username:</strong> {form.username}</div>
            <div><strong>Newsletter:</strong> {form.newsletter ? 'Yes' : 'No'}</div>
            <div><strong>Theme:</strong> {form.theme}</div>
          </div>
        )}

        {errors.step && <p className="error">{errors.step}</p>}
      </div>

      <div className="wizard-actions">
        {step > 0 && <button onClick={prevStep}>← Previous</button>}
        {step < STEPS.length - 1 ? (
          <button onClick={nextStep}>Next →</button>
        ) : (
          <button onClick={handleSubmit} className="submit-btn">Submit ✓</button>
        )}
      </div>
    </div>
  );
}

console.log("FormWizard ready");`,
    milestones: [
      { title: "Multi-step Navigation", task: "Implement previous/next step logic" },
      { title: "Validation", task: "Add validation for each step" },
      { title: "Review & Submit", task: "Show review step and handle submission" },
    ],
    solution: `import { useState } from 'react';

const STEPS = ['Personal Info', 'Account Setup', 'Preferences', 'Review'];

function FormWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', age: '', username: '', password: '', newsletter: false, theme: 'light' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (step === 0) {
      if (!form.name.trim()) errs.name = 'Name required';
      if (!form.email.includes('@')) errs.email = 'Valid email required';
      if (!form.age || Number(form.age) < 1) errs.age = 'Valid age required';
    }
    if (step === 1) {
      if (!form.username.trim()) errs.username = 'Username required';
      if (form.password.length < 4) errs.password = 'Password must be 4+ characters';
    }
    return errs;
  };

  const nextStep = () => {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0 && step < STEPS.length - 1) setStep(prev => prev + 1);
  };

  const prevStep = () => { if (step > 0) setStep(prev => prev - 1); };
  const handleSubmit = () => setSubmitted(true);

  const update = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm(prev => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <div className="success"><h2>🎉 Registration Complete!</h2><p>Welcome, {form.name}!</p><p>Email: {form.email}</p></div>
    );
  }

  return (
    <div className="form-wizard">
      <h1>📋 Registration Wizard</h1>
      <div className="steps">
        {STEPS.map((s, i) => (
          <div key={s} className={'step ' + (i <= step ? 'active' : '') + (i < step ? 'done' : '')}>
            <div className="step-num">{i < step ? '✓' : i + 1}</div><span>{s}</span>
          </div>
        ))}
      </div>

      <div className="form-step">
        {step === 0 && (
          <div><h2>Personal Information</h2>
            <label>Name: <input value={form.name} onChange={update('name')} /></label>{errors.name && <p className="error">{errors.name}</p>}
            <label>Email: <input value={form.email} onChange={update('email')} /></label>{errors.email && <p className="error">{errors.email}</p>}
            <label>Age: <input type="number" value={form.age} onChange={update('age')} /></label>{errors.age && <p className="error">{errors.age}</p>}
          </div>
        )}
        {step === 1 && (
          <div><h2>Account Setup</h2>
            <label>Username: <input value={form.username} onChange={update('username')} /></label>{errors.username && <p className="error">{errors.username}</p>}
            <label>Password: <input type="password" value={form.password} onChange={update('password')} /></label>{errors.password && <p className="error">{errors.password}</p>}
          </div>
        )}
        {step === 2 && (
          <div><h2>Preferences</h2>
            <label><input type="checkbox" checked={form.newsletter} onChange={update('newsletter')} /> Subscribe to newsletter</label>
            <label>Theme: <select value={form.theme} onChange={update('theme')}><option value="light">Light</option><option value="dark">Dark</option></select></label>
          </div>
        )}
        {step === 3 && (
          <div className="review"><h2>Review</h2>
            <div><strong>Name:</strong> {form.name}</div>
            <div><strong>Email:</strong> {form.email}</div>
            <div><strong>Age:</strong> {form.age}</div>
            <div><strong>Username:</strong> {form.username}</div>
            <div><strong>Newsletter:</strong> {form.newsletter ? 'Yes' : 'No'}</div>
            <div><strong>Theme:</strong> {form.theme}</div>
          </div>
        )}
      </div>

      <div className="wizard-actions">
        {step > 0 && <button onClick={prevStep}>← Previous</button>}
        {step < STEPS.length - 1 ? <button onClick={nextStep}>Next →</button> : <button className="submit-btn" onClick={handleSubmit}>Submit ✓</button>}
      </div>
    </div>
  );
}`,
    tests: [
      { name: "Multi-step navigation with previous/next", validate: testContains("nextStep") && testContains("prevStep") },
      { name: "Step progress indicator", validate: testContains("STEPS") && testContains("step") },
      { name: "Form validation per step", validate: testContains("validate") && testContains("errors") },
      { name: "Review step before submission", validate: testContains("Review") && testContains("form.") },
      { name: "Success state after completion", validate: testContains("submitted") && testContains("Complete") },
    ],
  },
  {
    id: "react-project-expense-tracker",
    title: "4. Expense Tracker",
    overview: "Track income and expenses with categorization, totals, and filtering by date range.",
    why: "Expense trackers teach data aggregation, category management, and financial calculations.",
    concepts: ["useState", "useMemo", "Filtering", "Aggregation", "Forms"],
    checklist: [
      { text: "Add expenses with category and amount", done: false },
      { text: "Show total expenses", done: false },
      { text: "Filter by category", done: false },
      { text: "Show category breakdown", done: false },
      { text: "Delete expenses", done: false },
    ],
    starterCode: `import { useState, useMemo } from 'react';

function ExpenseTracker() {
  const [expenses, setExpenses] = useState([
    { id: 1, desc: 'Groceries', amount: 85, category: 'Food' },
    { id: 2, desc: 'Gas', amount: 45, category: 'Transport' },
    { id: 3, desc: 'Netflix', amount: 15, category: 'Entertainment' },
  ]);
  const [form, setForm] = useState({ desc: '', amount: '', category: 'Food' });
  const [categoryFilter, setCategoryFilter] = useState('all');

  const addExpense = () => {
    // TODO: Add new expense
  };

  const deleteExpense = (id) => {
    // TODO: Remove expense by id
  };

  const filtered = categoryFilter === 'all' ? expenses : expenses.filter(e => e.category === categoryFilter);

  const total = useMemo(() => filtered.reduce((sum, e) => sum + e.amount, 0), [filtered]);

  const categoryTotals = useMemo(() => {
    // TODO: Calculate totals per category
    return {};
  }, [expenses]);

  const categories = [...new Set(expenses.map(e => e.category))];

  return (
    <div className="expense-tracker">
      <h1>💰 Expense Tracker</h1>

      <div className="add-form">
        <input placeholder="Description" value={form.desc} onChange={e => setForm(prev => ({ ...prev, desc: e.target.value }))} />
        <input type="number" placeholder="Amount" value={form.amount} onChange={e => setForm(prev => ({ ...prev, amount: e.target.value }))} />
        <select value={form.category} onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))}>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Utilities">Utilities</option>
          <option value="Other">Other</option>
        </select>
        <button onClick={addExpense}>Add</button>
      </div>

      <div className="summary">
        <h2>Total: \${total}</h2>
      </div>

      <div className="filters">
        <label>Category: <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
          <option value="all">All</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select></label>
      </div>

      <ul className="expense-list">
        {filtered.map(expense => (
          <li key={expense.id}>
            <span>{expense.desc}</span>
            <span className="category">{expense.category}</span>
            <span className="amount">\${expense.amount}</span>
            <button onClick={() => deleteExpense(expense.id)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

console.log("ExpenseTracker ready");`,
    milestones: [
      { title: "Add Expenses", task: "Implement addExpense with form data" },
      { title: "Filter & Calculate", task: "Implement category filter and total calculation" },
      { title: "Category Breakdown", task: "Show totals per category" },
    ],
    solution: `import { useState, useMemo } from 'react';

function ExpenseTracker() {
  const [expenses, setExpenses] = useState([
    { id: 1, desc: 'Groceries', amount: 85, category: 'Food' },
    { id: 2, desc: 'Gas', amount: 45, category: 'Transport' },
    { id: 3, desc: 'Netflix', amount: 15, category: 'Entertainment' },
  ]);
  const [form, setForm] = useState({ desc: '', amount: '', category: 'Food' });
  const [categoryFilter, setCategoryFilter] = useState('all');

  const addExpense = () => {
    if (!form.desc || !form.amount) return;
    setExpenses(prev => [...prev, { id: Date.now(), desc: form.desc, amount: Number(form.amount), category: form.category }]);
    setForm({ desc: '', amount: '', category: 'Food' });
  };

  const deleteExpense = (id) => setExpenses(prev => prev.filter(e => e.id !== id));

  const filtered = categoryFilter === 'all' ? expenses : expenses.filter(e => e.category === categoryFilter);
  const total = useMemo(() => filtered.reduce((sum, e) => sum + e.amount, 0), [filtered]);

  const categoryTotals = useMemo(() => {
    const totals = {};
    expenses.forEach(e => { totals[e.category] = (totals[e.category] || 0) + e.amount; });
    return totals;
  }, [expenses]);

  const categories = [...new Set(expenses.map(e => e.category))];

  return (
    <div className="expense-tracker">
      <h1>💰 Expense Tracker</h1>
      <div className="add-form">
        <input placeholder="Description" value={form.desc} onChange={e => setForm(prev => ({ ...prev, desc: e.target.value }))} />
        <input type="number" placeholder="Amount" value={form.amount} onChange={e => setForm(prev => ({ ...prev, amount: e.target.value }))} />
        <select value={form.category} onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))}>
          <option value="Food">Food</option><option value="Transport">Transport</option><option value="Entertainment">Entertainment</option><option value="Utilities">Utilities</option><option value="Other">Other</option>
        </select>
        <button onClick={addExpense}>Add</button>
      </div>
      <div className="summary"><h2>Total: \${total}</h2></div>
      <div className="category-breakdown">
        {Object.entries(categoryTotals).map(([cat, amt]) => <span key={cat} className="cat-chip">{cat}: \${amt}</span>)}
      </div>
      <div className="filters">
        <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
          <option value="all">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <ul className="expense-list">
        {filtered.map(expense => (
          <li key={expense.id}>
            <span>{expense.desc}</span>
            <span className="category">{expense.category}</span>
            <span className="amount">\${expense.amount}</span>
            <button onClick={() => deleteExpense(expense.id)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
    tests: [
      { name: "addExpense creates new expenses", validate: testContains("...prev") && testContains("push") },
      { name: "deleteExpense removes expenses", validate: testContains("filter") },
      { name: "useMemo for total calculation", validate: testContains("useMemo") && testContains("reduce") },
      { name: "Category filter implemented", validate: testContains("categoryFilter") && testContains("setCategoryFilter") },
      { name: "Category totals calculated", validate: testContains("categoryTotals") || testContains("CategoryTotals") },
    ],
  },
  {
    id: "react-project-notes",
    title: "5. Notes App",
    overview: "A note-taking app with create, edit, delete, search, and tag filtering.",
    why: "Notes apps teach CRUD with search, tagging, and data persistence patterns.",
    concepts: ["useState", "useEffect", "Search", "Tags", "LocalStorage"],
    checklist: [
      { text: "Create notes with title, content, and tags", done: false },
      { text: "Edit existing notes", done: false },
      { text: "Delete notes", done: false },
      { text: "Search notes by text", done: false },
      { text: "Filter by tags", done: false },
      { text: "Save notes to localStorage", done: false },
    ],
    starterCode: `import { useState, useEffect } from 'react';

function NotesApp() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('notes');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Welcome!', content: 'Start taking notes...', tags: ['getting-started'], date: Date.now() },
    ];
  });
  const [search, setSearch] = useState('');
  const [tagFilter, setTagFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', content: '', tags: '' });

  // Save to localStorage when notes change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    // TODO: Add a new note
  };

  const startEdit = (note) => {
    // TODO: Set editing state
  };

  const saveEdit = () => {
    // TODO: Save edited note
  };

  const deleteNote = (id) => {
    // TODO: Delete note by id
  };

  const allTags = [...new Set(notes.flatMap(n => n.tags))];

  const filtered = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase());
    const matchesTag = tagFilter === 'all' || note.tags.includes(tagFilter);
    return matchesSearch && matchesTag;
  });

  if (editingId) {
    const note = notes.find(n => n.id === editingId);
    if (!note) return null;
    return (
      <div className="notes-app">
        <h1>📝 Edit Note</h1>
        <div className="edit-form">
          <input value={editForm.title} onChange={e => setEditForm(prev => ({ ...prev, title: e.target.value }))} placeholder="Title" />
          <textarea value={editForm.content} onChange={e => setEditForm(prev => ({ ...prev, content: e.target.value }))} placeholder="Content" />
          <input value={editForm.tags} onChange={e => setEditForm(prev => ({ ...prev, tags: e.target.value }))} placeholder="Tags (comma separated)" />
          <div className="edit-actions">
            <button onClick={saveEdit}>Save</button>
            <button onClick={() => setEditingId(null)}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="notes-app">
      <h1>📝 Notes App</h1>

      <div className="toolbar">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search notes..." />
        <select value={tagFilter} onChange={e => setTagFilter(e.target.value)}>
          <option value="all">All Tags</option>
          {allTags.map(tag => <option key={tag} value={tag}>{tag}</option>)}
        </select>
        <button onClick={addNote}>+ New Note</button>
      </div>

      <div className="notes-grid">
        {filtered.map(note => (
          <div key={note.id} className="note-card">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <div className="note-tags">{note.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
            <div className="note-actions">
              <button onClick={() => startEdit(note)}>Edit</button>
              <button onClick={() => deleteNote(note.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

console.log("NotesApp ready");`,
    milestones: [
      { title: "Create Notes", task: "Implement addNote and localStorage persistence" },
      { title: "Edit & Delete", task: "Implement edit and delete functionality" },
      { title: "Search & Filter", task: "Implement search by text and filter by tags" },
    ],
    solution: `import { useState, useEffect } from 'react';

function NotesApp() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('notes');
    return saved ? JSON.parse(saved) : [{ id: 1, title: 'Welcome!', content: 'Start taking notes...', tags: ['getting-started'], date: Date.now() }];
  });
  const [search, setSearch] = useState('');
  const [tagFilter, setTagFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', content: '', tags: '' });

  useEffect(() => { localStorage.setItem('notes', JSON.stringify(notes)); }, [notes]);

  const addNote = () => {
    const newNote = { id: Date.now(), title: 'New Note', content: '', tags: ['uncategorized'], date: Date.now() };
    setNotes(prev => [newNote, ...prev]);
    setEditingId(newNote.id);
    setEditForm({ title: 'New Note', content: '', tags: 'uncategorized' });
  };

  const startEdit = (note) => { setEditingId(note.id); setEditForm({ title: note.title, content: note.content, tags: note.tags.join(', ') }); };

  const saveEdit = () => {
    setNotes(prev => prev.map(n => n.id === editingId ? { ...n, title: editForm.title, content: editForm.content, tags: editForm.tags.split(',').map(t => t.trim()).filter(Boolean) } : n));
    setEditingId(null);
  };

  const deleteNote = (id) => setNotes(prev => prev.filter(n => n.id !== id));

  const allTags = [...new Set(notes.flatMap(n => n.tags))];
  const filtered = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(search.toLowerCase()) || note.content.toLowerCase().includes(search.toLowerCase());
    const matchesTag = tagFilter === 'all' || note.tags.includes(tagFilter);
    return matchesSearch && matchesTag;
  });

  if (editingId) {
    return (
      <div className="notes-app">
        <h1>📝 Edit Note</h1>
        <div className="edit-form">
          <input value={editForm.title} onChange={e => setEditForm(prev => ({ ...prev, title: e.target.value }))} placeholder="Title" />
          <textarea value={editForm.content} onChange={e => setEditForm(prev => ({ ...prev, content: e.target.value }))} placeholder="Content" />
          <input value={editForm.tags} onChange={e => setEditForm(prev => ({ ...prev, tags: e.target.value }))} placeholder="Tags (comma separated)" />
          <div className="edit-actions"><button onClick={saveEdit}>Save</button><button onClick={() => setEditingId(null)}>Cancel</button></div>
        </div>
      </div>
    );
  }

  return (
    <div className="notes-app">
      <h1>📝 Notes App</h1>
      <div className="toolbar">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search notes..." />
        <select value={tagFilter} onChange={e => setTagFilter(e.target.value)}>
          <option value="all">All Tags</option>{allTags.map(tag => <option key={tag} value={tag}>{tag}</option>)}
        </select>
        <button onClick={addNote}>+ New Note</button>
      </div>
      <div className="notes-grid">
        {filtered.map(note => (
          <div key={note.id} className="note-card">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <div className="note-tags">{note.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
            <div className="note-actions"><button onClick={() => startEdit(note)}>Edit</button><button onClick={() => deleteNote(note.id)}>Delete</button></div>
          </div>
        ))}
      </div>
    </div>
  );
}`,
    tests: [
      { name: "Notes saved to localStorage", validate: testContains("localStorage.setItem") },
      { name: "addNote creates new notes", validate: testContains("addNote") && testContains("setNotes") },
      { name: "Edit functionality implemented", validate: testContains("saveEdit") && testContains("setEditingId") },
      { name: "Delete functionality", validate: testContains("deleteNote") },
      { name: "Search filters notes", validate: testContains("search") && testContains("filter") },
      { name: "Tag filter implemented", validate: testContains("tagFilter") && testContains("allTags") },
    ],
  },
  {
    id: "react-project-weather",
    title: "6. Weather Dashboard",
    overview: "A weather dashboard that displays current conditions and forecasts with city search.",
    why: "Weather dashboards teach async API patterns, data visualization, and loading/error states.",
    concepts: ["useState", "useEffect", "Async/Await", "API Calls", "Conditional Rendering"],
    checklist: [
      { text: "City search input", done: false },
      { text: "Display current weather", done: false },
      { text: "Show temperature, conditions, humidity", done: false },
      { text: "Loading state during fetch", done: false },
      { text: "Error state for invalid cities", done: false },
    ],
    starterCode: `import { useState } from 'react';

// Simulated weather API
const WEATHER_DATA = {
  'london': { city: 'London', temp: 15, feelsLike: 13, condition: 'Cloudy', humidity: 72, wind: 12, icon: '☁️' },
  'tokyo': { city: 'Tokyo', temp: 22, feelsLike: 24, condition: 'Sunny', humidity: 55, wind: 8, icon: '☀️' },
  'new york': { city: 'New York', temp: 18, feelsLike: 17, condition: 'Partly Cloudy', humidity: 65, wind: 15, icon: '⛅' },
  'paris': { city: 'Paris', temp: 20, feelsLike: 19, condition: 'Rainy', humidity: 80, wind: 10, icon: '🌧️' },
  'mumbai': { city: 'Mumbai', temp: 30, feelsLike: 33, condition: 'Humid', humidity: 85, wind: 5, icon: '🌤️' },
};

function WeatherDashboard() {
  const [city, setCity] = useState('london');
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState(WEATHER_DATA['london']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = (cityName) => {
    setLoading(true);
    setError('');
    // Simulate API delay
    setTimeout(() => {
      const data = WEATHER_DATA[cityName.toLowerCase()];
      if (data) {
        setWeather(data);
        setCity(cityName.toLowerCase());
        setError('');
      } else {
        setError('City not found. Try: London, Tokyo, New York, Paris, or Mumbai');
      }
      setLoading(false);
    }, 500);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) fetchWeather(search);
  };

  return (
    <div className="weather-dashboard">
      <h1>🌤️ Weather Dashboard</h1>

      <form onSubmit={handleSearch} className="search-form">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Enter city name..." />
        <button type="submit">Search</button>
      </form>

      {/* TODO: Show loading state */}
      {/* TODO: Show error state */}
      {/* TODO: Show weather data */}
      <div className="weather-card">
        <div className="weather-main">
          <span className="weather-icon">{weather.icon}</span>
          <span className="weather-temp">{weather.temp}°C</span>
        </div>
        <h2>{weather.city}</h2>
        <p className="weather-condition">{weather.condition}</p>
        <div className="weather-details">
          <div>Feels like: {weather.feelsLike}°C</div>
          <div>Humidity: {weather.humidity}%</div>
          <div>Wind: {weather.wind} km/h</div>
        </div>
      </div>
    </div>
  );
}

console.log("WeatherDashboard ready");`,
    milestones: [
      { title: "City Search", task: "Implement search form that calls fetchWeather" },
      { title: "Display Weather", task: "Show weather data in a card layout" },
      { title: "States", task: "Handle loading spinner and error messages" },
    ],
    solution: `import { useState } from 'react';

const WEATHER_DATA = {
  'london': { city: 'London', temp: 15, feelsLike: 13, condition: 'Cloudy', humidity: 72, wind: 12, icon: '☁️' },
  'tokyo': { city: 'Tokyo', temp: 22, feelsLike: 24, condition: 'Sunny', humidity: 55, wind: 8, icon: '☀️' },
  'new york': { city: 'New York', temp: 18, feelsLike: 17, condition: 'Partly Cloudy', humidity: 65, wind: 15, icon: '⛅' },
  'paris': { city: 'Paris', temp: 20, feelsLike: 19, condition: 'Rainy', humidity: 80, wind: 10, icon: '🌧️' },
  'mumbai': { city: 'Mumbai', temp: 30, feelsLike: 33, condition: 'Humid', humidity: 85, wind: 5, icon: '🌤️' },
};

function WeatherDashboard() {
  const [city, setCity] = useState('london');
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState(WEATHER_DATA['london']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = (cityName) => {
    setLoading(true);
    setError('');
    setTimeout(() => {
      const data = WEATHER_DATA[cityName.toLowerCase()];
      if (data) { setWeather(data); setCity(cityName.toLowerCase()); setError(''); }
      else { setError('City not found. Try: London, Tokyo, New York, Paris, or Mumbai'); }
      setLoading(false);
    }, 500);
  };

  const handleSearch = (e) => { e.preventDefault(); if (search.trim()) fetchWeather(search); };

  return (
    <div className="weather-dashboard">
      <h1>🌤️ Weather Dashboard</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Enter city name..." />
        <button type="submit">Search</button>
      </form>

      {loading && <div className="loading">Loading weather data...</div>}
      {error && <div className="error">{error}</div>}

      {!loading && !error && (
        <div className="weather-card">
          <div className="weather-main">
            <span className="weather-icon">{weather.icon}</span>
            <span className="weather-temp">{weather.temp}°C</span>
          </div>
          <h2>{weather.city}</h2>
          <p className="weather-condition">{weather.condition}</p>
          <div className="weather-details">
            <div>Feels like: {weather.feelsLike}°C</div>
            <div>Humidity: {weather.humidity}%</div>
            <div>Wind: {weather.wind} km/h</div>
          </div>
        </div>
      )}
    </div>
  );
}`,
    tests: [
      { name: "Search form with submit handler", validate: testContains("onSubmit") && testContains("preventDefault") },
      { name: "Loading state displayed", validate: testContains("loading") && testContains("Loading") },
      { name: "Error state displayed", validate: testContains("error") && testContains("not found") },
      { name: "Weather data displayed in card", validate: testContains("weather-card") || testContains("weatherCard") },
      { name: "City search input", validate: testContains("search") && testContains("setSearch") },
    ],
  },
  {
    id: "react-project-shopping-cart",
    title: "7. Shopping Cart",
    overview: "An e-commerce shopping cart with product listing, quantity management, and price calculation.",
    why: "Shopping carts teach complex state management, cart logic, and real-time price calculations.",
    concepts: ["useState", "useReducer", "useMemo", "State Lifting"],
    checklist: [
      { text: "Display product list", done: false },
      { text: "Add items to cart", done: false },
      { text: "Update item quantities", done: false },
      { text: "Remove items from cart", done: false },
      { text: "Calculate subtotal, tax, and total", done: false },
      { text: "Cart item count badge", done: false },
    ],
    starterCode: `import { useState, useMemo } from 'react';

const PRODUCTS = [
  { id: 1, name: 'Wireless Headphones', price: 79.99, image: '🎧' },
  { id: 2, name: 'Smart Watch', price: 199.99, image: '⌚' },
  { id: 3, name: 'Laptop Stand', price: 49.99, image: '💻' },
  { id: 4, name: 'USB-C Hub', price: 34.99, image: '🔌' },
  { id: 5, name: 'Mechanical Keyboard', price: 129.99, image: '⌨️' },
];

const TAX_RATE = 0.08;

function ShoppingCartApp() {
  const [cart, setCart] = useState({});
  const [showCart, setShowCart] = useState(false);

  const addToCart = (product) => {
    setCart(prev => ({
      ...prev,
      [product.id]: { ...product, qty: (prev[product.id]?.qty || 0) + 1 }
    }));
  };

  const updateQty = (id, delta) => {
    // TODO: Update quantity, remove if 0
  };

  const removeItem = (id) => {
    // TODO: Remove item from cart
  };

  const cartItems = Object.values(cart);
  const itemCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const subtotal = useMemo(() => cartItems.reduce((sum, item) => sum + item.price * item.qty, 0), [cartItems]);
  const tax = useMemo(() => subtotal * TAX_RATE, [subtotal]);
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);

  return (
    <div className="shopping-cart-app">
      <h1>🛍️ Shop</h1>

      <header className="shop-header">
        <button onClick={() => setShowCart(false)} className={!showCart ? 'active' : ''}>Products</button>
        <button onClick={() => setShowCart(true)} className={showCart ? 'active' : ''}>
          Cart {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
        </button>
      </header>

      {!showCart ? (
        <div className="product-grid">
          {PRODUCTS.map(product => (
            <div key={product.id} className="product-card">
              <span className="product-image">{product.image}</span>
              <h3>{product.name}</h3>
              <p className="product-price">\${product.price}</p>
              <button onClick={() => addToCart(product)}>
                {cart[product.id] ? 'Add Another' : 'Add to Cart'}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="cart-view">
          <h2>Shopping Cart ({itemCount} items)</h2>
          {cartItems.length === 0 ? (
            <p className="empty-cart">Your cart is empty</p>
          ) : (
            <>
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <span className="cart-image">{item.image}</span>
                  <div className="cart-info">
                    <h4>{item.name}</h4>
                    <p>\${item.price}</p>
                  </div>
                  <div className="cart-qty">
                    <button onClick={() => updateQty(item.id, -1)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)}>+</button>
                  </div>
                  <p className="cart-total">\${(item.price * item.qty).toFixed(2)}</p>
                  <button onClick={() => removeItem(item.id)} className="remove-btn">✕</button>
                </div>
              ))}

              <div className="cart-summary">
                <div><span>Subtotal:</span><span>\${subtotal.toFixed(2)}</span></div>
                <div><span>Tax (8%):</span><span>\${tax.toFixed(2)}</span></div>
                <div className="total"><span>Total:</span><span>\${total.toFixed(2)}</span></div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

console.log("ShoppingCartApp ready");`,
    milestones: [
      { title: "Product Listing", task: "Display products with add to cart buttons" },
      { title: "Cart Management", task: "Implement add, update quantity, and remove items" },
      { title: "Price Calculations", task: "Calculate subtotal, tax, and total with useMemo" },
    ],
    solution: `import { useState, useMemo } from 'react';

const PRODUCTS = [
  { id: 1, name: 'Wireless Headphones', price: 79.99, image: '🎧' },
  { id: 2, name: 'Smart Watch', price: 199.99, image: '⌚' },
  { id: 3, name: 'Laptop Stand', price: 49.99, image: '💻' },
  { id: 4, name: 'USB-C Hub', price: 34.99, image: '🔌' },
  { id: 5, name: 'Mechanical Keyboard', price: 129.99, image: '⌨️' },
];

const TAX_RATE = 0.08;

function ShoppingCartApp() {
  const [cart, setCart] = useState({});
  const [showCart, setShowCart] = useState(false);

  const addToCart = (product) => {
    setCart(prev => ({ ...prev, [product.id]: { ...product, qty: (prev[product.id]?.qty || 0) + 1 } }));
  };

  const updateQty = (id, delta) => {
    setCart(prev => {
      const item = prev[id];
      if (!item) return prev;
      const newQty = item.qty + delta;
      if (newQty <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: { ...item, qty: newQty } };
    });
  };

  const removeItem = (id) => {
    setCart(prev => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  };

  const cartItems = Object.values(cart);
  const itemCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = useMemo(() => cartItems.reduce((sum, item) => sum + item.price * item.qty, 0), [cartItems]);
  const tax = useMemo(() => subtotal * TAX_RATE, [subtotal]);
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);

  return (
    <div className="shopping-cart-app">
      <h1>🛍️ Shop</h1>
      <header className="shop-header">
        <button onClick={() => setShowCart(false)} className={!showCart ? 'active' : ''}>Products</button>
        <button onClick={() => setShowCart(true)} className={showCart ? 'active' : ''}>Cart {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}</button>
      </header>

      {!showCart ? (
        <div className="product-grid">
          {PRODUCTS.map(product => (
            <div key={product.id} className="product-card">
              <span className="product-image">{product.image}</span>
              <h3>{product.name}</h3>
              <p className="product-price">\${product.price}</p>
              <button onClick={() => addToCart(product)}>{cart[product.id] ? 'Add Another' : 'Add to Cart'}</button>
            </div>
          ))}
        </div>
      ) : (
        <div className="cart-view">
          <h2>Shopping Cart ({itemCount} items)</h2>
          {cartItems.length === 0 ? <p className="empty-cart">Your cart is empty</p> : (
            <>
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <span className="cart-image">{item.image}</span>
                  <div className="cart-info"><h4>{item.name}</h4><p>\${item.price}</p></div>
                  <div className="cart-qty">
                    <button onClick={() => updateQty(item.id, -1)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)}>+</button>
                  </div>
                  <p className="cart-total">\${(item.price * item.qty).toFixed(2)}</p>
                  <button onClick={() => removeItem(item.id)} className="remove-btn">✕</button>
                </div>
              ))}
              <div className="cart-summary">
                <div><span>Subtotal:</span><span>\${subtotal.toFixed(2)}</span></div>
                <div><span>Tax (8%):</span><span>\${tax.toFixed(2)}</span></div>
                <div className="total"><span>Total:</span><span>\${total.toFixed(2)}</span></div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}`,
    tests: [
      { name: "addToCart adds items to cart", validate: testContains("addToCart") && testContains("setCart") },
      { name: "updateQty changes quantity", validate: testContains("updateQty") && testContains("qty") },
      { name: "removeItem removes from cart", validate: testContains("removeItem") },
      { name: "useMemo for price calculations", validate: testContains("useMemo") && testContains("subtotal") && testContains("tax") && testContains("total") },
      { name: "Cart item count displayed", validate: testContains("itemCount") },
    ],
  },
  {
    id: "react-project-kanban",
    title: "8. Kanban Board",
    overview: "A Kanban-style task board with drag-and-drop columns for To Do, In Progress, and Done.",
    why: "Kanban boards teach drag-and-drop, state organization by status, and visual task management.",
    concepts: ["useState", "State Organization", "Drag Events", "Status Management"],
    checklist: [
      { text: "Three columns: To Do, In Progress, Done", done: false },
      { text: "Add task cards to columns", done: false },
      { text: "Move tasks between columns", done: false },
      { text: "Delete task cards", done: false },
      { text: "Show task count per column", done: false },
    ],
    starterCode: `import { useState } from 'react';

const COLUMNS = ['todo', 'in-progress', 'done'];

const COLUMN_LABELS = {
  'todo': '📋 To Do',
  'in-progress': '🔄 In Progress',
  'done': '✅ Done',
};

function KanbanBoard() {
  const [tasks, setTasks] = useState({
    'todo': [
      { id: 1, text: 'Design landing page' },
      { id: 2, text: 'Write unit tests' },
    ],
    'in-progress': [
      { id: 3, text: 'Implement user auth' },
    ],
    'done': [
      { id: 4, text: 'Setup CI/CD' },
    ],
  });
  const [newTaskText, setNewTaskText] = useState('');
  const [draggedTask, setDraggedTask] = useState(null);
  const [activeColumn, setActiveColumn] = useState('todo');

  const addTask = () => {
    // TODO: Add a new task to the active column
  };

  const deleteTask = (columnId, taskId) => {
    // TODO: Remove task from column
  };

  const handleDragStart = (task, columnId) => {
    // TODO: Set dragged task
  };

  const handleDrop = (targetColumnId) => {
    // TODO: Move task to new column
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="kanban-board">
      <h1>📊 Kanban Board</h1>

      <div className="add-task">
        <input value={newTaskText} onChange={e => setNewTaskText(e.target.value)} placeholder="New task..." />
        <select value={activeColumn} onChange={e => setActiveColumn(e.target.value)}>
          {COLUMNS.map(col => <option key={col} value={col}>{COLUMN_LABELS[col]}</option>)}
        </select>
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="board-columns">
        {COLUMNS.map(col => (
          <div
            key={col}
            className="column"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(col)}
          >
            <div className="column-header">
              <h2>{COLUMN_LABELS[col]}</h2>
              <span className="count">{tasks[col].length}</span>
            </div>

            <div className="task-list">
              {tasks[col].map(task => (
                <div
                  key={task.id}
                  className={'task-card' + (draggedTask?.id === task.id ? ' dragging' : '')}
                  draggable
                  onDragStart={() => handleDragStart(task, col)}
                >
                  <span>{task.text}</span>
                  <button className="delete-btn" onClick={() => deleteTask(col, task.id)}>✕</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

console.log("KanbanBoard ready");`,
    milestones: [
      { title: "Task Columns", task: "Display three columns with task cards" },
      { title: "Add & Delete", task: "Implement adding and deleting tasks" },
      { title: "Drag & Drop", task: "Implement drag-and-drop to move tasks between columns" },
    ],
    solution: `import { useState } from 'react';

const COLUMNS = ['todo', 'in-progress', 'done'];
const COLUMN_LABELS = { 'todo': '📋 To Do', 'in-progress': '🔄 In Progress', 'done': '✅ Done' };

function KanbanBoard() {
  const [tasks, setTasks] = useState({
    'todo': [{ id: 1, text: 'Design landing page' }, { id: 2, text: 'Write unit tests' }],
    'in-progress': [{ id: 3, text: 'Implement user auth' }],
    'done': [{ id: 4, text: 'Setup CI/CD' }],
  });
  const [newTaskText, setNewTaskText] = useState('');
  const [draggedTask, setDraggedTask] = useState(null);
  const [draggedFrom, setDraggedFrom] = useState(null);
  const [activeColumn, setActiveColumn] = useState('todo');

  const addTask = () => {
    if (!newTaskText.trim()) return;
    setTasks(prev => ({ ...prev, [activeColumn]: [...prev[activeColumn], { id: Date.now(), text: newTaskText }] }));
    setNewTaskText('');
  };

  const deleteTask = (columnId, taskId) => {
    setTasks(prev => ({ ...prev, [columnId]: prev[columnId].filter(t => t.id !== taskId) }));
  };

  const handleDragStart = (task, columnId) => { setDraggedTask(task); setDraggedFrom(columnId); };
  const handleDrop = (targetColumnId) => {
    if (!draggedTask || draggedFrom === targetColumnId) { setDraggedTask(null); return; }
    setTasks(prev => ({
      ...prev,
      [draggedFrom]: prev[draggedFrom].filter(t => t.id !== draggedTask.id),
      [targetColumnId]: [...prev[targetColumnId], draggedTask],
    }));
    setDraggedTask(null);
  };
  const handleDragOver = (e) => e.preventDefault();

  return (
    <div className="kanban-board">
      <h1>📊 Kanban Board</h1>
      <div className="add-task">
        <input value={newTaskText} onChange={e => setNewTaskText(e.target.value)} placeholder="New task..." />
        <select value={activeColumn} onChange={e => setActiveColumn(e.target.value)}>
          {COLUMNS.map(col => <option key={col} value={col}>{COLUMN_LABELS[col]}</option>)}
        </select>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="board-columns">
        {COLUMNS.map(col => (
          <div key={col} className="column" onDragOver={handleDragOver} onDrop={() => handleDrop(col)}>
            <div className="column-header">
              <h2>{COLUMN_LABELS[col]}</h2>
              <span className="count">{tasks[col].length}</span>
            </div>
            <div className="task-list">
              {tasks[col].map(task => (
                <div key={task.id} className={'task-card' + (draggedTask?.id === task.id ? ' dragging' : '')} draggable onDragStart={() => handleDragStart(task, col)}>
                  <span>{task.text}</span>
                  <button className="delete-btn" onClick={() => deleteTask(col, task.id)}>✕</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`,
    tests: [
      { name: "Three board columns displayed", validate: (c) => (c.match(/column/g) || []).length >= 3 },
      { name: "addTask creates new tasks", validate: testContains("addTask") && testContains("setTasks") },
      { name: "deleteTask removes tasks", validate: testContains("deleteTask") && testContains("filter") },
      { name: "Drag events implemented", validate: testContains("onDragStart") && testContains("onDrop") && testContains("onDragOver") },
      { name: "Task count per column", validate: testContains("count") || testContains("length") },
    ],
  },
];
