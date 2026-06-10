import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Editor from "@monaco-editor/react";
import { JS_LESSONS, JS_BUG_CHALLENGES, JS_MINI_PROJECTS } from "../../data/js-labs-curriculum.js";

// ─── ICON COMPONENTS ───

function BookIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/><line x1="8" y1="7" x2="16" y2="7"/></svg>; }
function BugIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>; }
function ProjectIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>; }
function CheckIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>; }

// ─── SIDEBAR ───

function JSSidebar({ activeSection, activeLesson, activeBug, activeProject, onSelectLesson, onSelectBug, onSelectProject, progress }) {
  const [expandedSections, setExpandedSections] = useState({ learn: true, bugs: false, projects: false });

  const toggleSection = (key) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isLessonActive = (id) => activeSection === "learn" && activeLesson === id;
  const isBugActive = (id) => activeSection === "bugs" && activeBug === id;
  const isProjectActive = (id) => activeSection === "projects" && activeProject === id;

  return (
    <div className="jsl-sidebar">
      <div className="jsl-sidebar-header">
        <h3>
          <BookIcon />
          Curriculum
        </h3>
      </div>

      {/* ─── LEARN JAVASCRIPT ─── */}
      <div className="jsl-sidebar-group">
        <button
          className={`jsl-sg-header ${expandedSections.learn ? "expanded" : ""}`}
          onClick={() => toggleSection("learn")}
        >
          <div className="jsl-sg-title">
            <BookIcon />
            <span>LEARN JAVASCRIPT</span>
          </div>
          <span className="jsl-sg-count">{progress.lessonsDone}/{progress.lessonsTotal}</span>
          <svg className="jsl-sg-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
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
            {JS_BUG_CHALLENGES.map((bug) => (
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
            {JS_MINI_PROJECTS.map((proj) => (
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

export default function JSLabsPlatform() {
  const [view, setView] = useState("learn");
  const [activeLesson, setActiveLesson] = useState(JS_LESSONS[0]?.id || null);
  const [activeBug, setActiveBug] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState([]);
  const [testResults, setTestResults] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [monacoTheme, setMonacoTheme] = useState("vs-dark");
  const [progress, setProgress] = useState({ lessons: [], bugs: [], projects: [] });
  const [isRunning, setIsRunning] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState("editor");
  const outputRef = useRef(null);
  const editorRef = useRef(null);

  // Load progress from sessionStorage
  useEffect(() => {
    try {
      const stored = JSON.parse(sessionStorage.getItem("jsl-progress") || '{"lessons":[],"bugs":[],"projects":[]}');
      setProgress(stored);
    } catch { /* ignore */ }
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

  // Set code when switching content
  useEffect(() => {
    if (view === "learn" && currentLesson) {
      setCode(currentLesson.starterCode);
      setShowHint(false);
      setShowSolution(false);
      setOutput([]);
      setTestResults([]);
    } else if (view === "bugs" && currentBug) {
      setCode(currentBug.brokenCode);
      setShowHint(false);
      setShowSolution(false);
      setOutput([]);
      setTestResults([]);
    } else if (view === "projects" && currentProject) {
      setCode(currentProject.starterCode);
      setShowHint(false);
      setShowSolution(false);
      setOutput([]);
      setTestResults([]);
    }
  }, [view, currentLesson, currentBug, currentProject]);

  // Navigation
  const selectLesson = (id) => { setView("learn"); setActiveLesson(id); setActiveBug(null); setActiveProject(null); };
  const selectBug = (id) => { setView("bugs"); setActiveLesson(null); setActiveBug(id); setActiveProject(null); };
  const selectProject = (id) => { setView("projects"); setActiveLesson(null); setActiveBug(null); setActiveProject(id); };

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

    const results = tests.map((test, i) => {
      try {
        const passed = test.validate(code);
        return { index: i, name: test.name, passed };
      } catch {
        return { index: i, name: test.name, passed: false };
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
          <a href={`${base}practice`} className="jsl-top-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Labs
          </a>
          <div className="jsl-top-brand">
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="8" fill="url(#jsl-grad)" />
              <text x="14" y="19" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">JS</text>
              <defs>
                <linearGradient id="jsl-grad" x1="0" y1="0" x2="28" y2="28">
                  <stop offset="0%" stopColor="#f7df1e" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
            </svg>
            <span className="jsl-top-title">JavaScript Labs</span>
          </div>
        </div>
        <div className="jsl-topbar-center">
          <span className="jsl-top-progress-text">{progressStats.total}/{progressStats.totalAll} completed</span>
          <div className="jsl-top-progress-bar"><div className="jsl-top-progress-fill" style={{ width: `${progressStats.pct}%` }} /></div>
          <span className="jsl-top-percent">{progressStats.pct}%</span>
        </div>
        <div className="jsl-topbar-right">
          <button className="jsl-btn-icon" onClick={() => setMonacoTheme(t => t === "vs-dark" ? "light" : "vs-dark")} title="Toggle theme">
            {monacoTheme === "vs-dark" ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
            )}
          </button>
        </div>
      </div>

      {/* ─── Main Layout ─── */}
      <div className="jsl-main">
        <div className="jsl-body">
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
        />

        {/* Content & Editor */}
        <div className="jsl-workspace">
          {/* Content Panel */}
          <div className="jsl-content-panel">
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
              />
            )}
            {view === "projects" && currentProject && (
              <ProjectView
                project={currentProject}
                showSolution={showSolution}
                onToggleSolution={() => setShowSolution(s => !s)}
                onMarkDone={() => markProjectDone(currentProject.id)}
                isDone={progress.projects.includes(currentProject.id)}
              />
            )}
          </div>

          {/* Editor & Output Panel */}
          <div className="jsl-editor-panel">
            <div className="jsl-editor-tabs">
              <button className={`jsl-editor-tab ${activeSubTab === "editor" ? "active" : ""}`} onClick={() => setActiveSubTab("editor")}>Editor</button>
              <button className={`jsl-editor-tab ${activeSubTab === "output" ? "active" : ""}`} onClick={() => setActiveSubTab("output")}>Console</button>
            </div>

            {activeSubTab === "editor" ? (
              <div className="jsl-editor-container">
                <div className="jsl-editor-actions">
                  <button className="jsl-btn-run" onClick={runCode} disabled={isRunning} title="Ctrl+Enter to run">
                    {isRunning ? (
                      <><span className="jsl-spinner" /> Running</>
                    ) : (
                      <><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg> Run</>
                    )}
                  </button>
                  <button className="jsl-btn-secondary" onClick={() => {
                    if (view === "learn" && currentLesson) setCode(currentLesson.starterCode);
                    else if (view === "bugs" && currentBug) setCode(currentBug.brokenCode);
                    else if (view === "projects" && currentProject) setCode(currentProject.starterCode);
                    setOutput([]);
                    setTestResults([]);
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
                    Reset
                  </button>
                  <span className="jsl-editor-shortcut">Ctrl+Enter to run</span>
                </div>
                <div className="jsl-editor-wrapper">
                  <Editor
                    height="100%"
                    language="javascript"
                    theme={monacoTheme}
                    value={code}
                    onChange={(v) => setCode(v || "")}
                    options={{
                      fontSize: 13,
                      fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
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
              </div>
            ) : (
              <div className="jsl-console-panel" ref={outputRef}>
                <div className="jsl-console-header">
                  <span>Console Output</span>
                  <span className="jsl-console-count">{output.length} lines</span>
                </div>
                <div className="jsl-console-body">
                  {output.length === 0 ? (
                    <div className="jsl-console-empty">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
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
            )}
          </div>
        </div>

        {/* ─── Tests Panel ─── */}
        </div>

        <div className="jsl-tests-panel">
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
                <span className={`jsl-tests-score ${testResults.filter(r => r.passed).length === testResults.length ? "all-pass" : ""}`}>
                  {testResults.filter(r => r.passed).length}/{testResults.length} Passed
                </span>
              )}
              <button className="jsl-btn-secondary jsl-btn-sm" onClick={runTests}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>
                Run Tests
              </button>
            </div>
          </div>
          <div className="jsl-tests-body">
            {testResults.length === 0 ? (
              <div className="jsl-tests-empty">Click "Run Tests" to validate your code against automated checks</div>
            ) : (
              testResults.map((r, i) => (
                <div key={i} className={`jsl-test-item ${r.passed ? "pass" : "fail"}`}>
                  <span className="jsl-test-icon">{r.passed ? "✓" : "✗"}</span>
                  <span className="jsl-test-name">{r.name}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── LESSON VIEW ───

function LessonView({ lesson, showHint, showSolution, onToggleHint, onToggleSolution, onPrev, onNext, hasPrev, hasNext, onMarkDone, isDone }) {
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

function BugView({ bug, showHint, showSolution, onToggleHint, onToggleSolution, onPrev, onNext, hasPrev, hasNext, onMarkDone, isDone }) {
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

function ProjectView({ project, showSolution, onToggleSolution, onMarkDone, isDone }) {
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
    </div>
  );
}
