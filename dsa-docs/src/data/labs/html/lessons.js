// ─── HTML Labs — Lessons Data ───
// 16 Lessons

import { testContains, testRegex } from "./validators.js";

export const HTML_LESSONS = [
  {
    id: "intro-html",
    chapter: 1,
    title: "Introduction to HTML",
    level: "Beginner",
    tags: ["HTML", "Web Basics", "Tags"],
    conceptExplanation: `HTML (HyperText Markup Language) is the standard language for creating web pages. It describes the structure of web content using elements made up of tags.

HTML is NOT a programming language — it's a markup language. Think of it as the skeleton of every website you visit.

Every HTML document follows a basic structure:

\`\`\`html
<!DOCTYPE html>
<html>
  <head>
    <title>Page Title</title>
  </head>
  <body>
    Content goes here
  </body>
</html>
\`\`\`

• <!DOCTYPE html> — Declares this is an HTML5 document
• <html> — The root element of the page
• <head> — Contains metadata (title, links, scripts)
• <body> — Contains visible page content

Tags come in pairs: <tagname>content</tagname>. Some tags are self-closing: <br />, <img />, <input />.`,
    keyRules: [
      "Always start with <!DOCTYPE html> — it tells browsers to use standards mode",
      "Every page needs <html>, <head>, and <body> elements",
      "Tags must be properly nested — close the most recent tag first",
      "Use lowercase for all HTML tags (convention)",
      "HTML is forgiving — browsers will try to render broken HTML, but don't rely on that",
    ],
    task: `Create a basic HTML page that:
1. Has the correct DOCTYPE declaration
2. Has <html>, <head>, and <body> elements
3. Has a <title> in the head
4. Contains a heading (<h1>) saying "Welcome to HTML"
5. Contains a paragraph (<p>) introducing yourself
6. Contains a line break (<br>) somewhere`,
    starterCode: `<!-- Your first HTML page -->
<!DOCTYPE html>
<html>
  <head>
    <title>My First Page</title>
  </head>
  <body>
    
  </body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My First Page</title>
  </head>
  <body>
    <h1>Welcome to HTML</h1>
    <p>Hi! I'm learning HTML and this is my first webpage.</p>
    <p>I'm excited to learn more about<br>web development!</p>
  </body>
</html>`,
    hint: "Start with <!DOCTYPE html> on line 1. Then <html> wraps everything. Inside <body> is where your visible content goes.",
    tests: [
      { name: "DOCTYPE declaration present", validate: testContains("<!DOCTYPE html>") },
      { name: "<html> element present", validate: testContains("<html") },
      { name: "<head> element present", validate: testContains("<head>") },
      { name: "<body> element present", validate: testContains("<body>") },
      { name: "<title> element present", validate: testContains("<title>") },
      { name: "<h1> element present", validate: testContains("<h1") },
      { name: "<p> element present", validate: testContains("<p>") || testContains("<p ") },
      { name: "<br> or <br /> present", validate: testContains("<br") },
    ],
  },
  {
    id: "document-structure",
    chapter: 2,
    title: "HTML Document Structure",
    level: "Beginner",
    tags: ["DOCTYPE", "html", "head", "body", "meta", "charset"],
    conceptExplanation: `A proper HTML document has a specific structure that browsers expect.

**The DOCTYPE Declaration:**
\`\`\`html
<!DOCTYPE html>   <!-- HTML5 -->
\`\`\`
Always the very first line. It tells the browser to render in standards mode.

**The <html> Element:**
The root element. Add a lang attribute for accessibility and SEO:
\`\`\`html
<html lang="en">
\`\`\`

**The <head> Element:**
Contains metadata — information about the page that isn't displayed:
\`\`\`html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Page description for SEO" />
  <title>My Awesome Page</title>
  <link rel="stylesheet" href="styles.css" />
</head>
\`\`\`

**The <body> Element:**
Contains everything visible to the user. You can also set attributes:
\`\`\`html
<body>
  <!-- All visible content goes here -->
</body>
\`\`\`

**Comments:**
\`\`\`html
<!-- This is a comment — not visible on the page -->
\`\`\``,
    keyRules: [
      "Always use <!DOCTYPE html> as the very first line (no spaces before it)",
      "Add lang=\"en\" (or your language) to the <html> tag for accessibility",
      "Include <meta charset=\"UTF-8\"> for proper character encoding",
      "Include <meta name=\"viewport\"> for responsive mobile rendering",
      "Use comments <!-- --> to document sections of your code",
    ],
    task: `Build a complete HTML document that:
1. Has <!DOCTYPE html> on line 1
2. Has <html lang="en">
3. Includes charset and viewport meta tags in <head>
4. Has a descriptive <title>
5. Has a <meta name="description"> tag
6. The <body> contains a main heading and two paragraphs
7. Includes an HTML comment explaining a section`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  
</head>
<body>
  
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="A sample page demonstrating HTML document structure" />
  <title>My Complete HTML Document</title>
</head>
<body>
  <!-- Main content section -->
  <h1>Learning HTML Structure</h1>
  <p>This page demonstrates a complete, well-structured HTML document with all required elements.</p>
  <p>It includes meta tags, a proper title, and semantic structure.</p>
</body>
</html>`,
    hint: "Meta tags go inside <head>. The charset meta should be <meta charset=\"UTF-8\">. Viewport: <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
    tests: [
      { name: "<!DOCTYPE html> on line 1", validate: (c) => c.trim().startsWith("<!DOCTYPE html>") },
      { name: "<html lang=\"en\"> present", validate: testContains('html lang="en"') || testContains("html lang='en'") },
      { name: "Charset meta present", validate: testContains("charset") },
      { name: "Viewport meta present", validate: testContains("viewport") },
      { name: "Description meta present", validate: testContains("description") },
      { name: "<title> present", validate: testContains("<title>") },
      { name: "HTML comment present", validate: testContains("<!--") && testContains("-->") },
    ],
  },
  {
    id: "headings-paragraphs",
    chapter: 3,
    title: "Headings & Paragraphs",
    level: "Beginner",
    tags: ["h1-h6", "p", "Headings", "Paragraphs", "Text"],
    conceptExplanation: `HTML provides six levels of headings and paragraphs for text content.

**Headings (<h1> to <h6>):**
\`\`\`html
<h1>Main Title — One per page</h1>
<h2>Section Heading</h2>
<h3>Sub-section Heading</h3>
<h4>Sub-sub-section</h4>
<h5>Minor heading</h5>
<h6>Smallest heading</h6>
\`\`\`

<h1> is the most important, <h6> the least. Search engines use headings to understand page structure.

**Paragraphs (<p>):**
\`\`\`html
<p>This is a paragraph of text. Paragraphs automatically have spacing before and after.</p>
<p>Each paragraph is a block-level element, meaning it takes up its own line.</p>
\`\`\`

**Text Formatting Elements:**
\`\`\`html
<strong>Bold/Important text</strong>
<em>Italic/Emphasized text</em>
<mark>Highlighted text</mark>
<small>Smaller text</small>
<del>Deleted/strikethrough text</del>
<ins>Inserted/underlined text</ins>
<sub>Subscript</sub> and <sup>Superscript</sup>
\`\`\``,
    keyRules: [
      "Only ONE <h1> per page — it's the main heading",
      "Use headings in hierarchical order — don't skip from <h2> to <h4>",
      "Headings are for structure, not just making text big or bold",
      "Use <strong> and <em> instead of <b> and <i> for semantic meaning",
      "Keep paragraphs focused — one main idea per paragraph",
    ],
    task: `Create a page that:
1. Has a single <h1> as the main title
2. Has at least two <h2> section headings
3. Has one <h3> under an <h2>
4. Has at least three <p> paragraphs
5. Uses <strong> in one paragraph
6. Uses <em> in another paragraph
7. Uses <mark> to highlight some text`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Headings & Paragraphs</title>
</head>
<body>
  
  
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Headings & Paragraphs</title>
</head>
<body>
  <h1>Learning About Headings</h1>
  
  <h2>Why Headings Matter</h2>
  <p>Headings help organize content and improve <strong>accessibility</strong> for screen reader users.</p>
  
  <h3>Heading Hierarchy</h3>
  <p>Using headings in order creates a clear <em>document outline</em>.</p>
  
  <h2>Text Formatting</h2>
  <p>You can <mark>highlight</mark> important text, make things <strong>bold</strong>, or add <em>emphasis</em>.</p>
  <p>This is a simple paragraph with various text formatting options.</p>
</body>
</html>`,
    hint: "<h1> is your main title. Use <h2> for major sections. <strong> makes text bold semantically. <em> italicizes. <mark> highlights like a yellow marker.",
    tests: [
      { name: "Exactly one <h1> element", validate: (c) => (c.match(/<h1[^>]*>/g) || []).length === 1 },
      { name: "At least two <h2> elements", validate: (c) => (c.match(/<h2[^>]*>/g) || []).length >= 2 },
      { name: "At least one <h3> element", validate: testContains("<h3") },
      { name: "At least three <p> elements", validate: (c) => (c.match(/<p[^>]*>/g) || []).length >= 3 },
      { name: "<strong> used for importance", validate: testContains("<strong") },
      { name: "<em> used for emphasis", validate: testContains("<em>") },
      { name: "<mark> used for highlighting", validate: testContains("<mark>") },
    ],
  },
  {
    id: "links-navigation",
    chapter: 4,
    title: "Links & Navigation",
    level: "Beginner",
    tags: ["a", "href", "Navigation", "Links", "target"],
    conceptExplanation: `Links are the foundation of the web — they connect pages together.

**The Anchor Tag (<a>):**
\`\`\`html
<!-- Basic link -->
<a href="https://example.com">Visit Example</a>

<!-- Link to another page on your site -->
<a href="/about">About Us</a>

<!-- Link to a specific section (id) -->
<a href="#contact">Jump to Contact</a>

<!-- Open in new tab -->
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  Open in New Tab
</a>

<!-- Email link -->
<a href="mailto:hello@example.com">Send Email</a>
\`\`\`

**Navigation with <nav>:**
\`\`\`html
<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/contact">Contact</a>
</nav>
\`\`\`

**Link Attributes:**
• href — The URL the link points to (required)
• target="_blank" — Opens in new tab/window
• rel="noopener noreferrer" — Security for external links (always use with target="_blank")`,
    keyRules: [
      "Always use meaningful link text — never 'click here'",
      "Use target=\"_blank\" for external links with rel=\"noopener noreferrer\"",
      "Use the <nav> element to wrap navigation links",
      "Use #id to link to elements on the same page",
      "Use mailto: for email links, tel: for phone numbers",
    ],
    task: `Create a navigation page that:
1. Has a <nav> with links to Home, About, and Contact sections
2. Uses id attributes to make sections linkable
3. Has an external link to https://developer.mozilla.org that opens in a new tab
4. Has an email link using mailto:
5. Includes a "Back to top" link using #`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Links & Navigation</title>
</head>
<body>
  
  
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Links & Navigation</title>
</head>
<body>
  <nav>
    <a href="#home">Home</a>
    <a href="#about">About</a>
    <a href="#contact">Contact</a>
    <a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer">MDN Docs</a>
    <a href="mailto:hello@example.com">Email Me</a>
  </nav>

  <section id="home">
    <h1>Welcome to My Site</h1>
    <p>This is the home section. Use the navigation to explore.</p>
  </section>

  <section id="about">
    <h2>About</h2>
    <p>I'm learning HTML links and navigation.</p>
    <a href="#top">Back to top</a>
  </section>

  <section id="contact">
    <h2>Contact</h2>
    <p>Email: <a href="mailto:hello@example.com">hello@example.com</a></p>
  </section>
</body>
</html>`,
    hint: "Use <a href=\"url\">text</a> for links. Add target=\"_blank\" and rel=\"noopener noreferrer\" for external links. Use id=\"name\" and href=\"#name\" for same-page links.",
    tests: [
      { name: "<nav> element present", validate: testContains("<nav") },
      { name: "Links with href present", validate: (c) => (c.match(/href=/g) || []).length >= 3 },
      { name: "External link with target=\"_blank\"", validate: testContains('target="_blank"') || testContains("target='_blank'") },
      { name: "mailto: link present", validate: testContains("mailto:") },
      { name: "Same-page link with #", validate: testContains('href="#') || testContains("href='#") },
      { name: "id attributes present on sections", validate: testContains('id="') },
    ],
  },
  {
    id: "images-media",
    chapter: 5,
    title: "Images & Media",
    level: "Beginner",
    tags: ["img", "alt", "figure", "figcaption", "picture"],
    conceptExplanation: `Images make web pages visually engaging and informative.

**The <img> Element:**
\`\`\`html
<img src="photo.jpg" alt="Description of the photo" />
\`\`\`

**Key Attributes:**
• src — Path to the image file (required)
• alt — Alternative text for accessibility (required)
• width / height — Dimensions (maintains aspect ratio)
• loading="lazy" — Defer loading until the image is near the viewport

**<figure> and <figcaption>:**
\`\`\`html
<figure>
  <img src="diagram.png" alt="Architecture diagram" />
  <figcaption>Figure 1: System Architecture</figcaption>
</figure>
\`\`\`

**The <picture> Element (Responsive Images):**
\`\`\`html
<picture>
  <source srcset="image.webp" type="image/webp" />
  <source srcset="image.jpg" type="image/jpeg" />
  <img src="image.jpg" alt="Description" />
</picture>
\`\`\`

**Supported Image Formats:**
• JPEG — Photos, complex images (lossy)
• PNG — Graphics, transparency (lossless)
• GIF — Animations
• SVG — Icons, logos, illustrations (scalable vector)
• WebP — Modern format, better compression`,
    keyRules: [
      "ALWAYS include alt text — it's required for accessibility",
      "Describe the image content, not just 'image' or 'photo'",
      "Use width and height to prevent layout shift (CLS)",
      "Use loading=\"lazy\" for images below the fold",
      "Use SVGs for icons and logos — they scale perfectly",
      "Use <figure> + <figcaption> for images that need captions",
    ],
    task: `Create a page that:
1. Contains at least two images (use placeholder URLs like picsum.photos)
2. Has descriptive alt text for each image
3. Uses <figure> and <figcaption> for one image
4. Sets width and height attributes on images
5. Adds loading="lazy" to one image`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Images & Media</title>
</head>
<body>
  <h1>My Image Gallery</h1>
  
  
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Images & Media</title>
</head>
<body>
  <h1>My Image Gallery</h1>

  <figure>
    <img
      src="https://picsum.photos/400/300"
      alt="A randomly generated beautiful landscape"
      width="400"
      height="300"
    />
    <figcaption>A beautiful random landscape</figcaption>
  </figure>

  <img
    src="https://picsum.photos/200/150"
    alt="A small random abstract image"
    width="200"
    height="150"
    loading="lazy"
  />

  <p>Images make web pages more engaging and visually appealing.</p>
</body>
</html>`,
    hint: "Use <img src=\"url\" alt=\"description\"> for images. Wrap in <figure> with <figcaption> for captions. Set width and height explicitly.",
    tests: [
      { name: "At least two <img> elements", validate: (c) => (c.match(/<img/g) || []).length >= 2 },
      { name: "alt attribute on images", validate: (c) => (c.match(/alt=/g) || []).length >= 2 },
      { name: "<figure> element present", validate: testContains("<figure") },
      { name: "<figcaption> present", validate: testContains("<figcaption") },
      { name: "width and height attributes", validate: testContains("width=") && testContains("height=") },
    ],
  },
  {
    id: "lists",
    chapter: 6,
    title: "Lists",
    level: "Beginner",
    tags: ["ul", "ol", "li", "dl", "Description Lists"],
    conceptExplanation: `HTML provides three types of lists for organizing content.

**Unordered Lists (<ul>) — Bullet points:**
\`\`\`html
<ul>
  <li>Apples</li>
  <li>Bananas</li>
  <li>Oranges</li>
</ul>
\`\`\`

**Ordered Lists (<ol>) — Numbered items:**
\`\`\`html
<ol>
  <li>First step</li>
  <li>Second step</li>
  <li>Third step</li>
</ol>
\`\`\`

Ordered lists have useful attributes:
• type="A" — Uppercase letters (A, B, C)
• type="a" — Lowercase letters
• type="I" — Roman numerals
• start="5" — Start from a specific number

**Description Lists (<dl>):**
\`\`\`html
<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language — structures web content</dd>
  <dt>CSS</dt>
  <dd>Cascading Style Sheets — styles web content</dd>
</dl>
\`\`\`

**Nested Lists:**
\`\`\`html
<ul>
  <li>Fruits
    <ul>
      <li>Apples</li>
      <li>Oranges</li>
    </ul>
  </li>
  <li>Vegetables</li>
</ul>
\`\`\``,
    keyRules: [
      "Use <ul> for items where order doesn't matter (bulleted lists)",
      "Use <ol> for steps, rankings, or items where order matters",
      "Use <dl> for key-value pairs like glossaries or metadata",
      "Lists can be nested — just put a new <ul>/<ol> inside an <li>",
      "Use CSS list-style-type to customize bullet/number appearance",
    ],
    task: `Create a page that:
1. An unordered list of your top 5 favorite things
2. An ordered list of steps to make tea/coffee (at least 4 steps)
3. A description list with at least 3 terms and definitions
4. A nested list (list inside a list)`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>HTML Lists</title>
</head>
<body>
  <h1>Learning About Lists</h1>
  
  
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>HTML Lists</title>
</head>
<body>
  <h1>Learning About Lists</h1>

  <h2>My Favorite Things</h2>
  <ul>
    <li>Coding</li>
    <li>Reading</li>
    <li>Music</li>
    <li>Travel</li>
    <li>Photography</li>
  </ul>

  <h2>How to Make Tea</h2>
  <ol>
    <li>Boil water</li>
    <li>Place tea bag in cup</li>
    <li>Pour hot water into cup</li>
    <li>Let steep for 3 minutes</li>
    <li>Remove tea bag and enjoy</li>
  </ol>

  <h2>Web Development Terms</h2>
  <dl>
    <dt>HTML</dt>
    <dd>Structure of web pages</dd>
    <dt>CSS</dt>
    <dd>Styling and layout</dd>
    <dt>JavaScript</dt>
    <dd>Interactivity and logic</dd>
  </dl>

  <h2>Nested List</h2>
  <ul>
    <li>Frontend
      <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
      </ul>
    </li>
    <li>Backend
      <ul>
        <li>Node.js</li>
        <li>Python</li>
      </ul>
    </li>
  </ul>
</body>
</html>`,
    hint: "<ul> for bullet lists, <ol> for numbered lists, <dl> for term-definition pairs. Nest lists by putting a new <ul> or <ol> inside an <li>.",
    tests: [
      { name: "<ul> element present", validate: testContains("<ul") },
      { name: "<ol> element present", validate: testContains("<ol") },
      { name: "<dl> element present", validate: testContains("<dl") },
      { name: "<dt> and <dd> present", validate: testContains("<dt") && testContains("<dd") },
      { name: "Nested list present", validate: (c) => {
        const ulCount = (c.match(/<ul/g) || []).length;
        return ulCount >= 2;
      }},
    ],
  },
  {
    id: "tables",
    chapter: 7,
    title: "Tables",
    level: "Beginner",
    tags: ["table", "thead", "tbody", "tr", "th", "td", "colspan"],
    conceptExplanation: `HTML tables display data in rows and columns.

**Basic Table Structure:**
\`\`\`html
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Age</th>
      <th>City</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Alice</td>
      <td>25</td>
      <td>New York</td>
    </tr>
    <tr>
      <td>Bob</td>
      <td>30</td>
      <td>London</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="2">Total People</td>
      <td>2</td>
    </tr>
  </tfoot>
</table>
\`\`\`

**Table Elements:**
• <caption> — Table title/description
• <thead> — Header section (column titles)
• <tbody> — Main data rows
• <tfoot> — Footer section (summaries)
• <tr> — Table row
• <th> — Header cell (bold, centered by default)
• <td> — Data cell

**Spanning Columns/Rows:**
• colspan="2" — Merges two columns
• rowspan="2" — Merges two rows`,
    keyRules: [
      "Use <thead>, <tbody>, <tfoot> for proper structure and accessibility",
      "Use <th> for header cells, <td> for data cells",
      "Use <caption> to describe the table's purpose",
      "Use colspan and rowspan sparingly — they can be confusing",
      "Tables are for tabular DATA, not page layout",
    ],
    task: `Create a table that:
1. Has a <caption> describing the table
2. Has <thead> with column headers: Name, Subject, Grade
3. Has <tbody> with at least 4 rows of data
4. Uses colspan to merge cells in one row (e.g., "Average" spanning 2 columns)
5. Has a <tfoot> with a summary row`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>HTML Tables</title>
</head>
<body>
  <h1>Student Grades</h1>
  
  
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>HTML Tables</title>
</head>
<body>
  <h1>Student Grades</h1>

  <table>
    <caption>Student Grade Report — Fall 2024</caption>
    <thead>
      <tr>
        <th>Name</th>
        <th>Subject</th>
        <th>Grade</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Alice</td>
        <td>Mathematics</td>
        <td>A</td>
      </tr>
      <tr>
        <td>Bob</td>
        <td>Science</td>
        <td>B+</td>
      </tr>
      <tr>
        <td>Charlie</td>
        <td>History</td>
        <td>A-</td>
      </tr>
      <tr>
        <td>Diana</td>
        <td>Art</td>
        <td>B</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="2">Total Students</td>
        <td>4</td>
      </tr>
    </tfoot>
  </table>
</body>
</html>`,
    hint: "Start with <table>, then <thead> with <th> cells. Use <tbody> for data rows with <td> cells. colspan=\"2\" merges 2 columns into one.",
    tests: [
      { name: "<caption> element present", validate: testContains("<caption") },
      { name: "<thead> element present", validate: testContains("<thead") },
      { name: "<tbody> element present", validate: testContains("<tbody") },
      { name: "<tfoot> element present", validate: testContains("<tfoot") },
      { name: "At least 4 rows in tbody", validate: (c) => {
        const tbodyContent = c.split("<tbody>")[1]?.split("</tbody>")[0] || "";
        return (tbodyContent.match(/<tr/g) || []).length >= 4;
      }},
      { name: "colspan attribute used", validate: testContains("colspan") },
    ],
  },
  {
    id: "forms",
    chapter: 8,
    title: "Forms",
    level: "Intermediate",
    tags: ["form", "input", "textarea", "select", "button", "label"],
    conceptExplanation: `Forms collect user input and send it to servers.

**Form Structure:**
\`\`\`html
<form action="/submit" method="POST">
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" required />

  <label for="email">Email:</label>
  <input type="email" id="email" name="email" />

  <label for="message">Message:</label>
  <textarea id="message" name="message" rows="4"></textarea>

  <button type="submit">Send</button>
</form>
\`\`\`

**Input Types:**
• text — Single line text
• email — Email address (with validation)
• password — Hidden characters
• number — Numeric input
• tel — Telephone number
• url — Website URL
• date — Date picker
• checkbox — Multiple choices
• radio — Single choice from options
• file — File upload
• range — Slider control
• color — Color picker

**Form Attributes:**
• required — Field must be filled
• placeholder — Hint text inside the field
• disabled — Field cannot be interacted with
• readonly — Field value cannot be changed
• min / max — Range limits for numbers/dates
• pattern — Regex validation

**Labels:**
Always use <label> with for attribute matching the input's id for accessibility.`,
    keyRules: [
      "Every input should have a <label> for accessibility",
      "Use the correct type attribute (email, number, etc.) for validation",
      "Use required for mandatory fields",
      "Group related inputs with <fieldset> and <legend>",
      "Use <button type=\"submit\"> not <input type=\"submit\"> for better styling",
    ],
    task: `Create a contact form that:
1. Has fields for: name (text), email, subject (select dropdown), message (textarea)
2. Each field has a proper <label>
3. Name and email are required
4. Uses <fieldset> and <legend> to group the fields
5. Has a submit <button>
6. Has a checkbox for "Subscribe to newsletter"`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Contact Form</title>
</head>
<body>
  <h1>Contact Us</h1>
  
  
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Contact Form</title>
</head>
<body>
  <h1>Contact Us</h1>

  <form action="#" method="POST">
    <fieldset>
      <legend>Your Information</legend>

      <label for="name">Full Name:</label>
      <input type="text" id="name" name="name" required placeholder="John Doe" />

      <label for="email">Email Address:</label>
      <input type="email" id="email" name="email" required placeholder="john@example.com" />

      <label for="subject">Subject:</label>
      <select id="subject" name="subject">
        <option value="">Select a subject</option>
        <option value="general">General Inquiry</option>
        <option value="support">Technical Support</option>
        <option value="feedback">Feedback</option>
      </select>

      <label for="message">Message:</label>
      <textarea id="message" name="message" rows="5" placeholder="Write your message here..."></textarea>

      <label>
        <input type="checkbox" name="newsletter" />
        Subscribe to our newsletter
      </label>

      <button type="submit">Send Message</button>
    </fieldset>
  </form>
</body>
</html>`,
    hint: "Use <form> with action and method. Each input needs a <label for=\"id\"> matching the input's id. Use required for mandatory fields. <fieldset> + <legend> groups related fields.",
    tests: [
      { name: "<form> element present", validate: testContains("<form") },
      { name: "Text input with label", validate: testContains('type="text"') || testContains("type='text'") },
      { name: "Email input with label", validate: testContains('type="email"') || testContains("type='email'") },
      { name: "Select dropdown present", validate: testContains("<select") },
      { name: "Textarea present", validate: testContains("<textarea") },
      { name: "<fieldset> and <legend> present", validate: testContains("<fieldset") && testContains("<legend") },
      { name: "Submit button present", validate: testContains('type="submit"') || testContains("type='submit'") },
      { name: "Checkbox present", validate: testContains('type="checkbox"') || testContains("type='checkbox'") },
    ],
  },
  {
    id: "semantic-html",
    chapter: 9,
    title: "Semantic HTML",
    level: "Intermediate",
    tags: ["Semantic", "header", "nav", "main", "section", "article", "aside", "footer"],
    conceptExplanation: `Semantic HTML uses meaningful elements that describe their content, making code more readable and accessible.

**Semantic Elements vs Non-Semantic:**
\`\`\`html
<!-- Bad: No meaning -->
<div class="header">Site Title</div>
<div class="nav">Links here</div>

<!-- Good: Self-describing -->
<header>Site Title</header>
<nav>Links here</nav>
\`\`\`

**Key Semantic Elements:**
• <header> — Introductory content, logo, navigation
• <nav> — Navigation links
• <main> — Primary content (unique to the page)
• <section> — Thematic group of content
• <article> — Self-contained composition (blog post, news article)
• <aside> — Tangentially related content (sidebar, callouts)
• <footer> — Footer information (copyright, links)
• <figure> + <figcaption> — Media with caption

**Page Structure Example:**
\`\`\`html
<body>
  <header>
    <nav>...</nav>
  </header>
  <main>
    <article>
      <section>...</section>
    </article>
    <aside>...</aside>
  </main>
  <footer>...</footer>
</body>
\`\`\`

Benefits: Better SEO, better accessibility, cleaner code.`,
    keyRules: [
      "Use <main> for the primary content — only one per page",
      "Use <nav> for navigation links, not every group of links",
      "Each <article> should make sense on its own (RSS feed friendly)",
      "Use <section> with a heading (<h1>-<h6>) whenever possible",
      "Don't use <div> when a semantic element exists",
      "Use <aside> for content that's related but not essential",
    ],
    task: `Create a blog-style page using semantic elements that:
1. Has a <header> with a site title and <nav> with 3 links
2. Has a <main> element containing:
   - An <article> with a blog post (heading, paragraphs)
   - An <aside> with related links
3. Has a <footer> with copyright info
4. Uses <section> inside the article to organize content`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Semantic HTML</title>
</head>
<body>
  
  
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Semantic HTML Blog</title>
</head>
<body>
  <header>
    <h1>My Semantic Blog</h1>
    <nav>
      <a href="#">Home</a>
      <a href="#">Articles</a>
      <a href="#">About</a>
    </nav>
  </header>

  <main>
    <article>
      <h2>Why Semantic HTML Matters</h2>
      
      <section>
        <h3>Better Accessibility</h3>
        <p>Screen readers use semantic elements to navigate pages. A <main> element lets users skip to the primary content.</p>
      </section>
      
      <section>
        <h3>Improved SEO</h3>
        <p>Search engines understand semantic structure better, which can improve your search rankings.</p>
      </section>
    </article>

    <aside>
      <h3>Related Articles</h3>
      <ul>
        <li><a href="#">Introduction to HTML</a></li>
        <li><a href="#">HTML Forms Guide</a></li>
        <li><a href="#">Accessibility Best Practices</a></li>
      </ul>
    </aside>
  </main>

  <footer>
    <p>&copy; 2024 My Semantic Blog. All rights reserved.</p>
  </footer>
</body>
</html>`,
    hint: "Think about the meaning of your content. <header> for top content, <main> for primary content, <article> for self-contained pieces, <aside> for side content, <footer> for bottom info.",
    tests: [
      { name: "<header> element present", validate: testContains("<header") },
      { name: "<nav> element present", validate: testContains("<nav") },
      { name: "<main> element present", validate: testContains("<main") },
      { name: "<article> element present", validate: testContains("<article") },
      { name: "<aside> element present", validate: testContains("<aside") },
      { name: "<footer> element present", validate: testContains("<footer") },
      { name: "<section> element present", validate: testContains("<section") },
    ],
  },
  {
    id: "accessibility-basics",
    chapter: 10,
    title: "Accessibility Basics",
    level: "Intermediate",
    tags: ["A11y", "ARIA", "alt", "role", "tabindex", "Screen Readers"],
    conceptExplanation: `Web accessibility (a11y) ensures websites are usable by everyone, including people with disabilities.

**Why Accessibility Matters:**
• 15% of the world's population has some form of disability
• It's required by law in many countries (ADA, WCAG, EN 301 549)
• Accessible sites rank better in search engines
• Better UX for ALL users

**ARIA (Accessible Rich Internet Applications):**
\`\`\`html
<!-- Adding roles to non-semantic elements -->
<div role="button" tabindex="0" onclick="submit()">Submit</div>

<!-- Describing elements -->
<button aria-label="Close dialog">X</button>

<!-- Live regions for dynamic content -->
<div aria-live="polite">New message received!</div>

<!-- Expanded states -->
<button aria-expanded="false" aria-controls="menu">Menu</button>
\`\`\`

**Accessibility Principles:**
1. **Perceivable** — Information must be presentable to all senses
2. **Operable** — All functionality must be available via keyboard
3. **Understandable** — Content and UI must be understandable
4. **Robust** — Content must work with current/future technologies

**Keyboard Navigation:**
\`\`\`html
<!-- tabindex controls focus order -->
<div tabindex="0">Focusable element</div>
<div tabindex="-1">Programmatically focusable only</div>
\`\`\``,
    keyRules: [
      "Always provide alt text for images",
      "Use semantic HTML instead of ARIA (it's built-in accessibility)",
      "Ensure all interactive elements are keyboard accessible",
      "Use proper heading hierarchy (h1 → h2 → h3, no skipping)",
      "Use sufficient color contrast (WCAG AA: 4.5:1 for normal text)",
      "Use aria-label when visible label text isn't possible",
    ],
    task: `Create an accessible page that:
1. Has proper semantic structure (header, main, footer)
2. All images have descriptive alt text
3. Has a button with aria-label
4. Has proper form labels
5. Uses a role attribute on a non-semantic element
6. Has aria-live region for dynamic content`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Accessibility Basics</title>
</head>
<body>
  <header>
    <h1>Accessible Web</h1>
  </header>
  
  <main>
    
  </main>
  
  <footer>
    <p>&copy; 2024 Accessible Web</p>
  </footer>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Accessibility Basics</title>
</head>
<body>
  <header>
    <h1>Accessible Web</h1>
    <nav aria-label="Main navigation">
      <a href="#">Home</a>
      <a href="#">About</a>
    </nav>
  </header>
  
  <main>
    <img src="https://picsum.photos/300/200" alt="A randomly generated scenic landscape showing nature" />
    
    <form>
      <label for="email">Email address:</label>
      <input type="email" id="email" name="email" required />
      
      <button type="submit" aria-label="Submit the form">Submit</button>
    </form>
    
    <div role="status" aria-live="polite">
      Form is ready for input.
    </div>
  </main>
  
  <footer>
    <p>&copy; 2024 Accessible Web</p>
  </footer>
</body>
</html>`,
    hint: "Use aria-label for buttons without visible text. Role=\"button\" on divs that act as buttons. aria-live=\"polite\" for status updates. Every form input needs a label.",
    tests: [
      { name: "alt attribute on image", validate: testContains('alt="') || testContains("alt='") },
      { name: "aria-label attribute used", validate: testContains("aria-label") },
      { name: "Proper form labels with for attribute", validate: testContains('for="') || testContains("for='") },
      { name: "role attribute used", validate: testContains('role="') || testContains("role='") },
      { name: "aria-live region present", validate: testContains("aria-live") },
      { name: "<nav> element present", validate: testContains("<nav") },
    ],
  },
  {
    id: "audio-video",
    chapter: 11,
    title: "Audio & Video",
    level: "Intermediate",
    tags: ["audio", "video", "controls", "source", "media"],
    conceptExplanation: `HTML5 made embedding media simple with native <audio> and <video> elements.

**The <video> Element:**
\`\`\`html
<video controls width="640" height="360">
  <source src="movie.mp4" type="video/mp4" />
  <source src="movie.webm" type="video/webm" />
  <p>Your browser doesn't support video. <a href="movie.mp4">Download it</a>.</p>
</video>
\`\`\`

**The <audio> Element:**
\`\`\`html
<audio controls>
  <source src="song.mp3" type="audio/mpeg" />
  <source src="song.ogg" type="audio/ogg" />
  <p>Your browser doesn't support audio.</p>
</audio>
\`\`\`

**Important Attributes:**
• controls — Shows play/pause/volume controls
• autoplay — Starts playing automatically (use sparingly)
• loop — Repeats the media
• muted — Starts muted (required for autoplay in most browsers)
• preload — "none", "metadata", or "auto" (loading behavior)
• poster — Thumbnail image for video (before play)

**Supported Formats:**
• Video: MP4 (H.264), WebM (VP9), Ogg (Theora)
• Audio: MP3, AAC, Ogg Vorbis, WAV

Always provide multiple source formats and a fallback message.`,
    keyRules: [
      "Always include the controls attribute for user control",
      "Never use autoplay with sound — use autoplay + muted or don't autoplay at all",
      "Provide multiple source formats (MP4 + WebM for video, MP3 + OGG for audio)",
      "Include fallback text between <video>/<audio> tags for unsupported browsers",
      "Use the poster attribute for video thumbnails",
    ],
    task: `Create a media page that:
1. Has a <video> element with controls
2. Has an <audio> element with controls
3. Uses the poster attribute on the video
4. Sets width and height on the video
5. Includes fallback text for both elements`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Audio & Video</title>
</head>
<body>
  <h1>Media Playground</h1>
  
  
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Audio & Video</title>
</head>
<body>
  <h1>Media Playground</h1>

  <h2>Video Example</h2>
  <video controls width="640" height="360" poster="https://picsum.photos/640/360">
    <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
    <p>Your browser doesn't support video. <a href="https://www.w3schools.com/html/mov_bbb.mp4">Download the video</a>.</p>
  </video>

  <h2>Audio Example</h2>
  <audio controls>
    <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg" />
    <p>Your browser doesn't support audio. <a href="https://www.w3schools.com/html/horse.mp3">Download the audio</a>.</p>
  </audio>
</body>
</html>`,
    hint: "Use <video controls> with <source> child elements. Add poster for thumbnail. <audio controls> works the same way. Always provide fallback text.",
    tests: [
      { name: "<video> element present", validate: testContains("<video") },
      { name: "<audio> element present", validate: testContains("<audio") },
      { name: "controls attribute on video", validate: testContains("controls") },
      { name: "controls attribute on audio", validate: (c) => (c.match(/controls/g) || []).length >= 2 },
      { name: "poster attribute on video", validate: testContains("poster") },
      { name: "<source> elements present", validate: testContains("<source") },
    ],
  },
  {
    id: "iframes",
    chapter: 12,
    title: "Iframes",
    level: "Intermediate",
    tags: ["iframe", "embed", "sandbox", "Embedded Content"],
    conceptExplanation: `Iframes embed another HTML page within your page.

**Basic Iframe:**
\`\`\`html
<iframe src="https://example.com" width="800" height="600" title="Example Site">
  Your browser doesn't support iframes.
</iframe>
\`\`\`

**Common Use Cases:**
• Embedding YouTube videos
• Google Maps
• Social media posts
• Payment forms (Stripe, PayPal)
• Code playground outputs (CodePen, JSFiddle)

**Security Attributes:**
\`\`\`html
<iframe 
  src="https://www.youtube.com/embed/VIDEO_ID"
  width="560"
  height="315"
  title="YouTube video"
  allowfullscreen
  loading="lazy"
  sandbox="allow-scripts allow-same-origin"
></iframe>
\`\`\`

**Important Iframe Attributes:**
• src — The URL to embed
• title — Required for accessibility (describes content)
• sandbox — Restricts what the iframe can do (security)
• loading="lazy" — Defer loading
• allow — Feature policy (fullscreen, camera, etc.)
• allowfullscreen — Allow fullscreen mode
• referrerpolicy — Control referrer header

**Sandbox Values:**
• allow-scripts — Allows JavaScript
• allow-same-origin — Treat as same origin
• allow-forms — Allows form submission
• allow-popups — Allows popup windows
• allow-modals — Allows modal dialogs
Without sandbox, all restrictions are applied.`,
    keyRules: [
      "Always include a title attribute for accessibility",
      "Use sandbox attribute for security — only enable what's needed",
      "Use loading=\"lazy\" for iframes below the fold",
      "Use width and height to prevent layout shift",
      "Be aware of X-Frame-Options — some sites block iframe embedding",
    ],
    task: `Create a page that:
1. Embeds a YouTube video using an iframe (use any public video)
2. Has the allowfullscreen attribute
3. Has a title for accessibility
4. Uses the sandbox attribute with allow-scripts
5. Has an iframe with loading="lazy"
6. Shows fallback text between the iframe tags`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Iframes</title>
</head>
<body>
  <h1>Embedded Content</h1>
  
  
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Iframes</title>
</head>
<body>
  <h1>Embedded Content</h1>

  <h2>YouTube Video</h2>
  <iframe 
    width="560" 
    height="315" 
    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
    title="YouTube video player"
    allowfullscreen
    sandbox="allow-scripts allow-same-origin allow-presentation"
    loading="lazy"
  >
    <p>Your browser doesn't support iframes.</p>
  </iframe>

  <h2>Local Content</h2>
  <iframe 
    src="https://example.com" 
    width="600" 
    height="200" 
    title="Example website page"
    loading="lazy"
  >
    <p>Iframe content could not be displayed.</p>
  </iframe>
</body>
</html>`,
    hint: "Use <iframe src=\"url\"> with width, height, and title attributes. Add allowfullscreen for videos. Use sandbox for security. loading=\"lazy\" for performance.",
    tests: [
      { name: "<iframe> elements present", validate: testContains("<iframe") },
      { name: "title attribute on iframe", validate: testContains('title="') || testContains("title='") },
      { name: "allowfullscreen attribute", validate: testContains("allowfullscreen") },
      { name: "sandbox attribute present", validate: testContains("sandbox") },
      { name: "loading=\"lazy\" present", validate: testContains('loading="lazy"') || testContains("loading='lazy'") },
    ],
  },
  {
    id: "meta-tags",
    chapter: 13,
    title: "Meta Tags",
    level: "Intermediate",
    tags: ["meta", "OG", "Twitter Cards", "Open Graph", "Social Media"],
    conceptExplanation: `Meta tags provide metadata about a web page — information that isn't displayed but is used by browsers, search engines, and social media platforms.

**Essential Meta Tags:**
\`\`\`html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="A brief description of the page (150-160 chars)" />
<meta name="keywords" content="html, meta tags, web development" />
<meta name="author" content="Your Name" />
<meta name="robots" content="index, follow" />
\`\`\`

**Open Graph (OG) Tags — For Social Media Sharing:**
\`\`\`html
<meta property="og:title" content="Amazing Page Title" />
<meta property="og:description" content="Description shown when shared on Facebook/LinkedIn" />
<meta property="og:image" content="https://example.com/thumbnail.jpg" />
<meta property="og:url" content="https://example.com/page" />
<meta property="og:type" content="website" />
\`\`\`

**Twitter Card Tags:**
\`\`\`html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Title for Twitter" />
<meta name="twitter:description" content="Description for Twitter" />
<meta name="twitter:image" content="https://example.com/image.jpg" />
\`\`\`

**Other Important Meta Tags:**
\`\`\`html
<!-- Theme color for browser UI -->
<meta name="theme-color" content="#6366f1" />

<!-- Prevent indexing -->
<meta name="robots" content="noindex, nofollow" />

<!-- Refresh/redirect -->
<meta http-equiv="refresh" content="30" />

<!-- Canonical URL (prevents duplicate content issues) -->
<link rel="canonical" href="https://example.com/page" />
\`\`\``,
    keyRules: [
      "Every page needs a unique <title> and meta description",
      "Keep descriptions between 150-160 characters for SEO",
      "Always include Open Graph tags for better social sharing",
      "Use the correct og:type (website, article, product, etc.)",
      "og:image should be at least 1200×630 pixels for proper display",
    ],
    task: `Create a page with comprehensive meta tags that:
1. Has charset and viewport meta tags
2. Has a meta description (150-160 chars)
3. Has meta author and keywords
4. Has Open Graph tags (og:title, og:description, og:image, og:url)
5. Has a Twitter card meta tag
6. Has a theme-color meta tag`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Meta Tags Guide</title>
</head>
<body>
  <h1>Understanding Meta Tags</h1>
  <p>Meta tags are essential for SEO and social sharing. Check the head section of this page!</p>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Learn about HTML meta tags: charset, viewport, Open Graph, Twitter Cards, and SEO metadata. Complete guide with examples." />
  <meta name="keywords" content="HTML, meta tags, SEO, Open Graph, Twitter Cards, web development" />
  <meta name="author" content="HTML Learner" />
  <meta name="theme-color" content="#6366f1" />
  
  <meta property="og:title" content="Complete Guide to Meta Tags" />
  <meta property="og:description" content="Master HTML meta tags for better SEO and social media sharing. Includes OG tags, Twitter Cards, and best practices." />
  <meta property="og:image" content="https://example.com/og-image.jpg" />
  <meta property="og:url" content="https://example.com/meta-tags-guide" />
  <meta property="og:type" content="article" />
  
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Complete Guide to Meta Tags" />
  <meta name="twitter:description" content="Master HTML meta tags for better SEO and social media sharing." />
  
  <title>Meta Tags Guide — Complete Reference</title>
</head>
<body>
  <h1>Understanding Meta Tags</h1>
  <p>Meta tags are essential for SEO and social sharing. Check the head section of this page to see all the meta tags!</p>
</body>
</html>`,
    hint: "Meta tags go inside <head>. Use <meta name=\"...\" content=\"...\"> for standard meta. Use <meta property=\"og:...\" content=\"...\"> for Open Graph. Use <meta name=\"twitter:...\" content=\"...\"> for Twitter.",
    tests: [
      { name: "Charset meta tag", validate: testContains("charset") },
      { name: "Viewport meta tag", validate: testContains("viewport") },
      { name: "Description meta tag", validate: testContains('name="description"') || testContains("name='description'") },
      { name: "Open Graph title (og:title)", validate: testContains("og:title") },
      { name: "Open Graph description (og:description)", validate: testContains("og:description") },
      { name: "Open Graph image (og:image)", validate: testContains("og:image") },
      { name: "Twitter card meta tag", validate: testContains("twitter:card") },
    ],
  },
  {
    id: "seo-fundamentals",
    chapter: 14,
    title: "SEO Fundamentals",
    level: "Advanced",
    tags: ["SEO", "Search Engines", "Structured Data", "Semantic HTML"],
    conceptExplanation: `Search Engine Optimization (SEO) improves your website's visibility in search engines.

**Technical SEO Elements:**
\`\`\`html
<!-- Unique title for each page -->
<title>Keyword-Rich Title | Brand Name</title>

<!-- Compelling meta description -->
<meta name="description" content="Engaging description with keywords naturally included." />

<!-- Canonical URL (prevents duplicate content) -->
<link rel="canonical" href="https://example.com/page" />

<!-- Heading hierarchy -->
<h1>Primary Keyword Title</h1>
<h2>Section with Secondary Keywords</h2>
\`\`\`

**Structured Data (Schema.org):**
Help search engines understand your content better:
\`\`\`html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "SEO Fundamentals Guide",
  "description": "Complete guide to SEO best practices",
  "author": { "@type": "Person", "name": "Your Name" },
  "datePublished": "2024-01-15"
}
</script>
\`\`\`

**SEO Best Practices:**
• Use descriptive URLs (example.com/seo-guide not example.com/page?id=5)
• Optimize images with descriptive alt text and filenames
• Use internal links to connect related content
• Ensure fast page load times
• Make your site mobile-friendly
• Use HTTPS for security
• Create an XML sitemap
• Use semantic HTML for proper content structure`,
    keyRules: [
      "Every page needs a unique, descriptive <title> tag under 60 characters",
      "Meta descriptions should be 150-160 characters and include the target keyword",
      "Use only one <h1> per page with the primary keyword",
      "Images need descriptive alt text (helps image search)",
      "Use descriptive link text — never 'click here'",
      "Add canonical URLs to prevent duplicate content issues",
    ],
    task: `Create an SEO-optimized page that:
1. Has a unique title tag (under 60 chars)
2. Has a meta description (150-160 chars)
3. Has proper heading hierarchy (h1 → h2 → h3)
4. Has a canonical URL link tag
5. Has structured data (JSON-LD) for an Article
6. Uses semantic HTML elements`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SEO Basics</title>
</head>
<body>
  
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SEO Fundamentals Guide | Learn SEO Basics</title>
  <meta name="description" content="Master SEO fundamentals with this complete guide. Learn about meta tags, structured data, heading hierarchy, and technical SEO best practices for better rankings." />
  <link rel="canonical" href="https://example.com/seo-fundamentals" />
  
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "SEO Fundamentals Guide",
    "description": "Complete guide to SEO best practices including technical SEO, structured data, and content optimization.",
    "author": {
      "@type": "Person",
      "name": "HTML Learner"
    },
    "datePublished": "2024-01-15"
  }
  </script>
</head>
<body>
  <header>
    <h1>SEO Fundamentals Guide</h1>
    <nav>
      <a href="#">Home</a>
      <a href="#">SEO Guide</a>
      <a href="#">Contact</a>
    </nav>
  </header>

  <main>
    <article>
      <h2>Why SEO Matters</h2>
      <p>SEO helps your website appear higher in search results, driving more organic traffic.</p>
      
      <h3>Technical SEO</h3>
      <p>Technical SEO includes site speed, mobile-friendliness, and proper HTML structure.</p>
      
      <h3>On-Page SEO</h3>
      <p>On-page SEO focuses on content quality, keyword usage, and meta tags.</p>
    </article>
  </main>

  <footer>
    <p>&copy; 2024 SEO Guide</p>
  </footer>
</body>
</html>`,
    hint: "Keep <title> under 60 characters. Meta description between 150-160 chars. Use <link rel=\"canonical\">. Add JSON-LD structured data in a <script type=\"application/ld+json\"> block.",
    tests: [
      { name: "<title> tag present", validate: testContains("<title>") },
      { name: "Meta description present", validate: testContains('name="description"') || testContains("name='description'") },
      { name: "Canonical link present", validate: testContains('rel="canonical"') || testContains("rel='canonical'") },
      { name: "JSON-LD structured data present", validate: testContains("application/ld+json") || testContains('ld+json') },
      { name: "Single <h1> element", validate: (c) => (c.match(/<h1[^>]*>/g) || []).length === 1 },
      { name: "Semantic HTML used", validate: testContains("<header") && testContains("<main") && testContains("<footer") },
    ],
  },
  {
    id: "html5-apis",
    chapter: 15,
    title: "HTML5 APIs",
    level: "Advanced",
    tags: ["Canvas", "LocalStorage", "Geolocation", "Drag and Drop", "Web Storage"],
    conceptExplanation: `HTML5 introduced powerful APIs that enable rich web applications without external plugins.

**Local Storage (Stores data in the browser):**
\`\`\`html
<script>
  // Store data
  localStorage.setItem('theme', 'dark');
  
  // Retrieve data
  const theme = localStorage.getItem('theme');
  
  // Remove data
  localStorage.removeItem('theme');
  
  // Clear all
  localStorage.clear();
</script>
\`\`\`

**Canvas (Drawing graphics with JavaScript):**
\`\`\`html
<canvas id="myCanvas" width="400" height="200"></canvas>
<script>
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'blue';
  ctx.fillRect(10, 10, 150, 100);
</script>
\`\`\`

**Geolocation (User's location):**
\`\`\`html
<script>
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log('Lat:', position.coords.latitude);
      console.log('Lng:', position.coords.longitude);
    },
    (error) => console.error('Error:', error)
  );
</script>
\`\`\`

**Drag and Drop:**
\`\`\`html
<div draggable="true" ondragstart="drag(event)">Drag me</div>
<div ondrop="drop(event)" ondragover="allowDrop(event)">Drop here</div>
\`\`\`

**Session Storage (Same as localStorage but cleared when tab closes):**
\`\`\`html
<script>
  sessionStorage.setItem('temp', 'value');
</script>
\`\`\``,
    keyRules: [
      "LocalStorage persists until explicitly cleared — SessionStorage clears on tab close",
      "Both localStorage and sessionStorage store strings only — use JSON.stringify/parse for objects",
      "Canvas requires JavaScript to draw — it's just a drawing surface in HTML",
      "Geolocation requires user permission — always handle the error case",
      "Drag and Drop requires draggable=\"true\" attribute",
      "Use feature detection before using HTML5 APIs (some browsers may not support them)",
    ],
    task: `Create a demo page that showcases:
1. A <canvas> element with drawing (draw a rectangle and a circle)
2. LocalStorage: save a text input value and display it on page load
3. A draggable element and a drop zone
4. A script that stores and retrieves an object using JSON in localStorage`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>HTML5 APIs</title>
</head>
<body>
  <h1>HTML5 APIs Demo</h1>
  
  
  <script>
    // Your JavaScript here
  </script>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>HTML5 APIs Demo</title>
</head>
<body>
  <h1>HTML5 APIs Demo</h1>

  <h2>Canvas Drawing</h2>
  <canvas id="myCanvas" width="400" height="200" style="border:1px solid #ccc;"></canvas>

  <h2>LocalStorage Example</h2>
  <label for="nameInput">Enter your name:</label>
  <input type="text" id="nameInput" />
  <button onclick="saveName()">Save</button>
  <p id="savedName"></p>

  <h2>Drag & Drop</h2>
  <div id="dragItem" draggable="true" style="width:100px;height:100px;background:#6366f1;color:white;display:flex;align-items:center;justify-content:center;border-radius:8px;cursor:grab;" ondragstart="drag(event)">
    Drag me
  </div>
  <div id="dropZone" style="width:200px;height:150px;border:2px dashed #94a3b8;border-radius:8px;margin-top:8px;display:flex;align-items:center;justify-content:center;color:#94a3b8;" ondrop="drop(event)" ondragover="allowDrop(event)">
    Drop here
  </div>

  <script>
    // Canvas
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#6366f1';
    ctx.fillRect(20, 20, 150, 100);
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.arc(300, 80, 50, 0, Math.PI * 2);
    ctx.fill();

    // LocalStorage
    function saveName() {
      const name = document.getElementById('nameInput').value;
      localStorage.setItem('userName', name);
      displaySavedName();
    }
    function displaySavedName() {
      const saved = localStorage.getItem('userName');
      document.getElementById('savedName').textContent = saved ? 'Saved name: ' + saved : 'No name saved yet.';
    }
    displaySavedName();

    // Save object
    const user = { name: 'Alice', age: 25 };
    localStorage.setItem('user', JSON.stringify(user));
    const loadedUser = JSON.parse(localStorage.getItem('user'));
    console.log('Loaded user:', loadedUser);

    // Drag & Drop
    function drag(ev) { ev.dataTransfer.setData('text', ev.target.id); }
    function allowDrop(ev) { ev.preventDefault(); }
    function drop(ev) {
      ev.preventDefault();
      const data = ev.dataTransfer.getData('text');
      const draggable = document.getElementById(data);
      ev.target.textContent = 'Dropped!';
      ev.target.style.borderColor = '#6366f1';
      ev.target.style.color = '#6366f1';
    }
  </script>
</body>
</html>`,
    hint: "Canvas needs a <canvas> element with id, then JavaScript with getContext('2d'). localStorage uses .setItem() and .getItem(). For drag/drop, set draggable=\"true\" and handle ondragstart, ondragover, ondrop events.",
    tests: [
      { name: "<canvas> element present", validate: testContains("<canvas") },
      { name: "localStorage.setItem used", validate: testContains("localStorage.setItem") || testContains("localStorage.setItem(") },
      { name: "localStorage.getItem used", validate: testContains("localStorage.getItem") || testContains("localStorage.getItem(") },
      { name: "draggable attribute present", validate: testContains('draggable="true"') || testContains("draggable='true'") },
      { name: "Drag/drop event handlers", validate: testContains("ondragstart") || testContains("ondragover") || testContains("ondrop") },
      { name: "JSON.stringify used with localStorage", validate: testContains("JSON.stringify") || testContains("JSON.parse") },
    ],
  },
  {
    id: "best-practices",
    chapter: 16,
    title: "Best Practices",
    level: "Advanced",
    tags: ["Best Practices", "Validation", "Performance", "Security", "Code Quality"],
    conceptExplanation: `Writing clean, maintainable, and performant HTML is a mark of a professional developer.

**Validation First:**
Always validate your HTML using the [W3C Validator](https://validator.w3.org/).
\`\`\`html
<!-- Bad: Missing alt, wrong nesting -->
<img src="photo.jpg" />
<div><p>Text</div></p>

<!-- Good: Valid, accessible -->
<img src="photo.jpg" alt="Description" />
<div><p>Text</p></div>
\`\`\`

**Performance Best Practices:**
\`\`\`html
<!-- Load CSS early in <head> -->
<link rel="stylesheet" href="styles.css" />

<!-- Load JavaScript at the end of <body> or use defer -->
<script src="app.js" defer></script>

<!-- Lazy load below-fold images -->
<img src="photo.jpg" alt="Desc" loading="lazy" />

<!-- Use modern image formats -->
<picture>
  <source srcset="image.webp" type="image/webp" />
  <img src="image.jpg" alt="Desc" />
</picture>
\`\`\`

**Security Best Practices:**
\`\`\`html
<!-- External links: always add rel="noopener noreferrer" -->
<a href="https://external.com" target="_blank" rel="noopener noreferrer">Link</a>

<!-- Iframe sandboxing -->
<iframe sandbox="allow-scripts" src="..."></iframe>

<!-- Prevent XSS: escape user content -->
<!-- Never use innerHTML with user input -->

<!-- Use CSP headers (server-side) -->
<meta http-equiv="Content-Security-Policy" content="default-src 'self'" />
\`\`\`

**Code Quality:**
• Indent properly — consistent spacing helps readability
• Use lowercase for tags and attributes
• Quote all attribute values
• Keep lines under 80-120 characters when possible
• Remove unused code and comments before deployment
• Use meaningful class and id names`,
    keyRules: [
      "Always validate your HTML with the W3C Validator",
      "Use loading=\"lazy\" for images below the fold",
      "Load CSS in <head>, JavaScript at the end of <body> or use defer/async",
      "Always add rel=\"noopener noreferrer\" to external target=\"_blank\" links",
      "Use semantic HTML — it improves accessibility, SEO, and maintainability",
      "Keep your code clean: consistent indentation, meaningful names, remove dead code",
    ],
    task: `Create a well-structured page that demonstrates best practices:
1. Uses defer for JavaScript loading
2. Uses loading=\"lazy\" on images
3. Has proper external links with rel=\"noopener noreferrer\"
4. Uses semantic HTML throughout
5. Has a Content-Security-Policy meta tag
6. Has clean, well-indented, valid HTML code`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Best Practices</title>
</head>
<body>
  
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src https:; script-src 'self'" />
  <title>HTML Best Practices</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <header>
    <h1>HTML Best Practices</h1>
    <nav>
      <a href="#overview">Overview</a>
      <a href="#performance">Performance</a>
      <a href="#security">Security</a>
    </nav>
  </header>

  <main>
    <section id="overview">
      <h2>Why Best Practices Matter</h2>
      <p>Following best practices makes your code maintainable, accessible, and performant.</p>
      <img 
        src="https://picsum.photos/600/300" 
        alt="An example image demonstrating best practices in web development" 
        width="600" 
        height="300" 
        loading="lazy"
      />
    </section>

    <section id="performance">
      <h2>Performance Tips</h2>
      <ul>
        <li>Use <code>loading="lazy"</code> for images</li>
        <li>Load scripts with <code>defer</code></li>
        <li>Optimize image sizes</li>
      </ul>
    </section>

    <section id="security">
      <h2>Security Tips</h2>
      <p>Learn more at <a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer">MDN Web Docs</a>.</p>
    </section>
  </main>

  <footer>
    <p>&copy; 2024 Best Practices Guide</p>
  </footer>

  <script src="app.js" defer></script>
</body>
</html>`,
    hint: "Use <script defer> for JS. Add loading=\"lazy\" to images. Use rel=\"noopener noreferrer\" on external links. Add CSP meta tag. Keep indentation consistent with 2 spaces.",
    tests: [
      { name: "Valid DOCTYPE and lang attribute", validate: testContains('html lang="en"') || testContains("html lang='en'") },
      { name: "defer attribute on script", validate: testContains("defer") },
      { name: "loading=\"lazy\" on image", validate: testContains('loading="lazy"') || testContains("loading='lazy'") },
      { name: "rel=\"noopener noreferrer\" on external link", validate: testContains("noopener") && testContains("noreferrer") },
      { name: "Semantic HTML (header, main, footer)", validate: testContains("<header") && testContains("<main") && testContains("<footer") },
      { name: "CSP meta tag present", validate: testContains("Content-Security-Policy") || testContains("content-security-policy") },
    ],
  },
];
