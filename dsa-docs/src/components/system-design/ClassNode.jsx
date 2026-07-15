import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

function ClassNodeInner({ data, isConnectable }) {
  const isInterface = data.isInterface || false;
  const isAbstract = data.isAbstract || false;
  const fields = data.fields || [];
  const methods = data.methods || [];

  return (
    <div className="class-node-card">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="class-node-handle"
      />
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="class-node-handle"
      />

      {/* Header */}
      <div className={`class-node-header ${isInterface ? 'interface' : isAbstract ? 'abstract' : ''}`}>
        {isInterface && <span className="class-node-stereotype">&lt;&lt;interface&gt;&gt;</span>}
        {isAbstract && <span className="class-node-stereotype">&lt;&lt;abstract&gt;&gt;</span>}
        <span className="class-node-name">{data.label}</span>
      </div>

      {/* Fields */}
      {fields.length > 0 && (
        <div className="class-node-section fields">
          {fields.map((f, i) => (
            <div key={i} className="class-node-item">
              <span className="visibility">{f.visibility || '-'}</span>{' '}
              <span className="name">{f.name}</span>: <span className="type">{f.type}</span>
            </div>
          ))}
        </div>
      )}

      {/* Methods */}
      {methods.length > 0 && (
        <div className="class-node-section methods">
          {methods.map((m, i) => (
            <div key={i} className="class-node-item">
              <span className="visibility">{m.visibility || '+'}</span>{' '}
              <span className="name">{m.name}</span>({m.params || ''}):{' '}
              <span className="type">{m.returnType || 'void'}</span>
            </div>
          ))}
        </div>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="class-node-handle"
      />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="class-node-handle"
      />
    </div>
  );
}

const ClassNode = memo(ClassNodeInner);

export { ClassNode };
export default ClassNode;
