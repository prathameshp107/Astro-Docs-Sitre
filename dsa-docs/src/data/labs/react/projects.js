// ─── React Labs — Mini Projects Data ───
import { testContains, testRegex } from "./validators.js";

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
