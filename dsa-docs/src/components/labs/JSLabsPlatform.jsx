import { FiArrowLeft, FiBook, FiCheck, FiCheckSquare, FiChevronDown, FiChevronLeft, FiChevronRight, FiGrid, FiMoon, FiPlay, FiRefreshCw, FiSun } from "react-icons/fi";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Editor from "@monaco-editor/react";
import { SkeletonLabPlatform } from "../Skeleton.jsx";
import { JS_LESSONS, JS_BUG_CHALLENGES, JS_MINI_PROJECTS } from "../../data/js-labs-curriculum.js";
import { DiJavascript1 } from "react-icons/di";




// ─── ICON COMPONENTS ───

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

// ─── SIDEBAR ───

function JSSidebar({ activeSection, activeLesson, activeBug, activeProject, onSelectLesson, onSelectBug, onSelectProject, progress, ...rest }) {
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
          <FiBook size={16} /> Curriculum
        </h3>
      </div>

      {/* ─── LEARN JAVASCRIPT ─── */}
      <div className="jsl-sidebar-group">
        <button
          className={`jsl-sg-header ${expandedSections.learn ? "expanded" : ""}`}
          onClick={() => toggleSection("learn")}
        >
          <div className="jsl-sg-title">
            <FiBook size={16} /><span>LEARN JAVASCRIPT</span>
          </div>
          <span className="jsl-sg-count">{progress.lessonsDone}/{progress.lessonsTotal}</span>
          <FiChevronDown size={14} />
        </button>
        {expandedSections.learn && (
          <div className="jsl-sg-items">
            {JS_LESSONS.map((lesson) => (
              <button
                key={lesson.id}
                className={`jsl-si ${isLessonActive(lesson.id) ? "active" : ""} ${progress.lessons.includes(lesson.id) ? "done" : ""}`}
                onClick={() => onSelectLesson(lesson.id)}
              >
                <span className="jsl-si-num">{lesson.chapter}.</span>
                <span className="jsl-si-title">{lesson.title}</span>
                <span className={`jsl-si-level ${lesson.level.toLowerCase()}`}>{lesson.level[0]}</span>
                {progress.lessons.includes(lesson.id) && <span className="jsl-si-check"><FiCheck size={16} /></span>}
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
            <FiBook size={16} />
            <span>FIX THE BUG</span>
          </div>
          <span className="jsl-sg-count">{progress.bugsDone}/{progress.bugsTotal}</span>
          <FiChevronDown size={14} />
        </button>
        {expandedSections.bugs && (
          <div className="jsl-sg-items">
            {JS_BUG_CHALLENGES.map((bug) => (
              <button
                key={bug.id}
                className={`jsl-si ${isBugActive(bug.id) ? "active" : ""} ${progress.bugs.includes(bug.id) ? "done" : ""}`}
                onClick={() => onSelectBug(bug.id)}
              >
                <span className="jsl-si-num">{bug.title.split(".")[0]}.</span>
                <span className="jsl-si-title">{bug.title.split(". ")[1] || bug.title}</span>
                {progress.bugs.includes(bug.id) && <span className="jsl-si-check"><FiCheck size={16} /></span>}
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
            <FiBook size={16} />
            <span>MINI PROJECTS</span>
          </div>
          <span className="jsl-sg-count">{progress.projectsDone}/{progress.projectsTotal}</span>
          <FiChevronDown size={14} />
        </button>
        {expandedSections.projects && (
          <div className="jsl-sg-items">
            {JS_MINI_PROJECTS.map((proj) => (
              <button
                key={proj.id}
                className={`jsl-si ${isProjectActive(proj.id) ? "active" : ""} ${progress.projects.includes(proj.id) ? "done" : ""}`}
                onClick={() => onSelectProject(proj.id)}
              >
                <span className="jsl-si-num">{proj.title.split(".")[0]}.</span>
                <span className="jsl-si-title">{proj.title.split(". ")[1] || proj.title}</span>
                {progress.projects.includes(proj.id) && <span className="jsl-si-check"><FiCheck size={16} /></span>}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── MAIN PLATFORM ───

export default function JSLabsPlatform() {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("learn");
  const [activeLesson, setActiveLesson] = useState(JS_LESSONS[0]?.id || null);
  const [activeBug, setActiveBug] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const [code, setCode] = useState(JS_LESSONS[0]?.starterCode || "");
  const [output, setOutput] = useState([]);
  const [testResults, setTestResults] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [monacoTheme, setMonacoTheme] = useState("jsl-dark");
  const [progress, setProgress] = useState({ lessons: [], bugs: [], projects: [] });
  const [isRunning, setIsRunning] = useState(false);
  const editorRef = useRef(null);
  const codeVersionRef = useRef(0);
  const editorPanelRef = useRef(null);
  const contentPanelRef = useRef(null);
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const [contentRatio, setContentRatio] = useState(0.5);
  const [consoleHeight, setConsoleHeight] = useState(180);
  const [testsPanelHeight, setTestsPanelHeight] = useState(130);
  const bodyRef = useRef(null);
  const workspaceRef = useRef(null);

  // Load progress from sessionStorage
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 100);
    try {
      const stored = JSON.parse(sessionStorage.getItem("jsl-progress") || '{"lessons":[],"bugs":[],"projects":[]}');
      setProgress(stored);
    } catch { /* ignore */ }
    return () => clearTimeout(timer);
  }, []);

  // Save progress
  const saveProgress = useCallback((newProgress) => {
    setProgress(newProgress);
    try {
      sessionStorage.setItem("jsl-progress", JSON.stringify(newProgress));
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
    lessonsTotal: JS_LESSONS.length,
    bugsDone: progress.bugs.length,
    bugsTotal: JS_BUG_CHALLENGES.length,
    projectsDone: progress.projects.length,
    projectsTotal: JS_MINI_PROJECTS.length,
    total: progress.lessons.length + progress.bugs.length + progress.projects.length,
    totalAll: JS_LESSONS.length + JS_BUG_CHALLENGES.length + JS_MINI_PROJECTS.length,
    pct: Math.round(((progress.lessons.length + progress.bugs.length + progress.projects.length) / (JS_LESSONS.length + JS_BUG_CHALLENGES.length + JS_MINI_PROJECTS.length)) * 100),
    lessons: progress.lessons,
    bugs: progress.bugs,
    projects: progress.projects,
  }), [progress]);

  // Get current content
  const currentLesson = useMemo(() => JS_LESSONS.find(l => l.id === activeLesson), [activeLesson]);
  const currentBug = useMemo(() => JS_BUG_CHALLENGES.find(b => b.id === activeBug), [activeBug]);
  const currentProject = useMemo(() => JS_MINI_PROJECTS.find(p => p.id === activeProject), [activeProject]);

  // Switch to a lesson and set its code synchronously
  const selectLesson = (id) => {
    const lesson = JS_LESSONS.find(l => l.id === id);
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
  };

  const selectBug = (id) => {
    const bug = JS_BUG_CHALLENGES.find(b => b.id === id);
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
  };

  const selectProject = (id) => {
    const proj = JS_MINI_PROJECTS.find(p => p.id === id);
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
  };

  // Define and register custom syntax highlighting themes
  const defineThemes = useCallback((monaco) => {
    // ─── Dark Theme ───
    monaco.editor.defineTheme("jsl-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "64748b", fontStyle: "italic" },
        { token: "keyword", foreground: "a78bfa" },
        { token: "keyword.control", foreground: "a78bfa" },
        { token: "keyword.operator", foreground: "60a5fa" },
        { token: "string", foreground: "34d399" },
        { token: "string.quoted", foreground: "34d399" },
        { token: "string.template", foreground: "34d399" },
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
        { token: "regexp.escape", foreground: "f472b6" },
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

    // ─── Light Theme ───
    monaco.editor.defineTheme("jsl-light", {
      base: "vs",
      inherit: true,
      rules: [
        { token: "comment", foreground: "94a3b8", fontStyle: "italic" },
        { token: "keyword", foreground: "7c3aed" },
        { token: "keyword.control", foreground: "7c3aed" },
        { token: "keyword.operator", foreground: "2563eb" },
        { token: "string", foreground: "059669" },
        { token: "string.quoted", foreground: "059669" },
        { token: "string.template", foreground: "059669" },
        { token: "number", foreground: "d97706" },
        { token: "type", foreground: "0891b2" },
        { token: "type.identifier", foreground: "0891b2" },
        { token: "builtin", foreground: "0891b2" },
        { token: "function", foreground: "2563eb" },
        { token: "function.declaration", foreground: "2563eb" },
        { token: "method", foreground: "2563eb" },
        { token: "variable", foreground: "1e293b" },
        { token: "variable.other.readwrite", foreground: "1e293b" },
        { token: "variable.parameter", foreground: "d97706" },
        { token: "property", foreground: "1e293b" },
        { token: "parameter", foreground: "d97706" },
        { token: "regexp", foreground: "db2777" },
        { token: "delimiter", foreground: "64748b" },
        { token: "delimiter.bracket", foreground: "64748b" },
        { token: "delimiter.curly", foreground: "475569" },
        { token: "tag", foreground: "7c3aed" },
        { token: "attribute.name", foreground: "2563eb" },
        { token: "attribute.value", foreground: "059669" },
        { token: "metatag", foreground: "7c3aed" },
        { token: "metatag.content", foreground: "1e293b" },
        { token: "constant", foreground: "d97706" },
        { token: "constant.language", foreground: "7c3aed" },
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

  // Store Monaco editor instance, register themes, and fix cursor rendering
  const handleEditorMount = useCallback((editor, monaco) => {
    editorRef.current = editor;

    // Register custom themes
    defineThemes(monaco);
    // Apply current theme
    monaco.editor.setTheme(monacoTheme);

    const remeasure = () => {
      try {
        editor.remeasureFonts();
      } catch {}
    };

    // Multiple attempts ensure fonts are measured after loading completes
    setTimeout(remeasure, 50);
    setTimeout(remeasure, 500);
    setTimeout(remeasure, 1500);

    // Use document.fonts API for reliable font-ready detection
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(remeasure);
    }
  }, [defineThemes, monacoTheme]);

  // Re-measure fonts on window resize (e.g., panel drags)
  useEffect(() => {
    const onResize = () => {
      if (editorRef.current) {
        try { editorRef.current.remeasureFonts(); } catch {}
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Memoize onChange to prevent unnecessary re-renders affecting cursor
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

  const handleConsoleDrag = useCallback(({ clientY }) => {
    if (!editorPanelRef.current) return;
    const rect = editorPanelRef.current.getBoundingClientRect();
    const bottom = rect.bottom;
    const maxH = rect.height * 0.7;
    const newHeight = Math.max(100, Math.min(maxH, bottom - clientY));
    setConsoleHeight(newHeight);
  }, []);

  const handleTestsDrag = useCallback(({ clientY }) => {
    if (!contentPanelRef.current) return;
    const rect = contentPanelRef.current.getBoundingClientRect();
    const maxH = rect.height * 0.5;
    const newHeight = Math.max(60, Math.min(maxH, rect.bottom - clientY));
    setTestsPanelHeight(newHeight);
  }, []);

  const goNextLesson = () => {
    const idx = JS_LESSONS.findIndex(l => l.id === activeLesson);
    if (idx < JS_LESSONS.length - 1) selectLesson(JS_LESSONS[idx + 1].id);
  };

  const goPrevLesson = () => {
    const idx = JS_LESSONS.findIndex(l => l.id === activeLesson);
    if (idx > 0) selectLesson(JS_LESSONS[idx - 1].id);
  };

  const goNextBug = () => {
    const idx = JS_BUG_CHALLENGES.findIndex(b => b.id === activeBug);
    if (idx < JS_BUG_CHALLENGES.length - 1) selectBug(JS_BUG_CHALLENGES[idx + 1].id);
  };

  const goPrevBug = () => {
    const idx = JS_BUG_CHALLENGES.findIndex(b => b.id === activeBug);
    if (idx > 0) selectBug(JS_BUG_CHALLENGES[idx - 1].id);
  };

  // Run code
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
      const result = Function(code)();
      if (result !== undefined && logs.length === 0) logs.push({ type: "result", content: String(result) });
      if (logs.length === 0) logs.push({ type: "info", content: "✓ Code executed (no output)" });
      setOutput(logs);
    } catch (e) {
      logs.push({ type: "error", content: `✗ ${e.message}` });
      setOutput(logs);
    } finally {
      console.log = origLog; console.error = origErr; console.warn = origWarn;
      setIsRunning(false);
    }
  }, [code]);

  // Run tests
  const runTests = useCallback(() => {
    const tests = view === "learn" ? currentLesson?.tests || []
      : view === "bugs" ? currentBug?.tests || []
      : currentProject?.tests || [];

    try {
      new Function(code);
    } catch (e) {
      setTestResults(tests.map((test, i) => ({
        index: i,
        name: test.name,
        passed: false,
        error: `Fix syntax error first: ${e?.message || "Invalid JavaScript"}`,
      })));
      return;
    }

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

  if (loading) {
    return (
      <div className="jsl-platform">
        <SkeletonLabPlatform />
      </div>
    );
  }

  if (!currentContent) {
    return (
      <div className="jsl-platform">
        <div className="jsl-empty">
          <h2>Welcome to JavaScript Labs</h2>
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
          <a href={`${base}labs`} className="jsl-top-back">
            <FiArrowLeft size={16} />
            Labs
          </a>
          <div className="jsl-top-brand">              <DiJavascript1 size={20} color="#2563eb" />
            <span className="jsl-top-title">JavaScript Labs</span>
          </div>
        </div>
        <div className="jsl-topbar-center">
          <span className="jsl-top-progress-text">{progressStats.total}/{progressStats.totalAll} completed</span>
          <div className="jsl-top-progress-bar"><div className="jsl-top-progress-fill" style={{ width: `${progressStats.pct}%` }} /></div>
          <span className="jsl-top-percent">{progressStats.pct}%</span>
        </div>
        <div className="jsl-topbar-right">
          <button className="jsl-btn-icon" onClick={() => setMonacoTheme(t => t === "jsl-dark" ? "jsl-light" : "jsl-dark")} title="Toggle theme">
            {monacoTheme === "jsl-dark" ? (
              <FiSun size={16} />
            ) : (
              <FiMoon size={16} />
            )}
          </button>
        </div>
      </div>

      {/* ─── Main Layout ─── */}
      <div className="jsl-main">
        <div className="jsl-body" ref={bodyRef}>
        {/* Sidebar */}
        <JSSidebar
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
          {/* Content Panel */}
          <div className="jsl-content-panel" ref={contentPanelRef} style={{ flex: `${contentRatio} 1 0` }}>
            <div className="jsl-content-scroll">
              {view === "learn" && currentLesson && (
                <LessonView
                  lesson={currentLesson}
                  showHint={showHint}
                  showSolution={showSolution}
                  onToggleHint={() => setShowHint(h => !h)}
                  onToggleSolution={() => setShowSolution(s => !s)}
                  onPrev={goPrevLesson}
                  onNext={goNextLesson}
                  hasPrev={JS_LESSONS.findIndex(l => l.id === activeLesson) > 0}
                  hasNext={JS_LESSONS.findIndex(l => l.id === activeLesson) < JS_LESSONS.length - 1}
                  onMarkDone={() => markLessonDone(currentLesson.id)}
                  isDone={progress.lessons.includes(currentLesson.id)}
                  testResults={[]}
                  currentTests={[]}
                  onRunTests={runTests}
                />
              )}
              {view === "bugs" && currentBug && (
                <BugView
                  bug={currentBug}
                  showHint={showHint}
                  showSolution={showSolution}
                  onToggleHint={() => setShowHint(h => !h)}
                  onToggleSolution={() => setShowSolution(s => !s)}
                  onPrev={goPrevBug}
                  onNext={goNextBug}
                  hasPrev={JS_BUG_CHALLENGES.findIndex(b => b.id === activeBug) > 0}
                  hasNext={JS_BUG_CHALLENGES.findIndex(b => b.id === activeBug) < JS_BUG_CHALLENGES.length - 1}
                  onMarkDone={() => markBugDone(currentBug.id)}
                  isDone={progress.bugs.includes(currentBug.id)}
                  testResults={[]}
                  currentTests={[]}
                  onRunTests={runTests}
                />
              )}
              {view === "projects" && currentProject && (
                <ProjectView
                  project={currentProject}
                  showSolution={showSolution}
                  onToggleSolution={() => setShowSolution(s => !s)}
                  onMarkDone={() => markProjectDone(currentProject.id)}
                  isDone={progress.projects.includes(currentProject.id)}
                  testResults={[]}
                  currentTests={[]}
                  onRunTests={runTests}
                />
              )}
            </div>              {/* Duplicate tests panel removed — now resizable above */}
            <ResizableHandle onDrag={handleTestsDrag} orientation="horizontal" />
            <div className="jsl-tests-panel" style={{ height: testsPanelHeight, maxHeight: testsPanelHeight, minHeight: testsPanelHeight }}>
              <div className="jsl-tests-header">
                <span className="jsl-tests-title">
                  <FiCheckSquare size={14} />
                  Automated Tests
                </span>
                <div className="jsl-tests-actions">
                  {testResults.length > 0 && (
                    <span className={`jsl-tests-score ${testResults.filter(r => r.passed).length === currentTests.length ? "all-pass" : ""}`}>
                      {testResults.filter(r => r.passed).length}/{currentTests.length} Passed
                    </span>
                  )}
                  <button className="jsl-btn-secondary jsl-btn-sm" onClick={runTests}>
                    <FiRefreshCw size={12} />
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

          {/* Editor & Output Panel */}
          <ResizableHandle onDrag={handleContentDrag} />
          <div className="jsl-editor-panel" ref={editorPanelRef} style={{ flex: `${1 - contentRatio} 1 0` }}>
            {/* Editor Toolbar */}
            <div className="jsl-editor-actions">
              <button className="jsl-btn-run" onClick={runCode} disabled={isRunning} title="Ctrl+Enter to run">
                {isRunning ? (
                  <><span className="jsl-spinner" /> Running</>
                ) : (
                  <><FiPlay size={14} fill="currentColor" /> Run</>
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
              }}>
                <FiRefreshCw size={14} />
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

            {/* Resizable Console Panel (always visible below editor) */}
            <ResizableHandle onDrag={handleConsoleDrag} orientation="horizontal" />
            <div className="jsl-console-panel" style={{ height: consoleHeight, maxHeight: consoleHeight, minHeight: consoleHeight }}>
              <div className="jsl-console-header">
                <span>Console Output</span>
                <span className="jsl-console-count">{output.length} lines</span>
              </div>
              <div className="jsl-console-body">
                {output.length === 0 ? (
                  <div className="jsl-console-empty">
                    <FiPlay size={28} opacity={0.2} />
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

function LessonView({ lesson, showHint, showSolution, onToggleHint, onToggleSolution, onPrev, onNext, hasPrev, hasNext, onMarkDone, isDone, testResults, currentTests, onRunTests }) {
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
            if (line.startsWith("```")) return null;
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

      {/* Actions */}
      <div className="jsl-content-actions">
        <button className="jsl-btn-ghost" onClick={onToggleHint}>
          {showHint ? "Hide Hint" : "💡 Show Hint"}
        </button>
        <button className="jsl-btn-ghost" onClick={onToggleSolution}>
          {showSolution ? "Hide Solution" : "🔍 Show Solution"}
        </button>
        <button className={`jsl-btn-mark ${isDone ? "done" : ""}`} onClick={onMarkDone}>
          {isDone ? "✓ Completed" : "Mark Complete"}
        </button>
      </div>

      {/* Automated Tests */}
      {currentTests.length > 0 && (
        <div className="jsl-content-tests">
          <div className="jsl-content-tests-header">
            <h3 className="jsl-section-title" style={{ margin: 0 }}>Automated Tests</h3>
            <div className="jsl-content-tests-actions">
              {testResults.length > 0 && (
                <span className={`jsl-tests-score ${testResults.filter(r => r.passed).length === currentTests.length ? "all-pass" : ""}`}>
                  {testResults.filter(r => r.passed).length}/{currentTests.length} Passed
                </span>
              )}
              <button className="jsl-btn-ghost jsl-btn-sm" onClick={onRunTests}>
                <FiRefreshCw size={12} />
                Run Tests
              </button>
            </div>
          </div>
          <div className="jsl-content-tests-body">
            {currentTests.map((test, i) => {
              const result = testResults.find(r => r.index === i);
              const passed = result?.passed;
              const hasResult = result !== undefined;
              return (
                <div key={i} className={`jsl-test-item ${hasResult ? (passed ? "pass" : "fail") : "pending"}`}>
                  <span className="jsl-test-icon">{hasResult ? (passed ? "✓" : "✗") : "○"}</span>
                  <span className="jsl-test-name">{test.name}</span>
                  {hasResult && !passed && result?.error && (
                    <span className="jsl-test-error">{result.error}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="jsl-content-nav">
        <button className={`jsl-nav-btn ${!hasPrev ? "disabled" : ""}`} onClick={onPrev} disabled={!hasPrev}>
          <FiChevronLeft size={14} />
          Previous
        </button>
        <button className={`jsl-nav-btn ${!hasNext ? "disabled" : ""}`} onClick={onNext} disabled={!hasNext}>
          Next
          <FiChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

// ─── BUG CHALLENGE VIEW ───

function BugView({ bug, showHint, showSolution, onToggleHint, onToggleSolution, onPrev, onNext, hasPrev, hasNext, onMarkDone, isDone, testResults, currentTests, onRunTests }) {
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

      <div className="jsl-content-actions">
        <button className="jsl-btn-ghost" onClick={onToggleHint}>
          {showHint ? "Hide Hint" : "💡 Show Hint"}
        </button>
        <button className="jsl-btn-ghost" onClick={onToggleSolution}>
          {showSolution ? "Hide Solution" : "🔍 Show Solution"}
        </button>
        <button className={`jsl-btn-mark ${isDone ? "done" : ""}`} onClick={onMarkDone}>
          {isDone ? "✓ Fixed" : "Mark as Fixed"}
        </button>
      </div>

      {/* Automated Tests */}
      {currentTests.length > 0 && (
        <div className="jsl-content-tests">
          <div className="jsl-content-tests-header">
            <h3 className="jsl-section-title" style={{ margin: 0 }}>Automated Tests</h3>
            <div className="jsl-content-tests-actions">
              {testResults.length > 0 && (
                <span className={`jsl-tests-score ${testResults.filter(r => r.passed).length === currentTests.length ? "all-pass" : ""}`}>
                  {testResults.filter(r => r.passed).length}/{currentTests.length} Passed
                </span>
              )}
              <button className="jsl-btn-ghost jsl-btn-sm" onClick={onRunTests}>
                <FiRefreshCw size={12} />
                Run Tests
              </button>
            </div>
          </div>
          <div className="jsl-content-tests-body">
            {currentTests.map((test, i) => {
              const result = testResults.find(r => r.index === i);
              const passed = result?.passed;
              const hasResult = result !== undefined;
              return (
                <div key={i} className={`jsl-test-item ${hasResult ? (passed ? "pass" : "fail") : "pending"}`}>
                  <span className="jsl-test-icon">{hasResult ? (passed ? "✓" : "✗") : "○"}</span>
                  <span className="jsl-test-name">{test.name}</span>
                  {hasResult && !passed && result?.error && (
                    <span className="jsl-test-error">{result.error}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="jsl-content-nav">
        <button className={`jsl-nav-btn ${!hasPrev ? "disabled" : ""}`} onClick={onPrev} disabled={!hasPrev}>
          <FiChevronLeft size={14} />
          Previous
        </button>
        <button className={`jsl-nav-btn ${!hasNext ? "disabled" : ""}`} onClick={onNext} disabled={!hasNext}>
          Next
          <FiChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

// ─── PROJECT VIEW ───

function ProjectView({ project, showSolution, onToggleSolution, onMarkDone, isDone, testResults, currentTests, onRunTests }) {
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

      <div className="jsl-content-actions">
        <button className="jsl-btn-ghost" onClick={onToggleSolution}>
          {showSolution ? "Hide Solution" : "🔍 Show Solution"}
        </button>
        <button className={`jsl-btn-mark ${isDone ? "done" : ""}`} onClick={onMarkDone}>
          {isDone ? "✓ Completed" : "Mark Complete"}
        </button>
      </div>

      {/* Automated Tests */}
      {currentTests.length > 0 && (
        <div className="jsl-content-tests">
          <div className="jsl-content-tests-header">
            <h3 className="jsl-section-title" style={{ margin: 0 }}>Automated Tests</h3>
            <div className="jsl-content-tests-actions">
              {testResults.length > 0 && (
                <span className={`jsl-tests-score ${testResults.filter(r => r.passed).length === currentTests.length ? "all-pass" : ""}`}>
                  {testResults.filter(r => r.passed).length}/{currentTests.length} Passed
                </span>
              )}
              <button className="jsl-btn-ghost jsl-btn-sm" onClick={onRunTests}>
                <FiRefreshCw size={12} />
                Run Tests
              </button>
            </div>
          </div>
          <div className="jsl-content-tests-body">
            {currentTests.map((test, i) => {
              const result = testResults.find(r => r.index === i);
              const passed = result?.passed;
              const hasResult = result !== undefined;
              return (
                <div key={i} className={`jsl-test-item ${hasResult ? (passed ? "pass" : "fail") : "pending"}`}>
                  <span className="jsl-test-icon">{hasResult ? (passed ? "✓" : "✗") : "○"}</span>
                  <span className="jsl-test-name">{test.name}</span>
                  {hasResult && !passed && result?.error && (
                    <span className="jsl-test-error">{result.error}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
