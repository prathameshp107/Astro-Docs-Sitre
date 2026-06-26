// Auto-extracted from MCQData.js

export default [
  {
    id: 'sql-1',
    technology: 'sql',
    topic: 'Queries',
    difficulty: 'easy',
    question: 'Which SQL clause is used to filter records?',
    codeSnippet: `SELECT * FROM users ??? age > 18;`,
    options: ['WHERE', 'HAVING', 'FILTER', 'IF'],
    correctAnswer: [0],
    type: 'single',
    explanation: 'The WHERE clause is used to filter records based on specified conditions. HAVING is used to filter groups (with GROUP BY).',
    keyConcept: 'WHERE filters rows before grouping. HAVING filters groups after GROUP BY.',
    xpReward: 5,
    tags: ['where', 'filtering'],
  },
  {
    id: 'sql-2',
    technology: 'sql',
    topic: 'Joins',
    difficulty: 'medium',
    question: 'Which JOIN returns all rows when there is a match in either table?',
    codeSnippet: `-- Which join type do you use?`,
    options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL OUTER JOIN'],
    correctAnswer: [3],
    type: 'single',
    explanation: 'FULL OUTER JOIN returns all records when there is a match in either left or right table. If there is no match, NULL values are returned for the non-matching side.',
    keyConcept: 'INNER JOIN = only matches. LEFT JOIN = all left + matches from right. FULL OUTER = all rows from both tables.',
    xpReward: 10,
    tags: ['joins', 'full-outer-join'],
  },
];
