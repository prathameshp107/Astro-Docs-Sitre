import { useState, useEffect, useMemo, useRef, useCallback } from "react";

const labs = [
  {
    id: "html",
    title: "HTML Labs",
    shortIcon: "HT",
    description:
      "Master HTML through interactive learning. 16 guided lessons, 10 coding challenges, 6 real-world projects, HTML playground with live preview, and interview preparation.",
    path: "/labs/html",
    color: "#fb923c",
    track: "frontend",
    features: [
      "Live HTML Preview",
      "16 Interactive Lessons",
      "10 Code Challenges",
      "6 Real-World Projects",
      "50+ Interview Questions",
      "HTML Playground",
    ],
    challengeCount: 32,
    difficulty: "Beginner to Advanced",
  },
  {
    id: "css",
    title: "CSS Labs",
    shortIcon: "CS",
    description:
      "Master CSS through interactive learning. 20 guided lessons, 10 coding challenges, 10 reusable components, 6 animations, and an interactive playground.",
    path: "/labs/css",
    color: "#60a5fa",
    track: "frontend",
    features: [
      "20 Interactive Lessons",
      "Live CSS Preview",
      "10 Code Challenges",
      "10 UI Components Lab",
      "6 Animation Projects",
      "50+ Interview Questions",
    ],
    challengeCount: 46,
    difficulty: "Beginner to Advanced",
  },
  {
    id: "js",
    title: "JS Interview Lab",
    shortIcon: "JS",
    description:
      "Practice JavaScript with a full-featured code playground, snippet output questions, fix-the-bug challenges, mini app projects, and timed interview mode.",
    path: "js-lab",
    color: "#f7df1e",
    track: "frontend",
    features: [
      "Monaco Code Editor",
      "100+ Snippet Questions",
      "20+ Bug Challenges",
      "Timed Interview Mode",
      "Mini App Projects",
    ],
    challengeCount: 150,
    difficulty: "Beginner to Advanced",
  },
  {
    id: "react",
    title: "React Practice Lab",
    shortIcon: "RE",
    description:
      "Interactive React challenges covering hooks, state management, components, forms, context, and performance patterns.",
    path: "react-lab",
    color: "#61dafb",
    track: "frontend",
    features: [
      "Component Challenges",
      "Hooks Drills",
      "State Management",
      "Forms & Validation",
      "Performance Tuning",
    ],
    challengeCount: 80,
    difficulty: "Intermediate",
  },
  {
    id: "dsa",
    title: "DSA Problem Lab",
    shortIcon: "DS",
    description:
      "Solve Data Structures & Algorithms problems with real-time code execution, test case validation, and performance analysis.",
    path: "/dsa/problems",
    color: "#6366f1",
    track: "core",
    features: [
      "Arrays & Strings",
      "Trees & Graphs",
      "Dynamic Programming",
      "Sorting & Searching",
      "Test Case Runner",
    ],
    challengeCount: 20,
    difficulty: "Beginner to Advanced",
  },
  {
    id: "sql",
    title: "SQL Query Lab",
    shortIcon: "SQ",
    description:
      "Write and execute SQL queries against sample databases. Practice joins, aggregations, subqueries, and query optimization.",
    path: "/labs/mysql",
    color: "#f59e0b",
    track: "data",
    features: [
      "JOINs Practice",
      "Aggregations",
      "Subqueries & CTEs",
      "Indexing Challenges",
      "Query Optimization",
    ],
    challengeCount: 100,
    difficulty: "Intermediate",
  },
  {
    id: "python",
    title: "Python Labs",
    shortIcon: "PY",
    description:
      "Master Python from beginner to advanced. 20 guided lessons, 10 coding challenges, 8 real-world projects, and 10 debugging exercises.",
    path: "/labs/python",
    color: "#3776AB",
    track: "data",
    features: [
      "20 Guided Lessons",
      "10 Code Challenges",
      "8 Projects (Todo, Weather, AI)",
      "10 Debug Challenges",
      "Monaco Editor + Pyodide",
    ],
    challengeCount: 48,
    difficulty: "Beginner to Advanced",
  },
  {
    id: "mongodb",
    title: "MongoDB Lab",
    shortIcon: "MO",
    description:
      "Learn MongoDB with guided lessons, interactive queries, aggregation pipeline builder, and real-time document exploration. Master NoSQL the right way.",
    path: "/labs/mongodb",
    color: "#13aa52",
    track: "data",
    features: [
      "16 Guided Lessons",
      "Query Playground",
      "Aggregation Pipeline Builder",
      "Collections Explorer",
      "8+ Query Challenges",
    ],
    challengeCount: 30,
    difficulty: "Beginner to Advanced",
  },
  {
    id: "git",
    title: "Git & GitHub Labs",
    shortIcon: "GI",
    description:
      "Master Git and GitHub through interactive visual simulations. Learn branching, merging, rebasing, merge conflicts, and team collaboration workflows.",
    path: "/labs/git",
    color: "#f97316",
    track: "core",
    features: [
      "30 Interactive Lessons",
      "Visual Commit Graph",
      "Git CLI Terminal Simulator",
      "Merge Conflict Arena",
      "Team Collaboration Simulator",
      "Boss Battles & Achievements",
    ],
    challengeCount: 50,
    difficulty: "Beginner to Advanced",
  },
  {
    id: "tailwind",
    title: "Tailwind CSS Playground",
    shortIcon: "TW",
    description:
      "Master Tailwind CSS through interactive learning. 50+ guided lessons across 20 chapters covering utility classes, flexbox, grid, responsive design, dark mode, animations, and components.",
    path: "/labs/tailwind-lab",
    color: "#38bdf8",
    track: "frontend",
    features: [
      "50+ Interactive Lessons",
      "20 Chapters of Content",
      "Live HTML Preview",
      "Tailwind CDN Support",
      "Responsive Preview Modes",
      "Automated Tests",
    ],
    challengeCount: 50,
    difficulty: "Beginner to Advanced",
  },
];

const TRACKS = [
  { key: "all", label: "--all" },
  { key: "frontend", label: "--frontend" },
  { key: "data", label: "--data" },
  { key: "core", label: "--core" },
];

const VISITS_KEY = "lh-lab-visits";
const TYPED_CMD = "labs --list --interactive";
const MAX_CHALLENGES = Math.max(...labs.map((l) => l.challengeCount));

function readVisits() {
  try {
    return JSON.parse(localStorage.getItem(VISITS_KEY)) || {};
  } catch {
    return {};
  }
}

function labUrl(lab, base) {
  return lab.path.startsWith("/")
    ? `${base}${lab.path.slice(1)}`
    : `${base}labs/${lab.path}`;
}

function timeAgo(ts) {
  const mins = Math.floor((Date.now() - ts) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return days === 1 ? "yesterday" : `${days}d ago`;
}

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

/* count-up for the terminal stats line */
function useCountUp(target, duration = 900) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return value;
}

/* one-time typing animation for the hero terminal */
function useTypedCommand(text) {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("lh-typed");
    if (reduced || seen) {
      setTyped(text);
      setDone(true);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
        sessionStorage.setItem("lh-typed", "1");
      }
    }, 35);
    return () => clearInterval(id);
  }, [text]);

  return [typed, done];
}

export default function LabHub() {
  const [query, setQuery] = useState("");
  const [track, setTrack] = useState("all");
  const [visits, setVisits] = useState({});
  const searchRef = useRef(null);

  const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");

  useEffect(() => {
    setVisits(readVisits());
  }, []);

  const openLab = useCallback(
    (lab) => {
      const next = { ...readVisits() };
      const prev = next[lab.id] || { count: 0 };
      next[lab.id] = { count: prev.count + 1, ts: Date.now() };
      try {
        localStorage.setItem(VISITS_KEY, JSON.stringify(next));
      } catch {
        /* storage full or blocked — navigation still works */
      }
      window.location.href = labUrl(lab, base);
    },
    [base]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return labs.filter((lab) => {
      if (track !== "all" && lab.track !== track) return false;
      if (!q) return true;
      const haystack = [lab.title, lab.description, lab.difficulty, ...lab.features]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, track]);

  /* global shortcuts: "/" focuses search, Esc clears */
  useEffect(() => {
    const onKey = (e) => {
      const typingInInput = /^(INPUT|TEXTAREA)$/.test(document.activeElement?.tagName);
      if (e.key === "/" && !typingInInput) {
        e.preventDefault();
        searchRef.current?.focus();
      } else if (e.key === "Escape" && document.activeElement === searchRef.current) {
        setQuery("");
        searchRef.current?.blur();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const onSearchKeyDown = (e) => {
    if (e.key === "Enter" && filtered.length > 0) {
      openLab(filtered[0]);
    }
  };

  const openRandom = () => {
    const pool = filtered.length > 0 ? filtered : labs;
    openLab(pool[Math.floor(Math.random() * pool.length)]);
  };

  const [typedCmd, typingDone] = useTypedCommand(TYPED_CMD);

  const totalChallenges = labs.reduce((sum, l) => sum + l.challengeCount, 0);
  const shownLabs = useCountUp(labs.length);
  const shownChallenges = useCountUp(totalChallenges);
  const visitedCount = Object.keys(visits).filter((id) =>
    labs.some((l) => l.id === id)
  ).length;

  const lastVisit = useMemo(() => {
    const entries = Object.entries(visits)
      .map(([id, v]) => ({ lab: labs.find((l) => l.id === id), ...v }))
      .filter((e) => e.lab && e.ts)
      .sort((a, b) => b.ts - a.ts);
    return entries[0] || null;
  }, [visits]);

  const renderTypedCmd = () => {
    const parts = typedCmd.split(" ");
    return parts.map((part, i) => (
      <span key={i} className={part.startsWith("--") ? "lh-flag" : "lh-cmd"}>
        {i > 0 ? " " : ""}
        {part}
      </span>
    ));
  };

  return (
    <div className="lh-page">
      <div className="lh-wrap">
        {/* ─── Hero ─── */}
        <section className="lh-hero">
          <div className="lh-hero-copy">
            <span className="lh-eyebrow">interactive practice labs</span>
            <h1>
              Muscle memory <em>for code.</em>
            </h1>
            <p className="lh-hero-sub">
              Ten hands-on labs with {totalChallenges}+ challenges — real editors,
              live previews, and test runners. No setup, no slides. Search, pick
              one, and start typing.
            </p>
            <div className="lh-hero-hints">
              <span>
                <span className="lh-kbd">/</span> search labs
              </span>
              <span>
                <span className="lh-kbd">Enter</span> open top match
              </span>
              <span>
                <span className="lh-kbd">Esc</span> clear
              </span>
            </div>
          </div>

          {/* signature: live terminal — the prompt is the search box */}
          <div className="lh-terminal">
            <div className="lh-term-bar">
              <span className="lh-term-dot" />
              <span className="lh-term-dot" />
              <span className="lh-term-dot" />
              <span className="lh-term-path">~/practice-labs</span>
            </div>
            <div className="lh-term-body">
              <div className="lh-term-line">
                <span className="lh-ps1">$ </span>
                {renderTypedCmd()}
                {!typingDone && <span className="lh-caret" />}
              </div>
              {typingDone && (
                <div className="lh-term-out">
                  <span className="lh-ok">✓</span> <strong>{shownLabs}</strong> labs
                  loaded · <strong>{shownChallenges}+</strong> challenges ·{" "}
                  <strong>{visitedCount}</strong>/{labs.length} visited
                </div>
              )}
              <label className="lh-search-row">
                <span className="lh-search-prompt">❯</span>
                <input
                  ref={searchRef}
                  className="lh-search-input"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onSearchKeyDown}
                  placeholder="search labs — try “hooks”, “joins”, “rebasing”…"
                  aria-label="Search labs"
                />
                {query && (
                  <button
                    className="lh-search-clear"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                  >
                    esc
                  </button>
                )}
              </label>
              <div className="lh-flags" role="group" aria-label="Filter labs by track">
                {TRACKS.map((t) => (
                  <button
                    key={t.key}
                    className={`lh-flag-btn ${track === t.key ? "active" : ""}`}
                    onClick={() => setTrack(t.key)}
                    aria-pressed={track === t.key}
                  >
                    {t.label}
                  </button>
                ))}
                <button
                  className="lh-flag-btn lh-flag-random"
                  onClick={openRandom}
                  title="Open a random lab"
                >
                  --random ⤳
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Jump back in ─── */}
        {lastVisit && (
          <div
            className="lh-resume"
            style={{ "--lh-resume-color": lastVisit.lab.color }}
            onClick={() => openLab(lastVisit.lab)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openLab(lastVisit.lab);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={`Continue ${lastVisit.lab.title}`}
          >
            <div>
              <div className="lh-resume-label">jump back in</div>
              <div className="lh-resume-title">{lastVisit.lab.title}</div>
            </div>
            <div className="lh-resume-meta">
              last opened {timeAgo(lastVisit.ts)} · {lastVisit.count}{" "}
              {lastVisit.count === 1 ? "session" : "sessions"}
            </div>
            <span className="lh-resume-go">continue ⏎</span>
          </div>
        )}

        {/* ─── Grid ─── */}
        <div className="lh-grid-head">
          <span className="lh-grid-title">
            {track === "all" ? "all labs" : `track: ${track}`}
            {query && ` · matching “${query}”`}
          </span>
          <span className="lh-grid-count">
            {filtered.length}/{labs.length} shown
          </span>
        </div>

        <section className="lh-grid">
          {filtered.length === 0 ? (
            <div className="lh-empty">
              no labs match <strong>“{query}”</strong> in this track
              <br />
              <button
                onClick={() => {
                  setQuery("");
                  setTrack("all");
                }}
              >
                labs --reset-filters
              </button>
            </div>
          ) : (
            filtered.map((lab, i) => (
              <LabCard
                key={lab.id}
                lab={lab}
                index={labs.indexOf(lab)}
                visited={visits[lab.id]}
                onOpen={openLab}
                delay={i}
              />
            ))
          )}
        </section>

        {/* ─── Footer ─── */}
        <footer className="lh-footer">
          <span>
            Built by <strong>Prathamesh Pawar</strong>
          </span>
          <span>
            <a
              href="https://github.com/prathameshp107/DSA-Notes-Problems"
              target="_blank"
              rel="noopener noreferrer"
            >
              github
            </a>
            <a href={`${base}overview`}>docs</a>
            <a href={base}>home</a>
          </span>
        </footer>
      </div>
    </div>
  );
}

function LabCard({ lab, index, visited, onOpen, delay }) {
  const [ref, inView] = useInView(0.08);
  const [hovered, setHovered] = useState(false);

  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const fill = Math.max(12, Math.round((lab.challengeCount / MAX_CHALLENGES) * 100));
  const chipLimit = hovered ? lab.features.length : 3;

  return (
    <div
      ref={ref}
      className={`lh-card ${inView ? "in-view" : ""}`}
      style={{
        "--hue": lab.color,
        "--fill": `${fill}%`,
        animationDelay: `${Math.min(delay, 8) * 0.06}s`,
      }}
      onClick={() => onOpen(lab)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(lab);
        }
      }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      tabIndex={0}
      aria-label={`Open ${lab.title}`}
    >
      <div className="lh-card-top">
        <span className="lh-card-index">
          lab/{String(index + 1).padStart(2, "0")}
        </span>
        {visited && (
          <span className="lh-card-visited" title={`Opened ${visited.count} times`}>
            ✓ visited
          </span>
        )}
      </div>

      <div className="lh-card-head">
        <span className="lh-card-icon">{lab.shortIcon}</span>
        <div>
          <h3 className="lh-card-title">{lab.title}</h3>
          <div className="lh-card-diff">{lab.difficulty.toLowerCase()}</div>
        </div>
      </div>

      <p className="lh-card-desc">{lab.description}</p>

      <div className="lh-card-chips">
        {lab.features.slice(0, chipLimit).map((f) => (
          <span key={f} className="lh-chip">
            {f}
          </span>
        ))}
        {!hovered && lab.features.length > 3 && (
          <span className="lh-chip lh-chip-more">+{lab.features.length - 3}</span>
        )}
      </div>

      <div className="lh-card-foot">
        <div className="lh-meter">
          <span className="lh-meter-label">{lab.challengeCount} challenges</span>
          <div className="lh-meter-track">
            <div className="lh-meter-fill" />
          </div>
        </div>
        <span className="lh-card-open">
          open lab
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </span>
      </div>
    </div>
  );
}
