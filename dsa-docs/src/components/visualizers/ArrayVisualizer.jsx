import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useArrayStore } from '../../store/visualizers/arrayStore';

export default function ArrayVisualizer() {
  const { array, highlighted, selected, insert, deleteAt, update, search, randomize, generateSorted } = useArrayStore();
  const [value, setValue] = useState('');
  const [index, setIndex] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [opType, setOpType] = useState('insert');
  const [animating, setAnimating] = useState(false);
  const [stepDesc, setStepDesc] = useState('');
  const timerRef = useRef(null);
  const descTimerRef = useRef(null);

  useEffect(() => {
    return () => { clearTimeout(timerRef.current); clearTimeout(descTimerRef.current); };
  }, []);

  const showStep = (text) => {
    setStepDesc(text);
    clearTimeout(descTimerRef.current);
    descTimerRef.current = setTimeout(() => setStepDesc(''), 2500);
  };

  const handleOperation = () => {
    if (animating) return;
    const val = parseInt(value);
    const idx = parseInt(index);
    if (isNaN(val)) return;
    setAnimating(true);
    setSearchResult(null);

    switch (opType) {
      case 'insert': {
        const pos = isNaN(idx) ? array.length : Math.min(idx, array.length);
        const clampedPos = Math.max(0, pos);
        if (clampedPos === array.length) {
          showStep(`Appending ${val} to the end of the array — O(1) amortized operation`);
        } else {
          showStep(`Inserting ${val} at index ${clampedPos} — shifting elements [${clampedPos}..${array.length - 1}] right by 1 position — O(n) operation`);
        }
        insert(val, clampedPos);
        break;
      }
      case 'delete': {
        const delIdx = isNaN(idx) ? array.indexOf(val) : idx;
        if (delIdx >= 0 && delIdx < array.length) {
          showStep(`Deleting element ${array[delIdx]} at index ${delIdx} — shifting elements [${delIdx + 1}..${array.length - 1}] left by 1 position — O(n) operation`);
          deleteAt(delIdx);
        } else {
          showStep(`Value ${val} not found in array — nothing to delete`);
        }
        break;
      }
      case 'update': {
        if (!isNaN(idx) && idx >= 0 && idx < array.length) {
          showStep(`Updating array[${idx}] from ${array[idx]} to ${val} — O(1) random access operation`);
          update(idx, val);
        } else {
          showStep(`Invalid index: ${idx} — valid range is [0..${array.length - 1}]`);
        }
        break;
      }
    }

    timerRef.current = setTimeout(() => setAnimating(false), 500);
  };

  const handleSearch = () => {
    const val = parseInt(searchValue);
    if (isNaN(val)) return;
    const idx = search(val);
    setSearchResult(idx);
    if (idx >= 0) {
      showStep(`Linear search: scanning array element by element — found ${val} at index ${idx} ✅`);
    } else {
      showStep(`Linear search: scanned all ${array.length} elements — value ${val} is not in the array ❌`);
    }
  };

  const maxVal = Math.max(...array, 1);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-3 p-4 rounded-xl bg-[var(--mcq-surface-30)] border border-[var(--mcq-border)]">
        <div className="flex items-center gap-2">
          <select
            value={opType}
            onChange={(e) => setOpType(e.target.value)}
            className="px-3 py-2 rounded-lg bg-[var(--mcq-surface-20)] border border-[var(--mcq-border)] text-sm text-[var(--mcq-text)] focus:outline-none focus:border-blue-400"
          >
            <option value="insert">Insert</option>
            <option value="delete">Delete</option>
            <option value="update">Update</option>
          </select>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Value"
            className="w-20 px-3 py-2 rounded-lg bg-[var(--mcq-surface-20)] border border-[var(--mcq-border)] text-sm text-[var(--mcq-text)] placeholder:text-[var(--mcq-text-muted)] focus:outline-none focus:border-blue-400"
          />
          <input
            type="number"
            value={index}
            onChange={(e) => setIndex(e.target.value)}
            placeholder="Index"
            className="w-20 px-3 py-2 rounded-lg bg-[var(--mcq-surface-20)] border border-[var(--mcq-border)] text-sm text-[var(--mcq-text)] placeholder:text-[var(--mcq-text-muted)] focus:outline-none focus:border-blue-400"
          />
          <button
            onClick={handleOperation}
            disabled={animating}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-emerald-400 text-white text-sm font-semibold shadow-lg shadow-blue-500/20 hover:shadow-xl transition-all disabled:opacity-50"
          >
            {opType === 'delete' ? 'Delete' : opType === 'update' ? 'Update' : 'Insert'}
          </button>
        </div>
        <div className="w-px h-8 bg-white/10" />
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search..."
            className="w-24 px-3 py-2 rounded-lg bg-[var(--mcq-surface-20)] border border-[var(--mcq-border)] text-sm text-[var(--mcq-text)] placeholder:text-[var(--mcq-text-muted)] focus:outline-none focus:border-blue-400"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 rounded-lg border border-[var(--mcq-border)] text-sm font-semibold text-[var(--mcq-text-secondary)] hover:text-white hover:bg-white/5 transition-all"
          >
            Search
          </button>
        </div>
        <div className="w-px h-8 bg-white/10" />
        <button onClick={randomize} className="px-4 py-2 rounded-lg border border-[var(--mcq-border)] text-sm font-semibold text-[var(--mcq-text-secondary)] hover:text-white hover:bg-white/5 transition-all">
          Randomize
        </button>
        <button onClick={generateSorted} className="px-4 py-2 rounded-lg border border-[var(--mcq-border)] text-sm font-semibold text-[var(--mcq-text-secondary)] hover:text-white hover:bg-white/5 transition-all">
          Sorted
        </button>
      </div>

      {/* Step Description */}
      {stepDesc && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          className="px-4 py-2.5 rounded-xl border text-sm leading-relaxed"
          style={{
            backgroundColor: stepDesc.includes('✅') || stepDesc.includes('Found')
              ? 'rgba(34, 197, 94, 0.08)'
              : stepDesc.includes('❌')
              ? 'rgba(239, 68, 68, 0.08)'
              : 'rgba(96, 165, 250, 0.08)',
            borderColor: stepDesc.includes('✅') || stepDesc.includes('Found')
              ? 'rgba(34, 197, 94, 0.15)'
              : stepDesc.includes('❌')
              ? 'rgba(239, 68, 68, 0.15)'
              : 'rgba(96, 165, 250, 0.15)',
            color: stepDesc.includes('✅') || stepDesc.includes('Found')
              ? '#22c55e'
              : stepDesc.includes('❌')
              ? '#f87171'
              : 'var(--mcq-text-body)',
          }}
        >
          📖 {stepDesc}
        </motion.div>
      )}

      {/* Search Result */}
      {searchResult !== null && (
        <div className={`px-4 py-2 rounded-lg text-sm font-medium ${searchResult >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
          {searchResult >= 0 ? `Found at index ${searchResult}` : 'Value not found'}
        </div>
      )}

      {/* Array Visualization */}
      <div className="flex items-end gap-1.5 min-h-[280px] p-4 rounded-xl bg-[var(--mcq-surface-20)] border border-[var(--mcq-border)] overflow-x-auto">
        <AnimatePresence>
          {array.map((val, i) => {
            const isHighlighted = highlighted.includes(i);
            const isSelected = selected === i;
            const height = Math.max((val / maxVal) * 220, 20);

            return (
              <motion.div
                key={`arr-${i}`}
                layout
                initial={{ opacity: 0, x: i > Math.min(...(highlighted.length ? highlighted : [-1])) ? 30 : -30 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  height,
                  backgroundColor: isSelected
                    ? '#22c55e'
                    : isHighlighted
                    ? '#60a5fa'
                    : 'rgba(59, 130, 246, 0.3)',
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="flex-1 max-w-[60px] rounded-t-lg relative group cursor-pointer"
                style={{ minHeight: '20px' }}
              >
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                  {val}
                </div>
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white/60">
                  {i}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Array Values */}
      <div className="flex flex-wrap gap-1.5">
        {array.map((val, i) => (
          <span
            key={i}
            className={`px-2 py-0.5 rounded text-xs font-mono font-medium border ${
              selected === i
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                : highlighted.includes(i)
                ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                : 'bg-white/5 text-[var(--mcq-text-muted)] border-white/10'
            }`}
          >
            [{i}]: {val}
          </span>
        ))}
      </div>
    </div>
  );
}
