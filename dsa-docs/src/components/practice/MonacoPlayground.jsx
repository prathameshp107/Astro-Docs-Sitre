import { useState, useRef, useCallback } from "react";
import Editor from "@monaco-editor/react";

const DEFAULT_CODE = `// JavaScript Playground 🚀
// Write code here and click Run

function greet(name) {
  return \`Hello, \${name}! 👋\`;
}

console.log(greet("Developer"));
console.log("1 + 1 =", 1 + 1);

// Try array methods
const nums = [1, 2, 3, 4, 5];
console.log("Doubled:", nums.map(x => x * 2));
console.log("Sum:", nums.reduce((a, b) => a + b, 0));
`;

export default function MonacoPlayground({ initialCode = "" }) {
  const [code, setCode] = useState(initialCode || DEFAULT_CODE);
  const [output, setOutput] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [monacoTheme, setMonacoTheme] = useState("vs-dark");
  const outputRef = useRef(null);
  const editorRef = useRef(null);

  const handleEditorMount = useCallback((editor, monaco) => {
    editorRef.current = editor;
    editor.focus();

    // Register the default JS snippets
    monaco.languages.registerCompletionItemProvider("javascript", {
      provideCompletionItems: () => ({
        suggestions: [
          {
            label: "clog",
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: "console.log($1);",
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "Console log",
          },
          {
            label: "clg",
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: "console.log($1);",
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "Console log",
          },
          {
            label: "fn",
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: "function ${1:name}(${2:params}) {\n  $3\n}",
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "Function declaration",
          },
          {
            label: "afn",
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: "const ${1:name} = (${2:params}) => {\n  $3\n};",
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "Arrow function",
          },
          {
            label: "for",
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: "for (let ${1:i} = 0; $1 < ${2:10}; $1++) {\n  $3\n}",
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "For loop",
          },
          {
            label: "settimeout",
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: "setTimeout(() => {\n  $1\n}, ${2:1000});",
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "setTimeout",
          },
        ],
      }),
    });
  }, []);

  const runCode = useCallback(() => {
    setIsRunning(true);
    setOutput([]);
    const logs = [];
    const origLog = console.log, origErr = console.error, origWarn = console.warn;

    console.log = (...args) => {
      const text = args.map(a => typeof a === "object" ? JSON.stringify(a, null, 2) : String(a)).join(" ");
      logs.push({ type: "log", content: text });
      origLog(...args);
    };
    console.error = (...args) => {
      const text = args.map(a => String(a)).join(" ");
      logs.push({ type: "error", content: text });
      origErr(...args);
    };
    console.warn = (...args) => {
      const text = args.map(a => String(a)).join(" ");
      logs.push({ type: "warn", content: text });
      origWarn(...args);
    };

    try {
      const result = Function(code)();
      if (result !== undefined && logs.length === 0) logs.push({ type: "result", content: String(result) });
      if (logs.length === 0) logs.push({ type: "info", content: "✓ Code executed (no output)" });
      setOutput(logs);
    } catch (e) {
      logs.push({ type: "error", content: `✗ ${e.message}` });
      setOutput(logs);
    } finally {
      console.log = origLog; console.error = origErr; console.warn = origWarn;
      setIsRunning(false);
      setTimeout(() => outputRef.current?.scrollTo(0, outputRef.current.scrollHeight), 50);
    }
  }, [code]);

  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(code);
  }, [code]);

  const resetCode = useCallback(() => {
    setCode(initialCode || DEFAULT_CODE);
    setOutput([]);
  }, [initialCode]);

  const formatCode = useCallback(() => {
    const editor = editorRef.current;
    if (editor) {
      editor.getAction("editor.action.formatDocument")?.run();
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setMonacoTheme(prev => prev === "vs-dark" ? "light" : "vs-dark");
  }, []);

  const getMonacoValue = useCallback((value) => {
    setCode(value || "");
  }, []);

  return (
    <div className="prac-playground">
      <div className="prac-playground-header">
        <div className="prac-playground-tabs">
          <button className="prac-tab active">JavaScript</button>
        </div>
        <div className="prac-playground-actions">
          <button className="prac-btn-icon" onClick={formatCode} title="Format code">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="9" x2="20" y2="9" />
              <line x1="4" y1="15" x2="16" y2="15" />
              <line x1="4" y1="12" x2="18" y2="12" />
            </svg>
          </button>
          <button className="prac-btn-icon" onClick={copyCode} title="Copy code">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
          </button>
          <button className="prac-btn-icon" onClick={resetCode} title="Reset">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
          </button>
          <button className="prac-btn-icon" onClick={toggleTheme} title="Toggle theme">
            {monacoTheme === "vs-dark" ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
            )}
          </button>
          <button className="prac-btn-run" onClick={runCode} disabled={isRunning}>
            {isRunning ? (
              <><span className="prac-spinner" /> Running</>
            ) : (
              <><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg> Run</>
            )}
          </button>
        </div>
      </div>

      <div className="prac-split">
        <div className="prac-editor-pane">
          <Editor
            height="100%"
            language="javascript"
            theme={monacoTheme}
            value={code}
            onChange={getMonacoValue}
            onMount={handleEditorMount}
            options={{
              fontSize: 14,
              fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
              fontLigatures: true,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              lineNumbers: "on",
              renderLineHighlight: "line",
              tabSize: 2,
              insertSpaces: true,
              wordWrap: "on",
              automaticLayout: true,
              bracketPairColorization: { enabled: true },
              padding: { top: 16, bottom: 16 },
              suggestOnTriggerCharacters: true,
              quickSuggestions: true,
              formatOnPaste: true,
              cursorBlinking: "smooth",
              cursorSmoothCaretAnimation: "on",
              smoothScrolling: true,
              folding: true,
              foldingHighlight: true,
              lineDecorationsWidth: 8,
              lineNumbersMinChars: 3,
            }}
          />
        </div>
        <div className="prac-output-pane" ref={outputRef}>
          <div className="prac-output-header">
            <span>Console Output</span>
            {output.length > 0 && <span className="prac-output-count">{output.length} lines</span>}
          </div>
          <div className="prac-output-body">
            {output.length === 0 ? (
              <div className="prac-output-empty">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                <p>Click <strong>Run</strong> to see output</p>
              </div>
            ) : (
              output.map((line, i) => (
                <div key={i} className={`prac-out-line prac-out-${line.type}`}>
                  <span className="prac-out-marker">
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
        </div>
      </div>
    </div>
  );
}
