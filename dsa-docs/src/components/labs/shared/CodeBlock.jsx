import { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";

/**
 * Shared code block with a copy-to-clipboard button.
 * Used by the markdown renderer (fenced/detected code) and solution boxes.
 */
export default function CodeBlock({ code, lang }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const text = typeof code === "string" ? code : String(code ?? "");
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback for older browsers / non-secure contexts
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch {}
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="jsl-md-codeblock">
      <div className="jsl-codeblock-actions">
        {lang && <span className="jsl-md-codeblock-lang">{lang}</span>}
        <button type="button" className={`jsl-copy-btn ${copied ? "copied" : ""}`} onClick={copy} title="Copy code">
          {copied ? <FiCheck size={12} /> : <FiCopy size={12} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="jsl-code-block"><code>{code}</code></pre>
    </div>
  );
}
