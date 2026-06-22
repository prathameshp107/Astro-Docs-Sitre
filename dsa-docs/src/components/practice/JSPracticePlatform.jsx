import { useState, useEffect, useMemo } from "react";
import MonacoPlayground from "./MonacoPlayground.jsx";
import SnippetQuestions from "./SnippetQuestions.jsx";
import FixBug from "./FixBug.jsx";
import MiniApps from "./MiniApps.jsx";
import InterviewMode from "./InterviewMode.jsx";
import { DiJavascript1 } from "react-icons/di";
import { SNIPPET_QUESTIONS, BUG_CHALLENGES, MINI_APPS } from "../../data/questions.js";

const TABS = [
  { id: "playground", label: "▶ Playground", icon: "M5 3l14 9-14 9V3z" },
  { id: "questions", label: "📝 Questions", icon: null },
  { id: "fixbug", label: "🐛 Fix Bug", icon: null },
  { id: "miniapps", label: "📱 Mini Apps", icon: null },
  { id: "interview", label: "🎤 Interview", icon: null },
  { id: "progress", label: "📊 Progress", icon: null },
];

export default function JSPracticePlatform() {
  const [activeTab, setActiveTab] = useState("playground");
  const [playgroundCode, setPlaygroundCode] = useState(null);
  const [progress, setProgress] = useState({ questions: [], bugs: [] });

  useEffect(() => {
    try {
      const q = JSON.parse(sessionStorage.getItem("prac-completed") || "[]");
      const b = JSON.parse(sessionStorage.getItem("prac-bugs-completed") || "[]");
      setProgress({ questions: q, bugs: b });
    } catch { /* ignore */ }

    const handleStorage = () => {
      try {
        const q = JSON.parse(sessionStorage.getItem("prac-completed") || "[]");
        const b = JSON.parse(sessionStorage.getItem("prac-bugs-completed") || "[]");
        setProgress({ questions: q, bugs: b });
      } catch { /* ignore */ }
    };
    window.addEventListener("storage", handleStorage);
    window.addEventListener("focus", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("focus", handleStorage);
    };
  }, []);

  const handleSelectCode = (code) => {
    setPlaygroundCode(code);
    setActiveTab("playground");
  };

  const stats = useMemo(() => {
    const qTotal = SNIPPET_QUESTIONS.length;
    const bTotal = BUG_CHALLENGES.length;
    const aTotal = MINI_APPS.length;
    const qDone = progress.questions.length;
    const bDone = progress.bugs.length;
    const total = qTotal + bTotal + aTotal;
    const done = qDone + bDone;
    return { qTotal, bTotal, aTotal, qDone, bDone, total, done, pct: total > 0 ? Math.round((done / total) * 100) : 0 };
  }, [progress]);

  const base = import.meta.env.BASE_URL || "/";

  return (
    <div className="prac-platform">
      {/* Top bar */}
      <div className="prac-topbar">
        <div className="prac-topbar-left">
          <a href={base} className="prac-logo">
            <DiJavascript1 size={22} />
            <span className="prac-logo-text">JS Interview Lab</span>
          </a>
          <div className="prac-topbar-links">
            <a href={`${base}labs`} className="prac-top-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Labs
            </a>
            <a href={base} className="prac-top-link">Home</a>
            <a href={`${base}overview`} className="prac-top-link">Docs</a>
            <a href={`${base}playground`} className="prac-top-link">Playground</a>
          </div>
        </div>
        <div className="prac-topbar-stats">
          <span className="prac-top-stat">{stats.done}/{stats.total} done</span>
          <div className="prac-top-bar"><div className="prac-top-fill" style={{ width: `${stats.pct}%` }} /></div>
        </div>
      </div>

      {/* Tab nav */}
      <div className="prac-tabs">
        {TABS.map((tab) => (
          <button key={tab.id} className={`prac-tab ${activeTab === tab.id ? "active" : ""}`} onClick={() => setActiveTab(tab.id)}>
            {tab.icon ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            ) : null}
            {tab.label}
            {tab.id === "questions" && stats.qDone > 0 && <span className="prac-tab-badge">{stats.qDone}</span>}
            {tab.id === "fixbug" && stats.bDone > 0 && <span className="prac-tab-badge">{stats.bDone}</span>}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="prac-content">
        {activeTab === "playground" && (
          <MonacoPlayground initialCode={playgroundCode} />
        )}
        {activeTab === "questions" && (
          <SnippetQuestions onSelectCode={handleSelectCode} />
        )}
        {activeTab === "fixbug" && (
          <FixBug onSelectCode={handleSelectCode} />
        )}
        {activeTab === "interview" && (
          <InterviewMode onSelectCode={handleSelectCode} />
        )}
        {activeTab === "miniapps" && (
          <MiniApps onSelectCode={handleSelectCode} />
        )}
        {activeTab === "progress" && (
          <div className="prac-progress">
            <h2>Your Progress</h2>
            <div className="prac-progress-grid">
              <div className="prac-progress-card">
                <h3>📝 Snippet Questions</h3>
                <div className="prac-progress-num">{stats.qDone} <span>/ {stats.qTotal}</span></div>
                <div className="prac-progress-bar"><div style={{ width: `${stats.qTotal > 0 ? (stats.qDone / stats.qTotal) * 100 : 0}%` }} /></div>
              </div>
              <div className="prac-progress-card">
                <h3>🐛 Fix the Bug</h3>
                <div className="prac-progress-num">{stats.bDone} <span>/ {stats.bTotal}</span></div>
                <div className="prac-progress-bar"><div style={{ width: `${stats.bTotal > 0 ? (stats.bDone / stats.bTotal) * 100 : 0}%` }} /></div>
              </div>
              <div className="prac-progress-card">
                <h3>📱 Mini Apps</h3>
                <div className="prac-progress-num">0 <span>/ {stats.aTotal}</span></div>
                <div className="prac-progress-bar"><div style={{ width: "0%" }} /></div>
              </div>
              <div className="prac-progress-card overall">
                <h3>🎯 Overall</h3>
                <div className="prac-progress-num">{stats.pct}%</div>
                <div className="prac-progress-bar"><div style={{ width: `${stats.pct}%` }} /></div>
                <p>{stats.done} of {stats.total} challenges completed</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
