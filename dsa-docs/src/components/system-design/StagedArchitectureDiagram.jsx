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
import { ArchNode, NODE_WIDTH, NODE_HEIGHT } from './ArchNode.jsx';
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
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i}>{part.slice(1, -1)}</code>;
    }
    if (part === '\n\n') {
      return <br key={i} />;
    }
    return part;
  });
}

/* ── Custom node types map ────────────────────────────────────────── */
const nodeTypes = { archNode: ArchNode };

/* ── Inner Component (utilizes React Flow context) ────────────────── */
function StagedArchitectureDiagramInner({ diagramData }) {
  const stages = diagramData?.stages || [];
  const [currentStage, setCurrentStage] = useState(0);
  const [prevNodeIds, setPrevNodeIds] = useState(new Set());
  
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
  const { fitView } = useReactFlow();

  const stage = stages[currentStage];

  /* Update nodes/edges and fit view when stage changes */
  useEffect(() => {
    if (!stage) return;
    const flowNodes = stageToFlowNodes(stage, prevNodeIds);
    const flowEdges = stageToFlowEdges(stage);
    setNodes(flowNodes);
    setEdges(flowEdges);

    // Call fitView with a slight delay to ensure nodes are rendered in the DOM
    const t = setTimeout(() => {
      fitView({ duration: 500, padding: 0.25 });
    }, 50);
    return () => clearTimeout(t);
  }, [currentStage, stage, fitView]);

  /* Handle stage change */
  const goToStage = useCallback(
    (idx) => {
      if (idx < 0 || idx >= stages.length || idx === currentStage) return;
      // Stop any active tracing
      if (traceTimeoutRef.current) {
        clearTimeout(traceTimeoutRef.current);
        traceTimeoutRef.current = null;
      }
      setIsTracing(false);
      setTracingNodeId(null);
      setDotPos(null);

      // Capture current node IDs as "prev" for diff animation
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

  /* ── Request Path Tracing ───────────────────────────────────────── */
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

        // Clear node highlights
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

      // Highlight the current node
      setNodes((nds) =>
        nds.map((n) => ({
          ...n,
          data: { ...n.data, isHighlighted: n.id === nodeId },
        })),
      );

      // Position the dot
      const pos = getNodeCenter(nodeId);
      if (pos) {
        setDotPos(pos);
      }

      step++;
      traceTimeoutRef.current = setTimeout(advance, 700);
    };

    advance();
  }, [stage, getNodeCenter, setNodes]);

  /* Cleanup on unmount */
  useEffect(() => {
    return () => {
      if (traceTimeoutRef.current) {
        clearTimeout(traceTimeoutRef.current);
      }
    };
  }, []);

  /* ── Find the label for the traced node ──────────────────────────── */
  const tracedNodeLabel = useMemo(() => {
    if (!tracingNodeId || !stage) return '';
    const found = stage.nodes.find((n) => n.id === tracingNodeId);
    return found?.label?.split('\n')[0] || tracingNodeId;
  }, [tracingNodeId, stage]);

  if (!stages.length) {
    return <div style={{ padding: 24, color: '#94a3b8' }}>No diagram data provided.</div>;
  }

  return (
    <div className="staged-diagram-container" tabIndex={0}>
      {/* ── Controls bar ─────────────────────────────────────────── */}
      <div className="staged-diagram-controls">
        <div className="staged-diagram-title">
          {diagramData.title || 'Architecture'}
        </div>

        <div className="staged-diagram-pills">
          {stages.map((s, idx) => (
            <button
              key={idx}
              className={`staged-diagram-pill ${idx === currentStage ? 'active' : ''}`}
              onClick={() => goToStage(idx)}
              title={s.title}
              aria-label={`Stage ${idx + 1}: ${s.title}`}
            >
              {idx + 1}
            </button>
          ))}
        </div>

        <button
          className={`staged-diagram-trace-btn ${isTracing ? 'tracing' : ''}`}
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
          {isTracing ? 'Tracing...' : 'Trace Request'}
        </button>
      </div>

      {/* ── React Flow canvas ────────────────────────────────────── */}
      <div className="staged-diagram-canvas" ref={reactFlowRef}>
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
          <Background color="#1e293b" gap={24} size={1} />
        </ReactFlow>

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

      {/* ── Info panel ───────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStage}
          className="staged-diagram-info"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="staged-diagram-stage-title">{stage.title}</h3>

          {stage.bottleneck && (
            <div className="staged-diagram-bottleneck">
              <span className="staged-diagram-bottleneck-icon">⚠️</span>
              <p className="staged-diagram-bottleneck-text">{stage.bottleneck}</p>
            </div>
          )}

          <div className="staged-diagram-narrative">
            {parseNarrative(stage.narrative)}
          </div>

          <div className="staged-diagram-kbd-hint">
            <kbd>←</kbd><kbd>→</kbd> stages
            <span style={{ margin: '0 4px' }}>·</span>
            <kbd>Space</kbd> trace request
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
