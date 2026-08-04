import '../styles/sketch-visualizer.css';

const TECH_STACK = [
  { layer: 'Framework', tech: 'Astro v6 + Starlight' },
  { layer: 'UI Components', tech: 'React 19 (@astrojs/react)' },
  { layer: 'Styling', tech: 'Tailwind CSS' },
  { layer: 'Interactive Code', tech: 'Monaco Editor, Babel Standalone' },
  { layer: 'Visualizations', tech: 'D3.js, XYFlow (React Flow), Mermaid' },
  { layer: 'SQL / Python Runtime', tech: 'sql.js (WASM SQLite), Pyodide (WASM Python)' },
  { layer: 'State Management', tech: 'Zustand' },
  { layer: 'Deployment', tech: 'Vercel' },
];

const SECTIONS = [
  { icon: '🤖', title: 'AI Engineering', desc: 'An 11-phase curriculum — ML fundamentals through LLMs, RAG, agents, MCP, and production LLMOps.' },
  { icon: '🧮', title: 'DSA & Algorithms', desc: 'Data structures, patterns, and a coding playground with a real in-browser judge.' },
  { icon: '🏗️', title: 'System Design', desc: 'HLD/LLD fundamentals plus staged, interactive architecture case studies.' },
  { icon: '💻', title: 'Web Development', desc: 'JavaScript, React, Angular, Next.js, Node.js — docs, labs, and interview questions.' },
  { icon: '🗄️', title: 'Databases & DevOps', desc: 'SQL, MongoDB, Redis, Docker, AWS — with hands-on lab environments.' },
  { icon: '🎯', title: 'Interview Prep', desc: 'Company-specific plans, behavioral question banks, MCQ rounds, and study roadmaps.' },
];

export default function AboutPage() {
  const base = (import.meta.env.BASE_URL && import.meta.env.BASE_URL !== '/')
    ? import.meta.env.BASE_URL.replace(/\/$/, '')
    : '';
  const repoUrl = 'https://github.com/prathameshp107/Astro-Docs-Sitre';

  return (
    <div className="font-sketch max-w-5xl mx-auto px-4 py-10">
      <section className="sketch-border bg-[var(--sketch-bg-dim)] p-6 md:p-10 rounded-3xl mb-10 border-2 border-[var(--sketch-border)] shadow-2xl text-center">
        <span className="inline-block sketch-border-soft px-3 py-1 text-xs font-mono font-bold bg-amber-500/20 text-amber-400 border-amber-500/40 rounded-full mb-4">
          🧠 ABOUT THIS PLATFORM
        </span>
        <h1 className="font-header font-bold text-3xl md:text-4xl text-[var(--sketch-text)] mb-4">
          A single, interactive knowledge base for going from code to interview-ready
        </h1>
        <p className="text-[var(--sketch-text-muted)] text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          A large, continuously-growing documentation site covering AI engineering, data structures &amp; algorithms,
          web development, databases, DevOps, and system design — with interactive visualizers, coding playgrounds,
          MCQ rounds, lab environments, and Mermaid diagrams throughout. Built on <strong>Astro + Starlight</strong>.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-header font-bold text-2xl text-[var(--sketch-text)] mb-4 flex items-center gap-2">
          <span>📚</span> What's Inside
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SECTIONS.map((s) => (
            <div key={s.title} className="sketch-panel-box sketch-border p-5 rounded-2xl bg-[var(--sketch-bg-dim)] border border-[var(--sketch-border)]">
              <div className="text-2xl mb-2">{s.icon}</div>
              <h3 className="font-header font-bold text-base text-[var(--sketch-text)] mb-1">{s.title}</h3>
              <p className="text-xs text-[var(--sketch-text-muted)] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-header font-bold text-2xl text-[var(--sketch-text)] mb-4 flex items-center gap-2">
          <span>🛠️</span> Built With
        </h2>
        <div className="sketch-border bg-[var(--sketch-bg-dim)] rounded-2xl border border-[var(--sketch-border)] overflow-hidden">
          <table className="w-full text-sm">
            <tbody>
              {TECH_STACK.map((row, i) => (
                <tr key={row.layer} className={i !== TECH_STACK.length - 1 ? 'border-b border-[var(--sketch-border)]' : ''}>
                  <td className="px-5 py-3 font-bold text-amber-400 w-1/3">{row.layer}</td>
                  <td className="px-5 py-3 text-[var(--sketch-text-muted)]">{row.tech}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="sketch-border bg-[var(--sketch-bg-dim)] p-8 rounded-2xl border-2 border-[var(--sketch-border)] shadow-xl text-center">
        <h2 className="font-header font-bold text-xl text-[var(--sketch-text)] mb-2">Open Source</h2>
        <p className="text-[var(--sketch-text-muted)] text-sm mb-5 max-w-xl mx-auto leading-relaxed">
          The whole site — every doc, visualizer, and case study — lives in one public repository. Bug reports,
          corrections, and suggestions are welcome.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="sketch-button flex items-center gap-2 text-sm font-bold text-amber-500 border-amber-500/60 bg-amber-500/10 hover:bg-amber-500/20 px-5 py-2.5 rounded-xl"
          >
            ⭐ View on GitHub
          </a>
          <a
            href={`${base}/contact`}
            className="sketch-button flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl"
          >
            ✉️ Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}
