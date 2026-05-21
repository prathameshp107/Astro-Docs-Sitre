
## React Local Setup

1. Download and install Node.js: https://nodejs.org/en/download/

2. Check if Node.js is installed:
   ```bash
   node -v
   ```

3. Check if NPM is installed (NPM = Node Package Manager):
   ```bash
   npm -v
   ```

4. Go to the folder where you want to create the project and run:
   ```bash
   npx create-react-app project1
   ```
   *(npx = node package executer)*

5. Go to the created project folder and start the React application:
   ```bash
   cd project1
   npm start
   ```

6. A new browser window will pop up at `http://localhost:3000/`

   To use a different port:
   ```bash
   set PORT=3001 && npm start
   ```

---

## React Project with TypeScript

- Create React App supports TypeScript out of the box.
- To create a new project with TypeScript support:
  ```bash
  npx create-react-app my-app --template typescript
  ```
- To add TypeScript to an existing project:
  ```bash
  npm install --save typescript @types/node @types/react @types/react-dom @types/jest
  ```

---

## create-react-app

- A React application boilerplate generator created by Facebook.
- Installs React, ReactDOM & other required libraries.
- Provides a development environment configured for ease-of-use with minimal setup.
- Creates a frontend build pipeline using **Babel** and **Webpack** under the hood.

---

## NPX

- **NPX** = Node Package Executer
- A package runner/executor tool.
- Can execute any package from the npm registry without installing it:
  ```bash
  npx create-react-app my-app
  ```

---

## React App with Vite

- **Vite.js** is a build tool and development server optimized for modern web apps.
- Includes built-in support for TypeScript and CSS preprocessors.

**Steps:**

1. Create a Vite project:
   ```bash
   npm create vite@latest
   # OR
   npm create vite@latest my-app -- --template react
   # OR (TypeScript)
   npm create vite@latest my-app -- --template react-ts
   ```

2. Go to the created project, install dependencies, and serve:
   ```bash
   cd my-app
   npm install
   npm run dev
   ```

---