// ─── CSS Labs — Challenges Data ───

import { testContains, testRegex } from "./validators.js";

export const CSS_CHALLENGES = [
  {
    id: "challenge-center-div",
    title: "Center a Div",
    problem: "Using CSS, center the red inner box both horizontally and vertically inside the outer container. Use Flexbox, Grid, or absolute positioning.",
    difficulty: "Easy",
    tags: ["Centering", "Flexbox", "Grid"],
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Center a Div</title>
  <style>
    .container {
      width: 400px;
      height: 400px;
      background: #1e293b;
      /* Your centering styles here */
    }
    
    .box {
      width: 100px;
      height: 100px;
      background: #ef4444;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="box"></div>
  </div>
</body>
</html>`,
    solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Center a Div</title>
  <style>
    .container {
      width: 400px;
      height: 400px;
      background: #1e293b;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .box {
      width: 100px;
      height: 100px;
      background: #ef4444;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="box"></div>
  </div>
</body>
</html>`,
    hint: "Use display: flex on the container, then justify-content: center and align-items: center.",
    validation: "✓ Perfectly centered\n✓ Uses proper CSS\n✓ Works on resize",
  },
  {
    id: "challenge-card",
    title: "Build a Card",
    problem: "Create a card component with an image, title, description, and a button. The card should have a shadow, rounded corners, and padding.",
    difficulty: "Easy",
    tags: ["Card", "Box Model", "Design"],
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Card Component</title>
  <style>
    /* Your CSS here */
    body { font-family: system-ui, sans-serif; background: #f1f5f9; display: flex; justify-content: center; padding: 2rem; }
  </style>
</head>
<body>
  <div class="card">
    <img src="https://picsum.photos/400/250" alt="Card image" class="card-image" />
    <div class="card-content">
      <h2 class="card-title">Card Title</h2>
      <p class="card-text">This is a description of the card content.</p>
      <button class="card-btn">Learn More</button>
    </div>
  </div>
</body>
</html>`,
    solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Card Component</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #f1f5f9; display: flex; justify-content: center; padding: 2rem; }
    
    .card {
      max-width: 350px;
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s;
    }
    
    .card:hover { transform: translateY(-4px); }
    
    .card-image {
      width: 100%;
      display: block;
    }
    
    .card-content { padding: 1.5rem; }
    
    .card-title { margin: 0 0 0.5rem; font-size: 1.25rem; color: #0f172a; }
    
    .card-text { margin: 0 0 1rem; color: #64748b; line-height: 1.5; }
    
    .card-btn {
      padding: 0.5rem 1.25rem;
      background: #6366f1;
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
    }
    
    .card-btn:hover { background: #4f46e5; }
  </style>
</head>
<body>
  <div class="card">
    <img src="https://picsum.photos/400/250" alt="Card image" class="card-image" />
    <div class="card-content">
      <h2 class="card-title">Card Title</h2>
      <p class="card-text">This is a description of the card content.</p>
      <button class="card-btn">Learn More</button>
    </div>
  </div>
</body>
</html>`,
    hint: "Use border-radius for rounded corners, box-shadow for shadow, padding for inner spacing, and overflow: hidden on the card for the image.",
    validation: "✓ Rounded corners\n✓ Shadow\n✓ Proper padding\n✓ Clean design",
  },
  {
    id: "challenge-navbar",
    title: "Create Navigation Bar",
    problem: "Build a horizontal navigation bar with a logo on the left and links on the right. Use Flexbox for layout.",
    difficulty: "Easy",
    tags: ["Navigation", "Flexbox", "Layout"],
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Navigation</title>
  <style>
    /* Your CSS here */
    body { font-family: system-ui, sans-serif; margin: 0; }
  </style>
</head>
<body>
  <nav class="navbar">
    <div class="logo">Brand</div>
    <div class="nav-links">
      <a href="#">Home</a>
      <a href="#">About</a>
      <a href="#">Services</a>
      <a href="#">Contact</a>
    </div>
  </nav>
  <main style="padding: 2rem;">
    <h1>Page Content</h1>
  </main>
</body>
</html>`,
    solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Navigation</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; }
    
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background: #1e293b;
    }
    
    .logo { font-size: 1.25rem; font-weight: 700; color: white; }
    
    .nav-links { display: flex; gap: 1.5rem; }
    
    .nav-links a { color: rgba(255,255,255,0.7); text-decoration: none; font-weight: 500; transition: color 0.2s; }
    
    .nav-links a:hover { color: white; }
    
    main { padding: 2rem; }
  </style>
</head>
<body>
  <nav class="navbar">
    <div class="logo">Brand</div>
    <div class="nav-links">
      <a href="#">Home</a>
      <a href="#">About</a>
      <a href="#">Services</a>
      <a href="#">Contact</a>
    </div>
  </nav>
  <main style="padding: 2rem;">
    <h1>Page Content</h1>
  </main>
</body>
</html>`,
    hint: "Use display: flex on .navbar, justify-content: space-between, align-items: center. Use another flex on .nav-links with gap.",
    validation: "✓ Logo on left\n✓ Links on right\n✓ Flexbox used\n✓ Hover states",
  },
  {
    id: "challenge-pricing-component",
    title: "Pricing Component",
    problem: "Create a pricing card with a title, price, feature list (with check marks), and a CTA button. Style it to look professional.",
    difficulty: "Medium",
    tags: ["Card", "Pricing", "Lists", "Flexbox"],
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Pricing Card</title>
  <style>
    /* Your CSS here */
    body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; justify-content: center; padding: 2rem; }
  </style>
</head>
<body>
  <div class="pricing-card">
    <h3 class="plan-name">Pro Plan</h3>
    <div class="price">$29</div>
    <ul class="features">
      <li>10 Users</li>
      <li>50GB Storage</li>
      <li>API Access</li>
      <li>Priority Support</li>
    </ul>
    <button class="cta-btn">Get Started</button>
  </div>
</body>
</html>`,
    solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Pricing Card</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; justify-content: center; padding: 2rem; }
    
    .pricing-card {
      max-width: 350px;
      width: 100%;
      background: white;
      border-radius: 16px;
      padding: 2rem;
      text-align: center;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      border: 1px solid #e2e8f0;
    }
    
    .plan-name { margin: 0 0 0.5rem; color: #6366f1; text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.85rem; }
    
    .price { font-size: 3rem; font-weight: 800; color: #0f172a; margin-bottom: 1.5rem; }
    
    .price span { font-size: 1rem; color: #64748b; font-weight: 400; }
    
    .features { list-style: none; padding: 0; margin: 0 0 1.5rem; text-align: left; }
    
    .features li {
      padding: 0.5rem 0;
      color: #475569;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .features li::before { content: "✓"; color: #22c55e; font-weight: 700; }
    
    .cta-btn {
      width: 100%;
      padding: 0.75rem;
      background: #6366f1;
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.2s;
    }
    
    .cta-btn:hover { background: #4f46e5; }

    .pricing-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12); transition: all 0.3s; }
  </style>
</head>
<body>
  <div class="pricing-card">
    <h3 class="plan-name">Pro Plan</h3>
    <div class="price">$29 <span>/month</span></div>
    <ul class="features">
      <li>10 Users</li>
      <li>50GB Storage</li>
      <li>API Access</li>
      <li>Priority Support</li>
    </ul>
    <button class="cta-btn">Get Started</button>
  </div>
</body>
</html>`,
    hint: "Use ::before pseudo-element on list items for check marks. Center text with text-align: center. Use box-shadow for depth.",
    validation: "✓ Professional look\n✓ Check marks on features\n✓ CTA button styling\n✓ Hover effect",
  },
  {
    id: "challenge-login-form",
    title: "Login Form",
    problem: "Create a styled login form with email, password fields, remember me checkbox, and submit button. Use proper focus states.",
    difficulty: "Medium",
    tags: ["Forms", "Focus", "Inputs", "Button"],
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Login Form</title>
  <style>
    /* Your CSS here */
    body { font-family: system-ui, sans-serif; background: #f1f5f9; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }
  </style>
</head>
<body>
  <form class="login-form">
    <h2>Welcome Back</h2>
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" id="email" placeholder="you@example.com" />
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" id="password" placeholder="••••••••" />
    </div>
    <label class="checkbox">
      <input type="checkbox" /> Remember me
    </label>
    <button type="submit">Sign In</button>
  </form>
</body>
</html>`,
    solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Login Form</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #f1f5f9; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }
    
    .login-form {
      width: 100%;
      max-width: 400px;
      background: white;
      padding: 2.5rem;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }
    
    .login-form h2 { margin: 0 0 1.5rem; color: #0f172a; text-align: center; }
    
    .form-group { margin-bottom: 1.25rem; }
    
    label { display: block; margin-bottom: 0.4rem; font-weight: 600; color: #1e293b; font-size: 0.9rem; }
    
    input[type="email"], input[type="password"] {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.2s, box-shadow 0.2s;
      box-sizing: border-box;
    }
    
    input:focus {
      border-color: #6366f1;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
      outline: none;
    }
    
    .checkbox { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem; cursor: pointer; }
    
    .checkbox input { width: auto; }
    
    button[type="submit"] {
      width: 100%;
      padding: 0.75rem;
      background: #6366f1;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    
    button[type="submit"]:hover { background: #4f46e5; }
    button[type="submit"]:focus-visible { outline: 2px solid #6366f1; outline-offset: 2px; }
  </style>
</head>
<body>
  <form class="login-form">
    <h2>Welcome Back</h2>
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" id="email" placeholder="you@example.com" />
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" id="password" placeholder="••••••••" />
    </div>
    <label class="checkbox">
      <input type="checkbox" /> Remember me
    </label>
    <button type="submit">Sign In</button>
  </form>
</body>
</html>`,
    hint: "Use box-sizing: border-box on inputs. Focus styles: border-color + box-shadow. Use display: flex on the checkbox for alignment.",
    validation: "✓ Proper input styling\n✓ Focus states visible\n✓ Checkbox styled\n✓ Centered on page",
  },
  {
    id: "challenge-responsive-hero",
    title: "Responsive Hero",
    problem: "Create a responsive hero section with a heading, subtitle, and two CTA buttons. It should look great on mobile and desktop.",
    difficulty: "Medium",
    tags: ["Responsive", "Hero", "Typography", "Media Queries"],
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Hero Section</title>
  <style>
    /* Your CSS here */
    body { font-family: system-ui, sans-serif; margin: 0; }
  </style>
</head>
<body>
  <section class="hero">
    <h1>Build Amazing Products</h1>
    <p>Create beautiful, responsive websites that delight your users.</p>
    <div class="hero-buttons">
      <a href="#" class="btn-primary">Get Started</a>
      <a href="#" class="btn-secondary">Learn More</a>
    </div>
  </section>
</body>
</html>`,
    solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Hero Section</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; }
    
    .hero {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      min-height: 60vh;
      padding: 2rem;
      background: linear-gradient(135deg, #0f172a, #1e293b);
      color: white;
    }
    
    .hero h1 {
      font-size: clamp(2rem, 5vw, 4rem);
      margin: 0 0 1rem;
      max-width: 700px;
      line-height: 1.1;
    }
    
    .hero p {
      font-size: clamp(1rem, 2vw, 1.25rem);
      color: rgba(255,255,255,0.7);
      max-width: 500px;
      margin: 0 0 2rem;
      line-height: 1.6;
    }
    
    .hero-buttons {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      justify-content: center;
    }
    
    .btn-primary, .btn-secondary {
      padding: 0.75rem 2rem;
      border-radius: 8px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.2s;
    }
    
    .btn-primary {
      background: #6366f1;
      color: white;
    }
    
    .btn-primary:hover { background: #4f46e5; transform: translateY(-2px); }
    
    .btn-secondary {
      background: rgba(255,255,255,0.1);
      color: white;
      border: 1px solid rgba(255,255,255,0.2);
    }
    
    .btn-secondary:hover { background: rgba(255,255,255,0.2); }
    
    @media (max-width: 480px) {
      .hero { min-height: 50vh; padding: 3rem 1.5rem; }
      .hero-buttons { flex-direction: column; width: 100%; }
      .hero-buttons a { text-align: center; }
    }
  </style>
</head>
<body>
  <section class="hero">
    <h1>Build Amazing Products</h1>
    <p>Create beautiful, responsive websites that delight your users.</p>
    <div class="hero-buttons">
      <a href="#" class="btn-primary">Get Started</a>
      <a href="#" class="btn-secondary">Learn More</a>
    </div>
  </section>
</body>
</html>`,
    hint: "Use clamp() for responsive font sizes. Use flex-wrap for button wrapping. Add a media query for mobile to stack buttons vertically.",
    validation: "✓ Responsive typography\n✓ Buttons stack on mobile\n✓ Gradient background\n✓ Great on all screens",
  },
  {
    id: "challenge-dashboard-layout",
    title: "Dashboard Layout",
    problem: "Create a dashboard layout with a sidebar, header, main content area, and stats cards using CSS Grid.",
    difficulty: "Hard",
    tags: ["Grid", "Dashboard", "Layout", "Sidebar"],
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Dashboard</title>
  <style>
    /* Your CSS here */
    body { font-family: system-ui, sans-serif; margin: 0; }
  </style>
</head>
<body>
  <div class="dashboard">
    <aside class="sidebar">Sidebar</aside>
    <header class="dash-header">Header</header>
    <main class="dash-main">
      <div class="stat-card">Sales</div>
      <div class="stat-card">Users</div>
      <div class="stat-card">Revenue</div>
      <div class="stat-card">Growth</div>
      <div class="chart">Chart Area</div>
      <div class="activity">Activity Feed</div>
    </main>
  </div>
</body>
</html>`,
    solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Dashboard</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; }
    
    .dashboard {
      display: grid;
      grid-template-areas:
        "sidebar header"
        "sidebar main";
      grid-template-columns: 240px 1fr;
      grid-template-rows: 64px 1fr;
      min-height: 100vh;
    }
    
    .sidebar {
      grid-area: sidebar;
      background: #1e293b;
      color: white;
      padding: 1.5rem;
    }
    
    .dash-header {
      grid-area: header;
      background: white;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      padding: 0 2rem;
      font-weight: 600;
    }
    
    .dash-main {
      grid-area: main;
      background: #f8fafc;
      padding: 1.5rem;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      align-content: start;
    }
    
    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 2px 4px rgba(0,0,0,0.04);
    }
    
    .chart { grid-column: span 2; background: white; padding: 2rem; border-radius: 12px; min-height: 200px; border: 1px solid #e2e8f0; }
    .activity { grid-column: span 2; background: white; padding: 2rem; border-radius: 12px; min-height: 150px; border: 1px solid #e2e8f0; }
    
    @media (max-width: 768px) {
      .dashboard {
        grid-template-areas:
          "header"
          "main";
        grid-template-columns: 1fr;
      }
      .sidebar { display: none; }
      .chart { grid-column: span 1; }
      .activity { grid-column: span 1; }
    }
  </style>
</head>
<body>
  <div class="dashboard">
    <aside class="sidebar">Sidebar</aside>
    <header class="dash-header">Header</header>
    <main class="dash-main">
      <div class="stat-card">Sales</div>
      <div class="stat-card">Users</div>
      <div class="stat-card">Revenue</div>
      <div class="stat-card">Growth</div>
      <div class="chart">Chart Area</div>
      <div class="activity">Activity Feed</div>
    </main>
  </div>
</body>
</html>`,
    hint: "Use grid-template-areas for the page layout. Use auto-fit + minmax for the stat cards. Use media queries to hide sidebar on mobile.",
    validation: "✓ Grid layout\n✓ Sidebar, header, main areas\n✓ Responsive stat cards\n✓ Mobile responsive",
  },
  {
    id: "challenge-product-grid",
    title: "Product Grid",
    problem: "Create a responsive product grid that shows 4 columns on desktop, 2 on tablet, and 1 on mobile. Each product card has an image, title, price, and rating.",
    difficulty: "Medium",
    tags: ["Grid", "Responsive", "Cards", "E-commerce"],
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Product Grid</title>
  <style>
    /* Your CSS here */
    body { font-family: system-ui, sans-serif; margin: 2rem; background: #f8fafc; }
  </style>
</head>
<body>
  <h1>Products</h1>
  <div class="product-grid">
    <div class="product-card">
      <img src="https://picsum.photos/300/300?1" alt="Product" />
      <h3>Product 1</h3>
      <p class="price">$19.99</p>
      <p class="rating">★★★★☆</p>
    </div>
    <div class="product-card">
      <img src="https://picsum.photos/300/300?2" alt="Product" />
      <h3>Product 2</h3>
      <p class="price">$29.99</p>
      <p class="rating">★★★★★</p>
    </div>
    <div class="product-card">
      <img src="https://picsum.photos/300/300?3" alt="Product" />
      <h3>Product 3</h3>
      <p class="price">$39.99</p>
      <p class="rating">★★★☆☆</p>
    </div>
    <div class="product-card">
      <img src="https://picsum.photos/300/300?4" alt="Product" />
      <h3>Product 4</h3>
      <p class="price">$49.99</p>
      <p class="rating">★★★★☆</p>
    </div>
  </div>
</body>
</html>`,
    solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Product Grid</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 2rem; background: #f8fafc; }
    
    .product-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
    }
    
    .product-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
      transition: transform 0.2s;
      padding-bottom: 1rem;
    }
    
    .product-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.1); }
    
    .product-card img { width: 100%; aspect-ratio: 1; object-fit: cover; }
    .product-card h3 { margin: 0.75rem 1rem 0.25rem; color: #0f172a; }
    .price { margin: 0 1rem 0.25rem; font-size: 1.25rem; font-weight: 700; color: #6366f1; }
    .rating { margin: 0 1rem; color: #f59e0b; }
    
    @media (max-width: 1024px) { .product-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 640px) { .product-grid { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <h1>Products</h1>
  <div class="product-grid">
    <div class="product-card">
      <img src="https://picsum.photos/300/300?1" alt="Product" />
      <h3>Product 1</h3>
      <p class="price">$19.99</p>
      <p class="rating">★★★★☆</p>
    </div>
    <div class="product-card">
      <img src="https://picsum.photos/300/300?2" alt="Product" />
      <h3>Product 2</h3>
      <p class="price">$29.99</p>
      <p class="rating">★★★★★</p>
    </div>
    <div class="product-card">
      <img src="https://picsum.photos/300/300?3" alt="Product" />
      <h3>Product 3</h3>
      <p class="price">$39.99</p>
      <p class="rating">★★★☆☆</p>
    </div>
    <div class="product-card">
      <img src="https://picsum.photos/300/300?4" alt="Product" />
      <h3>Product 4</h3>
      <p class="price">$49.99</p>
      <p class="rating">★★★★☆</p>
    </div>
  </div>
</body>
</html>`,
    hint: "Use grid-template-columns: repeat(4, 1fr) for desktop. Add media queries at 1024px (2 columns) and 640px (1 column).",
    validation: "✓ 4 columns on desktop\n✓ 2 columns on tablet\n✓ 1 column on mobile\n✓ Card hover effects",
  },
  {
    id: "challenge-modal-dialog",
    title: "Modal Dialog",
    problem: "Create a modal overlay with a centered dialog box, backdrop overlay, close button, and animation. The modal should use positioning, z-index, and transitions.",
    difficulty: "Hard",
    tags: ["Modal", "Positioning", "Z-Index", "Overlay"],
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Modal</title>
  <style>
    /* Your CSS here */
    body { font-family: system-ui, sans-serif; margin: 2rem; }
  </style>
</head>
<body>
  <button id="openModal">Open Modal</button>
  
  <div class="modal-overlay" id="modal">
    <div class="modal-content">
      <button class="modal-close" id="closeModal">✕</button>
      <h2>Modal Title</h2>
      <p>This is a modal dialog with a backdrop overlay.</p>
      <button id="confirmModal">Confirm</button>
    </div>
  </div>
  
  <script>
    document.getElementById('openModal').onclick = () => document.getElementById('modal').classList.add('open');
    document.getElementById('closeModal').onclick = () => document.getElementById('modal').classList.remove('open');
    document.getElementById('confirmModal').onclick = () => document.getElementById('modal').classList.remove('open');
  </script>
</body>
</html>`,
    solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Modal</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 2rem; }
    
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s;
    }
    
    .modal-overlay.open {
      opacity: 1;
      pointer-events: auto;
    }
    
    .modal-content {
      background: white;
      padding: 2rem;
      border-radius: 16px;
      max-width: 400px;
      width: 90%;
      position: relative;
      transform: scale(0.95) translateY(10px);
      transition: transform 0.3s;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }
    
    .modal-overlay.open .modal-content {
      transform: scale(1) translateY(0);
    }
    
    .modal-close {
      position: absolute;
      top: 0.75rem;
      right: 0.75rem;
      background: #f1f5f9;
      border: none;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
    }
    
    .modal-close:hover { background: #e2e8f0; }
  </style>
</head>
<body>
  <button id="openModal">Open Modal</button>
  
  <div class="modal-overlay" id="modal">
    <div class="modal-content">
      <button class="modal-close" id="closeModal">✕</button>
      <h2>Modal Title</h2>
      <p>This is a modal dialog with a backdrop overlay.</p>
      <button id="confirmModal">Confirm</button>
    </div>
  </div>
  
  <script>
    document.getElementById('openModal').onclick = () => document.getElementById('modal').classList.add('open');
    document.getElementById('closeModal').onclick = () => document.getElementById('modal').classList.remove('open');
    document.getElementById('confirmModal').onclick = () => document.getElementById('modal').classList.remove('open');
  </script>
</body>
</html>`,
    hint: "Use position: fixed for the overlay. Add backdrop-filter for blur effect. Use opacity + pointer-events to show/hide. Add transform: scale() for the animation.",
    validation: "✓ Fixed overlay covers entire screen\n✓ Centered modal with animation\n✓ Close button positioned absolutely\n✓ Backdrop blur effect",
  },
  {
    id: "challenge-responsive-landing",
    title: "Responsive Landing Page",
    problem: "Build a complete responsive landing page with a hero, features grid, testimonial section, and footer. Use CSS Grid, Flexbox, media queries, and smooth transitions.",
    difficulty: "Expert",
    tags: ["Landing Page", "Grid", "Flexbox", "Responsive", "Transitions"],
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Landing Page</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; }
  </style>
</head>
<body>
  <nav class="nav">Startup</nav>
  <section class="hero-sec">Hero</section>
  <section class="features-sec">Features</section>
  <section class="testimonials-sec">Testimonials</section>
  <footer class="footer-sec">Footer</footer>
</body>
</html>`,
    solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Landing Page</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; color: #1e293b; }
    
    .nav {
      background: white;
      border-bottom: 1px solid #e2e8f0;
      padding: 1rem 2rem;
      font-weight: 700;
      font-size: 1.25rem;
    }
    
    .hero-sec {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 6rem 2rem;
      background: linear-gradient(135deg, #0f172a, #1e293b);
      color: white;
    }
    
    .hero-sec h1 { font-size: clamp(2rem, 5vw, 3.5rem); max-width: 700px; margin: 0 0 1rem; }
    .hero-sec p { color: rgba(255,255,255,0.7); max-width: 500px; margin: 0 0 2rem; }
    .hero-sec a { display: inline-block; padding: 0.75rem 2rem; background: #6366f1; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; }
    
    .features-sec {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      padding: 4rem 2rem;
      max-width: 1000px;
      margin: 0 auto;
    }
    
    .features-sec > div { padding: 2rem; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; transition: transform 0.3s, box-shadow 0.3s; }
    .features-sec > div:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.06); }
    .features-sec h3 { margin: 0 0 0.5rem; }
    .features-sec p { color: #64748b; margin: 0; }
    
    .testimonials-sec {
      background: #f1f5f9;
      padding: 4rem 2rem;
      text-align: center;
    }
    
    .testimonials-sec blockquote { max-width: 500px; margin: 0 auto; font-style: italic; font-size: 1.25rem; color: #475569; }
    .testimonials-sec cite { color: #6366f1; font-style: normal; font-weight: 600; }
    
    .footer-sec { background: #0f172a; color: white; text-align: center; padding: 2rem; }
    
    @media (max-width: 640px) {
      .hero-sec { padding: 3rem 1.5rem; }
      .features-sec { padding: 2rem 1.5rem; }
    }
  </style>
</head>
<body>
  <nav class="nav">Startup</nav>
  <section class="hero-sec">
    <h1>Build Products People Love</h1>
    <p>A modern platform for teams to collaborate, ship faster, and delight customers.</p>
    <a href="#">Get Started</a>
  </section>
  <section class="features-sec">
    <div><h3>Fast</h3><p>Lightning quick performance worldwide.</p></div>
    <div><h3>Reliable</h3><p>99.99% uptime guaranteed SLA.</p></div>
    <div><h3>Secure</h3><p>Enterprise-grade security built in.</p></div>
    <div><h3>Scalable</h3><p>Grows with your business needs.</p></div>
  </section>
  <section class="testimonials-sec">
    <blockquote>"This platform transformed how our team works. Incredible product!"</blockquote>
    <cite>— Sarah Chen, CTO</cite>
  </section>
  <footer class="footer-sec">&copy; 2024 Startup. All rights reserved.</footer>
</body>
</html>`,
    hint: "Combine all skills: Flexbox for hero, Grid for features, media queries for mobile, transitions for hover effects. Use auto-fit + minmax for responsive grids.",
    validation: "✓ Responsive hero section\n✓ Features grid with hover\n✓ Testimonial section\n✓ Footer\n✓ Works on all devices",
  },
];
