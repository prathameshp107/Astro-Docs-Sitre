import { useState, useEffect, useRef } from 'react';

const FRAMEWORK_STEPS = [
  'Clarify functional & non-functional requirements',
  'Estimate scale (QPS, storage, bandwidth)',
  'Define the API / data model',
  'Sketch the high-level architecture',
  'Deep-dive the 1-2 hardest components',
  'Call out bottlenecks & trade-offs',
];

const DEFAULT_SECONDS = 45 * 60;

export default function PracticeMode({ slug, caseTitle, onReveal }) {
  const notesKey = `practice-notes-${slug}`;
  const [notes, setNotes] = useState('');
  const [checked, setChecked] = useState([]);
  const [seconds, setSeconds] = useState(DEFAULT_SECONDS);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    try { setNotes(localStorage.getItem(notesKey) || ''); } catch {}
    setChecked([]);
    setSeconds(DEFAULT_SECONDS);
    setRunning(false);
  }, [slug]);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => (s > 0 ? s - 1 : 0));
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const saveNotes = (val) => {
    setNotes(val);
    try { localStorage.setItem(notesKey, val); } catch {}
  };

  const toggleStep = (i) => {
    setChecked((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));
  };

  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  const timeUp = seconds === 0;

  return (
    <div className="sketch-border bg-[var(--sketch-bg-dim)] p-6 md:p-8 rounded-3xl border-2 border-[var(--sketch-border)] shadow-2xl mb-8 font-sketch">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="font-header font-bold text-xl text-[var(--sketch-text)] flex items-center gap-2">
          🎯 Practice Mode — {caseTitle}
        </h2>
        <div className="flex items-center gap-3">
          <span
            className={`font-mono font-bold text-2xl tabular-nums ${timeUp ? 'text-rose-400 animate-pulse' : 'text-amber-400'}`}
            aria-live="polite"
          >
            {mins}:{secs}
          </span>
          <button
            onClick={() => setRunning((r) => !r)}
            aria-label={running ? 'Pause timer' : 'Start timer'}
            className="sketch-button text-xs font-bold px-3 py-1.5 rounded-xl"
          >
            {running ? '⏸ Pause' : '▶ Start'}
          </button>
          <button
            onClick={() => { setRunning(false); setSeconds(DEFAULT_SECONDS); }}
            aria-label="Reset timer to 45 minutes"
            className="sketch-button text-xs font-bold px-3 py-1.5 rounded-xl"
          >
            ↺ Reset
          </button>
        </div>
      </div>

      <p className="text-[var(--sketch-text-muted)] text-sm mb-4 leading-relaxed">
        Talk through this design out loud (or write it below) before revealing the solution. Standard interview framework:
      </p>

      <div className="space-y-2 mb-6" role="group" aria-label="Interview framework checklist">
        {FRAMEWORK_STEPS.map((step, i) => (
          <label key={i} className="flex items-center gap-3 text-sm text-[var(--sketch-text)] cursor-pointer">
            <input
              type="checkbox"
              checked={checked.includes(i)}
              onChange={() => toggleStep(i)}
              className="w-4 h-4 accent-amber-500"
            />
            <span className={checked.includes(i) ? 'line-through text-[var(--sketch-text-muted)]' : ''}>{step}</span>
          </label>
        ))}
      </div>

      <label htmlFor="practice-notes" className="block text-xs font-mono font-bold text-amber-500 uppercase tracking-wider mb-1.5">
        Scratch Notes (saved locally for this case study)
      </label>
      <textarea
        id="practice-notes"
        value={notes}
        onChange={(e) => saveNotes(e.target.value)}
        rows={8}
        placeholder="Sketch your API design, data model, component list..."
        className="w-full sketch-border bg-[var(--sketch-bg)] text-[var(--sketch-text)] border border-[var(--sketch-border)] rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:border-amber-500 resize-y mb-4"
      />

      <button
        onClick={onReveal}
        className="sketch-button w-full flex items-center justify-center gap-2 text-sm font-bold text-emerald-400 border-emerald-500/60 bg-emerald-500/10 hover:bg-emerald-500/20 px-5 py-3 rounded-xl"
      >
        ✅ Reveal Solution & Interactive Diagram
      </button>
    </div>
  );
}
