import { useState, useMemo } from "react";
import { SNIPPET_QUESTIONS } from "../../data/questions.js";

const TOPICS = [...new Set(SNIPPET_QUESTIONS.map((q) => q.topic))];
const DIFFICULTIES = ["Easy", "Medium", "Hard"];

export default function SnippetQuestions({ onSelectCode }) {
  const [topic, setTopic] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completed, setCompleted] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem("prac-completed") || "[]"); }
    catch { return []; }
  });

  const filtered = useMemo(() => {
    return SNIPPET_QUESTIONS.filter((q) => {
      if (topic !== "all" && q.topic !== topic) return false;
      if (difficulty !== "all" && q.difficulty !== difficulty) return false;
      if (search && !q.title.toLowerCase().includes(search.toLowerCase()) && !q.tags.some((t) => t.includes(search.toLowerCase())))
        return false;
      return true;
    });
  }, [topic, difficulty, search]);

  const handleSelect = (q) => {
    setSelected(q);
    setShowAnswer(false);
    if (onSelectCode) onSelectCode(q.code);
  };

  const toggleComplete = (id) => {
    const next = completed.includes(id) ? completed.filter((c) => c !== id) : [...completed, id];
    setCompleted(next);
    sessionStorage.setItem("prac-completed", JSON.stringify(next));
  };

  const diffColor = (d) =>
    d === "Easy" ? "#22c55e" : d === "Medium" ? "#f59e0b" : "#ef4444";

  return (
    <div className="prac-snippets">
      {/* Filters */}
      <div className="prac-filters">
        <div className="prac-search-box">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" placeholder="Search questions..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select value={topic} onChange={(e) => setTopic(e.target.value)}>
          <option value="all">All Topics</option>
          {TOPICS.map((t) => (<option key={t} value={t}>{t}</option>))}
        </select>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="all">All Levels</option>
          {DIFFICULTIES.map((d) => (<option key={d} value={d}>{d}</option>))}
        </select>
        <span className="prac-result-count">{filtered.length} questions</span>
      </div>

      {selected ? (
        /* Question detail */
        <div className="prac-question-detail">
          <button className="prac-back-btn" onClick={() => setSelected(null)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Back
          </button>
          <div className="prac-q-header">
            <div className="prac-q-meta">
              <span className="prac-diff-badge" style={{ background: `${diffColor(selected.difficulty)}22`, color: diffColor(selected.difficulty), border: `1px solid ${diffColor(selected.difficulty)}44` }}>
                {selected.difficulty}
              </span>
              <span className="prac-topic-badge">{selected.topic}</span>
              {completed.includes(selected.id) && <span className="prac-done-badge">✓ Solved</span>}
            </div>
            <button className={`prac-complete-btn ${completed.includes(selected.id) ? "done" : ""}`} onClick={() => toggleComplete(selected.id)}>
              {completed.includes(selected.id) ? "✓ Completed" : "Mark Complete"}
            </button>
          </div>
          <h3 className="prac-q-title">{selected.title}</h3>
          <p className="prac-q-desc">Predict the output of the following JavaScript code:</p>
          <pre className="prac-code-block"><code>{selected.code}</code></pre>
          <div className="prac-q-tags">{selected.tags.map((t) => <span key={t} className="prac-tag">{t}</span>)}</div>
          <button className="prac-reveal-btn" onClick={() => setShowAnswer(!showAnswer)}>
            {showAnswer ? "Hide Answer" : "▶ Reveal Answer"}
          </button>
          {showAnswer && (
            <div className="prac-answer">
              <div className="prac-answer-section">
                <h4>Expected Output</h4>
                <pre className="prac-output-block">{selected.expectedOutput}</pre>
              </div>
              <div className="prac-answer-section">
                <h4>Explanation</h4>
                <p>{selected.explanation}</p>
              </div>
            </div>
          )}
          <button className="prac-try-btn" onClick={() => { if (onSelectCode) onSelectCode(selected.code); }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Try in Playground
          </button>
        </div>
      ) : (
        /* Question list */
        <div className="prac-question-list">
          {filtered.map((q) => (
            <div key={q.id} className={`prac-q-card ${completed.includes(q.id) ? "done" : ""}`} onClick={() => handleSelect(q)}>
              <div className="prac-q-card-top">
                <span className="prac-q-card-title">{q.title}</span>
                {completed.includes(q.id) && <span className="prac-check">✓</span>}
              </div>
              <div className="prac-q-card-meta">
                <span className="prac-diff-badge-sm" style={{ color: diffColor(q.difficulty) }}>{q.difficulty}</span>
                <span className="prac-topic-sm">{q.topic}</span>
              </div>
              <div className="prac-q-card-tags">
                {q.tags.slice(0, 3).map((t) => <span key={t} className="prac-tag-sm">{t}</span>)}
              </div>
            </div>
          ))}
          {filtered.length === 0 && <div className="prac-empty">No questions match your filters</div>}
        </div>
      )}
    </div>
  );
}
