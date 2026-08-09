/**
 * analytics.js — reusable GA4 event tracking foundation.
 * ────────────────────────────────────────────────────────────────
 * `trackEvent` is a thin, safe wrapper around gtag: it no-ops when GA
 * hasn't loaded (missing measurement ID, ad blocker, SSR) instead of
 * throwing. Never pass PII (emails, usernames, tokens) as params.
 *
 * The named helpers below are the agreed set of future events; none
 * are wired up to UI yet — call them from components as those features
 * get instrumented.
 */

export function trackEvent(name, params = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}

export function trackSearchPerformed(query) {
  trackEvent('search_performed', { search_term: query });
}

export function trackInterviewQuestionOpened(topic, questionId) {
  trackEvent('interview_question_opened', { topic, question_id: questionId });
}

export function trackDsaProblemOpened(problemId, difficulty) {
  trackEvent('dsa_problem_opened', { problem_id: problemId, difficulty });
}

export function trackCodeCopied(context) {
  trackEvent('code_copied', { context });
}

export function trackPlaygroundUsed(language) {
  trackEvent('playground_used', { language });
}

export function trackQuizStarted(category) {
  trackEvent('quiz_started', { category });
}

export function trackQuizCompleted(category, score, total) {
  trackEvent('quiz_completed', { category, score, total });
}

export function trackExternalLinkClicked(url) {
  trackEvent('external_link_clicked', { link_url: url });
}
