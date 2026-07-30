// ─── CSS Labs — Validator Helpers ───

export function testContains(pattern) {
  return (code) => code.includes(pattern);
}

export function testRegex(regex) {
  return (code) => regex.test(code);
}
