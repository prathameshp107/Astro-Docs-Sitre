// Sandboxed execution of the DSA Playground's legacy validate() test suite —
// this is the "source of truth" for Accepted/solved on Submit. It used to run
// via `new Function(code)` directly on the main thread with no timeout, so a
// submitted infinite loop would freeze the whole tab. Running it here means
// the main thread stays responsive and can hard-kill this worker on timeout,
// same TLE pattern as js-judge.worker.js.
self.fetch = undefined;
self.XMLHttpRequest = undefined;
self.importScripts = undefined;

import { getProblemById } from "../data/dsa-problems.js";

function formatLogArg(a) {
  try {
    return typeof a === "object" && a !== null ? JSON.stringify(a, null, 2) : String(a);
  } catch {
    return String(a);
  }
}

self.onmessage = (event) => {
  const { runId, problemId, code } = event.data;

  const sendLog = (logType, args) => {
    self.postMessage({ type: "log", runId, logType, content: args.map(formatLogArg).join(" ") });
  };
  console.log = (...args) => sendLog("log", args);
  console.warn = (...args) => sendLog("warn", args);
  console.error = (...args) => sendLog("error", args);

  const problem = getProblemById(problemId);
  if (!problem) {
    self.postMessage({
      type: "done",
      runId,
      results: [],
      allPassed: false,
      syntaxError: `Unknown problem "${problemId}"`,
    });
    return;
  }

  try {
    new Function(code);
  } catch (e) {
    self.postMessage({
      type: "done",
      runId,
      results: problem.tests.map((test, i) => ({
        index: i,
        name: test.name,
        passed: false,
        error: `Syntax error: ${e.message}`,
      })),
      allPassed: false,
      syntaxError: e.message,
    });
    return;
  }

  const results = problem.tests.map((test, i) => {
    try {
      const start = self.performance.now();
      const passed = test.validate(code);
      const time = (self.performance.now() - start).toFixed(2);
      return { index: i, name: test.name, passed, error: passed ? null : "Test failed", time };
    } catch (e) {
      return { index: i, name: test.name, passed: false, error: e?.message || "Test failed" };
    }
  });

  self.postMessage({
    type: "done",
    runId,
    results,
    allPassed: results.length > 0 && results.every((r) => r.passed),
    syntaxError: null,
  });
};
