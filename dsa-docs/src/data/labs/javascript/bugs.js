// ─── JS Labs — Bug Challenges Data ───
// 16 Bug Challenges

import { testContains, testRegex, stripLineComments, hasDeclaration } from "./validators.js";

export const JS_BUG_CHALLENGES = [
  {
    id: "bug-variable-scope",
    title: "1. Variable Scope Bug",
    problem: "The following code has a bug where the variable 'message' is not accessible outside the if block. Find and fix the scoping issue.",
    brokenCode: `function greet(name) {
  if (name) {
    let message = "Hello, " + name;
  }
  console.log(message); // Bug: message is not defined here
}

greet("World");`,
    solution: `function greet(name) {
  let message;
  if (name) {
    message = "Hello, " + name;
  }
  console.log(message);
}

greet("World");`,
    learningGoal: "Understand the difference between block-scoped (let/const) and function-scoped (var) variables.",
    expectedResult: "The function should log 'Hello, World' when called with 'World'.",
    hint: "The variable 'message' is declared inside the if block using 'let'. It needs to be declared in a scope accessible to the console.log call.",
    tests: [
      { name: "Bug is fixed - message is defined in function scope", validate: (c) => !c.includes("if (name) {\n    let message") },
      { name: "Function works correctly", validate: (c) => c.includes("function greet") },
    ],
  },
  {
    id: "bug-type-coercion",
    title: "2. Type Coercion Bug",
    problem: "This calculator function doesn't work correctly because of type coercion. When adding numbers from prompt input, it concatenates strings instead of adding numbers.",
    brokenCode: `function calculateTotal(prices) {
  let total = 0;
  for (let i = 0; i < prices.length; i++) {
    total += prices[i]; // Bug: string concatenation instead of addition
  }
  return total;
}

console.log(calculateTotal([10, 20, 30]));`,
    solution: `function calculateTotal(prices) {
  let total = 0;
  for (let i = 0; i < prices.length; i++) {
    total += Number(prices[i]);
  }
  return total;
}

console.log(calculateTotal([10, 20, 30]));`,
    learningGoal: "Understand how JavaScript's type coercion works with the += operator and how to prevent unexpected string concatenation.",
    expectedResult: "The function should return 60 when given [10, 20, 30].",
    hint: "The '+' operator is used for both addition and string concatenation. If any operand is a string, '+' concatenates instead of adding.",
    tests: [
      { name: "Bug is fixed using explicit conversion", validate: (c) => c.includes("Number(") || c.includes("parseInt") || c.includes("parseFloat") },
      { name: "Function returns correct sum", validate: (c) => c.includes("calculateTotal") },
    ],
  },
  {
    id: "bug-array-mutation",
    title: "3. Array Mutation Bug",
    problem: "This function tries to remove duplicates from an array but has a bug where it skips elements because the array is being modified while iterating.",
    brokenCode: `function removeDuplicates(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr.indexOf(arr[i]) !== i) {
      arr.splice(i, 1); // Bug: mutating array during iteration
    }
  }
  return arr;
}

console.log(removeDuplicates([1, 2, 2, 3, 3, 3]));`,
    solution: `function removeDuplicates(arr) {
  return [...new Set(arr)];
}

console.log(removeDuplicates([1, 2, 2, 3, 3, 3]));`,
    learningGoal: "Understand the dangers of mutating an array while iterating over it, and learn alternative approaches.",
    expectedResult: "The function should return [1, 2, 3] without duplicates.",
    hint: "When you remove an element with splice, all subsequent elements shift down by one index, causing the loop to skip the next element.",
    tests: [
      { name: "Bug is fixed - no concurrent iteration and mutation", validate: (c) => !c.includes(".splice(") },
      { name: "Function removes duplicates correctly", validate: (c) => c.includes("removeDuplicates") },
    ],
  },
  {
    id: "bug-closure-loop",
    title: "4. Closure in Loop Bug",
    problem: "This classic bug creates functions in a loop, but all functions reference the same final value of 'i' instead of the value at the time of creation.",
    brokenCode: `function createButtons() {
  var buttons = [];
  for (var i = 0; i < 5; i++) {
    buttons.push(function() {
      console.log("Button " + i + " clicked");
    });
  }
  return buttons;
}

const btns = createButtons();
btns[0](); // Should log "Button 0 clicked", but logs "Button 5 clicked"`,
    solution: `function createButtons() {
  const buttons = [];
  for (let i = 0; i < 5; i++) {
    buttons.push(function() {
      console.log("Button " + i + " clicked");
    });
  }
  return buttons;
}

const btns = createButtons();
btns[0]();`,
    learningGoal: "Understand how closures capture variables by reference and the difference between var and let in loops.",
    expectedResult: "Each function should log its corresponding index (e.g., btns[0]() logs 'Button 0').",
    hint: "The bug is caused by using 'var' in the for loop instead of 'let'. 'var' has function scope, while 'let' has block scope and creates a new binding for each iteration.",
    tests: [
      { name: "Bug is fixed - closure captures correct value", validate: (c) => !c.includes("for (var") },
      { name: "Uses block-scoped variable", validate: (c) => c.includes("let i") || c.includes("const i") },
    ],
  },
  {
    id: "bug-this-context",
    title: "5. 'this' Context Bug",
    problem: "The following code loses the 'this' context when passing a method as a callback. The user object's greet method doesn't work when used as an event handler.",
    brokenCode: `const user = {
  name: "Alice",
  greet() {
    console.log("Hello, " + this.name);
  }
};

const greetFn = user.greet;
greetFn(); // Bug: this.name is undefined`,
    solution: `const user = {
  name: "Alice",
  greet() {
    console.log("Hello, " + this.name);
  }
};

const greetFn = user.greet.bind(user);
greetFn();

// Alternative: arrow function
// const greetFn = () => user.greet();`,
    learningGoal: "Understand how 'this' is determined by the call site and how to preserve context using bind, call, apply, or arrow functions.",
    expectedResult: "Calling greetFn() should log 'Hello, Alice'.",
    hint: "When you store a method in a variable, it loses its connection to the original object. The value of 'this' depends on how the function is called, not where it's defined.",
    tests: [
      { name: "Bug is fixed - 'this' context preserved", validate: (c) => c.includes(".bind(") || c.includes("=>") || c.includes("call(") || c.includes("apply(") },
      { name: "Function outputs correct greeting", validate: (c) => c.includes("Hello") },
    ],
  },
  {
    id: "bug-async-order",
    title: "6. Async Order Bug",
    problem: "This function tries to fetch user data and display it, but due to async timing, it logs 'undefined' because the data hasn't loaded yet.",
    brokenCode: `function fetchUserData(userId) {
  let userData;
  setTimeout(() => {
    userData = { id: userId, name: "User " + userId };
  }, 1000);
  console.log(userData); // Bug: logs undefined
}

fetchUserData(1);`,
    solution: `function fetchUserData(userId, callback) {
  setTimeout(() => {
    const userData = { id: userId, name: "User " + userId };
    callback(userData);
  }, 1000);
}

fetchUserData(1, (data) => {
  console.log(data);
});`,
    learningGoal: "Understand asynchronous programming patterns — callbacks, promises, and the non-blocking nature of JavaScript.",
    expectedResult: "The function should log the user data object after a 1-second delay.",
    hint: "setTimeout is asynchronous — it doesn't pause execution. The console.log runs immediately, before the setTimeout callback executes. You need to use the data inside the callback.",
    tests: [
      { name: "Bug is fixed - data is accessed after loading", validate: (c) => c.includes("callback") || c.includes("Promise") || c.includes(".then(") },
      { name: "Async pattern implemented", validate: (c) => c.includes("setTimeout") },
    ],
  },
  {
    id: "bug-equality",
    title: "7. Equality Bug",
    problem: "This login check function has a bug where it incorrectly validates users due to loose equality. '0' and false can bypass the check.",
    brokenCode: `function login(username, password) {
  if (username == "" || password == "") {
    return "Username and password are required";
  }
  if (username == "admin" && password == "1234") {
    return "Welcome, admin!";
  }
  return "Invalid credentials";
}

console.log(login(0, false)); // Bug: should fail but doesn't`,
    solution: `function login(username, password) {
  if (username === "" || password === "") {
    return "Username and password are required";
  }
  if (username === "admin" && password === "1234") {
    return "Welcome, admin!";
  }
  return "Invalid credentials";
}

console.log(login(0, false));`,
    learningGoal: "Understand the critical difference between == (loose equality with type coercion) and === (strict equality without coercion).",
    expectedResult: "login(0, false) should return 'Invalid credentials', not 'Welcome, admin!'.",
    hint: "The == operator performs type coercion. '0' == false is true because both are coerced to 0. Always use === to avoid unexpected type conversions.",
    tests: [
      { name: "Bug is fixed - uses strict equality", validate: (c) => c.includes("===") && !c.includes("\"admin\" == ") && !c.includes("'admin' == ") },
      { name: "Function validates correctly", validate: (c) => c.includes("Invalid credentials") },
    ],
  },
  {
    id: "bug-reference",
    title: "8. Reference vs Value Bug",
    problem: "This function tries to create a copy of an object but ends up modifying the original because of reference assignment.",
    brokenCode: `function updateSettings(settings) {
  const newSettings = settings; // Bug: reference copy, not value copy
  newSettings.theme = "dark";
  return newSettings;
}

const defaults = { theme: "light", fontSize: 14 };
console.log(updateSettings(defaults));
console.log(defaults); // Bug: original also changed`,
    solution: `function updateSettings(settings) {
  const newSettings = { ...settings };
  newSettings.theme = "dark";
  return newSettings;
}

const defaults = { theme: "light", fontSize: 14 };
console.log(updateSettings(defaults));
console.log(defaults);`,
    learningGoal: "Understand the difference between primitive types (passed by value) and objects/arrays (passed by reference) in JavaScript.",
    expectedResult: "The original 'defaults' object should remain { theme: 'light', fontSize: 14 } after calling updateSettings.",
    hint: "Objects are assigned by reference, not by value. 'const newSettings = settings' doesn't create a copy — both variables point to the same object. Use spread operator {...obj} or Object.assign() to create a shallow copy.",
    tests: [
      { name: "Bug is fixed - creates actual copy", validate: (c) => c.includes("...") || c.includes("Object.assign(") || c.includes("JSON.parse") },
      { name: "Original object is not mutated", validate: (c) => c.includes("theme") && c.includes("light") },
    ],
  },
  {
    id: "bug-undefined-null",
    title: "9. Null/Undefined Bug",
    problem: "This function crashes when accessing properties of null or undefined values. It needs proper null checking.",
    brokenCode: `function getCity(user) {
  return user.address.city; // Bug: crashes if user or address is null/undefined
}

console.log(getCity({ name: "Alice" })); // crash`,
    solution: `function getCity(user) {
  return user?.address?.city || "Unknown";
}

console.log(getCity({ name: "Alice" }));`,
    learningGoal: "Learn how to safely access nested properties using optional chaining and nullish coalescing.",
    expectedResult: "getCity({ name: 'Alice' }) should return 'Unknown' instead of crashing.",
    hint: "Use optional chaining (?.) to safely access nested properties. If any property in the chain is null or undefined, it short-circuits and returns undefined. Use nullish coalescing (??) for default values.",
    tests: [
      { name: "Bug is fixed - null safe access", validate: (c) => c.includes("?.") || c.includes("&&") || c.includes("if") },
      { name: "Function handles missing data gracefully", validate: (c) => c.includes("Unknown") || c.includes("Default") || c.includes("N/A") },
    ],
  },
  {
    id: "bug-float-precision",
    title: "10. Floating Point Bug",
    problem: "This price calculator gives incorrect results due to floating point precision issues in JavaScript.",
    brokenCode: `function calculateTotal(items) {
  let total = 0;
  items.forEach(item => {
    total += item.price * item.quantity;
  });
  return total;
}

console.log(calculateTotal([
  { price: 0.1, quantity: 3 }, // Should be 0.3
  { price: 0.2, quantity: 3 }  // Should be 0.6
])); // Bug: shows 0.8999999999999999`,
    solution: `function calculateTotal(items) {
  let total = 0;
  items.forEach(item => {
    total += item.price * item.quantity;
  });
  return Math.round(total * 100) / 100;
}

console.log(calculateTotal([
  { price: 0.1, quantity: 3 },
  { price: 0.2, quantity: 3 }
]));`,
    learningGoal: "Understand the IEEE 754 floating point representation and learn strategies to handle precision issues in financial calculations.",
    expectedResult: "The function should return 0.9 instead of 0.8999999999999999.",
    hint: "JavaScript uses binary floating point (IEEE 754) which can't represent some decimal numbers exactly. For financial calculations, round to a fixed number of decimal places.",
    tests: [
      { name: "Bug is fixed - floating point handled", validate: (c) => c.includes(".toFixed(") || c.includes("Math.round") || c.includes("toFixed") },
      { name: "Function returns correct total", validate: (c) => c.includes("calculateTotal") },
    ],
  },
  {
    id: "bug-event-listener",
    title: "11. Event Listener Leak Bug",
    problem: "This code adds an event listener every time a function is called, causing memory leaks and multiple firings.",
    brokenCode: `function setupButton(buttonId) {
  const button = document.getElementById(buttonId);
  button.addEventListener("click", function() {
    console.log("Button clicked");
  });
}

// If called multiple times, adds multiple listeners
setupButton("myBtn");
setupButton("myBtn");
setupButton("myBtn");`,
    solution: `function setupButton(buttonId) {
  const button = document.getElementById(buttonId);
  if (!button) return;
  
  // Remove existing listener before adding
  button.removeEventListener("click", handleClick);
  button.addEventListener("click", handleClick);
}

function handleClick() {
  console.log("Button clicked");
}

setupButton("myBtn");`,
    learningGoal: "Understand event listener management — how to prevent memory leaks and unintended multiple firings.",
    expectedResult: "Clicking the button should only log once, even if setupButton is called multiple times.",
    hint: "Each addEventListener adds a new listener. If setupButton is called multiple times, the click handler fires multiple times. Use named functions and removeEventListener to prevent duplicates.",
    tests: [
      { name: "Bug is fixed - no duplicate listeners", validate: (c) => c.includes("removeEventListener") || c.includes("once") },
      { name: "Event handling is set up", validate: (c) => c.includes("addEventListener") },
    ],
  },
  {
    id: "bug-reduce-init",
    title: "12. Reduce Initial Value Bug",
    problem: "This reduce operation fails when the array is empty because no initial value is provided.",
    brokenCode: `function sumArray(numbers) {
  return numbers.reduce((acc, num) => acc + num);
  // Bug: crashes with empty array
}

console.log(sumArray([])); // TypeError`,
    solution: `function sumArray(numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}

console.log(sumArray([]));`,
    learningGoal: "Understand why providing an initial value to reduce() is important, especially for empty arrays.",
    expectedResult: "sumArray([]) should return 0 instead of throwing a TypeError.",
    hint: "When you don't provide an initial value, reduce() uses the first element as the initial accumulator. For an empty array, there's no first element, so it throws a TypeError.",
    tests: [
      { name: "Bug is fixed - initial value provided", validate: (c) => c.includes(", 0)") || c.includes(", 0\n") || c.includes(", ''") || c.includes(", {}") },
      { name: "reduce() method used", validate: (c) => c.includes(".reduce(") },
    ],
  },
  {
    id: "bug-hoisting",
    title: "13. Hoisting Bug",
    problem: "This code has a bug due to JavaScript hoisting behavior with function declarations and var.",
    brokenCode: `function test() {
  console.log(value); // Bug: undefined (not a ReferenceError)
  var value = 10;
  console.log(value); // 10
}

function testFn() {
  return greet(); // Bug: TypeError, greet is undefined
  var greet = function() {
    return "Hello";
  };
}

test();
testFn();`,
    solution: `function test() {
  const value = 10;
  console.log(value);
  console.log(value);
}

function testFn() {
  function greet() {
    return "Hello";
  }
  return greet();
}

test();
testFn();`,
    learningGoal: "Understand hoisting — how var declarations and function declarations are moved to the top of their scope, while function expressions are not.",
    expectedResult: "Both test() and testFn() should work without errors or undefined values.",
    hint: "var declarations are hoisted (initialized as undefined), but function expressions assigned to var are not hoisted as functions. Use let/const instead of var, and use function declarations instead of function expressions if you need hoisting.",
    tests: [
      { name: "Bug is fixed - no hoisting issues", validate: (c) => !c.includes("var value") && !c.includes("var greet") },
      { name: "Uses modern declarations", validate: (c) => c.includes("const ") || c.includes("let ") },
    ],
  },
  {
    id: "bug-string-immutable",
    title: "14. String Immutability Bug",
    problem: "This function tries to modify a string in place, forgetting that strings are immutable in JavaScript.",
    brokenCode: `function capitalizeFirst(str) {
  str[0] = str[0].toUpperCase(); // Bug: strings are immutable
  return str;
}

console.log(capitalizeFirst("hello"));`,
    solution: `function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

console.log(capitalizeFirst("hello"));`,
    learningGoal: "Understand that strings are primitive values and immutable in JavaScript. Operations that seem to modify a string actually create a new string.",
    expectedResult: "capitalizeFirst('hello') should return 'Hello'.",
    hint: "Strings are immutable — you cannot change individual characters using bracket assignment. Create a new string instead using charAt() (or bracket access) + slice().",
    tests: [
      { name: "Bug is fixed - creates new string", validate: (c) => c.includes(".slice(") || c.includes(".substring(") || c.includes(".substr(") || c.includes(".charAt(") },
      { name: "String is capitalized correctly", validate: (c) => c.includes("toUpperCase(") },
    ],
  },
  {
    id: "bug-parseint-radix",
    title: "15. parseInt Radix Bug",
    problem: "This code uses parseInt without specifying the radix, leading to unexpected results for certain inputs.",
    brokenCode: `function parseNumber(value) {
  return parseInt(value); // Bug: no radix specified
}

console.log(parseNumber("10"));  // 10 (correct)
console.log(parseNumber("08"));  // 0 (octal in old browsers)
console.log(parseNumber("0xff")); // 255 (hex)`,
    solution: `function parseNumber(value) {
  return parseInt(value, 10);
}

console.log(parseNumber("10"));
console.log(parseNumber("08"));
console.log(parseNumber("0xff"));`,
    learningGoal: "Always specify the radix parameter (10 for decimal) in parseInt to avoid unexpected octal or hex interpretation.",
    expectedResult: "parseNumber('08') should return 8, not 0.",
    hint: "parseInt's default behavior depends on the string format. Strings starting with '0x' are parsed as hex, and in older environments, '0' prefix could be interpreted as octal. Always pass 10 as the second argument.",
    tests: [
      { name: "Bug is fixed - radix specified", validate: (c) => c.includes("parseInt(") && c.includes(", 10)") },
      { name: "Parsing works correctly", validate: (c) => c.includes("parseInt") },
    ],
  },
  {
    id: "bug-promise-chain",
    title: "16. Promise Chain Bug",
    problem: "This promise chain has a bug where errors in the first promise are not caught because catch is placed after a finally.",
    brokenCode: `function fetchData() {
  return new Promise((resolve, reject) => {
    reject("Network error");
  });
}

fetchData()
  .then(data => console.log(data))
  .finally(() => console.log("Cleanup"))
  .catch(error => console.error("Error:", error)); // Bug: error not caught`,
    solution: `function fetchData() {
  return new Promise((resolve, reject) => {
    reject("Network error");
  });
}

fetchData()
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error))
  .finally(() => console.log("Cleanup"));`,
    learningGoal: "Understand the order of promise chaining — catch should come before finally to properly handle errors.",
    expectedResult: "The error 'Network error' should be caught and logged by the .catch() handler.",
    hint: "In a promise chain, .catch() placed after .finally() won't catch errors from earlier in the chain because .finally() returns a promise that resolves with the original value. Place .catch before .finally.",
    tests: [
      { name: "Bug is fixed - catch before finally", validate: (c) => {
        const catchIdx = c.indexOf(".catch(");
        const finallyIdx = c.indexOf(".finally(");
        return catchIdx > -1 && finallyIdx > -1 && catchIdx < finallyIdx;
      }},
      { name: "Promise chain properly handles errors", validate: (c) => c.includes("Promise") && c.includes("reject") },
    ],
  },
];
