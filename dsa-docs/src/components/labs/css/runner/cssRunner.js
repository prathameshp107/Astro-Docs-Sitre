// ─── CSS Runner — Preview / Execution Logic ───

/**
 * Generates a sandboxed iframe srcdoc from the user's CSS code.
 * @param {string} code - The user's full HTML+CSS code
 * @returns {string} The srcdoc content for the iframe
 */
export function generatePreview(code) {
  return code || "";
}
