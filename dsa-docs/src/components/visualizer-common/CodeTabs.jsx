import { useState } from 'react';

const LANGUAGES = [
  { id: 'javascript', label: 'JavaScript', color: '#f7df1e', icon: '⚡' },
  { id: 'typescript', label: 'TypeScript', color: '#3178c6', icon: '🔷' },
  { id: 'python', label: 'Python', color: '#3776AB', icon: '🐍' },
  { id: 'java', label: 'Java', color: '#ed8b00', icon: '☕' },
  { id: 'cpp', label: 'C++', color: '#00599C', icon: '⚙️' },
];

export default function CodeTabs({ code }) {
  const [active, setActive] = useState('javascript');
  const [copied, setCopied] = useState(false);

  const snippet = code?.[active] || code?.javascript || '// Code example coming soon';
  const lines = snippet.split('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="sketch-border bg-[var(--sketch-bg-dim)] rounded-2xl overflow-hidden shadow-xl font-mono text-xs">
      {/* Top Header & Language Selector */}
      <div className="flex flex-wrap items-center justify-between border-b border-[var(--sketch-border)] bg-[var(--sketch-bg)] px-3 py-2 gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto sketch-no-scrollbar">
          {LANGUAGES.map((lang) => {
            const isActive = active === lang.id;
            return (
              <button
                key={lang.id}
                onClick={() => setActive(lang.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-header font-bold text-xs transition-all ${
                  isActive
                    ? 'bg-[var(--sketch-accent-orange)] text-white shadow-md shadow-orange-500/20 scale-[1.02]'
                    : 'text-[var(--sketch-text-muted)] hover:text-[var(--sketch-text)] hover:bg-white/5'
                }`}
              >
                <span>{lang.icon}</span>
                <span>{lang.label}</span>
              </button>
            );
          })}
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="sketch-button py-1 px-3 text-xs flex items-center gap-1.5 font-sketch"
          title="Copy code to clipboard"
        >
          {copied ? (
            <span className="text-emerald-500 font-bold">✓ Copied!</span>
          ) : (
            <span>📋 Copy Code</span>
          )}
        </button>
      </div>

      {/* Code Viewer with Line Numbers */}
      <div className="p-4 overflow-x-auto flex gap-4 text-xs leading-relaxed text-[var(--sketch-text)] bg-[#121110] dark:bg-[#121110]">
        {/* Line Numbers Column */}
        <div className="select-none text-white/30 font-mono text-right flex flex-col gap-0.5 border-r border-white/10 pr-3">
          {lines.map((_, i) => (
            <span key={i}>{i + 1}</span>
          ))}
        </div>

        {/* Code Content */}
        <pre className="font-mono text-xs text-amber-200/90 whitespace-pre leading-relaxed flex-1">
          <code>{snippet}</code>
        </pre>
      </div>
    </div>
  );
}
