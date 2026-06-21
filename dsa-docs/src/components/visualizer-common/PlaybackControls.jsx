import { usePlaybackStore } from '../../store/visualizers/playbackStore';

export default function PlaybackControls({ onPlay, onPause, onStep, totalSteps }) {
  const { isPlaying, currentStep, speed, setSpeed, play, pause, nextStep, prevStep, restart } = usePlaybackStore();

  const handlePlay = () => {
    if (isPlaying) {
      pause();
      onPause?.();
    } else {
      play();
      onPlay?.();
    }
  };

  const handleStep = () => {
    nextStep();
    onStep?.(currentStep + 1);
  };

  return (
    <div className="flex items-center gap-2 p-3 rounded-xl bg-[var(--mcq-surface-30)] border border-[var(--mcq-border)]">
      <button
        onClick={restart}
        className="flex items-center justify-center w-9 h-9 rounded-lg text-[var(--mcq-text-muted)] hover:text-white hover:bg-white/5 transition-all"
        title="Restart"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
        </svg>
      </button>

      <button
        onClick={prevStep}
        disabled={currentStep === 0}
        className="flex items-center justify-center w-9 h-9 rounded-lg text-[var(--mcq-text-muted)] hover:text-white hover:bg-white/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        title="Previous Step"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        onClick={handlePlay}
        className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-emerald-400 text-white shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all hover:scale-105 active:scale-95"
        title={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        )}
      </button>

      <button
        onClick={handleStep}
        disabled={currentStep >= totalSteps - 1}
        className="flex items-center justify-center w-9 h-9 rounded-lg text-[var(--mcq-text-muted)] hover:text-white hover:bg-white/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        title="Next Step"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <div className="w-px h-6 bg-white/10 mx-1" />

      <div className="flex items-center gap-2 text-xs text-[var(--mcq-text-muted)]">
        <span>Speed:</span>
        <input
          type="range"
          min="100"
          max="1000"
          step="100"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="w-20 h-1 accent-blue-500 bg-white/10 rounded-full appearance-none cursor-pointer"
        />
        <span className="font-mono w-8">{speed}ms</span>
      </div>

      <div className="w-px h-6 bg-white/10 mx-1" />

      <span className="text-xs font-mono text-[var(--mcq-text-secondary)]">
        Step {currentStep + 1}/{Math.max(totalSteps, 1)}
      </span>
    </div>
  );
}
