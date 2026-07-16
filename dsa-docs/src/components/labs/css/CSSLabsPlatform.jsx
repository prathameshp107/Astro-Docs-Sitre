// ─── CSS Labs Platform — Refactored ───

import { FiBook, FiCheckSquare, FiRefreshCw } from "react-icons/fi";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Editor from "@monaco-editor/react";
import { SkeletonLabPlatform } from "../../Skeleton.jsx";
import { DiCss3 } from "react-icons/di";

import {
  CSS_LESSONS,
  CSS_CHALLENGES,
  CSS_COMPONENTS,
  CSS_ANIMATIONS,
  CSS_INTERVIEW_TOPICS,
} from "../../../data/labs/css/index.js";

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

import CSSLessonView from "./components/CSSLessonView.jsx";
import CSSChallengeView from "./components/CSSChallengeView.jsx";
import CSSComponentView from "./components/CSSComponentView.jsx";
import CSSAnimationView from "./components/CSSAnimationView.jsx";
import CSSInterviewView from "./components/CSSInterviewView.jsx";
import { runCssTests, handleTestResults } from "./runner/cssValidator.js";
import { STORAGE_KEY, PLAYGROUND_CODE } from "./config.js";

// ─── MAIN PLATFORM ───

export default function CSSLabsPlatform() {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("learn");
  const [activeLesson, setActiveLesson] = useState(
    CSS_LESSONS[0]?.id || null
  );
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [activeComponent, setActiveComponent] = useState(null);
  const [activeAnimation, setActiveAnimation] = useState(null);
  const [activeInterview, setActiveInterview] = useState(null);
  const [code, setCode] = useState(CSS_LESSONS[0]?.starterCode || "");
  const [testResults, setTestResults] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [monacoTheme, setMonacoTheme] = useState("jsl-dark");
  const [progress, setProgress] = useState({
    lessons: [],
    challenges: [],
    components: [],
    animations: [],
    interview: [],
  });
  const [previewMode, setPreviewMode] = useState("desktop");
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
          '{"lessons":[],"challenges":[],"components":[],"animations":[],"interview":[]}'
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

  const markComponentDone = useCallback(
    (id) => {
      if (!progress.components.includes(id))
        saveProgress({
          ...progress,
          components: [...progress.components, id],
        });
    },
    [progress, saveProgress]
  );

  const markAnimationDone = useCallback(
    (id) => {
      if (!progress.animations.includes(id))
        saveProgress({
          ...progress,
          animations: [...progress.animations, id],
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
      lessonsTotal: CSS_LESSONS.length,
      challengesDone: progress.challenges.length,
      challengesTotal: CSS_CHALLENGES.length,
      componentsDone: progress.components.length,
      componentsTotal: CSS_COMPONENTS.length,
      animationsDone: progress.animations.length,
      animationsTotal: CSS_ANIMATIONS.length,
      interviewDone: progress.interview.length,
      interviewTotal: CSS_INTERVIEW_TOPICS.length,
      total:
        progress.lessons.length +
        progress.challenges.length +
        progress.components.length +
        progress.animations.length +
        progress.interview.length,
      totalAll:
        CSS_LESSONS.length +
        CSS_CHALLENGES.length +
        CSS_COMPONENTS.length +
        CSS_ANIMATIONS.length +
        CSS_INTERVIEW_TOPICS.length,
      pct: Math.round(
        ((progress.lessons.length +
          progress.challenges.length +
          progress.components.length +
          progress.animations.length +
          progress.interview.length) /
          (CSS_LESSONS.length +
            CSS_CHALLENGES.length +
            CSS_COMPONENTS.length +
            CSS_ANIMATIONS.length +
            CSS_INTERVIEW_TOPICS.length)) *
          100
      ),
      lessons: progress.lessons,
      challenges: progress.challenges,
      components: progress.components,
      animations: progress.animations,
      interview: progress.interview,
    }),
    [progress]
  );

  const currentLesson = useMemo(
    () => CSS_LESSONS.find((l) => l.id === activeLesson),
    [activeLesson]
  );
  const currentChallenge = useMemo(
    () => CSS_CHALLENGES.find((c) => c.id === activeChallenge),
    [activeChallenge]
  );
  const currentComponent = useMemo(
    () => CSS_COMPONENTS.find((c) => c.id === activeComponent),
    [activeComponent]
  );
  const currentAnimation = useMemo(
    () => CSS_ANIMATIONS.find((a) => a.id === activeAnimation),
    [activeAnimation]
  );
  const currentInterview = useMemo(
    () => CSS_INTERVIEW_TOPICS.find((t) => t.id === activeInterview),
    [activeInterview]
  );

  const selectLesson = (id) => {
    const lesson = CSS_LESSONS.find((l) => l.id === id);
    if (!lesson) return;
    setView("learn");
    setActiveLesson(id);
    setActiveChallenge(null);
    setActiveComponent(null);
    setActiveAnimation(null);
    setActiveInterview(null);
    setCode(lesson.starterCode);
    setShowHint(false);
    setShowSolution(false);
    setTestResults([]);
    codeVersionRef.current++;
  };

  const selectChallenge = (id) => {
    const challenge = CSS_CHALLENGES.find((c) => c.id === id);
    if (!challenge) return;
    setView("challenge");
    setActiveLesson(null);
    setActiveChallenge(id);
    setActiveComponent(null);
    setActiveAnimation(null);
    setActiveInterview(null);
    setCode(challenge.starterCode);
    setShowHint(false);
    setShowSolution(false);
    setTestResults([]);
    codeVersionRef.current++;
  };

  const selectComponent = (id) => {
    const comp = CSS_COMPONENTS.find((c) => c.id === id);
    if (!comp) return;
    setView("component");
    setActiveLesson(null);
    setActiveChallenge(null);
    setActiveComponent(id);
    setActiveAnimation(null);
    setActiveInterview(null);
    setCode(comp.starterCode);
    setShowHint(false);
    setShowSolution(false);
    setTestResults([]);
    codeVersionRef.current++;
  };

  const selectAnimation = (id) => {
    const anim = CSS_ANIMATIONS.find((a) => a.id === id);
    if (!anim) return;
    setView("animation");
    setActiveLesson(null);
    setActiveChallenge(null);
    setActiveComponent(null);
    setActiveAnimation(id);
    setActiveInterview(null);
    setCode(anim.starterCode);
    setShowHint(false);
    setShowSolution(false);
    setTestResults([]);
    codeVersionRef.current++;
  };

  const selectInterview = (id) => {
    const topic = CSS_INTERVIEW_TOPICS.find((t) => t.id === id);
    if (!topic) return;
    setView("interview");
    setActiveLesson(null);
    setActiveChallenge(null);
    setActiveComponent(null);
    setActiveAnimation(null);
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
    setActiveComponent(null);
    setActiveAnimation(null);
    setActiveInterview(null);
    setCode(PLAYGROUND_CODE);
    setShowHint(false);
    setShowSolution(false);
    setTestResults([]);
    codeVersionRef.current++;
  };

  // Live preview update
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
        { token: "tag", foreground: "60a5fa" },
        { token: "attribute.name", foreground: "a78bfa" },
        { token: "attribute.value", foreground: "34d399" },
        { token: "keyword", foreground: "f59e0b" },
        { token: "string", foreground: "34d399" },
        { token: "number", foreground: "f59e0b" },
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
        { token: "tag", foreground: "2563eb" },
        { token: "attribute.name", foreground: "7c3aed" },
        { token: "attribute.value", foreground: "059669" },
        { token: "keyword", foreground: "d97706" },
        { token: "string", foreground: "059669" },
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
      setTimeout(() => {
        try {
          editor.remeasureFonts();
        } catch {}
      }, 50);
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
          : view === "component"
            ? currentComponent?.tests || []
            : view === "animation"
              ? currentAnimation?.tests || []
              : [];

    const results = runCssTests(code, tests);
    setTestResults(results);

    handleTestResults(
      results,
      view,
      currentLesson,
      currentChallenge,
      currentComponent,
      currentAnimation,
      markLessonDone,
      markChallengeDone,
      markComponentDone,
      markAnimationDone
    );
  }, [
    code,
    view,
    currentLesson,
    currentChallenge,
    currentComponent,
    currentAnimation,
    markLessonDone,
    markChallengeDone,
    markComponentDone,
    markAnimationDone,
  ]);

  useKeyboardShortcut(updatePreview);

  const [paletteOpen, setPaletteOpen] = useCommandPalette();
  const [hideSidebar, setHideSidebar] = useState(false);
  useKeyboardShortcut(() => setHideSidebar((v) => !v), "b");

  const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");

  const goNextLesson = () => {
    const idx = CSS_LESSONS.findIndex((l) => l.id === activeLesson);
    if (idx < CSS_LESSONS.length - 1)
      selectLesson(CSS_LESSONS[idx + 1].id);
  };

  const goPrevLesson = () => {
    const idx = CSS_LESSONS.findIndex((l) => l.id === activeLesson);
    if (idx > 0) selectLesson(CSS_LESSONS[idx - 1].id);
  };

  const currentContent = useMemo(() => {
    if (view === "learn") return currentLesson;
    if (view === "challenge") return currentChallenge;
    if (view === "component") return currentComponent;
    if (view === "animation") return currentAnimation;
    if (view === "interview") return currentInterview;
    if (view === "playground")
      return { id: "playground", title: "CSS Playground" };
    return null;
  }, [
    view,
    currentLesson,
    currentChallenge,
    currentComponent,
    currentAnimation,
    currentInterview,
  ]);

  const currentTests = useMemo(() => {
    if (view === "learn") return currentLesson?.tests || [];
    if (view === "challenge") return currentChallenge?.tests || [];
    if (view === "component") return currentComponent?.tests || [];
    if (view === "animation") return currentAnimation?.tests || [];
    return [];
  }, [view, currentLesson, currentChallenge, currentComponent, currentAnimation]);

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
    else if (view === "component" && currentComponent)
      starter = currentComponent.starterCode;
    else if (view === "animation" && currentAnimation)
      starter = currentAnimation.starterCode;
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
        label: "LEARN CSS",
        color: "#60a5fa",
        items: CSS_LESSONS,
        progressText: `${progressStats.lessonsDone}/${progressStats.lessonsTotal}`,
        isItemActive: (item) => view === "learn" && activeLesson === item.id,
        isItemDone: (item) => progress.lessons.includes(item.id),
        onSelectItem: (item) => selectLesson(item.id),
      },
      {
        key: "challenges",
        label: "CSS CHALLENGES",
        color: "#34d399",
        items: CSS_CHALLENGES,
        progressText: `${progressStats.challengesDone}/${progressStats.challengesTotal}`,
        isItemActive: (item) =>
          view === "challenge" && activeChallenge === item.id,
        isItemDone: (item) => progress.challenges.includes(item.id),
        onSelectItem: (item) => selectChallenge(item.id),
        renderItemBadge: (item) => (
          <span
            className={`jsl-si-level ${item.difficulty.toLowerCase()}`}
          >
            {item.difficulty[0]}
          </span>
        ),
      },
      {
        key: "components",
        label: "COMPONENT LAB",
        color: "#f59e0b",
        items: CSS_COMPONENTS,
        progressText: `${progressStats.componentsDone}/${progressStats.componentsTotal}`,
        isItemActive: (item) =>
          view === "component" && activeComponent === item.id,
        isItemDone: (item) => progress.components.includes(item.id),
        onSelectItem: (item) => selectComponent(item.id),
      },
      {
        key: "animations",
        label: "ANIMATION LAB",
        color: "#ec4899",
        items: CSS_ANIMATIONS,
        progressText: `${progressStats.animationsDone}/${progressStats.animationsTotal}`,
        isItemActive: (item) =>
          view === "animation" && activeAnimation === item.id,
        isItemDone: (item) => progress.animations.includes(item.id),
        onSelectItem: (item) => selectAnimation(item.id),
      },
      {
        key: "interview",
        label: "INTERVIEW PREP",
        color: "#fcd34d",
        items: CSS_INTERVIEW_TOPICS,
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
      activeComponent,
      activeAnimation,
      activeInterview,
      progress,
      progressStats,
    ]
  );

  const sidebarPlayground = useMemo(
    () => ({
      label: "CSS PLAYGROUND",
      color: "#60a5fa",
      isActive: view === "playground",
      onSelect: selectPlayground,
    }),
    [view]
  );

  const tourSteps = useMemo(
    () => [
      {
        title: "Welcome to CSS Labs! 🎨",
        content:
          "Let's take a quick tour of your CSS layout and coding environment.",
      },
      {
        target: ".jsl-sidebar",
        title: "Curriculum & Labs",
        content:
          "Browse core CSS concepts, layout challenges, component labs, and animations here.",
      },
      {
        target: ".jsl-content-panel",
        title: "Instructions & Tasks",
        content:
          "Read the goals and tasks for the active lesson here. Run tests to verify your solution.",
      },
      {
        target: ".jsl-editor-panel",
        title: "Live Preview & Editor",
        content:
          "Type your HTML/CSS code in the editor. The preview panel below updates automatically when you stop typing.",
      },
      {
        target: ".jsl-btn-command-palette",
        title: "Search Commands",
        content:
          "Use the Command Palette button or press Ctrl+K to jump anywhere instantly.",
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

  if (!currentContent && view !== "playground") {
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
          <h2 style={{ color: "#e2e8f0" }}>Welcome to CSS Labs</h2>
          <p>
            Select a lesson, challenge, component, animation, or interview topic
            from the sidebar to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="jsl-platform">
      <LabTopbar
        base={base}
        title="CSS Labs"
        icon={{
          component: <DiCss3 size={18} />,
          style: {
            background: "rgba(96,165,250,0.08)",
            borderColor: "rgba(96,165,250,0.18)",
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
          (view === "component" && currentComponent) ||
          (view === "animation" && currentAnimation)) && (
          <button
            className={`jsl-btn-mark jsl-btn-topbar done`}
            onClick={() => {
              if (view === "learn" && currentLesson)
                markLessonDone(currentLesson.id);
              else if (view === "challenge" && currentChallenge)
                markChallengeDone(currentChallenge.id);
              else if (view === "component" && currentComponent)
                markComponentDone(currentComponent.id);
              else if (view === "animation" && currentAnimation)
                markAnimationDone(currentAnimation.id);
            }}
          >
            <FiBook size={16} /> Mark Complete
          </button>
        )}
      </LabTopbar>

      <LabCommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        accent="#60a5fa"
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
          ...CSS_LESSONS.map((l) => ({
            id: `l-${l.id}`,
            section: "Lessons",
            label: l.title,
            done: progress.lessons.includes(l.id),
            action: () => selectLesson(l.id),
          })),
          ...CSS_CHALLENGES.map((c) => ({
            id: `c-${c.id}`,
            section: "Challenges",
            label: c.title,
            done: progress.challenges.includes(c.id),
            action: () => selectChallenge(c.id),
          })),
          ...CSS_COMPONENTS.map((co) => ({
            id: `co-${co.id}`,
            section: "Components",
            label: co.title,
            done: progress.components.includes(co.id),
            action: () => selectComponent(co.id),
          })),
          ...CSS_ANIMATIONS.map((a) => ({
            id: `a-${a.id}`,
            section: "Animations",
            label: a.title,
            done: progress.animations.includes(a.id),
            action: () => selectAnimation(a.id),
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
                  <CSSLessonView
                    lesson={currentLesson}
                    showHint={showHint}
                    showSolution={showSolution}
                    onToggleHint={() => setShowHint((h) => !h)}
                    onToggleSolution={() => setShowSolution((s) => !s)}
                    onPrev={goPrevLesson}
                    onNext={goNextLesson}
                    hasPrev={
                      CSS_LESSONS.findIndex((l) => l.id === activeLesson) > 0
                    }
                    hasNext={
                      CSS_LESSONS.findIndex((l) => l.id === activeLesson) <
                      CSS_LESSONS.length - 1
                    }
                    onMarkDone={() => markLessonDone(currentLesson.id)}
                    isDone={progress.lessons.includes(currentLesson.id)}
                    testResults={testResults}
                    currentTests={currentTests}
                    onRunTests={runTests}
                  />
                )}
                {view === "challenge" && currentChallenge && (
                  <CSSChallengeView
                    challenge={currentChallenge}
                    showHint={showHint}
                    showSolution={showSolution}
                    onToggleHint={() => setShowHint((h) => !h)}
                    onToggleSolution={() => setShowSolution((s) => !s)}
                  />
                )}
                {view === "component" && currentComponent && (
                  <CSSComponentView
                    component={currentComponent}
                    showSolution={showSolution}
                    onToggleSolution={() => setShowSolution((s) => !s)}
                  />
                )}
                {view === "animation" && currentAnimation && (
                  <CSSAnimationView
                    animation={currentAnimation}
                    showSolution={showSolution}
                    onToggleSolution={() => setShowSolution((s) => !s)}
                  />
                )}
                {view === "interview" && currentInterview && (
                  <CSSInterviewView
                    topic={currentInterview}
                    onMarkDone={() => markInterviewDone(currentInterview.id)}
                    isDone={progress.interview.includes(currentInterview.id)}
                  />
                )}
                {view === "playground" && (
                  <div className="jsl-content-inner">
                    <h2 className="jsl-content-title">CSS Playground</h2>
                    <p className="jsl-text" style={{ marginTop: "1rem" }}>
                      Write HTML and CSS in the editor and see the live preview
                      update in real time!
                    </p>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                        gap: "0.75rem",
                        marginTop: "1rem",
                      }}
                    >
                      {[
                        { icon: "⚡", title: "Live Preview", desc: "Changes update instantly" },
                        { icon: "📱", title: "Responsive", desc: "Test mobile, tablet, desktop" },
                        { icon: "💾", title: "Auto-Save", desc: "Your code is saved locally" },
                        { icon: "🎨", title: "Full CSS Support", desc: "All modern CSS features" },
                      ].map((item) => (
                        <div
                          key={item.title}
                          className="jsl-section"
                          style={{
                            padding: "1rem",
                            margin: 0,
                            border: "1px solid var(--jsl-border2)",
                            borderRadius: "0.5rem",
                            background: "rgba(255,255,255,0.02)",
                          }}
                        >
                          <div
                            style={{ fontSize: "1.5rem", marginBottom: "0.3rem" }}
                          >
                            {item.icon}
                          </div>
                          <h4
                            style={{
                              margin: "0 0 0.2rem",
                              color: "#f8fafc",
                              fontSize: "0.9rem",
                            }}
                          >
                            {item.title}
                          </h4>
                          <p
                            style={{
                              margin: 0,
                              color: "#94a3b8",
                              fontSize: "0.78rem",
                            }}
                          >
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Tests Panel */}
              {(view === "learn" ||
                view === "challenge" ||
                view === "component" ||
                view === "animation") &&
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
                lang="HTML+CSS"
                runButtonStyle={{
                  background: "rgba(96,165,250,0.14)",
                  color: "#60a5fa",
                }}
              />

              <div className="jsl-editor-wrapper">
                <Editor
                  key={`css-${codeVersionRef.current}`}
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
                    <span className="jsl-preview-url">CSS Preview</span>
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
                            ? "rgba(96,165,250,0.12)"
                            : "transparent",
                        color:
                          previewMode === "mobile" ? "#60a5fa" : "#64748b",
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
                            ? "rgba(96,165,250,0.12)"
                            : "transparent",
                        color:
                          previewMode === "tablet" ? "#60a5fa" : "#64748b",
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
                            ? "rgba(96,165,250,0.12)"
                            : "transparent",
                        color:
                          previewMode === "desktop" ? "#60a5fa" : "#64748b",
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
                      title="CSS Preview"
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
        tourKey="css-labs-onboarding-tour-completed"
      />
    </div>
  );
}
