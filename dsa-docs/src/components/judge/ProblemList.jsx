import { useState, useMemo } from "react";
import { useJudgeStore } from "../../store/judgeStore.js";

const STATUS_ICON = { accepted: "✅", attempted: "🟡" };

const DIFFICULTIES = ["easy", "medium", "hard"];

function extractAllTopics(problems) {
  const set = new Set();
  problems.forEach((p) => p.topics?.forEach((t) => set.add(t)));
  return [...set].sort();
}

function extractAllCompanies(problems) {
  const set = new Set();
  problems.forEach((p) => p.companies?.forEach((c) => set.add(c)));
  return [...set].sort();
}

export default function ProblemList({ problems }) {
  const solved = useJudgeStore((s) => s.solved);
  const [search, setSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [topicFilter, setTopicFilter] = useState("all");
  const [companyFilter, setCompanyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const allTopics = useMemo(() => extractAllTopics(problems), [problems]);
  const allCompanies = useMemo(() => extractAllCompanies(problems), [problems]);

  const filtered = useMemo(() => {
    return problems.filter((p) => {
      if (search) {
        const q = search.toLowerCase();
        if (
          !p.title.toLowerCase().includes(q) &&
          !p.id.toLowerCase().includes(q)
        )
          return false;
      }
      if (difficultyFilter !== "all" && p.difficulty !== difficultyFilter)
        return false;
      if (topicFilter !== "all" && !(p.topics || []).includes(topicFilter))
        return false;
      if (companyFilter !== "all" && !(p.companies || []).includes(companyFilter))
        return false;
      if (statusFilter === "solved" && solved[p.id] !== "accepted")
        return false;
      if (statusFilter === "attempted" && solved[p.id] !== "attempted")
        return false;
      if (statusFilter === "unsolved" && solved[p.id] != null)
        return false;
      return true;
    });
  }, [problems, search, difficultyFilter, topicFilter, companyFilter, statusFilter, solved]);

  const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");

  return (
    <div className="jdg-list-container">
      {/* Filters bar */}
      <div className="jdg-list-filters">
        <input
          type="text"
          className="jdg-search-input"
          placeholder="Search problems..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="jdg-filter-select"
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
        >
          <option value="all">All Difficulties</option>
          {DIFFICULTIES.map((d) => (
            <option key={d} value={d}>
              {d.charAt(0).toUpperCase() + d.slice(1)}
            </option>
          ))}
        </select>

        <select
          className="jdg-filter-select"
          value={topicFilter}
          onChange={(e) => setTopicFilter(e.target.value)}
        >
          <option value="all">All Topics</option>
          {allTopics.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1).replace(/-/g, " ")}
            </option>
          ))}
        </select>

        <select
          className="jdg-filter-select"
          value={companyFilter}
          onChange={(e) => setCompanyFilter(e.target.value)}
        >
          <option value="all">All Companies</option>
          {allCompanies.map((c) => (
            <option key={c} value={c}>
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>

        <select
          className="jdg-filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="solved">✅ Solved</option>
          <option value="attempted">🟡 Attempted</option>
          <option value="unsolved">⚪ Unsolved</option>
        </select>

        <span className="jdg-filter-count">{filtered.length} problems</span>
      </div>

      {/* Problem list */}
      <div className="jdg-list">
        {filtered.length === 0 ? (
          <div className="jdg-list-empty">No problems match your filters.</div>
        ) : (
          filtered.map((p) => (
            <a key={p.id} href={`${base}problems/${p.id}`} className="jdg-list-card">
              <span className="jdg-list-status">{STATUS_ICON[solved[p.id]] || "⚪"}</span>
              <span className="jdg-list-title">{p.title}</span>
              <span className={`jdg-diff-badge jdg-diff-${p.difficulty}`}>{p.difficulty}</span>
              <span className="jdg-list-topics">
                {(p.topics || []).map((t) => (
                  <span key={t} className="jdg-topic-tag">{t}</span>
                ))}
              </span>
            </a>
          ))
        )}
      </div>
    </div>
  );
}
