# Angular Phase 1: Fundamentals — Complete Guide

> **Mentor's Note:** This guide is written as if I'm sitting next to you, explaining everything from scratch. Every concept starts with a simple real-world analogy, then the technical explanation, then code. Read it top to bottom and don't skip sections — each one builds on the previous.

---

## Table of Contents

1. [Introduction to Angular](#1-introduction-to-angular)
2. [Development Environment Setup](#2-development-environment-setup)
3. [TypeScript Fundamentals for Angular](#3-typescript-fundamentals-for-angular)
4. [Angular Core Concepts](#4-angular-core-concepts)
5. [Data Binding](#5-data-binding)
6. [Directives](#6-directives)
7. [Pipes](#7-pipes)
8. [Assignments](#8-assignments)
9. [Interview Questions & Answers](#9-interview-questions--answers)

---

# 1. Introduction to Angular

## 1.1 What is Angular?

### Simple Words First 🟡
Imagine you want to build a house. You could start from scratch — dig the foundation, make the bricks, mix cement. OR you could use a **pre-built construction kit** that gives you ready-made walls, windows, doors, and instructions on how they all connect.

**Angular is that pre-built construction kit — but for building web applications.**

### Technical Definition
Angular is an **open-source, TypeScript-based front-end web application framework** developed and maintained by Google. It provides a complete solution for building large-scale, maintainable, and high-performance single-page applications (SPAs).

- **Framework** (not just a library): Angular gives you the full structure — routing, forms, HTTP calls, testing — all in one place.
- **TypeScript-based**: Angular is written in TypeScript and encourages you to write TypeScript too (more on TypeScript later).
- **Component-based**: Your entire UI is split into small, reusable building blocks called **Components**.

---

## 1.2 Why Angular Exists

### Simple Words First 🟡
In the early days of the web, websites were simple pages. But as the web grew, developers started building complex **applications** (like Gmail, Google Maps, online banking) that needed to:
- Update the screen without refreshing the page
- Manage lots of user data
- Have many developers work together without stepping on each other's code

Without a framework, this was **chaos**. Developers invented their own patterns, and projects became impossible to maintain.

**Angular was created to bring order to that chaos.**

### The Core "Whys"

| Problem Without Angular | How Angular Solves It |
|--------------------------|----------------------|
| No standard structure | Opinionated folder structure & CLI |
| Tangled HTML + JavaScript | Component architecture separates concerns |
| DOM manipulation spaghetti | Declarative templates + data binding |
| No code reuse | Components, Services, Pipes are all reusable |
| Hard to test | Dependency injection makes testing easy |
| Team collaboration issues | Modules let teams work in isolation |

---

## 1.3 Problems Angular Solves

### 1. DOM Manipulation Complexity
**Without Angular:**
```javascript
// You had to manually find elements and update them
document.getElementById('username').innerText = 'John';
document.getElementById('email').innerText = 'john@email.com';
// Imagine doing this for 100 fields...
```

**With Angular:**
```html
<!-- Template just "shows" data automatically -->
<p>{{ username }}</p>
<p>{{ email }}</p>
```
Angular updates the DOM automatically when your data changes. You never touch `getElementById` again.

### 2. State Management
Keeping the UI in sync with data is hard. Angular's two-way binding ensures the UI and the data are always in sync.

### 3. Code Organization
Angular forces a structure: every feature is a Module, every UI piece is a Component, every shared logic is a Service.

### 4. Routing (Navigation without page reload)
Clicking links in a traditional website reloads the entire page. Angular's Router navigates between "pages" without any reload — it just swaps the component on screen.

### 5. Forms Handling
Angular provides powerful form validation, real-time feedback, and easy data collection built-in.

---

## 1.4 History of Angular

```
Timeline of Angular
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

2010 ──► AngularJS (Angular 1.x) released by Google
         • JavaScript-based
         • Two-way data binding was revolutionary
         • Used $scope for data
         • Became hugely popular

2016 ──► Angular 2 released (COMPLETE rewrite!)
         • TypeScript-based
         • Component-based architecture
         • Much faster performance
         • NOT backward compatible with AngularJS

2017 ──► Angular 4 (skipped version 3 to align with router version)
         • Smaller bundles, faster compilation

2018 ──► Angular 6, 7
         • Angular CLI improvements, Angular Elements

2019 ──► Angular 8, 9
         • Ivy renderer introduced (much faster)

2020 ──► Angular 10, 11
         • Strict mode, better tooling

2021 ──► Angular 12, 13
         • Ivy is default, View Engine removed

2022 ──► Angular 14
         • Standalone components introduced

2023 ──► Angular 15, 16
         • Signals (reactive state management)

2024 ──► Angular 17+
         • New @if, @for block syntax
         • Signals are stable

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

> **Key Insight:** Angular follows a **6-month release cycle**. Major version numbers go up, but **no more breaking changes** like the AngularJS → Angular 2 jump. Each version is an incremental improvement.

---

## 1.5 AngularJS vs Angular

This is one of the most common points of confusion for beginners. Let me make it crystal clear.

> **Think of it this way:** AngularJS and Angular are like a horse-drawn carriage vs a Tesla. Same purpose (transportation), completely different technology and design.

```
┌─────────────────────────────────────────────────────────────────┐
│               AngularJS vs Angular Comparison                    │
├─────────────────────┬───────────────────┬───────────────────────┤
│ Feature             │ AngularJS (1.x)   │ Angular (2+)          │
├─────────────────────┼───────────────────┼───────────────────────┤
│ Language            │ JavaScript        │ TypeScript            │
│ Architecture        │ MVC               │ Component-based       │
│ Data Binding        │ $scope based      │ @Input/@Output        │
│ Mobile Support      │ Not great         │ Mobile-first          │
│ Performance         │ Slower (digest)   │ Fast (Ivy renderer)   │
│ Learning Curve      │ Moderate          │ Steeper initially     │
│ SEO                 │ Hard              │ SSR with Angular      │
│ DI System           │ Basic             │ Hierarchical, powerful│
│ CLI                 │ No official CLI   │ Powerful Angular CLI  │
│ Maintenance         │ End-of-life 2022  │ Actively maintained   │
└─────────────────────┴───────────────────┴───────────────────────┘
```

**Important naming convention:**
- Say **"AngularJS"** when referring to version 1.x
- Say **"Angular"** when referring to version 2 and above

---

## 1.6 Angular Architecture Overview

### Simple Words First 🟡
Imagine a **large company building**:
- The **building itself** is your Angular Application
- Each **floor** is a **Module** (a section of features)
- Each **room** is a **Component** (a specific UI piece)
- The **intercom system** is the **Service** (shared logic between rooms)
- The **hallways** are the **Router** (navigation between rooms)
- The **electrical wiring** is **Dependency Injection** (connecting services to components automatically)

```svg
<svg viewBox="0 0 800 520" xmlns="http://www.w3.org/2000/svg" font-family="Arial, sans-serif">
  <!-- Background -->
  <rect width="800" height="520" fill="#0f172a" rx="12"/>

  <!-- Title -->
  <text x="400" y="38" text-anchor="middle" fill="#e2e8f0" font-size="20" font-weight="bold">Angular Application Architecture</text>

  <!-- AppModule box -->
  <rect x="40" y="60" width="720" height="420" rx="10" fill="#1e293b" stroke="#3b82f6" stroke-width="2" stroke-dasharray="8,4"/>
  <text x="400" y="88" text-anchor="middle" fill="#3b82f6" font-size="14" font-weight="bold">AppModule (Root Module)</text>

  <!-- Router box -->
  <rect x="60" y="100" width="680" height="50" rx="8" fill="#1d4ed8" opacity="0.3" stroke="#3b82f6" stroke-width="1"/>
  <text x="400" y="131" text-anchor="middle" fill="#93c5fd" font-size="13">🔀 Angular Router — Manages Navigation Between Views</text>

  <!-- Feature Modules row -->
  <text x="400" y="175" text-anchor="middle" fill="#94a3b8" font-size="12">Feature Modules</text>

  <!-- Module 1 -->
  <rect x="60" y="185" width="200" height="170" rx="8" fill="#14532d" stroke="#22c55e" stroke-width="1.5"/>
  <text x="160" y="208" text-anchor="middle" fill="#86efac" font-size="12" font-weight="bold">UserModule</text>

  <rect x="75" y="218" width="170" height="40" rx="5" fill="#166534" stroke="#4ade80" stroke-width="1"/>
  <text x="160" y="243" text-anchor="middle" fill="#dcfce7" font-size="11">UserListComponent</text>

  <rect x="75" y="266" width="170" height="40" rx="5" fill="#166534" stroke="#4ade80" stroke-width="1"/>
  <text x="160" y="291" text-anchor="middle" fill="#dcfce7" font-size="11">UserDetailComponent</text>

  <rect x="75" y="314" width="170" height="30" rx="5" fill="#065f46" stroke="#34d399" stroke-width="1"/>
  <text x="160" y="334" text-anchor="middle" fill="#a7f3d0" font-size="11">UserService</text>

  <!-- Module 2 -->
  <rect x="300" y="185" width="200" height="170" rx="8" fill="#4c1d95" stroke="#a855f7" stroke-width="1.5"/>
  <text x="400" y="208" text-anchor="middle" fill="#d8b4fe" font-size="12" font-weight="bold">ProductModule</text>

  <rect x="315" y="218" width="170" height="40" rx="5" fill="#5b21b6" stroke="#c084fc" stroke-width="1"/>
  <text x="400" y="243" text-anchor="middle" fill="#ede9fe" font-size="11">ProductListComponent</text>

  <rect x="315" y="266" width="170" height="40" rx="5" fill="#5b21b6" stroke="#c084fc" stroke-width="1"/>
  <text x="400" y="291" text-anchor="middle" fill="#ede9fe" font-size="11">ProductCardComponent</text>

  <rect x="315" y="314" width="170" height="30" rx="5" fill="#3b0764" stroke="#e879f9" stroke-width="1"/>
  <text x="400" y="334" text-anchor="middle" fill="#f5d0fe" font-size="11">ProductService</text>

  <!-- Module 3 -->
  <rect x="540" y="185" width="200" height="170" rx="8" fill="#7c2d12" stroke="#f97316" stroke-width="1.5"/>
  <text x="640" y="208" text-anchor="middle" fill="#fed7aa" font-size="12" font-weight="bold">OrderModule</text>

  <rect x="555" y="218" width="170" height="40" rx="5" fill="#9a3412" stroke="#fb923c" stroke-width="1"/>
  <text x="640" y="243" text-anchor="middle" fill="#ffedd5" font-size="11">OrderFormComponent</text>

  <rect x="555" y="266" width="170" height="40" rx="5" fill="#9a3412" stroke="#fb923c" stroke-width="1"/>
  <text x="640" y="291" text-anchor="middle" fill="#ffedd5" font-size="11">OrderHistoryComponent</text>

  <rect x="555" y="314" width="170" height="30" rx="5" fill="#7c2d12" stroke="#fdba74" stroke-width="1"/>
  <text x="640" y="334" text-anchor="middle" fill="#ffe4c4" font-size="11">OrderService</text>

  <!-- Shared Services layer -->
  <rect x="60" y="375" width="680" height="50" rx="8" fill="#1e3a5f" stroke="#60a5fa" stroke-width="1.5"/>
  <text x="400" y="394" text-anchor="middle" fill="#93c5fd" font-size="12" font-weight="bold">Shared Services (Available Globally)</text>
  <text x="200" y="414" text-anchor="middle" fill="#bfdbfe" font-size="11">HttpClient</text>
  <text x="400" y="414" text-anchor="middle" fill="#bfdbfe" font-size="11">AuthService</text>
  <text x="600" y="414" text-anchor="middle" fill="#bfdbfe" font-size="11">LoggingService</text>

  <!-- AppComponent at bottom -->
  <rect x="60" y="440" width="680" height="30" rx="6" fill="#374151" stroke="#9ca3af" stroke-width="1"/>
  <text x="400" y="460" text-anchor="middle" fill="#f3f4f6" font-size="12">AppComponent — The Root Component (&lt;app-root&gt;)</text>

  <!-- Legend -->
  <rect x="60" y="490" width="12" height="12" fill="#22c55e" rx="2"/>
  <text x="78" y="501" fill="#94a3b8" font-size="10">Module</text>
  <rect x="130" y="490" width="12" height="12" fill="#3b82f6" rx="2"/>
  <text x="148" y="501" fill="#94a3b8" font-size="10">Component</text>
  <rect x="215" y="490" width="12" height="12" fill="#065f46" rx="2"/>
  <text x="233" y="501" fill="#94a3b8" font-size="10">Service</text>
  <rect x="280" y="490" width="12" height="12" fill="#1d4ed8" rx="2"/>
  <text x="298" y="501" fill="#94a3b8" font-size="10">Router</text>
</svg>
```

### The 5 Core Building Blocks of Angular

| Block | Simple Analogy | Purpose |
|-------|---------------|---------|
| **Module** | Floor of a building | Groups related features together |
| **Component** | A room | Controls a piece of the UI |
| **Template** | The room's interior design | The HTML view of the component |
| **Service** | A utility company | Shared business logic (API calls, data) |
| **Dependency Injection** | Automatic service delivery | Angular delivers services to components automatically |

---

## 1.7 SPA vs MPA

### Simple Words First 🟡

**Multi-Page Application (MPA):** Imagine a physical newspaper. Every time you want a different story, you have to go pick up a **completely new newspaper** (page reload).

**Single-Page Application (SPA):** Imagine a **TV remote**. The screen (your browser) stays the same. You press a button, and the content on screen changes instantly — no turning off and on the TV.

```svg
<svg viewBox="0 0 800 380" xmlns="http://www.w3.org/2000/svg" font-family="Arial, sans-serif">
  <rect width="800" height="380" fill="#0f172a" rx="12"/>

  <!-- Title -->
  <text x="400" y="32" text-anchor="middle" fill="#e2e8f0" font-size="18" font-weight="bold">SPA vs MPA — How They Work</text>

  <!-- MPA Side -->
  <text x="190" y="65" text-anchor="middle" fill="#f87171" font-size="15" font-weight="bold">Multi-Page Application (MPA)</text>

  <!-- MPA User -->
  <circle cx="60" cy="130" r="22" fill="#374151" stroke="#9ca3af" stroke-width="2"/>
  <text x="60" y="136" text-anchor="middle" fill="#e2e8f0" font-size="20">👤</text>
  <text x="60" y="165" text-anchor="middle" fill="#9ca3af" font-size="10">User</text>

  <!-- Arrow 1 MPA -->
  <line x1="85" y1="130" x2="130" y2="130" stroke="#9ca3af" stroke-width="1.5" marker-end="url(#arrow)"/>
  <text x="108" y="123" text-anchor="middle" fill="#f87171" font-size="9">Click Link</text>

  <!-- Server box MPA -->
  <rect x="130" y="105" width="90" height="50" rx="6" fill="#1f2937" stroke="#ef4444" stroke-width="1.5"/>
  <text x="175" y="133" text-anchor="middle" fill="#fca5a5" font-size="11">Server</text>
  <text x="175" y="147" text-anchor="middle" fill="#9ca3af" font-size="9">Full HTML</text>

  <!-- Arrow 2 MPA -->
  <line x1="220" y1="130" x2="265" y2="130" stroke="#9ca3af" stroke-width="1.5" marker-end="url(#arrow)"/>
  <text x="243" y="123" text-anchor="middle" fill="#f87171" font-size="9">Full page</text>

  <!-- Browser MPA -->
  <rect x="265" y="95" width="100" height="70" rx="6" fill="#1f2937" stroke="#ef4444" stroke-width="1.5"/>
  <text x="315" y="120" text-anchor="middle" fill="#fca5a5" font-size="10">Browser</text>
  <rect x="275" y="128" width="80" height="8" rx="2" fill="#374151"/>
  <rect x="275" y="140" width="80" height="8" rx="2" fill="#374151"/>
  <rect x="275" y="152" width="60" height="8" rx="2" fill="#374151"/>

  <!-- Flash/Reload indicator -->
  <text x="315" y="182" text-anchor="middle" fill="#ef4444" font-size="11">⚠️ Full Page Reload!</text>
  <text x="315" y="198" text-anchor="middle" fill="#9ca3af" font-size="9">User sees white flash</text>

  <!-- Requests flow for MPA -->
  <text x="190" y="230" text-anchor="middle" fill="#9ca3af" font-size="10">Every navigation = New HTTP Request + Full HTML</text>

  <!-- Steps MPA -->
  <rect x="55" y="250" width="280" height="95" rx="6" fill="#1c1917" stroke="#ef4444" stroke-width="1"/>
  <text x="75" y="270" fill="#fca5a5" font-size="10">1. User clicks link → browser requests /about</text>
  <text x="75" y="288" fill="#fca5a5" font-size="10">2. Server generates full HTML for /about</text>
  <text x="75" y="306" fill="#fca5a5" font-size="10">3. Browser downloads ALL HTML, CSS, JS again</text>
  <text x="75" y="324" fill="#fca5a5" font-size="10">4. Page reloads completely (white flash)</text>
  <text x="75" y="342" fill="#9ca3af" font-size="10">Result: Slow navigation, poor UX</text>

  <!-- Divider -->
  <line x1="400" y1="55" x2="400" y2="360" stroke="#475569" stroke-width="1" stroke-dasharray="5,3"/>

  <!-- SPA Side -->
  <text x="600" y="65" text-anchor="middle" fill="#4ade80" font-size="15" font-weight="bold">Single-Page Application (SPA)</text>

  <!-- SPA User -->
  <circle cx="440" cy="130" r="22" fill="#374151" stroke="#9ca3af" stroke-width="2"/>
  <text x="440" y="136" text-anchor="middle" fill="#e2e8f0" font-size="20">👤</text>
  <text x="440" y="165" text-anchor="middle" fill="#9ca3af" font-size="10">User</text>

  <!-- Arrow 1 SPA -->
  <line x1="465" y1="130" x2="510" y2="130" stroke="#9ca3af" stroke-width="1.5" marker-end="url(#arrow)"/>
  <text x="488" y="123" text-anchor="middle" fill="#4ade80" font-size="9">Click Link</text>

  <!-- Angular Router box -->
  <rect x="510" y="105" width="90" height="50" rx="6" fill="#1f2937" stroke="#22c55e" stroke-width="1.5"/>
  <text x="555" y="128" text-anchor="middle" fill="#86efac" font-size="10">Angular</text>
  <text x="555" y="142" text-anchor="middle" fill="#86efac" font-size="10">Router</text>

  <!-- Arrow 2 SPA -->
  <line x1="600" y1="130" x2="645" y2="130" stroke="#9ca3af" stroke-width="1.5" marker-end="url(#arrow)"/>
  <text x="623" y="123" text-anchor="middle" fill="#4ade80" font-size="9">Swap view</text>

  <!-- Browser SPA -->
  <rect x="645" y="95" width="110" height="70" rx="6" fill="#1f2937" stroke="#22c55e" stroke-width="1.5"/>
  <text x="700" y="118" text-anchor="middle" fill="#86efac" font-size="10">Same Page</text>
  <rect x="655" y="124" width="40" height="32" rx="2" fill="#374151"/>
  <rect x="703" y="124" width="44" height="32" rx="2" fill="#22c55e" opacity="0.4"/>
  <text x="725" y="144" text-anchor="middle" fill="#dcfce7" font-size="9">New View</text>

  <!-- Smooth indicator -->
  <text x="700" y="182" text-anchor="middle" fill="#22c55e" font-size="11">✅ Instant! No Reload</text>
  <text x="700" y="198" text-anchor="middle" fill="#9ca3af" font-size="9">Smooth like a native app</text>

  <!-- Steps SPA -->
  <rect x="430" y="250" width="330" height="95" rx="6" fill="#0f1f12" stroke="#22c55e" stroke-width="1"/>
  <text x="450" y="270" fill="#86efac" font-size="10">1. App loads ONCE (HTML + JS bundle)</text>
  <text x="450" y="288" fill="#86efac" font-size="10">2. User clicks link → Router intercepts</text>
  <text x="450" y="306" fill="#86efac" font-size="10">3. Angular swaps the Component on screen</text>
  <text x="450" y="324" fill="#86efac" font-size="10">4. Only data is fetched (small JSON)</text>
  <text x="450" y="342" fill="#9ca3af" font-size="10">Result: Fast, app-like experience</text>

  <!-- Arrow defs -->
  <defs>
    <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#9ca3af"/>
    </marker>
  </defs>
</svg>
```

### When to Use SPA vs MPA?

| Use SPA (Angular) | Use MPA |
|-------------------|---------|
| Web apps (Gmail, dashboards) | Simple blogs/news sites |
| Apps with lots of user interaction | SEO-critical content sites |
| Rich, dynamic UIs | Sites needing fast initial load |
| Apps feeling like mobile apps | Simple brochure websites |

---

# 2. Development Environment Setup

## 2.1 Node.js

### Simple Words First 🟡
JavaScript was originally designed to only run **inside browsers**. Node.js is like a **power outlet** that lets JavaScript run on your computer (outside the browser). Angular CLI, our project creation tool, needs Node.js to run.

### What is Node.js?
Node.js is a **JavaScript runtime** built on Chrome's V8 engine. It allows you to run JavaScript on your machine, making it possible for tools like the Angular CLI to exist.

### Installation
1. Go to [https://nodejs.org](https://nodejs.org)
2. Download the **LTS (Long-Term Support)** version — always use LTS for stability
3. Install it like any regular software
4. Verify installation:

```bash
# Check Node.js version
node --version
# Expected output: v18.x.x or v20.x.x (LTS)

# Check npm version (comes with Node.js)
npm --version
# Expected output: 9.x.x or 10.x.x
```

> **Recommended:** Use [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm) to manage multiple Node.js versions on your machine.

---

## 2.2 npm (Node Package Manager)

### Simple Words First 🟡
Think of npm as the **App Store for JavaScript code**. When Angular needs a library (e.g., a date-formatting tool), you don't write it from scratch — you install it from npm in one command.

### Key npm Commands

```bash
# Install a package (adds to your project)
npm install package-name

# Install a package globally (available system-wide)
npm install -g package-name

# Install all packages listed in package.json
npm install

# View installed packages
npm list

# Update a package
npm update package-name
```

### package.json — The Project's Recipe Card
When you create an Angular project, a `package.json` file is created. It lists all the packages your project needs — like a recipe listing all ingredients.

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "start": "ng serve",           // Run development server
    "build": "ng build",           // Build for production
    "test": "ng test"              // Run tests
  },
  "dependencies": {
    "@angular/core": "^17.0.0",   // Angular itself (production)
    "rxjs": "~7.8.0"
  },
  "devDependencies": {
    "@angular/cli": "^17.0.0",    // Tools only needed during development
    "typescript": "~5.2.0"
  }
}
```

---

## 2.3 Angular CLI

### Simple Words First 🟡
The Angular CLI (Command Line Interface) is like a **magic wand**. Instead of manually creating 15 files to make one component, you type one command and it does everything for you.

### Installation

```bash
# Install Angular CLI globally (do this once on your machine)
npm install -g @angular/cli

# Verify installation
ng version
```

### Most Used CLI Commands

```bash
# Create a new project
ng new my-app

# Start the development server (with live reload)
ng serve

# Generate a new component
ng generate component user-list
# Shorthand:
ng g c user-list

# Generate a service
ng g s user

# Generate a module
ng g m users

# Build for production
ng build --configuration production

# Run tests
ng test

# Get help
ng help
```

---

## 2.4 VS Code Setup

### Recommended Extensions for Angular Development

| Extension | Why You Need It |
|-----------|----------------|
| **Angular Language Service** | Autocomplete and error checking in HTML templates |
| **ESLint** | Catches code style problems |
| **Prettier** | Auto-formats your code |
| **Auto Rename Tag** | Renames both opening/closing HTML tags together |
| **Bracket Pair Colorizer** | Colors matching brackets |
| **GitLens** | See Git history inline |
| **Thunder Client** | Test APIs inside VS Code |

### Useful VS Code Settings for Angular

Create/edit `.vscode/settings.json` in your project:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "files.autoSave": "onFocusChange",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

---

## 2.5 Creating Your First Project

```bash
# Create a new Angular project
ng new my-first-app

# CLI will ask you:
# ? Would you like to add Angular routing? (Y/n) → Type Y
# ? Which stylesheet format would you like to use? → Select CSS

# Navigate into the project folder
cd my-first-app

# Start the development server
ng serve

# Now open your browser and go to:
# http://localhost:4200
```

You should see the default Angular welcome page. 🎉

---

## 2.6 Project Structure Explanation

```
my-first-app/
├── src/                            ← All your application source code
│   ├── app/                        ← Your Angular application lives here
│   │   ├── app.component.ts        ← Root component (TypeScript logic)
│   │   ├── app.component.html      ← Root component (HTML template)
│   │   ├── app.component.css       ← Root component (styles)
│   │   ├── app.component.spec.ts   ← Root component (unit tests)
│   │   └── app.module.ts           ← Root module (registers everything)
│   ├── assets/                     ← Static files (images, fonts, etc.)
│   ├── environments/               ← Environment configs (dev vs prod)
│   │   ├── environment.ts          ← Development settings
│   │   └── environment.prod.ts     ← Production settings
│   ├── index.html                  ← The ONE HTML page of your SPA
│   ├── main.ts                     ← Entry point — bootstraps Angular
│   └── styles.css                  ← Global styles
├── angular.json                    ← Angular CLI configuration
├── package.json                    ← Project dependencies
├── tsconfig.json                   ← TypeScript configuration
└── README.md                       ← Project documentation
```

### Let's Understand the Key Files

**`index.html`** — The one and only HTML page:
```html
<!DOCTYPE html>
<html>
  <head>
    <title>My First App</title>
  </head>
  <body>
    <!-- Angular replaces this tag with your app's content -->
    <app-root></app-root>
  </body>
</html>
```

**`main.ts`** — Where Angular starts:
```typescript
// This bootstraps (starts) the Angular application
// It tells Angular: "Start with AppModule as the root"
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
```

**`app.module.ts`** — The root module:
```typescript
@NgModule({
  declarations: [AppComponent],   // Components in this module
  imports: [BrowserModule],       // Other modules needed
  providers: [],                  // Services available app-wide
  bootstrap: [AppComponent]       // Which component to show first
})
export class AppModule { }
```

---

# 3. TypeScript Fundamentals for Angular

## Why TypeScript?

### Simple Words First 🟡
Imagine building a house. With regular JavaScript, it's like working without labels — you pick up a box but don't know if it contains nails or screws until you open it. TypeScript puts **labels on every box** — you always know what type of thing you're working with before you even open the box.

TypeScript is JavaScript with **type safety** — it catches errors at development time, before the app even runs.

---

## 3.1 Variables

### `var`, `let`, and `const`

```typescript
// ❌ NEVER use 'var' in Angular (old way, has scoping bugs)
var oldWay = "don't use me";

// ✅ Use 'let' for values that WILL change
let userAge: number = 25;
userAge = 26;  // This is fine, value changed

// ✅ Use 'const' for values that will NOT change
const appName: string = "My Angular App";
// appName = "Other App";  // ❌ ERROR! const cannot be reassigned

// TypeScript Type Annotations (the colon : syntax)
let userName: string = "Alice";    // Must be a string
let isLoggedIn: boolean = false;   // Must be true/false
let score: number = 100;           // Must be a number

// TypeScript can INFER types (you don't always need to write the type)
let city = "Mumbai";               // TypeScript knows this is a string
let count = 42;                    // TypeScript knows this is a number
```

> **Best Practice:** In Angular, always use `const` by default. Use `let` only when you know the value will change. Never use `var`.

---

## 3.2 Data Types

```typescript
// ──── Primitive Types ────

// String: Text data
let firstName: string = "Rahul";
let greeting: string = `Hello, ${firstName}!`;   // Template literals

// Number: All numbers (integer and decimal)
let age: number = 28;
let price: number = 99.99;
let hex: number = 0xff;

// Boolean: True or false
let isActive: boolean = true;
let hasPermission: boolean = false;

// ──── Special Types ────

// null: Intentionally no value
let selectedUser: string | null = null;   // Can be string OR null

// undefined: Variable declared but not assigned
let pendingData: string | undefined;      // Will be set later

// any: Disables type checking (AVOID in Angular!)
let dangerous: any = "string";
dangerous = 42;      // TypeScript won't catch this type change
dangerous = true;    // Anything goes — dangerous!

// unknown: Safer version of 'any'
let safeAny: unknown = "hello";
if (typeof safeAny === "string") {
  console.log(safeAny.toUpperCase()); // Must check type first
}

// void: Function returns nothing
function logMessage(msg: string): void {
  console.log(msg);
  // no return value
}

// never: Function never returns (throws or infinite loop)
function throwError(message: string): never {
  throw new Error(message);
}

// ──── Union Types ────
// A variable can hold multiple types
let id: string | number;
id = "abc123";   // Valid
id = 12345;      // Also valid

// ──── Type Alias ────
// Create your own type name
type UserId = string | number;
let myId: UserId = "user_001";
```

---

## 3.3 Functions

```typescript
// ──── Basic Function ────
function add(a: number, b: number): number {
  return a + b;
}
const result = add(5, 3);  // result is 8

// ──── Arrow Function (used EVERYWHERE in Angular) ────
const multiply = (a: number, b: number): number => a * b;
const greet = (name: string): string => `Hello, ${name}!`;

// ──── Optional Parameters (use ?) ────
function createUser(name: string, age?: number): string {
  if (age) {
    return `${name} is ${age} years old`;
  }
  return `Name: ${name}`;
}
createUser("Sara");          // Valid — age is optional
createUser("Sara", 25);      // Also valid

// ──── Default Parameters ────
function discount(price: number, percent: number = 10): number {
  return price - (price * percent / 100);
}
discount(100);      // Uses default 10% → returns 90
discount(100, 20);  // Uses 20% → returns 80

// ──── Rest Parameters (variable number of arguments) ────
function sumAll(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}
sumAll(1, 2, 3, 4, 5);  // returns 15

// ──── Function Overloads ────
// Same function name, different parameter types
function format(value: string): string;
function format(value: number): string;
function format(value: string | number): string {
  return `Formatted: ${value}`;
}
```

---

## 3.4 Arrays

```typescript
// ──── Typed Arrays ────
let fruits: string[] = ["apple", "mango", "banana"];
let scores: number[] = [85, 92, 78, 95];

// Alternative syntax
let users: Array<string> = ["Alice", "Bob", "Charlie"];

// ──── Common Array Methods (used constantly in Angular) ────

// map: Transform each item → returns new array
const doubled = scores.map(score => score * 2);
// [170, 184, 156, 190]

// filter: Keep only items that pass a test → returns new array
const highScores = scores.filter(score => score > 80);
// [85, 92, 95]

// find: Get the first item that matches
const firstHigh = scores.find(score => score > 90);
// 92

// forEach: Loop through items (no return value)
fruits.forEach(fruit => console.log(fruit));

// some: Returns true if ANY item passes the test
const hasHighScore = scores.some(score => score > 90);
// true

// every: Returns true if ALL items pass the test
const allPassed = scores.every(score => score > 50);
// true

// reduce: Combine all items into one value
const total = scores.reduce((sum, score) => sum + score, 0);
// 350

// includes: Check if array contains a value
const hasMango = fruits.includes("mango");
// true

// Spread operator (common in Angular state management)
const newFruits = [...fruits, "grape"];
// Creates new array: ["apple", "mango", "banana", "grape"]
```

---

## 3.5 Objects

```typescript
// ──── Basic Object ────
const user = {
  name: "Priya",
  age: 30,
  email: "priya@email.com"
};

// Access properties
console.log(user.name);         // Dot notation
console.log(user["age"]);       // Bracket notation

// ──── Typed Object ────
const product: { name: string; price: number; inStock: boolean } = {
  name: "Laptop",
  price: 75000,
  inStock: true
};

// ──── Destructuring (very common in Angular) ────
const { name, age } = user;       // Extract properties to variables
console.log(name);                 // "Priya"
console.log(age);                  // 30

// Rename during destructuring
const { name: userName, age: userAge } = user;

// ──── Spread Operator with Objects ────
const updatedUser = { ...user, age: 31 };
// Creates new object: { name: "Priya", age: 31, email: "priya@email.com" }

// ──── Optional Chaining ?. (very useful in Angular) ────
const address = user?.address?.city;
// If user.address doesn't exist, returns undefined instead of throwing error

// ──── Nullish Coalescing ?? ────
const city = user?.address?.city ?? "Unknown City";
// If result is null/undefined, use "Unknown City"
```

---

## 3.6 Interfaces

### Simple Words First 🟡
An interface is like a **contract** or a **blueprint**. It says: "If you want to be a User, you MUST have these specific properties." It doesn't create an actual object — it just describes the shape of one.

```typescript
// Define the "shape" of a User object
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;           // Optional property (notice the ?)
  readonly createdAt: Date;  // Cannot be changed after creation
}

// Any object assigned to User type MUST match this shape
const newUser: User = {
  id: 1,
  name: "Arjun",
  email: "arjun@email.com",
  createdAt: new Date()
};

// ──── Interface with Methods ────
interface Product {
  name: string;
  price: number;
  getDiscountedPrice(percent: number): number;  // Method signature
}

// ──── Extending Interfaces (inheritance) ────
interface Animal {
  name: string;
  sound(): void;
}

interface Dog extends Animal {
  breed: string;   // Dog has everything Animal has + breed
}

const myDog: Dog = {
  name: "Tommy",
  breed: "Labrador",
  sound() { console.log("Woof!"); }
};

// ──── Why Interfaces Matter in Angular ────
// In Angular, you ALWAYS define interfaces for data from APIs
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface UserProfile {
  id: number;
  username: string;
  avatar: string;
  joinDate: string;
}

// When you get user from API, TypeScript knows exactly what's in it
function loadUser(response: ApiResponse<UserProfile>): void {
  console.log(response.data.username);  // TypeScript autocompletes this!
}
```

---

## 3.7 Classes

### Simple Words First 🟡
A class is a **cookie cutter**. You define it once — the shape, size, decorations. Then you use it to make as many cookies (objects) as you want, each identical in structure but with different actual values.

```typescript
// Define the class (the cookie cutter)
class Animal {
  // Properties
  name: string;
  sound: string;

  // Constructor: runs when you create a new object
  constructor(name: string, sound: string) {
    this.name = name;
    this.sound = sound;
  }

  // Method: a function belonging to the class
  speak(): string {
    return `${this.name} says ${this.sound}`;
  }
}

// Create instances (the actual cookies)
const cat = new Animal("Cat", "Meow");
const dog = new Animal("Dog", "Woof");

console.log(cat.speak());  // "Cat says Meow"
console.log(dog.speak());  // "Dog says Woof"

// ──── Inheritance ────
class Dog extends Animal {
  breed: string;

  constructor(name: string, breed: string) {
    super(name, "Woof");   // Call parent class constructor
    this.breed = breed;
  }

  fetch(): string {
    return `${this.name} the ${this.breed} is fetching!`;
  }
}

const labrador = new Dog("Buddy", "Labrador");
console.log(labrador.speak());   // "Buddy says Woof" (inherited)
console.log(labrador.fetch());   // "Buddy the Labrador is fetching!"
```

---

## 3.8 Access Modifiers

### Simple Words First 🟡
Access modifiers are like the **security level of a room**:
- **public** = Anyone can enter (default)
- **private** = Only people inside this room can access it
- **protected** = This room and children rooms (subclasses) can access it

```typescript
class BankAccount {
  public accountHolder: string;    // Anyone can read/write
  private balance: number;         // Only this class can access
  protected bankName: string;      // This class and subclasses

  constructor(holder: string, initialBalance: number) {
    this.accountHolder = holder;
    this.balance = initialBalance;
    this.bankName = "State Bank";
  }

  // Public method to safely access private balance
  public getBalance(): number {
    return this.balance;
  }

  // Public method to modify private balance with validation
  public deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
      console.log(`Deposited ₹${amount}. New balance: ₹${this.balance}`);
    }
  }
}

const account = new BankAccount("Rohit", 10000);
account.accountHolder = "Rohit Kumar";  // ✅ Public — can change
// account.balance = 99999;             // ❌ Error! Private — cannot access directly
account.deposit(5000);                  // ✅ Using the public method
console.log(account.getBalance());      // ✅ Using the public getter

// ──── Shorthand Constructor (Angular uses this!) ────
class UserService {
  constructor(
    private apiUrl: string,         // Creates AND assigns private property
    public readonly version: string // Creates AND assigns public readonly property
  ) {}
}
```

---

## 3.9 Generics

### Simple Words First 🟡
A generic is like a **box that adapts to whatever you put inside it**. You define "a box" once, and when you use it, you tell TypeScript what type of thing will go inside. One definition, infinite type-safe uses.

```typescript
// Without Generics — we need separate functions for each type
function getFirstString(arr: string[]): string { return arr[0]; }
function getFirstNumber(arr: number[]): number { return arr[0]; }

// With Generics — one function works for ALL types!
// T is a "placeholder" for whatever type you use it with
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

const firstString = getFirst<string>(["a", "b", "c"]);  // returns "a"
const firstNumber = getFirst<number>([10, 20, 30]);       // returns 10

// ──── Generic Interface (very common in Angular HTTP calls) ────
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: Date;
}

interface User { id: number; name: string; }
interface Product { id: number; name: string; price: number; }

// TypeScript knows exactly what 'data' contains
const userResponse: ApiResponse<User> = {
  data: { id: 1, name: "Alice" },
  status: 200,
  message: "Success",
  timestamp: new Date()
};

const productResponse: ApiResponse<Product> = {
  data: { id: 1, name: "Laptop", price: 75000 },
  status: 200,
  message: "Success",
  timestamp: new Date()
};

// ──── Generic Class ────
class DataStore<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  getAll(): T[] {
    return this.items;
  }
}

const stringStore = new DataStore<string>();
stringStore.add("hello");
// stringStore.add(123);  // ❌ Error! Only strings allowed

const numberStore = new DataStore<number>();
numberStore.add(42);
```

---

## 3.10 Decorators

### Simple Words First 🟡
Decorators are like **name tags or badges** you put on a class or function to give it **extra powers**. When Angular sees `@Component`, it says "Oh! This class is a Component. Let me give it all the Component powers."

```typescript
// Decorators start with @
// They are applied immediately ABOVE what they're decorating

// ──── @Component ────
// Tells Angular: "This class controls a piece of the UI"
@Component({
  selector: 'app-user',        // HTML tag: <app-user></app-user>
  templateUrl: './user.html',  // The HTML file
  styleUrls: ['./user.css']    // The CSS file
})
class UserComponent {
  // Component logic here
}

// ──── @Injectable ────
// Tells Angular: "This class is a service that can be injected"
@Injectable({
  providedIn: 'root'  // Available everywhere in the app
})
class UserService {
  // Service logic here
}

// ──── @Input ────
// Marks a property as "receivable from a parent component"
class ChildComponent {
  @Input() username: string = '';  // Parent passes this in
}

// ──── @Output ────
// Marks a property as an "event emitter to the parent"
class ChildComponent {
  @Output() userClicked = new EventEmitter<string>();
}

// ──── Property Decorator Example ────
// Custom decorator that logs property changes
function Log(target: any, key: string) {
  let value = target[key];
  Object.defineProperty(target, key, {
    get: () => value,
    set: (newVal) => {
      console.log(`${key} changed from ${value} to ${newVal}`);
      value = newVal;
    }
  });
}

class Example {
  @Log
  title: string = 'Initial';
}
```

---

## 3.11 Promises & Async/Await

### Simple Words First 🟡
When you order food at a restaurant, the waiter doesn't make you stand at the kitchen window waiting. They give you a **receipt (a Promise)** and say "I'll bring it when it's ready." You can do other things. When it's ready, they bring it to you.

**Promise** = "I promise to give you a result eventually — it will either succeed (resolve) or fail (reject)."

**async/await** = Sugar-coating that makes Promises look like regular code.

```typescript
// ──── Promise Basics ────
const fetchData = new Promise<string>((resolve, reject) => {
  // Simulate an async operation (like an HTTP call)
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve("Data loaded successfully!");  // Success
    } else {
      reject("Failed to load data");         // Failure
    }
  }, 2000);
});

// Using .then() and .catch()
fetchData
  .then(data => console.log(data))      // Runs on success
  .catch(error => console.error(error)) // Runs on failure
  .finally(() => console.log("Done"));  // Always runs

// ──── async/await (the modern way, used in Angular services) ────

// Mark function as 'async' to use 'await' inside it
async function loadUserData(userId: number): Promise<User> {
  try {
    // 'await' pauses HERE until the Promise resolves
    // Code reads like synchronous, but IS asynchronous
    const response = await fetch(`/api/users/${userId}`);
    const user = await response.json();
    return user;
  } catch (error) {
    // If anything goes wrong, catch it here
    console.error("Failed to load user:", error);
    throw error;  // Re-throw so caller knows about the error
  }
}

// ──── In Angular Service (real-world usage) ────
@Injectable({ providedIn: 'root' })
class UserService {
  constructor(private http: HttpClient) {}

  // Returns an Observable (Angular's preferred async method)
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }

  // Or with async/await using firstValueFrom
  async getUserById(id: number): Promise<User> {
    return await firstValueFrom(
      this.http.get<User>(`/api/users/${id}`)
    );
  }
}
```

> **Angular Tip:** Angular actually prefers **Observables** (from RxJS) over Promises for HTTP calls. But Promises and async/await are still used in many places. We'll cover Observables in Phase 2.

---

# 4. Angular Core Concepts

## 4.1 Components

### Simple Words First 🟡
A component is like a **LEGO brick**. Each brick is self-contained — it has its own shape, color, and connector. You combine bricks to build something big. In Angular, each component controls one piece of the UI, and you combine them to build the whole app.

```
A typical web page broken into components:

┌─────────────────────────────────────┐
│  <app-root>                         │
│  ┌───────────────────────────────┐  │
│  │  <app-header>                 │  │
│  │    Logo | Nav | Search        │  │
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │  <app-sidebar>                │  │
│  │    Menu items                 │  │
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │  <app-product-list>           │  │
│  │  ┌────────┐  ┌────────┐       │  │
│  │  │<app-   │  │<app-   │       │  │
│  │  │product │  │product │       │  │
│  │  │-card>  │  │-card>  │       │  │
│  │  └────────┘  └────────┘       │  │
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │  <app-footer>                 │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

### Anatomy of a Component

A Component always has **3 parts** (usually split into separate files):

```typescript
// user-card.component.ts — The Component class (LOGIC)
@Component({
  selector: 'app-user-card',            // 1. The HTML tag
  templateUrl: './user-card.component.html',  // 2. The HTML template
  styleUrls: ['./user-card.component.css']    // 3. The CSS styles
})
export class UserCardComponent {
  // Properties = Data
  userName: string = 'Alice';
  userAge: number = 28;
  isActive: boolean = true;

  // Methods = Behavior
  greetUser(): string {
    return `Hello, ${this.userName}!`;
  }

  toggleActive(): void {
    this.isActive = !this.isActive;
  }
}
```

```html
<!-- user-card.component.html — The Template (VIEW) -->
<div class="user-card">
  <h2>{{ userName }}</h2>          <!-- Show the userName property -->
  <p>Age: {{ userAge }}</p>
  <p>Status: {{ isActive ? 'Active' : 'Inactive' }}</p>
  <button (click)="toggleActive()">Toggle Status</button>
</div>
```

```css
/* user-card.component.css — The Styles (LOOK) */
/* These styles ONLY apply to THIS component — no leaking! */
.user-card {
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 8px;
}
```

### Generating a Component with CLI

```bash
# Creates 4 files automatically
ng generate component user-card

# Output:
# CREATE src/app/user-card/user-card.component.html
# CREATE src/app/user-card/user-card.component.ts
# CREATE src/app/user-card/user-card.component.css
# CREATE src/app/user-card/user-card.component.spec.ts
# UPDATE src/app/app.module.ts (adds to declarations)
```

### Component Lifecycle Hooks

```typescript
@Component({ ... })
export class UserCardComponent implements OnInit, OnDestroy {

  // Called ONCE after component is created
  ngOnInit(): void {
    console.log("Component is ready! Load data here.");
    this.loadUserData();  // ← Fetch data from API here
  }

  // Called when component is removed from DOM
  ngOnDestroy(): void {
    console.log("Component is destroyed. Clean up here.");
    // Cancel subscriptions, clear timers here
  }

  // Called when @Input values change
  ngOnChanges(changes: SimpleChanges): void {
    console.log("Input data changed:", changes);
  }

  // Called after view is initialized
  ngAfterViewInit(): void {
    console.log("Template is rendered. Access DOM here.");
  }
}
```

---

## 4.2 Templates

### Simple Words First 🟡
A template is the **HTML face** of your component. But it's not plain HTML — it's **super-powered HTML** with Angular-specific syntax that can display dynamic data, react to events, and conditionally show/hide things.

```html
<!-- Plain HTML does this: -->
<h1>Hello, World!</h1>

<!-- Angular Template does this: -->
<h1>Hello, {{ currentUser.name }}!</h1>   ← Shows REAL data from component
<p *ngIf="currentUser.isActive">✅ Active</p>  ← Conditional rendering
<li *ngFor="let item of items">{{ item }}</li>  ← Loops
<input [(ngModel)]="searchTerm">               ← Two-way binding
<button (click)="handleClick()">Click</button> ← Event handling
```

### Inline Template vs External Template File

```typescript
// Option 1: Inline Template (for SMALL components)
@Component({
  selector: 'app-badge',
  template: `
    <span class="badge">{{ label }}</span>
  `,
  styles: [`
    .badge { background: blue; color: white; padding: 4px 8px; }
  `]
})
export class BadgeComponent {
  label = 'New';
}

// Option 2: External Files (PREFERRED for most components)
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent { }
```

---

## 4.3 Modules

### Simple Words First 🟡
A module is like a **department in a company**. The HR Department has its own people, tools, and rules — it's self-contained. The IT Department is the same. They work independently but can share resources when needed.

In Angular, a Module groups related components, services, and pipes together.

```typescript
// users/users.module.ts
@NgModule({
  declarations: [            // ← Components/Directives/Pipes IN this module
    UserListComponent,
    UserDetailComponent,
    UserCardComponent,
    UserAvatarPipe
  ],
  imports: [                 // ← Other modules this module NEEDS
    CommonModule,            // ngIf, ngFor etc.
    FormsModule,             // ngModel (two-way binding)
    HttpClientModule,        // HTTP requests
    RouterModule             // Routing
  ],
  providers: [               // ← Services available in this module
    UserService
  ],
  exports: [                 // ← Components/Directives available to OTHER modules
    UserListComponent,
    UserCardComponent        // Other modules can use this after importing UsersModule
  ]
})
export class UsersModule { }
```

### The Root Module (AppModule)

```typescript
// app.module.ts — The MAIN module that ties everything together
@NgModule({
  declarations: [
    AppComponent       // Root component MUST be here
  ],
  imports: [
    BrowserModule,     // Required for browser apps (replaces CommonModule in root)
    UsersModule,       // Our custom feature module
    ProductsModule
  ],
  providers: [
    AuthService        // App-wide service
  ],
  bootstrap: [AppComponent]  // ← The FIRST component Angular renders
})
export class AppModule { }
```

---

## 4.4 Metadata & Decorators

Metadata is the **configuration object** you pass to a decorator. It tells Angular how to use the class.

```typescript
// @Component decorator with METADATA object
@Component({
  // ── Required ──
  selector: 'app-user',          // The HTML tag name

  // ── Template: choose ONE ──
  template: '<h1>Inline</h1>',   // Option A: Inline HTML
  templateUrl: './user.html',    // Option B: External file (preferred)

  // ── Styles: choose ONE ──
  styles: ['.red { color: red; }'], // Option A: Inline CSS
  styleUrls: ['./user.css'],        // Option B: External file (preferred)

  // ── Change Detection ──
  changeDetection: ChangeDetectionStrategy.OnPush,  // Performance optimization

  // ── View Encapsulation ──
  encapsulation: ViewEncapsulation.Emulated,  // Default: CSS scoped to component
})
export class UserComponent { }

// @NgModule decorator with METADATA object
@NgModule({
  declarations: [...],
  imports: [...],
  providers: [...],
  exports: [...],
  bootstrap: [...]
})
export class AppModule { }
```

---

## 4.5 Selectors

A selector is the **name you use in HTML** to place your component. Angular uses CSS selector syntax.

```typescript
// ── Type 1: Element Selector (most common) ──
@Component({ selector: 'app-user-card' })
// Used as: <app-user-card></app-user-card>

// ── Type 2: Attribute Selector ──
@Component({ selector: '[appHighlight]' })
// Used as: <div appHighlight></div>

// ── Type 3: Class Selector ──
@Component({ selector: '.app-card' })
// Used as: <div class="app-card"></div>
```

> **Best Practice:** Always use **element selectors** for components. Use **attribute selectors** for directives.

---

## 4.6 Bootstrap Process

### The Angular Startup Sequence (Step by Step)

```svg
<svg viewBox="0 0 700 480" xmlns="http://www.w3.org/2000/svg" font-family="Arial, sans-serif">
  <rect width="700" height="480" fill="#0f172a" rx="12"/>
  <text x="350" y="32" text-anchor="middle" fill="#e2e8f0" font-size="17" font-weight="bold">Angular Bootstrap Process</text>

  <!-- Step 1 -->
  <rect x="40" y="55" width="620" height="55" rx="8" fill="#1e3a5f" stroke="#3b82f6" stroke-width="1.5"/>
  <circle cx="75" cy="82" r="16" fill="#3b82f6"/>
  <text x="75" y="87" text-anchor="middle" fill="white" font-size="14" font-weight="bold">1</text>
  <text x="110" y="77" fill="#93c5fd" font-size="13" font-weight="bold">Browser loads index.html</text>
  <text x="110" y="97" fill="#bfdbfe" font-size="11">Browser receives the single HTML file. It contains &lt;app-root&gt;&lt;/app-root&gt;</text>

  <!-- Arrow -->
  <line x1="350" y1="110" x2="350" y2="135" stroke="#475569" stroke-width="2" marker-end="url(#arr)"/>

  <!-- Step 2 -->
  <rect x="40" y="135" width="620" height="55" rx="8" fill="#14532d" stroke="#22c55e" stroke-width="1.5"/>
  <circle cx="75" cy="162" r="16" fill="#22c55e"/>
  <text x="75" y="167" text-anchor="middle" fill="white" font-size="14" font-weight="bold">2</text>
  <text x="110" y="157" fill="#86efac" font-size="13" font-weight="bold">main.ts executes</text>
  <text x="110" y="177" fill="#a7f3d0" font-size="11">platformBrowserDynamic().bootstrapModule(AppModule) is called</text>

  <!-- Arrow -->
  <line x1="350" y1="190" x2="350" y2="215" stroke="#475569" stroke-width="2" marker-end="url(#arr)"/>

  <!-- Step 3 -->
  <rect x="40" y="215" width="620" height="55" rx="8" fill="#4c1d95" stroke="#a855f7" stroke-width="1.5"/>
  <circle cx="75" cy="242" r="16" fill="#a855f7"/>
  <text x="75" y="247" text-anchor="middle" fill="white" font-size="14" font-weight="bold">3</text>
  <text x="110" y="237" fill="#d8b4fe" font-size="13" font-weight="bold">AppModule is analyzed</text>
  <text x="110" y="257" fill="#ede9fe" font-size="11">Angular reads declarations, imports, providers from @NgModule metadata</text>

  <!-- Arrow -->
  <line x1="350" y1="270" x2="350" y2="295" stroke="#475569" stroke-width="2" marker-end="url(#arr)"/>

  <!-- Step 4 -->
  <rect x="40" y="295" width="620" height="55" rx="8" fill="#7c2d12" stroke="#f97316" stroke-width="1.5"/>
  <circle cx="75" cy="322" r="16" fill="#f97316"/>
  <text x="75" y="327" text-anchor="middle" fill="white" font-size="14" font-weight="bold">4</text>
  <text x="110" y="317" fill="#fed7aa" font-size="13" font-weight="bold">AppComponent is created</text>
  <text x="110" y="337" fill="#ffedd5" font-size="11">Angular instantiates the bootstrap component defined in AppModule</text>

  <!-- Arrow -->
  <line x1="350" y1="350" x2="350" y2="375" stroke="#475569" stroke-width="2" marker-end="url(#arr)"/>

  <!-- Step 5 -->
  <rect x="40" y="375" width="620" height="55" rx="8" fill="#1f2937" stroke="#f59e0b" stroke-width="1.5"/>
  <circle cx="75" cy="402" r="16" fill="#f59e0b"/>
  <text x="75" y="407" text-anchor="middle" fill="white" font-size="14" font-weight="bold">5</text>
  <text x="110" y="397" fill="#fde68a" font-size="13" font-weight="bold">DOM is updated — App is visible!</text>
  <text x="110" y="417" fill="#fef3c7" font-size="11">Angular replaces &lt;app-root&gt; with AppComponent's template. User sees the app.</text>

  <!-- Arrow defs -->
  <defs>
    <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#475569"/>
    </marker>
  </defs>
</svg>
```

---

# 5. Data Binding

### Simple Words First 🟡
Data binding is the **bridge** between your component (where data lives) and the template (where data is displayed). Think of it like a **TV remote connected to a TV** — when you press a button on the remote (component), the TV screen (template) changes.

Angular has **4 types** of data binding.

```svg
<svg viewBox="0 0 780 340" xmlns="http://www.w3.org/2000/svg" font-family="Arial, sans-serif">
  <rect width="780" height="340" fill="#0f172a" rx="12"/>
  <text x="390" y="30" text-anchor="middle" fill="#e2e8f0" font-size="17" font-weight="bold">Data Binding — How Data Flows</text>

  <!-- Component Box -->
  <rect x="40" y="55" width="220" height="250" rx="10" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
  <text x="150" y="85" text-anchor="middle" fill="#93c5fd" font-size="14" font-weight="bold">Component</text>
  <text x="150" y="105" text-anchor="middle" fill="#64748b" font-size="11">(TypeScript Logic)</text>

  <rect x="60" y="120" width="180" height="30" rx="5" fill="#1e3a5f" stroke="#60a5fa" stroke-width="1"/>
  <text x="150" y="140" text-anchor="middle" fill="#bfdbfe" font-size="11">title = "Hello World"</text>

  <rect x="60" y="165" width="180" height="30" rx="5" fill="#1e3a5f" stroke="#60a5fa" stroke-width="1"/>
  <text x="150" y="185" text-anchor="middle" fill="#bfdbfe" font-size="11">isVisible = true</text>

  <rect x="60" y="210" width="180" height="30" rx="5" fill="#1e3a5f" stroke="#60a5fa" stroke-width="1"/>
  <text x="150" y="230" text-anchor="middle" fill="#bfdbfe" font-size="11">handleClick()</text>

  <rect x="60" y="255" width="180" height="30" rx="5" fill="#1e3a5f" stroke="#60a5fa" stroke-width="1"/>
  <text x="150" y="275" text-anchor="middle" fill="#bfdbfe" font-size="11">searchTerm = ""</text>

  <!-- Template Box -->
  <rect x="520" y="55" width="220" height="250" rx="10" fill="#1e293b" stroke="#22c55e" stroke-width="2"/>
  <text x="630" y="85" text-anchor="middle" fill="#86efac" font-size="14" font-weight="bold">Template</text>
  <text x="630" y="105" text-anchor="middle" fill="#64748b" font-size="11">(HTML View)</text>

  <rect x="540" y="120" width="180" height="30" rx="5" fill="#0f1f12" stroke="#4ade80" stroke-width="1"/>
  <text x="630" y="140" text-anchor="middle" fill="#dcfce7" font-size="11">{{ "{{" }} title {{ "}}" }}</text>

  <rect x="540" y="165" width="180" height="30" rx="5" fill="#0f1f12" stroke="#4ade80" stroke-width="1"/>
  <text x="630" y="185" text-anchor="middle" fill="#dcfce7" font-size="11">[hidden]="!isVisible"</text>

  <rect x="540" y="210" width="180" height="30" rx="5" fill="#0f1f12" stroke="#4ade80" stroke-width="1"/>
  <text x="630" y="230" text-anchor="middle" fill="#dcfce7" font-size="11">(click)="handleClick()"</text>

  <rect x="540" y="255" width="180" height="30" rx="5" fill="#0f1f12" stroke="#4ade80" stroke-width="1"/>
  <text x="630" y="275" text-anchor="middle" fill="#dcfce7" font-size="11">[(ngModel)]="searchTerm"</text>

  <!-- Arrow 1: Interpolation (→) -->
  <line x1="262" y1="135" x2="538" y2="135" stroke="#f59e0b" stroke-width="2" marker-end="url(#a1)"/>
  <text x="400" y="128" text-anchor="middle" fill="#fde68a" font-size="10" font-weight="bold">Interpolation {{ "{{}}" }}</text>

  <!-- Arrow 2: Property Binding (→) -->
  <line x1="262" y1="180" x2="538" y2="180" stroke="#a78bfa" stroke-width="2" marker-end="url(#a2)"/>
  <text x="400" y="173" text-anchor="middle" fill="#c4b5fd" font-size="10" font-weight="bold">Property Binding [ ]</text>

  <!-- Arrow 3: Event Binding (←) -->
  <line x1="538" y1="225" x2="262" y2="225" stroke="#f87171" stroke-width="2" marker-end="url(#a3)"/>
  <text x="400" y="218" text-anchor="middle" fill="#fca5a5" font-size="10" font-weight="bold">Event Binding ( )</text>

  <!-- Arrow 4: Two-way (↔) -->
  <line x1="262" y1="270" x2="538" y2="270" stroke="#34d399" stroke-width="2" marker-end="url(#a4)"/>
  <line x1="538" y1="278" x2="262" y2="278" stroke="#34d399" stroke-width="2" marker-end="url(#a5)"/>
  <text x="400" y="263" text-anchor="middle" fill="#a7f3d0" font-size="10" font-weight="bold">Two-Way Binding [( )]</text>

  <!-- User Box -->
  <rect x="320" y="295" width="140" height="35" rx="8" fill="#374151" stroke="#9ca3af" stroke-width="1.5"/>
  <text x="390" y="318" text-anchor="middle" fill="#e2e8f0" font-size="12">👤 User</text>

  <!-- Arrow defs -->
  <defs>
    <marker id="a1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#f59e0b"/>
    </marker>
    <marker id="a2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#a78bfa"/>
    </marker>
    <marker id="a3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#f87171"/>
    </marker>
    <marker id="a4" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#34d399"/>
    </marker>
    <marker id="a5" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#34d399"/>
    </marker>
  </defs>
</svg>
```

---

## 5.1 Interpolation `{{ }}`

**Direction:** Component → Template (ONE-WAY)
**Purpose:** Display component data as text in the template

```typescript
// component.ts
export class GreetingComponent {
  firstName: string = "Ananya";
  lastName: string = "Sharma";
  age: number = 25;
  score: number = 8.567;
  items: string[] = ["a", "b", "c"];
  today: Date = new Date();
  isAdmin: boolean = true;
}
```

```html
<!-- component.html -->

<!-- Basic property display -->
<h1>Hello, {{ firstName }}!</h1>
<!-- Output: Hello, Ananya! -->

<!-- Expression: full name -->
<p>Full Name: {{ firstName + ' ' + lastName }}</p>
<!-- Output: Full Name: Ananya Sharma -->

<!-- Math expression -->
<p>Next year age: {{ age + 1 }}</p>
<!-- Output: Next year age: 26 -->

<!-- Method call -->
<p>Today: {{ today.toLocaleDateString() }}</p>

<!-- Ternary operator -->
<p>Role: {{ isAdmin ? 'Administrator' : 'Regular User' }}</p>

<!-- Array length -->
<p>Total items: {{ items.length }}</p>

<!-- ❌ What you CANNOT do in interpolation: -->
<!-- No assignments: {{ age = 30 }} -->
<!-- No new keyword: {{ new Date() }} -->
<!-- No statements: {{ if(isAdmin) {} }} -->
```

---

## 5.2 Property Binding `[ ]`

**Direction:** Component → Template (ONE-WAY)
**Purpose:** Bind a component property to an **HTML element property** (not attribute!)

```typescript
export class PropertyBindingComponent {
  imageUrl: string = "https://example.com/photo.jpg";
  imageAlt: string = "User Photo";
  isButtonDisabled: boolean = false;
  inputPlaceholder: string = "Enter your name...";
  linkUrl: string = "https://angular.io";
  dynamicClass: string = "highlight";
  dynamicStyle: string = "red";
}
```

```html
<!-- Property Binding uses square brackets [ ] -->

<!-- Bind 'src' property of <img> element -->
<img [src]="imageUrl" [alt]="imageAlt">

<!-- Bind 'disabled' property of <button> -->
<button [disabled]="isButtonDisabled">Submit</button>
<!-- When isButtonDisabled = true → button is disabled -->

<!-- Bind 'placeholder' property of <input> -->
<input [placeholder]="inputPlaceholder">

<!-- Bind 'href' property of <a> tag -->
<a [href]="linkUrl">Angular Website</a>

<!-- Class binding -->
<div [class]="dynamicClass">Styled text</div>

<!-- Style binding -->
<p [style.color]="dynamicStyle">This text is red</p>

<!-- ⚠️ Interpolation vs Property Binding -->
<img src="{{ imageUrl }}">    <!-- Interpolation: Works for src -->
<img [src]="imageUrl">       <!-- Property binding: Preferred! -->

<!-- When MUST you use Property Binding (not interpolation)? -->
<button [disabled]="isButtonDisabled">  <!-- disabled is boolean -->
<!-- <button disabled="{{ isButtonDisabled }}">  ← WRONG! -->
<!-- This would set disabled="false" as a STRING, and the button stays disabled! -->
```

---

## 5.3 Event Binding `( )`

**Direction:** Template → Component (ONE-WAY)
**Purpose:** Listen to user actions (clicks, key presses, mouse events) and call component methods

```typescript
export class EventBindingComponent {
  clickCount: number = 0;
  lastKey: string = '';
  mousePosition: string = '';

  // Method called when button is clicked
  handleClick(): void {
    this.clickCount++;
    console.log("Button clicked! Count:", this.clickCount);
  }

  // $event contains the actual DOM event object
  handleKeyUp(event: KeyboardEvent): void {
    this.lastKey = event.key;
    console.log("Key pressed:", event.key);
  }

  handleMouseMove(event: MouseEvent): void {
    this.mousePosition = `X: ${event.clientX}, Y: ${event.clientY}`;
  }

  // Template reference variable (#inputRef) to access input value
  submitForm(value: string): void {
    console.log("Submitted:", value);
  }
}
```

```html
<!-- Event binding uses parentheses ( ) -->

<!-- Click event -->
<button (click)="handleClick()">
  Clicked {{ clickCount }} times
</button>

<!-- Keyboard events — $event is the browser event object -->
<input (keyup)="handleKeyUp($event)"
       (keydown)="handleKeyDown($event)"
       placeholder="Type here">
<p>Last key: {{ lastKey }}</p>

<!-- Mouse events -->
<div (mousemove)="handleMouseMove($event)" class="mouse-area">
  Move mouse here: {{ mousePosition }}
</div>

<!-- Using template reference variable (#) to get input value -->
<input #nameInput placeholder="Enter name">
<button (click)="submitForm(nameInput.value)">Submit</button>
<!-- #nameInput gives us a reference to the input element -->

<!-- Focus / Blur events -->
<input (focus)="onFocus()" (blur)="onBlur()" placeholder="Focus me">

<!-- Input change -->
<select (change)="onSelectChange($event)">
  <option value="a">Option A</option>
  <option value="b">Option B</option>
</select>
```

---

## 5.4 Two-Way Binding `[( )]`

**Direction:** Component ↔ Template (BI-DIRECTIONAL)
**Purpose:** Keep component property and input field in sync — when either changes, the other updates automatically

The `[()]` syntax is called "banana in a box" 🍌📦

```typescript
// In app.module.ts, you MUST import FormsModule for ngModel
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [BrowserModule, FormsModule]  // ← Add FormsModule
})
export class AppModule { }
```

```typescript
// component.ts
export class TwoWayBindingComponent {
  // These properties stay in sync with the input fields
  username: string = '';
  email: string = '';
  selectedCountry: string = 'India';
  isSubscribed: boolean = false;
  rating: number = 5;
}
```

```html
<!-- [(ngModel)] is two-way binding -->
<!-- It READS from and WRITES to the component property -->

<!-- Text input -->
<input [(ngModel)]="username" placeholder="Enter username">
<p>Hello, {{ username }}!</p>
<!-- Type in the input → username property updates → paragraph updates instantly -->

<!-- Email input -->
<input type="email" [(ngModel)]="email" placeholder="Enter email">
<p>Your email: {{ email }}</p>

<!-- Dropdown -->
<select [(ngModel)]="selectedCountry">
  <option value="India">India</option>
  <option value="USA">USA</option>
  <option value="UK">UK</option>
</select>
<p>Selected: {{ selectedCountry }}</p>

<!-- Checkbox -->
<input type="checkbox" [(ngModel)]="isSubscribed">
<label>Subscribe to newsletter</label>
<p>Subscribed: {{ isSubscribed }}</p>

<!-- Range slider -->
<input type="range" [(ngModel)]="rating" min="1" max="10">
<p>Rating: {{ rating }}/10</p>

<!-- ── Under the hood, [(ngModel)] expands to: ── -->
<!-- [ngModel]="username" (ngModelChange)="username = $event" -->
<!-- Property binding (reads) + Event binding (writes) -->
```

---

# 6. Directives

### Simple Words First 🟡
A directive is an **instruction tag** you add to an HTML element to tell Angular "do something special with this element." Think of it as a **sticky note on furniture** in a house — the note says "move this to the left" or "paint this red" or "show this only on weekends."

Angular has three types:
1. **Structural Directives** — Change the DOM structure (add/remove elements)
2. **Attribute Directives** — Change the appearance/behavior of elements
3. **Components** — Are technically directives with templates

```svg
<svg viewBox="0 0 760 360" xmlns="http://www.w3.org/2000/svg" font-family="Arial, sans-serif">
  <rect width="760" height="360" fill="#0f172a" rx="12"/>
  <text x="380" y="30" text-anchor="middle" fill="#e2e8f0" font-size="17" font-weight="bold">Types of Angular Directives</text>

  <!-- Component box -->
  <rect x="40" y="50" width="200" height="130" rx="10" fill="#1e3a5f" stroke="#3b82f6" stroke-width="2"/>
  <text x="140" y="75" text-anchor="middle" fill="#93c5fd" font-size="13" font-weight="bold">Components</text>
  <text x="140" y="95" text-anchor="middle" fill="#64748b" font-size="10">Directives with a template</text>
  <rect x="60" y="105" width="160" height="25" rx="4" fill="#0f172a"/>
  <text x="140" y="122" text-anchor="middle" fill="#bfdbfe" font-size="11">&lt;app-user-card&gt;</text>
  <rect x="60" y="135" width="160" height="25" rx="4" fill="#0f172a"/>
  <text x="140" y="152" text-anchor="middle" fill="#bfdbfe" font-size="11">&lt;app-header&gt;</text>

  <!-- Structural box -->
  <rect x="280" y="50" width="200" height="200" rx="10" fill="#14532d" stroke="#22c55e" stroke-width="2"/>
  <text x="380" y="75" text-anchor="middle" fill="#86efac" font-size="13" font-weight="bold">Structural Directives</text>
  <text x="380" y="95" text-anchor="middle" fill="#64748b" font-size="10">Change the DOM structure</text>
  <rect x="300" y="105" width="160" height="25" rx="4" fill="#0f172a"/>
  <text x="380" y="122" text-anchor="middle" fill="#dcfce7" font-size="11">*ngIf — add/remove</text>
  <rect x="300" y="135" width="160" height="25" rx="4" fill="#0f172a"/>
  <text x="380" y="152" text-anchor="middle" fill="#dcfce7" font-size="11">*ngFor — repeat</text>
  <rect x="300" y="165" width="160" height="25" rx="4" fill="#0f172a"/>
  <text x="380" y="182" text-anchor="middle" fill="#dcfce7" font-size="11">*ngSwitch — choose</text>
  <text x="380" y="240" text-anchor="middle" fill="#86efac" font-size="11">Prefix: * (asterisk)</text>

  <!-- Attribute box -->
  <rect x="520" y="50" width="200" height="200" rx="10" fill="#4c1d95" stroke="#a855f7" stroke-width="2"/>
  <text x="620" y="75" text-anchor="middle" fill="#d8b4fe" font-size="13" font-weight="bold">Attribute Directives</text>
  <text x="620" y="95" text-anchor="middle" fill="#64748b" font-size="10">Change look or behavior</text>
  <rect x="540" y="105" width="160" height="25" rx="4" fill="#0f172a"/>
  <text x="620" y="122" text-anchor="middle" fill="#ede9fe" font-size="11">ngClass — add classes</text>
  <rect x="540" y="135" width="160" height="25" rx="4" fill="#0f172a"/>
  <text x="620" y="152" text-anchor="middle" fill="#ede9fe" font-size="11">ngStyle — add styles</text>
  <rect x="540" y="165" width="160" height="25" rx="4" fill="#0f172a"/>
  <text x="620" y="182" text-anchor="middle" fill="#ede9fe" font-size="11">ngModel — two-way bind</text>
  <text x="620" y="240" text-anchor="middle" fill="#d8b4fe" font-size="11">No * prefix</text>

  <!-- Comparison row -->
  <rect x="40" y="270" width="680" height="70" rx="8" fill="#1e293b" stroke="#475569" stroke-width="1"/>
  <text x="380" y="292" text-anchor="middle" fill="#94a3b8" font-size="11" font-weight="bold">Key Difference</text>
  <text x="380" y="312" text-anchor="middle" fill="#64748b" font-size="10">Structural (*) = Adds or REMOVES elements from the DOM</text>
  <text x="380" y="330" text-anchor="middle" fill="#64748b" font-size="10">Attribute = Elements STAY in DOM, only appearance/behavior changes</text>
</svg>
```

---

## 6.1 `*ngIf` — Conditional Rendering

```typescript
export class NgIfExampleComponent {
  isLoggedIn: boolean = false;
  userRole: string = 'admin';
  user: { name: string } | null = { name: 'Alice' };

  toggleLogin(): void {
    this.isLoggedIn = !this.isLoggedIn;
  }
}
```

```html
<!-- Basic ngIf: Show element only if condition is true -->
<div *ngIf="isLoggedIn">
  Welcome back! You are logged in.
</div>

<!-- ngIf with else: Show alternative when false -->
<div *ngIf="isLoggedIn; else loginPrompt">
  <p>You're logged in!</p>
  <button (click)="toggleLogin()">Logout</button>
</div>

<!-- The else template is defined with #templateName -->
<ng-template #loginPrompt>
  <p>Please log in to continue.</p>
  <button (click)="toggleLogin()">Login</button>
</ng-template>

<!-- ngIf with then and else -->
<ng-container *ngIf="isLoggedIn; then loggedInView; else loggedOutView">
</ng-container>
<ng-template #loggedInView><p>Dashboard</p></ng-template>
<ng-template #loggedOutView><p>Login Page</p></ng-template>

<!-- Null checking with ngIf (safe navigation) -->
<div *ngIf="user">
  {{ user.name }}  <!-- Safe! user is guaranteed not null here -->
</div>

<!-- ⚠️ Common Mistake -->
<!-- ngIf REMOVES the element from DOM — it doesn't just hide it! -->
<!-- Use [hidden] to just hide (keep in DOM): -->
<div [hidden]="!isLoggedIn">This is HIDDEN but still in DOM</div>
<div *ngIf="isLoggedIn">This is REMOVED from DOM when false</div>
```

---

## 6.2 `*ngFor` — List Rendering

```typescript
export class NgForExampleComponent {
  users = [
    { id: 1, name: 'Alice', role: 'Admin', active: true },
    { id: 2, name: 'Bob', role: 'User', active: false },
    { id: 3, name: 'Carol', role: 'User', active: true },
    { id: 4, name: 'Dave', role: 'Moderator', active: true }
  ];

  colors: string[] = ['red', 'green', 'blue', 'yellow'];

  // ALWAYS provide this for performance (like 'key' in React)
  trackByUserId(index: number, user: any): number {
    return user.id;
  }
}
```

```html
<!-- Basic ngFor -->
<ul>
  <li *ngFor="let user of users">
    {{ user.name }} — {{ user.role }}
  </li>
</ul>

<!-- ngFor with INDEX -->
<ul>
  <li *ngFor="let user of users; let i = index">
    {{ i + 1 }}. {{ user.name }}
  </li>
</ul>

<!-- All available loop variables -->
<div *ngFor="let user of users;
             let i = index;
             let isFirst = first;
             let isLast = last;
             let isEven = even;
             let isOdd = odd">

  <div [class.highlight]="isEven">
    {{ i }}: {{ user.name }}
    <span *ngIf="isFirst">← FIRST</span>
    <span *ngIf="isLast">← LAST</span>
  </div>
</div>

<!-- trackBy: PERFORMANCE OPTIMIZATION (always use this!) -->
<!-- Without trackBy, Angular re-renders the entire list on ANY change -->
<!-- With trackBy, Angular only updates the items that actually changed -->
<li *ngFor="let user of users; trackBy: trackByUserId">
  {{ user.name }}
</li>

<!-- Nested ngFor -->
<div *ngFor="let dept of departments">
  <h3>{{ dept.name }}</h3>
  <ul>
    <li *ngFor="let emp of dept.employees">{{ emp.name }}</li>
  </ul>
</div>
```

---

## 6.3 `*ngSwitch` — Multiple Conditions

```typescript
export class NgSwitchExampleComponent {
  status: string = 'active';    // Try: 'pending', 'inactive', 'banned'
  dayOfWeek: number = 1;
}
```

```html
<!-- ngSwitch works like a JavaScript switch statement -->
<!-- [ngSwitch] goes on the container, *ngSwitchCase on each option -->

<div [ngSwitch]="status">
  <p *ngSwitchCase="'active'">
    ✅ Account is Active
  </p>
  <p *ngSwitchCase="'pending'">
    ⏳ Account is Pending Verification
  </p>
  <p *ngSwitchCase="'inactive'">
    😴 Account is Inactive
  </p>
  <p *ngSwitchCase="'banned'">
    🚫 Account has been Banned
  </p>
  <p *ngSwitchDefault>
    ❓ Unknown Status: {{ status }}
  </p>
</div>

<!-- ngSwitch with numbers -->
<div [ngSwitch]="dayOfWeek">
  <p *ngSwitchCase="1">Monday — Start of the week!</p>
  <p *ngSwitchCase="5">Friday — TGIF! 🎉</p>
  <p *ngSwitchCase="6">Saturday — Weekend!</p>
  <p *ngSwitchCase="0">Sunday — Rest day!</p>
  <p *ngSwitchDefault>{{ dayOfWeek }} — Regular weekday</p>
</div>
```

---

## 6.4 Attribute Directives: `ngClass` and `ngStyle`

```typescript
export class AttributeDirectivesComponent {
  isHighlighted: boolean = true;
  isError: boolean = false;
  isWarning: boolean = true;
  score: number = 75;

  textColor: string = 'blue';
  fontSize: number = 16;
}
```

```html
<!-- ── ngClass ── -->

<!-- Single class -->
<div [ngClass]="'active'">Always has 'active' class</div>

<!-- Conditional class -->
<div [ngClass]="{'highlighted': isHighlighted}">
  Text is highlighted if isHighlighted is true
</div>

<!-- Multiple conditional classes -->
<div [ngClass]="{
  'error': isError,
  'warning': isWarning,
  'highlight': isHighlighted
}">
  Multiple classes applied conditionally
</div>

<!-- Expression-based class -->
<div [ngClass]="score >= 90 ? 'grade-a' : score >= 70 ? 'grade-b' : 'grade-c'">
  Your grade
</div>

<!-- ── ngStyle ── -->

<!-- Single style -->
<p [ngStyle]="{'color': textColor}">Colored text</p>

<!-- Multiple styles -->
<p [ngStyle]="{
  'color': textColor,
  'font-size': fontSize + 'px',
  'font-weight': isHighlighted ? 'bold' : 'normal'
}">
  Styled text
</p>

<!-- ── Shorthand alternatives ── -->
<!-- [class.className]="condition" — cleanest for single class -->
<div [class.active]="isHighlighted">Active</div>
<div [class.error]="isError">Error</div>

<!-- [style.property]="value" — cleanest for single style -->
<p [style.color]="textColor">Colored</p>
<p [style.fontSize.px]="fontSize">Sized text</p>
```

---

## 6.5 Custom Directives

### Simple Words First 🟡
Built-in directives cover common cases. But what if you want to **highlight text when you hover** over any element, or **auto-format phone numbers** as you type? You create a **Custom Directive** — your own reusable instruction tag!

```bash
# Generate with CLI
ng generate directive highlight
# Creates: src/app/highlight.directive.ts
```

```typescript
// highlight.directive.ts
import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]'  // Applied as an attribute: <p appHighlight>
})
export class HighlightDirective implements OnInit {

  // @Input: Accept configuration from the parent
  @Input() appHighlight: string = 'yellow';    // Highlight color
  @Input() defaultColor: string = 'transparent';

  constructor(private el: ElementRef) {
    // el.nativeElement gives us the actual DOM element
  }

  ngOnInit(): void {
    // Set default background when directive loads
    this.setBackground(this.defaultColor);
  }

  // @HostListener: Listen to events on the host element
  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.setBackground(this.appHighlight || 'yellow');
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.setBackground(this.defaultColor);
  }

  private setBackground(color: string): void {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
```

```html
<!-- Using the custom directive -->

<!-- Basic usage: uses default yellow color -->
<p appHighlight>Hover over me to see yellow highlight!</p>

<!-- Passing a color value -->
<p [appHighlight]="'lightblue'" defaultColor="lightyellow">
  Hover for blue, default is light yellow
</p>

<!-- In a list -->
<li *ngFor="let item of items" [appHighlight]="'lightgreen'">
  {{ item }}
</li>
```

### Another Custom Directive: Click Outside

```typescript
// click-outside.directive.ts
@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {

  @Output() clickOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onClick(event: Event): void {
    // If click target is NOT inside this element → emit event
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.clickOutside.emit();
    }
  }
}
```

```html
<!-- Close dropdown when clicking outside -->
<div appClickOutside (clickOutside)="closeDropdown()">
  <div class="dropdown-menu" *ngIf="isOpen">
    <!-- dropdown content -->
  </div>
</div>
```

---

# 7. Pipes

### Simple Words First 🟡
A pipe is like a **coffee filter**. Raw data goes in (like dirty water), the pipe processes it, and clean output comes out (like filtered water). Pipes transform how data is **displayed** — without changing the actual data in the component.

```
Component Data  ──────► Pipe  ──────► Displayed Value
"hello world"    |pipe  uppercase    "HELLO WORLD"
1234567.89      |pipe  currency:'INR'  "₹12,34,567.89"
2024-01-15      |pipe  date:'longDate'  "January 15, 2024"
```

---

## 7.1 Built-In Pipes

```typescript
export class PipesExampleComponent {
  name: string = "ananya sharma";
  price: number = 1234567.89;
  today: Date = new Date();
  discount: number = 0.25;
  rating: number = 4.789;
  items: string[] = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];
  user = { name: 'Alice', age: 28, city: 'Mumbai' };
}
```

```html
<!-- ── Text Pipes ── -->
<p>Original: {{ name }}</p>
<!-- ananya sharma -->

<p>Uppercase: {{ name | uppercase }}</p>
<!-- ANANYA SHARMA -->

<p>Lowercase: {{ name | lowercase }}</p>
<!-- ananya sharma -->

<p>TitleCase: {{ name | titlecase }}</p>
<!-- Ananya Sharma -->

<!-- ── Number & Currency Pipes ── -->
<p>Number: {{ price | number }}</p>
<!-- 1,234,567.89 -->

<p>Number (2 decimals): {{ price | number:'1.2-2' }}</p>
<!-- 1,234,567.89 -->

<p>Currency (USD): {{ price | currency }}</p>
<!-- $1,234,567.89 -->

<p>Currency (INR): {{ price | currency:'INR':'symbol' }}</p>
<!-- ₹1,234,567.89 -->

<p>Percent: {{ discount | percent }}</p>
<!-- 25% -->

<p>Percent (2 decimals): {{ discount | percent:'1.2-2' }}</p>
<!-- 25.00% -->

<!-- ── Date Pipe ── -->
<p>Default: {{ today | date }}</p>
<!-- Jan 15, 2024 -->

<p>Short: {{ today | date:'short' }}</p>
<!-- 1/15/24, 10:30 AM -->

<p>Long: {{ today | date:'longDate' }}</p>
<!-- January 15, 2024 -->

<p>Custom: {{ today | date:'dd-MM-yyyy HH:mm' }}</p>
<!-- 15-01-2024 10:30 -->

<p>Time only: {{ today | date:'HH:mm:ss' }}</p>

<!-- ── JSON Pipe (great for debugging!) ── -->
<pre>{{ user | json }}</pre>
<!-- {
  "name": "Alice",
  "age": 28,
  "city": "Mumbai"
} -->

<!-- ── Slice Pipe (works on arrays and strings) ── -->
<p>First 3 items: {{ items | slice:0:3 | json }}</p>
<!-- ["Apple", "Banana", "Cherry"] -->

<p>Last 2 items: {{ items | slice:-2 | json }}</p>
<!-- ["Date", "Elderberry"] -->

<!-- ── Chaining Pipes ── -->
<p>{{ name | titlecase | uppercase }}</p>
<!-- ANANYA SHARMA -->

<!-- ── Async Pipe (for Observables and Promises) ── -->
<!-- Automatically subscribes and unsubscribes! -->
<p>{{ userData$ | async }}</p>
<div *ngFor="let user of users$ | async">
  {{ user.name }}
</div>
```

---

## 7.2 Custom Pipes

```bash
# Generate a custom pipe
ng generate pipe shorten
# Creates: src/app/shorten.pipe.ts
```

```typescript
// shorten.pipe.ts — Truncates long text
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'   // This is the name you use in templates: | shorten
})
export class ShortenPipe implements PipeTransform {

  // transform is called every time the pipe is used
  // value = the data coming in
  // limit = optional parameter with default value 50
  transform(value: string, limit: number = 50): string {
    if (!value) return '';
    if (value.length <= limit) return value;
    return value.substring(0, limit) + '...';
  }
}
```

```typescript
// temperature.pipe.ts — Convert between Celsius and Fahrenheit
@Pipe({
  name: 'temperature'
})
export class TemperaturePipe implements PipeTransform {

  transform(value: number, unit: 'C' | 'F' = 'C'): string {
    if (unit === 'F') {
      // Convert Celsius to Fahrenheit
      const fahrenheit = (value * 9/5) + 32;
      return `${fahrenheit.toFixed(1)}°F`;
    } else {
      // Convert Fahrenheit to Celsius
      const celsius = (value - 32) * 5/9;
      return `${celsius.toFixed(1)}°C`;
    }
  }
}
```

```typescript
// filter.pipe.ts — Filter an array by search term
@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {

  transform(items: any[], searchTerm: string, field: string): any[] {
    if (!items || !searchTerm) return items;

    return items.filter(item =>
      item[field]
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }
}
```

```html
<!-- Using custom pipes -->

<!-- Shorten pipe -->
<p>{{ longText | shorten }}</p>              <!-- Default 50 chars -->
<p>{{ longText | shorten:100 }}</p>          <!-- Custom 100 chars -->

<!-- Temperature pipe -->
<p>Body temp: {{ 37 | temperature:'F' }}</p>  <!-- 98.6°F -->
<p>Boiling: {{ 100 | temperature:'F' }}</p>   <!-- 212.0°F -->

<!-- Filter pipe -->
<input [(ngModel)]="searchTerm" placeholder="Search users...">
<div *ngFor="let user of users | filterBy:searchTerm:'name'">
  {{ user.name }}
</div>

<!-- Chaining custom and built-in pipes -->
<p>{{ longTitle | shorten:80 | titlecase }}</p>
```

```typescript
// Don't forget to declare pipes in the module!
@NgModule({
  declarations: [
    AppComponent,
    ShortenPipe,       // ← Declare here
    TemperaturePipe,
    FilterByPipe
  ]
})
export class AppModule { }
```

---

# 8. Assignments

## Assignment 1: Component Basics

**Goal:** Practice creating components and using interpolation.

**Task:**
Create a `ProfileCardComponent` that displays:
- User's name, age, city, and bio
- A "View Profile" button that logs a message to console when clicked
- Display the current date using the `date` pipe

```
Expected HTML output:
┌──────────────────────────┐
│ 👤 Alice Johnson          │
│ Age: 28 | Mumbai          │
│ Bio: A passionate...      │
│ Joined: January 15, 2024  │
│ [View Profile]            │
└──────────────────────────┘
```

**Hints:**
- Create with: `ng g c profile-card`
- Use `{{ }}` for interpolation
- Use `(click)` for event binding
- Use `{{ joinDate | date:'longDate' }}` for date formatting

---

## Assignment 2: Data Binding Practice

**Goal:** Practice all 4 types of data binding.

**Task:**
Create a `UserFormComponent` with:
1. An input field for a name (two-way binding with `[(ngModel)]`)
2. A live preview: "Hello, [name]!" that updates as you type
3. A "Submit" button that is disabled until name has at least 3 characters
4. When submitted, display the submitted name below the form

**Starter code:**
```typescript
export class UserFormComponent {
  name: string = '';
  submittedName: string = '';
  // Your code here
}
```

---

## Assignment 3: Directives Practice

**Goal:** Practice `*ngIf`, `*ngFor`, and `*ngSwitch`.

**Task:**
Create a `TaskListComponent`:
1. Display a list of tasks using `*ngFor`
2. Each task has: id, title, priority ('low' | 'medium' | 'high'), completed (boolean)
3. Use `*ngIf` to show "✅ Done" badge only for completed tasks
4. Use `*ngSwitch` to show colored dots based on priority (🟢 low, 🟡 medium, 🔴 high)
5. Add a filter button to show/hide completed tasks
6. Show "No tasks found" when the list is empty

---

## Assignment 4: Custom Pipe

**Goal:** Create a useful custom pipe.

**Task:**
Create a `TimeAgoPipe` that converts a date to a human-readable "time ago" string:
- Less than 60 seconds → "just now"
- Less than 60 minutes → "X minutes ago"
- Less than 24 hours → "X hours ago"
- Otherwise → "X days ago"

```html
<!-- Usage: -->
<p>Posted: {{ post.createdAt | timeAgo }}</p>
<!-- Output: "Posted: 5 minutes ago" -->
```

---

## Assignment 5: Putting It Together

**Goal:** Build a mini product catalog app.

**Task:**
Create a `ProductCatalogComponent` with:
1. An array of 6 products (name, price, category, inStock boolean, rating)
2. Search input to filter products by name (use a filter pipe or `*ngIf`)
3. Show "In Stock" or "Out of Stock" badge using `*ngIf`
4. Format price with `currency` pipe (INR)
5. Show star rating using `*ngFor` (loop 5 stars, fill them based on rating)
6. "Add to Cart" button disabled when out of stock
7. Counter showing how many items are in the cart

---

# 9. Interview Questions & Answers

## Beginner Angular Interview Questions

---

**Q1: What is Angular?**

**A:** Angular is an open-source, TypeScript-based front-end web application framework developed by Google. It's used to build single-page applications (SPAs) that are fast, scalable, and maintainable. Angular provides a complete solution including routing, forms handling, HTTP communication, and testing utilities built-in.

---

**Q2: What is the difference between AngularJS and Angular?**

**A:** AngularJS (1.x) was written in JavaScript and used an MVC architecture with $scope for data binding. Angular (2+) is a complete rewrite in TypeScript, uses a component-based architecture, is much faster (Ivy renderer), has better mobile support, and includes a powerful CLI. They are not backward compatible — completely different frameworks despite the similar name.

---

**Q3: What is a Component in Angular?**

**A:** A Component is the basic building block of an Angular application. It controls a specific piece of the UI. Every component has three parts: a TypeScript class (logic and data), an HTML template (view), and CSS styles (look). Components are decorated with `@Component({ selector, templateUrl, styleUrls })`.

---

**Q4: What is a Module in Angular?**

**A:** A Module (`@NgModule`) is a container that groups related components, directives, pipes, and services. Every Angular app has at least one module — the `AppModule`. Modules help organize code into features and control what's available where. The `@NgModule` decorator takes `declarations`, `imports`, `providers`, `exports`, and `bootstrap` arrays.

---

**Q5: What is data binding in Angular? How many types are there?**

**A:** Data binding is the mechanism that connects the component's data (TypeScript) to the template (HTML). There are 4 types:
1. **Interpolation** `{{ }}` — One-way: Component → Template (display text)
2. **Property Binding** `[ ]` — One-way: Component → Template (bind to DOM properties)
3. **Event Binding** `( )` — One-way: Template → Component (respond to user events)
4. **Two-Way Binding** `[( )]` — Both directions simultaneously (using `ngModel`)

---

**Q6: What is interpolation?**

**A:** Interpolation is a form of data binding that lets you display component property values in the template using double curly braces `{{ expression }}`. It converts the expression to a string and inserts it into the HTML. Example: `<h1>Hello, {{ userName }}!</h1>`. It can also evaluate expressions like `{{ 2 + 2 }}` or method calls like `{{ getTitle() }}`.

---

**Q7: What is the difference between `[ ]` (property binding) and `{{ }}` (interpolation)?**

**A:** Both flow data from component to template. The key difference: interpolation always outputs a **string**, while property binding can bind **any type** (boolean, object, etc.) directly to a DOM property. Use property binding when the target expects a non-string value. For example, `[disabled]="true"` correctly disables a button, but `disabled="{{ true }}"` would set `disabled="true"` as a string and wouldn't work correctly for boolean HTML attributes.

---

**Q8: What is `*ngIf` and how does it work?**

**A:** `*ngIf` is a structural directive that conditionally adds or removes an element from the DOM based on a truthy/falsy expression. Unlike CSS `display: none`, `*ngIf` completely removes the element and all its children from the DOM when false — which saves memory but means the component is destroyed and recreated. Syntax: `<div *ngIf="condition; else elseTemplate">`.

---

**Q9: What is `*ngFor` and what is `trackBy`?**

**A:** `*ngFor` is a structural directive that repeats a template element for each item in a collection. `let item of items` creates a local variable for each iteration. Available local variables: `index`, `first`, `last`, `even`, `odd`. `trackBy` is a performance optimization — it provides Angular a unique identifier for each item so Angular can efficiently update only the items that changed, instead of re-rendering the entire list on any data change.

---

**Q10: What is a Directive in Angular?**

**A:** Directives are instructions in the DOM. There are 3 types: (1) **Component Directives** — Components are directives with templates; (2) **Structural Directives** — Change the DOM structure by adding/removing elements (prefixed with `*` like `*ngIf`, `*ngFor`); (3) **Attribute Directives** — Change the appearance or behavior of an existing element without changing the DOM structure (like `ngClass`, `ngStyle`, `ngModel`).

---

**Q11: What is a Pipe in Angular?**

**A:** A pipe transforms data for display in templates using the `|` character. Example: `{{ price | currency:'INR' }}`. Built-in pipes include `date`, `uppercase`, `lowercase`, `currency`, `number`, `percent`, `json`, `slice`, and `async`. You can also create custom pipes by implementing the `PipeTransform` interface with a `transform(value, ...args)` method and decorating with `@Pipe({ name: 'pipeName' })`.

---

**Q12: What is the `async` pipe? Why is it special?**

**A:** The `async` pipe automatically subscribes to an Observable or Promise and returns the latest value. When the component is destroyed, it automatically **unsubscribes** — preventing memory leaks. This makes it the preferred way to handle Observables in templates. Example: `{{ user$ | async }}` or `*ngFor="let user of users$ | async"`.

---

**Q13: What is the Angular CLI?**

**A:** The Angular CLI (Command Line Interface) is a tool that automates common Angular development tasks. Key commands: `ng new` (create project), `ng serve` (run dev server with live reload), `ng generate` (create components/services/modules), `ng build` (compile for production), `ng test` (run unit tests), `ng lint` (check code quality). It ensures consistent project structure across teams.

---

**Q14: What is `ngModel` and what module is required?**

**A:** `ngModel` is a directive that implements two-way data binding for form elements. It keeps the component property and the input field in sync — when either changes, the other updates automatically. To use `ngModel`, you **must import `FormsModule`** in your module's `imports` array. It combines property binding `[ngModel]="value"` and event binding `(ngModelChange)="value = $event"` into one `[(ngModel)]` syntax.

---

**Q15: What is TypeScript and why does Angular use it?**

**A:** TypeScript is a superset of JavaScript that adds static typing, interfaces, generics, and modern features that compile to plain JavaScript. Angular uses TypeScript because: (1) Type safety catches errors during development before runtime; (2) Better IDE support with autocomplete and refactoring; (3) Interfaces and decorators are used extensively in Angular's architecture; (4) More readable and maintainable code in large teams. TypeScript code is compiled to JavaScript before running in the browser.

---

**Q16: What is `app.module.ts`?**

**A:** `app.module.ts` is the root module of an Angular application. It's decorated with `@NgModule` and defines: `declarations` (which components/directives/pipes belong to this module), `imports` (external modules needed), `providers` (services), and `bootstrap` (the root component to render first). Angular reads this file to understand the entire application structure. Every Angular app must have exactly one root module.

---

**Q17: What is the role of `main.ts`?**

**A:** `main.ts` is the entry point of the Angular application. It calls `platformBrowserDynamic().bootstrapModule(AppModule)` to start the Angular framework. This tells Angular to load `AppModule` as the root module, read its `bootstrap` property to find the root component (`AppComponent`), and render that component's template to replace the `<app-root>` tag in `index.html`.

---

**Q18: What is the `selector` in a component?**

**A:** The `selector` in `@Component` metadata defines the HTML tag name used to include that component in templates. For example, `selector: 'app-user-card'` means you use `<app-user-card></app-user-card>` in any template to render that component. Angular uses CSS selector syntax — element selectors (`app-user`) are most common for components, while attribute selectors (`[appHighlight]`) are used for directives.

---

**Q19: What is an Interface in TypeScript and why is it used in Angular?**

**A:** An interface defines the "shape" of an object — what properties and their types it must have. It's a contract at development time (not present in compiled JavaScript). In Angular, interfaces are used to type-check data from APIs, define model shapes, and ensure consistency. Example: `interface User { id: number; name: string; email: string; }` — then TypeScript ensures every "User" object has those exact properties with those types.

---

**Q20: What is the difference between `ngClass` and `[class.name]`?**

**A:** Both apply CSS classes conditionally. `[class.className]="condition"` is the cleaner shorthand for toggling a **single class**: `<div [class.active]="isActive">`. `[ngClass]` is more powerful and handles **multiple classes** at once using an object map: `<div [ngClass]="{'active': isActive, 'error': hasError}">`. Use `[class.x]` for simple single-class toggling and `[ngClass]` when you need multiple conditional classes.

---

**Q21: What are lifecycle hooks in Angular?**

**A:** Lifecycle hooks are methods called by Angular at specific points in a component's life. Key hooks: `ngOnInit` (after component initializes — use for API calls), `ngOnChanges` (when `@Input` values change), `ngOnDestroy` (before component is destroyed — use to clean up subscriptions and timers), `ngAfterViewInit` (after template is rendered — use to access DOM elements). Implement the corresponding interface (`OnInit`, `OnDestroy`, etc.) to use each hook.

---

**Q22: What is the difference between `constructor` and `ngOnInit`?**

**A:** The `constructor` is a TypeScript/JavaScript concept — it runs when the class is instantiated and is used for **Dependency Injection** (injecting services). At constructor time, `@Input` properties aren't set yet. `ngOnInit` is an Angular lifecycle hook that runs after Angular has initialized the component and set all input properties. **Best practice:** Use the constructor only for DI. Put initialization logic (API calls, setup using @Input values) in `ngOnInit`.

---

**Q23: What is `*ngSwitch` and when would you use it over `*ngIf`?**

**A:** `*ngSwitch` evaluates a single expression and renders the matching template block, similar to a JavaScript switch statement. Use `*ngSwitch` when you have **3 or more mutually exclusive conditions** based on the **same variable** — it's cleaner than multiple `*ngIf` statements. Use `*ngIf` for simple true/false conditions or when conditions involve different variables. `*ngSwitch` uses `[ngSwitch]` on the container, `*ngSwitchCase` for each option, and `*ngSwitchDefault` for the fallback.

---

**Q24: What is SPA (Single Page Application)?**

**A:** A Single Page Application loads a single HTML file once and dynamically updates content as the user navigates, without full page reloads. The browser downloads the JavaScript application once, and Angular's Router handles navigation by swapping components on screen. Benefits: Faster navigation (no page reloads), app-like feel, reduced server load (only data fetched after initial load). Drawbacks: Larger initial load, SEO challenges (solved with Angular Universal/SSR).

---

**Q25: What is `@Input()` decorator?**

**A:** `@Input()` marks a component property as an **input property** — meaning a parent component can pass data into it. Example: `@Input() userId: number = 0;` in a child component. Parent uses it as: `<app-user-detail [userId]="selectedId">`. This is how components communicate downward (parent → child). The `ngOnChanges` lifecycle hook is called when `@Input` values change.

---

**Q26: What is Dependency Injection in Angular?**

**A:** Dependency Injection (DI) is a design pattern where a class receives its dependencies from an external source rather than creating them itself. In Angular, when you list a service in a constructor parameter, Angular's injector automatically creates and provides that service instance. Example: `constructor(private userService: UserService)` — Angular automatically provides `UserService` to the component. This makes code testable (you can inject mock services in tests) and avoids duplicate service instances.

---

**Q27: What is a Service in Angular?**

**A:** A Service is a class decorated with `@Injectable` that contains **shared business logic** — API calls, data transformation, state management, logging, etc. Services are not tied to any specific component, making them reusable across the app. They're provided via Dependency Injection. Best practice: Keep components "thin" (just UI logic) and put all business logic in services. Use `providedIn: 'root'` to make a service available app-wide as a singleton.

---

**Q28: What does `providedIn: 'root'` mean?**

**A:** `providedIn: 'root'` in `@Injectable({ providedIn: 'root' })` means the service is registered with the root injector, making it: (1) Available throughout the entire application without adding it to any module's `providers` array; (2) A **singleton** — only one instance is created and shared by all who inject it; (3) Tree-shakeable — if nothing uses the service, it's not included in the production bundle. This is the recommended way to provide most services.

---

**Q29: What is `ng-template` and when would you use it?**

**A:** `<ng-template>` defines a template block that is **not rendered by default** — it's a placeholder that Angular can use when needed. It's used with structural directives: as the `else` template in `*ngIf` (`<ng-template #elsePart>`), as the internal implementation of structural directives, and for creating reusable template fragments. Unlike regular HTML elements, `ng-template` itself never appears in the DOM.

---

**Q30: What is View Encapsulation in Angular?**

**A:** View Encapsulation controls how component styles are scoped. Three modes: (1) **Emulated** (default) — Angular adds unique attributes to elements and rewrites CSS selectors to scope styles to the component, preventing leakage to other components; (2) **None** — Component styles become global — can affect other components; (3) **ShadowDom** — Uses native browser Shadow DOM for true encapsulation. Emulated is recommended for most cases as it works across all browsers and provides good style isolation without Shadow DOM overhead.

---

> ## 🎓 Congratulations!
>
> You've completed Angular Phase 1: Fundamentals. You now understand:
> - What Angular is and why it exists
> - How to set up your development environment
> - TypeScript fundamentals used in Angular
> - Core concepts: Components, Templates, Modules, Decorators
> - All 4 types of Data Binding
> - Structural and Attribute Directives
> - Built-in and Custom Pipes
>
> **Next Steps — Phase 2 covers:**
> - Services & Dependency Injection (in depth)
> - Routing & Navigation
> - HTTP Client & API calls
> - RxJS & Observables
> - Reactive Forms & Template-Driven Forms
> - Component Communication (@Input, @Output, EventEmitter)

---

*Guide created for Angular learners at all levels. Happy coding! 🚀*
