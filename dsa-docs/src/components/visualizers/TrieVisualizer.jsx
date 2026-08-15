import { useEffect, useMemo, useState } from 'react';
import { useTrieStore, TRIE_CODE } from '../../store/visualizers/trieStore';

/**
 * Trie visualizer.
 *
 * The tree is laid out here rather than stored: each step carries a flat node
 * list with parent pointers, and this component assigns coordinates by packing
 * leaves left-to-right and placing every parent at the midpoint of its children.
 * That keeps the step data small and layout-agnostic.
 */

const NODE = 46;   // node diameter
const GAP_X = 18;  // horizontal gap between adjacent leaves
const GAP_Y = 76;  // vertical gap between depths

/** Assign x/y to every node. Leaves pack left-to-right; parents centre on kids. */
function layout(nodes) {
  const childrenOf = new Map();
  for (const n of nodes) {
    if (!childrenOf.has(n.parentId)) childrenOf.set(n.parentId, []);
    childrenOf.get(n.parentId).push(n);
  }

  const pos = new Map();
  let cursor = 0;

  const place = (node) => {
    const kids = childrenOf.get(node.id) ?? [];
    if (!kids.length) {
      const x = cursor * (NODE + GAP_X);
      cursor += 1;
      pos.set(node.id, { x, y: node.depth * GAP_Y });
      return x;
    }
    const xs = kids.map(place);
    const x = (Math.min(...xs) + Math.max(...xs)) / 2;
    pos.set(node.id, { x, y: node.depth * GAP_Y });
    return x;
  };

  const root = nodes.find((n) => n.parentId === null);
  if (root) place(root);

  const xs = [...pos.values()].map((p) => p.x);
  const ys = [...pos.values()].map((p) => p.y);
  return {
    pos,
    width: (xs.length ? Math.max(...xs) : 0) + NODE,
    height: (ys.length ? Math.max(...ys) : 0) + NODE,
  };
}

export default function TrieVisualizer() {
  const {
    track, words, steps, currentStep, isPlaying, speed,
    setTrack, setWords, setCurrentStep, nextStep, prevStep, restart, togglePlay, setSpeed,
  } = useTrieStore();

  const [draft, setDraft] = useState(words.join(', '));

  useEffect(() => { setDraft(words.join(', ')); }, [words]);

  useEffect(() => {
    if (!isPlaying) return;
    const delay = 2200 / speed;
    const t = setTimeout(() => {
      if (currentStep >= steps.length - 1) useTrieStore.setState({ isPlaying: false });
      else nextStep();
    }, delay);
    return () => clearTimeout(t);
  }, [isPlaying, currentStep, speed, steps.length, nextStep]);

  const step = steps[currentStep] || steps[0];
  const nodes = step?.nodes ?? [];
  const { pos, width, height } = useMemo(() => layout(nodes), [nodes]);

  const activeCode = TRIE_CODE[track] ?? TRIE_CODE.insert;
  const pathIds = new Set(step?.pathIds ?? []);
  const subtreeIds = new Set(step?.subtreeIds ?? []);

  const trackLabel = { insert: 'Insert', search: 'Search', prefix: 'Prefix / Autocomplete' }[track] ?? track;
  const expected = {
    insert: `Trie storing [${words.join(', ')}]`,
    search: 'true / false per query',
    prefix: 'All words with the prefix',
  }[track];

  const applyWords = () => {
    const parsed = draft.split(/[,\s]+/).map((w) => w.trim()).filter(Boolean);
    if (parsed.length) setWords(parsed);
  };

  return (
    <div className="font-sketch">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--sketch-border)] pb-4 mb-4">
        <div>
          <div className="text-xs font-mono tracking-widest text-[var(--sketch-accent-orange)] mb-1">
            ALGORITHM PATTERN
          </div>
          <h2 className="text-2xl md:text-3xl font-bold font-header flex items-center gap-3">
            Trie (Prefix Tree)
            <span className="text-sm px-3 py-0.5 rounded-full sketch-border-soft text-[var(--sketch-accent-orange)] font-sketch">
              {trackLabel}
            </span>
          </h2>
        </div>

        <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-xl font-mono text-xs text-amber-300 shadow-sm">
          <span className="text-amber-400 font-bold font-header text-sm">🎯 Expected:</span>
          <span>{expected}</span>
        </div>
      </div>

      {/* Track picker + custom word input.
          The generator-backed store can retrace any word list, so unlike the
          older visualizers this input is real rather than decorative. */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        {['insert', 'search', 'prefix'].map((t) => (
          <button
            key={t}
            onClick={() => setTrack(t)}
            className={`sketch-button px-3 py-1 text-sm ${track === t ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold' : ''}`}
          >
            {{ insert: 'Insert', search: 'Search', prefix: 'Prefix' }[t]}
          </button>
        ))}

        <div className="flex items-center gap-2 ml-auto">
          <label htmlFor="trie-words" className="text-xs text-[var(--sketch-text-muted)] font-mono">
            words
          </label>
          <input
            id="trie-words"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && applyWords()}
            placeholder="cat, car, dog"
            className="sketch-border bg-transparent rounded-lg px-3 py-1 text-sm font-mono w-52 focus:outline-none focus:border-amber-500"
          />
          <button onClick={applyWords} className="sketch-button px-3 py-1 text-sm">
            Rebuild
          </button>
        </div>
      </div>

      {/* Milestones */}
      <div className="flex items-center gap-2 text-xs text-[var(--sketch-text-muted)] mb-5">
        <span>Milestones:</span>
        <div className="sketch-milestones">
          {steps.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrentStep(i)}
              className={`sketch-milestone-dot cursor-pointer ${i <= currentStep ? 'active' : ''}`}
              title={`Step ${i + 1}`}
            />
          ))}
        </div>
        <span className="font-mono ml-2">step {currentStep + 1} / {steps.length}</span>
      </div>

      {/* Canvas + debug panel */}
      <div className="flex flex-col xl:flex-row gap-5 items-start">
        <div className="sketch-canvas-box sketch-border relative p-6 min-h-[300px] flex-1 w-full flex flex-col items-center justify-center overflow-x-auto">
          <div className="absolute top-3 left-4 text-[11px] font-mono text-[var(--sketch-text-muted)]">
            Step Execution Canvas
          </div>

          {/* Word being processed, with the current character highlighted */}
          {step?.word ? (
            <div className="flex items-center gap-1.5 mb-6 mt-3">
              {[...step.word].map((ch, i) => (
                <span
                  key={i}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center font-mono text-base border transition-colors ${
                    i === step.charIndex
                      ? 'bg-amber-500/25 border-amber-500 text-amber-200 font-bold'
                      : i < step.charIndex
                        ? 'border-emerald-500/40 text-emerald-400'
                        : 'border-[var(--sketch-border)] text-[var(--sketch-text-muted)]'
                  }`}
                >
                  {ch}
                </span>
              ))}
            </div>
          ) : null}

          {/* The trie */}
          <div className="relative mx-auto" style={{ width, height, minWidth: width }}>
            <svg width={width} height={height} className="absolute inset-0 pointer-events-none">
              {nodes.map((n) => {
                if (!n.parentId) return null;
                const a = pos.get(n.parentId);
                const b = pos.get(n.id);
                if (!a || !b) return null;
                const onPath = pathIds.has(n.id) && pathIds.has(n.parentId);
                return (
                  <line
                    key={`e-${n.id}`}
                    x1={a.x + NODE / 2} y1={a.y + NODE}
                    x2={b.x + NODE / 2} y2={b.y}
                    stroke={onPath ? 'var(--sketch-accent-orange)' : 'var(--sketch-border)'}
                    strokeWidth={onPath ? 3 : 2}
                  />
                );
              })}
            </svg>

            {nodes.map((n) => {
              const p = pos.get(n.id);
              if (!p) return null;
              const isActive = step.activeId === n.id;
              const isCreated = step.createdId === n.id;
              const inSubtree = subtreeIds.has(n.id);
              const onPath = pathIds.has(n.id);

              let tone = 'border-[var(--sketch-border)] text-[var(--sketch-text-muted)]';
              if (inSubtree) tone = 'border-emerald-500 text-emerald-300 bg-emerald-500/10';
              if (onPath) tone = 'border-amber-500/60 text-[var(--sketch-text)]';
              if (n.isEnd) tone += ' ring-2 ring-emerald-500/50';
              if (isActive) tone = 'border-amber-500 bg-amber-500/25 text-amber-200 font-bold';
              if (isCreated) tone = 'border-sky-400 bg-sky-500/25 text-sky-200 font-bold';

              return (
                <div
                  key={n.id}
                  className={`absolute rounded-full border-2 flex items-center justify-center font-mono transition-all duration-300 ${tone}`}
                  style={{ left: p.x, top: p.y, width: NODE, height: NODE }}
                  title={n.isEnd ? 'end of a word' : undefined}
                >
                  {n.parentId === null ? <span className="text-[10px] leading-none">root</span> : n.char}
                </div>
              );
            })}
          </div>

          {/* Missing-character marker */}
          {step?.missingChar ? (
            <div className="mt-5 text-sm font-mono text-rose-400">
              no child &apos;{step.missingChar}&apos; here → dead end
            </div>
          ) : null}

          {currentStep >= steps.length - 1 ? (
            <div className="absolute top-3 right-4 text-xs font-header font-bold px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300">
              ✔ Operation Complete 🎉
            </div>
          ) : null}
        </div>

        {/* Debug panel */}
        <div className="sketch-debug-panel w-full xl:w-[330px] shrink-0">
          <div className="sketch-panel-box sketch-border">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[var(--sketch-border)]">
              <span className="font-header font-bold text-lg">Concept Code</span>
            </div>
            <div className="space-y-0.5">
              {activeCode.map((c) => (
                <div
                  key={c.line}
                  className={`sketch-code-line gap-3 ${step.activeLine === c.line ? 'active' : ''}`}
                >
                  <span className="w-6 shrink-0 text-[var(--sketch-text-muted)] select-none font-mono">{c.line}</span>
                  <span className="whitespace-pre font-mono flex-1">{c.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="sketch-panel-box sketch-border mt-4">
            <div className="font-header font-bold text-lg mb-2 pb-1 border-b border-[var(--sketch-border)]">
              State
            </div>
            <div className="space-y-1">
              {Object.entries(step.state || {}).map(([k, v]) => (
                <div key={k} className="sketch-state-var">
                  <span className="text-[var(--sketch-text-muted)]">{k}</span>
                  <span className="font-bold text-[var(--sketch-accent-orange)]">{String(v)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Narration */}
      <div className="sketch-explain-bar sketch-border mt-4 flex items-start gap-3">
        <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 shrink-0">
          line {step.activeLine}
        </span>
        <span>{step.desc}</span>
      </div>

      {/* Playback */}
      <div className="sketch-playback-bar sketch-border mt-4">
        <div className="flex items-center gap-2">
          <button onClick={restart} className="sketch-button px-3 py-1.5" title="Restart">↺</button>
          <button onClick={prevStep} disabled={currentStep === 0} className="sketch-button px-3 py-1.5" title="Previous step">|◀</button>
          <button
            onClick={togglePlay}
            className="sketch-button px-4 py-1.5 font-bold bg-amber-500/20 border-amber-500 text-amber-300"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button onClick={nextStep} disabled={currentStep >= steps.length - 1} className="sketch-button px-3 py-1.5" title="Next step">▶|</button>
        </div>

        <div className="flex-1 flex items-center gap-3">
          <input
            type="range"
            min="0"
            max={Math.max(steps.length - 1, 0)}
            value={currentStep}
            onChange={(e) => setCurrentStep(Number(e.target.value))}
            className="sketch-scrubber"
          />
        </div>

        <div className="flex items-center gap-1">
          {[0.5, 1, 1.5, 2].map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`px-2.5 py-0.5 text-xs sketch-button ${speed === s ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold' : ''}`}
            >
              {s === 0.5 ? '0.5x (Slow)' : `${s}x`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
