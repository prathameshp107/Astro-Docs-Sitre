---
title: "React Project Structure"
description: "Learn about React project structure and the mental model for how React works."
sidebar:
  order: 2
---

## React Project Structure

| File/Folder | Description |
|-------------|-------------|
| `node_modules/` | npm packages for the entire workspace |
| `public/` | Only files here can be referenced from HTML |
| `src/` | Source files for the root-level application |
| `.gitignore` | Files Git should ignore |
| `package.json` | Configures npm package dependencies |
| `package-lock.json` | Version info for all installed packages |
| `README.md` | Introductory documentation |

### React Project Flow

```
index.html  -->  <div id="root"></div>
index.js    -->  root = ReactDOM.createRoot(document.getElementById('root'))
                 root.render(<App />)
App.js      -->  App Component Code
```

### Mental Model (Important!)

When you write `<App />`, React:
1. Calls function `App()`
2. Gets JSX back
3. Converts JSX to JS objects
4. Updates the real DOM

---
