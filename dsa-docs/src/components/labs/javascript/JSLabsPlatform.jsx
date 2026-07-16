// ─── JS Labs Platform — Refactored ───

import { FiCheckSquare, FiRefreshCw } from "react-icons/fi";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Editor from "@monaco-editor/react";
import { SkeletonLabPlatform } from "../../Skeleton.jsx";
import {
  JS_LESSONS,
  JS_BUG_CHALLENGES,
  JS_MINI_PROJECTS,
} from "../../../data/labs/javascript/index.js";
import { DiJavascript1 } from "react-icons/di";

import {
  LabResizableHandle,
  LabFooter,
  LabConsolePanel,
  LabEditorToolbar,
  LabTopbar,
  useKeyboardShortcut,
  celebrate,
  awardXP,
  LabXPBadge,
  LabCommandPalette,
  useCommandPalette,
  LabSidebar,
  LabTour,
} from "../shared/index.js";

import JSLessonView from "./components/JSLessonView.jsx";
import JSBugView from "./components/JSBugView.jsx";
import JSProjectView from "./components/JSProjectView.jsx";
import { createJsRunner } from "./runner/jsRunner.js";
import { runJsTests, handleTestResults } from "./runner/jsValidator.js";
import {
  JS_CONFETTI,
  STORAGE_KEY,
  XP_VALUES,
  XP_LABELS,
  PLAYGROUND_CODE,
} from "./config.js";

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
  const [progress, setProgress] = useState({
    lessons: [],
    bugs: [],
    projects: [],
  });
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
  const runnerRef = useRef(null);

  // Load progress from localStorage
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 100);
    try {
      const stored = JSON.parse(
        localStorage.getItem(STORAGE_KEY) ||
          '{"lessons":[],"bugs":[],"projects":[]}'
      );
      setProgress(stored);
    } catch {
      /* ignore */
    }
    return () => clearTimeout(timer);
  }, []);

  const saveProgress = useCallback((newProgress) => {
    setProgress(newProgress);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
    } catch {
      /* ignore */
    }
  }, []);

  const markLessonDone = useCallback(
    (id) => {
      if (!progress.lessons.includes(id)) {
        saveProgress({ ...progress, lessons: [...progress.lessons, id] });
        if (awardXP(`js:lesson:${id}`, XP_VALUES.lesson, XP_LABELS.lesson))
          celebrate(JS_CONFETTI);
      }
    },
    [progress, saveProgress]
  );

  const markBugDone = useCallback(
    (id) => {
      if (!progress.bugs.includes(id)) {
        saveProgress({ ...progress, bugs: [...progress.bugs, id] });
        if (awardXP(`js:bug:${id}`, XP_VALUES.bug, XP_LABELS.bug))
          celebrate(JS_CONFETTI);
      }
    },
    [progress, saveProgress]
  );

  const markProjectDone = useCallback(
    (id) => {
      if (!progress.projects.includes(id)) {
        saveProgress({ ...progress, projects: [...progress.projects, id] });
        if (
          awardXP(`js:project:${id}`, XP_VALUES.project, XP_LABELS.project)
        )
          celebrate(JS_CONFETTI);
      }
    },
    [progress, saveProgress]
  );

  const progressStats = useMemo(
    () => ({
      lessonsDone: progress.lessons.length,
      lessonsTotal: JS_LESSONS.length,
      bugsDone: progress.bugs.length,
      bugsTotal: JS_BUG_CHALLENGES.length,
      projectsDone: progress.projects.length,
      projectsTotal: JS_MINI_PROJECTS.length,
      total:
        progress.lessons.length +
        progress.bugs.length +
        progress.projects.length,
      totalAll:
        JS_LESSONS.length + JS_BUG_CHALLENGES.length + JS_MINI_PROJECTS.length,
      pct: Math.round(
        ((progress.lessons.length +
          progress.bugs.length +
          progress.projects.length) /
          (JS_LESSONS.length +
            JS_BUG_CHALLENGES.length +
            JS_MINI_PROJECTS.length)) *
          100
      ),
      lessons: progress.lessons,
      bugs: progress.bugs,
      projects: progress.projects,
    }),
    [progress]
  );

  const currentLesson = useMemo(
    () => JS_LESSONS.find((l) => l.id === activeLesson),
    [activeLesson]
  );
  const currentBug = useMemo(
    () => JS_BUG_CHALLENGES.find((b) => b.id === activeBug),
    [activeBug]
  );
  const currentProject = useMemo(
    () => JS_MINI_PROJECTS.find((p) => p.id === activeProject),
    [activeProject]
  );

  const selectLesson = (id) => {
    const lesson = JS_LESSONS.find((l) => l.id === id);
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
    const bug = JS_BUG_CHALLENGES.find((b) => b.id === id);
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
    const proj = JS_MINI_PROJECTS.find((p) => p.id === id);
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

  const selectPlayground = () => {
    setView("playground");
    setActiveLesson(null);
    setActiveBug(null);
    setActiveProject(null);
    setCode(PLAYGROUND_CODE);
    setShowHint(false);
    setShowSolution(false);
    setOutput([]);
    setTestResults([]);
    codeVersionRef.current++;
  };

  const defineThemes = useCallback((monaco) => {
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
        "editorBracketPairGuide.activeBackground1":
          "rgba(96,165,250,0.08)",
        "editorBracketPairGuide.activeBackground2":
          "rgba(167,139,250,0.08)",
        "editorBracketPairGuide.activeBackground3":
          "rgba(52,211,153,0.08)",
        "editorIndentGuide.background": "rgba(255,255,255,0.03)",
        "editorIndentGuide.activeBackground": "rgba(255,255,255,0.06)",
        "editorWidget.background": "#0f172a",
        "editorWidget.border": "rgba(255,255,255,0.06)",
        "editorSuggestWidget.background": "#0f172a",
        "editorSuggestWidget.border": "rgba(255,255,255,0.06)",
        "editorSuggestWidget.selectedBackground":
          "rgba(96,165,250,0.1)",
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
        "diffEditor.insertedTextBackground":
          "rgba(34,197,94,0.06)",
        "diffEditor.removedTextBackground": "rgba(239,68,68,0.06)",
        "focusBorder": "rgba(96,165,250,0.3)",
      },
    });
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
        "editor.inactiveSelectionBackground":
          "rgba(37,99,235,0.06)",
        "editorCursor.foreground": "#2563eb",
        "editorLineNumber.foreground": "#94a3b8",
        "editorLineNumber.activeForeground": "#64748b",
        "editor.selectionHighlightBackground":
          "rgba(37,99,235,0.08)",
        "editorBracketMatch.background": "rgba(37,99,235,0.1)",
        "editorBracketMatch.border": "rgba(37,99,235,0.2)",
        "editorBracketHighlight.foreground1": "#2563eb",
        "editorBracketHighlight.foreground2": "#7c3aed",
        "editorBracketHighlight.foreground3": "#059669",
        "editorBracketHighlight.foreground4": "#d97706",
        "editorBracketHighlight.foreground5": "#db2777",
        "editorBracketHighlight.foreground6": "#0891b2",
        "editorBracketPairGuide.activeBackground1":
          "rgba(37,99,235,0.05)",
        "editorBracketPairGuide.activeBackground2":
          "rgba(124,58,237,0.05)",
        "editorBracketPairGuide.activeBackground3":
          "rgba(5,150,105,0.05)",
        "editorIndentGuide.background": "rgba(0,0,0,0.05)",
        "editorIndentGuide.activeBackground": "rgba(0,0,0,0.1)",
        "editorWidget.background": "#ffffff",
        "editorWidget.border": "rgba(0,0,0,0.08)",
        "editorSuggestWidget.background": "#ffffff",
        "editorSuggestWidget.border": "rgba(0,0,0,0.08)",
        "editorSuggestWidget.selectedBackground":
          "rgba(37,99,235,0.06)",
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

  const handleEditorMount = useCallback(
    (editor, monaco) => {
      editorRef.current = editor;
      defineThemes(monaco);
      monaco.editor.setTheme(monacoTheme);
      const remeasure = () => {
        try {
          editor.remeasureFonts();
        } catch {}
      };
      setTimeout(remeasure, 50);
      setTimeout(remeasure, 500);
      setTimeout(remeasure, 1500);
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(remeasure);
      }
    },
    [defineThemes, monacoTheme]
  );

  useEffect(() => {
    const onResize = () => {
      if (editorRef.current) {
        try {
          editorRef.current.remeasureFonts();
        } catch {}
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleCodeChange = useCallback((v) => setCode(v || ""), []);

  const handleSidebarDrag = useCallback(({ clientX }) => {
    if (!bodyRef.current) return;
    const bodyLeft = bodyRef.current.getBoundingClientRect().left;
    setSidebarWidth(
      Math.max(180, Math.min(500, clientX - bodyLeft))
    );
  }, []);

  const handleContentDrag = useCallback(({ clientX }) => {
    if (!workspaceRef.current) return;
    const rect = workspaceRef.current.getBoundingClientRect();
    setContentRatio(
      Math.max(0.2, Math.min(0.8, (clientX - rect.left) / rect.width))
    );
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
    const newHeight = Math.max(
      60,
      Math.min(maxH, rect.bottom - clientY)
    );
    setTestsPanelHeight(newHeight);
  }, []);

  const goNextLesson = () => {
    const idx = JS_LESSONS.findIndex((l) => l.id === activeLesson);
    if (idx < JS_LESSONS.length - 1)
      selectLesson(JS_LESSONS[idx + 1].id);
  };

  const goPrevLesson = () => {
    const idx = JS_LESSONS.findIndex((l) => l.id === activeLesson);
    if (idx > 0) selectLesson(JS_LESSONS[idx - 1].id);
  };

  const goNextBug = () => {
    const idx = JS_BUG_CHALLENGES.findIndex(
      (b) => b.id === activeBug
    );
    if (idx < JS_BUG_CHALLENGES.length - 1)
      selectBug(JS_BUG_CHALLENGES[idx + 1].id);
  };

  const goPrevBug = () => {
    const idx = JS_BUG_CHALLENGES.findIndex(
      (b) => b.id === activeBug
    );
    if (idx > 0) selectBug(JS_BUG_CHALLENGES[idx - 1].id);
  };

  // Initialize runner once (stable ref)
  if (!runnerRef.current) {
    runnerRef.current = createJsRunner(
      (type, content) => {
        setOutput((prev) => [...prev, { type, content }]);
      },
      () => {
        setIsRunning(false);
      }
    );
  }

  // Clean up worker on unmount
  useEffect(() => {
    return () => {
      if (runnerRef.current) {
        runnerRef.current.terminate();
      }
    };
  }, []);

  const debouncedRunCode = runnerRef.current.debouncedRun;

  const runCode = useCallback(() => {
    setIsRunning(true);
    setOutput([]);
    debouncedRunCode(code);
  }, [code, debouncedRunCode]);



  const runTests = useCallback(() => {
    const tests =
      view === "learn"
        ? currentLesson?.tests || []
        : view === "bugs"
          ? currentBug?.tests || []
          : currentProject?.tests || [];

    const results = runJsTests(code, tests);
    setTestResults(results);

    handleTestResults(
      results,
      view,
      currentLesson,
      currentBug,
      currentProject,
      markLessonDone,
      markBugDone,
      markProjectDone
    );
  }, [
    code,
    view,
    currentLesson,
    currentBug,
    currentProject,
    markLessonDone,
    markBugDone,
    markProjectDone,
  ]);

  useKeyboardShortcut(runCode);

  // Ctrl+K command palette + Ctrl+B focus mode
  const [paletteOpen, setPaletteOpen] = useCommandPalette();
  const [hideSidebar, setHideSidebar] = useState(false);
  useKeyboardShortcut(() => setHideSidebar((v) => !v), "b");

  const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");

  const currentContent = useMemo(() => {
    if (view === "learn") return currentLesson;
    if (view === "bugs") return currentBug;
    if (view === "projects") return currentProject;
    if (view === "playground")
      return { id: "playground", title: "JS Playground" };
    return null;
  }, [view, currentLesson, currentBug, currentProject]);

  const currentTests = useMemo(() => {
    if (view === "learn") return currentLesson?.tests || [];
    if (view === "bugs") return currentBug?.tests || [];
    if (view === "projects") return currentProject?.tests || [];
    return [];
  }, [view, currentLesson, currentBug, currentProject]);

  const handleReset = () => {
    let starter = "";
    if (view === "learn" && currentLesson)
      starter = currentLesson.starterCode;
    else if (view === "bugs" && currentBug)
      starter = currentBug.brokenCode;
    else if (view === "projects" && currentProject)
      starter = currentProject.starterCode;
    else if (view === "playground") starter = PLAYGROUND_CODE;
    if (editorRef.current) editorRef.current.setValue(starter);
    setCode(starter);
    setOutput([]);
    setTestResults([]);
    codeVersionRef.current++;
  };

  const sidebarSections = useMemo(
    () => [
      {
        key: "learn",
        label: "LEARN JAVASCRIPT",
        color: "#63b3ed",
        items: JS_LESSONS,
        progressText: `${progressStats.lessonsDone}/${progressStats.lessonsTotal}`,
        isItemActive: (item) => view === "learn" && activeLesson === item.id,
        isItemDone: (item) => progress.lessons.includes(item.id),
        onSelectItem: (item) => selectLesson(item.id),
      },
      {
        key: "bugs",
        label: "FIX THE BUG",
        color: "#f6ad55",
        items: JS_BUG_CHALLENGES,
        progressText: `${progressStats.bugsDone}/${progressStats.bugsTotal}`,
        isItemActive: (item) => view === "bugs" && activeBug === item.id,
        isItemDone: (item) => progress.bugs.includes(item.id),
        onSelectItem: (item) => selectBug(item.id),
        renderItemNumber: (item, idx) => (
          <span className="jsl-si-num">
            {item.title.split(".")[0]}.
          </span>
        ),
        renderItemTitle: (item) =>
          item.title.split(". ")[1] || item.title,
      },
      {
        key: "projects",
        label: "MINI PROJECTS",
        color: "#fbbf24",
        items: JS_MINI_PROJECTS,
        progressText: `${progressStats.projectsDone}/${progressStats.projectsTotal}`,
        isItemActive: (item) =>
          view === "projects" && activeProject === item.id,
        isItemDone: (item) => progress.projects.includes(item.id),
        onSelectItem: (item) => selectProject(item.id),
        renderItemNumber: (item, idx) => (
          <span className="jsl-si-num">
            {item.title.split(".")[0]}.
          </span>
        ),
        renderItemTitle: (item) =>
          item.title.split(". ")[1] || item.title,
      },
    ],
    [
      view,
      activeLesson,
      activeBug,
      activeProject,
      progress,
      progressStats,
    ]
  );

  const sidebarPlayground = useMemo(
    () => ({
      label: "JS PLAYGROUND",
      color: "#63b3ed",
      isActive: view === "playground",
      onSelect: selectPlayground,
    }),
    [view]
  );

  const tourSteps = useMemo(
    () => [
      {
        title: "Welcome to JS Labs! 👋",
        content:
          "Let's take a quick 1-minute tour of your interactive coding environment.",
      },
      {
        target: ".jsl-sidebar",
        title: "Curriculum Navigation",
        content:
          "Browse lessons, bug challenges, and mini projects here. Your progress is saved automatically.",
      },
      {
        target: ".jsl-content-panel",
        title: "Lesson Content & Tasks",
        content:
          "Read lesson explanations, rules, and tasks. You can also view hints or solutions if you get stuck.",
      },
      {
        target: ".jsl-editor-panel",
        title: "Code Editor & Console",
        content:
          "Write code in the editor, and see output or errors in the console below.",
      },
      {
        target: ".jsl-btn-command-palette",
        title: "Command Palette",
        content:
          "Click this button or press Ctrl+K to open the search bar to jump to lessons or execute commands.",
      },
      {
        target: ".jsl-editor-actions",
        title: "Run Code",
        content:
          "Click Run (or press Ctrl+Enter) to execute code, or run tests to verify correctness.",
      },
    ],
    []
  );

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
          <p>
            Select a lesson, bug challenge, or project from the sidebar
            to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="jsl-platform">
      <LabTopbar
        base={base}
        title="JavaScript Labs"
        icon={{
          component: <DiJavascript1 size={20} color="#2563eb" />,
        }}
        progressStats={progressStats}
        monacoTheme={monacoTheme}
        onToggleTheme={() =>
          setMonacoTheme((t) =>
            t === "jsl-dark" ? "jsl-light" : "jsl-dark"
          )
        }
        onOpenPalette={() => setPaletteOpen(true)}
      >
        <LabXPBadge />
      </LabTopbar>

      <LabCommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        accent="#f7df1e"
        commands={[
          {
            id: "run",
            section: "Actions",
            label: "Run code",
            hint: "Ctrl+Enter",
            action: runCode,
          },
          {
            id: "tests",
            section: "Actions",
            label: "Run tests",
            action: runTests,
          },
          {
            id: "reset",
            section: "Actions",
            label: "Reset editor to starter code",
            action: handleReset,
          },
          {
            id: "theme",
            section: "Actions",
            label: "Toggle editor theme",
            action: () =>
              setMonacoTheme((t) =>
                t === "jsl-dark" ? "jsl-light" : "jsl-dark"
              ),
          },
          {
            id: "focus",
            section: "Actions",
            label: hideSidebar
              ? "Show sidebar"
              : "Focus mode (hide sidebar)",
            hint: "Ctrl+B",
            action: () => setHideSidebar((v) => !v),
          },
          {
            id: "playground",
            section: "Actions",
            label: "Go to playground",
            action: selectPlayground,
          },
          {
            id: "back",
            section: "Actions",
            label: "Back to all labs",
            action: () => {
              window.location.href = `${base}labs`;
            },
          },
          ...JS_LESSONS.map((l) => ({
            id: `l-${l.id}`,
            section: "Lessons",
            label: l.title,
            done: progress.lessons.includes(l.id),
            action: () => selectLesson(l.id),
          })),
          ...JS_BUG_CHALLENGES.map((b) => ({
            id: `b-${b.id}`,
            section: "Bug Challenges",
            label: b.title,
            done: progress.bugs.includes(b.id),
            action: () => selectBug(b.id),
          })),
          ...JS_MINI_PROJECTS.map((p) => ({
            id: `p-${p.id}`,
            section: "Mini Projects",
            label: p.title,
            done: progress.projects.includes(p.id),
            action: () => selectProject(p.id),
          })),
        ]}
      />

      <div className="jsl-main">
        <div className="jsl-body" ref={bodyRef}>
          {!hideSidebar && (
            <>
              <LabSidebar
                playground={sidebarPlayground}
                sections={sidebarSections}
                style={{ width: sidebarWidth }}
              />
              <LabResizableHandle onDrag={handleSidebarDrag} />
            </>
          )}

          <div className="jsl-workspace" ref={workspaceRef}>
            {/* Content Panel */}
            <div
              className="jsl-content-panel"
              ref={contentPanelRef}
              style={{ flex: `${contentRatio} 1 0` }}
            >
              <div className="jsl-content-scroll">
                {view === "learn" && currentLesson && (
                  <JSLessonView
                    lesson={currentLesson}
                    showHint={showHint}
                    showSolution={showSolution}
                    onToggleHint={() => setShowHint((h) => !h)}
                    onToggleSolution={() =>
                      setShowSolution((s) => !s)
                    }
                    onPrev={goPrevLesson}
                    onNext={goNextLesson}
                    hasPrev={
                      JS_LESSONS.findIndex(
                        (l) => l.id === activeLesson
                      ) > 0
                    }
                    hasNext={
                      JS_LESSONS.findIndex(
                        (l) => l.id === activeLesson
                      ) <
                      JS_LESSONS.length - 1
                    }
                    onMarkDone={() =>
                      markLessonDone(currentLesson.id)
                    }
                    isDone={progress.lessons.includes(
                      currentLesson.id
                    )}
                    testResults={testResults}
                    currentTests={currentTests}
                    onRunTests={runTests}
                  />
                )}
                {view === "bugs" && currentBug && (
                  <JSBugView
                    bug={currentBug}
                    showHint={showHint}
                    showSolution={showSolution}
                    onToggleHint={() => setShowHint((h) => !h)}
                    onToggleSolution={() =>
                      setShowSolution((s) => !s)
                    }
                    onPrev={goPrevBug}
                    onNext={goNextBug}
                    hasPrev={
                      JS_BUG_CHALLENGES.findIndex(
                        (b) => b.id === activeBug
                      ) > 0
                    }
                    hasNext={
                      JS_BUG_CHALLENGES.findIndex(
                        (b) => b.id === activeBug
                      ) <
                      JS_BUG_CHALLENGES.length - 1
                    }
                    onMarkDone={() => markBugDone(currentBug.id)}
                    isDone={progress.bugs.includes(currentBug.id)}
                    testResults={testResults}
                    currentTests={currentTests}
                    onRunTests={runTests}
                  />
                )}
                {view === "projects" && currentProject && (
                  <JSProjectView
                    project={currentProject}
                    showSolution={showSolution}
                    onToggleSolution={() =>
                      setShowSolution((s) => !s)
                    }
                    onMarkDone={() =>
                      markProjectDone(currentProject.id)
                    }
                    isDone={progress.projects.includes(
                      currentProject.id
                    )}
                    testResults={testResults}
                    currentTests={currentTests}
                    onRunTests={runTests}
                  />
                )}
                {view === "playground" && (
                  <div className="jsl-content-inner">
                    <h2 className="jsl-content-title">
                      JS Playground
                    </h2>
                    <p
                      className="jsl-text"
                      style={{ marginTop: "1rem" }}
                    >
                      This is a scratchpad where you can test any
                      JavaScript snippets. Type your code in the
                      editor on the right and click{" "}
                      <strong>Run</strong> (or press{" "}
                      <strong>Ctrl+Enter</strong>) to execute it.
                    </p>
                    <p
                      className="jsl-text"
                      style={{
                        marginTop: "0.5rem",
                        color: "#94a3b8",
                      }}
                    >
                      Use <code>console.log()</code> to see output in
                      the console panel below the editor.
                    </p>
                  </div>
                )}
              </div>
              <LabResizableHandle
                onDrag={handleTestsDrag}
                orientation="horizontal"
              />
              <div
                className="jsl-tests-panel"
                style={{
                  height: testsPanelHeight,
                  maxHeight: testsPanelHeight,
                  minHeight: testsPanelHeight,
                }}
              >
                <div className="jsl-tests-header">
                  <span className="jsl-tests-title">
                    <FiCheckSquare size={14} />
                    Automated Tests
                  </span>
                  <div className="jsl-tests-actions">
                    {testResults.length > 0 && (
                      <span
                        className={`jsl-tests-score ${
                          testResults.filter((r) => r.passed)
                            .length === currentTests.length
                            ? "all-pass"
                            : ""
                        }`}
                      >
                        {
                          testResults.filter((r) => r.passed).length
                        }
                        /{currentTests.length} Passed
                      </span>
                    )}
                    <button
                      className="jsl-btn-secondary jsl-btn-sm"
                      onClick={runTests}
                    >
                      <FiRefreshCw size={12} />
                      Run Tests
                    </button>
                  </div>
                </div>
                <div className="jsl-tests-body">
                  {currentTests.length === 0 ? (
                    <div className="jsl-tests-empty">
                      No automated tests for this section
                    </div>
                  ) : (
                    currentTests.map((test, i) => {
                      const result = testResults.find(
                        (r) => r.index === i
                      );
                      const passed = result?.passed;
                      const hasResult = result !== undefined;
                      return (
                        <div
                          key={i}
                          className={`jsl-test-item ${
                            hasResult
                              ? passed
                                ? "pass"
                                : "fail"
                              : "pending"
                          }`}
                        >
                          <span className="jsl-test-icon">
                            {hasResult
                              ? passed
                                ? "✓"
                                : "✗"
                              : "○"}
                          </span>
                          <span className="jsl-test-name">
                            {test.name}
                          </span>
                          {hasResult && !passed && result?.error && (
                            <span className="jsl-test-error">
                              {result.error}
                            </span>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* Editor & Output Panel */}
            <LabResizableHandle onDrag={handleContentDrag} />
            <div
              className="jsl-editor-panel"
              ref={editorPanelRef}
              style={{ flex: `${1 - contentRatio} 1 0` }}
            >
              <LabEditorToolbar
                isRunning={isRunning}
                onRun={runCode}
                onReset={handleReset}
                runLabel="Run"
                lang="JavaScript"
                langIcon={<DiJavascript1 size={14} />}
              />

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
                    fontFamily: "var(--font-mono)",
                    minimap: { enabled: false },
                    lineNumbers: "on",
                    roundedSelection: true,
                    scrollBeyondLastLine: false,
                    readOnly: false,
                    automaticLayout: true,
                    tabSize: 2,
                    padding: { top: 12, bottom: 12 },
                  }}
                />
              </div>

              {/* Resizable Console */}
              <LabResizableHandle
                onDrag={handleConsoleDrag}
                orientation="horizontal"
              />
              <div
                className="jsl-console-panel"
                style={{
                  height: consoleHeight,
                  maxHeight: consoleHeight,
                  minHeight: consoleHeight,
                }}
              >
                <LabConsolePanel output={output} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <LabFooter />
      <LabTour
        steps={tourSteps}
        tourKey="js-labs-onboarding-tour-completed"
      />
    </div>
  );
}
