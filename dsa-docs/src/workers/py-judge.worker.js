// Pyodide-based Python judge worker. Loads Pyodide on demand, runs user code
// in an isolated Python environment, and posts back per-test verdicts.
// The main thread owns TLE enforcement by racing against timeLimitMs.

let pyodideReady = null;
let pyodide = null;

async function getPyodide() {
  if (pyodide) return pyodide;
  if (pyodideReady) return pyodideReady;

  pyodideReady = (async () => {
    try {
      // Fetch the pyodide loader script text
      const response = await fetch("https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const text = await response.text();

      // Compute and verify SHA-384 hash via Web Crypto API
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      const hashBuffer = await crypto.subtle.digest("SHA-384", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashBase64 = btoa(hashArray.map(b => String.fromCharCode(b)).join(""));
      const expectedHash = "i3R37b3tF+HWudsUf1VSEOY2YxwSNMqY8DQa9Z0O3xh+NkJ9o+yjcGyIi5huj+nB";

      if (hashBase64 !== expectedHash) {
        throw new Error("Subresource integrity (SRI) validation failed for pyodide.js");
      }

      // Evaluate the verified loader code in the worker context
      (0, eval)(text);

      // loadPyodide is now defined globally on self
      pyodide = await self.loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/",
      });
      return pyodide;
    } catch (err) {
      self.postMessage({
        type: "done",
        runId: 0,
        verdict: "runtime_error",
        results: [],
        failedCase: null,
        error: { message: `Failed to load Pyodide: ${err.message}`, stack: err.stack || "" },
      });
      throw err;
    }
  })();

  return pyodideReady;
}

function compareOutputs(actual, expected, mode) {
  if (mode === "unordered") {
    const a = Array.isArray(actual) ? [...actual].sort() : actual;
    const b = Array.isArray(expected) ? [...expected].sort() : expected;
    return JSON.stringify(a) === JSON.stringify(b);
  }
  if (mode === "float") {
    if (typeof actual === "number" && typeof expected === "number") {
      return Math.abs(actual - expected) < 1e-6;
    }
    return JSON.stringify(actual) === JSON.stringify(expected);
  }
  if (mode === "anyValid") {
    if (typeof expected === "string") {
      // SECURITY WARNING: Running dynamic code from expected validator string.
      // Guard: Ensure validator string doesn't contain malicious patterns to prevent code injection
      // if test definitions are ever loaded from a remote/untrusted source.
      const blockedPatterns = [
        /postMessage/i, /onmessage/i, /self/i, /globalThis/i, /window/i,
        /eval/i, /Function/i, /importScripts/i, /Worker/i, /fetch/i,
        /XMLHttpRequest/i, /constructor/i, /prototype/i, /__proto__/i
      ];
      if (blockedPatterns.some(pattern => pattern.test(expected))) {
        return false;
      }

      try {
        // Create a function from the string and call it with the actual value
        // The expected string should be a function body that returns boolean
        const validatorFn = new Function("return " + expected)();
        if (typeof validatorFn === "function") {
          return validatorFn(actual);
        }
        return false;
      } catch (e) {
        // If we can't create the function or it throws, treat as invalid
        return false;
      }
    }
    return false;
  }
  return JSON.stringify(actual) === JSON.stringify(expected);
}

self.onmessage = async (event) => {
  const { runId, code, functionName, tests, compareMode } = event.data;

  // Load Pyodide if not already loaded
  let py;
  try {
    py = await getPyodide();
  } catch (_err) {
    // Error already posted by getPyodide
    return;
  }

  // Run the user's function definition
  try {
    py.runPython(code);
  } catch (err) {
    self.postMessage({
      type: "done",
      runId,
      verdict: "runtime_error",
      results: [],
      failedCase: null,
      error: { message: err.message, stack: err.message },
    });
    return;
  }

  // Check if function exists
  try {
    const exists = py.runPython(`callable(locals().get('${functionName}'))`);
    if (!exists) {
      self.postMessage({
        type: "done",
        runId,
        verdict: "runtime_error",
        results: [],
        failedCase: null,
        error: {
          message: `Function \`${functionName}\` is not defined.`,
          stack: "",
        },
      });
      return;
    }
  } catch (_err) {
    self.postMessage({
      type: "done",
      runId,
      verdict: "runtime_error",
      results: [],
      failedCase: null,
      error: {
        message: `Function \`${functionName}\` could not be checked.`,
        stack: "",
      },
    });
    return;
  }

  const results = [];

  for (let i = 0; i < tests.length; i++) {
    const test = tests[i];
    let status;
    let actual;
    let errMessage;
    const start = self.performance.now();

    try {
      // Convert args to a Python call
      const pyArgs = test.args
        .map((arg) => JSON.stringify(arg))
        .join(", ");
      const pyCode = `import json\n_result = ${functionName}(*[json.loads(a) for a in [${pyArgs}]])\njson.dumps(_result) if _result is not None else 'null'`;
      const resultStr = py.runPython(pyCode);
      actual = JSON.parse(resultStr);
      status = compareOutputs(actual, test.expected, compareMode) ? "pass" : "fail";
    } catch (err) {
      status = "error";
      errMessage = err && err.message ? err.message : String(err);
    }

    const runtimeMs = self.performance.now() - start;
    results.push({ index: i, hidden: !!test.hidden, status, runtimeMs });
    self.postMessage({ type: "progress", runId, index: i, status, runtimeMs });

    if (status === "error") {
      self.postMessage({
        type: "done",
        runId,
        verdict: "runtime_error",
        results,
        failedCase: { input: test.args, expected: test.expected, actual: null },
        error: { message: errMessage, stack: "" },
      });
      return;
    }

    if (status === "fail") {
      self.postMessage({
        type: "done",
        runId,
        verdict: "wrong_answer",
        results,
        failedCase: { input: test.args, expected: test.expected, actual },
        error: null,
      });
      return;
    }
  }

  self.postMessage({
    type: "done",
    runId,
    verdict: "accepted",
    results,
    failedCase: null,
    error: null,
  });
};
