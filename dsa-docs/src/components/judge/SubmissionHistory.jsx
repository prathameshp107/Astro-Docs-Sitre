import { useJudgeStore } from "../../store/judgeStore.js";

const VERDICT_LABEL = {
  accepted: { text: "Accepted", cls: "jdg-verdict-ac" },
  wrong_answer: { text: "Wrong Answer", cls: "jdg-verdict-wa" },
  time_limit_exceeded: { text: "TLE", cls: "jdg-verdict-tle" },
  runtime_error: { text: "Runtime Error", cls: "jdg-verdict-re" },
};

function formatTime(ts) {
  const d = new Date(ts);
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function SubmissionHistory({ problemId, onRestore }) {
  const submissions = useJudgeStore((s) => s.submissions[problemId] || []);

  if (submissions.length === 0) {
    return (
      <div className="jdg-submissions-empty">
        No submissions yet. Write your solution and click Submit.
      </div>
    );
  }

  return (
    <div className="jdg-submissions-panel">
      <h3 className="jdg-submissions-title">Submissions ({submissions.length})</h3>
      <div className="jdg-submissions-list">
        {submissions.map((sub, i) => {
          const meta = VERDICT_LABEL[sub.verdict] || { text: sub.verdict, cls: "" };
          return (
            <div key={sub.ts} className="jdg-submission-item">
              <div className="jdg-submission-left">
                <span className={`jdg-sub-verdict ${meta.cls}`}>{meta.text}</span>
                <span className="jdg-sub-lang">{sub.lang}</span>
                <span className="jdg-sub-runtime">{sub.runtimeMs?.toFixed(1)} ms</span>
              </div>
              <div className="jdg-submission-right">
                <span className="jdg-sub-time">{formatTime(sub.ts)}</span>
                <button
                  type="button"
                  className="jdg-btn-ghost-sm"
                  onClick={() => onRestore?.(sub.code)}
                  title="Restore this submission into the editor"
                >
                  Restore
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
