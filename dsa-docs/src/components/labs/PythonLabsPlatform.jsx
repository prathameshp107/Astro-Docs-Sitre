import { FiBook, FiCheck, FiCheckSquare, FiChevronDown, FiChevronLeft, FiChevronRight, FiRefreshCw } from "react-icons/fi";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Editor from "@monaco-editor/react";
import Skeleton, { SkeletonLabPlatform } from "../Skeleton.jsx";
import { DiPython } from "react-icons/di";
import { PYTHON_LESSONS, PYTHON_CHALLENGES, PYTHON_PROJECTS, PYTHON_DEBUG_CHALLENGES } from "../../data/python-labs-curriculum.js";

import {
  LabResizableHandle,
  LabFooter,
  LabConsolePanel,
  LabEditorToolbar,
  LabTopbar,
  useKeyboardShortcut,
  CodeBlock,
  renderFormattedText,
} from "./shared/index.js";

// ─── PYTHON RUNNER (Pyodide) ───

let pyodideLoadingPromise = null;
let pyodideError = null;

function getPyodide() {
  if (typeof window !== "undefined" && window.pyodide) {
    return Promise.resolve(window.pyodide);
  }
  if (!pyodideLoadingPromise) {
    pyodideLoadingPromise = (async () => {
      try {
        const pyodide = await globalThis.loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/",
        });
        window.pyodide = pyodide;
        return pyodide;
      } catch (err) {
        pyodideError = err.message || "Failed to load Pyodide";
        return null;
      }
    })();
  }
  return pyodideLoadingPromise;
}// ─── SIDEBAR ───

function PythonSidebar({ activeSection, activeLesson, activeChallenge, activeProject, activeBug, onSelectLesson, onSelectChallenge, onSelectProject, onSelectBug, progress, ...rest }) {
  const [expandedSections, setExpandedSections] = useState({ learn: true, challenges: false, projects: false, bugs: false });

  const toggleSection = (key) => setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));

  const isLessonActive = (id) => activeSection === "learn" && activeLesson === id;
  const isChallengeActive = (id) => activeSection === "challenge" && activeChallenge === id;
  const isProjectActive = (id) => activeSection === "project" && activeProject === id;
  const isBugActive = (id) => activeSection === "bugs" && activeBug === id;

  return (
    <div className="jsl-sidebar" {...rest}>
      <div className="jsl-sidebar-header">
        <h3>
          <FiBook size={16} /> Curriculum
        </h3>
      </div>

      {/* LEARN PYTHON */}
      <div className="jsl-sidebar-group">
        <button className={`jsl-sg-header learn ${expandedSections.learn ? "expanded" : ""}`} onClick={() => toggleSection("learn")}>
          <div className="jsl-sg-title"><FiBook size={16} /><span>LEARN PYTHON</span></div>
          <span className="jsl-sg-count">{progress.lessonsDone}/{progress.lessonsTotal}</span>
          <FiChevronDown size={14} />
        </button>
        {expandedSections.learn && (
          <div className="jsl-sg-items">
            {PYTHON_LESSONS.map((lesson) => (
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

      {/* CODE CHALLENGES */}
      <div className="jsl-sidebar-group">
        <button className={`jsl-sg-header ${expandedSections.challenges ? "expanded" : ""}`} onClick={() => toggleSection("challenges")}>
          <div className="jsl-sg-title"><FiBook size={16} /><span>CODE CHALLENGES</span></div>
          <span className="jsl-sg-count">{progress.challengesDone}/{progress.challengesTotal}</span>
          <FiChevronDown size={14} />
        </button>
        {expandedSections.challenges && (
          <div className="jsl-sg-items">
            {PYTHON_CHALLENGES.map((c, i) => (
              <button
                key={c.id}
                className={`jsl-si ${isChallengeActive(c.id) ? "active" : ""} ${progress.challenges.includes(c.id) ? "done" : ""}`}
                onClick={() => onSelectChallenge(c.id)}
              >
                <span className="jsl-si-num">{i + 1}.</span>
                <span className="jsl-si-title">{c.title.replace(/^\d+\.\s*/, "")}</span>
                <span className={`jsl-si-level ${c.difficulty.toLowerCase()}`}>{c.difficulty[0]}</span>
                {progress.challenges.includes(c.id) && <span className="jsl-si-check"><FiCheck size={16} /></span>}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* PROJECTS LAB */}
      <div className="jsl-sidebar-group">
        <button className={`jsl-sg-header projects ${expandedSections.projects ? "expanded" : ""}`} onClick={() => toggleSection("projects")}>
          <div className="jsl-sg-title"><FiBook size={16} /><span>PROJECTS LAB</span></div>
          <span className="jsl-sg-count">{progress.projectsDone}/{progress.projectsTotal}</span>
          <FiChevronDown size={14} />
        </button>
        {expandedSections.projects && (
          <div className="jsl-sg-items">
            {PYTHON_PROJECTS.map((proj, i) => (
              <button
                key={proj.id}
                className={`jsl-si ${isProjectActive(proj.id) ? "active" : ""} ${progress.projects.includes(proj.id) ? "done" : ""}`}
                onClick={() => onSelectProject(proj.id)}
              >
                <span className="jsl-si-num">{i + 1}.</span>
                <span className="jsl-si-title">{proj.title.replace(/^\d+\.\s*/, "")}</span>
                {progress.projects.includes(proj.id) && <span className="jsl-si-check"><FiCheck size={16} /></span>}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* DEBUGGING CHALLENGES */}
      <div className="jsl-sidebar-group">
        <button className={`jsl-sg-header bugs ${expandedSections.bugs ? "expanded" : ""}`} onClick={() => toggleSection("bugs")}>
          <div className="jsl-sg-title"><FiBook size={16} /><span>DEBUG CHALLENGES</span></div>
          <span className="jsl-sg-count">{progress.bugsDone}/{progress.bugsTotal}</span>
          <FiChevronDown size={14} />
        </button>
        {expandedSections.bugs && (
          <div className="jsl-sg-items">
            {PYTHON_DEBUG_CHALLENGES.map((bug, i) => (
              <button
                key={bug.id}
                className={`jsl-si ${isBugActive(bug.id) ? "active" : ""} ${progress.bugs.includes(bug.id) ? "done" : ""}`}
                onClick={() => onSelectBug(bug.id)}
              >
                <span className="jsl-si-num">{i + 1}.</span>
                <span className="jsl-si-title">{bug.title.replace(/^\d+\.\s*/, "")}</span>
                {progress.bugs.includes(bug.id) && <span className="jsl-si-check"><FiCheck size={16} /></span>}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── MAIN PLATFORM ───

export default function PythonLabsPlatform() {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("learn");
  const [activeLesson, setActiveLesson] = useState(PYTHON_LESSONS[0]?.id || null);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const [activeBug, setActiveBug] = useState(null);
  const [code, setCode] = useState(PYTHON_LESSONS[0]?.starterCode || "");
  const [output, setOutput] = useState([]);
  const [testResults, setTestResults] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [monacoTheme, setMonacoTheme] = useState("jsl-dark");
  const [progress, setProgress] = useState({ lessons: [], challenges: [], projects: [], bugs: [] });
  const [isRunning, setIsRunning] = useState(false);
  const [pyodideReady, setPyodideReady] = useState(false);
  const [pyodideLoadError, setPyodideLoadError] = useState(null);
  const editorRef = useRef(null);
  const codeVersionRef = useRef(0);
  const editorPanelRef = useRef(null);
  const contentPanelRef = useRef(null);
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const [contentRatio, setContentRatio] = useState(0.5);
  const [testsPanelHeight, setTestsPanelHeight] = useState(100);
  const [consoleHeight, setConsoleHeight] = useState(180);
  const bodyRef = useRef(null);
  const workspaceRef = useRef(null);

  // Initialize Pyodide
  useEffect(() => {
    let cancelled = false;
    // Wait for the Pyodide CDN script to load
    const tryLoad = () => {
      if (typeof globalThis.loadPyodide === 'function') {
        getPyodide().then((py) => {
          if (!cancelled) {
            setLoading(false);
            if (py) setPyodideReady(true);
            else setPyodideLoadError(pyodideError || "Failed to load Python runtime");
          }
        });
      } else {
        // Pyodide script not yet loaded, retry after a delay
        setTimeout(tryLoad, 500);
      }
    };
    // Give the CDN script a moment to load, then try
    setTimeout(tryLoad, 1000);
    return () => { cancelled = true; };
  }, []);

  // Load progress from localStorage
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("pyl-progress") || '{"lessons":[],"challenges":[],"projects":[],"bugs":[]}');
      setProgress(stored);
    } catch { /* ignore */ }
  }, []);

  // Save progress
  const saveProgress = useCallback((newProgress) => {
    setProgress(newProgress);
    try {
      localStorage.setItem("pyl-progress", JSON.stringify(newProgress));
    } catch { /* ignore */ }
  }, []);

  const markLessonDone = useCallback((id) => {
    if (!progress.lessons.includes(id)) saveProgress({ ...progress, lessons: [...progress.lessons, id] });
  }, [progress, saveProgress]);

  const markChallengeDone = useCallback((id) => {
    if (!progress.challenges.includes(id)) saveProgress({ ...progress, challenges: [...progress.challenges, id] });
  }, [progress, saveProgress]);

  const markProjectDone = useCallback((id) => {
    if (!progress.projects.includes(id)) saveProgress({ ...progress, projects: [...progress.projects, id] });
  }, [progress, saveProgress]);

  const markBugDone = useCallback((id) => {
    if (!progress.bugs.includes(id)) saveProgress({ ...progress, bugs: [...progress.bugs, id] });
  }, [progress, saveProgress]);

  // Progress stats
  const progressStats = useMemo(() => ({
    lessonsDone: progress.lessons.length,
    lessonsTotal: PYTHON_LESSONS.length,
    challengesDone: progress.challenges.length,
    challengesTotal: PYTHON_CHALLENGES.length,
    projectsDone: progress.projects.length,
    projectsTotal: PYTHON_PROJECTS.length,
    bugsDone: progress.bugs.length,
    bugsTotal: PYTHON_DEBUG_CHALLENGES.length,
    total: progress.lessons.length + progress.challenges.length + progress.projects.length + progress.bugs.length,
    totalAll: PYTHON_LESSONS.length + PYTHON_CHALLENGES.length + PYTHON_PROJECTS.length + PYTHON_DEBUG_CHALLENGES.length,
    pct: Math.round(((progress.lessons.length + progress.challenges.length + progress.projects.length + progress.bugs.length) / (PYTHON_LESSONS.length + PYTHON_CHALLENGES.length + PYTHON_PROJECTS.length + PYTHON_DEBUG_CHALLENGES.length)) * 100),
    lessons: progress.lessons,
    challenges: progress.challenges,
    projects: progress.projects,
    bugs: progress.bugs,
  }), [progress]);

  const currentLesson = useMemo(() => PYTHON_LESSONS.find(l => l.id === activeLesson), [activeLesson]);
  const currentChallenge = useMemo(() => PYTHON_CHALLENGES.find(c => c.id === activeChallenge), [activeChallenge]);
  const currentProject = useMemo(() => PYTHON_PROJECTS.find(p => p.id === activeProject), [activeProject]);
  const currentBug = useMemo(() => PYTHON_DEBUG_CHALLENGES.find(b => b.id === activeBug), [activeBug]);

  const selectLesson = (id) => {
    const lesson = PYTHON_LESSONS.find(l => l.id === id);
    if (!lesson) return;
    setView("learn");
    setActiveLesson(id);
    setActiveChallenge(null);
    setActiveProject(null);
    setActiveBug(null);
    setCode(lesson.starterCode);
    setShowHint(false);
    setShowSolution(false);
    setOutput([]);
    setTestResults([]);
    codeVersionRef.current++;
  };

  const selectChallenge = (id) => {
    const challenge = PYTHON_CHALLENGES.find(c => c.id === id);
    if (!challenge) return;
    setView("challenge");
    setActiveLesson(null);
    setActiveChallenge(id);
    setActiveProject(null);
    setActiveBug(null);
    setCode(challenge.starterCode);
    setShowHint(false);
    setShowSolution(false);
    setOutput([]);
    setTestResults([]);
    codeVersionRef.current++;
  };

  const selectProject = (id) => {
    const proj = PYTHON_PROJECTS.find(p => p.id === id);
    if (!proj) return;
    setView("project");
    setActiveLesson(null);
    setActiveChallenge(null);
    setActiveProject(id);
    setActiveBug(null);
    setCode(proj.starterCode);
    setShowHint(false);
    setShowSolution(false);
    setOutput([]);
    setTestResults([]);
    codeVersionRef.current++;
  };

  const selectBug = (id) => {
    const bug = PYTHON_DEBUG_CHALLENGES.find(b => b.id === id);
    if (!bug) return;
    setView("bugs");
    setActiveLesson(null);
    setActiveChallenge(null);
    setActiveProject(null);
    setActiveBug(id);
    setCode(bug.brokenCode);
    setShowHint(false);
    setShowSolution(false);
    setOutput([]);
    setTestResults([]);
    codeVersionRef.current++;
  };

  // Define Monaco themes
  const defineThemes = useCallback((monaco) => {
    monaco.editor.defineTheme("jsl-dark", {
      base: "vs-dark", inherit: true,
      rules: [
        { token: "comment", foreground: "64748b", fontStyle: "italic" },
        { token: "keyword", foreground: "a78bfa" },
        { token: "keyword.control", foreground: "a78bfa" },
        { token: "keyword.operator", foreground: "60a5fa" },
        { token: "string", foreground: "34d399" },
        { token: "number", foreground: "f59e0b" },
        { token: "type", foreground: "2dd4bf" },
        { token: "function", foreground: "60a5fa" },
        { token: "variable", foreground: "e2e8f0" },
        { token: "delimiter", foreground: "94a3b8" },
      ],
      colors: {
        "editor.background": "#0a0f1e",
        "editor.foreground": "#e2e8f0",
        "editor.lineHighlightBackground": "#0d1525",
        "editor.selectionBackground": "rgba(96,165,250,0.25)",
        "editorCursor.foreground": "#60a5fa",
        "editorLineNumber.foreground": "#475569",
        "editorLineNumber.activeForeground": "#94a3b8",
        "editorWidget.background": "#0f172a",
        "editorWidget.border": "rgba(255,255,255,0.06)",
        "editorGutter.background": "#0a0f1e",
      },
    });
    monaco.editor.defineTheme("jsl-light", {
      base: "vs", inherit: true,
      rules: [
        { token: "comment", foreground: "94a3b8", fontStyle: "italic" },
        { token: "keyword", foreground: "7c3aed" },
        { token: "string", foreground: "059669" },
        { token: "number", foreground: "d97706" },
      ],
      colors: {
        "editor.background": "#ffffff",
        "editor.foreground": "#1e293b",
        "editor.lineHighlightBackground": "#f8fafc",
        "editorCursor.foreground": "#2563eb",
        "editorLineNumber.foreground": "#94a3b8",
      },
    });
  }, []);

  const handleEditorMount = useCallback((editor, monaco) => {
    editorRef.current = editor;
    defineThemes(monaco);
    monaco.editor.setTheme(monacoTheme);
    const remeasure = () => { try { editor.remeasureFonts(); } catch {} };
    setTimeout(remeasure, 50);
    setTimeout(remeasure, 500);
  }, [defineThemes, monacoTheme]);

  useEffect(() => {
    const onResize = () => { if (editorRef.current) { try { editorRef.current.remeasureFonts(); } catch {} } };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleCodeChange = useCallback((v) => setCode(v || ""), []);

  const handleSidebarDrag = useCallback(({ clientX }) => {
    if (!bodyRef.current) return;
    setSidebarWidth(Math.max(180, Math.min(500, clientX - bodyRef.current.getBoundingClientRect().left)));
  }, []);

  const handleContentDrag = useCallback(({ clientX }) => {
    if (!workspaceRef.current) return;
    const rect = workspaceRef.current.getBoundingClientRect();
    setContentRatio(Math.max(0.2, Math.min(0.8, (clientX - rect.left) / rect.width)));
  }, []);

  const handleTestsDrag = useCallback(({ clientY }) => {
    if (!contentPanelRef.current) return;
    const rect = contentPanelRef.current.getBoundingClientRect();
    const maxH = rect.height * 0.5;
    setTestsPanelHeight(Math.max(60, Math.min(maxH, rect.bottom - clientY)));
  }, []);

  const handleConsoleDrag = useCallback(({ clientY }) => {
    if (!editorPanelRef.current) return;
    const rect = editorPanelRef.current.getBoundingClientRect();
    const maxH = rect.height * 0.7;
    setConsoleHeight(Math.max(100, Math.min(maxH, rect.bottom - clientY)));
  }, []);

  // Run Python code using Pyodide
  const runCode = useCallback(async () => {
    if (!pyodideReady) {
      setOutput([{ type: "error", content: "Python runtime is still loading. Please wait..." }]);
      return;
    }
    setIsRunning(true);
    setOutput([]);

    try {
      const py = window.pyodide;
      // Redirect stdout
      py.setStdout({
        batched: (text) => {
          setOutput(prev => [...prev, { type: "log", content: text }]);
        },
      });
      py.setStderr({
        batched: (text) => {
          setOutput(prev => [...prev, { type: "error", content: text }]);
        },
      });

      // Clear previous output
      setOutput([]);

      await py.runPythonAsync(code);

      // Check if there was no output
      setOutput(prev => {
        if (prev.length === 0) {
          return [{ type: "info", content: "✓ Code executed (no output)" }];
        }
        return prev;
      });
    } catch (e) {
      setOutput([{ type: "error", content: `✗ ${e.message}` }]);
    } finally {
      setIsRunning(false);
    }
  }, [code, pyodideReady]);

  // Run tests
  const runTests = useCallback(() => {
    const tests = view === "learn" ? currentLesson?.tests || []
      : view === "challenge" ? currentChallenge?.tests || []
      : view === "project" ? currentProject?.tests || []
      : currentBug?.tests || [];

    const results = tests.map((test, i) => {
      try {
        const passed = test.validate(code);
        return { index: i, name: test.name, passed, error: passed ? null : `Expected: ${test.name}` };
      } catch (e) {
        return { index: i, name: test.name, passed: false, error: e?.message || `Expected: ${test.name}` };
      }
    });

    setTestResults(results);

    const allPassed = results.length > 0 && results.every(r => r.passed);
    if (allPassed) {
      if (view === "learn" && currentLesson) markLessonDone(currentLesson.id);
      else if (view === "challenge" && currentChallenge) markChallengeDone(currentChallenge.id);
      else if (view === "project" && currentProject) markProjectDone(currentProject.id);
      else if (view === "bugs" && currentBug) markBugDone(currentBug.id);
    }
  }, [code, view, currentLesson, currentChallenge, currentProject, currentBug, markLessonDone, markChallengeDone, markProjectDone, markBugDone]);

  useKeyboardShortcut(runCode);

  const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");

  const currentContent = useMemo(() => {
    if (view === "learn") return currentLesson;
    if (view === "challenge") return currentChallenge;
    if (view === "project") return currentProject;
    if (view === "bugs") return currentBug;
    return null;
  }, [view, currentLesson, currentChallenge, currentProject, currentBug]);

  const currentTests = useMemo(() => {
    if (view === "learn") return currentLesson?.tests || [];
    if (view === "challenge") return currentChallenge?.tests || [];
    if (view === "project") return currentProject?.tests || [];
    if (view === "bugs") return currentBug?.tests || [];
    return [];
  }, [view, currentLesson, currentChallenge, currentProject, currentBug]);

  const goNextLesson = () => {
    const idx = PYTHON_LESSONS.findIndex(l => l.id === activeLesson);
    if (idx < PYTHON_LESSONS.length - 1) selectLesson(PYTHON_LESSONS[idx + 1].id);
  };
  const goPrevLesson = () => {
    const idx = PYTHON_LESSONS.findIndex(l => l.id === activeLesson);
    if (idx > 0) selectLesson(PYTHON_LESSONS[idx - 1].id);
  };

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
        <div className="jsl-empty" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", color: "#64748b", flexDirection: "column", gap: "0.5rem" }}>
          <h2 style={{ color: "#e2e8f0" }}>Welcome to Python Labs</h2>
          <p>Select a lesson, challenge, project, or debug challenge from the sidebar to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="jsl-platform">
      <LabTopbar
        base={base}
        title="Python Labs"
        icon={{
          component: <DiPython size={18} />,
          style: { background: "rgba(55,118,171,0.08)", borderColor: "rgba(55,118,171,0.18)" },
        }}
        progressStats={progressStats}
        monacoTheme={monacoTheme}
        onToggleTheme={() => setMonacoTheme(t => t === "jsl-dark" ? "jsl-light" : "jsl-dark")}
      >
        {currentContent && (
          <>
            {view === "learn" && currentLesson && (
              <button className={`jsl-btn-mark jsl-btn-topbar ${progress.lessons.includes(currentLesson.id) ? "done" : ""}`}
                onClick={() => markLessonDone(currentLesson.id)}>
                {progress.lessons.includes(currentLesson.id) ? "✓ Completed" : "Mark Complete"}
              </button>
            )}
            {view === "challenge" && currentChallenge && (
              <button className={`jsl-btn-mark jsl-btn-topbar ${progress.challenges.includes(currentChallenge.id) ? "done" : ""}`}
                onClick={() => markChallengeDone(currentChallenge.id)}>
                {progress.challenges.includes(currentChallenge.id) ? "✓ Solved" : "Mark Solved"}
              </button>
            )}
            {view === "project" && currentProject && (
              <button className={`jsl-btn-mark jsl-btn-topbar ${progress.projects.includes(currentProject.id) ? "done" : ""}`}
                onClick={() => markProjectDone(currentProject.id)}>
                {progress.projects.includes(currentProject.id) ? "✓ Completed" : "Mark Complete"}
              </button>
            )}
            {view === "bugs" && currentBug && (
              <button className={`jsl-btn-mark jsl-btn-topbar ${progress.bugs.includes(currentBug.id) ? "done" : ""}`}
                onClick={() => markBugDone(currentBug.id)}>
                {progress.bugs.includes(currentBug.id) ? "✓ Fixed" : "Mark Fixed"}
              </button>
            )}
          </>
        )}
      </LabTopbar>

      {/* ─── Main Layout ─── */}
      <div className="jsl-main">
        <div className="jsl-body" ref={bodyRef}>
        {/* Sidebar */}
        <PythonSidebar
          activeSection={view}
          activeLesson={activeLesson}
          activeChallenge={activeChallenge}
          activeProject={activeProject}
          activeBug={activeBug}
          onSelectLesson={selectLesson}
          onSelectChallenge={selectChallenge}
          onSelectProject={selectProject}
          onSelectBug={selectBug}
          progress={progressStats}
          style={{ width: sidebarWidth }}
        />
        <LabResizableHandle onDrag={handleSidebarDrag} />

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
                  hasPrev={PYTHON_LESSONS.findIndex(l => l.id === activeLesson) > 0}
                  hasNext={PYTHON_LESSONS.findIndex(l => l.id === activeLesson) < PYTHON_LESSONS.length - 1}
                />
              )}
              {view === "challenge" && currentChallenge && (
                <ChallengeView
                  challenge={currentChallenge}
                  showHint={showHint}
                  showSolution={showSolution}
                  onToggleHint={() => setShowHint(h => !h)}
                  onToggleSolution={() => setShowSolution(s => !s)}
                />
              )}
              {view === "project" && currentProject && (
                <ProjectView
                  project={currentProject}
                  showSolution={showSolution}
                  onToggleSolution={() => setShowSolution(s => !s)}
                />
              )}
              {view === "bugs" && currentBug && (
                <BugView
                  bug={currentBug}
                  showHint={showHint}
                  showSolution={showSolution}
                  onToggleHint={() => setShowHint(h => !h)}
                  onToggleSolution={() => setShowSolution(s => !s)}
                />
              )}
            </div>
            {/* Tests Panel */}
            <LabResizableHandle onDrag={handleTestsDrag} orientation="horizontal" />
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
          <LabResizableHandle onDrag={handleContentDrag} />
          <div className="jsl-editor-panel" ref={editorPanelRef} style={{ flex: `${1 - contentRatio} 1 0` }}>
            <LabEditorToolbar
              isRunning={isRunning}
              onRun={runCode}
              onReset={() => {
                let starter = "";
                if (view === "learn" && currentLesson) starter = currentLesson.starterCode;
                else if (view === "challenge" && currentChallenge) starter = currentChallenge.starterCode;
                else if (view === "project" && currentProject) starter = currentProject.starterCode;
                else if (view === "bugs" && currentBug) starter = currentBug.brokenCode;
                if (editorRef.current) editorRef.current.setValue(starter);
                setCode(starter);
                setOutput([]);
                setTestResults([]);
                codeVersionRef.current++;
              }}
              runLabel="Run"
              lang="Python"
              langIcon={<DiPython size={12} />}
              shortcut={
                !pyodideReady && !pyodideLoadError ? "Loading Python runtime..." :
                pyodideLoadError ? "Python runtime unavailable" :
                "Ctrl+Enter to run"
              }
            />

            {/* Editor */}
            <div className="jsl-editor-wrapper">
              <Editor
                key={`${codeVersionRef.current}`}
                height="100%"
                language="python"
                theme={monacoTheme}
                value={code}
                onChange={handleCodeChange}
                onMount={handleEditorMount}
                options={{
                  fontSize: 13,
                  fontFamily: "Consolas, 'Courier New', monospace",
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  lineNumbers: "on",
                  tabSize: 4,
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

            {/* Resizable Console Panel */}
            <LabResizableHandle onDrag={handleConsoleDrag} orientation="horizontal" />
            <div className="jsl-console-panel" style={{ height: consoleHeight, maxHeight: consoleHeight, minHeight: consoleHeight }}>
              <LabConsolePanel output={output} title="Python Output" emptyMessage="Run your Python code to see output" />
            </div>
          </div>
        </div>
        </div>
      </div>

      <LabFooter />
    </div>
  );
}

// ─── LESSON VIEW ───

function LessonView({ lesson, showHint, showSolution, onToggleHint, onToggleSolution, onPrev, onNext, hasPrev, hasNext }) {
  const levelColor = lesson.level === "Beginner" ? "#22c55e" : lesson.level === "Intermediate" ? "#f59e0b" : "#ef4444";

  return (
    <div className="jsl-content-inner">
      <div className="jsl-chapter-header">
        <span className="jsl-chapter-badge" style={{ background: "rgba(55,118,171,0.11)", borderColor: "rgba(55,118,171,0.18)", color: "#4b8bbe" }}>Chapter {lesson.chapter}</span>
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
          {renderFormattedText(lesson.conceptExplanation)}
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
          {renderFormattedText(lesson.task)}
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
          <CodeBlock code={lesson.solutionCode} />
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
      </div>

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

// ─── CHALLENGE VIEW ───

function ChallengeView({ challenge, showHint, showSolution, onToggleHint, onToggleSolution }) {
  const diffColor = challenge.difficulty === "Easy" ? "#22c55e" : challenge.difficulty === "Medium" ? "#f59e0b" : "#ef4444";

  return (
    <div className="jsl-content-inner">
      <div className="jsl-chapter-header">
        <span className="jsl-chapter-badge" style={{ background: "rgba(245,158,11,0.11)", borderColor: "rgba(245,158,11,0.18)", color: "#f59e0b" }}>🏆 Code Challenge</span>
        <h2 className="jsl-content-title">{challenge.title}</h2>
        <div className="jsl-chapter-meta">
          <span className="jsl-diff-badge" style={{ color: diffColor, borderColor: `${diffColor}33`, background: `${diffColor}15` }}>{challenge.difficulty}</span>
          <div className="jsl-tags">
            {challenge.tags.map(t => <span key={t} className="jsl-tag">{t}</span>)}
          </div>
        </div>
      </div>

      <div className="jsl-section">
        <h3 className="jsl-section-title">Problem</h3>
        <div className="jsl-text">{renderFormattedText(challenge.problem)}</div>
      </div>

      {showHint && (
        <div className="jsl-hint-box">
          <strong>💡 Hint:</strong> {challenge.hint}
        </div>
      )}

      {showSolution && (
        <div className="jsl-solution-box">
          <h4>Solution</h4>
          <CodeBlock code={challenge.solution} />
        </div>
      )}

      <div className="jsl-content-actions">
        <button className="jsl-btn-ghost" onClick={onToggleHint}>
          {showHint ? "Hide Hint" : "💡 Show Hint"}
        </button>
        <button className="jsl-btn-ghost" onClick={onToggleSolution}>
          {showSolution ? "Hide Solution" : "🔍 Show Solution"}
        </button>
      </div>
    </div>
  );
}

// ─── PROJECT VIEW ───

function ProjectView({ project, showSolution, onToggleSolution }) {
  return (
    <div className="jsl-content-inner">
      <div className="jsl-chapter-header">
        <span className="jsl-chapter-badge project">📱 Project Lab</span>
        <h2 className="jsl-content-title">{project.title}</h2>
      </div>

      <div className="jsl-section">
        <h3 className="jsl-section-title">Overview</h3>
        <div className="jsl-text">{renderFormattedText(project.overview)}</div>
        <div className="jsl-text" style={{ marginTop: "0.5rem", color: "#94a3b8" }}><strong>Why?</strong> {renderFormattedText(project.why)}</div>
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
          <CodeBlock code={project.solution} />
        </div>
      )}

      <div className="jsl-content-actions">
        <button className="jsl-btn-ghost" onClick={onToggleSolution}>
          {showSolution ? "Hide Solution" : "🔍 Show Solution"}
        </button>
      </div>
    </div>
  );
}

// ─── DEBUG CHALLENGE VIEW ───

function BugView({ bug, showHint, showSolution, onToggleHint, onToggleSolution }) {
  return (
    <div className="jsl-content-inner">
      <div className="jsl-chapter-header">
        <span className="jsl-chapter-badge bug">🐛 Debug Challenge</span>
        <h2 className="jsl-content-title">{bug.title}</h2>
      </div>

      <div className="jsl-section">
        <h3 className="jsl-section-title">Problem</h3>
        <div className="jsl-text">{renderFormattedText(bug.problem)}</div>
      </div>

      <div className="jsl-section">
        <h3 className="jsl-section-title">Learning Goal</h3>
        <div className="jsl-text">{renderFormattedText(bug.learningGoal)}</div>
      </div>

      <div className="jsl-section">
        <h3 className="jsl-section-title">Expected Result</h3>
        <div className="jsl-text">{renderFormattedText(bug.expectedResult)}</div>
      </div>

      {showHint && (
        <div className="jsl-hint-box">
          <strong>💡 Hint:</strong> {bug.hint}
        </div>
      )}

      {showSolution && (
        <div className="jsl-solution-box">
          <h4>Solution</h4>
          <CodeBlock code={bug.solution} />
        </div>
      )}

      <div className="jsl-content-actions">
        <button className="jsl-btn-ghost" onClick={onToggleHint}>
          {showHint ? "Hide Hint" : "💡 Show Hint"}
        </button>
        <button className="jsl-btn-ghost" onClick={onToggleSolution}>
          {showSolution ? "Hide Solution" : "🔍 Show Solution"}
        </button>
      </div>
    </div>
  );
}
