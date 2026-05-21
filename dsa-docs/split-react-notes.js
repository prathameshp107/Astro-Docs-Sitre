
import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const sourceFilePath = path.resolve(projectRoot, '..', 'REACT.js', 'React_Notes.md');
const targetDir = path.join(projectRoot, 'src', 'content', 'docs', 'react');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function yamlQuote(value) {
  return JSON.stringify(String(value).replace(/\r?\n/g, ' ').trim());
}

function rewriteAssetLinks(content) {
  return content
    .replace(/\]\(\/assets\//g, '](/DSA-Notes-Problems/assets/')
    .replace(/src="\/assets\//g, 'src="/DSA-Notes-Problems/assets/')
    .replace(/\]\((\.\/)?public\/([^)]+)\)/g, function(match, dotSlash, assetPath) {
      return '](/DSA-Notes-Problems/assets/react/' + assetPath.toLowerCase().replace(/_/g, '-') + ')';
    });
}

// Read source file
let content = fs.readFileSync(sourceFilePath, 'utf8').replace(/^\uFEFF/, '');

// Empty target dir and recreate
if (fs.existsSync(targetDir)) {
  for (const entry of fs.readdirSync(targetDir)) {
    fs.rmSync(path.join(targetDir, entry), { recursive: true, force: true });
  }
}
ensureDir(targetDir);

// Create index file
const indexContent = `---
title: "React"
description: "React setup guidance, notes, hooks, component patterns, and interview preparation."
---

# React

React setup guidance, notes, hooks, component patterns, and interview preparation.

## Sections

- [Introduction to React](/DSA-Notes-Problems/react/introduction)
- [React Project Structure](/DSA-Notes-Problems/react/project-structure)
- [JSX](/DSA-Notes-Problems/react/jsx)
- [Components](/DSA-Notes-Problems/react/components)
- [Props](/DSA-Notes-Problems/react/props)
- [Hooks](/DSA-Notes-Problems/react/hooks)
- [React Strict Mode](/DSA-Notes-Problems/react/strict-mode)
- [Fragments](/DSA-Notes-Problems/react/fragments)
- [Data Binding](/DSA-Notes-Problems/react/data-binding)
- [React Setup Guideline](/DSA-Notes-Problems/react/react-setup-guideline)
- [React Full Interview Questions](/DSA-Notes-Problems/react/react-full-interview-questions)
`;
fs.writeFileSync(path.join(targetDir, 'index.md'), indexContent, 'utf8');

// Define sections to extract with simple string slicing for reliability
const introStart = content.indexOf('## What React Is');
const projectStructureStart = content.indexOf('## React Project Structure');
const jsxStart = content.indexOf('# JSX');
const componentsStart = content.indexOf('# Components');
const propsStart = content.indexOf('# ⚛️ What are Props?');
const hooksStart = content.indexOf('# ⚛️ What are Hooks');
const strictModeStart = content.indexOf('## React.StrictMode');
const fragmentsStart = content.indexOf('# Fragments');
const dataBindingStart = content.indexOf('# Data Binding');

// 1. Introduction to React
let sectionContent = content.slice(introStart, projectStructureStart).trim();
let finalContent = `---
title: "Introduction to React"
description: "Learn what React is, how it works, and its core features like Virtual DOM and Reconciliation."
---

${rewriteAssetLinks(sectionContent)}
`;
fs.writeFileSync(path.join(targetDir, 'introduction.md'), finalContent, 'utf8');

// 2. React Project Structure
sectionContent = content.slice(projectStructureStart, jsxStart).trim();
finalContent = `---
title: "React Project Structure"
description: "Learn about React project structure and the mental model for how React works."
---

${rewriteAssetLinks(sectionContent)}
`;
fs.writeFileSync(path.join(targetDir, 'project-structure.md'), finalContent, 'utf8');

// 3. JSX
sectionContent = content.slice(jsxStart, componentsStart).trim();
finalContent = `---
title: "JSX"
description: "Learn about JSX, React's JavaScript XML syntax for writing UI components."
---

${rewriteAssetLinks(sectionContent)}
`;
fs.writeFileSync(path.join(targetDir, 'jsx.md'), finalContent, 'utf8');

// 4. Components
sectionContent = content.slice(componentsStart, propsStart).trim();
finalContent = `---
title: "Components"
description: "Learn about React components, types of components, and component patterns."
---

${rewriteAssetLinks(sectionContent)}
`;
fs.writeFileSync(path.join(targetDir, 'components.md'), finalContent, 'utf8');

// 5. Props
sectionContent = content.slice(propsStart, hooksStart).trim();
finalContent = `---
title: "Props"
description: "Learn about React props, how to use them, and common patterns with props."
---

${rewriteAssetLinks(sectionContent)}
`;
fs.writeFileSync(path.join(targetDir, 'props.md'), finalContent, 'utf8');

// 6. Hooks
sectionContent = content.slice(hooksStart, strictModeStart).trim();
finalContent = `---
title: "Hooks"
description: "Complete guide to React Hooks including useState, useEffect, useRef, useMemo, useCallback, useContext, useReducer, and custom hooks."
---

${rewriteAssetLinks(sectionContent)}
`;
fs.writeFileSync(path.join(targetDir, 'hooks.md'), finalContent, 'utf8');

// 7. React Strict Mode
sectionContent = content.slice(strictModeStart, fragmentsStart).trim();
finalContent = `---
title: "React Strict Mode"
description: "Learn about React Strict Mode and how it helps identify potential problems in your application."
---

${rewriteAssetLinks(sectionContent)}
`;
fs.writeFileSync(path.join(targetDir, 'strict-mode.md'), finalContent, 'utf8');

// 8. Fragments
sectionContent = content.slice(fragmentsStart, dataBindingStart).trim();
finalContent = `---
title: "Fragments"
description: "Learn about React Fragments and how to group elements without adding extra DOM nodes."
---

${rewriteAssetLinks(sectionContent)}
`;
fs.writeFileSync(path.join(targetDir, 'fragments.md'), finalContent, 'utf8');

// 9. Data Binding
sectionContent = content.slice(dataBindingStart).trim();
finalContent = `---
title: "Data Binding"
description: "Learn about data binding in React, including one-way and two-way binding patterns."
---

${rewriteAssetLinks(sectionContent)}
`;
fs.writeFileSync(path.join(targetDir, 'data-binding.md'), finalContent, 'utf8');

// Copy existing files
const existingFiles = [
  {
    source: path.resolve(projectRoot, '..', 'REACT.js', 'React_setup_guideline.md'),
    target: path.join(targetDir, 'react-setup-guideline.md')
  },
  {
    source: path.resolve(projectRoot, '..', 'REACT.js', 'React-Full-Interview_Questions.md'),
    target: path.join(targetDir, 'react-full-interview-questions.md')
  }
];

for (const file of existingFiles) {
  if (fs.existsSync(file.source)) {
    let content = fs.readFileSync(file.source, 'utf8').replace(/^\uFEFF/, '');
    let title = 'React Setup Guideline';
    let description = 'Guidelines for setting up React projects';
    if (file.target.includes('interview')) {
      title = 'React Full Interview Questions';
      description = 'Complete collection of React interview questions and answers';
    }
    let finalContent = `---
title: ${yamlQuote(title)}
description: ${yamlQuote(description)}
---

${rewriteAssetLinks(content)}
`;
    fs.writeFileSync(file.target, finalContent, 'utf8');
  }
}

console.log('React notes split successfully!');

