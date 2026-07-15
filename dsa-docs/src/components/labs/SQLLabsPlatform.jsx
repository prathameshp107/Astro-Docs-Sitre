import { FiBook, FiCheck, FiChevronDown, FiChevronLeft, FiChevronRight, FiRefreshCw } from "react-icons/fi";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Editor from "@monaco-editor/react";
import initSqlJs from "sql.js";
import Skeleton, { SkeletonLabPlatform } from "../Skeleton.jsx";
import { SQL_LESSONS, SQL_CHALLENGES, SQL_PROJECTS, SQL_DATABASES, createSampleDatabase, createEmptyDatabase } from "../../data/sql-curriculum.js";
import SchemaDiagram from "./SchemaDiagram.jsx";
import { DiMysql } from "react-icons/di";

import {
  LabResizableHandle,
  LabFooter,
  LabEditorToolbar,
  LabTopbar,
  useKeyboardShortcut,
  celebrate,
  awardXP,
  LabXPBadge,
  LabCommandPalette,
  useCommandPalette,
  renderFormattedText,
  LabCopyButton,
  LabTestsPanel,
  LabTestsBody,
} from "./shared/index.js";

const SQL_CONFETTI = ["#f59e0b", "#fbbf24", "#60a5fa", "#34d399"];



// ─── ICONS ───

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
        <FiBook size={16} />
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
            <FiBook size={16} />
            <span>{name}</span>
            <FiChevronRight size={12} style={{ marginLeft: "auto", transform: expandedTables[name] ? "rotate(90deg)" : "", transition: "transform 0.15s" }} />
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
        <h3><FiBook size={16} /> Curriculum</h3>
      </div>

      {/* Schema Explorer */}
      <SchemaExplorer db={db} activeDatabase={activeDatabase} onSelectDatabase={onSelectDatabase} />

      {/* LEARN SQL */}
      <div className="jsl-sidebar-group">
        <button className={`sql-sg-header ${expandedSections.learn ? "expanded" : ""}`} onClick={() => toggleSection("learn")}>
          <div className="sql-sg-title"><FiBook size={16} /><span>LEARN SQL</span></div>
          <span className="sql-sg-count">{progress.lessonsDone}/{progress.lessonsTotal}</span>
          <FiChevronDown size={14} />
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
                {progress.lessons.includes(lesson.id) && <span className="sql-si-check"><FiCheck size={16} /></span>}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* QUERY CHALLENGES */}
      <div className="jsl-sidebar-group">
        <button className={`sql-sg-header ${expandedSections.challenges ? "expanded" : ""}`} onClick={() => toggleSection("challenges")}>
          <div className="sql-sg-title"><FiBook size={16} /><span>CHALLENGES</span></div>
          <span className="sql-sg-count">{progress.challengesDone}/{progress.challengesTotal}</span>
          <FiChevronDown size={14} />
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
                {progress.challenges.includes(c.id) && <span className="sql-si-check"><FiCheck size={16} /></span>}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* DATABASE PROJECTS */}
      <div className="jsl-sidebar-group">
        <button className={`sql-sg-header projects ${expandedSections.projects ? "expanded" : ""}`} onClick={() => toggleSection("projects")}>
          <div className="sql-sg-title"><FiBook size={16} /><span>PROJECTS</span></div>
          <span className="sql-sg-count">{progress.projectsDone}/{progress.projectsTotal}</span>
          <FiChevronDown size={14} />
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
                  {isComplete && <span className="sql-si-check"><FiCheck size={16} /></span>}
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
  const [testResults, setTestResults] = useState([]);
  const [testsHeight, setTestsHeight] = useState(140);

  const handleTestsDrag = useCallback(({ clientY }) => {
    if (!contentPanelRef.current) return;
    const rect = contentPanelRef.current.getBoundingClientRect();
    setTestsHeight(Math.max(100, Math.min(rect.height * 0.5, rect.bottom - clientY)));
  }, []);

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
      const stored = JSON.parse(localStorage.getItem("sql-progress") || '{"lessons":[],"challenges":[],"projects":{}}');
      setProgress(stored);
    } catch {}
  }, []);

  const saveProgress = useCallback((newProgress) => {
    setProgress(newProgress);
    try { localStorage.setItem("sql-progress", JSON.stringify(newProgress)); } catch {}
  }, []);

  const markLessonDone = useCallback((id) => {
    if (!progress.lessons.includes(id)) {
      saveProgress({ ...progress, lessons: [...progress.lessons, id] });
      if (awardXP(`sql:lesson:${id}`, 10, "Lesson complete")) celebrate(SQL_CONFETTI);
    }
  }, [progress, saveProgress]);

  const markChallengeDone = useCallback((id) => {
    if (!progress.challenges.includes(id)) {
      saveProgress({ ...progress, challenges: [...progress.challenges, id] });
      if (awardXP(`sql:challenge:${id}`, 20, "Challenge solved")) celebrate(SQL_CONFETTI);
    }
  }, [progress, saveProgress]);

  const markMilestoneDone = useCallback((projectId, milestoneIdx) => {
    const projectMilestones = progress.projects[projectId] || [];
    if (!projectMilestones.includes(milestoneIdx)) {
      saveProgress({
        ...progress,
        projects: { ...progress.projects, [projectId]: [...projectMilestones, milestoneIdx] },
      });
      if (awardXP(`sql:milestone:${projectId}:${milestoneIdx}`, 15, "Milestone reached")) celebrate(SQL_CONFETTI);
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

  const currentContent = useMemo(() => {
    if (view === "learn") return currentLesson;
    if (view === "challenge") return currentChallenge;
    if (view === "project") return currentProject;
    return null;
  }, [view, currentLesson, currentChallenge, currentProject]);

  const currentTests = useMemo(() => {
    if (!currentContent) return [];
    const sol = currentContent.solutionQuery || currentContent.solution || (currentContent.milestones && currentContent.milestones[activeMilestone]?.solutionQuery) || "";
    if (!sol) return [];

    const tests = [
      {
        name: "Query executes without syntax errors",
        validate: (q, db) => {
          if (!q.trim()) return false;
          try {
            db.exec(q);
            return true;
          } catch {
            return false;
          }
        }
      }
    ];

    const solUpper = sol.toUpperCase();
    if (solUpper.includes("GROUP BY")) {
      tests.push({
        name: "Uses GROUP BY clause to group results",
        validate: (q) => /\bgroup\s+by\b/i.test(q)
      });
    }
    if (solUpper.includes("ORDER BY")) {
      tests.push({
        name: "Uses ORDER BY clause to sort results",
        validate: (q) => /\border\s+by\b/i.test(q)
      });
    }
    if (solUpper.includes("LIMIT")) {
      tests.push({
        name: "Uses LIMIT clause to restrict output rows",
        validate: (q) => /\blimit\b/i.test(q)
      });
    }
    if (solUpper.includes("JOIN")) {
      tests.push({
        name: "Uses JOIN clause to combine tables",
        validate: (q) => /\bjoin\b/i.test(q)
      });
    }
    if (solUpper.includes("WHERE")) {
      tests.push({
        name: "Uses WHERE clause to filter rows",
        validate: (q) => /\bwhere\b/i.test(q)
      });
    }
    if (solUpper.includes("HAVING")) {
      tests.push({
        name: "Uses HAVING clause to filter groups",
        validate: (q) => /\bhaving\b/i.test(q)
      });
    }
    if (/\b(SUM|COUNT|AVG|MIN|MAX)\b/i.test(sol)) {
      tests.push({
        name: "Uses aggregate functions (SUM, COUNT, AVG, etc.)",
        validate: (q) => /\b(sum|count|avg|min|max)\b/i.test(q)
      });
    }

    tests.push({
      name: "Query output matches the expected solution database records",
      validate: (q, db) => {
        if (!q.trim()) return false;
        try {
          const userRes = db.exec(q);
          const solRes = db.exec(sol);
          if (userRes.length !== solRes.length) return false;
          if (userRes.length === 0) return true;
          
          const uCols = userRes[0].columns;
          const sCols = solRes[0].columns;
          if (uCols.length !== sCols.length) return false;
          
          const uVals = userRes[0].values;
          const sVals = solRes[0].values;
          if (uVals.length !== sVals.length) return false;
          
          for (let i = 0; i < uVals.length; i++) {
            for (let j = 0; j < uVals[i].length; j++) {
              if (String(uVals[i][j]) !== String(sVals[i][j])) return false;
            }
          }
          return true;
        } catch {
          return false;
        }
      }
    });

    return tests;
  }, [currentContent, activeMilestone]);

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
    setTestResults([]);
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
    setTestResults([]);
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
    setTestResults([]);
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

  const runTests = useCallback((customQuery) => {
    const q = typeof customQuery === "string" ? customQuery : query;
    if (!dbRef.current || currentTests.length === 0) return;
    const db = dbRef.current;
    const results = currentTests.map((test, i) => {
      try {
        const passed = test.validate(q, db);
        return { index: i, name: test.name, passed, error: passed ? null : "Verification failed" };
      } catch (e) {
        return { index: i, name: test.name, passed: false, error: e?.message || "Validation failed" };
      }
    });
    setTestResults(results);

    const allPassed = results.length > 0 && results.every(r => r.passed);
    if (allPassed) {
      celebrate(SQL_CONFETTI);
      if (view === "learn" && currentLesson) markLessonDone(currentLesson.id);
      else if (view === "challenge" && currentChallenge) markChallengeDone(currentChallenge.id);
      else if (view === "project" && currentProject) markMilestoneDone(currentProject.id, activeMilestone);
    }
  }, [query, currentTests, view, currentLesson, currentChallenge, currentProject, activeMilestone, markLessonDone, markChallengeDone, markMilestoneDone]);

  // Run query
  const runQuery = useCallback(() => {
    if (!dbRef.current) return;
    setIsRunning(true);
    setQueryError(null);

    const startTime = performance.now();

    try {
      const trimmed = query.trim();
      const hasExecutableSQL = trimmed
        .replace(/--[^\n]*/g, "") // removes comments
        .trim().length > 0;

      if (!trimmed || !hasExecutableSQL) {
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

      setTimeout(() => {
        runTests(trimmed);
      }, 0);
    } catch (e) {
      setQueryError(e.message);
      setResults({ batches: [], totalRows: 0, totalAffected: 0, executionTime: 0 });
    } finally {
      setIsRunning(false);
      if (dbRef.current) {
        try { dbRef.current.run("PRAGMA foreign_keys = ON;"); } catch {}
      }
    }
  }, [query, runTests]);

  useKeyboardShortcut(runQuery);

  // Ctrl+K command palette + Ctrl+B focus mode
  const [paletteOpen, setPaletteOpen] = useCommandPalette();
  const [hideSidebar, setHideSidebar] = useState(false);
  useKeyboardShortcut(() => setHideSidebar(v => !v), "b");

  const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");

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
      <LabTopbar
        base={base}
        title="SQL Labs"
        icon={{ component: <DiMysql size={20} /> }}
        progressStats={progressStats}
        monacoTheme={monacoTheme}
        onToggleTheme={() => setMonacoTheme(t => t === "jsl-dark" ? "jsl-light" : "jsl-dark")}
        prefix="sql"
      >
        <LabXPBadge />
      </LabTopbar>

      <LabCommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        accent="#f59e0b"
        placeholder="Type a command or jump to a lesson, challenge, project…"
        commands={[
          { id: "run", section: "Actions", label: "Run query", hint: "Ctrl+Enter", action: runQuery },
          { id: "schema", section: "Actions", label: showSchema ? "Hide schema diagram" : "Show schema diagram", action: () => setShowSchema(s => !s) },
          { id: "theme", section: "Actions", label: "Toggle editor theme", action: () => setMonacoTheme(t => t === "jsl-dark" ? "jsl-light" : "jsl-dark") },
          { id: "focus", section: "Actions", label: hideSidebar ? "Show sidebar" : "Focus mode (hide sidebar)", hint: "Ctrl+B", action: () => setHideSidebar(v => !v) },
          { id: "back", section: "Actions", label: "Back to all labs", action: () => { window.location.href = `${base}labs`; } },
          ...SQL_LESSONS.map(l => ({ id: `l-${l.id}`, section: "Lessons", label: l.title, done: progress.lessons.includes(l.id), action: () => selectLesson(l.id) })),
          ...SQL_CHALLENGES.map(c => ({ id: `c-${c.id}`, section: "Challenges", label: c.title, done: progress.challenges.includes(c.id), action: () => selectChallenge(c.id) })),
          ...SQL_PROJECTS.map(p => ({ id: `p-${p.id}`, section: "Projects", label: p.title, done: (progress.projects[p.id] || []).length >= p.milestones.length, action: () => selectProject(p.id) })),
        ]}
      />

      {/* Main Layout */}
      <div className="sql-main">
        <div className="sql-body" ref={bodyRef}>
          {/* Sidebar */}
          {!hideSidebar && (
            <>
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
              <LabResizableHandle onDrag={handleSidebarDrag} />
            </>
          )}

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

              {/* Resizable Automated Tests */}
              {currentTests.length > 0 && (
                <>
                  <LabResizableHandle onDrag={handleTestsDrag} orientation="horizontal" />
                  <div className="jsl-tests-panel" style={{ height: testsHeight, maxHeight: testsHeight, minHeight: testsHeight }}>
                    <LabTestsPanel
                      currentTests={currentTests}
                      testResults={testResults}
                      onRunTests={runTests}
                    />
                    <div className="jsl-tests-body">
                      <LabTestsBody
                        currentTests={currentTests}
                        testResults={testResults}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Editor + Results Panel (right side) */}
            <LabResizableHandle onDrag={handleContentDrag} />
            <div className="sql-editor-panel" ref={editorPanelRef} style={{ flex: `${1 - contentRatio} 1 0` }}>
              <LabEditorToolbar
                isRunning={isRunning}
                onRun={runQuery}
                onReset={() => {
                  let starter = "";
                  if (view === "learn" && currentLesson) starter = currentLesson.starterQuery;
                  else if (view === "challenge") starter = "-- Write your SQL query here\n";
                  if (editorRef.current) editorRef.current.setValue(starter);
                  setQuery(starter);
                  setResults({ batches: [], totalRows: 0, totalAffected: 0, executionTime: 0 });
                  setQueryError(null);
                  codeVersionRef.current++;
                }}
                runLabel="Run Query"
                lang="SQL"
                prefix="sql"
                extraButtons={
                  <button className={`sql-btn-schema ${showSchema ? "active" : ""}`} onClick={() => setShowSchema(s => !s)} title="Toggle schema diagram">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="3"/><circle cx="19" cy="5" r="3"/><circle cx="5" cy="19" r="3"/>
                      <line x1="12" y1="9" x2="16.65" y2="7.35"/><line x1="8.59" y1="13.51" x2="6.65" y2="17.04"/>
                    </svg>
                    Schema
                  </button>
                }
              />

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
              <LabResizableHandle onDrag={handleResultsDrag} orientation="horizontal" />
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
                      <FiPlay size={28} opacity={0.2} />
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

      <LabFooter />
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
          {renderFormattedText(lesson.conceptExplanation)}
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
          {renderFormattedText(lesson.task)}
        </div>
      </div>

      {showHint && (
        <div className="sql-hint-box">
          <strong>💡 Hint:</strong> {lesson.hint}
        </div>
      )}

      {showSolution && (
        <div className="sql-solution-box">
          <div className="sql-solution-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <h4 style={{ margin: 0 }}>Solution</h4>
            <LabCopyButton text={lesson.solutionQuery} />
          </div>
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
          <FiChevronLeft size={14} />
          Previous
        </button>
        <button className={`sql-nav-btn ${!hasNext ? "disabled" : ""}`} onClick={onNext} disabled={!hasNext}>
          Next
          <FiChevronRight size={14} />
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
          {renderFormattedText(milestone.task)}
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
          <div className="sql-solution-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <h4 style={{ margin: 0 }}>Solution for {milestone.title}</h4>
            <LabCopyButton text={milestone.solutionQuery} />
          </div>
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
          <FiChevronLeft size={14} />
          Previous Milestone
        </button>
        <button className={`sql-nav-btn ${isLast ? "disabled" : ""}`} onClick={() => onMilestoneChange(activeMilestone + 1)} disabled={isLast}>
          Next Milestone
          <FiChevronRight size={14} />
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
        <div className="sql-text">{renderFormattedText(challenge.problem)}</div>
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
          <div className="sql-solution-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <h4 style={{ margin: 0 }}>Solution</h4>
            <LabCopyButton text={challenge.solution} />
          </div>
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
