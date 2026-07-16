// ─── React Labs — Bug Challenges Data ───

import { testContains, testRegex } from "./validators.js";

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
