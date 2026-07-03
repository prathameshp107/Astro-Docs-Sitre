const DIFFICULTY_CLASS = { easy: "jdg-diff-easy", medium: "jdg-diff-medium", hard: "jdg-diff-hard" };

function renderMarkdownish(text) {
  return text.split("\n").map((line, i) => {
    if (line.trim() === "") return <br key={i} />;
    return <p key={i}>{line}</p>;
  });
}

export default function ProblemStatement({ problem, unlocked, onReveal }) {
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
