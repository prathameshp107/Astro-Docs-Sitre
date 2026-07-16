// ─── JS Labs — Components Barrel ───

export { default as default } from "./JSLabsPlatform.jsx";
export { default as JSLessonView } from "./components/JSLessonView.jsx";
export { default as JSBugView } from "./components/JSBugView.jsx";
export { default as JSProjectView } from "./components/JSProjectView.jsx";
export { createJsRunner, validateSyntax } from "./runner/jsRunner.js";
export { runJsTests, handleTestResults } from "./runner/jsValidator.js";
export { JS_CONFETTI, STORAGE_KEY, XP_VALUES, XP_LABELS, PLAYGROUND_CODE } from "./config.js";
