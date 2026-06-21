import { FiPlay } from "react-icons/fi";

export default function LabConsolePanel({ output, title = "Console Output", emptyMessage = "Run your code to see output" }) {
  return (
    <>
      <div className="jsl-console-header">
        <span>{title}</span>
        <span className="jsl-console-count">{output.length} lines</span>
      </div>
      <div className="jsl-console-body">
        {output.length === 0 ? (
          <div className="jsl-console-empty">
            <FiPlay size={28} opacity={0.2} />
            <p>{emptyMessage}</p>
          </div>
        ) : (
          output.map((line, i) => (
            <div key={i} className={`jsl-console-line jsl-console-${line.type}`}>
              <span className="jsl-console-marker">
                {line.type === "log" && "▸"}
                {line.type === "warn" && "⚠"}
                {line.type === "error" && "✗"}
                {line.type === "info" && "ℹ"}
                {line.type === "result" && "›"}
              </span>
              <pre>{line.content}</pre>
            </div>
          ))
        )}
      </div>
    </>
  );
}
