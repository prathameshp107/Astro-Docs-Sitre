import { FiCheckSquare, FiRefreshCw } from "react-icons/fi";

export default function LabTestsPanel({ currentTests, testResults, onRunTests, testResultArray }) {
  const results = testResultArray || testResults;
  const allPassed = results.length > 0 && results.every(r => r.passed);

  return (
    <div className="jsl-tests-header">
      <span className="jsl-tests-title">
        <FiCheckSquare size={14} />
        Automated Tests
      </span>
      <div className="jsl-tests-actions">
        {results.length > 0 && (
          <span className={`jsl-tests-score ${allPassed ? "all-pass" : ""}`}>
            {results.filter(r => r.passed).length}/{currentTests.length} Passed
          </span>
        )}
        <button className="jsl-btn-secondary jsl-btn-sm" onClick={onRunTests}>
          <FiRefreshCw size={12} />
          Run Tests
        </button>
      </div>
    </div>
  );
}

export function LabTestsBody({ currentTests, testResults }) {
  if (currentTests.length === 0) {
    return <div className="jsl-tests-empty">No automated tests for this section</div>;
  }

  const STATUS_CONFIGS = {
    "Running": { icon: "⏱️", label: "Running", className: "pending" },
    "Accepted": { icon: "✅", label: "Accepted", className: "pass" },
    "Wrong Answer": { icon: "❌", label: "Wrong Answer", className: "fail" },
    "Runtime Error": { icon: "⚠️", label: "Runtime Error", className: "fail" },
    "Syntax Error": { icon: "⚠️", label: "Syntax Error", className: "fail" },
    "Compilation Error": { icon: "⚠️", label: "Compilation Error", className: "fail" },
    "Time Limit": { icon: "⏱️", label: "Time Limit", className: "fail" }
  };

  return currentTests.map((test, i) => {
    const result = testResults.find(r => r.index === i);
    const passed = result?.passed;
    const hasResult = result !== undefined;
    const status = result?.status || (hasResult ? (passed ? "Accepted" : "Wrong Answer") : "Pending");
    const config = STATUS_CONFIGS[status] || { icon: "○", label: "Pending", className: "pending" };

    return (
      <div key={i} className={`jsl-test-item ${config.className}`} style={{ padding: "10px 14px" }}>
        <div style={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span className="jsl-test-icon">{config.icon}</span>
            <span className="jsl-test-name">{test.name}</span>
          </div>
          {hasResult && (
            <span className={`jsl-test-status-badge ${config.className}`} style={{
              fontSize: "0.7rem",
              fontWeight: "700",
              padding: "2px 6px",
              borderRadius: "4px",
              background: passed ? "rgba(34, 197, 94, 0.15)" : "rgba(239, 68, 68, 0.15)",
              color: passed ? "#22c55e" : "#ef4444",
              border: passed ? "1px solid rgba(34, 197, 94, 0.25)" : "1px solid rgba(239, 68, 68, 0.25)",
              textTransform: "uppercase",
              letterSpacing: "0.025em"
            }}>
              {config.label}
            </span>
          )}
        </div>
        {hasResult && !passed && result?.error && (
          <span className="jsl-test-error">{result.error}</span>
        )}
      </div>
    );
  });
}
