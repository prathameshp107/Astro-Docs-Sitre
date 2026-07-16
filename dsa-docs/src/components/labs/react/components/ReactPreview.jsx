// ─── React — Live Preview Component ───
// Renders transpiled React code inside a sandboxed iframe with console log forwarding.

import { useState, useEffect } from "react";
import { DiReact } from "react-icons/di";
import { FiPlay } from "react-icons/fi";
import { compileReactCode } from "../runner/reactRunner.js";

export default function ReactPreview({ code, previewKey, style, onClearLogs }) {
  const [compiledHtml, setCompiledHtml] = useState("");
  const [compilationError, setCompilationError] = useState(null);

  useEffect(() => {
    onClearLogs();
    const result = compileReactCode(code);
    if (result.error) {
      setCompilationError(result.error);
      return;
    }
    const handle = setTimeout(() => {
      setCompiledHtml(result.html);
    }, 150);
    return () => clearTimeout(handle);
  }, [code, previewKey, onClearLogs]);

  if (compilationError) {
    return (
      <div className="jsl-preview-panel" style={style}>
        <div className="jsl-preview-header">
          <span className="jsl-preview-header-left">
            <span className="jsl-browser-dots">
              <span className="jsl-browser-dot red" />
              <span className="jsl-browser-dot yellow" />
              <span className="jsl-browser-dot green" />
            </span>
            <span className="jsl-preview-url">preview</span>
          </span>
          <span className="jsl-preview-info">
            <DiReact size={11} /> React
          </span>
        </div>
        <div
          className="jsl-preview-body"
          style={{ height: "calc(100% - 38px)", padding: 0 }}
        >
          <div
            style={{
              padding: "1rem",
              color: "#ef4444",
              fontFamily: "monospace",
              fontSize: "0.85rem",
            }}
          >
            <strong style={{ display: "block", marginBottom: "0.5rem" }}>
              ✗ Transpilation Error:
            </strong>
            <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
              {compilationError}
            </pre>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="jsl-preview-panel" style={style}>
      <div className="jsl-preview-header">
        <span className="jsl-preview-header-left">
          <span className="jsl-browser-dots">
            <span className="jsl-browser-dot red" />
            <span className="jsl-browser-dot yellow" />
            <span className="jsl-browser-dot green" />
          </span>
          <span className="jsl-preview-url">preview</span>
        </span>
        <span className="jsl-preview-info">
          <DiReact size={11} /> React
        </span>
      </div>
      <div
        className="jsl-preview-body"
        style={{ height: "calc(100% - 38px)", padding: 0 }}
      >
        {compiledHtml ? (
          <iframe
            key={previewKey}
            title="React Preview"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              background: "#0a0f1e",
            }}
            sandbox="allow-scripts"
            srcDoc={compiledHtml}
          />
        ) : (
          <div className="jsl-preview-placeholder">
            <FiPlay size={24} opacity={0.2} />
            <p>Run your React code to see a live preview</p>
          </div>
        )}
      </div>
    </div>
  );
}
