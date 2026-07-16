// ─── HTML Labs Platform — Refactored ───

import {
  FiBook,
  FiCheckSquare,
  FiRefreshCw,
} from "react-icons/fi";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Editor from "@monaco-editor/react";
import { SkeletonLabPlatform } from "../../Skeleton.jsx";
import { DiHtml5 } from "react-icons/di";

import {
  HTML_LESSONS,
  HTML_CHALLENGES,
  HTML_PROJECTS,
  HTML_INTERVIEW_TOPICS,
} from "../../../data/labs/html/index.js";

import {
  LabResizableHandle,
  LabFooter,
  LabEditorToolbar,
  LabTopbar,
  useKeyboardShortcut,
  LabSidebar,
  LabTour,
  LabCommandPalette,
  useCommandPalette,
} from "../shared/index.js";

import HTMLLessonView from "./components/HTMLLessonView.jsx";
import HTMLChallengeView from "./components/HTMLChallengeView.jsx";
import HTMLProjectView from "./components/HTMLProjectView.jsx";
import HTMLInterviewView from "./components/HTMLInterviewView.jsx";

import { runHtmlTests, handleTestResults } from "./runner/htmlValidator.js";
import { STORAGE_KEY, PLAYGROUND_CODE } from "./config.js";

// ─── MAIN PLATFORM ───

export default function HTMLLabsPlatform() {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("learn");
  const [activeLesson, setActiveLesson] = useState(
    HTML_LESSONS[0]?.id || null
  );
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const [activeInterview, setActiveInterview] = useState(null);
  const [code, setCode] = useState(HTML_LESSONS[0]?.starterCode || "");
  const [testResults, setTestResults] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [monacoTheme, setMonacoTheme] = useState("jsl-dark");
  const [progress, setProgress] = useState({
    lessons: [],
    challenges: [],
    projects: [],
    interview: [],
  });
  const [previewMode, setPreviewMode] = useState("desktop");
  const [editorMode, setEditorMode] = useState("html");
  const [previewCode, setPreviewCode] = useState(code);
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

  // Load progress from localStorage
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 100);
    try {
      const stored = JSON.parse(
        localStorage.getItem(STORAGE_KEY) ||
          '{"lessons":[],"challenges":[],"projects":[],"interview":[]}'
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
      if (!progress.lessons.includes(id))
        saveProgress({ ...progress, lessons: [...progress.lessons, id] });
    },
    [progress, saveProgress]
  );

  const markChallengeDone = useCallback(
    (id) => {
      if (!progress.challenges.includes(id))
        saveProgress({
          ...progress,
          challenges: [...progress.challenges, id],
        });
    },
    [progress, saveProgress]
  );

  const markProjectDone = useCallback(
    (id) => {
      if (!progress.projects.includes(id))
        saveProgress({
          ...progress,
          projects: [...progress.projects, id],
        });
    },
    [progress, saveProgress]
  );

  const markInterviewDone = useCallback(
    (id) => {
      if (!progress.interview.includes(id))
        saveProgress({
          ...progress,
          interview: [...progress.interview, id],
        });
    },
    [progress, saveProgress]
  );

  const progressStats = useMemo(
    () => ({
      lessonsDone: progress.lessons.length,
      lessonsTotal: HTML_LESSONS.length,
      challengesDone: progress.challenges.length,
      challengesTotal: HTML_CHALLENGES.length,
      projectsDone: progress.projects.length,
      projectsTotal: HTML_PROJECTS.length,
      interviewDone: progress.interview.length,
      interviewTotal: HTML_INTERVIEW_TOPICS.length,
      total:
        progress.lessons.length +
        progress.challenges.length +
        progress.projects.length +
        progress.interview.length,
      totalAll:
        HTML_LESSONS.length +
        HTML_CHALLENGES.length +
        HTML_PROJECTS.length +
        HTML_INTERVIEW_TOPICS.length,
      pct: Math.round(
        ((progress.lessons.length +
          progress.challenges.length +
          progress.projects.length +
          progress.interview.length) /
          (HTML_LESSONS.length +
            HTML_CHALLENGES.length +
            HTML_PROJECTS.length +
            HTML_INTERVIEW_TOPICS.length)) *
          100
      ),
      lessons: progress.lessons,
      challenges: progress.challenges,
      projects: progress.projects,
      interview: progress.interview,
    }),
    [progress]
  );

  const currentLesson = useMemo(
    () => HTML_LESSONS.find((l) => l.id === activeLesson),
    [activeLesson]
  );
  const currentChallenge = useMemo(
    () => HTML_CHALLENGES.find((c) => c.id === activeChallenge),
    [activeChallenge]
  );
  const currentProject = useMemo(
    () => HTML_PROJECTS.find((p) => p.id === activeProject),
    [activeProject]
  );
  const currentInterview = useMemo(
    () => HTML_INTERVIEW_TOPICS.find((t) => t.id === activeInterview),
    [activeInterview]
  );

  const selectLesson = (id) => {
    const lesson = HTML_LESSONS.find((l) => l.id === id);
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
    const challenge = HTML_CHALLENGES.find((c) => c.id === id);
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
    const proj = HTML_PROJECTS.find((p) => p.id === id);
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
    const topic = HTML_INTERVIEW_TOPICS.find((t) => t.id === id);
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
    setCode(PLAYGROUND_CODE);
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

  useEffect(() => {
    if (view === "interview") return;
    const timer = setTimeout(() => {
      updatePreview();
    }, 400);
    return () => clearTimeout(timer);
  }, [code, view, updatePreview]);

  const defineThemes = useCallback((monaco) => {
    monaco.editor.defineTheme("jsl-dark", {
      base: "vs-dark",
      inherit: true,
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
      base: "vs",
      inherit: true,
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

  const handleSidebarDrag = useCallback(
    ({ clientX }) => {
      if (!bodyRef.current) return;
      setSidebarWidth(
        Math.max(
          180,
          Math.min(500, clientX - bodyRef.current.getBoundingClientRect().left)
        )
      );
    },
    []
  );

  const handleContentDrag = useCallback(
    ({ clientX }) => {
      if (!workspaceRef.current) return;
      const rect = workspaceRef.current.getBoundingClientRect();
      setContentRatio(
        Math.max(0.2, Math.min(0.8, (clientX - rect.left) / rect.width))
      );
    },
    []
  );

  const handlePreviewDrag = useCallback(
    ({ clientY }) => {
      if (!editorPanelRef.current) return;
      const rect = editorPanelRef.current.getBoundingClientRect();
      const maxH = rect.height * 0.7;
      setPreviewHeight(
        Math.max(120, Math.min(maxH, rect.bottom - clientY))
      );
    },
    []
  );

  // Run tests
  const runTests = useCallback(() => {
    const tests =
      view === "learn"
        ? currentLesson?.tests || []
        : view === "challenge"
          ? currentChallenge?.tests || []
          : view === "project"
            ? currentProject?.tests || []
            : [];

    const results = runHtmlTests(code, tests);
    setTestResults(results);

    handleTestResults(
      results,
      view,
      currentLesson,
      currentChallenge,
      currentProject,
      markLessonDone,
      markChallengeDone,
      markProjectDone
    );
  }, [
    code,
    view,
    currentLesson,
    currentChallenge,
    currentProject,
    markLessonDone,
    markChallengeDone,
    markProjectDone,
  ]);

  useKeyboardShortcut(updatePreview);

  const [paletteOpen, setPaletteOpen] = useCommandPalette();
  const [hideSidebar, setHideSidebar] = useState(false);
  useKeyboardShortcut(() => setHideSidebar((v) => !v), "b");

  const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");

  const goNextLesson = () => {
    const idx = HTML_LESSONS.findIndex((l) => l.id === activeLesson);
    if (idx < HTML_LESSONS.length - 1)
      selectLesson(HTML_LESSONS[idx + 1].id);
  };
  const goPrevLesson = () => {
    const idx = HTML_LESSONS.findIndex((l) => l.id === activeLesson);
    if (idx > 0) selectLesson(HTML_LESSONS[idx - 1].id);
  };

  const currentContent = useMemo(() => {
    if (view === "learn") return currentLesson;
    if (view === "challenge") return currentChallenge;
    if (view === "project") return currentProject;
    if (view === "interview") return currentInterview;
    if (view === "playground")
      return { id: "playground", title: "HTML Playground" };
    return null;
  }, [view, currentLesson, currentChallenge, currentProject, currentInterview]);

  const currentTests = useMemo(() => {
    if (view === "learn") return currentLesson?.tests || [];
    if (view === "challenge") return currentChallenge?.tests || [];
    if (view === "project") return currentProject?.tests || [];
    return [];
  }, [view, currentLesson, currentChallenge, currentProject]);

  const previewWidth =
    previewMode === "mobile"
      ? "375px"
      : previewMode === "tablet"
        ? "768px"
        : "100%";

  const handleReset = () => {
    let starter = "";
    if (view === "learn" && currentLesson)
      starter = currentLesson.starterCode;
    else if (view === "challenge" && currentChallenge)
      starter = currentChallenge.starterCode;
    else if (view === "project" && currentProject)
      starter = currentProject.starterCode;
    else if (view === "playground") starter = PLAYGROUND_CODE;
    if (editorRef.current) editorRef.current.setValue(starter);
    setCode(starter);
    setTestResults([]);
    codeVersionRef.current++;
  };

  const sidebarSections = useMemo(
    () => [
      {
        key: "learn",
        label: "LEARN HTML",
        color: "#fb923c",
        items: HTML_LESSONS,
        progressText: `${progressStats.lessonsDone}/${progressStats.lessonsTotal}`,
        isItemActive: (item) => view === "learn" && activeLesson === item.id,
        isItemDone: (item) => progress.lessons.includes(item.id),
        onSelectItem: (item) => selectLesson(item.id),
      },
      {
        key: "challenges",
        label: "CODE CHALLENGES",
        color: "#34d399",
        items: HTML_CHALLENGES,
        progressText: `${progressStats.challengesDone}/${progressStats.challengesTotal}`,
        isItemActive: (item) =>
          view === "challenge" && activeChallenge === item.id,
        isItemDone: (item) => progress.challenges.includes(item.id),
        onSelectItem: (item) => selectChallenge(item.id),
        renderItemTitle: (item) => item.title.replace(/^\d+\.\s*/, ""),
        renderItemBadge: (item) => (
          <span
            className={`jsl-si-level ${item.difficulty.toLowerCase()}`}
          >
            {item.difficulty[0]}
          </span>
        ),
      },
      {
        key: "projects",
        label: "PROJECTS LAB",
        color: "#a78bfa",
        items: HTML_PROJECTS,
        progressText: `${progressStats.projectsDone}/${progressStats.projectsTotal}`,
        isItemActive: (item) =>
          view === "project" && activeProject === item.id,
        isItemDone: (item) => progress.projects.includes(item.id),
        onSelectItem: (item) => selectProject(item.id),
      },
      {
        key: "interview",
        label: "INTERVIEW PREP",
        color: "#fcd34d",
        items: HTML_INTERVIEW_TOPICS,
        progressText: `${progressStats.interviewDone}/${progressStats.interviewTotal}`,
        isItemActive: (item) =>
          view === "interview" && activeInterview === item.id,
        isItemDone: (item) => progress.interview.includes(item.id),
        onSelectItem: (item) => selectInterview(item.id),
        renderItemNumber: () => null,
        renderItemBadge: (item) => (
          <span
            className="jsl-si-num"
            style={{ minWidth: "auto", marginLeft: "auto" }}
          >
            {item.questions.length}Q
          </span>
        ),
      },
    ],
    [
      view,
      activeLesson,
      activeChallenge,
      activeProject,
      activeInterview,
      progress,
      progressStats,
    ]
  );

  const sidebarPlayground = useMemo(
    () => ({
      label: "HTML PLAYGROUND",
      color: "#f472b6",
      isActive: view === "playground",
      onSelect: selectPlayground,
    }),
    [view]
  );

  const tourSteps = useMemo(
    () => [
      {
        title: "Welcome to HTML Labs! 🌐",
        content:
          "Let's take a quick tour of your HTML structure and coding environment.",
      },
      {
        target: ".jsl-sidebar",
        title: "Curriculum & Projects",
        content:
          "Browse core HTML structure tags, mini projects, code challenges, and interview prep topics here.",
      },
      {
        target: ".jsl-content-panel",
        title: "Goals & Instructions",
        content:
          "Read the concepts and instructions here. Run tests to verify your code.",
      },
      {
        target: ".jsl-editor-panel",
        title: "Live Preview & Editor",
        content:
          "Write HTML structure code in Monaco editor. The live preview updates automatically when you stop typing.",
      },
      {
        target: ".jsl-btn-command-palette",
        title: "Command Palette",
        content:
          "Use the Command Palette button or press Ctrl+K to jump to lessons or search tags instantly.",
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
        <div
          className="jsl-empty"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            color: "#64748b",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <h2 style={{ color: "#e2e8f0" }}>Welcome to HTML Labs</h2>
          <p>
            Select a lesson, challenge, project, or interview topic from the
            sidebar to get started.
          </p>
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
          style: {
            background: "rgba(251,146,60,0.08)",
            borderColor: "rgba(251,146,60,0.18)",
          },
        }}
        progressStats={progressStats}
        monacoTheme={monacoTheme}
        onToggleTheme={() =>
          setMonacoTheme((t) => (t === "jsl-dark" ? "jsl-light" : "jsl-dark"))
        }
        onOpenPalette={() => setPaletteOpen(true)}
      >
        {((view === "learn" && currentLesson) ||
          (view === "challenge" && currentChallenge) ||
          (view === "project" && currentProject)) && (
          <button
            className={`jsl-btn-mark jsl-btn-topbar done`}
            onClick={() => {
              if (view === "learn" && currentLesson)
                markLessonDone(currentLesson.id);
              else if (view === "challenge" && currentChallenge)
                markChallengeDone(currentChallenge.id);
              else if (view === "project" && currentProject)
                markProjectDone(currentProject.id);
            }}
          >
            <FiBook size={16} /> Mark Complete
          </button>
        )}
      </LabTopbar>

      <LabCommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        accent="#fb923c"
        commands={[
          {
            id: "preview",
            section: "Actions",
            label: "Refresh preview",
            hint: "Ctrl+Enter",
            action: updatePreview,
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
            label: "Reset editor starter code",
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
          ...HTML_LESSONS.map((l) => ({
            id: `l-${l.id}`,
            section: "Lessons",
            label: l.title,
            done: progress.lessons.includes(l.id),
            action: () => selectLesson(l.id),
          })),
          ...HTML_CHALLENGES.map((c) => ({
            id: `c-${c.id}`,
            section: "Challenges",
            label: c.title,
            done: progress.challenges.includes(c.id),
            action: () => selectChallenge(c.id),
          })),
          ...HTML_PROJECTS.map((p) => ({
            id: `p-${p.id}`,
            section: "Projects",
            label: p.title,
            done: progress.projects.includes(p.id),
            action: () => selectProject(p.id),
          })),
        ]}
      />

      {/* Main Layout */}
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
                  <HTMLLessonView
                    lesson={currentLesson}
                    showHint={showHint}
                    showSolution={showSolution}
                    onToggleHint={() => setShowHint((h) => !h)}
                    onToggleSolution={() => setShowSolution((s) => !s)}
                    onPrev={goPrevLesson}
                    onNext={goNextLesson}
                    hasPrev={
                      HTML_LESSONS.findIndex((l) => l.id === activeLesson) > 0
                    }
                    hasNext={
                      HTML_LESSONS.findIndex((l) => l.id === activeLesson) <
                      HTML_LESSONS.length - 1
                    }
                    onMarkDone={() => markLessonDone(currentLesson.id)}
                    isDone={progress.lessons.includes(currentLesson.id)}
                    testResults={testResults}
                    currentTests={currentTests}
                    onRunTests={runTests}
                  />
                )}
                {view === "challenge" && currentChallenge && (
                  <HTMLChallengeView
                    challenge={currentChallenge}
                    showHint={showHint}
                    showSolution={showSolution}
                    onToggleHint={() => setShowHint((h) => !h)}
                    onToggleSolution={() => setShowSolution((s) => !s)}
                    testResults={testResults}
                    currentTests={currentTests}
                    onRunTests={runTests}
                  />
                )}
                {view === "project" && currentProject && (
                  <HTMLProjectView
                    project={currentProject}
                    showSolution={showSolution}
                    onToggleSolution={() => setShowSolution((s) => !s)}
                    testResults={testResults}
                    currentTests={currentTests}
                    onRunTests={runTests}
                  />
                )}
                {view === "interview" && currentInterview && (
                  <HTMLInterviewView
                    topic={currentInterview}
                    onMarkDone={() => markInterviewDone(currentInterview.id)}
                    isDone={progress.interview.includes(currentInterview.id)}
                  />
                )}
                {view === "playground" && (
                  <div className="jsl-content-inner">
                    <h2 className="jsl-content-title">HTML Playground</h2>
                    <p className="jsl-text" style={{ marginTop: "1rem" }}>
                      This is a scratchpad where you can write HTML and see live
                      browser preview.
                    </p>
                    <p
                      className="jsl-text"
                      style={{ marginTop: "0.5rem", color: "#94a3b8" }}
                    >
                      Type HTML structure in the editor on the right, and check
                      results instantly.
                    </p>
                  </div>
                )}
              </div>

              {/* Tests Panel */}
              {(view === "learn" ||
                view === "challenge" ||
                view === "project") &&
                currentTests.length > 0 && (
                  <>
                    <LabResizableHandle
                      onDrag={handlePreviewDrag}
                      orientation="horizontal"
                    />
                    <div
                      className="jsl-tests-panel"
                      style={{
                        height: 120,
                        maxHeight: 120,
                        minHeight: 120,
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
                                testResults.filter((r) => r.passed).length ===
                                currentTests.length
                                  ? "all-pass"
                                  : ""
                              }`}
                            >
                              {testResults.filter((r) => r.passed).length}/
                              {currentTests.length} Passed
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
                        {currentTests.map((test, i) => {
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
                                {hasResult ? (passed ? "✓" : "✗") : "○"}
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
                        })}
                      </div>
                    </div>
                  </>
                )}
            </div>

            {/* Editor & Preview */}
            <LabResizableHandle onDrag={handleContentDrag} />
            <div
              className="jsl-editor-panel"
              ref={editorPanelRef}
              style={{ flex: `${1 - contentRatio} 1 0` }}
            >
              <LabEditorToolbar
                isRunning={false}
                onRun={updatePreview}
                onReset={handleReset}
                runLabel="Preview"
                lang="HTML"
                runButtonStyle={{
                  background: "rgba(251,146,60,0.14)",
                  color: "#fb923c",
                }}
                extraActions={
                  <div
                    style={{
                      display: "flex",
                      gap: "0.2rem",
                      background: "rgba(255,255,255,0.03)",
                      padding: "2px",
                      borderRadius: "4px",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    {["html", "htmlcss", "htmlcssjs"].map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setEditorMode(mode)}
                        style={{
                          background:
                            editorMode === mode
                              ? "rgba(251,146,60,0.12)"
                              : "transparent",
                          border: "none",
                          borderRadius: "3px",
                          padding: "2px 6px",
                          fontSize: "0.62rem",
                          fontWeight: 700,
                          cursor: "pointer",
                          color:
                            editorMode === mode ? "#fb923c" : "#64748b",
                        }}
                      >
                        {mode === "html"
                          ? "HTML"
                          : mode === "htmlcss"
                            ? "HTML+CSS"
                            : "HTML+CSS+JS"}
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
                    fontFamily: "var(--font-mono)",
                    minimap: { enabled: false },
                    roundedSelection: true,
                    scrollBeyondLastLine: false,
                    lineNumbers: "on",
                    tabSize: 2,
                    automaticLayout: true,
                    padding: { top: 12, bottom: 12 },
                  }}
                />
              </div>

              {/* Preview Panel */}
              <LabResizableHandle
                onDrag={handlePreviewDrag}
                orientation="horizontal"
              />
              <div
                className="jsl-preview-panel"
                style={{
                  height: previewHeight,
                  maxHeight: previewHeight,
                  minHeight: previewHeight,
                }}
              >
                <div className="jsl-preview-header">
                  <div className="jsl-preview-header-left">
                    <span className="jsl-browser-dots">
                      <span className="jsl-browser-dot red" />
                      <span className="jsl-browser-dot yellow" />
                      <span className="jsl-browser-dot green" />
                    </span>
                    <span className="jsl-preview-url">
                      localhost:3000/
                    </span>
                  </div>
                  <div className="jsl-preview-info">
                    <button
                      className={`jsl-mode-tab ${
                        previewMode === "mobile" ? "active" : ""
                      }`}
                      onClick={() => setPreviewMode("mobile")}
                      style={{
                        padding: "0.15rem 0.4rem",
                        borderRadius: "3px",
                        fontSize: "0.65rem",
                        background:
                          previewMode === "mobile"
                            ? "rgba(251,146,60,0.12)"
                            : "transparent",
                        color:
                          previewMode === "mobile" ? "#fb923c" : "#64748b",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.2rem",
                      }}
                      title="Mobile preview"
                    >
                      Mobile
                    </button>
                    <button
                      className={`jsl-mode-tab ${
                        previewMode === "tablet" ? "active" : ""
                      }`}
                      onClick={() => setPreviewMode("tablet")}
                      style={{
                        padding: "0.15rem 0.4rem",
                        borderRadius: "3px",
                        fontSize: "0.65rem",
                        background:
                          previewMode === "tablet"
                            ? "rgba(251,146,60,0.12)"
                            : "transparent",
                        color:
                          previewMode === "tablet" ? "#fb923c" : "#64748b",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.2rem",
                      }}
                      title="Tablet preview"
                    >
                      Tablet
                    </button>
                    <button
                      className={`jsl-mode-tab ${
                        previewMode === "desktop" ? "active" : ""
                      }`}
                      onClick={() => setPreviewMode("desktop")}
                      style={{
                        padding: "0.15rem 0.4rem",
                        borderRadius: "3px",
                        fontSize: "0.65rem",
                        background:
                          previewMode === "desktop"
                            ? "rgba(251,146,60,0.12)"
                            : "transparent",
                        color:
                          previewMode === "desktop" ? "#fb923c" : "#64748b",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.2rem",
                      }}
                      title="Desktop preview"
                    >
                      Desktop
                    </button>
                  </div>
                </div>
                <div
                  className="jsl-preview-body"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <div
                    style={{
                      width: previewWidth,
                      maxWidth: "100%",
                      transition: "width 0.3s ease",
                    }}
                  >
                    <iframe
                      ref={iframeRef}
                      title="HTML Preview"
                      style={{
                        width: "100%",
                        height: "100%",
                        border: "none",
                        background: "#ffffff",
                        borderRadius: "0 0 8px 8px",
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
      <LabTour
        steps={tourSteps}
        tourKey="html-labs-onboarding-tour-completed"
      />
    </div>
  );
}
