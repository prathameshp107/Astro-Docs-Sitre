// ────────────────────────────────────────────────────
// Git & GitHub Labs — Complete Curriculum Data
// 30 Lessons · 6 Sections · Boss Battles · Challenges
// ────────────────────────────────────────────────────

// ─── HELPERS ───

function testCommand(expected) {
  return (command) => command.trim() === expected.trim();
}

function testCommandContains(pattern) {
  return (command) => command.includes(pattern);
}

function testCommandRegex(regex) {
  return (command) => regex.test(command);
}

// ─── GIT FUNDAMENTALS (1-7) ───

export const GIT_LESSONS = [
  {
    id: "what-is-git",
    chapter: 1,
    title: "What is Git?",
    section: "Git Fundamentals",
    level: "Beginner",
    tags: ["Git", "VCS", "Version Control"],
    conceptExplanation: `Git is a distributed version control system that tracks changes in your codebase over time.

**Why Git?**
• **History** — Every change is recorded. You can go back to any point in time.
• **Collaboration** — Multiple people can work on the same project simultaneously.
• **Branching** — Work on features independently without affecting the main codebase.
• **Safety** — Your code is stored in multiple locations (distributed).

**Key Concepts:**
• **Repository** — A folder tracked by Git. Contains all files and history.
• **Commit** — A snapshot of your files at a point in time.
• **Branch** — A movable pointer to a commit. Main line of development.
• **Working Directory** — The files you're currently editing.
• **Staging Area** — Files prepared to be committed.

The three states of Git:
1. **Modified** — File changed but not staged
2. **Staged** — File marked for commit
3. **Committed** — File safely stored in Git history`,
    keyRules: [
      "Git tracks content, not files — it knows what changed between versions",
      "Most Git operations are local — you only need a network for push/pull/fetch",
      "The three states (modified, staged, committed) are the core of Git's design",
      "A commit hash (SHA-1) uniquely identifies every commit",
      "Git doesn't delete anything for months — it's very hard to lose data",
    ],
    mission: `Initialize a Git repository and make your first commit.

**Scenario:** You're starting a new JavaScript project. Set up Git tracking and create the initial commit with a README file.

**Steps:**
1. Initialize a new Git repository
2. Create a README.md file
3. Stage the file
4. Commit with message "Initial commit"`,
    initialRepo: {
      commits: [],
      branches: { main: null },
      HEAD: { type: "branch", name: "main" },
    },
    missionValidation: (commands) => {
      const hasInit = commands.some(c => /^git init/i.test(c));
      const hasAdd = commands.some(c => /^git add/i.test(c));
      const hasCommit = commands.some(c => /^git commit/i.test(c));
      return hasInit && hasAdd && hasCommit;
    },
    starterCode: "",
    solutionCode: `git init
# Creates a new .git directory

echo "# My Project" > README.md
# Creates a README file

git add README.md
# Stages the file for commit

git commit -m "Initial commit"
# Creates the first commit in the repository`,
    hint: "Use 'git init' to create a repo. Create a file, then 'git add <file>' to stage it, then 'git commit -m \"message\"' to commit.",
    tests: [
      { name: "Repository initialized (git init)", validate: testCommandContains("git init") },
      { name: "File staged (git add)", validate: testCommandContains("git add") },
      { name: "Commit created (git commit)", validate: testCommandContains("git commit") },
    ],
  },
  {
    id: "git-init",
    chapter: 2,
    title: "Git Init",
    section: "Git Fundamentals",
    level: "Beginner",
    tags: ["Init", "Repository", "Setup"],
    conceptExplanation: `'git init' creates a new Git repository. It initializes a .git directory inside your project folder.

**What happens when you run git init?**
• Creates a .git/ directory with subdirectories for objects, refs, and HEAD
• Sets up the 'main' branch (default)
• No commits exist yet — the repository is empty

**Common Options:**
• 'git init' — Initialize in current directory
• 'git init <directory>' — Create a new directory and initialize
• 'git init --bare' — Create a bare repository (for servers/remote)
• 'git init --initial-branch=main' — Set custom initial branch name

The .git directory is your repository's brain. Never modify it manually unless you know what you're doing.`,
    keyRules: [
      "Run 'git init' once per project — never nest Git repositories",
      "The .git folder contains ALL history — it's what makes Git a repository",
      "Use 'git init --bare' for central/shared repositories (servers)",
      "Default branch changed from 'master' to 'main' in modern Git",
      "You can re-init an existing repo — it won't overwrite existing config",
    ],
    mission: `Initialize a new project repository with git init.

**Scenario:** You're setting up a new web application called "myapp". Create its directory and initialize Git.

**Steps:**
1. Create a directory called 'myapp'
2. Initialize a Git repository inside it
3. Verify the .git directory exists`,
    initialRepo: {
      commits: [],
      branches: {},
      HEAD: null,
    },
    missionValidation: (commands) => {
      return commands.some(c => /^git init/i.test(c));
    },
    starterCode: "",
    solutionCode: `mkdir myapp
cd myapp
git init
ls -la .git`,
    hint: "Create the directory first, then cd into it and run 'git init'.",
    tests: [
      { name: "git init command executed", validate: testCommandContains("git init") },
    ],
  },
  {
    id: "git-add",
    chapter: 3,
    title: "Git Add & Stage",
    section: "Git Fundamentals",
    level: "Beginner",
    tags: ["Add", "Stage", "Index", "Staging"],
    conceptExplanation: `'git add' moves changes from your working directory to the staging area (also called the index).

**The Staging Area:**
Working Directory → [git add] → Staging Area → [git commit] → Repository

**Common Uses:**
• 'git add file.js' — Stage a specific file
• 'git add .' — Stage all changes in current directory
• 'git add -p' — Interactively choose which changes to stage (hunks)
• 'git add -A' — Stage all changes (including deletions)
• 'git add -u' — Stage modified and deleted files (not new ones)

**Why Stage?**
• You can selectively commit only parts of your changes
• Review what you're about to commit
• Split a large change into multiple focused commits`,
    keyRules: [
      "Always review what you're staging before committing",
      "Use 'git add -p' for granular control — commit logical units",
      "Never stage sensitive files (secrets, .env, passwords)",
      "Use .gitignore to automatically exclude files from being tracked",
      "git add can stage resolved files during merge conflict resolution",
    ],
    mission: `Stage specific files for a commit.

**Scenario:** You have a project with three files: index.html, style.css, and secret.txt. Stage only the web files, not the secret.

**Steps:**
1. Ensure .gitignore contains secret.txt
2. Stage index.html
3. Stage style.css
4. Check what's staged`,
    initialRepo: {
      setup: true,
      workingDirectory: {
        "index.html": "<h1>Hello</h1>",
        "style.css": "body { color: blue; }",
        "secret.txt": "API_KEY=abc123",
        ".gitignore": "secret.txt",
      },
    },
    missionValidation: (commands) => {
      const stagedHtml = commands.some(c => c.includes("git add") && (c.includes("index.html") || c.includes(".")));
      const stagedCss = commands.some(c => c.includes("git add") && (c.includes("style.css") || c.includes(".")));
      return stagedHtml && stagedCss;
    },
    starterCode: "",
    solutionCode: `echo "secret.txt" > .gitignore
git add index.html
git add style.css
git status`,
    hint: "Use 'git add <filename>' to stage individual files. Use 'git status' to see what's staged.",
    tests: [
      { name: "index.html staged", validate: testCommandRegex(/git add.*index\.html/) },
      { name: "style.css staged", validate: testCommandRegex(/git add.*style\.css/) },
    ],
  },
  {
    id: "git-commit",
    chapter: 4,
    title: "Git Commit",
    section: "Git Fundamentals",
    level: "Beginner",
    tags: ["Commit", "Snapshot", "History"],
    conceptExplanation: `'git commit' creates a snapshot of your staged changes and permanently stores it in the Git history.

**Anatomy of a Commit:**
• **Hash** — Unique SHA-1 identifier (e.g., a1b2c3d)
• **Author** — Who made the change
• **Date** — When the commit was created
• **Message** — Description of what changed (and why)
• **Snapshot** — Full state of all tracked files
• **Parent** — Previous commit(s)

**Commit Best Practices:**
• Write clear, descriptive commit messages
• Present tense: "Add login feature" not "Added login feature"
• First line ≤ 50 characters, then blank line, then detailed body
• Each commit should be a logical, atomic unit of change

**Common Options:**
• 'git commit -m "message"' — Quick inline message
• 'git commit -a -m "message"' — Stage all tracked files before committing (skip git add)
• 'git commit --amend' — Modify the last commit`,
    keyRules: [
      "Commit early, commit often — small commits are easier to review and revert",
      "Write commit messages that explain WHY, not just WHAT",
      "Use 'git commit -a' carefully — it might commit unintended changes",
      "Never amend commits that have been pushed to a shared branch",
      "A good commit message is as important as good code",
    ],
    mission: `Create your first meaningful commit.

**Scenario:** You've built a landing page. Stage and commit the HTML and CSS files with a descriptive message.

**Steps:**
1. Create index.html with basic HTML structure
2. Create style.css with body styling
3. Stage both files
4. Commit with message "feat: add landing page with styles"`,
    initialRepo: {
      setup: true,
      pendingSetup: true,
    },
    missionValidation: (commands) => {
      return commands.some(c => /^git commit/i.test(c));
    },
    starterCode: "",
    solutionCode: `echo '<!DOCTYPE html><html><head><title>My App</title><link rel="stylesheet" href="style.css"></head><body><h1>Welcome</h1></body></html>' > index.html
echo 'body { font-family: system-ui; margin: 0; padding: 2rem; }' > style.css
git add index.html style.css
git commit -m "feat: add landing page with styles"`,
    hint: "Create both files, stage them with 'git add', then commit with 'git commit -m \"your message\"'.",
    tests: [
      { name: "Files staged before commit", validate: testCommandContains("git add") },
      { name: "Commit created", validate: testCommandRegex(/git commit/) },
    ],
  },
  {
    id: "git-status",
    chapter: 5,
    title: "Git Status & Log",
    section: "Git Fundamentals",
    level: "Beginner",
    tags: ["Status", "Log", "History", "Inspect"],
    conceptExplanation: `'git status' and 'git log' are your primary tools for inspecting the state of your repository.

**git status shows:**
• Which branch you're on
• Files that are modified but not staged
• Files that are staged for commit
• Untracked files (new files Git doesn't know about)

**git log shows:**
• Commit history in reverse chronological order
• Each commit's hash, author, date, and message
• 'git log --oneline' — Compact one-line view
• 'git log --graph' — Visual branch graph
• 'git log --author="name"' — Filter by author

**Common Patterns:**
• 'git status -s' — Short, machine-readable format
• 'git log --oneline --graph --decorate' — My daily view`,
    keyRules: [
      "Run 'git status' before and after every significant operation",
      "Use 'git status' to check if you have uncommitted changes before switching branches",
      "Clean working directory = no modified or staged files",
      "Use 'git log --oneline --graph' to understand branch history visually",
      "Commit often so your git log tells a meaningful story",
    ],
    mission: `Understand your repository state.

**Scenario:** A repository has been set up with two commits. Inspect the current state using status and log.

**Steps:**
1. Run git status to see current branch
2. Check git log to see commit history
3. Make a change to a file
4. Run git status again to see the modification`,
    initialRepo: {
      setup: true,
      commits: [
        { id: "a1b2c3d", message: "Initial commit", parent: null },
        { id: "e4f5g6h", message: "Add README", parent: "a1b2c3d" },
      ],
      branches: { main: "e4f5g6h" },
      HEAD: { type: "branch", name: "main" },
      files: { "README.md": "# My Project" },
    },
    missionValidation: (commands) => {
      return commands.some(c => /^git status/i.test(c)) &&
             commands.some(c => /^git log/i.test(c));
    },
    starterCode: "",
    solutionCode: `git status
git log --oneline
echo "New feature" >> README.md
git status`,
    hint: "Run 'git status' to see state, 'git log' (or 'git log --oneline') to see history.",
    tests: [
      { name: "git status executed", validate: testCommandContains("git status") },
      { name: "git log executed", validate: testCommandContains("git log") },
    ],
  },
  {
    id: "git-diff",
    chapter: 6,
    title: "Git Diff",
    section: "Git Fundamentals",
    level: "Beginner",
    tags: ["Diff", "Changes", "Review"],
    conceptExplanation: `'git diff' shows the changes between different states in your repository — what lines were added, removed, or modified.

**Common Uses:**
• 'git diff' — Show unstaged changes (working directory vs staging area)
• 'git diff --staged' — Show staged changes (staging area vs last commit)
• 'git diff HEAD' — Show all changes (working + staged vs last commit)
• 'git diff branch1..branch2' — Compare two branches
• 'git diff commit1..commit2' — Compare two commits

**Output Format:**
• Lines starting with — were removed
• Lines starting with + were added
• @@ hunk headers show where the change occurs`,
    keyRules: [
      "Always review changes with 'git diff' before staging or committing",
      "Use 'git diff --staged' to double-check what you're about to commit",
      "Use 'git diff branch' to preview what merging would change",
      "Git diff is your code review tool — use it before every PR",
      "Add '--word-diff' to see word-level changes instead of line-level",
    ],
    mission: `Review changes before committing.

**Scenario:** You've modified two files. Use git diff to review what changed before staging and committing.

**Steps:**
1. Check unstaged changes with git diff
2. Stage one file
3. Check staged changes with git diff --staged
4. Commit the staged file`,
    initialRepo: {
      setup: true,
      commits: [
        { id: "a1b2c3d", message: "Initial commit", parent: null },
      ],
      branches: { main: "a1b2c3d" },
      HEAD: { type: "branch", name: "main" },
    },
    missionValidation: (commands) => {
      return commands.some(c => /^git diff/i.test(c));
    },
    starterCode: "",
    solutionCode: `# Edit a file
echo "console.log('hello');" >> app.js
echo "/* styles */" >> style.css

# Review changes
git diff

# Stage and commit
git add app.js
git diff --staged
git commit -m "Add app.js with hello world"`,
    hint: "Use 'git diff' to see unstaged changes and 'git diff --staged' to see what's staged.",
    tests: [
      { name: "git diff used to review changes", validate: testCommandContains("git diff") },
    ],
  },
  {
    id: "gitignore",
    chapter: 7,
    title: "Gitignore",
    section: "Git Fundamentals",
    level: "Beginner",
    tags: [".gitignore", "Ignore", "Exclude", "Node"],
    conceptExplanation: `.gitignore tells Git which files to intentionally NOT track. This keeps your repository clean and prevents sensitive files from being committed.

**Common patterns to ignore:**
• **Dependencies:** node_modules/, vendor/, .venv/
• **Build output:** dist/, build/, out/, *.bundle.js
• **Environment:** .env, .env.local, *.config.js (personal)
• **OS files:** .DS_Store, Thumbs.db
• **IDE files:** .vscode/, .idea/, *.sublime-*
• **Logs:** *.log, npm-debug.log*

**Glob Patterns:**
• '*' matches everything
• '*.log' matches all log files
• 'build/' matches a directory
• '!important.txt' negates (don't ignore this)
• '**/node_modules' matches nested node_modules`,
    keyRules: [
      "Always create .gitignore at the start of a project — before the first commit",
      "Never commit secrets, API keys, passwords, or .env files",
      "Don't ignore .gitignore itself (yes, it happens)",
      "Use templates from github.com/github/gitignore for your stack",
      "If a file is already tracked, .gitignore won't stop it — use git rm --cached",
    ],
    mission: `Set up a proper .gitignore for a Node.js project.

**Scenario:** You're starting a Node.js project. Create a comprehensive .gitignore that excludes dependencies, build output, environment files, and OS files.

**Steps:**
1. Create .gitignore with patterns for node_modules, dist, .env, .DS_Store
2. Stage and commit the .gitignore
3. Verify node_modules is ignored`,
    initialRepo: {
      setup: true,
      commits: [{ id: "a1b2c3d", message: "Initial commit", parent: null }],
      branches: { main: "a1b2c3d" },
      HEAD: { type: "branch", name: "main" },
    },
    missionValidation: (commands) => {
      return commands.some(c => /^git commit/i.test(c));
    },
    starterCode: "",
    solutionCode: `cat > .gitignore << 'EOF'
node_modules/
dist/
.env
.env.local
.DS_Store
*.log
.vscode/
.idea/
EOF

git add .gitignore
git commit -m "chore: add .gitignore"`,
    hint: "Create a .gitignore file with patterns like node_modules/, .env, dist/. One pattern per line.",
    tests: [
      { name: ".gitignore created", validate: testCommandContains("gitignore") || testCommandContains(".gitignore") },
      { name: "Commit made", validate: testCommandRegex(/git commit/) },
    ],
  },

  // ─── BRANCHING (8-12) ───

  {
    id: "git-branch",
    chapter: 8,
    title: "Git Branch",
    section: "Branching",
    level: "Beginner",
    tags: ["Branch", "Branching", "Isolation"],
    conceptExplanation: `A branch is a lightweight, movable pointer to a specific commit. Branching lets you develop features, fix bugs, and experiment in isolation.

**Key Branching Concepts:**
• 'main' (or 'master') is the default branch — usually the stable/production code
• Creating a branch is instant and cheap — it's just a pointer
• Each branch has its own working directory state
• When you commit on a branch, the pointer moves forward

**Branch Commands:**
• 'git branch <name>' — Create a new branch at current commit
• 'git branch' — List all local branches (* marks current)
• 'git branch -d <name>' — Delete a branch (safe: won't delete unmerged)
• 'git branch -D <name>' — Force delete a branch
• 'git branch -m <old> <new>' — Rename a branch`,
    keyRules: [
      "Branches are cheap — create one for every feature, bugfix, or experiment",
      "Name branches descriptively: feature/login, bugfix/header-height, hotfix/1.2.3",
      "Delete branches after merging — they clutter the branch list",
      "Never work directly on main — always create a feature branch",
      "Branch names should use kebab-case: feature/add-auth, not feature/add_auth",
    ],
    mission: `Create and manage branches.

**Scenario:** You're working on a new login feature. Create a branch for it, do some work, and see your branches.

**Steps:**
1. Create a branch called 'feature/login'
2. Switch to it
3. Create a file login.html
4. Stage and commit
5. List all branches to see the result`,
    initialRepo: {
      setup: true,
      commits: [{ id: "a1b2c3d", message: "Initial commit", parent: null }],
      branches: { main: "a1b2c3d" },
      HEAD: { type: "branch", name: "main" },
    },
    missionValidation: (commands) => {
      return commands.some(c => /^git branch/i.test(c)) &&
             (commands.some(c => /^git checkout/i.test(c)) || commands.some(c => /^git switch/i.test(c)));
    },
    starterCode: "",
    solutionCode: `git branch feature/login
git checkout feature/login
# or: git checkout -b feature/login (create and switch in one command)
echo '<h1>Login</h1>' > login.html
git add login.html
git commit -m "feat: add login page"
git branch`,
    hint: "Use 'git branch <name>' to create, 'git checkout <name>' to switch, 'git branch' to list all.",
    tests: [
      { name: "Branch created", validate: testCommandContains("git branch") },
      { name: "Switched branches", validate: testCommandContains("git checkout") || testCommandContains("git switch") },
    ],
  },
  {
    id: "git-checkout",
    chapter: 9,
    title: "Git Checkout & Switch",
    section: "Branching",
    level: "Beginner",
    tags: ["Checkout", "Switch", "Navigate"],
    conceptExplanation: `'git checkout' and 'git switch' move your HEAD pointer to a different branch or commit.

**git checkout:**
• 'git checkout <branch>' — Switch to an existing branch
• 'git checkout -b <branch>' — Create and switch to a new branch
• 'git checkout <commit>' — Detached HEAD state (view historical commit)
• 'git checkout -- <file>' — Discard changes to a file

**git switch (newer, cleaner syntax):**
• 'git switch <branch>' — Switch to an existing branch
• 'git switch -c <branch>' — Create and switch to a new branch
• 'git switch -' — Switch to the previous branch

**Detached HEAD State:**
Your HEAD points directly to a commit instead of a branch. Changes made here will be lost when you switch to a branch — unless you create a new branch first.`,
    keyRules: [
      "Commit or stash your changes before switching branches (clean working directory)",
      "Use 'git switch' for clarity — checkout does too many things",
      "In detached HEAD state, always create a branch to save your work",
      "Use 'git checkout -' or 'git switch -' to quickly go back to your previous branch",
      "Checkout a specific file with 'git checkout -- <file>' to undo changes",
    ],
    mission: `Navigate between branches efficiently.

**Scenario:** You have two feature branches. Switch between them, make changes on each, and use the quick switch shortcut.

**Steps:**
1. Switch to feature/login
2. Add a file and commit
3. Switch to feature/dashboard
4. Add a file and commit
5. Use the shortcut to switch back to the previous branch`,
    initialRepo: {
      setup: true,
      commits: [{ id: "a1b2c3d", message: "Initial commit", parent: null }],
      branches: { main: "a1b2c3d", "feature/login": "a1b2c3d", "feature/dashboard": "a1b2c3d" },
      HEAD: { type: "branch", name: "main" },
    },
    missionValidation: (commands) => {
      return commands.filter(c => /^git checkout/i.test(c) || /^git switch/i.test(c)).length >= 2;
    },
    starterCode: "",
    solutionCode: `git checkout feature/login
echo '<div>Login form</div>' > login.html
git add login.html
git commit -m "Add login form"

git checkout feature/dashboard
echo '<div>Dashboard</div>' > dashboard.html
git add dashboard.html
git commit -m "Add dashboard page"

git checkout -  # back to feature/login`,
    hint: "Use 'git checkout <branch>' or 'git switch <branch>'. Use 'git checkout -' to go back to the previous branch.",
    tests: [
      { name: "Switched between branches", validate: (c) => (c.match(/git checkout|git switch/g) || []).length >= 2 },
    ],
  },
  {
    id: "git-merge",
    chapter: 10,
    title: "Git Merge",
    section: "Branching",
    level: "Intermediate",
    tags: ["Merge", "Integrate", "Combine"],
    conceptExplanation: `'git merge' combines changes from one branch into another. It's how you integrate completed features back into main.

**How Merge Works:**
1. Switch to the target branch (e.g., main)
2. Run 'git merge <source-branch>'
3. Git creates a merge commit that has TWO parents

**Types of Merges:**
• **Fast-forward merge** — The target branch hasn't diverged. Git just moves the pointer forward. No merge commit.
• **3-way merge** — Both branches have diverged. Git creates a new merge commit combining both histories.
• **Merge conflict** — Both branches changed the same part of the same file. Git needs human help.

**Best Practices:**
• Always be on the branch you want to merge INTO
• Ensure you're up to date with the target branch before merging
• Review the changes with 'git diff <branch>'
• Delete the feature branch after merging`,
    keyRules: [
      "Know which branch you're ON before merging (it's the destination)",
      "Keep feature branches short-lived — merge frequently to avoid conflicts",
      "Use 'git merge --no-ff' to force a merge commit (preserves history)",
      "A clean, linear history is easier to understand and debug",
      "Never merge incomplete or broken code into main",
    ],
    mission: `Merge a feature branch into main.

**Scenario:** The login feature is complete. Merge it into main using a merge commit.

**Steps:**
1. Ensure feature/login has a new commit
2. Switch to main
3. Merge feature/login
4. Verify the merge with git log --graph`,
    initialRepo: {
      setup: true,
      commits: [
        { id: "a1b2c3d", message: "Initial commit", parent: null },
      ],
      branches: { main: "a1b2c3d", "feature/login": "a1b2c3d" },
      HEAD: { type: "branch", name: "feature/login" },
    },
    missionValidation: (commands) => {
      return commands.some(c => /^git merge/i.test(c));
    },
    starterCode: "",
    solutionCode: `# Make sure feature/login has work
git checkout feature/login
echo "login" > login.js
git add login.js
git commit -m "feat: add login logic"

# Merge into main
git checkout main
git merge feature/login

# Verify
git log --oneline --graph`,
    hint: "Switch to the target branch (main) first, then run 'git merge <branch>'.",
    tests: [
      { name: "Merge command executed", validate: testCommandContains("git merge") },
    ],
  },
  {
    id: "fast-forward-merge",
    chapter: 11,
    title: "Fast-Forward Merge",
    section: "Branching",
    level: "Intermediate",
    tags: ["Fast-Forward", "Merge", "Linear History"],
    conceptExplanation: `A fast-forward merge happens when the target branch hasn't diverged — it's just behind the source branch. Git simply moves the target branch pointer forward.

**When it happens:**
main:       A --- B
feature:    A --- B --- C --- D

After 'git checkout main && git merge feature':
main:       A --- B --- C --- D
feature:    A --- B --- C --- D

No merge commit is created — main just catches up.

**Contrast with 3-way merge:**
main:       A --- B --- C
feature:    A --- B --- D --- E

After merge:
main:       A --- B --- C --- F (merge commit)
               \         /
                D --- E

**Why use --no-ff?**
Even when fast-forward is possible, --no-ff creates a merge commit. This preserves the information that a feature branch existed and was merged.`,
    keyRules: [
      "Fast-forward merges create a linear, clean history",
      "Use 'git merge --no-ff' to preserve feature branch history as a group",
      "A linear history is easier to bisect (find bugs with git bisect)",
      "Some teams prefer always using --no-ff for traceability",
      "Fast-forward is the default behavior when there's no divergence",
    ],
    mission: `Perform a fast-forward merge and understand the difference from a 3-way merge.

**Scenario:** Main hasn't changed since you created the feature branch. Merge it back with git merge.

**Steps:**
1. On feature branch, make 2 commits
2. Switch to main
3. Merge feature — should be fast-forward
4. Check log to see the linear history`,
    initialRepo: {
      setup: true,
      commits: [{ id: "a1b2c3d", message: "Initial commit", parent: null }],
      branches: { main: "a1b2c3d", "feature/nav": "a1b2c3d" },
      HEAD: { type: "branch", name: "feature/nav" },
    },
    missionValidation: (commands) => {
      return commands.some(c => /^git merge/i.test(c));
    },
    starterCode: "",
    solutionCode: `# Make commits on feature
echo "nav" > nav.html
git add nav.html
git commit -m "feat: add navigation"
echo "nav styles" > nav.css
git add nav.css
git commit -m "feat: add nav styles"

# Fast-forward merge
git checkout main
git merge feature/nav

# Check linear history
git log --oneline`,
    hint: "Fast-forward happens automatically when main hasn't diverged. Just merge as usual.",
    tests: [
      { name: "Feature branch has commits", validate: testCommandRegex(/git commit/) },
      { name: "Merged into main", validate: testCommandContains("git merge") },
    ],
  },
  {
    id: "branch-strategies",
    chapter: 12,
    title: "Branching Strategies",
    section: "Branching",
    level: "Intermediate",
    tags: ["Git Flow", "GitHub Flow", "Trunk-Based"],
    conceptExplanation: `A branching strategy defines how your team uses branches to develop, release, and maintain software.

**Git Flow (Classic):**
• main — Production-ready code
• develop — Integration branch for features
• feature/* — Individual features (merge to develop)
• release/* — Release preparation (merge to main + develop)
• hotfix/* — Emergency fixes (merge to main + develop)
Best for: Scheduled releases, complex projects

**GitHub Flow (Simpler):**
• main — Always deployable
• feature/* — Branch from main, PR to main
• Deploy immediately after merge
Best for: Continuous deployment, simpler projects

**Trunk-Based Development:**
• main (trunk) — Everyone commits here multiple times daily
• Short-lived feature branches (hours, not days)
• Feature flags for incomplete work
Best for: High-performing teams, CI/CD`,
    keyRules: [
      "Pick the strategy that fits your team and release cycle — don't over-engineer",
      "Keep branches short-lived (days, not weeks) to avoid merge conflicts",
      "Main should always be deployable",
      "Use feature flags for work-in-progress instead of long-lived branches",
      "Git Flow is overkill for most modern web apps — GitHub Flow is usually enough",
    ],
    mission: `Recreate a GitHub Flow workflow.

**Scenario:** Simulate a complete GitHub Flow cycle: create a feature branch, commit, switch to main, merge, delete the feature branch.

**Steps:**
1. Create feature branch from main
2. Make a commit on the feature branch
3. Switch to main
4. Merge the feature branch
5. Delete the feature branch`,
    initialRepo: {
      setup: true,
      commits: [{ id: "a1b2c3d", message: "Initial commit", parent: null }],
      branches: { main: "a1b2c3d" },
      HEAD: { type: "branch", name: "main" },
    },
    missionValidation: (commands) => {
      return commands.some(c => /^git merge/i.test(c)) &&
             commands.some(c => /git branch.*-d/i.test(c) || /git branch.*-D/i.test(c));
    },
    starterCode: "",
    solutionCode: `git checkout -b feature/payment
echo "payment" > payment.js
git add payment.js
git commit -m "feat: add payment module"
git checkout main
git merge feature/payment
git branch -d feature/payment`,
    hint: "Use 'git checkout -b' to create and switch. After merge, use 'git branch -d' to delete.",
    tests: [
      { name: "Feature branch created", validate: testCommandContains("checkout -b") || testCommandContains("switch -c") },
      { name: "Merged into main", validate: testCommandContains("git merge") },
      { name: "Feature branch deleted", validate: testCommandContains("git branch -d") || testCommandContains("git branch -D") },
    ],
  },

  // ─── INTERMEDIATE GIT (13-18) ───

  {
    id: "git-rebase",
    chapter: 13,
    title: "Git Rebase",
    section: "Intermediate Git",
    level: "Advanced",
    tags: ["Rebase", "History", "Rewrite"],
    conceptExplanation: `'git rebase' moves commits from one branch to the tip of another. It creates a linear, clean history.

**Rebase vs Merge:**
Merge creates a merge commit, preserving branch history.
Rebase rewrites history, creating a straight line.

**Before Rebase:**
main:       A --- B --- C
feature:    A --- B --- D --- E

**After Rebase (on feature, run 'git rebase main'):**
main:       A --- B --- C
feature:    A --- B --- C --- D' --- E'

The commits D and E are re-applied on top of C, creating new commits D' and E'.

**Golden Rule of Rebase:**
NEVER rebase commits that have been pushed to a shared branch. Rebase is for local cleanup only.

**Interactive Rebase:**
'git rebase -i HEAD~3' — Squash, reorder, edit, or drop recent commits`,
    keyRules: [
      "Never rebase shared/pushed commits — it causes chaos for collaborators",
      "Rebase before pushing to keep a clean history",
      "Use 'git rebase -i' to squash fixup commits into meaningful ones",
      "If you mess up a rebase, use 'git rebase --abort' to cancel",
      "Rebase rewrites commit hashes — different hashes = different commits",
    ],
    mission: `Rebase a feature branch onto main.

**Scenario:** Main has moved forward while you were working on a feature branch. Rebase your feature onto the latest main.

**Steps:**
1. Ensure main has a new commit ahead of where you branched
2. Switch to feature branch
3. Rebase onto main
4. Verify the linear history`,
    initialRepo: {
      setup: true,
      commits: [
        { id: "a1b2c3d", message: "Initial commit", parent: null },
        { id: "b2c3d4e", message: "Main update", parent: "a1b2c3d" },
      ],
      branches: { main: "b2c3d4e", "feature/settings": "a1b2c3d" },
      HEAD: { type: "branch", name: "feature/settings" },
    },
    missionValidation: (commands) => {
      return commands.some(c => /^git rebase/i.test(c));
    },
    starterCode: "",
    solutionCode: `# Check current position
git log --oneline --graph --all

# Rebase feature onto main
git rebase main

# Verify linear history
git log --oneline --graph`,
    hint: "Switch to the feature branch and run 'git rebase main' to reapply its commits on top of main.",
    tests: [
      { name: "Rebase executed", validate: testCommandContains("git rebase") },
    ],
  },
  {
    id: "git-cherry-pick",
    chapter: 14,
    title: "Git Cherry Pick",
    section: "Intermediate Git",
    level: "Advanced",
    tags: ["Cherry Pick", "Select", "Port"],
    conceptExplanation: `'git cherry-pick' applies a specific commit (or commits) from one branch to another. Unlike merge or rebase, you pick only the commits you want.

**Why Cherry Pick?**
• Apply a bug fix from one branch to another without merging everything
• Port a specific feature commit to a release branch
• Undo an accidental commit by cherry-picking it to a temp branch

**Usage:**
• 'git cherry-pick <commit-hash>' — Apply a single commit
• 'git cherry-pick A..B' — Apply a range of commits (excludes A)
• 'git cherry-pick A^..B' — Apply a range of commits (includes A)

**Options:**
• --no-commit — Apply changes but don't create a commit (like merge --squash)
• --edit — Edit the commit message before committing
• -n — No automatic commit`,
    keyRules: [
      "Cherry-pick is for applying SELECTIVE changes, not entire branches",
      "Cherry-picking creates a NEW commit (different hash), even if content is identical",
      "Use cherry-pick for hotfixes between release branches",
      "Document where cherry-picked commits came from in the commit message",
      "Avoid overusing cherry-pick — it can lead to duplicate commits and confusion",
    ],
    mission: `Cherry-pick a specific commit from one branch to another.

**Scenario:** A critical bug fix was committed on the develop branch. You need only that fix on the release branch, without merging all develop changes.

**Steps:**
1. Find the commit hash of the bug fix
2. Switch to the target branch
3. Cherry-pick just that commit
4. Verify it applied correctly`,
    initialRepo: {
      setup: true,
      commits: [
        { id: "a1b2c3d", message: "Initial commit", parent: null },
        { id: "f1x3d4e", message: "fix: resolve login redirect bug", parent: "a1b2c3d" },
        { id: "g1h2i3j", message: "feat: add new dashboard", parent: "f1x3d4e" },
      ],
      branches: { main: "a1b2c3d", develop: "g1h2i3j", "release/1.0": "a1b2c3d" },
      HEAD: { type: "branch", name: "develop" },
    },
    missionValidation: (commands) => {
      return commands.some(c => /^git cherry-pick/i.test(c));
    },
    starterCode: "",
    solutionCode: `# Find the fix commit
git log --oneline develop

# Switch to release branch
git checkout release/1.0

# Cherry-pick the fix
git cherry-pick f1x3d4e

# Verify
git log --oneline`,
    hint: "Use 'git log --oneline' to find the commit hash, then 'git cherry-pick <hash>' to apply just that commit.",
    tests: [
      { name: "Cherry-pick executed", validate: testCommandContains("git cherry-pick") },
    ],
  },
  {
    id: "git-stash",
    chapter: 15,
    title: "Git Stash",
    section: "Intermediate Git",
    level: "Intermediate",
    tags: ["Stash", "Temporary", "Save"],
    conceptExplanation: `'git stash' temporarily saves your uncommitted changes so you can work on something else, then come back and restore them.

**Common Workflow:**
1. You're working on Feature A
2. An urgent bug fix needs your attention
3. 'git stash' — Save your work-in-progress
4. Fix the bug on a clean working directory
5. 'git stash pop' — Restore your WIP and continue

**Stash Commands:**
• 'git stash' — Stash tracked files (default)
• 'git stash push -m "WIP: login form"' — With a message
• 'git stash -u' — Include untracked files (-u = --include-untracked)
• 'git stash list' — View all stashes
• 'git stash pop' — Apply and remove the latest stash
• 'git stash apply' — Apply but keep the stash
• 'git stash drop' — Remove a stash without applying
• 'git stash clear' — Remove all stashes`,
    keyRules: [
      "Stash is for TEMPORARY saving — don't leave stashes around for days",
      "Name your stashes with '-m' so you remember what they contain",
      "Use 'git stash -u' if you have new untracked files",
      "Use 'git stash apply' if you want to restore the same stash to multiple branches",
      "Never stash for long periods — commit or discard instead",
    ],
    mission: `Use git stash to temporarily save work.

**Scenario:** You're adding a contact form when an urgent hotfix is needed. Stash your WIP, fix the bug, then restore your work.

**Steps:**
1. Create a WIP (work-in-progress) file
2. Stash it with a descriptive message
3. Verify working directory is clean
4. Fix the urgent bug (create a file and commit)
5. Pop the stash to restore your work`,
    initialRepo: {
      setup: true,
      commits: [{ id: "a1b2c3d", message: "Initial commit", parent: null }],
      branches: { main: "a1b2c3d" },
      HEAD: { type: "branch", name: "main" },
    },
    missionValidation: (commands) => {
      return commands.some(c => /^git stash/i.test(c));
    },
    starterCode: "",
    solutionCode: `# Start working on a feature
echo "WIP: contact form" > contact.html

# Stash it
git stash push -m "WIP: contact form"

# Verify clean state
git status

# Fix urgent bug
echo "hotfix" > hotfix.txt
git add hotfix.txt
git commit -m "hotfix: resolve critical issue"

# Restore WIP
git stash pop`,
    hint: "Run 'git stash' (or 'git stash push -m \"message\"') to save. After fixing the bug, 'git stash pop' to restore.",
    tests: [
      { name: "Work stashed", validate: testCommandContains("git stash") },
      { name: "Stash restored", validate: (c) => c.includes("git stash pop") || c.includes("git stash apply") },
    ],
  },
  {
    id: "git-reset",
    chapter: 16,
    title: "Git Reset",
    section: "Intermediate Git",
    level: "Intermediate",
    tags: ["Reset", "Undo", "Rewind"],
    conceptExplanation: `'git reset' moves the current branch pointer backward, undoing commits. It can also unstage files.

**Three Modes of Reset:**

• 'git reset --soft <commit>' — Move branch pointer back. Changes stay STAGED.
Use: When you want to recommit with a different message.

• 'git reset --mixed <commit>' — (Default) Move branch pointer back. Changes stay in working directory.
Use: When you want to uncommit and rethink your approach.

• 'git reset --hard <commit>' — Move branch pointer back. Changes are DISCARDED.
Use: When you want to completely throw away commits.

**Visual:**
Before: A --- B --- C --- D (HEAD)
After 'git reset --hard B': A --- B (HEAD)

**Common Use Cases:**
• 'git reset HEAD~1' — Undo the last commit (keep changes)
• 'git reset --hard HEAD' — Discard all local changes
• 'git reset <file>' — Unstage a file (like git restore --staged)`,
    keyRules: [
      "Use --soft when you want to re-commit (wrong message, forgot a file)",
      "Use --mixed (default) when you want to rethink the approach",
      "Use --hard ONLY when you're sure you want to discard changes",
      "Never reset commits that have been pushed to a shared branch",
      "If you accidentally hard reset, you may recover the commit via git reflog",
    ],
    mission: `Undo a commit using git reset.

**Scenario:** You made a commit but realized the message is wrong. Use soft reset to undo just the commit, then commit again with the correct message.

**Steps:**
1. Check the commit log
2. Soft reset the last commit
3. Re-commit with the correct message
4. Verify the updated history`,
    initialRepo: {
      setup: true,
      commits: [
        { id: "a1b2c3d", message: "Initial commit", parent: null },
        { id: "x1y2z3w", message: "WIP stuff", parent: "a1b2c3d" },
      ],
      branches: { main: "x1y2z3w" },
      HEAD: { type: "branch", name: "main" },
    },
    missionValidation: (commands) => {
      return commands.some(c => /^git reset/i.test(c)) &&
             commands.some(c => /^git commit/i.test(c));
    },
    starterCode: "",
    solutionCode: `# Check the bad commit
git log --oneline

# Soft reset (undo commit, keep changes staged)
git reset --soft HEAD~1

# Re-commit with proper message
git commit -m "feat: add login functionality"

# Verify
git log --oneline`,
    hint: "Use 'git reset --soft HEAD~1' to undo the last commit while keeping changes staged, then recommit.",
    tests: [
      { name: "Reset executed", validate: testCommandContains("git reset") },
      { name: "Re-commit made", validate: testCommandRegex(/git commit/) },
    ],
  },
  {
    id: "git-revert",
    chapter: 17,
    title: "Git Revert",
    section: "Intermediate Git",
    level: "Intermediate",
    tags: ["Revert", "Undo", "Safe"],
    conceptExplanation: `'git revert' creates a NEW commit that undoes the changes from a previous commit. Unlike reset, revert doesn't rewrite history.

**Why Revert Instead of Reset?**
• Reset rewrites history — dangerous for shared branches
• Revert adds a new commit — SAFE for shared branches
• Revert is the only option for undoing commits that others might have

**Usage:**
• 'git revert <commit>' — Create a new commit that undoes the specified commit
• 'git revert HEAD' — Undo the last commit
• 'git revert HEAD~3..HEAD' — Undo a range of commits (newest first)
• 'git revert --no-commit <commit>' — Apply the change but don't commit

**Revert vs Reset:**
Reset: A --- B --- C → A --- B (history changed!)
Revert: A --- B --- C → A --- B --- C --- D (D undoes C, history preserved!)

**When to Use Each:**
• Local, unpushed commits → reset
• Pushed/shared commits → revert`,
    keyRules: [
      "Always use 'git revert' for commits that have been pushed/shared",
      "Revert is the safest way to undo — it preserves history",
      "You can revert a revert to re-apply the original changes",
      "Revert may cause conflicts if later commits depend on the reverted code",
      "A revert message is auto-generated: 'Revert \"original message\"'",
    ],
    mission: `Safely undo a pushed commit.

**Scenario:** A commit was pushed to main but introduced a bug. Since other team members may have pulled it, use revert to safely undo it.

**Steps:**
1. Check the log to find the bad commit
2. Revert the last commit (creates a new undo commit)
3. Verify the revert in the log
4. Check the commit message is auto-generated`,
    initialRepo: {
      setup: true,
      commits: [
        { id: "a1b2c3d", message: "Initial commit", parent: null },
        { id: "b2c3d4e", message: "Add user authentication", parent: "a1b2c3d" },
        { id: "c3d4e5f", message: "BREAKING: change auth endpoint", parent: "b2c3d4e" },
      ],
      branches: { main: "c3d4e5f" },
      HEAD: { type: "branch", name: "main" },
    },
    missionValidation: (commands) => {
      return commands.some(c => /^git revert/i.test(c));
    },
    starterCode: "",
    solutionCode: `# Identify the bad commit
git log --oneline

# Revert the breaking change
git revert HEAD
# Edit the auto-generated message or just save/close

# Verify
git log --oneline`,
    hint: "Use 'git revert <commit-hash>' or 'git revert HEAD' to undo the last commit safely.",
    tests: [
      { name: "Revert executed", validate: testCommandContains("git revert") },
    ],
  },
  {
    id: "git-tag",
    chapter: 18,
    title: "Git Tag",
    section: "Intermediate Git",
    level: "Intermediate",
    tags: ["Tag", "Release", "Version"],
    conceptExplanation: `Tags mark specific commits as important — typically release versions (v1.0.0, v2.1.3).

**Types of Tags:**
• **Lightweight tag** — Just a pointer to a commit. Like a branch that doesn't move.
• **Annotated tag** — Stored as a full object. Includes the tagger name, email, date, and message. Recommended for releases.

**Usage:**
• 'git tag v1.0.0' — Create a lightweight tag at current commit
• 'git tag -a v1.0.0 -m \"Release version 1.0.0\"' — Annotated tag
• 'git tag v1.0.0 <commit>' — Tag a specific commit
• 'git tag' — List all tags
• 'git tag -d v1.0.0' — Delete a local tag
• 'git push origin v1.0.0' — Push a tag to remote
• 'git push origin --tags' — Push all tags

**Semantic Versioning (SemVer):**
MAJOR.MINOR.PATCH (v1.2.3)
• MAJOR — Breaking changes
• MINOR — New features, backwards compatible
• PATCH — Bug fixes, backwards compatible`,
    keyRules: [
      "Use annotated tags (-a -m) for releases — they include metadata",
      "Tags should follow SemVer: v1.0.0, v1.1.0, v2.0.0",
      "Once a tag is pushed and shared, don't delete or move it",
      "Use 'git describe --tags' to get the nearest tag in the current context",
      "Tags are NOT automatically pushed with 'git push' — use 'git push --tags'",
    ],
    mission: `Create a release tag for version 1.0.0.

**Scenario:** Your project is ready for its first release. Create an annotated tag marking this release.

**Steps:**
1. Ensure there's at least one commit
2. Create an annotated tag 'v1.0.0' with a message
3. List all tags to verify
4. Push the tag to remote`,
    initialRepo: {
      setup: true,
      commits: [
        { id: "a1b2c3d", message: "Initial commit", parent: null },
        { id: "b2c3d4e", message: "Add all features for v1.0", parent: "a1b2c3d" },
      ],
      branches: { main: "b2c3d4e" },
      HEAD: { type: "branch", name: "main" },
    },
    missionValidation: (commands) => {
      return commands.some(c => /^git tag/i.test(c));
    },
    starterCode: "",
    solutionCode: `# Create annotated tag
git tag -a v1.0.0 -m "Release version 1.0.0 - Initial production release"

# List tags
git tag

# Push tag to remote
git push origin v1.0.0`,
    hint: "Use 'git tag -a <version> -m \"message\"' for annotated tags, then 'git tag' to list.",
    tests: [
      { name: "Tag created", validate: testCommandContains("git tag") },
    ],
  },

  // ─── ADVANCED GIT (19-24) ───

  {
    id: "merge-conflicts",
    chapter: 19,
    title: "Merge Conflicts",
    section: "Advanced Git",
    level: "Advanced",
    tags: ["Conflict", "Merge", "Resolve"],
    conceptExplanation: `A merge conflict occurs when two branches modify the same part of the same file. Git can't decide which version to keep — it needs your help.

**Conflict Markers:**
<<<<<<< HEAD
Your current branch's version
=======
The incoming branch's version
>>>>>>> feature/login

**How to Resolve:**
1. Open the conflicting file(s)
2. Decide which version to keep, or combine them
3. Remove the conflict markers:
   - <<<<<<< HEAD
   - =======
   - >>>>>>> branch-name
4. Stage the resolved file: 'git add <file>'
5. Complete the merge: 'git commit'

**Tools for Resolution:**
• Manual — Edit the file directly
• git mergetool — Opens visual merge tool (VS Code, Beyond Compare, etc.)
• Accept ours/theirs — 'git checkout --ours <file>', 'git checkout --theirs <file>'`,
    keyRules: [
      "Don't panic — conflicts are normal and expected in collaborative work",
      "Read the conflict markers carefully to understand both versions",
      "Communicate with the other developer if you're unsure which version to keep",
      "Always test the resolved code before committing the merge",
      "Keep commits small and focused — fewer conflicts per file",
    ],
    mission: `Resolve a merge conflict.

**Scenario:** Two branches modified the same line in app.js. Merge main into feature and resolve the conflict.

**Conflict Details:**
main has: const apiUrl = "https://api.example.com/v1";
feature has: const apiUrl = "https://api.example.com/v2";

**Steps:**
1. Switch to feature branch
2. Merge main into it (this will cause a conflict)
3. Open the file and resolve the conflict
4. Stage the resolved file
5. Complete the merge commit`,
    initialRepo: {
      setup: true,
      commits: [
        { id: "a1b2c3d", message: "Initial commit", parent: null },
        { id: "m1n2o3p", message: "Update API to v1", parent: "a1b2c3d" },
        { id: "f1g2h3i", message: "Update API to v2", parent: "a1b2c3d" },
      ],
      branches: { main: "m1n2o3p", "feature/api": "f1g2h3i" },
      HEAD: { type: "branch", name: "feature/api" },
      conflictScenario: {
        files: {
          "app.js": {
            current: 'const apiUrl = "https://api.example.com/v2";',
            incoming: 'const apiUrl = "https://api.example.com/v1";',
          },
        },
      },
    },
    missionValidation: (commands) => {
      return commands.some(c => /^git add/i.test(c)) &&
             commands.some(c => /^git commit/i.test(c));
    },
    starterCode: "",
    solutionCode: `# Merge main into feature (will conflict)
git merge main

# Resolve the conflict in app.js
# Edit to keep: const apiUrl = "https://api.example.com/v2";

# Stage the resolution
git add app.js

# Complete the merge
git commit -m "Merge main into feature/api"`,
    hint: "After 'git merge main', edit the conflicting file to remove the markers. Then 'git add <file>' and 'git commit'.",
    tests: [
      { name: "Merge attempted (will conflict)", validate: testCommandContains("git merge") },
      { name: "Conflict resolved and staged", validate: testCommandContains("git add") },
      { name: "Merge completed", validate: testCommandRegex(/git commit/) },
    ],
  },
  {
    id: "interactive-rebase",
    chapter: 20,
    title: "Interactive Rebase",
    section: "Advanced Git",
    level: "Advanced",
    tags: ["Interactive", "Rebase", "Squash", "Rewrite"],
    conceptExplanation: `Interactive rebase ('git rebase -i') lets you modify, reorder, squash, split, or drop commits before applying them.

**The Interactive Editor:**
When you run 'git rebase -i HEAD~3', Git opens an editor with:

pick a1b2c3d Add login form
pick e4f5g6h Fix login form validation
pick i7j8k9l Add error styles

# Commands:
# p, pick = use commit
# r, reword = use commit but edit message
# s, squash = combine with previous commit
# f, fixup = combine but discard message
# d, drop = remove commit
# e, edit = stop to amend

**Common Use Cases:**
• squash multiple small commits into one logical commit
• reword a bad commit message
• drop an experimental commit
• reorder commits for cleaner history`,
    keyRules: [
      "Interactive rebase rewrites history — only use on local/unpushed commits",
      "Squash 'WIP', 'fixup', and 'typo' commits into meaningful commits before pushing",
      "The commits are listed from OLDEST to NEWEST (bottom to top in Git's editor)",
      "If you get stuck, 'git rebase --abort' will return to the original state",
      "Use 'fixup' instead of 'squash' to discard the commit message entirely",
    ],
    mission: `Squash multiple commits into one using interactive rebase.

**Scenario:** You made 3 small commits while building the login feature. Squash them into one clean commit before pushing.

**Steps:**
1. Check the last 3 commits
2. Run interactive rebase on HEAD~3
3. Squash the last two commits into the first
4. Give the squashed commit a clean message
5. Verify the result`,
    initialRepo: {
      setup: true,
      commits: [
        { id: "a1b2c3d", message: "Initial commit", parent: null },
        { id: "c1d2e3f", message: "Add login form", parent: "a1b2c3d" },
        { id: "e4f5g6h", message: "Fix login validation", parent: "c1d2e3f" },
        { id: "i7j8k9l", message: "Fix login styling", parent: "e4f5g6h" },
      ],
      branches: { main: "a1b2c3d", "feature/login": "i7j8k9l" },
      HEAD: { type: "branch", name: "feature/login" },
    },
    missionValidation: (commands) => {
      return commands.some(c => /^git rebase -i/i.test(c) || /^git rebase --interactive/i.test(c));
    },
    starterCode: "",
    solutionCode: `# Check the 3 commits to squash
git log --oneline -3

# Rebase interactively
git rebase -i HEAD~3
# Change 'pick' to 'squash' for the last two commits
# Save and close, then write the new commit message

# Verify
git log --oneline -3`,
    hint: "Run 'git rebase -i HEAD~3', change 'pick' to 'squash' for commits to combine, save and close.",
    tests: [
      { name: "Interactive rebase executed", validate: testCommandContains("git rebase -i") || testCommandContains("git rebase --interactive") },
    ],
  },
  {
    id: "squash-commits",
    chapter: 21,
    title: "Squash Commits",
    section: "Advanced Git",
    level: "Advanced",
    tags: ["Squash", "Clean Up", "History"],
    conceptExplanation: `Squashing combines multiple commits into one. This creates a cleaner, more readable history.

**Why Squash?**
• "Fix typo", "Add missing semicolon", "Oops" — these aren't useful commit messages
• A single feature should ideally be one commit with a good message
• Clean history makes git bisect easier

**Methods to Squash:**

1. **Interactive rebase** (most common):
'squash' combines with previous commit and merges messages
'fixup' combines with previous commit and DISCARDS message

2. **Merge with --squash**:
'git merge --squash <branch>' — creates a single squashed commit instead of merging all commits

3. **Soft reset + recommit**:
'git reset --soft HEAD~3 && git commit -m "feat: add complete feature"'`,
    keyRules: [
      "Squash before pushing to keep shared history clean",
      "A good guideline: one feature = one commit",
      "Use 'fixup' for trivial changes ('typo', 'formatting', 'oops')",
      "Don't squash commits that have meaningful individual messages",
      "Squash WIP/fixup commits in your feature branch before creating a PR",
    ],
    mission: `Squash 3 messy commits into 1 clean commit.

**Scenario:** Your feature branch has 3 scattered commits. Squash them into a single clean commit using soft reset.

**Steps:**
1. Check current log
2. Soft reset back 3 commits
3. Stage all changes
4. Commit with a clean message
5. Verify single commit`,
    initialRepo: {
      setup: true,
      commits: [
        { id: "a1b2c3d", message: "Initial commit", parent: null },
        { id: "w1x2y3z", message: "WIP: started profile page", parent: "a1b2c3d" },
        { id: "p2q3r4s", message: "Added profile photo", parent: "w1x2y3z" },
        { id: "t5u6v7w", message: "Fixed profile bug", parent: "p2q3r4s" },
      ],
      branches: { main: "a1b2c3d", "feature/profile": "t5u6v7w" },
      HEAD: { type: "branch", name: "feature/profile" },
    },
    missionValidation: (commands) => {
      return commands.some(c => /^git reset/i.test(c)) && commands.some(c => /^git commit/i.test(c));
    },
    starterCode: "",
    solutionCode: `# See the messy commits
git log --oneline

# Soft reset to combine them
git reset --soft HEAD~3

# Commit with a clean message
git commit -m "feat: add user profile page with photo upload"

# Verify
git log --oneline`,
    hint: "Use 'git reset --soft HEAD~3' to undo 3 commits but keep changes staged, then commit with a clean message.",
    tests: [
      { name: "Reset to squash", validate: testCommandContains("git reset") },
      { name: "New clean commit", validate: testCommandRegex(/git commit/) },
    ],
  },
  {
    id: "detached-head",
    chapter: 22,
    title: "Detached HEAD",
    section: "Advanced Git",
    level: "Advanced",
    tags: ["HEAD", "Detached", "Recover"],
    conceptExplanation: `A detached HEAD state means your HEAD is pointing to a specific commit instead of a branch. This happens when you checkout a commit hash, tag, or remote branch.

**How You Get There:**
'git checkout a1b2c3d' — Checkout a specific commit
'git checkout v1.0.0' — Checkout a tag
'git checkout origin/main' — Checkout a remote tracking branch

**Visual:**
Normal: HEAD → main → a1b2c3d
Detached: HEAD → a1b2c3d (no branch)

**The Danger:**
If you make commits in detached HEAD state and then checkout a branch, those commits are ORPHANED — they have no branch pointing to them. They become eligible for garbage collection.

**How to Save Commits in Detached HEAD:**
'git branch <new-branch>' — Create a branch at the current position
'git checkout -b <new-branch>' — Create branch and switch`,
    keyRules: [
      "Detached HEAD is fine for investigating — but don't commit without creating a branch",
      "If you make commits in detached HEAD, create a branch to save them",
      "Use 'git log --all --oneline' to find orphaned commits",
      "Orphaned commits are garbage collected after ~90 days by default",
      "Use 'git reflog' to find commits you made in detached HEAD",
    ],
    mission: `Navigate detached HEAD state and recover commits.

**Scenario:** You accidentally checked out an old commit and made changes. Create a branch to save your work.

**Steps:**
1. Checkout a specific historical commit
2. Make a change and commit
3. Realize you're in detached HEAD
4. Create a branch to save the commit
5. Checkout the new branch and verify`,
    initialRepo: {
      setup: true,
      commits: [
        { id: "a1b2c3d", message: "Initial commit", parent: null },
        { id: "b2c3d4e", message: "Add feature A", parent: "a1b2c3d" },
        { id: "c3d4e5f", message: "Add feature B", parent: "b2c3d4e" },
      ],
      branches: { main: "c3d4e5f" },
      HEAD: { type: "branch", name: "main" },
    },
    missionValidation: (commands) => {
      return commands.some(c => /^git checkout -b/i.test(c) || /^git switch -c/i.test(c) || /^git branch/i.test(c));
    },
    starterCode: "",
    solutionCode: `# Checkout an old commit
git checkout b2c3d4e

# Make changes (detached HEAD)
echo "new feature" > new.txt
git add new.txt
git commit -m "feat: add experimental feature"

# Create a branch to save the commit
git checkout -b feature/experiment

# Verify
git log --oneline`,
    hint: "Checkout a commit by hash. Make changes and commit. Then create a branch to save: 'git checkout -b <branch>'.",
    tests: [
      { name: "Checked out specific commit", validate: testCommandContains("git checkout") },
      { name: "Created branch to save work", validate: testCommandContains("checkout -b") || testCommandContains("switch -c") },
    ],
  },
  {
    id: "git-bisect",
    chapter: 23,
    title: "Git Bisect",
    section: "Advanced Git",
    level: "Advanced",
    tags: ["Bisect", "Binary Search", "Debug"],
    conceptExplanation: `'git bisect' uses binary search to find the commit that introduced a bug. It's the most efficient way to find the source of a regression.

**How Bisect Works:**
1. Mark a known GOOD commit (before the bug)
2. Mark a known BAD commit (where the bug exists)
3. Git checks out a commit halfway between them
4. You test and mark it as good or bad
5. Repeat — Git narrows down to the exact commit

**Steps:**
git bisect start
git bisect good v1.0.0      # Working version
git bisect bad HEAD           # Broken version
# Git checks out a commit in the middle
# Test the commit
git bisect good               # or bad
# Git checks out another commit
# Repeat until Git identifies the exact commit
git bisect reset              # End bisect session

**Pro Tips:**
• Use 'git bisect run <script>' to automate with a test script
• Write a test script that exits 0 (good) or non-zero (bad)
• ~30 commits → only 5 bisect steps needed`,
    keyRules: [
      "Bisect is the most efficient way to find regression bugs",
      "Start with a broad range and narrow down — it's always O(log n)",
      "Use 'git bisect run' with automated tests for CI workflows",
      "Always end with 'git bisect reset' to return to the original HEAD",
      "Bisect works best with clean, small commits (another reason to commit often!)",
    ],
    mission: `Use git bisect to find the commit that broke the build.

**Scenario:** The app was working at commit a1b2c3d but is broken at the latest commit. Use bisect to find the bad commit.

**Steps:**
1. Start bisect
2. Mark the good commit (a1b2c3d)
3. Mark the bad commit (current HEAD)
4. Git will check out commits — mark them as good or bad
5. Find the culprit
6. End bisect`,
    initialRepo: {
      setup: true,
      commits: [
        { id: "a1b2c3d", message: "Initial commit (GOOD)", parent: null },
        { id: "b2c3d4e", message: "Add feature A", parent: "a1b2c3d" },
        { id: "c3d4e5f", message: "Add feature B", parent: "b2c3d4e" },
        { id: "d4e5f6g", message: "BUG: introduced issue", parent: "c3d4e5f" },
        { id: "e5f6g7h", message: "Add feature C still broken", parent: "d4e5f6g" },
      ],
      branches: { main: "e5f6g7h" },
      HEAD: { type: "branch", name: "main" },
    },
    missionValidation: (commands) => {
      return commands.some(c => /^git bisect/i.test(c));
    },
    starterCode: "",
    solutionCode: `# Start bisect
git bisect start

# Mark good and bad
git bisect good a1b2c3d
git bisect bad HEAD

# Git will checkout commits one by one
# For each: test and mark
git bisect good  # or git bisect bad

# When Git finds the culprit:
# "d4e5f6g is the first bad commit"

# End the session
git bisect reset`,
    hint: "Start with 'git bisect start', mark good/bad commits, then test each checkout Git presents. Finish with 'git bisect reset'.",
    tests: [
      { name: "Bisect started", validate: testCommandContains("git bisect start") },
      { name: "Bisect ended", validate: testCommandContains("git bisect reset") },
    ],
  },
  {
    id: "git-reflog",
    chapter: 24,
    title: "Git Reflog",
    section: "Advanced Git",
    level: "Advanced",
    tags: ["Reflog", "Recover", "Safety Net"],
    conceptExplanation: `'git reflog' (reference log) is Git's safety net. It records every movement of HEAD — including commits you've "lost" through reset, rebase, or other operations.

**What Reflog Shows:**
• Every time HEAD moves (commit, checkout, reset, rebase, merge)
• Operations that changed branch pointers
• Commit you think you lost

**Recovering Lost Commits:**
# See all HEAD movements
git reflog

# Find the lost commit
# a1b2c3d HEAD@{2}: commit: Important work I lost

# Recover it
git checkout a1b2c3d
# or
git cherry-pick a1b2c3d
# or
git branch recovered-branch a1b2c3d

**Important Facts:**
• Reflog is LOCAL — never shared with remote
• Reflog entries expire after 90 days (default)
• git reflog is the answer to "I lost my work, help!"`,
    keyRules: [
      "Reflog is your safety net — check it when you think you've lost commits",
      "git reflog shows LOCAL history only (not pushed history)",
      "Entries expire after 90 days (configurable with gc.reflogExpire)",
      "Use 'git reflog show <branch>' to see a specific branch's reflog",
      "Regular commits are your best safety net — reflog is the backup to the backup",
    ],
    mission: `Recover a "lost" commit using reflog.

**Scenario:** You accidentally did a hard reset and lost the last commit. Use reflog to find and recover it.

**Steps:**
1. Make a commit (this will be the "lost" one)
2. Do a hard reset to the previous commit (lose it)
3. Check log — the commit is gone
4. Check reflog to find the lost commit
5. Reset back to the lost commit
6. Verify recovery`,
    initialRepo: {
      setup: true,
      commits: [
        { id: "a1b2c3d", message: "Initial commit", parent: null },
      ],
      branches: { main: "a1b2c3d" },
      HEAD: { type: "branch", name: "main" },
    },
    missionValidation: (commands) => {
      return commands.some(c => /^git reflog/i.test(c));
    },
    starterCode: "",
    solutionCode: `# Create a commit
echo "important" > critical.txt
git add critical.txt
git commit -m "feat: add critical feature"

# Oops! Hard reset
git reset --hard HEAD~1

# It's gone!
git log --oneline

# Find it with reflog
git reflog

# Recover it (find the hash from reflog)
git reset --hard HEAD@{1}
# or git cherry-pick <hash>

# Verify
git log --oneline`,
    hint: "Run 'git reflog' to see all HEAD movements. Find the lost commit and use 'git reset --hard <hash>' to recover.",
    tests: [
      { name: "Reflog checked", validate: testCommandContains("git reflog") },
      { name: "Commit recovered", validate: testCommandContains("git reset") || testCommandContains("git cherry-pick") },
    ],
  },

  // ─── GITHUB (25-30) ───

  {
    id: "fork-clone",
    chapter: 25,
    title: "Fork & Clone",
    section: "GitHub",
    level: "Intermediate",
    tags: ["Fork", "Clone", "Remote", "GitHub"],
    conceptExplanation: `Forking and cloning are how you contribute to projects on GitHub.

**Fork vs Clone:**
• **Fork** — A copy of someone else's repository under YOUR GitHub account. It stays on GitHub.
• **Clone** — A copy of a repository on your LOCAL machine. You work here.

**Workflow:**
1. Fork a repository on GitHub (click "Fork" button)
2. Clone your fork locally: 'git clone <your-fork-url>'
3. Add the original repo as upstream: 'git remote add upstream <original-url>'
4. Fetch upstream changes: 'git fetch upstream'
5. Sync your main with upstream: 'git checkout main && git merge upstream/main'

**Remote Management:**
• 'git remote -v' — List all remotes
• 'git remote add <name> <url>' — Add a remote
• 'git remote remove <name>' — Remove a remote
• 'origin' = your fork (where you push)
• 'upstream' = original repo (where you fetch)`,
    keyRules: [
      "Fork on GitHub, clone locally — never push directly to someone else's repo",
      "Always add the original repo as 'upstream' remote to sync changes",
      "Keep your fork's main branch in sync with upstream/main",
      "Create feature branches in your fork — never work on main",
      "GitHub's 'Fork' button creates the server-side copy",
    ],
    mission: `Fork and clone a repository.

**Scenario:** You want to contribute to an open-source project. Fork the repo on GitHub, clone it locally, and set up the upstream remote.

**Steps:**
1. Clone your fork (simulate with git clone)
2. Add the original repo as 'upstream'
3. Fetch from upstream
4. List remotes to verify`,
    initialRepo: {
      setup: false,
    },
    missionValidation: (commands) => {
      return commands.some(c => /^git clone/i.test(c)) &&
             commands.some(c => c.includes("upstream"));
    },
    starterCode: "",
    solutionCode: `# Clone your fork (simulated)
git clone https://github.com/YOUR_USERNAME/project.git
cd project

# Add upstream remote
git remote add upstream https://github.com/original/project.git

# Fetch upstream changes
git fetch upstream

# Verify remotes
git remote -v`,
    hint: "Clone your fork, add the original as 'upstream', fetch from it. Use 'git remote -v' to verify.",
    tests: [
      { name: "Repository cloned", validate: testCommandContains("git clone") },
      { name: "Upstream remote added", validate: testCommandContains("upstream") },
    ],
  },
  {
    id: "pull-request",
    chapter: 26,
    title: "Pull Request",
    section: "GitHub",
    level: "Intermediate",
    tags: ["PR", "Pull Request", "Review", "GitHub"],
    conceptExplanation: `A Pull Request (PR) is how you propose changes to a repository. It's a request for the repository maintainers to review and merge your code.

**PR Lifecycle:**
1. Create a feature branch in your fork
2. Make changes and commit
3. Push the branch to your fork
4. Open a PR on GitHub
5. Respond to review comments (make more commits)
6. PR gets approved and merged
7. Delete the feature branch

**Good PR Practices:**
• Small, focused PRs are easier to review
• Write a clear title and description explaining WHAT and WHY
• Reference related issues (e.g., "Closes #42")
• Keep PRs under 400 lines when possible
• Add screenshots for UI changes

**PR Review Process:**
• Reviewers leave comments on specific lines
• Author addresses feedback with new commits
• CI checks must pass (tests, lint, build)
• At least one approval required before merging`,
    keyRules: [
      "Keep PRs small and focused — one feature/fix per PR",
      "Write a descriptive title and detailed description",
      "Respond to review comments politely and make requested changes",
      "Don't force-push after reviews — it loses the review context",
      "Link the PR to any related issues with 'Closes', 'Fixes', or 'Refs'",
    ],
    mission: `Simulate the PR workflow.

**Scenario:** Complete a feature, push your branch, and simulate creating a PR.

**Steps:**
1. Create a feature branch
2. Make a commit on it
3. Push the branch
4. Simulate creating a PR (just the git commands)`,
    initialRepo: {
      setup: true,
      commits: [{ id: "a1b2c3d", message: "Initial commit", parent: null }],
      branches: { main: "a1b2c3d" },
      HEAD: { type: "branch", name: "main" },
    },
    missionValidation: (commands) => {
      return commands.some(c => /^git push/i.test(c));
    },
    starterCode: "",
    solutionCode: `# Create a feature branch
git checkout -b feature/analytics

# Make a commit
echo "analytics" > analytics.js
git add analytics.js
git commit -m "feat: add analytics tracking"

# Push the branch
git push origin feature/analytics

# Now go to GitHub.com and create a PR!
# (simulated - in real life, GitHub shows a prompt)`,
    hint: "Create a branch, commit, and push. A real PR is created on GitHub.com after pushing.",
    tests: [
      { name: "Branch pushed to remote", validate: testCommandContains("git push") },
    ],
  },
  {
    id: "code-review",
    chapter: 27,
    title: "Code Review",
    section: "GitHub",
    level: "Intermediate",
    tags: ["Review", "PR", "Collaboration", "Best Practices"],
    conceptExplanation: `Code review is the process of examining someone else's code before it gets merged. It's one of the most important practices for maintaining code quality.

**What Reviewers Look For:**
• **Correctness** — Does the code do what it's supposed to?
• **Readability** — Is the code easy to understand?
• **Edge Cases** — What happens with empty/null/unexpected input?
• **Testing** — Are there tests? Do they cover edge cases?
• **Security** — Are there any security vulnerabilities?
• **Performance** — Any obvious performance issues?
• **Style** — Does it follow the project's coding conventions?

**Review Etiquette (for Authors):**
• Explain your reasoning in the PR description
• Respond to each comment, even just "Done"
• Make requested changes in additional commits

**Review Etiquette (for Reviewers):**
• Be respectful — critique the code, not the person
• Distinguish between "must fix" and "suggestion"
• Explain WHY something should change, not just WHAT`,
    keyRules: [
      "Review within 24 hours — don't block teammates",
      "Ask questions instead of making demands: 'What do you think about...?'",
      "Approving a PR means you're taking responsibility for the code",
      "Small PRs get better reviews — nobody wants to review 2000 lines",
      "Use GitHub's suggestion feature for small changes",
    ],
    mission: `Simulate the code review process.

**Scenario:** A teammate has opened a PR. Look at the diff, leave a review, and either approve or request changes.

**Steps:**
1. Fetch the PR branch
2. Checkout the branch
3. Review the changes with git diff
4. Simulate leaving a review comment
5. Checkout main and delete the branch`,
    initialRepo: {
      setup: true,
      commits: [
        { id: "a1b2c3d", message: "Initial commit", parent: null },
        { id: "p1r2c3d", message: "feat: add payment form", parent: "a1b2c3d" },
      ],
      branches: { main: "a1b2c3d", "feature/payment": "p1r2c3d" },
      HEAD: { type: "branch", name: "main" },
    },
    missionValidation: (commands) => {
      return commands.some(c => /^git diff/i.test(c));
    },
    starterCode: "",
    solutionCode: `# Fetch and checkout the PR branch
git checkout feature/payment

# Review the changes
git diff main

# Simulated: leave a review comment on GitHub
# "Looks good! Just one suggestion: consider using const instead of var."

# Clean up
git checkout main
git branch -d feature/payment`,
    hint: "Checkout the PR branch, use 'git diff main' to review changes, then clean up.",
    tests: [
      { name: "Changes reviewed with diff", validate: testCommandContains("git diff") },
      { name: "Feature branch cleaned up", validate: testCommandContains("git branch -d") || testCommandContains("git branch -D") },
    ],
  },
  {
    id: "github-actions",
    chapter: 28,
    title: "GitHub Actions",
    section: "GitHub",
    level: "Advanced",
    tags: ["Actions", "CI/CD", "Automation", "Workflow"],
    conceptExplanation: `GitHub Actions automates your development workflows — testing, building, deploying — directly from your GitHub repository.

**Key Concepts:**
• **Workflow** — An automated process defined in YAML
• **Event** — What triggers the workflow (push, PR, schedule)
• **Job** — A set of steps that run on the same runner
• **Step** — An individual task (run a command, use an action)
• **Runner** — The machine that executes the workflow (GitHub-hosted or self-hosted)

**Basic Workflow Structure:**
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm test

**Common Use Cases:**
• Run tests on every push
• Lint code automatically
• Build and deploy to production
• Publish packages to npm
• Auto-merge dependency updates`,
    keyRules: [
      "Keep your CI fast — developers won't wait for slow pipelines",
      "Run tests on every push, not just PRs",
      "Use caching to speed up dependency installation",
      "Never store secrets in workflow files — use GitHub Secrets",
      "Use matrix builds to test against multiple versions/OS",
    ],
    mission: `Create a basic GitHub Actions workflow.

**Scenario:** Set up a CI workflow that runs tests whenever code is pushed or a PR is opened.

**Steps:**
1. Create the .github/workflows directory
2. Create a ci.yml workflow file
3. Configure it to run on push and pull_request
4. Add a job that checks out code and runs npm test`,
    initialRepo: {
      setup: true,
      commits: [{ id: "a1b2c3d", message: "Initial commit with package.json", parent: null }],
      branches: { main: "a1b2c3d" },
      HEAD: { type: "branch", name: "main" },
    },
    missionValidation: (commands) => {
      return commands.some(c => c.includes(".github") || c.includes("workflow") || c.includes("yml"));
    },
    starterCode: "",
    solutionCode: `# Create workflow directory
mkdir -p .github/workflows

# Create the CI workflow
cat > .github/workflows/ci.yml << 'EOF'
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm test
EOF

# Stage and commit
git add .github/
git commit -m "ci: add GitHub Actions workflow"`,
    hint: "Create .github/workflows/ci.yml with the workflow YAML, stage and commit it.",
    tests: [
      { name: "Workflow file created", validate: testCommandContains(".github") },
      { name: "Workflow committed", validate: testCommandRegex(/git commit/) },
    ],
  },
  {
    id: "release-workflow",
    chapter: 29,
    title: "Release Workflow",
    section: "GitHub",
    level: "Advanced",
    tags: ["Release", "Version", "Deploy", "SemVer"],
    conceptExplanation: `A release workflow automates the process of publishing new versions of your software.

**Release Process:**
1. Create a release branch (release/1.2.0)
2. Bump version numbers
3. Update changelog
4. Create a PR to review the release
5. Merge to main
6. Tag the release (v1.2.0)
7. Build and publish
8. Deploy to production

**GitHub Releases:**
GitHub Releases build on top of tags. They add:
• Release notes and changelog
• Downloadable assets (binaries, archives)
• Automatic linking from the repository page

**Automated Release Workflow:**
on:
  push:
    tags:
      - 'v*'
jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm run build
      - uses: softprops/action-gh-release@v1
        with:
          generate_release_notes: true`,
    keyRules: [
      "Use semantic versioning consistently — MAJOR.MINOR.PATCH",
      "Automate as much of the release process as possible",
      "Create a CHANGELOG.md to document what changed in each release",
      "Tag the release BEFORE building — the tag marks the release commit",
      "Never delete a published release tag — it breaks the npm/bundler ecosystem",
    ],
    mission: `Create a complete release workflow.

**Scenario:** Version 1.1.0 is ready. Create an automated release workflow that tags the release and publishes it.

**Steps:**
1. Update version in package.json
2. Update CHANGELOG.md
3. Commit the version bump
4. Tag the release as v1.1.0
5. Create a GitHub release workflow`,
    initialRepo: {
      setup: true,
      commits: [
        { id: "a1b2c3d", message: "Initial commit", parent: null },
        { id: "b2c3d4e", message: "Add all features for v1.1", parent: "a1b2c3d" },
      ],
      branches: { main: "b2c3d4e" },
      HEAD: { type: "branch", name: "main" },
    },
    missionValidation: (commands) => {
      return commands.some(c => /^git tag/i.test(c)) && commands.some(c => /^git commit/i.test(c));
    },
    starterCode: "",
    solutionCode: `# Create changelog
cat > CHANGELOG.md << 'EOF'
# Changelog

## [1.1.0] - 2024-01-15
### Added
- User authentication via OAuth
- Dashboard with analytics
- Dark mode support
EOF

# Commit the release prep
git add CHANGELOG.md
git commit -m "chore: prepare release v1.1.0"

# Tag the release
git tag -a v1.1.0 -m "Release v1.1.0 - Auth, Dashboard, Dark Mode"

# Push everything
git push origin main --tags`,
    hint: "Update changelog, commit, create an annotated tag 'v1.1.0', and push with --tags.",
    tests: [
      { name: "Release commit made", validate: testCommandRegex(/git commit/) },
      { name: "Release tag created", validate: testCommandContains("git tag") },
    ],
  },
  {
    id: "git-workflow-boss",
    chapter: 30,
    title: "Git Workflow Boss Battle",
    section: "GitHub",
    level: "Advanced",
    tags: ["Boss", "Final", "Challenge", "All Concepts"],
    conceptExplanation: `This is the FINAL BOSS — combining everything you've learned into one complete workflow.

**The Ultimate Challenge:**
1. Initialize a repository
2. Make initial commits
3. Create a feature branch
4. Make changes and commit
5. Create a second feature branch
6. Switch between branches
7. Merge one branch
8. Rebase the other
9. Resolve a conflict
10. Tag the release
11. Push everything

This simulates a real-world development cycle from start to finish.

**Real-World Scenario:**
You're a developer working on an e-commerce platform. You need to:
• Set up the project
• Build a product listing feature
• Build a shopping cart feature
• Integrate both features
• Resolve conflicts between them
• Release version 1.0.0`,
    keyRules: [
      "Think before each command — what state is the repository in?",
      "Use 'git log --graph' to visualize the branching structure",
      "Check 'git status' when you're unsure of the current state",
      "Commit early, commit often — every commit is a save point",
      "You've learned everything you need — trust the process!",
    ],
    mission: `Complete the full Git workflow from start to finish.

**Scenario:** Build an e-commerce platform with two features, merge them, tag the release.

**Steps:**
1. Initialize repo and set up main
2. Create product-listing feature branch
3. Add products.js and commit
4. Switch to main
5. Create shopping-cart feature branch
6. Add cart.js and commit
7. Merge product-listing into main
8. Merge shopping-cart into main (resolve conflicts)
9. Tag v1.0.0
10. Show the final git log`,
    initialRepo: {
      setup: false,
    },
    missionValidation: (commands) => {
      const hasBranch = commands.some(c => /^git branch/i.test(c)) || commands.some(c => /checkout -b/.test(c));
      const hasMerge = commands.some(c => /^git merge/i.test(c));
      const hasTag = commands.some(c => /^git tag/i.test(c));
      return hasBranch && hasMerge && hasTag;
    },
    starterCode: "",
    solutionCode: `# Step 1: Initialize and set up
git init
echo "# E-Commerce Platform" > README.md
git add README.md
git commit -m "Initial commit"

# Step 2: Create first feature branch
git checkout -b feature/product-listing
echo "class Product { constructor(name, price) { this.name = name; this.price = price; } }" > products.js
git add products.js
git commit -m "feat: add product listing module"

# Step 3: Go back to main
git checkout main

# Step 4: Create second feature branch
git checkout -b feature/shopping-cart
echo "class Cart { constructor() { this.items = []; } }" > cart.js
git add cart.js
git commit -m "feat: add shopping cart module"

# Step 5: Merge first feature into main
git checkout main
git merge feature/product-listing

# Step 6: Merge second feature (resolve any conflicts)
git merge feature/shopping-cart

# Step 7: Tag the release
git tag -a v1.0.0 -m "Release v1.0.0 - E-Commerce Platform"

# Step 8: Final verification
git log --oneline --graph --all`,
    hint: "Start with 'git init', create branches with 'git checkout -b', merge with 'git merge', and tag with 'git tag -a'.",
    tests: [
      { name: "Repository initialized", validate: testCommandContains("git init") },
      { name: "Feature branches created", validate: testCommandContains("git branch") || testCommandContains("checkout -b") },
      { name: "Branches merged", validate: testCommandContains("git merge") },
      { name: "Release tagged", validate: testCommandContains("git tag") },
    ],
  },
];

// ─── BOSS BATTLE CHALLENGES ───

export const GIT_BOSS_CHALLENGES = [
  {
    id: "boss-branching",
    title: "Branching Boss",
    difficulty: "Intermediate",
    description: "Master the art of branching. Create, switch, merge, and delete branches in sequence.",
    mission: `Complete the branching gauntlet:
1. Create a branch called 'feature/header'
2. Switch to it
3. Make a commit
4. Switch back to main
5. Merge the feature branch
6. Delete the feature branch`,
    initialRepo: {
      setup: true,
      commits: [{ id: "a1b2c3d", message: "Initial commit", parent: null }],
      branches: { main: "a1b2c3d" },
      HEAD: { type: "branch", name: "main" },
    },
    validation: (commands) => {
      const hasBranch = commands.some(c => /git branch.*feature/.test(c) || /checkout -b.*feature/.test(c));
      const hasMerge = commands.some(c => /^git merge/i.test(c));
      const hasDelete = commands.some(c => /git branch -d/i.test(c));
      return hasBranch && hasMerge && hasDelete;
    },
    solution: `git branch feature/header
git checkout feature/header
echo "<header>Site Header</header>" > header.html
git add header.html
git commit -m "feat: add site header"
git checkout main
git merge feature/header
git branch -d feature/header`,
    hint: "Create branch → switch → commit → switch back → merge → delete. Use 'git branch -d' to delete after merge.",
  },
  {
    id: "boss-rebase",
    title: "Rebase Boss",
    difficulty: "Advanced",
    description: "Rebase a feature branch onto main and resolve any conflicts that arise.",
    mission: `Rebase challenge:
1. Ensure main has a commit ahead of your feature branch
2. Switch to the feature branch
3. Rebase onto main
4. Resolve any conflicts
5. Verify the linear history`,
    initialRepo: {
      setup: true,
      commits: [
        { id: "a1b2c3d", message: "Initial commit", parent: null },
        { id: "m1n2o3p", message: "Update main", parent: "a1b2c3d" },
      ],
      branches: { main: "m1n2o3p", "feature/api": "a1b2c3d" },
      HEAD: { type: "branch", name: "feature/api" },
    },
    validation: (commands) => {
      return commands.some(c => /^git rebase/i.test(c));
    },
    solution: `git rebase main
git log --oneline --graph`,
    hint: "Switch to the feature branch and run 'git rebase main'.",
  },
  {
    id: "boss-github",
    title: "GitHub Boss",
    difficulty: "Intermediate",
    description: "Complete the full GitHub workflow — branch, commit, push, and manage a PR scenario.",
    mission: `GitHub workflow gauntlet:
1. Create a feature branch
2. Make multiple commits with good messages
3. Push the branch
4. Create a PR by pushing to origin
5. Merge the PR locally`,
    initialRepo: {
      setup: true,
      commits: [{ id: "a1b2c3d", message: "Initial commit", parent: null }],
      branches: { main: "a1b2c3d" },
      HEAD: { type: "branch", name: "main" },
      hasOrigin: false,
    },
    validation: (commands) => {
      return commands.some(c => /^git push/i.test(c)) && commands.some(c => /^git merge/i.test(c));
    },
    solution: `git checkout -b feature/footer
echo "<footer>Copyright 2024</footer>" > footer.html
git add footer.html
git commit -m "feat: add site footer"
git push origin feature/footer
git checkout main
git merge feature/footer
git push origin main`,
    hint: "Branch → commit → push → switch to main → merge → push main.",
  },
];

// ─── MERGE CONFLICT SCENARIOS ───

export const MERGE_CONFLICTS = [
  {
    id: "conflict-easy",
    title: "Simple Variable Conflict",
    difficulty: "Easy",
    description: "Two branches modified the same variable on the same line.",
    scenario: "Both teams changed the API URL on the same line of config.js.",
    files: {
      "config.js": {
        current: 'const API_URL = "https://staging.example.com/api";',
        incoming: 'const API_URL = "https://production.example.com/api";',
        expected: 'const API_URL = "https://production.example.com/api";',
      },
    },
    conflictContent: `<<<<<<< HEAD
const API_URL = "https://staging.example.com/api";
=======
const API_URL = "https://production.example.com/api";
>>>>>>> production-config`,
  },
  {
    id: "conflict-medium",
    title: "Function Implementation Conflict",
    difficulty: "Medium",
    description: "Two developers implemented the same function differently.",
    scenario: "Two team members both implemented the calculateDiscount function.",
    files: {
      "utils.js": {
        current: `function calculateDiscount(price) {
  return price * 0.1; // 10% discount
}`,
        incoming: `function calculateDiscount(price) {
  if (price > 100) {
    return price * 0.15; // 15% for orders over $100
  }
  return price * 0.05; // 5% for smaller orders
}`,
        expected: `function calculateDiscount(price) {
  if (price > 100) {
    return price * 0.15; // 15% for orders over $100
  }
  return price * 0.05; // 5% for smaller orders
}`,
      },
    },
    conflictContent: `<<<<<<< HEAD
function calculateDiscount(price) {
  return price * 0.1; // 10% discount
}
=======
function calculateDiscount(price) {
  if (price > 100) {
    return price * 0.15; // 15% for orders over $100
  }
  return price * 0.05; // 5% for smaller orders
}
>>>>>>> tiered-pricing`,
  },
  {
    id: "conflict-hard",
    title: "Multi-file Merge Conflict",
    difficulty: "Hard",
    description: "Multiple files have conflicts that need resolution.",
    scenario: "A large feature branch with changes to 3 files conflicts with main.",
    files: {
      "app.js": {
        current: 'const port = 3000;',
        incoming: 'const port = process.env.PORT || 3000;',
        expected: 'const port = process.env.PORT || 3000;',
      },
      "index.html": {
        current: '<title>My App</title>',
        incoming: '<title>My App v2.0</title>',
        expected: '<title>My App v2.0</title>',
      },
    },
    conflictContent: `Multiple files have conflicts. Resolve each one by keeping the improved version.`,
  },
  {
    id: "conflict-nightmare",
    title: "Nightmare Mode",
    difficulty: "Nightmare",
    description: "Complex conflict with intertwined changes across a large file.",
    scenario: "A complete refactor of the authentication module conflicts with new security features.",
    files: {
      "auth.js": {
        current: `function login(user, pass) {
  // Legacy login
  if (user === "admin" && pass === "1234") {
    return { token: "old-token" };
  }
  return null;
}`,
        incoming: `async function login(email, password) {
  // Modern authentication
  const user = await db.findUser(email);
  const valid = await bcrypt.compare(password, user.hash);
  if (valid) {
    const token = jwt.sign({ id: user.id }, SECRET);
    return { token, user };
  }
  throw new Error("Invalid credentials");
}`,
        expected: `async function login(email, password) {
  // Modern authentication
  const user = await db.findUser(email);
  const valid = await bcrypt.compare(password, user.hash);
  if (valid) {
    const token = jwt.sign({ id: user.id }, SECRET);
    return { token, user };
  }
  throw new Error("Invalid credentials");
}`,
      },
    },
    conflictContent: `Large conflict in auth.js. The entire function was rewritten differently by two teams.`,
  },
];

// ─── TEAM COLLABORATION SCENARIOS ───

export const TEAM_SCENARIOS = [
  {
    id: "team-basic",
    title: "Team Sprint — Basic",
    difficulty: "Intermediate",
    description: "You're Developer #3 in a 5-person team. Complete your sprint tasks.",
    role: "Developer #3",
    team: [
      { name: "Alice", role: "Frontend Lead" },
      { name: "Bob", role: "Backend Lead" },
      { name: "You", role: "Full Stack Developer" },
      { name: "Carol", role: "QA Engineer" },
      { name: "Dave", role: "DevOps" },
    ],
    sprint: {
      name: "Sprint 24 — Dashboard Redesign",
      tasks: ["Set up dashboard layout", "Add chart components", "Fix navigation bug"],
    },
    mission: `Work as part of the team:
1. Sync with main (pull latest)
2. Create a feature branch 'feat/dashboard-layout'
3. Build the dashboard component
4. Commit with a descriptive message
5. Push your branch
6. (Simulate) Open a PR for review`,
    initialRepo: {
      setup: true,
      commits: [
        { id: "a1b2c3d", message: "Initial commit", parent: null },
        { id: "b2c3d4e", message: "Set up project structure", parent: "a1b2c3d" },
        { id: "c3d4e5f", message: "Add base styles", parent: "b2c3d4e" },
      ],
      branches: { main: "c3d4e5f" },
      HEAD: { type: "branch", name: "main" },
    },
    validation: (commands) => {
      return commands.some(c => /^git push/i.test(c));
    },
    hint: "Pull latest → create branch → make changes → commit → push → (simulate) PR.",
  },
  {
    id: "team-advanced",
    title: "Team Sprint — Advanced",
    difficulty: "Advanced",
    description: "Handle multiple priorities: a new feature AND a hotfix at the same time.",
    role: "Senior Developer",
    team: [
      { name: "Alice", role: "Junior Dev" },
      { name: "Bob", role: "Designer" },
      { name: "You", role: "Senior Dev" },
      { name: "Carol", role: "Product Manager" },
    ],
    sprint: {
      name: "Sprint 25 — Release v2.0 Prep",
      tasks: ["Implement search feature", "Fix production hotfix", "Review team PRs"],
    },
    mission: `Multi-tasking workflow:
1. Start building search feature on 'feat/search'
2. Receive urgent hotfix request
3. Stash your WIP
4. Create 'hotfix/critical-bug' from main
5. Fix the bug and commit
6. Switch back to feature branch
7. Pop the stash and continue
8. Merge both into main`,
    initialRepo: {
      setup: true,
      commits: [
        { id: "a1b2c3d", message: "Initial commit", parent: null },
        { id: "b2c3d4e", message: "Add base app", parent: "a1b2c3d" },
      ],
      branches: { main: "b2c3d4e" },
      HEAD: { type: "branch", name: "main" },
    },
    validation: (commands) => {
      return commands.some(c => /^git stash/i.test(c)) &&
             commands.some(c => /^git merge/i.test(c));
    },
    hint: "Stash WIP → checkout main → create hotfix → fix & commit → switch back → pop stash → merge both.",
  },
];

// ─── INTERVIEW PREPARATION ───

export const GIT_INTERVIEW_TOPICS = [
  {
    id: "merge-vs-rebase",
    title: "Merge vs Rebase",
    questions: [
      "What is the difference between git merge and git rebase?",
      "When would you choose rebase over merge?",
      "What is the 'golden rule' of rebasing?",
      "How does merge --no-ff differ from a regular merge?",
      "What happens to commit hashes after a rebase?",
      "Can you undo a rebase? How?",
      "What is a merge conflict and how do you resolve it?",
      "Describe a workflow that uses both merge and rebase effectively.",
    ],
  },
  {
    id: "reset-vs-revert",
    title: "Reset vs Revert",
    questions: [
      "What's the difference between git reset and git revert?",
      "When should you use revert instead of reset?",
      "What are the three modes of git reset?",
      "How does git reset --soft differ from --hard?",
      "Can you recover from a hard reset?",
      "Why is revert considered 'safer' for shared branches?",
      "How do you unstage a file without losing changes?",
      "What command would you use to undo the last 3 commits while keeping changes?",
    ],
  },
  {
    id: "cherry-pick-stash",
    title: "Cherry Pick & Stash",
    questions: [
      "What is git cherry-pick and when would you use it?",
      "How does cherry-pick differ from merge and rebase?",
      "What happens to the original commit after cherry-picking?",
      "How do you cherry-pick a range of commits?",
      "What is git stash and what problem does it solve?",
      "What's the difference between stash pop and stash apply?",
      "How do you stash untracked files?",
      "What happens to stashed changes after a branch switch?",
    ],
  },
  {
    id: "git-internals",
    title: "Git Internals & Advanced",
    questions: [
      "What is the difference between HEAD, index, and working directory?",
      "How does Git store data internally (blobs, trees, commits)?",
      "What is a detached HEAD state and how do you recover from it?",
      "How does git bisect work and what makes it efficient?",
      "What is git reflog and how do you use it to recover lost commits?",
      "What is the difference between fast-forward and 3-way merge?",
      "How does git garbage collection work?",
      "What is the purpose of .gitkeep and .gitignore?",
    ],
  },
  {
    id: "branching-strategies",
    title: "Branching Strategies",
    questions: [
      "Compare Git Flow, GitHub Flow, and Trunk-Based Development.",
      "What are the advantages of trunk-based development?",
      "When would you choose Git Flow over GitHub Flow?",
      "How do you handle hotfixes in each branching strategy?",
      "What is a release branch and when should you create one?",
      "How do feature flags relate to branching strategies?",
      "What is the ideal branch lifetime?",
      "How do you handle long-lived feature branches?",
    ],
  },
];
