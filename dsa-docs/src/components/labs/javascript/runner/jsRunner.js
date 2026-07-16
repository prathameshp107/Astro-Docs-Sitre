// ─── JS Runner — Code Execution Logic ───

import { debounce } from "../../../../lib/utils/debounce.js";
import { runCodeInSandbox } from "../../shared/index.js";

/**
 * Creates a debounced code execution handler.
 * @param {Function} onLog - callback for log output (type, content)
 * @param {Function} onFinished - callback when execution completes
 * @returns {{ run: Function, terminate: Function, debouncedRun: Function }}
 */
export function createJsRunner(onLog, onFinished) {
  let terminateRef = null;

  const executeCode = (code) => {
    if (terminateRef) {
      terminateRef();
    }

    terminateRef = runCodeInSandbox(
      code,
      (type, content) => {
        onLog(type, content);
      },
      () => {
        terminateRef = null;
        onFinished();
      }
    );

    return () => {
      if (terminateRef) terminateRef();
    };
  };

  const debouncedExecute = debounce(executeCode, 300);

  return {
    run: executeCode,
    terminate: () => {
      if (terminateRef) {
        terminateRef();
        terminateRef = null;
      }
    },
    debouncedRun: debouncedExecute,
  };
}

/**
 * Validates code syntax using new Function.
 * @param {string} code
 * @returns {{ valid: boolean, error: string | null }}
 */
export function validateSyntax(code) {
  try {
    new Function(code);
    return { valid: true, error: null };
  } catch (e) {
    return { valid: false, error: e?.message || "Invalid JavaScript" };
  }
}
