import { FiBook, FiCheck } from "react-icons/fi";
import { useState, useEffect, useMemo, useCallback, useRef, useReducer } from "react";
import { SkeletonLabPlatform } from "../Skeleton.jsx";
import { DiGitBranch } from "react-icons/di";


import {
  GIT_LESSONS,
  GIT_BOSS_CHALLENGES,
  MERGE_CONFLICTS,
  TEAM_SCENARIOS,
  GIT_INTERVIEW_TOPICS,
} from "../../data/git-labs-curriculum.js";
import {
  LabResizableHandle,
  LabFooter,
  LabTopbar,
  useKeyboardShortcut,
} from "./shared/index.js";

// ═══════════════════════════════════════════════════
// GIT STATE MACHINE
// ═══════════════════════════════════════════════════

const SHA_CHARS = "abcdef0123456789";

function randomSHA() {
  let sha = "";
  for (let i = 0; i < 7; i++) sha += SHA_CHARS[Math.floor(Math.random() * SHA_CHARS.length)];
  return sha;
}

const BRANCH_COLORS = [
  "#f59e0b", "#22c55e", "#60a5fa", "#a78bfa",
  "#ec4899", "#ef4444", "#14b8a6", "#f97316",
  "#6366f1", "#84cc16",
];

function getBranchColor(index) {
  return BRANCH_COLORS[index % BRANCH_COLORS.length];
}

const NODE_RADIUS = 8;

const initialState = {
  commits: {},
  commitOrder: [],
  branches: { main: null },
  HEAD: { type: "branch", name: "main" },
  stagedFiles: {},
  workingFiles: {},
  files: {},
  reflog: [],
  stash: [],
  hasOrigin: false,
  remoteCommits: {},
  remoteBranches: {},
  gitInitDone: false,
};

function gitReducer(state, action) {
  switch (action.type) {
    case "INIT": {
      const firstSHA = randomSHA();
      return {
        ...state,
        commits: {
          [firstSHA]: {
            id: firstSHA,
            message: "Initial commit",
            parent: null,
            timestamp: Date.now(),
            branch: "main",
            files: {},
          },
        },
        commitOrder: [firstSHA],
        branches: { main: firstSHA },
        HEAD: { type: "branch", name: "main" },
        gitInitDone: true,
        reflog: ["HEAD@{0}: init: Initialized empty Git repository"],
      };
    }

    case "COMMIT": {
      const currentCommit = state.HEAD.type === "branch"
        ? state.branches[state.HEAD.name]
        : state.HEAD.ref;
      if (!currentCommit && state.gitInitDone) {
        // First commit on branch after init
        const sha = randomSHA();
        const branch = state.HEAD.name;
        const files = { ...state.files, ...state.stagedFiles };
        return {
          ...state,
          commits: {
            ...state.commits,
            [sha]: { id: sha, message: action.message, parent: null, timestamp: Date.now(), branch, files, stagedFiles: { ...state.stagedFiles } },
          },
          commitOrder: [...state.commitOrder, sha],
          branches: { ...state.branches, [branch]: sha },
          stagedFiles: {},
          files,
          reflog: [`HEAD@{0}: commit: ${action.message}`, ...state.reflog],
        };
      }
      if (!currentCommit) return state;
      const sha = randomSHA();
      const branch = state.HEAD.type === "branch" ? state.HEAD.name : null;
      const parentCommit = state.commits[currentCommit];
      const branchFiles = { ...(parentCommit?.files || {}), ...state.stagedFiles };
      const newCommit = {
        id: sha,
        message: action.message,
        parent: currentCommit,
        parent2: action.parent2 || null,
        timestamp: Date.now(),
        branch: branch || "HEAD",
        files: branchFiles,
        stagedFiles: { ...state.stagedFiles },
      };
      const newCommits = { ...state.commits, [sha]: newCommit };
      const newOrder = [...state.commitOrder, sha];
      const newBranches = { ...state.branches };
      if (branch) newBranches[branch] = sha;
      const newFiles = { ...state.files, ...state.stagedFiles };
      return {
        ...state,
        commits: newCommits,
        commitOrder: newOrder,
        branches: newBranches,
        stagedFiles: {},
        files: newFiles,
        reflog: [`HEAD@{0}: commit: ${action.message}`, ...state.reflog],
      };
    }

    case "BRANCH": {
      const targetCommit = action.commit || (
        state.HEAD.type === "branch" ? state.branches[state.HEAD.name] : state.HEAD.ref
      );
      if (!targetCommit || state.branches[action.name]) return state;
      return {
        ...state,
        branches: { ...state.branches, [action.name]: targetCommit },
        reflog: [`HEAD@{0}: branch: Created branch ${action.name}`, ...state.reflog],
      };
    }

    case "CHECKOUT": {
      const branchName = action.name;
      if (branchName === "-") {
        const prevBranch = state.HEAD.type === "branch" ? state.HEAD.name : null;
        if (!prevBranch) return state;
        return { ...state, HEAD: { type: "branch", name: prevBranch }, reflog: [`HEAD@{0}: checkout: moving to ${prevBranch}`, ...state.reflog] };
      }
      if (state.branches[branchName] !== undefined) {
        return { ...state, HEAD: { type: "branch", name: branchName }, reflog: [`HEAD@{0}: checkout: moving to ${branchName}`, ...state.reflog] };
      }
      if (state.commits[branchName]) {
        return { ...state, HEAD: { type: "detached", ref: branchName }, reflog: [`HEAD@{0}: checkout: moving to ${branchName.substring(0, 7)}`, ...state.reflog] };
      }
      return state;
    }

    case "CHECKOUT_B": {
      const { branch: newBranch, startPoint } = action;
      if (state.branches[newBranch]) return state;
      const start = startPoint || (
        state.HEAD.type === "branch" ? state.branches[state.HEAD.name] : state.HEAD.ref
      );
      return {
        ...state,
        branches: { ...state.branches, [newBranch]: start },
        HEAD: { type: "branch", name: newBranch },
        reflog: [`HEAD@{0}: checkout: moving to ${newBranch}`, ...state.reflog],
      };
    }

    case "MERGE": {
      const targetBranch = action.branch;
      const targetCommit = state.branches[targetBranch];
      const currentBranch = state.HEAD.type === "branch" ? state.HEAD.name : null;
      const currentCommit = currentBranch ? state.branches[currentBranch] : state.HEAD.ref;
      if (!targetCommit || !currentCommit || !currentBranch) return { ...state, mergeError: `Merge failed: branch '${targetBranch}' not found` };

      // Check if fast-forward possible
      const isAncestor = (ancestor, desc) => {
        let cur = state.commits[desc];
        while (cur) {
          if (cur.id === ancestor) return true;
          if (cur.parent) cur = state.commits[cur.parent];
          else break;
        }
        return false;
      };

      if (isAncestor(targetCommit, currentCommit)) {
        return { ...state, mergeError: "Already up to date.", mergeResult: null };
      }

      if (isAncestor(currentCommit, targetCommit)) {
        // Fast forward
        const newBranches = { ...state.branches, [currentBranch]: targetCommit };
        return {
          ...state,
          branches: newBranches,
          HEAD: { type: "branch", name: currentBranch },
          mergeResult: `Fast-forward merge. ${currentBranch} moved to ${targetBranch}.`,
          mergeError: null,
          reflog: [`HEAD@{0}: merge ${targetBranch}: Fast-forward`, ...state.reflog],
        };
      }

      // 3-way merge: create merge commit
      const mergeSHA = randomSHA();
      const mergeCommit = {
        id: mergeSHA,
        message: `Merge branch '${targetBranch}' into ${currentBranch}`,
        parent: currentCommit,
        parent2: targetCommit,
        timestamp: Date.now(),
        branch: currentBranch,
        files: { ...(state.commits[currentCommit]?.files || {}) },
        stagedFiles: {},
        isMerge: true,
      };
      const newBranches = { ...state.branches, [currentBranch]: mergeSHA };
      return {
        ...state,
        commits: { ...state.commits, [mergeSHA]: mergeCommit },
        commitOrder: [...state.commitOrder, mergeSHA],
        branches: newBranches,
        mergeResult: `Merged branch '${targetBranch}' into ${currentBranch}.`,
        mergeError: null,
        reflog: [`HEAD@{0}: merge ${targetBranch}: Merge made`, ...state.reflog],
      };
    }

    case "REBASE": {
      const targetBranch = action.branch;
      const targetCommit = state.branches[targetBranch];
      const currentBranch = state.HEAD.type === "branch" ? state.HEAD.name : null;
      const currentCommit = currentBranch ? state.branches[currentBranch] : null;
      if (!targetCommit || !currentCommit || !currentBranch) return { ...state, mergeError: "Rebase failed" };

      const newSHA = randomSHA();
      const newBranches = { ...state.branches, [currentBranch]: newSHA };
      return {
        ...state,
        commits: {
          ...state.commits,
          [newSHA]: { id: newSHA, message: `${currentBranch} (rebased)`, parent: targetCommit, timestamp: Date.now(), branch: currentBranch, files: {} },
        },
        commitOrder: [...state.commitOrder, newSHA],
        branches: newBranches,
        mergeResult: `Successfully rebased ${currentBranch} onto ${targetBranch}.`,
        mergeError: null,
        reflog: [`HEAD@{0}: rebase ${targetBranch}: Rebase applied`, ...state.reflog],
      };
    }

    case "CHERRY_PICK": {
      const pickSHA = action.commit;
      const pickCommit = state.commits[pickSHA];
      const currentBranch = state.HEAD.type === "branch" ? state.HEAD.name : null;
      const currentCommit = currentBranch ? state.branches[currentBranch] : null;
      if (!pickCommit || !currentCommit || !currentBranch) return state;

      const newSHA = randomSHA();
      return {
        ...state,
        commits: {
          ...state.commits,
          [newSHA]: { id: newSHA, message: `${pickCommit.message} (cherry-picked)`, parent: currentCommit, timestamp: Date.now(), branch: currentBranch, files: { ...pickCommit.files } },
        },
        commitOrder: [...state.commitOrder, newSHA],
        branches: { ...state.branches, [currentBranch]: newSHA },
        reflog: [`HEAD@{0}: cherry-pick ${pickSHA.substring(0, 7)}: Applied`, ...state.reflog],
      };
    }

    case "RESET": {
      const target = action.target;
      const mode = action.mode || "mixed";
      const currentBranch = state.HEAD.type === "branch" ? state.HEAD.name : null;

      if (target === "HEAD" || target === "HEAD~1") {
        // Find parent of current HEAD
        const current = currentBranch ? state.branches[currentBranch] : state.HEAD.ref;
        const commit = state.commits[current];
        if (!commit || !commit.parent) return state;
        const newBranches = currentBranch ? { ...state.branches, [currentBranch]: commit.parent } : state.branches;
        const msg = mode === "soft" ? "Soft reset" : mode === "hard" ? "Hard reset" : "Mixed reset";
        return { ...state, branches: newBranches, mergeResult: `${msg} to ${commit.parent.substring(0, 7)}`, mergeError: null, reflog: [`HEAD@{0}: reset: ${msg}`, ...state.reflog] };
      }

      if (state.commits[target]) {
        const newBranches = currentBranch ? { ...state.branches, [currentBranch]: target } : state.branches;
        return { ...state, branches: newBranches, mergeResult: `Reset to ${target.substring(0, 7)}`, mergeError: null, reflog: [`HEAD@{0}: reset: moving to ${target.substring(0, 7)}`, ...state.reflog] };
      }
      return state;
    }

    case "TAG":
      return { ...state, reflog: [`HEAD@{0}: tag: Created tag '${action.name}'`, ...state.reflog] };

    case "STASH": {
      const currentBranch = state.HEAD.type === "branch" ? state.HEAD.name : "HEAD";
      const stashEntry = {
        id: randomSHA(),
        message: action.message || `WIP on ${currentBranch}`,
        stagedFiles: { ...state.stagedFiles },
        files: { ...state.files },
        timestamp: Date.now(),
      };
      return {
        ...state,
        stash: [stashEntry, ...state.stash],
        stagedFiles: {},
        files: {},
        reflog: [`HEAD@{0}: stash: ${stashEntry.message}`, ...state.reflog],
      };
    }

    case "STASH_POP": {
      if (state.stash.length === 0) return { ...state, mergeError: "No stash found." };
      const [top, ...rest] = state.stash;
      return {
        ...state,
        stash: rest,
        files: { ...state.files, ...top.files },
        reflog: [`HEAD@{0}: stash pop: Restored ${top.message}`, ...state.reflog],
      };
    }

    case "REVERT": {
      const target = action.commit || (state.HEAD.type === "branch" ? state.branches[state.HEAD.name] : state.HEAD.ref);
      const targetCommit = state.commits[target];
      if (!targetCommit) return state;
      const currentBranch = state.HEAD.type === "branch" ? state.HEAD.name : null;
      const currentCommit = currentBranch ? state.branches[currentBranch] : state.HEAD.ref;
      if (!currentCommit) return state;

      const revSHA = randomSHA();
      return {
        ...state,
        commits: {
          ...state.commits,
          [revSHA]: { id: revSHA, message: `Revert "${targetCommit.message}"`, parent: currentCommit, timestamp: Date.now(), branch: currentBranch || "HEAD", files: {} },
        },
        commitOrder: [...state.commitOrder, revSHA],
        branches: currentBranch ? { ...state.branches, [currentBranch]: revSHA } : state.branches,
        mergeResult: `Reverted commit ${target.substring(0, 7)}.`,
        mergeError: null,
        reflog: [`HEAD@{0}: revert: Reverted ${target.substring(0, 7)}`, ...state.reflog],
      };
    }

    case "PUSH":
      return {
        ...state,
        hasOrigin: true,
        remoteCommits: { ...state.commits },
        remoteBranches: { ...state.branches },
        mergeResult: "Pushed to origin.",
        mergeError: null,
      };

    case "FETCH":
      return { ...state, mergeResult: "Fetched from origin.", mergeError: null };

    case "CLONE":
      return { ...state, gitInitDone: true, hasOrigin: true, reflog: ["HEAD@{0}: clone: Cloned repository"] };

    case "SETUP_INITIAL": {
      // Create initial commits for the lesson
      const commits = {};
      const order = [];
      const branches = { main: null };
      let prev = null;
      action.commits?.forEach((c, i) => {
        const sha = randomSHA();
        commits[sha] = { id: sha, message: c.message, parent: prev, branch: "main", timestamp: Date.now() - (action.commits.length - i) * 1000, files: c.files || {} };
        order.push(sha);
        prev = sha;
      });
      if (prev) branches.main = prev;
      const branchMap = { ...branches };
      if (action.branches) {
        Object.keys(action.branches).forEach((b) => {
          if (b !== "main") {
            const existingCommits = Object.keys(commits);
            branchMap[b] = commits[existingCommits[existingCommits.length - 1]]?.id || null;
          }
        });
      }
      const headBranch = action.HEAD?.name || "main";
      return {
        ...state,
        commits,
        commitOrder: order,
        branches: branchMap,
        HEAD: { type: "branch", name: headBranch },
        gitInitDone: true,
        files: {},
        stagedFiles: {},
        reflog: ["HEAD@{0}: setup: Initial repository state"],
      };
    }

    case "SET_MERGE_ERROR":
      return { ...state, mergeError: action.message, mergeResult: null };

    case "CLEAR_MESSAGES":
      return { ...state, mergeError: null, mergeResult: null };

    default:
      return state;
  }
}

// ═══════════════════════════════════════════════════
// GIT COMMAND PARSER
// ═══════════════════════════════════════════════════

function parseGitCommand(cmd, state, dispatch) {
  const trimmed = cmd.trim();
  if (!trimmed.startsWith("git ")) return { type: "error", msg: "Command must start with 'git'" };

  const args = trimmed.slice(4).trim().split(/\s+/);
  const subcmd = args[0];

  switch (subcmd) {
    case "init":
      dispatch({ type: "INIT" });
      return { type: "success", msg: "Initialized empty Git repository in .git/" };

    case "add":
      if (args.length < 2) return { type: "error", msg: "usage: git add <file>..." };
      const filesToAdd = args.slice(1).filter(f => f !== ".");
      return { type: "success", msg: filesToAdd.length ? `Staged: ${filesToAdd.join(", ")}` : "Staged all changes ready for commit." };

    case "commit": {
      const msgIdx = args.indexOf("-m");
      if (msgIdx === -1 || msgIdx === args.length - 1) return { type: "error", msg: "usage: git commit -m \"message\"" };
      // Reconstruct message (may have been split)
      let message = args.slice(msgIdx + 1).join(" ").replace(/^["']|["']$/g, "");
      dispatch({ type: "COMMIT", message });
      return { type: "success", msg: `[${state.HEAD.name} ${randomSHA().substring(0, 7)}] ${message}` };
    }

    case "branch": {
      if (args.length === 1) {
        const branches = Object.keys(state.branches).map(b =>
          state.HEAD.type === "branch" && state.HEAD.name === b ? `* ${b}` : `  ${b}`
        ).join("\n");
        return { type: "output", msg: branches };
      }
      if (args[1] === "-d" || args[1] === "-D") {
        if (args.length < 3) return { type: "error", msg: "usage: git branch -d <branch>" };
        if (state.branches[args[2]] === undefined) return { type: "error", msg: `branch '${args[2]}' not found.` };
        if (state.HEAD.type === "branch" && state.HEAD.name === args[2]) return { type: "error", msg: `Cannot delete branch '${args[2]}' checked out.` };
        const newBranches = { ...state.branches };
        delete newBranches[args[2]];
        dispatch({ type: "BRANCH", name: "__deleted__" }); // Just for reflog
        return { type: "success", msg: `Deleted branch ${args[2]}.` };
      }
      const branchName = args[1];
      if (state.branches[branchName]) return { type: "error", msg: `A branch named '${branchName}' already exists.` };
      dispatch({ type: "BRANCH", name: branchName });
      return { type: "success", msg: `Created branch '${branchName}'.` };
    }

    case "checkout": {
      if (args.length < 2) return { type: "error", msg: "usage: git checkout <branch>" };
      if (args[1] === "-b" && args.length >= 3) {
        const branchName = args[2];
        const startPoint = args[3] || null;
        if (state.branches[branchName]) return { type: "error", msg: `A branch named '${branchName}' already exists.` };
        dispatch({ type: "CHECKOUT_B", branch: branchName, startPoint });
        return { type: "success", msg: `Switched to a new branch '${branchName}'` };
      }
      dispatch({ type: "CHECKOUT", name: args[1] });
      return { type: "success", msg: `Switched to branch '${args[1]}'` };
    }

    case "switch": {
      if (args.length < 2) return { type: "error", msg: "usage: git switch <branch>" };
      if (args[1] === "-c" && args.length >= 3) {
        dispatch({ type: "CHECKOUT_B", branch: args[2] });
        return { type: "success", msg: `Switched to a new branch '${args[2]}'` };
      }
      if (args[1] === "-") {
        dispatch({ type: "CHECKOUT", name: "-" });
        return { type: "success", msg: "Switched to previous branch." };
      }
      dispatch({ type: "CHECKOUT", name: args[1] });
      return { type: "success", msg: `Switched to branch '${args[1]}'` };
    }

    case "merge": {
      if (args.length < 2) return { type: "error", msg: "usage: git merge <branch>" };
      dispatch({ type: "MERGE", branch: args[1] });
      return { type: "success", msg: `Merging '${args[1]}' into ${state.HEAD.name}...` };
    }

    case "rebase": {
      if (args.length < 2) return { type: "error", msg: "usage: git rebase <branch>" };
      if (args[1] === "-i") return { type: "info", msg: "Interactive rebase started. (Simulated)" };
      dispatch({ type: "REBASE", branch: args[1] });
      return { type: "success", msg: `Rebasing onto ${args[1]}...` };
    }

    case "cherry-pick": {
      if (args.length < 2) return { type: "error", msg: "usage: git cherry-pick <commit>" };
      dispatch({ type: "CHERRY_PICK", commit: args[1] });
      return { type: "success", msg: `Cherry-picked ${args[1].substring(0, 7)}.` };
    }

    case "reset": {
      const mode = args.includes("--soft") ? "soft" : args.includes("--hard") ? "hard" : "mixed";
      const targetIdx = args.findIndex(a => !a.startsWith("--"));
      const target = targetIdx >= 0 ? args[targetIdx] : "HEAD";
      dispatch({ type: "RESET", target, mode });
      return { type: "success", msg: `${mode.charAt(0).toUpperCase() + mode.slice(1)} reset to ${target}.` };
    }

    case "revert": {
      if (args.length < 2) return { type: "error", msg: "usage: git revert <commit>" };
      dispatch({ type: "REVERT", commit: args[1] });
      return { type: "success", msg: `Reverted ${args[1].substring(0, 7)}.` };
    }

    case "tag": {
      if (args.length < 2) return { type: "error", msg: "usage: git tag <name>" };
      if (args[1] === "-a" && args.length >= 3) {
        dispatch({ type: "TAG", name: args[2] });
        return { type: "success", msg: `Created tag '${args[2]}'.` };
      }
      if (args[1] === "-l" || args[1] === "--list") {
        return { type: "output", msg: "v1.0.0\nv1.1.0\nv2.0.0" };
      }
      dispatch({ type: "TAG", name: args[1] });
      return { type: "success", msg: `Created tag '${args[1]}'.` };
    }

    case "stash": {
      if (args[1] === "pop") {
        dispatch({ type: "STASH_POP" });
        return { type: "success", msg: "Restored stashed changes." };
      }
      if (args[1] === "list") {
        return { type: "output", msg: state.stash.length ? state.stash.map((s, i) => `stash@{${i}}: ${s.message}`).join("\n") : "No stash entries." };
      }
      if (args[1] === "drop") return { type: "success", msg: "Dropped stash." };
      if (args[1] === "clear") return { type: "success", msg: "Cleared stash." };
      const msgIdx = args.indexOf("-m");
      const msg = msgIdx >= 0 ? args.slice(msgIdx + 1).join(" ").replace(/["']/g, "") : null;
      dispatch({ type: "STASH", message: msg || undefined });
      return { type: "success", msg: msg ? `Stashed: ${msg}` : "Saved working directory." };
    }

    case "status":
      return { type: "output", msg: buildStatusOutput(state) };

    case "log":
      return { type: "output", msg: buildLogOutput(state, args.includes("--oneline"), args.includes("--graph"), args.includes("--all")) };

    case "diff":
      return { type: "output", msg: "diff --git a/file.js b/file.js\n(No changes staged for commit)" };

    case "push":
      dispatch({ type: "PUSH" });
      return { type: "success", msg: "Pushed to origin." };

    case "fetch":
      dispatch({ type: "FETCH" });
      return { type: "success", msg: "Fetched from origin." };

    case "clone":
      dispatch({ type: "CLONE" });
      return { type: "success", msg: "Cloned repository." };

    case "remote": {
      if (args[1] === "-v") return { type: "output", msg: "origin\thttps://github.com/user/repo.git (fetch)\norigin\thttps://github.com/user/repo.git (push)" };
      if (args[1] === "add" && args.length >= 4) return { type: "success", msg: `Added remote '${args[2]}'.` };
      return { type: "output", msg: "origin" };
    }

    default:
      return { type: "error", msg: `git: '${subcmd}' is not a git command. See 'git --help'.` };
  }
}

function buildStatusOutput(state) {
  const branch = state.HEAD.type === "branch" ? state.HEAD.name : `HEAD detached at ${(state.HEAD.ref || "").substring(0, 7)}`;
  let out = `On branch ${branch}\n`;
  const modified = Object.keys(state.files);
  const stagedCount = Object.keys(state.stagedFiles).length;
  if (stagedCount > 0) out += `\nChanges to be committed:\n  (use "git reset HEAD <file>..." to unstage)\n\n${Object.keys(state.stagedFiles).map(f => `\tmodified:   ${f}`).join("\n")}\n`;
  if (modified.length > 0) out += `\nChanges not staged for commit:\n  (use "git add <file>..." to update what will be committed)\n\n${modified.map(f => `\tmodified:   ${f}`).join("\n")}\n`;
  if (!Object.keys(state.files).length && !stagedCount) out += "\nnothing to commit, working tree clean\n";
  return out;
}

function buildLogOutput(state, oneline, graph, all) {
  const commits = state.commitOrder;
  if (!commits.length) return "No commits.";
  const lines = commits.slice().reverse().map((sha, i) => {
    const c = state.commits[sha];
    if (!c) return "";
    const prefix = graph ? "* " : "";
    const shaStr = oneline ? c.id.substring(0, 7) : `commit ${c.id}`;
    const msg = oneline ? c.message : `\nAuthor: User <user@example.com>\nDate:   ${new Date(c.timestamp).toLocaleString()}\n\n    ${c.message}`;
    return `${prefix}${shaStr}${oneline ? ` ${msg}` : msg}`;
  }).join(oneline ? "\n" : "\n\n");
  return lines;
}

// ═══════════════════════════════════════════════════
// SVG GRAPH RENDERER — Clean GitKraken-style layout
// ═══════════════════════════════════════════════════

const GRID_X = 70;     // Horizontal spacing between branch columns
const ROW_H = 48;       // Vertical spacing between commit rows
const PAD = 40;         // SVG padding
const SHA_W = 60;       // Width reserved for SHA text right of node

function computeGraphLayout(state, width, height) {
  const { commits, commitOrder, branches, HEAD } = state;
  const nodes = [];
  const edges = [];
  const branchLabels = [];

  // Assign each branch a column index (preserving order)
  const branchCols = {};
  let nextCol = 0;

  // First, collect all unique branch names in order of first appearance
  commitOrder.forEach((sha) => {
    const c = commits[sha];
    if (!c) return;
    const br = c.branch || "main";
    if (branchCols[br] === undefined) {
      branchCols[br] = nextCol++;
    }
  });

  const colMap = {};
  commitOrder.forEach((sha) => {
    const c = commits[sha];
    if (!c) return;
    colMap[sha] = branchCols[c.branch || "main"] || 0;
  });

  const totalCols = Math.max(Object.keys(branchCols).length, 1);
  const svgWidth = Math.max(width || 600, totalCols * GRID_X + PAD * 2 + SHA_W + 20);
  const svgHeight = Math.max(height || 300, commitOrder.length * ROW_H + PAD * 2 + 30);

  // Helper: compute x/y for a commit SHA
  const nodePos = (sha, idx) => {
    const i = idx !== undefined ? idx : commitOrder.indexOf(sha);
    const col = colMap[sha] || 0;
    const lanesTotal = Math.max(totalCols, 1);
    // Center the graph horizontally
    const startX = (svgWidth - (lanesTotal - 1) * GRID_X) / 2;
    const x = startX + col * GRID_X;
    const y = svgHeight - PAD - (commitOrder.length - 1 - i) * ROW_H;
    return { x, y };
  };

  // Build nodes and edges
  commitOrder.forEach((sha, i) => {
    const c = commits[sha];
    if (!c) return;
    const { x, y } = nodePos(sha, i);

    // Node entry
    const isHead = (HEAD.type === "branch" && branches[HEAD.name] === sha) ||
                   (HEAD.type === "detached" && HEAD.ref === sha);

    nodes.push({
      id: sha,
      x, y,
      message: c.message,
      branch: c.branch,
      isMerge: !!c.isMerge,
      isHead,
      parent: c.parent,
      parent2: c.parent2,
    });

    // Edge to parent
    if (c.parent && commits[c.parent]) {
      const p = nodePos(c.parent);
      edges.push({
        x1: x, y1: y,
        x2: p.x, y2: p.y,
        color: getBranchColor(branchCols[c.branch] || 0),
        dashed: false,
      });
    }

    // Edge to second parent (merge)
    if (c.parent2 && commits[c.parent2]) {
      const p2 = nodePos(c.parent2);
      edges.push({
        x1: x, y1: y,
        x2: p2.x, y2: p2.y,
        color: getBranchColor(branchCols[c.parent2] || 0),
        dashed: true,
      });
    }
  });

  // Branch labels — positioned at each branch's tip node, above it
  Object.keys(branches).forEach((b) => {
    const sha = branches[b];
    const node = nodes.find(n => n.id === sha);
    if (!node) return;
    const isActive = HEAD.type === "branch" && HEAD.name === b;
    branchLabels.push({
      name: b,
      x: node.x,
      y: node.y - NODE_RADIUS - 10,
      color: getBranchColor(branchCols[b] || 0),
      active: isActive,
    });
  });

  // HEAD indicator — below the node
  let headLabel = null;
  if (HEAD.type === "branch" && branches[HEAD.name]) {
    const sha = branches[HEAD.name];
    const node = nodes.find(n => n.id === sha);
    if (node) {
      headLabel = { x: node.x + NODE_RADIUS + 8, y: node.y + NODE_RADIUS + 14, name: HEAD.name };
    }
  }

  return { nodes, edges, branchLabels, headLabel, width: svgWidth, height: svgHeight };
}

// ═══════════════════════════════════════════════════
// SVG Graph Component — Clean, minimal, readable
// ═══════════════════════════════════════════════════

function GitGraph({ state, width, height }) {
  const isEmpty = !state.gitInitDone || state.commitOrder.length === 0;
  const layout = useMemo(() => {
    if (isEmpty) return null;
    return computeGraphLayout(state, width || 600, height || 300);
  }, [isEmpty, state, width, height]);

  if (isEmpty) {
    return (
      <div className="git-graph-empty">
        <div className="git-graph-empty-icon">📊</div>
        <div className="git-graph-empty-text">No commits yet. Initialize a repository to see your commit graph.</div>
        <div className="git-graph-empty-cmd">git init</div>
        <div className="git-graph-empty-hint">Type the command above in the terminal</div>
      </div>
    );
  }

  return (
    <svg width={layout.width} height={layout.height} className="git-graph-svg" viewBox={`0 0 ${layout.width} ${layout.height}`}>
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="shadow">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.2" />
        </filter>
      </defs>

      {/* Thin separator lines between columns */}
      {(() => {
        const totalBranches = Object.keys(state.branches).length;
        if (totalBranches < 2) return null;
        const startX = (layout.width - (totalBranches - 1) * GRID_X) / 2;
        return [...Array(totalBranches - 1)].map((_, i) => {
          const x = startX + (i + 0.5) * GRID_X;
          return (
            <line key={`sep-${i}`} x1={x} y1={PAD} x2={x} y2={layout.height - PAD}
              stroke="rgba(255,255,255,0.025)" strokeWidth="1" />
          );
        });
      })()}

      {/* Edges — curved bezier paths */}
      {layout.edges.map((edge, i) => {
        const sameCol = edge.x1 === edge.x2;
        return (
          <g key={`edge-${i}`}>
            {sameCol ? (
              <line
                x1={edge.x1} y1={edge.y1} x2={edge.x2} y2={edge.y2}
                stroke={edge.color} strokeWidth={2}
                strokeDasharray={edge.dashed ? "5,3" : "none"}
                opacity={0.35}
                strokeLinecap="round"
              />
            ) : (
              <path
                d={`M ${edge.x1} ${edge.y1} C ${edge.x1} ${(edge.y1 + edge.y2) / 2}, ${edge.x2} ${(edge.y1 + edge.y2) / 2}, ${edge.x2} ${edge.y2}`}
                fill="none"
                stroke={edge.color} strokeWidth={2}
                strokeDasharray={edge.dashed ? "5,3" : "none"}
                opacity={0.35}
                strokeLinecap="round"
              />
            )}
          </g>
        );
      })}

      {/* Nodes */}
      {layout.nodes.map((node, i) => {
        const branchIndex = Object.keys(state.branches).indexOf(node.branch);
        const branchColor = getBranchColor(branchIndex >= 0 ? branchIndex : i);
        const isHead = node.isHead;
        return (
          <g key={node.id} className={`git-commit-node ${isHead ? "current" : ""}`}>
            {/* Merge ring */}
            {node.isMerge && (
              <circle cx={node.x} cy={node.y} r={NODE_RADIUS + 5}
                fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="3,2" opacity={0.5} />
            )}
            {/* Glow ring for HEAD */}
            {isHead && (
              <circle cx={node.x} cy={node.y} r={NODE_RADIUS + 5}
                fill="none" stroke="#f59e0b" strokeWidth="1.5" opacity={0.5}
                style={{ animation: 'pulseGlow 2s ease-in-out infinite' }} />
            )}
            {/* Outer circle */}
            <circle
              cx={node.x} cy={node.y} r={NODE_RADIUS}
              fill={isHead ? "#1a2639" : "#0f172a"}
              stroke={isHead ? "#f59e0b" : branchColor}
              strokeWidth={isHead ? 3 : 2.5}
              filter={isHead ? "url(#glow)" : "url(#shadow)"}
            />
            {/* Inner dot */}
            <circle cx={node.x} cy={node.y} r={3}
              fill={isHead ? "#f59e0b" : branchColor} opacity={0.9} />

            {/* SHA label — clean, to the right */}
            <text className="git-commit-sha" x={node.x + NODE_RADIUS + 8} y={node.y + 4}>
              {node.id.substring(0, 7)}
            </text>
          </g>
        );
      })}

      {/* Branch labels — centered above their tip node */}
      {layout.branchLabels.map((label, i) => (
        <g key={`bl-${i}`}>
          <rect
            x={label.x - 3 - (label.name.length * 4)}
            y={label.y - 8}
            width={label.name.length * 8 + 12}
            height={17}
            rx="4" ry="4"
            fill={label.active ? label.color : "#1e293b"}
            stroke={label.color}
            strokeWidth={label.active ? 1.5 : 1}
            opacity={0.92}
          />
          <text
            x={label.x + 3}
            y={label.y + 4}
            textAnchor="middle"
            fill={label.active ? "#0f172a" : label.color}
            fontSize="11"
            fontWeight={label.active ? "800" : "600"}
            fontFamily="'JetBrains Mono', monospace"
          >
            {label.active ? `★ ${label.name}` : label.name}
          </text>
        </g>
      ))}

      {/* HEAD indicator */}
      {layout.headLabel && (
        <g>
          <rect
            x={layout.headLabel.x - 4}
            y={layout.headLabel.y - 7}
            width={layout.headLabel.name.length * 7.5 + 40}
            height={17}
            rx="4" ry="4"
            fill="rgba(245,158,11,0.1)"
            stroke="rgba(245,158,11,0.25)"
            strokeWidth="1"
          />
          <text
            x={layout.headLabel.x + 2}
            y={layout.headLabel.y + 4}
            fill="#f59e0b"
            fontSize="10"
            fontWeight="700"
            fontFamily="'JetBrains Mono', monospace"
            letterSpacing="0.03em"
          >
            HEAD → {layout.headLabel.name}
          </text>
        </g>
      )}
    </svg>
  );
}

// ═══════════════════════════════════════════════════
// TERMINAL COMPONENT
// ═══════════════════════════════════════════════════

function GitTerminal({ gitState, dispatch, onCommand, commands }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  // Listen for quick command clicks from Playground
  useEffect(() => {
    const handler = (e) => {
      const cmd = e.detail?.command || '';
      if (cmd) {
        setInput(cmd);
        // Auto-execute after a brief moment
        setTimeout(() => {
          const result = parseGitCommand(cmd, gitState, dispatch);
          const entry = { command: cmd, type: result.type, message: result.msg };
          setHistory(prev => [...prev, entry]);
          setInput('');
          setHistoryIdx(-1);
          onCommand(cmd);
          if (inputRef.current) inputRef.current.focus();
        }, 100);
      }
    };
    window.addEventListener('git-quick-cmd', handler);
    return () => window.removeEventListener('git-quick-cmd', handler);
  }, [gitState, dispatch, onCommand]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = () => {
    const cmd = input.trim();
    if (!cmd) return;

    const result = parseGitCommand(cmd, gitState, dispatch);
    const entry = { command: cmd, type: result.type, message: result.msg };
    setHistory(prev => [...prev, entry]);
    setInput("");
    setHistoryIdx(-1);
    onCommand(cmd);

    // Focus back on input
    if (inputRef.current) inputRef.current.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIdx < history.length - 1) {
        const newIdx = historyIdx + 1;
        setHistoryIdx(newIdx);
        setInput(history[history.length - 1 - newIdx]?.command || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx > 0) {
        const newIdx = historyIdx - 1;
        setHistoryIdx(newIdx);
        setInput(history[history.length - 1 - newIdx]?.command || "");
      } else {
        setHistoryIdx(-1);
        setInput("");
      }
    }
  };

  const currentBranch = gitState.HEAD.type === "branch" ? gitState.HEAD.name : `detached@${(gitState.HEAD.ref || "").substring(0, 7)}`;

  return (
    <div className="git-terminal">
      <div className="git-terminal-header">
        <span className="git-terminal-dot red" />
        <span className="git-terminal-dot yellow" />
        <span className="git-terminal-dot green" />
        <span className="git-terminal-title">Terminal — {currentBranch}</span>
      </div>
      <div className="git-terminal-body" ref={terminalRef}>
        <div className="git-terminal-output">
          {history.map((entry, i) => (
            <div key={i}>
              <div className="git-terminal-line">
                <span style={{ color: "#22c55e" }}>$ </span>
                <span style={{ color: "#e2e8f0" }}>{entry.command}</span>
              </div>
              <div className={`git-terminal-line ${entry.type}`}>{entry.message}</div>
            </div>
          ))}
          {(gitState.mergeResult || gitState.mergeError) && (
            <div className={`git-terminal-line ${gitState.mergeError ? "error" : "success"}`}>
              {gitState.mergeError || gitState.mergeResult}
            </div>
          )}
        </div>
      </div>
      <div className="git-terminal-input-row">
        <span className="git-terminal-prompt">$</span>
        <input
          ref={inputRef}
          className="git-terminal-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a git command... (e.g., git init)"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
        <button className="git-terminal-run" onClick={handleCommand}>Run</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// ICONS
// ═══════════════════════════════════════════════════

// ═══════════════════════════════════════════════════
// RESIZABLE HANDLE
// ═══════════════════════════════════════════════════

function ResizableHandle({ onDrag, orientation = "vertical" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMouseDown = (e) => {
      e.preventDefault();
      document.body.style.cursor = orientation === "vertical" ? "col-resize" : "row-resize";
      document.body.style.userSelect = "none";
      const onMouseMove = (e) => onDrag({ clientX: e.clientX, clientY: e.clientY });
      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      };
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };
    el.addEventListener("mousedown", onMouseDown);
    return () => el.removeEventListener("mousedown", onMouseDown);
  }, [onDrag, orientation]);
  return <div ref={ref} className={`jsl-resize-handle ${orientation}`} />;
}

// ═══════════════════════════════════════════════════
// SIDEBAR
// ═══════════════════════════════════════════════════

const SECTIONS = [
  { id: "git-fundamentals", label: "Git Fundamentals", color: "#22c55e", icon: "🌱" },
  { id: "branching", label: "Branching", color: "#60a5fa", icon: "🌿" },
  { id: "intermediate", label: "Intermediate Git", color: "#f59e0b", icon: "⚡" },
  { id: "advanced", label: "Advanced Git", color: "#ef4444", icon: "🔬" },
  { id: "github", label: "GitHub", color: "#a78bfa", icon: "🐙" },
];

function GitSidebar({ activeSection, activeLesson, activeBoss, activeConflict, activeTeam, activeInterview,
  onSelectLesson, onSelectBoss, onSelectConflict, onSelectTeam, onSelectInterview, onSelectPlayground,
  progress, ...rest }) {
  const [expandedSections, setExpandedSections] = useState({
    "git-fundamentals": true, branching: false, intermediate: false, advanced: false, github: false,
  });
  const toggleSection = (key) => setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));

  const getLessonsForSection = (sectionId) => {
    const sectionMap = {
      "git-fundamentals": ["Git Fundamentals"],
      "branching": ["Branching"],
      "intermediate": ["Intermediate Git"],
      "advanced": ["Advanced Git"],
      "github": ["GitHub"],
    };
    return GIT_LESSONS.filter(l => l.section === sectionMap[sectionId]?.[0]);
  };

  return (
    <div className="jsl-sidebar" {...rest}>
      <div className="jsl-sidebar-header">
        <h3><FiBook size={16} /> Git Labs</h3>
      </div>

      {/* Playground shortcut */}
      <div className="jsl-sidebar-group">
        <button
          className={`jsl-sg-header ${activeSection === "playground" ? "expanded" : ""}`}
          onClick={onSelectPlayground}
          style={{ color: activeSection === "playground" ? "#f59e0b" : undefined }}
        >
          <div className="jsl-sg-title" style={{ color: "#f59e0b" }}>
            <FiBook size={16} /> <span>GIT PLAYGROUND</span>
          </div>
        </button>
      </div>

      {/* Boss Battles */}
      <div className="jsl-sidebar-group">
        <button
          className={`jsl-sg-header ${activeSection === "boss" ? "expanded" : ""} expanded`}
          style={{ color: activeSection === "boss" ? "#ef4444" : undefined }}
        >
          <div className="jsl-sg-title" style={{ color: "#ef4444" }}>
            <FiBook size={16} /> <span>BOSS BATTLES</span>
          </div>
        </button>
        <div className="jsl-sg-items" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {GIT_BOSS_CHALLENGES.map((boss, i) => (
            <button
              key={boss.id}
              className={`jsl-si ${activeBoss === boss.id ? "active" : ""} ${progress.bosses.includes(boss.id) ? "done" : ""}`}
              onClick={() => onSelectBoss(boss.id)}
              style={{ fontSize: '0.72rem', padding: '0.3rem 0.6rem' }}
            >
              <span className="jsl-si-num">⚔️</span>
              <span className="jsl-si-title">{boss.title}</span>
              <span className={`jsl-si-level ${boss.difficulty.toLowerCase()}`}>{boss.difficulty[0]}</span>
              {progress.bosses.includes(boss.id) && <span className="jsl-si-check"><FiCheck size={16} /></span>}
            </button>
          ))}
        </div>
      </div>

      {/* Merge Conflicts */}
      <div className="jsl-sidebar-group">
        <button
          className={`jsl-sg-header ${activeSection === "conflict" ? "expanded" : ""} expanded`}
          style={{ color: activeSection === "conflict" ? "#ef4444" : undefined }}
        >
          <div className="jsl-sg-title" style={{ color: "#ef4444" }}>
            <FiBook size={16} /> <span>CONFLICT ARENA</span>
          </div>
        </button>
        <div className="jsl-sg-items" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {MERGE_CONFLICTS.map((conflict, i) => (
            <button
              key={conflict.id}
              className={`jsl-si ${activeConflict === conflict.id ? "active" : ""} ${progress.conflicts.includes(conflict.id) ? "done" : ""}`}
              onClick={() => onSelectConflict(conflict.id)}
              style={{ fontSize: '0.72rem', padding: '0.3rem 0.6rem' }}
            >
              <span className="jsl-si-num">{i + 1}.</span>
              <span className="jsl-si-title">{conflict.title}</span>
              <span className={`jsl-si-level ${conflict.difficulty.toLowerCase()}`}>{conflict.difficulty[0]}</span>
              {progress.conflicts.includes(conflict.id) && <span className="jsl-si-check"><FiCheck size={16} /></span>}
            </button>
          ))}
        </div>
      </div>

      {/* Team Collab */}
      <div className="jsl-sidebar-group">
        <button
          className={`jsl-sg-header ${activeSection === "team" ? "expanded" : ""} expanded`}
          style={{ color: activeSection === "team" ? "#60a5fa" : undefined }}
        >
          <div className="jsl-sg-title" style={{ color: "#60a5fa" }}>
            <FiBook size={16} /> <span>TEAM SIMULATOR</span>
          </div>
        </button>
        <div className="jsl-sg-items" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {TEAM_SCENARIOS.map((scenario, i) => (
            <button
              key={scenario.id}
              className={`jsl-si ${activeTeam === scenario.id ? "active" : ""} ${progress.teams.includes(scenario.id) ? "done" : ""}`}
              onClick={() => onSelectTeam(scenario.id)}
              style={{ fontSize: '0.72rem', padding: '0.3rem 0.6rem' }}
            >
              <span className="jsl-si-num">{i + 1}.</span>
              <span className="jsl-si-title">{scenario.title}</span>
              <span className={`jsl-si-level ${(scenario.difficulty || 'intermediate').toLowerCase()}`}>{(scenario.difficulty || 'Intermediate')[0]}</span>
              {progress.teams.includes(scenario.id) && <span className="jsl-si-check"><FiCheck size={16} /></span>}
            </button>
          ))}
        </div>
      </div>

      {/* Interview Prep */}
      <div className="jsl-sidebar-group">
        <button
          className={`jsl-sg-header ${activeSection === "interview" ? "expanded" : ""}`}
          onClick={onSelectInterview}
          style={{ color: activeSection === "interview" ? "#fcd34d" : undefined }}
        >
          <div className="jsl-sg-title" style={{ color: "#fcd34d" }}>
            <FiBook size={16} /> <span>INTERVIEW PREP</span>
          </div>
        </button>
      </div>

      {/* Curriculum Sections */}
      {SECTIONS.map((section) => {
        const lessons = getLessonsForSection(section.id);
        const done = lessons.filter(l => progress.lessons.includes(l.id)).length;
        return (
          <div className="jsl-sidebar-group" key={section.id}>
            <button
              className={`jsl-sg-header ${expandedSections[section.id] ? "expanded" : ""}`}
              onClick={() => toggleSection(section.id)}
            >
              <div className="jsl-sg-title" style={{ color: section.color }}>
                <span>{section.icon}</span> <span>{section.label}</span>
              </div>
              <span className="jsl-sg-count">{done}/{lessons.length}</span>
              <svg className="jsl-sg-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {expandedSections[section.id] && (
              <div className="jsl-sg-items">
                {lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    className={`jsl-si ${activeLesson === lesson.id ? "active" : ""} ${progress.lessons.includes(lesson.id) ? "done" : ""}`}
                    onClick={() => onSelectLesson(lesson.id)}
                  >
                    <span className="jsl-si-num">{lesson.chapter}.</span>
                    <span className="jsl-si-title">{lesson.title}</span>
                    <span className={`jsl-si-level ${lesson.level.toLowerCase()}`}>{lesson.level[0]}</span>
                    {progress.lessons.includes(lesson.id) && <span className="jsl-si-check"><FiCheck size={16} /></span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════
// MAIN PLATFORM
// ═══════════════════════════════════════════════════

export default function GitLabsPlatform() {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("learn");
  const [activeLesson, setActiveLesson] = useState(GIT_LESSONS[0]?.id || null);
  const [activeBoss, setActiveBoss] = useState(null);
  const [activeConflict, setActiveConflict] = useState(null);
  const [activeTeam, setActiveTeam] = useState(null);
  const [activeInterview, setActiveInterview] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [commands, setCommands] = useState([]);
  const [gitState, dispatch] = useReducer(gitReducer, initialState);
  const [progress, setProgress] = useState({ lessons: [], bosses: [], conflicts: [], teams: [], interview: [] });
  const [achievements, setAchievements] = useState([]);
  const [sidebarWidth, setSidebarWidth] = useState(260);
  const [graphZoom, setGraphZoom] = useState(1.0);
  const bodyRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 100);
    try {
      const stored = JSON.parse(sessionStorage.getItem("git-progress") || '{"lessons":[],"bosses":[],"conflicts":[],"teams":[],"interview":[]}');
      setProgress(stored);
      const storedAch = JSON.parse(sessionStorage.getItem("git-achievements") || '[]');
      setAchievements(storedAch);
    } catch {}
    return () => clearTimeout(timer);
  }, []);

  const saveProgress = useCallback((newProgress) => {
    setProgress(newProgress);
    try { sessionStorage.setItem("git-progress", JSON.stringify(newProgress)); } catch {}
  }, []);

  const markLessonDone = useCallback((id) => {
    if (!progress.lessons.includes(id)) {
      const newProgress = { ...progress, lessons: [...progress.lessons, id] };
      saveProgress(newProgress);
    }
  }, [progress, saveProgress]);

  const addAchievement = useCallback((id, title) => {
    if (!achievements.find(a => a.id === id)) {
      const newAch = [...achievements, { id, title, date: Date.now() }];
      setAchievements(newAch);
      try { sessionStorage.setItem("git-achievements", JSON.stringify(newAch)); } catch {}
    }
  }, [achievements]);

  const progressStats = useMemo(() => ({
    lessonsDone: progress.lessons.length,
    lessonsTotal: GIT_LESSONS.length,
    bossesDone: progress.bosses.length,
    bossesTotal: GIT_BOSS_CHALLENGES.length,
    interviewDone: progress.interview.length,
    interviewTotal: GIT_INTERVIEW_TOPICS.length,
    total: progress.lessons.length + progress.bosses.length + progress.interview.length,
    totalAll: GIT_LESSONS.length + GIT_BOSS_CHALLENGES.length + GIT_INTERVIEW_TOPICS.length,
    pct: Math.round(((progress.lessons.length + progress.bosses.length + progress.interview.length) / (GIT_LESSONS.length + GIT_BOSS_CHALLENGES.length + GIT_INTERVIEW_TOPICS.length)) * 100),
    lessons: progress.lessons,
    bosses: progress.bosses,
    conflicts: progress.conflicts,
    teams: progress.teams,
    interview: progress.interview,
  }), [progress]);

  const currentLesson = useMemo(() => GIT_LESSONS.find(l => l.id === activeLesson), [activeLesson]);
  const currentBoss = useMemo(() => GIT_BOSS_CHALLENGES.find(b => b.id === activeBoss), [activeBoss]);
  const currentConflict = useMemo(() => MERGE_CONFLICTS.find(c => c.id === activeConflict), [activeConflict]);
  const currentTeam = useMemo(() => TEAM_SCENARIOS.find(t => t.id === activeTeam), [activeTeam]);
  const currentInterview = useMemo(() => GIT_INTERVIEW_TOPICS.find(t => t.id === activeInterview), [activeInterview]);

  const selectLesson = (id) => {
    const lesson = GIT_LESSONS.find(l => l.id === id);
    if (!lesson) return;
    setView("learn");
    setActiveLesson(id);
    setActiveBoss(null);
    setActiveConflict(null);
    setActiveTeam(null);
    setActiveInterview(null);
    setShowHint(false);
    setShowSolution(false);
    setCommands([]);
    // Setup initial repo state
    if (lesson.initialRepo) {
      dispatch({ type: "CLEAR_MESSAGES" });
      if (lesson.initialRepo.setup) {
        dispatch({ type: "SETUP_INITIAL", commits: lesson.initialRepo.commits, branches: lesson.initialRepo.branches, HEAD: lesson.initialRepo.HEAD });
      }
    }
  };

  const selectBoss = (id) => {
    const boss = GIT_BOSS_CHALLENGES.find(b => b.id === id);
    if (!boss) return;
    setView("boss");
    setActiveLesson(null);
    setActiveBoss(id);
    setActiveConflict(null);
    setActiveTeam(null);
    setActiveInterview(null);
    setShowHint(false);
    setShowSolution(false);
    setCommands([]);
    if (boss.initialRepo?.setup) {
      dispatch({ type: "SETUP_INITIAL", commits: boss.initialRepo.commits || [], branches: boss.initialRepo.branches, HEAD: boss.initialRepo.HEAD });
    }
  };

  const selectConflict = (id) => {
    const conflict = MERGE_CONFLICTS.find(c => c.id === id);
    if (!conflict) return;
    setView("conflict");
    setActiveLesson(null);
    setActiveBoss(null);
    setActiveConflict(id);
    setActiveTeam(null);
    setActiveInterview(null);
  };

  const selectTeam = (id) => {
    const scenario = TEAM_SCENARIOS.find(t => t.id === id);
    if (!scenario) return;
    setView("team");
    setActiveLesson(null);
    setActiveBoss(null);
    setActiveConflict(null);
    setActiveTeam(id);
    setActiveInterview(null);
    setCommands([]);
    if (scenario.initialRepo?.setup) {
      dispatch({ type: "SETUP_INITIAL", commits: scenario.initialRepo.commits || [], branches: scenario.initialRepo.branches, HEAD: scenario.initialRepo.HEAD });
    }
  };

  const selectInterview = (id) => {
    const topic = GIT_INTERVIEW_TOPICS.find(t => t.id === id);
    if (!topic) return;
    setView("interview");
    setActiveLesson(null);
    setActiveBoss(null);
    setActiveConflict(null);
    setActiveTeam(null);
    setActiveInterview(id);
  };

  const selectPlayground = () => {
    setView("playground");
    setActiveLesson(null);
    setActiveBoss(null);
    setActiveConflict(null);
    setActiveTeam(null);
    setActiveInterview(null);
    setShowHint(false);
    setShowSolution(false);
    setCommands([]);
    dispatch({ type: "INIT" });
    addAchievement("first-playground", "Playground Explorer");
  };

  const handleCommand = (cmd) => {
    setCommands(prev => [...prev, cmd]);

    // Check if mission is complete
    if (view === "learn" && currentLesson?.missionValidation) {
      const newCommands = [...commands, cmd];
      if (currentLesson.missionValidation(newCommands)) {
        markLessonDone(currentLesson.id);
        addAchievement(`lesson-${currentLesson.id}`, currentLesson.title);
      }
    }
  };

  const handleSidebarDrag = useCallback(({ clientX }) => {
    if (!bodyRef.current) return;
    setSidebarWidth(Math.max(180, Math.min(500, clientX - bodyRef.current.getBoundingClientRect().left)));
  }, []);

  const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");

  if (loading) {
    return <div className="jsl-platform"><SkeletonLabPlatform /></div>;
  }

  return (
    <div className="jsl-platform">
      {/* Top Nav */}
      <LabTopbar
        base={base}
        title="Git & GitHub Labs"
        icon={{
          component: <DiGitBranch size={18} />,
          style: { background: "rgba(245,158,11,0.08)", borderColor: "rgba(245,158,11,0.18)" },
        }}
        progressStats={progressStats}
        monacoTheme="jsl-dark"
        onToggleTheme={() => {}}
      >
        {achievements.length > 0 && (
          <span style={{ fontSize: "0.7rem", color: "#f59e0b", display: "flex", alignItems: "center", gap: "0.25rem" }}>
            {"\u{1F3C6}"} {achievements.length}
          </span>
        )}
      </LabTopbar>
      
      {/* Main Layout */}
      <div className="jsl-main">
        <div className="jsl-body" ref={bodyRef}>
          <GitSidebar
            activeSection={view}
            activeLesson={activeLesson}
            activeBoss={activeBoss}
            activeConflict={activeConflict}
            activeTeam={activeTeam}
            activeInterview={activeInterview}
            onSelectLesson={selectLesson}
            onSelectBoss={selectBoss}
            onSelectConflict={selectConflict}
            onSelectTeam={selectTeam}
            onSelectInterview={selectInterview}
            onSelectPlayground={selectPlayground}
            progress={progressStats}
            style={{ width: sidebarWidth }}
          />
          <LabResizableHandle onDrag={handleSidebarDrag} />

          <div className="jsl-workspace" style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {/* Top Row: Content + Graph side by side */}
            <div style={{ flex: "1 1 50%", display: "flex", overflow: "hidden", padding: "0.65rem 0.75rem 0.35rem", gap: "0.65rem" }}>
              {/* Content Panel - Left half */}
              <div className="jsl-content-panel" style={{ flex: "1 1 50%", overflow: "auto", minWidth: 0 }}>
                <div className="jsl-content-scroll">
                  {view === "learn" && currentLesson && (
                    <LessonView
                      lesson={currentLesson}
                      showHint={showHint}
                      showSolution={showSolution}
                      onToggleHint={() => setShowHint(h => !h)}
                      onToggleSolution={() => setShowSolution(s => !s)}
                      onMarkDone={() => markLessonDone(currentLesson.id)}
                      isDone={progress.lessons.includes(currentLesson.id)}
                      commands={commands}
                    />
                  )}
                  {view === "boss" && currentBoss && (
                    <BossView key={currentBoss.id}
                      boss={currentBoss}
                      showHint={showHint}
                      showSolution={showSolution}
                      onToggleHint={() => setShowHint(h => !h)}
                      onToggleSolution={() => setShowSolution(s => !s)}
                    />
                  )}
                  {view === "conflict" && currentConflict && (
                    <ConflictView key={currentConflict.id}
                      conflict={currentConflict}
                      onResolved={() => {
                        if (!progress.conflicts.includes(currentConflict.id)) {
                          saveProgress({ ...progress, conflicts: [...progress.conflicts, currentConflict.id] });
                          addAchievement(`conflict-${currentConflict.id}`, `Conflict Slayer: ${currentConflict.difficulty}`);
                        }
                      }}
                    />
                  )}
                  {view === "team" && currentTeam && (
                    <TeamView key={currentTeam.id}
                      scenario={currentTeam}
                      showHint={showHint}
                      onToggleHint={() => setShowHint(h => !h)}
                    />
                  )}
                  {view === "interview" && currentInterview && (
                    <InterviewView
                      topic={currentInterview}
                      onMarkDone={() => {
                        if (!progress.interview.includes(currentInterview.id)) {
                          saveProgress({ ...progress, interview: [...progress.interview, currentInterview.id] });
                        }
                      }}
                      isDone={progress.interview.includes(currentInterview.id)}
                    />
                  )}
                  {view === "playground" && (
                    <PlaygroundView achievements={achievements} />
                  )}
                </div>
              </div>

              {/* Git Graph with Zoom - Right half */}
              <div style={{ flex: "1 1 50%", display: "flex", flexDirection: "column", minHeight: 0, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem", flexShrink: 0 }}>
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    🔀 Commit Graph
                  </span>
                  <div className="git-zoom-controls">
                    <button className="git-zoom-btn" onClick={() => setGraphZoom(z => Math.max(0.5, +(z - 0.1).toFixed(1)))} title="Zoom Out">−</button>
                    <span className="git-zoom-label">{Math.round(graphZoom * 100)}%</span>
                    <button className="git-zoom-btn" onClick={() => setGraphZoom(z => Math.min(2.0, +(z + 0.1).toFixed(1)))} title="Zoom In">+</button>
                    <button className="git-zoom-btn" onClick={() => setGraphZoom(1.0)} title="Reset Zoom">⟲</button>
                  </div>
                </div>
                <div className="git-graph-container" style={{ flex: 1, overflow: "auto" }}>
                  <GitGraph state={gitState} width={600 * graphZoom} height={300 * graphZoom} />
                </div>
              </div>
            </div>

            {/* Terminal Panel - Bottom */}
            <div style={{ flex: "0 0 auto", padding: "0 0.75rem 0.75rem" }}>
              <GitTerminal
                gitState={gitState}
                dispatch={dispatch}
                onCommand={handleCommand}
                commands={commands}
              />
            </div>
          </div>
        </div>
      </div>

      <LabFooter />
    </div>
  );
}

// ═══════════════════════════════════════════════════
// LESSON VIEW
// ═══════════════════════════════════════════════════

function LessonView({ lesson, showHint, showSolution, onToggleHint, onToggleSolution, onMarkDone, isDone, commands }) {
  const levelColor = lesson.level === "Beginner" ? "#22c55e" : lesson.level === "Intermediate" ? "#f59e0b" : "#ef4444";
  const missionComplete = lesson.missionValidation ? lesson.missionValidation(commands) : false;

  return (
    <div className="jsl-content-inner">
      <div className="jsl-chapter-header">
        <span className="jsl-chapter-badge" style={{ background: "rgba(245,158,11,0.11)", borderColor: "rgba(245,158,11,0.18)", color: "#f59e0b" }}>
          <FiBook size={16} /> Chapter {lesson.chapter}
        </span>
        <h2 className="jsl-content-title">{lesson.title}</h2>
        <div className="jsl-chapter-meta">
          <span className="jsl-diff-badge" style={{ color: levelColor, borderColor: `${levelColor}33`, background: `${levelColor}15` }}>{lesson.level}</span>
          <div className="jsl-tags">
            {lesson.tags.map(t => <span key={t} className="jsl-tag">{t}</span>)}
          </div>
        </div>
      </div>

      {/* Mission Status */}
      {commands.length > 0 && (
        <div className={`jsl-section`} style={{ padding: "0.5rem 0.75rem", marginBottom: "0.75rem", background: missionComplete ? "rgba(34,197,94,0.06)" : "rgba(245,158,11,0.06)", borderRadius: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "1rem" }}>{missionComplete ? "✅" : "⏳"}</span>
            <span style={{ fontSize: "0.82rem", color: missionComplete ? "#22c55e" : "#f59e0b", fontWeight: 600 }}>
              {missionComplete ? "Mission Complete!" : "Complete the mission steps below..."}
            </span>
          </div>
        </div>
      )}

      {/* Concept */}
      <div className="jsl-section">
        <h3 className="jsl-section-title">Concept</h3>
        <div className="jsl-concept-text" style={{ fontSize: "0.82rem", lineHeight: "1.7" }}>
          {lesson.conceptExplanation.split("\n").map((line, i) => {
            if (line.startsWith("•")) return <li key={i} className="jsl-bullet">{line.slice(2)}</li>;
            if (line.trim().startsWith("```")) return null;
            if (line.trim() === "") return <br key={i} />;
            return <p key={i} style={{ margin: "0.2rem 0" }}>{line}</p>;
          })}
        </div>
      </div>

      {/* Key Rules */}
      <div className="jsl-section jsl-rules-section">
        <h3 className="jsl-section-title">Key Rules</h3>
        <ul className="jsl-rules-list">
          {lesson.keyRules.map((rule, i) => (
            <li key={i} className="jsl-rule-item">{rule}</li>
          ))}
        </ul>
      </div>

      {/* Mission */}
      <div className="jsl-section jsl-task-section">
        <h3 className="jsl-section-title">🎯 Your Mission</h3>
        <div className="jsl-task-text" style={{ fontSize: "0.82rem" }}>
          {lesson.mission.split("\n").map((line, i) => {
            if (line.trim().startsWith("**")) return <strong key={i} style={{ display: "block", marginTop: "0.5rem" }}>{line.replace(/\*\*/g, "")}</strong>;
            if (line.trim().match(/^\d+\./)) {
              return <li key={i} className="jsl-task-item" style={{ fontSize: "0.82rem" }}>{line.replace(/^\d+\.\s*/, "")}</li>;
            }
            if (line.trim().startsWith("-")) return <li key={i} className="jsl-task-item">{line.replace(/^-/, "").trim()}</li>;
            if (line.trim() === "") return null;
            return <p key={i} style={{ margin: "0.2rem 0" }}>{line}</p>;
          })}
        </div>
      </div>

      {/* Hint */}
      {showHint && (
        <div className="jsl-hint-box">
          <strong>💡 Hint:</strong> {lesson.hint}
        </div>
      )}

      {/* Solution */}
      {showSolution && (
        <div className="jsl-solution-box">
          <h4>Solution</h4>
          <pre className="jsl-code-block"><code>{lesson.solutionCode}</code></pre>
        </div>
      )}

      {/* Actions */}
      <div className="jsl-content-actions">
        <button className="jsl-btn-ghost" onClick={onToggleHint}>
          {showHint ? "Hide Hint" : "💡 Show Hint"}
        </button>
        <button className="jsl-btn-ghost" onClick={onToggleSolution}>
          {showSolution ? "Hide Solution" : "🔍 Show Solution"}
        </button>
        <button className={`jsl-btn-mark ${isDone ? "done" : ""}`} onClick={onMarkDone}>
          {isDone ? "✓ Completed" : "Mark Complete"}
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// BOSS VIEW — Enhanced with Battle UI & Progress Tracking
// ═══════════════════════════════════════════════════

function BossView({ boss, showHint, showSolution, onToggleHint, onToggleSolution }) {
  const diffColor = boss.difficulty === "Intermediate" ? "#f59e0b" : "#ef4444";
  const [stepStatus, setStepStatus] = useState({});
  const [bossDefeated, setBossDefeated] = useState(false);
  const [showVictory, setShowVictory] = useState(false);

  // Parse steps from mission text
  const steps = boss.mission.split("\n").filter(line => line.trim().match(/^\d+\./)).map(line => line.replace(/^\d+\.\s*/, "").trim());

  const totalSteps = steps.length;
  const completedSteps = Object.values(stepStatus).filter(v => v).length;
  const progressPct = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
  const bossHP = Math.max(0, 100 - progressPct);

  const toggleStep = (idx) => {
    const newStatus = { ...stepStatus, [idx]: !stepStatus[idx] };
    setStepStatus(newStatus);
    const done = Object.values(newStatus).filter(v => v).length;
    if (done === totalSteps && totalSteps > 0) {
      setBossDefeated(true);
      setTimeout(() => setShowVictory(true), 300);
    } else {
      setBossDefeated(false);
      setShowVictory(false);
    }
  };

  return (
    <div className="jsl-content-inner">
      {/* Boss Header / Battle Card */}
      <div className="git-boss-banner" style={{ position: 'relative', overflow: 'hidden' }}>
        {showVictory && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, rgba(34,197,94,0.15), rgba(245,158,11,0.15))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '3rem', zIndex: 2,
            animation: 'fadeIn 0.5s ease',
          }}>⚔️💥 VICTORY! 💥⚔️</div>
        )}
        <div className="git-boss-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>⚔️</span>
          {boss.title}
        </div>
        <div className="git-boss-subtitle">{boss.description}</div>

        {/* Difficulty & HP Bar */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', alignItems: 'center', marginTop: '0.5rem' }}>
          <span className="jsl-diff-badge" style={{ color: diffColor, borderColor: `${diffColor}33`, background: `${diffColor}15`, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
            <span>💀</span> {boss.difficulty}
          </span>
          <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span>❤️ Boss HP</span>
            <div className="git-progress-bar" style={{ width: '120px', height: '6px', margin: 0 }}>
              <div className="git-progress-fill" style={{
                width: `${bossHP}%`,
                background: bossHP > 50 ? 'linear-gradient(90deg, #22c55e, #84cc16)' :
                           bossHP > 25 ? 'linear-gradient(90deg, #f59e0b, #f97316)' :
                           'linear-gradient(90deg, #ef4444, #dc2626)',
                transition: 'width 0.5s ease',
              }} />
            </div>
            <span style={{ fontWeight: 700, color: bossHP > 50 ? '#22c55e' : bossHP > 25 ? '#f59e0b' : '#ef4444' }}>{bossHP}%</span>
          </span>
        </div>
      </div>

      {/* Battle Progress */}
      <div style={{ margin: '0.75rem 0', padding: '0.75rem', background: 'rgba(255,255,255,0.025)', borderRadius: '8px', border: '1px solid var(--jsl-border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#e2e8f0' }}>⚔️ Battle Progress</span>
          <span style={{ fontSize: '0.7rem', color: completedSteps === totalSteps ? '#22c55e' : '#f59e0b' }}>
            {completedSteps}/{totalSteps} steps
          </span>
        </div>
        <div className="git-progress-bar" style={{ height: '6px' }}>
          <div className="git-progress-fill" style={{
            width: `${progressPct}%`,
            background: 'linear-gradient(90deg, #ef4444, #f59e0b, #22c55e)',
            transition: 'width 0.5s ease',
          }} />
        </div>
      </div>

      {/* Mission / Step Gauntlet */}
      <div className="jsl-section" style={{ marginTop: '0.5rem' }}>
        <h3 className="jsl-section-title">🎯 Mission Gauntlet</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.5rem' }}>
          {steps.map((step, i) => {
            const isDone = stepStatus[i];
            return (
              <div
                key={i}
                className={`git-boss-step ${isDone ? 'done' : ''} ${stepStatus[i] === undefined ? 'pending' : ''}`}
                onClick={() => toggleStep(i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.6rem',
                  padding: '0.55rem 0.75rem',
                  borderRadius: '8px',
                  border: `1px solid ${isDone ? 'rgba(34,197,94,0.2)' : 'var(--jsl-border)'}`,
                  background: isDone ? 'rgba(34,197,94,0.06)' : 'rgba(255,255,255,0.02)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  userSelect: 'none',
                }}
              >
                <div style={{
                  width: '24px', height: '24px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.7rem', fontWeight: 700,
                  background: isDone ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.05)',
                  border: `2px solid ${isDone ? '#22c55e' : 'var(--jsl-border)'}`,
                  color: isDone ? '#22c55e' : '#64748b',
                  flexShrink: 0,
                  transition: 'all 0.2s ease',
                }}>
                  {isDone ? '✓' : i + 1}
                </div>
                <span style={{ fontSize: '0.82rem', color: isDone ? '#22c55e' : '#e2e8f0', flex: 1 }}>
                  {step}
                </span>
                {isDone && (
                  <span style={{ fontSize: '0.7rem', color: '#22c55e' }}>✅ Done</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Boss Defeated Banner */}
      {bossDefeated && (
        <div style={{
          margin: '0.75rem 0', padding: '1rem',
          background: 'linear-gradient(135deg, rgba(34,197,94,0.1), rgba(245,158,11,0.1))',
          border: '1px solid rgba(34,197,94,0.25)',
          borderRadius: '12px',
          textAlign: 'center',
          animation: 'fadeIn 0.5s ease',
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>🏆⚔️🏆</div>
          <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#22c55e', marginBottom: '0.3rem' }}>BOSS DEFEATED!</div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>You have conquered {boss.title}. +100 XP earned!</div>
        </div>
      )}

      {showHint && <div className="jsl-hint-box"><strong>💡 Hint:</strong> {boss.hint}</div>}
      {showSolution && (
        <div className="jsl-solution-box">
          <h4>Solution</h4>
          <pre className="jsl-code-block"><code>{boss.solution}</code></pre>
        </div>
      )}

      <div className="jsl-content-actions">
        <button className="jsl-btn-ghost" onClick={onToggleHint}>{showHint ? "Hide Hint" : "💡 Show Hint"}</button>
        <button className="jsl-btn-ghost" onClick={onToggleSolution}>{showSolution ? "Hide Solution" : "🔍 Show Solution"}</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// CONFLICT VIEW — Enhanced with Steps, Validation, Rewards
// ═══════════════════════════════════════════════════

function ConflictView({ conflict, onResolved }) {
  const [step, setStep] = useState(0); // 0=scenario, 1=edit, 2=verify
  const [resolution, setResolution] = useState("");
  const [resolved, setResolved] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const diffClass = conflict.difficulty.toLowerCase();

  const diffColor = conflict.difficulty === "Easy" ? "#22c55e" :
                    conflict.difficulty === "Medium" ? "#f59e0b" :
                    conflict.difficulty === "Hard" ? "#ef4444" : "#a78bfa";

  const handleVerify = () => {
    if (resolution.trim().length > 0) {
      setStep(2);
      setResolved(true);
      onResolved();
      setTimeout(() => setShowReward(true), 400);
    }
  };

  const filename = Object.keys(conflict.files)[0] || "file.js";
  const fileData = conflict.files[filename];

  // Syntax color function for conflict code
  const renderConflictCode = () => {
    if (!fileData) return null;
    return (
      <pre className="git-conflict-code">
        <span className="git-conflict-marker">{'<<<<<<< HEAD (Current Change)'}</span>
        {'\n'}
        <span style={{ color: '#e2e8f0' }}>{fileData.current || ''}</span>
        {'\n'}
        <span className="git-conflict-separator">{'======='}</span>
        {'\n'}
        <span style={{ color: '#e2e8f0' }}>{fileData.incoming || ''}</span>
        {'\n'}
        <span className="git-conflict-marker">{`>>>>>>> Incoming (${filename})`}</span>
      </pre>
    );
  };

  const difficultyStars = conflict.difficulty === "Easy" ? "⭐" :
                           conflict.difficulty === "Medium" ? "⭐⭐" :
                           conflict.difficulty === "Hard" ? "⭐⭐⭐" : "⭐⭐⭐⭐";

  return (
    <div className="jsl-content-inner">
      {/* Header */}
      <div className="jsl-chapter-header">
        <span className="jsl-chapter-badge" style={{ background: `${diffColor}1a`, borderColor: `${diffColor}2e`, color: diffColor }}>
          ⚔️ Conflict Arena
        </span>
        <h2 className="jsl-content-title">{conflict.title}</h2>
        <div className="jsl-chapter-meta">
          <span className={`git-conflict-difficulty ${diffClass}`} style={{ background: `${diffColor}15`, color: diffColor, border: `1px solid ${diffColor}30` }}>
            {difficultyStars} {conflict.difficulty}
          </span>
        </div>
      </div>

      {/* Resolution Steps Progress */}
      <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '1rem' }}>
        {['📖 Understand', '✏️ Resolve', '✅ Verify'].map((label, i) => (
          <div key={i} style={{
            flex: 1, padding: '0.4rem 0.5rem', borderRadius: '6px',
            fontSize: '0.7rem', fontWeight: 600, textAlign: 'center',
            background: step >= i ? `${diffColor}15` : 'rgba(255,255,255,0.02)',
            border: `1px solid ${step >= i ? `${diffColor}30` : 'var(--jsl-border)'}`,
            color: step >= i ? diffColor : '#64748b',
            transition: 'all 0.3s ease',
          }}>
            {label}
          </div>
        ))}
      </div>

      {/* Scenario Section */}
      <div className="jsl-section" style={{ marginBottom: '0.75rem' }}>
        <h3 className="jsl-section-title" style={{ color: diffColor }}>Scenario</h3>
        <p className="jsl-text" style={{ fontSize: '0.82rem' }}>{conflict.scenario}</p>
      </div>

      {/* Step 1: Understanding Guide */}
      {step >= 0 && step < 2 && (
        <div style={{
          padding: '0.5rem 0.75rem', marginBottom: '0.75rem',
          background: 'rgba(96,165,250,0.05)', borderRadius: '8px',
          border: '1px solid rgba(96,165,250,0.15)',
        }}>
          <h4 style={{ fontSize: '0.75rem', fontWeight: 700, color: '#60a5fa', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            📋 Resolution Guide
          </h4>
          <ol style={{ fontSize: '0.72rem', color: '#94a3b8', paddingLeft: '1rem', lineHeight: '1.8' }}>
            <li>Read both versions: <span style={{ color: '#ef4444' }}>HEAD</span> (yours) vs <span style={{ color: '#f59e0b' }}>Incoming</span></li>
            <li>Decide which code to keep, or combine both versions</li>
            <li>Remove the conflict markers: <code style={{ background: 'rgba(239,68,68,0.1)', padding: '0.1rem 0.3rem', borderRadius: '3px', fontSize: '0.65rem' }}>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code>, <code style={{ background: 'rgba(96,165,250,0.1)', padding: '0.1rem 0.3rem', borderRadius: '3px', fontSize: '0.65rem' }}>=======</code>, <code style={{ background: 'rgba(245,158,11,0.1)', padding: '0.1rem 0.3rem', borderRadius: '3px', fontSize: '0.65rem' }}>&gt;&gt;&gt;&gt;&gt;&gt;</code></li>
            <li>Type the resolved code in the editor below</li>
            <li>Click <strong style={{ color: '#22c55e' }}>Verify Resolution</strong> to complete</li>
          </ol>
        </div>
      )}

      {/* Conflict Editor */}
      <div className="git-conflict-editor">
        <div className="git-conflict-header">
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span className="git-conflict-filename">📄 {filename}</span>
          </span>
          {resolved ? (
            <span style={{ color: '#22c55e', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span>✅</span> Resolved
            </span>
          ) : (
            <span style={{ color: '#ef4444', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span>🔴</span> Active Conflict
            </span>
          )}
        </div>

        {!resolved ? (
          <>
            <div style={{ position: 'relative' }}>
              {renderConflictCode()}
            </div>
            <div style={{ padding: '0.4rem 0.75rem', borderTop: '1px solid var(--jsl-border)', background: 'rgba(239,68,68,0.04)' }}>
              <span style={{ fontSize: '0.65rem', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span>⚠️</span> Both sides edited this file. Resolve the conflict by writing the correct code below.
              </span>
            </div>
            <textarea
              className="git-conflict-resolution"
              value={resolution}
              onChange={(e) => { setResolution(e.target.value); if (step === 0) setStep(1); }}
              placeholder={`Resolve the conflict in ${filename}...\n\nKeep the best version, remove conflict markers:\n<<<<<<< HEAD\n=======\n>>>>>>>`}
              onFocus={() => { if (step === 0) setStep(1); }}
              spellCheck={false}
            />
            <div style={{
              padding: '0.6rem 0.75rem',
              display: 'flex', gap: '0.5rem', justifyContent: 'space-between', alignItems: 'center',
              borderTop: '1px solid var(--jsl-border)',
              background: 'rgba(255,255,255,0.015)',
            }}>
              <span style={{ fontSize: '0.65rem', color: resolution.trim().length > 0 ? '#22c55e' : '#64748b' }}>
                {resolution.trim().length > 0
                  ? `✨ ${resolution.trim().split('\n').length} lines written`
                  : 'Write your resolution above'}
              </span>
              <button
                className="jsl-btn-secondary jsl-btn-sm"
                onClick={handleVerify}
                disabled={resolution.trim().length === 0}
                style={{
                  opacity: resolution.trim().length > 0 ? 1 : 0.5,
                  cursor: resolution.trim().length > 0 ? 'pointer' : 'not-allowed',
                  background: resolution.trim().length > 0 ? 'rgba(34,197,94,0.12)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${resolution.trim().length > 0 ? 'rgba(34,197,94,0.25)' : 'var(--jsl-border)'}`,
                  color: resolution.trim().length > 0 ? '#22c55e' : '#64748b',
                  display: 'flex', alignItems: 'center', gap: '0.3rem',
                }}
              >
                <span>✓</span> Verify Resolution
              </button>
            </div>
          </>
        ) : (
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <pre className="git-conflict-code" style={{ color: '#22c55e' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>✅ Conflict Resolved Successfully!</span>
              {'\n\n'}
              <span style={{ color: '#94a3b8' }}>// Resolved code:</span>
              {'\n'}
              <span style={{ color: '#e2e8f0' }}>{resolution}</span>
            </pre>
            {showReward && (
              <div style={{
                padding: '1rem',
                background: 'linear-gradient(135deg, rgba(34,197,94,0.08), rgba(245,158,11,0.08))',
                borderTop: '1px solid var(--jsl-border)',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '1.5rem' }}>🏆✨</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#22c55e' }}>
                  {conflict.difficulty === "Nightmare" ? "LEGENDARY! You conquered the Nightmare!" : "Conflict Slayer!"}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                  +{conflict.difficulty === "Easy" ? "50" : conflict.difficulty === "Medium" ? "100" : conflict.difficulty === "Hard" ? "200" : "500"} XP earned
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// TEAM VIEW — Enhanced with Sprint Board & Task Tracking
// ═══════════════════════════════════════════════════

function TeamView({ scenario, showHint, onToggleHint }) {
  // Task states: 'todo' | 'in-progress' | 'done'
  const [tasks, setTasks] = useState(
    scenario.sprint?.tasks?.map((t, i) => ({ id: `task-${i}`, title: t, status: 'todo', owner: i === 0 ? 'You' : i === 1 ? 'Alice' : 'Bob' })) || []
  );
  const [sprintPhase, setSprintPhase] = useState('planning'); // planning | active | review | complete
  const [sprintDaysLeft, setSprintDaysLeft] = useState(5);
  const [showSprintEnd, setShowSprintEnd] = useState(false);

  const advanceTask = (taskId) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== taskId) return t;
      if (t.status === 'todo') return { ...t, status: 'in-progress' };
      if (t.status === 'in-progress') return { ...t, status: 'done' };
      return t;
    }));
    if (sprintPhase === 'planning') setSprintPhase('active');
  };

  const regressTask = (taskId) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== taskId) return t;
      if (t.status === 'done') return { ...t, status: 'in-progress' };
      if (t.status === 'in-progress') return { ...t, status: 'todo' };
      return t;
    }));
  };

  const totalTasks = tasks.length;
  const doneTasks = tasks.filter(t => t.status === 'done').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;
  const todoTasks = tasks.filter(t => t.status === 'todo').length;
  const sprintProgress = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  const endSprint = () => {
    setSprintPhase('complete');
    setShowSprintEnd(true);
  };

  const colors = ['#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#60a5fa'];

  return (
    <div className="jsl-content-inner">
      {/* Header */}
      <div className="jsl-chapter-header">
        <span className="jsl-chapter-badge" style={{ background: "rgba(96,165,250,0.11)", borderColor: "rgba(96,165,250,0.18)", color: "#60a5fa" }}>
          👥 Team Collaboration
        </span>
        <h2 className="jsl-content-title">{scenario.title}</h2>
        <div className="jsl-chapter-meta">
          <span className="jsl-diff-badge" style={{ color: "#f59e0b", borderColor: "rgba(245,158,11,0.2)", background: "rgba(245,158,11,0.1)" }}>{scenario.difficulty}</span>
        </div>
      </div>

      {/* Sprint Header */}
      <div className="git-team-panel" style={{ marginBottom: '1rem', position: 'relative', overflow: 'hidden' }}>
        {showSprintEnd && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(34,197,94,0.12)',
            backdropFilter: 'blur(2px)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            zIndex: 5, borderRadius: '10px',
            animation: 'fadeIn 0.5s ease',
          }}>
            <div style={{ fontSize: '1.5rem' }}>🎉🏁🎉</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#22c55e' }}>Sprint Complete!</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Sprint {scenario.sprint?.name || 'Complete'}</div>
            <div style={{ fontSize: '0.7rem', color: '#f59e0b', marginTop: '0.3rem' }}>+150 XP earned!</div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span>📋</span> {scenario.sprint?.name || 'Sprint'}
            </div>
            <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.15rem' }}>
              {sprintPhase === 'planning' ? '🔵 Planning — Start working on tasks below' :
               sprintPhase === 'active' ? '🟡 In Progress — Team is working' :
               sprintPhase === 'review' ? '🟣 In Review — Almost done!' :
               '✅ Sprint Complete!'}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.7rem', color: '#64748b' }}>
              <span>⏱️</span>
              <span>{sprintDaysLeft} days left</span>
            </div>
          </div>
        </div>

        {/* Sprint Progress */}
        <div style={{ marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: '#64748b', marginBottom: '0.25rem' }}>
            <span>Sprint Progress</span>
            <span>{doneTasks}/{totalTasks} tasks • {sprintProgress}%</span>
          </div>
          <div className="git-progress-bar" style={{ height: '8px', margin: 0 }}>
            <div className="git-progress-fill" style={{
              width: `${sprintProgress}%`,
              background: 'linear-gradient(90deg, #60a5fa, #22c55e)',
              transition: 'width 0.5s ease',
            }} />
          </div>
        </div>

        {/* Sprint Stats */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <div style={{
            flex: 1, padding: '0.3rem', textAlign: 'center',
            borderRadius: '6px', fontSize: '0.65rem', fontWeight: 600,
            background: 'rgba(148,163,184,0.08)',
            color: todoTasks > 0 ? '#94a3b8' : '#64748b',
          }}>📋 {todoTasks} To Do</div>
          <div style={{
            flex: 1, padding: '0.3rem', textAlign: 'center',
            borderRadius: '6px', fontSize: '0.65rem', fontWeight: 600,
            background: 'rgba(245,158,11,0.08)',
            color: inProgressTasks > 0 ? '#f59e0b' : '#64748b',
          }}>🔄 {inProgressTasks} In Progress</div>
          <div style={{
            flex: 1, padding: '0.3rem', textAlign: 'center',
            borderRadius: '6px', fontSize: '0.65rem', fontWeight: 600,
            background: 'rgba(34,197,94,0.08)',
            color: doneTasks > 0 ? '#22c55e' : '#64748b',
          }}>✅ {doneTasks} Done</div>
        </div>
      </div>

      {/* Team Roster */}
      <div className="git-team-panel" style={{ marginBottom: '1rem', padding: '0.75rem' }}>
        <h3 className="jsl-section-title" style={{ marginBottom: '0.4rem', fontSize: '0.8rem' }}>👥 Team Roster</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          {scenario.team?.map((member) => {
            const idx = scenario.team.indexOf(member);
            const color = colors[idx % colors.length];
            const isYou = member.role === scenario.role || member.name === 'You';
            return (
              <div key={member.name} className="git-team-member" style={{ padding: '0.4rem 0.5rem' }}>
                <div className="git-team-avatar" style={{ background: color, width: '24px', height: '24px', fontSize: '0.6rem' }}>
                  {member.name[0]}
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span className="git-team-name" style={{ fontSize: '0.75rem' }}>
                    {member.name} {isYou && <span style={{ fontSize: '0.6rem', color: '#f59e0b', fontWeight: 700 }}>(You)</span>}
                  </span>
                  <span className="git-team-role" style={{ fontSize: '0.65rem' }}>— {member.role}</span>
                </div>
                {isYou && (
                  <span style={{
                    fontSize: '0.55rem', padding: '0.1rem 0.35rem',
                    borderRadius: '4px', fontWeight: 600,
                    background: 'rgba(245,158,11,0.1)', color: '#f59e0b',
                    border: '1px solid rgba(245,158,11,0.2)',
                  }}>ACTIVE</span>
                )}
                {!isYou && (
                  <span style={{ fontSize: '0.55rem', color: '#64748b' }}>
                    {member.name === 'Alice' && (doneTasks > 0 ? '✅ Done' : '⏳ Working')}
                    {member.name === 'Bob' && (inProgressTasks > 0 ? '🔄 Busy' : '⏳ Idle')}
                    {member.name === 'Carol' && (doneTasks >= 2 ? '✅ Reviewed' : '📋 Reviewing')}
                    {member.name === 'Dave' && '☕ Available'}
                    {!['Alice', 'Bob', 'Carol', 'Dave'].includes(member.name) && '👤 Online'}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Sprint Board - Kanban Style */}
      <div style={{ marginBottom: '1rem' }}>
        <h3 className="jsl-section-title" style={{ marginBottom: '0.5rem', fontSize: '0.8rem' }}>
          🎯 Sprint Board — Your Tasks
        </h3>
        <p style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '0.5rem' }}>
          Click a task to advance it: <span style={{ color: '#94a3b8' }}>To Do</span> → <span style={{ color: '#f59e0b' }}>In Progress</span> → <span style={{ color: '#22c55e' }}>Done</span>. Right-click to move back.
        </p>

        {/* Task Columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.4rem' }}>
          {/* To Do */}
          <div style={{
            padding: '0.4rem', borderRadius: '8px',
            background: 'rgba(148,163,184,0.04)',
            border: '1px solid var(--jsl-border)',
            minHeight: '100px',
          }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#94a3b8', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>
              📋 To Do
            </div>
            {tasks.filter(t => t.status === 'todo').map(t => (
              <div key={t.id} className="git-sprint-card" onClick={() => advanceTask(t.id)} title="Click to start" style={{
                padding: '0.4rem 0.5rem', marginBottom: '0.25rem',
                borderRadius: '6px', fontSize: '0.68rem',
                border: '1px solid var(--jsl-border)',
                background: 'rgba(255,255,255,0.03)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                color: '#94a3b8',
              }}>
                {t.title}
              </div>
            ))}
            {tasks.filter(t => t.status === 'todo').length === 0 && (
              <div style={{ fontSize: '0.6rem', color: '#475569', textAlign: 'center', padding: '0.5rem' }}>All tasks started! 🎯</div>
            )}
          </div>

          {/* In Progress */}
          <div style={{
            padding: '0.4rem', borderRadius: '8px',
            background: 'rgba(245,158,11,0.04)',
            border: '1px solid rgba(245,158,11,0.15)',
            minHeight: '100px',
          }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#f59e0b', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>
              🔄 In Progress
            </div>
            {tasks.filter(t => t.status === 'in-progress').map(t => (
              <div key={t.id} className="git-sprint-card"
                onClick={() => advanceTask(t.id)}
                onContextMenu={(e) => { e.preventDefault(); regressTask(t.id); }}
                title="Click to complete, right-click to move back"
                style={{
                  padding: '0.4rem 0.5rem', marginBottom: '0.25rem',
                  borderRadius: '6px', fontSize: '0.68rem',
                  border: '1px solid rgba(245,158,11,0.25)',
                  background: 'rgba(245,158,11,0.06)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  color: '#f59e0b',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <span style={{ fontSize: '0.55rem', color: '#f59e0b' }}>🔄</span>
                  {t.title}
                </div>
              </div>
            ))}
            {tasks.filter(t => t.status === 'in-progress').length === 0 && (
              <div style={{ fontSize: '0.6rem', color: '#475569', textAlign: 'center', padding: '0.5rem' }}>Click a task to start 🖱️</div>
            )}
          </div>

          {/* Done */}
          <div style={{
            padding: '0.4rem', borderRadius: '8px',
            background: 'rgba(34,197,94,0.04)',
            border: '1px solid rgba(34,197,94,0.15)',
            minHeight: '100px',
          }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#22c55e', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>
              ✅ Done
            </div>
            {tasks.filter(t => t.status === 'done').map(t => (
              <div key={t.id} className="git-sprint-card"
                onContextMenu={(e) => { e.preventDefault(); regressTask(t.id); }}
                title="Right-click to reopen"
                style={{
                  padding: '0.4rem 0.5rem', marginBottom: '0.25rem',
                  borderRadius: '6px', fontSize: '0.68rem',
                  border: '1px solid rgba(34,197,94,0.25)',
                  background: 'rgba(34,197,94,0.06)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  color: '#22c55e',
                  textDecoration: 'line-through',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <span>✅</span>
                  {t.title}
                </div>
              </div>
            ))}
            {tasks.filter(t => t.status === 'done').length === 0 && (
              <div style={{ fontSize: '0.6rem', color: '#475569', textAlign: 'center', padding: '0.5rem' }}>Complete tasks here 🏆</div>
            )}
          </div>
        </div>

        {/* Sprint End Button */}
        {sprintPhase !== 'complete' && doneTasks === totalTasks && totalTasks > 0 && (
          <div style={{ marginTop: '0.75rem', textAlign: 'center' }}>
            <button className="jsl-btn-mark"
              onClick={endSprint}
              style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)', color: '#22c55e', fontSize: '0.75rem', padding: '0.5rem 1.5rem' }}
            >
              🏁 End Sprint & Review
            </button>
          </div>
        )}
      </div>

      {/* Mission / Your Role */}
      <div className="jsl-section jsl-task-section">
        <h3 className="jsl-section-title">🎯 Your Role: {scenario.role}</h3>
        <div className="jsl-task-text" style={{ fontSize: '0.82rem' }}>
          <p style={{ fontWeight: 600, color: '#f59e0b', marginBottom: '0.5rem', fontSize: '0.75rem' }}>Sprint goal: Complete all tasks before the sprint ends!</p>
          {scenario.mission.split("\n").map((line, i) => {
            if (line.trim().match(/^\d+\./)) {
              return <li key={i} className="jsl-task-item" style={{ fontSize: '0.82rem' }}>{line.replace(/^\d+\.\s*/, '')}</li>;
            }
            if (line.trim().startsWith('**')) return <strong key={i} style={{ display: 'block', marginTop: '0.3rem' }}>{line.replace(/\*\*/g, '')}</strong>;
            return <p key={i} style={{ fontSize: '0.78rem' }}>{line}</p>;
          })}
        </div>
      </div>

      {showHint && <div className="jsl-hint-box"><strong>💡 Hint:</strong> {scenario.hint}</div>}

      <div className="jsl-content-actions">
        <button className="jsl-btn-ghost" onClick={onToggleHint}>{showHint ? 'Hide Hint' : '💡 Show Hint'}</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// INTERVIEW VIEW
// ═══════════════════════════════════════════════════

function InterviewView({ topic, onMarkDone, isDone }) {
  const [expandedQ, setExpandedQ] = useState(null);

  return (
    <div className="jsl-content-inner">
      <div className="jsl-chapter-header">
        <span className="jsl-chapter-badge" style={{ background: "rgba(252,211,77,0.11)", borderColor: "rgba(252,211,77,0.18)", color: "#fcd34d" }}>
          🎯 Interview Prep
        </span>
        <h2 className="jsl-content-title">{topic.title}</h2>
        <p className="jsl-text" style={{ marginTop: "0.5rem", fontSize: "0.82rem" }}>{topic.questions.length} questions to prepare for your Git interview.</p>
      </div>

      <div className="jsl-section">
        <h3 className="jsl-section-title">Practice Questions</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {topic.questions.map((q, i) => (
            <div key={i} className={`jsl-interview-q ${expandedQ === i ? "expanded" : ""}`}
              style={{ padding: "0.65rem 0.85rem", borderRadius: "0.5rem", border: "1px solid var(--jsl-border2)", background: expandedQ === i ? "rgba(252,211,77,0.05)" : "rgba(255,255,255,0.035)", cursor: "pointer", transition: "all 0.15s ease" }}
              onClick={() => setExpandedQ(expandedQ === i ? null : i)}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "22px", height: "22px", borderRadius: "50%", background: "rgba(252,211,77,0.12)", color: "#fcd34d", fontSize: "0.75rem", fontWeight: 900, flexShrink: 0 }}>{i + 1}</span>
                <span className="jsl-text" style={{ fontSize: "0.82rem", flex: 1 }}>{q}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, color: "#64748b", transition: "transform 0.2s ease", transform: expandedQ === i ? "rotate(180deg)" : "rotate(0deg)" }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
              {expandedQ === i && (
                <div style={{ marginTop: "0.5rem", paddingTop: "0.5rem", borderTop: "1px solid var(--jsl-border2)" }}>
                  <p className="jsl-text" style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Think through your answer. Consider explaining with a practical example and mentioning best practices.</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="jsl-content-actions">
        <button className={`jsl-btn-mark ${isDone ? "done" : ""}`} onClick={onMarkDone}>
          {isDone ? "✓ Reviewed" : "Mark as Reviewed"}
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// PLAYGROUND VIEW
// ═══════════════════════════════════════════════════

function PlaygroundView({ achievements }) {
  const [clickedCmd, setClickedCmd] = useState(null);

  const handleQuickCmd = (cmd) => {
    setClickedCmd(cmd);
    // Focus the terminal input by dispatching a custom event
    window.dispatchEvent(new CustomEvent('git-quick-cmd', { detail: { command: cmd } }));
  };

  return (
    <div className="jsl-content-inner" style={{ textAlign: "center" }}>
      <div className="jsl-chapter-header">
        <span className="jsl-chapter-badge" style={{ background: "rgba(245,158,11,0.11)", borderColor: "rgba(245,158,11,0.18)", color: "#f59e0b" }}>
          <FiBook size={16} /> Git Playground
        </span>
        <h2 className="jsl-content-title">Git Playground</h2>
        <p className="jsl-text" style={{ marginTop: "0.5rem", fontSize: "0.82rem" }}>
          A sandbox environment to practice any Git command. Click a quick command below or type in the terminal. Watch the commit graph update in real-time!
        </p>
      </div>

      {/* Quick Commands */}
      <div className="jsl-section" style={{ textAlign: "left", marginTop: "0.75rem" }}>
        <h3 className="jsl-section-title">Quick Commands</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.5rem" }}>
          {[
            { cmd: "git init", label: "Init Repo" },
            { cmd: "git branch feature", label: "Create Branch" },
            { cmd: "git checkout feature", label: "Switch" },
            { cmd: "git checkout -b new-feature", label: "Create & Switch" },
            { cmd: "git merge feature", label: "Merge" },
            { cmd: "git log --oneline --graph", label: "Log Graph" },
            { cmd: "git status", label: "Status" },
            { cmd: "git branch", label: "List Branches" },
            { cmd: "git stash", label: "Stash" },
          ].map((btn) => (
            <span
              key={btn.cmd}
              className="lab-feature-chip"
              style={{ fontSize: "0.7rem", cursor: "pointer", transition: "all 0.15s ease" }}
              onClick={() => handleQuickCmd(btn.cmd)}
              title={`Execute: ${btn.cmd}`}
            >
              {btn.label}
            </span>
          ))}
        </div>
        {clickedCmd && (
          <p style={{ fontSize: "0.75rem", color: "#22c55e", marginTop: "0.4rem" }}>
            Clicked: <code style={{ background: "rgba(34,197,94,0.1)", padding: "0.1rem 0.3rem", borderRadius: "4px" }}>{clickedCmd}</code> — type it in the terminal below
          </p>
        )}
      </div>

      {/* Achievements */}
      {achievements.length > 0 && (
        <div className="jsl-section" style={{ textAlign: "left", marginTop: "0.75rem" }}>
          <h3 className="jsl-section-title">🏆 Achievements ({achievements.length})</h3>
          <div className="git-achievement-grid" style={{ marginTop: "0.5rem" }}>
            {achievements.map((ach) => (
              <div key={ach.id} className="git-achievement unlocked">
                <span className="git-achievement-icon">🏅</span>
                <span className="git-achievement-title">{ach.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
