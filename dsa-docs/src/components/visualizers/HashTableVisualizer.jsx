import { useEffect } from 'react';
import { useHashTableStore } from '../../store/visualizers/hashTableStore';

const SEPARATE_CHAINING_CODE = [
  { line: 1, text: 'idx ← hash(key) % capacity // Compute Hash Index' },
  { line: 2, text: 'buckets[idx].append({ key, value }) // Separate Chaining' },
];

const LINEAR_PROBING_CODE = [
  { line: 1, text: 'idx ← (hash(key) + probe) % capacity' },
  { line: 2, text: 'while slot occupied: probe++ // Linear Probing' },
  { line: 3, text: 'slots[idx] ← key' },
];

const TWO_SUM_CODE = [
  { line: 1, text: 'if target - num in map: return [map[target - num], i]' },
  { line: 2, text: 'map[num] ← i' },
  { line: 3, text: 'return []' },
];

const GROUP_ANAGRAMS_CODE = [
  { line: 1, text: 'key ← sortString(word) // Canonical Hash Key' },
  { line: 2, text: 'map[key].append(word)' },
];

const TRACK_TITLES = {
  'separate-chaining': '1. Separate Chaining (Collision Resolution)',
  'linear-probing': '2. Open Addressing (Linear Probing)',
  'two-sum-hash': '3. Two Sum (Hash Map Lookup)',
  'group-anagrams': '4. Group Anagrams (Canonical Keys)',
};

const EXPECTED_OUTPUTS = {
  'separate-chaining': 'Bucket 3: "apple" ➔ "cherry" (Chained)',
  'linear-probing': 'Slot 2: "keyA", Slot 3: "keyB" (Probed)',
  'two-sum-hash': 'Target 9: Indices [0, 1] (2 + 7 = 9)',
  'group-anagrams': '[["eat", "tea", "ate"], ["tan"]]',
};

export default function HashTableVisualizer() {
  const {
    track,
    steps,
    currentStep,
    isPlaying,
    speed,
    setCurrentStep,
    nextStep,
    prevStep,
    restart,
    togglePlay,
    setSpeed,
  } = useHashTableStore();

  const step = steps[currentStep] || steps[0];

  // Auto-play stepping timer loop with comfortable 2.2s base delay
  useEffect(() => {
    if (!isPlaying) return;
    if (currentStep >= steps.length - 1) {
      useHashTableStore.setState({ isPlaying: false });
      return;
    }
    const delay = 2200 / speed;
    const timeout = setTimeout(() => {
      nextStep();
    }, delay);
    return () => clearTimeout(timeout);
  }, [isPlaying, currentStep, speed, steps.length, nextStep]);

  const activeCode =
    track === 'separate-chaining'
      ? SEPARATE_CHAINING_CODE
      : track === 'linear-probing'
      ? LINEAR_PROBING_CODE
      : track === 'two-sum-hash'
      ? TWO_SUM_CODE
      : GROUP_ANAGRAMS_CODE;

  const trackLabel = TRACK_TITLES[track] || 'Hash Table Algorithm';
  const expectedOutput = EXPECTED_OUTPUTS[track] || 'Expected Result';

  const buckets = step.buckets;
  const openBuckets = step.openBuckets;
  const mapState = step.mapState;
  const anagramGroups = step.anagramGroups;

  return (
    <div className="sketch-container font-sketch">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--sketch-border)] pb-4 mb-4">
        <div>
          <div className="text-xs uppercase tracking-wider text-[var(--sketch-accent-orange)] font-mono mb-1 font-bold">
            ALGORITHM PATTERN
          </div>
          <h2 className="text-3xl font-bold font-header flex items-center gap-3">
            Hash Tables & Maps
            <span className="text-sm px-3 py-0.5 rounded-full sketch-border-soft text-[var(--sketch-accent-orange)] font-sketch">
              {trackLabel}
            </span>
          </h2>
        </div>

        {/* Expected Output Card */}
        <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-xl font-mono text-xs text-amber-300 shadow-sm">
          <span className="text-amber-400 font-bold font-header text-sm">🎯 Expected:</span>
          <span>{expectedOutput}</span>
        </div>
      </div>

      {/* Progress Milestone Dots */}
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

      {/* Main Canvas + Debugger Row */}
      <div className="sketch-canvas-row">
        {/* Visualization Canvas */}
        <div className="sketch-canvas-box sketch-border relative flex flex-col justify-between p-4 min-h-[380px]">
          {/* Completion Status Banner */}
          {currentStep >= steps.length - 1 && (
            <div className="absolute top-3 right-4 z-20 flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-400/60 shadow-lg shadow-emerald-500/20">
              <span className="text-emerald-300 font-header font-bold text-sm">✔ Operation Complete</span>
              <span className="text-emerald-400 font-mono text-xs">— {step.state?.status || 'Hash Table Complete 🎉'}</span>
            </div>
          )}
          <div className="w-full flex items-center justify-between text-xs font-mono text-[var(--sketch-text-muted)] border-b border-white/10 pb-2 mb-2">
            <span>
              {buckets
                ? 'Hash Buckets Array (Separate Chaining)'
                : openBuckets
                ? 'Open Addressing Array (Linear Probing)'
                : 'Hash Map Lookup Canvas'}
            </span>
            <div className="flex items-center gap-3">
              {step.collision && (
                <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30 font-bold animate-pulse">
                  ⚠️ Collision Detected!
                </span>
              )}
            </div>
          </div>

          {/* Separate Chaining Canvas */}
          {buckets && (
            <div className="my-auto w-full space-y-2 py-2">
              {buckets.map((chain, bIdx) => {
                const isActiveBucket = step.hashIdx === bIdx;

                return (
                  <div key={bIdx} className="flex items-center gap-3 font-mono text-xs">
                    <div
                      className={`w-16 py-1 text-center rounded-lg border font-bold transition-all ${
                        isActiveBucket
                          ? 'border-amber-400 bg-amber-500/25 text-amber-500 ring-2 ring-amber-400/50'
                          : 'border-[var(--sketch-border)] bg-[var(--sketch-bg-dim)] text-[var(--sketch-text-muted)]'
                      }`}
                    >
                      [{bIdx}]
                    </div>

                    <div className="flex-1 flex items-center gap-2 overflow-x-auto sketch-no-scrollbar">
                      {chain.length === 0 ? (
                        <span className="text-[var(--sketch-text-muted)] text-[10px]">∅ Empty</span>
                      ) : (
                        chain.map((node, nIdx) => (
                          <div key={nIdx} className="flex items-center gap-1.5 shrink-0">
                            <div
                              className="px-3 py-1.5 rounded-xl border-2 border-emerald-500/40 bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 font-bold flex items-center gap-1 shadow-sm"
                              style={{ transition: 'transform 0.3s ease, opacity 0.3s ease' }}
                            >
                              <span>"{node.key}"</span>
                              <span className="text-amber-500">: {node.val}</span>
                            </div>

                            {nIdx < chain.length - 1 && (
                              <span className="text-amber-500 font-bold">➤</span>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Linear Probing Canvas */}
          {openBuckets && (
            <div className="my-auto w-full flex items-center gap-2 overflow-x-auto sketch-no-scrollbar justify-center py-4">
              {openBuckets.map((val, sIdx) => {
                const isActive = step.hashIdx === sIdx;
                const isProbed = step.probeIdx === sIdx;

                return (
                  <div key={sIdx} className="relative flex flex-col items-center flex-1 min-w-[55px]">
                    <div
                      style={{
                        transform: isActive ? 'scale(1.1) translateY(-4px)' : 'scale(1)',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      }}
                      className={`w-full h-16 rounded-xl border-2 flex flex-col items-center justify-center font-mono text-xs font-bold ${
                        isActive
                          ? 'border-amber-400 bg-amber-500/25 text-amber-500 ring-2 ring-amber-400/50'
                          : isProbed
                          ? 'border-cyan-400 bg-cyan-500/20 text-cyan-600 dark:text-cyan-300'
                          : 'border-[var(--sketch-border)] bg-[var(--sketch-bg-dim)] text-[var(--sketch-text)]'
                      }`}
                    >
                      <span>{val ? `"${val}"` : '∅'}</span>
                      <span className="text-[10px] text-[var(--sketch-text-muted)] mt-0.5">[{sIdx}]</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Two Sum & Group Anagrams Map Canvas */}
          {mapState && (
            <div className="my-auto w-full max-w-[400px] mx-auto bg-[var(--sketch-bg-dim)] border border-[var(--sketch-border)] p-4 rounded-2xl font-mono text-xs space-y-2">
              <div className="text-amber-500 font-bold border-b border-[var(--sketch-border)] pb-1 mb-2 flex justify-between">
                <span>Hash Map State (key ➔ value)</span>
                <span>Size: {Object.keys(mapState).length}</span>
              </div>

              {Object.entries(mapState).map(([k, v]) => (
                <div key={k} className="flex justify-between items-center bg-[var(--sketch-bg)] px-3 py-1.5 rounded-lg border border-[var(--sketch-border)]">
                  <span className="text-emerald-600 dark:text-emerald-300 font-bold">Key: {k}</span>
                  <span className="text-amber-500 font-bold">➔ Index: {v}</span>
                </div>
              ))}
            </div>
          )}

          {anagramGroups && (
            <div className="my-auto w-full max-w-[440px] mx-auto bg-[var(--sketch-bg-dim)] border border-[var(--sketch-border)] p-4 rounded-2xl font-mono text-xs space-y-2">
              <div className="text-amber-500 font-bold border-b border-[var(--sketch-border)] pb-1 mb-2">
                Canonical Key Anagram Groups
              </div>

              {Object.entries(anagramGroups).map(([k, group]) => (
                <div key={k} className="flex items-center justify-between bg-[var(--sketch-bg)] px-3 py-1.5 rounded-lg border border-[var(--sketch-border)]">
                  <span className="text-amber-500 font-bold">"{k}":</span>
                  <span className="text-emerald-600 dark:text-emerald-300 font-bold">[{group.map((w) => `"${w}"`).join(', ')}]</span>
                </div>
              ))}
            </div>
          )}

          {/* Status Summary Bar */}
          <div className="mt-3 w-full flex items-center justify-between font-mono text-xs text-[var(--sketch-text-muted)] bg-[var(--sketch-bg-dim)] px-4 py-2 rounded-xl border border-[var(--sketch-border)]">
            <span className="text-amber-500 font-bold">
              Hash Function: hash(key) = sum(charCodes) % capacity
            </span>
            <span>Status: {step.state?.status || 'Processing...'}</span>
          </div>
        </div>

        {/* Debug Panel (Code & State) */}
        <div className="sketch-debug-panel">
          {/* Pseudocode Box */}
          <div className="sketch-panel-box sketch-border">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[var(--sketch-border)]">
              <span className="font-header font-bold text-lg">Concept Code</span>
            </div>

            <div className="space-y-0.5">
                {activeCode.map((c) => {
                  const isActive = step.activeLine === c.line;
                  return (
                    <div
                      key={c.line}
                      className={`sketch-code-line gap-3 ${isActive ? 'active' : ''}`}
                    >
                      <span className="w-6 shrink-0 text-[var(--sketch-text-muted)] select-none font-mono">{c.line}</span>
                      <span className="whitespace-pre font-mono flex-1">{c.text}</span>
                    </div>
                  );
                })}
              </div>
          </div>

          {/* State Variable Box */}
          <div className="sketch-panel-box sketch-border">
            <div className="font-header font-bold text-lg mb-2 pb-1 border-b border-[var(--sketch-border)]">
              State Variables
            </div>
            <div className="space-y-1">
              {Object.entries(step.state || {}).map(([key, value]) => (
                <div key={key} className="sketch-state-var">
                  <span className="text-[var(--sketch-text-muted)]">{key}</span>
                  <span className="font-bold text-[var(--sketch-accent-orange)]">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Explanation Banner */}
      <div className="sketch-explanation-bar sketch-border">
        <span className="text-xl select-none">✏️</span>
        <div className="flex-1 text-sm md:text-base leading-relaxed">
          <span className="font-mono text-xs px-2 py-0.5 rounded sketch-border-soft mr-2 text-[var(--sketch-accent-orange)]">
            line {step.activeLine}
          </span>
          {step.desc}
        </div>
      </div>

      {/* Bottom Playback Controls Bar */}
      <div className="sketch-playback-bar sketch-border">
        <div className="flex items-center gap-2">
          <button
            onClick={restart}
            className="sketch-button px-3 py-1.5"
            title="Restart"
          >
            ↺
          </button>
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="sketch-button px-3 py-1.5"
            title="Previous step"
          >
            |◀
          </button>
          <button
            onClick={togglePlay}
            className="sketch-button px-4 py-1.5 font-bold bg-amber-500/20 border-amber-500"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button
            onClick={nextStep}
            disabled={currentStep >= steps.length - 1}
            className="sketch-button px-3 py-1.5"
            title="Next step"
          >
            ▶|
          </button>
        </div>

        {/* Scrubber Timeline */}
        <div className="flex-1 flex items-center gap-3">
          <input
            type="range"
            min="0"
            max={steps.length - 1}
            value={currentStep}
            onChange={(e) => setCurrentStep(Number(e.target.value))}
            className="sketch-scrubber"
          />
        </div>

        {/* Speed Multiplier Pills */}
        <div className="flex items-center gap-1">
          {[0.5, 1, 1.5, 2].map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`px-2.5 py-0.5 text-xs sketch-button ${speed === s ? 'bg-amber-500/20 border-amber-500 font-bold' : ''}`}
            >
              {s === 0.5 ? '0.5x (Slow)' : `${s}x`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
