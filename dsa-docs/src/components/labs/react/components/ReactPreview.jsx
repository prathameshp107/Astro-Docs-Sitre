// ─── React — Live Preview Component ───
// Renders React code in a sandboxed iframe. JSX is transpiled locally with
// @babel/standalone (no network / no external bundler). Console output is
// forwarded to the parent via postMessage (handled in ReactLabsPlatform).

import { useMemo } from "react";
import { DiReact } from "react-icons/di";
import { compileReactCode } from "../runner/reactRunner.js";

export default function ReactPreview({ code, previewKey, style }) {
  // Recompile only when previewKey changes (i.e. on Run / lesson-switch / reset),
  // reading the latest `code` at that moment. Keeps Babel off the keystroke path.
  const { html, error } = useMemo(
    () => compileReactCode(code || ""),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [previewKey]
  );

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
          <DiReact size={11} /> React Preview
        </span>
      </div>
      <div
        className="jsl-preview-body"
        style={{ height: "calc(100% - 38px)", padding: 0 }}
      >
        {error ? (
          <div
            style={{
              color: "#ef4444",
              fontFamily: "monospace",
              fontSize: "0.82rem",
              padding: "1rem",
              whiteSpace: "pre-wrap",
            }}
          >
            <strong>✗ Compile Error:</strong>
            {"\n"}
            {error}
          </div>
        ) : (
          <iframe
            key={previewKey}
            title="React Preview"
            srcDoc={html}
            sandbox="allow-scripts"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              background: "#0a0f1e",
            }}
          />
        )}
      </div>
    </div>
  );
}
