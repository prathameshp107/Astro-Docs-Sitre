import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Editor from "@monaco-editor/react";
import ThemeToggle from "../ThemeToggle.jsx";
import Skeleton from "../Skeleton.jsx";
import { DiDatabase } from "react-icons/di";
import { getProblemById, DIFFICULTY, DSA_TOPICS } from "../../data/dsa-problems.js";
import { FiArrowLeft, FiSun, FiMoon, FiPlay, FiRefreshCw } from "react-icons/fi";


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

  return <div ref={ref} className="jsl-resize-handle" style={{ cursor: orientation === "vertical" ? "col-resize" : "row-resize" }} />;
}

// ─── THEMES ───

function defineDSAThemes(monaco) {
  monaco.editor.defineTheme("dsa-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "64748b", fontStyle: "italic" },
      { token: "keyword", foreground: "a78bfa" },
      { token: "keyword.control", foreground: "a78bfa" },
      { token: "string", foreground: "34d399" },
      { token: "number", foreground: "f59e0b" },
      { token: "type", foreground: "2dd4bf" },
      { token: "function", foreground: "60a5fa" },
      { token: "variable", foreground: "e2e8f0" },
    ],
    colors: {
      "editor.background": "#0a0f1e",
      "editor.foreground": "#e2e8f0",
      "editor.lineHighlightBackground": "#0d1525",
      "editor.selectionBackground": "rgba(99,102,241,0.25)",
      "editorCursor.foreground": "#6366f1",
      "editorLineNumber.foreground": "#475569",
      "editorLineNumber.activeForeground": "#94a3b8",
    },
  });

  monaco.editor.defineTheme("dsa-light", {
    base: "vs",
    inherit: true,
    rules: [
      { token: "comment", foreground: "94a3b8", fontStyle: "italic" },
      { token: "keyword", foreground: "7c3aed" },
      { token: "string", foreground: "059669" },
      { token: "number", foreground: "d97706" },
      { token: "type", foreground: "0891b2" },
      { token: "function", foreground: "2563eb" },
    ],
    colors: {
      "editor.background": "#ffffff",
      "editor.foreground": "#1e293b",
      "editor.lineHighlightBackground": "#f8fafc",
      "editor.selectionBackground": "rgba(99,102,241,0.12)",
      "editorCursor.foreground": "#6366f1",
    },
  });
}

// ─── PROBLEM VIEW ───

export default function DSAProblemView({ problemId }) {
  const problem = useMemo(() => getProblemById(problemId), [problemId]);
  const [loading, setLoading] = useState(true);

  const [code, setCode] = useState("");
  const [output, setOutput] = useState([]);
  const [testResults, setTestResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [monacoTheme, setMonacoTheme] = useState("dsa-dark");
  const [showSolution, setShowSolution] = useState(false);
  const [revealedHints, setRevealedHints] = useState([]);
  const [consoleHeight, setConsoleHeight] = useState(160);
  const editorRef = useRef(null);
  const editorPanelRef = useRef(null);
  const codeVersionRef = useRef(0);

  useEffect(() => {
    if (problem) {
      setCode(problem.starterCode);
      setOutput([]);
      setTestResults([]);
      setShowSolution(false);
      setRevealedHints([]);
      codeVersionRef.current++;
    }
  }, [problemId, problem]);

  const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleEditorMount = useCallback((editor, monaco) => {
    editorRef.current = editor;
    defineDSAThemes(monaco);
    monaco.editor.setTheme(monacoTheme);

    const remeasure = () => { try { editor.remeasureFonts(); } catch {} };
    setTimeout(remeasure, 50);
    setTimeout(remeasure, 500);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(remeasure);
    }
  }, [monacoTheme]);

  const handleCodeChange = useCallback((v) => {
    setCode(v || "");
  }, []);

  const handleConsoleDrag = useCallback(({ clientY }) => {
    if (!editorPanelRef.current) return;
    const rect = editorPanelRef.current.getBoundingClientRect();
    const maxH = rect.height * 0.6;
    const newHeight = Math.max(80, Math.min(maxH, rect.bottom - clientY));
    setConsoleHeight(newHeight);
  }, []);

  const runCode = useCallback(() => {
    setIsRunning(true);
    setOutput([]);
    const logs = [];
    const origLog = console.log, origErr = console.error, origWarn = console.warn;

    console.log = (...args) => {
      logs.push({ type: "log", content: args.map(a => typeof a === "object" ? JSON.stringify(a, null, 2) : String(a)).join(" ") });
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
      const result = new Function(code)();
      if (result !== undefined && logs.length === 0) logs.push({ type: "info", content: `→ ${JSON.stringify(result)}` });
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

  const runTests = useCallback(() => {
    if (!problem) return;

    // First check syntax
    try {
      new Function(code);
    } catch (e) {
      setTestResults(problem.tests.map((test, i) => ({
        index: i, name: test.name, passed: false,
        error: `Syntax error: ${e.message}`,
      })));
      return;
    }

    const results = problem.tests.map((test, i) => {
      try {
        const startTime = performance.now();
        const passed = test.validate(code);
        const endTime = performance.now();
        return {
          index: i,
          name: test.name,
          passed,
          error: passed ? null : "Test failed",
          time: (endTime - startTime).toFixed(2),
        };
      } catch (e) {
        return {
          index: i,
          name: test.name,
          passed: false,
          error: e?.message || "Test failed",
        };
      }
    });

    setTestResults(results);

    // Log results
    const passedCount = results.filter(r => r.passed).length;
    const outputLines = [
      { type: "info", content: `═══ Test Results: ${passedCount}/${results.length} passed ═══` },
    ];
    results.forEach(r => {
      if (r.passed) {
        outputLines.push({ type: "log", content: `  ✓ ${r.name}${r.time ? ` (${r.time}ms)` : ""}` });
      } else {
        outputLines.push({ type: "error", content: `  ✗ ${r.name} — ${r.error || "Failed"}` });
      }
    });
    setOutput(outputLines);
  }, [code, problem]);

  const submitSolution = useCallback(() => {
    setIsSubmitting(true);
    // Same as run tests for now, but could include hidden test cases
    setTimeout(() => {
      runTests();
      setIsSubmitting(false);
    }, 200);
  }, [runTests]);

  const toggleHint = (index) => {
    setRevealedHints(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  // Re-measure fonts on resize
  useEffect(() => {
    const onResize = () => { if (editorRef.current) { try { editorRef.current.remeasureFonts(); } catch {} } };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (loading) {
    return (
      <div className="dsa-platform">
        <div className="dsa-topbar" style={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center', padding: '10px 16px' }}>
          <Skeleton variant="text" width="200px" height="16px" />
          <div style={{ display: 'flex', gap: '8px' }}>
            <Skeleton variant="avatar" size="28px" />
            <Skeleton variant="avatar" size="28px" />
          </div>
        </div>
        <div className="dsa-detail-page">
          <div className="dsa-detail-content" style={{ padding: '20px' }}>
            <Skeleton variant="badge" width="80px" height="20px" style={{ marginBottom: '12px' }} />
            <Skeleton variant="text" width="60%" height="24px" style={{ marginBottom: '16px' }} />
            <Skeleton variant="text" width="100%" height="14px" style={{ marginBottom: '6px' }} />
            <Skeleton variant="text" width="80%" height="14px" style={{ marginBottom: '24px' }} />
            <Skeleton variant="text" width="100%" height="120px" borderRadius="8px" style={{ marginBottom: '16px' }} />
            <Skeleton variant="text" width="100%" height="60px" borderRadius="8px" />
          </div>
          <div className="dsa-editor-panel" style={{ padding: '0' }}>
            <div className="dsa-editor-toolbar" style={{ padding: '10px 14px', display: 'flex', gap: '8px' }}>
              <Skeleton variant="badge" width="60px" height="28px" />
              <Skeleton variant="badge" width="80px" height="28px" />
              <Skeleton variant="badge" width="60px" height="28px" style={{ marginLeft: 'auto' }} />
            </div>
            <div style={{ padding: '16px' }}>
              <Skeleton variant="rect" width="100%" height="calc(100vh - 250px)" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="dsa-platform">
        <div className="dsa-empty">
          <h2>Problem not found</h2>
          <p>The problem you're looking for doesn't exist.</p>
          <a href={`${base}dsa/problems`} className="dsa-btn dsa-btn-primary" style={{ marginTop: "0.5rem" }}>
            ← Back to Problems
          </a>
        </div>
      </div>
    );
  }

  const diff = DIFFICULTY[problem.difficulty] || DIFFICULTY.Easy;
  const passedCount = testResults.filter(r => r.passed).length;
  const allPassed = testResults.length > 0 && passedCount === testResults.length;

  return (
    <div className="dsa-platform">
      {/* Top Navigation */}
      <div className="dsa-topbar">
        <div className="dsa-topbar-left">
          <a href={`${base}dsa/problems`} className="dsa-top-back">
            <FiArrowLeft size={16} />
            Problems
          </a>
          <div className="dsa-top-brand">
            <DiDatabase size={20} color="#6366f1" />
            <span className="dsa-top-title">{problem.number}. {problem.title}</span>
          </div>
        </div>
        <div className="dsa-topbar-right">
          <button className="dsa-btn-icon" onClick={() => setMonacoTheme(t => t === "dsa-dark" ? "dsa-light" : "dsa-dark")} title="Toggle theme">
            {monacoTheme === "dsa-dark" ? (
              <FiSun size={16} />
            ) : (
              <FiMoon size={16} />
            )}
          </button>
          <ThemeToggle />
        </div>
      </div>

      {/* Main Layout */}
      <div className="dsa-detail-page">
        {/* Content Panel */}
        <div className="dsa-detail-content">
          <div className="dsa-detail-scroll">
            <div className="dsa-detail-inner">
              {/* Header */}
              <div className="dsa-detail-header">
                <span className="dsa-detail-badge">Problem {problem.number}</span>
                <h1 className="dsa-detail-title">{problem.title}</h1>
                <div className="dsa-detail-meta">
                  <span className={`dsa-problem-diff ${problem.difficulty.toLowerCase()}`}>
                    {problem.difficulty}
                  </span>
                  <div className="dsa-detail-tags">
                    {problem.topics.map(t => {
                      const topic = DSA_TOPICS.find(tp => tp.id === t);
                      return topic ? (
                        <span key={t} className="dsa-detail-tag">{topic.icon} {topic.label}</span>
                      ) : null;
                    })}
                  </div>
                  <span style={{ color: "var(--dsa-text-muted)", fontSize: "0.78rem" }}>
                    ⚡ {problem.xp} XP
                  </span>
                </div>
                <div className="dsa-detail-companies">
                  {problem.companies.slice(0, 5).map(c => (
                    <span key={c} className="dsa-detail-company">{c}</span>
                  ))}
                  {problem.companies.length > 5 && (
                    <span className="dsa-detail-company" style={{ opacity: 0.6 }}>+{problem.companies.length - 5}</span>
                  )}
                </div>
              </div>

              {/* Problem Statement */}
              <div className="dsa-section">
                <h3 className="dsa-section-title">Problem Statement</h3>
                <div className="dsa-statement">
                  {problem.problemStatement.split("\n").map((line, i) => {
                    if (line.trim().startsWith("`") && line.trim().endsWith("`")) {
                      return <p key={i} style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: "0.85rem", background: "rgba(255,255,255,0.03)", padding: "0.4rem 0.6rem", borderRadius: "0.4rem", margin: "0.25rem 0" }}><code>{line.replace(/`/g, "")}</code></p>;
                    }
                    if (line.trim() === "") return <br key={i} />;
                    return <p key={i} style={{ margin: "0 0 0.35rem" }}>{line}</p>;
                  })}
                </div>
              </div>

              {/* Examples */}
              <div className="dsa-section">
                <h3 className="dsa-section-title">Examples</h3>
                <div className="dsa-examples">
                  {problem.examples.map((ex, i) => (
                    <div key={i} className="dsa-example">
                      <div className="dsa-example-label">Example {i + 1}:</div>
                      <div className="dsa-example-block">
                        <strong>Input: </strong>{ex.input}
                        {"\n"}<strong>Output: </strong>{ex.output}
                        {ex.explanation && `\n${ex.explanation}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Constraints */}
              <div className="dsa-section">
                <h3 className="dsa-section-title">Constraints</h3>
                <ul className="dsa-constraints">
                  {problem.constraints.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>

              {/* Concept Overview */}
              <div className="dsa-section">
                <h3 className="dsa-section-title">Concept Overview</h3>
                <div className="dsa-concept-box">
                  {problem.conceptOverview.split("**").map((part, i) => {
                    if (i % 2 === 1) return <strong key={i}>{part}</strong>;
                    return <span key={i}>{part}</span>;
                  })}
                </div>
              </div>

              {/* Pattern Recognition */}
              <div className="dsa-section">
                <div className="dsa-pattern-box">
                  {(() => {
                    const match = problem.patternRecognition.match(/\*\*Pattern:\s*(.+?)\*\*/);
                    const patternName = match ? match[1].trim() : "";
                    const patternDesc = problem.patternRecognition.replace(/\*\*.*?\*\*/g, "").trim();
                    return (
                      <>
                        <strong>🎯 Pattern: {patternName}</strong>
                        <p>{patternDesc}</p>
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* Hints */}
              <div className="dsa-section">
                <h3 className="dsa-section-title">Hints</h3>
                <div className="dsa-hints">
                  {problem.hints.map((hint, i) => (
                    <div key={i}>
                      <button
                        className={`dsa-hint-btn ${revealedHints.includes(i) ? "revealed" : ""}`}
                        onClick={() => toggleHint(i)}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="16" x2="12" y2="12" />
                          <line x1="12" y1="8" x2="12.01" y2="8" />
                        </svg>
                        Hint {i + 1}
                        {revealedHints.includes(i) ? " ▲" : " ▼"}
                      </button>
                      {revealedHints.includes(i) && (
                        <div className="dsa-hint-text">{hint}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Solutions */}
              <div className="dsa-section">
                <h3 className="dsa-section-title">Solutions</h3>
                <button
                  className="dsa-solution-toggle"
                  onClick={() => setShowSolution(!showSolution)}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 11 12 14 22 4" />
                    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                  </svg>
                  {showSolution ? "Hide Solutions" : "View Solutions"}
                </button>

                {showSolution && (
                  <div className="dsa-solutions">
                    {/* Brute Force */}
                    <div className="dsa-solution-card">
                      <h4>Brute Force</h4>
                      <p>{problem.bruteForceSolution.explanation}</p>
                      <div>
                        <span className="dsa-complexity-tag dsa-complexity-time">Time: {problem.bruteForceSolution.timeComplexity}</span>
                        <span className="dsa-complexity-tag dsa-complexity-space">Space: {problem.bruteForceSolution.spaceComplexity}</span>
                      </div>
                      <pre className="dsa-code-block"><code>{problem.bruteForceSolution.code}</code></pre>
                    </div>

                    {/* Optimized */}
                    <div className="dsa-solution-card">
                      <h4>Optimized Solution</h4>
                      <p>{problem.optimizedSolution.explanation}</p>
                      <div>
                        <span className="dsa-complexity-tag dsa-complexity-time">Time: {problem.optimizedSolution.timeComplexity}</span>
                        <span className="dsa-complexity-tag dsa-complexity-space">Space: {problem.optimizedSolution.spaceComplexity}</span>
                      </div>
                      <pre className="dsa-code-block"><code>{problem.optimizedSolution.code}</code></pre>
                    </div>

                    {/* Interview Explanation */}
                    <div className="dsa-interview-box">
                      <h4>🎙️ Explain This to an Interviewer</h4>
                      {problem.interviewExplanation.split("**").map((part, i) => {
                        if (i % 2 === 1) return <strong key={i}>{part}</strong>;
                        return <span key={i}>{part}</span>;
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Editor Panel */}
        <div className="dsa-editor-panel" ref={editorPanelRef}>
          {/* Editor Toolbar */}
          <div className="dsa-editor-toolbar">
            <button className="dsa-btn-run" onClick={runCode} disabled={isRunning} title="Ctrl+Enter to run">
              {isRunning ? (
                <><span className="dsa-spinner" /> Running</>
              ) : (
                <><FiPlay size={14} fill="currentColor" /> Run</>
              )}
            </button>
            <button className="dsa-btn-submit" onClick={submitSolution} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
            <button className="dsa-btn-secondary" onClick={() => {
              if (editorRef.current) {
                editorRef.current.setValue(problem.starterCode);
              }
              setCode(problem.starterCode);
              setOutput([]);
              setTestResults([]);
              codeVersionRef.current++;
            }}>
              <FiRefreshCw size={14} />
              Reset
            </button>
            <span className="dsa-editor-lang">JavaScript</span>
            <span className="dsa-editor-shortcut">Ctrl+Enter to run</span>
          </div>

          {/* Editor */}
          <div className="dsa-editor-wrapper">
            <Editor
              key={`editor-${problemId}`}
              height="100%"
              language="javascript"
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

          {/* Test Results */}
          {testResults.length > 0 && (
            <div className="dsa-tests-panel" style={{ flexShrink: 0, maxHeight: 100, overflow: "auto" }}>
              <div className="dsa-tests-header">
                <span>Test Results</span>
                <div className="dsa-tests-header-actions">
                  <span className={`dsa-tests-score ${allPassed ? "all-pass" : ""}`}>
                    {passedCount}/{testResults.length} Passed
                  </span>
                </div>
              </div>
              <div className="dsa-tests-body">
                {testResults.map((result, i) => (
                  <div key={i} className={`dsa-test-item ${result.passed ? "pass" : "fail"}`}>
                    <span>{result.passed ? "✓" : "✗"}</span>
                    <span className="dsa-test-name">{result.name}</span>
                    {!result.passed && result.error && (
                      <span style={{ color: "#fca5a5", fontSize: "0.72rem", marginLeft: "0.5rem" }}>{result.error}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Console */}
          <ResizableHandle onDrag={handleConsoleDrag} />
          <div className="dsa-console-panel" style={{ height: consoleHeight, maxHeight: consoleHeight, minHeight: consoleHeight, flexShrink: 0 }}>
            <div className="dsa-console-header">
              <span>Console Output</span>
              <span style={{ color: "var(--dsa-text-muted)", fontSize: "0.68rem", textTransform: "none" }}>{output.length} lines</span>
            </div>
            <div className="dsa-console-body">
              {output.length === 0 ? (
                <div className="dsa-console-empty">
                  <FiPlay size={28} opacity={0.2} />
                  <p>Run your code to see output</p>
                </div>
              ) : (
                output.map((line, i) => (
                  <div key={i} className={`dsa-console-line dsa-console-${line.type}`}>
                    <span style={{ width: 14, flexShrink: 0, textAlign: "center" }}>
                      {line.type === "log" && "▸"}
                      {line.type === "warn" && "⚠"}
                      {line.type === "error" && "✗"}
                      {line.type === "info" && "ℹ"}
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
  );
}
