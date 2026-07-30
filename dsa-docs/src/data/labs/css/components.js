// ─── CSS Labs — Components Data ───

import { testContains, testRegex } from "./validators.js";

export const CSS_COMPONENTS = [
  {
    id: "comp-buttons",
    title: "Buttons",
    overview: "Create a library of reusable button styles: primary, secondary, outline, ghost, with hover, focus, and disabled states.",
    concepts: ["Transition", "Box Model", "Typography", "States"],
    starterCode: `<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-outline">Outline</button>
<button class="btn btn-ghost">Ghost</button>
<button class="btn btn-primary" disabled>Disabled</button>`,
    solution: `button { font-family: inherit; }
.btn {
  padding: 0.65rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid transparent;
}
.btn-primary { background: #6366f1; color: white; border-color: #6366f1; }
.btn-primary:hover { background: #4f46e5; transform: translateY(-1px); }
.btn-secondary { background: #f1f5f9; color: #1e293b; border-color: #e2e8f0; }
.btn-secondary:hover { background: #e2e8f0; }
.btn-outline { background: transparent; color: #6366f1; border-color: #6366f1; }
.btn-outline:hover { background: #eef2ff; }
.btn-ghost { background: transparent; color: #64748b; border-color: transparent; }
.btn-ghost:hover { background: #f1f5f9; color: #1e293b; }
.btn:disabled { opacity: 0.5; cursor: not-allowed; pointer-events: none; }
.btn:focus-visible { outline: 2px solid #6366f1; outline-offset: 2px; }`,
  },
  {
    id: "comp-cards",
    title: "Cards",
    overview: "Build flexible card components with image, content, and action areas. Support horizontal and vertical variants.",
    concepts: ["Box Model", "Flexbox", "Border Radius", "Shadow"],
    starterCode: `<div class="card">
  <div class="card__content">
    <h3 class="card__title">Card Title</h3>
    <p class="card__text">Card description text here.</p>
  </div>
</div>`,
    solution: `.card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  transition: transform 0.2s, box-shadow 0.2s;
}
.card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.1); }
.card__img { width: 100%; aspect-ratio: 16/9; object-fit: cover; }
.card__content { padding: 1.5rem; }
.card__title { margin: 0 0 0.5rem; color: #0f172a; }
.card__text { margin: 0; color: #64748b; line-height: 1.5; }
.card--horizontal { display: flex; }
.card--horizontal .card__img { width: 200px; aspect-ratio: auto; }`,
  },
  {
    id: "comp-forms",
    title: "Forms",
    overview: "Style form inputs, textareas, selects, and validation states with proper focus, error, and disabled styles.",
    concepts: ["Forms", "Focus", "Validation", "States"],
    starterCode: `<label class="form-label">Email</label>
<input type="email" class="form-input" placeholder="you@example.com" />
<label class="form-label">Message</label>
<textarea class="form-input" rows="3"></textarea>`,
    solution: `.form-label { display: block; margin-bottom: 0.4rem; font-weight: 600; color: #1e293b; font-size: 0.9rem; }
.form-input {
  width: 100%;
  padding: 0.7rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}
.form-input:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.15); outline: none; }
.form-input:user-invalid { border-color: #ef4444; }
.form-input:disabled { background: #f1f5f9; color: #94a3b8; }
textarea.form-input { resize: vertical; min-height: 100px; }`,
  },
  {
    id: "comp-modals",
    title: "Modals",
    overview: "Build an accessible modal dialog with backdrop overlay, close button, animations, and proper z-index layering.",
    concepts: ["Positioning", "Z-Index", "Transitions", "Backdrop"],
    starterCode: `<div class="modal-overlay">
  <div class="modal">
    <button class="modal__close">&times;</button>
    <h2 class="modal__title">Modal</h2>
    <p class="modal__text">Content goes here.</p>
    <button class="modal__action">Confirm</button>
  </div>
</div>`,
    solution: `.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.5); backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000; opacity: 0; pointer-events: none;
  transition: opacity 0.3s;
}
.modal-overlay.open { opacity: 1; pointer-events: auto; }
.modal {
  background: white; padding: 2rem; border-radius: 16px;
  max-width: 400px; width: 90%; position: relative;
  transform: scale(0.95); transition: transform 0.3s;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}
.modal-overlay.open .modal { transform: scale(1); }
.modal__close {
  position: absolute; top: 0.75rem; right: 0.75rem;
  width: 32px; height: 32px; border-radius: 50%;
  border: none; background: #f1f5f9; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
} `,
  },
  {
    id: "comp-tooltips",
    title: "Tooltips",
    overview: "Create CSS-only tooltips using pseudo-elements, positioning, and hover states.",
    concepts: ["Pseudo Elements", "Positioning", "Hover", "Transitions"],
    starterCode: `<span class="tooltip" data-tip="I'm a tooltip!">Hover me</span>`,
    solution: `.tooltip {
  position: relative;
  cursor: help;
  border-bottom: 1px dashed #6366f1;
}
.tooltip::after {
  content: attr(data-tip);
  position: absolute;
  bottom: 120%; left: 50%;
  transform: translateX(-50%);
  background: #1e293b; color: white;
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  font-size: 0.8rem;
  white-space: nowrap;
  opacity: 0; pointer-events: none;
  transition: opacity 0.2s, transform 0.2s;
}
.tooltip:hover::after { opacity: 1; }
.tooltip::before {
  content: "";
  position: absolute;
  bottom: 110%; left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: #1e293b;
  opacity: 0; transition: opacity 0.2s;
}
.tooltip:hover::before { opacity: 1; }`,
  },
  {
    id: "comp-dropdowns",
    title: "Dropdowns",
    overview: "Build a CSS dropdown menu that appears on hover, with proper positioning and smooth transitions.",
    concepts: ["Positioning", "Hover", "Transitions", "Z-Index"],
    starterCode: `<nav class="dropdown-nav">
  <div class="dropdown">
    <button class="dropdown__trigger">Menu</button>
    <div class="dropdown__menu">
      <a href="#">Item 1</a>
      <a href="#">Item 2</a>
      <a href="#">Item 3</a>
    </div>
  </div>
</nav>`,
    solution: `.dropdown-nav { font-family: system-ui, sans-serif; }
.dropdown { position: relative; display: inline-block; }
.dropdown__trigger {
  padding: 0.5rem 1rem; background: #6366f1; color: white;
  border: none; border-radius: 6px; cursor: pointer;
}
.dropdown__menu {
  position: absolute; top: 100%; left: 0; margin-top: 4px;
  background: white; border: 1px solid #e2e8f0;
  border-radius: 8px; box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  padding: 0.4rem; min-width: 180px;
  opacity: 0; pointer-events: none;
  transform: translateY(-4px); transition: all 0.2s;
  z-index: 100;
}
.dropdown:hover .dropdown__menu { opacity: 1; pointer-events: auto; transform: translateY(0); }
.dropdown__menu a {
  display: block; padding: 0.5rem 0.75rem;
  color: #1e293b; text-decoration: none; border-radius: 4px;
  font-size: 0.9rem;
}
.dropdown__menu a:hover { background: #f1f5f9; color: #6366f1; }`,
  },
  {
    id: "comp-tabs",
    title: "Tabs",
    overview: "Create a tabbed interface with active tab styling, borders, and hover states.",
    concepts: ["Flexbox", "Borders", "States", "Typography"],
    starterCode: `<div class="tabs">
  <button class="tab active">Tab 1</button>
  <button class="tab">Tab 2</button>
  <button class="tab">Tab 3</button>
</div>`,
    solution: `.tabs {
  display: flex;
  border-bottom: 2px solid #e2e8f0;
  gap: 0;
  font-family: system-ui, sans-serif;
}
.tab {
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  color: #64748b;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
}
.tab:hover { color: #6366f1; }
.tab.active {
  color: #6366f1;
  border-bottom-color: #6366f1;
  font-weight: 600;
}
.tab:focus-visible { outline: 2px solid #6366f1; outline-offset: -2px; border-radius: 4px; }`,
  },
  {
    id: "comp-accordions",
    title: "Accordions",
    overview: "Style an accordion component using <details>/<summary> elements with smooth open/close transitions.",
    concepts: ["Details/Summary", "Transitions", "Pseudo Elements", "Rotate"],
    starterCode: `<details class="accordion" name="faq">
  <summary class="accordion__summary">Question 1</summary>
  <p class="accordion__content">Answer 1</p>
</details>
<details class="accordion" name="faq">
  <summary class="accordion__summary">Question 2</summary>
  <p class="accordion__content">Answer 2</p>
</details>`,
    solution: `.accordion {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  overflow: hidden;
  font-family: system-ui, sans-serif;
}
.accordion__summary {
  padding: 0.75rem 1rem;
  background: #f8fafc;
  cursor: pointer;
  font-weight: 600;
  color: #1e293b;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.accordion__summary::-webkit-details-marker { display: none; }
.accordion__summary::after {
  content: "+";
  font-size: 1.25rem;
  color: #6366f1;
  transition: transform 0.2s;
}
.accordion[open] .accordion__summary::after {
  content: "−";
}
.accordion__content {
  padding: 1rem;
  margin: 0;
  color: #64748b;
  border-top: 1px solid #e2e8f0;
} `,
  },
  {
    id: "comp-navigation",
    title: "Navigation Menus",
    overview: "Build a responsive navigation bar with logo, links, hover effects, and mobile hamburger menu.",
    concepts: ["Flexbox", "Responsive", "Media Queries", "Hover"],
    starterCode: `<nav class="navbar">
  <div class="navbar__brand">Logo</div>
  <div class="navbar__links">
    <a href="#">Home</a>
    <a href="#">About</a>
    <a href="#">Services</a>
    <a href="#">Contact</a>
  </div>
</nav>`,
    solution: `.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  font-family: system-ui, sans-serif;
}
.navbar__brand { font-weight: 700; font-size: 1.25rem; color: #0f172a; }
.navbar__links { display: flex; gap: 1.5rem; }
.navbar__links a {
  text-decoration: none;
  color: #64748b;
  font-weight: 500;
  padding: 0.25rem 0;
  position: relative;
  transition: color 0.2s;
}
.navbar__links a::after {
  content: "";
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 2px; background: #6366f1;
  transform: scaleX(0); transition: transform 0.2s;
}
.navbar__links a:hover { color: #6366f1; }
.navbar__links a:hover::after { transform: scaleX(1); }
@media (max-width: 640px) {
  .navbar__links { display: none; }
} `,
  },
  {
    id: "comp-data-tables",
    title: "Data Tables",
    overview: "Style a data table with striped rows, hover effects, sticky header, and responsive scroll.",
    concepts: ["Table", "Pseudo Classes", "Overflow", "Z-Index"],
    starterCode: `<div class="table-wrap">
<table class="table">
  <thead>
    <tr><th>Name</th><th>Role</th><th>Status</th></tr>
  </thead>
  <tbody>
    <tr><td>Alice</td><td>Admin</td><td>Active</td></tr>
    <tr><td>Bob</td><td>Editor</td><td>Inactive</td></tr>
    <tr><td>Charlie</td><td>Viewer</td><td>Active</td></tr>
  </tbody>
</table>
</div>`,
    solution: `.table-wrap { overflow-x: auto; border-radius: 8px; border: 1px solid #e2e8f0; font-family: system-ui, sans-serif; }
.table { width: 100%; border-collapse: collapse; }
.table th {
  background: #f8fafc; padding: 0.75rem 1rem;
  text-align: left; font-weight: 600; color: #0f172a;
  border-bottom: 2px solid #e2e8f0;
  position: sticky; top: 0; z-index: 1;
}
.table td { padding: 0.75rem 1rem; border-bottom: 1px solid #f1f5f9; color: #475569; }
.table tbody tr:nth-child(odd) td { background: #fafbfc; }
.table tbody tr:hover td { background: #eef2ff; }
.table td:first-child { font-weight: 600; }`,
  },
];
