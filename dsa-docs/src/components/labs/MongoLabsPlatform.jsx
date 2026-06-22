import { FiBook, FiCheck, FiChevronDown, FiRefreshCw } from "react-icons/fi";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Editor from "@monaco-editor/react";
import Skeleton, { SkeletonLabPlatform } from "../Skeleton.jsx";
import { DiMongodb } from "react-icons/di";
import { createMongoEngine, MONGO_LESSONS, MONGO_CHALLENGES, MONGO_DATABASES, MONGO_PROJECTS, MONGO_INTERVIEW_CATEGORIES, MONGO_INTERVIEW_QUESTIONS } from "../../data/mongodb-curriculum.js";

import {
  LabResizableHandle,
  LabFooter,
  LabEditorToolbar,
  LabTopbar,
  useKeyboardShortcut,
} from "./shared/index.js";



// ─── ICONS ───

// ─── MONGODB ENGINE ───

let mongoEngine = null;

function getEngine() {
  if (!mongoEngine) {
    mongoEngine = createMongoEngine(MONGO_DATABASES);
  }
  return mongoEngine;
}

// ─── PARSE & EXECUTE MONGO QUERY ───

function executeMongoQuery(query, engine) {
  const trimmed = query.trim();
  if (!trimmed) return { results: [], error: "Enter a MongoDB query to execute" };

  try {
    // Handle special commands
    if (trimmed.toLowerCase().startsWith("show collections") || trimmed.toLowerCase().startsWith("show databases")) {
      const names = engine.getCollectionNames();
      return { results: names.map(n => ({ collection: n })), isList: true };
    }

    // Parse db.collection.method(args)
    // Support: db.collection.find(), db.collection.aggregate(), etc.
    const match = trimmed.match(/^db\.(\w+)\.(\w+)\s*\(([\s\S]*)\)\s*;?\s*$/);
    if (!match) return { results: [], error: "Invalid query format. Use: db.collection.method(args)" };

    const [, collectionName, method, argsStr] = match;
    let args;
    try {
      args = argsStr.trim() ? Function(`"use strict"; return (${argsStr})`)() : [];
    } catch {
      // Try parsing as single argument if bracket fails
      try {
        args = [JSON.parse(argsStr)];
      } catch {
        return { results: [], error: `Invalid arguments: ${argsStr}` };
      }
    }
    if (!Array.isArray(args)) args = [args];

    const coll = engine.collection(collectionName);
    if (!coll) return { results: [], error: `Collection "${collectionName}" not found` };

    const startTime = performance.now();

    switch (method) {
      case "find": {
        const filter = args[0] || {};
        const projection = args[1] || null;
        // Support chaining: .sort().limit().skip()
        let results = coll.find(filter, projection);
        const chainMatch = trimmed.match(/\.(sort|limit|skip)\(([^)]*)\)/g);
        if (chainMatch) {
          for (const chain of chainMatch) {
            const cm = chain.match(/\.(sort|limit|skip)\(([^)]*)\)/);
            if (!cm) continue;
            const [, op, valStr] = cm;
            const val = Function(`"use strict"; return (${valStr})`)();
            switch (op) {
              case "sort": results = applySort(results, val); break;
              case "limit": results = results.slice(0, val); break;
              case "skip": results = results.slice(val); break;
            }
          }
        }
        const elapsed = Math.round((performance.now() - startTime) * 100) / 100;
        return { results, count: results.length, executionTime: elapsed };
      }
      case "findOne": {
        const filter = args[0] || {};
        const projection = args[1] || null;
        const result = coll.findOne(filter, projection);
        const elapsed = Math.round((performance.now() - startTime) * 100) / 100;
        return { results: result ? [result] : [], count: result ? 1 : 0, executionTime: elapsed };
      }
      case "countDocuments": {
        const filter = args[0] || {};
        const count = coll.countDocuments(filter);
        const elapsed = Math.round((performance.now() - startTime) * 100) / 100;
        return { results: [{ count }], count: 1, executionTime: elapsed };
      }
      case "insertOne": {
        const doc = args[0] || {};
        const result = coll.insertOne(doc);
        const elapsed = Math.round((performance.now() - startTime) * 100) / 100;
        return { results: [result], count: 1, executionTime: elapsed };
      }
      case "insertMany": {
        const docs = args[0] || [];
        const result = coll.insertMany(docs);
        const elapsed = Math.round((performance.now() - startTime) * 100) / 100;
        return { results: [result], count: 1, executionTime: elapsed };
      }
      case "updateOne": {
        const filter = args[0] || {};
        const update = args[1] || {};
        const result = coll.updateOne(filter, update);
        const elapsed = Math.round((performance.now() - startTime) * 100) / 100;
        return { results: [result], count: 1, executionTime: elapsed };
      }
      case "updateMany": {
        const filter = args[0] || {};
        const update = args[1] || {};
        const result = coll.updateMany(filter, update);
        const elapsed = Math.round((performance.now() - startTime) * 100) / 100;
        return { results: [result], count: 1, executionTime: elapsed };
      }
      case "deleteOne": {
        const filter = args[0] || {};
        const result = coll.deleteOne(filter);
        const elapsed = Math.round((performance.now() - startTime) * 100) / 100;
        return { results: [result], count: 1, executionTime: elapsed };
      }
      case "deleteMany": {
        const filter = args[0] || {};
        const result = coll.deleteMany(filter);
        const elapsed = Math.round((performance.now() - startTime) * 100) / 100;
        return { results: [result], count: 1, executionTime: elapsed };
      }
      case "aggregate": {
        const pipeline = args[0] || [];
        const aggResult = coll.aggregate(pipeline);
        const elapsed = Math.round((performance.now() - startTime) * 100) / 100;
        return { results: aggResult.results, count: aggResult.results.length, executionTime: elapsed, stageResults: aggResult.stageResults };
      }
      default:
        return { results: [], error: `Unknown method: ${method}. Supported: find, findOne, countDocuments, insertOne, insertMany, updateOne, updateMany, deleteOne, deleteMany, aggregate` };
    }
  } catch (e) {
    return { results: [], error: `Error: ${e.message}` };
  }
}

function applySort(data, sortSpec) {
  return [...data].sort((a, b) => {
    for (const [field, dir] of Object.entries(sortSpec)) {
      const aVal = a[field];
      const bVal = b[field];
      if (aVal < bVal) return -1 * dir;
      if (aVal > bVal) return 1 * dir;
    }
    return 0;
  });
}

// ─── COLLECTIONS EXPLORER ───

function CollectionsExplorer({ activeDatabase, onSelectDatabase }) {
  const [expandedCollections, setExpandedCollections] = useState({});
  const engine = getEngine();

  const db = engine.getDb(activeDatabase);
  const collectionNames = db ? Object.keys(db.collections) : [];

  const toggleCollection = (name) => {
    setExpandedCollections(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="mongo-schema-section">
      <div className="mongo-schema-active">
        <FiBook size={16} />
        <span>{db?.name || "No DB"}</span>
      </div>

      <div style={{ padding: "0.35rem 0.85rem" }}>
        <select
          className="mongo-db-select"
          value={activeDatabase}
          onChange={e => onSelectDatabase(e.target.value)}
        >
          {Object.entries(MONGO_DATABASES).map(([key, db]) => (
            <option key={key} value={key}>{db.name}</option>
          ))}
        </select>
      </div>

      {db && collectionNames.map(name => {
        const collInfo = db.collections[name];
        return (
          <div key={name}>
            <button
              className="mongo-collection-item"
              onClick={() => toggleCollection(name)}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
              </svg>
              <span>{name}</span>
              <span className="mongo-col-count">{collInfo.documentCount} docs</span>
              <svg
                width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                style={{ marginLeft: "auto", transform: expandedCollections[name] ? "rotate(90deg)" : "", transition: "transform 0.15s" }}
              >
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
            {expandedCollections[name] && (
              <div className="mongo-column-list">
                <div className="mongo-col-meta">
                  <span className="mongo-col-meta-label">Documents: {collInfo.documentCount}</span>
                </div>
                {collInfo.documents.length > 0 && (
                  <div className="mongo-col-sample">
                    <div className="mongo-col-sample-header">Sample Document</div>
                    <pre className="mongo-col-sample-code"><code>{JSON.stringify(collInfo.documents[0], null, 2).slice(0, 300)}...</code></pre>
                  </div>
                )}
                {collInfo.indexes && (
                  <div className="mongo-col-indexes">
                    <span className="mongo-col-meta-label">Indexes:</span>
                    <div className="mongo-col-index-list">
                      {collInfo.indexes.map(idx => (
                        <span key={idx} className="mongo-col-index-chip">{idx}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── SIDEBAR ───

function MongoSidebar({ activeSection, activeLesson, activeChallenge, activeProject, activeInterviewCategory, onSelectLesson, onSelectChallenge, onSelectProject, onSelectInterview, progress, activeDatabase, onSelectDatabase, ...rest }) {
  const [expandedSections, setExpandedSections] = useState({ learn: true, challenges: false, aggregation: false, projects: false, interview: false });

  const toggleSection = (key) => setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="sql-sidebar" {...rest}>
      <div className="sql-sidebar-header">
        <h3><FiBook size={16} /> Curriculum</h3>
      </div>

      {/* Collections Explorer */}
      <CollectionsExplorer activeDatabase={activeDatabase} onSelectDatabase={onSelectDatabase} />

      {/* LEARN MONGODB */}
      <div className="jsl-sidebar-group">
        <button className={`sql-sg-header ${expandedSections.learn ? "expanded" : ""}`} onClick={() => toggleSection("learn")}>
          <div className="sql-sg-title"><FiBook size={16} /><span>LEARN MONGODB</span></div>
          <span className="sql-sg-count">{progress.lessonsDone}/{progress.lessonsTotal}</span>
          <FiChevronDown size={14} />
        </button>
        {expandedSections.learn && (
          <div className="sql-sg-items">
            {MONGO_LESSONS.map((lesson) => (
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
            {MONGO_CHALLENGES.map((c, i) => (
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

      {/* AGGREGATION LAB */}
      <div className="jsl-sidebar-group">
        <button className={`sql-sg-header ${expandedSections.aggregation ? "expanded" : ""}`} onClick={() => toggleSection("aggregation")}>
          <div className="sql-sg-title"><FiBook size={16} /><span>AGGREGATION LAB</span></div>
          <span className="sql-sg-count">{progress.aggDone}/{progress.aggTotal}</span>
          <FiChevronDown size={14} />
        </button>
        {expandedSections.aggregation && (
          <div className="sql-sg-items">
            {[1,2,3,4,5,6,7,8,9,10].map(i => (
              <button
                key={`agg-${i}`}
                className={`sql-si ${activeSection === "aggregation" && activeLesson === `agg-${i}` ? "active" : ""} ${progress.agg?.includes(i) ? "done" : ""}`}
                onClick={() => {
                  onSelectLesson(`agg-${i}`);
                }}
              >
                <span className="sql-si-num">{i}.</span>
                <span className="sql-si-title">{["$match","$project","$group","$sort","$lookup","$unwind","$facet","$bucket","$setWindowFields","Complex Pipelines"][i-1]}</span>
                <span className={`sql-si-level ${i <= 4 ? "intermediate" : "advanced"}`}>{i <= 4 ? "I" : "A"}</span>
                {progress.agg?.includes(i) && <span className="sql-si-check"><FiCheck size={16} /></span>}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* PROJECTS */}
      {MONGO_PROJECTS && MONGO_PROJECTS.length > 0 && (
        <div className="jsl-sidebar-group">
          <button className={`sql-sg-header projects ${expandedSections.projects ? "expanded" : ""}`} onClick={() => toggleSection("projects")}>
            <div className="sql-sg-title"><FiBook size={16} /><span>PROJECTS</span></div>
            <span className="sql-sg-count">{progress.projectsDone}/{progress.projectsTotal}</span>
            <FiChevronDown size={14} />
          </button>
          {expandedSections.projects && (
            <div className="sql-sg-items">
              {MONGO_PROJECTS.map((proj, i) => (
                <button
                  key={proj.id}
                  className={`sql-si ${activeSection === "project" && activeProject === proj.id ? "active" : ""} ${progress.projects[proj.id]?.complete ? "done" : ""}`}
                  onClick={() => onSelectProject(proj.id)}
                >
                  <span className="sql-si-num">{proj.icon || `${i + 1}.`}</span>
                  <span className="sql-si-title">{proj.title}</span>
                  <span className={`sql-si-level ${proj.difficulty.toLowerCase()}`}>{proj.difficulty[0]}</span>
                  {progress.projects[proj.id]?.complete && <span className="sql-si-check"><FiCheck size={16} /></span>}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* INTERVIEW PREP */}
      <div className="jsl-sidebar-group">
        <button className={`sql-sg-header interview ${expandedSections.interview ? "expanded" : ""}`} onClick={() => toggleSection("interview")}>
          <div className="sql-sg-title"><FiBook size={16} /><span>INTERVIEW PREP</span></div>
          <span className="sql-sg-count">{progress.interviewDone || 0}/{MONGO_INTERVIEW_QUESTIONS?.length || 0}</span>
          <FiChevronDown size={14} />
        </button>
        {expandedSections.interview && (
          <div className="sql-sg-items">
            {(MONGO_INTERVIEW_CATEGORIES || []).map((cat) => (
              <button
                key={cat.id}
                className={`sql-si ${activeSection === "interview" && activeInterviewCategory === cat.id ? "active" : ""}`}
                onClick={() => onSelectInterview(cat.id)}
              >
                <span className="sql-si-num">{cat.icon}</span>
                <span className="sql-si-title">{cat.title}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── RESULTS VIEW ───

function ResultsView({ batches }) {
  if (!batches || batches.length === 0) {
    return <div className="sql-results-empty">Query executed successfully — 0 results returned</div>;
  }

  if (batches.length === 1) {
    return <SingleResult batch={batches[0]} />;
  }

  return (
    <div className="mongo-multi-results">
      {batches.map((batch, i) => (
        <div key={i} className="mongo-batch-result">
          <div className="mongo-batch-label">
            <span className="mongo-batch-num">{i + 1}</span>
            <code className="mongo-batch-query">{batch.query || batch.label}</code>
            <span className="mongo-batch-count">{batch.count} docs</span>
          </div>
          <SingleResult batch={batch} />
        </div>
      ))}
    </div>
  );
}

function SingleResult({ batch }) {
  const { results, stageResults } = batch;

  if (!results || results.length === 0) {
    return <div className="sql-results-empty">Query executed successfully — 0 results returned</div>;
  }

  if (stageResults) {
    return (
      <div className="mongo-results-agg">
        <div className="mongo-agg-stages">
          {stageResults.map((s, i) => (
            <div key={i} className="mongo-agg-stage-badge">
              <span className="mongo-agg-stage-name">{s.stage}</span>
              <span className="mongo-agg-stage-count">{s.input}→{s.output}</span>
            </div>
          ))}
        </div>
        <ResultsTable results={results} />
      </div>
    );
  }

  if (Array.isArray(results) && typeof results[0] === "object") {
    return <ResultsTable results={results} />;
  }

  return (
    <div className="sql-results-empty">
      <pre className="mongo-results-json">{JSON.stringify(results, null, 2)}</pre>
    </div>
  );
}

function ResultsTable({ results }) {
  const columns = results.length > 0 ? Object.keys(results[0]) : [];

  return (
    <table className="sql-results-table">
      <thead>
        <tr>
          <th>#</th>
          {columns.map(col => <th key={col}>{col}</th>)}
        </tr>
      </thead>
      <tbody>
        {results.map((row, ri) => (
          <tr key={ri}>
            <td style={{ color: "#64748b", fontSize: "0.72rem" }}>{ri + 1}</td>
            {columns.map(col => (
              <td key={col}>
                {formatCellValue(row[col])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function formatCellValue(val) {
  if (val === null || val === undefined) return <span className="sql-results-null">null</span>;
  if (typeof val === "object") return <span className="mongo-cell-json">{JSON.stringify(val)}</span>;
  if (typeof val === "boolean") return <span className="mongo-cell-bool">{String(val)}</span>;
  return String(val);
}

// ─── MAIN PLATFORM ───

export default function MongoLabsPlatform() {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("learn");
  const [activeLesson, setActiveLesson] = useState(MONGO_LESSONS[0]?.id || null);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const [activeInterviewCategory, setActiveInterviewCategory] = useState(null);
  const [activeInterviewQuestion, setActiveInterviewQuestion] = useState(null);
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [query, setQuery] = useState(MONGO_LESSONS[0]?.starterQuery || "");
  const [results, setResults] = useState({ batches: [], totalCount: 0, executionTime: 0 });
  const [queryError, setQueryError] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [monacoTheme, setMonacoTheme] = useState("jsl-dark");
  const [progress, setProgress] = useState({ lessons: [], challenges: [], agg: [], projects: {}, interview: [] });
  const [isRunning, setIsRunning] = useState(false);
  const editorRef = useRef(null);
  const codeVersionRef = useRef(0);
  const editorPanelRef = useRef(null);
  const contentPanelRef = useRef(null);
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const [contentRatio, setContentRatio] = useState(0.5);
  const [resultsHeight, setResultsHeight] = useState(220);
  const bodyRef = useRef(null);
  const workspaceRef = useRef(null);
  const [activeDatabase, setActiveDatabase] = useState("ecommerce");
  const engineRef = useRef(null);

  // Initialize engine
  useEffect(() => {
    engineRef.current = getEngine();
    setLoading(false);
  }, []);

  // Change database
  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.useDb(activeDatabase);
    }
  }, [activeDatabase]);

  // Load progress
  useEffect(() => {
    try {
      const stored = JSON.parse(sessionStorage.getItem("mongo-progress") || '{"lessons":[],"challenges":[],"agg":[],"projects":{},"interview":[]}');
      setProgress(stored);
    } catch {}
  }, []);

  const saveProgress = useCallback((newProgress) => {
    setProgress(newProgress);
    try { sessionStorage.setItem("mongo-progress", JSON.stringify(newProgress)); } catch {}
  }, []);

  const markLessonDone = useCallback((id) => {
    if (!progress.lessons.includes(id)) saveProgress({ ...progress, lessons: [...progress.lessons, id] });
  }, [progress, saveProgress]);

  const markChallengeDone = useCallback((id) => {
    if (!progress.challenges.includes(id)) saveProgress({ ...progress, challenges: [...progress.challenges, id] });
  }, [progress, saveProgress]);

  const progressStats = useMemo(() => {
    const projectMilestonesTotal = Object.keys(progress.projects).length;
    const projectMilestonesDone = Object.values(progress.projects).filter(p => p.complete).length;
    const totalItems = MONGO_LESSONS.length + MONGO_CHALLENGES.length + 10 + projectMilestonesTotal;
    const totalDone = progress.lessons.length + progress.challenges.length + (progress.agg?.length || 0) + projectMilestonesDone;
    return {
      lessonsDone: progress.lessons.length,
      lessonsTotal: MONGO_LESSONS.length,
      challengesDone: progress.challenges.length,
      challengesTotal: MONGO_CHALLENGES.length,
      aggDone: progress.agg?.length || 0,
      aggTotal: 10,
      projectsDone: projectMilestonesDone,
      projectsTotal: projectMilestonesTotal,
      interviewDone: progress.interview?.length || 0,
      interviewTotal: MONGO_INTERVIEW_QUESTIONS?.length || 0,
      total: totalDone + (progress.interview?.length || 0),
      totalAll: totalItems + (MONGO_INTERVIEW_QUESTIONS?.length || 0),
      pct: Math.round(((totalDone + (progress.interview?.length || 0)) / ((totalItems + (MONGO_INTERVIEW_QUESTIONS?.length || 0)) || 1)) * 100),
      // Raw arrays needed by sidebar for .includes() checks
      lessons: progress.lessons,
      challenges: progress.challenges,
      agg: progress.agg,
      projects: progress.projects,
    };
  }, [progress]);

  const currentLesson = useMemo(() => MONGO_LESSONS.find(l => l.id === activeLesson), [activeLesson]);
  const currentChallenge = useMemo(() => MONGO_CHALLENGES.find(c => c.id === activeChallenge), [activeChallenge]);

  const selectLesson = (id) => {
    const lesson = MONGO_LESSONS.find(l => l.id === id);
    if (!lesson) return;
    setView("learn");
    setActiveLesson(id);
    setActiveChallenge(null);
    setActiveProject(null);
    setActiveMilestone(0);
    setQuery(lesson.starterQuery);
    setShowHint(false);
    setShowSolution(false);
    setResults({ batches: [], totalCount: 0, executionTime: 0 });
    setQueryError(null);
    codeVersionRef.current++;
    if (lesson.database) setActiveDatabase(lesson.database);
  };

  const selectChallenge = (id) => {
    const challenge = MONGO_CHALLENGES.find(c => c.id === id);
    if (!challenge) return;
    setView("challenge");
    setActiveLesson(null);
    setActiveChallenge(id);
    setActiveProject(null);
    setActiveMilestone(0);
    setQuery(challenge.starterQuery);
    setShowHint(false);
    setShowSolution(false);
    setResults({ batches: [], totalCount: 0, executionTime: 0 });
    setQueryError(null);
    codeVersionRef.current++;
    if (challenge.database) setActiveDatabase(challenge.database);
  };

  const selectInterview = (categoryId) => {
    setView("interview");
    setActiveLesson(null);
    setActiveChallenge(null);
    setActiveProject(null);
    setActiveInterviewCategory(categoryId);
    setActiveInterviewQuestion(null);
    setShowHint(false);
    setShowSolution(false);
    setResults({ batches: [], totalCount: 0, executionTime: 0 });
    setQueryError(null);
    codeVersionRef.current++;
  };

  const markInterviewDone = useCallback((id) => {
    if (!progress.interview.includes(id)) saveProgress({ ...progress, interview: [...progress.interview, id] });
  }, [progress, saveProgress]);

  const selectProject = (id) => {
    const project = MONGO_PROJECTS?.find(p => p.id === id);
    if (!project) return;
    setView("project");
    setActiveLesson(null);
    setActiveChallenge(null);
    setActiveProject(id);
    setActiveMilestone(0);
    setQuery(`// Project: ${project.title}\n// Complete the tasks below\n`);
    setShowHint(false);
    setShowSolution(false);
    setResults({ batches: [], totalCount: 0, executionTime: 0 });
    setQueryError(null);
    codeVersionRef.current++;
    setActiveDatabase(project.database || "ecommerce");
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
    monaco.languages.registerCompletionItemProvider("javascript", {
      provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position);
        const range = { startLineNumber: position.lineNumber, endLineNumber: position.lineNumber, startColumn: word.startColumn, endColumn: word.endColumn };
        return {
          suggestions: [
            "db", "find", "findOne", "insertOne", "insertMany", "updateOne", "updateMany",
            "deleteOne", "deleteMany", "aggregate", "countDocuments", "sort", "limit", "skip",
            "$match", "$project", "$group", "$sort", "$lookup", "$unwind", "$facet", "$bucket",
            "$sum", "$avg", "$min", "$max", "$push", "$addToSet", "$set", "$inc", "$unset",
            "$gt", "$gte", "$lt", "$lte", "$eq", "$ne", "$in", "$nin", "$exists", "$regex", "$and", "$or"
          ].map(label => ({
            label,
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: label,
            range,
          }))
        };
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

  // Run query
  const runQuery = useCallback(() => {
    if (!engineRef.current) return;
    setIsRunning(true);
    setQueryError(null);

    const startTime = performance.now();

    try {
      const trimmed = query.trim();
      if (!trimmed || trimmed.startsWith("//")) {
        setResults({ batches: [], totalCount: 0, executionTime: 0 });
        setQueryError("Enter a MongoDB query to execute");
        setIsRunning(false);
        return;
      }

      // Split by newlines and process each line independently
      const lines = trimmed.split("\n").filter(l => l.trim() && !l.trim().startsWith("//"));
      const batches = [];

      for (const line of lines) {
        const lineTrimmed = line.trim();
        if (lineTrimmed) {
          const result = executeMongoQuery(lineTrimmed, engineRef.current);
          if (result.error) {
            setQueryError(result.error);
            setIsRunning(false);
            return;
          }
          // Accumulate each result as a separate batch
          batches.push({
            query: lineTrimmed,
            results: result.results || [],
            count: result.count || 0,
            isList: result.isList,
            stageResults: result.stageResults,
          });
        }
      }

      const elapsed = Math.round((performance.now() - startTime) * 100) / 100;
      const totalCount = batches.reduce((sum, b) => sum + b.count, 0);
      setResults({
        batches,
        totalCount,
        executionTime: elapsed,
      });
    } catch (e) {
      setQueryError(e.message);
      setResults({ batches: [], totalCount: 0, executionTime: 0 });
    } finally {
      setIsRunning(false);
    }
  }, [query]);

  useKeyboardShortcut(runQuery);

  const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");

  const currentContent = useMemo(() => {
    if (view === "learn") return currentLesson;
    if (view === "challenge") return currentChallenge;
    return null;
  }, [view, currentLesson, currentChallenge]);

  if (loading) {
    return (
      <div className="mongo-platform">
        <SkeletonLabPlatform />
      </div>
    );
  }

  if (!currentContent) {
    return (
      <div className="mongo-platform">
        <div className="jsl-empty" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", color: "#64748b", flexDirection: "column", gap: "0.5rem" }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3">
            <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
          </svg>
          <h2 style={{ color: "#e2e8f0" }}>Welcome to MongoDB Labs</h2>
          <p>Select a lesson or challenge from the sidebar to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mongo-platform">
      <LabTopbar
        base={base}
        title="MongoDB Labs"
        icon={{ component: <DiMongodb size={20} /> }}
        progressStats={progressStats}
        monacoTheme={monacoTheme}
        onToggleTheme={() => setMonacoTheme(t => t === "jsl-dark" ? "jsl-light" : "jsl-dark")}
        prefix="sql"
      />

      {/* Main Layout */}
      <div className="sql-main">
        <div className="sql-body" ref={bodyRef}>
          {/* Sidebar */}
          <MongoSidebar
            activeSection={view}
            activeLesson={activeLesson}
            activeChallenge={activeChallenge}
            activeProject={activeProject}
            activeInterviewCategory={activeInterviewCategory}
            onSelectLesson={selectLesson}
            onSelectChallenge={selectChallenge}
            onSelectProject={selectProject}
            onSelectInterview={selectInterview}
            progress={progressStats}
            activeDatabase={activeDatabase}
            onSelectDatabase={setActiveDatabase}
            style={{ width: sidebarWidth }}
          />
          <LabResizableHandle onDrag={handleSidebarDrag} />

          {/* Content & Editor */}
          <div className="sql-workspace" ref={workspaceRef}>
            {/* Content Panel (left side) */}
            <div className="sql-content-panel" ref={contentPanelRef} style={{ flex: `${contentRatio} 1 0` }}>
              <div className="sql-content-scroll">
                {view === "learn" && currentLesson && (
                  <LessonView
                    lesson={currentLesson}
                    showHint={showHint}
                    showSolution={showSolution}
                    onToggleHint={() => setShowHint(h => !h)}
                    onToggleSolution={() => setShowSolution(s => !s)}
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
                {view === "project" && (
                  <div className="sql-content-inner">
                    <div className="sql-chapter-header">
                      <span className="sql-chapter-badge project">🚀 MongoDB Project</span>
                      <h2 className="sql-content-title">MongoDB Projects</h2>
                      <p style={{ color: "#94a3b8", fontSize: "0.85rem", marginTop: "0.5rem" }}>
                        Build real-world applications using MongoDB. Each project teaches you practical database design, CRUD operations, aggregation pipelines, and performance optimization.
                      </p>
                    </div>
                    <div className="mongo-project-list">
                      {MONGO_PROJECTS && MONGO_PROJECTS.map((proj, i) => (
                        <div key={proj.id} className="mongo-project-card" onClick={() => selectProject(proj.id)}>
                          <div className="mongo-project-card-icon">{proj.icon || "📁"}</div>
                          <div>
                            <h4>{proj.title}</h4>
                            <p>{proj.description}</p>
                            <div className="mongo-project-meta">
                              <span className={`sql-si-level ${proj.difficulty.toLowerCase()}`}>{proj.difficulty}</span>
                              <span style={{ color: "#64748b", fontSize: "0.72rem" }}>{proj.milestones?.length || 3} milestones</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {view === "interview" && (
                  <InterviewView
                    categoryId={activeInterviewCategory}
                    questionId={activeInterviewQuestion}
                    onSelectQuestion={setActiveInterviewQuestion}
                    onMarkDone={markInterviewDone}
                    isDone={progress.interview}
                  />
                )}
              </div>
            </div>

            {/* Editor + Results Panel (right side) */}
            <LabResizableHandle onDrag={handleContentDrag} />
            <div className="sql-editor-panel" ref={editorPanelRef} style={{ flex: `${1 - contentRatio} 1 0` }}>
              <LabEditorToolbar
                isRunning={isRunning}
                onRun={runQuery}
                onReset={() => {
                  let starter = "// Write your MongoDB query here\n";
                  if (view === "learn" && currentLesson) starter = currentLesson.starterQuery;
                  else if (view === "challenge" && currentChallenge) starter = currentChallenge.starterQuery;
                  if (editorRef.current) editorRef.current.setValue(starter);
                  setQuery(starter);
                  setResults({ batches: [], totalCount: 0, executionTime: 0 });
                  setQueryError(null);
                  codeVersionRef.current++;
                }}
                runLabel="Run Query"
                lang="MongoDB"
                prefix="sql"
              />

              {/* Monaco Editor */}
              <div className="sql-editor-wrapper">
                <Editor
                  key={`editor-${codeVersionRef.current}`}
                  height="100%"
                  language="javascript"
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
                    ) : results.totalCount > 0 || results.batches.length > 0 ? (
                      <>
                        <span className="sql-results-count">{results.totalCount} documents ({results.batches.length} quer{results.batches.length === 1 ? "y" : "ies"})</span>
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
                      <p>Write a MongoDB query and click Run</p>
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

function LessonView({ lesson, showHint, showSolution, onToggleHint, onToggleSolution, onMarkDone, isDone }) {
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
            const trimmed = line.trim();
            if (trimmed.startsWith("1.") || trimmed.startsWith("2.") || trimmed.startsWith("3.") || trimmed.startsWith("4.") || trimmed.startsWith("5.")) {
              return <li key={i} className="sql-task-item">{trimmed.replace(/^\d+\.\s*/, "")}</li>;
            }
            if (trimmed.startsWith("-")) return <li key={i} className="sql-task-item">{trimmed.slice(1).trim()}</li>;
            if (trimmed === "") return <br key={i} />;
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
    </div>
  );
}

// ─── INTERVIEW VIEW ───

const INTERVIEW_DIFFICULTY_COLORS = {
  Easy: { color: "#22c55e", bg: "rgba(34,197,94,0.12)" },
  Medium: { color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
  Hard: { color: "#ef4444", bg: "rgba(239,68,68,0.12)" },
};

function InterviewView({ categoryId, questionId, onSelectQuestion, onMarkDone, isDone }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedQs, setExpandedQs] = useState({});

  const category = MONGO_INTERVIEW_CATEGORIES?.find(c => c.id === categoryId);
  const categoryQuestions = (MONGO_INTERVIEW_QUESTIONS || []).filter(q => q.category === categoryId);
  const selectedQuestion = questionId ? MONGO_INTERVIEW_QUESTIONS.find(q => q.id === questionId) : null;

  if (!category) {
    return (
      <div className="sql-content-inner">
        <div className="sql-chapter-header">
          <span className="sql-chapter-badge interview">🎯 Interview Prep</span>
          <h2 className="sql-content-title">MongoDB Interview Preparation</h2>
          <p style={{ color: "#94a3b8", fontSize: "0.85rem", marginTop: "0.5rem" }}>
            Prepare for MongoDB interviews at top tech companies. Select a category below to explore common interview questions and expert answers.
          </p>
        </div>
        <div className="interview-category-grid">
          {(MONGO_INTERVIEW_CATEGORIES || []).map(cat => {
            const catQ = (MONGO_INTERVIEW_QUESTIONS || []).filter(q => q.category === cat.id);
            return (
              <button key={cat.id} className="interview-cat-card" onClick={() => onSelectQuestion(null)}>
                <div className="interview-cat-card-icon">{cat.icon}</div>
                <div className="interview-cat-card-content">
                  <h4>{cat.title}</h4>
                  <p>{cat.description}</p>
                  <span className="interview-cat-count">{catQ.length} questions</span>
                </div>
              </button>
            );
          })}
        </div>
        <div className="interview-company-section">
          <h3 className="sql-section-title">🏢 Company-Specific Questions</h3>
          <div className="interview-company-grid">
            {["Amazon", "Google", "Meta", "Microsoft", "Uber", "Netflix"].map(company => {
              const compQ = (MONGO_INTERVIEW_QUESTIONS || []).filter(q => q.company === company);
              if (compQ.length === 0) return null;
              return (
                <button key={company} className="interview-company-card" onClick={() => {
                  setActiveTab("overview");
                  // Set category to first matching question's category
                  const firstQ = compQ[0];
                  if (firstQ) onSelectQuestion(firstQ.id);
                }}>
                  <div className="interview-company-logo">
                    {company === "Amazon" && "📦"}
                    {company === "Google" && "🔍"}
                    {company === "Meta" && "👍"}
                    {company === "Microsoft" && "🪟"}
                    {company === "Uber" && "🚗"}
                    {company === "Netflix" && "🎬"}
                  </div>
                  <span>{company}</span>
                  <span className="interview-cat-count">{compQ.length} Qs</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const toggleQuestion = (qId) => {
    setExpandedQs(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  // Group questions by company
  const companyGroups = {};
  categoryQuestions.forEach(q => {
    const key = q.company || "General";
    if (!companyGroups[key]) companyGroups[key] = [];
    companyGroups[key].push(q);
  });

  return (
    <div className="sql-content-inner">
      <div className="sql-chapter-header">
        <span className="sql-chapter-badge interview">🎯 {category.icon} {category.title}</span>
        <button className="sql-btn-ghost" onClick={() => onSelectQuestion(null)} style={{ marginLeft: "auto" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          Back
        </button>
      </div>

      <div className="interview-tabs">
        <button className={`interview-tab ${activeTab === "overview" ? "active" : ""}`} onClick={() => setActiveTab("overview")}>
          📋 All Questions ({categoryQuestions.length})
        </button>
        <button className={`interview-tab ${activeTab === "practice" ? "active" : ""}`} onClick={() => setActiveTab("practice")}>
          ✏️ Practice Mode
        </button>
      </div>

      {activeTab === "overview" && (
        <>
          <p style={{ color: "#94a3b8", fontSize: "0.82rem", marginBottom: "0.75rem" }}>
            Click any question to reveal the answer. Questions from specific companies are grouped separately.
          </p>
          {Object.entries(companyGroups).map(([company, questions]) => (
            <div key={company} className="interview-question-group">
              <h4 className="interview-group-header">
                {company !== "General" ? `🏢 ${company}` : "📘 General"}
                <span className="interview-group-count">{questions.length} questions</span>
              </h4>
              <div className="interview-question-list">
                {questions.map(q => {
                  const dc = INTERVIEW_DIFFICULTY_COLORS[q.difficulty];
                  const isExpanded = expandedQs[q.id];
                  return (
                    <div key={q.id} className={`interview-q-item ${isExpanded ? "expanded" : ""}`}>
                      <button className="interview-q-header" onClick={() => toggleQuestion(q.id)}>
                        <div className="interview-q-title-row">
                          <span className="interview-q-difficulty" style={{ background: dc?.bg, color: dc?.color }}>{q.difficulty}</span>
                          <span className="interview-q-text">{q.question}</span>
                          {isDone?.includes(q.id) && <span className="sql-si-check"><FiCheck size={16} /></span>}
                        </div>
                        <svg className="interview-q-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: isExpanded ? "rotate(180deg)" : "" }}>
                          <polyline points="6 9 12 15 18 9"/>
                        </svg>
                      </button>
                      {isExpanded && (
                        <div className="interview-q-answer">
                          <p>{q.answer}</p>
                          <div className="interview-q-actions">
                            <button
                              className={`sql-btn-mark ${isDone?.includes(q.id) ? "done" : ""}`}
                              onClick={(e) => { e.stopPropagation(); onMarkDone(q.id); }}
                            >
                              {isDone?.includes(q.id) ? "✓ Reviewed" : "Mark as Reviewed"}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </>
      )}

      {activeTab === "practice" && (
        <div className="interview-practice">
          <p style={{ color: "#94a3b8", fontSize: "0.85rem", marginBottom: "1rem" }}>
            Test your knowledge! Read the question, think of your answer, then click to reveal the expert answer.
          </p>
          <div className="interview-flashcards">
            {categoryQuestions.map((q, idx) => {
              const dc = INTERVIEW_DIFFICULTY_COLORS[q.difficulty];
              return (
                <div key={q.id} className="interview-flashcard">
                  <div className="interview-flashcard-header">
                    <span style={{ color: "#64748b", fontSize: "0.75rem" }}>Question {idx + 1} of {categoryQuestions.length}</span>
                    <span className="interview-q-difficulty" style={{ background: dc?.bg, color: dc?.color }}>{q.difficulty}</span>
                  </div>
                  <p className="interview-flashcard-question">{q.question}</p>
                  <details className="interview-flashcard-answer">
                    <summary>Show Answer</summary>
                    <div className="interview-answer-content">
                      <p>{q.answer}</p>
                      <button
                        className={`sql-btn-mark ${isDone?.includes(q.id) ? "done" : ""}`}
                        onClick={() => onMarkDone(q.id)}
                      >
                        {isDone?.includes(q.id) ? "✓ Reviewed" : "Mark as Reviewed"}
                      </button>
                    </div>
                  </details>
                </div>
              );
            })}
          </div>
        </div>
      )}
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
