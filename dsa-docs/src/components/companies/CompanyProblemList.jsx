import { useMemo } from "react";
import { useJudgeStore } from "../../store/judgeStore.js";

const STATUS_ICON = { accepted: "✅", attempted: "🟡" };

export default function CompanyProblemList({ problems, companyId, problemFrequency }) {
  const solved = useJudgeStore((s) => s.solved);
  const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");

  const companyProblems = useMemo(() => {
    if (!problems) return [];
    return problems
      .filter((p) => (p.companies || []).includes(companyId))
      .map((p) => {
        const freq = problemFrequency?.[p.id] || "low";
        return { ...p, freq };
      })
      .sort((a, b) => {
        const order = { high: 1, medium: 2, low: 3 };
        return order[a.freq] - order[b.freq];
      });
  }, [problems, companyId, problemFrequency]);

  return (
    <div className="company-problem-list-wrap">
      <div className="jdg-list" style={{ marginTop: "1rem" }}>
        {companyProblems.length === 0 ? (
          <div className="jdg-list-empty">No problems currently indexed for this track. Check back soon!</div>
        ) : (
          companyProblems.map((p) => (
            <a 
              key={p.id} 
              href={`${base}dsa/problems/${p.id}`} 
              className="jdg-list-card"
            >
              <span className="jdg-list-status">{STATUS_ICON[solved[p.id]] || "⚪"}</span>
              <span className="jdg-list-title">{p.title}</span>
              <span className={`jdg-diff-badge jdg-diff-${p.difficulty}`}>{p.difficulty}</span>
              
              <span className={`frequency-badge freq-${p.freq}`}>
                {p.freq.toUpperCase()} FREQ
              </span>
            </a>
          ))
        )}
      </div>
    </div>
  );
}
