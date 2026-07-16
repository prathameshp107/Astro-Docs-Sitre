// ─── React Validator — Test Validation Logic ───
// Includes React-specific syntax validation via transpilation check.

import { transpileReactCode } from "./reactRunner.js";

/**
 * Runs a set of tests against the user's React code.
 * First validates that the JSX transpiles correctly, then runs each test.
 * @param {string} code - The user's code
 * @param {Array} tests - Array of test objects { name, validate }
 * @returns {Array} Test results
 */
export function runReactTests(code, tests) {
  // First validate syntax via transpilation
  try {
    transpileReactCode(code);
  } catch (e) {
    // Return all tests as failed with syntax error
    return tests.map((test, i) => ({
      index: i,
      name: test.name,
      passed: false,
      error: `Fix syntax error first: ${e?.message || "Invalid JSX"}`,
    }));
  }

  // Run each test
  return tests.map((test, i) => {
    try {
      const passed = test.validate(code);
      return {
        index: i,
        name: test.name,
        passed,
        error: passed ? null : `Expected: ${test.name}`,
      };
    } catch (e) {
      return {
        index: i,
        name: test.name,
        passed: false,
        error: e?.message || `Expected: ${test.name}`,
      };
    }
  });
}

/**
 * Checks if all tests passed and calls the appropriate markDone callback.
 * Supports 3 view types: learn, bugs, projects.
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
