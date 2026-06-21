import { useState, useRef, useEffect } from "react";
import Skeleton from "./Skeleton.jsx";


const starterCode = `// Welcome to the DSA Playground! 🚀
// Write any JavaScript code below and click Run.

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log("Fibonacci(10):", fibonacci(10));

// Try your own code!
const arr = [1, 2, 3, 4, 5];
const doubled = arr.map(x => x * 2);
console.log("Doubled:", doubled);

// Check if a string is a palindrome
function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}

console.log("'racecar' is palindrome?", isPalindrome("racecar"));
console.log("'hello' is palindrome?", isPalindrome("hello"));
`;

const snippets = [
  {
    title: "Fibonacci",
    code: `function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}\n\nconsole.log("fib(10):", fibonacci(10));\nconsole.log("fib(15):", fibonacci(15));`,
  },
  {
    title: "Two Sum",
    code: `function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}\n\nconsole.log("twoSum([2,7,11,15], 9):", twoSum([2,7,11,15], 9));\nconsole.log("twoSum([3,2,4], 6):", twoSum([3,2,4], 6));`,
  },
  {
    title: "Array Methods",
    code: `const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\n\nconst squares = numbers.map(n => n * n);\nconsole.log("Squares:", squares);\n\nconst evens = numbers.filter(n => n % 2 === 0);\nconsole.log("Evens:", evens);\n\nconst sum = numbers.reduce((acc, n) => acc + n, 0);\nconsole.log("Sum:", sum);\n\nconst result = numbers\n  .filter(n => n % 2 === 0)\n  .map(n => n * 10)\n  .reduce((a, b) => a + b, 0);\nconsole.log("Even numbers * 10 summed:", result);`,
  },
  {
    title: "Closures",
    code: `function createCounter() {\n  let count = 0;\n  return {\n    increment: () => ++count,\n    decrement: () => --count,\n    getCount: () => count,\n  };\n}\n\nconst counter = createCounter();\nconsole.log("Initial:", counter.getCount());\ncounter.increment();\ncounter.increment();\nconsole.log("After 2 increments:", counter.getCount());\ncounter.decrement();\nconsole.log("After 1 decrement:", counter.getCount());\n\nconst counter2 = createCounter();\ncounter2.increment();\nconsole.log("Counter2:", counter2.getCount());\nconsole.log("Counter1 still:", counter.getCount());`,
  },
  {
    title: "Promise & Async",
    code: `function delay(ms) {\n  return new Promise(resolve => setTimeout(resolve, ms));\n}\n\nasync function fetchUser(id) {\n  console.log("Fetching user", id, "...");\n  await delay(500);\n  return { id, name: \`User_\${id}\`, role: "developer" };\n}\n\nasync function main() {\n  console.time("fetch");\n  const user = await fetchUser(42);\n  console.log("User:", user);\n  \n  const [u1, u2] = await Promise.all([\n    fetchUser(1),\n    fetchUser(2),\n  ]);\n  console.log("Parallel results:", [u1, u2]);\n  console.timeEnd("fetch");\n}\n\nmain().catch(console.error);`,
  },
];

function stripScriptPrefix(code) {
  return code.replace(/^script\s*/i, "");
}

export default function ReactPlayground() {
  const [code, setCode] = useState(starterCode);
  const [output, setOutput] = useState([]);
  const [error, setError] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [activeSnippet, setActiveSnippet] = useState(null);
  const [loading, setLoading] = useState(true);
  const outputRef = useRef(null);
  const textareaRef = useRef(null);

  const base = import.meta.env.BASE_URL || "/";

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const runCode = () => {
    setIsRunning(true);
    setError(null);
    setOutput([]);

    const logs = [];
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    console.log = (...args) => {
      logs.push({
        type: "log",
        content: args
          .map((a) =>
            typeof a === "object" ? JSON.stringify(a, null, 2) : String(a)
          )
          .join(" "),
      });
      originalLog(...args);
    };

    console.error = (...args) => {
      logs.push({
        type: "error",
        content: args.map((a) => String(a)).join(" "),
      });
      originalError(...args);
    };

    console.warn = (...args) => {
      logs.push({
        type: "warn",
        content: args.map((a) => String(a)).join(" "),
      });
      originalWarn(...args);
    };

    try {
      const cleanCode = stripScriptPrefix(code);
      Function(cleanCode)();
      setOutput(logs);

      if (logs.length === 0) {
        setOutput([{ type: "info", content: "✓ Code executed successfully (no output)" }]);
      }
    } catch (e) {
      setError(e.message);
      setOutput([...logs, { type: "error", content: `✗ Error: ${e.message}` }]);
    } finally {
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
      setIsRunning(false);
    }
  };

  const loadSnippet = (snippet) => {
    setCode(snippet.code);
    setActiveSnippet(snippet.title);
    setOutput([]);
    setError(null);
  };

  const clearOutput = () => {
    setOutput([]);
    setError(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newCode = code.substring(0, start) + "  " + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  if (loading) {
    return (
      <div className="playground-page">
        <div className="playground-layout">
          <aside className="playground-sidebar">
            <div className="sidebar-title" style={{ marginBottom: '12px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              Code Snippets
            </div>
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} style={{ padding: '8px 10px', marginBottom: '4px' }}>
                <Skeleton variant="text" width={`${60 + Math.random() * 30}%`} height="12px" />
              </div>
            ))}
          </aside>
          <main className="playground-main">
            <div className="playground-header" style={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center', padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <Skeleton variant="text" width="140px" height="16px" />
              <Skeleton variant="badge" width="80px" height="32px" />
            </div>
            <div className="playground-editor-area" style={{ padding: '16px' }}>
              <div className="skeleton skeleton-text" style={{ width: '100%', height: '300px', borderRadius: '8px' }} />
            </div>
            <div className="playground-output" style={{ padding: '12px 16px' }}>
              <Skeleton variant="text" width="60px" height="14px" style={{ marginBottom: '12px' }} />
              <Skeleton variant="text" width="90%" height="10px" style={{ marginBottom: '6px' }} />
              <Skeleton variant="text" width="70%" height="10px" />
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="playground-page">
      <div className="playground-layout">
        {/* Sidebar - Snippets */}
        <aside className="playground-sidebar">
          <div className="sidebar-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
            Code Snippets
          </div>
          <div className="snippet-list">
            {snippets.map((s) => (
              <button
                key={s.title}
                className={`snippet-btn ${activeSnippet === s.title ? "active" : ""}`}
                onClick={() => loadSnippet(s)}
              >
                {s.title}
              </button>
            ))}
          </div>
        </aside>

        {/* Main Playground Area */}
        <main className="playground-main">
          <div className="playground-header">
            <div className="pg-header-left">
              <span className="pg-icon">▶</span>
              <span>JavaScript Playground</span>
            </div>
            <div className="pg-header-right">
              <button className="btn-icon" onClick={clearOutput} title="Clear output">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                </svg>
              </button>
              <button className="btn-run" onClick={runCode} disabled={isRunning}>
                {isRunning ? "Running..." : "▶ Run"}
              </button>
            </div>
          </div>

          <div className="playground-editor-area">
            <textarea
              ref={textareaRef}
              className="code-editor"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              wrap="off"
            />
          </div>

          <div className="playground-output" ref={outputRef}>
            <div className="output-header">
              <span>Output</span>
              {output.length > 0 && (
                <span className="output-count">{output.length} line{output.length > 1 ? "s" : ""}</span>
              )}
            </div>
            <div className="output-content">
              {output.length === 0 && !error && (
                <div className="output-placeholder">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.3">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  <p>Click <strong>Run</strong> to see output</p>
                </div>
              )}
              {output.map((line, i) => (
                <div key={i} className={`output-line output-${line.type}`}>
                  {line.type === "log" && <span className="line-marker">▸</span>}
                  {line.type === "warn" && <span className="line-marker warn">⚠</span>}
                  {line.type === "error" && <span className="line-marker err">✗</span>}
                  {line.type === "info" && <span className="line-marker info">ℹ</span>}
                  <pre>{line.content}</pre>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="playground-footer">
        <div className="footer-inner">
          <p>Built by <strong>Prathamesh Pawar</strong></p>
        </div>
      </footer>
    </div>
  );
}
