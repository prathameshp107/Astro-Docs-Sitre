// ─── React Runner — Transpilation & Preview Logic ───

import * as Babel from "@babel/standalone";

/**
 * Strip ES module import/export lines before transpilation.
 * @param {string} code
 * @returns {string}
 */
export function stripImports(code) {
  return code
    .replace(/^import\s+[^;]+;\s*$/gm, "")
    .replace(/^export\s+(default\s+)?/gm, "");
}

/**
 * Prepare code for execution: strip imports, transpile JSX via Babel.
 * @param {string} code
 * @returns {string}
 */
export function transpileReactCode(code) {
  const clean = stripImports(code);
  return Babel.transform(clean, {
    presets: ["react"],
    filename: "inline.jsx",
  }).code;
}

/**
 * Scan transpiled code for top-level React component names (uppercase functions).
 * Done server-side so we can inject the list into the iframe as JSON.
 * @param {string} transpiled
 * @returns {string[]}
 */
function detectComponentNames(transpiled) {
  const names = [];
  const re = /function\s+([A-Z][A-Za-z0-9_]*)\s*\(/g;
  let m;
  while ((m = re.exec(transpiled)) !== null) {
    if (!names.includes(m[1])) names.push(m[1]);
  }
  return names;
}

/**
 * Build the iframe srcdoc HTML for rendering the transpiled React code.
 * @param {string} transpiled - Transpiled JavaScript code
 * @returns {string} Full HTML document for the iframe
 */
export function buildPreviewHtml(transpiled) {
  // Detect component names server-side and inject as JSON so the iframe can use them
  const componentNames = detectComponentNames(transpiled);
  const componentNamesJson = JSON.stringify(componentNames);

  return `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 1rem; color: #f8fafc; background: transparent; }
  </style>
  <script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
  <script>
    const { useState, useEffect, useRef, useMemo, useCallback, useReducer, useContext, createContext } = React;
    const sendLog = (type, args) => {
      const content = args.map(arg => {
        try { return typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg); } catch (e) { return String(arg); }
      }).join(' ');
      window.parent.postMessage({ type: 'CONSOLE_LOG', logType: type, content }, '*');
    };
    console.log = (...args) => sendLog('log', args);
    console.error = (...args) => sendLog('error', args);
    console.warn = (...args) => sendLog('warn', args);
    window.addEventListener('error', (e) => { sendLog('error', [e.message]); });
  </script>
</head>
<body>
  <div id="react-preview-root"></div>
  <script>
    try {
      ${transpiled}

      // Component names detected at build time (server-side scan)
      const _componentNames = ${componentNamesJson};

      // Prefer App; fall back to last uppercase component found
      let RootComponent = null;
      if (typeof App === 'function') {
        RootComponent = App;
      } else {
        for (let i = _componentNames.length - 1; i >= 0; i--) {
          try {
            const ref = eval(_componentNames[i]);
            if (typeof ref === 'function') { RootComponent = ref; break; }
          } catch (_) {}
        }
      }

      if (RootComponent) {
        const root = ReactDOM.createRoot(document.getElementById('react-preview-root'));
        root.render(React.createElement(RootComponent));
      } else {
        document.getElementById('react-preview-root').innerHTML = \`
          <div style="color:#94a3b8;font-family:monospace;font-size:0.85rem;padding:1rem;text-align:center;border:1px dashed rgba(255,255,255,0.1);border-radius:8px;">
            <p>No component found to render.</p>
            <p style="font-size:0.78rem;">Declare a <code>function App() { ... }</code> (or any React component with an uppercase name) to see a preview.</p>
          </div>\`;
      }
    } catch (err) {
      console.error(err.message);
      document.getElementById('react-preview-root').innerHTML = \`
        <div style="color:#ef4444;font-family:monospace;font-size:0.85rem;">
          <strong>✗ Runtime Error:</strong>
          <pre style="margin:0;white-space:pre-wrap;">\${err.message}</pre>
        </div>\`;
    }
  </script>
</body>
</html>`;
}

/**
 * Runs code through the full pipeline: strip imports → transpile JSX → build preview HTML.
 * @param {string} code - Raw user code
 * @returns {{ html: string|null, error: string|null }}
 */
export function compileReactCode(code) {
  try {
    const transpiled = transpileReactCode(code);
    const html = buildPreviewHtml(transpiled);
    return { html, error: null };
  } catch (err) {
    return { html: null, error: err.message };
  }
}
