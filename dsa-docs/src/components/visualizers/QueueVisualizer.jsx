import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQueueStore } from '../../store/visualizers/queueStore';

export default function QueueVisualizer() {
  const { queue, frontIdx, highlighted, operations, enqueue, dequeue, peek, clear, randomEnqueue } = useQueueStore();
  const [value, setValue] = useState('');
  const [stepDesc, setStepDesc] = useState('');
  const activeQueue = queue.slice(frontIdx);

  const showStep = (text) => {
    setStepDesc(text);
    setTimeout(() => setStepDesc(''), 2000);
  };

  const handleEnqueue = () => {
    const val = parseInt(value);
    if (isNaN(val)) return;
    enqueue(val);
    showStep(`Enqueue(${val}): Adding ${val} to the REAR of the queue — FIFO principle. Queue now has ${activeQueue.length + 1} element(s). The new rear is ${val}.`);
    setValue('');
  };

  const handleDequeue = () => {
    const frontVal = activeQueue[0];
    dequeue();
    showStep(`Dequeue(): Removing the FRONT element ${frontVal} from the queue — the oldest item leaves first (FIFO). Queue now has ${activeQueue.length - 1} element(s). New front is ${activeQueue[1] ?? 'none (empty)'}.`);
  };

  const handlePeek = () => {
    peek();
    showStep(`Peek(): Looking at the FRONT element without removing it — front = ${activeQueue[0]}. The queue still has ${activeQueue.length} elements.`);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-3 p-4 rounded-xl bg-[var(--mcq-surface-30)] border border-[var(--mcq-border)]">
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleEnqueue()}
            placeholder="Value"
            className="w-20 px-3 py-2 rounded-lg bg-[var(--mcq-surface-20)] border border-[var(--mcq-border)] text-sm text-[var(--mcq-text)] placeholder:text-[var(--mcq-text-muted)] focus:outline-none focus:border-blue-400"
          />
          <button onClick={handleEnqueue} className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-emerald-400 text-white text-sm font-semibold shadow-lg shadow-blue-500/20 hover:shadow-xl transition-all">
            Enqueue
          </button>
          <button onClick={() => handleDequeue()} disabled={frontIdx >= queue.length} className="px-4 py-2 rounded-lg border border-[var(--mcq-border)] text-sm font-semibold text-[var(--mcq-text-secondary)] hover:text-white hover:bg-white/5 transition-all disabled:opacity-50">
            Dequeue
          </button>
          <button onClick={() => handlePeek()} disabled={frontIdx >= queue.length} className="px-4 py-2 rounded-lg border border-[var(--mcq-border)] text-sm font-semibold text-[var(--mcq-text-secondary)] hover:text-white hover:bg-white/5 transition-all disabled:opacity-50">
            Peek Front
          </button>
          <button onClick={randomEnqueue} className="px-4 py-2 rounded-lg border border-[var(--mcq-border)] text-sm font-semibold text-[var(--mcq-text-secondary)] hover:text-white hover:bg-white/5 transition-all">
            Random
          </button>
          <button onClick={clear} className="px-4 py-2 rounded-lg border border-red-500/20 text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-all">
            Clear
          </button>
        </div>
      </div>

      {/* Step Description */}
      {stepDesc && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-2.5 rounded-xl border text-sm leading-relaxed"
          style={{
            backgroundColor: stepDesc.includes('Dequeue') || stepDesc.includes('Removing')
              ? 'rgba(245, 158, 11, 0.08)'
              : stepDesc.includes('Peek')
              ? 'rgba(96, 165, 250, 0.08)'
              : 'rgba(34, 197, 94, 0.08)',
            borderColor: stepDesc.includes('Dequeue') || stepDesc.includes('Removing')
              ? 'rgba(245, 158, 11, 0.15)'
              : stepDesc.includes('Peek')
              ? 'rgba(96, 165, 250, 0.15)'
              : 'rgba(34, 197, 94, 0.15)',
            color: 'var(--mcq-text-body)',
          }}
        >
          <span className="mr-1.5">
            {stepDesc.includes('Enqueue') ? '📥' : stepDesc.includes('Dequeue') ? '📤' : '👁️'}
          </span>
          {stepDesc}
        </motion.div>
      )}

      {/* Queue Visualization */}
      <div className="flex gap-6">
        <div className="flex-1">
          <div className="p-4 rounded-xl bg-[var(--mcq-surface-20)] border border-[var(--mcq-border)] min-h-[180px]">
            <div className="text-xs font-semibold text-[var(--mcq-text-muted)] mb-3 uppercase tracking-wider text-center">Queue (FIFO — First In, First Out)</div>
            <div className="flex items-center gap-2 min-h-[80px] justify-center flex-wrap">
              <AnimatePresence mode="popLayout">
                {activeQueue.length === 0 ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[var(--mcq-text-muted)] text-sm">
                    Queue is empty — enqueue values to get started
                  </motion.div>
                ) : (
                  activeQueue.map((val, i) => {
                    const realIdx = frontIdx + i;
                    const isFront = i === 0;
                    const isRear = i === activeQueue.length - 1;
                    const isHighlighted = highlighted === realIdx;
                    return (
                      <motion.div
                        key={`${realIdx}-${val}`}
                        layout
                        initial={{ opacity: 0, scale: 0.5, x: -20 }}
                        animate={{
                          opacity: 1, scale: 1, x: 0,
                          backgroundColor: isHighlighted ? '#60a5fa' : isFront ? 'rgba(34, 197, 94, 0.2)' : 'rgba(59, 130, 246, 0.12)',
                          borderColor: isFront ? 'rgba(34, 197, 94, 0.5)' : 'rgba(59, 130, 246, 0.2)',
                        }}
                        exit={{ opacity: 0, scale: 0.5, x: 20 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="w-16 h-16 flex flex-col items-center justify-center rounded-xl border text-sm font-mono font-bold relative"
                        style={{ color: isHighlighted ? '#fff' : 'rgba(255,255,255,0.8)' }}
                      >
                        {val}
                        {isFront && <span className="absolute -top-4 text-[10px] text-emerald-400 font-semibold">FRONT</span>}
                        {isRear && <span className="absolute -bottom-4 text-[10px] text-blue-400 font-semibold">REAR</span>}
                      </motion.div>
                    );
                  })
                )}
              </AnimatePresence>
            </div>
            {activeQueue.length > 0 && (
              <div className="mt-4 text-center text-xs text-[var(--mcq-text-muted)]">
                Size: {activeQueue.length} | Front (dequeue next): {activeQueue[0]} | Rear (last enqueued): {activeQueue[activeQueue.length - 1]}
              </div>
            )}
          </div>
        </div>

        {/* Operations Log */}
        <div className="w-64">
          <div className="p-4 rounded-xl bg-[var(--mcq-surface-20)] border border-[var(--mcq-border)] h-full">
            <div className="text-xs font-semibold text-[var(--mcq-text-muted)] mb-3 uppercase tracking-wider">Operations Log</div>
            <div className="space-y-1 max-h-[200px] overflow-y-auto">
              {[...operations].reverse().map((op) => (
                <div key={op.timestamp} className="flex items-center gap-2 text-xs font-mono">
                  <span className={`w-1.5 h-1.5 rounded-full ${op.type === 'enqueue' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                  <span className={op.type === 'enqueue' ? 'text-emerald-400' : 'text-amber-400'}>
                    {op.type === 'enqueue' ? `enqueue(${op.value})` : `dequeue() → ${op.value}`}
                  </span>
                </div>
              ))}
              {operations.length === 0 && <span className="text-[var(--mcq-text-muted)] text-xs">No operations yet</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
