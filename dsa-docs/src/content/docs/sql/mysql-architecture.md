---
title: "MySQL Architecture"
description: "Interview Tip: InnoDB is the default and preferred engine. Always use InnoDB unless you have a specific reason."
---

## 2. MySQL Architecture

```
┌─────────────────────────────────────────────┐
│              CLIENT LAYER                   │
│   (mysql CLI, MySQL Workbench, App)         │
└───────────────────┬─────────────────────────┘
                    │ Connection (TCP/IP or Unix Socket)
┌───────────────────▼─────────────────────────┐
│           CONNECTION LAYER                  │
│  Authentication │ Thread Cache │ SSL        │
└───────────────────┬─────────────────────────┘
                    │
┌───────────────────▼─────────────────────────┐
│            SQL LAYER (Server)               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Parser  │→ │Optimizer │→ │Executor  │   │
│  └──────────┘  └──────────┘  └──────────┘   │
│  Query Cache │ Privilege Check              │
└───────────────────┬─────────────────────────┘
                    │
┌───────────────────▼─────────────────────────┐
│          STORAGE ENGINE LAYER               │
│   InnoDB │ MyISAM │ Memory │ Archive        │
└───────────────────┬─────────────────────────┘
                    │
┌───────────────────▼─────────────────────────┐
│            FILE SYSTEM                      │
│   .ibd (InnoDB data) │ .frm (table def)     │
└─────────────────────────────────────────────┘
```

### InnoDB vs MyISAM

| Feature | InnoDB | MyISAM |
|---|---|---|
| Transactions | ✅ Yes | ❌ No |
| Foreign Keys | ✅ Yes | ❌ No |
| Row-level Lock | ✅ Yes | ❌ (Table lock only) |
| Crash Recovery | ✅ Yes | ❌ Limited |
| Full-text Search | ✅ (5.6+) | ✅ Yes |
| Default since | MySQL 5.5+ | MySQL < 5.5 |

> **Interview Tip:** InnoDB is the default and preferred engine. Always use InnoDB unless you have a specific reason.

---