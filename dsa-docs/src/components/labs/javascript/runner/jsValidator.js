// ─── JS Validator — Test Validation Logic ───

import { validateSyntax } from "./jsRunner.js";

/**
 * Runs a set of tests against the user's code.
 * @param {string} code - The user's code
 * @param {Array} tests - Array of test objects { name, validate }
 * @param {Function} onMarkLessonDone - callback to mark lesson done
 * @param {Function} onMarkBugDone - callback to mark bug done
 * @param {Function} onMarkProjectDone - callback to mark project done
 * @param {string} view - current view ("learn", "bugs", "projects")
 * @param {object} currentLesson - current lesson object
 * @param {object} currentBug - current bug object
 * @param {object} currentProject - current project object
 * @returns {Array} test results
 */
export function runJsTests(code, tests) {
  // First check syntax
  const syntaxCheck = validateSyntax(code);
  if (!syntaxCheck.valid) {
    return tests.map((test, i) => ({
      index: i,
      name: test.name,
      passed: false,
      error: `Fix syntax error first: ${syntaxCheck.error}`,
    }));
  }

  // Run each test
  const results = tests.map((test, i) => {
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
