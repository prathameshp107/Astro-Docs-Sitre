import { useState } from "react";
import { CompanyIcon } from "./CompanyIcons.jsx";
import '../../styles/sketch-visualizer.css';

const COMPANIES = [
  { id: "google", name: "Google", region: "global", type: "product", difficulty: 5, qCount: 4, active: true, color: "#4285f4" },
  { id: "amazon", name: "Amazon", region: "global", type: "product", difficulty: 4, qCount: 5, active: true, color: "#ff9900" },
  { id: "meta", name: "Meta", region: "global", type: "product", difficulty: 4, qCount: 0, active: false, votes: 142, color: "#0668e1" },
  { id: "microsoft", name: "Microsoft", region: "global", type: "product", difficulty: 4, qCount: 0, active: false, votes: 98, color: "#00a4ef" },
  { id: "apple", name: "Apple", region: "global", type: "product", difficulty: 4, qCount: 0, active: false, votes: 64, color: "#a3aaae" },
  { id: "netflix", name: "Netflix", region: "global", type: "product", difficulty: 5, qCount: 0, active: false, votes: 85, color: "#e50914" },
  { id: "flipkart", name: "Flipkart", region: "india", type: "product", difficulty: 4, qCount: 0, active: false, votes: 110, color: "#2874f0" },
  { id: "swiggy", name: "Swiggy", region: "india", type: "product", difficulty: 4, qCount: 0, active: false, votes: 76, color: "#fc8019" },
  { id: "zomato", name: "Zomato", region: "india", type: "product", difficulty: 4, qCount: 0, active: false, votes: 58, color: "#cb202d" },
  { id: "razorpay", name: "Razorpay", region: "india", type: "product", difficulty: 4, qCount: 0, active: false, votes: 47, color: "#0b49c5" },
  { id: "tcs", name: "TCS", region: "india", type: "services", difficulty: 2, qCount: 0, active: false, votes: 231, color: "#1b365d" },
  { id: "infosys", name: "Infosys", region: "india", type: "services", difficulty: 2, qCount: 0, active: false, votes: 125, color: "#007cc3" }
];

export default function CompanyDirectory() {
  const [regionFilter, setRegionFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [votesState, setVotesState] = useState(
    Object.fromEntries(COMPANIES.map((c) => [c.id, c.votes || 0]))
  );
  const [votedList, setVotedList] = useState([]);
  const [customSuggestion, setCustomSuggestion] = useState("");
  const [suggestionStatus, setSuggestionStatus] = useState("");

  const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");

  const handleVote = (id, e) => {
    e.preventDefault();
    if (votedList.includes(id)) return;
    setVotesState((prev) => ({ ...prev, [id]: prev[id] + 1 }));
    setVotedList((prev) => [...prev, id]);
  };

  const handleSuggestSubmit = (e) => {
    e.preventDefault();
    if (!customSuggestion.trim()) return;
    setSuggestionStatus("Voted! We've recorded your suggestion.");
    setCustomSuggestion("");
  };

  const filtered = COMPANIES.filter((c) => {
    if (regionFilter !== "all" && c.region !== regionFilter) return false;
    if (typeFilter !== "all" && c.type !== typeFilter) return false;
    return true;
  });

  return (
    <div className="company-dir-wrap font-sketch max-w-6xl mx-auto px-4 py-6">
      {/* Filtering Toolbar */}
      <div className="sketch-border bg-[var(--sketch-bg-dim)] p-6 rounded-2xl border-2 border-[var(--sketch-border)] shadow-xl mb-10 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="font-header font-bold text-lg text-[var(--sketch-text)]">Region:</span>
          <div className="flex flex-wrap gap-2">
            {["all", "global", "india"].map((r) => (
              <button
                key={r}
                className={`sketch-button font-bold text-xs ${regionFilter === r ? "bg-amber-500/20 border-amber-500 text-amber-500 shadow-md" : ""}`}
                onClick={() => setRegionFilter(r)}
              >
                {r === "all" ? "All Regions" : r === "global" ? "US / Global" : "India"}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-header font-bold text-base text-[var(--sketch-text)]">Type:</span>
          <div className="flex flex-wrap gap-2">
            {["all", "product", "services"].map((t) => (
              <button
                key={t}
                className={`sketch-button font-bold text-xs ${typeFilter === t ? "bg-amber-500/20 border-amber-500 text-amber-500 shadow-md" : ""}`}
                onClick={() => setTypeFilter(t)}
              >
                {t === "all" ? "All Types" : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {filtered.map((c) => (
          <div 
            key={c.id} 
            className="sketch-panel-box sketch-border group flex flex-col justify-between p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-500 hover:shadow-xl bg-[var(--sketch-bg-dim)] cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--sketch-bg)] border border-[var(--sketch-border)] flex items-center justify-center p-2 shadow-inner">
                    <CompanyIcon companyId={c.id} size={24} />
                  </div>
                  <h3 className="font-header font-bold text-2xl text-[var(--sketch-text)] group-hover:text-amber-500 transition-colors">
                    {c.name}
                  </h3>
                </div>
                <span className="sketch-border-soft px-3 py-1 text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border-amber-500/30 rounded-full uppercase">
                  {c.type}
                </span>
              </div>
              
              {/* Premium Difficulty Dots */}
              <div className="flex items-center gap-1.5 mb-4">
                <span className="text-xs font-mono text-[var(--sketch-text-muted)] mr-2">Difficulty:</span>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <span 
                    key={idx} 
                    className="w-3.5 h-3.5 rounded-full border border-[var(--sketch-border)] transition-colors"
                    style={{ 
                      backgroundColor: idx < c.difficulty ? c.color : 'transparent'
                    }}
                  />
                ))}
              </div>

              <p className="text-[var(--sketch-text-muted)] text-sm leading-relaxed mb-6 font-sketch">
                {c.active 
                  ? "Complete verified interview round preparation, coding challenges, and mock study tracks." 
                  : `Community track requested. Upvote to unlock (${votesState[c.id]} target votes).`}
              </p>
            </div>

            <div className="pt-4 border-t border-[var(--sketch-border)]">
              {c.active ? (
                <a 
                  href={`${base}companies/${c.id}`} 
                  className="sketch-button flex items-center justify-center gap-2 text-sm font-bold text-amber-500 border-amber-500/60 bg-amber-500/10 hover:bg-amber-500/20 w-full text-center py-2.5 shadow-md"
                >
                  Prepare Track →
                </a>
              ) : (
                <button
                  type="button"
                  onClick={(e) => handleVote(c.id, e)}
                  disabled={votedList.includes(c.id)}
                  className="sketch-button flex items-center justify-center gap-2 text-sm font-bold w-full text-center py-2.5"
                >
                  {votedList.includes(c.id) ? "Upvoted ✓" : `Upvote Track (${votesState[c.id]})`}
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Suggestion Box Card */}
        <div className="sketch-panel-box sketch-border flex flex-col justify-between p-6 rounded-2xl bg-[var(--sketch-bg-dim)]">
          <div>
            <h3 className="font-header font-bold text-2xl text-[var(--sketch-text)] mb-2">
              Suggest Company
            </h3>
            <p className="text-[var(--sketch-text-muted)] text-sm leading-relaxed mb-6 font-sketch">
              Targeting a specific employer? Suggest a new interview track below.
            </p>
          </div>
          <div className="pt-4 border-t border-[var(--sketch-border)]">
            {suggestionStatus ? (
              <span className="text-emerald-400 font-bold text-sm flex items-center gap-2">✓ {suggestionStatus}</span>
            ) : (
              <form onSubmit={handleSuggestSubmit} className="flex flex-col gap-3">
                <input
                  type="text"
                  value={customSuggestion}
                  onChange={(e) => setCustomSuggestion(e.target.value)}
                  placeholder="e.g. Swiggy, Uber"
                  className="sketch-border bg-[var(--sketch-bg)] p-3 rounded-xl text-sm font-sketch text-[var(--sketch-text)] border-2 border-[var(--sketch-border)] focus:outline-none focus:border-amber-500"
                />
                <button type="submit" className="sketch-button font-header font-bold text-sm text-amber-500 border-amber-500/60 bg-amber-500/10 hover:bg-amber-500/20 py-2">
                  Submit Suggestion
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Sketch Blackboard Footer */}
      <footer className="sketch-border bg-[var(--sketch-bg-dim)] p-8 md:p-10 rounded-2xl font-sketch shadow-xl mt-16 max-w-6xl mx-auto mb-10">
        {/* Top Branding & Description */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[var(--sketch-border)]">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🏢</span>
              <h3 className="text-2xl font-bold font-header text-[var(--sketch-text)]">
                Company Interview Tracks
              </h3>
            </div>
            <p className="text-[var(--sketch-text-muted)] text-sm max-w-2xl leading-relaxed font-sketch">
              Targeted study pipelines mapped out round-by-round for Google, Amazon, Meta, TCS, and top product/services companies.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/prathameshp107/DSA-Notes-Problems"
              target="_blank"
              rel="noopener noreferrer"
              className="sketch-button flex items-center gap-2 text-sm font-bold bg-amber-500/20 border-amber-500"
            >
              <span>⭐ Star on GitHub</span>
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="sketch-button flex items-center gap-1.5 text-sm font-bold"
              title="Back to top"
            >
              <span>↑ Top</span>
            </button>
          </div>
        </div>

        {/* 4-Column Quick Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-b border-[var(--sketch-border)]">
          {/* Column 1: Featured Tracks */}
          <div>
            <h4 className="font-header font-bold text-base text-[var(--sketch-accent-orange)] mb-3 flex items-center gap-2">
              <span>🎯</span> Company Tracks
            </h4>
            <ul className="space-y-2 text-sm text-[var(--sketch-text-muted)] font-sketch">
              <li>
                <a href={`${base}companies/google`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> Google SDE Track
                </a>
              </li>
              <li>
                <a href={`${base}companies/amazon`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> Amazon SDE Track
                </a>
              </li>
              <li>
                <a href={`${base}companies`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> All Company Directories
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Interview Prep */}
          <div>
            <h4 className="font-header font-bold text-base text-[var(--sketch-accent-orange)] mb-3 flex items-center gap-2">
              <span>💡</span> Interview Tools
            </h4>
            <ul className="space-y-2 text-sm text-[var(--sketch-text-muted)] font-sketch">
              <li>
                <a href={`${base}interview-questions`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> Interview Questions Hub
                </a>
              </li>
              <li>
                <a href={`${base}labs`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> Practice Labs Hub
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Design & DSA */}
          <div>
            <h4 className="font-header font-bold text-base text-[var(--sketch-accent-orange)] mb-3 flex items-center gap-2">
              <span>📐</span> Design & DSA
            </h4>
            <ul className="space-y-2 text-sm text-[var(--sketch-text-muted)] font-sketch">
              <li>
                <a href={`${base}system-design`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> System Design Hub
                </a>
              </li>
              <li>
                <a href={`${base}visualizer`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> Visualizer Studio
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Quizzes & Practice */}
          <div>
            <h4 className="font-header font-bold text-base text-[var(--sketch-accent-orange)] mb-3 flex items-center gap-2">
              <span>❓</span> MCQ Quizzes
            </h4>
            <ul className="space-y-2 text-sm text-[var(--sketch-text-muted)] font-sketch">
              <li>
                <a href={`${base}mcq`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> All MCQ Categories
                </a>
              </li>
              <li>
                <a href={`${base}mcq/javascript`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> JavaScript MCQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Design Bar */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[var(--sketch-text-muted)]">
          <div>
            © {new Date().getFullYear()} Company Interview Tracks · Hand-crafted Blackboard UI.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-500 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {COMPANIES.length} Company Tracks Available
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
