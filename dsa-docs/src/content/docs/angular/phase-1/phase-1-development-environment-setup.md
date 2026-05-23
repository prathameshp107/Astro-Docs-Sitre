---
title: "2. Development Environment Setup"
description: "---"
sidebar:
  order: 2
---

## 2. Development Environment Setup

### 2.1 Node.js

#### Simple Words First 🟡
JavaScript was originally designed to only run **inside browsers**. Node.js is like a **power outlet** that lets JavaScript run on your computer (outside the browser). Angular CLI, our project creation tool, needs Node.js to run.

#### What is Node.js?
Node.js is a **JavaScript runtime** built on Chrome's V8 engine. It allows you to run JavaScript on your machine, making it possible for tools like the Angular CLI to exist.

#### Installation
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

### 2.2 npm (Node Package Manager)

#### Simple Words First 🟡
Think of npm as the **App Store for JavaScript code**. When Angular needs a library (e.g., a date-formatting tool), you don't write it from scratch — you install it from npm in one command.

#### Key npm Commands

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

#### package.json — The Project's Recipe Card
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

### 2.3 Angular CLI

#### Simple Words First 🟡
The Angular CLI (Command Line Interface) is like a **magic wand**. Instead of manually creating 15 files to make one component, you type one command and it does everything for you.

#### Installation

```bash
# Install Angular CLI globally (do this once on your machine)
npm install -g @angular/cli

# Verify installation
ng version
```

#### Most Used CLI Commands

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

### 2.4 VS Code Setup

#### Recommended Extensions for Angular Development

| Extension | Why You Need It |
|-----------|----------------|
| **Angular Language Service** | Autocomplete and error checking in HTML templates |
| **ESLint** | Catches code style problems |
| **Prettier** | Auto-formats your code |
| **Auto Rename Tag** | Renames both opening/closing HTML tags together |
| **Bracket Pair Colorizer** | Colors matching brackets |
| **GitLens** | See Git history inline |
| **Thunder Client** | Test APIs inside VS Code |

#### Useful VS Code Settings for Angular

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

### 2.5 Creating Your First Project

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

### 2.6 Project Structure Explanation

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

#### Let's Understand the Key Files

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
