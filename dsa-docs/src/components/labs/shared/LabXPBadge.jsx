import { useState, useEffect, useRef } from "react";
import useLabXP, { onXPAward } from "./useLabXP.js";

const CSS = `
.lxp-badge{display:inline-flex;align-items:center;gap:8px;padding:4px 10px;border-radius:999px;
  border:1px solid rgba(148,163,184,.22);background:rgba(148,163,184,.08);
  font-family:"JetBrains Mono",ui-monospace,monospace;font-size:.72rem;color:#cbd5e1;
  user-select:none;white-space:nowrap}
.lxp-level{color:#fbbf24;font-weight:700}
.lxp-bar{width:52px;height:5px;border-radius:999px;background:rgba(148,163,184,.2);overflow:hidden}
.lxp-fill{height:100%;border-radius:999px;background:linear-gradient(90deg,#fbbf24,#f59e0b);
  transition:width .5s cubic-bezier(.22,1,.36,1)}
.lxp-streak{color:#fb923c;font-weight:600}
.lxp-toasts{position:fixed;top:64px;right:16px;z-index:99998;display:flex;flex-direction:column;
  gap:8px;pointer-events:none}
.lxp-toast{display:flex;align-items:center;gap:8px;padding:9px 14px;border-radius:10px;
  border:1px solid rgba(251,191,36,.35);background:rgba(15,23,42,.92);backdrop-filter:blur(8px);
  color:#e2e8f0;font-family:"JetBrains Mono",ui-monospace,monospace;font-size:.78rem;
  box-shadow:0 10px 30px rgba(0,0,0,.4);animation:lxp-in .25s ease}
.lxp-toast strong{color:#fbbf24}
.lxp-toast.levelup{border-color:rgba(74,222,128,.45)}
.lxp-toast.levelup strong{color:#4ade80}
@keyframes lxp-in{from{opacity:0;transform:translateX(16px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.lxp-toast{animation:none}.lxp-fill{transition:none}}
`;

function injectCSS() {
  if (typeof document === "undefined" || document.getElementById("lxp-css")) return;
  const style = document.createElement("style");
  style.id = "lxp-css";
  style.textContent = CSS;
  document.head.appendChild(style);
}

export default function LabXPBadge() {
  const { xp, level, pct, streak } = useLabXP();
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  useEffect(() => {
    injectCSS();
    return onXPAward((e) => {
      const d = e.detail;
      const items = [{ key: ++idRef.current, text: d.label, amount: d.amount }];
      if (d.levelUp) {
        items.push({ key: ++idRef.current, levelUp: true, level: d.level });
      }
      setToasts((prev) => [...prev, ...items]);
      items.forEach((t) =>
        setTimeout(() => setToasts((prev) => prev.filter((x) => x.key !== t.key)), 3200)
      );
    });
  }, []);

  return (
    <>
      <span className="lxp-badge" title={`${xp} XP total · ${pct}% to next level`}>
        <span className="lxp-level">⚡ Lv {level}</span>
        <span className="lxp-bar">
          <span className="lxp-fill" style={{ width: `${pct}%`, display: "block" }} />
        </span>
        {streak > 0 && (
          <span className="lxp-streak" title={`${streak}-day streak`}>
            🔥{streak}
          </span>
        )}
      </span>
      {toasts.length > 0 && (
        <div className="lxp-toasts">
          {toasts.map((t) =>
            t.levelUp ? (
              <div key={t.key} className="lxp-toast levelup">
                🎉 <strong>Level up!</strong> You reached Lv {t.level}
              </div>
            ) : (
              <div key={t.key} className="lxp-toast">
                <strong>+{t.amount} XP</strong> {t.text}
              </div>
            )
          )}
        </div>
      )}
    </>
  );
}
