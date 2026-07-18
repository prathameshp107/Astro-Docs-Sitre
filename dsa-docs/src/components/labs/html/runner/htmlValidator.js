import { verifyDomAndStyles } from "../../shared/domValidator.js";

/**
 * Runs a set of tests against the user's HTML code.
 * @param {string} code - The user's HTML code
 * @param {Array} tests - Array of test objects { name, validate }
 * @param {Document|null} iframeDoc - Rendered iframe document
 * @returns {Array} Test results
 */
export function runHtmlTests(code, tests, iframeDoc) {
  return tests.map((test, i) => {
    try {
      let passed = test.validate(code);
      let errorDetail = null;

      if (passed && iframeDoc) {
        const domPassed = verifyDomAndStyles(code, test.name, iframeDoc);
        if (!domPassed) {
          passed = false;
          errorDetail = `DOM validation failed. Please check the structure and content of your rendered page.`;
        }
      }

      return {
        index: i,
        name: test.name,
        passed,
        error: passed ? null : (errorDetail || `Expected: ${test.name}`),
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
 * @param {Array} results
 * @param {string} view
 * @param {object|null} currentLesson
 * @param {object|null} currentChallenge
 * @param {object|null} currentProject
 * @param {Function} onMarkLessonDone
 * @param {Function} onMarkChallengeDone
 * @param {Function} onMarkProjectDone
 */
export function handleTestResults(
  results,
  view,
  currentLesson,
  currentChallenge,
  currentProject,
  onMarkLessonDone,
  onMarkChallengeDone,
  onMarkProjectDone
) {
  const allPassed = results.length > 0 && results.every((r) => r.passed);
  if (allPassed) {
    if (view === "learn" && currentLesson) onMarkLessonDone(currentLesson.id);
    else if (view === "challenge" && currentChallenge)
      onMarkChallengeDone(currentChallenge.id);
    else if (view === "project" && currentProject)
      onMarkProjectDone(currentProject.id);
  }
}
