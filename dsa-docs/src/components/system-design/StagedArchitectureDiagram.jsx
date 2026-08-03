import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  ReactFlowProvider,
  useReactFlow,
} from '@xyflow/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArchNode, NODE_TYPES, NODE_WIDTH, NODE_HEIGHT } from './ArchNode.jsx';
import '@xyflow/react/dist/style.css';

/* ── Helpers ──────────────────────────────────────────────────────── */

/** Convert a diagram-spec stage into React Flow nodes */
function stageToFlowNodes(stage, prevNodeIds) {
  return stage.nodes.map((n) => ({
    id: n.id,
    type: 'archNode',
    position: n.position,
    data: {
      label: n.label,
      nodeType: n.type,
      isNew: !prevNodeIds.has(n.id),
    },
    draggable: true,
  }));
}

/** Convert a diagram-spec stage into React Flow edges */
function stageToFlowEdges(stage) {
  return stage.edges.map((e) => ({
    id: e.id,
    source: e.source,
    target: e.target,
    label: e.label || '',
    type: 'default',
    animated: !!e.animated,
    style: {
      stroke: e.animated ? '#8b5cf6' : '#475569',
      strokeWidth: 1.5,
    },
    labelStyle: {
      fill: '#94a3b8',
      fontSize: 10,
      fontWeight: 500,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 16,
      height: 16,
      color: e.animated ? '#8b5cf6' : '#475569',
    },
  }));
}

/** Parse simplified markdown bold + code + newlines */
function parseNarrative(text) {
  if (!text) return null;
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\n\n)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-amber-400 font-bold">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i} className="bg-amber-500/10 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/20 font-mono text-xs">{part.slice(1, -1)}</code>;
    }
    if (part === '\n\n') {
      return <br key={i} />;
    }
    return part;
  });
}

/** Extract key technology keywords from narrative text */
function extractTechKeywords(text, nodes = []) {
  const TECH_DICTIONARY = [
    'PostgreSQL', 'MySQL', 'Redis', 'Cassandra', 'Kafka', 'Zookeeper', 'S3', 'CDN', 
    'WebSockets', 'Nginx', 'Envoy', 'Kong', 'Flink', 'Spark', 'DynamoDB', 'HBase',
    'Bigtable', 'Cloudflare', 'Akamai', 'FFmpeg', 'HLS', 'DASH', 'RabbitMQ', 'SQS',
    'SendGrid', 'Twilio', 'APNs', 'FCM', 'ClickHouse', 'Memcached', 'Trie', 'Geohash',
    'Quadtree', 'Raft', 'CRDT', 'Yjs', 'Airflow', 'Temporal'
  ];
  
  const found = new Set();
  const lowerText = (text || '').toLowerCase();
  
  TECH_DICTIONARY.forEach(tech => {
    if (lowerText.includes(tech.toLowerCase())) {
      found.add(tech);
    }
  });

  nodes.forEach(node => {
    const label = node.label || '';
    TECH_DICTIONARY.forEach(tech => {
      if (label.toLowerCase().includes(tech.toLowerCase())) {
        found.add(tech);
      }
    });
  });

  return Array.from(found);
}

/* ── Custom node types map ────────────────────────────────────────── */
const nodeTypes = { archNode: ArchNode };

/* ── Inner Component (utilizes React Flow context) ────────────────── */
function StagedArchitectureDiagramInner({ diagramData }) {
  const stages = diagramData?.stages || [];
  const [currentStage, setCurrentStage] = useState(0);
  const [prevNodeIds, setPrevNodeIds] = useState(new Set());
  const [showLegend, setShowLegend] = useState(false);
  
  const initialNodes = useMemo(() => {
    return stages[0] ? stageToFlowNodes(stages[0], new Set()) : [];
  }, [stages]);

  const initialEdges = useMemo(() => {
    return stages[0] ? stageToFlowEdges(stages[0]) : [];
  }, [stages]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isTracing, setIsTracing] = useState(false);
  const [tracingNodeId, setTracingNodeId] = useState(null);
  const [dotPos, setDotPos] = useState(null);
  
  const reactFlowRef = useRef(null);
  const traceTimeoutRef = useRef(null);
  const { fitView, zoomIn, zoomOut } = useReactFlow();

  const stage = stages[currentStage];

  /* Update nodes/edges and fit view when stage changes */
  useEffect(() => {
    if (!stage) return;
    const flowNodes = stageToFlowNodes(stage, prevNodeIds);
    const flowEdges = stageToFlowEdges(stage);
    setNodes(flowNodes);
    setEdges(flowEdges);

    const t = setTimeout(() => {
      fitView({ duration: 500, padding: 0.25 });
    }, 50);
    return () => clearTimeout(t);
  }, [currentStage, stage, fitView]);

  /* Handle stage change */
  const goToStage = useCallback(
    (idx) => {
      if (idx < 0 || idx >= stages.length || idx === currentStage) return;
      if (traceTimeoutRef.current) {
        clearTimeout(traceTimeoutRef.current);
        traceTimeoutRef.current = null;
      }
      setIsTracing(false);
      setTracingNodeId(null);
      setDotPos(null);

      const curNodeIds = new Set(stages[currentStage]?.nodes?.map((n) => n.id) || []);
      setPrevNodeIds(curNodeIds);
      setCurrentStage(idx);
    },
    [currentStage, stages],
  );

  /* Keyboard controls */
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        goToStage(currentStage + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goToStage(currentStage - 1);
      } else if (e.key === ' ') {
        e.preventDefault();
        if (!isTracing) traceRequest();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [currentStage, goToStage, isTracing]);

  /* Request Path Tracing */
  const getNodeCenter = useCallback(
    (nodeId) => {
      if (!reactFlowRef.current) return null;
      const container = reactFlowRef.current;
      const nodeEl = container.querySelector(`[data-id="${nodeId}"]`);
      if (!nodeEl) return null;
      const containerRect = container.getBoundingClientRect();
      const nodeRect = nodeEl.getBoundingClientRect();
      return {
        x: nodeRect.left - containerRect.left + nodeRect.width / 2,
        y: nodeRect.top - containerRect.top + nodeRect.height / 2,
      };
    },
    [],
  );

  const traceRequest = useCallback(() => {
    if (!stage?.requestPath || stage.requestPath.length === 0) return;
    setIsTracing(true);

    const path = stage.requestPath;
    let step = 0;

    const advance = () => {
      if (step >= path.length) {
        setIsTracing(false);
        setTracingNodeId(null);
        setDotPos(null);

        setNodes((nds) =>
          nds.map((n) => ({
            ...n,
            data: { ...n.data, isHighlighted: false },
          })),
        );
        return;
      }

      const nodeId = path[step];
      setTracingNodeId(nodeId);

      setNodes((nds) =>
        nds.map((n) => ({
          ...n,
          data: { ...n.data, isHighlighted: n.id === nodeId },
        })),
      );

      const pos = getNodeCenter(nodeId);
      if (pos) {
        setDotPos(pos);
      }

      step++;
      traceTimeoutRef.current = setTimeout(advance, 700);
    };

    advance();
  }, [stage, getNodeCenter, setNodes]);

  useEffect(() => {
    return () => {
      if (traceTimeoutRef.current) {
        clearTimeout(traceTimeoutRef.current);
      }
    };
  }, []);

  const tracedNodeLabel = useMemo(() => {
    if (!tracingNodeId || !stage) return '';
    const found = stage.nodes.find((n) => n.id === tracingNodeId);
    return found?.label?.split('\n')[0] || tracingNodeId;
  }, [tracingNodeId, stage]);

  const techKeywords = useMemo(() => {
    if (!stage) return [];
    return extractTechKeywords(stage.narrative, stage.nodes);
  }, [stage]);

  if (!stages.length) {
    return <div style={{ padding: 24, color: '#94a3b8' }}>No diagram data provided.</div>;
  }

  const progressPercent = Math.round(((currentStage + 1) / stages.length) * 100);

  return (
    <div className="staged-diagram-container" tabIndex={0}>
      {/* ── Controls Bar ─────────────────────────────────────────── */}
      <div className="staged-diagram-controls bg-[var(--sketch-bg-dim)] border-b border-[var(--sketch-border)] p-4 flex flex-wrap items-center justify-between gap-4">
        {/* Left: Diagram Title & Stage Badge */}
        <div className="flex items-center gap-3">
          <div className="staged-diagram-title text-base font-bold text-[var(--sketch-text)] flex items-center gap-2">
            <span>📐</span> {diagramData.title || 'Architecture'}
          </div>
          <span className="sketch-border-soft px-2.5 py-0.5 text-xs font-mono font-bold bg-amber-500/10 text-amber-400 border-amber-500/30 rounded-full">
            Stage {currentStage + 1} / {stages.length}
          </span>
        </div>

        {/* Center: Interactive Stage Step Pills */}
        <div className="staged-diagram-pills flex items-center gap-1.5">
          {stages.map((s, idx) => (
            <button
              key={idx}
              className={`staged-diagram-pill text-xs font-bold w-9 h-9 rounded-xl border transition-all ${
                idx === currentStage
                  ? 'active bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/30 scale-105'
                  : 'bg-slate-800/60 text-slate-300 border-slate-700 hover:border-amber-500/60 hover:text-amber-400'
              }`}
              onClick={() => goToStage(idx)}
              title={`Stage ${idx + 1}: ${s.title}`}
              aria-label={`Stage ${idx + 1}: ${s.title}`}
            >
              {idx + 1}
            </button>
          ))}
        </div>

        {/* Right: Canvas Zoom Controls & Trace Request Button */}
        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="inline-flex items-center rounded-xl bg-slate-900/80 border border-slate-700/80 p-0.5">
            <button
              onClick={() => zoomIn({ duration: 300 })}
              className="px-2 py-1 text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Zoom In"
            >
              ＋
            </button>
            <button
              onClick={() => zoomOut({ duration: 300 })}
              className="px-2 py-1 text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Zoom Out"
            >
              －
            </button>
            <button
              onClick={() => fitView({ duration: 500, padding: 0.25 })}
              className="px-2 py-1 text-xs text-amber-400 hover:bg-slate-800 rounded-lg font-mono transition-colors"
              title="Reset / Fit View"
            >
              ⛶ Fit
            </button>
            <button
              onClick={() => setShowLegend(!showLegend)}
              className={`px-2 py-1 text-xs rounded-lg font-mono transition-colors ${
                showLegend ? 'bg-amber-500/20 text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Toggle Component Legend"
            >
              ℹ️ Key
            </button>
          </div>

          {/* Trace Request button */}
          <button
            className={`staged-diagram-trace-btn flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-xl border transition-all ${
              isTracing
                ? 'tracing bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-500/30 animate-pulse'
                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/20 hover:border-emerald-500'
            }`}
            onClick={traceRequest}
            disabled={isTracing}
            aria-label="Trace request path"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
            </svg>
            {isTracing ? 'Tracing Flow...' : 'Trace Request'}
          </button>
        </div>
      </div>

      {/* Stage Evolution Progress Bar */}
      <div className="w-full bg-slate-800/80 h-1 relative overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-amber-500 via-emerald-400 to-amber-400"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* ── React Flow Canvas Area ────────────────────────────────────── */}
      <div className="staged-diagram-canvas relative" ref={reactFlowRef}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.25 }}
          proOptions={{ hideAttribution: true }}
          nodesDraggable={true}
          nodesConnectable={false}
          zoomOnScroll={true}
          panOnScroll={true}
          minZoom={0.3}
          maxZoom={2}
        >
          <Background color="#334155" gap={24} size={1} />
        </ReactFlow>

        {/* Legend Overlay Panel */}
        <AnimatePresence>
          {showLegend && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="absolute top-4 left-4 z-20 bg-slate-900/95 backdrop-blur-md border-2 border-amber-500/40 p-4 rounded-2xl shadow-2xl max-w-sm font-sketch"
            >
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-700/60">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🗺️</span> Architecture Component Key
                </span>
                <button
                  onClick={() => setShowLegend(false)}
                  className="text-slate-400 hover:text-white text-xs font-bold px-1.5 py-0.5 rounded hover:bg-slate-800"
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                {Object.entries(NODE_TYPES).map(([typeKey, config]) => (
                  <div key={typeKey} className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-800/60 border border-slate-700/40">
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0" 
                      style={{ background: config.gradient[0] }}
                    />
                    <span className="text-slate-200 truncate">{config.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trace dot overlay */}
        <AnimatePresence>
          {dotPos && isTracing && (
            <>
              <motion.div
                className="request-path-dot"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                style={{
                  left: dotPos.x,
                  top: dotPos.y,
                }}
              />
              <motion.div
                className="request-path-label"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                style={{
                  left: dotPos.x,
                  top: dotPos.y - 8,
                }}
              >
                {tracedNodeLabel}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* ── Main Info Section (Bottlenecks, Deep-Dive & Tech Stack) ─── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStage}
          className="staged-diagram-info p-6 bg-[var(--sketch-bg-dim)] border-t border-[var(--sketch-border)] font-sketch"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
        >
          {/* Stage Title */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <h3 className="staged-diagram-stage-title font-header font-bold text-xl md:text-2xl text-[var(--sketch-text)] flex items-center gap-2">
              <span className="text-amber-500">📍</span> {stage.title}
            </h3>
            {techKeywords.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-mono text-[var(--sketch-text-muted)] uppercase tracking-wider mr-1">
                  Stack:
                </span>
                {techKeywords.map((tech) => (
                  <span
                    key={tech}
                    className="inline-block px-2 py-0.5 text-[11px] font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Bottleneck Warning Box */}
          {stage.bottleneck && (
            <div className="staged-diagram-bottleneck sketch-border bg-amber-500/10 border-2 border-amber-500/50 p-4 rounded-2xl mb-4 shadow-lg">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-1 font-mono uppercase tracking-wider">
                <span className="text-lg">⚠️</span> System Bottleneck & Scaling Failure Mode
              </div>
              <p className="staged-diagram-bottleneck-text text-amber-200/90 text-sm leading-relaxed font-sketch pl-7">
                {stage.bottleneck}
              </p>
            </div>
          )}

          {/* Detailed Narrative Section */}
          <div className="sketch-border bg-[var(--sketch-bg)] p-5 rounded-2xl border border-[var(--sketch-border)] shadow-md mb-3">
            <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span>📖</span> Architectural Deep-Dive & Request Flow
            </div>
            <div className="staged-diagram-narrative text-[var(--sketch-text)] text-sm md:text-base leading-relaxed font-sketch space-y-2">
              {parseNarrative(stage.narrative)}
            </div>
          </div>

          {/* Bottom Keyboard & Interaction Hints Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--sketch-border)] text-xs font-mono text-[var(--sketch-text-muted)]">
            <div className="flex items-center gap-2">
              <span className="text-amber-500 font-bold">Shortcuts:</span>
              <kbd className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-amber-400">←</kbd>
              <kbd className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-amber-400">→</kbd>
              <span>switch stages</span>
              <span className="mx-1">·</span>
              <kbd className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-emerald-400">Space</kbd>
              <span>trace flow</span>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Interactive Request Tracer Active</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ── Main Export (Wraps inner component with ReactFlowProvider) ────── */
export default function StagedArchitectureDiagram({ diagramData }) {
  return (
    <ReactFlowProvider>
      <StagedArchitectureDiagramInner diagramData={diagramData} />
    </ReactFlowProvider>
  );
}
