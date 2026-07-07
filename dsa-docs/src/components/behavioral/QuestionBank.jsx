import { useState, useMemo } from "react";
import questionsData from "../../data/behavioral/questions.json";
import categoriesData from "../../data/behavioral/categories.json";

const COMPANY_LABELS = {
  generic: "Generic",
  amazon: "Amazon (LP)",
  google: "Google",
  meta: "Meta",
};

const LEVEL_LABELS = {
  junior: "Junior",
  mid: "Mid",
  senior: "Senior",
};

function QuestionCard({ q, category, expanded, onToggle }) {
  return (
    <div className={`bhv-q-card ${expanded ? "expanded" : ""}`}>
      <button className="bhv-q-header" onClick={onToggle}>
        <div className="bhv-q-header-main">
          <span className="bhv-q-text">{q.question}</span>
          <div className="bhv-q-badges">
            <span className={`bhv-badge bhv-badge-cat`}>{category?.label || q.category}</span>
            <span className={`bhv-badge bhv-badge-company-${q.companyStyle}`}>
              {COMPANY_LABELS[q.companyStyle] || q.companyStyle}
            </span>
            {q.principle && <span className="bhv-badge bhv-badge-principle">{q.principle}</span>}
          </div>
        </div>
        <span className="bhv-q-chevron">{expanded ? "−" : "+"}</span>
      </button>

      {expanded && (
        <div className="bhv-q-body">
          <p className="bhv-q-whattheywant">
            <strong>What they're really asking:</strong> {q.whatTheyWant}
          </p>

          <div className="bhv-q-levels">
            {q.levels.map((lvl) => (
              <span key={lvl} className={`bhv-level-tag bhv-level-${lvl}`}>
                {LEVEL_LABELS[lvl] || lvl}
              </span>
            ))}
          </div>

          {q.seniorNote && (
            <p className="bhv-q-senior-note">
              <strong>What a senior answer adds:</strong> {q.seniorNote}
            </p>
          )}

          <div className="bhv-q-columns">
            <div className="bhv-q-col">
              <h4>Rubric — a strong answer</h4>
              <ul className="bhv-rubric-list">
                {q.rubric.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
            <div className="bhv-q-col">
              <h4>Common failure modes</h4>
              <ul className="bhv-failure-list">
                {q.failureModes.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bhv-q-samples">
            <div className="bhv-sample bhv-sample-good">
              <span className="bhv-sample-label">✓ Strong answer</span>
              <p>{q.sampleAnswers.strong}</p>
            </div>
            <div className="bhv-sample bhv-sample-weak">
              <span className="bhv-sample-label">✗ Weak answer</span>
              <p>{q.sampleAnswers.weak}</p>
              <p className="bhv-sample-why">Why it's weak: {q.sampleAnswers.weakWhy}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function QuestionBank() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeCompany, setActiveCompany] = useState("all");
  const [activeLevel, setActiveLevel] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const categories = categoriesData.categories;
  const questions = questionsData.questions;
  const categoryById = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.id, c])),
    [categories]
  );

  const categoryCounts = useMemo(() => {
    const counts = {};
    questions.forEach((q) => {
      counts[q.category] = (counts[q.category] || 0) + 1;
    });
    return counts;
  }, [questions]);

  const filtered = useMemo(() => {
    let list = questions;

    if (activeCategory !== "all") {
      list = list.filter((q) => q.category === activeCategory);
    }
    if (activeCompany !== "all") {
      list = list.filter((q) => q.companyStyle === activeCompany);
    }
    if (activeLevel !== "all") {
      list = list.filter((q) => q.levels.includes(activeLevel));
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      list = list.filter(
        (q) =>
          q.question.toLowerCase().includes(query) ||
          q.category.toLowerCase().includes(query) ||
          (q.principle && q.principle.toLowerCase().includes(query))
      );
    }
    return list;
  }, [questions, activeCategory, activeCompany, activeLevel, searchQuery]);

  return (
    <div className="bhv-question-bank">
      <div className="bhv-toolbar">
        <div className="bhv-search-box">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search questions, category, principle..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="bhv-filter-group">
          <span className="bhv-filter-group-label">Company:</span>
          {["all", "generic", "amazon", "google", "meta"].map((c) => (
            <button
              key={c}
              className={`bhv-filter-btn ${activeCompany === c ? "active" : ""}`}
              onClick={() => setActiveCompany(c)}
            >
              {c === "all" ? "All" : COMPANY_LABELS[c]}
            </button>
          ))}
        </div>

        <div className="bhv-filter-group">
          <span className="bhv-filter-group-label">Level:</span>
          {["all", "junior", "mid", "senior"].map((l) => (
            <button
              key={l}
              className={`bhv-filter-btn ${activeLevel === l ? "active" : ""}`}
              onClick={() => setActiveLevel(l)}
            >
              {l === "all" ? "All" : LEVEL_LABELS[l]}
            </button>
          ))}
        </div>
      </div>

      <div className="bhv-bank-layout">
        <div className="bhv-category-sidebar">
          <button
            className={`bhv-category-item ${activeCategory === "all" ? "active" : ""}`}
            onClick={() => setActiveCategory("all")}
          >
            <span>All Questions</span>
            <span className="bhv-category-count">{questions.length}</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`bhv-category-item ${activeCategory === cat.id ? "active" : ""}`}
              onClick={() => setActiveCategory(cat.id)}
              title={cat.description}
            >
              <span>{cat.label}</span>
              <span className="bhv-category-count">{categoryCounts[cat.id] || 0}</span>
            </button>
          ))}
        </div>

        <div className="bhv-question-list">
          {filtered.length === 0 ? (
            <div className="bhv-empty">
              <h3>No questions match your filters</h3>
              <p>Try clearing the search or switching category/company/level filters.</p>
            </div>
          ) : (
            filtered.map((q) => (
              <QuestionCard
                key={q.id}
                q={q}
                category={categoryById[q.category]}
                expanded={expandedId === q.id}
                onToggle={() => setExpandedId(expandedId === q.id ? null : q.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
