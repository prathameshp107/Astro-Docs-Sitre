import { useCallback, useEffect, useRef, useState } from "react";
import { getJudgeProblemById } from "../../data/judge/index.js";
import { useJudgeStore } from "../../store/judgeStore.js";
import JudgeEditor from "./JudgeEditor.jsx";
import ProblemStatement from "./ProblemStatement.jsx";
import ResultsPanel from "./ResultsPanel.jsx";
import SubmissionHistory from "./SubmissionHistory.jsx";

export default function JudgeView({ problemId }) {
  const problem = getJudgeProblemById(problemId);

  const solved = useJudgeStore((s) => s.solved[problemId]);
  const getDraft = useJudgeStore((s) => s.getDraft);
  const setDraft = useJudgeStore((s) => s.setDraft);
  const recordSubmission = useJudgeStore((s) => s.recordSubmission);

  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("idle"); // idle | running | submitting
  const [verdict, setVerdict] = useState(null);
  const [testCells, setTestCells] = useState([]);
  const [failedCase, setFailedCase] = useState(null);
  const [error, setError] = useState(null);
  const [totalRuntimeMs, setTotalRuntimeMs] = useState(null);
  const [editorialUnlocked, setEditorialUnlocked] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const workerRef = useRef(null);
  const timeoutRef = useRef(null);
  const runIdRef = useRef(0);
  const saveTimerRef = useRef(null);

  // Reset when problem or language changes
  useEffect(() => {
    if (!problem) return;
    const starter = problem.starterCode?.[language] || problem.starterCode?.javascript || "";
    setCode(getDraft(problem.id, language, starter));
    setVerdict(null);
    setTestCells([]);
    setFailedCase(null);
    setError(null);
    setTotalRuntimeMs(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problemId, language]);

  useEffect(() => {
    if (solved === "accepted") setEditorialUnlocked(true);
  }, [solved]);

  useEffect(() => {
    return () => {
      if (workerRef.current) workerRef.current.terminate();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, []);

  const handleCodeChange = useCallback(
    (next) => {
      setCode(next);
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(() => {
        setDraft(problem.id, language, next);
      }, 400);
    },
    [problem, language, setDraft]
  );

  const handleLanguageChange = useCallback(
    (lang) => {
      if (lang === language) return;
      // Save current draft before switching
      setDraft(problem.id, language, code);
      setLanguage(lang);
      setVerdict(null);
      setTestCells([]);
      setFailedCase(null);
      setError(null);
    },
    [problem, language, code, setDraft]
  );

  const handleRestore = useCallback(
    (codeToRestore) => {
      setCode(codeToRestore);
      setShowHistory(false);
    },
    []
  );

  const cleanupRun = () => {
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const execute = useCallback(
    (tests, isSubmit) => {
      cleanupRun();
      const runId = ++runIdRef.current;
      const cells = new Array(tests.length).fill("pending");

      setStatus(isSubmit ? "submitting" : "running");
      setVerdict(null);
      setFailedCase(null);
      setError(null);
      setTestCells(cells);
      setTotalRuntimeMs(null);

      // Dynamically import the correct worker based on language
      const WorkerClass =
        language === "python"
          ? () => new Worker(new URL("../../workers/py-judge.worker.js", import.meta.url), { type: "module" })
          : () => new Worker(new URL("../../workers/js-judge.worker.js", import.meta.url), { type: "module" });

      const worker = WorkerClass();
      workerRef.current = worker;

      worker.onmessage = (event) => {
        if (event.data.runId !== runId) return;

        if (event.data.type === "progress") {
          cells[event.data.index] = event.data.status;
          setTestCells([...cells]);
          return;
        }

        if (event.data.type === "done") {
          clearTimeout(timeoutRef.current);
          finalize(event.data, tests, isSubmit);
        }
      };

      worker.onerror = (err) => {
        clearTimeout(timeoutRef.current);
        finalize(
          { verdict: "runtime_error", results: [], failedCase: null, error: { message: err.message, stack: "" } },
          tests,
          isSubmit
        );
      };

      timeoutRef.current = setTimeout(() => {
        if (runIdRef.current !== runId) return;
        worker.terminate();
        finalize(
          { verdict: "time_limit_exceeded", results: [], failedCase: null, error: null },
          tests,
          isSubmit
        );
      }, problem.timeLimitMs || 4000);

      worker.postMessage({
        runId,
        code,
        functionName: problem.functionName,
        tests,
        compareMode: problem.compareMode || "exact",
      });

      function finalize(data, testsRun, submit) {
        workerRef.current = null;
        const finalCells = testsRun.map((_, i) => {
          const r = data.results?.find((res) => res.index === i);
          return r ? r.status : "pending";
        });
        const runtime = (data.results || []).reduce((sum, r) => sum + (r.runtimeMs || 0), 0);

        setStatus("idle");
        setVerdict(data.verdict);
        setTestCells(finalCells);
        setFailedCase(data.failedCase);
        setError(data.error);
        setTotalRuntimeMs(runtime);

        if (submit) {
          recordSubmission(problem.id, {
            ts: Date.now(),
            lang: language,
            code,
            verdict: data.verdict,
            runtimeMs: runtime,
            failedCase: data.failedCase,
          });
        }
      }
    },
    [code, language, problem, recordSubmission]
  );

  const handleRun = useCallback(() => {
    if (!problem) return;
    execute(problem.tests.filter((t) => !t.hidden), false);
  }, [problem, execute]);

  const handleSubmit = useCallback(() => {
    if (!problem) return;
    execute(problem.tests, true);
  }, [problem, execute]);

  const handleReset = useCallback(() => {
    if (!problem) return;
    const starter = problem.starterCode?.[language] || problem.starterCode?.javascript || "";
    setCode(starter);
    setDraft(problem.id, language, starter);
    setVerdict(null);
    setTestCells([]);
    setFailedCase(null);
    setError(null);
  }, [problem, language, setDraft]);

  if (!problem) {
    return (
      <div className="jdg-not-found">
        <h2>Problem not found</h2>
        <a href="../" className="jdg-btn-secondary">← Back to Problems</a>
      </div>
    );
  }

  return (
    <div className="jdg-layout">
      <ProblemStatement
        problem={problem}
        unlocked={editorialUnlocked}
        onReveal={() => setEditorialUnlocked(true)}
      />
      <div className="jdg-work-panel">
        <JudgeEditor
          code={code}
          onChange={handleCodeChange}
          onRun={handleRun}
          onSubmit={handleSubmit}
          onReset={handleReset}
          onLanguageChange={handleLanguageChange}
          isRunning={status === "running"}
          isSubmitting={status === "submitting"}
          language={language}
        />
        <ResultsPanel
          status={status}
          verdict={verdict}
          testCells={testCells}
          failedCase={failedCase}
          error={error}
          runtimeMs={totalRuntimeMs}
        />
        <div className="jdg-history-toggle">
          <button
            type="button"
            className="jdg-btn-ghost"
            onClick={() => setShowHistory((s) => !s)}
          >
            {showHistory ? "▼ Hide Submission History" : "▶ Show Submission History"}
          </button>
        </div>
        {showHistory && (
          <SubmissionHistory problemId={problem.id} onRestore={handleRestore} />
        )}
      </div>
    </div>
  );
}
