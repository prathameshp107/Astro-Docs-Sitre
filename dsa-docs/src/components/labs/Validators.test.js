import { describe, it, expect, vi } from "vitest";
import { verifyDomAndStyles } from "./shared/domValidator.js";

// Mock the Web Worker sandbox to run synchronously in Node using eval
vi.mock("./shared/index.js", () => {
  return {
    runCodeInSandbox: (code, onMessage, onComplete) => {
      const originalConsoleLog = console.log;
      console.log = (msg) => {
        onMessage("log", msg);
      };
      
      try {
        eval(code);
      } catch (err) {
        onMessage("error", err.message);
      }
      
      console.log = originalConsoleLog;
      onComplete();
    }
  };
});

// Import after mock is registered
import { runJsTests } from "./javascript/runner/jsValidator.js";

describe("domValidator", () => {
  it("should return true if doc is null (fallback to source check)", () => {
    const result = verifyDomAndStyles("<h1>test</h1>", "Contains h1 element", null);
    expect(result).toBe(true);
  });

  it("should verify h1 tag presence when name is 'h1 element present'", () => {
    const docWithH1 = {
      querySelector: (selector) => (selector === "h1" ? {} : null),
      querySelectorAll: () => []
    };
    const docWithoutH1 = {
      querySelector: () => null,
      querySelectorAll: () => []
    };
    
    expect(verifyDomAndStyles("<h1>Hello</h1>", "h1 tag is present", docWithH1)).toBe(true);
    expect(verifyDomAndStyles("Hello", "h1 tag is present", docWithoutH1)).toBe(false);
  });

  it("should check computed styles for flexbox", () => {
    const docWithFlex = {
      querySelector: () => null,
      querySelectorAll: () => [
        { tagName: "DIV" }
      ]
    };

    // Mock window.getComputedStyle
    global.window = {
      getComputedStyle: () => ({
        display: "flex",
        color: "",
        backgroundColor: "transparent"
      })
    };

    const result = verifyDomAndStyles("", "use display: flex", docWithFlex);
    expect(result).toBe(true);

    // Clean up
    delete global.window;
  });
});

describe("runJsTests with explicit LeetCode-style test cases", () => {
  const explicitTests = [
    {
      name: "adds positive numbers",
      input: [2, 3],
      expected: 5
    },
    {
      name: "handles negative numbers",
      input: [-2, 5],
      expected: 3
    }
  ];

  it("should pass tests if the function works correctly", async () => {
    const studentCode = `
      function add(a, b) {
        return a + b;
      }
    `;

    const results = await runJsTests(studentCode, explicitTests, null);
    expect(results.length).toBe(2);
    expect(results[0].passed).toBe(true);
    expect(results[0].status).toBe("Accepted");
    expect(results[1].passed).toBe(true);
    expect(results[1].status).toBe("Accepted");
  });

  it("should fail tests if the function returns incorrect values", async () => {
    const studentCode = `
      function add(a, b) {
        return a * b; // bug
      }
    `;

    const results = await runJsTests(studentCode, explicitTests, null);
    expect(results.length).toBe(2);
    expect(results[0].passed).toBe(false); // 2 * 3 === 6 !== 5
    expect(results[0].status).toBe("Wrong Answer");
    expect(results[1].passed).toBe(false); // -2 * 5 === -10 !== 3
    expect(results[1].status).toBe("Wrong Answer");
    expect(results[0].error).toContain("Expected: 5, Got: 6");
  });

  it("should return error if no function is declared", async () => {
    const studentCode = `
      const x = 5;
    `;

    const results = await runJsTests(studentCode, explicitTests, null);
    expect(results.length).toBe(2);
    expect(results[0].passed).toBe(false);
    expect(results[0].status).toBe("Syntax Error");
    expect(results[0].error).toContain("No function definition found");
  });
});
