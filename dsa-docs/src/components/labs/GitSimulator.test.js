import { describe, it, expect } from "vitest";
import { gitReducer, initialState } from "./GitLabsPlatform.jsx";

describe("gitReducer", () => {
  it("should initialize empty repository on INIT", () => {
    const state = gitReducer(initialState, { type: "INIT" });
    expect(state.gitInitDone).toBe(true);
    expect(state.commitOrder.length).toBe(1);
    expect(state.HEAD.name).toBe("main");
  });

  it("should create new branch on BRANCH", () => {
    let state = gitReducer(initialState, { type: "INIT" });
    const firstCommitSHA = state.commitOrder[0];
    state = gitReducer(state, { type: "BRANCH", name: "feature" });
    expect(state.branches.feature).toBe(firstCommitSHA);
  });

  it("should handle staging files and committing", () => {
    let state = gitReducer(initialState, { type: "INIT" });
    state = {
      ...state,
      stagedFiles: { "index.html": "hello world" },
    };
    state = gitReducer(state, { type: "COMMIT", message: "first real commit" });
    expect(state.commitOrder.length).toBe(2);
    const latestCommitSHA = state.commitOrder[1];
    expect(state.commits[latestCommitSHA].message).toBe("first real commit");
    expect(state.commits[latestCommitSHA].files["index.html"]).toBe("hello world");
    expect(state.stagedFiles).toEqual({});
  });
});
