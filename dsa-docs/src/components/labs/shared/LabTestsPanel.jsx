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

  return currentTests.map((test, i) => {
    const result = testResults.find(r => r.index === i);
    const passed = result?.passed;
    const hasResult = result !== undefined;
    return (
      <div key={i} className={`jsl-test-item ${hasResult ? (passed ? "pass" : "fail") : "pending"}`}>
        <span className="jsl-test-icon">
          {hasResult ? (passed ? "✓" : "✗") : "○"}
        </span>
        <span className="jsl-test-name">{test.name}</span>
        {hasResult && !passed && result?.error && (
          <span className="jsl-test-error">{result.error}</span>
        )}
      </div>
    );
  });
}
