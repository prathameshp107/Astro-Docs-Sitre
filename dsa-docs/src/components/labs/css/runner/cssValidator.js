import { verifyDomAndStyles } from "../../shared/domValidator.js";

/**
 * Runs a set of tests against the user's CSS/HTML code.
 * @param {string} code - The user's code
 * @param {Array} tests - Array of test objects { name, validate }
 * @param {Document|null} iframeDoc - Rendered iframe document
 * @returns {Array} Test results
 */
export function runCssTests(code, tests, iframeDoc) {
  return tests.map((test, i) => {
    try {
      let passed = test.validate(code);
      let errorDetail = null;

      if (passed && iframeDoc) {
        const domPassed = verifyDomAndStyles(code, test.name, iframeDoc);
        if (!domPassed) {
          passed = false;
          errorDetail = `Style verification failed. Please make sure the styles are correctly applied to the elements.`;
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
 * Supports 5 view types: learn, challenge, component, animation.
 */
export function handleTestResults(
  results,
  view,
  currentLesson,
  currentChallenge,
  currentComponent,
  currentAnimation,
  onMarkLessonDone,
  onMarkChallengeDone,
  onMarkComponentDone,
  onMarkAnimationDone
) {
  const allPassed = results.length > 0 && results.every((r) => r.passed);
  if (allPassed) {
    if (view === "learn" && currentLesson) onMarkLessonDone(currentLesson.id);
    else if (view === "challenge" && currentChallenge)
      onMarkChallengeDone(currentChallenge.id);
    else if (view === "component" && currentComponent)
      onMarkComponentDone(currentComponent.id);
    else if (view === "animation" && currentAnimation)
      onMarkAnimationDone(currentAnimation.id);
  }
}
