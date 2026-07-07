import { FiBook, FiCheck, FiChevronDown, FiChevronLeft, FiChevronRight, FiRefreshCw, FiPlay } from "react-icons/fi";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Editor from "@monaco-editor/react";
import { SkeletonLabPlatform } from "../Skeleton.jsx";

import { TW_LESSONS, TW_PLAYGROUND_DEFAULT } from "../../data/tailwind-labs-curriculum.js";

import {
  LabResizableHandle,
  LabFooter,
  LabEditorToolbar,
  LabTopbar,
  useKeyboardShortcut,
} from "./shared/index.js";

// ─── SIDEBAR ───

function TailwindSidebar({ activeLesson, onSelectLesson, progress, ...rest }) {
  // Group lessons by chapter
  const chapters = useMemo(() => {
    const map = {};
    TW_LESSONS.forEach(l => {
      if (!map[l.chapter]) map[l.chapter] = { number: l.chapter, lessons: [] };
      map[l.chapter].lessons.push(l);
    });
    return Object.values(map).sort((a, b) => a.number - b.number);
  }, []);

  const [expandedChapters, setExpandedChapters] = useState(() => {
    const obj = {};
    chapters.forEach(ch => { obj[ch.number] = ch.number <= 2; }); // first 2 expanded
    return obj;
  });

  const toggleChapter = (num) => setExpandedChapters(prev => ({ ...prev, [num]: !prev[num] }));

  return (
    <div className="jsl-sidebar" {...rest}>
      <div className="jsl-sidebar-header">
        <h3><FiBook size={16} /> Curriculum</h3>
      </div>

      {/* Playground shortcut */}
      <div className="jsl-sidebar-group">
        <button
          className={`jsl-sg-header ${activeLesson === "playground" ? "expanded" : ""}`}
          onClick={() => onSelectLesson("playground")}
          style={{ color: activeLesson === "playground" ? "#38bdf8" : undefined }}
        >
          <div className="jsl-sg-title" style={{ color: "#38bdf8" }}>
            <FiBook size={16} /> <span>TAILWIND PLAYGROUND</span>
          </div>
        </button>
      </div>

      {/* Chapters */}
      {chapters.map(ch => (
        <div key={ch.number} className="jsl-sidebar-group">
          <button
            className={`jsl-sg-header learn ${expandedChapters[ch.number] ? "expanded" : ""}`}
            onClick={() => toggleChapter(ch.number)}
          >
            <div className="jsl-sg-title" style={{ color: "#38bdf8" }}>
              <FiBook size={16} />
              <span>Chapter {ch.number}</span>
            </div>
            <span className="jsl-sg-count">
              {ch.lessons.filter(l => progress.lessons.includes(l.id)).length}/{ch.lessons.length}
            </span>
            <FiChevronDown size={14} />
          </button>
          {expandedChapters[ch.number] && (
            <div className="jsl-sg-items">
              {ch.lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  className={`jsl-si ${activeLesson === lesson.id ? "active" : ""} ${progress.lessons.includes(lesson.id) ? "done" : ""}`}
                  onClick={() => onSelectLesson(lesson.id)}
                >
                  <span className="jsl-si-num">{ch.number}.{ch.lessons.indexOf(lesson) + 1}</span>
                  <span className="jsl-si-title">{lesson.title}</span>
                  <span className={`jsl-si-level ${lesson.level.toLowerCase()}`}>{lesson.level[0]}</span>
                  {progress.lessons.includes(lesson.id) && <span className="jsl-si-check"><FiCheck size={16} /></span>}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── MAIN PLATFORM ───

export default function TailwindLabsPlatform() {
  const [loading, setLoading] = useState(true);
  const [activeLesson, setActiveLesson] = useState(TW_LESSONS[0]?.id || null);
  const [code, setCode] = useState(TW_LESSONS[0]?.starterCode || "");
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
  const bodyRef = useRef(null);
  const workspaceRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 100);
    try {
      const stored = JSON.parse(sessionStorage.getItem("tw-progress") || '{"lessons":[]}');
      setProgress(stored);
    } catch {}
    return () => clearTimeout(timer);
  }, []);

  const saveProgress = useCallback((newProgress) => {
    setProgress(newProgress);
    try { sessionStorage.setItem("tw-progress", JSON.stringify(newProgress)); } catch {}
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
      setCode(TW_PLAYGROUND_DEFAULT);
      setShowHint(false);
      setShowSolution(false);
      setTestResults([]);
      codeVersionRef.current++;
      return;
    }
    const lesson = TW_LESSONS.find(l => l.id === id);
    if (!lesson) return;
    setActiveLesson(id);
    setCode(lesson.starterCode);
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
    updatePreview();
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

  // Run tests
  const runTests = useCallback(() => {
    const tests = currentLesson?.tests || [];
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
    if (allPassed && currentLesson) markLessonDone(currentLesson.id);
  }, [code, currentLesson, markLessonDone]);

  useKeyboardShortcut(updatePreview);

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
      >
        {currentLesson && (
          <button className="jsl-btn-mark jsl-btn-topbar done" onClick={() => markLessonDone(currentLesson.id)}>
            <FiBook size={16} /> Mark Complete
          </button>
        )}
      </LabTopbar>

      <div className="jsl-main">
        <div className="jsl-body" ref={bodyRef}>
          <TailwindSidebar
            activeLesson={activeLesson}
            onSelectLesson={selectLesson}
            progress={progressStats}
            style={{ width: sidebarWidth }}
          />
          <LabResizableHandle onDrag={handleSidebarDrag} />

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
                {isPlayground && <PlaygroundView />}
              </div>

              {/* Tests Panel */}
              {currentTests.length > 0 && (
                <>
                  <LabResizableHandle onDrag={handlePreviewDrag} orientation="horizontal" />
                  <div className="jsl-tests-panel" style={{ height: 120, maxHeight: 120, minHeight: 120 }}>
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
            <div className="jsl-editor-panel" ref={editorPanelRef} style={{ flex: `${1 - contentRatio} 1 0` }}>
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
                      <FiBook size={16} /> Mobile
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
                      <FiBook size={16} /> Tablet
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
                      <FiBook size={16} /> Desktop
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

// ─── PLAYGROUND VIEW ───

function PlaygroundView() {
  return (
    <div className="jsl-content-inner" style={{ textAlign: "center" }}>
      <div className="jsl-chapter-header">
        <span className="jsl-chapter-badge" style={{ background: "rgba(56,189,248,0.11)", borderColor: "rgba(56,189,248,0.18)", color: "#38bdf8" }}>
          <FiBook size={16} /> Tailwind Playground
        </span>
        <h2 className="jsl-content-title">Tailwind CSS Playground</h2>
        <p className="jsl-text" style={{ marginTop: "0.5rem" }}>
          Write HTML with Tailwind classes in the editor and see the live preview update in real time!
        </p>
      </div>

      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: "0.75rem", marginTop: "1rem"
      }}>
        {[
          { icon: "⚡", title: "Live Preview", desc: "Changes update instantly" },
          { icon: "📱", title: "Responsive", desc: "Test mobile, tablet, desktop" },
          { icon: "🎨", title: "Tailwind CDN", desc: "Full utility class support" },
          { icon: "💾", title: "Auto-Save", desc: "Your code is saved locally" },
        ].map(item => (
          <div key={item.title} className="jsl-section" style={{ padding: "1rem", margin: 0, border: "1px solid var(--jsl-border2)", borderRadius: "0.5rem", background: "rgba(255,255,255,0.02)" }}>
            <div style={{ fontSize: "1.5rem", marginBottom: "0.3rem" }}>{item.icon}</div>
            <h4 style={{ margin: "0 0 0.2rem", color: "#f8fafc", fontSize: "0.9rem" }}>{item.title}</h4>
            <p style={{ margin: 0, color: "#94a3b8", fontSize: "0.78rem" }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="jsl-section" style={{ marginTop: "1.5rem", textAlign: "left" }}>
        <h3 className="jsl-section-title">Quick Reference</h3>
        <div style={{ fontSize: "0.84rem", color: "#94a3b8", lineHeight: "1.8" }}>
          <code className="jsl-code-block" style={{ display: "inline-block", padding: "0.2rem 0.5rem" }}>flex</code> Flexbox container<br />
          <code className="jsl-code-block" style={{ display: "inline-block", padding: "0.2rem 0.5rem" }}>grid grid-cols-3</code> 3-column grid<br />
          <code className="jsl-code-block" style={{ display: "inline-block", padding: "0.2rem 0.5rem" }}>p-4 m-2</code> Spacing (padding/margin)<br />
          <code className="jsl-code-block" style={{ display: "inline-block", padding: "0.2rem 0.5rem" }}>bg-blue-500 text-white</code> Colors<br />
          <code className="jsl-code-block" style={{ display: "inline-block", padding: "0.2rem 0.5rem" }}>rounded-lg shadow-md</code> Borders & shadows<br />
          <code className="jsl-code-block" style={{ display: "inline-block", padding: "0.2rem 0.5rem" }}>md:flex lg:grid-cols-4</code> Responsive prefixes
        </div>
      </div>
    </div>
  );
}
