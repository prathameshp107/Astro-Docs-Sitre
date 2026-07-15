import { useState, useEffect, useMemo, useRef, useCallback } from "react";

// Ctrl+K command palette shared by all labs.
// commands: [{ id, label, section, hint, done, action }]

const CSS = `
.lcp-overlay{position:fixed;inset:0;z-index:99990;background:rgba(2,6,17,.6);
  backdrop-filter:blur(4px);display:flex;justify-content:center;align-items:flex-start;
  padding:12vh 16px 0;animation:lcp-fade .15s ease}
.lcp-panel{width:100%;max-width:560px;border-radius:14px;overflow:hidden;
  border:1px solid rgba(148,163,184,.25);background:#0d1424;
  box-shadow:0 30px 80px rgba(0,0,0,.55);animation:lcp-pop .18s ease}
.lcp-input-row{display:flex;align-items:center;gap:10px;padding:14px 16px;
  border-bottom:1px solid rgba(148,163,184,.14)}
.lcp-prompt{color:var(--lcp-accent,#4ade80);font-family:"JetBrains Mono",monospace;font-weight:700}
.lcp-input{flex:1;background:transparent;border:none;outline:none;color:#e8ecf6;
  font-family:"JetBrains Mono",ui-monospace,monospace;font-size:.92rem;caret-color:var(--lcp-accent,#4ade80)}
.lcp-input::placeholder{color:#64748b}
.lcp-esc{font-family:"JetBrains Mono",monospace;font-size:.66rem;color:#64748b;
  border:1px solid rgba(148,163,184,.25);border-radius:5px;padding:2px 6px}
.lcp-list{max-height:46vh;overflow-y:auto;padding:6px}
.lcp-section{font-family:"JetBrains Mono",monospace;font-size:.64rem;letter-spacing:.08em;
  text-transform:uppercase;color:#64748b;padding:10px 12px 4px}
.lcp-item{display:flex;align-items:center;gap:10px;width:100%;text-align:left;
  padding:9px 12px;border-radius:9px;border:none;background:transparent;cursor:pointer;
  color:#cbd5e1;font-family:Inter,system-ui,sans-serif;font-size:.86rem}
.lcp-item.selected{background:color-mix(in srgb,var(--lcp-accent,#4ade80) 14%,transparent);color:#fff}
.lcp-item-done{color:#4ade80;font-family:"JetBrains Mono",monospace;font-size:.74rem}
.lcp-item-hint{margin-left:auto;font-family:"JetBrains Mono",monospace;font-size:.66rem;
  color:#64748b;border:1px solid rgba(148,163,184,.2);border-radius:5px;padding:1px 6px;white-space:nowrap}
.lcp-empty{padding:26px 16px;text-align:center;color:#64748b;
  font-family:"JetBrains Mono",monospace;font-size:.8rem}
.lcp-foot{display:flex;gap:14px;padding:8px 14px;border-top:1px solid rgba(148,163,184,.14);
  font-family:"JetBrains Mono",monospace;font-size:.64rem;color:#64748b}
@keyframes lcp-fade{from{opacity:0}to{opacity:1}}
@keyframes lcp-pop{from{opacity:0;transform:scale(.97) translateY(-8px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.lcp-overlay,.lcp-panel{animation:none}}
`;

function injectCSS() {
  if (typeof document === "undefined" || document.getElementById("lcp-css")) return;
  const style = document.createElement("style");
  style.id = "lcp-css";
  style.textContent = CSS;
  document.head.appendChild(style);
}

function fuzzyScore(query, text) {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  if (!q) return 1;
  const idx = t.indexOf(q);
  if (idx >= 0) return 100 - idx; // substring: best, earlier is better
  // subsequence fallback
  let qi = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) qi++;
  }
  return qi === q.length ? 10 : 0;
}

// Manages open state + the global Ctrl/Cmd+K toggle.
export function useCommandPalette() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return [open, setOpen];
}

export default function LabCommandPalette({ open, onClose, commands, accent = "#4ade80", placeholder = "Type a command or jump to a lesson…" }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    injectCSS();
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  const filtered = useMemo(() => {
    const scored = commands
      .map((c) => ({ c, score: fuzzyScore(query, `${c.section || ""} ${c.label}`) }))
      .filter((x) => x.score > 0);
    if (query) scored.sort((a, b) => b.score - a.score);
    return scored.map((x) => x.c);
  }, [commands, query]);

  const run = useCallback(
    (cmd) => {
      onClose();
      // let the overlay unmount before the action mutates layout
      setTimeout(() => cmd.action(), 0);
    },
    [onClose]
  );

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[selected]) run(filtered[selected]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  useEffect(() => {
    setSelected(0);
  }, [query]);

  useEffect(() => {
    const el = listRef.current?.querySelector(".lcp-item.selected");
    el?.scrollIntoView({ block: "nearest" });
  }, [selected, filtered]);

  if (!open) return null;

  // group in display order, preserving filter ranking within sections
  const sections = [];
  const bySection = new Map();
  filtered.forEach((c) => {
    const key = c.section || "Commands";
    if (!bySection.has(key)) {
      bySection.set(key, []);
      sections.push(key);
    }
    bySection.get(key).push(c);
  });
  let flatIndex = -1;

  return (
    <div className="lcp-overlay" style={{ "--lcp-accent": accent }} onMouseDown={onClose}>
      <div className="lcp-panel" onMouseDown={(e) => e.stopPropagation()}>
        <div className="lcp-input-row">
          <span className="lcp-prompt">❯</span>
          <input
            ref={inputRef}
            className="lcp-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            aria-label="Command palette"
          />
          <span className="lcp-esc">esc</span>
        </div>
        <div className="lcp-list" ref={listRef}>
          {filtered.length === 0 ? (
            <div className="lcp-empty">no matches for “{query}”</div>
          ) : (
            sections.map((sec) => (
              <div key={sec}>
                <div className="lcp-section">{sec}</div>
                {bySection.get(sec).map((cmd) => {
                  flatIndex += 1;
                  const idx = flatIndex;
                  return (
                    <button
                      key={cmd.id || cmd.label}
                      className={`lcp-item ${idx === selected ? "selected" : ""}`}
                      onMouseEnter={() => setSelected(idx)}
                      onClick={() => run(cmd)}
                    >
                      {cmd.done && <span className="lcp-item-done">✓</span>}
                      <span>{cmd.label}</span>
                      {cmd.hint && <span className="lcp-item-hint">{cmd.hint}</span>}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
        <div className="lcp-foot">
          <span>↑↓ navigate</span>
          <span>⏎ select</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
}
