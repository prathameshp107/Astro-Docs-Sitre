// ─── Auto-generated imports for technology-specific questions ───

import javascriptQuestions from './questions/javascript.js';
import reactQuestions from './questions/react.js';
import sqlQuestions from './questions/sql.js';
import pythonQuestions from './questions/python.js';
import htmlQuestions from './questions/html.js';
import cssQuestions from './questions/css.js';
import typescriptQuestions from './questions/typescript.js';
import nodejsQuestions from './questions/nodejs.js';
import angularQuestions from './questions/angular.js';
import mongodbQuestions from './questions/mongodb.js';
import gitQuestions from './questions/git.js';
import systemDesignQuestions from './questions/system-design.js';
import dataStructuresQuestions from './questions/data-structures.js';
import algorithmsQuestions from './questions/algorithms.js';
import oopsQuestions from './questions/oops.js';

// ─── All Questions Mapped (must be before MCQ_CATEGORIES for auto-counts) ───

const questionMap = {
  javascript: javascriptQuestions,
  react: reactQuestions,
  typescript: typescriptQuestions,
  nodejs: nodejsQuestions,
  angular: angularQuestions,
  python: pythonQuestions,
  html: htmlQuestions,
  css: cssQuestions,
  sql: sqlQuestions,
  mongodb: mongodbQuestions,
  git: gitQuestions,
  'system-design': systemDesignQuestions,
  'data-structures': dataStructuresQuestions,
  algorithms: algorithmsQuestions,
  oops: oopsQuestions,
};

// Auto-compute from actual imported data — keeps counts in sync
function computeQuestionCounts() {
  const counts = {};
  for (const [id, questions] of Object.entries(questionMap)) {
    counts[id] = questions.length;
  }
  return counts;
}

const ACTUAL_COUNTS = computeQuestionCounts();

// ─── Category Definitions ───

export const MCQ_CATEGORIES = [
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: '🟨',
    color: '#f7df1e',
    questionCount: ACTUAL_COUNTS.javascript || 95,
    difficulties: ['Beginner', 'Intermediate', 'Advanced'],
    description: 'Core JS concepts, closures, promises, prototypes, event loop, ES6+ features.',
    gradient: 'from-yellow-400/20 to-orange-500/10',
    borderColor: '#f7df1e33',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    icon: '🔷',
    color: '#3178c6',
    questionCount: ACTUAL_COUNTS.typescript || 50,
    difficulties: ['Beginner', 'Intermediate', 'Advanced'],
    description: 'Types, interfaces, generics, advanced types, decorators, utility types.',
    gradient: 'from-blue-500/20 to-indigo-500/10',
    borderColor: '#3178c633',
  },
  {
    id: 'react',
    name: 'React',
    icon: '⚛️',
    color: '#61dafb',
    questionCount: ACTUAL_COUNTS.react || 50,
    difficulties: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
    description: 'Hooks, state management, components, performance, testing patterns.',
    gradient: 'from-cyan-400/20 to-blue-500/10',
    borderColor: '#61dafb33',
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    icon: '🟢',
    color: '#339933',
    questionCount: ACTUAL_COUNTS.nodejs || 50,
    difficulties: ['Intermediate', 'Advanced'],
    description: 'Express, async patterns, databases, streams, security, deployment.',
    gradient: 'from-green-500/20 to-emerald-500/10',
    borderColor: '#33993333',
  },
  {
    id: 'angular',
    name: 'Angular',
    icon: '🅰️',
    color: '#dd0031',
    questionCount: ACTUAL_COUNTS.angular || 50,
    difficulties: ['Beginner', 'Intermediate', 'Advanced'],
    description: 'Components, RxJS, services, forms, routing, NgRx, testing.',
    gradient: 'from-red-500/20 to-rose-500/10',
    borderColor: '#dd003133',
  },
  {
    id: 'python',
    name: 'Python',
    icon: '🐍',
    color: '#3776AB',
    questionCount: ACTUAL_COUNTS.python || 50,
    difficulties: ['Beginner', 'Intermediate', 'Advanced'],
    description: 'Syntax, OOP, data structures, decorators, generators, async Python.',
    gradient: 'from-blue-600/20 to-cyan-500/10',
    borderColor: '#3776AB33',
  },
  {
    id: 'html',
    name: 'HTML',
    icon: '🌐',
    color: '#e34f26',
    questionCount: ACTUAL_COUNTS.html || 50,
    difficulties: ['Beginner', 'Intermediate'],
    description: 'Semantic HTML, accessibility, forms, SEO, best practices.',
    gradient: 'from-orange-500/20 to-red-500/10',
    borderColor: '#e34f2633',
  },
  {
    id: 'css',
    name: 'CSS',
    icon: '🎨',
    color: '#1572b6',
    questionCount: ACTUAL_COUNTS.css || 50,
    difficulties: ['Beginner', 'Intermediate', 'Advanced'],
    description: 'Flexbox, Grid, animations, responsive design, preprocessors.',
    gradient: 'from-blue-400/20 to-sky-500/10',
    borderColor: '#1572b633',
  },
  {
    id: 'sql',
    name: 'SQL',
    icon: '🗄️',
    color: '#f59e0b',
    questionCount: ACTUAL_COUNTS.sql || 50,
    difficulties: ['Beginner', 'Intermediate', 'Advanced'],
    description: 'Queries, joins, indexing, optimization, transactions, design.',
    gradient: 'from-amber-500/20 to-yellow-500/10',
    borderColor: '#f59e0b33',
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    icon: '🍃',
    color: '#47a248',
    questionCount: ACTUAL_COUNTS.mongodb || 50,
    difficulties: ['Beginner', 'Intermediate', 'Advanced'],
    description: 'CRUD, aggregation, indexing, data modeling, replication.',
    gradient: 'from-green-600/20 to-emerald-500/10',
    borderColor: '#47a24833',
  },
  {
    id: 'git',
    name: 'Git',
    icon: '📦',
    color: '#f05032',
    questionCount: ACTUAL_COUNTS.git || 50,
    difficulties: ['Beginner', 'Intermediate'],
    description: 'Commands, branching, merging, rebasing, workflows, collaboration.',
    gradient: 'from-red-500/20 to-orange-500/10',
    borderColor: '#f0503233',
  },
  {
    id: 'system-design',
    name: 'System Design',
    icon: '🏗️',
    color: '#a78bfa',
    questionCount: ACTUAL_COUNTS['system-design'] || 50,
    difficulties: ['Advanced', 'Expert'],
    description: 'Architecture patterns, scalability, databases, caching, microservices.',
    gradient: 'from-purple-500/20 to-violet-500/10',
    borderColor: '#a78bfa33',
  },
  {
    id: 'data-structures',
    name: 'Data Structures',
    icon: '📊',
    color: '#6366f1',
    questionCount: ACTUAL_COUNTS['data-structures'] || 50,
    difficulties: ['Beginner', 'Intermediate', 'Advanced'],
    description: 'Arrays, trees, graphs, hash tables, stacks, queues, heaps.',
    gradient: 'from-indigo-500/20 to-purple-500/10',
    borderColor: '#6366f133',
  },
  {
    id: 'algorithms',
    name: 'Algorithms',
    icon: '⚡',
    color: '#ec4899',
    questionCount: ACTUAL_COUNTS.algorithms || 50,
    difficulties: ['Intermediate', 'Advanced', 'Expert'],
    description: 'Sorting, searching, DP, graph algorithms, complexity analysis.',
    gradient: 'from-pink-500/20 to-rose-500/10',
    borderColor: '#ec489933',
  },
  {
    id: 'oops',
    name: 'OOP',
    icon: '🧱',
    color: '#a855f7',
    questionCount: ACTUAL_COUNTS.oops || 65,
    difficulties: ['Beginner', 'Intermediate', 'Advanced'],
    description: 'Classes, objects, inheritance, polymorphism, encapsulation, abstraction, SOLID principles, and relationships.',
    gradient: 'from-purple-500/20 to-pink-500/10',
    borderColor: '#a855f733',
  },
];

// ─── Topic Definitions ───

export const CATEGORY_TOPICS = {
  javascript: [
    { name: 'Variables & Types', count: 35, icon: '📦' },
    { name: 'Functions', count: 40, icon: '🔧' },
    { name: 'Closures & Scope', count: 35, icon: '🔒' },
    { name: 'Objects & Prototypes', count: 30, icon: '🧱' },
    { name: 'Arrays & Collections', count: 35, icon: '📋' },
    { name: 'Promises & Async', count: 40, icon: '⏳' },
    { name: 'Event Loop', count: 25, icon: '🔄' },
    { name: 'ES6+ Features', count: 35, icon: '✨' },
    { name: 'Error Handling', count: 20, icon: '⚠️' },
    { name: 'Modules', count: 15, icon: '📁' },
    { name: 'DOM & Browser APIs', count: 25, icon: '🌐' },
    { name: 'Type Coercion', count: 20, icon: '🔄' },
    { name: 'this Keyword', count: 20, icon: '👆' },
    { name: 'Generators & Iterators', count: 15, icon: '📌' },
    { name: 'Memory & Performance', count: 20, icon: '⚡' },
    { name: 'Design Patterns', count: 15, icon: '📐' },
    { name: 'Web APIs (Fetch, Storage)', count: 25, icon: '🔌' },
    { name: 'Security (XSS, CSRF)', count: 15, icon: '🔒' },
    { name: 'Testing', count: 15, icon: '🧪' },
    { name: 'Node.js Specific', count: 10, icon: '🟢' },
  ],
  react: [
    { name: 'JSX & Rendering', count: 30, icon: '⚛️' },
    { name: 'Components', count: 35, icon: '🧩' },
    { name: 'Props & State', count: 30, icon: '📨' },
    { name: 'useState Hook', count: 25, icon: '🎣' },
    { name: 'useEffect Hook', count: 25, icon: '🔄' },
    { name: 'useRef & DOM', count: 20, icon: '🔗' },
    { name: 'useMemo & useCallback', count: 20, icon: '⚡' },
    { name: 'useContext', count: 15, icon: '🌳' },
    { name: 'useReducer', count: 15, icon: '📊' },
    { name: 'Custom Hooks', count: 20, icon: '🔨' },
    { name: 'Event Handling', count: 20, icon: '👆' },
    { name: 'Conditional Rendering', count: 15, icon: '🔀' },
    { name: 'Lists & Keys', count: 15, icon: '📋' },
    { name: 'Forms & Validation', count: 20, icon: '📝' },
    { name: 'Routing (React Router)', count: 20, icon: '🧭' },
    { name: 'State Management', count: 25, icon: '🗄️' },
    { name: 'Performance Optimization', count: 20, icon: '⚡' },
    { name: 'Testing (RTL)', count: 15, icon: '🧪' },
    { name: 'Server Components', count: 10, icon: '🖥️' },
    { name: 'Suspense & Transitions', count: 10, icon: '⏳' },
  ],
  typescript: [
    { name: 'Basic Types', count: 20, icon: '📝' },
    { name: 'Interfaces', count: 25, icon: '📐' },
    { name: 'Functions & Signatures', count: 20, icon: '🔧' },
    { name: 'Generics', count: 20, icon: '📦' },
    { name: 'Enums & Unions', count: 15, icon: '🔀' },
    { name: 'Utility Types', count: 15, icon: '🧰' },
    { name: 'Type Guards', count: 15, icon: '🛡️' },
    { name: 'Decorators', count: 10, icon: '🎀' },
    { name: 'Modules & Namespaces', count: 10, icon: '📁' },
    { name: 'Advanced Types', count: 15, icon: '⚡' },
  ],
  nodejs: [
    { name: 'Core Modules', count: 15, icon: '📦' },
    { name: 'Express.js', count: 20, icon: '🚂' },
    { name: 'Async Patterns', count: 20, icon: '⏳' },
    { name: 'File System', count: 15, icon: '📁' },
    { name: 'NPM & Packages', count: 10, icon: '📦' },
    { name: 'Streams & Buffers', count: 15, icon: '🌊' },
    { name: 'RESTful APIs', count: 20, icon: '🔌' },
    { name: 'Authentication', count: 15, icon: '🔒' },
    { name: 'Database Integration', count: 15, icon: '🗄️' },
    { name: 'Error Handling', count: 10, icon: '⚠️' },
    { name: 'Testing', count: 10, icon: '🧪' },
    { name: 'Security Best Practices', count: 10, icon: '🛡️' },
    { name: 'Performance', count: 10, icon: '⚡' },
    { name: 'Real-time (WebSockets)', count: 10, icon: '🔗' },
  ],
  angular: [
    { name: 'Components', count: 25, icon: '🧩' },
    { name: 'Templates & Data Binding', count: 20, icon: '🔗' },
    { name: 'Directives', count: 15, icon: '🎯' },
    { name: 'Services & DI', count: 20, icon: '💉' },
    { name: 'RxJS & Observables', count: 20, icon: '🔄' },
    { name: 'Forms (Reactive & TD)', count: 20, icon: '📝' },
    { name: 'Routing', count: 15, icon: '🧭' },
    { name: 'Pipes', count: 10, icon: '🔧' },
    { name: 'HTTP Client', count: 15, icon: '🌐' },
    { name: 'NgRx & State Management', count: 10, icon: '🗄️' },
    { name: 'Testing', count: 10, icon: '🧪' },
  ],
  python: [
    { name: 'Syntax & Basics', count: 25, icon: '📝' },
    { name: 'Data Structures', count: 30, icon: '📊' },
    { name: 'Functions & Scope', count: 25, icon: '🔧' },
    { name: 'OOP in Python', count: 25, icon: '🧱' },
    { name: 'Modules & Packages', count: 15, icon: '📦' },
    { name: 'File I/O', count: 15, icon: '📁' },
    { name: 'Exception Handling', count: 15, icon: '⚠️' },
    { name: 'Decorators & Generators', count: 15, icon: '🎀' },
    { name: 'Comprehensions', count: 15, icon: '✨' },
    { name: 'Standard Library', count: 20, icon: '📚' },
  ],
  html: [
    { name: 'Basic Structure', count: 20, icon: '📄' },
    { name: 'Semantic HTML', count: 20, icon: '🏷️' },
    { name: 'Forms & Inputs', count: 20, icon: '📝' },
    { name: 'Tables', count: 10, icon: '📋' },
    { name: 'Multimedia', count: 10, icon: '🎬' },
    { name: 'Accessibility (A11Y)', count: 15, icon: '♿' },
    { name: 'SEO Best Practices', count: 10, icon: '🔍' },
    { name: 'HTML5 APIs', count: 15, icon: '🔌' },
    { name: 'Metadata & SEO', count: 10, icon: '📑' },
  ],
  css: [
    { name: 'Selectors & Specificity', count: 25, icon: '🎯' },
    { name: 'Box Model', count: 20, icon: '📦' },
    { name: 'Flexbox', count: 20, icon: '➡️' },
    { name: 'Grid', count: 20, icon: '🔲' },
    { name: 'Positioning', count: 15, icon: '📍' },
    { name: 'Responsive Design', count: 20, icon: '📱' },
    { name: 'Animations & Transitions', count: 20, icon: '🎬' },
    { name: 'Typography & Fonts', count: 10, icon: '🔤' },
    { name: 'Preprocessors (SASS/SCSS)', count: 10, icon: '⚙️' },
    { name: 'Custom Properties', count: 10, icon: '🎨' },
  ],
  sql: [
    { name: 'Queries & SELECT', count: 30, icon: '🔍' },
    { name: 'Joins', count: 25, icon: '🔗' },
    { name: 'Aggregations', count: 20, icon: '📊' },
    { name: 'Subqueries & CTEs', count: 20, icon: '📎' },
    { name: 'Indexing', count: 15, icon: '📑' },
    { name: 'Normalization & Design', count: 15, icon: '📐' },
    { name: 'Transactions & ACID', count: 15, icon: '🔒' },
    { name: 'Stored Procedures', count: 10, icon: '📦' },
    { name: 'Performance Optimization', count: 15, icon: '⚡' },
    { name: 'Views & Triggers', count: 10, icon: '🔔' },
  ],
  mongodb: [
    { name: 'CRUD Operations', count: 25, icon: '📝' },
    { name: 'Aggregation Pipeline', count: 20, icon: '🔗' },
    { name: 'Indexing', count: 15, icon: '📑' },
    { name: 'Schema Design', count: 20, icon: '📐' },
    { name: 'Replication & Sharding', count: 15, icon: '🔄' },
    { name: 'Query Operators', count: 20, icon: '🔍' },
    { name: 'Transactions', count: 10, icon: '🔒' },
  ],
  git: [
    { name: 'Basic Commands', count: 20, icon: '📝' },
    { name: 'Branching & Merging', count: 20, icon: '🌿' },
    { name: 'Rebasing', count: 15, icon: '🔄' },
    { name: 'Collaboration', count: 15, icon: '👥' },
    { name: 'Undoing Changes', count: 10, icon: '↩️' },
    { name: 'History & Log', count: 10, icon: '📜' },
    { name: 'Stashing', count: 5, icon: '📦' },
    { name: 'Workflows', count: 10, icon: '🔄' },
    { name: 'GitHub/GitLab', count: 10, icon: '🐙' },
  ],
  'system-design': [
    { name: 'Architecture Patterns', count: 15, icon: '🏗️' },
    { name: 'Scalability', count: 15, icon: '📈' },
    { name: 'Databases', count: 15, icon: '🗄️' },
    { name: 'Caching', count: 10, icon: '⚡' },
    { name: 'Load Balancing', count: 10, icon: '⚖️' },
    { name: 'Consistency & CAP', count: 10, icon: '🔄' },
    { name: 'Microservices', count: 10, icon: '🔌' },
    { name: 'Message Queues', count: 5, icon: '📨' },
    { name: 'API Design', count: 10, icon: '🔗' },
  ],
  'data-structures': [
    { name: 'Arrays', count: 25, icon: '📋' },
    { name: 'Linked Lists', count: 20, icon: '⛓️' },
    { name: 'Stacks & Queues', count: 20, icon: '📚' },
    { name: 'Hash Tables', count: 20, icon: '🔑' },
    { name: 'Trees', count: 25, icon: '🌳' },
    { name: 'Graphs', count: 20, icon: '📊' },
    { name: 'Heaps', count: 15, icon: '⛰️' },
    { name: 'Tries', count: 10, icon: '🔤' },
    { name: 'Sets & Maps', count: 15, icon: '🗺️' },
  ],
  algorithms: [
    { name: 'Sorting', count: 20, icon: '🔀' },
    { name: 'Searching', count: 20, icon: '🔍' },
    { name: 'Dynamic Programming', count: 20, icon: '🧮' },
    { name: 'Graph Algorithms', count: 20, icon: '📊' },
    { name: 'Greedy Algorithms', count: 15, icon: '💰' },
    { name: 'Recursion', count: 20, icon: '🔄' },
    { name: 'Two Pointers', count: 10, icon: '👉' },
    { name: 'Sliding Window', count: 10, icon: '🪟' },
    { name: 'Backtracking', count: 15, icon: '🔙' },
    { name: 'Complexity Analysis', count: 15, icon: '📈' },
    { name: 'Bit Manipulation', count: 10, icon: '🔢' },
    { name: 'Divide and Conquer', count: 10, icon: '🔪' },
  ],
  oops: [
    { name: 'What is OOP?', count: 5, icon: '🤔' },
    { name: 'Class & Object', count: 5, icon: '📋' },
    { name: 'Constructor & this', count: 5, icon: '🔨' },
    { name: 'Encapsulation', count: 5, icon: '🔒' },
    { name: 'Abstraction', count: 5, icon: '🎭' },
    { name: 'Inheritance', count: 5, icon: '🌳' },
    { name: 'Polymorphism', count: 5, icon: '🔄' },
    { name: 'SOLID Principles', count: 5, icon: '💎' },
    { name: 'Relationships', count: 5, icon: '🔗' },
    { name: 'Interfaces & Abstract', count: 5, icon: '📐' },
    { name: 'Access & Design', count: 5, icon: '⚙️' },
  ],
};

// ─── MCQ Questions ───

export function getQuestionsForCategory(categoryId) {
  return questionMap[categoryId] || [];
}

export function getQuestionsForTopic(categoryId, topicName) {
  const questions = questionMap[categoryId] || [];
  return questions.filter(q => q.topic === topicName);
}

export function getQuestionById(id) {
  for (const cat of Object.values(questionMap)) {
    for (const q of cat) {
      if (q.id === id) return q;
    }
  }
  return null;
}

export function getTopicsForCategory(categoryId) {
  const questions = getQuestionsForCategory(categoryId);
  const configuredTopics = CATEGORY_TOPICS[categoryId] || [];
  const configuredTopicMap = new Map(configuredTopics.map((topic) => [topic.name, topic]));
  const topicCounts = new Map();

  questions.forEach((question) => {
    if (!question.topic) return;
    topicCounts.set(question.topic, (topicCounts.get(question.topic) || 0) + 1);
  });

  const topics = Array.from(topicCounts, ([name, count]) => ({
    name,
    count,
    icon: configuredTopicMap.get(name)?.icon || '📘',
  }));

  return topics.sort((a, b) => {
    const aIndex = configuredTopics.findIndex((topic) => topic.name === a.name);
    const bIndex = configuredTopics.findIndex((topic) => topic.name === b.name);

    if (aIndex === -1 && bIndex === -1) return a.name.localeCompare(b.name);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });
}

// Determine question type
export function getQuestionType(question) {
  if (question.correctAnswer.length > 1) return 'multiple';
  if (question.options.length === 2 && 
      question.options[0] === 'True' && 
      question.options[1] === 'False') return 'true-false';
  if (question.codeSnippet && question.question.toLowerCase().includes('output')) return 'code-output';
  if (question.question.toLowerCase().includes('bug') || question.question.toLowerCase().includes('fix')) return 'error-detection';
  return 'conceptual';
}
