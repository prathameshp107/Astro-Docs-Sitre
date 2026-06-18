import { useState } from 'react';

const LANGUAGES = [
  { id: 'javascript', label: 'JavaScript', color: '#f7df1e' },
  { id: 'typescript', label: 'TypeScript', color: '#3178c6' },
  { id: 'python', label: 'Python', color: '#3776AB' },
  { id: 'java', label: 'Java', color: '#ed8b00' },
  { id: 'cpp', label: 'C++', color: '#00599C' },
];

export default function CodeTabs({ code }) {
  const [active, setActive] = useState('javascript');

  const snippet = code?.[active] || code?.javascript || '// Code example coming soon';

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--mcq-border)] bg-[var(--mcq-code-bg)]">
      <div className="flex overflow-x-auto border-b border-[var(--mcq-border)] bg-[var(--mcq-surface-20)]">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.id}
            onClick={() => setActive(lang.id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap ${
              active === lang.id
                ? 'border-blue-500 text-white'
                : 'border-transparent text-[var(--mcq-text-muted)] hover:text-[var(--mcq-text-secondary)]'
            }`}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: lang.color }}
            />
            {lang.label}
          </button>
        ))}
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm leading-relaxed text-[var(--mcq-text)] font-mono whitespace-pre-wrap">
          <code>{snippet}</code>
        </pre>
      </div>
    </div>
  );
}
