import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Code, Activity, Award, ArrowRight, ArrowUpRight,
  Briefcase, Map, Users, Play, Sparkles, Laptop, Trophy,
  ChevronRight, Layout, Database, Check, RefreshCw, Terminal,
  Binary, Layers, Target, Lock
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import {
  DiHtml5, DiCss3, DiJavascript1, DiReact, DiAngularSimple,
  DiNodejsSmall, DiMongodb, DiMysql, DiDocker, DiPython,
  DiRedis, DiDatabase, DiGitBranch
} from "react-icons/di";
import { SiNextdotjs } from "react-icons/si";

// ─── Utilities ───────────────────────────────────────────────────────────────
function useInView(options = { threshold: 0.1, triggerOnce: true }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (options.triggerOnce) observer.unobserve(el);
      } else if (!options.triggerOnce) setInView(false);
    }, options);
    observer.observe(el);
    return () => { if (el && !options.triggerOnce) observer.unobserve(el); };
  }, [options.threshold, options.triggerOnce]);
  return [ref, inView];
}

function Typewriter({ lines, speed = 38 }) {
  const [displayed, setDisplayed] = useState([]);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (done) return;
    if (lineIdx >= lines.length) { setDone(true); return; }
    const currentLine = lines[lineIdx];
    if (charIdx < currentLine.length) {
      const t = setTimeout(() => {
        setDisplayed(prev => {
          const next = [...prev];
          next[lineIdx] = (next[lineIdx] || "") + currentLine[charIdx];
          return next;
        });
        setCharIdx(c => c + 1);
      }, speed);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => { setLineIdx(l => l + 1); setCharIdx(0); }, 320);
      return () => clearTimeout(t);
    }
  }, [lineIdx, charIdx, lines, speed, done]);
  return (
    <div className="font-mono text-xs md:text-sm leading-relaxed">
      {lines.map((line, i) => (
        <div key={i} className={i > lineIdx ? "opacity-0" : ""}>
          <span className={
            line.startsWith("//") ? "text-slate-600" :
            line.startsWith("→") ? "text-amber-400" :
            line.startsWith("const") || line.startsWith("import") ? "text-violet-300" :
            "text-slate-300"
          }>
            {i < lineIdx ? line : (displayed[i] || "")}
            {i === lineIdx && !done && <span className="animate-pulse text-amber-400 font-bold">▋</span>}
          </span>
        </div>
      ))}
    </div>
  );
}

function AnimatedCounter({ end, suffix = "", prefix = "" }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const steps = 60;
    const inc = end / steps;
    const t = setInterval(() => {
      start += inc;
      if (start >= end) { setCount(end); clearInterval(t); }
      else setCount(Math.floor(start));
    }, 22);
    return () => clearInterval(t);
  }, [inView, end]);
  return (
    <span ref={ref} className="text-3xl md:text-4xl font-black tabular-nums text-white sg">
      {prefix}{count}{suffix}
    </span>
  );
}

function Tag({ children, color = "amber" }) {
  const map = {
    amber:   "border-amber-500/25 bg-amber-950/25 text-amber-400",
    violet:  "border-violet-500/25 bg-violet-950/25 text-violet-400",
    cyan:    "border-cyan-500/25 bg-cyan-950/25 text-cyan-400",
    emerald: "border-emerald-500/25 bg-emerald-950/25 text-emerald-400",
    fuchsia: "border-fuchsia-500/25 bg-fuchsia-950/25 text-fuchsia-400",
    indigo:  "border-indigo-500/25 bg-indigo-950/25 text-indigo-400",
    rose:    "border-rose-500/25 bg-rose-950/25 text-rose-400",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-bold uppercase tracking-widest ${map[color]}`}>
      {children}
    </span>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ReactLanding() {
  const base = import.meta.env.BASE_URL || "/";
  const baseHref = base.replace(/\/$/, "");

  const [activeRoadmapStep, setActiveRoadmapStep] = useState(2);
  const [activeCompanyFilter, setActiveCompanyFilter] = useState("All");
  const [sortingArray, setSortingArray] = useState([60, 25, 85, 45, 95, 55, 30]);
  const [sortingIndex, setSortingIndex] = useState([-1, -1]);
  const [isSorting, setIsSorting] = useState(false);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState("");
  const [reactLabCount, setReactLabCount] = useState(0);
  const [activeVisualizerTab, setActiveVisualizerTab] = useState("Sorting");

  const [heroRef, heroInView] = useInView();
  const [statsRef, statsInView] = useInView();
  const [tracksRef, tracksInView] = useInView();
  const [labsRef, labsInView] = useInView();
  const [visRef, visInView] = useInView();
  const [problemsRef, problemsInView] = useInView();
  const [prepRef, prepInView] = useInView();
  const [mcqRef, mcqInView] = useInView();
  const [featuresRef, featuresInView] = useInView();
  const [roadmapRef, roadmapInView] = useInView();
  const [ctaRef, ctaInView] = useInView();
const [whyRef, whyInView] = useInView();

  const triggerSortingDemo = async () => {
    if (isSorting) return;
    setIsSorting(true);
    let arr = [...sortingArray];
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setSortingIndex([j, j + 1]);
        await new Promise(r => setTimeout(r, 380));
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setSortingArray([...arr]);
        }
      }
    }
    setSortingIndex([-1, -1]);
    setIsSorting(false);
  };

  const resetSortingDemo = () => {
    setSortingArray([60, 25, 85, 45, 95, 55, 30]);
    setSortingIndex([-1, -1]);
    setIsSorting(false);
  };

  const handleQuizAnswer = (index, isCorrect) => {
    if (selectedQuizAnswer !== null) return;
    setSelectedQuizAnswer(index);
    if (isCorrect) { setQuizScore(p => p + 10); setQuizFeedback("Correct! +10 XP earned."); }
    else setQuizFeedback("Incorrect. Hint: null is historically represented as an object.");
  };

  const tracks = [
    { name: "HTML",       difficulty: "Beginner",     topics: 12, progress: 100, icon: <DiHtml5 className="text-[#e34f26]" />,      color: "from-orange-500/10 to-red-500/5" },
    { name: "CSS",        difficulty: "Beginner",     topics: 20, progress: 90,  icon: <DiCss3 className="text-[#1572b6]" />,       color: "from-blue-500/10 to-sky-500/5" },
    { name: "JavaScript", difficulty: "Intermediate", topics: 35, progress: 85,  icon: <DiJavascript1 className="text-[#f7df1e]" />, color: "from-yellow-500/10 to-amber-500/5" },
    { name: "React",      difficulty: "Intermediate", topics: 28, progress: 65,  icon: <DiReact className="text-[#61dafb]" />,       color: "from-cyan-500/10 to-sky-500/5" },
    { name: "Next.js",    difficulty: "Intermediate", topics: 18, progress: 60,  icon: <SiNextdotjs className="text-slate-100" />,   color: "from-slate-400/10 to-slate-500/5" },
    { name: "Angular",    difficulty: "Intermediate", topics: 18, progress: 30,  icon: <DiAngularSimple className="text-[#dd0031]" />, color: "from-red-500/10 to-rose-500/5" },
    { name: "Node.js",    difficulty: "Advanced",     topics: 24, progress: 70,  icon: <DiNodejsSmall className="text-[#339933]" />, color: "from-green-500/10 to-emerald-500/5" },
    { name: "Python",     difficulty: "Beginner",     topics: 30, progress: 50,  icon: <DiPython className="text-[#3776ab]" />,      color: "from-blue-400/10 to-indigo-500/5" },
    { name: "MongoDB",    difficulty: "Intermediate", topics: 15, progress: 80,  icon: <DiMongodb className="text-[#47a248]" />,     color: "from-emerald-500/10 to-green-500/5" },
    { name: "MySQL",      difficulty: "Intermediate", topics: 18, progress: 75,  icon: <DiMysql className="text-[#00758f]" />,       color: "from-teal-500/10 to-cyan-500/5" },
    { name: "Redis",      difficulty: "Advanced",     topics: 12, progress: 20,  icon: <DiRedis className="text-[#dc382d]" />,       color: "from-rose-500/10 to-red-500/5" },
    { name: "Docker",     difficulty: "Advanced",     topics: 16, progress: 40,  icon: <DiDocker className="text-[#2496ed]" />,      color: "from-blue-500/10 to-sky-400/5" },
    { name: "DSA",        difficulty: "Advanced",     topics: 55, progress: 25,  icon: <DiDatabase className="text-[#6366f1]" />,    color: "from-violet-500/10 to-indigo-500/5" },
  ];

  const labs = [
    { id: "html",    name: "HTML Lab",         difficulty: "Beginner",     badge: "Live Preview",    desc: "Build real document layouts with semantic HTML, forms, and validations.",                href: "/labs/html",       accent: "#F97316" },
    { id: "css",     name: "CSS Lab",          difficulty: "Beginner",     badge: "Flexbox & Grid",  desc: "Manipulate flex containers, grid placements, animations and media queries.",             href: "/labs/css",        accent: "#3B82F6" },
    { id: "js",      name: "JavaScript Lab",   difficulty: "Intermediate", badge: "Async & Core",    desc: "Test closures, promise chains, throttling, debouncing and ES6 methods.",                href: "/labs/js-lab",     accent: "#FBBF24" },
    { id: "react",   name: "React Lab",        difficulty: "Intermediate", badge: "Hooks & State",   desc: "Code functional components, side-effects, custom hooks, and compound patterns.",        href: "/labs/react-lab",  accent: "#22D3EE" },
    { id: "python",  name: "Python Lab",       difficulty: "Beginner",     badge: "Algorithmic",     desc: "Practice list comprehensions, data structures, OOP patterns.",                          href: "/labs/python",     accent: "#60A5FA" },
    { id: "mongodb", name: "MongoDB Lab",      difficulty: "Intermediate", badge: "Aggregations",    desc: "Execute $match, $project, $lookup pipelines on live mock databases.",                   href: "/labs/mongodb",    accent: "#34D399" },
    { id: "mysql",   name: "MySQL Lab",        difficulty: "Intermediate", badge: "SQL Editor",      desc: "Write CRUD operations, complex joins, indexes and analyze query performance.",           href: "/labs/mysql",      accent: "#2DD4BF" },
    { id: "git",     name: "Git & GitHub Lab", difficulty: "Beginner",     badge: "Version Control", desc: "Visualize git commits, branches, merges, rebases, and resolve conflicts.",              href: "/labs/git",        accent: "#94A3B8" },
  ];

  const problems = [
    { title: "Two Sum",                                          difficulty: "Easy",   solved: "85K+", category: "Arrays & Hashing",        companies: ["Amazon", "Google", "Meta"] },
    { title: "Valid Parentheses",                               difficulty: "Easy",   solved: "72K+", category: "Stacks",                    companies: ["Google", "Microsoft", "Netflix"] },
    { title: "Reverse Linked List",                             difficulty: "Easy",   solved: "64K+", category: "Linked Lists",              companies: ["Amazon", "Meta", "Microsoft"] },
    { title: "Longest Substring Without Repeating Characters",  difficulty: "Medium", solved: "54K+", category: "Sliding Window",            companies: ["Amazon", "Google", "Uber", "Meta"] },
    { title: "Container With Most Water",                       difficulty: "Medium", solved: "48K+", category: "Two Pointers",              companies: ["Google", "Netflix", "Uber"] },
    { title: "LRU Cache",                                       difficulty: "Medium", solved: "32K+", category: "Design",                    companies: ["Amazon", "Microsoft", "Uber"] },
    { title: "Merge k Sorted Lists",                            difficulty: "Hard",   solved: "18K+", category: "Heaps / Divide & Conquer",  companies: ["Google", "Meta", "Netflix"] },
    { title: "Edit Distance",                                   difficulty: "Hard",   solved: "12K+", category: "Dynamic Programming",       companies: ["Meta", "Amazon", "Microsoft"] },
    { title: "Binary Tree Maximum Path Sum",                    difficulty: "Hard",   solved: "15K+", category: "Trees",                     companies: ["Google", "Meta", "Uber"] },
  ];

  const filteredProblems = activeCompanyFilter === "All"
    ? problems
    : problems.filter(p => p.companies.includes(activeCompanyFilter));

  const features = [
    { title: "1000+ Structured Notes",       desc: "Organized across DSA, frontend, backend, databases, DevOps, and interview prep.",        icon: <BookOpen className="w-5 h-5 text-amber-400" /> },
    { title: "DSA Visualizer",               desc: "Step through sorting, trees, graphs, linked lists, recursion, DP, and searching live.",   icon: <Activity className="w-5 h-5 text-cyan-400" /> },
    { title: "Interactive Playground",       desc: "Write, run, and inspect JavaScript and React code directly in the browser.",               icon: <Code className="w-5 h-5 text-violet-400" /> },
    { title: "8 Practice Labs",              desc: "Sandboxed labs for HTML, CSS, JS, React, SQL, Python, MongoDB, and Git.",                  icon: <Laptop className="w-5 h-5 text-emerald-400" /> },
    { title: "MCQ Hub",                      desc: "Topic-wise quizzes with XP tracking, streaks, and badges on completion.",                  icon: <Award className="w-5 h-5 text-fuchsia-400" /> },
    { title: "200+ Interview Questions",     desc: "Curated frontend, backend, full-stack, and DSA questions with full answers.",              icon: <Briefcase className="w-5 h-5 text-rose-400" /> },
    { title: "Company-Tagged Problems",      desc: "Filter 500+ problems by target company: Google, Meta, Amazon, Microsoft.",                 icon: <Target className="w-5 h-5 text-indigo-400" /> },
    { title: "Guided Roadmaps",              desc: "Structured learning pathways from web fundamentals to interview readiness.",               icon: <Map className="w-5 h-5 text-teal-400" /> },
  ];

  const roadmapSteps = [
    { title: "HTML",           desc: "Document structure, semantic elements, forms, inputs, meta tags.",                       status: "Completed" },
    { title: "CSS",            desc: "Typography, Flexbox, Grid, variables, animations, responsive design.",                   status: "Completed" },
    { title: "JavaScript",     desc: "Async, closures, execution context, ES6+, DOM events, patterns.",                       status: "Active" },
    { title: "React",          desc: "Hooks, state, compound components, routing, performance patterns.",                      status: "Locked" },
    { title: "Node.js",        desc: "REST APIs, routing, event loops, file streams, middleware, security.",                   status: "Locked" },
    { title: "Databases",      desc: "MySQL schemas, MongoDB documents, Redis caching, joins, aggregations.",                  status: "Locked" },
    { title: "DSA",            desc: "Algorithms, stacks, queues, trees, graphs, sorting, recursion, DP.",                    status: "Locked" },
    { title: "Next.js",        desc: "SSR/SSG, routing, data fetching, middleware, auth, SEO, deployment.",                    status: "Locked" },
    { title: "Interview Ready",desc: "FAANG simulations, behavioral templates, trick outputs, cheat sheets.",                  status: "Locked" },
  ];

  const terminalLines = [
    "// DSA & Dev Notes — your complete learning stack",
    "import { everything } from 'dsa-dev-notes';",
    "",
    "→  Notes       1,000+ structured docs across 13 tracks",
    "→  Labs        8 sandboxed live coding environments",
    "→  Visualizer  Algorithms rendered step-by-step",
    "→  Problems    500+ with company tags (Google, Meta, Amazon)",
    "→  MCQ Hub     XP-tracked quizzes and achievement badges",
    "→  Interview   200+ curated Q&As, STAR templates",
  ];

  const difficultyColor = (d) =>
    d === "Easy"   ? "text-emerald-400 bg-emerald-950/40 border-emerald-500/20"
    : d === "Medium" ? "text-amber-400 bg-amber-950/40 border-amber-500/20"
    : "text-rose-400 bg-rose-950/40 border-rose-500/20";

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div id="react-landing" className="bg-[#070B18] text-slate-100 min-h-screen relative overflow-x-hidden">

      {/* ── Background: dot grid + top glow ── */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.045) 1px, transparent 1px)",
        backgroundSize: "28px 28px"
      }} />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(251,191,36,0.06) 0%, transparent 70%)" }} />

      {/* ════════════════════════════════════════
          HERO — split layout
      ════════════════════════════════════════ */}
      <section ref={heroRef} className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-14 xl:gap-20 items-center">

          {/* ── Left: text ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-7 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/25 bg-amber-950/20 text-amber-400 text-[11px] font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Complete developer learning OS
            </div>

            <h1 className="sg text-[3.6rem] sm:text-[4.5rem] xl:text-[5.2rem] font-bold leading-[1.0] tracking-tight text-white mb-6">
              Learn.<br />
              Practice.<br />
              <span style={{ color: "#FBBF24" }}>Get hired.</span>
            </h1>

            <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-md">
              DSA visualizers, 8 live coding labs, 500+ company-tagged problems, MCQ quizzes, and 200+ interview Q&As — all in one place. No scattered bookmarks.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <a href={`${baseHref}/overview`}
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black text-sm transition-all hover:-translate-y-0.5 shadow-lg shadow-amber-400/20">
                Browse the Docs
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a href={`${baseHref}/labs`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.1] hover:bg-white/[0.07] hover:border-white/[0.15] text-slate-200 font-bold text-sm transition-all hover:-translate-y-0.5">
                Open a Lab
              </a>
              <a href={`${baseHref}/dsa/problems`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.12] text-slate-400 hover:text-slate-200 font-bold text-sm transition-all hover:-translate-y-0.5">
                Solve Problems
              </a>
            </div>

            {/* Inline mini stats */}
            <div className="flex items-center gap-8 pt-6 border-t border-white/[0.06]">
              {[["1,000+", "Doc Pages"], ["500+", "Problems"], ["8", "Live Labs"], ["200+", "Interview Qs"]].map(([val, lbl]) => (
                <div key={lbl}>
                  <div className="sg text-xl font-bold text-white">{val}</div>
                  <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">{lbl}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: demo stack ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            {/* Terminal */}
            <div className="bg-[#0D1326]/90 border border-white/[0.07] rounded-2xl overflow-hidden shadow-2xl">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-black/20">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/50" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <span className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="flex items-center gap-1.5 ml-3 text-xs text-slate-600 font-mono">
                  <Terminal className="w-3 h-3" />
                  <span>platform.ts</span>
                </div>
              </div>
              <div className="p-6 min-h-[210px]">
                <Typewriter lines={terminalLines} speed={30} />
              </div>
            </div>

            {/* Sort + React side by side */}
            <div className="grid grid-cols-2 gap-4">

              {/* Bubble Sort */}
              <div className="bg-[#0D1326]/90 border border-white/[0.07] rounded-xl p-4 shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-slate-300 font-mono">Bubble Sort</span>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold border font-mono ${
                    isSorting ? "text-amber-400 border-amber-500/30 bg-amber-950/30" : "text-slate-500 border-slate-800 bg-slate-950/40"
                  }`}>{isSorting ? "running…" : "ready"}</span>
                </div>
                <div className="h-14 flex items-end gap-1 mb-3">
                  {sortingArray.map((h, i) => (
                    <div key={i} style={{ height: `${h}%` }}
                      className={`flex-1 rounded-t transition-all duration-300 ${
                        sortingIndex.includes(i)
                          ? "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]"
                          : "bg-slate-700/60"
                      }`} />
                  ))}
                </div>
                <div className="flex gap-1.5">
                  <button onClick={triggerSortingDemo}
                    className="flex-1 flex items-center justify-center gap-1 text-[10px] font-bold py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black transition-colors">
                    <Play className="w-2.5 h-2.5" />
                    {isSorting ? "Sorting…" : "Run"}
                  </button>
                  <button onClick={resetSortingDemo}
                    className="px-2.5 py-1.5 text-[10px] rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-500 transition-colors">
                    <RefreshCw className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* React Counter */}
              <div className="bg-[#0D1326]/90 border border-white/[0.07] rounded-xl p-4 shadow-xl">
                <div className="flex items-center gap-2 mb-3">
                  <DiReact className="text-cyan-400 text-base animate-spin [animation-duration:12s]" />
                  <span className="text-[11px] font-bold text-slate-300 font-mono">React Lab</span>
                </div>
                <div className="bg-black/30 rounded-lg p-3 text-[10px] font-mono border border-white/[0.05]">
                  <p className="text-slate-600">{"// useState in action"}</p>
                  <p className="mb-2"><span className="text-violet-400">const</span> [n, set] = useState(<span className="text-amber-400">0</span>)</p>
                  <div className="flex items-center justify-between bg-black/30 rounded px-2.5 py-2 border border-white/[0.05]">
                    <span className="text-cyan-300 font-bold">n: {reactLabCount}</span>
                    <button onClick={() => setReactLabCount(p => p + 1)}
                      className="bg-amber-400 hover:bg-amber-300 text-black font-black text-[9px] px-2 py-1 rounded transition-colors">
                      +1
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═════════════════════════════════════════
          WHY DSA & DEV NOTES?
      ═════════════════════════════════════════ */}
      <section ref={whyRef} className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={whyInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Tag color="amber">Why Choose Us?</Tag>
          <h2 className="sg mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight">
            One Platform. Infinite Possibilities.
          </h2>
          <p className="text-slate-500 mt-6 text-base max-w-xl">
            Stop juggling dozens of tabs and subscriptions. DSA & Dev Notes gives you everything you need to learn, practice, and prepare — all in one cohesive, interactive ecosystem.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={whyInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {/* Feature 1: All-in-One */}
          <motion.div
            key="all-in-one"
            initial={{ opacity: 0, x: -20 }}
            animate={whyInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex flex-col items-center bg-[#0D1326]/60 border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.12] transition-colors duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-4">
              <Layers className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">All-in-One Platform</h3>
            <p className="text-slate-400 text-center text-sm">
              DSA, web dev, databases, DevOps, interview prep — all integrated. No more context switching.
            </p>
          </motion.div>

          {/* Feature 2: Interactive Learning */}
          <motion.div
            key="interactive"
            initial={{ opacity: 0, x: 0 }}
            animate={whyInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex flex-col items-center bg-[#0D1326]/60 border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.12] transition-colors duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-4">
              <Activity className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Interactive Learning</h3>
            <p className="text-slate-400 text-center text-sm">
              Visualize algorithms, code in live labs, and test your knowledge with instant feedback.
            </p>
          </motion.div>

          {/* Feature 3: Interview Ready */}
          <motion.div
            key="interview-ready"
            initial={{ opacity: 0, x: 20 }}
            animate={whyInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex flex-col items-center bg-[#0D1326]/60 border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.12] transition-colors duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-4">
              <Briefcase className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Interview Ready</h3>
            <p className="text-slate-400 text-center text-sm">
              Company-tagged problems, mock interviews, and curated questions to ace your next interview.
            </p>
          </motion.div>
        </motion.div>
      </section>
      {/* ── Marquee strip ── */}
      <div className="border-y border-white/[0.05] bg-black/20 overflow-hidden py-2.5 relative z-10">
        <div className="flex">
          {[0, 1].map(d => (
            <div key={d} className="flex gap-4 items-center shrink-0 animate-marquee" aria-hidden={d === 1}>
              {["Sorting Visualizer","Binary Trees","React Sandbox","SQL Editor","Python Lab","Graph Traversal","MCQ Hub","Git Visualizer","DSA Problems","CSS Grid Lab","MongoDB Pipelines","Interview Q&A"].map((t, i) => (
                <div key={i} className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/[0.03] border border-white/[0.05] text-slate-500 font-mono text-[11px] whitespace-nowrap">
                  <span className="w-1 h-1 rounded-full bg-amber-500/60" />
                  {t}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════
          STATS BAR
      ════════════════════════════════════════ */}
      <section ref={statsRef} className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-y md:divide-y-0 divide-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden bg-[#0D1326]/50"
        >
          {[
            { end: 1000, suffix: "+", label: "Doc Pages",       icon: <BookOpen className="w-4 h-4" /> },
            { end: 500,  suffix: "+", label: "Problems",        icon: <Code className="w-4 h-4" /> },
            { end: 200,  suffix: "+", label: "Interview Qs",    icon: <Briefcase className="w-4 h-4" /> },
            { end: 8,    suffix: "",  label: "Live Labs",        icon: <Laptop className="w-4 h-4" /> },
            { end: 13,   suffix: "",  label: "Tech Tracks",      icon: <Layers className="w-4 h-4" /> },
            { end: 100,  suffix: "+", label: "Visualizations",  icon: <Activity className="w-4 h-4" /> },
          ].map((s) => (
            <div key={s.label} className="px-6 py-8 flex flex-col items-center text-center gap-2 bg-[#070B18]">
              <div className="text-slate-700 mb-1">{s.icon}</div>
              <AnimatedCounter end={s.end} suffix={s.suffix} />
              <span className="text-slate-600 text-[10px] font-bold tracking-wider uppercase">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ════════════════════════════════════════
          LEARNING TRACKS
      ════════════════════════════════════════ */}
      <section ref={tracksRef} className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <div className="mb-14">
          <Tag color="amber">13 Learning Tracks</Tag>
          <h2 className="sg mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Every technology you need to master
          </h2>
          <p className="text-slate-500 mt-3 text-base max-w-xl">
            Structured notes, visualizations, labs, and quizzes for each technology — from fundamentals to production.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={tracksInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
        >
          {tracks.map((track, i) => (
            <motion.div
              key={track.name}
              initial={{ opacity: 0, y: 16 }}
              animate={tracksInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`relative p-5 rounded-xl bg-gradient-to-br ${track.color} border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 cursor-pointer`}
            >
              <div className="text-3xl mb-3">{track.icon}</div>
              <h3 className="text-sm font-bold text-white mb-1">{track.name}</h3>
              <div className="flex items-center justify-between text-[10px] text-slate-500 mb-2">
                <span>{track.topics} topics</span>
                <span className={`font-bold ${
                  track.difficulty === "Beginner" ? "text-emerald-500"
                  : track.difficulty === "Intermediate" ? "text-amber-500"
                  : "text-rose-500"
                }`}>{track.difficulty}</span>
              </div>
              <div className="w-full bg-black/30 h-1 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full transition-all duration-700"
                  style={{ width: `${track.progress}%` }} />
              </div>
              <div className="text-[9px] text-slate-700 font-mono mt-1">{track.progress}% ready</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ════════════════════════════════════════
          VISUALIZER SHOWCASE
      ════════════════════════════════════════ */}
      <section ref={visRef} className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <div className="relative bg-[#0D1326]/60 border border-white/[0.07] rounded-3xl overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
          <div className="absolute top-1/3 right-0 w-72 h-72 bg-amber-500/[0.04] rounded-full blur-[80px]" />

          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-10 md:p-14 flex flex-col gap-6 justify-center border-r border-white/[0.06]">
              <Tag color="amber">Algorithm Visualizer</Tag>
              <h2 className="sg text-3xl sm:text-4xl font-bold text-white leading-tight">
                See algorithms execute,<br />not just read about them
              </h2>
              <p className="text-slate-500 leading-relaxed">
                Step through sorting, tree traversal, graph BFS/DFS, dynamic programming, and recursion call stacks — rendered live so the patterns click.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Sorting","Binary Trees","Graphs","Linked Lists","Recursion","Dynamic Programming"].map(tab => (
                  <button key={tab} onClick={() => setActiveVisualizerTab(tab)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-bold font-mono transition-all border ${
                      activeVisualizerTab === tab
                        ? "bg-amber-400 text-black border-amber-400"
                        : "bg-white/[0.03] border-white/[0.08] text-slate-500 hover:text-slate-200 hover:border-white/[0.15]"
                    }`}>
                    {tab}
                  </button>
                ))}
              </div>
              <a href={`${baseHref}/visualizer`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm bg-amber-400 hover:bg-amber-300 text-black transition-all w-fit shadow shadow-amber-400/20">
                Launch Visualizer
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            <div className="p-8 md:p-10 flex flex-col justify-center">
              <div className="bg-[#070B18] rounded-2xl border border-white/[0.07] overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
                  <span className="text-xs font-mono font-bold text-amber-400">{activeVisualizerTab} Visualizer</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-slate-600 font-mono">live</span>
                  </div>
                </div>
                <div className="min-h-[200px] flex items-center justify-center p-6">
                  {activeVisualizerTab === "Sorting" && (
                    <div className="w-full flex items-end justify-between h-36 gap-1.5">
                      {[35, 65, 20, 85, 45, 95, 55, 70].map((h, i) => (
                        <div key={i} className="flex flex-col items-center gap-1 flex-1">
                          <div style={{ height: `${h * 1.4}px` }}
                            className="w-full bg-gradient-to-t from-amber-600 to-amber-300 rounded-t-sm shadow-[0_0_6px_rgba(251,191,36,0.3)]" />
                          <span className="text-[8px] font-mono text-slate-700">{h}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {activeVisualizerTab === "Binary Trees" && (
                    <svg viewBox="0 0 220 130" className="w-full max-w-xs">
                      <line x1="110" y1="24" x2="60" y2="66" stroke="#d97706" strokeWidth="1.5" />
                      <line x1="110" y1="24" x2="160" y2="66" stroke="#d97706" strokeWidth="1.5" />
                      <line x1="60" y1="66" x2="35" y2="108" stroke="#d97706" strokeWidth="1.5" />
                      <line x1="60" y1="66" x2="85" y2="108" stroke="#d97706" strokeWidth="1.5" />
                      <line x1="160" y1="66" x2="135" y2="108" stroke="#d97706" strokeWidth="1.5" />
                      {[[110,18,"10"],[60,60,"5"],[160,60,"15"],[35,102,"2"],[85,102,"7"],[135,102,"12"]].map(([cx,cy,v],i) => (
                        <g key={i}>
                          <circle cx={cx} cy={cy} r="14" fill="#1c1407" stroke="#d97706" strokeWidth="1.5" />
                          <text x={cx} y={cy+4} textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="monospace">{v}</text>
                        </g>
                      ))}
                    </svg>
                  )}
                  {activeVisualizerTab === "Graphs" && (
                    <svg viewBox="0 0 220 130" className="w-full max-w-xs">
                      <line x1="50" y1="30" x2="170" y2="30" stroke="#475569" strokeWidth="1.5" />
                      <line x1="50" y1="30" x2="110" y2="100" stroke="#d97706" strokeWidth="1.5" />
                      <line x1="170" y1="30" x2="110" y2="100" stroke="#475569" strokeWidth="1.5" />
                      <line x1="50" y1="30" x2="20" y2="100" stroke="#475569" strokeWidth="1.5" />
                      {[["A",50,30,"#b45309"],["B",170,30,"#b45309"],["C",110,100,"#d97706"],["D",20,100,"#b45309"]].map(([l,cx,cy,col]) => (
                        <g key={l}>
                          <circle cx={cx} cy={cy} r="16" fill={col+"22"} stroke={col} strokeWidth="1.5" />
                          <text x={cx} y={cy+4} textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold" fontFamily="monospace">{l}</text>
                        </g>
                      ))}
                    </svg>
                  )}
                  {activeVisualizerTab === "Linked Lists" && (
                    <div className="flex items-center gap-2 flex-wrap justify-center">
                      {[10, 20, 30, 40].map((v, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="border border-amber-500/30 rounded-lg overflow-hidden bg-amber-950/10 flex">
                            <div className="px-3 py-2 text-xs font-mono font-bold text-amber-300 border-r border-amber-500/20">{v}</div>
                            <div className="px-2 py-2 text-[9px] font-mono text-slate-600">next</div>
                          </div>
                          {i < 3 && <span className="text-amber-600 font-bold text-sm">→</span>}
                        </div>
                      ))}
                      <span className="text-slate-600 font-mono text-xs ml-1">null</span>
                    </div>
                  )}
                  {activeVisualizerTab === "Recursion" && (
                    <div className="flex flex-col gap-1.5 w-full font-mono text-xs">
                      <p className="text-slate-600">{"// Call stack — factorial(4)"}</p>
                      {["factorial(1) → 1","factorial(2) → 2×1=2","factorial(3) → 3×2=6","factorial(4) → 4×6=24"].map((l, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="flex-1 bg-amber-950/20 border-l-2 border-amber-500/50 px-3 py-1.5 text-slate-400 rounded-r" style={{ marginLeft: `${i * 12}px` }}>
                            {l}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {activeVisualizerTab === "Dynamic Programming" && (
                    <div className="w-full">
                      <p className="text-[10px] font-mono text-slate-600 mb-3">{"// Fibonacci DP table"}</p>
                      <div className="grid grid-cols-5 gap-1.5">
                        {[0,1,1,2,3,5,8,13,21,34].map((v, i) => (
                          <div key={i} className="bg-amber-950/20 border border-amber-500/15 rounded-lg p-2 text-center">
                            <div className="text-[8px] text-slate-600 font-mono">dp[{i}]</div>
                            <div className="text-sm font-black font-mono text-amber-400">{v}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          INTERACTIVE LABS
      ════════════════════════════════════════ */}
      <section ref={labsRef} className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <div className="flex flex-col items-center gap-3 mb-14 text-center">
          <Tag color="cyan">8 Coding Labs</Tag>
          <h2 className="sg text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Code it, don't just read it
          </h2>
          <p className="text-slate-500 max-w-xl text-base md:text-lg">
            Sandboxed environments with live execution. Write real code, see real output — no setup, no config.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={labsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {labs.map((lab, i) => (
            <motion.div key={lab.id}
              initial={{ opacity: 0, y: 16 }}
              animate={labsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group flex flex-col rounded-2xl bg-[#0D1326]/70 border border-white/[0.06] hover:border-white/[0.12] overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex items-center gap-2 px-4 py-2.5 bg-black/20 border-b border-white/[0.05]">
                <div className="flex gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
                </div>
                <span className="text-[10px] font-mono text-slate-600 ml-2">{lab.id}_sandbox</span>
              </div>
              <div className="p-5 flex-1 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm">{lab.name}</h3>
                  <span className="text-[9px] font-bold text-slate-600 bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded">{lab.difficulty}</span>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed flex-1">{lab.desc}</p>
                <div className="bg-black/30 rounded-lg px-3 py-2 font-mono text-[10px] text-slate-600 border border-white/[0.05]">
                  <span className="text-pink-400">import</span> &#123; lab &#125; <span className="text-pink-400">from</span> <span style={{color: lab.accent}}>"{lab.id}"</span>
                </div>
                <a href={`${baseHref}${lab.href}`}
                  className="flex items-center justify-center gap-1.5 py-2 rounded-xl font-bold text-xs transition-colors text-black"
                  style={{ background: lab.accent }}>
                  Launch Lab <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ════════════════════════════════════════
          PROBLEMS TABLE
      ════════════════════════════════════════ */}
      <section ref={problemsRef} className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <div className="flex flex-col items-center gap-3 mb-14 text-center">
          <Tag color="amber">500+ Problems</Tag>
          <h2 className="sg text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Practice problems, filtered by company
          </h2>
          <p className="text-slate-500 max-w-xl text-base">
            Every problem tagged with the companies that ask it. Prep for Google, Meta, Amazon, Microsoft, Netflix, and Uber.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {["All","Google","Meta","Amazon","Microsoft","Netflix","Uber"].map(c => (
            <button key={c} onClick={() => setActiveCompanyFilter(c)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                activeCompanyFilter === c
                  ? "bg-amber-400 text-black border-amber-400"
                  : "bg-white/[0.03] text-slate-500 border-white/[0.07] hover:border-white/[0.15] hover:text-slate-300"
              }`}>
              {c}
            </button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={problemsInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="border border-white/[0.07] rounded-2xl overflow-hidden bg-[#0D1326]/40"
        >
          <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/[0.06] bg-black/20">
            <span className="col-span-5 text-[10px] font-bold text-slate-600 uppercase tracking-wider">Problem</span>
            <span className="col-span-2 text-[10px] font-bold text-slate-600 uppercase tracking-wider">Difficulty</span>
            <span className="col-span-2 text-[10px] font-bold text-slate-600 uppercase tracking-wider hidden md:block">Category</span>
            <span className="col-span-3 text-[10px] font-bold text-slate-600 uppercase tracking-wider hidden lg:block">Companies</span>
          </div>
          <AnimatePresence>
            {filteredProblems.map((p, i) => (
              <motion.div key={p.title}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ delay: i * 0.04 }}
                className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors items-center group"
              >
                <div className="col-span-5 flex items-center gap-3">
                  <div className="w-6 h-6 rounded-md bg-black/30 border border-white/[0.06] flex items-center justify-center text-[9px] font-mono text-slate-600 shrink-0">{i + 1}</div>
                  <a href={`${baseHref}/dsa/problems`}
                    className="text-sm font-semibold text-slate-300 hover:text-amber-400 transition-colors leading-tight">{p.title}</a>
                </div>
                <div className="col-span-2">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${difficultyColor(p.difficulty)}`}>{p.difficulty}</span>
                </div>
                <div className="col-span-2 hidden md:block">
                  <span className="text-[11px] text-slate-600 font-mono">{p.category}</span>
                </div>
                <div className="col-span-3 hidden lg:flex items-center gap-1.5 flex-wrap">
                  {p.companies.slice(0, 3).map(c => (
                    <span key={c} className="text-[9px] font-bold px-2 py-0.5 rounded bg-black/30 border border-white/[0.06] text-slate-600">{c}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div className="px-6 py-4 border-t border-white/[0.06] bg-black/10 flex items-center justify-between">
            <span className="text-xs text-slate-700 font-mono">Showing {filteredProblems.length} of 500+ problems</span>
            <a href={`${baseHref}/dsa/problems`}
              className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════
          MCQ HUB
      ════════════════════════════════════════ */}
      <section ref={mcqRef} className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <div className="relative bg-[#0D1326]/60 border border-white/[0.07] rounded-3xl overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500/30 to-transparent" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-fuchsia-500/[0.04] rounded-full blur-[100px]" />
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-10 md:p-14 flex flex-col gap-6 justify-center">
              <Tag color="fuchsia">MCQ Hub</Tag>
              <h2 className="sg text-3xl sm:text-4xl font-bold text-white leading-tight">
                Quiz yourself until it sticks
              </h2>
              <p className="text-slate-500 leading-relaxed">
                Topic-tagged questions across HTML, CSS, JavaScript, React, Node, Databases, and DSA. Earn XP, unlock streaks, and collect badges as you go.
              </p>
              <div className="flex flex-col gap-3">
                {["Instant right/wrong feedback with explanations","XP-tracked progress across all modules","Badges and streaks for consistent learners"].map((f, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-slate-400">
                    <span className="w-5 h-5 rounded-full bg-fuchsia-950/60 border border-fuchsia-500/30 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-fuchsia-400" />
                    </span>
                    {f}
                  </div>
                ))}
              </div>
              <a href={`${baseHref}/mcq`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm bg-fuchsia-600 hover:bg-fuchsia-500 text-white transition-all w-fit shadow shadow-fuchsia-500/20">
                Launch MCQ Quiz <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            <div className="p-8 md:p-10 flex items-center justify-center">
              <div className="w-full max-w-sm bg-[#070B18] rounded-2xl border border-white/[0.07] overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-fuchsia-400" />
                    <span className="text-xs font-bold text-white">JavaScript Quiz</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-mono font-bold">
                    <Trophy className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-amber-400">{quizScore} XP</span>
                  </div>
                </div>
                <div className="p-5 flex flex-col gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-slate-600 block mb-2">Q1 of 5</span>
                    <p className="text-sm font-semibold text-slate-200 leading-relaxed">
                      What does <code className="bg-black/40 border border-white/[0.08] px-1.5 py-0.5 rounded text-fuchsia-300 text-[11px]">typeof null</code> evaluate to?
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    {[{ text: '"object"', correct: true }, { text: '"null"', correct: false }, { text: '"undefined"', correct: false }].map((ans, idx) => {
                      let cls = "bg-white/[0.03] border-white/[0.08] text-slate-400 hover:border-white/[0.15] hover:text-slate-200";
                      if (selectedQuizAnswer === idx)
                        cls = ans.correct ? "bg-emerald-950/60 border-emerald-500/50 text-emerald-300" : "bg-red-950/60 border-red-500/50 text-red-300";
                      return (
                        <button key={idx} onClick={() => handleQuizAnswer(idx, ans.correct)}
                          className={`text-left px-4 py-3 rounded-xl border text-xs font-mono font-semibold transition-all flex items-center justify-between ${cls}`}>
                          <span>{ans.text}</span>
                          {selectedQuizAnswer === idx && <span className="text-base">{ans.correct ? "✓" : "✗"}</span>}
                        </button>
                      );
                    })}
                  </div>
                  {quizFeedback && (
                    <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-fuchsia-950/20 border border-fuchsia-500/20">
                      <span className="text-[11px] text-fuchsia-300 font-medium">{quizFeedback}</span>
                      <button onClick={() => { setSelectedQuizAnswer(null); setQuizFeedback(""); }}
                        className="text-[10px] text-fuchsia-500 hover:text-fuchsia-300">
                        <RefreshCw className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          INTERVIEW PREP
      ════════════════════════════════════════ */}
      <section ref={prepRef} className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <div className="flex flex-col items-center gap-3 mb-14 text-center">
          <Tag color="emerald">Interview Prep</Tag>
          <h2 className="sg text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Prep for real loops, not just theory
          </h2>
          <p className="text-slate-500 max-w-xl text-base">
            200+ curated questions with in-depth answers, spanning every role in the modern stack.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={prepInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {[
            { title: "Frontend",   desc: "Browser rendering pipeline, performance, event loops, security, accessibility.", badge: "HTML · CSS",     icon: <Layout className="w-4 h-4 text-orange-400" /> },
            { title: "JavaScript", desc: "Closures, prototypal inheritance, async workflows, throttling, ES6+ specs.",      badge: "Core JS",        icon: <DiJavascript1 className="text-yellow-400 text-xl" /> },
            { title: "React",      desc: "Hooks, lifecycle, Virtual DOM, compound patterns, performance optimization.",     badge: "Hooks · Design", icon: <DiReact className="text-cyan-400 text-xl" /> },
            { title: "Node.js",    desc: "Event loop internals, non-blocking I/O, REST APIs, middleware, streams.",         badge: "APIs · Servers", icon: <DiNodejsSmall className="text-green-400 text-xl" /> },
            { title: "Full-Stack", desc: "Auth patterns, caching, API design, DB modeling, deployment decisions.",          badge: "End-to-end",     icon: <Layers className="w-4 h-4 text-violet-400" /> },
            { title: "Behavioral", desc: "STAR method templates, conflict resolution, leadership, execution scenarios.",    badge: "STAR Templates", icon: <Users className="w-4 h-4 text-fuchsia-400" /> },
          ].map((card, i) => (
            <motion.div key={card.title}
              initial={{ opacity: 0, y: 12 }}
              animate={prepInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-[#0D1326]/60 border border-white/[0.06] hover:border-emerald-500/25 hover:bg-[#0D1326]/90 transition-all group flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-black/30 border border-white/[0.07] flex items-center justify-center">
                  {card.icon}
                </div>
                <span className="text-[10px] font-bold font-mono text-emerald-500 bg-emerald-950/20 border border-emerald-500/20 px-2 py-0.5 rounded">
                  {card.badge}
                </span>
              </div>
              <div>
                <h3 className="sg text-base font-bold text-white mb-1.5">{card.title} Interviews</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{card.desc}</p>
              </div>
              <a href={`${baseHref}/interview`}
                className="mt-auto flex items-center justify-between text-xs text-slate-600 border-t border-white/[0.06] pt-4 hover:text-emerald-400 transition-colors font-semibold">
                <span className="font-mono">200+ questions</span>
                <span className="flex items-center gap-0.5">Explore <ChevronRight className="w-3.5 h-3.5" /></span>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ════════════════════════════════════════
          FEATURES
      ════════════════════════════════════════ */}
      <section ref={featuresRef} className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 items-start">
          <div className="lg:sticky lg:top-24">
            <Tag color="amber">Platform Features</Tag>
            <h2 className="sg mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              Everything,<br />not a collection<br />of links
            </h2>
            <p className="text-slate-500 mt-4 text-sm leading-relaxed">
              Eight feature pillars, fully interconnected — so your notes, practice, and prep reinforce each other.
            </p>
            <a href={`${baseHref}/overview`}
              className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black text-sm transition-all shadow shadow-amber-400/20">
              Explore the Platform <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={featuresInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {features.map((f, i) => (
              <motion.div key={f.title}
                initial={{ opacity: 0, y: 12 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.05 }}
                className="p-5 rounded-xl bg-[#0D1326]/60 border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 flex gap-4"
              >
                <div className="w-9 h-9 rounded-xl bg-black/30 border border-white/[0.07] flex items-center justify-center shrink-0 mt-0.5">
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">{f.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          ROADMAP
      ════════════════════════════════════════ */}
      <section id="roadmap" ref={roadmapRef} className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <div className="flex flex-col items-center gap-3 mb-14 text-center">
          <Tag color="indigo">Guided Roadmap</Tag>
          <h2 className="sg text-3xl sm:text-4xl font-bold text-white tracking-tight">
            From fundamentals to interview-ready
          </h2>
          <p className="text-slate-500 max-w-xl text-base">
            A structured path through every layer of the modern dev stack.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 bg-[#0D1326]/50 border border-white/[0.07] rounded-2xl p-6 md:p-8">
            <div className="relative flex flex-col gap-2">
              <div className="absolute left-[18px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-amber-500/60 via-violet-500/30 to-white/[0.05]" />
              {roadmapSteps.map((step, idx) => {
                const isActive = activeRoadmapStep === idx;
                return (
                  <button key={step.title} onClick={() => setActiveRoadmapStep(idx)}
                    className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all duration-200 ${
                      isActive
                        ? "bg-[#0D1326] border-amber-500/40 shadow-lg shadow-amber-500/5"
                        : "border-transparent hover:bg-white/[0.02] hover:border-white/[0.06]"
                    }`}>
                    <div className={`relative z-10 w-9 h-9 rounded-full border flex items-center justify-center text-xs font-mono font-black shrink-0 transition-all ${
                      isActive ? "bg-amber-400 border-amber-400 text-black shadow shadow-amber-400/40"
                      : step.status === "Completed" ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-400"
                      : "bg-black/30 border-white/[0.08] text-slate-600"
                    }`}>
                      {step.status === "Completed" ? <Check className="w-4 h-4" /> : step.status === "Locked" ? <Lock className="w-3 h-3" /> : idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-bold text-white">{step.title}</span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded font-mono ${
                          step.status === "Completed" ? "text-emerald-400 bg-emerald-950/20"
                          : step.status === "Active" ? "text-amber-400 bg-amber-950/20"
                          : "text-slate-600 bg-black/30"
                        }`}>{step.status}</span>
                      </div>
                      <p className="text-slate-500 text-xs leading-relaxed line-clamp-1">{step.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-4 bg-[#0D1326]/50 border border-white/[0.07] rounded-2xl p-6 sticky top-20">
            <span className="text-[10px] font-mono text-amber-400 font-bold">MILESTONE {activeRoadmapStep + 1}</span>
            <h3 className="sg text-2xl font-bold text-white mt-1 mb-1">{roadmapSteps[activeRoadmapStep].title}</h3>
            <p className="text-slate-500 text-xs leading-relaxed mb-5">{roadmapSteps[activeRoadmapStep].desc}</p>
            <div className="flex flex-col gap-2 text-xs font-mono text-slate-600 mb-6">
              {["Structured notes & docs","Interactive lab challenges","Topic MCQs & practice problems","Interview questions + answers"].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-amber-500">›</span> {item}
                </div>
              ))}
            </div>
            <a href={`${baseHref}/overview`}
              className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-black font-black rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow shadow-amber-400/20">
              Browse {roadmapSteps[activeRoadmapStep].title} Notes <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          TECH STACK STRIP
      ════════════════════════════════════════ */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <div className="text-center mb-8">
          <span className="text-xs text-slate-700 font-bold tracking-widest uppercase">13 Technologies Covered</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { icon: <DiHtml5 />, name: "HTML",       col: "text-orange-400" },
            { icon: <DiCss3 />, name: "CSS",          col: "text-blue-400" },
            { icon: <DiJavascript1 />, name: "JS",    col: "text-yellow-400" },
            { icon: <DiReact />, name: "React",       col: "text-cyan-400" },
            { icon: <SiNextdotjs />, name: "Next.js", col: "text-slate-300" },
            { icon: <DiAngularSimple />, name: "Angular", col: "text-red-400" },
            { icon: <DiNodejsSmall />, name: "Node",  col: "text-green-400" },
            { icon: <DiPython />, name: "Python",     col: "text-blue-300" },
            { icon: <DiMongodb />, name: "MongoDB",   col: "text-emerald-400" },
            { icon: <DiMysql />, name: "MySQL",       col: "text-teal-400" },
            { icon: <DiRedis />, name: "Redis",       col: "text-rose-400" },
            { icon: <DiDocker />, name: "Docker",     col: "text-sky-400" },
            { icon: <DiGitBranch />, name: "Git",     col: "text-orange-300" },
          ].map(t => (
            <div key={t.name}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.05] transition-all ${t.col}`}>
              <span className="text-xl">{t.icon}</span>
              <span className="text-slate-400 text-xs font-semibold font-mono">{t.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════
          CTA
      ════════════════════════════════════════ */}
      <section ref={ctaRef} className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={ctaInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="relative bg-[#0D1326]/70 border border-amber-500/15 rounded-3xl px-8 py-24 md:py-32 text-center overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse at 50% 0%, rgba(251,191,36,0.06) 0%, transparent 70%)"
          }} />
          <div className="relative z-10 flex flex-col items-center gap-6 max-w-2xl mx-auto">
            <Tag color="amber"><Sparkles className="w-3 h-3" /> Open Platform</Tag>
            <h2 className="sg text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
              Your complete developer<br />prep platform
            </h2>
            <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-lg">
              Notes, labs, visualizers, problems, quizzes, and interview prep — no scattered bookmarks, no half-finished tutorials.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mt-2">
              <a href={`${baseHref}/overview`}
                className="px-7 py-3.5 rounded-xl font-black bg-amber-400 hover:bg-amber-300 text-black shadow-xl shadow-amber-400/20 transition-all hover:-translate-y-0.5 text-sm">
                Browse Docs
              </a>
              <a href={`${baseHref}/labs`}
                className="px-7 py-3.5 rounded-xl font-bold bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.09] hover:border-white/[0.18] text-white transition-all hover:-translate-y-0.5 text-sm">
                Launch Labs
              </a>
              <a href={`${baseHref}/dsa/problems`}
                className="px-7 py-3.5 rounded-xl font-bold bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.12] text-slate-400 hover:text-white transition-all hover:-translate-y-0.5 text-sm">
                Solve Problems
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════ */}
      <footer className="relative z-10 max-w-7xl mx-auto px-6 border-t border-white/[0.05] pt-14 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <a href={base} className="flex items-center gap-2.5 font-bold text-white">
              <div className="w-7 h-7 rounded-lg bg-amber-400 flex items-center justify-center">
                <Binary className="w-4 h-4 text-black" />
              </div>
              <span className="text-sm sg">DSA & Dev Notes</span>
            </a>
            <p className="text-slate-700 text-xs leading-relaxed">
              A comprehensive learning hub for DSA, web development, databases, DevOps, labs, quizzes, and interview prep.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[11px] text-slate-600 font-bold uppercase tracking-widest">Learn</span>
            <ul className="flex flex-col gap-2 text-xs text-slate-700">
              {[["Docs", "/overview"], ["Labs", "/labs"], ["Visualizer", "/visualizer"], ["MCQ Hub", "/mcq"]].map(([l, h]) => (
                <li key={l}><a href={`${baseHref}${h}`} className="hover:text-amber-400 transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[11px] text-slate-600 font-bold uppercase tracking-widest">Prepare</span>
            <ul className="flex flex-col gap-2 text-xs text-slate-700">
              {[["Problems", "/dsa/problems"], ["Interview Prep", "/interview"], ["Roadmap", "#roadmap"], ["Playground", "/playground"]].map(([l, h]) => (
                <li key={l}><a href={h.startsWith("#") ? h : `${baseHref}${h}`} className="hover:text-amber-400 transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[11px] text-slate-600 font-bold uppercase tracking-widest">Connect</span>
            <ul className="flex flex-col gap-2 text-xs text-slate-700">
              <li>
                <a href="https://github.com/prathameshp107/DSA-Notes-Problems" target="_blank" rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <FaGithub className="w-3.5 h-3.5" /> GitHub Repository
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/[0.04] text-xs text-slate-800">
          <p>© {new Date().getFullYear()} DSA & Dev Notes. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span>Built by <strong className="text-slate-600">Prathamesh Pawar</strong></span>
            <a href="https://github.com/prathameshp107/DSA-Notes-Problems" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-700 hover:text-white transition-colors font-semibold">
              <FaGithub className="w-4 h-4" /> Star on GitHub
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
