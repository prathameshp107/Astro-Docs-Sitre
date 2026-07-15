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

function formatLogArg(a) {
  try {
    return typeof a === "object" && a !== null ? JSON.stringify(a, null, 2) : String(a);
  } catch {
    return String(a);
  }
}

self.onmessage = (event) => {
  const { runId, code, functionName, tests, compareMode } = event.data;

  // Forward the user's console.log/warn/error calls back to the main thread
  // in real time, so print-debugging inside their solution is visible while
  // the sample tests run — not just the pass/fail verdict.
  const sendLog = (logType, args) => {
    self.postMessage({ type: "log", runId, logType, content: args.map(formatLogArg).join(" ") });
  };
  console.log = (...args) => sendLog("log", args);
  console.warn = (...args) => sendLog("warn", args);
  console.error = (...args) => sendLog("error", args);

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
