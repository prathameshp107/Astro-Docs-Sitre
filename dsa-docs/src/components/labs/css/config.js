// ─── CSS Labs — Configuration ───

export const STORAGE_KEY = "css-progress";
export const DRAFT_KEY = "css-draft";

export const CSS_CONFETTI = ["#60a5fa", "#34d399", "#a78bfa", "#f472b6"];

export const XP_VALUES = {
  lesson: 10,
  challenge: 20,
  component: 15,
  animation: 15,
};

export const XP_LABELS = {
  lesson: "Lesson complete",
  challenge: "Challenge solved",
  component: "Component built",
  animation: "Animation created",
};

export const PLAYGROUND_CODE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CSS Playground</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      padding: 2rem;
      line-height: 1.6;
      color: #1e293b;
    }

    h1 {
      color: #60a5fa;
    }

    .card {
      padding: 1.5rem;
      background: #f1f5f9;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
    }
  </style>
</head>
<body>
  <h1>CSS Playground</h1>
  <div class="card">
    <p>Edit the CSS in the editor to see live preview updates!</p>
  </div>
</body>
</html>`;
