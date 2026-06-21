import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTreeStore } from '../../store/visualizers/treeStore';

const TRAVERSALS = [
  { id: 'inorder', label: 'Inorder (LNR)', desc: 'Left → Node → Right' },
  { id: 'preorder', label: 'Preorder (NLR)', desc: 'Node → Left → Right' },
  { id: 'postorder', label: 'Postorder (LRN)', desc: 'Left → Right → Node' },
  { id: 'levelorder', label: 'Level Order', desc: 'BFS by level' },
];

export default function TreeVisualizer() {
  const { nodes, edges, highlighted, traversalPath, traversalType, setTraversalType, reset, generateBST, traverse } = useTreeStore();
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationQueue, setAnimationQueue] = useState([]);

  const handleTraverse = (type) => {
    reset();
    setCurrentIndex(-1);
    setIsAnimating(false);
    const path = traverse(type);
    if (path && path.length > 0) {
      setAnimationQueue(path);
      setIsAnimating(true);
      setCurrentIndex(0);
    }
  };

  useEffect(() => {
    if (isAnimating && currentIndex >= 0 && currentIndex < animationQueue.length) {
      const timer = setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 600);
      return () => clearTimeout(timer);
    }
    if (currentIndex >= animationQueue.length && animationQueue.length > 0) {
      setIsAnimating(false);
    }
  }, [isAnimating, currentIndex, animationQueue]);

  const currentlyHighlighted = animationQueue.slice(0, currentIndex + 1);
  const currentNodeId = currentIndex >= 0 && currentIndex < animationQueue.length ? animationQueue[currentIndex] : null;

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-3 p-4 rounded-xl bg-[var(--mcq-surface-30)] border border-[var(--mcq-border)]">
        {TRAVERSALS.map((t) => (
          <button
            key={t.id}
            onClick={() => handleTraverse(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              traversalType === t.id && isAnimating
                ? 'bg-gradient-to-r from-blue-500 to-emerald-400 text-white shadow-lg'
                : 'border border-[var(--mcq-border)] text-[var(--mcq-text-secondary)] hover:text-white hover:bg-white/5'
            }`}
          >
            {t.label}
          </button>
        ))}
        <div className="w-px h-8 bg-white/10" />
        <button
          onClick={() => { reset(); setCurrentIndex(-1); setIsAnimating(false); }}
          className="px-4 py-2 rounded-lg border border-[var(--mcq-border)] text-sm font-semibold text-[var(--mcq-text-secondary)] hover:text-white hover:bg-white/5 transition-all"
        >
          Reset
        </button>
        <button
          onClick={() => { generateBST(); reset(); setCurrentIndex(-1); setIsAnimating(false); }}
          className="px-4 py-2 rounded-lg border border-[var(--mcq-border)] text-sm font-semibold text-[var(--mcq-text-secondary)] hover:text-white hover:bg-white/5 transition-all"
        >
          New Tree
        </button>
      </div>

      {/* Traversal Info */}
      <div className="flex gap-3 text-xs text-[var(--mcq-text-muted)]">
        {TRAVERSALS.map((t) => (
          <span key={t.id} className={`px-2 py-1 rounded ${traversalType === t.id ? 'bg-blue-500/10 text-blue-400' : ''}`}>
            {t.desc}
          </span>
        ))}
      </div>

      {/* Current Node Info */}
      {currentNodeId && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium"
        >
          Visiting: Node {nodes.find(n => n.id === currentNodeId)?.value} ({traversalType} order)
          {currentIndex < animationQueue.length - 1 ? ` — Next: ${nodes.find(n => n.id === animationQueue[currentIndex + 1])?.value}` : ' — Complete!'}
        </motion.div>
      )}

      {/* Tree Visualization */}
      <div className="relative w-full min-h-[450px] p-4 rounded-xl bg-[var(--mcq-surface-20)] border border-[var(--mcq-border)] overflow-hidden">
        {/* SVG connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
          {edges.map((edge, i) => {
            const from = nodes.find(n => n.id === edge.from);
            const to = nodes.find(n => n.id === edge.to);
            if (!from || !to) return null;
            return (
              <line
                key={i}
                x1={from.x}
                y1={from.y + 25}
                x2={to.x}
                y2={to.y - 25}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="2"
                strokeDasharray={currentNodeId && (currentlyHighlighted.includes(edge.from) || currentlyHighlighted.includes(edge.to)) ? 'none' : '4 4'}
                className="transition-all duration-500"
              />
            );
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((node) => {
          const isCurrent = node.id === currentNodeId;
          const isVisited = currentlyHighlighted.includes(node.id);

          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: node.x - 25,
                y: node.y,
                backgroundColor: isCurrent
                  ? '#60a5fa'
                  : isVisited
                  ? '#22c55e'
                  : 'rgba(59, 130, 246, 0.15)',
                borderColor: isCurrent
                  ? '#60a5fa'
                  : isVisited
                  ? '#22c55e'
                  : 'rgba(59, 130, 246, 0.3)',
                boxShadow: isCurrent
                  ? '0 0 20px rgba(96, 165, 250, 0.5)'
                  : isVisited
                  ? '0 0 10px rgba(34, 197, 94, 0.3)'
                  : 'none',
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="absolute w-[50px] h-[50px] flex items-center justify-center rounded-xl border-2 text-sm font-bold font-mono z-10"
              style={{ color: isCurrent ? '#fff' : isVisited ? '#22c55e' : 'rgba(255,255,255,0.7)' }}
            >
              {node.value}
            </motion.div>
          );
        })}
      </div>

      {/* Traversal Path Display */}
      {animationQueue.length > 0 && (
        <div className="p-4 rounded-xl bg-[var(--mcq-surface-20)] border border-[var(--mcq-border)]">
          <div className="text-xs font-semibold text-[var(--mcq-text-muted)] mb-2 uppercase tracking-wider">
            Traversal Path ({traversalType})
          </div>
          <div className="flex flex-wrap gap-1.5">
            {animationQueue.map((id, i) => {
              const node = nodes.find(n => n.id === id);
              if (!node) return null;
              const isActive = i < currentIndex;
              return (
                <span
                  key={id}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-medium border transition-all ${
                    isActive || i === currentIndex
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-white/5 text-[var(--mcq-text-muted)] border-white/10'
                  }`}
                >
                  {node.value}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
