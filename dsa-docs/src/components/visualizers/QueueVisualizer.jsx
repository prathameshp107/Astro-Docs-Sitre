import { useEffect } from 'react';
import { useQueueStore } from '../../store/visualizers/queueStore';

const ENQUEUE_CODE = [
  { line: 1, text: 'if rear == max_size - 1: return Overflow' },
  { line: 2, text: 'if front == -1: front ← 0' },
  { line: 3, text: 'rear ← rear + 1' },
  { line: 4, text: 'queue[rear] ← val' },
];

const DEQUEUE_CODE = [
  { line: 1, text: 'if front == -1 or front > rear: return Underflow' },
  { line: 2, text: 'val ← queue[front]' },
  { line: 3, text: 'front ← front + 1' },
  { line: 4, text: 'return val' },
];

const CIRCULAR_QUEUE_CODE = [
  { line: 1, text: 'front ← 0, rear ← -1' },
  { line: 2, text: 'rear ← (rear + 1) % capacity' },
  { line: 3, text: 'front ← (front + 1) % capacity' },
  { line: 4, text: 'wrap around indices modulo N' },
];

const TRACK_TITLES = {
  enqueue: '1. Enqueue Operation (FIFO)',
  dequeue: '2. Dequeue Operation (FIFO)',
  'circular-queue': '3. Circular Queue (Buffer Ring)',
};

const EXPECTED_OUTPUTS = {
  enqueue: 'Queue: [10, 20, 30, 40] (Front = 0, Rear = 3)',
  dequeue: 'Dequeued Value: 10 (New Front = 20)',
  'circular-queue': 'Wrapped Around: rear = (4 + 1) % 5 = 0',
};

export default function QueueVisualizer() {
  const {
    track,
    queue,
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
  } = useQueueStore();

  const step = steps[currentStep] || steps[0];

  // Auto-play stepping timer loop with comfortable 2.2s base delay
  useEffect(() => {
    if (!isPlaying) return;
    if (currentStep >= steps.length - 1) {
      useQueueStore.setState({ isPlaying: false });
      return;
    }
    const delay = 2200 / speed;
    const timeout = setTimeout(() => {
      nextStep();
    }, delay);
    return () => clearTimeout(timeout);
  }, [isPlaying, currentStep, speed, steps.length, nextStep]);

  const activeCode =
    track === 'enqueue'
      ? ENQUEUE_CODE
      : track === 'dequeue'
      ? DEQUEUE_CODE
      : CIRCULAR_QUEUE_CODE;

  const trackLabel = TRACK_TITLES[track] || 'Queue Operation';
  const expectedOutput = EXPECTED_OUTPUTS[track] || 'Expected Result';

  const isComplete = currentStep >= steps.length - 1;

  return (
    <div className="sketch-container font-sketch">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--sketch-border)] pb-4 mb-4">
        <div>
          <div className="text-xs uppercase tracking-wider text-[var(--sketch-accent-orange)] font-mono mb-1 font-bold">
            DATA STRUCTURE PATTERN
          </div>
          <h2 className="text-3xl font-bold font-header flex items-center gap-3">
            Queue (FIFO)
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
            <span>FIFO Horizontal Queue Canvas</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> Front</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span> Rear</span>
              {isComplete && <span className="text-emerald-400 font-bold">✔ Complete</span>}
            </div>
          </div>

          {/* Queue Cards Container */}
          <div className="flex items-center gap-3 md:gap-5 my-auto relative pt-6 pb-20 px-4 overflow-x-auto sketch-no-scrollbar w-full justify-center">
            {queue.map((val, idx) => {
              const isFront = step.front === idx;
              const isRear = step.rear === idx;
              const isBothFrontRear = isFront && isRear;
              const isHighlighted = isFront || isRear;

              return (
                <div key={idx} className="relative flex flex-col items-center">
                  <div
                    className={`sketch-card ${
                      val === null
                        ? 'border-dashed border-white/20 text-white/30'
                        : isBothFrontRear
                        ? 'border-purple-400 bg-purple-500/20 ring-1 ring-purple-400'
                        : isFront
                        ? 'border-emerald-400 shadow-emerald-400/20'
                        : isRear
                        ? 'border-rose-400 shadow-rose-400/20'
                        : 'border-white/20 bg-white/5'
                    }`}
                    style={{ transform: isHighlighted ? 'translateY(-6px)' : 'none' }}
                  >
                    {val !== null ? val : '∅'}
                    <div className="sketch-card-index">[{idx}]</div>
                  </div>

                  {/* Combined Front + Rear Pointer */}
                  {isBothFrontRear && (
                    <div className="sketch-pointer text-purple-300 font-bold bg-purple-500/20 px-2 py-0.5 rounded-md border border-purple-400/40 shadow-sm">
                      <div className="text-xs">front, rear</div>
                      <div className="text-xs leading-none">▲</div>
                    </div>
                  )}

                  {/* Front Pointer */}
                  {isFront && !isBothFrontRear && (
                    <div className="sketch-pointer text-emerald-400 font-bold">
                      <div>front</div>
                      <div className="text-xs leading-none">▲</div>
                    </div>
                  )}

                  {/* Rear Pointer */}
                  {isRear && !isBothFrontRear && (
                    <div className="sketch-pointer text-rose-400 font-bold">
                      <div>rear</div>
                      <div className="text-xs leading-none">▲</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Completion Banner */}
          {isComplete && (
            <div className="mt-2 w-full flex items-center justify-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 rounded-xl font-mono text-xs text-emerald-300 font-bold">
              ✔ Operation Complete — {step.state?.status || 'Queue Exhausted'}
            </div>
          )}

          {/* Queue Status Summary Bar */}
          <div className="mt-3 w-full flex items-center justify-between font-mono text-xs text-[var(--sketch-text-muted)] bg-black/30 px-4 py-2 rounded-xl border border-white/10">
            <span className="text-amber-400 font-bold">
              Queue: [{queue.filter((x) => x !== null).length > 0 ? queue.filter((x) => x !== null).join(', ') : 'Empty'}]
            </span>
            <span>Front: {step.front ?? -1} | Rear: {step.rear ?? -1}</span>
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
                      className={`sketch-code-line gap-3 ${isActive ? 'active !border-amber-400/60 !bg-amber-500/10 font-bold' : ''}`}
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
          </button>            <button
              onClick={togglePlay}
              className="sketch-button px-4 py-1.5 font-bold bg-amber-500/20 border-amber-500 text-amber-300"
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
