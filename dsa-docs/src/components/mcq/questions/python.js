// Auto-extracted from MCQData.js

export default [
  {
    id: 'py-1',
    technology: 'python',
    topic: 'Syntax',
    difficulty: 'easy',
    question: 'How do you create a list in Python?',
    codeSnippet: `# Which creates a list in Python?`,
    options: ['list = {1, 2, 3}', 'list = [1, 2, 3]', 'list = (1, 2, 3)', 'list = <1, 2, 3>'],
    correctAnswer: [1],
    type: 'single',
    explanation: 'In Python, lists are created using square brackets `[]`. Curly braces `{}` create a set or dict. Parentheses `()` create a tuple.',
    keyConcept: 'Python collection literals: `[]` = list, `()` = tuple, `{}` = dict/set.',
    xpReward: 5,
    tags: ['lists', 'syntax'],
  },
  {
    id: 'py-2',
    technology: 'python',
    topic: 'Functions',
    difficulty: 'medium',
    question: 'What does this Python code output?',
    codeSnippet: `def func(a, b=[]):\n  b.append(a)\n  return b\n\nprint(func(1))\nprint(func(2))`,
    options: ['[1], [2]', '[1], [1, 2]', '[1, 2], [1, 2]', 'Error'],
    correctAnswer: [1],
    type: 'single',
    explanation: 'Default arguments in Python are evaluated only once when the function is defined, not each time the function is called. So `b=[]` creates one list that persists across calls. `func(1)` appends 1, `func(2)` appends 2 to the same list.',
    keyConcept: 'Avoid mutable default arguments in Python. Use `None` and initialize inside the function: `def func(a, b=None): b = b or []`.',
    xpReward: 20,
    tags: ['default-arguments', 'mutable', 'pitfall'],
  },
];
