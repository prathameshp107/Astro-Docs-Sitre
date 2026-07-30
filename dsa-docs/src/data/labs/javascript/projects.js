// ─── JS Labs — Mini Projects Data ───
// 8 Mini Projects

import { testContains, testRegex, stripLineComments, hasDeclaration } from "./validators.js";

export const JS_MINI_PROJECTS = [
  {
    id: "project-todo-list",
    title: "1. Todo List Manager",
    overview: "Build a simple todo list manager that runs in the console. Users should be able to add, complete, and list tasks.",
    why: "This project brings together arrays, objects, functions, and control flow in a practical application.",
    concepts: ["Arrays", "Objects", "Functions", "State Management"],
    starterCode: `// Todo List Manager
let todos = [];

function addTodo(task) {
  // TODO: add a new todo object with id, task, completed (false)
}

function completeTodo(id) {
  // TODO: mark todo as completed
}

function listTodos() {
  // TODO: list all todos with their status
}

// Test it
addTodo("Learn JavaScript");
addTodo("Build a project");
completeTodo(1);
listTodos();
console.log("All todos:", todos);
`,
    solution: `let todos = [];
let nextId = 1;

function addTodo(task) {
  todos.push({ id: nextId++, task, completed: false });
  console.log(\`Added: "\${task}"\`);
}

function completeTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = true;
    console.log(\`Completed: "\${todo.task}"\`);
  }
}

function listTodos() {
  if (todos.length === 0) {
    console.log("No todos yet!");
    return;
  }
  console.log("\\n=== Todo List ===");
  todos.forEach(t => {
    console.log(\`\${t.id}. [\${t.completed ? "✓" : " "}] \${t.task}\`);
  });
}

addTodo("Learn JavaScript");
addTodo("Build a project");
completeTodo(1);
listTodos();`,
    checklist: [
      { text: "addTodo creates a new todo with unique id, task text, and completed set to false" },
      { text: "completeTodo finds a todo by id and sets completed to true" },
      { text: "listTodos displays all todos with their status (checked/unchecked)" },
      { text: "Todos are stored in an array and persisted between function calls" },
    ],
    milestones: [
      { title: "Task Creation", task: "Implement the addTodo function that creates properly structured todo objects" },
      { title: "Task Completion", task: "Implement completeTodo to find and update a todo by its id" },
      { title: "List Display", task: "Implement listTodos to show all todos in a readable format" },
    ],
    tests: [
      { name: "addTodo function adds tasks", validate: testContains("addTodo") },
      { name: "completeTodo marks tasks done", validate: testContains("completeTodo") },
      { name: "listTodos displays tasks", validate: testContains("listTodos") },
      { name: "Todos stored as objects with required fields", validate: (c) => c.includes("completed") && c.includes("id") && (c.includes("task") || c.includes("text")) },
    ],
  },
  {
    id: "project-calculator",
    title: "2. Calculator with History",
    overview: "Create a calculator that performs basic operations and keeps a history of calculations.",
    why: "Practice functions, conditionals, and array operations while building something practical.",
    concepts: ["Functions", "Conditionals", "Arrays", "Objects"],
    starterCode: `// Calculator with History
const history = [];

function calculate(a, op, b) {
  // TODO: perform calculation based on op (+, -, *, /)
  // TODO: save to history as { expression, result }
  // TODO: return the result
}

function getHistory() {
  // TODO: return all calculations
}

function clearHistory() {
  // TODO: clear all history
}

// Test
console.log("2 + 3 =", calculate(2, "+", 3));
console.log("10 - 4 =", calculate(10, "-", 4));
console.log("3 * 7 =", calculate(3, "*", 7));
console.log("15 / 3 =", calculate(15, "/", 3));
console.log("History:", getHistory());
`,
    solution: `const history = [];

function calculate(a, op, b) {
  let result;
  switch (op) {
    case "+": result = a + b; break;
    case "-": result = a - b; break;
    case "*": result = a * b; break;
    case "/": result = b !== 0 ? a / b : "Error"; break;
    default: result = "Invalid op";
  }
  history.push({ expression: \`\${a} \${op} \${b}\`, result });
  return result;
}

function getHistory() { return [...history]; }

function clearHistory() { history.length = 0; }

console.log("2 + 3 =", calculate(2, "+", 3));
console.log("10 - 4 =", calculate(10, "-", 4));
console.log("3 * 7 =", calculate(3, "*", 7));
console.log("15 / 3 =", calculate(15, "/", 3));
console.log("History:", getHistory());`,
    checklist: [
      { text: "Supports +, -, *, / operations" },
      { text: "Handles division by zero gracefully" },
      { text: "Saves each calculation to history with expression and result" },
      { text: "getHistory returns all calculations" },
      { text: "clearHistory removes all history entries" },
    ],
    milestones: [
      { title: "Basic Operations", task: "Implement +, -, *, / operations with proper switch/if logic" },
      { title: "History Tracking", task: "Store each calculation as an object in the history array" },
      { title: "History Management", task: "Implement getHistory and clearHistory functions" },
    ],
    tests: [
      { name: "calculate function defined", validate: testContains("function calculate") },
      { name: "Supports + operation", validate: testContains("+") && testContains("op") },
      { name: "Supports - operation", validate: testContains("-") && testContains("op") },
      { name: "Supports * operation", validate: testContains("*") && testContains("op") },
      { name: "Supports / operation", validate: testContains("/") && testContains("op") },
      { name: "History tracking implemented", validate: testContains("history") && testContains("push") },
    ],
  },
  {
    id: "project-gradebook",
    title: "3. Gradebook System",
    overview: "Build a gradebook system that manages students, their grades, and calculates statistics.",
    why: "Practice working with complex data structures, higher-order functions (map, filter, reduce), and data analysis.",
    concepts: ["Objects", "Arrays", "map", "filter", "reduce", "Statistics"],
    starterCode: `// Gradebook System
const gradebook = {
  students: [],
  addStudent(name) {
    // TODO: add student with name and empty grades array
  },
  addGrade(studentId, grade) {
    // TODO: add grade to student
  },
  getAverage(studentId) {
    // TODO: calculate average using reduce
  },
  getTopPerformer() {
    // TODO: find student with highest average
  },
  getClassAverage() {
    // TODO: calculate class-wide average
  }
};

// Test
gradebook.addStudent("Alice");
gradebook.addStudent("Bob");
gradebook.addGrade(0, 85);
gradebook.addGrade(0, 92);
gradebook.addGrade(0, 78);
gradebook.addGrade(1, 90);
gradebook.addGrade(1, 88);

console.log("Alice's average:", gradebook.getAverage(0));
console.log("Top performer:", gradebook.getTopPerformer());
console.log("Class average:", gradebook.getClassAverage());
`,
    solution: `const gradebook = {
  students: [],
  addStudent(name) {
    this.students.push({ name, grades: [] });
  },
  addGrade(studentId, grade) {
    if (this.students[studentId]) {
      this.students[studentId].grades.push(grade);
    }
  },
  getAverage(studentId) {
    const s = this.students[studentId];
    if (!s || s.grades.length === 0) return 0;
    return s.grades.reduce((sum, g) => sum + g, 0) / s.grades.length;
  },
  getTopPerformer() {
    return this.students.reduce((best, s) => {
      const avg = s.grades.reduce((sum, g) => sum + g, 0) / (s.grades.length || 1);
      return !best || avg > best.avg ? { name: s.name, avg } : best;
    }, null);
  },
  getClassAverage() {
    const allGrades = this.students.flatMap(s => s.grades);
    return allGrades.length > 0
      ? allGrades.reduce((sum, g) => sum + g, 0) / allGrades.length
      : 0;
  }
};

gradebook.addStudent("Alice");
gradebook.addStudent("Bob");
gradebook.addGrade(0, 85);
gradebook.addGrade(0, 92);
gradebook.addGrade(0, 78);
gradebook.addGrade(1, 90);
gradebook.addGrade(1, 88);

console.log("Alice's average:", gradebook.getAverage(0));
console.log("Top performer:", gradebook.getTopPerformer());
console.log("Class average:", gradebook.getClassAverage());`,
    checklist: [
      { text: "addStudent creates a student with name and empty grades array" },
      { text: "addGrade adds a grade to the specified student" },
      { text: "getAverage calculates the mean of a student's grades using reduce" },
      { text: "getTopPerformer finds the student with the highest average" },
      { text: "getClassAverage calculates the mean of all grades across all students" },
    ],
    milestones: [
      { title: "Student Management", task: "Implement addStudent and addGrade methods" },
      { title: "Individual Statistics", task: "Implement getAverage to calculate per-student averages" },
      { title: "Class Analytics", task: "Implement getTopPerformer and getClassAverage" },
    ],
    tests: [
      { name: "gradebook object with methods", validate: testContains("gradebook") },
      { name: "addStudent method defined", validate: testContains("addStudent") },
      { name: "addGrade method defined", validate: testContains("addGrade") },
      { name: "getAverage uses reduce", validate: testContains("reduce") && testContains("getAverage") },
      { name: "getTopPerformer defined", validate: testContains("getTopPerformer") },
      { name: "getClassAverage defined", validate: testContains("getClassAverage") },
    ],
  },
  {
    id: "project-weather-app",
    title: "4. Weather Data Analyzer",
    overview: "Create a weather data analyzer that processes temperature readings and provides insights like averages, extremes, and trends.",
    why: "Practice data processing with arrays, mathematical computations, and statistical analysis.",
    concepts: ["Arrays", "Math", "Statistics", "Data Processing"],
    starterCode: `// Weather Data Analyzer
const weatherData = {
  readings: [],
  addReading(temp, humidity, condition) {
    // TODO: add reading { temp, humidity, condition, timestamp }
  },
  getAverageTemp() {
    // TODO: calculate average temperature
  },
  getHighestTemp() {
    // TODO: find highest temperature
  },
  getConditionSummary() {
    // TODO: count occurrences of each condition
  },
  getHeatIndex() {
    // TODO: calculate average heat index (simplified: temp + humidity/100 * 5)
  }
};

// Test
weatherData.addReading(28, 65, "sunny");
weatherData.addReading(32, 70, "sunny");
weatherData.addReading(22, 80, "rainy");
weatherData.addReading(25, 75, "cloudy");
weatherData.addReading(30, 60, "sunny");

console.log("Avg Temp:", weatherData.getAverageTemp());
console.log("Highest Temp:", weatherData.getHighestTemp());
console.log("Condition Summary:", weatherData.getConditionSummary());
console.log("Heat Index:", weatherData.getHeatIndex());
`,
    solution: `const weatherData = {
  readings: [],
  addReading(temp, humidity, condition) {
    this.readings.push({ temp, humidity, condition, timestamp: Date.now() });
  },
  getAverageTemp() {
    return this.readings.reduce((sum, r) => sum + r.temp, 0) / this.readings.length;
  },
  getHighestTemp() {
    return Math.max(...this.readings.map(r => r.temp));
  },
  getConditionSummary() {
    return this.readings.reduce((summary, r) => {
      summary[r.condition] = (summary[r.condition] || 0) + 1;
      return summary;
    }, {});
  },
  getHeatIndex() {
    const avgTemp = this.getAverageTemp();
    const avgHumidity = this.readings.reduce((sum, r) => sum + r.humidity, 0) / this.readings.length;
    return avgTemp + (avgHumidity / 100) * 5;
  }
};

weatherData.addReading(28, 65, "sunny");
weatherData.addReading(32, 70, "sunny");
weatherData.addReading(22, 80, "rainy");
weatherData.addReading(25, 75, "cloudy");
weatherData.addReading(30, 60, "sunny");

console.log("Avg Temp:", weatherData.getAverageTemp());
console.log("Highest Temp:", weatherData.getHighestTemp());
console.log("Condition Summary:", weatherData.getConditionSummary());
console.log("Heat Index:", weatherData.getHeatIndex());`,
    checklist: [
      { text: "addReading stores temperature, humidity, condition, and timestamp" },
      { text: "getAverageTemp calculates mean temperature" },
      { text: "getHighestTemp returns the maximum temperature using Math.max and spread" },
      { text: "getConditionSummary counts occurrences of each weather condition" },
      { text: "getHeatIndex calculates a simplified apparent temperature" },
    ],
    milestones: [
      { title: "Data Collection", task: "Implement addReading to store structured weather data" },
      { title: "Temperature Analysis", task: "Implement getAverageTemp and getHighestTemp" },
      { title: "Advanced Insights", task: "Implement getConditionSummary and getHeatIndex" },
    ],
    tests: [
      { name: "weatherData object defined", validate: testContains("weatherData") },
      { name: "addReading captures all fields", validate: (c) => c.includes("temp") && c.includes("humidity") && c.includes("condition") },
      { name: "getAverageTemp uses reduce", validate: (c) => c.includes("reduce") && c.includes("getAverageTemp") },
      { name: "getHighestTemp uses Math.max", validate: (c) => c.includes("Math.max") },
      { name: "getConditionSummary defined", validate: testContains("getConditionSummary") },
    ],
  },
  {
    id: "project-memory-game",
    title: "5. Number Matching Game",
    overview: "Build a console-based number matching game where players try to match pairs of numbers by remembering their positions.",
    why: "Practice closures, state management, game logic, and user interaction patterns.",
    concepts: ["Closures", "State Management", "Game Logic", "Arrays"],
    starterCode: `// Number Matching Game
function createMemoryGame(size) {
  // TODO: create a grid of pairs
  // TODO: return game interface
  return {
    reveal(pos1, pos2) {
      // TODO: reveal two positions and check if they match
    },
    getGrid() {
      // TODO: return current grid state
    },
    isComplete() {
      // TODO: check if all pairs found
    },
    getAttempts() {
      // TODO: return number of attempts
    }
  };
}

// Test with a small 4-pair game
const game = createMemoryGame(4);
console.log("Initial grid:", game.getGrid());
const result = game.reveal(0, 1);
console.log("Reveal 0 and 1:", result);
console.log("Attempts:", game.getAttempts());
console.log("Complete?", game.isComplete());
`,
    solution: `function createMemoryGame(size) {
  const values = [];
  for (let i = 1; i <= size; i++) {
    values.push(i, i);
  }
  // Shuffle
  for (let i = values.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [values[i], values[j]] = [values[j], values[i]];
  }

  const grid = values.map(v => ({ value: v, revealed: false }));
  let attempts = 0;

  return {
    reveal(pos1, pos2) {
      if (pos1 === pos2 || grid[pos1].revealed || grid[pos2].revealed) {
        return { error: "Invalid selection" };
      }
      attempts++;
      grid[pos1].revealed = true;
      grid[pos2].revealed = true;
      const match = grid[pos1].value === grid[pos2].value;
      if (!match) {
        grid[pos1].revealed = false;
        grid[pos2].revealed = false;
      }
      return {
        match,
        value1: grid[pos1].value,
        value2: grid[pos2].value,
        attempts
      };
    },
    getGrid() { return grid.map(c => ({ ...c })); },
    isComplete() { return grid.every(c => c.revealed); },
    getAttempts() { return attempts; }
  };
}

const game = createMemoryGame(4);
console.log("Grid created, ready to play!");`,
    checklist: [
      { text: "createMemoryGame generates a shuffled grid of pairs" },
      { text: "reveal method checks two positions for a match" },
      { text: "Matching pairs stay revealed, non-matching pairs re-hide" },
      { text: "isComplete returns true when all pairs are found" },
      { text: "getAttempts tracks the number of reveal attempts" },
    ],
    milestones: [
      { title: "Game Setup", task: "Implement createMemoryGame with shuffled pairs and private state" },
      { title: "Gameplay Logic", task: "Implement reveal with match checking and temporary display" },
      { title: "Game Status", task: "Implement isComplete, getAttempts, and getGrid" },
    ],
    tests: [
      { name: "createMemoryGame function defined", validate: testContains("function createMemoryGame") },
      { name: "reveal method defined", validate: testContains("reveal") },
      { name: "isComplete method defined", validate: testContains("isComplete") },
      { name: "getAttempts method defined", validate: testContains("getAttempts") },
      { name: "getGrid method defined", validate: testContains("getGrid") },
      { name: "Closure used for private state", validate: (c) => c.includes("grid") && c.includes("attempts") },
    ],
  },
  {
    id: "project-text-analyzer",
    title: "6. Text Analyzer",
    overview: "Build a text analysis tool that processes strings and provides statistics like word count, character frequency, and readability scores.",
    why: "Practice string manipulation, regular expressions, and data aggregation techniques.",
    concepts: ["Strings", "Regular Expressions", "Data Analysis", "Objects"],
    starterCode: `// Text Analyzer
function analyzeText(text) {
  // TODO: return analysis object with:
  // - wordCount: number of words
  // - charCount: number of characters (excluding spaces)
  // - sentenceCount: number of sentences
  // - wordFrequency: object with word counts
  // - mostCommonWord: the most frequent word
  // - averageWordLength: mean word length
}

function wordFrequency(text) {
  // TODO: return object with word counts (case-insensitive)
}

// Test
const text = "The quick brown fox jumps over the lazy dog. The fox was quick!";
console.log("Analysis:", analyzeText(text));
console.log("Word Freq:", wordFrequency(text));
`,
    solution: `function analyzeText(text) {
  const words = text.toLowerCase().match(/\\b\\w+\\b/g) || [];
  const sentences = text.split(/[.!?]+/).filter(s => s.trim());
  const freq = {};

  words.forEach(w => { freq[w] = (freq[w] || 0) + 1; });

  const mostCommon = Object.entries(freq).sort((a, b) => b[1] - a[1])[0];

  return {
    wordCount: words.length,
    charCount: text.replace(/\\s/g, "").length,
    sentenceCount: sentences.length,
    wordFrequency: freq,
    mostCommonWord: mostCommon ? mostCommon[0] : null,
    averageWordLength: words.length > 0
      ? words.reduce((sum, w) => sum + w.length, 0) / words.length
      : 0
  };
}

const text = "The quick brown fox jumps over the lazy dog. The fox was quick!";
console.log("Analysis:", analyzeText(text));`,
    checklist: [
      { text: "Counts total words in the text" },
      { text: "Counts characters excluding spaces" },
      { text: "Counts number of sentences" },
      { text: "Builds word frequency map (case-insensitive)" },
      { text: "Identifies the most common word" },
      { text: "Calculates average word length" },
    ],
    milestones: [
      { title: "Basic Counts", task: "Implement word, character, and sentence counting" },
      { title: "Frequency Analysis", task: "Build word frequency map and find most common word" },
      { title: "Statistical Measures", task: "Calculate average word length and aggregate results" },
    ],
    tests: [
      { name: "analyzeText function defined", validate: testContains("function analyzeText") },
      { name: "Word count returned", validate: testContains("wordCount") },
      { name: "Character count returned", validate: testContains("charCount") },
      { name: "Sentence count returned", validate: testContains("sentenceCount") },
      { name: "Word frequency computed", validate: (c) => c.includes("freq") || c.includes("wordFrequency") || c.includes("frequency") },
      { name: "String methods used", validate: (c) => c.includes(".match(") || c.includes(".split(") },
    ],
  },
  {
    id: "project-inventory",
    title: "7. Inventory Management System",
    overview: "Create an inventory management system that tracks products, stock levels, and sales with advanced features like low-stock alerts and value calculations.",
    why: "Practice complex state management, CRUD operations, and data transformation methods.",
    concepts: ["Objects", "Arrays", "CRUD", "Data Transformation"],
    starterCode: `// Inventory Management System
function createInventory() {
  // Private state
  let products = [];
  let nextId = 1;

  return {
    addProduct(name, price, quantity) {
      // TODO: add new product
    },
    updateStock(productId, quantity) {
      // TODO: update stock quantity
    },
    sellProduct(productId, quantity) {
      // TODO: sell product (decrease stock)
    },
    getLowStock(threshold = 5) {
      // TODO: return products below threshold
    },
    getTotalValue() {
      // TODO: calculate total inventory value
    },
    getProduct(id) {
      // TODO: return product by id
    }
  };
}

// Test
const store = createInventory();
store.addProduct("Laptop", 999.99, 10);
store.addProduct("Mouse", 29.99, 3);
store.addProduct("Keyboard", 89.99, 8);
store.sellProduct(1, 2);
console.log("Low stock:", store.getLowStock());
console.log("Total value:", store.getTotalValue());
`,
    solution: `function createInventory() {
  let products = [];
  let nextId = 1;

  return {
    addProduct(name, price, quantity) {
      products.push({ id: nextId++, name, price, quantity });
    },
    updateStock(productId, quantity) {
      const p = products.find(p => p.id === productId);
      if (p) p.quantity = quantity;
    },
    sellProduct(productId, quantity) {
      const p = products.find(p => p.id === productId);
      if (p && p.quantity >= quantity) {
        p.quantity -= quantity;
        return true;
      }
      return false;
    },
    getLowStock(threshold = 5) {
      return products.filter(p => p.quantity < threshold);
    },
    getTotalValue() {
      return products.reduce((total, p) => total + p.price * p.quantity, 0);
    },
    getProduct(id) {
      return products.find(p => p.id === id);
    }
  };
}

const store = createInventory();
store.addProduct("Laptop", 999.99, 10);
store.addProduct("Mouse", 29.99, 3);
store.addProduct("Keyboard", 89.99, 8);
store.sellProduct(1, 2);
console.log("Low stock:", store.getLowStock());
console.log("Total value:", store.getTotalValue());`,
    checklist: [
      { text: "addProduct creates product with id, name, price, and quantity" },
      { text: "updateStock modifies the quantity of a product" },
      { text: "sellProduct decreases stock and prevents overselling" },
      { text: "getLowStock returns products below threshold" },
      { text: "getTotalValue calculates price * quantity for all products" },
      { text: "Uses closure for data privacy (products not accessible from outside)" },
    ],
    milestones: [
      { title: "Product CRUD", task: "Implement addProduct, getProduct, and updateStock" },
      { title: "Sales Operations", task: "Implement sellProduct with stock validation" },
      { title: "Reports & Analysis", task: "Implement getLowStock and getTotalValue" },
    ],
    tests: [
      { name: "createInventory function defined", validate: testContains("function createInventory") },
      { name: "addProduct method defined", validate: testContains("addProduct") },
      { name: "sellProduct method defined", validate: testContains("sellProduct") },
      { name: "getLowStock uses filter", validate: (c) => c.includes(".filter(") && c.includes("getLowStock") },
      { name: "getTotalValue uses reduce", validate: (c) => c.includes(".reduce(") && c.includes("getTotalValue") },
      { name: "Product data private via closure", validate: (c) => c.includes("let products") || c.includes("const products") },
    ],
  },
  {
    id: "project-quiz-app",
    title: "8. Interactive Quiz System",
    overview: "Build an interactive quiz system with scoring, timers, and feedback. Create a complete quiz experience.",
    why: "Practice combining multiple JavaScript concepts: objects, arrays, closures, async patterns, and state management.",
    concepts: ["Objects", "Closures", "Arrays", "Async", "State Management"],
    starterCode: `// Interactive Quiz System
function createQuiz(questions) {
  // TODO: implement quiz system
  return {
    getCurrentQuestion() {
      // TODO: return current question
    },
    submitAnswer(answer) {
      // TODO: check answer and move to next
    },
    getScore() {
      // TODO: return current score
    },
    getProgress() {
      // TODO: return { current, total }
    },
    isComplete() {
      // TODO: check if quiz is finished
    },
    getResults() {
      // TODO: return final results summary
    }
  };
}

// Sample questions
const questions = [
  { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: 1 },
  { question: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Madrid"], correct: 2 },
  { question: "Which is a JavaScript framework?", options: ["Django", "Rails", "React", "Laravel"], correct: 2 }
];

const quiz = createQuiz(questions);
console.log("Q1:", quiz.getCurrentQuestion());
console.log("Answer to Q1:", quiz.submitAnswer(1));
console.log("Progress:", quiz.getProgress());
console.log("Score:", quiz.getScore());
`,
    solution: `function createQuiz(questions) {
  let currentIndex = 0;
  let score = 0;
  const answers = [];

  return {
    getCurrentQuestion() {
      if (currentIndex >= questions.length) return null;
      return { ...questions[currentIndex], total: questions.length, current: currentIndex + 1 };
    },
    submitAnswer(answer) {
      if (currentIndex >= questions.length) return { error: "Quiz complete" };
      const q = questions[currentIndex];
      const correct = answer === q.correct;
      if (correct) score++;
      answers.push({ question: q.question, yourAnswer: answer, correctAnswer: q.correct, correct });
      currentIndex++;
      return { correct, correctAnswer: q.correct, score };
    },
    getScore() { return score; },
    getProgress() { return { current: currentIndex, total: questions.length }; },
    isComplete() { return currentIndex >= questions.length; },
    getResults() {
      return {
        score,
        total: questions.length,
        percentage: Math.round((score / questions.length) * 100),
        answers: [...answers]
      };
    }
  };
}

const questions = [
  { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: 1 },
  { question: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Madrid"], correct: 2 },
  { question: "Which is a JavaScript framework?", options: ["Django", "Rails", "React", "Laravel"], correct: 2 }
];

const quiz = createQuiz(questions);
console.log("Q1:", quiz.getCurrentQuestion());
console.log("Answer to Q1:", quiz.submitAnswer(1));
console.log("Progress:", quiz.getProgress());
console.log("Score:", quiz.getScore());`,
    checklist: [
      { text: "getCurrentQuestion returns the current question with options" },
      { text: "submitAnswer checks correctness and advances to next question" },
      { text: "getScore returns the current score" },
      { text: "getProgress shows current question number and total" },
      { text: "isComplete returns true when all questions answered" },
      { text: "getResults returns a summary with score, percentage, and answer log" },
    ],
    milestones: [
      { title: "Quiz Engine", task: "Implement question navigation and answer checking" },
      { title: "Scoring & Progress", task: "Implement scoring, progress tracking, and completion detection" },
      { title: "Results & Analytics", task: "Implement getResults with full answer history and percentage" },
    ],
    tests: [
      { name: "createQuiz function defined", validate: testContains("function createQuiz") },
      { name: "getCurrentQuestion returns formatted question", validate: (c) => c.includes("getCurrentQuestion") },
      { name: "submitAnswer checks and records", validate: (c) => c.includes("submitAnswer") },
      { name: "getScore returns score", validate: testContains("getScore") },
      { name: "getProgress tracks position", validate: testContains("getProgress") },
      { name: "isComplete checks completion", validate: testContains("isComplete") },
    ],
  },
];
