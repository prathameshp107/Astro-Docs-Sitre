// ────────────────────────────────────────────────────
// HTML Labs — Complete Curriculum Data
// 16 Lessons · 10 Code Challenges · 6 Projects · Interview Prep
// ────────────────────────────────────────────────────

// ─── HELPERS ───

function testContains(pattern) {
  return (code) => code.includes(pattern);
}

function testRegex(regex) {
  return (code) => regex.test(code);
}

// ─── LESSONS ───

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

// ─── CODE CHALLENGES ───

export const HTML_CHALLENGES = [
  {
    id: "challenge-first-page",
    title: "Create Your First Page",
    problem: "Build a complete HTML page about your favorite hobby. Include a heading, paragraphs, an image, and a link to a relevant website.",
    difficulty: "Easy",
    tags: ["HTML", "Introduction"],
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Hobby</title>
</head>
<body>
  <!-- Build your page here -->
  
</body>
</html>`,
    solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Hobby: Photography</title>
</head>
<body>
  <h1>My Love for Photography</h1>
  <p>Photography allows me to capture moments and see the world from different perspectives. I've been practicing photography for over 3 years.</p>
  <img src="https://picsum.photos/400/300" alt="A beautiful landscape captured through photography" width="400" height="300" />
  <p>Learn more at <a href="https://www.photography.com" target="_blank">Photography Resources</a>.</p>
</body>
</html>`,
    hint: "Remember to include alt text on your image and use proper heading hierarchy.",
    validation: "✓ Contains H1\n✓ Contains Image\n✓ Contains Link\n✓ Proper HTML Structure",
  },
  {
    id: "challenge-nav-menu",
    title: "Build Navigation Menu",
    problem: "Create a navigation menu with at least 4 links. One link should open in a new tab. Include a nav element and proper semantic structure.",
    difficulty: "Easy",
    tags: ["Navigation", "Links"],
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Navigation Menu</title>
</head>
<body>
  <!-- Navigation goes here -->
  
  <!-- Page content -->
  <main>
    <h1>Welcome to Our Site</h1>
    <p>Use the navigation to explore.</p>
  </main>
</body>
</html>`,
    solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Navigation Menu</title>
</head>
<body>
  <header>
    <nav>
      <a href="index.html">Home</a>
      <a href="about.html">About</a>
      <a href="services.html">Services</a>
      <a href="https://blog.example.com" target="_blank" rel="noopener noreferrer">Blog</a>
      <a href="contact.html">Contact</a>
    </nav>
  </header>
  
  <main>
    <h1>Welcome to Our Site</h1>
    <p>Use the navigation to explore our pages.</p>
  </main>
</body>
</html>`,
    hint: "Wrap your navigation links in a <nav> element. Use target=\"_blank\" for the external link.",
    validation: "✓ Contains <nav>\n✓ 5 links\n✓ External link in new tab\n✓ Semantic structure",
  },
  {
    id: "challenge-registration-form",
    title: "Create Registration Form",
    problem: "Build a user registration form with fields for: full name, email, password, date of birth, country (dropdown), gender (radio buttons), and terms checkbox. All fields should be properly labeled.",
    difficulty: "Medium",
    tags: ["Forms", "Input", "Validation"],
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Registration Form</title>
</head>
<body>
  <h1>Create Account</h1>
  
  
</body>
</html>`,
    solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Registration Form</title>
</head>
<body>
  <h1>Create Account</h1>
  <form action="#" method="POST">
    <fieldset>
      <legend>Account Details</legend>
      
      <label for="name">Full Name:</label>
      <input type="text" id="name" name="name" required />
      
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required />
      
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required minlength="8" />
      
      <label for="dob">Date of Birth:</label>
      <input type="date" id="dob" name="dob" />
      
      <label for="country">Country:</label>
      <select id="country" name="country">
        <option value="">Select country</option>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
        <option value="in">India</option>
        <option value="ca">Canada</option>
      </select>
      
      <fieldset>
        <legend>Gender</legend>
        <label><input type="radio" name="gender" value="male" /> Male</label>
        <label><input type="radio" name="gender" value="female" /> Female</label>
        <label><input type="radio" name="gender" value="other" /> Other</label>
      </fieldset>
      
      <label>
        <input type="checkbox" name="terms" required />
        I agree to the Terms and Conditions
      </label>
      
      <button type="submit">Register</button>
    </fieldset>
  </form>
</body>
</html>`,
    hint: "Use <fieldset> and <legend> to group form sections. Radio buttons share the same name attribute. Checkboxes need matching name attributes.",
    validation: "✓ 6+ input fields\n✓ All fields labeled\n✓ Dropdown, radio, checkbox\n✓ Submit button",
  },
  {
    id: "challenge-product-card",
    title: "Product Card",
    problem: "Create a product card for a fictional product. Include product name, image, price, description, rating (stars), and an 'Add to Cart' button.",
    difficulty: "Easy",
    tags: ["HTML", "Cards", "E-commerce"],
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Product Card</title>
</head>
<body>
  <h1>Featured Product</h1>
  
  
</body>
</html>`,
    solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Product Card</title>
</head>
<body>
  <h1>Featured Product</h1>
  
  <article>
    <figure>
      <img src="https://picsum.photos/300/300" alt="Wireless Bluetooth Headphones" width="300" height="300" />
      <figcaption>Premium Wireless Headphones</figcaption>
    </figure>
    <h2>SoundPro X200</h2>
    <p>Premium wireless headphones with active noise cancellation, 30-hour battery life, and superior sound quality.</p>
    <p><strong>$149.99</strong></p>
    <p>Rating: ★★★★☆ (4.5/5)</p>
    <button type="button">Add to Cart</button>
  </article>
</body>
</html>`,
    hint: "Use <article> for the product card. Use <figure> + <figcaption> for the product image. Use ★ and ☆ for stars.",
    validation: "✓ Product image with alt text\n✓ Product name and price\n✓ Description\n✓ Rating stars\n✓ Add to Cart button",
  },
  {
    id: "challenge-pricing-table",
    title: "Pricing Table",
    problem: "Create a pricing table with 3 plans: Basic, Pro, and Enterprise. Each plan should have a price, features list, and a sign-up button.",
    difficulty: "Medium",
    tags: ["Tables", "Lists", "Pricing"],
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Pricing Table</title>
</head>
<body>
  <h1>Our Plans</h1>
  
  
</body>
</html>`,
    solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Pricing Table</title>
</head>
<body>
  <h1>Our Plans</h1>
  
  <table>
    <caption>Subscription Plans</caption>
    <thead>
      <tr>
        <th>Feature</th>
        <th>Basic</th>
        <th>Pro</th>
        <th>Enterprise</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Price</td>
        <td>$9/mo</td>
        <td>$29/mo</td>
        <td>$99/mo</td>
      </tr>
      <tr>
        <td>Users</td>
        <td>1</td>
        <td>10</td>
        <td>Unlimited</td>
      </tr>
      <tr>
        <td>Storage</td>
        <td>5GB</td>
        <td>50GB</td>
        <td>500GB</td>
      </tr>
      <tr>
        <td>Support</td>
        <td>Email</td>
        <td>Priority Email</td>
        <td>24/7 Phone + Email</td>
      </tr>
      <tr>
        <td>Features</td>
        <td>Basic analytics</td>
        <td>Advanced analytics, API</td>
        <td>All features, Custom integrations</td>
      </tr>
    </tbody>
  </table>
</body>
</html>`,
    hint: "Use a <table> with <thead> for plan names and <tbody> for feature rows. Use <th> for headers and <td> for data cells.",
    validation: "✓ 3 pricing plans\n✓ Feature comparison\n✓ Price clearly shown\n✓ Semantic table structure",
  },
  {
    id: "challenge-blog-layout",
    title: "Blog Layout",
    problem: "Create a blog page layout with a header, navigation, main article content, sidebar with recent posts, and footer.",
    difficulty: "Medium",
    tags: ["Semantic HTML", "Layout", "Blog"],
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Blog</title>
</head>
<body>
  
  
</body>
</html>`,
    solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Blog</title>
</head>
<body>
  <header>
    <h1>My Tech Blog</h1>
    <nav>
      <a href="#">Home</a>
      <a href="#">Articles</a>
      <a href="#">About</a>
      <a href="#">Contact</a>
    </nav>
  </header>

  <main>
    <article>
      <h2>Getting Started with HTML</h2>
      <p><small>Published: January 15, 2024</small></p>
      <p>HTML is the foundation of the web. In this post, we'll explore the basics of HTML and how to build your first webpage.</p>
      <h3>What is HTML?</h3>
      <p>HTML stands for HyperText Markup Language. It uses tags to structure content on the web.</p>
      <h3>Why Learn HTML?</h3>
      <p>Every web developer starts with HTML. It's the first step on your journey to building websites.</p>
    </article>

    <aside>
      <h3>Recent Posts</h3>
      <ul>
        <li><a href="#">CSS Flexbox Guide</a></li>
        <li><a href="#">JavaScript Basics</a></li>
        <li><a href="#">Responsive Design Tips</a></li>
      </ul>
    </aside>
  </main>

  <footer>
    <p>&copy; 2024 My Tech Blog. All rights reserved.</p>
  </footer>
</body>
</html>`,
    hint: "Use <header> for site header, <nav> for navigation, <main> for primary content, <article> for the blog post, <aside> for sidebar, <footer> for footer.",
    validation: "✓ Header with navigation\n✓ Article with headings and paragraphs\n✓ Sidebar with recent posts\n✓ Footer with copyright",
  },
  {
    id: "challenge-portfolio-section",
    title: "Portfolio Section",
    problem: "Create a portfolio showcase section with a grid of project cards. Each card should have a project image, title, description, and technologies used (tags/chips).",
    difficulty: "Medium",
    tags: ["HTML", "Portfolio", "Sections", "Lists"],
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Portfolio</title>
</head>
<body>
  <header>
    <h1>My Projects</h1>
  </header>
  <main>
    
  </main>
</body>
</html>`,
    solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Portfolio</title>
</head>
<body>
  <header>
    <h1>My Projects</h1>
  </header>
  <main>
    <section>
      <h2>Project 1: Weather App</h2>
      <figure>
        <img src="https://picsum.photos/300/200" alt="Screenshot of a weather application showing temperature and forecast" width="300" height="200" />
        <figcaption>Weather Dashboard</figcaption>
      </figure>
      <p>A real-time weather app with location-based forecasts and interactive charts.</p>
      <ul>
        <li>HTML5</li>
        <li>CSS3</li>
        <li>JavaScript</li>
        <li>OpenWeather API</li>
      </ul>
    </section>

    <section>
      <h2>Project 2: Todo App</h2>
      <figure>
        <img src="https://picsum.photos/300/201" alt="Screenshot of a todo list application" width="300" height="200" />
        <figcaption>Task Manager</figcaption>
      </figure>
      <p>A full-featured todo application with drag-and-drop, categories, and local storage.</p>
      <ul>
        <li>HTML5</li>
        <li>CSS3</li>
        <li>React</li>
      </ul>
    </section>

    <section>
      <h2>Project 3: E-commerce Site</h2>
      <figure>
        <img src="https://picsum.photos/300/202" alt="Screenshot of an online store homepage" width="300" height="200" />
        <figcaption>Online Store</figcaption>
      </figure>
      <p>A complete e-commerce platform with product listings, cart, and checkout flow.</p>
      <ul>
        <li>HTML5</li>
        <li>CSS3</li>
        <li>JavaScript</li>
        <li>Node.js</li>
      </ul>
    </section>
  </main>
</body>
</html>`,
    hint: "Use <section> for each project. Use <figure> + <figcaption> for project images. Use <ul> for technology tags.",
    validation: "✓ 3+ project sections\n✓ Each with image, title, description\n✓ Technology tags/lists\n✓ Semantic structure",
  },
  {
    id: "challenge-faq-accordion",
    title: "FAQ Accordion Structure",
    problem: "Create an FAQ page with questions and answers. Use <details> and <summary> elements for the accordion behavior. Include at least 5 questions.",
    difficulty: "Easy",
    tags: ["HTML5", "details", "summary", "FAQ"],
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>FAQ</title>
</head>
<body>
  <h1>Frequently Asked Questions</h1>
  
  
</body>
</html>`,
    solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>FAQ</title>
</head>
<body>
  <h1>Frequently Asked Questions</h1>
  
  <dl>
    <dt>
      <details>
        <summary>What is HTML?</summary>
        <p>HTML (HyperText Markup Language) is the standard language for creating web pages and web applications.</p>
      </details>
    </dt>
    
    <dt>
      <details>
        <summary>What does CSS stand for?</summary>
        <p>CSS stands for Cascading Style Sheets. It describes how HTML elements should be displayed.</p>
      </details>
    </dt>
    
    <dt>
      <details>
        <summary>What is the difference between class and id?</summary>
        <p>A class can be used by multiple elements, while an id must be unique within a page.</p>
      </details>
    </dt>
    
    <dt>
      <details>
        <summary>How do I add an image in HTML?</summary>
        <p>Use the <code>&lt;img&gt;</code> tag with <code>src</code> and <code>alt</code> attributes.</p>
      </details>
    </dt>
    
    <dt>
      <details>
        <summary>What is semantic HTML?</summary>
        <p>Semantic HTML uses meaningful tags like <code>&lt;header&gt;</code>, <code>&lt;main&gt;</code>, and <code>&lt;footer&gt;</code> to describe content structure.</p>
      </details>
    </dt>
  </dl>
</body>
</html>`,
    hint: "Use <details> wrapping <summary> for the question and content for the answer. The open attribute can be added to keep an item expanded.",
    validation: "✓ 5+ FAQ items\n✓ All use <details>/<summary>\n✓ Proper HTML structure\n✓ Semantic elements",
  },
  {
    id: "challenge-landing-page",
    title: "Landing Page Skeleton",
    problem: "Build a landing page structure for a fictional product or service. Include: hero section, features section, testimonials section, call-to-action section, and footer.",
    difficulty: "Hard",
    tags: ["Landing Page", "Sections", "Semantic HTML"],
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Product Landing</title>
</head>
<body>
  
  
</body>
</html>`,
    solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CloudSync — Sync Your World</title>
  <meta name="description" content="CloudSync is the ultimate cloud storage solution for teams and individuals." />
</head>
<body>
  <header>
    <nav>
      <a href="#"><strong>CloudSync</strong></a>
      <a href="#features">Features</a>
      <a href="#testimonials">Testimonials</a>
      <a href="#pricing">Pricing</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>

  <main>
    <!-- Hero -->
    <section>
      <h1>Sync Your World with CloudSync</h1>
      <p>Secure, fast, and reliable cloud storage for everyone.</p>
      <a href="#">Get Started Free</a>
      <a href="#">Learn More</a>
    </section>

    <!-- Features -->
    <section id="features">
      <h2>Powerful Features</h2>
      <article>
        <h3>End-to-End Encryption</h3>
        <p>Your data is encrypted from upload to storage.</p>
      </article>
      <article>
        <h3>Real-Time Sync</h3>
        <p>Changes sync instantly across all devices.</p>
      </article>
      <article>
        <h3>Team Collaboration</h3>
        <p>Work together with shared folders and permissions.</p>
      </article>
    </section>

    <!-- Testimonials -->
    <section id="testimonials">
      <h2>What Our Users Say</h2>
      <blockquote>
        <p>"CloudSync transformed how our team collaborates!"</p>
        <cite>— Sarah J., Project Manager</cite>
      </blockquote>
      <blockquote>
        <p>"Incredibly fast and easy to use. Highly recommended!"</p>
        <cite>— Mike T., Developer</cite>
      </blockquote>
    </section>

    <!-- CTA -->
    <section id="cta">
      <h2>Ready to Get Started?</h2>
      <p>Join over 10,000 teams using CloudSync.</p>
      <a href="#">Start Free Trial</a>
    </section>
  </main>

  <footer>
    <p>&copy; 2024 CloudSync. All rights reserved.</p>
    <nav aria-label="Footer navigation">
      <a href="#">Privacy Policy</a>
      <a href="#">Terms of Service</a>
    </nav>
  </footer>
</body>
</html>`,
    hint: "Use <section> with id attributes for each section. Use <blockquote> + <cite> for testimonials. Use <article> for feature cards.",
    validation: "✓ Hero section with CTA\n✓ Features section with 3+ features\n✓ Testimonials section\n✓ CTA section\n✓ Footer with links",
  },
  {
    id: "challenge-multi-page",
    title: "Multi-Page Website",
    problem: "Create a simple multi-page website structure with: a home page (index.html), about page, and contact page. Each page should have consistent navigation and footer.",
    difficulty: "Hard",
    tags: ["Pages", "Navigation", "Links", "Structure"],
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Website — Home</title>
  <meta name="description" content="Welcome to my website. Learn about web development." />
</head>
<body>
  <header>
    <nav>
      <a href="index.html">Home</a>
      <a href="about.html">About</a>
      <a href="contact.html">Contact</a>
    </nav>
  </header>

  <main>
    <h1>Welcome to My Website</h1>
    <p>This is the home page. Explore the links above to learn more.</p>
    <a href="about.html">Learn about me →</a>
  </main>

  <footer>
    <p>&copy; 2024 My Website</p>
  </footer>
</body>
</html>`,
    solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Website — Home</title>
  <meta name="description" content="Welcome to my website. Learn about web development." />
</head>
<body>
  <header>
    <nav>
      <a href="index.html">Home</a>
      <a href="about.html">About</a>
      <a href="contact.html">Contact</a>
    </nav>
  </header>

  <main>
    <h1>Welcome to My Website</h1>
    <section>
      <h2>Latest Articles</h2>
      <p>This is the home page. Explore the links above to learn more.</p>
      <a href="about.html">Learn about me →</a>
    </section>
  </main>

  <footer>
    <p>&copy; 2024 My Website</p>
  </footer>
</body>
</html>

<!-- === about.html === -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Website — About</title>
  <meta name="description" content="Learn more about me and my web development journey." />
</head>
<body>
  <header>
    <nav>
      <a href="index.html">Home</a>
      <a href="about.html">About</a>
      <a href="contact.html">Contact</a>
    </nav>
  </header>

  <main>
    <h1>About Me</h1>
    <p>I'm a web developer passionate about creating beautiful, accessible websites.</p>
    <a href="index.html">← Back to Home</a>
  </main>

  <footer>
    <p>&copy; 2024 My Website</p>
  </footer>
</body>
</html>

<!-- === contact.html === -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Website — Contact</title>
  <meta name="description" content="Get in touch with me. Contact form and information." />
</head>
<body>
  <header>
    <nav>
      <a href="index.html">Home</a>
      <a href="about.html">About</a>
      <a href="contact.html">Contact</a>
    </nav>
  </header>

  <main>
    <h1>Contact Me</h1>
    <form action="#" method="POST">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required />
      
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required />
      
      <label for="message">Message:</label>
      <textarea id="message" name="message" rows="4" required></textarea>
      
      <button type="submit">Send Message</button>
    </form>
    <a href="index.html">← Back to Home</a>
  </main>

  <footer>
    <p>&copy; 2024 My Website</p>
  </footer>
</body>
</html>`,
    hint: "Each page needs its own DOCTYPE and full HTML structure. Navigation should be consistent across pages. Use descriptive titles for each page.",
    validation: "✓ Consistent navigation on all pages\n✓ Unique titles per page\n✓ 3 pages: Home, About, Contact\n✓ Footer on all pages\n✓ Semantic structure",
  },
];

// ─── PROJECTS ───

export const HTML_PROJECTS = [
  {
    id: "project-portfolio",
    title: "Personal Portfolio",
    overview: "Build a personal portfolio website to showcase your work, skills, and contact information.",
    why: "A portfolio is essential for any developer — it's your resume, your brand, and your proof of work all in one.",
    concepts: ["Semantic HTML", "Navigation", "Sections", "Media", "Forms"],
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Portfolio</title>
</head>
<body>
  <!-- Build your portfolio -->
  
</body>
</html>`,
    solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Jane Doe — Portfolio</title>
  <meta name="description" content="Portfolio of Jane Doe, a full-stack web developer." />
</head>
<body>
  <header>
    <nav>
      <a href="#about">About</a>
      <a href="#projects">Projects</a>
      <a href="#skills">Skills</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>

  <main>
    <!-- Hero -->
    <section>
      <h1>Hi, I'm <strong>Jane Doe</strong></h1>
      <p>A passionate web developer building modern, accessible websites.</p>
    </section>

    <!-- About -->
    <section id="about">
      <h2>About Me</h2>
      <figure>
        <img src="https://picsum.photos/200/200" alt="Profile photo of Jane Doe" width="200" height="200" />
      </figure>
      <p>I'm a full-stack developer with 3 years of experience building web applications. I love creating clean, user-friendly interfaces.</p>
    </section>

    <!-- Projects -->
    <section id="projects">
      <h2>My Projects</h2>
      <article>
        <h3>E-Commerce Platform</h3>
        <p>A full-featured online store with product management and payment integration.</p>
      </article>
      <article>
        <h3>Weather Dashboard</h3>
        <p>Real-time weather app with interactive maps and forecasts.</p>
      </article>
      <article>
        <h3>Task Manager</h3>
        <p>A collaborative project management tool with real-time updates.</p>
      </article>
    </section>

    <!-- Skills -->
    <section id="skills">
      <h2>Skills & Technologies</h2>
      <ul>
        <li>HTML5 & CSS3</li>
        <li>JavaScript & TypeScript</li>
        <li>React & Next.js</li>
        <li>Node.js & Express</li>
      </ul>
    </section>

    <!-- Contact -->
    <section id="contact">
      <h2>Get In Touch</h2>
      <form action="#" method="POST">
        <label for="contact-name">Name:</label>
        <input type="text" id="contact-name" name="name" required />
        <label for="contact-email">Email:</label>
        <input type="email" id="contact-email" name="email" required />
        <label for="contact-message">Message:</label>
        <textarea id="contact-message" name="message" rows="4"></textarea>
        <button type="submit">Send Message</button>
      </form>
    </section>
  </main>

  <footer>
    <p>&copy; 2024 Jane Doe. All rights reserved.</p>
  </footer>
</body>
</html>`,
    milestones: [
      { title: "Header Section", task: "Create a header with your name and navigation links" },
      { title: "About Section", task: "Add an about section with a profile image and bio" },
      { title: "Projects Section", task: "Showcase 3 projects with descriptions" },
      { title: "Contact Section", task: "Add a contact form with name, email, and message fields" },
      { title: "Footer", task: "Add a footer with copyright and social links" },
    ],
  },
  {
    id: "project-restaurant",
    title: "Restaurant Website",
    overview: "Create a website for a fictional restaurant with menu, gallery, and contact information.",
    why: "Restaurant websites are a classic project that combines multiple content types: navigation, menus, images, forms, and location info.",
    concepts: ["Semantic HTML", "Tables", "Images", "Forms", "Sections"],
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Bella Italia Restaurant</title>
</head>
<body>
  
</body>
</html>`,
    solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Bella Italia — Authentic Italian Cuisine</title>
  <meta name="description" content="Bella Italia serves authentic Italian cuisine in the heart of the city. Reserve your table today!" />
</head>
<body>
  <header>
    <h1>Bella Italia</h1>
    <nav>
      <a href="#menu">Menu</a>
      <a href="#gallery">Gallery</a>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>

  <main>
    <!-- Hero -->
    <section>
      <h2>Authentic Italian Cuisine</h2>
      <p>Experience the taste of Italy in every bite.</p>
    </section>

    <!-- Menu -->
    <section id="menu">
      <h2>Our Menu</h2>
      <table>
        <caption>Signature Dishes</caption>
        <thead>
          <tr>
            <th>Dish</th>
            <th>Description</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Margherita Pizza</td><td>Fresh mozzarella, basil, tomato sauce</td><td>$14</td></tr>
          <tr><td>Spaghetti Carbonara</td><td>Egg, cheese, pancetta, black pepper</td><td>$16</td></tr>
          <tr><td>Tiramisu</td><td>Classic Italian dessert with mascarpone</td><td>$8</td></tr>
        </tbody>
      </table>
    </section>

    <!-- Gallery -->
    <section id="gallery">
      <h2>Gallery</h2>
      <figure>
        <img src="https://picsum.photos/300/200" alt="Our signature margherita pizza" width="300" height="200" />
        <figcaption>Margherita Pizza</figcaption>
      </figure>
      <figure>
        <img src="https://picsum.photos/300/201" alt="Cozy restaurant interior" width="300" height="200" />
        <figcaption>Restaurant Interior</figcaption>
      </figure>
    </section>

    <!-- About -->
    <section id="about">
      <h2>Our Story</h2>
      <p>Bella Italia has been serving authentic Italian cuisine since 1995. Our recipes are passed down through generations.</p>
    </section>

    <!-- Contact -->
    <section id="contact">
      <h2>Reserve a Table</h2>
      <form action="#" method="POST">
        <label for="res-name">Name:</label>
        <input type="text" id="res-name" name="name" required />
        <label for="res-date">Date:</label>
        <input type="date" id="res-date" name="date" required />
        <label for="res-guests">Guests:</label>
        <input type="number" id="res-guests" name="guests" min="1" max="20" />
        <button type="submit">Reserve</button>
      </form>
      <address>
        <p>123 Main Street, Cityville</p>
        <p>Phone: (555) 123-4567</p>
        <p>Email: <a href="mailto:info@bellaitalia.com">info@bellaitalia.com</a></p>
      </address>
    </section>
  </main>

  <footer>
    <p>&copy; 2024 Bella Italia. All rights reserved.</p>
  </footer>
</body>
</html>`,
    milestones: [
      { title: "Menu Page", task: "Create a menu with dishes, descriptions, and prices using a table" },
      { title: "Gallery", task: "Add images of food and the restaurant with captions" },
      { title: "Contact Form", task: "Add a reservation form with name, date, and guest count" },
      { title: "Location Section", task: "Add restaurant address and contact details" },
    ],
  },
  {
    id: "project-travel",
    title: "Travel Website",
    overview: "Build a travel destination website showcasing beautiful places, with trip packages and a booking form.",
    why: "Travel sites are visually rich and require organized content presentation with multiple sections and media types.",
    concepts: ["Images", "Lists", "Sections", "Forms", "Navigation", "Semantic HTML"],
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Wanderlust Travel</title>
</head>
<body>
  
</body>
</html>`,
    solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Wanderlust Travel — Explore the World</title>
  <meta name="description" content="Discover amazing travel destinations and book your next adventure with Wanderlust Travel." />
</head>
<body>
  <header>
    <h1>Wanderlust Travel</h1>
    <nav>
      <a href="#destinations">Destinations</a>
      <a href="#packages">Packages</a>
      <a href="#testimonials">Testimonials</a>
      <a href="#book">Book Now</a>
    </nav>
  </header>

  <main>
    <!-- Hero -->
    <section>
      <h2>Explore the World</h2>
      <p>Discover breathtaking destinations and unforgettable experiences.</p>
    </section>

    <!-- Destinations -->
    <section id="destinations">
      <h2>Popular Destinations</h2>
      <article>
        <h3>Paris, France</h3>
        <img src="https://picsum.photos/300/200" alt="Eiffel Tower in Paris" width="300" height="200" loading="lazy" />
        <p>The city of love, art, and cuisine.</p>
      </article>
      <article>
        <h3>Tokyo, Japan</h3>
        <img src="https://picsum.photos/300/201" alt="Tokyo city skyline at night" width="300" height="200" loading="lazy" />
        <p>Where tradition meets innovation.</p>
      </article>
      <article>
        <h3>Bali, Indonesia</h3>
        <img src="https://picsum.photos/300/202" alt="Beautiful beach in Bali" width="300" height="200" loading="lazy" />
        <p>Tropical paradise with rich culture.</p>
      </article>
    </section>

    <!-- Packages -->
    <section id="packages">
      <h2>Travel Packages</h2>
      <ul>
        <li><strong>Explorer Package</strong> — 3 days, $499</li>
        <li><strong>Adventurer Package</strong> — 5 days, $899</li>
        <li><strong>Premium Package</strong> — 7 days, $1499</li>
      </ul>
    </section>

    <!-- Book Now -->
    <section id="book">
      <h2>Book Your Trip</h2>
      <form action="#" method="POST">
        <label for="trip-name">Full Name:</label>
        <input type="text" id="trip-name" name="name" required />
        <label for="trip-destination">Destination:</label>
        <select id="trip-destination" name="destination">
          <option value="paris">Paris, France</option>
          <option value="tokyo">Tokyo, Japan</option>
          <option value="bali">Bali, Indonesia</option>
        </select>
        <label for="trip-date">Departure:</label>
        <input type="date" id="trip-date" name="date" required />
        <button type="submit">Book Now</button>
      </form>
    </section>
  </main>

  <footer>
    <p>&copy; 2024 Wanderlust Travel. All rights reserved.</p>
    <nav aria-label="Footer">
      <a href="#">Privacy Policy</a>
      <a href="#">Terms</a>
    </nav>
  </footer>
</body>
</html>`,
    milestones: [
      { title: "Homepage Hero", task: "Create a hero section with a catchy headline" },
      { title: "Destinations Section", task: "Showcase 3 destinations with images and descriptions" },
      { title: "Packages Section", task: "List available travel packages with prices" },
      { title: "Booking Form", task: "Add a booking form with name, destination, and date" },
    ],
  },
  {
    id: "project-blog",
    title: "Blog Website",
    overview: "Create a blog website with a home page listing articles, an individual article page, and a sidebar with categories and recent posts.",
    why: "Blog websites teach content organization, pagination, categorization, and proper use of semantic HTML for content-heavy sites.",
    concepts: ["Semantic HTML", "Articles", "Navigation", "Lists", "Links", "Sections"],
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>DevBlog</title>
</head>
<body>
  
</body>
</html>`,
    solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>DevBlog — Web Development Articles</title>
  <meta name="description" content="DevBlog shares in-depth articles about web development, HTML, CSS, JavaScript, and more." />
</head>
<body>
  <header>
    <h1>DevBlog</h1>
    <nav>
      <a href="index.html">Home</a>
      <a href="about.html">About</a>
      <a href="contact.html">Contact</a>
    </nav>
  </header>

  <main>
    <!-- Featured Article -->
    <article>
      <h2>Getting Started with Semantic HTML</h2>
      <p><small>By Jane Doe | January 15, 2024 | <a href="#">HTML</a></small></p>
      <p>Semantic HTML is the foundation of accessible, SEO-friendly web pages. Learn how to use header, main, article, and more...</p>
      <a href="#">Read More →</a>
    </article>

    <article>
      <h2>CSS Grid vs Flexbox</h2>
      <p><small>By John Smith | January 12, 2024 | <a href="#">CSS</a></small></p>
      <p>Understanding when to use Grid and when to use Flexbox is crucial for modern web layouts...</p>
      <a href="#">Read More →</a>
    </article>

    <article>
      <h2>JavaScript Basics for Beginners</h2>
      <p><small>By Jane Doe | January 10, 2024 | <a href="#">JavaScript</a></small></p>
      <p>JavaScript brings interactivity to the web. Start your journey with variables, functions, and events...</p>
      <a href="#">Read More →</a>
    </article>

    <!-- Sidebar -->
    <aside>
      <h3>Categories</h3>
      <ul>
        <li><a href="#">HTML (5)</a></li>
        <li><a href="#">CSS (3)</a></li>
        <li><a href="#">JavaScript (7)</a></li>
        <li><a href="#">React (4)</a></li>
      </ul>

      <h3>Recent Posts</h3>
      <ul>
        <li><a href="#">Getting Started with Semantic HTML</a></li>
        <li><a href="#">CSS Grid vs Flexbox</a></li>
        <li><a href="#">JavaScript Basics for Beginners</a></li>
        <li><a href="#">Understanding the DOM</a></li>
      </ul>
    </aside>
  </main>

  <footer>
    <p>&copy; 2024 DevBlog. All rights reserved.</p>
  </footer>
</body>
</html>`,
    milestones: [
      { title: "Home Page", task: "Create a home page listing blog posts with titles, descriptions, and links" },
      { title: "Article Page", task: "Create an individual article page with full content" },
      { title: "Sidebar", task: "Add a sidebar with categories and recent posts links" },
      { title: "Navigation", task: "Add a header navigation and footer" },
    ],
  },
  {
    id: "project-documentation",
    title: "Documentation Site",
    overview: "Build a documentation site for a fictional library or framework with a sidebar table of contents and detailed sections.",
    why: "Documentation sites are essential for any open-source project and teach content organization, anchoring, and navigation patterns.",
    concepts: ["Semantic HTML", "Navigation", "Tables", "Anchors", "Code", "Lists"],
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>QuickCSS Docs</title>
</head>
<body>
  
</body>
</html>`,
    solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>QuickCSS Documentation</title>
  <meta name="description" content="QuickCSS is a lightweight CSS utility framework. Learn how to use it with our comprehensive documentation." />
</head>
<body>
  <header>
    <h1>QuickCSS Docs</h1>
    <nav>
      <a href="index.html">Home</a>
      <a href="docs.html" aria-current="page">Docs</a>
      <a href="examples.html">Examples</a>
    </nav>
  </header>

  <main>
    <nav aria-label="Documentation sidebar">
      <h2>Getting Started</h2>
      <ul>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#setup">Setup</a></li>
        <li><a href="#usage">Basic Usage</a></li>
      </ul>
      <h2>Components</h2>
      <ul>
        <li><a href="#buttons">Buttons</a></li>
        <li><a href="#cards">Cards</a></li>
        <li><a href="#forms">Forms</a></li>
        <li><a href="#grid">Grid System</a></li>
      </ul>
      <h2>Utilities</h2>
      <ul>
        <li><a href="#spacing">Spacing</a></li>
        <li><a href="#typography">Typography</a></li>
        <li><a href="#colors">Colors</a></li>
      </ul>
    </nav>

    <article>
      <section id="installation">
        <h2>Installation</h2>
        <p>Add QuickCSS to your project via CDN:</p>
        <pre><code>&lt;link rel="stylesheet" href="https://cdn.quickcss.dev/v1.0.0/quick.css"&gt;</code></pre>
      </section>

      <section id="setup">
        <h2>Setup</h2>
        <p>Add the class <code>qc-*</code> prefix to your HTML elements:</p>
        <pre><code>&lt;div class="qc-container"&gt;
  &lt;h1 class="qc-text-xl"&gt;Hello World&lt;/h1&gt;
&lt;/div&gt;</code></pre>
      </section>

      <section id="buttons">
        <h2>Buttons</h2>
        <p>Use the <code>qc-btn</code> class for buttons:</p>
        <p><code>&lt;button class="qc-btn qc-btn-primary"&gt;Click Me&lt;/button&gt;</code></p>
        <p><code>&lt;button class="qc-btn qc-btn-secondary"&gt;Cancel&lt;/button&gt;</code></p>
      </section>

      <section id="cards">
        <h2>Cards</h2>
        <p>Cards are flexible content containers:</p>
        <pre><code>&lt;div class="qc-card"&gt;
  &lt;div class="qc-card-body"&gt;
    &lt;h3&gt;Card Title&lt;/h3&gt;
    &lt;p&gt;Card content goes here.&lt;/p&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
      </section>
    </article>
  </main>

  <footer>
    <p>&copy; 2024 QuickCSS. MIT License.</p>
  </footer>
</body>
</html>`,
    milestones: [
      { title: "Sidebar TOC", task: "Create a sidebar with links to documentation sections" },
      { title: "Content Sections", task: "Write documentation sections with headings, code blocks, and descriptions" },
      { title: "Navigation", task: "Add top navigation and footer" },
      { title: "Code Examples", task: "Include <code> and <pre> elements for code snippets" },
    ],
  },
  {
    id: "project-landing-company",
    title: "Company Landing Page",
    overview: "Build a professional landing page for a SaaS company with hero, features, pricing, testimonials, FAQ, and contact sections.",
    why: "Landing pages are the most common type of web project — every business needs one. This combines all HTML skills into one comprehensive project.",
    concepts: ["Semantic HTML", "Sections", "Navigation", "Forms", "Tables", "Blockquotes", "Details/Summary"],
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>DataFlow — Analytics Platform</title>
</head>
<body>
  
</body>
</html>`,
    solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>DataFlow — Real-Time Analytics Platform</title>
  <meta name="description" content="DataFlow provides real-time analytics and insights for modern businesses. Start your free trial today." />
  <meta property="og:title" content="DataFlow — Analytics Platform" />
  <meta property="og:description" content="Real-time analytics and insights for modern businesses." />
</head>
<body>
  <header>
    <nav>
      <a href="#"><strong>DataFlow</strong></a>
      <a href="#features">Features</a>
      <a href="#pricing">Pricing</a>
      <a href="#testimonials">Testimonials</a>
      <a href="#faq">FAQ</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>

  <main>
    <!-- Hero -->
    <section>
      <h1>Understand Your Data. Grow Your Business.</h1>
      <p>Real-time analytics dashboards, custom reports, and actionable insights — all in one platform.</p>
      <a href="#">Start Free Trial</a>
      <a href="#">Watch Demo</a>
    </section>

    <!-- Features -->
    <section id="features">
      <h2>Powerful Features</h2>
      <article>
        <h3>Real-Time Dashboards</h3>
        <p>Live data visualization with customizable widgets and filters.</p>
      </article>
      <article>
        <h3>Custom Reports</h3>
        <p>Build and schedule custom reports with drag-and-drop simplicity.</p>
      </article>
      <article>
        <h3>Team Collaboration</h3>
        <p>Share dashboards, annotate charts, and collaborate in real-time.</p>
      </article>
      <article>
        <h3>API Access</h3>
        <p>Integrate with your existing tools via our REST API and webhooks.</p>
      </article>
    </section>

    <!-- Pricing -->
    <section id="pricing">
      <h2>Simple Pricing</h2>
      <table>
        <caption>Choose the plan that fits your needs</caption>
        <thead>
          <tr>
            <th>Plan</th>
            <th>Price</th>
            <th>Users</th>
            <th>Data</th>
            <th>Support</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Starter</td><td>$29/mo</td><td>5</td><td>10GB</td><td>Email</td></tr>
          <tr><td>Professional</td><td>$79/mo</td><td>20</td><td>100GB</td><td>Priority</td></tr>
          <tr><td>Enterprise</td><td>$199/mo</td><td>Unlimited</td><td>1TB</td><td>24/7</td></tr>
        </tbody>
      </table>
    </section>

    <!-- Testimonials -->
    <section id="testimonials">
      <h2>What Our Customers Say</h2>
      <blockquote>
        <p>"DataFlow transformed how we make data-driven decisions. The real-time dashboards are incredible!"</p>
        <cite>— Sarah Chen, CTO at TechStart</cite>
      </blockquote>
      <blockquote>
        <p>"We've tried many analytics tools, but DataFlow is by far the most intuitive and powerful."</p>
        <cite>— Mark Johnson, VP Engineering</cite>
      </blockquote>
    </section>

    <!-- FAQ -->
    <section id="faq">
      <h2>Frequently Asked Questions</h2>
      <details>
        <summary>How do I get started?</summary>
        <p>Sign up for a free trial — no credit card required. You'll get access to all features for 14 days.</p>
      </details>
      <details>
        <summary>Can I upgrade my plan later?</summary>
        <p>Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
      </details>
      <details>
        <summary>Do you offer a free plan?</summary>
        <p>Yes, we offer a free plan with basic features for up to 1 user.</p>
      </details>
    </section>

    <!-- Contact -->
    <section id="contact">
      <h2>Get In Touch</h2>
      <form action="#" method="POST">
        <label for="c-name">Name:</label>
        <input type="text" id="c-name" name="name" required />
        <label for="c-email">Email:</label>
        <input type="email" id="c-email" name="email" required />
        <label for="c-company">Company:</label>
        <input type="text" id="c-company" name="company" />
        <label for="c-message">Message:</label>
        <textarea id="c-message" name="message" rows="4"></textarea>
        <button type="submit">Send Message</button>
      </form>
    </section>
  </main>

  <footer>
    <p>&copy; 2024 DataFlow Analytics. All rights reserved.</p>
    <nav aria-label="Footer navigation">
      <a href="#">Privacy</a>
      <a href="#">Terms</a>
      <a href="mailto:hello@dataflow.io">Contact</a>
    </nav>
  </footer>
</body>
</html>`,
    milestones: [
      { title: "Hero Section", task: "Create a hero with headline, description, and CTA buttons" },
      { title: "Features Section", task: "Showcase 4 key features with headings and descriptions" },
      { title: "Pricing Table", task: "Create a pricing table with plans and features" },
      { title: "Testimonials", task: "Add customer testimonials using blockquote" },
      { title: "FAQ Section", task: "Add FAQ accordion using details/summary elements" },
      { title: "Contact Section", task: "Add a contact form and footer" },
    ],
  },
];

// ─── INTERVIEW PREPARATION ───

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
