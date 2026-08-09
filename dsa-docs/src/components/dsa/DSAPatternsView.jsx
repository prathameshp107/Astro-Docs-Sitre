import { useState, useMemo } from "react";
import { PATTERN_CATEGORIES, DSA_PATTERNS } from "../../data/dsa-patterns.js";
import { getProblemById } from "../../data/dsa-problems.js";
import {
  FiSearch,
  FiCode,
  FiCheck,
  FiCopy,
  FiZap,
  FiAlertTriangle,
  FiClock,
  FiCpu,
  FiArrowRight,
  FiChevronDown,
  FiChevronUp,
  FiMaximize2,
  FiMinimize2,
  FiBookOpen,
  FiLayout,
  FiCompass,
} from "react-icons/fi";
import "../../styles/sketch-visualizer.css";

export default function DSAPatternsView() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  // Default first pattern open
  const [openPatterns, setOpenPatterns] = useState(() => {
    const init = {};
    if (DSA_PATTERNS.length > 0) init[DSA_PATTERNS[0].id] = true;
    return init;
  });
  // Mode per pattern: 'diagram' or 'code' (default 'diagram')
  const [cardMode, setCardMode] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  const filteredPatterns = useMemo(() => {
    return DSA_PATTERNS.filter((pattern) => {
      const matchesCategory =
        activeCategory === "all" || pattern.category === activeCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        pattern.title.toLowerCase().includes(q) ||
        pattern.description.toLowerCase().includes(q) ||
        pattern.coreTrick.toLowerCase().includes(q) ||
        pattern.whenToUse.some((signal) => signal.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const togglePattern = (id) => {
    setOpenPatterns((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const all = {};
    filteredPatterns.forEach((p) => (all[p.id] = true));
    setOpenPatterns(all);
  };

  const collapseAll = () => {
    setOpenPatterns({});
  };

  const setPatternMode = (id, mode, e) => {
    e.stopPropagation();
    setCardMode((prev) => ({ ...prev, [id]: mode }));
  };

  const handleCopyCode = (id, code, e) => {
    e.stopPropagation();
    try {
      navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      /* fallback ignore */
    }
  };

  const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");

  return (
    <div
      className="chalk-patterns-root"
      style={{
        background: "var(--sketch-bg)",
        color: "var(--sketch-text)",
        minHeight: "100vh",
        maxWidth: "1150px",
        margin: "0 auto",
        padding: "2rem 1.5rem 5rem",
        fontFamily: "'Patrick Hand', cursive, sans-serif",
      }}
    >
      {/* Chalkboard Header Banner */}
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.35rem 1.2rem",
            background: "var(--sketch-bg-dim)",
            border: "2px solid var(--sketch-border)",
            borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px",
            color: "#f59e0b",
            fontFamily: "'Architects Daughter', cursive, sans-serif",
            fontSize: "0.95rem",
            fontWeight: 700,
            marginBottom: "1rem",
            transform: "rotate(-1deg)",
          }}
        >
          <FiZap size={16} /> Chalkboard Algorithmic Engine ({filteredPatterns.length} Patterns)
        </div>
        <h1
          style={{
            fontFamily: "'Architects Daughter', cursive, sans-serif",
            fontSize: "clamp(2.2rem, 5vw, 3.2rem)",
            fontWeight: 800,
            margin: "0 0 0.5rem 0",
            color: "var(--sketch-text)",
            textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
          }}
        >
          DSA Pattern Blueprints & Visual Chalkboard
        </h1>
        <p
          style={{
            color: "var(--sketch-text-muted)",
            fontSize: "1.25rem",
            maxWidth: "720px",
            margin: "0 auto",
            lineHeight: 1.5,
          }}
        >
          Recognize problem input signals, inspect step-by-step visual chalkboard diagrams, apply core tricks, and copy code blueprints!
        </p>
      </div>

      {/* Controls & Search Filter Bar */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2.5rem" }}>
        {/* Search Bar + Expand/Collapse Buttons */}
        <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ position: "relative", flex: 1, minWidth: "280px" }}>
            <FiSearch
              size={20}
              style={{
                position: "absolute",
                left: "1.1rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--sketch-text-muted)",
              }}
            />
            <input
              type="text"
              placeholder="Search pattern name, input signal (e.g. 'sorted array'), or trick..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "0.8rem 1rem 0.8rem 3rem",
                background: "var(--sketch-bg-dim)",
                border: "2px solid var(--sketch-border)",
                borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px",
                color: "var(--sketch-text)",
                fontFamily: "'Patrick Hand', cursive, sans-serif",
                fontSize: "1.15rem",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={expandAll}
              className="sketch-button"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
            >
              <FiMaximize2 size={14} /> Expand All
            </button>
            <button
              onClick={collapseAll}
              className="sketch-button"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
            >
              <FiMinimize2 size={14} /> Collapse All
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {PATTERN_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.45rem 1rem",
                  borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px",
                  border: isActive ? "2px solid #f59e0b" : "2px solid var(--sketch-border)",
                  background: isActive ? "rgba(245, 158, 11, 0.2)" : "var(--sketch-bg-dim)",
                  color: isActive ? "#f59e0b" : "var(--sketch-text-muted)",
                  fontFamily: "'Patrick Hand', cursive, sans-serif",
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  transform: isActive ? "rotate(-1deg)" : "none",
                }}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Accordion List (Chalkboard Sketch Style) */}
      {filteredPatterns.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "4rem 1rem",
            color: "var(--sketch-text-muted)",
            background: "var(--sketch-bg-dim)",
            border: "2px dashed var(--sketch-border)",
            borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px",
          }}
        >
          <FiBookOpen size={40} style={{ marginBottom: "0.75rem", color: "var(--sketch-text-muted)" }} />
          <h3 style={{ margin: "0 0 0.4rem 0", color: "var(--sketch-text)", fontFamily: "'Architects Daughter', cursive" }}>
            No matching chalk patterns found
          </h3>
          <p style={{ margin: 0, fontSize: "1.1rem" }}>Try clearing search keywords or selecting another category.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          {filteredPatterns.map((pattern, index) => {
            const isOpen = !!openPatterns[pattern.id];
            const activeMode = cardMode[pattern.id] || "diagram";

            return (
              <div
                key={pattern.id}
                style={{
                  background: "var(--sketch-bg-dim)",
                  border: isOpen ? "2px solid #f59e0b" : "2px solid var(--sketch-border)",
                  borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px",
                  overflow: "hidden",
                  transition: "all 0.2s ease",
                  boxShadow: isOpen ? "0 8px 22px rgba(245, 158, 11, 0.18)" : "0 4px 10px rgba(0,0,0,0.15)",
                }}
              >
                {/* Accordion Item Header */}
                <div
                  onClick={() => togglePattern(pattern.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justify: "space-between",
                    padding: "1.1rem 1.4rem",
                    cursor: "pointer",
                    background: isOpen ? "rgba(245, 158, 11, 0.06)" : "transparent",
                    userSelect: "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <span
                      style={{
                        fontSize: "1.6rem",
                        background: "rgba(255,255,255,0.06)",
                        padding: "0.3rem 0.6rem",
                        borderRadius: "12px",
                        border: "1px solid var(--sketch-border)",
                      }}
                    >
                      {pattern.icon}
                    </span>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                        <span style={{ fontSize: "0.9rem", color: "var(--sketch-text-muted)", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>
                          #{index + 1}
                        </span>
                        <h3
                          style={{
                            margin: 0,
                            fontFamily: "'Architects Daughter', cursive, sans-serif",
                            fontSize: "1.35rem",
                            fontWeight: 700,
                            color: "var(--sketch-text)",
                          }}
                        >
                          {pattern.title}
                        </h3>
                      </div>
                      <p
                        style={{
                          margin: "0.2rem 0 0 0",
                          fontSize: "1.05rem",
                          color: "var(--sketch-text-muted)",
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {pattern.description}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <span
                      style={{
                        fontSize: "0.85rem",
                        color: "#f59e0b",
                        fontWeight: 700,
                        background: "rgba(245, 158, 11, 0.15)",
                        border: "1.5px solid #f59e0b",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {pattern.difficulty}
                    </span>
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        color: isOpen ? "#f59e0b" : "var(--sketch-text-muted)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        padding: 0,
                      }}
                    >
                      {isOpen ? <FiChevronUp size={22} /> : <FiChevronDown size={22} />}
                    </button>
                  </div>
                </div>

                {/* Accordion Expandable Content */}
                {isOpen && (
                  <div
                    style={{
                      padding: "1.25rem 1.4rem 1.75rem",
                      borderTop: "2px dashed var(--sketch-border)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "1.25rem",
                      background: "rgba(0, 0, 0, 0.15)",
                    }}
                  >
                    {/* Input Signals (When to Use) */}
                    <div
                      style={{
                        background: "rgba(59, 130, 246, 0.08)",
                        padding: "0.9rem 1.1rem",
                        borderRadius: "12px",
                        border: "1.5px solid rgba(59, 130, 246, 0.3)",
                      }}
                    >
                      <h4
                        style={{
                          margin: "0 0 0.5rem 0",
                          fontFamily: "'Architects Daughter', cursive, sans-serif",
                          fontSize: "1.1rem",
                          color: "#60a5fa",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.4rem",
                        }}
                      >
                        🎯 Input Signals (When to use)
                      </h4>
                      <ul style={{ margin: 0, paddingLeft: "1.3rem", color: "var(--sketch-text)", fontSize: "1.08rem", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                        {pattern.whenToUse.map((signal, idx) => (
                          <li key={idx}>{signal}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Core Chalk Trick Box */}
                    <div
                      style={{
                        background: "rgba(245, 158, 11, 0.08)",
                        borderLeft: "4px solid #f59e0b",
                        padding: "0.9rem 1.1rem",
                        borderRadius: "0 12px 12px 0",
                      }}
                    >
                      <h4
                        style={{
                          margin: "0 0 0.4rem 0",
                          fontFamily: "'Architects Daughter', cursive, sans-serif",
                          fontSize: "1.1rem",
                          color: "#fbbf24",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.4rem",
                        }}
                      >
                        💡 Core Chalk Trick & Logic
                      </h4>
                      <p style={{ margin: 0, fontSize: "1.1rem", color: "var(--sketch-text)", lineHeight: 1.5 }}>
                        {pattern.coreTrick}
                      </p>
                    </div>

                    {/* Interactive View Toggles (Diagram vs Code) */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <button
                        onClick={(e) => setPatternMode(pattern.id, "diagram", e)}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.4rem",
                          padding: "0.4rem 0.9rem",
                          borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px",
                          border: activeMode === "diagram" ? "2px solid #f59e0b" : "1.5px solid var(--sketch-border)",
                          background: activeMode === "diagram" ? "rgba(245, 158, 11, 0.2)" : "rgba(255,255,255,0.04)",
                          color: activeMode === "diagram" ? "#f59e0b" : "var(--sketch-text-muted)",
                          fontFamily: "'Architects Daughter', cursive, sans-serif",
                          fontSize: "0.95rem",
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        <FiLayout size={15} /> 🎨 Visual Chalkboard
                      </button>

                      <button
                        onClick={(e) => setPatternMode(pattern.id, "code", e)}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.4rem",
                          padding: "0.4rem 0.9rem",
                          borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px",
                          border: activeMode === "code" ? "2px solid #a78bfa" : "1.5px solid var(--sketch-border)",
                          background: activeMode === "code" ? "rgba(167, 139, 250, 0.2)" : "rgba(255,255,255,0.04)",
                          color: activeMode === "code" ? "#a78bfa" : "var(--sketch-text-muted)",
                          fontFamily: "'Architects Daughter', cursive, sans-serif",
                          fontSize: "0.95rem",
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        <FiCode size={15} /> 💻 Code Blueprint
                      </button>
                    </div>

                    {/* Mode Content: Visual Diagram */}
                    {activeMode === "diagram" && pattern.visualDiagram && (
                      <div
                        style={{
                          background: "#0a0908",
                          border: "2px dashed #f59e0b",
                          borderRadius: "12px",
                          padding: "1.1rem 1.3rem",
                          position: "relative",
                          boxShadow: "0 0 15px rgba(245, 158, 11, 0.1)",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
                          <h4
                            style={{
                              margin: 0,
                              fontFamily: "'Architects Daughter', cursive, sans-serif",
                              fontSize: "1.1rem",
                              color: "#fcd34d",
                              display: "flex",
                              alignItems: "center",
                              gap: "0.4rem",
                            }}
                          >
                            <FiCompass size={16} /> Step-by-Step Chalkboard Diagram
                          </h4>
                          <span style={{ fontFamily: "'Caveat', cursive", fontSize: "1.1rem", color: "#60a5fa" }}>
                            ✎ Chalkboard Sketch
                          </span>
                        </div>
                        <pre
                          style={{
                            margin: 0,
                            fontFamily: '"JetBrains Mono", monospace',
                            fontSize: "0.88rem",
                            color: "#38bdf8",
                            lineHeight: 1.5,
                            overflowX: "auto",
                            whiteSpace: "pre",
                          }}
                        >
                          <code>{pattern.visualDiagram}</code>
                        </pre>
                      </div>
                    )}

                    {/* Mode Content: Code Blueprint */}
                    {activeMode === "code" && (
                      <div style={{ position: "relative" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                          <span
                            style={{
                              fontFamily: "'Architects Daughter', cursive, sans-serif",
                              fontSize: "1.05rem",
                              color: "#a78bfa",
                              display: "flex",
                              alignItems: "center",
                              gap: "0.4rem",
                            }}
                          >
                            <FiCode size={16} /> Pattern Blueprint Code
                          </span>
                          <button
                            onClick={(e) => handleCopyCode(pattern.id, pattern.templateCode, e)}
                            className="sketch-button"
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.3rem",
                              padding: "0.2rem 0.6rem",
                              fontSize: "0.9rem",
                            }}
                          >
                            {copiedId === pattern.id ? <FiCheck color="#34d399" size={14} /> : <FiCopy size={14} />}
                            {copiedId === pattern.id ? "Copied!" : "Copy Code"}
                          </button>
                        </div>
                        <pre
                          style={{
                            margin: 0,
                            padding: "1.1rem",
                            background: "#0c0b0a",
                            border: "2px solid var(--sketch-border)",
                            borderRadius: "12px",
                            color: "#38bdf8",
                            fontFamily: '"JetBrains Mono", monospace',
                            fontSize: "0.88rem",
                            overflowX: "auto",
                            lineHeight: 1.5,
                          }}
                        >
                          <code>{pattern.templateCode}</code>
                        </pre>
                      </div>
                    )}

                    {/* Common Pitfalls */}
                    {pattern.pitfalls && pattern.pitfalls.length > 0 && (
                      <div
                        style={{
                          background: "rgba(239, 68, 68, 0.08)",
                          borderLeft: "4px solid #ef4444",
                          padding: "0.85rem 1.1rem",
                          borderRadius: "0 12px 12px 0",
                        }}
                      >
                        <h4
                          style={{
                            margin: "0 0 0.35rem 0",
                            fontFamily: "'Architects Daughter', cursive, sans-serif",
                            fontSize: "1.05rem",
                            color: "#f87171",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.4rem",
                          }}
                        >
                          <FiAlertTriangle size={15} /> Common Pitfalls & Gotchas
                        </h4>
                        <ul style={{ margin: 0, paddingLeft: "1.2rem", color: "var(--sketch-text)", fontSize: "1.05rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                          {pattern.pitfalls.map((pit, idx) => (
                            <li key={idx}>{pit}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Time & Space Complexity */}
                    <div style={{ display: "flex", gap: "1.5rem", fontSize: "1rem", color: "var(--sketch-text-muted)", flexWrap: "wrap" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <FiClock size={16} color="#a78bfa" /> <strong>Time Complexity:</strong> {pattern.timeComplexity}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <FiCpu size={16} color="#34d399" /> <strong>Space Complexity:</strong> {pattern.spaceComplexity}
                      </span>
                    </div>

                    {/* Matching Lab Problems */}
                    {pattern.relatedProblemIds && pattern.relatedProblemIds.length > 0 && (
                      <div style={{ borderTop: "2px dashed var(--sketch-border)", paddingTop: "0.9rem", marginTop: "0.25rem" }}>
                        <span
                          style={{
                            fontFamily: "'Architects Daughter', cursive, sans-serif",
                            fontSize: "1rem",
                            color: "var(--sketch-text-muted)",
                            display: "block",
                            marginBottom: "0.5rem",
                          }}
                        >
                          Practice Matching Lab Problems:
                        </span>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                          {pattern.relatedProblemIds.map((probId) => {
                            const prob = getProblemById(probId);
                            return (
                              <a
                                key={probId}
                                href={`${base}dsa/problems/${probId}`}
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "0.35rem",
                                  padding: "0.35rem 0.75rem",
                                  background: "rgba(245, 158, 11, 0.12)",
                                  border: "1.5px solid #f59e0b",
                                  borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px",
                                  color: "#f59e0b",
                                  fontSize: "0.95rem",
                                  textDecoration: "none",
                                  fontWeight: 700,
                                  fontFamily: "'Patrick Hand', cursive, sans-serif",
                                  transition: "all 0.15s ease",
                                }}
                              >
                                <span>{prob ? `${prob.number}. ${prob.title}` : probId}</span>
                                <FiArrowRight size={13} />
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
