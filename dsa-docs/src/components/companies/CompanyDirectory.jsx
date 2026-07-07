import { useState } from "react";

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
    <div className="company-dir-wrap">
      {/* Filtering Toolbar */}
      <div className="company-dir-filters">
        <div className="dir-filter-group">
          <span className="dir-filter-label">Region</span>
          <div className="dir-filter-btns">
            {["all", "global", "india"].map((r) => (
              <button
                key={r}
                className={`dir-filter-btn ${regionFilter === r ? "active" : ""}`}
                onClick={() => setRegionFilter(r)}
              >
                {r === "all" ? "All Regions" : r === "global" ? "US / Global" : "India"}
              </button>
            ))}
          </div>
        </div>

        <div className="dir-filter-group">
          <span className="dir-filter-label">Type</span>
          <div className="dir-filter-btns">
            {["all", "product", "services"].map((t) => (
              <button
                key={t}
                className={`dir-filter-btn ${typeFilter === t ? "active" : ""}`}
                onClick={() => setTypeFilter(t)}
              >
                {t === "all" ? "All Types" : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="company-dir-grid">
        {filtered.map((c) => (
          <div 
            key={c.id} 
            className={`company-card ${c.active ? "active-card" : "inactive-card"}`}
            style={{ 
              borderLeftWidth: "3px", 
              borderLeftColor: c.active ? c.color : "var(--border)"
            }}
          >
            <div className="company-card-header">
              <h3 className="company-name">{c.name}</h3>
              <span className={`company-type-badge ${c.type}`}>{c.type}</span>
            </div>
            
            {/* Premium Difficulty Dots */}
            <div className="company-difficulty-dots">
              {Array.from({ length: 5 }).map((_, idx) => (
                <span 
                  key={idx} 
                  className={`difficulty-dot ${idx < c.difficulty ? "filled" : ""}`}
                  style={{ 
                    backgroundColor: idx < c.difficulty ? c.color : "var(--border-strong)"
                  }}
                />
              ))}
            </div>

            <div className="company-card-body">
              {c.active ? (
                <p className="company-status-text">Complete verified interview round preparation, coding challenges, and mock study tracks.</p>
              ) : (
                <div className="vote-body">
                  <p className="company-status-text">Community track requested. Upvote to unlock.</p>
                  <span className="votes-count">📈 {votesState[c.id]} target votes</span>
                </div>
              )}
            </div>

            <div className="company-card-actions">
              {c.active ? (
                <a 
                  href={`${base}companies/${c.id}`} 
                  className="company-cta-btn active-btn"
                  style={{ backgroundColor: c.color }}
                >
                  Prepare Track
                </a>
              ) : (
                <button
                  type="button"
                  onClick={(e) => handleVote(c.id, e)}
                  disabled={votedList.includes(c.id)}
                  className={`company-cta-btn vote-btn ${votedList.includes(c.id) ? "voted" : ""}`}
                >
                  {votedList.includes(c.id) ? "Upvoted ✓" : "Upvote Track"}
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Suggestion Box Card */}
        <div className="company-card suggest-card">
          <div className="company-card-header">
            <h3 className="company-name" style={{ color: "var(--text-secondary)" }}>Suggest Company</h3>
          </div>
          <p className="company-status-text">Targeting a specific employer? Suggest a new interview track below.</p>
          <div className="vote-body" style={{ marginTop: "auto" }}>
            {suggestionStatus ? (
              <span className="suggest-success">{suggestionStatus}</span>
            ) : (
              <form onSubmit={handleSuggestSubmit} className="suggest-form">
                <input
                  type="text"
                  value={customSuggestion}
                  onChange={(e) => setCustomSuggestion(e.target.value)}
                  placeholder="e.g. Swiggy, Uber"
                  className="suggest-input"
                />
                <button type="submit" className="company-cta-btn active-btn text-sm font-semibold">
                  Submit Suggestion
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
