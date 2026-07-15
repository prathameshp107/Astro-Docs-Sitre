import { useState, useCallback } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";

/**
 * Small copy-to-clipboard button used in solution boxes and code blocks.
 */
export function LabCopyButton({ text, style }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text || "");
    } catch {
      // fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = text || "";
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch {}
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }, [text]);

  return (
    <button
      type="button"
      className={`jsl-copy-btn ${copied ? "copied" : ""}`}
      onClick={handleCopy}
      title={copied ? "Copied!" : "Copy code"}
      aria-label={copied ? "Copied" : "Copy code"}
      style={style}
    >
      {copied ? <FiCheck size={13} /> : <FiCopy size={13} />}
      <span>{copied ? "Copied!" : "Copy"}</span>
    </button>
  );
}

/**
 * Shared solution box with a header row (title + copy button) and a code block.
 * Usage: <LabSolutionBox title="Solution" code={lesson.solutionCode} />
 */
export default function LabSolutionBox({ title = "Solution", code, className = "jsl-solution-box" }) {
  return (
    <div className={className}>
      <div className="jsl-solution-header">
        <h4>{title}</h4>
        <LabCopyButton text={code} />
      </div>
      <pre className="jsl-code-block"><code>{code}</code></pre>
    </div>
  );
}
