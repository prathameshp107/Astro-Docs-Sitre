// ─── HTML Labs — Interview Topics Data ───

export const HTML_INTERVIEW_TOPICS = [
  {
    id: "html-basics",
    title: "HTML Basics",
    questions: [
      "What is HTML and what does it stand for?",
      "What is the difference between HTML and HTML5?",
      "Explain the basic structure of an HTML document.",
      "What is the purpose of <!DOCTYPE html>?",
      "What are void elements in HTML? Give examples.",
      "What is the difference between block-level and inline elements?",
      "Explain the <head> element and its common children.",
      "What is the purpose of the <meta charset=\"UTF-8\"> tag?",
    ],
  },
  {
    id: "semantic-html",
    title: "Semantic HTML",
    questions: [
      "What is semantic HTML and why is it important?",
      "Name 5 semantic HTML elements and describe their purpose.",
      "What is the difference between <div> and <section>?",
      "When should you use <article> vs <section>?",
      "What is the purpose of the <main> element?",
      "How does semantic HTML help with accessibility?",
      "What is the difference between <b> and <strong>? Between <i> and <em>?",
      "Explain the <figure> and <figcaption> elements.",
    ],
  },
  {
    id: "forms",
    title: "Forms",
    questions: [
      "What attributes does the <form> element take?",
      "Explain the difference between GET and POST methods.",
      "What are the different input types in HTML5?",
      "How do you associate a <label> with an <input>?",
      "What is the purpose of the required attribute?",
      "Explain form validation attributes (pattern, min, max, minlength, etc.).",
      "What is the purpose of <fieldset> and <legend>?",
      "How do you create a dropdown menu in HTML?",
      "What is the difference between radio buttons and checkboxes?",
    ],
  },
  {
    id: "accessibility",
    title: "Accessibility",
    questions: [
      "What is web accessibility (a11y) and why does it matter?",
      "What are the four principles of WCAG?",
      "What is ARIA and when should you use it?",
      "Explain the purpose of aria-label, aria-labelledby, and aria-describedby.",
      "What is the role of alt text in accessibility?",
      "How does keyboard navigation work in HTML?",
      "What is the aria-live attribute used for?",
      "How can you test a website for accessibility?",
    ],
  },
  {
    id: "seo",
    title: "SEO",
    questions: [
      "What is SEO and how does HTML affect it?",
      "Why is the <title> tag important for SEO?",
      "What is a meta description and how does it affect search results?",
      "Explain the importance of heading hierarchy for SEO.",
      "What is Open Graph and how do you implement it?",
      "What is a canonical URL and when would you use it?",
      "How do images affect SEO? What is the role of alt text and file names?",
      "What is structured data (Schema.org) and how does it impact SEO?",
    ],
  },
  {
    id: "html5-features",
    title: "HTML5 Features",
    questions: [
      "What new features were introduced in HTML5?",
      "Explain the <canvas> element and its use cases.",
      "How do <video> and <audio> elements work in HTML5?",
      "What is the difference between localStorage and sessionStorage?",
      "Explain the Geolocation API in HTML5.",
      "What is the Drag and Drop API?",
      "What is the purpose of the <details> and <summary> elements?",
      "What is the sandbox attribute on iframes used for?",
      "Explain the difference between <svg> and <canvas>.",
    ],
  },
];

// ─── COMPANY INTERVIEW QUESTIONS ───

export const COMPANY_QUESTIONS = [
  {
    company: "Google Frontend",
    questions: [
      "Explain semantic HTML and how it improves accessibility and SEO.",
      "How would you structure a complex form with proper labels, validation, and error messages?",
      "What is the Shadow DOM and how does it relate to HTML?",
      "How do you optimize HTML for Core Web Vitals (LCP, CLS, INP)?",
      "Explain the critical rendering path and how HTML parsing works.",
      "How would you implement a responsive image strategy?",
      "What are Web Components and what are their advantages?",
    ],
  },
  {
    company: "Meta Frontend",
    questions: [
      "How do you ensure your HTML is accessible across different devices and screen readers?",
      "Explain the concept of progressive enhancement in HTML.",
      "How would you structure a news feed page with semantic HTML?",
      "What is the purpose of the inert attribute and how does it improve accessibility?",
      "How do you handle internationalization (i18n) in HTML?",
      "Explain the difference between HTML parsing and CSSOM construction.",
    ],
  },
  {
    company: "Amazon Frontend",
    questions: [
      "Design the HTML structure for a product listing page with semantic elements.",
      "How would you create an accessible dropdown navigation menu?",
      "How do you structure forms for e-commerce checkout with proper validation?",
      "What considerations go into building HTML for high-traffic pages?",
      "Explain lazy loading and its implementation in HTML.",
    ],
  },
  {
    company: "Microsoft Frontend",
    questions: [
      "How would you create a cross-browser compatible HTML structure?",
      "Explain the role of DOCTYPE and quirks mode in older browsers.",
      "How do you structure a dashboard layout with HTML?",
      "What is the purpose of HTML templates (<template> tag)?",
      "How do you handle client-side data storage with web storage APIs?",
    ],
  },
  {
    company: "Netflix Frontend",
    questions: [
      "How would you structure a media gallery page with semantic HTML?",
      "Explain how you'd create accessible video controls.",
      "How do you handle different screen sizes with responsive HTML structures?",
      "What performance considerations would you make for media-heavy pages?",
    ],
  },
];
