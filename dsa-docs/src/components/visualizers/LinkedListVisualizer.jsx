import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLinkedListStore } from '../../store/visualizers/linkedListStore';

export default function LinkedListVisualizer() {
  const { nodes, edges, highlighted, listType, setListType, initialize, insertHead, insertTail, deleteHead, deleteTail, reverse, deleteValue } = useLinkedListStore();
  const [value, setValue] = useState('');
  const [stepDesc, setStepDesc] = useState('');

  useEffect(() => { initialize(); }, [listType]);

  const showStep = (text) => {
    setStepDesc(text);
    setTimeout(() => setStepDesc(''), 2500);
  };

  const handleInsertHead = () => {
    const val = parseInt(value);
    if (isNaN(val)) return;
    const oldHead = nodes[0]?.value;
    insertHead(val);
    showStep(`Insert Head(${val}): Creating a new node with value ${val} and pointing its "next" to the current head (${oldHead ?? 'null'}). The new node becomes the HEAD of the list.`);
    setValue('');
  };

  const handleInsertTail = () => {
    const val = parseInt(value);
    if (isNaN(val)) return;
    const oldTail = nodes[nodes.length - 1]?.value;
    insertTail(val);
    showStep(`Insert Tail(${val}): Creating a new node with value ${val} and pointing the previous tail's (${oldTail ?? 'null'}) "next" to it. The new node becomes the TAIL of the list.`);
    setValue('');
  };

  const handleDelete = () => {
    const val = parseInt(value);
    if (isNaN(val)) return;
    deleteValue(val);
    showStep(`Delete(${val}): Searching the list for value ${val} and removing that node by re-linking the previous node's "next" to skip over it.`);
    setValue('');
  };

  const handleDeleteHead = () => {
    if (nodes.length === 0) return;
    const oldHead = nodes[0].value;
    deleteHead();
    showStep(`Delete Head(): Removing the HEAD node (${oldHead}) from the list. The new head is ${nodes[1]?.value ?? 'null (list is now empty)'}.`);
  };

  const handleDeleteTail = () => {
    if (nodes.length === 0) return;
    const oldTail = nodes[nodes.length - 1].value;
    deleteTail();
    showStep(`Delete Tail(): Removing the TAIL node (${oldTail}) from the list. The new tail is ${nodes[nodes.length - 2]?.value ?? 'null (list is now empty)'}. Its "next" now points to null.`);
  };

  const handleReverse = () => {
    if (nodes.length <= 1) return;
    reverse();
    showStep(`Reverse(): Reversing the direction of ALL "next" pointers. The HEAD becomes the TAIL and vice versa. List order is now completely reversed.`);
  };

  const getNodePosition = (index, total) => ({
    x: 60 + index * 110,
    y: 60,
  });

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-3 p-4 rounded-xl bg-[var(--mcq-surface-30)] border border-[var(--mcq-border)]">
        <select
          value={listType}
          onChange={(e) => setListType(e.target.value)}
          className="px-3 py-2 rounded-lg bg-[var(--mcq-surface-20)] border border-[var(--mcq-border)] text-sm text-[var(--mcq-text)] focus:outline-none focus:border-blue-400"
        >
          <option value="singly">Singly Linked List</option>
          <option value="doubly">Doubly Linked List</option>
        </select>

        <div className="flex items-center gap-2">
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleInsertTail()}
            placeholder="Value"
            className="w-20 px-3 py-2 rounded-lg bg-[var(--mcq-surface-20)] border border-[var(--mcq-border)] text-sm text-[var(--mcq-text)] placeholder:text-[var(--mcq-text-muted)] focus:outline-none focus:border-blue-400"
          />
          <button onClick={handleInsertHead} className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-emerald-400 text-white text-sm font-semibold shadow-lg shadow-blue-500/20 hover:shadow-xl transition-all">
            Insert Head
          </button>
          <button onClick={handleInsertTail} className="px-4 py-2 rounded-lg border border-[var(--mcq-border)] text-sm font-semibold text-[var(--mcq-text-secondary)] hover:text-white hover:bg-white/5 transition-all">
            Insert Tail
          </button>
          <button onClick={handleDeleteHead} disabled={nodes.length === 0} className="px-4 py-2 rounded-lg border border-[var(--mcq-border)] text-sm font-semibold text-[var(--mcq-text-secondary)] hover:text-white hover:bg-white/5 transition-all disabled:opacity-50">
            Delete Head
          </button>
          <button onClick={handleDeleteTail} disabled={nodes.length === 0} className="px-4 py-2 rounded-lg border border-[var(--mcq-border)] text-sm font-semibold text-[var(--mcq-text-secondary)] hover:text-white hover:bg-white/5 transition-all disabled:opacity-50">
            Delete Tail
          </button>
          <button onClick={handleDelete} disabled={nodes.length === 0} className="px-4 py-2 rounded-lg border border-red-500/20 text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-50">
            Delete Value
          </button>
        </div>
        <div className="w-px h-8 bg-white/10" />
        <button onClick={handleReverse} disabled={nodes.length <= 1} className="px-4 py-2 rounded-lg border border-amber-500/20 text-sm font-semibold text-amber-400 hover:bg-amber-500/10 transition-all disabled:opacity-50">
          Reverse
        </button>
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
            backgroundColor: stepDesc.includes('Delete')
              ? 'rgba(239, 68, 68, 0.08)'
              : stepDesc.includes('Reverse')
              ? 'rgba(245, 158, 11, 0.08)'
              : 'rgba(34, 197, 94, 0.08)',
            borderColor: stepDesc.includes('Delete')
              ? 'rgba(239, 68, 68, 0.15)'
              : stepDesc.includes('Reverse')
              ? 'rgba(245, 158, 11, 0.15)'
              : 'rgba(34, 197, 94, 0.15)',
            color: 'var(--mcq-text-body)',
          }}
        >
          <span className="mr-1.5">
            {stepDesc.includes('Insert') ? '➕' : stepDesc.includes('Delete') ? '🗑️' : stepDesc.includes('Reverse') ? '🔄' : 'ℹ️'}
          </span>
          {stepDesc}
        </motion.div>
      )}

      {/* List Info */}
      <div className="flex gap-3 text-xs text-[var(--mcq-text-muted)]">
        <span>Type: <strong className="text-white">{listType === 'singly' ? 'Singly Linked' : 'Doubly Linked'}</strong></span>
        <span>| Size: <strong className="text-white">{nodes.length}</strong></span>
        <span>| Head: <strong className="text-emerald-400">{nodes[0]?.value ?? 'null'}</strong></span>
        <span>| Tail: <strong className="text-blue-400">{nodes[nodes.length - 1]?.value ?? 'null'}</strong></span>
      </div>

      {/* Linked List Visualization */}
      <div className="relative w-full min-h-[180px] p-4 rounded-xl bg-[var(--mcq-surface-20)] border border-[var(--mcq-border)] overflow-hidden">
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="rgba(255,255,255,0.2)" />
            </marker>
            {listType === 'doubly' && (
              <marker id="arrowhead-rev" markerWidth="10" markerHeight="7" refX="1" refY="3.5" orient="auto">
                <polygon points="10 0, 0 3.5, 10 7" fill="rgba(255,255,255,0.12)" />
              </marker>
            )}
          </defs>
          {nodes.map((node, i) => {
            const pos = getNodePosition(i, nodes.length);
            if (i < nodes.length - 1) {
              const nextPos = getNodePosition(i + 1, nodes.length);
              return (
                <g key={`edge-${i}`}>
                  <line
                    x1={pos.x + 40} y1={pos.y + 22}
                    x2={nextPos.x} y2={nextPos.y + 22}
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                    className="transition-all duration-300"
                  />
                  {listType === 'doubly' && (
                    <line
                      x1={nextPos.x - 10} y1={pos.y + 38}
                      x2={pos.x + 30} y2={pos.y + 38}
                      stroke="rgba(255,255,255,0.12)"
                      strokeWidth="1.5"
                      strokeDasharray="4 3"
                      markerEnd="url(#arrowhead-rev)"
                      className="transition-all duration-300"
                    />
                  )}
                </g>
              );
            }
            return null;
          })}
        </svg>

        <AnimatePresence>
          {nodes.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex items-center justify-center text-[var(--mcq-text-muted)] text-sm">
              List is empty — insert nodes to get started
            </motion.div>
          ) : (
            nodes.map((node, i) => {
              const pos = getNodePosition(i, nodes.length);
              const isHighlighted = highlighted === node.id;
              return (
                <motion.div
                  key={node.id}
                  layout
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1, scale: 1,
                    x: pos.x, y: pos.y,
                    backgroundColor: isHighlighted ? '#60a5fa' : 'rgba(59, 130, 246, 0.15)',
                    borderColor: isHighlighted ? '#60a5fa' : 'rgba(59, 130, 246, 0.3)',
                    boxShadow: isHighlighted ? '0 0 15px rgba(96, 165, 250, 0.4)' : 'none',
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="absolute w-[50px] h-[50px] flex items-center justify-center rounded-xl border-2 text-sm font-bold font-mono z-10"
                  style={{ color: isHighlighted ? '#fff' : 'rgba(255,255,255,0.8)' }}
                >
                  {node.value}
                  {i === 0 && <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-emerald-400 font-semibold">HEAD</span>}
                  {i === nodes.length - 1 && (
                    <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-blue-400 font-semibold whitespace-nowrap">TAIL → null</span>
                  )}
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* Node Values */}
      <div className="flex flex-wrap gap-1.5">
        {nodes.map((node, i) => (
          <span key={node.id} className={`px-2 py-0.5 rounded text-xs font-mono font-medium border ${
            highlighted === node.id
              ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
              : i === 0
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              : 'bg-white/5 text-[var(--mcq-text-muted)] border-white/10'
          }`}>
            {node.value}
            {i < nodes.length - 1 && <span className="text-white/20 ml-1">→</span>}
            {i === nodes.length - 1 && <span className="text-white/20 ml-1">→ null</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
