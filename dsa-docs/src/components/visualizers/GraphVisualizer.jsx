import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useGraphStore } from '../../store/visualizerStore';

const EDGE_TYPES = [
  { id: 'undirected', label: 'Undirected' },
  { id: 'directed', label: 'Directed' },
  { id: 'weighted', label: 'Weighted' },
];

export default function GraphVisualizer() {
  const { nodes, edges, graphType, visited, queue, current, isTraversing, setGraphType, resetTraversal, bfs, dfs } = useGraphStore();
  const [algorithm, setAlgorithm] = useState('bfs');
  const [animationPath, setAnimationPath] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    if (isAnimating && currentIdx >= 0 && currentIdx < animationPath.length) {
      timerRef.current = setTimeout(() => setCurrentIdx(prev => prev + 1), 700);
    }
    if (currentIdx >= animationPath.length && animationPath.length > 0) {
      setIsAnimating(false);
    }
    return () => clearTimeout(timerRef.current);
  }, [isAnimating, currentIdx, animationPath]);

  const handleTraverse = useCallback(() => {
    resetTraversal();
    setCurrentIdx(-1);
    setIsAnimating(false);
    setAnimationPath([]);

    const path = algorithm === 'bfs' ? bfs() : dfs();
    if (path && path.length > 0) {
      setAnimationPath(path);
      setCurrentIdx(0);
      setIsAnimating(true);
    }
  }, [algorithm, bfs, dfs, resetTraversal]);

  const visitedNodes = animationPath.slice(0, currentIdx + 1);
  const currentNode = currentIdx >= 0 && currentIdx < animationPath.length ? animationPath[currentIdx] : null;

  const getNodePosition = (index, total) => {
    const angle = (2 * Math.PI * index) / total - Math.PI / 2;
    const radius = 180;
    return {
      x: 350 + radius * Math.cos(angle),
      y: 180 + radius * Math.sin(angle),
    };
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-3 p-4 rounded-xl bg-[var(--mcq-surface-30)] border border-[var(--mcq-border)]">
        <select
          value={graphType}
          onChange={(e) => setGraphType(e.target.value)}
          className="px-3 py-2 rounded-lg bg-[var(--mcq-surface-20)] border border-[var(--mcq-border)] text-sm text-[var(--mcq-text)] focus:outline-none focus:border-blue-400"
        >
          {EDGE_TYPES.map((t) => (
            <option key={t.id} value={t.id}>{t.label}</option>
          ))}
        </select>

        <div className="flex gap-1">
          <button
            onClick={() => setAlgorithm('bfs')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              algorithm === 'bfs'
                ? 'bg-gradient-to-r from-blue-500 to-emerald-400 text-white shadow-lg'
                : 'border border-[var(--mcq-border)] text-[var(--mcq-text-secondary)] hover:text-white hover:bg-white/5'
            }`}
          >
            BFS
          </button>
          <button
            onClick={() => setAlgorithm('dfs')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              algorithm === 'dfs'
                ? 'bg-gradient-to-r from-blue-500 to-emerald-400 text-white shadow-lg'
                : 'border border-[var(--mcq-border)] text-[var(--mcq-text-secondary)] hover:text-white hover:bg-white/5'
            }`}
          >
            DFS
          </button>
        </div>

        <button
          onClick={handleTraverse}
          disabled={isAnimating}
          className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-emerald-400 text-white text-sm font-semibold shadow-lg shadow-blue-500/20 hover:shadow-xl transition-all disabled:opacity-50"
        >
          {isAnimating ? 'Animating...' : `Run ${algorithm.toUpperCase()}`}
        </button>

        <button
          onClick={() => { resetTraversal(); setAnimationPath([]); setCurrentIdx(-1); setIsAnimating(false); }}
          className="px-4 py-2 rounded-lg border border-[var(--mcq-border)] text-sm font-semibold text-[var(--mcq-text-secondary)] hover:text-white hover:bg-white/5 transition-all"
        >
          Reset
        </button>
      </div>

      {/* Info */}
      {currentNode && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium"
        >
          {algorithm.toUpperCase()}: Visiting node {nodes.find(n => n.id === currentNode)?.label || currentNode}
          {currentIdx < animationPath.length - 1 ? ` — Queue: ${animationPath.slice(currentIdx + 1, currentIdx + 4).map(id => nodes.find(n => n.id === id)?.label || id).join(', ')}${animationPath.length - currentIdx - 1 > 3 ? '...' : ''}` : ' — Complete!'}
        </motion.div>
      )}

      {/* Graph Visualization */}
      <div className="relative w-full min-h-[420px] p-4 rounded-xl bg-[var(--mcq-surface-20)] border border-[var(--mcq-border)] overflow-hidden">
        {/* SVG Edges */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
          {edges.map((edge, i) => {
            const source = nodes.find(n => n.id === edge.source);
            const target = nodes.find(n => n.id === edge.target);
            if (!source || !target) return null;
            const total = nodes.length;
            const sIdx = nodes.indexOf(source);
            const tIdx = nodes.indexOf(target);
            const sPos = getNodePosition(sIdx, total);
            const tPos = getNodePosition(tIdx, total);

            const isActiveEdge =
              currentNode &&
              ((visitedNodes.includes(edge.source) && visitedNodes.includes(edge.target)) ||
                (edge.source === currentNode || edge.target === currentNode));

            const angle = Math.atan2(tPos.y - sPos.y, tPos.x - sPos.x);
            const nodeRadius = 28;
            const arrowSize = 10;
            const tipX = tPos.x - nodeRadius * Math.cos(angle);
            const tipY = tPos.y - nodeRadius * Math.sin(angle);
            const leftX = tipX - arrowSize * Math.cos(angle - Math.PI / 6);
            const leftY = tipY - arrowSize * Math.sin(angle - Math.PI / 6);
            const rightX = tipX - arrowSize * Math.cos(angle + Math.PI / 6);
            const rightY = tipY - arrowSize * Math.sin(angle + Math.PI / 6);

            return (
              <g key={i}>
                <line
                  x1={sPos.x}
                  y1={sPos.y}
                  x2={tipX}
                  y2={tipY}
                  stroke={isActiveEdge ? 'rgba(96, 165, 250, 0.5)' : 'rgba(255,255,255,0.08)'}
                  strokeWidth={isActiveEdge ? '3' : '1.5'}
                  className="transition-all duration-500"
                />
                {graphType === 'directed' && (
                  <polygon
                    points={`${tipX},${tipY} ${leftX},${leftY} ${rightX},${rightY}`}
                    fill={isActiveEdge ? 'rgba(96, 165, 250, 0.6)' : 'rgba(255,255,255,0.25)'}
                  />
                )}
                {graphType === 'weighted' && (
                  <text
                    x={(sPos.x + tPos.x) / 2}
                    y={(sPos.y + tPos.y) / 2 - 10}
                    fill="rgba(255,255,255,0.4)"
                    fontSize="11"
                    textAnchor="middle"
                    className="font-mono"
                  >
                    {edge.weight || 1}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((node, i) => {
          const total = nodes.length;
          const pos = getNodePosition(i, total);
          const isCurrent = node.id === currentNode;
          const isVisited = visitedNodes.includes(node.id);
          const isInQueue = animationPath.slice(currentIdx + 1).includes(node.id) && currentIdx >= 0;

          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: pos.x - 28,
                y: pos.y - 28,
                backgroundColor: isCurrent
                  ? '#60a5fa'
                  : isVisited
                  ? '#22c55e'
                  : isInQueue
                  ? 'rgba(245, 158, 11, 0.3)'
                  : 'rgba(99, 102, 241, 0.15)',
                borderColor: isCurrent
                  ? '#60a5fa'
                  : isVisited
                  ? '#22c55e'
                  : isInQueue
                  ? 'rgba(245, 158, 11, 0.5)'
                  : 'rgba(99, 102, 241, 0.3)',
                boxShadow: isCurrent
                  ? '0 0 25px rgba(96, 165, 250, 0.6)'
                  : isVisited
                  ? '0 0 15px rgba(34, 197, 94, 0.3)'
                  : 'none',
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 20, delay: i * 0.05 }}
              className="absolute w-[56px] h-[56px] flex items-center justify-center rounded-full border-2 text-sm font-bold z-10"
              style={{ color: isCurrent || isVisited ? '#fff' : 'rgba(255,255,255,0.7)' }}
            >
              {node.label}
            </motion.div>
          );
        })}
      </div>

      {/* Visited Order */}
      {animationPath.length > 0 && (
        <div className="p-4 rounded-xl bg-[var(--mcq-surface-20)] border border-[var(--mcq-border)]">
          <div className="text-xs font-semibold text-[var(--mcq-text-muted)] mb-2 uppercase tracking-wider">
            Traversal Order ({algorithm.toUpperCase()})
          </div>
          <div className="flex flex-wrap gap-1.5">
            {animationPath.map((id, i) => {
              const node = nodes.find(n => n.id === id);
              if (!node) return null;
              const isActive = i < currentIdx;
              return (
                <motion.span
                  key={id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    backgroundColor: isActive || i === currentIdx
                      ? 'rgba(34, 197, 94, 0.1)'
                      : 'rgba(255,255,255,0.04)',
                    borderColor: isActive || i === currentIdx
                      ? 'rgba(34, 197, 94, 0.2)'
                      : 'rgba(255,255,255,0.08)',
                    color: isActive || i === currentIdx ? '#22c55e' : 'var(--mcq-text-muted)',
                  }}
                  transition={{ delay: i * 0.1 }}
                  className="px-2.5 py-1 rounded text-xs font-mono font-medium border"
                >
                  {node.label}
                </motion.span>
              );
            })}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex gap-4 text-xs text-[var(--mcq-text-muted)]">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-indigo-400/30 border border-indigo-400/30" /> Unvisited
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-amber-400" /> In Queue
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-blue-400" /> Current
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-400" /> Visited
        </span>
      </div>
    </div>
  );
}
