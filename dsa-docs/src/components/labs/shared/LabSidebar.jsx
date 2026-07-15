import { useState } from "react";
import { FiBook, FiCheck, FiChevronDown, FiChevronRight } from "react-icons/fi";

export default function LabSidebar({
  title = "Curriculum",
  playground,
  sections = [],
  className = "",
  ...rest
}) {
  // Track expanded state for each section. Default first section to expanded.
  const [expandedSections, setExpandedSections] = useState(() => {
    const initial = {};
    sections.forEach((sec, idx) => {
      initial[sec.key] = idx === 0;
    });
    return initial;
  });

  const toggleSection = (key) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className={`jsl-sidebar ${className}`} {...rest}>
      <div className="jsl-sidebar-header">
        <h3>
          <FiBook size={16} /> {title}
        </h3>
      </div>

      {/* Playground / Sandbox Shortcut if configured */}
      {playground && (
        <div className="jsl-sidebar-group">
          <button
            className={`jsl-sg-header ${playground.isActive ? "expanded" : ""}`}
            onClick={playground.onSelect}
            style={{ width: "100%", textAlign: "left" }}
          >
            <div
              className="jsl-sg-title"
              style={{
                color: playground.isActive
                  ? playground.color || "var(--accent)"
                  : "var(--lab-text-body)",
                fontWeight: 600,
              }}
            >
              <FiBook size={16} /> <span>{playground.label}</span>
            </div>
          </button>
        </div>
      )}

      {/* Curriculum Sections */}
      {sections.map((sec) => {
        const isExpanded = expandedSections[sec.key];
        const sectionColor = sec.color || "var(--lab-text-body)";

        return (
          <div className="jsl-sidebar-group" key={sec.key}>
            <button
              className={`jsl-sg-header ${sec.key} ${isExpanded ? "expanded" : ""}`}
              onClick={() => toggleSection(sec.key)}
              style={{ width: "100%", display: "flex", alignItems: "center" }}
            >
              <div className="jsl-sg-title" style={{ color: sectionColor }}>
                <FiBook size={16} />
                <span>{sec.label}</span>
              </div>
              {sec.progressText && (
                <span className="jsl-sg-count">{sec.progressText}</span>
              )}
              {isExpanded ? (
                <FiChevronDown size={14} style={{ marginLeft: "auto" }} />
              ) : (
                <FiChevronRight size={14} style={{ marginLeft: "auto" }} />
              )}
            </button>

            {isExpanded && (
              <div className="jsl-sg-items">
                {sec.items.map((item, idx) => {
                  const active = sec.isItemActive(item);
                  const done = sec.isItemDone(item);

                  return (
                    <button
                      key={item.id}
                      className={`jsl-si ${active ? "active" : ""} ${done ? "done" : ""}`}
                      onClick={() => sec.onSelectItem(item)}
                      style={{ width: "100%", textAlign: "left" }}
                    >
                      {/* Chapter/Index number */}
                      {sec.renderItemNumber ? (
                        sec.renderItemNumber(item, idx)
                      ) : (
                        <span className="jsl-si-num">
                          {item.chapter || idx + 1}.
                        </span>
                      )}

                      {/* Item Title */}
                      <span className="jsl-si-title">
                        {sec.renderItemTitle ? sec.renderItemTitle(item) : item.title}
                      </span>

                      {/* Level Badge (e.g. B, I, H difficulty) */}
                      {sec.renderItemBadge
                        ? sec.renderItemBadge(item)
                        : item.level && (
                            <span
                              className={`jsl-si-level ${item.level.toLowerCase()}`}
                            >
                              {item.level[0]}
                            </span>
                          )}

                      {/* Status Indicators (Checkmark or Lock) */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          marginLeft: "auto",
                        }}
                      >
                        {done && (
                          <span className="jsl-si-check">
                            <FiCheck size={16} />
                          </span>
                        )}
                        {!done && item.locked && (
                          <span
                            title="Locked"
                            style={{ color: "#94a3b8", fontSize: "0.75rem" }}
                          >
                            &lock;
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
