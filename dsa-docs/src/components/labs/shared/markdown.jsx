import React from "react";
import CodeBlock from "./CodeBlock.jsx";

/**
 * Parses inline markdown — bold (**text**) and inline code (`code`) — into React elements.
 */
function renderInline(content, keyPrefix = "") {
  const parts = [];
  let lastIndex = 0;
  const regex = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const matchIndex = match.index;
    if (matchIndex > lastIndex) {
      parts.push(content.substring(lastIndex, matchIndex));
    }

    const matchText = match[0];
    if (matchText.startsWith("**")) {
      parts.push(<strong key={`${keyPrefix}-b-${matchIndex}`}>{matchText.slice(2, -2)}</strong>);
    } else if (matchText.startsWith("`")) {
      parts.push(<code key={`${keyPrefix}-c-${matchIndex}`} className="jsl-inline-code">{matchText.slice(1, -1)}</code>);
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < content.length) {
    parts.push(content.substring(lastIndex));
  }

  return parts;
}

/**
 * Heuristic: does this line look like a line of code?
 * Used to auto-detect code examples in curricula that don't use ``` fences.
 */
function isCodeLine(rawLine) {
  const line = rawLine.trim();
  if (line === "" || line.startsWith("•") || line.startsWith("**")) return false;
  return (
    // JS/TS keywords & common API starts
    /^(import|export|const|let|var|function|return|if|else|for|while|switch|case|break|continue|class|async|await|try|catch|finally|throw|new|delete|typeof|do)\b/.test(line) ||
    /^(console|document|window|localStorage|JSON|Math|Object|Array|Promise|fetch)\./.test(line) ||
    /^use[A-Z]\w*\(/.test(line) ||
    // HTML/JSX tags, braces, brackets, parens, method chains, comments
    /^<\/?[a-zA-Z!]/.test(line) ||
    /^[{}()[\]]/.test(line) ||
    /^\.\w/.test(line) ||
    /^\/\//.test(line) ||
    /^<!--/.test(line) ||
    // SQL comments
    /^--/.test(line) ||
    // SQL keywords (case-insensitive)
    /^(SELECT|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER|WITH|FROM|WHERE|JOIN|GROUP BY|ORDER BY|LIMIT|db)\b/i.test(line) ||
    // CSS-ish: "selector {" or "prop: value;"
    /^[.#@]?[\w-]+\s*\{$/.test(line) ||
    /^[\w-]+\s*:\s*[^;]+;$/.test(line) ||
    // assignments / arrow functions
    /^[\w$.[\]]+\s*(=|=>|\+=|-=)\s/.test(line)
  );
}

/**
 * Renders lesson/task markdown-ish text into well-structured React elements.
 * Supports:
 *  - ```lang fenced code blocks``` → styled <CodeBlock> with copy button
 *  - Unfenced code lines (auto-detected) → <CodeBlock> too
 *  - Numbered lists (1. 2. 3.)     → <ol> steps
 *  - Bullet lists (• or - )        → <ul> bullets
 *  - **Heading** lines             → <h4>
 *  - Inline **bold** and `code`
 */
export function renderFormattedText(text) {
  if (!text) return null;

  const lines = text.split("\n");
  const blocks = [];
  let key = 0;

  let i = 0;
  while (i < lines.length) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    // ── Fenced code block ──
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing fence
      blocks.push(<CodeBlock key={key++} code={codeLines.join("\n")} lang={lang} />);
      continue;
    }

    // ── Blank line ──
    if (line === "") {
      i++;
      continue;
    }

    // ── Numbered list (collect consecutive) ──
    if (/^\d+[.)]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+[.)]\s+/.test(lines[i].trim())) {
        const itemText = lines[i].trim().replace(/^\d+[.)]\s+/, "");
        items.push(itemText);
        i++;
      }
      blocks.push(
        <ol key={key++} className="jsl-md-steps">
          {items.map((item, idx) => (
            <li key={idx} className="jsl-md-step">{renderInline(item, `s${key}-${idx}`)}</li>
          ))}
        </ol>
      );
      continue;
    }

    // ── Bullet list (collect consecutive) ──
    if (line.startsWith("•") || /^-\s+/.test(line)) {
      const items = [];
      while (i < lines.length && (lines[i].trim().startsWith("•") || /^-\s+/.test(lines[i].trim()))) {
        const itemText = lines[i].trim().replace(/^(•|-)\s*/, "");
        items.push(itemText);
        i++;
      }
      blocks.push(
        <ul key={key++} className="jsl-md-bullets">
          {items.map((item, idx) => (
            <li key={idx} className="jsl-bullet">{renderInline(item, `u${key}-${idx}`)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // ── Heading line (**Heading:** or **Heading**) ──
    const headingMatch = line.match(/^\*\*([^*]+)\*\*:?$/);
    if (headingMatch) {
      blocks.push(
        <h4 key={key++} className="jsl-concept-heading">
          {headingMatch[1]}
        </h4>
      );
      i++;
      continue;
    }

    // ── Auto-detected (unfenced) code block ──
    if (isCodeLine(rawLine)) {
      const codeLines = [];
      while (
        i < lines.length &&
        lines[i].trim() !== "" &&
        (isCodeLine(lines[i]) || /^\s{2,}/.test(lines[i]))
      ) {
        codeLines.push(lines[i]);
        i++;
      }
      blocks.push(<CodeBlock key={key++} code={codeLines.join("\n")} />);
      continue;
    }

    // ── Paragraph ──
    blocks.push(<p key={key++}>{renderInline(line, `p${key}`)}</p>);
    i++;
  }

  return blocks;
}
