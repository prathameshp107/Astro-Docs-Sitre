import { useCallback, useState } from "react";
import Editor from "@monaco-editor/react";
import { FiPlay, FiRefreshCw } from "react-icons/fi";

function defineJudgeThemes(monaco) {
  monaco.editor.defineTheme("jdg-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "64748b", fontStyle: "italic" },
      { token: "keyword", foreground: "a78bfa" },
      { token: "string", foreground: "34d399" },
      { token: "number", foreground: "f59e0b" },
    ],
    colors: {
      "editor.background": "#0a0f1e",
      "editor.foreground": "#e2e8f0",
      "editor.lineHighlightBackground": "#0d1525",
      "editorCursor.foreground": "#6366f1",
    },
  });
  monaco.editor.defineTheme("jdg-light", {
    base: "vs",
    inherit: true,
    rules: [
      { token: "comment", foreground: "94a3b8", fontStyle: "italic" },
      { token: "keyword", foreground: "7c3aed" },
      { token: "string", foreground: "059669" },
      { token: "number", foreground: "d97706" },
    ],
    colors: {
      "editor.background": "#ffffff",
      "editor.foreground": "#1e293b",
    },
  });
}

export default function JudgeEditor({
  code,
  onChange,
  onRun,
  onSubmit,
  onReset,
  onLanguageChange,
  isRunning,
  isSubmitting,
  language = "javascript",
}) {
  const [theme, setTheme] = useState("jdg-dark");

  const handleMount = useCallback((editor, monaco) => {
    defineJudgeThemes(monaco);
    monaco.editor.setTheme(theme);
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => onRun());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const busy = isRunning || isSubmitting;
  const supportedLangs = [
    { id: "javascript", label: "JavaScript" },
    { id: "python", label: "Python" },
  ];

  const monacoLang = language === "python" ? "python" : "javascript";

  return (
    <div className="jdg-editor-panel">
      <div className="jdg-editor-toolbar">
        <button type="button" className="jdg-btn-run" onClick={onRun} disabled={busy} title="Ctrl+Enter">
          {isRunning ? <><span className="jdg-spinner" /> Running</> : <><FiPlay size={14} /> Run</>}
        </button>
        <button type="button" className="jdg-btn-submit" onClick={onSubmit} disabled={busy}>
          {isSubmitting ? "Submitting…" : "Submit"}
        </button>
        <button type="button" className="jdg-btn-secondary" onClick={onReset} disabled={busy}>
          <FiRefreshCw size={14} /> Reset
        </button>

        <span className="jdg-lang-separator" />

        {supportedLangs.map((lang) => (
          <button
            key={lang.id}
            type="button"
            className={`jdg-lang-btn ${language === lang.id ? "jdg-lang-active" : ""}`}
            onClick={() => onLanguageChange?.(lang.id)}
            disabled={busy}
          >
            {lang.label}
          </button>
        ))}

        <button
          type="button"
          className="jdg-btn-icon"
          style={{ marginLeft: "auto" }}
          onClick={() => setTheme((t) => (t === "jdg-dark" ? "jdg-light" : "jdg-dark"))}
          title="Toggle editor theme"
        >
          {theme === "jdg-dark" ? "☀" : "☾"}
        </button>
      </div>
      <div className="jdg-editor-wrapper">
        <Editor
          height="100%"
          language={monacoLang}
          theme={theme}
          value={code}
          onChange={(v) => onChange(v || "")}
          onMount={handleMount}
          options={{
            fontSize: 13,
            fontFamily: "var(--font-mono)",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            tabSize: language === "python" ? 4 : 2,
            insertSpaces: true,
            wordWrap: "on",
            automaticLayout: true,
            padding: { top: 12, bottom: 12 },
          }}
        />
      </div>
    </div>
  );
}
