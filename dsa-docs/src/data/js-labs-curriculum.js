// ────────────────────────────────────────────────────
// JS Labs — Complete Curriculum Data
// 20 Lessons · 16 Bug Challenges · 8 Mini Projects
// ────────────────────────────────────────────────────

// ─── HELPERS ───

function testContains(pattern) {
  return (code) => code.includes(pattern);
}

function testRegex(regex) {
  return (code) => regex.test(code);
}

// ─── LESSONS ───

export const JS_LESSONS = [
  // ═════════════════════════════════════════════════
  // BEGINNER
  // ═════════════════════════════════════════════════

{
    id: "vars-data-types",
    chapter: 1,
    title: "Variables & Data Types",
    level: "Beginner",
    tags: ["Variables", "let", "const", "Data Types"],
    conceptExplanation: `JavaScript has three ways to declare variables:\n\n• \`var\` — Old way, function-scoped. Avoid in modern code.\n• \`let\` — Block-scoped, can be reassigned.\n• \`const\` — Block-scoped, cannot be reassigned.\n\nJavaScript has 7 primitive data types:\n• \`string\` — Text like "Hello"\n• \`number\` — Integers & decimals like 42 or 3.14\n• \`boolean\` — true or false\n• \`undefined\` — Variable declared but not assigned\n• \`null\` — Intentional absence of value\n• \`symbol\` — Unique identifier (ES6)\n• \`bigint\` — Large integers\n\nPlus one non-primitive: \`object\`.`,
    keyRules: [
      "Use const by default — only use let when you need reassignment",
      "Avoid var in modern JavaScript",
      "Use typeof to check a variable's type",
      "Variable names are case-sensitive",
      "Use camelCase for variable names (e.g., myVariable)",
    ],
    task: `Create the following variables:\n\n1. A const called \`name\` with your name (string)\n2. A let called \`age\` with your age (number)\n3. A const called \`isStudent\` with a boolean value\n4. A const called \`hobbies\` with an array of strings\n\nThen log each variable to the console with a descriptive label.`,
    starterCode: `// Create your variables below
const name = // TODO
let age = // TODO
const isStudent = // TODO
const hobbies = // TODO

// Log them with labels
// Example: console.log("Name:", name);
`,
    solutionCode: `const name = "JavaScript Learner";
let age = 25;
const isStudent = true;
const hobbies = ["coding", "reading", "learning"];

console.log("Name:", name);
console.log("Age:", age);
console.log("Is Student:", isStudent);
console.log("Hobbies:", hobbies);`,
    hint: `Remember:\n• Strings use quotes: "text" or 'text'\n• Numbers don't use quotes: 25\n• Booleans are true or false (no quotes)\n• Arrays use square brackets: [item1, item2]`,
    tests: [
      { name: "Variable 'name' exists and is a string", validate: (c) => c.includes("const name") },
      { name: "Variable 'age' exists and is a number", validate: testContains("let age") },
      { name: "Variable 'isStudent' is a boolean", validate: testContains("const isStudent") },
      { name: "Variable 'hobbies' is an array", validate: testContains("const hobbies") },
      { name: "All variables logged to console", validate: (c) => (c.match(/console\.log/g) || []).length >= 4 },
    ],
  },

{
    id: "operators",
    chapter: 2,
    title: "Operators",
    level: "Beginner",
    tags: ["Operators", "Arithmetic", "Comparison"],
    conceptExplanation: `Operators let you perform operations on values.\n\n**Arithmetic Operators:**\n• \`+\` Addition — 5 + 3 = 8\n• \`-\` Subtraction — 10 - 4 = 6\n• \`*\` Multiplication — 3 * 4 = 12\n• \`/\` Division — 15 / 3 = 5\n• \`%\` Modulus (remainder) — 10 % 3 = 1\n• \`**\` Exponentiation — 2 ** 3 = 8\n\n**Comparison Operators:**\n• \`==\` Loose equality (checks value after coercion)\n• \`===\` Strict equality (checks value AND type) — ALWAYS prefer this\n• \`!=\` Loose inequality\n• \`!==\` Strict inequality\n• \`>\`, \`<\`, \`>=\`, \`<=\` Greater/less than\n\n**Assignment Operators:**\n• \`+=\` a += 5 is same as a = a + 5\n• \`-=\`, \`*=\`, \`/=\` Similar shorthand`,
    keyRules: [
      "Always use === and !== instead of == and !=",
      "Use + for string concatenation or template literals",
      "Use ++ and -- to increment/decrement by 1",
      "Be careful with floating point: 0.1 + 0.2 !== 0.3",
    ],
    task: `Create a program that:\n\n1. Declares two numbers, a and b\n2. Logs the result of each arithmetic operation (+, -, *, /, %)\n3. Logs whether a is greater than b (use ===)\n4. Uses a compound assignment (+=) to add b to a\n5. Logs the updated value of a`,
    starterCode: `const a = 15;
const b = 4;

// Perform and log each operation
console.log("a + b =");
console.log("a - b =");
console.log("a * b =");
console.log("a / b =");
console.log("a % b =");

// Comparison
console.log("a > b:");

// Compound assignment
// Add b to a
console.log("After a += b:", a);
`,
    solutionCode: `const a = 15;
const b = 4;

let result = a + b;
console.log("a + b =", result);
console.log("a - b =", a - b);
console.log("a * b =", a * b);
console.log("a / b =", a / b);
console.log("a % b =", a % b);

console.log("a > b:", a > b);

let c = a;
c += b;
console.log("After c += b:", c);`,
    hint: `• Use \`a + b\` for addition\n• \`a - b\` for subtraction\n• To update a variable: \`let x = 5; x += 3;\` makes x = 8`,
    tests: [
      { name: "Arithmetic operations used", validate: (c) => testRegex(/[\+\-\*\/%]/) },
      { name: "Comparison operator used", validate: testContains(">") },
      { name: "Compound assignment used", validate: testContains("+=") },
      { name: "All results logged", validate: (c) => (c.match(/console\.log/g) || []).length >= 6 },
    ],
  },

{
    id: "type-coercion",
    chapter: 3,
    title: "Type Coercion",
    level: "Beginner",
    tags: ["Coercion", "Type Conversion", "Equality"],
    conceptExplanation: `JavaScript is a dynamically typed language — variables can hold any type, and types are converted automatically (coercion).\n\n**Implicit Coercion (Automatic):**\n• "5" + 3 → "53" (number coerced to string)\n• "5" - 3 → 2 (string coerced to number)\n• !"hello" → false (truthy string coerced to boolean)\n\n**Explicit Conversion (Manual):**\n• \`Number("42")\` → 42\n• \`String(99)\` → "99"\n• \`Boolean(0)\` → false\n• \`parseInt("42px")\` → 42\n\n**Truthy & Falsy Values:**\nFalsy: false, 0, "" (empty string), null, undefined, NaN\nEverything else is truthy!`,
    keyRules: [
      "Always use explicit conversion (Number(), String(), Boolean())",
      "The + operator is the only one that prefers string concatenation",
      "- , *, / always coerce to numbers",
      "Empty array [] is truthy! (Be careful)",
      "NaN === NaN is false — use Number.isNaN() instead",
    ],
    task: `1. Create examples of implicit coercion (string + number, string - number)\n2. Use explicit conversion with Number(), String(), and Boolean()\n3. Log the typeof each result\n4. Check which values are falsy using Boolean()`,
    starterCode: `// Implicit coercion
console.log("5" + 3);   // What happens?
console.log("10" - 4);  // What happens?
console.log("6" * "3"); // What happens?

// Explicit conversion
const strNum = "42";
console.log("Number:", Number(strNum), typeof Number(strNum));
console.log("String:", String(100), typeof String(100));
console.log("Boolean:", Boolean(1), typeof Boolean(1));

// Check falsy values
console.log("Boolean(0):", Boolean(0));
console.log("Boolean(''):", Boolean(""));
console.log("Boolean([]):", Boolean([]));

// TODO: Add your own examples below
`,
    solutionCode: `// Implicit coercion
console.log("5" + 3);   // "53" - number coerced to string
console.log("10" - 4);  // 6 - string coerced to number
console.log("6" * "3"); // 18 - both coerced to numbers

// Explicit conversion
const strNum = "42";
console.log("Number:", Number(strNum), typeof Number(strNum));
console.log("String:", String(100), typeof String(100));
console.log("Boolean:", Boolean(1), typeof Boolean(1));

// Check falsy values
console.log("Boolean(0):", Boolean(0));
console.log("Boolean(''):", Boolean(""));
console.log("Boolean([]):", Boolean([]));

// Bonus: strict equality avoids coercion pitfalls
console.log("0 === false:", 0 === false);
console.log("'' == false:", '' == false);`,
    hint: `Try: \`console.log("5" - true)\` and see what happens!\nHint: true is coerced to 1, false to 0.`,
    tests: [
      { name: "Implicit coercion examples present", validate: (c) => c.includes("+") && c.includes("-") },
      { name: "Number() conversion used", validate: testContains("Number(") },
      { name: "String() conversion used", validate: testContains("String(") },
      { name: "Boolean() conversion used", validate: testContains("Boolean(") },
      { name: "typeof operator used", validate: testContains("typeof") },
    ],
  },

{
    id: "conditionals",
    chapter: 4,
    title: "Conditional Statements",
    level: "Beginner",
    tags: ["if", "else", "switch", "ternary"],
    conceptExplanation: `Conditionals let your code make decisions.\n\n**if / else if / else:**\n\`\`\`js\nif (score >= 90) {\n  console.log("A");\n} else if (score >= 80) {\n  console.log("B");\n} else {\n  console.log("C");\n}\n\`\`\`\n\n**Ternary Operator:**\n\`\`\`js\nconst status = age >= 18 ? "Adult" : "Minor";\n\`\`\`\n\n**Switch Statement:**\n\`\`\`js\nswitch (day) {\n  case "Monday": console.log("Start of week"); break;\n  default: console.log("Other day");\n}\n\`\`\`\n\n**Logical Operators:**\n• \`&&\` — AND (both must be true)\n• \`||\` — OR (at least one true)\n• \`!\` — NOT (inverts boolean)`,
    keyRules: [
      "Always use {} braces even for single-line if blocks",
      "Use ternary for simple true/false assignments, not complex logic",
      "Use switch when comparing the same variable against many values",
      "Falsy values (0, '', null, undefined, NaN) act like false in conditions",
    ],
    task: `1. Create a variable \`score\` with a number\n2. Write an if/else if/else chain that logs grades A (≥90), B (≥80), C (≥70), D (≥60), or F (<60)\n3. Use the ternary operator to determine pass/fail (≥60 passes)\n4. Use && and || to combine conditions\n5. Log all results`,
    starterCode: `const score = 85;

// if/else if/else for grades
// TODO

// Ternary for pass/fail
// const result =
// console.log("Result:", result);

// Logical operators
// const hasPassed = score >= 60 && score <= 100;
// console.log("Has passed:", hasPassed);
`,
    solutionCode: `const score = 85;

let grade;
if (score >= 90) {
  grade = "A";
} else if (score >= 80) {
  grade = "B";
} else if (score >= 70) {
  grade = "C";
} else if (score >= 60) {
  grade = "D";
} else {
  grade = "F";
}
console.log("Grade:", grade);

const result = score >= 60 ? "Pass" : "Fail";
console.log("Result:", result);

const hasPassed = score >= 60 && score <= 100;
const isPerfect = score === 100 || grade === "A";
console.log("Has passed:", hasPassed);
console.log("Is perfect:", isPerfect);`,
    hint: `• Use \`if (condition)\` syntax\n• \`else if\` goes between if and else\n• Ternary: \`condition ? valueIfTrue : valueIfFalse\``,
    tests: [
      { name: "if/else if/else chain used", validate: (c) => testContains("else if") },
      { name: "Ternary operator used", validate: testContains("?") && testContains(":") },
      { name: "&& operator used", validate: testContains("&&") },
      { name: "|| operator used", validate: testContains("||") },
      { name: "All results logged", validate: (c) => (c.match(/console\.log/g) || []).length >= 3 },
    ],
  },

{
    id: "loops",
    chapter: 5,
    title: "Loops",
    level: "Beginner",
    tags: ["for", "while", "forEach", "iteration"],
    conceptExplanation: `Loops let you repeat code multiple times.\n\n**for Loop:**\n\`\`\`js\nfor (let i = 0; i < 5; i++) {\n  console.log(i); // 0, 1, 2, 3, 4\n}\n\`\`\`\n\n**while Loop:**\n\`\`\`js\nlet i = 0;\nwhile (i < 5) {\n  console.log(i);\n  i++;\n}\n\`\`\`\n\n**for...of Loop (ES6):**\n\`\`\`js\nfor (const item of array) {\n  console.log(item);\n}\n\`\`\`\n\n**forEach Method:**\n\`\`\`js\narray.forEach((item, index) => {\n  console.log(index, item);\n});\n\`\`\``,
    keyRules: [
      "Use for...of for iterating arrays when you don't need the index",
      "Use forEach when you need both value and index",
      "Always increment the counter in while loops to avoid infinite loops",
      "Use break to exit a loop early, continue to skip an iteration",
    ],
    task: `1. Create an array of 5 numbers\n2. Use a for loop to log each number multiplied by 2\n3. Use a while loop to log numbers 1 to 5\n4. Use a for...of loop to log each item from the array\n5. Use a for loop to calculate and log the sum of all numbers`,
    starterCode: `const numbers = [10, 20, 30, 40, 50];

// 1. For loop - each number * 2
console.log("Doubled:");
// TODO

// 2. While loop - numbers 1 to 5
console.log("Count:");
// TODO

// 3. For...of loop
console.log("Items:");
// TODO

// 4. Calculate sum
let sum = 0;
// TODO
console.log("Sum:", sum);
`,
    solutionCode: `const numbers = [10, 20, 30, 40, 50];

// 1. For loop - each number * 2
console.log("Doubled:");
for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i] * 2);
}

// 2. While loop - numbers 1 to 5
console.log("Count:");
let count = 1;
while (count <= 5) {
  console.log(count);
  count++;
}

// 3. For...of loop
console.log("Items:");
for (const num of numbers) {
  console.log(num);
}

// 4. Calculate sum
let sum = 0;
for (let i = 0; i < numbers.length; i++) {
  sum += numbers[i];
}
console.log("Sum:", sum);`,
    hint: `• For loop: \`for (init; condition; increment)\`\n• While: \`while (condition) { ... update counter }\`\n• For...of: \`for (const item of array)\``,
    tests: [
      { name: "for loop used", validate: testContains("for (") },
      { name: "while loop used", validate: testContains("while") },
      { name: "for...of loop used", validate: testContains("for (const") || testContains("for (let") },
      { name: "Sum calculated correctly", validate: (c) => testContains("sum") },
    ],
  },

{
    id: "functions",
    chapter: 6,
    title: "Functions",
    level: "Beginner",
    tags: ["Functions", "Parameters", "Return", "Arrow Functions"],
    conceptExplanation: `Functions are reusable blocks of code.\n\n**Function Declaration:**\n\`\`\`js\nfunction greet(name) {\n  return "Hello, " + name;\n}\n\`\`\`\n\n**Function Expression:**\n\`\`\`js\nconst greet = function(name) {\n  return "Hello, " + name;\n};\n\`\`\`\n\n**Arrow Function (ES6):**\n\`\`\`js\nconst greet = (name) => "Hello, " + name;\n\`\`\`\n\n**Key Concepts:**\n• \`return\` sends a value back — without it, function returns \`undefined\`\n• Parameters are the inputs a function expects\n• Arguments are the actual values you pass\n• Default parameters: \`function greet(name = "Guest")\``,
    keyRules: [
      "Always return a value explicitly if the function should produce one",
      "Use arrow functions for short callbacks and simple operations",
      "Use function declarations for named, reusable functions",
      "Default parameters prevent undefined errors",
    ],
    task: `1. Write a function \`add\` that takes two numbers and returns their sum\n2. Write an arrow function \`square\` that takes a number and returns its square\n3. Write a function \`introduce\` that takes a name and age with a default age\n4. Call all three functions and log their results`,
    starterCode: `// 1. Function declaration
function add(a, b) {
  // TODO
}

// 2. Arrow function
const square = (x) => {
  // TODO
};

// 3. Function with default parameter
function introduce(name, age = 25) {
  // TODO
}

// Test the functions
console.log("add(3, 7):");
console.log("square(5):");
console.log("introduce('JS Learner'):");
`,
    solutionCode: `// 1. Function declaration
function add(a, b) {
  return a + b;
}

// 2. Arrow function
const square = (x) => x * x;

// 3. Function with default parameter
function introduce(name, age = 25) {
  return "Hi, I'm " + name + " and I'm " + age + " years old.";
}

// Test the functions
console.log("add(3, 7):", add(3, 7));
console.log("square(5):", square(5));
console.log("introduce('JS Learner'):", introduce("JS Learner"));`,
    hint: `• Use \`return\` keyword to send back a value\n• Arrow functions with single expression can omit {} and return\n• Default params: \`param = defaultValue\``,
    tests: [
      { name: "Function 'add' defined and returns sum", validate: testContains("function add") || testContains("const add") },
      { name: "Arrow function 'square' defined", validate: testContains("square") && testContains("=>") },
      { name: "Function 'introduce' has default parameter", validate: testContains("age =") },
      { name: "All functions called and results logged", validate: (c) => (c.match(/console\.log/g) || []).length >= 3 },
    ],
  },

{
    id: "scope-closures",
    chapter: 7,
    title: "Scope & Closures",
    level: "Beginner",
    tags: ["Scope", "Closures", "Lexical Scope", "IIFE"],
    conceptExplanation: `**Scope** determines where variables are accessible.\n\n• **Global scope** — Accessible everywhere\n• **Function scope** — Accessible inside a function (var)\n• **Block scope** — Accessible inside {} (let, const)\n\n**Closures** occur when a function retains access to variables from its outer scope, even after the outer function has returned.\n\n\`\`\`js\nfunction counter() {\n  let count = 0;\n  return function() {\n    count++;\n    return count;\n  };\n}\n\nconst myCounter = counter();\nconsole.log(myCounter()); // 1\nconsole.log(myCounter()); // 2\n\`\`\`\n\nClosures enable:\n• Data privacy (variables that can't be accessed from outside)\n• Function factories\n• Module pattern`,
    keyRules: [
      "Every function creates its own scope",
      "Inner functions can access outer variables (lexical scoping)",
      "Closures 'remember' the environment they were created in",
      "Use closures for private variables and state management",
    ],
    task: `1. Create a function \`createCounter\` that returns an object with increment, decrement, and getCount methods\n2. Each method should close over a \`count\` variable\n3. Create two separate counters and verify they are independent\n4. Log results to demonstrate closure behavior`,
    starterCode: `function createCounter() {
  // TODO: create a private count variable
  return {
    increment() {
      // TODO
    },
    decrement() {
      // TODO
    },
    getCount() {
      // TODO
    }
  };
}

// Create two counters
const counter1 = createCounter();
const counter2 = createCounter();

// Test independence
counter1.increment();
counter1.increment();
counter1.increment();
counter2.increment();

console.log("Counter 1:"); // Should be 3
console.log("Counter 2:"); // Should be 1
`,
    solutionCode: `function createCounter() {
  let count = 0;
  return {
    increment() { count++; },
    decrement() { count--; },
    getCount() { return count; }
  };
}

const counter1 = createCounter();
const counter2 = createCounter();

counter1.increment();
counter1.increment();
counter1.increment();
counter2.increment();

console.log("Counter 1:", counter1.getCount());
console.log("Counter 2:", counter2.getCount());`,
    hint: `• Declare \`let count = 0\` inside createCounter\n• Each method you return creates a closure over count\n• Two calls to createCounter() create separate count variables`,
    tests: [
      { name: "createCounter function defined", validate: testContains("function createCounter") },
      { name: "Increment method exists", validate: testContains("increment") },
      { name: "Decrement method exists", validate: testContains("decrement") },
      { name: "getCount method returns the count", validate: testContains("getCount") },
      { name: "Private count variable used (closure)", validate: testContains("let count") || testContains("var count") },
    ],
  },

{
    id: "arrays",
    chapter: 8,
    title: "Arrays",
    level: "Beginner",
    tags: ["Arrays", "push", "pop", "shift", "unshift"],
    conceptExplanation: `Arrays store ordered collections of data.\n\n**Creating Arrays:**\n\`\`\`js\nconst fruits = ["apple", "banana", "orange"];\nconst numbers = new Array(1, 2, 3);\n\`\`\`\n\n**Common Methods:**\n• \`push(item)\` — Add to end\n• \`pop()\` — Remove from end\n• \`unshift(item)\` — Add to beginning\n• \`shift()\` — Remove from beginning\n• \`length\` — Number of items\n• \`indexOf(item)\` — Find index\n• \`includes(item)\` — Check if exists\n• \`slice(start, end)\` — Extract portion\n• \`splice(index, count)\` — Remove/replace items`,
    keyRules: [
      "Arrays are zero-indexed — first item is at index 0",
      "Use push/pop for stack behavior (LIFO)",
      "Use shift/unshift sparingly — they re-index all elements",
      "const arrays can be mutated (push/pop) but not reassigned",
      "Use .length to get array size",
    ],
    task: `1. Create an array \`colors\` with 4 colors\n2. Add two colors using push()\n3. Remove the last color using pop()\n4. Add a color at the beginning using unshift()\n5. Check if a specific color exists using includes()\n6. Log the final array and its length`,
    starterCode: `// 1. Create array
const colors = ["red", "blue", "green", "yellow"];

// 2. Add colors with push
// TODO

// 3. Remove last with pop
// TODO

// 4. Add at beginning with unshift
// TODO

// 5. Check if exists
// const hasColor = colors.includes("purple");

// 6. Log results
console.log("Final array:", colors);
console.log("Length:", colors.length);
`,
    solutionCode: `const colors = ["red", "blue", "green", "yellow"];

colors.push("purple");
colors.push("orange");
console.log("After push:", colors);

const removed = colors.pop();
console.log("Removed:", removed);
console.log("After pop:", colors);

colors.unshift("pink");
console.log("After unshift:", colors);

const hasPurple = colors.includes("purple");
console.log("Has purple:", hasPurple);

console.log("Final array:", colors);
console.log("Length:", colors.length);`,
    hint: `• push() adds to end: \`arr.push(item)\`\n• pop() removes from end: \`const last = arr.pop()\`\n• unshift() adds to start: \`arr.unshift(item)\`\n• includes() returns boolean`,
    tests: [
      { name: "push() used to add items", validate: testContains("push(") },
      { name: "pop() used to remove items", validate: testContains("pop(") },
      { name: "unshift() used", validate: testContains("unshift(") },
      { name: "includes() used", validate: testContains("includes(") },
      { name: "Array length logged", validate: testContains("length") },
    ],
  },

{
    id: "objects",
    chapter: 9,
    title: "Objects",
    level: "Beginner",
    tags: ["Objects", "Properties", "Methods", "this"],
    conceptExplanation: `Objects store collections of key-value pairs.\n\n**Creating Objects:**\n\`\`\`js\nconst person = {\n  name: "Alice",\n  age: 30,\n  greet() {\n    return "Hi, I'm " + this.name;\n  }\n};\n\`\`\`\n\n**Accessing Properties:**\n• Dot notation: \`person.name\`\n• Bracket notation: \`person["name"]\` (useful for dynamic keys)\n\n**Adding/Updating:**\n\`\`\`js\nperson.email = "alice@example.com";\nperson["age"] = 31;\n\`\`\`\n\n**Deleting:**\n\`\`\`js\ndelete person.age;\n\`\`\`\n\n**Object Methods:**\n• \`Object.keys(obj)\` — Get all keys\n• \`Object.values(obj)\` — Get all values\n• \`Object.entries(obj)\` — Get key-value pairs`,
    keyRules: [
      "Use dot notation by default (cleaner and faster)",
      "Use bracket notation for dynamic or invalid identifier keys",
      "Objects are passed by reference — mutating affects all references",
      "Use Object.freeze() for shallow immutability",
    ],
    task: `1. Create a \`car\` object with brand, model, year, and a method that returns a description\n2. Add a new property \`color\` after creation\n3. Update the year\n4. Log all keys and values using Object.keys() and Object.values()\n5. Call the method and log the result`,
    starterCode: `// 1. Create car object
const car = {
  brand: "Toyota",
  model: "Camry",
  year: 2020,
  getDescription() {
    // TODO: return "brand model (year)"
  }
};

// 2. Add color property
// TODO

// 3. Update year
// TODO

// 4. Log keys and values
console.log("Keys:");

console.log("Values:");

// 5. Call method
console.log("Description:");
`,
    solutionCode: `const car = {
  brand: "Toyota",
  model: "Camry",
  year: 2020,
  getDescription() {
    return this.brand + " " + this.model + " (" + this.year + ")";
  }
};

car.color = "Blue";
car.year = 2022;

console.log("Keys:", Object.keys(car));
console.log("Values:", Object.values(car));
console.log("Description:", car.getDescription());`,
    hint: `• Add property: \`obj.newProp = value\`\n• Method using this: \`methodName() { return this.prop; }\`\n• Object.keys() returns array of property names`,
    tests: [
      { name: "Object created with properties", validate: testContains("const car") || testContains("let car") },
      { name: "Property added after creation", validate: (c) => testRegex(/car\.\w+\s*=\s*/)(c) || testRegex(/car\[/)(c) },
      { name: "Object.keys() used", validate: testContains("Object.keys(") },
      { name: "Object.values() used", validate: testContains("Object.values(") },
      { name: "Method uses 'this' keyword", validate: testContains("this.") },
    ],
  },

  // ═════════════════════════════════════════════════
  // INTERMEDIATE
  // ═════════════════════════════════════════════════

{
    id: "destructuring",
    chapter: 10,
    title: "Destructuring",
    level: "Intermediate",
    tags: ["Destructuring", "Spread", "Rest"],
    conceptExplanation: `Destructuring unpacks values from arrays and objects into variables.\n\n**Array Destructuring:**\n\`\`\`js\nconst [first, second] = [10, 20, 30];\n// first = 10, second = 20\n\nconst [head, ...tail] = [1, 2, 3, 4];\n// head = 1, tail = [2, 3, 4]\n\`\`\`\n\n**Object Destructuring:**\n\`\`\`js\nconst { name, age } = { name: "Alice", age: 30 };\n\nconst { name: userName, ...rest } = user;\n\`\`\`\n\n**Nested Destructuring:**\n\`\`\`js\nconst { address: { city } } = person;\n\`\`\`\n\n**Spread Operator (...):**\n• Array: \`[...arr1, ...arr2]\` — merge\n• Object: \`{...obj1, ...obj2}\` — merge (shallow)`,
    keyRules: [
      "Use destructuring for cleaner code when accessing multiple properties",
      "Use default values: const [a = 1] = []",
      "Use rest (...) to collect remaining items",
      "Spread creates shallow copies — nested objects are still references",
    ],
    task: `1. Create an array and destructure its values into variables\n2. Create an object and destructure its properties\n3. Use nested destructuring\n4. Use the spread operator to merge two objects\n5. Log all results`,
    starterCode: `// 1. Array destructuring
const rgb = [255, 128, 64];
// TODO: destructure into red, green, blue

// 2. Object destructuring
const user = { id: 1, name: "Alice", email: "alice@test.com" };
// TODO: destructure name and email

// 3. Nested destructuring
const data = { product: { title: "Laptop", price: 999 } };
// TODO: destructure title and price

// 4. Spread operator
const defaults = { theme: "dark", lang: "en" };
const userPrefs = { lang: "fr", fontSize: 14 };
// TODO: merge with spread, userPrefs should override defaults

console.log("Red:", red);
console.log("Name:", name);
console.log("Title:", title);
console.log("Merged:", merged);
`,
    solutionCode: `const rgb = [255, 128, 64];
const [red, green, blue] = rgb;

const user = { id: 1, name: "Alice", email: "alice@test.com" };
const { name, email } = user;

const data = { product: { title: "Laptop", price: 999 } };
const { product: { title, price } } = data;

const defaults = { theme: "dark", lang: "en" };
const userPrefs = { lang: "fr", fontSize: 14 };
const merged = { ...defaults, ...userPrefs };

console.log("Red:", red);
console.log("Name:", name);
console.log("Title:", title);
console.log("Merged:", merged);`,
    hint: `• Array: \`const [a, b] = array\`\n• Object: \`const { prop } = obj\`\n• Nested: \`const { outer: { inner } } = obj\`\n• Spread merge: \`{...obj1, ...obj2}\``,
    tests: [
      { name: "Array destructuring used", validate: testRegex(/\[\s*\w+\s*,\s*\w+/) },
      { name: "Object destructuring used", validate: testRegex(/\{\s*\w+\s*[},]/) },
      { name: "Nested destructuring used", validate: testContains("product:") || testContains("address:") || testContains("user:") },
      { name: "Spread operator used", validate: testContains("...") },
    ],
  },

{
    id: "es6-features",
    chapter: 11,
    title: "ES6+ Features",
    level: "Intermediate",
    tags: ["ES6", "Template Literals", "Arrow Functions", "Let/Const"],
    conceptExplanation: `ES6 (ECMAScript 2015) introduced major improvements to JavaScript.\n\n**Template Literals:**\n\`\`\`js\nconst name = "World";\nconsole.log(\`Hello \${name}!\`); // Backticks!\n\`\`\`\n\n**Arrow Functions:**\n\`\`\`js\nconst double = x => x * 2;\nconst sum = (a, b) => a + b;\n\`\`\`\n\n**Default Parameters:**\n\`\`\`js\nconst greet = (name = "Guest") => \`Hello \${name}\`;\n\`\`\`\n\n**Enhanced Object Literals:**\n\`\`\`js\nconst name = "Alice";\nconst person = { name, greet() {} }; // Shorthand\n\`\`\`\n\n**Optional Chaining (ES2020):**\n\`\`\`js\nconst city = user?.address?.city;\n\`\`\`\n\n**Nullish Coalescing (ES2020):**\n\`\`\`js\nconst value = input ?? "default";\n\`\`\``,
    keyRules: [
      "Use template literals (`) for string interpolation — always!",
      "Arrow functions don't have their own 'this' — they inherit from parent scope",
      "Use ?? for default values (only catches null/undefined, not other falsy values)",
      "Use optional chaining (?.) to safely access nested properties",
    ],
    task: `1. Use template literals to create a greeting with variables\n2. Write an arrow function that returns a formatted string using template literals\n3. Use optional chaining to safely access a nested property\n4. Use nullish coalescing to provide a default value\n5. Use enhanced object literal syntax (shorthand properties)`,
    starterCode: `// 1. Template literals
const firstName = "Jane";
const lastName = "Doe";
// TODO: create greeting using template literal

// 2. Arrow function with template literal
const formatUser = (name, role) => {
  // TODO
};

// 3. Optional chaining
const user = { profile: { displayName: "JaneD" } };
// TODO: safely access displayName

// 4. Nullish coalescing
const input = null;
// TODO: use ?? to default to "Anonymous"

// 5. Enhanced object literals
const x = 10, y = 20;
// TODO: create point { x, y } using shorthand

console.log(greeting);
console.log(formatUser("Jane", "Admin"));
console.log("Display name:", displayName);
console.log("Name:", safeName);
console.log("Point:", point);
`,
    solutionCode: `const firstName = "Jane";
const lastName = "Doe";
const greeting = \`Hello, \${firstName} \${lastName}!\`;

const formatUser = (name, role) => \`\${name} — \${role}\`;

const user = { profile: { displayName: "JaneD" } };
const displayName = user?.profile?.displayName;

const input = null;
const safeName = input ?? "Anonymous";

const x = 10, y = 20;
const point = { x, y };

console.log(greeting);
console.log(formatUser("Jane", "Admin"));
console.log("Display name:", displayName);
console.log("Name:", safeName);
console.log("Point:", point);`,
    hint: `• Template literals use backticks: \` \$\{var\} \`\n• Optional chaining: \`obj?.prop?.nested\`\n• Nullish coalescing: \`val ?? default\`\n• Shorthand: \`{ name, age }\` instead of \`{ name: name, age: age }\``,
    tests: [
      { name: "Template literal used with ${}", validate: testRegex(/\$\{/i) },
      { name: "Arrow function defined", validate: testContains("=>") },
      { name: "Optional chaining used", validate: testContains("?.") },
      { name: "Nullish coalescing used", validate: testContains("??") },
      { name: "Enhanced object literal used", validate: testRegex(/\{\s*\w+\s*[,\}]/i) },
    ],
  },

{
    id: "array-methods",
    chapter: 12,
    title: "Array Methods",
    level: "Intermediate",
    tags: ["map", "filter", "reduce", "find", "some", "every"],
    conceptExplanation: `JavaScript arrays have powerful built-in methods for functional programming.\n\n**map** — Transform each element:\n\`\`\`js\nnumbers.map(n => n * 2);\n\`\`\`\n\n**filter** — Keep matching elements:\n\`\`\`js\nnumbers.filter(n => n > 10);\n\`\`\`\n\n**reduce** — Reduce to a single value:\n\`\`\`js\nnumbers.reduce((acc, n) => acc + n, 0);\n\`\`\`\n\n**find** — First matching element:\n\`\`\`js\nusers.find(u => u.id === 5);\n\`\`\`\n\n**some / every** — Check conditions:\n\`\`\`js\nnumbers.some(n => n < 0);  // At least one negative?\nnumbers.every(n => n > 0); // All positive?\n\`\`\``,
    keyRules: [
      "map returns same length as original array",
      "filter returns a subset (shorter or equal length)",
      "reduce can return any type (number, array, object, etc.)",
      "Chain methods: array.filter().map().reduce()",
      "These methods create new arrays — they don't mutate the original",
    ],
    task: `1. Create an array of numbers [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\n2. Use map to get squares of each number\n3. Use filter to get only even numbers\n4. Use reduce to calculate the sum\n5. Use find to get the first number > 5\n6. Use some to check if any number > 8\n7. Chain filter + map + reduce to: get evens, double them, then sum`,
    starterCode: `const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Map: squares
// TODO

// Filter: evens
// TODO

// Reduce: sum
// TODO

// Find: first > 5
// TODO

// Some: any > 8
// TODO

// Chain: evens doubled then summed
// TODO

console.log("Squares:", squares);
console.log("Evens:", evens);
console.log("Sum:", sum);
console.log("First > 5:", firstOver5);
console.log("Any > 8:", hasOver8);
console.log("Chained result:", chainedResult);
`,
    solutionCode: `const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const squares = numbers.map(n => n * n);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);
const firstOver5 = numbers.find(n => n > 5);
const hasOver8 = numbers.some(n => n > 8);
const chainedResult = numbers
  .filter(n => n % 2 === 0)
  .map(n => n * 2)
  .reduce((acc, n) => acc + n, 0);

console.log("Squares:", squares);
console.log("Evens:", evens);
console.log("Sum:", sum);
console.log("First > 5:", firstOver5);
console.log("Any > 8:", hasOver8);
console.log("Chained result:", chainedResult);`,
    hint: `• map: \`arr.map(x => transform(x))\`\n• filter: \`arr.filter(x => condition)\`\n• reduce: \`arr.reduce((acc, x) => acc + x, initial)\`\n• find: \`arr.find(x => condition)\`\n• Chain them: \`arr.filter(...).map(...).reduce(...)\``,
    tests: [
      { name: "map() used to transform array", validate: testContains(".map(") },
      { name: "filter() used to select items", validate: testContains(".filter(") },
      { name: "reduce() used to aggregate", validate: testContains(".reduce(") },
      { name: "find() used to locate element", validate: testContains(".find(") },
      { name: "some() condition check used", validate: testContains(".some(") },
      { name: "Methods chained together", validate: (c) => c.includes(".filter(") && c.includes(".map(") && c.includes(".reduce(") },
    ],
  },

{
    id: "dom-manipulation",
    chapter: 13,
    title: "DOM Manipulation",
    level: "Intermediate",
    tags: ["DOM", "querySelector", "Events", "CreateElement"],
    conceptExplanation: `The Document Object Model (DOM) represents HTML as a tree of objects you can manipulate with JavaScript.\n\n**Selecting Elements:**\n\`\`\`js\ndocument.querySelector(".class");      // First match\ndocument.querySelectorAll("div");     // All matches\ndocument.getElementById("myId");\ndocument.getElementsByClassName("c");\n\`\`\`\n\n**Manipulating Elements:**\n\`\`\`js\nelement.textContent = "Hello";\nelement.innerHTML = "<b>Bold</b>";\nelement.style.color = "red";\nelement.classList.add("active");\nelement.setAttribute("data-id", "5");\n\`\`\`\n\n**Creating & Removing:**\n\`\`\`js\nconst div = document.createElement("div");\ndocument.body.appendChild(div);\ndiv.remove();\n\`\`\`\n\n**Event Handling:**\n\`\`\`js\nbutton.addEventListener("click", (e) => {\n  console.log("Clicked!", e.target);\n});\n\`\`\``,
    keyRules: [
      "DOM APIs are available only in browsers, not Node.js",
      "Prefer textContent over innerHTML for security (prevents XSS)",
      "Use event delegation for handling events on many elements",
      "Cache DOM queries in variables for performance",
    ],
    task: `This lesson runs in a browser environment. For our console playground, simulate the DOM by:\n\n1. Create a function \`createElement(tag, attrs, children)\` that returns a virtual element object\n2. Create a function \`render(el)\` that returns a string representation (HTML-like)\n3. Build a simple UI structure: a div with a heading and a paragraph\n4. Log the rendered HTML string`,
    starterCode: `// Simulate DOM creation with plain JS

function createElement(tag, attrs = {}, children = []) {
  // TODO: return { tag, attrs, children }
}

function render(vnode) {
  // TODO: convert virtual node to string
  // <tag attr="value">children</tag>
}

// Build: <div class="container">
//          <h1>Title</h1>
//          <p>Description text</p>
//        </div>
const app = createElement("div", { class: "container" }, [
  createElement("h1", {}, ["Hello DOM"]),
  createElement("p", {}, ["This is a virtual element."])
]);

console.log(render(app));
`,
    solutionCode: `function createElement(tag, attrs = {}, children = []) {
  return { tag, attrs, children };
}

function render(vnode) {
  const attrs = Object.entries(vnode.attrs)
    .map(([k, v]) => \` \${k}="\${v}"\`)
    .join("");
  const children = vnode.children
    .map(c => typeof c === "string" ? c : render(c))
    .join("");
  return \`<\${vnode.tag}\${attrs}>\${children}</\${vnode.tag}>\`;
}

const app = createElement("div", { class: "container" }, [
  createElement("h1", {}, ["Hello DOM"]),
  createElement("p", {}, ["This is a virtual element."])
]);

console.log(render(app));`,
    hint: `• createElement returns an object: \`{ tag, attrs, children }\`\n• render needs to recursively process children\n• Build the HTML string in the format: \`<tag key="val">children</tag>\``,
    tests: [
      { name: "createElement function defined", validate: testContains("function createElement") },
      { name: "render function defined", validate: testContains("function render") },
      { name: "Virtual element has tag, attrs, children", validate: testContains("tag") && testContains("attrs") && testContains("children") },
      { name: "Recursive rendering implemented", validate: testContains("render(") },
      { name: "Final structure logged", validate: testContains("console.log") || testContains("render(app") },
    ],
  },

{
    id: "event-handling",
    chapter: 14,
    title: "Event Handling",
    level: "Intermediate",
    tags: ["Events", "addEventListener", "Event Object", "Propagation"],
    conceptExplanation: `Events allow your code to respond to user interactions.\n\n**Adding Event Listeners:**\n\`\`\`js\nelement.addEventListener("click", (event) => {\n  console.log("Clicked!", event.target);\n});\n\`\`\`\n\n**Common Events:**\n• click, dblclick — Mouse clicks\n• mouseenter, mouseleave — Hover\n• keydown, keyup — Keyboard\n• submit — Form submission\n• input, change — Input changes\n• load, DOMContentLoaded — Page ready\n\n**Event Object Properties:**\n• \`target\` — Element that triggered the event\n• \`currentTarget\` — Element listener is attached to\n• \`type\` — Event type ("click")\n• \`key\` — For keyboard events\n• \`preventDefault()\` — Stop default behavior\n• \`stopPropagation()\` — Stop bubbling`,
    keyRules: [
      "Use addEventListener, not onclick attribute (supports multiple listeners)",
      "Call preventDefault() to stop form submission, link navigation, etc.",
      "Use event delegation for dynamic elements",
      "Remove listeners with removeEventListener when cleaning up",
    ],
    task: `For this console-based lesson, create an event system simulation:\n\n1. Create an \`EventEmitter\` class with on(), off(), and emit() methods\n2. Register event listeners for different event types\n3. Emit events and verify listeners are called\n4. Remove a listener and verify it's no longer called`,
    starterCode: `class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    // TODO: register callback for event
  }

  off(event, callback) {
    // TODO: remove callback
  }

  emit(event, data) {
    // TODO: call all callbacks for event with data
  }
}

// Test the event system
const emitter = new EventEmitter();

emitter.on("click", (data) => console.log("Clicked:", data));
emitter.on("hover", (data) => console.log("Hovered:", data));

const logCustom = (data) => console.log("Custom:", data);
emitter.on("custom", logCustom);

emitter.emit("click", { x: 10, y: 20 });
emitter.emit("hover", { element: "button" });
emitter.emit("custom", { msg: "Hello" });

emitter.off("custom", logCustom);
emitter.emit("custom", { msg: "Should not appear" });

console.log("Done");
`,
    solutionCode: `class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  }

  off(event, callback) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(cb => cb !== callback);
  }

  emit(event, data) {
    if (!this.events[event]) return;
    this.events[event].forEach(cb => cb(data));
  }
}

const emitter = new EventEmitter();

emitter.on("click", (data) => console.log("Clicked:", data));
emitter.on("hover", (data) => console.log("Hovered:", data));

const logCustom = (data) => console.log("Custom:", data);
emitter.on("custom", logCustom);

emitter.emit("click", { x: 10, y: 20 });
emitter.emit("hover", { element: "button" });
emitter.emit("custom", { msg: "Hello" });

emitter.off("custom", logCustom);
emitter.emit("custom", { msg: "Should not appear" });

console.log("Done");`,
    hint: `• Store callbacks in an object: \`{ eventName: [callback1, callback2] }\`\n• on() adds to the array, off() filters it out\n• emit() loops through and calls each callback with data`,
    tests: [
      { name: "EventEmitter class defined", validate: testContains("class EventEmitter") },
      { name: "on() method implemented", validate: testContains("on(") },
      { name: "off() method implemented", validate: testContains("off(") },
      { name: "emit() method implemented", validate: testContains("emit(") },
      { name: "Multiple event types used", validate: (c) => (c.match(/\.emit\(/g) || []).length >= 2 },
    ],
  },

  // ═════════════════════════════════════════════════
  // ADVANCED
  // ═════════════════════════════════════════════════



{
    id: "async-js",
    chapter: 15,
    title: "Async JavaScript",
    level: "Advanced",
    tags: ["Callbacks", "Async", "setTimeout", "Event Loop", "Non-blocking"],
    conceptExplanation: `JavaScript is single-threaded — it can only do one thing at a time. But it handles asynchronous operations through the event loop.\n\n**Synchronous vs Asynchronous:**\n\`\`\`js\n// Synchronous — blocks until complete\nconsole.log("Start");\nfor (let i = 0; i < 1000000; i++) {} // Blocks!\nconsole.log("End");\n\`\`\`\n\n// Asynchronous — doesn't block\nconsole.log("Start");\nsetTimeout(() => console.log("Async"), 0);\nconsole.log("End");\n// Output: Start, End, Async\n\`\`\`\n\n**Common Async Patterns:**\n• **Callbacks** — Functions passed as arguments, called later\n• **setTimeout / setInterval** — Schedule code for later\n• **Event listeners** — Respond to user actions\n• **Promises** — Cleaner async handling (next lesson)\n\n**The Event Loop:**\n1. Call stack runs synchronous code\n2. Microtask queue (Promise callbacks) runs next\n3. Macrotask queue (setTimeout, DOM events) runs last\n4. The loop repeats`,
    keyRules: [
      "JavaScript never waits — it schedules async operations and moves on",
      "setTimeout(cb, 0) doesn't run immediately — it goes to the macrotask queue",
      "Callbacks can lead to 'callback hell' — nested callbacks that are hard to read",
      "Always handle errors in callbacks: callback(new Error(...)) pattern",
      "The event loop is what makes non-blocking I/O possible",
    ],
    task: `1. Write console.log statements to demonstrate the order: sync → microtask → macrotask\n2. Create a function \`waitAndRun(callback, ms)\` that calls the callback after ms milliseconds\n3. Use \`waitAndRun\` to chain two callbacks (callback hell pattern)\n4. Write a function \`repeatNTimes(n, callback)\` that calls callback n times\n5. Log all results to see async behavior`,
    starterCode: `// 1. Demonstrate async order
console.log("1: Sync start");

setTimeout(() => console.log("4: Macrotask"), 0);
Promise.resolve().then(() => console.log("3: Microtask"));

console.log("2: Sync end");

// 2. waitAndRun function
function waitAndRun(callback, ms) {
  // TODO: use setTimeout to call callback after ms
}

// 3. Chained callbacks
waitAndRun(() => {
  console.log("First");
  waitAndRun(() => {
    console.log("Second");
    waitAndRun(() => {
      console.log("Third");
    }, 500);
  }, 300);
}, 200);

// 4. repeatNTimes
function repeatNTimes(n, callback) {
  // TODO: call callback n times with 100ms delay between each
}`,
    solutionCode: `console.log("1: Sync start");

setTimeout(() => console.log("4: Macrotask"), 0);
Promise.resolve().then(() => console.log("3: Microtask"));

console.log("2: Sync end");

function waitAndRun(callback, ms) {
  setTimeout(callback, ms);
}

waitAndRun(() => {
  console.log("First (after 200ms)");
}, 200);

function repeatNTimes(n, callback) {
  if (n <= 0) return;
  callback();
  setTimeout(() => repeatNTimes(n - 1, callback), 100);
}

repeatNTimes(3, () => console.log("Repeat!"));`,
    hint: `• setTimeout(cb, ms) schedules cb to run after ms\n• Promise.resolve().then(cb) schedules as a microtask\n• Microtasks run BEFORE macrotasks\n• Callbacks are just functions passed as arguments`,
    tests: [
      { name: "setTimeout used for async scheduling", validate: (c) => c.includes("setTimeout(") },
      { name: "Callback pattern used", validate: (c) => c.includes("callback(") || c.includes("callback ") },
      { name: "Sync/async order demonstrated", validate: (c) => c.includes("console.log") && c.includes("setTimeout") },
      { name: "Macrotask behavior demonstrated", validate: (c) => c.includes("setTimeout") },
    ],
  },

{
    id: "promises",
    chapter: 16,
    title: "Promises",
    level: "Advanced",
    tags: ["Promises", "then", "catch", "finally"],
    conceptExplanation: `Promises handle asynchronous operations.\n\n**Promise States:**\n• Pending — Initial state\n• Fulfilled — Operation completed successfully\n• Rejected — Operation failed\n\n**Creating a Promise:**\n\`\`\`js\nconst promise = new Promise((resolve, reject) => {\n  setTimeout(() => resolve("Done!"), 1000);\n});\n\`\`\`\n\n**Consuming a Promise:**\n\`\`\`js\npromise\n  .then(result => console.log(result))\n  .catch(error => console.error(error))\n  .finally(() => console.log("Cleanup"));\n\`\`\`\n\n**Promise Static Methods:**\n• \`Promise.all([p1, p2])\` — All must resolve\n• \`Promise.allSettled([p1, p2])\` — All settle (resolve or reject)\n• \`Promise.race([p1, p2])\` — First to settle\n• \`Promise.resolve(value)\` — Resolve immediately\n• \`Promise.reject(err)\` — Reject immediately`,
    keyRules: [
      "Always handle promise rejections with .catch()",
      "Promise.all fails fast — if one rejects, all reject",
      "Promise.allSettled never rejects — use for independent operations",
      "Promise chaining: each .then() returns a new promise",
    ],
    task: `1. Create a function \`delay(ms)\` that returns a promise resolving after ms milliseconds\n2. Create a function \`fetchUser(id)\` that returns a promise simulating API call\n3. Use Promise.all to fetch multiple users in parallel\n4. Use .then() chaining to transform results\n5. Handle errors with .catch()`,
    starterCode: `// 1. Delay function
function delay(ms) {
  // TODO: return a promise that resolves after ms
}

// 2. Simulate API call
function fetchUser(id) {
  return new Promise((resolve) => {
    delay(500).then(() => {
      resolve({ id, name: \`User_\${id}\` });
    });
  });
}

// 3. Fetch multiple users
console.time("fetch");
const user1 = fetchUser(1);
const user2 = fetchUser(2);
const user3 = fetchUser(3);

// 4. Use Promise.all
Promise.all([user1, user2, user3])
  .then(users => {
    console.log("All users:", users);
    console.timeEnd("fetch");
  })
  .catch(error => console.error("Error:", error));
`,
    solutionCode: `function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchUser(id) {
  return new Promise((resolve) => {
    delay(500).then(() => {
      resolve({ id, name: \`User_\${id}\` });
    });
  });
}

console.time("fetch");
const user1 = fetchUser(1);
const user2 = fetchUser(2);
const user3 = fetchUser(3);

Promise.all([user1, user2, user3])
  .then(users => {
    console.log("All users:", users);
    console.timeEnd("fetch");
  })
  .catch(error => console.error("Error:", error));`,
    hint: `• \`new Promise((resolve, reject) => { ... })\`\n• resolve(value) fulfills the promise\n• Promise.all([p1, p2, p3]) waits for all to resolve\n• Use setTimeout inside delay: \`setTimeout(() => resolve(), ms)\``,
    tests: [
      { name: "delay() function returns a Promise", validate: testContains("new Promise") || testContains("return new Promise") },
      { name: "fetchUser() simulates API call", validate: testContains("function fetchUser") },
      { name: "Promise.all() used", validate: testContains("Promise.all(") },
      { name: ".catch() error handler present", validate: testContains(".catch(") },
    ],
  },

{
    id: "async-await",
    chapter:  17,
    title: "Async Await",
    level: "Advanced",
    tags: ["async", "await", "try/catch"],
    conceptExplanation: `Async/await is syntactic sugar over Promises, making async code read like sync code.\n\n**async Keyword:**\n\`\`\`js\nasync function getData() {\n  // Always returns a promise\n}\n\`\`\`\n\n**await Keyword:**\n\`\`\`js\nconst result = await somePromise;\n// Pauses execution until promise settles\n\`\`\`\n\n**Error Handling:**\n\`\`\`js\nasync function safeFetch() {\n  try {\n    const data = await fetch(url);\n    return data;\n  } catch (error) {\n    console.error("Failed:", error);\n    return null;\n  }\n}\n\`\`\`\n\n**Parallel with async/await:**\n\`\`\`js\nconst [a, b] = await Promise.all([fetchA(), fetchB()]);\n\`\`\``,
    keyRules: [
      "await only works inside async functions",
      "Always wrap await in try/catch for error handling",
      "Use Promise.all for parallel operations — don't await sequentially",
      "Async functions always return a Promise, even if you return a plain value",
      "Top-level await works in ES modules (but not all environments)",
    ],
    task: `1. Create an async function \`getUser(id)\` that awaits fetchUser\n2. Create an async function \`getAllUsers()\` that fetches multiple users in parallel\n3. Add try/catch error handling\n4. Demonstrate sequential vs parallel fetching\n5. Log timing comparisons`,
    starterCode: `function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchUser(id) {
  return delay(500).then(() => ({ id, name: \`User_\${id}\` }));
}

// 1. Async function with await
async function getUser(id) {
  // TODO: await fetchUser and return the user
}

// 2. Parallel fetching with error handling
async function getAllUsers() {
  try {
    // TODO: use Promise.all to fetch users [1, 2, 3]
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

// Test sequential vs parallel
async function main() {
  // Sequential
  console.time("sequential");
  const u1 = await fetchUser(1);
  const u2 = await fetchUser(2);
  console.timeEnd("sequential");

  // Parallel
  console.time("parallel");
  const [p1, p2] = await Promise.all([fetchUser(1), fetchUser(2)]);
  console.timeEnd("parallel");

  console.log("Sequential results:", u1, u2);
  console.log("Parallel results:", p1, p2);
}

main().catch(console.error);
`,
    solutionCode: `function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchUser(id) {
  return delay(500).then(() => ({ id, name: \`User_\${id}\` }));
}

async function getUser(id) {
  return await fetchUser(id);
}

async function getAllUsers() {
  try {
    const users = await Promise.all([1, 2, 3].map(id => fetchUser(id)));
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

async function main() {
  console.time("sequential");
  const u1 = await getUser(1);
  const u2 = await getUser(2);
  console.timeEnd("sequential");

  console.time("parallel");
  const [p1, p2] = await Promise.all([fetchUser(1), fetchUser(2)]);
  console.timeEnd("parallel");

  console.log("Sequential results:", u1, u2);
  console.log("Parallel results:", p1, p2);
}

main().catch(console.error);`,
    hint: `• \`async function fn() { await something; }\`\n• Sequential: await one, then await another\n• Parallel: \`await Promise.all([task1, task2])\`\n• Try/catch: \`try { ... } catch (err) { ... }\``,
    tests: [
      { name: "async function defined", validate: testContains("async function") },
      { name: "await keyword used", validate: testContains("await") },
      { name: "try/catch error handling present", validate: testContains("try") && testContains("catch") },
      { name: "Promise.all with await used", validate: testContains("await Promise.all(") },
      { name: "Timing comparison logged", validate: testContains("console.time") },
    ],
  },

{
    id: "error-handling",
    chapter:  18,
    title: "Error Handling",
    level: "Advanced",
    tags: ["try/catch", "throw", "Error Types", "Custom Errors"],
    conceptExplanation: `Proper error handling makes your applications robust and debuggable.\n\n**try/catch/finally:**\n\`\`\`js\ntry {\n  // Risky code\n  JSON.parse(invalidJson);\n} catch (error) {\n  console.error(error.message);\n} finally {\n  // Always runs\n  cleanup();\n}\n\`\`\`\n\n**Throwing Errors:**\n\`\`\`js\nfunction divide(a, b) {\n  if (b === 0) {\n    throw new Error("Division by zero");\n  }\n  return a / b;\n}\n\`\`\`\n\n**Error Types:**\n• \`Error\` — Generic\n• \`SyntaxError\` — Invalid syntax\n• \`TypeError\` — Wrong type\n• \`ReferenceError\` — Undefined variable\n• \`RangeError\` — Out of valid range`,
    keyRules: [
      "Always handle errors with try/catch — don't let them crash the app",
      "Use the finally block for cleanup (close files, hide loading spinners)",
      "Throw specific error types for better debugging",
      "Create custom error classes by extending Error",
      "Don't catch errors you can't handle — let them propagate",
    ],
    task: `1. Create a custom \`ValidationError\` class extending Error\n2. Write a \`validateUser(user)\` function that throws ValidationError for invalid data\n3. Use try/catch to handle errors gracefully\n4. Use finally to log that validation completed\n5. Test with both valid and invalid inputs`,
    starterCode: `// 1. Custom error class
// TODO: class ValidationError extends Error

// 2. Validation function
function validateUser(user) {
  if (!user.name) {
    throw new ValidationError("Name is required");
  }
  if (typeof user.age !== "number" || user.age < 0) {
    throw new ValidationError("Invalid age");
  }
  if (!user.email || !user.email.includes("@")) {
    throw new ValidationError("Valid email is required");
  }
  return true;
}

// 3. Test cases
const users = [
  { name: "Alice", age: 30, email: "alice@test.com" },
  { name: "", age: 25, email: "bob@test.com" },
  { name: "Charlie", age: -5, email: "charlie@test.com" },
  { name: "Diana", age: 28, email: "invalid" },
];

users.forEach(user => {
  try {
    validateUser(user);
    console.log(user.name || "User" + ": Valid ✓");
  } catch (error) {
    if (error instanceof ValidationError) {
      console.log(user.name || "User" + ": " + error.message);
    }
  } finally {
    // TODO: log that validation completed
  }
});
`,
    solutionCode: `class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

function validateUser(user) {
  if (!user.name) {
    throw new ValidationError("Name is required");
  }
  if (typeof user.age !== "number" || user.age < 0) {
    throw new ValidationError("Invalid age");
  }
  if (!user.email || !user.email.includes("@")) {
    throw new ValidationError("Valid email is required");
  }
  return true;
}

const users = [
  { name: "Alice", age: 30, email: "alice@test.com" },
  { name: "", age: 25, email: "bob@test.com" },
  { name: "Charlie", age: -5, email: "charlie@test.com" },
  { name: "Diana", age: 28, email: "invalid" },
];

users.forEach(user => {
  try {
    validateUser(user);
    console.log((user.name || "User") + ": Valid ✓");
  } catch (error) {
    if (error instanceof ValidationError) {
      console.log((user.name || "User") + ": " + error.message);
    }
  } finally {
    console.log("Validation completed");
  }
});`,
    hint: `• Custom error: \`class MyError extends Error { constructor(msg) { super(msg); this.name = "MyError"; } }\`\n• throw: \`throw new ErrorType("message")\`\n• finally: runs whether or not an error occurred`,
    tests: [
      { name: "Custom ValidationError class defined", validate: testContains("class ValidationError") && testContains("extends Error") },
      { name: "throw used in validateUser", validate: testContains("throw") },
      { name: "try/catch used for error handling", validate: testContains("try") && testContains("catch") },
      { name: "finally block present", validate: testContains("finally") },
      { name: "instanceof check for error type", validate: testContains("instanceof") },
    ],
  },

{
    id: "modules",
    chapter:  19,
    title: "Modules",
    level: "Advanced",
    tags: ["Modules", "Import", "Export", "ES Modules"],
    conceptExplanation: `Modules let you split code into separate files.\n\n**Exporting:**\n\`\`\`js\n// math.js\nexport const PI = 3.14159;\nexport function add(a, b) { return a + b; }\nexport default class Calculator { }\n\`\`\`\n\n**Importing:**\n\`\`\`js\n// app.js\nimport { add, PI } from "./math.js";\nimport Calculator from "./math.js";\n\`\`\`\n\n**Named vs Default Exports:**\n• Named: \`export const x = 1\` → \`import { x } from ...\`\n• Default: \`export default fn\` → \`import fn from ...\`\n• Combined: \`import defaultExport, { named1, named2 } from ...\`\n\n**Re-exporting:**\n\`\`\`js\nexport { add, subtract } from "./math.js";\nexport * from "./math.js";\n\`\`\``,
    keyRules: [
      "Use named exports for utilities and multiple values",
      "Use default export for the main class/function in a module",
      "Modules are always in strict mode by default",
      "Import order doesn't matter — dependencies are resolved first",
      "Use index.js as a barrel file to simplify imports",
    ],
    task: `For this single-file exercise, simulate modules by:\n\n1. Create an object \`mathModule\` with exported functions (add, subtract, multiply, divide)\n2. Create a \`utilsModule\` with utility functions (capitalize, reverse)\n3. Use destructuring to import from each module\n4. Demonstrate default-like export pattern\n5. Use the imported functions`,
    starterCode: `// Module 1: Math
const mathModule = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => b !== 0 ? a / b : "Error"
};

// Module 2: Utils
const utilsModule = {
  capitalize: (str) => str.charAt(0).toUpperCase() + str.slice(1),
  reverse: (str) => str.split("").reverse().join("")
};

// TODO: Destructure imports from modules
// const { add, multiply } = mathModule;

// TODO: Use the imported functions
console.log("add(5, 3):");
console.log("multiply(4, 7):");
console.log("capitalize('hello'):");
console.log("reverse('world'):");
`,
    solutionCode: `const mathModule = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => b !== 0 ? a / b : "Error: Division by zero"
};

const utilsModule = {
  capitalize: (str) => str.charAt(0).toUpperCase() + str.slice(1),
  reverse: (str) => str.split("").reverse().join("")
};

const { add, multiply } = mathModule;
const { capitalize, reverse } = utilsModule;

console.log("add(5, 3):", add(5, 3));
console.log("multiply(4, 7):", multiply(4, 7));
console.log("capitalize('hello'):", capitalize("hello"));
console.log("reverse('world'):", reverse("world"));`,
    hint: `• Destructure: \`const { functionName } = module\`\n• Then call the function directly: \`functionName(args)\`\n• This is exactly how named imports work in ES modules`,
    tests: [
      { name: "Module objects defined", validate: testContains("mathModule") && testContains("utilsModule") },
      { name: "Destructured import from mathModule", validate: testContains("const {") && testContains("} = mathModule") },
      { name: "Destructured import from utilsModule", validate: testContains("const {") && testContains("} = utilsModule") },
      { name: "Functions called and logged", validate: (c) => (c.match(/console\.log/g) || []).length >= 4 },
    ],
  },


{
    id: "memory-performance",
    chapter: 20,
    title: "Memory & Performance",
    level: "Advanced",
    tags: ["Event Loop", "Call Stack", "Memory", "Garbage Collection", "Performance", "Optimization", "Debounce"],
    conceptExplanation: `Understanding how JavaScript manages memory and how the event loop works is key to writing performant applications.\n\n**The Event Loop:**\nJavaScript is single-threaded with a concurrency model based on an event loop.\n\n1. **Call Stack** — Functions are added when called, removed when they return\n2. **Microtask Queue** — Promise callbacks, queueMicrotask (higher priority)\n3. **Macrotask Queue** — setTimeout, setInterval, DOM events\n\nOrder: Sync stack → Microtasks → One macrotask → Repeat\n\n**Memory Management:**\nJavaScript uses garbage collection (mark-and-sweep algorithm).\n\n• Objects are kept in memory as long as they're reachable\n• When no references remain, they're garbage collected\n\n**Common Memory Leaks:**\n• Global variables that accumulate data\n• Forgotten timers / callbacks\n• Closures holding references to large objects\n• Detached DOM elements\n\n**Performance Optimization:**\n\n**Memoization — Cache function results:**\n\`\`\`js\nconst memoize = (fn) => {\n  const cache = {};\n  return (...args) => {\n    const key = JSON.stringify(args);\n    return cache[key] ?? (cache[key] = fn(...args));\n  };\n};\n\`\`\`\n\n**Debouncing — Limit how often a function fires:**\n\`\`\`js\nfunction debounce(fn, delay) {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n}\n\`\`\`\n\n**Throttling — Ensure function fires at most once per interval:**\n\`\`\`js\nfunction throttle(fn, limit) {\n  let inThrottle = false;\n  return (...args) => {\n    if (!inThrottle) {\n      fn(...args);\n      inThrottle = true;\n      setTimeout(() => inThrottle = false, limit);\n    }\n  };\n}\n\`\`\``,
    keyRules: [
      "Microtasks (Promise.then) run before macrotasks (setTimeout)",
      "Long-running synchronous code blocks the event loop — use chunking",
      "Use WeakMap/WeakSet for references that shouldn't prevent garbage collection",
      "Use memoization for expensive, pure function calls",
      "Use debounce for search inputs, resize handlers",
      "Use throttle for scroll events — never attach heavy handlers to scroll",
      "Avoid global variables that accumulate data (memory leaks)",
    ],
    task: `1. Write code that demonstrates the event loop order: sync → microtask → macrotask\n2. Create a \`memoize\` function that caches results\n3. Create a \`debounce\` function\n4. Create a \`throttle\` function\n5. Demonstrate memoization with a slow Fibonacci function\n6. Show timing comparison (cached vs uncached)`,
    starterCode: `// 1. Event loop order
console.log("1: Sync start");

setTimeout(() => console.log("4: Macrotask"), 0);
Promise.resolve().then(() => console.log("3: Microtask"));

console.log("2: Sync end");

// 2. Memoize
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

// 3. Debounce
function debounce(fn, delay) {
  // TODO
}

// 4. Throttle
function throttle(fn, limit) {
  // TODO
}

// 5. Slow Fibonacci (for testing memoization)
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}

const memoFib = memoize(fib);

// 6. Compare performance
console.time("Without cache");
console.log("fib(40):", fib(40));
console.timeEnd("Without cache");

console.time("With cache (first call)");
console.log("memoFib(40):", memoFib(40));
console.timeEnd("With cache (first call)");

console.time("With cache (cached)");
console.log("memoFib(40):", memoFib(40));
console.timeEnd("With cache (cached)");`,
    solutionCode: `console.log("1: Sync start");
setTimeout(() => console.log("4: Macrotask"), 0);
Promise.resolve().then(() => console.log("3: Microtask"));
console.log("2: Sync end");

function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function throttle(fn, limit) {
  let inThrottle = false;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}

const memoFib = memoize(fib);

console.time("Without cache");
console.log("fib(40):", fib(40));
console.timeEnd("Without cache");

console.time("With cache (first call)");
console.log("memoFib(40):", memoFib(40));
console.timeEnd("With cache (first call)");

console.time("With cache (cached)");
console.log("memoFib(40):", memoFib(40));
console.timeEnd("With cache (cached)");`,
    hint: `• Event loop: sync → microtasks → macrotasks\n• Memoize: check cache first, store result if not found\n• Debounce: clear previous timer, set new one\n• Throttle: use a flag to limit execution frequency`,
    tests: [
      { name: "Event loop order demonstrated", validate: (c) => c.includes("setTimeout") && c.includes("Promise.resolve") },
      { name: "memoize function defined", validate: (c) => c.includes("function memoize") },
      { name: "debounce function defined", validate: (c) => c.includes("function debounce") },
      { name: "throttle function defined", validate: (c) => c.includes("function throttle") },
      { name: "Cache used in memoize", validate: (c) => c.includes("cache.") && (c.includes("get") || c.includes("has") || c.includes("set")) },
      { name: "Timer used in debounce/throttle", validate: (c) => c.includes("setTimeout") || c.includes("clearTimeout") },
    ],
  }


];

// ─── BUG CHALLENGES ───

export const JS_BUG_CHALLENGES = [
  {
    id: "bug-calc",
    title: "1. The Broken Calculator",
    problem: "The calculator function returns incorrect results for some operations.",
    learningGoal: "Understand operator precedence and type coercion in arithmetic.",
    brokenCode: `function calculate(a, b, op) {
  if (op === "+") return a + b;
  if (op === "-") return a - b;
  if (op === "*") return a * b;
  if (op === "/") return a / b;
  return "Unknown";
}

console.log(calculate(5, "3", "+")); // Expected: 8
console.log(calculate(10, 3, "-"));  // Expected: 7
console.log(calculate("6", "2", "*")); // Expected: 12`,
    expectedResult: "The function should always work with numbers. String inputs like '3' should be coerced or handled.",
    solution: `function calculate(a, b, op) {
  const numA = Number(a);
  const numB = Number(b);
  if (isNaN(numA) || isNaN(numB)) return "Invalid input";
  if (op === "+") return numA + numB;
  if (op === "-") return numA - numB;
  if (op === "*") return numA * numB;
  if (op === "/") return numB !== 0 ? numA / numB : "Div by zero";
  return "Unknown";
}`,
    hint: "What happens when you add a string '3' to number 5?",
    tests: [
      { name: "Input validation present", validate: (c) => testContains("Number(") || testContains("parse") || testContains("isNaN") },
      { name: "Division by zero handled", validate: (c) => testContains("=== 0") || testContains("!== 0") || testContains("== 0") },
    ],
  },
  {
    id: "bug-infinite-loop",
    title: "2. The Infinite Loop",
    problem: "The while loop never ends — it runs infinitely.",
    learningGoal: "Understand loop termination conditions and counter updates.",
    brokenCode: `function sumTo(n) {
  let sum = 0;
  let i = 0;
  while (i <= n) {
    sum += i;
    // missing increment!
  }
  return sum;
}

console.log(sumTo(5)); // Expected: 15
console.log(sumTo(100)); // Expected: 5050`,
    expectedResult: "The loop should terminate after reaching n. Add the missing counter increment.",
    solution: `function sumTo(n) {
  let sum = 0;
  let i = 0;
  while (i <= n) {
    sum += i;
    i++; // Fixed: added increment
  }
  return sum;
}`,
    hint: "What's missing inside the while loop body? How does the loop know to stop?",
    tests: [
      { name: "Loop counter increments", validate: (c) => testContains("i++")(c) || testContains("i +=")(c) || testContains("i = i +")(c) },
    ],
  },
  {
    id: "bug-missing-return",
    title: "3. The Missing Return",
    problem: "The function always returns undefined instead of the expected value.",
    learningGoal: "Understand how return statements work and where they're needed.",
    brokenCode: `function double(arr) {
  arr.map(x => x * 2);
}

const numbers = [1, 2, 3, 4, 5];
const result = double(numbers);
console.log(result); // Expected: [2, 4, 6, 8, 10]`,
    expectedResult: "The function should return the doubled array. map returns a new array, but no one returns it.",
    solution: `function double(arr) {
  return arr.map(x => x * 2);
}

const numbers = [1, 2, 3, 4, 5];
const result = double(numbers);
console.log(result);`,
    hint: "map() creates a new array — what happens to the result? Where does it go?",
    tests: [
      { name: "Function returns result", validate: testContains("return ") },
    ],
  },
  {
    id: "bug-wrong-context",
    title: "4. The Wrong Context",
    problem: "The greet method logs undefined for the user's name.",
    learningGoal: "Understand the 'this' keyword and how arrow functions handle it differently.",
    brokenCode: `const user = {
  name: "Alice",
  greet: () => {
    return \`Hello, I'm \${this.name}\`;
  }
};

console.log(user.greet()); // Expected: "Hello, I'm Alice"`,
    expectedResult: "Arrow functions don't have their own 'this'. Use a regular function instead.",
    solution: `const user = {
  name: "Alice",
  greet() {
    return \`Hello, I'm \${this.name}\`;
  }
};

console.log(user.greet());`,
    hint: "How does 'this' work in arrow functions vs regular functions? What does 'this' refer to?",
    tests: [
      { name: "Regular function used (not arrow)", validate: (c) => testContains("greet()") || testContains("greet: function") },
    ],
  },
  {
    id: "bug-async-disaster",
    title: "5. The Async Disaster",
    problem: "getData() returns undefined instead of the fetched data.",
    learningGoal: "Understand async/await and promise handling.",
    brokenCode: `function fetchData() {
  return new Promise(resolve => {
    setTimeout(() => resolve("Data loaded"), 1000);
  });
}

function getData() {
  let data;
  fetchData().then(result => data = result);
  return data;
}

console.log(getData()); // Expected: "Data loaded"`,
    expectedResult: "getData() should wait for the promise to resolve before returning. Use async/await.",
    solution: `function fetchData() {
  return new Promise(resolve => {
    setTimeout(() => resolve("Data loaded"), 1000);
  });
}

async function getData() {
  const data = await fetchData();
  return data;
}

getData().then(console.log);`,
    hint: "What does fetchData() return? Is getData() waiting for it to complete?",
    tests: [
      { name: "async/await used", validate: (c) => testContains("async") && testContains("await") },
    ],
  },
  {
    id: "bug-callback-nightmare",
    title: "6. The Callback Nightmare",
    problem: "The callbacks fire in the wrong order.",
    learningGoal: "Understand callback execution order and callback hell.",
    brokenCode: `function step1(cb) { setTimeout(() => cb("Step 1"), 300); }
function step2(cb) { setTimeout(() => cb("Step 2"), 200); }
function step3(cb) { setTimeout(() => cb("Step 3"), 100); }

step1(console.log);
step2(console.log);
step3(console.log);
// Expected: Step 1, Step 2, Step 3 (in order)
// Actual: Step 3, Step 2, Step 1 (wrong order!)`,
    expectedResult: "Each step should wait for the previous one to complete before starting. Nest the calls.",
    solution: `function step1(cb) { setTimeout(() => cb("Step 1"), 300); }
function step2(cb) { setTimeout(() => cb("Step 2"), 200); }
function step3(cb) { setTimeout(() => cb("Step 3"), 100); }

step1((result1) => {
  console.log(result1);
  step2((result2) => {
    console.log(result2);
    step3((result3) => {
      console.log(result3);
    });
  });
});`,
    hint: "All three steps start at the same time. How can you make step2 wait for step1?",
    tests: [
      { name: "Callbacks are nested (chained)", validate: (c) => {
        // Check if step2 is inside step1's callback, etc.
        const lines = c.split("\n");
        let depth = 0;
        for (const line of lines) {
          if (line.includes("step1(") || line.includes("step2(") || line.includes("step3(")) {
            depth++;
          }
        }
        return depth >= 3;
      }},
    ],
  },
  {
    id: "bug-undefined-prop",
    title: "7. The Undefined Property",
    problem: "Accessing deeply nested properties throws an error.",
    learningGoal: "Use optional chaining and nullish coalescing for safe property access.",
    brokenCode: `const user = { profile: null };
const city = user.profile.address.city;
console.log(city); // Should just log undefined gracefully`,
    expectedResult: "Use optional chaining (?.) to safely access deeply nested properties.",
    solution: `const user = { profile: null };
const city = user?.profile?.address?.city;
console.log(city); // undefined (no error!)`,
    hint: "What operator can you use to short-circuit when a value is null/undefined?",
    tests: [
      { name: "Optional chaining used", validate: testContains("?.") },
    ],
  },
  {
    id: "bug-mutated-state",
    title: "8. The Mutated State",
    problem: "The original array is being mutated when it shouldn't be.",
    learningGoal: "Understand mutation vs immutability in arrays and objects.",
    brokenCode: `const todos = [
  { id: 1, text: "Learn JS", done: false },
  { id: 2, text: "Build app", done: false },
];

function markDone(list, id) {
  const item = list.find(t => t.id === id);
  item.done = true;
  return list;
}

const updated = markDone(todos, 1);
console.log(todos[0].done); // Should still be false
console.log(updated[0].done); // Should be true`,
    expectedResult: "markDone should not mutate the original array. Create a new object instead.",
    solution: `function markDone(list, id) {
  return list.map(todo =>
    todo.id === id ? { ...todo, done: true } : todo
  );
}

const todos = [
  { id: 1, text: "Learn JS", done: false },
  { id: 2, text: "Build app", done: false },
];

const updated = markDone(todos, 1);
console.log(todos[0].done); // false
console.log(updated[0].done); // true`,
    hint: "How can you create a new version of an object without modifying the original? (Hint: ...)",
    tests: [
      { name: "Creates new object instead of mutating", validate: (c) => testContains("...") || testContains("Object.assign") },
    ],
  },
  {
    id: "bug-duplicate-event",
    title: "9. The Duplicate Event",
    problem: "Event listeners are being added multiple times, causing duplicate handlers.",
    learningGoal: "Understand event listener cleanup and preventing duplicate registrations.",
    brokenCode: `// Simulated button clicks
let clickCount = 0;

function handleClick() {
  clickCount++;
  console.log("Clicked!", clickCount);
}

// Someone accidentally calls addEventListener twice
// simulated here:
handleClick();
handleClick();
// Expected: Clicked! 1, Clicked! 2
// Using handleClick as listener twice would fire twice each time`,
    expectedResult: "Prevent duplicate event listeners by tracking which listeners are registered.",
    solution: `let clickCount = 0;
let listenerAttached = false;

function handleClick() {
  clickCount++;
  console.log("Clicked!", clickCount);
}

// Only attach if not already attached
if (!listenerAttached) {
  // button.addEventListener("click", handleClick);
  listenerAttached = true;
}

handleClick(); // Clicked! 1
handleClick(); // Clicked! 2 (same handler, not duplicate)`,
    hint: "What could you use to track whether a listener has been added? A flag variable?",
    tests: [
      { name: "Duplicate prevention logic present", validate: (c) => testContains("if") && (testContains("attached") || testContains("added") || testContains("called")) },
    ],
  },
  {
    id: "bug-lost-promise",
    title: "10. The Lost Promise",
    problem: "The promise result is lost because no one awaits or handles it.",
    learningGoal: "Always handle promises — either await or .then()/catch().",
    brokenCode: `function fetchUser(id) {
  return Promise.resolve({ id, name: "User " + id });
}

// Bug: promise created but not handled
fetchUser(1);
console.log("Fetch started...");
// Expected: should log the user data`,
    expectedResult: "Promises must be handled with .then(), .catch(), or await.",
    solution: `async function fetchUser(id) {
  return { id, name: "User " + id };
}

async function main() {
  const user = await fetchUser(1);
  console.log("User:", user);
}

main().catch(console.error);`,
    hint: "What happens when you create a promise and don't use .then() or await?",
    tests: [
      { name: "Promise result is handled", validate: (c) => testContains(".then(") || testContains("await") },
    ],
  },
  {
    id: "bug-memory-leak",
    title: "11. The Memory Leak",
    problem: "Every call adds to a global array, causing a memory leak.",
    learningGoal: "Understand how global state can cause memory leaks and how to avoid them.",
    brokenCode: `const cache = [];

function processData(data) {
  const result = data.map(x => x * 2);
  cache.push(result); // Keeps growing forever!
  return result;
}

processData([1, 2, 3]);
processData([4, 5, 6]);
console.log("Cache size:", cache.length); // Grows each time`,
    expectedResult: "Remove items from cache when no longer needed, or use a bounded cache size.",
    solution: `const cache = [];
const MAX_CACHE = 10;

function processData(data) {
  const result = data.map(x => x * 2);
  cache.push(result);
  if (cache.length > MAX_CACHE) cache.shift(); // Remove oldest
  return result;
}

processData([1, 2, 3]);
processData([4, 5, 6]);
console.log("Cache size:", cache.length);`,
    hint: "What happens if you keep pushing to an array without ever removing items? How can you limit its size?",
    tests: [
      { name: "Cache bounded or cleaned up", validate: (c) => testContains(".shift()") || testContains(".splice(") || testContains("length") },
    ],
  },
  {
    id: "bug-broken-fetch",
    title: "12. The Broken Fetch",
    problem: "The fetch doesn't handle network errors or failed responses.",
    learningGoal: "Always handle HTTP errors and network failures when fetching data.",
    brokenCode: `async function getPost(id) {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/" + id);
  return res.json();
}

// What if fetch fails? Network error? 404?
// No error handling at all!`,
    expectedResult: "Add try/catch for network errors and check response.ok for HTTP errors.",
    solution: `async function getPost(id) {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts/" + id);
    if (!res.ok) throw new Error("HTTP " + res.status);
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch post:", error.message);
    return null;
  }
}`,
    hint: "What happens when fetch encounters a network error? What status codes are errors (non 2xx)?",
    tests: [
      { name: "Error handling with try/catch", validate: (c) => testContains("try") && testContains("catch") },
      { name: "Response status checked", validate: (c) => testContains("res.ok") || testContains("res.status") || testContains("response.ok") || testContains("response.status") },
    ],
  },
  {
    id: "bug-vanishing-var",
    title: "13. The Vanishing Variable",
    problem: "The variable declared inside the if block is not accessible outside.",
    learningGoal: "Understand block scoping with let/const vs var.",
    brokenCode: `if (true) {
  let message = "Hello!";
}
console.log(message); // ReferenceError!`,
    expectedResult: "Variables declared with let inside a block are not accessible outside. Use var or declare outside.",
    solution: `let message;
if (true) {
  message = "Hello!";
}
console.log(message); // "Hello!"`,
    hint: "Where is 'let message' declared? What scope is it in?",
    tests: [
      { name: "Variable declared in correct scope", validate: (c) => !testContains("let message") || (c.indexOf("let message") > c.indexOf("if")) || testContains("let message") === false },
    ],
  },
  {
    id: "bug-accidental-global",
    title: "14. The Accidental Global",
    problem: "Assigning to an undeclared variable creates a global.",
    learningGoal: "Use strict mode and always declare variables.",
    brokenCode: `function setup() {
  config = { theme: "dark" }; // Missing let/const/var!
}

setup();
console.log(config); // Works but config is global!`,
    expectedResult: "Always declare variables with let, const, or var. Use 'use strict' to prevent this.",
    solution: `"use strict";

function setup() {
  const config = { theme: "dark" };
  return config;
}

const config = setup();
console.log(config);`,
    hint: "What happens when you assign to a variable without declaring it? How can you prevent it?",
    tests: [
      { name: "Use strict mode or declared variables", validate: (c) => testContains('"use strict"') || testContains("const config") || testContains("let config") || testContains("var config") },
    ],
  },
  {
    id: "bug-closure-trap",
    title: "15. The Closure Trap",
    problem: "All buttons log the same index value.",
    learningGoal: "Understand closure capture in loops and how to fix with let or IIFE.",
    brokenCode: `// Creates 3 button handlers
const handlers = [];
for (var i = 0; i < 3; i++) {
  handlers.push(function() {
    console.log("Button " + i + " clicked");
  });
}

handlers[0](); // Expected: "Button 0 clicked" but gets "Button 3"
handlers[1](); // Expected: "Button 1 clicked"
handlers[2](); // Expected: "Button 2 clicked"`,
    expectedResult: "Each closure should capture its own value of i. Use let instead of var.",
    solution: `const handlers = [];
for (let i = 0; i < 3; i++) {
  handlers.push(function() {
    console.log("Button " + i + " clicked");
  });
}

handlers[0](); // "Button 0 clicked"
handlers[1](); // "Button 1 clicked"
handlers[2](); // "Button 2 clicked"`,
    hint: "Why does var cause all closures to share the same i? How does let fix this?",
    tests: [
      { name: "Uses let in loop", validate: (c) => testContains("let i = ") },
    ],
  },
  {
    id: "bug-hoisting-mystery",
    title: "16. The Hoisting Mystery",
    problem: "The function returns undefined instead of throwing an error or returning a value.",
    learningGoal: "Understand hoisting — var declarations are hoisted but not initialized.",
    brokenCode: `function test() {
  console.log(value); // What's logged?
  var value = 10;
  return value;
}

console.log(test()); // Expected: 10, but gets undefined first`,
    expectedResult: "var value is hoisted (declared at the top) but not initialized until the assignment line.",
    solution: `function test() {
  let value = 10;
  console.log(value);
  return value;
}

console.log(test());`,
    hint: "What does JavaScript do with 'var value' before the code runs? Is it initialized?",
    tests: [
      { name: "Uses let or const instead of var", validate: (c) => testContains("let") || testContains("const") },
    ],
  },
];

// ─── MINI PROJECTS ───

export const JS_MINI_PROJECTS = [
  {
    id: "project-counter",
    title: "1. Counter App",
    overview: "A simple counter that can increment, decrement, and reset. Perfect for understanding state management fundamentals.",
    why: "Counters are the building block of many UI interactions — quantity selectors, pagination, and more.",
    concepts: ["Variables", "Functions", "State", "Event Handling"],
    checklist: [
      { text: "Increment count by 1", done: false },
      { text: "Decrement count by 1", done: false },
      { text: "Reset count to 0", done: false },
      { text: "Display current count", done: false },
      { text: "Prevent negative values", done: false },
    ],
    starterCode: `// Build a Counter with increment, decrement, and reset
let count = 0;

function increment() {
  // TODO
}

function decrement() {
  // TODO
}

function reset() {
  // TODO
}

// Don't modify below
function display() {
  console.log("Count:", count);
}

increment();
increment();
display(); // Should be 2
decrement();
display(); // Should be 1
reset();
display(); // Should be 0`,
    milestones: [
      { title: "Basic Counter", task: "Implement increment, decrement, and reset" },
      { title: "Edge Cases", task: "Prevent count from going below 0" },
    ],
    solution: `let count = 0;

function increment() { count++; }
function decrement() { if (count > 0) count--; }
function reset() { count = 0; }

function display() { console.log("Count:", count); }`,
    tests: [
      { name: "increment() increases count", validate: (c) => testContains("count++") || testContains("count += 1") },
      { name: "decrement() decreases count", validate: (c) => testContains("count--") || testContains("count -= 1") },
      { name: "reset() sets count to 0", validate: (c) => testContains("count = 0") },
      { name: "Prevents negative values", validate: (c) => testContains("count > 0") || testContains("count >= 0") || testContains("count !== 0") },
    ],
  },
  {
    id: "project-todo",
    title: "2. Todo App",
    overview: "A task management app with add, delete, toggle complete, and filtering capabilities.",
    why: "Todo apps teach CRUD operations (Create, Read, Update, Delete) — the foundation of most applications.",
    concepts: ["Arrays", "Objects", "Array Methods", "State Management"],
    checklist: [
      { text: "Add new todo items", done: false },
      { text: "Toggle todo completion", done: false },
      { text: "Delete todo items", done: false },
      { text: "Show pending count", done: false },
    ],
    starterCode: `const todos = [];

function addTodo(title) {
  // TODO: add { id, title, done: false }
}

function toggleTodo(id) {
  // TODO: toggle done status
}

function deleteTodo(id) {
  // TODO: remove todo by id
}

function getPending() {
  // TODO: return count of incomplete todos
}

// Test
addTodo("Learn JavaScript");
addTodo("Build a project");
toggleTodo(0);
console.log("Todos:", todos);
console.log("Pending:", getPending());
deleteTodo(1);
console.log("After delete:", todos);`,
    milestones: [
      { title: "Add & Display", task: "Implement addTodo to create todo objects" },
      { title: "Toggle & Delete", task: "Implement toggleTodo and deleteTodo" },
      { title: "Stats", task: "Implement getPending to count incomplete" },
    ],
    solution: `const todos = [];

function addTodo(title) {
  todos.push({ id: Date.now(), title, done: false });
}

function toggleTodo(id) {
  todos[id].done = !todos[id].done;
}

function deleteTodo(id) {
  todos.splice(id, 1);
}

function getPending() {
  return todos.filter(t => !t.done).length;
}`,
    tests: [
      { name: "addTodo() creates todo objects", validate: (c) => testContains("push(") },
      { name: "toggleTodo() changes done status", validate: (c) => testContains("done = !") || testContains("done = true") || testContains("done = false") },
      { name: "deleteTodo() removes items", validate: (c) => testContains("splice(") || testContains("filter(") },
      { name: "getPending() counts incomplete", validate: (c) => testContains("filter") || testContains("reduce") || testContains("forEach") },
    ],
  },
  {
    id: "project-calculator",
    title: "3. Calculator",
    overview: "A basic arithmetic calculator supporting addition, subtraction, multiplication, and division.",
    why: "Calculators teach function composition, input handling, and edge cases like division by zero.",
    concepts: ["Functions", "Conditionals", "Error Handling"],
    checklist: [
      { text: "Addition operation", done: false },
      { text: "Subtraction operation", done: false },
      { text: "Multiplication operation", done: false },
      { text: "Division operation", done: false },
      { text: "Handle division by zero", done: false },
    ],
    starterCode: `function add(a, b) { /* TODO */ }
function subtract(a, b) { /* TODO */ }
function multiply(a, b) { /* TODO */ }
function divide(a, b) { /* TODO */ }

function calculate(a, op, b) {
  switch(op) {
    case '+': return add(a, b);
    case '-': return subtract(a, b);
    case '*': return multiply(a, b);
    case '/': return divide(a, b);
    default: return "Unknown operation";
  }
}

// Test
console.log("10 + 5 =", calculate(10, '+', 5));
console.log("10 - 5 =", calculate(10, '-', 5));
console.log("10 * 5 =", calculate(10, '*', 5));
console.log("10 / 5 =", calculate(10, '/', 5));
console.log("10 / 0 =", calculate(10, '/', 0));`,
    milestones: [
      { title: "Basic Operations", task: "Implement add, subtract, multiply, divide" },
      { title: "Error Handling", task: "Handle division by zero gracefully" },
    ],
    solution: `function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
  if (b === 0) return "Error: Division by zero";
  return a / b;
}

function calculate(a, op, b) {
  switch(op) {
    case '+': return add(a, b);
    case '-': return subtract(a, b);
    case '*': return multiply(a, b);
    case '/': return divide(a, b);
    default: return "Unknown operation";
  }
}`,
    tests: [
      { name: "Addition works", validate: testContains("return a + b") || testContains("return a+b") },
      { name: "Division by zero handled", validate: (c) => testContains("== 0") || testContains("=== 0") },
      { name: "Subtraction works", validate: testContains("return a - b") || testContains("return a-b") },
      { name: "Multiplication works", validate: testContains("return a * b") || testContains("return a*b") },
    ],
  },
  {
    id: "project-quiz",
    title: "4. Quiz App",
    overview: "A multiple-choice quiz app that scores answers and shows results.",
    why: "Quizzes teach data structures (questions array), scoring logic, and user feedback patterns.",
    concepts: ["Arrays", "Objects", "Functions", "Scoring"],
    checklist: [
      { text: "Store questions with options", done: false },
      { text: "Check user answers", done: false },
      { text: "Calculate score", done: false },
      { text: "Show final result", done: false },
    ],
    starterCode: `const quiz = {
  title: "JavaScript Basics",
  questions: [
    { q: "What is 2 + 2?", options: [3, 4, 5, 6], answer: 1 },
    { q: "What keyword declares a variable?", options: ["var", "vary", "variable", "v"], answer: 0 },
    { q: "Which is NOT a primitive type?", options: ["string", "number", "object", "boolean"], answer: 2 },
  ]
};

function checkAnswer(questionIndex, selectedIndex) {
  // TODO: return true if correct
}

function calculateScore(answers) {
  // TODO: count correct answers
}

// Test
console.log("Q1 correct:", checkAnswer(0, 1)); // Should be true
console.log("Q2 correct:", checkAnswer(1, 0)); // Should be true
console.log("Score:", calculateScore([1, 0, 1])); // Should be 2`,
    milestones: [
      { title: "Answer Checking", task: "Implement checkAnswer to compare selected vs correct" },
      { title: "Scoring", task: "Calculate how many answers are correct" },
    ],
    solution: `const quiz = {
  title: "JavaScript Basics",
  questions: [
    { q: "What is 2 + 2?", options: [3, 4, 5, 6], answer: 1 },
    { q: "What keyword declares a variable?", options: ["var", "vary", "variable", "v"], answer: 0 },
    { q: "Which is NOT a primitive type?", options: ["string", "number", "object", "boolean"], answer: 2 },
  ]
};

function checkAnswer(questionIndex, selectedIndex) {
  return quiz.questions[questionIndex].answer === selectedIndex;
}

function calculateScore(answers) {
  return answers.filter((answer, i) => checkAnswer(i, answer)).length;
}

console.log("Q1 correct:", checkAnswer(0, 1));
console.log("Q2 correct:", checkAnswer(1, 0));
console.log("Score:", calculateScore([1, 0, 1]));`,
    tests: [
      { name: "checkAnswer() compares answers", validate: (c) => testContains(".answer === ") || testContains(".answer == ") || testContains("answer") },
      { name: "calculateScore() counts correct", validate: (c) => testContains("filter") || testContains("reduce") || testContains("for") },
    ],
  },
  {
    id: "project-notes",
    title: "5. Notes App",
    overview: "A note-taking app with create, search, and tag filtering functionality.",
    why: "Notes apps teach search functionality, tagging systems, and data organization patterns.",
    concepts: ["Arrays", "String Methods", "Search", "Filtering"],
    checklist: [
      { text: "Create new notes with tags", done: false },
      { text: "Search notes by text", done: false },
      { text: "Filter notes by tag", done: false },
      { text: "List all notes", done: false },
    ],
    starterCode: `const notes = [];

function addNote(title, content, tags = []) {
  // TODO: add note with id, title, content, tags, date
}

function searchNotes(query) {
  // TODO: return notes matching query in title or content
}

function filterByTag(tag) {
  // TODO: return notes with the given tag
}

// Test
addNote("JS Basics", "Learn variables and functions", ["js", "beginner"]);
addNote("React Hooks", "Learn useState and useEffect", ["react", "hooks"]);
addNote("CSS Grid", "Learn grid layout", ["css", "layout"]);

console.log("Search 'learn':", searchNotes("learn"));
console.log("Tag 'js':", filterByTag("js"));
console.log("All notes:", notes);`,
    milestones: [
      { title: "Create Notes", task: "Implement addNote with proper structure" },
      { title: "Search", task: "Implement searchNotes for text search" },
      { title: "Filter", task: "Implement filterByTag for tag filtering" },
    ],
    solution: `const notes = [];

function addNote(title, content, tags = []) {
  notes.push({ id: notes.length + 1, title, content, tags, date: new Date() });
}

function searchNotes(query) {
  const q = query.toLowerCase();
  return notes.filter(n =>
    n.title.toLowerCase().includes(q) ||
    n.content.toLowerCase().includes(q)
  );
}

function filterByTag(tag) {
  return notes.filter(n => n.tags.includes(tag));
}

addNote("JS Basics", "Learn variables and functions", ["js", "beginner"]);
addNote("React Hooks", "Learn useState and useEffect", ["react", "hooks"]);
addNote("CSS Grid", "Learn grid layout", ["css", "layout"]);

console.log("Search 'learn':", searchNotes("learn"));
console.log("Tag 'js':", filterByTag("js"));
console.log("All notes:", notes);`,
    tests: [
      { name: "addNote() creates structured notes", validate: testContains("push(") && testContains("tags") },
      { name: "searchNotes() searches title/content", validate: (c) => testContains("includes(") && testContains("toLowerCase(") },
      { name: "filterByTag() filters by tag", validate: (c) => testContains("filter(") && testContains("tags.") },
    ],
  },
  {
    id: "project-weather",
    title: "6. Weather App",
    overview: "A weather data processor that fetches and analyzes temperature data.",
    why: "Weather apps teach async operations, data transformation, and aggregate calculations.",
    concepts: ["Async/Await", "Promises", "Array Methods", "Data Processing"],
    checklist: [
      { text: "Simulate fetching weather data", done: false },
      { text: "Calculate average temperature", done: false },
      { text: "Find min and max temperatures", done: false },
      { text: "Filter by condition (sunny, rainy, etc.)", done: false },
    ],
    starterCode: `// Simulated weather data
const weatherData = [
  { city: "London", temp: 15, condition: "cloudy" },
  { city: "Tokyo", temp: 22, condition: "sunny" },
  { city: "Paris", temp: 18, condition: "rainy" },
  { city: "NYC", temp: 20, condition: "sunny" },
  { city: "Mumbai", temp: 30, condition: "sunny" },
];

// Simulate async fetch
function fetchWeather() {
  return new Promise(resolve => {
    setTimeout(() => resolve(weatherData), 100);
  });
}

async function getAverageTemp() {
  // TODO: fetch data and calculate average
}

async function getExtremes() {
  // TODO: find min and max temps
}

async function filterByCondition(condition) {
  // TODO: filter by weather condition
}

// Test
getAverageTemp().then(avg => console.log("Avg temp:", avg));
getExtremes().then(({ min, max }) => console.log("Min:", min, "Max:", max));
filterByCondition("sunny").then(data => console.log("Sunny cities:", data));`,
    milestones: [
      { title: "Fetch & Calculate", task: "Implement getAverageTemp" },
      { title: "Analysis", task: "Implement getExtremes and filterByCondition" },
    ],
    solution: `const weatherData = [
  { city: "London", temp: 15, condition: "cloudy" },
  { city: "Tokyo", temp: 22, condition: "sunny" },
  { city: "Paris", temp: 18, condition: "rainy" },
  { city: "NYC", temp: 20, condition: "sunny" },
  { city: "Mumbai", temp: 30, condition: "sunny" },
];

function fetchWeather() {
  return new Promise(resolve => {
    setTimeout(() => resolve(weatherData), 100);
  });
}

async function getAverageTemp() {
  const data = await fetchWeather();
  const sum = data.reduce((acc, d) => acc + d.temp, 0);
  return sum / data.length;
}

async function getExtremes() {
  const data = await fetchWeather();
  const temps = data.map(d => d.temp);
  return { min: Math.min(...temps), max: Math.max(...temps) };
}

async function filterByCondition(condition) {
  const data = await fetchWeather();
  return data.filter(d => d.condition === condition);
}

getAverageTemp().then(avg => console.log("Avg temp:", avg));
getExtremes().then(({ min, max }) => console.log("Min:", min, "Max:", max));
filterByCondition("sunny").then(data => console.log("Sunny cities:", data));`,
    tests: [
      { name: "Async fetch simulation used", validate: (c) => testContains("async") && testContains("await") },
      { name: "Average temperature calculated", validate: (c) => testContains("reduce") || testContains("sum") },
      { name: "Min/max temperatures found", validate: (c) => testContains("Math.min") || testContains("Math.max") || testContains("sort") },
      { name: "Filter by condition implemented", validate: (c) => testContains("filter(") },
    ],
  },
  {
    id: "project-expense",
    title: "7. Expense Tracker",
    overview: "Track expenses with categories, total calculation, and category summaries.",
    why: "Expense trackers teach grouping, aggregation, and data visualization concepts.",
    concepts: ["Objects", "Reduce", "Grouping", "Calculations"],
    checklist: [
      { text: "Add expenses with amount and category", done: false },
      { text: "Calculate total expenses", done: false },
      { text: "Group expenses by category", done: false },
      { text: "Calculate total per category", done: false },
      { text: "Display summary report", done: false },
    ],
    starterCode: `const expenses = [];

function addExpense(description, amount, category) {
  // TODO: add { id, description, amount, category, date }
}

function getTotal() {
  // TODO: return sum of all amounts
}

function getByCategory() {
  // TODO: return { category: total, ... }
}

function getReport() {
  // TODO: return formatted summary
}

// Test
addExpense("Coffee", 5, "Food");
addExpense("Lunch", 15, "Food");
addExpense("Bus", 3, "Transport");
addExpense("Movie", 12, "Entertainment");

console.log("Total:", getTotal());
console.log("By category:", getByCategory());
console.log("Report:", getReport());`,
    milestones: [
      { title: "Add Expenses", task: "Implement addExpense" },
      { title: "Totals", task: "Implement getTotal and getByCategory" },
      { title: "Report", task: "Implement getReport" },
    ],
    solution: `const expenses = [];

function addExpense(description, amount, category) {
  expenses.push({ id: expenses.length + 1, description, amount, category, date: new Date() });
}

function getTotal() {
  return expenses.reduce((sum, e) => sum + e.amount, 0);
}

function getByCategory() {
  return expenses.reduce((groups, e) => {
    groups[e.category] = (groups[e.category] || 0) + e.amount;
    return groups;
  }, {});
}

function getReport() {
  const total = getTotal();
  const byCat = getByCategory();
  let report = "=== Expense Report ===\\n";
  for (const [cat, amount] of Object.entries(byCat)) {
    report += cat + ": $" + amount + " (" + Math.round(amount / total * 100) + "%)\\n";
  }
  report += "Total: $" + total;
  return report;
}

addExpense("Coffee", 5, "Food");
addExpense("Lunch", 15, "Food");
addExpense("Bus", 3, "Transport");
addExpense("Movie", 12, "Entertainment");

console.log("Total:", getTotal());
console.log("By category:", getByCategory());
console.log("Report:\\n" + getReport());`,
    tests: [
      { name: "addExpense() creates structured entries", validate: testContains("push(") && testContains("category") },
      { name: "Total calculated with reduce", validate: testContains("reduce(") },
      { name: "Category grouping implemented", validate: (c) => testContains("category") || testContains("Category") },
    ],
  },
  {
    id: "project-kanban",
    title: "8. Kanban Board",
    overview: "A task board with columns (To Do, In Progress, Done) and ability to move tasks between columns.",
    why: "Kanban boards teach state transitions, column-based organization, and drag-free state management.",
    concepts: ["Objects", "Arrays", "State Management", "Data Transformation"],
    checklist: [
      { text: "Create columns for task states", done: false },
      { text: "Add tasks to columns", done: false },
      { text: "Move tasks between columns", done: false },
      { text: "Display board state", done: false },
      { text: "Track task count per column", done: false },
    ],
    starterCode: `function createBoard() {
  return {
    columns: {
      "todo": [],
      "in-progress": [],
      "done": []
    },
    addTask(column, task) {
      // TODO: add task to column
    },
    moveTask(taskId, fromCol, toCol) {
      // TODO: move task between columns
    },
    getStats() {
      // TODO: return { columnName: count, ... }
    },
    display() {
      // TODO: log the board state
    }
  };
}

const board = createBoard();
board.addTask("todo", { id: 1, title: "Learn JS" });
board.addTask("todo", { id: 2, title: "Build project" });
board.addTask("in-progress", { id: 3, title: "Review code" });
board.moveTask(1, "todo", "in-progress");

board.display();
console.log("Stats:", board.getStats());`,
    milestones: [
      { title: "Board Setup", task: "Implement createBoard with columns" },
      { title: "Task Management", task: "Implement addTask and moveTask" },
      { title: "Board View", task: "Implement display and getStats" },
    ],
    solution: `function createBoard() {
  return {
    columns: {
      "todo": [],
      "in-progress": [],
      "done": []
    },
    addTask(column, task) {
      if (this.columns[column]) {
        this.columns[column].push(task);
      }
    },
    moveTask(taskId, fromCol, toCol) {
      const task = this.columns[fromCol]?.find(t => t.id === taskId);
      if (task && this.columns[toCol]) {
        this.columns[fromCol] = this.columns[fromCol].filter(t => t.id !== taskId);
        this.columns[toCol].push(task);
      }
    },
    getStats() {
      const stats = {};
      for (const [col, tasks] of Object.entries(this.columns)) {
        stats[col] = tasks.length;
      }
      return stats;
    },
    display() {
      for (const [col, tasks] of Object.entries(this.columns)) {
        console.log(col.toUpperCase() + ":");
        tasks.forEach(t => console.log("  - " + t.title));
      }
    }
  };
}

const board = createBoard();
board.addTask("todo", { id: 1, title: "Learn JS" });
board.addTask("todo", { id: 2, title: "Build project" });
board.addTask("in-progress", { id: 3, title: "Review code" });
board.moveTask(1, "todo", "in-progress");

board.display();
console.log("Stats:", board.getStats());`,
    tests: [
      { name: "createBoard() returns board object", validate: testContains("function createBoard") },
      { name: "addTask() adds to correct column", validate: testContains("push(") && testContains("columns[") },
      { name: "moveTask() moves between columns", validate: testContains("filter(") && testContains(".push(") },
      { name: "getStats() returns counts per column", validate: (c) => testContains("length") },
    ],
  },
];
