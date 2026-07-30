// ─── JS Validator — Test Validation Logic ───

import { validateSyntax } from "./jsRunner.js";
import { runCodeInSandbox } from "../../shared/index.js";

function runSandboxPromise(code) {
  return new Promise((resolve) => {
    const logs = [];
    let error = null;
    
    runCodeInSandbox(
      code,
      (type, content) => {
        if (type === "error") {
          error = content;
        } else {
          logs.push(content);
        }
      },
      () => {
        resolve({ logs, error });
      }
    );
  });
}

/**
 * Runs a set of tests against the user's code.
 * @param {string} code - The user's code
 * @param {Array} tests - Array of test objects { name, validate }
 * @param {object} currentItem - Current lesson/bug/project item
 * @returns {Promise<Array>} test results
 */
function getFunctionName(code) {
  const match = code.match(/function\s+(\w+)\s*\(/);
  if (match) return match[1];
  const arrowMatch = code.match(/(?:const|let|var)\s+(\w+)\s*=\s*(?:\([^)]*\)|[^=]+)\s*=>/);
  if (arrowMatch) return arrowMatch[1];
  return null;
}

/**
 * Runs a set of tests against the user's code.
 * @param {string} code - The user's code
 * @param {Array} tests - Array of test objects { name, validate }
 * @param {object} currentItem - Current lesson/bug/project item
 * @returns {Promise<Array>} test results
 */
export async function runJsTests(code, tests, currentItem) {
  // First check syntax
  const syntaxCheck = validateSyntax(code);
  if (!syntaxCheck.valid) {
    return tests.map((test, i) => ({
      index: i,
      name: test.name,
      passed: false,
      status: "Syntax Error",
      error: `Fix syntax error first: ${syntaxCheck.error}`,
    }));
  }

  const hasExplicitTests = tests.length > 0 && tests.every(t => t.input !== undefined && t.expected !== undefined);

  let testGradesResult = null;
  let harness = "";
  if (hasExplicitTests) {
    const funcName = getFunctionName(code);
    if (!funcName) {
      return tests.map((t, i) => ({
        index: i,
        name: t.name,
        passed: false,
        status: "Syntax Error",
        error: "No function definition found in your code. Please declare a function.",
      }));
    }

    const serializedTests = JSON.stringify(tests.map(t => ({ name: t.name, input: t.input, expected: t.expected })));
    harness = `
;(() => {
  const tCases = ${serializedTests};
  const results = [];
  for (const t of tCases) {
    try {
      const func = typeof globalThis["${funcName}"] === "function" ? globalThis["${funcName}"] : typeof ${funcName} !== "undefined" ? ${funcName} : null;
      if (typeof func !== "function") {
        throw new Error("Function ${funcName} is not defined");
      }
      const output = func(...t.input);
      const passed = JSON.stringify(output) === JSON.stringify(t.expected);
      results.push({ name: t.name, passed, output, expected: t.expected });
    } catch (err) {
      results.push({ name: t.name, passed: false, error: err.message });
    }
  }
  console.log("__TEST_GRADES__:" + JSON.stringify(results));
})();
`;
  }

  // 1. Run user code in sandbox
  const userResult = await new Promise((resolve) => {
    const logs = [];
    let error = null;
    const finalCode = hasExplicitTests ? (code + "\n" + harness) : code;
    
    runCodeInSandbox(
      finalCode,
      (type, content) => {
        if (type === "error") {
          error = content;
        } else if (typeof content === "string" && content.startsWith("__TEST_GRADES__:")) {
          try {
            testGradesResult = JSON.parse(content.substring("__TEST_GRADES__:".length));
          } catch (e) { /* ignore */ }
        } else {
          logs.push(content);
        }
      },
      () => {
        resolve({ logs, error });
      }
    );
  });

  if (hasExplicitTests) {
    if (userResult.error) {
      const isTimeout = userResult.error.includes("Time Limit");
      return tests.map((t, i) => ({
        index: i,
        name: t.name,
        passed: false,
        status: isTimeout ? "Time Limit" : "Runtime Error",
        error: `${isTimeout ? "" : "Runtime Error: "}${userResult.error}`,
      }));
    }
    if (!testGradesResult) {
      return tests.map((t, i) => ({
        index: i,
        name: t.name,
        passed: false,
        status: "Runtime Error",
        error: "Execution failed to report test results.",
      }));
    }
    return tests.map((test, i) => {
      const match = testGradesResult.find(r => r.name === test.name) || { passed: false, error: "Test case not run" };
      let error = null;
      if (!match.passed) {
        error = match.error || `Expected: ${JSON.stringify(match.expected)}, Got: ${JSON.stringify(match.output)}`;
      }
      return {
        index: i,
        name: test.name,
        passed: match.passed,
        status: match.passed ? "Accepted" : (match.error ? "Runtime Error" : "Wrong Answer"),
        error,
      };
    });
  }

  // 2. Run solution code in sandbox if available (fallback compatibility)
  let expectedResult = null;
  if (currentItem && currentItem.solutionCode) {
    expectedResult = await runSandboxPromise(currentItem.solutionCode);
  }

  // Run each test
  const results = tests.map((test, i) => {
    if (userResult.error) {
      const isTimeout = userResult.error.includes("Time Limit");
      return {
        index: i,
        name: test.name,
        passed: false,
        status: isTimeout ? "Time Limit" : "Runtime Error",
        error: `${isTimeout ? "" : "Runtime Error: "}${userResult.error}`,
      };
    }

    let passed = false;
    let errorDetail = null;

    try {
      passed = test.validate(code);
    } catch (e) {
      errorDetail = e?.message || `Expected: ${test.name}`;
    }

    // Additional output verification to prevent commenting-out cheats
    if (passed && expectedResult) {
      const userLogsStr = userResult.logs.join("\n").trim().toLowerCase();
      const expectedLogsStr = expectedResult.logs.join("\n").trim().toLowerCase();
      
      if (expectedLogsStr && !userLogsStr) {
        passed = false;
        errorDetail = "No console output was produced. Your code must log output to the console.";
      }
    }

    return {
      index: i,
      name: test.name,
      passed,
      status: passed ? "Accepted" : "Wrong Answer",
      error: passed ? null : (errorDetail || `Expected: ${test.name}`),
    };
  });

  return results;
}

/**
 * Checks if all tests passed and calls the appropriate markDone callback.
 * @param {Array} results
 * @param {string} view
 * @param {object} currentLesson
 * @param {object} currentBug
 * @param {object} currentProject
 * @param {Function} onMarkLessonDone
 * @param {Function} onMarkBugDone
 * @param {Function} onMarkProjectDone
 */
export function handleTestResults(
  results,
  view,
  currentLesson,
  currentBug,
  currentProject,
  onMarkLessonDone,
  onMarkBugDone,
  onMarkProjectDone
) {
  const allPassed = results.length > 0 && results.every((r) => r.passed);
  if (allPassed) {
    if (view === "learn" && currentLesson) onMarkLessonDone(currentLesson.id);
    else if (view === "bugs" && currentBug) onMarkBugDone(currentBug.id);
    else if (view === "projects" && currentProject)
      onMarkProjectDone(currentProject.id);
  }
}

