import { useState, useMemo, useRef, useEffect } from "react";
import { SQL_DATABASES } from "../../data/sql-curriculum.js";

// ─── HELPERS: Parse foreign key constraints ───

function parseForeignKey(constraintText) {
  if (!constraintText) return null;
  const match = constraintText.match(/FOREIGN KEY\s*[→➡]+\s*(\w+)\.(\w+)/i);
  if (match) return { table: match[1], column: match[2] };
  const refMatch = constraintText.match(/REFERENCES\s+(\w+)\s*\((\w+)\)/i);
  if (refMatch) return { table: refMatch[1], column: refMatch[2] };
  return null;
}

function buildRelationships(schema) {
  const rels = [];
  Object.entries(schema.tables).forEach(([tableName, tableDef]) => {
    tableDef.columns.forEach(col => {
      const fk = parseForeignKey(col.constraints);
      if (fk && fk.table !== tableName) {
        rels.push({
          from: { table: tableName, column: col.name },
          to: { table: fk.table, column: fk.column },
        });
      }
    });
  });
  return rels;
}

// ─── TABLE COLORS ───

const TABLE_COLORS = [
  { bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.3)", header: "rgba(59,130,246,0.15)", headerText: "#60a5fa" },
  { bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.3)", header: "rgba(16,185,129,0.15)", headerText: "#34d399" },
  { bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.3)", header: "rgba(245,158,11,0.15)", headerText: "#fbbf24" },
  { bg: "rgba(139,92,246,0.08)", border: "rgba(139,92,246,0.3)", header: "rgba(139,92,246,0.15)", headerText: "#a78bfa" },
  { bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.3)", header: "rgba(239,68,68,0.15)", headerText: "#f87171" },
  { bg: "rgba(236,72,153,0.08)", border: "rgba(236,72,153,0.3)", header: "rgba(236,72,153,0.15)", headerText: "#f472b6" },
];

// ─── TABLE WIDGET ───

const COL_W = 200;
const COL_H = 32;
const HEADER_H = 38;
const PADDING = 16;
const GAP_X = 60;
const GAP_Y = 80;

function getTableDimensions(tableDef) {
  const w = COL_W + PADDING * 2;
  const h = HEADER_H + tableDef.columns.length * COL_H + PADDING;
  return { w, h };
}

// ─── MAIN COMPONENT ───

export default function SchemaDiagram({ activeDatabase, onClose }) {
  const schema = activeDatabase ? SQL_DATABASES[activeDatabase] : null;
  const containerRef = useRef(null);
  const [hoveredRel, setHoveredRel] = useState(null);
  const [hoveredTable, setHoveredTable] = useState(null);

  const { tableLayouts, relationships, svgWidth, svgHeight } = useMemo(() => {
    if (!schema) return { tableLayouts: [], relationships: [], svgWidth: 800, svgHeight: 400 };

    const tableNames = Object.keys(schema.tables);
    const rels = buildRelationships(schema);

    // Auto-layout: arrange in a grid
    const cols = Math.min(tableNames.length, Math.ceil(Math.sqrt(tableNames.length)));
    const layouts = {};
    let maxX = 0;
    let maxY = 0;

    tableNames.forEach((name, i) => {
      const tDef = schema.tables[name];
      const dim = getTableDimensions(tDef);
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = col * (dim.w + GAP_X);
      const y = row * (dim.h + GAP_Y);
      const color = TABLE_COLORS[i % TABLE_COLORS.length];
      layouts[name] = { x, y, w: dim.w, h: dim.h, color, index: i };
      maxX = Math.max(maxX, x + dim.w);
      maxY = Math.max(maxY, y + dim.h);
    });

    return {
      tableLayouts: layouts,
      relationships: rels,
      svgWidth: maxX + 40,
      svgHeight: maxY + 40,
    };
  }, [schema]);

  if (!schema) {
    return (
      <div className="sql-erd-empty">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.2">
          <ellipse cx="12" cy="5" rx="9" ry="3"/>
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
        </svg>
        <p>No database selected</p>
      </div>
    );
  }

  return (
    <div className="sql-erd-container" ref={containerRef}>
      <div className="sql-erd-header">
        <span className="sql-erd-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"/><circle cx="19" cy="5" r="3"/><circle cx="5" cy="19" r="3"/>
            <line x1="12" y1="9" x2="16.65" y2="7.35"/><line x1="8.59" y1="13.51" x2="6.65" y2="17.04"/>
          </svg>
          {schema.name} Schema Diagram
        </span>
        {onClose && (
          <button className="sql-erd-close" onClick={onClose} title="Close diagram">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        )}
      </div>
      <div className="sql-erd-legend">
        <span className="sql-erd-legend-item">
          <span className="sql-erd-legend-key" style={{ background: "#60a5fa" }} /> PK — Primary Key
        </span>
        <span className="sql-erd-legend-item">
          <span className="sql-erd-legend-key" style={{ background: "#fbbf24" }} /> FK — Foreign Key
        </span>
        <span className="sql-erd-legend-item">
          <span className="sql-erd-legend-key" style={{ background: "#64748b" }} /> Column
        </span>
      </div>
      <div className="sql-erd-canvas-wrapper">
        <div className="sql-erd-canvas" style={{ minWidth: svgWidth, minHeight: svgHeight }}>
          {/* Relationship lines (SVG) */}
          <svg className="sql-erd-svg" width={svgWidth} height={svgHeight} style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}>
            <defs>
              <marker id="erd-arrow-fk" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(251,191,36,0.6)" />
              </marker>
            </defs>
            {relationships.map((rel, i) => {
              const fromLayout = tableLayouts[rel.from.table];
              const toLayout = tableLayouts[rel.to.table];
              if (!fromLayout || !toLayout) return null;

              const fromColIdx = schema.tables[rel.from.table].columns.findIndex(c => c.name === rel.from.column);
              const toColIdx = schema.tables[rel.to.table].columns.findIndex(c => c.name === rel.to.column);

              const x1 = fromLayout.x + fromLayout.w;
              const y1 = fromLayout.y + HEADER_H + fromColIdx * COL_H + COL_H / 2;
              const x2 = toLayout.x;
              const y2 = toLayout.y + HEADER_H + toColIdx * COL_H + COL_H / 2;

              const midX = (x1 + x2) / 2;
              const isHighlighted = hoveredRel === i;

              return (
                <g key={`rel-${i}`} style={{ pointerEvents: "auto", cursor: "pointer" }}
                  onMouseEnter={() => setHoveredRel(i)}
                  onMouseLeave={() => setHoveredRel(null)}
                >
                  <path
                    d={`M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`}
                    fill="none"
                    stroke={isHighlighted ? "rgba(251,191,36,0.9)" : "rgba(251,191,36,0.35)"}
                    strokeWidth={isHighlighted ? 2.5 : 1.5}
                    markerEnd="url(#erd-arrow-fk)"
                    strokeDasharray={isHighlighted ? "none" : "6 3"}
                    style={{ transition: "stroke 0.2s, stroke-width 0.2s" }}
                  />
                  {isHighlighted && (
                    <>
                      <rect
                        x={midX - 70} y={(y1 + y2) / 2 - 14}
                        width="140" height="22" rx="6"
                        fill="#1e293b" stroke="rgba(251,191,36,0.5)"
                      />
                      <text x={midX} y={(y1 + y2) / 2 + 2}
                        textAnchor="middle" fill="#fbbf24"
                        fontSize="10" fontWeight="600"
                        fontFamily="Inter, sans-serif"
                      >
                        {rel.from.column} → {rel.to.table}.{rel.to.column}
                      </text>
                    </>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Table cards */}
          {Object.entries(schema.tables).map(([name, tDef]) => {
            const layout = tableLayouts[name];
            if (!layout) return null;
            const isHovered = hoveredTable === name;

            return (
              <div
                key={name}
                className={`sql-erd-table ${isHovered ? "hovered" : ""}`}
                style={{
                  position: "absolute",
                  left: layout.x,
                  top: layout.y,
                  width: layout.w,
                }}
                onMouseEnter={() => setHoveredTable(name)}
                onMouseLeave={() => setHoveredTable(null)}
              >
                <div
                  className="sql-erd-table-header"
                  style={{ background: layout.color.header, borderBottom: `1px solid ${layout.color.border}` }}
                >
                  <span style={{ color: layout.color.headerText }}>{name}</span>
                  <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.6rem", fontWeight: 400 }}>
                    {tDef.columns.length} cols
                  </span>
                </div>
                {tDef.columns.map(col => {
                  const isPK = col.constraints?.includes("PRIMARY KEY");
                  const isFK = col.constraints?.includes("FOREIGN KEY") || col.constraints?.includes("REFERENCES");
                  const isEmpty = !col.constraints || col.constraints.trim() === "";

                  return (
                    <div key={col.name} className="sql-erd-column" style={{ background: layout.bg }}>
                      <span className="sql-erd-col-name">
                        {isPK && <span className="sql-erd-badge pk" title="Primary Key">PK</span>}
                        {isFK && <span className="sql-erd-badge fk" title="Foreign Key">FK</span>}
                        {!isPK && !isFK && isEmpty && <span className="sql-erd-badge col" />}
                        {col.name}
                      </span>
                      <span className="sql-erd-col-type">{col.type}</span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
