---
title: "Quick Reference Summary"
description: "---"
sidebar:
  order: 15
---

## 9. Quick Reference Summary

| Join Type      | Returns                                            | NULL appears when                           |
|----------------|----------------------------------------------------|---------------------------------------------|
| INNER JOIN     | Only rows with a match in both tables              | Never (unmatched rows are dropped entirely) |
| LEFT JOIN      | All rows from left + matched rows from right       | Right-side columns when left has no match   |
| RIGHT JOIN     | Matched rows from left + all rows from right       | Left-side columns when right has no match   |
| FULL OUTER     | All rows from both tables                          | Either side when the other has no match     |
| CROSS JOIN     | Every combination (no ON condition)                | Never (all combinations are output)         |
| SELF JOIN      | A table joined to itself via aliases               | Depends on whether LEFT or INNER is used    |
| Anti-Join      | Rows that have NO match in the other table         | Used intentionally to find unmatched rows   |

---