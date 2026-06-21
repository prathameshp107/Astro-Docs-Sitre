import { FiArrowLeft, FiAward, FiBook, FiBox, FiCheck, FiCheckSquare, FiChevronDown, FiChevronLeft, FiChevronRight, FiCode, FiEye, FiMonitor, FiMoon, FiPlayCircle, FiRefreshCw, FiSmartphone, FiSun, FiUsers } from "react-icons/fi";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Editor from "@monaco-editor/react";
import { SkeletonLabPlatform } from "../Skeleton.jsx";
import { DiCss3 } from "react-icons/di";


import {
  CSS_LESSONS,
  CSS_CHALLENGES,
  CSS_COMPONENTS,
  CSS_ANIMATIONS,
  CSS_INTERVIEW_TOPICS,
} from "../../data/css-labs-curriculum.js";

// ─── ICONS ───

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

function CSSSidebar({ activeSection, activeLesson, activeChallenge, activeComponent, activeAnimation, activeInterview, onSelectLesson, onSelectChallenge, onSelectComponent, onSelectAnimation, onSelectInterview, onSelectPlayground, progress, ...rest }) {
  const [expandedSections, setExpandedSections] = useState({
    learn: true, challenges: false, components: false, animations: false, interview: false
  });
  const toggleSection = (key) => setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));

  const isLessonActive = (id) => activeSection === "learn" && activeLesson === id;
  const isChallengeActive = (id) => activeSection === "challenge" && activeChallenge === id;
  const isComponentActive = (id) => activeSection === "component" && activeComponent === id;
  const isAnimationActive = (id) => activeSection === "animation" && activeAnimation === id;
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
          style={{ color: activeSection === "playground" ? "#60a5fa" : undefined }}
        >
          <div className="jsl-sg-title" style={{ color: "#60a5fa" }}>
            <FiBook size={16} /> <span>CSS PLAYGROUND</span>
          </div>
        </button>
      </div>

      {/* LEARN CSS */}
      <div className="jsl-sidebar-group">
        <button className={`jsl-sg-header learn ${expandedSections.learn ? "expanded" : ""}`} onClick={() => toggleSection("learn")}>
          <div className="jsl-sg-title" style={{ color: "#60a5fa" }}><FiBook size={16} /><span>LEARN CSS</span></div>
          <span className="jsl-sg-count">{progress.lessonsDone}/{progress.lessonsTotal}</span>
          <FiChevronDown size={14} />
        </button>
        {expandedSections.learn && (
          <div className="jsl-sg-items">
            {CSS_LESSONS.map((lesson) => (
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

      {/* CSS CHALLENGES */}
      <div className="jsl-sidebar-group">
        <button className={`jsl-sg-header ${expandedSections.challenges ? "expanded" : ""}`} onClick={() => toggleSection("challenges")}>
          <div className="jsl-sg-title" style={{ color: "#34d399" }}><FiBook size={16} /><span>CSS CHALLENGES</span></div>
          <span className="jsl-sg-count">{progress.challengesDone}/{progress.challengesTotal}</span>
          <FiChevronDown size={14} />
        </button>
        {expandedSections.challenges && (
          <div className="jsl-sg-items">
            {CSS_CHALLENGES.map((c, i) => (
              <button
                key={c.id}
                className={`jsl-si ${isChallengeActive(c.id) ? "active" : ""} ${progress.challenges.includes(c.id) ? "done" : ""}`}
                onClick={() => onSelectChallenge(c.id)}
              >
                <span className="jsl-si-num">{i + 1}.</span>
                <span className="jsl-si-title">{c.title}</span>
                <span className={`jsl-si-level ${c.difficulty.toLowerCase()}`}>{c.difficulty[0]}</span>
                {progress.challenges.includes(c.id) && <span className="jsl-si-check"><FiCheck size={16} /></span>}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* COMPONENT LAB */}
      <div className="jsl-sidebar-group">
        <button className={`jsl-sg-header ${expandedSections.components ? "expanded" : ""}`} onClick={() => toggleSection("components")}>
          <div className="jsl-sg-title" style={{ color: "#f59e0b" }}><FiBook size={16} /><span>COMPONENT LAB</span></div>
          <span className="jsl-sg-count">{progress.componentsDone}/{progress.componentsTotal}</span>
          <FiChevronDown size={14} />
        </button>
        {expandedSections.components && (
          <div className="jsl-sg-items">
            {CSS_COMPONENTS.map((comp, i) => (
              <button
                key={comp.id}
                className={`jsl-si ${isComponentActive(comp.id) ? "active" : ""} ${progress.components.includes(comp.id) ? "done" : ""}`}
                onClick={() => onSelectComponent(comp.id)}
              >
                <span className="jsl-si-num">{i + 1}.</span>
                <span className="jsl-si-title">{comp.title}</span>
                {progress.components.includes(comp.id) && <span className="jsl-si-check"><FiCheck size={16} /></span>}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ANIMATION LAB */}
      <div className="jsl-sidebar-group">
        <button className={`jsl-sg-header ${expandedSections.animations ? "expanded" : ""}`} onClick={() => toggleSection("animations")}>
          <div className="jsl-sg-title" style={{ color: "#ec4899" }}><FiBook size={16} /><span>ANIMATION LAB</span></div>
          <span className="jsl-sg-count">{progress.animationsDone}/{progress.animationsTotal}</span>
          <FiChevronDown size={14} />
        </button>
        {expandedSections.animations && (
          <div className="jsl-sg-items">
            {CSS_ANIMATIONS.map((anim, i) => (
              <button
                key={anim.id}
                className={`jsl-si ${isAnimationActive(anim.id) ? "active" : ""} ${progress.animations.includes(anim.id) ? "done" : ""}`}
                onClick={() => onSelectAnimation(anim.id)}
              >
                <span className="jsl-si-num">{i + 1}.</span>
                <span className="jsl-si-title">{anim.title}</span>
                {progress.animations.includes(anim.id) && <span className="jsl-si-check"><FiCheck size={16} /></span>}
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
            {CSS_INTERVIEW_TOPICS.map((topic) => (
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

export default function CSSLabsPlatform() {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("learn");
  const [activeLesson, setActiveLesson] = useState(CSS_LESSONS[0]?.id || null);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [activeComponent, setActiveComponent] = useState(null);
  const [activeAnimation, setActiveAnimation] = useState(null);
  const [activeInterview, setActiveInterview] = useState(null);
  const [code, setCode] = useState(CSS_LESSONS[0]?.starterCode || "");
  const [testResults, setTestResults] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [monacoTheme, setMonacoTheme] = useState("jsl-dark");
  const [progress, setProgress] = useState({ lessons: [], challenges: [], components: [], animations: [], interview: [] });
  const [previewMode, setPreviewMode] = useState("desktop");
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
      const stored = JSON.parse(sessionStorage.getItem("css-progress") || '{"lessons":[],"challenges":[],"components":[],"animations":[],"interview":[]}');
      setProgress(stored);
    } catch {}
    return () => clearTimeout(timer);
  }, []);

  const saveProgress = useCallback((newProgress) => {
    setProgress(newProgress);
    try { sessionStorage.setItem("css-progress", JSON.stringify(newProgress)); } catch {}
  }, []);

  const markLessonDone = useCallback((id) => {
    if (!progress.lessons.includes(id)) saveProgress({ ...progress, lessons: [...progress.lessons, id] });
  }, [progress, saveProgress]);

  const markChallengeDone = useCallback((id) => {
    if (!progress.challenges.includes(id)) saveProgress({ ...progress, challenges: [...progress.challenges, id] });
  }, [progress, saveProgress]);

  const markComponentDone = useCallback((id) => {
    if (!progress.components.includes(id)) saveProgress({ ...progress, components: [...progress.components, id] });
  }, [progress, saveProgress]);

  const markAnimationDone = useCallback((id) => {
    if (!progress.animations.includes(id)) saveProgress({ ...progress, animations: [...progress.animations, id] });
  }, [progress, saveProgress]);

  const markInterviewDone = useCallback((id) => {
    if (!progress.interview.includes(id)) saveProgress({ ...progress, interview: [...progress.interview, id] });
  }, [progress, saveProgress]);

  const progressStats = useMemo(() => ({
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
    total: progress.lessons.length + progress.challenges.length + progress.components.length + progress.animations.length + progress.interview.length,
    totalAll: CSS_LESSONS.length + CSS_CHALLENGES.length + CSS_COMPONENTS.length + CSS_ANIMATIONS.length + CSS_INTERVIEW_TOPICS.length,
    pct: Math.round(((progress.lessons.length + progress.challenges.length + progress.components.length + progress.animations.length + progress.interview.length) / (CSS_LESSONS.length + CSS_CHALLENGES.length + CSS_COMPONENTS.length + CSS_ANIMATIONS.length + CSS_INTERVIEW_TOPICS.length)) * 100),
    lessons: progress.lessons,
    challenges: progress.challenges,
    components: progress.components,
    animations: progress.animations,
    interview: progress.interview,
  }), [progress]);

  const currentLesson = useMemo(() => CSS_LESSONS.find(l => l.id === activeLesson), [activeLesson]);
  const currentChallenge = useMemo(() => CSS_CHALLENGES.find(c => c.id === activeChallenge), [activeChallenge]);
  const currentComponent = useMemo(() => CSS_COMPONENTS.find(c => c.id === activeComponent), [activeComponent]);
  const currentAnimation = useMemo(() => CSS_ANIMATIONS.find(a => a.id === activeAnimation), [activeAnimation]);
  const currentInterview = useMemo(() => CSS_INTERVIEW_TOPICS.find(t => t.id === activeInterview), [activeInterview]);

  const selectLesson = (id) => {
    const lesson = CSS_LESSONS.find(l => l.id === id);
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
    const challenge = CSS_CHALLENGES.find(c => c.id === id);
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
    const comp = CSS_COMPONENTS.find(c => c.id === id);
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
    const anim = CSS_ANIMATIONS.find(a => a.id === id);
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
    const topic = CSS_INTERVIEW_TOPICS.find(t => t.id === id);
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
    setCode(`<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8" />\n  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n  <title>CSS Playground</title>\n  <style>\n    body {\n      font-family: system-ui, sans-serif;\n      padding: 2rem;\n      line-height: 1.6;\n      color: #1e293b;\n    }\n\n    h1 {\n      color: #60a5fa;\n    }\n\n    .card {\n      padding: 1.5rem;\n      background: #f1f5f9;\n      border-radius: 12px;\n      border: 1px solid #e2e8f0;\n    }\n  </style>\n</head>\n<body>\n  <h1>CSS Playground</h1>\n  <div class="card">\n    <p>Edit the CSS in the editor to see live preview updates!</p>\n  </div>\n</body>\n</html>`);
    setShowHint(false);
    setShowSolution(false);
    setTestResults([]);
    codeVersionRef.current++;
  };

  // Live preview
  const codeRef = useRef(code);
  codeRef.current = code;

  const updatePreview = useCallback(() => {
    if (!iframeRef.current) return;
    const iframe = iframeRef.current;
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    const currentCode = codeRef.current;
    if (!currentCode || view === "interview") return;
    doc.open();
    doc.write(currentCode);
    doc.close();
  }, [view]);

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
      base: "vs", inherit: true,
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

  const handleEditorMount = useCallback((editor, monaco) => {
    editorRef.current = editor;
    defineThemes(monaco);
    monaco.editor.setTheme(monacoTheme);
    setTimeout(() => { try { editor.remeasureFonts(); } catch {} }, 50);
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
      : view === "component" ? currentComponent?.tests || []
      : view === "animation" ? currentAnimation?.tests || []
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
      else if (view === "component" && currentComponent) markComponentDone(currentComponent.id);
      else if (view === "animation" && currentAnimation) markAnimationDone(currentAnimation.id);
    }
  }, [code, view, currentLesson, currentChallenge, currentComponent, currentAnimation, markLessonDone, markChallengeDone, markComponentDone, markAnimationDone]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        updatePreview();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [updatePreview]);

  const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");

  const goNextLesson = () => {
    const idx = CSS_LESSONS.findIndex(l => l.id === activeLesson);
    if (idx < CSS_LESSONS.length - 1) selectLesson(CSS_LESSONS[idx + 1].id);
  };
  const goPrevLesson = () => {
    const idx = CSS_LESSONS.findIndex(l => l.id === activeLesson);
    if (idx > 0) selectLesson(CSS_LESSONS[idx - 1].id);
  };

  const currentContent = useMemo(() => {
    if (view === "learn") return currentLesson;
    if (view === "challenge") return currentChallenge;
    if (view === "component") return currentComponent;
    if (view === "animation") return currentAnimation;
    if (view === "interview") return currentInterview;
    if (view === "playground") return { id: "playground", title: "CSS Playground" };
    return null;
  }, [view, currentLesson, currentChallenge, currentComponent, currentAnimation, currentInterview]);

  const currentTests = useMemo(() => {
    if (view === "learn") return currentLesson?.tests || [];
    if (view === "challenge") return currentChallenge?.tests || [];
    if (view === "component") return currentComponent?.tests || [];
    if (view === "animation") return currentAnimation?.tests || [];
    return [];
  }, [view, currentLesson, currentChallenge, currentComponent, currentAnimation]);

  const previewWidth = previewMode === "mobile" ? "375px" : previewMode === "tablet" ? "768px" : "100%";

  if (loading) {
    return <div className="jsl-platform"><SkeletonLabPlatform /></div>;
  }

  if (!currentContent && view !== "playground") {
    return (
      <div className="jsl-platform">
        <div className="jsl-empty" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", color: "#64748b", flexDirection: "column", gap: "0.5rem" }}>
          <h2 style={{ color: "#e2e8f0" }}>Welcome to CSS Labs</h2>
          <p>Select a lesson, challenge, component, animation, or interview topic from the sidebar to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="jsl-platform">
      {/* Top Nav */}
      <div className="jsl-topbar">
        <div className="jsl-topbar-left">
          <a href={`${base}labs`} className="jsl-top-back">
            <FiArrowLeft size={16} />
            Labs
          </a>
          <div className="jsl-top-brand">
            <div className="jsl-top-brand-icon" style={{ background: "rgba(96,165,250,0.08)", borderColor: "rgba(96,165,250,0.18)" }}>
              <DiCss3 size={18} />
            </div>
            <span className="jsl-top-title">CSS Labs</span>
          </div>
        </div>
        <div className="jsl-topbar-center">
          <span className="jsl-top-progress-text">{progressStats.total}/{progressStats.totalAll} completed</span>
          <div className="jsl-top-progress-bar"><div className="jsl-top-progress-fill" style={{ width: `${progressStats.pct}%` }} /></div>
          <span className="jsl-top-percent">{progressStats.pct}%</span>
        </div>
        <div className="jsl-topbar-right">
          {(view === "learn" && currentLesson) || (view === "challenge" && currentChallenge) || (view === "component" && currentComponent) || (view === "animation" && currentAnimation) ? (
            <button className={`jsl-btn-mark jsl-btn-topbar done`} onClick={() => {
              if (view === "learn" && currentLesson) markLessonDone(currentLesson.id);
              else if (view === "challenge" && currentChallenge) markChallengeDone(currentChallenge.id);
              else if (view === "component" && currentComponent) markComponentDone(currentComponent.id);
              else if (view === "animation" && currentAnimation) markAnimationDone(currentAnimation.id);
            }}>
              <FiBook size={16} /> Mark Complete
            </button>
          ) : null}
          <button className="jsl-btn-icon" onClick={() => setMonacoTheme(t => t === "jsl-dark" ? "jsl-light" : "jsl-dark")} title="Toggle theme">
            {monacoTheme === "jsl-dark" ? (
              <FiSun size={16} />
            ) : (
              <FiMoon size={16} />
            )}
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="jsl-main">
        <div className="jsl-body" ref={bodyRef}>
          <CSSSidebar
            activeSection={view}
            activeLesson={activeLesson}
            activeChallenge={activeChallenge}
            activeComponent={activeComponent}
            activeAnimation={activeAnimation}
            activeInterview={activeInterview}
            onSelectLesson={selectLesson}
            onSelectChallenge={selectChallenge}
            onSelectComponent={selectComponent}
            onSelectAnimation={selectAnimation}
            onSelectInterview={selectInterview}
            onSelectPlayground={selectPlayground}
            progress={progressStats}
            style={{ width: sidebarWidth }}
          />
          <ResizableHandle onDrag={handleSidebarDrag} />

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
                    hasPrev={CSS_LESSONS.findIndex(l => l.id === activeLesson) > 0}
                    hasNext={CSS_LESSONS.findIndex(l => l.id === activeLesson) < CSS_LESSONS.length - 1}
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
                  />
                )}
                {view === "component" && currentComponent && (
                  <ComponentView
                    component={currentComponent}
                    showSolution={showSolution}
                    onToggleSolution={() => setShowSolution(s => !s)}
                  />
                )}
                {view === "animation" && currentAnimation && (
                  <AnimationView
                    animation={currentAnimation}
                    showSolution={showSolution}
                    onToggleSolution={() => setShowSolution(s => !s)}
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
              {(view === "learn" || view === "challenge" || view === "component" || view === "animation") && currentTests.length > 0 && (
                <>
                  <ResizableHandle onDrag={handlePreviewDrag} orientation="horizontal" />
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
            <ResizableHandle onDrag={handleContentDrag} />
            <div className="jsl-editor-panel" ref={editorPanelRef} style={{ flex: `${1 - contentRatio} 1 0` }}>
              <div className="jsl-editor-actions">
                <button className="jsl-btn-run" onClick={updatePreview} title="Ctrl+Enter to refresh preview" style={{ background: "rgba(96,165,250,0.14)", color: "#60a5fa" }}>
                  <FiBook size={16} /> Preview
                </button>
                <span className="jsl-editor-lang" style={{ background: "rgba(96,165,250,0.07)", borderColor: "rgba(96,165,250,0.15)", color: "#60a5fa" }}>
                  <FiBook size={16} /> HTML+CSS
                </span>
                <span className="jsl-editor-shortcut">Ctrl+Enter to preview</span>
              </div>

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
              <ResizableHandle onDrag={handlePreviewDrag} orientation="horizontal" />
              <div className="jsl-preview-panel" style={{ height: previewHeight, maxHeight: previewHeight, minHeight: previewHeight }}>
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
                      title="CSS Preview"
                      style={{
                        width: "100%", height: "100%", border: "none",
                        background: "#ffffff", borderRadius: "0 0 8px 8px",
                      }}
                      sandbox="allow-scripts allow-same-origin"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
        <span className="jsl-chapter-badge" style={{ background: "rgba(96,165,250,0.11)", borderColor: "rgba(96,165,250,0.18)", color: "#60a5fa" }}>Chapter {lesson.chapter}</span>
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
        <span className="jsl-chapter-badge" style={{ background: "rgba(52,211,153,0.11)", borderColor: "rgba(52,211,153,0.18)", color: "#34d399" }}>🏆 CSS Challenge</span>
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

// ─── COMPONENT VIEW ───

function ComponentView({ component, showSolution, onToggleSolution }) {
  return (
    <div className="jsl-content-inner">
      <div className="jsl-chapter-header">
        <span className="jsl-chapter-badge" style={{ background: "rgba(245,158,11,0.11)", borderColor: "rgba(245,158,11,0.18)", color: "#f59e0b" }}>🎨 Component Lab</span>
        <h2 className="jsl-content-title">{component.title}</h2>
      </div>

      <div className="jsl-section">
        <h3 className="jsl-section-title">Overview</h3>
        <p className="jsl-text">{component.overview}</p>
      </div>

      {component.features && component.features.length > 0 && (
        <div className="jsl-section">
          <h3 className="jsl-section-title">Features</h3>
          <ul className="jsl-rules-list">
            {component.features.map((feat, i) => (
              <li key={i} className="jsl-rule-item">{feat}</li>
            ))}
          </ul>
        </div>
      )}

      {showSolution && (
        <div className="jsl-solution-box">
          <h4>Complete Solution</h4>
          <pre className="jsl-code-block"><code>{component.solution}</code></pre>
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

// ─── ANIMATION VIEW ───

function AnimationView({ animation, showSolution, onToggleSolution }) {
  return (
    <div className="jsl-content-inner">
      <div className="jsl-chapter-header">
        <span className="jsl-chapter-badge" style={{ background: "rgba(236,72,153,0.11)", borderColor: "rgba(236,72,153,0.18)", color: "#ec4899" }}>✨ Animation Lab</span>
        <h2 className="jsl-content-title">{animation.title}</h2>
      </div>

      <div className="jsl-section">
        <h3 className="jsl-section-title">Overview</h3>
        <p className="jsl-text">{animation.overview}</p>
      </div>

      {animation.task && (
        <div className="jsl-section jsl-task-section">
          <h3 className="jsl-section-title">Your Task</h3>
          <div className="jsl-task-text">
            {animation.task.split("\n").map((line, i) => {
              if (line.trim().startsWith("-") || line.trim().match(/^\d+\./)) {
                return <li key={i} className="jsl-task-item">{line.replace(/^[\d.]*\s*/, "").replace(/^-/, "").trim()}</li>;
              }
              return <p key={i}>{line}</p>;
            })}
          </div>
        </div>
      )}

      {showSolution && (
        <div className="jsl-solution-box">
          <h4>Complete Solution</h4>
          <pre className="jsl-code-block"><code>{animation.solution}</code></pre>
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
        <span className="jsl-chapter-badge" style={{ background: "rgba(96,165,250,0.11)", borderColor: "rgba(96,165,250,0.18)", color: "#60a5fa" }}>
          <FiBook size={16} /> CSS Playground
        </span>
        <h2 className="jsl-content-title">CSS Playground</h2>
        <p className="jsl-text" style={{ marginTop: "0.5rem" }}>
          Write HTML and CSS in the editor and see the live preview update in real time!
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
          { icon: "🎨", title: "Full CSS Support", desc: "All modern CSS features" },
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
