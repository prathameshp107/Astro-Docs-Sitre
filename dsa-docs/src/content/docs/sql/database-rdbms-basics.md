---
title: "Database & RDBMS Basics"
description: "---"
sidebar:
  order: 1
---

## 1. Database & RDBMS Basics

### What is a Database?
A **database** is an organized collection of structured data stored electronically. A **DBMS** (Database Management System) is software that manages this data.

### RDBMS vs DBMS

| Feature | DBMS | RDBMS |
|---|---|---|
| Data Storage | Files | Tables (rows + columns) |
| Relationships | Not enforced | Enforced via keys |
| ACID | Not always | Yes |
| Examples | File system, XML | MySQL, PostgreSQL, Oracle |

### Key Terminology

| Term | Definition |
|---|---|
| **Table** | A collection of rows and columns (like a spreadsheet) |
| **Row / Record** | A single data entry in a table |
| **Column / Field** | A category of data (attribute) |
| **Schema** | The structure/blueprint of a database |
| **Query** | A request to retrieve or manipulate data |
| **Relation** | A table in relational model terms |

### SQL Sublanguages

```
DDL  (Data Definition Language)    → CREATE, ALTER, DROP, TRUNCATE
DML  (Data Manipulation Language)  → SELECT, INSERT, UPDATE, DELETE
DCL  (Data Control Language)       → GRANT, REVOKE
TCL  (Transaction Control Language)→ COMMIT, ROLLBACK, SAVEPOINT
DQL  (Data Query Language)         → SELECT
```

---