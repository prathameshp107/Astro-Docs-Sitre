const VERDICT_META = {
  accepted: { label: "Accepted", cls: "jdg-verdict-ac" },
  wrong_answer: { label: "Wrong Answer", cls: "jdg-verdict-wa" },
  time_limit_exceeded: { label: "Time Limit Exceeded", cls: "jdg-verdict-tle" },
  runtime_error: { label: "Runtime Error", cls: "jdg-verdict-re" },
};

function fmt(v) {
  try {
    return JSON.stringify(v);
  } catch {
    return String(v);
  }
}

export default function ResultsPanel({ status, verdict, testCells, failedCase, error, runtimeMs }) {
  if (status === "running") {
    return (
      <div className="jdg-results-panel">
        <div className="jdg-results-running">
          <span className="jdg-spinner" /> Judging…
        </div>
      </div>
    );
  }

  if (!verdict) {
    return (
      <div className="jdg-results-panel">
        <div className="jdg-results-empty">Run your code against the visible examples, or Submit to judge against all test cases.</div>
      </div>
    );
  }

  const meta = VERDICT_META[verdict] || { label: verdict, cls: "" };
  const passCount = testCells.filter((c) => c === "pass").length;

  return (
    <div className="jdg-results-panel">
      <div className={`jdg-verdict-banner ${meta.cls}`}>
        <span className="jdg-verdict-label">{meta.label}</span>
        <span className="jdg-verdict-score">{passCount}/{testCells.length} passed</span>
        {typeof runtimeMs === "number" && <span className="jdg-verdict-runtime">{runtimeMs.toFixed(1)} ms</span>}
      </div>

      <div className="jdg-testcells">
        {testCells.map((cell, i) => (
          <span key={i} className={`jdg-testcell jdg-testcell-${cell}`}>
            {cell === "pass" ? "✓" : cell === "pending" ? "–" : "✗"}
          </span>
        ))}
      </div>

      {failedCase && (
        <div className="jdg-failed-case">
          <div className="jdg-failed-row"><span>Input</span><pre>{fmt(failedCase.input)}</pre></div>
          <div className="jdg-failed-row"><span>Expected</span><pre>{fmt(failedCase.expected)}</pre></div>
          {failedCase.actual !== null && (
            <div className="jdg-failed-row"><span>Actual</span><pre>{fmt(failedCase.actual)}</pre></div>
          )}
        </div>
      )}

      {error && (
        <pre className="jdg-error-stack">{error.message}{error.stack ? `\n${error.stack}` : ""}</pre>
      )}
    </div>
  );
}
