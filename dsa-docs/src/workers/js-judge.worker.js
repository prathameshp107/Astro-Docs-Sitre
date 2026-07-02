// Sandboxed JS judge worker. Runs in an isolated Web Worker — no DOM access.
// Receives { runId, code, functionName, tests, compareMode } and posts back
// per-test progress plus a final verdict. Fail-fast: stops at the first
// wrong-answer or runtime error, mirroring a real judge's first-failing-case UX.
// TLE is NOT detected in here — the main thread owns that by racing this
// worker against timeLimitMs and calling worker.terminate() on timeout.

self.fetch = undefined;
self.XMLHttpRequest = undefined;
self.importScripts = undefined;

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
  return JSON.stringify(actual) === JSON.stringify(expected);
}

self.onmessage = (event) => {
  const { runId, code, functionName, tests, compareMode } = event.data;

  let fn;
  try {
    const factory = new Function(
      `"use strict";\n${code}\n;return typeof ${functionName} === "function" ? ${functionName} : undefined;`
    );
    fn = factory();
  } catch (err) {
    self.postMessage({
      type: "done",
      runId,
      verdict: "runtime_error",
      results: [],
      failedCase: null,
      error: { message: err.message, stack: err.stack || "" },
    });
    return;
  }

  if (typeof fn !== "function") {
    self.postMessage({
      type: "done",
      runId,
      verdict: "runtime_error",
      results: [],
      failedCase: null,
      error: { message: `Function \`${functionName}\` is not defined.`, stack: "" },
    });
    return;
  }

  const results = [];

  for (let i = 0; i < tests.length; i++) {
    const test = tests[i];
    let actual;
    let status;
    let errMessage;
    let errStack;
    const start = self.performance.now();

    try {
      actual = fn(...test.args);
      status = compareOutputs(actual, test.expected, compareMode) ? "pass" : "fail";
    } catch (err) {
      status = "error";
      errMessage = err && err.message ? err.message : String(err);
      errStack = err && err.stack ? err.stack : "";
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
        error: { message: errMessage, stack: errStack },
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
