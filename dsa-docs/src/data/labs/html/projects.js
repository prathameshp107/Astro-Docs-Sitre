// ─── HTML Labs — Projects Data ───

import { testContains, testRegex } from "./validators.js";

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
