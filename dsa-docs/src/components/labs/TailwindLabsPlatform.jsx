import { FiBook, FiCheck, FiChevronDown, FiChevronLeft, FiChevronRight, FiRefreshCw, FiPlay } from "react-icons/fi";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Editor from "@monaco-editor/react";
import { SkeletonLabPlatform } from "../Skeleton.jsx";

import { TW_LESSONS, TW_PLAYGROUND_DEFAULT } from "../../data/tailwind-labs-curriculum.js";
import { verifyDomAndStyles } from "./shared/domValidator.js";

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
  renderFormattedText,
  CodeBlock,
} from "./shared/index.js";

// ─── SIDEBAR ───



const getDraftCode = (draftKey, view, id, defaultCode) => {
  if (typeof window === "undefined") return defaultCode;
  try {
    const drafts = JSON.parse(localStorage.getItem(draftKey) || "{}");
    const key = `${view}:${id}`;
    return drafts[key] !== undefined ? drafts[key] : defaultCode;
  } catch {
    return defaultCode;
  }
};

// ─── MAIN PLATFORM ───

export default function TailwindLabsPlatform() {
  const DRAFT_KEY = "tw-draft";
  const [loading, setLoading] = useState(false); // SSR-safe: effects do not run on the server, so an initial `true` made the server-rendered HTML a skeleton with no crawlable content.
  const [activeLesson, setActiveLesson] = useState(TW_LESSONS[0]?.id || null);
  const [code, setCode] = useState(() => {
    if (typeof window !== "undefined" && window.location.hash && window.location.hash.startsWith("#code=")) {
      try {
        const hash = window.location.hash.replace("#code=", "");
        return decodeURIComponent(escape(atob(hash)));
      } catch {}
    }
    const firstId = TW_LESSONS[0]?.id || null;
    return firstId ? getDraftCode("tw-draft", "learn", firstId, TW_LESSONS[0]?.starterCode) : "";
  });
  const [testResults, setTestResults] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [monacoTheme, setMonacoTheme] = useState("jsl-dark");
  const [progress, setProgress] = useState({ lessons: [] });
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
  const [testsHeight, setTestsHeight] = useState(140);
  const bodyRef = useRef(null);
  const workspaceRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fontSize, setFontSize] = useState(() => {
    try { return parseInt(localStorage.getItem("tw-font-size"), 10) || 13; } catch { return 13; }
  });

  // Debounced autosave for drafts
  useEffect(() => {
    if (loading) return;
    const activeId = activeLesson;
    if (!activeId) return;

    const timer = setTimeout(() => {
      try {
        const drafts = JSON.parse(localStorage.getItem(DRAFT_KEY) || "{}");
        drafts[`learn:${activeId}`] = code;
        localStorage.setItem(DRAFT_KEY, JSON.stringify(drafts));
      } catch (e) { /* ignore */ }
    }, 1000); // 1s debounce

    return () => clearTimeout(timer);
  }, [code, activeLesson, loading]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 100);
    try {
      const stored = JSON.parse(localStorage.getItem("tw-progress") || '{"lessons":[]}');
      setProgress(stored);
    } catch {}
    return () => clearTimeout(timer);
  }, []);

  const saveProgress = useCallback((newProgress) => {
    setProgress(newProgress);
    try { localStorage.setItem("tw-progress", JSON.stringify(newProgress)); } catch {}
  }, []);

  const markLessonDone = useCallback((id) => {
    if (!progress.lessons.includes(id)) saveProgress({ ...progress, lessons: [...progress.lessons, id] });
  }, [progress, saveProgress]);

  const progressStats = useMemo(() => ({
    total: progress.lessons.length,
    totalAll: TW_LESSONS.length,
    pct: Math.round((progress.lessons.length / TW_LESSONS.length) * 100) || 0,
    lessons: progress.lessons,
  }), [progress]);

  const currentLesson = useMemo(() => TW_LESSONS.find(l => l.id === activeLesson), [activeLesson]);

  const selectLesson = (id) => {
    if (id === "playground") {
      setActiveLesson("playground");
      setCode(getDraftCode(DRAFT_KEY, "learn", "playground", TW_PLAYGROUND_DEFAULT));
      setShowHint(false);
      setShowSolution(false);
      setTestResults([]);
      codeVersionRef.current++;
      return;
    }
    const lesson = TW_LESSONS.find(l => l.id === id);
    if (!lesson) return;
    setActiveLesson(id);
    setCode(getDraftCode(DRAFT_KEY, "learn", id, lesson.starterCode));
    setShowHint(false);
    setShowSolution(false);
    setTestResults([]);
    codeVersionRef.current++;
  };

  // Live preview
  const codeRef = useRef(code);
  codeRef.current = code;

  const updatePreview = useCallback(() => {
    const currentCode = codeRef.current;
    if (!currentCode) return;
    setPreviewCode(currentCode);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      updatePreview();
    }, 400);
    return () => clearTimeout(timer);
  }, [code, updatePreview]);

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

  const handleTestsDrag = useCallback(({ clientY }) => {
    if (!contentPanelRef.current) return;
    const rect = contentPanelRef.current.getBoundingClientRect();
    const maxH = rect.height * 0.6;
    setTestsHeight(Math.max(100, Math.min(maxH, rect.bottom - clientY)));
  }, []);

  // Run tests
  const runTests = useCallback(() => {
    const tests = currentLesson?.tests || [];
    const doc = iframeRef.current?.contentDocument || iframeRef.current?.contentWindow?.document || null;

    const results = tests.map((test, i) => {
      try {
        let passed = test.validate(code);
        let errorDetail = null;

        if (passed && doc) {
          const domPassed = verifyDomAndStyles(code, test.name, doc);
          if (!domPassed) {
            passed = false;
            errorDetail = "DOM/Tailwind validation failed. Please check the classes applied to the rendered elements.";
          }
        }

        return { index: i, name: test.name, passed, error: passed ? null : (errorDetail || `Expected: ${test.name}`) };
      } catch (e) {
        return { index: i, name: test.name, passed: false, error: e?.message || `Expected: ${test.name}` };
      }
    });
    setTestResults(results);
    const allPassed = results.length > 0 && results.every(r => r.passed);
    if (allPassed && currentLesson) markLessonDone(currentLesson.id);
  }, [code, currentLesson, markLessonDone]);

  useKeyboardShortcut(updatePreview);

  const [paletteOpen, setPaletteOpen] = useCommandPalette();
  const [hideSidebar, setHideSidebar] = useState(false);
  useKeyboardShortcut(() => setHideSidebar(v => !v), "b");

  const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");

  const goNextLesson = () => {
    if (activeLesson === "playground") return;
    const idx = TW_LESSONS.findIndex(l => l.id === activeLesson);
    if (idx < TW_LESSONS.length - 1) selectLesson(TW_LESSONS[idx + 1].id);
  };
  const goPrevLesson = () => {
    if (activeLesson === "playground") return;
    const idx = TW_LESSONS.findIndex(l => l.id === activeLesson);
    if (idx > 0) selectLesson(TW_LESSONS[idx - 1].id);
  };

  const isPlayground = activeLesson === "playground";
  const currentContent = isPlayground ? { id: "playground", title: "Tailwind Playground" } : currentLesson;
  const currentTests = isPlayground ? [] : (currentLesson?.tests || []);
  const previewWidth = previewMode === "mobile" ? "375px" : previewMode === "tablet" ? "768px" : "100%";

  const chapters = useMemo(() => {
    const map = {};
    TW_LESSONS.forEach(l => {
      if (!map[l.chapter]) map[l.chapter] = { number: l.chapter, lessons: [] };
      map[l.chapter].lessons.push(l);
    });
    return Object.values(map).sort((a, b) => a.number - b.number);
  }, []);

  const sidebarSections = useMemo(() => {
    return chapters.map((ch) => ({
      key: `chapter-${ch.number}`,
      label: `CHAPTER ${ch.number}`,
      color: "#38bdf8",
      items: ch.lessons,
      progressText: `${ch.lessons.filter(l => progress.lessons.includes(l.id)).length}/${ch.lessons.length}`,
      isItemActive: (item) => activeLesson === item.id,
      isItemDone: (item) => progress.lessons.includes(item.id),
      onSelectItem: (item) => selectLesson(item.id),
      renderItemNumber: (item, idx) => (
        <span className="jsl-si-num">{ch.number}.{idx + 1}</span>
      )
    }));
  }, [chapters, activeLesson, progress]);

  const sidebarPlayground = useMemo(() => ({
    label: "TAILWIND PLAYGROUND",
    color: "#38bdf8",
    isActive: activeLesson === "playground",
    onSelect: () => selectLesson("playground"),
  }), [activeLesson]);

  const tourSteps = useMemo(() => [
    {
      title: "Welcome to Tailwind CSS Labs! ⚡",
      content: "Let's take a quick tour of your Tailwind styling environment."
    },
    {
      target: ".jsl-sidebar",
      title: "Lessons & Playground",
      content: "Navigate through the structured chapters or hop into the playground to experiment."
    },
    {
      target: ".jsl-content-panel",
      title: "Instructions & Tasks",
      content: "Read the design tasks, check hints/solutions, and run tests to verify."
    },
    {
      target: ".jsl-editor-panel",
      title: "Editor & Preview",
      content: "Type HTML with Tailwind utility classes in Monaco editor. The live preview updates automatically."
    },
    {
      target: ".jsl-btn-command-palette",
      title: "Command Palette",
      content: "Click this button or press Ctrl+K to open search & actions instantly."
    }
  ], []);

  if (loading) {
    return <div className="jsl-platform"><SkeletonLabPlatform /></div>;
  }

  return (
    <div className="jsl-platform">
      <LabTopbar
        base={base}
        title="Tailwind CSS Playground"
        icon={{
          component: <span className="text-[#38bdf8] font-bold text-xs">TW</span>,
          style: { background: "rgba(56,189,248,0.08)", borderColor: "rgba(56,189,248,0.18)" },
        }}
        progressStats={progressStats}
        monacoTheme={monacoTheme}
        onToggleTheme={() => setMonacoTheme(t => t === "jsl-dark" ? "jsl-light" : "jsl-dark")}
        onOpenPalette={() => setPaletteOpen(true)}
      >
        {currentLesson && (
          <button className="jsl-btn-mark jsl-btn-topbar done" onClick={() => markLessonDone(currentLesson.id)}>
            <FiBook size={16} /> Mark Complete
          </button>
        )}
      </LabTopbar>

      <LabCommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        accent="#38bdf8"
        commands={[
          { id: "preview", section: "Actions", label: "Refresh preview", hint: "Ctrl+Enter", action: updatePreview },
          { id: "tests", section: "Actions", label: "Run tests", action: runTests },
          { id: "reset", section: "Actions", label: "Reset editor starter code", action: () => {
            let starter = TW_PLAYGROUND_DEFAULT;
            if (!isPlayground && currentLesson) starter = currentLesson.starterCode;
            if (editorRef.current) editorRef.current.setValue(starter);
            setCode(starter);
            setTestResults([]);
            codeVersionRef.current++;
          }},
          { id: "theme", section: "Actions", label: "Toggle editor theme", action: () => setMonacoTheme(t => t === "jsl-dark" ? "jsl-light" : "jsl-dark") },
          { id: "focus", section: "Actions", label: hideSidebar ? "Show sidebar" : "Focus mode (hide sidebar)", hint: "Ctrl+B", action: () => setHideSidebar(v => !v) },
          { id: "playground", section: "Actions", label: "Go to playground", action: () => selectLesson("playground") },
          { id: "back", section: "Actions", label: "Back to all labs", action: () => { window.location.href = `${base}labs`; } },
          ...TW_LESSONS.map(l => ({ id: `l-${l.id}`, section: "Lessons", label: l.title, done: progress.lessons.includes(l.id), action: () => selectLesson(l.id) })),
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
            <div className="jsl-content-panel" ref={contentPanelRef} style={{ flex: `${contentRatio} 1 0` }}>
              <div className="jsl-content-scroll">
                {currentContent && !isPlayground && (
                  <LessonView
                    lesson={currentLesson}
                    showHint={showHint}
                    showSolution={showSolution}
                    onToggleHint={() => setShowHint(h => !h)}
                    onToggleSolution={() => setShowSolution(s => !s)}
                    onPrev={goPrevLesson}
                    onNext={goNextLesson}
                    hasPrev={TW_LESSONS.findIndex(l => l.id === activeLesson) > 0}
                    hasNext={TW_LESSONS.findIndex(l => l.id === activeLesson) < TW_LESSONS.length - 1}
                    onMarkDone={() => markLessonDone(currentLesson.id)}
                    isDone={progress.lessons.includes(currentLesson.id)}
                    testResults={testResults}
                    currentTests={currentTests}
                    onRunTests={runTests}
                  />
                )}
                {isPlayground && (
                  <div className="jsl-content-inner">
                    <h2 className="jsl-content-title">Tailwind CSS Playground</h2>
                    <p className="jsl-text" style={{ marginTop: "1rem" }}>
                      This is a scratchpad where you can write HTML and test Tailwind utility classes.
                    </p>
                    <p className="jsl-text" style={{ marginTop: "0.5rem", color: "#94a3b8" }}>
                      Type markup in the editor on the right, and check visual styles in live preview instantly.
                    </p>
                  </div>
                )}
              </div>

              {/* Tests Panel */}
              {currentTests.length > 0 && (
                <>
                  <LabResizableHandle onDrag={handleTestsDrag} orientation="horizontal" />
                  <div className="jsl-tests-panel" style={{ height: testsHeight, maxHeight: testsHeight, minHeight: testsHeight }}>
                    <div className="jsl-tests-header">
                      <span className="jsl-tests-title">
                        <FiCheck color="#38bdf8" size={14} />
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
            <div className={`jsl-editor-panel${isFullscreen ? " jsl-editor-fullscreen" : ""}`} ref={editorPanelRef} style={isFullscreen ? {} : { flex: `${1 - contentRatio} 1 0` }}>
              <LabEditorToolbar
                isRunning={false}
                onRun={updatePreview}
                onReset={() => {
                  let starter = TW_PLAYGROUND_DEFAULT;
                  if (!isPlayground && currentLesson) starter = currentLesson.starterCode;
                  if (editorRef.current) editorRef.current.setValue(starter);
                  setCode(starter);
                  setTestResults([]);
                  codeVersionRef.current++;
                }}
                runLabel="Preview"
                lang="HTML+Tailwind"
                runButtonStyle={{ background: "rgba(56,189,248,0.14)", color: "#38bdf8" }}
                fontSize={fontSize}
                onFontSizeDown={() => setFontSize(s => { const n = Math.max(10, s-1); try { localStorage.setItem('tw-font-size', n); } catch {} return n; })}
                onFontSizeUp={() => setFontSize(s => { const n = Math.min(24, s+1); try { localStorage.setItem('tw-font-size', n); } catch {} return n; })}
                onFullscreen={() => setIsFullscreen(f => !f)}
                isFullscreen={isFullscreen}
                code={code}
              />

              <div className="jsl-editor-wrapper">
                <Editor
                  key={`tw-${codeVersionRef.current}`}
                  height="100%"
                  language="html"
                  theme={monacoTheme}
                  value={code}
                  onChange={handleCodeChange}
                  onMount={handleEditorMount}
                  options={{
                    fontSize: fontSize,
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
              <LabResizableHandle onDrag={handlePreviewDrag} orientation="horizontal" />
              <div className="jsl-preview-panel" style={{ height: previewHeight, maxHeight: previewHeight, minHeight: previewHeight }}>
                <div className="jsl-preview-header">
                  <div className="jsl-preview-header-left">
                    <span className="jsl-browser-dots">
                      <span className="jsl-browser-dot red" />
                      <span className="jsl-browser-dot yellow" />
                      <span className="jsl-browser-dot green" />
                    </span>
                    <span className="jsl-preview-url">Tailwind Preview</span>
                  </div>
                  <div className="jsl-preview-info">
                    <button
                      className={`jsl-mode-tab ${previewMode === "mobile" ? "active" : ""}`}
                      onClick={() => setPreviewMode("mobile")}
                      style={{
                        padding: "0.15rem 0.4rem", borderRadius: "3px", fontSize: "0.65rem",
                        background: previewMode === "mobile" ? "rgba(56,189,248,0.12)" : "transparent",
                        color: previewMode === "mobile" ? "#38bdf8" : "#64748b",
                        border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.2rem",
                      }}
                    >
                      Mobile
                    </button>
                    <button
                      className={`jsl-mode-tab ${previewMode === "tablet" ? "active" : ""}`}
                      onClick={() => setPreviewMode("tablet")}
                      style={{
                        padding: "0.15rem 0.4rem", borderRadius: "3px", fontSize: "0.65rem",
                        background: previewMode === "tablet" ? "rgba(56,189,248,0.12)" : "transparent",
                        color: previewMode === "tablet" ? "#38bdf8" : "#64748b",
                        border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.2rem",
                      }}
                    >
                      Tablet
                    </button>
                    <button
                      className={`jsl-mode-tab ${previewMode === "desktop" ? "active" : ""}`}
                      onClick={() => setPreviewMode("desktop")}
                      style={{
                        padding: "0.15rem 0.4rem", borderRadius: "3px", fontSize: "0.65rem",
                        background: previewMode === "desktop" ? "rgba(56,189,248,0.12)" : "transparent",
                        color: previewMode === "desktop" ? "#38bdf8" : "#64748b",
                        border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.2rem",
                      }}
                    >
                      Desktop
                    </button>
                  </div>
                </div>
                <div className="jsl-preview-body" style={{ display: "flex", justifyContent: "center" }}>
                  <div style={{ width: previewWidth, maxWidth: "100%", transition: "width 0.3s ease" }}>
                    <iframe
                      ref={iframeRef}
                      title="Tailwind Preview"
                      style={{
                        width: "100%", height: "100%", border: "none",
                        background: "#ffffff", borderRadius: "0 0 8px 8px",
                      }}
                      sandbox="allow-scripts allow-same-origin"
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
      <LabTour steps={tourSteps} tourKey="tw-labs-onboarding-tour-completed" />
    </div>
  );
}

// ─── LESSON VIEW ───

function LessonView({ lesson, showHint, showSolution, onToggleHint, onToggleSolution, onPrev, onNext, hasPrev, hasNext, onMarkDone, isDone, testResults, currentTests, onRunTests }) {
  const levelColor = lesson.level === "Beginner" ? "#22c55e" : lesson.level === "Intermediate" ? "#f59e0b" : "#ef4444";

  return (
    <div className="jsl-content-inner">
      <div className="jsl-chapter-header">
        <span className="jsl-chapter-badge" style={{ background: "rgba(56,189,248,0.11)", borderColor: "rgba(56,189,248,0.18)", color: "#38bdf8" }}>Chapter {lesson.chapter}</span>
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

      {/* Task */}
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
