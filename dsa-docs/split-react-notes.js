
import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const sourceFilePath = path.resolve(projectRoot, '..', 'AllDocs', 'REACT.js', 'React_Notes.md');
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
    .replace(/!\[([^\]]*)\]\(\.\.\/dsa-docs\/public\/assets\/([^)]+)\)/g, function(match, alt, assetPath) {
      return `![${alt}](/DSA-Notes-Problems/assets/${assetPath})`;
    })
    .replace(/!\[([^\]]*)\]\(\.\.\/dsa-docs\/public\/assets\/([^)]+)\s*"[^"]*"\)/g, function(match, alt, assetPath) {
      return `![${alt}](/DSA-Notes-Problems/assets/${assetPath})`;
    })
    .replace(/\]\((\.\/)?public\/([^)]+)\)/g, function(match, dotSlash, assetPath) {
      return '](/DSA-Notes-Problems/assets/react/' + assetPath.toLowerCase().replace(/_/g, '-') + ')';
    });
}

function writeFile(filename, title, description, content, sortNumber) {
  const finalContent = `---
title: ${yamlQuote(title)}
description: ${yamlQuote(description)}
sidebar:
  order: ${sortNumber}
---

${rewriteAssetLinks(content)}
`;
  fs.writeFileSync(path.join(targetDir, filename), finalContent, 'utf8');
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
`;
fs.writeFileSync(path.join(targetDir, 'index.md'), indexContent, 'utf8');

// Define all section positions
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
writeFile('introduction.md', 'Introduction to React', 'Learn what React is, how it works, and its core features like Virtual DOM and Reconciliation.', sectionContent, 1);

// 2. React Project Structure
sectionContent = content.slice(projectStructureStart, jsxStart).trim();
writeFile('project-structure.md', 'React Project Structure', 'Learn about React project structure and the mental model for how React works.', sectionContent, 2);

// 3. JSX
sectionContent = content.slice(jsxStart, componentsStart).trim();
writeFile('jsx.md', 'JSX', 'Learn about JSX, React\'s JavaScript XML syntax for writing UI components.', sectionContent, 3);

// 4. Components
sectionContent = content.slice(componentsStart, propsStart).trim();
writeFile('components.md', 'Components', 'Learn about React components, types of components, and component patterns.', sectionContent, 4);

// 5. Props
sectionContent = content.slice(propsStart, hooksStart).trim();
writeFile('props.md', 'Props', 'Learn about React props, how to use them, and common patterns with props.', sectionContent, 5);

// Hooks - split into individual files
const hooksContent = content.slice(hooksStart, strictModeStart);
const useStateStart = hooksContent.indexOf('# 🔹 1. useState');
const useEffectStart = hooksContent.indexOf('# 🔹 2. useEffect');
const useRefStart = hooksContent.indexOf('# 🔹 3. useRef');
const useMemoStart = hooksContent.indexOf('# 🔹 4. useMemo');
const useCallbackStart = hooksContent.indexOf('# 🔹 5. useCallback');
const useContextStart = hooksContent.indexOf('# 🔹 6. useContext');
const useReducerStart = hooksContent.indexOf('# 🔹 7. useReducer');
const customHookStart = hooksContent.indexOf('# 🔹 8. Custom Hook');
const rulesStart = hooksContent.indexOf('# 🧠 Very Important Rule');

// Create hooks directory first
const hooksDir = path.join(targetDir, 'hooks');
ensureDir(hooksDir);

// Hooks index file
const hooksIndexContent = `---
title: "Hooks"
description: "Complete guide to React Hooks including useState, useEffect, useRef, useMemo, useCallback, useContext, useReducer, and custom hooks."
---

# Hooks

Complete guide to React Hooks including useState, useEffect, useRef, useMemo, useCallback, useContext, useReducer, and custom hooks.
`;
fs.writeFileSync(path.join(targetDir, 'hooks', 'index.md'), hooksIndexContent, 'utf8');

// useState
sectionContent = hooksContent.slice(useStateStart, useEffectStart).trim();
writeFile('hooks/use-state.md', 'useState', 'useState hook for managing state in React components.', sectionContent, 1);

// useEffect
sectionContent = hooksContent.slice(useEffectStart, useRefStart).trim();
writeFile('hooks/use-effect.md', 'useEffect', 'useEffect hook for side effects in React components.', sectionContent, 2);

// useRef
sectionContent = hooksContent.slice(useRefStart, useMemoStart).trim();
writeFile('hooks/use-ref.md', 'useRef', 'useRef hook for storing values without re-render and accessing DOM.', sectionContent, 3);

// useMemo
sectionContent = hooksContent.slice(useMemoStart, useCallbackStart).trim();
writeFile('hooks/use-memo.md', 'useMemo', 'useMemo hook for caching calculations in React.', sectionContent, 4);

// useCallback
sectionContent = hooksContent.slice(useCallbackStart, useContextStart).trim();
writeFile('hooks/use-callback.md', 'useCallback', 'useCallback hook for memoizing functions in React.', sectionContent, 5);

// useContext
sectionContent = hooksContent.slice(useContextStart, useReducerStart).trim();
writeFile('hooks/use-context.md', 'useContext', 'useContext hook for global data sharing in React.', sectionContent, 6);

// useReducer
sectionContent = hooksContent.slice(useReducerStart, customHookStart).trim();
writeFile('hooks/use-reducer.md', 'useReducer', 'useReducer hook for complex state management.', sectionContent, 7);

// Custom Hook & remaining hooks content
sectionContent = hooksContent.slice(customHookStart).trim();
writeFile('hooks/custom-hooks.md', 'Custom Hooks', 'Creating custom hooks for reusable logic in React.', sectionContent, 8);

// 7. React Strict Mode (sort 6 because hooks are a submenu)
sectionContent = content.slice(strictModeStart, fragmentsStart).trim();
writeFile('strict-mode.md', 'React Strict Mode', 'Learn about React Strict Mode and how it helps identify potential problems in your application.', sectionContent, 6);

// 8. Fragments
sectionContent = content.slice(fragmentsStart, dataBindingStart).trim();
writeFile('fragments.md', 'Fragments', 'Learn about React Fragments and how to group elements without adding extra DOM nodes.', sectionContent, 7);

// 9. Data Binding
sectionContent = content.slice(dataBindingStart).trim();
writeFile('data-binding.md', 'Data Binding', 'Learn about data binding in React, including one-way and two-way binding patterns.', sectionContent, 8);

// Copy existing files
const existingFiles = [
  {
    source: path.resolve(projectRoot, '..', 'AllDocs', 'REACT.js', 'React_setup_guideline.md'),
    target: path.join(targetDir, 'react-setup-guideline.md'),
    sort: 9
  },
  {
    source: path.resolve(projectRoot, '..', 'AllDocs', 'REACT.js', 'React-Full-Interview_Questions.md'),
    target: path.join(targetDir, 'react-full-interview-questions.md'),
    sort: 10
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
sort: ${file.sort}
---

${rewriteAssetLinks(content)}
`;
    fs.writeFileSync(file.target, finalContent, 'utf8');
  }
}

console.log('React notes split successfully!');
