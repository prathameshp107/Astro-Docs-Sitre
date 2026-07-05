import { useState, useEffect, useRef, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  ReactFlowProvider,
  useReactFlow,
} from '@xyflow/react';
import { ClassNode } from './ClassNode';
import '@xyflow/react/dist/style.css';

const nodeTypes = { classNode: ClassNode };

function ClassDiagramInner({ schema }) {
  const initialNodes = useMemo(() => {
    return schema?.nodes?.map((n) => ({
      id: n.id,
      type: 'classNode',
      position: n.position,
      data: {
        label: n.label,
        isInterface: !!n.isInterface,
        isAbstract: !!n.isAbstract,
        fields: n.fields || [],
        methods: n.methods || [],
      },
      draggable: true,
    })) || [];
  }, [schema]);

  const initialEdges = useMemo(() => {
    return schema?.edges?.map((e) => {
      // Setup edge markers based on relationship type
      let markerEnd = {
        type: MarkerType.ArrowClosed,
        width: 16,
        height: 16,
        color: '#64748b',
      };
      let strokeDasharray = undefined;

      if (e.type === 'extends') {
        markerEnd = {
          type: MarkerType.ArrowClosed, // empty triangle is ideal, but closed is fine
          width: 16,
          height: 16,
          color: '#6366f1',
        };
      } else if (e.type === 'implements') {
        markerEnd = {
          type: MarkerType.ArrowClosed,
          width: 16,
          height: 16,
          color: '#8b5cf6',
        };
        strokeDasharray = '5';
      } else if (e.type === 'has-a' || e.type === 'composition') {
        markerEnd = {
          type: MarkerType.ArrowClosed, // Diamond marker is not native to React Flow standard markers, but closed arrow is fine
          width: 12,
          height: 12,
          color: '#f59e0b',
        };
      }

      return {
        id: e.id,
        source: e.source,
        target: e.target,
        label: e.label || '',
        type: 'default',
        style: {
          stroke: e.type === 'extends' ? '#6366f1' : e.type === 'implements' ? '#8b5cf6' : '#64748b',
          strokeWidth: 1.5,
          strokeDasharray,
        },
        labelStyle: {
          fill: '#94a3b8',
          fontSize: 9,
          fontWeight: 600,
        },
        markerEnd,
      };
    }) || [];
  }, [schema]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowRef = useRef(null);
  const { fitView } = useReactFlow();

  // fitView on initial load
  useEffect(() => {
    const t = setTimeout(() => {
      fitView({ padding: 0.2 });
    }, 100);
    return () => clearTimeout(t);
  }, [fitView]);

  return (
    <div className="class-diagram-container" ref={reactFlowRef}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        proOptions={{ hideAttribution: true }}
        nodesDraggable={true}
        nodesConnectable={false}
        zoomOnScroll={true}
        panOnScroll={true}
        minZoom={0.2}
        maxZoom={2}
      >
        <Background color="#1e293b" gap={20} size={1} />
      </ReactFlow>
    </div>
  );
}

export default function ClassDiagram({ schema }) {
  return (
    <ReactFlowProvider>
      <ClassDiagramInner schema={schema} />
    </ReactFlowProvider>
  );
}
