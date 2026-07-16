// ─── HTML Labs — Code Challenges Data ───

import { testContains, testRegex } from "./validators.js";

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
