import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHeapStore } from '../../store/visualizers/heapStore';

export default function HeapVisualizer() {
  const { heap, heapType, highlighted, lastOperation, setHeapType, initialize, insert, extract, randomInsert } = useHeapStore();
  const [value, setValue] = useState('');
  const [stepDesc, setStepDesc] = useState('');

  useEffect(() => { initialize(); }, []);
  useEffect(() => {
    if (!lastOperation) return;
    if (lastOperation.type === 'insert') {
      const pos = heap.indexOf(lastOperation.value);
      setStepDesc(`Insert(${lastOperation.value}): Added ${lastOperation.value} to the bottom of the heap (index ${heap.length - 1}), then "bubbled up" by swapping with its parent until the ${heapType}-heap property is restored. The heap now has ${heap.length} elements.`);
    } else {
      setStepDesc(`Extract ${heapType === 'min' ? 'Min' : 'Max'}(): Removed the root element (${lastOperation.value}), moved the last element to the root, then "sifted down" by swapping with the larger${heapType === 'min' ? '/smaller' : ''} child until the ${heapType}-heap property is restored.`);
    }
    setTimeout(() => setStepDesc(''), 2500);
  }, [lastOperation]);

  const handleInsert = () => {
    const val = parseInt(value);
    if (isNaN(val)) return;
    insert(val);
    setValue('');
  };

  const getNodePosition = (index, totalNodes) => {
    const TOP_OFFSET = 30;
    const LEVEL_HEIGHT = 80;
    const TREE_WIDTH = 480;
    const LEFT_MARGIN = 70;

    const depth = Math.floor(Math.log2(index + 1));
    const nodesInLevel = Math.pow(2, depth);
    const indexInLevel = index - (nodesInLevel - 1);
    const spacing = TREE_WIDTH / nodesInLevel;
    const x = LEFT_MARGIN + (indexInLevel + 0.5) * spacing;
    const y = depth * LEVEL_HEIGHT + TOP_OFFSET;
    return { x: Math.max(50, Math.min(590, Math.round(x))), y };
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-3 p-4 rounded-xl bg-[var(--mcq-surface-30)] border border-[var(--mcq-border)]">
        <select
          value={heapType}
          onChange={(e) => setHeapType(e.target.value)}
          className="px-3 py-2 rounded-lg bg-[var(--mcq-surface-20)] border border-[var(--mcq-border)] text-sm text-[var(--mcq-text)] focus:outline-none focus:border-blue-400"
        >
          <option value="min">Min Heap</option>
          <option value="max">Max Heap</option>
        </select>

        <div className="flex items-center gap-2">
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleInsert()}
            placeholder="Value"
            className="w-20 px-3 py-2 rounded-lg bg-[var(--mcq-surface-20)] border border-[var(--mcq-border)] text-sm text-[var(--mcq-text)] placeholder:text-[var(--mcq-text-muted)] focus:outline-none focus:border-blue-400"
          />
          <button onClick={handleInsert} className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-emerald-400 text-white text-sm font-semibold shadow-lg shadow-blue-500/20 hover:shadow-xl transition-all">
            Insert
          </button>
          <button onClick={extract} disabled={heap.length === 0} className="px-4 py-2 rounded-lg border border-[var(--mcq-border)] text-sm font-semibold text-[var(--mcq-text-secondary)] hover:text-white hover:bg-white/5 transition-all disabled:opacity-50">
            Extract {heapType === 'min' ? 'Min' : 'Max'}
          </button>
          <button onClick={randomInsert} className="px-4 py-2 rounded-lg border border-[var(--mcq-border)] text-sm font-semibold text-[var(--mcq-text-secondary)] hover:text-white hover:bg-white/5 transition-all">
            Random
          </button>
        </div>
        <div className="w-px h-8 bg-white/10" />
        <button onClick={initialize} className="px-4 py-2 rounded-lg border border-[var(--mcq-border)] text-sm font-semibold text-[var(--mcq-text-secondary)] hover:text-white hover:bg-white/5 transition-all">
          Reset
        </button>
      </div>

      {/* Step Description */}
      {stepDesc && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-2.5 rounded-xl border text-sm leading-relaxed"
          style={{
            backgroundColor: stepDesc.includes('Extract')
              ? 'rgba(245, 158, 11, 0.08)'
              : 'rgba(34, 197, 94, 0.08)',
            borderColor: stepDesc.includes('Extract')
              ? 'rgba(245, 158, 11, 0.15)'
              : 'rgba(34, 197, 94, 0.15)',
            color: 'var(--mcq-text-body)',
          }}
        >
          <span className="mr-1.5">
            {stepDesc.includes('Insert') ? '➕' : '🗑️'}
          </span>
          {stepDesc}
        </motion.div>
      )}

      {/* Info */}
      <div className="flex flex-wrap gap-4 text-xs text-[var(--mcq-text-muted)]">
        <span>Type: <strong className="text-white capitalize">{heapType} heap</strong></span>
        <span>| Size: <strong className="text-white">{heap.length}</strong></span>
        <span>| Root ({heapType === 'min' ? 'minimum' : 'maximum'}): <strong className={heapType === 'min' ? 'text-emerald-400' : 'text-red-400'}>{heap[0] ?? '—'}</strong></span>
        {lastOperation && (
          <span>| Last: <strong className="text-blue-400">{lastOperation.type === 'insert' ? `insert(${lastOperation.value})` : `extract() → ${lastOperation.value}`}</strong></span>
        )}
      </div>

      {/* Heap Property Explanation */}
      <div className="px-4 py-2 rounded-xl bg-blue-500/5 border border-blue-500/10 text-xs text-[var(--mcq-text-secondary)] leading-relaxed">
        <span className="font-semibold text-blue-400">{heapType === 'min' ? 'Min-Heap' : 'Max-Heap'} property: </span>
        {heapType === 'min'
          ? 'Every parent node is ≤ its children. The root (index 0) is always the MINIMUM element.'
          : 'Every parent node is ≥ its children. The root (index 0) is always the MAXIMUM element.'}
        {' '}Array index formula: left child = 2i+1, right child = 2i+2, parent = ⌊(i-1)/2⌋
      </div>

      {/* Heap Tree Visualization */}
      <div className="relative w-full min-h-[350px] p-4 rounded-xl bg-[var(--mcq-surface-20)] border border-[var(--mcq-border)] overflow-hidden">
        {/* SVG Connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
          {heap.map((val, i) => {
            if (i === 0) return null;
            const parent = Math.floor((i - 1) / 2);
            const pos = getNodePosition(i, heap.length);
            const parentPos = getNodePosition(parent, heap.length);
            const isHL = highlighted.includes(i) || highlighted.includes(parent);
            return (
              <line
                key={i}
                x1={parentPos.x} y1={parentPos.y + 25}
                x2={pos.x} y2={pos.y - 25}
                stroke={isHL ? 'rgba(96, 165, 250, 0.5)' : 'rgba(255,255,255,0.08)'}
                strokeWidth={isHL ? '2.5' : '1.5'}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>

        {/* Nodes */}
        <AnimatePresence>
          {heap.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex items-center justify-center text-[var(--mcq-text-muted)] text-sm">
              Heap is empty
            </motion.div>
          ) : (
            heap.map((val, i) => {
              const pos = getNodePosition(i, heap.length);
              const isHL = highlighted.includes(i);
              const isRoot = i === 0;
              return (
                <motion.div
                  key={`${i}-${val}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1, scale: 1,
                    x: pos.x - 24, y: pos.y,
                    backgroundColor: isHL ? '#60a5fa' : isRoot ? 'rgba(96, 165, 250, 0.2)' : 'rgba(99, 102, 241, 0.12)',
                    borderColor: isHL ? '#60a5fa' : isRoot ? 'rgba(96, 165, 250, 0.4)' : 'rgba(99, 102, 241, 0.2)',
                    boxShadow: isHL ? '0 0 15px rgba(96, 165, 250, 0.4)' : 'none',
                  }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  className="absolute w-[48px] h-[48px] flex items-center justify-center rounded-xl border-2 text-sm font-bold font-mono z-10"
                  style={{ color: isHL ? '#fff' : 'rgba(255,255,255,0.8)' }}
                >
                  {val}
                  {isRoot && <span className="absolute -top-4 text-[9px] text-amber-400 font-semibold whitespace-nowrap">ROOT ({heapType === 'min' ? 'min' : 'max'})</span>}
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* Array Representation */}
      <div className="p-4 rounded-xl bg-[var(--mcq-surface-20)] border border-[var(--mcq-border)]">
        <div className="text-xs font-semibold text-[var(--mcq-text-muted)] mb-2 uppercase tracking-wider">Array Representation</div>
        <div className="flex flex-wrap gap-1.5">
          {heap.map((val, i) => (
            <motion.span
              key={i}
              animate={{
                backgroundColor: highlighted.includes(i) ? 'rgba(96, 165, 250, 0.15)' : 'rgba(255,255,255,0.04)',
                borderColor: highlighted.includes(i) ? 'rgba(96, 165, 250, 0.3)' : 'rgba(255,255,255,0.08)',
                color: highlighted.includes(i) ? '#60a5fa' : 'var(--mcq-text-muted)',
              }}
              className="px-2.5 py-1 rounded text-xs font-mono font-medium border"
            >
              [{i}]: {val}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}
