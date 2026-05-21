---
title: "React Strict Mode"
description: "Learn about React Strict Mode and how it helps identify potential problems in your application."
sort: 6
---

## React.StrictMode

- A tool for highlighting potential problems in a React application.
- Activates additional checks and warnings for its descendants.
- Strict mode checks run in **development mode only** (do not impact production).
- **Renders components twice** in dev mode to detect side effects and potential issues.

```jsx
import React, { StrictMode } from "react";
<StrictMode>
  <App />
</StrictMode>
```

**StrictMode helps with:**
- Identifying components with unsafe lifecycles (`componentWillMount`)
- Warning about legacy string ref API usage
- Warning about deprecated `findDOMNode()` usage
- Detecting unexpected side effects
- Detecting legacy context API

---
