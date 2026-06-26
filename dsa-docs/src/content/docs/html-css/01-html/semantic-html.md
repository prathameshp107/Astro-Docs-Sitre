---
title: "Semantic HTML"
description: "Semantic HTML uses meaningful tags like header, nav, main, article, and footer to describe content — not just style it."
sidebar:
  order: 2
---

## Semantic HTML

### 🤔 What is Semantic HTML?

Semantic HTML means using tags that **describe the meaning** of the content, not just how it looks.

Think of it like labeling boxes in a moving truck:
- **Non-semantic:** A box labeled "Stuff"
- **Semantic:** A box labeled "Kitchen — Plates"

Semantic tags tell browsers, screen readers, and search engines what each part of your page means.

---

### 📦 Non-semantic vs Semantic

**Non-semantic** (old way — all `<div>` and `<span>`):
```html
<div class="header">
  <div class="nav">
    <div>Home</div>
    <div>About</div>
  </div>
</div>
<div class="main">
  <div class="article">Article content...</div>
</div>
<div class="footer">Footer</div>
```

**Semantic** (modern way):
```html
<header>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
  </nav>
</header>
<main>
  <article>Article content...</article>
</main>
<footer>Footer</footer>
```

> **Result:** Both look identical in a browser. But the semantic version is readable and meaningful to machines.

---

### 🧱 The Semantic Elements

| Element | What it means |
|---------|--------------|
| `<header>` | Top of a page or section — logo, navigation, heading |
| `<nav>` | Navigation links (menus) |
| `<main>` | The main content of the page (only one per page) |
| `<section>` | A themed group of content (like a chapter) |
| `<article>` | A self-contained piece of content (blog post, news story) |
| `<aside>` | Side content — related but not essential (sidebar, ads) |
| `<footer>` | Bottom of a page — copyright, links, contact info |
| `<figure>` | An image, diagram, or code block with a caption |
| `<figcaption>` | Caption for a `<figure>` |

---

### 🏗️ Typical Page Layout

```html
<body>
  <header>
    <nav>
      <a href="/">Home</a>
      <a href="/blog">Blog</a>
      <a href="/contact">Contact</a>
    </nav>
  </header>

  <main>
    <article>
      <h1>Blog Post Title</h1>
      <p>Published on <time datetime="2025-01-15">Jan 15</time></p>
      <section>
        <h2>Introduction</h2>
        <p>Content of the blog post...</p>
      </section>
      <section>
        <h2>Conclusion</h2>
        <p>Wrapping up...</p>
      </section>
    </article>

    <aside>
      <h3>Related Posts</h3>
      <ul>
        <li><a href="/post1">Other article</a></li>
        <li><a href="/post2">Another article</a></li>
      </ul>
    </aside>
  </main>

  <footer>
    <p>&copy; 2025 My Blog</p>
  </footer>
</body>
```

> **Result:** A well-structured page where every section has a clear, machine-readable meaning.

---

### ✅ Why Semantics Matter

**1. Accessibility** — Screen readers use semantic tags to navigate. A blind user can jump from `<nav>` to `<main>` to find content.

**2. SEO** — Google ranks pages higher when it understands the structure. A `<article>` tag tells Google "this is the main content."

**3. Readability** — Developers can understand the page structure at a glance.

**4. Future-proof** — Semantic HTML works on every browser, every device, now and in the future.

---

### In Simple Words

- Semantic tags **describe meaning** (`<nav>` = navigation, `<article>` = article)
- They help **screen readers** (accessibility), **Google** (SEO), and **developers** (readability)
- Use `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- Avoid `<div>` for everything — use semantic tags instead
- A page should have **one `<main>`** and semantic sections that make logical sense
