export const SNIPPET_QUESTIONS = [
  // ─── Equality & Type Coercion ───
  {
    id: "eq-1", title: "Array equality", difficulty: "Easy", topic: "Equality & Coercion",
    code: `console.log([] == []);\nconsole.log([] == ![]);`,
    expectedOutput: "false\\nfalse", explanation: "Arrays are objects. [] == [] compares references, which are different. ![] coerces [] to true, then !true = false. [] == false coerces [].toString() = '' then '' == false is true.",
    tags: ["equality", "coercion", "arrays"],
  },
  {
    id: "eq-2", title: "null vs undefined", difficulty: "Easy", topic: "Equality & Coercion",
    code: `console.log(null == undefined);\nconsole.log(null === undefined);`,
    expectedOutput: "true\\nfalse", explanation: "Loose equality (==) considers null and undefined equal. Strict equality (===) checks types — null is object, undefined is undefined type.",
    tags: ["null", "undefined", "equality"],
  },
  {
    id: "eq-3", title: "Falsy coercion", difficulty: "Easy", topic: "Equality & Coercion",
    code: `console.log(0 == false);\nconsole.log('' == false);\nconsole.log(0 === false);`,
    expectedOutput: "true\\ntrue\\nfalse", explanation: "0 and '' are falsy, so loose equality coerces them to false. Strict equality checks type — 0 is number, false is boolean.",
    tags: ["falsy", "coercion", "equality"],
  },
  {
    id: "eq-4", title: "NaN comparison", difficulty: "Medium", topic: "Equality & Coercion",
    code: `console.log(NaN == NaN);\nconsole.log(NaN === NaN);\nconsole.log(Object.is(NaN, NaN));`,
    expectedOutput: "false\\nfalse\\ntrue", explanation: "NaN is the only value not equal to itself per IEEE 754 spec. Object.is() fixes this and treats NaN as equal to itself.",
    tags: ["NaN", "ieee754", "object.is"],
  },

  // ─── Hoisting ───
  {
    id: "hoist-1", title: "var hoisting", difficulty: "Easy", topic: "Hoisting",
    code: `console.log(a);\nvar a = 10;\nconsole.log(a);`,
    expectedOutput: "undefined\\n10", explanation: "var declarations are hoisted to the top with undefined initialization. So console.log(a) sees undefined before the assignment.",
    tags: ["var", "hoisting", "undefined"],
  },
  {
    id: "hoist-2", title: "Function hoisting", difficulty: "Easy", topic: "Hoisting",
    code: `foo();\nfunction foo() {\n  console.log("called");\n}`,
    expectedOutput: "called", explanation: "Function declarations are fully hoisted (both name and body). So foo() can be called before its definition.",
    tags: ["function", "hoisting"],
  },
  {
    id: "hoist-3", title: "let TDZ", difficulty: "Medium", topic: "Hoisting",
    code: `console.log(x);\nlet x = 5;`,
    expectedOutput: "ReferenceError: Cannot access 'x' before initialization",
    explanation: "let is hoisted but not initialized. It's in the Temporal Dead Zone (TDZ) from the start of the block until the declaration. Accessing it throws ReferenceError.",
    tags: ["let", "tdz", "temporal-dead-zone"],
  },

  // ─── Scope ───
  {
    id: "scope-1", title: "var scoping", difficulty: "Easy", topic: "Scope",
    code: `var x = 1;\nfunction test() {\n  console.log(x);\n  var x = 2;\n}\ntest();`,
    expectedOutput: "undefined",
    explanation: "Inside test(), var x is hoisted to the top of the function scope. So x exists but is undefined at the console.log point, shadowing the outer x.",
    tags: ["var", "scope", "shadowing"],
  },
  {
    id: "scope-2", title: "Block vs function scope", difficulty: "Medium", topic: "Scope",
    code: `if (true) {\n  var a = 1;\n  let b = 2;\n}\nconsole.log(a);\nconsole.log(b);`,
    expectedOutput: "1\\nReferenceError: b is not defined",
    explanation: "var is function-scoped, so a leaks out of the if block. let is block-scoped, so b is only accessible inside the if block.",
    tags: ["var", "let", "block-scope", "function-scope"],
  },

  // ─── Closures ───
  {
    id: "closure-1", title: "Simple closure", difficulty: "Easy", topic: "Closures",
    code: `function outer(x) {\n  return function(y) {\n    return x + y;\n  };\n}\nconst add5 = outer(5);\nconsole.log(add5(3));`,
    expectedOutput: "8",
    explanation: "The inner function 'closes over' the x variable from outer's scope. Even after outer returns, add5 retains access to x=5.",
    tags: ["closure", "higher-order"],
  },
  {
    id: "closure-2", title: "Loop closure classic", difficulty: "Medium", topic: "Closures",
    code: `for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}`,
    expectedOutput: "3\\n3\\n3",
    explanation: "var i is function-scoped, shared across all iterations. By the time setTimeout fires, the loop has finished and i=3. All callbacks log 3.",
    tags: ["closure", "loop", "var", "settimeout"],
  },
  {
    id: "closure-3", title: "Loop closure fix (let)", difficulty: "Medium", topic: "Closures",
    code: `for (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}`,
    expectedOutput: "0\\n1\\n2",
    explanation: "let creates a new binding for each iteration. Each setTimeout callback captures its own i value (0, 1, 2) in a separate closure scope.",
    tags: ["closure", "loop", "let", "settimeout"],
  },

  // ─── Event Loop & Async ───
  {
    id: "event-1", title: "Micro vs macro tasks", difficulty: "Medium", topic: "Event Loop",
    code: `console.log("Start");\nsetTimeout(() => console.log("Timeout"), 0);\nPromise.resolve().then(() => console.log("Promise"));\nconsole.log("End");`,
    expectedOutput: "Start\\nEnd\\nPromise\\nTimeout",
    explanation: "Synchronous code runs first (Start, End). Microtasks (Promise.then) run before macrotasks (setTimeout). Promise logs before Timeout.",
    tags: ["event-loop", "microtask", "macrotask", "promise"],
  },
  {
    id: "event-2", title: "Async/await order", difficulty: "Medium", topic: "Event Loop",
    code: `async function foo() {\n  console.log("A");\n  await null;\n  console.log("B");\n}\nconsole.log("1");\nfoo();\nconsole.log("2");`,
    expectedOutput: "1\\nA\\n2\\nB",
    explanation: "foo() starts synchronously logging 'A'. await null yields to the microtask queue. The rest of foo (console.log('B')) runs after synchronous '2' completes.",
    tags: ["async", "await", "event-loop", "microtask"],
  },
  {
    id: "event-3", title: "Promise chaining", difficulty: "Hard", topic: "Event Loop",
    code: `Promise.resolve()\n  .then(() => console.log(1))\n  .then(() => console.log(2))\n  .then(() => console.log(3));\nPromise.resolve()\n  .then(() => console.log(4));`,
    expectedOutput: "1\\n4\\n2\\n3",
    explanation: "First promise chain starts: .then(1) queues. Second promise starts: .then(4) queues. Microtask queue processes: 1, then 4. First chain's second .then(2) queues after 1 resolves, runs after 4.",
    tags: ["promise", "chaining", "microtask"],
  },
  {
    id: "event-4", title: "Mixed async patterns", difficulty: "Hard", topic: "Event Loop",
    code: `setTimeout(() => console.log("A"), 0);\nsetTimeout(() => {\n  console.log("B");\n  Promise.resolve().then(() => console.log("C"));\n}, 0);\nPromise.resolve().then(() => console.log("D"));\nconsole.log("E");`,
    expectedOutput: "E\\nD\\nA\\nB\\nC",
    explanation: "E (sync) → D (microtask) → A (macrotask) → B (macrotask continues, sync inside) → C (microtask queued inside B's macrotask). Microtasks always run after each macrotask completes.",
    tags: ["event-loop", "microtask", "macrotask", "promise", "settimeout"],
  },

  // ─── Array Methods ───
  {
    id: "array-1", title: "map with parseInt", difficulty: "Medium", topic: "Array Methods",
    code: `console.log(["1", "2", "3"].map(parseInt));`,
    expectedOutput: "[1, NaN, NaN]",
    explanation: "parseInt(str, radix). map passes (item, index). So: parseInt('1',0)=1, parseInt('2',1)=NaN, parseInt('3',2)=NaN. Always use parseInt with explicit radix or use Number().",
    tags: ["map", "parseint", "radix"],
  },
  {
    id: "array-2", title: "sort default", difficulty: "Easy", topic: "Array Methods",
    code: `console.log([1, 20, 3, 10].sort());`,
    expectedOutput: "[1, 10, 20, 3]",
    explanation: "Default sort converts elements to strings and compares UTF-16 code units. '10' < '3' because '1' < '3'. Use .sort((a,b) => a - b) for numeric sort.",
    tags: ["sort", "string-conversion"],
  },
  {
    id: "array-3", title: "Reduce to object", difficulty: "Medium", topic: "Array Methods",
    code: `const arr = ['a', 'b', 'a', 'c', 'b', 'a'];\nconst count = arr.reduce((acc, x) => {\n  acc[x] = (acc[x] || 0) + 1;\n  return acc;\n}, {});\nconsole.log(count);`,
    expectedOutput: "{a: 3, b: 2, c: 1}",
    explanation: "reduce iterates through the array, building an accumulator object. For each element x, it increments acc[x] starting from 0.",
    tags: ["reduce", "frequencies", "accumulator"],
  },
  {
    id: "array-4", title: "flatMap vs map+flat", difficulty: "Medium", topic: "Array Methods",
    code: `const arr = [[1,2],[3,4]];\nconsole.log(arr.flatMap(x => x));\nconsole.log(arr.map(x => x).flat());`,
    expectedOutput: "[1,2,3,4]\\n[1,2,3,4]",
    explanation: "flatMap first maps then flattens by 1 level. Both produce the same result here since flatMap flattens one level by default.",
    tags: ["flatmap", "flat", "map"],
  },

  // ─── Objects & References ───
  {
    id: "obj-1", title: "Object reference", difficulty: "Easy", topic: "Objects & References",
    code: `const a = { name: "JS" };\nconst b = a;\nb.name = "React";\nconsole.log(a.name);`,
    expectedOutput: "React",
    explanation: "b = a copies the reference, not the object. Both a and b point to the same object. Mutating b.name changes the shared object.",
    tags: ["reference", "mutation", "object"],
  },
  {
    id: "obj-2", title: "Object.freeze", difficulty: "Medium", topic: "Objects & References",
    code: `const obj = Object.freeze({a: 1, b: {c: 2}});\nobj.a = 99;\nobj.b.c = 99;\nconsole.log(obj.a, obj.b.c);`,
    expectedOutput: "1 99",
    explanation: "Object.freeze makes shallow freeze. Top-level properties (a) can't be changed (ignored in strict mode, silent in non-strict). Nested objects (b.c) can still be mutated.",
    tags: ["freeze", "immutability", "shallow", "deep"],
  },
  {
    id: "obj-3", title: "Spread shallow copy", difficulty: "Medium", topic: "Objects & References",
    code: `const original = { a: 1, b: { c: 2 } };\nconst copy = { ...original };\ncopy.a = 99;\ncopy.b.c = 99;\nconsole.log(original);`,
    expectedOutput: "{a: 1, b: {c: 99}}",
    explanation: "Spread operator creates a shallow copy. top-level a is independent, but nested b still references the same object. Mutating copy.b.c affects original.b.c.",
    tags: ["spread", "shallow-copy", "reference", "nested"],
  },

  // ─── this Keyword ───
  {
    id: "this-1", title: "Default this", difficulty: "Easy", topic: "this Keyword",
    code: `function show() {\n  console.log(this);\n}\nshow();`,
    expectedOutput: "Window (or global)",
    explanation: "In non-strict mode, a regular function call sets 'this' to the global object (window in browsers). In strict mode, 'this' would be undefined.",
    tags: ["this", "global", "window"],
  },
  {
    id: "this-2", title: "Arrow function this", difficulty: "Medium", topic: "this Keyword",
    code: `const obj = {\n  name: "JS",\n  regular: function() { console.log(this.name); },\n  arrow: () => console.log(this.name),\n};\nobj.regular();\nobj.arrow();`,
    expectedOutput: "JS\\nundefined",
    explanation: "Regular function gets 'this' from the caller (obj). Arrow function captures 'this' from the surrounding scope (lexical this), which is the outer context (window/global).",
    tags: ["this", "arrow-function", "lexical-scope"],
  },

  // ─── Prototypes ───
  {
    id: "proto-1", title: "Prototype chain", difficulty: "Medium", topic: "Prototypes",
    code: `const arr = [1, 2, 3];\nconsole.log(arr.__proto__ === Array.prototype);\nconsole.log(Array.prototype.__proto__ === Object.prototype);\nconsole.log(Object.prototype.__proto__);`,
    expectedOutput: "true\\ntrue\\nnull",
    explanation: "arr's prototype is Array.prototype. Array.prototype's prototype is Object.prototype. Object.prototype is the end of the chain — its __proto__ is null.",
    tags: ["prototype", "proto", "chain"],
  },

  // ─── Destructuring ───
  {
    id: "dest-1", title: "Nested destructuring", difficulty: "Medium", topic: "Destructuring",
    code: `const data = { user: { name: "JS", langs: ["ES6", "TS"] } };\nconst { user: { name, langs: [, second] } } = data;\nconsole.log(name, second);`,
    expectedOutput: "JS TS",
    explanation: "Nested destructuring pulls 'name' from user and 'second' from the second element of langs array (using comma to skip the first element).",
    tags: ["destructuring", "nested", "array"],
  },
];

export const BUG_CHALLENGES = [
  {
    id: "bug-1", title: "Closure loop bug", difficulty: "Beginner", topic: "Closures",
    brokenCode: `for (var i = 0; i < 5; i++) {\n  setTimeout(() => {\n    console.log(i);\n  }, 100);\n}`,
    expectedOutput: "0\\n1\\n2\\n3\\n4",
    actualOutput: "5\\n5\\n5\\n5\\n5",
    explanation: "var i is function-scoped, shared across all iterations. By the time setTimeout fires, the loop has finished and i=5.",
    fixApproach: "Replace var with let (block-scoped, creates new binding per iteration), or use an IIFE to capture each value of i.",
    fixedCode: `for (let i = 0; i < 5; i++) {\n  setTimeout(() => {\n    console.log(i);\n  }, 100);\n}`,
    hint: "Think about how var vs let scoping works inside loops.",
    difficulty: "Beginner",
  },
  {
    id: "bug-2", title: "Missing radix", difficulty: "Beginner", topic: "Array Methods",
    brokenCode: `const binary = ["10", "101", "110"];\nconst decimals = binary.map(parseInt);\nconsole.log(decimals);`,
    expectedOutput: "[2, 5, 6]",
    actualOutput: "[10, NaN, NaN]",
    explanation: "parseInt receives (value, index) from map. parseInt('10',0)=10, parseInt('101',1)=NaN, parseInt('110',2)=6 (binary parses to 6).",
    fixApproach: "Use Number() instead of parseInt, or pass a single-argument wrapper: binary.map(s => parseInt(s, 2)).",
    fixedCode: `const binary = ["10", "101", "110"];\nconst decimals = binary.map(s => parseInt(s, 2));\nconsole.log(decimals);`,
    hint: "What arguments does map pass to the callback?",
    difficulty: "Beginner",
  },
  {
    id: "bug-3", title: "Mutable sort", difficulty: "Beginner", topic: "Array Methods",
    brokenCode: `const numbers = [3, 1, 10, 2];\nconst sorted = numbers.sort();\nconsole.log(sorted);\nconsole.log(numbers);`,
    expectedOutput: "[1, 2, 3, 10]\\n[3, 1, 10, 2]",
    actualOutput: "[1, 10, 2, 3]\\n[1, 10, 2, 3]",
    explanation: "sort() mutates the original array AND returns it. Since sort defaults to string comparison, '10' < '2'. Also, numbers was mutated too.",
    fixApproach: "Use a comparator: .sort((a,b) => a - b). To avoid mutation: [...numbers].sort((a,b) => a - b).",
    fixedCode: `const numbers = [3, 1, 10, 2];\nconst sorted = [...numbers].sort((a,b) => a - b);\nconsole.log(sorted);\nconsole.log(numbers);`,
    hint: "Check if sort modifies the original array and what default sorting does.",
    difficulty: "Beginner",
  },
  {
    id: "bug-4", title: "Reference mutation", difficulty: "Intermediate", topic: "Objects & References",
    brokenCode: `const cart = { items: ["apple"] };\nfunction addItem(c, item) {\n  c.items.push(item);\n}\naddItem(cart, "banana");\nconsole.log(cart.items.length);\nconsole.log(cart.items);`,
    expectedOutput: "2\\n[\"apple\", \"banana\"]",
    actualOutput: "2\\n[\"apple\", \"banana\"]",
    explanation: "This code actually works! But the bug is subtle: if addItem reassigned the parameter c = {...c, items: [...]}, it wouldn't affect the original cart. Objects are passed by reference, but reassigning the parameter doesn't change the original variable.",
    fixApproach: "To safely mutate, work directly on the original. To avoid mutation, return a new object: return { ...c, items: [...c.items, item] }.",
    fixedCode: `const cart = { items: ["apple"] };\nfunction addItem(c, item) {\n  c.items.push(item);\n}\naddItem(cart, "banana");\nconsole.log(cart.items.length);
console.log(cart.items);`,
    hint: "What happens when you reassign a parameter inside a function vs mutating its properties?",
    difficulty: "Intermediate",
  },
  {
    id: "bug-5", title: "Async timing", difficulty: "Intermediate", topic: "Async",
    brokenCode: `async function getData() {\n  let result;\n  fetch('/api/data').then(r => r.json()).then(d => result = d);\n  return result;\n}\nconst data = getData();\nconsole.log(data);`,
    expectedOutput: "{data: [...]}",
    actualOutput: "undefined",
    explanation: "The function returns result before the promise resolves. fetch is async but the code doesn't await it.",
    fixApproach: "Use await for the fetch call and response parsing.",
    fixedCode: `async function getData() {\n  const res = await fetch('/api/data');\n  const result = await res.json();\n  return result;\n}`,
    hint: "What happens when you don't await a promise inside an async function?",
    difficulty: "Intermediate",
  },
];

export const MINI_APPS = [
  {
    id: "app-1", title: "Counter", difficulty: "Beginner",
    requirements: ["Increment counter", "Decrement counter", "Reset to 0", "Display current count"],
    starterCode: `// Build a Counter with increment, decrement, and reset
let count = 0;

function increment() {
  // Your code here
}

function decrement() {
  // Your code here
}

function reset() {
  // Your code here
}

console.log("Start:", count);
increment();
increment();
console.log("After 2 increments:", count);
decrement();
console.log("After 1 decrement:", count);
reset();
console.log("After reset:", count);`,
    solution: `let count = 0;\n\nfunction increment() {\n  count++;\n}\n\nfunction decrement() {\n  count--;\n}\n\nfunction reset() {\n  count = 0;\n}`,
    explanation: "Counter uses a closure variable with simple arithmetic. increment() adds 1, decrement() subtracts 1, reset() sets back to 0.",
  },
  {
    id: "app-2", title: "Todo List", difficulty: "Intermediate",
    requirements: ["Add todo items", "Toggle todo completion", "Delete todo items", "List all todos", "Show pending count"],
    starterCode: `// Build a simple Todo List manager
const todos = [];

function addTodo(title) {
  // Your code here
}

function toggleTodo(id) {
  // Your code here
}

function deleteTodo(id) {
  // Your code here
}

function getPending() {
  // Your code here
}

// Test it
addTodo("Learn JavaScript");
addTodo("Build a project");
toggleTodo(0);
console.log("Todos:", todos);
console.log("Pending:", getPending());
deleteTodo(1);
console.log("After delete:", todos);`,
    solution: `const todos = [];\n\nfunction addTodo(title) {\n  todos.push({ id: Date.now(), title, done: false });\n}\n\nfunction toggleTodo(id) {\n  todos[id].done = !todos[id].done;\n}\n\nfunction deleteTodo(id) {\n  todos.splice(id, 1);\n}\n\nfunction getPending() {\n  return todos.filter(t => !t.done).length;\n}`,
    explanation: "Todo list uses an array of objects. addTodo pushes new items, toggleTodo flips the done flag, deleteTodo removes by index, getPending filters incomplete items.",
  },
  {
    id: "app-3", title: "Search Filter", difficulty: "Beginner",
    requirements: ["Search a list of items", "Case-insensitive matching", "Return filtered results", "Handle empty search"],
    starterCode: `// Build a search filter
const items = ["Apple", "Banana", "Grape", "Orange", "Avocado"];

function searchItems(query) {
  // Your code here
}

console.log(searchItems("ap"));
console.log(searchItems(""));
console.log(searchItems("xyz"));`,
    solution: `function searchItems(query) {\n  if (!query) return items;\n  return items.filter(item =>\n    item.toLowerCase().includes(query.toLowerCase())\n  );\n}`,
    explanation: "Case-insensitive search: convert both query and items to lowercase, then use includes(). Empty query returns all items.",
  },
  {
    id: "app-4", title: "Calculator", difficulty: "Intermediate",
    requirements: ["Add two numbers", "Subtract two numbers", "Multiply two numbers", "Divide two numbers", "Handle divide by zero"],
    starterCode: `// Build a simple calculator
function add(a, b) {
  // Your code here
}

function subtract(a, b) {
  // Your code here
}

function multiply(a, b) {
  // Your code here
}

function divide(a, b) {
  // Your code here
}

console.log("10 + 5 =", add(10, 5));
console.log("10 - 5 =", subtract(10, 5));
console.log("10 * 5 =", multiply(10, 5));
console.log("10 / 5 =", divide(10, 5));
console.log("10 / 0 =", divide(10, 0));`,
    solution: `function add(a, b) { return a + b; }\nfunction subtract(a, b) { return a - b; }\nfunction multiply(a, b) { return a * b; }\nfunction divide(a, b) {\n  if (b === 0) return "Error: Division by zero";\n  return a / b;\n}`,
    explanation: "Basic arithmetic operations with error handling for division by zero.",
  },
];
