import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import ThemeToggle from "../ThemeToggle.jsx";
import Editor from "@monaco-editor/react";
import initSqlJs from "sql.js";
import Skeleton, { SkeletonLabPlatform } from "../Skeleton.jsx";
import { SQL_LESSONS, SQL_CHALLENGES, SQL_PROJECTS, SQL_DATABASES, createSampleDatabase, createEmptyDatabase } from "../../data/sql-curriculum.js";
import SchemaDiagram from "./SchemaDiagram.jsx";

// ─── ICONS ───

function BookIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/><line x1="8" y1="7" x2="16" y2="7"/></svg>; }
function ChallengeIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="8 12 11 15 16 9"/></svg>; }
function ProjectIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="3" y1="9" x2="21" y2="9"/></svg>; }
function DatabaseIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>; }
function TableIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>; }
function CheckIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>; }

// ─── RESIZABLE HANDLE ───

function ResizableHandle({ onDrag, orientation = "vertical" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMouseDown = (e) => {
      e.preventDefault();
      document.body.style.cursor = orientation === "vertical" ? "col-resize" : "row-resize";
      document.body.style.userSelect = "none";
      const onMouseMove = (e) => onDrag({ clientX: e.clientX, clientY: e.clientY });
      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      };
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };
    el.addEventListener("mousedown", onMouseDown);
    return () => el.removeEventListener("mousedown", onMouseDown);
  }, [onDrag, orientation]);
  return <div ref={ref} className={`jsl-resize-handle ${orientation}`} />;
}

// ─── SQL ENGINE ───

let sqlEngine = null;
let sqlInitPromise = null;

function getSqlEngine() {
  if (sqlEngine) return Promise.resolve(sqlEngine);
  if (sqlInitPromise) return sqlInitPromise;
  const base = (typeof window !== "undefined" && typeof document !== "undefined"
    ? (document.querySelector('base')?.href || (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/"))
    : "/");
  sqlInitPromise = initSqlJs({ locateFile: () => `${base}sql-wasm.wasm` }).then(SQL => {
    sqlEngine = SQL;
    return SQL;
  });
  return sqlInitPromise;
}

function createFreshDatabase() {
  const db = new sqlEngine.Database();
  createSampleDatabase(db);
  return db;
}

// ─── SCHEMA EXPLORER ───

function SchemaExplorer({ db, activeDatabase, onSelectDatabase }) {
  const [expandedTables, setExpandedTables] = useState({});
  const schema = activeDatabase ? SQL_DATABASES[activeDatabase] : null;

  const toggleTable = (name) => {
    setExpandedTables(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="sql-schema-section">
      <div className="sql-schema-active">
        <DatabaseIcon />
        <span>{schema?.name || "No DB"}</span>
      </div>

      <div style={{ padding: "0.35rem 0.85rem" }}>
        <select
          className="sql-db-select"
          value={activeDatabase}
          onChange={e => onSelectDatabase(e.target.value)}
        >
          {Object.entries(SQL_DATABASES).map(([key, db]) => (
            <option key={key} value={key}>{db.name}</option>
          ))}
        </select>
      </div>

      {schema && Object.entries(schema.tables).map(([name, tableDef]) => (
        <div key={name}>
          <button
            className="sql-table-item"
            onClick={() => toggleTable(name)}
          >
            <TableIcon />
            <span>{name}</span>
            <svg
              width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
              style={{ marginLeft: "auto", transform: expandedTables[name] ? "rotate(90deg)" : "", transition: "transform 0.15s" }}
            >
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
          {expandedTables[name] && (
            <div className="sql-column-list">
              {tableDef.columns.map(col => (
                <div key={col.name} className="sql-column-item">
                  <span className="sql-col-name">{col.name}</span>
                  <span className="sql-col-type">{col.type}</span>
                  {col.constraints && <span className="sql-col-constraint">{col.constraints}</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── SIDEBAR ───

function SQLSidebar({ activeSection, activeLesson, activeChallenge, activeProject, onSelectLesson, onSelectChallenge, onSelectProject, progress, db, activeDatabase, onSelectDatabase, ...rest }) {
  const [expandedSections, setExpandedSections] = useState({ learn: true, challenges: false, projects: false });

  const toggleSection = (key) => setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="sql-sidebar" {...rest}>
      <div className="sql-sidebar-header">
        <h3><BookIcon /> Curriculum</h3>
      </div>

      {/* Schema Explorer */}
      <SchemaExplorer db={db} activeDatabase={activeDatabase} onSelectDatabase={onSelectDatabase} />

      {/* LEARN SQL */}
      <div className="jsl-sidebar-group">
        <button className={`sql-sg-header ${expandedSections.learn ? "expanded" : ""}`} onClick={() => toggleSection("learn")}>
          <div className="sql-sg-title"><BookIcon /><span>LEARN SQL</span></div>
          <span className="sql-sg-count">{progress.lessonsDone}/{progress.lessonsTotal}</span>
          <svg className="sql-sg-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        {expandedSections.learn && (
          <div className="sql-sg-items">
            {SQL_LESSONS.map((lesson) => (
              <button
                key={lesson.id}
                className={`sql-si ${activeSection === "learn" && activeLesson === lesson.id ? "active" : ""} ${progress.lessons.includes(lesson.id) ? "done" : ""}`}
                onClick={() => onSelectLesson(lesson.id)}
              >
                <span className="sql-si-num">{lesson.chapter}.</span>
                <span className="sql-si-title">{lesson.title}</span>
                <span className={`sql-si-level ${lesson.level.toLowerCase()}`}>{lesson.level[0]}</span>
                {progress.lessons.includes(lesson.id) && <span className="sql-si-check"><CheckIcon /></span>}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* QUERY CHALLENGES */}
      <div className="jsl-sidebar-group">
        <button className={`sql-sg-header ${expandedSections.challenges ? "expanded" : ""}`} onClick={() => toggleSection("challenges")}>
          <div className="sql-sg-title"><ChallengeIcon /><span>CHALLENGES</span></div>
          <span className="sql-sg-count">{progress.challengesDone}/{progress.challengesTotal}</span>
          <svg className="sql-sg-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        {expandedSections.challenges && (
          <div className="sql-sg-items">
            {SQL_CHALLENGES.map((c, i) => (
              <button
                key={c.id}
                className={`sql-si ${activeSection === "challenge" && activeChallenge === c.id ? "active" : ""} ${progress.challenges.includes(c.id) ? "done" : ""}`}
                onClick={() => onSelectChallenge(c.id)}
              >
                <span className="sql-si-num">{i + 1}.</span>
                <span className="sql-si-title">{c.title.replace(/^\d+\.\s*/, "")}</span>
                <span className={`sql-si-level ${c.difficulty.toLowerCase()}`}>{c.difficulty[0]}</span>
                {progress.challenges.includes(c.id) && <span className="sql-si-check"><CheckIcon /></span>}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* DATABASE PROJECTS */}
      <div className="jsl-sidebar-group">
        <button className={`sql-sg-header projects ${expandedSections.projects ? "expanded" : ""}`} onClick={() => toggleSection("projects")}>
          <div className="sql-sg-title"><ProjectIcon /><span>PROJECTS</span></div>
          <span className="sql-sg-count">{progress.projectsDone}/{progress.projectsTotal}</span>
          <svg className="sql-sg-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        {expandedSections.projects && (
          <div className="sql-sg-items">
            {SQL_PROJECTS.map((proj, i) => {
              const milestoneCount = proj.milestones.length;
              const doneCount = (progress.projects[proj.id] || []).length;
              const isComplete = doneCount >= milestoneCount;
              return (
                <button
                  key={proj.id}
                  className={`sql-si ${activeSection === "project" && activeProject === proj.id ? "active" : ""} ${isComplete ? "done" : ""}`}
                  onClick={() => onSelectProject(proj.id)}
                >
                  <span className="sql-si-num">{proj.icon || `${i + 1}.`}</span>
                  <span className="sql-si-title">{proj.title}</span>
                  <span className={`sql-si-level ${proj.difficulty.toLowerCase()}`}>{proj.difficulty[0]}</span>
                  {isComplete && <span className="sql-si-check"><CheckIcon /></span>}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── RESULTS TABLE ───

function ResultsView({ batches }) {
  if (!batches || batches.length === 0) {
    return <div className="sql-results-empty">Query executed successfully — 0 rows returned</div>;
  }

  if (batches.length === 1) {
    return <SingleResultTable batch={batches[0]} />;
  }

  return (
    <div className="sql-multi-results">
      {batches.map((batch, i) => (
        <div key={i} className="sql-batch-result">
          <div className="sql-batch-label">
            <span className="sql-batch-num">{i + 1}</span>
            <code className="sql-batch-query">{batch.query}</code>
            <span className="sql-batch-count">{batch.values?.length || 0} rows</span>
          </div>
          <SingleResultTable batch={batch} />
        </div>
      ))}
    </div>
  );
}

function SingleResultTable({ batch }) {
  const { columns, values } = batch;

  if (!columns || columns.length === 0 || !values || values.length === 0) {
    return <div className="sql-results-empty">Query executed successfully — 0 rows returned</div>;
  }

  return (
    <table className="sql-results-table">
      <thead>
        <tr>
          <th>#</th>
          {columns.map(col => <th key={col}>{col}</th>)}
        </tr>
      </thead>
      <tbody>
        {values.map((row, ri) => (
          <tr key={ri}>
            <td style={{ color: "#64748b", fontSize: "0.72rem" }}>{ri + 1}</td>
            {row.map((cell, ci) => (
              <td key={ci} className={cell === null ? "sql-results-null" : typeof cell === "number" ? "sql-results-numeric" : ""}>
                {cell === null ? <span className="sql-results-null">NULL</span> : String(cell)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ─── MAIN PLATFORM ───

export default function SQLLabsPlatform() {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("learn");
  const [activeLesson, setActiveLesson] = useState(SQL_LESSONS[0]?.id || null);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [query, setQuery] = useState(SQL_LESSONS[0]?.starterQuery || "");
  const [results, setResults] = useState({ batches: [], totalRows: 0, totalAffected: 0, executionTime: 0 });
  const [queryError, setQueryError] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showSchema, setShowSchema] = useState(false);
  const [monacoTheme, setMonacoTheme] = useState("jsl-dark");
  const [progress, setProgress] = useState({ lessons: [], challenges: [], projects: {} });
  const [isRunning, setIsRunning] = useState(false);
  const [dbReady, setDbReady] = useState(false);
  const dbRef = useRef(null);
  const editorRef = useRef(null);
  const codeVersionRef = useRef(0);
  const editorPanelRef = useRef(null);
  const contentPanelRef = useRef(null);
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const [contentRatio, setContentRatio] = useState(0.5);
  const [resultsHeight, setResultsHeight] = useState(220);
  const bodyRef = useRef(null);
  const workspaceRef = useRef(null);
  const [activeDatabase, setActiveDatabase] = useState("employees");
  const [dbKey, setDbKey] = useState(0);

  // Initialize sql.js engine
  useEffect(() => {
    getSqlEngine().then(() => {
      const db = createFreshDatabase();
      dbRef.current = db;
      setDbReady(true);
      setLoading(false);
    });
    return () => {
      if (dbRef.current) {
        try { dbRef.current.close(); } catch {}
      }
    };
  }, []);

  // Recreate database when active database changes
  useEffect(() => {
    if (dbReady && sqlEngine) {
      if (dbRef.current) {
        try { dbRef.current.close(); } catch {}
      }
      const db = new sqlEngine.Database();
      if (activeDatabase === "blank") {
        createEmptyDatabase(db);
      } else {
        createSampleDatabase(db);
      }
      dbRef.current = db;
      setDbKey(k => k + 1);
    }
  }, [activeDatabase, dbReady]);

  // Load progress
  useEffect(() => {
    try {
      const stored = JSON.parse(sessionStorage.getItem("sql-progress") || '{"lessons":[],"challenges":[],"projects":{}}');
      setProgress(stored);
    } catch {}
  }, []);

  const saveProgress = useCallback((newProgress) => {
    setProgress(newProgress);
    try { sessionStorage.setItem("sql-progress", JSON.stringify(newProgress)); } catch {}
  }, []);

  const markLessonDone = useCallback((id) => {
    if (!progress.lessons.includes(id)) saveProgress({ ...progress, lessons: [...progress.lessons, id] });
  }, [progress, saveProgress]);

  const markChallengeDone = useCallback((id) => {
    if (!progress.challenges.includes(id)) saveProgress({ ...progress, challenges: [...progress.challenges, id] });
  }, [progress, saveProgress]);

  const markMilestoneDone = useCallback((projectId, milestoneIdx) => {
    const projectMilestones = progress.projects[projectId] || [];
    if (!projectMilestones.includes(milestoneIdx)) {
      saveProgress({
        ...progress,
        projects: { ...progress.projects, [projectId]: [...projectMilestones, milestoneIdx] },
      });
    }
  }, [progress, saveProgress]);

  const progressStats = useMemo(() => {
    const projectMilestonesTotal = SQL_PROJECTS.reduce((acc, p) => acc + p.milestones.length, 0);
    const projectMilestonesDone = Object.values(progress.projects).reduce((acc, ms) => acc + ms.length, 0);
    const totalItems = SQL_LESSONS.length + SQL_CHALLENGES.length + projectMilestonesTotal;
    const totalDone = progress.lessons.length + progress.challenges.length + projectMilestonesDone;
    return {
      lessonsDone: progress.lessons.length,
      lessonsTotal: SQL_LESSONS.length,
      challengesDone: progress.challenges.length,
      challengesTotal: SQL_CHALLENGES.length,
      projectsDone: projectMilestonesDone,
      projectsTotal: projectMilestonesTotal,
      total: totalDone,
      totalAll: totalItems,
      pct: Math.round((totalDone / (totalItems || 1)) * 100),
      lessons: progress.lessons,
      challenges: progress.challenges,
      projects: progress.projects,
    };
  }, [progress]);

  const currentLesson = useMemo(() => SQL_LESSONS.find(l => l.id === activeLesson), [activeLesson]);
  const currentChallenge = useMemo(() => SQL_CHALLENGES.find(c => c.id === activeChallenge), [activeChallenge]);
  const currentProject = useMemo(() => SQL_PROJECTS.find(p => p.id === activeProject), [activeProject]);

  const selectLesson = (id) => {
    const lesson = SQL_LESSONS.find(l => l.id === id);
    if (!lesson) return;
    setView("learn");
    setActiveLesson(id);
    setActiveChallenge(null);
    setActiveProject(null);
    setActiveMilestone(0);
    setQuery(lesson.starterQuery);
    setShowHint(false);
    setShowSolution(false);
    setResults({ batches: [], totalRows: 0, totalAffected: 0, executionTime: 0 });
    setQueryError(null);
    codeVersionRef.current++;
    if (lesson.database) setActiveDatabase(lesson.database);
  };

  const selectChallenge = (id) => {
    const challenge = SQL_CHALLENGES.find(c => c.id === id);
    if (!challenge) return;
    setView("challenge");
    setActiveLesson(null);
    setActiveChallenge(id);
    setActiveProject(null);
    setActiveMilestone(0);
    setQuery("-- Write your SQL query here\n");
    setShowHint(false);
    setShowSolution(false);
    setResults({ batches: [], totalRows: 0, totalAffected: 0, executionTime: 0 });
    setQueryError(null);
    codeVersionRef.current++;
    if (challenge.database) setActiveDatabase(challenge.database);
  };

  const selectProject = (id) => {
    const project = SQL_PROJECTS.find(p => p.id === id);
    if (!project) return;
    setView("project");
    setActiveLesson(null);
    setActiveChallenge(null);
    setActiveProject(id);
    setActiveMilestone(0);
    const firstMilestone = project.milestones[0];
    setQuery(firstMilestone ? `-- Milestone ${1}: ${firstMilestone.title}\n${firstMilestone.solutionQuery.split("\n")[0]}\n` : "-- Write your SQL query here\n");
    setShowHint(false);
    setShowSolution(false);
    setResults({ batches: [], totalRows: 0, totalAffected: 0, executionTime: 0 });
    setQueryError(null);
    codeVersionRef.current++;
    setActiveDatabase("blank");
  };

  const defineThemes = useCallback((monaco) => {
    monaco.editor.defineTheme("jsl-dark", {
      base: "vs-dark", inherit: true,
      rules: [
        { token: "comment", foreground: "64748b", fontStyle: "italic" },
        { token: "keyword", foreground: "a78bfa" },
        { token: "keyword.control", foreground: "a78bfa" },
        { token: "string", foreground: "34d399" },
        { token: "number", foreground: "f59e0b" },
        { token: "type", foreground: "2dd4bf" },
        { token: "function", foreground: "60a5fa" },
        { token: "variable", foreground: "e2e8f0" },
        { token: "delimiter", foreground: "94a3b8" },
      ],
      colors: {
        "editor.background": "#0a0f1e",
        "editor.foreground": "#e2e8f0",
        "editor.lineHighlightBackground": "#0d1525",
        "editor.selectionBackground": "rgba(96,165,250,0.25)",
        "editorCursor.foreground": "#60a5fa",
        "editorLineNumber.foreground": "#475569",
        "editorLineNumber.activeForeground": "#94a3b8",
        "editorWidget.background": "#0f172a",
        "editorWidget.border": "rgba(255,255,255,0.06)",
        "editorGutter.background": "#0a0f1e",
      },
    });
    monaco.editor.defineTheme("jsl-light", {
      base: "vs", inherit: true,
      rules: [
        { token: "comment", foreground: "94a3b8", fontStyle: "italic" },
        { token: "keyword", foreground: "7c3aed" },
        { token: "string", foreground: "059669" },
        { token: "number", foreground: "d97706" },
      ],
      colors: {
        "editor.background": "#ffffff",
        "editor.foreground": "#1e293b",
        "editor.lineHighlightBackground": "#f8fafc",
        "editorCursor.foreground": "#2563eb",
        "editorLineNumber.foreground": "#94a3b8",
      },
    });
    // Register SQL language for auto-completions
    monaco.languages.registerCompletionItemProvider("sql", {
      provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };
        const suggestions = [
          "SELECT", "FROM", "WHERE", "JOIN", "LEFT", "RIGHT", "INNER",
          "ON", "AND", "OR", "NOT", "IN", "LIKE", "BETWEEN", "IS", "NULL",
          "GROUP", "BY", "HAVING", "ORDER", "ASC", "DESC", "LIMIT",
          "OFFSET", "AS", "DISTINCT", "COUNT", "SUM", "AVG", "MIN", "MAX",
          "CASE", "WHEN", "THEN", "ELSE", "END", "OVER", "PARTITION",
          "ROW_NUMBER", "RANK", "DENSE_RANK", "WITH", "RECURSIVE",
          "CREATE", "VIEW", "DROP", "INSERT", "UPDATE", "DELETE",
          "INNER", "OUTER", "CROSS", "EXISTS", "UNION", "ALL",
          "COALESCE", "NULLIF", "CAST", "ROUND", "strftime", "julianday",
        ].map(kw => ({
          label: kw,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: kw,
          range,
        }));
        return { suggestions };
      },
    });
  }, []);

  const handleEditorMount = useCallback((editor, monaco) => {
    editorRef.current = editor;
    defineThemes(monaco);
    monaco.editor.setTheme(monacoTheme);
    const remeasure = () => { try { editor.remeasureFonts(); } catch {} };
    setTimeout(remeasure, 50);
    setTimeout(remeasure, 500);
  }, [defineThemes, monacoTheme]);

  useEffect(() => {
    const onResize = () => { if (editorRef.current) { try { editorRef.current.remeasureFonts(); } catch {} } };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleCodeChange = useCallback((v) => setQuery(v || ""), []);

  const handleSidebarDrag = useCallback(({ clientX }) => {
    if (!bodyRef.current) return;
    setSidebarWidth(Math.max(180, Math.min(500, clientX - bodyRef.current.getBoundingClientRect().left)));
  }, []);

  const handleContentDrag = useCallback(({ clientX }) => {
    if (!workspaceRef.current) return;
    const rect = workspaceRef.current.getBoundingClientRect();
    setContentRatio(Math.max(0.2, Math.min(0.8, (clientX - rect.left) / rect.width)));
  }, []);

  const handleResultsDrag = useCallback(({ clientY }) => {
    if (!editorPanelRef.current) return;
    const rect = editorPanelRef.current.getBoundingClientRect();
    setResultsHeight(Math.max(100, Math.min(rect.height * 0.7, rect.bottom - clientY)));
  }, []);

  const goNextLesson = () => {
    const idx = SQL_LESSONS.findIndex(l => l.id === activeLesson);
    if (idx < SQL_LESSONS.length - 1) selectLesson(SQL_LESSONS[idx + 1].id);
  };
  const goPrevLesson = () => {
    const idx = SQL_LESSONS.findIndex(l => l.id === activeLesson);
    if (idx > 0) selectLesson(SQL_LESSONS[idx - 1].id);
  };

  // Run query
  const runQuery = useCallback(() => {
    if (!dbRef.current) return;
    setIsRunning(true);
    setQueryError(null);

    const startTime = performance.now();

    try {
      const trimmed = query.trim();
      if (!trimmed || trimmed.startsWith("--")) {
        setResults({ batches: [], totalRows: 0, totalAffected: 0, executionTime: 0 });
        setQueryError("Enter a SQL query to execute");
        setIsRunning(false);
        return;
      }

      // Support multiple statements in batches
      const statements = trimmed
        .replace(/--[^\n]*/g, "")
        .split(";")
        .map(s => s.trim())
        .filter(s => s.length > 0);

      const batches = [];
      let totalRows = 0;
      let totalAffected = 0;

      const db = dbRef.current;
      db.run("PRAGMA foreign_keys = OFF;");

      for (const stmt of statements) {
        if (stmt.toUpperCase().startsWith("SELECT") ||
            stmt.toUpperCase().startsWith("WITH") ||
            stmt.toUpperCase().startsWith("PRAGMA")) {
          const res = db.exec(stmt);
          if (res.length > 0) {
            batches.push({
              query: stmt,
              columns: res[0].columns,
              values: res[0].values,
            });
            totalRows += res[0].values.length;
          } else {
            batches.push({
              query: stmt,
              columns: [],
              values: [],
            });
          }
        } else {
          db.run(stmt);
          totalAffected += db.getRowsModified();
        }
      }

      const endTime = performance.now();
      const executionTime = Math.round((endTime - startTime) * 100) / 100;

      setResults({
        batches,
        totalRows,
        totalAffected,
        executionTime,
      });
    } catch (e) {
      setQueryError(e.message);
      setResults({ batches: [], totalRows: 0, totalAffected: 0, executionTime: 0 });
    } finally {
      setIsRunning(false);
      if (dbRef.current) {
        try { dbRef.current.run("PRAGMA foreign_keys = ON;"); } catch {}
      }
    }
  }, [query]);

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        runQuery();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [runQuery]);

  const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");

  const currentContent = useMemo(() => {
    if (view === "learn") return currentLesson;
    if (view === "challenge") return currentChallenge;
    if (view === "project") return currentProject;
    return null;
  }, [view, currentLesson, currentChallenge, currentProject]);

  // Render landing if DB not ready
  if (loading) {
    return (
      <div className="sql-platform">
        <SkeletonLabPlatform />
      </div>
    );
  }

  if (!dbReady) {
    return (
      <div className="sql-platform">
        <div className="jsl-empty" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", color: "#64748b", flexDirection: "column", gap: "1rem" }}>
          <div className="sql-spinner" style={{ width: 24, height: 24 }} />
          <p>Loading SQL engine...</p>
        </div>
      </div>
    );
  }

  if (!currentContent) {
    return (
      <div className="sql-platform">
        <div className="jsl-empty" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", color: "#64748b", flexDirection: "column", gap: "0.5rem" }}>
          <h2 style={{ color: "#e2e8f0" }}>Welcome to SQL Labs</h2>
          <p>Select a lesson or challenge from the sidebar to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="sql-platform" key={dbKey}>
      {/* Top Bar */}
      <div className="sql-topbar">
        <div className="sql-topbar-left">
          <a href={`${base}labs`} className="sql-top-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Labs
          </a>
          <div className="sql-top-brand">
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="8" fill="#f59e0b" />
              <text x="14" y="19" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">SQL</text>
            </svg>
            <span className="sql-top-title">SQL Labs</span>
          </div>
        </div>
        <div className="sql-topbar-center">
          <span className="sql-top-progress-text">{progressStats.total}/{progressStats.totalAll} completed</span>
          <div className="sql-top-progress-bar"><div className="sql-top-progress-fill" style={{ width: `${progressStats.pct}%` }} /></div>
          <span className="sql-top-percent">{progressStats.pct}%</span>
        </div>
        <div className="sql-topbar-right">
          <ThemeToggle />
          <button className="sql-btn-icon" onClick={() => setMonacoTheme(t => t === "jsl-dark" ? "jsl-light" : "jsl-dark")} title="Toggle theme">
            {monacoTheme === "jsl-dark" ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
            )}
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="sql-main">
        <div className="sql-body" ref={bodyRef}>
          {/* Sidebar */}
          <SQLSidebar
            activeSection={view}
            activeLesson={activeLesson}
            activeChallenge={activeChallenge}
            activeProject={activeProject}
            onSelectLesson={selectLesson}
            onSelectChallenge={selectChallenge}
            onSelectProject={selectProject}
            progress={progressStats}
            db={dbRef.current}
            activeDatabase={activeDatabase}
            onSelectDatabase={setActiveDatabase}
            style={{ width: sidebarWidth }}
          />
          <ResizableHandle onDrag={handleSidebarDrag} />

          {/* Content & Editor */}
          <div className="sql-workspace" ref={workspaceRef}>
            {/* Content Panel (left side) */}
            <div className="sql-content-panel" ref={contentPanelRef} style={{ flex: `${contentRatio} 1 0` }}>
              <div className="sql-content-scroll">
                {showSchema ? (
                  <SchemaDiagram activeDatabase={activeDatabase} onClose={() => setShowSchema(false)} />
                ) : (
                  <>
                    {view === "learn" && currentLesson && (
                      <LessonView
                        lesson={currentLesson}
                        showHint={showHint}
                        showSolution={showSolution}
                        onToggleHint={() => setShowHint(h => !h)}
                        onToggleSolution={() => setShowSolution(s => !s)}
                        onPrev={goPrevLesson}
                        onNext={goNextLesson}
                        hasPrev={SQL_LESSONS.findIndex(l => l.id === activeLesson) > 0}
                        hasNext={SQL_LESSONS.findIndex(l => l.id === activeLesson) < SQL_LESSONS.length - 1}
                        onMarkDone={() => markLessonDone(currentLesson.id)}
                        isDone={progress.lessons.includes(currentLesson.id)}
                      />
                    )}
                    {view === "challenge" && currentChallenge && (
                      <ChallengeView
                        challenge={currentChallenge}
                        showHint={showHint}
                        showSolution={showSolution}
                        onToggleHint={() => setShowHint(h => !h)}
                        onToggleSolution={() => setShowSolution(s => !s)}
                        onMarkDone={() => markChallengeDone(currentChallenge.id)}
                        isDone={progress.challenges.includes(currentChallenge.id)}
                      />
                    )}
                    {view === "project" && currentProject && (
                      <ProjectView
                        project={currentProject}
                        activeMilestone={activeMilestone}
                        showHint={showHint}
                        showSolution={showSolution}
                        onToggleHint={() => setShowHint(h => !h)}
                        onToggleSolution={() => setShowSolution(s => !s)}
                        onMilestoneChange={(idx) => {
                          setActiveMilestone(idx);
                          const milestone = currentProject.milestones[idx];
                          if (milestone) {
                            setQuery(milestone.solutionQuery);
                            setShowHint(false);
                            setShowSolution(false);
                            setResults({ batches: [], totalRows: 0, totalAffected: 0, executionTime: 0 });
                            setQueryError(null);
                            codeVersionRef.current++;
                          }
                        }}
                        onMarkDone={() => markMilestoneDone(currentProject.id, activeMilestone)}
                        isDone={progress.projects[currentProject.id]?.includes(activeMilestone)}
                      />
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Editor + Results Panel (right side) */}
            <ResizableHandle onDrag={handleContentDrag} />
            <div className="sql-editor-panel" ref={editorPanelRef} style={{ flex: `${1 - contentRatio} 1 0` }}>
              {/* Editor Actions */}
              <div className="sql-editor-actions">
                <button className="sql-btn-run" onClick={runQuery} disabled={isRunning} title="Ctrl+Enter to run">
                  {isRunning ? (
                    <><span className="sql-spinner" /> Running</>
                  ) : (
                    <><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg> Run Query</>
                  )}
                </button>
                <button className="sql-btn-secondary" onClick={() => {
                  let starter = "";
                  if (view === "learn" && currentLesson) starter = currentLesson.starterQuery;
                  else if (view === "challenge") starter = "-- Write your SQL query here\n";
                  if (editorRef.current) editorRef.current.setValue(starter);
                  setQuery(starter);                  setResults({ batches: [], totalRows: 0, totalAffected: 0, executionTime: 0 });
                  setQueryError(null);
                  codeVersionRef.current++;
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
                Reset
                </button>
                <span className="sql-editor-lang">SQL</span>
                <button className={`sql-btn-schema ${showSchema ? "active" : ""}`} onClick={() => setShowSchema(s => !s)} title="Toggle schema diagram">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3"/><circle cx="19" cy="5" r="3"/><circle cx="5" cy="19" r="3"/>
                    <line x1="12" y1="9" x2="16.65" y2="7.35"/><line x1="8.59" y1="13.51" x2="6.65" y2="17.04"/>
                  </svg>
                  Schema
                </button>
                <span className="sql-editor-shortcut">Ctrl+Enter to run</span>
              </div>

              {/* Monaco Editor */}
              <div className="sql-editor-wrapper">
                <Editor
                  key={`editor-${codeVersionRef.current}`}
                  height="100%"
                  language="sql"
                  theme={monacoTheme}
                  value={query}
                  onChange={handleCodeChange}
                  onMount={handleEditorMount}
                  options={{
                    fontSize: 13,
                    fontFamily: "Consolas, 'Courier New', monospace",
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    lineNumbers: "on",
                    tabSize: 2,
                    insertSpaces: true,
                    wordWrap: "on",
                    automaticLayout: true,
                    padding: { top: 12, bottom: 12 },
                    cursorBlinking: "smooth",
                    smoothScrolling: true,
                    folding: true,
                    lineNumbersMinChars: 3,
                  }}
                />
              </div>

              {/* Results Panel */}
              <ResizableHandle onDrag={handleResultsDrag} orientation="horizontal" />
              <div className="sql-results-panel" style={{ height: resultsHeight, maxHeight: resultsHeight, minHeight: resultsHeight }}>
                <div className="sql-results-header">
                  <span>Query Results</span>
                  <div className="sql-results-info">
                    {queryError ? (
                      <span className="sql-results-error">✗ {queryError}</span>
                    ) : results.batches.length > 0 || results.totalAffected > 0 ? (
                      <>
                        {results.totalRows > 0 && (
                          <span className="sql-results-count">{results.totalRows} rows returned ({results.batches.length} quer{results.batches.length === 1 ? "y" : "ies"})</span>
                        )}
                        {results.totalAffected > 0 && (
                          <span className="sql-results-success">✓ {results.totalAffected} rows affected</span>
                        )}
                        {results.executionTime > 0 && (
                          <span className="sql-results-count">{results.executionTime}ms</span>
                        )}
                      </>
                    ) : null}
                  </div>
                </div>
                <div className="sql-results-body">
                  {!query && !queryError ? (
                    <div className="sql-results-empty">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                      <p>Write a SQL query and click Run</p>
                    </div>
                  ) : queryError ? (
                    <div className="sql-results-empty" style={{ color: "#f87171" }}>
                      <p>{queryError}</p>
                    </div>
                  ) : (
                    <ResultsView batches={results.batches} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="jsl-footer">
        <div className="jsl-footer-inner">
          <p>Built by <strong>Prathamesh Pawar</strong></p>
        </div>
      </footer>
    </div>
  );
}

// ─── LESSON VIEW ───

function LessonView({ lesson, showHint, showSolution, onToggleHint, onToggleSolution, onPrev, onNext, hasPrev, hasNext, onMarkDone, isDone }) {
  const levelColor = lesson.level === "Beginner" ? "#22c55e" : lesson.level === "Intermediate" ? "#f59e0b" : "#ef4444";

  return (
    <div className="sql-content-inner">
      <div className="sql-chapter-header">
        <span className="sql-chapter-badge">Chapter {lesson.chapter}</span>
        <h2 className="sql-content-title">{lesson.title}</h2>
        <div className="sql-chapter-meta">
          <span className="sql-diff-badge" style={{ color: levelColor, borderColor: `${levelColor}33`, background: `${levelColor}15` }}>{lesson.level}</span>
          <div className="sql-tags">
            {lesson.tags.map(t => <span key={t} className="sql-tag">{t}</span>)}
          </div>
        </div>
      </div>

      <div className="sql-section">
        <h3 className="sql-section-title">📖 Concept</h3>
        <div className="sql-concept-text">
          {lesson.conceptExplanation.split("\n").map((line, i) => {
            if (line.startsWith("•")) return <li key={i} className="sql-bullet">{line.slice(2)}</li>;
            if (line.startsWith("```")) return null;
            if (line.trim() === "") return <br key={i} />;
            return <p key={i}>{line}</p>;
          })}
        </div>
      </div>

      <div className="sql-section sql-rules-section">
        <h3 className="sql-section-title">📋 Key Rules</h3>
        <ul className="sql-rules-list">
          {lesson.keyRules.map((rule, i) => <li key={i} className="sql-rule-item">{rule}</li>)}
        </ul>
      </div>

      <div className="sql-section sql-task-section">
        <h3 className="sql-section-title">✏️ Your Task</h3>
        <div className="sql-task-text">
          {lesson.task.split("\n").map((line, i) => {
            if (line.trim().startsWith("-") || line.trim().match(/^\d+\./)) {
              return <li key={i} className="sql-task-item">{line.replace(/^[\d.]*\s*/, "").replace(/^-/, "").trim()}</li>;
            }
            return <p key={i}>{line}</p>;
          })}
        </div>
      </div>

      {showHint && (
        <div className="sql-hint-box">
          <strong>💡 Hint:</strong> {lesson.hint}
        </div>
      )}

      {showSolution && (
        <div className="sql-solution-box">
          <h4>Solution</h4>
          <pre className="sql-code-block"><code>{lesson.solutionQuery}</code></pre>
        </div>
      )}

      <div className="sql-content-actions">
        <button className="sql-btn-ghost" onClick={onToggleHint}>
          {showHint ? "Hide Hint" : "💡 Show Hint"}
        </button>
        <button className="sql-btn-ghost" onClick={onToggleSolution}>
          {showSolution ? "Hide Solution" : "🔍 Show Solution"}
        </button>
        <button className={`sql-btn-mark ${isDone ? "done" : ""}`} onClick={onMarkDone}>
          {isDone ? "✓ Completed" : "Mark Complete"}
        </button>
      </div>

      <div className="sql-content-nav">
        <button className={`sql-nav-btn ${!hasPrev ? "disabled" : ""}`} onClick={onPrev} disabled={!hasPrev}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
          Previous
        </button>
        <button className={`sql-nav-btn ${!hasNext ? "disabled" : ""}`} onClick={onNext} disabled={!hasNext}>
          Next
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </div>
  );
}

// ─── PROJECT VIEW ───

function ProjectView({ project, activeMilestone, showHint, showSolution, onToggleHint, onToggleSolution, onMilestoneChange, onMarkDone, isDone }) {
  const milestone = project.milestones[activeMilestone];
  const isFirst = activeMilestone === 0;
  const isLast = activeMilestone === project.milestones.length - 1;
  const diffColor = project.difficulty === "Beginner" ? "#22c55e" : project.difficulty === "Intermediate" ? "#f59e0b" : "#ef4444";

  if (!milestone) return null;

  return (
    <div className="sql-content-inner">
      <div className="sql-chapter-header">
        <span className="sql-chapter-badge project">{project.icon} Database Project</span>
        <h2 className="sql-content-title">{project.title}</h2>
        <div className="sql-chapter-meta">
          <span className="sql-diff-badge" style={{ color: diffColor, borderColor: `${diffColor}33`, background: `${diffColor}15` }}>{project.difficulty}</span>
          <div className="sql-tags">
            {project.tags.map(t => <span key={t} className="sql-tag">{t}</span>)}
          </div>
        </div>
        <p style={{ color: "#94a3b8", fontSize: "0.85rem", marginTop: "0.5rem" }}>{project.description}</p>
      </div>

      {/* Progress bar for milestones */}
      <div className="sql-project-progress">
        <div className="sql-project-steps">
          {project.milestones.map((m, i) => (
            <button
              key={m.id}
              className={`sql-project-step ${i === activeMilestone ? "active" : ""} ${i < activeMilestone ? "past" : ""}`}
              onClick={() => onMilestoneChange(i)}
              title={m.title}
            >
              <span className="sql-step-circle">{i < activeMilestone ? "✓" : i + 1}</span>
              <span className="sql-step-label">{m.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="sql-section">
        <h3 className="sql-section-title">
          🎯 Milestone {activeMilestone + 1}: {milestone.title}
        </h3>
        <div className="sql-task-text">
          {milestone.task.split("\n").map((line, i) => {
            const trimmed = line.trim();
            if (trimmed.startsWith("1.") || trimmed.startsWith("2.") || trimmed.startsWith("3.") || trimmed.startsWith("4.") || trimmed.startsWith("5.") || trimmed.startsWith("6.") || trimmed.startsWith("7.") || trimmed.startsWith("8.")) {
              return <li key={i} className="sql-task-item">{trimmed.replace(/^\d+\.\s*/, "")}</li>;
            }
            if (trimmed.startsWith("-")) {
              return <li key={i} className="sql-task-item">{trimmed.slice(1).trim()}</li>;
            }
            if (trimmed === "") return <br key={i} />;
            return <p key={i}>{line}</p>;
          })}
        </div>
      </div>

      {showHint && milestone.hints && (
        <div className="sql-hint-box">
          <strong>💡 Hints:</strong>
          <ul style={{ margin: "0.35rem 0 0", paddingLeft: "1.2rem" }}>
            {milestone.hints.map((h, i) => (
              <li key={i} style={{ color: "#fef3c7", fontSize: "0.85rem", marginBottom: "0.15rem" }}>{h}</li>
            ))}
          </ul>
        </div>
      )}

      {showSolution && (
        <div className="sql-solution-box">
          <h4>Solution for {milestone.title}</h4>
          <pre className="sql-code-block"><code>{milestone.solutionQuery}</code></pre>
        </div>
      )}

      <div className="sql-content-actions">
        <button className="sql-btn-ghost" onClick={onToggleHint}>
          {showHint ? "Hide Hints" : "💡 Show Hints"}
        </button>
        <button className="sql-btn-ghost" onClick={onToggleSolution}>
          {showSolution ? "Hide Solution" : "🔍 Show Solution"}
        </button>
        <button className={`sql-btn-mark ${isDone ? "done" : ""}`} onClick={onMarkDone}>
          {isDone ? "✓ Milestone Complete" : "Mark Milestone Complete"}
        </button>
      </div>

      <div className="sql-content-nav">
        <button className={`sql-nav-btn ${isFirst ? "disabled" : ""}`} onClick={() => onMilestoneChange(activeMilestone - 1)} disabled={isFirst}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
          Previous Milestone
        </button>
        <button className={`sql-nav-btn ${isLast ? "disabled" : ""}`} onClick={() => onMilestoneChange(activeMilestone + 1)} disabled={isLast}>
          Next Milestone
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </div>
  );
}

// ─── CHALLENGE VIEW ───

function ChallengeView({ challenge, showHint, showSolution, onToggleHint, onToggleSolution, onMarkDone, isDone }) {
  const diffColor = challenge.difficulty === "Easy" ? "#22c55e" : challenge.difficulty === "Medium" ? "#f59e0b" : "#ef4444";

  return (
    <div className="sql-content-inner">
      <div className="sql-chapter-header">
        <span className="sql-chapter-badge challenge">🏆 Query Challenge</span>
        <h2 className="sql-content-title">{challenge.title}</h2>
        <div className="sql-chapter-meta">
          <span className="sql-diff-badge" style={{ color: diffColor, borderColor: `${diffColor}33`, background: `${diffColor}15` }}>{challenge.difficulty}</span>
          <div className="sql-tags">
            {challenge.tags.map(t => <span key={t} className="sql-tag">{t}</span>)}
          </div>
        </div>
      </div>

      <div className="sql-section">
        <h3 className="sql-section-title">📝 Problem</h3>
        <p className="sql-text">{challenge.problem}</p>
      </div>

      <div className="sql-section">
        <h3 className="sql-section-title">📊 Schema</h3>
        <pre className="sql-code-block" style={{ fontSize: "0.78rem" }}><code>{challenge.schema}</code></pre>
      </div>

      {challenge.expectedOutput && (
        <div className="sql-section">
          <h3 className="sql-section-title">🎯 Expected Output</h3>
          <p className="sql-text">{challenge.expectedOutput}</p>
        </div>
      )}

      {showHint && (
        <div className="sql-hint-box">
          <strong>💡 Hint:</strong> {challenge.hint}
        </div>
      )}

      {showSolution && (
        <div className="sql-solution-box">
          <h4>Solution</h4>
          <pre className="sql-code-block"><code>{challenge.solution}</code></pre>
        </div>
      )}

      <div className="sql-content-actions">
        <button className="sql-btn-ghost" onClick={onToggleHint}>
          {showHint ? "Hide Hint" : "💡 Show Hint"}
        </button>
        <button className="sql-btn-ghost" onClick={onToggleSolution}>
          {showSolution ? "Hide Solution" : "🔍 Show Solution"}
        </button>
        <button className={`sql-btn-mark ${isDone ? "done" : ""}`} onClick={onMarkDone}>
          {isDone ? "✓ Solved" : "Mark as Solved"}
        </button>
      </div>
    </div>
  );
}
