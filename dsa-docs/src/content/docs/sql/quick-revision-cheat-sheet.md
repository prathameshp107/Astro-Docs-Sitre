---
title: "Quick Revision Cheat Sheet"
description: "---"
---

## 19. Quick Revision Cheat Sheet

```
╔══════════════════════════════════════════════════════════════════╗
║                  MySQL QUICK CHEAT SHEET                        ║
╠══════════════════════════════════════════════════════════════════╣
║  DDL: CREATE, ALTER, DROP, TRUNCATE, RENAME                     ║
║  DML: SELECT, INSERT, UPDATE, DELETE                            ║
║  DCL: GRANT, REVOKE                                             ║
║  TCL: COMMIT, ROLLBACK, SAVEPOINT                               ║
╠══════════════════════════════════════════════════════════════════╣
║  JOINS                                                          ║
║  INNER   → matching rows only                                   ║
║  LEFT    → all left + matching right                            ║
║  RIGHT   → all right + matching left                            ║
║  FULL    → all rows (UNION of LEFT + RIGHT)                     ║
║  CROSS   → cartesian product                                    ║
║  SELF    → table joined with itself                             ║
╠══════════════════════════════════════════════════════════════════╣
║  KEYS                                                           ║
║  PRIMARY   → unique + not null + clustered index                ║
║  FOREIGN   → references PK in another table                     ║
║  UNIQUE    → unique, allows NULL, multiple per table            ║
║  COMPOSITE → PK/UK on multiple columns                         ║
╠══════════════════════════════════════════════════════════════════╣
║  NORMALIZATION                                                  ║
║  1NF  → atomic values                                           ║
║  2NF  → no partial dependencies                                 ║
║  3NF  → no transitive dependencies                              ║
║  BCNF → every determinant is a superkey                        ║
╠══════════════════════════════════════════════════════════════════╣
║  ACID                                                           ║
║  Atomicity   → all or nothing                                   ║
║  Consistency → valid state before and after                     ║
║  Isolation   → transactions don't interfere                     ║
║  Durability  → committed data persists                          ║
╠══════════════════════════════════════════════════════════════════╣
║  ISOLATION LEVELS (strictest → loosest)                         ║
║  SERIALIZABLE > REPEATABLE READ > READ COMMITTED >              ║
║  READ UNCOMMITTED                                               ║
║  Default: REPEATABLE READ                                       ║
╠══════════════════════════════════════════════════════════════════╣
║  INDEX TYPES                                                    ║
║  Clustered    → PK, data IS the index (1 per table)             ║
║  Non-clustered→ secondary, points to PK                        ║
║  Composite    → multi-column (follow leftmost prefix)           ║
║  Covering     → all query cols in index ("Using index")         ║
║  Full-text    → text search with MATCH...AGAINST                ║
╠══════════════════════════════════════════════════════════════════╣
║  EXPLAIN type column (best → worst)                             ║
║  system > const > eq_ref > ref > range > index > ALL           ║
╠══════════════════════════════════════════════════════════════════╣
║  DELETE vs TRUNCATE vs DROP                                     ║
║  DELETE   → DML, WHERE allowed, can rollback, triggers fire     ║
║  TRUNCATE → DDL, no WHERE, faster, resets AUTO_INCREMENT        ║
║  DROP     → removes entire table                                ║
╠══════════════════════════════════════════════════════════════════╣
║  WHERE vs HAVING                                                ║
║  WHERE  → filters rows BEFORE GROUP BY                          ║
║  HAVING → filters groups AFTER GROUP BY                         ║
╠══════════════════════════════════════════════════════════════════╣
║  UNION vs UNION ALL                                             ║
║  UNION     → removes duplicates (slower)                        ║
║  UNION ALL → keeps duplicates (faster)                          ║
╠══════════════════════════════════════════════════════════════════╣
║  WINDOW FUNCTIONS (MySQL 8.0+)                                  ║
║  ROW_NUMBER()  → unique row number (no ties)                    ║
║  RANK()        → tied rows get same rank + gap                  ║
║  DENSE_RANK()  → tied rows get same rank, no gap               ║
║  LAG(col, n)   → value of col from n rows back                  ║
║  LEAD(col, n)  → value of col from n rows ahead                 ║
╠══════════════════════════════════════════════════════════════════╣
║  COMMON INTERVIEW PATTERNS                                      ║
║  Nth highest salary → DENSE_RANK() or LIMIT/OFFSET             ║
║  Duplicates         → GROUP BY + HAVING COUNT(*) > 1           ║
║  Employees w/o dept → LEFT JOIN + IS NULL                       ║
║  Self-referencing   → SELF JOIN on manager_id = id             ║
║  Running total      → SUM() OVER (ORDER BY ... ROWS ...)        ║
╠══════════════════════════════════════════════════════════════════╣
║  PERFORMANCE CHECKLIST                                          ║
║  ✅ Use indexes on WHERE, JOIN, ORDER BY columns               ║
║  ✅ Avoid SELECT *                                              ║
║  ✅ Avoid functions on indexed columns in WHERE                 ║
║  ✅ Use EXPLAIN to inspect execution plan                       ║
║  ✅ Use covering indexes for read-heavy queries                 ║
║  ✅ Use LIMIT for top-N queries                                 ║
║  ✅ Rewrite correlated subqueries as JOINs                      ║
║  ✅ Solve N+1 with JOINs                                        ║
╚══════════════════════════════════════════════════════════════════╝
```

---

### 💡 Final Interview Tips

- Always **explain your reasoning** — interviewers want to see how you think
- For optimization questions: mention **EXPLAIN**, **indexing strategy**, and **query rewriting**
- Know the difference between **InnoDB and MyISAM** cold
- Practice writing **window functions** — they appear in almost every senior SQL interview
- Understand the **execution order** of SQL: `FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT`
- When asked about slow queries, start with: **"I'd run EXPLAIN first..."**
- Know your **NULL quirks**: `NULL = NULL` is false; use `IS NULL`; `NOT IN` with NULLs returns empty set

---

*Happy Querying! 🚀 — Practice makes permanent.*