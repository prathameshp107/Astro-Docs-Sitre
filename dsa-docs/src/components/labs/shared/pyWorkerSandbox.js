// ─── Shared Python Sandbox Worker ───
// Runs Python code in a sandboxed Web Worker thread with execution timeout protection.
//
// Timeout model: Pyodide's first-run download + init from the CDN can take many
// seconds (≈10MB of WASM). That load time must NOT count against the user's code
// budget, or a cold start looks like an infinite loop. The worker posts a
// 'running' message right before executing user code; only then do we arm the
// short "infinite loop" timer. Loading gets its own generous timeout.

export function runPythonInSandbox(code, onLog, onFinished, timeoutMs = 8000, loadTimeoutMs = 45000) {
  const workerCode = `
    let pyodide = null;

    self.onmessage = async (e) => {
      const { code } = e.data;
      try {
        if (!pyodide) {
          importScripts("https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js");
          pyodide = await self.loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/",
          });
        }

        pyodide.runPython("globals().clear()");

        let stdoutBuffer = "";
        pyodide.setStdout({
          batched: (text) => {
            stdoutBuffer += text + "\\n";
            self.postMessage({ type: 'log', logType: 'log', content: text });
          }
        });

        pyodide.setStderr({
          batched: (text) => {
            self.postMessage({ type: 'log', logType: 'error', content: text });
          }
        });

        // Signal that Pyodide is ready and user code is about to execute — the
        // main thread starts the infinite-loop timer from here, not before.
        self.postMessage({ type: 'running' });

        await pyodide.runPythonAsync(code);

        // Capture final globals
        const globKeysVal = pyodide.runPython("list(globals().keys())");
        const keys = typeof globKeysVal?.toJs === "function" ? globKeysVal.toJs() : globKeysVal;
        const globals = {};
        for (const k of keys) {
          if (k.startsWith("__")) continue;
          const val = pyodide.globals.get(k);
          // Convert Pyodide proxy object to JS object if applicable
          globals[k] = (val && typeof val.toJs === "function") ? val.toJs() : val;
        }

        self.postMessage({ type: 'done', globals, stdout: stdoutBuffer });
      } catch (err) {
        self.postMessage({ type: 'error', content: err.message });
      }
    };
  `;

  const blob = new Blob([workerCode], { type: 'application/javascript' });
  const workerURL = URL.createObjectURL(blob);
  const worker = new Worker(workerURL);

  const cleanup = () => {
    worker.terminate();
    URL.revokeObjectURL(workerURL);
  };

  // Phase 1: loading Pyodide (may be slow / first-run download). Generous budget.
  let timer = setTimeout(() => {
    cleanup();
    const msg = 'Timed out loading the Python runtime. Check your connection and try again.';
    onLog('error', msg);
    onFinished({ error: msg, isTimeout: true, isLoadTimeout: true });
  }, loadTimeoutMs);

  worker.onmessage = (e) => {
    if (e.data.type === 'running') {
      // Phase 2: user code is now executing — switch to the short loop-guard timer.
      clearTimeout(timer);
      timer = setTimeout(() => {
        cleanup();
        onLog('error', 'Time Limit Exceeded (Possible Infinite Loop)');
        onFinished({ error: 'Time Limit Exceeded (Possible Infinite Loop)', isTimeout: true });
      }, timeoutMs);
    } else if (e.data.type === 'log') {
      onLog(e.data.logType, e.data.content);
    } else if (e.data.type === 'error') {
      clearTimeout(timer);
      cleanup();
      onFinished({ error: e.data.content });
    } else if (e.data.type === 'done') {
      clearTimeout(timer);
      cleanup();
      onFinished({ globals: e.data.globals, stdout: e.data.stdout });
    }
  };

  worker.onerror = (err) => {
    clearTimeout(timer);
    cleanup();
    onFinished({ error: err?.message || 'Worker error while running Python.' });
  };

  worker.postMessage({ code });

  return () => {
    clearTimeout(timer);
    cleanup();
  };
}
