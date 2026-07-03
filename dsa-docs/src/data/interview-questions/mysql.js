// ─── MySQL Interview Questions (200) ────────────────────────────────────
export const MYSQL_QUESTIONS = [
  // ── Easy ─────────────────────────────────────────────────────────────────
  [
    "What is MySQL and what type of database is it?",
    "easy",
    "MySQL is a relational database management system (RDBMS). It uses SQL for queries, stores data in tables (rows + columns), enforces schemas, supports ACID transactions (with InnoDB), and is open-source. Owned by Oracle. Popular for: web applications (LAMP stack), OLTP workloads, and as a reliable general-purpose database."
  ],
  [
    "What is a relational database?",
    "easy",
    "A relational database organizes data into tables with rows and columns. Tables relate to each other via keys (primary/foreign). Enforces data integrity, supports ACID transactions, uses SQL for queries. Examples: MySQL, PostgreSQL, Oracle, SQL Server. Advantages: structured data, relationships, data consistency, complex queries (JOINs)."
  ],
  [
    "What is a table in MySQL?",
    "easy",
    "A table is a collection of related data organized in rows (records) and columns (fields). Each table has a defined schema (column names, types, constraints). Example: `CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(100), email VARCHAR(255) UNIQUE)`. Tables can have indexes for fast lookups."
  ],
  [
    "What is a row and a column in a database table?",
    "easy",
    "A ROW (record, tuple) represents a single entity in a table (e.g., one user). A COLUMN (field, attribute) represents one property (name, age, email). Columns have data types (INT, VARCHAR, DATE) and constraints (NOT NULL, UNIQUE, DEFAULT). Rows must satisfy the table's schema."
  ],
  [
    "What is a primary key?",
    "easy",
    "A primary key UNIQUELY identifies each row in a table. Must be unique and NOT NULL. Auto-increment integers are common: `id INT PRIMARY KEY AUTO_INCREMENT`. A table can have only ONE primary key (can be composite — multiple columns). InnoDB organizes data by primary key (clustered index)."
  ],
  [
    "What is a foreign key?",
    "easy",
    "A foreign key enforces referential integrity — a column value must exist in another table's primary key. `FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE`. Prevents orphaned records. CASCADE: delete/update child when parent is deleted/updated. SET NULL: set child FK to null on parent delete. RESTRICT: prevent parent delete if children exist."
  ],
  [
    "What is the difference between CHAR and VARCHAR?",
    "easy",
    "CHAR(n): fixed length — always stores n characters (padded with spaces). VARCHAR(n): variable length — stores actual length + 1-2 bytes overhead. CHAR is faster for fixed-length data (codes, flags, phone numbers). VARCHAR is space-efficient for variable data (names, emails). CHAR up to 255 chars, VARCHAR up to 65,535."
  ],
  [
    "What is the difference between INT and BIGINT?",
    "easy",
    "INT: 4 bytes, range -2^31 to 2^31-1 (-2.1B to 2.1B). BIGINT: 8 bytes, range -2^63 to 2^63-1 (much larger). Use INT for most IDs (up to 2B rows). Use BIGINT for: large-scale IDs (social media), astronomical values, or when INT might overflow. `UNSIGNED INT` doubles positive range to ~4.2B."
  ],
  [
    "What is NULL in SQL?",
    "easy",
    "NULL represents missing/unknown data — NOT zero or empty string. NULL ≠ NULL (comparisons evaluate to UNKNOWN, not TRUE). Use `IS NULL` / `IS NOT NULL`, not `= NULL`. In aggregate functions, NULLs are ignored (except COUNT(*)). In expressions, NULL propagates: `1 + NULL = NULL`."
  ],
  [
    "What is the SELECT statement?",
    "easy",
    "`SELECT column1, column2 FROM table WHERE condition ORDER BY col LIMIT n;` — retrieves data from tables. `SELECT *` selects all columns (avoid in production — fetches unnecessary data). Supports: expressions, aliases (`AS`), DISTINCT, functions, subqueries."
  ],
  [
    "What is the WHERE clause?",
    "easy",
    "`WHERE condition` filters rows BEFORE grouping (contrast with HAVING). Operators: `=`, `<>`, `>`, `<`, `>=`, `<=`, `BETWEEN`, `LIKE`, `IN`, `IS NULL`, `AND`, `OR`, `NOT`. Filtering in WHERE is more efficient than filtering in HAVING (uses indexes, reduces rows earlier)."
  ],
  [
    "What is the ORDER BY clause?",
    "easy",
    "`ORDER BY column1 ASC, column2 DESC` sorts results. ASC (default) is ascending, DESC is descending. Can sort by column name, alias, or position (`ORDER BY 1`). For large datasets, ensure the sort column is indexed to avoid filesort."
  ],
  [
    "What is the LIMIT clause?",
    "easy",
    "`LIMIT 10 OFFSET 20` returns 10 rows starting from row 21 (OFFSET skips first 20). Shorthand: `LIMIT 20, 10` (offset, count). Used for pagination. Without ORDER BY, result order is undefined. For large offsets, use keyset pagination (WHERE id > last_seen) instead of OFFSET for better performance."
  ],
  [
    "What is the INSERT INTO statement?",
    "easy",
    "`INSERT INTO users (name, email) VALUES ('Alice', 'a@b.com')` — adds a new row. `INSERT INTO users VALUES (1, 'Alice', 'a@b.com')` — all columns (order matters). `INSERT INTO ... SELECT ...` inserts from another query. `INSERT IGNORE` skips duplicates (no error). `ON DUPLICATE KEY UPDATE` — upsert."
  ],
  [
    "What is the UPDATE statement?",
    "easy",
    "`UPDATE users SET name = 'Bob', updated_at = NOW() WHERE id = 1` — modifies existing rows. Always include WHERE unless you intend to update ALL rows. Use ORDER BY + LIMIT for controlled updates (e.g., top N). JOIN in UPDATE: `UPDATE users u JOIN orders o ON u.id = o.user_id SET u.total = o.sum`."
  ],
  [
    "What is the DELETE statement?",
    "easy",
    "`DELETE FROM users WHERE id = 1` — removes rows. Always include WHERE unless you want to clear the table. `DELETE FROM users` removes ALL rows (but keeps the table structure). `TRUNCATE TABLE users` is faster (drops and recreates table, resets auto_increment). DELETE triggers triggers; TRUNCATE does not."
  ],
  [
    "What is the difference between DELETE and TRUNCATE?",
    "easy",
    "DELETE: DML — removes rows one by one, triggers row-level locks, fires triggers, slower, can be rolled back, doesn't reset auto_increment. TRUNCATE: DDL — drops and recreates table, faster (no individual row operations), no triggers, cannot be rolled back in most contexts, resets auto_increment."
  ],
  [
    "What is the difference between DROP and TRUNCATE?",
    "easy",
    "DROP: removes the ENTIRE table (structure + data + indexes + triggers). Irreversible (unless in transaction). TRUNCATE: removes only DATA, keeps table structure (columns, indexes, triggers). Faster than DELETE but also fast. DROP TABLE removes the table definition; TRUNCATE resets it to empty."
  ],
  [
    "What is an alias in SQL (AS)?",
    "easy",
    "Aliases give a temporary name to a column or table: `SELECT name AS user_name, age AS user_age FROM employees AS e`. Column aliases improve readability. Table aliases are essential for self-joins and subqueries. AS is optional: `SELECT name user_name FROM employees e`."
  ],
  [
    "What is the DISTINCT keyword?",
    "easy",
    "`SELECT DISTINCT city FROM users` returns only UNIQUE values — no duplicates. Applies to ALL selected columns (combinations must be unique). Slower on large tables (sorting/grouping required). For counting distinct: `COUNT(DISTINCT city)`. Alternative: `GROUP BY`."
  ],
  [
    "What is the COUNT() function?",
    "easy",
    "`COUNT(*)` counts ALL rows (including NULLs). `COUNT(column)` counts non-NULL values in the column. `COUNT(DISTINCT column)` counts unique non-NULL values. `COUNT(*)` is optimized in InnoDB (no full scan for approximate counts, but still needs index scan for exact)."
  ],
  [
    "What are aggregate functions? (SUM, AVG, MIN, MAX, COUNT)",
    "easy",
    "Aggregate functions compute a single value from a set of rows: `SUM(price)` — total, `AVG(price)` — average, `MIN(price)` — minimum, `MAX(price)` — maximum, `COUNT(*)` — row count. They IGNORE NULL values (except COUNT(*)). Used with GROUP BY to compute per-group aggregates."
  ],
  [
    "What is the GROUP BY clause?",
    "easy",
    "`SELECT department, AVG(salary) FROM employees GROUP BY department` — groups rows with the same values in specified columns, then applies aggregate functions per group. Every column in SELECT must be in GROUP BY or be an aggregate. Without aggregation, GROUP BY acts like DISTINCT."
  ],
  [
    "What is the HAVING clause and how does it differ from WHERE?",
    "easy",
    "`HAVING` filters GROUPS after aggregation (runs after GROUP BY). `WHERE` filters ROWS before aggregation. `HAVING` can use aggregate functions (`HAVING COUNT(*) > 5`); `WHERE` cannot. Example: `SELECT dept, AVG(salary) avg_sal FROM employees GROUP BY dept HAVING avg_sal > 50000`."
  ],
  [
    "What is the LIKE operator?",
    "easy",
    "`LIKE` pattern matches strings: `%` matches any number of characters (including zero), `_` matches exactly one character. `WHERE name LIKE 'A%'` — starts with A. `WHERE name LIKE '%son%'` — contains 'son'. `WHERE name LIKE '___'` — exactly 3 characters. Leading `%` prevents index usage."
  ],
  [
    "What is the IN operator?",
    "easy",
    "`WHERE city IN ('NYC', 'LA', 'CHI')` — matches any value in the list. Equivalent to multiple OR conditions but more readable. `WHERE id IN (SELECT user_id FROM orders)` — subquery in IN. For large lists, IN with subqueries may be less efficient than EXISTS."
  ],
  [
    "What is the BETWEEN operator?",
    "easy",
    "`WHERE age BETWEEN 18 AND 65` — inclusive range test. Equivalent to `age >= 18 AND age <= 65`. Works with: numbers, dates, strings. NOT BETWEEN: `WHERE age NOT BETWEEN 18 AND 65`. Can use index for range query."
  ],
  [
    "What is the IS NULL check?",
    "easy",
    "`WHERE column IS NULL` — checks for NULL. `WHERE column IS NOT NULL` — checks for NOT NULL. Cannot use `= NULL` (returns UNKNOWN, not TRUE). In indexes, NULLs are stored at one end (depends on engine)."
  ],
  [
    "What is AUTO_INCREMENT in MySQL?",
    "easy",
    "`id INT AUTO_INCREMENT PRIMARY KEY` — automatically generates sequential integers for new rows. Starts at 1 (or configured value). Guarantees uniqueness but not continuity (deleted/generated IDs leave gaps). `LAST_INSERT_ID()` returns the last auto-generated ID. InnoDB uses a table-level counter."
  ],
  [
    "What are constraints in MySQL? (NOT NULL, UNIQUE, DEFAULT)",
    "easy",
    "`NOT NULL` — column cannot be NULL. `UNIQUE` — all values in column must be different (creates a unique index). `DEFAULT value` — sets a default value if none provided: `created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`. `CHECK` — validates values (enforced from MySQL 8.0.16). `PRIMARY KEY` = NOT NULL + UNIQUE."
  ],

  // ── Medium ────────────────────────────────────────────────────────────────
  [
    "What is a JOIN? Name the types of JOINs.",
    "med",
    "A JOIN combines rows from two or more tables based on a related column. Types: `INNER JOIN` (matching rows only), `LEFT JOIN` (all left, matching right), `RIGHT JOIN` (all right, matching left), `FULL JOIN` (all from both — MySQL doesn't support natively, use LEFT + UNION + RIGHT), `CROSS JOIN` (cartesian product), `SELF JOIN` (table joined with itself)."
  ],
  [
    "What is the difference between INNER JOIN and LEFT JOIN?",
    "med",
    "`INNER JOIN` returns only rows with matches in BOTH tables. `LEFT JOIN` returns ALL rows from the LEFT table, with NULLs for non-matching right table rows. Example: `users LEFT JOIN orders` gives all users (even those with no orders). `INNER JOIN` excludes users with no orders."
  ],
  [
    "What is a RIGHT JOIN?",
    "med",
    "`RIGHT JOIN` is the reverse of LEFT JOIN — keeps all rows from the RIGHT table, NULLs for non-matching left. `A RIGHT JOIN B` ≡ `B LEFT JOIN A`. Some DBAs avoid RIGHT JOIN for readability (LEFT JOIN is more intuitive). MySQL supports RIGHT JOIN."
  ],
  [
    "What is a FULL OUTER JOIN? Does MySQL support it natively?",
    "med",
    "FULL JOIN returns ALL rows from both tables, with NULLs where no match exists. MySQL does NOT natively support FULL JOIN. Emulate: `SELECT * FROM a LEFT JOIN b ON a.id=b.aid UNION SELECT * FROM a RIGHT JOIN b ON a.id=b.aid`. The UNION removes duplicates."
  ],
  [
    "What is a CROSS JOIN?",
    "med",
    "`CROSS JOIN` produces a cartesian product — every row from table A paired with every row from table B (no ON clause). Example: 10 users × 5 products = 50 rows. Use with caution — can produce huge result sets. Useful for: creating combinations, calendar tables, test data."
  ],
  [
    "What is a SELF JOIN?",
    "med",
    "A SELF JOIN joins a table with ITSELF using different aliases. `SELECT e1.name, e2.name AS manager FROM employees e1 JOIN employees e2 ON e1.manager_id = e2.id`. Uses: employee-manager relationships, hierarchical data, comparing rows in the same table."
  ],
  [
    "What is a subquery in SQL?",
    "med",
    "A subquery is a query nested inside another query (SELECT, FROM, or WHERE clause). `SELECT * FROM users WHERE id IN (SELECT user_id FROM orders WHERE total > 100)`. Types: scalar (returns one value), row (one row), table (multiple rows/columns). Correlated: references outer query. Uncorrelated: independent."
  ],
  [
    "What is the difference between a correlated and non-correlated subquery?",
    "med",
    "Correlated: inner query references outer query — runs ONCE PER outer row (slower). Non-correlated: inner query is independent — runs ONCE. Example: correlated: `WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id)`. Non-correlated: `WHERE id IN (SELECT user_id FROM orders)`."
  ],
  [
    "What is the EXISTS operator?",
    "med",
    "`EXISTS (subquery)` returns TRUE if the subquery returns at least one row. More efficient than IN for large subquery result sets (stops at first match). Example: `SELECT * FROM users u WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id)`. `NOT EXISTS` — inverse."
  ],
  [
    "What is a view in MySQL?",
    "med",
    "A view is a stored query that behaves like a virtual table. `CREATE VIEW active_users AS SELECT * FROM users WHERE status = 'active'`. Benefits: security (hide columns, restrict rows), simplify complex queries, data abstraction. Limitations: performance (runs underlying query each time), some views are not updatable."
  ],
  [
    "What are the advantages and limitations of views?",
    "med",
    "Advantages: security (hide sensitive columns/rows), simplify complex joins/aggregations, data abstraction (schema changes don't break consumers), reusable query logic. Limitations: performance (re-executes each time), limited updatability (must be simple SELECT), materialized views not natively supported in MySQL (use triggers or scheduled scripts)."
  ],
  [
    "What is a stored procedure?",
    "med",
    "A stored procedure is a set of precompiled SQL statements stored on the server. `CREATE PROCEDURE GetUsers(IN city VARCHAR(100)) BEGIN SELECT * FROM users WHERE city = city; END`. Benefits: reduced network traffic, code reuse, security (execute privileges), performance (compiled once). Supports: IN/OUT/INOUT parameters, variables, cursors, control flow."
  ],
  [
    "What is the difference between a stored procedure and a function?",
    "med",
    "Functions: return a SINGLE value (scalar or table), can be used in SQL expressions (`SELECT func(x)`), cannot use OUT parameters, no transactions. Stored procedures: may return 0+ result sets, use OUT parameters, can perform transactions, cannot be used in expressions. Use functions for computations; stored procedures for operations."
  ],
  [
    "What is a trigger in MySQL?",
    "med",
    "A trigger automatically executes SQL code BEFORE/AFTER INSERT, UPDATE, or DELETE on a table. `CREATE TRIGGER before_insert_user BEFORE INSERT ON users FOR EACH ROW SET NEW.created_at = NOW()`. Use for: audit logs, validation, cascading updates, computed columns. Limitations: can cause performance issues (statement-level triggers not supported)."
  ],
  [
    "What are MySQL indexes and why are they important?",
    "med",
    "Indexes are data structures (B+Tree) that speed up data retrieval. Similar to a book's index. Created: `CREATE INDEX idx_name ON users (name)`. Benefits: faster SELECT, WHERE, JOIN, ORDER BY. Costs: slower writes (must update index), disk space. Choose indexes based on query patterns (high-read tables benefit more)."
  ],
  [
    "What is the difference between a clustered and non-clustered index?",
    "med",
    "Clustered: determines the PHYSICAL order of data in the table. InnoDB always has a clustered index (the primary key). Data IS the index leaf node (no extra lookup). Each table can have only ONE clustered index. Non-clustered: a separate structure with pointers to data rows (or clustered index keys). Multiple allowed per table."
  ],
  [
    "What is a composite index?",
    "med",
    "A composite index (multi-column index) covers multiple columns: `CREATE INDEX idx_name_age ON users (name, age)`. Follows the LEFTMOST PREFIX rule — queries must use the leftmost columns first. Supports: queries on `name`, `name + age`, but NOT `age` alone. Order columns: equality first, then range."
  ],
  [
    "What is the difference between UNIQUE index and PRIMARY KEY?",
    "med",
    "UNIQUE: ensures all values are distinct, allows one NULL (in MySQL), can have multiple per table. PRIMARY KEY: NOT NULL + UNIQUE, only one per table, InnoDB uses it as the clustered index, often AUTO_INCREMENT. Both create an index internally."
  ],
  [
    "What is the EXPLAIN command in MySQL?",
    "med",
    "`EXPLAIN SELECT ...` shows the query execution plan. Key columns: `type` (ALL = full scan, range = range scan, ref = index lookup, const = unique lookup), `key` (index used), `rows` (estimated rows examined), `Extra` (Using index = covering, Using filesort = needs sort, Using temporary = temp table). Use EXPLAIN to identify slow queries."
  ],
  [
    "What is query optimisation in MySQL?",
    "med",
    "Optimize: 1) Use EXPLAIN to understand execution plans. 2) Add appropriate indexes (composite, covering). 3) Avoid SELECT *. 4) Use JOINs instead of subqueries. 5) Avoid functions on indexed columns in WHERE. 6) Use LIMIT for pagination. 7) Analyze slow query log. 8) Optimize schema: normalization, proper data types, partitioning."
  ],
  [
    "What are MySQL transactions?",
    "med",
    "A transaction groups multiple SQL operations into a single unit of work. `START TRANSACTION; UPDATE accounts SET balance = balance - 100 WHERE id = 1; UPDATE accounts SET balance = balance + 100 WHERE id = 2; COMMIT;`. On error: `ROLLBACK` reverts all changes. InnoDB fully supports transactions (MyISAM does not)."
  ],
  [
    "What are ACID properties?",
    "med",
    "ACID guarantees transaction reliability: Atomicity (all-or-nothing — if one statement fails, entire transaction rolls back), Consistency (data is valid before and after — constraints maintained), Isolation (concurrent transactions don't interfere — controlled by isolation level), Durability (committed data persists — via redo log)."
  ],
  [
    "What is the difference between COMMIT and ROLLBACK?",
    "med",
    "`COMMIT` permanently saves all changes made in the current transaction. `ROLLBACK` undoes all changes made since the last COMMIT. Both end the current transaction. In MySQL, DDL statements (CREATE, ALTER, DROP) cause an implicit COMMIT. AUTOCOMMIT mode (default): each statement is its own transaction (auto-COMMIT)."
  ],
  [
    "What are MySQL isolation levels?",
    "med",
    "Four isolation levels: 1) READ UNCOMMITTED — dirty reads possible. 2) READ COMMITTED — no dirty reads, non-repeatable reads possible. 3) REPEATABLE READ (MySQL default) — snapshot consistency, phantom reads possible (not in InnoDB with gap locks). 4) SERIALIZABLE — fully isolated, concurrency bottleneck. Higher isolation = lower concurrency."
  ],
  [
    "What is a dirty read, non-repeatable read, and phantom read?",
    "med",
    "Dirty read: Transaction A reads uncommitted data from Transaction B (if B rolls back, A read invalid data). Non-repeatable read: A reads same row twice, but B updates it between reads — A gets different values. Phantom read: A runs same query twice, B inserts rows between — A gets different row sets on second run."
  ],
  [
    "What is normalization? Explain 1NF, 2NF, 3NF.",
    "med",
    "Normalization reduces data redundancy: 1NF: atomic columns (no repeating groups), primary key. 2NF: 1NF + all non-key columns fully dependent on the ENTIRE primary key (no partial dependencies — relevant for composite keys). 3NF: 2NF + all non-key columns directly dependent on the primary key (no transitive dependencies: column A → column B via column C)."
  ],
  [
    "What is denormalization and when is it useful?",
    "med",
    "Denormalization adds redundant data back for read performance. Use when: read-heavy workloads, need to avoid JOINs, reporting/analytics (pre-computed summaries), caching. Trade-offs: data duplication, update anomalies (must update multiple copies), more storage. Best for: read-heavy OLAP workloads, not OLTP with frequent writes."
  ],
  [
    "What is a CTE (Common Table Expression)?",
    "med",
    "A CTE is a named temporary result set within a query (WITH clause). `WITH dept_avg AS (SELECT dept, AVG(salary) avg_sal FROM employees GROUP BY dept) SELECT * FROM dept_avg WHERE avg_sal > 50000`. Benefits: improves readability, can be referenced multiple times in the same query, enables recursive queries."
  ],
  [
    "What is a recursive CTE?",
    "med",
    "A recursive CTE references itself to traverse hierarchical data. `WITH RECURSIVE org AS (SELECT id, name, manager_id, 1 AS level FROM employees WHERE manager_id IS NULL UNION ALL SELECT e.id, e.name, e.manager_id, org.level + 1 FROM employees e JOIN org ON e.manager_id = org.id) SELECT * FROM org`. Uses: org charts, category trees, graph traversal."
  ],
  [
    "What are window functions in MySQL? (ROW_NUMBER, RANK, LEAD, LAG)",
    "med",
    "Window functions perform calculations across a set of rows related to the current row (WITHOUT collapsing like GROUP BY). `ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC)` — rank within department. `RANK()` — same as ROW_NUMBER but ties share same rank (skip numbers). `DENSE_RANK()` — no gaps. `LEAD(value)` — next row's value. `LAG(value)` — previous row's value. `SUM() OVER (ORDER BY date)` — running total."
  ],
  [
    "What is the difference between RANK and DENSE_RANK?",
    "med",
    "`RANK()` assigns the same rank to ties, then SKIPS numbers (1, 1, 3). `DENSE_RANK()` assigns same rank to ties but NO gaps (1, 1, 2). Example: salaries [100, 100, 90]: RANK → 1, 1, 3; DENSE_RANK → 1, 1, 2."
  ],
  [
    "What is PARTITION BY in window functions?",
    "med",
    "`PARTITION BY` divides rows into groups (partitions) where the window function operates independently within each partition. `ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC)` gives rank WITHIN each department. Without PARTITION BY, the function operates on ALL rows."
  ],
  [
    "What is the difference between UNION and UNION ALL?",
    "med",
    "`UNION` combines two queries and REMOVES duplicates (slower — requires sorting). `UNION ALL` combines without deduplication (faster). Use UNION when you expect duplicates and need clean results. Use UNION ALL when: duplicates don't matter, you know there are no duplicates, or performance matters."
  ],
  [
    "What is the CASE statement in SQL?",
    "med",
    "`CASE WHEN condition1 THEN result1 WHEN condition2 THEN result2 ELSE default END` — conditional logic in SQL. Used in SELECT (computed columns), WHERE (dynamic filters), ORDER BY (custom sort), UPDATE (conditional updates). `CASE expression WHEN value1 THEN ...` — simple equality check."
  ],
  [
    "What is the COALESCE function?",
    "med",
    "`COALESCE(value1, value2, ..., default)` returns the FIRST non-NULL value. Example: `COALESCE(phone, email, 'No contact')` — tries phone, then email, then fallback string. Equivalent to `IFNULL(phone, IFNULL(email, 'No contact'))` but can take multiple arguments."
  ],

  // ── Hard ──────────────────────────────────────────────────────────────────
  [
    "What is the InnoDB storage engine and how does it differ from MyISAM?",
    "hard",
    "InnoDB (default since MySQL 5.5): ACID transactions, row-level locking, foreign keys, crash recovery (redo log + undo log), MVCC, clustered indexes, buffer pool. MyISAM (legacy): table-level locking, no transactions, no foreign keys, crashes lose data (no crash recovery), full-text search (built-in), compressed tables. Always use InnoDB unless you have a specific reason not to."
  ],
  [
    "What is the InnoDB buffer pool?",
    "hard",
    "The buffer pool is the main area where InnoDB caches table data and indexes in memory. `innodb_buffer_pool_size` is the most important MySQL config (typically 70-80% of available RAM). Larger buffer pool = more cache hits = fewer disk reads. Monitor: `Innodb_buffer_pool_read_requests` and `Innodb_buffer_pool_reads` (reads from disk)."
  ],
  [
    "What is a covering index and how does it improve performance?",
    "hard",
    "A covering index contains ALL columns needed for a query — the query can be satisfied entirely from the index without accessing the table data. `EXPLAIN` shows `Using index` (not `Using index condition`). Faster because: no table lookup needed, index is smaller than table, index is sorted. Example: index `(name, email, age)` covers `SELECT name, email FROM users WHERE age > 18`."
  ],
  [
    "What is an index cardinality?",
    "hard",
    "Cardinality is the number of UNIQUE values in an indexed column. HIGH cardinality (many distinct values like email) = high selectivity = good for indexing. LOW cardinality (few distinct values like gender) = low selectivity = less useful for indexing. `SHOW INDEX` shows cardinality. The optimizer uses cardinality to estimate rows and choose query plans."
  ],
  [
    "What is index selectivity?",
    "hard",
    "Selectivity = cardinality / total_rows. High selectivity (close to 1) means the index efficiently narrows down results. Example: email has high selectivity (almost unique per row). Gender has low selectivity (~2 values for millions of rows). For low-selectivity columns, consider composite indexes or partial indexes."
  ],
  [
    "What is the difference between index range scan and full table scan?",
    "med",
    "Range scan: traverses a limited portion of the index (WHERE, BETWEEN, LIKE prefix) — efficient for small ranges. Full table scan: reads ALL rows sequentially — might be faster than an index scan if the query needs a large portion of the table (>20-30%). MySQL optimizer chooses automatically based on estimated rows."
  ],
  [
    "What are the limitations of MySQL indexes?",
    "hard",
    "Limitations: 1) Indexes slow down writes (INSERT, UPDATE, DELETE must update all indexes). 2) Disk space usage. 3) Composite index leftmost prefix rule limits usage. 4) BLOB/TEXT columns can't be fully indexed (prefix only). 5) NULLs in indexes. 6) Maximum index key length (767 bytes for InnoDB, extended to 3072 with `innodb_large_prefix`)."
  ],
  [
    "What is the MySQL query execution plan and how do you read it?",
    "hard",
    "`EXPLAIN FORMAT=JSON SELECT ...` shows the execution plan. Key insights: `access_type` (const > ref > range > index > ALL), `key` (chosen index), `rows` (estimated), `filtered` (%). Look for: `Using temporary` (temp table — may need index), `Using filesort` (in-memory sort), `Using index` (covering index). High `rows` × low `filtered` = bad plan."
  ],
  [
    "What is a slow query log and how do you enable it?",
    "hard",
    "The slow query log records queries that take longer than `long_query_time` (default 10s). Enable: `SET GLOBAL slow_query_log = 1; SET GLOBAL long_query_time = 2; SET GLOBAL log_queries_not_using_indexes = 1`. Analyze with `mysqldumpslow` or `pt-query-digest` (Percona Toolkit). Essential for identifying performance bottlenecks."
  ],
  [
    "What is MVCC (Multi-Version Concurrency Control) in InnoDB?",
    "hard",
    "MVCC allows multiple versions of a row to exist simultaneously. Readers see a consistent snapshot as of their transaction start time — they don't block writers (and vice versa). InnoDB implements MVCC via the undo log (stores older versions). DELETE marks rows with a delete-flag; UPDATE creates a new version. Enables REPEATABLE READ without blocking reads."
  ],
  [
    "What is a deadlock in MySQL and how do you resolve it?",
    "hard",
    "A deadlock occurs when two transactions each hold locks needed by the other. InnoDB detects deadlocks and ROLLS BACK the transaction that did the least work (chooses a victim). `SHOW ENGINE INNODB STATUS` shows the last deadlock. Prevention: ensure consistent order of operations across transactions, keep transactions short, use appropriate isolation levels."
  ],
  [
    "What is row-level locking vs table-level locking?",
    "hard",
    "Row-level (InnoDB): only the specific rows involved in the transaction are locked — high concurrency, but more lock management overhead. Table-level (MyISAM, MEMORY): entire table is locked for writes — simple but low concurrency. Row-level is superior for most workloads. InnoDB also uses: gap locks (prevent phantom reads), next-key locks (row + gap), and intention locks."
  ],
  [
    "What is a gap lock and a next-key lock in InnoDB?",
    "hard",
    "Gap lock: locks the SPACE between index records (prevents INSERTs into that gap). Next-key lock = row lock + gap lock on the space before it. InnoDB uses next-key locks for REPEATABLE READ to prevent phantom reads. Without them, another transaction could insert a row that would appear in subsequent reads. Can cause deadlocks."
  ],
  [
    "What is MySQL replication and how does it work?",
    "hard",
    "Replication copies data from a source (primary) to replicas (secondaries). The primary writes changes to the binary log (binlog). Secondaries read the binlog (I/O thread) and apply events (SQL thread). Types: async (default — primary doesn't wait), semi-sync (primary waits for at least one secondary). Use for: read scaling, disaster recovery, backups."
  ],
  [
    "What is the difference between statement-based and row-based replication?",
    "med",
    "Statement-based (SBR): replicates SQL statements — compact log but non-deterministic functions (UUID, NOW) can cause data inconsistency. Row-based (RBR): replicates actual row changes — consistent but larger log. Mixed: SBR for safe statements, RBR for unsafe. RBR is the default since MySQL 5.7.7."
  ],
  [
    "What is a binlog (binary log)?",
    "hard",
    "The binary log records all changes to the database (DML + DDL). Used for: replication (secondaries read the binlog), point-in-time recovery (PITR), audit trails. `sync_binlog=1` ensures durability (fsync per write). `expire_logs_days` controls retention. Formats: STATEMENT, ROW, MIXED. View with `mysqlbinlog`."
  ],
  [
    "What is MySQL GTID replication?",
    "hard",
    "GTID (Global Transaction Identifier) assigns a unique ID to each transaction: `source_id:transaction_id`. Simplifies replication management: no need to track binlog file/position. `CHANGE MASTER TO MASTER_AUTO_POSITION=1`. Easier failover, promotes consistency. Available since MySQL 5.6."
  ],
  [
    "What is read replica and how is it used for scaling?",
    "hard",
    "A read replica is a secondary database that receives replicated data from the primary. Routes read queries to replicas, writes to primary. Reduces primary load. Use for: read-heavy workloads (reporting, dashboards), geographic distribution (readers in different regions), disaster recovery. Consider: replication lag (stale reads), connection routing."
  ],
  [
    "What is MySQL Group Replication?",
    "hard",
    "Group Replication provides multi-primary or single-primary replication with built-in conflict detection and resolution. Uses Paxos-like consensus. All members apply transactions consistently (no binlog lag in theory). Provides: automatic failover, distributed consistency, no single point of failure. Basis for InnoDB Cluster."
  ],
  [
    "What is MySQL partitioning?",
    "hard",
    "Partitioning splits a table into physical segments (partitions) while still querying as a single table. Types: RANGE (by range of values), LIST (by list of values), HASH (by hash function), KEY (by MySQL's internal hash). `PARTITION BY RANGE (YEAR(created_at)) (PARTITION p0 VALUES LESS THAN (2020), PARTITION p1 VALUES LESS THAN (2021), ...)`. Benefits: partition pruning (query only relevant partitions), easier data archiving (`DROP PARTITION` is fast)."
  ],
  [
    "What are the types of partitioning in MySQL? (RANGE, LIST, HASH, KEY)",
    "hard",
    "RANGE: rows distributed by column value ranges. LIST: by explicit value lists. HASH: by a hash function result. KEY: like HASH but MySQL provides the hash function (for non-integer columns). Sub-partitioning also supported. Partition key should be a column part of the primary key (or unique index)."
  ],
  [
    "What is sharding in MySQL and how does it differ from partitioning?",
    "hard",
    "Sharding: distributing data across MULTIPLE SERVERS (horizontal scaling). Each shard holds a subset of data. Client routes queries to the correct shard. Partitioning: splitting a table within ONE server (multiple physical files). Sharding adds complexity (cross-shard queries, data distribution, resharding). Partitioning is simpler but limited to one server."
  ],
  [
    "What is ProxySQL?",
    "hard",
    "ProxySQL is a high-performance SQL proxy for MySQL. Features: query routing (read/write splitting), connection pooling, query caching, query rewriting, firewall rules, health checking (active/passive), traffic mirroring. Zero-downtime configuration changes via admin interface (`LOAD MYSQL SERVERS TO RUNTIME`). Essential for read/write splitting and connection management at scale."
  ],
  [
    "What is connection pooling in MySQL context?",
    "med",
    "Connection pooling maintains a cache of database connections to avoid the overhead of establishing new connections. The application checks out a connection from the pool, uses it, and returns it. Libraries: HikariCP (Java), php-mysql-pool, ProxySQL, application-level pooling. Pool size: typically 10-30 connections per application instance. Too many connections overload MySQL."
  ],
  [
    "How do you optimise a slow JOIN query?",
    "hard",
    "Optimize: 1) Index the join columns (foreign keys in the joining table). 2) Use covering indexes (include all selected columns). 3) Reduce the number of joined rows with WHERE conditions before the JOIN. 4) Use STRAIGHT_JOIN to force join order. 5) Ensure table statistics are updated (`ANALYZE TABLE`). 6) Consider denormalization or summary tables."
  ],
  [
    "What is the N+1 query problem in SQL context?",
    "med",
    "N+1: you query N rows, then for each row you execute another query (1 + N queries). Example: fetch 100 users, then 100 separate queries for each user's orders. Fix: use JOIN, batch loading (`WHERE user_id IN (...)`), or subqueries. ORMs (Hibernate, Sequelize) can cause N+1 if not careful — use eager loading."
  ],
  [
    "What is database connection pool exhaustion and how do you prevent it?",
    "hard",
    "Connection pool exhaustion: all connections in the pool are in use, new requests wait/error. Causes: slow queries, connection leaks (not returned to pool), too many concurrent requests. Prevention: 1) Set pool size appropriately (not too large — MySQL max_connections). 2) Optimize queries. 3) Implement query timeouts. 4) Monitor active connections. 5) Use connection queue."
  ],
  [
    "What is the difference between optimistic and pessimistic locking in MySQL?",
    "hard",
    "Optimistic: assume no conflict. Read version/timestamp, update SET version = version+1 WHERE version = old_version. If 0 rows affected, retry. Good for low-contention scenarios. Pessimistic: `SELECT ... FOR UPDATE` locks the row(s). Other transactions wait. Good for high-contention scenarios. Trade-off: optimistic retries, pessimistic reduces concurrency."
  ],
  [
    "What is a database migration strategy for zero-downtime deployments?",
    "hard",
    "Zero-downtime migration: 1) ADDITIVE changes only (new columns, new tables) — safe, old code ignores them. 2) Migrate data in batches (no long locks). 3) Use `pt-online-schema-change` (Percona) or `gh-ost` for schema changes that need table rebuilds (ALTER with copy or triggers). 4) Remove deprecated columns/tables after old code is retired. 5) Expand-contract pattern: deploy with both old + new → migrate → deploy removing old."
  ],
  [
    "What is pt-query-digest and how is it used for performance analysis?",
    "hard",
    "`pt-query-digest` analyzes MySQL query logs (slow log, general log, processlist) and produces a ranked report of query performance. Groups similar queries, shows execution statistics (count, total time, avg time, percentiles). Identifies: worst-performing queries, queries with largest impact, query patterns needing optimization. From Percona Toolkit."
  ],
  [
    "What is the difference between MyISAM and InnoDB for full-text search?",
    "hard",
    "MyISAM: built-in FULLTEXT indexes (supports natural language, boolean mode, query expansion). InnoDB: FULLTEXT support added in 5.6. Both support similar features, but InnoDB is transaction-safe and supports foreign keys. For heavy full-text search, consider Elasticsearch or Sphinx instead."
  ],
  [
    "What is JSON data type support in MySQL 5.7+?",
    "hard",
    "MySQL 5.7+ has native JSON data type. Stores JSON as binary (efficient, fast reads). Validates JSON on insert. JSON functions: `JSON_EXTRACT(col, '$.key')`, `col->'$.key'` (shorthand), `JSON_SET`, `JSON_REPLACE`, `JSON_KEYS`, `JSON_CONTAINS`. Virtual columns on JSON fields can be indexed. Good for flexible schemas within a relational database."
  ],
  [
    "What are generated columns (virtual and stored) in MySQL?",
    "hard",
    "Generated columns compute values from other columns. VIRTUAL (no storage, computed on read — default). STORED (stored physically, updated on write). `CREATE TABLE users (first_name VARCHAR(50), last_name VARCHAR(50), full_name VARCHAR(100) GENERATED ALWAYS AS (CONCAT(first_name, ' ', last_name)) STORED)`. Stored columns can be indexed. Useful for: computed values, JSON field extraction, pre-computed aggregations."
  ],
  [
    "What is the MySQL Performance Schema?",
    "hard",
    "The Performance Schema monitors MySQL internal execution at low level. Provides: wait events (I/O, locks, file system), statement events (query execution breakdown), stage events (query phases), transaction events, memory usage, table I/O, index usage. Enabled by default. Query `performance_schema` tables: `events_statements_summary_by_digest`, `file_summary_by_instance`, `memory_summary_global_by_event_name`."
  ],
  [
    "How do you design a schema for a multi-tenant SaaS application in MySQL?",
    "hard",
    "Approaches: 1) Shared table with tenant_id column — simplest, easy cross-tenant queries, but partition/bucket by tenant_id for scaling. 2) Separate database per tenant — best isolation, easier backups, more complex operations. 3) Separate schema per tenant — mid-ground. Considerations: connection pooling (many tenants), tenant isolation, shared vs dedicated resources, schema migration strategy, backup/restore per tenant."
  ],

  // ── Conceptual / Industry (current) ──────────────────────────────────────
  [
    "Why does InnoDB use a B+ tree for indexes instead of a B-tree or hash?",
    "hard",
    "B+ tree is optimal for disk-based storage: 1) Only LEAVES store data (vs B-tree where every node stores data) — more keys per node = wider tree = fewer disk I/O = better cache efficiency. 2) Leaves are linked (sequential access = range scans = fast). 3) Balanced tree height (~3-4 levels for millions of rows) = predictable performance. Hash indexes would lose range query capability."
  ],
  [
    "What is the leftmost prefix rule for composite indexes?",
    "med",
    "A composite index `(a, b, c)` can be used for queries on: `a`, `a + b`, `a + b + c`, but NOT `b alone`, `c alone`, or `b + c`. MySQL can use LEFT PREFIXES only. Also, for range queries: once a range condition is used (`a > 1`), the subsequent columns in the index can only be used for `ICP` (Index Condition Pushdown), not for direct index lookup. Order index columns: equality → range → sort."
  ],
  [
    "Why can a query filter on the second column of a composite index not use it efficiently?",
    "hard",
    "A composite index `(a, b)` organizes data first by `a`, then by `b` within each `a` value. A query on `b` alone would need to scan the ENTIRE index — like looking up a last name in a phone book sorted by first name. MySQL may still use the index (index scan) but much less efficiently than a direct index on `b`."
  ],
  [
    "What is index cardinality and how does the optimizer use it?",
    "med",
    "Index cardinality estimates the number of unique values. MySQL's optimizer uses it to decide: 1) Whether to use the index vs full table scan (low cardinality = less selective → may choose table scan). 2) Which index to use (higher cardinality = more selective). 3) JOIN order (smaller result sets first). Run `ANALYZE TABLE` to update cardinality estimates."
  ],
  [
    "What is a prefix index and when would you create one?",
    "med",
    "A prefix index indexes only the first N characters of a string column. `CREATE INDEX idx_name ON users (name(10))`. Smaller index (less disk, faster), but less selective. Useful for: indexing long strings (VARCHAR(255), TEXT) where first few chars are reasonably selective. Trade-off: cardinality vs index size. Doesn't support full-column lookups."
  ],
  [
    "What is a descending index and when does MySQL 8 benefit from it?",
    "hard",
    "MySQL 8 supports descending indexes: `CREATE INDEX idx ON users (name ASC, created_at DESC)`. Previously, MySQL created all indexes as ascending and did reverse scan for DESC — less efficient. Descending indexes help: `ORDER BY name ASC, created_at DESC` (matches the index direction). Optimizer avoids filesort."
  ],
  [
    "What is an invisible index and why is it useful?",
    "med",
    "An invisible index (`ALTER TABLE ... ALTER INDEX idx_name INVISIBLE`) is maintained (updated on writes) but NOT used by the optimizer. Useful for: testing query performance without an index (before dropping it), confirming an index is unused, gracefully removing indexes in production (make invisible first, observe, then drop)."
  ],
  [
    "What is a functional index in MySQL 8?",
    "med",
    "Functional indexes: `CREATE INDEX idx_lower_email ON users ((LOWER(email)))`. Indexes the result of an expression, not the column itself. Query: `WHERE LOWER(email) = 'alice@example.com'` can use the index. Previously, you had to use virtual generated columns. Only in MySQL 8.0.13+."
  ],
  [
    "How does the InnoDB clustered index relate to the primary key?",
    "hard",
    "InnoDB ALWAYS has a clustered index, which IS the primary key. The entire table data is stored in the B+ tree leaf nodes of the primary key index. If no primary key, InnoDB uses: 1) First UNIQUE NOT NULL column. 2) A hidden 6-byte row ID. This is why: primary key lookups are VERY fast (direct tree traversal), and primary keys should be short and monotonically increasing (UUIDs as PK cause page splits)."
  ],
  [
    "Why should InnoDB primary keys be short and monotonically increasing?",
    "hard",
    "Short PK: because ALL secondary indexes include the PK value (for row lookup). A large PK (UUID) wastes space in every index. Monotonically increasing (AUTO_INCREMENT): new rows are inserted at the END of the B+ tree — no page splits (no need to rearrange existing pages). Random UUIDs cause random insert positions → page splits → index fragmentation."
  ],
  [
    "What is a secondary index lookup and the cost of the second tree traversal?",
    "hard",
    "A secondary index lookup requires TWO B+ tree traversals: 1) Search the secondary index to find the PRIMARY KEY value. 2) Search the clustered index (PK) to find the actual row data. This is why covering indexes (which include all needed columns) are faster — they avoid step #2. Also why primary key lookups are faster than secondary index lookups."
  ],
  [
    "What is the difference between REPEATABLE READ and READ COMMITTED in InnoDB?",
    "hard",
    "REPEATABLE READ: snapshot isolation — reads see consistent data as of transaction start. Same query repeated returns the same data. Uses gap locks to prevent phantom reads. Default isolation level. READ COMMITTED: each statement sees latest COMMITTED data (not transaction start). Different reads may see different data. No gap locks (higher concurrency, fewer deadlocks). Better for most OLTP workloads."
  ],
  [
    "What is the default isolation level in MySQL/InnoDB?",
    "med",
    "The default is `REPEATABLE READ`. Unlike PostgreSQL (READ COMMITTED), MySQL chose REPEATABLE READ as default for historical compatibility reasons. Many production workloads change to READ COMMITTED for better concurrency (fewer gap lock conflicts). Set with: `SET GLOBAL transaction_isolation = 'READ-COMMITTED'`."
  ],
  [
    "How does InnoDB prevent phantom reads at REPEATABLE READ?",
    "hard",
    "InnoDB uses NEXT-KEY LOCKS (row lock + gap lock) to prevent phantom reads. When a query scans an index range, InnoDB locks the rows AND the gaps between them. This prevents other transactions from INSERTING rows that would appear in the range. Without gap locks, T2 could insert a row that T1 would see in its second read (phantom)."
  ],
  [
    "What is a consistent read (snapshot) vs a locking read in InnoDB?",
    "med",
    "Consistent (non-locking) read: reads from the database snapshot as of a point in time (transaction start for REPEATABLE READ, statement start for READ COMMITTED). Never blocks. `SELECT`. Locking read: explicitly acquires locks: `SELECT ... FOR UPDATE` (exclusive — prevents other updates/deletes/locking reads) or `SELECT ... LOCK IN SHARE MODE` (shared — prevents other writes). Blocks if another transaction holds conflicting locks."
  ],
  [
    "What is SELECT ... FOR UPDATE vs SELECT ... LOCK IN SHARE MODE?",
    "med",
    "`FOR UPDATE` acquires an EXCLUSIVE row lock — other transactions cannot read (for locking reads), update, or delete the locked rows. `LOCK IN SHARE MODE` acquires a SHARED lock — other transactions can read (for locking reads) but not update/delete. Use `FOR UPDATE` when you plan to UPDATE the row. Use `SHARE MODE` when you need to prevent concurrent modifications but don't need exclusive write access."
  ],
  [
    "What is the redo log and undo log in InnoDB?",
    "hard",
    "Redo log: records ALL changes (physical — page-level). Used for CRASH RECOVERY (replay committed transactions after crash). `innodb_log_file_size` × `innodb_log_files_in_group` = total size. Sequential writes (fast). Undo log: records OLD versions of changed rows. Used for ROLLBACK, MVCC (snapshot reads), and purge. Stored in the system tablespace or separate undo tablespace. Garbage-collected by purge thread."
  ],
  [
    "What is the change buffer in InnoDB?",
    "hard",
    "The change buffer caches changes to SECONDARY index pages when they're NOT in the buffer pool. Instead of reading the index page from disk to apply the change, InnoDB records the change in the change buffer. When the page is later read into the buffer pool (for other queries), the changes are merged. Reduces random I/O for write-heavy workloads on non-unique secondary indexes."
  ],
  [
    "What is the adaptive hash index in InnoDB?",
    "hard",
    "InnoDB can build an in-memory HASH INDEX on frequently accessed index pages (B+ tree). It's adaptive — built automatically based on usage patterns (not user-controlled). Speeds up equality lookups (hash index = O(1) vs B+ tree O(log n)). Memory consumption: `innodb_adaptive_hash_index_parts` controls partitioning (reduces contention). Monitor `SHOW ENGINE INNODB STATUS` for `hash searches/s`."
  ],
  [
    "What is the doublewrite buffer and what problem does it solve?",
    "hard",
    "The doublewrite buffer ensures atomicity of page writes. Before writing a page to its final location, InnoDB writes it to the doublewrite buffer. If MySQL crashes during a partial page write (torn page — only half the page written), InnoDB recovers from the doublewrite buffer copy. Without it, partial writes could cause data corruption. Located in the system tablespace."
  ],
  [
    "What is the difference between BCNF and 3NF?",
    "hard",
    "BCNF (Boyce-Codd Normal Form) is a stricter version of 3NF. 3NF: no transitive dependencies (non-key column depends on another non-key column). BCNF: every non-trivial functional dependency X → Y must have X be a SUPERKEY. BCNF eliminates all redundancy from functional dependencies that 3NF might miss (especially cases with overlapping composite keys). BCNF is harder to achieve but more robust."
  ],
  [
    "When is denormalization preferred over a heavily normalized schema?",
    "med",
    "Denormalize when: 1) Read performance is critical (e.g., dashboards, reporting). 2) JOINs are too slow on large tables. 3) Pre-computed values are needed (totals, counts). 4) Caching layer is insufficient. 5) Application is read-heavy with low write frequency. 6) Data consistency requirements are lower or handled at the application level."
  ],
  [
    "What is a surrogate key vs a natural key?",
    "med",
    "Surrogate: artificial, meaningless, unique identifier (AUTO_INCREMENT, UUID). Never changes. Natural: meaningful business key (SSN, email, ISBN). May change (email changes). Surrogate keys are: simpler (single integer), more stable (don't change), smaller for indexes, independent of business rules. Natural keys can be used as additional unique constraints."
  ],
  [
    "What is the difference between RANGE and HASH partitioning use cases?",
    "hard",
    "RANGE: partition by logical ranges (date ranges: monthly/quarterly, numeric ranges: price tiers). Good for: data archiving (drop old partitions), time-series data, range queries. HASH: distribute data evenly across partitions (hash function). Good for: distributing writes evenly, when no natural range exists. HASH doesn't support partition pruning for range queries."
  ],
  [
    "What is partition pruning and how does it speed up queries?",
    "hard",
    "Partition pruning: the optimizer eliminates partitions that don't match the WHERE clause — only relevant partitions are scanned. Example: `WHERE created_at >= '2024-01-01' AND created_at < '2024-02-01'` on a table partitioned by MONTH(`created_at`) — only the January 2024 partition is scanned. Dramatically reduces I/O for large partitioned tables."
  ],
  [
    "What is semi-synchronous replication in MySQL?",
    "hard",
    "Semi-sync replication: the primary waits for at least ONE secondary to acknowledge receiving the transaction before committing. Between async (no wait — data may be lost on primary failure) and full sync (all secondaries must acknowledge — slower). Reduces data loss risk vs async. Trade-off: primary commit latency increases. Plugin: `rpl_semi_sync_master` and `rpl_semi_sync_slave`."
  ],
  [
    "What is replication lag and how do you measure and reduce it?",
    "hard",
    "Replication lag = delay between a write on primary and its appearance on a secondary. Measure: `SHOW SLAVE STATUS` → `Seconds_Behind_Master`. Causes: long-running writes on primary, insufficient secondary CPU/I/O, single-threaded SQL thread on replica (parallel replication in 5.7+ helps). Reduce: use multi-threaded replication (`slave_parallel_workers`), faster replica hardware, reduce primary write load."
  ],
  [
    "What is the difference between async, semi-sync, and group replication consistency?",
    "hard",
    "Async: primary doesn't wait for any secondary — highest performance, potential data loss on primary failure. Semi-sync: primary waits for ≥1 secondary ACK — minimal data loss, slightly higher commit latency. Group Replication: consensus-based — all nodes agree on transaction order, highest consistency, primary failover is automatic and safe, higher latency."
  ],
  [
    "What is the InnoDB Cluster (MySQL Shell + Group Replication + Router)?",
    "hard",
    "InnoDB Cluster = MySQL Shell (adminAPI) + Group Replication (high availability) + MySQL Router (client routing). Features: automatic failover, automatic node provisioning, read/write splitting (MySQL Router), easy setup (`dba.createCluster()`). Provides an HA solution similar to Galera Cluster but natively integrated."
  ],
  [
    "What is the optimizer cost model and how does ANALYZE TABLE help?",
    "hard",
    "The optimizer estimates costs for query plans (CPU + I/O costs) and chooses the cheapest. `ANALYZE TABLE` updates index cardinality statistics that the optimizer uses. Without up-to-date stats, the optimizer may choose bad plans (full scans when indexes are better, or vice versa). Set `innodb_stats_auto_recalc = ON` for automatic statistics updates."
  ],
  [
    "What is a filesort in MySQL and when is it triggered?",
    "hard",
    "Filesort is MySQL's sorting algorithm when ORDER BY can't use an index. Occurs when: sort column is not part of the index, sort order doesn't match index order, or query uses a different column range before the sort. Filesort happens in memory (sort_buffer_size) or on disk (if result is large). `EXPLAIN` shows `Using filesort`. Avoid by: adding appropriate indexes."
  ],
  [
    "What is the difference between using a temporary table on disk vs memory?",
    "hard",
    "MySQL creates temporary tables for: GROUP BY (without indexes), UNION, derived tables, ORDER BY with LIMIT in subquery. In-memory temp table uses MEMORY storage engine (faster, but limited by `tmp_table_size`/`max_heap_table_size`). If temp table exceeds this size, MySQL converts to on-disk MyISAM/InnoDB temp table (slower). Monitor `Created_tmp_disk_tables` status."
  ],
  [
    "What is the impact of SELECT * on performance and covering indexes?",
    "med",
    "`SELECT *` prevents covering indexes — all columns must be fetched from the table (not just the index). Unnecessary data transfer (more network, memory). You might accidentally select BLOB/TEXT columns (very slow). Always specify only the columns you need: allows covering index optimization, reduces I/O, reduces network transfer."
  ],
  [
    "What is a hash join in MySQL 8 and when is it used?",
    "hard",
    "MySQL 8.0.18+ added hash join optimization. Used when: joining two tables with NO index on the join condition, or when the optimizer determines hash join is cheaper than nested-loop join. Builds an in-memory hash table on one table, then probes with the other. Handles medium-sized tables efficiently. Controlled by `hash_join=on` (default). Monitor in EXPLAIN as `Using where; Using join buffer (hash join)`."
  ],
  [
    "What is connection vs thread pooling and why does it matter at scale?",
    "med",
    "MySQL uses one OS thread per connection. Too many connections → thread contention, memory exhaustion. Connection pool (application side): limits concurrent connections, reuses connections. Thread pool (MySQL Enterprise/Percona): limits number of active threads, queues connections. At scale: use connection pools (HikariCP, ProxySQL) and possibly MySQL thread pool. Monitor max_connections and threads_connected."
  ],

  // ── Code / Query ─────────────────────────────────────────────────────────
  [
    "Write a query to find the second highest salary from an employees table.",
    "med",
    "`SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees);` Or with window function: `SELECT DISTINCT salary FROM (SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) rnk FROM employees) t WHERE rnk = 2;`"
  ],
  [
    "Write a query to find duplicate emails in a users table.",
    "med",
    "`SELECT email, COUNT(*) FROM users GROUP BY email HAVING COUNT(*) > 1;`"
  ],
  [
    "Write a query using ROW_NUMBER to get the latest order per customer.",
    "hard",
    "`WITH ranked AS (SELECT *, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY created_at DESC) rn FROM orders) SELECT * FROM ranked WHERE rn = 1;`"
  ],
  [
    "Write a query to delete duplicate rows keeping the one with the smallest id.",
    "hard",
    "`DELETE FROM users WHERE id NOT IN (SELECT MIN(id) FROM users GROUP BY email);` MySQL doesn't allow referencing the same table in subquery for DELETE. Use a JOIN: `DELETE u1 FROM users u1 JOIN users u2 ON u1.email = u2.email AND u1.id > u2.id;`"
  ],
  [
    "Write a self-join to find employees who earn more than their manager.",
    "hard",
    "`SELECT e.name AS employee, e.salary, m.name AS manager FROM employees e JOIN employees m ON e.manager_id = m.id WHERE e.salary > m.salary;`"
  ],
  [
    "Write a query to pivot monthly sales into columns using CASE.",
    "hard",
    "`SELECT product, SUM(CASE WHEN MONTH(sale_date) = 1 THEN amount ELSE 0 END) AS Jan, SUM(CASE WHEN MONTH(sale_date) = 2 THEN amount ELSE 0 END) AS Feb FROM sales WHERE YEAR(sale_date) = 2024 GROUP BY product;`"
  ],
  [
    "Write a recursive CTE to list all descendants of a category id.",
    "hard",
    "`WITH RECURSIVE subcategories AS (SELECT id, name, parent_id FROM categories WHERE id = 1 UNION ALL SELECT c.id, c.name, c.parent_id FROM categories c JOIN subcategories s ON c.parent_id = s.id) SELECT * FROM subcategories;`"
  ],
  [
    "Write a query to compute a running total of amount ordered by date.",
    "hard",
    "`SELECT date, amount, SUM(amount) OVER (ORDER BY date) AS running_total FROM sales;`"
  ],
  [
    "Write a LEFT JOIN to find customers who have placed no orders.",
    "med",
    "`SELECT c.* FROM customers c LEFT JOIN orders o ON c.id = o.customer_id WHERE o.id IS NULL;`"
  ],
  [
    "Write a query to get the top 3 salaries per department.",
    "hard",
    "`WITH ranked AS (SELECT name, salary, department_id, DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) rnk FROM employees) SELECT d.name AS dept, r.name, r.salary FROM ranked r JOIN departments d ON r.department_id = d.id WHERE rnk <= 3;`"
  ],
  [
    "Write an UPDATE that joins orders to customers to set a discount.",
    "med",
    "`UPDATE orders o JOIN customers c ON o.customer_id = c.id SET o.discount = 0.1 WHERE c.loyalty = 'gold';`"
  ],
  [
    "Write a query using GROUP BY and HAVING to find customers with > 5 orders.",
    "med",
    "`SELECT customer_id, COUNT(*) AS order_count FROM orders GROUP BY customer_id HAVING COUNT(*) > 5;`"
  ],
  [
    "How would you index a query filtering on (status, created_at) and sorting by created_at?",
    "hard",
    "`CREATE INDEX idx_status_created ON orders (status, created_at);` — equality on status, then sort (and range) on created_at. The index covers both the WHERE and ORDER BY, preventing filesort."
  ],
  [
    "Write a query to find gaps in a sequence of integer ids.",
    "hard",
    "`SELECT t1.id + 1 AS gap_start, MIN(t2.id) - 1 AS gap_end FROM ids t1 JOIN ids t2 ON t2.id > t1.id AND t2.id = (SELECT MIN(id) FROM ids WHERE id > t1.id) WHERE t2.id > t1.id + 1 GROUP BY t1.id;`"
  ],
  [
    "Write a query using LAG to compute day-over-day revenue change.",
    "hard",
    "`SELECT date, revenue, LAG(revenue) OVER (ORDER BY date) AS prev_rev, revenue - LAG(revenue) OVER (ORDER BY date) AS change FROM daily_revenue;`"
  ],
  [
    "Write a query to bucket users into age ranges using CASE.",
    "med",
    "`SELECT CASE WHEN age < 18 THEN 'Under 18' WHEN age BETWEEN 18 AND 30 THEN '18-30' WHEN age BETWEEN 31 AND 50 THEN '31-50' ELSE '50+' END AS age_group, COUNT(*) FROM users GROUP BY age_group;`"
  ],
  [
    "Write an EXPLAIN-friendly rewrite of a correlated subquery as a JOIN.",
    "hard",
    "Replace `SELECT * FROM users WHERE EXISTS (SELECT 1 FROM orders WHERE orders.user_id = users.id)` with `SELECT DISTINCT u.* FROM users u JOIN orders o ON u.id = o.user_id`. The JOIN is often faster and easier to optimize (can use different join methods)."
  ],
  [
    "Write a query using COALESCE to default a NULL phone to \"N/A\".",
    "easy",
    "`SELECT name, COALESCE(phone, 'N/A') AS phone FROM users;`"
  ],
  [
    "Write an INSERT ... ON DUPLICATE KEY UPDATE upsert statement.",
    "med",
    "`INSERT INTO users (id, name, email) VALUES (1, 'Alice', 'a@b.com') ON DUPLICATE KEY UPDATE name = VALUES(name), email = VALUES(email);` — inserts if not exists, updates if exists."
  ],
  [
    "Write a query to find rows in table A not present in table B.",
    "med",
    "`SELECT * FROM A LEFT JOIN B ON A.id = B.a_id WHERE B.id IS NULL;` Or: `SELECT * FROM A WHERE NOT EXISTS (SELECT 1 FROM B WHERE B.a_id = A.id);` Or: `SELECT * FROM A WHERE id NOT IN (SELECT a_id FROM B);`"
  ],
  [
    "Write a query to calculate the median salary.",
    "hard",
    "`WITH ranked AS (SELECT salary, ROW_NUMBER() OVER (ORDER BY salary) rn, COUNT(*) OVER () cnt FROM employees) SELECT AVG(salary) FROM ranked WHERE rn IN (FLOOR((cnt+1)/2), CEIL((cnt+1)/2));`"
  ],
  [
    "Write a window function query to assign a percentile rank to scores.",
    "hard",
    "`SELECT name, score, PERCENT_RANK() OVER (ORDER BY score DESC) AS percentile FROM exam_results;`"
  ],
  [
    "Write a query to count NULL vs non-NULL values in a column.",
    "med",
    "`SELECT COUNT(*) AS total, SUM(CASE WHEN phone IS NULL THEN 1 ELSE 0 END) AS nulls, SUM(CASE WHEN phone IS NOT NULL THEN 1 ELSE 0 END) AS not_null FROM users;`"
  ],
  [
    "How would you add an index to speed up LIKE 'abc%' but not LIKE '%abc'?",
    "med",
    "`CREATE INDEX idx_name ON users (name);` — B+ tree indexes support prefix matching (`abc%` sorts the strings starting with 'abc' together). `%abc` requires scanning all index entries. For suffix search, use a reverse index or a generated column: `name_reversed = REVERSE(name)` indexed for `LIKE 'cba%'`."
  ],
  [
    "Write a transaction that transfers money between two accounts safely.",
    "med",
    "`START TRANSACTION; SELECT balance FROM accounts WHERE id = 1 FOR UPDATE; UPDATE accounts SET balance = balance - 100 WHERE id = 1; UPDATE accounts SET balance = balance + 100 WHERE id = 2; COMMIT;` — `FOR UPDATE` prevents race conditions (another transaction reading the balance between check and update)."
  ],
  [
    "Write a query using UNION to combine active and archived users.",
    "easy",
    "`SELECT id, name, email FROM active_users UNION SELECT id, name, email FROM archived_users;`"
  ],
  [
    "Write a query to get the first order date for each customer.",
    "med",
    "`SELECT customer_id, MIN(created_at) AS first_order FROM orders GROUP BY customer_id;`"
  ],
  [
    "Write a query with a CTE that filters then aggregates orders.",
    "med",
    "`WITH completed AS (SELECT * FROM orders WHERE status = 'completed') SELECT customer_id, COUNT(*), SUM(amount) FROM completed GROUP BY customer_id;`"
  ],
  [
    "Write a DDL to add a composite unique constraint on (tenant_id, email).",
    "med",
    "`ALTER TABLE users ADD UNIQUE INDEX idx_tenant_email (tenant_id, email);`"
  ],
  [
    "Write a query to find the longest streak of consecutive login days.",
    "hard",
    "`WITH numbered AS (SELECT user_id, login_date, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_date) rn FROM logins), grouped AS (SELECT user_id, login_date, DATE_SUB(login_date, INTERVAL rn DAY) AS grp FROM numbered) SELECT user_id, COUNT(*) AS streak, MIN(login_date) AS start, MAX(login_date) AS end FROM grouped GROUP BY user_id, grp HAVING COUNT(*) >= 5 ORDER BY COUNT(*) DESC;`"
  ],
  [
    "Write a query using JSON_EXTRACT to read a field from a JSON column.",
    "med",
    "`SELECT id, JSON_EXTRACT(metadata, '$.author') AS author FROM articles WHERE JSON_EXTRACT(metadata, '$.published') = true;` Or: `SELECT id, metadata->'$.author' AS author FROM articles;`"
  ],
  [
    "Write a generated stored column that extracts a JSON field for indexing.",
    "hard",
    "`ALTER TABLE articles ADD COLUMN author VARCHAR(255) GENERATED ALWAYS AS (JSON_UNQUOTE(JSON_EXTRACT(metadata, '$.author'))) STORED, ADD INDEX idx_author (author);`"
  ],
  [
    "Write a query to return a comma-separated list of products per order (GROUP_CONCAT).",
    "med",
    "`SELECT order_id, GROUP_CONCAT(product_name ORDER BY product_name SEPARATOR ', ') AS products FROM order_items GROUP BY order_id;`"
  ],
  [
    "How would you paginate efficiently using keyset pagination instead of OFFSET?",
    "hard",
    "Instead of `LIMIT 20 OFFSET 100000` (slow — MySQL still reads 100,020 rows), use keyset: `SELECT * FROM users WHERE id > last_seen_id ORDER BY id LIMIT 20`. The WHERE clause uses an index range scan — reads exactly 20 rows. Requires a unique sequential column. Caveat: can't jump to arbitrary pages."
  ],
  [
    "Write a query to find employees hired in the same month as their manager.",
    "hard",
    "`SELECT e.name AS employee, e.hire_date, m.name AS manager FROM employees e JOIN employees m ON e.manager_id = m.id WHERE MONTH(e.hire_date) = MONTH(m.hire_date) AND YEAR(e.hire_date) = YEAR(m.hire_date);`"
  ],

  // ── Tricky output / behavior ─────────────────────────────────────────────
  [
    "What does SELECT COUNT(*) FROM t WHERE x = NULL return?",
    "med",
    "0. `x = NULL` evaluates to `UNKNOWN` (not TRUE). The WHERE clause only includes rows where the condition is TRUE. No rows match, so COUNT returns 0. Always use `IS NULL`."
  ],
  [
    "What is the result of NULL = NULL in a WHERE clause?",
    "med",
    "NULL = NULL evaluates to `UNKNOWN` (not TRUE or FALSE). The row is EXCLUDED from results. Use `IS NULL` for NULL comparison. This three-valued logic (TRUE, FALSE, UNKNOWN) is why `NOT IN` with NULLs is tricky."
  ],
  [
    "Does COUNT(column) count NULL values? What about COUNT(*)?",
    "med",
    "`COUNT(column)` counts NON-NULL values only. `COUNT(*)` counts ALL rows (including those with NULLs). Example: column has 100 rows, 10 NULLs → COUNT(col) = 90, COUNT(*) = 100."
  ],
  [
    "What does SELECT 1 + NULL return?",
    "easy",
    "NULL. NULL propagates in arithmetic expressions — any operation with NULL results in NULL."
  ],
  [
    "What does WHERE x NOT IN (1, 2, NULL) return when x = 3?",
    "hard",
    "Nothing (empty result). `3 NOT IN (1, 2, NULL)` → `3 != 1 AND 3 != 2 AND 3 != NULL` → `TRUE AND TRUE AND UNKNOWN` → `UNKNOWN`. The row is NOT returned. This is why `NOT IN` with a subquery that may return NULLs is dangerous — use `NOT EXISTS` instead."
  ],
  [
    "What does ORDER BY on a column with NULLs put first, ASC vs DESC?",
    "med",
    "By default, NULLs are considered LOWER than non-NULL values. `ORDER BY col ASC` → NULLs FIRST. `ORDER BY col DESC` → NULLs LAST. Control with: `ORDER BY col ASC NULLS LAST` (MySQL 8.0+)."
  ],
  [
    "What is the result of 'abc' = 'ABC' under a case-insensitive collation?",
    "med",
    "TRUE. With a case-insensitive collation (`utf8mb4_general_ci`, `utf8mb4_unicode_ci`), string comparisons ignore case. `'abc' = 'ABC'` evaluates to TRUE. Check default collation with `SHOW VARIABLES LIKE 'collation_%'`."
  ],
  [
    "What does 'a' = 'a ' (trailing space) evaluate to in MySQL?",
    "hard",
    "TRUE for VARCHAR/CHAR comparisons. MySQL ignores trailing spaces in non-LOB string comparisons (unless using LIKE or binary collation). `'a' = 'a '` → TRUE. But `LIKE 'a '` would not match `'a'` (LIKE doesn't pad). See PAD SPACE vs NO PAD collation."
  ],
  [
    "What does SELECT 5 / 0 return in MySQL?",
    "med",
    "NULL (not an error). MySQL doesn't raise a division-by-zero error — it returns NULL. This is different from PostgreSQL and most other databases which throw errors."
  ],
  [
    "What does GROUP BY do with columns not in the GROUP BY (ONLY_FULL_GROUP_BY off)?",
    "hard",
    "Without `ONLY_FULL_GROUP_BY`, MySQL allows SELECTing non-aggregated columns not in GROUP BY. It returns INDETERMINATE values from the group (not necessarily the first/last — it's whatever MySQL finds first in storage order). This is a MySQL-specific quirk. Enable `ONLY_FULL_GROUP_BY` for standard SQL behavior."
  ],
  [
    "What does LIMIT 5 OFFSET 10 actually skip and return?",
    "easy",
    "It skips the first 10 rows and returns rows 11 through 15 (5 rows total). MySQL evaluates: skip 10 rows, then take 5. Without ORDER BY, which rows are skipped is undefined."
  ],
  [
    "Does TRUNCATE reset AUTO_INCREMENT but DELETE does not?",
    "med",
    "Yes. `TRUNCATE TABLE` drops and recreates the table — AUTO_INCREMENT resets to 1. `DELETE FROM table` removes rows (can be rolled back) — AUTO_INCREMENT continues from the last value. To reset after DELETE: `ALTER TABLE table AUTO_INCREMENT = 1`."
  ],
  [
    "What value does AUTO_INCREMENT take after deleting the max row and restarting?",
    "hard",
    "AUTO_INCREMENT continues from the max existing value + 1 (or the last allocated value, whichever is higher). If you INSERT ids 1-10, DELETE 10, then restart — next id is 11 (not 10). MySQL stores the last AUTO_INCREMENT value in memory (not recalculated from the table). `TRUNCATE` resets to 1."
  ],
  [
    "What does INSERT IGNORE do when a unique key conflict occurs?",
    "med",
    "`INSERT IGNORE` silently discards rows that would cause duplicate key errors (no error thrown). Also skips other errors (data type conversion, NOT NULL violations) — converts them to warnings. Use with caution — silently losing data can be confusing."
  ],
  [
    "What does a LEFT JOIN return for non-matching right-side columns?",
    "easy",
    "NULL. All columns from the right table are set to NULL for rows that have no matching row in the right table."
  ],
  [
    "Does HAVING run before or after aggregation compared to WHERE?",
    "med",
    "WHERE runs BEFORE aggregation (filters individual rows before grouping). HAVING runs AFTER aggregation (filters groups). This is why WHERE can use indexes and HAVING cannot (operates on computed result set)."
  ],
  [
    "What does SELECT AVG(x) ignore when x has NULLs?",
    "med",
    "AVG ignores NULL values. `AVG(x)` = sum of non-null x / count of non-null rows (not total rows). If column has 10 non-null values and 2 NULLs, AVG divides by 10, not 12."
  ],
  [
    "What does an implicit type conversion do to 'WHERE varchar_col = 123'?",
    "hard",
    "MySQL converts '123' (the string) to an integer, OR converts the VARCHAR column to an integer (depending on context). Converting the COLUMN prevents INDEX USAGE (MySQL applies a function to every column value). This is a common performance bug. Always use string literals for string columns: `WHERE varchar_col = '123'`."
  ],
  [
    "Why might WHERE DATE(created_at) = '2024-01-01' avoid using an index?",
    "hard",
    "`DATE()` applies a function on the indexed column — MySQL can't use the index on `created_at` directly. The function prevents index range scan. Rewrite as: `WHERE created_at >= '2024-01-01' AND created_at < '2024-01-02'` — this is a range condition that CAN use the index."
  ],
  [
    "Why might WHERE indexed_col + 0 = 5 prevent index usage?",
    "med",
    "Same as above — the expression `indexed_col + 0` applies a computation on the column value. MySQL can't use the index because it needs to evaluate the expression for every row. Rewrite as `WHERE indexed_col = 5`."
  ],
  [
    "What does UNION do to duplicate rows vs UNION ALL?",
    "easy",
    "UNION removes DUPLICATE rows (needs a sort/unique step — slower). UNION ALL keeps ALL rows (including duplicates — faster). Use UNION ALL when you know there are no duplicates or duplicates are acceptable."
  ],
  [
    "What does CONCAT('a', NULL, 'b') return?",
    "med",
    "`NULL`. In MySQL, CONCAT returns NULL if any argument is NULL (unless `CONCAT_WS` is used — which skips NULLs).`CONCAT_WS('', 'a', NULL, 'b')` → `'ab'`."
  ],
  [
    "What does a phantom read look like under REPEATABLE READ in InnoDB?",
    "hard",
    "Phantom reads are PREVENTED in InnoDB's REPEATABLE READ by gap locks. Under REPEATABLE READ with InnoDB, running the same SELECT twice returns identical results (no phantoms). Under READ COMMITTED, another transaction's INSERT in the range would appear as a phantom row."
  ],
  [
    "What happens to uncommitted changes when a session disconnects mid-transaction?",
    "med",
    "All uncommitted changes are ROLLED BACK automatically. The transaction is immediately aborted, and locks are released. This is a key ACID property (Atomicity)."
  ],
  [
    "Does a deadlock roll back both transactions or just one?",
    "hard",
    "Just ONE — the \"victim\" (the transaction that did less work or is easier to roll back). The other transaction succeeds. InnoDB picks a victim and rolls it back, releasing its locks so the other can proceed. The victim receives error code 1213 (deadlock). You must retry the victim transaction."
  ],
  [
    "What does SELECT * FROM t WHERE id = '1abc' match given id is INT?",
    "hard",
    "It matches the row with id = 1. MySQL converts the string '1abc' to an integer — it reads leading numeric characters and ignores the rest. `'1abc'` → 1. Another example: `'abc'` → 0 (no leading numbers). This is a notorious MySQL behavior that can cause unexpected matches."
  ],
  [
    "What does ROW_NUMBER return on tied values vs RANK and DENSE_RANK?",
    "med",
    "ROW_NUMBER: arbitrary unique numbers for tied values (no deterministic order — 1, 2, 3). RANK: tied values get same rank, next rank is skipped (1, 1, 3). DENSE_RANK: tied values get same rank, no gaps (1, 1, 2). Use ROW_NUMBER for pagination/dedup. Use RANK/DENSE_RANK for competition rankings."
  ],
  [
    "What does a CROSS JOIN of a 3-row and 4-row table produce?",
    "easy",
    "12 rows (3 × 4 = cartesian product). No ON clause — every row from table A paired with every row from table B."
  ],
  [
    "Why can SELECT with FOR UPDATE block another consistent (non-locking) read?",
    "hard",
    "InnoDB's consistent reads (plain SELECT) are non-blocking — they don't wait for `FOR UPDATE` locks because they read a snapshot. Locking reads (`FOR UPDATE` or `LOCK IN SHARE MODE`) WILL block if they try to lock the same rows. Also, `FOR UPDATE` blocks DML (INSERT/UPDATE/DELETE) on locked rows."
  ],
  [
    "What does NOW() vs SYSDATE() return inside a single statement?",
    "hard",
    "`NOW()` returns the statement's START TIME (same value throughout the statement). `SYSDATE()` returns the CURRENT time (may change during long-running statements/replication). This can cause issues with statement-based replication (SYSDATE() is non-deterministic). Use `NOW()` for consistency."
  ],
];
