// ────────────────────────────────────────────────────
// Tailwind CSS Labs — Complete Curriculum Data
// 20 Chapters · 50+ Lessons
// ────────────────────────────────────────────────────

// ─── HELPERS ───

function testContains(patterns) {
  return (code) => {
    if (typeof patterns === "string") return code.includes(patterns);
    return patterns.some(p => code.includes(p));
  };
}

function testRegex(regex) {
  return (code) => regex.test(code);
}

function testAll(...fns) {
  return (code) => fns.every(fn => fn(code));
}

function testAny(...fns) {
  return (code) => fns.some(fn => fn(code));
}

// ─── CHAPTER 1: INTRODUCTION ───

const CH1_LESSONS = [
  {
    id: "tw-what-is-tailwind",
    chapter: 1,
    title: "What is Tailwind CSS?",
    level: "Beginner",
    tags: ["Tailwind", "CSS", "Utility-First"],
    conceptExplanation: `Tailwind CSS is a **utility-first CSS framework** that lets you build designs directly in your HTML using pre-built utility classes.

Unlike traditional CSS frameworks like Bootstrap (which provide pre-designed components), Tailwind gives you low-level utility classes like \`flex\`, \`text-center\`, \`p-4\`, \`bg-blue-500\`, etc.

**Utility-First Philosophy:**
• Instead of writing custom CSS, you compose designs using utility classes
• No more naming things! No more battling specificity
• Highly customizable via a config file
• Produces smaller CSS files in production (purging removes unused styles)

**Traditional CSS vs Tailwind:**
\`\`\`html
<!-- Traditional CSS: write classes, then style them -->
<div class="card">...</div>
<style>
  .card { background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,.1); }
</style>

<!-- Tailwind: compose directly in HTML -->
<div class="bg-white p-4 rounded-lg shadow-md">...</div>
\`\`\`

**Benefits:**
• Faster development — no context switching between HTML and CSS files
• Consistent design — uses a predefined design system
• Responsive built-in — use \`sm:\`, \`md:\`, \`lg:\` prefixes
• Dark mode — use \`dark:\` prefix
• Small production builds — purge eliminates unused CSS`,
    keyRules: [
      "Tailwind is utility-first — compose, don't write custom CSS",
      "No naming conventions needed — classes describe what they do",
      "Customize everything in tailwind.config.js",
      "Production builds purge unused CSS automatically",
      "Use @apply to extract repeated utility patterns (sparingly)",
    ],
    task: `Create an HTML page that demonstrates Tailwind's utility-first approach:
1. Link Tailwind CSS via CDN: <script src="https://cdn.tailwindcss.com">
2. Create a card using only Tailwind utility classes (bg-white, rounded-lg, shadow-md, p-6)
3. Use text-2xl for a heading and text-gray-600 for body text
4. Add a blue button with bg-blue-500, text-white, px-4, py-2, rounded`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>What is Tailwind?</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100">
  <!-- Build your Tailwind card here -->
  
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>What is Tailwind?</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 min-h-screen flex items-center justify-center p-4">
  <div class="bg-white rounded-xl shadow-lg p-8 max-w-sm">
    <h2 class="text-2xl font-bold text-gray-900 mb-2">Tailwind CSS</h2>
    <p class="text-gray-600 mb-6 leading-relaxed">
      Build modern websites rapidly with utility-first CSS. No custom CSS needed!
    </p>
    <button class="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg transition duration-200">
      Learn More
    </button>
  </div>
</body>
</html>`,
    hint: "Use bg-white for background, rounded-xl for rounded corners, shadow-lg for shadow. Tailwind CDN: <script src=\"https://cdn.tailwindcss.com\">",
    tests: [
      { name: "Tailwind CDN linked", validate: testContains("cdn.tailwindcss.com") },
      { name: "bg-white used", validate: testContains("bg-white") },
      { name: "rounded class used", validate: testRegex(/rounded-\w+/) },
      { name: "shadow class used", validate: testRegex(/shadow-\w+/) },
      { name: "text color class used", validate: testRegex(/text-(gray|blue|white)-\d+/) },
      { name: "padding class used", validate: testRegex(/p[xytb]?-\d+/) },
    ],
  },
  {
    id: "tw-utility-first",
    chapter: 1,
    title: "Utility-First vs Traditional CSS",
    level: "Beginner",
    tags: ["Utility-First", "Comparison", "Workflow"],
    conceptExplanation: `**Traditional CSS Workflow:**
1. Write HTML structure
2. Name a class for your element
3. Write CSS rules in a separate file
4. Repeat for every new component
5. Eventually, CSS files grow huge and naming becomes hard

**Tailwind Utility-First Workflow:**
1. Write HTML structure
2. Add utility classes directly — \`flex items-center justify-between p-4\`
3. See results immediately
4. No file switching, no naming, no specificity battles

**When to extract components:**
If you repeat the same utility pattern 3+ times, extract it:
\`\`\`html
<!-- Instead of repeating these utilities... -->
<div class="bg-white rounded-lg shadow-md p-6">...</div>
<div class="bg-white rounded-lg shadow-md p-6">...</div>

<!-- ...use @apply in your CSS -->
<style>
  .card { @apply bg-white rounded-lg shadow-md p-6; }
</style>
\`\`\`

**The Trade-offs:**
✅ Pros: Fast development, consistent, no naming, small CSS, responsive built-in
❌ Cons: HTML can look verbose, learning curve for class names, team familiarity needed`,
    keyRules: [
      "Utility-first means faster prototyping — no CSS file switching",
      "HTML looks verbose initially, but you learn to read the classes fast",
      "Use @apply for repeated patterns, but prefer keeping utilities in HTML",
      "Tailwind generates zero CSS for unused classes — smaller bundles",
      "Responsive design is just a prefix away: md:flex lg:grid-cols-3",
    ],
    task: `Create a navigation bar using Tailwind utilities:
1. A flex container with items-center and justify-between
2. A logo/text on the left
3. Navigation links in the center using flex and gap-*
4. A CTA button on the right
5. Add hover effects on links (hover:text-blue-600)`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Utility-First Nav</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">
  <!-- Build a navigation bar with Tailwind -->
  
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Utility-First Nav</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">
  <nav class="bg-white shadow-sm">
    <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
      <div class="text-xl font-bold text-gray-900">MyApp</div>
      <div class="hidden md:flex items-center gap-6">
        <a href="#" class="text-gray-600 hover:text-blue-600 transition">Home</a>
        <a href="#" class="text-gray-600 hover:text-blue-600 transition">Features</a>
        <a href="#" class="text-gray-600 hover:text-blue-600 transition">Pricing</a>
        <a href="#" class="text-gray-600 hover:text-blue-600 transition">About</a>
      </div>
      <button class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition">
        Get Started
      </button>
    </div>
  </nav>
  <div class="max-w-6xl mx-auto px-4 py-12">
    <h1 class="text-4xl font-bold text-gray-900 mb-4">Utility-First CSS</h1>
    <p class="text-lg text-gray-600">No custom CSS needed — just utilities in HTML.</p>
  </div>
</body>
</html>`,
    hint: "Use flex items-center justify-between on the nav. Use gap-6 for spacing links. Use hover:text-blue-600 for hover effects.",
    tests: [
      { name: "flex used", validate: testContains("flex") },
      { name: "items-center used", validate: testContains("items-center") },
      { name: "justify-between used", validate: testContains("justify-between") },
      { name: "gap class used", validate: testRegex(/gap-\d+/) },
      { name: "hover: prefix used", validate: testContains("hover:") },
      { name: "max-w class used", validate: testRegex(/max-w-\w+/) },
    ],
  },
];

// ─── CHAPTER 2: UTILITY CLASSES ───

const CH2_LESSONS = [
  {
    id: "tw-text-bg-utilities",
    chapter: 2,
    title: "Text & Background Utilities",
    level: "Beginner",
    tags: ["Text", "Background", "Typography"],
    conceptExplanation: `Tailwind provides a comprehensive set of text and background utility classes.

**Text Color:** \`text-{color}-{shade}\`
\`\`\`html
<p class="text-gray-900">Dark text</p>
<p class="text-blue-600">Blue text</p>
<p class="text-red-500">Red text</p>
<p class="text-white">White text</p>
\`\`\`

**Background Color:** \`bg-{color}-{shade}\`
\`\`\`html
<div class="bg-blue-500">Blue background</div>
<div class="bg-gray-100">Light gray background</div>
<div class="bg-gradient-to-r from-blue-500 to-purple-600">Gradient</div>
\`\`\`

**Text Size:** \`text-{size}\`
\`\`\`html
<p class="text-xs">Extra small</p>
<p class="text-sm">Small</p>
<p class="text-base">Base (default, 16px)</p>
<p class="text-lg">Large</p>
<p class="text-xl">Extra large</p>
<p class="text-2xl">2x</p>
<p class="text-4xl">4x</p>
\`\`\`

**Text Weight:** \`font-{weight}\`
\`\`\`html
<p class="font-normal">400</p>
<p class="font-medium">500</p>
<p class="font-semibold">600</p>
<p class="font-bold">700</p>
<p class="font-extrabold">800</p>
\`\`\`

**Tailwind Color Palette:**
Each color has shades from 50 (lightest) to 900/950 (darkest):
\`gray-50, gray-100, gray-200, ..., gray-900, gray-950\`

Common colors: \`slate, gray, zinc, neutral, stone, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose\``,
    keyRules: [
      "Color format: {property}-{color}-{shade} — e.g., bg-blue-500, text-gray-900",
      "Use shades 50-200 for backgrounds, 500-700 for interactive elements, 800-950 for text",
      "Gradient: bg-gradient-to-{direction} from-{color} to-{color}",
      "Text sizes range from text-xs (0.75rem) to text-9xl (8rem)",
      "Use font-medium or font-semibold for emphasis, font-bold for headings",
    ],
    task: `Create a page demonstrating text and background utilities:
1. A gradient hero section (bg-gradient-to-r from-indigo-500 to-purple-600)
2. A heading with text-4xl and font-bold
3. A subtitle with text-lg and text-gray-200
4. A card with bg-white, rounded-xl, and shadow-lg
5. Text in various sizes and colors`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Text & Background</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <!-- Create a hero with gradient -->
  
  <!-- Create a card with text utilities -->
  
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Text & Background</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <section class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 px-4 text-center">
    <h1 class="text-5xl font-extrabold mb-4">Text & Background Utilities</h1>
    <p class="text-lg text-indigo-200 max-w-xl mx-auto">Master Tailwind's color system and text styling utilities.</p>
  </section>
  
  <div class="max-w-2xl mx-auto px-4 py-12 space-y-4">
    <div class="bg-white rounded-2xl shadow-lg p-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Typography Showcase</h2>
      <p class="text-xs text-gray-400">Extra small (text-xs)</p>
      <p class="text-sm text-gray-500">Small text (text-sm)</p>
      <p class="text-base text-gray-600">Base text (text-base)</p>
      <p class="text-lg text-gray-700">Large text (text-lg)</p>
      <p class="text-xl text-gray-800 font-medium">Extra large (text-xl)</p>
      <p class="text-3xl text-gray-900 font-bold mt-4">Display Size (text-3xl)</p>
    </div>
    
    <div class="bg-white rounded-2xl shadow-lg p-8">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">Color Palette</h2>
      <div class="flex gap-2 mb-3">
        <div class="w-8 h-8 rounded bg-red-500"></div>
        <div class="w-8 h-8 rounded bg-blue-500"></div>
        <div class="w-8 h-8 rounded bg-green-500"></div>
        <div class="w-8 h-8 rounded bg-yellow-500"></div>
        <div class="w-8 h-8 rounded bg-purple-500"></div>
        <div class="w-8 h-8 rounded bg-pink-500"></div>
      </div>
      <p class="text-blue-600 font-medium">Blue text</p>
      <p class="text-green-600 font-medium">Green text</p>
      <p class="text-red-600 font-medium">Red text</p>
    </div>
  </div>
</body>
</html>`,
    hint: "Color format: bg-{color}-{500/600/700} or text-{color}-{shade}. Gradients: bg-gradient-to-r from-{color} to-{color}. Text sizes: text-sm, text-base, text-lg, text-xl, text-2xl through text-6xl.",
    tests: [
      { name: "Gradient background used", validate: testContains("bg-gradient") },
      { name: "text color class used", validate: testRegex(/text-\w+-\d+/) },
      { name: "text size class used", validate: testRegex(/text-(xs|sm|base|lg|xl|\dxl)/) },
      { name: "font-weight class used", validate: testRegex(/font-(normal|medium|semibold|bold|extrabold)/) },
      { name: "bg color class used", validate: testRegex(/bg-\w+-\d+/) },
      { name: "rounded class used", validate: testRegex(/rounded-\w+/) },
    ],
  },
  {
    id: "tw-padding-margin",
    chapter: 2,
    title: "Padding & Margin",
    level: "Beginner",
    tags: ["Spacing", "Padding", "Margin"],
    conceptExplanation: `Spacing is one of the most common CSS tasks. Tailwind makes it incredibly simple.

**Padding classes:** \`p{t|r|b|l|x|y}-{size}\`
\`\`\`html
<div class="p-4">All sides: 1rem (16px)</div>
<div class="px-6">Horizontal only: left + right</div>
<div class="py-3">Vertical only: top + bottom</div>
<div class="pt-8">Padding-top only</div>
<div class="pb-2">Padding-bottom only</div>
<div class="pl-4">Padding-left only</div>
<div class="pr-4">Padding-right only</div>
\`\`\`

**Margin classes:** \`m{t|r|b|l|x|y}-{size}\`
\`\`\`html
<div class="m-4">All sides margin</div>
<div class="mx-auto">Horizontal centering!</div>
<div class="mt-6">Margin-top</div>
<div class="mb-3">Margin-bottom</div>
<div class="-mt-2">Negative margin!</div>
\`\`\`

**Spacing Scale:** 
\`p-0\` (0px) → \`p-0.5\` (2px) → \`p-1\` (4px) → \`p-2\` (8px) → \`p-3\` (12px) → \`p-4\` (16px) → \`p-5\` (20px) → \`p-6\` (24px) → \`p-8\` (32px) → \`p-10\` (40px) → \`p-12\` (48px) → \`p-16\` (64px) → \`p-20\` (80px) → \`p-24\` (96px)

**Key Pattern:** Each step is 4px (0.25rem) — so p-4 = 16px, p-8 = 32px, etc.`,
    keyRules: [
      "Use p-{size} for padding, m-{size} for margin",
      "Use px-* for horizontal, py-* for vertical spacing",
      "mx-auto centers a block element horizontally",
      "Use space-y-{size} and space-x-{size} for spacing between flex children",
      "Negative margins available: -m-2, -mt-4, -mx-6",
    ],
    task: `Create a page demonstrating spacing utilities:
1. A centered container using mx-auto and max-w-* 
2. Cards with different padding (p-4, p-8) to show the spacing difference
3. Use mt-* and mb-* for vertical rhythm between sections
4. Use space-y-* to space items in a flex column
5. A button with px-6 py-3 for comfortable padding`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Spacing Utilities</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100">
  <div class="max-w-2xl mx-auto">
    <!-- Add spacing examples here -->
    
  </div>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Spacing Utilities</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 min-h-screen py-12">
  <div class="max-w-2xl mx-auto px-4">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Spacing Utilities Demo</h1>
    
    <!-- Different padding levels -->
    <div class="space-y-4 mb-12">
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <span class="text-sm text-gray-600">p-4 (16px padding)</span>
      </div>
      <div class="bg-white rounded-lg p-8 border border-gray-200">
        <span class="text-sm text-gray-600">p-8 (32px padding)</span>
      </div>
    </div>
    
    <!-- Card with proper spacing -->
    <div class="bg-white rounded-2xl shadow-md p-8 mb-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Card Title</h2>
      <p class="text-gray-600 mb-6">This card uses mt-*, mb-* and p-* for proper spacing.</p>
      <div class="flex gap-3">
        <button class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition">
          Primary Action
        </button>
        <button class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition">
          Secondary
        </button>
      </div>
    </div>
    
    <!-- Centering demo -->
    <div class="bg-indigo-600 text-white rounded-2xl p-8 text-center">
      <p class="text-lg mb-2">Centered with mx-auto + max-w-2xl</p>
      <p class="text-indigo-200 text-sm">No custom CSS needed!</p>
    </div>
  </div>
</body>
</html>`,
    hint: "Padding: p-{size}, px-{size}, py-{size}. Margin: m-{size}, mx-auto for centering. space-y-{size} for vertical spacing between children.",
    tests: [
      { name: "max-w class used", validate: testRegex(/max-w-\w+/) },
      { name: "mx-auto used for centering", validate: testContains("mx-auto") },
      { name: "padding class used", validate: testRegex(/p[xytb]?-\d+/) },
      { name: "margin class used", validate: testRegex(/m[tblrxy]?-\d+/) },
      { name: "space-y or gap used", validate: testAny(testRegex(/space-y-\d+/), testRegex(/gap-\d+/)) },
    ],
  },
];

// ─── CHAPTER 3: SPACING ───

const CH3_LESSONS = [
  {
    id: "tw-spacing-deep",
    chapter: 3,
    title: "Spacing In-Depth",
    level: "Beginner",
    tags: ["Spacing", "Gap", "Space Between"],
    conceptExplanation: `Tailwind's spacing system goes beyond simple margin and padding.

**Gap (for Flexbox & Grid):**
\`\`\`html
<div class="flex gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<div class="grid grid-cols-3 gap-6">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
\`\`\`

**Space Between (for flex layouts):**
\`\`\`html
<!-- For flex column (vertical) -->
<div class="flex flex-col space-y-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- For flex row (horizontal) -->
<div class="flex space-x-3">
  <span>Item 1</span>
  <span>Item 2</span>
</div>
\`\`\`

**Spacing Scale Reference:**
\`space-x-0\` = 0px → \`space-x-1\` = 4px → \`space-x-2\` = 8px → ... → \`space-x-4\` = 16px → \`space-x-8\` = 32px → \`space-x-16\` = 64px

**When to use gap vs space vs margin:**
• **gap**: Use with flex and grid — simplest approach
• **space-{x/y}**: Use on a parent flex container — affects all children
• **m-{side}**: Use on individual elements for one-off spacing`,
    keyRules: [
      "Prefer gap over space-* for new code — it's simpler and more predictable",
      "gap-{size} works with both flex and grid layouts",
      "space-y-* and space-x-* only work on flex containers",
      "space-* ignores the first child (no leading/trailing space)",
      "Combining gap with padding gives you precise control over layouts",
    ],
    task: `Create a page demonstrating gap and space-between utilities:
1. A flex row with gap-4 between items
2. A flex column with space-y-4
3. A grid layout with gap-6
4. Show the difference between gap and space-* 
5. Use responsive gaps (md:gap-8)`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Gap & Space</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-8">
  <div class="max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Gap & Space Between</h1>
    <!-- Add gap and space demos here -->
    
  </div>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Gap & Space</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 min-h-screen p-8">
  <div class="max-w-3xl mx-auto space-y-8">
    <h1 class="text-3xl font-bold text-gray-900">Gap & Space Between</h1>
    
    <!-- Flex with gap -->
    <div class="bg-white rounded-xl p-6 shadow-sm">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">Flex with gap-4</h2>
      <div class="flex gap-4">
        <div class="bg-blue-500 text-white p-4 rounded-lg flex-1 text-center">1</div>
        <div class="bg-blue-500 text-white p-4 rounded-lg flex-1 text-center">2</div>
        <div class="bg-blue-500 text-white p-4 rounded-lg flex-1 text-center">3</div>
      </div>
    </div>
    
    <!-- Column with space-y -->
    <div class="bg-white rounded-xl p-6 shadow-sm">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">Column with space-y-3</h2>
      <div class="flex flex-col space-y-3">
        <div class="bg-purple-500 text-white p-3 rounded-lg">Item 1</div>
        <div class="bg-purple-500 text-white p-3 rounded-lg">Item 2</div>
        <div class="bg-purple-500 text-white p-3 rounded-lg">Item 3</div>
      </div>
    </div>
    
    <!-- Grid with gap -->
    <div class="bg-white rounded-xl p-6 shadow-sm">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">Grid with gap-6</h2>
      <div class="grid grid-cols-3 gap-6">
        <div class="bg-green-500 text-white p-6 rounded-lg text-center font-bold">1</div>
        <div class="bg-green-500 text-white p-6 rounded-lg text-center font-bold">2</div>
        <div class="bg-green-500 text-white p-6 rounded-lg text-center font-bold">3</div>
        <div class="bg-green-500 text-white p-6 rounded-lg text-center font-bold">4</div>
        <div class="bg-green-500 text-white p-6 rounded-lg text-center font-bold">5</div>
        <div class="bg-green-500 text-white p-6 rounded-lg text-center font-bold">6</div>
      </div>
    </div>
  </div>
</body>
</html>`,
    hint: "gap-{size} for flex/grid children. space-y-{size} for vertical flex, space-x-{size} for horizontal. Grid: grid grid-cols-{n} gap-{size}.",
    tests: [
      { name: "gap class used", validate: testRegex(/gap-\d+/) },
      { name: "space-y or space-x used", validate: testAny(testRegex(/space-[xy]-\d+/), testRegex(/space-[xy]-\d+/)) },
      { name: "grid with gap used", validate: testAll(testContains("grid"), testRegex(/gap-\d+/)) },
      { name: "flex with gap used", validate: testAll(testContains("flex"), testRegex(/gap-\d+/)) },
    ],
  },
];

// ─── CHAPTER 4: TYPOGRAPHY ───

const CH4_LESSONS = [
  {
    id: "tw-font-text",
    chapter: 4,
    title: "Font & Text Utilities",
    level: "Beginner",
    tags: ["Font", "Text", "Typography", "Alignment"],
    conceptExplanation: `Tailwind provides comprehensive typography utilities.

**Font Family:**
\`\`\`html
<p class="font-sans">Sans-serif (default)</p>
<p class="font-serif">Serif</p>
<p class="font-mono">Monospace</p>
\`\`\`

**Text Alignment:**
\`\`\`html
<p class="text-left">Left aligned</p>
<p class="text-center">Center aligned</p>
<p class="text-right">Right aligned</p>
<p class="text-justify">Justified</p>
\`\`\`

**Text Decoration & Transform:**
\`\`\`html
<p class="underline">Underlined text</p>
<p class="line-through">Strikethrough</p>
<p class="uppercase">UPPERCASE</p>
<p class="lowercase">lowercase</p>
<p class="capitalize">Capitalized</p>
\`\`\`

**Letter Spacing (Tracking):**
\`\`\`html
<p class="tracking-tight">Tighter spacing</p>
<p class="tracking-normal">Normal</p>
<p class="tracking-wide">Wide spacing</p>
<p class="tracking-widest">Very wide</p>
\`\`\`

**Line Height (Leading):**
\`\`\`html
<p class="leading-none">1 (tight)</p>
<p class="leading-tight">1.25</p>
<p class="leading-normal">1.5 (default)</p>
<p class="leading-relaxed">1.625</p>
<p class="leading-loose">2</p>
\`\`\``,
    keyRules: [
      "font-sans is the default — override in config for custom fonts",
      "text-{align} for text alignment (left, center, right, justify)",
      "tracking-* for letter-spacing, leading-* for line-height",
      "Use underline, line-through, uppercase, capitalize for text styling",
      "Combine text classes freely: text-center text-lg font-bold underline",
    ],
    task: `Create a typography showcase page:
1. Headings in different sizes (text-4xl, text-2xl, text-xl)
2. A paragraph with leading-relaxed for readability
3. Text utilities: underline, uppercase, tracking-wide
4. Different font families (font-sans, font-serif, font-mono)
5. Text alignment examples`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Typography</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 p-8">
  <div class="max-w-2xl mx-auto">
    <h1 class="text-4xl font-bold">Typography Showcase</h1>
    <!-- Add more typography examples -->
    
  </div>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Typography</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 min-h-screen p-8">
  <div class="max-w-2xl mx-auto space-y-8">
    <div class="bg-white rounded-2xl shadow-sm p-8">
      <h1 class="text-4xl font-extrabold text-gray-900 mb-2">Typography Showcase</h1>
      <p class="text-gray-500 text-sm uppercase tracking-widest mb-6">Master Tailwind Typography</p>
      
      <div class="space-y-6">
        <div>
          <h2 class="text-2xl font-bold text-gray-800 mb-3">Font Families</h2>
          <p class="font-sans text-gray-700 mb-1">font-sans: The quick brown fox</p>
          <p class="font-serif text-gray-700 mb-1">font-serif: The quick brown fox</p>
          <p class="font-mono text-gray-700">font-mono: The quick brown fox</p>
        </div>
        
        <div>
          <h2 class="text-xl font-semibold text-gray-800 mb-3">Text Decoration</h2>
          <p class="underline mb-1">Underlined text</p>
          <p class="line-through mb-1">Strikethrough text</p>
          <p class="uppercase tracking-wider mb-1">Uppercase with tracking</p>
          <p class="capitalize">capitalized text</p>
        </div>
        
        <div>
          <h2 class="text-xl font-semibold text-gray-800 mb-3">Line Height</h2>
          <p class="leading-tight text-gray-700 mb-2">Leading tight (1.25) — Great for headings and short text.</p>
          <p class="leading-relaxed text-gray-700 mb-2">Leading relaxed (1.625) — Perfect for body text and paragraphs that need to be easily readable across multiple lines.</p>
        </div>
        
        <div>
          <h2 class="text-xl font-semibold text-gray-800 mb-3">Alignment</h2>
          <p class="text-left text-gray-600">Left aligned</p>
          <p class="text-center text-gray-600">Center aligned</p>
          <p class="text-right text-gray-600">Right aligned</p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`,
    hint: "Font: font-sans/serif/mono. Size: text-{size}. Weight: font-{weight}. Decoration: underline, line-through. Transform: uppercase, capitalize. Alignment: text-left/center/right.",
    tests: [
      { name: "font-sans/serif/mono used", validate: testRegex(/font-(sans|serif|mono)/) },
      { name: "text alignment used", validate: testRegex(/text-(left|center|right)/) },
      { name: "text decoration used", validate: testAny(testContains("underline"), testContains("line-through"), testContains("uppercase")) },
      { name: "leading class used", validate: testRegex(/leading-\w+/) },
      { name: "tracking class used", validate: testRegex(/tracking-\w+/) },
    ],
  },
];

// ─── CHAPTER 5: COLORS ───

const CH5_LESSONS = [
  {
    id: "tw-colors-palette",
    chapter: 5,
    title: "Colors & Gradients",
    level: "Beginner",
    tags: ["Colors", "Gradients", "Palette", "Opacity"],
    conceptExplanation: `Tailwind has a comprehensive color system with 22 color families, each with 10-11 shades.

**Color Naming Convention:**
\`\`\`
{property}-{color}-{shade}
\`\`\`
Example: \`bg-blue-500\`, \`text-red-600\`, \`border-gray-300\`

**Color Families:**
\`slate, gray, zinc, neutral, stone\` — Neutral/grays
\`red, orange, amber, yellow\` — Warm colors
\`lime, green, emerald, teal\` — Green/Cool
\`cyan, sky, blue, indigo\` — Blues
\`violet, purple, fuchsia, pink, rose\` — Purples/Pinks

**Shade Scale (50-950):**
\`\`\`html
<div class="bg-blue-50 text-blue-800">Lightest blue</div>
<div class="bg-blue-100 text-blue-700">Very light</div>
<div class="bg-blue-200 text-blue-800">Light</div>
<div class="bg-blue-500 text-white">Primary (500)</div>
<div class="bg-blue-700 text-white">Dark</div>
<div class="bg-blue-900 text-blue-100">Very dark</div>
<div class="bg-blue-950 text-blue-200">Darkest</div>
\`\`\`

**Opacity Modifiers:**
\`\`\`html
<div class="bg-blue-500/50">50% opacity blue</div>
<div class="bg-blue-500/25">25% opacity</div>
<div class="text-gray-900/75">75% opacity text</div>
\`\`\`

**Gradients:**
\`\`\`html
<!-- Direction: t (top), tr (top-right), r (right), br (bottom-right), b, bl, l, tl -->
<div class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
  Multi-color gradient
</div>
<div class="bg-gradient-to-br from-green-400 to-blue-600">
  Corner gradient
</div>
\`\`\``,
    keyRules: [
      "Use 500 as your primary default, 600/700 for hover states, 50-200 for backgrounds",
      "Opacity: bg-blue-500/50 adds 50% opacity — any color can use /{opacity}",
      "Gradients: bg-gradient-to-{dir} from-{color} to-{color}",
      "via-{color} creates multi-stop gradients",
      "Text contrast: light text needs dark bg (text-white bg-gray-900)",
    ],
    task: `Create a color showcase page:
1. Show color swatches for 5 different color families (5 shades each)
2. A gradient hero section using bg-gradient-to-r
3. Use opacity modifiers on colors
4. A card that uses proper text contrast with bg and text colors
5. A multi-stop gradient using via-*`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Colors & Gradients</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 p-8">
  <div class="max-w-3xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Colors & Gradients</h1>
    <!-- Add color swatches and gradient examples -->
    
  </div>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Colors & Gradients</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 min-h-screen p-8">
  <div class="max-w-3xl mx-auto space-y-8">
    <h1 class="text-4xl font-bold text-gray-900">Colors & Gradients</h1>
    
    <!-- Gradient Hero -->
    <section class="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white rounded-2xl p-12 text-center">
      <h2 class="text-3xl font-bold mb-2">Multi-Stop Gradient</h2>
      <p class="text-indigo-200">from-indigo-600 via-purple-600 to-pink-500</p>
    </section>
    
    <!-- Color Swatches -->
    <div class="bg-white rounded-2xl p-8 shadow-sm">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Color Families</h2>
      <div class="space-y-4">
        <div>
          <h3 class="text-sm font-semibold text-gray-600 uppercase mb-2">Blue</h3>
          <div class="flex gap-1">
            <div class="flex-1 h-10 rounded" style="background:#bfdbfe"></div>
            <div class="flex-1 h-10 rounded" style="background:#60a5fa"></div>
            <div class="flex-1 h-10 rounded" style="background:#3b82f6"></div>
            <div class="flex-1 h-10 rounded" style="background:#2563eb"></div>
            <div class="flex-1 h-10 rounded" style="background:#1d4ed8"></div>
          </div>
        </div>
        <div>
          <h3 class="text-sm font-semibold text-gray-600 uppercase mb-2">Green</h3>
          <div class="flex gap-1">
            <div class="flex-1 h-10 rounded" style="background:#bbf7d0"></div>
            <div class="flex-1 h-10 rounded" style="background:#4ade80"></div>
            <div class="flex-1 h-10 rounded" style="background:#22c55e"></div>
            <div class="flex-1 h-10 rounded" style="background:#16a34a"></div>
            <div class="flex-1 h-10 rounded" style="background:#15803d"></div>
          </div>
        </div>
        <div>
          <h3 class="text-sm font-semibold text-gray-600 uppercase mb-2">Red</h3>
          <div class="flex gap-1">
            <div class="flex-1 h-10 rounded" style="background:#fecaca"></div>
            <div class="flex-1 h-10 rounded" style="background:#f87171"></div>
            <div class="flex-1 h-10 rounded" style="background:#ef4444"></div>
            <div class="flex-1 h-10 rounded" style="background:#dc2626"></div>
            <div class="flex-1 h-10 rounded" style="background:#b91c1c"></div>
          </div>
        </div>
        <div>
          <h3 class="text-sm font-semibold text-gray-600 uppercase mb-2">Purple</h3>
          <div class="flex gap-1">
            <div class="flex-1 h-10 rounded" style="background:#e9d5ff"></div>
            <div class="flex-1 h-10 rounded" style="background:#a78bfa"></div>
            <div class="flex-1 h-10 rounded" style="background:#8b5cf6"></div>
            <div class="flex-1 h-10 rounded" style="background:#7c3aed"></div>
            <div class="flex-1 h-10 rounded" style="background:#6d28d9"></div>
          </div>
        </div>
        <div>
          <h3 class="text-sm font-semibold text-gray-600 uppercase mb-2">Amber</h3>
          <div class="flex gap-1">
            <div class="flex-1 h-10 rounded" style="background:#fde68a"></div>
            <div class="flex-1 h-10 rounded" style="background:#fbbf24"></div>
            <div class="flex-1 h-10 rounded" style="background:#f59e0b"></div>
            <div class="flex-1 h-10 rounded" style="background:#d97706"></div>
            <div class="flex-1 h-10 rounded" style="background:#b45309"></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Opacity -->
    <div class="bg-white rounded-2xl p-8 shadow-sm">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Opacity Modifiers</h2>
      <div class="flex gap-2">
        <div class="bg-blue-500 w-16 h-16 rounded-lg"></div>
        <div class="bg-blue-500/75 w-16 h-16 rounded-lg"></div>
        <div class="bg-blue-500/50 w-16 h-16 rounded-lg"></div>
        <div class="bg-blue-500/25 w-16 h-16 rounded-lg"></div>
      </div>
    </div>
    
    <!-- Contrast Card -->
    <div class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
      <h2 class="text-2xl font-bold mb-2">Dark Background</h2>
      <p class="text-gray-300">White text on dark backgrounds for contrast.</p>
      <div class="mt-4 flex gap-3">
        <span class="bg-blue-500 text-white px-4 py-1 rounded-full text-sm">Tag 1</span>
        <span class="bg-blue-500/50 text-white px-4 py-1 rounded-full text-sm">Tag 2</span>
      </div>
    </div>
  </div>
</body>
</html>`,
    hint: "Colors: bg-{color}-{shade}, text-{color}-{shade}. Opacity: bg-blue-500/50. Gradients: bg-gradient-to-r from-{color} to-{color}. Multi-stop: from-{color} via-{color} to-{color}.",
    tests: [
      { name: "Gradient background used", validate: testContains("bg-gradient") },
      { name: "color with shade used", validate: testAny(testRegex(/bg-\w+-\d+/), testRegex(/text-\w+-\d+/)) },
      { name: "opacity modifier used", validate: testRegex(/\/\d{2,3}/) },
      { name: "rounded class used", validate: testRegex(/rounded-\w+/) },
    ],
  },
];

// ─── CHAPTER 6: BACKGROUNDS ───

const CH6_LESSONS = [
  {
    id: "tw-backgrounds",
    chapter: 6,
    title: "Backgrounds & Gradients",
    level: "Beginner",
    tags: ["Background", "Gradients", "Images"],
    conceptExplanation: `Tailwind provides utilities for background colors, gradients, images, and more.

**Background Colors:**
\`\`\`html
<div class="bg-blue-500">Solid color</div>
<div class="bg-gradient-to-r from-cyan-500 to-blue-500">Gradient</div>
\`\`\`

**Background Images:**
\`\`\`html
<div class="bg-cover bg-center" style="background-image: url('...')">
</div>
\`\`\`

**Background Size:**
\`\`\`html
<div class="bg-auto">Auto</div>
<div class="bg-cover">Cover entire area</div>
<div class="bg-contain">Contain within area</div>
\`\`\`

**Background Position:**
\`\`\`html
<div class="bg-center">Center</div>
<div class="bg-top">Top</div>
<div class="bg-bottom">Bottom</div>
<div class="bg-left">Left</div>
<div class="bg-right">Right</div>
\`\`\`

**Background Repeat:**
\`\`\`html
<div class="bg-repeat">Repeat (default)</div>
<div class="bg-no-repeat">No repeat</div>
<div class="bg-repeat-x">Repeat horizontally</div>
<div class="bg-repeat-y">Repeat vertically</div>
\`\`\``,
    keyRules: [
      "bg-cover + bg-center is the most common combination for hero images",
      "Combine multiple background utilities: bg-cover bg-center bg-no-repeat",
      "Use gradients for modern, performant backgrounds (no images needed)",
      "Gradient directions: to-r, to-b, to-tl, to-br, etc.",
      "Stack gradient and image: bg-gradient-to-b from-black/50, background-image: url(...)",
    ],
    task: `Create a page demonstrating background utilities:
1. A hero section with a background image (bg-cover bg-center) and gradient overlay
2. A gradient card (bg-gradient-to-br from-purple-500 to-pink-500)
3. A section with a patterned background using bg-repeat
4. Combine bg-gradient with a dark overlay for text readability`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Backgrounds</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <!-- Hero with bg image + gradient overlay -->
  
  <!-- Gradient card -->
  
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Backgrounds</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <!-- Hero with gradient overlay on image -->
  <section class="relative bg-gradient-to-r from-gray-900/80 to-gray-900/40 text-white py-24 px-4 text-center"
    style="background-image: url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200'); background-size: cover; background-position: center; background-blend-mode: overlay;">
    <div class="relative z-10">
      <h1 class="text-5xl font-bold mb-4">Background Mastery</h1>
      <p class="text-xl text-gray-300 max-w-xl mx-auto">Image with gradient overlay for readability.</p>
    </div>
  </section>
  
  <div class="max-w-4xl mx-auto px-4 py-12 space-y-6">
    <!-- Gradient card -->
    <div class="bg-gradient-to-br from-purple-600 via-pink-600 to-rose-500 text-white rounded-2xl p-10 shadow-xl">
      <h2 class="text-3xl font-bold mb-2">Gradient Card</h2>
      <p class="text-purple-100">from-purple-600 via-pink-600 to-rose-500</p>
    </div>
    
    <!-- Two gradient cards side by side -->
    <div class="grid md:grid-cols-2 gap-6">
      <div class="bg-gradient-to-br from-emerald-400 to-cyan-500 text-white rounded-xl p-8">
        <h3 class="text-xl font-bold">Emerald to Cyan</h3>
        <p class="text-emerald-100 text-sm">Fresh & vibrant</p>
      </div>
      <div class="bg-gradient-to-br from-amber-400 to-orange-600 text-white rounded-xl p-8">
        <h3 class="text-xl font-bold">Amber to Orange</h3>
        <p class="text-amber-100 text-sm">Warm & energetic</p>
      </div>
    </div>
  </div>
</body>
</html>`,
    hint: "bg-cover bg-center bg-no-repeat for images. bg-gradient-to-r for gradients. Combine: bg-gradient + style=backgroundImage. bg-blend-mode: overlay blends image with gradient.",
    tests: [
      { name: "bg-cover or bg-contain used", validate: testAny(testContains("bg-cover"), testContains("bg-contain")) },
      { name: "bg-center used", validate: testContains("bg-center") },
      { name: "gradient background used", validate: testContains("bg-gradient") },
      { name: "background-image used", validate: testContains("background-image") || testContains("backgroundImage") },
    ],
  },
];

// ─── CHAPTER 7: BORDERS ───

const CH7_LESSONS = [
  {
    id: "tw-borders-radius",
    chapter: 7,
    title: "Borders & Radius",
    level: "Beginner",
    tags: ["Border", "Radius", "Ring", "Shadow", "Outline"],
    conceptExplanation: `Tailwind provides extensive border, radius, ring, and shadow utilities.

**Border Width:**
\`\`\`html
<div class="border">1px border (default)</div>
<div class="border-2">2px border</div>
<div class="border-4">4px border</div>
<div class="border-0">No border</div>
<div class="border-t-2">Border on specific side</div>
<div class="border-b-4">Bottom border</div>
\`\`\`

**Border Color:**
\`\`\`html
<div class="border border-gray-200">Gray border</div>
<div class="border-2 border-blue-500">Blue border</div>
<div class="border-t-2 border-red-500">Red top border</div>
\`\`\`

**Border Radius:**
\`\`\`html
<div class="rounded-none">No rounding</div>
<div class="rounded-sm">Small radius</div>
<div class="rounded">Default (4px)</div>
<div class="rounded-md">Medium</div>
<div class="rounded-lg">Large</div>
<div class="rounded-xl">Extra large</div>
<div class="rounded-2xl">2x</div>
<div class="rounded-3xl">3x</div>
<div class="rounded-full">Pill shape!</div>
\`\`\`

**Rings (outline with shadows):**
\`\`\`html
<button class="ring-2 ring-blue-500">Ring outline</button>
<button class="ring-2 ring-blue-500 ring-offset-2">Ring with offset</button>
\`\`\`

**Box Shadows:**
\`\`\`html
<div class="shadow-sm">Small shadow</div>
<div class="shadow">Default shadow</div>
<div class="shadow-md">Medium shadow</div>
<div class="shadow-lg">Large shadow</div>
<div class="shadow-xl">Extra large</div>
<div class="shadow-2xl">2x large</div>
<div class="shadow-inner">Inner shadow</div>
\`\`\``,
    keyRules: [
      "border alone adds a 1px border with default color (gray-200)",
      "rounded-lg is the most versatile — good for cards and buttons",
      "rounded-full creates a pill shape — use on buttons and badges",
      "ring-* creates focus outlines without layout shift",
      "shadow-* adds box-shadows — shadow-md and shadow-lg are most common",
    ],
    task: `Create a page demonstrating borders, radius, rings, and shadows:
1. Cards with different border widths and colors
2. Buttons with different border-radius styles (rounded, rounded-full, rounded-lg)
3. Interactive cards using ring-2 on hover/focus
4. Cards with different shadow levels
5. A profile avatar using rounded-full`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Borders & Shadows</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-8">
  <div class="max-w-3xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Borders & Shadows</h1>
    <!-- Add border, radius, ring, shadow demos -->
    
  </div>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Borders & Shadows</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 min-h-screen p-8">
  <div class="max-w-3xl mx-auto space-y-8">
    <h1 class="text-3xl font-bold text-gray-900">Borders & Shadows</h1>
    
    <!-- Radius Showcase -->
    <div class="bg-white rounded-2xl p-6 shadow-sm">
      <h2 class="text-lg font-semibold mb-4">Border Radius</h2>
      <div class="flex flex-wrap gap-3">
        <div class="bg-blue-500 text-white px-4 py-2 rounded text-sm">rounded</div>
        <div class="bg-blue-500 text-white px-4 py-2 rounded-md text-sm">rounded-md</div>
        <div class="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm">rounded-lg</div>
        <div class="bg-blue-500 text-white px-4 py-2 rounded-xl text-sm">rounded-xl</div>
        <div class="bg-blue-500 text-white px-4 py-2 rounded-2xl text-sm">rounded-2xl</div>
        <div class="bg-blue-500 text-white px-5 py-2 rounded-full text-sm">rounded-full</div>
      </div>
    </div>
    
    <!-- Borders -->
    <div class="bg-white rounded-2xl p-6 shadow-sm">
      <h2 class="text-lg font-semibold mb-4">Borders</h2>
      <div class="space-y-3">
        <div class="border border-gray-200 p-4 rounded-lg">border border-gray-200</div>
        <div class="border-2 border-blue-500 p-4 rounded-lg">border-2 border-blue-500</div>
        <div class="border-l-4 border-l-green-500 p-4 rounded-lg">Left accent border</div>
        <div class="border-b-2 border-b-purple-500 p-4 rounded-lg">Bottom accent border</div>
      </div>
    </div>
    
    <!-- Rings -->
    <div class="bg-white rounded-2xl p-6 shadow-sm">
      <h2 class="text-lg font-semibold mb-4">Rings</h2>
      <div class="flex gap-4">
        <button class="ring-2 ring-blue-500 text-blue-600 px-5 py-2 rounded-lg font-medium">Ring</button>
        <button class="ring-2 ring-purple-500 ring-offset-2 text-purple-600 px-5 py-2 rounded-lg font-medium">Ring + Offset</button>
      </div>
    </div>
    
    <!-- Shadows -->
    <div class="bg-white rounded-2xl p-6 shadow-sm">
      <h2 class="text-lg font-semibold mb-4">Shadow Levels</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-white p-4 rounded-lg shadow-sm text-center text-sm">shadow-sm</div>
        <div class="bg-white p-4 rounded-lg shadow-md text-center text-sm">shadow-md</div>
        <div class="bg-white p-4 rounded-lg shadow-lg text-center text-sm">shadow-lg</div>
        <div class="bg-white p-4 rounded-lg shadow-xl text-center text-sm">shadow-xl</div>
      </div>
    </div>
    
    <!-- Avatar -->
    <div class="bg-white rounded-2xl p-6 shadow-sm flex items-center gap-4">
      <div class="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">JD</div>
      <div>
        <h3 class="font-bold text-gray-900">Jane Doe</h3>
        <p class="text-gray-500 text-sm">rounded-full avatar</p>
      </div>
    </div>
  </div>
</body>
</html>`,
    hint: "Border: border-{width} border-{color}. Radius: rounded-{size} (sm, md, lg, xl, 2xl, full). Ring: ring-{width} ring-{color}. Shadow: shadow-{size} (sm, md, lg, xl, 2xl).",
    tests: [
      { name: "border class used", validate: testContains("border") },
      { name: "rounded class used", validate: testRegex(/rounded\b|rounded-\w+/) },
      { name: "shadow class used", validate: testRegex(/shadow-\w+/) },
      { name: "ring class used", validate: testRegex(/ring-\d/) },
    ],
  },
];

// ─── CHAPTER 8: SIZING ───

const CH8_LESSONS = [
  {
    id: "tw-width-height",
    chapter: 8,
    title: "Width & Height",
    level: "Beginner",
    tags: ["Width", "Height", "Sizing", "Aspect Ratio", "Container"],
    conceptExplanation: `Tailwind makes sizing elements easy with intuitive classes.

**Width:**
\`\`\`html
<div class="w-1/2">50% width</div>
<div class="w-1/3">33.333%</div>
<div class="w-2/3">66.666%</div>
<div class="w-full">100%</div>
<div class="w-screen">100vw</div>
<div class="w-auto">Auto width</div>
<div class="w-64">Fixed: 16rem (256px)</div>
<div class="max-w-lg">Max width: 32rem</div>
<div class="min-w-0">Min width: 0</div>
\`\`\`

**Height:**
\`\`\`html
<div class="h-16">Fixed: 4rem (64px)</div>
<div class="h-1/2">50% height</div>
<div class="h-full">100% of parent</div>
<div class="h-screen">100vh (full viewport)</div>
<div class="min-h-screen">Minimum 100vh</div>
\`\`\`

**Aspect Ratio:**
\`\`\`html
<div class="aspect-video">16:9 ratio</div>
<div class="aspect-square">1:1 ratio</div>
<div class="aspect-4/3">Custom 4:3</div>
<div class="aspect-3/2">3:2 ratio</div>
\`\`\`

**Container Class:**
\`\`\`html
<div class="container mx-auto">Centers with max-width at each breakpoint</div>
\`\`\`

**Fixed Sizing Reference:**
\`w-4\` = 16px, \`w-8\` = 32px, \`w-16\` = 64px, \`w-32\` = 128px, \`w-64\` = 256px, \`w-96\` = 384px`,
    keyRules: [
      "Use w-1/2, w-1/3, w-2/3 for percentage-based widths",
      "w-full = 100%, h-screen = 100vh, min-h-screen for full-page layouts",
      "max-w-* is essential for readable content (max-w-prose, max-w-4xl)",
      "aspect-video for 16:9 videos/images, aspect-square for square avatars",
      "container + mx-auto for centered responsive layouts",
    ],
    task: `Create a page demonstrating sizing utilities:
1. A full-width hero with min-h-screen
2. A container with max-w-4xl mx-auto
3. Cards using fractional widths (w-1/2, w-1/3) in a flex layout
4. An aspect-video container for a demo video/embed
5. A fixed-width sidebar layout`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sizing</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <!-- Full-screen hero -->
  <!-- Container with cards -->
  
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sizing</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <!-- Full-screen hero -->
  <section class="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 text-white flex items-center justify-center">
    <div class="text-center px-4">
      <h1 class="text-5xl font-bold mb-4">Sizing Utilities</h1>
      <p class="text-xl text-indigo-200">This hero uses min-h-screen</p>
    </div>
  </section>
  
  <!-- Content container -->
  <div class="container mx-auto px-4 py-12">
    <h2 class="text-3xl font-bold text-gray-900 mb-8">Fractional Widths</h2>
    
    <!-- Fractional width cards -->
    <div class="flex gap-4 mb-12">
      <div class="w-1/3 bg-blue-100 text-blue-800 p-6 rounded-xl font-semibold">w-1/3</div>
      <div class="w-1/3 bg-blue-100 text-blue-800 p-6 rounded-xl font-semibold">w-1/3</div>
      <div class="w-1/3 bg-blue-100 text-blue-800 p-6 rounded-xl font-semibold">w-1/3</div>
    </div>
    
    <div class="flex gap-4 mb-12">
      <div class="w-1/4 bg-green-100 text-green-800 p-4 rounded-lg text-sm font-semibold">w-1/4</div>
      <div class="w-3/4 bg-green-100 text-green-800 p-4 rounded-lg text-sm font-semibold">w-3/4</div>
    </div>
    
    <!-- aspect-video -->
    <h2 class="text-2xl font-bold text-gray-900 mb-4">Aspect Ratio</h2>
    <div class="aspect-video bg-gray-200 rounded-xl mb-12 flex items-center justify-center text-gray-500">
      <span class="text-lg">aspect-video (16:9)</span>
    </div>
    
    <!-- Fixed width demo -->
    <div class="flex gap-4">
      <div class="w-48 bg-purple-100 text-purple-800 p-4 rounded-lg text-center">w-48 (192px)</div>
      <div class="w-64 bg-purple-100 text-purple-800 p-4 rounded-lg text-center">w-64 (256px)</div>
      <div class="flex-1 bg-purple-100 text-purple-800 p-4 rounded-lg text-center">flex-1</div>
    </div>
  </div>
</body>
</html>`,
    hint: "w-1/2, w-1/3 for fractions. w-full for 100%. min-h-screen for full viewport. max-w-{size} for max-width. aspect-video/square for ratios. container mx-auto for centered.",
    tests: [
      { name: "Fractional width used", validate: testRegex(/w-\d\/(2|3|4)/) },
      { name: "w-full used", validate: testContains("w-full") },
      { name: "min-h-screen used", validate: testContains("min-h-screen") },
      { name: "max-w class used", validate: testRegex(/max-w-\w+/) },
      { name: "aspect class used", validate: testRegex(/aspect-\w+/) },
    ],
  },
];

// ─── CHAPTER 9: FLEXBOX ───

const CH9_LESSONS = [
  {
    id: "tw-flexbox",
    chapter: 9,
    title: "Flexbox with Tailwind",
    level: "Intermediate",
    tags: ["Flexbox", "Layout", "Alignment"],
    conceptExplanation: `Tailwind makes Flexbox incredibly easy with intuitive utility classes.

**Flex Container:**
\`\`\`html
<div class="flex">Default: row</div>
<div class="inline-flex">Inline flex</div>
<div class="flex flex-col">Column direction</div>
<div class="flex flex-row-reverse">Reversed row</div>
\`\`\`

**Flex Direction:**
\`\`\`html
<div class="flex flex-row">Left to right (default)</div>
<div class="flex flex-col">Top to bottom</div>
\`\`\`

**Justify Content (main axis):**
\`\`\`html
<div class="flex justify-start">Left (default)</div>
<div class="flex justify-center">Center</div>
<div class="flex justify-end">Right</div>
<div class="flex justify-between">Space between</div>
<div class="flex justify-around">Space around</div>
<div class="flex justify-evenly">Space evenly</div>
\`\`\`

**Align Items (cross axis):**
\`\`\`html
<div class="flex items-start">Top</div>
<div class="flex items-center">Center (vertical)</div>
<div class="flex items-end">Bottom</div>
<div class="flex items-stretch">Stretch (default)</div>
<div class="flex items-baseline">Baseline</div>
\`\`\`

**Flex Item Properties:**
\`\`\`html
<div class="flex-1">Grow equally (1 1 0%)</div>
<div class="flex-auto">Grow (1 1 auto)</div>
<div class="flex-initial">Don't grow (0 1 auto)</div>
<div class="flex-none">Don't grow/shrink (0 0 auto)</div>
\`\`\`

**Flex Wrap:**
\`\`\`html
<div class="flex flex-wrap">Allow wrapping</div>
<div class="flex flex-nowrap">No wrap (default)</div>
<div class="flex flex-wrap-reverse">Wrap reversed</div>
\`\`\`

**Perfect Centering:**
\`\`\`html
<div class="flex items-center justify-center h-64">
  <span>Perfectly centered!</span>
</div>
\`\`\``,
    keyRules: [
      "flex + items-center + justify-center = perfect centering",
      "flex-1 on children makes them grow equally",
      "gap-* for spacing between flex items (avoid margin hacks)",
      "flex-col for vertical layouts, flex-wrap for responsive rows",
      "self-start/center/end on individual items overrides align-items",
    ],
    task: `Create a page demonstrating Flexbox with Tailwind:
1. A horizontally centered navbar with flex and justify-between
2. A card grid using flex + flex-wrap + gap-*
3. Perfectly centered content (flex + items-center + justify-center)
4. A flex column layout
5. Use flex-1 on items for equal distribution`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Flexbox</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">
  <!-- Navbar -->
  <!-- Card Grid -->
  <!-- Centered Content -->
  
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Flexbox</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">
  <!-- Navbar -->
  <nav class="bg-white shadow-sm">
    <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
      <div class="text-xl font-bold text-gray-900">Flexbox Demo</div>
      <div class="flex items-center gap-6">
        <a href="#" class="text-gray-600 hover:text-blue-600">Home</a>
        <a href="#" class="text-gray-600 hover:text-blue-600">About</a>
        <a href="#" class="text-gray-600 hover:text-blue-600">Contact</a>
      </div>
    </div>
  </nav>
  
  <div class="max-w-6xl mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Flexbox with Tailwind</h1>
    
    <!-- Card Grid -->
    <div class="flex flex-wrap gap-6 mb-12">
      <div class="flex-1 min-w-[250px] bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h3 class="font-bold text-lg text-gray-900 mb-2">Card 1</h3>
        <p class="text-gray-600">flex-1 makes this grow equally.</p>
      </div>
      <div class="flex-1 min-w-[250px] bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h3 class="font-bold text-lg text-gray-900 mb-2">Card 2</h3>
        <p class="text-gray-600">All flex-1 items share space equally.</p>
      </div>
      <div class="flex-1 min-w-[250px] bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h3 class="font-bold text-lg text-gray-900 mb-2">Card 3</h3>
        <p class="text-gray-600">Responsive with min-w and flex-wrap.</p>
      </div>
    </div>
    
    <!-- Perfect Centering -->
    <div class="flex items-center justify-center h-64 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-12">
      <span class="text-white text-2xl font-bold">Perfectly Centered!</span>
    </div>
    
    <!-- Flex Column -->
    <div class="flex flex-col gap-4 max-w-md mx-auto">
      <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">First item</div>
      <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">Second item</div>
      <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">Third item</div>
    </div>
  </div>
</body>
</html>`,
    hint: "flex + items-center + justify-center = perfect centering. flex-1 on children = equal growth. flex-wrap gap-* for responsive grids. flex-col for vertical. self-* overrides per item.",
    tests: [
      { name: "flex used", validate: testContains("flex") },
      { name: "justify-content used", validate: testRegex(/justify-(center|between|end|start|around|evenly)/) },
      { name: "items-center used", validate: testContains("items-center") },
      { name: "flex-1 used", validate: testContains("flex-1") },
      { name: "flex-wrap used", validate: testContains("flex-wrap") },
      { name: "gap used", validate: testRegex(/gap-\d+/) },
    ],
  },
  {
    id: "tw-flex-layouts",
    chapter: 9,
    title: "Flexbox Layouts",
    level: "Intermediate",
    tags: ["Flexbox", "Layouts", "Navigation", "Cards", "Sidebar"],
    conceptExplanation: `Let's build real layouts using Flexbox!

**Holy Grail Layout with Flex:**
\`\`\`html
<div class="flex flex-col min-h-screen">
  <header class="bg-white shadow">Header</header>
  <div class="flex flex-1">
    <aside class="w-64 bg-gray-50">Sidebar</aside>
    <main class="flex-1 p-6">Main Content</main>
  </div>
  <footer class="bg-gray-900 text-white">Footer</footer>
</div>
\`\`\`

**Responsive Card Grid:**
\`\`\`html
<div class="flex flex-wrap gap-6">
  <div class="flex-[1_1_300px]">Card</div>
  <div class="flex-[1_1_300px]">Card</div>
  <div class="flex-[1_1_300px]">Card</div>
</div>
\`\`\`

**Sticky Footer with Flex:**
\`\`\`html
<body class="flex flex-col min-h-screen">
  <header>...</header>
  <main class="flex-1">Content</main>
  <footer>Footer sticks to bottom</footer>
</body>
\`\`\`

**Ordering Items:**
\`\`\`html
<div class="flex">
  <div class="order-3">Last in order</div>
  <div class="order-1">First</div>
  <div class="order-2">Second</div>
</div>
\`\`\`

**Align Self (per-item alignment):**
\`\`\`html
<div class="flex items-start h-32">
  <div class="self-start">Top</div>
  <div class="self-center">Middle</div>
  <div class="self-end">Bottom</div>
  <div class="self-stretch h-auto">Stretch</div>
</div>
\`\`\``,
    keyRules: [
      "flex-1 on main makes it fill remaining space — perfect for layouts",
      "flex-wrap + min-w-[250px] = responsive cards without media queries",
      "flex flex-col min-h-screen + flex-1 on main = sticky footer",
      "self-* overrides align-items for individual flex items",
      "order-* reorders items without changing HTML source order",
    ],
    task: `Build a full page layout using Flexbox:
1. A sticky footer layout (flex flex-col min-h-screen)
2. A sidebar + main content layout using flex
3. Cards that wrap responsively
4. Item with self-center/self-end alignment
5. Use gap for spacing throughout`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Flex Layouts</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="flex flex-col min-h-screen">
  <header class="bg-white shadow p-4">
    <h1 class="text-xl font-bold">Flex Layout Demo</h1>
  </header>
  
  <div class="flex flex-1">
    <!-- Sidebar -->
    <!-- Main Content -->
  </div>
  
  <footer class="bg-gray-900 text-white p-4 text-center">Footer</footer>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Flex Layouts</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="flex flex-col min-h-screen bg-gray-50">
  <header class="bg-white shadow-sm px-6 py-4">
    <div class="max-w-6xl mx-auto flex items-center justify-between">
      <h1 class="text-xl font-bold text-gray-900">Flex Layouts</h1>
      <span class="text-sm text-gray-500">Sticky Footer Demo</span>
    </div>
  </header>
  
  <div class="flex flex-1 max-w-6xl mx-auto w-full px-4 py-6 gap-6">
    <!-- Sidebar -->
    <aside class="w-64 bg-white rounded-xl shadow-sm p-4 flex flex-col gap-2">
      <div class="text-sm font-semibold text-gray-400 uppercase tracking-wider">Navigation</div>
      <a href="#" class="px-3 py-2 rounded-lg bg-blue-50 text-blue-600 font-medium">Dashboard</a>
      <a href="#" class="px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50">Analytics</a>
      <a href="#" class="px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50">Settings</a>
      <div class="mt-auto pt-4 border-t border-gray-100">
        <a href="#" class="px-3 py-2 rounded-lg text-red-600 hover:bg-red-50">Logout</a>
      </div>
    </aside>
    
    <!-- Main Content -->
    <main class="flex-1">
      <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Dashboard</h2>
        <p class="text-gray-600">The footer stays at the bottom because main has flex-1.</p>
      </div>
      
      <div class="flex flex-wrap gap-4">
        <div class="flex-[1_1_200px] bg-white rounded-xl shadow-sm p-5 border border-gray-50">
          <div class="text-sm text-gray-500">Total Users</div>
          <div class="text-2xl font-bold text-gray-900 mt-1">12,847</div>
        </div>
        <div class="flex-[1_1_200px] bg-white rounded-xl shadow-sm p-5 border border-gray-50">
          <div class="text-sm text-gray-500">Revenue</div>
          <div class="text-2xl font-bold text-gray-900 mt-1">$48,290</div>
        </div>
        <div class="flex-[1_1_200px] bg-white rounded-xl shadow-sm p-5 border border-gray-50">
          <div class="text-sm text-gray-500">Active</div>
          <div class="text-2xl font-bold text-gray-900 mt-1">4,291</div>
        </div>
        <div class="flex-[1_1_200px] bg-white rounded-xl shadow-sm p-5 border border-gray-50">
          <div class="text-sm text-gray-500">Growth</div>
          <div class="text-2xl font-bold text-gray-900 mt-1">+12.5%</div>
        </div>
      </div>
    </main>
  </div>
  
  <footer class="bg-gray-900 text-gray-400 py-6 text-center text-sm">
    &copy; 2024 Flex Layouts Demo. Sticky Footer with flex-1.
  </footer>
</body>
</html>`,
    hint: "flex flex-col min-h-screen on body. flex-1 on main content. flex-wrap gap-* for responsive cards. self-* for individual alignment. mt-auto pushes items to bottom in a column flex.",
    tests: [
      { name: "flex-col used on body", validate: testContains("flex-col") },
      { name: "min-h-screen used", validate: testContains("min-h-screen") },
      { name: "flex-1 used on main", validate: testContains("flex-1") },
      { name: "flex-wrap used", validate: testContains("flex-wrap") },
    ],
  },
];

// ─── CHAPTER 10: GRID ───

const CH10_LESSONS = [
  {
    id: "tw-grid-basics",
    chapter: 10,
    title: "CSS Grid with Tailwind",
    level: "Intermediate",
    tags: ["Grid", "Columns", "Rows", "Layout"],
    conceptExplanation: `Tailwind makes CSS Grid easy with grid-template-columns and gap utilities.

**Basic Grid:**
\`\`\`html
<div class="grid grid-cols-3 gap-4">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
\`\`\`

**Column Templates:**
\`\`\`html
<div class="grid grid-cols-1">Single column</div>
<div class="grid grid-cols-2">Two columns</div>
<div class="grid grid-cols-3">Three columns</div>
<div class="grid grid-cols-4">Four columns</div>
<div class="grid grid-cols-6">Six columns</div>
<div class="grid grid-cols-12">Twelve columns</div>
\`\`\`

**Responsive Grid (auto-fit):**
\`\`\`html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Responsive: 1 col on mobile, 2 on tablet, 3 on desktop -->
</div>
\`\`\`

**Grid Item Spanning:**
\`\`\`html
<div class="grid grid-cols-3 gap-4">
  <div class="col-span-2">Spans 2 columns</div>
  <div>Normal</div>
  <div>Normal</div>
  <div class="col-span-3">Spans all columns</div>
</div>
\`\`\`

**Grid Row Spanning:**
\`\`\`html
<div class="grid grid-cols-3 gap-4">
  <div class="row-span-2">Spans 2 rows</div>
  <div>Normal</div>
  <div>Normal</div>
  <div>Normal</div>
</div>
\`\`\``,
    keyRules: [
      "grid-cols-{n} for fixed columns, gap-{size} for spacing",
      "Use responsive: grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      "col-span-{n} to make items span multiple columns",
      "row-span-{n} for items spanning multiple rows",
      "grid grid-cols-1 md:grid-cols-2 = mobile-first responsive grid",
    ],
    task: `Create a page demonstrating CSS Grid with Tailwind:
1. A basic 3-column grid using grid-cols-3
2. A responsive grid with grid-cols-1 md:grid-cols-2 lg:grid-cols-3
3. An item that spans 2 columns (col-span-2)
4. An item that spans 2 rows (row-span-2)
5. A page layout with grid areas using col-span`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CSS Grid</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-8">
  <div class="max-w-5xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">CSS Grid with Tailwind</h1>
    <!-- Add grid examples -->
    
  </div>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CSS Grid</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-8">
  <div class="max-w-5xl mx-auto space-y-8">
    <h1 class="text-3xl font-bold text-gray-900">CSS Grid with Tailwind</h1>
    
    <!-- Basic 3-column grid -->
    <div class="bg-white rounded-2xl p-6 shadow-sm">
      <h2 class="text-lg font-semibold mb-4">Basic 3-Column Grid</h2>
      <div class="grid grid-cols-3 gap-4">
        <div class="bg-blue-500 text-white p-6 rounded-lg text-center font-bold">1</div>
        <div class="bg-blue-500 text-white p-6 rounded-lg text-center font-bold">2</div>
        <div class="bg-blue-500 text-white p-6 rounded-lg text-center font-bold">3</div>
        <div class="bg-blue-500 text-white p-6 rounded-lg text-center font-bold">4</div>
        <div class="bg-blue-500 text-white p-6 rounded-lg text-center font-bold">5</div>
        <div class="bg-blue-500 text-white p-6 rounded-lg text-center font-bold">6</div>
      </div>
    </div>
    
    <!-- Responsive grid -->
    <div class="bg-white rounded-2xl p-6 shadow-sm">
      <h2 class="text-lg font-semibold mb-4">Responsive Grid (1→2→3 columns)</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="bg-purple-500 text-white p-6 rounded-lg text-center font-bold">1</div>
        <div class="bg-purple-500 text-white p-6 rounded-lg text-center font-bold">2</div>
        <div class="bg-purple-500 text-white p-6 rounded-lg text-center font-bold">3</div>
        <div class="bg-purple-500 text-white p-6 rounded-lg text-center font-bold">4</div>
        <div class="bg-purple-500 text-white p-6 rounded-lg text-center font-bold">5</div>
        <div class="bg-purple-500 text-white p-6 rounded-lg text-center font-bold">6</div>
      </div>
    </div>
    
    <!-- Spanning items -->
    <div class="bg-white rounded-2xl p-6 shadow-sm">
      <h2 class="text-lg font-semibold mb-4">Spanning Items</h2>
      <div class="grid grid-cols-3 gap-4">
        <div class="col-span-2 bg-green-500 text-white p-6 rounded-lg text-center font-bold">col-span-2</div>
        <div class="bg-green-500 text-white p-6 rounded-lg text-center font-bold">Normal</div>
        <div class="bg-green-500 text-white p-6 rounded-lg text-center font-bold">Normal</div>
        <div class="bg-green-500 text-white p-6 rounded-lg text-center font-bold">Normal</div>
        <div class="col-span-3 bg-green-500 text-white p-6 rounded-lg text-center font-bold">col-span-3 (full width)</div>
      </div>
    </div>
    
    <!-- Dashboard layout -->
    <div class="bg-white rounded-2xl p-6 shadow-sm">
      <h2 class="text-lg font-semibold mb-4">Dashboard Layout</h2>
      <div class="grid grid-cols-4 gap-4">
        <div class="col-span-4 bg-gray-900 text-white p-4 rounded-lg text-center">Header (col-span-4)</div>
        <div class="col-span-1 bg-gray-100 p-4 rounded-lg">Sidebar</div>
        <div class="col-span-3 bg-white p-6 rounded-lg border border-gray-200 min-h-[200px]">Main Content</div>
        <div class="col-span-4 bg-gray-800 text-gray-300 p-3 rounded-lg text-center text-sm">Footer (col-span-4)</div>
      </div>
    </div>
  </div>
</body>
</html>`,
    hint: "grid grid-cols-{n} for grid. col-span-{n} for spanning. Responsive: grid-cols-1 md:grid-cols-2 lg:grid-cols-3. row-span-{n} for row spanning. gap-{size} for spacing.",
    tests: [
      { name: "grid class used", validate: testContains("grid") },
      { name: "grid-cols used", validate: testRegex(/grid-cols-\d+/) },
      { name: "col-span used", validate: testRegex(/col-span-\d+/) },
      { name: "gap used", validate: testRegex(/gap-\d+/) },
      { name: "responsive grid used", validate: testRegex(/md:grid-cols/) },
    ],
  },
];

// ─── CHAPTER 11: POSITION ───

const CH11_LESSONS = [
  {
    id: "tw-position",
    chapter: 11,
    title: "Position & Z-Index",
    level: "Intermediate",
    tags: ["Position", "Absolute", "Fixed", "Sticky", "Z-Index"],
    conceptExplanation: `Tailwind provides utilities for all CSS positioning types.

**Position Classes:**
\`\`\`html
<div class="static">Default position</div>
<div class="relative">Relative to normal position</div>
<div class="absolute">Absolute positioning</div>
<div class="fixed">Fixed to viewport</div>
<div class="sticky">Sticky positioning</div>
\`\`\`

**Offset Utilities:**
\`\`\`html
<div class="relative">
  <div class="absolute top-0 right-0">Top-right corner</div>
  <div class="absolute bottom-4 left-4">Bottom-left with offset</div>
  <div class="absolute inset-0">Covers entire parent (top-0 right-0 bottom-0 left-0)</div>
  <div class="absolute inset-x-0 bottom-0">Full width at bottom</div>
</div>
\`\`\`

**Common Position Patterns:**
\`\`\`html
<!-- Fixed Header -->
<header class="fixed top-0 left-0 right-0 z-50 bg-white shadow">Header</header>

<!-- Badge on Card -->
<div class="relative">
  <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">New</span>
  <div class="bg-white p-4 rounded-lg">Card content</div>
</div>

<!-- Sticky Section Header -->
<h2 class="sticky top-0 bg-white z-10 py-2">Section Title</h2>

<!-- Full-Screen Overlay -->
<div class="fixed inset-0 bg-black/50 z-40">Overlay</div>
<div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">Modal</div>
\`\`\`

**Z-Index:**
\`\`\`html
<div class="z-0">Lowest</div>
<div class="z-10">Higher</div>
<div class="z-50">Modal level</div>
<div class="z-[999]">Custom z-index (arbitrary value)</div>
\`\`\``,
    keyRules: [
      "fixed needs top/right/bottom/left — always s et at least one offset",
      "absolute positions relative to the nearest positioned ancestor (use relative)",
      "sticky needs a threshold — top: 0 is most common",
      "z-index only works on positioned elements (not static)",
      "inset-0 = top-0 + right-0 + bottom-0 + left-0",
    ],
    task: `Create a page demonstrating positioning:
1. A fixed header/navbar
2. A card with an absolute-positioned badge
3. A sticky sidebar or section heading
4. A modal overlay with centered content
5. Use z-index for layering`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Position</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <!-- Fixed Header -->
  
  <!-- Cards with badges -->
  
  <!-- Modal Overlay -->
  
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Position</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="pt-16">
  <!-- Fixed Header -->
  <header class="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm px-6 py-3 flex items-center justify-between">
    <h1 class="text-lg font-bold text-gray-900">Positioning Demo</h1>
    <nav class="flex gap-6 text-sm text-gray-600">
      <a href="#" class="hover:text-blue-600">Home</a>
      <a href="#" class="hover:text-blue-600">About</a>
      <a href="#" class="hover:text-blue-600">Contact</a>
    </nav>
  </header>
  
  <div class="max-w-4xl mx-auto px-4 py-8">
    <!-- Card with Badge -->
    <div class="grid md:grid-cols-2 gap-6 mb-12">
      <div class="relative bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">New</span>
        <h3 class="font-bold text-gray-900">Featured Product</h3>
        <p class="text-gray-600 text-sm mt-1">This card has a badge positioned absolutely.</p>
      </div>
      <div class="relative bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <span class="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded">In Stock</span>
        <h3 class="font-bold text-gray-900">Premium Item</h3>
        <p class="text-gray-600 text-sm mt-1">Badge uses top-3 right-3 for positioning.</p>
      </div>
    </div>
    
    <!-- Sticky Section Headers -->
    <div class="space-y-1">
      <h2 class="sticky top-16 z-10 bg-gray-100 py-3 px-4 font-bold text-gray-800 rounded-lg">Section A</h2>
      <div class="h-40 bg-gray-50 rounded-lg mb-4 flex items-center justify-center text-gray-400">Scroll down...</div>
      
      <h2 class="sticky top-16 z-10 bg-gray-100 py-3 px-4 font-bold text-gray-800 rounded-lg">Section B</h2>
      <div class="h-40 bg-gray-50 rounded-lg mb-4 flex items-center justify-center text-gray-400">Sticky heading follows</div>
    </div>
    
    <!-- Modal Demo Button -->
    <div class="text-center py-8">
      <p class="text-sm text-gray-500 mb-4">View the modal example below (it's simulated):</p>
    </div>
  </div>
  
  <!-- Modal Overlay (for demo) -->
  <div class="fixed inset-0 bg-black/40 z-40 flex items-center justify-center">
    <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md z-50 relative">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Modal Title</h2>
      <p class="text-gray-600 mb-6">This modal is centered using flex items-center justify-center on the overlay.</p>
      <button class="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium w-full">Close Modal</button>
    </div>
  </div>
</body>
</html>`,
    hint: "fixed for header, absolute for badges (parent needs relative), sticky for section headers. inset-0 = full coverage. z-{10-50} for layering. -translate-x-1/2 -translate-y-1/2 for perfect centering.",
    tests: [
      { name: "fixed position used", validate: testContains("fixed") },
      { name: "absolute position used", validate: testContains("absolute") },
      { name: "inset-0 used", validate: testContains("inset-0") },
      { name: "z-index used", validate: testRegex(/z-\d+/) },
    ],
  },
];

// ─── CHAPTER 12: RESPONSIVE DESIGN ───

const CH12_LESSONS = [
  {
    id: "tw-responsive",
    chapter: 12,
    title: "Responsive Design",
    level: "Intermediate",
    tags: ["Responsive", "Breakpoints", "Mobile First"],
    conceptExplanation: `Tailwind uses a mobile-first responsive system with breakpoint prefixes.

**Tailwind Breakpoints:**
\`\`\`
sm: 640px   — Tablet (landscape)
md: 768px   — Small desktop / tablet
lg: 1024px  — Desktop
xl: 1280px  — Large desktop
2xl: 1536px — Extra large
\`\`\`

**How it works — prefix meaning:**
\`\`\`html
<!-- Always flex, but column on mobile, row on desktop -->
<div class="flex flex-col md:flex-row">
  <div>Sidebar</div>
  <div>Content</div>
</div>

<!-- Grid: 1 col mobile, 2 cols tablet, 4 cols desktop -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
  <div>Card 4</div>
</div>
\`\`\`

**Mobile-First means:**
• Base classes apply to all screen sizes
• Prefix classes (md:, lg:, etc.) override from that breakpoint up
• No prefix = mobile-first

**Common Responsive Patterns:**
\`\`\`html
<!-- Hide on mobile, show on desktop -->
<div class="hidden md:block">Desktop only</div>
<!-- Show on mobile, hide on desktop -->
<div class="block md:hidden">Mobile only</div>

<!-- Responsive padding -->
<div class="p-4 md:p-8 lg:p-12"></div>

<!-- Responsive text -->
<h1 class="text-2xl md:text-4xl lg:text-5xl">Responsive Heading</h1>
\`\`\``,
    keyRules: [
      "Design mobile-first: base styles for mobile, then sm:/md:/lg: to enhance",
      "Use hidden md:block to show only on desktop",
      "Use block md:hidden to show only on mobile",
      "Stack breakpoints: grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      "Responsive padding/text: p-4 md:p-8, text-lg md:text-2xl",
    ],
    task: `Create a responsive page:
1. A nav that's a column on mobile, row on desktop (flex-col md:flex-row)
2. A grid: 1 column mobile, 2 tablet, 4 desktop
3. A section that's hidden on mobile, visible on desktop (hidden md:block)
4. Responsive text sizes (text-xl md:text-3xl lg:text-4xl)
5. Responsive spacing (p-4 md:p-8)`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Responsive</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 p-4 md:p-8">
  <div class="max-w-6xl mx-auto">
    <h1 class="text-2xl md:text-4xl font-bold">Responsive Design</h1>
    <!-- Add responsive elements -->
    
  </div>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Responsive</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 p-4 md:p-8 lg:p-12 min-h-screen">
  <div class="max-w-6xl mx-auto">
    <h1 class="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-2">Responsive Design</h1>
    <p class="text-sm md:text-base text-gray-500 mb-8">Resize your browser to see responsive classes in action.</p>
    
    <!-- Responsive Nav -->
    <nav class="flex flex-col md:flex-row gap-2 md:gap-6 items-start md:items-center bg-white rounded-xl p-4 shadow-sm mb-8">
      <span class="font-bold text-gray-900 mb-2 md:mb-0">MyApp</span>
      <div class="flex flex-col md:flex-row gap-2 md:gap-4 w-full md:w-auto">
        <a href="#" class="text-gray-600 hover:text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-50">Dashboard</a>
        <a href="#" class="text-gray-600 hover:text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-50">Analytics</a>
        <a href="#" class="text-gray-600 hover:text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-50">Settings</a>
      </div>
    </nav>
    
    <!-- Responsive Grid -->      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div class="text-lg font-bold text-gray-900">Card 1</div>
          <div class="text-gray-500 text-sm">1 col → 2 cols → 4 cols</div>
        </div>
        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div class="text-lg font-bold text-gray-900">Card 2</div>
          <div class="text-gray-500 text-sm">1 col → 2 cols → 4 cols</div>
        </div>
        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div class="text-lg font-bold text-gray-900">Card 3</div>
          <div class="text-gray-500 text-sm">1 col → 2 cols → 4 cols</div>
        </div>
        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div class="text-lg font-bold text-gray-900">Card 4</div>
          <div class="text-gray-500 text-sm">1 col → 2 cols → 4 cols</div>
        </div>
      </div>
    
    <!-- Desktop-only section -->
    <div class="hidden md:block bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white mb-8">
      <h2 class="text-2xl font-bold mb-2">Desktop Only Section</h2>
      <p class="text-blue-200">This section is hidden on mobile using hidden md:block.</p>
    </div>
    
    <!-- Mobile-only section -->
    <div class="block md:hidden bg-amber-500 rounded-xl p-6 text-white mb-8">
      <h2 class="text-xl font-bold">Mobile Only</h2>
      <p>This only shows on mobile (block md:hidden).</p>
    </div>
  </div>
</body>
</html>`,
    hint: "Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px). Base = mobile. Prefix = that size and up. hidden md:block = desktop only. block md:hidden = mobile only.",
    tests: [
      { name: "md: prefix used", validate: testRegex(/md:\w+/) },
      { name: "responsive grid-cols used", validate: testRegex(/sm:grid-cols-/) },
      { name: "hidden md:block used", validate: testContains("hidden") && testContains("md:block") },
      { name: "responsive text size used", validate: testRegex(/md:text-\w+/) },
    ],
  },
];

// ─── CHAPTER 13: DARK MODE ───

const CH13_LESSONS = [
  {
    id: "tw-dark-mode",
    chapter: 13,
    title: "Dark Mode",
    level: "Intermediate",
    tags: ["Dark Mode", "Theme", "Color Scheme"],
    conceptExplanation: `Tailwind makes dark mode simple with the \`dark:\` variant.

**Setup (in tailwind.config.js):**
\`\`\`js
module.exports = {
  darkMode: 'class', // or 'media'
}
\`\`\`

**Using dark: variant:**
\`\`\`html
<!-- Toggle dark mode by adding 'dark' class to html element -->
<html class="dark">

<!-- Styles change based on dark mode -->
<div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
  <h1 class="text-gray-900 dark:text-white">Heading</h1>
  <p class="text-gray-600 dark:text-gray-400">Body text</p>
</div>
\`\`\`

**Complete Dark Mode Card:**
\`\`\`html
<div class="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-2xl p-6 transition-colors">
  <h2 class="text-gray-900 dark:text-white font-bold">Card Title</h2>
  <p class="text-gray-600 dark:text-gray-400">Card content that adapts to dark mode.</p>
</div>
\`\`\`

**Common Dark Mode Patterns:**
\`\`\`html
<!-- Background -->
<div class="bg-gray-50 dark:bg-gray-900"></div>

<!-- Text -->
<p class="text-gray-900 dark:text-gray-100"></p>

<!-- Border -->
<div class="border border-gray-200 dark:border-gray-700"></div>

<!-- Interactive -->
<button class="bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-400"></button>

<!-- Transition for smooth theme change -->
* { transition: background-color 0.3s, color 0.3s; }
\`\`\``,
    keyRules: [
      "Always provide both light and dark: variants for every color",
      "Use dark:bg-gray-800/900 for dark backgrounds, dark:text-gray-100/300 for text",
      "Add transition-colors to elements for smooth theme switching",
      "dark: variant works with any utility: dark:hover:bg-gray-700, dark:focus:ring-blue-400",
      "For images, dark:brightness-75 or dark:opacity-80 works well",
    ],
    task: `Create a dark mode showcase page:
1. A card that adapts to dark mode (bg-white dark:bg-gray-800)
2. Text with both variants (text-gray-900 dark:text-white)
3. A dark mode toggle button (using class-based dark mode)
4. Navigation that works in both modes
5. A gradient that also works in dark mode`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Dark Mode</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    // Toggle dark mode
    function toggleDark() {
      document.documentElement.classList.toggle('dark');
    }
  </script>
  <style>* { transition: background-color 0.3s, color 0.3s; }</style>
</head>
<body class="bg-gray-50 dark:bg-gray-900 min-h-screen">
  <!-- Dark mode toggle + content -->
  
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Dark Mode</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    if (localStorage.getItem('dark') === 'true') document.documentElement.classList.add('dark');
    function toggleDark() {
      document.documentElement.classList.toggle('dark');
      localStorage.setItem('dark', document.documentElement.classList.contains('dark'));
    }
  </script>
  <style>* { transition: background-color 0.3s, color 0.3s, border-color 0.3s; }</style>
</head>
<body class="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
  <div class="max-w-3xl mx-auto px-4 py-8">
    <!-- Header with toggle -->
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Dark Mode</h1>
      <button onclick="toggleDark()" class="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium text-sm">
        Toggle Dark Mode
      </button>
    </div>
    
    <!-- Card -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-2xl p-8 border border-gray-100 dark:border-gray-700 mb-6">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">Dark Mode Card</h2>
      <p class="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
        This card automatically adapts to dark mode using Tailwind's dark: variant. Notice how all colors shift.
      </p>
      <div class="flex gap-3">
        <button class="bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-400 text-white px-5 py-2 rounded-lg font-medium">Primary</button>
        <button class="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-5 py-2 rounded-lg font-medium">Secondary</button>
      </div>
    </div>
    
    <!-- Feature Grid -->
    <div class="grid md:grid-cols-2 gap-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 class="font-bold text-gray-900 dark:text-white mb-1">Design</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400">Works perfectly in both light and dark themes using dark: variant.</p>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 class="font-bold text-gray-900 dark:text-white mb-1">Code</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400">Works perfectly in both light and dark themes using dark: variant.</p>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 class="font-bold text-gray-900 dark:text-white mb-1">Deploy</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400">Works perfectly in both light and dark themes using dark: variant.</p>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 class="font-bold text-gray-900 dark:text-white mb-1">Scale</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400">Works perfectly in both light and dark themes using dark: variant.</p>
      </div>
    </div>
    
    <!-- Stats -->
    <div class="mt-6 bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 flex items-center justify-around">
      <div class="text-center">
        <div class="text-2xl font-bold text-gray-900 dark:text-white">12K</div>
        <div class="text-sm text-gray-500 dark:text-gray-400">Users</div>
      </div>
      <div class="text-center">
        <div class="text-2xl font-bold text-gray-900 dark:text-white">$48K</div>
        <div class="text-sm text-gray-500 dark:text-gray-400">Revenue</div>
      </div>
      <div class="text-center">
        <div class="text-2xl font-bold text-gray-900 dark:text-white">+12%</div>
        <div class="text-sm text-gray-500 dark:text-gray-400">Growth</div>
      </div>
    </div>
  </div>
</body>
</html>`,
    hint: "Add dark: prefix to any utility: dark:bg-gray-800, dark:text-white, dark:border-gray-700. Toggle 'dark' class on html. Add transition-colors for smooth changes.",
    tests: [
      { name: "dark: variant used", validate: testContains("dark:") },
      { name: "dark:bg class used", validate: testContains("dark:bg-") },
      { name: "dark:text class used", validate: testContains("dark:text-") },
      { name: "Dark mode toggle present", validate: testContains("toggleDark") || testContains("dark") },
    ],
  },
];

// ─── CHAPTER 14: ANIMATIONS ───

const CH14_LESSONS = [
  {
    id: "tw-animations",
    chapter: 14,
    title: "Animations & Transitions",
    level: "Intermediate",
    tags: ["Animation", "Transition", "Keyframes", "Hover Effects"],
    conceptExplanation: `Tailwind comes with built-in animation utilities and easy transition classes.

**Built-in Animations:**
\`\`\`html
<div class="animate-spin">Spinning</div>
<div class="animate-ping">Ping effect</div>
<div class="animate-pulse">Pulse (fade in/out)</div>
<div class="animate-bounce">Bouncing</div>
\`\`\`

**Transition Utilities:**
\`\`\`html
<button class="transition-all duration-300 hover:scale-105 hover:shadow-lg">
  Smooth hover animation
</button>

<div class="transition-colors duration-200 hover:bg-blue-600">
  Color transition
</div>

<div class="transition-transform duration-500 hover:rotate-12">
  Rotation transition
</div>
\`\`\`

**Transition Properties:**
\`\`\`html
<div class="transition">All properties, 150ms</div>
<div class="transition-colors">Color only</div>
<div class="transition-opacity">Opacity only</div>
<div class="transition-shadow">Shadow only</div>
<div class="transition-transform">Transform only</div>
\`\`\`

**Duration & Easing:**
\`\`\`html
<div class="transition duration-75">75ms</div>
<div class="transition duration-150">150ms</div>
<div class="transition duration-300">300ms</div>
<div class="transition duration-500">500ms</div>
<div class="transition duration-1000">1s</div>

<div class="ease-linear">Linear</div>
<div class="ease-in">Start slow</div>
<div class="ease-out">End slow</div>
<div class="ease-in-out">Both slow</div>
\`\`\``,
    keyRules: [
      "Always add transition class when animating — it enables the animation",
      "Use transition-all for general use, or specific like transition-transform for performance",
      "Common combo: transition-all duration-300 ease-in-out",
      "Use hover:scale-105, hover:rotate-*, hover:-translate-y-1 for micro-interactions",
      "animate-spin for loading states, animate-pulse for skeleton loading",
    ],
    task: `Create an animations showcase page:
1. A button with hover:scale-105 and hover:shadow-lg transitions
2. A card that lifts on hover using -translate-y-1
3. A loading spinner with animate-spin
4. A pulsing badge with animate-pulse
5. A bouncing notification icon`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Animations</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 p-8">
  <div class="max-w-3xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Animations & Transitions</h1>
    <!-- Add animation examples -->
    
  </div>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Animations</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 min-h-screen p-8">
  <div class="max-w-3xl mx-auto space-y-8">
    <h1 class="text-3xl font-bold text-gray-900">Animations & Transitions</h1>
    
    <!-- Hover Effects -->
    <div class="bg-white rounded-2xl p-6 shadow-sm">
      <h2 class="text-lg font-semibold mb-4">Hover Transitions</h2>
      <div class="flex flex-wrap gap-4">
        <button class="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl">
          Scale + Shadow
        </button>
        <button class="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          Lift Effect
        </button>
        <button class="bg-pink-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-500 hover:rotate-2 hover:scale-105">
          Rotate + Scale
        </button>
      </div>
    </div>
    
    <!-- Card with hover lift -->
    <div class="bg-white rounded-2xl p-6 shadow-sm">
      <h2 class="text-lg font-semibold mb-4">Card Lift Effect</h2>
      <div class="grid md:grid-cols-3 gap-4">
        <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
          <div class="text-lg font-bold text-gray-900 mb-1">Card 1</div>
          <div class="text-sm text-gray-500">Hover to lift</div>
        </div>
        <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
          <div class="text-lg font-bold text-gray-900 mb-1">Card 2</div>
          <div class="text-sm text-gray-500">Hover to lift</div>
        </div>
        <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
          <div class="text-lg font-bold text-gray-900 mb-1">Card 3</div>
          <div class="text-sm text-gray-500">Hover to lift</div>
        </div>
      </div>
    </div>
    
    <!-- Built-in Animations -->
    <div class="bg-white rounded-2xl p-6 shadow-sm">
      <h2 class="text-lg font-semibold mb-4">Built-in Animations</h2>
      <div class="flex items-center gap-8">
        <div class="flex flex-col items-center gap-2">
          <div class="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span class="text-xs text-gray-500">Spinner</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <div class="w-8 h-8 bg-green-500 rounded-full animate-pulse"></div>
          <span class="text-xs text-gray-500">Pulse</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <div class="w-8 h-8 bg-red-500 rounded-full animate-bounce"></div>
          <span class="text-xs text-gray-500">Bounce</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <div class="w-8 h-8 bg-yellow-500 rounded-full animate-ping"></div>
          <span class="text-xs text-gray-500">Ping</span>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`,
    hint: "transition-all duration-300 hover:scale-105 hover:shadow-lg for smooth hover. transition-transform for transform only. animate-spin/pulse/bounce for built-in animations.",
    tests: [
      { name: "transition class used", validate: testContains("transition") },
      { name: "hover:scale or hover:-translate used", validate: testAny(testContains("hover:scale"), testContains("hover:-translate")) },
      { name: "duration class used", validate: testRegex(/duration-\d+/) },
      { name: "animate- class used", validate: testRegex(/animate-\w+/) },
    ],
  },
];

// ─── Later chapters (15-20) follow same pattern ───

// Chapter 15: Pseudo Classes
const CH15_LESSONS = [
  {
    id: "tw-pseudo-classes",
    chapter: 15,
    title: "Pseudo Classes & States",
    level: "Intermediate",
    tags: ["Hover", "Focus", "Active", "States"],
    conceptExplanation: `Tailwind provides state variants for all CSS pseudo-classes.

**State Variants:**
\`\`\`html
<button class="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
  Interactive Button
</button>

<input class="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none" />

<a class="text-blue-600 hover:text-blue-800 visited:text-purple-600">Styled Link</a>
\`\`\`

**Group Hover (parent hover affects children):**
\`\`\`html
<div class="group cursor-pointer">
  <h3 class="group-hover:text-blue-600">Title changes on hover</h3>
  <p class="text-gray-500 group-hover:text-gray-700">Text changes too</p>
  <span class="opacity-0 group-hover:opacity-100 transition">Shows on hover</span>
</div>
\`\`\`

**Peer (sibling state):**
\`\`\`html
<input class="peer" />
<label class="peer-focus:text-blue-600 peer-invalid:text-red-500">
  Label changes based on input state
</label>
\`\`\`

**Combined States:**
\`\`\`html
<button class="
  bg-blue-600 dark:bg-blue-500
  hover:bg-blue-700 dark:hover:bg-blue-400
  focus:ring-2 focus:ring-blue-500
  disabled:opacity-50 disabled:cursor-not-allowed
  transition-all duration-200
">
  Fully interactive button
</button>
\`\`\``,
    keyRules: [
      "State variants: hover:, focus:, active:, disabled:, visited:",
      "group + group-hover: for parent-triggered child animations",
      "peer + peer-focus: for sibling-based styling without JavaScript",
      "focus:outline-none + focus:ring-2 focus:ring-{color}-500 for accessible focus",
      "Combine with dark:: dark:hover:bg-gray-600",
    ],
    task: `Create an interactive form with state handling:
1. An input with focus:border-blue-500 and focus:ring styles
2. A button with hover:, active:, and disabled: states
3. Use group-hover on a card to reveal a hover action
4. Use peer-invalid for validation styling
5. Add transition to all interactive elements`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Pseudo Classes</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 p-8">
  <div class="max-w-lg mx-auto">
    <h1 class="text-3xl font-bold mb-6">Interactive States</h1>
    <!-- Add interactive elements -->
    
  </div>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Pseudo Classes</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 min-h-screen p-8">
  <div class="max-w-lg mx-auto space-y-6">
    <h1 class="text-3xl font-bold text-gray-900">Interactive States</h1>
    
    <!-- Form -->
    <div class="bg-white rounded-2xl p-6 shadow-sm space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input type="email" 
          class="w-full px-4 py-2.5 border border-gray-300 rounded-lg
                 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none
                 transition-all duration-200
                 placeholder:text-gray-400" 
          placeholder="you@example.com" />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input type="password" 
          class="w-full px-4 py-2.5 border border-gray-300 rounded-lg
                 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none
                 transition-all duration-200" 
          placeholder="••••••••" />
      </div>
      
      <button class="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-6 py-2.5 rounded-lg transition-all duration-200">
        Sign In
      </button>
    </div>
    
    <!-- Group hover cards -->
    <div class="grid grid-cols-2 gap-4">
      <div class="group relative bg-white rounded-xl p-6 shadow-sm border border-gray-100 cursor-pointer transition-all duration-200 hover:shadow-md">
        <h3 class="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Project Alpha</h3>
        <p class="text-sm text-gray-500">Web Application</p>
        <span class="inline-block mt-2 text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
          View project →
        </span>
      </div>
      <div class="group relative bg-white rounded-xl p-6 shadow-sm border border-gray-100 cursor-pointer transition-all duration-200 hover:shadow-md">
        <h3 class="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Project Beta</h3>
        <p class="text-sm text-gray-500">Mobile App</p>
        <span class="inline-block mt-2 text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
          View project →
        </span>
      </div>
    </div>
  </div>
</body>
</html>`,
    hint: "hover:, focus:, active:, disabled: for interactive states. group + group-hover: for parent hover. peer + peer-focus: for sibling states. Always pair focus:outline-none with focus:ring.",
    tests: [
      { name: "hover: variant used", validate: testContains("hover:") },
      { name: "focus: variant used", validate: testContains("focus:") },
      { name: "group-hover used", validate: testContains("group-hover") },
      { name: "transition class used", validate: testContains("transition") },
    ],
  },
];

// ─── CHAPTER 16: FORMS ───

const CH16_LESSONS = [
  {
    id: "tw-forms",
    chapter: 16,
    title: "Form Styling",
    level: "Intermediate",
    tags: ["Forms", "Input", "Button", "Select", "Checkbox"],
    conceptExplanation: `Tailwind makes form styling clean and consistent.

**Text Inputs:**
\`\`\`html
<input class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none" />
\`\`\`

**Textarea:**
\`\`\`html
<textarea class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none resize-none" rows="4"></textarea>
\`\`\`

**Select:**
\`\`\`html
<select class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none bg-white">
  <option>Option 1</option>
  <option>Option 2</option>
</select>
\`\`\`

**Checkbox & Radio:**
\`\`\`html
<label class="flex items-center gap-2 cursor-pointer">
  <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
  <span class="text-sm text-gray-700">Accept terms</span>
</label>

<label class="flex items-center gap-2 cursor-pointer">
  <input type="radio" name="opt" class="w-4 h-4 border-gray-300 text-blue-600 focus:ring-blue-500" />
  <span class="text-sm text-gray-700">Option A</span>
</label>
\`\`\`

**Input Groups (with addon/prepend):**
\`\`\`html
<div class="flex">
  <span class="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">https://</span>
  <input class="flex-1 px-4 py-2.5 border border-gray-300 rounded-r-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none" />
</div>
\`\`\``,
    keyRules: [
      "Consistent form styling: border, rounded-lg, padding, focus ring",
      "Always use focus:outline-none + focus:ring-2 for accessibility",
      "Checkbox: rounded for checkbox, rounded-full for radio",
      "Use cursor-pointer on labels for better UX",
      "disabled:opacity-50 disabled:cursor-not-allowed for disabled states",
    ],
    task: `Create a styled form:
1. A text input with proper focus styling
2. A textarea with resize-none
3. A styled select dropdown
4. Checkbox with custom styling
5. Submit button with hover/focus states
6. Form validation styles (required, disabled)`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Forms</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 p-8">
  <div class="max-w-lg mx-auto">
    <h1 class="text-3xl font-bold mb-6">Form Styling</h1>
    <!-- Create a registration form -->
    
  </div>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Forms</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 min-h-screen p-8">
  <div class="max-w-lg mx-auto">
    <h1 class="text-3xl font-bold text-gray-900 mb-6">Create Account</h1>
    
    <form class="bg-white rounded-2xl shadow-sm p-8 space-y-5">
      <!-- Name -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
        <input type="text" placeholder="John Doe" 
          class="w-full px-4 py-2.5 border border-gray-300 rounded-lg
                 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none
                 placeholder:text-gray-400 transition-all" />
      </div>
      
      <!-- Email -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
        <input type="email" placeholder="john@example.com" required
          class="w-full px-4 py-2.5 border border-gray-300 rounded-lg
                 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none
                 placeholder:text-gray-400 transition-all" />
      </div>
      
      <!-- Bio -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1.5">Bio</label>
        <textarea rows="3" placeholder="Tell us about yourself..."
          class="w-full px-4 py-3 border border-gray-300 rounded-lg
                 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none
                 placeholder:text-gray-400 transition-all resize-none"></textarea>
      </div>
      
      <!-- Country -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1.5">Country</label>
        <select
          class="w-full px-4 py-2.5 border border-gray-300 rounded-lg
                 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none
                 bg-white transition-all">
          <option>United States</option>
          <option>Canada</option>
          <option>United Kingdom</option>
          <option>India</option>
        </select>
      </div>
      
      <!-- Checkbox -->
      <label class="flex items-center gap-3 cursor-pointer">
        <input type="checkbox" 
          class="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500/30" />
        <span class="text-sm text-gray-600">I agree to the Terms and Privacy Policy</span>
      </label>
      
      <!-- Submit -->
      <button type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200">
        Create Account
      </button>
    </form>
  </div>
</body>
</html>`,
    hint: "Input: border border-gray-300 rounded-lg px-4 py-2.5. Focus: focus:border-blue-500 focus:ring-2. Checkbox: rounded + text-blue-600. Select: bg-white for consistent look.",
    tests: [
      { name: "Input with border and rounded", validate: testContains("border") && testContains("rounded") },
      { name: "Focus ring used", validate: testContains("focus:ring") },
      { name: "Checkbox styled", validate: testContains("type=\"checkbox\"") || testContains("type='checkbox'") },
      { name: "Form submit button", validate: testContains("submit") || testContains("type=\"submit\"") },
    ],
  },
];

// ─── CHAPTER 17: LAYOUT CHALLENGES ───

const CH17_LESSONS = [
  {
    id: "tw-navbar-hero",
    chapter: 17,
    title: "Navbar & Hero Layout",
    level: "Intermediate",
    tags: ["Layout", "Navbar", "Hero", "Section"],
    conceptExplanation: `Let's build common layout components with Tailwind.

**Navbar Pattern:**
\`\`\`html
<nav class="bg-white shadow-sm sticky top-0 z-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <div class="font-bold text-xl">Brand</div>
      <div class="hidden md:flex gap-8">
        <a href="#" class="text-gray-600 hover:text-gray-900">Link</a>
      </div>
      <button class="md:hidden">☰</button>
    </div>
  </div>
</nav>
\`\`\`

**Hero Section:**
\`\`\`html
<section class="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
  <div class="max-w-7xl mx-auto px-4 py-24 md:py-32">
    <div class="max-w-3xl">
      <h1 class="text-4xl md:text-6xl font-bold leading-tight">Main Heading</h1>
      <p class="mt-6 text-xl text-gray-300">Supporting text</p>
      <div class="mt-10 flex gap-4">
        <a href="#" class="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-medium">Get Started</a>
        <a href="#" class="text-gray-300 hover:text-white px-8 py-3">Learn More →</a>
      </div>
    </div>
  </div>
</section>
\`\`\`

**Feature Section:**
\`\`\`html
<section class="py-24">
  <div class="max-w-7xl mx-auto px-4">
    <h2 class="text-3xl font-bold text-center mb-16">Features</h2>
    <div class="grid md:grid-cols-3 gap-8">
      <div class="text-center p-8 rounded-2xl bg-white shadow-sm">
        <div class="text-4xl mb-4">🚀</div>
        <h3 class="text-xl font-bold mb-3">Feature</h3>
        <p class="text-gray-500">Description</p>
      </div>
    </div>
  </div>
</section>
\`\`\``,
    keyRules: [
      "Container pattern: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
      "Nav: sticky top-0 z-50 for sticky navbar",
      "Hero: py-24 md:py-32 for large padding, max-w-3xl for readable text",
      "Sections: py-16 or py-24 for consistent vertical spacing",
      "Use responsive padding and text sizes throughout",
    ],
    task: `Build a complete landing page section:
1. A sticky navbar with logo, links, and mobile hamburger area
2. A hero section with gradient background, heading, description, and CTA buttons
3. A features grid section with icons
4. Use responsive classes throughout
5. Proper spacing and typography`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Landing Layout</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <!-- Sticky Navbar -->
  
  <!-- Hero Section -->
  
  <!-- Features Section -->
  
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Landing Layout</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">
  <!-- Sticky Navbar -->
  <nav class="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="text-xl font-bold text-gray-900">FlowKit</div>
        <div class="hidden md:flex items-center gap-8">
          <a href="#" class="text-gray-600 hover:text-gray-900 transition">Features</a>
          <a href="#" class="text-gray-600 hover:text-gray-900 transition">Pricing</a>
          <a href="#" class="text-gray-600 hover:text-gray-900 transition">About</a>
        </div>
        <button class="md:hidden text-gray-600">Menu</button>
      </div>
    </div>
  </nav>
  
  <!-- Hero Section -->
  <section class="bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 text-white">
    <div class="max-w-7xl mx-auto px-4 py-24 md:py-36">
      <div class="max-w-3xl">
        <h1 class="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight">
          Build Faster<br/>
          <span class="text-indigo-400">With Tailwind</span>
        </h1>
        <p class="mt-6 text-lg md:text-xl text-gray-300 max-w-xl">
          The fastest way to build modern websites. Ship beautiful, responsive UIs in record time.
        </p>
        <div class="mt-10 flex flex-col sm:flex-row gap-4">
          <a href="#" class="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200">
            Get Started Free
          </a>
          <a href="#" class="inline-flex items-center justify-center text-gray-300 hover:text-white font-medium px-8 py-3.5 transition">
            Learn More →
          </a>
        </div>
      </div>
    </div>
  </section>
  
  <!-- Features Section -->
  <section class="py-24">
    <div class="max-w-7xl mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">Everything You Need</h2>
      <p class="text-gray-500 text-center max-w-xl mx-auto mb-16">Build production-ready apps with our powerful toolkit.</p>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <div class="text-4xl mb-4">⚡</div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Lightning Fast</h3>
            <p class="text-gray-500">Built for speed with instant hot reload.</p>
          </div>
          <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <div class="text-4xl mb-4">🎨</div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Beautiful UI</h3>
            <p class="text-gray-500">Pre-built components and design system.</p>
          </div>
          <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <div class="text-4xl mb-4">📱</div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Responsive</h3>
            <p class="text-gray-500">Looks great on every device out of the box.</p>
          </div>
      </div>
    </div>
  </section>
</body>
</html>`,
    hint: "Nav: sticky top-0 z-50 bg-white/80 backdrop-blur. Hero: py-24 md:py-36. Features: grid md:grid-cols-3. Container: max-w-7xl mx-auto px-4.",
    tests: [
      { name: "Sticky navbar", validate: testContains("sticky") && testContains("top-0") },
      { name: "Gradient hero", validate: testContains("bg-gradient") },
      { name: "Responsive grid", validate: testRegex(/md:grid-cols-\d+/) },
      { name: "Container width", validate: testRegex(/max-w-\d+xl/) },
    ],
  },
];

// ─── CHAPTER 18: COMPONENTS ───

const CH18_LESSONS = [
  {
    id: "tw-button-card",
    chapter: 18,
    title: "Buttons & Cards",
    level: "Intermediate",
    tags: ["Button", "Card", "Component"],
    conceptExplanation: `Buttons and cards are the most common UI components. Here's how to build them with Tailwind.

**Button Variants:**
\`\`\`html
<!-- Primary -->
<button class="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors">
  Primary
</button>

<!-- Secondary -->
<button class="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-6 py-2.5 rounded-lg transition-colors">
  Secondary
</button>

<!-- Outline -->
<button class="border-2 border-blue-600 hover:bg-blue-50 text-blue-600 font-medium px-6 py-2 rounded-lg transition-colors">
  Outline
</button>

<!-- Ghost -->
<button class="hover:bg-gray-100 text-gray-600 font-medium px-6 py-2.5 rounded-lg transition-colors">
  Ghost
</button>

<!-- Sizes -->
<button class="px-3 py-1.5 text-sm">Small</button>
<button class="px-6 py-2.5">Default</button>
<button class="px-8 py-3.5 text-lg">Large</button>
\`\`\`

**Card Pattern:**
\`\`\`html
<div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
  <img src="..." alt="" class="w-full h-48 object-cover" />
  <div class="p-6">
    <span class="text-xs font-semibold text-blue-600 uppercase tracking-wider">Category</span>
    <h3 class="mt-2 text-xl font-bold text-gray-900">Card Title</h3>
    <p class="mt-2 text-gray-500 text-sm">Description text here.</p>
    <a href="#" class="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
      Read more →
    </a>
  </div>
</div>
\`\`\``,
    keyRules: [
      "Consistent button pattern: bg/hover/text/px/py/rounded/transition",
      "Card pattern: bg-white rounded-2xl shadow-sm border overflow-hidden",
      "Use hover:shadow-md and transition-shadow on cards for polish",
      "Button sizes: px-3 py-1.5 (sm), px-6 py-2.5 (default), px-8 py-3.5 (lg)",
      "Use uppercase tracking-wider for card category labels",
    ],
    task: `Build a component library page:
1. Primary, secondary, outline, and ghost buttons
2. Buttons in 3 sizes (sm, default, lg)
3. A card with image, category, title, description, and link
4. A horizontal card variant
5. Interactive hover effects on all components`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Components</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 p-8">
  <div class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Component Library</h1>
    <!-- Add buttons and cards -->
    
  </div>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Components</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 min-h-screen p-8">
  <div class="max-w-4xl mx-auto space-y-10">
    <h1 class="text-3xl font-bold text-gray-900">Component Library</h1>
    
    <!-- Buttons -->
    <section class="space-y-6">
      <h2 class="text-xl font-semibold text-gray-800">Button Variants</h2>
      <div class="flex flex-wrap gap-4">
        <button class="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg transition-all duration-200">Primary</button>
        <button class="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-6 py-2.5 rounded-lg transition-all duration-200">Secondary</button>
        <button class="border-2 border-blue-600 hover:bg-blue-50 text-blue-600 font-medium px-6 py-2 rounded-lg transition-all duration-200">Outline</button>
        <button class="hover:bg-gray-100 text-gray-600 font-medium px-6 py-2.5 rounded-lg transition-all duration-200">Ghost</button>
      </div>
      
      <h3 class="text-lg font-medium text-gray-700">Button Sizes</h3>
      <div class="flex flex-wrap items-center gap-4">
        <button class="bg-blue-600 hover:bg-blue-700 text-white font-medium px-3 py-1.5 rounded-lg text-sm transition">Small</button>
        <button class="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg transition">Default</button>
        <button class="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3.5 rounded-lg text-lg transition">Large</button>
      </div>
    </section>
    
    <!-- Cards -->
    <section class="space-y-6">
      <h2 class="text-xl font-semibold text-gray-800">Cards</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <!-- Standard Card -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
          <div class="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl">🎨</div>
          <div class="p-6">
            <span class="text-xs font-semibold text-blue-600 uppercase tracking-wider">Design</span>
            <h3 class="mt-2 text-xl font-bold text-gray-900">UI Components</h3>
            <p class="mt-2 text-gray-500 text-sm">Beautiful, reusable components built with Tailwind CSS.</p>
            <a href="#" class="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors">
              Learn more →
            </a>
          </div>
        </div>
        
        <!-- Horizontal Card -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div class="flex">
            <div class="w-1/3 bg-gradient-to-b from-green-400 to-emerald-600 flex items-center justify-center text-white text-3xl p-4">🚀</div>
            <div class="p-5 flex-1">
              <h3 class="font-bold text-gray-900">Fast Performance</h3>
              <p class="text-gray-500 text-sm mt-1">Optimized for speed and efficiency.</p>
              <span class="inline-block mt-2 text-xs font-medium text-green-600">Learn more →</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</body>
</html>`,
    hint: "Buttons: bg/hover/text/px/py/rounded/transition. Cards: bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-md. Sizes: px-3 py-1.5 (sm) / px-6 py-2.5 / px-8 py-3.5 (lg).",
    tests: [
      { name: "Primary button style", validate: testContains("bg-blue-600") && testContains("rounded-lg") },
      { name: "Outline button style", validate: testContains("border-2") },
      { name: "Card with shadow", validate: testContains("shadow-sm") && testContains("rounded-2xl") },
      { name: "Card hover effect", validate: testContains("hover:shadow") },
    ],
  },
];

// ─── CHAPTER 19: COMPONENTS 2 ───

const CH19_LESSONS = [
  {
    id: "tw-badge-avatar",
    chapter: 19,
    title: "Badges, Avatars & Tags",
    level: "Intermediate",
    tags: ["Badge", "Avatar", "Tag", "Chip"],
    conceptExplanation: `Small UI elements that add polish to your app.

**Badges & Tags:**
\`\`\`html
<!-- Color badges -->
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Blue</span>
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Success</span>
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Error</span>
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Warning</span>

<!-- Dot indicator -->
<span class="flex items-center gap-1.5 text-sm text-gray-600">
  <span class="w-2 h-2 rounded-full bg-green-500"></span>
  Online
</span>
\`\`\`

**Avatars:**
\`\`\`html
<!-- Image avatar -->
<img class="w-10 h-10 rounded-full" src="..." alt="" />
<img class="w-14 h-14 rounded-full ring-2 ring-white" src="..." alt="" />

<!-- Initial avatar -->
<div class="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium text-sm">JD</div>

<!-- Avatar group -->
<div class="flex -space-x-2">
  <div class="w-10 h-10 rounded-full ring-2 ring-white bg-blue-500"></div>
  <div class="w-10 h-10 rounded-full ring-2 ring-white bg-green-500"></div>
  <div class="w-10 h-10 rounded-full ring-2 ring-white bg-purple-500"></div>
</div>
\`\`\`

**Status Indicators:**
\`\`\`html
<div class="relative inline-flex">
  <img class="w-12 h-12 rounded-full" src="..." alt="" />
  <span class="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
</div>
\`\`\`

**Pricing Badge:**
\`\`\`html
<div class="relative">
  <span class="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">Popular</span>
  <div class="bg-white rounded-2xl p-6 shadow-sm">Pricing Card</div>
</div>
\`\`\``,
    keyRules: [
      "Badge pattern: inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      "Avatar sizes: w-8 h-8 (sm), w-10 h-10 (md), w-14 h-14 (lg), w-20 h-20 (xl)",
      "Avatar groups use negative space-x-* and ring-2 ring-white",
      "Status dot: absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white",
      "Color convention: bg-{color}-100 text-{color}-800 for badges",
    ],
    task: `Create a page with badges, avatars, and tags:
1. Badges in different colors (blue, green, red, yellow, purple)
2. Image avatar and initial-based avatar
3. Avatar group with overlapping
4. Avatar with online status indicator
5. Tags with close buttons`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Badges & Avatars</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 p-8">
  <div class="max-w-3xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Badges, Avatars & Tags</h1>
    <!-- Add badge and avatar demos -->
    
  </div>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Badges & Avatars</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 min-h-screen p-8">
  <div class="max-w-3xl mx-auto space-y-8">
    <h1 class="text-3xl font-bold text-gray-900">Badges, Avatars & Tags</h1>
    
    <!-- Badges -->
    <div class="bg-white rounded-2xl p-6 shadow-sm">
      <h2 class="text-lg font-semibold mb-4">Badges</h2>
      <div class="flex flex-wrap gap-3">
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Blue</span>
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Success</span>
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Error</span>
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Warning</span>
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">Purple</span>
      </div>
    </div>
    
    <!-- Avatars -->
    <div class="bg-white rounded-2xl p-6 shadow-sm">
      <h2 class="text-lg font-semibold mb-4">Avatars</h2>
      <div class="space-y-6">
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">JD</div>
          <div class="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold">SP</div>
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">AK</div>
          <div class="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-bold">TM</div>
        </div>
        
        <!-- Avatar with status -->
        <div class="flex items-center gap-2">
          <div class="relative">
            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
            <span class="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <div class="relative">
            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-gray-400 to-gray-500"></div>
            <span class="absolute bottom-0 right-0 w-3.5 h-3.5 bg-gray-400 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-900">Team Members</p>
            <p class="text-xs text-gray-500">Online indicator with absolute positioning</p>
          </div>
        </div>
        
        <!-- Avatar Group -->
        <div>
          <p class="text-sm font-medium text-gray-700 mb-2">Avatar Group</p>
          <div class="flex -space-x-2">
            <div class="w-10 h-10 rounded-full ring-2 ring-white bg-blue-500 flex items-center justify-center text-white text-xs font-bold">JD</div>
            <div class="w-10 h-10 rounded-full ring-2 ring-white bg-green-500 flex items-center justify-center text-white text-xs font-bold">SP</div>
            <div class="w-10 h-10 rounded-full ring-2 ring-white bg-purple-500 flex items-center justify-center text-white text-xs font-bold">AK</div>
            <div class="w-10 h-10 rounded-full ring-2 ring-white bg-gray-100 flex items-center justify-center text-gray-500 text-xs font-bold">+3</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`,
    hint: "Badges: inline-flex px-2.5 py-0.5 rounded-full text-xs. Avatars: w-10 h-10 rounded-full. Status dot: absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white. Group: -space-x-2 ring-2 ring-white.",
    tests: [
      { name: "Badge with rounded-full", validate: testContains("rounded-full") && testContains("px-2.5") },
      { name: "Avatar with rounded-full", validate: (code) => (code.match(/rounded-full/g) || []).length >= 2 },
      { name: "Status indicator dot", validate: testContains("absolute") && testContains("rounded-full") },
      { name: "Avatar group with ring", validate: testContains("ring-2") },
    ],
  },
];

// ─── CHAPTER 20: MINI PROJECTS ───

const CH20_LESSONS = [
  {
    id: "tw-pricing-card",
    chapter: 20,
    title: "Pricing Card Component",
    level: "Advanced",
    tags: ["Project", "Pricing", "Card", "Component"],
    conceptExplanation: `Let's build a complete pricing card component — a real-world UI pattern.

**Pricing Card Structure:**
\`\`\`html
<div class="max-w-sm mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
  <!-- Header -->
  <div class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 text-center">
    <h3 class="text-lg font-semibold opacity-90">Professional</h3>
    <div class="mt-4">
      <span class="text-5xl font-bold">$29</span>
      <span class="text-lg opacity-80">/month</span>
    </div>
  </div>
  
  <!-- Features -->
  <div class="p-6 space-y-4">
    <div class="flex items-center gap-3">
      <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
      <span class="text-gray-600">Feature text</span>
    </div>
  </div>
  
  <!-- CTA -->
  <div class="p-6 pt-0">
    <button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition">
      Get Started
    </button>
  </div>
</div>
\`\`\`

**Key UI Details:**
• Gradient header creates visual hierarchy
• Check marks use green for positive indicators
• The CTA button fills the card width
• Featured plan has a "Popular" badge
• Use space-y-* for consistent feature spacing`,
    keyRules: [
      "Gradient header draws attention to the plan name and price",
      "Use flex items-center gap-3 for feature rows",
      "Add a relative container + absolute badge for 'Popular' plan",
      "Shadow-lg on card + hover:shadow-xl for depth",
      "Compare plans: side by side grid with a featured plan highlighted",
    ],
    task: `Build a pricing section:
1. Three pricing cards side by side (Basic, Pro, Enterprise)
2. The middle (Pro) card should be "featured" with a Popular badge
3. Each card has a price, feature list, and CTA button
4. Use gradient headers and check marks for features
5. Add hover effects on cards`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Pricing Cards</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-8">
  <div class="max-w-5xl mx-auto">
    <h1 class="text-3xl font-bold text-center mb-8">Simple Pricing</h1>
    <!-- Build pricing cards grid -->
    
  </div>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Pricing Cards</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 min-h-screen p-8">
  <div class="max-w-5xl mx-auto">
    <h1 class="text-4xl font-bold text-center text-gray-900 mb-4">Simple Pricing</h1>
    <p class="text-gray-500 text-center max-w-xl mx-auto mb-12">Choose the right plan for your team. No hidden fees.</p>
    
    <div class="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
      <!-- Basic -->
      <div class="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div class="p-6 text-center">
          <h3 class="text-lg font-semibold text-gray-900">Basic</h3>
          <div class="mt-4">
            <span class="text-4xl font-bold text-gray-900">$9</span>
            <span class="text-gray-500">/mo</span>
          </div>
        </div>
        <div class="px-6 pb-6 space-y-3">
          <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
              <span class="text-gray-600 text-sm">5 Projects</span>
            </div>
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
              <span class="text-gray-600 text-sm">10GB Storage</span>
            </div>
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
              <span class="text-gray-600 text-sm">Basic Support</span>
            </div>
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
              <span class="text-gray-600 text-sm">Community Access</span>
            </div>
        </div>
        <div class="px-6 pb-6">
          <button class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-6 py-2.5 rounded-xl transition-all">Get Started</button>
        </div>
      </div>
      
      <!-- Pro (Featured) -->
      <div class="relative bg-white rounded-2xl shadow-xl overflow-hidden ring-2 ring-blue-500 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
        <span class="absolute top-0 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-b-lg">Most Popular</span>
        <div class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 text-center pt-8">
          <h3 class="text-lg font-semibold text-blue-100">Professional</h3>
          <div class="mt-4">
            <span class="text-4xl font-bold text-white">$29</span>
            <span class="text-blue-200">/mo</span>
          </div>
        </div>
        <div class="px-6 pb-6 space-y-3 pt-6">
          <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
              <span class="text-gray-600 text-sm">Unlimited Projects</span>
            </div>
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
              <span class="text-gray-600 text-sm">100GB Storage</span>
            </div>
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
              <span class="text-gray-600 text-sm">Priority Support</span>
            </div>
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
              <span class="text-gray-600 text-sm">Advanced Analytics</span>
            </div>
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
              <span class="text-gray-600 text-sm">Custom Domain</span>
            </div>
        </div>
        <div class="px-6 pb-6">
          <button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-all">Get Started</button>
        </div>
      </div>
      
      <!-- Enterprise -->
      <div class="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div class="p-6 text-center">
          <h3 class="text-lg font-semibold text-gray-900">Enterprise</h3>
          <div class="mt-4">
            <span class="text-4xl font-bold text-gray-900">$99</span>
            <span class="text-gray-500">/mo</span>
          </div>
        </div>
        <div class="px-6 pb-6 space-y-3">
          <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
              <span class="text-gray-600 text-sm">Unlimited Everything</span>
            </div>
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
              <span class="text-gray-600 text-sm">1TB Storage</span>
            </div>
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
              <span class="text-gray-600 text-sm">24/7 Support</span>
            </div>
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
              <span class="text-gray-600 text-sm">SSO & SAML</span>
            </div>
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
              <span class="text-gray-600 text-sm">Custom Integrations</span>
            </div>
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
              <span class="text-gray-600 text-sm">Dedicated Manager</span>
            </div>
        </div>
        <div class="px-6 pb-6">
          <button class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-6 py-2.5 rounded-xl transition-all">Get Started</button>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`,
    hint: "Featured card: ring-2 ring-blue-500 + Popular badge. Check marks: w-5 h-5 text-green-500. Gradient header: bg-gradient-to-r from-blue-600 to-indigo-700. Hover: hover:-translate-y-1 hover:shadow-xl.",
    tests: [
      { name: "Pricing grid with 3 cards", validate: testContains("grid") && testRegex(/md:grid-cols-3/) },
      { name: "Check mark SVG used", validate: testContains("M5 13l4 4L19 7") },
      { name: "Featured plan with ring", validate: testContains("ring-2") && testContains("ring-blue") },
      { name: "Popular badge", validate: testContains("Popular") },
      { name: "Hover lift effect", validate: testContains("hover:-translate-y-") },
    ],
  },
];

// ─── PLAYGROUND DEFAULT CODE ───

export const TW_PLAYGROUND_DEFAULT = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tailwind Playground</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 min-h-screen flex items-center justify-center p-8">
  <div class="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
    <h1 class="text-3xl font-bold text-gray-900 mb-2">Tailwind Playground</h1>
    <p class="text-gray-500 mb-6">Edit the HTML to see live preview updates!</p>
    <div class="flex justify-center gap-4">
      <div class="w-12 h-12 bg-blue-500 rounded-lg"></div>
      <div class="w-12 h-12 bg-green-500 rounded-lg"></div>
      <div class="w-12 h-12 bg-purple-500 rounded-lg"></div>
      <div class="w-12 h-12 bg-pink-500 rounded-lg"></div>
    </div>
  </div>
</body>
</html>`;

// ─── EXPORT ALL LESSONS ───

export const TW_LESSONS = [
  ...CH1_LESSONS,
  ...CH2_LESSONS,
  ...CH3_LESSONS,
  ...CH4_LESSONS,
  ...CH5_LESSONS,
  ...CH6_LESSONS,
  ...CH7_LESSONS,
  ...CH8_LESSONS,
  ...CH9_LESSONS,
  ...CH10_LESSONS,
  ...CH11_LESSONS,
  ...CH12_LESSONS,
  ...CH13_LESSONS,
  ...CH14_LESSONS,
  ...CH15_LESSONS,
  ...CH16_LESSONS,
  ...CH17_LESSONS,
  ...CH18_LESSONS,
  ...CH19_LESSONS,
  ...CH20_LESSONS,
];
