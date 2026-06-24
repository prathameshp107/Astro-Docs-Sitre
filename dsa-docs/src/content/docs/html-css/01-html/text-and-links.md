---
title: "Text & Links"
description: "HTML headings, paragraphs, lists, anchor links, and images — the building blocks of content."
sidebar:
  order: 3
---

## Text & Links

### 🤔 Headings

HTML has six levels of headings. Think of them like a book's table of contents:

```html
<h1>Main Title (like a book title)</h1>
<h2>Chapter Title</h2>
<h3>Section Title</h3>
<h4>Sub-section</h4>
<h5>Minor heading</h5>
<h6>Smallest heading</h6>
```

**Rules:**
- Use **one `<h1>` per page** (the main title)
- Don't skip levels (don't jump from `<h2>` to `<h4>`)
- Search engines use headings to understand your content

> **Result:** `<h1>` is very large, `<h2>` smaller, down to `<h6>` which is tiny.

---

### 📝 Paragraphs & Text Formatting

```html
<p>This is a paragraph of text. Browsers automatically add space before and after paragraphs.</p>

<p>This is <strong>bold text</strong> and this is <em>italic text</em>.</p>

<p>This is <u>underlined</u>, this is <s>strikethrough</s>.</p>

<p>Line break<br>on the same paragraph.</p>

<p>Horizontal rule below:</p>
<hr>
```

| Tag | Effect |
|-----|--------|
| `<p>` | Paragraph |
| `<strong>` | **Bold** (important) |
| `<em>` | *Italic* (emphasis) |
| `<u>` | <u>Underlined</u> |
| `<s>` | ~~Strikethrough~~ |
| `<br>` | Line break |
| `<hr>` | Horizontal line |

> **Result:** Text with different formatting — bold stands out, italic is slanted, `<hr>` draws a line across the page.

---

### 📋 Lists

**Unordered list** (bullet points):
```html
<ul>
  <li>Apples</li>
  <li>Bananas</li>
  <li>Oranges</li>
</ul>
```

**Ordered list** (numbered):
```html
<ol>
  <li>First step</li>
  <li>Second step</li>
  <li>Third step</li>
</ol>
```

**Nested lists** (lists inside lists):
```html
<ul>
  <li>Fruits
    <ul>
      <li>Apple</li>
      <li>Banana</li>
    </ul>
  </li>
  <li>Vegetables</li>
</ul>
```

> **Result:** Unordered lists show bullets, ordered lists show numbers. Nested lists are indented.

---

### 🔗 Links (Anchor Tags)

Links are created with the `<a>` tag and the `href` attribute:

```html
<!-- Link to another page -->
<a href="https://example.com">Visit Example</a>

<!-- Link to another page on your site -->
<a href="/about">About Us</a>

<!-- Open in new tab -->
<a href="https://example.com" target="_blank" rel="noopener">Open in new tab</a>

<!-- Link to an email -->
<a href="mailto:hello@example.com">Send Email</a>

<!-- Link to a phone number -->
<a href="tel:+1234567890">Call Us</a>
```

> **Result:** Links appear blue and underlined by default. Visited links turn purple. Opening in a new tab keeps your page open in the original tab.

---

### 🖼️ Images

```html
<img src="photo.jpg" alt="A description of the photo">
```

| Attribute | Purpose |
|-----------|---------|
| `src` | File path or URL of the image |
| `alt` | Text description (for accessibility and when image fails to load) |
| `width` / `height` | Dimensions (in pixels) |

**Always use `alt` text** — it's read by screen readers and shown when the image doesn't load:

```html
<img src="dog.jpg" alt="A golden retriever playing in the park" width="400">
```

> **Result:** The image appears at its natural size or the size you specify. If the image is broken, the alt text is shown instead.

---

### In Simple Words

- Use `<h1>` to `<h6>` for headings — one `<h1>` per page
- `<p>` for paragraphs, `<strong>` for bold, `<em>` for italic
- `<ul>` for bullet lists, `<ol>` for numbered lists, `<li>` for each item
- `<a href="url">` creates links — use `target="_blank"` to open in a new tab
- `<img>` shows images — always include `alt` text for accessibility
