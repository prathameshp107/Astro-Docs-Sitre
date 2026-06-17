import React, { useState, useEffect, useMemo, useCallback, useRef, useReducer, useContext, createContext } from "react";
import ThemeToggle from "../mcq/ThemeToggle.jsx";
import { createRoot } from "react-dom/client";
import Editor from "@monaco-editor/react";
import * as Babel from "@babel/standalone";
import { REACT_LESSONS, REACT_BUG_CHALLENGES, REACT_MINI_PROJECTS } from "../../data/react-labs-curriculum.js";

// ─── ICON COMPONENTS ───

function BookIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/><line x1="8" y1="7" x2="16" y2="7"/></svg>; }
function BugIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>; }
function ProjectIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>; }
function CheckIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>; }

// ─── RESIZABLE HANDLE ───

function ResizableHandle({ onDrag, orientation = "vertical" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMouseDown = (e) => {
      e.preventDefault();
      document.body.style.cursor = orientation === "vertical" ? "col-resize" : "row-resize";
      document.body.style.userSelect = "none";

      const onMouseMove = (e) => onDrag({ clientX: e.clientX, clientY: e.clientY });
      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };

    el.addEventListener("mousedown", onMouseDown);
    return () => el.removeEventListener("mousedown", onMouseDown);
  }, [onDrag, orientation]);

  return <div ref={ref} className={`jsl-resize-handle ${orientation}`} />;
}

// ─── HELPERS: STRIP IMPORTS & SET UP REACT GLOBALS ───

// Strip ES module import/export lines before transpilation
// so Babel won't transform them to require() calls
function stripImports(code) {
  return code
    .replace(/^import\s+[^;]+;\s*$/gm, '')
    .replace(/^export\s+(default\s+)?/gm, '');
}

// Prepare code for execution: strip imports, transpile JSX via Babel
function transpileReactCode(code) {
  const clean = stripImports(code);
  return Babel.transform(clean, {
    presets: ['react'],
    filename: 'inline.jsx',
  }).code;
}

// ─── LIVE REACT PREVIEW ───

function ReactPreview({ code, previewKey, style }) {
  const previewContainerRef = useRef(null);

  useEffect(() => {
    if (!previewContainerRef.current) return;

    const container = previewContainerRef.current;
    container.innerHTML = '<div style="padding: 1rem; color: #64748b;">⏳ Compiling...</div>';

    const handle = setTimeout(() => {
      try {
        const transpiled = transpileReactCode(code);

        // Create a fresh preview root
        container.innerHTML = `<div id="react-preview-root" style="padding: 1rem;"></div>`;

        // Execute transpiled code in a scope with React globals
        const deps = [
          'React', 'ReactDOM', 'useState', 'useEffect', 'useRef',
          'useMemo', 'useCallback', 'useReducer', 'useContext', 'createContext'
        ];
        const vals = [
          window.React, window.ReactDOM, window.useState, window.useEffect, window.useRef,
          window.useMemo, window.useCallback, window.useReducer, window.useContext, window.createContext
        ];

        // If the user defined an App function, render it after execution
        const renderBlock = `
          if (typeof App === 'function') {
            const root = document.getElementById('react-preview-root');
            if (root) {
              const container = root;
              container.innerHTML = '';
              ReactDOM.createRoot(container).render(React.createElement(App));
            }
          }
        `;

        const wrapped = `
          (function(${deps.join(', ')}) {
            ${transpiled}
            ${renderBlock}
          })
        `;

        const fn = eval(wrapped);
        fn(...vals);

        // Check if user had no App function
        const rootEl = document.getElementById('react-preview-root');
        if (rootEl && (rootEl.children.length === 0 || rootEl.innerHTML.trim() === '' || rootEl.innerHTML.trim() === '<div style="padding: 1rem;"></div>')) {
          // The render block either found no App, or App rendered nothing visible
          // Just leave the result as-is — something might have been logged
        }

      } catch (err) {
        container.innerHTML = `<div style="padding:1rem;color:#ef4444;font-family:monospace;font-size:0.85rem;">
          <strong style="display:block;margin-bottom:0.5rem;">✗ Error:</strong>
          <pre style="margin:0;white-space:pre-wrap;">${err.message}</pre>
        </div>`;
      }
    }, 150);

    return () => clearTimeout(handle);
  }, [code, previewKey]);

  return (
    <div className="jsl-preview-panel" style={style}>
      <div className="jsl-preview-header">
        <span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
          Live Preview
        </span>
        <span className="jsl-preview-info">React ⚛</span>
      </div>
      <div className="jsl-preview-body" ref={previewContainerRef}>
        <div className="jsl-preview-placeholder">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          <p>Run your React code to see a live preview</p>
        </div>
      </div>
    </div>
  );
}

// ─── SIDEBAR ───

function ReactSidebar({ activeSection, activeLesson, activeBug, activeProject, onSelectLesson, onSelectBug, onSelectProject, progress, ...rest }) {
  const [expandedSections, setExpandedSections] = useState({ learn: true, bugs: false, projects: false });

  const toggleSection = (key) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isLessonActive = (id) => activeSection === "learn" && activeLesson === id;
  const isBugActive = (id) => activeSection === "bugs" && activeBug === id;
  const isProjectActive = (id) => activeSection === "projects" && activeProject === id;

  return (
    <div className="jsl-sidebar" {...rest}>
      <div className="jsl-sidebar-header">
        <h3>
          <BookIcon />
          Curriculum
        </h3>
      </div>

      {/* ─── LEARN REACT ─── */}
      <div className="jsl-sidebar-group">
        <button
          className={`jsl-sg-header ${expandedSections.learn ? "expanded" : ""}`}
          onClick={() => toggleSection("learn")}
        >
          <div className="jsl-sg-title">
            <BookIcon />
            <span>LEARN REACT</span>
          </div>
          <span className="jsl-sg-count">{progress.lessonsDone}/{progress.lessonsTotal}</span>
          <svg className="jsl-sg-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        {expandedSections.learn && (
          <div className="jsl-sg-items">
            {REACT_LESSONS.map((lesson) => (
              <button
                key={lesson.id}
                className={`jsl-si ${isLessonActive(lesson.id) ? "active" : ""} ${progress.lessons.includes(lesson.id) ? "done" : ""}`}
                onClick={() => onSelectLesson(lesson.id)}
              >
                <span className="jsl-si-num">{lesson.chapter}.</span>
                <span className="jsl-si-title">{lesson.title}</span>
                <span className={`jsl-si-level ${lesson.level.toLowerCase()}`}>{lesson.level[0]}</span>
                {progress.lessons.includes(lesson.id) && <span className="jsl-si-check"><CheckIcon /></span>}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ─── FIX THE BUG ─── */}
      <div className="jsl-sidebar-group">
        <button
          className={`jsl-sg-header ${expandedSections.bugs ? "expanded" : ""}`}
          onClick={() => toggleSection("bugs")}
        >
          <div className="jsl-sg-title">
            <BugIcon />
            <span>FIX THE BUG</span>
          </div>
          <span className="jsl-sg-count">{progress.bugsDone}/{progress.bugsTotal}</span>
          <svg className="jsl-sg-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        {expandedSections.bugs && (
          <div className="jsl-sg-items">
            {REACT_BUG_CHALLENGES.map((bug) => (
              <button
                key={bug.id}
                className={`jsl-si ${isBugActive(bug.id) ? "active" : ""} ${progress.bugs.includes(bug.id) ? "done" : ""}`}
                onClick={() => onSelectBug(bug.id)}
              >
                <span className="jsl-si-num">{bug.title.split(".")[0]}.</span>
                <span className="jsl-si-title">{bug.title.split(". ")[1] || bug.title}</span>
                {progress.bugs.includes(bug.id) && <span className="jsl-si-check"><CheckIcon /></span>}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ─── MINI PROJECTS ─── */}
      <div className="jsl-sidebar-group">
        <button
          className={`jsl-sg-header ${expandedSections.projects ? "expanded" : ""}`}
          onClick={() => toggleSection("projects")}
        >
          <div className="jsl-sg-title">
            <ProjectIcon />
            <span>MINI PROJECTS</span>
          </div>
          <span className="jsl-sg-count">{progress.projectsDone}/{progress.projectsTotal}</span>
          <svg className="jsl-sg-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        {expandedSections.projects && (
          <div className="jsl-sg-items">
            {REACT_MINI_PROJECTS.map((proj) => (
              <button
                key={proj.id}
                className={`jsl-si ${isProjectActive(proj.id) ? "active" : ""} ${progress.projects.includes(proj.id) ? "done" : ""}`}
                onClick={() => onSelectProject(proj.id)}
              >
                <span className="jsl-si-num">{proj.title.split(".")[0]}.</span>
                <span className="jsl-si-title">{proj.title.split(". ")[1] || proj.title}</span>
                {progress.projects.includes(proj.id) && <span className="jsl-si-check"><CheckIcon /></span>}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── MAIN PLATFORM ───

export default function ReactLabsPlatform() {
  const [view, setView] = useState("learn");
  const [activeLesson, setActiveLesson] = useState(REACT_LESSONS[0]?.id || null);
  const [activeBug, setActiveBug] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState([]);
  const [testResults, setTestResults] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [monacoTheme, setMonacoTheme] = useState("jsl-dark");
  const [progress, setProgress] = useState({ lessons: [], bugs: [], projects: [] });
  const [isRunning, setIsRunning] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);
  const editorRef = useRef(null);
  const codeVersionRef = useRef(0);
  const editorPanelRef = useRef(null);
  const contentPanelRef = useRef(null);
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const [contentRatio, setContentRatio] = useState(0.45);
  const [previewHeight, setPreviewHeight] = useState(240);
  const [consoleHeight, setConsoleHeight] = useState(120);
  const [testHeight, setTestHeight] = useState(100);
  const bodyRef = useRef(null);
  const workspaceRef = useRef(null);

  // Set up React globals for transpiled code execution
  useEffect(() => {
    // We need these as globals so code executed via new Function() can access them
    window.React = React;
    window.ReactDOM = { createRoot };
    window.useState = useState;
    window.useEffect = useEffect;
    window.useRef = useRef;
    window.useMemo = useMemo;
    window.useCallback = useCallback;
    window.useReducer = useReducer;
    window.useContext = useContext;
    window.createContext = createContext;

    return () => {
      // Cleanup on unmount
      delete window.React;
      delete window.ReactDOM;
      delete window.useState;
      delete window.useEffect;
      delete window.useRef;
      delete window.useMemo;
      delete window.useCallback;
      delete window.useReducer;
      delete window.useContext;
      delete window.createContext;
    };
  }, []);

  // Load progress from sessionStorage
  useEffect(() => {
    try {
      const stored = JSON.parse(sessionStorage.getItem("rl-progress") || '{"lessons":[],"bugs":[],"projects":[]}');
      setProgress(stored);
    } catch { /* ignore */ }
  }, []);

  // Save progress
  const saveProgress = useCallback((newProgress) => {
    setProgress(newProgress);
    try {
      sessionStorage.setItem("rl-progress", JSON.stringify(newProgress));
    } catch { /* ignore */ }
  }, []);

  const markLessonDone = useCallback((id) => {
    if (!progress.lessons.includes(id)) {
      const next = { ...progress, lessons: [...progress.lessons, id] };
      saveProgress(next);
    }
  }, [progress, saveProgress]);

  const markBugDone = useCallback((id) => {
    if (!progress.bugs.includes(id)) {
      const next = { ...progress, bugs: [...progress.bugs, id] };
      saveProgress(next);
    }
  }, [progress, saveProgress]);

  const markProjectDone = useCallback((id) => {
    if (!progress.projects.includes(id)) {
      const next = { ...progress, projects: [...progress.projects, id] };
      saveProgress(next);
    }
  }, [progress, saveProgress]);

  // Progress stats
  const progressStats = useMemo(() => ({
    lessonsDone: progress.lessons.length,
    lessonsTotal: REACT_LESSONS.length,
    bugsDone: progress.bugs.length,
    bugsTotal: REACT_BUG_CHALLENGES.length,
    projectsDone: progress.projects.length,
    projectsTotal: REACT_MINI_PROJECTS.length,
    total: progress.lessons.length + progress.bugs.length + progress.projects.length,
    totalAll: REACT_LESSONS.length + REACT_BUG_CHALLENGES.length + REACT_MINI_PROJECTS.length,
    pct: Math.round(((progress.lessons.length + progress.bugs.length + progress.projects.length) / (REACT_LESSONS.length + REACT_BUG_CHALLENGES.length + REACT_MINI_PROJECTS.length)) * 100),
    lessons: progress.lessons,
    bugs: progress.bugs,
    projects: progress.projects,
  }), [progress]);

  // Get current content
  const currentLesson = useMemo(() => REACT_LESSONS.find(l => l.id === activeLesson), [activeLesson]);
  const currentBug = useMemo(() => REACT_BUG_CHALLENGES.find(b => b.id === activeBug), [activeBug]);
  const currentProject = useMemo(() => REACT_MINI_PROJECTS.find(p => p.id === activeProject), [activeProject]);

  // Switch to a lesson and set its code synchronously
  const selectLesson = (id) => {
    const lesson = REACT_LESSONS.find(l => l.id === id);
    if (!lesson) return;
    setView("learn");
    setActiveLesson(id);
    setActiveBug(null);
    setActiveProject(null);
    setCode(lesson.starterCode);
    setShowHint(false);
    setShowSolution(false);
    setOutput([]);
    setTestResults([]);
    codeVersionRef.current++;
    setPreviewKey(prev => prev + 1);
  };

  const selectBug = (id) => {
    const bug = REACT_BUG_CHALLENGES.find(b => b.id === id);
    if (!bug) return;
    setView("bugs");
    setActiveLesson(null);
    setActiveBug(id);
    setActiveProject(null);
    setCode(bug.brokenCode);
    setShowHint(false);
    setShowSolution(false);
    setOutput([]);
    setTestResults([]);
    codeVersionRef.current++;
    setPreviewKey(prev => prev + 1);
  };

  const selectProject = (id) => {
    const proj = REACT_MINI_PROJECTS.find(p => p.id === id);
    if (!proj) return;
    setView("projects");
    setActiveLesson(null);
    setActiveBug(null);
    setActiveProject(id);
    setCode(proj.starterCode);
    setShowHint(false);
    setShowSolution(false);
    setOutput([]);
    setTestResults([]);
    codeVersionRef.current++;
    setPreviewKey(prev => prev + 1);
  };

  // Define and register custom syntax highlighting themes
  const defineThemes = useCallback((monaco) => {
    // Dark Theme
    monaco.editor.defineTheme("jsl-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "64748b", fontStyle: "italic" },
        { token: "keyword", foreground: "a78bfa" },
        { token: "keyword.control", foreground: "a78bfa" },
        { token: "keyword.operator", foreground: "60a5fa" },
        { token: "string", foreground: "34d399" },
        { token: "number", foreground: "f59e0b" },
        { token: "type", foreground: "2dd4bf" },
        { token: "type.identifier", foreground: "2dd4bf" },
        { token: "type.builtin", foreground: "2dd4bf" },
        { token: "builtin", foreground: "2dd4bf" },
        { token: "function", foreground: "60a5fa" },
        { token: "function.declaration", foreground: "60a5fa" },
        { token: "method", foreground: "60a5fa" },
        { token: "variable", foreground: "e2e8f0" },
        { token: "variable.other.readwrite", foreground: "e2e8f0" },
        { token: "variable.parameter", foreground: "fbbf24" },
        { token: "property", foreground: "e2e8f0" },
        { token: "parameter", foreground: "fbbf24" },
        { token: "regexp", foreground: "f472b6" },
        { token: "delimiter", foreground: "94a3b8" },
        { token: "delimiter.bracket", foreground: "94a3b8" },
        { token: "delimiter.square", foreground: "94a3b8" },
        { token: "delimiter.parenthesis", foreground: "94a3b8" },
        { token: "delimiter.curly", foreground: "cbd5e1" },
        { token: "tag", foreground: "a78bfa" },
        { token: "attribute.name", foreground: "60a5fa" },
        { token: "attribute.value", foreground: "34d399" },
        { token: "metatag", foreground: "a78bfa" },
        { token: "metatag.content", foreground: "e2e8f0" },
        { token: "namespace", foreground: "2dd4bf" },
        { token: "constant", foreground: "f59e0b" },
        { token: "constant.language", foreground: "a78bfa" },
        { token: "constant.numeric", foreground: "f59e0b" },
        { token: "boolean", foreground: "a78bfa" },
        { token: "null", foreground: "f59e0b" },
        { token: "undefined", foreground: "94a3b8" },
        { token: "this", foreground: "a78bfa", fontStyle: "italic" },
        { token: "super", foreground: "a78bfa", fontStyle: "italic" },
        { token: "class", foreground: "f472b6" },
        { token: "identifier", foreground: "e2e8f0" },
        { token: "operator", foreground: "60a5fa" },
        { token: "string.key.json", foreground: "34d399" },
        { token: "string.value.json", foreground: "e2e8f0" },
        { token: "keyword.json", foreground: "a78bfa" },
      ],
      colors: {
        "editor.background": "#0a0f1e",
        "editor.foreground": "#e2e8f0",
        "editor.lineHighlightBackground": "#0d1525",
        "editor.selectionBackground": "rgba(96,165,250,0.25)",
        "editor.inactiveSelectionBackground": "rgba(96,165,250,0.08)",
        "editorCursor.foreground": "#60a5fa",
        "editorLineNumber.foreground": "#475569",
        "editorLineNumber.activeForeground": "#94a3b8",
        "editor.selectionHighlightBackground": "rgba(96,165,250,0.12)",
        "editorBracketMatch.background": "rgba(96,165,250,0.15)",
        "editorBracketMatch.border": "rgba(96,165,250,0.3)",
        "editorBracketHighlight.foreground1": "#60a5fa",
        "editorBracketHighlight.foreground2": "#a78bfa",
        "editorBracketHighlight.foreground3": "#34d399",
        "editorBracketHighlight.foreground4": "#f59e0b",
        "editorBracketHighlight.foreground5": "#f472b6",
        "editorBracketHighlight.foreground6": "#2dd4bf",
        "editorBracketPairGuide.activeBackground1": "rgba(96,165,250,0.08)",
        "editorBracketPairGuide.activeBackground2": "rgba(167,139,250,0.08)",
        "editorBracketPairGuide.activeBackground3": "rgba(52,211,153,0.08)",
        "editorIndentGuide.background": "rgba(255,255,255,0.03)",
        "editorIndentGuide.activeBackground": "rgba(255,255,255,0.06)",
        "editorWidget.background": "#0f172a",
        "editorWidget.border": "rgba(255,255,255,0.06)",
        "editorSuggestWidget.background": "#0f172a",
        "editorSuggestWidget.border": "rgba(255,255,255,0.06)",
        "editorSuggestWidget.selectedBackground": "rgba(96,165,250,0.1)",
        "editorSuggestWidget.foreground": "#e2e8f0",
        "editorHoverWidget.background": "#0f172a",
        "editorHoverWidget.border": "rgba(255,255,255,0.06)",
        "editorError.foreground": "#f87171",
        "editorWarning.foreground": "#fbbf24",
        "editorInfo.foreground": "#60a5fa",
        "editorGutter.background": "#0a0f1e",
        "editorRuler.foreground": "rgba(255,255,255,0.04)",
        "editorWhitespace.foreground": "rgba(255,255,255,0.04)",
        "minimap.background": "#0a0f1e",
        "scrollbar.shadow": "transparent",
        "scrollbarSlider.background": "rgba(255,255,255,0.06)",
        "scrollbarSlider.hoverBackground": "rgba(255,255,255,0.1)",
        "scrollbarSlider.activeBackground": "rgba(255,255,255,0.15)",
        "diffEditor.insertedTextBackground": "rgba(34,197,94,0.06)",
        "diffEditor.removedTextBackground": "rgba(239,68,68,0.06)",
        "focusBorder": "rgba(96,165,250,0.3)",
      },
    });

    // Light Theme
    monaco.editor.defineTheme("jsl-light", {
      base: "vs",
      inherit: true,
      rules: [
        { token: "comment", foreground: "94a3b8", fontStyle: "italic" },
        { token: "keyword", foreground: "7c3aed" },
        { token: "keyword.control", foreground: "7c3aed" },
        { token: "keyword.operator", foreground: "2563eb" },
        { token: "string", foreground: "059669" },
        { token: "number", foreground: "d97706" },
        { token: "type", foreground: "0891b2" },
        { token: "builtin", foreground: "0891b2" },
        { token: "function", foreground: "2563eb" },
        { token: "method", foreground: "2563eb" },
        { token: "variable", foreground: "1e293b" },
        { token: "variable.parameter", foreground: "d97706" },
        { token: "property", foreground: "1e293b" },
        { token: "regexp", foreground: "db2777" },
        { token: "delimiter", foreground: "64748b" },
        { token: "delimiter.curly", foreground: "475569" },
        { token: "tag", foreground: "7c3aed" },
        { token: "attribute.name", foreground: "2563eb" },
        { token: "attribute.value", foreground: "059669" },
        { token: "metatag", foreground: "7c3aed" },
        { token: "constant", foreground: "d97706" },
        { token: "boolean", foreground: "7c3aed" },
        { token: "null", foreground: "d97706" },
        { token: "this", foreground: "7c3aed", fontStyle: "italic" },
        { token: "class", foreground: "db2777" },
        { token: "identifier", foreground: "1e293b" },
        { token: "operator", foreground: "2563eb" },
      ],
      colors: {
        "editor.background": "#ffffff",
        "editor.foreground": "#1e293b",
        "editor.lineHighlightBackground": "#f8fafc",
        "editor.selectionBackground": "rgba(37,99,235,0.15)",
        "editor.inactiveSelectionBackground": "rgba(37,99,235,0.06)",
        "editorCursor.foreground": "#2563eb",
        "editorLineNumber.foreground": "#94a3b8",
        "editorLineNumber.activeForeground": "#64748b",
        "editor.selectionHighlightBackground": "rgba(37,99,235,0.08)",
        "editorBracketMatch.background": "rgba(37,99,235,0.1)",
        "editorBracketMatch.border": "rgba(37,99,235,0.2)",
        "editorBracketHighlight.foreground1": "#2563eb",
        "editorBracketHighlight.foreground2": "#7c3aed",
        "editorBracketHighlight.foreground3": "#059669",
        "editorBracketHighlight.foreground4": "#d97706",
        "editorBracketHighlight.foreground5": "#db2777",
        "editorBracketHighlight.foreground6": "#0891b2",
        "editorBracketPairGuide.activeBackground1": "rgba(37,99,235,0.05)",
        "editorBracketPairGuide.activeBackground2": "rgba(124,58,237,0.05)",
        "editorBracketPairGuide.activeBackground3": "rgba(5,150,105,0.05)",
        "editorIndentGuide.background": "rgba(0,0,0,0.05)",
        "editorIndentGuide.activeBackground": "rgba(0,0,0,0.1)",
        "editorWidget.background": "#ffffff",
        "editorWidget.border": "rgba(0,0,0,0.08)",
        "editorSuggestWidget.background": "#ffffff",
        "editorSuggestWidget.border": "rgba(0,0,0,0.08)",
        "editorSuggestWidget.selectedBackground": "rgba(37,99,235,0.06)",
        "editorError.foreground": "#ef4444",
        "editorWarning.foreground": "#f59e0b",
        "editorInfo.foreground": "#3b82f6",
        "editorGutter.background": "#ffffff",
        "editorRuler.foreground": "rgba(0,0,0,0.05)",
        "editorWhitespace.foreground": "rgba(0,0,0,0.06)",
        "scrollbar.shadow": "transparent",
        "scrollbarSlider.background": "rgba(0,0,0,0.06)",
        "scrollbarSlider.hoverBackground": "rgba(0,0,0,0.1)",
        "scrollbarSlider.activeBackground": "rgba(0,0,0,0.15)",
        "focusBorder": "rgba(37,99,235,0.3)",
      },
    });
  }, []);

  // Store Monaco editor instance, register themes
  const handleEditorMount = useCallback((editor, monaco) => {
    editorRef.current = editor;
    defineThemes(monaco);
    monaco.editor.setTheme(monacoTheme);

    const remeasure = () => { try { editor.remeasureFonts(); } catch {} };
    setTimeout(remeasure, 50);
    setTimeout(remeasure, 500);
    setTimeout(remeasure, 1500);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(remeasure);
    }
  }, [defineThemes, monacoTheme]);

  // Re-measure fonts on window resize
  useEffect(() => {
    const onResize = () => { if (editorRef.current) { try { editorRef.current.remeasureFonts(); } catch {} } };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Memoize onChange to prevent unnecessary re-renders
  const handleCodeChange = useCallback((v) => {
    setCode(v || "");
  }, []);

  // Drag handlers for resizable panels
  const handleSidebarDrag = useCallback(({ clientX }) => {
    if (!bodyRef.current) return;
    const bodyLeft = bodyRef.current.getBoundingClientRect().left;
    setSidebarWidth(Math.max(180, Math.min(500, clientX - bodyLeft)));
  }, []);

  const handleContentDrag = useCallback(({ clientX }) => {
    if (!workspaceRef.current) return;
    const rect = workspaceRef.current.getBoundingClientRect();
    setContentRatio(Math.max(0.2, Math.min(0.8, (clientX - rect.left) / rect.width)));
  }, []);

  const handlePreviewDrag = useCallback(({ clientY }) => {
    if (!editorPanelRef.current) return;
    const rect = editorPanelRef.current.getBoundingClientRect();
    const consoleTop = rect.bottom - consoleHeight;
    const maxH = rect.height * 0.6;
    const newHeight = Math.max(80, Math.min(maxH, consoleTop - clientY));
    setPreviewHeight(newHeight);
  }, [consoleHeight]);

  const handleConsoleDrag = useCallback(({ clientY }) => {
    if (!editorPanelRef.current) return;
    const rect = editorPanelRef.current.getBoundingClientRect();
    const maxH = rect.height * 0.5;
    const newHeight = Math.max(80, Math.min(maxH, rect.bottom - clientY));
    setConsoleHeight(newHeight);
  }, []);

  const handleTestDrag = useCallback(({ clientY }) => {
    if (!contentPanelRef.current) return;
    const rect = contentPanelRef.current.getBoundingClientRect();
    const maxH = rect.height * 0.4;
    const newHeight = Math.max(60, Math.min(maxH, rect.bottom - clientY));
    setTestHeight(newHeight);
  }, []);

  const goNextLesson = () => {
    const idx = REACT_LESSONS.findIndex(l => l.id === activeLesson);
    if (idx < REACT_LESSONS.length - 1) selectLesson(REACT_LESSONS[idx + 1].id);
  };

  const goPrevLesson = () => {
    const idx = REACT_LESSONS.findIndex(l => l.id === activeLesson);
    if (idx > 0) selectLesson(REACT_LESSONS[idx - 1].id);
  };

  const goNextBug = () => {
    const idx = REACT_BUG_CHALLENGES.findIndex(b => b.id === activeBug);
    if (idx < REACT_BUG_CHALLENGES.length - 1) selectBug(REACT_BUG_CHALLENGES[idx + 1].id);
  };

  const goPrevBug = () => {
    const idx = REACT_BUG_CHALLENGES.findIndex(b => b.id === activeBug);
    if (idx > 0) selectBug(REACT_BUG_CHALLENGES[idx - 1].id);
  };

  // Run code & preview
  const runCode = useCallback(() => {
    setIsRunning(true);
    setOutput([]);
    const logs = [];
    const origLog = console.log, origErr = console.error, origWarn = console.warn;

    console.log = (...args) => {
      const text = args.map(a => typeof a === "object" ? JSON.stringify(a, null, 2) : String(a)).join(" ");
      logs.push({ type: "log", content: text });
      origLog(...args);
    };
    console.error = (...args) => {
      logs.push({ type: "error", content: args.join(" ") });
      origErr(...args);
    };
    console.warn = (...args) => {
      logs.push({ type: "warn", content: args.join(" ") });
      origWarn(...args);
    };

    try {
      // Strip imports (they'd become require() calls that fail outside modules)
      // then transpile JSX to JS
      const transpiled = transpileReactCode(code);

      // Execute in a scope with React globals
      const deps = [
        'React', 'ReactDOM', 'useState', 'useEffect', 'useRef',
        'useMemo', 'useCallback', 'useReducer', 'useContext', 'createContext'
      ];
      const vals = [
        window.React, window.ReactDOM, window.useState, window.useEffect, window.useRef,
        window.useMemo, window.useCallback, window.useReducer, window.useContext, window.createContext
      ];
      const fn = new Function(...deps, transpiled);
      fn(...vals);
      if (logs.length === 0) logs.push({ type: "info", content: "✓ Code executed successfully" });
      setOutput(logs);
    } catch (e) {
      logs.push({ type: "error", content: `✗ ${e.message}` });
      setOutput(logs);
    } finally {
      console.log = origLog; console.error = origErr; console.warn = origWarn;
      setIsRunning(false);
      setPreviewKey(prev => prev + 1);
    }
  }, [code]);

  // Run tests
  const runTests = useCallback(() => {
    const tests = view === "learn" ? currentLesson?.tests || []
      : view === "bugs" ? currentBug?.tests || []
      : currentProject?.tests || [];

    const results = tests.map((test, i) => {
      try {
        const passed = test.validate(code);
        return { index: i, name: test.name, passed, error: passed ? null : `Expected: ${test.name}` };
      } catch (e) {
        return { index: i, name: test.name, passed: false, error: e?.message || `Expected: ${test.name}` };
      }
    });

    setTestResults(results);

    // Auto-mark as done if all tests pass
    const allPassed = results.length > 0 && results.every(r => r.passed);
    if (allPassed) {
      if (view === "learn" && currentLesson) markLessonDone(currentLesson.id);
      else if (view === "bugs" && currentBug) markBugDone(currentBug.id);
      else if (view === "projects" && currentProject) markProjectDone(currentProject.id);
    }
  }, [code, view, currentLesson, currentBug, currentProject, markLessonDone, markBugDone, markProjectDone]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        runCode();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [runCode]);

  const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");

  // Get editor content for current view
  const currentContent = useMemo(() => {
    if (view === "learn") return currentLesson;
    if (view === "bugs") return currentBug;
    if (view === "projects") return currentProject;
    return null;
  }, [view, currentLesson, currentBug, currentProject]);

  // Get tests for current view (always show what tests exist)
  const currentTests = useMemo(() => {
    if (view === "learn") return currentLesson?.tests || [];
    if (view === "bugs") return currentBug?.tests || [];
    if (view === "projects") return currentProject?.tests || [];
    return [];
  }, [view, currentLesson, currentBug, currentProject]);

  if (!currentContent) {
    return (
      <div className="jsl-platform">
        <div className="jsl-empty">
          <h2>Welcome to React Labs</h2>
          <p>Select a lesson, bug challenge, or project from the sidebar to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="jsl-platform">
      {/* ─── Top Navigation Bar ─── */}
      <div className="jsl-topbar">
        <div className="jsl-topbar-left">
          <a href={`${base}practice`} className="jsl-top-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Labs
          </a>
          <div className="jsl-top-brand">              <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="8" fill="#2563eb" />
              <text x="14" y="19" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">RE</text>
            </svg>
            <span className="jsl-top-title">React Labs</span>
          </div>
        </div>
        <div className="jsl-topbar-center">
          <span className="jsl-top-progress-text">{progressStats.total}/{progressStats.totalAll} completed</span>
          <div className="jsl-top-progress-bar"><div className="jsl-top-progress-fill" style={{ width: `${progressStats.pct}%` }} /></div>
          <span className="jsl-top-percent">{progressStats.pct}%</span>
        </div>
        <div className="jsl-topbar-right">
          {/* View-specific action buttons */}
          {currentContent && (
            <>
              {(view === "learn" || view === "bugs") && (
                <button className="jsl-btn-ghost jsl-btn-topbar" onClick={() => setShowHint(h => !h)}>
                  {showHint ? "Hide Hint" : "💡 Hint"}
                </button>
              )}
              <button className="jsl-btn-ghost jsl-btn-topbar" onClick={() => setShowSolution(s => !s)}>
                {showSolution ? "Hide Solution" : "🔍 Solution"}
              </button>
              {view === "learn" && currentLesson && (
                <button className={`jsl-btn-mark jsl-btn-topbar ${progress.lessons.includes(currentLesson.id) ? "done" : ""}`}
                  onClick={() => markLessonDone(currentLesson.id)}>
                  {progress.lessons.includes(currentLesson.id) ? "✓ Completed" : "Mark Complete"}
                </button>
              )}
              {view === "bugs" && currentBug && (
                <button className={`jsl-btn-mark jsl-btn-topbar ${progress.bugs.includes(currentBug.id) ? "done" : ""}`}
                  onClick={() => markBugDone(currentBug.id)}>
                  {progress.bugs.includes(currentBug.id) ? "✓ Fixed" : "Mark Fixed"}
                </button>
              )}
              {view === "projects" && currentProject && (
                <button className={`jsl-btn-mark jsl-btn-topbar ${progress.projects.includes(currentProject.id) ? "done" : ""}`}
                  onClick={() => markProjectDone(currentProject.id)}>
                  {progress.projects.includes(currentProject.id) ? "✓ Completed" : "Mark Complete"}
                </button>
              )}
            </>
          )}
          <ThemeToggle />
          <button className="jsl-btn-icon" onClick={() => setMonacoTheme(t => t === "jsl-dark" ? "jsl-light" : "jsl-dark")} title="Toggle theme">
            {monacoTheme === "jsl-dark" ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
            )}
          </button>
        </div>
      </div>

      {/* ─── Main Layout ─── */}
      <div className="jsl-main">
        <div className="jsl-body" ref={bodyRef}>
        {/* Sidebar */}
        <ReactSidebar
          activeSection={view}
          activeLesson={activeLesson}
          activeBug={activeBug}
          activeProject={activeProject}
          onSelectLesson={selectLesson}
          onSelectBug={selectBug}
          onSelectProject={selectProject}
          progress={progressStats}
          style={{ width: sidebarWidth }}
        />
        <ResizableHandle onDrag={handleSidebarDrag} />

        {/* Content & Editor */}
        <div className="jsl-workspace" ref={workspaceRef}>
          {/* Content Panel (now includes tests and console at bottom) */}
          <div className="jsl-content-panel" ref={contentPanelRef} style={{ flex: `${contentRatio} 1 0` }}>
            <div className="jsl-content-scroll">
              {view === "learn" && currentLesson && (
                <LessonView
                  lesson={currentLesson}
                  showHint={showHint}
                  showSolution={showSolution}
                  onPrev={goPrevLesson}
                  onNext={goNextLesson}
                  hasPrev={REACT_LESSONS.findIndex(l => l.id === activeLesson) > 0}
                  hasNext={REACT_LESSONS.findIndex(l => l.id === activeLesson) < REACT_LESSONS.length - 1}
                />
              )}
              {view === "bugs" && currentBug && (
                <BugView
                  bug={currentBug}
                  showHint={showHint}
                  showSolution={showSolution}
                  onPrev={goPrevBug}
                  onNext={goNextBug}
                  hasPrev={REACT_BUG_CHALLENGES.findIndex(b => b.id === activeBug) > 0}
                  hasNext={REACT_BUG_CHALLENGES.findIndex(b => b.id === activeBug) < REACT_BUG_CHALLENGES.length - 1}
                />
              )}
              {view === "projects" && currentProject && (
                <ProjectView
                  project={currentProject}
                  showSolution={showSolution}
                />
              )}
            </div>
            {/* Resizable Automated Tests (in content panel) */}
            <ResizableHandle onDrag={handleTestDrag} orientation="horizontal" />
            <div className="jsl-tests-panel" style={{ height: testHeight, maxHeight: testHeight, minHeight: testHeight, flexShrink: 0 }}>
              <div className="jsl-tests-header">
                <span className="jsl-tests-title">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 11 12 14 22 4"/>
                    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                  </svg>
                  Automated Tests
                </span>
                <div className="jsl-tests-actions">
                  {testResults.length > 0 && (
                    <span className={`jsl-tests-score ${testResults.filter(r => r.passed).length === currentTests.length ? "all-pass" : ""}`}>
                      {testResults.filter(r => r.passed).length}/{currentTests.length} Passed
                    </span>
                  )}
                  <button className="jsl-btn-secondary jsl-btn-sm" onClick={runTests}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>
                    Run Tests
                  </button>
                </div>
              </div>
              <div className="jsl-tests-body">
                {currentTests.length === 0 ? (
                  <div className="jsl-tests-empty">No automated tests for this section</div>
                ) : (
                  currentTests.map((test, i) => {
                    const result = testResults.find(r => r.index === i);
                    const passed = result?.passed;
                    const hasResult = result !== undefined;
                    return (
                      <div key={i} className={`jsl-test-item ${hasResult ? (passed ? "pass" : "fail") : "pending"}`}>
                        <span className="jsl-test-icon">
                          {hasResult ? (passed ? "✓" : "✗") : "○"}
                        </span>
                        <span className="jsl-test-name">{test.name}</span>
                        {hasResult && !passed && result?.error && (
                          <span className="jsl-test-error">{result.error}</span>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Editor & Preview Panel */}
          <ResizableHandle onDrag={handleContentDrag} />
          <div className="jsl-editor-panel" ref={editorPanelRef} style={{ flex: `${1 - contentRatio} 1 0` }}>
            {/* Editor Toolbar */}
            <div className="jsl-editor-actions">
              <button className="jsl-btn-run" onClick={runCode} disabled={isRunning} title="Ctrl+Enter to run">
                {isRunning ? (
                  <><span className="jsl-spinner" /> Running</>
                ) : (
                  <><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg> Run</>
                )}
              </button>
              <button className="jsl-btn-secondary" onClick={() => {
                let starter = "";
                if (view === "learn" && currentLesson) starter = currentLesson.starterCode;
                else if (view === "bugs" && currentBug) starter = currentBug.brokenCode;
                else if (view === "projects" && currentProject) starter = currentProject.starterCode;
                if (editorRef.current) {
                  editorRef.current.setValue(starter);
                }
                setCode(starter);
                setOutput([]);
                setTestResults([]);
                codeVersionRef.current++;
                setPreviewKey(prev => prev + 1);
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
                Reset
              </button>
              <span className="jsl-editor-shortcut">Ctrl+Enter to run</span>
            </div>

            {/* Editor */}
            <div className="jsl-editor-wrapper">
              <Editor
                key={`${codeVersionRef.current}`}
                height="100%"
                language="javascript"
                theme={monacoTheme}
                value={code}
                onChange={handleCodeChange}
                onMount={handleEditorMount}
                options={{
                  fontSize: 13,
                  fontFamily: "Consolas, 'Courier New', monospace",
                  fontLigatures: false,
                  letterSpacing: 0,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  lineNumbers: "on",
                  tabSize: 2,
                  insertSpaces: true,
                  wordWrap: "on",
                  automaticLayout: true,
                  bracketPairColorization: { enabled: true },
                  padding: { top: 12, bottom: 12 },
                  cursorBlinking: "smooth",
                  smoothScrolling: true,
                  folding: true,
                  lineNumbersMinChars: 3,
                }}
              />
            </div>

            {/* Resizable Preview Panel (React-specific) */}
            <ResizableHandle onDrag={handlePreviewDrag} orientation="horizontal" />
            <ReactPreview code={code} previewKey={previewKey} style={{ height: previewHeight }} />

            {/* Resizable Console Output (in editor panel, below preview) */}
            <ResizableHandle onDrag={handleConsoleDrag} orientation="horizontal" />
            <div className="jsl-console-panel" style={{ height: consoleHeight, maxHeight: consoleHeight, minHeight: consoleHeight, flexShrink: 0 }}>
              <div className="jsl-console-header">
                <span>Console Output</span>
                <span className="jsl-console-count">{output.length} lines</span>
              </div>
              <div className="jsl-console-body">
                {output.length === 0 ? (
                  <div className="jsl-console-empty">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    <p>Run your code to see output</p>
                  </div>
                ) : (
                  output.map((line, i) => (
                    <div key={i} className={`jsl-console-line jsl-console-${line.type}`}>
                      <span className="jsl-console-marker">
                        {line.type === "log" && "▸"}
                        {line.type === "warn" && "⚠"}
                        {line.type === "error" && "✗"}
                        {line.type === "info" && "ℹ"}
                        {line.type === "result" && "›"}
                      </span>
                      <pre>{line.content}</pre>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="jsl-footer">
        <div className="jsl-footer-inner">
          <p>Built by <strong>Prathamesh Pawar</strong></p>
        </div>
      </footer>
    </div>
  );
}

// ─── LESSON VIEW ───

function LessonView({ lesson, showHint, showSolution, onPrev, onNext, hasPrev, hasNext }) {
  const levelColor = lesson.level === "Beginner" ? "#22c55e" : lesson.level === "Intermediate" ? "#f59e0b" : "#ef4444";

  return (
    <div className="jsl-content-inner">
      <div className="jsl-chapter-header">
        <span className="jsl-chapter-badge">Chapter {lesson.chapter}</span>
        <h2 className="jsl-content-title">{lesson.title}</h2>
        <div className="jsl-chapter-meta">
          <span className="jsl-diff-badge" style={{ color: levelColor, borderColor: `${levelColor}33`, background: `${levelColor}15` }}>{lesson.level}</span>
          <div className="jsl-tags">
            {lesson.tags.map(t => <span key={t} className="jsl-tag">{t}</span>)}
          </div>
        </div>
      </div>

      {/* Concept Explanation */}
      <div className="jsl-section">
        <h3 className="jsl-section-title">Concept</h3>
        <div className="jsl-concept-text">
          {lesson.conceptExplanation.split("\n").map((line, i) => {
            if (line.startsWith("•")) return <li key={i} className="jsl-bullet">{line.slice(2)}</li>;
            if (line.trim() === "") return <br key={i} />;
            return <p key={i}>{line}</p>;
          })}
        </div>
      </div>

      {/* Key Rules */}
      <div className="jsl-section jsl-rules-section">
        <h3 className="jsl-section-title">Key Rules</h3>
        <ul className="jsl-rules-list">
          {lesson.keyRules.map((rule, i) => (
            <li key={i} className="jsl-rule-item">{rule}</li>
          ))}
        </ul>
      </div>

      {/* Your Task */}
      <div className="jsl-section jsl-task-section">
        <h3 className="jsl-section-title">Your Task</h3>
        <div className="jsl-task-text">
          {lesson.task.split("\n").map((line, i) => {
            if (line.trim().startsWith("-") || line.trim().match(/^\d+\./)) {
              return <li key={i} className="jsl-task-item">{line.replace(/^[\d.]*\s*/, "").replace(/^-/, "").trim()}</li>;
            }
            return <p key={i}>{line}</p>;
          })}
        </div>
      </div>

      {/* Hint */}
      {showHint && (
        <div className="jsl-hint-box">
          <strong>💡 Hint:</strong> {lesson.hint}
        </div>
      )}

      {/* Solution */}
      {showSolution && (
        <div className="jsl-solution-box">
          <h4>Solution</h4>
          <pre className="jsl-code-block"><code>{lesson.solutionCode}</code></pre>
        </div>
      )}

      {/* Navigation */}
      <div className="jsl-content-nav">
        <button className={`jsl-nav-btn ${!hasPrev ? "disabled" : ""}`} onClick={onPrev} disabled={!hasPrev}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
          Previous
        </button>
        <button className={`jsl-nav-btn ${!hasNext ? "disabled" : ""}`} onClick={onNext} disabled={!hasNext}>
          Next
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </div>
  );
}

// ─── BUG CHALLENGE VIEW ───

function BugView({ bug, showHint, showSolution, onPrev, onNext, hasPrev, hasNext }) {
  return (
    <div className="jsl-content-inner">
      <div className="jsl-chapter-header">
        <span className="jsl-chapter-badge bug">🐛 Debug Challenge</span>
        <h2 className="jsl-content-title">{bug.title}</h2>
      </div>

      <div className="jsl-section">
        <h3 className="jsl-section-title">Problem</h3>
        <p className="jsl-text">{bug.problem}</p>
      </div>

      <div className="jsl-section">
        <h3 className="jsl-section-title">Learning Goal</h3>
        <p className="jsl-text">{bug.learningGoal}</p>
      </div>

      <div className="jsl-section">
        <h3 className="jsl-section-title">Expected Result</h3>
        <p className="jsl-text">{bug.expectedResult}</p>
      </div>

      {showHint && (
        <div className="jsl-hint-box">
          <strong>💡 Hint:</strong> {bug.hint}
        </div>
      )}

      {showSolution && (
        <div className="jsl-solution-box">
          <h4>Solution</h4>
          <pre className="jsl-code-block"><code>{bug.solution}</code></pre>
        </div>
      )}

      <div className="jsl-content-nav">
        <button className={`jsl-nav-btn ${!hasPrev ? "disabled" : ""}`} onClick={onPrev} disabled={!hasPrev}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
          Previous
        </button>
        <button className={`jsl-nav-btn ${!hasNext ? "disabled" : ""}`} onClick={onNext} disabled={!hasNext}>
          Next
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </div>
  );
}

// ─── PROJECT VIEW ───

function ProjectView({ project, showSolution }) {
  return (
    <div className="jsl-content-inner">
      <div className="jsl-chapter-header">
        <span className="jsl-chapter-badge project">📱 Mini Project</span>
        <h2 className="jsl-content-title">{project.title}</h2>
      </div>

      <div className="jsl-section">
        <h3 className="jsl-section-title">Overview</h3>
        <p className="jsl-text">{project.overview}</p>
        <p className="jsl-text" style={{ marginTop: "0.5rem", color: "#94a3b8" }}><strong>Why?</strong> {project.why}</p>
      </div>

      <div className="jsl-section">
        <h3 className="jsl-section-title">Concepts Practiced</h3>
        <div className="jsl-tags">
          {project.concepts.map(c => <span key={c} className="jsl-tag">{c}</span>)}
        </div>
      </div>

      {/* Checklist */}
      <div className="jsl-section">
        <h3 className="jsl-section-title">Feature Checklist</h3>
        <div className="jsl-checklist">
          {project.checklist.map((item, i) => (
            <div key={i} className="jsl-checklist-item">
              <span className="jsl-checklist-box">□</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Milestones */}
      <div className="jsl-section">
        <h3 className="jsl-section-title">Milestones</h3>
        <div className="jsl-milestones">
          {project.milestones.map((m, i) => (
            <div key={i} className="jsl-milestone">
              <div className="jsl-milestone-num">{i + 1}</div>
              <div>
                <strong>{m.title}</strong>
                <p>{m.task}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showSolution && (
        <div className="jsl-solution-box">
          <h4>Solution</h4>
          <pre className="jsl-code-block"><code>{project.solution}</code></pre>
        </div>
      )}

    </div>
  );
}
