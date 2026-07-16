// ─── CSS Labs — Interview Topics Data ───

export const CSS_INTERVIEW_TOPICS = [
  {
    id: "css-fundamentals-interview",
    title: "CSS Fundamentals",
    questions: [
      "What is CSS and what does CSS stand for?",
      "Explain the cascade in CSS. How does it work?",
      "What is specificity and how is it calculated?",
      "What is the difference between inheritance and the cascade?",
      "What are the different ways to include CSS in a page?",
      "What is the difference between em and rem units?",
      "What is the difference between absolute and relative units?",
      "What is the box model? Explain margin, border, padding, and content.",
      "What does box-sizing: border-box do and why is it useful?",
      "What is margin collapse and when does it happen?",
    ],
  },
  {
    id: "flexbox-interview",
    title: "Flexbox",
    questions: [
      "What is Flexbox and when should you use it?",
      "Explain the difference between justify-content and align-items.",
      "What does the flex property shorthand (flex: 1) mean?",
      "How do you center an element both horizontally and vertically using Flexbox?",
      "What is the difference between align-items and align-content?",
      "How does flex-wrap work? What happens when items don't fit?",
      "What is the order property in Flexbox?",
      "How do you create a sticky footer using Flexbox?",
      "What is the difference between flex-grow, flex-shrink, and flex-basis?",
      "What happens when you set align-self on a flex item?",
    ],
  },
  {
    id: "grid-interview",
    title: "CSS Grid",
    questions: [
      "What is CSS Grid and how does it differ from Flexbox?",
      "How do you create a 3-column layout with CSS Grid?",
      "What are fr units and how do they work?",
      "What is the difference between auto-fit and auto-fill in repeat()?",
      "How do you create responsive grids without media queries?",
      "What is grid-template-areas and how is it used?",
      "How do you span an item across multiple columns or rows?",
      "Explain the difference between grid lines and grid tracks.",
      "What are the benefits of using Grid over Flexbox for page layouts?",
      "What is subgrid and when would you use it?",
    ],
  },
  {
    id: "positioning-interview",
    title: "Positioning & Layout",
    questions: [
      "What are the different position values in CSS?",
      "Explain the difference between relative and absolute positioning.",
      "When would you use position: sticky?",
      "What is a positioning context?",
      "How does z-index work and what are the common issues?",
      "How do you create a fixed header that stays at the top?",
      "What happens when multiple elements have position: fixed?",
      "How do you center an absolutely positioned element?",
      "What is the difference between position: fixed and position: sticky?",
      "How do you create a stacking context in CSS?",
    ],
  },
  {
    id: "specificity-interview",
    title: "Specificity & Selectors",
    questions: [
      "How is CSS specificity calculated?",
      "What selector has the highest specificity?",
      "When should you use !important and why should you avoid it?",
      "What is the difference between a class and an ID selector?",
      "Explain the difference between :nth-child() and :nth-of-type().",
      "What are attribute selectors and give examples?",
      "How does the :not() pseudo-class work?",
      "What is the :has() selector and why is it called the 'parent selector'?",
      "What is the difference between combinators: descendant (>), adjacent (+), sibling (~)?",
      "How do you select an element that has a specific attribute value?",
    ],
  },
  {
    id: "responsive-interview",
    title: "Responsive Design",
    questions: [
      "What is responsive design and why is it important?",
      "What is the difference between mobile-first and desktop-first approaches?",
      "How do media queries work in CSS?",
      "What are common breakpoints used in responsive design?",
      "What is the viewport meta tag and why is it needed?",
      "How do you make images responsive?",
      "What is the difference between min-width and max-width in media queries?",
      "How do you create a responsive navigation menu?",
      "What are container queries and how are they different from media queries?",
      "How do you test responsive designs on different devices?",
    ],
  },
];

// ─── COMPANY QUESTIONS ───

export const COMPANY_CSS_QUESTIONS = [
  {
    company: "Google Frontend",
    questions: [
      "Explain the CSS cascade and specificity in detail with examples.",
      "How would you create a responsive grid layout without media queries?",
      "Describe how you'd implement a theme system using CSS custom properties.",
      "How does browser rendering work? Explain the critical rendering path.",
      "How do you optimize CSS for performance? What are CSS triggers?",
    ],
  },
  {
    company: "Meta Frontend",
    questions: [
      "How would you implement a dark mode toggle with CSS variables?",
      "Explain the difference between layout, paint, and composite in browser rendering.",
      "How do you create accessible focus styles that work with both mouse and keyboard?",
      "What are CSS containment and how does contain affect performance?",
      "How would you build a design system with reusable CSS components?",
    ],
  },
  {
    company: "Amazon Frontend",
    questions: [
      "How would you create a responsive product card grid for e-commerce?",
      "Explain how you'd implement lazy loading styles for below-the-fold content.",
      "How do you handle different screen sizes and orientations in CSS?",
      "Create a CSS-only carousel or slider component.",
      "How do you ensure consistent spacing in a design system?",
    ],
  },
  {
    company: "Microsoft Frontend",
    questions: [
      "Explain the difference between em, rem, vh, vw, and percentage units with examples.",
      "How would you create a CSS-only modal with proper z-index layering?",
      "What is the prefers-reduced-motion media query and how do you implement it?",
      "How do logical properties improve internationalization support?",
      "Describe how you'd build a cross-browser compatible layout system.",
    ],
  },
  {
    company: "Netflix Frontend",
    questions: [
      "How would you create a CSS-only image gallery with smooth scrolling?",
      "Explain how you'd implement skeleton screens for media cards.",
      "Create a responsive video player interface using CSS Grid.",
      "How would you ensure smooth animations for hover effects on a media grid?",
      "How do you handle loading states and transitions for streaming content?",
    ],
  },
];
