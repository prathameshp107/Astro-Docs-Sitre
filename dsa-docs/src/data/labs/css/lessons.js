// ─── CSS Labs — Lessons Data ───

import { testContains, testRegex } from "./validators.js";

export const CSS_LESSONS = [
  {
    id: "css-fundamentals",
    chapter: 1,
    title: "CSS Fundamentals",
    level: "Beginner",
    tags: ["CSS", "Syntax", "Inheritance", "Cascade"],
    conceptExplanation: `CSS (Cascading Style Sheets) controls the visual presentation of HTML elements.

CSS works by selecting HTML elements and applying styles to them. The "cascade" determines which styles win when multiple rules target the same element.

**CSS Syntax:**
\`\`\`css
selector {
  property: value;
}
\`\`\`

**Three Ways to Add CSS:**
• **Inline** — via the style attribute: \`<div style="color: red">\`
• **Internal** — via <style> tags in the <head>
• **External** — via <link rel="stylesheet"> (best practice)

**The Cascade:**
CSS follows three rules when conflicts occur:
1. **Importance** — !important > normal
2. **Specificity** — inline > id > class > element
3. **Source Order** — later rules override earlier ones

**Inheritance:**
Some properties (like color, font-family) are inherited from parent to child elements. Others (like margin, padding) are not inherited.`,
    keyRules: [
      "Use external stylesheets — keep CSS separate from HTML",
      "Understand specificity: inline > id > class > element",
      "Use !important sparingly — it breaks the natural cascade",
      "Leverage inheritance for color and font properties",
      "Use browser DevTools to debug CSS issues",
    ],
    task: `Create an HTML page with a linked external stylesheet. The page should:
1. Have a <link> to styles.css in the <head>
2. Use an <h1> with a custom color and font-family
3. Use a <p> that inherits the font-family from body
4. Use a class to style a <div> with a background color and padding
5. Use an id to style a specific element differently`,
    starterCode: `<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CSS Fundamentals</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <h1>CSS Fundamentals</h1>
  <p>This paragraph inherits the body font-family.</p>
  <div class="card">This div is styled with a class.</div>
  <div id="special">This div is styled with an id.</div>
</body>
</html>

/* styles.css */
body {
  font-family: system-ui, sans-serif;
  color: #1e293b;
}

h1 {
  color: #6366f1;
}

.card {
  background: #f1f5f9;
  padding: 1rem;
  border-radius: 8px;
}

#special {
  background: #6366f1;
  color: white;
  padding: 1rem;
  border-radius: 8px;
}`,
    solutionCode: `/* styles.css */
body {
  font-family: system-ui, sans-serif;
  color: #1e293b;
  background: #ffffff;
  line-height: 1.6;
  margin: 2rem;
}

h1 {
  color: #6366f1;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

p {
  color: #475569;
  font-size: 1.1rem;
}

.card {
  background: #f1f5f9;
  padding: 1.25rem;
  border-radius: 12px;
  margin: 1rem 0;
  border: 1px solid #e2e8f0;
}

#special {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  padding: 1.25rem;
  border-radius: 12px;
  font-weight: 600;
}`,
    hint: "Use <link rel=\"stylesheet\" href=\"styles.css\"> in the <head>. In your CSS, target elements by tag name (h1), class (.card), and id (#special).",
    tests: [
      { name: "External stylesheet linked", validate: testContains('rel="stylesheet"') || testContains("rel='stylesheet'") },
      { name: "Class selector (.card) used", validate: testRegex(/\.\w+\s*\{/) },
      { name: "ID selector (#special) used", validate: testContains("#special") },
      { name: "Element selector (h1/body) used", validate: testRegex(/^[a-z]+\s*\{/m) },
      { name: "Color property used", validate: testContains("color:") },
      { name: "Padding property used", validate: testContains("padding") },
    ],
  },
  {
    id: "selectors",
    chapter: 2,
    title: "Selectors",
    level: "Beginner",
    tags: ["Selectors", "Class", "ID", "Combinators", "Attributes"],
    conceptExplanation: `Selectors define which HTML elements a CSS rule applies to.

**Basic Selectors:**
\`\`\`css
/* Element selector */
p { color: blue; }

/* Class selector */
.card { background: white; }

/* ID selector */
#header { height: 60px; }

/* Universal selector */
* { box-sizing: border-box; }
\`\`\`

**Combinators (relationship selectors):**
\`\`\`css
/* Descendant — all p inside .container */
.container p { }

/* Child — direct children only */
.container > p { }

/* Adjacent sibling — p immediately after h2 */
h2 + p { }

/* General sibling — all p after h2 */
h2 ~ p { }
\`\`\`

**Attribute Selectors:**
\`\`\`css
[type="text"] { }
[href^="https"] { }     /* starts with */
[href$=".pdf"] { }      /* ends with */
[class*="btn"] { }      /* contains */
\`\`\`

**Pseudo-classes (:):**
\`\`\`css
:hover, :focus, :nth-child(odd), :first-child, :last-child, :not(.class)
\`\`\``,
    keyRules: [
      "Classes (.) are reusable — IDs (#) must be unique per page",
      "Don't over-specific — prefer classes over IDs for styling",
      "Use combinators to keep HTML clean (less classes needed)",
      "Attribute selectors are powerful for styling form elements",
      "Avoid * in production — it can be slow on large pages",
    ],
    task: `Create a page demonstrating different selectors:
1. An element selector for body (font-family)
2. A class selector (.highlight) with a yellow background
3. An ID selector (#main-title) with a larger font size
4. A descendant combinator (.container p)
5. An attribute selector ([data-type])
6. A pseudo-class (:hover) on a button`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CSS Selectors</title>
  <style>
    /* Write your CSS here */
    
  </style>
</head>
<body>
  <h1 id="main-title">CSS Selectors</h1>
  <div class="container">
    <p>This is inside the container.</p>
    <p data-type="example">This has a data attribute.</p>
    <span class="highlight">This is highlighted.</span>
  </div>
  <button>Hover me</button>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CSS Selectors</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      margin: 2rem;
      line-height: 1.6;
    }

    #main-title {
      font-size: 2.5rem;
      color: #6366f1;
    }

    .highlight {
      background: #fef3c7;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
    }

    .container p {
      color: #475569;
      margin: 0.5rem 0;
    }

    [data-type="example"] {
      border-left: 3px solid #6366f1;
      padding-left: 0.75rem;
      color: #6366f1;
    }

    button:hover {
      background: #6366f1;
      color: white;
      cursor: pointer;
    }

    button {
      padding: 0.75rem 1.5rem;
      border: 2px solid #6366f1;
      background: transparent;
      color: #6366f1;
      border-radius: 8px;
      font-weight: 600;
      transition: all 0.2s;
    }
  </style>
</head>
<body>
  <h1 id="main-title">CSS Selectors</h1>
  <div class="container">
    <p>This is inside the container.</p>
    <p data-type="example">This has a data attribute.</p>
    <span class="highlight">This is highlighted.</span>
  </div>
  <button>Hover me</button>
</body>
</html>`,
    hint: "Use . for classes, # for IDs. For descendant: .container p. For attribute: [data-type]. For hover: :hover.",
    tests: [
      { name: "Class selector (.highlight) used", validate: testRegex(/\.\w+\s*\{/) },
      { name: "ID selector (#main-title) used", validate: testContains("#main-title") },
      { name: "Descendant combinator (.container p)", validate: testRegex(/\.\w+\s+p\s*\{/) },
      { name: "Attribute selector [data-type]", validate: testContains("[data-type") },
      { name: ":hover pseudo-class used", validate: testContains(":hover") },
    ],
  },
  {
    id: "colors-units",
    chapter: 3,
    title: "Colors & Units",
    level: "Beginner",
    tags: ["Colors", "Units", "Hex", "RGB", "HSL", "rem", "em", "vw/vh"],
    conceptExplanation: `CSS offers multiple ways to specify colors and measurements.

**Color Formats:**
\`\`\`css
/* Named colors */
color: red; color: darkblue; color: transparent;

/* Hexadecimal */
color: #ff0000;        /* 6-digit */
color: #f00;           /* 3-digit shorthand */
color: #ff000080;      /* 8-digit with alpha */

/* RGB / RGBA */
color: rgb(255, 0, 0);
color: rgba(255, 0, 0, 0.5);

/* HSL / HSLA  */
color: hsl(0, 100%, 50%);      /* Hue, Saturation, Lightness */
color: hsla(0, 100%, 50%, 0.5);

/* modern: OKLCH, HWB, etc. */
color: oklch(0.6 0.25 25);
\`\`\`

**CSS Units:**
\`\`\`css
/* Absolute units */
width: 100px;   /* pixels — most common */
font-size: 1in; /* inches (rarely used) */
margin: 2cm;    /* centimeters */

/* Relative units (preferred for responsive design) */
font-size: 1rem;     /* relative to root font-size (16px default) */
padding: 1.5em;      /* relative to element's font-size */
width: 50%;          /* relative to parent */
height: 100vh;       /* 100% of viewport height */
width: 100vw;        /* 100% of viewport width */

/* Modern units */
width: min(100%, 800px);  /* smallest value */
height: max(50vh, 400px); /* largest value */
font-size: clamp(1rem, 3vw, 2rem); /* responsive range */
\`\`\``,
    keyRules: [
      "Use rem for font-sizes — it respects user preferences",
      "Use em for spacing that should scale with the element's font-size",
      "Use % for fluid layouts and vh/vw for full-screen elements",
      "HSL is more intuitive than hex — hue is on a 0-360 degree wheel",
      "Use min(), max(), and clamp() for responsive values without media queries",
    ],
    task: `Create a page demonstrating colors and units:
1. A heading with HSL color
2. A box that is 50% wide with a max-width of 600px
3. A full-width hero section using 100vw and min-height: 50vh
4. Text with font-size in rem and padding in em
5. A box using clamp() for its width
6. Use both hex and rgba colors`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Colors & Units</title>
  <style>
    /* Your CSS here */
    
  </style>
</head>
<body>
  <section class="hero">
    <h1>Colors & Units Demo</h1>
    <p>This hero section uses viewport units.</p>
  </section>
  <div class="container">
    <div class="card">Responsive card with clamp()</div>
    <div class="card">Another card at 50% width</div>
  </div>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Colors & Units</title>
  <style>
    body {
      margin: 0;
      font-family: system-ui, sans-serif;
    }

    .hero {
      width: 100vw;
      min-height: 50vh;
      background: linear-gradient(135deg, hsl(239, 84%, 67%), hsl(271, 81%, 56%));
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    .hero h1 {
      font-size: clamp(2rem, 5vw, 4rem);
      margin: 0;
    }

    .hero p {
      font-size: 1.25rem;
      opacity: 0.9;
      padding: 0 1em;
    }

    .container {
      width: min(90%, 800px);
      margin: 2rem auto;
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .card {
      flex: 1;
      min-width: 200px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 1.5rem;
      color: #1e293b;
      font-size: 1rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }
  </style>
</head>
<body>
  <section class="hero">
    <h1>Colors & Units Demo</h1>
    <p>This hero section uses viewport units.</p>
  </section>
  <div class="container">
    <div class="card">Responsive card with clamp()</div>
    <div class="card">Another card at 50% width</div>
  </div>
</body>
</html>`,
    hint: "Use hsl(hue, saturation, lightness) for intuitive colors. Use clamp(min, preferred, max) for responsive sizing. vh = viewport height, vw = viewport width.",
    tests: [
      { name: "HSL color used", validate: testContains("hsl(") || testContains("hsla(") },
      { name: "rem unit used", validate: testRegex(/[0-9.]+\s*rem/) },
      { name: "vh or vw unit used", validate: testRegex(/[0-9.]+\s*vh|[0-9.]+\s*vw/) },
      { name: "clamp() function used", validate: testContains("clamp(") },
      { name: "% width used", validate: testContains("%;") || testContains("%;") },
      { name: "Linear gradient used", validate: testContains("linear-gradient") },
    ],
  },
  {
    id: "typography",
    chapter: 4,
    title: "Typography",
    level: "Beginner",
    tags: ["Fonts", "Typography", "Google Fonts", "Text", "Web Fonts"],
    conceptExplanation: `Typography is one of the most important aspects of web design — good typography makes content readable and engaging.

**Font Properties:**
\`\`\`css
body {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  color: #1e293b;
  text-align: left;
  text-decoration: none;
}
\`\`\`

**Using Google Fonts:**
\`\`\`html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
\`\`\`

**Text Styling Properties:**
• text-align — left, center, right, justify
• text-decoration — underline, line-through, none
• text-transform — uppercase, lowercase, capitalize
• letter-spacing — spacing between characters
• word-spacing — spacing between words
• text-shadow — shadow effect on text

**Line Height & Readability:**
• body text: 1.5 - 1.8
• headings: 1.1 - 1.3
• Recommended line length: 45-75 characters`,
    keyRules: [
      "Use system fonts (system-ui, sans-serif) or load web fonts via @font-face or Google Fonts",
      "Keep body font-size between 16-18px for readability",
      "Line-height should be 1.5-1.8 for body text",
      "Use font-weight: 600 or 700 for headings, not every paragraph",
      "Limit line length to ~70 characters for optimal readability",
    ],
    task: `Create a typography showcase page:
1. Load a Google Font (e.g., 'Inter' or 'Playfair Display')
2. Style a heading with a different font, weight, and letter-spacing
3. Style body text with proper line-height and readable font-size
4. Use text-transform on a subtitle
5. Add a subtle text-shadow to the main heading
6. Style a blockquote differently from body text`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Typography</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
  <style>
    /* Your CSS here */
    
  </style>
</head>
<body>
  <h1>The Art of Typography</h1>
  <p class="subtitle">Mastering Web Typography</p>
  <p>Good typography is invisible. Bad typography is everywhere.</p>
  <blockquote>Typography is the craft of endowing human language with a durable visual form.</blockquote>
  <p>This is body text styled for optimal readability.</p>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Typography</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
  <style>
    body {
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 1.125rem;
      line-height: 1.7;
      color: #334155;
      max-width: 650px;
      margin: 3rem auto;
      padding: 0 1.5rem;
    }

    h1 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 3rem;
      font-weight: 700;
      line-height: 1.1;
      color: #0f172a;
      letter-spacing: -0.02em;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      margin-bottom: 0.25rem;
    }

    .subtitle {
      text-transform: uppercase;
      letter-spacing: 0.1em;
      font-size: 0.85rem;
      font-weight: 600;
      color: #6366f1;
      margin-bottom: 2rem;
    }

    blockquote {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.5rem;
      font-style: italic;
      color: #475569;
      border-left: 4px solid #6366f1;
      padding-left: 1.5rem;
      margin: 2rem 0;
      line-height: 1.5;
    }

    p {
      margin: 1.5rem 0;
    }
  </style>
</head>
<body>
  <h1>The Art of Typography</h1>
  <p class="subtitle">Mastering Web Typography</p>
  <p>Good typography is invisible. Bad typography is everywhere.</p>
  <blockquote>Typography is the craft of endowing human language with a durable visual form.</blockquote>
  <p>This is body text styled for optimal readability.</p>
</body>
</html>`,
    hint: "Link Google Fonts in <head>. Use font-family, font-weight, letter-spacing, text-transform, text-shadow. Set max-width on body for ideal line length.",
    tests: [
      { name: "Google Fonts linked", validate: testContains("fonts.googleapis.com") },
      { name: "font-family declared", validate: testContains("font-family") },
      { name: "line-height declared", validate: testContains("line-height") },
      { name: "letter-spacing used", validate: testContains("letter-spacing") },
      { name: "text-transform used", validate: testContains("text-transform") },
      { name: "text-shadow used", validate: testContains("text-shadow") },
    ],
  },
  {
    id: "box-model",
    chapter: 5,
    title: "Box Model",
    level: "Beginner",
    tags: ["Box Model", "Margin", "Padding", "Border", "box-sizing"],
    conceptExplanation: `Every HTML element is a rectangular box. The box model describes how space is calculated around content.

**The Box Model Layers (inside → outside):**
\`\`\`css
.box {
  width: 200px;
  padding: 20px;      /* Space between content and border */
  border: 2px solid black; /* Line around the padding */
  margin: 30px;        /* Space outside the border */
}
\`\`\`

**Visual Representation:**
┌──────────────────────────────┐  ← margin
│  ┌────────────────────────┐  │
│  │  ┌──────────────────┐  │  │  ← border
│  │  │  ↑ padding ↑     │  │  │
│  │  │  ← content →     │  │  │
│  │  │  ↓ padding ↓     │  │  │
│  │  └──────────────────┘  │  │
│  └────────────────────────┘  │
└──────────────────────────────┘

**box-sizing — Critical Property:**
\`\`\`css
/* Default (content-box): width excludes padding/border */
/* Total width = width + padding + border */

/* Modern standard (border-box): width includes padding/border */
/* Total width = width (includes everything) */
*, *::before, *::after {
  box-sizing: border-box;
}
\`\`\`

**Margin Collapse:**
Vertical margins of adjacent elements collapse to the largest margin. This only happens with block elements vertically.`,
    keyRules: [
      "Always set box-sizing: border-box on all elements — it makes sizing predictable",
      "Use margin for spacing OUTSIDE an element, padding for spacing INSIDE",
      "Vertical margins collapse — horizontal margins don't",
      "Use shorthand: margin: top right bottom left (clockwise)",
      "Use auto margin (margin: 0 auto) to center block elements horizontally",
    ],
    task: `Create a page demonstrating the box model:
1. Set box-sizing: border-box globally
2. Create a card with padding inside and margin outside
3. Show the difference between content-box and border-box
4. Use margin shorthand with 2 values (vertical | horizontal)
5. Center a div using margin: 0 auto
6. Add a border with border-radius`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Box Model</title>
  <style>
    /* Your CSS here */
    
  </style>
</head>
<body>
  <div class="card">
    <h2>Box Model Demo</h2>
    <p>This card demonstrates padding, margin, border, and border-radius.</p>
  </div>
  <div class="card centered">
    <p>This card is centered with margin: 0 auto.</p>
  </div>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Box Model</title>
  <style>
    *, *::before, *::after {
      box-sizing: border-box;
    }

    body {
      font-family: system-ui, sans-serif;
      margin: 2rem;
      background: #f8fafc;
    }

    .card {
      width: 100%;
      max-width: 400px;
      padding: 1.5rem 2rem;
      margin: 0 0 1.5rem;
      border: 2px solid #e2e8f0;
      border-radius: 16px;
      background: white;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }

    .centered {
      margin: 0 auto;
    }

    .card h2 {
      margin: 0 0 0.5rem;
      color: #0f172a;
    }

    .card p {
      margin: 0;
      color: #475569;
    }
  </style>
</head>
<body>
  <div class="card">
    <h2>Box Model Demo</h2>
    <p>This card demonstrates padding, margin, border, and border-radius.</p>
  </div>
  <div class="card centered">
    <p>This card is centered with margin: 0 auto.</p>
  </div>
</body>
</html>`,
    hint: "Set *, *::before, *::after { box-sizing: border-box; } at the top. Use padding for inner spacing, margin for outer spacing. border-radius rounds corners.",
    tests: [
      { name: "box-sizing: border-box set", validate: testContains("box-sizing") && testContains("border-box") },
      { name: "padding property used", validate: testContains("padding") },
      { name: "margin property used", validate: testContains("margin") },
      { name: "border property used", validate: testContains("border") },
      { name: "border-radius used", validate: testContains("border-radius") },
    ],
  },
  {
    id: "display-properties",
    chapter: 6,
    title: "Display Properties",
    level: "Beginner",
    tags: ["Display", "Block", "Inline", "Inline-Block", "None"],
    conceptExplanation: `The display property controls how an element behaves in the layout flow.

**Display Values:**
\`\`\`css
/* Block — takes full width, starts on new line */
display: block;

/* Inline — flows with text, no width/height control */
display: inline;

/* Inline-block — flows with text but can have width/height */
display: inline-block;

/* None — completely removes element (not hidden, no space) */
display: none;

/* Hidden — element is invisible but takes space (not display: none) */
/* Use visibility: hidden instead */
\`\`\`

**Common Element Defaults:**
• Block: div, p, h1-h6, section, header, footer, ul, li
• Inline: span, a, strong, em, img (technically replaced inline)
• Inline-block: button, input, select, textarea (replaced elements)

**Differences:**
| Property | block | inline | inline-block |
|---------|-------|--------|-------------|
| New line | Yes | No | No |
| Width/height | Yes | No | Yes |
| margin/padding (vertical) | Yes | No | Yes |
| margin/padding (horizontal) | Yes | Yes | Yes |`,
    keyRules: [
      "Block elements take 100% width by default — they stack vertically",
      "Inline elements ignore width, height, and vertical margin",
      "Inline-block is useful for horizontal layouts before Flexbox/Grid",
      "Use display: none for hiding — visibility: hidden hides but keeps space",
      "img is an inline element but you can still set its width/height (replaced element)",
    ],
    task: `Create a page demonstrating display properties:
1. A block-level div (default behavior)
2. An inline span that doesn't break the line
3. An inline-block element with a set width and height
4. A hidden element with display: none
5. A navigation using inline-block for horizontal links
6. Show how inline elements ignore width setting`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Display Properties</title>
  <style>
    /* Your CSS here */
    
  </style>
</head>
<body>
  <h1>Display Properties</h1>
  
  <div class="block-demo">This is a block element.</div>
  <div class="block-demo">Another block element.</div>
  
  <p>
    This text has <span class="inline-demo">an inline span</span> that doesn't break the line.
  </p>
  
  <div class="inline-block-demo">Inline-Block 1</div>
  <div class="inline-block-demo">Inline-Block 2</div>
  
  <div class="hidden-demo">You can't see me!</div>
  
  <nav>
    <a href="#">Home</a>
    <a href="#">About</a>
    <a href="#">Contact</a>
  </nav>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Display Properties</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      margin: 2rem;
      line-height: 1.6;
    }

    .block-demo {
      background: #e0e7ff;
      padding: 1rem;
      margin: 0.5rem 0;
      border-radius: 8px;
    }

    .inline-demo {
      background: #fef3c7;
      padding: 0.2rem 0.5rem;
      /* width and height won't work on inline elements! */
    }

    .inline-block-demo {
      display: inline-block;
      width: 200px;
      height: 60px;
      background: #ede9fe;
      padding: 1rem;
      margin: 0.5rem;
      border-radius: 8px;
      text-align: center;
    }

    .hidden-demo {
      display: none;
    }

    nav a {
      display: inline-block;
      padding: 0.5rem 1rem;
      background: #6366f1;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      margin: 0.25rem;
    }

    nav a:hover {
      background: #4f46e5;
    }
  </style>
</head>
<body>
  <h1>Display Properties</h1>
  <div class="block-demo">This is a block element.</div>
  <div class="block-demo">Another block element.</div>
  <p>This text has <span class="inline-demo">an inline span</span> that doesn't break the line.</p>
  <div class="inline-block-demo">Inline-Block 1</div>
  <div class="inline-block-demo">Inline-Block 2</div>
  <div class="hidden-demo">You can't see me!</div>
  <nav>
    <a href="#">Home</a>
    <a href="#">About</a>
    <a href="#">Contact</a>
  </nav>
</body>
</html>`,
    hint: "Block elements stack vertically. Inline elements flow in text. Inline-block lets you set width/height while staying inline. display: none removes the element entirely.",
    tests: [
      { name: "display: inline-block used", validate: testContains("inline-block") },
      { name: "display: none used", validate: testContains("display: none") || testContains("display:none") },
      { name: "Block element (default) present", validate: testContains("block-demo") },
      { name: "Inline element demo present", validate: testContains("inline-demo") },
    ],
  },
  {
    id: "positioning",
    chapter: 7,
    title: "Positioning",
    level: "Intermediate",
    tags: ["Position", "Relative", "Absolute", "Fixed", "Sticky", "Z-Index"],
    conceptExplanation: `Positioning lets you control exactly where elements appear on the page.

**Position Values:**
\`\`\`css
/* Static — default, follows normal flow */
position: static;

/* Relative — offset from normal position, keeps original space */
position: relative;
top: 10px; left: 20px;

/* Absolute — removed from flow, positioned relative to nearest positioned ancestor */
position: absolute;
top: 0; right: 0;

/* Fixed — removed from flow, positioned relative to viewport */
position: fixed;
bottom: 0; left: 0;

/* Sticky — hybrid: normal flow until scroll threshold, then fixed */
position: sticky;
top: 0;
\`\`\`

**Offset Properties:**
• top, right, bottom, left — used with positioned elements

**Z-Index:**
Controls stacking order. Higher values appear on top.
\`\`\`css
.modal { z-index: 100; }    /* On top */
.overlay { z-index: 50; }
\`\`\`

**Key Concept: Positioned Ancestor**
An absolutely positioned element looks for the nearest ancestor with position: relative, absolute, fixed, or sticky. If none exists, it positions relative to the viewport.`,
    keyRules: [
      "Use position: relative on a parent to create a positioning context for children",
      "position: absolute removes element from normal flow (other elements ignore it)",
      "position: fixed is great for navbars, back-to-top buttons, modals",
      "position: sticky works within a scroll container — requires a threshold (top, bottom)",
      "z-index only works on positioned elements (not static)",
      "Higher z-index = closer to user (on top)",
    ],
    task: `Create a page demonstrating positioning:
1. A container with position: relative
2. A badge inside it with position: absolute (top-right corner)
3. A fixed header that stays at the top when scrolling
4. A sticky section heading
5. Use z-index to layer elements properly`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Positioning</title>
  <style>
    /* Your CSS here */
    body { font-family: system-ui, sans-serif; margin: 0; }
    
  </style>
</head>
<body>
  <header class="fixed-header">Fixed Header — Stays on Top</header>
  
  <main>
    <h1>Positioning Demo</h1>
    
    <div class="card-container">
      <div class="card">
        <h2>Limited Time Offer</h2>
        <p>This card has a badge in the corner.</p>
        <span class="badge">NEW</span>
      </div>
    </div>
    
    <section>
      <h2 class="sticky-heading">Section 1 — Sticky Heading</h2>
      <p>Scroll down to see the sticky behavior...</p>
    </section>
    
    <section>
      <h2 class="sticky-heading">Section 2</h2>
      <p>More content here.</p>
    </section>
  </main>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Positioning</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      margin: 0;
      padding-top: 60px;
    }

    .fixed-header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 56px;
      background: #6366f1;
      color: white;
      display: flex;
      align-items: center;
      padding: 0 1.5rem;
      font-weight: 600;
      z-index: 100;
      box-shadow: 0 2px 10px rgba(99, 102, 241, 0.3);
    }

    main {
      max-width: 600px;
      margin: 2rem auto;
      padding: 0 1.5rem;
    }

    .card-container {
      position: relative;
      margin: 2rem 0;
    }

    .card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }

    .badge {
      position: absolute;
      top: -8px;
      right: -8px;
      background: #ef4444;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 700;
      z-index: 10;
      box-shadow: 0 2px 6px rgba(239, 68, 68, 0.4);
    }

    .sticky-heading {
      position: sticky;
      top: 56px;
      background: #f1f5f9;
      padding: 0.75rem 1rem;
      margin: 0;
      border-radius: 8px;
      z-index: 50;
    }

    section {
      margin: 2rem 0;
      min-height: 60vh;
      padding: 1rem;
      background: #f8fafc;
      border-radius: 12px;
    }
  </style>
</head>
<body>
  <header class="fixed-header">Fixed Header — Stays on Top</header>
  <main>
    <h1>Positioning Demo</h1>
    <div class="card-container">
      <div class="card">
        <h2>Limited Time Offer</h2>
        <p>This card has a badge in the corner.</p>
        <span class="badge">NEW</span>
      </div>
    </div>
    <section>
      <h2 class="sticky-heading">Section 1 — Sticky Heading</h2>
      <p>Scroll down to see the sticky behavior as it hits the top of the viewport.</p>
    </section>
    <section>
      <h2 class="sticky-heading">Section 2</h2>
      <p>More content here.</p>
    </section>
  </main>
</body>
</html>`,
    hint: "Use position: relative on the card container. Use position: absolute on the badge with top and right. Use position: fixed for the header. Use position: sticky for section headings.",
    tests: [
      { name: "position: fixed on header", validate: testContains("position: fixed") || testContains("position:fixed") },
      { name: "position: absolute on badge", validate: testContains("position: absolute") || testContains("position:absolute") },
      { name: "position: relative on container", validate: testContains("position: relative") || testContains("position:relative") },
      { name: "position: sticky used", validate: testContains("position: sticky") || testContains("position:sticky") },
      { name: "z-index used", validate: testContains("z-index") || testContains("z-index:") },
    ],
  },
  {
    id: "flexbox",
    chapter: 8,
    title: "Flexbox",
    level: "Intermediate",
    tags: ["Flexbox", "Layout", "Justify", "Align", "Flex"],
    conceptExplanation: `Flexbox is a one-dimensional layout system for distributing space and aligning items in rows or columns.

**Flex Container:**
\`\`\`css
.container {
  display: flex;
  /* or inline-flex */
}
\`\`\`

**Main Axis & Cross Axis:**
• main axis = direction of flex (default: row → horizontal)
• cross axis = perpendicular (default: column → vertical)

**Container Properties:**
\`\`\`css
.container {
  display: flex;
  flex-direction: row | row-reverse | column | column-reverse;
  flex-wrap: nowrap | wrap | wrap-reverse;
  justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;
  align-items: stretch | flex-start | flex-end | center | baseline;
  align-content: flex-start | center | space-between | space-around | stretch;
  gap: 1rem;
}
\`\`\`

**Item Properties:**
\`\`\`css
.item {
  flex: 1;                    /* grow, shrink, basis shorthand */
  flex-grow: 1;               /* how much to grow relative to others */
  flex-shrink: 0;             /* how much to shrink */
  flex-basis: 200px;          /* initial size before growing/shrinking */
  align-self: center;         /* override align-items for this item */
  order: -1;                  /* reorder items (default 0) */
}
\`\`\``,
    keyRules: [
      "Use justify-content on the main axis, align-items on the cross axis",
      "Use gap for spacing between flex items (instead of margin)",
      "flex: 1 makes items grow equally to fill available space",
      "flex-wrap: wrap enables multi-row flex layouts",
      "align-self overrides align-items for individual items",
    ],
    task: `Create a page demonstrating Flexbox:
1. A horizontal nav bar using display: flex with space-between
2. A card layout using flex-wrap with 3 cards per row
3. Center content both horizontally and vertically
4. Use gap for spacing between items
5. Use flex: 1 on items for equal distribution
6. Use align-self on one item to place it differently`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Flexbox</title>
  <style>
    /* Your CSS here */
    body { font-family: system-ui, sans-serif; margin: 2rem; }
    
  </style>
</head>
<body>
  <h1>Flexbox Demo</h1>
  
  <nav class="flex-nav">
    <a href="#">Logo</a>
    <div class="nav-links">
      <a href="#">Home</a>
      <a href="#">About</a>
      <a href="#">Contact</a>
    </div>
  </nav>
  
  <div class="card-grid">
    <div class="flex-card">Card 1</div>
    <div class="flex-card">Card 2</div>
    <div class="flex-card">Card 3</div>
  </div>
  
  <div class="center-box">
    <p>Perfectly Centered</p>
  </div>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Flexbox</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      margin: 2rem;
      line-height: 1.6;
    }

    .flex-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #1e293b;
      padding: 0.75rem 1.5rem;
      border-radius: 12px;
      margin-bottom: 2rem;
    }

    .flex-nav a {
      color: white;
      text-decoration: none;
      font-weight: 500;
    }

    .nav-links {
      display: flex;
      gap: 1.5rem;
    }

    .card-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .flex-card {
      flex: 1;
      min-width: 200px;
      background: #f1f5f9;
      padding: 2rem;
      border-radius: 12px;
      text-align: center;
      font-weight: 600;
      color: #475569;
      border: 1px solid #e2e8f0;
    }

    .flex-card:nth-child(2) {
      align-self: flex-start;
      background: #ede9fe;
      color: #6366f1;
    }

    .center-box {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 200px;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      border-radius: 12px;
      color: white;
      font-size: 1.25rem;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <h1>Flexbox Demo</h1>
  <nav class="flex-nav">
    <a href="#">Logo</a>
    <div class="nav-links">
      <a href="#">Home</a>
      <a href="#">About</a>
      <a href="#">Contact</a>
    </div>
  </nav>
  <div class="card-grid">
    <div class="flex-card">Card 1</div>
    <div class="flex-card">Card 2 (align-self)</div>
    <div class="flex-card">Card 3</div>
  </div>
  <div class="center-box">
    <p>Perfectly Centered</p>
  </div>
</body>
</html>`,
    hint: "Use display: flex on containers. justify-content for horizontal alignment, align-items for vertical. flex: 1 on children for equal sizing. gap for spacing.",
    tests: [
      { name: "display: flex used", validate: testContains("display: flex") || testContains("display:flex") },
      { name: "justify-content used", validate: testContains("justify-content") },
      { name: "align-items used", validate: testContains("align-items") },
      { name: "flex-wrap or flex property used", validate: testContains("flex-wrap") || testContains("flex:") },
      { name: "gap property used", validate: testContains("gap:") },
      { name: "align-self used", validate: testContains("align-self") },
    ],
  },
  {
    id: "css-grid",
    chapter: 9,
    title: "CSS Grid",
    level: "Intermediate",
    tags: ["Grid", "Layout", "Columns", "Rows", "Grid Areas"],
    conceptExplanation: `CSS Grid is a two-dimensional layout system for creating complex layouts with rows and columns.

**Grid Container:**
\`\`\`css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;  /* three equal columns */
  grid-template-rows: auto auto;        /* two rows */
  gap: 1rem;
}
\`\`\`

**Grid Template Units:**
\`\`\`css
grid-template-columns: 200px 1fr 1fr;    /* px, fr (fraction), %, auto */
grid-template-columns: repeat(3, 1fr);    /* 3 equal columns */
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* responsive */
grid-template-columns: 1fr 2fr 1fr;       /* 1:2:1 ratio */
\`\`\`

**Grid Item Placement:**
\`\`\`css
.item {
  grid-column: 1 / 3;      /* span from column line 1 to 3 */
  grid-column: 1 / -1;     /* span all columns */
  grid-row: 1 / 3;         /* span rows */
  grid-area: header;       /* named area */
}
\`\`\`

**Grid Template Areas (for complex layouts):**
\`\`\`css
.layout {
  display: grid;
  grid-template-areas:
    "header  header  header"
    "sidebar content content"
    "footer  footer  footer";
  grid-template-columns: 200px 1fr 1fr;
  gap: 1rem;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
.footer  { grid-area: footer; }
\`\`\``,
    keyRules: [
      "Use fr units for flexible columns — they distribute available space",
      "Use repeat(auto-fit, minmax(250px, 1fr)) for responsive grids without media queries",
      "Use grid-template-areas for page-level layouts (header, sidebar, main, footer)",
      "Use gap instead of margin for spacing grid items",
      "Grid is 2D — use it for layouts, Flexbox for 1D arrangements",
    ],
    task: `Create a page demonstrating CSS Grid:
1. A 3-column grid using 1fr units
2. A responsive grid using auto-fit and minmax()
3. Use grid-template-areas for a page layout (header, sidebar, main, footer)
4. An item that spans multiple columns
5. Use gap for spacing`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CSS Grid</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 2rem; }
    
  </style>
</head>
<body>
  <h1>CSS Grid Demo</h1>
  
  <h2>Basic 3-Column Grid</h2>
  <div class="grid-3">
    <div class="grid-item">1</div>
    <div class="grid-item">2</div>
    <div class="grid-item">3</div>
  </div>
  
  <h2>Responsive Grid</h2>
  <div class="responsive-grid">
    <div class="grid-item">A</div>
    <div class="grid-item">B</div>
    <div class="grid-item">C</div>
    <div class="grid-item">D</div>
  </div>
  
  <h2>Page Layout</h2>
  <div class="page-layout">
    <header class="page-header">Header</header>
    <aside class="page-sidebar">Sidebar</aside>
    <main class="page-main">Main Content</main>
    <footer class="page-footer">Footer</footer>
  </div>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CSS Grid</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      margin: 2rem;
      line-height: 1.6;
    }

    .grid-item {
      background: #e0e7ff;
      padding: 2rem;
      border-radius: 8px;
      text-align: center;
      font-weight: 600;
      color: #6366f1;
    }

    /* 3-column grid */
    .grid-3 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    /* Responsive grid */
    .responsive-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }

    /* Spanning item */
    .responsive-grid .grid-item:first-child {
      grid-column: 1 / -1;
      background: #c7d2fe;
    }

    /* Page layout */
    .page-layout {
      display: grid;
      grid-template-areas:
        "header  header  header"
        "sidebar main    main"
        "footer  footer  footer";
      grid-template-columns: 200px 1fr 1fr;
      gap: 1rem;
    }

    .page-header {
      grid-area: header;
      background: #6366f1;
      color: white;
      padding: 1rem 2rem;
      border-radius: 8px;
      font-weight: 600;
    }

    .page-sidebar {
      grid-area: sidebar;
      background: #f1f5f9;
      padding: 1.5rem;
      border-radius: 8px;
    }

    .page-main {
      grid-area: main;
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
      min-height: 200px;
    }

    .page-footer {
      grid-area: footer;
      background: #1e293b;
      color: white;
      padding: 1rem 2rem;
      border-radius: 8px;
      text-align: center;
    }
  </style>
</head>
<body>
  <h1>CSS Grid Demo</h1>
  <h2>Basic 3-Column Grid</h2>
  <div class="grid-3">
    <div class="grid-item">1</div>
    <div class="grid-item">2</div>
    <div class="grid-item">3</div>
  </div>
  <h2>Responsive Grid</h2>
  <div class="responsive-grid">
    <div class="grid-item full-width">A (spans all columns)</div>
    <div class="grid-item">B</div>
    <div class="grid-item">C</div>
    <div class="grid-item">D</div>
  </div>
  <h2>Page Layout</h2>
  <div class="page-layout">
    <header class="page-header">Header</header>
    <aside class="page-sidebar">Sidebar</aside>
    <main class="page-main">Main Content</main>
    <footer class="page-footer">Footer</footer>
  </div>
</body>
</html>`,
    hint: "display: grid + grid-template-columns. Use 1fr for flexible columns. Use repeat(auto-fit, minmax(Npx, 1fr)) for responsive. Use grid-template-areas for page layout.",
    tests: [
      { name: "display: grid used", validate: testContains("display: grid") || testContains("display:grid") },
      { name: "grid-template-columns used", validate: testContains("grid-template-columns") },
      { name: "fr units used", validate: testContains("1fr") },
      { name: "gap property used", validate: testContains("gap:") },
      { name: "auto-fit or auto-fill used", validate: testContains("auto-fit") || testContains("auto-fill") },
      { name: "minmax() used", validate: testContains("minmax(") },
    ],
  },
  {
    id: "responsive-design",
    chapter: 10,
    title: "Responsive Design",
    level: "Intermediate",
    tags: ["Responsive", "Media Queries", "Mobile First", "Breakpoints"],
    conceptExplanation: `Responsive design ensures your website looks great on all devices — from phones to ultra-wide monitors.

**Media Queries:**
\`\`\`css
/* Mobile First Approach: base styles first, then add breakpoints */

/* Base: mobile (< 640px) */
.container { padding: 0 1rem; }

/* Tablet (≥ 640px) */
@media (min-width: 640px) {
  .container { padding: 0 2rem; }
}

/* Desktop (≥ 1024px) */
@media (min-width: 1024px) {
  .container { max-width: 960px; margin: 0 auto; }
}
\`\`\`

**Common Breakpoints:**
\`\`\`css
/* sm */ @media (min-width: 640px)  { /* Tablet */ }
/* md */ @media (min-width: 768px)  { /* Small desktop */ }
/* lg */ @media (min-width: 1024px) { /* Desktop */ }
/* xl */ @media (min-width: 1280px) { /* Large desktop */ }
\`\`\`

**Responsive Design Principles:**
1. **Mobile First** — Start with the smallest screen, then add complexity
2. **Fluid Grids** — Use %, fr, vw instead of fixed pixels
3. **Flexible Images** — max-width: 100% on images
4. **Relative Units** — rem, em, vh, vw instead of px where possible
5. **Viewport Meta Tag** — <meta name="viewport" content="width=device-width, initial-scale=1.0">`,
    keyRules: [
      "Design mobile first — it's easier to add than to remove",
      "Use CSS Grid + auto-fit for responsive layouts without media queries",
      "Set img { max-width: 100%; } so images never overflow",
      "Test on real devices — emulators aren't perfect",
      "Use rem for spacing and font sizes — they respect user preferences",
    ],
    task: `Create a responsive page:
1. Use the viewport meta tag
2. A responsive grid that shows 1 column on mobile, 2 on tablet, 3 on desktop
3. Fluid typography that changes size at breakpoints
4. A navigation that becomes a hamburger-style list on mobile
5. Images that are max-width: 100%
6. Use mobile-first breakpoints`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Responsive Design</title>
  <style>
    /* Your CSS here */
    body { font-family: system-ui, sans-serif; margin: 0; line-height: 1.6; }
    
  </style>
</head>
<body>
  <nav>
    <a href="#">Home</a>
    <a href="#">About</a>
    <a href="#">Services</a>
    <a href="#">Contact</a>
  </nav>
  
  <main>
    <h1>Responsive Design</h1>
    <div class="responsive-grid">
      <div class="card">Card 1</div>
      <div class="card">Card 2</div>
      <div class="card">Card 3</div>
      <div class="card">Card 4</div>
      <div class="card">Card 5</div>
      <div class="card">Card 6</div>
    </div>
  </main>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Responsive Design</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      margin: 0;
      line-height: 1.6;
      padding: 1rem;
    }

    nav {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      background: #1e293b;
      padding: 1rem;
      border-radius: 12px;
      margin-bottom: 2rem;
    }

    nav a {
      color: white;
      text-decoration: none;
      padding: 0.5rem;
      border-radius: 6px;
    }

    nav a:hover { background: rgba(255,255,255,0.1); }

    /* Tablet and up */
    @media (min-width: 640px) {
      body { padding: 2rem; }
      
      nav {
        flex-direction: row;
        gap: 1rem;
      }
      
      h1 { font-size: 2.5rem; }
    }

    /* Desktop and up */
    @media (min-width: 1024px) {
      body { max-width: 1200px; margin: 0 auto; }
      h1 { font-size: 3rem; }
    }

    .responsive-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    @media (min-width: 640px) {
      .responsive-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (min-width: 1024px) {
      .responsive-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    .card {
      background: #f1f5f9;
      padding: 2rem;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      text-align: center;
      font-weight: 600;
      color: #475569;
    }

    img { max-width: 100%; height: auto; }
  </style>
</head>
<body>
  <nav>
    <a href="#">Home</a>
    <a href="#">About</a>
    <a href="#">Services</a>
    <a href="#">Contact</a>
  </nav>
  <main>
    <h1>Responsive Design</h1>
    <div class="responsive-grid">
      <div class="card">Card 1</div>
      <div class="card">Card 2</div>
      <div class="card">Card 3</div>
      <div class="card">Card 4</div>
      <div class="card">Card 5</div>
      <div class="card">Card 6</div>
    </div>
  </main>
</body>
</html>`,
    hint: "Use @media (min-width: ...) for mobile-first. Base styles are mobile, then add complexity at breakpoints. Use CSS Grid with media queries for responsive columns.",
    tests: [
      { name: "viewport meta tag present", validate: testContains("viewport") },
      { name: "Media query with min-width", validate: testContains("@media") && testContains("min-width") },
      { name: "Mobile-first grid (1 column base)", validate: testContains("grid-template-columns: 1fr") || testContains("grid-template-columns: 1fr;") },
      { name: "img max-width: 100%", validate: testContains("max-width: 100%") || testContains("max-width:100%") },
      { name: "Different layout at breakpoint", validate: testContains("repeat(2") || testContains("repeat(3") },
    ],
  },
  {
    id: "css-variables",
    chapter: 11,
    title: "CSS Variables",
    level: "Intermediate",
    tags: ["Variables", "Custom Properties", "Theming", "var()"],
    conceptExplanation: `CSS Custom Properties (CSS variables) store values you can reuse throughout your stylesheet.

**Defining and Using Variables:**
\`\`\`css
:root {
  --primary: #6366f1;
  --text: #1e293b;
  --spacing: 1rem;
}

.button {
  background: var(--primary);
  color: white;
  padding: var(--spacing);
}
\`\`\`

**Fallback Values:**
\`\`\`css
color: var(--undefined-var, #default-color);
\`\`\`

**Theme Switching with Variables:**
\`\`\`css
:root {
  --bg: #ffffff;
  --text: #1e293b;
}

[data-theme="dark"] {
  --bg: #0f172a;
  --text: #f1f5f9;
}

body {
  background: var(--bg);
  color: var(--text);
}
\`\`\`

**Variables in Media Queries & calc():**
\`\`\`css
:root { --padding: 1rem; }

@media (min-width: 768px) {
  :root { --padding: 2rem; }
}

.container {
  padding: var(--padding);
  width: calc(100% - var(--padding) * 2);
}
\`\`\`

**Benefits:**
• Reduces repetition (DRY)
• Makes theming easy
• Enables dynamic updates with JavaScript
• Cascade-aware (inherit properly)`,
    keyRules: [
      "Define global variables on :root so they cascade everywhere",
      "Use descriptive names: --color-primary, --spacing-md, --font-size-base",
      "Always provide fallback values for library/shared components",
      "CSS variables work with calc(), media queries, and animations",
      "Change variables at different scopes for theming",
    ],
    task: `Create a themed page using CSS variables:
1. Define variables for colors, spacing, font sizes on :root
2. Use the variables throughout the CSS
3. Create a light/dark theme variant
4. Use calc() with variables
5. Override a variable inside a specific component`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CSS Variables</title>
  <style>
    /* Your CSS here */
    
  </style>
</head>
<body>
  <h1>CSS Variables Demo</h1>
  <div class="card">
    <h2>Themed Card</h2>
    <p>This card uses CSS variables for all its styling.</p>
    <button class="btn">Click Me</button>
  </div>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CSS Variables</title>
  <style>
    :root {
      --color-primary: #6366f1;
      --color-primary-light: #e0e7ff;
      --color-text: #1e293b;
      --color-text-muted: #64748b;
      --color-bg: #ffffff;
      --color-surface: #f8fafc;
      --color-border: #e2e8f0;
      --spacing-xs: 0.5rem;
      --spacing-sm: 0.75rem;
      --spacing-md: 1rem;
      --spacing-lg: 1.5rem;
      --radius: 12px;
      --shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      --font-size-base: 1rem;
      --font-size-lg: 1.25rem;
      --font-size-xl: 2rem;
    }

    [data-theme="dark"] {
      --color-primary: #818cf8;
      --color-primary-light: #312e81;
      --color-text: #f1f5f9;
      --color-text-muted: #94a3b8;
      --color-bg: #0f172a;
      --color-surface: #1e293b;
      --color-border: #334155;
      --shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    }

    body {
      font-family: system-ui, sans-serif;
      background: var(--color-bg);
      color: var(--color-text);
      margin: var(--spacing-lg);
      line-height: 1.6;
      transition: background 0.3s, color 0.3s;
    }

    .card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius);
      padding: var(--spacing-lg);
      max-width: 400px;
      box-shadow: var(--shadow);
    }

    .card h2 {
      margin: 0 0 var(--spacing-sm);
      font-size: var(--font-size-lg);
    }

    .card p {
      color: var(--color-text-muted);
      margin: 0 0 var(--spacing-md);
      font-size: var(--font-size-base);
    }

    .btn {
      background: var(--color-primary);
      color: white;
      border: none;
      padding: var(--spacing-sm) var(--spacing-lg);
      border-radius: calc(var(--radius) / 2);
      font-size: var(--font-size-base);
      font-weight: 600;
      cursor: pointer;
      width: calc(100% - var(--spacing-sm));
    }

    .btn:hover {
      opacity: 0.9;
    }
  </style>
</head>
<body>
  <button onclick="document.documentElement.toggleAttribute('data-theme')" style="margin-bottom:1rem;padding:0.5rem 1rem;cursor:pointer;">
    Toggle Theme
  </button>
  <div class="card">
    <h2>Themed Card</h2>
    <p>This card uses CSS variables for all its styling. Click "Toggle Theme" to switch.</p>
    <button class="btn">Click Me</button>
  </div>
</body>
</html>`,
    hint: "Define variables on :root with --name. Use var(--name) to reference them. Override on [data-theme=\"dark\"] for dark mode. calc() works with variables.",
    tests: [
      { name: "Custom properties defined on :root", validate: testContains(":root") && testContains("--") },
      { name: "var() function used", validate: testContains("var(--") },
      { name: "Dark theme variant defined", validate: testContains('[data-theme="dark"]') || testContains("[data-theme='dark']") },
      { name: "calc() with variables used", validate: testContains("calc(") },
    ],
  },
  {
    id: "transitions",
    chapter: 12,
    title: "Transitions",
    level: "Intermediate",
    tags: ["Transitions", "Hover", "Easing", "Duration"],
    conceptExplanation: `CSS transitions smoothly animate changes between property values.

**Transition Properties:**
\`\`\`css
.button {
  background: blue;
  color: white;
  transition: all 0.3s ease;
}

.button:hover {
  background: darkblue;
  transform: translateY(-2px);
}
\`\`\`

**Transition Shorthand:**
\`\`\`css
transition: property duration timing-function delay;

/* Examples */
transition: all 0.3s ease;                    /* all properties */
transition: opacity 0.2s ease;                 /* specific property */
transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);  /* custom easing */
transition: background 0.2s, transform 0.3s;  /* multiple properties */
\`\`\`

**Timing Functions (Easing):**
\`\`\`css
transition-timing-function: ease;            /* default, slow start/end */
transition-timing-function: linear;          /* constant speed */
transition-timing-function: ease-in;         /* slow start, fast end */
transition-timing-function: ease-out;        /* fast start, slow end */
transition-timing-function: ease-in-out;     /* slow both ends */
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); /* custom */
\`\`\`

**Best Practices:**
• Transition only transform and opacity for performance (GPU accelerated)
• Avoid transitioning width, height (causes layout reflow)
• Use will-change for heavy animations (sparingly)`,
    keyRules: [
      "Use transition: all 0.3s ease for simple hover effects",
      "Prefer transitioning transform and opacity for smooth performance",
      "Use cubic-bezier for custom easing curves",
      "Set transitions on the base state, not the hover state",
      "Avoid transitioning width, height, or position (causes layout thrashing)",
    ],
    task: `Create a page demonstrating transitions:
1. A button that smoothly changes color on hover
2. A card that lifts on hover with transform
3. An image that scales on hover
4. A menu that slides in with transition
5. Use different durations and ease functions`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Transitions</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 2rem; }
    
  </style>
</head>
<body>
  <h1>CSS Transitions</h1>
  
  <button class="btn-hover">Hover me</button>
  
  <div class="card-lift">
    <h3>Lifting Card</h3>
    <p>This card lifts on hover.</p>
  </div>
  
  <div class="slide-menu">
    <p>Slide-in Menu</p>
  </div>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Transitions</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      margin: 2rem;
      line-height: 1.6;
    }

    .btn-hover {
      padding: 0.75rem 2rem;
      background: #6366f1;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .btn-hover:hover {
      background: #4f46e5;
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
    }

    .card-lift {
      max-width: 300px;
      margin: 2rem 0;
      padding: 2rem;
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .card-lift:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }

    .slide-menu {
      width: 200px;
      height: 200px;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      border-radius: 12px;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      cursor: pointer;
    }

    .slide-menu:hover {
      transform: translateX(50px) rotate(3deg);
    }
  </style>
</head>
<body>
  <h1>CSS Transitions</h1>
  <button class="btn-hover">Hover me</button>
  <div class="card-lift">
    <h3>Lifting Card</h3>
    <p>This card lifts on hover with a smooth transition.</p>
  </div>
  <div class="slide-menu">
    <p>Slide & Bounce</p>
  </div>
</body>
</html>`,
    hint: "Set transition on the base state (not :hover). Use transition: property duration easing. transform and opacity are the smoothest properties to animate.",
    tests: [
      { name: "transition property set", validate: testContains("transition:") },
      { name: "transform on hover", validate: testContains(":hover") && testContains("transform") },
      { name: "Different easing used", validate: testContains("cubic-bezier") || testContains("ease") },
      { name: "transition for multiple properties", validate: testContains("transition:") },
    ],
  },
  {
    id: "animations",
    chapter: 13,
    title: "CSS Animations",
    level: "Advanced",
    tags: ["Animations", "Keyframes", "@keyframes", "Animation Properties"],
    conceptExplanation: `CSS animations create complex, multi-step animations using @keyframes.

**Keyframes Syntax:**
\`\`\`css
@keyframes slide-in {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Or using percentages for more control */
@keyframes bounce {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}
\`\`\`

**Animation Properties:**
\`\`\`css
.element {
  animation-name: slide-in;             /* @keyframes name */
  animation-duration: 0.5s;             /* how long */
  animation-timing-function: ease-out;  /* easing curve */
  animation-delay: 0s;                  /* delay before start */
  animation-iteration-count: 1;         /* number of times */
  animation-direction: normal;          /* normal | reverse | alternate */
  animation-fill-mode: forwards;        /* keep final state */
  animation-play-state: running;        /* running | paused */

  /* Shorthand */
  animation: slide-in 0.5s ease-out forwards;
}
\`\`\`

**Multiple Animations:**
\`\`\`css
.element {
  animation: fadeIn 0.3s ease, slideUp 0.4s ease-out 0.1s;
}
\`\`\`

**Performance Tips:**
• Prefer animating transform and opacity
• Use will-change: transform for smoother animations
• Avoid animating width, height, or box-shadow (expensive)`,
    keyRules: [
      "Define @keyframes with meaningful names",
      "Use animation shorthand: name duration timing-function fill-mode",
      "Use animation-fill-mode: forwards to keep the end state",
      "Prefer transform over position changes for smooth performance",
      "Use will-change sparingly — too many can hurt performance",
    ],
    task: `Create a page with CSS animations:
1. A fade-in animation on page load
2. A bouncing ball using @keyframes
3. A loading spinner
4. An element that slides in from the left
5. An animation with different iteration counts`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CSS Animations</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 2rem; }
    
  </style>
</head>
<body>
  <h1>CSS Animations</h1>
  
  <div class="fade-in">Fade In</div>
  <div class="bounce-ball"></div>
  <div class="spinner"></div>
  <div class="slide-in">Slide In</div>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CSS Animations</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      margin: 2rem;
      line-height: 1.6;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      40% { transform: translateY(-30px); }
      60% { transform: translateY(-15px); }
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @keyframes slideFromLeft {
      from {
        transform: translateX(-100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    .fade-in {
      padding: 1rem;
      background: #6366f1;
      color: white;
      border-radius: 8px;
      margin-bottom: 1rem;
      animation: fadeIn 0.6s ease-out;
    }

    .bounce-ball {
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, #f59e0b, #ef4444);
      border-radius: 50%;
      margin-bottom: 1rem;
      animation: bounce 1s ease-in-out infinite;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #e2e8f0;
      border-top-color: #6366f1;
      border-radius: 50%;
      margin-bottom: 1rem;
      animation: spin 0.8s linear infinite;
    }

    .slide-in {
      padding: 1rem;
      background: #10b981;
      color: white;
      border-radius: 8px;
      animation: slideFromLeft 0.5s ease-out 0.3s both;
    }
  </style>
</head>
<body>
  <h1>CSS Animations</h1>
  <div class="fade-in">Fade In</div>
  <div class="bounce-ball"></div>
  <div class="spinner"></div>
  <div class="slide-in">Slide In</div>
</body>
</html>`,
    hint: "Use @keyframes name { from { } to { } } for basic, or percentages for multi-step. Use animation: name duration timing-function. For infinite loops add 'infinite'.",
    tests: [
      { name: "@keyframes defined", validate: testContains("@keyframes") },
      { name: "animation property used", validate: testContains("animation:") || testContains("animation-name:") },
      { name: "transform used in keyframes", validate: testContains("transform") },
      { name: "Multiple @keyframes defined", validate: (c) => (c.match(/@keyframes/g) || []).length >= 2 },
    ],
  },
  {
    id: "transforms",
    chapter: 14,
    title: "Transformations",
    level: "Intermediate",
    tags: ["Transform", "Scale", "Rotate", "Translate", "Skew"],
    conceptExplanation: `CSS transforms manipulate an element's appearance by moving, rotating, scaling, or skewing it.

**Transform Functions:**
\`\`\`css
/* Translate (move) */
transform: translateX(50px);       /* move right */
transform: translateY(-20px);      /* move up */
transform: translate(50px, -20px); /* x and y */
transform: translate(-50%, -50%);  /* center perfectly */

/* Scale (size) */
transform: scale(1.5);            /* 150% size */
transform: scaleX(2);             /* stretch horizontally */
transform: scaleY(0.5);           /* shrink vertically */

/* Rotate */
transform: rotate(45deg);         /* clockwise */
transform: rotate(-90deg);        /* counter-clockwise */

/* Skew (tilt) */
transform: skewX(10deg);          /* tilt horizontally */
transform: skew(10deg, 5deg);     /* x and y tilt */

/* 3D Transforms */
transform: perspective(500px) rotateY(45deg);
transform: translateZ(50px);

/* Multiple transforms (space separated) */
transform: scale(1.1) rotate(5deg) translateY(-5px);
\`\`\`

**Transform Origin:**
\`\`\`css
transform-origin: center;      /* default */
transform-origin: top left;
transform-origin: 50% 50%;
\`\`\`

**Transform vs Position:**
• transform is GPU-accelerated (smooth, performant)
• transform doesn't affect layout (other elements aren't pushed around)
• transform can be animated efficiently`,
    keyRules: [
      "Use transform for animations — it's GPU accelerated and avoids layout reflow",
      "Space multiple transforms: transform: scale(1.1) rotate(5deg)",
      "Use transform: translate(-50%, -50%) for perfect centering",
      "Use transform-origin to change the pivot point",
      "Use perspective for 3D effects — apply it to the parent element",
    ],
    task: `Create a page demonstrating transform functions:
1. A card that scales on hover
2. A button that rotates on click/hover
3. An element translated to center using transform
4. A 3D card flip effect using rotateY
5. Multiple transforms combined`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Transforms</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 2rem; }
    
  </style>
</head>
<body>
  <h1>CSS Transforms</h1>
  
  <div class="card-scale">Scale on Hover</div>
  <button class="btn-rotate">Rotate</button>
  <div class="center-me">Transformed Center</div>
  
  <div class="card-3d">
    <div class="card-front">Front</div>
    <div class="card-back">Back</div>
  </div>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Transforms</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      margin: 2rem;
      line-height: 1.6;
    }

    .card-scale {
      width: 200px;
      padding: 2rem;
      background: #f1f5f9;
      border-radius: 12px;
      text-align: center;
      margin-bottom: 1rem;
      transition: transform 0.3s ease;
    }

    .card-scale:hover {
      transform: scale(1.1) rotate(2deg);
    }

    .btn-rotate {
      padding: 0.75rem 2rem;
      background: #6366f1;
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      margin-bottom: 1rem;
      transition: transform 0.3s ease;
    }

    .btn-rotate:hover {
      transform: rotate(15deg) scale(1.1);
    }

    .center-me {
      width: 200px;
      padding: 2rem;
      background: #10b981;
      color: white;
      border-radius: 12px;
      text-align: center;
      margin-bottom: 2rem;
      /* Perfect centering: */
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }

    /* 3D Card Flip */
    .card-3d {
      width: 200px;
      height: 200px;
      perspective: 800px;
      cursor: pointer;
    }

    .card-3d > div {
      width: 100%;
      height: 100%;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      transition: transform 0.6s;
      backface-visibility: hidden;
      position: absolute;
    }

    .card-front {
      background: #6366f1;
      color: white;
    }

    .card-back {
      background: #f59e0b;
      color: white;
      transform: rotateY(180deg);
    }

    .card-3d:hover .card-front {
      transform: rotateY(180deg);
    }

    .card-3d:hover .card-back {
      transform: rotateY(360deg);
    }
  </style>
</head>
<body>
  <h1>CSS Transforms</h1>
  <div class="card-scale">Scale on Hover</div>
  <button class="btn-rotate">Rotate</button>
  <div class="center-me">Transformed Center</div>
  <div class="card-3d">
    <div class="card-front">Front</div>
    <div class="card-back">Back</div>
  </div>
</body>
</html>`,
    hint: "Use transform: scale(), rotate(), translate(), skew(). Multiple transforms: transform: scale(1.1) rotate(5deg). For 3D: perspective on parent, rotateY on child. backface-visibility: hidden.",
    tests: [
      { name: "transform: scale() used", validate: testContains("scale(") },
      { name: "transform: rotate() used", validate: testContains("rotate(") },
      { name: "transform: translate() used", validate: testContains("translate(") },
      { name: "perspective used for 3D", validate: testContains("perspective") },
      { name: "backface-visibility used", validate: testContains("backface-visibility") },
    ],
  },
  {
    id: "pseudo-classes",
    chapter: 15,
    title: "Pseudo Classes",
    level: "Intermediate",
    tags: [":hover", ":focus", ":nth-child", ":not()", ":has()", "Pseudo Classes"],
    conceptExplanation: `Pseudo-classes select elements based on their state or position in the document.

**User Action Pseudo-classes:**
\`\`\`css
:hover          /* When mouse is over the element */
:focus          /* When element has keyboard focus */
:focus-visible  /* Focus visible to user (keyboard navigation) */
:active         /* When element is being clicked */
:visited        /* Visited link */
:target         /* When element is the target of URL hash */
\`\`\`

**Structural Pseudo-classes:**
\`\`\`css
:first-child       /* First child of parent */
:last-child        /* Last child of parent */
:nth-child(2)      /* Second child */
:nth-child(odd)    /* Odd children (1, 3, 5...) */
:nth-child(3n+1)   /* Every 3rd starting at 1 */
:nth-last-child(2) /* Second from last */
:first-of-type     /* First element of its type */
:only-child        /* Lone child */
\`\`\`

**Form/Input Pseudo-classes:**
\`\`\`css
:disabled      /* Disabled input */
:checked       /* Checked checkbox/radio */
:required      /* Required input */
:valid         /* Valid input value */
:invalid       /* Invalid input value */
:in-range      /* Within range */
:placeholder-shown /* Placeholder visible */
\`\`\`

**Modern Pseudo-classes:**
\`\`\`css
:not(.class)     /* Negation — all elements except this */
:is(.a, .b)     /* Matches any of the selectors (forgiving) */
:has(p)         /* Parent containing a p (parent selector!) */
:empty          /* Element with no children */
\`\`\``,
    keyRules: [
      "Use :nth-child(odd/even) for zebra striping tables",
      "Use :focus-visible for keyboard focus styles (don't hide it)",
      ":has() is a parent selector — use it to style parents based on children",
      "Use :not() to exclude specific elements from a selection",
      "Order matters for links: :link → :visited → :hover → :active (LoVeHA)",
    ],
    task: `Create a page demonstrating pseudo-classes:
1. Zebra striping using :nth-child(odd)
2. A styled :focus state on inputs
3. :hover effects on cards
4. :disabled and :checked on form elements
5. Use :has() to style a card that contains an image`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Pseudo Classes</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 2rem; }
    
  </style>
</head>
<body>
  <h1>Pseudo Classes</h1>
  
  <ul class="zebra-list">
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
    <li>Item 4</li>
    <li>Item 5</li>
  </ul>
  
  <form>
    <input type="text" placeholder="Focus me" />
    <input type="text" disabled value="Disabled" />
    <label><input type="checkbox" /> Checked</label>
  </form>
  
  <div class="card-container">
    <div class="feature-card">Card 1</div>
    <div class="feature-card">Card 2</div>
  </div>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Pseudo Classes</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      margin: 2rem;
      line-height: 1.6;
    }

    .zebra-list {
      list-style: none;
      padding: 0;
      max-width: 300px;
      margin-bottom: 2rem;
    }

    .zebra-list li {
      padding: 0.75rem 1rem;
    }

    .zebra-list li:nth-child(odd) {
      background: #f1f5f9;
      border-radius: 6px;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      max-width: 300px;
      margin-bottom: 2rem;
    }

    input[type="text"] {
      padding: 0.75rem 1rem;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.2s, box-shadow 0.2s;
    }

    input[type="text"]:focus {
      border-color: #6366f1;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
      outline: none;
    }

    input[type="text"]:disabled {
      background: #f1f5f9;
      color: #94a3b8;
    }

    input[type="checkbox"]:checked + label {
      color: #6366f1;
      font-weight: 600;
    }

    .card-container {
      display: flex;
      gap: 1rem;
    }

    .feature-card {
      flex: 1;
      padding: 2rem;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      transition: all 0.2s;
    }

    .feature-card:hover {
      border-color: #6366f1;
      background: #e0e7ff;
      transform: translateY(-2px);
    }

    .card-container:has(.feature-card:nth-child(2):hover) {
      gap: 2rem;
    }
  </style>
</head>
<body>
  <h1>Pseudo Classes</h1>
  <ul class="zebra-list">
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
    <li>Item 4</li>
    <li>Item 5</li>
  </ul>
  <form>
    <input type="text" placeholder="Focus me" />
    <input type="text" disabled value="Disabled" />
    <label><input type="checkbox" /> Checkbox label</label>
  </form>
  <div class="card-container">
    <div class="feature-card">Hover over me</div>
    <div class="feature-card">And me</div>
  </div>
</body>
</html>`,
    hint: ":nth-child(odd) for zebra stripes, :focus for input focus styles, :hover for interactive elements, :disabled for disabled states. :has() is a parent selector.",
    tests: [
      { name: ":nth-child used", validate: testContains(":nth-child") },
      { name: ":focus used", validate: testContains(":focus") || testContains(":focus") },
      { name: ":hover used", validate: testContains(":hover") },
      { name: ":disabled used", validate: testContains(":disabled") },
      { name: ":has() used", validate: testContains(":has(") },
    ],
  },
  {
    id: "pseudo-elements",
    chapter: 16,
    title: "Pseudo Elements",
    level: "Intermediate",
    tags: ["::before", "::after", "::first-line", "Pseudo Elements", "Content"],
    conceptExplanation: `Pseudo-elements create virtual elements that don't exist in the HTML. They're powerful for decorative effects without extra markup.

**Common Pseudo-elements:**
\`\`\`css
::before  /* Creates a virtual first child */
::after   /* Creates a virtual last child */
::first-line  /* Styles the first line of text */
::first-letter /* Styles the first letter */
::selection    /* Styles selected/highlighted text */
::placeholder  /* Styles placeholder text in inputs */
\`\`\`

**The content Property (required for ::before/::after):**
\`\`\`css
/* String */
.element::before { content: "★ "; }

/* Empty (for visual effects) */
.element::after { content: ""; }

/* Attribute value */
.element::before { content: attr(data-label); }

/* Counter */
.element::before { content: counter(num); }

/* URL (image) */
.element::after { content: url("icon.svg"); }
\`\`\`

**Practical Examples:**
\`\`\`css
/* Decorative quote */
blockquote::before {
  content: '"';
  font-size: 4rem;
  color: #6366f1;
}

/* Clearfix */
.container::after {
  content: "";
  display: table;
  clear: both;
}

/* Tooltip arrow */
.tooltip::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 8px solid transparent;
  border-top-color: #333;
}
\`\`\``,
    keyRules: [
      "::before and ::after always need the content property (even if empty string)",
      "Pseudo-elements are inline by default — set display: block or position: absolute as needed",
      "Use ::before/::after for decorative elements, not content that matters for accessibility",
      "Use double-colon syntax (::) to distinguish pseudo-elements from pseudo-classes",
      "::first-letter and ::first-line only work on block-level elements",
    ],
    task: `Create a page demonstrating pseudo-elements:
1. A blockquote with decorative quotes using ::before and ::after
2. A card with a gradient overlay using ::after
3. A tooltip with an arrow using ::after
4. Custom ::selection color
5. Custom list bullets using ::before`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Pseudo Elements</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 2rem; }
    
  </style>
</head>
<body>
  <h1>Pseudo Elements</h1>
  
  <blockquote>CSS is awesome!</blockquote>
  
  <div class="gradient-card">Card with overlay</div>
  
  <p>Select this text to see custom selection color.</p>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Pseudo Elements</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      margin: 2rem;
      line-height: 1.6;
    }

    /* Custom selection */
    ::selection {
      background: #6366f1;
      color: white;
    }

    /* Blockquote with decorative quotes */
    blockquote {
      position: relative;
      font-size: 1.5rem;
      font-style: italic;
      padding: 2rem 3rem;
      color: #475569;
      max-width: 500px;
    }

    blockquote::before {
      content: '"';
      position: absolute;
      top: -10px;
      left: 0;
      font-size: 5rem;
      color: #6366f1;
      line-height: 1;
      font-family: Georgia, serif;
    }

    blockquote::after {
      content: '"';
      position: absolute;
      bottom: -40px;
      right: 0;
      font-size: 5rem;
      color: #6366f1;
      line-height: 1;
      font-family: Georgia, serif;
    }

    /* Card with gradient overlay */
    .gradient-card {
      width: 300px;
      height: 200px;
      background: url('https://picsum.photos/300/200') center/cover;
      border-radius: 12px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 600;
      overflow: hidden;
      margin-bottom: 1rem;
    }

    .gradient-card::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.6), rgba(139, 92, 246, 0.6));
      transition: opacity 0.3s;
    }

    .gradient-card:hover::after {
      opacity: 0;
    }

    .gradient-card span {
      position: relative;
      z-index: 1;
    }

    /* Custom list bullets */
    ul {
      list-style: none;
      padding: 0;
    }

    ul li::before {
      content: "→ ";
      color: #6366f1;
      font-weight: bold;
    }

    /* Tooltip example */
    .tooltip {
      position: relative;
      display: inline-block;
      padding: 0.5rem 1rem;
      background: #1e293b;
      color: white;
      border-radius: 6px;
      cursor: help;
    }

    .tooltip::after {
      content: "I'm a tooltip!";
      position: absolute;
      bottom: 120%;
      left: 50%;
      transform: translateX(-50%);
      background: #1e293b;
      color: white;
      padding: 0.5rem 0.75rem;
      border-radius: 6px;
      font-size: 0.85rem;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s;
    }

    .tooltip:hover::after {
      opacity: 1;
    }
  </style>
</head>
<body>
  <h1>Pseudo Elements</h1>
  <blockquote>CSS is awesome!</blockquote>
  <div class="gradient-card"><span>Hover to reveal</span></div>
  <p>Select this text to see custom selection color.</p>
  <ul>
    <li>Custom bullet</li>
    <li>Using ::before</li>
    <li>No extra HTML needed!</li>
  </ul>
  <div class="tooltip">Hover me</div>
</body>
</html>`,
    hint: "::before and ::after need content: '' (even if empty). Use position: absolute for layout control. Double colon (::) is the modern syntax for pseudo-elements.",
    tests: [
      { name: "::before used with content", validate: testContains("::before") && testContains("content:") },
      { name: "::after used with content", validate: testContains("::after") && testContains("content:") },
      { name: "::selection styled", validate: testContains("::selection") },
      { name: "content property with string", validate: testContains('content:') },
      { name: "Pseudo-element with position: absolute", validate: testContains("position: absolute") || testContains("position:absolute") },
    ],
  },
  {
    id: "modern-layouts",
    chapter: 17,
    title: "Modern Layout Techniques",
    level: "Advanced",
    tags: ["Container Queries", "clamp()", "minmax()", "Subgrid", "Logical Properties"],
    conceptExplanation: `Modern CSS provides powerful layout tools that reduce the need for media queries and JavaScript.

**Container Queries:**
\`\`\`css
/* Define a containment context */
.card-container {
  container-type: inline-size;
  container-name: card;
}

/* Style based on container width, not viewport */
@container card (min-width: 400px) {
  .card { display: flex; }
}
\`\`\`

**Logical Properties (write once for LTR/RTL):**
\`\`\`css
/* Physical → Logical */
margin-left   → margin-inline-start
margin-right  → margin-inline-end
padding-top   → padding-block-start
padding-bottom → padding-block-end
width         → inline-size
height        → block-size
border-left   → border-inline-start

/* Example: works for both LTR and RTL languages */
.element {
  margin-inline: auto;        /* horizontal centering */
  padding-block: 1rem;        /* top and bottom padding */
  border-inline-start: 3px solid blue;  /* left border in LTR */
}
\`\`\`

**Modern CSS Features:**
\`\`\`css
/* Aspect ratio */
img { aspect-ratio: 16 / 9; }

/* Backdrop filter */
.modal-backdrop { backdrop-filter: blur(8px); }

/* Scroll snap */
.container { scroll-snap-type: x mandatory; }
.child { scroll-snap-align: start; }

/* Subgrid (in Grid) */
.child-grid {
  display: grid;
  grid-template-columns: subgrid;
}
\`\`\``,
    keyRules: [
      "Use container queries for component-level responsiveness",
      "Use logical properties (margin-inline, padding-block) for RTL support",
      "Use aspect-ratio instead of padding-bottom hack for videos/images",
      "Use backdrop-filter for frosted glass effects",
      "Browser support: check caniuse.com for modern features",
    ],
    task: `Create a page demonstrating modern CSS:
1. Use aspect-ratio on an image
2. Use container queries for responsive cards
3. Use backdrop-filter for a glassmorphism effect
4. Use logical properties for spacing
5. Use scroll-snap for a horizontal gallery`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Modern CSS</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 2rem; }
    
  </style>
</head>
<body>
  <h1>Modern CSS</h1>
  
  <img src="https://picsum.photos/800/450" alt="Demo" class="aspect-image" />
  
  <div class="glass-card">
    <h2>Glassmorphism</h2>
    <p>Frosted glass effect.</p>
  </div>
  
  <div class="scroll-gallery">
    <div class="gallery-item">1</div>
    <div class="gallery-item">2</div>
    <div class="gallery-item">3</div>
    <div class="gallery-item">4</div>
  </div>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Modern CSS</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      margin: 2rem;
      line-height: 1.6;
      background: #0f172a;
      color: #f1f5f9;
    }

    h1 { color: #f8fafc; }

    /* Aspect ratio */
    .aspect-image {
      width: 100%;
      max-width: 600px;
      aspect-ratio: 16 / 9;
      object-fit: cover;
      border-radius: 12px;
      margin-bottom: 2rem;
    }

    /* Glassmorphism with backdrop-filter */
    .glass-card {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 16px;
      padding: 2rem;
      max-width: 400px;
      margin-bottom: 2rem;
    }

    .glass-card h2 {
      margin: 0 0 0.5rem;
      color: white;
    }

    .glass-card p {
      margin: 0;
      color: rgba(255, 255, 255, 0.7);
    }

    /* Scroll snap gallery */
    .scroll-gallery {
      display: flex;
      gap: 1rem;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      padding-block: 1rem;
      margin-inline: -2rem;
      padding-inline: 2rem;
      scrollbar-width: thin;
    }

    .gallery-item {
      flex: 0 0 300px;
      height: 200px;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      font-weight: 700;
      color: white;
      scroll-snap-align: start;
    }

    .gallery-item:nth-child(2) { background: linear-gradient(135deg, #f59e0b, #ef4444); }
    .gallery-item:nth-child(3) { background: linear-gradient(135deg, #10b981, #059669); }
    .gallery-item:nth-child(4) { background: linear-gradient(135deg, #ec4899, #8b5cf6); }
  </style>
</head>
<body>
  <h1>Modern CSS</h1>
  <img src="https://picsum.photos/800/450" alt="Demo" class="aspect-image" />
  <div class="glass-card">
    <h2>Glassmorphism</h2>
    <p>Frosted glass effect with backdrop-filter.</p>
  </div>
  <div class="scroll-gallery">
    <div class="gallery-item">1</div>
    <div class="gallery-item">2</div>
    <div class="gallery-item">3</div>
    <div class="gallery-item">4</div>
  </div>
</body>
</html>`,
    hint: "Use aspect-ratio on images. backdrop-filter for glass effect. scroll-snap-type on container + scroll-snap-align on children. Use logical properties (margin-inline, padding-block) for better i18n support.",
    tests: [
      { name: "aspect-ratio used", validate: testContains("aspect-ratio") },
      { name: "backdrop-filter used", validate: testContains("backdrop-filter") },
      { name: "scroll-snap-type used", validate: testContains("scroll-snap") },
      { name: "Logical properties used", validate: testContains("margin-inline") || testContains("padding-block") || testContains("inset-inline") },
    ],
  },
  {
    id: "css-architecture",
    chapter: 18,
    title: "CSS Architecture",
    level: "Advanced",
    tags: ["BEM", "Naming", "Organization", "Scalability", "Cascade Layers"],
    conceptExplanation: `As projects grow, organizing CSS becomes critical. Good architecture prevents collisions and keeps code maintainable.

**BEM Naming Convention (Block Element Modifier):**
\`\`\`css
/* Block — standalone component */
.card { }

/* Element — part of a block (__) */
.card__title { }
.card__image { }
.card__button { }

/* Modifier — variation state (--) */
.card--featured { }
.card__button--primary { }
.card__button--large { }

/* HTML: */
/* <div class="card card--featured">
 *   <h2 class="card__title">Title</h2>
 *   <button class="card__button card__button--primary">Buy</button>
 * </div>
 */
\`\`\`

**@layer (Cascade Layers):**
Control the order of styles without fighting specificity:
\`\`\`css
@layer reset, base, components, utilities;

@layer reset {
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; }
}

@layer base {
  a { color: #6366f1; }
  h1 { font-size: 2rem; }
}

@layer components {
  .card { padding: 1rem; background: white; }
}

@layer utilities {
  .text-center { text-align: center; }
  .mt-4 { margin-top: 1rem; }
}
\`\`\`

**CSS Organization Principles:**
1. Separate concerns: reset → base → components → utilities
2. Keep specificity low and flat
3. Use meaningful, consistent naming
4. Don't nest more than 3 levels deep in preprocessors
5. Co-locate component styles with components`,
    keyRules: [
      "Use BEM naming to avoid collisions and make relationships clear",
      "Use @layer to control cascade order without fighting specificity",
      "Keep specificity low — avoid IDs in CSS, minimize nesting",
      "Separate CSS into logical files: reset, base, components, utilities",
      "Co-locate component CSS with the component code (CSS Modules, styled-components)",
    ],
    task: `Create a page using BEM methodology:
1. Use BEM naming (block__element--modifier)
2. Use @layer to organize styles
3. Create a card component using BEM
4. Create a button component with modifiers
5. Show different modifier combinations`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CSS Architecture</title>
  <style>
    /* Your CSS here */
    body { font-family: system-ui, sans-serif; margin: 2rem; }
    
  </style>
</head>
<body>
  <h1>CSS Architecture with BEM</h1>
  
  <div class="card card--featured">
    <img class="card__image" src="https://picsum.photos/300/200" alt="Card image" />
    <div class="card__body">
      <h2 class="card__title">Featured Card</h2>
      <p class="card__text">This card uses BEM naming.</p>
      <button class="card__button card__button--primary">Buy Now</button>
      <button class="card__button card__button--secondary">Learn More</button>
    </div>
  </div>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CSS Architecture</title>
  <style>
    @layer reset, base, components;

    @layer reset {
      *, *::before, *::after {
        box-sizing: border-box;
      }
      body {
        margin: 2rem;
        font-family: system-ui, sans-serif;
        line-height: 1.6;
        color: #1e293b;
        background: #f8fafc;
      }
    }

    @layer base {
      h1 { color: #0f172a; }
      h2 { color: #1e293b; }
    }

    @layer components {
      .card {
        max-width: 350px;
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        transition: transform 0.2s, box-shadow 0.2s;
      }

      .card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
      }

      .card--featured {
        border-color: #6366f1;
        box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
      }

      .card__image {
        width: 100%;
        aspect-ratio: 3/2;
        object-fit: cover;
        display: block;
      }

      .card__body {
        padding: 1.5rem;
      }

      .card__title {
        margin: 0 0 0.5rem;
        font-size: 1.25rem;
      }

      .card__text {
        color: #64748b;
        margin: 0 0 1rem;
        font-size: 0.9rem;
      }

      .card__button {
        padding: 0.5rem 1.25rem;
        border: 2px solid;
        border-radius: 8px;
        font-weight: 600;
        font-size: 0.85rem;
        cursor: pointer;
        transition: all 0.2s;
      }

      .card__button--primary {
        background: #6366f1;
        border-color: #6366f1;
        color: white;
        margin-right: 0.5rem;
      }

      .card__button--primary:hover {
        background: #4f46e5;
      }

      .card__button--secondary {
        background: transparent;
        border-color: #e2e8f0;
        color: #64748b;
      }

      .card__button--secondary:hover {
        border-color: #6366f1;
        color: #6366f1;
      }
    }
  </style>
</head>
<body>
  <h1>CSS Architecture with BEM</h1>
  <div class="card card--featured">
    <img class="card__image" src="https://picsum.photos/300/200" alt="Card image" />
    <div class="card__body">
      <h2 class="card__title">Featured Card</h2>
      <p class="card__text">This card uses BEM naming with @layer cascade layers.</p>
      <button class="card__button card__button--primary">Buy Now</button>
      <button class="card__button card__button--secondary">Learn More</button>
    </div>
  </div>
</body>
</html>`,
    hint: "BEM: block__element--modifier. @layer defines cascade order. Use @layer reset, base, components to organize. Keep styles flat and specific.",
    tests: [
      { name: "BEM naming used (__)", validate: testContains("__") },
      { name: "BEM modifier used (--)", validate: testContains("--") },
      { name: "@layer used", validate: testContains("@layer") },
      { name: "Multiple layers defined", validate: (c) => (c.match(/@layer/g) || []).length >= 2 },
    ],
  },
  {
    id: "accessibility-styling",
    chapter: 19,
    title: "Accessibility Styling",
    level: "Advanced",
    tags: ["Accessibility", "Focus", "Contrast", "Reduced Motion", "A11y"],
    conceptExplanation: `Accessible styling ensures your website is usable by everyone, including people with disabilities.

**Focus Styles (Never remove focus outlines):**
\`\`\`css
/* Good: visible focus ring */
button:focus-visible {
  outline: 2px solid #6366f1;
  outline-offset: 2px;
}

/* Bad: never do this */
button:focus { outline: none; }
/* If you must, provide a replacement: */
button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.5);
}
\`\`\`

**Color Contrast:**
• WCAG AA: 4.5:1 for normal text, 3:1 for large text
• WCAG AAA: 7:1 for normal text, 4.5:1 for large text
• Don't rely on color alone to convey information

**Reduced Motion:**
\`\`\`css
/* Respect user's system preferences */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
\`\`\`

**Other Accessibility Considerations:**
• Use min font-size: 16px to prevent zoom auto-rotation on mobile
• Ensure touch targets are at least 44×44px
• Use visible focus indicators on all interactive elements
• Don't hide skip-links or make them too tiny`,
    keyRules: [
      "Never remove focus outlines — use :focus-visible for custom focus styles",
      "Ensure proper color contrast (min 4.5:1 for normal text)",
      "Don't rely on color alone — use icons, text, or patterns too",
      "Respect prefers-reduced-motion for users with vestibular disorders",
      "Make touch targets at least 44×44px (mobile accessibility)",
    ],
    task: `Create an accessible styled page:
1. Custom :focus-visible styles on buttons and links
2. Show how reduced motion media query disables animations
3. Ensure proper color contrast ratios
4. Style a form with accessible labels and error states
5. Add a focus-within style to card containers`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Accessible CSS</title>
  <style>
    /* Your CSS here */
    body { font-family: system-ui, sans-serif; margin: 2rem; line-height: 1.6; }
    
  </style>
</head>
<body>
  <h1>Accessible Styling</h1>
  
  <form>
    <label for="name">Name:</label>
    <input type="text" id="name" />
    
    <button type="submit">Submit</button>
  </form>
  
  <div class="animated-card">Hover for animation</div>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Accessible CSS</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      margin: 2rem;
      line-height: 1.6;
      color: #1e293b;
      background: #ffffff;
    }

    /* Custom focus styles */
    :focus-visible {
      outline: 2px solid #6366f1;
      outline-offset: 2px;
      border-radius: 4px;
    }

    /* Respect reduced motion */
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
      }
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      max-width: 300px;
      margin-bottom: 2rem;
    }

    label {
      font-weight: 600;
      color: #1e293b;
      font-size: 0.9rem;
    }

    input[type="text"] {
      padding: 0.75rem 1rem;
      border: 2px solid #cbd5e1;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.2s, box-shadow 0.2s;
    }

    input[type="text"]:focus {
      border-color: #6366f1;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
    }

    input[type="text"]:user-invalid {
      border-color: #ef4444;
    }

    /* Error message styling */
    input[type="text"]:user-invalid + .error {
      display: block;
    }

    .error {
      display: none;
      color: #dc2626;
      font-size: 0.85rem;
    }

    button {
      padding: 0.75rem 1.5rem;
      background: #6366f1;
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      min-height: 44px;
      min-width: 44px;
    }

    .animated-card {
      padding: 2rem;
      background: #f1f5f9;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.8; }
    }
  </style>
</head>
<body>
  <h1>Accessible Styling</h1>
  <form>
    <label for="name">Name:</label>
    <input type="text" id="name" />
    <span class="error">Name is required</span>
    <button type="submit">Submit</button>
  </form>
  <div class="animated-card">This animation respects reduced motion preferences.</div>
</body>
</html>`,
    hint: "Use :focus-visible (not :focus) for visible focus rings. Add @media (prefers-reduced-motion: reduce) to disable animations. Ensure 4.5:1 contrast ratio.",
    tests: [
      { name: ":focus-visible used", validate: testContains(":focus-visible") },
      { name: "prefers-reduced-motion used", validate: testContains("prefers-reduced-motion") },
      { name: "min-height or min-width for touch targets", validate: testContains("min-height") || testContains("min-width") },
      { name: "Color contrast accessible colors", validate: testContains("color: #1e293b") || testContains("color: #") },
    ],
  },
  {
    id: "advanced-css",
    chapter: 20,
    title: "Advanced CSS",
    level: "Advanced",
    tags: ["Advanced", "Filters", "Shapes", "Gradients", "Masking", "Conic Gradient"],
    conceptExplanation: `Advanced CSS features enable complex visual effects without JavaScript or SVGs.

**CSS Filters:**
\`\`\`css
.filter {
  filter: blur(5px);
  filter: brightness(1.5);
  filter: contrast(200%);
  filter: grayscale(100%);
  filter: sepia(50%);
  filter: hue-rotate(90deg);
  filter: drop-shadow(2px 4px 6px black);
  filter: invert(100%);
  filter: saturate(2);
  /* Multiple: */
  filter: brightness(1.2) contrast(1.1) grayscale(0.5);
}
\`\`\`

**Advanced Gradients:**
\`\`\`css
/* Radial Gradient */
background: radial-gradient(circle, #6366f1, #8b5cf6);

/* Conic Gradient */
background: conic-gradient(from 0deg, red, yellow, lime, blue, red);

/* Multiple gradients */
background:
  linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3)),
  radial-gradient(circle at top right, #6366f1, transparent);
\`\`\`

**CSS Shapes:**
\`\`\`css
.shape {
  width: 200px;
  height: 200px;
  background: #6366f1;
  clip-path: circle(50%);
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  clip-path: ellipse(50% 30%);
}
\`\`\`

**CSS Masking:**
\`\`\`css
.masked {
  mask-image: url("mask.svg");
  mask-size: cover;
  -webkit-mask-image: url("mask.svg");
}
\`\`\`

**Mix Blend Mode:**
\`\`\`css
.blend {
  mix-blend-mode: multiply;     /* darken */
  mix-blend-mode: screen;       /* lighten */
  mix-blend-mode: overlay;      /* contrast */
  background-blend-mode: overlay;
}
\`\`\``,
    keyRules: [
      "Use filter for quick image effects — avoid editing images manually",
      "Use clip-path for unique shapes and interesting layouts",
      "Use gradients for backgrounds, overlays, and decorative elements",
      "CSS filters perform well — they're GPU accelerated",
      "Use mix-blend-mode to create stunning overlapping effects",
    ],
    task: `Create an advanced CSS effects page:
1. An image with CSS filters (grayscale to color on hover)
2. A section with conic gradient background
3. Elements with clip-path shapes (circle, triangle, polygon)
4. A drop-shadow filter on text
5. A gradient with multiple color stops`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Advanced CSS</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 2rem; }
    
  </style>
</head>
<body>
  <h1>Advanced CSS Effects</h1>
  
  <img src="https://picsum.photos/400/300" alt="Demo" class="filter-image" />
  
  <div class="conic-bg">Conic Gradient</div>
  
  <div class="shapes">
    <div class="circle"></div>
    <div class="triangle"></div>
  </div>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Advanced CSS</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      margin: 2rem;
      line-height: 1.6;
      background: #0f172a;
      color: #f1f5f9;
    }

    h1 { color: #f8fafc; }

    /* Filter image */
    .filter-image {
      width: 400px;
      max-width: 100%;
      border-radius: 12px;
      filter: grayscale(100%) brightness(0.8);
      transition: filter 0.5s ease;
      margin-bottom: 2rem;
    }

    .filter-image:hover {
      filter: grayscale(0%) brightness(1);
    }

    /* Conic gradient */
    .conic-bg {
      width: 300px;
      height: 200px;
      border-radius: 16px;
      background: conic-gradient(from 0deg, #6366f1, #ec4899, #f59e0b, #10b981, #6366f1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 700;
      font-size: 1.25rem;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      margin-bottom: 2rem;
    }

    /* Clip-path shapes */
    .shapes {
      display: flex;
      gap: 2rem;
      align-items: center;
    }

    .circle {
      width: 150px;
      height: 150px;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      clip-path: circle(50%);
    }

    .triangle {
      width: 150px;
      height: 150px;
      background: linear-gradient(135deg, #f59e0b, #ef4444);
      clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    }

    /* Drop shadow on text */
    .shadow-text {
      font-size: 3rem;
      font-weight: 800;
      color: #f8fafc;
      filter: drop-shadow(0 4px 8px rgba(99, 102, 241, 0.5));
      margin-bottom: 1rem;
    }
  </style>
</head>
<body>
  <h1>Advanced CSS Effects</h1>
  <p class="shadow-text">Drop Shadow Text</p>
  <img src="https://picsum.photos/400/300" alt="Demo" class="filter-image" />
  <div class="conic-bg">Conic Gradient</div>
  <div class="shapes">
    <div class="circle"></div>
    <div class="triangle"></div>
  </div>
</body>
</html>`,
    hint: "filter: grayscale(100%) for black/white. Conic gradient with conic-gradient(). clip-path: circle() or polygon() for shapes. filter: drop-shadow() for text shadows.",
    tests: [
      { name: "CSS filter used", validate: testContains("filter:") },
      { name: "clip-path used", validate: testContains("clip-path:") },
      { name: "conic-gradient used", validate: testContains("conic-gradient") },
      { name: "grayscale filter used", validate: testContains("grayscale(") },
    ],
  },
];
