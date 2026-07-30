// ─── JS Labs — Validator Helpers ───

export function testContains(pattern) {
  return (code) => code.includes(pattern);
}

export function testRegex(regex) {
  return (code) => regex.test(code);
}

export function stripLineComments(code) {
  return code
    .split("\n")
    .map((line) => line.replace(/\/\/.*$/, ""))
    .join("\n");
}

export function hasDeclaration(name, kind, valueRegex) {
  return (code) => {
    const source = stripLineComments(code);
    const declaration = new RegExp(`\\b${kind}\\s+${name}\\s*=\\s*${valueRegex.source}`, "m");
    return declaration.test(source);
  };
}
