import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStackStore } from '../../store/visualizers/stackStore';

const PUSH_CODE = [
  { line: 1, text: 'if top == max_size - 1: return Overflow' },
  { line: 2, text: 'top ← top + 1' },
  { line: 3, text: 'stack[top] ← val' },
];

const POP_CODE = [
  { line: 1, text: 'if top == -1: return Underflow' },
  { line: 2, text: 'val ← stack[top]' },
  { line: 3, text: 'top ← top - 1' },
  { line: 4, text: 'return val' },
];

const PEEK_CODE = [
  { line: 1, text: 'if top == -1: return Underflow' },
  { line: 2, text: 'return stack[top]' },
];

const VALID_PARENTHESES_CODE = [
  { line: 1, text: 'if char is open "(", "[", "{": push(char)' },
  { line: 2, text: 'else if char matches top: pop()' },
  { line: 3, text: 'return stack.isEmpty()' },
];

const TRACK_TITLES = {
  push: '1. Push Operation (LIFO)',
  pop: '2. Pop Operation (LIFO)',
  peek: '3. Peek / Top Lookup',
  'valid-parentheses': '4. Valid Parentheses (LeetCode #20)',
};

const EXPECTED_OUTPUTS = {
  push: 'Stack: [10, 20, 30, 40] (Top = 40)',
  pop: 'Popped Value: 40 (New Top = 30)',
  peek: 'Top Value: 40 (O(1) Lookup)',
  'valid-parentheses': 'true ("{[()]}" is balanced)',
};

export default function StackVisualizer() {
  const {
    track,
    stack,
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
  } = useStackStore();

  const step = steps[currentStep] || steps[0];

  // Auto-play stepping timer loop with comfortable 2.2s base delay
  useEffect(() => {
    if (!isPlaying) return;
    if (currentStep >= steps.length - 1) {
      useStackStore.setState({ isPlaying: false });
      return;
    }
    const delay = 2200 / speed;
    const timeout = setTimeout(() => {
      nextStep();
    }, delay);
    return () => clearTimeout(timeout);
  }, [isPlaying, currentStep, speed, steps.length, nextStep]);

  const activeCode =
    track === 'push'
      ? PUSH_CODE
      : track === 'pop'
      ? POP_CODE
      : track === 'peek'
      ? PEEK_CODE
      : VALID_PARENTHESES_CODE;

  const trackLabel = TRACK_TITLES[track] || 'Stack Operation';
  const expectedOutput = EXPECTED_OUTPUTS[track] || 'Expected Result';

  const topIndex = step.top !== undefined ? step.top : stack.length - 1;

  return (
    <div className="sketch-container font-sketch">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--sketch-border)] pb-4 mb-4">
        <div>
          <div className="text-xs uppercase tracking-wider text-[var(--sketch-accent-orange)] font-mono mb-1 font-bold">
            DATA STRUCTURE PATTERN
          </div>
          <h2 className="text-3xl font-bold font-header flex items-center gap-3">
            Stack (LIFO)
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
            <span>LIFO Vertical Stack Bucket Canvas</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Top Pointer</span>
            </div>
          </div>

          {/* Vertical Stack Bucket */}
          <div className="my-auto flex flex-col items-center justify-end h-[260px] relative">
            <div className="w-48 border-b-4 border-x-4 border-amber-500/40 rounded-b-2xl bg-black/20 p-3 min-h-[220px] flex flex-col-reverse items-center gap-2 relative shadow-inner">
              {/* Stack Elements (Bottom to Top) */}
              <AnimatePresence>
                {stack.map((val, idx) => {
                  const isTop = idx === topIndex;

                  return (
                    <motion.div
                      key={`${idx}-${val}`}
                      initial={{ opacity: 0, y: -20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -30, scale: 0.8 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                      className={`w-full h-11 rounded-xl flex items-center justify-between px-4 font-header font-bold text-lg border-2 shadow-md relative ${
                        isTop
                          ? '!border-amber-400 !bg-amber-500/25 text-amber-300 ring-2 ring-amber-400/50 shadow-amber-500/40'
                          : 'border-white/20 bg-white/5 text-[var(--sketch-text)]'
                      }`}
                    >
                      <span className="text-xs font-mono text-[var(--sketch-text-muted)]">[{idx}]</span>
                      <span>{val}</span>

                      {/* Top Pointer Badge */}
                      {isTop && (
                        <div className="absolute -right-16 text-amber-400 font-mono text-xs font-bold flex items-center gap-1">
                          ◀ TOP
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {stack.length === 0 && (
                <div className="my-auto text-xs font-mono text-[var(--sketch-text-muted)] italic text-center">
                  Stack is Empty
                </div>
              )}
            </div>
          </div>

          {/* Stack Status Summary Bar */}
          <div className="mt-3 w-full flex items-center justify-between font-mono text-xs text-[var(--sketch-text-muted)] bg-black/30 px-4 py-2 rounded-xl border border-white/10">
            <span className="text-amber-400 font-bold">Stack Contents: [{stack.join(', ')}]</span>
            <span>Size: {stack.length} / 4</span>
          </div>
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
              State
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
