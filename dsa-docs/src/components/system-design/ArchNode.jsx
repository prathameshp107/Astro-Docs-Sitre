import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { motion } from 'framer-motion';

/* ── Node type definitions with icons (SVG paths) & colors ────────── */
const NODE_TYPES = {
  client: {
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    gradient: ['#64748b', '#475569'],
    label: 'Client',
    shape: 'rounded',
  },
  server: {
    icon: 'M5 12H3l9-9 9 9h-2M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7',
    gradient: ['#6366f1', '#4f46e5'],
    label: 'Server',
    shape: 'rounded',
  },
  lb: {
    icon: 'M3 6l9-4 9 4M3 6v12l9 4M3 6l9 4m9-4v12l-9 4m9-16l-9 4m0 0v12',
    gradient: ['#3b82f6', '#2563eb'],
    label: 'Load Balancer',
    shape: 'hexagon',
  },
  cache: {
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    gradient: ['#10b981', '#059669'],
    label: 'Cache',
    shape: 'rounded',
  },
  database: {
    icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4',
    gradient: ['#f59e0b', '#d97706'],
    label: 'Database',
    shape: 'cylinder',
  },
  replica: {
    icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
    gradient: ['#14b8a6', '#0d9488'],
    label: 'Replica',
    shape: 'cylinder',
  },
  shard: {
    icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
    gradient: ['#f59e0b', '#b45309'],
    label: 'Shard',
    shape: 'cylinder',
  },
  queue: {
    icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    gradient: ['#8b5cf6', '#7c3aed'],
    label: 'Queue',
    shape: 'rounded',
  },
  cdn: {
    icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    gradient: ['#06b6d4', '#0891b2'],
    label: 'CDN',
    shape: 'rounded',
  },
  storage: {
    icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4',
    gradient: ['#64748b', '#334155'],
    label: 'Storage',
    shape: 'rounded',
  },
  service: {
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
    gradient: ['#c026d3', '#a21caf'],
    label: 'Service',
    shape: 'rounded',
  },
};

const NODE_WIDTH = 160;
const NODE_HEIGHT = 80;

/* ── ArchNode — custom React Flow node ────────────────────────────── */
function ArchNodeInner({ data, isConnectable }) {
  const nodeType = data.nodeType || 'server';
  const config = NODE_TYPES[nodeType] || NODE_TYPES.server;
  const label = data.label || config.label;
  const isNew = data.isNew;
  const isHighlighted = data.isHighlighted;

  return (
    <motion.div
      initial={isNew ? { scale: 0.3, opacity: 0 } : false}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.3, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="arch-node-wrapper"
      style={{
        '--node-color-1': config.gradient[0],
        '--node-color-2': config.gradient[1],
      }}
    >
      {/* Highlight ring for newly added nodes */}
      {isNew && (
        <motion.div
          className="arch-node-ring"
          initial={{ scale: 1.6, opacity: 0.8 }}
          animate={{ scale: 2.2, opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      )}

      {/* Active highlight for request-path tracing */}
      {isHighlighted && (
        <motion.div
          className="arch-node-active-ring"
          initial={{ scale: 1, opacity: 0 }}
          animate={{ scale: 1.3, opacity: [0, 0.8, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}

      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="arch-node-handle"
      />

      <div className="arch-node-body">
        <div className="arch-node-icon-wrap">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="arch-node-icon"
          >
            <path d={config.icon} />
          </svg>
        </div>
        <div className="arch-node-label">
          {label.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i < label.split('\n').length - 1 && <br />}
            </span>
          ))}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="arch-node-handle"
      />
    </motion.div>
  );
}

const ArchNode = memo(ArchNodeInner);

export { ArchNode, NODE_TYPES, NODE_WIDTH, NODE_HEIGHT };
export default ArchNode;
