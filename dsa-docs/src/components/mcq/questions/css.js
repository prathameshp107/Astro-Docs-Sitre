// Auto-extracted from MCQData.js

export default [
  {
    id: 'css-1',
    technology: 'css',
    topic: 'Flexbox',
    difficulty: 'medium',
    question: 'Which property centers a flex item both horizontally and vertically?',
    codeSnippet: `.container {\n  display: flex;\n  /* What goes here? */\n}`,
    options: [
      'align-items: center; justify-content: center;',
      'text-align: center; vertical-align: middle;',
      'margin: auto;',
      'center: both;',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'To center items in a flex container both horizontally and vertically: `justify-content: center` (main axis) and `align-items: center` (cross axis).',
    keyConcept: 'In Flexbox: `justify-content` controls the main axis, `align-items` controls the cross axis.',
    xpReward: 10,
    tags: ['flexbox', 'centering'],
  },
  {
    id: 'css-2',
    technology: 'css',
    topic: 'Grid',
    difficulty: 'medium',
    question: 'What does grid-template-columns: repeat(3, 1fr) do?',
    options: [
      'Creates 3 equal-width columns',
      'Creates 1 column that repeats 3 times',
      'Creates 3 rows of equal height',
      'Creates a 3x3 grid',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: '`repeat(3, 1fr)` creates 3 columns of equal width. `1fr` means one fraction of the available space. So three `1fr` columns each take up one-third of the available width.',
    keyConcept: '`fr` units distribute available space proportionally. `repeat()` is a convenient shorthand for creating multiple tracks.',
    xpReward: 10,
    tags: ['grid', 'css-grid', 'fr-unit'],
  },
];
