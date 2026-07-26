import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRecursionStore } from '../../store/visualizers/recursionStore';

const FACTORIAL_CODE = [
  { line: 1, text: 'if n <= 1: return 1 // Base Case' },
  { line: 2, text: 'return n * factorial(n - 1) // Recursive Step' },
];

const FIBONACCI_CODE = [
  { line: 1, text: 'if n <= 1: return n // Base Case' },
  { line: 2, text: 'left ← fib(n - 1)' },
  { line: 3, text: 'right ← fib(n - 2)' },
  { line: 4, text: 'return left + right' },
];

const TOWER_OF_HANOI_CODE = [
  { line: 1, text: 'if n == 1: moveDisk(1, source → dest)' },
  { line: 2, text: 'hanoi(n - 1, source → aux)' },
  { line: 3, text: 'moveDisk(n, source → dest)' },
  { line: 4, text: 'hanoi(n - 1, aux → dest)' },
];

const SUBSETS_CODE = [
  { line: 1, text: 'if idx == arr.length: add path to result' },
  { line: 2, text: 'backtrack(idx + 1, path + [arr[idx]]) // Include' },
  { line: 3, text: 'backtrack(idx + 1, path) // Exclude' },
];

const TRACK_TITLES = {
  factorial: '1. Factorial n! (Linear Stack Winding)',
  fibonacci: '2. Fibonacci Sequence (Tree Recursion)',
  'tower-of-hanoi': '3. Tower of Hanoi (Divide & Conquer)',
  subsets: '4. Subsets / Backtracking',
};

const EXPECTED_OUTPUTS = {
  factorial: '4! = 4 × 3 × 2 × 1 = 24',
  fibonacci: 'fib(4) = fib(3) + fib(2) = 2 + 1 = 3',
  'tower-of-hanoi': '7 Moves to transfer 3 disks from A to C',
  subsets: '4 Subsets: [[], [1], [1, 2], [2]]',
};

export default function RecursionVisualizer() {
  const {
    track,
    steps,
    currentStep,
    isPlaying,
    speed,
    practiceMode,
    userCode,
    setCurrentStep,
    nextStep,
    prevStep,
    restart,
    togglePlay,
    setSpeed,
    togglePracticeMode,
    setUserCode,
  } = useRecursionStore();

  const step = steps[currentStep] || steps[0];

  // Auto-play stepping timer loop with comfortable 2.2s base delay
  useEffect(() => {
    if (!isPlaying) return;
    if (currentStep >= steps.length - 1) {
      useRecursionStore.setState({ isPlaying: false });
      return;
    }
    const delay = 2200 / speed;
    const timeout = setTimeout(() => {
      nextStep();
    }, delay);
    return () => clearTimeout(timeout);
  }, [isPlaying, currentStep, speed, steps.length, nextStep]);

  const activeCode =
    track === 'factorial'
      ? FACTORIAL_CODE
      : track === 'fibonacci'
      ? FIBONACCI_CODE
      : track === 'tower-of-hanoi'
      ? TOWER_OF_HANOI_CODE
      : SUBSETS_CODE;

  const trackLabel = TRACK_TITLES[track] || 'Recursion Algorithm';
  const expectedOutput = EXPECTED_OUTPUTS[track] || 'Expected Result';

  const callStack = step.callStack || [];
  const pegs = step.pegs || { A: [], B: [], C: [] };
  const subsets = step.subsets || [];

  return (
    <div className="sketch-container font-sketch">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--sketch-border)] pb-4 mb-4">
        <div>
          <div className="text-xs uppercase tracking-wider text-[var(--sketch-accent-orange)] font-mono mb-1 font-bold">
            ALGORITHM PATTERN
          </div>
          <h2 className="text-3xl font-bold font-header flex items-center gap-3">
            Recursion & Call Stack
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
          <div className="w-full flex items-center justify-between text-xs font-mono text-[var(--sketch-text-muted)] border-b border-white/10 pb-2 mb-2">
            <span>{track === 'tower-of-hanoi' ? 'Tower of Hanoi Disks Canvas' : 'Call Stack Frame Inspector Canvas'}</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Active Top Frame</span>
            </div>
          </div>

          {/* Tower of Hanoi Pegs Canvas */}
          {track === 'tower-of-hanoi' ? (
            <div className="my-auto w-full max-w-[480px] mx-auto flex items-end justify-between px-4 h-[220px] pb-4">
              {['A', 'B', 'C'].map((pegKey) => (
                <div key={pegKey} className="relative flex flex-col items-center w-28">
                  {/* Vertical Peg Rod */}
                  <div className="w-2.5 h-36 bg-amber-500/40 rounded-t-md absolute bottom-0 z-0"></div>

                  {/* Disks Stacked on Peg */}
                  <div className="flex flex-col-reverse items-center gap-1 z-10 mb-1 w-full">
                    {pegs[pegKey]?.map((diskSize) => {
                      const diskWidths = { 1: 'w-12', 2: 'w-20', 3: 'w-24' };
                      const diskColors = {
                        1: 'bg-emerald-500/30 border-emerald-500 text-emerald-600 dark:text-emerald-300',
                        2: 'bg-amber-500/30 border-amber-500 text-amber-600 dark:text-amber-300',
                        3: 'bg-purple-500/30 border-purple-500 text-purple-600 dark:text-purple-300',
                      };

                      return (
                        <motion.div
                          key={`disk-${diskSize}`}
                          layout
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                          className={`h-7 rounded-lg border-2 flex items-center justify-center font-mono text-xs font-bold shadow-md ${diskWidths[diskSize]} ${diskColors[diskSize]}`}
                        >
                          Disk {diskSize}
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Base Label */}
                  <div className="w-full h-3 bg-[var(--sketch-bg-dim)] border border-[var(--sketch-border)] rounded-md text-center text-[10px] font-mono font-bold text-amber-500 mt-1">
                    Peg {pegKey}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Call Stack Frame Container */
            <div className="my-auto flex flex-col items-center justify-end h-[250px]">
              <div className="w-full max-w-[340px] border-b-4 border-x-4 border-amber-500/40 rounded-b-2xl bg-[var(--sketch-bg-dim)] p-3 min-h-[200px] flex flex-col items-center gap-2 relative shadow-inner">
                <span className="text-[10px] font-mono text-[var(--sketch-text-muted)] tracking-wider font-bold uppercase mb-1">
                  Call Stack Memory (LIFO)
                </span>

                <AnimatePresence>
                  {callStack.map((frame, idx) => {
                    const isTop = idx === 0;

                    return (
                      <motion.div
                        key={`${idx}-${frame.fn}`}
                        initial={{ opacity: 0, y: -15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -25, scale: 0.8 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                        className={`w-full py-2 px-4 rounded-xl border-2 flex items-center justify-between font-mono text-xs shadow-md relative ${
                          isTop
                            ? '!border-amber-400 !bg-amber-500/25 text-amber-500 ring-2 ring-amber-400/50 shadow-amber-500/40 font-bold'
                            : 'border-[var(--sketch-border)] bg-[var(--sketch-bg-dim)] text-[var(--sketch-text)]'
                        }`}
                      >
                        <span className="text-[10px] text-[var(--sketch-text-muted)]">Frame #{callStack.length - idx}</span>
                        <span className="text-sm font-bold">{frame.fn}</span>

                        {frame.ret && (
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                            ➔ {frame.ret}
                          </span>
                        )}

                        {isTop && (
                          <span className="absolute -right-14 text-amber-500 font-mono text-[10px] font-bold">
                            ◀ TOP
                          </span>
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Subsets Collection Bar */}
          {track === 'subsets' && (
            <div className="mt-3 w-full flex items-center justify-between font-mono text-xs text-[var(--sketch-text-muted)] bg-[var(--sketch-bg-dim)] px-4 py-2 rounded-xl border border-[var(--sketch-border)]">
              <span className="text-amber-500 font-bold">Subsets Generated:</span>
              <div className="flex items-center gap-1.5">
                {subsets.map((sub, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 font-bold">
                    [{sub.join(', ')}]
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Stack Frame Count Summary Bar */}
          {track !== 'subsets' && (
            <div className="mt-3 w-full flex items-center justify-between font-mono text-xs text-[var(--sketch-text-muted)] bg-[var(--sketch-bg-dim)] px-4 py-2 rounded-xl border border-[var(--sketch-border)]">
              <span className="text-amber-500 font-bold">Call Stack Depth: {callStack.length} Frames</span>
              <span>Execution Phase: {step.state?.phase || 'Running'}</span>
            </div>
          )}
        </div>

        {/* Debug Panel (Code & State) */}
        <div className="sketch-debug-panel">
          {/* Pseudocode Box */}
          <div className="sketch-panel-box sketch-border">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[var(--sketch-border)]">
              <span className="font-header font-bold text-lg">Concept Code</span>
              <button
                onClick={togglePracticeMode}
                className="px-2.5 py-1 text-xs sketch-button"
              >
                {practiceMode ? '👁️ View' : '✏️ Practice'}
              </button>
            </div>

            {practiceMode ? (
              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                rows={8}
                className="w-full bg-transparent p-2 font-mono text-xs text-[var(--sketch-text)] border border-[var(--sketch-border)] rounded focus:outline-none"
              />
            ) : (
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
            )}
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
