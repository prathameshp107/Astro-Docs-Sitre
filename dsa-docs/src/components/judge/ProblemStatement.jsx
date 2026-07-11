import { useState, useMemo } from "react";
import { getJudgeProblemById } from "../../data/judge/index.js";

const DIFFICULTY_CLASS = { easy: "jdg-diff-easy", medium: "jdg-diff-medium", hard: "jdg-diff-hard" };

function extractFunctionName(starterCode) {
  if (!starterCode) return "";
  const matches = [...starterCode.matchAll(/function\s+([a-zA-Z0-9_$]+)\s*\(/g)];
  if (matches.length > 0) {
    for (let i = matches.length - 1; i >= 0; i--) {
      const name = matches[i][1];
      if (name !== "buildTree" && name !== "buildList" && name !== "toArray" && name !== "treeToArray" && name !== "toPairs") {
        return name;
      }
    }
  }
  const classMatches = [...starterCode.matchAll(/class\s+([a-zA-Z0-9_$]+)/g)];
  if (classMatches.length > 0) {
    for (let i = classMatches.length - 1; i >= 0; i--) {
      const name = classMatches[i][1];
      if (name !== "TreeNode" && name !== "ListNode" && name !== "Node" && name !== "LinkedList") {
        return name;
      }
    }
  }
  return "";
}

function splitBoilerplate(codeStr, functionName) {
  if (!codeStr || !functionName) {
    return { boilerplate: "", userCode: codeStr || "" };
  }
  const funcPattern = new RegExp(`(?:function|const|let|var|def)\\s+${functionName}\\b`);
  const match = codeStr.match(funcPattern);
  if (!match) {
    return { boilerplate: "", userCode: codeStr };
  }
  let splitIndex = match.index;
  const beforeFunc = codeStr.substring(0, splitIndex).trimEnd();
  if (beforeFunc.endsWith("*/")) {
    const jsdocStart = beforeFunc.lastIndexOf("/*");
    if (jsdocStart !== -1) {
      splitIndex = jsdocStart;
    }
  } else if (beforeFunc.endsWith('"""') || beforeFunc.endsWith("'''")) {
    const quote = beforeFunc.endsWith('"""') ? '"""' : "'''";
    const docstringStart = beforeFunc.substring(0, beforeFunc.length - 3).lastIndexOf(quote);
    if (docstringStart !== -1) {
      splitIndex = docstringStart;
    }
  }
  const boilerplate = codeStr.substring(0, splitIndex);
  const userCode = codeStr.substring(splitIndex);
  return { boilerplate, userCode };
}

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const functionName = useMemo(() => {
    return extractFunctionName(code);
  }, [code]);

  const { boilerplate, userCode } = useMemo(() => {
    return splitBoilerplate(code, functionName);
  }, [code, functionName]);

  const hasBoilerplate = boilerplate.trim().length > 0;
  const displayCode = hasBoilerplate ? userCode : code;

  return (
    <div style={{ position: "relative" }}>
      <pre className="jdg-example-block" style={{ marginTop: "8px", paddingRight: "70px" }}>
        <code>{displayCode}</code>
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        className="jdg-btn-ghost-sm"
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          padding: "3px 8px",
          fontSize: "11px",
          background: "var(--surface)",
          zIndex: 10,
        }}
      >
        {copied ? "✓ Copied" : "Copy"}
      </button>
    </div>
  );
}

function renderMarkdownish(text) {
  return text.split("\n").map((line, i) => {
    if (line.trim() === "") return <br key={i} />;
    return <p key={i}>{line}</p>;
  });
}

export default function ProblemStatement({ problem, unlocked, onReveal }) {
  const [revealedHints, setRevealedHints] = useState([]);
  const [showSolution, setShowSolution] = useState(false);
  const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");

  const relatedProblems = useMemo(() => {
    return (problem.relatedProblems || [])
      .map((id) => getJudgeProblemById(id))
      .filter(Boolean);
  }, [problem]);

  const toggleHint = (idx) => {
    setRevealedHints((prev) =>
      prev.includes(idx) ? prev.filter((x) => x !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="jdg-statement-panel">
      <div className="jdg-header">
        <span className={`jdg-diff-badge ${DIFFICULTY_CLASS[problem.difficulty] || ""}`}>
          {problem.difficulty}
        </span>
        <h1 className="jdg-title">{problem.title}</h1>
        <div className="jdg-topics">
          {problem.topics.map((t) => (
            <span key={t} className="jdg-topic-tag">{t}</span>
          ))}
        </div>
        {problem.companies?.length > 0 && (
          <div className="jdg-companies">
            {problem.companies.map((c) => (
              <span key={c} className="jdg-company-tag">{c}</span>
            ))}
          </div>
        )}
      </div>

      <section className="jdg-section">
        <div className="jdg-prose">{renderMarkdownish(problem.statement)}</div>
      </section>

      <section className="jdg-section">
        <h3 className="jdg-section-title">Examples</h3>
        {problem.examples.map((ex, i) => (
          <div key={i} className="jdg-example">
            <div className="jdg-example-label">Example {i + 1}</div>
            <pre className="jdg-example-block">
              <code>
                <strong>Input: </strong>{ex.input}{"\n"}
                <strong>Output: </strong>{ex.output}
                {ex.explanation ? `\n${ex.explanation}` : ""}
              </code>
            </pre>
          </div>
        ))}
      </section>

      <section className="jdg-section">
        <h3 className="jdg-section-title">Constraints</h3>
        <ul className="jdg-constraints">
          {problem.constraints.map((c, i) => (
            <li key={i}><code>{c}</code></li>
          ))}
        </ul>
      </section>

      {problem.hints && problem.hints.length > 0 && (
        <section className="jdg-section">
          <h3 className="jdg-section-title">Hints</h3>
          <div className="jdg-hints">
            {problem.hints.map((hint, i) => (
              <div key={i}>
                <button
                  type="button"
                  className={`jdg-hint-btn ${revealedHints.includes(i) ? "revealed" : ""}`}
                  onClick={() => toggleHint(i)}
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
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
                  <div className="jdg-hint-text" style={{ marginTop: "6px" }}>{hint}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {(problem.bruteForceSolution || problem.optimizedSolution) && (
        <section className="jdg-section">
          <h3 className="jdg-section-title">Solutions</h3>
          <button
            type="button"
            className="jdg-solution-toggle"
            onClick={() => setShowSolution(!showSolution)}
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 11 12 14 22 4" />
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
            </svg>
            {showSolution ? "Hide Solutions" : "View Solutions"}
          </button>

          {showSolution && (
            <div className="jdg-solutions" style={{ marginTop: "12px" }}>
              {problem.bruteForceSolution && (
                <div className="jdg-solution-card" style={{ marginBottom: "12px" }}>
                  <h4>Brute Force</h4>
                  <p>{problem.bruteForceSolution.explanation}</p>
                  <div className="jdg-complexity-tags">
                    <span className="jdg-complexity-tag jdg-complexity-tag-time">Time: {problem.bruteForceSolution.timeComplexity}</span>
                    <span className="jdg-complexity-tag jdg-complexity-tag-space">Space: {problem.bruteForceSolution.spaceComplexity}</span>
                  </div>
                  <CodeBlock code={problem.bruteForceSolution.code} />
                </div>
              )}

              {problem.optimizedSolution && (
                <div className="jdg-solution-card">
                  <h4>Optimized Solution</h4>
                  <p>{problem.optimizedSolution.explanation}</p>
                  <div className="jdg-complexity-tags">
                    <span className="jdg-complexity-tag jdg-complexity-tag-time">Time: {problem.optimizedSolution.timeComplexity}</span>
                    <span className="jdg-complexity-tag jdg-complexity-tag-space">Space: {problem.optimizedSolution.spaceComplexity}</span>
                  </div>
                  <CodeBlock code={problem.optimizedSolution.code} />
                </div>
              )}

              {problem.interviewExplanation && (
                <div className="jdg-solution-card" style={{ marginTop: "12px", borderLeft: "3px solid var(--accent)", background: "var(--accent-tint)" }}>
                  <h4>🎙️ Interview Explanation</h4>
                  <p>{problem.interviewExplanation}</p>
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {relatedProblems.length > 0 && (
        <section className="jdg-section">
          <h3 className="jdg-section-title">Related Problems</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {relatedProblems.map((rp) => (
              <a
                key={rp.id}
                href={`${base}problems/${rp.id}`}
                className="jdg-list-card"
                style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", textDecoration: "none" }}
              >
                <span style={{ fontWeight: 600, marginRight: "auto" }}>{rp.title}</span>
                <span className={`jdg-diff-badge ${DIFFICULTY_CLASS[rp.difficulty] || ""}`}>{rp.difficulty}</span>
              </a>
            ))}
          </div>
        </section>
      )}

      <section className="jdg-section">
        <h3 className="jdg-section-title">Editorial</h3>
        {unlocked ? (
          <div className="jdg-editorial">
            <div className="jdg-prose">{renderMarkdownish(problem.editorial.approach)}</div>
            <div className="jdg-complexity-tag">{problem.editorial.complexity}</div>
          </div>
        ) : (
          <div className="jdg-editorial-locked">
            <p>Solve the problem to unlock the editorial.</p>
            <button type="button" className="jdg-btn-ghost" onClick={onReveal}>
              I give up — show editorial
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

