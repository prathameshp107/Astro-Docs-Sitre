import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Editor from "@monaco-editor/react";
import ThemeToggle from "../ThemeToggle.jsx";
import Skeleton from "../Skeleton.jsx";
import { DiDatabase } from "react-icons/di";
import { getProblemById, DIFFICULTY, DSA_TOPICS, DSA_PROBLEMS } from "../../data/dsa-problems.js";
import {
  FiArrowLeft, FiSun, FiMoon, FiPlay, FiRefreshCw,
  FiMaximize2, FiMinimize2, FiClock, FiZoomIn, FiZoomOut, FiCode,
} from "react-icons/fi";
import {
  runCodeInSandbox,
  celebrate,
  awardXP,
  LabXPBadge,
  LabCommandPalette,
  useCommandPalette,
} from "../labs/shared/index.js";

const DSA_CONFETTI = ["#6366f1", "#a78bfa", "#34d399", "#f59e0b"];
const SOLVED_KEY = "dsa-solved-v1";
const DRAFTS_KEY = "dsa-drafts-v1";
const SUBS_KEY = "dsa-submissions-v1";
const NOTES_KEY = "dsa-notes-v1";
const SETTINGS_KEY = "dsa-editor-settings-v1";
const MAX_SUBMISSIONS = 20;
const TIME_LIMIT_MS = 4000;

function readJSON(key, fallback) {
  try {
    const v = JSON.parse(localStorage.getItem(key));
    return v === null || v === undefined ? fallback : v;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

function readSolved() {
  return readJSON(SOLVED_KEY, []);
}

const VERDICT_META = {
  accepted: { label: "Accepted", cls: "accepted", icon: "✓" },
  wrong_answer: { label: "Wrong Answer", cls: "wrong", icon: "✗" },
  runtime_error: { label: "Runtime Error", cls: "error", icon: "⚠" },
  time_limit_exceeded: { label: "Time Limit Exceeded", cls: "tle", icon: "⏱" },
};

// ─── RESIZABLE HANDLE ───

function ResizableHandle({ onDrag, orientation = "vertical", className = "" }) {
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

  return (
    <div
      ref={ref}
      className={`dsa-resize-handle ${orientation} ${className}`}
      style={{ cursor: orientation === "vertical" ? "col-resize" : "row-resize" }}
    />
  );
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

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const { boilerplate, userCode } = useMemo(() => {
    return splitBoilerplate(code);
  }, [code]);

  const hasBoilerplate = boilerplate.trim().length > 0;
  const displayCode = hasBoilerplate ? userCode : code;

  return (
    <div style={{ position: "relative" }}>
      <pre className="dsa-code-block" style={{ paddingRight: "70px" }}>
        <code>{displayCode}</code>
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        className="dsa-btn-secondary"
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          padding: "3px 8px",
          fontSize: "11px",
          zIndex: 10,
        }}
      >
        {copied ? "✓ Copied" : "Copy"}
      </button>
    </div>
  );
}

// Helper (harness) identifiers that are boilerplate, not the user's task.
const HELPER_FUNCS = new Set(["buildTree", "buildList", "toArray", "treeToArray", "toPairs"]);
const HELPER_CLASSES = new Set(["TreeNode", "ListNode", "Node", "LinkedList"]);

function extractFunctionName(starterCode) {
  if (!starterCode) return "";
  const matches = [...starterCode.matchAll(/function\s+([a-zA-Z0-9_$]+)\s*\(/g)];
  if (matches.length > 0) {
    for (let i = matches.length - 1; i >= 0; i--) {
      const name = matches[i][1];
      if (!HELPER_FUNCS.has(name)) return name;
    }
  }
  const classMatches = [...starterCode.matchAll(/class\s+([a-zA-Z0-9_$]+)/g)];
  if (classMatches.length > 0) {
    for (let i = classMatches.length - 1; i >= 0; i--) {
      const name = classMatches[i][1];
      if (!HELPER_CLASSES.has(name)) return name;
    }
  }
  return "";
}

// Split starter code into hidden harness boilerplate (node classes + builders)
// and the part the user actually works on. The split point is the FIRST
// function that is not a known helper — so problems where the user writes
// several functions (e.g. serialize + deserialize) keep all of them editable.
function splitBoilerplate(codeStr) {
  if (!codeStr) return { boilerplate: "", userCode: codeStr || "" };
  const decls = [...codeStr.matchAll(/(?:function|def)\s+([a-zA-Z0-9_$]+)\s*\(/g)];
  const first = decls.find((m) => !HELPER_FUNCS.has(m[1]));
  if (!first) return { boilerplate: "", userCode: codeStr };

  let splitIndex = first.index;
  const beforeFunc = codeStr.substring(0, splitIndex).trimEnd();
  if (beforeFunc.endsWith("*/")) {
    const jsdocStart = beforeFunc.lastIndexOf("/*");
    if (jsdocStart !== -1) splitIndex = jsdocStart;
  } else if (beforeFunc.endsWith('"""') || beforeFunc.endsWith("'''")) {
    const quote = beforeFunc.endsWith('"""') ? '"""' : "'''";
    const docstringStart = beforeFunc.substring(0, beforeFunc.length - 3).lastIndexOf(quote);
    if (docstringStart !== -1) splitIndex = docstringStart;
  }
  const boilerplate = codeStr.substring(0, splitIndex);
  const userCode = codeStr.substring(splitIndex);
  return { boilerplate, userCode };
}

function formatArg(v) {
  try { return JSON.stringify(v); } catch { return String(v); }
}

// ─── PROBLEM VIEW ───

export default function DSAProblemView({ problemId }) {
  const problem = useMemo(() => getProblemById(problemId), [problemId]);
  const [loading, setLoading] = useState(false); // SSR-safe: effects do not run on the server, so an initial `true` made the server-rendered HTML a skeleton with no crawlable content.

  const [code, setCode] = useState("");
  const [output, setOutput] = useState([]);
  const [testResults, setTestResults] = useState([]);
  const [verdict, setVerdict] = useState(null);
  const [failedCase, setFailedCase] = useState(null);
  const [runtimeMs, setRuntimeMs] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [monacoTheme, setMonacoTheme] = useState("dsa-dark");
  const [showSolution, setShowSolution] = useState(false);
  const [revealedHints, setRevealedHints] = useState([]);
  const [consoleHeight, setConsoleHeight] = useState(160);
  const [solved, setSolved] = useState(false);
  const [showBoiler, setShowBoiler] = useState(false);
  const [showSubs, setShowSubs] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [notes, setNotes] = useState("");
  const [fullscreen, setFullscreen] = useState(false);
  const [settings, setSettings] = useState(() =>
    typeof window === "undefined"
      ? { fontSize: 13, splitPct: 46 }
      : { fontSize: 13, splitPct: 46, ...readJSON(SETTINGS_KEY, {}) }
  );
  const [paletteOpen, setPaletteOpen] = useCommandPalette();
  const editorRef = useRef(null);
  const editorPanelRef = useRef(null);
  const detailPageRef = useRef(null);
  const codeVersionRef = useRef(0);
  const terminateRef = useRef(null);
  const workerRef = useRef(null);
  const workerTimeoutRef = useRef(null);
  const runIdRef = useRef(0);
  const draftTimerRef = useRef(null);
  const notesTimerRef = useRef(null);
  const runActionRef = useRef(null);
  const submitActionRef = useRef(null);

  const sampleTests = problem?.sampleTests || [];

  useEffect(() => {
    if (problem) {
      const drafts = readJSON(DRAFTS_KEY, {});
      const draft = drafts[problem.id];
      setCode(draft?.code || problem.starterCode);
      setOutput([]);
      setTestResults([]);
      setVerdict(null);
      setFailedCase(null);
      setRuntimeMs(null);
      setShowSolution(false);
      setShowBoiler(false);
      setShowSubs(false);
      setRevealedHints([]);
      setSolved(readSolved().includes(problem.id));
      setSubmissions(readJSON(SUBS_KEY, {})[problem.id] || []);
      setNotes(readJSON(NOTES_KEY, {})[problem.id] || "");
      codeVersionRef.current++;
    }
  }, [problemId, problem]);

  const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Persist editor settings
  useEffect(() => {
    writeJSON(SETTINGS_KEY, settings);
  }, [settings]);

  // Apply font size live
  useEffect(() => {
    if (editorRef.current) {
      try { editorRef.current.updateOptions({ fontSize: settings.fontSize }); } catch {}
    }
  }, [settings.fontSize]);

  // Esc exits fullscreen
  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e) => { if (e.key === "Escape") setFullscreen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fullscreen]);

  const handleEditorMount = useCallback((editor, monaco) => {
    editorRef.current = editor;
    defineDSAThemes(monaco);
    monaco.editor.setTheme(monacoTheme);

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      if (runActionRef.current) runActionRef.current();
    });
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.Enter, () => {
      if (submitActionRef.current) submitActionRef.current();
    });

    const remeasure = () => { try { editor.remeasureFonts(); } catch {} };
    setTimeout(remeasure, 50);
    setTimeout(remeasure, 500);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(remeasure);
    }
  }, [monacoTheme]);

  const functionName = useMemo(() => {
    return problem ? extractFunctionName(problem.starterCode) : "";
  }, [problem]);

  const initialBoilerplate = useMemo(() => {
    if (!problem) return "";
    return splitBoilerplate(problem.starterCode).boilerplate;
  }, [problem]);

  const { boilerplate, userCode } = useMemo(() => {
    if (initialBoilerplate && code && code.startsWith(initialBoilerplate)) {
      return {
        boilerplate: initialBoilerplate,
        userCode: code.substring(initialBoilerplate.length),
      };
    }
    return { boilerplate: "", userCode: code || "" };
  }, [code, initialBoilerplate]);

  const hasBoilerplate = boilerplate.trim().length > 0;
  const displayCode = hasBoilerplate ? userCode : code;
  const boilerLineCount = hasBoilerplate ? boilerplate.trimEnd().split("\n").length : 0;

  const similarProblems = useMemo(() => {
    if (!problem) return [];
    return DSA_PROBLEMS
      .filter(p => p.id !== problem.id)
      .map(p => ({ p, overlap: p.topics.filter(t => problem.topics.includes(t)).length }))
      .filter(x => x.overlap > 0)
      .sort((a, b) => b.overlap - a.overlap || a.p.number - b.p.number)
      .slice(0, 4)
      .map(x => x.p);
  }, [problem]);

  const saveDraft = useCallback((problemIdToSave, nextCode) => {
    if (draftTimerRef.current) clearTimeout(draftTimerRef.current);
    draftTimerRef.current = setTimeout(() => {
      const drafts = readJSON(DRAFTS_KEY, {});
      drafts[problemIdToSave] = { code: nextCode, ts: Date.now() };
      writeJSON(DRAFTS_KEY, drafts);
    }, 400);
  }, []);

  const clearDraft = useCallback((problemIdToClear) => {
    if (draftTimerRef.current) clearTimeout(draftTimerRef.current);
    const drafts = readJSON(DRAFTS_KEY, {});
    delete drafts[problemIdToClear];
    writeJSON(DRAFTS_KEY, drafts);
  }, []);

  const handleCodeChange = useCallback(
    (v) => {
      const next = hasBoilerplate ? boilerplate + (v || "") : (v || "");
      setCode(next);
      if (problem) saveDraft(problem.id, next);
    },
    [boilerplate, hasBoilerplate, problem, saveDraft]
  );

  const handleNotesChange = useCallback((e) => {
    const text = e.target.value;
    setNotes(text);
    if (notesTimerRef.current) clearTimeout(notesTimerRef.current);
    notesTimerRef.current = setTimeout(() => {
      const all = readJSON(NOTES_KEY, {});
      if (text.trim()) all[problemId] = text; else delete all[problemId];
      writeJSON(NOTES_KEY, all);
    }, 500);
  }, [problemId]);

  const handleConsoleDrag = useCallback(({ clientY }) => {
    if (!editorPanelRef.current) return;
    const rect = editorPanelRef.current.getBoundingClientRect();
    const maxH = rect.height * 0.6;
    const newHeight = Math.max(80, Math.min(maxH, rect.bottom - clientY));
    setConsoleHeight(newHeight);
  }, []);

  const handleSplitDrag = useCallback(({ clientX }) => {
    if (!detailPageRef.current) return;
    const rect = detailPageRef.current.getBoundingClientRect();
    const pct = Math.max(25, Math.min(70, ((clientX - rect.left) / rect.width) * 100));
    setSettings(s => ({ ...s, splitPct: Math.round(pct * 10) / 10 }));
  }, []);

  // Console-only run (printf debugging)
  const runInConsole = useCallback(() => {
    if (terminateRef.current) terminateRef.current();
    setIsRunning(true);
    setOutput([]);

    terminateRef.current = runCodeInSandbox(
      code,
      (type, content) => {
        const displayType = type === "result" ? "info" : type;
        const displayContent = type === "result" ? `→ ${content}` : content;
        setOutput(prev => [...prev, { type: displayType, content: displayContent }]);
      },
      () => {
        setIsRunning(false);
        terminateRef.current = null;
      }
    );
  }, [code]);

  const cleanupWorker = useCallback(() => {
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
    if (workerTimeoutRef.current) {
      clearTimeout(workerTimeoutRef.current);
      workerTimeoutRef.current = null;
    }
  }, []);

  // Clean up workers on unmount
  useEffect(() => {
    return () => {
      if (terminateRef.current) terminateRef.current();
      cleanupWorker();
      if (draftTimerRef.current) clearTimeout(draftTimerRef.current);
      if (notesTimerRef.current) clearTimeout(notesTimerRef.current);
    };
  }, [cleanupWorker]);

  // Execute the sample tests in the sandboxed judge worker. Resolves with
  // { verdict, results, failedCase, error } — never rejects. `onLog`, if
  // given, is called live with every console.log/warn/error the user's code
  // emits while the tests run — this is what makes print-debugging visible.
  const execWorker = useCallback((workerTests, onLog) => {
    return new Promise((resolve) => {
      cleanupWorker();
      const runId = ++runIdRef.current;

      let worker;
      try {
        worker = new Worker(new URL("../../workers/js-judge.worker.js", import.meta.url), { type: "module" });
      } catch {
        resolve(null); // worker unavailable — caller falls back to legacy checks
        return;
      }
      workerRef.current = worker;

      worker.onmessage = (event) => {
        if (event.data.runId !== runId) return;
        if (event.data.type === "log") {
          if (onLog) onLog(event.data.logType, event.data.content);
          return;
        }
        if (event.data.type === "done") {
          clearTimeout(workerTimeoutRef.current);
          workerRef.current = null;
          worker.terminate();
          resolve(event.data);
        }
      };

      worker.onerror = () => {
        clearTimeout(workerTimeoutRef.current);
        workerRef.current = null;
        worker.terminate();
        resolve({ verdict: "runtime_error", results: [], failedCase: null, error: { message: "Worker error", stack: "" } });
      };

      workerTimeoutRef.current = setTimeout(() => {
        if (runIdRef.current !== runId) return;
        worker.terminate();
        workerRef.current = null;
        resolve({ verdict: "time_limit_exceeded", results: [], failedCase: null, error: null });
      }, problem?.timeLimitMs || TIME_LIMIT_MS);

      worker.postMessage({
        runId,
        code,
        functionName,
        tests: workerTests,
        compareMode: problem?.compareMode || "exact",
      });
    });
  }, [cleanupWorker, code, functionName, problem]);

  // Legacy validate() suite — the source of truth for Accepted/solved.
  // Runs in a sandboxed worker (not the main thread) so a submitted infinite
  // loop can't freeze the tab; races against a timeout and hard-kills the
  // worker if it doesn't finish, same TLE pattern as execWorker below.
  const execLegacyWorker = useCallback((onLog) => {
    return new Promise((resolve) => {
      cleanupWorker();
      const runId = ++runIdRef.current;

      let worker;
      try {
        worker = new Worker(new URL("../../workers/dsa-legacy-judge.worker.js", import.meta.url), { type: "module" });
      } catch {
        resolve({ results: [], allPassed: false, syntaxError: null, timedOut: false, workerUnavailable: true });
        return;
      }
      workerRef.current = worker;

      worker.onmessage = (event) => {
        if (event.data.runId !== runId) return;
        if (event.data.type === "log") {
          if (onLog) onLog(event.data.logType, event.data.content);
          return;
        }
        if (event.data.type === "done") {
          clearTimeout(workerTimeoutRef.current);
          workerRef.current = null;
          worker.terminate();
          resolve({ ...event.data, timedOut: false });
        }
      };

      worker.onerror = () => {
        clearTimeout(workerTimeoutRef.current);
        workerRef.current = null;
        worker.terminate();
        resolve({ results: [], allPassed: false, syntaxError: "Worker error", timedOut: false });
      };

      workerTimeoutRef.current = setTimeout(() => {
        if (runIdRef.current !== runId) return;
        worker.terminate();
        workerRef.current = null;
        resolve({ results: [], allPassed: false, syntaxError: null, timedOut: true });
      }, problem?.timeLimitMs || TIME_LIMIT_MS);

      worker.postMessage({ runId, problemId: problem.id, code });
    });
  }, [cleanupWorker, code, problem]);

  // Run — executes visible sample tests in the judge worker (real execution).
  // Console Output shows whatever the user's own console.log/warn/error calls
  // print, live, as the code runs. Test Results (separate panel below) shows
  // the pass/fail checklist — the two panels are intentionally not duplicated.
  const handleRun = useCallback(async () => {
    if (!problem || isRunning || isSubmitting) return;

    if (sampleTests.length === 0) {
      runInConsole();
      return;
    }

    setIsRunning(true);
    setVerdict(null);
    setFailedCase(null);
    setRuntimeMs(null);
    setTestResults([]);
    setOutput([]);

    const workerTests = sampleTests.map(st => ({ args: st.input, expected: st.expected, hidden: false }));
    const data = await execWorker(workerTests, (logType, content) => {
      setOutput(prev => [...prev, { type: logType, content }]);
    });

    if (!data) {
      setIsRunning(false);
      runInConsole();
      return;
    }

    const rows = sampleTests.map((st, i) => {
      const r = (data.results || []).find(res => res.index === i);
      return {
        index: i,
        name: st.name || `Sample ${i + 1}`,
        passed: r?.status === "pass",
        error: r ? (r.status === "pass" ? null : r.status === "error" ? (data.error?.message || "Runtime error") : "Wrong answer") : "Not run",
        time: r ? r.runtimeMs.toFixed(1) : null,
      };
    });
    const runtime = (data.results || []).reduce((s, r) => s + (r.runtimeMs || 0), 0);

    setTestResults(rows);
    setVerdict(data.verdict === "accepted" ? null : data.verdict); // Run: only surface failures as verdict
    setFailedCase(data.failedCase);
    setRuntimeMs(runtime);

    if (data.error?.message) {
      setOutput(prev => [...prev, { type: "error", content: data.error.message }]);
    } else {
      setOutput(prev => prev.length === 0
        ? [{ type: "info", content: "No console output — add console.log(...) in your code to print values." }]
        : prev);
    }
    setIsRunning(false);
  }, [problem, isRunning, isSubmitting, sampleTests, execWorker, runInConsole]);

  // Submit — real-executes samples, then runs the full validation suite.
  const handleSubmit = useCallback(async () => {
    if (!problem || isRunning || isSubmitting) return;
    setIsSubmitting(true);
    setVerdict(null);
    setFailedCase(null);
    setRuntimeMs(null);
    setOutput([]);

    let workerData = null;
    if (sampleTests.length > 0) {
      const workerTests = sampleTests.map(st => ({ args: st.input, expected: st.expected, hidden: false }));
      workerData = await execWorker(workerTests, (logType, content) => {
        setOutput(prev => [...prev, { type: logType, content }]);
      });
    }
    const runtime = workerData ? (workerData.results || []).reduce((s, r) => s + (r.runtimeMs || 0), 0) : null;

    let finalVerdict;
    let legacy = null;

    if (workerData && workerData.verdict === "runtime_error") {
      finalVerdict = "runtime_error";
    } else if (workerData && workerData.verdict === "time_limit_exceeded") {
      finalVerdict = "time_limit_exceeded";
    } else if (workerData && workerData.verdict === "wrong_answer") {
      // Failing a REAL executed sample test is authoritative — don't let the
      // legacy validate() suite (which can be a source-text pattern check,
      // e.g. testContains("Map(")) override a genuine wrong answer.
      finalVerdict = "wrong_answer";
    } else {
      legacy = await execLegacyWorker((logType, content) => {
        setOutput(prev => [...prev, { type: logType, content }]);
      });
      if (legacy.timedOut) {
        finalVerdict = "time_limit_exceeded";
      } else if (legacy.workerUnavailable) {
        finalVerdict = "runtime_error";
      } else {
        finalVerdict = legacy.allPassed ? "accepted" : "wrong_answer";
      }
    }

    const rows = legacy ? legacy.results : [];
    setTestResults(rows);
    setVerdict(finalVerdict);
    setFailedCase(workerData?.failedCase || null);
    setRuntimeMs(runtime);

    // Verdict banner + Test Results panel already show the outcome —
    // console only needs genuinely new info: errors and the win message.
    const lines = [];
    if (workerData?.error?.message) lines.push({ type: "error", content: workerData.error.message });

    if (finalVerdict === "accepted") {
      const solvedIds = readSolved();
      if (!solvedIds.includes(problem.id)) {
        writeJSON(SOLVED_KEY, [...solvedIds, problem.id]);
      }
      setSolved(true);
      if (awardXP(`dsa:${problem.id}`, problem.xp || 20, `Solved ${problem.title}`)) {
        celebrate(DSA_CONFETTI);
      }
      lines.push({ type: "info", content: `🎉 Accepted — ${problem.title} solved!` });
    }
    setOutput(prev => [...prev, ...lines]);

    // Record submission
    const subs = readJSON(SUBS_KEY, {});
    const list = subs[problem.id] || [];
    list.unshift({ ts: Date.now(), verdict: finalVerdict, runtimeMs: runtime, code });
    subs[problem.id] = list.slice(0, MAX_SUBMISSIONS);
    writeJSON(SUBS_KEY, subs);
    setSubmissions(subs[problem.id]);

    setIsSubmitting(false);
  }, [problem, isRunning, isSubmitting, sampleTests, execWorker, execLegacyWorker, code]);

  runActionRef.current = handleRun;
  submitActionRef.current = handleSubmit;

  const handleReset = useCallback(() => {
    if (!problem) return;
    const split = splitBoilerplate(problem.starterCode);
    const hasB = split.boilerplate.trim().length > 0;
    const defaultDisplayCode = hasB ? split.userCode : problem.starterCode;
    if (editorRef.current) editorRef.current.setValue(defaultDisplayCode);
    setCode(problem.starterCode);
    clearDraft(problem.id);
    setOutput([]);
    setTestResults([]);
    setVerdict(null);
    setFailedCase(null);
    setRuntimeMs(null);
    codeVersionRef.current++;
  }, [problem, clearDraft]);

  const restoreSubmission = useCallback((sub) => {
    setCode(sub.code);
    const split = splitBoilerplate(problem.starterCode);
    const hasB = split.boilerplate.trim().length > 0 && sub.code.startsWith(split.boilerplate);
    if (editorRef.current) {
      editorRef.current.setValue(hasB ? sub.code.substring(split.boilerplate.length) : sub.code);
    }
    saveDraft(problem.id, sub.code);
    setShowSubs(false);
  }, [problem, saveDraft]);

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
  const verdictMeta = verdict ? VERDICT_META[verdict] : null;

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
            {solved && (
              <span style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: "0.68rem", fontWeight: 700,
                color: "#4ade80", border: "1px solid rgba(74,222,128,0.4)", borderRadius: 999,
                padding: "2px 9px", background: "rgba(74,222,128,0.1)", marginLeft: 8,
              }}>
                ✓ Solved
              </span>
            )}
          </div>
        </div>
        <div className="dsa-topbar-right">
          <LabXPBadge />
          <button className="dsa-btn-icon" onClick={() => setMonacoTheme(t => t === "dsa-dark" ? "dsa-light" : "dsa-dark")} title="Toggle editor theme">
            {monacoTheme === "dsa-dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>
          <ThemeToggle />
        </div>
      </div>

      <LabCommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        accent="#6366f1"
        placeholder="Type a command or jump to another problem…"
        commands={[
          { id: "run", section: "Actions", label: "Run sample tests", hint: "Ctrl+Enter", action: handleRun },
          { id: "submit", section: "Actions", label: "Submit solution", hint: "Ctrl+Shift+Enter", action: handleSubmit },
          { id: "console", section: "Actions", label: "Run in console (printf debugging)", action: runInConsole },
          { id: "reset", section: "Actions", label: "Reset to starter code", action: handleReset },
          { id: "solution", section: "Actions", label: showSolution ? "Hide solutions" : "View solutions", action: () => setShowSolution(s => !s) },
          { id: "fullscreen", section: "Actions", label: fullscreen ? "Exit fullscreen editor" : "Fullscreen editor", action: () => setFullscreen(f => !f) },
          { id: "random", section: "Actions", label: "Random problem", action: () => {
            const others = DSA_PROBLEMS.filter(p => p.id !== problem.id);
            const pick = others[Math.floor(Math.random() * others.length)];
            if (pick) window.location.href = `${base}dsa/problems/${pick.id}`;
          } },
          { id: "theme", section: "Actions", label: "Toggle editor theme", action: () => setMonacoTheme(t => t === "dsa-dark" ? "dsa-light" : "dsa-dark") },
          { id: "back", section: "Actions", label: "Back to all problems", action: () => { window.location.href = `${base}dsa/problems`; } },
          ...DSA_PROBLEMS.map(p => ({
            id: `prob-${p.id}`,
            section: "Problems",
            label: `${p.number}. ${p.title}`,
            hint: p.difficulty,
            done: readSolved().includes(p.id),
            action: () => { window.location.href = `${base}dsa/problems/${p.id}`; },
          })),
        ]}
      />

      {/* Main Layout */}
      <div className={`dsa-detail-page ${fullscreen ? "dsa-fullscreen" : ""}`} ref={detailPageRef}>
        {/* Content Panel */}
        <div
          className="dsa-detail-content"
          style={fullscreen ? undefined : { flex: "none", width: `${settings.splitPct}%` }}
        >
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
                      <CodeBlock code={problem.bruteForceSolution.code} />
                    </div>

                    {/* Optimized */}
                    <div className="dsa-solution-card">
                      <h4>Optimized Solution</h4>
                      <p>{problem.optimizedSolution.explanation}</p>
                      <div>
                        <span className="dsa-complexity-tag dsa-complexity-time">Time: {problem.optimizedSolution.timeComplexity}</span>
                        <span className="dsa-complexity-tag dsa-complexity-space">Space: {problem.optimizedSolution.spaceComplexity}</span>
                      </div>
                      <CodeBlock code={problem.optimizedSolution.code} />
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

              {/* Similar Problems */}
              {similarProblems.length > 0 && (
                <div className="dsa-section">
                  <h3 className="dsa-section-title">Similar Problems</h3>
                  <div className="dsa-similar-list">
                    {similarProblems.map(p => (
                      <a key={p.id} href={`${base}dsa/problems/${p.id}`} className="dsa-similar-card">
                        <span className="dsa-similar-num">{p.number}.</span>
                        <span className="dsa-similar-title">{p.title}</span>
                        <span className={`dsa-problem-diff ${p.difficulty.toLowerCase()}`}>{p.difficulty}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              <div className="dsa-section">
                <h3 className="dsa-section-title">📝 My Notes</h3>
                <textarea
                  className="dsa-notes-textarea"
                  placeholder="Jot down your approach, mistakes, or things to remember. Saved automatically."
                  value={notes}
                  onChange={handleNotesChange}
                  rows={5}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Split handle */}
        {!fullscreen && <ResizableHandle onDrag={handleSplitDrag} orientation="vertical" />}

        {/* Editor Panel */}
        <div className="dsa-editor-panel" ref={editorPanelRef}>
          {/* Editor Toolbar */}
          <div className="dsa-editor-toolbar">
            <button className="dsa-btn-run" onClick={handleRun} disabled={isRunning || isSubmitting} title="Run sample tests (Ctrl+Enter)">
              {isRunning ? (
                <><span className="dsa-spinner" /> Running</>
              ) : (
                <><FiPlay size={14} fill="currentColor" /> Run</>
              )}
            </button>
            <button className="dsa-btn-submit" onClick={handleSubmit} disabled={isRunning || isSubmitting} title="Submit (Ctrl+Shift+Enter)">
              {isSubmitting ? "Judging…" : "Submit"}
            </button>
            <button className="dsa-btn-secondary" onClick={handleReset} title="Reset to starter code">
              <FiRefreshCw size={14} />
              Reset
            </button>
            <button
              className={`dsa-btn-secondary ${showSubs ? "active" : ""}`}
              onClick={() => setShowSubs(s => !s)}
              title="Submission history"
            >
              <FiClock size={14} />
              {submissions.length > 0 ? ` ${submissions.length}` : ""}
            </button>

            <span className="dsa-editor-lang">JavaScript</span>

            <div className="dsa-toolbar-spacer" />

            <button className="dsa-btn-icon" onClick={() => setSettings(s => ({ ...s, fontSize: Math.max(11, s.fontSize - 1) }))} title="Decrease font size">
              <FiZoomOut size={14} />
            </button>
            <span className="dsa-font-size-label">{settings.fontSize}px</span>
            <button className="dsa-btn-icon" onClick={() => setSettings(s => ({ ...s, fontSize: Math.min(22, s.fontSize + 1) }))} title="Increase font size">
              <FiZoomIn size={14} />
            </button>
            <button className="dsa-btn-icon" onClick={() => setFullscreen(f => !f)} title={fullscreen ? "Exit fullscreen (Esc)" : "Fullscreen editor"}>
              {fullscreen ? <FiMinimize2 size={14} /> : <FiMaximize2 size={14} />}
            </button>
          </div>

          {/* Hidden boilerplate banner */}
          {hasBoilerplate && (
            <div className="dsa-boiler-banner">
              <button className="dsa-boiler-toggle" onClick={() => setShowBoiler(s => !s)}>
                <FiCode size={12} />
                {boilerLineCount} helper lines hidden (node classes &amp; builders — included automatically)
                <span>{showBoiler ? "▲ hide" : "▼ view"}</span>
              </button>
              {showBoiler && (
                <pre className="dsa-boiler-code"><code>{boilerplate.trimEnd()}</code></pre>
              )}
            </div>
          )}

          {/* Submission history */}
          {showSubs && (
            <div className="dsa-subs-panel">
              <div className="dsa-tests-header">
                <span>Submissions</span>
                <span style={{ textTransform: "none", fontWeight: 400 }}>{submissions.length ? `last ${submissions.length}` : ""}</span>
              </div>
              <div className="dsa-subs-body">
                {submissions.length === 0 ? (
                  <div className="dsa-subs-empty">No submissions yet — hit Submit to record one.</div>
                ) : (
                  submissions.map((sub, i) => {
                    const m = VERDICT_META[sub.verdict] || VERDICT_META.wrong_answer;
                    return (
                      <div key={i} className="dsa-sub-row">
                        <span className={`dsa-sub-verdict ${m.cls}`}>{m.icon} {m.label}</span>
                        <span className="dsa-sub-meta">
                          {new Date(sub.ts).toLocaleString()}
                          {sub.runtimeMs !== null && sub.runtimeMs !== undefined ? ` · ${sub.runtimeMs.toFixed(1)}ms` : ""}
                        </span>
                        <button className="dsa-btn-secondary" style={{ padding: "2px 8px", fontSize: "0.68rem" }} onClick={() => restoreSubmission(sub)}>
                          Restore
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* Editor */}
          <div className="dsa-editor-wrapper">
            <Editor
              key={`editor-${problemId}`}
              height="100%"
              language="javascript"
              theme={monacoTheme}
              value={displayCode}
              onChange={handleCodeChange}
              onMount={handleEditorMount}
              options={{
                fontSize: settings.fontSize,
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

          {/* Verdict banner */}
          {verdictMeta && (
            <div className={`dsa-verdict-banner ${verdictMeta.cls}`}>
              <span className="dsa-verdict-label">{verdictMeta.icon} {verdictMeta.label}</span>
              {runtimeMs !== null && <span className="dsa-verdict-runtime">{runtimeMs.toFixed(1)} ms</span>}
              {failedCase && (
                <div className="dsa-failed-case">
                  <div><strong>Input:</strong> <code>{(failedCase.input || []).map(formatArg).join(", ")}</code></div>
                  <div><strong>Expected:</strong> <code>{formatArg(failedCase.expected)}</code></div>
                  {failedCase.actual !== null && failedCase.actual !== undefined && (
                    <div><strong>Got:</strong> <code>{formatArg(failedCase.actual)}</code></div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Test Results */}
          {testResults.length > 0 && (
            <div className="dsa-tests-panel" style={{ flexShrink: 0, maxHeight: 100, overflow: "auto" }}>
              <div className="dsa-tests-header">
                <span title="Pass/fail checklist — one row per sample test">Test Results</span>
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
          <ResizableHandle onDrag={handleConsoleDrag} orientation="horizontal" />
          <div className="dsa-console-panel" style={{ height: consoleHeight, maxHeight: consoleHeight, minHeight: consoleHeight, flexShrink: 0 }}>
            <div className="dsa-console-header">
              <span title="Your console.log / console.warn / console.error output, printed live as your code runs">Console Output</span>
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
