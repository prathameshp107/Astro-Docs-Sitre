import { FiBook, FiCheck, FiCheckSquare, FiChevronDown, FiChevronLeft, FiChevronRight, FiRefreshCw } from "react-icons/fi";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Editor from "@monaco-editor/react";
import { SkeletonLabPlatform } from "../Skeleton.jsx";
import { DiHtml5 } from "react-icons/di";


import {
  HTML_LESSONS,
  HTML_CHALLENGES,
  HTML_PROJECTS,
  HTML_INTERVIEW_TOPICS,
} from "../../data/html-labs-curriculum.js";

import {
  LabResizableHandle,
  LabFooter,
  LabEditorToolbar,
  LabTopbar,
  useKeyboardShortcut,
} from "./shared/index.js";

// ─── SIDEBAR ───

function HTMLSidebar({ activeSection, activeLesson, activeChallenge, activeProject, activeInterview, onSelectLesson, onSelectChallenge, onSelectProject, onSelectInterview, onSelectPlayground, progress, ...rest }) {
  const [expandedSections, setExpandedSections] = useState({
    learn: true, challenges: false, projects: false, interview: false
  });
  const toggleSection = (key) => setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));

  const isLessonActive = (id) => activeSection === "learn" && activeLesson === id;
  const isChallengeActive = (id) => activeSection === "challenge" && activeChallenge === id;
  const isProjectActive = (id) => activeSection === "project" && activeProject === id;
  const isInterviewActive = (id) => activeSection === "interview" && activeInterview === id;

  return (
    <div className="jsl-sidebar" {...rest}>
      <div className="jsl-sidebar-header">
        <h3><FiBook size={16} /> Curriculum</h3>
      </div>

      {/* Playground shortcut */}
      <div className="jsl-sidebar-group">
        <button
          className={`jsl-sg-header ${activeSection === "playground" ? "expanded" : ""}`}
          onClick={onSelectPlayground}
          style={{ color: activeSection === "playground" ? "#f472b6" : undefined }}
        >
          <div className="jsl-sg-title" style={{ color: "#f472b6" }}>
            <FiBook size={16} /> <span>HTML PLAYGROUND</span>
          </div>
        </button>
      </div>

      {/* LEARN HTML */}
      <div className="jsl-sidebar-group">
        <button className={`jsl-sg-header learn ${expandedSections.learn ? "expanded" : ""}`} onClick={() => toggleSection("learn")}>
          <div className="jsl-sg-title" style={{ color: "#fb923c" }}><FiBook size={16} /><span>LEARN HTML</span></div>
          <span className="jsl-sg-count">{progress.lessonsDone}/{progress.lessonsTotal}</span>
          <FiChevronDown size={14} />
        </button>
        {expandedSections.learn && (
          <div className="jsl-sg-items">
            {HTML_LESSONS.map((lesson) => (
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
          <div className="jsl-sg-title" style={{ color: "#34d399" }}><FiBook size={16} /><span>CODE CHALLENGES</span></div>
          <span className="jsl-sg-count">{progress.challengesDone}/{progress.challengesTotal}</span>
          <FiChevronDown size={14} />
        </button>
        {expandedSections.challenges && (
          <div className="jsl-sg-items">
            {HTML_CHALLENGES.map((c, i) => (
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
          <div className="jsl-sg-title" style={{ color: "#a78bfa" }}><FiBook size={16} /><span>PROJECTS LAB</span></div>
          <span className="jsl-sg-count">{progress.projectsDone}/{progress.projectsTotal}</span>
          <FiChevronDown size={14} />
        </button>
        {expandedSections.projects && (
          <div className="jsl-sg-items">
            {HTML_PROJECTS.map((proj, i) => (
              <button
                key={proj.id}
                className={`jsl-si ${isProjectActive(proj.id) ? "active" : ""} ${progress.projects.includes(proj.id) ? "done" : ""}`}
                onClick={() => onSelectProject(proj.id)}
              >
                <span className="jsl-si-num">{i + 1}.</span>
                <span className="jsl-si-title">{proj.title}</span>
                {progress.projects.includes(proj.id) && <span className="jsl-si-check"><FiCheck size={16} /></span>}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* INTERVIEW PREP */}
      <div className="jsl-sidebar-group">
        <button className={`jsl-sg-header ${expandedSections.interview ? "expanded" : ""}`} onClick={() => toggleSection("interview")}>
          <div className="jsl-sg-title" style={{ color: "#fcd34d" }}><FiBook size={16} /><span>INTERVIEW PREP</span></div>
          <span className="jsl-sg-count">{progress.interviewDone}/{progress.interviewTotal}</span>
          <FiChevronDown size={14} />
        </button>
        {expandedSections.interview && (
          <div className="jsl-sg-items">
            {HTML_INTERVIEW_TOPICS.map((topic) => (
              <button
                key={topic.id}
                className={`jsl-si ${isInterviewActive(topic.id) ? "active" : ""} ${progress.interview.includes(topic.id) ? "done" : ""}`}
                onClick={() => onSelectInterview(topic.id)}
              >
                <span className="jsl-si-title">{topic.title}</span>
                <span className="jsl-si-num" style={{ minWidth: "auto", marginLeft: "auto" }}>{topic.questions.length}Q</span>
                {progress.interview.includes(topic.id) && <span className="jsl-si-check"><FiCheck size={16} /></span>}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── MAIN PLATFORM ───

export default function HTMLLabsPlatform() {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("learn");
  const [activeLesson, setActiveLesson] = useState(HTML_LESSONS[0]?.id || null);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const [activeInterview, setActiveInterview] = useState(null);
  const [code, setCode] = useState(HTML_LESSONS[0]?.starterCode || "");
  const [testResults, setTestResults] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [monacoTheme, setMonacoTheme] = useState("jsl-dark");
  const [progress, setProgress] = useState({ lessons: [], challenges: [], projects: [], interview: [] });
  const [previewMode, setPreviewMode] = useState("desktop"); // desktop, tablet, mobile
  const [editorMode, setEditorMode] = useState("html"); // html, htmlcss, htmlcssjs
  const [previewCode, setPreviewCode] = useState(code);
  const [isRunning, setIsRunning] = useState(false);
  const editorRef = useRef(null);
  const iframeRef = useRef(null);
  const codeVersionRef = useRef(0);
  const editorPanelRef = useRef(null);
  const contentPanelRef = useRef(null);
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const [contentRatio, setContentRatio] = useState(0.5);
  const [previewHeight, setPreviewHeight] = useState(250);
  const bodyRef = useRef(null);
  const workspaceRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 100);
    try {
      const stored = JSON.parse(localStorage.getItem("html-progress") || '{"lessons":[],"challenges":[],"projects":[],"interview":[]}');
      setProgress(stored);
    } catch {}
    return () => clearTimeout(timer);
  }, []);

  const saveProgress = useCallback((newProgress) => {
    setProgress(newProgress);
    try { localStorage.setItem("html-progress", JSON.stringify(newProgress)); } catch {}
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

  const markInterviewDone = useCallback((id) => {
    if (!progress.interview.includes(id)) saveProgress({ ...progress, interview: [...progress.interview, id] });
  }, [progress, saveProgress]);

  const progressStats = useMemo(() => ({
    lessonsDone: progress.lessons.length,
    lessonsTotal: HTML_LESSONS.length,
    challengesDone: progress.challenges.length,
    challengesTotal: HTML_CHALLENGES.length,
    projectsDone: progress.projects.length,
    projectsTotal: HTML_PROJECTS.length,
    interviewDone: progress.interview.length,
    interviewTotal: HTML_INTERVIEW_TOPICS.length,
    total: progress.lessons.length + progress.challenges.length + progress.projects.length + progress.interview.length,
    totalAll: HTML_LESSONS.length + HTML_CHALLENGES.length + HTML_PROJECTS.length + HTML_INTERVIEW_TOPICS.length,
    pct: Math.round(((progress.lessons.length + progress.challenges.length + progress.projects.length + progress.interview.length) / (HTML_LESSONS.length + HTML_CHALLENGES.length + HTML_PROJECTS.length + HTML_INTERVIEW_TOPICS.length)) * 100),
    lessons: progress.lessons,
    challenges: progress.challenges,
    projects: progress.projects,
    interview: progress.interview,
  }), [progress]);

  const currentLesson = useMemo(() => HTML_LESSONS.find(l => l.id === activeLesson), [activeLesson]);
  const currentChallenge = useMemo(() => HTML_CHALLENGES.find(c => c.id === activeChallenge), [activeChallenge]);
  const currentProject = useMemo(() => HTML_PROJECTS.find(p => p.id === activeProject), [activeProject]);
  const currentInterview = useMemo(() => HTML_INTERVIEW_TOPICS.find(t => t.id === activeInterview), [activeInterview]);

  const selectLesson = (id) => {
    const lesson = HTML_LESSONS.find(l => l.id === id);
    if (!lesson) return;
    setView("learn");
    setActiveLesson(id);
    setActiveChallenge(null);
    setActiveProject(null);
    setActiveInterview(null);
    setCode(lesson.starterCode);
    setShowHint(false);
    setShowSolution(false);
    setTestResults([]);
    codeVersionRef.current++;
  };

  const selectChallenge = (id) => {
    const challenge = HTML_CHALLENGES.find(c => c.id === id);
    if (!challenge) return;
    setView("challenge");
    setActiveLesson(null);
    setActiveChallenge(id);
    setActiveProject(null);
    setActiveInterview(null);
    setCode(challenge.starterCode);
    setShowHint(false);
    setShowSolution(false);
    setTestResults([]);
    codeVersionRef.current++;
  };

  const selectProject = (id) => {
    const proj = HTML_PROJECTS.find(p => p.id === id);
    if (!proj) return;
    setView("project");
    setActiveLesson(null);
    setActiveChallenge(null);
    setActiveProject(id);
    setActiveInterview(null);
    setCode(proj.starterCode);
    setShowHint(false);
    setShowSolution(false);
    setTestResults([]);
    codeVersionRef.current++;
  };

  const selectInterview = (id) => {
    const topic = HTML_INTERVIEW_TOPICS.find(t => t.id === id);
    if (!topic) return;
    setView("interview");
    setActiveLesson(null);
    setActiveChallenge(null);
    setActiveProject(null);
    setActiveInterview(id);
    setCode("");
    setShowHint(false);
    setShowSolution(false);
    setTestResults([]);
  };

  const selectPlayground = () => {
    setView("playground");
    setActiveLesson(null);
    setActiveChallenge(null);
    setActiveProject(null);
    setActiveInterview(null);
    setCode(`<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8" />\n  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n  <title>HTML Playground</title>\n</head>\n<body>\n  <h1>Hello, HTML!</h1>\n  <p>Start editing to see the live preview.</p>\n</body>\n</html>`);
    setShowHint(false);
    setShowSolution(false);
    setTestResults([]);
    codeVersionRef.current++;
  };

  // Live preview update — use ref to avoid redundant effects
  const codeRef = useRef(code);
  codeRef.current = code;

  const updatePreview = useCallback(() => {
    const currentCode = codeRef.current;
    if (!currentCode || view === "interview") return;
    setPreviewCode(currentCode);
  }, [view]);

  // Update preview whenever code changes (debounced via ref)
  useEffect(() => {
    if (view !== "interview") {
      updatePreview();
    }
  }, [code, view, updatePreview]);

  const defineThemes = useCallback((monaco) => {
    monaco.editor.defineTheme("jsl-dark", {
      base: "vs-dark", inherit: true,
      rules: [
        { token: "comment", foreground: "64748b", fontStyle: "italic" },
        { token: "tag", foreground: "fb923c" },
        { token: "metatag", foreground: "fb923c" },
        { token: "attribute.name", foreground: "60a5fa" },
        { token: "attribute.value", foreground: "34d399" },
        { token: "string", foreground: "34d399" },
        { token: "keyword", foreground: "a78bfa" },
        { token: "number", foreground: "f59e0b" },
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
        { token: "tag", foreground: "ea580c" },
        { token: "attribute.name", foreground: "2563eb" },
        { token: "attribute.value", foreground: "059669" },
        { token: "string", foreground: "059669" },
        { token: "keyword", foreground: "7c3aed" },
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

  const handlePreviewDrag = useCallback(({ clientY }) => {
    if (!editorPanelRef.current) return;
    const rect = editorPanelRef.current.getBoundingClientRect();
    const maxH = rect.height * 0.7;
    setPreviewHeight(Math.max(120, Math.min(maxH, rect.bottom - clientY)));
  }, []);

  // Run tests
  const runTests = useCallback(() => {
    const tests = view === "learn" ? currentLesson?.tests || []
      : view === "challenge" ? currentChallenge?.tests || []
      : view === "project" ? currentProject?.tests || []
      : [];

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
    }
  }, [code, view, currentLesson, currentChallenge, currentProject, markLessonDone, markChallengeDone, markProjectDone]);

  useKeyboardShortcut(updatePreview);

  const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");

  const goNextLesson = () => {
    const idx = HTML_LESSONS.findIndex(l => l.id === activeLesson);
    if (idx < HTML_LESSONS.length - 1) selectLesson(HTML_LESSONS[idx + 1].id);
  };
  const goPrevLesson = () => {
    const idx = HTML_LESSONS.findIndex(l => l.id === activeLesson);
    if (idx > 0) selectLesson(HTML_LESSONS[idx - 1].id);
  };

  const currentContent = useMemo(() => {
    if (view === "learn") return currentLesson;
    if (view === "challenge") return currentChallenge;
    if (view === "project") return currentProject;
    if (view === "interview") return currentInterview;
    if (view === "playground") return { id: "playground", title: "HTML Playground" };
    return null;
  }, [view, currentLesson, currentChallenge, currentProject, currentInterview]);

  const currentTests = useMemo(() => {
    if (view === "learn") return currentLesson?.tests || [];
    if (view === "challenge") return currentChallenge?.tests || [];
    if (view === "project") return currentProject?.tests || [];
    return [];
  }, [view, currentLesson, currentChallenge, currentProject]);

  const previewWidth = previewMode === "mobile" ? "375px" : previewMode === "tablet" ? "768px" : "100%";

  if (loading) {
    return <div className="jsl-platform"><SkeletonLabPlatform /></div>;
  }

  if (!currentContent && view !== "playground") {
    return (
      <div className="jsl-platform">
        <div className="jsl-empty" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", color: "#64748b", flexDirection: "column", gap: "0.5rem" }}>
          <h2 style={{ color: "#e2e8f0" }}>Welcome to HTML Labs</h2>
          <p>Select a lesson, challenge, project, or interview topic from the sidebar to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="jsl-platform">
      <LabTopbar
        base={base}
        title="HTML Labs"
        icon={{
          component: <DiHtml5 size={18} />,
          style: { background: "rgba(251,146,60,0.08)", borderColor: "rgba(251,146,60,0.18)" },
        }}
        progressStats={progressStats}
        monacoTheme={monacoTheme}
        onToggleTheme={() => setMonacoTheme(t => t === "jsl-dark" ? "jsl-light" : "jsl-dark")}
      >
        {((view === "learn" && currentLesson) || (view === "challenge" && currentChallenge) || (view === "project" && currentProject)) && (
          <button className={`jsl-btn-mark jsl-btn-topbar done`} onClick={() => {
            if (view === "learn" && currentLesson) markLessonDone(currentLesson.id);
            else if (view === "challenge" && currentChallenge) markChallengeDone(currentChallenge.id);
            else if (view === "project" && currentProject) markProjectDone(currentProject.id);
          }}>
            <FiBook size={16} /> Mark Complete
          </button>
        )}
      </LabTopbar>

      {/* Main Layout */}
      <div className="jsl-main">
        <div className="jsl-body" ref={bodyRef}>
          <HTMLSidebar
            activeSection={view}
            activeLesson={activeLesson}
            activeChallenge={activeChallenge}
            activeProject={activeProject}
            activeInterview={activeInterview}
            onSelectLesson={selectLesson}
            onSelectChallenge={selectChallenge}
            onSelectProject={selectProject}
            onSelectInterview={selectInterview}
            onSelectPlayground={selectPlayground}
            progress={progressStats}
            style={{ width: sidebarWidth }}
          />
          <LabResizableHandle onDrag={handleSidebarDrag} />

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
                    hasPrev={HTML_LESSONS.findIndex(l => l.id === activeLesson) > 0}
                    hasNext={HTML_LESSONS.findIndex(l => l.id === activeLesson) < HTML_LESSONS.length - 1}
                    onMarkDone={() => markLessonDone(currentLesson.id)}
                    isDone={progress.lessons.includes(currentLesson.id)}
                    testResults={testResults}
                    currentTests={currentTests}
                    onRunTests={runTests}
                  />
                )}
                {view === "challenge" && currentChallenge && (
                  <ChallengeView
                    challenge={currentChallenge}
                    showHint={showHint}
                    showSolution={showSolution}
                    onToggleHint={() => setShowHint(h => !h)}
                    onToggleSolution={() => setShowSolution(s => !s)}
                    testResults={testResults}
                    currentTests={currentTests}
                    onRunTests={runTests}
                  />
                )}
                {view === "project" && currentProject && (
                  <ProjectView
                    project={currentProject}
                    showSolution={showSolution}
                    onToggleSolution={() => setShowSolution(s => !s)}
                    testResults={testResults}
                    currentTests={currentTests}
                    onRunTests={runTests}
                  />
                )}
                {view === "interview" && currentInterview && (
                  <InterviewView
                    topic={currentInterview}
                    onMarkDone={() => markInterviewDone(currentInterview.id)}
                    isDone={progress.interview.includes(currentInterview.id)}
                  />
                )}
                {view === "playground" && (
                  <PlaygroundView />
                )}
              </div>

              {/* Tests Panel */}
              {(view === "learn" || view === "challenge" || view === "project") && currentTests.length > 0 && (
                <>
                  <LabResizableHandle onDrag={handlePreviewDrag} orientation="horizontal" />
                  <div className="jsl-tests-panel" style={{ height: 120, maxHeight: 120, minHeight: 120 }}>
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
                      {currentTests.map((test, i) => {
                        const result = testResults.find(r => r.index === i);
                        const passed = result?.passed;
                        const hasResult = result !== undefined;
                        return (
                          <div key={i} className={`jsl-test-item ${hasResult ? (passed ? "pass" : "fail") : "pending"}`}>
                            <span className="jsl-test-icon">{hasResult ? (passed ? "✓" : "✗") : "○"}</span>
                            <span className="jsl-test-name">{test.name}</span>
                            {hasResult && !passed && result?.error && <span className="jsl-test-error">{result.error}</span>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Editor & Preview */}
            <LabResizableHandle onDrag={handleContentDrag} />
            <div className="jsl-editor-panel" ref={editorPanelRef} style={{ flex: `${1 - contentRatio} 1 0` }}>
              <LabEditorToolbar
                isRunning={false}
                onRun={updatePreview}
                onReset={() => {
                  let starter = '';
                  if (view === 'learn' && currentLesson) starter = currentLesson.starterCode;
                  else if (view === 'challenge' && currentChallenge) starter = currentChallenge.starterCode;
                  else if (view === 'project' && currentProject) starter = currentProject.starterCode;
                  else if (view === 'playground') starter = '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8" />\n  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n  <title>HTML Playground</title>\n</head>\n<body>\n  <h1>Hello, HTML!</h1>\n</body>\n</html>';
                  if (editorRef.current) editorRef.current.setValue(starter);
                  setCode(starter);
                  setTestResults([]);
                  codeVersionRef.current++;
                }}
                runLabel="Preview"
                lang="HTML"
                runButtonStyle={{ background: "rgba(96,165,250,0.14)", color: "#60a5fa" }}
                extraButtons={
                  <div className="jsl-editor-mode-tabs" style={{ display: "flex", gap: "0.2rem", marginLeft: "0.25rem" }}>
                    {["html", "htmlcss", "htmlcssjs"].map(mode => (
                      <button
                        key={mode}
                        className={`jsl-mode-tab ${editorMode === mode ? "active" : ""}`}
                        onClick={() => setEditorMode(mode)}
                        style={{
                          padding: "0.2rem 0.5rem", borderRadius: "4px", fontSize: "0.68rem",
                          fontWeight: 700, border: "1px solid transparent",
                          background: editorMode === mode ? "rgba(96,165,250,0.12)" : "transparent",
                          color: editorMode === mode ? "#60a5fa" : "#64748b",
                        }}
                      >
                        {mode === "html" ? "HTML" : mode === "htmlcss" ? "HTML+CSS" : "HTML+CSS+JS"}
                      </button>
                    ))}
                  </div>
                }
              />

              <div className="jsl-editor-wrapper">
                <Editor
                  key={`html-${codeVersionRef.current}`}
                  height="100%"
                  language="html"
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

              {/* Preview Panel */}
              <LabResizableHandle onDrag={handlePreviewDrag} orientation="horizontal" />
              <div className="jsl-preview-panel" style={{ height: previewHeight, maxHeight: previewHeight, minHeight: previewHeight }}>
                <div className="jsl-preview-header">
                  <div className="jsl-preview-header-left">
                    <span className="jsl-browser-dots">
                      <span className="jsl-browser-dot red" />
                      <span className="jsl-browser-dot yellow" />
                      <span className="jsl-browser-dot green" />
                    </span>
                    <span className="jsl-preview-url">localhost:3000/</span>
                  </div>
                  <div className="jsl-preview-info">
                    <button
                      className={`jsl-mode-tab ${previewMode === "mobile" ? "active" : ""}`}
                      onClick={() => setPreviewMode("mobile")}
                      style={{
                        padding: "0.15rem 0.4rem", borderRadius: "3px", fontSize: "0.65rem",
                        background: previewMode === "mobile" ? "rgba(96,165,250,0.12)" : "transparent",
                        color: previewMode === "mobile" ? "#60a5fa" : "#64748b",
                        border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.2rem",
                      }}
                      title="Mobile preview"
                    >
                      <FiBook size={16} /> Mobile
                    </button>
                    <button
                      className={`jsl-mode-tab ${previewMode === "tablet" ? "active" : ""}`}
                      onClick={() => setPreviewMode("tablet")}
                      style={{
                        padding: "0.15rem 0.4rem", borderRadius: "3px", fontSize: "0.65rem",
                        background: previewMode === "tablet" ? "rgba(96,165,250,0.12)" : "transparent",
                        color: previewMode === "tablet" ? "#60a5fa" : "#64748b",
                        border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.2rem",
                      }}
                      title="Tablet preview"
                    >
                      <FiBook size={16} /> Tablet
                    </button>
                    <button
                      className={`jsl-mode-tab ${previewMode === "desktop" ? "active" : ""}`}
                      onClick={() => setPreviewMode("desktop")}
                      style={{
                        padding: "0.15rem 0.4rem", borderRadius: "3px", fontSize: "0.65rem",
                        background: previewMode === "desktop" ? "rgba(96,165,250,0.12)" : "transparent",
                        color: previewMode === "desktop" ? "#60a5fa" : "#64748b",
                        border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.2rem",
                      }}
                      title="Desktop preview"
                    >
                      <FiBook size={16} /> Desktop
                    </button>
                  </div>
                </div>
                <div className="jsl-preview-body" style={{ display: "flex", justifyContent: "center" }}>
                  <div style={{ width: previewWidth, maxWidth: "100%", transition: "width 0.3s ease" }}>
                    <iframe
                      ref={iframeRef}
                      title="HTML Preview"
                      style={{
                        width: "100%", height: "100%", border: "none",
                        background: "#ffffff", borderRadius: "0 0 8px 8px",
                      }}
                      sandbox="allow-scripts"
                      srcDoc={previewCode}
                    />
                  </div>
                </div>
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

function LessonView({ lesson, showHint, showSolution, onToggleHint, onToggleSolution, onPrev, onNext, hasPrev, hasNext, onMarkDone, isDone, testResults, currentTests, onRunTests }) {
  const levelColor = lesson.level === "Beginner" ? "#22c55e" : lesson.level === "Intermediate" ? "#f59e0b" : "#ef4444";

  return (
    <div className="jsl-content-inner">
      <div className="jsl-chapter-header">
        <span className="jsl-chapter-badge" style={{ background: "rgba(251,146,60,0.11)", borderColor: "rgba(251,146,60,0.18)", color: "#fb923c" }}>Chapter {lesson.chapter}</span>
        <h2 className="jsl-content-title">{lesson.title}</h2>
        <div className="jsl-chapter-meta">
          <span className="jsl-diff-badge" style={{ color: levelColor, borderColor: `${levelColor}33`, background: `${levelColor}15` }}>{lesson.level}</span>
          <div className="jsl-tags">
            {lesson.tags.map(t => <span key={t} className="jsl-tag">{t}</span>)}
          </div>
        </div>
      </div>

      {/* Concept */}
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

      {/* Task */}
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
        <span className="jsl-chapter-badge" style={{ background: "rgba(52,211,153,0.11)", borderColor: "rgba(52,211,153,0.18)", color: "#34d399" }}>🏆 Code Challenge</span>
        <h2 className="jsl-content-title">{challenge.title}</h2>
        <div className="jsl-chapter-meta">
          <span className="jsl-diff-badge" style={{ color: diffColor, borderColor: `${diffColor}33`, background: `${diffColor}15` }}>{challenge.difficulty}</span>
          <div className="jsl-tags">
            {challenge.tags.map(t => <span key={t} className="jsl-tag">{t}</span>)}
          </div>
        </div>
      </div>

      <div className="jsl-section jsl-section-problem">
        <h3 className="jsl-section-title">Problem</h3>
        <p className="jsl-text">{challenge.problem}</p>
      </div>

      {challenge.validation && (
        <div className="jsl-section jsl-section-result">
          <h3 className="jsl-section-title">Validation Criteria</h3>
          <pre className="jsl-code-block" style={{ fontSize: "0.78rem", whiteSpace: "pre-wrap" }}>{challenge.validation}</pre>
        </div>
      )}

      {showHint && (
        <div className="jsl-hint-box">
          <strong>💡 Hint:</strong> {challenge.hint}
        </div>
      )}

      {showSolution && (
        <div className="jsl-solution-box">
          <h4>Solution</h4>
          <pre className="jsl-code-block"><code>{challenge.solution}</code></pre>
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
        <span className="jsl-chapter-badge project" style={{ background: "rgba(167,139,250,0.11)", borderColor: "rgba(167,139,250,0.18)", color: "#a78bfa" }}>📱 Project Lab</span>
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
          <h4>Complete Solution</h4>
          <pre className="jsl-code-block"><code>{project.solution}</code></pre>
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

// ─── INTERVIEW VIEW ───

function InterviewView({ topic, onMarkDone, isDone }) {
  const [expandedQ, setExpandedQ] = useState(null);

  return (
    <div className="jsl-content-inner">
      <div className="jsl-chapter-header">
        <span className="jsl-chapter-badge" style={{ background: "rgba(252,211,77,0.11)", borderColor: "rgba(252,211,77,0.18)", color: "#fcd34d" }}>🎯 Interview Prep</span>
        <h2 className="jsl-content-title">{topic.title}</h2>
        <p className="jsl-text" style={{ marginTop: "0.5rem" }}>{topic.questions.length} questions to help you prepare for your frontend interview.</p>
      </div>

      <div className="jsl-section">
        <h3 className="jsl-section-title">Practice Questions</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {topic.questions.map((q, i) => (
            <div
              key={i}
              className={`jsl-interview-q ${expandedQ === i ? "expanded" : ""}`}
              style={{
                padding: "0.75rem 1rem",
                borderRadius: "0.5rem",
                border: "1px solid var(--jsl-border2)",
                background: expandedQ === i ? "rgba(252,211,77,0.05)" : "rgba(255,255,255,0.035)",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              onClick={() => setExpandedQ(expandedQ === i ? null : i)}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: "22px", height: "22px", borderRadius: "50%",
                  background: "rgba(252,211,77,0.12)", color: "#fcd34d",
                  fontSize: "0.75rem", fontWeight: 900, flexShrink: 0,
                }}>{i + 1}</span>
                <span className="jsl-text" style={{ fontSize: "0.88rem", flex: 1 }}>{q}</span>
                <svg
                  width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  style={{
                    flexShrink: 0, color: "#64748b", transition: "transform 0.2s ease",
                    transform: expandedQ === i ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
              {expandedQ === i && (
                <div style={{ marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid var(--jsl-border2)" }}>
                  <p className="jsl-text" style={{ fontSize: "0.84rem", color: "#94a3b8" }}>
                    Think through your answer. Consider:
                  </p>
                  <ul style={{ color: "#94a3b8", fontSize: "0.82rem", margin: "0.3rem 0", paddingLeft: "1.2rem" }}>
                    <li>Explain the concept clearly</li>
                    <li>Provide a practical example</li>
                    <li>Mention best practices and trade-offs</li>
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="jsl-content-actions">
        <button className={`jsl-btn-mark ${isDone ? "done" : ""}`} onClick={onMarkDone}>
          {isDone ? "✓ Reviewed" : "Mark as Reviewed"}
        </button>
      </div>
    </div>
  );
}

// ─── PLAYGROUND VIEW ───

function PlaygroundView() {
  return (
    <div className="jsl-content-inner" style={{ textAlign: "center" }}>
      <div className="jsl-chapter-header">
        <span className="jsl-chapter-badge" style={{ background: "rgba(244,114,182,0.11)", borderColor: "rgba(244,114,182,0.18)", color: "#f472b6" }}>
          <FiBook size={16} /> HTML Playground
        </span>
        <h2 className="jsl-content-title">HTML Playground</h2>
        <p className="jsl-text" style={{ marginTop: "0.5rem" }}>
          Write HTML, CSS, and JavaScript in the editor and see the live preview update in real time!
        </p>
      </div>

      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: "0.75rem", marginTop: "1rem"
      }}>
        {[
          { icon: "⚡", title: "Live Preview", desc: "Changes update instantly" },
          { icon: "📱", title: "Responsive", desc: "Test mobile, tablet, desktop" },
          { icon: "💾", title: "Auto-Save", desc: "Your code is saved locally" },
          { icon: "🎨", title: "HTML+CSS+JS", desc: "Full frontend support" },
        ].map(item => (
          <div key={item.title} className="jsl-section" style={{ padding: "1rem", margin: 0, border: "1px solid var(--jsl-border2)", borderRadius: "0.5rem", background: "rgba(255,255,255,0.02)" }}>
            <div style={{ fontSize: "1.5rem", marginBottom: "0.3rem" }}>{item.icon}</div>
            <h4 style={{ margin: "0 0 0.2rem", color: "#f8fafc", fontSize: "0.9rem" }}>{item.title}</h4>
            <p style={{ margin: 0, color: "#94a3b8", fontSize: "0.78rem" }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
