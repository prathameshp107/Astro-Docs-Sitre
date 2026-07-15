import React from "react";

/**
 * Parses a basic markdown line into React elements, handling bold (**), inline code (`), and bullets (•).
 */
export function renderFormattedText(text) {
  if (!text) return null;
  
  return text.split("\n").map((line, i) => {
    let cleanLine = line.trim();
    if (cleanLine === "") return <br key={i} />;
    
    // Check if line is bullet list
    const isBullet = line.startsWith("•");
    if (isBullet) {
      cleanLine = line.slice(1).trim();
    }
    
    // Check if line is heading (starts and ends with **)
    const isHeading = cleanLine.startsWith("**") && cleanLine.endsWith("**");
    
    // Clean ** from start and end if it is a heading
    let content = cleanLine;
    if (isHeading) {
      content = cleanLine.slice(2, -2);
    }
    
    // Parse inline bold (**bold**) and inline code (`code`)
    const parts = [];
    let lastIndex = 0;
    const regex = /(\*\*[^*]+\*\*|`[^`]+`)/g;
    let match;
    
    while ((match = regex.exec(content)) !== null) {
      const matchIndex = match.index;
      // Add plain text before match
      if (matchIndex > lastIndex) {
        parts.push(content.substring(lastIndex, matchIndex));
      }
      
      const matchText = match[0];
      if (matchText.startsWith("**")) {
        parts.push(<strong key={matchIndex}>{matchText.slice(2, -2)}</strong>);
      } else if (matchText.startsWith("`")) {
        parts.push(<code key={matchIndex} className="jsl-inline-code">{matchText.slice(1, -1)}</code>);
      }
      lastIndex = regex.lastIndex;
    }
    
    if (lastIndex < content.length) {
      parts.push(content.substring(lastIndex));
    }

    if (isHeading) {
      return (
        <h4 key={i} className="jsl-concept-heading" style={{ margin: "1.2rem 0 0.4rem", color: "var(--lab-text-title)", fontWeight: 700, fontSize: "0.95rem" }}>
          {parts}
        </h4>
      );
    }
    
    if (isBullet) {
      return <li key={i} className="jsl-bullet">{parts}</li>;
    }
    
    return <p key={i}>{parts}</p>;
  });
}
