import { useEffect } from 'react';
import { useDPStore } from '../../store/visualizers/dpStore';

const CLIMBING_STAIRS_CODE = [
  { line: 1, text: 'dp[0] ← 1, dp[1] ← 1 // Base Cases' },
  { line: 2, text: 'for i = 2 to n: dp[i] ← dp[i-1] + dp[i-2]' },
  { line: 3, text: 'return dp[n]' },
];

const KNAPSACK_CODE = [
  { line: 1, text: 'if wt[i-1] <= w:' },
  { line: 2, text: '    dp[i][w] ← max(val[i-1] + dp[i-1][w-wt[i-1]], dp[i-1][w])' },
  { line: 3, text: 'else: dp[i][w] ← dp[i-1][w]' },
];

const LCS_CODE = [
  { line: 1, text: 'if text1[i-1] == text2[j-1]:' },
  { line: 2, text: '    dp[i][j] ← 1 + dp[i-1][j-1]' },
  { line: 3, text: 'else: dp[i][j] ← max(dp[i-1][j], dp[i][j-1])' },
];

// Mirrors CELL_STYLE in LogicSection and GRID_CELL in GraphVisualizer, so all
// three grid surfaces agree on what a cell state looks like.
const GRID_CELL = {
  water:   'border-[var(--sketch-border)] bg-[var(--sketch-bg-dim)] text-slate-600',
  filled:  'border-sky-400/60 bg-sky-500/15 text-sky-200',
  filling: 'border-amber-400 bg-amber-500/25 text-amber-200 font-bold',
  target:  'border-emerald-400/70 bg-emerald-500/15 text-emerald-200',
};

const UNIQUE_PATHS_CODE = [
  { line: 1, text: 'dp[0][*] = 1;  dp[*][0] = 1' },
  { line: 2, text: 'for r in 1..m-1:' },
  { line: 3, text: '  for c in 1..n-1:' },
  { line: 4, text: '    dp[r][c] = dp[r-1][c] + dp[r][c-1]' },
  { line: 5, text: 'return dp[m-1][n-1]' },
];

const COIN_CHANGE_CODE = [
  { line: 1, text: 'dp[i] ← min(dp[i], 1 + dp[i - coin])' },
  { line: 2, text: 'return dp[amount] == ∞ ? -1 : dp[amount]' },
];

const TRACK_TITLES = {
  'climbing-stairs': '1. Climbing Stairs (1D DP Array)',
  knapsack: '2. 0/1 Knapsack Problem (2D Table DP)',
  lcs: '3. Longest Common Subsequence (2D Grid DP)',
  'coin-change': '4. Coin Change Problem (1D Min DP)',
};

const EXPECTED_OUTPUTS = {
  'climbing-stairs': 'dp[5] = 8 distinct ways',
  knapsack: 'Optimal Value = 7 (Items 1 & 2)',
  lcs: 'LCS("abcde", "ace") = "ace" (Length 3)',
  'coin-change': 'dp[11] = 3 coins (5 + 5 + 1)',
};

export default function DPVisualizer({ initialTrack } = {}) {
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
  } = useDPStore();

  const step = steps[currentStep] || steps[0];

  // Check initialTrack or URL parameters on mount to allow direct links to specific algorithms (e.g. ?track=knapsack)
  useEffect(() => {
    const trackToSet = initialTrack || (typeof window !== 'undefined' ? (new URLSearchParams(window.location.search).get('track') || new URLSearchParams(window.location.search).get('algo')) : null);
    if (trackToSet && EXPECTED_OUTPUTS[trackToSet]) {
      useDPStore.getState().setTrack(trackToSet);
    }
  }, [initialTrack]);

  // Auto-play stepping timer loop with comfortable 2.2s base delay
  useEffect(() => {
    if (!isPlaying) return;
    if (currentStep >= steps.length - 1) {
      useDPStore.setState({ isPlaying: false });
      return;
    }
    const delay = 2200 / speed;
    const timeout = setTimeout(() => {
      nextStep();
    }, delay);
    return () => clearTimeout(timeout);
  }, [isPlaying, currentStep, speed, steps.length, nextStep]);

  const activeCode =
    track === 'climbing-stairs'
      ? CLIMBING_STAIRS_CODE
      : track === 'knapsack'
      ? KNAPSACK_CODE
      : track === 'lcs'
      ? LCS_CODE
      : track === 'unique-paths'
      ? UNIQUE_PATHS_CODE
      : COIN_CHANGE_CODE;

  const trackLabel = TRACK_TITLES[track] || 'Dynamic Programming Algorithm';
  const expectedOutput = EXPECTED_OUTPUTS[track] || 'Expected Result';

  const dp1D = step.dp1D;
  const dp2D = step.dp2D;
  const activeCell = step.activeCell;

  return (
    <div className="sketch-container font-sketch">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--sketch-border)] pb-4 mb-4">
        <div>
          <div className="text-xs uppercase tracking-wider text-[var(--sketch-accent-orange)] font-mono mb-1 font-bold">
            ALGORITHM PATTERN
          </div>
          <h2 className="text-3xl font-bold font-header flex items-center gap-3">
            Dynamic Programming
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
          {step?.cellGrid ? (
            /* Grid DP tracks reuse the cellGrid contract introduced for Number
               of Islands, so no bespoke table markup is needed here. */
            <div className="w-full flex flex-col items-center py-4">
              <div className="w-full flex items-center justify-between text-xs font-mono text-[var(--sketch-text-muted)] border-b border-white/10 pb-2 mb-5">
                <span className="font-bold text-amber-400">Grid DP Canvas</span>
                <div className="flex items-center gap-3 text-[10px]">
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-emerald-400/70"></span> dependency</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-amber-400"></span> computing</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-sky-400/70"></span> solved</span>
                </div>
              </div>

              <div className="inline-block">
                {step.cellGrid.map((row, r) => (
                  <div key={r} className="flex">
                    {row.map((cellObj, c) => (
                      <div
                        key={`${r}-${c}`}
                        className={`w-14 h-14 md:w-16 md:h-16 m-1 rounded-xl border-2 flex items-center justify-center font-mono text-xl transition-all duration-200 ${
                          GRID_CELL[cellObj.s] ?? GRID_CELL.water
                        }`}
                      >
                        {cellObj.v}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {step.cursor && (
                <div className="mt-5 font-mono text-sm text-[var(--sketch-text-muted)]">
                  filling <span className="text-amber-300">({step.cursor[0]}, {step.cursor[1]})</span>
                </div>
              )}
            </div>
          ) : (
          <>
          {/* Completion Status Banner */}
          {currentStep >= steps.length - 1 && (
            <div className="absolute top-3 right-4 z-20 flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-400/60 shadow-lg shadow-emerald-500/20">
              <span className="text-emerald-300 font-header font-bold text-sm">✔ Operation Complete</span>
              <span className="text-emerald-400 font-mono text-xs">— {step.state?.status || 'DP Complete 🎉'}</span>
            </div>
          )}

          <div className="w-full flex items-center justify-between text-xs font-mono text-[var(--sketch-text-muted)] border-b border-white/10 pb-2 mb-2">
            <span>{dp2D ? '2D DP Memoization Table Grid Canvas' : '1D DP Memoization Array Canvas'}</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Active Cell</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span> Dependency</span>
            </div>
          </div>

          {/* 1D DP Array Canvas */}
          {dp1D && (
            <div className="my-auto flex flex-col items-center gap-3 w-full">
              <div className="flex items-stretch gap-3 sketch-no-scrollbar w-full py-2 px-2">
                {dp1D.map((val, idx) => {
                  const isActive = activeCell === idx;
                  const isDep = step.depCells?.includes(idx);

                  return (
                    <div key={idx} className="relative flex flex-col items-center flex-1">
                      <div
                        style={{
                          transform: isActive ? 'scale(1.1) translateY(-6px)' : isDep ? 'scale(1.04)' : 'scale(1)',
                          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        }}
                        className={`w-full h-20 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 ${
                          isActive
                            ? 'border-amber-400 bg-amber-500/25 text-amber-500 ring-2 ring-amber-400/50 shadow-lg shadow-amber-500/30 font-bold'
                            : isDep
                            ? 'border-cyan-400 bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 shadow-md shadow-cyan-500/20'
                            : 'border-[var(--sketch-border)] bg-[var(--sketch-bg-dim)] text-[var(--sketch-text)]'
                        }`}
                      >
                        <span className="text-2xl font-bold font-header">{val !== null ? val : '∅'}</span>
                        <span className="text-[11px] font-mono text-[var(--sketch-text-muted)]">[{idx}]</span>
                      </div>

                      {/* Active Cell Pointer */}
                      {isActive && (
                        <div className="absolute -bottom-7 flex flex-col items-center text-amber-500 font-bold">
                          <div className="text-[10px] font-mono">curr</div>
                          <div className="text-[10px] leading-none">▲</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2D DP Table Grid Canvas */}
          {dp2D && (
            <div className="my-auto overflow-x-auto sketch-no-scrollbar w-full flex justify-center py-2">
              <table className="border-collapse font-mono text-xs text-center select-none">
                <thead>
                  <tr>
                    <th className="p-2 border border-[var(--sketch-border)] text-[var(--sketch-text-muted)] font-bold">i / j</th>
                    {dp2D[0].map((_, c) => (
                      <th key={c} className="p-2 border border-[var(--sketch-border)] text-amber-500 font-bold">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dp2D.map((row, r) => (
                    <tr key={r}>
                      <td className="p-2 border border-[var(--sketch-border)] text-amber-500 font-bold">{r}</td>
                      {row.map((val, c) => {
                        const isActive = activeCell && activeCell.r === r && activeCell.c === c;
                        const isDep = step.depCells?.some((d) => d.r === r && d.c === c);

                        return (
                          <td
                            key={c}
                            className={`p-2.5 min-w-[44px] border border-[var(--sketch-border)] font-bold transition-all ${
                              isActive
                                ? 'bg-amber-500/30 text-amber-500 border-amber-400 ring-2 ring-amber-400/50 shadow-lg'
                                : isDep
                                ? 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border-cyan-400'
                                : 'bg-[var(--sketch-bg-dim)] text-[var(--sketch-text)]'
                            }`}
                          >
                            {val}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* DP Status Summary Bar */}
          <div className="mt-3 w-full flex items-center justify-between font-mono text-xs text-[var(--sketch-text-muted)] bg-[var(--sketch-bg-dim)] px-4 py-2 rounded-xl border border-[var(--sketch-border)]">
            <span className="text-amber-500 font-bold">Cell Transition: {step.state?.formula || step.state?.active || 'DP State'}</span>
            <span>Status: {step.state?.status || 'Calculating Table...'}</span>
          </div>
          </>
          )}
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
